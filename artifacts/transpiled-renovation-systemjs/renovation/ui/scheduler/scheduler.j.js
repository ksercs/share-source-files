!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scheduler/scheduler.j.js"], ["../../../core/component_registrator","../../component_wrapper/common/component","./scheduler"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/scheduler/scheduler.j.js", ["../../../core/component_registrator", "../../component_wrapper/common/component", "./scheduler"], true, function ($__require, exports, module) {
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
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _component = _interopRequireDefault($__require("../../component_wrapper/common/component"));
  var _scheduler = $__require("./scheduler");
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
  var Scheduler = /*#__PURE__*/function (_BaseComponent) {
    _inheritsLoose(Scheduler, _BaseComponent);
    function Scheduler() {
      return _BaseComponent.apply(this, arguments) || this;
    }
    var _proto = Scheduler.prototype;
    _proto.getProps = function getProps() {
      var props = _BaseComponent.prototype.getProps.call(this);
      props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
      return props;
    };
    _proto.addAppointment = function addAppointment(_appointment) {
      var _this$viewRef;
      return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.addAppointment.apply(_this$viewRef, arguments);
    };
    _proto.deleteAppointment = function deleteAppointment(_appointment) {
      var _this$viewRef2;
      return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.deleteAppointment.apply(_this$viewRef2, arguments);
    };
    _proto.updateAppointment = function updateAppointment(_target, _appointment) {
      var _this$viewRef3;
      return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.updateAppointment.apply(_this$viewRef3, arguments);
    };
    _proto.getDataSource = function getDataSource() {
      var _this$viewRef4;
      return (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.getDataSource.apply(_this$viewRef4, arguments);
    };
    _proto.getEndViewDate = function getEndViewDate() {
      var _this$viewRef5;
      return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.getEndViewDate.apply(_this$viewRef5, arguments);
    };
    _proto.getStartViewDate = function getStartViewDate() {
      var _this$viewRef6;
      return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.getStartViewDate.apply(_this$viewRef6, arguments);
    };
    _proto.hideAppointmentPopup = function hideAppointmentPopup(_saveChanges) {
      var _this$viewRef7;
      return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.hideAppointmentPopup.apply(_this$viewRef7, arguments);
    };
    _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
      var _this$viewRef8;
      return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.hideAppointmentTooltip.apply(_this$viewRef8, arguments);
    };
    _proto.scrollTo = function scrollTo(_date, _group, _allDay) {
      var _this$viewRef9;
      return (_this$viewRef9 = this.viewRef) === null || _this$viewRef9 === void 0 ? void 0 : _this$viewRef9.scrollTo.apply(_this$viewRef9, arguments);
    };
    _proto.scrollToTime = function scrollToTime(_hours, _minutes, _date) {
      var _this$viewRef10;
      return (_this$viewRef10 = this.viewRef) === null || _this$viewRef10 === void 0 ? void 0 : _this$viewRef10.scrollToTime.apply(_this$viewRef10, arguments);
    };
    _proto.showAppointmentPopup = function showAppointmentPopup(_appointmentData, _createNewAppointment, _currentAppointmentData) {
      var _this$viewRef11;
      return (_this$viewRef11 = this.viewRef) === null || _this$viewRef11 === void 0 ? void 0 : _this$viewRef11.showAppointmentPopup.apply(_this$viewRef11, arguments);
    };
    _proto.showAppointmentTooltip = function showAppointmentTooltip(_appointmentData, _target, _currentAppointmentData) {
      var _this$viewRef12;
      var params = [_appointmentData, this._patchElementParam(_target), _currentAppointmentData];
      return (_this$viewRef12 = this.viewRef) === null || _this$viewRef12 === void 0 ? void 0 : _this$viewRef12.showAppointmentTooltip.apply(_this$viewRef12, _toConsumableArray(params.slice(0, arguments.length)));
    };
    _proto._getActionConfigs = function _getActionConfigs() {
      return {
        onAppointmentAdded: {},
        onAppointmentAdding: {},
        onAppointmentClick: {},
        onAppointmentContextMenu: {},
        onAppointmentDblClick: {},
        onAppointmentDeleted: {},
        onAppointmentDeleting: {},
        onAppointmentFormOpening: {},
        onAppointmentRendered: {},
        onAppointmentUpdated: {},
        onAppointmentUpdating: {},
        onCellClick: {},
        onCellContextMenu: {},
        onClick: {}
      };
    };
    _createClass(Scheduler, [{
      key: "_propsInfo",
      get: function get() {
        return {
          twoWay: [['currentDate', 'defaultCurrentDate', 'currentDateChange'], ['currentView', 'defaultCurrentView', 'currentViewChange']],
          allowNull: [],
          elements: [],
          templates: ['dataCellTemplate', 'dateCellTemplate', 'timeCellTemplate', 'resourceCellTemplate', 'appointmentCollectorTemplate', 'appointmentTemplate', 'appointmentTooltipTemplate'],
          props: ['adaptivityEnabled', 'appointmentDragging', 'crossScrollingEnabled', 'dataSource', 'dateSerializationFormat', 'descriptionExpr', 'editing', 'focusStateEnabled', 'groupByDate', 'indicatorUpdateInterval', 'max', 'min', 'noDataText', 'recurrenceEditMode', 'remoteFiltering', 'resources', 'scrolling', 'selectedCellData', 'shadeUntilCurrentTime', 'showAllDayPanel', 'showCurrentTimeIndicator', 'timeZone', 'useDropDownViewSwitcher', 'views', 'endDayHour', 'startDayHour', 'firstDayOfWeek', 'cellDuration', 'groups', 'maxAppointmentsPerCell', 'customizeDateNavigatorText', 'onAppointmentAdded', 'onAppointmentAdding', 'onAppointmentClick', 'onAppointmentContextMenu', 'onAppointmentDblClick', 'onAppointmentDeleted', 'onAppointmentDeleting', 'onAppointmentFormOpening', 'onAppointmentRendered', 'onAppointmentUpdated', 'onAppointmentUpdating', 'onCellClick', 'onCellContextMenu', 'recurrenceExceptionExpr', 'recurrenceRuleExpr', 'startDateExpr', 'startDateTimeZoneExpr', 'endDateExpr', 'endDateTimeZoneExpr', 'allDayExpr', 'textExpr', 'allDayPanelMode', 'dataCellTemplate', 'dateCellTemplate', 'timeCellTemplate', 'resourceCellTemplate', 'appointmentCollectorTemplate', 'appointmentTemplate', 'appointmentTooltipTemplate', 'toolbar', 'defaultCurrentDate', 'currentDateChange', 'defaultCurrentView', 'currentViewChange', 'className', 'accessKey', 'activeStateEnabled', 'disabled', 'height', 'hint', 'hoverStateEnabled', 'onClick', 'onKeyDown', 'rtlEnabled', 'tabIndex', 'visible', 'width', 'currentDate', 'currentView']
        };
      }
    }, {
      key: "_viewComponent",
      get: function get() {
        return _scheduler.Scheduler;
      }
    }]);
    return Scheduler;
  }(_component.default);
  exports.default = Scheduler;
  (0, _component_registrator.default)('dxScheduler', Scheduler);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/component_registrator","../../component_wrapper/common/component","./scheduler"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/component_registrator"), require("../../component_wrapper/common/component"), require("./scheduler"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scheduler.j.js.map