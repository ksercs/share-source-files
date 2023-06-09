/**
* DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
// @ts-check
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardNavigationModule = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/../core/renderer"));
var dom_adapter_1 = __importDefault(require("../../../../core/../core/dom_adapter"));
var events_engine_1 = __importDefault(require("../../../../core/../events/core/events_engine"));
var type_1 = require("../../../../core/../core/utils/type");
var selectors_1 = require("../../../../ui/widget/selectors");
var index_1 = require("../../../../core/../events/utils/index");
var pointer_1 = __importDefault(require("../../../../events/pointer"));
var click_1 = require("../../../../core/../events/click");
var common_1 = require("../../../../core/../core/utils/common");
var accessibility = __importStar(require("../../../../ui/shared/accessibility"));
var browser_1 = __importDefault(require("../../../../core/utils/browser"));
var short_1 = require("../../../../events/short");
var devices_1 = __importDefault(require("../../../../core/devices"));
var module_utils_1 = __importDefault(require("../module_utils"));
var modules_1 = __importDefault(require("../modules"));
var dom_1 = require("./dom");
// TODO: Move these constants to const.js
var ROWS_VIEW_CLASS = 'rowsview';
var EDIT_FORM_CLASS = 'edit-form';
var GROUP_FOOTER_CLASS = 'group-footer';
var ROW_CLASS = 'dx-row';
var DATA_ROW_CLASS = 'dx-data-row';
var GROUP_ROW_CLASS = 'dx-group-row';
var HEADER_ROW_CLASS = 'dx-header-row';
var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
var MASTER_DETAIL_ROW_CLASS = 'dx-master-detail-row';
var FREESPACE_ROW_CLASS = 'dx-freespace-row';
var VIRTUAL_ROW_CLASS = 'dx-virtual-row';
var MASTER_DETAIL_CELL_CLASS = 'dx-master-detail-cell';
var EDITOR_CELL_CLASS = 'dx-editor-cell';
var DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
var COMMAND_EXPAND_CLASS = 'dx-command-expand';
var COMMAND_SELECT_CLASS = 'dx-command-select';
var COMMAND_EDIT_CLASS = 'dx-command-edit';
var COMMAND_CELL_SELECTOR = '[class^=dx-command]';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var DATEBOX_WIDGET_NAME = 'dxDateBox';
var FOCUS_STATE_CLASS = 'dx-state-focused';
var WIDGET_CLASS = 'dx-widget';
var REVERT_BUTTON_CLASS = 'dx-revert-button';
var FAST_EDITING_DELETE_KEY = 'delete';
var INTERACTIVE_ELEMENTS_SELECTOR = 'input:not([type=\'hidden\']), textarea, a, select, button, [tabindex], .dx-checkbox';
var NON_FOCUSABLE_ELEMENTS_SELECTOR = INTERACTIVE_ELEMENTS_SELECTOR + ", .dx-dropdowneditor-icon";
var EDIT_MODE_ROW = 'row';
var EDIT_MODE_FORM = 'form';
var EDIT_MODE_BATCH = 'batch';
var EDIT_MODE_CELL = 'cell';
var FOCUS_TYPE_ROW = 'row';
var FOCUS_TYPE_CELL = 'cell';
var COLUMN_HEADERS_VIEW = 'columnHeadersView';
var FUNCTIONAL_KEYS = ['shift', 'control', 'alt'];
function isGroupRow($row) {
    return $row && $row.hasClass(GROUP_ROW_CLASS);
}
function isDetailRow($row) {
    return $row && $row.hasClass(MASTER_DETAIL_ROW_CLASS);
}
function isDataRow($row) {
    return $row && !isGroupRow($row) && !isDetailRow($row);
}
function isNotFocusedRow($row) {
    return !$row || ($row.hasClass(FREESPACE_ROW_CLASS) || $row.hasClass(VIRTUAL_ROW_CLASS));
}
function isEditorCell(that, $cell) {
    return !that._isRowEditMode() && $cell && !$cell.hasClass(COMMAND_SELECT_CLASS) && $cell.hasClass(EDITOR_CELL_CLASS);
}
function isElementDefined($element) {
    return type_1.isDefined($element) && $element.length > 0;
}
function isMobile() {
    return devices_1.default.current().deviceType !== 'desktop';
}
function isCellInHeaderRow($cell) {
    return !!$cell.parent("." + HEADER_ROW_CLASS).length;
}
function isFixedColumnIndexOffsetRequired(that, column) {
    var rtlEnabled = that.option('rtlEnabled');
    var result = false;
    if (rtlEnabled) {
        result = !(column.fixedPosition === 'right' || (type_1.isDefined(column.command) && !type_1.isDefined(column.fixedPosition)));
    }
    else {
        result = !(!type_1.isDefined(column.fixedPosition) || column.fixedPosition === 'left');
    }
    return result;
}
function shouldPreventScroll(that) {
    var keyboardController = that.getController('keyboardNavigation');
    return keyboardController._isVirtualScrolling() ? that.option('focusedRowIndex') === keyboardController.getRowIndex() : false;
}
var keyboardNavigationMembers = {
    // #region Initialization
    init: function () {
        var _this = this;
        this._dataController = this.getController('data');
        this._selectionController = this.getController('selection');
        this._editingController = this.getController('editing');
        this._headerPanel = this.getView('headerPanel');
        this._columnsController = this.getController('columns');
        this._editorFactory = this.getController('editorFactory');
        if (this.isKeyboardEnabled()) {
            accessibility.subscribeVisibilityChange();
            this._updateFocusTimeout = null;
            this._fastEditingStarted = false;
            this._focusedCellPosition = {};
            this._canceledCellPosition = null;
            var elementFocused = function ($element) {
                _this.setupFocusedView();
                if (_this._isNeedScroll) {
                    if ($element.is(':visible') && _this._focusedView && _this._focusedView.getScrollable) {
                        _this._focusedView._scrollToElement($element);
                        _this._isNeedScroll = false;
                    }
                }
            };
            this._editorFactory.focused.add(elementFocused);
            this._initViewHandlers();
            this._initDocumentHandlers();
            this.createAction('onKeyDown');
        }
    },
    _initViewHandlers: function () {
        var _this = this;
        var rowsView = this.getView('rowsView');
        var rowsViewFocusHandler = function (event) {
            var $element = renderer_1.default(event.target);
            var isRelatedTargetInRowsView = renderer_1.default(event.relatedTarget).closest(rowsView.element()).length;
            var isLink = $element.is('a');
            if (event.relatedTarget && isLink && !isRelatedTargetInRowsView && _this._isEventInCurrentGrid(event)) {
                var $focusedCell = _this._getFocusedCell();
                $focusedCell = !isElementDefined($focusedCell) ? rowsView.getCellElements(0).filter('[tabindex]').eq(0) : $focusedCell;
                if (!$element.closest($focusedCell).length) {
                    event.preventDefault();
                    // @ts-expect-error
                    events_engine_1.default.trigger($focusedCell, 'focus');
                }
            }
        };
        rowsView.renderCompleted.add(function (e) {
            var $rowsView = rowsView.element();
            var isFullUpdate = !e || e.changeType === 'refresh';
            var isFocusedViewCorrect = _this._focusedView && _this._focusedView.name === rowsView.name;
            var needUpdateFocus = false;
            var isAppend = e && (e.changeType === 'append' || e.changeType === 'prepend');
            // @ts-expect-error
            var root = renderer_1.default(dom_adapter_1.default.getRootNode($rowsView.get && $rowsView.get(0)));
            var $focusedElement = root.find(':focus');
            var isFocusedElementCorrect = !$focusedElement.length || $focusedElement.closest($rowsView).length;
            events_engine_1.default.off($rowsView, 'focusin', rowsViewFocusHandler);
            events_engine_1.default.on($rowsView, 'focusin', rowsViewFocusHandler);
            _this._initPointerEventHandler();
            _this._initKeyDownHandler();
            _this._setRowsViewAttributes();
            if (isFocusedViewCorrect && isFocusedElementCorrect) {
                needUpdateFocus = _this._isNeedFocus ? !isAppend : _this._isHiddenFocus && isFullUpdate && !(e === null || e === void 0 ? void 0 : e.virtualColumnsScrolling);
                needUpdateFocus && _this._updateFocus(true);
            }
        });
    },
    _initDocumentHandlers: function () {
        var _this = this;
        var document = dom_adapter_1.default.getDocument();
        this._documentClickHandler = this.createAction(function (e) {
            var $target = renderer_1.default(e.event.target);
            var isCurrentRowsViewClick = _this._isEventInCurrentGrid(e.event) && $target.closest("." + _this.addWidgetPrefix(ROWS_VIEW_CLASS)).length;
            var isEditorOverlay = $target.closest("." + DROPDOWN_EDITOR_OVERLAY_CLASS).length;
            var columnsResizerController = _this.getController('columnsResizer');
            var isColumnResizing = !!columnsResizerController && columnsResizerController.isResizing();
            if (!isCurrentRowsViewClick && !isEditorOverlay && !isColumnResizing) {
                // @ts-expect-error
                var targetInsideFocusedView = _this._focusedView ? $target.parents().filter(_this._focusedView.element()).length > 0 : false;
                !targetInsideFocusedView && _this._resetFocusedCell(true);
                _this._resetFocusedView();
            }
        });
        events_engine_1.default.on(document, index_1.addNamespace(pointer_1.default.down, 'dxDataGridKeyboardNavigation'), this._documentClickHandler);
    },
    _setRowsViewAttributes: function () {
        var $rowsView = this._getRowsViewElement();
        var isGridEmpty = !this._dataController.getVisibleRows().length;
        if (isGridEmpty) {
            this._applyTabIndexToElement($rowsView);
        }
    },
    _initPointerEventHandler: function () {
        var pointerEventName = !isMobile() ? pointer_1.default.down : click_1.name;
        var clickSelector = "." + ROW_CLASS + " > td, ." + ROW_CLASS;
        var $rowsView = this._getRowsViewElement();
        if (!type_1.isDefined(this._pointerEventAction)) {
            this._pointerEventAction = this.createAction(this._pointerEventHandler);
        }
        events_engine_1.default.off($rowsView, index_1.addNamespace(pointerEventName, 'dxDataGridKeyboardNavigation'), this._pointerEventAction);
        events_engine_1.default.on($rowsView, index_1.addNamespace(pointerEventName, 'dxDataGridKeyboardNavigation'), clickSelector, this._pointerEventAction);
    },
    _initKeyDownHandler: function () {
        var _this = this;
        var $rowsView = this._getRowsViewElement();
        short_1.keyboard.off(this._keyDownListener);
        this._keyDownListener = short_1.keyboard.on($rowsView, null, function (e) { return _this._keyDownHandler(e); });
    },
    dispose: function () {
        this.callBase();
        this._resetFocusedView();
        short_1.keyboard.off(this._keyDownListener);
        events_engine_1.default.off(dom_adapter_1.default.getDocument(), index_1.addNamespace(pointer_1.default.down, 'dxDataGridKeyboardNavigation'), this._documentClickHandler);
        clearTimeout(this._updateFocusTimeout);
        accessibility.unsubscribeVisibilityChange();
    },
    // #endregion Initialization
    // #region Options
    optionChanged: function (args) {
        var that = this;
        switch (args.name) {
            case 'keyboardNavigation':
            case 'useLegacyKeyboardNavigation':
                args.handled = true;
                break;
            default:
                that.callBase(args);
        }
    },
    isRowFocusType: function () {
        return this.focusType === FOCUS_TYPE_ROW;
    },
    isCellFocusType: function () {
        return this.focusType === FOCUS_TYPE_CELL;
    },
    setRowFocusType: function () {
        if (this.option('focusedRowEnabled')) {
            this.focusType = FOCUS_TYPE_ROW;
        }
    },
    setCellFocusType: function () {
        this.focusType = FOCUS_TYPE_CELL;
    },
    // #endregion Options
    // #region Key_Handlers
    _keyDownHandler: function (e) {
        var _a;
        var needStopPropagation = true;
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        var isHandled = this._processOnKeyDown(e);
        var isEditing = (_a = this._editingController) === null || _a === void 0 ? void 0 : _a.isEditing();
        var originalEvent = e.originalEvent;
        if (originalEvent.isDefaultPrevented()) {
            this._isNeedFocus = false;
            this._isNeedScroll = false;
            return;
        }
        !FUNCTIONAL_KEYS.includes(e.keyName) && this._updateFocusedCellPositionByTarget(originalEvent.target);
        if (!isHandled) {
            // eslint-disable-next-line default-case
            switch (e.keyName) {
                case 'leftArrow':
                case 'rightArrow':
                    this._leftRightKeysHandler(e, isEditing);
                    isHandled = true;
                    break;
                case 'upArrow':
                case 'downArrow':
                    if (e.ctrl) {
                        accessibility.selectView('rowsView', this, originalEvent);
                    }
                    else {
                        this._upDownKeysHandler(e, isEditing);
                    }
                    isHandled = true;
                    break;
                case 'pageUp':
                case 'pageDown':
                    this._pageUpDownKeyHandler(e);
                    isHandled = true;
                    break;
                case 'space':
                    isHandled = this._spaceKeyHandler(e, isEditing);
                    break;
                case 'A':
                    if (index_1.isCommandKeyPressed(e.originalEvent)) {
                        this._ctrlAKeyHandler(e, isEditing);
                        isHandled = true;
                    }
                    else {
                        isHandled = this._beginFastEditing(e.originalEvent);
                    }
                    break;
                case 'tab':
                    this._tabKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case 'enter':
                    this._enterKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case 'escape':
                    this._escapeKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case 'F':
                    if (index_1.isCommandKeyPressed(e.originalEvent)) {
                        this._ctrlFKeyHandler(e);
                        isHandled = true;
                    }
                    else {
                        isHandled = this._beginFastEditing(e.originalEvent);
                    }
                    break;
                case 'F2':
                    this._f2KeyHandler();
                    isHandled = true;
                    break;
                case 'del':
                case 'backspace':
                    if (this._isFastEditingAllowed() && !this._isFastEditingStarted()) {
                        isHandled = this._beginFastEditing(originalEvent, true);
                    }
                    break;
            }
            if (!isHandled && !this._beginFastEditing(originalEvent)) {
                this._isNeedFocus = false;
                this._isNeedScroll = false;
                needStopPropagation = false;
            }
            if (needStopPropagation) {
                originalEvent.stopPropagation();
            }
        }
    },
    _processOnKeyDown: function (eventArgs) {
        var originalEvent = eventArgs.originalEvent;
        var args = {
            handled: false,
            event: originalEvent,
        };
        this.executeAction('onKeyDown', args);
        eventArgs.ctrl = originalEvent.ctrlKey;
        eventArgs.alt = originalEvent.altKey;
        eventArgs.shift = originalEvent.shiftKey;
        return !!args.handled;
    },
    _closeEditCell: function () {
        var _this = this;
        setTimeout(function () {
            _this._editingController.closeEditCell();
        });
    },
    _leftRightKeysHandler: function (eventArgs, isEditing) {
        var rowIndex = this.getVisibleRowIndex();
        var $event = eventArgs.originalEvent;
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
        var isEditingNavigationMode = this._isFastEditingStarted();
        var allowNavigate = (!isEditing || isEditingNavigationMode) && isDataRow($row);
        if (allowNavigate) {
            this.setCellFocusType();
            isEditingNavigationMode && this._closeEditCell();
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(directionCode);
            }
            var $cell = this._getNextCell(directionCode);
            if (isElementDefined($cell)) {
                this._arrowKeysHandlerFocusCell($event, $cell, directionCode);
            }
            $event && $event.preventDefault();
        }
    },
    _upDownKeysHandler: function (eventArgs, isEditing) {
        var _a, _b;
        var visibleRowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(visibleRowIndex);
        var $event = eventArgs.originalEvent;
        var isUpArrow = eventArgs.keyName === 'upArrow';
        var dataSource = this._dataController.dataSource();
        var isRowEditingInCurrentRow = (_b = (_a = this._editingController) === null || _a === void 0 ? void 0 : _a.isEditRowByIndex) === null || _b === void 0 ? void 0 : _b.call(_a, visibleRowIndex);
        var isEditingNavigationMode = this._isFastEditingStarted();
        var allowNavigate = (!isRowEditingInCurrentRow || !isEditing || isEditingNavigationMode) && $row && !isDetailRow($row);
        if (allowNavigate) {
            isEditingNavigationMode && this._closeEditCell();
            if (!this._navigateNextCell($event, eventArgs.keyName)) {
                if (this._isVirtualRowRender() && isUpArrow && dataSource && !dataSource.isLoading()) {
                    var rowHeight = size_1.getOuterHeight($row);
                    var rowIndex = this._focusedCellPosition.rowIndex - 1;
                    this._scrollBy(0, -rowHeight, rowIndex, $event);
                }
            }
            $event && $event.preventDefault();
        }
    },
    _pageUpDownKeyHandler: function (eventArgs) {
        var pageIndex = this._dataController.pageIndex();
        var pageCount = this._dataController.pageCount();
        var pagingEnabled = this.option('paging.enabled');
        var isPageUp = eventArgs.keyName === 'pageUp';
        var pageStep = isPageUp ? -1 : 1;
        var scrollable = this.getView('rowsView').getScrollable();
        if (pagingEnabled && !this._isVirtualScrolling()) {
            if ((isPageUp ? pageIndex > 0 : pageIndex < pageCount - 1) && !this._isVirtualScrolling()) {
                this._dataController.pageIndex(pageIndex + pageStep);
                eventArgs.originalEvent.preventDefault();
            }
        }
        else if (scrollable && size_1.getHeight(scrollable.container()) < size_1.getHeight(scrollable.$content())) {
            this._scrollBy(0, size_1.getHeight(scrollable.container()) * pageStep);
            eventArgs.originalEvent.preventDefault();
        }
    },
    _spaceKeyHandler: function (eventArgs, isEditing) {
        var rowIndex = this.getVisibleRowIndex();
        var $target = renderer_1.default(eventArgs.originalEvent && eventArgs.originalEvent.target);
        if (this.option('selection') && this.option('selection').mode !== 'none' && !isEditing) {
            var isFocusedRowElement = this._getElementType($target) === 'row' && this.isRowFocusType() && isDataRow($target);
            var isFocusedSelectionCell = $target.hasClass(COMMAND_SELECT_CLASS);
            if (isFocusedSelectionCell && this.option('selection.showCheckBoxesMode') === 'onClick') {
                this._selectionController.startSelectionWithCheckboxes();
            }
            if (isFocusedRowElement || $target.parent().hasClass(DATA_ROW_CLASS) || $target.hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
                this._selectionController.changeItemSelection(rowIndex, {
                    shift: eventArgs.shift,
                    control: eventArgs.ctrl,
                });
                eventArgs.originalEvent.preventDefault();
                return true;
            }
            return false;
        }
        return this._beginFastEditing(eventArgs.originalEvent);
    },
    _ctrlAKeyHandler: function (eventArgs, isEditing) {
        if (!isEditing && !eventArgs.alt && this.option('selection.mode') === 'multiple' && this.option('selection.allowSelectAll')) {
            this._selectionController.selectAll();
            eventArgs.originalEvent.preventDefault();
        }
    },
    _tabKeyHandler: function (eventArgs, isEditing) {
        var editingOptions = this.option('editing');
        var direction = eventArgs.shift ? 'previous' : 'next';
        var isCellPositionDefined = type_1.isDefined(this._focusedCellPosition) && !type_1.isEmptyObject(this._focusedCellPosition);
        var isOriginalHandlerRequired = !isCellPositionDefined
            || (!eventArgs.shift && this._isLastValidCell(this._focusedCellPosition))
            || (eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition));
        var eventTarget = eventArgs.originalEvent.target;
        var focusedViewElement = this._focusedView && this._focusedView.element();
        if (this._handleTabKeyOnMasterDetailCell(eventTarget, direction)) {
            return;
        }
        renderer_1.default(focusedViewElement).addClass(FOCUS_STATE_CLASS);
        if (editingOptions && eventTarget && !isOriginalHandlerRequired) {
            if (renderer_1.default(eventTarget).hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
                this._resetFocusedCell();
            }
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(direction);
            }
            if (isEditing) {
                if (!this._editingCellTabHandler(eventArgs, direction)) {
                    return;
                }
            }
            else if (this._targetCellTabHandler(eventArgs, direction)) {
                isOriginalHandlerRequired = true;
            }
        }
        if (isOriginalHandlerRequired) {
            this._editorFactory.loseFocus();
            if (this._editingController.isEditing() && !this._isRowEditMode()) {
                this._resetFocusedCell(true);
                this._resetFocusedView();
                this._closeEditCell();
            }
        }
        else {
            eventArgs.originalEvent.preventDefault();
        }
    },
    _getMaxHorizontalOffset: function () {
        var scrollable = this.component.getScrollable();
        var rowsView = this.getView('rowsView');
        var offset = scrollable ? scrollable.scrollWidth() - size_1.getWidth(rowsView.element()) : 0;
        return offset;
    },
    _isColumnRendered: function (columnIndex) {
        var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        var renderedVisibleColumns = this._columnsController.getVisibleColumns();
        var column = allVisibleColumns[columnIndex];
        var result = false;
        if (column) {
            result = renderedVisibleColumns.indexOf(column) >= 0;
        }
        return result;
    },
    _isFixedColumn: function (columnIndex) {
        var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        var column = allVisibleColumns[columnIndex];
        return !!column && !!column.fixed;
    },
    _isColumnVirtual: function (columnIndex) {
        var localColumnIndex = columnIndex - this._columnsController.getColumnIndexOffset();
        var visibleColumns = this._columnsController.getVisibleColumns();
        var column = visibleColumns[localColumnIndex];
        return !!column && column.command === 'virtual';
    },
    _processVirtualHorizontalPosition: function (direction) {
        var scrollable = this.component.getScrollable();
        var columnIndex = this.getColumnIndex();
        var nextColumnIndex;
        var horizontalScrollPosition = 0;
        var needToScroll = false;
        // eslint-disable-next-line default-case
        switch (direction) {
            case 'next':
            case 'nextInRow': {
                var columnsCount = this._getVisibleColumnCount();
                nextColumnIndex = columnIndex + 1;
                horizontalScrollPosition = this.option('rtlEnabled') ? this._getMaxHorizontalOffset() : 0;
                if (direction === 'next') {
                    needToScroll = columnsCount === nextColumnIndex || (this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex));
                }
                else {
                    needToScroll = columnsCount > nextColumnIndex && (this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex));
                }
                break;
            }
            case 'previous':
            case 'previousInRow': {
                nextColumnIndex = columnIndex - 1;
                horizontalScrollPosition = this.option('rtlEnabled') ? 0 : this._getMaxHorizontalOffset();
                if (direction === 'previous') {
                    var columnIndexOffset = this._columnsController.getColumnIndexOffset();
                    var leftEdgePosition = nextColumnIndex < 0 && columnIndexOffset === 0;
                    needToScroll = leftEdgePosition || (this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex));
                }
                else {
                    needToScroll = nextColumnIndex >= 0 && (this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex));
                }
                break;
            }
        }
        if (needToScroll) {
            scrollable.scrollTo({ left: horizontalScrollPosition });
        }
        else if (type_1.isDefined(nextColumnIndex) && type_1.isDefined(direction) && this._isColumnVirtual(nextColumnIndex)) {
            horizontalScrollPosition = this._getHorizontalScrollPositionOffset(direction);
            horizontalScrollPosition !== 0 && scrollable.scrollBy({ left: horizontalScrollPosition, top: 0 });
        }
    },
    _getHorizontalScrollPositionOffset: function (direction) {
        var positionOffset = 0;
        var $currentCell = this._getCell(this._focusedCellPosition);
        var currentCellWidth = $currentCell && size_1.getOuterWidth($currentCell);
        if (currentCellWidth > 0) {
            var rtlMultiplier = this.option('rtlEnabled') ? -1 : 1;
            positionOffset = direction === 'nextInRow' || direction === 'next' ? currentCellWidth * rtlMultiplier : currentCellWidth * rtlMultiplier * -1;
        }
        return positionOffset;
    },
    _editingCellTabHandler: function (eventArgs, direction) {
        var eventTarget = eventArgs.originalEvent.target;
        var $cell = this._getCellElementFromTarget(eventTarget);
        var isEditingAllowed;
        var $event = eventArgs.originalEvent;
        var elementType = this._getElementType(eventTarget);
        if ($cell.is(COMMAND_CELL_SELECTOR)) {
            return !this._targetCellTabHandler(eventArgs, direction);
        }
        this._updateFocusedCellPosition($cell);
        var nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
        $cell = nextCellInfo.$cell;
        if (!$cell || this._handleTabKeyOnMasterDetailCell($cell, direction)) {
            return false;
        }
        var columnsController = this._columnsController;
        var cellIndex = this.getView('rowsView').getCellIndex($cell);
        var columnIndex = cellIndex + columnsController.getColumnIndexOffset();
        var column = columnsController.getVisibleColumns(null, true)[columnIndex];
        var $row = $cell.parent();
        var rowIndex = this._getRowIndex($row);
        var row = this._dataController.items()[rowIndex];
        var editingController = this._editingController;
        if (column && column.allowEditing) {
            var isDataRow_1 = !row || row.rowType === 'data';
            isEditingAllowed = editingController.allowUpdating({ row: row }) ? isDataRow_1 : row && row.isNewRow;
        }
        if (!isEditingAllowed) {
            this._closeEditCell();
        }
        if (this._focusCell($cell, !nextCellInfo.isHighlighted)) {
            if (!this._isRowEditMode() && isEditingAllowed) {
                this._editFocusedCell();
            }
            else {
                this._focusInteractiveElement($cell, eventArgs.shift);
            }
        }
        return true;
    },
    _targetCellTabHandler: function (eventArgs, direction) {
        var $event = eventArgs.originalEvent;
        var eventTarget = $event.target;
        var $cell = this._getCellElementFromTarget(eventTarget);
        var $lastInteractiveElement = this._getInteractiveElement($cell, !eventArgs.shift);
        var isOriginalHandlerRequired = false;
        var elementType;
        if (!isEditorCell(this, $cell) && $lastInteractiveElement.length && eventTarget !== $lastInteractiveElement.get(0)) {
            isOriginalHandlerRequired = true;
        }
        else {
            if (this._focusedCellPosition.rowIndex === undefined && renderer_1.default(eventTarget).hasClass(ROW_CLASS)) {
                this._updateFocusedCellPosition($cell);
            }
            elementType = this._getElementType(eventTarget);
            if (this.isRowFocusType()) {
                this.setCellFocusType();
                if (elementType === 'row' && isDataRow(renderer_1.default(eventTarget))) {
                    eventTarget = this.getFirstValidCellInRow(renderer_1.default(eventTarget));
                    elementType = this._getElementType(eventTarget);
                }
            }
            var nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
            $cell = nextCellInfo.$cell;
            if (!$cell) {
                return false;
            }
            $cell = this._checkNewLineTransition($event, $cell);
            if (!$cell) {
                return false;
            }
            this._focusCell($cell, !nextCellInfo.isHighlighted);
            if (!isEditorCell(this, $cell)) {
                this._focusInteractiveElement($cell, eventArgs.shift);
            }
        }
        return isOriginalHandlerRequired;
    },
    _getNextCellByTabKey: function ($event, direction, elementType) {
        var $cell = this._getNextCell(direction, elementType);
        var args = $cell && this._fireFocusedCellChanging($event, $cell, true);
        if (!args || args.cancel) {
            return {};
        }
        if (args.$newCellElement) {
            $cell = args.$newCellElement;
        }
        return {
            $cell: $cell,
            isHighlighted: args.isHighlighted,
        };
    },
    _checkNewLineTransition: function ($event, $cell) {
        var rowIndex = this.getVisibleRowIndex();
        var $row = $cell.parent();
        if (rowIndex !== this._getRowIndex($row)) {
            var cellPosition = this._getCellPosition($cell);
            var args = this._fireFocusedRowChanging($event, $row);
            if (args.cancel) {
                return;
            }
            if (args.rowIndexChanged) {
                this.setFocusedColumnIndex(cellPosition.columnIndex);
                $cell = this._getFocusedCell();
            }
        }
        return $cell;
    },
    _enterKeyHandler: function (eventArgs, isEditing) {
        var $cell = this._getFocusedCell();
        var rowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        if ((this.option('grouping.allowCollapsing') && isGroupRow($row))
            || (this.option('masterDetail.enabled') && $cell && $cell.hasClass(COMMAND_EXPAND_CLASS))) {
            var key = this._dataController.getKeyByRowIndex(rowIndex);
            var item = this._dataController.items()[rowIndex];
            if (key !== undefined && item && item.data && !item.data.isContinuation) {
                this._dataController.changeRowExpand(key);
            }
        }
        else {
            this._processEnterKeyForDataCell(eventArgs, isEditing);
        }
    },
    _processEnterKeyForDataCell: function (eventArgs, isEditing) {
        var direction = this._getEnterKeyDirection(eventArgs);
        var allowEditingOnEnterKey = this._allowEditingOnEnterKey();
        if (isEditing || !allowEditingOnEnterKey && direction) {
            this._handleEnterKeyEditingCell(eventArgs.originalEvent);
            if (direction === 'next' || direction === 'previous') {
                this._targetCellTabHandler(eventArgs, direction);
            }
            else if (direction === 'upArrow' || direction === 'downArrow') {
                this._navigateNextCell(eventArgs.originalEvent, direction);
            }
        }
        else if (allowEditingOnEnterKey) {
            this._startEditing(eventArgs);
        }
    },
    _getEnterKeyDirection: function (eventArgs) {
        var enterKeyDirection = this.option('keyboardNavigation.enterKeyDirection');
        var isShift = eventArgs.shift;
        if (enterKeyDirection === 'column') {
            return isShift ? 'upArrow' : 'downArrow';
        }
        if (enterKeyDirection === 'row') {
            return isShift ? 'previous' : 'next';
        }
        return undefined;
    },
    _handleEnterKeyEditingCell: function (event) {
        var target = event.target;
        var $cell = this._getCellElementFromTarget(target);
        var isRowEditMode = this._isRowEditMode();
        this._updateFocusedCellPosition($cell);
        if (isRowEditMode) {
            this._focusEditFormCell($cell);
            setTimeout(this._editingController.saveEditData.bind(this._editingController));
        }
        else {
            // @ts-expect-error
            events_engine_1.default.trigger(renderer_1.default(target), 'change');
            this._closeEditCell();
            event.preventDefault();
        }
    },
    _escapeKeyHandler: function (eventArgs, isEditing) {
        var $cell = this._getCellElementFromTarget(eventArgs.originalEvent.target);
        if (isEditing) {
            this._updateFocusedCellPosition($cell);
            if (!this._isRowEditMode()) {
                if (this._editingController.getEditMode() === 'cell') {
                    this._editingController.cancelEditData();
                }
                else {
                    this._closeEditCell();
                }
            }
            else {
                this._focusEditFormCell($cell);
                this._editingController.cancelEditData();
                if (this._dataController.items().length === 0) {
                    this._resetFocusedCell();
                    this._editorFactory.loseFocus();
                }
            }
            eventArgs.originalEvent.preventDefault();
        }
    },
    _ctrlFKeyHandler: function (eventArgs) {
        if (this.option('searchPanel.visible')) {
            var searchTextEditor = this._headerPanel.getSearchTextEditor();
            if (searchTextEditor) {
                searchTextEditor.focus();
                eventArgs.originalEvent.preventDefault();
            }
        }
    },
    _f2KeyHandler: function () {
        var isEditing = this._editingController.isEditing();
        var rowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        if (!isEditing && isDataRow($row)) {
            this._startEditing();
        }
    },
    _navigateNextCell: function ($event, keyCode) {
        var $cell = this._getNextCell(keyCode);
        var directionCode = this._getDirectionCodeByKey(keyCode);
        var isCellValid = $cell && this._isCellValid($cell);
        var result = isCellValid ? this._arrowKeysHandlerFocusCell($event, $cell, directionCode) : false;
        return result;
    },
    _arrowKeysHandlerFocusCell: function ($event, $nextCell, direction) {
        var isVerticalDirection = direction === 'prevRow' || direction === 'nextRow';
        var args = this._fireFocusChangingEvents($event, $nextCell, isVerticalDirection, true);
        $nextCell = args.$newCellElement;
        if (!args.cancel && this._isCellValid($nextCell)) {
            this._focus($nextCell, !args.isHighlighted);
            return true;
        }
        return false;
    },
    _beginFastEditing: function (originalEvent, isDeleting) {
        if (!this._isFastEditingAllowed() || originalEvent.altKey || originalEvent.ctrlKey || this._editingController.isEditing()) {
            return false;
        }
        if (isDeleting) {
            this._startEditing(originalEvent, FAST_EDITING_DELETE_KEY);
        }
        else {
            var key = originalEvent.key;
            var keyCode = originalEvent.keyCode || originalEvent.which;
            var fastEditingKey = key || keyCode && String.fromCharCode(keyCode);
            if (fastEditingKey && (fastEditingKey.length === 1 || fastEditingKey === FAST_EDITING_DELETE_KEY)) {
                this._startEditing(originalEvent, fastEditingKey);
            }
        }
        return true;
    },
    // #endregion Key_Handlers
    // #region Pointer_Event_Handler
    _pointerEventHandler: function (e) {
        var event = e.event || e;
        var $target = renderer_1.default(event.currentTarget);
        var rowsView = this.getView('rowsView');
        var focusedViewElement = rowsView && rowsView.element();
        var $parent = $target.parent();
        var isInteractiveElement = renderer_1.default(event.target).is(INTERACTIVE_ELEMENTS_SELECTOR);
        var isRevertButton = !!renderer_1.default(event.target).closest("." + REVERT_BUTTON_CLASS).length;
        var isExpandCommandCell = $target.hasClass(COMMAND_EXPAND_CLASS);
        if (!this._isEventInCurrentGrid(event)) {
            return;
        }
        if (!isRevertButton && (this._isCellValid($target, !isInteractiveElement) || isExpandCommandCell)) {
            $target = this._isInsideEditForm($target) ? renderer_1.default(event.target) : $target;
            this._focusView();
            renderer_1.default(focusedViewElement).removeClass(FOCUS_STATE_CLASS);
            if ($parent.hasClass(FREESPACE_ROW_CLASS)) {
                this._updateFocusedCellPosition($target);
                this._applyTabIndexToElement(this._focusedView.element());
                this._focusedView.focus(true);
            }
            else if (!this._isMasterDetailCell($target)) {
                this._clickTargetCellHandler(event, $target);
            }
            else {
                this._updateFocusedCellPosition($target);
            }
        }
        else if ($target.is('td')) {
            this._resetFocusedCell();
        }
    },
    _clickTargetCellHandler: function (event, $cell) {
        var columnIndex = this.getView('rowsView').getCellIndex($cell);
        var column = this._columnsController.getVisibleColumns()[columnIndex];
        var isCellEditMode = this._isCellEditMode();
        this.setCellFocusType();
        var args = this._fireFocusChangingEvents(event, $cell, true);
        $cell = args.$newCellElement;
        if (!args.cancel) {
            if (args.resetFocusedRow) {
                this.getController('focus')._resetFocusedRow();
                return;
            }
            if (args.rowIndexChanged) {
                $cell = this._getFocusedCell();
            }
            if (!args.isHighlighted && !isCellEditMode) {
                this.setRowFocusType();
            }
            this._updateFocusedCellPosition($cell);
            if (this._allowRowUpdating() && isCellEditMode && column && column.allowEditing) {
                this._isNeedFocus = false;
                this._isHiddenFocus = false;
            }
            else {
                $cell = this._getFocusedCell();
                var $target = event && renderer_1.default(event.target).closest(NON_FOCUSABLE_ELEMENTS_SELECTOR + ", td");
                var skipFocusEvent = $target && $target.not($cell).is(NON_FOCUSABLE_ELEMENTS_SELECTOR);
                var isEditor = !!column && !column.command && $cell.hasClass(EDITOR_CELL_CLASS);
                var isDisabled = !isEditor && (!args.isHighlighted || skipFocusEvent);
                this._focus($cell, isDisabled, skipFocusEvent);
            }
        }
        else {
            this.setRowFocusType();
            this.setFocusedRowIndex(args.prevRowIndex);
            if (this._editingController.isEditing() && isCellEditMode) {
                this._closeEditCell();
            }
        }
    },
    _allowRowUpdating: function () {
        var rowIndex = this.getVisibleRowIndex();
        var row = this._dataController.items()[rowIndex];
        return this._editingController.allowUpdating({ row: row }, 'click');
    },
    // #endregion Pointer_Event_Handler
    // #region Focusing
    focus: function (element) {
        var activeElementSelector;
        var focusedRowEnabled = this.option('focusedRowEnabled');
        var isHighlighted = this._isCellElement(renderer_1.default(element));
        if (!element) {
            activeElementSelector = '.dx-datagrid-rowsview .dx-row[tabindex]';
            if (!focusedRowEnabled) {
                activeElementSelector += ', .dx-datagrid-rowsview .dx-row > td[tabindex]';
            }
            // @ts-expect-error
            element = this.component.$element().find(activeElementSelector).first();
        }
        element && this._focusElement(renderer_1.default(element), isHighlighted);
    },
    getFocusedView: function () {
        return this._focusedView;
    },
    setupFocusedView: function () {
        if (this.isKeyboardEnabled() && !type_1.isDefined(this._focusedView)) {
            this._focusView();
        }
    },
    _focusElement: function ($element, isHighlighted) {
        var rowsViewElement = renderer_1.default(this._getRowsViewElement());
        var $focusedView = $element.closest(rowsViewElement);
        var isRowFocusType = this.isRowFocusType();
        var args = {};
        if (!$focusedView.length || this._isCellElement($element) && !this._isCellValid($element)) {
            return;
        }
        this._focusView();
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        if (this._isCellElement($element) || isGroupRow($element)) {
            this.setCellFocusType();
            args = this._fireFocusChangingEvents(null, $element, false, isHighlighted);
            $element = args.$newCellElement;
            if (isRowFocusType && !args.isHighlighted) {
                this.setRowFocusType();
            }
        }
        if (!args.cancel) {
            this._focus($element, !args.isHighlighted);
            this._focusInteractiveElement($element);
        }
    },
    _getFocusedViewByElement: function ($element) {
        var view = this.getFocusedView();
        var $view = view && renderer_1.default(view.element());
        return $element && $element.closest($view).length !== 0;
    },
    _focusView: function () {
        this._focusedView = this.getView('rowsView');
    },
    _resetFocusedView: function () {
        this.setRowFocusType();
        this._focusedView = null;
    },
    _focusInteractiveElement: function ($cell, isLast) {
        if (!$cell)
            return;
        var $focusedElement = this._getInteractiveElement($cell, isLast);
        /// #DEBUG
        this._testInteractiveElement = $focusedElement;
        /// #ENDDEBUG
        module_utils_1.default.focusAndSelectElement(this, $focusedElement);
    },
    _focus: function ($cell, disableFocus, skipFocusEvent) {
        var $row = $cell && !$cell.hasClass(ROW_CLASS) ? $cell.closest("." + ROW_CLASS) : $cell;
        if ($row && isNotFocusedRow($row)) {
            return;
        }
        var focusedView = this._focusedView;
        var $focusViewElement = focusedView && focusedView.element();
        var $focusElement;
        this._isHiddenFocus = disableFocus;
        var isRowFocus = isGroupRow($row) || this.isRowFocusType();
        if (isRowFocus) {
            $focusElement = $row;
            if (focusedView) {
                this.setFocusedRowIndex(this._getRowIndex($row));
            }
        }
        else if (this._isCellElement($cell)) {
            $focusElement = $cell;
            this._updateFocusedCellPosition($cell);
        }
        if ($focusElement) {
            if ($focusViewElement) {
                $focusViewElement
                    .find('.dx-row[tabindex], .dx-row > td[tabindex]')
                    .not($focusElement)
                    .removeClass(CELL_FOCUS_DISABLED_CLASS)
                    .removeAttr('tabindex');
            }
            // @ts-expect-error
            events_engine_1.default.one($focusElement, 'blur', function (e) {
                if (e.relatedTarget) {
                    $focusElement.removeClass(CELL_FOCUS_DISABLED_CLASS);
                }
            });
            if (!skipFocusEvent) {
                this._applyTabIndexToElement($focusElement);
                // @ts-expect-error
                events_engine_1.default.trigger($focusElement, 'focus');
            }
            if (disableFocus) {
                $focusElement.addClass(CELL_FOCUS_DISABLED_CLASS);
                if (isRowFocus) {
                    $cell.addClass(CELL_FOCUS_DISABLED_CLASS);
                }
            }
            else {
                this._editorFactory.focus($focusElement);
            }
        }
    },
    _updateFocus: function (isRenderView) {
        var _this = this;
        this._updateFocusTimeout = setTimeout(function () {
            var editingController = _this._editingController;
            var isCellEditMode = editingController.getEditMode() === EDIT_MODE_CELL;
            var isBatchEditMode = editingController.getEditMode() === EDIT_MODE_BATCH;
            if ((isCellEditMode && editingController.hasChanges()) || (isBatchEditMode && editingController.isNewRowInEditMode())) {
                editingController._focusEditingCell();
                return;
            }
            var $cell = _this._getFocusedCell();
            var isEditing = editingController.isEditing();
            if ($cell && !(_this._isMasterDetailCell($cell) && !_this._isRowEditMode())) {
                if (_this._hasSkipRow($cell.parent())) {
                    var direction = _this._focusedCellPosition && _this._focusedCellPosition.rowIndex > 0 ? 'upArrow' : 'downArrow';
                    $cell = _this._getNextCell(direction);
                }
                if (isElementDefined($cell)) {
                    if ($cell.is('td') || $cell.hasClass(_this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS))) {
                        var isCommandCell = $cell.is(COMMAND_CELL_SELECTOR);
                        var $focusedElementInsideCell = $cell.find(':focus');
                        var isFocusedElementDefined = isElementDefined($focusedElementInsideCell);
                        if ((isRenderView || !isCommandCell) && _this._editorFactory.focus()) {
                            if (isCommandCell && isFocusedElementDefined) {
                                module_utils_1.default.focusAndSelectElement(_this, $focusedElementInsideCell);
                                return;
                            }
                            !isFocusedElementDefined && _this._focus($cell);
                        }
                        else if (!isFocusedElementDefined && (_this._isNeedFocus || _this._isHiddenFocus)) {
                            _this._focus($cell, _this._isHiddenFocus);
                        }
                        if (isEditing) {
                            _this._focusInteractiveElement.bind(_this)($cell);
                        }
                    }
                    else {
                        // @ts-expect-error
                        events_engine_1.default.trigger($cell, 'focus');
                    }
                }
            }
        });
    },
    _getFocusedCell: function () {
        return renderer_1.default(this._getCell(this._focusedCellPosition));
    },
    _updateFocusedCellPositionByTarget: function (target) {
        var _a;
        var elementType = this._getElementType(target);
        if (elementType === 'row' && type_1.isDefined((_a = this._focusedCellPosition) === null || _a === void 0 ? void 0 : _a.columnIndex)) {
            var $row = renderer_1.default(target);
            this._focusedView && isGroupRow($row) && this.setFocusedRowIndex(this._getRowIndex($row));
        }
        else {
            this._updateFocusedCellPosition(this._getCellElementFromTarget(target));
        }
    },
    _updateFocusedCellPosition: function ($cell, direction) {
        var position = this._getCellPosition($cell, direction);
        if (position) {
            if (!$cell.length || position.rowIndex >= 0 && position.columnIndex >= 0) {
                this.setFocusedCellPosition(position.rowIndex, position.columnIndex);
            }
        }
        return position;
    },
    _getFocusedColumnIndexOffset: function (columnIndex) {
        var offset = 0;
        var column = this._columnsController.getVisibleColumns()[columnIndex];
        if (column && column.fixed) {
            offset = this._getFixedColumnIndexOffset(column);
        }
        else if (columnIndex >= 0) {
            offset = this._columnsController.getColumnIndexOffset();
        }
        return offset;
    },
    _getFixedColumnIndexOffset: function (column) {
        var offset = isFixedColumnIndexOffsetRequired(this, column) ? this._getVisibleColumnCount() - this._columnsController.getVisibleColumns().length : 0;
        return offset;
    },
    _getCellPosition: function ($cell, direction) {
        var columnIndex;
        var $row = isElementDefined($cell) && $cell.closest('tr');
        var rowsView = this.getView('rowsView');
        if (isElementDefined($row)) {
            var rowIndex = this._getRowIndex($row);
            columnIndex = rowsView.getCellIndex($cell, rowIndex);
            columnIndex += this._getFocusedColumnIndexOffset(columnIndex);
            if (direction) {
                columnIndex = direction === 'previous' ? columnIndex - 1 : columnIndex + 1;
                columnIndex = this._applyColumnIndexBoundaries(columnIndex);
            }
            return { rowIndex: rowIndex, columnIndex: columnIndex };
        }
        return undefined;
    },
    _focusCell: function ($cell, isDisabled) {
        if (this._isCellValid($cell)) {
            this._focus($cell, isDisabled);
            return true;
        }
        return undefined;
    },
    _focusEditFormCell: function ($cell) {
        if ($cell.hasClass(MASTER_DETAIL_CELL_CLASS)) {
            this._editorFactory.focus($cell, true);
        }
    },
    _resetFocusedCell: function (preventScroll) {
        var _a;
        var $cell = this._getFocusedCell();
        isElementDefined($cell) && $cell.removeAttr('tabindex');
        this._isNeedFocus = false;
        this._isNeedScroll = false;
        this._focusedCellPosition = {};
        clearTimeout(this._updateFocusTimeout);
        (_a = this._focusedView) === null || _a === void 0 ? void 0 : _a.renderFocusState({ preventScroll: preventScroll });
    },
    restoreFocusableElement: function (rowIndex, $event) {
        var that = this;
        var args;
        var $rowElement;
        var isUpArrow = type_1.isDefined(rowIndex);
        var rowsView = that.getView('rowsView');
        var $rowsViewElement = rowsView.element();
        var columnIndex = that._focusedCellPosition.columnIndex;
        var rowIndexOffset = that._dataController.getRowIndexOffset();
        rowIndex = isUpArrow ? rowIndex : rowsView.getTopVisibleItemIndex() + rowIndexOffset;
        if (!isUpArrow) {
            that._editorFactory.loseFocus();
            that._applyTabIndexToElement($rowsViewElement);
            // @ts-expect-error
            events_engine_1.default.trigger($rowsViewElement, 'focus');
        }
        else {
            $rowElement = rowsView.getRow(rowIndex - rowIndexOffset);
            args = that._fireFocusedRowChanging($event, $rowElement);
            if (!args.cancel && args.rowIndexChanged) {
                rowIndex = args.newRowIndex;
            }
        }
        if (!isUpArrow || !args.cancel) {
            that.setFocusedCellPosition(rowIndex, columnIndex);
        }
        isUpArrow && that._updateFocus();
    },
    // #endregion Focusing
    // #region Cell_Position
    _getNewPositionByCode: function (cellPosition, elementType, code) {
        var columnIndex = cellPosition.columnIndex;
        var rowIndex = cellPosition.rowIndex;
        var visibleColumnsCount;
        if (cellPosition.rowIndex === undefined && code === 'next') {
            return { columnIndex: 0, rowIndex: 0 };
        }
        // eslint-disable-next-line default-case
        switch (code) {
            case 'nextInRow':
            case 'next':
                visibleColumnsCount = this._getVisibleColumnCount();
                if (columnIndex < visibleColumnsCount - 1 && elementType !== 'row' && this._hasValidCellAfterPosition({ columnIndex: columnIndex, rowIndex: rowIndex })) {
                    columnIndex++;
                }
                else if (!this._isLastRow(rowIndex) && code === 'next') {
                    columnIndex = 0;
                    rowIndex++;
                }
                break;
            case 'previousInRow':
            case 'previous':
                if (columnIndex > 0 && elementType !== 'row' && this._hasValidCellBeforePosition({ columnIndex: columnIndex, rowIndex: rowIndex })) {
                    columnIndex--;
                }
                else if (rowIndex > 0 && code === 'previous') {
                    rowIndex--;
                    visibleColumnsCount = this._getVisibleColumnCount();
                    columnIndex = visibleColumnsCount - 1;
                }
                break;
            case 'upArrow':
                rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
                break;
            case 'downArrow':
                rowIndex = !this._isLastRow(rowIndex) ? rowIndex + 1 : rowIndex;
                break;
        }
        return { columnIndex: columnIndex, rowIndex: rowIndex };
    },
    setFocusedCellPosition: function (rowIndex, columnIndex) {
        this.setFocusedRowIndex(rowIndex);
        this.setFocusedColumnIndex(columnIndex);
    },
    setFocusedRowIndex: function (rowIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {};
        }
        this._focusedCellPosition.rowIndex = rowIndex;
    },
    setFocusedColumnIndex: function (columnIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {};
        }
        this._focusedCellPosition.columnIndex = columnIndex;
    },
    getRowIndex: function () {
        return this._focusedCellPosition ? this._focusedCellPosition.rowIndex : -1;
    },
    getColumnIndex: function () {
        return this._focusedCellPosition ? this._focusedCellPosition.columnIndex : -1;
    },
    getVisibleRowIndex: function () {
        var rowIndex = this._focusedCellPosition && this._focusedCellPosition.rowIndex;
        if (!type_1.isDefined(rowIndex) || rowIndex < 0) {
            return -1;
        }
        return rowIndex - this._dataController.getRowIndexOffset();
    },
    getVisibleColumnIndex: function () {
        var columnIndex = this._focusedCellPosition && this._focusedCellPosition.columnIndex;
        if (!type_1.isDefined(columnIndex)) {
            return -1;
        }
        return columnIndex - this._columnsController.getColumnIndexOffset();
    },
    _applyColumnIndexBoundaries: function (columnIndex) {
        var visibleColumnsCount = this._getVisibleColumnCount();
        if (columnIndex < 0) {
            columnIndex = 0;
        }
        else if (columnIndex >= visibleColumnsCount) {
            columnIndex = visibleColumnsCount - 1;
        }
        return columnIndex;
    },
    _isCellByPositionValid: function (cellPosition) {
        var $cell = renderer_1.default(this._getCell(cellPosition));
        return this._isCellValid($cell);
    },
    _isLastRow: function (rowIndex) {
        var dataController = this._dataController;
        var visibleItems = dataController.items().filter(function (item) { return item.visible !== false; });
        if (this._isVirtualRowRender()) {
            return rowIndex >= dataController.getMaxRowIndex();
        }
        return rowIndex === visibleItems.length - 1;
    },
    _isFirstValidCell: function (cellPosition) {
        var isFirstValidCell = false;
        if (cellPosition.rowIndex === 0 && cellPosition.columnIndex >= 0) {
            isFirstValidCell = isFirstValidCell || !this._hasValidCellBeforePosition(cellPosition);
        }
        return isFirstValidCell;
    },
    _hasValidCellBeforePosition: function (cellPosition) {
        var columnIndex = cellPosition.columnIndex;
        var hasValidCells = false;
        while (columnIndex > 0 && !hasValidCells) {
            var checkingPosition = { columnIndex: --columnIndex, rowIndex: cellPosition.rowIndex };
            hasValidCells = this._isCellByPositionValid(checkingPosition);
        }
        return hasValidCells;
    },
    _hasValidCellAfterPosition: function (cellPosition) {
        var columnIndex = cellPosition.columnIndex;
        var hasValidCells = false;
        var visibleColumnCount = this._getVisibleColumnCount();
        while (columnIndex < visibleColumnCount - 1 && !hasValidCells) {
            var checkingPosition = { columnIndex: ++columnIndex, rowIndex: cellPosition.rowIndex };
            hasValidCells = this._isCellByPositionValid(checkingPosition);
        }
        return hasValidCells;
    },
    _isLastValidCell: function (cellPosition) {
        var nextColumnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex + 1 : 0;
        var rowIndex = cellPosition.rowIndex;
        var checkingPosition = {
            columnIndex: nextColumnIndex,
            rowIndex: rowIndex,
        };
        var visibleRows = this._dataController.getVisibleRows();
        var row = visibleRows && visibleRows[rowIndex];
        var isLastRow = this._isLastRow(rowIndex);
        if (!isLastRow) {
            return false;
        }
        if (row && row.rowType === 'group' && cellPosition.columnIndex > 0) {
            return true;
        }
        if (cellPosition.columnIndex === this._getVisibleColumnCount() - 1) {
            return true;
        }
        if (this._isCellByPositionValid(checkingPosition)) {
            return false;
        }
        return this._isLastValidCell(checkingPosition);
    },
    // #endregion Cell_Position
    // #region DOM_Manipulation
    _isCellValid: function ($cell, isClick) {
        if (isElementDefined($cell)) {
            var rowsView = this.getView('rowsView');
            var $row = $cell.parent();
            var columnsController = this._columnsController;
            var columnIndex = rowsView.getCellIndex($cell) + columnsController.getColumnIndexOffset();
            var column_1 = columnsController.getVisibleColumns(null, true)[columnIndex];
            var visibleColumnCount = this._getVisibleColumnCount();
            var editingController = this._editingController;
            var isMasterDetailRow_1 = isDetailRow($row);
            var isShowWhenGrouped_1 = column_1 && column_1.showWhenGrouped;
            var isDataCell_1 = column_1 && !$cell.hasClass(COMMAND_EXPAND_CLASS) && isDataRow($row);
            var isValidGroupSpaceColumn = function () {
                // eslint-disable-next-line radix
                return !isMasterDetailRow_1 && column_1 && (!type_1.isDefined(column_1.groupIndex) || isShowWhenGrouped_1 && isDataCell_1) || parseInt($cell.attr('colspan')) > 1;
            };
            var isDragCell = dom_1.GridCoreKeyboardNavigationDom.isDragCell($cell);
            if (isDragCell) {
                return false;
            }
            if (this._isMasterDetailCell($cell)) {
                return true;
            }
            if (visibleColumnCount > columnIndex && isValidGroupSpaceColumn()) {
                var rowItems = this._dataController.items();
                var visibleRowIndex = rowsView.getRowIndex($row);
                var row = rowItems[visibleRowIndex];
                var isCellEditing = editingController && this._isCellEditMode() && editingController.isEditing();
                var isRowEditingInCurrentRow = editingController && editingController.isEditRow(visibleRowIndex);
                var isEditing = isRowEditingInCurrentRow || isCellEditing;
                if (column_1.command) {
                    if (this._isLegacyNavigation()) {
                        return !isEditing && column_1.command === 'expand';
                    }
                    if (isCellEditing) {
                        return false;
                    }
                    if (isRowEditingInCurrentRow) {
                        return column_1.command !== 'select';
                    }
                    return !isEditing;
                }
                if (isCellEditing && row && row.rowType !== 'data') {
                    return false;
                }
                return !isEditing || column_1.allowEditing || isClick;
            }
        }
    },
    getFirstValidCellInRow: function ($row, columnIndex) {
        var that = this;
        var $cells = $row.find('> td');
        var $cell;
        var $result;
        columnIndex = columnIndex || 0;
        for (var i = columnIndex; i < $cells.length; ++i) {
            $cell = $cells.eq(i);
            if (that._isCellValid($cell)) {
                $result = $cell;
                break;
            }
        }
        return $result;
    },
    _getNextCell: function (keyCode, elementType, cellPosition) {
        var focusedCellPosition = cellPosition || this._focusedCellPosition;
        var isRowFocusType = this.isRowFocusType();
        var includeCommandCells = isRowFocusType || ['next', 'previous'].includes(keyCode);
        var $cell;
        var $row;
        if (this._focusedView && focusedCellPosition) {
            var newFocusedCellPosition = this._getNewPositionByCode(focusedCellPosition, elementType, keyCode);
            $cell = renderer_1.default(this._getCell(newFocusedCellPosition));
            var isLastCellOnDirection = keyCode === 'previous' ? this._isFirstValidCell(newFocusedCellPosition) : this._isLastValidCell(newFocusedCellPosition);
            if (isElementDefined($cell) && !this._isCellValid($cell) && this._isCellInRow(newFocusedCellPosition, includeCommandCells) && !isLastCellOnDirection) {
                if (isRowFocusType) {
                    $cell = this.getFirstValidCellInRow($cell.parent(), newFocusedCellPosition.columnIndex);
                }
                else {
                    $cell = this._getNextCell(keyCode, 'cell', newFocusedCellPosition);
                }
            }
            $row = isElementDefined($cell) && $cell.parent();
            if (this._hasSkipRow($row)) {
                var rowIndex = this._getRowIndex($row);
                if (!this._isLastRow(rowIndex)) {
                    $cell = this._getNextCell(keyCode, 'row', { columnIndex: focusedCellPosition.columnIndex, rowIndex: rowIndex });
                }
                else {
                    return null;
                }
            }
            return isElementDefined($cell) ? $cell : null;
        }
        return null;
    },
    // #endregion DOM_Manipulation
    // #region Editing
    _startEditing: function (eventArgs, fastEditingKey) {
        var focusedCellPosition = this._focusedCellPosition;
        var visibleRowIndex = this.getVisibleRowIndex();
        var visibleColumnIndex = this.getVisibleColumnIndex();
        var row = this._dataController.items()[visibleRowIndex];
        var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
        if (this._isAllowEditing(row, column)) {
            if (this._isRowEditMode()) {
                this._editingController.editRow(visibleRowIndex);
            }
            else if (focusedCellPosition) {
                this._startEditCell(eventArgs, fastEditingKey);
            }
        }
    },
    _isAllowEditing: function (row, column) {
        return this._editingController.allowUpdating({ row: row }) && column && column.allowEditing;
    },
    _editFocusedCell: function () {
        var rowIndex = this.getVisibleRowIndex();
        var colIndex = this.getVisibleColumnIndex();
        return this._editingController.editCell(rowIndex, colIndex);
    },
    _startEditCell: function (eventArgs, fastEditingKey) {
        var _this = this;
        this._fastEditingStarted = type_1.isDefined(fastEditingKey);
        var editResult = this._editFocusedCell();
        if (this._isFastEditingStarted()) {
            if (editResult === true) {
                this._editingCellHandler(eventArgs, fastEditingKey);
            }
            else if (editResult && editResult.done) {
                var editorValue_1 = fastEditingKey !== FAST_EDITING_DELETE_KEY ? fastEditingKey : '';
                editResult.done(function () { return _this._editingCellHandler(eventArgs, editorValue_1); });
            }
        }
    },
    _editingCellHandler: function (eventArgs, editorValue) {
        var _a, _b;
        var $input = this._getFocusedCell().find(INTERACTIVE_ELEMENTS_SELECTOR).eq(0);
        var keyDownEvent = index_1.createEvent(eventArgs, { type: 'keydown', target: $input.get(0) });
        var keyPressEvent = index_1.createEvent(eventArgs, { type: 'keypress', target: $input.get(0) });
        var inputEvent = index_1.createEvent(eventArgs, { type: 'input', target: $input.get(0) });
        if (inputEvent.originalEvent) {
            inputEvent.originalEvent = index_1.createEvent(inputEvent.originalEvent, { data: editorValue }); // T1116105
        }
        (_b = (_a = $input.get(0)).select) === null || _b === void 0 ? void 0 : _b.call(_a);
        // @ts-expect-error
        events_engine_1.default.trigger($input, keyDownEvent);
        if (!keyDownEvent.isDefaultPrevented()) {
            // @ts-expect-error
            events_engine_1.default.trigger($input, keyPressEvent);
            if (!keyPressEvent.isDefaultPrevented()) {
                var timeout = browser_1.default.mozilla ? 25 : 0; // T882996
                setTimeout(function () {
                    $input.val(editorValue);
                    var $widgetContainer = $input.closest("." + WIDGET_CLASS);
                    // @ts-expect-error
                    events_engine_1.default.off($widgetContainer, 'focusout'); // for NumberBox to save entered symbol
                    // @ts-expect-error
                    events_engine_1.default.one($widgetContainer, 'focusout', function () {
                        // @ts-expect-error
                        events_engine_1.default.trigger($input, 'change');
                    });
                    // @ts-expect-error
                    events_engine_1.default.trigger($input, inputEvent);
                }, timeout);
            }
        }
    },
    // #endregion Editing
    // #region Events
    _fireFocusChangingEvents: function ($event, $cell, fireRowEvent, isHighlighted) {
        var args = {};
        var cellPosition = this._getCellPosition($cell) || {};
        if (this.isCellFocusType()) {
            args = this._fireFocusedCellChanging($event, $cell, isHighlighted);
            if (!args.cancel) {
                cellPosition.columnIndex = args.newColumnIndex;
                cellPosition.rowIndex = args.newRowIndex;
                isHighlighted = args.isHighlighted;
                $cell = renderer_1.default(this._getCell(cellPosition));
            }
        }
        if (!args.cancel && fireRowEvent && $cell) {
            args = this._fireFocusedRowChanging($event, $cell.parent());
            if (!args.cancel) {
                cellPosition.rowIndex = args.newRowIndex;
                args.isHighlighted = isHighlighted;
            }
        }
        args.$newCellElement = renderer_1.default(this._getCell(cellPosition));
        if (!args.$newCellElement.length) {
            args.$newCellElement = $cell;
        }
        return args;
    },
    _fireFocusedCellChanging: function ($event, $cellElement, isHighlighted) {
        var that = this;
        var prevCellIndex = that.option('focusedColumnIndex');
        var prevRowIndex = that.option('focusedRowIndex');
        var cellPosition = that._getCellPosition($cellElement);
        var columnIndex = cellPosition ? cellPosition.columnIndex : -1;
        var rowIndex = cellPosition ? cellPosition.rowIndex : -1;
        var args = {
            cellElement: $cellElement,
            prevColumnIndex: prevCellIndex,
            prevRowIndex: prevRowIndex,
            newColumnIndex: columnIndex,
            newRowIndex: rowIndex,
            rows: that._dataController.getVisibleRows(),
            columns: that._columnsController.getVisibleColumns(),
            event: $event,
            isHighlighted: isHighlighted || false,
            cancel: false,
        };
        this._canceledCellPosition = null;
        that.executeAction('onFocusedCellChanging', args);
        if (args.newColumnIndex !== columnIndex || args.newRowIndex !== rowIndex) {
            args.$newCellElement = renderer_1.default(this._getCell({ columnIndex: args.newColumnIndex, rowIndex: args.newRowIndex }));
        }
        if (args.cancel) {
            this._canceledCellPosition = { rowIndex: rowIndex, columnIndex: columnIndex };
        }
        return args;
    },
    _fireFocusedCellChanged: function ($cellElement, prevCellIndex, prevRowIndex) {
        var that = this;
        var dataController = that._dataController;
        var columnIndex = that.getView('rowsView').getCellIndex($cellElement);
        var rowIndex = this._getRowIndex($cellElement && $cellElement.parent());
        var localRowIndex = Math.min(rowIndex - dataController.getRowIndexOffset(), dataController.items().length - 1);
        var isEditingCell = that._editingController.isEditCell(localRowIndex, columnIndex);
        var row = dataController.items()[localRowIndex];
        if (!isEditingCell && (prevCellIndex !== columnIndex || prevRowIndex !== rowIndex)) {
            that.executeAction('onFocusedCellChanged', {
                cellElement: $cellElement,
                columnIndex: columnIndex,
                rowIndex: rowIndex,
                row: row,
                column: that._columnsController.getVisibleColumns()[columnIndex],
            });
        }
    },
    _fireFocusedRowChanging: function (eventArgs, $newFocusedRow) {
        var newRowIndex = this._getRowIndex($newFocusedRow);
        var dataController = this._dataController;
        var prevFocusedRowIndex = this.option('focusedRowIndex');
        var loadingOperationTypes = dataController.loadingOperationTypes();
        var args = {
            rowElement: $newFocusedRow,
            prevRowIndex: prevFocusedRowIndex,
            newRowIndex: newRowIndex,
            event: eventArgs,
            rows: dataController.getVisibleRows(),
            cancel: false,
        };
        if (!dataController || dataController.isLoading() && (loadingOperationTypes.reload || loadingOperationTypes.paging)) {
            args.cancel = true;
            return args;
        }
        if (this.option('focusedRowEnabled')) {
            this.executeAction('onFocusedRowChanging', args);
            if (!args.cancel && args.newRowIndex !== newRowIndex) {
                args.resetFocusedRow = args.newRowIndex < 0;
                if (!args.resetFocusedRow) {
                    this.setFocusedRowIndex(args.newRowIndex);
                }
                args.rowIndexChanged = true;
            }
        }
        return args;
    },
    _fireFocusedRowChanged: function ($rowElement) {
        var row;
        var focusedRowKey = this.option('focusedRowKey');
        var focusController = this.getController('focus');
        var focusedRowIndex = focusController === null || focusController === void 0 ? void 0 : focusController.getFocusedRowIndexByKey(focusedRowKey);
        if (this.option('focusedRowEnabled')) {
            if (focusedRowIndex >= 0) {
                var dataController = this._dataController;
                row = focusedRowIndex >= 0 && dataController.getVisibleRows()[focusedRowIndex - dataController.getRowIndexOffset()];
            }
            this.executeAction('onFocusedRowChanged', {
                rowElement: $rowElement,
                rowIndex: focusedRowIndex,
                row: row,
            });
        }
    },
    // #endregion Events
    _isEventInCurrentGrid: function (event) {
        return module_utils_1.default.isElementInCurrentGrid(this, renderer_1.default(event.target));
    },
    _isRowEditMode: function () {
        var editMode = this._editingController.getEditMode();
        return editMode === EDIT_MODE_ROW || editMode === EDIT_MODE_FORM;
    },
    _isCellEditMode: function () {
        var editMode = this._editingController.getEditMode();
        return editMode === EDIT_MODE_CELL || editMode === EDIT_MODE_BATCH;
    },
    _isFastEditingAllowed: function () {
        return this._isCellEditMode() && this.option('keyboardNavigation.editOnKeyPress');
    },
    _getInteractiveElement: function ($cell, isLast) {
        var $focusedElement = $cell.find(INTERACTIVE_ELEMENTS_SELECTOR).filter(':visible');
        return isLast ? $focusedElement.last() : $focusedElement.first();
    },
    _applyTabIndexToElement: function ($element) {
        var tabIndex = this.option('tabIndex') || 0;
        $element.attr('tabindex', type_1.isDefined(tabIndex) ? tabIndex : 0);
    },
    _getCell: function (cellPosition) {
        if (this._focusedView && cellPosition) {
            var rowIndexOffset = this._dataController.getRowIndexOffset();
            var column = this._columnsController.getVisibleColumns(null, true)[cellPosition.columnIndex];
            var columnIndexOffset = column && column.fixed ? this._getFixedColumnIndexOffset(column) : this._columnsController.getColumnIndexOffset();
            var rowIndex = cellPosition.rowIndex >= 0 ? cellPosition.rowIndex - rowIndexOffset : -1;
            var columnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex - columnIndexOffset : -1;
            return this._focusedView.getCell({
                rowIndex: rowIndex,
                columnIndex: columnIndex,
            });
        }
    },
    _getRowIndex: function ($row) {
        var rowsView = this.getView('rowsView');
        var rowIndex = rowsView.getRowIndex($row);
        if (rowIndex >= 0) {
            rowIndex += this._dataController.getRowIndexOffset();
        }
        return rowIndex;
    },
    _hasSkipRow: function ($row) {
        var row = $row && $row.get(0);
        return row && (row.style.display === 'none' || $row.hasClass(this.addWidgetPrefix(GROUP_FOOTER_CLASS)) || (isDetailRow($row) && !$row.hasClass(this.addWidgetPrefix(EDIT_FORM_CLASS))));
    },
    _allowEditingOnEnterKey: function () {
        return this.option('keyboardNavigation.enterKeyAction') === 'startEdit';
    },
    _isLegacyNavigation: function () {
        return this.option('useLegacyKeyboardNavigation');
    },
    _getDirectionCodeByKey: function (key) {
        var directionCode;
        // eslint-disable-next-line default-case
        switch (key) {
            case 'upArrow':
                directionCode = 'prevRow';
                break;
            case 'downArrow':
                directionCode = 'nextRow';
                break;
            case 'leftArrow':
                directionCode = this.option('rtlEnabled') ? 'nextInRow' : 'previousInRow';
                break;
            case 'rightArrow':
                directionCode = this.option('rtlEnabled') ? 'previousInRow' : 'nextInRow';
                break;
        }
        return directionCode;
    },
    _isVirtualScrolling: function () {
        var scrollingMode = this.option('scrolling.mode');
        return scrollingMode === 'virtual' || scrollingMode === 'infinite';
    },
    _isVirtualRowRender: function () {
        return this._isVirtualScrolling() || module_utils_1.default.isVirtualRowRendering(this);
    },
    _isVirtualColumnRender: function () {
        return this.option('scrolling.columnRenderingMode') === 'virtual';
    },
    _scrollBy: function (left, top, rowIndex, $event) {
        var that = this;
        var scrollable = this.getView('rowsView').getScrollable();
        if (that._focusedCellPosition) {
            var scrollHandler_1 = function () {
                scrollable.off('scroll', scrollHandler_1);
                setTimeout(that.restoreFocusableElement.bind(that, rowIndex, $event));
            };
            scrollable.on('scroll', scrollHandler_1);
        }
        return scrollable.scrollBy({ left: left, top: top });
    },
    _isInsideEditForm: function (element) {
        var $editForm = renderer_1.default(element).closest("." + this.addWidgetPrefix(EDIT_FORM_CLASS));
        return $editForm.length && this.elementIsInsideGrid($editForm);
    },
    _isMasterDetailCell: function (element) {
        var $masterDetailCell = renderer_1.default(element).closest("." + MASTER_DETAIL_CELL_CLASS);
        return $masterDetailCell.length && this.elementIsInsideGrid($masterDetailCell);
    },
    _processNextCellInMasterDetail: function ($nextCell) {
        if (!this._isInsideEditForm($nextCell) && $nextCell) {
            this._applyTabIndexToElement($nextCell);
        }
    },
    _handleTabKeyOnMasterDetailCell: function (target, direction) {
        if (this._isMasterDetailCell(target)) {
            this._updateFocusedCellPosition(renderer_1.default(target), direction);
            var $nextCell = this._getNextCell(direction, 'row');
            this._processNextCellInMasterDetail($nextCell, renderer_1.default(target));
            return true;
        }
        return false;
    },
    _getElementType: function (target) {
        return renderer_1.default(target).is('tr') ? 'row' : 'cell';
    },
    _isFastEditingStarted: function () {
        return this._isFastEditingAllowed() && this._fastEditingStarted;
    },
    _getVisibleColumnCount: function () {
        return this._columnsController.getVisibleColumns(null, true).length;
    },
    _isCellInRow: function (cellPosition, includeCommandCells) {
        var columnIndex = cellPosition.columnIndex;
        var visibleColumnsCount = this._getVisibleColumnCount();
        return includeCommandCells ? columnIndex >= 0 && columnIndex <= visibleColumnsCount - 1 : columnIndex > 0 && columnIndex < visibleColumnsCount - 1;
    },
    _isCellElement: function ($element) {
        return $element.length && $element[0].tagName === 'TD';
    },
    _getCellElementFromTarget: function (target) {
        var elementType = this._getElementType(target);
        var $targetElement = renderer_1.default(target);
        var $cell;
        if (elementType === 'cell') {
            $cell = $targetElement.closest("." + ROW_CLASS + " > td");
        }
        else {
            $cell = $targetElement.children().not("." + COMMAND_EXPAND_CLASS).first();
        }
        return $cell;
    },
    _getRowsViewElement: function () {
        var rowsView = this.getView('rowsView');
        return rowsView && rowsView.element();
    },
    isKeyboardEnabled: function () {
        return this.option('keyboardNavigation.enabled');
    },
    _processCanceledEditCellPosition: function (rowIndex, columnIndex) {
        if (this._canceledCellPosition) {
            var isCanceled = this._canceledCellPosition.rowIndex === rowIndex && this._canceledCellPosition.columnIndex === columnIndex;
            this._canceledCellPosition = null;
            return isCanceled;
        }
        return undefined;
    },
    updateFocusedRowIndex: function () {
        var dataController = this._dataController;
        var visibleRowIndex = this.getVisibleRowIndex();
        var visibleItems = dataController.items();
        var lastVisibleIndex = visibleItems.length ? visibleItems.length - 1 : -1;
        var rowIndexOffset = dataController.getRowIndexOffset();
        lastVisibleIndex >= 0 && visibleRowIndex > lastVisibleIndex && this.setFocusedRowIndex(lastVisibleIndex + rowIndexOffset);
    },
};
var KeyboardNavigationController = modules_1.default.ViewController.inherit(keyboardNavigationMembers);
exports.keyboardNavigationModule = {
    defaultOptions: function () {
        return {
            useLegacyKeyboardNavigation: false,
            keyboardNavigation: {
                enabled: true,
                enterKeyAction: 'startEdit',
                enterKeyDirection: 'none',
                editOnKeyPress: false,
            },
        };
    },
    controllers: {
        keyboardNavigation: KeyboardNavigationController,
    },
    extenders: {
        views: {
            rowsView: {
                _rowClick: function (e) {
                    var editRowIndex = this.getController('editing').getEditRowIndex();
                    var keyboardController = this.getController('keyboardNavigation');
                    var isKeyboardEnabled = keyboardController.isKeyboardEnabled();
                    if (editRowIndex === e.rowIndex) {
                        keyboardController.setCellFocusType();
                    }
                    var needTriggerPointerEventHandler = (isMobile() || !isKeyboardEnabled) && this.option('focusedRowEnabled');
                    if (needTriggerPointerEventHandler) {
                        this._triggerPointerDownEventHandler(e, !isKeyboardEnabled);
                    }
                    this.callBase.apply(this, arguments);
                },
                _triggerPointerDownEventHandler: function (e, force) {
                    var originalEvent = e.event.originalEvent;
                    if (originalEvent) {
                        var keyboardController = this.getController('keyboardNavigation');
                        var $cell = renderer_1.default(originalEvent.target);
                        var columnIndex = this.getCellIndex($cell);
                        var column = this.getController('columns').getVisibleColumns()[columnIndex];
                        var row = this.getController('data').items()[e.rowIndex];
                        if (keyboardController._isAllowEditing(row, column) || force) {
                            var eventArgs = index_1.createEvent(originalEvent, { currentTarget: originalEvent.target });
                            keyboardController._pointerEventHandler(eventArgs);
                        }
                    }
                },
                renderFocusState: function (params) {
                    var _a = params !== null && params !== void 0 ? params : {}, preventScroll = _a.preventScroll, pageSizeChanged = _a.pageSizeChanged;
                    var keyboardController = this.getController('keyboardNavigation');
                    var $rowsViewElement = this.element();
                    if ($rowsViewElement && !selectors_1.focused($rowsViewElement)) {
                        $rowsViewElement.attr('tabindex', null);
                    }
                    pageSizeChanged && keyboardController.updateFocusedRowIndex();
                    var rowIndex = keyboardController.getVisibleRowIndex();
                    if (!type_1.isDefined(rowIndex) || rowIndex < 0) {
                        rowIndex = 0;
                    }
                    var cellElements = this.getCellElements(rowIndex);
                    if (keyboardController.isKeyboardEnabled() && cellElements.length) {
                        this.updateFocusElementTabIndex(cellElements, preventScroll);
                    }
                },
                updateFocusElementTabIndex: function (cellElements) {
                    var keyboardController = this.getController('keyboardNavigation');
                    var $row = cellElements.eq(0).parent();
                    if (isGroupRow($row)) {
                        keyboardController._applyTabIndexToElement($row);
                    }
                    else {
                        var columnIndex = keyboardController.getColumnIndex();
                        if (!type_1.isDefined(columnIndex) || columnIndex < 0) {
                            columnIndex = 0;
                        }
                        this._updateFocusedCellTabIndex(cellElements, columnIndex);
                    }
                },
                _updateFocusedCellTabIndex: function (cellElements, columnIndex) {
                    var keyboardController = this.getController('keyboardNavigation');
                    var cellElementsLength = cellElements ? cellElements.length : -1;
                    var updateCellTabIndex = function ($cell) {
                        var isMasterDetailCell = keyboardController._isMasterDetailCell($cell);
                        var isValidCell = keyboardController._isCellValid($cell);
                        if (!isMasterDetailCell && isValidCell && keyboardController._isCellElement($cell)) {
                            keyboardController._applyTabIndexToElement($cell);
                            keyboardController.setCellFocusType();
                            return true;
                        }
                        return undefined;
                    };
                    var $cell = dom_1.GridCoreKeyboardNavigationDom.getCellToFocus(cellElements, columnIndex);
                    if ($cell.length) {
                        updateCellTabIndex($cell);
                    }
                    else {
                        if (cellElementsLength <= columnIndex) {
                            columnIndex = cellElementsLength - 1;
                        }
                        for (var i = columnIndex; i < cellElementsLength; ++i) {
                            if (updateCellTabIndex(renderer_1.default(cellElements[i]))) {
                                break;
                            }
                        }
                    }
                },
                renderDelayedTemplates: function (change) {
                    this.callBase.apply(this, arguments);
                    this._renderFocusByChange(change);
                },
                _renderFocusByChange: function (change) {
                    var _a = change !== null && change !== void 0 ? change : {}, operationTypes = _a.operationTypes, repaintChangesOnly = _a.repaintChangesOnly;
                    var _b = operationTypes !== null && operationTypes !== void 0 ? operationTypes : {}, fullReload = _b.fullReload, pageSize = _b.pageSize;
                    if (!change || !repaintChangesOnly || fullReload || pageSize) {
                        var preventScroll = shouldPreventScroll(this);
                        this.renderFocusState({
                            preventScroll: preventScroll,
                            pageSizeChanged: pageSize,
                        });
                    }
                },
                _renderCore: function (change) {
                    var deferred = this.callBase.apply(this, arguments);
                    this._renderFocusByChange(change);
                    return deferred;
                },
                _editCellPrepared: function ($cell) {
                    var editorInstance = this._getEditorInstance($cell);
                    var keyboardController = this.getController('keyboardNavigation');
                    var isEditingNavigationMode = keyboardController && keyboardController._isFastEditingStarted();
                    if (editorInstance && isEditingNavigationMode) {
                        this._handleEditingNavigationMode(editorInstance);
                    }
                    this.callBase.apply(this, arguments);
                },
                _handleEditingNavigationMode: function (editorInstance) {
                    ['downArrow', 'upArrow'].forEach(function (keyName) {
                        var originalKeyHandler = editorInstance._supportedKeys()[keyName];
                        editorInstance.registerKeyHandler(keyName, function (e) {
                            var isDropDownOpened = editorInstance._input().attr('aria-expanded') === 'true';
                            if (isDropDownOpened) {
                                return originalKeyHandler && originalKeyHandler.call(editorInstance, e);
                            }
                        });
                    });
                    editorInstance.registerKeyHandler('leftArrow', common_1.noop);
                    editorInstance.registerKeyHandler('rightArrow', common_1.noop);
                    var isDateBoxWithMask = editorInstance.NAME === DATEBOX_WIDGET_NAME && editorInstance.option('useMaskBehavior');
                    if (isDateBoxWithMask) {
                        editorInstance.registerKeyHandler('enter', common_1.noop);
                    }
                },
                _getEditorInstance: function ($cell) {
                    var $editor = $cell.find('.dx-texteditor').eq(0);
                    return module_utils_1.default.getWidgetInstance($editor);
                },
            },
        },
        controllers: {
            editing: {
                editCell: function (rowIndex, columnIndex) {
                    var keyboardController = this.getController('keyboardNavigation');
                    if (keyboardController._processCanceledEditCellPosition(rowIndex, columnIndex)) {
                        return false;
                    }
                    var isCellEditing = this.callBase(rowIndex, columnIndex);
                    if (isCellEditing) {
                        keyboardController.setupFocusedView();
                    }
                    return isCellEditing;
                },
                editRow: function (rowIndex) {
                    var keyboardController = this.getController('keyboardNavigation');
                    var visibleColumnIndex = keyboardController.getVisibleColumnIndex();
                    var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
                    if (column && column.type || this.option('editing.mode') === EDIT_MODE_FORM) {
                        keyboardController._resetFocusedCell();
                    }
                    this.callBase(rowIndex);
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                addRow: function (parentKey) {
                    var keyboardController = this.getController('keyboardNavigation');
                    keyboardController.setupFocusedView();
                    keyboardController.setCellFocusType();
                    return this.callBase.apply(this, arguments);
                },
                getFocusedCellInRow: function (rowIndex) {
                    var keyboardNavigationController = this.getController('keyboardNavigation');
                    var $cell = this.callBase(rowIndex);
                    if (keyboardNavigationController.isKeyboardEnabled() && keyboardNavigationController._focusedCellPosition.rowIndex === rowIndex) {
                        var $focusedCell = keyboardNavigationController._getFocusedCell();
                        if (isElementDefined($focusedCell) && !$focusedCell.hasClass(COMMAND_EDIT_CLASS)) {
                            $cell = $focusedCell;
                        }
                    }
                    return $cell;
                },
                _processCanceledEditingCell: function () {
                    var _this = this;
                    this.closeEditCell().done(function () {
                        var keyboardNavigation = _this.getController('keyboardNavigation');
                        keyboardNavigation._updateFocus();
                    });
                },
                init: function () {
                    this.callBase();
                    this._keyboardNavigationController = this.getController('keyboardNavigation');
                },
                closeEditCell: function () {
                    var keyboardNavigation = this._keyboardNavigationController;
                    keyboardNavigation._fastEditingStarted = false;
                    var result = this.callBase.apply(this, arguments);
                    keyboardNavigation._updateFocus();
                    return result;
                },
                _delayedInputFocus: function () {
                    this._keyboardNavigationController._isNeedScroll = true;
                    this.callBase.apply(this, arguments);
                },
                _isEditingStart: function () {
                    var keyboardNavigation = this.getController('keyboardNavigation');
                    var cancel = this.callBase.apply(this, arguments);
                    if (cancel && !keyboardNavigation._isNeedFocus) {
                        var $cell = keyboardNavigation._getFocusedCell();
                        keyboardNavigation._focus($cell, true);
                    }
                    return cancel;
                },
            },
            data: {
                _correctRowIndices: function (getRowIndexCorrection) {
                    var that = this;
                    var keyboardNavigationController = that.getController('keyboardNavigation');
                    var editorFactory = that.getController('editorFactory');
                    var focusedCellPosition = keyboardNavigationController._focusedCellPosition;
                    that.callBase.apply(that, arguments);
                    if (focusedCellPosition && focusedCellPosition.rowIndex >= 0) {
                        var focusedRowIndexCorrection = getRowIndexCorrection(focusedCellPosition.rowIndex);
                        if (focusedRowIndexCorrection) {
                            focusedCellPosition.rowIndex += focusedRowIndexCorrection;
                            editorFactory.refocus();
                        }
                    }
                },
                getMaxRowIndex: function () {
                    var result = this.items().length - 1;
                    var virtualItemsCount = this.virtualItemsCount();
                    if (virtualItemsCount) {
                        var rowIndexOffset = this.getRowIndexOffset();
                        result += rowIndexOffset + virtualItemsCount.end;
                    }
                    return result;
                },
            },
            adaptiveColumns: {
                _showHiddenCellsInView: function (_a) {
                    var viewName = _a.viewName, $cells = _a.$cells, isCommandColumn = _a.isCommandColumn;
                    this.callBase.apply(this, arguments);
                    viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && $cells.each(function (_, cellElement) {
                        var $cell = renderer_1.default(cellElement);
                        isCellInHeaderRow($cell) && $cell.attr('tabindex', 0);
                    });
                },
                _hideVisibleCellInView: function (_a) {
                    var viewName = _a.viewName, $cell = _a.$cell, isCommandColumn = _a.isCommandColumn;
                    this.callBase.apply(this, arguments);
                    if (viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && isCellInHeaderRow($cell)) {
                        $cell.removeAttr('tabindex');
                    }
                },
            },
        },
    },
};
