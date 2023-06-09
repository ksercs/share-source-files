!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/timeView.tests.js"], ["jquery","localization/date","../../helpers/keyboardMock.js","ui/date_box/ui.time_view"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/timeView.tests.js", ["jquery", "localization/date", "../../helpers/keyboardMock.js", "ui/date_box/ui.time_view"], function($__export) {
  "use strict";
  var $,
      dateLocalization,
      keyboardMock,
      TIMEVIEW_CLASS,
      TIMEVIEW_CLOCK_CLASS,
      TIMEVIEW_FIELD_CLASS,
      TIMEVIEW_HOURARROW_CLASS,
      TIMEVIEW_MINUTEARROW_CLASS,
      TIMEVIEW_TIME_SEPARATOR_CLASS,
      TIMEVIEW_FORMAT12_CLASS,
      TIMEVIEW_FORMAT12_AM,
      TIMEVIEW_FORMAT12_PM,
      BOX_CLASS,
      NUMBERBOX_CLASS,
      INPUT_CLASS,
      NUMBERBOX_SPIN_UP_BUTTON_CLASS,
      TEXTEDITOR_INPUT_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="timeView"></div>';
        $('#qunit-fixture').html(markup);
      });
      TIMEVIEW_CLASS = 'dx-timeview';
      TIMEVIEW_CLOCK_CLASS = 'dx-timeview-clock';
      TIMEVIEW_FIELD_CLASS = 'dx-timeview-field';
      TIMEVIEW_HOURARROW_CLASS = 'dx-timeview-hourarrow';
      TIMEVIEW_MINUTEARROW_CLASS = 'dx-timeview-minutearrow';
      TIMEVIEW_TIME_SEPARATOR_CLASS = 'dx-timeview-time-separator';
      TIMEVIEW_FORMAT12_CLASS = 'dx-timeview-format12';
      TIMEVIEW_FORMAT12_AM = -1;
      TIMEVIEW_FORMAT12_PM = 1;
      BOX_CLASS = 'dx-box';
      NUMBERBOX_CLASS = 'dx-numberbox';
      INPUT_CLASS = 'dx-texteditor-input';
      NUMBERBOX_SPIN_UP_BUTTON_CLASS = 'dx-numberbox-spin-up';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      QUnit.module('rendering', function() {
        QUnit.test('widget class should be added', function(assert) {
          var $element = $('#timeView').dxTimeView();
          assert.ok($element.hasClass(TIMEVIEW_CLASS), 'class added');
        });
        QUnit.test('timeView should use box with right options', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var box = $element.find('.' + BOX_CLASS).dxBox('instance');
          assert.equal(box.option('direction'), 'col', 'box has right direction');
          assert.equal(box.option('items').length, 2, 'box has 2 items');
        });
        QUnit.test('clock should be rendered in top box section', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var box = $element.find('.' + BOX_CLASS).dxBox('instance');
          assert.ok(box.itemElements().eq(0).find('.' + TIMEVIEW_CLOCK_CLASS).length, 'clock rendered');
        });
        QUnit.test('field should be rendered in bottom box section', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var box = $element.find('.' + BOX_CLASS).dxBox('instance');
          assert.ok(box.itemElements().eq(1).find('.' + TIMEVIEW_FIELD_CLASS).length, 'clock rendered');
        });
      });
      QUnit.module('clock rendering', function() {
        QUnit.test('hour arrow should be rendered', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var $clock = $element.find('.' + TIMEVIEW_CLOCK_CLASS);
          assert.ok($clock.find('.' + TIMEVIEW_HOURARROW_CLASS).length, 'hour arrow rendered');
        });
        QUnit.test('minute arrow should be rendered', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var $clock = $element.find('.' + TIMEVIEW_CLOCK_CLASS);
          assert.ok($clock.find('.' + TIMEVIEW_MINUTEARROW_CLASS).length, 'minute arrow rendered');
        });
        QUnit.test('clock should not render if showClock option is false', function(assert) {
          var $element = $('#timeView').dxTimeView({_showClock: false});
          var $clock = $element.find('.' + TIMEVIEW_CLOCK_CLASS);
          assert.notOk($clock.length, 'clock was not rendered');
        });
        QUnit.test('clock should be shown if showClock option was changed', function(assert) {
          var $element = $('#timeView').dxTimeView({_showClock: false});
          var instance = $element.dxTimeView('instance');
          instance.option('_showClock', true);
          var $clock = $element.find('.' + TIMEVIEW_CLOCK_CLASS);
          assert.ok($clock.length, 'clock was rendered');
        });
        var getRotation = function($element) {
          var matrix = $element.css('transform');
          var values = matrix.split('(')[1].split(')')[0].split(',');
          return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        };
        QUnit.test('hour arrow has right rotation', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 3, 0)});
          var $hourArrow = $element.find('.' + TIMEVIEW_HOURARROW_CLASS);
          assert.equal(getRotation($hourArrow), 90, 'arrow rotation is right');
        });
        QUnit.test('hour arrow has right rotation considering minutes', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 3, 30)});
          var $hourArrow = $element.find('.' + TIMEVIEW_HOURARROW_CLASS);
          assert.equal(getRotation($hourArrow), 105, 'arrow rotation is right');
        });
        QUnit.test('minute arrow has right rotation', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 3, 45)});
          var $minuteArrow = $element.find('.' + TIMEVIEW_MINUTEARROW_CLASS);
          assert.equal(getRotation($minuteArrow), -90, 'arrow rotation is right');
        });
        QUnit.test('hour arrow has right rotation after changing time option', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var instance = $element.dxTimeView('instance');
          var $hourArrow = $element.find('.' + TIMEVIEW_HOURARROW_CLASS);
          instance.option('value', new Date(2014, 11, 11, 5, 0));
          assert.equal(getRotation($hourArrow), 150, 'arrow rotation is right');
        });
        QUnit.test('minute arrow has right rotation after changing time option', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var instance = $element.dxTimeView('instance');
          var $minuteArrow = $element.find('.' + TIMEVIEW_MINUTEARROW_CLASS);
          instance.option('value', new Date(2014, 11, 11, 6, 25));
          assert.equal(getRotation($minuteArrow), 150, 'arrow rotation is right');
        });
      });
      QUnit.module('field rendering', function() {
        QUnit.test('field should be box widget', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var box = $element.find('.' + TIMEVIEW_FIELD_CLASS).dxBox('instance');
          assert.equal(box.option('direction'), 'row', 'rendered');
          assert.equal(box.option('align'), 'center', 'rendered');
          assert.equal(box.option('crossAlign'), 'center', 'rendered');
        });
        QUnit.test('field should contain hour numberbox with current hour value', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 11, 22)});
          var box = $element.find('.' + TIMEVIEW_FIELD_CLASS).dxBox('instance');
          var hourNumberBox = box.itemElements().eq(0).find('.' + NUMBERBOX_CLASS).dxNumberBox('instance');
          assert.equal(hourNumberBox.option('showSpinButtons'), true, 'spin buttons enabled');
          assert.equal(hourNumberBox.option('value'), 11, 'correct hour value');
        });
        QUnit.test('hours and minutes should be separated by time separator', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 11, 22)});
          var $separator = $element.find('.' + TIMEVIEW_TIME_SEPARATOR_CLASS);
          assert.equal($separator.length, 1, 'separator should exist');
        });
        QUnit.test('hour numberbox should set hours', function(assert) {
          var time = new Date(2014, 11, 11, 11, 22);
          var $element = $('#timeView').dxTimeView({value: time});
          var instance = $element.dxTimeView('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          hourNumberBox.option('value', 5);
          assert.notStrictEqual(instance.option('value'), time, 'date instance changed');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 5, 22).valueOf(), 'hour changed');
        });
        QUnit.test('hour numberbox should be updated after time option change', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 11, 22)});
          var instance = $element.dxTimeView('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          instance.option('value', new Date(2014, 11, 11, 7, 22));
          assert.equal(hourNumberBox.option('value'), 7, 'hour changed');
        });
        QUnit.test('field should contain minute numberbox with current minute value', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 11, 22)});
          var box = $element.find('.' + TIMEVIEW_FIELD_CLASS).dxBox('instance');
          var minuteNumberBox = box.itemElements().eq(2).find('.' + NUMBERBOX_CLASS).dxNumberBox('instance');
          assert.equal(minuteNumberBox.option('showSpinButtons'), true, 'spin buttons enabled');
          assert.equal(minuteNumberBox.option('value'), 22, 'correct hour value');
        });
        QUnit.test('minute numberbox should set minutes', function(assert) {
          var time = new Date(2014, 11, 11, 11, 22);
          var $element = $('#timeView').dxTimeView({value: time});
          var instance = $element.dxTimeView('instance');
          var minuteNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(1).dxNumberBox('instance');
          minuteNumberBox.option('value', 33);
          assert.notStrictEqual(instance.option('value'), time, 'date instance changed');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 11, 33).valueOf(), 'minute changed');
        });
        QUnit.test('minute numberbox should be updated after time option change', function(assert) {
          var $element = $('#timeView').dxTimeView({value: new Date(2014, 11, 11, 11, 22)});
          var instance = $element.dxTimeView('instance');
          var minuteNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(1).dxNumberBox('instance');
          instance.option('value', new Date(2014, 11, 11, 11, 33));
          assert.equal(minuteNumberBox.option('value'), 33, 'minute changed');
        });
        QUnit.test('hour numberbox should be looped', function(assert) {
          var time = new Date(2014, 11, 11, 11, 22);
          var $element = $('#timeView').dxTimeView({value: time});
          var instance = $element.dxTimeView('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          hourNumberBox.option('value', 24);
          assert.equal(hourNumberBox.option('value'), 0, 'numberbox updated');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 0, 22).valueOf(), 'minute changed');
          hourNumberBox.option('value', -1);
          assert.equal(hourNumberBox.option('value'), 23, 'numberbox updated');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 23, 22).valueOf(), 'minute changed');
        });
        QUnit.test('minute numberbox should be looped', function(assert) {
          var time = new Date(2014, 11, 11, 11, 22);
          var $element = $('#timeView').dxTimeView({value: time});
          var instance = $element.dxTimeView('instance');
          var minuteNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(1).dxNumberBox('instance');
          minuteNumberBox.option('value', 60);
          assert.equal(minuteNumberBox.option('value'), 0, 'numberbox updated');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 11, 0).valueOf(), 'minute changed');
          minuteNumberBox.option('value', -1);
          assert.equal(minuteNumberBox.option('value'), 59, 'numberbox updated');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 11, 11, 11, 59).valueOf(), 'minute changed');
        });
        QUnit.test('hour and minute numberboxes should set minutes with null value', function(assert) {
          assert.expect(2);
          var expected;
          var $element = $('#timeView').dxTimeView({
            value: null,
            onValueChanged: function(args) {
              if (expected) {
                assert.ok(Math.abs(args.value.valueOf() - expected.valueOf()) < 60 * 1000, 'correct value');
              }
            }
          });
          var instance = $element.dxTimeView('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          var minuteNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(1).dxNumberBox('instance');
          expected = new Date();
          expected.setHours((expected.getHours() + 24 + 1) % 24);
          hourNumberBox.option('value', expected.getHours());
          expected = null;
          instance.option('value', null);
          expected = new Date();
          expected.setMinutes((expected.getMinutes() + 60 + 1) % 60);
          minuteNumberBox.option('value', expected.getMinutes());
        });
        QUnit.test('disabled state should be passed to numberboxes', function(assert) {
          var $element = $('#timeView').dxTimeView({disabled: true});
          var instance = $element.dxTimeView('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          var minuteNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(1).dxNumberBox('instance');
          assert.equal(hourNumberBox.option('disabled'), true, 'hour numberbox disabled');
          assert.equal(minuteNumberBox.option('disabled'), true, 'minute numberbox disabled');
          instance.option('disabled', false);
          assert.equal(hourNumberBox.option('disabled'), false, 'hour numberbox disabled');
          assert.equal(minuteNumberBox.option('disabled'), false, 'minute numberbox disabled');
        });
      });
      QUnit.module('12 hours format', function() {
        QUnit.test('format field should be rendered when use24HourFormat option is enabled', function(assert) {
          var $element = $('#timeView').dxTimeView({use24HourFormat: false});
          var instance = $element.dxTimeView('instance');
          assert.equal($element.find('.' + TIMEVIEW_FORMAT12_CLASS).length, 1, 'input was rendered');
          instance.option('use24HourFormat', true);
          assert.equal($element.find('.' + TIMEVIEW_FORMAT12_CLASS).length, 0, 'input was removed');
        });
        QUnit.test('timeView should use localized message for the 24hour format selectBox', function(assert) {
          var getPeriodNames = sinon.stub(dateLocalization, 'getPeriodNames').returns(['A', 'P']);
          try {
            var $element = $('#timeView').dxTimeView({use24HourFormat: false});
            var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
            var items = formatField.option('items');
            assert.equal(items[0].text, 'A', 'AM item is correct');
            assert.equal(items[1].text, 'P', 'PM item is correct');
          } finally {
            getPeriodNames.restore();
          }
        });
        QUnit.test('day time should be changed after setting a new value', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: new Date(2011, 0, 1, 10, 0, 0, 0)
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var instance = $element.dxTimeView('instance');
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_AM, 'am is selected');
          instance.option('value', new Date(2011, 0, 1, 12, 1, 0, 0));
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_PM, 'pm is selected');
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 12, 1, 0, 0), 'hours is correct');
        });
        QUnit.test('hours view should be changed after format changing', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: new Date(2011, 0, 1, 15, 0, 0, 0)
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var instance = $element.dxTimeView('instance');
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_PM, 'pm is selected');
          formatField.option('value', TIMEVIEW_FORMAT12_AM);
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 3, 0, 0, 0), 'time has been changed');
        });
        QUnit.test('boundary hours should have correct day time value', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: new Date(2011, 0, 1, 12, 0, 0, 0)
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var instance = $element.dxTimeView('instance');
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_PM, 'pm is selected');
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 12, 0, 0, 0), 'time is correct');
          instance.option('value', new Date(2011, 0, 1, 0, 0, 0, 0));
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_AM, 'am is selected');
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 0, 0, 0, 0), 'time is correct');
        });
        QUnit.test('boundary hours should change correctly after day time changing', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: new Date(2011, 0, 1, 0, 0, 0, 0)
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var instance = $element.dxTimeView('instance');
          formatField.option('value', TIMEVIEW_FORMAT12_PM);
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 12, 0, 0, 0), 'time is correct');
          formatField.option('value', TIMEVIEW_FORMAT12_AM);
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 0, 0, 0, 0), 'time is correct');
        });
        QUnit.test('midday part should not be changed when clock moves back through the boundary (T808116)', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: new Date(2011, 0, 1, 12, 0, 10, 0)
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var hourNumberBox = $element.find('.' + NUMBERBOX_CLASS).eq(0).dxNumberBox('instance');
          var instance = $element.dxTimeView('instance');
          hourNumberBox.option('value', 11);
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_PM, 'pm is selected');
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 23, 0, 0, 0), 'time is correct');
          hourNumberBox.option('value', 12);
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_PM, 'pm is selected');
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 12, 0, 0, 0), 'time is correct');
        });
        QUnit.test('timeView should not change value specified via api', function(assert) {
          var $element = $('#timeView').dxTimeView({
            use24HourFormat: false,
            value: null
          });
          var formatField = $element.find('.' + TIMEVIEW_FORMAT12_CLASS).dxSelectBox('instance');
          var instance = $element.dxTimeView('instance');
          instance.option('value', new Date(2011, 0, 1, 10, 5, 0, 0));
          assert.equal(instance.option('value').toString(), new Date(2011, 0, 1, 10, 5, 0, 0), 'value has not been changed');
          assert.equal(formatField.option('value'), TIMEVIEW_FORMAT12_AM, 'am is selected');
        });
        QUnit.test('hour numberbox can change value from 12 to 1 after spin up button click (T986347)', function(assert) {
          var $element = $('#timeView').dxTimeView({
            value: new Date(2014, 11, 11, 12, 1),
            use24HourFormat: false
          });
          var $hourNumberBox = $element.find(("." + NUMBERBOX_CLASS));
          var hourNumberBox = $hourNumberBox.dxNumberBox('instance');
          var $spinUpButton = $($hourNumberBox.find(("." + NUMBERBOX_SPIN_UP_BUTTON_CLASS)));
          $spinUpButton.trigger('dxpointerdown');
          assert.equal(hourNumberBox.option('value'), 1);
        });
      });
      QUnit.module('format rendering', function() {
        [false, true].forEach(function(use24HourFormat) {
          QUnit.test(("minute numberbox should have min/max constraints, use24HourFormat=" + use24HourFormat), function(assert) {
            var $element = $('#timeView').dxTimeView({use24HourFormat: use24HourFormat});
            var minuteNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(1).dxNumberBox('instance');
            assert.equal(minuteNumberBox.option('min'), -1, 'min constraint set');
            assert.equal(minuteNumberBox.option('max'), 60, 'max constraint set');
          });
          QUnit.test(("minute numberbox should have min/max constraints, use24HourFormat changed from " + use24HourFormat + " to " + !use24HourFormat), function(assert) {
            var $element = $('#timeView').dxTimeView({use24HourFormat: use24HourFormat});
            var timeView = $element.dxTimeView('instance');
            var newUse24HourFormatValue = !use24HourFormat;
            timeView.option('use24HourFormat', newUse24HourFormatValue);
            var minuteNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(1).dxNumberBox('instance');
            assert.equal(minuteNumberBox.option('min'), -1, 'min constraint set');
            assert.equal(minuteNumberBox.option('max'), 60, 'max constraint set');
          });
          QUnit.test(("hour numberbox should have min/max constraints, use24HourFormat=" + use24HourFormat), function(assert) {
            var $element = $('#timeView').dxTimeView({use24HourFormat: use24HourFormat});
            var hourNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(0).dxNumberBox('instance');
            var expectedMaxValue = use24HourFormat ? 24 : 13;
            assert.equal(hourNumberBox.option('min'), -1, 'min constraint set');
            assert.equal(hourNumberBox.option('max'), expectedMaxValue, 'max constraint set');
          });
          QUnit.test(("hour numberbox should have min/max constraints, use24HourFormat changed from " + use24HourFormat + " to " + !use24HourFormat), function(assert) {
            var $element = $('#timeView').dxTimeView({use24HourFormat: use24HourFormat});
            var timeView = $element.dxTimeView('instance');
            var newUse24HourFormatValue = !use24HourFormat;
            var expectedMaxValue = newUse24HourFormatValue ? 24 : 13;
            timeView.option('use24HourFormat', newUse24HourFormatValue);
            var hourNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(0).dxNumberBox('instance');
            assert.equal(hourNumberBox.option('min'), -1, 'min constraint set');
            assert.equal(hourNumberBox.option('max'), expectedMaxValue, 'max constraint set');
          });
          [new Date(2000, 1, 1, 5, 15), new Date(2000, 1, 1, 15, 15), new Date(2000, 1, 1, 0, 15)].forEach(function(value) {
            QUnit.test(("hour numberbox should have correct initial value, use24HourFormat=" + use24HourFormat + ", initial hour value=" + value.getHours()), function(assert) {
              var $element = $('#timeView').dxTimeView({
                use24HourFormat: use24HourFormat,
                value: value
              });
              var hourNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(0).dxNumberBox('instance');
              var maxHourValue = use24HourFormat ? 24 : 12;
              var expectedValue = value.getHours() % maxHourValue;
              if (!use24HourFormat && expectedValue === 0) {
                expectedValue = 12;
              }
              assert.equal(hourNumberBox.option('value'), expectedValue, 'correct value');
            });
          });
          QUnit.test('hour numberbox should have correct value after some incorrect values applyings (T986347)', function(assert) {
            var $element = $('#timeView').dxTimeView({use24HourFormat: use24HourFormat});
            var maxValue = use24HourFormat ? 23 : 12;
            var $hourNumberBox = $element.find(("." + NUMBERBOX_CLASS)).eq(0);
            var hourNumberBox = $hourNumberBox.dxNumberBox('instance');
            var $input = $hourNumberBox.find(("." + TEXTEDITOR_INPUT_CLASS));
            var kb = keyboardMock($input);
            kb.caret({
              start: 0,
              end: 2
            }).type('30').change();
            kb.caret({
              start: 0,
              end: 2
            }).type('30').change();
            var text = hourNumberBox.option('text');
            var value = hourNumberBox.option('value');
            assert.ok(text <= maxValue, ("current text value is " + text + "; expected max is " + maxValue));
            assert.ok(value <= maxValue, ("current value is " + value + "; expected max is " + maxValue));
          });
        });
      });
      QUnit.module('editor support', function() {
        QUnit.test('value changed should be raised on value change', function(assert) {
          assert.expect(1);
          var time = new Date(2014, 11, 11, 11, 22);
          var $element = $('#timeView').dxTimeView({onValueChanged: function(args) {
              assert.equal(args.value.valueOf(), time.valueOf(), 'value changed');
            }});
          var instance = $element.dxTimeView('instance');
          instance.option('value', time);
        });
        QUnit.test('\'registerKeyHandler\' should attach handler to the each nested editor', function(assert) {
          var handler = sinon.stub();
          var $element = $('#timeView');
          var instance = $element.dxTimeView({use24HourFormat: false}).dxTimeView('instance');
          instance.registerKeyHandler('escape', handler);
          var $inputs = $element.find(("." + INPUT_CLASS));
          $inputs.each(function(index, element) {
            var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
            $(element).trigger(escapeKeyDown);
          });
          assert.strictEqual($inputs.length, 3, 'there are 3 editors');
          assert.strictEqual(handler.callCount, 3, 'each editor handle the keydown event');
        });
        QUnit.test('Custom keyboard handlers still works after option change', function(assert) {
          var handler = sinon.stub();
          var $element = $('#timeView');
          var instance = $element.dxTimeView({use24HourFormat: false}).dxTimeView('instance');
          instance.registerKeyHandler('escape', handler);
          instance.option('use24HourFormat', true);
          var $inputs = $element.find(("." + INPUT_CLASS));
          $inputs.each(function(index, element) {
            var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
            $(element).trigger(escapeKeyDown);
          });
          assert.strictEqual($inputs.length, 2, 'there are 2 editors');
          assert.strictEqual(handler.callCount, 2, 'each editor handle the keydown event');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('role for clock picture', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var $clock = $element.find('.dx-timeview-clock');
          assert.equal($clock.attr('role'), 'presentation');
        });
        QUnit.test('label for hour and minute numberboxes', function(assert) {
          var $element = $('#timeView').dxTimeView();
          var $hour = $element.find('.dx-texteditor-input[aria-valuemax=\'24\']');
          var $minute = $element.find('.dx-texteditor-input[aria-valuemax=\'60\']');
          assert.equal($hour.attr('aria-label'), 'hours', 'hours label is correct');
          assert.equal($minute.attr('aria-label'), 'minutes', 'minutes label is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","localization/date","../../helpers/keyboardMock.js","ui/date_box/ui.time_view"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("localization/date"), require("../../helpers/keyboardMock.js"), require("ui/date_box/ui.time_view"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=timeView.tests.js.map