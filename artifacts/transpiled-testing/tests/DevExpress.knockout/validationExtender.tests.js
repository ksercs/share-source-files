!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/validationExtender.tests.js"], ["jquery","ui/editor/editor","ui/validation_group","ui/validation_engine","core/component_registrator","core/utils/type","knockout","core/utils/deferred","ui/button","integration/knockout"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.knockout/validationExtender.tests.js", ["jquery", "ui/editor/editor", "ui/validation_group", "ui/validation_engine", "core/component_registrator", "core/utils/type", "knockout", "core/utils/deferred", "ui/button", "integration/knockout"], function($__export) {
  "use strict";
  var $,
      Editor,
      ValidationGroup,
      ValidationEngine,
      registerComponent,
      isPromise,
      ko,
      Deferred,
      moduleWithoutCsp,
      FIXTURE_ELEMENT;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Editor = $__m.default;
    }, function($__m) {
      ValidationGroup = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      isPromise = $__m.isPromise;
    }, function($__m) {
      ko = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;
      FIXTURE_ELEMENT = $('<div id=qunit-fixture></div>').appendTo('body');
      moduleWithoutCsp('Ko Extender');
      QUnit.test('dxValidator should be stuck to observable', function(assert) {
        var vm = {login: ko.observable('test').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        assert.ok(vm.login.dxValidator, 'dxValidator should be added to observable');
        assert.ok(vm.login.dxValidator.validate, 'dxValidator should have \'validate\' method');
        assert.ok(vm.login.dxValidator.on, 'dxValidator should have \'on\' method');
      });
      QUnit.test('Engine can subscribe to validate group', function(assert) {
        var vm = {login: ko.observable('test').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        ValidationEngine.registerModelForValidation(vm);
        var groupConfig = ValidationEngine.getGroupConfig(vm);
        assert.ok(groupConfig, 'Config should be retrieved');
        assert.equal(groupConfig.validators.length, 1, 'Single validator should be registered');
        assert.strictEqual(groupConfig.validators[0], vm.login.dxValidator, 'Correct validator should be passed');
      });
      QUnit.test('Engine can validate model', function(assert) {
        var vm = {login: ko.observable('').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        ValidationEngine.registerModelForValidation(vm);
        var result = ValidationEngine.validateModel(vm);
        assert.ok(result, 'Result should be retrieved');
        assert.strictEqual(result.isValid, false, 'Validation should not pass');
        assert.strictEqual(ValidationEngine.validateGroup, ValidationEngine.validateModel, 'Completely incorrect test of technical implementation');
        assert.strictEqual(result.brokenRules.length, 1, 'One rule should be broken');
        assert.strictEqual(result.brokenRules[0].validator, vm.login.dxValidator, 'Validator should be included into the rule');
      });
      QUnit.test('Unregister knockout model for validation', function(assert) {
        var vm = {login: ko.observable('test').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        ValidationEngine.registerModelForValidation(vm);
        var groupConfig = ValidationEngine.getGroupConfig(vm);
        assert.equal(groupConfig.validators.length, 1, 'Single validator should be registered');
        ValidationEngine.unregisterModelForValidation(vm);
        assert.equal(groupConfig.validators.length, 0, 'Validators should be unregistered');
      });
      QUnit.test('validated handler should be called', function(assert) {
        var vm = {login: ko.observable('').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        var validatedHandler = sinon.stub();
        vm.login.dxValidator.on('validated', validatedHandler);
        vm.login.dxValidator.validate();
        assert.ok(validatedHandler.calledOnce, 'Handler should be called');
        var args = validatedHandler.getCall(0).args;
        assert.ok(args, 'Args should be passed');
        assert.strictEqual(args[0].value, '', 'Value should be passed');
        assert.strictEqual(args[0].isValid, false, 'validation result should be passed');
        assert.strictEqual(args[0].validator, vm.login.dxValidator, 'validation result should be passed');
      });
      QUnit.test('changing observable value should cause validation', function(assert) {
        var vm = {login: ko.observable('').extend({dxValidator: {validationRules: [{type: 'required'}]}})};
        var validatedHandler = sinon.stub();
        vm.login.dxValidator.on('validated', validatedHandler);
        vm.login('new value');
        assert.ok(validatedHandler.calledOnce, 'Handler should be called');
        var args = validatedHandler.getCall(0).args;
        assert.ok(args, 'Args should be passed');
        assert.strictEqual(args[0].value, 'new value', 'Value should be passed');
      });
      QUnit.test('Model should be found as a validation group', function(assert) {
        var vm = {};
        var $buttonContainer = $('<div></div>').attr('data-bind', 'dxButton: { }').appendTo(FIXTURE_ELEMENT);
        ko.applyBindings(vm, $buttonContainer[0]);
        var group = $buttonContainer.dxButton('_findGroup');
        assert.strictEqual(group, vm, 'View model should be found as a group');
      });
      QUnit.test('dxValidationGroup should win Model', function(assert) {
        var vm = {};
        var $groupContainer = $('<div></div>').attr('data-bind', 'dxValidationGroup: { }').appendTo(FIXTURE_ELEMENT);
        var $buttonContainer = $('<div></div>').attr('data-bind', 'dxButton: { }').appendTo($groupContainer);
        ko.applyBindings(vm, $groupContainer[0]);
        var groupInstance = new ValidationGroup($groupContainer);
        var group = $buttonContainer.dxButton('_findGroup');
        assert.strictEqual(group, groupInstance, 'dxValidationGroup should be found as a group');
      });
      QUnit.test('validationGroup string key should win Model', function(assert) {
        var vm = {};
        var $buttonContainer = $('<div></div>').attr('data-bind', 'dxButton: { validationGroup: \'uniqueGroupKey\' }').appendTo(FIXTURE_ELEMENT);
        ko.applyBindings(vm, $buttonContainer[0]);
        var group = $buttonContainer.dxButton('_findGroup');
        assert.strictEqual(group, 'uniqueGroupKey', 'validationGroup option should be found as a group');
      });
      QUnit.test('dxValidator binding handler should be evaluated after editor binding', function(assert) {
        assert.expect(1);
        registerComponent('dxTestEditor', {}, Editor.inherit({ctor: function() {
            this.callBase.apply(this, arguments);
            assert.ok(!this.$element().data('dxValidator'));
          }}));
        var $editor = $('<div data-bind=\'dxValidator: { adapter: { } }, dxTestEditor: { }\'></div>').appendTo(FIXTURE_ELEMENT);
        ko.applyBindings({}, $editor.get(0));
      });
      QUnit.test('Validator can be reset', function(assert) {
        var vm = {login: ko.observable('testuser').extend({dxValidator: {validationRules: [{
                type: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]}})};
        var validator = vm.login.dxValidator;
        validator.validate();
        validator.reset();
        assert.strictEqual(validator.isValid(), true, 'isValid - Validation should be restored in valid state');
        assert.strictEqual(validator.validationError(), null, 'validationRule - Validation should be restored in valid state');
        assert.strictEqual(vm.login(), null, 'Value should be reset');
      });
      QUnit.test('T437697: dxValidationSummary - validator.focus is not a function', function(assert) {
        try {
          var vm = {
            buttonSettings: {
              text: 'Test',
              onClick: function(params) {
                params.validationGroup.validate();
              }
            },
            textBoxValue: ko.observable('').extend({dxValidator: {validationRules: [{type: 'required'}]}})
          };
          $('<div></div>').attr('data-bind', 'dxTextBox: { value: viewModel.textBoxValue, isValid: viewModel.textBoxValue.dxValidator.isValid, validationError: viewModel.textBoxValue.dxValidator.validationError }').appendTo(FIXTURE_ELEMENT);
          $('<div></div>').attr('data-bind', 'dxButton: { text: \'Test\', onClick: function(params) { params.validationGroup.validate(); }}').appendTo(FIXTURE_ELEMENT);
          $('<div></div>').attr('data-bind', 'dxValidationSummary: {}').appendTo(FIXTURE_ELEMENT);
          ValidationEngine.registerModelForValidation(vm);
          ko.applyBindings(vm, document.getElementById('qunit-fixture'));
          $('.dx-button').click();
          $('.dx-validationsummary-item').click();
          assert.ok(true, 'focus defined');
          ValidationEngine.unregisterModelForValidation(vm);
          ko.cleanNode('qunit-fixture');
        } catch (e) {
          assert.ok(false, e);
        }
      });
      QUnit.test('Validator should be validated positively (async)', function(assert) {
        var vm = {login: ko.observable('testuser').extend({dxValidator: {validationRules: [{
                type: 'async',
                validationCallback: function() {
                  var d = new Deferred();
                  setTimeout(function() {
                    d.resolve();
                  }, 10);
                  return d.promise();
                }
              }]}})};
        var done = assert.async();
        var validator = vm.login.dxValidator;
        var result = validator.validate();
        assert.strictEqual(result.isValid, true, 'result.isValid === true');
        assert.ok(isPromise(result.complete), 'result.complete is a promise object');
        result.complete.then(function(res) {
          assert.strictEqual(result.id, res.id, 'result.id === res.id');
          done();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/editor/editor","ui/validation_group","ui/validation_engine","core/component_registrator","core/utils/type","knockout","core/utils/deferred","ui/button","integration/knockout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/editor/editor"), require("ui/validation_group"), require("ui/validation_engine"), require("core/component_registrator"), require("core/utils/type"), require("knockout"), require("core/utils/deferred"), require("ui/button"), require("integration/knockout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationExtender.tests.js.map