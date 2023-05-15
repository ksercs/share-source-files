!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/data_source/data_source.js"], ["../../core/class","../../core/utils/extend","../../core/utils/common","../../core/utils/iterator","../../core/utils/type","../utils","../array_utils","../custom_store","../../core/events_strategy","../errors","../../core/utils/queue","../../core/utils/deferred","./operation_manager","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/data_source/data_source.js", ["../../core/class", "../../core/utils/extend", "../../core/utils/common", "../../core/utils/iterator", "../../core/utils/type", "../utils", "../array_utils", "../custom_store", "../../core/events_strategy", "../errors", "../../core/utils/queue", "../../core/utils/deferred", "./operation_manager", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.DataSource = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _utils = $__require("../utils");
  var _array_utils = $__require("../array_utils");
  var _custom_store = _interopRequireDefault($__require("../custom_store"));
  var _events_strategy = $__require("../../core/events_strategy");
  var _errors = $__require("../errors");
  var _queue = $__require("../../core/utils/queue");
  var _deferred = $__require("../../core/utils/deferred");
  var _operation_manager = _interopRequireDefault($__require("./operation_manager"));
  var _utils2 = $__require("./utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
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
    ctor: function ctor(options) {
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
        this._store.on('beforePush', this._onPushHandler);
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
    _init: function _init() {
      this._items = [];
      this._userData = {};
      this._totalCount = -1;
      this._isLoaded = false;
      if (!(0, _type.isDefined)(this._paginate)) {
        this._paginate = !this.group();
      }
      this._isLastPage = !this._paginate;
    },
    dispose: function dispose() {
      var _this$_delayedLoadTas;
      this._store.off('beforePush', this._onPushHandler);
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
    _extractLoadOptions: function _extractLoadOptions(options) {
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
    loadOptions: function loadOptions() {
      return this._storeLoadOptions;
    },
    items: function items() {
      return this._items;
    },
    pageIndex: function pageIndex(newIndex) {
      if (!(0, _type.isNumeric)(newIndex)) {
        return this._pageIndex;
      }
      this._pageIndex = newIndex;
      this._isLastPage = !this._paginate;
    },
    paginate: function paginate(value) {
      if (!(0, _type.isBoolean)(value)) {
        return this._paginate;
      }
      if (this._paginate !== value) {
        this._paginate = value;
        this.pageIndex(0);
      }
    },
    pageSize: function pageSize(value) {
      if (!(0, _type.isNumeric)(value)) {
        return this._pageSize;
      }
      this._pageSize = value;
    },
    isLastPage: function isLastPage() {
      return this._isLastPage;
    },
    generateStoreLoadOptionAccessor: function generateStoreLoadOptionAccessor(optionName) {
      var _this2 = this;
      return function (args) {
        var normalizedArgs = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(args);
        if (normalizedArgs === undefined) {
          return _this2._storeLoadOptions[optionName];
        }
        _this2._storeLoadOptions[optionName] = normalizedArgs;
      };
    },
    sort: function sort() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.generateStoreLoadOptionAccessor('sort')(args);
    },
    filter: function filter() {
      var newFilter = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(arguments);
      if (newFilter === undefined) {
        return this._storeLoadOptions.filter;
      }
      this._storeLoadOptions.filter = newFilter;
      this.pageIndex(0);
    },
    group: function group() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.generateStoreLoadOptionAccessor('group')(args);
    },
    select: function select() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.generateStoreLoadOptionAccessor('select')(args);
    },
    requireTotalCount: function requireTotalCount(value) {
      if (!(0, _type.isBoolean)(value)) {
        return this._storeLoadOptions.requireTotalCount;
      }
      this._storeLoadOptions.requireTotalCount = value;
    },
    searchValue: function searchValue(value) {
      if (arguments.length < 1) {
        return this._searchValue;
      }
      this._searchValue = value;
      this.pageIndex(0);
    },
    searchOperation: function searchOperation(op) {
      if (!(0, _type.isString)(op)) {
        return this._searchOperation;
      }
      this._searchOperation = op;
      this.pageIndex(0);
    },
    searchExpr: function searchExpr(expr) {
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
    store: function store() {
      return this._store;
    },
    key: function key() {
      var _this$_store;
      return (_this$_store = this._store) === null || _this$_store === void 0 ? void 0 : _this$_store.key();
    },
    totalCount: function totalCount() {
      return this._totalCount;
    },
    isLoaded: function isLoaded() {
      return this._isLoaded;
    },
    isLoading: function isLoading() {
      return this._loadingCount > 0;
    },
    beginLoading: function beginLoading() {
      this._changeLoadingCount(1);
    },
    endLoading: function endLoading() {
      this._changeLoadingCount(-1);
    },
    _createLoadQueue: function _createLoadQueue() {
      return (0, _queue.create)();
    },
    _changeLoadingCount: function _changeLoadingCount(increment) {
      var oldLoading = this.isLoading();
      this._loadingCount += increment;
      var newLoading = this.isLoading();
      if (oldLoading ^ newLoading) {
        this._eventsStrategy.fireEvent('loadingChanged', [newLoading]);
      }
    },
    _scheduleLoadCallbacks: function _scheduleLoadCallbacks(deferred) {
      var _this3 = this;
      this.beginLoading();
      deferred.always(function () {
        _this3.endLoading();
      });
    },
    _scheduleFailCallbacks: function _scheduleFailCallbacks(deferred) {
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
    _fireChanged: function _fireChanged(args) {
      var date = new Date();
      this._eventsStrategy.fireEvent('changed', args);
      this._changedTime = new Date() - date;
    },
    _scheduleChangedCallbacks: function _scheduleChangedCallbacks(deferred) {
      var _this5 = this;
      deferred.done(function () {
        return _this5._fireChanged();
      });
    },
    loadSingle: function loadSingle(propName, propValue) {
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
    load: function load() {
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
    _onPush: function _onPush(changes) {
      var _this8 = this;
      if (this._reshapeOnPush) {
        this.load();
      } else {
        var changingArgs = {
          changes: changes
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
    _createLoadOperation: function _createLoadOperation(deferred) {
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
        operationId: operationId,
        storeLoadOptions: storeLoadOptions
      };
    },
    reload: function reload() {
      var store = this.store();
      store._clearCache();
      this._init();
      return this.load();
    },
    cancel: function cancel(operationId) {
      return this._operationManager.cancel(operationId);
    },
    cancelAll: function cancelAll() {
      return this._operationManager.cancelAll();
    },
    _addSearchOptions: function _addSearchOptions(storeLoadOptions) {
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
    _createStoreLoadOptions: function _createStoreLoadOptions() {
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
    _addSearchFilter: function _addSearchFilter(storeLoadOptions) {
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
    _loadFromStore: function _loadFromStore(loadOptions, pendingDeferred) {
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
    _processStoreLoadResult: function _processStoreLoadResult(loadResult, pendingDeferred) {
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
    _applyMapFunction: function _applyMapFunction(data) {
      if (this._mapFunc) {
        return (0, _utils2.mapDataRespectingGrouping)(data, this._mapFunc, this.group());
      }
      return data;
    },
    _applyPostProcessFunction: function _applyPostProcessFunction(data) {
      if (this._postProcessFunc) {
        return this._postProcessFunc(data);
      }
      return data;
    },
    on: function on(eventName, eventHandler) {
      this._eventsStrategy.on(eventName, eventHandler);
      return this;
    },
    off: function off(eventName, eventHandler) {
      this._eventsStrategy.off(eventName, eventHandler);
      return this;
    }
  });
  exports.DataSource = DataSource;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/extend","../../core/utils/common","../../core/utils/iterator","../../core/utils/type","../utils","../array_utils","../custom_store","../../core/events_strategy","../errors","../../core/utils/queue","../../core/utils/deferred","./operation_manager","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/common"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../utils"), require("../array_utils"), require("../custom_store"), require("../../core/events_strategy"), require("../errors"), require("../../core/utils/queue"), require("../../core/utils/deferred"), require("./operation_manager"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=data_source.js.map