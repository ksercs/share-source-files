/**
* DevExtreme (cjs/events/utils/event_nodes_disposing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.unsubscribeNodesDisposing = exports.subscribeNodesDisposing = void 0;
var _events_engine = _interopRequireDefault(require("../core/events_engine"));
var _remove = require("../remove");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function nodesByEvent(event) {
  return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(function (node) {
    return !!node;
  });
}
var subscribeNodesDisposing = function subscribeNodesDisposing(event, callback) {
  _events_engine.default.one(nodesByEvent(event), _remove.removeEvent, callback);
};
exports.subscribeNodesDisposing = subscribeNodesDisposing;
var unsubscribeNodesDisposing = function unsubscribeNodesDisposing(event, callback) {
  _events_engine.default.off(nodesByEvent(event), _remove.removeEvent, callback);
};
exports.unsubscribeNodesDisposing = unsubscribeNodesDisposing;
