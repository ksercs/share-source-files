!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/form.tests.js"], ["jquery","knockout","ui/form/constants","ui/form/components/field_item","ui/form/components/label","animation/fx","ui/form","ui/text_area","ui/select_box","ui/tag_box","integration/knockout"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.knockout/form.tests.js", ["jquery", "knockout", "ui/form/constants", "ui/form/components/field_item", "ui/form/components/label", "animation/fx", "ui/form", "ui/text_area", "ui/select_box", "ui/tag_box", "integration/knockout"], function($__export) {
  "use strict";
  var $,
      ko,
      FIELD_ITEM_CONTENT_CLASS,
      FIELD_ITEM_CONTENT_LOCATION_CLASS,
      FIELD_ITEM_LABEL_LOCATION_CLASS,
      fx,
      moduleWithoutCsp,
      moduleSetup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ko = $__m.default;
    }, function($__m) {
      FIELD_ITEM_CONTENT_CLASS = $__m.FIELD_ITEM_CONTENT_CLASS;
    }, function($__m) {
      FIELD_ITEM_CONTENT_LOCATION_CLASS = $__m.FIELD_ITEM_CONTENT_LOCATION_CLASS;
    }, function($__m) {
      FIELD_ITEM_LABEL_LOCATION_CLASS = $__m.FIELD_ITEM_LABEL_LOCATION_CLASS;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;
      QUnit.testStart(function() {
        var markup = "<div id=\"simpleDataForm\" data-bind=\"dxForm: { formData: formData }\"></div>\n        <div id=\"simpleTemplateForm\" data-bind=\"dxForm: { formData: formData, items: items }\">\n            <div data-options=\"dxTemplate:{ name:'simpleTemplate' }\">\n                <span>KO template</span>\n                <div data-bind=\"dxTextArea: {\n                    value: editorOptions.value,\n                    onValueChanged: function(args) {\n                        $data.component.updateData($data.dataField, args.value)\n                    }\n                }\"></div>\n            </div>\n            <div data-options=\"dxTemplate:{ name:'tabTemplate' }\">\n                <div id=\"tabTemplate\">Test tab template</div>\n            </div>\n        </div>\n        <div id=\"simpleTemplateForm2\" data-bind=\"dxForm: { items: items }\">\n            <div data-options=\"dxTemplate:{ name:'simpleTemplate2' }\">\n               <span id=\"name\" data-bind=\"text: $data.name\"></span>\n            </div>\n        </div>\n        <div id=\"formWithItems\" data-bind=\"dxForm: { formData: formData, items: items }\"></div>\n        <div id=\"formWithCustomOptions\" data-bind=\"dxForm: formOptions\"></div>";
        $('#qunit-fixture').html(markup);
      });
      moduleSetup = {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      moduleWithoutCsp('Knockout integration', moduleSetup);
      QUnit.test('Generate items from layoutData with unacceptable data', function(assert) {
        var viewModel = {formData: ko.observable({
            firstName: 'John',
            mark: ko.observable(13),
            lastName: function() {}
          })};
        ko.applyBindings(viewModel, $('#simpleDataForm').get(0));
        var layoutManager = $('#simpleDataForm').find('.dx-layout-manager').dxLayoutManager('instance');
        assert.deepEqual(layoutManager._items, [{
          dataField: 'firstName',
          editorType: 'dxTextBox',
          itemType: 'simple',
          visibleIndex: 0,
          col: 0
        }, {
          col: 0,
          dataField: 'mark',
          editorType: 'dxNumberBox',
          itemType: 'simple',
          visibleIndex: 1
        }]);
      });
      QUnit.test('Change formData -> observable value changed', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
        assert.equal(viewModel.formData.famousPirate(), 'Cpt. Jack Sparrow', 'Values is synchronized');
      });
      QUnit.test('Change formData -> observable array changed', function(assert) {
        var itemsData = ko.observableArray([]);
        var viewModel = {
          formData: {items: itemsData},
          items: [{
            dataField: 'items',
            editorType: 'dxTagBox',
            editorOptions: {dataSource: ['item1', 'items2']}
          }]
        };
        var $form = $('#formWithItems');
        ko.applyBindings(viewModel, $form.get(0));
        var form = $form.dxForm('instance');
        var tagBox = form.getEditor('items');
        tagBox.option('value', ['item2']);
        assert.deepEqual(itemsData(), ['item2'], 'value of the observable array');
      });
      QUnit.test('Change observable -> formData changed', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        var textBox = $form.find('.dx-textbox').dxTextBox('instance');
        var form = $form.dxForm('instance');
        var layoutManager = $form.find('.dx-layout-manager').dxLayoutManager('instance');
        assert.equal(textBox.option('value'), 'John Morgan');
        viewModel.formData.famousPirate('Cpt. Jack Sparrow');
        assert.strictEqual(form.option('formData'), viewModel.formData);
        assert.strictEqual(layoutManager.option('layoutData'), viewModel.formData);
        assert.equal(textBox.option('value'), 'Cpt. Jack Sparrow', 'Values is synchronized');
        assert.equal(viewModel.formData.famousPirate(), 'Cpt. Jack Sparrow', 'famousPirate is changed');
      });
      QUnit.test('Change observable array -> formData changed', function(assert) {
        var itemsData = ko.observableArray([]);
        var viewModel = {
          formData: {items: itemsData},
          items: [{
            dataField: 'items',
            editorType: 'dxTagBox',
            editorOptions: {dataSource: ['item1', 'items2']}
          }]
        };
        var $form = $('#formWithItems');
        ko.applyBindings(viewModel, $form.get(0));
        itemsData(['item2']);
        var form = $form.dxForm('instance');
        var tagBox = form.getEditor('items');
        assert.deepEqual(tagBox.option('value'), ['item2'], 'value of the TagBox');
      });
      QUnit.test('Must unwrap visible option when render', function(assert) {
        var viewModel = {formOptions: {
            formData: {
              famousPirate: 'John Morgan',
              famousAdmiral: 'Horacio Nelson'
            },
            items: ['famousAdmiral', {
              dataField: 'famousPirate',
              visible: ko.observable(false)
            }]
          }};
        var visibleEditorSelector = '.dx-box-item';
        var $form = $('#formWithCustomOptions');
        ko.applyBindings(viewModel, $form.get(0));
        var $editor = $form.find(visibleEditorSelector);
        assert.equal($editor.length, 1, 'only one visible editor was render');
        assert.equal($editor.find('input').val(), 'Horacio Nelson', 'It\'s a visible item');
        viewModel.formOptions.items[1].visible(true);
        assert.equal($form.find(visibleEditorSelector).length, 2, 'Both editors are visible');
      });
      QUnit.test('Change formData field and other observable', function(assert) {
        var viewModel = {formData: {
            famousPirate: ko.observable(''),
            age: ko.observable(0)
          }};
        viewModel.formData.famousPirate.subscribe(function(newValue) {
          viewModel.formData.age(40);
        });
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        var pirateEditor = $form.find('.dx-textbox').dxTextBox('instance');
        var ageEditor = $form.find('.dx-numberbox').dxNumberBox('instance');
        pirateEditor.option('value', 'John Morgan');
        assert.equal(ageEditor.option('value'), 40, 'Age successfully updated');
      });
      QUnit.test('Form item should be removed from DOM if it\'s visibility was changed via binding', function(assert) {
        function viewModel() {
          var self = this;
          self.itemVisibility = ko.observable(true);
          self.formData = {number: ko.observable(0)};
          self.items = ko.computed(function() {
            return [{
              dataField: 'number',
              editorType: 'dxNumberBox',
              visible: self.itemVisibility()
            }];
          });
        }
        var $form = $('#formWithItems');
        var vm = new viewModel();
        ko.applyBindings(vm, $form.get(0));
        var $formItems = $form.find('.dx-box-item');
        assert.equal($formItems.length, 1, 'there is one visible item in DOM');
        vm.itemVisibility(false);
        $formItems = $form.find('.dx-box-item');
        assert.equal($formItems.length, 0, 'no visible item in DOM');
      });
      QUnit.test('Check that form doesn\'t rerender when change field widget', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var renderCalled = 0;
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.dxForm('instance')._render = function() {
          renderCalled++;
        };
        $form.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
        assert.equal(renderCalled, 0);
      });
      QUnit.test('Check that layoutManager doesn\'t rerender when change field widget', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var renderCalled = 0;
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-layout-manager').dxLayoutManager('instance')._render = function() {
          renderCalled++;
        };
        $form.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
        assert.equal(renderCalled, 0);
      });
      QUnit.test('Check that form doesn\'t rerender when change observable', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var renderCalled = 0;
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.dxForm('instance')._render = function() {
          renderCalled++;
        };
        viewModel.formData.famousPirate('Cpt. Jack Sparrow');
        assert.equal(renderCalled, 0);
      });
      QUnit.test('Check that layoutManager doesn\'t rerender when change observable', function(assert) {
        var viewModel = {formData: {famousPirate: ko.observable('John Morgan')}};
        var renderCalled = 0;
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-layout-manager').dxLayoutManager('instance')._render = function() {
          renderCalled++;
        };
        viewModel.formData.famousPirate('Cpt. Jack Sparrow');
        assert.equal(renderCalled, 0);
      });
      QUnit.test('Change observable for formData field', function(assert) {
        var viewModel = {
          famousSailor: ko.observable('Edward Teach'),
          famousPirate: ko.observable('John Morgan')
        };
        viewModel.formData = {manOfTheYear: viewModel.famousPirate};
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        var textBoxInstance = $form.find('.dx-textbox').dxTextBox('instance');
        var formInstance = $form.dxForm('instance');
        assert.equal(textBoxInstance._input().val(), 'John Morgan');
        formInstance._updateFieldValue('manOfTheYear', viewModel.famousSailor());
        assert.equal(textBoxInstance._input().val(), 'Edward Teach');
        assert.equal(viewModel.famousSailor(), 'Edward Teach');
        assert.equal(viewModel.famousPirate(), 'Edward Teach');
      });
      QUnit.test('Observable is not unwrap when the formData option is defined as instance_T319859', function(assert) {
        var Pirate = function() {
          this.famousPirate = ko.observable('John Morgan');
        };
        var viewModel = {formData: new Pirate()};
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
        assert.equal(viewModel.formData.famousPirate(), 'Cpt. Jack Sparrow', 'data field of form data is observable');
      });
      QUnit.test('\'formData\' object reference correctly updates after change whole \'formData\' option via \'option\' method when \'items\' option is defined', function(assert) {
        var Pirate = function(name) {
          this.famousPirate = ko.observable(name);
        };
        var firstPirate = new Pirate('John Morgan');
        var secondPirate = new Pirate('Jack Sparrow');
        var viewModel = {formData: firstPirate};
        var $form = $('#simpleDataForm');
        ko.applyBindings(viewModel, $form.get(0));
        var formInstance = $form.dxForm('instance');
        formInstance.option('items', ['famousPirate']);
        formInstance.option('formData', secondPirate);
        formInstance.getEditor('famousPirate').option('value', 'Calico Jack');
        assert.equal(formInstance.option('formData.famousPirate'), 'Calico Jack', 'formData is OK');
        assert.equal(firstPirate.famousPirate(), 'John Morgan', 'firstPirate data is OK');
        assert.equal(secondPirate.famousPirate(), 'Calico Jack', 'secondPirate data is OK');
      });
      QUnit.test('Form correctly work with a data contains computed fields without defined \'write\' logic', function(assert) {
        var viewModel = function() {
          this.famousPirate = ko.observable('Jack Sparrow');
          this.fullName = ko.computed(function() {
            return 'Captain ' + this.famousPirate();
          }, this);
          this.formData = {
            famousPirate: this.famousPirate,
            fullName: this.fullName
          };
        };
        var $form = $('#simpleDataForm');
        var vm = new viewModel();
        ko.applyBindings(vm, $form.get(0));
        var computedField = $form.find('.dx-textbox').eq(1).dxTextBox('instance');
        computedField.option('value', 'Cpt. Jack Sparrow');
        $form.dxForm('instance').option('formData.fullName', vm.fullName);
        assert.equal(vm.fullName(), 'Captain Jack Sparrow', 'computed stay still with old value');
        assert.equal(computedField.option('value'), 'Cpt. Jack Sparrow', 'editor with computed value stay still with old value');
      });
      QUnit.test('Reset editor\'s value when the formData option is empty object', function(assert) {
        var viewModel = function() {
          this.formData = ko.observable({
            name: 'User',
            lastName: 'Test Last Name',
            gender: 'Male',
            room: 1,
            isDeveloper: true
          });
          this.items = ['name', 'lastName', 'sex', 'room', 'isDeveloper'];
        };
        var $form = $('#simpleTemplateForm');
        var vm = new viewModel();
        ko.applyBindings(vm, $form.get(0));
        var form = $form.dxForm('instance');
        vm.formData({});
        assert.strictEqual(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.strictEqual(form.getEditor('lastName').option('value'), '', 'editor for the lastName dataField');
        assert.strictEqual(form.getEditor('sex').option('value'), '', 'editor for the sex dataField');
        assert.strictEqual(form.getEditor('room').option('value'), null, 'editor for the room dataField');
        assert.strictEqual(form.getEditor('isDeveloper').option('value'), false, 'editor for the isDeveloper dataField');
      });
      QUnit.test('Form is not crashed when numberbox is used (T369550)', function(assert) {
        var viewModel = {
          formData: {number: ko.observable(0)},
          items: [{
            dataField: 'number',
            editorType: 'dxNumberBox'
          }]
        };
        var $form = $('#formWithItems');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-numberbox').dxNumberBox('option', 'value', 10);
        assert.ok(true, 'error is not threw');
      });
      QUnit.test('Form items should have correct model', function(assert) {
        assert.expect(1);
        var viewModel = {
          formData: {},
          items: [{
            itemType: 'button',
            buttonOptions: {
              text: 'Register',
              onClick: function(e) {
                assert.deepEqual(e.model, viewModel, 'model is defined');
              }
            }
          }]
        };
        var $form = $('#formWithItems');
        ko.applyBindings(viewModel, $form.get(0));
        $form.find('.dx-button').trigger('dxclick');
      });
      QUnit.test('Editor doesn\'t update the field data if it\'s already up to date', function(assert) {
        var viewModel = {
          formData: {testObj: ko.observable({name: 'John'})},
          items: [{
            dataField: 'testObj',
            editorType: 'dxSelectBox',
            editorOptions: {displayExpr: 'name'}
          }]
        };
        var $form = $('#formWithItems');
        ko.applyBindings(viewModel, $form.get(0));
        var formInstance = $form.dxForm('instance');
        var editor = formInstance.getEditor('testObj');
        var updateFieldValueSpy = sinon.spy(formInstance, '_updateFieldValue');
        editor.option('value', {name: 'Alex'});
        assert.equal(updateFieldValueSpy.callCount, 0, 'Editor doesn\'t update actual value');
        assert.equal(formInstance.option('formData.testObj.name'), 'Alex', 'FormData is correct');
      });
      moduleWithoutCsp('Templates');
      QUnit.test('Render template', function(assert) {
        var viewModel = {
          formData: {test: ko.observable('John Morgan')},
          items: [{
            dataField: 'test',
            template: 'simpleTemplate'
          }]
        };
        var $form = $('#simpleTemplateForm');
        ko.applyBindings(viewModel, $form.get(0));
        var $fieldItemWidget = $form.find('.' + FIELD_ITEM_CONTENT_CLASS);
        var spanText = $fieldItemWidget.find('span').text();
        var textArea = $fieldItemWidget.find('.dx-textarea').dxTextArea('instance');
        var form = $form.dxForm('instance');
        assert.equal(spanText, 'KO template');
        assert.equal(textArea.option('value'), form.option('formData.test'), 'Widget\'s value equal to bound datafield');
      });
      QUnit.test('Check template bound to data', function(assert) {
        var viewModel = {
          formData: {test: ko.observable('John Morgan')},
          items: [{
            dataField: 'test',
            template: 'simpleTemplate'
          }]
        };
        var $form = $('#simpleTemplateForm');
        ko.applyBindings(viewModel, $form.get(0));
        var $fieldItemWidget = $form.find('.' + FIELD_ITEM_CONTENT_CLASS);
        var textArea = $fieldItemWidget.find('.dx-textarea').dxTextArea('instance');
        var form = $form.dxForm('instance');
        textArea.option('value', 'qwerty');
        assert.equal(form.option('formData.test'), 'qwerty', 'Correct data');
      });
      QUnit.test('Redraw layout manager when labelLocation changes', function(assert) {
        var $form = $('#simpleTemplateForm').dxForm({formData: {testField: 'test'}});
        var form = $form.dxForm('instance');
        assert.equal($form.find('.' + FIELD_ITEM_LABEL_LOCATION_CLASS + 'left').length, 1, 'We have 1 label with location left');
        form.option('labelLocation', 'bottom');
        assert.equal($form.find('.' + FIELD_ITEM_LABEL_LOCATION_CLASS + 'bottom').length, 1, 'We have 1 label with location bottom');
        assert.equal($form.find('.' + FIELD_ITEM_LABEL_LOCATION_CLASS + 'left').length, 0, 'We has\'t labels with location left');
      });
      QUnit.test('Item content class should depend on the \'labelLocation\' option', function(assert) {
        var $form = $('#simpleTemplateForm').dxForm({formData: {testField: 'test'}});
        var form = $form.dxForm('instance');
        assert.equal($form.find('.' + FIELD_ITEM_CONTENT_LOCATION_CLASS + 'right').length, 1, 'Item content has the \'right\' location');
        form.option('labelLocation', 'right');
        assert.equal($form.find('.' + FIELD_ITEM_CONTENT_LOCATION_CLASS + 'left').length, 1, 'Item content has the \'left\' location');
        form.option('labelLocation', 'top');
        assert.equal($form.find('.' + FIELD_ITEM_CONTENT_LOCATION_CLASS + 'bottom').length, 1, 'Item content has the \'bottom\' location');
      });
      QUnit.test('Tab template', function(assert) {
        var viewModel = {
          formData: {test: ko.observable('John Morgan')},
          items: [{
            itemType: 'tabbed',
            tabs: [{
              dataField: 'test',
              tabTemplate: 'tabTemplate'
            }]
          }]
        };
        var $form = $('#simpleTemplateForm');
        ko.applyBindings(viewModel, $form.get(0));
        assert.equal($form.find('#tabTemplate').length, 1);
        assert.equal($form.find('#tabTemplate').first().text(), 'Test tab template');
      });
      QUnit.test('The formData is empty object when formData has \'undefined\' value', function(assert) {
        var viewModel = {
          formData: ko.observable(),
          items: [{dataField: 'City'}]
        };
        ko.applyBindings(viewModel, $('#formWithItems').get(0));
        assert.deepEqual(viewModel.formData(), {});
      });
      QUnit.test('Check name argument of the simple item template when name is defined', function(assert) {
        var viewModel = {items: [{
            name: 'TestName',
            template: 'simpleTemplate2'
          }]};
        var $form = $('#simpleTemplateForm2');
        ko.applyBindings(viewModel, $form.get(0));
        assert.strictEqual($('#name').text(), 'TestName', 'the name argument of template');
      });
      QUnit.test('Check name argument of the simple item template when name and dataField are defined', function(assert) {
        var viewModel = {items: [{
            name: 'TestName',
            dataField: 'TestDataField',
            template: 'simpleTemplate2'
          }]};
        var $form = $('#simpleTemplateForm2');
        ko.applyBindings(viewModel, $form.get(0));
        assert.strictEqual($('#name').text(), 'TestName', 'the name argument of template');
      });
      QUnit.test('Check name argument of the simple item template when name is undefined', function(assert) {
        var viewModel = {items: [{template: 'simpleTemplate2'}]};
        var $form = $('#simpleTemplateForm2');
        ko.applyBindings(viewModel, $form.get(0));
        assert.strictEqual($('#name').text(), '', 'the name argument of template');
      });
      QUnit.test('Check name argument of the simple item template when name is undefined and dataField is defined', function(assert) {
        var viewModel = {items: [{
            dataField: 'TestDataField',
            template: 'simpleTemplate2'
          }]};
        var $form = $('#simpleTemplateForm2');
        ko.applyBindings(viewModel, $form.get(0));
        assert.strictEqual($('#name').text(), '', 'the name argument of template');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","knockout","ui/form/constants","ui/form/components/field_item","ui/form/components/label","animation/fx","ui/form","ui/text_area","ui/select_box","ui/tag_box","integration/knockout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("knockout"), require("ui/form/constants"), require("ui/form/components/field_item"), require("ui/form/components/label"), require("animation/fx"), require("ui/form"), require("ui/text_area"), require("ui/select_box"), require("ui/tag_box"), require("integration/knockout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.tests.js.map