/**
* DevExtreme (esm/viz/core/base_widget.utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { version } from '../../core/version';
import { format as _stringFormat } from '../../core/utils/string';
import warnings from './errors_warnings';
import { each } from '../../core/utils/iterator';
import _windowResizeCallbacks from '../../core/utils/resize_callbacks';
import resizeObserverSingleton from '../../core/resize_observer';
import { normalizeEnum } from './utils';
var ERROR_MESSAGES = warnings.ERROR_MESSAGES;
export function createEventTrigger(eventsMap, callbackGetter) {
  var triggers = {};
  each(eventsMap, function (name, info) {
    if (info.name) {
      createEvent(name);
    }
  });
  var changes;
  triggerEvent.change = function (name) {
    var eventInfo = eventsMap[name];
    if (eventInfo) {
      (changes = changes || {})[name] = eventInfo;
    }
    return !!eventInfo;
  };
  triggerEvent.applyChanges = function () {
    if (changes) {
      each(changes, function (name, eventInfo) {
        createEvent(eventInfo.newName || name);
      });
      changes = null;
    }
  };
  triggerEvent.dispose = function () {
    eventsMap = callbackGetter = triggers = null;
  };
  return triggerEvent;
  function createEvent(name) {
    var eventInfo = eventsMap[name];
    triggers[eventInfo.name] = callbackGetter(name, eventInfo.actionSettings);
  }
  function triggerEvent(name, arg, complete) {
    triggers[name](arg);
    complete && complete();
  }
}
export var createIncidentOccurred = function createIncidentOccurred(widgetName, eventTrigger) {
  return function incidentOccurred(id, args) {
    eventTrigger('incidentOccurred', {
      target: {
        id: id,
        type: id[0] === 'E' ? 'error' : 'warning',
        args: args,
        text: _stringFormat.apply(null, [ERROR_MESSAGES[id]].concat(args || [])),
        widget: widgetName,
        version: version
      }
    });
  };
};
function getResizeManager(resizeCallback) {
  return (observe, unsubscribe) => {
    var {
      handler,
      dispose
    } = createDeferredHandler(resizeCallback, unsubscribe);
    observe(handler);
    return dispose;
  };
}
function createDeferredHandler(callback, unsubscribe) {
  var timeout;
  var handler = function handler() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 100);
  };
  return {
    handler,
    dispose() {
      clearTimeout(timeout);
      unsubscribe(handler);
    }
  };
}
export function createResizeHandler(contentElement, redrawOnResize, resize) {
  var disposeHandler;
  var resizeManager = getResizeManager(resize);
  if (normalizeEnum(redrawOnResize) === 'windowonly') {
    disposeHandler = resizeManager(handler => _windowResizeCallbacks.add(handler), handler => _windowResizeCallbacks.remove(handler));
  } else if (redrawOnResize === true) {
    disposeHandler = resizeManager(handler => resizeObserverSingleton.observe(contentElement, handler), () => resizeObserverSingleton.unobserve(contentElement));
  }
  return disposeHandler;
}
