!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/events/core/events_engine.js"], ["./event_registrator_callbacks","../../core/utils/extend","../../core/dom_adapter","../../core/utils/window","../../core/utils/dependency_injector","../../core/utils/type","../../core/utils/callbacks","../../core/errors","../../events/core/hook_touch_props","../../core/utils/call_once"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/events/core/events_engine.js", ["./event_registrator_callbacks", "../../core/utils/extend", "../../core/dom_adapter", "../../core/utils/window", "../../core/utils/dependency_injector", "../../core/utils/type", "../../core/utils/callbacks", "../../core/errors", "../../events/core/hook_touch_props", "../../core/utils/call_once"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _event_registrator_callbacks = _interopRequireDefault($__require("./event_registrator_callbacks"));
  var _extend = $__require("../../core/utils/extend");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _window = $__require("../../core/utils/window");
  var _dependency_injector = _interopRequireDefault($__require("../../core/utils/dependency_injector"));
  var _type = $__require("../../core/utils/type");
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _errors = _interopRequireDefault($__require("../../core/errors"));
  var _hook_touch_props = _interopRequireDefault($__require("../../events/core/hook_touch_props"));
  var _call_once = _interopRequireDefault($__require("../../core/utils/call_once"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var window = (0, _window.getWindow)();
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
    return !(0, _type.isWindow)(target) && target.nodeName !== '#document' && _dom_adapter.default.elementMatches(target, selector);
  }
  var elementDataMap = new WeakMap();
  var guid = 0;
  var skipEvent;
  var special = function () {
    var specialData = {};
    _event_registrator_callbacks.default.add(function (eventName, eventObject) {
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
  var eventsEngine = (0, _dependency_injector.default)({
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
          var parent = (_element$parentNode = element.parentNode) !== null && _element$parentNode !== void 0 ? _element$parentNode : element.host;
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
          parentDataByEvent.callHandlers((0, _extend.extend)(event, {
            currentTarget: parents[i]
          }), extraParameters);
          i++;
        }
      }
      if (element.nodeType || (0, _type.isWindow)(element)) {
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
    if (_dom_adapter.default.isNode(element) || (0, _type.isWindow)(element)) {
      method.apply(eventsEngine, args);
    } else if (!(0, _type.isString)(element) && 'length' in element) {
      var itemArgs = Array.prototype.slice.call(args, 0);
      Array.prototype.forEach.call(element, function (itemElement) {
        itemArgs[0] = itemElement;
        applyForEach(itemArgs, method);
      });
    } else {
      throw _errors.default.Error('E0025');
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
  var passiveEventHandlersSupported = (0, _call_once.default)(detectPassiveEventHandlersSupport);
  var contains = function contains(container, element) {
    if ((0, _type.isWindow)(container)) {
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
          eventData.removeListener = _dom_adapter.default.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData.nativeHandler, nativeListenerOptions);
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
      if (_typeof(eventName) === 'object') {
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
    if ((0, _type.isFunction)(element[nativeMethodName])) {
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
    var srcIsEvent = src instanceof eventsEngine.Event || (0, _window.hasWindow)() && src instanceof window.Event || ((_src$view = src.view) === null || _src$view === void 0 ? void 0 : _src$view.Event) && src instanceof src.view.Event;
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
  EVENT_PROPERTIES.forEach(function (prop) {
    return addProperty(prop, function (event) {
      return event[prop];
    });
  });
  (0, _hook_touch_props.default)(addProperty);
  var beforeSetStrategy = (0, _callbacks.default)();
  var afterSetStrategy = (0, _callbacks.default)();
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

  ///#DEBUG
  eventsEngine.elementDataMap = elementDataMap;
  eventsEngine.detectPassiveEventHandlersSupport = detectPassiveEventHandlersSupport;

  ///#ENDDEBUG
  var _default = eventsEngine;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./event_registrator_callbacks","../../core/utils/extend","../../core/dom_adapter","../../core/utils/window","../../core/utils/dependency_injector","../../core/utils/type","../../core/utils/callbacks","../../core/errors","../../events/core/hook_touch_props","../../core/utils/call_once"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./event_registrator_callbacks"), require("../../core/utils/extend"), require("../../core/dom_adapter"), require("../../core/utils/window"), require("../../core/utils/dependency_injector"), require("../../core/utils/type"), require("../../core/utils/callbacks"), require("../../core/errors"), require("../../events/core/hook_touch_props"), require("../../core/utils/call_once"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=events_engine.js.map