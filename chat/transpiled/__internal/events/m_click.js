"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = exports.misc = void 0;
var _frame = require("../../animation/frame");
var _emitter = _interopRequireDefault(require("../../common/core/events/core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("../../common/core/events/core/emitter_registrator"));
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../common/core/events/pointer"));
var _event_nodes_disposing = require("../../common/core/events/utils/event_nodes_disposing");
var _event_target = require("../../common/core/events/utils/event_target");
var _index = require("../../common/core/events/utils/index");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _m_devices = _interopRequireDefault(require("../core/m_devices"));
var _m_dom = _interopRequireDefault(require("../core/utils/m_dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLICK_EVENT_NAME = exports.name = 'dxclick';
const misc = exports.misc = {
  requestAnimationFrame: _frame.requestAnimationFrame,
  cancelAnimationFrame: _frame.cancelAnimationFrame
};
let prevented = null;
let lastFiredEvent = null;
const onNodeRemove = () => {
  lastFiredEvent = null;
};
const clickHandler = function (e) {
  const {
    originalEvent
  } = e;
  const eventAlreadyFired = lastFiredEvent === originalEvent || originalEvent && originalEvent.DXCLICK_FIRED;
  const leftButton = !e.which || e.which === 1;
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
const ClickEmitter = _emitter.default.inherit({
  ctor(element) {
    this.callBase(element);
    _events_engine.default.on(this.getElement(), 'click', clickHandler);
  },
  start() {
    prevented = null;
  },
  cancel() {
    prevented = true;
  },
  dispose() {
    _events_engine.default.off(this.getElement(), 'click', clickHandler);
  }
});
// NOTE: fixes native click blur on slow devices
(function () {
  const desktopDevice = _m_devices.default.real().generic;
  if (!desktopDevice) {
    let startTarget = null;
    let blurPrevented = false;
    const isInput = function (element) {
      return (0, _renderer.default)(element).is('input, textarea, select, button ,:focus, :focus *');
    };
    const pointerDownHandler = function (e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    };
    const getTarget = function (e) {
      const target = (0, _event_target.getEventTarget)(e);
      return (0, _renderer.default)(target);
    };
    const clickHandler = function (e) {
      const $target = getTarget(e);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !(0, _renderer.default)(startTarget).is('label') && isInput($target)) {
        _m_dom.default.resetActiveElement();
      }
      startTarget = null;
      blurPrevented = false;
    };
    const NATIVE_CLICK_FIXER_NAMESPACE = 'NATIVE_CLICK_FIXER';
    const document = _dom_adapter.default.getDocument();
    // @ts-expect-error
    _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)(_pointer.default.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
    // @ts-expect-error
    _events_engine.default.subscribeGlobal(document, (0, _index.addNamespace)('click', NATIVE_CLICK_FIXER_NAMESPACE), clickHandler);
  }
})();
(0, _emitter_registrator.default)({
  emitter: ClickEmitter,
  bubble: true,
  events: [CLICK_EVENT_NAME]
});

/// #DEBUG

/// #ENDDEBUG