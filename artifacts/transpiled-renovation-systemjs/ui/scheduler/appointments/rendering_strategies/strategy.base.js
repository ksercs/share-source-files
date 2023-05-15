!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/rendering_strategies/strategy.base.js"], ["./appointmentsPositioning_strategy_base","./appointmentsPositioning_strategy_adaptive","../../../../core/utils/extend","../../../../core/utils/date","../../../../core/utils/type","../../../themes","../settingsGenerator","../../utils.timeZone","../../appointmentAdapter","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/rendering_strategies/strategy.base.js", ["./appointmentsPositioning_strategy_base", "./appointmentsPositioning_strategy_adaptive", "../../../../core/utils/extend", "../../../../core/utils/date", "../../../../core/utils/type", "../../../themes", "../settingsGenerator", "../../utils.timeZone", "../../appointmentAdapter", "../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _appointmentsPositioning_strategy_base = _interopRequireDefault($__require("./appointmentsPositioning_strategy_base"));
  var _appointmentsPositioning_strategy_adaptive = _interopRequireDefault($__require("./appointmentsPositioning_strategy_adaptive"));
  var _extend = $__require("../../../../core/utils/extend");
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _type = $__require("../../../../core/utils/type");
  var _themes = $__require("../../../themes");
  var _settingsGenerator = $__require("../settingsGenerator");
  var _utils = _interopRequireDefault($__require("../../utils.timeZone"));
  var _appointmentAdapter = $__require("../../appointmentAdapter");
  var _getAppointmentTakesAllDay = $__require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
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
      coordinates.top = coordinates.top + this.getCollectorTopOffset(isAllDay);
      coordinates.left = coordinates.left + this.getCollectorLeftOffset();
    };
    _proto._initPositioningStrategy = function _initPositioningStrategy() {
      this._positioningStrategy = this.isAdaptive ? new _appointmentsPositioning_strategy_adaptive.default(this) : new _appointmentsPositioning_strategy_base.default(this);
    };
    _proto.getPositioningStrategy = function getPositioningStrategy() {
      return this._positioningStrategy;
    };
    _proto.getAppointmentMinSize = function getAppointmentMinSize() {
      return APPOINTMENT_MIN_SIZE;
    };
    _proto.keepAppointmentSettings = function keepAppointmentSettings() {
      return false;
    };
    _proto.getDeltaTime = function getDeltaTime() {};
    _proto.getAppointmentGeometry = function getAppointmentGeometry(coordinates) {
      return coordinates;
    };
    _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
      return true;
    };
    _proto.getDirection = function getDirection() {
      return 'horizontal';
    };
    _proto.createTaskPositionMap = function createTaskPositionMap(items) {
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
            width: width
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
              height: height
            }, position[j]);
            if (this.rtlEnabled) {
              position[j].left = currentMaxAllowedPosition;
            }
          }
        }
        (0, _extend.extend)(position[j], {
          height: height,
          width: resultWidth,
          allDay: allDay,
          rowIndex: initialRowIndex,
          columnIndex: initialColumnIndex,
          appointmentReduced: appointmentReduced
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
      return new _settingsGenerator.AppointmentSettingsGenerator(_extends({
        rawAppointment: rawAppointment,
        appointmentTakesAllDay: this.isAppointmentTakesAllDay(rawAppointment),
        // TODO move to the settings
        getPositionShiftCallback: this.getPositionShift.bind(this)
      }, this.options));
    };
    _proto.generateAppointmentSettings = function generateAppointmentSettings(rawAppointment) {
      return this.getAppointmentSettingsGenerator(rawAppointment).create();
    };
    _proto.isAppointmentTakesAllDay = function isAppointmentTakesAllDay(rawAppointment) {
      var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(rawAppointment, this.dataAccessors, this.timeZoneCalculator);
      return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(adapter, this.viewStartDayHour, this.viewEndDayHour, this.allDayPanelMode);
    };
    _proto._getAppointmentParts = function _getAppointmentParts() {
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
    };
    _proto.calculateAppointmentHeight = function calculateAppointmentHeight() {
      return 0;
    };
    _proto.calculateAppointmentWidth = function calculateAppointmentWidth() {
      return 0;
    };
    _proto.isAppointmentGreaterThan = function isAppointmentGreaterThan(etalon, comparisonParameters) {
      var result = comparisonParameters.left + comparisonParameters.width - etalon;
      if (this.rtlEnabled) {
        result = etalon + comparisonParameters.width - comparisonParameters.left;
      }
      return result > this.cellWidth / 2;
    };
    _proto.isAllDay = function isAllDay() {
      return false;
    };
    _proto.cropAppointmentWidth = function cropAppointmentWidth(width, cellWidth) {
      // TODO get rid of this
      return this.isGroupedByDate ? cellWidth : width;
    };
    _proto._getSortedPositions = function _getSortedPositions(positionList) {
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
          allDay: allDay
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
    };
    _proto._sortCondition = function _sortCondition() {};
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
      } else {
        return false;
      }
    };
    _proto._checkItemsCrossing = function _checkItemsCrossing(firstItem, secondItem, orientation) {
      var firstItemSide_1 = Math.floor(firstItem[orientation[0]]);
      var firstItemSide_2 = Math.floor(firstItem[orientation[1]]);
      var secondItemSide_1 = Math.ceil(secondItem[orientation[0]]);
      var secondItemSide_2 = Math.ceil(secondItem[orientation[1]]);
      var isItemCross = Math.abs(firstItem[orientation[2]] - secondItem[orientation[2]]) <= 1;
      return isItemCross && (firstItemSide_1 <= secondItemSide_1 && firstItemSide_2 > secondItemSide_1 || firstItemSide_1 < secondItemSide_2 && firstItemSide_2 >= secondItemSide_2 || firstItemSide_1 === secondItemSide_1 && firstItemSide_2 === secondItemSide_2);
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
        } else {
          return index;
        }
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
        } else {
          if (this._isItemsCross(stack, currentItem)) {
            stack.items.forEach(function (item, index) {
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
      }
      if (stack.items) {
        pushItemsInResult(stack.items);
      }
      return result.sort(function (a, b) {
        var columnCondition = a.j - b.j;
        var rowCondition = a.i - b.i;
        return rowCondition ? rowCondition : columnCondition;
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
          compactPart.columnIndex = compactPart.columnIndex + k;
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
          top: top,
          width: this.getDropDownAppointmentWidth(this.intervalCount, isAllDay),
          height: this.getDropDownAppointmentHeight(),
          index: this._generateAppointmentCollectorIndex(coordinates, isAllDay),
          isAllDay: isAllDay,
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
      } else {
        return appointmentCountPerCell;
      }
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
        width: width,
        top: top,
        left: left,
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
        maxHeight = maxHeight - appointmentDefaultOffset;
        topOffset = appointmentDefaultOffset;
      }
      return {
        height: ratio * maxHeight,
        appointmentCountPerCell: appointmentCountPerCell,
        offset: topOffset
      };
    };
    _proto._getAppointmentCount = function _getAppointmentCount() {};
    _proto._getDefaultRatio = function _getDefaultRatio() {};
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
      // TODO get rid of depending from themes
      return this._isCompactTheme() ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT;
    };
    _proto._getAppointmentDefaultWidth = function _getAppointmentDefaultWidth() {
      return this.getPositioningStrategy()._getAppointmentDefaultWidth();
    };
    _proto._getAppointmentMinWidth = function _getAppointmentMinWidth() {
      return this._getAppointmentDefaultWidth();
    };
    _proto._needVerticalGroupBounds = function _needVerticalGroupBounds() {
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
    };
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
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./appointmentsPositioning_strategy_base","./appointmentsPositioning_strategy_adaptive","../../../../core/utils/extend","../../../../core/utils/date","../../../../core/utils/type","../../../themes","../settingsGenerator","../../utils.timeZone","../../appointmentAdapter","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./appointmentsPositioning_strategy_base"), require("./appointmentsPositioning_strategy_adaptive"), require("../../../../core/utils/extend"), require("../../../../core/utils/date"), require("../../../../core/utils/type"), require("../../../themes"), require("../settingsGenerator"), require("../../utils.timeZone"), require("../../appointmentAdapter"), require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=strategy.base.js.map