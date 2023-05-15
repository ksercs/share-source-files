!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.form/form.API.option_items_cssClass.tests.js"], ["jquery","core/devices","ui/form/ui.form","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.API.option_items_cssClass.tests.js", ["jquery", "core/devices", "ui/form/ui.form", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      devices,
      INVALID_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      INVALID_CLASS = 'dx-invalid';
      QUnit.testStart(function() {
        var markup = '<div id="form"></div>';
        $('#qunit-fixture').html(markup);
      });
      [false, true].forEach(function(useItemOption) {
        QUnit.module(("Public API: " + (useItemOption ? 'itemOption(option, cssClass)' : 'option(items.cssClass)')), function() {
          var createForm = function(items) {
            items = items || [{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1'
            }];
            return $('#form').dxForm({items: items}).dxForm('instance');
          };
          QUnit.testInActiveWindow('SimpleItem(undefined -> null)', function(assert) {
            var form = createForm();
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', null);
            } else {
              form.option('items[0].cssClass', null);
            }
            assert.strictEqual(form.itemOption('item1').cssClass, null, 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), null, 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
          });
          QUnit.testInActiveWindow('SimpleItem(undefined -> class1)', function(assert) {
            var form = createForm();
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class1');
            } else {
              form.option('items[0].cssClass', 'class1');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class1', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class1', 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
          });
          QUnit.testInActiveWindow('SimpleItem(null -> undefined)', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: null
            }]);
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', undefined);
            } else {
              form.option('items[0].cssClass', undefined);
            }
            assert.strictEqual(form.itemOption('item1').cssClass, undefined, 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), undefined, 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
          });
          QUnit.testInActiveWindow('SimpleItem(null -> class1)', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: null
            }]);
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class1');
            } else {
              form.option('items[0].cssClass', 'class1');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class1', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class1', 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
          });
          QUnit.testInActiveWindow('SimpleItem(class1 -> undefined)', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: 'class1'
            }]);
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', undefined);
            } else {
              form.option('items[0].cssClass', undefined);
            }
            assert.strictEqual(form.itemOption('item1').cssClass, undefined, 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), undefined, 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class1').length, 0, '$(#form).find(class1).length');
          });
          QUnit.testInActiveWindow('SimpleItem(class1 -> null)', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: 'class1'
            }]);
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', null);
            } else {
              form.option('items[0].cssClass', null);
            }
            assert.strictEqual(form.itemOption('item1').cssClass, null, 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), null, 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class1').length, 0, '$(#form).find(class1).length');
          });
          QUnit.testInActiveWindow('SimpleItem(class1 -> class2)', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: 'class1',
              validationRules: [{
                type: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]
            }]);
            form.validate();
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("initial [" + INVALID_CLASS + "].length"));
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class2');
            } else {
              form.option('items[0].cssClass', 'class2');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class2', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class2', 'form.option(items[0].cssClass)');
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("final [" + INVALID_CLASS + "].length"));
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class2').length, 1, '$(#form).find(class2).length');
          });
          QUnit.testInActiveWindow('SimpleItem(class1 -> class2) in form with 2 items', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1',
              cssClass: 'class1'
            }, {
              itemType: 'simple',
              editorType: 'dxTextBox',
              validationRules: [{
                type: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]
            }]);
            form.validate();
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("initial [" + INVALID_CLASS + "].length"));
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class2');
            } else {
              form.option('items[0].cssClass', 'class2');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class2', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class2', 'form.option(items[0].cssClass)');
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("final [" + INVALID_CLASS + "].length"));
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class2').length, 1, '$(#form).find(class2).length');
          });
          QUnit.test('SimpleItem(undefined -> class1) when item is hidden via api', function(assert) {
            var form = createForm([{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item1'
            }]);
            if (useItemOption) {
              form.itemOption('item1', 'visible', false);
              form.itemOption('item1', 'cssClass', 'class1');
            } else {
              form.option('items[0].visible', false);
              form.option('items[0].cssClass', 'class1');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class1', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class1', 'form.option(items[0].cssClass)');
            assert.strictEqual($('#form').find('.class2').length, 0, '$(#form).find(class2).length');
          });
          QUnit.testInActiveWindow('ButtonItem(class1 -> class2)', function(assert) {
            if (devices.real().deviceType !== 'desktop') {
              assert.ok(true, 'desktop specific test');
              return;
            }
            var form = createForm([{
              itemType: 'button',
              name: 'item1',
              cssClass: 'class1',
              buttonOptions: {icon: 'icon1'}
            }]);
            $('#form').find('.dx-button').focus();
            assert.ok($('#form').find('.dx-button').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class2');
            } else {
              form.option('items[0].cssClass', 'class2');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class2', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class2', 'form.option(items[0].cssClass)');
            assert.ok($('#form').find('.dx-button').is(':focus'), 'final focus');
            assert.strictEqual($('#form').find('.class2').length, 1, '$(#form).find(class2).length');
          });
          QUnit.testInActiveWindow('ButtonItem(class1 -> class2) in form with 2 items', function(assert) {
            if (devices.real().deviceType !== 'desktop') {
              assert.ok(true, 'desktop specific test');
              return;
            }
            var form = createForm([{
              itemType: 'button',
              name: 'item1',
              cssClass: 'class1',
              buttonOptions: {icon: 'icon1'}
            }, {
              itemType: 'simple',
              editorType: 'dxTextBox',
              validationRules: [{
                type: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]
            }]);
            form.validate();
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("initial [" + INVALID_CLASS + "].length"));
            $('#form').find('.dx-texteditor-input').focus();
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class1').length, 1, '$(#form).find(class1).length');
            if (useItemOption) {
              form.itemOption('item1', 'cssClass', 'class2');
            } else {
              form.option('items[0].cssClass', 'class2');
            }
            assert.strictEqual(form.itemOption('item1').cssClass, 'class2', 'form.itemOption(item1).cssClass');
            assert.strictEqual(form.option('items[0].cssClass'), 'class2', 'form.option(items[0].cssClass)');
            assert.strictEqual($('#form').find(("." + INVALID_CLASS)).length, 1, ("final [" + INVALID_CLASS + "].length"));
            assert.ok($('#form').find('.dx-texteditor-input').is(':focus'), 'initial focus');
            assert.strictEqual($('#form').find('.class2').length, 1, '$(#form).find(class2).length');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","ui/form/ui.form","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("ui/form/ui.form"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.API.option_items_cssClass.tests.js.map