/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/editors/timeZoneEditor.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.TimeZoneEditorProps = exports.TimeZoneEditor = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _select_box = require("../../../../editors/drop_down_editors/select_box");
var _message = _interopRequireDefault(require("../../../../../../localization/message"));
var _utils = _interopRequireDefault(require("../../../../../../ui/scheduler/timezones/utils.timezones_data"));
var _data_source = _interopRequireDefault(require("../../../../../../data/data_source"));
var _utils2 = require("../../../../../../core/options/utils");
var _excluded = ["date", "value", "valueChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var noTzTitle = _message.default.format('dxScheduler-noTimezoneTitle');
var viewFunction = function viewFunction(_ref) {
  var dataSource = _ref.dataSource,
    timeZone = _ref.timeZone;
  return (0, _inferno.createComponentVNode)(2, _select_box.SelectBox, {
    "value": timeZone,
    "dataSource": dataSource,
    "displayExpr": "title",
    "valueExpr": "id",
    "placeholder": noTzTitle,
    "searchEnabled": true
  });
};
exports.viewFunction = viewFunction;
var TimeZoneEditorProps = {};
exports.TimeZoneEditorProps = TimeZoneEditorProps;
var TimeZoneEditor = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(TimeZoneEditor, _InfernoComponent);
  function TimeZoneEditor(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {
      timeZone: undefined
    };
    _this.initDate = _this.initDate.bind(_assertThisInitialized(_this));
    _this.updateDate = _this.updateDate.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = TimeZoneEditor.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.initDate, [])];
  };
  _proto.initDate = function initDate() {
    var _this2 = this;
    if (!this.state.timeZone) {
      this.setState(function (__state_argument) {
        return {
          timeZone: _this2.props.value
        };
      });
    }
  };
  _proto.updateDate = function updateDate(timeZone) {
    this.setState(function (__state_argument) {
      return {
        timeZone: timeZone
      };
    });
    this.props.valueChange(timeZone);
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      timeZone: this.state.timeZone,
      updateDate: this.updateDate,
      dataSource: this.dataSource,
      restAttributes: this.restAttributes
    });
  };
  _createClass(TimeZoneEditor, [{
    key: "dataSource",
    get: function get() {
      return new _data_source.default({
        store: _utils.default.getDisplayedTimeZones(this.props.date),
        paginate: true,
        pageSize: 10
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        date = _this$props.date,
        value = _this$props.value,
        valueChange = _this$props.valueChange,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return TimeZoneEditor;
}(_inferno2.InfernoComponent);
exports.TimeZoneEditor = TimeZoneEditor;
TimeZoneEditor.defaultProps = TimeZoneEditorProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  TimeZoneEditor.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(TimeZoneEditor.defaultProps), Object.getOwnPropertyDescriptors((0, _utils2.convertRulesToOptions)(__defaultOptionRules))));
}
