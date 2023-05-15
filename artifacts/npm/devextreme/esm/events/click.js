/**
* DevExtreme (esm/events/click.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../core/renderer';
import eventsEngine from '../events/core/events_engine';
import devices from '../core/devices';
import domAdapter from '../core/dom_adapter';
import { resetActiveElement } from '../core/utils/dom';
import { requestAnimationFrame, cancelAnimationFrame } from '../animation/frame';
import { addNamespace, fireEvent } from './utils/index';
import { subscribeNodesDisposing, unsubscribeNodesDisposing } from './utils/event_nodes_disposing';
import pointerEvents from './pointer';
import Emitter from './core/emitter';
import registerEmitter from './core/emitter_registrator';
var CLICK_EVENT_NAME = 'dxclick';
var misc = {
  requestAnimationFrame,
  cancelAnimationFrame
};
var prevented = null;
var lastFiredEvent = null;
var onNodeRemove = () => {
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
    unsubscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    lastFiredEvent = originalEvent;
    subscribeNodesDisposing(lastFiredEvent, onNodeRemove);
    fireEvent({
      type: CLICK_EVENT_NAME,
      originalEvent: e
    });
  }
};
var ClickEmitter = Emitter.inherit({
  ctor: function ctor(element) {
    this.callBase(element);
    eventsEngine.on(this.getElement(), 'click', clickHandler);
  },
  start: function start(e) {
    prevented = null;
  },
  cancel: function cancel() {
    prevented = true;
  },
  dispose: function dispose() {
    eventsEngine.off(this.getElement(), 'click', clickHandler);
  }
});

// NOTE: fixes native click blur on slow devices
(function () {
  var desktopDevice = devices.real().generic;
  if (!desktopDevice) {
    var startTarget = null;
    var blurPrevented = false;
    var isInput = function isInput(element) {
      return $(element).is('input, textarea, select, button ,:focus, :focus *');
    };
    var pointerDownHandler = function pointerDownHandler(e) {
      startTarget = e.target;
      blurPrevented = e.isDefaultPrevented();
    };
    var _clickHandler = function _clickHandler(e) {
      var $target = $(e.target);
      if (!blurPrevented && startTarget && !$target.is(startTarget) && !$(startTarget).is('label') && isInput($target)) {
        resetActiveElement();
      }
      startTarget = null;
      blurPrevented = false;
    };
    var NATIVE_CLICK_FIXER_NAMESPACE = 'NATIVE_CLICK_FIXER';
    var document = domAdapter.getDocument();
    eventsEngine.subscribeGlobal(document, addNamespace(pointerEvents.down, NATIVE_CLICK_FIXER_NAMESPACE), pointerDownHandler);
    eventsEngine.subscribeGlobal(document, addNamespace('click', NATIVE_CLICK_FIXER_NAMESPACE), _clickHandler);
  }
})();

/**
  * @name UI Events.dxclick
  * @type eventType
  * @type_function_param1 event:event
  * @module events/click
*/
registerEmitter({
  emitter: ClickEmitter,
  bubble: true,
  events: [CLICK_EVENT_NAME]
});
export { CLICK_EVENT_NAME as name };
