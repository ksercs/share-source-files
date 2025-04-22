"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.end = void 0;
var _event_registrator = _interopRequireDefault(require("../../common/core/events/core/event_registrator"));
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../common/core/events/pointer"));
var _index = require("../../common/core/events/utils/index");
var _class = _interopRequireDefault(require("../../core/class"));
var _element_data = require("../../core/element_data");
var _m_devices = _interopRequireDefault(require("../core/m_devices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HOVERSTART_NAMESPACE = 'dxHoverStart';
const HOVERSTART = exports.start = 'dxhoverstart';
const POINTERENTER_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.enter, HOVERSTART_NAMESPACE);
const HOVEREND_NAMESPACE = 'dxHoverEnd';
const HOVEREND = exports.end = 'dxhoverend';
const POINTERLEAVE_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.leave, HOVEREND_NAMESPACE);
const Hover = _class.default.inherit({
  noBubble: true,
  ctor() {
    this._handlerArrayKeyPath = `${this._eventNamespace}_HandlerStore`;
  },
  setup(element) {
    (0, _element_data.data)(element, this._handlerArrayKeyPath, {});
  },
  add(element, handleObj) {
    const that = this;
    const handler = function (e) {
      that._handler(e);
    };
    _events_engine.default.on(element, this._originalEventName, handleObj.selector, handler);
    (0, _element_data.data)(element, this._handlerArrayKeyPath)[handleObj.guid] = handler;
  },
  _handler(e) {
    if ((0, _index.isTouchEvent)(e) || _m_devices.default.isSimulator()) {
      return;
    }
    (0, _index.fireEvent)({
      type: this._eventName,
      originalEvent: e,
      delegateTarget: e.delegateTarget
    });
  },
  remove(element, handleObj) {
    const handler = (0, _element_data.data)(element, this._handlerArrayKeyPath)[handleObj.guid];
    // @ts-expect-error
    _events_engine.default.off(element, this._originalEventName, handleObj.selector, handler);
  },
  teardown(element) {
    (0, _element_data.removeData)(element, this._handlerArrayKeyPath);
  }
});
const HoverStart = Hover.inherit({
  ctor() {
    this._eventNamespace = HOVERSTART_NAMESPACE;
    this._eventName = HOVERSTART;
    this._originalEventName = POINTERENTER_NAMESPACED_EVENT_NAME;
    this.callBase();
  },
  _handler(e) {
    const pointers = e.pointers || [];
    if (!pointers.length) {
      this.callBase(e);
    }
  }
});
const HoverEnd = Hover.inherit({
  ctor() {
    this._eventNamespace = HOVEREND_NAMESPACE;
    this._eventName = HOVEREND;
    this._originalEventName = POINTERLEAVE_NAMESPACED_EVENT_NAME;
    this.callBase();
  }
});
(0, _event_registrator.default)(HOVERSTART, new HoverStart());
(0, _event_registrator.default)(HOVEREND, new HoverEnd());