"use strict";

exports.default = void 0;
var _graph = _interopRequireDefault(require("./graph"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validator = {
  validate: function (data, incidentOccurred) {
    let result = null;
    if (this._hasCycle(data)) {
      result = 'E2006';
      incidentOccurred('E2006');
    }
    return result;
  },
  _hasCycle: function (data) {
    return _graph.default.struct.hasCycle(data);
  }
};
var _default = exports.default = validator;
module.exports = exports.default;
module.exports.default = exports.default;