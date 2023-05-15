!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/numberBoxParts/mask.caret.tests.js"], ["ui/number_box/number_box.caret"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/numberBoxParts/mask.caret.tests.js", ["ui/number_box/number_box.caret"], function($__export) {
  "use strict";
  var maskCaret;
  return {
    setters: [function($__m) {
      maskCaret = $__m.default;
    }],
    execute: function() {
      QUnit.module('format caret', function() {
        var customFormat = {
          formatter: function(value) {
            return (value + " mil");
          },
          parser: function(text) {
            return parseFloat(text);
          }
        };
        QUnit.test('getCaretWithOffset', function(assert) {
          assert.deepEqual(maskCaret.getCaretWithOffset({
            start: 1,
            end: 2
          }, 5), {
            start: 6,
            end: 7
          });
          assert.deepEqual(maskCaret.getCaretWithOffset({
            start: 4,
            end: 6
          }, -2), {
            start: 2,
            end: 4
          });
          assert.deepEqual(maskCaret.getCaretWithOffset({
            start: 4,
            end: 6
          }, -2), {
            start: 2,
            end: 4
          });
          assert.deepEqual(maskCaret.getCaretWithOffset(5, 1), {
            start: 6,
            end: 6
          });
        });
        QUnit.test('getCaretBoundaries', function(assert) {
          assert.deepEqual(maskCaret.getCaretBoundaries('  #  1,230.45  #  ', ' \' # \' #,##0.## \' # \' '), {
            start: 5,
            end: 13
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('$ 123 tst', '$ #0 tst'), {
            start: 2,
            end: 5
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('-$ 123 tst', '$ #0 tst'), {
            start: 3,
            end: 6
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('(($ 123 tst))', '$ #0 tst;(($ #0 tst))'), {
            start: 4,
            end: 7
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('$ ', '$ #.##'), {
            start: 2,
            end: 2
          });
          assert.deepEqual(maskCaret.getCaretBoundaries(' kg', '#.## kg'), {
            start: 0,
            end: 0
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('$ 0.15 ts', '$ #,##0.## ts;($ #,##0.##) ts'), {
            start: 2,
            end: 6
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('$ 1 ts', '$ #,##0.## ts;($ #,##0.##) ts'), {
            start: 2,
            end: 3
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('($ 12,345) ts', '$ #,##0.## ts;($ #,##0.##) ts'), {
            start: 3,
            end: 9
          });
          assert.deepEqual(maskCaret.getCaretBoundaries('123 mil', customFormat), {
            start: 0,
            end: 7
          });
        });
        QUnit.test('getCaretInBoundaries', function(assert) {
          assert.deepEqual(maskCaret.getCaretInBoundaries({
            start: 1,
            end: 5
          }, '$ 123', '$ #'), {
            start: 2,
            end: 5
          });
          assert.deepEqual(maskCaret.getCaretInBoundaries({
            start: 1,
            end: 10
          }, '-$ 123 kg', '$ #.## kg'), {
            start: 3,
            end: 6
          });
        });
        QUnit.test('isCaretInBoundaries', function(assert) {
          assert.equal(maskCaret.isCaretInBoundaries(3, '$ 123 st', '$ #0 st'), true);
          assert.equal(maskCaret.isCaretInBoundaries(2, '$ 123 st', '$ #0 st'), true);
          assert.equal(maskCaret.isCaretInBoundaries(1, '$ 123 st', '$ #0 st'), false);
          assert.equal(maskCaret.isCaretInBoundaries(5, '$ 123 st', '$ #0 st'), true);
          assert.equal(maskCaret.isCaretInBoundaries(7, '$ 123 st', '$ #0 st'), false);
        });
        QUnit.test('getCaretAfterFormat with integer part', function(assert) {
          assert.deepEqual(maskCaret.getCaretAfterFormat('1234.15', '1,234.15', 2, '#,##0.##'), {
            start: 3,
            end: 3
          }, 'enter 3 after 2');
          assert.deepEqual(maskCaret.getCaretAfterFormat('(1234.15)', '(1,234.15)', 4, '#,##0.##;(#,##0.##)'), {
            start: 5,
            end: 5
          }, 'enter 3 after 2 in negative');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1,234.15', '<<1,234.15>>', 3, '#,##0.##;<<#,##0.##>>'), {
            start: 5,
            end: 5
          }, 'revert sign should save caret position');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1', '$ 1', 1, '$ #'), {
            start: 3,
            end: 3
          }, 'enter 1 in a blank field');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1,234', '134', 3, '#,##0.##'), {
            start: 1,
            end: 1
          }, 'remove 2 with delete');
          assert.deepEqual(maskCaret.getCaretAfterFormat(',234', '234', 0, '#,##0.##'), {
            start: 0,
            end: 0
          }, 'remove 1 with backspace');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1,234', '4', {
            start: 0,
            end: 4
          }, '#,##0.##'), {
            start: 0,
            end: 0
          }, 'select and remove some digits');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12534', '1534', 3, '0000'), {
            start: 2,
            end: 2
          }, 'enter 5 in the middle of decimal format');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12345', '2345', 5, '0000'), {
            start: 4,
            end: 4
          }, 'enter 5 in the end of decimal format');
          assert.deepEqual(maskCaret.getCaretAfterFormat('01 mil', '1 mil', 2, customFormat), {
            start: 1,
            end: 1
          }, 'enter 1 in the end of custom decimal format');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12 mil', '12 mil', 2, customFormat), {
            start: 2,
            end: 2
          }, 'enter 2 in the end of custom decimal format');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12534 mil', '12534 mil', 3, customFormat), {
            start: 3,
            end: 3
          }, 'enter 5 in the middle of custom decimal format');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12 mil', '12 mil', 2, customFormat), {
            start: 2,
            end: 2
          }, 'enter 2 in the end of custom decimal format');
        });
        QUnit.test('getCaretAfterFormat with float part', function(assert) {
          assert.deepEqual(maskCaret.getCaretAfterFormat('1234.00', '1,234', 6, '#,##0.##'), {
            start: 5,
            end: 5
          }, 'cut zeros in the end');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.423', '1.42', 3, '#0.00'), {
            start: 3,
            end: 3
          }, 'enter 4 in the start');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.243', '1.24', 4, '#0.00'), {
            start: 4,
            end: 4
          }, 'enter 4 in the middle');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.234', '1.23', 5, '#0.00'), {
            start: 4,
            end: 4
          }, 'enter 4 in the end');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.23', '1.230', 4, '#0.000'), {
            start: 4,
            end: 4
          }, 'remove 4 with backspace');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.24', '1.240', 3, '#0.000'), {
            start: 3,
            end: 3
          }, 'remove 3 with backspace');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.34', '1.30', 2, '#0.000'), {
            start: 2,
            end: 2
          }, 'remove 2 with backspace');
          assert.deepEqual(maskCaret.getCaretAfterFormat('1.0000 kg', '1 kg', 6, '#0.### kg'), {
            start: 1,
            end: 1
          }, 'remove 2 with backspace');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12.34 mil', '12.34 mil', 2, customFormat), {
            start: 2,
            end: 2
          }, 'enter 2 before separator');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12.34 mil', '12.34 mil', 4, customFormat), {
            start: 4,
            end: 4
          }, 'enter 3 after separator');
          assert.deepEqual(maskCaret.getCaretAfterFormat('12.34 mil', '12.34 mil', 5, customFormat), {
            start: 5,
            end: 5
          }, 'enter 4 in the the end of expression');
          assert.deepEqual(maskCaret.getCaretAfterFormat('. 1.50', '. 1.350', 5, '\'.\' 0.00'), {
            start: 5,
            end: 5
          }, 'enter 3 after separator');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/number_box/number_box.caret"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/number_box/number_box.caret"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mask.caret.tests.js.map