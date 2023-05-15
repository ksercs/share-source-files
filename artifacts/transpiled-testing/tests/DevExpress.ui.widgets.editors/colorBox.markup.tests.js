!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/colorBox.markup.tests.js"], ["jquery","animation/fx","ui/color_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/colorBox.markup.tests.js", ["jquery", "animation/fx", "ui/color_box"], function($__export) {
  "use strict";
  var $,
      fx,
      COLOR_BOX_CLASS,
      COLOR_BOX_INPUT_CLASS,
      COLOR_BOX_INPUT_CONTAINER_CLASS,
      COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS,
      COLOR_BOX_COLOR_IS_NOT_DEFINED,
      showColorBox;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="color-box"></div>';
        $('#qunit-fixture').addClass('dx-viewport').html(markup);
      });
      COLOR_BOX_CLASS = 'dx-colorbox';
      COLOR_BOX_INPUT_CLASS = COLOR_BOX_CLASS + '-input';
      COLOR_BOX_INPUT_CONTAINER_CLASS = COLOR_BOX_INPUT_CLASS + '-container';
      COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = COLOR_BOX_CLASS + '-color-result-preview';
      COLOR_BOX_COLOR_IS_NOT_DEFINED = COLOR_BOX_CLASS + '-color-is-not-defined';
      showColorBox = function(options) {
        return this.element.dxColorBox(options);
      };
      QUnit.module('ColorBox', {
        beforeEach: function() {
          fx.off = true;
          this.element = $('#color-box');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Apply css class', function(assert) {
          var $colorBox = showColorBox.call(this);
          assert.ok($colorBox.hasClass(COLOR_BOX_CLASS));
        });
        QUnit.test('Render color input', function(assert) {
          var $colorBox = showColorBox.call(this);
          var $input = $colorBox.find('.' + COLOR_BOX_INPUT_CLASS);
          assert.equal($input.length, 1);
          assert.ok($input.closest('.' + COLOR_BOX_INPUT_CONTAINER_CLASS).length);
        });
        QUnit.test('Default value should be \'null\'', function(assert) {
          var colorBox = showColorBox.call(this).dxColorBox('instance');
          assert.strictEqual(colorBox.option('value'), null);
        });
        QUnit.test('Render with hex value', function(assert) {
          var $colorBox = showColorBox.call(this, {value: '#000000'});
          var $input = $colorBox.find('.' + COLOR_BOX_INPUT_CLASS);
          assert.equal($input.val(), '#000000');
        });
        QUnit.test('Render in rgba mode', function(assert) {
          var $colorBox = showColorBox.call(this, {
            value: '#ff0000',
            editAlphaChannel: true
          });
          var $input = $colorBox.find('.' + COLOR_BOX_INPUT_CLASS);
          assert.equal($input.val(), 'rgba(255, 0, 0, 1)');
        });
        QUnit.test('Render color result preview', function(assert) {
          var $colorBox = this.element.dxColorBox();
          var $colorPreview = $colorBox.find('.' + COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS);
          assert.equal($colorPreview.length, 1);
        });
        QUnit.test('If default value is \'null\' color result preview should have a special css class', function(assert) {
          var $colorBox = this.element.dxColorBox();
          var $colorInputContainer = $colorBox.find('.' + COLOR_BOX_INPUT_CONTAINER_CLASS);
          assert.ok($colorInputContainer.hasClass(COLOR_BOX_COLOR_IS_NOT_DEFINED));
        });
        QUnit.test('colorbox should work with deferRendering: false', function(assert) {
          assert.expect(0);
          $('#color-box').dxColorBox({deferRendering: false});
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/color_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/color_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=colorBox.markup.tests.js.map