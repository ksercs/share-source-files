"use strict";

exports.getFirstDayOfWeek = void 0;
var _type = require("../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../localization/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeek) {
  return (0, _type.isDefined)(firstDayOfWeek) ? firstDayOfWeek : _date.default.firstDayOfWeekIndex();
};
exports.getFirstDayOfWeek = getFirstDayOfWeek;