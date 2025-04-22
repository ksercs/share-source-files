/**
* DevExtreme (cjs/__internal/scheduler/appointments/data_provider/m_appointment_filter_virtual.js)
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
exports.AppointmentFilterVirtualStrategy = void 0;
var _query = _interopRequireDefault(require("../../../../common/data/query"));
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _date2 = require("../../../core/utils/date");
var _index = require("../../../scheduler/r1/utils/index");
var _m_utils = require("../../resources/m_utils");
var _m_appointment_filter = require("./m_appointment_filter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// TODO Vinogradov refactoring: this module should be refactored :)
const toMs = _date.default.dateToMilliseconds;
class AppointmentFilterVirtualStrategy extends _m_appointment_filter.AppointmentFilterBaseStrategy {
  get resources() {
    return this.options.resources;
  }
  filter(preparedItems) {
    const {
      viewOffset
    } = this.options;
    const hourMs = toMs('hour');
    const isCalculateStartAndEndDayHour = (0, _index.isDateAndTimeView)(this.viewType);
    const checkIntersectViewport = isCalculateStartAndEndDayHour && this.viewDirection === 'horizontal';
    const isAllDayWorkspace = !this.supportAllDayRow;
    const showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    const endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    const shiftedEndViewDate = _date2.dateUtilsTs.addOffsets(endViewDate, [viewOffset]);
    const filterOptions = [];
    const groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      const {
        groupIndex
      } = item;
      const groupStartDate = item.startDate;
      const groupEndDate = new Date(Math.min(item.endDate.getTime(), shiftedEndViewDate.getTime()));
      const startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      const endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate.getTime() - groupStartDate.getTime()) / hourMs : this.viewEndDayHour;
      const resources = this._getPrerenderFilterResources(groupIndex);
      const hasAllDayPanel = this.viewDataProvider.hasGroupAllDayPanel(groupIndex);
      const supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewOffset,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: _date2.dateUtilsTs.addOffsets(groupStartDate, [-viewOffset]),
        max: _date2.dateUtilsTs.addOffsets(groupEndDate, [-viewOffset]),
        supportMultiDayAppointments: (0, _index.isTimelineView)(this.viewType),
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions,
      groupCount: this.groupCount
    }, preparedItems);
  }
  filterPreparedItems(_ref, preparedItems) {
    let {
      filterOptions,
      groupCount
    } = _ref;
    const combinedFilters = [];
    let itemsToFilter = preparedItems;
    const needPreFilter = groupCount > 0;
    if (needPreFilter) {
      // @ts-expect-error
      itemsToFilter = itemsToFilter.filter(_ref2 => {
        let {
          rawAppointment
        } = _ref2;
        for (let i = 0; i < filterOptions.length; ++i) {
          const {
            resources
          } = filterOptions[i];
          if (this._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }
    filterOptions.forEach(option => {
      combinedFilters.length && combinedFilters.push('or');
      const filter = this._createCombinedFilter(option);
      combinedFilters.push(filter);
    });
    // @ts-expect-error
    return (0, _query.default)(itemsToFilter)
    // @ts-expect-error
    .filter(combinedFilters).toArray();
  }
  hasAllDayAppointments(filteredItems, preparedItems) {
    return this.filterAllDayAppointments(preparedItems).length > 0;
  }
  _getPrerenderFilterResources(groupIndex) {
    const cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return (0, _m_utils.getResourcesDataByGroups)(this.loadedResources, this.resources, [cellGroup]);
  }
}
exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
AppointmentFilterVirtualStrategy.strategyName = 'virtual';
