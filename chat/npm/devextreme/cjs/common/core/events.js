/**
* DevExtreme (cjs/common/core/events.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.trigger = exports.one = exports.on = exports.off = exports.Event = void 0;
var _events_engine = _interopRequireDefault(require("./events/core/events_engine"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
* @name events
*/

const on = exports.on = _events_engine.default.on;
const one = exports.one = _events_engine.default.one;
const off = exports.off = _events_engine.default.off;
const trigger = exports.trigger = _events_engine.default.trigger;

/**
* @name events.Event
* @type function
* @param1 source:string|event
* @param2 config:object
* @return event
* @module events
* @export Event
* @hidden
*/

const Event = exports.Event = _events_engine.default.Event;
