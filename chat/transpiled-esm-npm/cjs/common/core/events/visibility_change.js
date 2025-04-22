"use strict";

exports.triggerShownEvent = exports.triggerResizeEvent = exports.triggerHidingEvent = exports.default = void 0;
var _m_visibility_change = _interopRequireDefault(require("../../../__internal/events/m_visibility_change"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const triggerShownEvent = exports.triggerShownEvent = _m_visibility_change.default.triggerShownEvent;
const triggerHidingEvent = exports.triggerHidingEvent = _m_visibility_change.default.triggerHidingEvent;
const triggerResizeEvent = exports.triggerResizeEvent = _m_visibility_change.default.triggerResizeEvent;
var _default = exports.default = _m_visibility_change.default;