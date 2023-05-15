!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.intl.widgets.tests.js"], ["node_modules/intl/index.js","localization/number","localization/core","jquery","ui/date_box","exporter/exceljs/export_format","localization/date","../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.localization/localization.intl.widgets.tests.js", ["node_modules/intl/index.js", "localization/number", "localization/core", "jquery", "ui/date_box", "exporter/exceljs/export_format", "localization/date", "../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var locale,
      $,
      ExportFormat,
      dateLocalization,
      keyboardMock,
      TEXTEDITOR_INPUT_SELECTOR,
      commonEnvironment;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      locale = $__m.locale;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      ExportFormat = $__m.ExportFormat;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
      commonEnvironment = {
        beforeEach: function() {
          var markup = '<div id="dateBox"></div>';
          $('#qunit-fixture').append(markup);
        },
        afterEach: function() {
          $('#qunit-fixture').empty();
        }
      };
      QUnit.module('Intl localization', function() {
        QUnit.module('DateBox', commonEnvironment, function() {
          QUnit.test('DateBox should not raise error when digits are true arabic digits (T851630)', function(assert) {
            var currentLocale = locale();
            try {
              locale('ar-u-nu-arab');
              var $dateBox = $('#dateBox').dxDateBox({
                value: new Date(2015, 10, 10),
                type: 'date',
                pickerType: 'calendar',
                useMaskBehavior: true,
                opened: true
              });
              var $input = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR);
              var keyboard = keyboardMock($input);
              keyboard.press('right').press('enter');
              var date = $input.val();
              assert.equal(date, '١١/١١/٢٠١٥', 'date is localized');
            } catch (e) {
              assert.ok(false, 'Error occured: ' + e.message);
            } finally {
              locale(currentLocale);
            }
          });
          ['h:mm aaa', 'h:mm aaaa', 'h:mm aaaaa'].forEach(function(displayFormat) {
            QUnit.test(("DateBox should not raise error when displayFormat=\"" + displayFormat + "\" and arabic locale is used"), function(assert) {
              var currentLocale = locale();
              try {
                locale('ar-u-nu-arab');
                var $dateBox = $('#dateBox').dxDateBox({
                  value: new Date(2015, 10, 10),
                  displayFormat: displayFormat,
                  type: 'time',
                  pickerType: 'calendar',
                  useMaskBehavior: true
                });
                var $input = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR);
                var date = $input.val();
                assert.strictEqual(date, '١٢:٠٠ ص', 'date is localized');
              } catch (e) {
                assert.ok(false, 'Error occured: ' + e.message);
              } finally {
                locale(currentLocale);
              }
            });
          });
          QUnit.test('DateBox should not raise error when digits are Farsi digits (T867867)', function(assert) {
            var currentLocale = locale();
            try {
              locale('fa-u-ca-gregory');
              var $dateBox = $('#dateBox').dxDateBox({
                value: new Date(2015, 10, 10),
                type: 'date',
                pickerType: 'calendar',
                useMaskBehavior: true
              });
              var $input = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR);
              var keyboard = keyboardMock($input);
              keyboard.press('up').press('enter');
              var date = $input.val();
              assert.strictEqual(date, '۲۰۱۶/۱۱/۱۰', 'date is localized');
            } catch (e) {
              assert.ok(false, 'Error occured: ' + e.message);
            } finally {
              locale(currentLocale);
            }
          });
          QUnit.test('DateBox should not raise error when digits are Marathi digits (T867867)', function(assert) {
            var currentLocale = locale();
            try {
              locale('mr');
              var $dateBox = $('#dateBox').dxDateBox({
                value: new Date(2015, 10, 10),
                type: 'date',
                pickerType: 'calendar',
                useMaskBehavior: true,
                opened: true
              });
              var $input = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR);
              var keyboard = keyboardMock($input);
              keyboard.press('right').press('enter');
              var date = $input.val();
              assert.equal(date, '११/११/२०१५', 'date is localized');
            } catch (e) {
              assert.ok(false, 'Error occured: ' + e.message);
            } finally {
              locale(currentLocale);
            }
          });
          QUnit.test('DateBox should not raise error when digits are not default arabic digits and Fractional Seconds in the "displayFormat"', function(assert) {
            var currentLocale = locale();
            try {
              locale('mr');
              var dateBox = $('#dateBox').dxDateBox({
                value: new Date('2014-09-08T08:02:17.12'),
                type: 'date',
                pickerType: 'calendar',
                useMaskBehavior: true,
                displayFormat: 'HH:mm:ss.SS'
              }).dxDateBox('instance');
              assert.strictEqual(dateBox.option('text'), '०८:०२:१७.१२', 'date is localized');
            } catch (e) {
              assert.ok(false, ("Error occured: " + e.message));
            } finally {
              locale(currentLocale);
            }
          });
        });
      });
      QUnit.module('Excel creator', commonEnvironment, function() {
        QUnit.test('Arabic data convert', function(assert) {
          var originalCulture = locale();
          try {
            locale('ar-u-nu-arab');
            var convertDate = function(formatter) {
              return ExportFormat.convertFormat(formatter, null, 'date');
            };
            var pattern = '[$-2010000]d\\/M\\/yyyy';
            var formatter = function(value) {
              return dateLocalization.format(value, 'shortdate');
            };
            assert.strictEqual(convertDate(formatter), pattern, ("Pattern: \"" + pattern + "\" Example:\"" + formatter(new Date()) + "\""));
          } finally {
            locale(originalCulture);
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["intl","localization/number","localization/core","jquery","ui/date_box","exporter/exceljs/export_format","localization/date","../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("intl"), require("localization/number"), require("localization/core"), require("jquery"), require("ui/date_box"), require("exporter/exceljs/export_format"), require("localization/date"), require("../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.intl.widgets.tests.js.map