!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/rangeSlider.markup.tests.js"], ["jquery","core/config","ui/range_slider"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/rangeSlider.markup.tests.js", ["jquery", "core/config", "ui/range_slider"], function($__export) {
  "use strict";
  var $,
      config,
      SLIDER_CLASS,
      RANGE_SLIDER_CLASS,
      RANGE_SLIDER_START_HANDLE_CLASS,
      RANGE_SLIDER_END_HANDLE_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="slider"></div><div id="start-value"></div><div id="end-value"></div>';
        $('#qunit-fixture').html(markup);
      });
      SLIDER_CLASS = 'dx-slider';
      RANGE_SLIDER_CLASS = 'dx-rangeslider';
      RANGE_SLIDER_START_HANDLE_CLASS = RANGE_SLIDER_CLASS + '-start-handle';
      RANGE_SLIDER_END_HANDLE_CLASS = RANGE_SLIDER_CLASS + '-end-handle';
      QUnit.module('rangeSlider markup', function() {
        QUnit.test('default', function(assert) {
          var sliderElement = $('#slider').dxRangeSlider();
          assert.ok(sliderElement.hasClass(SLIDER_CLASS));
          assert.ok(sliderElement.hasClass(RANGE_SLIDER_CLASS));
        });
      });
      QUnit.module('hidden inputs', function() {
        QUnit.test('two inputs should be rendered', function(assert) {
          var $element = $('#slider').dxRangeSlider();
          var $inputs = $element.find('input');
          assert.equal($inputs.length, 2, 'inputs are rendered');
        });
        QUnit.test('both inputs should have a \'hidden\' type', function(assert) {
          var $element = $('#slider').dxRangeSlider();
          var $inputs = $element.find('input');
          assert.equal($inputs.eq(0).attr('type'), 'hidden', 'the first input is of the \'hidden\' type');
          assert.equal($inputs.eq(1).attr('type'), 'hidden', 'the second input is of the \'hidden\' type');
        });
        QUnit.test('inputs get correct values on init', function(assert) {
          var initialStart = 15;
          var initialEnd = 45;
          var $element = $('#slider').dxRangeSlider({
            start: initialStart,
            end: initialEnd
          });
          var $inputs = $element.find('input');
          assert.equal($inputs.eq(0).val(), initialStart, 'the first input got correct value');
          assert.equal($inputs.eq(1).val(), initialEnd, 'the second input got correct value');
        });
        QUnit.test('first input gets correct value after widget the \'start\' option change', function(assert) {
          var expectedStart = 33;
          var $element = $('#slider').dxRangeSlider();
          var instance = $element.dxRangeSlider('instance');
          var $input = $element.find('input').eq(0);
          instance.option('start', expectedStart);
          assert.equal($input.val(), expectedStart, 'the first input value is correct');
        });
        QUnit.test('second input gets correct value after widget the \'end\' option change', function(assert) {
          var expectedEnd = 88;
          var $element = $('#slider').dxRangeSlider();
          var instance = $element.dxRangeSlider('instance');
          var $input = $element.find('input').eq(1);
          instance.option('end', expectedEnd);
          assert.equal($input.val(), expectedEnd, 'the second input value is correct');
        });
        QUnit.test('the hidden inputs should use the decimal separator specified in DevExpress.config', function(assert) {
          var originalConfig = config();
          try {
            config({serverDecimalSeparator: '|'});
            var $element = $('#slider').dxRangeSlider({
              start: 12.25,
              end: 53.64
            });
            var $inputs = $element.find('input');
            assert.equal($inputs.eq(0).val(), '12|25', 'the correct decimal separator is used in the first input');
            assert.equal($inputs.eq(1).val(), '53|64', 'the correct decimal separator is used in the second input');
          } finally {
            config(originalConfig);
          }
        });
      });
      QUnit.module('\'name\' options', function() {
        QUnit.test('first input should get the \'name\' attribute depending on the \'startName\' option', function(assert) {
          var startName = 'start';
          var $element = $('#slider').dxRangeSlider({startName: startName});
          var $input = $element.find('input').eq(0);
          assert.equal($input.attr('name'), startName, 'the first input has correct \'name\' attribute');
        });
        QUnit.test('first input should get the \'name\' attribute correctly after the \'startName\' option change', function(assert) {
          var expectedName = 'newName';
          var $element = $('#slider').dxRangeSlider({startName: 'initial'});
          var instance = $element.dxRangeSlider('instance');
          var $input = $element.find('input').eq(0);
          instance.option('startName', expectedName);
          assert.equal($input.attr('name'), expectedName, 'the first input has correct \'name\' attribute after the \'startName\' option change');
        });
        QUnit.test('second input should get the \'name\' attribute depending on the \'endName\' option', function(assert) {
          var endName = 'end';
          var $element = $('#slider').dxRangeSlider({endName: endName});
          var $input = $element.find('input').eq(1);
          assert.equal($input.attr('name'), endName, 'the second input has correct \'name\' attribute');
        });
        QUnit.test('second input should get the \'name\' attribute correctly after the \'endName\' option change', function(assert) {
          var expectedName = 'newName';
          var $element = $('#slider').dxRangeSlider({endName: 'initial'});
          var instance = $element.dxRangeSlider('instance');
          var $input = $element.find('input').eq(1);
          instance.option('endName', expectedName);
          assert.equal($input.attr('name'), expectedName, 'the second input has correct \'name\' attribute after the \'endName\' option change');
        });
      });
      QUnit.module('value option', function() {
        QUnit.test('inputs get correct value on init', function(assert) {
          var start = 15;
          var end = 45;
          var $element = $('#slider').dxRangeSlider({value: [start, end]});
          var instance = $('#slider').dxRangeSlider('instance');
          var $inputs = $element.find('input');
          assert.equal(instance.option('start'), start, 'start option got correct value');
          assert.equal(instance.option('end'), end, 'end got correct value');
          assert.equal($inputs.eq(0).val(), start, 'the first input got correct value');
          assert.equal($inputs.eq(1).val(), end, 'the second input got correct value');
        });
        QUnit.test('handle change option value', function(assert) {
          var start = 15;
          var end = 45;
          var $element = $('#slider').dxRangeSlider({value: [0, 1]});
          var instance = $('#slider').dxRangeSlider('instance');
          var $inputs = $element.find('input');
          $element.dxRangeSlider('option', 'value', [start, end]);
          assert.equal(instance.option('start'), start, 'start option got correct value');
          assert.equal(instance.option('end'), end, 'end got correct value');
          assert.equal($inputs.eq(0).val(), start, 'the first input got correct value');
          assert.equal($inputs.eq(1).val(), end, 'the second input got correct value');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria-labels for handles', function(assert) {
          var $element = $('#slider').dxRangeSlider({
            start: 50,
            end: 70
          });
          var $startHandle = $element.find('.' + RANGE_SLIDER_START_HANDLE_CLASS);
          var $endHandle = $element.find('.' + RANGE_SLIDER_END_HANDLE_CLASS);
          assert.equal($startHandle.attr('aria-label'), 'From', 'start handle label is correct');
          assert.equal($endHandle.attr('aria-label'), 'Till', 'end handle label is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","ui/range_slider"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("ui/range_slider"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rangeSlider.markup.tests.js.map