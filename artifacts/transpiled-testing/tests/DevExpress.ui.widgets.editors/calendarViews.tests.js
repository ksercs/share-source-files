!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/calendarViews.tests.js"], ["jquery","core/utils/common","core/utils/date","ui/calendar/ui.calendar.base_view","ui/calendar/ui.calendar.views","../../helpers/pointerMock.js","animation/fx","core/utils/date_serialization","localization/date","ui/calendar"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/calendarViews.tests.js", ["jquery", "core/utils/common", "core/utils/date", "ui/calendar/ui.calendar.base_view", "ui/calendar/ui.calendar.views", "../../helpers/pointerMock.js", "animation/fx", "core/utils/date_serialization", "localization/date", "ui/calendar"], function($__export) {
  "use strict";
  var $,
      noop,
      dateUtils,
      BaseView,
      Views,
      pointerMock,
      fx,
      dateSerialization,
      dateLocalization,
      CALENDAR_EMPTY_CELL_CLASS,
      CALENDAR_CELL_CLASS,
      CALENDAR_SELECTED_DATE_CLASS,
      CALENDAR_CONTOURED_DATE_CLASS,
      CALENDAR_WEEK_NUMBER_CELL_CLASS,
      UP_ARROW_KEY_CODE,
      DOWN_ARROW_KEY_CODE,
      getShortDate,
      FakeView;
  function triggerKeydown(key, $element) {
    var e = $.Event('keydown', {key: key});
    $element.find('table').trigger(e);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      BaseView = $__m.default;
    }, function($__m) {
      Views = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dateSerialization = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {}],
    execute: function() {
      CALENDAR_EMPTY_CELL_CLASS = 'dx-calendar-empty-cell';
      CALENDAR_CELL_CLASS = 'dx-calendar-cell';
      CALENDAR_SELECTED_DATE_CLASS = 'dx-calendar-selected-date';
      CALENDAR_CONTOURED_DATE_CLASS = 'dx-calendar-contoured-date';
      CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
      UP_ARROW_KEY_CODE = 'ArrowUp';
      DOWN_ARROW_KEY_CODE = 'ArrowDown';
      getShortDate = function(date) {
        return dateSerialization.serializeDate(date, dateUtils.getShortDateFormat());
      };
      FakeView = BaseView.inherit({
        _isTodayCell: noop,
        _isDateOutOfRange: function() {
          return false;
        },
        _isOtherView: noop,
        _getCellText: noop,
        _getFirstCellData: noop,
        _getNextCellData: noop,
        _getCellByDate: noop,
        _renderWeekNumberCell: noop,
        isBoundary: noop,
        _renderValue: noop
      });
      QUnit.module('Basics', function() {
        QUnit.test('no contouredDate is set by default', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          try {
            var view = new FakeView($element, {});
            assert.equal(view.option('contouredDate'), null, 'contoured Date is null');
          } finally {
            $element.remove();
          }
        });
        QUnit.test('onCellClick should not be fired on out of range cells', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          try {
            var spy = sinon.spy();
            new FakeView($element, {onCellClick: spy});
            $element.find('.' + CALENDAR_CELL_CLASS).addClass(CALENDAR_EMPTY_CELL_CLASS);
            $element.find('.' + CALENDAR_CELL_CLASS).eq(5).trigger('dxclick');
            assert.equal(spy.callCount, 0, 'onCellClick was not called');
          } finally {
            $element.remove();
          }
        });
        QUnit.test('Calendar should set first day by firstDayOfWeek option if it is setted and this is different in localization', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          var spy = sinon.spy(dateLocalization, 'firstDayOfWeekIndex');
          this.view = new Views['month']($element, {
            date: new Date(2017, 11, 11),
            firstDayOfWeek: 0
          });
          assert.notOk(spy.called, 'firstDayOfWeekIndex wasn\'t called');
          $element.remove();
        });
      });
      QUnit.module('MonthView', {
        beforeEach: function() {
          fx.off = true;
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
          fx.off = false;
        }
      }, function() {
        QUnit.test('onCellClick action should be fired on cell click', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          try {
            var spy = sinon.spy();
            this.reinit({
              showWeekNumbers: true,
              onCellClick: spy,
              weekNumberRule: 'firstDay'
            });
            this.$element.find('td').eq(4).trigger('dxclick');
            assert.ok(spy.calledOnce, 'onCellClick fired once');
          } finally {
            $element.remove();
          }
        });
        QUnit.test('getNavigatorCaption must return a proper caption', function(assert) {
          assert.equal(this.view.getNavigatorCaption(), 'October 2013', 'caption is correct');
        });
        QUnit.test('getNavigatorCaption must return a proper caption in RTL mode', function(assert) {
          this.view.option('rtlEnabled', true);
          assert.equal(this.view.getNavigatorCaption(), 'October 2013', 'caption is correct');
        });
        QUnit.test('change value option must add a CSS class to a cell', function(assert) {
          var secondDate = new Date(2013, 9, 1);
          var secondDateCell = this.$element.find('table').find('td').eq(1);
          this.view.option('value', secondDate);
          assert.ok(secondDateCell.hasClass(CALENDAR_SELECTED_DATE_CLASS));
        });
        QUnit.test('it should be possible to specify contouredDate via the constructor', function(assert) {
          var date = new Date(2013, 9, 1);
          this.reinit({
            date: new Date(2013, 9, 16),
            contouredDate: date
          });
          assert.strictEqual(this.view.option('contouredDate'), date);
        });
        QUnit.test('changing contouredDate must add CALENDAR_CONTOURED_DATE_CLASS class to a cell', function(assert) {
          var date = new Date(2013, 9, 1);
          var dateCell = this.$element.find('table').find('td').eq(1);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must remove CALENDAR_CONTOURED_DATE_CLASS class from the old cell', function(assert) {
          var date = new Date(2013, 9, 1);
          var newDate = new Date(2013, 9, 2);
          var dateCell = this.$element.find('table').find('td').eq(1);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
          this.view.option('contouredDate', newDate);
          assert.ok(!dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('if option.disabled is set in a constructor, cells should not be clickable', function(assert) {
          assert.expect(0);
          this.reinit({disabled: true});
          this.view.cellClickHandler = function() {
            assert.ok(false);
          };
          var date = this.$element.find('table').find('td')[0];
          pointerMock(date).click();
        });
        QUnit.test('cell data-value has correct year after render in month view for the first century (T929559)', function(assert) {
          var startDate = new Date(2013, 9, 16);
          startDate.setFullYear(14);
          this.reinit({
            min: new Date(-10, 1, 1),
            value: startDate,
            date: startDate
          });
          var dateCell = this.$element.find('table').find('td').eq(7);
          var cellDate = $(dateCell).data().value;
          assert.strictEqual(cellDate.substring(0, 4), '0014');
        });
        QUnit.test('onCellClick should not be fired on week number cells', function(assert) {
          var clickHandler = sinon.spy(noop);
          this.reinit({
            currentDate: new Date(2010, 10, 10),
            focusStateEnabled: true,
            showWeekNumbers: true,
            zoomLevel: 'month',
            onCellClick: clickHandler
          });
          var $weekCell = this.$element.find(("." + CALENDAR_WEEK_NUMBER_CELL_CLASS));
          assert.strictEqual($weekCell.length, 6, 'week cells count');
          $($weekCell.eq(2)).trigger('dxclick');
          assert.strictEqual(clickHandler.callCount, 0, 'onCellClick was not called');
        });
        [{
          currentDate: new Date(2012, 0, 1),
          expectedWeekNumbers: [52, 1, 2, 3, 4, 5]
        }, {
          currentDate: new Date(2007, 0, 1),
          expectedWeekNumbers: [52, 1, 2, 3, 4, 5]
        }, {
          currentDate: new Date(2007, 11, 31),
          expectedWeekNumbers: [48, 49, 50, 51, 52, 1]
        }, {
          currentDate: new Date(2002, 11, 31),
          expectedWeekNumbers: [48, 49, 50, 51, 52, 1]
        }, {
          currentDate: new Date(2008, 11, 29),
          expectedWeekNumbers: [48, 49, 50, 51, 52, 1]
        }, {
          currentDate: new Date(2009, 11, 28),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2010, 11, 27),
          expectedWeekNumbers: [48, 49, 50, 51, 52, 1]
        }, {
          currentDate: new Date(2004, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2009, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2015, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2020, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2026, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2032, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2037, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2043, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2048, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2054, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2060, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2065, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2071, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2076, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2082, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2088, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2093, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2099, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2105, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2111, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2116, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2122, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2128, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2133, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2139, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2144, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2150, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2156, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2161, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2167, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2172, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2178, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2184, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2189, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2195, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2201, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2207, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2212, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2218, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2224, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2229, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2235, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2240, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2246, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2252, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2257, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2263, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2268, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2274, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2280, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2285, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2291, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2296, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2303, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2308, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2314, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2320, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2325, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2331, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2336, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2342, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2348, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2353, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2359, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2364, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2370, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2376, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2381, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2387, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2392, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }, {
          currentDate: new Date(2398, 11, 31),
          expectedWeekNumbers: [49, 50, 51, 52, 53, 1]
        }].forEach(function($__1) {
          var $__2 = $__1,
              currentDate = $__2.currentDate,
              expectedWeekNumbers = $__2.expectedWeekNumbers;
          QUnit.test(("iso week numbers of 'month' view with date: " + currentDate.toLocaleDateString()), function(assert) {
            this.reinit({
              value: currentDate,
              date: currentDate,
              showWeekNumbers: true,
              weekNumberRule: 'firstFourDays',
              firstDayOfWeek: 1,
              zoomLevel: 'month'
            });
            var $weekCell = this.$element.find(("." + CALENDAR_WEEK_NUMBER_CELL_CLASS));
            var actualWeekNumbers = $weekCell.map(function() {
              return Number($(this).text());
            }).get();
            assert.deepEqual(actualWeekNumbers, expectedWeekNumbers, 'week cell numbers');
          });
        });
        [0, 1, 2, 3, 4, 5, 6].forEach(function(firstDayOfWeek) {
          QUnit.test(("count years with iso week 53, firstDayOfWeek: " + firstDayOfWeek), function(assert) {
            var count = 0;
            for (var i = 0; i < 400; i++) {
              this.reinit({
                value: new Date(2000 + i, 11, 31),
                date: new Date(2000 + i, 11, 31),
                showWeekNumbers: true,
                weekNumberRule: 'firstFourDays',
                firstDayOfWeek: firstDayOfWeek,
                zoomLevel: 'month'
              });
              var $weekCell = this.$element.find(("." + CALENDAR_WEEK_NUMBER_CELL_CLASS));
              var actualWeekNumbers = $weekCell.map(function() {
                return Number($(this).text());
              }).get();
              if (actualWeekNumbers.indexOf(53) !== -1) {
                count++;
              }
            }
            assert.equal(count, 71, 'Should have 71 years with iso week 53');
          });
          QUnit.test(("count years with iso week 53, firstDayOfWeek: " + firstDayOfWeek), function(assert) {
            var count = 0;
            for (var i = 0; i < 400; i++) {
              this.reinit({
                value: new Date(2001 + i, 0, 1),
                date: new Date(2001 + i, 0, 1),
                showWeekNumbers: true,
                weekNumberRule: 'firstFourDays',
                firstDayOfWeek: firstDayOfWeek,
                zoomLevel: 'month'
              });
              var $weekCell = this.$element.find(("." + CALENDAR_WEEK_NUMBER_CELL_CLASS));
              var actualWeekNumbers = $weekCell.map(function() {
                return Number($(this).text());
              }).get();
              if (actualWeekNumbers.indexOf(53) !== -1 || (dateUtils.getWeekNumber(new Date(2000 + i, 11, 31), firstDayOfWeek, 'firstFourDays') === 53 && actualWeekNumbers[0] === 1)) {
                count++;
              }
            }
            assert.equal(count, 71, 'Should have 71 years with iso week 53');
          });
          QUnit.test(("count years with iso week 52, firstDayOfWeek: " + firstDayOfWeek), function(assert) {
            var count = 0;
            for (var i = 0; i < 400; i++) {
              this.reinit({
                value: new Date(2000 + i, 11, 31),
                date: new Date(2000 + i, 11, 31),
                showWeekNumbers: true,
                weekNumberRule: 'firstFourDays',
                firstDayOfWeek: firstDayOfWeek,
                zoomLevel: 'month'
              });
              var $weekCell = this.$element.find(("." + CALENDAR_WEEK_NUMBER_CELL_CLASS));
              var actualWeekNumbers = $weekCell.map(function() {
                return Number($(this).text());
              }).get();
              if (actualWeekNumbers.indexOf(53) === -1) {
                count++;
              }
            }
            assert.equal(count, 329, 'Should have 329 years with iso week 52');
          });
        });
      });
      QUnit.module('YearView', {
        beforeEach: function() {
          fx.off = true;
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
          fx.off = false;
        }
      }, function() {
        QUnit.test('getNavigatorCaption must return a proper caption', function(assert) {
          assert.strictEqual(this.view.getNavigatorCaption().toString(), '2013');
        });
        QUnit.test('change value option must add a CSS class to a cell', function(assert) {
          var secondDate = new Date(2013, 1, 1);
          var secondDateCell = this.$element.find('table').find('td').eq(1);
          this.view.option('value', secondDate);
          assert.ok(secondDateCell.hasClass(CALENDAR_SELECTED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must add CALENDAR_CONTOURED_DATE_CLASS class to a cell', function(assert) {
          var date = new Date(2013, 4, 1);
          var dateCell = this.$element.find('table').find('td').eq(4);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must remove CALENDAR_CONTOURED_DATE_CLASS class from the old cell', function(assert) {
          var date = new Date(2013, 9, 1);
          var newDate = new Date(2013, 4, 1);
          var dateCell = this.$element.find('table').find('td').eq(9);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
          this.view.option('contouredDate', newDate);
          assert.ok(!dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
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
        QUnit.test('getNavigatorCaption must return a proper caption', function(assert) {
          assert.strictEqual(this.view.getNavigatorCaption(), '2010-2019');
        });
        QUnit.test('change value option must add a CSS class to a cell', function(assert) {
          var secondDate = new Date(2010, 1, 1);
          var secondDateCell = this.$element.find('table').find('td').eq(1);
          this.view.option('value', secondDate);
          assert.ok(secondDateCell.hasClass(CALENDAR_SELECTED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must add CALENDAR_CONTOURED_DATE_CLASS class to a cell', function(assert) {
          var date = new Date(2012, 1, 1);
          var dateCell = this.$element.find('table').find('td').eq(3);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must remove CALENDAR_CONTOURED_DATE_CLASS class from the old cell', function(assert) {
          var date = new Date(2012, 1, 1);
          var newDate = new Date(2016, 1, 1);
          var dateCell = this.$element.find('table').find('td').eq(3);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
          this.view.option('contouredDate', newDate);
          assert.ok(!dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('data-value after render for cells in decade view', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var startYear = 2009;
          $.each(dateCells, function(_, dateCell) {
            var shortDate = getShortDate(new Date(startYear, 0, 1));
            assert.equal(shortDate, $(dateCell).data().value, 'data-value has a current value');
            startYear++;
          });
        });
        QUnit.test('text and data-value after render for cells in decade view for the first century (T929559)', function(assert) {
          var startYear = 9;
          var startDate = new Date(14, 9, 16);
          startDate.setFullYear(14);
          this.reinit({
            min: new Date(-10, 1, 1),
            value: startDate,
            date: startDate
          });
          var dateCells = this.$element.find('table').find('td');
          $.each(dateCells, function(_, dateCell) {
            var expectedDate = new Date(startYear, 0, 1);
            expectedDate.setFullYear(startYear);
            var shortDate = getShortDate(expectedDate);
            var startYearString = ('000' + startYear).slice(-4);
            assert.strictEqual($(dateCell).text(), startYearString, 'correct cell text');
            assert.strictEqual($(dateCell).data().value, shortDate, 'data-value has a current value');
            startYear++;
          });
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
        QUnit.test('getNavigatorCaption must return a proper caption', function(assert) {
          assert.strictEqual(this.view.getNavigatorCaption(), '2000-2099');
        });
        QUnit.test('data-value after render for cells in century view', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          var startYear = 1990;
          $.each(dateCells, function(_, dateCell) {
            var shortDate = getShortDate(new Date(startYear, 0, 1));
            assert.equal(shortDate, $(dateCell).data().value, 'data-value has a current value');
            startYear += 10;
          });
        });
        QUnit.test('changing contouredDate must add CALENDAR_CONTOURED_DATE_CLASS class to a cell', function(assert) {
          var date = new Date(2030, 1, 1);
          var dateCell = this.$element.find('table').find('td').eq(4);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
        });
        QUnit.test('changing contouredDate must remove CALENDAR_CONTOURED_DATE_CLASS class from the old cell', function(assert) {
          var date = new Date(2030, 1, 1);
          var newDate = new Date(2050, 1, 1);
          var dateCell = this.$element.find('table').find('td').eq(4);
          this.view.option('contouredDate', date);
          assert.ok(dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
          this.view.option('contouredDate', newDate);
          assert.ok(!dateCell.hasClass(CALENDAR_CONTOURED_DATE_CLASS));
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
        QUnit.test('monthView should not allow to select dates earlier than min and later than max via pointer events', function(assert) {
          var dateCells = this.$element.find('table').find('td');
          pointerMock(dateCells[0]).click();
          assert.ok(this.min.valueOf() < this.view.option('value').valueOf());
          pointerMock(dateCells[dateCells.length - 1]).click();
          assert.ok(this.max.valueOf() > this.view.option('value').valueOf());
        });
        QUnit.test('monthView should not allow to navigate to a date earlier than min and later than max via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', this.min);
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.min);
          view.option('contouredDate', this.max);
          triggerKeydown(DOWN_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.max);
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
        QUnit.test('monthView should not allow to select disabled dates via pointer events', function(assert) {
          var disabledDays = [1, 2, 3, 4];
          var dateCells = this.$element.find('table').find('td');
          pointerMock(dateCells[0]).click();
          assert.ok(disabledDays.indexOf(this.view.option('value').getDate()));
        });
        QUnit.test('monthView should not allow to navigate to a disabled date', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', new Date(2010, 10, 5));
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), new Date(2010, 10, 5));
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
        QUnit.test('monthView should not allow to select disabled dates via pointer events', function(assert) {
          var disabledDays = [1, 2, 3, 4];
          var dateCells = this.$element.find('table').find('td');
          pointerMock(dateCells[0]).click();
          assert.ok(disabledDays.indexOf(this.view.option('value').getDate()));
        });
        QUnit.test('monthView should not allow to navigate to a disabled date', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', new Date(2010, 10, 5));
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), new Date(2010, 10, 5));
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
        QUnit.test('yearView should not allow to navigate to a date earlier than min and later than max via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', this.min);
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.min);
          view.option('contouredDate', this.max);
          triggerKeydown(DOWN_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.max);
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
        QUnit.test('yearView should not allow to navigate to a disabled date via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', new Date(2015, 3, 15));
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), new Date(2015, 3, 15));
        });
      });
      QUnit.module('DecadeView min/max', {
        beforeEach: function() {
          fx.off = true;
          this.min = new Date(2013, 0, 18);
          this.max = new Date(2018, 6, 18);
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, {
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
        QUnit.test('decadeView should not allow to navigate to a date earlier than min and later than max via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', this.min);
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.min);
          view.option('contouredDate', this.max);
          triggerKeydown(DOWN_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.max);
        });
      });
      QUnit.module('DecadeView disabledDates', {
        beforeEach: function() {
          fx.off = true;
          this.disabledDates = function(args) {
            if (args.date.getFullYear() < 2013) {
              return true;
            }
          };
          this.$element = $('<div>').appendTo('#qunit-fixture');
          this.view = new Views['decade'](this.$element, {
            disabledDates: this.disabledDates,
            value: new Date(2015, 3, 15)
          });
        },
        afterEach: function() {
          this.$element.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('decadeView should not allow to navigate to a disabled date via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', new Date(2015, 3, 15));
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), new Date(2015, 3, 15));
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
        QUnit.test('centuryView should not allow to navigate to a date earlier than min and later than max via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', this.min);
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.min);
          view.option('contouredDate', this.max);
          triggerKeydown(DOWN_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), this.max);
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
        QUnit.test('centuryView should not allow to navigate to a disabled date via keyboard events', function(assert) {
          var $element = this.$element;
          var view = this.view;
          view.option('contouredDate', new Date(2070, 0, 15));
          triggerKeydown(UP_ARROW_KEY_CODE, $element);
          assert.deepEqual(view.option('contouredDate'), new Date(2070, 0, 15));
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('getCellAriaLabel method', function(assert) {
          var expectations = {
            'month': 'Monday, June 1, 2015',
            'year': 'June 2015',
            'decade': '2015',
            'century': '2010 - 2019'
          };
          $.each(['month', 'year', 'decade', 'century'], function(_, type) {
            var $element = $('<div>').appendTo('#qunit-fixture');
            new Views[type]($element, {
              date: new Date(2015, 5, 1),
              value: new Date(2015, 5, 1),
              contouredDate: new Date(2015, 5, 1),
              firstDayOfWeek: 1,
              focusStateEnabled: true
            });
            try {
              var $cell = $element.find('.' + CALENDAR_CONTOURED_DATE_CLASS);
              assert.equal($cell.attr('aria-label'), expectations[type], 'aria label is correct');
            } finally {
              $element.remove();
            }
          });
        });
        QUnit.test('check roles across the views', function(assert) {
          ['month', 'year', 'decade', 'century'].forEach(function(viewName) {
            var $element = $('<div>').appendTo('#qunit-fixture');
            new Views[viewName]($element, {
              date: new Date(2015, 5, 1),
              value: new Date(2015, 5, 1),
              contouredDate: new Date(2015, 5, 1),
              firstDayOfWeek: 1,
              focusStateEnabled: true
            });
            try {
              var $cell = $element.find(("." + CALENDAR_CONTOURED_DATE_CLASS));
              var $row = $cell.closest('tr');
              var $table = $row.closest('table');
              assert.equal($cell.attr('role'), 'gridcell', (viewName + " - cell role is correct"));
              assert.equal($row.attr('role'), 'row', (viewName + " - row role is correct"));
              assert.equal($table.attr('role'), 'grid', (viewName + " - table role is correct"));
            } finally {
              $element.remove();
            }
          });
        });
        QUnit.test('header row of the Month view should have correct attributes', function(assert) {
          var $element = $('<div>').appendTo('#qunit-fixture');
          var view = new Views.month($element, {
            date: new Date(2015, 5, 1),
            value: new Date(2015, 5, 1),
            contouredDate: new Date(2015, 5, 1),
            firstDayOfWeek: 1,
            focusStateEnabled: true
          });
          var $headerCells = $element.find('thead > tr').first().find('th');
          $headerCells.each(function(index, cell) {
            var scope = cell.getAttribute('scope');
            var abbr = cell.getAttribute('abbr');
            var cellText = cell.textContent;
            var $__1 = view._getDayCaption(1 + index),
                fullDayCaption = $__1.full,
                shortDayCaption = $__1.abbreviated;
            assert.strictEqual(scope, 'col', ("\"" + cellText + "\" cell: correct header cell role"));
            assert.strictEqual(abbr, fullDayCaption, ("\"" + cellText + "\" cell: correct cell \"abbr\" attribute"));
            assert.strictEqual(cellText, shortDayCaption, ("\"" + cellText + "\" cell: correct cell text"));
          });
          $element.remove();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/utils/date","ui/calendar/ui.calendar.base_view","ui/calendar/ui.calendar.views","../../helpers/pointerMock.js","animation/fx","core/utils/date_serialization","localization/date","ui/calendar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/utils/date"), require("ui/calendar/ui.calendar.base_view"), require("ui/calendar/ui.calendar.views"), require("../../helpers/pointerMock.js"), require("animation/fx"), require("core/utils/date_serialization"), require("localization/date"), require("ui/calendar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=calendarViews.tests.js.map