!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/datebox.markup.tests.js"], ["jquery","core/utils/support","ui/date_box/ui.date_utils","ui/date_box","localization/date","../../helpers/keyboardMock.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/datebox.markup.tests.js", ["jquery", "core/utils/support", "ui/date_box/ui.date_utils", "ui/date_box", "localization/date", "../../helpers/keyboardMock.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      support,
      uiDateUtils,
      DateBox,
      dateLocalization,
      keyboardMock,
      TEXTEDITOR_INPUT_CLASS,
      DATEBOX_CLASS,
      DATEBOX_LIST_CLASS,
      DX_AUTO_WIDTH_CLASS,
      moduleConfig,
      getExpectedResult;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      uiDateUtils = $__m.default;
    }, function($__m) {
      DateBox = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dateBox"></div>\
        <div id="widthRootStyle"></div>';
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      DATEBOX_CLASS = 'dx-datebox';
      DATEBOX_LIST_CLASS = 'dx-datebox-list';
      DX_AUTO_WIDTH_CLASS = 'dx-auto-width';
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers(new Date().valueOf());
          this.$element = $('#dateBox');
          this.createInstance = function(options) {
            this.instance = this.$element.dxDateBox($.extend({pickerType: 'native'}, options)).dxDateBox('instance');
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      getExpectedResult = function(date, mode, stringDate) {
        var localizedDate;
        if (uiDateUtils.FORMATS_MAP[mode]) {
          localizedDate = dateLocalization.format(date, uiDateUtils.FORMATS_MAP[mode]);
        } else {
          localizedDate = uiDateUtils.toStandardDateFormat(date, mode);
        }
        return support.inputType(mode) ? stringDate : localizedDate;
      };
      QUnit.module('Datebox markup', moduleConfig, function() {
        QUnit.test('attach dxDateBox', function(assert) {
          this.createInstance();
          assert.ok(this.instance instanceof DateBox);
          assert.ok(this.$element.hasClass(DATEBOX_CLASS));
        });
        QUnit.test('rendered markup when pickerType=\'list\'', function(assert) {
          this.createInstance({
            pickerType: 'list',
            type: 'time'
          });
          assert.ok(this.$element.hasClass(DATEBOX_LIST_CLASS), 'TimeBox initialized');
        });
        QUnit.test('clear button should not be rendered if pickerType is \'native\' (T209347)', function(assert) {
          this.createInstance({
            type: 'date',
            pickerType: 'native',
            showClearButton: true,
            value: new Date()
          });
          var $clearButton = this.$element.find('.dx-clear-button-area');
          assert.equal($clearButton.length, 0, 'no clear buttons are rendered');
        });
        QUnit.test('widget should render without error with \'showClearButton\'=true', function(assert) {
          var isOK = true;
          try {
            this.createInstance({showClearButton: true});
          } catch (e) {
            isOK = false;
          }
          assert.ok(isOK, 'widget rendered without any error');
        });
      });
      QUnit.module('Rendering input', moduleConfig, function() {
        QUnit.test('default field template test when pickerType=\'list\'', function(assert) {
          this.createInstance({
            pickerType: 'list',
            type: 'time',
            min: new Date(2008, 7, 8, 4, 0),
            value: new Date(2008, 7, 8, 5, 0),
            max: new Date(2008, 7, 8, 6, 0)
          });
          var $input = this.$element.find('.dx-texteditor-input');
          assert.equal($input.val(), '5:00 AM', 'field template is right');
        });
        QUnit.test('render value', function(assert) {
          var date = new Date(2012, 10, 26, 16, 40, 23);
          this.createInstance({value: date});
          assert.equal(this.instance._input().val(), getExpectedResult(date, this.instance.option('mode'), '2012-11-26'));
          assert.ok(!this.instance._input().prop('disabled'));
        });
        QUnit.test('render type - datetime', function(assert) {
          var date = new Date(2012, 10, 26, 16, 40, 0);
          this.createInstance({
            value: date,
            type: 'datetime'
          });
          assert.equal(!support.inputType('datetime'), this.instance.option('mode') === 'datetime-local', 'if \'datetime\' mode is not supported, it is change to \'datetime-local\'');
          assert.equal(uiDateUtils.fromStandardDateFormat(this.instance._input().val()).getTime(), date.getTime());
        });
        QUnit.test('format should be correct when pickerType is calendar', function(assert) {
          var date = new Date($.now());
          this.createInstance({
            type: 'datetime',
            pickerType: 'calendar',
            value: date
          });
          var formattedValue = dateLocalization.format(date, uiDateUtils.FORMATS_MAP['datetime']);
          assert.equal(this.$element.find('.' + TEXTEDITOR_INPUT_CLASS).val(), formattedValue, 'correct format');
        });
        QUnit.test('render type - time', function(assert) {
          var date = new Date(2012, 10, 26, 16, 40, 0);
          this.createInstance({
            value: date,
            type: 'time'
          });
          var inputValue = this.instance._input().val();
          var normalizedInputValue = support.inputType(this.instance.option('mode')) ? uiDateUtils.fromStandardDateFormat(inputValue) : dateLocalization.parse(inputValue, uiDateUtils.FORMATS_MAP.time);
          assert.equal(normalizedInputValue.getHours(), date.getHours());
          assert.equal(normalizedInputValue.getMinutes(), date.getMinutes());
        });
        QUnit.test('render disabled state', function(assert) {
          this.createInstance({
            disabled: true,
            type: 'datetime'
          });
          assert.ok(this.instance._input().prop('disabled'));
        });
        QUnit.test('datebox should set min and max attributes to the native input (T258860)', function(assert) {
          this.createInstance({
            type: 'date',
            pickerType: 'native',
            min: new Date(2015, 5, 2),
            max: new Date(2015, 7, 2)
          });
          var $input = this.$element.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.attr('min'), '2015-06-02', 'minimum date initialized correctly');
          assert.equal($input.attr('max'), '2015-08-02', 'maximum date initialized correctly');
        });
        QUnit.test('DateBox with masked behavior should not set the selection of the hidden unfocused input', function(assert) {
          this.$element.hide();
          this.createInstance({
            value: new Date('10/10/2012 13:07'),
            useMaskBehavior: true,
            mode: 'text',
            displayFormat: 'd.MM.yyyy',
            pickerType: 'calendar'
          });
          this.$element.show();
          var $input = this.$element.find('.dx-texteditor-input');
          var keyboard = keyboardMock($input, true);
          var $__3 = keyboard.caret(),
              selectionStart = $__3.start,
              selectionEnd = $__3.end;
          var isDayPartSelected = selectionStart === 0 && selectionEnd === 2;
          assert.notOk(isDayPartSelected, 'correct intial position');
        });
      });
      QUnit.module('pickerType', function() {
        QUnit.test('correct behavior for the \'calendar\' value, type=\'date\'', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(),
            pickerType: 'calendar',
            type: 'date'
          });
          var instance = $element.dxDateBox('instance');
          assert.equal(instance._strategy.NAME, 'Calendar', 'strategy is correct for the \'date\' type');
        });
        QUnit.test('correct behavior for the \'calendar\' value, type=\'datetime\'', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(),
            pickerType: 'calendar',
            type: 'datetime'
          });
          var instance = $element.dxDateBox('instance');
          assert.equal(instance._strategy.NAME, 'CalendarWithTime', 'strategy is correct for the \'datetime\' type');
        });
        QUnit.test('correct behavior for the \'list\' value', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(),
            pickerType: 'list',
            type: 'time'
          });
          var instance = $element.dxDateBox('instance');
          assert.equal(instance._strategy.NAME, 'List', 'strategy is correct');
        });
        QUnit.test('correct behavior for the \'rollers\' value', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(),
            pickerType: 'rollers',
            type: 'date'
          });
          var instance = $element.dxDateBox('instance');
          assert.equal(instance._strategy.NAME, 'DateView', 'strategy is correct');
        });
        QUnit.test('correct behavior for the \'native\' value', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(),
            pickerType: 'native',
            type: 'date'
          });
          var instance = $element.dxDateBox('instance');
          assert.equal(instance._strategy.NAME, 'Native', 'strategy is correct');
        });
      });
      QUnit.module('hidden input', function() {
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = $('#dateBox').dxDateBox();
          var $hiddenInput = $element.find('input[type=\'hidden\']');
          assert.equal($hiddenInput.length, 1, 'hidden input is rendered');
        });
        QUnit.test('the value should be passed to the hidden input on init', function(assert) {
          var dateValue = new Date(2016, 6, 15);
          var type = 'date';
          var stringValue = uiDateUtils.toStandardDateFormat(dateValue, type);
          var $element = $('#dateBox').dxDateBox({
            value: dateValue,
            type: type
          });
          var $hiddenInput = $element.find('input[type=\'hidden\']');
          assert.equal($hiddenInput.val(), stringValue, 'input value is correct after init');
        });
        QUnit.test('the value should be passed to the hidden input in the correct format if dateSerializationFormat option is defined', function(assert) {
          var dateValue = new Date(Date.UTC(2016, 6, 15, 14, 30));
          var $element = $('#dateBox').dxDateBox({
            type: 'datetime',
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssZ',
            value: dateValue
          });
          assert.equal($element.find('input[type=\'hidden\']').val(), '2016-07-15T14:30:00Z', 'input value is correct for the \'yyyy-MM-ddTHH:mm:ssZ\' format');
        });
      });
      QUnit.module('the \'name\' option', function() {
        QUnit.test('widget hidden input should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#dateBox').dxDateBox({name: expectedName});
          var $input = $element.find('input[type=\'hidden\']');
          assert.equal($input.attr('name'), expectedName, 'the input \'name\' attribute has correct value');
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('component should have special css class when the user set the width option', function(assert) {
          var $element = $('#dateBox').dxDateBox({width: 100});
          var component = $element.dxDateBox('instance');
          assert.notOk($element.hasClass(DX_AUTO_WIDTH_CLASS), 'component has not class');
          component.option('width', undefined);
          assert.ok($element.hasClass(DX_AUTO_WIDTH_CLASS), 'component has class');
        });
        QUnit.test('constructor', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'rollers',
            width: 400
          });
          var instance = $element.dxDateBox('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element[0].style.width, 400 + 'px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxDateBox();
          var instance = $element.dxDateBox('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element[0].style.width, 300 + 'px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('constructor, calendar integration', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            width: 1234
          });
          var instance = $element.dxDateBox('instance');
          assert.strictEqual(instance.option('width'), 1234);
          assert.strictEqual($element[0].style.width, 1234 + 'px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width, calendar integration', function(assert) {
          var $element = $('#widthRootStyle').dxDateBox({pickerType: 'calendar'});
          var instance = $element.dxDateBox('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element[0].style.width, 300 + 'px', 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('native datebox', {
        beforeEach: function() {
          this.$dateBox = $('#dateBox');
          this.dateBox = this.$dateBox.dxDateBox({pickerType: 'native'}).dxDateBox('instance');
        },
        afterEach: function() {}
      }, function() {
        QUnit.test('widget should work correctly', function(assert) {
          assert.ok(this.dateBox, 'Instance of native datepicker should work for each platform');
          assert.equal(this.dateBox._strategy.NAME, 'Native', 'correct strategy is chosen');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/support","ui/date_box/ui.date_utils","ui/date_box","localization/date","../../helpers/keyboardMock.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/support"), require("ui/date_box/ui.date_utils"), require("ui/date_box"), require("localization/date"), require("../../helpers/keyboardMock.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=datebox.markup.tests.js.map