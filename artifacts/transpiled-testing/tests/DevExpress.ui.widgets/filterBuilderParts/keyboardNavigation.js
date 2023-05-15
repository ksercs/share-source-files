!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/filterBuilderParts/keyboardNavigation.js"], ["jquery","../../../helpers/keyboardMock.js","../../../helpers/filterBuilderTestData.js","ui/filter_builder/filter_builder","./constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/filterBuilderParts/keyboardNavigation.js", ["jquery", "../../../helpers/keyboardMock.js", "../../../helpers/filterBuilderTestData.js", "ui/filter_builder/filter_builder", "./constants.js"], function($__export) {
  "use strict";
  var $,
      keyboardMock,
      fields,
      FILTER_BUILDER_ITEM_OPERATION_CLASS,
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS,
      TAB_KEY,
      ENTER_KEY,
      ESCAPE_KEY,
      DOWN_ARROW_KEY;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fields = $__m.default;
    }, function($__m) {}, function($__m) {
      FILTER_BUILDER_ITEM_OPERATION_CLASS = $__m.FILTER_BUILDER_ITEM_OPERATION_CLASS;
      FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = $__m.FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS;
    }],
    execute: function() {
      TAB_KEY = 'Tab';
      ENTER_KEY = 'Enter';
      ESCAPE_KEY = 'Escape';
      DOWN_ARROW_KEY = 'ArrowDown';
      QUnit.module('Keyboard navigation', {beforeEach: function() {
          this.container = $('#container');
          this.instance = this.container.dxFilterBuilder({
            value: [['State', '=', '']],
            fields: fields
          }).dxFilterBuilder('instance');
          this.getValueButtonElement = function() {
            return this.container.find('.' + FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS);
          };
          this.getOperationButtonElement = function() {
            return this.container.find('.' + FILTER_BUILDER_ITEM_OPERATION_CLASS);
          };
          this.getMenuElement = function() {
            return $('.dx-treeview');
          };
          this.getTextEditorElement = function() {
            return this.container.find('.dx-texteditor');
          };
          this.changeValueAndPressKey = function(key, eventType) {
            this.getValueButtonElement().trigger('dxclick');
            var textEditorElement = this.getTextEditorElement();
            textEditorElement.dxTextBox('instance').option('value', 'Test');
            keyboardMock(this.getTextEditorElement()).keyUp(key);
          };
          this.showTextEditor = function() {
            keyboardMock(this.getValueButtonElement()).keyUp(ENTER_KEY);
          };
          this.setFocusToBody = function() {
            if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body') {
              document.activeElement.blur();
            }
          };
        }}, function() {
        QUnit.test('show editor on keyup event', function(assert) {
          this.instance.option('value', ['Zipcode', '<>', 123]);
          this.showTextEditor();
          assert.notOk(this.getValueButtonElement().length);
          assert.ok(this.getTextEditorElement().length);
        });
        QUnit.test('keyup for enter key should not fired between compositionstart & compositionend events', function(assert) {
          this.instance.option('value', ['State', '<>', 'State']);
          this.showTextEditor();
          var textEditorElement = this.getTextEditorElement();
          textEditorElement.find('input').trigger('compositionstart');
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.ok(this.getTextEditorElement().length, 'skip keyup while composition');
          textEditorElement.find('input').trigger('compositionend');
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.ok(this.getTextEditorElement().length, 'skip first keyup after composition');
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.notOk(this.getTextEditorElement().length, 'keyup fired');
        });
        QUnit.test('keyup for enter key shouled fired after compositionend on safari', function(assert) {
          this.instance.option('value', ['State', '<>', 'State']);
          this.showTextEditor();
          var textEditorElement = this.getTextEditorElement();
          textEditorElement.find('input').trigger('compositionstart');
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.ok(this.getTextEditorElement().length, 'skip keyup while composition');
          textEditorElement.find('input').trigger('compositionend');
          keyboardMock(textEditorElement).keyDown(229);
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.ok(this.getTextEditorElement().length, 'wait for keydown != 229 after composition');
          keyboardMock(textEditorElement).keyUp(ENTER_KEY);
          assert.notOk(this.getTextEditorElement().length, 'keyup fired');
        });
        QUnit.test('enter keyup for value button and editor', function(assert) {
          this.instance.option('value', ['Zipcode', '<>', 123]);
          this.showTextEditor();
          assert.ok(this.getTextEditorElement().length);
          keyboardMock(this.getTextEditorElement()).keyUp(ENTER_KEY);
          assert.notOk(this.getTextEditorElement().length);
          assert.ok(this.getValueButtonElement().length);
        });
        QUnit.test('condition isn\'t changed after escape key press', function(assert) {
          var value = this.instance.option('value');
          this.changeValueAndPressKey(ESCAPE_KEY, 'keyup');
          assert.equal(this.instance.option('value'), value);
          assert.equal(this.getValueButtonElement().length, 1);
        });
        QUnit.test('change condition value after tab press', function(assert) {
          this.getValueButtonElement().trigger('dxclick');
          var textEditorElement = this.getTextEditorElement();
          textEditorElement.dxTextBox('instance').option('value', 'Test');
          this.setFocusToBody();
          keyboardMock(this.getTextEditorElement()).keyUp(TAB_KEY);
          assert.equal(this.getValueButtonElement().text(), 'Test');
        });
        QUnit.test('tab press without change a condition', function(assert) {
          this.getValueButtonElement().trigger('dxclick');
          this.setFocusToBody();
          keyboardMock(this.getTextEditorElement().find('input')).keyUp(TAB_KEY);
          assert.equal(this.getValueButtonElement().text(), '<enter a value>');
        });
        QUnit.test('change condition value after enter key press', function(assert) {
          var value = this.instance.option('value');
          this.changeValueAndPressKey(ENTER_KEY);
          assert.notEqual(this.instance.option('value'), value);
          assert.equal(this.getValueButtonElement().length, 1);
          value = this.instance.option('value');
          this.changeValueAndPressKey(ENTER_KEY);
          assert.equal(this.instance.option('value'), value);
          assert.equal(this.getValueButtonElement().length, 1);
        });
        QUnit.testInActiveWindow('value button gets focus after enter key press', function(assert) {
          this.changeValueAndPressKey(ENTER_KEY);
          assert.ok(this.getValueButtonElement().is(':focus'));
        });
        QUnit.testInActiveWindow('value button gets focus after escape key press', function(assert) {
          this.changeValueAndPressKey(ESCAPE_KEY);
          assert.ok(this.getValueButtonElement().is(':focus'));
        });
        QUnit.testInActiveWindow('menu has focus after open by enter key press', function(assert) {
          keyboardMock(this.getOperationButtonElement()).keyUp(ENTER_KEY);
          assert.ok(this.getMenuElement().is(':focus'));
        });
        QUnit.testInActiveWindow('close menu after escape key press', function(assert) {
          keyboardMock(this.getOperationButtonElement()).keyUp(ENTER_KEY);
          assert.ok(this.getMenuElement().is(':focus'));
          keyboardMock(this.getMenuElement()).keyUp(ESCAPE_KEY);
          assert.notOk(this.getMenuElement().length);
          assert.ok(this.getOperationButtonElement().is(':focus'));
        });
        QUnit.testInActiveWindow('select item in menu', function(assert) {
          keyboardMock(this.getOperationButtonElement()).keyUp(ENTER_KEY);
          var menuKeyboard = keyboardMock(this.getMenuElement());
          menuKeyboard.keyDown(DOWN_ARROW_KEY);
          assert.equal($('.dx-treeview-node.dx-state-focused').text(), 'Contains');
          menuKeyboard.keyDown(ENTER_KEY);
          menuKeyboard.keyUp(ENTER_KEY);
          assert.ok(this.getOperationButtonElement().is(':focus'));
          assert.equal(this.getOperationButtonElement().text(), 'Contains');
        });
        QUnit.testInActiveWindow('editor.value is changed after \'keyup\' and saved in filterBulder.value by outer click (T653968)', function(assert) {
          this.showTextEditor();
          var textEditorElement = this.getTextEditorElement();
          var textEditorInput = textEditorElement.find('input');
          var textEditorInstance = textEditorElement.dxTextBox('instance');
          textEditorInput.focus();
          textEditorInput.val('Test');
          assert.equal(textEditorInput.val(), 'Test');
          assert.equal(textEditorInstance.option('value'), '');
          $('body').trigger('dxpointerdown');
          assert.deepEqual(this.instance.option('value'), ['State', '=', 'Test']);
          assert.equal(textEditorInstance.option('value'), 'Test');
          assert.equal(textEditorInput.val(), 'Test');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/keyboardMock.js","../../../helpers/filterBuilderTestData.js","ui/filter_builder/filter_builder","./constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/keyboardMock.js"), require("../../../helpers/filterBuilderTestData.js"), require("ui/filter_builder/filter_builder"), require("./constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.js.map