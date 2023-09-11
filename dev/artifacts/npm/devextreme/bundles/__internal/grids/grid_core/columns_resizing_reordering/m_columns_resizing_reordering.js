/**
* DevExtreme (bundles/__internal/grids/grid_core/columns_resizing_reordering/m_columns_resizing_reordering.js)
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
exports.columnsResizingReorderingModule = void 0;
var _fx = _interopRequireDefault(require("../../../../animation/fx"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _drag = require("../../../../events/drag");
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _index = require("../../../../events/utils/index");
var _swatch_container = _interopRequireDefault(require("../../../../ui/widget/swatch_container"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* eslint-disable max-classes-per-file */
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
var TrackerView = /*#__PURE__*/function (_modules$View) {
  _inheritsLoose(TrackerView, _modules$View);
  function TrackerView() {
    return _modules$View.apply(this, arguments) || this;
  }
  var _proto = TrackerView.prototype;
  _proto._renderCore = function _renderCore() {
    var deferred = _modules$View.prototype._renderCore.call(this);
    this.element().addClass(this.addWidgetPrefix(TRACKER_CLASS));
    this.hide();
    return deferred;
  };
  _proto._unsubscribeFromCallback = function _unsubscribeFromCallback() {
    if (this._positionChanged) {
      this._tablePositionController.positionChanged.remove(this._positionChanged);
    }
  };
  _proto._subscribeToCallback = function _subscribeToCallback() {
    var that = this;
    that._positionChanged = function (position) {
      var $element = that.element();
      if ($element && $element.hasClass(that.addWidgetPrefix(TRACKER_CLASS))) {
        $element.css({
          top: position.top
        });
        (0, _size.setHeight)($element, position.height);
      }
    };
    this._tablePositionController.positionChanged.add(that._positionChanged);
  };
  _proto.optionChanged = function optionChanged(args) {
    if (args.name === 'allowColumnResizing') {
      this._unsubscribeFromCallback();
      if (args.value) {
        this._subscribeToCallback();
        this._invalidate();
      }
    }
    _modules$View.prototype.optionChanged.call(this, args);
  };
  _proto.init = function init() {
    _modules$View.prototype.init.call(this);
    this._tablePositionController = this.getController('tablePosition');
    this._subscribeToCallback();
  };
  _proto.isVisible = function isVisible() {
    return allowResizing(this);
  };
  _proto.show = function show() {
    this.element().show();
  };
  _proto.hide = function hide() {
    this.element() && this.element().hide();
  };
  _proto.setHeight = function setHeight(value) {
    (0, _size.setHeight)(this.element(), value);
  };
  _proto.dispose = function dispose() {
    this._unsubscribeFromCallback();
    _modules$View.prototype.dispose.call(this);
  };
  return TrackerView;
}(_m_modules.default.View);
var SeparatorView = /*#__PURE__*/function (_modules$View2) {
  _inheritsLoose(SeparatorView, _modules$View2);
  function SeparatorView() {
    return _modules$View2.apply(this, arguments) || this;
  }
  var _proto2 = SeparatorView.prototype;
  _proto2._renderSeparator = function _renderSeparator() {};
  _proto2._renderCore = function _renderCore(options) {
    // @ts-expect-error
    var deferred = _modules$View2.prototype._renderCore.call(this, options);
    this._isShown = true;
    this._renderSeparator();
    this.hide();
    return deferred;
  };
  _proto2.show = function show() {
    this._isShown = true;
  };
  _proto2.hide = function hide() {
    this._isShown = false;
  };
  _proto2.height = function height(value) {
    var $element = this.element();
    if ($element) {
      if ((0, _type.isDefined)(value)) {
        (0, _size.setHeight)($element, value);
      } else {
        return (0, _size.getHeight)($element);
      }
    }
  };
  _proto2.width = function width(value) {
    var $element = this.element();
    if ($element) {
      if ((0, _type.isDefined)(value)) {
        (0, _size.setWidth)($element, value);
      } else {
        return (0, _size.getWidth)($element);
      }
    }
  };
  return SeparatorView;
}(_m_modules.default.View);
var ColumnsSeparatorView = /*#__PURE__*/function (_SeparatorView) {
  _inheritsLoose(ColumnsSeparatorView, _SeparatorView);
  function ColumnsSeparatorView() {
    return _SeparatorView.apply(this, arguments) || this;
  }
  var _proto3 = ColumnsSeparatorView.prototype;
  /// #ENDDEBUG
  _proto3._renderSeparator = function _renderSeparator() {
    _SeparatorView.prototype._renderSeparator.call(this);
    var $element = this.element();
    $element.addClass(this.addWidgetPrefix(COLUMNS_SEPARATOR_CLASS));
  };
  _proto3._subscribeToCallback = function _subscribeToCallback() {
    var that = this;
    var $element;
    that._positionChanged = function (position) {
      $element = that.element();
      if ($element) {
        $element.css({
          top: position.top
        });
        (0, _size.setHeight)($element, position.height);
      }
    };
    that._tablePositionController.positionChanged.add(that._positionChanged);
  };
  _proto3._unsubscribeFromCallback = function _unsubscribeFromCallback() {
    this._positionChanged && this._tablePositionController.positionChanged.remove(this._positionChanged);
  };
  _proto3._init = function _init() {
    this._isTransparent = allowResizing(this);
    if (this.isVisible()) {
      this._subscribeToCallback();
    }
  };
  _proto3.isVisible = function isVisible() {
    return this.option('showColumnHeaders') && (allowReordering(this) || allowResizing(this));
  };
  _proto3.optionChanged = function optionChanged(args) {
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
    _SeparatorView.prototype.optionChanged.call(this, args);
  };
  _proto3.init = function init() {
    _SeparatorView.prototype.init.call(this);
    this._tablePositionController = this.getController('tablePosition');
    this._init();
  };
  _proto3.show = function show() {
    var that = this;
    var $element = this.element();
    if ($element && !that._isShown) {
      if (that._isTransparent) {
        $element.removeClass(that.addWidgetPrefix(COLUMNS_SEPARATOR_TRANSPARENT));
      } else {
        $element.show();
      }
    }
    _SeparatorView.prototype.show.call(this);
  };
  _proto3.hide = function hide(force) {
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
    _SeparatorView.prototype.hide.call(this);
  };
  _proto3.moveByX = function moveByX(outerX) {
    var $element = this.element();
    if ($element) {
      $element.css('left', outerX === null ? 0 : outerX - this._parentElement().offset().left);
    }
  };
  _proto3.changeCursor = function changeCursor(cursorName) {
    cursorName = (0, _type.isDefined)(cursorName) ? cursorName : '';
    var $element = this.element();
    if ($element) {
      $element.css('cursor', cursorName);
    }
  };
  _proto3.dispose = function dispose() {
    this._unsubscribeFromCallback();
    _SeparatorView.prototype.dispose.call(this);
  };
  return ColumnsSeparatorView;
}(SeparatorView);
var BlockSeparatorView = /*#__PURE__*/function (_SeparatorView2) {
  _inheritsLoose(BlockSeparatorView, _SeparatorView2);
  function BlockSeparatorView() {
    return _SeparatorView2.apply(this, arguments) || this;
  }
  var _proto4 = BlockSeparatorView.prototype;
  _proto4.init = function init() {
    var that = this;
    _SeparatorView2.prototype.init.call(this);
    this.getController('data').loadingChanged.add(function (isLoading) {
      if (!isLoading) {
        that.hide();
      }
    });
  };
  _proto4._renderSeparator = function _renderSeparator() {
    _SeparatorView2.prototype._renderSeparator.call(this);
    this.element().addClass(BLOCK_SEPARATOR_CLASS).html('&nbsp;');
  };
  _proto4.hide = function hide() {
    var that = this;
    var $parent = this._parentElement();
    var $element = this.element();
    if ($element && this._isShown) {
      $element.css('display', 'none');
    }
    if ($parent && !$parent.children(".".concat(BLOCK_SEPARATOR_CLASS)).length) {
      $parent.prepend(that.element());
    }
    _SeparatorView2.prototype.hide.call(this);
  };
  _proto4.isVisible = function isVisible() {
    var groupPanelOptions = this.option('groupPanel');
    var columnChooserOptions = this.option('columnChooser');
    return groupPanelOptions && groupPanelOptions.visible || columnChooserOptions && columnChooserOptions.enabled;
  };
  _proto4.show = function show(targetLocation) {
    var that = this;
    var $element = this.element();
    var startAnimate = function startAnimate(toOptions) {
      _fx.default.stop($element, true);
      _fx.default.animate($element, {
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
    _SeparatorView2.prototype.show.call(this);
  };
  return BlockSeparatorView;
}(SeparatorView);
var DraggingHeaderView = /*#__PURE__*/function (_modules$View3) {
  _inheritsLoose(DraggingHeaderView, _modules$View3);
  function DraggingHeaderView() {
    return _modules$View3.apply(this, arguments) || this;
  }
  var _proto5 = DraggingHeaderView.prototype;
  /// #ENDDEBUG
  _proto5.isDragging = function isDragging() {
    return this._isDragging;
  };
  _proto5._getDraggingPanelByPos = function _getDraggingPanelByPos(pos) {
    var that = this;
    var result;
    (0, _iterator.each)(that._dragOptions.draggingPanels, function (index, draggingPanel) {
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
  };
  _proto5._renderCore = function _renderCore() {
    this.element().addClass("".concat(this.addWidgetPrefix(DRAGGING_HEADER_CLASS), " ").concat(this.addWidgetPrefix(CELL_CONTENT_CLASS), " ").concat(WIDGET_CLASS)).hide();
  };
  _proto5._resetTargetColumnOptions = function _resetTargetColumnOptions() {
    var params = this._dropOptions;
    params.targetColumnIndex = -1;
    delete params.targetColumnElement;
    delete params.isLast;
    delete params.posX;
    delete params.posY;
  };
  _proto5._getVisibleIndexObject = function _getVisibleIndexObject(rowIndex, visibleIndex) {
    if ((0, _type.isDefined)(rowIndex)) {
      return {
        columnIndex: visibleIndex,
        rowIndex
      };
    }
    return visibleIndex;
  };
  _proto5.dispose = function dispose() {
    var element = this.element();
    this._dragOptions = null;
    element && element.parent().find(".".concat(this.addWidgetPrefix(DRAGGING_HEADER_CLASS))).remove();
  };
  _proto5.isVisible = function isVisible() {
    var columnsController = this.getController('columns');
    var commonColumnSettings = columnsController.getCommonSettings();
    return this.option('showColumnHeaders') && (allowReordering(this) || commonColumnSettings.allowGrouping || commonColumnSettings.allowHiding);
  };
  _proto5.init = function init() {
    var that = this;
    _modules$View3.prototype.init.call(this);
    this._controller = this.getController('draggingHeader');
    this._columnsResizerViewController = this.getController('columnsResizer');
    this._isDragging = false;
    this.getController('data').loadingChanged.add(function (isLoading) {
      var element = that.element();
      if (!isLoading && element) {
        element.hide();
      }
    });
  };
  _proto5.dragHeader = function dragHeader(options) {
    var that = this;
    var columnElement = options.columnElement;
    var isCommandColumn = !!options.sourceColumn.type;
    that._isDragging = true;
    that._dragOptions = options;
    that._dropOptions = {
      sourceIndex: options.index,
      sourceColumnIndex: that._getVisibleIndexObject(options.rowIndex, options.columnIndex),
      sourceColumnElement: options.columnElement,
      sourceLocation: options.sourceLocation
    };
    var document = _dom_adapter.default.getDocument();
    // eslint-disable-next-line spellcheck/spell-checker
    that._onSelectStart = document.onselectstart;
    // eslint-disable-next-line spellcheck/spell-checker
    document.onselectstart = function () {
      return false;
    };
    that._controller.drag(that._dropOptions);
    that.element().css({
      textAlign: columnElement && columnElement.css('textAlign'),
      height: columnElement && (isCommandColumn && columnElement.get(0).clientHeight || (0, _size.getHeight)(columnElement)),
      width: columnElement && (isCommandColumn && columnElement.get(0).clientWidth || (0, _size.getWidth)(columnElement)),
      whiteSpace: columnElement && columnElement.css('whiteSpace')
    }).addClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS)).toggleClass(DRAGGING_COMMAND_CELL_CLASS, isCommandColumn).text(isCommandColumn ? '' : options.sourceColumn.caption);
    that.element().appendTo(_swatch_container.default.getSwatchContainer(columnElement));
  };
  _proto5.moveHeader = function moveHeader(args) {
    var e = args.event;
    var that = e.data.that;
    var eventData = (0, _index.eventData)(e);
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
  };
  _proto5.dockHeader = function dockHeader(eventData) {
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
      var sourceColumn = dragOptions.sourceColumn;
      var columnElements = targetDraggingPanel.getColumnElements(rowIndex, sourceColumn === null || sourceColumn === void 0 ? void 0 : sourceColumn.ownerBand) || [];
      var pointsByTarget = dragOptions.pointsByTarget = dragOptions.pointsByTarget || {};
      var pointsByColumns = targetLocation === 'columnChooser' ? [] : pointsByTarget[targetLocation] || controller._generatePointsByColumns((0, _extend.extend)({}, dragOptions, {
        targetDraggingPanel,
        columns: targetDraggingPanel.getColumns(rowIndex),
        columnElements,
        isVerticalOrientation,
        startColumnIndex: targetLocation === 'headers' && (0, _renderer.default)(columnElements[0]).index()
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
  };
  _proto5.dropHeader = function dropHeader(args) {
    var e = args.event;
    var that = e.data.that;
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
    _dom_adapter.default.getDocument().onselectstart = that._onSelectStart || null;
  };
  return DraggingHeaderView;
}(_m_modules.default.View);
var isNextColumnResizingMode = function isNextColumnResizingMode(that) {
  return that.option('columnResizingMode') !== 'widget';
};
var ColumnsResizerViewController = /*#__PURE__*/function (_modules$ViewControll) {
  _inheritsLoose(ColumnsResizerViewController, _modules$ViewControll);
  function ColumnsResizerViewController() {
    return _modules$ViewControll.apply(this, arguments) || this;
  }
  var _proto6 = ColumnsResizerViewController.prototype;
  _proto6._isHeadersRowArea = function _isHeadersRowArea(posY) {
    if (this._columnHeadersView) {
      var element = this._columnHeadersView.element();
      if (element) {
        var offsetTop = element.offset().top;
        var headersRowHeight = this._columnHeadersView.getHeadersRowHeight();
        return posY >= offsetTop && posY <= offsetTop + headersRowHeight;
      }
    }
    return false;
  };
  _proto6._isRtlParentStyle = function _isRtlParentStyle() {
    var _a;
    return this.option('rtlEnabled') && ((_a = this._$parentContainer) === null || _a === void 0 ? void 0 : _a.parent().css('direction')) === 'rtl';
  };
  _proto6._pointCreated = function _pointCreated(point, cellsLength, columns) {
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
  };
  _proto6._getTargetPoint = function _getTargetPoint(pointsByColumns, currentX, deltaX) {
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
  };
  _proto6._moveSeparator = function _moveSeparator(args) {
    var _a;
    var e = args.event;
    var that = e.data;
    var columnsSeparatorWidth = that._columnsSeparatorView.width();
    var isNextColumnMode = isNextColumnResizingMode(that);
    var deltaX = columnsSeparatorWidth / 2;
    var parentOffset = that._$parentContainer.offset();
    var parentOffsetLeft = parentOffset.left;
    var eventData = (0, _index.eventData)(e);
    var rtlEnabled = that.option('rtlEnabled');
    var isRtlParentStyle = this._isRtlParentStyle();
    var isDragging = (_a = that._draggingHeaderView) === null || _a === void 0 ? void 0 : _a.isDragging();
    if (that._isResizing && that._resizingInfo) {
      if ((parentOffsetLeft <= eventData.x || !isNextColumnMode && isRtlParentStyle) && (!isNextColumnMode || eventData.x <= parentOffsetLeft + (0, _size.getWidth)(that._$parentContainer))) {
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
  };
  _proto6._endResizing = function _endResizing(args) {
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
  };
  _proto6._getNextColumnIndex = function _getNextColumnIndex(currentColumnIndex) {
    return currentColumnIndex + 1;
  };
  _proto6._setupResizingInfo = function _setupResizingInfo(posX) {
    var that = this;
    var currentColumnIndex = that._targetPoint.columnIndex;
    var nextColumnIndex = that._getNextColumnIndex(currentColumnIndex);
    var currentHeader = that._columnHeadersView.getHeaderElement(currentColumnIndex);
    var nextHeader = that._columnHeadersView.getHeaderElement(nextColumnIndex);
    that._resizingInfo = {
      startPosX: posX,
      currentColumnIndex,
      currentColumnWidth: currentHeader && currentHeader.length > 0 ? (0, _position.getBoundingRect)(currentHeader[0]).width : 0,
      nextColumnIndex,
      nextColumnWidth: nextHeader && nextHeader.length > 0 ? (0, _position.getBoundingRect)(nextHeader[0]).width : 0
    };
  };
  _proto6._startResizing = function _startResizing(args) {
    var e = args.event;
    var that = e.data;
    var eventData = (0, _index.eventData)(e);
    if ((0, _index.isTouchEvent)(e)) {
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
        that._scrollRight = (0, _size.getWidth)(scrollable.$content()) - (0, _size.getWidth)(scrollable.container()) - scrollable.scrollLeft();
      }
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.isResizing()) {
      this.getController('editorFactory').loseFocus();
    }
  };
  _proto6._generatePointsByColumns = function _generatePointsByColumns() {
    var that = this;
    var columns = that._columnsController ? that._columnsController.getVisibleColumns() : [];
    var cells = that._columnHeadersView.getColumnElements();
    var pointsByColumns = [];
    if (cells && cells.length > 0) {
      pointsByColumns = _m_utils.default.getPointsByColumns(cells, function (point) {
        return that._pointCreated(point, cells.length, columns);
      });
    }
    that._pointsByColumns = pointsByColumns;
  };
  _proto6._unsubscribeFromEvents = function _unsubscribeFromEvents() {
    this._moveSeparatorHandler && _events_engine.default.off(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.move, MODULE_NAMESPACE), this._moveSeparatorHandler);
    this._startResizingHandler && _events_engine.default.off(this._$parentContainer, (0, _index.addNamespace)(_pointer.default.down, MODULE_NAMESPACE), this._startResizingHandler);
    if (this._endResizingHandler) {
      _events_engine.default.off(this._columnsSeparatorView.element(), (0, _index.addNamespace)(_pointer.default.up, MODULE_NAMESPACE), this._endResizingHandler);
      _events_engine.default.off(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.up, MODULE_NAMESPACE), this._endResizingHandler);
    }
  };
  _proto6._subscribeToEvents = function _subscribeToEvents() {
    this._moveSeparatorHandler = this.createAction(this._moveSeparator);
    this._startResizingHandler = this.createAction(this._startResizing);
    this._endResizingHandler = this.createAction(this._endResizing);
    _events_engine.default.on(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.move, MODULE_NAMESPACE), this, this._moveSeparatorHandler);
    _events_engine.default.on(this._$parentContainer, (0, _index.addNamespace)(_pointer.default.down, MODULE_NAMESPACE), this, this._startResizingHandler);
    _events_engine.default.on(this._columnsSeparatorView.element(), (0, _index.addNamespace)(_pointer.default.up, MODULE_NAMESPACE), this, this._endResizingHandler);
    _events_engine.default.on(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.up, MODULE_NAMESPACE), this, this._endResizingHandler);
  };
  _proto6._updateColumnsWidthIfNeeded = function _updateColumnsWidthIfNeeded(posX) {
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
      return (0, _type.isString)(width) && width.endsWith('%');
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
      var allColumnsHaveWidth = visibleColumns.every(function (column) {
        return column.width;
      });
      if (allColumnsHaveWidth) {
        var totalPercent = visibleColumns.reduce(function (sum, column) {
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
    var _calculateCellWidths = calculateCellWidths(deltaX),
      cellWidth = _calculateCellWidths.cellWidth,
      nextCellWidth = _calculateCellWidths.nextCellWidth;
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
        var hasScroll = columnWidths.reduce(function (totalWidth, width) {
          return totalWidth + width;
        }, 0) > this._rowsView.contentWidth();
        if (!hasScroll) {
          var lastColumnIndex = _m_utils.default.getLastResizableColumnIndex(visibleColumns);
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
          var left = (0, _size.getWidth)(scrollable.$content()) - (0, _size.getWidth)(scrollable.container()) - this._scrollRight;
          scrollable.scrollTo({
            left
          });
        }
      }
    }
    return needUpdate;
  };
  _proto6._subscribeToCallback = function _subscribeToCallback(callback, handler) {
    callback.add(handler);
    this._subscribesToCallbacks.push({
      callback,
      handler
    });
  };
  _proto6._unsubscribeFromCallbacks = function _unsubscribeFromCallbacks() {
    for (var i = 0; i < this._subscribesToCallbacks.length; i++) {
      var subscribe = this._subscribesToCallbacks[i];
      subscribe.callback.remove(subscribe.handler);
    }
    this._subscribesToCallbacks = [];
  };
  _proto6._unsubscribes = function _unsubscribes() {
    this._unsubscribeFromEvents();
    this._unsubscribeFromCallbacks();
  };
  _proto6._init = function _init() {
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
    that._subscribeToCallback(that._columnsSeparatorView.renderCompleted, function () {
      that._unsubscribeFromEvents();
      that._subscribeToEvents();
    });
    that._subscribeToCallback(that._rowsView.renderCompleted, function () {
      that._rowsView.scrollChanged.remove(generatePointsByColumnsScrollHandler);
      that._rowsView.scrollChanged.add(generatePointsByColumnsScrollHandler);
    });
    var previousScrollbarVisibility = that._rowsView.getScrollbarWidth() !== 0;
    var previousTableHeight = 0;
    // @ts-expect-error
    that._subscribeToCallback(that.getController('tablePosition').positionChanged, function (e) {
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
  };
  _proto6.optionChanged = function optionChanged(args) {
    _modules$ViewControll.prototype.optionChanged.call(this, args);
    if (args.name === 'allowColumnResizing') {
      if (args.value) {
        this._init();
        this._subscribeToEvents();
      } else {
        this._unsubscribes();
      }
    }
  };
  _proto6.isResizing = function isResizing() {
    return this._isResizing;
  };
  _proto6.init = function init() {
    this._subscribesToCallbacks = [];
    if (allowResizing(this)) {
      this._init();
    }
  };
  _proto6.pointsByColumns = function pointsByColumns(value) {
    if (value !== undefined) {
      this._pointsByColumns = value;
    } else {
      if (!this._pointsByColumns) {
        this._generatePointsByColumns();
      }
      return this._pointsByColumns;
    }
  };
  _proto6.dispose = function dispose() {
    this._unsubscribes();
    _modules$ViewControll.prototype.dispose.call(this);
  };
  return ColumnsResizerViewController;
}(_m_modules.default.ViewController);
var TablePositionViewController = /*#__PURE__*/function (_modules$ViewControll2) {
  _inheritsLoose(TablePositionViewController, _modules$ViewControll2);
  function TablePositionViewController(component) {
    var _this;
    _this = _modules$ViewControll2.call(this, component) || this;
    _this.positionChanged = (0, _callbacks.default)();
    return _this;
  }
  var _proto7 = TablePositionViewController.prototype;
  _proto7.update = function update(top) {
    var that = this;
    var params = {};
    var $element = that._columnHeadersView.element();
    var offset = $element && $element.offset();
    var offsetTop = offset && offset.top || 0;
    var diffOffsetTop = (0, _type.isDefined)(top) ? Math.abs(top - offsetTop) : 0;
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
  };
  _proto7.init = function init() {
    var that = this;
    _modules$ViewControll2.prototype.init.call(this);
    // @ts-expect-error
    that._columnHeadersView = this.getView('columnHeadersView');
    that._rowsView = this.getView('rowsView');
    // @ts-expect-error
    that._pagerView = this.getView('pagerView');
    that._rowsView.resizeCompleted.add(function () {
      if (that.option('allowColumnResizing')) {
        var targetPoint = that.getController('columnsResizer')._targetPoint;
        that.update(targetPoint ? targetPoint.y : null);
      }
    });
  };
  return TablePositionViewController;
}(_m_modules.default.ViewController);
var DraggingHeaderViewController = /*#__PURE__*/function (_modules$ViewControll3) {
  _inheritsLoose(DraggingHeaderViewController, _modules$ViewControll3);
  function DraggingHeaderViewController() {
    return _modules$ViewControll3.apply(this, arguments) || this;
  }
  var _proto8 = DraggingHeaderViewController.prototype;
  _proto8._generatePointsByColumns = function _generatePointsByColumns(options) {
    var that = this;
    this.isCustomGroupColumnPosition = this.checkIsCustomGroupColumnPosition(options);
    return _m_utils.default.getPointsByColumns(options.columnElements, function (point) {
      return that._pointCreated(point, options.columns, options.targetDraggingPanel.getName(), options.sourceColumn);
    }, options.isVerticalOrientation, options.startColumnIndex);
  };
  _proto8.checkIsCustomGroupColumnPosition = function checkIsCustomGroupColumnPosition(options) {
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
  };
  _proto8._pointCreated = function _pointCreated(point, columns, location, sourceColumn) {
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
  };
  _proto8._subscribeToEvents = function _subscribeToEvents(draggingHeader, draggingPanels) {
    var that = this;
    (0, _iterator.each)(draggingPanels, function (_, draggingPanel) {
      if (draggingPanel) {
        var columns;
        var rowCount = draggingPanel.getRowCount ? draggingPanel.getRowCount() : 1;
        var nameDraggingPanel = draggingPanel.getName();
        var subscribeToEvents = function subscribeToEvents(index, columnElement) {
          if (!columnElement) {
            return;
          }
          var $columnElement = (0, _renderer.default)(columnElement);
          var column = columns[index];
          if (column && draggingPanel.allowDragging(column)) {
            $columnElement.addClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS));
            _events_engine.default.on($columnElement, (0, _index.addNamespace)(_drag.start, MODULE_NAMESPACE), that.createAction(function (args) {
              var e = args.event;
              var eventData = (0, _index.eventData)(e);
              draggingHeader.dragHeader({
                // @ts-expect-error
                deltaX: eventData.x - (0, _renderer.default)(e.currentTarget).offset().left,
                // @ts-expect-error
                deltaY: eventData.y - (0, _renderer.default)(e.currentTarget).offset().top,
                sourceColumn: column,
                index: column.index,
                columnIndex: index,
                columnElement: $columnElement,
                sourceLocation: nameDraggingPanel,
                draggingPanels,
                rowIndex: that._columnsController.getRowIndex(column.index, true)
              });
            }));
            _events_engine.default.on($columnElement, (0, _index.addNamespace)(_drag.move, MODULE_NAMESPACE), {
              that: draggingHeader
            }, that.createAction(draggingHeader.moveHeader));
            _events_engine.default.on($columnElement, (0, _index.addNamespace)(_drag.end, MODULE_NAMESPACE), {
              that: draggingHeader
            }, that.createAction(draggingHeader.dropHeader));
          }
        };
        for (var i = 0; i < rowCount; i++) {
          var columnElements = draggingPanel.getColumnElements(i) || [];
          if (columnElements.length) {
            columns = draggingPanel.getColumns(i) || [];
            (0, _iterator.each)(columnElements, subscribeToEvents);
          }
        }
      }
    });
  };
  _proto8._unsubscribeFromEvents = function _unsubscribeFromEvents(draggingHeader, draggingPanels) {
    var that = this;
    (0, _iterator.each)(draggingPanels, function (_, draggingPanel) {
      if (draggingPanel) {
        var columnElements = draggingPanel.getColumnElements() || [];
        (0, _iterator.each)(columnElements, function (index, columnElement) {
          var $columnElement = (0, _renderer.default)(columnElement);
          // @ts-expect-error
          _events_engine.default.off($columnElement, (0, _index.addNamespace)(_drag.start, MODULE_NAMESPACE));
          // @ts-expect-error
          _events_engine.default.off($columnElement, (0, _index.addNamespace)(_drag.move, MODULE_NAMESPACE));
          // @ts-expect-error
          _events_engine.default.off($columnElement, (0, _index.addNamespace)(_drag.end, MODULE_NAMESPACE));
          $columnElement.removeClass(that.addWidgetPrefix(HEADERS_DRAG_ACTION_CLASS));
        });
      }
    });
  };
  _proto8._getSeparator = function _getSeparator(targetLocation) {
    return targetLocation === 'headers' ? this._columnsSeparatorView : this._blockSeparatorView;
  };
  _proto8.hideSeparators = function hideSeparators(type) {
    var blockSeparator = this._blockSeparatorView;
    var columnsSeparator = this._columnsSeparatorView;
    this._animationColumnIndex = undefined;
    blockSeparator && blockSeparator.hide();
    type !== 'block' && columnsSeparator && columnsSeparator.hide();
  };
  _proto8.init = function init() {
    var that = this;
    _modules$ViewControll3.prototype.init.call(this);
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
  };
  _proto8.allowDrop = function allowDrop(parameters) {
    return this._columnsController.allowMoveColumn(parameters.sourceColumnIndex, parameters.targetColumnIndex, parameters.sourceLocation, parameters.targetLocation);
  };
  _proto8.drag = function drag(parameters) {
    var sourceIndex = parameters.sourceIndex;
    var sourceLocation = parameters.sourceLocation;
    var sourceColumnElement = parameters.sourceColumnElement;
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
  };
  _proto8.dock = function dock(parameters) {
    var that = this;
    var targetColumnIndex = (0, _type.isObject)(parameters.targetColumnIndex) ? parameters.targetColumnIndex.columnIndex : parameters.targetColumnIndex;
    var sourceLocation = parameters.sourceLocation;
    var targetLocation = parameters.targetLocation;
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
  };
  _proto8.drop = function drop(parameters) {
    var sourceColumnElement = parameters.sourceColumnElement;
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
  };
  _proto8.dispose = function dispose() {
    if (this._draggingHeaderView) {
      this._unsubscribeFromEvents(this._draggingHeaderView, [this._columnChooserView, this._columnHeadersView, this._headerPanelView]);
    }
  };
  return DraggingHeaderViewController;
}(_m_modules.default.ViewController);
var columnsResizingReorderingModule = {
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
exports.columnsResizingReorderingModule = columnsResizingReorderingModule;
