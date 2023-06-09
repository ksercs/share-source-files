!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/filterBuilderParts/commonTests.js"], ["jquery","core/utils/type","core/devices","core/config","core/renderer","../../../helpers/filterBuilderTestData.js","ui/filter_builder/filter_builder","ui/drop_down_box","ui/button","./constants.js","./helpers.js","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/filterBuilderParts/commonTests.js", ["jquery", "core/utils/type", "core/devices", "core/config", "core/renderer", "../../../helpers/filterBuilderTestData.js", "ui/filter_builder/filter_builder", "ui/drop_down_box", "ui/button", "./constants.js", "./helpers.js", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      isRenderer,
      devices,
      config,
      renderer,
      fields,
      FILTER_BUILDER_ITEM_FIELD_CLASS,
      FILTER_BUILDER_ITEM_OPERATION_CLASS,
      FILTER_BUILDER_ITEM_VALUE_CLASS,
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS,
      FILTER_BUILDER_OVERLAY_CLASS,
      FILTER_BUILDER_GROUP_CLASS,
      FILTER_BUILDER_GROUP_OPERATION_CLASS,
      FILTER_BUILDER_IMAGE_ADD_CLASS,
      FILTER_BUILDER_IMAGE_REMOVE_CLASS,
      FILTER_BUILDER_RANGE_CLASS,
      FILTER_BUILDER_RANGE_START_CLASS,
      FILTER_BUILDER_RANGE_END_CLASS,
      FILTER_BUILDER_RANGE_SEPARATOR_CLASS,
      ACTIVE_CLASS,
      FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS,
      TREE_VIEW_CLASS,
      TREE_VIEW_ITEM_CLASS,
      DISABLED_STATE_CLASS,
      getSelectedMenuText,
      getFilterBuilderGroups,
      getFilterBuilderItems,
      clickByOutside,
      clickByValue,
      selectMenuItem,
      clickByButtonAndSelectMenuItem,
      implementationsMap;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      fields = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      FILTER_BUILDER_ITEM_FIELD_CLASS = $__m.FILTER_BUILDER_ITEM_FIELD_CLASS;
      FILTER_BUILDER_ITEM_OPERATION_CLASS = $__m.FILTER_BUILDER_ITEM_OPERATION_CLASS;
      FILTER_BUILDER_ITEM_VALUE_CLASS = $__m.FILTER_BUILDER_ITEM_VALUE_CLASS;
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = $__m.FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS;
      FILTER_BUILDER_OVERLAY_CLASS = $__m.FILTER_BUILDER_OVERLAY_CLASS;
      FILTER_BUILDER_GROUP_CLASS = $__m.FILTER_BUILDER_GROUP_CLASS;
      FILTER_BUILDER_GROUP_OPERATION_CLASS = $__m.FILTER_BUILDER_GROUP_OPERATION_CLASS;
      FILTER_BUILDER_IMAGE_ADD_CLASS = $__m.FILTER_BUILDER_IMAGE_ADD_CLASS;
      FILTER_BUILDER_IMAGE_REMOVE_CLASS = $__m.FILTER_BUILDER_IMAGE_REMOVE_CLASS;
      FILTER_BUILDER_RANGE_CLASS = $__m.FILTER_BUILDER_RANGE_CLASS;
      FILTER_BUILDER_RANGE_START_CLASS = $__m.FILTER_BUILDER_RANGE_START_CLASS;
      FILTER_BUILDER_RANGE_END_CLASS = $__m.FILTER_BUILDER_RANGE_END_CLASS;
      FILTER_BUILDER_RANGE_SEPARATOR_CLASS = $__m.FILTER_BUILDER_RANGE_SEPARATOR_CLASS;
      ACTIVE_CLASS = $__m.ACTIVE_CLASS;
      FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS = $__m.FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS;
      TREE_VIEW_CLASS = $__m.TREE_VIEW_CLASS;
      TREE_VIEW_ITEM_CLASS = $__m.TREE_VIEW_ITEM_CLASS;
      DISABLED_STATE_CLASS = $__m.DISABLED_STATE_CLASS;
    }, function($__m) {
      getSelectedMenuText = $__m.getSelectedMenuText;
      getFilterBuilderGroups = $__m.getFilterBuilderGroups;
      getFilterBuilderItems = $__m.getFilterBuilderItems;
      clickByOutside = $__m.clickByOutside;
      clickByValue = $__m.clickByValue;
      selectMenuItem = $__m.selectMenuItem;
      clickByButtonAndSelectMenuItem = $__m.clickByButtonAndSelectMenuItem;
    }, function($__m) {
      implementationsMap = $__m.implementationsMap;
    }],
    execute: function() {
      QUnit.module('Rendering', function() {
        QUnit.test('field menu test', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 'K&S Music']],
            fields: [{dataField: 'CompanyName'}, {
              dataField: 'Budget',
              visible: false
            }]
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          $fieldButton.trigger('dxclick');
          var $menuItem = $(("." + TREE_VIEW_ITEM_CLASS)).eq(1);
          assert.equal($menuItem.text(), 'Budget');
        });
        QUnit.test('deferRendering is enabled in menu', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({fields: [{dataField: 'CompanyName'}]});
          container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS).trigger('dxclick');
          var popupInstance = container.find('.' + FILTER_BUILDER_OVERLAY_CLASS).dxPopup('instance');
          assert.ok(popupInstance.option('deferRendering'));
        });
        QUnit.test('operation menu has between item with custom operation class', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 1]],
            fields: [{
              dataField: 'CompanyName',
              dataType: 'number'
            }]
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          $fieldButton.trigger('dxclick');
          var $customItems = $(("." + TREE_VIEW_CLASS)).find('.' + FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS);
          assert.equal($customItems.length, 1, 'one custom');
          assert.equal($customItems.text(), 'Is between', 'between is custom');
        });
        QUnit.test('value and operations depend on selected field', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: [['CompanyName', '=', 'K&S Music']],
            fields: fields
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          $fieldButton.trigger('dxclick');
          assert.ok($fieldButton.hasClass(ACTIVE_CLASS));
          assert.ok($('.dx-filterbuilder-fields').length > 0);
          var $menuItem = $(("." + TREE_VIEW_ITEM_CLASS)).eq(2);
          assert.equal($menuItem.text(), 'State');
          $menuItem.trigger('dxclick');
          assert.equal($fieldButton.html(), 'State');
          assert.ok(!$fieldButton.hasClass(ACTIVE_CLASS));
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS).text(), 'Contains');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).text(), '<enter a value>');
          assert.strictEqual($('.dx-filterbuilder-fields').length, 0);
        });
        QUnit.test('editorElement argument of onEditorPreparing option is correct', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['CompanyName', '=', 'DevExpress']],
            onEditorPreparing: function(e) {
              assert.equal(isRenderer(e.editorElement), !!config().useJQuery, 'editorElement is correct');
            },
            fields: fields
          });
          clickByValue();
        });
        QUnit.test('operations are changed after field change', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: [['State', '<>', 'K&S Music']],
            fields: fields
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS).text(), 'Does not equal');
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          $fieldButton.trigger('dxclick');
          var $menuItem = $(("." + TREE_VIEW_ITEM_CLASS)).eq(5);
          $menuItem.trigger('dxclick');
          assert.equal($fieldButton.html(), 'City');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS).text(), 'Equals');
        });
        QUnit.test('selected element must change in field menu after click', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['State', '<>', 'K&S Music']],
            fields: fields
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          $fieldButton.trigger('dxclick');
          assert.equal(getSelectedMenuText(), 'State');
          selectMenuItem(1);
          $fieldButton.trigger('dxclick');
          assert.equal(getSelectedMenuText(), 'Date');
        });
        QUnit.test('selected element must change in group operation menu after click', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['State', '<>', 'K&S Music']],
            fields: fields
          });
          var $groupButton = container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS);
          $groupButton.trigger('dxclick');
          assert.ok($('.dx-filterbuilder-group-operations').length > 0);
          assert.equal(getSelectedMenuText(), 'And');
          selectMenuItem(3);
          assert.strictEqual($('.dx-filterbuilder-group-operations').length, 0);
          $groupButton.trigger('dxclick');
          assert.equal(getSelectedMenuText(), 'Not Or');
        });
        QUnit.test('selected element must change in filter operation menu after click', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['Date', '=', '']],
            fields: fields
          });
          var $operationButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          $operationButton.trigger('dxclick');
          assert.ok($('.dx-filterbuilder-operations').length > 0);
          assert.equal(getSelectedMenuText(), 'Equals');
          selectMenuItem(3);
          assert.strictEqual($('.dx-filterbuilder-operations').length, 0);
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 1);
          $operationButton.trigger('dxclick');
          assert.equal(getSelectedMenuText(), 'Is greater than');
        });
        QUnit.test('check menu correct maxHeight & position', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['Date', '=', '']],
            fields: fields
          });
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(100);
          var windowHeight = sinon.stub(implementationsMap, 'getInnerHeight').returns(300);
          var offset = sinon.stub(renderer.fn, 'offset').returns({
            left: 0,
            top: 200
          });
          var $operationButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          $operationButton.trigger('dxclick');
          try {
            var popup = container.find('.dx-overlay').dxPopup('instance');
            var maxHeight = popup.option('maxHeight');
            var positionCollision = popup.option('position.collision');
            assert.ok(Math.floor(maxHeight()) < windowHeight(), 'maxHeight is correct');
            assert.equal(positionCollision, 'flip', 'collision is correct');
          } finally {
            scrollTop.restore();
            windowHeight.restore();
            offset.restore();
          }
        });
        QUnit.testInActiveWindow('click by dropdownbox specified editorTemplate', function(assert) {
          var container = $('#container');
          var INNER_ELEMENT_CLASS = 'test-inner-element';
          var VALUE = 'Value after click by button';
          container.dxFilterBuilder({
            value: ['Field', '=', 'Test1'],
            fields: [{
              dataField: 'Field',
              editorTemplate: function(options, $container) {
                $('<div>').appendTo($container).dxDropDownBox({
                  value: 3,
                  valueExpr: 'ID',
                  contentTemplate: function(e) {
                    var dropDownContent = $('<div>');
                    $('<div>').addClass(INNER_ELEMENT_CLASS).appendTo(dropDownContent);
                    $('<div>').appendTo(dropDownContent).dxButton({onClick: function() {
                        options.setValue(VALUE);
                      }});
                    return dropDownContent;
                  }
                });
              }
            }]
          });
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.equal($('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).length, 0, 'hide button');
          assert.equal($('.dx-dropdowneditor-button').length, 1, 'has one dropdowneditor button');
          $('.dx-dropdowneditor-button').trigger('dxclick');
          assert.equal($('.' + INNER_ELEMENT_CLASS).length, 1, 'dropdown opened');
          $('.' + INNER_ELEMENT_CLASS).trigger('dxclick');
          assert.equal($('.' + INNER_ELEMENT_CLASS).length, 1, 'dropdown opened after click by its inner element');
          $('.dx-button').trigger('dxclick');
          clickByOutside();
          assert.equal($('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), VALUE);
        });
        QUnit.test('Add and remove group', function(assert) {
          var container = $('#container');
          var instance = container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['State', '<>', 'Test'],
            fields: fields
          }).dxFilterBuilder('instance');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS), 1);
          assert.deepEqual(instance.option('value'), ['State', '<>', 'Test']);
          $('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(1).trigger('dxclick');
          assert.deepEqual(instance.option('value'), ['State', '<>', 'Test']);
        });
        QUnit.test('datebox returns null when a date value is specified as an empty string', function(assert) {
          $('#container').dxFilterBuilder({
            value: ['Date', '=', ''],
            fields: fields
          });
          $('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.equal($('.dx-datebox').dxDateBox('instance').option('value'), null);
        });
        QUnit.test('the formatter is applied to a field with the date type', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'This test is not actual for mobile devices');
            return;
          }
          $('#container').dxFilterBuilder({
            value: ['Date', '=', ''],
            fields: [{
              dataField: 'Date',
              dataType: 'date',
              format: 'dd.MM.yyyy'
            }]
          });
          $('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          $('.dx-datebox input').val('12/12/2017');
          $('.dx-datebox input').trigger('change');
          clickByOutside();
          assert.equal($('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), '12.12.2017');
        });
        QUnit.test('NumberBox with custom format', function(assert) {
          var $container = $('#container');
          $container.dxFilterBuilder({
            value: ['Weight', '=', 3.14],
            fields: [{
              dataField: 'Weight',
              dataType: 'number',
              editorOptions: {format: '#0.## kg'}
            }]
          });
          $('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.equal($container.find('.dx-texteditor-input').val(), '3.14 kg', 'numberbox formatted value');
        });
        QUnit.test('Menu popup hasn\'t target', function(assert) {
          var $container = $('#container');
          $container.dxFilterBuilder({
            value: ['Weight', '=', 3.14],
            fields: [{
              dataField: 'Weight',
              dataType: 'number'
            }]
          });
          $('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS).trigger('dxclick');
          assert.notOk($container.find('.' + FILTER_BUILDER_OVERLAY_CLASS).dxPopup('instance').option('target'), 'popup target shoud not be set');
        });
        QUnit.test('Menu wrapper has filter builder overlay class', function(assert) {
          var $container = $('#container');
          $container.dxFilterBuilder({
            value: ['Weight', '=', 3.14],
            fields: [{
              dataField: 'Weight',
              dataType: 'number'
            }]
          });
          $('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS).trigger('dxclick');
          assert.ok($('.dx-overlay-wrapper').hasClass(FILTER_BUILDER_OVERLAY_CLASS), 'overlay wrapper class');
        });
      });
      QUnit.module('Filter value', function() {
        QUnit.test('hide filter value for isblank & isNotBlank', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['State', '<>', 'K&S Music']],
            fields: fields
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 1);
          var $operationButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          clickByButtonAndSelectMenuItem($operationButton, 6);
          assert.equal($operationButton.text(), 'Is blank');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 0);
          clickByButtonAndSelectMenuItem($operationButton, 5);
          assert.equal($operationButton.text(), 'Does not equal');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 1);
          clickByButtonAndSelectMenuItem($operationButton, 7);
          assert.equal($operationButton.text(), 'Is not blank');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 0);
          clickByButtonAndSelectMenuItem($operationButton, 4);
          assert.equal($operationButton.text(), 'Equals');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 1);
        });
        QUnit.test('change filter value text when customOperation is selected', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['field', '=', 'K&S Music']],
            customOperations: [{name: 'customOperation'}],
            fields: [{
              dataField: 'field',
              filterOperations: ['=', 'customOperation']
            }]
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).text(), 'K&S Music');
          var $operationButton = container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          clickByButtonAndSelectMenuItem($operationButton, 1);
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).text(), '<enter a value>');
        });
        QUnit.test('execute customOperation.customizeText for field with lookup', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['field', 'customOperation', '1']],
            customOperations: [{
              name: 'customOperation',
              customizeText: function() {
                return 'custom text';
              }
            }],
            fields: [{
              dataField: 'field',
              lookup: {dataSource: ['1', '2']},
              filterOperations: ['customOperation']
            }]
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).text(), 'custom text');
        });
        QUnit.test('hide filter value for field with object dataType', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['State', '<>', 'K&S Music']],
            fields: fields
          });
          var $fieldButton = container.find('.' + FILTER_BUILDER_ITEM_FIELD_CLASS);
          clickByButtonAndSelectMenuItem($fieldButton, 6);
          assert.equal($fieldButton.text(), 'Caption of Object Field');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 0);
          clickByButtonAndSelectMenuItem($fieldButton, 2);
          assert.equal($fieldButton.text(), 'State');
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 1);
        });
        QUnit.test('hide filter value for customOperation', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: [['State', 'lastWeek']],
            customOperations: [{
              name: 'lastWeek',
              dataTypes: ['string'],
              hasValue: false
            }],
            fields: [{dataField: 'State'}]
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).length, 0);
        });
        QUnit.testInActiveWindow('value button loses focus after value change and outside click', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['State', '<>', 'K&S Music'],
            fields: fields
          }).dxFilterBuilder('instance');
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var textBoxInstance = $('.dx-textbox').dxTextBox('instance');
          textBoxInstance.option('value', 'Test');
          clickByOutside();
          var valueButton = container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          assert.notOk(valueButton.is(':focus'));
        });
        QUnit.testInActiveWindow('range start editor has focus', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['field', 'between', [1, 2]],
            fields: [{
              dataField: 'field',
              dataType: 'number'
            }]
          });
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var $rangeStartEditor = container.find('.' + FILTER_BUILDER_RANGE_START_CLASS + ' .dx-texteditor-input');
          assert.ok($rangeStartEditor.is(':focus'));
        });
        QUnit.testInActiveWindow('change filter value', function(assert) {
          var container = $('#container');
          var instance = container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['State', '<>', 'K&S Music'],
            fields: fields
          }).dxFilterBuilder('instance');
          var $valueButton = container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          $valueButton.trigger('dxclick');
          var $textBoxContainer = container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS + ' .dx-textbox');
          var textBoxInstance = $textBoxContainer.dxTextBox('instance');
          var $input = $textBoxContainer.find('input');
          assert.ok($input.is(':focus'));
          textBoxInstance.option('value', 'Test');
          $input.trigger('blur');
          assert.ok(container.find('input').length, 'has input');
          assert.notDeepEqual(instance.option('value'), ['State', '<>', 'Test']);
          clickByOutside();
          assert.deepEqual(instance.option('value'), ['State', '<>', 'Test']);
        });
        QUnit.testInActiveWindow('change filter value in selectbox', function(assert) {
          var $container = $('#container');
          var instance = $container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['CompanyName', '<>', 'KS Music'],
            fields: fields
          }).dxFilterBuilder('instance');
          var $valueButton = $container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          $valueButton.trigger('dxclick');
          var $input = $container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).find('input.dx-texteditor-input');
          assert.ok($input.is(':focus'));
          var selectBoxInstance = $container.find('.dx-selectbox').dxSelectBox('instance');
          selectBoxInstance.open();
          $('.dx-list-item').eq(1).trigger('dxclick');
          assert.ok($container.find('input').length, 'has input');
          assert.notDeepEqual(instance.option('value'), ['CompanyName', '<>', 'Super Mart of the West']);
          clickByOutside();
          assert.deepEqual(instance.option('value'), ['CompanyName', '<>', 'Super Mart of the West']);
        });
        QUnit.testInActiveWindow('change filter value in selectbox with different value and displayText', function(assert) {
          var $container = $('#container');
          var instance = $container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['Product', '=', 1],
            fields: fields
          }).dxFilterBuilder('instance');
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'DataGrid');
          var $valueButton = $container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          $valueButton.trigger('dxclick');
          var selectBoxInstance = $container.find('.dx-selectbox').dxSelectBox('instance');
          selectBoxInstance.open();
          $('.dx-list-item').eq(1).trigger('dxclick');
          clickByOutside();
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'PivotGrid');
          assert.deepEqual(instance.option('value'), ['Product', '=', 2]);
        });
        QUnit.testInActiveWindow('change filter value in selectbox with customizeText', function(assert) {
          var $container = $('#container');
          var customizeText = sinon.spy(function(e) {
            return 'customized ' + e.valueText;
          });
          var instance = $container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['test', '=', 'first'],
            fields: [{
              dataField: 'test',
              lookup: {dataSource: ['first', 'second']},
              customizeText: customizeText
            }]
          }).dxFilterBuilder('instance');
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'customized first');
          var $valueButton = $container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          $valueButton.trigger('dxclick');
          var selectBoxInstance = $container.find('.dx-selectbox').dxSelectBox('instance');
          selectBoxInstance.open();
          $('.dx-list-item').eq(1).trigger('dxclick');
          clickByOutside();
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'customized second');
          assert.deepEqual(instance.option('value'), ['test', '=', 'second']);
          assert.equal(customizeText.callCount, 2);
          assert.deepEqual(customizeText.firstCall.args[0], {
            value: 'first',
            valueText: 'first'
          });
          assert.deepEqual(customizeText.secondCall.args[0], {
            value: 'second',
            valueText: 'second'
          });
        });
        QUnit.testInActiveWindow('change filter value in selectbox with customizeText and displayExpr', function(assert) {
          var $container = $('#container');
          var customizeText = sinon.spy(function(e) {
            return 'customized ' + e.valueText;
          });
          var instance = $container.dxFilterBuilder({
            value: ['test', '=', 1],
            fields: [{
              dataField: 'test',
              lookup: {
                dataSource: [{
                  id: 1,
                  text: 'first'
                }, {
                  id: 2,
                  text: 'second'
                }],
                valueExpr: 'id',
                displayExpr: 'text'
              },
              customizeText: customizeText
            }]
          }).dxFilterBuilder('instance');
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'customized first');
          var $valueButton = $container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          $valueButton.trigger('dxclick');
          var selectBoxInstance = $container.find('.dx-selectbox').dxSelectBox('instance');
          selectBoxInstance.open();
          $('.dx-list-item').eq(1).trigger('dxclick');
          clickByOutside();
          assert.equal($container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'customized second');
          assert.deepEqual(instance.option('value'), ['test', '=', 2]);
          assert.equal(customizeText.callCount, 2);
          assert.deepEqual(customizeText.firstCall.args[0], {
            value: 1,
            valueText: 'first'
          });
          assert.deepEqual(customizeText.secondCall.args[0], {
            value: 2,
            valueText: 'second'
          });
        });
        QUnit.testInActiveWindow('check default value for number', function(assert) {
          var container = $('#container');
          var instance = container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['Zipcode', '<>', 123],
            fields: fields
          }).dxFilterBuilder('instance');
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var editorInstance = container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS + ' > div').dxNumberBox('instance');
          editorInstance.option('value', 0);
          clickByOutside();
          assert.deepEqual(instance.option('value'), ['Zipcode', '<>', 0]);
        });
        QUnit.testInActiveWindow('change filter value when specified editorTemplate', function(assert) {
          var container = $('#container');
          var instance = container.dxFilterBuilder({
            value: ['Field', '=', 'Test1'],
            fields: [{
              dataField: 'Field',
              editorTemplate: function(options, $container) {
                $('<input/>').val(options.val).on('change', function(e) {
                  options.setValue($(e.currentTarget).val());
                }).appendTo($container);
              }
            }]
          }).dxFilterBuilder('instance');
          var $valueButton = container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          assert.strictEqual($valueButton.text(), 'Test1', 'filter value');
          $valueButton.trigger('dxclick');
          var $input = container.find('input');
          assert.ok($input.is(':focus'));
          $input.val('Test2');
          $input.trigger('change');
          clickByOutside();
          $valueButton = container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          assert.strictEqual($valueButton.text(), 'Test2', 'filter value');
          assert.deepEqual(instance.option('value'), ['Field', '=', 'Test2']);
          assert.notOk(container.find('input').length, 'hasn\'t input');
        });
        QUnit.test('Two fields with the same dataField', function(assert) {
          var container = $('#container');
          var filterBuilder = container.dxFilterBuilder({
            value: [['field1', '<>', 'K&S Music']],
            fields: [{
              dataField: 'State',
              caption: 'field 1',
              name: 'field1'
            }, {
              dataField: 'State',
              caption: 'field 2',
              name: 'field2'
            }]
          }).dxFilterBuilder('instance');
          $('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).trigger('dxclick');
          assert.equal($('.' + TREE_VIEW_ITEM_CLASS).length, 2, 'treeview items count');
          assert.equal($('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).text(), 'field 1', 'initial field was set correctly');
          $('.' + TREE_VIEW_ITEM_CLASS).eq(1).trigger('dxclick');
          assert.equal($('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).text(), 'field 2', 'field was changed correctly');
          assert.equal($('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS).text(), 'Contains', 'operation was changed correctly');
          $('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var valueInput = container.find('input');
          valueInput.val('K&S Music');
          valueInput.find('input').trigger('change');
          clickByOutside();
          assert.deepEqual(filterBuilder.option('value'), ['field2', 'contains', 'K&S Music'], 'expression is correct');
        });
        QUnit.test('hierarchical fields', function(assert) {
          var container = $('#container');
          var $fields;
          container.dxFilterBuilder({
            value: [['id', '=', '1']],
            allowHierarchicalFields: true,
            fields: [{dataField: 'id'}, {dataField: 'address.state'}, {dataField: 'address.city'}]
          }).dxFilterBuilder('instance');
          $('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).trigger('dxclick');
          $fields = $('.' + TREE_VIEW_ITEM_CLASS);
          assert.equal($fields.length, 2, 'treeview items count');
          assert.equal($('.dx-treeview-toggle-item-visibility').length, 1, '');
          assert.equal($fields.eq(0).text(), 'Id');
          assert.equal($fields.eq(1).text(), 'Address');
          $('.dx-treeview-toggle-item-visibility').trigger('dxclick');
          $fields = $('.' + TREE_VIEW_ITEM_CLASS);
          assert.equal($fields.length, 4, 'treeview items count');
          assert.equal($fields.eq(0).text(), 'Id');
          assert.equal($fields.eq(1).text(), 'Address');
          assert.equal($fields.eq(2).text(), 'State');
          assert.equal($fields.eq(3).text(), 'City');
        });
        QUnit.test('hierarchical fields with two fields with the same dataField', function(assert) {
          var container = $('#container');
          var $fields;
          container.dxFilterBuilder({
            value: [['id', '=', '1']],
            allowHierarchicalFields: true,
            fields: [{dataField: 'id'}, {
              dataField: 'address.same',
              caption: 'State',
              name: 'State'
            }, {
              dataField: 'address.same',
              caption: 'City',
              name: 'City'
            }]
          }).dxFilterBuilder('instance');
          $('.' + FILTER_BUILDER_ITEM_FIELD_CLASS).trigger('dxclick');
          $fields = $('.' + TREE_VIEW_ITEM_CLASS);
          assert.equal($fields.length, 2, 'treeview items count');
          assert.equal($('.dx-treeview-toggle-item-visibility').length, 1, '');
          assert.equal($fields.eq(0).text(), 'Id');
          assert.equal($fields.eq(1).text(), 'Address');
          $('.dx-treeview-toggle-item-visibility').trigger('dxclick');
          $fields = $('.' + TREE_VIEW_ITEM_CLASS);
          assert.equal($fields.length, 4, 'treeview items count');
          assert.equal($fields.eq(0).text(), 'Id');
          assert.equal($fields.eq(1).text(), 'Address');
          assert.equal($fields.eq(2).text(), 'State');
          assert.equal($fields.eq(3).text(), 'City');
        });
      });
      QUnit.module('Create editor', function() {
        QUnit.test('dataType - number', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['Zipcode', '=', 98027],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          assert.ok(valueField.find('.dx-numberbox').dxNumberBox('instance'));
        });
        QUnit.test('dataType - string', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['State', '=', 'Test'],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          valueField.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.ok(valueField.find('.dx-textbox').dxTextBox('instance'));
        });
        QUnit.test('dataType - date', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['Date', '=', new Date()],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          var dateBoxInstance = valueField.find('.dx-datebox').dxDateBox('instance');
          assert.strictEqual(dateBoxInstance.option('type'), 'date');
        });
        QUnit.test('dataType - datetime', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['DateTime', '=', new Date()],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          var dateBoxInstance = valueField.find('.dx-datebox').dxDateBox('instance');
          assert.strictEqual(dateBoxInstance.option('type'), 'datetime');
        });
        QUnit.test('dataType - boolean', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['Contributor', '=', false],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          assert.ok(valueField.find('.dx-selectbox').dxSelectBox('instance'));
        });
        QUnit.test('dataType - object', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['ObjectField', '=', null],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          assert.notOk(valueField.length);
        });
        QUnit.test('field with lookup', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            allowHierarchicalFields: true,
            value: ['CompanyName', '=', 'Test'],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          assert.ok(valueField.find('.dx-selectbox').dxSelectBox('instance'));
        });
        QUnit.test('field.editorTemplate', function(assert) {
          var args;
          var fields = [{
            dataField: 'Field',
            editorTemplate: function(options, $container) {
              args = options;
              return $('<input/>').addClass('my-editor');
            }
          }];
          $('#container').dxFilterBuilder({
            value: [['Field', '=', 'value']],
            fields: fields
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          assert.ok(valueField.find('input').hasClass('my-editor'));
          assert.strictEqual(args.value, 'value', 'filter value');
          assert.strictEqual(args.filterOperation, '=', 'filter operation');
          assert.strictEqual(args.field.dataField, fields[0].dataField);
          assert.strictEqual(args.field.editorTemplate, fields[0].editorTemplate);
          assert.ok(args.setValue, 'has setValue');
        });
        QUnit.test('customOperation.editorTemplate', function(assert) {
          var args;
          var fields = [{dataField: 'Field'}];
          $('#container').dxFilterBuilder({
            value: [['Field', 'lastDays', 2]],
            fields: fields,
            customOperations: [{
              name: 'lastDays',
              dataTypes: ['string'],
              editorTemplate: function(options, $container) {
                args = options;
                return $('<input/>').addClass('my-editor');
              }
            }]
          });
          var valueField = $('.' + FILTER_BUILDER_ITEM_VALUE_CLASS).eq(0);
          clickByValue();
          assert.ok(valueField.find('input').hasClass('my-editor'));
          assert.strictEqual(args.value, 2, 'filter value');
          assert.strictEqual(args.filterOperation, 'lastDays', 'filter operation');
          assert.strictEqual(args.field.dataField, fields[0].dataField);
          assert.strictEqual(args.field.editorTemplate, fields[0].editorTemplate);
          assert.ok(args.setValue, 'has setValue');
        });
        QUnit.test('customOperation.editorTemplate has more priority than field.editorTemplate', function(assert) {
          var event;
          var fields = [{
            dataField: 'Field',
            dataType: 'number',
            editorTemplate: function(options, $container) {
              event = 'field.editorTemplate';
            }
          }];
          var instance = $('#container').dxFilterBuilder({
            value: [['Field', 'lastDays', 2]],
            fields: fields,
            customOperations: [{
              name: 'lastDays',
              dataTypes: ['number'],
              editorTemplate: function(options, $container) {
                event = 'customOperation.editorTemplate';
              }
            }]
          }).dxFilterBuilder('instance');
          clickByValue();
          assert.equal(event, 'customOperation.editorTemplate', 'customOperation.editorTemplate is executed');
          instance.option('value', ['Field', '=', 2]);
          clickByValue();
          assert.equal(event, 'field.editorTemplate', 'field.editorTemplate is executed');
        });
        QUnit.test('between.editorTemplate', function(assert) {
          var fields = [{
            dataField: 'Field',
            dataType: 'number'
          }];
          $('#container').dxFilterBuilder({
            value: [['Field', 'between', [1, 2]]],
            fields: fields
          });
          clickByValue();
          var $rangeContainer = $('.' + FILTER_BUILDER_RANGE_CLASS);
          var $editorStart = $rangeContainer.find('.' + FILTER_BUILDER_RANGE_START_CLASS);
          var $editorEnd = $rangeContainer.find('.' + FILTER_BUILDER_RANGE_END_CLASS);
          var $separator = $rangeContainer.find('.' + FILTER_BUILDER_RANGE_SEPARATOR_CLASS);
          assert.equal($editorStart.length, 1, 'Start editor is created');
          assert.equal($editorEnd.length, 1, 'End editor is created');
          assert.equal($separator.length, 1, 'Separator is created');
          assert.equal($editorStart.dxNumberBox('instance').option('value'), 1, 'Start editor value = 1');
          assert.equal($editorEnd.dxNumberBox('instance').option('value'), 2, 'End editor value = 2');
        });
      });
      QUnit.module('Short condition', function() {
        QUnit.test('check value field', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['CompanyName', 'K&S Music'],
            fields: fields
          });
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'K&S Music');
        });
        QUnit.test('check value input', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['CompanyName', 'K&S Music'],
            fields: fields
          });
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.equal(container.find('input').val(), 'K&S Music');
        });
        QUnit.test('check value field after change of operation field', function(assert) {
          var container = $('#container');
          var instance = container.dxFilterBuilder({
            value: ['CompanyName', 'K&S Music'],
            fields: fields
          }).dxFilterBuilder('instance');
          clickByButtonAndSelectMenuItem(container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS), 3);
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).text(), 'K&S Music');
          assert.deepEqual(instance.option('value'), ['CompanyName', 'endswith', 'K&S Music']);
        });
        QUnit.test('check value input after change of operation field', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            value: ['CompanyName', 'K&S Music'],
            fields: fields
          });
          container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS).trigger('dxclick');
          $('.dx-menu-item-text').eq(3).trigger('dxclick');
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          assert.equal(container.find('input').val(), 'K&S Music');
        });
      });
      QUnit.module('on value changed', function() {
        var changeValue = function(container, newValue) {
          container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).trigger('dxclick');
          var $textBoxContainer = container.find('.' + FILTER_BUILDER_ITEM_VALUE_CLASS + ' .dx-textbox');
          var textBoxInstance = $textBoxContainer.dxTextBox('instance');
          textBoxInstance.option('value', 'Test');
          return $textBoxContainer;
        };
        QUnit.test('add/remove empty group', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          var instance = container.dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          value = instance.option('value');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).eq(1), 0);
          assert.equal(instance.option('value'), value);
          value = instance.option('value');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(2), 0);
          assert.equal(instance.option('value'), value);
        });
        QUnit.test('add/remove group with condition', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          container.dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          assert.equal(getFilterBuilderGroups(container).length, 1);
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS), 1);
          assert.equal(getFilterBuilderGroups(container).length, 2);
          assert.equal(getFilterBuilderItems(container).length, 1);
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).eq(1), 0);
          assert.equal(getFilterBuilderItems(container).length, 2);
          assert.equal(getFilterBuilderGroups(container).length, 2);
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(1), 0);
          assert.equal(getFilterBuilderItems(container).length, 1);
          assert.equal(getFilterBuilderGroups(container).length, 1);
        });
        QUnit.test('add/remove conditions', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          container.dxFilterBuilder({
            value: value,
            fields: fields
          });
          assert.equal(getFilterBuilderItems(container).length, 1);
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS), 0);
          assert.equal(getFilterBuilderItems(container).length, 2);
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(1), 0);
          assert.equal(getFilterBuilderItems(container).length, 1);
        });
        QUnit.test('Should remove the group if the last condition in it is removed (T846991)', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          container.dxFilterBuilder({
            value: value,
            fields: fields
          });
          assert.equal(container.find('.' + FILTER_BUILDER_GROUP_CLASS).length, 2, 'root group and group with condition');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(0), 0);
          assert.equal(container.find('.' + FILTER_BUILDER_GROUP_CLASS).length, 1, 'group with condition is removed');
        });
        QUnit.test('Add-condition popup should be closed on scroll', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          container.dxFilterBuilder({
            value: value,
            fields: fields
          });
          $('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).trigger('dxclick');
          var popupInstance = container.children('.dx-filterbuilder-overlay').dxPopup('instance');
          assert.equal(popupInstance.option('hideOnParentScroll'), true, 'popup\'s hideOnParentScroll');
        });
        QUnit.test('Deleting of condition doesn\'t cause group deleting in controlled mode (React)', function(assert) {
          var container = $('#container');
          var value = [['Name', '=', 'John'], 'or', [['Name', '=', 'Fed'], 'and', ['Price', '>', 2000]]];
          var fields = [{dataField: 'Name'}, {
            dataField: 'Price',
            dataType: 'number'
          }];
          container.dxFilterBuilder({
            value: value,
            fields: fields,
            onValueChanged: function(e) {
              e.component.option('value', e.value);
            }
          });
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(3), 0);
          assert.equal(getFilterBuilderGroups(container).length, 2, 'Group is not deleted');
        });
        QUnit.test('add/remove not valid conditions', function(assert) {
          var container = $('#container');
          var value = [['Zipcode', '']];
          var instance = container.dxFilterBuilder({
            value: value,
            fields: [fields[3]]
          }).dxFilterBuilder('instance');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_ADD_CLASS), 0);
          assert.equal(instance.option('value'), value);
          value = instance.option('value');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_IMAGE_REMOVE_CLASS).eq(1), 0);
          assert.equal(instance.option('value'), value);
        });
        QUnit.test('change condition field', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          var instance = container.dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_ITEM_FIELD_CLASS), 2);
          assert.notEqual(instance.option('value'), value);
          value = instance.option('value');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_ITEM_FIELD_CLASS), 2);
          assert.equal(instance.option('value'), value);
        });
        QUnit.test('change condition operation', function(assert) {
          var container = $('#container');
          var value = [['CompanyName', 'K&S Music']];
          var instance = container.dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS), 2);
          assert.notEqual(instance.option('value'), value);
          value = instance.option('value');
          clickByButtonAndSelectMenuItem($('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS), 2);
          assert.equal(instance.option('value'), value);
        });
        QUnit.testInActiveWindow('change condition value by outer click', function(assert) {
          var container = $('#container');
          var value = [['State', '=', '']];
          var instance = container.dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          changeValue(container, 'Test');
          clickByOutside();
          assert.notEqual(instance.option('value'), value);
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).length, 1);
          value = instance.option('value');
          changeValue(container, 'Test');
          clickByOutside();
          assert.equal(instance.option('value'), value);
          assert.equal(container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).length, 1);
        });
        QUnit.test('change between value', function(assert) {
          var fields = [{
            dataField: 'Field',
            dataType: 'number'
          }];
          var value = [['Field', 'between', []]];
          var instance = $('#container').dxFilterBuilder({
            value: value,
            fields: fields
          }).dxFilterBuilder('instance');
          clickByValue();
          var $editorStart = $('.' + FILTER_BUILDER_RANGE_START_CLASS);
          $editorStart.dxNumberBox('instance').option('value', 0);
          clickByOutside();
          assert.deepEqual(instance.option('value')[2], [0, null]);
          instance.option('value', value);
          clickByValue();
          var $editorEnd = $('.' + FILTER_BUILDER_RANGE_END_CLASS);
          $editorEnd.dxNumberBox('instance').option('value', 0);
          clickByOutside();
          assert.deepEqual(instance.option('value')[2], [null, 0]);
        });
      });
      QUnit.module('Methods', function() {
        QUnit.test('getFilterExpression', function(assert) {
          var instance = $('#container').dxFilterBuilder({
            value: [['State', '<>', 'K&S Music'], 'and', ['OrderDate', 'lastDay']],
            fields: [{
              dataField: 'State',
              calculateFilterExpression: function(filterValue, selectedFieldOperation) {
                return [[this.dataField, selectedFieldOperation, filterValue], 'and', [this.dataField, '=', 'Some state']];
              }
            }, {dataField: 'OrderDate'}],
            customOperations: [{
              name: 'lastDay',
              dataTypes: ['string'],
              calculateFilterExpression: function(filterValue, field) {
                return [field.dataField, '>', '1'];
              }
            }]
          }).dxFilterBuilder('instance');
          assert.deepEqual(instance.getFilterExpression(), [[['State', '<>', 'K&S Music'], 'and', ['State', '=', 'Some state']], 'and', ['OrderDate', '>', '1']]);
        });
        QUnit.test('between is available in field.calculateFilterExpression', function(assert) {
          var instance = $('#container').dxFilterBuilder({
            value: [['field', 'between', [1, 5]]],
            fields: [{
              dataField: 'field',
              dataType: 'number',
              calculateFilterExpression: function(filterValue, selectedFieldOperation, target) {
                assert.strictEqual(target, 'filterBuilder');
                assert.strictEqual(selectedFieldOperation, 'between');
                return [[this.dataField, '>', filterValue[0]], 'and', [this.dataField, '<', filterValue[1]]];
              }
            }]
          }).dxFilterBuilder('instance');
          assert.deepEqual(instance.getFilterExpression(), [['field', '>', 1], 'and', ['field', '<', 5]]);
        });
      });
      QUnit.module('Group operations', function() {
        var checkPopupDisabledState = function(assert, container) {
          var groupButton = container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS);
          groupButton.trigger('dxclick');
          var popup = container.find(("." + FILTER_BUILDER_OVERLAY_CLASS));
          assert.ok(groupButton.hasClass(DISABLED_STATE_CLASS));
          assert.equal(popup.length, 0);
        };
        QUnit.test('change groupOperation array', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            groupOperations: ['and', 'or']
          });
          container.find('.' + FILTER_BUILDER_GROUP_OPERATION_CLASS).trigger('dxclick');
          var items = $(("." + TREE_VIEW_ITEM_CLASS));
          assert.equal(items.length, 2);
          assert.equal(items.eq(0).text(), 'And');
          assert.equal(items.eq(1).text(), 'Or');
        });
        QUnit.test('group operation contains 1 item', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            groupOperations: ['and']
          });
          checkPopupDisabledState(assert, container);
        });
        QUnit.test('group operation does not contain items', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            groupOperations: []
          });
          checkPopupDisabledState(assert, container);
        });
        QUnit.test('group operation is undefined', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            groupOperations: undefined
          });
          checkPopupDisabledState(assert, container);
        });
        QUnit.test('adding of groups is disabled', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            maxGroupLevel: 0,
            groupOperations: undefined
          }).dxFilterBuilder('instance');
          $('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).trigger('dxclick');
          var popup = container.find(("." + FILTER_BUILDER_OVERLAY_CLASS));
          assert.equal(popup.length, 0);
        });
        QUnit.test('nested level of groups = 1', function(assert) {
          var container = $('#container');
          container.dxFilterBuilder({
            fields: fields,
            maxGroupLevel: 1,
            groupOperations: undefined
          });
          $('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).trigger('dxclick');
          var popup = container.find(("." + FILTER_BUILDER_OVERLAY_CLASS));
          assert.equal(popup.length, 1);
          selectMenuItem(1);
          $('.' + FILTER_BUILDER_IMAGE_ADD_CLASS).eq(1).trigger('dxclick');
          popup = container.find(("." + FILTER_BUILDER_OVERLAY_CLASS));
          assert.equal(popup.length, 0);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/devices","core/config","core/renderer","../../../helpers/filterBuilderTestData.js","ui/filter_builder/filter_builder","ui/drop_down_box","ui/button","./constants.js","./helpers.js","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/devices"), require("core/config"), require("core/renderer"), require("../../../helpers/filterBuilderTestData.js"), require("ui/filter_builder/filter_builder"), require("ui/drop_down_box"), require("ui/button"), require("./constants.js"), require("./helpers.js"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=commonTests.js.map