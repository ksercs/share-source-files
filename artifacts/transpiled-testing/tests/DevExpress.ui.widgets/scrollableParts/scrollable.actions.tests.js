!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.actions.tests.js"], ["jquery","core/utils/common","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","../../../helpers/pointerMock.js","generic_light.css!","./scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollableParts/scrollable.actions.tests.js", ["jquery", "core/utils/common", "renovation/ui/scroll_view/utils/get_translate_values", "animation/frame", "../../../helpers/pointerMock.js", "generic_light.css!", "./scrollable.constants.js"], function($__export) {
  "use strict";
  var $,
      noop,
      getTranslateValues,
      animationFrame,
      pointerMock,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_WRAPPER_CLASS,
      SCROLLABLE_CONTENT_CLASS,
      moduleConfig,
      getScrollOffset;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      getTranslateValues = $__m.getTranslateValues;
    }, function($__m) {
      animationFrame = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}, function($__m) {
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_WRAPPER_CLASS = $__m.SCROLLABLE_WRAPPER_CLASS;
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
    }],
    execute: function() {
      moduleConfig = {
        beforeEach: function() {
          var markup = "\n            <style nonce=\"qunit-test\">\n                #scrollable {\n                    height: 50px;\n                    width: 50px;\n                }\n                #scrollable .content1 {\n                    height: 100px;\n                    width: 100px;\n                }\n            </style>\n            <div id=\"scrollable\">\n                <div class=\"content1\"></div>\n                <div class=\"content2\"></div>\n            </div>\n            <div id=\"scrollableNeighbour\"></div>";
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
      getScrollOffset = function($scrollable) {
        var $content = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
        var $container = $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS);
        var location = getTranslateValues($content.get(0));
        return {
          top: location.top - $container.scrollTop(),
          left: location.left - $container.scrollLeft()
        };
      };
      QUnit.module('actions', moduleConfig);
      QUnit.test('start action not fired after creation', function(assert) {
        var started = 0;
        $('#scrollable').dxScrollable({
          useNative: false,
          onStart: function() {
            started++;
          }
        });
        assert.equal(started, 0, 'scroll was not started');
      });
      QUnit.test('start action fired once after several moves', function(assert) {
        var started = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onStart: function() {
            started++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, 1).move(0, 1).up();
        assert.equal(started, 1, 'scroll started once');
      });
      QUnit.test('scroll action fired on every move', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onScroll: function() {
            scrolled++;
          },
          inertiaEnabled: false
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, -1).move(0, -1).move(0, -1).up();
        assert.equal(scrolled, 3, 'scroll action fired three times');
      });
      QUnit.test('scroll action fired on every content move during inertia', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onScroll: function() {
            scrolled++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().wait(10).move(0, -1).up();
        assert.ok(scrolled > 1, 'scroll action fired during inertia');
      });
      QUnit.test('scroll action does not fire when location was not changed', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          bounceEnabled: false,
          onScroll: function() {
            scrolled++;
          },
          inertiaEnabled: false
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, 1).move(0, 0).up();
        assert.equal(scrolled, 0, 'scroll was not fired');
      });
      QUnit.test('end action fired on scroll end', function(assert) {
        var end = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          inertiaEnabled: false,
          onEnd: function() {
            end++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, -1).up();
        assert.equal(end, 1, 'end action fired once');
      });
      QUnit.test('end action isn\'t fired without move', function(assert) {
        var end = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onEnd: function() {
            end++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().up();
        assert.equal(end, 0, 'end action wasn\'t fired');
      });
      ['vertical', 'horizontal', 'both'].forEach(function(direction) {
        [{left: 50}, {top: 50}, {
          top: 50,
          left: 50
        }, 50].forEach(function(scrollToValue) {
          QUnit.test(("fire onEnd action after scrollTo: " + JSON.stringify(scrollToValue) + ", direction: " + direction), function(assert) {
            var onEndHandler = sinon.spy();
            var scrollable = $('#scrollable').dxScrollable({
              direction: direction,
              useNative: false,
              onEnd: onEndHandler
            }).dxScrollable('instance');
            scrollable.scrollTo(scrollToValue);
            assert.strictEqual(onEndHandler.callCount, 1, 'end action fired');
          });
        });
      });
      QUnit.test('set actions by option', function(assert) {
        var start = 0;
        var scroll = 0;
        var end = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          inertiaEnabled: false
        });
        var instance = $scrollable.dxScrollable('instance');
        instance.option('onStart', function(assert) {
          start++;
        });
        instance.option('onScroll', function(assert) {
          scroll++;
        });
        instance.option('onEnd', function(assert) {
          end++;
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, -1).up();
        assert.equal(start, 1, 'start action fired');
        assert.equal(scroll, 1, 'scroll action fired');
        assert.equal(end, 1, 'end action fired');
      });
      QUnit.test('start not fired if event outside the scrollable', function(assert) {
        var started = 0;
        var scrolled = 0;
        var ended = 0;
        $('#scrollable').dxScrollable({
          useNative: false,
          onStart: function() {
            started++;
          },
          onScroll: function() {
            scrolled++;
          },
          onEnd: function() {
            ended++;
          }
        });
        pointerMock($('#scrollableNeighbour')).start().down().move(0, -1).up();
        assert.equal(started, 0, 'start action not fired');
        assert.equal(scrolled, 0, 'scroll action not fired');
        assert.equal(ended, 0, 'end action not fired');
      });
      QUnit.test('scroll not fired without start', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onScroll: function() {
            scrolled++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().move(0, -1);
        assert.equal(scrolled, 0, 'scroll action not fired');
      });
      QUnit.test('scroll not fired when start on another element', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          onScroll: function() {
            scrolled++;
          }
        });
        pointerMock($('#scrollableNeighbour')).start().down();
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().move(0, -1);
        assert.equal(scrolled, 0, 'scroll action not fired');
      });
      QUnit.test('scroll isn\'t fired when moving after finish of previous scrolling', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          useNative: false,
          inertiaEnabled: false,
          onScroll: function() {
            scrolled++;
          }
        });
        pointerMock($scrollable.find('.' + SCROLLABLE_CONTENT_CLASS)).start().down().move(0, -1).up().start().move(0, -1);
        assert.equal(scrolled, 1, 'scroll action not fired');
      });
      QUnit.test('scroll action fired during native scroll', function(assert) {
        var scrolled = 0;
        var $scrollable = $('#scrollable').dxScrollable({
          inertiaEnabled: false,
          useNative: true,
          onScroll: function() {
            scrolled++;
          }
        });
        $scrollable.find('.' + SCROLLABLE_CONTAINER_CLASS).trigger('scroll');
        assert.equal(scrolled, 1, 'scroll action fired');
      });
      QUnit.test('changing action option does not cause render', function(assert) {
        var $scrollable = $('#scrollable').dxScrollable({useNative: false});
        var $content = $scrollable.find('.' + SCROLLABLE_WRAPPER_CLASS);
        var mouse = pointerMock($content).start();
        mouse.down().move(0, -10);
        var testAction = function(actionName) {
          $scrollable.dxScrollable('option', actionName, noop);
          var location = getScrollOffset($scrollable);
          assert.equal(location.top, -10, actionName + ' case scrollable rerendered');
        };
        testAction('onStart');
        testAction('onEnd');
        testAction('onScroll');
        testAction('onBounce');
        testAction('onUpdated');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","renovation/ui/scroll_view/utils/get_translate_values","animation/frame","../../../helpers/pointerMock.js","generic_light.css!","./scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("renovation/ui/scroll_view/utils/get_translate_values"), require("animation/frame"), require("../../../helpers/pointerMock.js"), require("generic_light.css!"), require("./scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.actions.tests.js.map