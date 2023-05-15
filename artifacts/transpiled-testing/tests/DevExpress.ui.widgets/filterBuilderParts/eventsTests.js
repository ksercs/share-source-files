!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/filterBuilderParts/eventsTests.js"], ["jquery","../../../helpers/filterBuilderTestData.js","./constants.js","./helpers.js","ui/filter_builder/filter_builder"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/filterBuilderParts/eventsTests.js", ["jquery", "../../../helpers/filterBuilderTestData.js", "./constants.js", "./helpers.js", "ui/filter_builder/filter_builder"], function($__export) {
  "use strict";
  var $,
      fields,
      FILTER_BUILDER_ITEM_OPERATION_CLASS,
      FILTER_BUILDER_ITEM_FIELD_CLASS,
      FILTER_BUILDER_ITEM_VALUE_CLASS,
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS,
      FILTER_BUILDER_IMAGE_ADD_CLASS,
      FILTER_BUILDER_IMAGE_REMOVE_CLASS,
      FILTER_BUILDER_GROUP_OPERATION_CLASS,
      clickByButtonAndSelectMenuItem,
      clickByValue,
      clickByOutside;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fields = $__m.default;
    }, function($__m) {
      FILTER_BUILDER_ITEM_OPERATION_CLASS = $__m.FILTER_BUILDER_ITEM_OPERATION_CLASS;
      FILTER_BUILDER_ITEM_FIELD_CLASS = $__m.FILTER_BUILDER_ITEM_FIELD_CLASS;
      FILTER_BUILDER_ITEM_VALUE_CLASS = $__m.FILTER_BUILDER_ITEM_VALUE_CLASS;
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = $__m.FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS;
      FILTER_BUILDER_IMAGE_ADD_CLASS = $__m.FILTER_BUILDER_IMAGE_ADD_CLASS;
      FILTER_BUILDER_IMAGE_REMOVE_CLASS = $__m.FILTER_BUILDER_IMAGE_REMOVE_CLASS;
      FILTER_BUILDER_GROUP_OPERATION_CLASS = $__m.FILTER_BUILDER_GROUP_OPERATION_CLASS;
    }, function($__m) {
      clickByButtonAndSelectMenuItem = $__m.clickByButtonAndSelectMenuItem;
      clickByValue = $__m.clickByValue;
      clickByOutside = $__m.clickByOutside;
    }, function($__m) {}],
    execute: function() {
      QUnit.module('Events', function() {
        QUnit.test('onEditorPreparing', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields,
            onEditorPreparing: spy
          });
          var companyNameValueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          companyNameValueField.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var args = spy.args[0][0];
          assert.strictEqual(spy.callCount, 1, 'onEditorPreparing is called');
          assert.strictEqual(args.dataField, 'CompanyName', 'args -> dataField');
          assert.strictEqual(args.value, 'DevExpress', 'args -> value');
          assert.strictEqual(args.filterOperation, '=', 'args -> filterOperation');
          assert.deepEqual(args.component, container.dxFilterBuilder('instance'), 'args -> component');
        });
        QUnit.test('onEditorPreparing for between', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['Field', 'between', [1, 2]]],
            fields: [{
              dataField: 'Field',
              dataType: 'number'
            }],
            onEditorPreparing: spy
          });
          var companyNameValueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          companyNameValueField.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.strictEqual(spy.callCount, 2, 'onEditorPreparing is called');
          var startArgs = spy.args[0][0];
          assert.strictEqual(startArgs.value, 1, 'args -> value');
          assert.strictEqual(startArgs.filterOperation, 'between', 'args -> filterOperation');
          var endArgs = spy.args[1][0];
          assert.strictEqual(endArgs.value, 2, 'args -> value');
          assert.strictEqual(endArgs.filterOperation, 'between', 'args -> filterOperation');
        });
        QUnit.test('onEditorPrepared', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields,
            onEditorPrepared: spy
          });
          var companyNameValueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          companyNameValueField.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var args = spy.args[0][0];
          assert.strictEqual(spy.callCount, 1, 'onEditorPrepared is called');
          assert.strictEqual(args.dataField, 'CompanyName', 'args -> dataField');
          assert.strictEqual(args.value, 'DevExpress', 'args -> value');
          assert.strictEqual(args.filterOperation, '=', 'args -> filterOperation');
          assert.deepEqual(args.component, container.dxFilterBuilder('instance'), 'args -> component');
        });
        QUnit.test('onEditorPrepared for between', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['Field', 'between', [1, 2]]],
            fields: [{
              dataField: 'Field',
              dataType: 'number'
            }],
            onEditorPrepared: spy
          });
          var companyNameValueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          companyNameValueField.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.strictEqual(spy.callCount, 2, 'onEditorPrepared is called');
          var startArgs = spy.args[0][0];
          assert.strictEqual(startArgs.value, 1, 'args -> value');
          assert.strictEqual(startArgs.filterOperation, 'between', 'args -> filterOperation');
          var endArgs = spy.args[1][0];
          assert.strictEqual(endArgs.value, 2, 'args -> value');
          assert.strictEqual(endArgs.filterOperation, 'between', 'args -> filterOperation');
        });
        QUnit.test('Clear keyup & dxpointerdown events after dispose', function(assert) {
          var dxPointerDownSpy = sinon.spy();
          var keyUpSpy = sinon.spy();
          var container = $('#container');
          var filterBuilder = container.dxFilterBuilder({
            value: ['NumberField', '=', ''],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder._addDocumentClick = function() {
            $(document).on('dxpointerdown', dxPointerDownSpy);
            this._documentClickHandler = dxPointerDownSpy;
          };
          filterBuilder._addDocumentKeyUp = function() {
            $(document).on('keyup', keyUpSpy);
            this._documentKeyUpHandler = keyUpSpy;
          };
          clickByValue();
          assert.strictEqual(dxPointerDownSpy.callCount, 0);
          assert.strictEqual(keyUpSpy.callCount, 0);
          $(document).trigger('dxpointerdown');
          $(document).trigger('keyup');
          assert.strictEqual(dxPointerDownSpy.callCount, 1);
          assert.strictEqual(keyUpSpy.callCount, 1);
          container.remove();
          $(document).trigger('dxpointerdown');
          $(document).trigger('keyup');
          assert.strictEqual(dxPointerDownSpy.callCount, 1);
          assert.strictEqual(keyUpSpy.callCount, 1);
        });
        QUnit.test('onValueChanged', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['Zipcode', '=', '666'],
            fields: fields,
            onValueChanged: spy
          });
          container.dxFilterBuilder('instance').option('value', ['CompanyName', '=', 'DevExpress']);
          var args = spy.args[0][0];
          assert.strictEqual(spy.callCount, 1, 'onValueChanged is called');
          assert.deepEqual(args.previousValue, ['Zipcode', '=', '666'], 'previous value');
          assert.deepEqual(args.value, ['CompanyName', '=', 'DevExpress'], 'current value');
        });
        QUnit.test('Change value in onValueChanged on remove item', function(assert) {
          var container = $('#container');
          var filterBuilder = container.dxFilterBuilder({
            value: ['Zipcode', '=', '666'],
            fields: fields,
            onValueChanged: function(e) {
              if (e.value === null) {
                e.component.option('value', ['CompanyName', '=', 'DevExpress']);
              }
            }
          }).dxFilterBuilder('instance');
          var $removeButton = $('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(0);
          $removeButton.trigger('dxclick');
          assert.deepEqual(filterBuilder.option('value'), ['CompanyName', '=', 'DevExpress'], 'value');
          assert.deepEqual(filterBuilder.getFilterExpression(), ['CompanyName', '=', 'DevExpress'], 'filter expression');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).length, 1, 'field item count');
        });
        QUnit.test('Skip the onValueChanged after change operation of an invalid condition to another invalid condition ', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['NumberField', '=', ''],
            fields: fields,
            onValueChanged: spy
          });
          var $operationButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          clickByButtonAndSelectMenuItem($operationButton, 1);
          assert.strictEqual($operationButton.text(), 'Does not equal');
          assert.strictEqual(spy.callCount, 0, 'onValueChanged is not called');
          clickByButtonAndSelectMenuItem($operationButton, 6);
          assert.strictEqual($operationButton.text(), 'Is blank');
          assert.strictEqual(spy.callCount, 1, 'onValueChanged is called');
          clickByButtonAndSelectMenuItem($operationButton, 7);
          assert.strictEqual($operationButton.text(), 'Is not blank');
          assert.strictEqual(spy.callCount, 2, 'onValueChanged is called');
          clickByButtonAndSelectMenuItem($operationButton, 1);
          assert.strictEqual($operationButton.text(), 'Does not equal');
          assert.strictEqual(spy.callCount, 3, 'onValueChanged is called');
        });
        QUnit.test('onValueChanged after change field', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['NumberField', '=', ''],
            fields: fields,
            onValueChanged: spy
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          clickByButtonAndSelectMenuItem($fieldButton, 3);
          assert.strictEqual($fieldButton.text(), 'Zipcode');
          assert.strictEqual(spy.callCount, 0, 'onValueChanged is not called');
          clickByButtonAndSelectMenuItem($fieldButton, 0);
          assert.strictEqual($fieldButton.text(), 'Company Name');
          assert.strictEqual(spy.callCount, 0, 'onValueChanged is not called');
          clickByButtonAndSelectMenuItem($fieldButton, 6);
          assert.strictEqual($fieldButton.text(), 'Caption of Object Field');
          assert.strictEqual(spy.callCount, 1, 'onValueChanged is called');
        });
        QUnit.test('onValueChanged after change groupValue', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['NumberField', '=', ''], 'and', ['NumberField', '=', '']],
            fields: fields,
            onValueChanged: spy
          });
          var $groupButton = container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS);
          clickByButtonAndSelectMenuItem($groupButton, 1);
          assert.strictEqual($groupButton.text(), 'Or');
          assert.strictEqual(spy.callCount, 0, 'onValueChanged is not called');
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          clickByButtonAndSelectMenuItem($fieldButton.eq(0), 6);
          clickByButtonAndSelectMenuItem($fieldButton.eq(1), 6);
          assert.strictEqual(spy.callCount, 2, 'onValueChanged is called');
          clickByButtonAndSelectMenuItem($groupButton, 0);
          assert.strictEqual($groupButton.text(), 'And');
          assert.strictEqual(spy.callCount, 3, 'onValueChanged is called');
        });
        QUnit.test('onValueChanged after change group operation from negative to positive and remove child', function(assert) {
          var container = $('#container');
          var onValueChangedSpy = sinon.spy();
          var filterBuilder = container.dxFilterBuilder({
            value: ['!', [['Zipcode', '=', 1], 'or', ['Zipcode', '=', 2]]],
            fields: fields,
            onValueChanged: onValueChangedSpy
          }).dxFilterBuilder('instance');
          var $groupButton = container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS);
          clickByButtonAndSelectMenuItem($groupButton, 0);
          assert.strictEqual(onValueChangedSpy.callCount, 1, 'onValueChanged is called');
          var $removeButton = $('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(0);
          $removeButton.trigger('dxclick');
          assert.strictEqual(onValueChangedSpy.callCount, 2, 'onValueChanged is called');
          assert.deepEqual(filterBuilder.option('value'), ['Zipcode', '=', 2], 'value');
        });
        QUnit.test('onInitialized', function(assert) {
          assert.expect(1);
          $('#container').dxFilterBuilder({
            value: ['Field', 'between', [666, 777]],
            fields: [{
              dataField: 'Field',
              dataType: 'number'
            }],
            onInitialized: function(e) {
              assert.deepEqual(e.component.getFilterExpression(), [['Field', '>=', 666], 'and', ['Field', '<=', 777]]);
            }
          });
        });
        QUnit.test('Content ready', function(assert) {
          var spy = sinon.spy();
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields,
            onContentReady: spy
          });
          assert.strictEqual(spy.callCount, 1);
          clickByValue();
          assert.strictEqual(spy.callCount, 2);
          clickByOutside();
          assert.strictEqual(spy.callCount, 3);
          var $addButton = $('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).eq(0);
          clickByButtonAndSelectMenuItem($addButton, 0);
          assert.strictEqual(spy.callCount, 4);
          clickByButtonAndSelectMenuItem($addButton, 1);
          assert.strictEqual(spy.callCount, 5);
          var $removeButton = $('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(0);
          $removeButton.trigger('dxclick');
          assert.strictEqual(spy.callCount, 6);
        });
        QUnit.test('valueChanged should not be raised for both widgets (T935367)', function(assert) {
          var valueChangedSpy1 = sinon.spy();
          var valueChangedSpy2 = sinon.spy();
          var $container1 = $('#container');
          var $container2 = $('#container1');
          var filterBuilder1 = $container1.dxFilterBuilder({
            value: ['Zipcode', '=', '555'],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder1.on('valueChanged', valueChangedSpy1);
          var filterBuilder2 = $container2.dxFilterBuilder({
            value: ['Zipcode', '=', '555'],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder2.on('valueChanged', valueChangedSpy2);
          filterBuilder1.option('value', ['CompanyName', '=', 'DevExpress1']);
          filterBuilder2.option('value', ['CompanyName', '=', 'DevExpress2']);
          var args1 = valueChangedSpy1.args[0][0];
          var args2 = valueChangedSpy2.args[0][0];
          assert.strictEqual(valueChangedSpy1.callCount, 1, 'valueChanged of the first widget is called once');
          assert.deepEqual(args1.value, ['CompanyName', '=', 'DevExpress1'], 'value of the first widget');
          assert.strictEqual(valueChangedSpy2.callCount, 1, 'valueChanged of the second widget is called once');
          assert.deepEqual(args2.value, ['CompanyName', '=', 'DevExpress2'], 'value of the second widget');
        });
        QUnit.test('editorPreparing should not be raised for both widgets (T935367)', function(assert) {
          var valueChangedSpy1 = sinon.spy();
          var valueChangedSpy2 = sinon.spy();
          var $container1 = $('#container');
          var $container2 = $('#container1');
          var filterBuilder1 = $container1.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder1.on('editorPreparing', valueChangedSpy1);
          var filterBuilder2 = $container2.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder2.on('editorPreparing', valueChangedSpy2);
          var $companyNameValueField1 = $container1.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          $companyNameValueField1.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var $companyNameValueField2 = $container2.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          $companyNameValueField2.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var args1 = valueChangedSpy1.args[0][0];
          var args2 = valueChangedSpy2.args[0][0];
          assert.strictEqual(valueChangedSpy1.callCount, 1, 'editorPreparing of the first widget is called once');
          assert.strictEqual(args1.dataField, 'CompanyName', 'args -> dataField of the first widget');
          assert.strictEqual(args1.value, 'DevExpress', 'args -> value of the first widget');
          assert.strictEqual(args1.filterOperation, '=', 'args -> filterOperation of the first widget');
          assert.strictEqual(args1.component, filterBuilder1, 'args -> component of the first widget');
          assert.strictEqual(valueChangedSpy2.callCount, 1, 'editorPreparing of the second widget is called once');
          assert.strictEqual(args2.dataField, 'CompanyName', 'args -> dataField of the second widget');
          assert.strictEqual(args2.value, 'DevExpress', 'args -> value of the second widget');
          assert.strictEqual(args2.filterOperation, '=', 'args -> filterOperation of the second widget');
          assert.strictEqual(args2.component, filterBuilder2, 'args -> component of the second widget');
        });
        QUnit.test('editorPrepared should not be raised for both widgets (T935367)', function(assert) {
          var valueChangedSpy1 = sinon.spy();
          var valueChangedSpy2 = sinon.spy();
          var $container1 = $('#container');
          var $container2 = $('#container1');
          var filterBuilder1 = $container1.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder1.on('editorPrepared', valueChangedSpy1);
          var filterBuilder2 = $container2.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            fields: fields
          }).dxFilterBuilder('instance');
          filterBuilder2.on('editorPrepared', valueChangedSpy2);
          var $companyNameValueField1 = $container1.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          $companyNameValueField1.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var $companyNameValueField2 = $container2.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          $companyNameValueField2.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var args1 = valueChangedSpy1.args[0][0];
          var args2 = valueChangedSpy2.args[0][0];
          assert.strictEqual(valueChangedSpy1.callCount, 1, 'editorPrepared of the first widget is called once');
          assert.strictEqual(args1.dataField, 'CompanyName', 'args -> dataField of the first widget');
          assert.strictEqual(args1.value, 'DevExpress', 'args -> value of the first widget');
          assert.strictEqual(args1.filterOperation, '=', 'args -> filterOperation of the first widget');
          assert.strictEqual(args1.component, filterBuilder1, 'args -> component of the first widget');
          assert.strictEqual(valueChangedSpy2.callCount, 1, 'editorPrepared of the second widget is called once');
          assert.strictEqual(args2.dataField, 'CompanyName', 'args -> dataField of the second widget');
          assert.strictEqual(args2.value, 'DevExpress', 'args -> value of the second widget');
          assert.strictEqual(args2.filterOperation, '=', 'args -> filterOperation of the second widget');
          assert.strictEqual(args2.component, filterBuilder2, 'args -> component of the second widget');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/filterBuilderTestData.js","./constants.js","./helpers.js","ui/filter_builder/filter_builder"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/filterBuilderTestData.js"), require("./constants.js"), require("./helpers.js"), require("ui/filter_builder/filter_builder"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=eventsTests.js.map