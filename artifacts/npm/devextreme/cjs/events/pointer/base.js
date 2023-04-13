/**
* DevExtreme (cjs/events/pointer/base.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _class = _interopRequireDefault(require("../../core/class"));
var _index = require("../utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var POINTER_EVENTS_NAMESPACE = 'dxPointerEvents';
var BaseStrategy = _class.default.inherit({
  ctor: function ctor(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = (0, _index.addNamespace)(originalEvents, POINTER_EVENTS_NAMESPACE);
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble: function _isNoBubble() {
    var eventName = this._eventName;
    return eventName === 'dxpointerenter' || eventName === 'dxpointerleave';
  },
  _handler: function _handler(e) {
    var _originalEvent$target;
    var delegateTarget = this._getDelegateTarget(e);
    var event = {
      type: this._eventName,
      pointerType: e.pointerType || (0, _index.eventSource)(e),
      originalEvent: e,
      delegateTarget: delegateTarget,
      // NOTE: TimeStamp normalization (FF bug #238041) (T277118)
      timeStamp: _browser.default.mozilla ? new Date().getTime() : e.timeStamp
    };
    var originalEvent = e.originalEvent;
    if (originalEvent !== null && originalEvent !== void 0 && (_originalEvent$target = originalEvent.target) !== null && _originalEvent$target !== void 0 && _originalEvent$target.shadowRoot) {
      var _originalEvent$path, _originalEvent$compos;
      var path = (_originalEvent$path = originalEvent.path) !== null && _originalEvent$path !== void 0 ? _originalEvent$path : (_originalEvent$compos = originalEvent.composedPath) === null || _originalEvent$compos === void 0 ? void 0 : _originalEvent$compos.call(originalEvent);
      event.target = path[0];
    }
    return this._fireEvent(event);
  },
  _getDelegateTarget: function _getDelegateTarget(e) {
    var delegateTarget;
    if (this.noBubble) {
      delegateTarget = e.delegateTarget;
    }
    return delegateTarget;
  },
  _fireEvent: function _fireEvent(args) {
    return (0, _index.fireEvent)(args);
  },
  _setSelector: function _setSelector(handleObj) {
    this._selector = this.noBubble && handleObj ? handleObj.selector : null;
  },
  _getSelector: function _getSelector() {
    return this._selector;
  },
  setup: function setup() {
    return true;
  },
  add: function add(element, handleObj) {
    if (this._handlerCount <= 0 || this.noBubble) {
      element = this.noBubble ? element : _dom_adapter.default.getDocument();
      this._setSelector(handleObj);
      var that = this;
      _events_engine.default.on(element, this._originalEvents, this._getSelector(), function (e) {
        that._handler(e);
      });
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove: function remove(handleObj) {
    this._setSelector(handleObj);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown: function teardown(element) {
    if (this._handlerCount && !this.noBubble) {
      return;
    }
    element = this.noBubble ? element : _dom_adapter.default.getDocument();
    if (this._originalEvents !== '.' + POINTER_EVENTS_NAMESPACE) {
      _events_engine.default.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose: function dispose(element) {
    element = this.noBubble ? element : _dom_adapter.default.getDocument();
    _events_engine.default.off(element, this._originalEvents);
  }
});
var _default = BaseStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
