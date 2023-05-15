!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.resize_callbacks.tests.js"], ["core/utils/resize_callbacks","core/dom_adapter","core/utils/window"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.resize_callbacks.tests.js", ["core/utils/resize_callbacks", "core/dom_adapter", "core/utils/window"], function($__export) {
  "use strict";
  var resizeCallbacks,
      domAdapter,
      windowUtils;
  return {
    setters: [function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }],
    execute: function() {
      QUnit.module('resizeCallbacks', {
        beforeEach: function() {
          var test = this;
          var fakeWindow = {
            innerHeight: 300,
            innerWidth: 400
          };
          fakeWindow.window = fakeWindow;
          test.fakeWindow = fakeWindow;
          windowUtils.setWindow(fakeWindow, true);
          test.__originalListener = domAdapter.listen;
          var resizeHandlers = [];
          domAdapter.listen = function(element, event, handler) {
            if (element.window === element && event === 'resize') {
              resizeHandlers.push(handler);
            }
          };
          this.callbacks = resizeCallbacks;
          this.triggerResize = function() {
            if (!arguments.length || arguments[0]) {
              ++fakeWindow.innerWidth;
              ++fakeWindow.innerHeight;
            }
            resizeHandlers.forEach(function(handler) {
              handler();
            });
          };
          this.callbacks.add(function() {});
          this.triggerResize();
        },
        afterEach: function() {
          windowUtils.setWindow(window);
          domAdapter.listen = this.__originalListener;
          delete this.__originalListener;
          delete this.fakeWindow;
          delete this.callbacks;
          this.triggerResize();
          delete this.triggerResize;
        }
      });
      QUnit.test('Callback is called on window resize', function(assert) {
        var called = false;
        this.callbacks.add(function() {
          called = true;
        });
        this.triggerResize();
        assert.ok(called, 'callback is called');
      });
      QUnit.test('Callback is called for each resize for multiple resizes', function(assert) {
        var callCount = 0;
        this.callbacks.add(function() {
          ++callCount;
        });
        this.triggerResize();
        this.triggerResize();
        this.triggerResize();
        assert.strictEqual(callCount, 3, 'callback is called 3 times');
      });
      QUnit.test('Callback is not called if size is not changed', function(assert) {
        var called = false;
        this.callbacks.add(function() {
          called = true;
        });
        this.triggerResize(false);
        assert.ok(!called, 'callback is not called');
      });
      QUnit.test('Callback is called if window innerHeight is changed (T834502)', function(assert) {
        var spy = sinon.spy();
        this.callbacks.add(spy);
        try {
          sinon.stub(windowUtils, 'getWindow').returns({
            innerHeight: 100,
            innerWidth: 200
          });
          this.triggerResize(false);
          assert.strictEqual(spy.callCount, 1, 'callback is called');
        } finally {
          windowUtils.getWindow.restore();
          this.callbacks.remove(spy);
        }
      });
      QUnit.test('add', function(assert) {
        var called1 = false;
        var called2 = false;
        var called3 = false;
        this.callbacks.add(function() {
          called1 = true;
        }).add(function() {
          called2 = true;
        }).add(function() {
          called3 = true;
        });
        this.triggerResize();
        assert.ok(called1, 'callback1 is called');
        assert.ok(called2, 'callback2 is called');
        assert.ok(called3, 'callback3 is called');
      });
      QUnit.test('remove', function(assert) {
        var callCount1 = 0;
        var callCount2 = 0;
        var callback1 = function() {
          ++callCount1;
        };
        var callback2 = function() {
          ++callCount2;
        };
        this.callbacks.add(callback1).add(callback2);
        this.triggerResize();
        this.callbacks.remove(callback1);
        this.triggerResize();
        assert.strictEqual(callCount1, 1, 'callback1 is called 1 time');
        assert.strictEqual(callCount2, 2, 'callback2 is called 2 times');
      });
      QUnit.test('has', function(assert) {
        var callback1 = function() {};
        var callback2 = function() {};
        this.callbacks.add(callback1).add(callback2);
        assert.ok(this.callbacks.has(callback1), 'has callback1');
        assert.ok(this.callbacks.has(callback2), 'has callback2');
        this.callbacks.remove(callback1);
        assert.ok(!this.callbacks.has(callback1), 'does not have callback1');
        assert.ok(this.callbacks.has(callback2), 'has callback2');
        this.callbacks.remove(callback2);
        assert.ok(!this.callbacks.has(callback1), 'does not have callback1');
        assert.ok(!this.callbacks.has(callback2), 'does not have callback2');
      });
      QUnit.test('add - one callback several times', function(assert) {
        var callCount = 0;
        var callback = function() {
          ++callCount;
        };
        this.callbacks.add(callback).add(callback).add(callback);
        this.triggerResize();
        assert.strictEqual(callCount, 3, 'callback is called 3 times');
      });
      QUnit.test('remove - one callback several times', function(assert) {
        var callCount = 0;
        var callback = function() {
          ++callCount;
        };
        this.callbacks.add(callback);
        this.callbacks.remove(callback).remove(callback).remove(callback);
        this.triggerResize();
        assert.strictEqual(callCount, 0, 'callback is not called');
      });
      QUnit.test('callbacks should be fired with changed dimensions', function(assert) {
        var callback = sinon.spy();
        this.callbacks.add(callback);
        callback.reset();
        this.fakeWindow.innerWidth = 500;
        this.triggerResize(false);
        assert.ok(callback.calledWith('width'), 'callback is called for width only');
        callback.reset();
        this.fakeWindow.innerHeight = 500;
        this.triggerResize(false);
        assert.ok(callback.calledWith('height'), 'callback is called for height only');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/resize_callbacks","core/dom_adapter","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/resize_callbacks"), require("core/dom_adapter"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.resize_callbacks.tests.js.map