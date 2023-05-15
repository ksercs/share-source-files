!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/textbox.markup.tests.js"], ["jquery","core/devices","ui/text_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/textbox.markup.tests.js", ["jquery", "core/devices", "ui/text_box"], function($__export) {
  "use strict";
  var $,
      devices,
      TEXTBOX_CLASS,
      INPUT_CLASS,
      CONTAINER_CLASS,
      PLACEHOLDER_CLASS,
      SEARCHBOX_CLASS,
      SEARCH_ICON_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="textbox"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      TEXTBOX_CLASS = 'dx-textbox';
      INPUT_CLASS = 'dx-texteditor-input';
      CONTAINER_CLASS = 'dx-texteditor-container';
      PLACEHOLDER_CLASS = 'dx-placeholder';
      SEARCHBOX_CLASS = 'dx-searchbox';
      SEARCH_ICON_CLASS = 'dx-icon-search';
      QUnit.module('markup', function() {
        QUnit.test('markup init', function(assert) {
          assert.expect(5);
          var element = $('#textbox').dxTextBox();
          assert.ok(element.hasClass(TEXTBOX_CLASS));
          assert.equal(element.children().length, 1);
          assert.equal(element.find('.' + PLACEHOLDER_CLASS).length, 1);
          assert.equal(element.find('.' + INPUT_CLASS).length, 1);
          assert.equal(element.find('.' + CONTAINER_CLASS).length, 1);
        });
        QUnit.test('init with options', function(assert) {
          assert.expect(4);
          var element = $('#textbox').dxTextBox({
            value: 'custom',
            mode: 'search',
            placeholder: 'enter value',
            readOnly: true
          });
          var input = element.find('.' + INPUT_CLASS);
          assert.equal(input.val(), 'custom');
          assert.equal(input.attr('type'), 'text');
          assert.equal(element.find('.' + PLACEHOLDER_CLASS).attr('data-dx_placeholder'), 'enter value');
          assert.equal(input.prop('readOnly'), true);
        });
        QUnit.test('\'maxLength\' option', function(assert) {
          var originalDevices = devices.real();
          devices.real({
            platform: 'not android and not ie',
            version: ['32']
          });
          try {
            var element = $('#textbox').dxTextBox({maxLength: '5'});
            var input = element.find('.' + INPUT_CLASS);
            assert.equal(input.attr('maxLength'), '5');
          } finally {
            devices.real(originalDevices);
          }
        });
        QUnit.test('set width via constructor', function(assert) {
          var $element = $('#textbox').dxTextBox({width: 400});
          var elementStyles = $element.get(0).style;
          assert.strictEqual(elementStyles.width, '400px', '\'width\' style of the element must be equal to custom width');
        });
        QUnit.test('textBox with the \'seach\' mode should render the search icon', function(assert) {
          var element = $('#textbox').dxTextBox({mode: 'search'});
          assert.ok(element.has(SEARCHBOX_CLASS));
          assert.equal(element.find('.' + SEARCH_ICON_CLASS).length, 1);
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#textbox').dxTextBox();
          assert.equal($element.find('.dx-texteditor-input').attr('role'), 'textbox', 'aria role is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","ui/text_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("ui/text_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=textbox.markup.tests.js.map