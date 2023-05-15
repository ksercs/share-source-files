!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.markup.tests.js"], ["jquery","core/utils/resize_callbacks","core/utils/window","../../helpers/responsiveBoxScreenMock.js","core/utils/type","core/config","ui/form","ui/form/constants","ui/form/components/field_item","ui/validation_engine","ui/text_area","ui/radio_group","ui/switch","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.markup.tests.js", ["jquery", "core/utils/resize_callbacks", "core/utils/window", "../../helpers/responsiveBoxScreenMock.js", "core/utils/type", "core/config", "ui/form", "ui/form/constants", "ui/form/components/field_item", "ui/validation_engine", "ui/text_area", "ui/radio_group", "ui/switch", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      resizeCallbacks,
      windowUtils,
      responsiveBoxScreenMock,
      isRenderer,
      config,
      FIELD_ITEM_CLASS,
      FORM_CLASS,
      FORM_FIELD_ITEM_COL_CLASS,
      FORM_GROUP_CLASS,
      FIELD_ITEM_CONTENT_CLASS,
      FIELD_ITEM_LABEL_CONTENT_CLASS,
      FORM_GROUP_CAPTION_CLASS,
      FIELD_ITEM_HELP_TEXT_CLASS,
      TOGGLE_CONTROLS_PADDING_CLASS,
      ValidationEngine,
      FORM_GROUP_CONTENT_CLASS,
      MULTIVIEW_ITEM_CONTENT_CLASS,
      FORM_LAYOUT_MANAGER_CLASS,
      VALIDATION_SUMMARY_CLASS,
      VALIDATOR_CLASS,
      READONLY_STATE_CLASS,
      TEXTEDITOR_CLASS,
      test,
      formatTestValue;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {
      responsiveBoxScreenMock = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}, function($__m) {
      FIELD_ITEM_CLASS = $__m.FIELD_ITEM_CLASS;
      FORM_CLASS = $__m.FORM_CLASS;
      FORM_FIELD_ITEM_COL_CLASS = $__m.FORM_FIELD_ITEM_COL_CLASS;
      FORM_GROUP_CLASS = $__m.FORM_GROUP_CLASS;
      FIELD_ITEM_CONTENT_CLASS = $__m.FIELD_ITEM_CONTENT_CLASS;
      FIELD_ITEM_LABEL_CONTENT_CLASS = $__m.FIELD_ITEM_LABEL_CONTENT_CLASS;
      FORM_GROUP_CAPTION_CLASS = $__m.FORM_GROUP_CAPTION_CLASS;
    }, function($__m) {
      FIELD_ITEM_HELP_TEXT_CLASS = $__m.FIELD_ITEM_HELP_TEXT_CLASS;
      TOGGLE_CONTROLS_PADDING_CLASS = $__m.TOGGLE_CONTROLS_PADDING_CLASS;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__2;
      FORM_GROUP_CONTENT_CLASS = 'dx-form-group-content';
      MULTIVIEW_ITEM_CONTENT_CLASS = 'dx-multiview-item-content';
      FORM_LAYOUT_MANAGER_CLASS = 'dx-layout-manager';
      VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
      VALIDATOR_CLASS = 'dx-validator';
      READONLY_STATE_CLASS = 'dx-state-readonly';
      TEXTEDITOR_CLASS = 'dx-texteditor';
      (($__2 = QUnit, test = $__2.test, $__2));
      formatTestValue = function(value) {
        return Array.isArray(value) ? '[]' : value;
      };
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"form\"></div>\n        <div id=\"form2\"></div>\n        <div id=\"container\"></div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Form', function() {
        test('Invalidate after option changed', function(assert) {
          var testingOptions = ['formData', 'items', 'colCount', 'labelLocation', 'alignItemLabels', 'showColonAfterLabel', 'customizeItem', 'minColWidth', 'alignItemLabelsInAllGroups', 'onEditorEnterKey', 'scrollingEnabled', 'formID'];
          var form = $('#form').dxForm().dxForm('instance');
          var i;
          var invalidateStub = sinon.stub(form, '_invalidate');
          for (i = 0; i < testingOptions.length; i++) {
            var testingOption = testingOptions[i];
            var value = void 0;
            switch (testingOption) {
              case 'formData':
                value = {name: 'auto'};
                break;
              case 'items':
                value = ['auto'];
                break;
              default:
                value = 'auto';
            }
            form.option(testingOption, value);
          }
          assert.equal(invalidateStub.callCount, testingOptions.length);
        });
        test('Invalidate is not called when formData is changed and items option is defined', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]}).dxForm('instance');
          var invalidateStub = sinon.stub(form, '_invalidate');
          form.option('formData', {name: 'test'});
          assert.equal(invalidateStub.callCount, 0);
        });
        test('Default render', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          assert.ok($formContainer.hasClass(FORM_CLASS), 'Form is rendered');
          assert.equal($formContainer.attr('role'), 'form', 'Form has correct attribute');
          assert.equal($formContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS).length, 1, 'Layout manager is rendered');
        });
        test('Check the default focus target', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $input = $formContainer.find('input');
          assert.equal($formContainer.dxForm('instance')._focusTarget().closest('.dx-widget').html(), $input.closest('.dx-widget').html(), 'Correct focus target');
        });
        test('Check root layout width on option change', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var instance = $formContainer.dxForm('instance');
          var rootLayoutManager = instance._rootLayoutManager;
          instance.option('width', 100);
          assert.equal(rootLayoutManager.option('width'), 100, 'Correct width');
        });
        test('Form isn\'t refresh on dimension changed if colCount is auto', function(assert) {
          var $formContainer = $('#form').dxForm({
            colCount: 'auto',
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var instance = $formContainer.dxForm('instance');
          var refreshStub = sinon.stub(instance, '_refresh');
          resizeCallbacks.fire();
          assert.equal(refreshStub.callCount, 0, 'don\'t refresh on resize if colCount is auto');
        });
        test('Form doesn\'t refresh on dimension changed if colCount is not auto', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var instance = $formContainer.dxForm('instance');
          var refreshStub = sinon.stub(instance, '_refresh');
          resizeCallbacks.fire();
          assert.equal(refreshStub.callCount, 0, 'do not refresh on resize if colCount isn\'t auto');
        });
        test('Render read only form', function(assert) {
          var $formContainer = $('#form').dxForm({
            readOnly: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          assert.ok($formContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass('dx-state-readonly'), 'editor is read only');
        });
        test('Render form with colspan', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({
            formData: {
              ID: 0,
              FirstName: 'John',
              LastName: 'Dow',
              HireDate: '01/01/1970'
            },
            colCount: 2,
            colCountByScreen: {xs: 2},
            items: [{
              itemType: 'group',
              caption: 'Employee',
              colCount: 2,
              items: [{
                dataField: 'ID',
                colSpan: 2
              }, {
                dataField: 'FirstName',
                visible: true
              }, {
                dataField: 'LastName',
                visible: true
              }, {
                dataField: 'HireDate',
                colSpan: 2,
                visible: true
              }]
            }]
          });
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 5, '4 simple items + 1 group item');
        });
        test('\'readOnly\' is changed in inner components on optionChanged', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          assert.notOk($formContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass(READONLY_STATE_CLASS), 'editor isn\'t read only');
          $formContainer.dxForm('instance').option('readOnly', true);
          assert.ok($formContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass(READONLY_STATE_CLASS), 'editor is read only');
        });
        test('editor should not change readonly state after form readOnly option change if editorOptions.readOnly was updated before', function(assert) {
          var $testContainer = $('#container').dxForm({items: [{
              dataField: 'dxTextBox',
              editorType: 'dxTextBox'
            }]});
          var instance = $testContainer.dxForm('instance');
          instance.option('items[0].editorOptions.readOnly', true);
          instance.option('readOnly', true);
          instance.option('readOnly', false);
          assert.ok($testContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass(READONLY_STATE_CLASS), 'editor is read only');
        });
        test('\'disable\' is changed in inner components on optionChanged', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }],
            disabled: true
          });
          assert.ok($formContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass('dx-state-disabled'), 'editor is disabled');
          $formContainer.dxForm('instance').option('disabled', false);
          assert.notOk($formContainer.find(("." + FIELD_ITEM_CLASS + " ." + TEXTEDITOR_CLASS)).hasClass('dx-state-disabled'), 'editor isn\'t disabled');
        });
        test('Customize item event', function(assert) {
          var testObject = {
            ID: 1,
            FirstName: 'John',
            LastName: 'Heart',
            BirthDate: '1964/03/16',
            Sex: true
          };
          var $formContainer = $('#form').dxForm({
            formData: testObject,
            customizeItem: function(item) {
              switch (item.dataField) {
                case 'Sex':
                case 'ID':
                  item.visible = false;
                  break;
                case 'FirstName':
                  item.editorOptions = {readOnly: true};
                  break;
                case 'LastName':
                  item.editorType = 'dxTextArea';
                  break;
                case 'BirthDate':
                  item.editorType = 'dxDateBox';
                  break;
              }
            }
          });
          var items = $formContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS).first().dxLayoutManager('instance')._items;
          var visibleItems = $formContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal(items.length, 3, 'items count');
          assert.equal(visibleItems.length, 3, 'Visible items count');
          assert.equal(items[0].editorOptions.readOnly, true);
          assert.equal(items[1].editorType, 'dxTextArea');
          assert.equal(items[2].editorType, 'dxDateBox');
        });
        test('Check that data fully changes after object replace', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({formData: {FamousPirate: 'John Morgan'}});
          $testContainer.dxForm('instance').option('formData', {FamousDetective: 'Sherlock Holmes'});
          assert.deepEqual($testContainer.dxForm('instance').option('formData'), {FamousDetective: 'Sherlock Holmes'}, 'Correct formData');
        });
        test('Check data at render with items', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({
            formData: {FamousPirate: 'John Morgan'},
            items: [{
              dataField: 'FamousDetective',
              editorType: 'dxTextBox'
            }, {
              dataField: 'FamousPirate',
              editorType: 'dxTextBox'
            }]
          });
          assert.deepEqual($testContainer.dxForm('instance').option('formData'), {FamousPirate: 'John Morgan'}, 'Correct formData');
          assert.deepEqual($testContainer.find('.dx-layout-manager').dxLayoutManager('instance').option('layoutData'), {FamousPirate: 'John Morgan'}, 'Correct formData');
        });
        test('Check data at render with items and change widget\'s value', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({
            formData: {FamousPirate: 'John Morgan'},
            items: [{
              dataField: 'FamousDetective',
              editorType: 'dxTextBox'
            }, {dataField: 'FamousPirate'}]
          });
          $testContainer.find('.dx-textbox').first().dxTextBox('instance').option('value', 'Sherlock Holmes');
          assert.deepEqual($testContainer.dxForm('instance').option('formData'), {
            FamousPirate: 'John Morgan',
            FamousDetective: 'Sherlock Holmes'
          }, 'Correct formData');
        });
        test('Change of editor\'s value changing \'formData\' option', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({formData: {FamousPirate: 'John Morgan'}});
          $testContainer.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
          assert.deepEqual($testContainer.dxForm('instance').option('formData'), {FamousPirate: 'Cpt. Jack Sparrow'}, 'Correct formData');
        });
        test('Update of editor\'s value when formOption is changed and items is defined', function(assert) {
          var $testContainer = $('#form');
          var textBoxes = [];
          var form = $testContainer.dxForm({items: ['name', 'lastName']}).dxForm('instance');
          sinon.spy(form._rootLayoutManager, '_invalidate');
          var $textBoxes = $testContainer.find('.dx-textbox');
          $.each($textBoxes, function(_, element) {
            textBoxes.push($(element).dxTextBox('instance'));
          });
          form.option('formData', {
            name: 'Test Name',
            lastName: 'Test Last Name'
          });
          assert.equal(textBoxes[0].option('value'), 'Test Name', 'first editor');
          assert.equal(textBoxes[1].option('value'), 'Test Last Name', 'second editor');
          assert.ok(!form._rootLayoutManager._invalidate.called, '_invalidate of layout manger is not called');
        });
        test('Check the work of onFieldDataChanged', function(assert) {
          var $testContainer = $('#form');
          var testObject;
          var callCount = 0;
          $testContainer.dxForm({
            formData: {FamousPirate: 'John Morgan'},
            onFieldDataChanged: function(args) {
              testObject = {
                dataField: args.dataField,
                value: args.value
              };
              callCount++;
            }
          });
          var form = $testContainer.dxForm('instance');
          $testContainer.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
          assert.deepEqual(testObject, {
            dataField: 'FamousPirate',
            value: 'Cpt. Jack Sparrow'
          }, 'Correct data');
          assert.equal(callCount, 1, 'onFieldDataChanged called 1 time');
          form.option('formData.FamousPirate', 'Blackbeard');
          assert.deepEqual(testObject, {
            dataField: 'FamousPirate',
            value: 'Blackbeard'
          }, 'Correct data');
          assert.equal(callCount, 2, 'onFieldDataChanged called 2 times');
          form.option('formData', {FamousDetective: 'Sherlock Holmes'});
          assert.equal(callCount, 3, 'onFieldDataChanged called 3 times');
        });
        test('Check the work of onFieldDataChanged with complex dataField', function(assert) {
          var $testContainer = $('#form');
          var testObject;
          var callCount = 0;
          $testContainer.dxForm({
            formData: {FamousPirate: {
                firstName: 'John',
                lastName: 'Morgan'
              }},
            items: [{
              itemType: 'group',
              caption: 'Famous Pirate',
              items: [{dataField: 'FamousPirate.firstName'}, {dataField: 'FamousPirate.lastName'}]
            }],
            onFieldDataChanged: function(args) {
              testObject = {
                dataField: args.dataField,
                value: args.value
              };
              callCount++;
            }
          });
          var form = $testContainer.dxForm('instance');
          $testContainer.find('.dx-textbox').first().dxTextBox('instance').option('value', 'Cpt. Jack');
          assert.deepEqual(testObject, {
            dataField: 'FamousPirate.firstName',
            value: 'Cpt. Jack'
          }, 'Correct data');
          assert.equal(callCount, 1, 'onFieldDataChanged called 1 time');
          form.option('formData.FamousPirate.lastName', 'Sparrow');
          assert.deepEqual(testObject, {
            dataField: 'FamousPirate.lastName',
            value: 'Sparrow'
          }, 'Correct data');
          assert.equal(callCount, 2, 'onFieldDataChanged called 2 times');
        });
        test('Check the work of onFieldDataChanged when whole object is changed', function(assert) {
          var $testContainer = $('#form');
          var testObjects = [];
          $testContainer.dxForm({
            formData: {famousPirate: 'John Morgan'},
            onFieldDataChanged: function(args) {
              testObjects.push({
                dataField: args.dataField,
                value: args.value
              });
            }
          });
          var form = $testContainer.dxForm('instance');
          form.option('formData', {
            famousPirate: 'Blackbeard',
            famousDetective: 'Sherlock Holmes'
          });
          assert.equal(testObjects.length, 2, 'onFieldDataChanged fire by 2 fields');
          assert.deepEqual(testObjects[0], {
            dataField: 'famousPirate',
            value: 'Blackbeard'
          }, 'Correct data');
          assert.deepEqual(testObjects[1], {
            dataField: 'famousDetective',
            value: 'Sherlock Holmes'
          }, 'Correct data');
        });
        test('Check the work of onFieldDataChanged when whole object is changed and items are defined', function(assert) {
          var $testContainer = $('#form');
          var testObjects = [];
          $testContainer.dxForm({
            formData: {
              famousPirate: 'Blackbeard',
              famousDetective: 'Sherlock Holmes'
            },
            items: ['famousPirate'],
            onFieldDataChanged: function(args) {
              testObjects.push({
                dataField: args.dataField,
                value: args.value
              });
            }
          });
          var form = $testContainer.dxForm('instance');
          form.option('formData', {
            famousPirate: 'Calico Jack',
            famousDetective: 'Hercule Poirot'
          });
          assert.equal(testObjects.length, 2, 'onFieldDataChanged fired 2 times');
        });
        test('Check the onFieldDataChanged resets old subscriptions', function(assert) {
          var $testContainer = $('#form');
          var testObjects = [];
          $testContainer.dxForm({
            formData: {
              famousPirate: 'Blackbeard',
              famousDetective: 'Sherlock Holmes'
            },
            items: ['famousPirate'],
            onFieldDataChanged: function(args) {
              testObjects.push({
                dataField: args.dataField,
                value: args.value
              });
            }
          });
          var form = $testContainer.dxForm('instance');
          form.option({
            formData: {
              famousPirate: 'Blackbeard',
              famousDetective: 'Sherlock Holmes'
            },
            onFieldDataChanged: function(args) {
              testObjects.push({
                dataField: args.dataField,
                value: args.value
              });
            }
          });
          form.option({
            formData: {
              famousPirate: 'Blackbeard',
              famousDetective: 'Sherlock Holmes'
            },
            onFieldDataChanged: function(args) {
              testObjects.push({
                dataField: args.dataField,
                value: args.value
              });
            }
          });
          assert.equal(testObjects.length, 4, 'onFieldDataChanged fired 4 times');
        });
        test('alignItemLabels option for not grouping', function(assert) {
          var $formContainer = $('#form').dxForm({formData: {
              name: 'Test',
              lastName: 'surname'
            }});
          var $layoutManager = $formContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS).first().dxLayoutManager('instance');
          assert.equal($layoutManager.option('alignItemLabels'), true);
        });
        test('Render scrollable', function(assert) {
          var $formContainer = $('#form').dxForm({
            height: 200,
            scrollingEnabled: true,
            formData: {
              'ID': 1,
              'FirstName': 'John',
              'LastName': 'Heart',
              'Prefix': 'Mr.',
              'Position': 'CEO',
              'Picture': 'images/employees/01.png',
              'BirthDate': '1964/03/16',
              'HireDate': '1995/01/15',
              'Notes': 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
              'Address': '351 S Hill St.',
              'StateID': 5
            }
          });
          assert.ok($formContainer.hasClass('dx-scrollable'), 'has scrollable');
          assert.equal($formContainer.find('.dx-scrollable-content > .' + FORM_LAYOUT_MANAGER_CLASS).length, 1, 'scrollable content');
        });
        test('Show validation summary', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              validationRules: [{type: 'required'}]
            }]
          });
          $formContainer.dxForm('instance').validate();
          var $summaryContents = $formContainer.find('.dx-validationsummary-item-content');
          assert.equal($formContainer.find(("." + VALIDATION_SUMMARY_CLASS)).length, 1);
          assert.equal($summaryContents.eq(0).text(), 'Required', 'summary item');
        });
        test('Show validation summary via option method', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: false,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          $formContainer.dxForm('instance').option('showValidationSummary', true);
          assert.equal($formContainer.find(("." + VALIDATION_SUMMARY_CLASS)).length, 1);
        });
        test('Hide validation summary via option method', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          $formContainer.dxForm('instance').option('showValidationSummary', false);
          assert.equal($formContainer.find('form .dx-validationsummary').length, 0);
        });
        test('The dxForm is not rendered correctly when colCount is zero', function(assert) {
          var form = $('#form').dxForm({
            formData: {name: 'Batman'},
            colCount: 0
          }).dxForm('instance');
          assert.equal($('#form .dx-textbox').dxTextBox('option', 'value'), 'Batman');
          assert.equal(form.$element().find('.' + FORM_FIELD_ITEM_COL_CLASS + '0').length, 1);
          form.option('colCount', 1);
          form.option('colCount', 0);
          assert.equal($('#form .dx-textbox').dxTextBox('option', 'value'), 'Batman');
          assert.equal(form.$element().find('.' + FORM_FIELD_ITEM_COL_CLASS + '0').length, 1);
        });
        test('Render form item with specific class', function(assert) {
          var $testContainer = $('#form').dxForm({items: [{
              itemType: 'group',
              cssClass: 'custom-group-class',
              items: [{
                label: {text: 'New label'},
                dataField: 'name',
                editorType: 'dxTextBox',
                cssClass: 'myFavoriteItem'
              }, {
                itemType: 'empty',
                cssClass: 'custom-empty-class'
              }, {
                itemType: 'tabbed',
                tabPanelOptions: {deferRendering: windowUtils.hasWindow() ? true : false},
                cssClass: 'custom-tabbed-class',
                tabs: [{
                  title: 'test',
                  items: [{
                    label: {text: 'Newest label'},
                    dataField: 'name',
                    editorType: 'dxTextBox',
                    cssClass: 'newItem'
                  }]
                }]
              }]
            }]});
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + '.custom-group-class').length, 1, 'custom class for group');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + '.myFavoriteItem').length, 1, 'custom class for item in group');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + '.custom-tabbed-class').length, 1, 'custom class for tabbed');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + ' .custom-empty-class').length, 1, 'custom class for empty');
        });
        test('Validation boundary for editors when scrolling is enabled_T306331', function(assert) {
          var form = $('#form').dxForm({
            scrollingEnabled: true,
            formData: {
              id: 1,
              name: ''
            },
            items: ['id', {
              dataField: 'name',
              editorType: 'dxTextBox',
              validationRules: [{type: 'required'}]
            }]
          }).dxForm('instance');
          form.validate();
          var $editors = $('#form .dx-texteditor');
          assert.equal($editors.eq(0).dxNumberBox('option', 'validationBoundary'), form.$element());
          assert.equal($editors.eq(1).dxTextBox('option', 'validationBoundary'), form.$element());
        });
        test('Validation boundary for editors when scrolling is disabled_T306331', function(assert) {
          var form = $('#form').dxForm({
            scrollingEnabled: false,
            formData: {
              id: 1,
              name: ''
            },
            items: ['id', {
              dataField: 'name',
              editorType: 'dxTextBox',
              validationRules: [{type: 'required'}]
            }]
          }).dxForm('instance');
          form.validate();
          var $editors = $('#form .dx-texteditor');
          assert.equal($editors.eq(0).dxNumberBox('option', 'validationBoundary'), undefined);
          assert.equal($editors.eq(1).dxTextBox('option', 'validationBoundary'), undefined);
        });
        test('button item should have a Form\'s validation group by default', function(assert) {
          var $testContainer = $('#form');
          var form = $testContainer.dxForm({items: [{itemType: 'button'}, {
              itemType: 'button',
              buttonOptions: {validationGroup: 'test'}
            }]}).dxForm('instance');
          var $buttons = $testContainer.find('.dx-button');
          var defaultValidationGroup = form._getValidationGroup();
          var firstButtonValidationGroup = $buttons.first().dxButton('option', 'validationGroup');
          var secondButtonValidationGroup = $buttons.last().dxButton('option', 'validationGroup');
          assert.deepEqual(firstButtonValidationGroup, defaultValidationGroup, 'default validation group');
          assert.equal(secondButtonValidationGroup, 'test', 'Custom validation group');
        });
        test('button item should catch a custom validation group from Form', function(assert) {
          var $testContainer = $('#form');
          $testContainer.dxForm({
            validationGroup: 'test',
            items: [{itemType: 'button'}]
          });
          var buttonValidationGroup = $testContainer.find('.dx-button').dxButton('option', 'validationGroup');
          assert.equal(buttonValidationGroup, 'test', 'Button validationGroup is OK');
        });
        test('Check name argument of the simple item template when name is defined', function(assert) {
          var templateStub = sinon.stub();
          $('#form').dxForm({items: [{
              name: 'TestName',
              template: templateStub
            }]});
          assert.equal(templateStub.getCall(0).args[0].name, 'TestName', 'name argument');
        });
        test('Check name argument of the simple item template when name and dataField are defined', function(assert) {
          var templateStub = sinon.stub();
          $('#form').dxForm({items: [{
              dataField: 'TestDataField',
              name: 'TestName',
              template: templateStub
            }]});
          assert.equal(templateStub.getCall(0).args[0].name, 'TestName', 'name argument');
        });
        test('Check name argument of the simple item template when name is undefined', function(assert) {
          var templateStub = sinon.stub();
          $('#form').dxForm({items: [{template: templateStub}]});
          assert.equal(templateStub.getCall(0).args[0].name, undefined, 'name argument');
        });
        test('Check name argument of the simple item template when name is undefined and dataField is defined', function(assert) {
          var templateStub = sinon.stub();
          $('#form').dxForm({items: [{
              dataField: 'TestDataField',
              template: templateStub
            }]});
          assert.equal(templateStub.getCall(0).args[0].name, undefined, 'name argument');
        });
      });
      QUnit.module(("\"" + TOGGLE_CONTROLS_PADDING_CLASS + "\" class"), function() {
        ['dxCheckBox', 'dxSwitch', 'dxRadioGroup'].forEach(function(editorType) {
          var componentName = editorType.split('dx')[1].toLowerCase();
          ['left', undefined].forEach(function(alignment) {
            test((editorType + " should have class when labelLocation=top, label.alignment=" + alignment + ", label.visible=true (T1126956)"), function(assert) {
              var $form = $('#form').dxForm({
                labelLocation: 'top',
                items: [{
                  itemType: 'group',
                  items: [{
                    itemType: 'group',
                    items: [{
                      dataField: editorType,
                      label: {
                        visible: true,
                        alignment: alignment
                      },
                      editorType: editorType
                    }]
                  }]
                }]
              });
              var $componentWrapper = $form.find((".dx-" + componentName)).parent();
              assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), true);
            });
          });
          test((editorType + " should have class after visibility change to true (labelLocation=top, label.alignment=left)"), function(assert) {
            var $formContainer = $('#form').dxForm({
              labelLocation: 'top',
              items: [{
                itemType: 'group',
                items: [{
                  itemType: 'group',
                  items: [{
                    dataField: editorType,
                    label: {visible: false},
                    editorType: editorType
                  }]
                }]
              }]
            });
            var labelVisibleOptionName = 'items[0].items[0].items[0].label.visible';
            $formContainer.dxForm('instance').option(labelVisibleOptionName, true);
            var $componentWrapper = $formContainer.find((".dx-" + componentName)).parent();
            assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), true);
          });
          test((editorType + " should not have class after visibility change to false (labelLocation=top, label.alignment=left)"), function(assert) {
            var $formContainer = $('#form').dxForm({
              labelLocation: 'top',
              items: [{
                itemType: 'group',
                items: [{
                  itemType: 'group',
                  items: [{
                    dataField: editorType,
                    label: {visible: true},
                    editorType: editorType
                  }]
                }]
              }]
            });
            var labelVisibleOptionName = 'items[0].items[0].items[0].label.visible';
            $formContainer.dxForm('instance').option(labelVisibleOptionName, false);
            var $componentWrapper = $formContainer.find((".dx-" + componentName)).parent();
            assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
          });
          test((editorType + " should not have class when label.visible=false"), function(assert) {
            var $form = $('#form').dxForm({
              labelLocation: 'top',
              items: [{
                itemType: 'group',
                items: [{
                  itemType: 'group',
                  items: [{
                    dataField: editorType,
                    label: {visible: false},
                    editorType: editorType
                  }]
                }]
              }]
            });
            var $componentWrapper = $form.find((".dx-" + componentName)).parent();
            assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
          });
          test((editorType + " should not have class when items have template"), function(assert) {
            var $form = $('#form').dxForm({items: [{
                editorType: editorType,
                label: {
                  visible: true,
                  alignment: 'left'
                },
                dataField: 'field',
                template: function() {
                  return $('<div/>');
                }
              }]});
            var $componentWrapper = $form.find(("." + FIELD_ITEM_CONTENT_CLASS)).parent();
            assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
          });
          ['left', 'right'].forEach(function(labelLocation) {
            test((editorType + " should not have class when the labelLocation=" + labelLocation), function(assert) {
              var $form = $('#form').dxForm({
                labelLocation: labelLocation,
                items: [{
                  itemType: 'group',
                  items: [{
                    itemType: 'group',
                    items: [{
                      dataField: editorType,
                      label: {visible: true},
                      editorType: editorType
                    }]
                  }]
                }]
              });
              var $componentWrapper = $form.find((".dx-" + componentName)).parent();
              assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
            });
          });
          ['center', 'right'].forEach(function(alignment) {
            test((editorType + " should not have class when label.alignment=" + alignment), function(assert) {
              var $form = $('#form').dxForm({
                labelLocation: 'top',
                items: [{
                  itemType: 'group',
                  items: [{
                    itemType: 'group',
                    items: [{
                      dataField: editorType,
                      label: {
                        visible: true,
                        alignment: alignment
                      },
                      editorType: editorType
                    }]
                  }]
                }]
              });
              var $componentWrapper = $form.find((".dx-" + componentName)).parent();
              assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
            });
          });
        });
        test('editor should not have class if it is not CheckBox, Switch or RadioGroup', function(assert) {
          var $form = $('#form').dxForm({
            labelLocation: 'top',
            items: [{
              itemType: 'group',
              items: [{
                itemType: 'group',
                items: [{
                  dataField: 'default',
                  label: {
                    visible: true,
                    alignment: 'left'
                  }
                }]
              }]
            }]
          });
          var $componentWrapper = $form.find(("." + FIELD_ITEM_CONTENT_CLASS));
          assert.strictEqual($componentWrapper.hasClass(TOGGLE_CONTROLS_PADDING_CLASS), false);
        });
      });
      QUnit.module('Validation group', function() {
        var createFormInsideContainer = function(options) {
          var $container = $('#container').empty();
          return $('<div/>').appendTo($container).dxForm(options).dxForm('instance');
        };
        test('Set { items: [{dataField: name, isRequired: true}] }', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              isRequired: true
            }]});
          var form = $formContainer.dxForm('instance');
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          var validator = $validator.dxValidator('instance');
          assert.equal($validator.length, 1, 'validators count');
          assert.equal(validator.option('validationGroup'), form, 'validation group of the validator');
          assert.ok(ValidationEngine.getGroupConfig(form), 'form\'s validation group in the validation engine');
        });
        test('Set { items: [{dataField: name, isRequired: true}], showValidationSummary: true }', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            items: [{
              dataField: 'name',
              isRequired: true
            }]
          });
          var form = $formContainer.dxForm('instance');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), form, 'validation group of the validation summary');
        });
        test('Set { items: [{dataField: name, isRequired: true}], validationGroup: Test }', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{
              dataField: 'name',
              isRequired: true
            }],
            validationGroup: 'Test'
          });
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          var validator = $validator.dxValidator('instance');
          assert.equal($validator.length, 1, 'validators count');
          assert.equal(validator.option('validationGroup'), 'Test', 'validation group of the validator');
          assert.ok(ValidationEngine.getGroupConfig('Test'), 'form\'s validation group in the validation engine');
        });
        test('Set { items: [{dataField: name, isRequired: true}], validationGroup: Test, showValidationSummary: true }', function(assert) {
          var $formContainer = $('#form').dxForm({
            validationGroup: 'Test',
            showValidationSummary: true,
            items: [{
              dataField: 'name',
              isRequired: true
            }]
          });
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test', 'validation group of the validation summary');
        });
        test('Set { items: [{dataField: name}] }', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{dataField: 'name'}]});
          var form = $formContainer.dxForm('instance');
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          assert.equal($validator.length, 0, 'validators count');
          assert.ok(ValidationEngine.getGroupConfig(form), 'form\'s validation group in the validation engine');
        });
        test('Set { items: [{dataField: name}], showValidationSummary: true }', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{dataField: 'name'}],
            showValidationSummary: true
          });
          var form = $formContainer.dxForm('instance');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), form, 'validation group of the validation summary');
        });
        test('Set { items: [{dataField: name}], validationGroup: Test }', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{dataField: 'name'}],
            validationGroup: 'Test'
          });
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          assert.equal($validator.length, 0, 'validators count');
          assert.ok(ValidationEngine.getGroupConfig('Test'), 'form\'s validation group in the validation engine');
        });
        test('Set { items: [{dataField: name}], validationGroup: Test, showValidationSummary: true }', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{dataField: 'name'}],
            validationGroup: 'Test',
            showValidationSummary: true
          });
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test', 'validation group of the validation summary');
        });
        test('Create two forms, Set { items: [{dataField: name1}], Set { items: [{dataField: name2}]', function(assert) {
          var form1 = $('#form').dxForm({items: [{dataField: 'name1'}]}).dxForm('instance');
          var form2 = $('#form2').dxForm({items: [{dataField: 'name1'}]}).dxForm('instance');
          assert.ok(ValidationEngine.getGroupConfig(form1), 'form1 validation group in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig(form2), 'form2 validation group in the validation engine');
        });
        test('Set { items: [{dataField: name}] }, re-create form with same options', function(assert) {
          var options = {items: [{dataField: 'name'}]};
          var form1 = createFormInsideContainer(options);
          var form2 = createFormInsideContainer(options);
          assert.notOk(ValidationEngine.getGroupConfig(form1), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig(form2), 'the new validation group of the Form is contained in the validation engine');
        });
        test('Set { items: [{dataField: name}], validationGroup: Test1 }, re-create form with { items: [{dataField: name}], validationGroup: Test2 }', function(assert) {
          createFormInsideContainer({
            items: [{dataField: 'name'}],
            validationGroup: 'Test1'
          });
          createFormInsideContainer({
            items: [{dataField: 'name'}],
            validationGroup: 'Test2'
          });
          assert.notOk(ValidationEngine.getGroupConfig('Test1'), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig('Test2'), 'the new validation group of the Form is contained in the validation engine');
        });
      });
      QUnit.module('Grouping', function() {
        test('Render groups', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Smith',
              photo: 'image.png',
              address: {
                city: 'Test City',
                room: 11,
                house: 7,
                street: 'Test street'
              }
            },
            items: [{
              itemType: 'group',
              items: [{dataField: 'firstName'}, {dataField: 'lastName'}]
            }, {
              itemType: 'group',
              items: [{dataField: 'photo'}]
            }, {
              itemType: 'group',
              items: [{dataField: 'address.city'}, {dataField: 'address.street'}]
            }]
          });
          var $captions = $formContainer.find('.' + FORM_GROUP_CLASS + ' .' + FORM_GROUP_CAPTION_CLASS);
          var $groups = $formContainer.find('.' + FORM_GROUP_CLASS);
          var $labelTexts;
          assert.equal($formContainer.find('.' + FIELD_ITEM_CONTENT_CLASS).eq(0).children().length, 1, 'item content has only element with group');
          assert.equal($captions.length, 0, 'captions count');
          assert.equal($groups.length, 3, 'group elements count');
          assert.equal($groups.eq(0).find('.' + FIELD_ITEM_CLASS).length, 2, 'group1 field items count');
          $labelTexts = $groups.eq(0).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
          assert.equal($labelTexts.eq(0).text(), 'First Name:', 'group1 label text 1');
          assert.equal($labelTexts.eq(1).text(), 'Last Name:', 'group1 label text 2');
          assert.equal($groups.eq(1).find('.' + FIELD_ITEM_CLASS).length, 1, 'group2 field items count');
          $labelTexts = $groups.eq(1).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
          assert.equal($labelTexts.eq(0).text(), 'Photo:', 'group2 label text 1');
          assert.equal($groups.eq(2).find('.' + FIELD_ITEM_CLASS).length, 2, 'group3 field items count');
          $labelTexts = $groups.eq(2).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
          assert.equal($labelTexts.eq(0).text(), 'Address city:', 'group3 label text 1');
          assert.equal($labelTexts.eq(1).text(), 'Address street:', 'group3 label text 2');
        });
        test('ColCount for groups', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Smith',
              photo: 'image.png',
              address: {
                city: 'Test City',
                room: 11,
                house: 7,
                street: 'Test street'
              }
            },
            items: [{
              itemType: 'group',
              colCount: 3,
              items: [{dataField: 'firstName'}, {dataField: 'lastName'}]
            }, {
              itemType: 'group',
              items: [{dataField: 'photo'}]
            }, {
              itemType: 'group',
              colCount: 2,
              items: [{dataField: 'address.city'}, {dataField: 'address.street'}]
            }]
          });
          var $layoutManagers = $formContainer.find('.' + FORM_GROUP_CLASS + ' .' + FORM_LAYOUT_MANAGER_CLASS);
          assert.equal($layoutManagers.length, 3);
          assert.equal($layoutManagers.eq(0).dxLayoutManager('instance').option('colCount'), 3, 'colCount from 1 layout manager');
          assert.equal($layoutManagers.eq(1).dxLayoutManager('instance').option('colCount'), 1, 'colCount from 2 layout manager');
          assert.equal($layoutManagers.eq(2).dxLayoutManager('instance').option('colCount'), 2, 'colCount from 3 layout manager');
        });
        test('Caption of group', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Smith'
            },
            items: [{
              itemType: 'group',
              caption: 'Personal',
              items: [{dataField: 'firstName'}, {dataField: 'lastName'}]
            }]
          });
          var $captions = $formContainer.find('.' + FORM_GROUP_CLASS + ' .' + FORM_GROUP_CAPTION_CLASS);
          assert.equal($captions.length, 1);
          assert.equal($captions.eq(0).text(), 'Personal');
        });
        test('helpText element didn\'t render for group item', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {firstName: 'John'},
            items: [{
              itemType: 'group',
              caption: 'Personal',
              helpText: 'Help Text',
              items: [{dataField: 'firstName'}]
            }]
          });
          var $helpTextElement = $formContainer.find('.' + FIELD_ITEM_HELP_TEXT_CLASS);
          assert.equal($helpTextElement.length, 0, 'There is no helpText element');
        });
        test('Group template', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Dow',
              biography: 'bla-bla-bla'
            },
            items: [{
              itemType: 'group',
              caption: 'Personal info',
              items: [{dataField: 'firstName'}, {dataField: 'lastName'}]
            }, {
              itemType: 'group',
              caption: 'Bio',
              template: function(data, container) {
                assert.deepEqual(isRenderer(container), !!config().useJQuery, 'container is correct');
                $('<div>').text(data.formData.biography).addClass('template-biography').appendTo(container);
              }
            }]
          });
          var $groups = $formContainer.find('.' + FORM_GROUP_CLASS);
          assert.equal($groups.length, 2, '2 groups rendered');
          assert.equal($groups.eq(1).find('.template-biography').length, 1, 'We have template content');
          assert.equal($groups.eq(1).find('.template-biography').text(), 'bla-bla-bla', 'Template\'s content has correct data');
        });
        test('Simple Item labelTemplate', function(assert) {
          var labelClass = 'label-template';
          var $formContainer = $('#form').dxForm({
            formData: {firstName: 'John'},
            items: [{
              itemType: 'group',
              caption: 'Personal info',
              items: [{
                dataField: 'firstName',
                label: {template: function(data, container) {
                    assert.deepEqual(isRenderer(container), !!config().useJQuery, 'container is correct');
                    $('<div>').text(data.text + ' ?').addClass(labelClass).appendTo(container);
                  }}
              }]
            }]
          });
          var $groups = $formContainer.find(("." + FIELD_ITEM_CLASS));
          assert.strictEqual($groups.length, 2, '2 groups rendered');
          assert.strictEqual($groups.eq(0).find(("." + labelClass)).length, 1, 'label template content');
          assert.strictEqual($groups.eq(0).find(("." + labelClass)).text(), 'First Name: ?', 'Labels\'s content has correct data');
        });
        test('Template has correct component instance', function(assert) {
          var templateOwnerComponent;
          $('#form').dxForm({items: [{
              name: 'test',
              template: function(data, $container) {
                templateOwnerComponent = data.component.NAME;
              }
            }]});
          assert.equal(templateOwnerComponent, 'dxForm', 'Template\'s data.component is \'dxForm\'');
        });
        test('Recursive grouping', function(assert) {
          var form = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Dow',
              biography: 'bla-bla-bla',
              photo: 'test photo',
              sex: true,
              room: 1001,
              city: 'Tallinn'
            },
            items: [{
              itemType: 'group',
              items: [{
                itemType: 'group',
                caption: 'Personal info',
                items: ['firstName', 'lastName']
              }, {
                itemType: 'group',
                caption: 'Description',
                items: ['biography', 'photo']
              }]
            }, {
              itemType: 'group',
              items: [{
                itemType: 'group',
                caption: 'Sex',
                items: ['sex']
              }, {
                itemType: 'group',
                caption: 'Address',
                items: ['room', 'city']
              }]
            }]
          }).dxForm('instance');
          var template = $('<div/>');
          var items = form._testResultItems;
          items[0].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 1');
          template.empty();
          items[0].items[0].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 1 internal group 1');
          template.empty();
          items[0].items[1].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 1 internal group 2');
          template.empty();
          items[1].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 1');
          template.empty();
          items[1].items[0].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 2 internal group 1');
          template.empty();
          items[1].items[1].template.render({
            model: {editorOptions: {inputAttr: {}}},
            container: template
          });
          assert.equal(template.find('> .' + FORM_GROUP_CLASS).length, 1, 'external group 2 internal group 2');
          template.empty();
          template.remove();
        });
        test('Hide nested group item', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              photo: 'image.png',
              address: {
                city: 'Test City',
                street: 'Test street'
              }
            },
            items: [{
              itemType: 'group',
              items: [{
                itemType: 'group',
                items: ['photo']
              }, {
                itemType: 'group',
                items: ['address.city', 'address.street']
              }]
            }]
          });
          var form = $formContainer.dxForm('instance');
          var $formGroups = $formContainer.find('.' + FORM_GROUP_CLASS);
          assert.equal($formGroups.length, 3, '3 groups were rendered');
          form.option('items[0].items[1].visible', false);
          $formGroups = $formContainer.find('.' + FORM_GROUP_CLASS);
          assert.equal($formGroups.length, 2, 'Two groups were rendered');
        });
        [undefined, null, []].forEach(function(groupItems) {
          test(("The empty group should not be rendered items when an items option has " + formatTestValue(groupItems) + " value"), function(assert) {
            var form = $('#form').dxForm({
              formData: {field: 'Test'},
              items: [{
                itemType: 'group',
                items: groupItems
              }]
            }).dxForm('instance');
            var $layoutManager = $(("." + FORM_GROUP_CONTENT_CLASS + " > ." + FORM_LAYOUT_MANAGER_CLASS));
            assert.equal($layoutManager.length, 1, 'layout manager is rendered');
            assert.notOk($layoutManager.children().length, 'layout manager content is empty');
            assert.notOk(form.getEditor('field'), 'editor is not created');
          });
        });
        test('Group should have aria-labelledby attribute equal to caption id', function(assert) {
          var $formContainer = $('#form').dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Dow',
              biography: 'bla-bla-bla',
              photo: 'test photo'
            },
            items: [{
              itemType: 'group',
              caption: 'Personal Info',
              items: ['firstName', 'lastName']
            }, {
              itemType: 'group',
              caption: 'Description',
              items: ['biography', 'photo']
            }]
          });
          var $groups = $formContainer.find(("." + FORM_GROUP_CLASS));
          var $firstCaption = $groups.eq(0).find(("." + FORM_GROUP_CAPTION_CLASS));
          var $secondCaption = $groups.eq(1).find(("." + FORM_GROUP_CAPTION_CLASS));
          assert.strictEqual($groups.length, 2, '2 groups rendered');
          assert.ok($groups.get(0).hasAttribute('aria-labelledby'), 'first group has aria-labelledby attribute');
          assert.strictEqual($groups.eq(0).attr('aria-labelledby'), $firstCaption.eq(0).attr('id'), 'aria-labelledby and id of caption are equal');
          assert.ok($groups.get(1).hasAttribute('aria-labelledby'), 'second group has aria-labelledby attribute');
          assert.strictEqual($groups.eq(1).attr('aria-labelledby'), $secondCaption.eq(0).attr('id'), 'aria-labelledby and id of caption are equal');
        });
      });
      QUnit.module('Tabs', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          responsiveBoxScreenMock.setup.call(this, 1200);
        },
        afterEach: function() {
          this.clock.restore();
          responsiveBoxScreenMock.teardown.call(this);
        }
      }, function() {
        test('Render tabs', function(assert) {
          var testContainer = $('#form');
          testContainer.dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Smith',
              sex: true,
              order: 101,
              photo: 'image.png',
              address: {
                city: 'Test City',
                room: 11,
                house: 7,
                street: 'Test street'
              }
            },
            items: [{
              itemType: 'group',
              colCount: 2,
              items: ['firstName', 'lastName']
            }, {
              itemType: 'tabbed',
              tabPanelOptions: {
                animationEnabled: true,
                deferRendering: windowUtils.hasWindow() ? true : false
              },
              tabs: [{
                title: 'Address1',
                items: ['address.city', 'address.street']
              }, {
                title: 'Address2',
                items: ['address.room', 'address.house']
              }]
            }]
          });
          var tabPanel = $('.dx-tabpanel').dxTabPanel('instance');
          var tabPanelItems = tabPanel.option('items');
          assert.equal(tabPanel.option('animationEnabled'), true, 'tab panel option');
          assert.equal(tabPanelItems.length, 2, 'items count in tab panel');
          assert.equal(tabPanelItems[0].title, 'Address1', 'title of tab 1');
          assert.equal(tabPanelItems[1].title, 'Address2', 'title of tab 2');
          assert.notEqual(testContainer.find('.dx-multiview-item .' + FORM_LAYOUT_MANAGER_CLASS).length, 0, 'layout manager inside multiview item');
        });
        test('Render tabs with groups', function(assert) {
          var clock = sinon.useFakeTimers();
          var testContainer = $('#form');
          testContainer.dxForm({
            formData: {
              firstName: 'John',
              lastName: 'Smith',
              order: 101,
              photo: 'image.png',
              address: {
                city: 'Test City',
                room: 11,
                house: 7,
                street: 'Test street'
              }
            },
            items: [{
              itemType: 'tabbed',
              tabPanelOptions: {deferRendering: windowUtils.hasWindow() ? true : false},
              tabs: [{
                title: 'Other1',
                items: [{
                  itemType: 'group',
                  colCount: 2,
                  items: ['firstName', 'lastName']
                }, {
                  itemType: 'group',
                  items: ['address.city', 'address.street']
                }]
              }, {
                title: 'Other2',
                items: [{
                  itemType: 'group',
                  colCount: 2,
                  items: ['address.room', 'address.house']
                }]
              }]
            }]
          });
          clock.tick();
          var $groups = testContainer.find('.dx-item-selected ' + '.' + FORM_GROUP_CLASS);
          assert.equal($groups.length, 2);
          assert.equal($groups.eq(0).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 1');
          assert.equal($groups.eq(1).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 2');
          testContainer.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
          $groups = testContainer.find('.dx-item-selected ' + '.' + FORM_GROUP_CLASS);
          assert.equal($groups.eq(0).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 1');
          assert.notEqual($groups.length, 0);
          clock.restore();
        });
        test('tabElement argument of tabTemplate option is correct', function(assert) {
          var testContainer = $('#form');
          testContainer.dxForm({
            formData: {firstName: ''},
            items: [{
              itemType: 'tabbed',
              tabPanelOptions: {deferRendering: windowUtils.hasWindow() ? true : false},
              tabs: [{
                items: ['firstName'],
                tabTemplate: function(tabData, tabIndex, tabElement) {
                  assert.equal(isRenderer(tabElement), !!config().useJQuery, 'tabElement is correct');
                }
              }]
            }]
          });
        });
        [undefined, null, []].forEach(function(tabbedItems) {
          test(("The empty tab should not be rendered items when an items option has " + formatTestValue(tabbedItems) + " value"), function(assert) {
            var form = $('#form').dxForm({
              formData: {field: 'Test'},
              items: [{
                itemType: 'tabbed',
                tabs: [{items: tabbedItems}]
              }]
            }).dxForm('instance');
            var $layoutManager = $(("." + MULTIVIEW_ITEM_CONTENT_CLASS + " > ." + FORM_LAYOUT_MANAGER_CLASS));
            assert.equal($layoutManager.length, 1, 'layout manager is rendered');
            assert.notOk($layoutManager.children().length, 'layout manager content is empty');
            assert.notOk(form.getEditor('field'), 'editor is not created');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/resize_callbacks","core/utils/window","../../helpers/responsiveBoxScreenMock.js","core/utils/type","core/config","ui/form","ui/form/constants","ui/form/components/field_item","ui/validation_engine","ui/text_area","ui/radio_group","ui/switch","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/resize_callbacks"), require("core/utils/window"), require("../../helpers/responsiveBoxScreenMock.js"), require("core/utils/type"), require("core/config"), require("ui/form"), require("ui/form/constants"), require("ui/form/components/field_item"), require("ui/validation_engine"), require("ui/text_area"), require("ui/radio_group"), require("ui/switch"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.markup.tests.js.map