!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.intl.tests.js"], ["../../helpers/noIntl.js","node_modules/intl/index.js","./sharedParts/localization.shared.js","localization/date","localization/number","localization/intl/date","localization/intl/number","localization/core","localization","core/config","../DevExpress.exporter/exceljsParts/exceljs.format.tests.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.localization/localization.intl.tests.js", ["../../helpers/noIntl.js", "node_modules/intl/index.js", "./sharedParts/localization.shared.js", "localization/date", "localization/number", "localization/intl/date", "localization/intl/number", "localization/core", "localization", "core/config", "../DevExpress.exporter/exceljsParts/exceljs.format.tests.js"], function($__export) {
  "use strict";
  var Intl,
      sharedTests,
      dateLocalization,
      numberLocalization,
      intlDateLocalization,
      intlNumberLocalization,
      locale,
      disableIntl,
      config,
      ExcelJSLocalizationFormatTests,
      SYMBOLS_TO_REMOVE_REGEX,
      ROUNDING_BUG_NUMBERS,
      ROUNDING_CORRECTION,
      patchPolyfillResults;
  return {
    setters: [function($__m) {}, function($__m) {
      Intl = $__m.default;
    }, function($__m) {
      sharedTests = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      numberLocalization = $__m.default;
    }, function($__m) {
      intlDateLocalization = $__m.default;
    }, function($__m) {
      intlNumberLocalization = $__m.default;
    }, function($__m) {
      locale = $__m.locale;
    }, function($__m) {
      disableIntl = $__m.disableIntl;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      ExcelJSLocalizationFormatTests = $__m.default;
    }],
    execute: function() {
      if (Intl.__disableRegExpRestore) {
        Intl.__disableRegExpRestore();
      }
      SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
      ROUNDING_BUG_NUMBERS = [4.645, -4.645, 35.855, -35.855];
      ROUNDING_CORRECTION = {
        '4.64': '4.65',
        '-4.64': '-4.65',
        '35.85': '35.86',
        '-35.85': '-35.86'
      };
      patchPolyfillResults = function() {
        dateLocalization.inject({format: function(value, format) {
            var result = this.callBase.apply(this, arguments);
            if (typeof result === 'string') {
              result = result && result.replace(' at ', ', ');
            }
            return result;
          }});
        numberLocalization.inject({format: function(value, format) {
            var result = this.callBase.apply(this, arguments);
            if (ROUNDING_BUG_NUMBERS.indexOf(value) !== -1 && format.type === 'fixedPoint' && format.precision === 2 && !!ROUNDING_CORRECTION[result]) {
              result = ROUNDING_CORRECTION[result];
            }
            return result;
          }});
      };
      QUnit.module('Intl localization', {before: patchPolyfillResults}, function() {
        sharedTests();
        QUnit.test('engine', function(assert) {
          assert.equal(numberLocalization.engine(), 'intl');
          assert.equal(dateLocalization.engine(), 'intl');
        });
        var locales = ['de', 'en', 'ja', 'ru', 'zh', 'ar', 'hr', 'el', 'ca'];
        locales.forEach(function(localeId) {
          var getIntlNumberFormatter = function(format) {
            return (new Intl.NumberFormat(localeId, format)).format;
          };
          var localizeDigits = function(string) {
            return string && string.split('').map(function(sign) {
              if (/[0-9]/.test(sign)) {
                return getIntlNumberFormatter()(Number(sign));
              }
              return sign;
            }).join('');
          };
          var getIntlDateFormatter = function(format) {
            return function(date) {
              return (new Intl.DateTimeFormat(localeId, format)).format(date).replace(SYMBOLS_TO_REMOVE_REGEX, '').replace(' at ', ', ');
            };
          };
          QUnit.module('number - ' + localeId, {
            beforeEach: function() {
              locale(localeId);
            },
            afterEach: function() {
              locale('en');
            }
          }, function() {
            QUnit.test('format', function(assert) {
              var separators = {
                de: ',',
                ru: ',',
                ar: '٫',
                hr: ',',
                el: ',',
                ca: ',',
                default: '.'
              };
              var separator = separators[localeId] || separators.default;
              function getLocalizedFixedNumber(integerPart, fractionPart) {
                return localizeDigits(integerPart + separator + fractionPart);
              }
              var assertData = [{
                value: 43789,
                format: 'decimal',
                intlFormat: {
                  maximumFractionDigits: 0,
                  minimumIntegerDigits: 1,
                  round: 'floor',
                  useGrouping: false
                }
              }, {
                value: 437,
                format: {type: 'decimal'},
                expected: localizeDigits('437')
              }, {
                value: 437,
                format: {
                  type: 'decimal',
                  precision: 5
                },
                expected: localizeDigits('00437')
              }, {
                value: 2,
                format: {
                  type: 'decimal',
                  precision: 2
                },
                expected: localizeDigits('02')
              }, {
                value: 12,
                format: {
                  type: 'decimal',
                  precision: 2
                },
                expected: localizeDigits('12')
              }, {
                value: 2,
                format: {
                  type: 'decimal',
                  precision: 3
                },
                expected: localizeDigits('002')
              }, {
                value: 12,
                format: {
                  type: 'decimal',
                  precision: 3
                },
                expected: localizeDigits('012')
              }, {
                value: 123,
                format: {
                  type: 'decimal',
                  precision: 3
                },
                expected: localizeDigits('123')
              }, {
                value: 1.9999999999999,
                format: {type: 'decimal'},
                expected: getLocalizedFixedNumber(1, 9999999999999)
              }, {
                value: 12.345,
                format: 'fixedPoint',
                expected: localizeDigits('12')
              }, {
                value: 12.345,
                format: {type: 'fixedPoint'},
                expected: localizeDigits('12')
              }, {
                value: 1,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: localizeDigits('1')
              }, {
                value: 1.2,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: getLocalizedFixedNumber(1, 2)
              }, {
                value: 1.22,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: getLocalizedFixedNumber(1, 22)
              }, {
                value: 1.222,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: getLocalizedFixedNumber(1, 222)
              }, {
                value: 1.2225,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: getLocalizedFixedNumber(1, 2225)
              }, {
                value: 1.22222228,
                format: {
                  type: 'fixedPoint',
                  precision: null
                },
                expected: getLocalizedFixedNumber(1, 22222228)
              }, {
                value: 12.345,
                format: {
                  type: 'fixedPoint',
                  precision: 1
                },
                intlFormat: {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1
                }
              }, {
                value: 12.345,
                format: {
                  type: 'fixedPoint',
                  precision: 2
                },
                intlFormat: {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                }
              }, {
                value: 12.34,
                format: {
                  type: 'fixedPoint',
                  precision: 3
                },
                intlFormat: {
                  maximumFractionDigits: 3,
                  minimumFractionDigits: 3
                }
              }, {
                value: 0.45,
                format: 'percent',
                intlFormat: {style: 'percent'}
              }, {
                value: 0.45,
                format: {type: 'percent'},
                intlFormat: {style: 'percent'}
              }, {
                value: 0.45,
                format: {
                  type: 'percent',
                  precision: 2
                },
                intlFormat: {
                  style: 'percent',
                  minimumFractionDigits: 2
                }
              }, {
                value: 1204,
                format: 'currency',
                intlFormat: {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0
                }
              }, {
                value: 12,
                format: {type: 'currency'},
                intlFormat: {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0
                }
              }, {
                value: 1,
                format: {
                  type: 'currency',
                  precision: 2
                },
                intlFormat: {
                  style: 'currency',
                  currency: 'USD'
                }
              }, {
                value: 1,
                format: {
                  type: 'currency',
                  precision: 3
                },
                intlFormat: {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 3
                }
              }, {
                value: 1,
                format: {
                  type: 'currency',
                  precision: 2,
                  currency: 'USD'
                },
                intlFormat: {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                }
              }, {
                value: -1204,
                format: {
                  type: 'currency',
                  precision: 2
                },
                intlFormat: {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                }
              }, {
                value: 12345.67,
                format: {
                  type: 'currency largeNumber',
                  precision: 2
                },
                expected: getIntlNumberFormatter({
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                })(12.34567).replace(/(\d|.$)(\D*)$/, '$1K$2')
              }, {
                value: 12345.67,
                format: {
                  type: 'currency thousands',
                  precision: 2
                },
                expected: getIntlNumberFormatter({
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2
                })(12.34567).replace(/(\d|.$)(\D*)$/, '$1K$2')
              }, {
                value: 12345.67,
                format: {
                  type: 'currency millions',
                  precision: 3
                },
                expected: getIntlNumberFormatter({
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 3
                })(0.012).replace(/(\d|.$)(\D*)$/, '$1M$2')
              }];
              assertData.forEach(function(data) {
                var expected = data.expected;
                if (data.intlFormat) {
                  expected = getIntlNumberFormatter(data.intlFormat)(data.value, data.intlFormat);
                  assert.equal(numberLocalization.format(data.value, data.intlFormat), expected);
                }
                assert.equal(numberLocalization.format(data.value, data.format), expected);
              });
            });
            QUnit.test('formatter caching', function(assert) {
              var originalIntl = window.Intl;
              var count = 0;
              var IntlMock = {NumberFormat: function() {
                  count++;
                  this.format = function() {
                    return '';
                  };
                }};
              try {
                window.Intl = IntlMock;
                numberLocalization.format(1, {
                  type: 'currency',
                  precision: 42
                });
                numberLocalization.format(2, {
                  type: 'currency',
                  precision: 42
                });
                assert.equal(count, 1);
              } finally {
                window.Intl = originalIntl;
              }
            });
            QUnit.test('parse', function(assert) {
              assert.equal(numberLocalization.parse(getIntlNumberFormatter({
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })(437)), 437);
              assert.equal(numberLocalization.parse(getIntlNumberFormatter({
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
              })(1.2)), 1.2);
              assert.equal(numberLocalization.parse(getIntlNumberFormatter({
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })(12000)), 12000);
              assert.equal(numberLocalization.parse(getIntlNumberFormatter({
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })(-10)), -10);
              assert.equal(numberLocalization.parse(getIntlNumberFormatter({
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 1
              })(1.2)), 1.2);
            });
            QUnit.test('format by a function', function(assert) {
              assert.equal(numberLocalization.format(437, function(value) {
                return '!' + value;
              }), '!437');
              assert.equal(numberLocalization.format(437, {formatter: function(value) {
                  return '!' + value;
                }}), '!437');
            });
            QUnit.test('parse by a function', function(assert) {
              assert.equal(numberLocalization.parse('!437', {parser: function(text) {
                  return Number(text.substr(1));
                }}), 437);
            });
            QUnit.test('parse long string', function(assert) {
              assert.ok(isNaN(numberLocalization.parse('1111111111111111111111111111111111111')));
            });
          });
          QUnit.module('date - ' + localeId, {
            beforeEach: function() {
              locale(localeId);
            },
            afterEach: function() {
              locale('en');
            }
          }, function() {
            QUnit.test('getMonthNames', function(assert) {
              var getIntlMonthNames = function(format) {
                return Array.apply(null, new Array(12)).map(function(_, monthIndex) {
                  return getIntlDateFormatter({month: format})(new Date(0, monthIndex, 2));
                });
              };
              var monthsWide = getIntlMonthNames('long');
              var monthsAbbr = getIntlMonthNames('short');
              var monthsNarrow = getIntlMonthNames('narrow');
              assert.deepEqual(dateLocalization.getMonthNames(), monthsWide, 'Array of month names without format');
              assert.deepEqual(dateLocalization.getMonthNames('wide'), monthsWide, 'Array of month names (wide format)');
              assert.deepEqual(dateLocalization.getMonthNames('abbreviated'), monthsAbbr, 'Array of month names (abbreviated format)');
              assert.deepEqual(dateLocalization.getMonthNames('narrow'), monthsNarrow, 'Array of month names (narrow format)');
            });
            QUnit.test('getMonthNames non-standalone', function(assert) {
              var expected = {
                de: 'November',
                en: 'November',
                ja: '11月',
                ru: 'ноября',
                zh: '十一月',
                hr: 'studenoga',
                ar: 'نوفمبر',
                el: 'Νοεμβρίου',
                ca: 'novembre'
              };
              assert.equal(dateLocalization.getMonthNames('wide', 'format')[10], expected[localeId], 'Array of non-standalone month names');
            });
            QUnit.test('getPeriodNames', function(assert) {
              var expected = {
                de: ['vorm.', 'nachm.'],
                en: ['AM', 'PM'],
                ja: ['午前', '午後'],
                ru: ['ДП', 'ПП'],
                zh: ['上午', '下午'],
                hr: ['AM', 'PM'],
                ar: ['ص', 'م'],
                el: ['π.μ.', 'μ.μ.'],
                ca: ['a. m.', 'p. m.']
              };
              assert.deepEqual(dateLocalization.getPeriodNames(), expected[localeId]);
            });
            QUnit.test('getDayNames', function(assert) {
              var dayNames = {en: {long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}};
              var getIntlDayNames = function(format) {
                var dayNamesByLocale = dayNames[localeId] && dayNames[localeId][format];
                return dayNamesByLocale || Array.apply(null, new Array(7)).map(function(_, dayIndex) {
                  return getIntlDateFormatter({
                    weekday: format,
                    timeZone: 'UTC'
                  })(new Date(Date.UTC(0, 0, dayIndex)));
                });
              };
              assert.deepEqual(dateLocalization.getDayNames(), getIntlDayNames('long'), 'Array of day names without format');
              assert.deepEqual(dateLocalization.getDayNames('wide'), getIntlDayNames('long'), 'Array of day names (wide format)');
              assert.deepEqual(dateLocalization.getDayNames('abbreviated'), getIntlDayNames('short'), 'Array of day names (abbreviated format)');
              assert.deepEqual(dateLocalization.getDayNames('short'), getIntlDayNames('narrow'), 'Array of day names (short format)');
              assert.deepEqual(dateLocalization.getDayNames('narrow'), getIntlDayNames('narrow'), 'Array of day names (narrow format)');
            });
            QUnit.test('getTimeSeparator', function(assert) {
              assert.equal(dateLocalization.getTimeSeparator(), ':');
            });
            QUnit.test('formatUsesMonthName', function(assert) {
              assert.equal(dateLocalization.formatUsesMonthName('monthAndDay'), true);
              assert.equal(dateLocalization.formatUsesMonthName('monthAndYear'), true);
              assert.equal(dateLocalization.formatUsesMonthName({
                month: 'long',
                day: 'number',
                year: '2-digit'
              }), true);
              assert.equal(dateLocalization.formatUsesMonthName({
                month: 'short',
                day: 'number',
                year: '2-digit'
              }), false);
              assert.equal(dateLocalization.formatUsesMonthName({
                month: 'narrow',
                day: 'number',
                year: '2-digit'
              }), false);
              assert.equal(dateLocalization.formatUsesMonthName({
                day: 'number',
                year: '2-digit'
              }), false);
              assert.equal(dateLocalization.formatUsesMonthName('month'), false);
            });
            QUnit.test('formatUsesDayName', function(assert) {
              assert.equal(dateLocalization.formatUsesDayName('dayofweek'), true);
              assert.equal(dateLocalization.formatUsesDayName('longdate'), true);
              assert.equal(dateLocalization.formatUsesDayName('longdatelongtime'), true);
              assert.equal(dateLocalization.formatUsesDayName({
                weekday: 'long',
                day: 'number'
              }), true);
              assert.equal(dateLocalization.formatUsesDayName({
                weekday: 'short',
                day: 'number'
              }), false);
              assert.equal(dateLocalization.formatUsesDayName({
                weekday: 'narrow',
                day: 'number'
              }), false);
              assert.equal(dateLocalization.formatUsesDayName('day'), false);
              assert.equal(dateLocalization.formatUsesDayName('shortDate'), false);
            });
            QUnit.test('getFormatParts', function(assert) {
              assert.deepEqual(dateLocalization.getFormatParts('shortdate').sort(), ['year', 'month', 'day'].sort());
              assert.deepEqual(dateLocalization.getFormatParts('shorttime').sort(), ['hours', 'minutes'].sort());
              assert.deepEqual(dateLocalization.getFormatParts('shortdateshorttime').sort(), ['year', 'month', 'day', 'hours', 'minutes'].sort());
            });
            QUnit.test('format', function(assert) {
              var defaultOptions = Intl.DateTimeFormat(localeId).resolvedOptions();
              var formats = [{
                format: 'day',
                intlFormat: {day: 'numeric'}
              }, {
                format: 'dayofweek',
                intlFormat: {weekday: 'long'}
              }, {
                format: 'hour',
                expected: localizeDigits('13')
              }, {
                format: 'longdate',
                intlFormat: {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
              }, {
                format: 'longdatelongtime',
                intlFormat: {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                }
              }, {
                format: 'longtime',
                intlFormat: {
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                }
              }, {
                format: 'millisecond',
                expected: localizeDigits('006')
              }, {
                format: 'minute',
                expected: localizeDigits('04')
              }, {
                format: 'month',
                intlFormat: {month: 'long'}
              }, {
                format: 'monthandday',
                intlFormat: {
                  month: 'long',
                  day: 'numeric'
                }
              }, {
                format: 'monthandyear',
                intlFormat: {
                  year: 'numeric',
                  month: 'long'
                }
              }, {format: 'shortdate'}, {
                format: 'shortdateshorttime',
                intlFormat: {
                  year: defaultOptions.year,
                  month: defaultOptions.month,
                  day: defaultOptions.day,
                  hour: 'numeric',
                  minute: 'numeric'
                }
              }, {
                format: 'shorttime',
                intlFormat: {
                  hour: 'numeric',
                  minute: 'numeric'
                }
              }, {
                format: 'shortyear',
                intlFormat: {year: '2-digit'}
              }, {
                format: 'year',
                intlFormat: {year: 'numeric'}
              }];
              var quarterData = [{
                date: new Date(2015, 0),
                expected: 'Q1'
              }, {
                date: new Date(2015, 1),
                expected: 'Q1'
              }, {
                date: new Date(2015, 2),
                expected: 'Q1'
              }, {
                date: new Date(2015, 3),
                expected: 'Q2'
              }, {
                date: new Date(2015, 4),
                expected: 'Q2'
              }, {
                date: new Date(2015, 5),
                expected: 'Q2'
              }, {
                date: new Date(2015, 6),
                expected: 'Q3'
              }, {
                date: new Date(2015, 7),
                expected: 'Q3'
              }, {
                date: new Date(2015, 8),
                expected: 'Q3'
              }, {
                date: new Date(2015, 9),
                expected: 'Q4'
              }, {
                date: new Date(2015, 10),
                expected: 'Q4'
              }, {
                date: new Date(2015, 11),
                expected: 'Q4'
              }];
              var quarterAndYearData = {
                date: new Date(2015, 2, 2, 3, 4, 5, 6),
                expected: 'Q1 2015'
              };
              var smallYearDate = new Date(44, 0, 1, 13, 4, 5, 6);
              smallYearDate.setFullYear(44);
              var testDates = [new Date(2015, 2, 2, 13, 4, 5, 6), smallYearDate];
              testDates.forEach(function(testDate, i) {
                var testFormat = function(format, date, expected) {
                  assert.equal(dateLocalization.format(date, format), expected, (date + " in " + format + " format" + (i ? ' (small year)' : '')));
                  assert.equal(dateLocalization.format(date, {type: format}), expected, (date + " in " + format + " format (object syntax)" + (i ? ' (small year)' : '')));
                };
                formats.forEach(function(data) {
                  var expected = data.expected || getIntlDateFormatter(data.intlFormat)(testDate);
                  testFormat(data.format, testDate, expected);
                  testFormat(data.format.toUpperCase(), testDate, expected);
                  if (data.intlFormat) {
                    assert.equal(dateLocalization.format(testDate, data.intlFormat), expected, (testDate + " in Intl representation of " + data.format + " format" + (i ? ' (small year)' : '')));
                  }
                });
                quarterData.forEach(function(data) {
                  testFormat('quarter', data.date, localizeDigits(data.expected));
                });
                testFormat('quarterandyear', quarterAndYearData.date, localizeDigits(quarterAndYearData.expected));
              });
              assert.equal(dateLocalization.format(new Date(2015, 2, 2, 3, 4, 5, 6)), String(new Date(2015, 2, 2, 3, 4, 5)), 'without format');
              assert.notOk(dateLocalization.format(), 'without date');
            });
            QUnit.test('formatter caching', function(assert) {
              var originalIntl = window.Intl;
              var count = 0;
              var IntlMock = {DateTimeFormat: function() {
                  count++;
                  this.format = function() {
                    return '';
                  };
                }};
              try {
                window.Intl = IntlMock;
                dateLocalization.format(new Date(), {
                  day: 'numeric',
                  uniqueField: true
                });
                dateLocalization.format(new Date(), {
                  day: 'numeric',
                  uniqueField: true
                });
                assert.equal(count, 1);
              } finally {
                window.Intl = originalIntl;
              }
            });
            QUnit.test('parse', function(assert) {
              var testData = [{
                format: 'shortDate',
                date: function() {
                  return new Date(2016, 10, 17);
                }
              }, {
                format: 'shortDate',
                date: function() {
                  return new Date(2016, 11, 31);
                }
              }, {
                format: 'shortDate',
                date: function() {
                  return new Date(2016, 0, 1);
                }
              }, {
                format: 'shortTime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 4, 22);
                }
              }, {
                format: 'shortTime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 56);
                }
              }, {
                format: 'shortTime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0);
                }
              }, {
                format: 'shortTime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 59);
                }
              }, {
                format: 'shortDateshortTime',
                date: function() {
                  return new Date(2016, 11, 31, 4, 44);
                }
              }, {
                format: 'shortDateshortTime',
                date: function() {
                  return new Date(2016, 11, 31, 12, 32);
                }
              }, {
                format: 'shortDateshortTime',
                date: function() {
                  return new Date(2016, 0, 1, 0, 16);
                }
              }, {
                format: 'shortDateshortTime',
                date: function() {
                  return new Date(2016, 0, 1, 12, 48);
                }
              }, {
                format: 'longtime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 4, 22, 15);
                }
              }, {
                format: 'longtime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 56, 56);
                }
              }, {
                format: 'longtime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
                }
              }, {
                format: 'longtime',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 59, 59);
                }
              }, {
                format: 'longDate',
                date: function() {
                  return new Date(2016, 10, 17);
                }
              }, {
                format: 'longDate',
                date: function() {
                  return new Date(2016, 11, 31);
                }
              }, {
                format: 'longDate',
                date: function() {
                  return new Date(2016, 0, 1);
                }
              }, {
                format: 'longDateLongTime',
                date: function() {
                  return new Date(2016, 11, 31, 4, 44);
                }
              }, {
                format: 'longDateLongTime',
                date: function() {
                  return new Date(2016, 11, 31, 12, 32);
                }
              }, {
                format: 'longDateLongTime',
                date: function() {
                  return new Date(2016, 0, 1, 0, 16);
                }
              }, {
                format: 'longDateLongTime',
                date: function() {
                  return new Date(2016, 0, 1, 12, 48);
                }
              }, {
                format: 'monthAndYear',
                date: function() {
                  return new Date(2016, 9, 1);
                }
              }, {
                format: 'monthAndDay',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), 9, 17);
                }
              }, {
                format: 'year',
                date: function() {
                  return new Date(2013, 0, 1);
                }
              }, {
                format: 'shortyear',
                date: function() {
                  return new Date(2013, 0, 1);
                }
              }, {
                format: 'month',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), 9, 1);
                }
              }, {
                format: 'day',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 17);
                }
              }, {
                format: 'hour',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16);
                }
              }, {
                format: 'minute',
                date: function() {
                  var currentDate = new Date();
                  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), 56);
                }
              }];
              testData.forEach(function(config) {
                var format = config.format;
                if (localeId.substr(0, 2) === 'el' && format === 'monthAndYear') {
                  return;
                }
                var date = config.date();
                var formattedDate = dateLocalization.format(date, format);
                var parsedDate = dateLocalization.parse(formattedDate, format);
                assert.equal(parsedDate && parsedDate.toString(), date.toString(), 'failed to parse ' + formattedDate + ' by "' + format + '"');
                formattedDate = formattedDate.replace(/(\D)0+(\d)/g, '$1$2');
                parsedDate = dateLocalization.parse(formattedDate, format);
                assert.equal(parsedDate && parsedDate.toString(), date.toString(), 'failed to parse ' + formattedDate + ' by "' + format + '" without leading zeroes');
              });
            });
            QUnit.test('parse wrong arguments', function(assert) {
              assert.equal(dateLocalization.parse(null, 'shortDate'), undefined);
              assert.equal(dateLocalization.parse(undefined, 'shortDate'), undefined);
              assert.equal(dateLocalization.parse('', 'shortDate'), undefined);
            });
            QUnit.test('parse by a function', function(assert) {
              var expectedDate = new Date(2018, 1, 1);
              var customDateString = 'Custom date string';
              var customParser = function(text) {
                if (text === customDateString) {
                  return expectedDate;
                }
              };
              assert.equal(dateLocalization.parse(customDateString, {parser: customParser}).toString(), expectedDate.toString());
            });
            QUnit.test('DevExtreme format uses default locale options', function(assert) {
              var date = new Date();
              var intlFormatted = getIntlDateFormatter()(date);
              var dateFormatted = dateLocalization.format(date, 'shortdate');
              var dateTimeFormatted = dateLocalization.format(date, 'shortdateshorttime');
              assert.equal(dateFormatted, intlFormatted);
              assert.ok(dateTimeFormatted.indexOf(intlFormatted) > -1, dateTimeFormatted + ' not contain ' + intlFormatted);
            });
            QUnit.test('format/parse by a function', function(assert) {
              var format = {
                formatter: function(date) {
                  return 'It was year ' + date.getFullYear() + '.';
                },
                parser: function(text) {
                  return new Date(Number(text.substr(12, 4)), 1, 1);
                }
              };
              var someDate = new Date(1999, 1, 1);
              assert.equal(dateLocalization.format(someDate, format), 'It was year 1999.');
              assert.equal(dateLocalization.parse('It was year 2000.', format).getFullYear(), 2000);
            });
            QUnit.test('firstDayOfWeekIndex', function(assert) {
              var expectedValues = {
                de: 1,
                en: 0,
                ja: 0,
                ru: 1,
                zh: 0,
                hr: 1,
                ar: 6,
                el: 1,
                ca: 1
              };
              assert.equal(dateLocalization.firstDayOfWeekIndex(), expectedValues[localeId]);
            });
          });
        });
        QUnit.module('getOpenXmlCurrencyFormat', function() {
          QUnit.test('getOpenXmlCurrencyFormat: check conversion for some cultures (T835933)', function(assert) {
            try {
              locale('de');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '#,##0{0}\xA0$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '#,##0{0}\xA0$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '#,##0{0}\xA0\\R\\U\\B');
              locale('en');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '\\R\\U\\B#,##0{0}_);\\(\\R\\U\\B#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '\\C\\N\\¥#,##0{0}_);\\(\\C\\N\\¥#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '\\N\\O\\K#,##0{0}_);\\(\\N\\O\\K#,##0{0}\\)');
              locale('en-ru');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '\\R\\U\\B#,##0{0}_);\\(\\R\\U\\B#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '\\C\\N\\¥#,##0{0}_);\\(\\C\\N\\¥#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '\\N\\O\\K#,##0{0}_);\\(\\N\\O\\K#,##0{0}\\)');
              locale('et');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '#,##0{0}\xA0$_);\\(#,##0{0}\xA0$\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '#,##0{0}\xA0$_);\\(#,##0{0}\xA0$\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '#,##0{0}\xA0\\R\\U\\B_);\\(#,##0{0}\xA0\\R\\U\\B\\)');
              locale('ja');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '$#,##0{0}_);\\($#,##0{0}\\)');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '\\R\\U\\B#,##0{0}_);\\(\\R\\U\\B#,##0{0}\\)');
              locale('ru');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '#,##0{0}\xA0$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '#,##0{0}\xA0$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '#,##0{0}\xA0\\₽');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('CNY'), '#,##0{0}\xA0\\C\\N\\¥');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('NOK'), '#,##0{0}\xA0\\N\\O\\K');
              locale('sv');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat(undefined), '#,##0{0}\xA0\\U\\S$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('USD'), '#,##0{0}\xA0\\U\\S$');
              assert.equal(numberLocalization.getOpenXmlCurrencyFormat('RUB'), '#,##0{0}\xA0\\R\\U\\B');
            } finally {
              locale('en');
            }
          });
        });
        QUnit.module('defaultCurrency', function() {
          QUnit.test('config.defaultCurrency affects on localization', function(assert) {
            var originalConfig = config();
            try {
              assert.equal(numberLocalization.getCurrencySymbol().symbol, '$');
              assert.equal(numberLocalization.format(12, {
                style: 'currency',
                currency: 'default'
              }), '$12.00');
              config({defaultCurrency: 'EUR'});
              assert.equal(numberLocalization.getCurrencySymbol().symbol, '€');
              assert.equal(numberLocalization.format(12, {
                style: 'currency',
                currency: 'default'
              }), '€12.00');
            } finally {
              config(originalConfig);
            }
          });
        });
        QUnit.module('date - browser specific behavior', function() {
          QUnit.test('formatted value should not contain &lrm & &rlm symbols', function(assert) {
            var unwantedSymbols = '\u200E\u200F';
            var originalDateTimeFormatter = Intl.DateTimeFormat;
            try {
              Intl.DateTimeFormat = function(locale, config) {
                return {format: function(date) {
                    return unwantedSymbols + new originalDateTimeFormatter(locale, config).format(date);
                  }};
              };
              assert.equal(dateLocalization.format(new Date(2000, 0, 1), {month: 'long'}), 'January');
              assert.equal(dateLocalization.getMonthNames()[0], 'January');
              assert.equal(dateLocalization.getDayNames()[0], 'Sunday');
            } finally {
              Intl.DateTimeFormat = originalDateTimeFormatter;
            }
          });
          QUnit.test('Format by `hour` and `minute` shortcuts in IE and Edge', function(assert) {
            var originalDateTimeFormatter = Intl.DateTimeFormat;
            var testData = {
              hour: {
                wrongFormat: {
                  hour: 'numeric',
                  hour12: false,
                  minute: 'numeric'
                },
                expected: '01'
              },
              minute: {
                wrongFormat: {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                },
                expected: '02'
              }
            };
            var emulationFormat;
            var wrongBrowserBehaviorEmulator = function() {
              return {format: function(date) {
                  return new originalDateTimeFormatter('en', emulationFormat).format(date);
                }};
            };
            try {
              Intl.DateTimeFormat = wrongBrowserBehaviorEmulator;
              for (var format in testData) {
                emulationFormat = testData[format].wrongFormat;
                assert.equal(dateLocalization.format(new Date(2000, 0, 1, 1, 2), format), testData[format].expected, 'Format: ' + format);
              }
            } finally {
              Intl.DateTimeFormat = originalDateTimeFormatter;
            }
          });
        });
        QUnit.module('Fallback strategy', {afterEach: function() {
            numberLocalization.resetInjection();
            dateLocalization.resetInjection();
            numberLocalization.inject(intlNumberLocalization);
            dateLocalization.inject(intlDateLocalization);
            patchPolyfillResults();
          }}, function() {
          QUnit.test('disableIntl', function(assert) {
            disableIntl();
            assert.equal(numberLocalization.engine(), 'base');
            assert.equal(dateLocalization.engine(), 'base');
            numberLocalization.inject({engine: function() {
                return 'globalize';
              }});
            dateLocalization.inject({engine: function() {
                return 'globalize';
              }});
            disableIntl();
            assert.equal(numberLocalization.engine(), 'globalize');
            assert.equal(dateLocalization.engine(), 'globalize');
          });
        });
      });
      QUnit.module('Exceljs format', function() {
        ExcelJSLocalizationFormatTests.runCurrencyTests([{
          value: 'USD',
          expected: '$#,##0_);\\($#,##0\\)'
        }, {
          value: 'RUB',
          expected: '\\R\\U\\B#,##0_);\\(\\R\\U\\B#,##0\\)'
        }, {
          value: 'JPY',
          expected: '\\¥#,##0_);\\(\\¥#,##0\\)'
        }, {
          value: 'KPW',
          expected: '\\K\\P\\W#,##0_);\\(\\K\\P\\W#,##0\\)'
        }, {
          value: 'LBP',
          expected: '\\L\\B\\P#,##0_);\\(\\L\\B\\P#,##0\\)'
        }, {
          value: 'SEK',
          expected: '\\S\\E\\K#,##0_);\\(\\S\\E\\K#,##0\\)'
        }]);
        ExcelJSLocalizationFormatTests.runPivotGridCurrencyTests([{
          value: 'USD',
          expected: '$#,##0_);\\($#,##0\\)'
        }, {
          value: 'RUB',
          expected: '\\R\\U\\B#,##0_);\\(\\R\\U\\B#,##0\\)'
        }, {
          value: 'JPY',
          expected: '\\¥#,##0_);\\(\\¥#,##0\\)'
        }, {
          value: 'KPW',
          expected: '\\K\\P\\W#,##0_);\\(\\K\\P\\W#,##0\\)'
        }, {
          value: 'LBP',
          expected: '\\L\\B\\P#,##0_);\\(\\L\\B\\P#,##0\\)'
        }, {
          value: 'SEK',
          expected: '\\S\\E\\K#,##0_);\\(\\S\\E\\K#,##0\\)'
        }]);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/noIntl.js","intl","./sharedParts/localization.shared.js","localization/date","localization/number","localization/intl/date","localization/intl/number","localization/core","localization","core/config","../DevExpress.exporter/exceljsParts/exceljs.format.tests.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/noIntl.js"), require("intl"), require("./sharedParts/localization.shared.js"), require("localization/date"), require("localization/number"), require("localization/intl/date"), require("localization/intl/number"), require("localization/core"), require("localization"), require("core/config"), require("../DevExpress.exporter/exceljsParts/exceljs.format.tests.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.intl.tests.js.map