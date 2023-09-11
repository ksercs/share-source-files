/**
* DevExtreme (bundles/__internal/scheduler/m_scheduler.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _config = _interopRequireDefault(require("../../core/config"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _empty_template = require("../../core/templates/empty_template");
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _common = require("../../core/utils/common");
var _data = require("../../core/utils/data");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _position = require("../../core/utils/position");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _data_helper = _interopRequireDefault(require("../../data_helper"));
var _visibility_change = require("../../events/visibility_change");
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _getAppointmentTakesAllDay = require("../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
var _untyped_getCurrentView = require("../../renovation/ui/scheduler/model/untyped_getCurrentView");
var _createTimeZoneCalculator = require("../../renovation/ui/scheduler/timeZoneCalculator/createTimeZoneCalculator");
var _data2 = require("../../renovation/ui/scheduler/utils/data");
var _excludeFromRecurrence = require("../../renovation/ui/scheduler/utils/recurrence/excludeFromRecurrence");
var _base = require("../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _dialog = require("../../ui/dialog");
var _themes = require("../../ui/themes");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _ui2 = _interopRequireDefault(require("../../ui/widget/ui.widget"));
var _m_form = require("./appointment_popup/m_form");
var _m_popup = require("./appointment_popup/m_popup");
var _m_appointment_data_provider = require("./appointments/data_provider/m_appointment_data_provider");
var _m_appointment_collection = _interopRequireDefault(require("./appointments/m_appointment_collection"));
var _m_render = require("./appointments/m_render");
var _m_header = require("./header/m_header");
var _m_appointment_adapter = require("./m_appointment_adapter");
var _m_appointments_layout_manager = _interopRequireDefault(require("./m_appointments_layout_manager"));
var _m_compact_appointments_helper = require("./m_compact_appointments_helper");
var _m_data_structures = require("./m_data_structures");
var _m_expression_utils = require("./m_expression_utils");
var _m_loading = require("./m_loading");
var _m_recurrence = require("./m_recurrence");
var _m_subscribes = _interopRequireDefault(require("./m_subscribes"));
var _m_utils = require("./m_utils");
var _m_utils_time_zone = _interopRequireDefault(require("./m_utils_time_zone"));
var _m_agenda_resource_processor = require("./resources/m_agenda_resource_processor");
var _m_utils2 = require("./resources/m_utils");
var _m_desktop_tooltip_strategy = require("./tooltip_strategies/m_desktop_tooltip_strategy");
var _m_mobile_tooltip_strategy = require("./tooltip_strategies/m_mobile_tooltip_strategy");
var _m_agenda = _interopRequireDefault(require("./workspaces/m_agenda"));
var _m_timeline_day = _interopRequireDefault(require("./workspaces/m_timeline_day"));
var _m_timeline_month = _interopRequireDefault(require("./workspaces/m_timeline_month"));
var _m_timeline_week = _interopRequireDefault(require("./workspaces/m_timeline_week"));
var _m_timeline_work_week = _interopRequireDefault(require("./workspaces/m_timeline_work_week"));
var _m_work_space_day = _interopRequireDefault(require("./workspaces/m_work_space_day"));
var _m_work_space_month = _interopRequireDefault(require("./workspaces/m_work_space_month"));
var _m_work_space_week = _interopRequireDefault(require("./workspaces/m_work_space_week"));
var _m_work_space_work_week = _interopRequireDefault(require("./workspaces/m_work_space_work_week"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // @ts-expect-error
var MINUTES_IN_HOUR = 60;
var DEFAULT_AGENDA_DURATION = 7;
var WIDGET_CLASS = 'dx-scheduler';
var WIDGET_SMALL_CLASS = "".concat(WIDGET_CLASS, "-small");
var WIDGET_ADAPTIVE_CLASS = "".concat(WIDGET_CLASS, "-adaptive");
var WIDGET_READONLY_CLASS = "".concat(WIDGET_CLASS, "-readonly");
var WIDGET_SMALL_WIDTH = 400;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
var UTC_FULL_DATE_FORMAT = "".concat(FULL_DATE_FORMAT, "Z");
var DEFAULT_APPOINTMENT_TEMPLATE_NAME = 'item';
var DEFAULT_APPOINTMENT_COLLECTOR_TEMPLATE_NAME = 'appointmentCollector';
var DEFAULT_DROP_DOWN_APPOINTMENT_TEMPLATE_NAME = 'dropDownAppointment';
var VIEWS_CONFIG = {
  day: {
    workSpace: _m_work_space_day.default,
    renderingStrategy: 'vertical'
  },
  week: {
    workSpace: _m_work_space_week.default,
    renderingStrategy: 'vertical'
  },
  workWeek: {
    workSpace: _m_work_space_work_week.default,
    renderingStrategy: 'vertical'
  },
  month: {
    workSpace: _m_work_space_month.default,
    renderingStrategy: 'horizontalMonth'
  },
  timelineDay: {
    workSpace: _m_timeline_day.default,
    renderingStrategy: 'horizontal'
  },
  timelineWeek: {
    workSpace: _m_timeline_week.default,
    renderingStrategy: 'horizontal'
  },
  timelineWorkWeek: {
    workSpace: _m_timeline_work_week.default,
    renderingStrategy: 'horizontal'
  },
  timelineMonth: {
    workSpace: _m_timeline_month.default,
    renderingStrategy: 'horizontalMonthLine'
  },
  agenda: {
    workSpace: _m_agenda.default,
    renderingStrategy: 'agenda'
  }
};
var StoreEventNames = {
  ADDING: 'onAppointmentAdding',
  ADDED: 'onAppointmentAdded',
  DELETING: 'onAppointmentDeleting',
  DELETED: 'onAppointmentDeleted',
  UPDATING: 'onAppointmentUpdating',
  UPDATED: 'onAppointmentUpdated'
};
var RECURRENCE_EDITING_MODE = {
  SERIES: 'editSeries',
  OCCURENCE: 'editOccurence',
  CANCEL: 'cancel'
};
var Scheduler = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(Scheduler, _Widget);
  function Scheduler() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = Scheduler.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    // @ts-expect-error
    var defaultOptions = (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      views: ['day', 'week'],
      currentView: 'day',
      currentDate: _date.default.trimTime(new Date()),
      min: undefined,
      max: undefined,
      dateSerializationFormat: undefined,
      firstDayOfWeek: undefined,
      groups: [],
      resources: [],
      loadedResources: [],
      resourceLoaderMap: new Map(),
      dataSource: null,
      customizeDateNavigatorText: undefined,
      appointmentTemplate: DEFAULT_APPOINTMENT_TEMPLATE_NAME,
      dropDownAppointmentTemplate: DEFAULT_DROP_DOWN_APPOINTMENT_TEMPLATE_NAME,
      appointmentCollectorTemplate: DEFAULT_APPOINTMENT_COLLECTOR_TEMPLATE_NAME,
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      startDayHour: 0,
      endDayHour: 24,
      editing: {
        allowAdding: true,
        allowDeleting: true,
        allowDragging: true,
        allowResizing: true,
        allowUpdating: true,
        allowTimeZoneEditing: false
      },
      showAllDayPanel: true,
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: false,
      indicatorUpdateInterval: 300000,
      indicatorTime: undefined,
      recurrenceEditMode: 'dialog',
      cellDuration: 30,
      maxAppointmentsPerCell: 'auto',
      selectedCellData: [],
      groupByDate: false,
      onAppointmentRendered: null,
      onAppointmentClick: null,
      onAppointmentDblClick: null,
      onAppointmentContextMenu: null,
      onCellClick: null,
      onCellContextMenu: null,
      onAppointmentAdding: null,
      onAppointmentAdded: null,
      onAppointmentUpdating: null,
      onAppointmentUpdated: null,
      onAppointmentDeleting: null,
      onAppointmentDeleted: null,
      onAppointmentFormOpening: null,
      onAppointmentTooltipShowing: null,
      appointmentTooltipTemplate: 'appointmentTooltip',
      appointmentPopupTemplate: 'appointmentPopup',
      crossScrollingEnabled: false,
      useDropDownViewSwitcher: false,
      startDateExpr: 'startDate',
      endDateExpr: 'endDate',
      textExpr: 'text',
      descriptionExpr: 'description',
      allDayExpr: 'allDay',
      recurrenceRuleExpr: 'recurrenceRule',
      recurrenceExceptionExpr: 'recurrenceException',
      disabledExpr: 'disabled',
      remoteFiltering: false,
      timeZone: '',
      startDateTimeZoneExpr: 'startDateTimeZone',
      endDateTimeZoneExpr: 'endDateTimeZone',
      noDataText: _message.default.format('dxCollectionWidget-noDataText'),
      adaptivityEnabled: false,
      allowMultipleCellSelection: true,
      scrolling: {
        mode: 'standard'
      },
      allDayPanelMode: 'all',
      renovateRender: true,
      _draggingMode: 'outlook',
      _appointmentTooltipOffset: {
        x: 0,
        y: 0
      },
      _appointmentTooltipButtonsPosition: 'bottom',
      _appointmentTooltipOpenButtonText: _message.default.format('dxScheduler-openAppointment'),
      _appointmentCountPerCell: 2,
      _collectorOffset: 0,
      _appointmentOffset: 26,
      toolbar: [{
        location: 'before',
        defaultElement: 'dateNavigator'
      }, {
        location: 'after',
        defaultElement: 'viewSwitcher'
      }]
    });
    return (0, _extend.extend)(true, defaultOptions, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  };
  _proto._setDeprecatedOptions = function _setDeprecatedOptions() {
    // @ts-expect-error
    _Widget.prototype._setDeprecatedOptions.call(this);
    // @ts-expect-error
    (0, _extend.extend)(this._deprecatedOptions, {
      dropDownAppointmentTemplate: {
        since: '19.2',
        message: 'appointmentTooltipTemplate'
      }
    });
  };
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    // @ts-expect-error
    return _Widget.prototype._defaultOptionsRules.call(this).concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return !_devices.default.current().generic;
      },
      options: {
        useDropDownViewSwitcher: true,
        editing: {
          allowDragging: false,
          allowResizing: false
        }
      }
    }, {
      device() {
        return (0, _themes.isMaterial)();
      },
      options: {
        useDropDownViewSwitcher: true,
        dateCellTemplate(data, index, element) {
          var text = data.text;
          text.split(' ').forEach(function (text, index) {
            var span = (0, _renderer.default)('<span>').text(text).addClass('dx-scheduler-header-panel-cell-date');
            (0, _renderer.default)(element).append(span);
            if (!index) (0, _renderer.default)(element).append(' ');
          });
        },
        _appointmentTooltipOffset: {
          x: 0,
          y: 11
        },
        _appointmentTooltipButtonsPosition: 'top',
        _appointmentTooltipOpenButtonText: null,
        _appointmentCountPerCell: 1,
        _collectorOffset: 20,
        _appointmentOffset: 30
      }
    }]);
  };
  _proto._postponeDataSourceLoading = function _postponeDataSourceLoading(promise) {
    this.postponedOperations.add('_reloadDataSource', this._reloadDataSource.bind(this), promise);
  };
  _proto._postponeResourceLoading = function _postponeResourceLoading() {
    var _this = this;
    var whenLoaded = this.postponedOperations.add('loadResources', function () {
      var groups = _this._getCurrentViewOption('groups');
      return (0, _m_utils2.loadResources)(groups, _this.option('resources'), _this.option('resourceLoaderMap'));
    });
    // @ts-expect-error
    var resolveCallbacks = new _deferred.Deferred();
    whenLoaded.done(function (resources) {
      _this.option('loadedResources', resources);
      resolveCallbacks.resolve(resources);
    });
    this._postponeDataSourceLoading(whenLoaded);
    return resolveCallbacks.promise();
  };
  _proto._optionChanged = function _optionChanged(args) {
    var _this2 = this;
    var _a, _b, _c, _d;
    var value = args.value;
    var name = args.name;
    switch (args.name) {
      case 'customizeDateNavigatorText':
        this._updateOption('header', name, value);
        break;
      case 'firstDayOfWeek':
        this._updateOption('workSpace', name, value);
        this._updateOption('header', name, value);
        break;
      case 'currentDate':
        value = this._dateOption(name);
        value = _date.default.trimTime(new Date(value));
        this.option('selectedCellData', []);
        this._workSpace.option(name, new Date(value));
        (_a = this._header) === null || _a === void 0 ? void 0 : _a.option(name, new Date(value));
        (_b = this._header) === null || _b === void 0 ? void 0 : _b.option('startViewDate', this.getStartViewDate());
        this._appointments.option('items', []);
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      case 'dataSource':
        // @ts-expect-error
        this._initDataSource();
        this.appointmentDataProvider.setDataSource(this._dataSource);
        this._postponeResourceLoading().done(function () {
          _this2._filterAppointmentsByDate();
          _this2._updateOption('workSpace', 'showAllDayPanel', _this2.option('showAllDayPanel'));
        });
        break;
      case 'min':
      case 'max':
        value = this._dateOption(name);
        this._updateOption('header', name, new Date(value));
        this._updateOption('workSpace', name, new Date(value));
        break;
      case 'views':
        if (this._getCurrentViewOptions()) {
          this.repaint();
        } else {
          (_c = this._header) === null || _c === void 0 ? void 0 : _c.option(name, value);
        }
        break;
      case 'useDropDownViewSwitcher':
        (_d = this._header) === null || _d === void 0 ? void 0 : _d.option(name, value);
        break;
      case 'currentView':
        this._validateDayHours();
        this._validateCellDuration();
        this._appointments.option({
          items: [],
          allowDrag: this._allowDragging(),
          allowResize: this._allowResizing(),
          itemTemplate: this._getAppointmentTemplate('appointmentTemplate')
        });
        this._postponeResourceLoading().done(function (resources) {
          var _a;
          _this2._refreshWorkSpace(resources);
          (_a = _this2._header) === null || _a === void 0 ? void 0 : _a.option(_this2._headerConfig());
          _this2._filterAppointmentsByDate();
          _this2._appointments.option('allowAllDayResize', value !== 'day');
        });
        // NOTE:
        // Calling postponed operations (promises) here, because when we update options with
        // usage of the beginUpdate / endUpdate methods, other option changes
        // may try to access not initialized values inside the scheduler component.
        this.postponedOperations.callPostponedOperations();
        break;
      case 'appointmentTemplate':
        this._appointments.option('itemTemplate', value);
        break;
      case 'dateCellTemplate':
      case 'resourceCellTemplate':
      case 'dataCellTemplate':
      case 'timeCellTemplate':
        this.repaint();
        break;
      case 'groups':
        this._postponeResourceLoading().done(function (resources) {
          _this2._refreshWorkSpace(resources);
          _this2._filterAppointmentsByDate();
        });
        break;
      case 'resources':
        this._dataAccessors.resources = (0, _m_utils2.createExpressions)(this.option('resources'));
        this.agendaResourceProcessor.initializeState(this.option('resources'));
        this.updateInstances();
        this._postponeResourceLoading().done(function (resources) {
          _this2._appointments.option('items', []);
          _this2._refreshWorkSpace(resources);
          _this2._filterAppointmentsByDate();
          _this2._createAppointmentPopupForm();
        });
        break;
      case 'startDayHour':
      case 'endDayHour':
        this._validateDayHours();
        this.updateInstances();
        this._appointments.option('items', []);
        this._updateOption('workSpace', name, value);
        this._appointments.repaint();
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      case StoreEventNames.ADDING:
      case StoreEventNames.ADDED:
      case StoreEventNames.UPDATING:
      case StoreEventNames.UPDATED:
      case StoreEventNames.DELETING:
      case StoreEventNames.DELETED:
      case 'onAppointmentFormOpening':
      case 'onAppointmentTooltipShowing':
        this._actions[name] = this._createActionByOption(name);
        break;
      case 'onAppointmentRendered':
        this._appointments.option('onItemRendered', this._getAppointmentRenderedAction());
        break;
      case 'onAppointmentClick':
        this._appointments.option('onItemClick', this._createActionByOption(name));
        break;
      case 'onAppointmentDblClick':
        this._appointments.option(name, this._createActionByOption(name));
        break;
      case 'onAppointmentContextMenu':
        this._appointments.option('onItemContextMenu', this._createActionByOption(name));
        this._appointmentTooltip._options.onItemContextMenu = this._createActionByOption(name);
        break;
      case 'noDataText':
      case 'allowMultipleCellSelection':
      case 'selectedCellData':
      case 'accessKey':
      case 'onCellClick':
        this._workSpace.option(name, value);
        break;
      case 'onCellContextMenu':
        this._workSpace.option(name, value);
        break;
      case 'crossScrollingEnabled':
        this._postponeResourceLoading().done(function (resources) {
          _this2._appointments.option('items', []);
          _this2._refreshWorkSpace(resources);
          if (_this2._readyToRenderAppointments) {
            _this2._appointments.option('items', _this2._getAppointmentsToRepaint());
          }
        });
        break;
      case 'cellDuration':
        this._validateCellDuration();
        this._updateOption('workSpace', name, value);
        this._appointments.option('items', []);
        if (this._readyToRenderAppointments) {
          this._updateOption('workSpace', 'hoursInterval', value / 60);
          this._appointments.option('items', this._getAppointmentsToRepaint());
        }
        break;
      case 'tabIndex':
      case 'focusStateEnabled':
        this._updateOption('header', name, value);
        this._updateOption('workSpace', name, value);
        this._appointments.option(name, value);
        // @ts-expect-error
        _Widget.prototype._optionChanged.call(this, args);
        break;
      case 'width':
        // TODO: replace with css
        this._updateOption('header', name, value);
        if (this.option('crossScrollingEnabled')) {
          this._updateOption('workSpace', 'width', value);
        }
        this._updateOption('workSpace', 'schedulerWidth', value);
        // @ts-expect-error
        _Widget.prototype._optionChanged.call(this, args);
        this._dimensionChanged(null, true);
        break;
      case 'height':
        // @ts-expect-error
        _Widget.prototype._optionChanged.call(this, args);
        this._dimensionChanged(null, true);
        this._updateOption('workSpace', 'schedulerHeight', value);
        break;
      case 'editing':
        {
          this._initEditing();
          var editing = this._editing;
          this._bringEditingModeToAppointments(editing);
          this.hideAppointmentTooltip();
          this._cleanPopup();
          break;
        }
      case 'showAllDayPanel':
        this.updateInstances();
        this.repaint();
        break;
      case 'showCurrentTimeIndicator':
      case 'indicatorTime':
      case 'indicatorUpdateInterval':
      case 'shadeUntilCurrentTime':
      case 'groupByDate':
        this._updateOption('workSpace', name, value);
        this.repaint();
        break;
      case 'appointmentDragging':
      case 'appointmentTooltipTemplate':
      case 'appointmentPopupTemplate':
      case 'recurrenceEditMode':
      case 'remoteFiltering':
      case 'timeZone':
        this.updateInstances();
        this.repaint();
        break;
      case 'dropDownAppointmentTemplate':
      case 'appointmentCollectorTemplate':
      case '_appointmentTooltipOffset':
      case '_appointmentTooltipButtonsPosition':
      case '_appointmentTooltipOpenButtonText':
      case '_appointmentCountPerCell':
      case '_collectorOffset':
      case '_appointmentOffset':
        this.repaint();
        break;
      case 'dateSerializationFormat':
        break;
      case 'maxAppointmentsPerCell':
        break;
      case 'startDateExpr':
      case 'endDateExpr':
      case 'startDateTimeZoneExpr':
      case 'endDateTimeZoneExpr':
      case 'textExpr':
      case 'descriptionExpr':
      case 'allDayExpr':
      case 'recurrenceRuleExpr':
      case 'recurrenceExceptionExpr':
      case 'disabledExpr':
        this._updateExpression(name, value);
        this.appointmentDataProvider.updateDataAccessors(this._dataAccessors);
        this._initAppointmentTemplate();
        this.repaint();
        break;
      case 'adaptivityEnabled':
        this._toggleAdaptiveClass();
        this.repaint();
        break;
      case 'scrolling':
        this.option('crossScrollingEnabled', this._isHorizontalVirtualScrolling() || this.option('crossScrollingEnabled'));
        this._updateOption('workSpace', args.fullName, value);
        break;
      case 'allDayPanelMode':
        this._updateOption('workSpace', args.fullName, value);
        break;
      case 'renovateRender':
        this._updateOption('workSpace', name, value);
        break;
      case '_draggingMode':
        this._workSpace.option('draggingMode', value);
        break;
      case 'toolbar':
        this._header ? this._header.option('items', value) : this.repaint();
        break;
      case 'loadedResources':
      case 'resourceLoaderMap':
        break;
      default:
        // @ts-expect-error
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto._dateOption = function _dateOption(optionName) {
    var optionValue = this._getCurrentViewOption(optionName);
    return _date_serialization.default.deserializeDate(optionValue);
  };
  _proto._getSerializationFormat = function _getSerializationFormat(optionName) {
    var value = this._getCurrentViewOption(optionName);
    if (typeof value === 'number') {
      return 'number';
    }
    if (!(0, _type.isString)(value)) {
      return;
    }
    return _date_serialization.default.getDateSerializationFormat(value);
  };
  _proto._bringEditingModeToAppointments = function _bringEditingModeToAppointments(editing) {
    var editingConfig = {
      allowDelete: editing.allowUpdating && editing.allowDeleting
    };
    if (!this._isAgenda()) {
      editingConfig.allowDrag = editing.allowDragging;
      editingConfig.allowResize = editing.allowResizing;
      editingConfig.allowAllDayResize = editing.allowResizing && this._supportAllDayResizing();
    }
    this._appointments.option(editingConfig);
    this.repaint();
  };
  _proto._isAgenda = function _isAgenda() {
    return this.getLayoutManager().appointmentRenderingStrategyName === 'agenda';
  };
  _proto._allowDragging = function _allowDragging() {
    return this._editing.allowDragging && !this._isAgenda();
  };
  _proto._allowResizing = function _allowResizing() {
    return this._editing.allowResizing && !this._isAgenda();
  };
  _proto._allowAllDayResizing = function _allowAllDayResizing() {
    return this._editing.allowResizing && this._supportAllDayResizing();
  };
  _proto._supportAllDayResizing = function _supportAllDayResizing() {
    return this.currentViewType !== 'day' || this.currentView.intervalCount > 1;
  };
  _proto._isAllDayExpanded = function _isAllDayExpanded() {
    return this.option('showAllDayPanel') && this.appointmentDataProvider.hasAllDayAppointments(this.filteredItems, this.preparedItems);
  };
  _proto._getTimezoneOffsetByOption = function _getTimezoneOffsetByOption(date) {
    return _m_utils_time_zone.default.calculateTimezoneByValue(this.option('timeZone'), date);
  };
  _proto._filterAppointmentsByDate = function _filterAppointmentsByDate() {
    var dateRange = this._workSpace.getDateRange();
    var startDate = this.timeZoneCalculator.createDate(dateRange[0], {
      path: 'fromGrid'
    });
    var endDate = this.timeZoneCalculator.createDate(dateRange[1], {
      path: 'fromGrid'
    });
    this.appointmentDataProvider.filterByDate(startDate, endDate, this.option('remoteFiltering'), this.option('dateSerializationFormat'));
  };
  _proto._reloadDataSource = function _reloadDataSource() {
    var _this3 = this;
    // @ts-expect-error
    var result = new _deferred.Deferred();
    if (this._dataSource) {
      this._dataSource.load().done(function () {
        (0, _m_loading.hide)();
        _this3._fireContentReadyAction(result);
      }).fail(function () {
        (0, _m_loading.hide)();
        result.reject();
      });
      this._dataSource.isLoading() && (0, _m_loading.show)({
        container: this.$element(),
        position: {
          of: this.$element()
        }
      });
    } else {
      this._fireContentReadyAction(result);
    }
    return result.promise();
  };
  _proto._fireContentReadyAction = function _fireContentReadyAction(result) {
    var _a;
    // @ts-expect-error
    var contentReadyBase = _Widget.prototype._fireContentReadyAction.bind(this);
    var fireContentReady = function fireContentReady() {
      contentReadyBase();
      result === null || result === void 0 ? void 0 : result.resolve();
    };
    if (this._workSpaceRecalculation) {
      (_a = this._workSpaceRecalculation) === null || _a === void 0 ? void 0 : _a.done(function () {
        fireContentReady();
      });
    } else {
      fireContentReady();
    }
  };
  _proto._dimensionChanged = function _dimensionChanged(value) {
    var isForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var isFixedHeight = typeof this.option('height') === 'number';
    var isFixedWidth = typeof this.option('width') === 'number';
    // @ts-expect-error
    if (!this._isVisible()) {
      return;
    }
    this._toggleSmallClass();
    var workspace = this.getWorkSpace();
    if (!this._isAgenda() && this.filteredItems && workspace) {
      if (isForce || !isFixedHeight || !isFixedWidth) {
        workspace.option('allDayExpanded', this._isAllDayExpanded());
        workspace._dimensionChanged();
        var appointments = this.getLayoutManager().createAppointmentsMap(this.filteredItems);
        this._appointments.option('items', appointments);
      }
    }
    this.hideAppointmentTooltip();
    // TODO popup
    this._appointmentPopup.triggerResize();
    this._appointmentPopup.updatePopupFullScreenMode();
  };
  _proto._clean = function _clean() {
    this._cleanPopup();
    // @ts-expect-error
    _Widget.prototype._clean.call(this);
  };
  _proto._toggleSmallClass = function _toggleSmallClass() {
    var _getBoundingRect = (0, _position.getBoundingRect)(this.$element().get(0)),
      width = _getBoundingRect.width;
    this.$element().toggleClass(WIDGET_SMALL_CLASS, width < WIDGET_SMALL_WIDTH);
  };
  _proto._toggleAdaptiveClass = function _toggleAdaptiveClass() {
    this.$element().toggleClass(WIDGET_ADAPTIVE_CLASS, this.option('adaptivityEnabled'));
  };
  _proto._visibilityChanged = function _visibilityChanged(visible) {
    visible && this._dimensionChanged(null, true);
  };
  _proto._dataSourceOptions = function _dataSourceOptions() {
    return {
      paginate: false
    };
  };
  _proto._initAllDayPanel = function _initAllDayPanel() {
    if (this.option('allDayPanelMode') === 'hidden') {
      this.option('showAllDayPanel', false);
    }
  };
  _proto._init = function _init() {
    this._initExpressions({
      startDate: this.option('startDateExpr'),
      endDate: this.option('endDateExpr'),
      startDateTimeZone: this.option('startDateTimeZoneExpr'),
      endDateTimeZone: this.option('endDateTimeZoneExpr'),
      allDay: this.option('allDayExpr'),
      text: this.option('textExpr'),
      description: this.option('descriptionExpr'),
      recurrenceRule: this.option('recurrenceRuleExpr'),
      recurrenceException: this.option('recurrenceExceptionExpr'),
      disabled: this.option('disabledExpr')
    });
    // @ts-expect-error
    _Widget.prototype._init.call(this);
    this._initAllDayPanel();
    // @ts-expect-error
    this._initDataSource();
    this._customizeDataSourceLoadOptions();
    this.$element().addClass(WIDGET_CLASS);
    this._initEditing();
    this.updateInstances();
    this._initActions();
    this._compactAppointmentsHelper = new _m_compact_appointments_helper.CompactAppointmentsHelper(this);
    this._asyncTemplatesTimers = [];
    this._dataSourceLoadedCallback = (0, _callbacks.default)();
    this._subscribes = _m_subscribes.default;
    this.agendaResourceProcessor = new _m_agenda_resource_processor.AgendaResourceProcessor(this.option('resources'));
  };
  _proto.createAppointmentDataProvider = function createAppointmentDataProvider() {
    var _this4 = this;
    var _a;
    (_a = this.appointmentDataProvider) === null || _a === void 0 ? void 0 : _a.destroy();
    this.appointmentDataProvider = new _m_appointment_data_provider.AppointmentDataProvider({
      dataSource: this._dataSource,
      dataAccessors: this._dataAccessors,
      timeZoneCalculator: this.timeZoneCalculator,
      dateSerializationFormat: this.option('dateSerializationFormat'),
      resources: this.option('resources'),
      startDayHour: this._getCurrentViewOption('startDayHour'),
      endDayHour: this._getCurrentViewOption('endDayHour'),
      appointmentDuration: this._getCurrentViewOption('cellDuration'),
      allDayPanelMode: this._getCurrentViewOption('allDayPanelMode'),
      showAllDayPanel: this.option('showAllDayPanel'),
      getLoadedResources: function getLoadedResources() {
        return _this4.option('loadedResources');
      },
      getIsVirtualScrolling: function getIsVirtualScrolling() {
        return _this4.isVirtualScrolling();
      },
      getSupportAllDayRow: function getSupportAllDayRow() {
        return _this4._workSpace.supportAllDayRow();
      },
      getViewType: function getViewType() {
        return _this4._workSpace.type;
      },
      getViewDirection: function getViewDirection() {
        return _this4._workSpace.viewDirection;
      },
      getDateRange: function getDateRange() {
        return _this4._workSpace.getDateRange();
      },
      getGroupCount: function getGroupCount() {
        return _this4._workSpace._getGroupCount();
      },
      getViewDataProvider: function getViewDataProvider() {
        return _this4._workSpace.viewDataProvider;
      }
    });
  };
  _proto.updateInstances = function updateInstances() {
    this._timeZoneCalculator = null;
    if (this.getWorkSpace()) {
      this.createAppointmentDataProvider();
    }
  };
  _proto._customizeDataSourceLoadOptions = function _customizeDataSourceLoadOptions() {
    var _this5 = this;
    var _a;
    (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.on('customizeStoreLoadOptions', function (_ref) {
      var storeLoadOptions = _ref.storeLoadOptions;
      storeLoadOptions.startDate = _this5.getStartViewDate();
      storeLoadOptions.endDate = _this5.getEndViewDate();
    });
  };
  _proto._initTemplates = function _initTemplates() {
    this._initAppointmentTemplate();
    this._templateManager.addDefaultTemplates({
      appointmentTooltip: new _empty_template.EmptyTemplate(),
      dropDownAppointment: new _empty_template.EmptyTemplate()
    });
    // @ts-expect-error
    _Widget.prototype._initTemplates.call(this);
  };
  _proto._initAppointmentTemplate = function _initAppointmentTemplate() {
    var _this6 = this;
    var expr = this._dataAccessors.expr;
    var createGetter = function createGetter(property) {
      return (0, _data.compileGetter)("appointmentData.".concat(property));
    };
    var getDate = function getDate(getter) {
      return function (data) {
        var value = getter(data);
        if (value instanceof Date) {
          return value.valueOf();
        }
        return value;
      };
    };
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(function ($container, data, model) {
        return _this6.getAppointmentsInstance()._renderAppointmentTemplate($container, data, model);
      }, ['html', 'text', 'startDate', 'endDate', 'allDay', 'description', 'recurrenceRule', 'recurrenceException', 'startDateTimeZone', 'endDateTimeZone'], this.option('integrationOptions.watchMethod'), {
        text: createGetter(expr.textExpr),
        startDate: getDate(createGetter(expr.startDateExpr)),
        endDate: getDate(createGetter(expr.endDateExpr)),
        startDateTimeZone: createGetter(expr.startDateTimeZoneExpr),
        endDateTimeZone: createGetter(expr.endDateTimeZoneExpr),
        allDay: createGetter(expr.allDayExpr),
        recurrenceRule: createGetter(expr.recurrenceRuleExpr)
      })
    });
  };
  _proto._renderContent = function _renderContent() {
    // @ts-expect-error
    this._renderContentImpl();
  };
  _proto._updatePreparedItems = function _updatePreparedItems(items) {
    this.preparedItems = (0, _data2.getPreparedDataItems)(items, this._dataAccessors, this._getCurrentViewOption('cellDuration'), this.timeZoneCalculator);
  };
  _proto._dataSourceChangedHandler = function _dataSourceChangedHandler(result) {
    var _this7 = this;
    if (this._readyToRenderAppointments) {
      this._workSpaceRecalculation.done(function () {
        _this7._updatePreparedItems(result);
        _this7._renderAppointments();
        _this7.getWorkSpace().onDataSourceChanged(_this7.filteredItems);
      });
    }
  };
  _proto.isVirtualScrolling = function isVirtualScrolling() {
    var _a;
    var workspace = this.getWorkSpace();
    if (workspace) {
      return workspace.isVirtualScrolling();
    }
    var currentViewOptions = this._getCurrentViewOptions();
    var scrolling = this.option('scrolling');
    return (scrolling === null || scrolling === void 0 ? void 0 : scrolling.mode) === 'virtual' || ((_a = currentViewOptions === null || currentViewOptions === void 0 ? void 0 : currentViewOptions.scrolling) === null || _a === void 0 ? void 0 : _a.mode) === 'virtual';
  };
  _proto._filterAppointments = function _filterAppointments() {
    this.filteredItems = this.appointmentDataProvider.filter(this.preparedItems);
  };
  _proto._renderAppointments = function _renderAppointments() {
    var workspace = this.getWorkSpace();
    this._filterAppointments();
    workspace.option('allDayExpanded', this._isAllDayExpanded());
    var viewModel = [];
    // @ts-expect-error
    if (this._isVisible()) {
      viewModel = this._getAppointmentsToRepaint();
    }
    if (this.option('isRenovatedAppointments')) {
      (0, _m_render.renderAppointments)({
        instance: this,
        $dateTable: this.getWorkSpace()._getDateTable(),
        viewModel
      });
    } else {
      this._appointments.option('items', viewModel);
    }
    this.appointmentDataProvider.cleanState();
  };
  _proto._getAppointmentsToRepaint = function _getAppointmentsToRepaint() {
    var layoutManager = this.getLayoutManager();
    var appointmentsMap = layoutManager.createAppointmentsMap(this.filteredItems);
    if (this.option('isRenovatedAppointments')) {
      var appointmentTemplate = this.option('appointmentTemplate') !== DEFAULT_APPOINTMENT_TEMPLATE_NAME ? this.option('appointmentTemplate') : undefined;
      return {
        appointments: appointmentsMap,
        appointmentTemplate
      };
    }
    return layoutManager.getRepaintedAppointments(appointmentsMap, this.getAppointmentsInstance().option('items'));
  };
  _proto._initExpressions = function _initExpressions(fields) {
    this._dataAccessors = _m_utils.utils.dataAccessors.create(fields, this._dataAccessors, (0, _config.default)().forceIsoDateParsing, this.option('dateSerializationFormat'));
    this._dataAccessors.resources = (0, _m_utils2.createExpressions)(this.option('resources'));
  };
  _proto._updateExpression = function _updateExpression(name, value) {
    var exprObj = {};
    exprObj[name.replace('Expr', '')] = value;
    this._initExpressions(exprObj);
  };
  _proto.getResourceDataAccessors = function getResourceDataAccessors() {
    return this._dataAccessors.resources;
  };
  _proto._initEditing = function _initEditing() {
    var editing = this.option('editing');
    this._editing = {
      allowAdding: !!editing,
      allowUpdating: !!editing,
      allowDeleting: !!editing,
      allowResizing: !!editing,
      allowDragging: !!editing
    };
    if ((0, _type.isObject)(editing)) {
      this._editing = (0, _extend.extend)(this._editing, editing);
    }
    this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
    this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
    this.$element().toggleClass(WIDGET_READONLY_CLASS, this._isReadOnly());
  };
  _proto._isReadOnly = function _isReadOnly() {
    var result = true;
    var editing = this._editing;
    // eslint-disable-next-line no-restricted-syntax
    for (var prop in editing) {
      if (Object.prototype.hasOwnProperty.call(editing, prop)) {
        result = result && !editing[prop];
      }
    }
    return result;
  };
  _proto._dispose = function _dispose() {
    var _a;
    this._appointmentTooltip && this._appointmentTooltip.dispose();
    (_a = this._recurrenceDialog) === null || _a === void 0 ? void 0 : _a.hide(RECURRENCE_EDITING_MODE.CANCEL);
    this.hideAppointmentPopup();
    this.hideAppointmentTooltip();
    this._asyncTemplatesTimers.forEach(clearTimeout);
    this._asyncTemplatesTimers = [];
    // @ts-expect-error
    _Widget.prototype._dispose.call(this);
  };
  _proto._initActions = function _initActions() {
    this._actions = {
      onAppointmentAdding: this._createActionByOption(StoreEventNames.ADDING),
      onAppointmentAdded: this._createActionByOption(StoreEventNames.ADDED),
      onAppointmentUpdating: this._createActionByOption(StoreEventNames.UPDATING),
      onAppointmentUpdated: this._createActionByOption(StoreEventNames.UPDATED),
      onAppointmentDeleting: this._createActionByOption(StoreEventNames.DELETING),
      onAppointmentDeleted: this._createActionByOption(StoreEventNames.DELETED),
      onAppointmentFormOpening: this._createActionByOption('onAppointmentFormOpening'),
      onAppointmentTooltipShowing: this._createActionByOption('onAppointmentTooltipShowing')
    };
  };
  _proto._getAppointmentRenderedAction = function _getAppointmentRenderedAction() {
    return this._createActionByOption('onAppointmentRendered', {
      excludeValidators: ['disabled', 'readOnly']
    });
  };
  _proto._renderFocusTarget = function _renderFocusTarget() {
    return (0, _common.noop)();
  };
  _proto._initMarkup = function _initMarkup() {
    var _this8 = this;
    // @ts-expect-error
    _Widget.prototype._initMarkup.call(this);
    this._validateDayHours();
    this._validateCellDuration();
    this._renderMainContainer();
    this._renderHeader();
    this._layoutManager = new _m_appointments_layout_manager.default(this);
    // @ts-expect-error
    this._appointments = this._createComponent('<div>', _m_appointment_collection.default, this._appointmentsConfig());
    this._appointments.option('itemTemplate', this._getAppointmentTemplate('appointmentTemplate'));
    this._appointmentTooltip = new (this.option('adaptivityEnabled') ? _m_mobile_tooltip_strategy.MobileTooltipStrategy : _m_desktop_tooltip_strategy.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
    this._createAppointmentPopupForm();
    // @ts-expect-error
    if (this._isDataSourceLoaded() || this._isDataSourceLoading()) {
      this._initMarkupCore(this.option('loadedResources'));
      this._dataSourceChangedHandler(this._dataSource.items());
      this._fireContentReadyAction();
    } else {
      var groups = this._getCurrentViewOption('groups');
      (0, _m_utils2.loadResources)(groups, this.option('resources'), this.option('resourceLoaderMap')).done(function (resources) {
        _this8.option('loadedResources', resources);
        _this8._initMarkupCore(resources);
        _this8._reloadDataSource();
      });
    }
  };
  _proto._createAppointmentPopupForm = function _createAppointmentPopupForm() {
    var _a, _b;
    if (this._appointmentForm) {
      (_a = this._appointmentForm.form) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    this._appointmentForm = this.createAppointmentForm();
    (_b = this._appointmentPopup) === null || _b === void 0 ? void 0 : _b.dispose();
    this._appointmentPopup = this.createAppointmentPopup(this._appointmentForm);
  };
  _proto._renderMainContainer = function _renderMainContainer() {
    this._mainContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-container');
    this.$element().append(this._mainContainer);
  };
  _proto.createAppointmentForm = function createAppointmentForm() {
    var _this9 = this;
    var scheduler = {
      createResourceEditorModel: function createResourceEditorModel() {
        return (0, _m_utils2.createResourceEditorModel)(_this9.option('resources'), _this9.option('loadedResources'));
      },
      getDataAccessors: function getDataAccessors() {
        return _this9._dataAccessors;
      },
      // @ts-expect-error
      createComponent: function createComponent(element, component, options) {
        return _this9._createComponent(element, component, options);
      },
      getEditingConfig: function getEditingConfig() {
        return _this9._editing;
      },
      getFirstDayOfWeek: function getFirstDayOfWeek() {
        return _this9.option('firstDayOfWeek');
      },
      getStartDayHour: function getStartDayHour() {
        return _this9.option('startDayHour');
      },
      getCalculatedEndDate: function getCalculatedEndDate(startDateWithStartHour) {
        return _this9._workSpace.calculateEndDate(startDateWithStartHour);
      },
      getTimeZoneCalculator: function getTimeZoneCalculator() {
        return _this9.timeZoneCalculator;
      }
    };
    return new _m_form.AppointmentForm(scheduler);
  };
  _proto.createAppointmentPopup = function createAppointmentPopup(form) {
    var _this10 = this;
    var scheduler = {
      getElement: function getElement() {
        return _this10.$element();
      },
      // @ts-expect-error
      createComponent: function createComponent(element, component, options) {
        return _this10._createComponent(element, component, options);
      },
      focus: function focus() {
        return _this10.focus();
      },
      getResources: function getResources() {
        return _this10.option('resources');
      },
      getEditingConfig: function getEditingConfig() {
        return _this10._editing;
      },
      getTimeZoneCalculator: function getTimeZoneCalculator() {
        return _this10.timeZoneCalculator;
      },
      getDataAccessors: function getDataAccessors() {
        return _this10._dataAccessors;
      },
      getAppointmentFormOpening: function getAppointmentFormOpening() {
        return _this10._actions.onAppointmentFormOpening;
      },
      processActionResult: function processActionResult(arg, canceled) {
        return _this10._processActionResult(arg, canceled);
      },
      addAppointment: function addAppointment(appointment) {
        return _this10.addAppointment(appointment);
      },
      updateAppointment: function updateAppointment(sourceAppointment, updatedAppointment) {
        return _this10.updateAppointment(sourceAppointment, updatedAppointment);
      },
      updateScrollPosition: function updateScrollPosition(startDate, resourceItem, inAllDayRow) {
        _this10._workSpace.updateScrollPosition(startDate, resourceItem, inAllDayRow);
      }
    };
    return new _m_popup.AppointmentPopup(scheduler, form);
  };
  _proto._getAppointmentTooltipOptions = function _getAppointmentTooltipOptions() {
    var _this11 = this;
    var that = this;
    return {
      // @ts-expect-error
      createComponent: that._createComponent.bind(that),
      container: that.$element(),
      getScrollableContainer: that.getWorkSpaceScrollableContainer.bind(that),
      addDefaultTemplates: that._templateManager.addDefaultTemplates.bind(that._templateManager),
      getAppointmentTemplate: that._getAppointmentTemplate.bind(that),
      showAppointmentPopup: that.showAppointmentPopup.bind(that),
      checkAndDeleteAppointment: that.checkAndDeleteAppointment.bind(that),
      isAppointmentInAllDayPanel: that.isAppointmentInAllDayPanel.bind(that),
      createFormattedDateText: function createFormattedDateText(appointment, targetedAppointment, format) {
        return _this11.fire('getTextAndFormatDate', appointment, targetedAppointment, format);
      },
      getAppointmentDisabled: function getAppointmentDisabled(appointment) {
        return (0, _m_appointment_adapter.createAppointmentAdapter)(appointment, _this11._dataAccessors, _this11.timeZoneCalculator).disabled;
      },
      onItemContextMenu: that._createActionByOption('onAppointmentContextMenu'),
      createEventArgs: that._createEventArgs.bind(that)
    };
  };
  _proto._createEventArgs = function _createEventArgs(e) {
    var config = {
      itemData: e.itemData.appointment,
      itemElement: e.itemElement,
      targetedAppointment: e.itemData.targetedAppointment
    };
    return (0, _extend.extend)({}, this.fire('mapAppointmentFields', config), {
      component: e.component,
      element: e.element,
      event: e.event,
      model: e.model
    });
  };
  _proto.checkAndDeleteAppointment = function checkAndDeleteAppointment(appointment, targetedAppointment) {
    var _this12 = this;
    var targetedAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(targetedAppointment, this._dataAccessors, this.timeZoneCalculator);
    var deletingOptions = this.fireOnAppointmentDeleting(appointment, targetedAdapter);
    this._checkRecurringAppointment(appointment, targetedAppointment, targetedAdapter.startDate, function () {
      _this12.processDeleteAppointment(appointment, deletingOptions);
    }, true);
  };
  _proto._getExtraAppointmentTooltipOptions = function _getExtraAppointmentTooltipOptions() {
    return {
      rtlEnabled: this.option('rtlEnabled'),
      focusStateEnabled: this.option('focusStateEnabled'),
      editing: this.option('editing'),
      offset: this.option('_appointmentTooltipOffset')
    };
  };
  _proto.isAppointmentInAllDayPanel = function isAppointmentInAllDayPanel(appointmentData) {
    var workSpace = this._workSpace;
    var itTakesAllDay = this.appointmentTakesAllDay(appointmentData);
    return itTakesAllDay && workSpace.supportAllDayRow() && workSpace.option('showAllDayPanel');
  };
  _proto._initMarkupCore = function _initMarkupCore(resources) {
    var _this13 = this;
    this._readyToRenderAppointments = (0, _window.hasWindow)();
    this._workSpace && this._cleanWorkspace();
    this._renderWorkSpace(resources);
    this._appointments.option({
      fixedContainer: this._workSpace.getFixedContainer(),
      allDayContainer: this._workSpace.getAllDayContainer()
    });
    this._waitAsyncTemplate(function () {
      var _a;
      return (_a = _this13._workSpaceRecalculation) === null || _a === void 0 ? void 0 : _a.resolve();
    });
    this.createAppointmentDataProvider();
    this._filterAppointmentsByDate();
    this._validateKeyFieldIfAgendaExist();
  };
  _proto._isDataSourceLoaded = function _isDataSourceLoaded() {
    return this._dataSource && this._dataSource.isLoaded();
  };
  _proto._render = function _render() {
    var _a;
    // NOTE: remove small class applying after adaptivity implementation
    this._toggleSmallClass();
    this._toggleAdaptiveClass();
    (_a = this.getWorkSpace()) === null || _a === void 0 ? void 0 : _a.updateHeaderEmptyCellWidth();
    // @ts-expect-error
    _Widget.prototype._render.call(this);
  };
  _proto._renderHeader = function _renderHeader() {
    if (this.option('toolbar').length !== 0) {
      var $header = (0, _renderer.default)('<div>').appendTo(this._mainContainer);
      // @ts-expect-error
      this._header = this._createComponent($header, _m_header.SchedulerHeader, this._headerConfig());
    }
  };
  _proto._headerConfig = function _headerConfig() {
    var _this14 = this;
    var currentViewOptions = this._getCurrentViewOptions();
    var countConfig = this._getViewCountConfig();
    var result = (0, _extend.extend)({
      firstDayOfWeek: this.getFirstDayOfWeek(),
      currentView: this.option('currentView'),
      isAdaptive: this.option('adaptivityEnabled'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      rtlEnabled: this.option('rtlEnabled'),
      useDropDownViewSwitcher: this.option('useDropDownViewSwitcher'),
      customizeDateNavigatorText: this.option('customizeDateNavigatorText'),
      agendaDuration: currentViewOptions.agendaDuration || DEFAULT_AGENDA_DURATION
    }, currentViewOptions);
    result.intervalCount = countConfig.intervalCount;
    result.views = this.option('views');
    result.min = new Date(this._dateOption('min'));
    result.max = new Date(this._dateOption('max'));
    result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));
    result.onCurrentViewChange = function (name) {
      _this14.option('currentView', name);
    };
    result.onCurrentDateChange = function (date) {
      _this14.option('currentDate', date);
    };
    result.items = this.option('toolbar');
    result.startViewDate = this.getStartViewDate();
    result.todayDate = function () {
      var result = _this14.timeZoneCalculator.createDate(new Date(), {
        path: 'toGrid'
      });
      return result;
    };
    return result;
  };
  _proto._appointmentsConfig = function _appointmentsConfig() {
    var _this15 = this;
    var config = {
      getResources: function getResources() {
        return _this15.option('resources');
      },
      getResourceDataAccessors: this.getResourceDataAccessors.bind(this),
      getAgendaResourceProcessor: function getAgendaResourceProcessor() {
        return _this15.agendaResourceProcessor;
      },
      getAppointmentColor: this.createGetAppointmentColor(),
      getAppointmentDataProvider: function getAppointmentDataProvider() {
        return _this15.appointmentDataProvider;
      },
      dataAccessors: this._dataAccessors,
      observer: this,
      onItemRendered: this._getAppointmentRenderedAction(),
      onItemClick: this._createActionByOption('onAppointmentClick'),
      onItemContextMenu: this._createActionByOption('onAppointmentContextMenu'),
      onAppointmentDblClick: this._createActionByOption('onAppointmentDblClick'),
      tabIndex: this.option('tabIndex'),
      focusStateEnabled: this.option('focusStateEnabled'),
      allowDrag: this._allowDragging(),
      allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
      allowResize: this._allowResizing(),
      allowAllDayResize: this._allowAllDayResizing(),
      rtlEnabled: this.option('rtlEnabled'),
      currentView: this.currentView,
      groups: this._getCurrentViewOption('groups'),
      isRenovatedAppointments: this.option('isRenovatedAppointments'),
      timeZoneCalculator: this.timeZoneCalculator,
      getResizableStep: function getResizableStep() {
        return _this15._workSpace ? _this15._workSpace.positionHelper.getResizableStep() : 0;
      },
      getDOMElementsMetaData: function getDOMElementsMetaData() {
        var _a;
        return (_a = _this15._workSpace) === null || _a === void 0 ? void 0 : _a.getDOMElementsMetaData();
      },
      getViewDataProvider: function getViewDataProvider() {
        var _a;
        return (_a = _this15._workSpace) === null || _a === void 0 ? void 0 : _a.viewDataProvider;
      },
      isVerticalViewDirection: function isVerticalViewDirection() {
        return _this15.getRenderingStrategyInstance().getDirection() === 'vertical';
      },
      isVerticalGroupedWorkSpace: function isVerticalGroupedWorkSpace() {
        return _this15._workSpace._isVerticalGroupedWorkSpace();
      },
      isDateAndTimeView: function isDateAndTimeView() {
        return (0, _base.isDateAndTimeView)(_this15._workSpace.type);
      },
      onContentReady: function onContentReady() {
        var _a;
        (_a = _this15._workSpace) === null || _a === void 0 ? void 0 : _a.option('allDayExpanded', _this15._isAllDayExpanded());
      }
    };
    return config;
  };
  _proto.getCollectorOffset = function getCollectorOffset() {
    if (this._workSpace.needApplyCollectorOffset() && !this.option('adaptivityEnabled')) {
      return this.option('_collectorOffset');
    }
    return 0;
  };
  _proto.getAppointmentDurationInMinutes = function getAppointmentDurationInMinutes() {
    return this._getCurrentViewOption('cellDuration');
  };
  _proto._getCurrentViewType = function _getCurrentViewType() {
    return this.currentViewType;
  };
  _proto._renderWorkSpace = function _renderWorkSpace(groups) {
    var _a;
    this._readyToRenderAppointments && this._toggleSmallClass();
    var $workSpace = (0, _renderer.default)('<div>').appendTo(this._mainContainer);
    var countConfig = this._getViewCountConfig();
    var workSpaceComponent = VIEWS_CONFIG[this._getCurrentViewType()].workSpace;
    var workSpaceConfig = this._workSpaceConfig(groups, countConfig);
    // @ts-expect-error
    this._workSpace = this._createComponent($workSpace, workSpaceComponent, workSpaceConfig);
    this._allowDragging() && this._workSpace.initDragBehavior(this, this._all);
    this._workSpace._attachTablesEvents();
    this._workSpace.getWorkArea().append(this._appointments.$element());
    this._recalculateWorkspace();
    countConfig.startDate && ((_a = this._header) === null || _a === void 0 ? void 0 : _a.option('currentDate', this._workSpace._getHeaderDate()));
    this._appointments.option('_collectorOffset', this.getCollectorOffset());
  };
  _proto._getViewCountConfig = function _getViewCountConfig() {
    var currentView = this.option('currentView');
    var view = this._getViewByName(currentView);
    var viewCount = view && view.intervalCount || 1;
    var startDate = view && view.startDate || null;
    return {
      intervalCount: viewCount,
      startDate
    };
  };
  _proto._getViewByName = function _getViewByName(name) {
    var views = this.option('views');
    for (var i = 0; i < views.length; i++) {
      if (views[i].name === name || views[i].type === name || views[i] === name) return views[i];
    }
  };
  _proto._recalculateWorkspace = function _recalculateWorkspace() {
    var _this16 = this;
    // @ts-expect-error
    this._workSpaceRecalculation = new _deferred.Deferred();
    this._waitAsyncTemplate(function () {
      (0, _visibility_change.triggerResizeEvent)(_this16._workSpace.$element());
      _this16._workSpace._refreshDateTimeIndication();
    });
  };
  _proto._workSpaceConfig = function _workSpaceConfig(groups, countConfig) {
    var _this17 = this;
    var _a;
    var currentViewOptions = this._getCurrentViewOptions();
    var scrolling = this.option('scrolling');
    var isVirtualScrolling = scrolling.mode === 'virtual' || ((_a = currentViewOptions.scrolling) === null || _a === void 0 ? void 0 : _a.mode) === 'virtual';
    var horizontalVirtualScrollingAllowed = isVirtualScrolling && (!(0, _type.isDefined)(scrolling.orientation) || ['horizontal', 'both'].filter(function (item) {
      var _a;
      return scrolling.orientation === item || ((_a = currentViewOptions.scrolling) === null || _a === void 0 ? void 0 : _a.orientation) === item;
    }).length > 0);
    var crossScrollingEnabled = this.option('crossScrollingEnabled') || horizontalVirtualScrollingAllowed || (0, _base.isTimelineView)(this.currentViewType);
    var result = (0, _extend.extend)({
      resources: this.option('resources'),
      loadedResources: this.option('loadedResources'),
      getFilteredItems: function getFilteredItems() {
        return _this17.filteredItems;
      },
      getResourceDataAccessors: this.getResourceDataAccessors.bind(this),
      noDataText: this.option('noDataText'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour'),
      tabIndex: this.option('tabIndex'),
      accessKey: this.option('accessKey'),
      focusStateEnabled: this.option('focusStateEnabled'),
      cellDuration: this.option('cellDuration'),
      showAllDayPanel: this.option('showAllDayPanel'),
      showCurrentTimeIndicator: this.option('showCurrentTimeIndicator'),
      indicatorTime: this.option('indicatorTime'),
      indicatorUpdateInterval: this.option('indicatorUpdateInterval'),
      shadeUntilCurrentTime: this.option('shadeUntilCurrentTime'),
      allDayExpanded: this._appointments.option('items'),
      crossScrollingEnabled,
      dataCellTemplate: this.option('dataCellTemplate'),
      timeCellTemplate: this.option('timeCellTemplate'),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      dateCellTemplate: this.option('dateCellTemplate'),
      allowMultipleCellSelection: this.option('allowMultipleCellSelection'),
      selectedCellData: this.option('selectedCellData'),
      onSelectionChanged: function onSelectionChanged(args) {
        _this17.option('selectedCellData', args.selectedCellData);
      },
      groupByDate: this._getCurrentViewOption('groupByDate'),
      scrolling,
      draggingMode: this.option('_draggingMode'),
      timeZoneCalculator: this.timeZoneCalculator,
      schedulerHeight: this.option('height'),
      schedulerWidth: this.option('width'),
      allDayPanelMode: this.option('allDayPanelMode'),
      onSelectedCellsClick: this.showAddAppointmentPopup.bind(this),
      onRenderAppointments: this._renderAppointments.bind(this),
      onShowAllDayPanel: function onShowAllDayPanel(value) {
        return _this17.option('showAllDayPanel', value);
      },
      getHeaderHeight: function getHeaderHeight() {
        return _m_utils.utils.DOM.getHeaderHeight(_this17._header);
      },
      onScrollEnd: function onScrollEnd() {
        return _this17._appointments.updateResizableArea();
      },
      // TODO: SSR does not work correctly with renovated render
      renovateRender: this._isRenovatedRender(isVirtualScrolling),
      isRenovatedAppointments: this.option('isRenovatedAppointments')
    }, currentViewOptions);
    result.observer = this;
    result.intervalCount = countConfig.intervalCount;
    result.startDate = countConfig.startDate;
    result.groups = groups;
    result.onCellClick = this._createActionByOption('onCellClick');
    result.onCellContextMenu = this._createActionByOption('onCellContextMenu');
    result.currentDate = _date.default.trimTime(new Date(this._dateOption('currentDate')));
    result.hoursInterval = result.cellDuration / 60;
    result.allDayExpanded = false;
    result.dataCellTemplate = result.dataCellTemplate ? this._getTemplate(result.dataCellTemplate) : null;
    result.timeCellTemplate = result.timeCellTemplate ? this._getTemplate(result.timeCellTemplate) : null;
    result.resourceCellTemplate = result.resourceCellTemplate ? this._getTemplate(result.resourceCellTemplate) : null;
    result.dateCellTemplate = result.dateCellTemplate ? this._getTemplate(result.dateCellTemplate) : null;
    result.getAppointmentDataProvider = function () {
      return _this17.appointmentDataProvider;
    };
    return result;
  };
  _proto._isRenovatedRender = function _isRenovatedRender(isVirtualScrolling) {
    return this.option('renovateRender') && (0, _window.hasWindow)() || isVirtualScrolling;
  };
  _proto._waitAsyncTemplate = function _waitAsyncTemplate(callback) {
    if (this._options.silent('templatesRenderAsynchronously')) {
      var timer = setTimeout(function () {
        callback();
        clearTimeout(timer);
      });
      this._asyncTemplatesTimers.push(timer);
    } else {
      callback();
    }
  };
  _proto._getCurrentViewOptions = function _getCurrentViewOptions() {
    return this.currentView;
  };
  _proto._getCurrentViewOption = function _getCurrentViewOption(optionName) {
    if (this.currentView && this.currentView[optionName] !== undefined) {
      return this.currentView[optionName];
    }
    return this.option(optionName);
  };
  _proto._getAppointmentTemplate = function _getAppointmentTemplate(optionName) {
    var currentViewOptions = this._getCurrentViewOptions();
    if (currentViewOptions && currentViewOptions[optionName]) {
      return this._getTemplate(currentViewOptions[optionName]);
    }
    // @ts-expect-error
    return this._getTemplateByOption(optionName);
  };
  _proto._updateOption = function _updateOption(viewName, optionName, value) {
    var currentViewOptions = this._getCurrentViewOptions();
    if (!currentViewOptions || !(0, _type.isDefined)(currentViewOptions[optionName])) {
      this["_".concat(viewName)].option(optionName, value);
    }
  };
  _proto._refreshWorkSpace = function _refreshWorkSpace(groups) {
    var _this18 = this;
    this._cleanWorkspace();
    delete this._workSpace;
    this._renderWorkSpace(groups);
    if (this._readyToRenderAppointments) {
      this._appointments.option({
        fixedContainer: this._workSpace.getFixedContainer(),
        allDayContainer: this._workSpace.getAllDayContainer()
      });
      this._waitAsyncTemplate(function () {
        return _this18._workSpaceRecalculation.resolve();
      });
    }
  };
  _proto._cleanWorkspace = function _cleanWorkspace() {
    this._appointments.$element().detach();
    this._workSpace._dispose();
    this._workSpace.$element().remove();
    this.option('selectedCellData', []);
  };
  _proto.getWorkSpaceScrollable = function getWorkSpaceScrollable() {
    return this._workSpace.getScrollable();
  };
  _proto.getWorkSpaceScrollableContainer = function getWorkSpaceScrollableContainer() {
    return this._workSpace.getScrollableContainer();
  };
  _proto.getWorkSpace = function getWorkSpace() {
    return this._workSpace;
  };
  _proto.getHeader = function getHeader() {
    return this._header;
  };
  _proto._cleanPopup = function _cleanPopup() {
    var _a;
    (_a = this._appointmentPopup) === null || _a === void 0 ? void 0 : _a.dispose();
  };
  _proto._checkRecurringAppointment = function _checkRecurringAppointment(rawAppointment, singleAppointment, exceptionDate, callback, isDeleted, isPopupEditing, dragEvent, recurrenceEditMode) {
    var _this19 = this;
    var recurrenceRule = _m_expression_utils.ExpressionUtils.getField(this._dataAccessors, 'recurrenceRule', rawAppointment);
    if (!(0, _m_recurrence.getRecurrenceProcessor)().evalRecurrenceRule(recurrenceRule).isValid || !this._editing.allowUpdating) {
      callback();
      return;
    }
    var editMode = recurrenceEditMode || this.option('recurrenceEditMode');
    switch (editMode) {
      case 'series':
        callback();
        break;
      case 'occurrence':
        this._excludeAppointmentFromSeries(rawAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
        break;
      default:
        if (dragEvent) {
          // @ts-expect-error
          dragEvent.cancel = new _deferred.Deferred();
        }
        this._showRecurrenceChangeConfirm(isDeleted).done(function (editingMode) {
          editingMode === RECURRENCE_EDITING_MODE.SERIES && callback();
          editingMode === RECURRENCE_EDITING_MODE.OCCURENCE && _this19._excludeAppointmentFromSeries(rawAppointment, singleAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent);
        }).fail(function () {
          return _this19._appointments.moveAppointmentBack(dragEvent);
        });
    }
  };
  _proto._excludeAppointmentFromSeries = function _excludeAppointmentFromSeries(rawAppointment, newRawAppointment, exceptionDate, isDeleted, isPopupEditing, dragEvent) {
    var _this20 = this;
    var appointment = (0, _excludeFromRecurrence.excludeFromRecurrence)(rawAppointment, exceptionDate, this._dataAccessors, this._timeZoneCalculator);
    var singleRawAppointment = _extends({}, newRawAppointment);
    /* eslint-disable @typescript-eslint/no-dynamic-delete */
    delete singleRawAppointment[this._dataAccessors.expr.recurrenceExceptionExpr];
    delete singleRawAppointment[this._dataAccessors.expr.recurrenceRuleExpr];
    var keyPropertyName = this.appointmentDataProvider.keyName;
    delete singleRawAppointment[keyPropertyName];
    /* eslint-enable @typescript-eslint/no-dynamic-delete */
    var canCreateNewAppointment = !isDeleted && !isPopupEditing;
    if (canCreateNewAppointment) {
      this.addAppointment(singleRawAppointment);
    }
    if (isPopupEditing) {
      this._appointmentPopup.show(singleRawAppointment, {
        isToolbarVisible: true,
        action: _m_popup.ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES,
        excludeInfo: {
          sourceAppointment: rawAppointment,
          updatedAppointment: appointment.source()
        }
      });
      this._editAppointmentData = rawAppointment;
    } else {
      this._updateAppointment(rawAppointment, appointment.source(), function () {
        _this20._appointments.moveAppointmentBack(dragEvent);
      }, dragEvent);
    }
  };
  _proto._createRecurrenceException = function _createRecurrenceException(appointment, exceptionDate) {
    var result = [];
    if (appointment.recurrenceException) {
      result.push(appointment.recurrenceException);
    }
    result.push(this._getSerializedDate(exceptionDate, appointment.startDate, appointment.allDay));
    return result.join();
  };
  _proto._getSerializedDate = function _getSerializedDate(date, startDate, isAllDay) {
    isAllDay && date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
    return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT);
  };
  _proto._showRecurrenceChangeConfirm = function _showRecurrenceChangeConfirm(isDeleted) {
    var message = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteMessage' : 'dxScheduler-confirmRecurrenceEditMessage');
    var seriesText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteSeries' : 'dxScheduler-confirmRecurrenceEditSeries');
    var occurrenceText = _message.default.format(isDeleted ? 'dxScheduler-confirmRecurrenceDeleteOccurrence' : 'dxScheduler-confirmRecurrenceEditOccurrence');
    this._recurrenceDialog = (0, _dialog.custom)({
      messageHtml: message,
      showCloseButton: true,
      showTitle: true,
      buttons: [{
        text: seriesText,
        onClick() {
          return RECURRENCE_EDITING_MODE.SERIES;
        }
      }, {
        text: occurrenceText,
        onClick() {
          return RECURRENCE_EDITING_MODE.OCCURENCE;
        }
      }],
      popupOptions: {
        wrapperAttr: {
          class: 'dx-dialog'
        }
      }
    });
    return this._recurrenceDialog.show();
  };
  _proto._getUpdatedData = function _getUpdatedData(rawAppointment) {
    var _this21 = this;
    var getConvertedFromGrid = function getConvertedFromGrid(date) {
      return date ? _this21.timeZoneCalculator.createDate(date, {
        path: 'fromGrid'
      }) : undefined;
    };
    var isValidDate = function isValidDate(date) {
      return !isNaN(new Date(date).getTime());
    };
    var targetCell = this.getTargetCellData();
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    var cellStartDate = getConvertedFromGrid(targetCell.startDate);
    var cellEndDate = getConvertedFromGrid(targetCell.endDate);
    var appointmentStartDate = new Date(appointment.startDate);
    var appointmentEndDate = new Date(appointment.endDate);
    var resultedStartDate = cellStartDate || appointmentStartDate;
    if (!isValidDate(appointmentStartDate)) {
      appointmentStartDate = resultedStartDate;
    }
    if (!isValidDate(appointmentEndDate)) {
      appointmentEndDate = cellEndDate;
    }
    var duration = appointmentEndDate.getTime() - appointmentStartDate.getTime();
    var isKeepAppointmentHours = this._workSpace.keepOriginalHours() && isValidDate(appointment.startDate) && isValidDate(cellStartDate);
    if (isKeepAppointmentHours) {
      var trimTime = _date.default.trimTime;
      var startDate = this.timeZoneCalculator.createDate(appointment.startDate, {
        path: 'toGrid'
      });
      var timeInMs = startDate.getTime() - trimTime(startDate).getTime();
      resultedStartDate = new Date(trimTime(targetCell.startDate).getTime() + timeInMs);
      resultedStartDate = this.timeZoneCalculator.createDate(resultedStartDate, {
        path: 'fromGrid'
      });
    }
    var result = (0, _m_appointment_adapter.createAppointmentAdapter)({}, this._dataAccessors, this.timeZoneCalculator);
    if (targetCell.allDay !== undefined) {
      result.allDay = targetCell.allDay;
    }
    result.startDate = resultedStartDate;
    var resultedEndDate = new Date(resultedStartDate.getTime() + duration);
    if (this.appointmentTakesAllDay(rawAppointment) && !result.allDay && this._workSpace.supportAllDayRow()) {
      resultedEndDate = this._workSpace.calculateEndDate(resultedStartDate);
    }
    if (appointment.allDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
      var dateCopy = new Date(resultedStartDate);
      dateCopy.setHours(0);
      resultedEndDate = new Date(dateCopy.getTime() + duration);
      if (resultedEndDate.getHours() !== 0) {
        resultedEndDate.setHours(this._getCurrentViewOption('endDayHour'));
      }
    }
    var timeZoneOffset = _m_utils_time_zone.default.getTimezoneOffsetChangeInMs(appointmentStartDate, appointmentEndDate, resultedStartDate, resultedEndDate);
    result.endDate = new Date(resultedEndDate.getTime() - timeZoneOffset);
    var rawResult = result.source();
    (0, _m_utils2.setResourceToAppointment)(this.option('resources'), this.getResourceDataAccessors(), rawResult, targetCell.groups);
    return rawResult;
  };
  _proto.getTargetedAppointment = function getTargetedAppointment(appointment, element) {
    var settings = _m_utils.utils.dataAccessors.getAppointmentSettings(element);
    var info = _m_utils.utils.dataAccessors.getAppointmentInfo(element);
    var appointmentIndex = (0, _renderer.default)(element).data(this._appointments._itemIndexKey());
    var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(appointment, this._dataAccessors, this.timeZoneCalculator);
    var targetedAdapter = adapter.clone();
    if (this._isAgenda() && adapter.isRecurrent) {
      var agendaSettings = settings.agendaSettings;
      targetedAdapter.startDate = _m_expression_utils.ExpressionUtils.getField(this._dataAccessors, 'startDate', agendaSettings);
      targetedAdapter.endDate = _m_expression_utils.ExpressionUtils.getField(this._dataAccessors, 'endDate', agendaSettings);
    } else if (settings) {
      targetedAdapter.startDate = info ? info.sourceAppointment.startDate : adapter.startDate; // TODO: in agenda we havn't info field
      targetedAdapter.endDate = info ? info.sourceAppointment.endDate : adapter.endDate;
    }
    var rawTargetedAppointment = targetedAdapter.source();
    if (element) {
      this.setTargetedAppointmentResources(rawTargetedAppointment, element, appointmentIndex);
    }
    if (info) {
      rawTargetedAppointment.displayStartDate = new Date(info.appointment.startDate);
      rawTargetedAppointment.displayEndDate = new Date(info.appointment.endDate);
    }
    return rawTargetedAppointment;
  };
  _proto.subscribe = function subscribe(subject, action) {
    this._subscribes[subject] = _m_subscribes.default[subject] = action;
  };
  _proto.fire = function fire(subject) {
    var callback = this._subscribes[subject];
    var args = Array.prototype.slice.call(arguments);
    if (!(0, _type.isFunction)(callback)) {
      throw _ui.default.Error('E1031', subject);
    }
    return callback.apply(this, args.slice(1));
  };
  _proto.getTargetCellData = function getTargetCellData() {
    return this._workSpace.getDataByDroppableCell();
  };
  _proto._updateAppointment = function _updateAppointment(target, rawAppointment, onUpdatePrevented, dragEvent) {
    var updatingOptions = {
      newData: rawAppointment,
      oldData: (0, _extend.extend)({}, target),
      cancel: false
    };
    var performFailAction = function (err) {
      if (onUpdatePrevented) {
        onUpdatePrevented.call(this);
      }
      if (err && err.name === 'Error') {
        throw err;
      }
    }.bind(this);
    this._actions[StoreEventNames.UPDATING](updatingOptions);
    if (dragEvent && !(0, _type.isDeferred)(dragEvent.cancel)) {
      // @ts-expect-error
      dragEvent.cancel = new _deferred.Deferred();
    }
    return this._processActionResult(updatingOptions, function (canceled) {
      var _this22 = this;
      // @ts-expect-error
      var deferred = new _deferred.Deferred();
      if (!canceled) {
        this._expandAllDayPanel(rawAppointment);
        try {
          deferred = this.appointmentDataProvider.update(target, rawAppointment).done(function () {
            dragEvent && dragEvent.cancel.resolve(false);
          }).always(function (storeAppointment) {
            return _this22._onDataPromiseCompleted(StoreEventNames.UPDATED, storeAppointment);
          }).fail(function () {
            return performFailAction();
          });
        } catch (err) {
          performFailAction(err);
          deferred.resolve();
        }
      } else {
        performFailAction();
        deferred.resolve();
      }
      return deferred.promise();
    });
  };
  _proto._processActionResult = function _processActionResult(actionOptions, callback) {
    var _this23 = this;
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    var resolveCallback = function resolveCallback(callbackResult) {
      (0, _deferred.when)((0, _deferred.fromPromise)(callbackResult)).always(deferred.resolve);
    };
    if ((0, _type.isPromise)(actionOptions.cancel)) {
      (0, _deferred.when)((0, _deferred.fromPromise)(actionOptions.cancel)).always(function (cancel) {
        if (!(0, _type.isDefined)(cancel)) {
          cancel = actionOptions.cancel.state() === 'rejected';
        }
        resolveCallback(callback.call(_this23, cancel));
      });
    } else {
      resolveCallback(callback.call(this, actionOptions.cancel));
    }
    return deferred.promise();
  };
  _proto._expandAllDayPanel = function _expandAllDayPanel(appointment) {
    if (!this._isAllDayExpanded() && this.appointmentTakesAllDay(appointment)) {
      this._workSpace.option('allDayExpanded', true);
    }
  };
  _proto._onDataPromiseCompleted = function _onDataPromiseCompleted(handlerName, storeAppointment, appointment) {
    var args = {
      appointmentData: appointment || storeAppointment
    };
    if (storeAppointment instanceof Error) {
      args.error = storeAppointment;
    } else {
      this._appointmentPopup.visible && this._appointmentPopup.hide();
    }
    this._actions[handlerName](args);
    this._fireContentReadyAction();
  };
  _proto.getAppointmentsInstance = function getAppointmentsInstance() {
    return this._appointments;
  };
  _proto.getLayoutManager = function getLayoutManager() {
    return this._layoutManager;
  };
  _proto.getRenderingStrategyInstance = function getRenderingStrategyInstance() {
    return this.getLayoutManager().getRenderingStrategyInstance();
  };
  _proto.getActions = function getActions() {
    return this._actions;
  };
  _proto.appointmentTakesAllDay = function appointmentTakesAllDay(rawAppointment) {
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, this._getCurrentViewOption('startDayHour'), this._getCurrentViewOption('endDayHour'), this._getCurrentViewOption('allDayPanelMode'));
  };
  _proto.dayHasAppointment = function dayHasAppointment(day, rawAppointment, trimTime) {
    var _this24 = this;
    var getConvertedToTimeZone = function getConvertedToTimeZone(date) {
      return _this24.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    var startDate = new Date(appointment.startDate);
    var endDate = new Date(appointment.endDate);
    startDate = getConvertedToTimeZone(startDate);
    endDate = getConvertedToTimeZone(endDate);
    if (day.getTime() === endDate.getTime()) {
      return startDate.getTime() === endDate.getTime();
    }
    if (trimTime) {
      day = _date.default.trimTime(day);
      startDate = _date.default.trimTime(startDate);
      endDate = _date.default.trimTime(endDate);
    }
    var dayTimeStamp = day.getTime();
    var startDateTimeStamp = startDate.getTime();
    var endDateTimeStamp = endDate.getTime();
    return startDateTimeStamp <= dayTimeStamp && dayTimeStamp <= endDateTimeStamp;
  };
  _proto.setTargetedAppointmentResources = function setTargetedAppointmentResources(rawAppointment, element, appointmentIndex) {
    var groups = this._getCurrentViewOption('groups');
    if (groups === null || groups === void 0 ? void 0 : groups.length) {
      var resourcesSetter = this.getResourceDataAccessors().setter;
      var workSpace = this._workSpace;
      var getGroups;
      var setResourceCallback;
      if (this._isAgenda()) {
        getGroups = function getGroups() {
          var apptSettings = this.getLayoutManager()._positionMap[appointmentIndex];
          return (0, _m_utils2.getCellGroups)(apptSettings[0].groupIndex, this.getWorkSpace().option('groups'));
        };
        setResourceCallback = function setResourceCallback(_, group) {
          resourcesSetter[group.name](rawAppointment, group.id);
        };
      } else {
        getGroups = function getGroups() {
          // TODO: in the future, necessary refactor the engine of determining groups
          var setting = _m_utils.utils.dataAccessors.getAppointmentSettings(element) || {};
          return workSpace.getCellDataByCoordinates({
            left: setting.left,
            top: setting.top
          }).groups;
        };
        setResourceCallback = function setResourceCallback(field, value) {
          resourcesSetter[field](rawAppointment, value);
        };
      }
      (0, _iterator.each)(getGroups.call(this), setResourceCallback);
    }
  };
  _proto.getStartViewDate = function getStartViewDate() {
    var _a;
    return (_a = this._workSpace) === null || _a === void 0 ? void 0 : _a.getStartViewDate();
  };
  _proto.getEndViewDate = function getEndViewDate() {
    return this._workSpace.getEndViewDate();
  };
  _proto.showAddAppointmentPopup = function showAddAppointmentPopup(cellData, cellGroups) {
    var appointmentAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)({}, this._dataAccessors, this.timeZoneCalculator);
    appointmentAdapter.allDay = cellData.allDay;
    appointmentAdapter.startDate = this.timeZoneCalculator.createDate(cellData.startDate, {
      path: 'fromGrid'
    });
    appointmentAdapter.endDate = this.timeZoneCalculator.createDate(cellData.endDate, {
      path: 'fromGrid'
    });
    var resultAppointment = (0, _extend.extend)(appointmentAdapter.source(), cellGroups);
    this.showAppointmentPopup(resultAppointment, true);
  };
  _proto.showAppointmentPopup = function showAppointmentPopup(rawAppointment, createNewAppointment, rawTargetedAppointment) {
    var _this25 = this;
    var newRawTargetedAppointment = _extends({}, rawTargetedAppointment);
    if (newRawTargetedAppointment) {
      delete newRawTargetedAppointment.displayStartDate;
      delete newRawTargetedAppointment.displayEndDate;
    }
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(newRawTargetedAppointment || rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    var newTargetedAppointment = (0, _extend.extend)({}, rawAppointment, newRawTargetedAppointment);
    var isCreateAppointment = createNewAppointment !== null && createNewAppointment !== void 0 ? createNewAppointment : (0, _type.isEmptyObject)(rawAppointment);
    if ((0, _type.isEmptyObject)(rawAppointment)) {
      rawAppointment = this.createPopupAppointment();
    }
    if (isCreateAppointment) {
      delete this._editAppointmentData; // TODO
      this._editing.allowAdding && this._appointmentPopup.show(rawAppointment, {
        isToolbarVisible: true,
        action: _m_popup.ACTION_TO_APPOINTMENT.CREATE
      });
    } else {
      this._checkRecurringAppointment(rawAppointment, newTargetedAppointment, appointment.startDate, function () {
        _this25._editAppointmentData = rawAppointment; // TODO
        _this25._appointmentPopup.show(rawAppointment, {
          isToolbarVisible: _this25._editing.allowUpdating,
          action: _m_popup.ACTION_TO_APPOINTMENT.UPDATE
        });
      }, false, true);
    }
  };
  _proto.createPopupAppointment = function createPopupAppointment() {
    var result = {};
    var toMs = _date.default.dateToMilliseconds;
    var startDate = new Date(this.option('currentDate'));
    var endDate = new Date(startDate.getTime() + this.option('cellDuration') * toMs('minute'));
    _m_expression_utils.ExpressionUtils.setField(this._dataAccessors, 'startDate', result, startDate);
    _m_expression_utils.ExpressionUtils.setField(this._dataAccessors, 'endDate', result, endDate);
    return result;
  };
  _proto.hideAppointmentPopup = function hideAppointmentPopup(saveChanges) {
    var _a;
    if ((_a = this._appointmentPopup) === null || _a === void 0 ? void 0 : _a.visible) {
      saveChanges && this._appointmentPopup.saveChangesAsync();
      this._appointmentPopup.hide();
    }
  };
  _proto.showAppointmentTooltip = function showAppointmentTooltip(appointment, element, targetedAppointment) {
    if (appointment) {
      var settings = _m_utils.utils.dataAccessors.getAppointmentSettings(element);
      var appointmentConfig = {
        itemData: targetedAppointment || appointment,
        groupIndex: settings === null || settings === void 0 ? void 0 : settings.groupIndex,
        groups: this.option('groups')
      };
      var _getAppointmentColor = this.createGetAppointmentColor();
      var deferredColor = _getAppointmentColor(appointmentConfig);
      var info = new _m_data_structures.AppointmentTooltipInfo(appointment, targetedAppointment, deferredColor);
      this.showAppointmentTooltipCore(element, [info]);
    }
  };
  _proto.createGetAppointmentColor = function createGetAppointmentColor() {
    var _this26 = this;
    return function (appointmentConfig) {
      var resourceConfig = {
        resources: _this26.option('resources'),
        dataAccessors: _this26.getResourceDataAccessors(),
        loadedResources: _this26.option('loadedResources'),
        resourceLoaderMap: _this26.option('resourceLoaderMap')
      };
      return (0, _m_utils2.getAppointmentColor)(resourceConfig, appointmentConfig);
    };
  };
  _proto.showAppointmentTooltipCore = function showAppointmentTooltipCore(target, data, options) {
    var _this27 = this;
    var arg = {
      cancel: false,
      appointments: data.map(function (item) {
        var result = {
          appointmentData: item.appointment,
          currentAppointmentData: _extends({}, item.targetedAppointment),
          color: item.color
        };
        if (item.settings.info) {
          var _item$settings$info$a = item.settings.info.appointment,
            startDate = _item$settings$info$a.startDate,
            endDate = _item$settings$info$a.endDate;
          result.currentAppointmentData.displayStartDate = startDate;
          result.currentAppointmentData.displayEndDate = endDate;
        }
        return result;
      }),
      targetElement: target
    };
    this._createActionByOption('onAppointmentTooltipShowing')(arg);
    if (this._appointmentTooltip.isAlreadyShown(target)) {
      this.hideAppointmentTooltip();
    } else {
      this._processActionResult(arg, function (canceled) {
        !canceled && _this27._appointmentTooltip.show(target, data, _extends(_extends({}, _this27._getExtraAppointmentTooltipOptions()), options));
      });
    }
  };
  _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
    this._appointmentTooltip && this._appointmentTooltip.hide();
  };
  _proto.scrollToTime = function scrollToTime(hours, minutes, date) {
    _ui.default.log('W0002', 'dxScheduler', 'scrollToTime', '21.1', 'Use the "scrollTo" method instead');
    this._workSpace.scrollToTime(hours, minutes, date);
  };
  _proto.scrollTo = function scrollTo(date, groups, allDay) {
    this._workSpace.scrollTo(date, groups, allDay);
  };
  _proto._isHorizontalVirtualScrolling = function _isHorizontalVirtualScrolling() {
    var scrolling = this.option('scrolling');
    var orientation = scrolling.orientation,
      mode = scrolling.mode;
    var isVirtualScrolling = mode === 'virtual';
    return isVirtualScrolling && (orientation === 'horizontal' || orientation === 'both');
  };
  _proto.addAppointment = function addAppointment(rawAppointment) {
    var _this28 = this;
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    appointment.text = appointment.text || '';
    var serializedAppointment = appointment.source(true);
    var addingOptions = {
      appointmentData: serializedAppointment,
      cancel: false
    };
    this._actions[StoreEventNames.ADDING](addingOptions);
    return this._processActionResult(addingOptions, function (canceled) {
      if (canceled) {
        // @ts-expect-error
        return new _deferred.Deferred().resolve();
      }
      _this28._expandAllDayPanel(serializedAppointment);
      return _this28.appointmentDataProvider.add(serializedAppointment).always(function (storeAppointment) {
        return _this28._onDataPromiseCompleted(StoreEventNames.ADDED, storeAppointment);
      });
    });
  };
  _proto.updateAppointment = function updateAppointment(target, appointment) {
    return this._updateAppointment(target, appointment);
  };
  _proto.deleteAppointment = function deleteAppointment(rawAppointment) {
    var deletingOptions = this.fireOnAppointmentDeleting(rawAppointment);
    this.processDeleteAppointment(rawAppointment, deletingOptions);
  };
  _proto.fireOnAppointmentDeleting = function fireOnAppointmentDeleting(rawAppointment, targetedAppointmentData) {
    var deletingOptions = {
      appointmentData: rawAppointment,
      targetedAppointmentData,
      cancel: false
    };
    this._actions[StoreEventNames.DELETING](deletingOptions);
    return deletingOptions;
  };
  _proto.processDeleteAppointment = function processDeleteAppointment(rawAppointment, deletingOptions) {
    this._processActionResult(deletingOptions, function (canceled) {
      var _this29 = this;
      if (!canceled) {
        this.appointmentDataProvider.remove(rawAppointment).always(function (storeAppointment) {
          return _this29._onDataPromiseCompleted(StoreEventNames.DELETED, storeAppointment, rawAppointment);
        });
      }
    });
  };
  _proto.deleteRecurrence = function deleteRecurrence(appointment, date, recurrenceEditMode) {
    var _this30 = this;
    this._checkRecurringAppointment(appointment, {}, date, function () {
      _this30.processDeleteAppointment(appointment, {
        cancel: false
      });
    }, true, false, null, recurrenceEditMode);
  };
  _proto.focus = function focus() {
    if (this._editAppointmentData) {
      this._appointments.focus();
    } else {
      this._workSpace.focus();
    }
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    return (0, _type.isDefined)(this.option('firstDayOfWeek')) ? this.option('firstDayOfWeek') : _date2.default.firstDayOfWeekIndex();
  };
  _proto._validateKeyFieldIfAgendaExist = function _validateKeyFieldIfAgendaExist() {
    if (!this.appointmentDataProvider.isDataSourceInit) {
      return;
    }
    var hasAgendaView = !!this._getViewByName('agenda');
    var isKeyExist = !!this.appointmentDataProvider.keyName;
    if (hasAgendaView && !isKeyExist) {
      _ui.default.log('W1023');
    }
  };
  _proto._validateCellDuration = function _validateCellDuration() {
    var endDayHour = this._getCurrentViewOption('endDayHour');
    var startDayHour = this._getCurrentViewOption('startDayHour');
    var cellDuration = this._getCurrentViewOption('cellDuration');
    if ((endDayHour - startDayHour) * MINUTES_IN_HOUR % cellDuration !== 0) {
      _ui.default.log('W1015');
    }
  };
  _proto._validateDayHours = function _validateDayHours() {
    var startDayHour = this._getCurrentViewOption('startDayHour');
    var endDayHour = this._getCurrentViewOption('endDayHour');
    (0, _base.validateDayHours)(startDayHour, endDayHour);
  };
  _proto._getDragBehavior = function _getDragBehavior() {
    return this._workSpace.dragBehavior;
  };
  _createClass(Scheduler, [{
    key: "filteredItems",
    get: function get() {
      if (!this._filteredItems) {
        this._filteredItems = [];
      }
      return this._filteredItems;
    },
    set: function set(value) {
      this._filteredItems = value;
    }
  }, {
    key: "preparedItems",
    get: function get() {
      if (!this._preparedItems) {
        this._preparedItems = [];
      }
      return this._preparedItems;
    },
    set: function set(value) {
      this._preparedItems = value;
    }
  }, {
    key: "currentView",
    get: function get() {
      return (0, _untyped_getCurrentView.renovationGetCurrentView)(this.option('currentView'), this.option('views'));
    }
  }, {
    key: "currentViewType",
    get: function get() {
      return (0, _type.isObject)(this.currentView) ? this.currentView.type : this.currentView;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      if (!this._timeZoneCalculator) {
        this._timeZoneCalculator = (0, _createTimeZoneCalculator.createTimeZoneCalculator)(this.option('timeZone'));
      }
      return this._timeZoneCalculator;
    }
  }]);
  return Scheduler;
}(_ui2.default);
Scheduler.include(_data_helper.default);
(0, _component_registrator.default)('dxScheduler', Scheduler);
var _default = Scheduler;
exports.default = _default;
