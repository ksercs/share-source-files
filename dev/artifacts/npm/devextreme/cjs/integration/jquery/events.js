/**
* DevExtreme (cjs/integration/jquery/events.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _use_jquery = _interopRequireDefault(require("./use_jquery"));
var _event_registrator_callbacks = _interopRequireDefault(require("../../events/core/event_registrator_callbacks"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

var useJQuery = (0, _use_jquery.default)();
if (useJQuery) {
  _event_registrator_callbacks.default.add(function (name, eventObject) {
    _jquery.default.event.special[name] = eventObject;
  });
  if (_events_engine.default.passiveEventHandlersSupported()) {
    _events_engine.default.forcePassiveFalseEventNames.forEach(function (eventName) {
      _jquery.default.event.special[eventName] = {
        setup: function setup(data, namespaces, handler) {
          _dom_adapter.default.listen(this, eventName, handler, {
            passive: false
          });
        }
      };
    });
  }
  _events_engine.default.set({
    on: function on(element) {
      (0, _jquery.default)(element).on.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    one: function one(element) {
      (0, _jquery.default)(element).one.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    off: function off(element) {
      (0, _jquery.default)(element).off.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    trigger: function trigger(element) {
      (0, _jquery.default)(element).trigger.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    triggerHandler: function triggerHandler(element) {
      (0, _jquery.default)(element).triggerHandler.apply((0, _jquery.default)(element), Array.prototype.slice.call(arguments, 1));
    },
    Event: _jquery.default.Event
  });
}
