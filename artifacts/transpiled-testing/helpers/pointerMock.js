!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/pointerMock.js"], ["jquery","inferno","events/gesture/emitter.gesture","events/click"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/helpers/pointerMock.js", ["require", "exports", "module", "jquery", "inferno", "events/gesture/emitter.gesture", "events/click"], function(require, exports, module) {
      root.pointerMock = module.exports = factory(require('jquery'), require('inferno'), require('events/gesture/emitter.gesture'), require('events/click'));
    });
  } else {
    root.pointerMock = factory(jQuery, DevExpress.events.GestureEmitter, DevExpress.events.click);
  }
}(window, function($, inferno, GestureEmitter, clickEvent) {
  GestureEmitter.touchBoundary(0);
  return function($element) {
    $element = $($element);
    let _x;
    let _y;
    let _scrollTop;
    let _scrollLeft;
    let _clock;
    let _shiftKey;
    let _cancelable;
    let _pointerType = 'mouse';
    let _lastEvent;
    const triggerEvent = function(type, args) {
      const event = $.Event($.extend($.Event(type), {timeStamp: _clock}), $.extend({
        timeStamp: _clock,
        pageX: _x,
        pageY: _y,
        which: 1,
        shiftKey: _shiftKey,
        cancelable: _cancelable,
        target: $element.get(0),
        pointerType: _pointerType,
        pointers: []
      }, args));
      $(event.delegatedTarget || event.target).trigger(event);
      _lastEvent = event;
      return event;
    };
    return {
      start: function(params) {
        if ($.isPlainObject(params)) {
          _x = params.x;
          _y = params.y;
          _scrollTop = params.scrollTop || 0;
          _scrollLeft = params.scrollLeft || 0;
          _clock = params.clock || $.now();
          _shiftKey = params.shiftKey || false;
          _cancelable = params.cancelable;
          _pointerType = params.pointerType || _pointerType;
        } else {
          _x = 0;
          _y = 0;
          _scrollTop = 0;
          _scrollLeft = 0;
          _clock = $.now();
          _shiftKey = false;
          _pointerType = params || _pointerType;
        }
        return this;
      },
      down: function(x, y) {
        _x = x || _x;
        _y = y || _y;
        triggerEvent('dxpointerdown', {pointers: [{pointerId: 1}]});
        return this;
      },
      move: function(x, y) {
        if ($.isArray(x)) {
          this.move.apply(this, x);
        } else {
          _x += x || 0;
          _y += y || 0;
          triggerEvent('dxpointermove', {pointers: [{pointerId: 1}]});
        }
        inferno.rerender();
        return this;
      },
      up: function() {
        let requestAnimationFrameCallback = function() {};
        if (clickEvent.misc) {
          clickEvent.misc.requestAnimationFrame = function(callback) {
            requestAnimationFrameCallback = callback;
          };
        }
        triggerEvent('dxpointerup');
        requestAnimationFrameCallback();
        this.nativeClick();
        inferno.rerender();
        return this;
      },
      cancel: function() {
        triggerEvent('dxpointercancel');
        return this;
      },
      click: function(clickOnly) {
        if (!clickOnly) {
          this.down();
          this.up();
        } else {
          triggerEvent('dxclick');
        }
        return this;
      },
      nativeClick: function() {
        triggerEvent('click');
      },
      wheel: function(d, args) {
        triggerEvent('dxmousewheel', $.extend({delta: d}, args));
        triggerEvent('scroll');
        inferno.rerender();
        return this;
      },
      scroll: function(x, y) {
        _scrollLeft += x;
        _scrollTop += y;
        $element.scrollLeft(_scrollLeft).scrollTop(_scrollTop);
        return this;
      },
      wait: function(ms) {
        _clock += ms;
        return this;
      },
      swipeStart: function() {
        triggerEvent('dxswipestart');
        return this;
      },
      swipe: function(offset) {
        triggerEvent('dxswipe', {offset: offset});
        return this;
      },
      swipeEnd: function(targetOffset, offset) {
        triggerEvent('dxswipeend', {
          offset: offset,
          targetOffset: targetOffset
        });
        return this;
      },
      dragStart: function(args) {
        triggerEvent('dxdragstart', args);
        return this;
      },
      drag: function(x, y) {
        _x += x || 0;
        _y += y || 0;
        triggerEvent('dxdrag', {offset: {
            x: _x,
            y: _y
          }});
        return this;
      },
      dragEnd: function() {
        triggerEvent('dxdragend', {offset: {
            x: _x,
            y: _y
          }});
        return this;
      },
      lastEvent: function() {
        return _lastEvent;
      },
      active: function(target) {
        triggerEvent('dxactive', {delegatedTarget: $(target).get(0)});
        return this;
      },
      inactive: function(target) {
        triggerEvent('dxinactive', {delegatedTarget: $(target).get(0)});
        return this;
      }
    };
  };
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","inferno","events/gesture/emitter.gesture","events/click"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("inferno"), require("events/gesture/emitter.gesture"), require("events/click"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pointerMock.js.map