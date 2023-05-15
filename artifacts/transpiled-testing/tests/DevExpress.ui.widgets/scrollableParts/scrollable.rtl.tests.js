!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.rtl.tests.js"], ["animation/frame","generic_light.css!","events/visibility_change","jquery","ui/scroll_view/ui.scrollable","./scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.rtl.tests.js", ["animation/frame", "generic_light.css!", "events/visibility_change", "jquery", "ui/scroll_view/ui.scrollable", "./scrollable.constants.js"], function($__export) {
  "use strict";
  var animationFrame,
      triggerShownEvent,
      $,
      Scrollable,
      RTL_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {}, function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {
      RTL_CLASS = $__m.RTL_CLASS;
    }],
    execute: function() {
      moduleConfig = {
        beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollableVary {\n                    height: auto;\n                }\n                .content1, .content3 {\n                    height: 100px; width: 100px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>\n            <div id=\"scrollableVary\">\n                <div class=\"content3\"></div>\n            </div>";
          $('#qunit-fixture').html(markup);
          this.clock = sinon.useFakeTimers();
          this._originalRequestAnimationFrame = animationFrame.requestAnimationFrame;
          animationFrame.requestAnimationFrame = function(callback) {
            callback();
          };
        },
        afterEach: function() {
          this.clock.restore();
          animationFrame.requestAnimationFrame = this._originalRequestAnimationFrame;
        }
      };
      QUnit.module('rtl', moduleConfig);
      QUnit.test('option \'rtl\'', function(assert) {
        var $element = $('#scrollable');
        new Scrollable($element);
        var instance = Scrollable.getInstance($element);
        assert.ok(!$element.hasClass(RTL_CLASS));
        instance.option('rtlEnabled', true);
        assert.ok($element.hasClass(RTL_CLASS));
      });
      QUnit.test('rtlEnabled scrolls to very right position', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          direction: 'horizontal',
          rtlEnabled: true,
          useNative: false
        });
        var scrollable = $scrollable.dxScrollable('instance');
        var veryRightPosition = $(scrollable.content()).width() - $scrollable.width();
        assert.equal(scrollable.scrollLeft(), veryRightPosition, 'scrolled to very right position');
      });
      QUnit.test('rtlEnabled scrolls to very right position after changing the size of the scrollable (T544872)', function(assert) {
        var $scrollable = $('#scrollableVary').dxScrollable({
          direction: 'horizontal',
          rtlEnabled: true,
          width: 50,
          height: 50,
          useNative: false
        });
        var scrollable = $scrollable.dxScrollable('instance');
        var veryRightPosition = $(scrollable.content()).width() - $scrollable.width();
        assert.equal(scrollable.scrollLeft(), veryRightPosition, 'scrolled to very right position');
      });
      QUnit.test('rtlEnabled scrolls to very right position after shown event', function(assert) {
        this.clock.restore();
        var done = assert.async();
        var $scrollable = $('#scrollable');
        var $wrapper = $scrollable.wrap('<div>').parent().hide();
        $scrollable.dxScrollable({
          direction: 'horizontal',
          rtlEnabled: true,
          useNative: false
        });
        $wrapper.show();
        triggerShownEvent($wrapper);
        setTimeout(function() {
          var scrollable = $scrollable.dxScrollable('instance');
          var veryRightPosition = $(scrollable.content()).width() - $scrollable.width();
          assert.equal(scrollable.scrollLeft(), veryRightPosition, 'scrolled to very right position');
          done();
        });
      });
      QUnit.test('init option \'rtl\' is true', function(assert) {
        var $element = $('#scrollable').dxScrollable({rtlEnabled: true});
        var instance = $element.dxScrollable('instance');
        assert.ok($element.hasClass(RTL_CLASS));
        instance.option('rtlEnabled', false);
        assert.ok(!$element.hasClass(RTL_CLASS));
      });
      QUnit.test('rtlEnabled scrolls to very right position when a width was changing via API', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({
          direction: 'horizontal',
          rtlEnabled: true,
          useNative: true
        });
        var scrollable = $scrollable.dxScrollable('instance');
        scrollable.option('width', 50);
        var veryRightPosition = $(scrollable.content()).width() - $scrollable.width();
        assert.equal(scrollable.scrollLeft(), veryRightPosition, 'scrolled to very right position');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/frame","generic_light.css!","events/visibility_change","jquery","ui/scroll_view/ui.scrollable","./scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/frame"), require("generic_light.css!"), require("events/visibility_change"), require("jquery"), require("ui/scroll_view/ui.scrollable"), require("./scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.rtl.tests.js.map