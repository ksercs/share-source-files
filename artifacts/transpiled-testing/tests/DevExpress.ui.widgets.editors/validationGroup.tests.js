!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validationGroup.tests.js"], ["core/class","core/utils/deferred","events/visibility_change","jquery","ui/validation/default_adapter","ui/validation_engine","ui/validation_group"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validationGroup.tests.js", ["core/class", "core/utils/deferred", "events/visibility_change", "jquery", "ui/validation/default_adapter", "ui/validation_engine", "ui/validation_group"], function($__export) {
  "use strict";
  var Class,
      Deferred,
      triggerShownEvent,
      $,
      DefaultAdapter,
      ValidationEngine,
      Fixture;
  return {
    setters: [function($__m) {
      Class = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {}],
    execute: function() {
      Fixture = Class.inherit({
        ctor: function() {
          ValidationEngine.initGroups();
          this.originalValidationGroupFunction = ValidationEngine.validateGroup;
        },
        createValidationGroupContainer: function(container) {
          if (container) {
            this.$groupContainer = $(container);
          }
        },
        createGroup: function(container) {
          this.createValidationGroupContainer(container);
          var group = this.$groupContainer.dxValidationGroup().dxValidationGroup('instance');
          return group;
        }
      });
      QUnit.testStart(function() {
        $('#qunit-fixture').html('<div id="dxValidationGroup"></div>');
      });
      QUnit.module('General', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        QUnit.test('validator should find group after dxshown event is triggered', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var $validator = $('<div>').dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)});
          var validator = $validator.dxValidator('instance');
          validator.validate = sinon.spy(validator.validate);
          $validator.appendTo($container);
          triggerShownEvent($container);
          ValidationEngine.validateGroup(group);
          assert.ok(validator.validate.calledOnce, 'Validator should be validated as part of group');
        });
        QUnit.test('validator should work a part of a validation group if they are created on the same element (T1102012)', function(assert) {
          var $groupContainer = $('#dxValidationGroup');
          var group = this.fixture.createGroup($groupContainer);
          var $validator = $groupContainer.dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)});
          var validator = $validator.dxValidator('instance');
          validator.validate = sinon.spy(validator.validate);
          triggerShownEvent($groupContainer);
          ValidationEngine.validateGroup(group);
          assert.ok(validator.validate.calledOnce, 'Validator should be validated as part of group');
        });
        QUnit.test('group should be validated positively (async)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var adapter = sinon.createStubInstance(DefaultAdapter);
          var $validator = $('<div>').dxValidator({
            adapter: adapter,
            validationRules: [{
              type: 'async',
              validationCallback: function(params) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(true);
                }, 100);
                return d.promise();
              }
            }]
          });
          var validator = $validator.dxValidator('instance');
          var done = assert.async();
          adapter.getValue.returns('123');
          $validator.appendTo($container);
          triggerShownEvent($container);
          var result = ValidationEngine.validateGroup(group);
          assert.ok(result.isValid, 'result.isValid == true');
          assert.strictEqual(result.brokenRules.length, 0, 'result.brokenRules empty');
          assert.strictEqual(result.validators.length, 1, 'result.validators contains one validator');
          assert.strictEqual(result.validators[0], validator, 'result.validators contains the required validator');
          assert.strictEqual(result.status, 'pending', 'result.status === \'pending\'');
          assert.ok(result.complete, 'result.complete != null');
          result.complete.then(function(res) {
            assert.ok(res.isValid, 'res.isValid === true');
            assert.strictEqual(res.brokenRules.length, 0, 'res.brokenRules empty');
            assert.strictEqual(res.validators.length, 1, 'res.validators contains one validator');
            assert.strictEqual(res.validators[0], validator, 'res.validators contains the required validator');
            assert.strictEqual(res.status, 'valid', 'res.status === \'valid\'');
            assert.notOk(res.complete, 'res.complete === null');
            done();
          });
        });
        QUnit.test('group should be validated negatively (async)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var adapter = sinon.createStubInstance(DefaultAdapter);
          var message = 'test message';
          var $validator = $('<div>').dxValidator({
            adapter: adapter,
            validationRules: [{
              type: 'async',
              validationCallback: function(params) {
                var d = new Deferred();
                setTimeout(function() {
                  d.reject({
                    isValid: false,
                    message: message
                  });
                }, 100);
                return d.promise();
              }
            }]
          });
          var validator = $validator.dxValidator('instance');
          var done = assert.async();
          adapter.getValue.returns('123');
          $validator.appendTo($container);
          triggerShownEvent($container);
          var result = ValidationEngine.validateGroup(group);
          assert.ok(result.isValid, 'result.isValid == true');
          assert.strictEqual(result.brokenRules.length, 0, 'result.brokenRules empty');
          assert.strictEqual(result.validators.length, 1, 'result.validators contains one validator');
          assert.strictEqual(result.validators[0], validator, 'result.validators contains the required validator');
          assert.strictEqual(result.status, 'pending', 'result.status === \'pending\'');
          assert.ok(result.complete, 'result.complete != null');
          result.complete.then(function(res) {
            assert.notOk(res.isValid, 'res.isValid === false');
            assert.strictEqual(res.brokenRules.length, 1, 'res.brokenRules contains a sinble gule');
            assert.strictEqual(res.brokenRules[0].message, message, 'res.brokenRules[0].message === messagbe');
            assert.strictEqual(res.validators.length, 1, 'res.validators contains one validator');
            assert.strictEqual(res.validators[0], validator, 'res.validators contains the required validator');
            assert.strictEqual(res.status, 'invalid', 'res.status === \'invalid\'');
            assert.notOk(res.complete, 'res.complete === null');
            done();
          });
        });
        QUnit.test('group should be validated positively after removing the only pending validator (async)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var $validator1 = $('<div>').dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)});
          var validator1 = $validator1.dxValidator('instance');
          var $validator2 = $('<div>').dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)});
          var validator2 = $validator2.dxValidator('instance');
          var done = assert.async();
          validator1.validate = sinon.stub();
          validator1.validate.returns({
            value: '',
            brokenRules: null,
            isValid: true,
            validationRules: [],
            pendingRules: [],
            status: 'pending',
            complete: new Deferred().promise()
          });
          validator2.validate = sinon.stub();
          validator2.validate.returns({
            value: '',
            brokenRules: null,
            isValid: true,
            validationRules: [],
            pendingRules: null,
            status: 'valid',
            complete: null
          });
          $validator1.appendTo($container);
          $validator2.appendTo($container);
          triggerShownEvent($container);
          var result = ValidationEngine.validateGroup(group);
          assert.ok(result.isValid, 'result.isValid == true');
          assert.strictEqual(result.brokenRules.length, 0, 'result.brokenRules empty');
          assert.strictEqual(result.validators.length, 2, 'result.validators contains two validators');
          assert.strictEqual(result.validators[0], validator1, 'result.validators[0] === validator1');
          assert.strictEqual(result.validators[1], validator2, 'result.validators[1] === validator2');
          assert.strictEqual(result.status, 'pending', 'result.status === \'pending\'');
          assert.ok(result.complete, 'result.complete != null');
          result.complete.then(function(res) {
            assert.ok(res.isValid, 'res.isValid === true');
            assert.strictEqual(res.brokenRules.length, 0, 'res.brokenRules empty');
            assert.strictEqual(res.validators.length, 1, 'res.validators contains one validator');
            assert.strictEqual(res.validators[0], validator2, 'res.validators[0] === validator2');
            assert.strictEqual(res.status, 'valid', 'res.status === \'valid\'');
            assert.notOk(res.complete, 'res.complete === null');
            done();
          });
          ValidationEngine.removeRegisteredValidator(group, validator1);
        });
        QUnit.test('group should be validated without non-actual cache on validator removing (T1006292)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var adapter = sinon.createStubInstance(DefaultAdapter);
          var callbackCallCount = 0;
          var $validator1 = $('<div>').dxValidator({
            adapter: adapter,
            validationRules: [{
              type: 'custom',
              reevaluate: true,
              validationCallback: function() {
                if (callbackCallCount === 0) {
                  ++callbackCallCount;
                  return false;
                }
                return true;
              }
            }]
          });
          var validator1 = $validator1.dxValidator('instance');
          var $validator2 = $('<div>').dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)});
          var validator2 = $validator2.dxValidator('instance');
          $validator1.appendTo($container);
          $validator2.appendTo($container);
          triggerShownEvent($container);
          ValidationEngine.validateGroup(group);
          validator1.validate();
          ValidationEngine.getGroupConfig(group).on('validated', function($__2) {
            var isValid = $__2.isValid;
            assert.ok(isValid, 'validation is correct');
          });
          ValidationEngine.removeRegisteredValidator(group, validator2);
        });
        QUnit.test('group should be validated positively after all validators remove (T1006667)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var adapter = sinon.createStubInstance(DefaultAdapter);
          var $validator1 = $('<div>').dxValidator({
            adapter: adapter,
            validationRules: [{
              type: 'custom',
              validationCallback: function() {
                return false;
              }
            }]
          });
          var validator1 = $validator1.dxValidator('instance');
          var $validator2 = $('<div>').dxValidator({
            adapter: sinon.createStubInstance(DefaultAdapter),
            validationRules: [{
              type: 'custom',
              validationCallback: function() {
                return false;
              }
            }]
          });
          var validator2 = $validator2.dxValidator('instance');
          $validator1.appendTo($container);
          $validator2.appendTo($container);
          triggerShownEvent($container);
          ValidationEngine.validateGroup(group);
          ValidationEngine.removeRegisteredValidator(group, validator1);
          ValidationEngine.getGroupConfig(group).on('validated', function($__2) {
            var isValid = $__2.isValid;
            assert.ok(isValid, 'validation is correct');
          });
          ValidationEngine.removeRegisteredValidator(group, validator2);
        });
        QUnit.test('group should be validated positively with a new validator (async)', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var adapter = sinon.createStubInstance(DefaultAdapter);
          var $validator1 = $('<div>').dxValidator({
            adapter: adapter,
            validationRules: [{
              type: 'async',
              validationCallback: function(params) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(true);
                }, 100);
                return d.promise();
              }
            }]
          });
          var validator1 = $validator1.dxValidator('instance');
          var validator2 = $('<div>').dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)}).dxValidator('instance');
          var done = assert.async();
          $validator1.appendTo($container);
          triggerShownEvent($container);
          var result = ValidationEngine.validateGroup(group);
          assert.strictEqual(result.validators.length, 1, 'result.validators contains one validator');
          assert.strictEqual(result.validators[0], validator1, 'result.validators[0] === validator1');
          assert.strictEqual(result.status, 'pending', 'result.status === \'pending\'');
          assert.ok(result.complete, 'result.complete != null');
          result.complete.then(function(res) {
            assert.strictEqual(res.validators.length, 2, 'res.validators contains two validators');
            assert.strictEqual(res.validators[0], validator1, 'res.validators[0] === validator1');
            assert.strictEqual(res.validators[1], validator2, 'res.validators[1] === validator2');
            assert.strictEqual(res.status, 'valid', 'res.status === \'valid\'');
            assert.notOk(res.complete, 'res.complete === null');
            done();
          });
          ValidationEngine.registerValidatorInGroup(group, validator2);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/class","core/utils/deferred","events/visibility_change","jquery","ui/validation/default_adapter","ui/validation_engine","ui/validation_group"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/class"), require("core/utils/deferred"), require("events/visibility_change"), require("jquery"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("ui/validation_group"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationGroup.tests.js.map