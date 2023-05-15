!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/numberbox.format.tests.js"], ["jquery","../../helpers/keyboardMock.js","localization/number","localization","ui/number_box","ui/text_box/ui.text_editor"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/numberbox.format.tests.js", ["jquery", "../../helpers/keyboardMock.js", "localization/number", "localization", "ui/number_box", "ui/text_box/ui.text_editor"], function($__export) {
  "use strict";
  var $,
      keyboardMock,
      numberLocalization,
      localization,
      CARET_TIMEOUT_DURATION,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      numberLocalization = $__m.default;
    }, function($__m) {
      localization = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="numberbox"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      CARET_TIMEOUT_DURATION = 0;
      moduleConfig = {
        beforeEach: function() {
          this.$element = $('#numberbox').dxNumberBox({useMaskBehavior: true});
          this.clock = sinon.useFakeTimers();
          this.$input = this.$element.find('.dx-texteditor-input');
          this.instance = this.$element.dxNumberBox('instance');
          this.keyboard = keyboardMock(this.$input, true);
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('format: point and comma button', moduleConfig, function() {
        [{
          locale: 'en',
          expectedSeparator: '.'
        }, {
          locale: 'de',
          expectedSeparator: ','
        }, {
          locale: 'ja',
          expectedSeparator: '.'
        }, {
          locale: 'ru',
          expectedSeparator: ','
        }, {
          locale: 'zh',
          expectedSeparator: '.'
        }, {
          locale: 'hr',
          expectedSeparator: ','
        }, {
          locale: 'el',
          expectedSeparator: ','
        }, {
          locale: 'ca',
          expectedSeparator: ','
        }, {
          locale: 'it',
          expectedSeparator: ','
        }].forEach(function($__3) {
          var $__4 = $__3,
              locale = $__4.locale,
              expectedSeparator = $__4.expectedSeparator;
          [',', '.'].forEach(function(separator) {
            QUnit.testInActiveWindow(("caret position after type '" + separator + "' key, locale(" + locale + ") with " + (expectedSeparator === '.' ? 'point' : 'comma') + " separator, format: '#,##0.00' (T1091149)"), function(assert) {
              var currentLocale = localization.locale();
              try {
                localization.locale(locale);
                assert.strictEqual(numberLocalization.getDecimalSeparator(), expectedSeparator, 'separator');
                this.instance.option({
                  format: '#,##0.00',
                  value: 0
                });
                this.$input.focus();
                this.clock.tick(CARET_TIMEOUT_DURATION);
                this.keyboard.type('15');
                assert.deepEqual(this.keyboard.caret(), {
                  end: 2,
                  start: 2
                }, 'caret position after type integer part');
                this.keyboard.type(separator);
                assert.deepEqual(this.keyboard.caret(), {
                  end: 3,
                  start: 3
                }, 'caret position after type decimal separator');
                this.keyboard.type('20');
                assert.deepEqual(this.keyboard.caret(), {
                  end: 5,
                  start: 5
                }, 'caret position after type float part');
              } finally {
                localization.locale(currentLocale);
              }
            });
          });
        });
      });
      QUnit.module('percent', moduleConfig, function() {
        [{
          text: '0.04',
          value: 0.00035,
          format: '#0.00%'
        }, {
          text: '0.0350',
          value: 0.00035,
          format: '#0.0000%'
        }, {
          text: '0.14',
          value: 0.00135,
          format: '#0.00%'
        }, {
          text: '0.4',
          value: 0.0035,
          format: '#0.0%'
        }, {
          text: '0.35',
          value: 0.0035,
          format: '#0.00%'
        }, {
          text: '1.4',
          value: 0.0135,
          format: '#0.0%'
        }, {
          text: '0.005',
          value: 0.000049999,
          format: '#0.000%'
        }, {
          text: '0.004',
          value: 0.0000444999,
          format: '#0.000%'
        }, {
          text: '1.2962',
          value: 0.01296249,
          format: '#0.0000%'
        }, {
          text: '1.2963',
          value: 0.0129625,
          format: '#0.0000%'
        }, {
          text: '1.2962',
          value: 0.01296249999,
          format: '#0.0000%'
        }, {
          text: '4.654',
          value: 0.046544999,
          format: '#0.000%'
        }, {
          text: '-4.654',
          value: -0.046544999,
          format: '#0.000%'
        }, {
          text: '4.65',
          value: 0.04645,
          format: '#0.00%'
        }, {
          text: '-4.65',
          value: -0.04645,
          format: '#0.00%'
        }, {
          text: '4.6',
          value: 0.04645,
          format: '#0.0%'
        }, {
          text: '5',
          value: 0.04645,
          format: '#0%'
        }, {
          text: '-35.86',
          value: -0.35855,
          format: '#0.00%'
        }, {
          text: '1.2962',
          value: 0.01296249,
          format: '#0.0000%'
        }, {
          text: '-1.2962',
          value: -0.01296249,
          format: '#0.0000%'
        }, {
          text: '10.004',
          value: 0.100035,
          format: '#0.000%'
        }, {
          text: '43.104',
          value: 0.431035,
          format: '#0.000%'
        }, {
          text: '43.105',
          value: 0.431045,
          format: '#0.000%'
        }, {
          text: '0.004',
          value: 0.000035,
          format: '#0.000%'
        }, {
          text: '-0.004',
          value: -0.000035,
          format: '#0.000%'
        }, {
          text: '0.0036',
          value: 0.000035521,
          format: '#0.0000%'
        }, {
          text: '0.00356',
          value: 0.000035559,
          format: '#0.00000%'
        }, {
          text: '0.0035',
          value: 0.000035499,
          format: '#0.0000%'
        }].forEach(function($__3) {
          var $__4 = $__3,
              text = $__4.text,
              value = $__4.value,
              format = $__4.format;
          QUnit.test(("percent format should correctly handle float values, value: " + value + ", format: " + format + " (T1093736)"), function(assert) {
            this.instance.option({
              format: format,
              value: value
            });
            assert.strictEqual(this.$input.val(), (text + "%"), 'text is correct');
            assert.strictEqual(this.instance.option('value'), value, 'value is correct');
          });
        });
      });
      QUnit.module('exponential format', moduleConfig, function() {
        [{
          value: 1,
          text: '1.0E+0'
        }, {
          value: 0,
          text: '0.0E+0'
        }, {
          value: 11,
          text: '1.1E+1'
        }, {
          value: 11111111111,
          text: '1.1E+10'
        }, {
          value: 10000000000,
          text: '1.0E+10'
        }, {
          value: -10000000000,
          text: '-1.0E+10'
        }, {
          value: 0.0000000001,
          text: '1.0E-10'
        }, {
          value: -0.0000000001,
          text: '-1.0E-10'
        }].forEach(function($__3) {
          var $__4 = $__3,
              text = $__4.text,
              value = $__4.value;
          QUnit.test(("should correctly handle value, value: " + value + " (T1105915)"), function(assert) {
            this.instance.option({
              value: value,
              format: 'exponential'
            });
            assert.strictEqual(this.$input.val(), text, 'text is correct');
            assert.strictEqual(this.instance.option('value'), value, 'value is correct');
          });
        });
        [{
          value: 1,
          text: '1.00000E+0',
          precision: 5
        }, {
          value: 12345000000,
          text: '1.23450E+10',
          precision: 5
        }, {
          value: -12345000000,
          text: '-1.23E+10',
          precision: 2
        }, {
          value: 0.00000000012345,
          text: '1.23450E-10',
          precision: 5
        }, {
          value: -0.00000000012345,
          text: '-1E-10',
          precision: 0
        }].forEach(function($__3) {
          var $__4 = $__3,
              text = $__4.text,
              value = $__4.value,
              precision = $__4.precision;
          QUnit.test(("should correctly handle value if precision is specified, value: " + value + ", precision: " + precision), function(assert) {
            this.instance.option({
              value: value,
              format: {
                type: 'exponential',
                precision: precision
              }
            });
            assert.strictEqual(this.$input.val(), text, 'text is correct');
            assert.strictEqual(this.instance.option('value'), value, 'value is correct');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/keyboardMock.js","localization/number","localization","ui/number_box","ui/text_box/ui.text_editor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/keyboardMock.js"), require("localization/number"), require("localization"), require("ui/number_box"), require("ui/text_box/ui.text_editor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=numberbox.format.tests.js.map