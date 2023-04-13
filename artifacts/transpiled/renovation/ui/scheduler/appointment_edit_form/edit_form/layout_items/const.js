"use strict";

exports.ItemLabels = void 0;
var _message = _interopRequireDefault(require("../../../../../../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ItemLabels = {
  subject: _message.default.format('dxScheduler-editorLabelTitle'),
  startDate: _message.default.format('dxScheduler-editorLabelStartDate'),
  endDate: _message.default.format('dxScheduler-editorLabelEndDate'),
  allDay: _message.default.format('dxScheduler-allDay'),
  repeat: _message.default.format('dxScheduler-editorLabelRecurrence'),
  description: _message.default.format('dxScheduler-editorLabelDescription')
};
exports.ItemLabels = ItemLabels;