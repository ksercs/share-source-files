!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validationSummary.tests.js"], ["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validator","ui/validation_summary","ui/text_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validationSummary.tests.js", ["jquery", "core/class", "ui/validation/default_adapter", "ui/validation_engine", "ui/validator", "ui/validation_summary", "ui/text_box"], function($__export) {
  "use strict";
  var $,
      Class,
      DefaultAdapter,
      ValidationEngine,
      Validator,
      VALIDATION_SUMMARY_CLASS,
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
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
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
      QUnit.module('events', {beforeEach: function() {
          this.fixture = new Fixture();
        }}, function() {
        QUnit.test('Check item click event subscription', function(assert) {
          var itemClickHandler = sinon.spy();
          var summary = this.fixture.createSummary(null, {});
          summary.on('itemClick', itemClickHandler);
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
          $(itemElements).eq(0).trigger('dxclick');
          assert.strictEqual(itemClickHandler.callCount, 1, 'Item click has been handled');
          assert.strictEqual(itemClickHandler.lastCall.args[0].itemIndex, 0, 'Item click handler should have arguments');
        });
        QUnit.test('Check item onClick subscription', function(assert) {
          var itemClickHandler = sinon.spy();
          var summary = this.fixture.createSummary(null, {onItemClick: itemClickHandler});
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
          itemElements.trigger('dxclick');
          assert.ok(itemClickHandler.calledOnce, 'Item click has been handled');
          assert.strictEqual(itemClickHandler.lastCall.args[0].itemIndex, 0, 'Item click handler should have arguments');
        });
        QUnit.test('Check item onContentReady subscription', function(assert) {
          var contentReadyHandler = sinon.spy();
          var group = 'group1';
          var validator = sinon.createStubInstance(Validator);
          validator.validate.returns({
            isValid: true,
            brokenRule: null
          });
          ValidationEngine.registerValidatorInGroup(group, validator);
          this.fixture.createSummary(null, {
            validationGroup: group,
            onContentReady: contentReadyHandler
          });
          assert.strictEqual(contentReadyHandler.callCount, 1, 'contentReady has been handled');
          assert.ok(contentReadyHandler.lastCall.args[0].component, 'contentReady handler should have arguments');
          assert.ok(this.fixture.$summaryContainer.hasClass(VALIDATION_SUMMARY_CLASS), 'validation summary should be rendered');
          ValidationEngine.validateGroup(group);
          assert.strictEqual(contentReadyHandler.callCount, 2, 'contentReady has been handled');
        });
        QUnit.test('Check item contentReady event subscription', function(assert) {
          var contentReadyHandler = sinon.spy();
          var group = 'group1';
          var validator = sinon.createStubInstance(Validator);
          validator.validate.returns({
            isValid: true,
            brokenRule: null
          });
          ValidationEngine.registerValidatorInGroup(group, validator);
          this.fixture.createSummary(null, {
            validationGroup: group,
            onInitialized: function(e) {
              e.component.on('contentReady', contentReadyHandler);
            }
          });
          assert.strictEqual(contentReadyHandler.callCount, 1, 'contentReady has been handled');
          assert.ok(contentReadyHandler.lastCall.args[0].component, 'contentReady handler should have arguments');
          assert.ok(this.fixture.$summaryContainer.hasClass(VALIDATION_SUMMARY_CLASS), 'validation summary should be rendered');
          ValidationEngine.validateGroup(group);
          assert.strictEqual(contentReadyHandler.callCount, 2, 'contentReady has been handled');
        });
      });
      QUnit.module('refreshValidationGroup method', {
        beforeEach: function() {
          var $__3 = this;
          this.fixture = new Fixture();
          this.validationGroup = 'groupName';
          this.$container = $('<div>').attr({id: 'container'});
          this.failMessage = 'required';
          $('#qunit-fixture').append(this.$container);
          this.renderValidationGroup = function() {
            $__3.$editor = $('<div>').dxTextBox({}).dxValidator({
              validationRules: [{
                type: 'required',
                message: $__3.failMessage
              }],
              validationGroup: $__3.validationGroup
            });
            $__3.$editor.appendTo($__3.$container);
          };
          this.removeValidationGroup = function() {
            $__3.$editor.remove();
          };
        },
        afterEach: function() {
          this.$container.remove();
        }
      }, function() {
        QUnit.test('should resubsribe validation summary to a group with name specified in "validationGroup" property', function(assert) {
          this.renderValidationGroup();
          var summary = this.fixture.createSummary('#dxSummary', {validationGroup: this.validationGroup});
          this.removeValidationGroup();
          this.renderValidationGroup();
          summary.refreshValidationGroup();
          ValidationEngine.validateGroup(this.validationGroup);
          var summaryItems = summary.option('items');
          assert.strictEqual(summaryItems.length, 1, 'summary was resubscribed on recreated group');
          assert.strictEqual(summaryItems[0].text, this.failMessage, 'text is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/class","ui/validation/default_adapter","ui/validation_engine","ui/validator","ui/validation_summary","ui/text_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/class"), require("ui/validation/default_adapter"), require("ui/validation_engine"), require("ui/validator"), require("ui/validation_summary"), require("ui/text_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationSummary.tests.js.map