"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Appointment = exports.AgendaAppointment = void 0;
var _translator = require("../../../animation/translator");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../../../core/dom_component"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../events/pointer"));
var _index = require("../../../events/utils/index");
var _date = _interopRequireDefault(require("../../../localization/date"));
var _message = _interopRequireDefault(require("../../../localization/message"));
var _resizable = _interopRequireDefault(require("../../../ui/resizable"));
var _ui = require("../../../ui/tooltip/ui.tooltip");
var _m_classes = require("../m_classes");
var _m_expression_utils = require("../m_expression_utils");
var _m_recurrence = require("../m_recurrence");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* eslint-disable max-classes-per-file */
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
    // @ts-expect-error
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
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.invoke = function invoke(funcName) {
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
        // @ts-expect-error
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
      step,
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
    // @ts-expect-error
    _DOMComponent.prototype._render.call(this);
    this._renderAppointmentGeometry();
    this._renderEmptyClass();
    this._renderReducedAppointment();
    this._renderAllDayClass();
    this._renderDragSourceClass();
    this._renderDirection();
    this.$element().data('dxAppointmentStartDate', this.option('startDate'));
    var text = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'text', this.rawAppointment);
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
      this.$element().addClass(_m_classes.EMPTY_APPOINTMENT_CLASS);
    }
  };
  _proto._renderReducedAppointment = function _renderReducedAppointment() {
    var reducedPart = this.option('reduced');
    if (!reducedPart) {
      return;
    }
    this.$element().toggleClass(_m_classes.REDUCED_APPOINTMENT_CLASS, true).toggleClass(_m_classes.REDUCED_APPOINTMENT_PARTS_CLASSES[reducedPart], true);
    this._renderAppointmentReducedIcon();
  };
  _proto._renderAppointmentReducedIcon = function _renderAppointmentReducedIcon() {
    var $icon = (0, _renderer.default)('<div>').addClass(_m_classes.REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
    var endDate = this._getEndDate();
    var tooltipLabel = _message.default.format('dxScheduler-editorLabelEndDate');
    var tooltipText = [tooltipLabel, ': ', _date.default.format(endDate, 'monthAndDay'), ', ', _date.default.format(endDate, 'year')].join('');
    // @ts-expect-error
    _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME);
    _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERENTER_EVENT_NAME, function () {
      (0, _ui.show)({
        target: $icon,
        content: tooltipText
      });
    });
    // @ts-expect-error
    _events_engine.default.off($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME);
    _events_engine.default.on($icon, REDUCED_APPOINTMENT_POINTERLEAVE_EVENT_NAME, function () {
      (0, _ui.hide)();
    });
  };
  _proto._getEndDate = function _getEndDate() {
    var result = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'endDate', this.rawAppointment);
    if (result) {
      return new Date(result);
    }
    return result;
  };
  _proto._renderAllDayClass = function _renderAllDayClass() {
    this.$element().toggleClass(_m_classes.ALL_DAY_APPOINTMENT_CLASS, !!this.option('allDay'));
  };
  _proto._renderDragSourceClass = function _renderDragSourceClass() {
    this.$element().toggleClass(_m_classes.APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option('isDragSource'));
  };
  _proto._renderRecurrenceClass = function _renderRecurrenceClass() {
    var rule = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'recurrenceRule', this.rawAppointment);
    if ((0, _m_recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(rule)) {
      this.$element().addClass(_m_classes.RECURRENCE_APPOINTMENT_CLASS);
    }
  };
  _proto._renderDirection = function _renderDirection() {
    this.$element().addClass(_m_classes.DIRECTION_APPOINTMENT_CLASSES[this.option('direction')]);
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
      // @ts-expect-error
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
      // @ts-expect-error
      createPlainResourceListAsync: new _deferred.Deferred()
    });
  };
  _proto2._renderResourceList = function _renderResourceList(container, list) {
    list.forEach(function (item) {
      var itemContainer = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(container);
      (0, _renderer.default)('<div>').text("".concat(item.label, ":")).appendTo(itemContainer);
      (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(item.values.join(', ')).appendTo(itemContainer);
    });
  };
  _proto2._render = function _render() {
    var _this2 = this;
    _Appointment.prototype._render.call(this);
    var createPlainResourceListAsync = this.option('createPlainResourceListAsync');
    createPlainResourceListAsync(this.rawAppointment).done(function (list) {
      var parent = _this2.$element().find(".".concat(_m_classes.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS));
      var container = (0, _renderer.default)('<div>').addClass(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(parent);
      _this2._renderResourceList(container, list);
    });
  };
  _createClass(AgendaAppointment, [{
    key: "coloredElement",
    get: function get() {
      return this.$element().find(".".concat(_m_classes.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER));
    }
  }]);
  return AgendaAppointment;
}(Appointment);
exports.AgendaAppointment = AgendaAppointment;