!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/tree_list/editing/module.js"], ["../module_not_extended/editor_factory","../../../../core/renderer","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/deferred","../../../../localization/message","../../../../ui/widget/ui.errors","../../../../ui/grid_core/ui.grid_core.utils","../../../../ui/grid_core/ui.grid_core.editing","../module_core"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/tree_list/editing/module.js", ["../module_not_extended/editor_factory", "../../../../core/renderer", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/deferred", "../../../../localization/message", "../../../../ui/widget/ui.errors", "../../../../ui/grid_core/ui.grid_core.utils", "../../../../ui/grid_core/ui.grid_core.editing", "../module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  $__require("../module_not_extended/editor_factory");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.errors"));
  var _uiGrid_core = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.utils"));
  var _uiGrid_core2 = $__require("../../../../ui/grid_core/ui.grid_core.editing");
  var _module_core = _interopRequireDefault($__require("../module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TREELIST_EXPAND_ICON_CONTAINER_CLASS = 'dx-treelist-icon-container';
  var SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
  var DATA_EDIT_DATA_INSERT_TYPE = 'insert';
  var EditingController = _uiGrid_core2.editingModule.controllers.editing.inherit(function () {
    return {
      _generateNewItem: function _generateNewItem(key) {
        var item = this.callBase(key);
        item.data = {
          key: key
        };
        item.children = [];
        item.level = 0;
        item.parentKey = this.option('rootValue');
        return item;
      },
      _isProcessedItem: function _isProcessedItem() {
        return true;
      },
      _setInsertAfterOrBeforeKey: function _setInsertAfterOrBeforeKey(change, parentKey) {
        if (parentKey !== undefined && parentKey !== this.option('rootValue')) {
          change.insertAfterKey = parentKey;
        } else {
          this.callBase.apply(this, arguments);
        }
      },
      _getLoadedRowIndex: function _getLoadedRowIndex(items, change) {
        var dataController = this.getController('data');
        var dataSourceAdapter = dataController.dataSource();
        var parentKey = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.parentKeyOf(change.data);
        if (parentKey !== undefined && parentKey !== this.option('rootValue')) {
          var rowIndex = _uiGrid_core.default.getIndexByKey(parentKey, items);
          if (rowIndex >= 0 && this._dataController.isRowExpanded(parentKey)) {
            return rowIndex + 1;
          }
          return -1;
        }
        return this.callBase.apply(this, arguments);
      },
      _isEditColumnVisible: function _isEditColumnVisible() {
        var result = this.callBase.apply(this, arguments);
        var editingOptions = this.option('editing');
        return result || editingOptions.allowAdding;
      },
      _isDefaultButtonVisible: function _isDefaultButtonVisible(button, options) {
        var result = this.callBase.apply(this, arguments);
        var row = options.row;
        if (button.name === 'add') {
          return this.allowAdding(options) && row.rowIndex !== this._getVisibleEditRowIndex() && !(row.removed || row.isNewRow);
        }
        return result;
      },
      _getEditingButtons: function _getEditingButtons(options) {
        var buttons = this.callBase.apply(this, arguments);
        if (!options.column.buttons) {
          buttons.unshift(this._getButtonConfig('add', options));
        }
        return buttons;
      },
      _beforeSaveEditData: function _beforeSaveEditData(change) {
        var dataController = this._dataController;
        var result = this.callBase.apply(this, arguments);
        if (change && change.type !== DATA_EDIT_DATA_INSERT_TYPE) {
          var store = dataController === null || dataController === void 0 ? void 0 : dataController.store();
          var key = store === null || store === void 0 ? void 0 : store.key();
          if (!(0, _type.isDefined)(key)) {
            throw _ui.default.Error('E1045');
          }
        }
        return result;
      },
      addRowByRowIndex: function addRowByRowIndex(rowIndex) {
        var dataController = this.getController('data');
        var row = dataController.getVisibleRows()[rowIndex];
        return this.addRow(row ? row.key : undefined);
      },
      addRow: function addRow(key) {
        if (key === undefined) {
          key = this.option('rootValue');
        }
        return this.callBase.call(this, key);
      },
      _addRowCore: function _addRowCore(data, parentKey, oldEditRowIndex) {
        var _this = this;
        var callBase = this.callBase;
        var rootValue = this.option('rootValue');
        var dataController = this.getController('data');
        var dataSourceAdapter = dataController.dataSource();
        var parentKeyGetter = dataSourceAdapter.createParentIdGetter();
        parentKey = parentKeyGetter(data);
        if (parentKey !== undefined && parentKey !== rootValue && !dataController.isRowExpanded(parentKey)) {
          // @ts-expect-error
          var deferred = new _deferred.Deferred();
          dataController.expandRow(parentKey).done(function () {
            setTimeout(function () {
              callBase.call(_this, data, parentKey, oldEditRowIndex).done(deferred.resolve).fail(deferred.reject);
            });
          }).fail(deferred.reject);
          return deferred.promise();
        }
        return callBase.call(this, data, parentKey, oldEditRowIndex);
      },
      _initNewRow: function _initNewRow(options, parentKey) {
        var dataController = this.getController('data');
        var dataSourceAdapter = dataController.dataSource();
        var parentIdSetter = dataSourceAdapter.createParentIdSetter();
        parentIdSetter(options.data, parentKey);
        return this.callBase.apply(this, arguments);
      },
      allowAdding: function allowAdding(options) {
        return this._allowEditAction('allowAdding', options);
      },
      _needToCloseEditableCell: function _needToCloseEditableCell($targetElement) {
        return this.callBase.apply(this, arguments) || $targetElement.closest(".".concat(TREELIST_EXPAND_ICON_CONTAINER_CLASS)).length && this.isEditing();
      },
      getButtonLocalizationNames: function getButtonLocalizationNames() {
        var names = this.callBase.apply(this);
        names.add = 'dxTreeList-editingAddRowToNode';
        return names;
      }
    };
  }());
  var originalRowClick = _uiGrid_core2.editingModule.extenders.views.rowsView._rowClick;
  var originalRowDblClick = _uiGrid_core2.editingModule.extenders.views.rowsView._rowDblClick;
  var validateClick = function validateClick(e) {
    var $targetElement = (0, _renderer.default)(e.event.target);
    var originalClickHandler = e.event.type === 'dxdblclick' ? originalRowDblClick : originalRowClick;
    if ($targetElement.closest(".".concat(SELECT_CHECKBOX_CLASS)).length) {
      return false;
    }
    return !needToCallOriginalClickHandler.call(this, e, originalClickHandler);
  };
  function needToCallOriginalClickHandler(e, originalClickHandler) {
    var $targetElement = (0, _renderer.default)(e.event.target);
    if (!$targetElement.closest(".".concat(TREELIST_EXPAND_ICON_CONTAINER_CLASS)).length) {
      originalClickHandler.call(this, e);
      return true;
    }
    return false;
  }
  var RowsViewExtender = (0, _extend.extend)({}, _uiGrid_core2.editingModule.extenders.views.rowsView, {
    _renderCellCommandContent: function _renderCellCommandContent($container, options) {
      var editingController = this._editingController;
      var isEditRow = options.row && editingController.isEditRow(options.row.rowIndex);
      var isEditing = options.isEditing || isEditRow;
      if (!isEditing) {
        return this.callBase.apply(this, arguments);
      }
      return false;
    },
    _rowClick: function _rowClick(e) {
      if (validateClick.call(this, e)) {
        this.callBase.apply(this, arguments);
      }
    },
    _rowDblClick: function _rowDblClick(e) {
      if (validateClick.call(this, e)) {
        this.callBase.apply(this, arguments);
      }
    }
  });
  _module_core.default.registerModule('editing', {
    defaultOptions: function defaultOptions() {
      return (0, _extend.extend)(true, _uiGrid_core2.editingModule.defaultOptions(), {
        editing: {
          texts: {
            addRowToNode: _message.default.format('dxTreeList-editingAddRowToNode')
          }
        }
      });
    },
    controllers: {
      editing: EditingController
    },
    extenders: {
      controllers: (0, _extend.extend)(true, {}, _uiGrid_core2.editingModule.extenders.controllers, {
        data: {
          changeRowExpand: function changeRowExpand() {
            this._editingController.refresh();
            return this.callBase.apply(this, arguments);
          }
        }
      }),
      views: {
        rowsView: RowsViewExtender,
        headerPanel: _uiGrid_core2.editingModule.extenders.views.headerPanel
      }
    }
  });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../module_not_extended/editor_factory","../../../../core/renderer","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/deferred","../../../../localization/message","../../../../ui/widget/ui.errors","../../../../ui/grid_core/ui.grid_core.utils","../../../../ui/grid_core/ui.grid_core.editing","../module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../module_not_extended/editor_factory"), require("../../../../core/renderer"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/deferred"), require("../../../../localization/message"), require("../../../../ui/widget/ui.errors"), require("../../../../ui/grid_core/ui.grid_core.utils"), require("../../../../ui/grid_core/ui.grid_core.editing"), require("../module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map