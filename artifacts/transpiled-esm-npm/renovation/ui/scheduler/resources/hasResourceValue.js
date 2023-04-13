"use strict";

exports.hasResourceValue = void 0;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
var hasResourceValue = function hasResourceValue(resourceValues, itemValue) {
  return (0, _type.isDefined)(resourceValues.find(function (value) {
    return (0, _common.equalByValue)(value, itemValue);
  }));
};
exports.hasResourceValue = hasResourceValue;