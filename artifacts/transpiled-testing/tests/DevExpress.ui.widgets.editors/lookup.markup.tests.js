!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/lookup.markup.tests.js"], ["jquery","ui/lookup","core/utils/deferred","../../helpers/executeAsyncMock.js","animation/fx","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/lookup.markup.tests.js", ["jquery", "ui/lookup", "core/utils/deferred", "../../helpers/executeAsyncMock.js", "animation/fx", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      Lookup,
      Deferred,
      executeAsyncMock,
      fx,
      test,
      module,
      testStart,
      LOOKUP_FIELD_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Lookup = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, module = $__3.module, testStart = $__3.testStart, $__3));
      testStart(function() {
        var markup = "<div id=\"lookup\"></div>\n        <div id=\"widthRootStyle\"></div>\n        <div id=\"lookupFieldTemplate\">\n            <div data-options=\"dxTemplate: { name: 'field' }\">\n                <span>test</span>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      LOOKUP_FIELD_CLASS = 'dx-lookup-field';
      module('Lookup', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
          this.element = $('#lookup');
          this.instance = this.element.dxLookup({'dropDownOptions.fullScreen': false}).dxLookup('instance');
          this.$field = $(this.instance._$field);
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        test('render dxLookup', function(assert) {
          assert.ok(this.instance instanceof Lookup);
          assert.ok(this.element.hasClass('dx-lookup'), 'widget has class dx-lookup');
          assert.ok($(("." + LOOKUP_FIELD_CLASS), this.element).length, 'widget contents field');
          assert.ok($('.dx-lookup-arrow', this.element).length, 'widget contents arrow');
        });
        test('render dxLookup with predefined value and displayExpr (T929376)', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          $element.dxLookup({
            items: [{
              id: 0,
              text: 0
            }, {
              id: 1,
              text: 1
            }],
            value: 0,
            valueExpr: 'id',
            displayExpr: 'text'
          });
          assert.strictEqual($element.find(("." + LOOKUP_FIELD_CLASS)).text(), '0');
        });
        test('render dxLookup with placeholder and displayExpr returns empty string (T929376)', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          $element.dxLookup({
            items: [{
              id: 0,
              text: 0
            }, {
              id: 1,
              text: 1
            }],
            value: null,
            placeholder: 'test',
            valueExpr: 'id',
            displayExpr: function() {
              return '';
            }
          });
          assert.strictEqual($element.find(("." + LOOKUP_FIELD_CLASS)).text(), 'test', 'placeholder should be rendered');
        });
        test('regression: value is out of range (B231783)', function(assert) {
          this.instance.option({
            dataSource: [1, 2, 3],
            value: 'wrongValue'
          });
          assert.equal(this.$field.text(), 'Select...');
        });
        test('regression: B232016 - Lookup element has no \'dx-widget\' CSS class', function(assert) {
          assert.ok(this.element.hasClass('dx-widget'));
        });
        test('lookup empty class is attached when no item is selected', function(assert) {
          var $lookup = this.element.dxLookup({
            dataSource: [1, 2, 3],
            showClearButton: true,
            placeholder: 'placeholder'
          });
          var LOOKUP_EMPTY_CLASS = 'dx-lookup-empty';
          assert.ok($lookup.hasClass(LOOKUP_EMPTY_CLASS), 'Lookup without preselected value has empty class');
        });
        test('data source should be paginated by default', function(assert) {
          assert.expect(1);
          var $element = $('#lookup').dxLookup({dataSource: [1, 2]});
          var instance = $element.dxLookup('instance');
          assert.equal(instance._dataSource.paginate(), true, 'pagination enabled by default');
        });
        test('T373464 - the \'fieldTemplate\' should be used for rendering if the item is get asynchronously', function(assert) {
          var fieldTemplateText = 'Field template';
          var items = ['1', '2'];
          var $element = $('#lookup').dxLookup({
            fieldTemplate: function() {
              return fieldTemplateText;
            },
            dataSource: {
              byKey: function(key) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(key);
                }, 0);
                return d.promise();
              },
              load: function() {
                return items;
              }
            },
            value: items[0]
          });
          this.clock.tick(0);
          assert.equal($element.find(("." + LOOKUP_FIELD_CLASS)).text(), fieldTemplateText, 'field template is used');
        });
        test('field template should be render one time per value rendering', function(assert) {
          var fieldTemplateStub = sinon.stub().returns($('<div>'));
          $('#widthRootStyle').dxLookup({
            fieldTemplate: fieldTemplateStub,
            dataSource: [1, 2, 3],
            value: 2
          });
          assert.ok(fieldTemplateStub.calledOnce, 'field template called once');
        });
        test('value should be rendered correctly when async data source has been used', function(assert) {
          var value = 'last name';
          this.element.dxLookup({
            dataSource: {
              load: function() {
                return ['first name', 'last name', 'age'];
              },
              byKey: function(key) {
                var d = new Deferred();
                setTimeout(function() {
                  d.resolve(key);
                }, 0);
                return d.promise();
              }
            },
            value: value
          });
          this.clock.tick(0);
          assert.equal(this.element.find(("." + LOOKUP_FIELD_CLASS)).text(), value, 'Field text is correct');
        });
      });
      module('hidden input', function() {
        test('a hidden input should be rendered', function(assert) {
          var $element = $('#lookup').dxLookup();
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.length, 1, 'a hidden input is rendered');
        });
        test('the hidden input should have correct value on widget init', function(assert) {
          var $element = $('#lookup').dxLookup({
            items: [1, 2, 3],
            value: 2
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), '2', 'input value is correct');
        });
        test('the hidden input should get display text as value if widget value is an object', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#lookup').dxLookup({
            items: items,
            value: items[0],
            valueExpr: 'this',
            displayExpr: 'text'
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].text, 'input value is correct');
        });
        test('the submit value must be equal to the value of the widget', function(assert) {
          var items = ['test'];
          var $element = $('#lookup').dxLookup({
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
        test('the hidden input should get value in respect of the \'valueExpr\' option', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          var $element = $('#lookup').dxLookup({
            items: items,
            value: items[0].id,
            valueExpr: 'id',
            displayExpr: 'text'
          });
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].id, 'input value is correct');
        });
      });
      module('options', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        test('hidden input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'lookup';
          var $element = $('#lookup').dxLookup({name: expectedName});
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.attr('name'), expectedName, 'input has correct \'name\' attribute');
        });
        test('displayExpr, valueExpr as functions (regression B230600)', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: [1, 2],
            valueExpr: function(item) {
              return item * 2;
            },
            displayExpr: function(item) {
              return 'number ' + item;
            },
            value: 2
          }).dxLookup('instance');
          var $field = instance._$field;
          assert.equal($field.text(), 'number 1');
        });
        test('value', function(assert) {
          var items = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            dataSource: items,
            value: 1
          }).dxLookup('instance');
          var $field = $(instance._$field);
          assert.equal($field.text(), 1, 'field text is selected item value');
          assert.equal(instance.option('displayValue'), 1, 'displayValue is selected item value');
        });
        test('displayValue should be correctly rendered after updating an dataSource', function(assert) {
          var dataSource = [{
            id: 1,
            text: 'test1'
          }, {
            id: 2,
            text: 'test2'
          }];
          var instance = $('#lookup').dxLookup({
            value: 2,
            displayExpr: 'text',
            valueExpr: 'id'
          }).dxLookup('instance');
          var $field = $(instance._$field);
          instance.option({dataSource: dataSource});
          assert.equal($field.text(), 'test2', 'field text is selected item value');
          assert.equal(instance.option('displayValue'), 'test2', 'displayValue is selected item value');
        });
        test('displayValue should be correctly rendered after updating an items', function(assert) {
          var items = [{
            id: 1,
            text: 'test1'
          }, {
            id: 2,
            text: 'test2'
          }];
          var instance = $('#lookup').dxLookup({
            value: 2,
            displayExpr: 'text',
            valueExpr: 'id'
          }).dxLookup('instance');
          var $field = $(instance._$field);
          instance.option({items: items});
          assert.equal($field.text(), 'test2', 'field text is selected item value');
          assert.equal(instance.option('displayValue'), 'test2', 'displayValue is selected item value');
        });
        test('value should be assigned by reference', function(assert) {
          var items = [{name: 'name'}];
          var instance = $('#lookup').dxLookup({
            dataSource: items,
            value: items[0],
            displayExpr: 'name'
          }).dxLookup('instance');
          var $field = $(instance._$field);
          assert.equal($field.text(), 'name', 'item was found in items by reference');
        });
        test('placeholder', function(assert) {
          var instance = $('#lookup').dxLookup({dataSource: []}).dxLookup('instance');
          assert.equal($(instance._$field).text(), 'Select...', 'default value');
        });
        test('fieldTemplate should be rendered', function(assert) {
          $('#lookupFieldTemplate').dxLookup({fieldTemplate: 'field'});
          assert.equal($.trim($('#lookupFieldTemplate').text()), 'test', 'test was be rendered');
        });
        test('selected item should be passed as first argument if fieldTemplate is a function', function(assert) {
          var items = [{
            id: 1,
            text: 'one',
            data: 11
          }, {
            id: 2,
            text: 'two',
            data: 22
          }];
          $('#lookup').dxLookup({
            items: items,
            valueExpr: 'id',
            displayExpr: 'text',
            value: items[1].id,
            fieldTemplate: function(item) {
              assert.deepEqual(item, items[1], 'selected item is passed to fieldTemplate function');
              return $('<div>').dxTextBox();
            }
          });
        });
      });
      module('widget sizing render', function() {
        test('constructor', function(assert) {
          var $element = $('#lookup').dxLookup({width: 400});
          var instance = $element.dxLookup('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element.get(0).style.width, '400px', 'outer width of the element must be equal to custom width');
        });
        test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxLookup();
          var instance = $element.dxLookup('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element.get(0).style.width, '300px', 'outer width of the element must be equal to custom width');
        });
      });
      module('aria accessibility', function() {
        test('aria role', function(assert) {
          var $element = $('#lookup').dxLookup();
          var $field = $element.find(("." + LOOKUP_FIELD_CLASS + ":first"));
          assert.equal($field.attr('role'), 'combobox', 'aria role is on the field');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/lookup","core/utils/deferred","../../helpers/executeAsyncMock.js","animation/fx","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/lookup"), require("core/utils/deferred"), require("../../helpers/executeAsyncMock.js"), require("animation/fx"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=lookup.markup.tests.js.map