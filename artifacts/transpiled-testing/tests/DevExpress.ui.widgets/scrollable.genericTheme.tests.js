!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/scrollable.genericTheme.tests.js"], ["jquery","ui/scroll_view/ui.scrollable","./scrollableParts/scrollable.constants.js","core/utils/extend","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/scrollable.genericTheme.tests.js", ["jquery", "ui/scroll_view/ui.scrollable", "./scrollableParts/scrollable.constants.js", "core/utils/extend", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      Scrollable,
      SCROLLABLE_CONTENT_CLASS,
      SCROLLABLE_CONTAINER_CLASS,
      SCROLLABLE_SCROLLBAR_CLASS,
      SCROLLBAR_HORIZONTAL_CLASS,
      SCROLLBAR_VERTICAL_CLASS,
      extend;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Scrollable = $__m.default;
    }, function($__m) {
      SCROLLABLE_CONTENT_CLASS = $__m.SCROLLABLE_CONTENT_CLASS;
      SCROLLABLE_CONTAINER_CLASS = $__m.SCROLLABLE_CONTAINER_CLASS;
      SCROLLABLE_SCROLLBAR_CLASS = $__m.SCROLLABLE_SCROLLBAR_CLASS;
      SCROLLBAR_HORIZONTAL_CLASS = $__m.SCROLLBAR_HORIZONTAL_CLASS;
      SCROLLBAR_VERTICAL_CLASS = $__m.SCROLLBAR_VERTICAL_CLASS;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="outerScrollable">\
        <div style="height: 400px; width: 400px;"></div>\
            <div id="innerScrollable">\
                <div style="height: 200px; width: 200px;"></div>\
            </div>\
        </div>\
    </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Paddings: simulated strategy', function() {
        function checkPaddings(assert, $scrollable, $__2) {
          var $__4,
              $__5,
              $__6,
              $__7;
          var $__3 = $__2,
              top = ($__4 = $__3.top) === void 0 ? '0px' : $__4,
              right = ($__5 = $__3.right) === void 0 ? '0px' : $__5,
              bottom = ($__6 = $__3.bottom) === void 0 ? '0px' : $__6,
              left = ($__7 = $__3.left) === void 0 ? '0px' : $__7;
          var $scrollableContent = $scrollable.find(("." + SCROLLABLE_CONTENT_CLASS));
          assert.strictEqual($scrollableContent.css('paddingTop'), top, 'padding top');
          assert.strictEqual($scrollableContent.css('paddingRight'), right, 'padding right');
          assert.strictEqual($scrollableContent.css('paddingBottom'), bottom, 'padding bottom');
          assert.strictEqual($scrollableContent.css('paddingLeft'), left, 'padding left');
        }
        [false, true].forEach(function(rtlEnabled) {
          ['vertical', 'horizontal', 'both'].forEach(function(direction) {
            ['always', 'never', 'onHover', 'onScroll'].forEach(function(showScrollbar) {
              QUnit.test(("Outer scrollable.showScrollbar: 'always', innerScrollable.showScrollbar: '" + showScrollbar + "', direction: " + direction + ", rtlEnabled: " + rtlEnabled), function(assert) {
                var $outerScrollable = $('#outerScrollable').dxScrollable({
                  width: 200,
                  height: 200,
                  direction: direction,
                  showScrollbar: 'always',
                  useNative: false,
                  rtlEnabled: rtlEnabled
                });
                var $innerScrollable = $('#innerScrollable').dxScrollable({
                  width: 100,
                  height: 100,
                  direction: direction,
                  showScrollbar: showScrollbar,
                  useNative: false
                });
                var expectedHorizontalOuterScrollablePaddings = {bottom: '8px'};
                var expectedHorizontalInnerScrollablePaddings = {bottom: showScrollbar === 'always' ? '8px' : '0px'};
                var expectedVerticalOuterScrollablePaddings = rtlEnabled ? {left: '8px'} : {right: '8px'};
                var expectedVerticalInnerScrollablePaddings = rtlEnabled ? {left: showScrollbar === 'always' ? '8px' : '0px'} : {right: showScrollbar === 'always' ? '8px' : '0px'};
                if (direction === 'horizontal') {
                  checkPaddings(assert, $outerScrollable, expectedHorizontalOuterScrollablePaddings);
                  checkPaddings(assert, $innerScrollable, expectedHorizontalInnerScrollablePaddings);
                } else if (direction === 'vertical') {
                  checkPaddings(assert, $outerScrollable, expectedVerticalOuterScrollablePaddings);
                  checkPaddings(assert, $innerScrollable, expectedVerticalInnerScrollablePaddings);
                } else {
                  checkPaddings(assert, $outerScrollable, extend(expectedVerticalOuterScrollablePaddings, expectedHorizontalOuterScrollablePaddings));
                  checkPaddings(assert, $innerScrollable, extend(expectedVerticalInnerScrollablePaddings, expectedHorizontalInnerScrollablePaddings));
                }
              });
            });
          });
        });
      });
      QUnit.module('Nested scrollable styles', function() {
        var configs = [];
        [false, true].forEach(function(outerUseNative) {
          [false, true].forEach(function(innerUseNative) {
            [false, true].forEach(function(rtlEnabled) {
              ['vertical', 'horizontal', 'both'].forEach(function(outerDirection) {
                ['vertical', 'horizontal', 'both'].forEach(function(innerDirection) {
                  ['always', 'never', 'onHover', 'onScroll'].forEach(function(showScrollbar) {
                    var config = {
                      rtlEnabled: rtlEnabled,
                      outerDirection: outerDirection,
                      innerDirection: innerDirection,
                      showScrollbar: showScrollbar,
                      outerUseNative: outerUseNative,
                      innerUseNative: innerUseNative
                    };
                    config.message = Object.keys(config).reduce(function(message, key) {
                      return message += (key + ": " + config[key] + ", ");
                    }, '');
                    configs.push(config);
                  });
                });
              });
            });
          });
        });
        function checkElementStyles(element, expected, message) {
          var styles = window.getComputedStyle(element);
          for (var propertyName in expected) {
            QUnit.assert.strictEqual(styles[propertyName], expected[propertyName], (propertyName + " ") + message);
          }
        }
        configs.forEach(function(config) {
          QUnit.test(("check container styles, config: " + config.message), function(assert) {
            var options = {
              showScrollbar: config.showScrollbar,
              rtlEnabled: config.rtlEnabled
            };
            var outerScrollableElement = $('#outerScrollable').get(0);
            var innerScrollableElement = $('#innerScrollable').get(0);
            new Scrollable(outerScrollableElement, extend(options, {
              width: 200,
              height: 200,
              direction: config.outerDirection,
              useNative: config.outerUseNative
            }));
            new Scrollable(innerScrollableElement, extend(options, {
              width: 100,
              height: 100,
              direction: config.innerDirection,
              useNative: config.innerUseNative
            }));
            var expectedNative = {
              both: {
                touchAction: 'pan-x pan-y',
                overflowX: config.showScrollbar !== 'never' ? 'auto' : 'hidden',
                overflowY: config.showScrollbar !== 'never' ? 'auto' : 'hidden',
                position: 'relative'
              },
              vertical: {
                touchAction: 'pan-y',
                overflowX: 'hidden',
                overflowY: config.showScrollbar !== 'never' ? 'auto' : 'hidden',
                position: 'relative'
              },
              horizontal: {
                touchAction: 'pan-x',
                overflowX: config.showScrollbar !== 'never' ? 'auto' : 'hidden',
                overflowY: 'hidden',
                position: 'relative'
              }
            };
            var expectedSimulated = {
              both: {
                touchAction: 'none',
                overflowX: 'hidden',
                overflowY: 'hidden',
                position: 'static'
              },
              vertical: {
                touchAction: 'pan-x',
                overflowX: 'hidden',
                overflowY: 'hidden',
                position: 'static'
              },
              horizontal: {
                touchAction: 'pan-y',
                overflowX: 'hidden',
                overflowY: 'hidden',
                position: 'static'
              }
            };
            checkElementStyles(outerScrollableElement.querySelector(("." + SCROLLABLE_CONTAINER_CLASS)), (config.outerUseNative ? expectedNative : expectedSimulated)[config.outerDirection], 'outerScrollable');
            checkElementStyles(innerScrollableElement.querySelector(("." + SCROLLABLE_CONTAINER_CLASS)), (config.innerUseNative ? expectedNative : expectedSimulated)[config.innerDirection], 'innerScrollable');
          });
          QUnit.test(("check scrollbar styles, config: " + config.message), function(assert) {
            var options = {
              showScrollbar: config.showScrollbar,
              rtlEnabled: config.rtlEnabled
            };
            var outerScrollableElement = $('#outerScrollable').get(0);
            var innerScrollableElement = $('#innerScrollable').get(0);
            new Scrollable(outerScrollableElement, extend(options, {
              width: 200,
              height: 200,
              direction: config.outerDirection,
              useNative: config.outerUseNative
            }));
            new Scrollable(innerScrollableElement, extend(options, {
              width: 100,
              height: 100,
              direction: config.innerDirection,
              useNative: config.innerUseNative
            }));
            var expectedSimulated = {display: config.showScrollbar === 'never' ? 'none' : 'block'};
            var checkStyles = function(scrollableElement, direction, message) {
              if (direction === 'both') {
                var horizontalScrollbars = scrollableElement.querySelectorAll(("." + SCROLLBAR_HORIZONTAL_CLASS));
                var verticalScrollbars = scrollableElement.querySelectorAll(("." + SCROLLBAR_VERTICAL_CLASS));
                checkElementStyles(horizontalScrollbars[horizontalScrollbars.length - 1], expectedSimulated, message);
                checkElementStyles(verticalScrollbars[verticalScrollbars.length - 1], expectedSimulated, message);
              } else {
                var scrollbars = scrollableElement.querySelectorAll(("." + SCROLLABLE_SCROLLBAR_CLASS));
                checkElementStyles(scrollbars[scrollbars.length - 1], expectedSimulated, message);
              }
            };
            if (!config.outerUseNative) {
              checkStyles(outerScrollableElement, config.outerDirection, 'outerScrollable');
            } else if (!config.innerUseNative) {
              checkStyles(innerScrollableElement, config.innerDirection, 'innerScrollable');
            } else {
              assert.ok(true);
            }
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/scroll_view/ui.scrollable","./scrollableParts/scrollable.constants.js","core/utils/extend","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/scroll_view/ui.scrollable"), require("./scrollableParts/scrollable.constants.js"), require("core/utils/extend"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.genericTheme.tests.js.map