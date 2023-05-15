/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/utils.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getFirstDayOfWeek = void 0;
var _type = require("../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../localization/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeek) {
  return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date.default.firstDayOfWeekIndex();
};
exports.getFirstDayOfWeek = getFirstDayOfWeek;
