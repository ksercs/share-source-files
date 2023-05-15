!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/selectBox.markup.tests.js"], ["jquery","ui/select_box","data/data_source/data_source","data/custom_store","animation/fx","core/utils/window","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/selectBox.markup.tests.js", ["jquery", "ui/select_box", "data/data_source/data_source", "data/custom_store", "animation/fx", "core/utils/window", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      SelectBox,
      DataSource,
      CustomStore,
      fx,
      windowUtils,
      WIDGET_CLASS,
      POPUP_CLASS,
      LIST_ITEM_CLASS,
      LIST_ITEM_SELECTED_CLASS,
      PLACEHOLDER_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      TIME_TO_WAIT,
      moduleSetup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      SelectBox = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="selectBox"></div>\
            \
            <div id="selectBoxFieldTemplateWithoutTextBox">\
                <div data-options="dxTemplate: { name: \'field\' }">\
                    <span>test</span>\
                </div>\
            </div>\
            \
            <div id="selectBoxFieldTemplate">\
                <div data-options="dxTemplate: { name: \'field\' }">\
                    fieldTemplate\
                </div>\
                <div data-options="dxTemplate: { name: \'item\'}">\
                    itemTemplate\
                </div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      WIDGET_CLASS = 'dx-selectbox';
      POPUP_CLASS = 'dx-selectbox-popup';
      LIST_ITEM_CLASS = 'dx-list-item';
      LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
      PLACEHOLDER_CLASS = 'dx-placeholder';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      TIME_TO_WAIT = 500;
      moduleSetup = {
        beforeEach: function() {
          SelectBox.defaultOptions({options: {deferRendering: false}});
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      QUnit.module('rendering', moduleSetup, function() {
        QUnit.test('markup init', function(assert) {
          var $element = $('#selectBox').dxSelectBox();
          var instance = $element.dxSelectBox('instance');
          assert.ok($element.hasClass(WIDGET_CLASS));
          if (windowUtils.hasWindow()) {
            var $list = $element.find('.dx-list');
            var $popup = $(instance._popup.$element());
            assert.ok($popup.hasClass(POPUP_CLASS));
            assert.ok($list.is(':hidden'), 'when start list is hidden');
          }
        });
        QUnit.test('render selected item', function(assert) {
          var $element = $('#selectBox').dxSelectBox({
            items: ['first', 'second', 'third'],
            value: 'second'
          });
          this.clock.tick(TIME_TO_WAIT);
          assert.equal($element.find('.' + TEXTEDITOR_INPUT_CLASS).val(), 'second', 'SelectBox has the correct value');
          if (windowUtils.hasWindow()) {
            var $list = $element.find('.dx-list');
            assert.ok($list.find('.' + LIST_ITEM_CLASS).eq(1).hasClass(LIST_ITEM_SELECTED_CLASS), 'SelectBox has selected class, when value was set');
          }
        });
      });
      QUnit.module('hidden input', moduleSetup, function() {
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = $('#selectBox').dxSelectBox();
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.length, 1, 'a hidden input is rendered');
        });
        QUnit.test('the hidden input should have correct value on widget init', function(assert) {
          var $element = $('#selectBox').dxSelectBox({
            items: [1, 2, 3],
            value: 2
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), '2', 'input value is correct');
        });
        QUnit.test('the hidden input should get display text as value if widget value is an object', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#selectBox').dxSelectBox({
            items: items,
            value: items[0],
            valueExpr: 'this',
            displayExpr: 'text'
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].text, 'input value is correct');
        });
        QUnit.test('the submit value must be equal to the value of the widget', function(assert) {
          var items = ['test'];
          var $element = $('#selectBox').dxSelectBox({
            items: items,
            value: items[0],
            valueExpr: 'this',
            displayExpr: function(item) {
              if (item) {
                return item + '123';
              }
            }
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.deepEqual($input.val(), items[0], 'input value is correct');
        });
        QUnit.test('the hidden input should get value in respect of the \'valueExpr\' option', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#selectBox').dxSelectBox({
            items: items,
            value: items[0].id,
            valueExpr: 'id',
            displayExpr: 'text'
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].id, 'input value is correct');
        });
      });
      QUnit.module('widget options', moduleSetup, function() {
        QUnit.test('widget hidden input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#selectBox').dxSelectBox({name: expectedName});
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
        QUnit.test('widget should render correct input\'s value according the displayExpr', function(assert) {
          var items = [{
            number: 1,
            caption: 'one'
          }, {
            number: 2,
            caption: 'two'
          }];
          var $element = $('#selectBox').dxSelectBox({
            items: items,
            valueExpr: 'number',
            displayExpr: 'caption',
            value: 1
          });
          this.clock.tick(TIME_TO_WAIT);
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), 'one', 'input contains value of the \'caption\' field');
        });
        QUnit.test('set value using dataSource instead of store', function(assert) {
          var arrayStore = [{
            key: 1,
            value: 'one'
          }, {
            key: 2,
            value: 'two'
          }, {
            key: 3,
            value: 'three'
          }, {
            key: 4,
            value: 'four'
          }];
          var dataSource = new DataSource({
            store: arrayStore,
            filter: ['key', '>', 2]
          });
          var selectBox = $('#selectBox').dxSelectBox({
            dataSource: dataSource,
            displayExpr: 'value',
            valueExpr: 'key',
            value: 1
          }).dxSelectBox('instance');
          assert.equal(selectBox.option('displayValue'), null, 'display value is not defined');
        });
        QUnit.test('placeholder', function(assert) {
          var $element = $('#selectBox').dxSelectBox({placeholder: 'John Doe'});
          assert.equal($element.find('.' + PLACEHOLDER_CLASS).attr('data-dx_placeholder'), 'John Doe');
        });
        QUnit.test('fieldTemplate should contain dxTextBox inside', function(assert) {
          assert.throws(function() {
            $('#selectBoxFieldTemplateWithoutTextBox').dxSelectBox({fieldTemplate: 'field'});
          });
        });
        QUnit.test('check fieldTemplate', function(assert) {
          var $element = $('#selectBoxFieldTemplate').dxSelectBox({
            dataSource: [{
              ID: 1,
              name: 'First'
            }, {
              ID: 2,
              name: 'Second'
            }, {
              ID: 3,
              name: 'Third'
            }],
            fieldTemplate: function(selectedItem) {
              return $('<div id=\'myfield\'>').dxTextBox({value: selectedItem ? selectedItem.ID + ' - ' + selectedItem.name : ''});
            },
            valueExpr: 'ID',
            value: 1
          });
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), '1 - First', 'value is correct');
        });
        QUnit.test('displayCustomValue enabled', function(assert) {
          var $selectBox = $('#selectBox').dxSelectBox({
            items: [1, 2, 3],
            displayCustomValue: true,
            value: 'test',
            placeholder: ''
          });
          this.clock.tick(TIME_TO_WAIT);
          assert.equal($selectBox.find('.' + TEXTEDITOR_INPUT_CLASS).val(), 'test', 'custom value displayed');
        });
        QUnit.test('value should not be displayed when it is not in dataSource', function(assert) {
          var $selectBox = $('#selectBox').dxSelectBox({
            dataSource: [1, 2, 3],
            value: 'test'
          });
          this.clock.tick(TIME_TO_WAIT);
          var $input = $selectBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), '', 'input value is empty');
        });
      });
      QUnit.module('regressions', moduleSetup, function() {
        QUnit.test('dataSource.byKey method should not be called if value is not set (T115847)', function(assert) {
          var byKeyCalled = $.Deferred();
          $('#selectBox').dxSelectBox({dataSource: {
              load: function() {
                return $.when();
              },
              byKey: function() {
                byKeyCalled.resolve();
                return byKeyCalled.promise();
              }
            }});
          assert.notStrictEqual(byKeyCalled.state(), 'resolved');
        });
        QUnit.test('T427723: dxSelectBox placed in a custom Angular directive throws the \'Cannot read property \'dxButton\' of undefined\' error', function(assert) {
          var items = [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }, {
            id: 3,
            text: 'Item 3'
          }];
          try {
            $('#selectBox').dxSelectBox({
              displayExpr: 'name',
              valueExpr: 'id',
              deferRendering: false,
              openOnFieldClick: false,
              dataSource: new CustomStore({
                key: 'id',
                load: function() {
                  return items;
                },
                byKey: function(key) {
                  var d = $.Deferred();
                  setTimeout(function(i) {
                    items.forEach(function(i) {
                      if (i.id === key) {
                        d.resolve(i);
                        return;
                      }
                    });
                  });
                  return d.promise();
                }
              }),
              value: [1, 2]
            }).dxSelectBox('instance');
            assert.ok(true, 'exception is not expected');
          } catch (_) {
            assert.ok(false, 'exception');
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/select_box","data/data_source/data_source","data/custom_store","animation/fx","core/utils/window","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/select_box"), require("data/data_source/data_source"), require("data/custom_store"), require("animation/fx"), require("core/utils/window"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selectBox.markup.tests.js.map