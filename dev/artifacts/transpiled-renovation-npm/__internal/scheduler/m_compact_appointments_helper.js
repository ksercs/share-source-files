"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompactAppointmentsHelper = void 0;
var _translator = require("../../animation/translator");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _function_template = require("../../core/templates/function_template");
var _deferred = require("../../core/utils/deferred");
var _position = require("../../core/utils/position");
var _message = _interopRequireDefault(require("../../localization/message"));
var _utils = require("../../renovation/ui/scheduler/appointment/overflow_indicator/utils");
var _button = _interopRequireDefault(require("../../ui/button"));
var _m_appointment_adapter = require("./m_appointment_adapter");
var _m_constants = require("./m_constants");
var _m_data_structures = require("./m_data_structures");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
var COMPACT_APPOINTMENT_COLLECTOR_CLASS = "".concat(APPOINTMENT_COLLECTOR_CLASS, "-compact");
var APPOINTMENT_COLLECTOR_CONTENT_CLASS = "".concat(APPOINTMENT_COLLECTOR_CLASS, "-content");
var WEEK_VIEW_COLLECTOR_OFFSET = 5;
var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
var CompactAppointmentsHelper = /*#__PURE__*/function () {
  function CompactAppointmentsHelper(instance) {
    this.instance = instance;
    this.elements = [];
  }
  var _proto = CompactAppointmentsHelper.prototype;
  _proto.render = function render(options) {
    var isCompact = options.isCompact,
      items = options.items,
      buttonColor = options.buttonColor;
    var template = this._createTemplate(items.data.length, isCompact);
    var button = this._createCompactButton(template, options);
    var $button = button.$element();
    this._makeBackgroundColor($button, items.colors, buttonColor);
    this._makeBackgroundDarker($button);
    this.elements.push($button);
    $button.data('items', this._createTooltipInfos(items));
    return $button;
  };
  _proto.clear = function clear() {
    this.elements.forEach(function (button) {
      button.detach();
      button.remove();
    });
    this.elements = [];
  };
  _proto._createTooltipInfos = function _createTooltipInfos(items) {
    var _this = this;
    return items.data.map(function (appointment, index) {
      var _a;
      var targetedAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(appointment, _this.instance._dataAccessors, _this.instance.timeZoneCalculator).clone();
      if (((_a = items.settings) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        var info = items.settings[index].info;
        targetedAdapter.startDate = info.sourceAppointment.startDate;
        targetedAdapter.endDate = info.sourceAppointment.endDate;
      }
      return new _m_data_structures.AppointmentTooltipInfo(appointment, targetedAdapter.source(), items.colors[index], items.settings[index]);
    });
  };
  _proto._onButtonClick = function _onButtonClick(e, options) {
    var $button = (0, _renderer.default)(e.element);
    this.instance.showAppointmentTooltipCore($button, $button.data('items'), this._getExtraOptionsForTooltip(options, $button));
  };
  _proto._getExtraOptionsForTooltip = function _getExtraOptionsForTooltip(options, $appointmentCollector) {
    return {
      clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
      dragBehavior: options.allowDrag && this._createTooltipDragBehavior($appointmentCollector).bind(this),
      dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
      isButtonClick: true
    };
  };
  _proto._clickEvent = function _clickEvent(onAppointmentClick) {
    var _this2 = this;
    return function (e) {
      var clickEventArgs = _this2.instance._createEventArgs(e);
      onAppointmentClick(clickEventArgs);
    };
  };
  _proto._createTooltipDragBehavior = function _createTooltipDragBehavior($appointmentCollector) {
    var _this3 = this;
    return function (e) {
      var $element = (0, _renderer.default)(e.element);
      var $schedulerElement = (0, _renderer.default)(_this3.instance.element());
      var workSpace = _this3.instance.getWorkSpace();
      var getItemData = function getItemData(itemElement) {
        var _a;
        return (_a = (0, _renderer.default)(itemElement).data(_m_constants.LIST_ITEM_DATA_KEY)) === null || _a === void 0 ? void 0 : _a.appointment;
      };
      var getItemSettings = function getItemSettings(_, event) {
        return event.itemSettings;
      };
      var initialPosition = (0, _translator.locate)($appointmentCollector);
      var options = {
        filter: ".".concat(_m_constants.LIST_ITEM_CLASS),
        isSetCursorOffset: true,
        initialPosition,
        getItemData,
        getItemSettings
      };
      workSpace._createDragBehaviorBase($element, $schedulerElement, options);
    };
  };
  _proto._getCollectorOffset = function _getCollectorOffset(width, cellWidth) {
    return cellWidth - width - this._getCollectorRightOffset();
  };
  _proto._getCollectorRightOffset = function _getCollectorRightOffset() {
    return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
  };
  _proto._makeBackgroundDarker = function _makeBackgroundDarker(button) {
    button.css('boxShadow', "inset ".concat((0, _position.getBoundingRect)(button.get(0)).width, "px 0 0 0 rgba(0, 0, 0, 0.3)"));
  };
  _proto._makeBackgroundColor = function _makeBackgroundColor($button, colors, color) {
    _deferred.when.apply(null, colors).done(function () {
      this._makeBackgroundColorCore($button, color, Array.prototype.slice.call(arguments));
    }.bind(this));
  };
  _proto._makeBackgroundColorCore = function _makeBackgroundColorCore($button, color, itemColors) {
    color && color.done(function (color) {
      var backgroundColor = (0, _utils.getOverflowIndicatorColor)(color, itemColors);
      if (backgroundColor) {
        $button.css('backgroundColor', backgroundColor);
      }
    });
  };
  _proto._setPosition = function _setPosition(element, position) {
    (0, _translator.move)(element, {
      top: position.top,
      left: position.left
    });
  };
  _proto._createCompactButton = function _createCompactButton(template, options) {
    var _this4 = this;
    var $button = this._createCompactButtonElement(options);
    return this.instance._createComponent($button, _button.default, {
      type: 'default',
      width: options.width,
      height: options.height,
      onClick: function onClick(e) {
        return _this4._onButtonClick(e, options);
      },
      template: this._renderTemplate(template, options.items, options.isCompact)
    });
  };
  _proto._createCompactButtonElement = function _createCompactButtonElement(_ref) {
    var isCompact = _ref.isCompact,
      $container = _ref.$container,
      coordinates = _ref.coordinates;
    var result = (0, _renderer.default)('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
    this._setPosition(result, coordinates);
    return result;
  };
  _proto._renderTemplate = function _renderTemplate(template, items, isCompact) {
    return new _function_template.FunctionTemplate(function (options) {
      return template.render({
        model: {
          appointmentCount: items.data.length,
          isCompact
        },
        container: options.container
      });
    });
  };
  _proto._createTemplate = function _createTemplate(count, isCompact) {
    this._initButtonTemplate(count, isCompact);
    return this.instance._getAppointmentTemplate('appointmentCollectorTemplate');
  };
  _proto._initButtonTemplate = function _initButtonTemplate(count, isCompact) {
    var _this5 = this;
    this.instance._templateManager.addDefaultTemplates({
      appointmentCollector: new _function_template.FunctionTemplate(function (options) {
        return _this5._createButtonTemplate(count, (0, _renderer.default)(options.container), isCompact);
      })
    });
  };
  _proto._createButtonTemplate = function _createButtonTemplate(appointmentCount, element, isCompact) {
    var text = isCompact ? appointmentCount : _message.default.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
    return element.append((0, _renderer.default)('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
  };
  return CompactAppointmentsHelper;
}();
exports.CompactAppointmentsHelper = CompactAppointmentsHelper;