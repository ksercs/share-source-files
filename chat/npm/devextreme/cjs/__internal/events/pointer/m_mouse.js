/**
* DevExtreme (cjs/__internal/events/pointer/m_mouse.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("../../../common/core/events/pointer/base"));
var _observer = _interopRequireDefault(require("../../../common/core/events/pointer/observer"));
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));
var _extend = require("../../../core/utils/extend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable spellcheck/spell-checker */
const eventMap = {
  dxpointerdown: 'mousedown',
  dxpointermove: 'mousemove',
  dxpointerup: 'mouseup',
  dxpointercancel: 'pointercancel',
  dxpointerover: 'mouseover',
  dxpointerout: 'mouseout',
  dxpointerenter: 'mouseenter',
  dxpointerleave: 'mouseleave'
};
// due to this https://bugs.webkit.org/show_bug.cgi?id=222632 issue
if (_browser.default.safari) {
  // eslint-disable-next-line no-useless-concat
  eventMap.dxpointercancel += ' ' + 'dragstart';
}
const normalizeMouseEvent = function (e) {
  e.pointerId = 1;
  return {
    pointers: observer.pointers(),
    pointerId: 1
  };
};
let observer;
let activated = false;
const activateStrategy = function () {
  if (activated) {
    return;
  }
  // @ts-expect-error
  observer = new _observer.default(eventMap, () => true);
  activated = true;
};
const MouseStrategy = _base.default.inherit({
  ctor() {
    this.callBase.apply(this, arguments);
    activateStrategy();
  },
  _fireEvent(args) {
    return this.callBase((0, _extend.extend)(normalizeMouseEvent(args.originalEvent), args));
  }
});
MouseStrategy.map = eventMap;
MouseStrategy.normalize = normalizeMouseEvent;
MouseStrategy.activate = activateStrategy;
MouseStrategy.resetObserver = function () {
  observer.reset();
};
var _default = exports.default = MouseStrategy;
