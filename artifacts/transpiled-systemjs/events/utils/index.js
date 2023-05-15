!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/events/utils/index.js"], ["../../core/renderer","./add_namespace","../core/events_engine","../../core/utils/iterator","../../core/utils/extend","../../ui/widget/selectors"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/events/utils/index.js", ["../../core/renderer", "./add_namespace", "../core/events_engine", "../../core/utils/iterator", "../../core/utils/extend", "../../ui/widget/selectors"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.stopEventsSkipping = exports.setEventFixMethod = exports.normalizeKeyName = exports.needSkipEvent = exports.isTouchEvent = exports.isPointerEvent = exports.isMouseEvent = exports.isKeyboardEvent = exports.isFakeClickEvent = exports.isDxMouseWheelEvent = exports.isCommandKeyPressed = exports.hasTouches = exports.getChar = exports.forceSkipEvents = exports.fireEvent = exports.eventSource = exports.eventDelta = exports.eventData = exports.createEvent = exports.addNamespace = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _add_namespace = _interopRequireDefault($__require("./add_namespace"));
  var _events_engine = _interopRequireDefault($__require("../core/events_engine"));
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _selectors = $__require("../../ui/widget/selectors");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var KEY_MAP = {
    'backspace': 'backspace',
    'tab': 'tab',
    'enter': 'enter',
    'escape': 'escape',
    'pageup': 'pageUp',
    'pagedown': 'pageDown',
    'end': 'end',
    'home': 'home',
    'arrowleft': 'leftArrow',
    'arrowup': 'upArrow',
    'arrowright': 'rightArrow',
    'arrowdown': 'downArrow',
    'delete': 'del',
    ' ': 'space',
    'f': 'F',
    'a': 'A',
    '*': 'asterisk',
    '-': 'minus',
    'alt': 'alt',
    'control': 'control',
    'shift': 'shift'
  };
  var LEGACY_KEY_CODES = {
    // iOS 10.2 and lower didn't supports KeyboardEvent.key
    '8': 'backspace',
    '9': 'tab',
    '13': 'enter',
    '27': 'escape',
    '33': 'pageUp',
    '34': 'pageDown',
    '35': 'end',
    '36': 'home',
    '37': 'leftArrow',
    '38': 'upArrow',
    '39': 'rightArrow',
    '40': 'downArrow',
    '46': 'del',
    '32': 'space',
    '70': 'F',
    '65': 'A',
    '106': 'asterisk',
    '109': 'minus',
    '189': 'minus',
    '173': 'minus',
    '16': 'shift',
    '17': 'control',
    '18': 'alt'
  };
  var EVENT_SOURCES_REGEX = {
    dx: /^dx/i,
    mouse: /(mouse|wheel)/i,
    touch: /^touch/i,
    keyboard: /^key/i,
    pointer: /^(ms)?pointer/i
  };
  var fixMethod = function fixMethod(e) {
    return e;
  };
  var copyEvent = function copyEvent(originalEvent) {
    return fixMethod(_events_engine.default.Event(originalEvent, originalEvent), originalEvent);
  };
  var isDxEvent = function isDxEvent(e) {
    return eventSource(e) === 'dx';
  };
  var isNativeMouseEvent = function isNativeMouseEvent(e) {
    return eventSource(e) === 'mouse';
  };
  var isNativeTouchEvent = function isNativeTouchEvent(e) {
    return eventSource(e) === 'touch';
  };
  var eventSource = function eventSource(_ref) {
    var type = _ref.type;
    var result = 'other';
    (0, _iterator.each)(EVENT_SOURCES_REGEX, function (key) {
      if (this.test(type)) {
        result = key;
        return false;
      }
    });
    return result;
  };
  exports.eventSource = eventSource;
  var isPointerEvent = function isPointerEvent(e) {
    return eventSource(e) === 'pointer';
  };
  exports.isPointerEvent = isPointerEvent;
  var isMouseEvent = function isMouseEvent(e) {
    return isNativeMouseEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && e.pointerType === 'mouse';
  };
  exports.isMouseEvent = isMouseEvent;
  var isDxMouseWheelEvent = function isDxMouseWheelEvent(e) {
    return e && e.type === 'dxmousewheel';
  };
  exports.isDxMouseWheelEvent = isDxMouseWheelEvent;
  var isTouchEvent = function isTouchEvent(e) {
    return isNativeTouchEvent(e) || (isPointerEvent(e) || isDxEvent(e)) && e.pointerType === 'touch';
  };
  exports.isTouchEvent = isTouchEvent;
  var isKeyboardEvent = function isKeyboardEvent(e) {
    return eventSource(e) === 'keyboard';
  };
  exports.isKeyboardEvent = isKeyboardEvent;
  var isFakeClickEvent = function isFakeClickEvent(_ref2) {
    var screenX = _ref2.screenX,
        offsetX = _ref2.offsetX,
        pageX = _ref2.pageX;
    return screenX === 0 && !offsetX && pageX === 0;
  };
  exports.isFakeClickEvent = isFakeClickEvent;
  var eventData = function eventData(_ref3) {
    var pageX = _ref3.pageX,
        pageY = _ref3.pageY,
        timeStamp = _ref3.timeStamp;
    return {
      x: pageX,
      y: pageY,
      time: timeStamp
    };
  };
  exports.eventData = eventData;
  var eventDelta = function eventDelta(from, to) {
    return {
      x: to.x - from.x,
      y: to.y - from.y,
      time: to.time - from.time || 1
    };
  };
  exports.eventDelta = eventDelta;
  var hasTouches = function hasTouches(e) {
    var originalEvent = e.originalEvent,
        pointers = e.pointers;
    if (isNativeTouchEvent(e)) {
      return (originalEvent.touches || []).length;
    }
    if (isDxEvent(e)) {
      return (pointers || []).length;
    }
    return 0;
  };

  // TODO: for tests
  exports.hasTouches = hasTouches;
  var skipEvents = false;
  var forceSkipEvents = function forceSkipEvents() {
    return skipEvents = true;
  };
  exports.forceSkipEvents = forceSkipEvents;
  var stopEventsSkipping = function stopEventsSkipping() {
    return skipEvents = false;
  };
  exports.stopEventsSkipping = stopEventsSkipping;
  var needSkipEvent = function needSkipEvent(e) {
    // TODO: for tests
    if (skipEvents) {
      return true;
    }

    // TODO: this checking used in swipeable first move handler. is it correct?
    var target = e.target;
    var $target = (0, _renderer.default)(target);
    var isContentEditable = (target === null || target === void 0 ? void 0 : target.isContentEditable) || (target === null || target === void 0 ? void 0 : target.hasAttribute('contenteditable'));
    var touchInEditable = $target.is('input, textarea, select') || isContentEditable;
    if (isDxMouseWheelEvent(e)) {
      var isTextArea = $target.is('textarea') && $target.hasClass('dx-texteditor-input');
      if (isTextArea || isContentEditable) {
        return false;
      }
      var isInputFocused = $target.is('input[type=\'number\'], textarea, select') && $target.is(':focus');
      return isInputFocused;
    }
    if (isMouseEvent(e)) {
      return touchInEditable || e.which > 1; // only left mouse button
    }

    if (isTouchEvent(e)) {
      return touchInEditable && (0, _selectors.focused)($target);
    }
  };
  exports.needSkipEvent = needSkipEvent;
  var setEventFixMethod = function setEventFixMethod(func) {
    return fixMethod = func;
  };
  exports.setEventFixMethod = setEventFixMethod;
  var createEvent = function createEvent(originalEvent, args) {
    var event = copyEvent(originalEvent);
    args && (0, _extend.extend)(event, args);
    return event;
  };
  exports.createEvent = createEvent;
  var fireEvent = function fireEvent(props) {
    var originalEvent = props.originalEvent,
        delegateTarget = props.delegateTarget;
    var event = createEvent(originalEvent, props);
    _events_engine.default.trigger(delegateTarget || event.target, event);
    return event;
  };
  exports.fireEvent = fireEvent;
  var normalizeKeyName = function normalizeKeyName(_ref4) {
    var key = _ref4.key,
        which = _ref4.which;
    var normalizedKey = KEY_MAP[key === null || key === void 0 ? void 0 : key.toLowerCase()] || key;
    var normalizedKeyFromWhich = LEGACY_KEY_CODES[which];
    if (normalizedKeyFromWhich && normalizedKey === key) {
      return normalizedKeyFromWhich;
    } else if (!normalizedKey && which) {
      return String.fromCharCode(which);
    }
    return normalizedKey;
  };
  exports.normalizeKeyName = normalizeKeyName;
  var getChar = function getChar(_ref5) {
    var key = _ref5.key,
        which = _ref5.which;
    return key || String.fromCharCode(which);
  };
  exports.getChar = getChar;
  var addNamespace = _add_namespace.default;
  exports.addNamespace = addNamespace;
  var isCommandKeyPressed = function isCommandKeyPressed(_ref6) {
    var ctrlKey = _ref6.ctrlKey,
        metaKey = _ref6.metaKey;
    return ctrlKey || metaKey;
  };
  exports.isCommandKeyPressed = isCommandKeyPressed;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./add_namespace","../core/events_engine","../../core/utils/iterator","../../core/utils/extend","../../ui/widget/selectors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./add_namespace"), require("../core/events_engine"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../../ui/widget/selectors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=index.js.map