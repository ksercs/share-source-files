/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_indicator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { getBoundingRect } from '../../../core/utils/position';
import { setWidth } from '../../../core/utils/size';
import { hasWindow } from '../../../core/utils/window';
import { getToday } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { HEADER_CURRENT_TIME_CELL_CLASS } from '../m_classes';
import timezoneUtils from '../m_utils_time_zone';
import SchedulerWorkSpace from './m_work_space';
var toMs = dateUtils.dateToMilliseconds;
var SCHEDULER_DATE_TIME_INDICATOR_CLASS = 'dx-scheduler-date-time-indicator';
var TIME_PANEL_CURRENT_TIME_CELL_CLASS = 'dx-scheduler-time-panel-current-time-cell';
class SchedulerWorkSpaceIndicator extends SchedulerWorkSpace {
  // @ts-expect-error
  _getToday() {
    return getToday(this.option('indicatorTime'), this.timeZoneCalculator);
  }
  isIndicationOnView() {
    if (this.option('showCurrentTimeIndicator')) {
      var today = this._getToday();
      var endViewDate = dateUtils.trimTime(this.getEndViewDate());
      return dateUtils.dateInRange(today, this.getStartViewDate(), new Date(endViewDate.getTime() + toMs('day')));
    }
    return false;
  }
  isIndicationAvailable() {
    if (!hasWindow()) {
      return false;
    }
    var today = this._getToday();
    return today >= dateUtils.trimTime(new Date(this.getStartViewDate()));
  }
  isIndicatorVisible() {
    var today = this._getToday();
    // Subtracts 1 ms from the real endViewDate instead of 1 minute
    var endViewDate = new Date(this.getEndViewDate().getTime() + toMs('minute') - 1);
    var firstViewDate = new Date(this.getStartViewDate());
    firstViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    endViewDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    return dateUtils.dateInRange(today, firstViewDate, endViewDate);
  }
  _renderDateTimeIndication() {
    if (this.isIndicationAvailable()) {
      if (this.option('shadeUntilCurrentTime')) {
        this._shader.render();
      }
      if (this.isIndicationOnView() && this.isIndicatorVisible()) {
        var groupCount = this._getGroupCount() || 1;
        var $container = this._dateTableScrollable.$content();
        var height = this.getIndicationHeight();
        var rtlOffset = this._getRtlOffset(this.getCellWidth());
        this._renderIndicator(height, rtlOffset, $container, groupCount);
        this._setCurrentTimeCells();
      }
    }
  }
  _renderIndicator(height, rtlOffset, $container, groupCount) {
    var groupedByDate = this.isGroupedByDate();
    var repeatCount = groupedByDate ? 1 : groupCount;
    for (var i = 0; i < repeatCount; i++) {
      var $indicator = this._createIndicator($container);
      setWidth($indicator, groupedByDate ? this.getCellWidth() * groupCount : this.getCellWidth());
      this._groupedStrategy.shiftIndicator($indicator, height, rtlOffset, i);
    }
  }
  _createIndicator($container) {
    var $indicator = $('<div>').addClass(SCHEDULER_DATE_TIME_INDICATOR_CLASS);
    $container.append($indicator);
    return $indicator;
  }
  _getRtlOffset(width) {
    return this.option('rtlEnabled') ? getBoundingRect(this._dateTableScrollable.$content().get(0)).width - this.getTimePanelWidth() - width : 0;
  }
  _setIndicationUpdateInterval() {
    if (!this.option('showCurrentTimeIndicator') || this.option('indicatorUpdateInterval') === 0) {
      return;
    }
    this._clearIndicatorUpdateInterval();
    this._indicatorInterval = setInterval(() => {
      this._refreshDateTimeIndication();
    }, this.option('indicatorUpdateInterval'));
  }
  _clearIndicatorUpdateInterval() {
    if (this._indicatorInterval) {
      clearInterval(this._indicatorInterval);
      delete this._indicatorInterval;
    }
  }
  _isVerticalShader() {
    return true;
  }
  getIndicationWidth(groupIndex) {
    var maxWidth = this.getCellWidth() * this._getCellCount();
    var difference = this._getIndicatorDuration();
    if (difference > this._getCellCount()) {
      difference = this._getCellCount();
    }
    var width = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
    return maxWidth < width ? maxWidth : width;
  }
  getIndicatorOffset(groupIndex) {
    var difference = this._getIndicatorDuration() - 1;
    var offset = difference * this.getRoundedCellWidth(groupIndex, groupIndex * this._getCellCount(), difference);
    return offset;
  }
  _getIndicatorDuration() {
    var today = this._getToday();
    var firstViewDate = new Date(this.getStartViewDate());
    var timeDiff = today.getTime() - firstViewDate.getTime();
    if (this.option('type') === 'workWeek') {
      timeDiff -= this._getWeekendsCount(Math.round(timeDiff / toMs('day'))) * toMs('day');
    }
    return Math.ceil((timeDiff + 1) / toMs('day'));
  }
  getIndicationHeight() {
    var today = timezoneUtils.getDateWithoutTimezoneChange(this._getToday());
    var cellHeight = this.getCellHeight();
    var date = new Date(this.getStartViewDate());
    if (this.isIndicationOnView()) {
      date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    }
    var duration = today.getTime() - date.getTime();
    var cellCount = duration / this.getCellDuration();
    return cellCount * cellHeight;
  }
  _dispose() {
    this._clearIndicatorUpdateInterval();
    super._dispose.apply(this, arguments);
  }
  _refreshDateTimeIndication() {
    var _a;
    this._cleanDateTimeIndicator();
    this._cleanCurrentTimeCells();
    (_a = this._shader) === null || _a === void 0 ? void 0 : _a.clean();
    this._renderDateTimeIndication();
  }
  _setCurrentTimeCells() {
    var timePanelCells = this._getTimePanelCells();
    var currentTimeCellIndices = this._getCurrentTimePanelCellIndices();
    currentTimeCellIndices.forEach(timePanelCellIndex => {
      timePanelCells.eq(timePanelCellIndex).addClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS);
    });
  }
  _isCurrentTimeHeaderCell(headerIndex) {
    if (this.isIndicationOnView()) {
      var {
        completeDateHeaderMap
      } = this.viewDataProvider;
      var date = completeDateHeaderMap[completeDateHeaderMap.length - 1][headerIndex].startDate;
      return dateUtils.sameDate(date, this._getToday());
    }
    return false;
  }
  _getHeaderPanelCellClass(i) {
    var cellClass = super._getHeaderPanelCellClass(i);
    if (this._isCurrentTimeHeaderCell(i)) {
      return "".concat(cellClass, " ").concat(HEADER_CURRENT_TIME_CELL_CLASS);
    }
    return cellClass;
  }
  _cleanView() {
    super._cleanView();
    this._cleanDateTimeIndicator();
  }
  _dimensionChanged() {
    super._dimensionChanged();
    this._refreshDateTimeIndication();
  }
  _cleanDateTimeIndicator() {
    this.$element().find(".".concat(SCHEDULER_DATE_TIME_INDICATOR_CLASS)).remove();
  }
  _cleanCurrentTimeCells() {
    this.$element().find(".".concat(TIME_PANEL_CURRENT_TIME_CELL_CLASS)).removeClass(TIME_PANEL_CURRENT_TIME_CELL_CLASS);
  }
  _cleanWorkSpace() {
    super._cleanWorkSpace();
    this._renderDateTimeIndication();
    this._setIndicationUpdateInterval();
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'showCurrentTimeIndicator':
      case 'indicatorTime':
        this._cleanWorkSpace();
        break;
      case 'indicatorUpdateInterval':
        this._setIndicationUpdateInterval();
        break;
      case 'showAllDayPanel':
        super._optionChanged(args);
        this._refreshDateTimeIndication();
        break;
      case 'allDayExpanded':
        super._optionChanged(args);
        this._refreshDateTimeIndication();
        break;
      case 'crossScrollingEnabled':
        super._optionChanged(args);
        this._refreshDateTimeIndication();
        break;
      case 'shadeUntilCurrentTime':
        this._refreshDateTimeIndication();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      showCurrentTimeIndicator: true,
      indicatorTime: new Date(),
      indicatorUpdateInterval: 5 * toMs('minute'),
      shadeUntilCurrentTime: true
    });
  }
  _getCurrentTimePanelCellIndices() {
    var rowCountPerGroup = this._getTimePanelRowCount();
    var today = this._getToday();
    var index = this.getCellIndexByDate(today);
    var {
      rowIndex: currentTimeRowIndex
    } = this._getCellCoordinatesByIndex(index);
    if (currentTimeRowIndex === undefined) {
      return [];
    }
    var cellIndices;
    if (currentTimeRowIndex === 0) {
      cellIndices = [currentTimeRowIndex];
    } else {
      cellIndices = currentTimeRowIndex % 2 === 0 ? [currentTimeRowIndex - 1, currentTimeRowIndex] : [currentTimeRowIndex, currentTimeRowIndex + 1];
    }
    var verticalGroupCount = this._isVerticalGroupedWorkSpace() ? this._getGroupCount() : 1;
    return [...new Array(verticalGroupCount)].reduce((currentIndices, _, groupIndex) => [...currentIndices, ...cellIndices.map(cellIndex => rowCountPerGroup * groupIndex + cellIndex)], []);
  }
}
registerComponent('dxSchedulerWorkSpace', SchedulerWorkSpaceIndicator);
export default SchedulerWorkSpaceIndicator;
