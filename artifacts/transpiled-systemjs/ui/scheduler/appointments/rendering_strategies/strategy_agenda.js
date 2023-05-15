!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/appointments/rendering_strategies/strategy_agenda.js"], ["../../../../core/utils/date","../../../../core/utils/iterator","./strategy.base","../../expressionUtils","../../resources/utils","../../appointmentAdapter","../dataProvider/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/appointments/rendering_strategies/strategy_agenda.js", ["../../../../core/utils/date", "../../../../core/utils/iterator", "./strategy.base", "../../expressionUtils", "../../resources/utils", "../../appointmentAdapter", "../dataProvider/utils"], true, function ($__require, exports, module) {
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
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _iterator = $__require("../../../../core/utils/iterator");
  var _strategy = _interopRequireDefault($__require("./strategy.base"));
  var _expressionUtils = $__require("../../expressionUtils");
  var _utils = $__require("../../resources/utils");
  var _appointmentAdapter = $__require("../../appointmentAdapter");
  var _utils2 = $__require("../dataProvider/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
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
  var AgendaRenderingStrategy = /*#__PURE__*/function (_BaseRenderingStrateg) {
    _inheritsLoose(AgendaRenderingStrategy, _BaseRenderingStrateg);
    function AgendaRenderingStrategy() {
      return _BaseRenderingStrateg.apply(this, arguments) || this;
    }
    var _proto = AgendaRenderingStrategy.prototype;
    _proto.getAppointmentMinSize = function getAppointmentMinSize() {};
    _proto.getDeltaTime = function getDeltaTime() {};
    _proto.keepAppointmentSettings = function keepAppointmentSettings() {
      return true;
    };
    _proto.getAppointmentGeometry = function getAppointmentGeometry(geometry) {
      return geometry;
    };
    _proto.groupAppointmentByResources = function groupAppointmentByResources(appointments) {
      var groups = this.instance._getCurrentViewOption('groups');
      var config = {
        loadedResources: this.options.loadedResources,
        resources: this.options.resources,
        dataAccessors: this.dataAccessors.resources
      };
      return (0, _utils.groupAppointmentsByResources)(config, appointments, groups);
    };
    _proto.createTaskPositionMap = function createTaskPositionMap(appointments) {
      var height;
      var appointmentsByResources;
      this.calculateRows(appointments, this.agendaDuration, this.currentDate);
      if (appointments.length) {
        height = this.instance.fire('getAgendaVerticalStepHeight');
        appointmentsByResources = this.groupAppointmentByResources(appointments);
        var groupedAppts = [];
        (0, _iterator.each)(appointmentsByResources, function (i, appts) {
          var additionalAppointments = [];
          var recurrentIndexes = [];
          (0, _iterator.each)(appts, function (index, appointment) {
            var recurrenceBatch = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index);
            var appointmentBatch = null;
            if (!recurrenceBatch.indexes.length) {
              appointmentBatch = this.instance.getAppointmentsInstance()._processLongAppointment(appointment);
              additionalAppointments = additionalAppointments.concat(appointmentBatch.parts);
            }
            additionalAppointments = additionalAppointments.concat(recurrenceBatch.parts);
            recurrentIndexes = recurrentIndexes.concat(recurrenceBatch.indexes);
          }.bind(this));
          this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(recurrentIndexes, appts);
          this.instance.getAppointmentsInstance()._combineAppointments(appts, additionalAppointments);
          groupedAppts = groupedAppts.concat(appts);
        }.bind(this));
        Array.prototype.splice.apply(appointments, [0, appointments.length].concat(groupedAppts));
      }
      var result = [];
      var sortedIndex = 0;
      appointments.forEach(function (appt, index) {
        result.push([{
          height: height,
          width: '100%',
          sortedIndex: sortedIndex++,
          groupIndex: this._calculateGroupIndex(index, appointmentsByResources),
          agendaSettings: appt.settings
        }]);
        delete appt.settings;
      }.bind(this));
      return result;
    };
    _proto._calculateGroupIndex = function _calculateGroupIndex(apptIndex, appointmentsByResources) {
      var resultInd;
      var counter = 0;
      for (var i in appointmentsByResources) {
        var countApptInGroup = appointmentsByResources[i].length;
        if (apptIndex >= counter && apptIndex < counter + countApptInGroup) {
          resultInd = Number(i);
          break;
        }
        counter += countApptInGroup;
      }
      return resultInd;
    };
    _proto._getDeltaWidth = function _getDeltaWidth() {};
    _proto._getAppointmentMaxWidth = function _getAppointmentMaxWidth() {
      return this.cellWidth;
    };
    _proto._needVerifyItemSize = function _needVerifyItemSize() {
      return false;
    };
    _proto._getAppointmentParts = function _getAppointmentParts() {};
    _proto._reduceMultiWeekAppointment = function _reduceMultiWeekAppointment() {};
    _proto.calculateAppointmentHeight = function calculateAppointmentHeight() {
      return 0;
    };
    _proto.calculateAppointmentWidth = function calculateAppointmentWidth() {
      return 0;
    };
    _proto.isAppointmentGreaterThan = function isAppointmentGreaterThan() {};
    _proto.isAllDay = function isAllDay() {
      return false;
    };
    _proto._sortCondition = function _sortCondition() {};
    _proto._rowCondition = function _rowCondition() {};
    _proto._columnCondition = function _columnCondition() {};
    _proto._findIndexByKey = function _findIndexByKey() {};
    _proto._markAppointmentAsVirtual = function _markAppointmentAsVirtual() {};
    _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth() {};
    _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {};
    _proto.getCollectorTopOffset = function getCollectorTopOffset() {}

    // From subscribe
    ;
    _proto.replaceWrongAppointmentEndDate = function replaceWrongAppointmentEndDate(rawAppointment, startDate, endDate) {
      var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(rawAppointment, this.dataAccessors, this.timeZoneCalculator);
      (0, _utils2.replaceWrongEndDate)(adapter, startDate, endDate, this.cellDuration, this.dataAccessors);
    }

    // TODO: get rid of an extra 'needClearSettings' argument
    ;
    _proto.calculateRows = function calculateRows(appointments, agendaDuration, currentDate, needClearSettings) {
      this._rows = [];
      currentDate = _date.default.trimTime(new Date(currentDate));
      var groupedAppointments = this.groupAppointmentByResources(appointments);
      (0, _iterator.each)(groupedAppointments, function (_, currentAppointments) {
        var groupResult = [];
        var appts = {
          indexes: [],
          parts: []
        };
        if (!currentAppointments.length) {
          this._rows.push([]);
          return true;
        }
        (0, _iterator.each)(currentAppointments, function (index, appointment) {
          var startDate = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, 'startDate', appointment);
          var endDate = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, 'endDate', appointment);
          this.replaceWrongAppointmentEndDate(appointment, startDate, endDate);
          needClearSettings && delete appointment.settings;
          var result = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index, false);
          appts.parts = appts.parts.concat(result.parts);
          appts.indexes = appts.indexes.concat(result.indexes);
        }.bind(this));
        this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(appts.indexes, currentAppointments);
        currentAppointments.push.apply(currentAppointments, _toConsumableArray(appts.parts));
        var appointmentCount = currentAppointments.length;
        for (var i = 0; i < agendaDuration; i++) {
          var day = new Date(currentDate);
          day.setMilliseconds(day.getMilliseconds() + 24 * 3600000 * i);
          if (groupResult[i] === undefined) {
            groupResult[i] = 0;
          }
          for (var j = 0; j < appointmentCount; j++) {
            var appointmentData = currentAppointments[j].settings || currentAppointments[j];
            var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(currentAppointments[j], this.dataAccessors, this.timeZoneCalculator);
            var appointmentIsLong = (0, _utils2.getAppointmentTakesSeveralDays)(adapter);
            var appointmentIsRecurrence = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, 'recurrenceRule', currentAppointments[j]);
            if (this.instance.fire('dayHasAppointment', day, appointmentData, true) || !appointmentIsRecurrence && appointmentIsLong && this.instance.fire('dayHasAppointment', day, currentAppointments[j], true)) {
              groupResult[i] += 1;
            }
          }
        }
        this._rows.push(groupResult);
      }.bind(this));
      return this._rows;
    };
    _proto._iterateRow = function _iterateRow(row, obj, index) {
      for (var i = 0; i < row.length; i++) {
        obj.counter = obj.counter + row[i];
        if (obj.counter >= index) {
          obj.indexInRow = i;
          break;
        }
      }
    };
    _proto.getDateByIndex = function getDateByIndex(index, rows, startViewDate) {
      var obj = {
        counter: 0,
        indexInRow: 0
      };
      index++;
      for (var i = 0; i < rows.length; i++) {
        this._iterateRow(rows[i], obj, index);
        if (obj.indexInRow) break;
      }
      return new Date(new Date(startViewDate).setDate(startViewDate.getDate() + obj.indexInRow));
    };
    _proto.getAppointmentDataCalculator = function getAppointmentDataCalculator() {
      return function ($appointment, originalStartDate) {
        var apptIndex = $appointment.index();
        var startViewDate = this.instance.getStartViewDate();
        var calculatedStartDate = this.getDateByIndex(apptIndex, this._rows, startViewDate);
        var wrappedOriginalStartDate = new Date(originalStartDate);
        return {
          startDate: new Date(calculatedStartDate.setHours(wrappedOriginalStartDate.getHours(), wrappedOriginalStartDate.getMinutes(), wrappedOriginalStartDate.getSeconds(), wrappedOriginalStartDate.getMilliseconds()))
        };
      }.bind(this);
    };
    _createClass(AgendaRenderingStrategy, [{
      key: "instance",
      get: function get() {
        return this.options.instance;
      }
    }, {
      key: "agendaDuration",
      get: function get() {
        return this.options.agendaDuration;
      }
    }]);
    return AgendaRenderingStrategy;
  }(_strategy.default);
  var _default = AgendaRenderingStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../../../core/utils/iterator","./strategy.base","../../expressionUtils","../../resources/utils","../../appointmentAdapter","../dataProvider/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../../../core/utils/iterator"), require("./strategy.base"), require("../../expressionUtils"), require("../../resources/utils"), require("../../appointmentAdapter"), require("../dataProvider/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=strategy_agenda.js.map