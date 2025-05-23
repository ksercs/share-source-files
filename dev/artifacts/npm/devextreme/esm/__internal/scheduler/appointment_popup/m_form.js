/**
* DevExtreme (esm/__internal/scheduler/appointment_popup/m_form.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../m_recurrence_editor';
import '../../../ui/text_area';
import '../../../ui/tag_box';
import '../../../ui/switch';
import '../../../ui/select_box';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import dateUtils from '../../../core/utils/date';
import dateSerialization from '../../../core/utils/date_serialization';
import { extend } from '../../../core/utils/extend';
import DataSource from '../../../data/data_source';
import messageLocalization from '../../../localization/message';
import { Semaphore } from '../../../renovation/ui/scheduler/utils/semaphore/semaphore';
import Form from '../../../ui/form';
import { createAppointmentAdapter } from '../m_appointment_adapter';
import timeZoneDataUtils from '../timezones/m_utils_timezones_data';
var SCREEN_SIZE_OF_SINGLE_COLUMN = 600;
export var APPOINTMENT_FORM_GROUP_NAMES = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
var getStartDateWithStartHour = (startDate, startDayHour) => new Date(new Date(startDate).setHours(startDayHour));
var validateAppointmentFormDate = (editor, value, previousValue) => {
  var isCurrentDateCorrect = value === null || !!value;
  var isPreviousDateCorrect = previousValue === null || !!previousValue;
  if (!isCurrentDateCorrect && isPreviousDateCorrect) {
    editor.option('value', previousValue);
  }
};
var updateRecurrenceItemVisibility = (recurrenceRuleExpr, value, form) => {
  var _a;
  form.itemOption(APPOINTMENT_FORM_GROUP_NAMES.Recurrence, 'visible', value);
  !value && form.updateData(recurrenceRuleExpr, '');
  (_a = form.getEditor(recurrenceRuleExpr)) === null || _a === void 0 ? void 0 : _a.changeValueByVisibility(value);
};
var createDateBoxEditor = (dataField, colSpan, firstDayOfWeek, label, onValueChanged) => ({
  editorType: 'dxDateBox',
  dataField,
  colSpan,
  label: {
    text: messageLocalization.format(label)
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
});
export class AppointmentForm {
  constructor(scheduler) {
    this.scheduler = scheduler;
    this.form = null;
    this.semaphore = new Semaphore();
  }
  get dxForm() {
    return this.form;
  }
  set readOnly(value) {
    this.form.option('readOnly', value);
    var {
      recurrenceRuleExpr
    } = this.scheduler.getDataAccessors().expr;
    var recurrenceEditor = this.form.getEditor(recurrenceRuleExpr);
    recurrenceEditor === null || recurrenceEditor === void 0 ? void 0 : recurrenceEditor.option('readOnly', value);
  }
  get formData() {
    return this.form.option('formData');
  }
  set formData(value) {
    this.form.option('formData', value);
  }
  create(triggerResize, changeSize, formData) {
    var {
      allowTimeZoneEditing
    } = this.scheduler.getEditingConfig();
    var {
      expr
    } = this.scheduler.getDataAccessors();
    var recurrenceEditorVisibility = !!formData[expr.recurrenceRuleExpr]; // TODO
    var colSpan = recurrenceEditorVisibility ? 1 : 2;
    var mainItems = [...this._createMainItems(expr, triggerResize, changeSize, allowTimeZoneEditing), ...this.scheduler.createResourceEditorModel()];
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
    var element = $('<div>');
    this.form = this.scheduler.createComponent(element, Form, {
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
      customizeItem: e => {
        if (this.form && e.itemType === 'group') {
          var dataExprs = this.scheduler.getDataAccessors().expr;
          var startDate = new Date(this.formData[dataExprs.startDateExpr]);
          var endDate = new Date(this.formData[dataExprs.endDateExpr]);
          var startTimeZoneEditor = e.items.find(i => i.dataField === dataExprs.startDateTimeZoneExpr);
          var endTimeZoneEditor = e.items.find(i => i.dataField === dataExprs.endDateTimeZoneExpr);
          if (startTimeZoneEditor) {
            startTimeZoneEditor.editorOptions.dataSource = this.createTimeZoneDataSource(startDate);
          }
          if (endTimeZoneEditor) {
            endTimeZoneEditor.editorOptions.dataSource = this.createTimeZoneDataSource(endDate);
          }
        }
      },
      screenByWidth: width => width < SCREEN_SIZE_OF_SINGLE_COLUMN || devices.current().deviceType !== 'desktop' ? 'xs' : 'lg'
    });
  }
  createTimeZoneDataSource(date) {
    return new DataSource({
      store: timeZoneDataUtils.getDisplayedTimeZones(date),
      paginate: true,
      pageSize: 10
    });
  }
  _createAppointmentAdapter(rawAppointment) {
    return createAppointmentAdapter(rawAppointment, this.scheduler.getDataAccessors());
  }
  _dateBoxValueChanged(args, dateExpr, isNeedCorrect) {
    validateAppointmentFormDate(args.component, args.value, args.previousValue);
    var value = dateSerialization.deserializeDate(args.value);
    var previousValue = dateSerialization.deserializeDate(args.previousValue);
    var dateEditor = this.form.getEditor(dateExpr);
    var dateValue = dateSerialization.deserializeDate(dateEditor.option('value'));
    if (this.semaphore.isFree() && dateValue && value && isNeedCorrect(dateValue, value)) {
      var duration = previousValue ? dateValue.getTime() - previousValue.getTime() : 0;
      dateEditor.option('value', new Date(value.getTime() + duration));
    }
  }
  _createTimezoneEditor(timeZoneExpr, secondTimeZoneExpr, visibleIndex, colSpan, isMainTimeZone) {
    var visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var noTzTitle = messageLocalization.format('dxScheduler-noTimezoneTitle');
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
        onValueChanged: args => {
          var {
            form
          } = this;
          var secondTimezoneEditor = form.getEditor(secondTimeZoneExpr);
          if (isMainTimeZone) {
            secondTimezoneEditor.option('value', args.value);
          }
        }
      },
      visible
    };
  }
  _createDateBoxItems(dataExprs, allowTimeZoneEditing) {
    var colSpan = allowTimeZoneEditing ? 2 : 1;
    var firstDayOfWeek = this.scheduler.getFirstDayOfWeek();
    return [createDateBoxEditor(dataExprs.startDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelStartDate', args => {
      this._dateBoxValueChanged(args, dataExprs.endDateExpr, (endValue, startValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.startDateTimeZoneExpr, dataExprs.endDateTimeZoneExpr, 1, colSpan, true, allowTimeZoneEditing), createDateBoxEditor(dataExprs.endDateExpr, colSpan, firstDayOfWeek, 'dxScheduler-editorLabelEndDate', args => {
      this._dateBoxValueChanged(args, dataExprs.startDateExpr, (startValue, endValue) => endValue < startValue);
    }), this._createTimezoneEditor(dataExprs.endDateTimeZoneExpr, dataExprs.startDateTimeZoneExpr, 3, colSpan, false, allowTimeZoneEditing)];
  }
  _changeFormItemDateType(itemPath, isAllDay) {
    var itemEditorOptions = this.form.itemOption(itemPath).editorOptions;
    var type = isAllDay ? 'date' : 'datetime';
    var newEditorOption = _extends(_extends({}, itemEditorOptions), {
      type
    });
    this.form.itemOption(itemPath, 'editorOptions', newEditorOption);
  }
  _createMainItems(dataExprs, triggerResize, changeSize, allowTimeZoneEditing) {
    return [{
      dataField: dataExprs.textExpr,
      editorType: 'dxTextBox',
      colSpan: 2,
      label: {
        text: messageLocalization.format('dxScheduler-editorLabelTitle')
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
          text: messageLocalization.format('dxScheduler-allDay'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            var {
              value
            } = args;
            var startDateEditor = this.form.getEditor(dataExprs.startDateExpr);
            var endDateEditor = this.form.getEditor(dataExprs.endDateExpr);
            var startDate = dateSerialization.deserializeDate(startDateEditor.option('value'));
            if (this.semaphore.isFree() && startDate) {
              if (value) {
                var allDayStartDate = dateUtils.trimTime(startDate);
                startDateEditor.option('value', new Date(allDayStartDate));
                endDateEditor.option('value', new Date(allDayStartDate));
              } else {
                var startDateWithStartHour = getStartDateWithStartHour(startDate, this.scheduler.getStartDayHour());
                var endDate = this.scheduler.getCalculatedEndDate(startDateWithStartHour);
                startDateEditor.option('value', startDateWithStartHour);
                endDateEditor.option('value', endDate);
              }
            }
            var startDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.startDateExpr);
            var endDateItemPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES.Main, ".").concat(dataExprs.endDateExpr);
            this._changeFormItemDateType(startDateItemPath, value);
            this._changeFormItemDateType(endDateItemPath, value);
          }
        }
      }, {
        editorType: 'dxSwitch',
        dataField: 'repeat',
        cssClass: 'dx-appointment-form-switch',
        name: 'visibilityChanged',
        label: {
          text: messageLocalization.format('dxScheduler-editorLabelRecurrence'),
          location: 'right'
        },
        editorOptions: {
          onValueChanged: args => {
            var {
              form
            } = this;
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
        text: messageLocalization.format('dxScheduler-editorLabelDescription')
      }
    }, {
      itemType: 'empty',
      colSpan: 2
    }];
  }
  _createRecurrenceEditor(dataExprs) {
    return [{
      dataField: dataExprs.recurrenceRuleExpr,
      editorType: 'dxRecurrenceEditor',
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
        timeZoneCalculator: this.scheduler.getTimeZoneCalculator(),
        getStartDateTimeZone: () => this._createAppointmentAdapter(this.formData).startDateTimeZone
      },
      label: {
        text: ' ',
        visible: false
      }
    }];
  }
  setEditorsType(allDay) {
    var {
      startDateExpr,
      endDateExpr
    } = this.scheduler.getDataAccessors().expr;
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
  }
  updateRecurrenceEditorStartDate(date, expression) {
    var options = {
      startDate: date
    };
    this.setEditorOptions(expression, 'Recurrence', options);
  }
  setEditorOptions(name, groupName, options) {
    var editorPath = "".concat(APPOINTMENT_FORM_GROUP_NAMES[groupName], ".").concat(name);
    var editor = this.form.itemOption(editorPath);
    editor && this.form.itemOption(editorPath, 'editorOptions', extend({}, editor.editorOptions, options));
  }
  setTimeZoneEditorDataSource(date, path) {
    var dataSource = this.createTimeZoneDataSource(date);
    this.setEditorOptions(path, 'Main', {
      dataSource
    });
  }
  updateFormData(formData) {
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
  }
}
