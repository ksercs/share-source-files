!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validator.editors.tests.js"], ["jquery","core/class","ui/editor/editor","ui/validation/default_adapter","ui/validation_engine","ui/text_box/ui.text_editor.base","core/utils/deferred","ui/validator","ui/load_indicator"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validator.editors.tests.js", ["jquery", "core/class", "ui/editor/editor", "ui/validation/default_adapter", "ui/validation_engine", "ui/text_box/ui.text_editor.base", "core/utils/deferred", "ui/validator", "ui/load_indicator"], function($__export) {
  "use strict";
  var $,
      Class,
      Editor,
      DefaultAdapter,
      ValidationEngine,
      TextEditorBase,
      Deferred,
      Fixture;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      Editor = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      TextEditorBase = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      Fixture = Class.inherit({
        createValidator: function(options, element) {
          this.$element = element || this.$element || $('<div/>');
          this.stubAdapter = sinon.createStubInstance(DefaultAdapter);
          var validator = this.$element.dxValidator($.extend({adapter: this.stubAdapter}, options)).dxValidator('instance');
          return validator;
        },
        createEditor: function(editorOptions) {
          this.$element = $('<div/>');
          return new Editor(this.$element, $.extend({}, editorOptions));
        },
        createTextEditor: function(editorOptions) {
          this.$element = $('<div/>');
          return new TextEditorBase(this.$element, $.extend({}, editorOptions));
        },
        teardown: function() {
          this.$element.remove();
          ValidationEngine.initGroups();
        }
      });
      QUnit.module('Editors Standard Adapter', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('Adapter reacts on editor\'s value change - to invalid', function(assert) {
          var emptyValue = '';
          var handler = sinon.stub();
          var editor = this.fixture.createEditor({value: '123'});
          this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}],
            onValidated: handler
          });
          editor.option('value', emptyValue);
          assert.strictEqual(editor.option('isValid'), false, 'Editor options should be set');
          assert.ok(handler.calledOnce, 'onValidated handler should be called');
          var brokenRule = handler.getCall(0).args[0].brokenRule;
          assert.ok(brokenRule, 'Validation error should exists');
          assert.equal(brokenRule.type, 'required', 'Correct message should be passed');
        });
        QUnit.test('Adapter reacts on editor\'s value change - to valid', function(assert) {
          var value = '123';
          var handler = sinon.stub();
          var editor = this.fixture.createEditor({value: ''});
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}],
            onValidated: handler
          });
          validator.validate();
          editor.option('value', value);
          assert.strictEqual(editor.option('isValid'), true, 'Editor options should be set');
          assert.ok(handler.calledTwice, 'onValidated handler should be called two times');
          var brokenRule = handler.getCall(1).args[0].brokenRule;
          assert.ok(!brokenRule, 'Validation error should not be set');
        });
        QUnit.test('Validation request should get value from editor', function(assert) {
          var value = '123';
          var editor = this.fixture.createEditor({value: value});
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}]
          });
          var result = validator.validate();
          assert.strictEqual(result.isValid, true, 'result should be valid');
          assert.strictEqual(editor.option('isValid'), true, 'Editor options should be set');
        });
        QUnit.test('Adapter should be set on contentReady', function(assert) {
          var fixture = this.fixture;
          var error = '';
          this.fixture.createEditor({onContentReady: function() {
              try {
                fixture.createValidator({
                  adapter: null,
                  validationRules: [{type: 'required'}]
                });
              } catch (e) {
                error = e;
              }
            }});
          assert.equal(error, '');
        });
        QUnit.test('Editor\'s validators request should not be mixed with another editors', function(assert) {
          var value = '123';
          var emptyValue = '';
          var editor1 = this.fixture.createEditor({value: value});
          this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}]
          }, editor1.$element());
          var editor2 = this.fixture.createEditor({value: emptyValue});
          this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}]
          }, editor2.$element());
          editor1.option('value', emptyValue);
          assert.strictEqual(editor1.option('isValid'), false, 'Editor1 changed and should be marked as valid');
          assert.strictEqual(editor2.option('isValid'), true, 'Editor2 have not changed yet and should not be validated');
        });
        QUnit.test('Editor-specific validation should be kept', function(assert) {
          var handler = sinon.stub();
          var editor = this.fixture.createEditor({
            value: 'abc',
            isValid: false,
            validationError: {
              message: 'Something went wrong in Editor itself',
              editorSpecific: true
            }
          });
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}],
            onValidated: handler
          });
          validator.validate();
          assert.strictEqual(editor.option('isValid'), false, 'Editor should be kept invalid');
          assert.strictEqual(validator.option('isValid'), false, 'Validator should become invalid');
          assert.ok(handler.calledOnce);
          var params = handler.getCall(0).args[0];
          assert.strictEqual(params.isValid, false, 'Result should be marked as invalid');
          assert.ok(params.brokenRule, 'validationError should be passed');
          assert.equal(params.brokenRule.message, 'Something went wrong in Editor itself', 'Message from editor should be passed');
        });
        QUnit.test('Disabled editor should bypass validation', function(assert) {
          this.fixture.createEditor({disabled: true});
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}]
          });
          var result = validator.option('adapter').bypass();
          assert.strictEqual(result, true, 'Disabled editor should bypass validation');
        });
        QUnit.test('Reset value of custom validation rule when the required rule is defined before it', function(assert) {
          var editor = this.fixture.createEditor();
          var spy = sinon.spy(function() {
            return false;
          });
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}, {
              type: 'custom',
              validationCallback: spy
            }]
          });
          editor.option('value', 'test');
          validator.reset();
          editor.option('value', 'test');
          assert.equal(spy.callCount, 2, 'The validationCallback is called after reset');
        });
        QUnit.test('Editor should display pending indicator after repaint', function(assert) {
          var editor = this.fixture.createTextEditor({value: 'test'});
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{
              type: 'async',
              validationCallback: function() {
                return new Deferred().promise();
              }
            }]
          });
          validator.validate();
          var indicator = editor.$element().find('.dx-pending-indicator').dxLoadIndicator('instance');
          assert.ok(indicator, 'indicator found after valiating');
          assert.ok(indicator.option('visible'), 'indicator is shown after validating');
          editor.repaint();
          indicator = editor.$element().find('.dx-pending-indicator').dxLoadIndicator('instance');
          assert.ok(indicator, 'indicator found after repainting');
          assert.ok(indicator.option('visible'), 'indicator is shown after repainting');
        });
        QUnit.test('Editor should not display valid mark after resetting a value', function(assert) {
          var editor = this.fixture.createTextEditor({value: 'test'});
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{
              type: 'async',
              ignoreEmptyValue: true,
              validationCallback: function() {
                return new Deferred().resolve().promise();
              }
            }]
          });
          var done = assert.async();
          var result = validator.validate();
          result.complete.then(function() {
            assert.ok(editor.$element().hasClass('dx-valid'), 'editor has the \'dx-valid\' CSS after validating');
            validator.reset();
            assert.notOk(editor.$element().hasClass('dx-valid'), 'editor does not have the \'dx-valid\' CSS after resetting a value');
            done();
          });
        });
        QUnit.test('Editor - validation options should be synchrnoized on init', function(assert) {
          var err1 = {message: '1'};
          var err2 = {message: '2'};
          var editor = this.fixture.createEditor({
            isValid: false,
            validationError: err1
          });
          assert.strictEqual(editor.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          assert.strictEqual(editor.option('validationErrors[0]'), err1, 'validationErrors[0] === err1');
          this.fixture.teardown();
          editor = this.fixture.createEditor({
            isValid: false,
            validationErrors: [err2, err1]
          });
          assert.strictEqual(editor.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          assert.strictEqual(editor.option('validationError'), err2, 'validationError === err2');
          this.fixture.teardown();
          editor = this.fixture.createEditor({
            isValid: false,
            validationErrors: [err2, err1]
          });
          assert.strictEqual(editor.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          assert.strictEqual(editor.option('validationError'), err2, 'validationError === err2');
          this.fixture.teardown();
          editor = this.fixture.createEditor({validationStatus: 'invalid'});
          assert.strictEqual(editor.option('isValid'), false, 'isValid === false');
        });
        QUnit.test('Editor - validation options should be synchrnoized at runtime', function(assert) {
          var editor = this.fixture.createEditor({});
          var err1 = {message: '1'};
          var err2 = {message: '2'};
          editor.option('isValid', false);
          assert.strictEqual(editor.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          editor.option('isValid', true);
          assert.strictEqual(editor.option('validationStatus'), 'valid', 'validationStatus === \'valid\'');
          editor.option('validationStatus', 'pending');
          assert.ok(editor.option('isValid'), 'isValid === true');
          editor.option('validationStatus', 'invalid');
          assert.notOk(editor.option('isValid'), 'isValid === false');
          editor.option('validationStatus', 'valid');
          assert.ok(editor.option('isValid'), 'isValid === true');
          editor.option('validationError', err1);
          assert.strictEqual(editor.option('validationErrors[0]'), err1, 'validationErrors[0] === err1');
          editor.option('validationError', err2);
          assert.strictEqual(editor.option('validationErrors[0]'), err2, 'validationErrors[0] === err2');
          editor.option('validationError', null);
          assert.notOk(editor.option('validationErrors'), 'validationErrors === null');
          editor.option('validationErrors', [err1]);
          assert.strictEqual(editor.option('validationError'), err1, 'validationError === err1');
          editor.option('validationErrors', [err2, err1]);
          assert.strictEqual(editor.option('validationError'), err2, 'validationError === err2');
          editor.option('validationErrors', null);
          assert.notOk(editor.option('validationError'), 'validationError === null');
        });
        QUnit.test('Editor should not display a valid mark when showValidationMark is false', function(assert) {
          var editor = this.fixture.createTextEditor({showValidationMark: false});
          editor.option('validationStatus', 'pending');
          editor.option('validationStatus', 'valid');
          assert.notOk(this.fixture.$element.hasClass('dx-valid'), 'valid mark is not rendered');
        });
        QUnit.test('Editor should display a valid mark when showValidationMark is changed at runtime to true', function(assert) {
          var editor = this.fixture.createTextEditor({showValidationMark: false});
          editor.option('validationStatus', 'pending');
          editor.option('showValidationMark', true);
          editor.option('validationStatus', 'valid');
          assert.ok(this.fixture.$element.hasClass('dx-valid'), 'valid mark is rendered');
        });
        QUnit.test('Editor(read-only) - validating and validated events of a validator should be raised (T873862)', function(assert) {
          this.fixture.createTextEditor({
            value: 'test',
            readOnly: true
          });
          var validatingHandler = sinon.stub();
          var validatedHandler = sinon.stub();
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{
              type: 'async',
              validationCallback: function() {
                return new Deferred().resolve().promise();
              }
            }]
          });
          validator.on('validating', validatingHandler);
          validator.on('validated', validatedHandler);
          var done = assert.async();
          var result = validator.validate();
          result.complete.then(function() {
            assert.ok(validatingHandler.calledOnce, 'validating was called');
            assert.ok(validatedHandler.calledOnce, 'validated was called');
            done();
          });
        });
        QUnit.test('Editor should toggle an "aria-required" attribute if the "required" rule is removed', function(assert) {
          this.fixture.createTextEditor();
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: [{type: 'required'}]
          });
          var $input = this.fixture.$element.find('.dx-texteditor-input');
          assert.ok(Boolean($input.attr('aria-required')), 'input have an "aria-required" attribute');
          validator.option('validationRules', []);
          assert.notOk(Boolean($input.attr('aria-required')), 'input does not have an "aria-required" attribute');
        });
        QUnit.test('Editor should toggle an "aria-required" attribute if the "required" rule is added', function(assert) {
          this.fixture.createTextEditor();
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: null
          });
          var $input = this.fixture.$element.find('.dx-texteditor-input');
          assert.notOk(Boolean($input.attr('aria-required')), 'input does not have an "aria-required" attribute');
          validator.option('validationRules', [{type: 'required'}]);
          assert.ok(Boolean($input.attr('aria-required')), 'input have an "aria-required" attribute');
        });
        QUnit.test('Editor should not toggle an "aria-required" attribute if the "required" rule is added, but editor is not initialized yet', function(assert) {
          var editor = this.fixture.createTextEditor();
          editor._initialized = false;
          editor._initializing = true;
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: null
          });
          var $input = this.fixture.$element.find('.dx-texteditor-input');
          validator.option('validationRules', [{type: 'required'}]);
          assert.notOk(Boolean($input.attr('aria-required')), 'input still does not have an "aria-required" attribute');
        });
        QUnit.test('Editor should toggle an "aria-required" attribute on markup render if the "required" rule is added', function(assert) {
          var editor = this.fixture.createTextEditor();
          editor._initialized = false;
          var validator = this.fixture.createValidator({
            adapter: null,
            validationRules: null
          });
          var $input = this.fixture.$element.find('.dx-texteditor-input');
          validator.option('validationRules', [{type: 'required'}]);
          assert.ok(Boolean($input.attr('aria-required')), '"aria-required" is rendered after editor initialization');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/class","ui/editor/editor","ui/validation/default_adapter","ui/validation_engine","ui/text_box/ui.text_editor.base","core/utils/deferred","ui/validator","ui/load_indicator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/class"), require("ui/editor/editor"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("ui/text_box/ui.text_editor.base"), require("core/utils/deferred"), require("ui/validator"), require("ui/load_indicator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validator.editors.tests.js.map