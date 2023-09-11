/**
* DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/scrollable_a11y.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
This extender is to fix accessibilty issue: Scrollable should always have focusable element inside.
When there are fixed columns on the left and grid has scroll, scrollable element does not have
any focusable elements inside, because first cell of fixed table gets tabIndex.

This fix makes first cell in not fixed table to always have tabIndex, so checker won't show error.
And to make navigation via Tab key working properly some focus event handlers are added.
*/
import $ from '../../../../core/renderer';
import { isDefined, isEmptyObject } from '../../../../core/utils/type';
import eventsEngine from '../../../../events/core/events_engine';
// eslint-disable-next-line max-len
export var keyboardNavigationScrollableA11yExtender = Base => class ScrollableA11yExtender extends Base {
  init() {
    var _a;
    super.init();
    // eslint-disable-next-line max-len
    this.rowsViewFocusOutHandlerContext = (_a = this.rowsViewFocusOutHandlerContext) !== null && _a !== void 0 ? _a : this.rowsViewFocusOutHandler.bind(this);
  }
  subscribeToRowsViewFocusEvent() {
    var _a;
    super.subscribeToRowsViewFocusEvent();
    var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
    eventsEngine.on($rowsView, 'focusout', this.rowsViewFocusOutHandlerContext);
  }
  unsubscribeFromRowsViewFocusEvent() {
    var _a;
    super.unsubscribeFromRowsViewFocusEvent();
    var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
    eventsEngine.off($rowsView, 'focusout', this.rowsViewFocusOutHandlerContext);
  }
  rowsViewFocusHandler(event) {
    var $target = $(event.target);
    this.translateFocusIfNeed(event, $target);
    super.rowsViewFocusHandler(event);
  }
  rowsViewFocusOutHandler() {
    this.makeScrollableFocusableIfNeed();
  }
  translateFocusIfNeed(event, $target) {
    var needTranslateFocus = this.isScrollableNeedFocusable();
    var isFirstCellFixed = this._isFixedColumn(0);
    if (!needTranslateFocus || !isFirstCellFixed) {
      return;
    }
    var $firstCell = this._rowsView.getCell({
      rowIndex: 0,
      columnIndex: 0
    });
    var firstCellHasTabIndex = !!$firstCell.attr('tabindex');
    // @ts-expect-error dxElementWrapper doesn't have overload for 'is' method
    var notFixedCellIsTarget = $target.is(this._$firstNotFixedCell);
    if (firstCellHasTabIndex && notFixedCellIsTarget) {
      event.preventDefault();
      this._focus($firstCell);
    }
  }
  renderCompleted(e) {
    this._$firstNotFixedCell = this.getFirstNotFixedCell();
    this.makeScrollableFocusableIfNeed();
    super.renderCompleted(e);
  }
  _focus($cell, disableFocus, skipFocusEvent) {
    super._focus($cell, disableFocus, skipFocusEvent);
    this.makeScrollableFocusableIfNeed();
  }
  _tabKeyHandler(eventArgs, isEditing) {
    var _a;
    var isCellPositionDefined = isDefined(this._focusedCellPosition) && !isEmptyObject(this._focusedCellPosition);
    var isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
    var isNeedFocusable = this.isScrollableNeedFocusable();
    if (isOriginalHandlerRequired && isNeedFocusable) {
      (_a = this._$firstNotFixedCell) === null || _a === void 0 ? void 0 : _a.removeAttr('tabIndex');
    }
    super._tabKeyHandler(eventArgs, isEditing);
  }
  getFirstNotFixedCell() {
    var columns = this._columnsController.getVisibleColumns();
    var columnIndex = columns.findIndex(_ref => {
      var {
        fixed
      } = _ref;
      return !fixed;
    });
    return columnIndex === -1 ? undefined : this._rowsView._getCellElement(0, columnIndex);
  }
  isScrollableNeedFocusable() {
    var _a, _b;
    var hasScrollable = !!this._rowsView.getScrollable();
    var hasFixedTable = !!((_a = this._rowsView._fixedTableElement) === null || _a === void 0 ? void 0 : _a.length);
    var isCellsRendered = !!((_b = this._rowsView.getCellElements(0)) === null || _b === void 0 ? void 0 : _b.length);
    return hasScrollable && hasFixedTable && isCellsRendered;
  }
  makeScrollableFocusableIfNeed() {
    var needFocusable = this.isScrollableNeedFocusable();
    if (!needFocusable || !this._$firstNotFixedCell) {
      return;
    }
    this._applyTabIndexToElement(this._$firstNotFixedCell);
  }
};
