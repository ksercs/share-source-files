!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validationSummary.markup.tests.js"], ["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validator","ui/validation_summary"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validationSummary.markup.tests.js", ["jquery", "core/class", "ui/validation/default_adapter", "ui/validation_engine", "ui/validator", "ui/validation_summary"], function($__export) {
  "use strict";
  var $,
      Class,
      DefaultAdapter,
      ValidationEngine,
      Validator,
      Fixture;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      DefaultAdapter = $__m.default;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      Validator = $__m.default;
    }, function($__m) {}],
    execute: function() {
      Fixture = Class.inherit({
        createSummary: function(container, options) {
          this.$summaryContainer = $(container || '#dxSummary');
          return this.$summaryContainer.dxValidationSummary($.extend({}, options)).dxValidationSummary('instance');
        },
        createValidator: function(validatorOptions) {
          var $container = $('<div/>');
          this.stubAdapter = sinon.createStubInstance(DefaultAdapter);
          $container.appendTo('#qunit-fixture');
          return $container.dxValidator($.extend({adapter: this.stubAdapter}, validatorOptions)).dxValidator('instance');
        }
      });
      QUnit.testStart(function() {
        var markup = '\
    <div id="dxSummary"></div>\
    <div data-bind="dxValidationGroup: {}">\
        <div id="knockoutSummary" data-bind="dxValidationSummary: {}"></div>\
    </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('General', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        QUnit.test('Widget can be created via jQuery', function(assert) {
          var summary = this.fixture.createSummary();
          assert.ok(summary, 'Summary can be created');
        });
        QUnit.test('Widget can be empty by default', function(assert) {
          var summary = this.fixture.createSummary();
          assert.strictEqual(this.fixture.$summaryContainer.find('.dx-empty-message').length, 0, 'Validation Summary should be empty by default');
          assert.ok(summary, 'Summary can be created');
        });
        QUnit.test('Summary can subscribe on group\'s Validated event', function(assert) {
          var group = 'group1';
          var validator = sinon.createStubInstance(Validator);
          validator.validate.returns({
            isValid: true,
            brokenRule: null
          });
          ValidationEngine.registerValidatorInGroup(group, validator);
          var summary = this.fixture.createSummary(null, {validationGroup: group});
          summary._groupValidationHandler = sinon.spy();
          summary.refreshValidationGroup();
          ValidationEngine.validateGroup(group);
          assert.ok(summary._groupValidationHandler.calledOnce, 'Handler should be called');
          var params = summary._groupValidationHandler.getCall(0).args[0];
          assert.ok(summary._groupValidationHandler.calledOnce, 'Handler should be called');
          assert.ok(summary._groupValidationHandler.calledOn(summary), 'Handler should be called');
          assert.strictEqual(params.isValid, true, 'IsValid should be passed');
          assert.ok(!params.brokenRule, 'brokenRule should be null');
        });
        QUnit.test('Items retrieved in handler', function(assert) {
          var validator = sinon.createStubInstance(Validator);
          var summary = this.fixture.createSummary();
          var message = 'test message';
          summary._groupValidationHandler({
            isValid: false,
            brokenRules: [{
              type: 'required',
              message: message,
              validator: validator
            }],
            validators: [validator]
          });
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 1, 'Single item');
          assert.equal(items[0].text, message, 'Message should be transformed');
        });
        QUnit.test('Items should be grouped by validator', function(assert) {
          var summary = this.fixture.createSummary();
          var validator1 = sinon.createStubInstance(Validator);
          var validator2 = sinon.createStubInstance(Validator);
          var message = 'test message';
          summary._groupValidationHandler({
            isValid: false,
            brokenRules: [{
              type: 'async',
              message: message + '1-1',
              validator: validator1
            }, {
              type: 'required',
              message: message + '2',
              validator: validator2
            }, {
              type: 'async',
              message: message + '1-2',
              validator: validator1
            }],
            validators: [validator1, validator2]
          });
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 3, 'Three messaged should be shown(several per validator)');
          assert.equal(items[0].text, message + '1-1', 'Message should be transformed');
          assert.equal(items[1].text, message + '1-2', 'Message should be transformed');
          assert.equal(items[2].text, message + '2', 'Message should be transformed');
        });
        QUnit.test('Item click should focus on validator', function(assert) {
          var summary = this.fixture.createSummary();
          var validator = sinon.createStubInstance(Validator);
          summary._groupValidationHandler({
            isValid: false,
            brokenRules: [{
              type: 'required',
              validator: validator
            }],
            validators: [validator]
          });
          var itemElements = this.fixture.$summaryContainer.find('.dx-validationsummary-item');
          assert.equal(itemElements.length, 1, 'Single item element should be rendered');
          itemElements.trigger('click');
          assert.ok(validator.focus.calledOnce, 'Validator should be focused');
        });
      });
      QUnit.module('Regression', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        QUnit.test('T195049: validationGroup should be passed by reference', function(assert) {
          var group = {text: 'quite complex validation group object'};
          var summary = this.fixture.createSummary(null, {validationGroup: group});
          assert.ok(summary, 'Summary can be created');
          assert.strictEqual(group, summary.option('validationGroup'));
        });
        QUnit.test('T212238: Summary can subscribe on group\'s Validated event when Summary is created before any validator in group', function(assert) {
          var group = 'group1';
          var validator = sinon.createStubInstance(Validator);
          validator.validate.returns({
            isValid: true,
            brokenRule: null
          });
          var summary = this.fixture.createSummary(null, {validationGroup: group});
          summary._groupValidationHandler = sinon.spy();
          summary.refreshValidationGroup();
          ValidationEngine.registerValidatorInGroup(group, validator);
          ValidationEngine.validateGroup(group);
          assert.ok(summary._groupValidationHandler.calledOnce, 'Handler should be called');
          var params = summary._groupValidationHandler.getCall(0).args[0];
          assert.ok(summary._groupValidationHandler.calledOnce, 'Handler should be called');
          assert.ok(summary._groupValidationHandler.calledOn(summary), 'Handler should be called');
          assert.strictEqual(params.isValid, true, 'IsValid should be passed');
          assert.ok(!params.brokenRule, 'brokenRule should be null');
        });
        QUnit.test('dxValidationSummary should be able to reinit group registration and subscribe to new group', function(assert) {
          var group = 'group1';
          var summary = this.fixture.createSummary(null, {validationGroup: undefined});
          summary._groupValidationHandler = sinon.spy();
          summary.option('validationGroup', group);
          ValidationEngine.getGroupConfig(group).validate();
          assert.ok(summary._groupValidationHandler.calledOnce, 'Handler should be called');
        });
        QUnit.test('dxValidationSummary should be able to reinit group registration and unsubscribe old group', function(assert) {
          var group = 'group1';
          var summary = this.fixture.createSummary(null, {validationGroup: undefined});
          summary._groupValidationHandler = sinon.spy();
          summary.option('validationGroup', group);
          ValidationEngine.getGroupConfig(undefined).validate();
          assert.ok(summary._groupValidationHandler.notCalled, 'Handler should not be called');
        });
      });
      QUnit.module('Update on validator\'s validation', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        QUnit.test('Summary should be updated after validator validation', function(assert) {
          var message = 'test message';
          var validator1 = this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + ' required'
            }, {
              type: 'range',
              min: 10,
              message: message + ' range'
            }]
          });
          this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + '2'
            }]
          });
          var summary = this.fixture.createSummary(null, {validationGroup: 'group1'});
          ValidationEngine.validateGroup('group1');
          validator1.option('adapter').getValue.returns('1');
          validator1.validate();
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 2, 'Two messages should be shown (one message per validator)');
          assert.equal(items[0].text, message + ' range', 'Message should be updated');
        });
        QUnit.test('Message from valid item should be removed', function(assert) {
          var message = 'test message';
          var validator1 = this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + ' required'
            }, {
              type: 'range',
              min: 10,
              message: message + ' range'
            }]
          });
          this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + '2'
            }]
          });
          var summary = this.fixture.createSummary(null, {validationGroup: 'group1'});
          ValidationEngine.validateGroup('group1');
          validator1.option('adapter').getValue.returns('100500');
          validator1.validate();
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 1, 'Two messages only should be shown (one message per validator)');
          assert.equal(items[0].text, message + '2', 'Message should be updated');
        });
        QUnit.test('Message of originally valid item should be added when it becomes invalid', function(assert) {
          var message = 'test message';
          var validator1 = this.fixture.createValidator({
            value: '100500',
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message
            }]
          });
          var summary = this.fixture.createSummary(null, {validationGroup: 'group1'});
          ValidationEngine.validateGroup('group1');
          validator1.option('adapter').getValue.returns('');
          validator1.validate();
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 1, 'Single message should be shown');
          assert.equal(items[0].text, message, 'Message should be updated');
        });
        QUnit.test('T437697: dxValidationSummary - adapter focus is not a function', function(assert) {
          try {
            var message = 'test message';
            var validator1 = this.fixture.createValidator({
              adapter: {
                getValue: function() {
                  return 123;
                },
                validationRequestsCallbacks: [],
                applyValidationResults: false
              },
              validationGroup: 'group1',
              validationRules: [{
                type: 'required',
                message: message
              }]
            });
            this.fixture.createSummary(null, {validationGroup: 'group1'});
            ValidationEngine.validateGroup('group1');
            validator1.validate();
            validator1.focus();
            assert.ok(true, 'focus defined');
          } catch (e) {
            assert.ok(false, e);
          }
        });
        QUnit.test('Order of items in Summary should match order of validators', function(assert) {
          var message = 'test message';
          var validator1 = this.fixture.createValidator({
            value: 'correct value',
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + ' 1'
            }]
          });
          this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{
              type: 'required',
              message: message + ' 2'
            }]
          });
          var summary = this.fixture.createSummary(null, {validationGroup: 'group1'});
          ValidationEngine.validateGroup('group1');
          validator1.option('adapter').getValue.returns('');
          validator1.validate();
          var items = summary.option('items');
          assert.ok(items, 'Items should exists');
          assert.equal(items.length, 2, 'Two messages should be shown (one message per validator)');
          assert.equal(items[0].text, message + ' 1', 'Message should be updated');
          assert.equal(items[1].text, message + ' 2', 'Message should be updated');
        });
        QUnit.test('T270338: Summary should subscribe to validator\'s events only once', function(assert) {
          var validator1 = this.fixture.createValidator({
            validationGroup: 'group1',
            validationRules: [{type: 'required'}]
          });
          var summary = this.fixture.createSummary(null, {validationGroup: 'group1'});
          var spy = sinon.spy(summary, '_itemValidationHandler');
          ValidationEngine.validateGroup('group1');
          ValidationEngine.validateGroup('group1');
          spy.reset();
          validator1.validate();
          assert.equal(spy.callCount, 1, 'Render of validation summary should be called only once');
        });
        QUnit.test('T270338 - the \'items\' option changed should not be called if validator state is not changed', function(assert) {
          var itemsChangedCallCount = 0;
          var validator = this.fixture.createValidator({
            validationGroup: 'group',
            validationRules: [{type: 'required'}]
          });
          this.fixture.createSummary(null, {
            validationGroup: 'group',
            onOptionChanged: function(args) {
              if (args.name === 'items') {
                itemsChangedCallCount++;
              }
            }
          });
          ValidationEngine.validateGroup('group');
          validator.validate();
          assert.equal(itemsChangedCallCount, 1, 'items should not be changed if the validator state is not changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validator","ui/validation_summary"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/class"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("ui/validator"), require("ui/validation_summary"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationSummary.markup.tests.js.map