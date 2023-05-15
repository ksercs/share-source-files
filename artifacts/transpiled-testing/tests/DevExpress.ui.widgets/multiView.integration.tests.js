!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/multiView.integration.tests.js"], ["jquery","animation/fx","ui/multi_view/ui.multi_view.animation","ui/multi_view","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/multiView.integration.tests.js", ["jquery", "animation/fx", "ui/multi_view/ui.multi_view.animation", "ui/multi_view", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      animation,
      _translator;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      animation = $__m.animation;
      _translator = $__m._translator;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.module('Integration tests', {
        beforeEach: function(assert) {
          fx.off = true;
          var that = this;
          this.originalAnimationMoveTo = animation.moveTo;
          animation.moveTo = function($element, position) {
            assert.notEqual(position, 'NaN%', (position + " is not a %, _animation.moveTo"));
            that.originalAnimationMoveTo.apply(null, arguments);
          };
          this.originalTranslatorMove = _translator.move;
          _translator.move = function($element, position) {
            assert.notEqual(position, 'NaN%', (position + " is not a %, _animation.moveTo"));
            that.originalTranslatorMove.apply(null, arguments);
          };
          this.$multiView = $('<div id="myView"></div>').appendTo('#qunit');
        },
        afterEach: function() {
          this.$multiView.remove();
          _translator.move = this.originalTranslatorMove;
          animation.moveTo = this.originalAnimationMoveTo;
          fx.off = false;
        }
      }, function() {
        function getElementId(text) {
          return ("_" + text);
        }
        function checkContainsElements(assert, $element, idList) {
          idList.forEach(function(id) {
            assert.equal($element.find('#' + getElementId(id)).length, 1, ("contains '" + id + "', checkContainsElements"));
          });
        }
        function checkNotContainsElements(assert, $element, idList) {
          idList.forEach(function(id) {
            assert.equal($element.find('#' + getElementId(id)).length, 0, ("doesn't contain '" + id + "', checkNotContainsElements"));
          });
        }
        function checkItemRect(assert, $multiView, itemText, expectedRect) {
          var $element = $multiView.find('#' + getElementId(itemText));
          assert.equal($element.length, 1, ("'#" + itemText + "' was found, checkItemBoundingClientRect('" + itemText + "')"));
          var rect = $element[0].getBoundingClientRect();
          assert.ok(Math.abs(expectedRect.left - rect.left) < 10, ("expected left: " + expectedRect.left + ", left: " + rect.left + ", checkItemBoundingClientRect('" + itemText + "')"));
          assert.ok(Math.abs(expectedRect.width - rect.width) < 10, ("expected width: " + expectedRect.width + ", width: " + rect.width + ", checkItemBoundingClientRect('" + itemText + "')"));
        }
        [false, true].forEach(function(deferRendering) {
          [false, true].forEach(function(rtlEnabled) {
            [undefined, 100].forEach(function(height) {
              var context = (", rtlEnabled:" + rtlEnabled + ", height:" + height);
              function createMultiView(options) {
                options.deferRendering = deferRendering;
                options.rtlEnabled = rtlEnabled;
                options.height = height;
                options.width = 200;
                options.animationEnabled = false;
                options.itemTemplate = function(itemData) {
                  return ("<div id='" + getElementId(itemData) + "'>" + itemData + "</div>");
                };
                return $('#myView').dxMultiView(options);
              }
              QUnit.test('[{0,selected}, 1]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1],
                  selectedIndex: 0
                });
                checkContainsElements(assert, $multiView, [0]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [1]);
                } else {
                  checkContainsElements(assert, $multiView, [1]);
                }
                checkItemRect(assert, $multiView, 0, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[{0,selected}, 1] -> [options(selectedIndex,1)]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1],
                  selectedIndex: 0
                });
                var instance = $multiView.dxMultiView('instance');
                instance.option('selectedIndex', 1);
                checkContainsElements(assert, $multiView, [0, 1]);
                checkItemRect(assert, $multiView, 1, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[{0,selected}, 1, 2]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1, 2],
                  selectedIndex: 0
                });
                checkContainsElements(assert, $multiView, [0]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [1, 2]);
                } else {
                  checkContainsElements(assert, $multiView, [1, 2]);
                }
                checkItemRect(assert, $multiView, 0, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[{0,selected}, 1, 2] -> [options(selectedIndex,1)] -> [options(selectedIndex,2)]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1, 2],
                  selectedIndex: 0
                });
                var instance = $multiView.dxMultiView('instance');
                instance.option('selectedIndex', 1);
                checkContainsElements(assert, $multiView, [0, 1]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [2]);
                } else {
                  checkContainsElements(assert, $multiView, [2]);
                }
                checkItemRect(assert, $multiView, 1, {
                  left: 0,
                  width: 200
                });
                instance.option('selectedIndex', 2);
                checkContainsElements(assert, $multiView, [0, 1, 2]);
                checkItemRect(assert, $multiView, 2, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[0, {1,selected}, 2]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1, 2],
                  selectedIndex: 1
                });
                checkContainsElements(assert, $multiView, [1]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [0, 2]);
                } else {
                  checkContainsElements(assert, $multiView, [0, 2]);
                }
                checkItemRect(assert, $multiView, 1, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[0, {1,selected}, 2] -> [options(selectedIndex, 0)]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1, 2],
                  selectedIndex: 1
                });
                var instance = $multiView.dxMultiView('instance');
                instance.option('selectedIndex', 0);
                checkContainsElements(assert, $multiView, [0, 1]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [2]);
                } else {
                  checkContainsElements(assert, $multiView, [2]);
                }
                checkItemRect(assert, $multiView, 0, {
                  left: 0,
                  width: 200
                });
              });
              QUnit.test('[0, {1,selected}, 2] -> [options(selectedIndex, 2)]' + context, function(assert) {
                var $multiView = createMultiView({
                  items: [0, 1, 2],
                  selectedIndex: 1
                });
                var instance = $multiView.dxMultiView('instance');
                instance.option('selectedIndex', 2);
                checkContainsElements(assert, $multiView, [1, 2]);
                if (deferRendering) {
                  checkNotContainsElements(assert, $multiView, [0]);
                } else {
                  checkContainsElements(assert, $multiView, [0]);
                }
                checkItemRect(assert, $multiView, 2, {
                  left: 0,
                  width: 200
                });
              });
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/multi_view/ui.multi_view.animation","ui/multi_view","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/multi_view/ui.multi_view.animation"), require("ui/multi_view"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=multiView.integration.tests.js.map