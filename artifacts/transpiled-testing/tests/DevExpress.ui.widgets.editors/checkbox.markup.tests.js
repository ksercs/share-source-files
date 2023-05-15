!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/checkbox.markup.tests.js"], ["jquery","ui/check_box","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/checkbox.markup.tests.js", ["jquery", "ui/check_box", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      CHECKBOX_CLASS,
      CHECKBOX_CONTAINER_CLASS,
      CHECKBOX_CONTAINER_SELECTOR,
      ICON_SELECTOR,
      CHECKBOX_TEXT_CLASS,
      CHECKBOX_HAS_TEXT_CLASS,
      CHECKED_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="checkBox"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      CHECKBOX_CLASS = 'dx-checkbox';
      CHECKBOX_CONTAINER_CLASS = 'dx-checkbox-container';
      CHECKBOX_CONTAINER_SELECTOR = '.dx-checkbox-container';
      ICON_SELECTOR = '.dx-checkbox-icon';
      CHECKBOX_TEXT_CLASS = 'dx-checkbox-text';
      CHECKBOX_HAS_TEXT_CLASS = 'dx-checkbox-has-text';
      CHECKED_CLASS = 'dx-checkbox-checked';
      QUnit.module('Checkbox markup', function() {
        QUnit.test('markup init', function(assert) {
          var $element = $('#checkBox').dxCheckBox();
          var $content = $element.find(CHECKBOX_CONTAINER_SELECTOR);
          assert.ok($element.hasClass(CHECKBOX_CLASS), 'widget has checkbox class');
          assert.notOk($element.hasClass(CHECKBOX_HAS_TEXT_CLASS), 'checkbox without text has not text class');
          assert.ok($content.hasClass(CHECKBOX_CONTAINER_CLASS), 'checkbox has a container');
          assert.strictEqual($content.find(ICON_SELECTOR).length, 1, 'checkbox has an icon');
        });
        QUnit.test('checkbox should have correct text', function(assert) {
          var $element = $('#checkBox').dxCheckBox({text: 'text'});
          var $content = $element.find(CHECKBOX_CONTAINER_SELECTOR);
          var text = $content.find(("." + CHECKBOX_TEXT_CLASS)).text();
          assert.strictEqual(text, 'text', 'text is correct');
          assert.ok($element.hasClass(CHECKBOX_HAS_TEXT_CLASS), 'checkbox with text has text class');
        });
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = $('#checkBox').dxCheckBox();
          var $input = $element.find('input');
          assert.strictEqual($input.length, 1, 'input is rendered');
          assert.strictEqual($input.attr('type'), 'hidden', 'type attribute of hidden input');
        });
        QUnit.test('init with options', function(assert) {
          var $element = $('#checkBox').dxCheckBox({value: true});
          assert.ok($element.hasClass(CHECKED_CLASS), 'checkBox is checked');
        });
        QUnit.test('checked class should not be rendered when value is not true (Q504139)', function(assert) {
          var $element = $('#checkBox').dxCheckBox({value: undefined});
          var instance = $element.dxCheckBox('instance');
          assert.notOk($element.hasClass(CHECKED_CLASS));
          instance.option({value: null});
          assert.notOk($element.hasClass(CHECKED_CLASS));
          instance.option({value: 0});
          assert.notOk($element.hasClass(CHECKED_CLASS));
        });
        QUnit.test('name property value should be passed to input "name" attribute', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#checkBox').dxCheckBox({name: expectedName});
          var $input = $element.find('input');
          assert.strictEqual($input.attr('name'), expectedName, 'the input "name" attribute has correct value');
        });
        QUnit.test('"name" attr should not be rendered if property is set to an empty string', function(assert) {
          var $element = $('#checkBox').dxCheckBox({name: ''});
          var $input = $element.find('input');
          assert.strictEqual($input.attr('name'), undefined, 'name attribute is not rendered');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#checkBox').dxCheckBox({});
          assert.strictEqual($element.attr('role'), 'checkbox', 'aria role is correct');
        });
        QUnit.test('aria checked attributes', function(assert) {
          var $element = $('#checkBox').dxCheckBox({value: true});
          var instance = $element.dxCheckBox('instance');
          assert.strictEqual($element.attr('aria-checked'), 'true', 'checked state is correct');
          instance.option('value', false);
          assert.strictEqual($element.attr('aria-checked'), 'false', 'unchecked state is correct');
          instance.option('value', undefined);
          assert.strictEqual($element.attr('aria-checked'), 'mixed', 'mixed state is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/check_box","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/check_box"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=checkbox.markup.tests.js.map