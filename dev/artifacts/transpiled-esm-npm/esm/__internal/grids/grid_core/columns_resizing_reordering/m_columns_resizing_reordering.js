/* eslint-disable max-classes-per-file */
import fx from '../../../../animation/fx';
import domAdapter from '../../../../core/dom_adapter';
import $ from '../../../../core/renderer';
import Callbacks from '../../../../core/utils/callbacks';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { getBoundingRect } from '../../../../core/utils/position';
import { getHeight, getWidth, setHeight, setWidth } from '../../../../core/utils/size';
import { isDefined, isObject, isString } from '../../../../core/utils/type';
import eventsEngine from '../../../../events/core/events_engine';
import { end as dragEventEnd, move as dragEventMove, start as dragEventStart } from '../../../../events/drag';
import pointerEvents from '../../../../events/pointer';
import { addNamespace, eventData as getEventData, isTouchEvent } from '../../../../events/utils/index';
import swatchContainer from '../../../../ui/widget/swatch_container';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
var COLUMNS_SEPARATOR_CLASS = 'columns-separator';
var COLUMNS_SEPARATOR_TRANSPARENT = 'columns-separator-transparent';
var DRAGGING_HEADER_CLASS = 'drag-header';
var CELL_CONTENT_CLASS = 'text-content';
var HEADERS_DRAG_ACTION_CLASS = 'drag-action';
var TRACKER_CLASS = 'tracker';
var HEADERS_DROP_HIGHLIGHT_CLASS = 'drop-highlight';
var BLOCK_SEPARATOR_CLASS = 'dx-block-separator';
var HEADER_ROW_CLASS = 'dx-header-row';
var WIDGET_CLASS = 'dx-widget';
var DRAGGING_COMMAND_CELL_CLASS = 'dx-drag-command-cell';
var MODULE_NAMESPACE = 'dxDataGridResizingReordering';
var COLUMNS_SEPARATOR_TOUCH_TRACKER_WIDTH = 10;
var DRAGGING_DELTA = 5;
var COLUMN_OPACITY = 0.5;
var allowResizing = function allowResizing(that) {
  return that.option('allowColumnResizing') || that.getController('columns').isColumnOptionUsed('allowResizing');
};
var allowReordering = function allowReordering(that) {
  return that.option('allowColumnReordering') || that.getController('columns').isColumnOptionUsed('allowReordering');
};
class TrackerView extends modules.View {
  _renderCore() {
    var deferred = super._renderCore();
    this.element().addClass(this.addWidgetPrefix(TRACKER_CLASS));
    this.hide();
    return deferred;
  }
  _unsubscribeFromCallback() {
    if (this._positionChanged) {
      this._tablePositionController.positionChanged.remove(this._positionChanged);
    }
  }
  _subscribeToCallback() {
    var that = this;
    that._positionChanged = function (position) {
      var $element = that.element();
      if ($element && $element.hasClass(that.addWidgetPrefix(TRACKER_CLASS))) {
        $element.css({
          top: position.top
        });
        setHeight($element, position.height);
      }
    };
    this._tablePositionController.positionChanged.add(that._positionChanged);
  }
  optionChanged(args) {
    if (args.name === 'allowColumnResizing') {
      this._unsubscribeFromCallback();
      if (args.value) {
        this._subscribeToCallback();
        this._invalidate();
      }
    }
    super.optionChanged(args);
  }
  init() {
    super.init();
    this._tablePositionController = this.getController('tablePosition');
    this._subscribeToCallback();
  }
  isVisible() {
    return allowResizing(this);
  }
  show() {
    this.element().show();
  }
  hide() {
    this.element() && this.element().hide();
  }
  setHeight(value) {
    setHeight(this.element(), value);
  }
  dispose() {
    this._unsubscribeFromCallback();
    super.dispose();
  }
}
class SeparatorView extends modules.View {
  _renderSeparator() {}
  _renderCore(options) {
    // @ts-expect-error
    var deferred = super._renderCore(options);
    this._isShown = true;
    this._renderSeparator();
    this.hide();
    return deferred;
  }
  show() {
    this._isShown = true;
  }
  hide() {
    this._isShown = false;
  }
  height(value) {
    var $element = this.element();
    if ($element) {
      if (isDefined(value)) {
        setHeight($element, value);
      } else {
        return getHeight($element);
      }
    }
  }
  width(value) {
    var $element = this.element();
    if ($element) {
      if (isDefined(value)) {
        setWidth($element, value);
      } else {
        return getWidth($element);
      }
    }
  }
}
class ColumnsSeparatorView extends SeparatorView {
  /// #ENDDEBUG
  _renderSeparator() {
    super._renderSeparator();
    var $element = this.element();
    $element.addClass(this.addWidgetPrefix(COLUMNS_SEPARATOR_CLASS));
  }
  _subscribeToCallback() {
    var that = this;
    var $element;
    that._positionChanged = function (position) {
      $element = that.element();
      if ($element) {
        $element.css({
          top: position.top
        });
        setHeight($element, position.height);
      }
    };
    that._tablePositionController.positionChanged.add(that._positionChanged);
  }
  _unsubscribeFromCallback() {
    this._positionChanged && this._tablePositionController.positionChanged.remove(this._positionChanged);
  }
  _init() {
    this._isTransparent = allowResizing(this);
    if (this.isVisible()) {
      this._subscribeToCallback();
    }
  }
  isVisible() {
    return this.option('showColumnHeaders') && (allowReordering(this) || allowResizing(this));
  }
  optionChanged(args) {
    if (args.name === 'allowColumnResizing') {
      if (args.value) {
        this._init();
        this._invalidate();
        this.hide(true);
      } else {
        this._unsubscribeFromCallback();
        this._isTransparent = allowResizing(this);
        this.hide(true);
      }
    }
    super.optionChanged(args);
  }
  init() {
    super.init();
    this._tablePositionController = this.getController('tablePosition');
    this._init();
  }
  show() {
    var that = this;
    var $element = this.element();
    if ($element && !that._isShown) {
      if (that._isTransparent) {
        $element.removeClass(that.addWidgetPrefix(COLUMNS_SEPARATOR_TRANSPARENT));
      } else {
        $element.show();
      }
    }
    super.show();
  }
  hide(force) {
    var $element = this.element();
    var columnsSeparatorTransparent = this.addWidgetPrefix(COLUMNS_SEPARATOR_TRANSPARENT);
    if ($element && (this._isShown || force)) {
      if (this._isTransparent) {
        $element.addClass(columnsSeparatorTransparent);
        $element.css('left', '');
        $element.show();
      } else {
        if ($element.hasClass(columnsSeparatorTransparent)) {
          $element.removeClass(columnsSeparatorTransparent);
        }
        $element.hide();
      }
    }
    super.hide();
  }
  moveByX(outerX) {
    var $element = this.element();
    if ($element) {
      $element.css('left', outerX === null ? 0 : outerX - this._parentElement().offset().left);
    }
  }
  changeCursor(cursorName) {
    cursorName = isDefined(cursorName) ? cursorName : '';
    var $element = this.element();
    if ($element) {
      $element.css('cursor', cursorName);
    }
  }
  dispose() {
    this._unsubscribeFromCallback();
    super.dispose();
  }
}
class BlockSeparatorView extends SeparatorView {
  init() {
    var that = this;
    super.init();
    this.getController('data').loadingChanged.add(isLoading => {
      if (!isLoading) {
        that.hide();
      }
    });
  }
  _renderSeparator() {
    super._renderSeparator();
    this.element().addClass(BLOCK_SEPARATOR_CLASS).html('&nbsp;');
  }
  hide() {
    var that = this;
    var $parent = this._parentElement();
    var $element = this.element();
    if ($element && this._isShown) {
      $element.css('display', 'none');
    }
    if ($parent && !$parent.children(".".concat(BLOCK_SEPARATOR_CLASS)).length) {
      $parent.prepend(that.element());
    }
    super.hide();
  }
  isVisible() {
    var groupPanelOptions = this.option('groupPanel');
    var columnChooserOptions = this.option('columnChooser');
    return groupPanelOptions && groupPanelOptions.visible || columnChooserOptions && columnChooserOptions.enabled;
  }
  show(targetLocation) {
    var that = this;
    var $element = this.element();
    var startAnimate = function startAnimate(toOptions) {
      fx.stop($element, true);
      fx.animate($element, {
        type: 'slide',
        from: {
          width: 0,
          display: toOptions.display
        },
        to: toOptions,
        duration: 300,
        easing: 'swing'
      });
    };
    if ($element && !that._isShown) {
      switch (targetLocation) {
        case 'group':
          startAnimate({
            width: '50px',
            display: 'inline-block'
          });
          break;
        case 'columnChooser':
          startAnimate({
            width: '100%',
            display: 'block'
          });
          break;
        default:
          $element.css('display', '');
      }
    }
    super.show();
  }
}
class DraggingHeaderView extends modules.View {
  /// #ENDDEBUG
  isDragging() {
    return this._isDragging;
  }
  _getDraggingPanelByPos(pos) {
    var that = this;
    var result;
    each(that._dragOptions.draggingPanels, (index, draggingPanel) => {
      if (draggingPanel) {
        var boundingRect = draggingPanel.getBoundingRect();
        if (boundingRect && (boundingRect.bottom === undefined || pos.y < boundingRect.bottom) && (boundingRect.top === undefined || pos.y > boundingRect.top) && (boundingRect.left === undefined || pos.x > boundingRect.left) && (boundingRect.right === undefined || pos.x < boundingRect.right)) {
          result = draggingPanel;
          return false;
        }
      }
      return undefined;
    });
    return result;
  }
  _renderCore() {
    this.element().addClass("".concat(this.addWidgetPrefix(DRAGGING_HEADER_CLASS), " ").concat(this.addWidgetPrefix(CELL_CONTENT_CLASS), " ").concat(WIDGET_CLASS)).hide();
  }
  _resetTargetColumnOptions() {
    var params = this._dropOptions;
    params.targetColumnIndex = -1;
    delete params.targetColumnElement;
    delete params.isLast;
    delete params.posX;
    delete params.posY;
  }
  _getVisibleIndexObject(rowIndex, visibleIndex) {
    if (isDefined(rowIndex)) {
      return {
        columnIndex: visibleIndex,
        rowIndex
      };
    }
    return visibleIndex;
  }
  dispose() {
    var element = this.element();
    this._dragOptions = null;
    element && element.parent().find(".".concat(this.addWidgetPrefix(DRAGGING_HEADER_CLASS))).remove();
  }
  isVisible() {
    var columnsController = this.getController('columns');
    var commonColumnSettings = columnsController.getCommonSettings();
    return this.option('showColumnHeaders') && (allowReordering(this) || commonColumnSettings.allowGrouping || commonColumnSettings.allowHiding);
  }
  init() {
    var that = this;
    super.init();
    this._controller = this.getController('draggingHeader');
    this._columnsResizerViewController = this.getController('columnsResizer');
    this._isDragging = false;
    this.getController('data').loadingChanged.add(isLoading => {
      var element = that.element();
      if (!isLoading && element) {
        element.hide();
      }
    });
  }
  dragHeader(options) {
    var that = this;
    var {
      columnElement
    } = options;
    var isCommandColumn = !!options.sourceColumn.type;
    that._isDragging = true;
    that._dragOptions = options;
    that._dropOptions = {
      sourceIndex: options.index,
      sourceColumnIndex: that._getVisibleIndexObject(options.rowIndex, options.columnIndex),
      sourceColumnElement: options.columnElement,
      sourceLocation: options.sourceLocation
    };
    var document = domAdapter.getDocument();
    // eslint-disable-next-line spellcheck/spell-checker
    that._onSelectStart = document.onselectstart;
    // eslint-disable-next-line spellcheck/spell-checker
    document.onselectstart = function () {
      return false;
    };
    that._controller.drag(that._dropOptions);
    that.element().css({
      textAlign: columnElement && columnElement.css('textAlign'),
      height: columnElement && (isCommandColumn && columnElement.get(0).clientHeight || getHeight(columnElement)),
      width: columnElement && (isCommandColumn && columnElement.get(0).clientWidth || getWidth(columnElement)),
      whiteSpace: columnElement && columnElement.css('whiteSpace')
    }).addClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS)).toggleClass(DRAGGING_COMMAND_CELL_CLASS, isCommandColumn).text(isCommandColumn ? '' : options.sourceColumn.caption);
    that.element().appendTo(swatchContainer.getSwatchContainer(columnElement));
  }
  moveHeader(args) {
    var e = args.event;
    var {
      that
    } = e.data;
    var eventData = getEventData(e);
    var isResizing = that._columnsResizerViewController ? that._columnsResizerViewController.isResizing() : false;
    var dragOptions = that._dragOptions;
    if (that._isDragging && !isResizing) {
      var $element = that.element();
      var moveDeltaX = Math.abs(eventData.x - dragOptions.columnElement.offset().left - dragOptions.deltaX);
      var moveDeltaY = Math.abs(eventData.y - dragOptions.columnElement.offset().top - dragOptions.deltaY);
      if ($element.is(':visible') || moveDeltaX > DRAGGING_DELTA || moveDeltaY > DRAGGING_DELTA) {
        $element.show();
        var newLeft = eventData.x - dragOptions.deltaX;
        var newTop = eventData.y - dragOptions.deltaY;
        $element.css({
          left: newLeft,
          top: newTop
        });
        that.dockHeader(eventData);
      }
      e.preventDefault();
    }
  }
  dockHeader(eventData) {
    var that = this;
    var targetDraggingPanel = that._getDraggingPanelByPos(eventData);
    var controller = that._controller;
    var params = that._dropOptions;
    var dragOptions = that._dragOptions;
    if (targetDraggingPanel) {
      var rtlEnabled = that.option('rtlEnabled');
      var isVerticalOrientation = targetDraggingPanel.getName() === 'columnChooser';
      var axisName = isVerticalOrientation ? 'y' : 'x';
      var targetLocation = targetDraggingPanel.getName();
      var rowIndex = targetLocation === 'headers' ? dragOptions.rowIndex : undefined;
      var {
        sourceColumn
      } = dragOptions;
      var columnElements = targetDraggingPanel.getColumnElements(rowIndex, sourceColumn === null || sourceColumn === void 0 ? void 0 : sourceColumn.ownerBand) || [];
      var pointsByTarget = dragOptions.pointsByTarget = dragOptions.pointsByTarget || {};
      var pointsByColumns = targetLocation === 'columnChooser' ? [] : pointsByTarget[targetLocation] || controller._generatePointsByColumns(extend({}, dragOptions, {
        targetDraggingPanel,
        columns: targetDraggingPanel.getColumns(rowIndex),
        columnElements,
        isVerticalOrientation,
        startColumnIndex: targetLocation === 'headers' && $(columnElements[0]).index()
      }));
      pointsByTarget[targetLocation] = pointsByColumns;
      params.targetLocation = targetLocation;
      if (pointsByColumns.length > 0) {
        for (var i = 0; i < pointsByColumns.length; i++) {
          var centerPosition = pointsByColumns[i + 1] && (pointsByColumns[i][axisName] + pointsByColumns[i + 1][axisName]) / 2;
          if (centerPosition === undefined || (rtlEnabled && axisName === 'x' ? eventData[axisName] > centerPosition : eventData[axisName] < centerPosition)) {
            params.targetColumnIndex = that._getVisibleIndexObject(rowIndex, pointsByColumns[i].columnIndex);
            if (columnElements[i]) {
              params.targetColumnElement = columnElements.eq(i);
              params.isLast = false;
            } else {
              params.targetColumnElement = columnElements.last();
              params.isLast = true;
            }
            params.posX = pointsByColumns[i].x;
            params.posY = pointsByColumns[i].y;
            controller.dock(params);
            break;
          }
        }
      } else {
        that._resetTargetColumnOptions();
        controller.dock(params);
      }
    }
  }
  dropHeader(args) {
    var e = args.event;
    var {
      that
    } = e.data;
    var controller = that._controller;
    that.element().hide();
    if (controller && that._isDragging) {
      controller.drop(that._dropOptions);
    }
    that.element().appendTo(that._parentElement());
    that._dragOptions = null;
    that._dropOptions = null;
    that._isDragging = false;
    // eslint-disable-next-line spellcheck/spell-checker
    domAdapter.getDocument().onselectstart = that._onSelectStart || null;
  }
}
var isNextColumnResizingMode = function isNextColumnResizingMode(that) {
  return that.option('columnResizingMode') !== 'widget';
};
class ColumnsResizerViewController extends modules.ViewController {
  _isHeadersRowArea(posY) {
    if (this._columnHeadersView) {
      var element = this._columnHeadersView.element();
      if (element) {
        var offsetTop = element.offset().top;
        var headersRowHeight = this._columnHeadersView.getHeadersRowHeight();
        return posY >= offsetTop && posY <= offsetTop + headersRowHeight;
      }
    }
    return false;
  }
  _isRtlParentStyle() {
    var _a;
    return this.option('rtlEnabled') && ((_a = this._$parentContainer) === null || _a === void 0 ? void 0 : _a.parent().css('direction')) === 'rtl';
  }
  _pointCreated(point, cellsLength, columns) {
    var isNextColumnMode = isNextColumnResizingMode(this);
    var rtlEnabled = this.option('rtlEnabled');
    var isRtlParentStyle = this._isRtlParentStyle();
    var firstPointColumnIndex = !isNextColumnMode && rtlEnabled && !isRtlParentStyle ? 0 : 1;
    if (point.index >= firstPointColumnIndex && point.index < cellsLength + (!isNextColumnMode && (!rtlEnabled || isRtlParentStyle) ? 1 : 0)) {
      point.columnIndex -= firstPointColumnIndex;
      var currentColumn = columns[point.columnIndex] || {};
      var nextColumn = columns[point.columnIndex + 1] || {};
      return !(isNextColumnMode ? currentColumn.allowResizing && nextColumn.allowResizing : currentColumn.allowResizing);
    }
    return true;
  }
  _getTargetPoint(pointsByColumns, currentX, deltaX) {
    if (pointsByColumns) {
      for (var i = 0; i < pointsByColumns.length; i++) {
        if (pointsByColumns[i].x === pointsByColumns[0].x && pointsByColumns[i + 1] && pointsByColumns[i].x === pointsByColumns[i + 1].x) {
          continue;
        }
        if (pointsByColumns[i].x - deltaX <= currentX && currentX <= pointsByColumns[i].x + deltaX) {
          return pointsByColumns[i];
        }
      }
    }
    return null;
  }
  _moveSeparator(args) {
    var _a;
    var e = args.event;
    var that = e.data;
    var columnsSeparatorWidth = that._columnsSeparatorView.width();
    var isNextColumnMode = isNextColumnResizingMode(that);
    var deltaX = columnsSeparatorWidth / 2;
    var parentOffset = that._$parentContainer.offset();
    var parentOffsetLeft = parentOffset.left;
    var eventData = getEventData(e);
    var rtlEnabled = that.option('rtlEnabled');
    var isRtlParentStyle = this._isRtlParentStyle();
    var isDragging = (_a = that._draggingHeaderView) === null || _a === void 0 ? void 0 : _a.isDragging();
    if (that._isResizing && that._resizingInfo) {
      if ((parentOffsetLeft <= eventData.x || !isNextColumnMode && isRtlParentStyle) && (!isNextColumnMode || eventData.x <= parentOffsetLeft + getWidth(that._$parentContainer))) {
        if (that._updateColumnsWidthIfNeeded(eventData.x)) {
          var $cell = that._columnHeadersView.getColumnElements().eq(that._resizingInfo.currentColumnIndex);
          var cell = $cell[0];
          if (cell) {
            var outerWidth = cell.getBoundingClientRect().width;
            that._columnsSeparatorView.moveByX($cell.offset().left + ((isNextColumnMode || isRtlParentStyle) && rtlEnabled ? 0 : outerWidth));
            that._tablePositionController.update(that._targetPoint.y);
            e.preventDefault();
          }
        }
      }
    } else if (!isDragging) {
      if (that._isHeadersRowArea(eventData.y)) {
        if (that._previousParentOffset) {
          if (that._previousParentOffset.left !== parentOffset.left || that._previousParentOffset.top !== parentOffset.top) {
            that.pointsByColumns(null);
          }
        }
        that._targetPoint = that._getTargetPoint(that.pointsByColumns(), eventData.x, columnsSeparatorWidth);
        that._previousParentOffset = parentOffset;
        that._isReadyResizing = false;
        if (that._targetPoint) {
          that._columnsSeparatorView.changeCursor('col-resize');
          that._columnsSeparatorView.moveByX(that._targetPoint.x - deltaX);
          that._tablePositionController.update(that._targetPoint.y);
          that._isReadyResizing = true;
          e.preventDefault();
        } else {
          that._columnsSeparatorView.changeCursor();
          that._columnsSeparatorView.moveByX(null);
        }
      } else {
        that.pointsByColumns(null);
        that._isReadyResizing = false;
        that._columnsSeparatorView.changeCursor();
        that._columnsSeparatorView.moveByX(null);
      }
    }
  }
  _endResizing(args) {
    var e = args.event;
    var that = e.data;
    if (that._isResizing) {
      that.pointsByColumns(null);
      that._resizingInfo = null;
      that._columnsSeparatorView.hide();
      that._columnsSeparatorView.changeCursor();
      that._trackerView.hide();
      that._isReadyResizing = false;
      that._isResizing = false;
    }
  }
  _getNextColumnIndex(currentColumnIndex) {
    return currentColumnIndex + 1;
  }
  _setupResizingInfo(posX) {
    var that = this;
    var currentColumnIndex = that._targetPoint.columnIndex;
    var nextColumnIndex = that._getNextColumnIndex(currentColumnIndex);
    var currentHeader = that._columnHeadersView.getHeaderElement(currentColumnIndex);
    var nextHeader = that._columnHeadersView.getHeaderElement(nextColumnIndex);
    that._resizingInfo = {
      startPosX: posX,
      currentColumnIndex,
      currentColumnWidth: currentHeader && currentHeader.length > 0 ? getBoundingRect(currentHeader[0]).width : 0,
      nextColumnIndex,
      nextColumnWidth: nextHeader && nextHeader.length > 0 ? getBoundingRect(nextHeader[0]).width : 0
    };
  }
  _startResizing(args) {
    var e = args.event;
    var that = e.data;
    var eventData = getEventData(e);
    if (isTouchEvent(e)) {
      if (that._isHeadersRowArea(eventData.y)) {
        that._targetPoint = that._getTargetPoint(that.pointsByColumns(), eventData.x, COLUMNS_SEPARATOR_TOUCH_TRACKER_WIDTH);
        if (that._targetPoint) {
          that._columnsSeparatorView.moveByX(that._targetPoint.x - that._columnsSeparatorView.width() / 2);
          that._isReadyResizing = true;
        }
      } else {
        that._isReadyResizing = false;
      }
    }
    if (that._isReadyResizing) {
      that._setupResizingInfo(eventData.x);
      that._isResizing = true;
      that._tablePositionController.update(that._targetPoint.y);
      that._columnsSeparatorView.show();
      that._trackerView.show();
      var scrollable = that.component.getScrollable();
      if (scrollable && that._isRtlParentStyle()) {
        that._scrollRight = getWidth(scrollable.$content()) - getWidth(scrollable.container()) - scrollable.scrollLeft();
      }
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.isResizing()) {
      this.getController('editorFactory').loseFocus();
    }
  }
  _generatePointsByColumns() {
    var that = this;
    var columns = that._columnsController ? that._columnsController.getVisibleColumns() : [];
    var cells = that._columnHeadersView.getColumnElements();
    var pointsByColumns = [];
    if (cells && cells.length > 0) {
      pointsByColumns = gridCoreUtils.getPointsByColumns(cells, point => that._pointCreated(point, cells.length, columns));
    }
    that._pointsByColumns = pointsByColumns;
  }
  _unsubscribeFromEvents() {
    this._moveSeparatorHandler && eventsEngine.off(domAdapter.getDocument(), addNamespace(pointerEvents.move, MODULE_NAMESPACE), this._moveSeparatorHandler);
    this._startResizingHandler && eventsEngine.off(this._$parentContainer, addNamespace(pointerEvents.down, MODULE_NAMESPACE), this._startResizingHandler);
    if (this._endResizingHandler) {
      eventsEngine.off(this._columnsSeparatorView.element(), addNamespace(pointerEvents.up, MODULE_NAMESPACE), this._endResizingHandler);
      eventsEngine.off(domAdapter.getDocument(), addNamespace(pointerEvents.up, MODULE_NAMESPACE), this._endResizingHandler);
    }
  }
  _subscribeToEvents() {
    this._moveSeparatorHandler = this.createAction(this._moveSeparator);
    this._startResizingHandler = this.createAction(this._startResizing);
    this._endResizingHandler = this.createAction(this._endResizing);
    eventsEngine.on(domAdapter.getDocument(), addNamespace(pointerEvents.move, MODULE_NAMESPACE), this, this._moveSeparatorHandler);
    eventsEngine.on(this._$parentContainer, addNamespace(pointerEvents.down, MODULE_NAMESPACE), this, this._startResizingHandler);
    eventsEngine.on(this._columnsSeparatorView.element(), addNamespace(pointerEvents.up, MODULE_NAMESPACE), this, this._endResizingHandler);
    eventsEngine.on(domAdapter.getDocument(), addNamespace(pointerEvents.up, MODULE_NAMESPACE), this, this._endResizingHandler);
  }
  _updateColumnsWidthIfNeeded(posX) {
    var deltaX;
    var needUpdate = false;
    var contentWidth = this._rowsView.contentWidth();
    var resizingInfo = this._resizingInfo;
    var columnsController = this._columnsController;
    var visibleColumns = columnsController.getVisibleColumns();
    var columnsSeparatorWidth = this._columnsSeparatorView.width();
    var isNextColumnMode = isNextColumnResizingMode(this);
    var adaptColumnWidthByRatio = isNextColumnMode && this.option('adaptColumnWidthByRatio') && !this.option('columnAutoWidth');
    var rtlEnabled = this.option('rtlEnabled');
    var isRtlParentStyle = this._isRtlParentStyle();
    var column = visibleColumns[resizingInfo.currentColumnIndex];
    var nextColumn = visibleColumns[resizingInfo.nextColumnIndex];
    function isPercentWidth(width) {
      return isString(width) && width.endsWith('%');
    }
    function setColumnWidth(column, columnWidth, contentWidth, adaptColumnWidthByRatio) {
      if (column) {
        var oldColumnWidth = column.width;
        if (oldColumnWidth) {
          adaptColumnWidthByRatio = isPercentWidth(oldColumnWidth);
        }
        if (adaptColumnWidthByRatio) {
          columnsController.columnOption(column.index, 'visibleWidth', columnWidth);
          columnsController.columnOption(column.index, 'width', "".concat((columnWidth / contentWidth * 100).toFixed(3), "%"));
        } else {
          columnsController.columnOption(column.index, 'visibleWidth', null);
          columnsController.columnOption(column.index, 'width', columnWidth);
        }
      }
    }
    function correctContentWidth(contentWidth, visibleColumns) {
      var allColumnsHaveWidth = visibleColumns.every(column => column.width);
      if (allColumnsHaveWidth) {
        var totalPercent = visibleColumns.reduce((sum, column) => {
          if (isPercentWidth(column.width)) {
            sum += parseFloat(column.width);
          }
          return sum;
        }, 0);
        if (totalPercent > 100) {
          contentWidth = contentWidth / totalPercent * 100;
        }
      }
      return contentWidth;
    }
    function calculateCellWidths(delta) {
      var nextMinWidth;
      var nextCellWidth;
      var needCorrectionNextCellWidth;
      var cellWidth = resizingInfo.currentColumnWidth + delta;
      var minWidth = column && column.minWidth || columnsSeparatorWidth;
      var result = {};
      if (cellWidth >= minWidth) {
        result.cellWidth = cellWidth;
      } else {
        result.cellWidth = minWidth;
        needCorrectionNextCellWidth = true;
      }
      if (isNextColumnMode) {
        nextCellWidth = resizingInfo.nextColumnWidth - delta;
        nextMinWidth = nextColumn && nextColumn.minWidth || columnsSeparatorWidth;
        if (nextCellWidth >= nextMinWidth) {
          if (needCorrectionNextCellWidth) {
            result.nextCellWidth = resizingInfo.nextColumnWidth - (delta + minWidth - cellWidth);
          } else {
            result.nextCellWidth = nextCellWidth;
          }
        } else {
          result.nextCellWidth = nextMinWidth;
          result.cellWidth = resizingInfo.currentColumnWidth + (delta - nextMinWidth + nextCellWidth);
        }
      }
      return result;
    }
    deltaX = posX - resizingInfo.startPosX;
    if ((isNextColumnMode || isRtlParentStyle) && rtlEnabled) {
      deltaX = -deltaX;
    }
    var {
      cellWidth,
      nextCellWidth
    } = calculateCellWidths(deltaX);
    needUpdate = column.width !== cellWidth;
    if (needUpdate) {
      columnsController.beginUpdate();
      cellWidth = Math.floor(cellWidth);
      contentWidth = correctContentWidth(contentWidth, visibleColumns);
      setColumnWidth(column, cellWidth, contentWidth, adaptColumnWidthByRatio);
      if (isNextColumnMode) {
        nextCellWidth = Math.floor(nextCellWidth);
        setColumnWidth(nextColumn, nextCellWidth, contentWidth, adaptColumnWidthByRatio);
      } else {
        var columnWidths = this._columnHeadersView.getColumnWidths();
        columnWidths[resizingInfo.currentColumnIndex] = cellWidth;
        var hasScroll = columnWidths.reduce((totalWidth, width) => totalWidth + width, 0) > this._rowsView.contentWidth();
        if (!hasScroll) {
          var lastColumnIndex = gridCoreUtils.getLastResizableColumnIndex(visibleColumns);
          if (lastColumnIndex >= 0) {
            columnsController.columnOption(visibleColumns[lastColumnIndex].index, 'visibleWidth', 'auto');
          }
        }
        for (var i = 0; i < columnWidths.length; i++) {
          if (visibleColumns[i] && visibleColumns[i] !== column && visibleColumns[i].width === undefined) {
            columnsController.columnOption(visibleColumns[i].index, 'width', columnWidths[i]);
          }
        }
      }
      columnsController.endUpdate();
      if (!isNextColumnMode) {
        this.component.updateDimensions();
        var scrollable = this.component.getScrollable();
        if (scrollable && isRtlParentStyle) {
          var left = getWidth(scrollable.$content()) - getWidth(scrollable.container()) - this._scrollRight;
          scrollable.scrollTo({
            left
          });
        }
      }
    }
    return needUpdate;
  }
  _subscribeToCallback(callback, handler) {
    callback.add(handler);
    this._subscribesToCallbacks.push({
      callback,
      handler
    });
  }
  _unsubscribeFromCallbacks() {
    for (var i = 0; i < this._subscribesToCallbacks.length; i++) {
      var subscribe = this._subscribesToCallbacks[i];
      subscribe.callback.remove(subscribe.handler);
    }
    this._subscribesToCallbacks = [];
  }
  _unsubscribes() {
    this._unsubscribeFromEvents();
    this._unsubscribeFromCallbacks();
  }
  _init() {
    var that = this;
    var generatePointsByColumnsHandler = function generatePointsByColumnsHandler() {
      if (!that._isResizing) {
        that.pointsByColumns(null);
      }
    };
    var generatePointsByColumnsScrollHandler = function generatePointsByColumnsScrollHandler(offset) {
      if (that._scrollLeft !== offset.left) {
        that._scrollLeft = offset.left;
        that.pointsByColumns(null);
      }
    };
    // @ts-expect-error
    that._columnsSeparatorView = that.getView('columnsSeparatorView');
    // @ts-expect-error
    that._columnHeadersView = that.getView('columnHeadersView');
    // @ts-expect-error
    that._trackerView = that.getView('trackerView');
    that._rowsView = that.getView('rowsView');
    that._columnsController = that.getController('columns');
    // @ts-expect-error
    that._tablePositionController = that.getController('tablePosition');
    that._$parentContainer = that.component.$element();
    // @ts-expect-error
    that._draggingHeaderView = that.component.getView('draggingHeaderView');
    that._subscribeToCallback(that._columnHeadersView.renderCompleted, generatePointsByColumnsHandler);
    that._subscribeToCallback(that._columnHeadersView.resizeCompleted, generatePointsByColumnsHandler);
    that._subscribeToCallback(that._columnsSeparatorView.renderCompleted, () => {
      that._unsubscribeFromEvents();
      that._subscribeToEvents();
    });
    that._subscribeToCallback(that._rowsView.renderCompleted, () => {
      that._rowsView.scrollChanged.remove(generatePointsByColumnsScrollHandler);
      that._rowsView.scrollChanged.add(generatePointsByColumnsScrollHandler);
    });
    var previousScrollbarVisibility = that._rowsView.getScrollbarWidth() !== 0;
    var previousTableHeight = 0;
    // @ts-expect-error
    that._subscribeToCallback(that.getController('tablePosition').positionChanged, e => {
      if (that._isResizing && !that._rowsView.isResizing) {
        var scrollbarVisibility = that._rowsView.getScrollbarWidth() !== 0;
        if (previousScrollbarVisibility !== scrollbarVisibility || previousTableHeight && previousTableHeight !== e.height) {
          previousScrollbarVisibility = scrollbarVisibility;
          previousTableHeight = e.height;
          that.component.updateDimensions();
        } else {
          that._rowsView.updateFreeSpaceRowHeight();
        }
      }
      previousTableHeight = e.height;
    });
  }
  optionChanged(args) {
    super.optionChanged(args);
    if (args.name === 'allowColumnResizing') {
      if (args.value) {
        this._init();
        this._subscribeToEvents();
      } else {
        this._unsubscribes();
      }
    }
  }
  isResizing() {
    return this._isResizing;
  }
  init() {
    this._subscribesToCallbacks = [];
    if (allowResizing(this)) {
      this._init();
    }
  }
  pointsByColumns(value) {
    if (value !== undefined) {
      this._pointsByColumns = value;
    } else {
      if (!this._pointsByColumns) {
        this._generatePointsByColumns();
      }
      return this._pointsByColumns;
    }
  }
  dispose() {
    this._unsubscribes();
    super.dispose();
  }
}
class TablePositionViewController extends modules.ViewController {
  constructor(component) {
    super(component);
    this.positionChanged = Callbacks();
  }
  update(top) {
    var that = this;
    var params = {};
    var $element = that._columnHeadersView.element();
    var offset = $element && $element.offset();
    var offsetTop = offset && offset.top || 0;
    var diffOffsetTop = isDefined(top) ? Math.abs(top - offsetTop) : 0;
    var columnsHeadersHeight = that._columnHeadersView ? that._columnHeadersView.getHeight() : 0;
    var scrollBarWidth = that._rowsView.getScrollbarWidth(true);
    var rowsHeight = that._rowsView ? that._rowsView.height() - scrollBarWidth : 0;
    var columnsResizerController = that.component.getController('columnsResizer');
    // @ts-expect-error
    var draggingHeaderView = that.component.getView('draggingHeaderView');
    params.height = columnsHeadersHeight;
    var isDraggingOrResizing = columnsResizerController.isResizing() || draggingHeaderView.isDragging();
    if (isDraggingOrResizing) {
      params.height += rowsHeight - diffOffsetTop;
    }
    if (top !== null && $element && $element.length) {
      params.top = $element[0].offsetTop + diffOffsetTop;
    }
    that.positionChanged.fire(params);
  }
  init() {
    var that = this;
    super.init();
    // @ts-expect-error
    that._columnHeadersView = this.getView('columnHeadersView');
    that._rowsView = this.getView('rowsView');
    // @ts-expect-error
    that._pagerView = this.getView('pagerView');
    that._rowsView.resizeCompleted.add(() => {
      if (that.option('allowColumnResizing')) {
        var targetPoint = that.getController('columnsResizer')._targetPoint;
        that.update(targetPoint ? targetPoint.y : null);
      }
    });
  }
}
class DraggingHeaderViewController extends modules.ViewController {
  _generatePointsByColumns(options) {
    var that = this;
    this.isCustomGroupColumnPosition = this.checkIsCustomGroupColumnPosition(options);
    return gridCoreUtils.getPointsByColumns(options.columnElements, point => that._pointCreated(point, options.columns, options.targetDraggingPanel.getName(), options.sourceColumn), options.isVerticalOrientation, options.startColumnIndex);
  }
  checkIsCustomGroupColumnPosition(options) {
    var wasOnlyCommandColumns = true;
    for (var i = 0; i < options.columns.length; i += 1) {
      var col = options.columns[i];
      if (col.command === 'expand' && !wasOnlyCommandColumns) {
        return true;
      }
      if (!col.command) {
        wasOnlyCommandColumns = false;
      }
    }
    return false;
  }
  _pointCreated(point, columns, location, sourceColumn) {
    var _a;
    var targetColumn = columns[point.columnIndex];
    var prevColumn = columns[point.columnIndex - 1];
    var isColumnAfterExpandColumn = (prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.command) === 'expand';
    var isFirstExpandColumn = (targetColumn === null || targetColumn === void 0 ? void 0 : targetColumn.command) === 'expand' && (prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.command) !== 'expand';
    var sourceColumnReorderingDisabled = sourceColumn && !sourceColumn.allowReordering;
    var otherColumnReorderingDisabled = !(targetColumn === null || targetColumn === void 0 ? void 0 : targetColumn.allowReordering) && !(prevColumn === null || prevColumn === void 0 ? void 0 : prevColumn.allowReordering);
    switch (location) {
      case 'columnChooser':
        return true;
      case 'headers':
        if (!isFirstExpandColumn) {
          return isColumnAfterExpandColumn || sourceColumnReorderingDisabled || otherColumnReorderingDisabled;
        }
        if (this.isCustomGroupColumnPosition) {
          return false;
        }
        while (((_a = columns[point.columnIndex]) === null || _a === void 0 ? void 0 : _a.command) === 'expand') {
          point.columnIndex += 1;
        }
        return false;
      default:
        return columns.length === 0;
    }
  }
  _subscribeToEvents(draggingHeader, draggingPanels) {
    var that = this;
    each(draggingPanels, (_, draggingPanel) => {
      if (draggingPanel) {
        var columns;
        var rowCount = draggingPanel.getRowCount ? draggingPanel.getRowCount() : 1;
        var nameDraggingPanel = draggingPanel.getName();
        var subscribeToEvents = function subscribeToEvents(index, columnElement) {
          if (!columnElement) {
            return;
          }
          var $columnElement = $(columnElement);
          var column = columns[index];
          if (column && draggingPanel.allowDragging(column)) {
            $columnElement.addClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS));
            eventsEngine.on($columnElement, addNamespace(dragEventStart, MODULE_NAMESPACE), that.createAction(args => {
              var e = args.event;
              var eventData = getEventData(e);
              draggingHeader.dragHeader({
                // @ts-expect-error
                deltaX: eventData.x - $(e.currentTarget).offset().left,
                // @ts-expect-error
                deltaY: eventData.y - $(e.currentTarget).offset().top,
                sourceColumn: column,
                index: column.index,
                columnIndex: index,
                columnElement: $columnElement,
                sourceLocation: nameDraggingPanel,
                draggingPanels,
                rowIndex: that._columnsController.getRowIndex(column.index, true)
              });
            }));
            eventsEngine.on($columnElement, addNamespace(dragEventMove, MODULE_NAMESPACE), {
              that: draggingHeader
            }, that.createAction(draggingHeader.moveHeader));
            eventsEngine.on($columnElement, addNamespace(dragEventEnd, MODULE_NAMESPACE), {
              that: draggingHeader
            }, that.createAction(draggingHeader.dropHeader));
          }
        };
        for (var i = 0; i < rowCount; i++) {
          var columnElements = draggingPanel.getColumnElements(i) || [];
          if (columnElements.length) {
            columns = draggingPanel.getColumns(i) || [];
            each(columnElements, subscribeToEvents);
          }
        }
      }
    });
  }
  _unsubscribeFromEvents(draggingHeader, draggingPanels) {
    var that = this;
    each(draggingPanels, (_, draggingPanel) => {
      if (draggingPanel) {
        var columnElements = draggingPanel.getColumnElements() || [];
        each(columnElements, (index, columnElement) => {
          var $columnElement = $(columnElement);
          // @ts-expect-error
          eventsEngine.off($columnElement, addNamespace(dragEventStart, MODULE_NAMESPACE));
          // @ts-expect-error
          eventsEngine.off($columnElement, addNamespace(dragEventMove, MODULE_NAMESPACE));
          // @ts-expect-error
          eventsEngine.off($columnElement, addNamespace(dragEventEnd, MODULE_NAMESPACE));
          $columnElement.removeClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS));
        });
      }
    });
  }
  _getSeparator(targetLocation) {
    return targetLocation === 'headers' ? this._columnsSeparatorView : this._blockSeparatorView;
  }
  hideSeparators(type) {
    var blockSeparator = this._blockSeparatorView;
    var columnsSeparator = this._columnsSeparatorView;
    this._animationColumnIndex = undefined;
    blockSeparator && blockSeparator.hide();
    type !== 'block' && columnsSeparator && columnsSeparator.hide();
  }
  init() {
    var that = this;
    super.init();
    that._columnsController = that.getController('columns');
    // @ts-expect-error
    that._columnHeadersView = that.getView('columnHeadersView');
    // @ts-expect-error
    that._columnsSeparatorView = that.getView('columnsSeparatorView');
    // @ts-expect-error
    that._draggingHeaderView = that.getView('draggingHeaderView');
    that._rowsView = that.getView('rowsView');
    // @ts-expect-error
    that._blockSeparatorView = that.getView('blockSeparatorView');
    that._headerPanelView = that.getView('headerPanel');
    that._columnChooserView = that.getView('columnChooserView');
    var subscribeToEvents = function subscribeToEvents() {
      if (that._draggingHeaderView) {
        var draggingPanels = [that._columnChooserView, that._columnHeadersView, that._headerPanelView];
        that._unsubscribeFromEvents(that._draggingHeaderView, draggingPanels);
        that._subscribeToEvents(that._draggingHeaderView, draggingPanels);
      }
    };
    that._columnHeadersView.renderCompleted.add(subscribeToEvents);
    that._headerPanelView && that._headerPanelView.renderCompleted.add(subscribeToEvents);
    that._columnChooserView && that._columnChooserView.renderCompleted.add(subscribeToEvents);
  }
  allowDrop(parameters) {
    return this._columnsController.allowMoveColumn(parameters.sourceColumnIndex, parameters.targetColumnIndex, parameters.sourceLocation, parameters.targetLocation);
  }
  drag(parameters) {
    var {
      sourceIndex
    } = parameters;
    var {
      sourceLocation
    } = parameters;
    var {
      sourceColumnElement
    } = parameters;
    var headersView = this._columnHeadersView;
    var rowsView = this._rowsView;
    if (sourceColumnElement) {
      sourceColumnElement.css({
        opacity: COLUMN_OPACITY
      });
      if (sourceLocation === 'headers') {
        headersView && headersView.setRowsOpacity(sourceIndex, COLUMN_OPACITY);
        rowsView && rowsView.setRowsOpacity(sourceIndex, COLUMN_OPACITY);
      }
    }
  }
  dock(parameters) {
    var that = this;
    var targetColumnIndex = isObject(parameters.targetColumnIndex) ? parameters.targetColumnIndex.columnIndex : parameters.targetColumnIndex;
    var {
      sourceLocation
    } = parameters;
    var {
      targetLocation
    } = parameters;
    var separator = that._getSeparator(targetLocation);
    var hasTargetVisibleIndex = targetColumnIndex >= 0;
    var showSeparator = function showSeparator() {
      if (that._animationColumnIndex !== targetColumnIndex) {
        that.hideSeparators();
        separator.element()[parameters.isLast ? 'insertAfter' : 'insertBefore'](parameters.targetColumnElement);
        that._animationColumnIndex = targetColumnIndex;
        separator.show(targetLocation);
      }
    };
    that._columnHeadersView.element().find(".".concat(HEADER_ROW_CLASS)).toggleClass(that.addWidgetPrefix(HEADERS_DROP_HIGHLIGHT_CLASS), sourceLocation !== 'headers' && targetLocation === 'headers' && !hasTargetVisibleIndex);
    if (separator) {
      if (that.allowDrop(parameters) && hasTargetVisibleIndex) {
        if (targetLocation === 'group' || targetLocation === 'columnChooser') {
          showSeparator();
        } else {
          that.hideSeparators('block');
          // @ts-expect-error
          that.getController('tablePosition').update(parameters.posY);
          separator.moveByX(parameters.posX - separator.width());
          separator.show();
        }
      } else {
        that.hideSeparators();
      }
    }
  }
  drop(parameters) {
    var {
      sourceColumnElement
    } = parameters;
    if (sourceColumnElement) {
      sourceColumnElement.css({
        opacity: ''
      });
      this._columnHeadersView.setRowsOpacity(parameters.sourceIndex, '');
      this._rowsView.setRowsOpacity(parameters.sourceIndex, '');
      this._columnHeadersView.element().find(".".concat(HEADER_ROW_CLASS)).removeClass(this.addWidgetPrefix(HEADERS_DROP_HIGHLIGHT_CLASS));
    }
    if (this.allowDrop(parameters)) {
      var separator = this._getSeparator(parameters.targetLocation);
      if (separator) {
        separator.hide();
      }
      this._columnsController.moveColumn(parameters.sourceColumnIndex, parameters.targetColumnIndex, parameters.sourceLocation, parameters.targetLocation);
    }
  }
  dispose() {
    if (this._draggingHeaderView) {
      this._unsubscribeFromEvents(this._draggingHeaderView, [this._columnChooserView, this._columnHeadersView, this._headerPanelView]);
    }
  }
}
export var columnsResizingReorderingModule = {
  views: {
    columnsSeparatorView: ColumnsSeparatorView,
    blockSeparatorView: BlockSeparatorView,
    draggingHeaderView: DraggingHeaderView,
    trackerView: TrackerView
  },
  controllers: {
    draggingHeader: DraggingHeaderViewController,
    tablePosition: TablePositionViewController,
    columnsResizer: ColumnsResizerViewController
  },
  extenders: {
    views: {
      rowsView: {
        _needUpdateRowHeight(itemCount) {
          var wordWrapEnabled = this.option('wordWrapEnabled');
          var columnsResizerController = this.getController('columnsResizer');
          var isResizing = columnsResizerController.isResizing();
          return this.callBase.apply(this, arguments) || itemCount > 0 && wordWrapEnabled && isResizing;
        }
      }
    },
    controllers: {
      editorFactory: {
        renderFocusOverlay() {
          if (this.getController('columnsResizer').isResizing()) {
            return;
          }
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
};