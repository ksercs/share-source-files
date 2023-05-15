!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/sliderTooltip.tests.js"], ["jquery","ui/slider/ui.slider_tooltip"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/sliderTooltip.tests.js", ["jquery", "ui/slider/ui.slider_tooltip"], function($__export) {
  "use strict";
  var $,
      SliderTooltip,
      SLIDER_TOOLTIP_VISIBILITY_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      SliderTooltip = $__m.default;
    }],
    execute: function() {
      SLIDER_TOOLTIP_VISIBILITY_CLASS = 'dx-slider-tooltip-visible-on-hover';
      QUnit.testStart(function() {
        var markup = "\n        <div id='container'>\n            <div id=\"sliderTooltip\"></div>\n        </div>\n        ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('SliderTooltip', {beforeEach: function() {
          var $__3 = this;
          this.$container = $('#container');
          var initialOptions = {
            target: this.$container,
            container: this.$container
          };
          this.$sliderTooltip = $('#sliderTooltip');
          this.init = function(options) {
            $__3.sliderTooltip = new SliderTooltip($__3.$sliderTooltip, $.extend({}, initialOptions, options));
          };
          this.reinit = function(options) {
            $__3.sliderTooltip.dispose();
            $__3.init(options);
          };
          this.init({});
        }}, function() {
        QUnit.test('default options', function(assert) {
          var $__3 = this;
          var defaultOptions = {
            visible: false,
            position: 'top',
            hideOnOutsideClick: false,
            hideTopOverlayHandler: null,
            hideOnParentScroll: false,
            animation: null,
            templatesRenderAsynchronously: false,
            _fixWrapperPosition: false,
            useResizeObserver: false,
            showMode: 'onHover',
            value: 0
          };
          Object.entries(defaultOptions).forEach(function($__4) {
            var $__6,
                $__7;
            var $__5 = $__4,
                name = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
                value = ($__7 = $__6.next()).done ? void 0 : $__7.value;
            assert.strictEqual($__3.sliderTooltip.option(name), value, (name + " option default value is correct"));
          });
        });
        QUnit.module('render', {beforeEach: function() {
            var $__3 = this;
            this.isTooltipRendered = function() {
              return !!$__3.$container.find($__3.$sliderTooltip).length;
            };
          }}, function() {
          [true, false].forEach(function(visible) {
            QUnit.test(("tooltip should be " + (visible === true ? '' : 'not') + " rendered if visible=" + visible), function(assert) {
              this.reinit({visible: visible});
              assert.strictEqual(this.isTooltipRendered(), visible);
            });
            QUnit.test(("tooltip should be " + (visible === true ? '' : 'not') + " after runtime change visible=" + visible), function(assert) {
              this.reinit({visible: !visible});
              this.sliderTooltip.option({visible: visible});
              assert.strictEqual(this.isTooltipRendered(), visible);
            });
          });
        });
        QUnit.module('showMode', {beforeEach: function() {
            var $__3 = this;
            this.hasContainerHoverVisibilityClass = function() {
              return $__3.$container.hasClass(SLIDER_TOOLTIP_VISIBILITY_CLASS);
            };
          }}, function() {
          ['always', 'onHover'].forEach(function(showMode) {
            var isHoverMode = showMode === 'onHover';
            QUnit.test(("container should have " + (isHoverMode ? '' : 'not') + " dx-slider-tooltip-visible-on-hover class if showMode=" + showMode), function(assert) {
              this.reinit({showMode: showMode});
              assert.strictEqual(this.hasContainerHoverVisibilityClass(), isHoverMode);
            });
            QUnit.test(("container should have " + (isHoverMode ? '' : 'not') + " dx-slider-tooltip-visible-on-hover class after runtime change showMode=" + showMode), function(assert) {
              this.reinit({showMode: isHoverMode ? 'always' : 'onHover'});
              this.sliderTooltip.option({showMode: showMode});
              assert.strictEqual(this.hasContainerHoverVisibilityClass(), isHoverMode);
            });
          });
        });
        QUnit.module('content rendering', {beforeEach: function() {
            var $__3 = this;
            this.getText = function() {
              return $__3.sliderTooltip.$content().text();
            };
          }}, function() {
          QUnit.test('content text is updated after value change', function(assert) {
            this.sliderTooltip.option('value', 15);
            assert.strictEqual(this.getText(), '15');
          });
          QUnit.test('position should be updated after content rendering', function(assert) {
            var positionedStub = sinon.stub();
            this.sliderTooltip.on('positioned', positionedStub);
            this.sliderTooltip.option('value', 15);
            assert.ok(positionedStub.called);
          });
          QUnit.test('should not raise any error if value=undefined', function(assert) {
            try {
              this.sliderTooltip.option('value', undefined);
              assert.ok(true, 'no error is raised');
            } catch (e) {
              assert.ok(false, e);
            }
          });
          QUnit.module('format', function() {
            QUnit.test('default format just renders value as a text', function(assert) {
              assert.strictEqual(this.getText(), '0', 'default format is correct');
            });
            QUnit.test('format can be configured on init', function(assert) {
              this.reinit({format: function(value) {
                  return ("(" + value + ")");
                }});
              assert.strictEqual(this.getText(), '(0)', 'default format is correct');
            });
            QUnit.test('format can be configured runtime', function(assert) {
              this.sliderTooltip.option({format: function(value) {
                  return ("(" + value + ")");
                }});
              assert.strictEqual(this.getText(), '(0)', 'default format is correct');
            });
          });
        });
        QUnit.module('public methods', function() {
          QUnit.test('updatePosition', function(assert) {
            var positionedStub = sinon.stub();
            this.sliderTooltip.on('positioned', positionedStub);
            this.sliderTooltip.updatePosition();
            assert.ok(positionedStub.called);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/slider/ui.slider_tooltip"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/slider/ui.slider_tooltip"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sliderTooltip.tests.js.map