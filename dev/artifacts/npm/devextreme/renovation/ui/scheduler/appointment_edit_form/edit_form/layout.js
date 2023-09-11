/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.EditFormProps = exports.EditForm = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _form = require("../../../form/wrapper/form");
var _formLayout = require("./layout_items/formLayout");
var _form_context = require("../../form_context");
var _startDateEditor = require("./editors/startDateEditor");
var _endDateEditor = require("./editors/endDateEditor");
var _timeZoneEditor = require("./editors/timeZoneEditor");
var _switchEditor = require("./editors/switchEditor");
var _descriptionEditor = require("./editors/descriptionEditor");
var _utils = require("../../../../../core/options/utils");
var _excluded = ["allDayEditorTemplate", "allowTimeZoneEditing", "allowUpdating", "appointmentData", "dataAccessors", "descriptionEditorTemplate", "endDateEditorTemplate", "firstDayOfWeek", "repeatEditorTemplate", "startDateEditorTemplate", "timeZoneEditorTemplate"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var FormColCount = {
  lg: 2,
  xs: 1
};
var viewFunction = function viewFunction(_ref) {
  var formContextValue = _ref.formContextValue,
    formItems = _ref.formItems;
  return (0, _inferno.createComponentVNode)(2, _form.Form, {
    "formData": formContextValue.formData,
    "items": formItems,
    "showValidationSummary": true,
    "scrollingEnabled": true,
    "colCountByScreen": FormColCount,
    "showColonAfterLabel": false,
    "colCount": "auto",
    "labelLocation": "top"
  });
};
exports.viewFunction = viewFunction;
var EditFormProps = {
  startDateEditorTemplate: _startDateEditor.StartDateEditor,
  endDateEditorTemplate: _endDateEditor.EndDateEditor,
  timeZoneEditorTemplate: _timeZoneEditor.TimeZoneEditor,
  allDayEditorTemplate: _switchEditor.SwitchEditor,
  repeatEditorTemplate: _switchEditor.SwitchEditor,
  descriptionEditorTemplate: _descriptionEditor.DescriptionEditor
};
exports.EditFormProps = EditFormProps;
var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};
var EditForm = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(EditForm, _InfernoComponent);
  function EditForm(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.__getterCache = {};
    _this.state = {
      isAllDay: undefined
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    _this.startDateChange = _this.startDateChange.bind(_assertThisInitialized(_this));
    _this.endDateChange = _this.endDateChange.bind(_assertThisInitialized(_this));
    _this.startDateTimeZoneChange = _this.startDateTimeZoneChange.bind(_assertThisInitialized(_this));
    _this.endDateTimeZoneChange = _this.endDateTimeZoneChange.bind(_assertThisInitialized(_this));
    _this.allDayChange = _this.allDayChange.bind(_assertThisInitialized(_this));
    _this.repeatChange = _this.repeatChange.bind(_assertThisInitialized(_this));
    _this.descriptionChange = _this.descriptionChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = EditForm.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.updateState, [])];
  };
  _proto.updateState = function updateState() {
    var _this2 = this;
    if (this.state.isAllDay === undefined) {
      this.setState(function (__state_argument) {
        return {
          isAllDay: !!_this2.formContextValue.formData.allDay
        };
      });
    }
  };
  _proto.startDateChange = function startDateChange(date) {
    this.formContextValue.formData.startDate = date;
  };
  _proto.endDateChange = function endDateChange(date) {
    this.formContextValue.formData.endDate = date;
  };
  _proto.startDateTimeZoneChange = function startDateTimeZoneChange(timeZone) {
    this.formContextValue.formData.startDateTimeZone = timeZone;
  };
  _proto.endDateTimeZoneChange = function endDateTimeZoneChange(timeZone) {
    this.formContextValue.formData.endDateTimeZone = timeZone;
  };
  _proto.allDayChange = function allDayChange(value) {
    this.setState(function (__state_argument) {
      return {
        isAllDay: value
      };
    });
    this.formContextValue.formData.allDay = value;
  };
  _proto.repeatChange = function repeatChange(value) {
    this.formContextValue.formData.repeat = value;
  };
  _proto.descriptionChange = function descriptionChange(value) {
    this.formContextValue.formData.description = value;
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.context[_form_context.FormContext.id] !== context[_form_context.FormContext.id] || this.props['startDateEditorTemplate'] !== nextProps['startDateEditorTemplate'] || this.props['endDateEditorTemplate'] !== nextProps['endDateEditorTemplate'] || this.props['timeZoneEditorTemplate'] !== nextProps['timeZoneEditorTemplate'] || this.props['allDayEditorTemplate'] !== nextProps['allDayEditorTemplate'] || this.props['repeatEditorTemplate'] !== nextProps['repeatEditorTemplate'] || this.props['descriptionEditorTemplate'] !== nextProps['descriptionEditorTemplate'] || this.props['appointmentData'] !== nextProps['appointmentData'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.state['isAllDay'] !== nextState['isAllDay'] || this.props['dataAccessors'] !== nextProps['dataAccessors'] || this.props['allowTimeZoneEditing'] !== nextProps['allowTimeZoneEditing']) {
      this.__getterCache['formItems'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        startDateEditorTemplate: getTemplate(props.startDateEditorTemplate),
        endDateEditorTemplate: getTemplate(props.endDateEditorTemplate),
        timeZoneEditorTemplate: getTemplate(props.timeZoneEditorTemplate),
        allDayEditorTemplate: getTemplate(props.allDayEditorTemplate),
        repeatEditorTemplate: getTemplate(props.repeatEditorTemplate),
        descriptionEditorTemplate: getTemplate(props.descriptionEditorTemplate)
      }),
      isAllDay: this.state.isAllDay,
      formContextValue: this.formContextValue,
      startDateChange: this.startDateChange,
      endDateChange: this.endDateChange,
      startDateTimeZoneChange: this.startDateTimeZoneChange,
      endDateTimeZoneChange: this.endDateTimeZoneChange,
      allDayChange: this.allDayChange,
      repeatChange: this.repeatChange,
      descriptionChange: this.descriptionChange,
      formItems: this.formItems,
      restAttributes: this.restAttributes
    });
  };
  _createClass(EditForm, [{
    key: "formContextValue",
    get: function get() {
      if (this.context[_form_context.FormContext.id]) {
        return this.context[_form_context.FormContext.id];
      }
      return _form_context.FormContext.defaultValue;
    }
  }, {
    key: "formItems",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['formItems'] !== undefined) {
        return this.__getterCache['formItems'];
      }
      return this.__getterCache['formItems'] = function () {
        var formData = _this3.formContextValue.formData;
        var StartDateTemplate = _this3.props.startDateEditorTemplate;
        var EndDateTemplate = _this3.props.endDateEditorTemplate;
        var TimeZoneTemplate = _this3.props.timeZoneEditorTemplate;
        var AllDayTemplate = _this3.props.allDayEditorTemplate;
        var RepeatTemplate = _this3.props.repeatEditorTemplate;
        var DescriptionTemplate = _this3.props.descriptionEditorTemplate;
        var recurrenceRule = _this3.formContextValue.formData.recurrenceRule;
        var isRecurrence = !!recurrenceRule;
        var appointmentData = _this3.props.appointmentData;
        var firstDayOfWeek = _this3.props.firstDayOfWeek;
        var endDateTimeZone = appointmentData.endDateTimeZone,
          startDateTimeZone = appointmentData.startDateTimeZone;
        var allDay = !!_this3.state.isAllDay;
        return (0, _formLayout.getFormLayoutConfig)(_this3.props.dataAccessors.expr, formData, _this3.props.allowTimeZoneEditing, (0, _inferno.createComponentVNode)(2, StartDateTemplate, {
          "value": appointmentData.startDate,
          "dateChange": _this3.startDateChange,
          "startDate": formData.startDate,
          "endDate": formData.endDate,
          "firstDayOfWeek": firstDayOfWeek,
          "isAllDay": allDay
        }), (0, _inferno.createComponentVNode)(2, EndDateTemplate, {
          "value": _this3.props.appointmentData.endDate,
          "dateChange": _this3.endDateChange,
          "startDate": formData.startDate,
          "endDate": formData.endDate,
          "firstDayOfWeek": _this3.props.firstDayOfWeek,
          "isAllDay": allDay
        }), (0, _inferno.createComponentVNode)(2, TimeZoneTemplate, {
          "value": startDateTimeZone,
          "valueChange": _this3.startDateTimeZoneChange,
          "date": _this3.props.appointmentData.startDate
        }), (0, _inferno.createComponentVNode)(2, TimeZoneTemplate, {
          "value": endDateTimeZone,
          "valueChange": _this3.endDateTimeZoneChange,
          "date": _this3.props.appointmentData.endDate
        }), (0, _inferno.createComponentVNode)(2, AllDayTemplate, {
          "value": allDay,
          "valueChange": _this3.allDayChange
        }), (0, _inferno.createComponentVNode)(2, RepeatTemplate, {
          "value": isRecurrence,
          "valueChange": _this3.repeatChange
        }), (0, _inferno.createComponentVNode)(2, DescriptionTemplate, {
          "value": _this3.props.appointmentData.description,
          "valueChange": _this3.descriptionChange
        }));
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        allDayEditorTemplate = _this$props.allDayEditorTemplate,
        allowTimeZoneEditing = _this$props.allowTimeZoneEditing,
        allowUpdating = _this$props.allowUpdating,
        appointmentData = _this$props.appointmentData,
        dataAccessors = _this$props.dataAccessors,
        descriptionEditorTemplate = _this$props.descriptionEditorTemplate,
        endDateEditorTemplate = _this$props.endDateEditorTemplate,
        firstDayOfWeek = _this$props.firstDayOfWeek,
        repeatEditorTemplate = _this$props.repeatEditorTemplate,
        startDateEditorTemplate = _this$props.startDateEditorTemplate,
        timeZoneEditorTemplate = _this$props.timeZoneEditorTemplate,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return EditForm;
}(_inferno2.InfernoComponent);
exports.EditForm = EditForm;
EditForm.defaultProps = EditFormProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  EditForm.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(EditForm.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}
