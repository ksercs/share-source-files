!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/dateRangeBox.startegy.tests.js"], ["jquery","animation/fx","core/element_data","ui/date_range_box","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/dateRangeBox.startegy.tests.js", ["jquery", "animation/fx", "core/element_data", "ui/date_range_box", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      dataUtils,
      CALENDAR_CELL_CLASS,
      STATE_FOCUSED_CLASS,
      POPUP_APPLY_BUTTON_CLASS,
      POPUP_DONE_BUTTON,
      POPUP_CANCEL_BUTTON,
      CALENDAR_DATE_VALUE_KEY,
      getStartDateBoxInstance,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dateRangeBox"></div>';
        $('#qunit-fixture').html(markup);
      });
      CALENDAR_CELL_CLASS = 'dx-calendar-cell';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      POPUP_APPLY_BUTTON_CLASS = 'dx-popup-done';
      POPUP_DONE_BUTTON = (POPUP_APPLY_BUTTON_CLASS + ".dx-button");
      POPUP_CANCEL_BUTTON = 'dx-popup-cancel.dx-button';
      CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
      getStartDateBoxInstance = function(dateRangeBoxInstance) {
        return dateRangeBoxInstance.getStartDateBox();
      };
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          fx.off = true;
          var init = function(options) {
            $__3.$element = $('#dateRangeBox').dxDateRangeBox(options);
            $__3.instance = $__3.$element.dxDateRangeBox('instance');
            $__3.startDateBox = $__3.instance.getStartDateBox();
            $__3.endDateBox = $__3.instance.getEndDateBox();
            $__3.getCalendar = function() {
              return $__3.instance.getStartDateBox()._strategy._widget;
            };
          };
          this.reinit = function(options) {
            $__3.instance.dispose();
            init(options);
          };
          init({
            value: ['2023/01/05', '2023/02/14'],
            multiView: true
          });
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      QUnit.module('Strategy', moduleConfig, function() {
        [{
          optionName: 'selectionMode',
          optionValue: 'range'
        }, {
          optionName: 'viewsCount',
          optionValue: 2
        }].forEach(function($__4) {
          var $__5 = $__4,
              optionName = $__5.optionName,
              optionValue = $__5.optionValue;
          QUnit.test(("Calendar should have " + optionName + " option equals " + optionValue), function(assert) {
            var startDateBox = getStartDateBoxInstance(this.instance);
            startDateBox.open();
            assert.strictEqual(startDateBox._strategy.widgetOption(optionName), optionValue);
          });
        });
        QUnit.test('Calendar should have "values" option equals to dateRangeBox "value"', function(assert) {
          var startDateBox = getStartDateBoxInstance(this.instance);
          startDateBox.open();
          assert.deepEqual(startDateBox._strategy.widgetOption('values'), this.instance.option('value'));
        });
        QUnit.module('Min/max options in views', {beforeEach: function() {
            var $__3 = this;
            this.getCalendarMinMax = function() {
              var $__4 = $__3.getCalendar().option(),
                  min = $__4.min,
                  max = $__4.max;
              return {
                calendarMin: min,
                calendarMax: max
              };
            };
            this.getViewMinMax = function() {
              var $__4 = $__3.getCalendar()._view.option(),
                  min = $__4.min,
                  max = $__4.max;
              return {
                viewMin: min,
                viewMax: max
              };
            };
          }}, function() {
          ['instantly', 'useButtons'].forEach(function(applyValueMode) {
            QUnit.test(("view min/max should be equal to calendar min/max on Popup open (applyValueMode = " + applyValueMode + ")"), function(assert) {
              this.reinit({
                value: ['2023/01/05', '2023/02/14'],
                applyValueMode: applyValueMode
              });
              this.instance.open();
              var $__4 = this.getCalendarMinMax(),
                  calendarMin = $__4.calendarMin,
                  calendarMax = $__4.calendarMax;
              var $__5 = this.getViewMinMax(),
                  viewMin = $__5.viewMin,
                  viewMax = $__5.viewMax;
              assert.strictEqual(viewMin, calendarMin, 'view and calendar min option is the same');
              assert.strictEqual(viewMax, calendarMax, 'view and calendar max option is the same');
            });
            QUnit.test(("min option in views should be equal to startDate after selecting startDate (applyValueMode = " + applyValueMode + ")"), function(assert) {
              this.reinit({applyValueMode: applyValueMode});
              this.instance.open();
              var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
              var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
              $startDateCell.trigger('dxclick');
              var calendarMax = this.getCalendarMinMax().calendarMax;
              var $__5 = this.getViewMinMax(),
                  viewMin = $__5.viewMin,
                  viewMax = $__5.viewMax;
              assert.deepEqual(viewMin, startCellDate, 'view min option equals start date');
              assert.strictEqual(calendarMax, viewMax, 'view max option is not changed');
            });
            QUnit.testInActiveWindow(("min option in views should be equal to startDate after focus startDate input (applyValueMode = " + applyValueMode + ")"), function(assert) {
              var initialValue = [new Date(2021, 9, 17), new Date(2021, 9, 20)];
              this.reinit({
                applyValueMode: applyValueMode,
                value: initialValue
              });
              $(this.instance.endDateField()).trigger('dxclick');
              var $__4 = this.getCalendarMinMax(),
                  calendarMin = $__4.calendarMin,
                  calendarMax = $__4.calendarMax;
              assert.strictEqual(this.getViewMinMax().viewMin, calendarMin, 'view min option equals calendarMin');
              assert.strictEqual(this.getViewMinMax().viewMax, calendarMax, 'view max option equals calendarMax');
              $(this.instance.startDateField()).focusin();
              assert.strictEqual(this.getViewMinMax().viewMin, calendarMin, 'view min option is not changed');
              assert.deepEqual(this.getViewMinMax().viewMax, initialValue[1], 'view max option is changed');
              $(this.instance.endDateField()).focusin();
              assert.strictEqual(this.getViewMinMax().viewMin, initialValue[0], 'view min option is changed');
              assert.deepEqual(this.getViewMinMax().viewMax, calendarMax, 'view max option is restored');
              $(this.instance.startDateField()).focusin();
              assert.strictEqual(this.getViewMinMax().viewMin, calendarMin, 'view min option is restored');
              assert.deepEqual(this.getViewMinMax().viewMax, initialValue[1], 'view max option is changed');
            });
            QUnit.test(("max option in views should be equal to endDate, min option in views should be restored after selecting startDate and endDate (applyValueMode = " + applyValueMode + ")"), function(assert) {
              this.reinit({
                applyValueMode: applyValueMode,
                multiView: true
              });
              this.instance.open();
              var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
              $startDateCell.trigger('dxclick');
              var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
              var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
              $endDateCell.trigger('dxclick');
              var calendarMin = this.getCalendarMinMax().calendarMin;
              var $__5 = this.getViewMinMax(),
                  viewMin = $__5.viewMin,
                  viewMax = $__5.viewMax;
              assert.strictEqual(viewMin, calendarMin, 'view min option restored to calendar min option');
              assert.deepEqual(viewMax, endCellDate, 'view max option equals endDate');
            });
            QUnit.test(("min and max options should be restored after selecting startDate and endDate and reopen popup (applyValueMode = " + applyValueMode + ")"), function(assert) {
              this.reinit({
                applyValueMode: applyValueMode,
                multiView: true
              });
              this.instance.open();
              var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
              $startDateCell.trigger('dxclick');
              var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
              $endDateCell.trigger('dxclick');
              if (applyValueMode === 'useButtons') {
                var $okButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_DONE_BUTTON));
                $okButton.trigger('dxclick');
              }
              this.instance.open();
              var $__4 = this.getCalendarMinMax(),
                  calendarMin = $__4.calendarMin,
                  calendarMax = $__4.calendarMax;
              var $__5 = this.getViewMinMax(),
                  viewMin = $__5.viewMin,
                  viewMax = $__5.viewMax;
              assert.strictEqual(viewMin, calendarMin, 'view min option restored to calendar min option');
              assert.strictEqual(viewMax, calendarMax, 'view max option restored to calendar max option');
            });
          });
        });
      });
      QUnit.module('RangeCalendar strategy: applyValueMode="instantly"', moduleConfig, function() {
        QUnit.test('StartDate value should be passed to startDateBox after click by calendar cell, value: [null, null]', function(assert) {
          this.reinit({
            applyValueMode: 'instantly',
            value: [null, null]
          });
          this.instance.open();
          var startDateBox = getStartDateBoxInstance(this.instance);
          assert.deepEqual(startDateBox._strategy.widgetOption('values'), [null, null]);
        });
        [[null, null], [new Date(2021, 9, 17), null], [null, new Date(2021, 10, 25)], [new Date(2021, 9, 17), new Date(2021, 10, 25)]].forEach(function(initialValue) {
          QUnit.test(("StartDateBox & EndDateBox should have correct date values after select start date and end date in calendar, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            this.reinit({
              applyValueMode: 'instantly',
              value: initialValue,
              multiView: true
            });
            this.instance.open();
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), initialValue, 'calendar value is correct');
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $startDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, initialValue[1]], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, initialValue[1]], 'calendar value is correct');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $endDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, endCellDate], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), endCellDate, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
          });
          QUnit.test(("onValueChanged should be called once with correct event argument on select start date and end date in calendar, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            var onValueChangedHandler = sinon.spy();
            this.reinit({
              applyValueMode: 'instantly',
              value: initialValue,
              onValueChanged: onValueChangedHandler,
              opened: true,
              multiView: true
            });
            var $cell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            $cell.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 1, 'onValueChanged was called once after select start date');
            assert.strictEqual(onValueChangedHandler.getCall(0).args[0].event.type, 'dxclick', 'event is correct');
            onValueChangedHandler.reset();
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            $endDateCell.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 1, 'onValueChanged was called once after select end date');
            assert.strictEqual(onValueChangedHandler.getCall(0).args[0].event.type, 'dxclick', 'event is correct');
          });
          QUnit.test(("StartDate value should be choosed first after opening by click on startDate field if openOnFieldClick is true, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            this.reinit({
              applyValueMode: 'instantly',
              value: initialValue,
              openOnFieldClick: true,
              multiView: true
            });
            $(this.instance.field()[0]).trigger('dxclick');
            assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $startDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, initialValue[1]], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, initialValue[1]], 'calendar value is correct');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $endDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, endCellDate], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), endCellDate, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
            assert.deepEqual(this.instance.option('opened'), false, 'dateRangeBox is closed');
          });
          QUnit.test(("EndDate value should be choosed first after opening by click on endDate field if openOnFieldClick is true, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            this.reinit({
              applyValueMode: 'instantly',
              value: initialValue,
              openOnFieldClick: true,
              multiView: true
            });
            $(this.instance.field()[1]).trigger('dxclick');
            assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $endDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [initialValue[0], endCellDate], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), endCellDate, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [initialValue[0], endCellDate], 'calendar value is correct');
            assert.deepEqual(this.instance.option('opened'), false, 'dateRangeBox is closed');
          });
        });
        QUnit.test('DateRangeBox should not be closed after select start date in calendar', function(assert) {
          this.reinit({
            applyValueMode: 'instantly',
            value: [null, null]
          });
          this.instance.open();
          assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
          var $cell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          $cell.trigger('dxclick');
          assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
        });
        ['td', 'span'].forEach(function(cellElement) {
          QUnit.test(("StartDateBox & EndDateBox should have correct date values after select end date in calendar by click on " + cellElement + " element"), function(assert) {
            this.reinit({
              applyValueMode: 'instantly',
              value: [null, null],
              multiView: true
            });
            this.instance.open();
            assert.deepEqual(this.instance.option('value'), [null, null], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), null, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), null, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [null, null], 'calendar value is correct');
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            (cellElement === 'td' ? $startDateCell : $startDateCell.find(cellElement)).trigger('dxclick');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            (cellElement === 'td' ? $endDateCell : $endDateCell.find(cellElement)).trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, endCellDate], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), endCellDate, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
          });
        });
        QUnit.test('DateRangeBox should be closed after select end date in calendar', function(assert) {
          this.reinit({
            applyValueMode: 'instantly',
            value: [null, null],
            multiView: true
          });
          this.instance.open();
          assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          $startDateCell.trigger('dxclick');
          var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
          $endDateCell.trigger('dxclick');
          assert.deepEqual(this.instance.option('opened'), false, 'dateRangeBox is closed');
        });
        QUnit.testInActiveWindow('DateRangeBox & End DateBox should have focus class after select end date', function(assert) {
          this.reinit({
            applyValueMode: 'instantly',
            value: [null, null],
            focusStateEnabled: true,
            multiView: true
          });
          this.instance.open();
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), false, 'dateRangeBox has no focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'endDateBox has no focus state class');
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          $startDateCell.trigger('dxclick');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'endDateBox has focus state class');
          var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
          $endDateCell.trigger('dxclick');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'endDateBox has focus state class');
        });
        QUnit.test('Popup should not break after selecting values by click and updating min option that triggers invalidate', function(assert) {
          this.reinit({
            applyValueMode: 'instantly',
            value: [null, null],
            opened: true
          });
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(22);
          $startDateCell.trigger('dxclick');
          $endDateCell.trigger('dxclick');
          this.instance.option('min', new Date('2000/01/01'));
          this.instance.open();
          assert.strictEqual(this.instance.option('opened'), true);
        });
      });
      QUnit.module('RangeCalendar strategy: applyValueMode="useButtons"', moduleConfig, function() {
        [[null, null], [new Date(2021, 9, 17), null], [null, new Date(2021, 10, 25)], [new Date(2021, 9, 17), new Date(2021, 10, 25)]].forEach(function(initialValue) {
          QUnit.test(("StartDateBox & EndDateBox should change value after select start date and end date in calendar and click ok button, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            this.reinit({
              applyValueMode: 'useButtons',
              value: initialValue,
              multiView: true
            });
            this.instance.open();
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), initialValue, 'calendar value is correct');
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $startDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is not changed');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is not changed');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is not changed');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, initialValue[1]], 'calendar value is correct');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $endDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is not changed');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is not changed');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is not changed');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
            var $okButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_DONE_BUTTON));
            $okButton.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), [startCellDate, endCellDate], 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), endCellDate, 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
          });
          QUnit.test(("StartDateBox & EndDateBox should not change value after select start date and end date in calendar and click cancel button, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            this.reinit({
              applyValueMode: 'useButtons',
              value: initialValue,
              multiView: true
            });
            this.instance.open();
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is correct');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is correct');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is correct');
            assert.deepEqual(this.getCalendar().option('values'), initialValue, 'calendar value is correct');
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $startDateCell.trigger('dxclick');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            var endCellDate = dataUtils.data($endDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
            $endDateCell.trigger('dxclick');
            assert.deepEqual(this.getCalendar().option('values'), [startCellDate, endCellDate], 'calendar value is correct');
            var $cancelButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_CANCEL_BUTTON));
            $cancelButton.trigger('dxclick');
            assert.deepEqual(this.instance.option('value'), initialValue, 'dateRangeBox value is not changed');
            assert.deepEqual(this.startDateBox.option('value'), initialValue[0], 'startDateBox value is not changed');
            assert.deepEqual(this.endDateBox.option('value'), initialValue[1], 'endDateBox value is not changed');
            assert.deepEqual(this.getCalendar().option('values'), initialValue, 'calendar is not changed');
          });
          QUnit.test(("onValueChanged should not be called on select start date and end date in calendar, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            var onValueChangedHandler = sinon.spy();
            this.reinit({
              applyValueMode: 'useButtons',
              value: initialValue,
              onValueChanged: onValueChangedHandler,
              opened: true,
              multiView: true
            });
            var $cell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            $cell.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 0, 'onValueChanged was not called after select start date');
            onValueChangedHandler.reset();
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            $endDateCell.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 0, 'onValueChanged was not called after select end date');
          });
          QUnit.test(("onValueChanged should be called with correct event argument on select start date and end date in calendar and click apply button, initialValue: " + JSON.stringify(initialValue)), function(assert) {
            var onValueChangedHandler = sinon.spy();
            this.reinit({
              applyValueMode: 'useButtons',
              value: initialValue,
              onValueChanged: onValueChangedHandler,
              opened: true,
              multiView: true
            });
            var checkEventHandlerArgs = function(event) {
              var $__4 = event,
                  type = $__4.type,
                  target = $__4.target;
              assert.strictEqual(type, 'dxclick', 'event is correct');
              assert.strictEqual($(target).hasClass(POPUP_APPLY_BUTTON_CLASS), true, 'event target is correct');
            };
            var $cell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            $cell.trigger('dxclick');
            var $applyButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_DONE_BUTTON));
            $applyButton.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 1, 'onValueChanged was called once after select start date and click on apply button');
            checkEventHandlerArgs(onValueChangedHandler.getCall(0).args[0].event);
            onValueChangedHandler.reset();
            $(this.instance.endDateField()).trigger('dxclick');
            var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
            $endDateCell.trigger('dxclick');
            $applyButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_DONE_BUTTON));
            $applyButton.trigger('dxclick');
            assert.strictEqual(onValueChangedHandler.callCount, 1, 'onValueChanged was called once after select end date and click on apply button');
            checkEventHandlerArgs(onValueChangedHandler.getCall(0).args[0].event);
          });
        });
        QUnit.test('It should be possible to select only startDate and apply value by click on ok button', function(assert) {
          this.reinit({
            applyValueMode: 'useButtons',
            opened: true
          });
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          var startCellDate = dataUtils.data($startDateCell.get(0), CALENDAR_DATE_VALUE_KEY);
          $startDateCell.trigger('dxclick');
          assert.deepEqual(this.instance.option('value'), [null, null], 'dateRangeBox value is not changed');
          assert.deepEqual(this.startDateBox.option('value'), null, 'startDateBox value is not changed');
          assert.deepEqual(this.endDateBox.option('value'), null, 'endDateBox value is not changed');
          assert.deepEqual(this.getCalendar().option('values'), [startCellDate, null], 'calendar value is correct');
          var $okButton = $(this.instance.getStartDateBox().content()).parent().find(("." + POPUP_DONE_BUTTON));
          $okButton.trigger('dxclick');
          assert.deepEqual(this.instance.option('value'), [startCellDate, null], 'dateRangeBox value is correct');
          assert.deepEqual(this.startDateBox.option('value'), startCellDate, 'startDateBox value is correct');
          assert.deepEqual(this.endDateBox.option('value'), null, 'endDateBox value is not changed');
          assert.deepEqual(this.getCalendar().option('values'), [startCellDate, null], 'calendar value is correct');
        });
        ['ok', 'cancel'].forEach(function(button) {
          QUnit.test(("DateRangeBox should be closed after click on " + button + " button"), function(assert) {
            this.reinit({
              applyValueMode: 'useButtons',
              value: [null, null],
              opened: true
            });
            assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
            var buttonClass = button === 'ok' ? POPUP_DONE_BUTTON : POPUP_CANCEL_BUTTON;
            var $button = $(this.instance.getStartDateBox().content()).parent().find(("." + buttonClass));
            $button.trigger('dxclick');
            assert.deepEqual(this.instance.option('opened'), false, 'dateRangeBox is closed');
          });
          QUnit.testInActiveWindow(("DateRangeBox and StartDateBox should be focused after click on " + button + " button after select start date"), function(assert) {
            this.reinit({
              applyValueMode: 'useButtons',
              value: [null, null]
            });
            this.instance.open();
            var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
            $startDateCell.trigger('dxclick');
            assert.deepEqual(this.instance.option('opened'), true, 'dateRangeBox is opened');
            assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
            assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
            assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'endDateBox has focus state class');
            var buttonClass = button === 'ok' ? POPUP_DONE_BUTTON : POPUP_CANCEL_BUTTON;
            var $button = $(this.instance.getStartDateBox().content()).parent().find(("." + buttonClass));
            $button.trigger('dxclick');
            assert.deepEqual(this.instance.option('opened'), false, 'dateRangeBox is closed');
            assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
            assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'startDateBox has focus state class');
            assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'endDateBox has no focus state class');
          });
        });
        QUnit.testInActiveWindow('DateRangeBox & EndDateBox should have focus class after select start date', function(assert) {
          this.reinit({
            applyValueMode: 'useButtons',
            value: [null, null],
            focusStateEnabled: true
          });
          this.instance.open();
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), false, 'dateRangeBox has no focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'endDateBox has no focus state class');
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          $startDateCell.trigger('dxclick');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'endDateBox has focus state class');
        });
        QUnit.testInActiveWindow('DateRangeBox & StartDateBox should have focus class after select start date', function(assert) {
          this.reinit({
            applyValueMode: 'useButtons',
            value: [null, null],
            focusStateEnabled: true,
            multiView: true
          });
          this.instance.open();
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), false, 'dateRangeBox has no focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'endDateBox has no focus state class');
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          $startDateCell.trigger('dxclick');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'endDateBox has focus state class');
          var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(140);
          $endDateCell.trigger('dxclick');
          assert.strictEqual(this.$element.hasClass(STATE_FOCUSED_CLASS), true, 'dateRangeBox has focus state class');
          assert.strictEqual(this.instance.getStartDateBox().$element().hasClass(STATE_FOCUSED_CLASS), true, 'startDateBox has no focus state class');
          assert.strictEqual(this.instance.getEndDateBox().$element().hasClass(STATE_FOCUSED_CLASS), false, 'endDateBox has focus state class');
        });
        QUnit.test('Popup should not break after selecting values by click and updating min option that triggers invalidate', function(assert) {
          this.reinit({
            applyValueMode: 'useButtons',
            value: [null, null],
            opened: true
          });
          var $startDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(20);
          var $endDateCell = $(this.getCalendar().$element()).find(("." + CALENDAR_CELL_CLASS)).eq(22);
          $startDateCell.trigger('dxclick');
          $endDateCell.trigger('dxclick');
          this.instance.option('min', new Date('2000/01/01'));
          this.instance.open();
          assert.strictEqual(this.instance.option('opened'), true);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","core/element_data","ui/date_range_box","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("core/element_data"), require("ui/date_range_box"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dateRangeBox.startegy.tests.js.map