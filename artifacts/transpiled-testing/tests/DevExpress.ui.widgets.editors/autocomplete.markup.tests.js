!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/autocomplete.markup.tests.js"], ["jquery","../../helpers/keyboardMock.js","ui/autocomplete"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/autocomplete.markup.tests.js", ["jquery", "../../helpers/keyboardMock.js", "ui/autocomplete"], function($__export) {
  "use strict";
  var $,
      keyboardMock,
      WIDGET_CLASS,
      TEXTEDITOR_CLASS,
      TEXTEDITOR_INPUT_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture" class="dx-viewport">\
            <div id="widget"></div>\
            <div id="widthRootStyle"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      WIDGET_CLASS = 'dx-autocomplete';
      TEXTEDITOR_CLASS = 'dx-texteditor';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      QUnit.module('dxAutocomplete', {beforeEach: function() {
          this.element = $('#widget').dxAutocomplete({
            value: 'text',
            dataSource: ['item 1', 'item 2', 'item 3']
          });
          this.instance = this.element.dxAutocomplete('instance');
        }}, function() {
        QUnit.test('markup init', function(assert) {
          var element = this.element;
          assert.ok(element.hasClass(WIDGET_CLASS), 'Element has ' + WIDGET_CLASS + ' class');
          assert.ok(element.hasClass(TEXTEDITOR_CLASS), 'Element has ' + TEXTEDITOR_CLASS + ' class');
        });
        QUnit.test('init with options', function(assert) {
          var element = $('#widget').dxAutocomplete({
            value: 'anotherText',
            placeholder: 'type something'
          });
          var instance = element.dxAutocomplete('instance');
          assert.equal(instance.option('value'), 'anotherText', 'autocomplete-s textbox value initialization');
          assert.equal(instance.option('placeholder'), instance.option('placeholder'), 'autocomplete-s successful placeholder initialization');
          instance.option('placeholder', 'abcde');
          assert.equal(instance.option('placeholder'), 'abcde', 'when we change autocomplete-s placeholder, we change textbox-s placeholder');
        });
        QUnit.test('change autocomplete\'s textbox value', function(assert) {
          this.instance.option('value', 'new value');
          assert.equal(this.instance.option('value'), 'new value');
          this.instance.option('value', 'newest value');
          assert.equal(this.instance.option('value'), 'newest value');
        });
        QUnit.test('maxLength', function(assert) {
          this.instance.option('maxLength', 5);
          assert.equal(this.instance.option('maxLength'), 5);
          this.instance.option('maxLength', 3);
          assert.equal(this.instance.option('maxLength'), 3);
        });
        QUnit.test('input should be empty when value is empty', function(assert) {
          var $autocomplete = $('#widget').dxAutocomplete({
            placeholder: 'test',
            value: ''
          });
          var $input = $autocomplete.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), '', 'input is empty');
        });
        QUnit.test('B251138 disabled', function(assert) {
          this.instance.option('disabled', true);
          assert.ok(this.instance.$element().hasClass('dx-state-disabled'), 'disabled state should be added to autocomplete itself');
          assert.ok(this.instance.option('disabled'), 'Disabled state should be propagated to texteditor');
          this.instance.option('disabled', false);
          assert.ok(!this.instance.$element().hasClass('dx-state-disabled'), 'disabled state should be removed from autocomplete itself');
          assert.ok(!this.instance.option('disabled'), 'Disabled state should be propagated to texteditor');
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxAutocomplete({width: 400});
          var instance = $element.dxAutocomplete('instance');
          var elementStyles = $element.get(0).style;
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual(elementStyles.width, '400px', 'width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxAutocomplete();
          var elementStyles = $element.get(0).style;
          assert.strictEqual(elementStyles.width, '300px', 'width of the element must be equal to custom width');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxAutocomplete();
          var element = $element.get(0);
          var instance = $element.dxAutocomplete('instance');
          instance.option('width', 400);
          assert.strictEqual(element.style.width, '400px', 'width of the element must be equal to custom width');
        });
      });
      QUnit.module('aria accessibility', {}, function() {
        QUnit.test('aria-autocomplete property', function(assert) {
          var $element = $('#widget').dxAutocomplete();
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS + ':first');
          assert.equal($input.attr('aria-autocomplete'), 'inline');
        });
        QUnit.test('aria role should not change to listbox after it\'s second rendering (T290859)', function(assert) {
          assert.expect(2);
          var $element = $('#widget').dxAutocomplete({
            searchEnabled: true,
            searchTimeout: 0,
            opened: true,
            items: ['item1', 'item2', 'item3']
          });
          var $input = $element.find(("." + TEXTEDITOR_INPUT_CLASS));
          assert.equal($input.attr('role'), 'combobox', 'aria role');
          var keyboard = keyboardMock($input);
          $input.focusin();
          keyboard.type('it');
          assert.equal($input.attr('role'), 'combobox', 'role was not changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/keyboardMock.js","ui/autocomplete"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/keyboardMock.js"), require("ui/autocomplete"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=autocomplete.markup.tests.js.map