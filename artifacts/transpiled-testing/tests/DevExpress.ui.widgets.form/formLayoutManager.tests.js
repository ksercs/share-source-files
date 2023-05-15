!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/formLayoutManager.tests.js"], ["jquery","ui/form/constants","ui/form/components/field_item","ui/form","ui/switch","ui/lookup","ui/text_area","ui/radio_group","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/formLayoutManager.tests.js", ["jquery", "ui/form/constants", "ui/form/components/field_item", "ui/form", "ui/switch", "ui/lookup", "ui/text_area", "ui/radio_group", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      FIELD_ITEM_CLASS,
      FIELD_ITEM_LABEL_CLASS,
      FLEX_LAYOUT_CLASS,
      FIELD_ITEM_LABEL_ALIGN_CLASS;
  function triggerKeyUp($element, key) {
    var e = $.Event('keyup');
    e.key = key;
    $($element.find('input').first()).trigger(e);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      FIELD_ITEM_CLASS = $__m.FIELD_ITEM_CLASS;
      FIELD_ITEM_LABEL_CLASS = $__m.FIELD_ITEM_LABEL_CLASS;
    }, function($__m) {
      FLEX_LAYOUT_CLASS = $__m.FLEX_LAYOUT_CLASS;
      FIELD_ITEM_LABEL_ALIGN_CLASS = $__m.FIELD_ITEM_LABEL_ALIGN_CLASS;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Layout manager');
      QUnit.test('Layout strategy when flex is supported', function(assert) {
        var items = [{
          dataField: 'test1',
          editorType: 'dxTextBox'
        }, {
          dataField: 'test2',
          editorType: 'dxTextBox',
          helpText: 'help'
        }, {
          dataField: 'test3',
          editorType: 'dxRadioGroup'
        }, {
          dataField: 'test4',
          editorType: 'dxCalendar'
        }, {
          dataField: 'test5',
          editorType: 'dxTextArea'
        }];
        var $testContainer = $('#container').dxLayoutManager();
        var layoutManager = $testContainer.dxLayoutManager('instance');
        layoutManager.option('items', items);
        assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + '.' + FLEX_LAYOUT_CLASS).length, 5, 'flex layout class');
      });
      QUnit.test('Check label alignment classes when browser is not supported flex', function(assert) {
        var items = [{
          dataField: 'test1',
          editorType: 'dxTextBox'
        }, {
          dataField: 'test2',
          editorType: 'dxTextBox',
          helpText: 'help'
        }, {
          dataField: 'test3',
          editorType: 'dxRadioGroup'
        }, {
          dataField: 'test4',
          editorType: 'dxCalendar'
        }, {
          dataField: 'test5',
          editorType: 'dxTextArea'
        }];
        var $testContainer = $('#container').dxLayoutManager();
        var layoutManager = $testContainer.dxLayoutManager('instance');
        layoutManager.option('items', items);
        var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
        assert.ok(!$items.eq(0).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item doesn\'t have baseline alignment class');
        assert.ok(!$items.eq(1).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item doesn\'t have baseline alignment class');
        assert.ok($items.eq(2).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item have baseline alignment class');
        assert.ok($items.eq(3).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item have baseline alignment class');
        assert.ok($items.eq(4).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item have baseline alignment class');
      });
      QUnit.test('Check clickable fielditem', function(assert) {
        var clock = sinon.useFakeTimers();
        var $testContainer = $('#container').dxLayoutManager({items: [{
            dataField: 'isRich',
            editorType: 'dxSwitch',
            editorOptions: {value: false}
          }, {
            dataField: 'hasMansion',
            editorType: 'dxCheckBox',
            editorOptions: {value: false}
          }]});
        var $fieldItemLabels = $testContainer.find('.' + FIELD_ITEM_LABEL_CLASS);
        var instance = $testContainer.dxLayoutManager('instance');
        assert.deepEqual(instance.option('layoutData'), {
          isRich: false,
          hasMansion: false
        }, 'Correct initial data');
        $($fieldItemLabels.eq(0)).trigger('dxclick');
        clock.tick();
        $($fieldItemLabels.eq(1)).trigger('dxclick');
        clock.tick(200);
        assert.deepEqual(instance.option('layoutData'), {
          isRich: true,
          hasMansion: true
        }, 'Correct data');
        clock.restore();
      });
      QUnit.test('Generate several various widgets in layout', function(assert) {
        var $testContainer = $('#container').dxLayoutManager({items: [{
            label: {text: 'label1'},
            dataField: 'name',
            editorType: 'dxTextBox'
          }, {
            label: {text: 'label2'},
            dataField: 'name',
            editorType: 'dxNumberBox'
          }, {
            label: {text: 'label3'},
            dataField: 'name',
            editorType: 'dxDateBox'
          }]});
        var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
        var $dateBox = $fieldItems.eq(2).find('.dx-datebox');
        assert.ok($fieldItems.eq(0).find('.dx-textbox').length, 'First item is dxTextBox');
        assert.ok($fieldItems.eq(1).find('.dx-numberbox').length, 'Second item is dxNumberBox');
        assert.ok($dateBox.length, 'Third item is dxDateBox');
        assert.ok($dateBox.width() < $fieldItems.eq(2).width(), 'dxDateBox width');
      });
      QUnit.test('Editors with object value correctly work with values from data', function(assert) {
        var $testContainer = $('#container');
        var items = [{
          myText: 'test1',
          number: 1
        }, {
          myText: 'test2',
          number: 2
        }, {
          myText: 'test3',
          number: 3
        }];
        var layoutManager = $testContainer.dxLayoutManager({
          layoutData: {testItem: items[1]},
          items: [{
            dataField: 'testItem',
            editorType: 'dxLookup',
            editorOptions: {
              items: items,
              displayExpr: 'myText'
            }
          }]
        }).dxLayoutManager('instance');
        var lookupCurrentItemText = layoutManager.$element().find('.dx-lookup-field').text();
        assert.equal(lookupCurrentItemText, 'test2', 'lookup has correct current item');
      });
      QUnit.test('Change a layoutData object', function(assert) {
        var $testContainer = $('#container');
        var layoutManager = $testContainer.dxLayoutManager({
          layoutData: {
            name: 'Patti',
            active: true,
            price: 1200,
            birthDate: new Date('10/10/2010')
          },
          customizeItem: function(item) {
            if (item.dataField === 'active') {
              item.editorType = 'dxSwitch';
            }
          }
        }).dxLayoutManager('instance');
        layoutManager.option('layoutData', {
          name: 'Vadim',
          active: null,
          price: 450,
          birthDate: new Date('1/1/2001')
        });
        var $editors = $testContainer.find('.dx-texteditor, .dx-switch');
        assert.equal($editors.eq(0).dxTextBox('instance').option('value'), 'Vadim');
        assert.equal($editors.eq(1).dxSwitch('instance').option('value'), false);
        assert.equal($editors.eq(2).dxNumberBox('instance').option('value'), 450);
        assert.deepEqual($editors.eq(3).dxDateBox('instance').option('value'), new Date('1/1/2001'));
      });
      QUnit.test('onEditorEnterKey', function(assert) {
        var testArgs;
        var editor;
        var layoutManager = $('#container').dxLayoutManager({
          layoutData: {
            name: 'Test Name',
            profession: 'Test profession'
          },
          onEditorEnterKey: function(args) {
            testArgs = args;
          }
        }).dxLayoutManager('instance');
        editor = layoutManager.getEditor('profession');
        triggerKeyUp(editor.$element(), 'Enter');
        assert.notEqual(testArgs.component, undefined, 'component');
        assert.notEqual(testArgs.element, undefined, 'element');
        assert.notEqual(testArgs.event, undefined, 'Event');
        assert.equal(testArgs.dataField, 'profession', 'dataField');
        assert.equal(testArgs.component.NAME, 'dxLayoutManager', 'correct component');
        editor = layoutManager.getEditor('name');
        triggerKeyUp(editor.$element(), 'Enter');
        assert.notEqual(testArgs.component, undefined, 'component');
        assert.notEqual(testArgs.element, undefined, 'element');
        assert.notEqual(testArgs.event, undefined, 'Event');
        assert.equal(testArgs.dataField, 'name', 'dataField');
      });
      QUnit.test('Should save layoutData properties by reference (T706177)', function(assert) {
        var done = assert.async();
        var items = [{
          id: 1,
          name: 'name1'
        }, {
          id: 2,
          name: 'name2'
        }];
        var layoutManager = $('#container').dxLayoutManager({
          layoutData: {
            id: 1,
            field: items[0]
          },
          items: [{
            dataField: 'field',
            editorType: 'dxSelectBox',
            editorOptions: {
              dataSource: items,
              onValueChanged: function($__2) {
                var $__3 = $__2,
                    previousValue = $__3.previousValue,
                    value = $__3.value;
                assert.deepEqual(previousValue, {
                  id: 1,
                  name: 'name1'
                });
                assert.deepEqual(value, {
                  id: 2,
                  name: 'name2'
                });
                done();
              }
            }
          }]
        }).dxLayoutManager('instance');
        var editor = layoutManager.getEditor('field');
        editor.option('value', items[1]);
      });
      QUnit.test('Change items from [1] -> []', function(assert) {
        var layoutManager = $('#container').dxLayoutManager({
          formData: {name: 'TestName'},
          items: ['name']
        }).dxLayoutManager('instance');
        layoutManager.option('items', []);
        assert.equal(layoutManager.$element().children().length, 0, 'layout manager content is empty');
        assert.notOk(layoutManager.getEditor('name'), 'editor is not created');
      });
      QUnit.module('Render multiple columns');
      QUnit.test('Change from fixed colCount to auto and vice versa', function(assert) {
        var $testContainer = $('#container').width(450);
        $testContainer.dxLayoutManager({
          layoutData: {
            test1: 'abc',
            test2: 'qwe',
            test3: 'xyz'
          },
          colCount: 1,
          minColWidth: 200
        });
        var instance = $testContainer.dxLayoutManager('instance');
        assert.equal(instance._getColCount(), 1, 'We have only 1 column');
        instance.option('colCount', 'auto');
        assert.equal(instance._getColCount(), 2, 'We have only 2 columns');
        instance.option('colCount', 3);
        assert.equal(instance._getColCount(), 3, 'We have only 3 columns');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/form/constants","ui/form/components/field_item","ui/form","ui/switch","ui/lookup","ui/text_area","ui/radio_group","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/form/constants"), require("ui/form/components/field_item"), require("ui/form"), require("ui/switch"), require("ui/lookup"), require("ui/text_area"), require("ui/radio_group"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=formLayoutManager.tests.js.map