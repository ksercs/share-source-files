!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/calendarView.markup.tests.js"], ["jquery","core/utils/date","ui/calendar/ui.calendar.base_view","ui/calendar/ui.calendar.views","animation/fx","core/utils/date_serialization","ui/calendar"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/calendarView.markup.tests.js", ["jquery", "core/utils/date", "ui/calendar/ui.calendar.base_view", "ui/calendar/ui.calendar.views", "animation/fx", "core/utils/date_serialization", "ui/calendar"], function($__export) {
  "use strict";
  var $,
      dateUtils,
      BaseView,
      Views,
      fx,
      dateSerialization,
      CALENDAR_EMPTY_CELL_CLASS,
      CALENDAR_TODAY_CLASS,
      CALENDAR_OTHER_VIEW_CLASS,
      CALENDAR_SELECTED_DATE_CLASS,
      getShortDate,
      getTextsArray;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      BaseView = $__m.default;
    }, function($__m) {
      Views = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dateSerialization = $__m.default;
    }, function($__m) {}],
    execute: function() {
      CALENDAR_EMPTY_CELL_CLASS = 'dx-calendar-empty-cell';
      CALENDAR_TODAY_CLASS = 'dx-calendar-today';
      CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
      CALENDAR_SELECTED_DATE_CLASS = 'dx-calendar-selected-date';
      getShortDate = function(date) {
        return dateSerialization.serializeDate(date, dateUtils.getShortDateFormat());
      };
      getTextsArray = function(elements) {
        var result = [];
        $.each(elements, function(_, element) {
          result.push($(element).text());
        });
        return result;
      };
      QUnit.module('Basics', function() {
        QUnit.test('all views must be derived from the base view class', function(assert) {
          $.each(Views, function(name, View) {
            if (name !== 'default') {
              assert.ok(new View($('<div>')) instanceof BaseView);
            }
          });
        });
      });
      QUnit.module('MonthView markup', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['month'](this.$element, {
            date: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          });
        },
        reinit: function(options) {
          this.$element.remove();
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['month'](this.$element, options);
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('main table should be 6 by 7', function(assert) {
          var table = this.$element.find('tbody');
          assert.strictEqual(table.length, 1, 'table has been rendered');
          var rows = table.find('tr');
          assert.strictEqual(rows.length, 6, 'with 6 rows');
          for (var i = 0; i < 6; ++i) {
            var columns = $(rows[i]).find('td');
            assert.strictEqual(columns.length, 7, 'of 7 columns');
          }
        });
        QUnit.test('day captions must be rendered in proper order', function(assert) {
          var captions = this.$element.find('table').find('th');
          assert.deepEqual(getTextsArray(captions), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 'day captions order is correct');
        });
        QUnit.test('day captions must be rendered in proper order in RTL mode', function(assert) {
          this.reinit({
            date: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            rtlEnabled: true
          });
          var captions = this.$element.find('table').find('th');
          assert.deepEqual(getTextsArray(captions), ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'], 'day captions order is correct');
        });
        QUnit.test('day captions must be rendered in proper order in RTL mode after changing runtime', function(assert) {
          this.view.option('rtlEnabled', true);
          var captions = this.$element.find('table').find('th');
          assert.deepEqual(getTextsArray(captions), ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'], 'day captions order is correct');
        });
        QUnit.test('dates must be rendered in proper positions', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
        });
        QUnit.test('dates must be rendered in proper positions in RTL mode', function(assert) {
          this.reinit({
            date: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            rtlEnabled: true
          });
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['6', '5', '4', '3', '2', '1', '30', '13', '12', '11', '10', '9', '8', '7', '20', '19', '18', '17', '16', '15', '14', '27', '26', '25', '24', '23', '22', '21', '3', '2', '1', '31', '30', '29', '28', '10', '9', '8', '7', '6', '5', '4']);
        });
        QUnit.test('dates must be rendered in proper positions in RTL mode after changing runtime', function(assert) {
          this.view.option('rtlEnabled', true);
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['6', '5', '4', '3', '2', '1', '30', '13', '12', '11', '10', '9', '8', '7', '20', '19', '18', '17', '16', '15', '14', '27', '26', '25', '24', '23', '22', '21', '3', '2', '1', '31', '30', '29', '28', '10', '9', '8', '7', '6', '5', '4']);
        });
        QUnit.test('dates must be rendered in proper positions when the first day of the month comes right before the first day of the week', function(assert) {
          this.reinit({
            date: new Date(2013, 8, 11),
            firstDayOfWeek: 1
          });
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['26', '27', '28', '29', '30', '31', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '1', '2', '3', '4', '5', '6']);
        });
        QUnit.test('non-current month dates must be decorated with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td').filter('.' + CALENDAR_OTHER_VIEW_CLASS);
          assert.deepEqual(getTextsArray(dateCells), ['30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
        });
        QUnit.test('today must be decorated with a css class', function(assert) {
          this.reinit({});
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.equal(todayCell.length, 1);
        });
        QUnit.test('correct date must be decorated with a css class when _todayDate is specified', function(assert) {
          this.reinit({
            date: new Date(2021, 0, 15),
            _todayDate: function() {
              return new Date(2021, 0, 1);
            }
          });
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.strictEqual($(todayCell).text(), '1');
        });
        QUnit.test('correct date must be decorated with a css class after _todayDate runtime change', function(assert) {
          this.view.option('_todayDate', function() {
            return new Date(2013, 9, 1);
          });
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.strictEqual($(todayCell).text(), '1');
        });
        QUnit.test('value time component should not be compared in min and max options', function(assert) {
          this.reinit({
            value: new Date(2015, 2, 14, 12),
            min: new Date(2015, 2, 14, 10)
          });
          assert.ok(!$('.dx-calendar-selected-date').hasClass('dx-calendar-empty-cell'), 'current date is available');
          this.reinit({
            value: new Date(2015, 2, 14, 12),
            max: new Date(2015, 2, 14, 13)
          });
          assert.ok(!$('.dx-calendar-selected-date').hasClass('dx-calendar-empty-cell'), 'current date is available');
        });
      });
      QUnit.module('YearView markup', {
        beforeEach: function() {
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['year'](this.$element, {
            date: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          });
        },
        reinit: function(options) {
          this.$element.remove();
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['year'](this.$element, options);
        },
        afterEach: function() {
          this.$element.remove();
        }
      }, function() {
        QUnit.test('main table for year view should be 4 by 3', function(assert) {
          var table = this.$element.find('tbody');
          assert.strictEqual(table.length, 1, 'table has been rendered');
          var rows = table.find('tr');
          assert.strictEqual(rows.length, 3, 'with 3 rows');
          for (var i = 0; i < 3; ++i) {
            var columns = $(rows[i]).find('td');
            assert.strictEqual(columns.length, 4, 'of 4 columns');
          }
        });
        QUnit.test('month must be rendered in proper positions', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        });
        QUnit.test('month must be rendered in proper positions in RTL mode', function(assert) {
          this.reinit({
            date: new Date(2015, 2, 1),
            rtlEnabled: true
          });
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['Apr', 'Mar', 'Feb', 'Jan', 'Aug', 'Jul', 'Jun', 'May', 'Dec', 'Nov', 'Oct', 'Sep']);
        });
        QUnit.test('data-value after render for cells in year view', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var startMonth = 0;
          $.each(dateCells, function(_, dateCell) {
            var shortDate = getShortDate(new Date(2013, startMonth, 1));
            assert.equal(shortDate, $(dateCell).data().value, 'data-value has a current value');
            startMonth++;
          });
        });
        QUnit.test('today must be decorated with a css class', function(assert) {
          this.reinit({});
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.equal(todayCell.length, 1);
        });
        QUnit.test('correct date must be decorated with a css class when _todayDate is specified', function(assert) {
          this.reinit({
            date: new Date(2021, 0, 15),
            _todayDate: function() {
              return new Date(2021, 10, 15);
            }
          });
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.strictEqual($(todayCell).text(), 'Nov');
        });
      });
      QUnit.module('DecadeView', {
        beforeEach: function() {
          fx.off = true;
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, {
            date: new Date(2013, 9, 16),
            value: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          });
        },
        reinit: function(options) {
          this.$element.remove();
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, options);
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('main table for decade view should be 4 by 3', function(assert) {
          var table = this.$element.find('tbody');
          assert.strictEqual(table.length, 1, 'table has been rendered');
          var rows = table.find('tr');
          assert.strictEqual(rows.length, 3, 'with 3 rows');
          for (var i = 0; i < 3; ++i) {
            var columns = $(rows[i]).find('td');
            assert.strictEqual(columns.length, 4, 'of 4 columns');
          }
        });
        QUnit.test('years must be rendered in proper positions', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']);
        });
        QUnit.test('years must be rendered in proper positions in RTL mode', function(assert) {
          this.reinit({
            date: new Date(2015, 2, 1),
            rtlEnabled: true
          });
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['2012', '2011', '2010', '2009', '2016', '2015', '2014', '2013', '2020', '2019', '2018', '2017']);
        });
        QUnit.test('non-current decade dates must be decorated with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td').filter('.' + CALENDAR_OTHER_VIEW_CLASS);
          assert.deepEqual(getTextsArray(dateCells), ['2009', '2020']);
        });
        QUnit.test('today must be decorated with a css class', function(assert) {
          this.reinit({});
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.equal(todayCell.length, 1);
        });
        QUnit.test('correct date must be decorated with a css class when _todayDate is specified', function(assert) {
          this.reinit({
            date: new Date(2021, 0, 15),
            _todayDate: function() {
              return new Date(2030, 0, 15);
            }
          });
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.strictEqual($(todayCell).text(), '2030');
        });
      });
      QUnit.module('CenturyView', {
        beforeEach: function() {
          fx.off = true;
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['century'](this.$element, {
            date: new Date(2013, 9, 16),
            value: new Date(2013, 9, 16),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          });
        },
        reinit: function(options) {
          this.$element.remove();
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['century'](this.$element, options);
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('main table for century view should be 4 by 3', function(assert) {
          var table = this.$element.find('tbody');
          assert.strictEqual(table.length, 1, 'table has been rendered');
          var rows = table.find('tr');
          assert.strictEqual(rows.length, 3, 'with 3 rows');
          for (var i = 0; i < 3; ++i) {
            var columns = $(rows[i]).find('td');
            assert.strictEqual(columns.length, 4, 'of 4 columns');
          }
        });
        QUnit.test('decades must be rendered in proper positions', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['1990 - 1999', '2000 - 2009', '2010 - 2019', '2020 - 2029', '2030 - 2039', '2040 - 2049', '2050 - 2059', '2060 - 2069', '2070 - 2079', '2080 - 2089', '2090 - 2099', '2100 - 2109']);
        });
        QUnit.test('decades must be rendered in proper positions in RTL mode', function(assert) {
          this.reinit({
            date: new Date(2015, 2, 1),
            rtlEnabled: true
          });
          var dateCells = this.$element.find('table').find('td');
          assert.deepEqual(getTextsArray(dateCells), ['2020 - 2029', '2010 - 2019', '2000 - 2009', '1990 - 1999', '2060 - 2069', '2050 - 2059', '2040 - 2049', '2030 - 2039', '2100 - 2109', '2090 - 2099', '2080 - 2089', '2070 - 2079']);
        });
        QUnit.test('non-current century dates must be decorated with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td').filter('.' + CALENDAR_OTHER_VIEW_CLASS);
          assert.deepEqual(getTextsArray(dateCells), ['1990 - 1999', '2100 - 2109']);
        });
        QUnit.test('change value option must add a CSS class to a cell', function(assert) {
          var secondDate = new Date(2010, 1, 1);
          var secondDateCell = this.$element.find('table').find('td').eq(2);
          this.view.option('value', secondDate);
          assert.ok(secondDateCell.hasClass(CALENDAR_SELECTED_DATE_CLASS));
        });
        QUnit.test('today must be decorated with a css class', function(assert) {
          this.reinit({});
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.equal(todayCell.length, 1);
        });
        QUnit.test('correct date must be decorated with a css class when _todayDate is specified', function(assert) {
          this.reinit({
            date: new Date(2021, 0, 15),
            _todayDate: function() {
              return new Date(2050, 0, 15);
            }
          });
          var todayCell = this.$element.find(("." + CALENDAR_TODAY_CLASS));
          assert.strictEqual($(todayCell).text(), '2050 - 2059');
        });
      });
      QUnit.module('MonthView min/max', {
        beforeEach: function() {
          fx.off = true;
          this.min = new Date(2010, 10, 5);
          this.max = new Date(2010, 10, 25);
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['month'](this.$element, {
            min: this.min,
            date: new Date(2010, 10, 10),
            value: new Date(2010, 10, 10),
            max: this.max
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('monthView should not display dates earlier than min and later than max by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '31123426272829301234567891011');
        });
      });
      QUnit.module('MonthView disabledDates', {
        beforeEach: function() {
          fx.off = true;
          this.disabledDates = function(args) {
            if (args.date.getDate() < 5) {
              return true;
            }
          };
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['month'](this.$element, {
            disabledDates: this.disabledDates,
            date: new Date(2010, 10, 10),
            value: new Date(2010, 10, 10)
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('monthView should not display disabled dates by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '12341234');
        });
      });
      QUnit.module('MonthView disabledDates as array', {
        beforeEach: function() {
          fx.off = true;
          this.disabledDates = [new Date(2010, 10, 1), new Date(2010, 10, 2), new Date(2010, 10, 3), new Date(2010, 10, 4)];
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['month'](this.$element, {
            disabledDates: this.disabledDates,
            date: new Date(2010, 10, 10),
            value: new Date(2010, 10, 10)
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('monthView should not display disabled dates by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '1234');
        });
      });
      QUnit.module('YearView min/max', {
        beforeEach: function() {
          fx.off = true;
          this.min = new Date(2015, 0, 18);
          this.max = new Date(2015, 6, 18);
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['year'](this.$element, {
            min: this.min,
            date: new Date(2015, 3, 15),
            max: this.max
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('yearView should add empty_class for cells out of range ', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 5, 'correct empty cells count was rendered');
        });
        QUnit.test('yearView should not display dates earlier than min and later than max by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, 'AugSepOctNovDec');
        });
      });
      QUnit.module('YearView disabledDates', {
        beforeEach: function() {
          fx.off = true;
          this.disabledDates = function(args) {
            if (args.date.getMonth() < 3) {
              return true;
            }
          };
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['year'](this.$element, {
            disabledDates: this.disabledDates,
            date: new Date(2015, 3, 15)
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('yearView should add empty_class for disabled dates', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 3, 'correct empty cells count was rendered');
        });
        QUnit.test('yearView should not display disabled dates by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, 'JanFebMar');
        });
      });
      QUnit.module('DecadeView min/max', {
        beforeEach: function() {
          fx.off = true;
          var min = new Date(2013, 0, 18);
          var max = new Date(2018, 6, 18);
          var currentDate = new Date(2015, 3, 15);
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, {
            min: min,
            max: max,
            value: currentDate,
            date: currentDate
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('decadeView should add empty_class for cells out of range ', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 6, 'correct empty cells count was rendered');
        });
        QUnit.test('decadeView should not display dates earlier than min and later than max by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '200920102011201220192020');
        });
      });
      QUnit.module('DecadeView disabledDates', {
        beforeEach: function() {
          fx.off = true;
          var currentDate = new Date(2015, 3, 15);
          this.disabledDates = function(args) {
            if (args.date.getFullYear() < 2013) {
              return true;
            }
          };
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, {
            disabledDates: this.disabledDates,
            value: currentDate,
            date: currentDate
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('decadeView should add empty_class for disabled dates', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 4, 'correct empty cells count was rendered');
        });
        QUnit.test('decadeView should not display disabled dates by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '2009201020112012');
        });
      });
      QUnit.module('CenturyView min/max', {
        beforeEach: function() {
          fx.off = true;
          this.min = new Date(2005, 0, 18);
          this.max = new Date(2075, 6, 18);
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['century'](this.$element, {
            min: this.min,
            value: new Date(2015, 3, 15),
            max: this.max
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('centuryView should add empty_class for cells out of range ', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 4, 'correct empty cells count was rendered');
        });
        QUnit.test('centuryView should not display dates earlier than min and later than max by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '1990 - 19992080 - 20892090 - 20992100 - 2109');
        });
      });
      QUnit.module('CenturyView disabledDates', {
        beforeEach: function() {
          fx.off = true;
          this.disabledDates = function(args) {
            if (args.date.getFullYear() < 2010) {
              return true;
            }
          };
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['century'](this.$element, {
            disabledDates: this.disabledDates,
            value: new Date(2015, 3, 15)
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('centuryView should add empty_class for disabled dates', function(assert) {
          assert.equal(this.$element.find('.' + CALENDAR_EMPTY_CELL_CLASS).length, 2, 'correct empty cells count was rendered');
        });
        QUnit.test('centuryView should not display disabled dates by decorating them with a CSS class', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var dateCellsText = dateCells.filter('.' + CALENDAR_EMPTY_CELL_CLASS).text();
          assert.equal(dateCellsText, '1990 - 19992000 - 2009');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/date","ui/calendar/ui.calendar.base_view","ui/calendar/ui.calendar.views","animation/fx","core/utils/date_serialization","ui/calendar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/date"), require("ui/calendar/ui.calendar.base_view"), require("ui/calendar/ui.calendar.views"), require("animation/fx"), require("core/utils/date_serialization"), require("ui/calendar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=calendarView.markup.tests.js.map