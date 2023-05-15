!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validationGroup.markup.tests.js"], ["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validation_group"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validationGroup.markup.tests.js", ["jquery", "core/class", "ui/validation/default_adapter", "ui/validation_engine", "ui/validation_group"], function($__export) {
  "use strict";
  var $,
      Class,
      DefaultAdapter,
      ValidationEngine,
      Fixture,
      testStart,
      test,
      testModule;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__3;
      Fixture = Class.inherit({
        ctor: function() {
          ValidationEngine.initGroups();
          this.originalValidationGroupFunction = ValidationEngine.validateGroup;
        },
        teardown: function() {
          ValidationEngine.validateGroup = this.originalValidationGroupFunction;
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
        },
        disposeGroup: function() {
          this.$groupContainer.dxValidationGroup('_dispose');
        },
        createValidatorInGroup: function() {
          var $container = $('<div/>');
          $container.appendTo(this.$groupContainer);
          return $container.dxValidator({adapter: sinon.createStubInstance(DefaultAdapter)}).dxValidator('instance');
        }
      });
      (($__3 = QUnit, testStart = $__3.testStart, test = $__3.test, testModule = $__3.module, $__3));
      testStart(function() {
        $('#qunit-fixture').html('<div id="dxValidationGroup"></div>');
      });
      testModule('General', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        test('dxValidationGroup can be created', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          assert.ok(group, 'Group should be instantiated');
          assert.ok($container.hasClass('dx-validationgroup'), 'Specific class should be added');
        });
        test('dxValidationGroup should not remove container content', function(assert) {
          var $container = $('#dxValidationGroup');
          $('<img/>').appendTo($container);
          this.fixture.createGroup($container);
          assert.equal($container.find('img').length, 1, 'Image inside of container should remain untouched');
        });
        test('dxValidator can be validated as part of dxValidationGroup', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var validator = this.fixture.createValidatorInGroup();
          validator.validate = sinon.spy(validator.validate);
          ValidationEngine.validateGroup(group);
          assert.ok(validator.validate.calledOnce, 'Validator should be validated as part of group');
        });
        test('dxValidator should be registered as part of dxValidationGroup - when dxValidationGroup was created after dxValidator', function(assert) {
          var $container = $('#dxValidationGroup');
          this.fixture.createValidationGroupContainer($container);
          var validator = this.fixture.createValidatorInGroup();
          var group = this.fixture.createGroup();
          var defaultGroupConfig = ValidationEngine.getGroupConfig(undefined);
          validator.validate = sinon.spy(validator.validate);
          ValidationEngine.validateGroup(group);
          assert.strictEqual(defaultGroupConfig.validators.length, 0, 'Validator should be deregistered in default group');
          assert.ok(validator.validate.calledOnce, 'Validator should be validated as part of group');
        });
        test('dxValidationGroup can be disposed, container should be cleared (T199232)', function(assert) {
          var $container = $('#dxValidationGroup');
          this.fixture.createGroup($container);
          this.fixture.disposeGroup();
          assert.notOk($container.hasClass('dx-validationgroup'), 'Specific class should be added');
        });
        test('dxValidator can be reset as part of dxValidationGroup', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var validator = this.fixture.createValidatorInGroup();
          validator.reset = sinon.spy(validator.reset);
          group.reset();
          assert.ok(validator.reset.calledOnce, 'Validator should be reset as part of group');
        });
      });
      testModule('API', {
        beforeEach: function() {
          this.fixture = new Fixture();
        },
        afterEach: function() {
          this.fixture.teardown();
        }
      }, function() {
        test('group.validate', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          this.fixture.createValidatorInGroup();
          ValidationEngine.validateGroup = sinon.spy(ValidationEngine.validateGroup);
          var result = group.validate();
          assert.ok(result, 'Result should be returned');
          assert.ok(ValidationEngine.validateGroup.calledOnce, 'validatorGroup should be called');
          assert.equal(ValidationEngine.validateGroup.getCall(0).args[0], group, 'correct group key should be passed');
        });
        test('empty validation group should return valid \'validationResult\' object', function(assert) {
          var $container = $('#dxValidationGroup');
          var group = this.fixture.createGroup($container);
          var $__4 = group.validate(),
              isValid = $__4.isValid,
              brokenRules = $__4.brokenRules,
              validators = $__4.validators;
          assert.ok(isValid, 'empty group is valid');
          assert.deepEqual(brokenRules, [], 'empty group doesn\'t have broken rules');
          assert.deepEqual(validators, [], 'empty group doesn\'t have validators');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validation_group"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/class"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("ui/validation_group"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationGroup.markup.tests.js.map