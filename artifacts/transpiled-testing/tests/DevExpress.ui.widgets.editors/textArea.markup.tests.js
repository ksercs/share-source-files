!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/textArea.markup.tests.js"], ["jquery","generic_light.css!","ui/text_area"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/textArea.markup.tests.js", ["jquery", "generic_light.css!", "ui/text_area"], function($__export) {
  "use strict";
  var $,
      TEXTAREA_CLASS,
      INPUT_CLASS,
      CONTAINER_CLASS,
      PLACEHOLDER_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="textarea"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      TEXTAREA_CLASS = 'dx-textarea';
      INPUT_CLASS = 'dx-texteditor-input';
      CONTAINER_CLASS = 'dx-texteditor-container';
      PLACEHOLDER_CLASS = 'dx-placeholder';
      QUnit.module('rendering', function() {
        QUnit.test('markup init', function(assert) {
          assert.expect(5);
          var $element = $('#textarea').dxTextArea();
          assert.ok($element.hasClass(TEXTAREA_CLASS));
          assert.equal($element.children().length, 1);
          assert.equal($element.find('.' + PLACEHOLDER_CLASS).length, 1);
          assert.equal($element.find('.' + INPUT_CLASS).length, 1);
          assert.equal($element.find('.' + CONTAINER_CLASS).length, 1);
        });
        QUnit.test('init with options', function(assert) {
          assert.expect(3);
          var $element = $('#textarea').dxTextArea({
            value: 'custom',
            placeholder: 'enter value',
            required: true,
            readOnly: true
          });
          var $input = $element.find('.' + INPUT_CLASS);
          assert.equal($input.val(), 'custom');
          assert.equal($input.prop('placeholder') || $element.find('.' + PLACEHOLDER_CLASS).attr('data-dx_placeholder'), 'enter value');
          assert.equal($input.prop('readOnly'), true);
        });
      });
      QUnit.module('init properties', function() {
        QUnit.test('disabled', function(assert) {
          var $element = $('#textarea').dxTextArea({disabled: true});
          var $input = $element.find('.' + INPUT_CLASS);
          assert.ok($input.prop('disabled'));
        });
        QUnit.test('placeholder', function(assert) {
          var $element = $('#textarea').dxTextArea({placeholder: 'John Doe'});
          assert.equal($element.find('.' + INPUT_CLASS).prop('placeholder') || $element.find('.' + PLACEHOLDER_CLASS).attr('data-dx_placeholder'), 'John Doe');
        });
        QUnit.test('inputAttr', function(assert) {
          var $textArea = $('#textarea').dxTextArea({inputAttr: {id: 'testId'}});
          var $input = $textArea.find('.' + INPUT_CLASS);
          assert.equal($input.attr('id'), 'testId', 'Attr ID was created on Init');
        });
        QUnit.test('the \'inputAttr\' option should preserve widget specific classes', function(assert) {
          var $textArea = $('#textarea').dxTextArea({inputAttr: {class: 'some-class'}});
          assert.equal($textArea.find('.' + INPUT_CLASS).length, 1, 'widget specific class is preserved');
        });
        QUnit.test('readOnly', function(assert) {
          var $element = $('#textarea').dxTextArea({readOnly: true});
          var $input = $element.find('.' + INPUT_CLASS);
          assert.ok($input.prop('readOnly'));
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('constructor', function(assert) {
          var $element = $('#textarea').dxTextArea({width: 400});
          var elementStyles = $element.get(0).style;
          assert.strictEqual(elementStyles.width, '400px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('the \'minHeight\' option works correctly', function(assert) {
          var $element = $('#textarea').dxTextArea({
            minHeight: 30,
            height: 0
          });
          var elementStyles = $element.get(0).style;
          assert.equal(elementStyles.minHeight, '30px', 'widget min-height is correct');
        });
        QUnit.test('the \'maxHeight\' option works correctly', function(assert) {
          var $element = $('#textarea').dxTextArea({
            maxHeight: 30,
            height: 100
          });
          var elementStyles = $element.get(0).style;
          assert.equal(elementStyles.maxHeight, '30px', 'widget max-height is correct');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria multiline attribute', function(assert) {
          var $element = $('#textarea').dxTextArea();
          assert.equal($element.find('.dx-texteditor-input').attr('aria-multiline'), 'true', 'aria multiline is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/text_area"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/text_area"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=textArea.markup.tests.js.map