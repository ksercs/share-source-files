/**
* DevExtreme (cjs/renovation/component_wrapper/scheduler/time_panel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TimePanel = void 0;
var _component = _interopRequireDefault(require("../common/component"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TimePanel = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TimePanel, _Component);
  function TimePanel() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = TimePanel.prototype;
  _proto._setOptionsByReference = function _setOptionsByReference() {
    _Component.prototype._setOptionsByReference.call(this);
    this._optionsByReference = _extends({}, this._optionsByReference, {
      timeCellTemplate: true
    });
  };
  return TimePanel;
}(_component.default);
exports.TimePanel = TimePanel;
