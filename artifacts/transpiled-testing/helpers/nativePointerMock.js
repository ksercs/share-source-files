!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/nativePointerMock.js"], ["jquery"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/helpers/nativePointerMock.js", ["require", "exports", "module", "jquery"], function(require, exports, module) {
      root.nativePointerMock = module.exports = factory(require('jquery'));
    });
  } else {
    root.nativePointerMock = factory(jQuery);
  }
}(window, function($) {
  const UA = (function() {
    const ua = window.navigator.userAgent;
    let matches;
    let version;
    const result = {userAgent: ua};
    if (/i(pod|pad|phone)/ig.test(ua)) {
      matches = ua.match(/os (\d+)_(\d+)_?(\d+)?/i);
      version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
      result.ios = version[0];
    }
    if (/android|htc_|silk/ig.test(ua)) {
      matches = ua.match(/android (\d+)\.(\d+)\.?(\d+)?/i);
      version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
      result.android = version[0];
    }
    if (/Chrome/ig.test(ua)) {
      matches = ua.match(/Chrome\/(\d+)\.(\d+)\.?(\d+)?/i);
      version = [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)];
      result.chrome = version[0];
    }
    return result;
  })();
  const simulateEvent = (function() {
    const isString = function(val) {
      return typeof val === 'string';
    };
    const isBoolean = function(val) {
      return typeof val === 'boolean';
    };
    const isObject = function(val) {
      return typeof val === 'object';
    };
    const MOUSE_EVENTS = {
      'click': 1,
      'dblclick': 1,
      'mouseover': 1,
      'mouseout': 1,
      'mousedown': 1,
      'mouseup': 1,
      'mousemove': 1,
      'contextmenu': 1
    };
    const POINTER_EVENTS = {
      'pointerover': 1,
      'pointerout': 1,
      'pointerdown': 1,
      'pointerup': 1,
      'pointermove': 1
    };
    const KEY_EVENTS = {
      'keydown': 1,
      'keyup': 1,
      'keypress': 1
    };
    const UI_EVENTS = {
      submit: 1,
      blur: 1,
      change: 1,
      focus: 1,
      resize: 1,
      scroll: 1,
      select: 1
    };
    const TOUCH_EVENTS = {
      'touchstart': 1,
      'touchmove': 1,
      'touchend': 1,
      'touchcancel': 1
    };
    const GESTURE_EVENTS = {
      'gesturestart': 1,
      'gesturechange': 1,
      'gestureend': 1
    };
    const BUBBLE_EVENTS = $.extend({
      scroll: 1,
      resize: 1,
      reset: 1,
      submit: 1,
      change: 1,
      select: 1,
      error: 1,
      abort: 1
    }, MOUSE_EVENTS, KEY_EVENTS, TOUCH_EVENTS);
    const simulateKeyEvent = function(target, type, bubbles, cancelable, view, ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode) {
      if (!target) {
        throw Error('Invalid target');
      }
      if (isString(type)) {
        type = type.toLowerCase();
        switch (type) {
          case 'textevent':
            type = 'keypress';
            break;
          case 'keyup':
          case 'keydown':
          case 'keypress':
            break;
          default:
            throw Error('Event type \'' + type + '\' not supported.');
        }
      } else {
        throw Error('Event type must be a string.');
      }
      if (!isBoolean(bubbles)) {
        bubbles = true;
      }
      if (!isBoolean(cancelable)) {
        cancelable = true;
      }
      if (!isObject(view)) {
        view = window;
      }
      if (!isBoolean(ctrlKey)) {
        ctrlKey = false;
      }
      if (!isBoolean(altKey)) {
        altKey = false;
      }
      if (!isBoolean(shiftKey)) {
        shiftKey = false;
      }
      if (!isBoolean(metaKey)) {
        metaKey = false;
      }
      if (!$.isNumeric(keyCode)) {
        keyCode = 0;
      }
      if (!$.isNumeric(charCode)) {
        charCode = 0;
      }
      let customEvent = null;
      try {
        customEvent = document.createEvent('KeyEvents');
        customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
      } catch (ex) {
        try {
          customEvent = document.createEvent('Events');
        } catch (uiError) {
          customEvent = document.createEvent('UIEvents');
        } finally {
          customEvent.initEvent(type, bubbles, cancelable);
          customEvent.view = view;
          customEvent.altKey = altKey;
          customEvent.ctrlKey = ctrlKey;
          customEvent.shiftKey = shiftKey;
          customEvent.metaKey = metaKey;
          customEvent.keyCode = keyCode;
          customEvent.which = keyCode;
          customEvent.charCode = charCode;
        }
      }
      target.dispatchEvent(customEvent);
    };
    const simulateMouseEvent = function(target, type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
      if (!target) {
        throw Error('Invalid target.');
      }
      if (isString(type)) {
        if (!MOUSE_EVENTS[type.toLowerCase()] && !POINTER_EVENTS[type]) {
          throw Error('Event type \'' + type + '\' not supported.');
        }
      } else {
        throw Error('Event type must be a string.');
      }
      if (!isBoolean(bubbles)) {
        bubbles = true;
      }
      if (!isBoolean(cancelable)) {
        cancelable = (type !== 'mousemove');
      }
      if (!isObject(view)) {
        view = window;
      }
      if (!$.isNumeric(detail)) {
        detail = 1;
      }
      if (!$.isNumeric(screenX)) {
        screenX = 0;
      }
      if (!$.isNumeric(screenY)) {
        screenY = 0;
      }
      if (!$.isNumeric(clientX)) {
        clientX = 0;
      }
      if (!$.isNumeric(clientY)) {
        clientY = 0;
      }
      if (!isBoolean(ctrlKey)) {
        ctrlKey = false;
      }
      if (!isBoolean(altKey)) {
        altKey = false;
      }
      if (!isBoolean(shiftKey)) {
        shiftKey = false;
      }
      if (!isBoolean(metaKey)) {
        metaKey = false;
      }
      if (!$.isNumeric(button)) {
        button = 0;
      }
      relatedTarget = relatedTarget || null;
      let customEvent = document.createEvent('MouseEvents');
      if (customEvent.initMouseEvent) {
        customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
      } else {
        customEvent = document.createEvent('UIEvents');
        customEvent.initEvent(type, bubbles, cancelable);
        customEvent.view = view;
        customEvent.detail = detail;
        customEvent.screenX = screenX;
        customEvent.screenY = screenY;
        customEvent.clientX = clientX;
        customEvent.clientY = clientY;
        customEvent.ctrlKey = ctrlKey;
        customEvent.altKey = altKey;
        customEvent.metaKey = metaKey;
        customEvent.shiftKey = shiftKey;
        customEvent.button = button;
        customEvent.relatedTarget = relatedTarget;
      }
      if (relatedTarget && !customEvent.relatedTarget) {
        if (type === 'mouseout') {
          customEvent.toElement = relatedTarget;
        } else if (type === 'mouseover') {
          customEvent.fromElement = relatedTarget;
        }
      }
      target.dispatchEvent(customEvent);
    };
    const simulateUIEvent = function(target, type, bubbles, cancelable, view, detail) {
      if (!target) {
        throw Error('Invalid target.');
      }
      if (isString(type)) {
        type = type.toLowerCase();
        if (!UI_EVENTS[type]) {
          throw Error('Event type \'' + type + '\' not supported.');
        }
      } else {
        throw Error('Event type must be a string.');
      }
      let customEvent = null;
      if (!isBoolean(bubbles)) {
        bubbles = (type in BUBBLE_EVENTS);
        if (!isBoolean(cancelable)) {
          cancelable = (type === 'submit');
          if (!isObject(view)) {
            view = window;
            if (!$.isNumeric(detail)) {
              detail = 1;
              if ($.isFunction(document.createEvent)) {
                customEvent = document.createEvent('UIEvents');
                customEvent.initUIEvent(type, bubbles, cancelable, view, detail);
                target.dispatchEvent(customEvent);
              } else {
                throw Error('No event simulation framework present.');
              }
            }
          }
        }
      }
    };
    const simulateGestureEvent = function(target, type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, scale, rotation) {
      if (!UA.ios || UA.ios < 2.0) {
        throw Error('Native gesture DOM eventframe is not available in this platform.');
      }
      if (!target) {
        throw Error('Invalid target.');
      }
      if (isString(type)) {
        type = type.toLowerCase();
        if (!GESTURE_EVENTS[type]) {
          throw Error('Event type \'' + type + '\' not supported.');
        }
      } else {
        throw Error('Event type must be a string.');
      }
      if (!isBoolean(bubbles)) {
        bubbles = true;
      }
      if (!isBoolean(cancelable)) {
        cancelable = true;
      }
      if (!isObject(view)) {
        view = window;
      }
      if (!$.isNumeric(detail)) {
        detail = 2;
      }
      if (!$.isNumeric(screenX)) {
        screenX = 0;
      }
      if (!$.isNumeric(screenY)) {
        screenY = 0;
      }
      if (!$.isNumeric(clientX)) {
        clientX = 0;
      }
      if (!$.isNumeric(clientY)) {
        clientY = 0;
      }
      if (!isBoolean(ctrlKey)) {
        ctrlKey = false;
      }
      if (!isBoolean(altKey)) {
        altKey = false;
      }
      if (!isBoolean(shiftKey)) {
        shiftKey = false;
      }
      if (!isBoolean(metaKey)) {
        metaKey = false;
      }
      if (!$.isNumeric(scale)) {
        scale = 1.0;
      }
      if (!$.isNumeric(rotation)) {
        rotation = 0.0;
      }
      const customEvent = document.createEvent('GestureEvent');
      customEvent.initGestureEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, target, scale, rotation);
      target.dispatchEvent(customEvent);
    };
    const simulateTouchEvent = function(target, type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, touches, targetTouches, changedTouches, scale, rotation) {
      let customEvent;
      if (!target) {
        throw Error('Invalid target.');
      }
      if (isString(type)) {
        type = type.toLowerCase();
        if (!TOUCH_EVENTS[type]) {
          throw Error('Event type \'' + type + '\' not supported.');
        }
      } else {
        throw Error('Event type must be a string.');
      }
      if (type === 'touchstart' || type === 'touchmove') {
        if (touches.length === 0) {
          throw Error('No touch object in touches');
        }
      } else if (type === 'touchend') {
        if (changedTouches.length === 0) {
          throw Error('No touch object in changedTouches');
        }
      }
      if (!isBoolean(bubbles)) {
        bubbles = true;
      }
      if (!isBoolean(cancelable)) {
        cancelable = (type !== 'touchcancel');
      }
      if (!isObject(view)) {
        view = window;
      }
      if (!$.isNumeric(detail)) {
        detail = 1;
      }
      if (!$.isNumeric(screenX)) {
        screenX = 0;
      }
      if (!$.isNumeric(screenY)) {
        screenY = 0;
      }
      if (!$.isNumeric(clientX)) {
        clientX = 0;
      }
      if (!$.isNumeric(clientY)) {
        clientY = 0;
      }
      if (!isBoolean(ctrlKey)) {
        ctrlKey = false;
      }
      if (!isBoolean(altKey)) {
        altKey = false;
      }
      if (!isBoolean(shiftKey)) {
        shiftKey = false;
      }
      if (!isBoolean(metaKey)) {
        metaKey = false;
      }
      if (!$.isNumeric(scale)) {
        scale = 1.0;
      }
      if (!$.isNumeric(rotation)) {
        rotation = 0.0;
      }
      if (UA.android && !UA.chrome) {
        customEvent = document.createEvent('MouseEvents');
        customEvent.initMouseEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, 0, target);
        customEvent.touches = touches || [];
        customEvent.targetTouches = targetTouches || [];
        customEvent.changedTouches = changedTouches || [];
      } else if (UA.ios) {
        if (UA.ios >= 2.0) {
          customEvent = document.createEvent('TouchEvent');
          const createTouchByOptions = function(options) {
            return new window.Touch({
              target: options.target || document.body,
              identifier: options.identifier || $.now(),
              pageX: options.pageX || 0,
              pageY: options.pageY || 0,
              screenX: options.screenX || 0,
              screenY: options.screenY || 0
            });
          };
          const createTouchListByArray = function(array) {
            const result = array || [];
            $.each(result, function(i) {
              result[i] = createTouchByOptions(this);
            });
            return result;
          };
          touches = createTouchListByArray(touches);
          targetTouches = createTouchListByArray(targetTouches);
          changedTouches = createTouchListByArray(changedTouches);
          customEvent = new window.TouchEvent(type, {
            cancelable: cancelable,
            bubbles: bubbles,
            touches: touches,
            targetTouches: targetTouches,
            changedTouches: changedTouches
          });
        } else {
          throw Error('No touch event simulation framework present for iOS, ' + UA.ios + '.');
        }
      } else if (UA.chrome && ('ontouchstart' in window)) {
        customEvent = new window.UIEvent(type, {
          view: view,
          detail: detail,
          bubbles: bubbles,
          cancelable: cancelable,
          target: target
        });
        customEvent.screenX = screenX;
        customEvent.screenY = screenY;
        customEvent.clientX = clientX;
        customEvent.clientY = clientY;
        customEvent.ctrlKey = ctrlKey;
        customEvent.altKey = altKey;
        customEvent.metaKey = metaKey;
        customEvent.shiftKey = shiftKey;
        customEvent.touches = touches || [];
        customEvent.targetTouches = targetTouches || [];
        customEvent.changedTouches = changedTouches || [];
      } else {
        throw Error('Not supported agent yet, ' + UA.userAgent);
      }
      target.dispatchEvent(customEvent);
    };
    return function(target, type, options) {
      options = options || {};
      if (MOUSE_EVENTS[type] || POINTER_EVENTS[type]) {
        simulateMouseEvent(target, type, options.bubbles, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.relatedTarget);
      } else if (KEY_EVENTS[type]) {
        simulateKeyEvent(target, type, options.bubbles, options.cancelable, options.view, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, options.charCode);
      } else if (UI_EVENTS[type]) {
        simulateUIEvent(target, type, options.bubbles, options.cancelable, options.view, options.detail);
      } else if (TOUCH_EVENTS[type]) {
        if ((window && ('ontouchstart' in window)) && !(UA.chrome && UA.chrome < 6)) {
          simulateTouchEvent(target, type, options.bubbles, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.touches, options.targetTouches, options.changedTouches, options.scale, options.rotation);
        } else {
          throw Error('Event \'' + type + '\' can\'t be simulated. Use gesture-simulate module instead.');
        }
      } else if (UA.ios && UA.ios >= 2.0 && GESTURE_EVENTS[type]) {
        simulateGestureEvent(target, type, options.bubbles, options.cancelable, options.view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.scale, options.rotation);
      } else {
        throw Error('Event \'' + type + '\' can\'t be simulated.');
      }
    };
  })();
  const createEvent = function(type, options) {
    if (typeof window.PointerEvent === 'function') {
      return new PointerEvent(type, options);
    }
    const event = document.createEvent('pointerEvent');
    const args = [];
    $.each(['type', 'bubbles', 'cancelable', 'view', 'detail', 'screenX', 'screenY', 'clientX', 'clientY', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey', 'button', 'relatedTarget', 'offsetX', 'offsetY', 'width', 'height', 'pressure', 'rotation', 'tiltX', 'tiltY', 'pointerId', 'pointerType', 'hwTimestamp', 'isPrimary'], function(i, name) {
      if (name in options) {
        args.push(options[name]);
      } else {
        args.push(event[name]);
      }
    });
    event.initPointerEvent.apply(event, args);
    return event;
  };
  const simulatePointerEvent = function($element, type, options) {
    options = $.extend({
      bubbles: true,
      cancelable: true,
      type: type
    }, options);
    const event = createEvent(type, options);
    $element[0].dispatchEvent(event);
  };
  const result = function($element) {
    $element = $($element);
    let _x;
    let _y;
    let _scrollTop;
    let _scrollLeft;
    let _clock;
    const createTouchMock = function(options) {
      options = $.extend({
        view: window,
        target: null,
        identifier: $.now(),
        pageX: null,
        pageY: null,
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        radiusX: null,
        radiusY: null,
        rotationAngle: null,
        force: null
      }, options);
      return options;
    };
    const createTouchEventMock = function(options) {
      options = $.extend({
        type: '',
        view: window,
        target: null,
        identifier: null,
        pageX: null,
        pageY: null,
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        radiusX: null,
        radiusY: null,
        rotationAngle: null,
        force: null,
        cancelable: true,
        touches: [],
        targetTouches: [],
        changedTouches: [],
        scale: 1,
        rotation: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        detail: 0
      }, options);
      return options;
    };
    const createMouseEventMock = function(options) {
      options = $.extend({
        type: null,
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 0,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: null
      }, options);
      return options;
    };
    const originalEvent = function(options) {
      let event;
      if (/(click|mouse|wheel|pointer)/i.test(options.type)) {
        event = createMouseEventMock(options);
      }
      if (/(touch)/i.test(options.type)) {
        event = createTouchEventMock(options);
      }
      return event;
    };
    const eventMock = function(type, options) {
      options = $.extend({
        type: type,
        target: $element.get(0)
      }, options);
      if (type.indexOf('touch') > -1) {
        const touch = createTouchMock(options);
        options = $.extend({
          touches: type === 'touchend' ? [] : [touch],
          changedTouches: [touch],
          targetTouches: type === 'touchend' ? [] : [touch]
        }, options);
      }
      if (type.indexOf('pointer') > -1) {
        options = $.extend({pointerType: 'mouse'}, options);
      }
      let event = $.extend($.Event(options.type), originalEvent(options), options);
      event[$.expando] = false;
      event.isTrusted = false;
      event = $.event.fix(event);
      return event;
    };
    const createEvent = function(type, args) {
      return eventMock(type, $.extend({
        pageX: _x,
        pageY: _y,
        timeStamp: _clock,
        type: type,
        which: 1,
        target: $element.get(0)
      }, args));
    };
    const triggerEvent = function(type, args) {
      const event = createEvent(type, args);
      $element.trigger(event);
      return event;
    };
    return {
      eventMock: eventMock,
      simulateEvent: simulateEvent,
      start: function() {
        _x = 0;
        _y = 0;
        _scrollTop = 0;
        _scrollLeft = 0;
        _clock = $.now();
        return this;
      },
      touchStart: function() {
        triggerEvent('touchstart');
        return this;
      },
      touchMove: function(deltaX, deltaY) {
        _x += deltaX || 0;
        _y += deltaY || 0;
        triggerEvent('touchmove');
        return this;
      },
      touchEnd: function() {
        triggerEvent('touchend');
        return this;
      },
      touchCancel: function() {
        triggerEvent('touchcancel');
        return this;
      },
      pointerDown: function() {
        const eventName = 'pointerdown';
        try {
          simulatePointerEvent($element, eventName, {
            clientX: _x,
            clientY: _y,
            pointerType: 'mouse',
            pointerId: 1
          });
        } catch (e) {
          triggerEvent(eventName, {pointerType: 'mouse'});
        }
        return this;
      },
      pointerMove: function(deltaX, deltaY) {
        const eventName = 'pointermove';
        _x += deltaX || 0;
        _y += deltaY || 0;
        try {
          simulatePointerEvent($element, eventName, {
            clientX: _x,
            clientY: _y,
            pointerType: 'mouse',
            pointerId: 1
          });
        } catch (e) {
          triggerEvent(eventName, {pointerType: 'mouse'});
        }
        return this;
      },
      pointerUp: function() {
        const eventName = 'pointerup';
        try {
          simulatePointerEvent($element, eventName, {
            clientX: _x,
            clientY: _y,
            pointerType: 'mouse',
            pointerId: 1
          });
        } catch (e) {
          triggerEvent(eventName, {pointerType: 'mouse'});
        }
        return this;
      },
      pointerCancel: function() {
        const eventName = 'pointercancel';
        try {
          simulatePointerEvent($element, eventName, {
            clientX: _x,
            clientY: _y,
            pointerType: 'mouse',
            pointerId: 1
          });
        } catch (e) {
          triggerEvent(eventName, {pointerType: 'mouse'});
        }
        return this;
      },
      mouseDown: function() {
        triggerEvent('mousedown');
        return this;
      },
      mouseMove: function(deltaX, deltaY) {
        _x += deltaX || 0;
        _y += deltaY || 0;
        triggerEvent('mousemove');
        return this;
      },
      mouseUp: function() {
        triggerEvent('mouseup');
        return this;
      },
      mouseOver: function() {
        triggerEvent('mouseover');
        return this;
      },
      mouseOut: function() {
        triggerEvent('mouseout');
        return this;
      },
      mouseEnter: function() {
        triggerEvent('mouseenter');
        return this;
      },
      mouseLeave: function() {
        triggerEvent('mouseleave');
        return this;
      },
      down: function(x, y) {
        _x = x || _x;
        _y = y || _y;
        this.touchStart();
        this.mouseDown();
        return this;
      },
      move: function(x, y) {
        if ($.isArray(x)) {
          this.move.apply(this, x);
        } else {
          this.touchMove(x, y);
          this.mouseMove();
        }
        return this;
      },
      up: function() {
        this.touchEnd();
        this.mouseUp();
        this.click(true);
        return this;
      },
      scroll: function(x, y) {
        _scrollLeft += x;
        _scrollTop += y;
        $element.scrollLeft(_scrollLeft).scrollTop(_scrollTop);
        return this;
      },
      click: function(clickOnly) {
        if (!clickOnly) {
          this.down();
          this.up();
        } else {
          triggerEvent('click');
        }
        return this;
      },
      wheel: function(d, args) {
        triggerEvent('wheel', $.extend({
          deltaY: -d,
          deltaMode: 0
        }, args));
        triggerEvent('scroll');
        return this;
      },
      wait: function(ms) {
        _clock += ms;
        return this;
      }
    };
  };
  result.simulateEvent = simulateEvent;
  return result;
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=nativePointerMock.js.map