!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/appointment.js"], ["../../../core/renderer","../../../events/core/events_engine","../../../animation/translator","../recurrence","../../../core/utils/extend","../../../core/component_registrator","../../tooltip/ui.tooltip","../../../events/utils/index","../../../events/pointer","../../../core/dom_component","../../resizable","../../../localization/message","../../../localization/date","../classes","../../../core/utils/deferred","../expressionUtils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/appointment.js", ["../../../core/renderer", "../../../events/core/events_engine", "../../../animation/translator", "../recurrence", "../../../core/utils/extend", "../../../core/component_registrator", "../../tooltip/ui.tooltip", "../../../events/utils/index", "../../../events/pointer", "../../../core/dom_component", "../../resizable", "../../../localization/message", "../../../localization/date", "../classes", "../../../core/utils/deferred", "../expressionUtils"], true, function ($__require, exports, module) {
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
  exports.Appointment = exports.AgendaAppointment = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _translator = $__require("../../../animation/translator");
  var _recurrence = $__require("../recurrence");
  var _extend = $__require("../../../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _ui = $__require("../../tooltip/ui.tooltip");
  var _index = $__require("../../../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../../../events/pointer"));
  var _dom_component = _interopRequireDefault($__require("../../../core/dom_component"));
  var _resizable = _interopRequireDefault($__require("../../resizable"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _date = _interopRequireDefault($__require("../../../localization/date"));
  var _classes = $__require("../classes");
  var _deferred = $__require("../../../core/utils/deferred");
  var _expressionUtils = $__require("../expressionUtils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var DEFAULT_HORIZONTAL_HANDLES = 'left right';
  var DEFAULT_VERTICAL_HANDLES = 'top bottom';
  var REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.enter, 'dxSchedulerAppointment');
  var REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.leave, 'dxSchedulerAppointment');
  var Appointment = /*#__PURE__*/function (_DOMComponent) {
    _inheritsLoose(Appointment, _DOMComponent);
    function Appointment() {
      return _DOMComponent.apply(this, arguments) || this;
    }
    var _proto = Appointment.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_DOMComponent.prototype._getDefaultOptions.call(this), {
        data: {},
        groupIndex: -1,
        groups: [],
        geometry: {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        },
        allowDrag: true,
        allowResize: true,
        reduced: null,
        isCompact: false,
        direction: 'vertical',
        resizableConfig: {
          keepAspectRatio: false
        },
        cellHeight: 0,
        cellWidth: 0,
        isDragSource: false
      });
    };
    _proto.notifyObserver = function notifyObserver(subject, args) {
      var observer = this.option('observer');
      if (observer) {
        observer.fire(subject, args);
      }
    };
    _proto.invoke = function invoke() {
      var observer = this.option('observer');
      if (observer) {
        return observer.fire.apply(observer, arguments);
      }
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'data':
        case 'groupIndex':
        case 'geometry':
        case 'allowDrag':
        case 'allowResize':
        case 'reduced':
        case 'sortedIndex':
        case 'isCompact':
        case 'direction':
        case 'resizableConfig':
        case 'cellHeight':
        case 'cellWidth':
          this._invalidate();
          break;
        case 'isDragSource':
          this._renderDragSourceClass();
          break;
        default:
          _DOMComponent.prototype._optionChanged.call(this, args);
      }
    };
    _proto._getHorizontalResizingRule = function _getHorizontalResizingRule() {
      var reducedHandles = {
        head: this.option('rtlEnabled') ? 'right' : 'left',
        body: '',
        tail: this.option('rtlEnabled') ? 'left' : 'right'
      };
      var getResizableStep = this.option('getResizableStep');
      var step = getResizableStep ? getResizableStep() : 0;
      return {
        handles: this.option('reduced') ? reducedHandles[this.option('reduced')] : DEFAULT_HORIZONTAL_HANDLES,
        minHeight: 0,
        minWidth: this.invoke('getCellWidth'),
        step: step,
        roundStepValue: false
      };
    };
    _proto._getVerticalResizingRule = function _getVerticalResizingRule() {
      var height = Math.round(this.invoke('getCellHeight'));
      return {
        handles: DEFAULT_VERTICAL_HANDLES,
        minWidth: 0,
        minHeight: height,
        step: height,
        roundStepValue: true
      };
    };
    _proto._render = function _render() {
      _DOMComponent.prototype._render.call(this);
      this._renderAppointmentGeometry();
      this._renderEmptyClass();
      this._renderReducedAppointment();
      this._renderAllDayClass();
      this._renderDragSourceClass();
      this._renderDirection();
      this.$element().data('dxAppointmentStartDate', this.option('startDate'));
      var text = _expressionUtils.ExpressionUtils.getField(this.option('dataAccessors'), 'text', this.rawAppointment);
      this.$element().attr('title', text);
      this.$element().attr('role', 'button');
      this._renderRecurrenceClass();
      this._renderResizable();
      this._setResourceColor();
    };
    _proto._setResourceColor = function _setResourceColor() {
      var _this = this;
      var appointmentConfig = {
        itemData: this.rawAppointment,
        groupIndex: this.option('groupIndex'),
        groups: this.option('groups')
      };
      var deferredColor = this.option('getAppointmentColor')(appointmentConfig);
      deferredColor.done(function (color) {
        return color && _this.coloredElement.css('backgroundColor', color);
      });
    };
    _proto._renderAppointmentGeometry = function _renderAppointmentGeometry() {
      var geometry = this.option('geometry');
      var $element = this.$element();
      (0, _translator.move)($element, {
        top: geometry.top,
        left: geometry.left
      });
      $element.css({
        width: geometry.width < 0 ? 0 : geometry.width,
        height: geometry.height < 0 ? 0 : geometry.height
      });
    };
    _proto._renderEmptyClass = function _renderEmptyClass() {
      var geometry = this.option('geometry');
      if (geometry.empty || this.option('isCompact')) {
        this.$element().addClass(_classes.EMPTY_APPOINTMENT_CLASS);
      }
    };
    _proto._renderReducedAppointment = function _renderReducedAppointment() {
      var reducedPart = this.option('reduced');
      if (!reducedPart) {
        return;
      }
      this.$element().toggleClass(_classes.REDUCED_APPOINTMENT_CLASS, true).toggleClass(_classes.REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
      this._renderAppointmentReducedIcon();
    };
    _proto._renderAppointmentReducedIcon = function _renderAppointmentReducedIcon() {
      var $icon = (0, _renderer.default)('<div>').addClass(_classes.REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
      var endDate = this._getEndDate();
      var tooltipLabel = _message.default.format('dxScheduler-editorLabelEndDate');
      var tooltipText = [tooltipLabel, ': ', _date.default.format(endDate, 'monthAndDay'), ', ', _date.default.format(endDate, 'year')].join('');
      _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
      _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, function () {
        (0, _ui.show)({
          target: $icon,
          content: tooltipText
        });
      });
      _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
      _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, function () {
        (0, _ui.hide)();
      });
    };
    _proto._getEndDate = function _getEndDate() {
      var result = _expressionUtils.ExpressionUtils.getField(this.option('dataAccessors'), 'endDate', this.rawAppointment);
      if (result) {
        return new Date(result);
      }
      return result;
    };
    _proto._renderAllDayClass = function _renderAllDayClass() {
      this.$element().toggleClass(_classes.ALL_DAY_APPOINTMENT_CLASS, !!this.option('allDay'));
    };
    _proto._renderDragSourceClass = function _renderDragSourceClass() {
      this.$element().toggleClass(_classes.APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option('isDragSource'));
    };
    _proto._renderRecurrenceClass = function _renderRecurrenceClass() {
      var rule = _expressionUtils.ExpressionUtils.getField(this.option('dataAccessors'), 'recurrenceRule', this.rawAppointment);
      if ((0, _recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(rule)) {
        this.$element().addClass(_classes.RECURRENCE_APPOINTMENT_CLASS);
      }
    };
    _proto._renderDirection = function _renderDirection() {
      this.$element().addClass(_classes.DIRECTION_APPOINTMENT_CLASSES[this.option('direction')]);
    };
    _proto._createResizingConfig = function _createResizingConfig() {
      var config = this.option('direction') === 'vertical' ? this._getVerticalResizingRule() : this._getHorizontalResizingRule();
      if (!this.invoke('isGroupedByDate')) {
        config.stepPrecision = 'strict';
      }
      return config;
    };
    _proto._renderResizable = function _renderResizable() {
      if (this.option('allowResize')) {
        this._createComponent(this.$element(), _resizable.default, (0, _extend.extend)(this._createResizingConfig(), this.option('resizableConfig')));
      }
    };
    _proto._useTemplates = function _useTemplates() {
      return false;
    };
    _createClass(Appointment, [{
      key: "coloredElement",
      get: function get() {
        return this.$element();
      }
    }, {
      key: "rawAppointment",
      get: function get() {
        return this.option('data');
      }
    }]);
    return Appointment;
  }(_dom_component.default);
  exports.Appointment = Appointment;
  (0, _component_registrator.default)('dxSchedulerAppointment', Appointment);
  var AgendaAppointment = /*#__PURE__*/function (_Appointment) {
    _inheritsLoose(AgendaAppointment, _Appointment);
    function AgendaAppointment() {
      return _Appointment.apply(this, arguments) || this;
    }
    var _proto2 = AgendaAppointment.prototype;
    _proto2._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Appointment.prototype._getDefaultOptions.call(this), {
        createPlainResourceListAsync: new _deferred.Deferred()
      });
    };
    _proto2._renderResourceList = function _renderResourceList(container, list) {
      list.forEach(function (item) {
        var itemContainer = (0, _renderer.default)('<div>').addClass(_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(container);
        (0, _renderer.default)('<div>').text("".concat(item.label, ":")).appendTo(itemContainer);
        (0, _renderer.default)('<div>').addClass(_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(item.values.join(', ')).appendTo(itemContainer);
      });
    };
    _proto2._render = function _render() {
      var _this2 = this;
      _Appointment.prototype._render.call(this);
      var createPlainResourceListAsync = this.option('createPlainResourceListAsync');
      createPlainResourceListAsync(this.rawAppointment).done(function (list) {
        var parent = _this2.$element().find(".".concat(_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS));
        var container = (0, _renderer.default)('<div>').addClass(_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(parent);
        _this2._renderResourceList(container, list);
      });
    };
    _createClass(AgendaAppointment, [{
      key: "coloredElement",
      get: function get() {
        return this.$element().find(".".concat(_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER));
      }
    }]);
    return AgendaAppointment;
  }(Appointment);
  exports.AgendaAppointment = AgendaAppointment;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../events/core/events_engine","../../../animation/translator","../recurrence","../../../core/utils/extend","../../../core/component_registrator","../../tooltip/ui.tooltip","../../../events/utils/index","../../../events/pointer","../../../core/dom_component","../../resizable","../../../localization/message","../../../localization/date","../classes","../../../core/utils/deferred","../expressionUtils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../events/core/events_engine"), require("../../../animation/translator"), require("../recurrence"), require("../../../core/utils/extend"), require("../../../core/component_registrator"), require("../../tooltip/ui.tooltip"), require("../../../events/utils/index"), require("../../../events/pointer"), require("../../../core/dom_component"), require("../../resizable"), require("../../../localization/message"), require("../../../localization/date"), require("../classes"), require("../../../core/utils/deferred"), require("../expressionUtils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=appointment.js.map