!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.validationRules.tests.js"], ["jquery","core/utils/extend","core/utils/console","ui/validation_engine","core/utils/deferred","ui/form/ui.form","ui/text_area","ui/autocomplete","ui/calendar","ui/date_box","ui/drop_down_box","ui/html_editor","../../helpers/ignoreQuillTimers.js","ui/lookup","ui/radio_group","ui/tag_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.validationRules.tests.js", ["jquery", "core/utils/extend", "core/utils/console", "ui/validation_engine", "core/utils/deferred", "ui/form/ui.form", "ui/text_area", "ui/autocomplete", "ui/calendar", "ui/date_box", "ui/drop_down_box", "ui/html_editor", "../../helpers/ignoreQuillTimers.js", "ui/lookup", "ui/radio_group", "ui/tag_box"], function($__export) {
  "use strict";
  var $,
      extend,
      logger,
      ValidationEngine,
      Deferred,
      INVALID_CLASS,
      VALIDATION_SUMMARY_ITEM_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      VALIDATION_SUMMARY_CLASS,
      VALIDATOR_CLASS,
      getID,
      createForm;
  function toString(val) {
    switch (val) {
      case undefined:
        return 'undefined';
      case null:
        return 'null';
      default:
        if (Array.isArray(val)) {
          return ("[" + val.length + " items]");
        }
        return val;
    }
  }
  function runChangeValidationRuleTest($__2) {
    var $__4,
        $__5,
        $__6;
    var $__3 = $__2,
        assert = $__3.assert,
        fieldValue = $__3.fieldValue,
        validationRules = $__3.validationRules,
        newValidationRules = $__3.newValidationRules,
        useItemOption = $__3.useItemOption,
        changeRulesFunc = ($__4 = $__3.changeRulesFunc) === void 0 ? null : $__4,
        checkOptionsFunc = ($__5 = $__3.checkOptionsFunc) === void 0 ? null : $__5,
        validationResult = $__3.validationResult,
        isKeepFocusSupported = ($__6 = $__3.isKeepFocusSupported) === void 0 ? true : $__6;
    var context = ("context: useItemOption = " + toString(useItemOption) + "; ") + ("validationRules = " + toString(validationRules) + "; ") + ("newValidationRules = " + toString(newValidationRules));
    var form = $('#form').dxForm({
      formData: {f1: fieldValue},
      items: [{
        dataField: 'f1',
        validationRules: validationRules
      }]
    }).dxForm('instance');
    $('#form').find('.' + TEXTEDITOR_INPUT_CLASS).focus();
    assert.ok($('#form').find('.' + TEXTEDITOR_INPUT_CLASS).is(':focus'), ("initial focus, " + context));
    assert.strictEqual($('#form').find('.' + INVALID_CLASS).length, 0, ("initial [" + INVALID_CLASS + "].length, " + context));
    if (changeRulesFunc === null) {
      if (useItemOption) {
        form.itemOption('f1', 'validationRules', newValidationRules);
      } else {
        form.option('items[0].validationRules', newValidationRules);
      }
    } else {
      changeRulesFunc(form);
    }
    if (checkOptionsFunc === null) {
      assert.strictEqual(form.option('items[0].validationRules'), newValidationRules, context);
      assert.strictEqual(form.itemOption('f1').validationRules, newValidationRules, context);
    } else {
      checkOptionsFunc(assert, form);
    }
    var isInputFocused = $('#form').find(("." + TEXTEDITOR_INPUT_CLASS)).is(':focus');
    assert.ok(isKeepFocusSupported ? isInputFocused : !isInputFocused, ("final focus, " + context));
    var validate_result = form.validate();
    assert.strictEqual((validate_result === undefined) || validate_result.isValid, validationResult, ("validate_Result, " + context));
    assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, validationResult ? 0 : 1, ("final [" + INVALID_CLASS + "].length, " + context));
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      logger = $__m.logger;
    }, function($__m) {
      ValidationEngine = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      INVALID_CLASS = 'dx-invalid';
      VALIDATION_SUMMARY_ITEM_CLASS = 'dx-validationsummary-item';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
      VALIDATOR_CLASS = 'dx-validator';
      QUnit.testStart(function() {
        var markup = '<div id="form"></div><div id="form2"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Form validation rules');
      getID = function(form, dataField) {
        return ("dx_" + form.option('formID') + "_" + dataField);
      };
      createForm = function(options) {
        return $('#form').dxForm(options).dxForm('instance');
      };
      QUnit.test('The validation result is invalid when item has validation rules', function(assert) {
        var form = $('#form').dxForm({
          formData: {name: ''},
          items: [{
            dataField: 'name',
            validationRules: [{type: 'required'}]
          }]
        }).dxForm('instance');
        var validationResult = form.validate();
        var invalidSelector = ("." + INVALID_CLASS);
        assert.equal(validationResult.isValid, false, 'isValid of validation result');
        assert.equal(validationResult.brokenRules.length, 1, 'brokenRules count of validation result');
        assert.equal(validationResult.validators.length, 1, 'validators count of validation result');
        assert.equal(form.$element().find(invalidSelector).length, 1, 'invalid editors count');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'name') + ']').length, 1, 'invalid name editor');
      });
      QUnit.test('The validation result is valid when item has validation rules', function(assert) {
        var form = $('#form').dxForm({
          formData: {name: 'Test'},
          items: [{
            dataField: 'name',
            validationRules: [{type: 'required'}]
          }]
        }).dxForm('instance');
        var validationResult = form.validate();
        var invalidSelector = ("." + INVALID_CLASS);
        assert.equal(validationResult.isValid, true, 'isValid of validation result');
        assert.equal(validationResult.brokenRules.length, 0, 'brokenRules count of validation result');
        assert.equal(validationResult.validators.length, 1, 'validators count of validation result');
        assert.equal(form.$element().find(invalidSelector).length, 0, 'invalid editors count');
      });
      QUnit.test('Validate with template wrapper', function(assert) {
        var validationSpy = sinon.spy();
        var form = $('#form').dxForm({
          formData: {name: ''},
          items: [{
            dataField: 'name',
            template: function(data, itemTemplate) {
              var templateWrapper = $('<div>').addClass('dx-template-wrapper');
              $('<div>').dxTextBox({}).appendTo(templateWrapper);
              templateWrapper.appendTo(itemTemplate);
            },
            validationRules: [{
              type: 'custom',
              message: 'Name is required',
              validationCallback: validationSpy
            }]
          }]
        }).dxForm('instance');
        form.validate();
        assert.equal(validationSpy.callCount, 1, 'invalid editors count');
      });
      QUnit.test('CustomRule.validationCallback accepts formItem', function(assert) {
        var validationSpy = sinon.spy();
        var form = $('#form').dxForm({
          formData: {name: ''},
          items: [{
            dataField: 'name',
            itemType: 'simple',
            validationRules: [{
              type: 'custom',
              message: 'Name is required',
              validationCallback: validationSpy
            }]
          }]
        }).dxForm('instance');
        form.validate();
        assert.equal(validationSpy.callCount, 1, 'valdiationCallback should be called once');
        var params = validationSpy.getCall(0).args[0];
        assert.ok(params.formItem, 'formItem should be passed');
        assert.strictEqual(params.formItem.dataField, 'name', 'formItem.dataField === \'name\'');
        assert.strictEqual(params.formItem.itemType, 'simple', 'formItem.itemType === \'simple\'');
        assert.ok(params.formItem.validationRules, 'formItem.validationRule !== null');
      });
      QUnit.test('AsyncRule.validationCallback accepts formItem', function(assert) {
        var validationSpy = sinon.spy(function() {
          return new Deferred().resolve().promise();
        });
        var form = $('#form').dxForm({
          formData: {name: ''},
          items: [{
            dataField: 'name',
            itemType: 'simple',
            validationRules: [{
              type: 'async',
              message: 'Name is required',
              validationCallback: validationSpy
            }]
          }]
        }).dxForm('instance');
        form.validate();
        assert.equal(validationSpy.callCount, 1, 'valdiationCallback should be called once');
        var params = validationSpy.getCall(0).args[0];
        assert.ok(params.formItem, 'formItem should be passed');
        assert.strictEqual(params.formItem.dataField, 'name', 'formItem.dataField === \'name\'');
        assert.strictEqual(params.formItem.itemType, 'simple', 'formItem.itemType === \'simple\'');
        assert.ok(params.formItem.validationRules, 'formItem.validationRule !== null');
      });
      QUnit.test('Validate with a custom validation group', function(assert) {
        var form = $('#form').dxForm({
          validationGroup: 'Custom validation group',
          formData: {
            name: '',
            lastName: 'Kyle',
            firstName: ''
          },
          customizeItem: function(item) {
            if (item.dataField !== 'lastName') {
              item.validationRules = [{type: 'required'}];
            }
          }
        }).dxForm('instance');
        form.validate();
        var invalidSelector = '.' + INVALID_CLASS;
        assert.equal(form.$element().find(invalidSelector).length, 2, 'invalid editors count');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'name') + ']').length, 1, 'invalid name editor');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'firstName') + ']').length, 1, 'invalid firstName editor');
      });
      QUnit.test('Reset validation summary items when using a custom validation group', function(assert) {
        var form = $('#form').dxForm({
          validationGroup: 'Custom validation group',
          showValidationSummary: true,
          formData: {
            name: '',
            lastName: 'John',
            firstName: ''
          },
          customizeItem: function(item) {
            if (item.dataField !== 'lastName') {
              item.validationRules = [{type: 'required'}];
            }
          }
        }).dxForm('instance');
        form.validate();
        form.resetValues();
        var $invalidElements = form.$element().find('.' + INVALID_CLASS);
        var $validationSummaryItems = form.$element().find('.' + VALIDATION_SUMMARY_ITEM_CLASS);
        assert.equal($invalidElements.length, 0, 'There is no invalid elements');
        assert.equal($validationSummaryItems.length, 0, 'There is no validation summary items');
      });
      QUnit.test('Validate form when several forms are rendered', function(assert) {
        var form1 = $('#form').dxForm({
          formData: {
            name: '',
            lastName: 'Kyle',
            firstName: ''
          },
          customizeItem: function(item) {
            if (item.dataField !== 'lastName') {
              item.validationRules = [{type: 'required'}];
            }
          }
        }).dxForm('instance');
        var form2 = $('#form2').dxForm({
          formData: {
            name2: '',
            lastName2: 'Man',
            firstName2: ''
          },
          customizeItem: function(item) {
            if (item.dataField !== 'lastName') {
              item.validationRules = [{type: 'required'}];
            }
          }
        }).dxForm('instance');
        form1.validate();
        var invalidSelector = '.' + INVALID_CLASS;
        assert.equal(form1.$element().find(invalidSelector).length, 2, 'invalid editors count');
        assert.equal(form1.$element().find(invalidSelector + ' [id=' + getID(form1, 'name') + ']').length, 1, 'invalid name editor');
        assert.equal(form1.$element().find(invalidSelector + ' [id=' + getID(form1, 'firstName') + ']').length, 1, 'invalid firstName editor');
        assert.equal(form2.$element().find(invalidSelector).length, 0, 'invalid editors count');
        assert.equal(form2.$element().find(invalidSelector + ' [id=' + getID(form2, 'name2') + ']').length, 0, 'invalid name editor');
        assert.equal(form2.$element().find(invalidSelector + ' [id=' + getID(form2, 'firstName2') + ']').length, 0, 'invalid firstName editor');
      });
      QUnit.test('Validate via \'isRequired\' item option', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: '',
            lastName: 'Kyle',
            firstName: ''
          },
          customizeItem: function(item) {
            if (item.dataField !== 'lastName') {
              item.isRequired = true;
            }
            if (item.dataField === 'name') {
              item.label = {text: 'Middle name'};
            }
          }
        }).dxForm('instance');
        form.validate();
        var invalidSelector = '.' + INVALID_CLASS;
        assert.equal(form.$element().find(invalidSelector).length, 2, 'invalid editors count');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'name') + ']').length, 1, 'invalid name editor');
        assert.equal(form.$element().find(invalidSelector + '-message').first().text(), 'Middle name is required', 'Message contains the custom label name of validated field by default');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'firstName') + ']').length, 1, 'invalid firstName editor');
        assert.equal(form.$element().find(invalidSelector + '-message').last().text(), 'First Name is required', 'Message contains the name of validated field by default if label isn\'t defined');
      });
      QUnit.test('Validate via validationRules when rules and \'isRequired\' item option are both defined', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: '',
            lastName: 'Kyle',
            firstName: ''
          },
          customizeItem: function(item) {
            item.isRequired = true;
            item.validationRules = [{
              type: 'stringLength',
              max: 3
            }];
          }
        }).dxForm('instance');
        form.validate();
        var invalidSelector = '.' + INVALID_CLASS;
        assert.equal(form.$element().find(invalidSelector).length, 1, 'invalid editors count');
        assert.equal(form.$element().find(invalidSelector + ' [id=' + getID(form, 'lastName') + ']').length, 1, 'invalid lastName editor');
      });
      QUnit.test('validate -> resetValues old test', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: '',
            lastName: '',
            firstName: ''
          },
          showValidationSummary: true,
          customizeItem: function(item) {
            item.isRequired = true;
          }
        }).dxForm('instance');
        form.validate();
        form.resetValues();
        assert.equal($('.' + VALIDATION_SUMMARY_ITEM_CLASS).length, 0, 'validation summary items');
      });
      QUnit.test('validate -> the resetValues method is safely called for all item\'s types', function(assert) {
        var form = createForm({
          formData: {name: 'TestName'},
          items: [{
            itemType: 'tabbed',
            tabs: [{items: [{
                itemType: 'group',
                items: [{itemType: 'button'}, {itemType: 'empty'}, {dataField: 'name'}]
              }]}]
          }]
        });
        form.resetValues();
        assert.equal(form.getEditor('name').option('value'), '', 'value of editor');
      });
      QUnit.test('validate -> resetValues when there are invalid validation rules', function(assert) {
        function findInvalidElements$(form) {
          return form.$element().find('.' + INVALID_CLASS);
        }
        function findInvalidSummaryElements$(form) {
          return form.$element().find('.' + VALIDATION_SUMMARY_ITEM_CLASS);
        }
        var formItems = [{
          dataField: 'dxAutocomplete',
          editorType: 'dxAutocomplete'
        }, {
          dataField: 'dxCalendar',
          editorType: 'dxCalendar'
        }, {
          dataField: 'dxCheckBox',
          editorType: 'dxCheckBox'
        }, {
          dataField: 'dxDateBox',
          editorType: 'dxDateBox'
        }, {
          dataField: 'dxDropDownBox',
          editorType: 'dxDropDownBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxHtmlEditor',
          editorType: 'dxHtmlEditor'
        }, {
          dataField: 'dxLookup',
          editorType: 'dxLookup',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxNumberBox',
          editorType: 'dxNumberBox'
        }, {
          dataField: 'dxRadioGroup',
          editorType: 'dxRadioGroup',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxSelectBox',
          editorType: 'dxSelectBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxTagBox',
          editorType: 'dxTagBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxTextArea',
          editorType: 'dxTextArea'
        }, {
          dataField: 'dxTextBox',
          editorType: 'dxTextBox'
        }];
        var validationCallbackLog = [];
        var form = $('#form').dxForm({
          showValidationSummary: true,
          items: formItems,
          customizeItem: function(item) {
            item.validationRules = [{
              type: 'custom',
              message: item.dataField,
              validationCallback: function(e) {
                validationCallbackLog.push(e.rule.message);
                return false;
              }
            }];
          }
        }).dxForm('instance');
        form.validate();
        formItems.forEach(function(item) {
          return assert.strictEqual(form.getEditor(item.dataField).option('isValid'), false, 'form.getEditor.' + item.dataField);
        });
        assert.equal(findInvalidElements$(form).length, formItems.length, 'There are all the invalid elements');
        assert.equal(findInvalidSummaryElements$(form).length, formItems.length, 'There are all the validation summary items');
        assert.equal(validationCallbackLog.length, formItems.length, 'validationCallbackLog on validate');
        validationCallbackLog = [];
        form.resetValues();
        formItems.forEach(function(item) {
          return assert.strictEqual(form.getEditor(item.dataField).option('isValid'), true, 'form.getEditor.' + item.dataField);
        });
        assert.equal(findInvalidElements$(form).length, 0, 'There are no invalid elements');
        assert.equal(findInvalidSummaryElements$(form).length, 0, 'There are no validation summary items');
        assert.equal(validationCallbackLog.length, 1, 'validationCallbackLog on resetValues: ' + JSON.stringify(validationCallbackLog));
        form.dispose();
      });
      QUnit.test('Changing an validationRules options of an any item does not invalidate whole form (T673188)', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            lastName: 'Kyle',
            count: 1
          },
          items: [{
            dataField: 'firstName',
            editorType: 'dxTextBox'
          }, {
            dataField: 'count',
            editorType: 'dxTextBox',
            validationRules: [{
              type: 'range',
              max: 10
            }]
          }]
        }).dxForm('instance');
        var formInvalidateSpy = sinon.spy(form, '_invalidate');
        var renderComponentSpy = sinon.spy(form, '_renderComponent');
        form.option('items[1].validationRules[0].max', 11);
        assert.strictEqual(form.option('items[1].validationRules[0].max'), 11, 'correct validationRule option');
        assert.strictEqual(formInvalidateSpy.callCount, 0, 'Invalidate does not called');
        assert.strictEqual(renderComponentSpy.callCount, 0, 'renderComponentSpy.callCount');
      });
      QUnit.test('Validate the form without validation rules for an any simple items', function(assert) {
        var errorStub = sinon.stub();
        logger.error = errorStub;
        var form = $('#form').dxForm({items: ['name']}).dxForm('instance');
        assert.propEqual(form.validate(), {
          brokenRules: [],
          complete: null,
          isValid: true,
          status: 'valid',
          validators: []
        }, 'validation result');
        assert.equal(errorStub.getCalls().length, 0, 'errors are not written to the console');
      });
      QUnit.test('Change validation rules when simple item is hidden via api', function(assert) {
        var form = $('#form').dxForm({items: [{
            itemType: 'simple',
            editorType: 'dxTextBox',
            name: 'item1'
          }]}).dxForm('instance');
        form.itemOption('item1', 'visible', false);
        form.itemOption('item1', 'validationRules', [{type: 'required'}]);
        assert.deepEqual(form.itemOption('item1').validationRules, [{type: 'required'}], 'validation rules');
      });
      QUnit.testInActiveWindow('Change RangeRule.max', function(assert) {
        var runChangeRuleRageMaxTest = function(options) {
          [true, false].forEach(function(useItemOption) {
            runChangeValidationRuleTest({
              assert: assert,
              fieldValue: options.fieldValue,
              validationRules: [{
                type: 'range',
                max: options.initialMax
              }],
              changeRulesFunc: function(form) {
                if (useItemOption) {
                  form.itemOption('f1').validationRules[0].max = options.targetMax;
                } else {
                  form.option('items[0].validationRules[0].max', options.targetMax);
                }
              },
              checkOptionsFunc: function(assert, form) {
                assert.strictEqual(form.itemOption('f1').validationRules[0].max, options.targetMax);
                assert.strictEqual(form.option('items[0].validationRules[0].max'), options.targetMax);
              },
              validationResult: options.validationResult
            });
          });
        };
        runChangeRuleRageMaxTest({
          fieldValue: 10,
          initialMax: 11,
          targetMax: 1,
          validationResult: false
        });
        runChangeRuleRageMaxTest({
          fieldValue: 10,
          initialMax: 1,
          targetMax: 11,
          validationResult: true
        });
      });
      QUnit.testInActiveWindow('Add RangeRule to item.validationRules', function(assert) {
        var runSetRangeRuleTest = function(options) {
          runChangeValidationRuleTest(extend({
            assert: assert,
            fieldValue: 10,
            newValidationRules: [{
              type: 'range',
              max: 1
            }],
            validationResult: false
          }, options));
        };
        [undefined, null, []].forEach(function(validationRules) {
          [true, false].forEach(function(useItemOption) {
            runSetRangeRuleTest({
              validationRules: validationRules,
              useItemOption: useItemOption,
              isKeepFocusSupported: false
            });
          });
        });
      });
      QUnit.testInActiveWindow('Remove RangeRule from item.validationRules', function(assert) {
        var runRemoveRangedRuleTest = function(options) {
          runChangeValidationRuleTest(extend({
            assert: assert,
            fieldValue: 10,
            validationRules: [{
              type: 'range',
              max: 1
            }],
            validationResult: true
          }, options));
        };
        [undefined, null, []].forEach(function(newValidationRules) {
          runRemoveRangedRuleTest({
            newValidationRules: newValidationRules,
            useItemOption: false,
            isKeepFocusSupported: true
          });
        });
        [undefined, null, []].forEach(function(newValidationRules) {
          runRemoveRangedRuleTest({
            newValidationRules: newValidationRules,
            useItemOption: true,
            isKeepFocusSupported: true
          });
        });
      });
      QUnit.testInActiveWindow('Add RequiredRule to item.validationRules', function(assert) {
        [undefined, null, []].forEach(function(validationRules) {
          [true, false].forEach(function(useItemOption) {
            runChangeValidationRuleTest({
              assert: assert,
              fieldValue: null,
              validationRules: validationRules,
              newValidationRules: [{type: 'required'}],
              validationResult: false,
              isKeepFocusSupported: false,
              useItemOption: useItemOption
            });
          });
        });
      });
      QUnit.testInActiveWindow('Remove RequiredRule from item.validationRules', function(assert) {
        [undefined, null, []].forEach(function(newValidationRules) {
          [true, false].forEach(function(useItemOption) {
            runChangeValidationRuleTest({
              assert: assert,
              fieldValue: null,
              validationRules: [{type: 'required'}],
              newValidationRules: newValidationRules,
              validationResult: true,
              isKeepFocusSupported: false,
              useItemOption: useItemOption
            });
          });
        });
      });
      QUnit.testInActiveWindow('Change item.isRequired', function(assert) {
        [true, false].forEach(function(isRequired) {
          [true, false].forEach(function(useItemOption) {
            runChangeValidationRuleTest({
              assert: assert,
              fieldValue: null,
              changeRulesFunc: function(form) {
                if (useItemOption) {
                  form.itemOption('f1', 'isRequired', isRequired);
                } else {
                  form.option('items[0].isRequired', isRequired);
                }
              },
              checkOptionsFunc: function(assert, form) {
                assert.strictEqual(form.itemOption('f1').isRequired, isRequired);
                assert.strictEqual(form.option('items[0].isRequired'), isRequired);
              },
              validationResult: !isRequired,
              isKeepFocusSupported: false
            });
          });
        });
      });
      QUnit.module('validation group', function() {
        QUnit.test('Set { items: [name] }, call option(validationGroup, Test)', function(assert) {
          var form = $('#form').dxForm({items: ['name']}).dxForm('instance');
          form.option('validationGroup', 'Test');
          assert.notOk(ValidationEngine.getGroupConfig(form), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig('Test'), 'the new validation group of the Form is contained in the validation engine');
        });
        QUnit.test('Set { items: [name], showValidationSummary: true }, call option(validationGroup, Test)', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            items: ['name']
          });
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test', 'validation group of the validation summary');
        });
        QUnit.test('Set { items: [name], validationGroup: Test1 }, call option(validationGroup, Test2)', function(assert) {
          var form = $('#form').dxForm({
            items: ['name'],
            validationGroup: 'Test1'
          }).dxForm('instance');
          form.option('validationGroup', 'Test2');
          assert.notOk(ValidationEngine.getGroupConfig('Test1'), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig('Test2'), 'the new validation group of the Form is contained in the validation engine');
        });
        QUnit.test('Set { items: [name], validationGroup: Test1, showValidationSummary: true }, call option(validationGroup, Test2)', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            validationGroup: 'Test1',
            items: ['name']
          });
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test2');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test2', 'validation group of the validation summary');
        });
        QUnit.test('Set { items: [{dataField: name, isRequired: true}] }, call option(validationGroup, Test)', function(assert) {
          var $formContainer = $('#form').dxForm({items: [{
              dataField: 'name',
              isRequired: true
            }]});
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test');
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          var validator = $validator.dxValidator('instance');
          assert.equal($validator.length, 1, 'validators count');
          assert.equal(validator.option('validationGroup'), 'Test', 'validation group of the validator');
          assert.notOk(ValidationEngine.getGroupConfig(form), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig('Test'), 'the new validation group of the Form is contained in the validation engine');
        });
        QUnit.test('Set { items: [{dataField: name, isRequired: true}], showValidationSummary: true }, call option(validationGroup, Test)', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            items: [{
              dataField: 'name',
              isRequired: true
            }]
          });
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test', 'validation group of the validation summary');
        });
        QUnit.test('Set { items: [{dataField: name, isRequired: true}], validationGroup: Test1 }, call option(validationGroup, Test2)', function(assert) {
          var $formContainer = $('#form').dxForm({
            items: [{
              dataField: 'name',
              isRequired: true
            }],
            validationGroup: 'Test1'
          });
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test2');
          var $validator = $formContainer.find(("." + VALIDATOR_CLASS));
          var validator = $validator.dxValidator('instance');
          assert.equal($validator.length, 1, 'validators count');
          assert.equal(validator.option('validationGroup'), 'Test2', 'validation group of the validator');
          assert.notOk(ValidationEngine.getGroupConfig('Test1'), 'the old validation group of the Form is not contained in the validation engine');
          assert.ok(ValidationEngine.getGroupConfig('Test2'), 'the new validation group of the Form is contained in the validation engine');
        });
        QUnit.test('Set { items: [{dataField: name, isRequired: true}], validationGroup: Test1, showValidationSummary: true }, call option(validationGroup, Test2)', function(assert) {
          var $formContainer = $('#form').dxForm({
            showValidationSummary: true,
            validationGroup: 'Test1',
            items: [{
              dataField: 'name',
              isRequired: true
            }]
          });
          var form = $formContainer.dxForm('instance');
          form.option('validationGroup', 'Test2');
          var $validationSummary = $formContainer.find(("." + VALIDATION_SUMMARY_CLASS));
          var validationSummary = $validationSummary.dxValidationSummary('instance');
          assert.equal($validationSummary.length, 1);
          assert.equal(validationSummary.option('validationGroup'), 'Test2', 'validation group of the validation summary');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/extend","core/utils/console","ui/validation_engine","core/utils/deferred","ui/form/ui.form","ui/text_area","ui/autocomplete","ui/calendar","ui/date_box","ui/drop_down_box","ui/html_editor","../../helpers/ignoreQuillTimers.js","ui/lookup","ui/radio_group","ui/tag_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/extend"), require("core/utils/console"), require("ui/validation_engine"), require("core/utils/deferred"), require("ui/form/ui.form"), require("ui/text_area"), require("ui/autocomplete"), require("ui/calendar"), require("ui/date_box"), require("ui/drop_down_box"), require("ui/html_editor"), require("../../helpers/ignoreQuillTimers.js"), require("ui/lookup"), require("ui/radio_group"), require("ui/tag_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.validationRules.tests.js.map