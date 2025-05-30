import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from '../../../../core/utils/date';
import { extend } from '../../../../core/utils/extend';
import { roundFloatPart } from '../../../../core/utils/math';
import { isNumeric } from '../../../../core/utils/type';
import { getAppointmentTakesAllDay } from '../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay';
import getSkippedHoursInRange from '../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange';
import timeZoneUtils from '../../../../ui/scheduler/utils.timeZone';
import { createAppointmentAdapter } from '../../m_appointment_adapter';
import { ExpressionUtils } from '../../m_expression_utils';
import BaseAppointmentsStrategy from './m_strategy_base';
var ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
var ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
var toMs = dateUtils.dateToMilliseconds;
class VerticalRenderingStrategy extends BaseAppointmentsStrategy {
  getDeltaTime(args, initialSize, appointment) {
    var deltaTime = 0;
    if (this.isAllDay(appointment)) {
      deltaTime = this._getDeltaWidth(args, initialSize) * toMs('day');
    } else {
      var deltaHeight = args.height - initialSize.height;
      deltaTime = toMs('minute') * Math.round(deltaHeight / this.cellHeight * this.cellDurationInMinutes);
    }
    return deltaTime;
  }
  _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
    if (isAllDay) {
      super._correctCollectorCoordinatesInAdaptive(coordinates, isAllDay);
    } else if (this._getMaxAppointmentCountPerCellByType() === 0) {
      var {
        cellHeight
      } = this;
      var {
        cellWidth
      } = this;
      coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
      coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2;
    }
  }
  getAppointmentGeometry(coordinates) {
    var geometry = null;
    if (coordinates.allDay) {
      geometry = this._getAllDayAppointmentGeometry(coordinates);
    } else {
      geometry = this.isAdaptive && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates);
    }
    return super.getAppointmentGeometry(geometry);
  }
  _getAdaptiveGeometry(coordinates) {
    var config = this._calculateGeometryConfig(coordinates);
    return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
  }
  _getItemPosition(appointment) {
    var allDay = this.isAllDay(appointment);
    if (allDay) {
      return super._getItemPosition(appointment);
    }
    var adapter = createAppointmentAdapter(appointment, this.dataAccessors, this.timeZoneCalculator);
    var isRecurring = !!adapter.recurrenceRule;
    var appointmentStartDate = adapter.calculateStartDate('toGrid');
    var appointmentEndDate = adapter.calculateEndDate('toGrid');
    var appointmentDuration = appointmentEndDate - appointmentStartDate;
    var appointmentBeginInCurrentView = this.options.startViewDate < appointmentStartDate;
    var isAppointmentTakesSeveralDays = !timeZoneUtils.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
    var settings = this.generateAppointmentSettings(appointment);
    var result = [];
    for (var j = 0; j < settings.length; j++) {
      var currentSetting = settings[j];
      var height = this.calculateAppointmentHeight(appointment, currentSetting);
      var width = this.calculateAppointmentWidth(appointment, currentSetting);
      var resultHeight = height;
      var appointmentReduced = null;
      var multiDaysAppointmentParts = [];
      var currentMaxAllowedPosition = currentSetting.vMax;
      if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
        var trimmedStartDate = dateUtils.trimTime(appointmentStartDate);
        var trimmedSettingStartDate = dateUtils.trimTime(currentSetting.info.appointment.startDate);
        var reduceHead = trimmedStartDate <= trimmedSettingStartDate || isRecurring;
        if (reduceHead) {
          resultHeight = this._reduceMultiDayAppointment(height, {
            top: currentSetting.top,
            bottom: currentMaxAllowedPosition
          });
          multiDaysAppointmentParts = this._getAppointmentParts({
            sourceAppointmentHeight: height,
            reducedHeight: resultHeight,
            width
          }, currentSetting);
        }
        var {
          startDate: currentSettingStartDate,
          normalizedEndDate: currentSettingNormalizedEndDate
        } = currentSetting.info.appointment;
        var currentSettingDuration = currentSettingNormalizedEndDate - currentSettingStartDate;
        var hasNextParts = currentSettingDuration < appointmentDuration;
        appointmentReduced = hasNextParts ? appointmentBeginInCurrentView ? 'head' : 'body' : appointmentBeginInCurrentView ? 'head' : 'tail';
      }
      extend(currentSetting, {
        height: resultHeight,
        width,
        allDay,
        appointmentReduced
      });
      result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result);
    }
    return result;
  }
  _isMultiViewAppointment(_ref, height) {
    var {
      vMax,
      top
    } = _ref;
    // NOTE: we round these numbers, because in js 100 - 33.3333 = 66.66669999
    var fullAppointmentHeight = roundFloatPart(height, 2);
    var remainingHeight = roundFloatPart(vMax - top, 2);
    return fullAppointmentHeight > remainingHeight;
  }
  _reduceMultiDayAppointment(sourceAppointmentHeight, bound) {
    return Math.min(sourceAppointmentHeight, bound.bottom - Math.floor(bound.top));
  }
  _getGroupHeight() {
    return this.cellHeight * this.rowCount;
  }
  _getGroupTopOffset(appointmentSettings) {
    var {
      groupIndex
    } = appointmentSettings;
    var groupTop = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
      groupIndex,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    var appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
    return appointmentGroupTopOffset;
  }
  _getTailHeight(appointmentGeometry, appointmentSettings) {
    if (!this.isVirtualScrolling) {
      return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight;
    }
    var appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
    var {
      sourceAppointmentHeight
    } = appointmentGeometry;
    var groupHeight = this._getGroupHeight();
    var tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
    return tailHeight;
  }
  _getAppointmentParts(appointmentGeometry, appointmentSettings) {
    var {
      width
    } = appointmentGeometry;
    var result = [];
    var currentPartTop = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex: appointmentSettings.groupIndex,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    var cellsDiff = this.isGroupedByDate ? this.groupCount : 1;
    var offset = this.cellWidth * cellsDiff;
    var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
      groupIndex: appointmentSettings.groupIndex,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    currentPartTop += allDayPanelOffset;
    var minHeight = this.getAppointmentMinSize();
    var {
      vMax,
      hMax
    } = appointmentSettings;
    var hasTailPart = this.options.endViewDate > appointmentSettings.info.appointment.endDate;
    var left = Math.round(appointmentSettings.left + offset);
    var tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
    while (tailHeight > 0 && left < hMax) {
      tailHeight = Math.max(minHeight, tailHeight);
      var columnIndex = appointmentSettings.columnIndex + cellsDiff;
      var height = Math.min(tailHeight, vMax);
      result.push(_extends(_extends({}, appointmentSettings), {
        top: currentPartTop,
        left,
        height,
        width,
        appointmentReduced: 'body',
        rowIndex: 0,
        columnIndex
      }));
      left += offset;
      tailHeight -= vMax;
    }
    if (hasTailPart && result.length > 0) {
      result[result.length - 1].appointmentReduced = 'tail';
    }
    return result;
  }
  _getMinuteHeight() {
    return this.cellHeight / this.cellDurationInMinutes;
  }
  _getCompactLeftCoordinate(itemLeft, index) {
    var cellBorderSize = 1;
    var cellWidth = this.cellWidth || this.getAppointmentMinSize();
    return itemLeft + (cellBorderSize + cellWidth) * index;
  }
  _getVerticalAppointmentGeometry(coordinates) {
    var config = this._calculateVerticalGeometryConfig(coordinates);
    return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset);
  }
  _customizeVerticalCoordinates(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
    var appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
    var {
      height
    } = coordinates;
    var appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
    var {
      top
    } = coordinates;
    if (coordinates.isCompact) {
      this._markAppointmentAsVirtual(coordinates, isAllDay);
    }
    return {
      height,
      width: appointmentWidth,
      top,
      left: appointmentLeft,
      empty: this._isAppointmentEmpty(height, width)
    };
  }
  _calculateVerticalGeometryConfig(coordinates) {
    var overlappingMode = this.maxAppointmentsPerCell;
    var offsets = this._getOffsets();
    var appointmentDefaultOffset = this._getAppointmentDefaultOffset();
    var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
    var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
    var maxWidth = this._getMaxWidth();
    if (!appointmentCountPerCell) {
      appointmentCountPerCell = coordinates.count;
      ratio = (maxWidth - offsets.unlimited) / maxWidth;
    }
    var topOffset = (1 - ratio) * maxWidth;
    if (overlappingMode === 'auto' || isNumeric(overlappingMode)) {
      ratio = 1;
      maxWidth -= appointmentDefaultOffset;
      topOffset = 0;
    }
    return {
      width: ratio * maxWidth,
      appointmentCountPerCell,
      offset: topOffset
    };
  }
  _getMaxWidth() {
    return this.cellWidth;
  }
  isAllDay(appointmentData) {
    return getAppointmentTakesAllDay(createAppointmentAdapter(appointmentData, this.dataAccessors, this.timeZoneCalculator), this.startDayHour, this.endDayHour, this.allDayPanelMode);
  }
  _getAppointmentMaxWidth() {
    return this.cellWidth - this._getAppointmentDefaultOffset();
  }
  calculateAppointmentWidth(appointment, position) {
    if (!this.isAllDay(appointment)) {
      return 0;
    }
    var startDate = dateUtils.trimTime(position.info.appointment.startDate);
    var {
      normalizedEndDate
    } = position.info.appointment;
    var cellWidth = this.cellWidth || this.getAppointmentMinSize();
    var durationInHours = (normalizedEndDate.getTime() - startDate.getTime()) / toMs('hour');
    var skippedHours = getSkippedHoursInRange(position.info.appointment.startDate, position.info.appointment.endDate, this.viewDataProvider);
    var width = Math.ceil((durationInHours - skippedHours) / 24) * cellWidth;
    width = this.cropAppointmentWidth(width, cellWidth);
    return width;
  }
  calculateAppointmentHeight(appointment, position) {
    if (this.isAllDay(appointment)) {
      return 0;
    }
    var {
      startDate
    } = position.info.appointment;
    var {
      normalizedEndDate
    } = position.info.appointment;
    var allDay = ExpressionUtils.getField(this.dataAccessors, 'allDay', appointment);
    var duration = this.getAppointmentDurationInMs(startDate, normalizedEndDate, allDay);
    var durationInMinutes = this._adjustDurationByDaylightDiff(duration, startDate, normalizedEndDate) / toMs('minute');
    var height = durationInMinutes * this._getMinuteHeight();
    return height;
  }
  getDirection() {
    return 'vertical';
  }
  _sortCondition(a, b) {
    if (!!a.allDay !== !!b.allDay) {
      return a.allDay ? 1 : -1;
    }
    var isAllDay = a.allDay && b.allDay;
    return this.groupOrientation === 'vertical' && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
  }
  allDaySupported() {
    return true;
  }
  _getAllDayAppointmentGeometry(coordinates) {
    var config = this._calculateGeometryConfig(coordinates);
    return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true);
  }
  _calculateGeometryConfig(coordinates) {
    if (!this.allowResizing || !this.allowAllDayResizing) {
      coordinates.skipResizing = true;
    }
    var config = super._calculateGeometryConfig(coordinates);
    var minAppointmentCountPerCell = Math.min(config.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
    if (coordinates.allDay && coordinates.count <= minAppointmentCountPerCell) {
      config.offset = 0;
    }
    return config;
  }
  _getAppointmentCount(overlappingMode, coordinates) {
    return overlappingMode !== 'auto' && coordinates.count === 1 && !isNumeric(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getDefaultRatio(coordinates, appointmentCountPerCell) {
    return coordinates.count > this.appointmentCountPerCell ? 0.65 : 1;
  }
  _getOffsets() {
    return {
      unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
      auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
    };
  }
  _getMaxHeight() {
    return this.allDayHeight || this.getAppointmentMinSize();
  }
  // eslint-disable-next-line class-methods-use-this
  _needVerticalGroupBounds(allDay) {
    return !allDay;
  }
  _needHorizontalGroupBounds() {
    return false;
  }
  getPositionShift(timeShift, isAllDay) {
    if (!isAllDay && this.isAdaptive && this._getMaxAppointmentCountPerCellByType(isAllDay) === 0) {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    }
    return super.getPositionShift(timeShift, isAllDay);
  }
}
export default VerticalRenderingStrategy;