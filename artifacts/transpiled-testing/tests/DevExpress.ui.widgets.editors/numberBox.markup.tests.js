!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/numberBox.markup.tests.js"], ["jquery","ui/number_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/numberBox.markup.tests.js", ["jquery", "ui/number_box"], function($__export) {
  "use strict";
  var $,
      NumberBox,
      NUMBERBOX_CLASS,
      INVALID_CLASS,
      SPIN_CLASS,
      SPIN_CONTAINER_CLASS,
      SPIN_UP_CLASS,
      SPIN_DOWN_CLASS,
      TEXTEDITOR_CLASS,
      INPUT_CLASS,
      CONTAINER_CLASS,
      SPIN_TOUCH_FRIENDLY_CLASS,
      PLACEHOLDER_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      NumberBox = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="element"></div>';
        $('#qunit-fixture').html(markup);
      });
      NUMBERBOX_CLASS = 'dx-numberbox';
      INVALID_CLASS = 'dx-invalid';
      SPIN_CLASS = 'dx-numberbox-spin';
      SPIN_CONTAINER_CLASS = 'dx-numberbox-spin-container';
      SPIN_UP_CLASS = 'dx-numberbox-spin-up';
      SPIN_DOWN_CLASS = 'dx-numberbox-spin-down';
      TEXTEDITOR_CLASS = 'dx-texteditor';
      INPUT_CLASS = 'dx-texteditor-input';
      CONTAINER_CLASS = 'dx-texteditor-container';
      SPIN_TOUCH_FRIENDLY_CLASS = 'dx-numberbox-spin-touch-friendly';
      PLACEHOLDER_CLASS = 'dx-placeholder';
      moduleConfig = {beforeEach: function() {
          this.$element = $('#element');
        }};
      QUnit.module('dxNumberBox markup', moduleConfig, function() {
        QUnit.test('base markup', function(assert) {
          var element = this.$element.dxNumberBox();
          assert.ok(element.hasClass(NUMBERBOX_CLASS));
          assert.ok(element.hasClass(TEXTEDITOR_CLASS));
          assert.equal(element.find('.' + INPUT_CLASS).length, 1);
          assert.equal(element.find('.' + CONTAINER_CLASS).length, 1);
        });
        QUnit.test('input type should depend on mode option', function(assert) {
          var types = [{
            mode: 'tel',
            prop: 'tel'
          }, {
            mode: 'number',
            prop: 'number'
          }, {
            mode: 'text',
            prop: 'text'
          }, {
            mode: 'tel',
            prop: 'tel'
          }];
          types.forEach(function(type) {
            this.$element.dxNumberBox({mode: type.mode});
            assert.equal(this.$element.find('.' + INPUT_CLASS).prop('type'), type.prop, 'when mode is ' + type.mode + ', type should be ' + type.prop);
          }.bind(this));
        });
        QUnit.test('numberbox should have correct markup with masks', function(assert) {
          var $element = this.$element.dxNumberBox({
            useMaskBehavior: true,
            format: '$ #0.00',
            value: 1
          });
          var $input = $element.find('.' + INPUT_CLASS);
          assert.equal($input.val(), '$ 1.00', 'value is correct');
        });
        QUnit.test('init with options', function(assert) {
          assert.expect(2);
          var element = this.$element.dxNumberBox({
            min: 0,
            max: 100
          });
          var $input = element.find('.' + INPUT_CLASS);
          assert.equal($input.prop('min'), 0);
          assert.equal($input.prop('max'), 100);
        });
        QUnit.test('init with option useLargeSpinButtons', function(assert) {
          var $element = this.$element.dxNumberBox({
            showSpinButtons: true,
            useLargeSpinButtons: true
          });
          assert.ok($element.hasClass(SPIN_TOUCH_FRIENDLY_CLASS), 'element has touchFriendly class');
        });
        QUnit.test('placeholder is visible when value is invalid', function(assert) {
          var $element = this.$element.dxNumberBox({
            placeholder: 'Placeholder',
            value: ''
          });
          var $placeholder = $element.find('.' + PLACEHOLDER_CLASS);
          assert.equal($placeholder.data('dx_placeholder'), 'Placeholder', 'text is correct');
        });
        QUnit.test('T220209 - the \'displayValueFormatter\' option', function(assert) {
          var $numberBox = this.$element.dxNumberBox({
            value: 5,
            displayValueFormatter: function(value) {
              return (value < 10 ? '0' : '') + value;
            }
          });
          assert.equal($numberBox.dxNumberBox('option', 'value'), 5, 'value is correct');
          assert.equal($numberBox.find('.dx-texteditor-input').val(), '05', 'input value is correct');
        });
        QUnit.test('The widget should be valid if the value option is undefined', function(assert) {
          var numberBox = new NumberBox(this.$element, {value: undefined});
          var $input = this.$element.find('.' + INPUT_CLASS);
          assert.ok(numberBox.option('isValid'), 'widget is valid');
          assert.equal($input.val(), '', 'input value is correct');
        });
        QUnit.test('The widget should be invalid if isValid option is false on init but value format is correct', function(assert) {
          var $numberBox = this.$element.dxNumberBox({
            value: 0,
            isValid: false
          });
          assert.ok($numberBox.hasClass(INVALID_CLASS), 'widget is invalid');
        });
        QUnit.test('Spin buttons should not be rendered bu default', function(assert) {
          this.$element.dxNumberBox();
          var $spinContainer = this.$element.find('.' + SPIN_CONTAINER_CLASS);
          assert.notOk(this.$element.hasClass(SPIN_CLASS), 'number box has not spin class');
          assert.equal($spinContainer.length, 0, 'number box has no spin containers');
        });
        QUnit.test('Spin buttons should be rendered if showSpinButtons is true', function(assert) {
          this.$element.dxNumberBox({showSpinButtons: true});
          var $spinContainer = this.$element.find('.' + SPIN_CONTAINER_CLASS);
          assert.ok(this.$element.hasClass(SPIN_CLASS), 'number box has a spin class');
          assert.equal($spinContainer.length, 1, 'number box has spin container');
          assert.equal($spinContainer.find('.' + SPIN_UP_CLASS).length, 1, 'spin up button exists');
          assert.equal($spinContainer.find('.' + SPIN_DOWN_CLASS).length, 1, 'spin down button exists');
        });
        QUnit.test('useLargeSpinButtons option should toggle touch friendly spin buttons', function(assert) {
          new NumberBox(this.$element, {
            showSpinButtons: true,
            useLargeSpinButtons: false
          });
          assert.ok(!this.$element.hasClass(SPIN_TOUCH_FRIENDLY_CLASS), 'element has not touchFriendly class');
        });
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = this.$element.dxNumberBox();
          var $hiddenInput = $element.find('input[type=\'hidden\']');
          assert.equal($hiddenInput.length, 1, 'a hidden input is created');
        });
        QUnit.test('the hidden input should get correct value on init', function(assert) {
          var expectedValue = 24.8;
          var $element = this.$element.dxNumberBox({value: expectedValue});
          var $hiddenInput = $element.find('input[type=\'hidden\']');
          assert.equal(parseFloat($hiddenInput.val()), expectedValue, 'the hidden input has correct value after init');
        });
        QUnit.test('hidden input should get the \'name\' attribute', function(assert) {
          var expectedName = 'name';
          this.$element.dxNumberBox({name: expectedName});
          var $hiddenInput = $('input[type=\'hidden\']');
          assert.equal($hiddenInput.attr('name'), expectedName, 'hidden input has correct \'name\' attribute');
        });
        QUnit.test('editor input should not get the \'name\' attribute', function(assert) {
          var $element = this.$element.dxNumberBox({name: 'name'});
          var input = $element.find('.' + INPUT_CLASS).get(0);
          assert.notOk(input.hasAttribute('name'), 'edior input does not have the \'name\' attribute');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/number_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/number_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=numberBox.markup.tests.js.map