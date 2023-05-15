!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tooltip.tests.js"], ["jquery","animation/fx","ui/tooltip","core/renderer","ui/widget/ui.errors","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tooltip.tests.js", ["jquery", "animation/fx", "ui/tooltip", "core/renderer", "ui/widget/ui.errors", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      Tooltip,
      renderer,
      uiErrors,
      TOOLTIP_CLASS,
      TOOLTIP_WRAPPER_CLASS,
      DX_INVISIBILITY_CLASS,
      wrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      Tooltip = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      uiErrors = $__m.default;
    }, function($__m) {}],
    execute: function() {
      TOOLTIP_CLASS = 'dx-tooltip';
      TOOLTIP_WRAPPER_CLASS = 'dx-tooltip-wrapper';
      DX_INVISIBILITY_CLASS = 'dx-state-invisible';
      wrapper = function() {
        return $('body').find('.' + TOOLTIP_WRAPPER_CLASS);
      };
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
        <div class="dx-viewport">\
            <div id="target"></div>\
            <div id="target2"></div>\
            <div id="tooltip"></div>\
            <div id="tooltip2"></div>\
        </div>\
    //</div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('render', function() {
        QUnit.test('render as tooltip', function(assert) {
          var $tooltip = $('#tooltip');
          new Tooltip($tooltip, {visible: true});
          assert.ok($tooltip.hasClass(TOOLTIP_CLASS));
          assert.ok(wrapper().length);
        });
        QUnit.test('tooltip should render when target is core renderer object', function(assert) {
          var target = renderer($('#target'));
          var target2 = renderer($('#target2'));
          var $tooltip = $('#tooltip');
          var $tooltip2 = $('#tooltip2');
          new Tooltip($tooltip, {
            target: target,
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave'
          });
          new Tooltip($tooltip2, {
            target: target2,
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave'
          });
          $('#target').trigger('mouseenter');
          assert.notOk($tooltip.hasClass(DX_INVISIBILITY_CLASS), 'first tooltip is visible');
          assert.ok($tooltip2.hasClass(DX_INVISIBILITY_CLASS), 'second tooltip is hidden');
        });
        QUnit.test('tooltip should render when target is selector', function(assert) {
          var $tooltip = $('#tooltip');
          new Tooltip($tooltip, {
            target: '#defferedTarget',
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave'
          });
          $('<div>').attr('id', 'defferedTarget').appendTo('body');
          $('#defferedTarget').trigger('mouseenter');
          assert.notOk($tooltip.hasClass(DX_INVISIBILITY_CLASS), 'first tooltip is visible');
        });
        QUnit.module('Breaking change t1123711 - warning W1021', function() {
          QUnit.test('should be logged if container is invalid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#tooltip').dxTooltip({
                container: 'invalid',
                visible: true
              });
              assert.ok(uiErrors.log.calledOnce, 'only one warning is logged');
              assert.deepEqual(uiErrors.log.lastCall.args, ['W1021', 'dxTooltip'], 'args of the log method');
            } finally {
              uiErrors.log.restore();
            }
          });
          QUnit.test('should not not be logged if container is valid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#tooltip').dxTooltip({
                container: 'body',
                visible: true
              });
              assert.ok(uiErrors.log.notCalled, 'no warning is logged');
            } finally {
              uiErrors.log.restore();
            }
          });
        });
      });
      QUnit.module('overlay integration', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        ['closeOnOutsideClick', 'hideOnOutsideClick'].forEach(function(closeOnOutsideClickOptionName) {
          QUnit.test(("tooltip should be closed on outside click if " + closeOnOutsideClickOptionName + " is true"), function(assert) {
            var $__2;
            var $tooltip = $('#tooltip').dxTooltip(($__2 = {}, Object.defineProperty($__2, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__2));
            var instance = $tooltip.dxTooltip('instance');
            instance.show();
            $('#qunit-fixture').trigger('dxpointerdown');
            assert.equal(instance.option('visible'), false, 'toast was hidden should be hiding');
          });
          QUnit.test(("tooltip should not prevent " + closeOnOutsideClickOptionName + " handler of other overlays"), function(assert) {
            var $__2;
            var tooltip = new Tooltip($('#tooltip'));
            var $overlay = $('<div>').appendTo('.dx-viewport');
            var overlay = $overlay.dxOverlay(($__2 = {}, Object.defineProperty($__2, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__2)).dxOverlay('instance');
            overlay.show();
            tooltip.show();
            $('#qunit-fixture').trigger('dxpointerdown');
            assert.equal(overlay.option('visible'), false, 'dxOverlay should be hiding');
          });
        });
      });
      QUnit.module('base z-index', function() {
        QUnit.test('tooltip should have correct z-index', function(assert) {
          Tooltip.baseZIndex(10000);
          var tooltip = new Tooltip($('#tooltip'), {visible: true});
          var $tooltipContent = tooltip.$overlayContent();
          assert.equal($tooltipContent.css('zIndex'), 10001, 'tooltip\'s z-index is correct');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('role="tooltip" attribute should be added to tooltip', function(assert) {
          var $tooltip = $('#tooltip');
          new Tooltip($tooltip);
          var $overlayContent = $tooltip.find('.dx-overlay-content');
          assert.equal($overlayContent.attr('role'), 'tooltip');
        });
        QUnit.test('aria-describedby property should be set on target when tooltip is visible', function(assert) {
          var $target = $('#target');
          var $element = $('#tooltip');
          new Tooltip($element, {
            target: $target,
            visible: false
          });
          var $overlay = $element.find('.dx-overlay-content');
          assert.notEqual($target.attr('aria-describedby'), undefined, 'aria-describedby exists on target');
          assert.equal($target.attr('aria-describedby'), $overlay.attr('id'), 'aria-describedby and overlay\'s id are equal');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/tooltip","core/renderer","ui/widget/ui.errors","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/tooltip"), require("core/renderer"), require("ui/widget/ui.errors"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tooltip.tests.js.map