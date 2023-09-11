import { equalByValue } from '../../../../core/utils/common';
import { EDIT_FORM_CLASS, EDIT_MODE_ROW, EDIT_ROW, EDITING_EDITROWKEY_OPTION_NAME, MODES_WITH_DELAYED_FOCUS, ROW_SELECTED_CLASS } from './const';
var editingControllerExtender = Base => class RowBasedEditingControllerExtender extends Base {
  isRowEditMode() {
    return this.getEditMode() === EDIT_MODE_ROW;
  }
  _afterCancelEditData(rowIndex) {
    var dataController = this._dataController;
    if (this.isRowBasedEditMode() && rowIndex >= 0) {
      dataController.updateItems({
        changeType: 'update',
        rowIndices: [rowIndex, rowIndex + 1]
      });
    } else {
      super._afterCancelEditData(rowIndex);
    }
  }
  _isDefaultButtonVisible(button, options) {
    var isRowMode = this.isRowBasedEditMode();
    var isEditRow = options.row && equalByValue(options.row.key, this.option(EDITING_EDITROWKEY_OPTION_NAME));
    if (isRowMode) {
      switch (button.name) {
        case 'edit':
          return !isEditRow && this.allowUpdating(options);
        case 'delete':
          return super._isDefaultButtonVisible(button, options) && !isEditRow;
        case 'save':
        case 'cancel':
          return isEditRow;
        default:
          return super._isDefaultButtonVisible(button, options);
      }
    }
    return super._isDefaultButtonVisible(button, options);
  }
  isEditRow(rowIndex) {
    return this.isRowBasedEditMode() && this.isEditRowByIndex(rowIndex);
  }
  _cancelSaving(result) {
    if (this.isRowBasedEditMode()) {
      if (!this.hasChanges()) {
        this._cancelEditDataCore();
      }
    }
    super._cancelSaving(result);
  }
  _refreshCore(params) {
    var {
      allowCancelEditing
    } = params !== null && params !== void 0 ? params : {};
    if (this.isRowBasedEditMode()) {
      var hasUpdateChanges = this.getChanges().filter(it => it.type === 'update').length > 0;
      this.init();
      allowCancelEditing && hasUpdateChanges && this._cancelEditDataCore();
    }
    super._refreshCore(params);
  }
  _isEditColumnVisible() {
    var result = super._isEditColumnVisible();
    var editingOptions = this.option('editing');
    var isRowEditMode = this.isRowEditMode();
    var isVisibleInRowEditMode = editingOptions.allowUpdating || editingOptions.allowAdding;
    return result || isRowEditMode && isVisibleInRowEditMode;
  }
  _focusEditorIfNeed() {
    var editMode = this.getEditMode();
    if (this._needFocusEditor) {
      if (MODES_WITH_DELAYED_FOCUS.includes(editMode)) {
        var $editingCell = this.getFocusedCellInRow(this._getVisibleEditRowIndex());
        this._delayedInputFocus($editingCell, () => {
          // @ts-expect-error
          $editingCell && this.component.focus($editingCell);
        });
      }
      this._needFocusEditor = false;
    }
  }
};
export var editingRowBasedModule = {
  extenders: {
    controllers: {
      editing: editingControllerExtender,
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
          var editingController = this.getController('editing');
          if (editingController.isRowBasedEditMode() && oldItem.isEditing !== newItem.isEditing) {
            return;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          if (row) {
            var editingController = this._editingController;
            var isEditRow = editingController.isEditRow(row.rowIndex);
            if (isEditRow) {
              $row.addClass(EDIT_ROW);
              $row.removeClass(ROW_SELECTED_CLASS);
              if (row.rowType === 'detail') {
                $row.addClass(this.addWidgetPrefix(EDIT_FORM_CLASS));
              }
            }
          }
          return $row;
        },
        _update(change) {
          this.callBase(change);
          if (change.changeType === 'updateSelection') {
            this.getTableElements().children('tbody').children(".".concat(EDIT_ROW)).removeClass(ROW_SELECTED_CLASS);
          }
        }
      }
    }
  }
};