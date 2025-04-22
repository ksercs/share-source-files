/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/scrollable_a11y.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyboardNavigationScrollableA11yExtender = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @stylistic/max-len
const keyboardNavigationScrollableA11yExtender = Base => class ScrollableA11yExtender extends Base {
  rowsViewFocusHandler(event) {
    const $target = (0, _renderer.default)(event.target);
    this.translateFocusIfNeed(event, $target);
    super.rowsViewFocusHandler(event);
  }
  rowsViewFocusOutHandler() {
    super.rowsViewFocusOutHandler();
    this.makeScrollableFocusableIfNeed();
  }
  translateFocusIfNeed(event, $target) {
    const needTranslateFocus = this.isScrollableNeedFocusable();
    const isFirstCellFixed = this._isFixedColumn(0);
    if (!needTranslateFocus || !isFirstCellFixed) {
      return;
    }
    const $firstCell = this._rowsView.getCell({
      rowIndex: 0,
      columnIndex: 0
    });
    const firstCellHasTabIndex = !!$firstCell.attr('tabindex');
    // @ts-expect-error dxElementWrapper doesn't have overload for 'is' method
    const notFixedCellIsTarget = $target.is(this._$firstNotFixedCell);
    if (firstCellHasTabIndex && notFixedCellIsTarget) {
      event.preventDefault();
      this._focus($firstCell);
    }
  }
  rowsViewRenderCompleted(e) {
    this._$firstNotFixedCell = this.getFirstNotFixedCell();
    this.makeScrollableFocusableIfNeed();
    super.rowsViewRenderCompleted(e);
  }
  _focus($cell, disableFocus, skipFocusEvent) {
    super._focus($cell, disableFocus, skipFocusEvent);
    this.makeScrollableFocusableIfNeed();
  }
  _tabKeyHandler(eventArgs, isEditing) {
    const isCellPositionDefined = (0, _type.isDefined)(this._focusedCellPosition) && !(0, _type.isEmptyObject)(this._focusedCellPosition);
    const isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
    const isNeedFocusable = this.isScrollableNeedFocusable();
    if (isOriginalHandlerRequired && isNeedFocusable) {
      var _this$_$firstNotFixed;
      (_this$_$firstNotFixed = this._$firstNotFixedCell) === null || _this$_$firstNotFixed === void 0 || _this$_$firstNotFixed.removeAttr('tabIndex');
    }
    super._tabKeyHandler(eventArgs, isEditing);
  }
  getFirstNotFixedCell() {
    var _this$_editingControl;
    const columns = this._columnsController.getVisibleColumns();
    const columnIndex = columns.findIndex(_ref => {
      let {
        fixed
      } = _ref;
      return !fixed;
    });
    const isEditing = (_this$_editingControl = this._editingController) === null || _this$_editingControl === void 0 ? void 0 : _this$_editingControl.isEditing();
    return columnIndex === -1 || isEditing ? undefined : this._rowsView._getCellElement(0, columnIndex);
  }
  isScrollableNeedFocusable() {
    var _this$_rowsView$_fixe, _this$_rowsView$getCe;
    const hasScrollable = !!this._rowsView.getScrollable();
    // @ts-expect-error _fixedTableElement is declared in rowsView extender
    const hasFixedTable = !!((_this$_rowsView$_fixe = this._rowsView._fixedTableElement) !== null && _this$_rowsView$_fixe !== void 0 && _this$_rowsView$_fixe.length);
    const isCellsRendered = !!((_this$_rowsView$getCe = this._rowsView.getCellElements(0)) !== null && _this$_rowsView$getCe !== void 0 && _this$_rowsView$getCe.length);
    return hasScrollable && hasFixedTable && isCellsRendered;
  }
  makeScrollableFocusableIfNeed() {
    const needFocusable = this.isScrollableNeedFocusable();
    if (!needFocusable || !this._$firstNotFixedCell) {
      return;
    }
    this._applyTabIndexToElement(this._$firstNotFixedCell);
  }
};
exports.keyboardNavigationScrollableA11yExtender = keyboardNavigationScrollableA11yExtender;
