/**
* DevExtreme (renovation/ui/scheduler/workspaces/month/date_table/layout.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../../core/component_registrator"));
var _date_table = require("../../../../../component_wrapper/scheduler/date_table");
var _layout = require("./layout");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MonthDateTableLayout = /*#__PURE__*/function (_DateTable) {
  _inheritsLoose(MonthDateTableLayout, _DateTable);
  function MonthDateTableLayout() {
    return _DateTable.apply(this, arguments) || this;
  }
  _createClass(MonthDateTableLayout, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: ['cellTemplate', 'dataCellTemplate'],
        props: ['cellTemplate', 'viewData', 'groupOrientation', 'leftVirtualCellWidth', 'rightVirtualCellWidth', 'topVirtualRowHeight', 'bottomVirtualRowHeight', 'addDateTableClass', 'addVerticalSizesClassToRows', 'width', 'dataCellTemplate']
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _layout.MonthDateTableLayout;
    }
  }]);
  return MonthDateTableLayout;
}(_date_table.DateTable);
exports.default = MonthDateTableLayout;
(0, _component_registrator.default)('dxMonthDateTableLayout', MonthDateTableLayout);
module.exports = exports.default;
module.exports.default = exports.default;
