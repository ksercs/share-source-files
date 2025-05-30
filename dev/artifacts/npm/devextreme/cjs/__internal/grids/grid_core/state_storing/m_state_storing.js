/**
* DevExtreme (cjs/__internal/grids/grid_core/state_storing/m_state_storing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateStoringModule = void 0;
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _m_state_storing_core = _interopRequireDefault(require("./m_state_storing_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

var getDataState = function getDataState(that) {
  var pagerView = that.getView('pagerView');
  var dataController = that.getController('data');
  var state = {
    allowedPageSizes: pagerView ? pagerView.getPageSizes() : undefined,
    filterPanel: {
      filterEnabled: that.option('filterPanel.filterEnabled')
    },
    filterValue: that.option('filterValue'),
    focusedRowKey: that.option('focusedRowEnabled') ? that.option('focusedRowKey') : undefined
  };
  return (0, _extend.extend)(state, dataController.getUserState());
};
// TODO move processLoadState to target modules (data, columns, pagerView)
var processLoadState = function processLoadState(that) {
  var columnsController = that.getController('columns');
  var selectionController = that.getController('selection');
  var exportController = that.getController('export');
  var dataController = that.getController('data');
  if (columnsController) {
    columnsController.columnsChanged.add(function () {
      that.updateState({
        columns: columnsController.getUserState()
      });
    });
  }
  if (selectionController) {
    selectionController.selectionChanged.add(function (e) {
      that.updateState({
        selectedRowKeys: e.selectedRowKeys,
        selectionFilter: e.selectionFilter
      });
    });
  }
  if (dataController) {
    that._initialPageSize = that.option('paging.pageSize');
    that._initialFilterValue = that.option('filterValue');
    dataController.changed.add(function () {
      var state = getDataState(that);
      that.updateState(state);
    });
  }
  if (exportController) {
    exportController.selectionOnlyChanged.add(function () {
      that.updateState({
        exportSelectionOnly: exportController.selectionOnly()
      });
    });
  }
};
var DEFAULT_FILTER_VALUE = null;
var getFilterValue = function getFilterValue(that, state) {
  var filterSyncController = that.getController('filterSync');
  var columnsController = that.getController('columns');
  var hasFilterState = state.columns || state.filterValue !== undefined;
  if (filterSyncController) {
    if (hasFilterState) {
      return state.filterValue || filterSyncController.getFilterValueFromColumns(state.columns);
    }
    return that._initialFilterValue || filterSyncController.getFilterValueFromColumns(columnsController.getColumns());
  }
  return DEFAULT_FILTER_VALUE;
};
var stateStoringModule = {
  defaultOptions() {
    return {
      stateStoring: {
        enabled: false,
        storageKey: null,
        type: 'localStorage',
        customLoad: null,
        customSave: null,
        savingTimeout: 2000
      }
    };
  },
  controllers: {
    stateStoring: _m_state_storing_core.default.StateStoringController
  },
  extenders: {
    views: {
      rowsView: {
        init() {
          var that = this;
          var dataController = that.getController('data');
          that.callBase();
          dataController.stateLoaded.add(function () {
            if (dataController.isLoaded() && !dataController.getDataSource()) {
              that.setLoading(false);
              that.renderNoDataText();
              var columnHeadersView = that.component.getView('columnHeadersView');
              columnHeadersView && columnHeadersView.render();
              that.component._fireContentReadyAction();
            }
          });
        }
      }
    },
    controllers: {
      stateStoring: {
        init() {
          this.callBase.apply(this, arguments);
          processLoadState(this);
        },
        isLoading() {
          return this.callBase() || this.getController('data').isStateLoading();
        },
        state(state) {
          var result = this.callBase.apply(this, arguments);
          if (state !== undefined) {
            this.applyState((0, _extend.extend)(true, {}, state));
          }
          return result;
        },
        updateState(state) {
          if (this.isEnabled()) {
            var oldState = this.state();
            var newState = (0, _extend.extend)({}, oldState, state);
            var oldStateHash = (0, _common.getKeyHash)(oldState);
            var newStateHash = (0, _common.getKeyHash)(newState);
            if (!(0, _common.equalByValue)(oldStateHash, newStateHash)) {
              state = (0, _extend.extend)(true, {}, state);
              (0, _extend.extend)(this._state, state);
              this.save();
            }
          } else {
            (0, _extend.extend)(this._state, state);
          }
        },
        applyState(state) {
          var _a;
          var allowedPageSizes = state.allowedPageSizes;
          var searchText = state.searchText;
          var selectedRowKeys = state.selectedRowKeys;
          var selectionFilter = state.selectionFilter;
          var exportController = this.getController('export');
          var columnsController = this.getController('columns');
          var dataController = this.getController('data');
          var scrollingMode = this.option('scrolling.mode');
          var isVirtualScrollingMode = scrollingMode === 'virtual' || scrollingMode === 'infinite';
          var showPageSizeSelector = this.option('pager.visible') === true && this.option('pager.showPageSizeSelector');
          var hasHeight = (_a = this.getView('rowsView')) === null || _a === void 0 ? void 0 : _a.hasHeight();
          this.component.beginUpdate();
          if (columnsController) {
            columnsController.setUserState(state.columns);
          }
          if (exportController) {
            exportController.selectionOnly(state.exportSelectionOnly);
          }
          if (!this.option('selection.deferred')) {
            this.option('selectedRowKeys', selectedRowKeys || []);
          }
          this.option('selectionFilter', selectionFilter);
          if (allowedPageSizes && this.option('pager.allowedPageSizes') === 'auto') {
            this.option('pager').allowedPageSizes = allowedPageSizes;
          }
          if (this.option('focusedRowEnabled')) {
            this.option('focusedRowIndex', -1);
            this.option('focusedRowKey', state.focusedRowKey || null);
          }
          this.component.endUpdate();
          this.option('searchPanel.text', searchText || '');
          this.option('filterValue', getFilterValue(this, state));
          this.option('filterPanel.filterEnabled', state.filterPanel ? state.filterPanel.filterEnabled : true);
          this.option('paging.pageIndex', (!isVirtualScrollingMode || hasHeight) && state.pageIndex || 0);
          this.option('paging.pageSize', (!isVirtualScrollingMode || showPageSizeSelector) && (0, _type.isDefined)(state.pageSize) ? state.pageSize : this._initialPageSize);
          dataController && dataController.reset();
        }
      },
      columns: {
        _shouldReturnVisibleColumns() {
          var result = this.callBase.apply(this, arguments);
          var stateStoringController = this.getController('stateStoring');
          return result && (!stateStoringController.isEnabled() || stateStoringController.isLoaded());
        }
      },
      data: {
        callbackNames() {
          return this.callBase().concat(['stateLoaded']);
        },
        _refreshDataSource() {
          var _this = this;
          var callBase = this.callBase;
          var stateStoringController = this.getController('stateStoring');
          if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
            clearTimeout(this._restoreStateTimeoutID);
            // @ts-expect-error
            var deferred = new _deferred.Deferred();
            this._restoreStateTimeoutID = setTimeout(function () {
              stateStoringController.load().always(function () {
                _this._restoreStateTimeoutID = null;
              }).done(function () {
                callBase.call(_this);
                _this.stateLoaded.fire();
                deferred.resolve();
              }).fail(function (error) {
                _this.stateLoaded.fire();
                _this._handleLoadError(error || 'Unknown error');
                deferred.reject();
              });
            });
            return deferred.promise();
          }
          if (!this.isStateLoading()) {
            callBase.call(this);
          }
        },
        isLoading() {
          var that = this;
          var stateStoringController = that.getController('stateStoring');
          return this.callBase() || stateStoringController.isLoading();
        },
        isStateLoading() {
          return (0, _type.isDefined)(this._restoreStateTimeoutID);
        },
        isLoaded() {
          return this.callBase() && !this.isStateLoading();
        },
        dispose() {
          clearTimeout(this._restoreStateTimeoutID);
          this.callBase();
        }
      },
      selection: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _fireSelectionChanged(options) {
          var stateStoringController = this.getController('stateStoring');
          var isDeferredSelection = this.option('selection.deferred');
          if (stateStoringController.isLoading() && isDeferredSelection) {
            return;
          }
          this.callBase.apply(this, arguments);
        }
      }
    }
  }
};
exports.stateStoringModule = stateStoringModule;
