import _extends from "@babel/runtime/helpers/esm/extends";
import registerEventCallbacks from './event_registrator_callbacks';
import { extend } from '../../core/utils/extend';
import domAdapter from '../../core/dom_adapter';
import { getWindow, hasWindow } from '../../core/utils/window';
var window = getWindow();
import injector from '../../core/utils/dependency_injector';
import { isWindow, isFunction, isString, isObject } from '../../core/utils/type';
import Callbacks from '../../core/utils/callbacks';
import errors from '../../core/errors';
import hookTouchProps from '../../events/core/hook_touch_props';
import callOnce from '../../core/utils/call_once';
var EMPTY_EVENT_NAME = 'dxEmptyEventType';
var NATIVE_EVENTS_TO_SUBSCRIBE = {
  'mouseenter': 'mouseover',
  'mouseleave': 'mouseout',
  'pointerenter': 'pointerover',
  'pointerleave': 'pointerout'
};
var NATIVE_EVENTS_TO_TRIGGER = {
  'focusin': 'focus',
  'focusout': 'blur'
};
var NO_BUBBLE_EVENTS = ['blur', 'focus', 'load'];
var forcePassiveFalseEventNames = ['touchmove', 'wheel', 'mousewheel', 'touchstart'];
var EVENT_PROPERTIES = ['target', 'relatedTarget', 'delegateTarget', 'altKey', 'bubbles', 'cancelable', 'changedTouches', 'ctrlKey', 'detail', 'eventPhase', 'metaKey', 'shiftKey', 'view', 'char', 'code', 'charCode', 'key', 'keyCode', 'button', 'buttons', 'offsetX', 'offsetY', 'pointerId', 'pointerType', 'targetTouches', 'toElement', 'touches'];
function matchesSafe(target, selector) {
  return !isWindow(target) && target.nodeName !== '#document' && domAdapter.elementMatches(target, selector);
}
var elementDataMap = new WeakMap();
var guid = 0;
var skipEvent;
var special = function () {
  var specialData = {};
  registerEventCallbacks.add(function (eventName, eventObject) {
    specialData[eventName] = eventObject;
  });
  return {
    getField: function getField(eventName, field) {
      return specialData[eventName] && specialData[eventName][field];
    },
    callMethod: function callMethod(eventName, methodName, context, args) {
      return specialData[eventName] && specialData[eventName][methodName] && specialData[eventName][methodName].apply(context, args);
    }
  };
}();
var eventsEngine = injector({
  on: getHandler(normalizeOnArguments(iterate(function (element, eventName, selector, data, handler) {
    var handlersController = getHandlersController(element, eventName);
    handlersController.addHandler(handler, selector, data);
  }))),
  one: getHandler(normalizeOnArguments(function (element, eventName, selector, data, handler) {
    var oneTimeHandler = function oneTimeHandler() {
      eventsEngine.off(element, eventName, selector, oneTimeHandler);
      handler.apply(this, arguments);
    };
    eventsEngine.on(element, eventName, selector, data, oneTimeHandler);
  })),
  off: getHandler(normalizeOffArguments(iterate(function (element, eventName, selector, handler) {
    var handlersController = getHandlersController(element, eventName);
    handlersController.removeHandler(handler, selector);
  }))),
  trigger: getHandler(normalizeTriggerArguments(function (element, event, extraParameters) {
    var eventName = event.type;
    var handlersController = getHandlersController(element, event.type);
    special.callMethod(eventName, 'trigger', element, [event, extraParameters]);
    handlersController.callHandlers(event, extraParameters);
    var noBubble = special.getField(eventName, 'noBubble') || event.isPropagationStopped() || NO_BUBBLE_EVENTS.indexOf(eventName) !== -1;
    if (!noBubble) {
      var parents = [];
      var getParents = function getParents(element) {
        var _element$parentNode;
        var parent = (_element$parentNode = element.parentNode) !== null && _element$parentNode !== void 0 ? _element$parentNode : isObject(element.host) ? element.host : null;
        if (parent) {
          parents.push(parent);
          getParents(parent);
        }
      };
      getParents(element);
      parents.push(window);
      var i = 0;
      while (parents[i] && !event.isPropagationStopped()) {
        var parentDataByEvent = getHandlersController(parents[i], event.type);
        parentDataByEvent.callHandlers(extend(event, {
          currentTarget: parents[i]
        }), extraParameters);
        i++;
      }
    }
    if (element.nodeType || isWindow(element)) {
      special.callMethod(eventName, '_default', element, [event, extraParameters]);
      callNativeMethod(eventName, element);
    }
  })),
  triggerHandler: getHandler(normalizeTriggerArguments(function (element, event, extraParameters) {
    var handlersController = getHandlersController(element, event.type);
    handlersController.callHandlers(event, extraParameters);
  }))
});
function applyForEach(args, method) {
  var element = args[0];
  if (!element) {
    return;
  }
  if (domAdapter.isNode(element) || isWindow(element)) {
    method.apply(eventsEngine, args);
  } else if (!isString(element) && 'length' in element) {
    var itemArgs = Array.prototype.slice.call(args, 0);
    Array.prototype.forEach.call(element, function (itemElement) {
      itemArgs[0] = itemElement;
      applyForEach(itemArgs, method);
    });
  } else {
    throw errors.Error('E0025');
  }
}
function getHandler(method) {
  return function () {
    applyForEach(arguments, method);
  };
}
function detectPassiveEventHandlersSupport() {
  var isSupported = false;
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        isSupported = true;
        return true;
      }
    });
    window.addEventListener('test', null, options);
  } catch (e) {}
  return isSupported;
}
var passiveEventHandlersSupported = callOnce(detectPassiveEventHandlersSupport);
var contains = (container, element) => {
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS);
};
function getHandlersController(element, eventName) {
  var elementData = elementDataMap.get(element);
  eventName = eventName || '';
  var eventNameParts = eventName.split('.');
  var namespaces = eventNameParts.slice(1);
  var eventNameIsDefined = !!eventNameParts[0];
  eventName = eventNameParts[0] || EMPTY_EVENT_NAME;
  if (!elementData) {
    elementData = {};
    elementDataMap.set(element, elementData);
  }
  if (!elementData[eventName]) {
    elementData[eventName] = {
      handleObjects: [],
      nativeHandler: null
    };
  }
  var eventData = elementData[eventName];
  return {
    addHandler: function addHandler(handler, selector, data) {
      var callHandler = function callHandler(e, extraParameters) {
        var handlerArgs = [e];
        var target = e.currentTarget;
        var relatedTarget = e.relatedTarget;
        var secondaryTargetIsInside;
        var result;
        if (eventName in NATIVE_EVENTS_TO_SUBSCRIBE) {
          secondaryTargetIsInside = relatedTarget && target && (relatedTarget === target || contains(target, relatedTarget));
        }
        if (extraParameters !== undefined) {
          handlerArgs.push(extraParameters);
        }
        special.callMethod(eventName, 'handle', element, [e, data]);
        if (!secondaryTargetIsInside) {
          result = handler.apply(target, handlerArgs);
        }
        if (result === false) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      var wrappedHandler = function wrappedHandler(e, extraParameters) {
        if (skipEvent && e.type === skipEvent) {
          return;
        }
        e.data = data;
        e.delegateTarget = element;
        if (selector) {
          var currentTarget = e.target;
          while (currentTarget && currentTarget !== element) {
            if (matchesSafe(currentTarget, selector)) {
              e.currentTarget = currentTarget;
              callHandler(e, extraParameters);
            }
            currentTarget = currentTarget.parentNode;
          }
        } else {
          e.currentTarget = e.delegateTarget || e.target;
          callHandler(e, extraParameters);
        }
      };
      var handleObject = {
        handler: handler,
        wrappedHandler: wrappedHandler,
        selector: selector,
        type: eventName,
        data: data,
        namespace: namespaces.join('.'),
        namespaces: namespaces,
        guid: ++guid
      };
      eventData.handleObjects.push(handleObject);
      var firstHandlerForTheType = eventData.handleObjects.length === 1;
      var shouldAddNativeListener = firstHandlerForTheType && eventNameIsDefined;
      var nativeListenerOptions;
      if (shouldAddNativeListener) {
        shouldAddNativeListener = !special.callMethod(eventName, 'setup', element, [data, namespaces, handler]);
      }
      if (shouldAddNativeListener) {
        eventData.nativeHandler = getNativeHandler(eventName);
        if (passiveEventHandlersSupported() && forcePassiveFalseEventNames.indexOf(eventName) > -1) {
          nativeListenerOptions = {
            passive: false
          };
        }
        eventData.removeListener = domAdapter.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData.nativeHandler, nativeListenerOptions);
      }
      special.callMethod(eventName, 'add', element, [handleObject]);
    },
    removeHandler: function removeHandler(handler, selector) {
      var removeByEventName = function removeByEventName(eventName) {
        var eventData = elementData[eventName];
        if (!eventData.handleObjects.length) {
          delete elementData[eventName];
          return;
        }
        var removedHandler;
        eventData.handleObjects = eventData.handleObjects.filter(function (handleObject) {
          var skip = namespaces.length && !isSubset(handleObject.namespaces, namespaces) || handler && handleObject.handler !== handler || selector && handleObject.selector !== selector;
          if (!skip) {
            removedHandler = handleObject.handler;
            special.callMethod(eventName, 'remove', element, [handleObject]);
          }
          return skip;
        });
        var lastHandlerForTheType = !eventData.handleObjects.length;
        var shouldRemoveNativeListener = lastHandlerForTheType && eventName !== EMPTY_EVENT_NAME;
        if (shouldRemoveNativeListener) {
          special.callMethod(eventName, 'teardown', element, [namespaces, removedHandler]);
          if (eventData.nativeHandler) {
            eventData.removeListener();
          }
          delete elementData[eventName];
        }
      };
      if (eventNameIsDefined) {
        removeByEventName(eventName);
      } else {
        for (var name in elementData) {
          removeByEventName(name);
        }
      }
      var elementDataIsEmpty = Object.keys(elementData).length === 0;
      if (elementDataIsEmpty) {
        elementDataMap.delete(element);
      }
    },
    callHandlers: function callHandlers(event, extraParameters) {
      var forceStop = false;
      var handleCallback = function handleCallback(handleObject) {
        if (forceStop) {
          return;
        }
        if (!namespaces.length || isSubset(handleObject.namespaces, namespaces)) {
          handleObject.wrappedHandler(event, extraParameters);
          forceStop = event.isImmediatePropagationStopped();
        }
      };
      eventData.handleObjects.forEach(handleCallback);
      if (namespaces.length && elementData[EMPTY_EVENT_NAME]) {
        elementData[EMPTY_EVENT_NAME].handleObjects.forEach(handleCallback);
      }
    }
  };
}
function getNativeHandler(subscribeName) {
  return function (event, extraParameters) {
    var handlersController = getHandlersController(this, subscribeName);
    event = eventsEngine.Event(event);
    handlersController.callHandlers(event, extraParameters);
  };
}
function isSubset(original, checked) {
  for (var i = 0; i < checked.length; i++) {
    if (original.indexOf(checked[i]) < 0) return false;
  }
  return true;
}
function normalizeOnArguments(callback) {
  return function (element, eventName, selector, data, handler) {
    if (!handler) {
      handler = data;
      data = undefined;
    }
    if (typeof selector !== 'string') {
      data = selector;
      selector = undefined;
    }
    if (!handler && typeof eventName === 'string') {
      handler = data || selector;
      selector = undefined;
      data = undefined;
    }
    callback(element, eventName, selector, data, handler);
  };
}
function normalizeOffArguments(callback) {
  return function (element, eventName, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = undefined;
    }
    callback(element, eventName, selector, handler);
  };
}
function normalizeTriggerArguments(callback) {
  return function (element, src, extraParameters) {
    if (typeof src === 'string') {
      src = {
        type: src
      };
    }
    if (!src.target) {
      src.target = element;
    }
    src.currentTarget = element;
    if (!src.delegateTarget) {
      src.delegateTarget = element;
    }
    if (!src.type && src.originalEvent) {
      src.type = src.originalEvent.type;
    }
    callback(element, src instanceof eventsEngine.Event ? src : eventsEngine.Event(src), extraParameters);
  };
}
function normalizeEventArguments(callback) {
  eventsEngine.Event = function (src, config) {
    if (!(this instanceof eventsEngine.Event)) {
      return new eventsEngine.Event(src, config);
    }
    if (!src) {
      src = {};
    }
    if (typeof src === 'string') {
      src = {
        type: src
      };
    }
    if (!config) {
      config = {};
    }
    callback.call(this, src, config);
  };
  _extends(eventsEngine.Event.prototype, {
    _propagationStopped: false,
    _immediatePropagationStopped: false,
    _defaultPrevented: false,
    isPropagationStopped: function isPropagationStopped() {
      return !!(this._propagationStopped || this.originalEvent && this.originalEvent.propagationStopped);
    },
    stopPropagation: function stopPropagation() {
      this._propagationStopped = true;
      this.originalEvent && this.originalEvent.stopPropagation();
    },
    isImmediatePropagationStopped: function isImmediatePropagationStopped() {
      return this._immediatePropagationStopped;
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      this.stopPropagation();
      this._immediatePropagationStopped = true;
      this.originalEvent && this.originalEvent.stopImmediatePropagation();
    },
    isDefaultPrevented: function isDefaultPrevented() {
      return !!(this._defaultPrevented || this.originalEvent && this.originalEvent.defaultPrevented);
    },
    preventDefault: function preventDefault() {
      this._defaultPrevented = true;
      this.originalEvent && this.originalEvent.preventDefault();
    }
  });
  return eventsEngine.Event;
}
function iterate(callback) {
  var iterateEventNames = function iterateEventNames(element, eventName) {
    if (eventName && eventName.indexOf(' ') > -1) {
      var args = Array.prototype.slice.call(arguments, 0);
      eventName.split(' ').forEach(function (eventName) {
        args[1] = eventName;
        callback.apply(this, args);
      });
    } else {
      callback.apply(this, arguments);
    }
  };
  return function (element, eventName) {
    if (typeof eventName === 'object') {
      var args = Array.prototype.slice.call(arguments, 0);
      for (var name in eventName) {
        args[1] = name;
        args[args.length - 1] = eventName[name];
        iterateEventNames.apply(this, args);
      }
    } else {
      iterateEventNames.apply(this, arguments);
    }
  };
}
function callNativeMethod(eventName, element) {
  var nativeMethodName = NATIVE_EVENTS_TO_TRIGGER[eventName] || eventName;
  var isLinkClickEvent = function isLinkClickEvent(eventName, element) {
    return eventName === 'click' && element.localName === 'a';
  };
  if (isLinkClickEvent(eventName, element)) return;
  if (isFunction(element[nativeMethodName])) {
    skipEvent = eventName;
    element[nativeMethodName]();
    skipEvent = undefined;
  }
}
function calculateWhich(event) {
  var setForMouseEvent = function setForMouseEvent(event) {
    var mouseEventRegex = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
    return !event.which && event.button !== undefined && mouseEventRegex.test(event.type);
  };
  var setForKeyEvent = function setForKeyEvent(event) {
    return event.which == null && event.type.indexOf('key') === 0;
  };
  if (setForKeyEvent(event)) {
    return event.charCode != null ? event.charCode : event.keyCode;
  }
  if (setForMouseEvent(event)) {
    var whichByButton = {
      1: 1,
      2: 3,
      3: 1,
      4: 2
    };
    return whichByButton[event.button];
  }
  return event.which;
}
function initEvent(EventClass) {
  if (EventClass) {
    eventsEngine.Event = EventClass;
    eventsEngine.Event.prototype = EventClass.prototype;
  }
}
initEvent(normalizeEventArguments(function (src, config) {
  var _src$view;
  var srcIsEvent = src instanceof eventsEngine.Event || hasWindow() && src instanceof window.Event || ((_src$view = src.view) === null || _src$view === void 0 ? void 0 : _src$view.Event) && src instanceof src.view.Event;
  if (srcIsEvent) {
    this.originalEvent = src;
    this.type = src.type;
    this.currentTarget = undefined;
    if (Object.prototype.hasOwnProperty.call(src, 'isTrusted')) {
      this.isTrusted = src.isTrusted;
    }
    this.timeStamp = src.timeStamp || Date.now();
  } else {
    _extends(this, src);
  }
  addProperty('which', calculateWhich, this);
  if (src.type.indexOf('touch') === 0) {
    delete config.pageX;
    delete config.pageY;
  }
  _extends(this, config);
  this.guid = ++guid;
}));
function addProperty(propName, hook, eventInstance) {
  Object.defineProperty(eventInstance || eventsEngine.Event.prototype, propName, {
    enumerable: true,
    configurable: true,
    get: function get() {
      return this.originalEvent && hook(this.originalEvent);
    },
    set: function set(value) {
      Object.defineProperty(this, propName, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
      });
    }
  });
}
EVENT_PROPERTIES.forEach(prop => addProperty(prop, event => event[prop]));
hookTouchProps(addProperty);
var beforeSetStrategy = Callbacks();
var afterSetStrategy = Callbacks();
eventsEngine.set = function (engine) {
  beforeSetStrategy.fire();
  eventsEngine.inject(engine);
  initEvent(engine.Event);
  afterSetStrategy.fire();
};
eventsEngine.subscribeGlobal = function () {
  applyForEach(arguments, normalizeOnArguments(function () {
    var args = arguments;
    eventsEngine.on.apply(this, args);
    beforeSetStrategy.add(function () {
      var offArgs = Array.prototype.slice.call(args, 0);
      offArgs.splice(3, 1);
      eventsEngine.off.apply(this, offArgs);
    });
    afterSetStrategy.add(function () {
      eventsEngine.on.apply(this, args);
    });
  }));
};
eventsEngine.forcePassiveFalseEventNames = forcePassiveFalseEventNames;
eventsEngine.passiveEventHandlersSupported = passiveEventHandlersSupported;
export default eventsEngine;