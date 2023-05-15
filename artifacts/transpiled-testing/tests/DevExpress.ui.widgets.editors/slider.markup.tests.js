!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/slider.markup.tests.js"], ["jquery","ui/themes","ui/slider"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/slider.markup.tests.js", ["jquery", "ui/themes", "ui/slider"], function($__export) {
  "use strict";
  var $,
      themes,
      SLIDER_CLASS,
      SLIDER_HANDLE_CLASS,
      SLIDER_RANGE_CLASS,
      SLIDER_BAR_CLASS,
      SLIDER_RANGE_VISIBLE_CLASS,
      SLIDER_LABEL_CLASS,
      module,
      testStart,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__2;
      SLIDER_CLASS = 'dx-slider';
      SLIDER_HANDLE_CLASS = 'dx-slider-handle';
      SLIDER_RANGE_CLASS = SLIDER_CLASS + '-range';
      SLIDER_BAR_CLASS = 'dx-slider-bar';
      SLIDER_RANGE_VISIBLE_CLASS = SLIDER_RANGE_CLASS + '-visible';
      SLIDER_LABEL_CLASS = SLIDER_CLASS + '-label';
      (($__2 = QUnit, module = $__2.module, testStart = $__2.testStart, test = $__2.test, $__2));
      testStart(function() {
        var markup = "\n        <div id=\"slider\"></div>\n        <div id=\"widget\"></div>\n        <div id=\"widthRootStyle\"></div>";
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      module('slider markup', function() {
        test('default', function(assert) {
          var $sliderElement = $('#slider').dxSlider();
          assert.ok($sliderElement.hasClass(SLIDER_CLASS), 'slider has correct class');
          var $handle = $sliderElement.find('.' + SLIDER_HANDLE_CLASS);
          assert.ok($handle.length, 'handle is rendered');
          var $range = $sliderElement.find('.' + SLIDER_RANGE_CLASS);
          assert.ok($range.length, 'range is rendered');
          var $bar = $sliderElement.find('.' + SLIDER_BAR_CLASS);
          assert.ok($bar.length, 'bar is rendered');
        });
        test('\'showRange\' option should toggle class to range element', function(assert) {
          var slider = $('#slider').dxSlider({showRange: true}).dxSlider('instance');
          assert.ok($('.' + SLIDER_RANGE_CLASS).hasClass(SLIDER_RANGE_VISIBLE_CLASS));
          slider.option('showRange', false);
          assert.ok(!$('.' + SLIDER_RANGE_CLASS).hasClass(SLIDER_RANGE_VISIBLE_CLASS));
        });
        test('labels visibility', function(assert) {
          var $slider = $('#slider').dxSlider({
            min: 0,
            max: 100,
            label: {visible: true}
          });
          var $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.length, 2, 'labels are rendered');
        });
        test('labels visiility - format', function(assert) {
          var $slider = $('#slider').dxSlider({label: {
              visible: true,
              format: function(value) {
                return '[' + value + ']';
              }
            }});
          var $sliderLabels = $slider.find('.' + SLIDER_LABEL_CLASS);
          assert.equal($sliderLabels.eq(0).html(), '[0]');
          assert.equal($sliderLabels.eq(1).html(), '[100]');
          $slider.dxSlider('option', 'label.format', function(value) {
            return '(' + value + ')';
          });
          assert.equal($sliderLabels.eq(0).html(), '(0)');
          assert.equal($sliderLabels.eq(1).html(), '(100)');
        });
        test('labels visiility - position', function(assert) {
          var $slider = $('#slider').dxSlider({label: {
              visible: true,
              position: 'top'
            }});
          assert.ok($slider.hasClass('dx-slider-label-position-top'));
          assert.ok(!$slider.hasClass('dx-slider-label-position-bottom'));
          $slider.dxSlider('option', 'label.position', 'bottom');
          assert.ok($slider.hasClass('dx-slider-label-position-bottom'));
          assert.ok(!$slider.hasClass('dx-slider-label-position-top'));
          $slider.dxSlider('option', 'label.visible', false);
          assert.ok(!$slider.hasClass('dx-slider-label-position-bottom'));
          assert.ok(!$slider.hasClass('dx-slider-label-position-top'));
        });
        test('set the validationMessageOffset for the Generic theme', function(assert) {
          var slider = $('#slider').dxSlider().dxSlider('instance');
          assert.deepEqual(slider.option('validationMessageOffset'), {
            h: 7,
            v: 4
          });
        });
        test('set the validationMessageOffset for the Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var slider = $('#slider').dxSlider().dxSlider('instance');
          assert.deepEqual(slider.option('validationMessageOffset'), {
            h: 18,
            v: 0
          });
          themes.isMaterial = origIsMaterial;
        });
      });
      module('widget sizing render', function() {
        test('constructor', function(assert) {
          var $element = $('#widget').dxSlider({width: 400});
          var instance = $element.dxSlider('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element[0].style.width, '400px', 'outer width of the element must be equal to custom width');
        });
        test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxSlider();
          var instance = $element.dxSlider('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element[0].style.width, '300px', 'outer width of the element must be equal to custom width');
        });
        test('change width', function(assert) {
          var $element = $('#widget').dxSlider();
          var instance = $element.dxSlider('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element[0].style.width, customWidth + 'px', 'outer width of the element must be equal to custom width');
        });
      });
      module('hidden input', function() {
        test('a hidden input should be rendered', function(assert) {
          var $slider = $('#slider').dxSlider();
          var $input = $slider.find('input');
          assert.equal($input.length, 1, 'input is rendered');
          assert.equal($input.attr('type'), 'hidden', 'the input type is \'hidden\'');
        });
        test('the hidden input should have correct value on widget init', function(assert) {
          var expectedValue = 30;
          var $slider = $('#slider').dxSlider({value: expectedValue});
          var $input = $slider.find('input');
          assert.equal(parseInt($input.val()), expectedValue, 'the hidden input value is correct');
        });
        test('the hidden input should get correct value on widget value change', function(assert) {
          var expectedValue = 77;
          var $slider = $('#slider').dxSlider();
          var instance = $slider.dxSlider('instance');
          var $input = $slider.find('input');
          instance.option('value', 11);
          instance.option('value', expectedValue);
          assert.equal(parseInt($input.val()), expectedValue, 'the hidden input value is correct');
        });
      });
      module('aria accessibility', function() {
        test('aria role', function(assert) {
          var $element = $('#widget').dxSlider();
          var $handle = $element.find('.dx-slider-handle');
          assert.equal($handle.attr('role'), 'slider', 'aria role is correct');
        });
        test('aria properties', function(assert) {
          var $element = $('#widget').dxSlider({
            min: 20,
            max: 50,
            value: 35
          });
          var $handle = $element.find('.dx-slider-handle');
          assert.equal($handle.attr('aria-valuemin'), 20, 'aria min is correct');
          assert.equal($handle.attr('aria-valuemax'), 50, 'aria max is correct');
          assert.equal($handle.attr('aria-valuenow'), 35, 'aria now is correct');
        });
        test('change aria properties on option changing', function(assert) {
          var $element = $('#widget').dxSlider({
            min: 20,
            max: 50,
            value: 35
          });
          var instance = $element.dxSlider('instance');
          var $handle = $element.find('.dx-slider-handle');
          instance.option({
            min: 25,
            max: 70,
            value: 40
          });
          assert.equal($handle.attr('aria-valuemin'), 25, 'aria min is correct');
          assert.equal($handle.attr('aria-valuemax'), 70, 'aria max is correct');
          assert.equal($handle.attr('aria-valuenow'), 40, 'aria now is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/themes","ui/slider"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/themes"), require("ui/slider"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=slider.markup.tests.js.map