!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validatorIntegration.tests.js"], ["jquery","core/class","ui/validation_engine","ui/validator","../../helpers/keyboardMock.js","../../helpers/ignoreQuillTimers.js","generic_light.css!","ui/text_box","ui/date_box","ui/number_box","ui/autocomplete","ui/calendar","ui/check_box","ui/drop_down_box","ui/html_editor","ui/lookup","ui/radio_group","ui/select_box","ui/tag_box","ui/text_area","ui/slider","ui/range_slider","ui/switch"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validatorIntegration.tests.js", ["jquery", "core/class", "ui/validation_engine", "ui/validator", "../../helpers/keyboardMock.js", "../../helpers/ignoreQuillTimers.js", "generic_light.css!", "ui/text_box", "ui/date_box", "ui/number_box", "ui/autocomplete", "ui/calendar", "ui/check_box", "ui/drop_down_box", "ui/html_editor", "ui/lookup", "ui/radio_group", "ui/select_box", "ui/tag_box", "ui/text_area", "ui/slider", "ui/range_slider", "ui/switch"], function($__export) {
  "use strict";
  var $,
      Class,
      ValidationEngine,
      Validator,
      keyboardMock,
      Fixture;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      Validator = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      Fixture = Class.inherit({
        createInstance: function(editor, editorOptions, validatorOptions) {
          var keyboard = arguments[3] !== (void 0) ? arguments[3] : true;
          var $element = $('<div/>').appendTo('#qunit-fixture');
          this.$element = $element[editor](editorOptions).dxValidator(validatorOptions);
          this.$input = $element.find('.dx-texteditor-input');
          if (keyboard) {
            this.keyboard = keyboardMock(this.$input);
          }
          this.editor = $element[editor]('instance');
          this.validator = Validator.getInstance($element);
          return $element;
        },
        createTextBoxWithValidator: function(validatorOptions) {
          this.$element = $('<div/>');
          var validator = this.$element.dxTextBox().dxValidator(validatorOptions).dxValidator('instance');
          return validator;
        },
        teardown: function() {
          this.$element.remove();
          ValidationEngine.initGroups();
        }
      });
      QUnit.module('Regression', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('dateBox and Validator', function(assert) {
          this.fixture.createInstance('dxDateBox', {pickerType: 'calendar'}, {validationRules: [{type: 'required'}]});
          this.fixture.keyboard.type('somethingwrong');
          this.fixture.$input.trigger('change');
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because incorrect date was typed');
          var editorValidationError = this.fixture.editor.option('validationError');
          assert.ok(editorValidationError, 'Editor should have specific validation error');
          assert.ok(editorValidationError.editorSpecific, 'editorSpecific flag');
        });
        QUnit.test('T197118: dateBox and Validator simultaneous validation', function(assert) {
          this.fixture.createInstance('dxDateBox', {pickerType: 'calendar'}, {validationRules: [{type: 'required'}]});
          this.fixture.keyboard.type('somethingwrong');
          this.fixture.$input.trigger('change');
          this.fixture.validator.validate();
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because incorrect date was typed');
          var editorValidationError = this.fixture.editor.option('validationError');
          assert.ok(editorValidationError, 'Editor should have specific validation error');
          assert.ok(editorValidationError.editorSpecific, 'editorSpecific flag');
        });
        QUnit.test('T197157: dateBox and Validator - validation with wrong-typed date', function(assert) {
          this.fixture.createInstance('dxDateBox', {pickerType: 'calendar'}, {validationRules: [{type: 'required'}]});
          this.fixture.keyboard.type('somethingwrong');
          this.fixture.$input.trigger('change');
          this.fixture.validator.validate();
          this.fixture.$input.val('');
          this.fixture.$input.trigger('change');
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because incorrect date was typed');
          var editorValidationError = this.fixture.editor.option('validationError');
          assert.ok(editorValidationError, 'Editor should have specific validation error');
          assert.strictEqual(editorValidationError.editorSpecific, undefined, 'editorSpecific flag should not be set');
          assert.strictEqual(editorValidationError.message, 'Required', 'Message should came from dxValidator');
        });
        QUnit.test('T525700: numberBox and Validator - validation on focusout with validation rule range', function(assert) {
          this.fixture.createInstance('dxNumberBox', {}, {validationRules: [{
              type: 'range',
              min: 100
            }]});
          this.fixture.keyboard.type('1');
          this.fixture.$input.trigger('change');
          this.fixture.$input.trigger('focusout');
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because value is less then min');
          var editorValidationError = this.fixture.editor.option('validationError');
          assert.ok(editorValidationError, 'Editor should have specific validation error');
          assert.strictEqual(editorValidationError.message, 'Value is out of range', 'Message should came from dxValidator');
        });
        QUnit.test('T260652: disabled widgets should not be validated', function(assert) {
          this.fixture.createInstance('dxTextBox', {
            value: '',
            disabled: true
          }, {validationRules: [{type: 'required'}]});
          var result = this.fixture.validator.validate();
          assert.strictEqual(result.isValid, true, 'Disabled widget should bypass validation');
        });
        QUnit.test('T426721: dxValidator text jumps during validation', function(assert) {
          var validator = this.fixture.createTextBoxWithValidator({validationRules: [{type: 'required'}]});
          var textBox = this.fixture.$element.dxTextBox('instance');
          try {
            this.fixture.$element.appendTo('#qunit-fixture');
            textBox.option('templatesRenderAsynchronously', true);
            validator.validate();
            var $overlayWrapper = validator.$element().find('.dx-overlay-wrapper');
            assert.equal($overlayWrapper.length, 1, 'validation message not blinking on render');
          } finally {
            this.fixture.$element.remove();
          }
        });
        QUnit.test('Validator message does not detached when parent scrolled', function(assert) {
          var validator = this.fixture.createTextBoxWithValidator({validationRules: [{type: 'required'}]});
          var topDiff = 22;
          var $element = $('<div />');
          $element.css('height', '100px');
          var $bingo = $('<div id=\'bingo\' />');
          $bingo.css({
            'overflow-y': 'scroll',
            height: '100px'
          });
          $element.insertAfter(this.fixture.$element.wrap($bingo));
          var $scrollableWrapper = validator.$element().parent().appendTo('body');
          validator.validate();
          var top1 = validator.$element().find('.dx-overlay').offset().top;
          $scrollableWrapper.scrollTop(topDiff);
          var top2 = validator.$element().find('.dx-overlay').offset().top;
          assert.roughEqual(top1 - top2 - topDiff, 0, 0.01, 'message overlay was not detached from input');
        });
        QUnit.test('NumberBox and Validator', function(assert) {
          this.fixture.createInstance('dxNumberBox', {}, {validationRules: [{type: 'required'}]});
          this.fixture.editor.option('value', 'asd');
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because of empty value');
          var editorValidationError = this.fixture.editor.option('validationError');
          assert.ok(editorValidationError, 'Editor should have specific validation error');
          assert.ok(editorValidationError.editorSpecific, 'editorSpecific flag');
        });
        QUnit.test('NumberBox and Validator with the \'required\' rule (T368398)', function(assert) {
          this.fixture.createInstance('dxNumberBox', {}, {validationRules: [{type: 'required'}]});
          this.fixture.validator.validate();
          this.fixture.$input.val('1').trigger('change');
          this.fixture.$input.val('').trigger('change');
          assert.strictEqual(this.fixture.editor.option('isValid'), false, 'Editor should be invalid because of empty value');
        });
        ['dxAutocomplete', 'dxCalendar', 'dxCheckBox', 'dxDateBox', 'dxDropDownBox', 'dxHtmlEditor', 'dxLookup', 'dxRadioGroup', 'dxRangeSlider', 'dxSelectBox', 'dxSlider', 'dxSwitch', 'dxTagBox', 'dxTextArea', 'dxTextBox'].forEach(function(editor) {
          QUnit.test((editor + ".reset should not validate the default value"), function(assert) {
            var validationCallback = sinon.spy();
            this.fixture.createInstance(editor, {}, {validationRules: [{
                type: 'custom',
                validationCallback: validationCallback
              }]}, false);
            this.fixture.editor.reset();
            assert.notOk(validationCallback.called, 'validationCallback should not be called');
          });
          QUnit.test(("Validator.reset should not validate the default value for " + editor), function(assert) {
            var validationCallback = sinon.spy();
            this.fixture.createInstance(editor, {}, {validationRules: [{
                type: 'custom',
                validationCallback: validationCallback
              }]}, false);
            this.fixture.validator.reset();
            assert.notOk(validationCallback.called, 'validationCallback should not be called');
          });
        });
        QUnit.test('NumberBox.reset should validate the default value', function(assert) {
          var validationCallback = sinon.spy();
          this.fixture.createInstance('dxNumberBox', {}, {validationRules: [{
              type: 'custom',
              validationCallback: validationCallback
            }]}, false);
          this.fixture.editor.reset();
          assert.ok(validationCallback.called, 'validationCallback should be called after dxNumberBox.reset');
        });
        QUnit.test('Validator.reset should not validate the default NumberBox value', function(assert) {
          var validationCallback = sinon.spy();
          this.fixture.createInstance('dxNumberBox', {}, {validationRules: [{
              type: 'custom',
              validationCallback: validationCallback
            }]}, false);
          this.fixture.validator.reset();
          assert.notOk(validationCallback.called, 'validationCallback should not be called');
        });
        QUnit.test('Validator should not toggle the "dx-rtl" class', function(assert) {
          this.fixture.createInstance('dxTextBox', {rtlEnabled: true}, {
            rtlEnabled: false,
            validationRules: [{type: 'required'}]
          }, false);
          assert.ok(this.fixture.$element.hasClass('dx-rtl'), 'Root element has the "dx-rtl" class');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/class","ui/validation_engine","ui/validator","../../helpers/keyboardMock.js","../../helpers/ignoreQuillTimers.js","generic_light.css!","ui/text_box","ui/date_box","ui/number_box","ui/autocomplete","ui/calendar","ui/check_box","ui/drop_down_box","ui/html_editor","ui/lookup","ui/radio_group","ui/select_box","ui/tag_box","ui/text_area","ui/slider","ui/range_slider","ui/switch"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/class"), require("ui/validation_engine"), require("ui/validator"), require("../../helpers/keyboardMock.js"), require("../../helpers/ignoreQuillTimers.js"), require("generic_light.css!"), require("ui/text_box"), require("ui/date_box"), require("ui/number_box"), require("ui/autocomplete"), require("ui/calendar"), require("ui/check_box"), require("ui/drop_down_box"), require("ui/html_editor"), require("ui/lookup"), require("ui/radio_group"), require("ui/select_box"), require("ui/tag_box"), require("ui/text_area"), require("ui/slider"), require("ui/range_slider"), require("ui/switch"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validatorIntegration.tests.js.map