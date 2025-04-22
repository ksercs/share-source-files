"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerShownEvent = exports.triggerResizeEvent = exports.triggerHidingEvent = exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const triggerVisibilityChangeEvent = function (eventName) {
  const VISIBILITY_CHANGE_SELECTOR = '.dx-visibility-change-handler';
  return function (element) {
    const $element = (0, _renderer.default)(element || 'body');
    const changeHandlers = $element.filter(VISIBILITY_CHANGE_SELECTOR)
    // @ts-expect-error
    .add($element.find(VISIBILITY_CHANGE_SELECTOR));
    for (let i = 0; i < changeHandlers.length; i++) {
      _events_engine.default.triggerHandler(changeHandlers[i], eventName);
    }
  };
};
const triggerShownEvent = exports.triggerShownEvent = triggerVisibilityChangeEvent('dxshown');
const triggerHidingEvent = exports.triggerHidingEvent = triggerVisibilityChangeEvent('dxhiding');
const triggerResizeEvent = exports.triggerResizeEvent = triggerVisibilityChangeEvent('dxresize');
var _default = exports.default = {
  triggerHidingEvent,
  triggerResizeEvent,
  triggerShownEvent
};