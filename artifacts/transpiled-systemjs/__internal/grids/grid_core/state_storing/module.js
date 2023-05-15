!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/state_storing/module.js"], ["../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/deferred","./module_core"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/state_storing/module.js", ["../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/deferred", "./module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stateStoringModule = void 0;
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _module_core = _interopRequireDefault($__require("./module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
    defaultOptions: function defaultOptions() {
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
      stateStoring: _module_core.default.StateStoringController
    },
    extenders: {
      views: {
        rowsView: {
          init: function init() {
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
          init: function init() {
            this.callBase.apply(this, arguments);
            processLoadState(this);
          },
          isLoading: function isLoading() {
            return this.callBase() || this.getController('data').isStateLoading();
          },
          state: function state(_state) {
            var result = this.callBase.apply(this, arguments);
            if (_state !== undefined) {
              this.applyState((0, _extend.extend)(true, {}, _state));
            }
            return result;
          },
          updateState: function updateState(state) {
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
          applyState: function applyState(state) {
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
          _shouldReturnVisibleColumns: function _shouldReturnVisibleColumns() {
            var result = this.callBase.apply(this, arguments);
            var stateStoringController = this.getController('stateStoring');
            return result && (!stateStoringController.isEnabled() || stateStoringController.isLoaded());
          }
        },
        data: {
          callbackNames: function callbackNames() {
            return this.callBase().concat(['stateLoaded']);
          },
          _refreshDataSource: function _refreshDataSource() {
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
          isLoading: function isLoading() {
            var that = this;
            var stateStoringController = that.getController('stateStoring');
            return this.callBase() || stateStoringController.isLoading();
          },
          isStateLoading: function isStateLoading() {
            return (0, _type.isDefined)(this._restoreStateTimeoutID);
          },
          isLoaded: function isLoaded() {
            return this.callBase() && !this.isStateLoading();
          },
          dispose: function dispose() {
            clearTimeout(this._restoreStateTimeoutID);
            this.callBase();
          }
        },
        selection: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _fireSelectionChanged: function _fireSelectionChanged(options) {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/deferred","./module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/deferred"), require("./module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map