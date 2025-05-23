import { noop } from '../../../../core/utils/common';
import domAdapter from '../../../../core/dom_adapter';
import { getPublicElement } from '../../../../core/element';
import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
import { Deferred, when } from '../../../../core/utils/deferred';
import { getHeight, getOuterHeight, getOuterWidth, getWidth } from '../../../../core/utils/size';
import { isDeferred, isDefined, isEmptyObject } from '../../../../core/utils/type';
import { name as clickEventName } from '../../../../events/click';
import eventsEngine from '../../../../events/core/events_engine';
import pointerEvents from '../../../../events/pointer';
import { keyboard } from '../../../../events/short';
import { addNamespace, createEvent, isCommandKeyPressed } from '../../../../events/utils/index';
import * as accessibility from '../../../../ui/shared/accessibility';
import { focused } from '../../../../ui/widget/selectors';
import { memoize } from '../../../utils/memoize';
import { EDIT_FORM_CLASS, EDIT_MODE_BATCH, EDIT_MODE_CELL, EDIT_MODE_FORM, EDIT_MODE_ROW, EDITOR_CELL_CLASS, FOCUSABLE_ELEMENT_SELECTOR, ROW_CLASS } from '../editing/const';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
import { ADAPTIVE_COLUMN_NAME_CLASS, CELL_FOCUS_DISABLED_CLASS, COLUMN_HEADERS_VIEW, COMMAND_CELL_SELECTOR, COMMAND_EDIT_CLASS, COMMAND_EXPAND_CLASS, COMMAND_SELECT_CLASS, DATA_ROW_CLASS, DATEBOX_WIDGET_NAME, DROPDOWN_EDITOR_OVERLAY_CLASS, EDIT_FORM_ITEM_CLASS, FAST_EDITING_DELETE_KEY, FOCUS_STATE_CLASS, FOCUS_TYPE_CELL, FOCUS_TYPE_ROW, FOCUSED_CLASS, FREESPACE_ROW_CLASS, FUNCTIONAL_KEYS, INTERACTIVE_ELEMENTS_SELECTOR, MASTER_DETAIL_CELL_CLASS, NON_FOCUSABLE_ELEMENTS_SELECTOR, REVERT_BUTTON_CLASS, ROWS_VIEW_CLASS, WIDGET_CLASS } from './const';
import { GridCoreKeyboardNavigationDom } from './dom';
import { isCellInHeaderRow, isDataRow, isDetailRow, isEditorCell, isElementDefined, isFixedColumnIndexOffsetRequired, isGroupFooterRow, isGroupRow, isMobile, isNotFocusedRow, shouldPreventScroll } from './m_keyboard_navigation_utils';
import { keyboardNavigationScrollableA11yExtender } from './scrollable_a11y';
export class KeyboardNavigationController extends modules.ViewController {
  // #region Initialization
  init() {
    var _a, _b;
    this._dataController = this.getController('data');
    this._selectionController = this.getController('selection');
    this._editingController = this.getController('editing');
    this._headerPanel = this.getView('headerPanel');
    this._rowsView = this.getView('rowsView');
    this._columnsController = this.getController('columns');
    this._editorFactory = this.getController('editorFactory');
    this._focusController = this.getController('focus');
    this._adaptiveColumnsController = this.getController('adaptiveColumns');
    this._memoFireFocusedCellChanged = memoize(this._memoFireFocusedCellChanged.bind(this), {
      compareType: 'value'
    });
    this._memoFireFocusedRowChanged = memoize(this._memoFireFocusedRowChanged.bind(this), {
      compareType: 'value'
    });
    this.focusedHandlerWithContext = this.focusedHandlerWithContext || this.focusedHandler.bind(this);
    this.renderCompletedWithContext = this.renderCompletedWithContext || this.renderCompleted.bind(this);
    this.rowsViewFocusHandlerContext = this.rowsViewFocusHandlerContext || this.rowsViewFocusHandler.bind(this);
    this._updateFocusTimeout = null;
    this._fastEditingStarted = false;
    this._focusedCellPosition = {};
    this._canceledCellPosition = null;
    if (this.isKeyboardEnabled()) {
      accessibility.subscribeVisibilityChange();
      (_a = this._editorFactory) === null || _a === void 0 ? void 0 : _a.focused.add(this.focusedHandlerWithContext);
      this.createAction('onKeyDown');
    } else {
      accessibility.unsubscribeVisibilityChange();
      (_b = this._editorFactory) === null || _b === void 0 ? void 0 : _b.focused.remove(this.focusedHandlerWithContext);
    }
    this.initViewHandlers();
    this.initDocumentHandlers();
  }
  focusedHandler($element) {
    this.setupFocusedView();
    if (this._isNeedScroll) {
      if ($element.is(':visible') && this._focusedView && this._focusedView.getScrollable) {
        this._focusedView._scrollToElement($element);
        this._isNeedScroll = false;
      }
    }
  }
  rowsViewFocusHandler(event) {
    var _a;
    var $element = $(event.target);
    var isRelatedTargetInRowsView = $(event.relatedTarget).closest(this._rowsView.element()).length;
    var isLink = $element.is('a');
    if (event.relatedTarget && isLink && !isRelatedTargetInRowsView && this._isEventInCurrentGrid(event)) {
      var $focusedCell = this._getFocusedCell();
      $focusedCell = !isElementDefined($focusedCell) ? this._rowsView.getCellElements(0).filter('[tabindex]').eq(0) : $focusedCell;
      if (!$element.closest($focusedCell).length) {
        event.preventDefault();
        // @ts-expect-error
        eventsEngine.trigger($focusedCell, 'focus');
      }
    }
    var isCell = $element.is('td');
    var needSetFocusPosition = ((_a = this.option('focusedRowIndex')) !== null && _a !== void 0 ? _a : -1) < 0;
    if (isCell && needSetFocusPosition) {
      this._updateFocusedCellPosition($element);
    }
  }
  subscribeToRowsViewFocusEvent() {
    var _a;
    var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
    eventsEngine.on($rowsView, 'focusin', this.rowsViewFocusHandlerContext);
  }
  unsubscribeFromRowsViewFocusEvent() {
    var _a;
    var $rowsView = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
    eventsEngine.off($rowsView, 'focusin', this.rowsViewFocusHandlerContext);
  }
  renderCompleted(e) {
    var $rowsView = this._rowsView.element();
    var isFullUpdate = !e || e.changeType === 'refresh';
    var isFocusedViewCorrect = this._focusedView && this._focusedView.name === this._rowsView.name;
    var needUpdateFocus = false;
    var isAppend = e && (e.changeType === 'append' || e.changeType === 'prepend');
    // @ts-expect-error
    var root = $(domAdapter.getRootNode($rowsView.get && $rowsView.get(0)));
    var $focusedElement = root.find(':focus');
    var isFocusedElementCorrect = !$focusedElement.length || $focusedElement.closest($rowsView).length;
    this.unsubscribeFromRowsViewFocusEvent();
    this.subscribeToRowsViewFocusEvent();
    this.initPointerEventHandler();
    this.initKeyDownHandler();
    this._setRowsViewAttributes();
    if (isFocusedViewCorrect && isFocusedElementCorrect) {
      needUpdateFocus = this._isNeedFocus ? !isAppend : this._isHiddenFocus && isFullUpdate && !(e === null || e === void 0 ? void 0 : e.virtualColumnsScrolling);
      needUpdateFocus && this._updateFocus(true);
    }
  }
  initViewHandlers() {
    var _a, _b;
    this.unsubscribeFromRowsViewFocusEvent();
    this.unsubscribeFromPointerEvent();
    this.unsubscribeFromKeyDownEvent();
    (_b = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.renderCompleted) === null || _b === void 0 ? void 0 : _b.remove(this.renderCompletedWithContext);
    if (this.isKeyboardEnabled()) {
      this._rowsView.renderCompleted.add(this.renderCompletedWithContext);
    }
  }
  initDocumentHandlers() {
    var document = domAdapter.getDocument();
    this._documentClickHandler = this._documentClickHandler || this.createAction(e => {
      var $target = $(e.event.target);
      var isCurrentRowsViewClick = this._isEventInCurrentGrid(e.event) && $target.closest(".".concat(this.addWidgetPrefix(ROWS_VIEW_CLASS))).length;
      var isEditorOverlay = $target.closest(".".concat(DROPDOWN_EDITOR_OVERLAY_CLASS)).length;
      var columnsResizerController = this.getController('columnsResizer');
      var isColumnResizing = !!columnsResizerController && columnsResizerController.isResizing();
      if (!isCurrentRowsViewClick && !isEditorOverlay && !isColumnResizing) {
        var targetInsideFocusedView = this._focusedView ? $target.parents().filter(this._focusedView.element()).length > 0 : false;
        !targetInsideFocusedView && this._resetFocusedCell(true);
        this._resetFocusedView();
      }
    });
    eventsEngine.off(document, addNamespace(pointerEvents.down, 'dxDataGridKeyboardNavigation'), this._documentClickHandler);
    if (this.isKeyboardEnabled()) {
      eventsEngine.on(document, addNamespace(pointerEvents.down, 'dxDataGridKeyboardNavigation'), this._documentClickHandler);
    }
  }
  _setRowsViewAttributes() {
    var $rowsView = this._getRowsViewElement();
    var isGridEmpty = !this._dataController.getVisibleRows().length;
    if (isGridEmpty) {
      this._applyTabIndexToElement($rowsView);
    }
  }
  unsubscribeFromPointerEvent() {
    var pointerEventName = !isMobile() ? pointerEvents.down : clickEventName;
    var $rowsView = this._getRowsViewElement();
    this._pointerEventAction && eventsEngine.off($rowsView, addNamespace(pointerEventName, 'dxDataGridKeyboardNavigation'), this._pointerEventAction);
  }
  subscribeToPointerEvent() {
    var pointerEventName = !isMobile() ? pointerEvents.down : clickEventName;
    var $rowsView = this._getRowsViewElement();
    var clickSelector = ".".concat(ROW_CLASS, " > td, .").concat(ROW_CLASS);
    eventsEngine.on($rowsView, addNamespace(pointerEventName, 'dxDataGridKeyboardNavigation'), clickSelector, this._pointerEventAction);
  }
  initPointerEventHandler() {
    this._pointerEventAction = this._pointerEventAction || this.createAction(this._pointerEventHandler);
    this.unsubscribeFromPointerEvent();
    this.subscribeToPointerEvent();
  }
  unsubscribeFromKeyDownEvent() {
    keyboard.off(this._keyDownListener);
  }
  subscribeToKeyDownEvent() {
    var $rowsView = this._getRowsViewElement();
    this._keyDownListener = keyboard.on($rowsView, null, e => this._keyDownHandler(e));
  }
  initKeyDownHandler() {
    this._keyDownListener && this.unsubscribeFromKeyDownEvent();
    this.subscribeToKeyDownEvent();
  }
  dispose() {
    super.dispose();
    this._resetFocusedView();
    keyboard.off(this._keyDownListener);
    eventsEngine.off(domAdapter.getDocument(), addNamespace(pointerEvents.down, 'dxDataGridKeyboardNavigation'), this._documentClickHandler);
    clearTimeout(this._updateFocusTimeout);
    accessibility.unsubscribeVisibilityChange();
  }
  // #endregion Initialization
  // #region Options
  optionChanged(args) {
    switch (args.name) {
      case 'keyboardNavigation':
      case 'useLegacyKeyboardNavigation':
        this.init();
        args.handled = true;
        break;
      default:
        super.optionChanged(args);
    }
  }
  isRowFocusType() {
    return this.focusType === FOCUS_TYPE_ROW;
  }
  isCellFocusType() {
    return this.focusType === FOCUS_TYPE_CELL;
  }
  setRowFocusType() {
    if (this.option('focusedRowEnabled')) {
      this.focusType = FOCUS_TYPE_ROW;
    }
  }
  setCellFocusType() {
    this.focusType = FOCUS_TYPE_CELL;
  }
  // #endregion Options
  // #region Key_Handlers
  _keyDownHandler(e) {
    var _a;
    var needStopPropagation = true;
    this._isNeedFocus = true;
    this._isNeedScroll = true;
    var isHandled = this._processOnKeyDown(e);
    var isEditing = (_a = this._editingController) === null || _a === void 0 ? void 0 : _a.isEditing();
    var {
      originalEvent
    } = e;
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
          } else {
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
          if (isCommandKeyPressed(e.originalEvent)) {
            this._ctrlAKeyHandler(e, isEditing);
            isHandled = true;
          } else {
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
          if (isCommandKeyPressed(e.originalEvent)) {
            this._ctrlFKeyHandler(e);
            isHandled = true;
          } else {
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
  }
  _processOnKeyDown(eventArgs) {
    var {
      originalEvent
    } = eventArgs;
    var args = {
      handled: false,
      event: originalEvent
    };
    this.executeAction('onKeyDown', args);
    eventArgs.ctrl = originalEvent.ctrlKey;
    eventArgs.alt = originalEvent.altKey;
    eventArgs.shift = originalEvent.shiftKey;
    return !!args.handled;
  }
  _closeEditCell() {
    setTimeout(() => {
      this._editingController.closeEditCell();
    });
  }
  _leftRightKeysHandler(eventArgs, isEditing) {
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
  }
  _upDownKeysHandler(eventArgs, isEditing) {
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
          var rowHeight = getOuterHeight($row);
          var rowIndex = this._focusedCellPosition.rowIndex - 1;
          this._scrollBy(0, -rowHeight, rowIndex, $event);
        }
      }
      $event && $event.preventDefault();
    }
  }
  _pageUpDownKeyHandler(eventArgs) {
    var pageIndex = this._dataController.pageIndex();
    var pageCount = this._dataController.pageCount();
    var pagingEnabled = this.option('paging.enabled');
    var isPageUp = eventArgs.keyName === 'pageUp';
    var pageStep = isPageUp ? -1 : 1;
    var scrollable = this._rowsView.getScrollable();
    if (pagingEnabled && !this._isVirtualScrolling()) {
      if ((isPageUp ? pageIndex > 0 : pageIndex < pageCount - 1) && !this._isVirtualScrolling()) {
        this._dataController.pageIndex(pageIndex + pageStep);
        eventArgs.originalEvent.preventDefault();
      }
    } else if (scrollable && getHeight(scrollable.container()) < getHeight(scrollable.$content())) {
      this._scrollBy(0, getHeight(scrollable.container()) * pageStep);
      eventArgs.originalEvent.preventDefault();
    }
  }
  _spaceKeyHandler(eventArgs, isEditing) {
    var rowIndex = this.getVisibleRowIndex();
    var $target = $(eventArgs.originalEvent && eventArgs.originalEvent.target);
    if (this.option('selection') && this.option('selection').mode !== 'none' && !isEditing) {
      var isFocusedRowElement = this._getElementType($target) === 'row' && this.isRowFocusType() && isDataRow($target);
      var isFocusedSelectionCell = $target.hasClass(COMMAND_SELECT_CLASS);
      if (isFocusedSelectionCell && this.option('selection.showCheckBoxesMode') === 'onClick') {
        this._selectionController.startSelectionWithCheckboxes();
      }
      if (isFocusedRowElement || $target.parent().hasClass(DATA_ROW_CLASS) || $target.hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
        this._selectionController.changeItemSelection(rowIndex, {
          shift: eventArgs.shift,
          control: eventArgs.ctrl
        });
        eventArgs.originalEvent.preventDefault();
        return true;
      }
      return false;
    }
    return this._beginFastEditing(eventArgs.originalEvent);
  }
  _ctrlAKeyHandler(eventArgs, isEditing) {
    if (!isEditing && !eventArgs.alt && this.option('selection.mode') === 'multiple' && this.option('selection.allowSelectAll')) {
      this._selectionController.selectAll();
      eventArgs.originalEvent.preventDefault();
    }
  }
  _tabKeyHandler(eventArgs, isEditing) {
    var editingOptions = this.option('editing');
    var direction = eventArgs.shift ? 'previous' : 'next';
    var isCellPositionDefined = isDefined(this._focusedCellPosition) && !isEmptyObject(this._focusedCellPosition);
    var isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
    var eventTarget = eventArgs.originalEvent.target;
    var focusedViewElement = this._focusedView && this._focusedView.element();
    if (this._handleTabKeyOnMasterDetailCell(eventTarget, direction)) {
      return;
    }
    $(focusedViewElement).addClass(FOCUS_STATE_CLASS);
    if (editingOptions && eventTarget && !isOriginalHandlerRequired) {
      if ($(eventTarget).hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
        this._resetFocusedCell();
      }
      if (this._isVirtualColumnRender()) {
        this._processVirtualHorizontalPosition(direction);
      }
      if (isEditing) {
        if (!this._editingCellTabHandler(eventArgs, direction)) {
          return;
        }
      } else if (this._targetCellTabHandler(eventArgs, direction)) {
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
    } else {
      eventArgs.originalEvent.preventDefault();
    }
  }
  _getMaxHorizontalOffset() {
    var scrollable = this.component.getScrollable();
    return scrollable ? scrollable.scrollWidth() - getWidth(this._rowsView.element()) : 0;
  }
  _isColumnRendered(columnIndex) {
    var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
    var renderedVisibleColumns = this._columnsController.getVisibleColumns();
    var column = allVisibleColumns[columnIndex];
    var result = false;
    if (column) {
      result = renderedVisibleColumns.indexOf(column) >= 0;
    }
    return result;
  }
  _isFixedColumn(columnIndex) {
    var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
    var column = allVisibleColumns[columnIndex];
    return !!column && !!column.fixed;
  }
  _isColumnVirtual(columnIndex) {
    var localColumnIndex = columnIndex - this._columnsController.getColumnIndexOffset();
    var visibleColumns = this._columnsController.getVisibleColumns();
    var column = visibleColumns[localColumnIndex];
    return !!column && column.command === 'virtual';
  }
  _processVirtualHorizontalPosition(direction) {
    var scrollable = this.component.getScrollable();
    var columnIndex = this.getColumnIndex();
    var nextColumnIndex;
    var horizontalScrollPosition = 0;
    var needToScroll = false;
    // eslint-disable-next-line default-case
    switch (direction) {
      case 'next':
      case 'nextInRow':
        {
          var columnsCount = this._getVisibleColumnCount();
          nextColumnIndex = columnIndex + 1;
          horizontalScrollPosition = this.option('rtlEnabled') ? this._getMaxHorizontalOffset() : 0;
          if (direction === 'next') {
            needToScroll = columnsCount === nextColumnIndex || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex);
          } else {
            needToScroll = columnsCount > nextColumnIndex && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex);
          }
          break;
        }
      case 'previous':
      case 'previousInRow':
        {
          nextColumnIndex = columnIndex - 1;
          horizontalScrollPosition = this.option('rtlEnabled') ? 0 : this._getMaxHorizontalOffset();
          if (direction === 'previous') {
            var columnIndexOffset = this._columnsController.getColumnIndexOffset();
            var leftEdgePosition = nextColumnIndex < 0 && columnIndexOffset === 0;
            needToScroll = leftEdgePosition || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex);
          } else {
            needToScroll = nextColumnIndex >= 0 && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex);
          }
          break;
        }
    }
    if (needToScroll) {
      scrollable.scrollTo({
        left: horizontalScrollPosition
      });
    } else if (isDefined(nextColumnIndex) && isDefined(direction) && this._isColumnVirtual(nextColumnIndex)) {
      horizontalScrollPosition = this._getHorizontalScrollPositionOffset(direction);
      horizontalScrollPosition !== 0 && scrollable.scrollBy({
        left: horizontalScrollPosition,
        top: 0
      });
    }
  }
  _getHorizontalScrollPositionOffset(direction) {
    var positionOffset = 0;
    var $currentCell = this._getCell(this._focusedCellPosition);
    var currentCellWidth = $currentCell && getOuterWidth($currentCell);
    if (currentCellWidth > 0) {
      var rtlMultiplier = this.option('rtlEnabled') ? -1 : 1;
      positionOffset = direction === 'nextInRow' || direction === 'next' ? currentCellWidth * rtlMultiplier : currentCellWidth * rtlMultiplier * -1;
    }
    return positionOffset;
  }
  _editingCellTabHandler(eventArgs, direction) {
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
    var cellIndex = this._rowsView.getCellIndex($cell);
    var columnIndex = cellIndex + columnsController.getColumnIndexOffset();
    var column = columnsController.getVisibleColumns(null, true)[columnIndex];
    var $row = $cell.parent();
    var rowIndex = this._getRowIndex($row);
    var row = this._dataController.items()[rowIndex];
    var editingController = this._editingController;
    if (column && column.allowEditing) {
      var _isDataRow = !row || row.rowType === 'data';
      isEditingAllowed = editingController.allowUpdating({
        row
      }) ? _isDataRow : row && row.isNewRow;
    }
    if (!isEditingAllowed) {
      this._closeEditCell();
    }
    if (this._focusCell($cell, !nextCellInfo.isHighlighted)) {
      if (!this._isRowEditMode() && isEditingAllowed) {
        this._editFocusedCell();
      } else {
        this._focusInteractiveElement($cell, eventArgs.shift);
      }
    }
    return true;
  }
  _targetCellTabHandler(eventArgs, direction) {
    var $event = eventArgs.originalEvent;
    var eventTarget = $event.target;
    var elementType = this._getElementType(eventTarget);
    var $cell = this._getCellElementFromTarget(eventTarget);
    var $lastInteractiveElement = elementType === 'cell' && this._getInteractiveElement($cell, !eventArgs.shift);
    var isOriginalHandlerRequired = false;
    if (!isEditorCell(this, $cell) && ($lastInteractiveElement === null || $lastInteractiveElement === void 0 ? void 0 : $lastInteractiveElement.length) && eventTarget !== $lastInteractiveElement.get(0)) {
      isOriginalHandlerRequired = true;
    } else {
      if (this._focusedCellPosition.rowIndex === undefined && $(eventTarget).hasClass(ROW_CLASS)) {
        this._updateFocusedCellPosition($cell);
      }
      elementType = this._getElementType(eventTarget);
      if (this.isRowFocusType()) {
        this.setCellFocusType();
        if (elementType === 'row' && isDataRow($(eventTarget))) {
          eventTarget = this.getFirstValidCellInRow($(eventTarget));
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
  }
  _getNextCellByTabKey($event, direction, elementType) {
    var $cell = this._getNextCell(direction, elementType);
    var args = $cell && this._fireFocusedCellChanging($event, $cell, true);
    if (!args || args.cancel) {
      return {};
    }
    if (args.$newCellElement) {
      $cell = args.$newCellElement;
    }
    return {
      $cell,
      isHighlighted: args.isHighlighted
    };
  }
  _checkNewLineTransition($event, $cell) {
    var rowIndex = this.getVisibleRowIndex();
    var $row = $cell.parent();
    if (rowIndex !== this._getRowIndex($row)) {
      var cellPosition = this._getCellPosition($cell);
      var args = this._fireFocusedRowChanging($event, $row);
      if (args.cancel) {
        return;
      }
      if (args.rowIndexChanged && cellPosition) {
        this.setFocusedColumnIndex(cellPosition.columnIndex);
        $cell = this._getFocusedCell();
      }
    }
    return $cell;
  }
  _enterKeyHandler(eventArgs, isEditing) {
    var _a;
    var rowIndex = this.getVisibleRowIndex();
    var key = this._dataController.getKeyByRowIndex(rowIndex);
    var $row = (_a = this._focusedView) === null || _a === void 0 ? void 0 : _a.getRow(rowIndex);
    var $cell = this._getFocusedCell();
    var needExpandGroupRow = this.option('grouping.allowCollapsing') && isGroupRow($row);
    var needExpandMasterDetailRow = this.option('masterDetail.enabled') && ($cell === null || $cell === void 0 ? void 0 : $cell.hasClass(COMMAND_EXPAND_CLASS));
    var needExpandAdaptiveRow = $cell === null || $cell === void 0 ? void 0 : $cell.hasClass(ADAPTIVE_COLUMN_NAME_CLASS);
    if (needExpandGroupRow || needExpandMasterDetailRow) {
      var item = this._dataController.items()[rowIndex];
      var isNotContinuation = (item === null || item === void 0 ? void 0 : item.data) && !item.data.isContinuation;
      if (isDefined(key) && isNotContinuation) {
        this._dataController.changeRowExpand(key);
      }
    } else if (needExpandAdaptiveRow) {
      this._adaptiveColumnsController.toggleExpandAdaptiveDetailRow(key);
      this._updateFocusedCellPosition($cell);
    } else {
      this._processEnterKeyForDataCell(eventArgs, isEditing);
    }
  }
  _processEnterKeyForDataCell(eventArgs, isEditing) {
    var direction = this._getEnterKeyDirection(eventArgs);
    var allowEditingOnEnterKey = this._allowEditingOnEnterKey();
    if (isEditing || !allowEditingOnEnterKey && direction) {
      this._handleEnterKeyEditingCell(eventArgs.originalEvent);
      if (direction === 'next' || direction === 'previous') {
        this._targetCellTabHandler(eventArgs, direction);
      } else if (direction === 'upArrow' || direction === 'downArrow') {
        this._navigateNextCell(eventArgs.originalEvent, direction);
      }
    } else if (allowEditingOnEnterKey) {
      this._startEditing(eventArgs);
    }
  }
  _getEnterKeyDirection(eventArgs) {
    var enterKeyDirection = this.option('keyboardNavigation.enterKeyDirection');
    var isShift = eventArgs.shift;
    if (enterKeyDirection === 'column') {
      return isShift ? 'upArrow' : 'downArrow';
    }
    if (enterKeyDirection === 'row') {
      return isShift ? 'previous' : 'next';
    }
    return undefined;
  }
  _handleEnterKeyEditingCell(event) {
    var {
      target
    } = event;
    var $cell = this._getCellElementFromTarget(target);
    var isRowEditMode = this._isRowEditMode();
    this._updateFocusedCellPosition($cell);
    if (isRowEditMode) {
      this._focusEditFormCell($cell);
      setTimeout(this._editingController.saveEditData.bind(this._editingController));
    } else {
      // @ts-expect-error
      eventsEngine.trigger($(target), 'change');
      this._closeEditCell();
      event.preventDefault();
    }
  }
  _escapeKeyHandler(eventArgs, isEditing) {
    var $cell = this._getCellElementFromTarget(eventArgs.originalEvent.target);
    if (isEditing) {
      this._updateFocusedCellPosition($cell);
      if (!this._isRowEditMode()) {
        if (this._editingController.getEditMode() === 'cell') {
          this._editingController.cancelEditData();
        } else {
          this._closeEditCell();
        }
      } else {
        this._focusEditFormCell($cell);
        this._editingController.cancelEditData();
        if (this._dataController.items().length === 0) {
          this._resetFocusedCell();
          this._editorFactory.loseFocus();
        }
      }
      eventArgs.originalEvent.preventDefault();
    }
  }
  _ctrlFKeyHandler(eventArgs) {
    if (this.option('searchPanel.visible')) {
      var searchTextEditor = this._headerPanel.getSearchTextEditor();
      if (searchTextEditor) {
        searchTextEditor.focus();
        eventArgs.originalEvent.preventDefault();
      }
    }
  }
  _f2KeyHandler() {
    var isEditing = this._editingController.isEditing();
    var rowIndex = this.getVisibleRowIndex();
    var $row = this._focusedView && this._focusedView.getRow(rowIndex);
    if (!isEditing && isDataRow($row)) {
      this._startEditing();
    }
  }
  _navigateNextCell($event, keyCode) {
    var $cell = this._getNextCell(keyCode);
    var directionCode = this._getDirectionCodeByKey(keyCode);
    var isCellValid = $cell && this._isCellValid($cell);
    var result = isCellValid ? this._arrowKeysHandlerFocusCell($event, $cell, directionCode) : false;
    return result;
  }
  _arrowKeysHandlerFocusCell($event, $nextCell, direction) {
    var isVerticalDirection = direction === 'prevRow' || direction === 'nextRow';
    var args = this._fireFocusChangingEvents($event, $nextCell, isVerticalDirection, true);
    $nextCell = args.$newCellElement;
    if (!args.cancel && this._isCellValid($nextCell)) {
      this._focus($nextCell, !args.isHighlighted);
      return true;
    }
    return false;
  }
  _beginFastEditing(originalEvent, isDeleting) {
    if (!this._isFastEditingAllowed() || originalEvent.altKey || originalEvent.ctrlKey || this._editingController.isEditing()) {
      return false;
    }
    if (isDeleting) {
      this._startEditing(originalEvent, FAST_EDITING_DELETE_KEY);
    } else {
      var {
        key
      } = originalEvent;
      var keyCode = originalEvent.keyCode || originalEvent.which;
      var fastEditingKey = key || keyCode && String.fromCharCode(keyCode);
      if (fastEditingKey && (fastEditingKey.length === 1 || fastEditingKey === FAST_EDITING_DELETE_KEY)) {
        this._startEditing(originalEvent, fastEditingKey);
      }
    }
    return true;
  }
  // #endregion Key_Handlers
  // #region Pointer_Event_Handler
  _pointerEventHandler(e) {
    var _a;
    var event = e.event || e;
    var $target = $(event.currentTarget);
    var focusedViewElement = (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
    var $parent = $target.parent();
    var isInteractiveElement = $(event.target).is(INTERACTIVE_ELEMENTS_SELECTOR);
    var isRevertButton = !!$(event.target).closest(".".concat(REVERT_BUTTON_CLASS)).length;
    var isExpandCommandCell = $target.hasClass(COMMAND_EXPAND_CLASS);
    if (!this._isEventInCurrentGrid(event)) {
      return;
    }
    if (!isRevertButton && (this._isCellValid($target, !isInteractiveElement) || isExpandCommandCell)) {
      $target = this._isInsideEditForm($target) ? $(event.target) : $target;
      this._focusView();
      $(focusedViewElement).removeClass(FOCUS_STATE_CLASS);
      if ($parent.hasClass(FREESPACE_ROW_CLASS)) {
        this._updateFocusedCellPosition($target);
        this._applyTabIndexToElement(this._focusedView.element());
        this._focusedView.focus(true);
      } else if (!this._isMasterDetailCell($target)) {
        this._clickTargetCellHandler(event, $target);
      } else {
        this._updateFocusedCellPosition($target);
      }
    } else if ($target.is('td')) {
      this._resetFocusedCell();
    }
  }
  _clickTargetCellHandler(event, $cell) {
    var columnIndex = this._rowsView.getCellIndex($cell);
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
      } else {
        $cell = this._getFocusedCell();
        var $target = event && $(event.target).closest("".concat(NON_FOCUSABLE_ELEMENTS_SELECTOR, ", td"));
        var skipFocusEvent = $target && $target.not($cell).is(NON_FOCUSABLE_ELEMENTS_SELECTOR);
        var isEditor = !!column && !column.command && $cell.hasClass(EDITOR_CELL_CLASS);
        var isDisabled = !isEditor && (!args.isHighlighted || skipFocusEvent);
        this._focus($cell, isDisabled, skipFocusEvent);
      }
    } else {
      this.setRowFocusType();
      this.setFocusedRowIndex(args.prevRowIndex);
      if (this._editingController.isEditing() && isCellEditMode) {
        this._closeEditCell();
      }
    }
  }
  _allowRowUpdating() {
    var rowIndex = this.getVisibleRowIndex();
    var row = this._dataController.items()[rowIndex];
    return this._editingController.allowUpdating({
      row
    }, 'click');
  }
  // #endregion Pointer_Event_Handler
  // #region Focusing
  focus(element) {
    var activeElementSelector;
    var focusedRowEnabled = this.option('focusedRowEnabled');
    var isHighlighted = this._isCellElement($(element));
    if (!element) {
      activeElementSelector = '.dx-datagrid-rowsview .dx-row[tabindex]';
      if (!focusedRowEnabled) {
        activeElementSelector += ', .dx-datagrid-rowsview .dx-row > td[tabindex]';
      }
      // @ts-expect-error
      element = this.component.$element().find(activeElementSelector).first();
    }
    element && this._focusElement($(element), isHighlighted);
  }
  getFocusedView() {
    return this._focusedView;
  }
  setupFocusedView() {
    if (this.isKeyboardEnabled() && !isDefined(this._focusedView)) {
      this._focusView();
    }
  }
  _focusElement($element, isHighlighted) {
    var rowsViewElement = $(this._getRowsViewElement());
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
      args = this._fireFocusChangingEvents(null, $element, true, isHighlighted);
      $element = args.$newCellElement;
      if (isRowFocusType && !args.isHighlighted) {
        this.setRowFocusType();
      }
    }
    if (!args.cancel) {
      this._focus($element, !args.isHighlighted);
      this._focusInteractiveElement($element);
    }
  }
  _getFocusedViewByElement($element) {
    var view = this.getFocusedView();
    var $view = view && $(view.element());
    return $element && $element.closest($view).length !== 0;
  }
  _focusView() {
    this._focusedView = this._rowsView;
  }
  _resetFocusedView() {
    this.setRowFocusType();
    this._focusedView = null;
  }
  _focusInteractiveElement($cell, isLast) {
    if (!$cell) return;
    var $focusedElement = this._getInteractiveElement($cell, isLast);
    gridCoreUtils.focusAndSelectElement(this, $focusedElement);
  }
  _focus($cell, disableFocus, skipFocusEvent) {
    var $row = $cell && !$cell.hasClass(ROW_CLASS) ? $cell.closest(".".concat(ROW_CLASS)) : $cell;
    if ($row && isNotFocusedRow($row)) {
      return;
    }
    var focusedView = this._focusedView;
    var $focusViewElement = focusedView && focusedView.element();
    var $focusElement;
    this._isHiddenFocus = disableFocus;
    var isRowFocus = isGroupRow($row) || isGroupFooterRow($row) || this.isRowFocusType();
    if (isRowFocus) {
      $focusElement = $row;
      if (focusedView) {
        this.setFocusedRowIndex(this._getRowIndex($row));
      }
    } else if (this._isCellElement($cell)) {
      $focusElement = $cell;
      this._updateFocusedCellPosition($cell);
    }
    if ($focusElement) {
      if ($focusViewElement) {
        $focusViewElement.find('.dx-row[tabindex], .dx-row > td[tabindex]').not($focusElement).removeClass(CELL_FOCUS_DISABLED_CLASS).removeClass(FOCUSED_CLASS).removeAttr('tabindex');
      }
      // @ts-expect-error
      eventsEngine.one($focusElement, 'blur', e => {
        if (e.relatedTarget) {
          $focusElement.removeClass(CELL_FOCUS_DISABLED_CLASS).removeClass(FOCUSED_CLASS);
        }
      });
      if (!skipFocusEvent) {
        this._applyTabIndexToElement($focusElement);
        // @ts-expect-error
        eventsEngine.trigger($focusElement, 'focus');
      }
      if (disableFocus) {
        $focusElement.addClass(CELL_FOCUS_DISABLED_CLASS);
        if (isRowFocus) {
          $cell.addClass(CELL_FOCUS_DISABLED_CLASS);
        }
      } else {
        this._editorFactory.focus($focusElement);
      }
    }
  }
  _updateFocus(isRenderView) {
    this._updateFocusTimeout = setTimeout(() => {
      if (this._needFocusEditingCell()) {
        this._editingController._focusEditingCell();
        return;
      }
      var $cell = this._getFocusedCell();
      var isEditing = this._editingController.isEditing();
      if (!this._isMasterDetailCell($cell) || this._isRowEditMode()) {
        if (this._hasSkipRow($cell.parent())) {
          var direction = this._focusedCellPosition && this._focusedCellPosition.rowIndex > 0 ? 'upArrow' : 'downArrow';
          $cell = this._getNextCell(direction);
        }
        if (isElementDefined($cell)) {
          if ($cell.is('td') || $cell.hasClass(this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS))) {
            var isCommandCell = $cell.is(COMMAND_CELL_SELECTOR);
            var $focusedElementInsideCell = $cell.find(':focus');
            var isFocusedElementDefined = isElementDefined($focusedElementInsideCell);
            if ((isRenderView || !isCommandCell) && this._editorFactory.focus()) {
              if (isCommandCell && isFocusedElementDefined) {
                gridCoreUtils.focusAndSelectElement(this, $focusedElementInsideCell);
                return;
              }
              !isFocusedElementDefined && this._focus($cell);
            } else if (!isFocusedElementDefined && (this._isNeedFocus || this._isHiddenFocus)) {
              this._focus($cell, this._isHiddenFocus);
            }
            if (isEditing) {
              this._focusInteractiveElement.bind(this)($cell);
            }
          } else {
            // @ts-expect-error
            eventsEngine.trigger($cell, 'focus');
          }
        }
      }
    });
  }
  _needFocusEditingCell() {
    var isCellEditMode = this._editingController.getEditMode() === EDIT_MODE_CELL;
    var isBatchEditMode = this._editingController.getEditMode() === EDIT_MODE_BATCH;
    var cellEditModeHasChanges = isCellEditMode && this._editingController.hasChanges();
    var isNewRowBatchEditMode = isBatchEditMode && this._editingController.isNewRowInEditMode();
    var $cell = this._getFocusedCell();
    return ($cell.children().length === 0 || $cell.find(FOCUSABLE_ELEMENT_SELECTOR).length > 0) && (cellEditModeHasChanges || isNewRowBatchEditMode);
  }
  _getFocusedCell() {
    return $(this._getCell(this._focusedCellPosition));
  }
  _updateFocusedCellPositionByTarget(target) {
    var _a;
    var elementType = this._getElementType(target);
    if (elementType === 'row' && isDefined((_a = this._focusedCellPosition) === null || _a === void 0 ? void 0 : _a.columnIndex)) {
      var $row = $(target);
      this._focusedView && isGroupRow($row) && this.setFocusedRowIndex(this._getRowIndex($row));
    } else {
      this._updateFocusedCellPosition(this._getCellElementFromTarget(target));
    }
  }
  _updateFocusedCellPosition($cell, direction) {
    var position = this._getCellPosition($cell, direction);
    if (position) {
      if (!$cell.length || position.rowIndex >= 0 && position.columnIndex >= 0) {
        this.setFocusedCellPosition(position.rowIndex, position.columnIndex);
      }
    }
    return position;
  }
  _getFocusedColumnIndexOffset(columnIndex) {
    var offset = 0;
    var column = this._columnsController.getVisibleColumns()[columnIndex];
    if (column && column.fixed) {
      offset = this._getFixedColumnIndexOffset(column);
    } else if (columnIndex >= 0) {
      offset = this._columnsController.getColumnIndexOffset();
    }
    return offset;
  }
  _getFixedColumnIndexOffset(column) {
    var offset = isFixedColumnIndexOffsetRequired(this, column) ? this._getVisibleColumnCount() - this._columnsController.getVisibleColumns().length : 0;
    return offset;
  }
  _getCellPosition($cell, direction) {
    var columnIndex;
    var $row = isElementDefined($cell) && $cell.closest('tr');
    if (isElementDefined($row)) {
      var rowIndex = this._getRowIndex($row);
      columnIndex = this._rowsView.getCellIndex($cell, rowIndex);
      columnIndex += this._getFocusedColumnIndexOffset(columnIndex);
      if (direction) {
        columnIndex = direction === 'previous' ? columnIndex - 1 : columnIndex + 1;
        columnIndex = this._applyColumnIndexBoundaries(columnIndex);
      }
      return {
        rowIndex,
        columnIndex
      };
    }
    return undefined;
  }
  _focusCell($cell, isDisabled) {
    if (this._isCellValid($cell)) {
      this._focus($cell, isDisabled);
      return true;
    }
    return undefined;
  }
  _focusEditFormCell($cell) {
    if ($cell.hasClass(MASTER_DETAIL_CELL_CLASS)) {
      this._editorFactory.focus($cell, true);
    }
  }
  _resetFocusedCell(preventScroll) {
    var _a;
    var $cell = this._getFocusedCell();
    isElementDefined($cell) && $cell.removeAttr('tabindex');
    this._isNeedFocus = false;
    this._isNeedScroll = false;
    this._focusedCellPosition = {};
    clearTimeout(this._updateFocusTimeout);
    (_a = this._focusedView) === null || _a === void 0 ? void 0 : _a.renderFocusState({
      preventScroll
    });
  }
  restoreFocusableElement(rowIndex, $event) {
    var that = this;
    var args;
    var $rowElement;
    var isUpArrow = isDefined(rowIndex);
    var $rowsViewElement = this._rowsView.element();
    var {
      columnIndex
    } = that._focusedCellPosition;
    var rowIndexOffset = that._dataController.getRowIndexOffset();
    rowIndex = isUpArrow ? rowIndex : this._rowsView.getTopVisibleItemIndex() + rowIndexOffset;
    if (!isUpArrow) {
      that._editorFactory.loseFocus();
      that._applyTabIndexToElement($rowsViewElement);
      // @ts-expect-error
      eventsEngine.trigger($rowsViewElement, 'focus');
    } else {
      $rowElement = this._rowsView.getRow(rowIndex - rowIndexOffset);
      args = that._fireFocusedRowChanging($event, $rowElement);
      if (!args.cancel && args.rowIndexChanged) {
        rowIndex = args.newRowIndex;
      }
    }
    if (!isUpArrow || !args.cancel) {
      that.setFocusedCellPosition(rowIndex, columnIndex);
    }
    isUpArrow && that._updateFocus();
  }
  // #endregion Focusing
  // #region Cell_Position
  _getNewPositionByCode(cellPosition, elementType, code) {
    var {
      columnIndex
    } = cellPosition;
    var {
      rowIndex
    } = cellPosition;
    var visibleColumnsCount;
    if (cellPosition.rowIndex === undefined && code === 'next') {
      return {
        columnIndex: 0,
        rowIndex: 0
      };
    }
    // eslint-disable-next-line default-case
    switch (code) {
      case 'nextInRow':
      case 'next':
        visibleColumnsCount = this._getVisibleColumnCount();
        if (columnIndex < visibleColumnsCount - 1 && elementType !== 'row' && this._hasValidCellAfterPosition({
          columnIndex,
          rowIndex
        })) {
          columnIndex++;
        } else if (!this._isLastRow(rowIndex) && code === 'next') {
          columnIndex = 0;
          rowIndex++;
        }
        break;
      case 'previousInRow':
      case 'previous':
        if (columnIndex > 0 && elementType !== 'row' && this._hasValidCellBeforePosition({
          columnIndex,
          rowIndex
        })) {
          columnIndex--;
        } else if (rowIndex > 0 && code === 'previous') {
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
    return {
      columnIndex,
      rowIndex
    };
  }
  setFocusedCellPosition(rowIndex, columnIndex) {
    this.setFocusedRowIndex(rowIndex);
    this.setFocusedColumnIndex(columnIndex);
  }
  setFocusedRowIndex(rowIndex) {
    if (!this._focusedCellPosition) {
      this._focusedCellPosition = {};
    }
    this._focusedCellPosition.rowIndex = rowIndex;
  }
  setFocusedColumnIndex(columnIndex) {
    if (!this._focusedCellPosition) {
      this._focusedCellPosition = {};
    }
    this._focusedCellPosition.columnIndex = columnIndex;
  }
  getRowIndex() {
    return this._focusedCellPosition ? this._focusedCellPosition.rowIndex : -1;
  }
  getColumnIndex() {
    return this._focusedCellPosition ? this._focusedCellPosition.columnIndex : -1;
  }
  getVisibleRowIndex() {
    var _a;
    var rowIndex = (_a = this._focusedCellPosition) === null || _a === void 0 ? void 0 : _a.rowIndex;
    return !isDefined(rowIndex) || rowIndex < 0 ? -1 : rowIndex - this._dataController.getRowIndexOffset();
  }
  getVisibleColumnIndex() {
    var _a;
    var columnIndex = (_a = this._focusedCellPosition) === null || _a === void 0 ? void 0 : _a.columnIndex;
    return !isDefined(columnIndex) ? -1 : columnIndex - this._columnsController.getColumnIndexOffset();
  }
  _applyColumnIndexBoundaries(columnIndex) {
    var visibleColumnsCount = this._getVisibleColumnCount();
    if (columnIndex < 0) {
      columnIndex = 0;
    } else if (columnIndex >= visibleColumnsCount) {
      columnIndex = visibleColumnsCount - 1;
    }
    return columnIndex;
  }
  _isCellByPositionValid(cellPosition) {
    var $cell = $(this._getCell(cellPosition));
    return this._isCellValid($cell);
  }
  _isLastRow(rowIndex) {
    var dataController = this._dataController;
    if (this._isVirtualRowRender()) {
      return rowIndex >= dataController.getMaxRowIndex();
    }
    var lastVisibleIndex = Math.max(...dataController.items().map((item, index) => item.visible !== false ? index : -1));
    return rowIndex === lastVisibleIndex;
  }
  _isFirstValidCell(cellPosition) {
    var isFirstValidCell = false;
    if (cellPosition.rowIndex === 0 && cellPosition.columnIndex >= 0) {
      isFirstValidCell = isFirstValidCell || !this._hasValidCellBeforePosition(cellPosition);
    }
    return isFirstValidCell;
  }
  _hasValidCellBeforePosition(cellPosition) {
    var {
      columnIndex
    } = cellPosition;
    var hasValidCells = false;
    while (columnIndex > 0 && !hasValidCells) {
      var checkingPosition = {
        columnIndex: --columnIndex,
        rowIndex: cellPosition.rowIndex
      };
      hasValidCells = this._isCellByPositionValid(checkingPosition);
    }
    return hasValidCells;
  }
  _hasValidCellAfterPosition(cellPosition) {
    var {
      columnIndex
    } = cellPosition;
    var hasValidCells = false;
    var visibleColumnCount = this._getVisibleColumnCount();
    while (columnIndex < visibleColumnCount - 1 && !hasValidCells) {
      var checkingPosition = {
        columnIndex: ++columnIndex,
        rowIndex: cellPosition.rowIndex
      };
      hasValidCells = this._isCellByPositionValid(checkingPosition);
    }
    return hasValidCells;
  }
  _isLastValidCell(cellPosition) {
    var nextColumnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex + 1 : 0;
    var {
      rowIndex
    } = cellPosition;
    var checkingPosition = {
      columnIndex: nextColumnIndex,
      rowIndex
    };
    var visibleRows = this._dataController.getVisibleRows();
    var row = visibleRows && visibleRows[rowIndex];
    var isLastRow = this._isLastRow(rowIndex);
    if (!isLastRow) {
      return false;
    }
    var isFullRowFocus = (row === null || row === void 0 ? void 0 : row.rowType) === 'group' || (row === null || row === void 0 ? void 0 : row.rowType) === 'groupFooter';
    if (isFullRowFocus && cellPosition.columnIndex > 0) {
      return true;
    }
    if (cellPosition.columnIndex === this._getVisibleColumnCount() - 1) {
      return true;
    }
    if (this._isCellByPositionValid(checkingPosition)) {
      return false;
    }
    return this._isLastValidCell(checkingPosition);
  }
  // #endregion Cell_Position
  // #region DOM_Manipulation
  _isCellValid($cell, isClick) {
    if (isElementDefined($cell)) {
      var $row = $cell.parent();
      var columnsController = this._columnsController;
      var columnIndex = this._rowsView.getCellIndex($cell) + columnsController.getColumnIndexOffset();
      var column = columnsController.getVisibleColumns(null, true)[columnIndex];
      var visibleColumnCount = this._getVisibleColumnCount();
      var editingController = this._editingController;
      var isMasterDetailRow = isDetailRow($row);
      var isShowWhenGrouped = column && column.showWhenGrouped;
      var isDataCell = column && !$cell.hasClass(COMMAND_EXPAND_CLASS) && isDataRow($row);
      var isValidGroupSpaceColumn = function isValidGroupSpaceColumn() {
        // eslint-disable-next-line radix
        return !isMasterDetailRow && column && (!isDefined(column.groupIndex) || isShowWhenGrouped && isDataCell) || parseInt($cell.attr('colspan'), 10) > 1;
      };
      var isDragCell = GridCoreKeyboardNavigationDom.isDragCell($cell);
      if (isDragCell) {
        return false;
      }
      if (this._isMasterDetailCell($cell)) {
        return true;
      }
      if (visibleColumnCount > columnIndex && isValidGroupSpaceColumn()) {
        var rowItems = this._dataController.items();
        var visibleRowIndex = this._rowsView.getRowIndex($row);
        var row = rowItems[visibleRowIndex];
        var isCellEditing = editingController && this._isCellEditMode() && editingController.isEditing();
        var isRowEditingInCurrentRow = editingController && editingController.isEditRow(visibleRowIndex);
        var isEditing = isRowEditingInCurrentRow || isCellEditing;
        if (column.command) {
          if (this._isLegacyNavigation()) {
            return !isEditing && column.command === 'expand';
          }
          if (isCellEditing) {
            return false;
          }
          if (isRowEditingInCurrentRow) {
            return column.command !== 'select';
          }
          return !isEditing;
        }
        if (isCellEditing && row && row.rowType !== 'data') {
          return false;
        }
        return !isEditing || column.allowEditing || isClick;
      }
    }
  }
  getFirstValidCellInRow($row, columnIndex) {
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
  }
  _getNextCell(keyCode, elementType, cellPosition) {
    var focusedCellPosition = cellPosition || this._focusedCellPosition;
    var isRowFocusType = this.isRowFocusType();
    var includeCommandCells = isRowFocusType || ['next', 'previous'].includes(keyCode);
    var $cell;
    var $row;
    if (this._focusedView && focusedCellPosition) {
      var newFocusedCellPosition = this._getNewPositionByCode(focusedCellPosition, elementType, keyCode);
      $cell = $(this._getCell(newFocusedCellPosition));
      var isLastCellOnDirection = keyCode === 'previous' ? this._isFirstValidCell(newFocusedCellPosition) : this._isLastValidCell(newFocusedCellPosition);
      if (isElementDefined($cell) && !this._isCellValid($cell) && this._isCellInRow(newFocusedCellPosition, includeCommandCells) && !isLastCellOnDirection) {
        if (isRowFocusType) {
          $cell = this.getFirstValidCellInRow($cell.parent(), newFocusedCellPosition.columnIndex);
        } else {
          $cell = this._getNextCell(keyCode, 'cell', newFocusedCellPosition);
        }
      }
      $row = isElementDefined($cell) && $cell.parent();
      if (this._hasSkipRow($row)) {
        var rowIndex = this._getRowIndex($row);
        if (!this._isLastRow(rowIndex)) {
          $cell = this._getNextCell(keyCode, 'row', {
            columnIndex: focusedCellPosition.columnIndex,
            rowIndex
          });
        } else {
          return null;
        }
      }
      return isElementDefined($cell) ? $cell : null;
    }
    return null;
  }
  // #endregion DOM_Manipulation
  // #region Editing
  _startEditing(eventArgs, fastEditingKey) {
    var focusedCellPosition = this._focusedCellPosition;
    var visibleRowIndex = this.getVisibleRowIndex();
    var visibleColumnIndex = this.getVisibleColumnIndex();
    var row = this._dataController.items()[visibleRowIndex];
    var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
    if (this._isAllowEditing(row, column)) {
      if (this._isRowEditMode()) {
        this._editingController.editRow(visibleRowIndex);
      } else if (focusedCellPosition) {
        this._startEditCell(eventArgs, fastEditingKey);
      }
    }
  }
  _isAllowEditing(row, column) {
    return this._editingController.allowUpdating({
      row
    }) && column && column.allowEditing;
  }
  _editFocusedCell() {
    var rowIndex = this.getVisibleRowIndex();
    var colIndex = this.getVisibleColumnIndex();
    return this._editingController.editCell(rowIndex, colIndex);
  }
  _startEditCell(eventArgs, fastEditingKey) {
    this._fastEditingStarted = isDefined(fastEditingKey);
    var editResult = this._editFocusedCell();
    var isEditResultDeferred = isDeferred(editResult);
    var isFastEditingStarted = this._isFastEditingStarted();
    if (!isFastEditingStarted || !isEditResultDeferred && !editResult) {
      return;
    }
    var editorValue = isEditResultDeferred && fastEditingKey === FAST_EDITING_DELETE_KEY ? '' : fastEditingKey;
    var editResultDeferred = isEditResultDeferred ? editResult : Deferred().resolve();
    var waitTemplatesDeferred = this._rowsView.waitAsyncTemplates(true);
    // NOTE T1158801: wait async templates before handle cell editing.
    when(editResultDeferred, waitTemplatesDeferred).done(() => {
      this._editingCellHandler(eventArgs, editorValue);
    });
  }
  _editingCellHandler(eventArgs, editorValue) {
    var _a, _b;
    var $input = this._getFocusedCell().find(INTERACTIVE_ELEMENTS_SELECTOR).eq(0);
    var $inputElement = $input.get(0);
    if (!$inputElement) {
      return;
    }
    var keyDownEvent = createEvent(eventArgs, {
      type: 'keydown',
      target: $inputElement
    });
    var keyPressEvent = createEvent(eventArgs, {
      type: 'keypress',
      target: $inputElement
    });
    var inputEvent = createEvent(eventArgs, {
      type: 'input',
      target: $inputElement
    });
    if (inputEvent.originalEvent) {
      inputEvent.originalEvent = createEvent(inputEvent.originalEvent, {
        data: editorValue
      }); // T1116105
    }

    (_b = (_a = $inputElement).select) === null || _b === void 0 ? void 0 : _b.call(_a);
    // @ts-expect-error
    eventsEngine.trigger($input, keyDownEvent);
    if (!keyDownEvent.isDefaultPrevented()) {
      // @ts-expect-error
      eventsEngine.trigger($input, keyPressEvent);
      if (!keyPressEvent.isDefaultPrevented()) {
        var timeout = browser.mozilla ? 25 : 0; // T882996
        setTimeout(() => {
          $input.val(editorValue);
          var $widgetContainer = $input.closest(".".concat(WIDGET_CLASS));
          // @ts-expect-error
          eventsEngine.off($widgetContainer, 'focusout'); // for NumberBox to save entered symbol
          // @ts-expect-error
          eventsEngine.one($widgetContainer, 'focusout', () => {
            // @ts-expect-error
            eventsEngine.trigger($input, 'change');
          });
          // @ts-expect-error
          eventsEngine.trigger($input, inputEvent);
        }, timeout);
      }
    }
  }
  // #endregion Editing
  // #region Events
  _fireFocusChangingEvents($event, $cell, fireRowEvent, isHighlighted) {
    var _a;
    var args = {};
    var cellPosition = (_a = this._getCellPosition($cell)) !== null && _a !== void 0 ? _a : {};
    if (this.isCellFocusType()) {
      args = this._fireFocusedCellChanging($event, $cell, isHighlighted);
      if (!args.cancel) {
        cellPosition.columnIndex = args.newColumnIndex;
        cellPosition.rowIndex = args.newRowIndex;
        isHighlighted = args.isHighlighted;
        $cell = $(this._getCell(cellPosition));
      }
    }
    if (!args.cancel && fireRowEvent && $cell) {
      args = this._fireFocusedRowChanging($event, $cell.parent());
      if (!args.cancel) {
        cellPosition.rowIndex = args.newRowIndex;
        args.isHighlighted = isHighlighted;
      }
    }
    args.$newCellElement = $(this._getCell(cellPosition));
    if (!args.$newCellElement.length) {
      args.$newCellElement = $cell;
    }
    return args;
  }
  _fireFocusedCellChanging($event, $cellElement, isHighlighted) {
    var prevColumnIndex = this.option('focusedColumnIndex');
    var prevRowIndex = this.option('focusedRowIndex');
    var cellPosition = this._getCellPosition($cellElement);
    var columnIndex = cellPosition ? cellPosition.columnIndex : -1;
    var rowIndex = cellPosition ? cellPosition.rowIndex : -1;
    var visibleRows = this._dataController.getVisibleRows();
    var visibleColumns = this._columnsController.getVisibleColumns();
    var args = {
      cellElement: $cellElement,
      prevColumnIndex,
      prevRowIndex,
      newColumnIndex: columnIndex,
      newRowIndex: rowIndex,
      rows: visibleRows,
      columns: visibleColumns,
      event: $event,
      isHighlighted: isHighlighted || false,
      cancel: false
    };
    this._canceledCellPosition = null;
    this.executeAction('onFocusedCellChanging', args);
    if (args.newColumnIndex !== columnIndex || args.newRowIndex !== rowIndex) {
      args.$newCellElement = $(this._getCell({
        columnIndex: args.newColumnIndex,
        rowIndex: args.newRowIndex
      }));
    }
    if (args.cancel) {
      this._canceledCellPosition = {
        rowIndex,
        columnIndex
      };
    }
    return args;
  }
  _fireFocusedCellChanged($cell) {
    var columnIndex = this._rowsView.getCellIndex($cell);
    var rowOptions = $cell === null || $cell === void 0 ? void 0 : $cell.parent().data('options');
    var focusedRowKey = rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.key;
    this._memoFireFocusedCellChanged(focusedRowKey, columnIndex);
  }
  _memoFireFocusedCellChanged(rowKey, columnIndex) {
    var $cell = this._getFocusedCell();
    var rowIndex = this._getRowIndex($cell === null || $cell === void 0 ? void 0 : $cell.parent());
    var localRowIndex = Math.min(rowIndex - this._dataController.getRowIndexOffset(), this._dataController.items().length - 1);
    var isEditingCell = this._editingController.isEditCell(localRowIndex, columnIndex);
    if (isEditingCell) {
      return;
    }
    var row = this._dataController.items()[localRowIndex];
    var column = this._columnsController.getVisibleColumns()[columnIndex];
    this.executeAction('onFocusedCellChanged', {
      cellElement: $cell ? getPublicElement($cell) : undefined,
      columnIndex,
      rowIndex,
      row: row,
      column
    });
  }
  _fireFocusedRowChanging(eventArgs, $newFocusedRow) {
    var newRowIndex = this._getRowIndex($newFocusedRow);
    var prevFocusedRowIndex = this.option('focusedRowIndex');
    var loadingOperationTypes = this._dataController.loadingOperationTypes();
    var args = {
      rowElement: $newFocusedRow,
      prevRowIndex: prevFocusedRowIndex,
      newRowIndex,
      event: eventArgs,
      rows: this._dataController.getVisibleRows(),
      cancel: false
    };
    if (!this._dataController || this._dataController.isLoading() && (loadingOperationTypes.reload || loadingOperationTypes.paging)) {
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
  }
  _fireFocusedRowChanged() {
    var _a;
    var focusedRowEnabled = this.option('focusedRowEnabled');
    var focusedRowKey = this.option('focusedRowKey');
    var focusedRowIndex = (_a = this._focusController) === null || _a === void 0 ? void 0 : _a.getFocusedRowIndexByKey(focusedRowKey);
    if (!focusedRowEnabled || isDefined(focusedRowKey) && focusedRowIndex < 0) {
      return;
    }
    this._memoFireFocusedRowChanged(focusedRowKey, focusedRowIndex);
  }
  _memoFireFocusedRowChanged(focusedRowKey, focusedRowIndex) {
    var localRowIndex = focusedRowIndex - this._dataController.getRowIndexOffset();
    this.executeAction('onFocusedRowChanged', {
      rowElement: focusedRowIndex < 0 ? undefined : this._rowsView.getRowElement(localRowIndex),
      rowIndex: focusedRowIndex,
      row: focusedRowIndex < 0 ? undefined : this._dataController.getVisibleRows()[localRowIndex]
    });
  }
  // #endregion Events
  _isEventInCurrentGrid(event) {
    return gridCoreUtils.isElementInCurrentGrid(this, $(event.target));
  }
  _isRowEditMode() {
    var editMode = this._editingController.getEditMode();
    return editMode === EDIT_MODE_ROW || editMode === EDIT_MODE_FORM;
  }
  _isCellEditMode() {
    var editMode = this._editingController.getEditMode();
    return editMode === EDIT_MODE_CELL || editMode === EDIT_MODE_BATCH;
  }
  _isFastEditingAllowed() {
    return this._isCellEditMode() && this.option('keyboardNavigation.editOnKeyPress');
  }
  _getInteractiveElement($cell, isLast) {
    var $focusedElement = $cell.find(INTERACTIVE_ELEMENTS_SELECTOR).filter(':visible');
    return isLast ? $focusedElement.last() : $focusedElement.first();
  }
  _applyTabIndexToElement($element) {
    var _a;
    var tabIndex = (_a = this.option('tabIndex')) !== null && _a !== void 0 ? _a : 0;
    $element.attr('tabindex', tabIndex);
  }
  _getCell(cellPosition) {
    if (this._focusedView && cellPosition) {
      var rowIndexOffset = this._dataController.getRowIndexOffset();
      var column = this._columnsController.getVisibleColumns(null, true)[cellPosition.columnIndex];
      var columnIndexOffset = column && column.fixed ? this._getFixedColumnIndexOffset(column) : this._columnsController.getColumnIndexOffset();
      var rowIndex = cellPosition.rowIndex >= 0 ? cellPosition.rowIndex - rowIndexOffset : -1;
      var columnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex - columnIndexOffset : -1;
      return this._focusedView.getCell({
        rowIndex,
        columnIndex
      });
    }
  }
  _getRowIndex($row) {
    var rowIndex = this._rowsView.getRowIndex($row);
    if (rowIndex >= 0) {
      rowIndex += this._dataController.getRowIndexOffset();
    }
    return rowIndex;
  }
  _hasSkipRow($row) {
    var row = $row && $row.get(0);
    return row && (row.style.display === 'none' || isDetailRow($row) && !$row.hasClass(this.addWidgetPrefix(EDIT_FORM_CLASS)));
  }
  _allowEditingOnEnterKey() {
    return this.option('keyboardNavigation.enterKeyAction') === 'startEdit';
  }
  _isLegacyNavigation() {
    return this.option('useLegacyKeyboardNavigation');
  }
  _getDirectionCodeByKey(key) {
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
  }
  _isVirtualScrolling() {
    var scrollingMode = this.option('scrolling.mode');
    return scrollingMode === 'virtual' || scrollingMode === 'infinite';
  }
  _isVirtualRowRender() {
    return this._isVirtualScrolling() || gridCoreUtils.isVirtualRowRendering(this);
  }
  _isVirtualColumnRender() {
    return this.option('scrolling.columnRenderingMode') === 'virtual';
  }
  _scrollBy(left, top, rowIndex, $event) {
    var that = this;
    var scrollable = this._rowsView.getScrollable();
    if (that._focusedCellPosition) {
      var scrollHandler = function scrollHandler() {
        scrollable.off('scroll', scrollHandler);
        setTimeout(that.restoreFocusableElement.bind(that, rowIndex, $event));
      };
      scrollable.on('scroll', scrollHandler);
    }
    return scrollable.scrollBy({
      left,
      top
    });
  }
  _isInsideEditForm(element) {
    var $editForm = $(element).closest(".".concat(this.addWidgetPrefix(EDIT_FORM_CLASS)));
    return $editForm.length && this.elementIsInsideGrid($editForm);
  }
  _isMasterDetailCell(element) {
    var $masterDetailCell = $(element).closest(".".concat(MASTER_DETAIL_CELL_CLASS));
    return $masterDetailCell.length && this.elementIsInsideGrid($masterDetailCell);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _processNextCellInMasterDetail($nextCell, _$cell) {
    if (!this._isInsideEditForm($nextCell) && $nextCell) {
      this._applyTabIndexToElement($nextCell);
    }
  }
  _handleTabKeyOnMasterDetailCell(target, direction) {
    if (this._isMasterDetailCell(target)) {
      this._updateFocusedCellPosition($(target), direction);
      var $nextCell = this._getNextCell(direction, 'row');
      this._processNextCellInMasterDetail($nextCell, $(target));
      return true;
    }
    return false;
  }
  _getElementType(target) {
    return $(target).is('tr') ? 'row' : 'cell';
  }
  _isFastEditingStarted() {
    return this._isFastEditingAllowed() && this._fastEditingStarted;
  }
  _getVisibleColumnCount() {
    return this._columnsController.getVisibleColumns(null, true).length;
  }
  _isCellInRow(cellPosition, includeCommandCells) {
    var {
      columnIndex
    } = cellPosition;
    var visibleColumnsCount = this._getVisibleColumnCount();
    return includeCommandCells ? columnIndex >= 0 && columnIndex <= visibleColumnsCount - 1 : columnIndex > 0 && columnIndex < visibleColumnsCount - 1;
  }
  _isCellElement($element) {
    return $element.length && $element[0].tagName === 'TD';
  }
  _getCellElementFromTarget(target) {
    var elementType = this._getElementType(target);
    var $targetElement = $(target);
    var $cell;
    if (elementType === 'cell') {
      $cell = $targetElement.closest(".".concat(ROW_CLASS, " > td"));
    } else {
      $cell = $targetElement.children().not(".".concat(COMMAND_EXPAND_CLASS)).first();
    }
    return $cell;
  }
  _getRowsViewElement() {
    var _a;
    return (_a = this._rowsView) === null || _a === void 0 ? void 0 : _a.element();
  }
  isKeyboardEnabled() {
    return this.option('keyboardNavigation.enabled');
  }
  _processCanceledEditCellPosition(rowIndex, columnIndex) {
    if (this._canceledCellPosition) {
      var isCanceled = this._canceledCellPosition.rowIndex === rowIndex && this._canceledCellPosition.columnIndex === columnIndex;
      this._canceledCellPosition = null;
      return isCanceled;
    }
    return undefined;
  }
  updateFocusedRowIndex() {
    var dataController = this._dataController;
    var visibleRowIndex = this.getVisibleRowIndex();
    var visibleItems = dataController.items();
    var lastVisibleIndex = visibleItems.length ? visibleItems.length - 1 : -1;
    var rowIndexOffset = dataController.getRowIndexOffset();
    if (lastVisibleIndex >= 0 && visibleRowIndex > lastVisibleIndex) {
      this.setFocusedRowIndex(lastVisibleIndex + rowIndexOffset);
    }
  }
}
export var keyboardNavigationModule = {
  defaultOptions() {
    return {
      useLegacyKeyboardNavigation: false,
      keyboardNavigation: {
        enabled: true,
        enterKeyAction: 'startEdit',
        enterKeyDirection: 'none',
        editOnKeyPress: false
      }
    };
  },
  controllers: {
    keyboardNavigation: KeyboardNavigationController
  },
  extenders: {
    views: {
      rowsView: {
        init() {
          this.callBase();
          this._keyboardController = this.getController('keyboardNavigation');
        },
        _rowClick(e) {
          var editRowIndex = this.getController('editing').getEditRowIndex();
          var isKeyboardEnabled = this._keyboardController.isKeyboardEnabled();
          if (editRowIndex === e.rowIndex) {
            this._keyboardController.setCellFocusType();
          }
          var needTriggerPointerEventHandler = (isMobile() || !isKeyboardEnabled) && this.option('focusedRowEnabled');
          if (needTriggerPointerEventHandler) {
            this._triggerPointerDownEventHandler(e, !isKeyboardEnabled);
          }
          this.callBase.apply(this, arguments);
        },
        _triggerPointerDownEventHandler(e, force) {
          var {
            originalEvent
          } = e.event;
          if (originalEvent) {
            var $cell = $(originalEvent.target);
            var columnIndex = this.getCellIndex($cell);
            var column = this.getController('columns').getVisibleColumns()[columnIndex];
            var row = this.getController('data').items()[e.rowIndex];
            if (this._keyboardController._isAllowEditing(row, column) || force) {
              var eventArgs = createEvent(originalEvent, {
                currentTarget: originalEvent.target
              });
              this._keyboardController._pointerEventHandler(eventArgs);
            }
          }
        },
        renderFocusState(params) {
          var {
            preventScroll,
            pageSizeChanged
          } = params !== null && params !== void 0 ? params : {};
          var $rowsViewElement = this.element();
          if ($rowsViewElement && !focused($rowsViewElement)) {
            $rowsViewElement.attr('tabindex', null);
          }
          pageSizeChanged && this._keyboardController.updateFocusedRowIndex();
          var rowIndex = this._keyboardController.getVisibleRowIndex();
          if (!isDefined(rowIndex) || rowIndex < 0) {
            rowIndex = 0;
          }
          var cellElements = this.getCellElements(rowIndex);
          if (this._keyboardController.isKeyboardEnabled() && (cellElements === null || cellElements === void 0 ? void 0 : cellElements.length)) {
            this.updateFocusElementTabIndex(cellElements, preventScroll);
          }
        },
        updateFocusElementTabIndex(cellElements) {
          var $row = cellElements.eq(0).parent();
          if (isGroupRow($row)) {
            this._keyboardController._applyTabIndexToElement($row);
          } else {
            var columnIndex = this._keyboardController.getColumnIndex();
            if (!isDefined(columnIndex) || columnIndex < 0) {
              columnIndex = 0;
            }
            this._updateFocusedCellTabIndex(cellElements, columnIndex);
          }
        },
        _updateFocusedCellTabIndex(cellElements, columnIndex) {
          var keyboardController = this._keyboardController;
          var cellElementsLength = cellElements ? cellElements.length : -1;
          var updateCellTabIndex = function updateCellTabIndex($cell) {
            var isMasterDetailCell = keyboardController._isMasterDetailCell($cell);
            var isValidCell = keyboardController._isCellValid($cell);
            if (!isMasterDetailCell && isValidCell && keyboardController._isCellElement($cell)) {
              keyboardController._applyTabIndexToElement($cell);
              keyboardController.setCellFocusType();
              return true;
            }
            return undefined;
          };
          var $cell = GridCoreKeyboardNavigationDom.getCellToFocus(cellElements, columnIndex);
          if ($cell.length) {
            updateCellTabIndex($cell);
          } else {
            if (cellElementsLength <= columnIndex) {
              columnIndex = cellElementsLength - 1;
            }
            for (var i = columnIndex; i < cellElementsLength; ++i) {
              if (updateCellTabIndex($(cellElements[i]))) {
                break;
              }
            }
          }
        },
        renderDelayedTemplates(change) {
          this.callBase.apply(this, arguments);
          this._renderFocusByChange(change);
        },
        _renderFocusByChange(change) {
          var {
            operationTypes,
            repaintChangesOnly
          } = change !== null && change !== void 0 ? change : {};
          var {
            fullReload,
            pageSize
          } = operationTypes !== null && operationTypes !== void 0 ? operationTypes : {};
          if (!change || !repaintChangesOnly || fullReload || pageSize) {
            var preventScroll = shouldPreventScroll(this);
            this.renderFocusState({
              preventScroll,
              pageSizeChanged: pageSize
            });
          }
        },
        _renderCore(change) {
          var deferred = this.callBase.apply(this, arguments);
          this._renderFocusByChange(change);
          return deferred;
        },
        _editCellPrepared($cell) {
          var _a;
          var editorInstance = this._getEditorInstance($cell);
          var isEditingNavigationMode = (_a = this._keyboardController) === null || _a === void 0 ? void 0 : _a._isFastEditingStarted();
          if (editorInstance && isEditingNavigationMode) {
            this._handleEditingNavigationMode(editorInstance);
          }
          this.callBase.apply(this, arguments);
        },
        _handleEditingNavigationMode(editorInstance) {
          ['downArrow', 'upArrow'].forEach(keyName => {
            var originalKeyHandler = editorInstance._supportedKeys()[keyName];
            editorInstance.registerKeyHandler(keyName, e => {
              var isDropDownOpened = editorInstance._input().attr('aria-expanded') === 'true';
              if (isDropDownOpened) {
                return originalKeyHandler && originalKeyHandler.call(editorInstance, e);
              }
            });
          });
          editorInstance.registerKeyHandler('leftArrow', noop);
          editorInstance.registerKeyHandler('rightArrow', noop);
          var isDateBoxWithMask = editorInstance.NAME === DATEBOX_WIDGET_NAME && editorInstance.option('useMaskBehavior');
          if (isDateBoxWithMask) {
            editorInstance.registerKeyHandler('enter', noop);
          }
        },
        _getEditorInstance($cell) {
          var $editor = $cell.find('.dx-texteditor').eq(0);
          return gridCoreUtils.getWidgetInstance($editor);
        }
      }
    },
    controllers: {
      editing: {
        editCell(rowIndex, columnIndex) {
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
        editRow(rowIndex) {
          var keyboardController = this.getController('keyboardNavigation');
          var visibleColumnIndex = keyboardController.getVisibleColumnIndex();
          var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
          if (column && column.type || this.option('editing.mode') === EDIT_MODE_FORM) {
            keyboardController._resetFocusedCell();
          }
          this.callBase(rowIndex);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        addRow(parentKey) {
          var keyboardController = this.getController('keyboardNavigation');
          keyboardController.setupFocusedView();
          keyboardController.setCellFocusType();
          return this.callBase.apply(this, arguments);
        },
        getFocusedCellInRow(rowIndex) {
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
        _processCanceledEditingCell() {
          this.closeEditCell().done(() => {
            var keyboardNavigation = this.getController('keyboardNavigation');
            keyboardNavigation._updateFocus();
          });
        },
        init() {
          this.callBase();
          this._keyboardNavigationController = this.getController('keyboardNavigation');
        },
        closeEditCell() {
          var keyboardNavigation = this._keyboardNavigationController;
          keyboardNavigation._fastEditingStarted = false;
          var result = this.callBase.apply(this, arguments);
          keyboardNavigation._updateFocus();
          return result;
        },
        _delayedInputFocus() {
          this._keyboardNavigationController._isNeedScroll = true;
          this.callBase.apply(this, arguments);
        },
        _isEditingStart() {
          var keyboardNavigation = this.getController('keyboardNavigation');
          var cancel = this.callBase.apply(this, arguments);
          if (cancel && !keyboardNavigation._isNeedFocus) {
            var $cell = keyboardNavigation._getFocusedCell();
            keyboardNavigation._focus($cell, true);
          }
          return cancel;
        }
      },
      data: {
        _correctRowIndices(getRowIndexCorrection) {
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
        getMaxRowIndex() {
          var result = this.items().length - 1;
          var virtualItemsCount = this.virtualItemsCount();
          if (virtualItemsCount) {
            var rowIndexOffset = this.getRowIndexOffset();
            result += rowIndexOffset + virtualItemsCount.end;
          }
          return result;
        }
      },
      adaptiveColumns: {
        _showHiddenCellsInView(_ref) {
          var {
            viewName,
            $cells,
            isCommandColumn
          } = _ref;
          this.callBase.apply(this, arguments);
          viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && $cells.each((_, cellElement) => {
            var $cell = $(cellElement);
            isCellInHeaderRow($cell) && $cell.attr('tabindex', 0);
          });
        },
        _hideVisibleCellInView(_ref2) {
          var {
            viewName,
            $cell,
            isCommandColumn
          } = _ref2;
          this.callBase.apply(this, arguments);
          if (viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && isCellInHeaderRow($cell)) {
            $cell.removeAttr('tabindex');
          }
        }
      },
      keyboardNavigation: keyboardNavigationScrollableA11yExtender
    }
  }
};