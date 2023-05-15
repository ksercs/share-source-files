!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointments/rendering_strategies/strategy_horizontal_month.js"], ["./strategy_horizontal_month_line","../../workspaces/helpers/positionHelper","../../../../core/utils/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointments/rendering_strategies/strategy_horizontal_month.js", ["./strategy_horizontal_month_line", "../../workspaces/helpers/positionHelper", "../../../../core/utils/date"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _strategy_horizontal_month_line = _interopRequireDefault($__require("./strategy_horizontal_month_line"));
  var _positionHelper = $__require("../../workspaces/helpers/positionHelper");
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var MONTH_APPOINTMENT_HEIGHT_RATIO = 0.6;
  var MONTH_APPOINTMENT_MIN_OFFSET = 26;
  var MONTH_APPOINTMENT_MAX_OFFSET = 30;
  var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
  var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
  var toMs = _date.default.dateToMilliseconds;
  var HorizontalMonthRenderingStrategy = /*#__PURE__*/function (_HorizontalMonthLineR) {
    _inheritsLoose(HorizontalMonthRenderingStrategy, _HorizontalMonthLineR);
    function HorizontalMonthRenderingStrategy() {
      return _HorizontalMonthLineR.apply(this, arguments) || this;
    }
    var _proto = HorizontalMonthRenderingStrategy.prototype;
    _proto._getLeftPosition = function _getLeftPosition(settings) {
      var fullWeekAppointmentWidth = this.getGroupWidth(settings.groupIndex);
      return this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth);
    };
    _proto._getChunkCount = function _getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings) {
      var groupIndex = settings.groupIndex,
          startDate = settings.info.appointment.startDate;
      var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
      var allChunksCount = Math.ceil(rawFullChunksWidth / weekWidth);
      var viewRowIndex = this._tryGetRowIndexInView(startDate);
      if (viewRowIndex !== undefined) {
        var viewChunksCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
        var allowedChunksCount = viewChunksCount - viewRowIndex;
        return allChunksCount <= allowedChunksCount ? allChunksCount : allowedChunksCount;
      }
      return allChunksCount;
    }

    // NOTE: This method tries to get real row index inside appointment's group view.
    // We cannot use settings.rowIndex, because this row index for all date table and not for special group.
    ;
    _proto._tryGetRowIndexInView = function _tryGetRowIndexInView(positionStartDate) {
      var _this$options$dataRan;
      var columnsCount = this.viewDataProvider.getColumnsCount();
      if (((_this$options$dataRan = this.options.dataRange) === null || _this$options$dataRan === void 0 ? void 0 : _this$options$dataRan.length) < 1 || !columnsCount) {
        return undefined;
      }
      var _this$options$dateRan = _slicedToArray(this.options.dateRange, 1),
          startViewDate = _this$options$dateRan[0];
      // NOTE: We cannot take cellDuration from options,
      // because startDayHour/endDayHour takes affect in renovation scheduler.
      var dayDurationMs = toMs('day');
      var timeFromStart = positionStartDate.getTime() - startViewDate.getTime();
      return Math.floor(timeFromStart / dayDurationMs / columnsCount);
    };
    _proto._getChunkWidths = function _getChunkWidths(geometry) {
      var firstChunkWidth = geometry.reducedWidth;
      var fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
      var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
      return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk];
    };
    _proto._getTailChunkSettings = function _getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition) {
      var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
      var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
      var tailChunkLeftPosition = this.rtlEnabled ? rtlPosition : leftPosition;
      return [tailChunkWidth, tailChunkLeftPosition];
    };
    _proto._getAppointmentParts = function _getAppointmentParts(geometry, settings) {
      var result = [];
      var weekWidth = Math.round(this.getGroupWidth(settings.groupIndex));
      var _this$_getChunkWidths = this._getChunkWidths(geometry, settings, weekWidth),
          _this$_getChunkWidths2 = _slicedToArray(_this$_getChunkWidths, 3),
          firstChunkWidth = _this$_getChunkWidths2[0],
          fullChunksWidth = _this$_getChunkWidths2[1],
          withoutFirstChunkWidth = _this$_getChunkWidths2[2];
      var leftPosition = this._getLeftPosition(settings);
      var hasTailChunk = this.endViewDate > settings.info.appointment.endDate;
      var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings);
      var _this$_getTailChunkSe = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition),
          _this$_getTailChunkSe2 = _slicedToArray(_this$_getTailChunkSe, 2),
          tailChunkWidth = _this$_getTailChunkSe2[0],
          tailChunkLeftPosition = _this$_getTailChunkSe2[1];
      for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
        var topPosition = settings.top + this.cellHeight * chunkIndex;
        var isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
        result.push(_extends({}, settings, {
          top: topPosition,
          left: isTailChunk ? tailChunkLeftPosition : leftPosition,
          height: geometry.height,
          width: isTailChunk ? tailChunkWidth : weekWidth,
          appointmentReduced: isTailChunk ? 'tail' : 'body',
          rowIndex: ++settings.rowIndex,
          columnIndex: 0
        }));
      }
      return result;
    };
    _proto._calculateMultiWeekAppointmentLeftOffset = function _calculateMultiWeekAppointmentLeftOffset(max, width) {
      return this.rtlEnabled ? max : max - width;
    };
    _proto.getGroupWidth = function getGroupWidth(groupIndex) {
      return (0, _positionHelper.getGroupWidth)(groupIndex, this.viewDataProvider, {
        intervalCount: this.options.intervalCount,
        currentDate: this.options.currentDate,
        viewType: this.options.viewType,
        hoursInterval: this.options.hoursInterval,
        startDayHour: this.options.startDayHour,
        endDayHour: this.options.endDayHour,
        isVirtualScrolling: this.isVirtualScrolling,
        rtlEnabled: this.rtlEnabled,
        DOMMetaData: this.DOMMetaData
      });
    };
    _proto._getAppointmentDefaultHeight = function _getAppointmentDefaultHeight() {
      return this._getAppointmentHeightByTheme();
    };
    _proto._getAppointmentMinHeight = function _getAppointmentMinHeight() {
      return this._getAppointmentDefaultHeight();
    };
    _proto._columnCondition = function _columnCondition(a, b) {
      var conditions = this._getConditions(a, b);
      return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition;
    };
    _proto.createTaskPositionMap = function createTaskPositionMap(items) {
      return _HorizontalMonthLineR.prototype.createTaskPositionMap.call(this, items, true);
    };
    _proto._getSortedPositions = function _getSortedPositions(map) {
      return _HorizontalMonthLineR.prototype._getSortedPositions.call(this, map, true);
    };
    _proto._getDefaultRatio = function _getDefaultRatio() {
      return MONTH_APPOINTMENT_HEIGHT_RATIO;
    };
    _proto._getOffsets = function _getOffsets() {
      return {
        unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
        auto: MONTH_APPOINTMENT_MAX_OFFSET
      };
    };
    _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth(intervalCount) {
      if (this.adaptivityEnabled) {
        return this.getDropDownButtonAdaptiveSize();
      }
      var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
      return this.cellWidth - offset;
    };
    _proto.needCorrectAppointmentDates = function needCorrectAppointmentDates() {
      return false;
    };
    _proto._needVerticalGroupBounds = function _needVerticalGroupBounds() {
      return false;
    };
    _proto._needHorizontalGroupBounds = function _needHorizontalGroupBounds() {
      return true;
    };
    _proto.getPositionShift = function getPositionShift(timeShift) {
      return {
        cellPosition: timeShift * this.cellWidth,
        top: 0,
        left: 0
      };
    };
    _createClass(HorizontalMonthRenderingStrategy, [{
      key: "endViewDate",
      get: function get() {
        return this.options.endViewDate;
      }
    }, {
      key: "adaptivityEnabled",
      get: function get() {
        return this.options.adaptivityEnabled;
      }
    }, {
      key: "DOMMetaData",
      get: function get() {
        return this.options.DOMMetaData;
      }
    }]);
    return HorizontalMonthRenderingStrategy;
  }(_strategy_horizontal_month_line.default);
  var _default = HorizontalMonthRenderingStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./strategy_horizontal_month_line","../../workspaces/helpers/positionHelper","../../../../core/utils/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./strategy_horizontal_month_line"), require("../../workspaces/helpers/positionHelper"), require("../../../../core/utils/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=strategy_horizontal_month.js.map