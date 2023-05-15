!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.globalize.widgets.tests.js"], ["cldr-core/supplemental/likelySubtags.json!","cldr-core/supplemental/numberingSystems.json!","globalize","devextreme-cldr-data/fa.json!json","devextreme-cldr-data/mr.json!json","devextreme-cldr-data/ar.json!json","devextreme-cldr-data/de.json!json","localization/globalize/core","localization/globalize/number","localization/globalize/currency","localization/globalize/date","localization/globalize/message","jquery","localization/date","ui/date_box","viz/chart","exporter/exceljs/export_format"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.localization/localization.globalize.widgets.tests.js', ['cldr-core/supplemental/likelySubtags.json!', 'cldr-core/supplemental/numberingSystems.json!', 'globalize', 'devextreme-cldr-data/fa.json!json', 'devextreme-cldr-data/mr.json!json', 'devextreme-cldr-data/ar.json!json', 'devextreme-cldr-data/de.json!json', 'localization/globalize/core', 'localization/globalize/number', 'localization/globalize/currency', 'localization/globalize/date', 'localization/globalize/message', 'jquery', 'localization/date', 'ui/date_box', 'viz/chart', 'exporter/exceljs/export_format'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const likelySubtags = $__require('cldr-core/supplemental/likelySubtags.json!');
    const numberingSystems = $__require('cldr-core/supplemental/numberingSystems.json!');
    const Globalize = $__require('globalize');

    const cldrData = [$__require('devextreme-cldr-data/fa.json!json'), $__require('devextreme-cldr-data/mr.json!json'), $__require('devextreme-cldr-data/ar.json!json'), $__require('devextreme-cldr-data/de.json!json')];

    Globalize.load(likelySubtags);
    Globalize.load(numberingSystems);

    cldrData.forEach(localeCldrData => {
        Globalize.load(localeCldrData);
    });

    $__require('localization/globalize/core');
    $__require('localization/globalize/number');
    $__require('localization/globalize/currency');
    $__require('localization/globalize/date');
    $__require('localization/globalize/message');

    const $ = $__require('jquery');
    const dateLocalization = $__require('localization/date');

    $__require('ui/date_box');
    $__require('viz/chart');

    const ExcelExport = $__require('exporter/exceljs/export_format');

    const TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
    const DATEVIEW_ITEM_SELECTOR = '.dx-dateview-item';
    const DATEVIEW_ROLLER_DAY_SELECTOR = '.dx-dateviewroller-day';
    const DATEVIEW_ROLLER_YEAR_SELECTOR = '.dx-dateviewroller-year';
    const DATEVIEW_DAYS_SELECTOR = DATEVIEW_ROLLER_DAY_SELECTOR + ' ' + DATEVIEW_ITEM_SELECTOR;
    const DATEVIEW_YEARS_SELECTOR = DATEVIEW_ROLLER_YEAR_SELECTOR + ' ' + DATEVIEW_ITEM_SELECTOR;
    const CALENDAR_NAVIGATOR_TEXT_SELECTOR = '.dx-calendar-caption-button';
    const CALENDAR_CELL_SELECTOR = '.dx-calendar-cell';
    const CLEAR_BUTTON_CLASS = 'dx-clear-button-area';
    const commonEnvironment = {
        beforeEach: function () {
            const markup = `<div id="dateBox"></div>
                <div id="numberBox"></div>
                <div id="dateBoxWithPicker"></div>
                <div id="widthRootStyle"></div>
                <div id="calendar"></div>`;

            $('#qunit-fixture').html(markup);
            $('#widthRootStyle').css({ width: '300px' });
        },

        afterEach: function () {
            $('#qunit-fixture').empty();
        }
    };

    QUnit.module('DateBox', commonEnvironment, () => {
        QUnit.test('"ww" format should not raise any errors (T924017)', function (assert) {
            try {
                $('#dateBox').dxDateBox({
                    useMaskBehavior: true,
                    displayFormat: 'ww, d of MMM, yyyy HH:mm',
                    value: new Date(2018, 9, 16, 15, 8, 12)
                });
            } catch (e) {
                assert.ok(false, e);
            } finally {
                assert.ok(true, 'no errors has been raised');
            }
        });

        QUnit.test('Date and serializing date in locales different than EN', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('de');

                const $dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'calendar'
                });

                const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                assert.equal(date, '10.11.2015', 'date format is correct');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('DateBox should localize whole date in arabic locale', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'calendar'
                });

                const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                assert.equal(date, '١٠/١١/٢٠١٥', 'date is localized');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('DateBox should not raise error when digits are Marathi digits', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('mr');

                const $dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'calendar',
                    useMaskBehavior: true
                });

                const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                assert.equal(date, '१०/११/२०१५', 'date is localized');
            } catch (e) {
                assert.ok(false, 'Error occured: ' + e.message);
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('DateBox should not raise error when digits are not default arabic digits', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'calendar',
                    useMaskBehavior: true
                });

                const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                assert.equal(date, '١٠/١١/٢٠١٥', 'date is localized');
            } catch (e) {
                assert.ok(false, 'Error occured: ' + e.message);
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        ['h:mm aaa', 'h:mm aaaa', 'h:mm aaaaa'].forEach(displayFormat => {
            QUnit.test(`DateBox should not raise error when displayFormat="${displayFormat}" and arabic locale is used (T1162346)`, function (assert) {
                const originalCulture = Globalize.locale().locale;

                try {
                    Globalize.locale('ar');

                    const $dateBox = $('#dateBox').dxDateBox({
                        value: new Date(2015, 10, 10),
                        displayFormat,
                        type: 'time',
                        pickerType: 'calendar',
                        useMaskBehavior: true
                    });

                    const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                    assert.strictEqual(date, '١٢:٠٠ ص', 'date is localized');
                } catch (e) {
                    assert.ok(false, 'Error occured: ' + e.message);
                } finally {
                    Globalize.locale(originalCulture);
                }
            });
        });

        QUnit.test('DateBox should not raise error when digits are not default arabic digits and Fractional Seconds in the "displayFormat"', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const dateBox = $('#dateBox').dxDateBox({
                    value: new Date('2014-09-08T08:02:17.12'),
                    useMaskBehavior: true,
                    type: 'date',
                    pickerType: 'calendar',
                    displayFormat: 'HH:mm:ss.SS'
                }).dxDateBox('instance');

                assert.strictEqual(dateBox.option('text'), '٠٨:٠٢:١٧.١٢', 'date is localized');
            } catch (e) {
                assert.ok(false, `Error occured: ${e.message}`);
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('DateBox should not raise error when digits are Farsi digits', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('fa');

                const $dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'calendar',
                    useMaskBehavior: true
                });

                const date = $dateBox.find(TEXTEDITOR_INPUT_SELECTOR).val();
                assert.equal(date, '۲۰۱۵/۱۱/۱۰', 'date is localized');
            } catch (e) {
                assert.ok(false, 'Error occured: ' + e.message);
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('dxDateBox rollers localize years and days', function (assert) {
            const originalCulture = Globalize.locale().locale;
            const clock = sinon.useFakeTimers();

            try {
                Globalize.locale('ar');

                const dateBox = $('#dateBox').dxDateBox({
                    value: new Date(2015, 10, 10),
                    type: 'date',
                    pickerType: 'rollers',
                    opened: true
                }).dxDateBox('instance');

                const $dateBoxContent = $(dateBox.content());
                const dayText = $dateBoxContent.find(DATEVIEW_DAYS_SELECTOR).first().text();
                const yearText = $dateBoxContent.find(DATEVIEW_YEARS_SELECTOR).first().text();

                assert.equal(dayText, '١', 'Day localized');
                assert.equal(yearText, '١٩٠٠', 'Year localized');
            } finally {
                Globalize.locale(originalCulture);
                clock.restore();
            }
        });

        QUnit.test('Calendar localize dates on the month view', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $calendar = $('#calendar').dxCalendar({
                    value: new Date(2015, 10, 11)
                });

                const navigatorText = $calendar.find(CALENDAR_NAVIGATOR_TEXT_SELECTOR).text();
                const cellText = $calendar.find(CALENDAR_CELL_SELECTOR).first().text();

                assert.equal(navigatorText, 'نوفمبر ٢٠١٥', 'Navigator localized');

                assert.equal(cellText, '٣١', 'Cell localized');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('Calendar localize dates on the year view', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $calendar = $('#calendar').dxCalendar({
                    value: new Date(2015, 10, 10),
                    zoomLevel: 'year'
                });

                const navigatorText = $calendar.find(CALENDAR_NAVIGATOR_TEXT_SELECTOR).text();
                const cellText = $calendar.find(CALENDAR_CELL_SELECTOR).first().text();

                assert.equal(navigatorText, '٢٠١٥', 'Navigator localized');
                assert.equal(cellText, 'يناير', 'Cell localized');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('Calendar localize dates on the decade view', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $calendar = $('#calendar').dxCalendar({
                    value: new Date(2015, 10, 10),
                    zoomLevel: 'decade'
                });

                const navigatorText = $calendar.find(CALENDAR_NAVIGATOR_TEXT_SELECTOR).text();
                const cellText = $calendar.find(CALENDAR_CELL_SELECTOR).first().text();

                assert.equal(navigatorText, '٢٠١٠-٢٠١٩', 'Navigator localized');
                assert.equal(cellText, '٢٠٠٩', 'Cell localized');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('Calendar localize dates on the century view', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const $calendar = $('#calendar').dxCalendar({
                    value: new Date(2015, 10, 10),
                    zoomLevel: 'century'
                });

                const navigatorText = $calendar.find(CALENDAR_NAVIGATOR_TEXT_SELECTOR).text();
                const cellText = $calendar.find(CALENDAR_CELL_SELECTOR).first().text();

                assert.equal(navigatorText, '٢٠٠٠-٢٠٩٩', 'Navigator localized');
                assert.equal(cellText, '١٩٩٠ - ١٩٩٩', 'Cell localized');
            } finally {
                Globalize.locale(originalCulture);
            }
        });

        QUnit.test('parse string format date', function (assert) {
            const value = '2014-02-06T23:31:25.33';
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('de');

                const $element = $('#dateBox').dxDateBox({
                    value: value,
                    type: 'datetime',
                    pickerType: 'calendar'
                });

                const date = $element.find(TEXTEDITOR_INPUT_SELECTOR).val();

                const expectedDate = new Date(2014, 1, 6, 23, 31, 25, 330);

                assert.equal(date, dateLocalization.format(expectedDate, 'shortdateshorttime'), 'string format parsed correct in date format');
                assert.equal($element.dxDateBox('option', 'value'), value, 'value format is correct');
            } finally {
                Globalize.locale(originalCulture);
            }
        });
    });

    QUnit.module('NumberBox', commonEnvironment, () => {
        QUnit.test('click on clear button should not raise any errors (T1028426)', function (assert) {
            try {
                const $numberBox = $('#numberBox').dxNumberBox({
                    format: Globalize.currencyFormatter('EUR', { minimumFractionDigits: 0 }),
                    value: 10,
                    showClearButton: true
                });
                const $clearButton = $numberBox.find(`.${CLEAR_BUTTON_CLASS}`);

                $clearButton.click();
            } catch (e) {
                assert.ok(false, e);
            } finally {
                assert.ok(true, 'no errors has been raised');
            }
        });
    });

    QUnit.module('Chart', commonEnvironment, () => {
        QUnit.test('Chart', function (assert) {
            $('#widthRootStyle').dxChart({
                dataSource: [{
                    arg: 'Sun',
                    val: 332837
                }, {
                    arg: 'Europa (Jupiter\'s Moon)',
                    val: 0.00803
                }],
                series: {},
                valueAxis: {
                    tickInterval: 2,
                    type: 'logarithmic'
                }
            });

            assert.strictEqual($($('.dxc-val-elements').children()[0]).text(), '0.0001');
        });
    });

    QUnit.module('Excel creator', commonEnvironment, () => {
        QUnit.test('Arabic data convert', function (assert) {
            const originalCulture = Globalize.locale().locale;

            try {
                Globalize.locale('ar');

                const convertDate = function (formatter) {
                    return ExcelExport.ExportFormat.convertFormat(formatter, null, 'date');
                };

                const pattern = '[$-2010001]d\\/M\\/yyyy';
                const formatter = function (value) {
                    return dateLocalization.format(value, 'shortdate');
                };
                const date = convertDate(formatter).trim();

                assert.strictEqual(date, pattern, `Pattern: "${pattern}" Example:"${formatter(new Date())}"`);
            } finally {
                Globalize.locale(originalCulture);
            }
        });
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["cldr-core/supplemental/likelySubtags.json!","cldr-core/supplemental/numberingSystems.json!","globalize","devextreme-cldr-data/fa.json!json","devextreme-cldr-data/mr.json!json","devextreme-cldr-data/ar.json!json","devextreme-cldr-data/de.json!json","localization/globalize/core","localization/globalize/number","localization/globalize/currency","localization/globalize/date","localization/globalize/message","jquery","localization/date","ui/date_box","viz/chart","exporter/exceljs/export_format"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("cldr-core/supplemental/likelySubtags.json!"), require("cldr-core/supplemental/numberingSystems.json!"), require("globalize"), require("devextreme-cldr-data/fa.json!json"), require("devextreme-cldr-data/mr.json!json"), require("devextreme-cldr-data/ar.json!json"), require("devextreme-cldr-data/de.json!json"), require("localization/globalize/core"), require("localization/globalize/number"), require("localization/globalize/currency"), require("localization/globalize/date"), require("localization/globalize/message"), require("jquery"), require("localization/date"), require("ui/date_box"), require("viz/chart"), require("exporter/exceljs/export_format"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.globalize.widgets.tests.js.map