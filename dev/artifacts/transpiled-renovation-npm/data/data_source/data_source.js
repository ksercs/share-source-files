"use strict";

exports.DataSource = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _utils = require("../utils");
var _array_utils = require("../array_utils");
var _custom_store = _interopRequireDefault(require("../custom_store"));
var _events_strategy = require("../../core/events_strategy");
var _errors = require("../errors");
var _queue = require("../../core/utils/queue");
var _deferred = require("../../core/utils/deferred");
var _operation_manager = _interopRequireDefault(require("./operation_manager"));
var _utils2 = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var DataSource = _class.default.inherit({
  /**
  * @name DataSource.ctor
  * @publicName ctor(url)
  * @param1 url:string
  * @hidden
  */
  /**
  * @name DataSource.ctor
  * @publicName ctor(data)
  * @param1 data:Array<any>
  * @hidden
  */
  /**
  * @name DataSource.ctor
  * @publicName ctor(store)
  * @param1 store:Store
  * @hidden
  */
  /**
  * @name DataSource.ctor
  * @publicName ctor(options)
  * @param1 options:CustomStoreOptions|DataSourceOptions
  * @hidden
  */
  ctor(options) {
    var _this = this,
      _options$reshapeOnPus;
    options = (0, _utils2.normalizeDataSourceOptions)(options);
    this._eventsStrategy = new _events_strategy.EventsStrategy(this, {
      syncStrategy: true
    });

    /**
    * @name DataSourceOptions.store.type
    * @type Enums.StoreType
    */

    this._store = options.store;
    this._changedTime = 0;
    var needThrottling = options.pushAggregationTimeout !== 0;
    if (needThrottling) {
      var throttlingTimeout = options.pushAggregationTimeout === undefined ? function () {
        return _this._changedTime * 5;
      } : options.pushAggregationTimeout;
      var pushDeferred;
      var lastPushWaiters;
      var throttlingPushHandler = (0, _utils.throttleChanges)(function (changes) {
        pushDeferred.resolve();
        var storePushPending = _deferred.when.apply(void 0, _toConsumableArray(lastPushWaiters));
        storePushPending.done(function () {
          return _this._onPush(changes);
        });
        lastPushWaiters = undefined;
        pushDeferred = undefined;
      }, throttlingTimeout);
      this._onPushHandler = function (args) {
        _this._aggregationTimeoutId = throttlingPushHandler(args.changes);
        if (!pushDeferred) {
          pushDeferred = new _deferred.Deferred();
        }
        lastPushWaiters = args.waitFor;
        args.waitFor.push(pushDeferred.promise());
      };
      this._store.on('beforePushAggregation', this._onPushHandler);
    } else {
      this._onPushHandler = function (changes) {
        return _this._onPush(changes);
      };
      this._store.on('push', this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(options);
    this._mapFunc = options.map;
    this._postProcessFunc = options.postProcess;
    this._pageIndex = options.pageIndex !== undefined ? options.pageIndex : 0;
    this._pageSize = options.pageSize !== undefined ? options.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = 'searchValue' in options ? options.searchValue : null;
    this._searchOperation = options.searchOperation || 'contains';
    this._searchExpr = options.searchExpr;
    this._paginate = options.paginate;
    this._reshapeOnPush = (_options$reshapeOnPus = options.reshapeOnPush) !== null && _options$reshapeOnPus !== void 0 ? _options$reshapeOnPus : false;
    (0, _iterator.each)(['onChanged', 'onLoadError', 'onLoadingChanged', 'onCustomizeLoadResult', 'onCustomizeStoreLoadOptions'], function (_, optionName) {
      if (optionName in options) {
        _this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName]);
      }
    });
    this._operationManager = new _operation_manager.default();
    this._init();
  },
  _init() {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!(0, _type.isDefined)(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose() {
    var _this$_delayedLoadTas;
    this._store.off('beforePushAggregation', this._onPushHandler);
    this._store.off('push', this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    (_this$_delayedLoadTas = this._delayedLoadTask) === null || _this$_delayedLoadTas === void 0 ? void 0 : _this$_delayedLoadTas.abort();
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions(options) {
    var result = {};
    var names = ['sort', 'filter', 'langParams', 'select', 'group', 'requireTotalCount'];
    var customNames = this._store._customLoadOptions();
    if (customNames) {
      names = names.concat(customNames);
    }
    (0, _iterator.each)(names, function () {
      result[this] = options[this];
    });
    return result;
  },
  loadOptions() {
    return this._storeLoadOptions;
  },
  items() {
    return this._items;
  },
  pageIndex(newIndex) {
    if (!(0, _type.isNumeric)(newIndex)) {
      return this._pageIndex;
    }
    this._pageIndex = newIndex;
    this._isLastPage = !this._paginate;
  },
  paginate(value) {
    if (!(0, _type.isBoolean)(value)) {
      return this._paginate;
    }
    if (this._paginate !== value) {
      this._paginate = value;
      this.pageIndex(0);
    }
  },
  pageSize(value) {
    if (!(0, _type.isNumeric)(value)) {
      return this._pageSize;
    }
    this._pageSize = value;
  },
  isLastPage() {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor(optionName) {
    var _this2 = this;
    return function (args) {
      var normalizedArgs = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(args);
      if (normalizedArgs === undefined) {
        return _this2._storeLoadOptions[optionName];
      }
      _this2._storeLoadOptions[optionName] = normalizedArgs;
    };
  },
  sort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.generateStoreLoadOptionAccessor('sort')(args);
  },
  filter() {
    var newFilter = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(arguments);
    if (newFilter === undefined) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = newFilter;
    this.pageIndex(0);
  },
  group() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.generateStoreLoadOptionAccessor('group')(args);
  },
  select() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.generateStoreLoadOptionAccessor('select')(args);
  },
  requireTotalCount(value) {
    if (!(0, _type.isBoolean)(value)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = value;
  },
  searchValue(value) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = value;
    this.pageIndex(0);
  },
  searchOperation(op) {
    if (!(0, _type.isString)(op)) {
      return this._searchOperation;
    }
    this._searchOperation = op;
    this.pageIndex(0);
  },
  searchExpr(expr) {
    var argc = arguments.length;
    if (argc === 0) {
      return this._searchExpr;
    }
    if (argc > 1) {
      expr = [].slice.call(arguments);
    }
    this._searchExpr = expr;
    this.pageIndex(0);
  },
  store() {
    return this._store;
  },
  key() {
    var _this$_store;
    return (_this$_store = this._store) === null || _this$_store === void 0 ? void 0 : _this$_store.key();
  },
  totalCount() {
    return this._totalCount;
  },
  isLoaded() {
    return this._isLoaded;
  },
  isLoading() {
    return this._loadingCount > 0;
  },
  beginLoading() {
    this._changeLoadingCount(1);
  },
  endLoading() {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue() {
    return (0, _queue.create)();
  },
  _changeLoadingCount(increment) {
    var oldLoading = this.isLoading();
    this._loadingCount += increment;
    var newLoading = this.isLoading();
    if (oldLoading ^ newLoading) {
      this._eventsStrategy.fireEvent('loadingChanged', [newLoading]);
    }
  },
  _scheduleLoadCallbacks(deferred) {
    var _this3 = this;
    this.beginLoading();
    deferred.always(function () {
      _this3.endLoading();
    });
  },
  _scheduleFailCallbacks(deferred) {
    var _this4 = this;
    deferred.fail(function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args[0] === _utils2.CANCELED_TOKEN) {
        return;
      }
      _this4._eventsStrategy.fireEvent('loadError', args);
    });
  },
  _fireChanged(args) {
    var date = new Date();
    this._eventsStrategy.fireEvent('changed', args);
    this._changedTime = new Date() - date;
  },
  _scheduleChangedCallbacks(deferred) {
    var _this5 = this;
    deferred.done(function () {
      return _this5._fireChanged();
    });
  },
  loadSingle(propName, propValue) {
    var _this6 = this;
    var d = new _deferred.Deferred();
    var key = this.key();
    var store = this._store;
    var options = this._createStoreLoadOptions();
    var handleDone = function handleDone(data) {
      var isEmptyArray = Array.isArray(data) && !data.length;
      if (!(0, _type.isDefined)(data) || isEmptyArray) {
        d.reject(new _errors.errors.Error('E4009'));
      } else {
        if (!Array.isArray(data)) {
          data = [data];
        }
        d.resolve(_this6._applyMapFunction(data)[0]);
      }
    };
    this._scheduleFailCallbacks(d);
    if (arguments.length < 2) {
      propValue = propName;
      propName = key;
    }
    delete options.skip;
    delete options.group;
    delete options.refresh;
    delete options.pageIndex;
    delete options.searchString;
    var shouldForceByKey = function shouldForceByKey() {
      return store instanceof _custom_store.default && !store._byKeyViaLoad();
    };
    (function () {
      // NOTE for CustomStore always using byKey for backward compatibility with "old user datasource"
      if (propName === key || shouldForceByKey()) {
        return store.byKey(propValue, options);
      }
      options.take = 1;
      options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
      return store.load(options);
    })().fail(d.reject).done(handleDone);
    return d.promise();
  },
  load() {
    var _this7 = this;
    var d = new _deferred.Deferred();
    var loadTask = function loadTask() {
      if (_this7._disposed) {
        return undefined;
      }
      if (!(0, _utils2.isPending)(d)) {
        return;
      }
      return _this7._loadFromStore(loadOperation, d);
    };
    this._scheduleLoadCallbacks(d);
    this._scheduleFailCallbacks(d);
    this._scheduleChangedCallbacks(d);
    var loadOperation = this._createLoadOperation(d);
    this._eventsStrategy.fireEvent('customizeStoreLoadOptions', [loadOperation]);
    this._loadQueue.add(function () {
      if (typeof loadOperation.delay === 'number') {
        _this7._delayedLoadTask = (0, _common.executeAsync)(loadTask, loadOperation.delay);
      } else {
        loadTask();
      }
      return d.promise();
    });
    return d.promise({
      operationId: loadOperation.operationId
    });
  },
  _onPush(changes) {
    var _this8 = this;
    if (this._reshapeOnPush) {
      this.load();
    } else {
      var changingArgs = {
        changes
      };
      this._eventsStrategy.fireEvent('changing', [changingArgs]);
      var group = this.group();
      var items = this.items();
      var groupLevel = 0;
      var dataSourceChanges = this.paginate() || group ? changes.filter(function (item) {
        return item.type === 'update';
      }) : changes;
      if (group) {
        groupLevel = Array.isArray(group) ? group.length : 1;
      }
      if (this._mapFunc) {
        dataSourceChanges.forEach(function (item) {
          if (item.type === 'insert') {
            item.data = _this8._mapFunc(item.data);
          }
        });
      }
      if (changingArgs.postProcessChanges) {
        dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges);
      }
      (0, _array_utils.applyBatch)({
        keyInfo: this.store(),
        data: items,
        changes: dataSourceChanges,
        groupCount: groupLevel,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes: changes
      }]);
    }
  },
  _createLoadOperation(deferred) {
    var _this9 = this;
    var operationId = this._operationManager.add(deferred);
    var storeLoadOptions = this._createStoreLoadOptions();
    if (this._store && !(0, _type.isEmptyObject)(storeLoadOptions === null || storeLoadOptions === void 0 ? void 0 : storeLoadOptions.langParams)) {
      this._store._langParams = _extends({}, this._store._langParams, storeLoadOptions.langParams);
    }
    deferred.always(function () {
      return _this9._operationManager.remove(operationId);
    });
    return {
      operationId,
      storeLoadOptions
    };
  },
  reload() {
    var store = this.store();
    store._clearCache();
    this._init();
    return this.load();
  },
  cancel(operationId) {
    return this._operationManager.cancel(operationId);
  },
  cancelAll() {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions(storeLoadOptions) {
    if (this._disposed) {
      return;
    }
    if (this.store()._useDefaultSearch) {
      this._addSearchFilter(storeLoadOptions);
    } else {
      storeLoadOptions.searchOperation = this._searchOperation;
      storeLoadOptions.searchValue = this._searchValue;
      storeLoadOptions.searchExpr = this._searchExpr;
    }
  },
  _createStoreLoadOptions() {
    var result = (0, _extend.extend)({}, this._storeLoadOptions);
    this._addSearchOptions(result);
    if (this._paginate) {
      if (this._pageSize) {
        result.skip = this._pageIndex * this._pageSize;
        result.take = this._pageSize;
      }
    }
    result.userData = this._userData;
    return result;
  },
  _addSearchFilter(storeLoadOptions) {
    var value = this._searchValue;
    var op = this._searchOperation;
    var selector = this._searchExpr;
    var searchFilter = [];
    if (!value) {
      return;
    }
    if (!selector) {
      selector = 'this';
    }
    if (!Array.isArray(selector)) {
      selector = [selector];
    }

    // TODO optimize for byKey case

    (0, _iterator.each)(selector, function (i, item) {
      if (searchFilter.length) {
        searchFilter.push('or');
      }
      searchFilter.push([item, op, value]);
    });
    if (storeLoadOptions.filter) {
      storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
    } else {
      storeLoadOptions.filter = searchFilter;
    }
  },
  _loadFromStore(loadOptions, pendingDeferred) {
    var _this10 = this;
    var handleSuccess = function handleSuccess(data, extra) {
      if (_this10._disposed) {
        return;
      }
      if (!(0, _utils2.isPending)(pendingDeferred)) {
        return;
      }

      // Process result
      var loadResult = (0, _extend.extend)((0, _utils2.normalizeLoadResult)(data, extra), loadOptions);
      _this10._eventsStrategy.fireEvent('customizeLoadResult', [loadResult]);
      (0, _deferred.when)(loadResult.data).done(function (data) {
        loadResult.data = data;
        _this10._processStoreLoadResult(loadResult, pendingDeferred);
      }).fail(pendingDeferred.reject);
    };
    if (loadOptions.data) {
      return new _deferred.Deferred().resolve(loadOptions.data).done(handleSuccess);
    }
    return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject);
  },
  _processStoreLoadResult(loadResult, pendingDeferred) {
    var _this11 = this;
    var data = loadResult.data;
    var extra = loadResult.extra;
    var storeLoadOptions = loadResult.storeLoadOptions;
    var resolvePendingDeferred = function resolvePendingDeferred() {
      _this11._isLoaded = true;
      _this11._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
      return pendingDeferred.resolve(data, extra);
    };
    var proceedLoadingTotalCount = function proceedLoadingTotalCount() {
      _this11.store().totalCount(storeLoadOptions).done(function (count) {
        extra.totalCount = count;
        resolvePendingDeferred();
      }).fail(pendingDeferred.reject);
    };
    if (this._disposed) {
      return;
    }

    // todo: if operation is canceled there is no need to do data transformation

    data = this._applyPostProcessFunction(this._applyMapFunction(data));
    if (!(0, _type.isObject)(extra)) {
      extra = {};
    }
    this._items = data;
    if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
      this._isLastPage = true;
    }
    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
      proceedLoadingTotalCount();
    } else {
      resolvePendingDeferred();
    }
  },
  _applyMapFunction(data) {
    if (this._mapFunc) {
      return (0, _utils2.mapDataRespectingGrouping)(data, this._mapFunc, this.group());
    }
    return data;
  },
  _applyPostProcessFunction(data) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(data);
    }
    return data;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
exports.DataSource = DataSource;