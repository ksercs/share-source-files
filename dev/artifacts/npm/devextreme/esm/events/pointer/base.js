/**
* DevExtreme (esm/events/pointer/base.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventsEngine from '../../events/core/events_engine';
import browser from '../../core/utils/browser';
import domAdapter from '../../core/dom_adapter';
import Class from '../../core/class';
import { addNamespace, eventSource, fireEvent } from '../utils/index';
var POINTER_EVENTS_NAMESPACE = 'dxPointerEvents';
var BaseStrategy = Class.inherit({
  ctor: function ctor(eventName, originalEvents) {
    this._eventName = eventName;
    this._originalEvents = addNamespace(originalEvents, POINTER_EVENTS_NAMESPACE);
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
      pointerType: e.pointerType || eventSource(e),
      originalEvent: e,
      delegateTarget: delegateTarget,
      // NOTE: TimeStamp normalization (FF bug #238041) (T277118)
      timeStamp: browser.mozilla ? new Date().getTime() : e.timeStamp
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
    return fireEvent(args);
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
      element = this.noBubble ? element : domAdapter.getDocument();
      this._setSelector(handleObj);
      var that = this;
      eventsEngine.on(element, this._originalEvents, this._getSelector(), function (e) {
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
    element = this.noBubble ? element : domAdapter.getDocument();
    if (this._originalEvents !== '.' + POINTER_EVENTS_NAMESPACE) {
      eventsEngine.off(element, this._originalEvents, this._getSelector());
    }
  },
  dispose: function dispose(element) {
    element = this.noBubble ? element : domAdapter.getDocument();
    eventsEngine.off(element, this._originalEvents);
  }
});
export default BaseStrategy;
