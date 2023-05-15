!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/range_selector/tracker.js"], ["../../events/core/events_engine","../../events/pointer","../../core/utils/window","../../core/dom_adapter","../../core/utils/iterator","../../core/utils/support"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/range_selector/tracker.js", ["../../events/core/events_engine", "../../events/pointer", "../../core/utils/window", "../../core/dom_adapter", "../../core/utils/iterator", "../../core/utils/support"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Tracker = Tracker;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _window = $__require("../../core/utils/window");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _iterator = $__require("../../core/utils/iterator");
  var _support = $__require("../../core/utils/support");
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var MIN_MANUAL_SELECTING_WIDTH = 10;
  var window = (0, _window.getWindow)();
  function isLeftButtonPressed(event) {
    var e = event || window.event;
    var originalEvent = e.originalEvent;
    var touches = e.touches;
    var pointerType = originalEvent ? originalEvent.pointerType : false;
    var eventTouches = originalEvent ? originalEvent.touches : false;
    var isMSPointerLeftClick = originalEvent && pointerType !== undefined && (pointerType === (originalEvent.MSPOINTER_TYPE_TOUCH || 'touch') || pointerType === (originalEvent.MSPOINTER_TYPE_MOUSE || 'mouse') && originalEvent.buttons === 1);
    var isTouches = touches && touches.length > 0 || eventTouches && eventTouches.length > 0;
    return e.which === 1 || isMSPointerLeftClick || isTouches;
  }
  function isMultiTouches(event) {
    var originalEvent = event.originalEvent;
    var touches = event.touches;
    var eventTouches = originalEvent && originalEvent.touches;
    return touches && touches.length > 1 || eventTouches && eventTouches.length > 1 || null;
  }
  function preventDefault(e) {
    if (!isMultiTouches(e)) {
      e.preventDefault();
    }
  }
  function stopPropagationAndPreventDefault(e) {
    if (!isMultiTouches(e)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  // Q375042
  function isTouchEventArgs(e) {
    return e && e.type && e.type.indexOf('touch') === 0;
  }
  function getEventPageX(event) {
    var originalEvent = event.originalEvent;
    var result = 0;
    if (event.pageX) {
      result = event.pageX;
    } else if (originalEvent && originalEvent.pageX) {
      result = originalEvent.pageX;
    }
    if (originalEvent && originalEvent.touches) {
      if (originalEvent.touches.length > 0) {
        result = originalEvent.touches[0].pageX;
      } else if (originalEvent.changedTouches.length > 0) {
        result = originalEvent.changedTouches[0].pageX;
      }
    }
    return result;
  }
  function initializeAreaEvents(controller, area, state, getRootOffsetLeft) {
    var _docEvents;
    var isTouchEvent;
    var isActive = false;
    var initialPosition;
    var movingHandler = null;
    var docEvents = (_docEvents = {}, _defineProperty(_docEvents, _pointer.default.move, function (e) {
      var position;
      var offset;
      if (isTouchEvent !== isTouchEventArgs(e)) return;
      if (!isLeftButtonPressed(e)) {
        cancel(e);
      }
      if (isActive) {
        position = getEventPageX(e);
        offset = getRootOffsetLeft();
        if (movingHandler) {
          movingHandler(position - offset, e);
        } else {
          if (state.manualRangeSelectionEnabled && Math.abs(initialPosition - position) >= MIN_MANUAL_SELECTING_WIDTH) {
            movingHandler = controller.placeSliderAndBeginMoving(initialPosition - offset, position - offset, e);
          }
        }
      }
    }), _defineProperty(_docEvents, _pointer.default.up, function (e) {
      var position;
      if (isActive) {
        position = getEventPageX(e);
        if (!movingHandler && state.moveSelectedRangeByClick && Math.abs(initialPosition - position) < MIN_MANUAL_SELECTING_WIDTH) {
          controller.moveSelectedArea(position - getRootOffsetLeft(), e);
        }
        cancel(e);
      }
    }), _docEvents);
    function cancel(e) {
      if (isActive) {
        isActive = false;
        if (movingHandler) {
          movingHandler.complete(e);
          movingHandler = null;
        }
      }
    }
    area.on(_pointer.default.down, function (e) {
      if (!state.enabled || !isLeftButtonPressed(e) || isActive) return;
      isActive = true;
      isTouchEvent = isTouchEventArgs(e);
      initialPosition = getEventPageX(e);
    });
    return docEvents;
  }
  function initializeSelectedAreaEvents(controller, area, state, getRootOffsetLeft) {
    var _docEvents2;
    var isTouchEvent;
    var isActive = false;
    var movingHandler = null;
    var docEvents = (_docEvents2 = {}, _defineProperty(_docEvents2, _pointer.default.move, function (e) {
      if (isTouchEvent !== isTouchEventArgs(e)) return;
      if (!isLeftButtonPressed(e)) {
        cancel(e);
      }
      if (isActive) {
        preventDefault(e);
        movingHandler(getEventPageX(e) - getRootOffsetLeft(), e);
      }
    }), _defineProperty(_docEvents2, _pointer.default.up, cancel), _docEvents2);
    function cancel(e) {
      if (isActive) {
        isActive = false;
        movingHandler.complete(e);
        movingHandler = null;
      }
    }
    area.on(_pointer.default.down, function (e) {
      if (!state.enabled || !isLeftButtonPressed(e) || isActive) return;
      isActive = true;
      isTouchEvent = isTouchEventArgs(e);
      movingHandler = controller.beginSelectedAreaMoving(getEventPageX(e) - getRootOffsetLeft());
      stopPropagationAndPreventDefault(e);
    });
    return docEvents;
  }
  function initializeSliderEvents(controller, sliders, state, getRootOffsetLeft) {
    var _docEvents3;
    var isTouchEvent;
    var isActive = false;
    var movingHandler = null;
    var docEvents = (_docEvents3 = {}, _defineProperty(_docEvents3, _pointer.default.move, function (e) {
      if (isTouchEvent !== isTouchEventArgs(e)) return;
      if (!isLeftButtonPressed(e)) {
        cancel(e);
      }
      if (isActive) {
        preventDefault(e);
        movingHandler(getEventPageX(e) - getRootOffsetLeft(), e);
      }
    }), _defineProperty(_docEvents3, _pointer.default.up, cancel), _docEvents3);
    (0, _iterator.each)(sliders, function (i, slider) {
      var _slider$on;
      slider.on((_slider$on = {}, _defineProperty(_slider$on, _pointer.default.down, function (e) {
        if (!state.enabled || !isLeftButtonPressed(e) || isActive) return;
        isActive = true;
        isTouchEvent = isTouchEventArgs(e);
        movingHandler = controller.beginSliderMoving(i, getEventPageX(e) - getRootOffsetLeft());
        stopPropagationAndPreventDefault(e);
      }), _defineProperty(_slider$on, _pointer.default.move, function () {
        if (!movingHandler) {
          controller.foregroundSlider(i);
        }
      }), _slider$on));
    });
    function cancel(e) {
      if (isActive) {
        isActive = false;
        movingHandler.complete(e);
        movingHandler = null;
      }
    }
    return docEvents;
  }
  function Tracker(params) {
    var state = this._state = {};
    var targets = params.controller.getTrackerTargets();
    if (_support.pointerEvents) {
      params.renderer.root.css({
        'msTouchAction': 'pinch-zoom'
      });
    }
    this._docEvents = [initializeSelectedAreaEvents(params.controller, targets.selectedArea, state, getRootOffsetLeft), initializeAreaEvents(params.controller, targets.area, state, getRootOffsetLeft), initializeSliderEvents(params.controller, targets.sliders, state, getRootOffsetLeft)];
    // TODO: 3 "move" and 3 "end" events - do we really need that much?
    (0, _iterator.each)(this._docEvents, function (_, events) {
      _events_engine.default.on(_dom_adapter.default.getDocument(), events);
    });
    function getRootOffsetLeft() {
      return params.renderer.getRootOffset().left;
    }
  }
  Tracker.prototype = {
    constructor: Tracker,
    dispose: function dispose() {
      (0, _iterator.each)(this._docEvents, function (_, events) {
        _events_engine.default.off(_dom_adapter.default.getDocument(), events);
      });
    },
    update: function update(enabled, behavior) {
      var state = this._state;
      state.enabled = enabled;
      state.moveSelectedRangeByClick = behavior.moveSelectedRangeByClick;
      state.manualRangeSelectionEnabled = behavior.manualRangeSelectionEnabled;
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../events/pointer","../../core/utils/window","../../core/dom_adapter","../../core/utils/iterator","../../core/utils/support"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../events/pointer"), require("../../core/utils/window"), require("../../core/dom_adapter"), require("../../core/utils/iterator"), require("../../core/utils/support"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tracker.js.map