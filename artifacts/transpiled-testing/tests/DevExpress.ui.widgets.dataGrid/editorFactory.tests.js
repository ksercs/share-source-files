!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/editorFactory.tests.js"], ["jquery","core/element_data","ui/data_grid","ui/autocomplete","ui/calendar","ui/color_box","ui/drop_down_box","ui/html_editor","ui/lookup","ui/radio_group","ui/range_slider","ui/slider","ui/switch","ui/tag_box","ui/text_area","../../helpers/executeAsyncMock.js","localization/date","core/utils/browser","core/devices","ui/select_box","../../helpers/dataGridMocks.js","core/config","core/utils/type","core/utils/common"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/editorFactory.tests.js", ["jquery", "core/element_data", "ui/data_grid", "ui/autocomplete", "ui/calendar", "ui/color_box", "ui/drop_down_box", "ui/html_editor", "ui/lookup", "ui/radio_group", "ui/range_slider", "ui/slider", "ui/switch", "ui/tag_box", "ui/text_area", "../../helpers/executeAsyncMock.js", "localization/date", "core/utils/browser", "core/devices", "ui/select_box", "../../helpers/dataGridMocks.js", "core/config", "core/utils/type", "core/utils/common"], function($__export) {
  "use strict";
  var $,
      dataUtils,
      TextArea,
      executeAsyncMock,
      dateLocalization,
      browser,
      devices,
      SelectBox,
      MockColumnsController,
      MockDataController,
      setupDataGridModules,
      config,
      typeUtils,
      noop,
      TEXTEDITOR_INPUT_SELECTOR;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      TextArea = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      SelectBox = $__m.default;
    }, function($__m) {
      MockColumnsController = $__m.MockColumnsController;
      MockDataController = $__m.MockDataController;
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <style nonce=\"qunit-test\">\n            .qunit-fixture-static {\n                 position: absolute !important;\n                 left: 0 !important;\n                 top: 0 !important;\n            }\n             .dx-scrollable-native-ios .dx-scrollable-content {\n                 padding: 0 !important;\n            }\n        </style>\n        <div>\n            <div class=\"dx-datagrid\">\n                <div id=\"container\"></div>\n            </div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
      QUnit.module('Editor Factory', {
        beforeEach: function() {
          SelectBox.defaultOptions({options: {deferRendering: false}});
          setupDataGridModules(this, ['editorFactory']);
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          executeAsyncMock.teardown();
          this.dispose();
        }
      }, function() {
        ['dxAutocomplete', 'dxCalendar', 'dxCheckBox', 'dxColorBox', 'dxDateBox', 'dxDropDownBox', 'dxHtmlEditor', 'dxLookup', 'dxNumberBox', 'dxRadioGroup', 'dxRangeSlider', 'dxSelectBox', 'dxSlider', 'dxSwitch', 'dxTagBox', 'dxTextArea', 'dxTextBox'].forEach(function(editorType) {
          QUnit.test(("Prepare editor based on editorType: " + editorType), function(assert) {
            var $container = $('#container');
            var editorOptions = {
              editorType: editorType,
              dataType: 'string'
            };
            if (editorType === 'dxDateBox') {
              editorOptions.dataType = 'date';
            } else if (editorType === 'dxRangeSlider') {
              editorOptions.value = [];
            }
            this.options.onEditorPreparing = function(options) {
              assert.strictEqual(options.editorName, editorType, ("editorName is set correctly: " + editorType));
              if (['dxSelectBox', 'dxLookup'].includes(editorType)) {
                assert.strictEqual(options.editorOptions.valueChangeEvent, undefined, ("Prepare " + editorType + " without the 'valueChangeEvent' option"));
              }
            };
            this.editorFactoryController.init();
            this.editorFactoryController.createEditor($container, editorOptions);
            var editor = $container[editorType]('instance');
            assert.ok(editor, 'editor created');
          });
        });
        QUnit.test('Text editor', function(assert) {
          var $container = $('#container');
          var value = 'A';
          this.editorFactoryController.createEditor($container, {
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var textBox = $container.dxTextBox('instance');
          var valueChangeEvent = textBox.option('valueChangeEvent');
          assert.ok(textBox, 'dxTextBox created');
          assert.equal(textBox.option('value'), 'A', 'text editor value');
          assert.ok(textBox._supportedKeys().enter, 'enter handler is defined');
          assert.notEqual(textBox._supportedKeys().enter, noop, 'enter handler is not noop');
          textBox.option('value', 'B');
          assert.equal(valueChangeEvent, 'change', 'value change event is correct');
          assert.equal(value, 'B', 'value after change');
        });
        QUnit.test('Editor should not convert value to string if editorType is defined and not equal to dxTextBox', function(assert) {
          var $container = $('#container');
          var value = [];
          this.editorFactoryController.createEditor($container, {
            editorType: 'dxSelectBox',
            parentType: 'dataRow',
            value: value
          });
          var editor = $container.dxSelectBox('instance');
          assert.ok(editor, 'editor created');
          assert.strictEqual(editor.option('value'), value, 'editor value was not converted to string');
        });
        QUnit.test('Text editor enter in ios (T344096)', function(assert) {
          if (!browser.webkit) {
            assert.ok(true, 'Not webkit browser');
            return;
          }
          var $container = $('#container');
          var value = 'A';
          var originalDevice = devices.real();
          devices.real({ios: true});
          this.editorFactoryController.createEditor($container, {
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var textBox = $container.dxTextBox('instance');
          var valueChangeEvent = textBox.option('valueChangeEvent');
          assert.ok(textBox, 'dxTextBox created');
          assert.equal(textBox.option('value'), 'A', 'text editor value');
          $container.find('input').on('blur', function(e) {
            $(e.target).trigger('change');
          });
          $container.find('input').focus();
          $container.find('input').val('AB');
          $container.find('input').trigger($.Event('keydown', {key: 'Enter'}));
          assert.equal(valueChangeEvent, 'change', 'value change event for ios');
          assert.equal(value, 'AB', 'value after change');
          devices.real(originalDevice);
        });
        QUnit.test('Text editor with set onEditorPreparing', function(assert) {
          var $container = $('#container');
          var textBox;
          this.options.onEditorPreparing = function(options) {
            assert.strictEqual(options.setValue(), 'Test', 'option value');
            assert.equal(options.width, 100, 'option width');
            assert.strictEqual(options.parentType, 'filterRow', 'option parentType');
            options.cancel = true;
          };
          this.editorFactoryController.init();
          this.editorFactoryController.createEditor($container, {
            setValue: function() {
              return 'Test';
            },
            width: 100,
            parentType: 'filterRow'
          });
          textBox = dataUtils.data($container.get(0), 'dxTextBox');
          assert.equal(this.__actionConfigs.onEditorPreparing.category, 'rendering', 'onEditorPreparing category');
          assert.ok(!textBox, 'dxTextBox not created');
          this.editorFactoryController.option('onEditorPreparing', function(options) {
            options.cancel = false;
          });
          this.editorFactoryController.createEditor($container, {
            setValue: function() {
              return 'Test';
            },
            width: 100,
            parentType: 'filterRow'
          });
          textBox = $container.dxTextBox('instance');
          assert.ok(textBox, 'dxTextBox created');
        });
        QUnit.test('Text editor with set onEditorPrepared', function(assert) {
          var $container = $('#container');
          this.options.onEditorPrepared = function(options) {
            assert.strictEqual(options.setValue(), 'Test', 'option value');
            assert.equal(options.width, 100, 'option width');
            assert.strictEqual(options.parentType, 'filterRow', 'option parentType');
          };
          this.editorFactoryController.init();
          this.editorFactoryController.createEditor($container, {
            setValue: function() {
              return 'Test';
            },
            width: 100,
            parentType: 'filterRow'
          });
          var textBox = $container.dxTextBox('instance');
          assert.equal(this.__actionConfigs.onEditorPrepared.category, 'rendering', 'onEditorPrepared category');
          assert.ok(textBox, 'dxTextBox created');
        });
        QUnit.test('NumberBox', function(assert) {
          var $container = $('#container');
          var value = 124;
          this.editorFactoryController.createEditor($container, {
            dataType: 'number',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var numberBox = $container.dxNumberBox('instance');
          assert.ok(numberBox, 'dxNumberBox created');
          assert.equal(numberBox.option('value'), value, 'numberbox value');
          assert.ok(!$container.hasClass('dx-numberbox-spin'), 'numberbox render without spin buttons');
          numberBox.option('value', 321);
          assert.equal(value, 321, 'value after change');
        });
        QUnit.test('NumberBox with undefined value', function(assert) {
          var $container = $('#container');
          this.editorFactoryController.createEditor($container, {
            dataType: 'number',
            value: undefined
          });
          var numberBox = $container.dxNumberBox('instance');
          assert.ok(numberBox, 'dxNumberBox created');
          assert.equal(numberBox.option('value'), null, 'numberbox value');
        });
        QUnit.test('Change editorOptions on editorPreparing', function(assert) {
          var $container = $('#container');
          var editorPreparingCallCount = 0;
          var value = 124;
          this.options.onEditorPreparing = function(options) {
            editorPreparingCallCount++;
            if (options.editorName === 'dxNumberBox') {
              assert.ok(!options.editorOptions.showSpinButtons);
              options.editorOptions.showSpinButtons = true;
            }
          };
          this.editorFactoryController.init();
          this.editorFactoryController.createEditor($container, {
            dataType: 'number',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var numberBox = $container.dxNumberBox('instance');
          assert.ok(numberBox, 'dxNumberBox created');
          assert.equal(editorPreparingCallCount, 1, 'editorPreparing call count');
          assert.equal(numberBox.option('value'), value, 'numberbox value');
          assert.equal(numberBox.option('showSpinButtons'), true, 'showSpinButtons true');
          assert.ok($container.hasClass('dx-numberbox-spin'), 'numberbox render with spin buttons');
        });
        var DATAGRID_CHECKBOX_SIZE_CLASS = 'dx-datagrid-checkbox-size';
        QUnit.test('Boolean editor', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var checkBox = $container.dxCheckBox('instance');
          assert.ok(checkBox, 'dxCheckBox created');
          assert.ok(checkBox.$element().hasClass(DATAGRID_CHECKBOX_SIZE_CLASS), 'checkbox has dx-datagrid-checkbox-size class');
          assert.equal(checkBox.option('value'), true, 'checkbox editor value');
          assert.ok(checkBox.option('hoverStateEnabled'), 'hover enabled');
          assert.ok(checkBox.option('focusStateEnabled'), 'focus enabled');
          assert.ok(!checkBox.option('activeStateEnabled'), 'active disabled');
          assert.ok($container.parent().hasClass('dx-editor-inline-block'), 'parent has dx-editor-inline-block class');
          checkBox.option('value', false);
          assert.equal(value, false, 'value after change');
        });
        QUnit.test('Switch editor (T897363)', function(assert) {
          var $container = $('#container');
          var value = true;
          this.options.onEditorPreparing = function(e) {
            e.editorName = 'dxSwitch';
          };
          this.editorFactoryController.init();
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var switchInstance = $container.dxSwitch('instance');
          assert.ok(switchInstance, 'dxSwitch is created');
          assert.equal(switchInstance.option('value'), true, 'editor value');
          assert.ok($container.parent().hasClass('dx-editor-inline-block'), 'parent has dx-editor-inline-block class');
        });
        QUnit.test('Boolean editor when inOnForm is true', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            isOnForm: true,
            value: value
          });
          var checkBox = $container.dxCheckBox('instance');
          assert.ok(checkBox, 'dxCheckBox created');
          assert.notOk(checkBox.$element().hasClass(DATAGRID_CHECKBOX_SIZE_CLASS), 'checkbox not have dx-datagrid-checkbox-size class');
        });
        QUnit.test('Add custom tabIndex to Boolean editor', function(assert) {
          var $container = $('#container');
          this.editorFactoryController.option('tabIndex', 7);
          this.editorFactoryController.createEditor($container, {dataType: 'boolean'});
          var checkBox = $container.dxCheckBox('instance');
          assert.equal(checkBox.$element().attr('tabIndex'), '7', 'tabIndex attr of checkBox');
        });
        QUnit.test('Boolean editor with null value should be intermediate', function(assert) {
          var $container = $('#container');
          var value = null;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var checkBox = $container.dxCheckBox('instance');
          assert.ok(checkBox, 'dxCheckBox created');
          assert.equal(checkBox.option('value'), undefined, 'checkbox editor value is undefined');
        });
        QUnit.test('Date editor', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            format: 'shortDate',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var editor = $container.dxDateBox('instance');
          assert.ok(editor, 'dxDateBox created');
          assert.equal(editor.option('value'), value, 'editor value');
          editor.option('value', new Date(2013));
          assert.equal(editor.option('displayFormat'), 'shortDate', 'Widget format is correct');
          assert.deepEqual(value, new Date(2013), 'value after change');
          assert.equal(editor.option('dateSerializationFormat'), null, 'dateSerializationFormat is null');
        });
        QUnit.test('DateTime editor', function(assert) {
          var $container = $('#container');
          this.editorFactoryController.createEditor($container, {
            dataType: 'datetime',
            format: 'shortDateShortTime'
          });
          var editor = $container.dxDateBox('instance');
          assert.ok(editor, 'has editor');
          assert.equal(editor.option('type'), 'datetime', 'editor type');
          assert.equal(editor.option('displayFormat'), 'shortDateShortTime', 'display format of the editor');
        });
        QUnit.test('Date editor with datetime format changing value', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            format: 'shortDate',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var editor = $container.dxDateBox('instance');
          editor.option('format', 'datetime');
          editor.option('value', new Date(2013));
          assert.deepEqual(value, new Date(2013), 'value after change');
        });
        QUnit.test('Date editor with custom format (T146458)', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          var customFormat = 'dd.MM.yyyy';
          var mockGlobalizeLocalization = {format: function(date, format) {
              if (format === customFormat && date === value) {
                return '03.02.2012';
              }
            }};
          dateLocalization.inject(mockGlobalizeLocalization);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            editorOptions: {pickerType: 'calendar'},
            value: value,
            format: 'dd.MM.yyyy',
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var editor = $container.dxDateBox('instance');
          assert.equal(editor.option('displayFormat'), 'dd.MM.yyyy', 'Widget format is correct');
          assert.equal($container.find(TEXTEDITOR_INPUT_SELECTOR).val(), '03.02.2012', 'Widget display date with custom format');
        });
        QUnit.test('Date editor with custom editorOptions', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            format: 'shortDate',
            editorOptions: {pickerType: 'rollers'},
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var editor = $container.dxDateBox('instance');
          assert.equal(editor.option('pickerType'), 'rollers', 'pickerType from editorOptions');
        });
        QUnit.test('Boolean editor when filtering', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            parentType: 'filterRow',
            showAllText: '[All]',
            trueText: 'True',
            falseText: 'False',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), true, 'selectbox value');
          assert.deepEqual(selectBox.option('items'), [null, true, false], 'selectbox items');
          var listItems = $('.dx-list-item');
          assert.equal(listItems.length, 3, 'list items count');
          assert.equal(listItems.eq(0).text(), '[All]');
          assert.equal(listItems.eq(1).text(), 'True');
          assert.equal(listItems.eq(2).text(), 'False');
          selectBox.option('value', false);
          assert.equal(value, false, 'value after change');
        });
        QUnit.test('Boolean editor when filtering change value', function(assert) {
          var $container = $('#container');
          var value;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            parentType: 'filterRow',
            showAllText: '[All]',
            trueText: 'True',
            falseText: 'False',
            setValue: function(newValue) {
              value = newValue;
            }
          });
          assert.strictEqual($container.find(TEXTEDITOR_INPUT_SELECTOR).val(), '[All]');
          assert.strictEqual(value, undefined);
          $container.find('.dx-list-item:contains(\'False\')').trigger('dxclick');
          assert.strictEqual($container.find(TEXTEDITOR_INPUT_SELECTOR).val(), 'False', 'text after change to false');
          assert.strictEqual(value, false, 'value after change to false');
          $container.find('.dx-list-item:contains(\'True\')').trigger('dxclick');
          assert.strictEqual($container.find(TEXTEDITOR_INPUT_SELECTOR).val(), 'True', 'text after change to true');
          assert.strictEqual(value, true, 'value after change to true');
          $container.find('.dx-list-item:contains(\'[All]\')').trigger('dxclick');
          assert.strictEqual($container.find(TEXTEDITOR_INPUT_SELECTOR).val(), '[All]', 'text after change to null');
          assert.strictEqual(value, null, 'value after change to null');
        });
        QUnit.test('Boolean editor when filtering and no localized texts', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            parentType: 'filterRow',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), true, 'selectbox value');
          assert.deepEqual(selectBox.option('items'), [null, true, false], 'selectbox items');
          var listItems = $('.dx-list-item');
          assert.equal(listItems.length, 3, 'list items count');
          assert.equal(listItems.eq(0).text(), '');
          assert.equal(listItems.eq(1).text(), 'true');
          assert.equal(listItems.eq(2).text(), 'false');
          selectBox.option('value', false);
          assert.equal(value, false, 'value after change');
        });
        QUnit.test('Lookup editor', function(assert) {
          var $container = $('#container');
          var value = 2;
          var text;
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            showAllText: '(All)',
            value: value,
            setValue: function(newValue, newText) {
              value = newValue;
              text = newText;
            }
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), 2, 'selectbox value');
          assert.deepEqual(selectBox.option('items'), editorOptions.lookup.dataSource, 'selectbox items');
          assert.equal(selectBox.option('searchExpr'), 'value', 'selectbox searchExpr');
          var listItems = $('.dx-list-item');
          assert.equal(listItems.length, 3, 'list items count');
          assert.equal(listItems.eq(0).text(), 'text1');
          assert.equal(listItems.eq(1).text(), 'text2');
          assert.equal(listItems.eq(2).text(), 'text3');
          selectBox.option('value', 1);
          assert.equal(value, 1, 'value after change');
          assert.equal(text, 'text1', 'text after change');
        });
        QUnit.test('Lookup editor with 0 value', function(assert) {
          var $container = $('#container');
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 0,
                value: 'text1'
              }, {
                id: 1,
                value: 'text2'
              }, {
                id: 2,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            value: 0
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), 0, 'selectbox value');
          assert.equal(selectBox._input().val(), 'text1', 'selectbox text');
        });
        QUnit.test('Lookup editor with showClearButton', function(assert) {
          var $container = $('#container');
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value',
              allowClearing: true
            },
            setValue: function() {}
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox.option('showClearButton'), 'showClearButton');
        });
        QUnit.test('Lookup editor with allowClearing', function(assert) {
          var $container = $('#container');
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value',
              allowClearing: false
            },
            setValue: function() {}
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.strictEqual(selectBox.option('allowClearing'), false, 'allowClearing should be passed to the editor');
        });
        QUnit.test('Lookup editor with showClearButton and filtering', function(assert) {
          var $container = $('#container');
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value',
              allowClearing: true
            },
            parentType: 'filterRow',
            setValue: function() {}
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(!selectBox.option('showClearButton'), 'showClearButton');
        });
        QUnit.test('Lookup editor when filtering', function(assert) {
          var $container = $('#container');
          var value = 2;
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            parentType: 'filterRow',
            showAllText: '(All)',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), 2, 'selectbox value');
          assert.deepEqual(selectBox.option('items'), [null, {
            id: 1,
            value: 'text1'
          }, {
            id: 2,
            value: 'text2'
          }, {
            id: 3,
            value: 'text3'
          }], 'selectbox items');
          assert.equal(selectBox.option('searchExpr'), 'value', 'selectbox searchExpr');
          var listItems = $('.dx-list-item');
          assert.equal(listItems.length, 4, 'list items count');
          assert.equal(listItems.eq(0).text(), '(All)');
          assert.equal(listItems.eq(1).text(), 'text1');
          assert.equal(listItems.eq(2).text(), 'text2');
          assert.equal(listItems.eq(3).text(), 'text3');
          selectBox.option('value', null);
          assert.equal(value, null, 'value after change');
        });
        QUnit.test('Lookup editor with paging', function(assert) {
          var $container = $('#container');
          var value = 2;
          var editorOptions = {
            lookup: {
              dataSource: {
                store: [{
                  id: 1,
                  value: 'text1'
                }, {
                  id: 2,
                  value: 'text2'
                }, {
                  id: 3,
                  value: 'text3'
                }],
                pageSize: 2,
                paginate: true
              },
              valueExpr: 'id',
              displayExpr: 'value'
            },
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('value'), 2, 'selectbox value');
          assert.deepEqual(selectBox.option('items'), [{
            id: 1,
            value: 'text1'
          }, {
            id: 2,
            value: 'text2'
          }], 'selectbox items');
          var listItems = $('.dx-list-item');
          assert.equal(listItems.length, 2, 'list items count');
          assert.equal(listItems.eq(0).text(), 'text1');
          assert.equal(listItems.eq(1).text(), 'text2');
          selectBox.option('value', 1);
          assert.equal(value, 1, 'value after change');
        });
        QUnit.test('Lookup editor with searchExpr', function(assert) {
          var $container = $('#container');
          var value = 2;
          var editorOptions = {
            lookup: {
              dataSource: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              searchExpr: 'searchValue',
              displayExpr: 'value'
            },
            showAllText: '(All)',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox, 'dxSelectBox created');
          assert.equal(selectBox.option('searchExpr'), 'searchValue', 'selectbox searchExpr');
          assert.equal(selectBox.option('value'), 2, 'selectbox value');
        });
        QUnit.test('ReadOnly for textBox', function(assert) {
          var $container = $('#container');
          var value = 'A';
          this.editorFactoryController.createEditor($container, {
            value: value,
            setValue: function(newValue) {
              value = newValue;
            },
            readOnly: true
          });
          var textBox = $container.dxTextBox('instance');
          assert.ok(textBox.option('readOnly'));
        });
        QUnit.test('ReadOnly for numberBox', function(assert) {
          var $container = $('#container');
          var value = 'A';
          this.editorFactoryController.createEditor($container, {
            dataType: 'number',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            },
            readOnly: true
          });
          var numberBox = $container.dxNumberBox('instance');
          assert.ok(numberBox.option('readOnly'));
        });
        QUnit.test('ReadOnly for date editor', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            format: 'shortDate',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            },
            readOnly: true
          });
          var editor = $container.dxDateBox('instance');
          assert.ok(editor.option('readOnly'));
        });
        QUnit.test('ReadOnly for lookup', function(assert) {
          var $container = $('#container');
          var value = 2;
          var editorOptions = {
            lookup: {
              items: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            showAllText: '(All)',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            },
            readOnly: true
          };
          this.editorFactoryController.createEditor($container, editorOptions);
          var selectBox = $container.dxSelectBox('instance');
          assert.ok(selectBox.option('readOnly'));
        });
        QUnit.test('ReadOnly for boolean editor', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            },
            readOnly: true
          });
          var checkBox = $container.dxCheckBox('instance');
          assert.ok(checkBox.option('readOnly'), 'readonly');
          assert.ok(!checkBox.option('hoverStateEnabled'), 'no hover');
          assert.ok(!checkBox.option('focusStateEnabled'), 'no focus');
          assert.ok(!checkBox.option('activeStateEnabled'), 'no active');
        });
      });
      QUnit.module('Editor Factory - RTL', {
        beforeEach: function() {
          this.options = {rtlEnabled: true};
          setupDataGridModules(this, ['editorFactory']);
          executeAsyncMock.setup();
        },
        afterEach: function() {
          this.dispose();
          executeAsyncMock.teardown();
        }
      }, function() {
        QUnit.test('Create TextBox with RTL', function(assert) {
          var $container = $('#container');
          var value = 'a';
          this.editorFactoryController.createEditor($container, {setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }});
          var editor = $container.dxTextBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'textbox created with correct \'rtlEnabled\' option');
        });
        QUnit.test('Create Boolean editor with RTL', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }
          });
          var editor = $container.dxCheckBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'checkbox created with correct \'rtlEnabled\' option');
        });
        QUnit.test('Create date editor with RTL', function(assert) {
          var $container = $('#container');
          var value = new Date(2012, 1, 3);
          this.editorFactoryController.createEditor($container, {
            dataType: 'date',
            format: 'shortDate',
            setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }
          });
          var editor = $container.dxDateBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'date editor created with correct \'rtlEnabled\' option');
        });
        QUnit.test('Create Boolean editor with RTL when filtering', function(assert) {
          var $container = $('#container');
          var value = true;
          this.editorFactoryController.createEditor($container, {
            dataType: 'boolean',
            parentType: 'filterRow',
            showAllText: '[All]',
            trueText: 'True',
            falseText: 'False',
            setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }
          });
          var editor = $container.dxSelectBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'selectbox created with correct \'rtlEnabled\' option');
        });
        QUnit.test('Create lookup editor with RTL', function(assert) {
          var $container = $('#container');
          var value = 2;
          this.editorFactoryController.createEditor($container, {
            lookup: {
              items: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            showAllText: '(All)',
            setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }
          });
          var editor = $container.dxSelectBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'selectbox created with correct \'rtlEnabled\' option');
        });
        QUnit.test('Create lookup editor with RTL when filtering', function(assert) {
          var $container = $('#container');
          var value = 2;
          this.editorFactoryController.createEditor($container, {
            lookup: {
              items: [{
                id: 1,
                value: 'text1'
              }, {
                id: 2,
                value: 'text2'
              }, {
                id: 3,
                value: 'text3'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            },
            parentType: 'filterRow',
            showAllText: '(All)',
            setValue: function(newValue) {
              if (newValue === undefined) {
                return value;
              }
              value = newValue;
            }
          });
          var editor = $container.dxSelectBox('instance');
          assert.ok(editor.option('rtlEnabled'), 'selectbox created with correct \'rtlEnabled\' option');
        });
        QUnit.test('dxTextArea editor inserts new line by Enter and ends edit by Ctrl + Enter ', function(assert) {
          var $container = $('#container');
          var value = 'Some text';
          var event;
          this.editorFactoryController.createEditor($container, {
            editorType: 'dxTextArea',
            parentType: 'dataRow',
            value: value,
            setValue: function(newValue) {
              value = newValue;
            }
          });
          event = $.Event('keydown', {key: 'enter'});
          $($container.find('textarea')).trigger(event);
          assert.ok(event.isPropagationStopped(), 'enter propagation is stopped');
          event = $.Event('keydown', {
            key: 'enter',
            ctrlKey: true
          });
          $($container.find('textarea')).trigger(event);
          assert.ok(!event.isPropagationStopped(), 'enter + ctrl propagation is not stopped');
          event = $.Event('keydown', {
            key: 'enter',
            shiftKey: true
          });
          $($container.find('textarea')).trigger(event);
          assert.ok(!event.isPropagationStopped(), 'enter + shift propagation is not stopped');
        });
      });
      QUnit.module('Focus', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          that.$element = function() {
            return $('#container');
          };
          that.columns = [{
            caption: 'Column 1',
            visible: true,
            allowEditing: true,
            dataField: 'Column1'
          }, {
            caption: 'Column 2',
            visible: true,
            allowEditing: true,
            dataField: 'Column2'
          }, {
            caption: 'Column 3',
            visible: true,
            allowEditing: true,
            dataField: 'Column3'
          }, {
            caption: 'Column 4',
            visible: true,
            allowEditing: true,
            dataField: 'Column4',
            dataType: 'boolean',
            showEditorAlways: true
          }];
          that.setupDataGrid = function() {
            setupDataGridModules(that, ['data', 'rows', 'columns', 'editorFactory', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'validating', 'masterDetail'], {
              initViews: true,
              controllers: {
                columns: new MockColumnsController(that.columns),
                data: new MockDataController({
                  pageCount: 10,
                  pageIndex: 0,
                  pageSize: 6,
                  items: [{
                    values: ['test1', 'test2', 'test3', true],
                    rowType: 'data',
                    key: 0
                  }, {
                    values: ['test1', 'test2', 'test3', true],
                    rowType: 'data',
                    key: 1
                  }, {
                    values: ['test1', 'test2', 'test3', true],
                    rowType: 'data',
                    key: 2
                  }, {
                    values: ['test1', 'test2', 'test3', true],
                    rowType: 'data',
                    key: 3
                  }]
                })
              }
            });
          };
        },
        afterEach: function() {
          if (this.dispose) {
            this.dispose();
          }
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Update focus for cell of row', function(assert) {
          var testElement = $('#container');
          var isFocused;
          this.setupDataGrid();
          this._views.rowsView.render(testElement);
          this.editorFactoryController.component.element = function() {
            return $('#container');
          };
          this.editorFactoryController._getFocusedElement = function($dataGridElement) {
            return testElement.find('.dx-data-row td').eq(0);
          };
          this.editorFactoryController.focus = function() {
            isFocused = true;
          };
          this.editorFactoryController._updateFocusCore();
          assert.ok(isFocused, 'cell is focused');
        });
        QUnit.test('Call focus without parameter', function(assert) {
          this.setupDataGrid();
          this.editorFactoryController._$focusedElement = $('<div/>');
          assert.deepEqual(this.editorFactoryController.focus(), this.editorFactoryController._$focusedElement, 'focused element');
        });
        QUnit.test('Update focus on tab keydown', function(assert) {
          var testElement = $('#container');
          var isFocused;
          this.setupDataGrid();
          this._views.rowsView.render(testElement);
          this.editorFactoryController._getFocusedElement = function() {
            return testElement.find('.dx-data-row td').eq(0);
          };
          this.editorFactoryController.focus = function() {
            isFocused = true;
          };
          testElement.trigger($.Event('keydown.dxDataGridEditorFactory', {key: 'Tab'}));
          this.clock.tick(10);
          assert.ok(isFocused, 'cell is focused');
        });
        QUnit.test('Focus element', function(assert) {
          var testElement = $('#container');
          this.setupDataGrid();
          this.editorFactoryController.focus(testElement);
          this.clock.tick(10);
          assert.equal(this.editorFactoryController.focus(), testElement, 'focused element');
        });
        QUnit.test('Focus disabled on focused cell', function(assert) {
          var that = this;
          var testElement = $('#container');
          var isFocused;
          that.setupDataGrid();
          that.rowsView.render(testElement);
          that.editorFactoryController.component.element = function() {
            return testElement;
          };
          that.editorFactoryController._getFocusedElement = function($dataGridElement) {
            return testElement.find('.dx-data-row td').eq(0);
          };
          that.editorFactoryController.focus = function($element) {
            isFocused = true;
          };
          that.editorFactoryController._updateFocusCore();
          assert.ok(isFocused, 'cell is focused');
          testElement.find('.dx-data-row td').eq(0).addClass('dx-cell-focus-disabled');
          isFocused = false;
          that.editorFactoryController._updateFocusCore();
          assert.ok(!isFocused, 'cell with class dx-cell-focus-disabled is not focused');
        });
        QUnit.test('Focus on cell with focused checkbox editor', function(assert) {
          var that = this;
          var testElement = $('#container');
          var focusWithHiddenBorders;
          var isFocused;
          that.options = {editing: {
              mode: 'batch',
              allowUpdating: true
            }};
          that.setupDataGrid();
          that.rowsView.render(testElement);
          that.editorFactoryController.component.element = function() {
            return testElement;
          };
          that.editorFactoryController._getFocusedElement = function($dataGridElement) {
            return testElement.find('.dx-data-row .dx-checkbox').eq(0);
          };
          that.editorFactoryController.focus = function($element, hideBorders) {
            isFocused = true;
            focusWithHiddenBorders = hideBorders;
          };
          that.editorFactoryController._updateFocusCore();
          assert.ok(isFocused, 'cell is focused');
          assert.ok(focusWithHiddenBorders, 'focus borders are hidden when cell has class dx-editor-inline-block exists and editor is focused');
          isFocused = false;
          that.editorFactoryController.focus(testElement.find('.dx-data-row .dx-editor-inline-block'));
          assert.ok(isFocused, 'cell is focused');
          assert.ok(!focusWithHiddenBorders, 'focused cell with class dx-cell-focus-disabled has focus borders');
        });
        QUnit.testInActiveWindow('Focus on a filtering cell after editing cell in \'batch\' mode', function(assert) {
          var that = this;
          var $cell;
          var $testElement = $('#container');
          that.options = {
            showColumnHeaders: true,
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            filterRow: {visible: true},
            columns: [{
              allowEditing: true,
              dataField: 'name'
            }, {
              allowEditing: true,
              dataField: 'lastName'
            }, {
              allowEditing: true,
              dataField: 'age'
            }],
            dataSource: [{
              name: 'Bob',
              lastName: 'Smith',
              age: 19
            }, {
              name: 'Dmitry',
              lastName: 'Semenov',
              age: 31
            }, {
              name: 'George ',
              lastName: 'Bush',
              age: 51
            }]
          };
          that.$element = function() {
            return $('.dx-datagrid').parent();
          };
          setupDataGridModules(that, ['data', 'columns', 'rows', 'columnHeaders', 'filterRow', 'editorFactory', 'editing', 'editingCellBased', 'keyboardNavigation'], {initViews: true});
          that.columnHeadersView.render($testElement);
          that.rowsView.render($testElement);
          $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(1).children().eq(1).trigger('dxpointerdown');
          $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(1).children().eq(1).trigger('dxclick');
          that.clock.tick(10);
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(1).children().eq(1);
          assert.ok($cell.find('input').length, 'has input');
          assert.ok($cell.hasClass('dx-focused'), 'focused cell');
          $testElement.find('.dx-datagrid-filter-row input').eq(1).trigger('focus');
          $testElement.find('.dx-datagrid-filter-row input').eq(1).trigger('dxpointerdown');
          $testElement.find('.dx-datagrid-filter-row input').eq(1).trigger('dxclick');
          that.clock.tick(10);
          $cell = $testElement.find('.dx-datagrid-filter-row > td').eq(1);
          assert.ok($cell.hasClass('dx-focused'), 'focused cell');
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(1).children().eq(1);
          assert.ok(!$cell.find('input').length, 'not has input');
          assert.ok(!$cell.hasClass('dx-focused'), 'not focused cell');
        });
        QUnit.testInActiveWindow('Focus on dxLookup editor', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'if device is not desktop we do not test the case');
            return;
          }
          var that = this;
          var $cell;
          var $testElement = $('#container');
          that.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            columns: [{
              allowEditing: true,
              dataField: 'name',
              editCellTemplate: function(container, options) {
                assert.equal(typeUtils.isRenderer(container), !!config().useJQuery, 'editCellElement is correct');
                $('<div>').appendTo($(container)).dxLookup({});
              }
            }],
            dataSource: [{name: 'Bob'}]
          };
          that.$element = function() {
            return $('.dx-datagrid').parent();
          };
          setupDataGridModules(that, ['data', 'columns', 'rows', 'editorFactory', 'editing', 'editingCellBased', 'keyboardNavigation'], {initViews: true});
          that.rowsView.render($testElement);
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(0).children().eq(0);
          $cell.trigger('dxpointerdown');
          $cell.trigger('dxclick');
          that.clock.tick(10);
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(0).children().eq(0);
          assert.ok($cell.find('.dx-lookup-field').length, 'has lookup field');
          assert.ok($cell.hasClass('dx-focused'), 'cell is focused');
        });
        QUnit.testInActiveWindow('Focus on dxTextArea editor', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'if device is not desktop we do not test the case');
            return;
          }
          var that = this;
          var $cell;
          var $testElement = $('#container');
          that.options = {
            keyboardNavigation: {enabled: true},
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            columns: [{
              allowEditing: true,
              dataField: 'name',
              editCellTemplate: function(container, options) {
                new TextArea($('<div>').appendTo(container), {});
              }
            }],
            dataSource: [{name: 'Bob'}]
          };
          that.$element = function() {
            return $('.dx-datagrid').parent();
          };
          setupDataGridModules(that, ['data', 'columns', 'rows', 'editorFactory', 'editing', 'editingCellBased', 'keyboardNavigation'], {initViews: true});
          that.rowsView.render($testElement);
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(0).children().eq(0);
          $cell.trigger('dxpointerdown');
          $cell.trigger('dxclick');
          that.clock.tick(10);
          $cell = $testElement.find('.dx-datagrid-rowsview tbody > tr').eq(0).children().eq(0);
          assert.ok($cell.find('textarea').length, 'has lookup field');
          assert.ok($cell.hasClass('dx-focused'), 'cell is focused');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/element_data","ui/data_grid","ui/autocomplete","ui/calendar","ui/color_box","ui/drop_down_box","ui/html_editor","ui/lookup","ui/radio_group","ui/range_slider","ui/slider","ui/switch","ui/tag_box","ui/text_area","../../helpers/executeAsyncMock.js","localization/date","core/utils/browser","core/devices","ui/select_box","../../helpers/dataGridMocks.js","core/config","core/utils/type","core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/element_data"), require("ui/data_grid"), require("ui/autocomplete"), require("ui/calendar"), require("ui/color_box"), require("ui/drop_down_box"), require("ui/html_editor"), require("ui/lookup"), require("ui/radio_group"), require("ui/range_slider"), require("ui/slider"), require("ui/switch"), require("ui/tag_box"), require("ui/text_area"), require("../../helpers/executeAsyncMock.js"), require("localization/date"), require("core/utils/browser"), require("core/devices"), require("ui/select_box"), require("../../helpers/dataGridMocks.js"), require("core/config"), require("core/utils/type"), require("core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editorFactory.tests.js.map