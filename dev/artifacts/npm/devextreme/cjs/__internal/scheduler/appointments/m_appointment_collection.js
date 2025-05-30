/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_appointment_collection.js)
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
var _translator = require("../../../animation/translator");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _element_data = require("../../../core/element_data");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array = require("../../../core/utils/array");
var _common = require("../../../core/utils/common");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _double_click = require("../../../events/double_click");
var _index = require("../../../events/utils/index");
var _uiCollection_widget = _interopRequireDefault(require("../../../ui/collection/ui.collection_widget.edit"));
var _utils = _interopRequireDefault(require("../../../ui/scheduler/utils.timeZone"));
var _m_appointment_adapter = require("../m_appointment_adapter");
var _m_classes = require("../m_classes");
var _m_constants = require("../m_constants");
var _m_expression_utils = require("../m_expression_utils");
var _m_recurrence = require("../m_recurrence");
var _m_utils = require("./data_provider/m_utils");
var _m_appointment = require("./m_appointment");
var _m_appointment_layout = require("./m_appointment_layout");
var _m_core = require("./resizing/m_core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // @ts-expect-error
var COMPONENT_CLASS = 'dx-scheduler-scrollable-appointments';
var DBLCLICK_EVENT_NAME = (0, _index.addNamespace)(_double_click.name, 'dxSchedulerAppointment');
var toMs = _date.default.dateToMilliseconds;
var SchedulerAppointments = /*#__PURE__*/function (_CollectionWidget) {
  _inheritsLoose(SchedulerAppointments, _CollectionWidget);
  function SchedulerAppointments(element, options) {
    var _this;
    _this = _CollectionWidget.call(this, element, options) || this;
    _this._virtualAppointments = {};
    return _this;
  }
  var _proto = SchedulerAppointments.prototype;
  // TODO: remove when Collection moved to TS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _proto.option = function option(optionName, value) {
    return _CollectionWidget.prototype.option.apply(this, arguments);
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
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var observer = this.option('observer');
    if (observer) {
      return observer.fire.apply(observer, arguments);
    }
  };
  _proto._dispose = function _dispose() {
    clearTimeout(this._appointmentClickTimeout);
    _CollectionWidget.prototype._dispose.call(this);
  };
  _proto._supportedKeys = function _supportedKeys() {
    var parent = _CollectionWidget.prototype._supportedKeys.call(this);
    var tabHandler = function tabHandler(e) {
      var appointments = this._getAccessAppointments();
      var focusedAppointment = appointments.filter('.dx-state-focused');
      var index = focusedAppointment.data(_m_constants.APPOINTMENT_SETTINGS_KEY).sortedIndex;
      var lastIndex = appointments.length - 1;
      if (index > 0 && e.shiftKey || index < lastIndex && !e.shiftKey) {
        e.preventDefault();
        e.shiftKey ? index-- : index++;
        var $nextAppointment = this._getAppointmentByIndex(index);
        this._resetTabIndex($nextAppointment);
        // @ts-expect-error
        _events_engine.default.trigger($nextAppointment, 'focus');
      }
    };
    var currentAppointment = this._$currentAppointment;
    return (0, _extend.extend)(parent, {
      escape: function () {
        var _a, _b, _c;
        if (this.resizeOccur) {
          this.moveAppointmentBack();
          this.resizeOccur = false;
          (_a = currentAppointment.dxResizable('instance')) === null || _a === void 0 ? void 0 : _a._detachEventHandlers();
          (_b = currentAppointment.dxResizable('instance')) === null || _b === void 0 ? void 0 : _b._attachEventHandlers();
          (_c = currentAppointment.dxResizable('instance')) === null || _c === void 0 ? void 0 : _c._toggleResizingClass(false);
        }
      }.bind(this),
      del: function (e) {
        if (this.option('allowDelete')) {
          e.preventDefault();
          var data = this._getItemData(e.target);
          this.notifyObserver('onDeleteButtonPress', {
            data,
            target: e.target
          });
        }
      }.bind(this),
      tab: tabHandler
    });
  };
  _proto._getAppointmentByIndex = function _getAppointmentByIndex(sortedIndex) {
    var appointments = this._getAccessAppointments();
    return appointments.filter(function (_, $item) {
      return (0, _element_data.data)($item, _m_constants.APPOINTMENT_SETTINGS_KEY).sortedIndex === sortedIndex;
    }).eq(0);
  };
  _proto._getAccessAppointments = function _getAccessAppointments() {
    return this._itemElements().filter(':visible').not('.dx-state-disabled');
  };
  _proto._resetTabIndex = function _resetTabIndex($appointment) {
    this._focusTarget().attr('tabIndex', -1);
    $appointment.attr('tabIndex', this.option('tabIndex'));
  };
  _proto._moveFocus = function _moveFocus() {};
  _proto._focusTarget = function _focusTarget() {
    return this._itemElements();
  };
  _proto._renderFocusTarget = function _renderFocusTarget() {
    var $appointment = this._getAppointmentByIndex(0);
    this._resetTabIndex($appointment);
  };
  _proto._focusInHandler = function _focusInHandler(e) {
    _CollectionWidget.prototype._focusInHandler.call(this, e);
    this._$currentAppointment = (0, _renderer.default)(e.target);
    this.option('focusedElement', (0, _element.getPublicElement)((0, _renderer.default)(e.target)));
  };
  _proto._focusOutHandler = function _focusOutHandler(e) {
    var $appointment = this._getAppointmentByIndex(0);
    this.option('focusedElement', (0, _element.getPublicElement)($appointment));
    _CollectionWidget.prototype._focusOutHandler.call(this, e);
  };
  _proto._eventBindingTarget = function _eventBindingTarget() {
    return this._itemContainer();
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_CollectionWidget.prototype._getDefaultOptions.call(this), {
      noDataText: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      tabIndex: 0,
      fixedContainer: null,
      allDayContainer: null,
      allowDrag: true,
      allowResize: true,
      allowAllDayResize: true,
      onAppointmentDblClick: null,
      _collectorOffset: 0,
      groups: [],
      resources: []
    });
  };
  _proto._optionChanged = function _optionChanged(args) {
    if (this.option('isRenovatedAppointments')) {
      return;
    }
    switch (args.name) {
      case 'items':
        this._cleanFocusState();
        this._clearDropDownItems();
        this._clearDropDownItemsElements();
        this._repaintAppointments(args.value);
        this._renderDropDownAppointments();
        this._attachAppointmentsEvents();
        break;
      case 'fixedContainer':
      case 'allDayContainer':
      case 'onAppointmentDblClick':
        break;
      case 'allowDrag':
      case 'allowResize':
      case 'allowAllDayResize':
        this._invalidate();
        break;
      case 'focusedElement':
        this._resetTabIndex((0, _renderer.default)(args.value));
        _CollectionWidget.prototype._optionChanged.call(this, args);
        break;
      case 'allowDelete':
        break;
      case 'focusStateEnabled':
        this._clearDropDownItemsElements();
        this._renderDropDownAppointments();
        _CollectionWidget.prototype._optionChanged.call(this, args);
        break;
      default:
        _CollectionWidget.prototype._optionChanged.call(this, args);
    }
  };
  _proto._isAllDayAppointment = function _isAllDayAppointment(appointment) {
    return appointment.settings.length && appointment.settings[0].allDay || false;
  };
  _proto._isRepaintAppointment = function _isRepaintAppointment(appointment) {
    return !(0, _type.isDefined)(appointment.needRepaint) || appointment.needRepaint === true;
  };
  _proto._isRepaintAll = function _isRepaintAll(appointments) {
    if (this.isAgendaView) {
      return true;
    }
    for (var i = 0; i < appointments.length; i++) {
      if (!this._isRepaintAppointment(appointments[i])) {
        return false;
      }
    }
    return true;
  };
  _proto._applyFragment = function _applyFragment(fragment, allDay) {
    if (fragment.children().length > 0) {
      this._getAppointmentContainer(allDay).append(fragment);
    }
  };
  _proto._onEachAppointment = function _onEachAppointment(appointment, index, container, isRepaintAll) {
    var _this2 = this;
    var repaintAppointment = function repaintAppointment() {
      appointment.needRepaint = false;
      _this2._clearItem(appointment);
      _this2._renderItem(index, appointment, container);
    };
    if ((appointment === null || appointment === void 0 ? void 0 : appointment.needRemove) === true) {
      this._clearItem(appointment);
    } else if (isRepaintAll || this._isRepaintAppointment(appointment)) {
      repaintAppointment();
    }
  };
  _proto._repaintAppointments = function _repaintAppointments(appointments) {
    var _this3 = this;
    this._renderByFragments(function ($commonFragment, $allDayFragment) {
      var isRepaintAll = _this3._isRepaintAll(appointments);
      if (isRepaintAll) {
        _this3._getAppointmentContainer(true).html('');
        _this3._getAppointmentContainer(false).html('');
      }
      !appointments.length && _this3._cleanItemContainer();
      appointments.forEach(function (appointment, index) {
        var container = _this3._isAllDayAppointment(appointment) ? $allDayFragment : $commonFragment;
        _this3._onEachAppointment(appointment, index, container, isRepaintAll);
      });
    });
  };
  _proto._renderByFragments = function _renderByFragments(renderFunction) {
    if (this.isVirtualScrolling) {
      var $commonFragment = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
      var $allDayFragment = (0, _renderer.default)(_dom_adapter.default.createDocumentFragment());
      renderFunction($commonFragment, $allDayFragment);
      this._applyFragment($commonFragment, false);
      this._applyFragment($allDayFragment, true);
    } else {
      renderFunction(this._getAppointmentContainer(false), this._getAppointmentContainer(true));
    }
  };
  _proto._attachAppointmentsEvents = function _attachAppointmentsEvents() {
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
    this._attachAppointmentDblClick();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
  };
  _proto._clearItem = function _clearItem(item) {
    var $items = this._findItemElementByItem(item.itemData);
    if (!$items.length) {
      return;
    }
    (0, _iterator.each)($items, function (_, $item) {
      $item.detach();
      $item.remove();
    });
  };
  _proto._clearDropDownItems = function _clearDropDownItems() {
    this._virtualAppointments = {};
  };
  _proto._clearDropDownItemsElements = function _clearDropDownItemsElements() {
    this.invoke('clearCompactAppointments');
  };
  _proto._findItemElementByItem = function _findItemElementByItem(item) {
    var result = [];
    var that = this;
    this.itemElements().each(function () {
      var $item = (0, _renderer.default)(this);
      if ($item.data(that._itemDataKey()) === item) {
        result.push($item);
      }
    });
    return result;
  };
  _proto._itemClass = function _itemClass() {
    return _m_classes.APPOINTMENT_ITEM_CLASS;
  };
  _proto._itemContainer = function _itemContainer() {
    var $container = _CollectionWidget.prototype._itemContainer.call(this);
    var $result = $container;
    var $allDayContainer = this.option('allDayContainer');
    if ($allDayContainer) {
      $result = $container.add($allDayContainer);
    }
    return $result;
  };
  _proto._cleanItemContainer = function _cleanItemContainer() {
    _CollectionWidget.prototype._cleanItemContainer.call(this);
    var $allDayContainer = this.option('allDayContainer');
    if ($allDayContainer) {
      $allDayContainer.empty();
    }
    this._virtualAppointments = {};
  };
  _proto._clean = function _clean() {
    _CollectionWidget.prototype._clean.call(this);
    delete this._$currentAppointment;
    delete this._initialSize;
    delete this._initialCoordinates;
  };
  _proto._init = function _init() {
    _CollectionWidget.prototype._init.call(this);
    this.$element().addClass(COMPONENT_CLASS);
    this._preventSingleAppointmentClick = false;
  };
  _proto._renderAppointmentTemplate = function _renderAppointmentTemplate($container, appointment, model) {
    var config = {
      isAllDay: appointment.allDay,
      isRecurrence: appointment.recurrenceRule,
      // TODO
      html: (0, _type.isPlainObject)(appointment) && appointment.html ? appointment.html : undefined
    };
    var formatText = this.invoke('getTextAndFormatDate', model.appointmentData, this._currentAppointmentSettings.agendaSettings || model.targetedAppointmentData, 'TIME');
    $container.append(this.isAgendaView ? (0, _m_appointment_layout.createAgendaAppointmentLayout)(formatText, config) : (0, _m_appointment_layout.createAppointmentLayout)(formatText, config));
  };
  _proto._executeItemRenderAction = function _executeItemRenderAction(index, itemData, itemElement) {
    var action = this._getItemRenderAction();
    if (action) {
      action(this.invoke('mapAppointmentFields', {
        itemData,
        itemElement
      }));
    }
    delete this._currentAppointmentSettings;
  };
  _proto._itemClickHandler = function _itemClickHandler(e) {
    _CollectionWidget.prototype._itemClickHandler.call(this, e, {}, {
      afterExecute: function (e) {
        this._processItemClick(e.args[0].event);
      }.bind(this)
    });
  };
  _proto._processItemClick = function _processItemClick(e) {
    var _this4 = this;
    var $target = (0, _renderer.default)(e.currentTarget);
    var data = this._getItemData($target);
    if (e.type === 'keydown' || (0, _index.isFakeClickEvent)(e)) {
      this.notifyObserver('showEditAppointmentPopup', {
        data,
        target: $target
      });
      return;
    }
    this._appointmentClickTimeout = setTimeout(function () {
      if (!_this4._preventSingleAppointmentClick && _dom_adapter.default.getBody().contains($target[0])) {
        _this4.notifyObserver('showAppointmentTooltip', {
          data,
          target: $target
        });
      }
      _this4._preventSingleAppointmentClick = false;
    }, 300);
  };
  _proto._extendActionArgs = function _extendActionArgs($itemElement) {
    var args = _CollectionWidget.prototype._extendActionArgs.call(this, $itemElement);
    return this.invoke('mapAppointmentFields', args);
  };
  _proto._render = function _render() {
    _CollectionWidget.prototype._render.call(this);
    this._attachAppointmentDblClick();
  };
  _proto._attachAppointmentDblClick = function _attachAppointmentDblClick() {
    var that = this;
    var itemSelector = that._itemSelector();
    var itemContainer = this._itemContainer();
    _events_engine.default.off(itemContainer, DBLCLICK_EVENT_NAME, itemSelector);
    _events_engine.default.on(itemContainer, DBLCLICK_EVENT_NAME, itemSelector, function (e) {
      that._itemDXEventHandler(e, 'onAppointmentDblClick', {}, {
        afterExecute(e) {
          that._dblClickHandler(e.args[0].event);
        }
      });
    });
  };
  _proto._dblClickHandler = function _dblClickHandler(e) {
    var $targetAppointment = (0, _renderer.default)(e.currentTarget);
    var appointmentData = this._getItemData($targetAppointment);
    clearTimeout(this._appointmentClickTimeout);
    this._preventSingleAppointmentClick = true;
    this.notifyObserver('showEditAppointmentPopup', {
      data: appointmentData,
      target: $targetAppointment
    });
  };
  _proto._renderItem = function _renderItem(index, item, container) {
    var itemData = item.itemData;
    var $items = [];
    for (var i = 0; i < item.settings.length; i++) {
      var setting = item.settings[i];
      this._currentAppointmentSettings = setting;
      var $item = _CollectionWidget.prototype._renderItem.call(this, index, itemData, container);
      $item.data(_m_constants.APPOINTMENT_SETTINGS_KEY, setting);
      $items.push($item);
    }
    return $items;
  };
  _proto._getItemContent = function _getItemContent($itemFrame) {
    $itemFrame.data(_m_constants.APPOINTMENT_SETTINGS_KEY, this._currentAppointmentSettings);
    var $itemContent = _CollectionWidget.prototype._getItemContent.call(this, $itemFrame);
    return $itemContent;
  };
  _proto._createItemByTemplate = function _createItemByTemplate(itemTemplate, renderArgs) {
    var itemData = renderArgs.itemData,
      container = renderArgs.container,
      index = renderArgs.index;
    return itemTemplate.render({
      model: {
        appointmentData: itemData,
        targetedAppointmentData: this.invoke('getTargetedAppointmentData', itemData, (0, _renderer.default)(container).parent())
      },
      container,
      index
    });
  };
  _proto._getAppointmentContainer = function _getAppointmentContainer(allDay) {
    var $allDayContainer = this.option('allDayContainer');
    var $container = this.itemsContainer().not($allDayContainer);
    if (allDay && $allDayContainer) {
      $container = $allDayContainer;
    }
    return $container;
  };
  _proto._postprocessRenderItem = function _postprocessRenderItem(args) {
    this._renderAppointment(args.itemElement, this._currentAppointmentSettings);
  };
  _proto._renderAppointment = function _renderAppointment(element, settings) {
    var _a;
    element.data(_m_constants.APPOINTMENT_SETTINGS_KEY, settings);
    this._applyResourceDataAttr(element);
    var rawAppointment = this._getItemData(element);
    var geometry = this.invoke('getAppointmentGeometry', settings);
    var allowResize = this.option('allowResize') && (!(0, _type.isDefined)(settings.skipResizing) || (0, _type.isString)(settings.skipResizing));
    var allowDrag = this.option('allowDrag');
    var allDay = settings.allDay;
    this.invoke('setCellDataCacheAlias', this._currentAppointmentSettings, geometry);
    if (settings.virtual) {
      var appointmentConfig = {
        itemData: rawAppointment,
        groupIndex: settings.groupIndex,
        groups: this.option('groups')
      };
      var deferredColor = this.option('getAppointmentColor')(appointmentConfig);
      this._processVirtualAppointment(settings, element, rawAppointment, deferredColor);
    } else {
      var config = {
        data: rawAppointment,
        groupIndex: settings.groupIndex,
        observer: this.option('observer'),
        geometry,
        direction: settings.direction || 'vertical',
        allowResize,
        allowDrag,
        allDay,
        reduced: settings.appointmentReduced,
        isCompact: settings.isCompact,
        startDate: new Date((_a = settings.info) === null || _a === void 0 ? void 0 : _a.appointment.startDate),
        cellWidth: this.invoke('getCellWidth'),
        cellHeight: this.invoke('getCellHeight'),
        resizableConfig: this._resizableConfig(rawAppointment, settings),
        groups: this.option('groups'),
        getAppointmentColor: this.option('getAppointmentColor'),
        getResourceDataAccessors: this.option('getResourceDataAccessors')
      };
      if (this.isAgendaView) {
        var agendaResourceProcessor = this.option('getAgendaResourceProcessor')();
        config.createPlainResourceListAsync = function (rawAppointment) {
          return agendaResourceProcessor.createListAsync(rawAppointment);
        };
      }
      this._createComponent(element, this.isAgendaView ? _m_appointment.AgendaAppointment : _m_appointment.Appointment, _extends(_extends({}, config), {
        dataAccessors: this.option('dataAccessors'),
        getResizableStep: this.option('getResizableStep')
      }));
    }
  };
  _proto._applyResourceDataAttr = function _applyResourceDataAttr($appointment) {
    var dataAccessors = this.option('getResourceDataAccessors')();
    var rawAppointment = this._getItemData($appointment);
    (0, _iterator.each)(dataAccessors.getter, function (key) {
      var value = dataAccessors.getter[key](rawAppointment);
      if ((0, _type.isDefined)(value)) {
        var prefix = "data-".concat((0, _common.normalizeKey)(key.toLowerCase()), "-");
        (0, _array.wrapToArray)(value).forEach(function (value) {
          return $appointment.attr(prefix + (0, _common.normalizeKey)(value), true);
        });
      }
    });
  };
  _proto._resizableConfig = function _resizableConfig(appointmentData, itemSetting) {
    return {
      area: this._calculateResizableArea(itemSetting, appointmentData),
      onResizeStart: function (e) {
        this.resizeOccur = true;
        this._$currentAppointment = (0, _renderer.default)(e.element);
        if (this.invoke('needRecalculateResizableArea')) {
          var updatedArea = this._calculateResizableArea(this._$currentAppointment.data(_m_constants.APPOINTMENT_SETTINGS_KEY), this._$currentAppointment.data('dxItemData'));
          e.component.option('area', updatedArea);
          e.component._renderDragOffsets(e.event);
        }
        this._initialSize = {
          width: e.width,
          height: e.height
        };
        this._initialCoordinates = (0, _translator.locate)(this._$currentAppointment);
      }.bind(this),
      onResizeEnd: function (e) {
        this.resizeOccur = false;
        this._resizeEndHandler(e);
      }.bind(this)
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._calculateResizableArea = function _calculateResizableArea(itemSetting, appointmentData) {
    var area = this.$element().closest('.dx-scrollable-content');
    return this.invoke('getResizableAppointmentArea', {
      coordinates: {
        left: itemSetting.left,
        top: 0,
        groupIndex: itemSetting.groupIndex
      },
      allDay: itemSetting.allDay
    }) || area;
  };
  _proto._resizeEndHandler = function _resizeEndHandler(e) {
    var $element = (0, _renderer.default)(e.element);
    var _$element$data = $element.data('dxAppointmentSettings'),
      allDay = _$element$data.allDay,
      info = _$element$data.info;
    var sourceAppointment = this._getItemData($element);
    var dateRange = {};
    if (allDay) {
      dateRange = this.resizeAllDay(e);
    } else {
      var startDate = this._getEndResizeAppointmentStartDate(e, sourceAppointment, info.appointment);
      var endDate = info.appointment.endDate;
      dateRange = this._getDateRange(e, startDate, endDate);
    }
    this.updateResizedAppointment($element, dateRange, this.option('dataAccessors'), this.option('timeZoneCalculator'));
  };
  _proto.resizeAllDay = function resizeAllDay(e) {
    var $element = (0, _renderer.default)(e.element);
    var timeZoneCalculator = this.option('timeZoneCalculator');
    var dataAccessors = this.option('dataAccessors');
    return (0, _m_core.getAppointmentDateRange)({
      handles: e.handles,
      appointmentSettings: $element.data('dxAppointmentSettings'),
      isVerticalViewDirection: this.option('isVerticalViewDirection')(),
      isVerticalGroupedWorkSpace: this.option('isVerticalGroupedWorkSpace')(),
      appointmentRect: (0, _position.getBoundingRect)($element[0]),
      parentAppointmentRect: (0, _position.getBoundingRect)($element.parent()[0]),
      viewDataProvider: this.option('getViewDataProvider')(),
      isDateAndTimeView: this.option('isDateAndTimeView')(),
      startDayHour: this.invoke('getStartDayHour'),
      endDayHour: this.invoke('getEndDayHour'),
      timeZoneCalculator,
      dataAccessors,
      rtlEnabled: this.option('rtlEnabled'),
      DOMMetaData: this.option('getDOMElementsMetaData')()
    });
  };
  _proto.updateResizedAppointment = function updateResizedAppointment($element, dateRange, dataAccessors, timeZoneCalculator) {
    var sourceAppointment = this._getItemData($element);
    var modifiedAppointmentAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(sourceAppointment, dataAccessors, timeZoneCalculator).clone();
    modifiedAppointmentAdapter.startDate = new Date(dateRange.startDate);
    modifiedAppointmentAdapter.endDate = new Date(dateRange.endDate);
    this.notifyObserver('updateAppointmentAfterResize', {
      target: sourceAppointment,
      data: modifiedAppointmentAdapter.clone({
        pathTimeZone: 'fromGrid'
      }).source(),
      $appointment: $element
    });
  };
  _proto._getEndResizeAppointmentStartDate = function _getEndResizeAppointmentStartDate(e, rawAppointment, appointmentInfo) {
    var timeZoneCalculator = this.option('timeZoneCalculator');
    var appointmentAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this.option('dataAccessors'), timeZoneCalculator);
    var startDate = appointmentInfo.startDate;
    var recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    var recurrenceRule = appointmentAdapter.recurrenceRule,
      startDateTimeZone = appointmentAdapter.startDateTimeZone;
    var isAllDay = this.invoke('isAllDay', rawAppointment);
    var isRecurrent = recurrenceProcessor.isValidRecurrenceRule(recurrenceRule);
    if (!e.handles.top && !isRecurrent && !isAllDay) {
      startDate = timeZoneCalculator.createDate(appointmentAdapter.startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
    }
    return startDate;
  };
  _proto._getDateRange = function _getDateRange(e, startDate, endDate) {
    var itemData = this._getItemData(e.element);
    var deltaTime = this.invoke('getDeltaTime', e, this._initialSize, itemData);
    var renderingStrategyDirection = this.invoke('getRenderingStrategyDirection');
    var isStartDateChanged = false;
    var isAllDay = this.invoke('isAllDay', itemData);
    var needCorrectDates = this.invoke('needCorrectAppointmentDates') && !isAllDay;
    var startTime;
    var endTime;
    if (renderingStrategyDirection !== 'vertical' || isAllDay) {
      isStartDateChanged = this.option('rtlEnabled') ? e.handles.right : e.handles.left;
    } else {
      isStartDateChanged = e.handles.top;
    }
    if (isStartDateChanged) {
      startTime = needCorrectDates ? this._correctStartDateByDelta(startDate, deltaTime) : startDate.getTime() - deltaTime;
      startTime += _utils.default.getTimezoneOffsetChangeInMs(startDate, endDate, startTime, endDate);
      endTime = endDate.getTime();
    } else {
      startTime = startDate.getTime();
      endTime = needCorrectDates ? this._correctEndDateByDelta(endDate, deltaTime) : endDate.getTime() + deltaTime;
      endTime -= _utils.default.getTimezoneOffsetChangeInMs(startDate, endDate, startDate, endTime);
    }
    return {
      startDate: new Date(startTime),
      endDate: new Date(endTime)
    };
  };
  _proto._correctEndDateByDelta = function _correctEndDateByDelta(endDate, deltaTime) {
    var endDayHour = this.invoke('getEndDayHour');
    var startDayHour = this.invoke('getStartDayHour');
    var result = endDate.getTime() + deltaTime;
    var visibleDayDuration = (endDayHour - startDayHour) * toMs('hour');
    var daysCount = deltaTime > 0 ? Math.ceil(deltaTime / visibleDayDuration) : Math.floor(deltaTime / visibleDayDuration);
    var maxDate = new Date(endDate);
    var minDate = new Date(endDate);
    minDate.setHours(startDayHour, 0, 0, 0);
    maxDate.setHours(endDayHour, 0, 0, 0);
    if (result > maxDate.getTime() || result <= minDate.getTime()) {
      var tailOfCurrentDay = maxDate.getTime() - endDate.getTime();
      var tailOfPrevDays = deltaTime - tailOfCurrentDay;
      var correctedEndDate = new Date(endDate).setDate(endDate.getDate() + daysCount);
      var lastDay = new Date(correctedEndDate);
      lastDay.setHours(startDayHour, 0, 0, 0);
      result = lastDay.getTime() + tailOfPrevDays - visibleDayDuration * (daysCount - 1);
    }
    return result;
  };
  _proto._correctStartDateByDelta = function _correctStartDateByDelta(startDate, deltaTime) {
    var endDayHour = this.invoke('getEndDayHour');
    var startDayHour = this.invoke('getStartDayHour');
    var result = startDate.getTime() - deltaTime;
    var visibleDayDuration = (endDayHour - startDayHour) * toMs('hour');
    var daysCount = deltaTime > 0 ? Math.ceil(deltaTime / visibleDayDuration) : Math.floor(deltaTime / visibleDayDuration);
    var maxDate = new Date(startDate);
    var minDate = new Date(startDate);
    minDate.setHours(startDayHour, 0, 0, 0);
    maxDate.setHours(endDayHour, 0, 0, 0);
    if (result < minDate.getTime() || result >= maxDate.getTime()) {
      var tailOfCurrentDay = startDate.getTime() - minDate.getTime();
      var tailOfPrevDays = deltaTime - tailOfCurrentDay;
      var firstDay = new Date(startDate.setDate(startDate.getDate() - daysCount));
      firstDay.setHours(endDayHour, 0, 0, 0);
      result = firstDay.getTime() - tailOfPrevDays + visibleDayDuration * (daysCount - 1);
    }
    return result;
  };
  _proto._processVirtualAppointment = function _processVirtualAppointment(appointmentSetting, $appointment, appointmentData, color) {
    var virtualAppointment = appointmentSetting.virtual;
    var virtualGroupIndex = virtualAppointment.index;
    if (!(0, _type.isDefined)(this._virtualAppointments[virtualGroupIndex])) {
      this._virtualAppointments[virtualGroupIndex] = {
        coordinates: {
          top: virtualAppointment.top,
          left: virtualAppointment.left
        },
        items: {
          data: [],
          colors: [],
          settings: []
        },
        isAllDay: !!virtualAppointment.isAllDay,
        buttonColor: color
      };
    }
    appointmentSetting.targetedAppointmentData = this.invoke('getTargetedAppointmentData', appointmentData, $appointment);
    this._virtualAppointments[virtualGroupIndex].items.settings.push(appointmentSetting);
    this._virtualAppointments[virtualGroupIndex].items.data.push(appointmentData);
    this._virtualAppointments[virtualGroupIndex].items.colors.push(color);
    $appointment.remove();
  };
  _proto._renderContentImpl = function _renderContentImpl() {
    _CollectionWidget.prototype._renderContentImpl.call(this);
    this._renderDropDownAppointments();
  };
  _proto._renderDropDownAppointments = function _renderDropDownAppointments() {
    var _this5 = this;
    this._renderByFragments(function ($commonFragment, $allDayFragment) {
      (0, _iterator.each)(_this5._virtualAppointments, function (groupIndex) {
        var virtualGroup = _this5._virtualAppointments[groupIndex];
        var virtualItems = virtualGroup.items;
        var virtualCoordinates = virtualGroup.coordinates;
        var $fragment = virtualGroup.isAllDay ? $allDayFragment : $commonFragment;
        var left = virtualCoordinates.left;
        var buttonWidth = _this5.invoke('getDropDownAppointmentWidth', virtualGroup.isAllDay);
        var buttonHeight = _this5.invoke('getDropDownAppointmentHeight');
        var rtlOffset = _this5.option('rtlEnabled') ? buttonWidth : 0;
        _this5.notifyObserver('renderCompactAppointments', {
          $container: $fragment,
          coordinates: {
            top: virtualCoordinates.top,
            left: left + rtlOffset
          },
          items: virtualItems,
          buttonColor: virtualGroup.buttonColor,
          width: buttonWidth - _this5.option('_collectorOffset'),
          height: buttonHeight,
          onAppointmentClick: _this5.option('onItemClick'),
          allowDrag: _this5.option('allowDrag'),
          cellWidth: _this5.invoke('getCellWidth'),
          isCompact: _this5.invoke('isAdaptive') || _this5._isGroupCompact(virtualGroup)
        });
      });
    });
  };
  _proto._isGroupCompact = function _isGroupCompact(virtualGroup) {
    return !virtualGroup.isAllDay && this.invoke('supportCompactDropDownAppointments');
  };
  _proto._sortAppointmentsByStartDate = function _sortAppointmentsByStartDate(appointments) {
    return (0, _m_utils.sortAppointmentsByStartDate)(appointments, this.option('dataAccessors'));
  };
  _proto._processRecurrenceAppointment = function _processRecurrenceAppointment(appointment, index, skipLongAppointments) {
    // NOTE: this method is actual only for agenda
    var recurrenceRule = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'recurrenceRule', appointment);
    var result = {
      parts: [],
      indexes: []
    };
    if (recurrenceRule) {
      var dates = appointment.settings || appointment;
      var startDate = new Date(_m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'startDate', dates));
      var startDateTimeZone = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'startDateTimeZone', appointment);
      var endDate = new Date(_m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'endDate', dates));
      var appointmentDuration = endDate.getTime() - startDate.getTime();
      var recurrenceException = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'recurrenceException', appointment);
      var startViewDate = this.invoke('getStartViewDate');
      var endViewDate = this.invoke('getEndViewDate');
      var timezoneCalculator = this.option('timeZoneCalculator');
      var recurrentDates = (0, _m_recurrence.getRecurrenceProcessor)().generateDates({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: startDate,
        end: endDate,
        min: startViewDate,
        max: endViewDate,
        appointmentTimezoneOffset: timezoneCalculator.getOriginStartDateOffsetInMs(startDate, startDateTimeZone, false)
      });
      var recurrentDateCount = appointment.settings ? 1 : recurrentDates.length;
      for (var i = 0; i < recurrentDateCount; i++) {
        var appointmentPart = (0, _extend.extend)({}, appointment, true);
        if (recurrentDates[i]) {
          var appointmentSettings = this._applyStartDateToObj(recurrentDates[i], {});
          this._applyEndDateToObj(new Date(recurrentDates[i].getTime() + appointmentDuration), appointmentSettings);
          appointmentPart.settings = appointmentSettings;
        } else {
          appointmentPart.settings = dates;
        }
        result.parts.push(appointmentPart);
        if (!skipLongAppointments) {
          this._processLongAppointment(appointmentPart, result);
        }
      }
      result.indexes.push(index);
    }
    return result;
  };
  _proto._processLongAppointment = function _processLongAppointment(appointment, result) {
    var parts = this.splitAppointmentByDay(appointment);
    var partCount = parts.length;
    var endViewDate = this.invoke('getEndViewDate').getTime();
    var startViewDate = this.invoke('getStartViewDate').getTime();
    var timeZoneCalculator = this.option('timeZoneCalculator');
    result = result || {
      parts: []
    };
    if (partCount > 1) {
      (0, _extend.extend)(appointment, parts[0]);
      for (var i = 1; i < partCount; i++) {
        var startDate = _m_expression_utils.ExpressionUtils.getField(this.option('dataAccessors'), 'startDate', parts[i].settings).getTime();
        startDate = timeZoneCalculator.createDate(startDate, {
          path: 'toGrid'
        });
        if (startDate < endViewDate && startDate > startViewDate) {
          result.parts.push(parts[i]);
        }
      }
    }
    return result;
  };
  _proto._reduceRecurrenceAppointments = function _reduceRecurrenceAppointments(recurrenceIndexes, appointments) {
    (0, _iterator.each)(recurrenceIndexes, function (i, index) {
      appointments.splice(index - i, 1);
    });
  };
  _proto._combineAppointments = function _combineAppointments(appointments, additionalAppointments) {
    if (additionalAppointments.length) {
      appointments.push.apply(appointments, _toConsumableArray(additionalAppointments));
    }
    this._sortAppointmentsByStartDate(appointments);
  };
  _proto._applyStartDateToObj = function _applyStartDateToObj(startDate, obj) {
    _m_expression_utils.ExpressionUtils.setField(this.option('dataAccessors'), 'startDate', obj, startDate);
    return obj;
  };
  _proto._applyEndDateToObj = function _applyEndDateToObj(endDate, obj) {
    _m_expression_utils.ExpressionUtils.setField(this.option('dataAccessors'), 'endDate', obj, endDate);
    return obj;
  };
  _proto.moveAppointmentBack = function moveAppointmentBack(dragEvent) {
    var $appointment = this._$currentAppointment;
    var size = this._initialSize;
    var coords = this._initialCoordinates;
    if (dragEvent) {
      this._removeDragSourceClassFromDraggedAppointment();
      if ((0, _type.isDeferred)(dragEvent.cancel)) {
        dragEvent.cancel.resolve(true);
      } else {
        dragEvent.cancel = true;
      }
    }
    if ($appointment && !dragEvent) {
      if (coords) {
        (0, _translator.move)($appointment, coords);
        delete this._initialSize;
      }
      if (size) {
        (0, _size.setOuterWidth)($appointment, size.width);
        (0, _size.setOuterHeight)($appointment, size.height);
        delete this._initialCoordinates;
      }
    }
  };
  _proto.focus = function focus() {
    if (this._$currentAppointment) {
      var focusedElement = (0, _element.getPublicElement)(this._$currentAppointment);
      this.option('focusedElement', focusedElement);
      _events_engine.default.trigger(focusedElement, 'focus');
    }
  };
  _proto.splitAppointmentByDay = function splitAppointmentByDay(appointment) {
    var dates = appointment.settings || appointment;
    var dataAccessors = this.option('dataAccessors');
    var originalStartDate = new Date(_m_expression_utils.ExpressionUtils.getField(dataAccessors, 'startDate', dates));
    var startDate = _date.default.makeDate(originalStartDate);
    var endDate = _date.default.makeDate(_m_expression_utils.ExpressionUtils.getField(dataAccessors, 'endDate', dates));
    var maxAllowedDate = this.invoke('getEndViewDate');
    var startDayHour = this.invoke('getStartDayHour');
    var endDayHour = this.invoke('getEndDayHour');
    var timeZoneCalculator = this.option('timeZoneCalculator');
    var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(appointment, dataAccessors, timeZoneCalculator);
    var appointmentIsLong = (0, _m_utils.getAppointmentTakesSeveralDays)(adapter);
    var result = [];
    startDate = timeZoneCalculator.createDate(startDate, {
      path: 'toGrid'
    });
    endDate = timeZoneCalculator.createDate(endDate, {
      path: 'toGrid'
    });
    if (startDate.getHours() <= endDayHour && startDate.getHours() >= startDayHour && !appointmentIsLong) {
      result.push(this._applyStartDateToObj(new Date(startDate), {
        appointmentData: appointment
      }));
      startDate.setDate(startDate.getDate() + 1);
    }
    while (appointmentIsLong && startDate.getTime() < endDate.getTime() && startDate < maxAllowedDate) {
      var currentStartDate = new Date(startDate);
      var currentEndDate = new Date(startDate);
      this._checkStartDate(currentStartDate, originalStartDate, startDayHour);
      this._checkEndDate(currentEndDate, endDate, endDayHour);
      var appointmentData = (0, _object.deepExtendArraySafe)({}, appointment, true);
      var appointmentSettings = {};
      this._applyStartDateToObj(currentStartDate, appointmentSettings);
      this._applyEndDateToObj(currentEndDate, appointmentSettings);
      appointmentData.settings = appointmentSettings;
      result.push(appointmentData);
      startDate = _date.default.trimTime(startDate);
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(startDayHour);
    }
    return result;
  };
  _proto._checkStartDate = function _checkStartDate(currentDate, originalDate, startDayHour) {
    if (!_date.default.sameDate(currentDate, originalDate) || currentDate.getHours() <= startDayHour) {
      currentDate.setHours(startDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  };
  _proto._checkEndDate = function _checkEndDate(currentDate, originalDate, endDayHour) {
    if (!_date.default.sameDate(currentDate, originalDate) || currentDate.getHours() > endDayHour) {
      currentDate.setHours(endDayHour, 0, 0, 0);
    } else {
      currentDate.setHours(originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds(), originalDate.getMilliseconds());
    }
  };
  _proto._removeDragSourceClassFromDraggedAppointment = function _removeDragSourceClassFromDraggedAppointment() {
    var $appointments = this._itemElements().filter(".".concat(_m_classes.APPOINTMENT_DRAG_SOURCE_CLASS));
    $appointments.each(function (_, element) {
      var appointmentInstance = (0, _renderer.default)(element).dxSchedulerAppointment('instance');
      appointmentInstance.option('isDragSource', false);
    });
  };
  _proto._setDragSourceAppointment = function _setDragSourceAppointment(appointment, settings) {
    var $appointments = this._findItemElementByItem(appointment);
    var _settings$info$source = settings.info.sourceAppointment,
      startDate = _settings$info$source.startDate,
      endDate = _settings$info$source.endDate;
    var groupIndex = settings.groupIndex;
    $appointments.forEach(function ($item) {
      var _$item$data = $item.data(_m_constants.APPOINTMENT_SETTINGS_KEY),
        itemInfo = _$item$data.info,
        itemGroupIndex = _$item$data.groupIndex;
      var _itemInfo$sourceAppoi = itemInfo.sourceAppointment,
        itemStartDate = _itemInfo$sourceAppoi.startDate,
        itemEndDate = _itemInfo$sourceAppoi.endDate;
      var appointmentInstance = $item.dxSchedulerAppointment('instance');
      var isDragSource = startDate.getTime() === itemStartDate.getTime() && endDate.getTime() === itemEndDate.getTime() && groupIndex === itemGroupIndex;
      appointmentInstance.option('isDragSource', isDragSource);
    });
  };
  _proto.updateResizableArea = function updateResizableArea() {
    var _this6 = this;
    var $allResizableElements = this.$element().find('.dx-scheduler-appointment.dx-resizable');
    var horizontalResizables = (0, _common.grep)($allResizableElements, function (el) {
      var $el = (0, _renderer.default)(el);
      var resizableInst = $el.dxResizable('instance');
      var _resizableInst$option = resizableInst.option(),
        area = _resizableInst$option.area,
        handles = _resizableInst$option.handles;
      return (handles === 'right left' || handles === 'left right') && (0, _type.isPlainObject)(area);
    });
    (0, _iterator.each)(horizontalResizables, function (_, el) {
      var $el = (0, _renderer.default)(el);
      var position = (0, _translator.locate)($el);
      var appointmentData = _this6._getItemData($el);
      var area = _this6._calculateResizableArea({
        left: position.left
      }, appointmentData);
      $el.dxResizable('instance').option('area', area);
    });
  };
  _createClass(SchedulerAppointments, [{
    key: "isAgendaView",
    get: function get() {
      return this.invoke('isCurrentViewAgenda');
    }
  }, {
    key: "isVirtualScrolling",
    get: function get() {
      return this.invoke('isVirtualScrolling');
    }
  }, {
    key: "appointmentDataProvider",
    get: function get() {
      return this.option('getAppointmentDataProvider')();
    }
  }]);
  return SchedulerAppointments;
}(_uiCollection_widget.default);
(0, _component_registrator.default)('dxSchedulerAppointments', SchedulerAppointments);
var _default = SchedulerAppointments;
exports.default = _default;
