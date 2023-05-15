!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.API.option_formData.tests.js"], ["jquery","ui/form/ui.form","ui/text_area","ui/tag_box","ui/slider","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.API.option_formData.tests.js", ["jquery", "ui/form/ui.form", "ui/text_area", "ui/tag_box", "ui/slider", "generic_light.css!"], function($__export) {
  "use strict";
  var $;
  function checkEditor(form, dataField, expectedValue) {
    var editor = form.getEditor(dataField);
    var $editor = editor.$element();
    var $input = $editor.find('.dx-texteditor-input');
    QUnit.assert.equal(editor.option('value'), expectedValue, ("value option of editor for the " + dataField));
    QUnit.assert.strictEqual($input.val(), expectedValue === null ? '' : expectedValue, ("input value of editor for the " + dataField));
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="form"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Public API: option(formData, new value)');
      QUnit.test('Set { formData: null }, call option(formData, null)', function(assert) {
        var form = $('#form').dxForm({formData: null}).dxForm('instance');
        form.option('formData', null);
        assert.propEqual(form.option('formData'), {});
      });
      QUnit.test('Set { formData: null }, call option(formData, {})', function(assert) {
        var form = $('#form').dxForm({formData: null}).dxForm('instance');
        var formData = {};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
      });
      QUnit.test('Set { formData: null, items: [dataField1] }, call option(formData, {})', function(assert) {
        var form = $('#form').dxForm({
          formData: null,
          items: ['dataField1']
        }).dxForm('instance');
        var formData = {};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: null, items: [dataField1] }, call option(formData, null)', function(assert) {
        var form = $('#form').dxForm({
          formData: null,
          items: ['dataField1']
        }).dxForm('instance');
        form.option('formData', null);
        assert.propEqual(form.option('formData'), {});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {}, items: [dataField1] }, call option(formData, null)', function(assert) {
        var form = $('#form').dxForm({
          formData: {},
          items: ['dataField1']
        }).dxForm('instance');
        form.option('formData', null);
        assert.propEqual(form.option('formData'), {});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {}, items: [dataField1] }, call option(formData, {})', function(assert) {
        var form = $('#form').dxForm({
          formData: {},
          items: ['dataField1']
        }).dxForm('instance');
        form.option('formData', {});
        assert.propEqual(form.option('formData'), {});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, call option(formData, null)', function(assert) {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.option('formData', null);
        assert.propEqual(form.option('formData'), {dataField1: ''});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, call option(formData, {})', function(assert) {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        var formData = {};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, call option(formData, {dataField1: undefined})', function(assert) {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        var formData = {dataField1: undefined};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, call option(formData, {dataField1: null})', function(assert) {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        var formData = {dataField1: null};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
        checkEditor(form, 'dataField1', null);
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, call option(formData, {dataField1: b})', function(assert) {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        var formData = {dataField1: 'b'};
        form.option('formData', formData);
        assert.equal(form.option('formData'), formData);
        checkEditor(form, 'dataField1', 'b');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, null)', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', null);
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, {})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', {});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, {dataField1:undefined})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', {dataField1: undefined});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, {dataField1:null})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', {dataField1: null});
        checkEditor(form, 'dataField1', null);
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, {dataField1: b})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', {dataField1: 'b'});
        checkEditor(form, 'dataField1', 'b');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dataField1] }, change editor value, call option(formData, {dataField2:a})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: ['dataField1']
        }).dxForm('instance');
        form.getEditor('dataField1').option('value', 'val1');
        form.option('formData', {dataField2: 'a'});
        checkEditor(form, 'dataField1', '');
      });
      QUnit.test('Set { formData: {dataField1: a}, items: [dxTextArea] }, change editor value, call option(formData, {dataField1: b})', function() {
        var form = $('#form').dxForm({
          formData: {dataField1: 'a'},
          items: [{
            name: 'custom1',
            editorType: 'dxTextArea'
          }]
        }).dxForm('instance');
        form.getEditor('custom1').option('value', 'val1');
        form.option('formData', {dataField1: 'b'});
        checkEditor(form, 'custom1', 'val1');
      });
      QUnit.test('Set { formData: {dataField1: a, dataField2: b}, items: [dataField1, dataField2], call option(formData, {dataField3: c}', function(assert) {
        var onFieldDataChangedStub = sinon.stub();
        var form = $('#form').dxForm({
          formData: {
            dataField1: 'a',
            dataField2: 'b'
          },
          items: ['dataField1', 'dataField2'],
          onFieldDataChanged: onFieldDataChangedStub
        }).dxForm('instance');
        form.option('formData', {dataField3: 'c'});
        checkEditor(form, 'dataField1', '');
        checkEditor(form, 'dataField2', '');
        assert.propEqual(form.option('formData'), {dataField3: 'c'}, 'formData');
        var calls = onFieldDataChangedStub.getCalls();
        assert.equal(onFieldDataChangedStub.callCount, 1, 'onFieldDataChanged event\'s calls count');
        assert.equal(calls[0].args[0].dataField, 'dataField3', 'dataField argument of the onFieldDataChanged event');
        assert.equal(calls[0].args[0].value, 'c', 'value argument of the onFieldDataChanged event');
      });
      QUnit.test('Set { formData: {dataField1: a, dataField2: b}, items: [dataField1, dataField2], call option(formData, {dataField2: c}', function(assert) {
        var onFieldDataChangedStub = sinon.stub();
        var form = $('#form').dxForm({
          formData: {
            dataField1: 'a',
            dataField2: 'b'
          },
          items: ['dataField1', 'dataField2'],
          onFieldDataChanged: onFieldDataChangedStub
        }).dxForm('instance');
        form.option('formData', {dataField2: 'c'});
        checkEditor(form, 'dataField1', '');
        checkEditor(form, 'dataField2', 'c');
        assert.propEqual(form.option('formData'), {dataField2: 'c'}, 'formData');
        var calls = onFieldDataChangedStub.getCalls();
        assert.equal(onFieldDataChangedStub.callCount, 1, 'onFieldDataChanged event\'s calls count');
        assert.equal(calls[0].args[0].dataField, 'dataField2', 'dataField argument of the onFieldDataChanged event');
        assert.equal(calls[0].args[0].value, 'c', 'value argument of the onFieldDataChanged event');
      });
      QUnit.test('Set { formData: {dataField1: a, dataField2: b}, items: [dataField1, dataField2], call option(formData, {dataField3: c}, change editor value', function(assert) {
        var onFieldDataChangedStub = sinon.stub();
        var form = $('#form').dxForm({
          formData: {
            dataField1: 'a',
            dataField2: 'b'
          },
          items: ['dataField1', 'dataField2'],
          onFieldDataChanged: onFieldDataChangedStub
        }).dxForm('instance');
        form.option('formData', {dataField3: 'c'});
        form.getEditor('dataField2').option('value', 'd');
        checkEditor(form, 'dataField1', '');
        checkEditor(form, 'dataField2', 'd');
        assert.propEqual(form.option('formData'), {
          dataField2: 'd',
          dataField3: 'c'
        }, 'formData');
        var calls = onFieldDataChangedStub.getCalls();
        assert.equal(onFieldDataChangedStub.callCount, 2, 'onFieldDataChanged event\'s calls count');
        assert.equal(calls[0].args[0].dataField, 'dataField3', 'first call - dataField argument of the onFieldDataChanged event');
        assert.equal(calls[0].args[0].value, 'c', 'first call - value argument of the onFieldDataChanged event');
        assert.equal(calls[1].args[0].dataField, 'dataField2', 'second call - dataField argument of the onFieldDataChanged event');
        assert.equal(calls[1].args[0].value, 'd', 'second call - value argument of the onFieldDataChanged event');
      });
      QUnit.test('Set { formData: {dataField3: c}, items: [dataField1, dataField2], call option(formData, {dataField1: a, dataField2: b})', function(assert) {
        var onFieldDataChangedStub = sinon.stub();
        var form = $('#form').dxForm({
          formData: {dataField3: 'c'},
          items: ['dataField1', 'dataField2'],
          onFieldDataChanged: onFieldDataChangedStub
        }).dxForm('instance');
        assert.propEqual(form.option('formData'), {dataField3: 'c'}, 'formData before changing via API');
        form.option('formData', {
          dataField1: 'a',
          dataField2: 'b'
        });
        checkEditor(form, 'dataField1', 'a');
        checkEditor(form, 'dataField2', 'b');
        assert.propEqual(form.option('formData'), {
          dataField1: 'a',
          dataField2: 'b'
        }, 'formData after changing via API');
        var calls = onFieldDataChangedStub.getCalls();
        assert.equal(onFieldDataChangedStub.callCount, 2, 'onFieldDataChanged event\'s calls count');
        assert.equal(calls[0].args[0].dataField, 'dataField1', 'first call - dataField argument of the onFieldDataChanged event');
        assert.equal(calls[0].args[0].value, 'a', 'first call - value argument of the onFieldDataChanged event');
        assert.equal(calls[1].args[0].dataField, 'dataField2', 'second call - dataField argument of the onFieldDataChanged event');
        assert.equal(calls[1].args[0].value, 'b', 'second call - value argument of the onFieldDataChanged event');
      });
      QUnit.test('Reset editor\'s value when set formData: {dataField1: a}', function(assert) {
        var formData = {
          dxTextBox: 'a',
          dxDateBox: new Date(),
          dxSelectBox: 'item2',
          dxTagBox: ['item2'],
          dxSlider: 35
        };
        var dataSource = ['item1', 'item2', 'item3'];
        var form = $('#form').dxForm({
          formData: formData,
          items: ['dxTextBox', 'dxDateBox', {
            dataField: 'dxSelectBox',
            editorType: 'dxSelectBox',
            editorOptions: {dataSource: dataSource}
          }, {
            dataField: 'dxTagBox',
            editorType: 'dxTagBox',
            editorOptions: {dataSource: dataSource}
          }, {
            dataField: 'dxSlider',
            editorType: 'dxSlider'
          }]
        }).dxForm('instance');
        form.option('formData', {dataField1: 'a'});
        Object.keys(formData).forEach(function(dataField) {
          var editor = form.getEditor(dataField);
          assert.deepEqual(editor.option('value'), editor._getDefaultOptions().value, ("a default value of the " + dataField + " editor"));
        });
      });
      QUnit.module('Checkbox editor field', function() {
        function checkCheckboxAndFormValue(form, dateField, editorValue, formValue) {
          var editor = form.getEditor(dateField);
          QUnit.assert.strictEqual(editor.option('value'), editorValue, ("editor has " + editorValue + " value"));
          var expectedFormValue = formValue === 'no member' ? undefined : formValue;
          QUnit.assert.strictEqual(form.option(("formData." + dateField)), expectedFormValue, ("formData has " + expectedFormValue + " value"));
        }
        function createTestData(boolValue) {
          return boolValue !== 'no member' ? {b: boolValue} : {};
        }
        [true, false, undefined].forEach(function(allowIndeterminateState) {
          [true, false, undefined, null, 'no member'].forEach(function(oldBoolValue) {
            [true, false, undefined, null, 'no member'].forEach(function(newBoolValue) {
              QUnit.test(("allowIndeterminateState = " + allowIndeterminateState + ", FormData = { b:  " + oldBoolValue + "} -> updateFormData({ b: " + newBoolValue + " })"), function(assert) {
                var form = $('#form').dxForm({
                  formData: createTestData(oldBoolValue),
                  items: [{
                    dataField: 'b',
                    editorType: 'dxCheckBox',
                    allowIndeterminateState: allowIndeterminateState
                  }]
                }).dxForm('instance');
                var editorOldValue = (oldBoolValue === 'no member' || (allowIndeterminateState === false && oldBoolValue === undefined)) ? false : oldBoolValue;
                checkCheckboxAndFormValue(form, 'b', editorOldValue, oldBoolValue);
                var newFormData = {};
                if (newBoolValue !== 'no member') {
                  newFormData['b'] = newBoolValue;
                }
                form.updateData(newFormData);
                var editorNewValue = newBoolValue === 'no member' ? editorOldValue : newBoolValue;
                var formNewValue = newBoolValue === 'no member' ? oldBoolValue : newBoolValue;
                checkCheckboxAndFormValue(form, 'b', editorNewValue, formNewValue);
              });
              QUnit.test(("allowIndeterminateState = " + allowIndeterminateState + ", FormData = { innerObject: { b:  " + oldBoolValue + " }} -> updateFormData({ innerObject.b = " + newBoolValue + ")"), function(assert) {
                var form = $('#form').dxForm({
                  formData: {innerObject: createTestData(oldBoolValue)},
                  items: [{
                    dataField: 'innerObject.b',
                    editorType: 'dxCheckBox',
                    allowIndeterminateState: allowIndeterminateState
                  }]
                }).dxForm('instance');
                var editorOldValue = (oldBoolValue === 'no member' || (allowIndeterminateState === false && oldBoolValue === undefined)) ? false : oldBoolValue;
                checkCheckboxAndFormValue(form, 'innerObject.b', editorOldValue, oldBoolValue);
                var newFormData = {innerObject: {}};
                if (newBoolValue !== 'no member') {
                  newFormData.innerObject['b'] = newBoolValue;
                }
                form.updateData(newFormData);
                var editorNewValue = newBoolValue === 'no member' ? editorOldValue : newBoolValue;
                var formNewValue = newBoolValue === 'no member' ? oldBoolValue : newBoolValue;
                checkCheckboxAndFormValue(form, 'innerObject.b', editorNewValue, formNewValue);
              });
              QUnit.test(("allowIndeterminateState = " + allowIndeterminateState + ", FormData = { b:  " + oldBoolValue + "} -> option('formData', { b: " + newBoolValue + " })"), function() {
                var form = $('#form').dxForm({
                  formData: createTestData(oldBoolValue),
                  items: [{
                    dataField: 'b',
                    editorType: 'dxCheckBox',
                    allowIndeterminateState: allowIndeterminateState
                  }]
                }).dxForm('instance');
                form.option('formData', createTestData(newBoolValue));
                var editorValue = (newBoolValue === 'no member' || (allowIndeterminateState === false && newBoolValue === undefined)) ? false : newBoolValue;
                var expectedFormValue = newBoolValue;
                if (newBoolValue === 'no member') {
                  expectedFormValue = oldBoolValue === false || oldBoolValue === 'no member' || (oldBoolValue === undefined && allowIndeterminateState === false) ? undefined : false;
                }
                checkCheckboxAndFormValue(form, 'b', editorValue, expectedFormValue);
              });
              QUnit.test(("allowIndeterminateState = " + allowIndeterminateState + ", FormData = { innerObject: { b:  " + oldBoolValue + " }} -> option('formData', { innerObject.b = " + newBoolValue + ")"), function() {
                var form = $('#form').dxForm({
                  formData: {innerObject: createTestData(oldBoolValue)},
                  items: [{
                    dataField: 'innerObject.b',
                    editorType: 'dxCheckBox',
                    allowIndeterminateState: allowIndeterminateState
                  }]
                }).dxForm('instance');
                form.option('formData', {innerObject: createTestData(newBoolValue)});
                var editorValue = (newBoolValue === 'no member' || (allowIndeterminateState === false && newBoolValue === undefined)) ? false : newBoolValue;
                var expectedFormValue = newBoolValue === 'no member' ? undefined : newBoolValue;
                checkCheckboxAndFormValue(form, 'innerObject.b', editorValue, expectedFormValue);
              });
            });
          });
          ['checkbox', 'object.checkbox', 'object.innerObject.checkbox'].forEach(function(dataField) {
            QUnit.test(("form.formData = empty, checkbox.dataField=" + dataField + ", allowIndeterminateState = " + allowIndeterminateState + ")"), function(assert) {
              var form = $('#form').dxForm({
                formData: {},
                items: [{
                  dataField: dataField,
                  editorType: 'dxCheckBox',
                  allowIndeterminateState: allowIndeterminateState
                }]
              }).dxForm('instance');
              assert.equal(form.getEditor(dataField).option('value'), false);
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/form/ui.form","ui/text_area","ui/tag_box","ui/slider","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/form/ui.form"), require("ui/text_area"), require("ui/tag_box"), require("ui/slider"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.API.option_formData.tests.js.map