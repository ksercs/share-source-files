"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRtlEnabled = resolveRtlEnabled;
exports.resolveRtlEnabledDefinition = resolveRtlEnabledDefinition;
var _common = require("../../../../common");
var _type = require("../../../../core/utils/type");
function resolveRtlEnabled(rtlProp, config) {
  if (rtlProp !== undefined) {
    return rtlProp;
  }
  if ((config === null || config === void 0 ? void 0 : config.rtlEnabled) !== undefined) {
    return config.rtlEnabled;
  }
  return (0, _common.config)().rtlEnabled;
}
function resolveRtlEnabledDefinition(rtlProp, config) {
  const isPropDefined = (0, _type.isDefined)(rtlProp);
  const onlyGlobalDefined = (0, _type.isDefined)((0, _common.config)().rtlEnabled) && !isPropDefined && !(0, _type.isDefined)(config === null || config === void 0 ? void 0 : config.rtlEnabled);
  return isPropDefined && rtlProp !== (config === null || config === void 0 ? void 0 : config.rtlEnabled) || onlyGlobalDefined;
}