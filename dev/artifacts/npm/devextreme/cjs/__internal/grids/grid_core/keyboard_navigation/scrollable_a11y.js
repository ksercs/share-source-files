/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/scrollable_a11y.js)
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
exports.keyboardNavigationScrollableA11yExtender = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* eslint-disable max-classes-per-file */ /* eslint-disable @typescript-eslint/no-explicit-any */ /*
                                                                                                                                                                                                                                                                                                           This extender is to fix accessibilty issue: Scrollable should always have focusable element inside.
                                                                                                                                                                                                                                                                                                           When there are fixed columns on the left and grid has scroll, scrollable element does not have
                                                                                                                                                                                                                                                                                                           any focusable elements inside, because first cell of fixed table gets tabIndex.
                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                           This fix makes first cell in not fixed table to always have tabIndex, so checker won't show error.
                                                                                                                                                                                                                                                                                                           And to make navigation via Tab key working properly some focus event handlers are added.
                                                                                                                                                                                                                                                                                                           */
// eslint-disable-next-line max-len
var keyboardNavigationScrollableA11yExtender = function keyboardNavigationScrollableA11yExtender(Base) {
  return /*#__PURE__*/function (_Base) {
    _inheritsLoose(ScrollableA11yExtender, _Base);
    function ScrollableA11yExtender() {
      return _Base.apply(this, arguments) || this;
    }
    var _proto = ScrollableA11yExtender.prototype;
    _proto.init = function init() {
      var _a;
      _Base.prototype.init.call(this);
      // eslint-disable-next-line max-len
      this.rowsViewFocusOutHandlerContext = (_a = this.rowsViewFocusOutHandlerContext) !== null && _a !== void 0 ? _a : this.rowsViewFocusOutHandler.bind(this);
    };
    _proto.subscribeToRowsViewFocusEvent = function subscribeToRowsViewFocusEvent() {
      var _a;
      _Base.prototype.subscribeToRowsViewFocusEvent.call(this);
      var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
      _events_engine.default.on($rowsView, 'focusout', this.rowsViewFocusOutHandlerContext);
    };
    _proto.unsubscribeFromRowsViewFocusEvent = function unsubscribeFromRowsViewFocusEvent() {
      var _a;
      _Base.prototype.unsubscribeFromRowsViewFocusEvent.call(this);
      var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
      _events_engine.default.off($rowsView, 'focusout', this.rowsViewFocusOutHandlerContext);
    };
    _proto.rowsViewFocusHandler = function rowsViewFocusHandler(event) {
      var $target = (0, _renderer.default)(event.target);
      this.translateFocusIfNeed(event, $target);
      _Base.prototype.rowsViewFocusHandler.call(this, event);
    };
    _proto.rowsViewFocusOutHandler = function rowsViewFocusOutHandler() {
      this.makeScrollableFocusableIfNeed();
    };
    _proto.translateFocusIfNeed = function translateFocusIfNeed(event, $target) {
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
    };
    _proto.renderCompleted = function renderCompleted(e) {
      this._$firstNotFixedCell = this.getFirstNotFixedCell();
      this.makeScrollableFocusableIfNeed();
      _Base.prototype.renderCompleted.call(this, e);
    };
    _proto._focus = function _focus($cell, disableFocus, skipFocusEvent) {
      _Base.prototype._focus.call(this, $cell, disableFocus, skipFocusEvent);
      this.makeScrollableFocusableIfNeed();
    };
    _proto._tabKeyHandler = function _tabKeyHandler(eventArgs, isEditing) {
      var _a;
      var isCellPositionDefined = (0, _type.isDefined)(this._focusedCellPosition) && !(0, _type.isEmptyObject)(this._focusedCellPosition);
      var isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
      var isNeedFocusable = this.isScrollableNeedFocusable();
      if (isOriginalHandlerRequired && isNeedFocusable) {
        (_a = this._$firstNotFixedCell) === null || _a === void 0 ? void 0 : _a.removeAttr('tabIndex');
      }
      _Base.prototype._tabKeyHandler.call(this, eventArgs, isEditing);
    };
    _proto.getFirstNotFixedCell = function getFirstNotFixedCell() {
      var columns = this._columnsController.getVisibleColumns();
      var columnIndex = columns.findIndex(function (_ref) {
        var fixed = _ref.fixed;
        return !fixed;
      });
      return columnIndex === -1 ? undefined : this._rowsView._getCellElement(0, columnIndex);
    };
    _proto.isScrollableNeedFocusable = function isScrollableNeedFocusable() {
      var _a, _b;
      var hasScrollable = !!this._rowsView.getScrollable();
      var hasFixedTable = !!((_a = this._rowsView._fixedTableElement) === null || _a === void 0 ? void 0 : _a.length);
      var isCellsRendered = !!((_b = this._rowsView.getCellElements(0)) === null || _b === void 0 ? void 0 : _b.length);
      return hasScrollable && hasFixedTable && isCellsRendered;
    };
    _proto.makeScrollableFocusableIfNeed = function makeScrollableFocusableIfNeed() {
      var needFocusable = this.isScrollableNeedFocusable();
      if (!needFocusable || !this._$firstNotFixedCell) {
        return;
      }
      this._applyTabIndexToElement(this._$firstNotFixedCell);
    };
    return ScrollableA11yExtender;
  }(Base);
};
exports.keyboardNavigationScrollableA11yExtender = keyboardNavigationScrollableA11yExtender;
