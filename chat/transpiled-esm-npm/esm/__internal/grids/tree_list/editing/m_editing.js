/* eslint-disable max-classes-per-file */
import '../module_not_extended/editor_factory';
import messageLocalization from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import { isDefined } from '../../../../core/utils/type';
import errors from '../../../../ui/widget/ui.errors';
import { dataControllerEditingExtenderMixin, editingModule } from '../../../grids/grid_core/editing/m_editing';
import gridCoreUtils from '../../../grids/grid_core/m_utils';
import treeListCore from '../m_core';
const TREELIST_EXPAND_ICON_CONTAINER_CLASS = 'dx-treelist-icon-container';
const SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
const DATA_EDIT_DATA_INSERT_TYPE = 'insert';
class EditingController extends editingModule.controllers.editing {
  _generateNewItem(key) {
    const item = super._generateNewItem(key);
    item.data = {
      key
    };
    item.children = [];
    item.level = 0;
    item.parentKey = this.option('rootValue');
    return item;
  }
  _isProcessedItem() {
    return true;
  }
  _setInsertAfterOrBeforeKey(change, parentKey) {
    const dataSourceAdapter = this._dataController.dataSource();
    const key = parentKey || (dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.parentKeyOf(change.data));
    if (key !== undefined && key !== this.option('rootValue')) {
      change.insertAfterKey = key;
    } else {
      // @ts-expect-error
      super._setInsertAfterOrBeforeKey.apply(this, arguments);
    }
  }
  _getLoadedRowIndex(items, change) {
    const dataSourceAdapter = this._dataController.dataSource();
    const parentKey = dataSourceAdapter === null || dataSourceAdapter === void 0 ? void 0 : dataSourceAdapter.parentKeyOf(change.data);
    if (parentKey !== undefined && parentKey !== this.option('rootValue')) {
      const rowIndex = gridCoreUtils.getIndexByKey(parentKey, items);
      // @ts-expect-error
      if (rowIndex >= 0 && this._dataController.isRowExpanded(parentKey)) {
        // @ts-expect-error
        return super._getLoadedRowIndex.apply(this, arguments);
      }
      return -1;
    }
    // @ts-expect-error
    return super._getLoadedRowIndex.apply(this, arguments);
  }
  _isEditColumnVisible() {
    // @ts-expect-error
    const result = super._isEditColumnVisible.apply(this, arguments);
    const editingOptions = this.option('editing');
    return result || editingOptions.allowAdding;
  }
  _isDefaultButtonVisible(button, options) {
    // @ts-expect-error
    const result = super._isDefaultButtonVisible.apply(this, arguments);
    const {
      row
    } = options;
    if (button.name === 'add') {
      return this.allowAdding(options) && row.rowIndex !== this._getVisibleEditRowIndex() && !(row.removed || row.isNewRow);
    }
    return result;
  }
  _getEditingButtons(options) {
    // @ts-expect-error
    const buttons = super._getEditingButtons.apply(this, arguments);
    if (!options.column.buttons) {
      buttons.unshift(this._getButtonConfig('add', options));
    }
    return buttons;
  }
  _beforeSaveEditData(change) {
    // @ts-expect-error
    const result = super._beforeSaveEditData.apply(this, arguments);
    if (change && change.type !== DATA_EDIT_DATA_INSERT_TYPE) {
      var _this$_dataController;
      const store = (_this$_dataController = this._dataController) === null || _this$_dataController === void 0 ? void 0 : _this$_dataController.store();
      const key = store === null || store === void 0 ? void 0 : store.key();
      if (!isDefined(key)) {
        throw errors.Error('E1045');
      }
    }
    return result;
  }
  addRowByRowIndex(rowIndex) {
    const row = this._dataController.getVisibleRows()[rowIndex];
    return this.addRow(row ? row.key : undefined);
  }
  addRow(key) {
    if (key === undefined) {
      key = this.option('rootValue');
    }
    return super.addRow.call(this, key);
  }
  _addRowCore(data, parentKey, oldEditRowIndex) {
    const rootValue = this.option('rootValue');
    const dataSourceAdapter = this._dataController.dataSource();
    const parentKeyGetter = dataSourceAdapter.createParentIdGetter();
    parentKey = parentKeyGetter(data);
    // @ts-expect-error
    if (parentKey !== undefined && parentKey !== rootValue && !this._dataController.isRowExpanded(parentKey)) {
      // @ts-expect-error
      const deferred = new Deferred();
      // @ts-expect-error
      this._dataController.expandRow(parentKey).done(() => {
        setTimeout(() => {
          super._addRowCore.call(this, data, parentKey, oldEditRowIndex).done(deferred.resolve).fail(deferred.reject);
        });
      }).fail(deferred.reject);
      return deferred.promise();
    }
    return super._addRowCore.call(this, data, parentKey, oldEditRowIndex);
  }
  _initNewRow(options, parentKey) {
    const dataSourceAdapter = this._dataController.dataSource();
    const parentIdSetter = dataSourceAdapter.createParentIdSetter();
    parentIdSetter(options.data, parentKey);
    // @ts-expect-error
    return super._initNewRow.apply(this, arguments);
  }
  allowAdding(options) {
    return this._allowEditAction('allowAdding', options);
  }
  _needToCloseEditableCell($targetElement) {
    // @ts-expect-error
    return super._needToCloseEditableCell.apply(this, arguments) || $targetElement.closest(`.${TREELIST_EXPAND_ICON_CONTAINER_CLASS}`).length && this.isEditing();
  }
  getButtonLocalizationNames() {
    const names = super.getButtonLocalizationNames.apply(this);
    // @ts-expect-error
    names.add = 'dxTreeList-editingAddRowToNode';
    return names;
  }
}
const rowsView = Base => class TreeListEditingRowsViewExtender extends editingModule.extenders.views.rowsView(Base) {
  _renderCellCommandContent($container, options) {
    const editingController = this._editingController;
    const isEditRow = options.row && editingController.isEditRow(options.row.rowIndex);
    const isEditing = options.isEditing || isEditRow;
    if (!options.isOnForm && !isEditing) {
      // @ts-expect-error
      return super._renderCellCommandContent.apply(this, arguments);
    }
    return false;
  }
  validateClick(e) {
    const $targetElement = $(e.event.target);
    const originalClickHandler = e.event.type === 'dxdblclick' ? super._rowDblClick : super._rowClick;
    if ($targetElement.closest(`.${SELECT_CHECKBOX_CLASS}`).length) {
      return false;
    }
    return !this.needToCallOriginalClickHandler(e, originalClickHandler);
  }
  needToCallOriginalClickHandler(e, originalClickHandler) {
    const $targetElement = $(e.event.target);
    if (!$targetElement.closest(`.${TREELIST_EXPAND_ICON_CONTAINER_CLASS}`).length) {
      originalClickHandler.call(this, e);
      return true;
    }
    return false;
  }
  _rowClick(e) {
    if (this.validateClick(e)) {
      // @ts-expect-error
      super._rowClickTreeListHack.apply(this, arguments);
    }
  }
  _rowDblClick(e) {
    if (this.validateClick(e)) {
      // @ts-expect-error
      super._rowDblClickTreeListHack.apply(this, arguments);
    }
  }
};
const data = Base => class DataControllerTreeListEditingExtender extends dataControllerEditingExtenderMixin(Base) {
  changeRowExpand() {
    this._editingController.refresh();
    // @ts-expect-error
    return super.changeRowExpand.apply(this, arguments);
  }
};
treeListCore.registerModule('editing', {
  defaultOptions() {
    return extend(true, editingModule.defaultOptions(), {
      editing: {
        texts: {
          addRowToNode: messageLocalization.format('dxTreeList-editingAddRowToNode')
        }
      }
    });
  },
  controllers: {
    editing: EditingController
  },
  extenders: {
    controllers: {
      data
    },
    views: {
      rowsView,
      headerPanel: editingModule.extenders.views.headerPanel
    }
  }
});