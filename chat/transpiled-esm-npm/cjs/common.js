"use strict";

Object.defineProperty(exports, "Guid", {
  enumerable: true,
  get: function () {
    return _guid.default;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _config.default;
  }
});
Object.defineProperty(exports, "setTemplateEngine", {
  enumerable: true,
  get: function () {
    return _set_template_engine.default;
  }
});
var _config = _interopRequireDefault(require("./common/config"));
var _guid = _interopRequireDefault(require("./common/guid"));
var _set_template_engine = _interopRequireDefault(require("./common/set_template_engine"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }