!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validator.tests.js"], ["jquery","core/utils/common","core/class","ui/validation/default_adapter","ui/validation_engine","core/utils/deferred","core/utils/type","core/config","ui/validator"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validator.tests.js", ["jquery", "core/utils/common", "core/class", "ui/validation/default_adapter", "ui/validation_engine", "core/utils/deferred", "core/utils/type", "core/config", "ui/validator"], function($__export) {
  "use strict";
  var $,
      noop,
      Class,
      DefaultAdapter,
      ValidationEngine,
      Deferred,
      isPromise,
      config,
      Fixture;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      isPromise = $__m.isPromise;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}],
    execute: function() {
      Fixture = Class.inherit({
        createValidator: function(options, element) {
          this.$element = element || this.$element || $('<div/>');
          this.stubAdapter = this.stubAdapter || sinon.createStubInstance(DefaultAdapter);
          var validator = this.$element.dxValidator($.extend({adapter: this.stubAdapter}, options)).dxValidator('instance');
          return validator;
        },
        createAdapter: function() {
          this.stubAdapter = sinon.createStubInstance(DefaultAdapter);
        },
        teardown: function() {
          this.$element.remove();
          ValidationEngine.initGroups();
        }
      });
      QUnit.module('General', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('Validator exists', function(assert) {
          var validator = this.fixture.createValidator();
          assert.ok(validator, 'Validator was created');
          assert.ok(validator.validate, 'Validation function is accessible');
        });
        QUnit.test('ValidationEngine can validate valid value against provided rules', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'required',
              message: 'Please set validator\'s value'
            }]});
          this.fixture.stubAdapter.getValue.returns('hello');
          var result = validator.validate();
          assert.strictEqual(validator.option('isValid'), true, 'Validator should be isValid');
          assert.strictEqual(result.isValid, true, 'Validator should be isValid - result');
          assert.ok(!result.brokenRule, 'There should not be brokenRule');
          assert.ok(this.fixture.stubAdapter.applyValidationResults.calledOnce, 'Adapter method should be called');
        });
        QUnit.test('Validator apply "rtlEnabled" value from global config by default', function(assert) {
          var originalConfig = config();
          try {
            config({rtlEnabled: true});
            this.fixture.createValidator({validationRules: [{type: 'required'}]});
            assert.ok(this.fixture.$element.hasClass('dx-rtl'), 'Adapter method should be called');
          } finally {
            config(originalConfig);
          }
        });
        QUnit.test('Validator apply "rtlEnabled" value from adapter', function(assert) {
          this.fixture.createAdapter();
          this.fixture.stubAdapter.editor = {option: function() {
              return {rtlEnabled: true};
            }};
          this.fixture.createValidator({validationRules: [{type: 'required'}]});
          assert.ok(this.fixture.$element.hasClass('dx-rtl'), 'Adapter method should be called');
        });
        QUnit.test('ValidationEngine can validate Invalid against provided rules', function(assert) {
          var errorMessage = 'Please set validator\'s value';
          var validator = this.fixture.createValidator({
            value: '',
            validationRules: [{
              type: 'required',
              message: errorMessage
            }]
          });
          var result = validator.validate();
          assert.strictEqual(validator.option('isValid'), false, 'Validator should be invalid');
          assert.strictEqual(result.isValid, false, 'Validator should be invalid - result');
          assert.ok(result.brokenRule, 'There should not be brokenRule');
          assert.equal(result.brokenRule.message, errorMessage, 'Validation message should be passed from rules');
        });
        QUnit.test('Returned value should contain state, name, validation errors and validator reference', function(assert) {
          var validator = this.fixture.createValidator({
            name: 'Login',
            validationRules: [{type: 'required'}]
          });
          this.fixture.stubAdapter.getValue.returns('');
          var result = validator.validate();
          assert.ok(result, 'Result should be returned');
          assert.strictEqual(result.isValid, validator.option('isValid'), 'isValid flag should be passed');
          assert.equal(result.name, 'Login');
          assert.strictEqual(result.brokenRule.validator, validator, 'Validator reference');
        });
        QUnit.test('Validator with set validation group', function(assert) {
          var validationGroup = {};
          var validator = this.fixture.createValidator({
            validationRules: [{type: 'required'}],
            validationGroup: validationGroup
          });
          this.fixture.stubAdapter.getValue.returns('');
          var result = ValidationEngine.validateGroup(validationGroup);
          assert.ok(result, 'Result should be returned');
          assert.strictEqual(result.isValid, validator.option('isValid'), 'isValid flag should be passed');
          assert.ok(result.brokenRules[0], 'Result should contain validation errors');
          assert.strictEqual(result.brokenRules[0].validator, validator, 'Validator reference');
        });
        QUnit.test('Validator can be reset', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'custom',
              validationCallback: function() {
                return false;
              }
            }]});
          validator.validate();
          validator.reset();
          assert.strictEqual(validator.option('isValid'), true, 'isValid - Validation should be restored in valid state');
          assert.ok(this.fixture.stubAdapter.reset.calledOnce, 'Editor should be reset');
        });
        QUnit.test('Validator should be validated after validationRules changed', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'required',
              message: 'En'
            }]});
          validator.validate();
          var spy = sinon.spy(validator, 'validate');
          validator.option('validationRules', [{
            type: 'required',
            message: 'De'
          }]);
          assert.equal(spy.callCount, 1, 'validation performed');
        });
        QUnit.test('Untouched validator should not be validated after validationRules changed', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'custom',
              validationCallback: function() {
                return true;
              },
              message: 'En'
            }]});
          var spy = sinon.spy(validator, 'validate');
          validator.option('validationRules', [{
            type: 'custom',
            validationCallback: function() {
              return true;
            },
            message: 'De'
          }]);
          assert.equal(spy.callCount, 0, 'validation performed');
        });
        QUnit.test('Options changing after validator creation', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'required',
              message: 'Please set validator\'s value'
            }]});
          var options = validator.option();
          for (var optionName in options) {
            var prevValue = validator.option(optionName);
            var newValue = prevValue;
            if (optionName === 'width' || optionName === 'height') {
              newValue = 555;
              options[optionName] = newValue;
            }
            validator.beginUpdate();
            validator._notifyOptionChanged(optionName, newValue, prevValue);
            validator.endUpdate();
            assert.ok(true, 'it\'s possible to change option ' + optionName);
          }
        });
        QUnit.test('Internal validation rules are should be reset when validation rules are changed via the option', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{type: 'required'}]});
          validator.validate();
          validator.option('validationRules', [{
            type: 'custom',
            validationCallback: $.noop
          }]);
          validator.validate();
          assert.deepEqual(validator._getValidationRules(), [{
            index: 0,
            isValid: undefined,
            message: 'Value is invalid',
            type: 'custom',
            validationCallback: $.noop,
            validator: validator,
            value: undefined
          }]);
        });
        QUnit.test('Validator - validation options should be synchrnoized on init', function(assert) {
          var validator = this.fixture.createValidator({isValid: false});
          assert.strictEqual(validator.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          this.fixture.teardown();
          validator = this.fixture.createValidator({validationStatus: 'invalid'});
          assert.strictEqual(validator.option('isValid'), false, 'isValid === false');
          this.fixture.teardown();
          validator = this.fixture.createValidator({validationStatus: 'pending'});
          assert.strictEqual(validator.option('isValid'), true, 'isValid === true');
        });
        QUnit.test('Validator - validation options should be synchrnoized at runtime', function(assert) {
          var validator = this.fixture.createValidator({});
          validator.option('isValid', false);
          assert.strictEqual(validator.option('validationStatus'), 'invalid', 'validationStatus === \'invalid\'');
          validator.option('isValid', true);
          assert.strictEqual(validator.option('validationStatus'), 'valid', 'validationStatus === \'valid\'');
          validator.option('validationStatus', 'pending');
          assert.ok(validator.option('isValid'), 'isValid === true');
          validator.option('validationStatus', 'invalid');
          assert.notOk(validator.option('isValid'), 'isValid === false');
          validator.option('validationStatus', 'valid');
          assert.ok(validator.option('isValid'), 'isValid === true');
        });
      });
      QUnit.module('Validator specific tests', {
        beforeEach: function() {
          this.fixture = new Fixture();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.fixture.teardown();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('changed Value (correct -> incorrect through options) should be validated', function(assert) {
          var errorMessage = 'Please set validator\'s value';
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'required',
              message: 'Please set validator\'s value'
            }]});
          this.fixture.stubAdapter.getValue.returns('hello');
          validator.validate();
          this.fixture.stubAdapter.getValue.returns('');
          var result = validator.validate();
          assert.strictEqual(validator.option('isValid'), false, 'Validator should be isValid');
          assert.ok(result.brokenRule, 'brokenRule should be passed as part of result');
          assert.equal(result.brokenRule.message, errorMessage, 'Validation message should be passed from rules');
        });
        QUnit.test('changed Value (incorrect -> correct through options) should be validated', function(assert) {
          var validator = this.fixture.createValidator({
            value: '',
            validationRules: [{
              type: 'required',
              message: 'Please set validator\'s value'
            }]
          });
          this.fixture.stubAdapter.getValue.returns('');
          validator.validate();
          this.fixture.stubAdapter.getValue.returns('hello');
          var result = validator.validate();
          assert.strictEqual(result.isValid, true, 'Validator should be isValid');
          assert.ok(!result.brokenRule, 'brokenRule is null');
        });
        QUnit.test('Validator should be able to bypass validation', function(assert) {
          var validator = this.fixture.createValidator({
            value: '',
            validationRules: [{
              type: 'required',
              message: 'Please set validator\'s value'
            }]
          });
          this.fixture.stubAdapter.bypass.returns(true);
          var result = validator.validate();
          assert.strictEqual(result.isValid, true, 'Validator should be able to bypass validation');
          assert.ok(!result.brokenRule, 'brokenRule is null');
        });
        QUnit.test('Validation rules are not modified after validate', function(assert) {
          var value = '';
          var name = 'Login';
          var handler = sinon.stub();
          var validator = this.fixture.createValidator({
            name: name,
            onValidated: handler,
            validationRules: [{type: 'required'}]
          });
          this.fixture.stubAdapter.getValue.returns(value);
          validator.validate();
          assert.deepEqual(validator.option('validationRules'), [{type: 'required'}]);
        });
        QUnit.test('Remote validation is worked correctly', function(assert) {
          var validator = this.fixture.createValidator({validationRules: [{
              type: 'custom',
              validationCallback: function(params) {
                setTimeout(function() {
                  params.rule.isValid = true;
                  params.validator.validate();
                });
              }
            }]});
          validator.validate();
          this.clock.tick(10);
          assert.ok(validator.option('isValid'));
        });
      });
      QUnit.module('Registration in groups', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('Widget should be registered in a group', function(assert) {
          var validator = this.fixture.createValidator();
          assert.ok(ValidationEngine.getGroupConfig(), 'Group should be registered with default name');
          assert.strictEqual(ValidationEngine.getGroupConfig().validators[0], validator, 'Validator should be registered');
        });
        QUnit.test('Widget should be deregistered after disposing', function(assert) {
          var validator = this.fixture.createValidator();
          validator._dispose();
          assert.strictEqual(ValidationEngine.getGroupConfig().validators.length, 0, 'Validator reference should be removed from group');
        });
        QUnit.test('Validator should be created in the root group if group was not found', function(assert) {
          var validator = this.fixture.createValidator({modelByElement: function() {
              return 'ViewModel';
            }});
          validator._dispose();
          assert.strictEqual(ValidationEngine.groups.length, 1, 'new group was not created');
        });
        QUnit.test('Widget should be able to reinit group registration', function(assert) {
          var validator = this.fixture.createValidator({validationGroup: '123'});
          validator.option('validationGroup', '234');
          assert.strictEqual(ValidationEngine.getGroupConfig('234').validators[0], validator, 'Validator should be re-registered in second group');
          assert.strictEqual(ValidationEngine.getGroupConfig('123'), undefined, 'Validator should be de-registered in first group');
        });
        QUnit.test('Widget should be able to reinit group registration', function(assert) {
          var validator = this.fixture.createValidator({validationGroup: '123'});
          validator.option('validationGroup', undefined);
          assert.strictEqual(ValidationEngine.getGroupConfig().validators[0], validator, 'Validator should be registered');
        });
      });
      QUnit.module('Events', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('Validated event should fire', function(assert) {
          var value = '';
          var name = 'Login';
          var expectedFailedValidationRule = {
            index: 0,
            type: 'required',
            isValid: false,
            message: 'Login is required',
            validator: {},
            value: value
          };
          var handler = sinon.stub();
          var validator = this.fixture.createValidator({
            name: name,
            onValidated: handler,
            validationRules: [{type: 'required'}]
          });
          expectedFailedValidationRule.validator = validator;
          this.fixture.stubAdapter.getValue.returns(value);
          validator.validate();
          assert.ok(handler.calledOnce, 'Validated handler should be called');
          var params = handler.getCall(0).args[0];
          assert.ok(handler.calledOn(validator), 'Correct context of action');
          assert.strictEqual(params.validator, validator, 'Validator reference should be passed');
          assert.equal(params.value, value, 'Correct value was passed');
          assert.equal(params.name, name, 'Name of Validator should be passed');
          assert.strictEqual(params.isValid, false, 'isValid was passed');
          assert.deepEqual(params.validationRules, [{
            index: 0,
            isValid: false,
            message: 'Login is required',
            type: 'required',
            validator: validator,
            value: value
          }], 'Correct rules were passed');
          assert.deepEqual(params.brokenRule, expectedFailedValidationRule, 'Failed rules were passed');
        });
        QUnit.test('Validated event should fire correctly after option runtime change', function(assert) {
          var value = '';
          var name = 'Login';
          var handlerAfterChange = sinon.stub();
          var validator = this.fixture.createValidator({
            name: name,
            validationRules: [{type: 'required'}]
          });
          validator.option('onValidated', handlerAfterChange);
          this.fixture.stubAdapter.getValue.returns(value);
          validator.validate();
          assert.ok(handlerAfterChange.calledOnce, 'Validated handler should be called after option change');
        });
        QUnit.test('Focused event should fire', function(assert) {
          var validator = this.fixture.createValidator({});
          validator.focus();
          assert.ok(this.fixture.stubAdapter.focus.calledOnce, 'Validated handler should be called');
        });
        QUnit.test('validator.reset should fire event (to work correctly with dxValidationSummary)', function(assert) {
          var handler = sinon.stub();
          var validationRules = [{
            type: 'custom',
            validationCallback: function() {
              return false;
            }
          }];
          var validator = this.fixture.createValidator({
            onValidated: handler,
            validationRules: validationRules
          });
          validator.validate();
          validator.reset();
          assert.ok(handler.calledTwice, 'Validated handler should be called two times - first one for validation, and second one for reset()');
          var params = handler.getCall(1).args[0];
          assert.ok(handler.calledOn(validator), 'Correct context of action');
          assert.strictEqual(params.validator, validator, 'Validator reference should be passed');
          assert.strictEqual(params.isValid, true, 'isValid was passed');
          assert.strictEqual(params.brokenRule, null, 'Null should be passed as brokenRule ');
        });
        QUnit.test('optionChange raising', function(assert) {
          var optionChangeHandler = sinon.stub();
          var validator = this.fixture.createValidator({
            name: 'a',
            onOptionChanged: optionChangeHandler
          });
          validator.option('name', 'b');
          assert.ok(optionChangeHandler.calledOnce, 'optionChange event is raised');
        });
        QUnit.test('initialized raising', function(assert) {
          var initializedHandler = sinon.stub();
          this.fixture.createValidator({onInitialized: initializedHandler});
          assert.ok(initializedHandler.calledOnce, 'initialized event is raised');
        });
        QUnit.test('disposing raising', function(assert) {
          var disposingHandler = sinon.stub();
          this.fixture.createValidator({onDisposing: disposingHandler});
          this.fixture.teardown();
          assert.ok(disposingHandler.calledOnce, 'disposing event is raised');
        });
        QUnit.module('Subscription by "on" method', function() {
          QUnit.test('Validated event should fire', function(assert) {
            var value = '';
            var name = 'Login';
            var expectedFailedValidationRule = {
              index: 0,
              type: 'required',
              isValid: false,
              message: 'Login is required',
              validator: {},
              value: value
            };
            var handler = sinon.stub();
            var validator = this.fixture.createValidator({
              name: name,
              validationRules: [{type: 'required'}]
            });
            validator.on('validated', handler);
            expectedFailedValidationRule.validator = validator;
            this.fixture.stubAdapter.getValue.returns(value);
            validator.validate();
            assert.ok(handler.calledOnce, 'Validated handler should be called');
            var params = handler.getCall(0).args[0];
            assert.ok(handler.calledOn(validator), 'Correct context of action');
            assert.strictEqual(params.validator, validator, 'Validator reference should be passed');
            assert.equal(params.value, value, 'Correct value was passed');
            assert.equal(params.name, name, 'Name of Validator should be passed');
            assert.strictEqual(params.isValid, false, 'isValid was passed');
            assert.deepEqual(params.validationRules, [{
              index: 0,
              isValid: false,
              message: 'Login is required',
              type: 'required',
              validator: validator,
              value: value
            }], 'Correct rules were passed');
            assert.deepEqual(params.brokenRule, expectedFailedValidationRule, 'Failed rules were passed');
          });
          QUnit.test('Validated event should fire correctly after option runtime change', function(assert) {
            var value = '';
            var name = 'Login';
            var handlerAfterChange = sinon.stub();
            var validator = this.fixture.createValidator({
              name: name,
              validationRules: [{type: 'required'}]
            });
            validator.on('validated', handlerAfterChange);
            this.fixture.stubAdapter.getValue.returns(value);
            validator.validate();
            assert.ok(handlerAfterChange.calledOnce, 'Validated handler should be called after option change');
          });
          QUnit.test('optionChange raising', function(assert) {
            var optionChangeHandler = sinon.stub();
            var validator = this.fixture.createValidator({name: 'a'});
            validator.on('optionChanged', optionChangeHandler);
            validator.option('name', 'b');
            assert.ok(optionChangeHandler.calledOnce, 'optionChange event is raised');
          });
          QUnit.test('disposing raising', function(assert) {
            var disposingHandler = sinon.stub();
            var validator = this.fixture.createValidator({});
            validator.on('disposing', disposingHandler);
            this.fixture.teardown();
            assert.ok(disposingHandler.calledOnce, 'disposing event is raised');
          });
        });
      });
      QUnit.module('Custom Adapters', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        QUnit.test('Validator without adapter should throw exception', function(assert) {
          assert.throws(function() {
            this.fixture.createValidator({
              adapter: null,
              validationRules: [{type: 'required'}]
            });
          }, function(e) {
            return /E0120/.test(e.message);
          }, 'Exception messages should be readable');
        });
        QUnit.test('Attempt to set null adapter should throw exception', function(assert) {
          var that = this;
          var validator = that.fixture.createValidator({
            adapter: {
              getValue: noop,
              validationRequestsCallbacks: []
            },
            validationRules: [{type: 'required'}]
          });
          assert.throws(function() {
            validator.option('adapter', null);
          }, function(e) {
            return /E0120/.test(e.message);
          }, 'Exception messages should be readable');
        });
        QUnit.test('Validation happens on firing callback, results are shown by our widgets (dxValidationSummary)', function(assert) {
          var that = this;
          var adapter = {
            getValue: sinon.stub(),
            validationRequestsCallbacks: []
          };
          var validatedHandler = sinon.stub();
          that.fixture.createValidator({
            adapter: adapter,
            validationRules: [{type: 'required'}],
            onValidated: validatedHandler
          });
          adapter.getValue.returns('123');
          adapter.validationRequestsCallbacks.forEach(function(item) {
            return item();
          });
          assert.ok(adapter.getValue.calledOnce, 'Value should be requested');
          assert.ok(validatedHandler.calledOnce, 'Validated handler should be called');
        });
        QUnit.test('validator should validate value passed in the validation request', function(assert) {
          var that = this;
          var adapter = {
            getValue: sinon.stub(),
            validationRequestsCallbacks: []
          };
          var validatedHandler = sinon.stub();
          that.fixture.createValidator({
            adapter: adapter,
            validationRules: [{type: 'required'}],
            onValidated: validatedHandler
          });
          adapter.getValue.returns('123');
          adapter.validationRequestsCallbacks.forEach(function(item) {
            return item({value: ''});
          });
          assert.strictEqual(validatedHandler.firstCall.args[0].isValid, false, 'empty value should be validated');
        });
        QUnit.test('Validation happens on firing callback, result are applied through custom validator', function(assert) {
          var that = this;
          var adapter = {
            getValue: sinon.stub(),
            validationRequestsCallbacks: [],
            applyValidationResults: sinon.stub()
          };
          var validatedHandler = sinon.stub();
          that.fixture.createValidator({
            adapter: adapter,
            validationRules: [{type: 'required'}],
            onValidated: validatedHandler
          });
          adapter.getValue.returns('123');
          adapter.validationRequestsCallbacks.forEach(function(item) {
            return item();
          });
          assert.ok(adapter.getValue.calledOnce, 'Value should be requested');
          assert.ok(validatedHandler.calledOnce, 'Validated handler should be called');
          assert.ok(adapter.applyValidationResults.calledOnce, 'ApplyValidationResults function should be called');
        });
        QUnit.test('Validator should not be re-validated on pending with the same value', function(assert) {
          var adapter = {
            getValue: sinon.stub(),
            applyValidationResults: sinon.stub()
          };
          var validatedHandler = sinon.stub();
          var validator = this.fixture.createValidator({
            adapter: adapter,
            validationRules: [{
              type: 'async',
              validationCallback: function(params) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(true);
                }, 10);
                return d.promise();
              }
            }],
            onValidated: validatedHandler
          });
          var done = assert.async();
          adapter.getValue.returns('123');
          var result1 = validator.validate();
          var result2 = validator.validate();
          assert.strictEqual(result1.status, 'pending', 'result1.status === \'pending\'');
          assert.strictEqual(result1.id, result2.id, 'The result id\'s should be the same');
          assert.ok(isPromise(result1.complete), 'result1.complete is a Promise object');
          assert.strictEqual(result1.complete, result2.complete, 'result1.complete === result2.complete');
          result1.complete.then(function(res) {
            assert.strictEqual(result1.id, res.id, 'result1.id === res.id');
            assert.strictEqual(res.status, 'valid', 'res.status === \'valid\'');
            assert.ok(validatedHandler.calledOnce, 'Validated handler should be called');
            done();
          });
        });
        QUnit.test('Validator should resolve result.complete with the last value', function(assert) {
          var adapter = {
            getValue: sinon.stub(),
            applyValidationResults: sinon.stub()
          };
          var validatedHandler = sinon.stub();
          var validator = this.fixture.createValidator({
            adapter: adapter,
            validationRules: [{
              type: 'async',
              validationCallback: function(params) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(true);
                }, 10);
                return d.promise();
              }
            }],
            onValidated: validatedHandler
          });
          var done = assert.async();
          adapter.getValue.returns('123');
          var result1 = validator.validate();
          adapter.getValue.returns('1234');
          var result2 = validator.validate();
          assert.strictEqual(result1.status, 'pending', 'result1.status === \'pending\'');
          assert.notStrictEqual(result1, result2, 'Results should be different');
          assert.strictEqual(result1.complete, result2.complete, 'result1.complete === result2.complete');
          result2.complete.then(function(resolvedResult) {
            assert.notStrictEqual(resolvedResult.id, result1.id, 'result1 should not equal resolved result');
            assert.strictEqual(result2.id, resolvedResult.id, 'result2 should equal resolved result');
            assert.ok(validatedHandler.calledOnce, 'Validated handler should be called once');
            assert.strictEqual(result2.value, resolvedResult.value, 'result2.value === resolvedResult.value');
            done();
          });
        });
        QUnit.test('Validation happens on firing callback when validationRequestsCallbacks is array', function(assert) {
          var that = this;
          var adapter = {
            getValue: sinon.stub(),
            validationRequestsCallbacks: []
          };
          that.fixture.createValidator({
            adapter: adapter,
            validationRules: [{type: 'required'}]
          });
          adapter.getValue.returns('123');
          adapter.validationRequestsCallbacks.forEach(function(item) {
            item();
          });
          assert.ok(adapter.getValue.calledOnce, 'Value should be requested');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/class","ui/validation/default_adapter","ui/validation_engine","core/utils/deferred","core/utils/type","core/config","ui/validator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/class"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("core/utils/deferred"), require("core/utils/type"), require("core/config"), require("ui/validator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validator.tests.js.map