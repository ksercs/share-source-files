"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentForm = exports.APPOINTMENT_FORM_GROUP_NAMES = void 0;
require("../m_recurrence_editor");
require("../../../ui/text_area");
require("../../../ui/tag_box");
require("../../../ui/switch");
require("../../../ui/select_box");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _date_serialization = _interopRequireDefault(require("../../../core/utils/date_serialization"));
var _extend = require("../../../core/utils/extend");
var _data_source = _interopRequireDefault(require("../../../data/data_source"));
var _message = _interopRequireDefault(require("../../../localization/message"));
var _semaphore = require("../../../renovation/ui/scheduler/utils/semaphore/semaphore");
var _form = _interopRequireDefault(require("../../../ui/form"));
var _m_appointment_adapter = require("../m_appointment_adapter");
var _m_utils_timezones_data = _interopRequireDefault(require("../timezones/m_utils_timezones_data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
var APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
exports.APPOINTMENT_FORM_GROUP_NAMES = APPOINTMENT_FORM_GROUP_NAMES;
var getStartDateWithStartHour = function getStartDateWithStartHour(startDate, startDayHour) {
  return new Date(new Date(startDate).setHours(startDayHour));
};
var validateAppointmentFormDate = function validateAppointmentFormDate(editor, value, previousValue) {
  var isCurrentDateCorrect = value === null || !!value;
  var isPreviousDateCorrect = previousValue === null || !!previousValue;
  if (!isCurrentDateCorrect && isPreviousDateCorrect) {
    editor.option('value', previousValue);
  }
};
var updateRecurrenceItemVisibility = function updateRecurrenceItemVisibility(recurrenceRuleExpr, value, form) {
  var _a;
  form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
  !value && form.updateData(recurrenceRuleExpr, '');
  (_a = form.getEditor(recurrenceRuleExpr)) === null || _a === void 0 ? void 0 : _a.changeValueByVisibility(value);
};
var createDateBoxEditor = function createDateBoxEditor(dataField, colSpan, firstDayOfWeek, label, onValueChanged) {
  return {
    editorType: 'dxDateBox',
    dataField,
    colSpan,
    label: {
      text: _message.default.format(label)
    },
    validationRules: [{
      type: 'required'
    }],
    editorOptions: {
      width: '100%',
      calendarOptions: {
        firstDayOfWeek
      },
      onValueChanged,
      useMaskBehavior: true
    }
  };
};
var AppointmentForm = /*#__PURE__*/function () {
  function AppointmentForm(scheduler) {
    this.scheduler = scheduler;
    this.form = null;
    this.semaphore = new _semaphore.Semaphore();
  }
  var _proto = AppointmentForm.prototype;
  _proto.create = function create(triggerResize, changeSize, formData) {
    var _this = this;
    var _this$scheduler$getEd = this.scheduler.getEditingConfig(),
      allowTimeZoneEditing = _this$scheduler$getEd.allowTimeZoneEditing;
    var _this$scheduler$getDa = this.scheduler.getDataAccessors(),
      expr = _this$scheduler$getDa.expr;
    var recurrenceEditorVisibility = !!formData[expr.recurrenceRuleExpr]; // TODO
    var colSpan = recurrenceEditorVisibility ? 1 : 2;
    var mainItems = [].concat(_toConsumableArray(this._createMainItems(expr, triggerResize, changeSize, allowTimeZoneEditing)), _toConsumableArray(this.scheduler.createResourceEditorModel()));
    changeSize(recurrenceEditorVisibility);
    var items = [{
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Main,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      colSpan,
      items: mainItems
    }, {
      itemType: 'group',
      name: APPOINTMENT_FORM_GROUP_NAMES.Recurrence,
      visible: recurrenceEditorVisibility,
      colSpan,
      items: this._createRecurrenceEditor(expr)
    }];
    var element = (0, _renderer.default)('<div>');
    this.form = this.scheduler.createComponent(element, _form.default, {
      items,
      showValidationSummary: true,
      scrollingEnabled: true,
      colCount: 'auto',
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      formData,
      showColonAfterLabel: false,
      labelLocation: 'top',
      customizeItem: function customizeItem(e) {
        if (_this.form && e.itemType === 'group') {
          var dataExprs = _this.scheduler.getDataAccessors().expr;
          var startDate = new Date(_this.formData[dataExprs.startDateExpr]);
          var endDate = new Date(_this.formData[dataExprs.endDateExpr]);
          var startTimeZoneEditor = e.items.find(function (i) {
            return i.dataField === dataExprs.startDateTimeZoneExpr;
          });
          var endTimeZoneEditor = e.items.find(function (i) {
            return i.dataField === dataExprs.endDateTimeZoneExpr;
          });
          if (startTimeZoneEditor) {
            startTimeZoneEditor.editorOptions.dataSource = _this.createTimeZoneDataSource(startDate);
          }
          if (endTimeZoneEditor) {
            endTimeZoneEditor.editorOptions.dataSource = _this.createTimeZoneDataSource(endDate);
          }
        }
      },
      screenByWidth: function screenByWidth(width) {
        return width < SCREEN_SIZE_OF_SINGLE_COLUMN || _devices.default.current().deviceType !== 'desktop' ? 'xs' : 'lg';
      }
    });
  };
  _proto.createTimeZoneDataSource = function createTimeZoneDataSource(date) {
    return new _data_source.default({
      store: _m_utils_timezones_data.default.getDisplayedTimeZones(date),
      paginate: true,
      pageSize: 10
    });
  };
  _proto._createAppointmentAdapter = function _createAppointmentAdapter(rawAppointment) {
    return (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this.scheduler.getDataAccessors());
  };
  _proto._dateBoxValueChanged = function _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
    validateAppointmentFormDate(args.component, args.value, args.previousValue);
    var value = _date_serialization.default.deserializeDate(args.value);
    var previousValue = _date_serialization.default.deserializeDate(args.previousValue);
    var dateEditor = this.form.getEditor(dateExpr);
    var dateValue = _date_serialization.default.deserializeDate(dateEditor.option('value'));
    if (this.semaphore.isFree() && dateValue && value && isNeedCorrect(dateValue, value)) {
      var duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
      dateEditor.option('value', new Date(value.getTime() + duration));
    }
  };
  _proto._createTimezoneEditor = function _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone) {
    var _this2 = this;
    var visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var noTzTitle = _message.default.format('dxScheduler-noTimezoneTitle');
    return {
      dataField: timeZoneExpr,
      editorType: 'dxSelectBox',
      visibleIndex,
      colSpan,
      label: {
        text: ' '
      },
      editorOptions: {
        displayExpr: 'title',
        valueExpr: 'id',
        placeholder: noTzTitle,
        searchEnabled: true,
        onValueChanged: function onValueChanged(args) {
          var form = _this2.form;
          var secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);
          if (isMainTimeZone) {
            secondTimezoneEditor.option('value', args.value);
          }
        }
      },
      visible
    };
  };
  _proto._createDateBoxItems = function _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
    var _this3 = this;
    var colSpan = allowTimeZoneEditing ? 2 : 1;
    var firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
    return [createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', function (args) {
      _this3._dateBoxValueChanged(args, dataExprs.endDateExpr, function (endValue, startValue) {
        return endValue < startValue;
      });
    }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, allowTimeZoneEditing), createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', function (args) {
      _this3._dateBoxValueChanged(args, dataExprs.startDateExpr, function (startValue, endValue) {
        return endValue < startValue;
      });
    }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, allowTimeZoneEditing)];
  };
  _proto._changeFormItemDateType = function _changeFormItemDateType(itemPath, isAllDay) {
    var itemEditorOptions = this.form.itemOption(itemPath).editorOptions;
    var type = isAllDay ? 'date' : 'datetime';
    var newEditorOption = _extends(_extends({}, itemEditorOptions), {
      type
    });
    this.form.itemOption(itemPath, 'editorOptions', newEditorOption);
  };
  _proto._createMainItems = function _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
    var _this4 = this;
    return [{
      dataField: dataExprs.textExpr,
      editorType: 'dxTextBox',
      colSpan: 2,
      label: {
        text: _message.default.format('dxScheduler-editorLabelTitle')
      }
    }, {
      itemType: 'group',
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      items: this._createDateBoxItems(dataExprs, allowTimeZoneEditing)
    }, {
      itemType: 'group',
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 2
      },
      items: [{
        dataField: dataExprs.allDayExpr,
        cssClass: 'dx-appointment-form-switch',
        editorType: 'dxSwitch',
        label: {
          text: _message.default.format('dxScheduler-allDay'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: function onValueChanged(args) {
            var value = args.value;
            var startDateEditor = _this4.form.getEditor(dataExprs.startDateExpr);
            var endDateEditor = _this4.form.getEditor(dataExprs.endDateExpr);
            var startDate = _date_serialization.default.deserializeDate(startDateEditor.option('value'));
            if (_this4.semaphore.isFree() && startDate) {
              if (value) {
                var allDayStartDate = _date.default.trimTime(startDate);
                startDateEditor.option('value', new Date(allDayStartDate));
                endDateEditor.option('value', new Date(allDayStartDate));
              } else {
                var startDateWithStartHour = getStartDateWithStartHour(startDate, _this4.scheduler.getStartDayHour());
                var endDate = _this4.scheduler.getCalculatedEndDate(startDateWithStartHour);
                startDateEditor.option('value', startDateWithStartHour);
                endDateEditor.option('value', endDate);
              }
            }
            var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.startDateExpr);
            var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.endDateExpr);
            _this4._changeFormItemDateType(startDateItemPath, value);
            _this4._changeFormItemDateType(endDateItemPath, value);
          }
        }
      }, {
        editorType: 'dxSwitch',
        dataField: 'repeat',
        cssClass: 'dx-appointment-form-switch',
        name: 'visibilityChanged',
        label: {
          text: _message.default.format('dxScheduler-editorLabelRecurrence'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: function onValueChanged(args) {
            var form = _this4.form;
            var colSpan = args.value ? 1 : 2;
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Main, 'colSpan', colSpan);
            form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'colSpan', colSpan);
            updateRecurrenceItemVisibility(dataExprs.recurrenceRuleExpr, args.value, form);
            changeSize(args.value);
            triggerResize();
          }
        }
      }]
    }, {
      itemType: 'empty',
      colSpan: 2
    }, {
      dataField: dataExprs.descriptionExpr,
      editorType: 'dxTextArea',
      colSpan: 2,
      label: {
        text: _message.default.format('dxScheduler-editorLabelDescription')
      }
    }, {
      itemType: 'empty',
      colSpan: 2
    }];
  };
  _proto._createRecurrenceEditor = function _createRecurrenceEditor(dataExprs) {
    var _this5 = this;
    return [{
      dataField: dataExprs.recurrenceRuleExpr,
      editorType: 'dxRecurrenceEditor',
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
        timeZoneCalculator: this.scheduler.getTimeZoneCalculator(),
        getStartDateTimeZone: function getStartDateTimeZone() {
          return _this5._createAppointmentAdapter(_this5.formData).startDateTimeZone;
        }
      },
      label: {
        text: ' ',
        visible: false
      }
    }];
  };
  _proto.setEditorsType = function setEditorsType(allDay) {
    var _this$scheduler$getDa2 = this.scheduler.getDataAccessors().expr,
      startDateExpr = _this$scheduler$getDa2.startDateExpr,
      endDateExpr = _this$scheduler$getDa2.endDateExpr;
    var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(startDateExpr);
    var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(endDateExpr);
    var startDateFormItem = this.form.itemOption(startDateItemPath);
    var endDateFormItem = this.form.itemOption(endDateItemPath);
    if (startDateFormItem && endDateFormItem) {
      var startDateEditorOptions = startDateFormItem.editorOptions;
      var endDateEditorOptions = endDateFormItem.editorOptions;
      startDateEditorOptions.type = endDateEditorOptions.type = allDay ? 'date' : 'datetime';
      this.form.itemOption(startDateItemPath, 'editorOptions', startDateEditorOptions);
      this.form.itemOption(endDateItemPath, 'editorOptions', endDateEditorOptions);
    }
  };
  _proto.updateRecurrenceEditorStartDate = function updateRecurrenceEditorStartDate(date, expression) {
    var options = {
      startDate: date
    };
    this.setEditorOptions(expression, 'Recurrence', options);
  };
  _proto.setEditorOptions = function setEditorOptions(name, groupName, options) {
    var editorPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES[groupName], ".").concat(name);
    var editor = this.form.itemOption(editorPath);
    editor && this.form.itemOption(editorPath, 'editorOptions', (0, _extend.extend)({}, editor.editorOptions, options));
  };
  _proto.setTimeZoneEditorDataSource = function setTimeZoneEditorDataSource(date, path) {
    var dataSource = this.createTimeZoneDataSource(date);
    this.setEditorOptions(path, 'Main', {
      dataSource
    });
  };
  _proto.updateFormData = function updateFormData(formData) {
    this.semaphore.take();
    this.form.option('formData', formData);
    var dataExprs = this.scheduler.getDataAccessors().expr;
    var allDay = formData[dataExprs.allDayExpr];
    var startDate = new Date(formData[dataExprs.startDateExpr]);
    var endDate = new Date(formData[dataExprs.endDateExpr]);
    this.setTimeZoneEditorDataSource(startDate, dataExprs.startDateTimeZoneExpr);
    this.setTimeZoneEditorDataSource(endDate, dataExprs.endDateTimeZoneExpr);
    this.updateRecurrenceEditorStartDate(startDate, dataExprs.recurrenceRuleExpr);
    this.setEditorsType(allDay);
    this.semaphore.release();
  };
  _createClass(AppointmentForm, [{
    key: "dxForm",
    get: function get() {
      return this.form;
    }
  }, {
    key: "readOnly",
    set: function set(value) {
      this.form.option('readOnly', value);
      var recurrenceRuleExpr = this.scheduler.getDataAccessors().expr.recurrenceRuleExpr;
      var recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
      recurrenceEditor === null || recurrenceEditor === void 0 ? void 0 : recurrenceEditor.option('readOnly', value);
    }
  }, {
    key: "formData",
    get: function get() {
      return this.form.option('formData');
    },
    set: function set(value) {
      this.form.option('formData', value);
    }
  }]);
  return AppointmentForm;
}();
exports.AppointmentForm = AppointmentForm;