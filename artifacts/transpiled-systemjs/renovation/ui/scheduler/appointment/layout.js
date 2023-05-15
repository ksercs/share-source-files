!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scheduler/appointment/layout.js"], ["inferno","@devextreme/runtime/inferno","./appointment","./overflow_indicator/layout","../../../utils/combine_classes","../appointments_context","../../../utils/subscribe_to_event"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scheduler/appointment/layout.js", ["inferno", "@devextreme/runtime/inferno", "./appointment", "./overflow_indicator/layout", "../../../utils/combine_classes", "../appointments_context", "../../../utils/subscribe_to_event"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.AppointmentLayoutProps = exports.AppointmentLayout = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _appointment = $__require("./appointment");
  var _layout = $__require("./overflow_indicator/layout");
  var _combine_classes = $__require("../../../utils/combine_classes");
  var _appointments_context = $__require("../appointments_context");
  var _subscribe_to_event = $__require("../../../utils/subscribe_to_event");
  var _excluded = ["isAllDay"];
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
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
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var SELECTOR = {
    appointment: '.dx-scheduler-appointment',
    allDay: 'dx-scheduler-all-day-appointment',
    collector: 'dx-scheduler-appointment-collector'
  };
  var viewFunction = function viewFunction(_ref) {
    var appointments = _ref.appointments,
        _ref$appointmentsCont = _ref.appointmentsContextValue,
        appointmentTemplate = _ref$appointmentsCont.appointmentTemplate,
        groups = _ref$appointmentsCont.groups,
        hideReducedIconTooltip = _ref$appointmentsCont.hideReducedIconTooltip,
        onAppointmentClick = _ref$appointmentsCont.onAppointmentClick,
        onAppointmentDoubleClick = _ref$appointmentsCont.onAppointmentDoubleClick,
        overflowIndicatorTemplate = _ref$appointmentsCont.overflowIndicatorTemplate,
        showReducedIconTooltip = _ref$appointmentsCont.showReducedIconTooltip,
        classes = _ref.classes,
        layoutRef = _ref.layoutRef,
        overflowIndicators = _ref.overflowIndicators;
    return (0, _inferno.createVNode)(1, "div", classes, [appointments.map(function (item, index) {
      return (0, _inferno.createComponentVNode)(2, _appointment.Appointment, {
        "viewModel": item,
        "appointmentTemplate": appointmentTemplate,
        "index": index,
        "groups": groups,
        "onItemClick": onAppointmentClick,
        "onItemDoubleClick": onAppointmentDoubleClick,
        "showReducedIconTooltip": showReducedIconTooltip,
        "hideReducedIconTooltip": hideReducedIconTooltip
      }, item.key);
    }), overflowIndicators.map(function (item, index) {
      return (0, _inferno.createComponentVNode)(2, _layout.OverflowIndicator, {
        "viewModel": item,
        "groups": groups,
        "overflowIndicatorTemplate": overflowIndicatorTemplate,
        "data-index": index
      }, item.key);
    })], 0, null, null, layoutRef);
  };
  exports.viewFunction = viewFunction;
  var AppointmentLayoutProps = {
    isAllDay: false
  };
  exports.AppointmentLayoutProps = AppointmentLayoutProps;
  var AppointmentLayout = /*#__PURE__*/function (_InfernoWrapperCompon) {
    _inheritsLoose(AppointmentLayout, _InfernoWrapperCompon);
    function AppointmentLayout(props) {
      var _this;
      _this = _InfernoWrapperCompon.call(this, props) || this;
      _this.state = {};
      _this.layoutRef = (0, _inferno.createRef)();
      _this.__getterCache = {};
      _this.pointerEventsEffect = _this.pointerEventsEffect.bind(_assertThisInitialized(_this));
      _this.onAppointmentPointerDown = _this.onAppointmentPointerDown.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = AppointmentLayout.prototype;
    _proto.createEffects = function createEffects() {
      return [new _inferno2.InfernoEffect(this.pointerEventsEffect, [this.appointmentsContextValue]), (0, _inferno2.createReRenderEffect)()];
    };
    _proto.updateEffects = function updateEffects() {
      var _this$_effects$;
      (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.appointmentsContextValue]);
    };
    _proto.pointerEventsEffect = function pointerEventsEffect() {
      var _this2 = this;
      var disposePointerDown = (0, _subscribe_to_event.subscribeToDXPointerDownEvent)(this.layoutRef.current, function (e) {
        return _this2.onAppointmentPointerDown(e);
      });
      return function () {
        disposePointerDown();
      };
    };
    _proto.onAppointmentPointerDown = function onAppointmentPointerDown(e) {
      var appointmentElement = e.target.closest(SELECTOR.appointment);
      if (appointmentElement) {
        var index = appointmentElement.dataset.index;
        var focusedAppointmentIndex = index ? parseInt(index, 10) : -1;
        var isAllDay = appointmentElement.classList.contains(SELECTOR.allDay);
        var isCompact = appointmentElement.classList.contains(SELECTOR.collector);
        var typeMap = {
          allDayCompact: isAllDay && isCompact,
          allDay: isAllDay && !isCompact,
          regularCompact: !isAllDay && isCompact,
          regular: !isAllDay && !isCompact
        };
        var appointmentType = Object.entries(typeMap).filter(function (item) {
          return item[1];
        })[0][0];
        this.appointmentsContextValue.updateFocusedAppointment(appointmentType, focusedAppointmentIndex);
      }
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
      if (this.props['isAllDay'] !== nextProps['isAllDay'] || this.context[_appointments_context.AppointmentsContext.id] !== context[_appointments_context.AppointmentsContext.id]) {
        this.__getterCache['appointments'] = undefined;
      }
      if (this.props['isAllDay'] !== nextProps['isAllDay'] || this.context[_appointments_context.AppointmentsContext.id] !== context[_appointments_context.AppointmentsContext.id]) {
        this.__getterCache['overflowIndicators'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        layoutRef: this.layoutRef,
        appointmentsContextValue: this.appointmentsContextValue,
        classes: this.classes,
        appointments: this.appointments,
        overflowIndicators: this.overflowIndicators,
        onAppointmentPointerDown: this.onAppointmentPointerDown,
        restAttributes: this.restAttributes
      });
    };
    _createClass(AppointmentLayout, [{
      key: "appointmentsContextValue",
      get: function get() {
        if (this.context[_appointments_context.AppointmentsContext.id]) {
          return this.context[_appointments_context.AppointmentsContext.id];
        }
        return _appointments_context.AppointmentsContext.defaultValue;
      }
    }, {
      key: "classes",
      get: function get() {
        var isAllDay = this.props.isAllDay;
        return (0, _combine_classes.combineClasses)({
          'dx-scheduler-scrollable-appointments': !isAllDay,
          'dx-scheduler-all-day-appointments': isAllDay
        });
      }
    }, {
      key: "appointments",
      get: function get() {
        var _this3 = this;
        if (this.__getterCache['appointments'] !== undefined) {
          return this.__getterCache['appointments'];
        }
        return this.__getterCache['appointments'] = function () {
          if (_this3.props.isAllDay) {
            return _this3.appointmentsContextValue.viewModel.allDay;
          }
          return _this3.appointmentsContextValue.viewModel.regular;
        }();
      }
    }, {
      key: "overflowIndicators",
      get: function get() {
        var _this4 = this;
        if (this.__getterCache['overflowIndicators'] !== undefined) {
          return this.__getterCache['overflowIndicators'];
        }
        return this.__getterCache['overflowIndicators'] = function () {
          if (_this4.props.isAllDay) {
            return _this4.appointmentsContextValue.viewModel.allDayCompact;
          }
          return _this4.appointmentsContextValue.viewModel.regularCompact;
        }();
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            isAllDay = _this$props.isAllDay,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return AppointmentLayout;
  }(_inferno2.InfernoWrapperComponent);
  exports.AppointmentLayout = AppointmentLayout;
  AppointmentLayout.defaultProps = AppointmentLayoutProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./appointment","./overflow_indicator/layout","../../../utils/combine_classes","../appointments_context","../../../utils/subscribe_to_event"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./appointment"), require("./overflow_indicator/layout"), require("../../../utils/combine_classes"), require("../appointments_context"), require("../../../utils/subscribe_to_event"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=layout.js.map