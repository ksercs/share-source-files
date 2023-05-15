!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.utils/utils.support.tests.js"], ["core/utils/support"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.utils/utils.support.tests.js", ["core/utils/support"], function($__export) {
  "use strict";
  var detectTouchEvents,
      detectPointerEvent,
      createHasPropertyMock;
  return {
    setters: [function($__m) {
      detectTouchEvents = $__m.detectTouchEvents;
      detectPointerEvent = $__m.detectPointerEvent;
    }],
    execute: function() {
      createHasPropertyMock = function() {
        for (var properties = [],
            $__1 = 0; $__1 < arguments.length; $__1++)
          properties[$__1] = arguments[$__1];
        return function(name) {
          return properties.indexOf(name) > -1;
        };
      };
      QUnit.module('Touch events detection', function() {
        QUnit.test('touch = true when \'ontouchstart\' exists and \'maxTouchPoints\' > 0 (e.g. Chrome 70+ w/ touch monitor)', function(assert) {
          var hasWindowProperty = createHasPropertyMock();
          assert.ok(detectTouchEvents(hasWindowProperty, 2), 'touch events are detected');
        });
        QUnit.test('touch = true when window has \'ontouchstart\' property (e.g. mobile devices, Chrome 69- w/ touch display)', function(assert) {
          var hasWindowProperty = createHasPropertyMock('ontouchstart');
          assert.ok(detectTouchEvents(hasWindowProperty, 2), 'touch events are detected');
        });
        QUnit.test('touch = false when callPhantom is defined (PhantomJS)', function(assert) {
          var hasWindowProperty = createHasPropertyMock('ontouchstart', 'callPhantom');
          assert.notOk(detectTouchEvents(hasWindowProperty, 2), 'touch events are not detected');
        });
        QUnit.test('touch = false when \'ontouchstart\' not exists and \'maxTouchPoints\' = 0 (e.g. non-touch display)', function(assert) {
          var hasWindowProperty = createHasPropertyMock();
          assert.notOk(detectTouchEvents(hasWindowProperty, 0), 'touch events are not detected');
        });
      });
      QUnit.module('Pointer event detection', function() {
        QUnit.test('pointerEvent defined when \'PointerEvent\' exists (Surface pro, edge 17+, latest IE11)', function(assert) {
          var hasWindowProperty = createHasPropertyMock('PointerEvent');
          assert.ok(detectPointerEvent(hasWindowProperty), 'PointerEvent detected');
        });
        QUnit.test('pointerEvent = false when \'PointerEvent\' not exists', function(assert) {
          var hasWindowProperty = createHasPropertyMock();
          assert.notOk(detectPointerEvent(hasWindowProperty), 'PointerEvent isn\'t detected');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/support"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/support"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.support.tests.js.map