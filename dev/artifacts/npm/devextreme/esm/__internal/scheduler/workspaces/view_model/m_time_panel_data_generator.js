/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_time_panel_data_generator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { getDisplayedRowCount } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { getTimePanelCellText } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/week';
import { getIsGroupedAllDayPanel, getKeyByGroup } from '../../../../renovation/ui/scheduler/workspaces/utils';
export class TimePanelDataGenerator {
  constructor(_viewDataGenerator) {
    this._viewDataGenerator = _viewDataGenerator;
  }
  getCompleteTimePanelMap(options, completeViewDataMap) {
    var {
      startViewDate,
      cellDuration,
      startDayHour,
      isVerticalGrouping,
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      endDayHour
    } = options;
    var rowCountInGroup = this._viewDataGenerator.getRowCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var cellCountInGroupRow = this._viewDataGenerator.getCellCount({
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour
    });
    var allDayRowsCount = 0;
    return completeViewDataMap.map((row, index) => {
      var _a = row[0],
        {
          allDay,
          startDate,
          endDate,
          groups,
          groupIndex,
          isFirstGroupCell,
          isLastGroupCell,
          index: cellIndex
        } = _a,
        restCellProps = __rest(_a, ["allDay", "startDate", "endDate", "groups", "groupIndex", "isFirstGroupCell", "isLastGroupCell", "index"]);
      if (allDay) {
        allDayRowsCount += 1;
      }
      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends(_extends({}, restCellProps), {
        startDate,
        allDay,
        text: getTimePanelCellText(timeIndex, startDate, startViewDate, cellDuration, startDayHour),
        groups: isVerticalGrouping ? groups : undefined,
        groupIndex: isVerticalGrouping ? groupIndex : undefined,
        isFirstGroupCell: isVerticalGrouping && isFirstGroupCell,
        isLastGroupCell: isVerticalGrouping && isLastGroupCell,
        index: Math.floor(cellIndex / cellCountInGroupRow)
      });
    });
  }
  generateTimePanelData(completeTimePanelMap, options) {
    var {
      startRowIndex,
      rowCount,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      isGroupedAllDayPanel,
      isVerticalGrouping,
      isAllDayPanelVisible
    } = options;
    var indexDifference = isVerticalGrouping || !isAllDayPanelVisible ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var displayedRowCount = getDisplayedRowCount(rowCount, completeTimePanelMap);
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + displayedRowCount);
    var timePanelData = {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      isGroupedAllDayPanel
    };
    var {
      previousGroupedData: groupedData
    } = this._generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping);
    timePanelData.groupedData = groupedData;
    return timePanelData;
  }
  _generateTimePanelDataFromMap(timePanelMap, isVerticalGrouping) {
    return timePanelMap.reduce((_ref, cellData) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref;
      var currentGroupIndex = cellData.groupIndex;
      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel: getIsGroupedAllDayPanel(!!cellData.allDay, isVerticalGrouping),
          groupIndex: currentGroupIndex,
          key: getKeyByGroup(currentGroupIndex, isVerticalGrouping)
        });
      }
      if (cellData.allDay) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellData;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellData);
      }
      return {
        previousGroupIndex: currentGroupIndex,
        previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  }
}
