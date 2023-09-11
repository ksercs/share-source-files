"use strict";

exports.default = void 0;
var _themes = require("../../ui/themes");
var getThemeType = function getThemeType() {
  var theme = (0, _themes.current)();
  return {
    isCompact: (0, _themes.isCompact)(theme),
    isMaterial: (0, _themes.isMaterial)(theme)
  };
};
var _default = getThemeType;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;