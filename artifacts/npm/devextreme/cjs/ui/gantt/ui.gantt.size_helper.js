/**
* DevExtreme (cjs/ui/gantt/ui.gantt.size_helper.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GanttSizeHelper = void 0;
var _size = require("../../core/utils/size");
var _window = require("../../core/utils/window");
var GanttSizeHelper = /*#__PURE__*/function () {
  function GanttSizeHelper(gantt) {
    this._gantt = gantt;
  }
  var _proto = GanttSizeHelper.prototype;
  _proto._setTreeListDimension = function _setTreeListDimension(dimension, value) {
    var _this$_gantt$_ganttTr;
    var setter = dimension === 'width' ? _size.setWidth : _size.setHeight;
    var getter = dimension === 'width' ? _size.getWidth : _size.getHeight;
    setter(this._gantt._$treeListWrapper, value);
    (_this$_gantt$_ganttTr = this._gantt._ganttTreeList) === null || _this$_gantt$_ganttTr === void 0 ? void 0 : _this$_gantt$_ganttTr.setOption(dimension, getter(this._gantt._$treeListWrapper));
  };
  _proto._setGanttViewDimension = function _setGanttViewDimension(dimension, value) {
    var setter = dimension === 'width' ? _size.setWidth : _size.setHeight;
    var getter = dimension === 'width' ? _size.getWidth : _size.getHeight;
    setter(this._gantt._$ganttView, value);
    this._gantt._setGanttViewOption(dimension, getter(this._gantt._$ganttView));
  };
  _proto._getPanelsWidthByOption = function _getPanelsWidthByOption() {
    var _leftPanelWidth$index, _leftPanelWidth$index2;
    var ganttWidth = (0, _size.getWidth)(this._gantt._$element);
    var leftPanelWidth = this._gantt.option('taskListWidth');
    var rightPanelWidth;
    if (!isNaN(leftPanelWidth)) {
      rightPanelWidth = ganttWidth - parseInt(leftPanelWidth);
    } else if (((_leftPanelWidth$index = leftPanelWidth.indexOf) === null || _leftPanelWidth$index === void 0 ? void 0 : _leftPanelWidth$index.call(leftPanelWidth, 'px')) > 0) {
      rightPanelWidth = ganttWidth - parseInt(leftPanelWidth.replace('px', '')) + 'px';
    } else if (((_leftPanelWidth$index2 = leftPanelWidth.indexOf) === null || _leftPanelWidth$index2 === void 0 ? void 0 : _leftPanelWidth$index2.call(leftPanelWidth, '%')) > 0) {
      rightPanelWidth = 100 - parseInt(leftPanelWidth.replace('%', '')) + '%';
    }
    return {
      leftPanelWidth: leftPanelWidth,
      rightPanelWidth: rightPanelWidth
    };
  };
  _proto.onAdjustControl = function onAdjustControl() {
    var elementHeight = (0, _size.getHeight)(this._gantt._$element);
    this.updateGanttWidth();
    this.setGanttHeight(elementHeight);
  };
  _proto.onApplyPanelSize = function onApplyPanelSize(e) {
    this.setInnerElementsWidth(e);
    this.updateGanttRowHeights();
  };
  _proto.updateGanttRowHeights = function updateGanttRowHeights() {
    var rowHeight = this._gantt._ganttTreeList.getRowHeight();
    if (this._gantt._getGanttViewOption('rowHeight') !== rowHeight) {
      var _this$_gantt$_ganttVi;
      this._gantt._setGanttViewOption('rowHeight', rowHeight);
      (_this$_gantt$_ganttVi = this._gantt._ganttView) === null || _this$_gantt$_ganttVi === void 0 ? void 0 : _this$_gantt$_ganttVi._ganttViewCore.updateRowHeights(rowHeight);
    }
  };
  _proto.adjustHeight = function adjustHeight() {
    if (!this._gantt._hasHeight) {
      this._gantt._setGanttViewOption('height', 0);
      this._gantt._setGanttViewOption('height', this._gantt._ganttTreeList.getOffsetHeight());
    }
  };
  _proto.setInnerElementsWidth = function setInnerElementsWidth(widths) {
    if (!(0, _window.hasWindow)()) {
      return;
    }
    var takeWithFromOption = !widths;
    if (takeWithFromOption) {
      widths = this._getPanelsWidthByOption();
      this._setTreeListDimension('width', 0);
      this._setGanttViewDimension('width', 0);
    }
    this._setTreeListDimension('width', widths.leftPanelWidth);
    this._setGanttViewDimension('width', widths.rightPanelWidth);
    if (takeWithFromOption) {
      this._gantt._splitter._setSplitterPositionLeft();
    }
  };
  _proto.updateGanttWidth = function updateGanttWidth() {
    this._gantt._splitter._dimensionChanged();
  };
  _proto.setGanttHeight = function setGanttHeight(height) {
    var _this$_gantt$_ganttVi2;
    var toolbarHeightOffset = this._gantt._$toolbarWrapper.get(0).offsetHeight;
    var mainWrapperHeight = height - toolbarHeightOffset;
    this._setTreeListDimension('height', mainWrapperHeight);
    this._setGanttViewDimension('height', mainWrapperHeight);
    (_this$_gantt$_ganttVi2 = this._gantt._ganttView) === null || _this$_gantt$_ganttVi2 === void 0 ? void 0 : _this$_gantt$_ganttVi2._ganttViewCore.resetAndUpdate();
  };
  return GanttSizeHelper;
}();
exports.GanttSizeHelper = GanttSizeHelper;
