"use strict";

require("../module_not_extended/editor_factory");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_editing = require("../../../grids/grid_core/editing/m_editing");
var _m_utils = _interopRequireDefault(require("../../../grids/grid_core/m_utils"));
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var TREELIST_EXPAND_ICON_CONTAINER_CLASS = 'dx-treelist-icon-container';
var SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
var DATA_EDIT_DATA_INSERT_TYPE = 'insert';
var EditingController = _m_editing.editingModule.controllers.editing.inherit(function () {
  return {
    _generateNewItem(key) {
      var item = this.callBase(key);
      item.data = {
        key
      };
      item.children = [];
      item.level = 0;
      item.parentKey = this.option('rootValue');
      return item;
    },
    _isProcessedItem() {
      return true;
    },
    _setInsertAfterOrBeforeKey(change, parentKey) {
      if (parentKey !== undefined && parentKey !== this.option('rootValue')) {
        change.insertAfterKey = parentKey;
      } else {
        this.callBase.apply(this, arguments);
      }
    },
    _getLoadedRowIndex(items, change) {
      var dataController = this.getController('data');
      var dataSourceAdapter = dataController.dataSource();
      var parentKey = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.parentKeyOf(change.data);
      if (parentKey !== undefined && parentKey !== this.option('rootValue')) {
        var rowIndex = _m_utils.default.getIndexByKey(parentKey, items);
        if (rowIndex >= 0 && this._dataController.isRowExpanded(parentKey)) {
          return rowIndex + 1;
        }
        return -1;
      }
      return this.callBase.apply(this, arguments);
    },
    _isEditColumnVisible() {
      var result = this.callBase.apply(this, arguments);
      var editingOptions = this.option('editing');
      return result || editingOptions.allowAdding;
    },
    _isDefaultButtonVisible(button, options) {
      var result = this.callBase.apply(this, arguments);
      var row = options.row;
      if (button.name === 'add') {
        return this.allowAdding(options) && row.rowIndex !== this._getVisibleEditRowIndex() && !(row.removed || row.isNewRow);
      }
      return result;
    },
    _getEditingButtons(options) {
      var buttons = this.callBase.apply(this, arguments);
      if (!options.column.buttons) {
        buttons.unshift(this._getButtonConfig('add', options));
      }
      return buttons;
    },
    _beforeSaveEditData(change) {
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
    addRowByRowIndex(rowIndex) {
      var dataController = this.getController('data');
      var row = dataController.getVisibleRows()[rowIndex];
      return this.addRow(row ? row.key : undefined);
    },
    addRow(key) {
      if (key === undefined) {
        key = this.option('rootValue');
      }
      return this.callBase.call(this, key);
    },
    _addRowCore(data, parentKey, oldEditRowIndex) {
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
    _initNewRow(options, parentKey) {
      var dataController = this.getController('data');
      var dataSourceAdapter = dataController.dataSource();
      var parentIdSetter = dataSourceAdapter.createParentIdSetter();
      parentIdSetter(options.data, parentKey);
      return this.callBase.apply(this, arguments);
    },
    allowAdding(options) {
      return this._allowEditAction('allowAdding', options);
    },
    _needToCloseEditableCell($targetElement) {
      return this.callBase.apply(this, arguments) || $targetElement.closest(".".concat(TREELIST_EXPAND_ICON_CONTAINER_CLASS)).length && this.isEditing();
    },
    getButtonLocalizationNames() {
      var names = this.callBase.apply(this);
      names.add = 'dxTreeList-editingAddRowToNode';
      return names;
    }
  };
}());
var originalRowClick = _m_editing.editingModule.extenders.views.rowsView._rowClick;
var originalRowDblClick = _m_editing.editingModule.extenders.views.rowsView._rowDblClick;
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
var RowsViewExtender = (0, _extend.extend)({}, _m_editing.editingModule.extenders.views.rowsView, {
  _renderCellCommandContent($container, options) {
    var editingController = this._editingController;
    var isEditRow = options.row && editingController.isEditRow(options.row.rowIndex);
    var isEditing = options.isEditing || isEditRow;
    if (!isEditing) {
      return this.callBase.apply(this, arguments);
    }
    return false;
  },
  _rowClick(e) {
    if (validateClick.call(this, e)) {
      this.callBase.apply(this, arguments);
    }
  },
  _rowDblClick(e) {
    if (validateClick.call(this, e)) {
      this.callBase.apply(this, arguments);
    }
  }
});
_m_core.default.registerModule('editing', {
  defaultOptions() {
    return (0, _extend.extend)(true, _m_editing.editingModule.defaultOptions(), {
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
    controllers: (0, _extend.extend)(true, {}, _m_editing.editingModule.extenders.controllers, {
      data: {
        changeRowExpand() {
          this._editingController.refresh();
          return this.callBase.apply(this, arguments);
        }
      }
    }),
    views: {
      rowsView: RowsViewExtender,
      headerPanel: _m_editing.editingModule.extenders.views.headerPanel
    }
  }
});