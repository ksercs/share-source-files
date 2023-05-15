!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dropDownBox.markup.tests.js"], ["jquery","data/custom_store","ui/drop_down_box","core/utils/type","core/config"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dropDownBox.markup.tests.js", ["jquery", "data/custom_store", "ui/drop_down_box", "core/utils/type", "core/config"], function($__export) {
  "use strict";
  var $,
      CustomStore,
      DropDownBox,
      isRenderer,
      config,
      DROP_DOWN_BOX_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      DropDownBox = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture" class="qunit-fixture-visible">\
            <div id="dropDownBox"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      DROP_DOWN_BOX_CLASS = 'dx-dropdownbox';
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.$element = $('#dropDownBox');
          this.simpleItems = [{
            id: 1,
            name: 'Item 1'
          }, {
            id: 2,
            name: 'Item 2'
          }, {
            id: 3,
            name: 'Item 3'
          }];
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('dropDownBox markup', moduleConfig, function() {
        QUnit.test('dropDownBox should have correct class', function(assert) {
          this.$element.dxDropDownBox({});
          assert.ok(this.$element.hasClass(DROP_DOWN_BOX_CLASS), 'element has correct class');
        });
        QUnit.test('expressions', function(assert) {
          this.$element.dxDropDownBox({
            items: this.simpleItems,
            valueExpr: 'id',
            displayExpr: 'name',
            value: 1
          });
          var $input = this.$element.find('.dx-texteditor-input');
          assert.equal($input.val(), 'Item 1', 'expressions work');
        });
        QUnit.test('field template should work', function(assert) {
          new DropDownBox(this.$element, {
            items: this.simpleItems,
            opened: true,
            fieldTemplate: function(value, fieldElement) {
              assert.equal(isRenderer(fieldElement), !!config().useJQuery, 'fieldElement is correct');
              return $('<div>').dxTextBox({value: 1});
            },
            valueExpr: 'id',
            displayExpr: 'name',
            value: 1
          });
        });
      });
      QUnit.module('hidden input', moduleConfig, function() {
        QUnit.test('a hidden input should be rendered', function(assert) {
          this.$element.dxDropDownBox();
          var $input = this.$element.find('input[type=\'hidden\']');
          assert.equal($input.length, 1, 'a hidden input is rendered');
        });
        QUnit.test('the hidden input should have correct value on widget init', function(assert) {
          this.$element.dxDropDownBox({
            items: [1, 2, 3],
            value: 2
          });
          var $input = this.$element.find('input[type=\'hidden\']');
          assert.equal($input.val(), '2', 'input value is correct');
        });
        QUnit.test('the hidden input should get correct value on widget value change', function(assert) {
          this.$element.dxDropDownBox({
            items: [1, 2, 3],
            value: 2
          });
          var instance = this.$element.dxDropDownBox('instance');
          var $input = this.$element.find('input[type=\'hidden\']');
          instance.option('value', 1);
          assert.equal($input.val(), '1', 'input value is correct');
        });
        QUnit.test('the hidden input should get display text as value if widget value is an object', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          this.$element.dxDropDownBox({
            items: items,
            value: items[0],
            valueExpr: 'this',
            displayExpr: 'text'
          });
          var $input = this.$element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].text, 'input value is correct');
        });
        QUnit.test('the submit value must be equal to the value of the widget', function(assert) {
          var items = ['test'];
          this.$element.dxDropDownBox({
            items: items,
            value: items[0],
            valueExpr: 'this',
            displayExpr: function(item) {
              if (item) {
                return item + '123';
              }
            }
          });
          var $input = this.$element.find('input[type=\'hidden\']');
          assert.deepEqual($input.val(), items[0], 'submit value should be equal to editor value');
        });
        QUnit.test('the hidden input should get value in respect of the \'valueExpr\' option', function(assert) {
          var items = [{
            id: 1,
            text: 'one'
          }];
          this.$element.dxDropDownBox({
            items: items,
            value: items[0].id,
            valueExpr: 'id',
            displayExpr: 'text'
          });
          var $input = this.$element.find('input[type=\'hidden\']');
          assert.equal($input.val(), items[0].id, 'input value is correct');
        });
        QUnit.test('the hidden input should get correct values if async data source is used', function(assert) {
          var data = [0, 1, 2, 3, 4];
          var initialValue = 2;
          var newValue = 4;
          var timeout = 100;
          var store = new CustomStore({
            load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve(data);
              }, timeout);
              return d.promise();
            },
            byKey: function(key) {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve(key);
              }, timeout);
              return d.promise();
            }
          });
          var $element = this.$element.dxDropDownBox({
            dataSource: store,
            value: initialValue,
            valueExpr: 'id',
            displayExpr: 'name'
          });
          var instance = $element.dxDropDownBox('instance');
          this.clock.tick(timeout);
          assert.equal($element.find('input[type=\'hidden\']').val(), initialValue, 'first rendered option value is correct');
          instance.option('value', newValue);
          this.clock.tick(timeout);
          assert.equal($element.find('input[type=\'hidden\']').val(), newValue, 'first rendered option value is correct');
        });
      });
      QUnit.module('the \'name\' option', moduleConfig, function() {
        QUnit.test('widget hidden input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = this.$element.dxDropDownBox({name: expectedName});
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/custom_store","ui/drop_down_box","core/utils/type","core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/custom_store"), require("ui/drop_down_box"), require("core/utils/type"), require("core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dropDownBox.markup.tests.js.map