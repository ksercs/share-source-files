"use strict";

exports.default = void 0;
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var DataControllerMock = {
  load: function load() {
    return (0, _deferred.Deferred)().reject();
  },
  loadSingle: function loadSingle() {
    return (0, _deferred.Deferred)().reject();
  },
  loadFromStore: function loadFromStore() {
    return (0, _deferred.Deferred)().reject();
  },
  loadNextPage: function loadNextPage() {
    return (0, _deferred.Deferred)().reject();
  },
  loadOptions: _common.noop,
  userData: _common.noop,
  cancel: _common.noop,
  cancelAll: _common.noop,
  filter: _common.noop,
  addSearchFilter: _common.noop,
  group: _common.noop,
  paginate: _common.noop,
  pageSize: _common.noop,
  pageIndex: _common.noop,
  resetDataSourcePageIndex: _common.noop,
  totalCount: _common.noop,
  isLastPage: _common.noop,
  isLoading: _common.noop,
  isLoaded: _common.noop,
  searchValue: _common.noop,
  searchOperation: _common.noop,
  searchExpr: _common.noop,
  select: _common.noop,
  key: _common.noop,
  keyOf: _common.noop,
  store: _common.noop,
  items: _common.noop,
  applyMapFunction: _common.noop,
  getDataSource: _common.noop,
  reload: _common.noop,
  on: _common.noop,
  off: _common.noop
};
var DataController = /*#__PURE__*/function () {
  function DataController(dataSource) {
    if (!dataSource) {
      return DataControllerMock;
    }
    this._dataSource = dataSource;
  }
  var _proto = DataController.prototype;
  _proto.load = function load() {
    return this._dataSource.load();
  };
  _proto.loadSingle = function loadSingle(propName, propValue) {
    if (arguments.length < 2) {
      propValue = propName;
      propName = this.key();
    }
    return this._dataSource.loadSingle(propName, propValue);
  };
  _proto.loadFromStore = function loadFromStore(loadOptions) {
    return this.store().load(loadOptions);
  };
  _proto.loadNextPage = function loadNextPage() {
    this.pageIndex(1 + this.pageIndex());
    return this.load();
  };
  _proto.loadOptions = function loadOptions() {
    return this._dataSource.loadOptions();
  };
  _proto.userData = function userData() {
    return this._dataSource._userData;
  };
  _proto.cancel = function cancel(operationId) {
    this._dataSource.cancel(operationId);
  };
  _proto.cancelAll = function cancelAll() {
    this._dataSource.cancelAll();
  };
  _proto.filter = function filter(_filter) {
    return this._dataSource.filter(_filter);
  };
  _proto.addSearchFilter = function addSearchFilter(storeLoadOptions) {
    this._dataSource._addSearchFilter(storeLoadOptions);
  };
  _proto.group = function group(_group) {
    return this._dataSource.group(_group);
  };
  _proto.paginate = function paginate() {
    return this._dataSource.paginate();
  };
  _proto.pageSize = function pageSize() {
    return this._dataSource._pageSize;
  };
  _proto.pageIndex = function pageIndex(_pageIndex) {
    return this._dataSource.pageIndex(_pageIndex);
  };
  _proto.resetDataSourcePageIndex = function resetDataSourcePageIndex() {
    if (this.pageIndex()) {
      this.pageIndex(0);
      this.load();
    }
  };
  _proto.totalCount = function totalCount() {
    return this._dataSource.totalCount();
  };
  _proto.isLastPage = function isLastPage() {
    return this._dataSource.isLastPage() || !this._dataSource._pageSize;
  };
  _proto.isLoading = function isLoading() {
    return this._dataSource.isLoading();
  };
  _proto.isLoaded = function isLoaded() {
    return this._dataSource.isLoaded();
  };
  _proto.searchValue = function searchValue(value) {
    if (!arguments.length) {
      return this._dataSource.searchValue();
    }
    return this._dataSource.searchValue(value);
  };
  _proto.searchOperation = function searchOperation(operation) {
    return this._dataSource.searchOperation(operation);
  };
  _proto.searchExpr = function searchExpr(expr) {
    if (!arguments.length) {
      return this._dataSource.searchExpr();
    }
    return this._dataSource.searchExpr(expr);
  };
  _proto.select = function select() {
    var _this$_dataSource;
    return (_this$_dataSource = this._dataSource).select.apply(_this$_dataSource, arguments);
  };
  _proto.key = function key() {
    return this._dataSource.key();
  };
  _proto.keyOf = function keyOf(item) {
    return this.store().keyOf(item);
  };
  _proto.store = function store() {
    return this._dataSource.store();
  };
  _proto.items = function items() {
    return this._dataSource.items();
  };
  _proto.applyMapFunction = function applyMapFunction(data) {
    return this._dataSource._applyMapFunction(data);
  };
  _proto.getDataSource = function getDataSource() {
    return this._dataSource || null;
  };
  _proto.reload = function reload() {
    return this._dataSource.reload();
  };
  _proto.on = function on(event, handler) {
    this._dataSource.on(event, handler);
  };
  _proto.off = function off(event, handler) {
    this._dataSource.off(event, handler);
  };
  return DataController;
}();
var _default = DataController;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;