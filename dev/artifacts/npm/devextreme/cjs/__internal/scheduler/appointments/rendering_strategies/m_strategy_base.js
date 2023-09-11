/**
* DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_base.js)
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
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _getAppointmentTakesAllDay = require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
var _utils = _interopRequireDefault(require("../../../../ui/scheduler/utils.timeZone"));
var _themes = require("../../../../ui/themes");
var _m_appointment_adapter = require("../../m_appointment_adapter");
var _m_settings_generator = require("../m_settings_generator");
var _m_appointments_positioning_strategy_adaptive = _interopRequireDefault(require("./m_appointments_positioning_strategy_adaptive"));
var _m_appointments_positioning_strategy_base = _interopRequireDefault(require("./m_appointments_positioning_strategy_base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var toMs = _date.default.dateToMilliseconds;
var APPOINTMENT_MIN_SIZE = 2;
var APPOINTMENT_DEFAULT_HEIGHT = 20;
var COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT = 18;
var DROP_DOWN_BUTTON_ADAPTIVE_SIZE = 28;
var WEEK_VIEW_COLLECTOR_OFFSET = 5;
var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
var BaseRenderingStrategy = /*#__PURE__*/function () {
  function BaseRenderingStrategy(options) {
    this.options = options;
    this._initPositioningStrategy();
  }
  var _proto = BaseRenderingStrategy.prototype;
  _proto._correctCollectorCoordinatesInAdaptive = function _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
    coordinates.top += this.getCollectorTopOffset(isAllDay);
    coordinates.left += this.getCollectorLeftOffset();
  };
  _proto._initPositioningStrategy = function _initPositioningStrategy() {
    this._positioningStrategy = this.isAdaptive ? new _m_appointments_positioning_strategy_adaptive.default(this) : new _m_appointments_positioning_strategy_base.default(this);
  };
  _proto.getPositioningStrategy = function getPositioningStrategy() {
    return this._positioningStrategy;
  };
  _proto.getAppointmentMinSize = function getAppointmentMinSize() {
    return APPOINTMENT_MIN_SIZE;
  };
  _proto.keepAppointmentSettings = function keepAppointmentSettings() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.getDeltaTime = function getDeltaTime(args, initialSize, appointment) {};
  _proto.getAppointmentGeometry = function getAppointmentGeometry(coordinates) {
    return coordinates;
  };
  _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
    return true;
  };
  _proto.getDirection = function getDirection() {
    return 'horizontal';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.createTaskPositionMap = function createTaskPositionMap(items, skipSorting) {
    var _this = this;
    delete this._maxAppointmentCountPerCell;
    var length = items === null || items === void 0 ? void 0 : items.length;
    if (!length) return;
    var map = [];
    for (var i = 0; i < length; i++) {
      var coordinates = this._getItemPosition(items[i]);
      if (coordinates.length && this.rtlEnabled) {
        coordinates = this._correctRtlCoordinates(coordinates);
      }
      coordinates.forEach(function (item) {
        item.leftVirtualCellCount = _this.leftVirtualCellCount;
        item.topVirtualCellCount = _this.topVirtualCellCount;
        item.leftVirtualWidth = _this.leftVirtualCellCount * _this.cellWidth;
        item.topVirtualHeight = _this.topVirtualCellCount * _this.cellHeight;
      });
      map.push(coordinates);
    }
    var positionArray = this._getSortedPositions(map);
    var resultPositions = this._getResultPositions(positionArray);
    return this._getExtendedPositionMap(map, resultPositions);
  };
  _proto._getDeltaWidth = function _getDeltaWidth(args, initialSize) {
    var intervalWidth = this.resizableStep || this.getAppointmentMinSize();
    var initialWidth = initialSize.width;
    return Math.round((args.width - initialWidth) / intervalWidth);
  };
  _proto._correctRtlCoordinates = function _correctRtlCoordinates(coordinates) {
    var width = coordinates[0].width || this._getAppointmentMaxWidth();
    coordinates.forEach(function (coordinate) {
      if (!coordinate.appointmentReduced) {
        coordinate.left -= width;
      }
    });
    return coordinates;
  };
  _proto._getAppointmentMaxWidth = function _getAppointmentMaxWidth() {
    return this.cellWidth;
  };
  _proto._getItemPosition = function _getItemPosition(appointment) {
    var position = this.generateAppointmentSettings(appointment);
    var allDay = this.isAllDay(appointment);
    var result = [];
    for (var j = 0; j < position.length; j++) {
      var height = this.calculateAppointmentHeight(appointment, position[j]);
      var width = this.calculateAppointmentWidth(appointment, position[j]);
      var resultWidth = width;
      var appointmentReduced = null;
      var multiWeekAppointmentParts = [];
      var initialRowIndex = position[j].rowIndex;
      var initialColumnIndex = position[j].columnIndex;
      if (this._needVerifyItemSize() || allDay) {
        var currentMaxAllowedPosition = position[j].hMax;
        if (this.isAppointmentGreaterThan(currentMaxAllowedPosition, {
          left: position[j].left,
          width
        })) {
          appointmentReduced = 'head';
          initialRowIndex = position[j].rowIndex;
          initialColumnIndex = position[j].columnIndex;
          resultWidth = this._reduceMultiWeekAppointment(width, {
            left: position[j].left,
            right: currentMaxAllowedPosition
          });
          multiWeekAppointmentParts = this._getAppointmentParts({
            sourceAppointmentWidth: width,
            reducedWidth: resultWidth,
            height
          }, position[j]);
          // eslint-disable-next-line max-depth
          if (this.rtlEnabled) {
            position[j].left = currentMaxAllowedPosition;
          }
        }
      }
      (0, _extend.extend)(position[j], {
        height,
        width: resultWidth,
        allDay,
        rowIndex: initialRowIndex,
        columnIndex: initialColumnIndex,
        appointmentReduced
      });
      result = this._getAppointmentPartsPosition(multiWeekAppointmentParts, position[j], result);
    }
    return result;
  };
  _proto._getAppointmentPartsPosition = function _getAppointmentPartsPosition(appointmentParts, position, result) {
    if (appointmentParts.length) {
      appointmentParts.unshift(position);
      result = result.concat(appointmentParts);
    } else {
      result.push(position);
    }
    return result;
  };
  _proto.getAppointmentSettingsGenerator = function getAppointmentSettingsGenerator(rawAppointment) {
    return new _m_settings_generator.AppointmentSettingsGenerator(_extends({
      rawAppointment,
      appointmentTakesAllDay: this.isAppointmentTakesAllDay(rawAppointment),
      getPositionShiftCallback: this.getPositionShift.bind(this)
    }, this.options));
  };
  _proto.generateAppointmentSettings = function generateAppointmentSettings(rawAppointment) {
    return this.getAppointmentSettingsGenerator(rawAppointment).create();
  };
  _proto.isAppointmentTakesAllDay = function isAppointmentTakesAllDay(rawAppointment) {
    var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this.dataAccessors, this.timeZoneCalculator);
    return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(adapter, this.viewStartDayHour, this.viewEndDayHour, this.allDayPanelMode);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getAppointmentParts = function _getAppointmentParts(geometry, settings) {
    return [];
  };
  _proto._getCompactAppointmentParts = function _getCompactAppointmentParts(appointmentWidth) {
    var cellWidth = this.cellWidth || this.getAppointmentMinSize();
    return Math.round(appointmentWidth / cellWidth);
  };
  _proto._reduceMultiWeekAppointment = function _reduceMultiWeekAppointment(sourceAppointmentWidth, bound) {
    if (this.rtlEnabled) {
      sourceAppointmentWidth = Math.floor(bound.left - bound.right);
    } else {
      sourceAppointmentWidth = bound.right - Math.floor(bound.left);
    }
    return sourceAppointmentWidth;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.calculateAppointmentHeight = function calculateAppointmentHeight(appointment, position) {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.calculateAppointmentWidth = function calculateAppointmentWidth(appointment, position) {
    return 0;
  };
  _proto.isAppointmentGreaterThan = function isAppointmentGreaterThan(etalon, comparisonParameters) {
    var result = comparisonParameters.left + comparisonParameters.width - etalon;
    if (this.rtlEnabled) {
      result = etalon + comparisonParameters.width - comparisonParameters.left;
    }
    return result > this.cellWidth / 2;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.isAllDay = function isAllDay(appointment) {
    return false;
  };
  _proto.cropAppointmentWidth = function cropAppointmentWidth(width, cellWidth) {
    return this.isGroupedByDate ? cellWidth : width;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getSortedPositions = function _getSortedPositions(positionList, skipSorting) {
    var _this2 = this;
    var result = [];
    var round = function round(value) {
      return Math.round(value * 100) / 100;
    };
    var createItem = function createItem(rowIndex, columnIndex, top, left, bottom, right, position, allDay) {
      return {
        i: rowIndex,
        j: columnIndex,
        top: round(top),
        left: round(left),
        bottom: round(bottom),
        right: round(right),
        cellPosition: position,
        allDay
      };
    };
    for (var rowIndex = 0, rowCount = positionList.length; rowIndex < rowCount; rowIndex++) {
      for (var columnIndex = 0, cellCount = positionList[rowIndex].length; columnIndex < cellCount; columnIndex++) {
        var _positionList$rowInde = positionList[rowIndex][columnIndex],
          top = _positionList$rowInde.top,
          left = _positionList$rowInde.left,
          height = _positionList$rowInde.height,
          width = _positionList$rowInde.width,
          cellPosition = _positionList$rowInde.cellPosition,
          allDay = _positionList$rowInde.allDay;
        result.push(createItem(rowIndex, columnIndex, top, left, top + height, left + width, cellPosition, allDay));
      }
    }
    return result.sort(function (a, b) {
      return _this2._sortCondition(a, b);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._sortCondition = function _sortCondition(a, b) {};
  _proto._getConditions = function _getConditions(a, b) {
    var isSomeEdge = this._isSomeEdge(a, b);
    return {
      columnCondition: isSomeEdge || this._normalizeCondition(a.left, b.left),
      rowCondition: isSomeEdge || this._normalizeCondition(a.top, b.top),
      cellPositionCondition: isSomeEdge || this._normalizeCondition(a.cellPosition, b.cellPosition)
    };
  };
  _proto._rowCondition = function _rowCondition(a, b) {
    var conditions = this._getConditions(a, b);
    return conditions.columnCondition || conditions.rowCondition;
  };
  _proto._columnCondition = function _columnCondition(a, b) {
    var conditions = this._getConditions(a, b);
    return conditions.rowCondition || conditions.columnCondition;
  };
  _proto._isSomeEdge = function _isSomeEdge(a, b) {
    return a.i === b.i && a.j === b.j;
  };
  _proto._normalizeCondition = function _normalizeCondition(first, second) {
    // NOTE: ie & ff pixels
    var result = first - second;
    return Math.abs(result) > 1 ? result : 0;
  };
  _proto._isItemsCross = function _isItemsCross(firstItem, secondItem) {
    var areItemsInTheSameTable = !!firstItem.allDay === !!secondItem.allDay;
    var areItemsAllDay = firstItem.allDay && secondItem.allDay;
    if (areItemsInTheSameTable) {
      var orientation = this._getOrientation(areItemsAllDay);
      return this._checkItemsCrossing(firstItem, secondItem, orientation);
    }
    return false;
  };
  _proto._checkItemsCrossing = function _checkItemsCrossing(firstItem, secondItem, orientation) {
    var firstItemSide1 = Math.floor(firstItem[orientation[0]]);
    var firstItemSide2 = Math.floor(firstItem[orientation[1]]);
    var secondItemSide1 = Math.ceil(secondItem[orientation[0]]);
    var secondItemSide2 = Math.ceil(secondItem[orientation[1]]);
    var isItemCross = Math.abs(firstItem[orientation[2]] - secondItem[orientation[2]]) <= 1;
    return isItemCross && (firstItemSide1 <= secondItemSide1 && firstItemSide2 > secondItemSide1 || firstItemSide1 < secondItemSide2 && firstItemSide2 >= secondItemSide2 || firstItemSide1 === secondItemSide1 && firstItemSide2 === secondItemSide2);
  };
  _proto._getOrientation = function _getOrientation(isAllDay) {
    return isAllDay ? ['left', 'right', 'top'] : ['top', 'bottom', 'left'];
  };
  _proto._getResultPositions = function _getResultPositions(sortedArray) {
    var _this3 = this;
    var result = [];
    var i;
    var sortedIndex = 0;
    var currentItem;
    var indexes;
    var itemIndex;
    var maxIndexInStack = 0;
    var stack = {};
    var findFreeIndex = function findFreeIndex(indexes, index) {
      var isFind = indexes.some(function (item) {
        return item === index;
      });
      if (isFind) {
        return findFreeIndex(indexes, ++index);
      }
      return index;
    };
    var createItem = function createItem(currentItem, index) {
      var currentIndex = index || 0;
      return {
        index: currentIndex,
        i: currentItem.i,
        j: currentItem.j,
        left: currentItem.left,
        right: currentItem.right,
        top: currentItem.top,
        bottom: currentItem.bottom,
        allDay: currentItem.allDay,
        sortedIndex: _this3._skipSortedIndex(currentIndex) ? null : sortedIndex++
      };
    };
    var startNewStack = function startNewStack(currentItem) {
      stack.items = [createItem(currentItem)];
      stack.left = currentItem.left;
      stack.right = currentItem.right;
      stack.top = currentItem.top;
      stack.bottom = currentItem.bottom;
      stack.allDay = currentItem.allDay;
    };
    var pushItemsInResult = function pushItemsInResult(items) {
      items.forEach(function (item) {
        result.push({
          index: item.index,
          count: maxIndexInStack + 1,
          i: item.i,
          j: item.j,
          sortedIndex: item.sortedIndex
        });
      });
    };
    for (i = 0; i < sortedArray.length; i++) {
      currentItem = sortedArray[i];
      indexes = [];
      if (!stack.items) {
        startNewStack(currentItem);
      } else if (this._isItemsCross(stack, currentItem)) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        stack.items.forEach(function (item) {
          if (_this3._isItemsCross(item, currentItem)) {
            indexes.push(item.index);
          }
        });
        itemIndex = indexes.length ? findFreeIndex(indexes, 0) : 0;
        stack.items.push(createItem(currentItem, itemIndex));
        maxIndexInStack = Math.max(itemIndex, maxIndexInStack);
        stack.left = Math.min(stack.left, currentItem.left);
        stack.right = Math.max(stack.right, currentItem.right);
        stack.top = Math.min(stack.top, currentItem.top);
        stack.bottom = Math.max(stack.bottom, currentItem.bottom);
        stack.allDay = currentItem.allDay;
      } else {
        pushItemsInResult(stack.items);
        stack = {};
        startNewStack(currentItem);
        maxIndexInStack = 0;
      }
    }
    if (stack.items) {
      pushItemsInResult(stack.items);
    }
    return result.sort(function (a, b) {
      var columnCondition = a.j - b.j;
      var rowCondition = a.i - b.i;
      return rowCondition || columnCondition;
    });
  };
  _proto._skipSortedIndex = function _skipSortedIndex(index) {
    return index > this._getMaxAppointmentCountPerCell() - 1;
  };
  _proto._findIndexByKey = function _findIndexByKey(arr, iKey, jKey, iValue, jValue) {
    var result = 0;
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i][iKey] === iValue && arr[i][jKey] === jValue) {
        result = i;
        break;
      }
    }
    return result;
  };
  _proto._getExtendedPositionMap = function _getExtendedPositionMap(map, positions) {
    var positionCounter = 0;
    var result = [];
    for (var i = 0, mapLength = map.length; i < mapLength; i++) {
      var resultString = [];
      for (var j = 0, itemLength = map[i].length; j < itemLength; j++) {
        map[i][j].index = positions[positionCounter].index;
        map[i][j].sortedIndex = positions[positionCounter].sortedIndex;
        map[i][j].count = positions[positionCounter++].count;
        resultString.push(map[i][j]);
        this._checkLongCompactAppointment(map[i][j], resultString);
      }
      result.push(resultString);
    }
    return result;
  };
  _proto._checkLongCompactAppointment = function _checkLongCompactAppointment(item, result) {
    this._splitLongCompactAppointment(item, result);
    return result;
  };
  _proto._splitLongCompactAppointment = function _splitLongCompactAppointment(item, result) {
    var appointmentCountPerCell = this._getMaxAppointmentCountPerCellByType(item.allDay);
    var compactCount = 0;
    if (appointmentCountPerCell !== undefined && item.index > appointmentCountPerCell - 1) {
      item.isCompact = true;
      compactCount = this._getCompactAppointmentParts(item.width);
      for (var k = 1; k < compactCount; k++) {
        var compactPart = (0, _extend.extend)(true, {}, item);
        compactPart.left = this._getCompactLeftCoordinate(item.left, k);
        compactPart.columnIndex += k;
        compactPart.sortedIndex = null;
        result.push(compactPart);
      }
    }
    return result;
  };
  _proto._adjustDurationByDaylightDiff = function _adjustDurationByDaylightDiff(duration, startDate, endDate) {
    var daylightDiff = _utils.default.getDaylightOffset(startDate, endDate);
    return this._needAdjustDuration(daylightDiff) ? this._calculateDurationByDaylightDiff(duration, daylightDiff) : duration;
  };
  _proto._needAdjustDuration = function _needAdjustDuration(diff) {
    return diff !== 0;
  };
  _proto._calculateDurationByDaylightDiff = function _calculateDurationByDaylightDiff(duration, diff) {
    return duration + diff * toMs('minute');
  };
  _proto._getCollectorLeftOffset = function _getCollectorLeftOffset(isAllDay) {
    if (isAllDay || !this.isApplyCompactAppointmentOffset()) {
      return 0;
    }
    var dropDownButtonWidth = this.getDropDownAppointmentWidth(this.intervalCount, isAllDay);
    var rightOffset = this._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
    return this.cellWidth - dropDownButtonWidth - rightOffset;
  };
  _proto._markAppointmentAsVirtual = function _markAppointmentAsVirtual(coordinates) {
    var isAllDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var countFullWidthAppointmentInCell = this._getMaxAppointmentCountPerCellByType(isAllDay);
    if (coordinates.count - countFullWidthAppointmentInCell > 0) {
      var top = coordinates.top,
        left = coordinates.left;
      var compactRender = this.isAdaptive || !isAllDay && this.supportCompactDropDownAppointments();
      coordinates.virtual = {
        left: left + this._getCollectorLeftOffset(isAllDay),
        top,
        width: this.getDropDownAppointmentWidth(this.intervalCount, isAllDay),
        height: this.getDropDownAppointmentHeight(),
        index: this._generateAppointmentCollectorIndex(coordinates, isAllDay),
        isAllDay,
        groupIndex: coordinates.groupIndex,
        isCompact: compactRender
      };
    }
  };
  _proto.isApplyCompactAppointmentOffset = function isApplyCompactAppointmentOffset() {
    return this.supportCompactDropDownAppointments();
  };
  _proto.supportCompactDropDownAppointments = function supportCompactDropDownAppointments() {
    return true;
  };
  _proto._generateAppointmentCollectorIndex = function _generateAppointmentCollectorIndex(_ref, isAllDay) {
    var groupIndex = _ref.groupIndex,
      rowIndex = _ref.rowIndex,
      columnIndex = _ref.columnIndex;
    return "".concat(groupIndex, "-").concat(rowIndex, "-").concat(columnIndex, "-").concat(isAllDay);
  };
  _proto._getMaxAppointmentCountPerCellByType = function _getMaxAppointmentCountPerCellByType(isAllDay) {
    var appointmentCountPerCell = this._getMaxAppointmentCountPerCell();
    if ((0, _type.isObject)(appointmentCountPerCell)) {
      return isAllDay ? appointmentCountPerCell.allDay : appointmentCountPerCell.simple;
    }
    return appointmentCountPerCell;
  };
  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount, isAllDay) {
    return this.getPositioningStrategy().getDropDownAppointmentWidth(intervalCount, isAllDay);
  };
  _proto.getDropDownAppointmentHeight = function getDropDownAppointmentHeight() {
    return this.getPositioningStrategy().getDropDownAppointmentHeight();
  };
  _proto.getDropDownButtonAdaptiveSize = function getDropDownButtonAdaptiveSize() {
    return DROP_DOWN_BUTTON_ADAPTIVE_SIZE;
  };
  _proto.getCollectorTopOffset = function getCollectorTopOffset(allDay) {
    return this.getPositioningStrategy().getCollectorTopOffset(allDay);
  };
  _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {
    return this.getPositioningStrategy().getCollectorLeftOffset();
  };
  _proto.getAppointmentDataCalculator = function getAppointmentDataCalculator() {};
  _proto.getVerticalAppointmentHeight = function getVerticalAppointmentHeight(cellHeight, currentAppointmentCountInCell, maxAppointmentsPerCell) {
    var resultMaxAppointmentsPerCell = maxAppointmentsPerCell;
    if ((0, _type.isNumeric)(this.maxAppointmentsPerCell)) {
      var dynamicAppointmentCountPerCell = this._getDynamicAppointmentCountPerCell();
      var maxAppointmentCountDisplayedInCell = dynamicAppointmentCountPerCell.allDay || dynamicAppointmentCountPerCell;
      var maxAppointmentsCount = Math.max(currentAppointmentCountInCell, maxAppointmentCountDisplayedInCell);
      resultMaxAppointmentsPerCell = Math.min(maxAppointmentsCount, maxAppointmentsPerCell);
    }
    return cellHeight / resultMaxAppointmentsPerCell;
  };
  _proto._customizeCoordinates = function _customizeCoordinates(coordinates, cellHeight, appointmentCountPerCell, topOffset, isAllDay) {
    var index = coordinates.index,
      count = coordinates.count;
    var appointmentHeight = this.getVerticalAppointmentHeight(cellHeight, count, appointmentCountPerCell);
    var appointmentTop = coordinates.top + index * appointmentHeight;
    var top = appointmentTop + topOffset;
    var width = coordinates.width;
    var left = coordinates.left;
    if (coordinates.isCompact) {
      this.isAdaptive && this._correctCollectorCoordinatesInAdaptive(coordinates, isAllDay);
      this._markAppointmentAsVirtual(coordinates, isAllDay);
    }
    return {
      height: appointmentHeight,
      width,
      top,
      left,
      empty: this._isAppointmentEmpty(cellHeight, width)
    };
  };
  _proto._isAppointmentEmpty = function _isAppointmentEmpty(height, width) {
    return height < this._getAppointmentMinHeight() || width < this._getAppointmentMinWidth();
  };
  _proto._calculateGeometryConfig = function _calculateGeometryConfig(coordinates) {
    var overlappingMode = this.maxAppointmentsPerCell;
    var offsets = this._getOffsets();
    var appointmentDefaultOffset = this._getAppointmentDefaultOffset();
    var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
    var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
    var maxHeight = this._getMaxHeight();
    if (!(0, _type.isNumeric)(appointmentCountPerCell)) {
      appointmentCountPerCell = coordinates.count;
      ratio = (maxHeight - offsets.unlimited) / maxHeight;
    }
    var topOffset = (1 - ratio) * maxHeight;
    if (overlappingMode === 'auto' || (0, _type.isNumeric)(overlappingMode)) {
      ratio = 1;
      maxHeight -= appointmentDefaultOffset;
      topOffset = appointmentDefaultOffset;
    }
    return {
      height: ratio * maxHeight,
      appointmentCountPerCell,
      offset: topOffset
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getAppointmentCount = function _getAppointmentCount(overlappingMode, coordinates) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getDefaultRatio = function _getDefaultRatio(coordinates, appointmentCountPerCell) {};
  _proto._getOffsets = function _getOffsets() {};
  _proto._getMaxHeight = function _getMaxHeight() {};
  _proto._needVerifyItemSize = function _needVerifyItemSize() {
    return false;
  };
  _proto._getMaxAppointmentCountPerCell = function _getMaxAppointmentCountPerCell() {
    if (!this._maxAppointmentCountPerCell) {
      var overlappingMode = this.maxAppointmentsPerCell;
      var appointmentCountPerCell;
      if ((0, _type.isNumeric)(overlappingMode)) {
        appointmentCountPerCell = overlappingMode;
      }
      if (overlappingMode === 'auto') {
        appointmentCountPerCell = this._getDynamicAppointmentCountPerCell();
      }
      if (overlappingMode === 'unlimited') {
        appointmentCountPerCell = undefined;
      }
      this._maxAppointmentCountPerCell = appointmentCountPerCell;
    }
    return this._maxAppointmentCountPerCell;
  };
  _proto._getDynamicAppointmentCountPerCell = function _getDynamicAppointmentCountPerCell() {
    return this.getPositioningStrategy().getDynamicAppointmentCountPerCell();
  };
  _proto.allDaySupported = function allDaySupported() {
    return false;
  };
  _proto._isCompactTheme = function _isCompactTheme() {
    return ((0, _themes.current)() || '').split('.').pop() === 'compact';
  };
  _proto._getAppointmentDefaultOffset = function _getAppointmentDefaultOffset() {
    return this.getPositioningStrategy().getAppointmentDefaultOffset();
  };
  _proto._getAppointmentDefaultHeight = function _getAppointmentDefaultHeight() {
    return this._getAppointmentHeightByTheme();
  };
  _proto._getAppointmentMinHeight = function _getAppointmentMinHeight() {
    return this._getAppointmentDefaultHeight();
  };
  _proto._getAppointmentHeightByTheme = function _getAppointmentHeightByTheme() {
    return this._isCompactTheme() ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT;
  };
  _proto._getAppointmentDefaultWidth = function _getAppointmentDefaultWidth() {
    return this.getPositioningStrategy()._getAppointmentDefaultWidth();
  };
  _proto._getAppointmentMinWidth = function _getAppointmentMinWidth() {
    return this._getAppointmentDefaultWidth();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._needVerticalGroupBounds = function _needVerticalGroupBounds(allDay) {
    return false;
  };
  _proto._needHorizontalGroupBounds = function _needHorizontalGroupBounds() {
    return false;
  };
  _proto.getAppointmentDurationInMs = function getAppointmentDurationInMs(apptStartDate, apptEndDate, allDay) {
    if (allDay) {
      var appointmentDuration = apptEndDate.getTime() - apptStartDate.getTime();
      var ceilQuantityOfDays = Math.ceil(appointmentDuration / toMs('day'));
      return ceilQuantityOfDays * this.visibleDayDuration;
    }
    var msInHour = toMs('hour');
    var trimmedStartDate = _date.default.trimTime(apptStartDate);
    var trimmedEndDate = _date.default.trimTime(apptEndDate);
    var deltaDate = trimmedEndDate - trimmedStartDate;
    var quantityOfDays = deltaDate / toMs('day') + 1;
    var dayVisibleHours = this.endDayHour - this.startDayHour;
    var appointmentDayHours = dayVisibleHours * quantityOfDays;
    var startHours = (apptStartDate - trimmedStartDate) / msInHour;
    var apptStartDelta = Math.max(0, startHours - this.startDayHour);
    var endHours = Math.max(0, (apptEndDate - trimmedEndDate) / msInHour - this.startDayHour);
    var apptEndDelta = Math.max(0, dayVisibleHours - endHours);
    var result = (appointmentDayHours - (apptStartDelta + apptEndDelta)) * msInHour;
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.getPositionShift = function getPositionShift(timeShift, isAllDay) {
    return {
      top: timeShift * this.cellHeight,
      left: 0,
      cellPosition: 0
    };
  };
  _createClass(BaseRenderingStrategy, [{
    key: "isAdaptive",
    get: function get() {
      return this.options.adaptivityEnabled;
    }
  }, {
    key: "rtlEnabled",
    get: function get() {
      return this.options.rtlEnabled;
    }
  }, {
    key: "startDayHour",
    get: function get() {
      return this.options.startDayHour;
    }
  }, {
    key: "endDayHour",
    get: function get() {
      return this.options.endDayHour;
    }
  }, {
    key: "maxAppointmentsPerCell",
    get: function get() {
      return this.options.maxAppointmentsPerCell;
    }
  }, {
    key: "cellWidth",
    get: function get() {
      return this.options.cellWidth;
    }
  }, {
    key: "cellHeight",
    get: function get() {
      return this.options.cellHeight;
    }
  }, {
    key: "allDayHeight",
    get: function get() {
      return this.options.allDayHeight;
    }
  }, {
    key: "resizableStep",
    get: function get() {
      return this.options.resizableStep;
    }
  }, {
    key: "isGroupedByDate",
    get: function get() {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "visibleDayDuration",
    get: function get() {
      return this.options.visibleDayDuration;
    }
  }, {
    key: "viewStartDayHour",
    get: function get() {
      return this.options.viewStartDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function get() {
      return this.options.viewEndDayHour;
    }
  }, {
    key: "cellDuration",
    get: function get() {
      return this.options.cellDuration;
    }
  }, {
    key: "cellDurationInMinutes",
    get: function get() {
      return this.options.cellDurationInMinutes;
    }
  }, {
    key: "leftVirtualCellCount",
    get: function get() {
      return this.options.leftVirtualCellCount;
    }
  }, {
    key: "topVirtualCellCount",
    get: function get() {
      return this.options.topVirtualCellCount;
    }
  }, {
    key: "positionHelper",
    get: function get() {
      return this.options.positionHelper;
    }
  }, {
    key: "showAllDayPanel",
    get: function get() {
      return this.options.showAllDayPanel;
    }
  }, {
    key: "isGroupedAllDayPanel",
    get: function get() {
      return this.options.isGroupedAllDayPanel;
    }
  }, {
    key: "groupOrientation",
    get: function get() {
      return this.options.groupOrientation;
    }
  }, {
    key: "rowCount",
    get: function get() {
      return this.options.rowCount;
    }
  }, {
    key: "groupCount",
    get: function get() {
      return this.options.groupCount;
    }
  }, {
    key: "currentDate",
    get: function get() {
      return this.options.currentDate;
    }
  }, {
    key: "appointmentCountPerCell",
    get: function get() {
      return this.options.appointmentCountPerCell;
    }
  }, {
    key: "appointmentOffset",
    get: function get() {
      return this.options.appointmentOffset;
    }
  }, {
    key: "allowResizing",
    get: function get() {
      return this.options.allowResizing;
    }
  }, {
    key: "allowAllDayResizing",
    get: function get() {
      return this.options.allowAllDayResizing;
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      return this.options.viewDataProvider;
    }
  }, {
    key: "dataAccessors",
    get: function get() {
      return this.options.dataAccessors;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "intervalCount",
    get: function get() {
      return this.options.intervalCount;
    }
  }, {
    key: "allDayPanelMode",
    get: function get() {
      return this.options.allDayPanelMode;
    }
  }, {
    key: "isVirtualScrolling",
    get: function get() {
      return this.options.isVirtualScrolling;
    }
  }]);
  return BaseRenderingStrategy;
}();
var _default = BaseRenderingStrategy;
exports.default = _default;
