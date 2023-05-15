/**
* DevExtreme (cjs/events/click.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.name = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _dom = require("../core/utils/dom");
var _frame = require("../animation/frame");
var _index = require("./utils/index");
var _event_nodes_disposing = require("./utils/event_nodes_disposing");
var _pointer = _interopRequireDefault(require("./pointer"));
var _emitter = _interopRequireDefault(require("./core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var CLICK_EVENT_NAME = 'dxclick';
exports.name = CLICK_EVENT_NAME;
var misc = {
  requestAnimationFrame: _frame.requestAnimationFrame,
  cancelAnimationFrame: _frame.cancelAnimationFrame
};
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = function onNodeRemove() {
  lastFiredEvent = null;
};
var clickHandler = function clickHandler(e) {
  var originalEvent = e.originalEvent;
  var eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
  var leftButton = !e.which || e.which === 1;
  if (leftButton && !prevented && !eventAlreadyFired) {
    if (originalEvent) {
      originalEvent.DXCLICK_FIRED = true;
    }
    (0, _event_nodes_disposing.unsubscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
    lastFiredEvent = originalEvent;
    (0, _event_nodes_disposing.subscribeNodesDisposing)(lastFiredEvent, onNodeRemove);
    (0, _index.fireEvent)({
      type: CLICK_EVENT_NAME,
      originalEvent: e
    });
  }
};
var ClickEmitter = _emitter.default.inherit({
  ctor: function ctor(element) {
    this.callBase(element);
    _events_engine.default.on(this.getElement(), 'click', clickHandler);
  },
  start: function start(e) {
    prevented = null;
  },
  cancel: function cancel() {
    prevented = true;
  },
  dispose: function dispose() {
    _events_engine.default.off(this.getElement(), 'click', clickHandler);
  }
});

// NOTE: fixes native click blur on slow devices
(function () {
  var desktopDevice = _devices.default.real().generic;
  if (!desktopDevice) {
    var startTarget = null;
    var blurPrevented = false;
    var isInput = function isInput(element) {
      return (0, _renderer.default)(element).is('input, textarea, select, button ,:focus, :focus *');
    };
    var pointerDownHandler = function pointerDownHandler(e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    };
    var _clickHandler = function _clickHandler(e) {
      var $target = (0, _renderer.default)(e.target);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !(0, _renderer.default)(startTarget).is('label') && isInput($target)) {
        (0, _dom.resetActiveElement)();
      }
      startTarget = null;
      blurPrevented = false;
    };
    var NATIVE_CLICK_FIXER_NAMESPACE = 'NATIVE_CLICK_FIXER';
    var document = _dom_adapter.default.getDocument();
    _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
    _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)('click', NATIVE_CLICK_FIXER_NAMESPACE), _clickHandler);
  }
})();

/**
  * @name UI Events.dxclick
  * @type eventType
  * @type_function_param1 event:event
  * @module events/click
*/
(0, _emitter_registrator.default)({
  emitter: ClickEmitter,
  bubble: true,
  events: [CLICK_EVENT_NAME]
});
