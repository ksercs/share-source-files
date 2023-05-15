!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/datebox.tests.js"], ["../../helpers/noIntl.js","jquery","animation/fx","core/utils/support","core/devices","ui/date_box/ui.date_utils","localization/date","knockout","integration/knockout","ui/date_box"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.knockout/datebox.tests.js", ["../../helpers/noIntl.js", "jquery", "animation/fx", "core/utils/support", "core/devices", "ui/date_box/ui.date_utils", "localization/date", "knockout", "integration/knockout", "ui/date_box"], function($__export) {
  "use strict";
  var $,
      fx,
      support,
      devices,
      uiDateUtils,
      dateLocalization,
      ko,
      moduleWithoutCsp,
      toStandardDateFormat,
      FORMATS_MAP,
      TEXTEDITOR_INPUT_CLASS,
      widgetName,
      isTextEditor,
      getInstanceWidget,
      moduleConfig,
      getExpectedResult;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      uiDateUtils = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      ko = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;
      QUnit.testStart(function() {
        var markup = '<div id="dateBox"></div>\
        \
        <div id="several">\
            <div id="dateboxWithDateFormat" data-bind="dxDateBox: { value: value, type: \'date\', pickerType: \'native\' }"></div>\
            <div id="dateboxWithDateTimeFormat" data-bind="dxDateBox: { value: value, type: \'datetime\', pickerType: \'native\' }"></div>\
            <div id="dateboxWithTimeFormat" data-bind="dxDateBox: { value: value, type: \'time\', pickerType: \'native\' }"></div>\
        </div>\
        \
        <div id="B250640" data-bind="dxDateBox: { pickerType: \'calendar\', type: \'datetime\' }"></div>\
        \
        <div id="Q468727" data-bind="dxDateBox: { value: value, type: \'datetime\' }"></div>';
        $('#qunit-fixture').html(markup);
      });
      toStandardDateFormat = uiDateUtils.toStandardDateFormat;
      FORMATS_MAP = uiDateUtils.FORMATS_MAP;
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      widgetName = 'dxDateBox';
      isTextEditor = function($input) {
        return $input.prop('type') === 'text';
      };
      getInstanceWidget = function(instance) {
        return instance._strategy._widget;
      };
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers(new Date().valueOf());
          this.$element = $('#dateBox')[widgetName]({pickerType: 'native'});
          this.instance = this.$element[widgetName]('instance');
          this.$input = $.proxy(this.instance._input, this.instance);
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      getExpectedResult = function(date, mode, stringDate) {
        var localizedDate;
        if (FORMATS_MAP[mode]) {
          localizedDate = dateLocalization.format(date, FORMATS_MAP[mode]);
        } else {
          localizedDate = toStandardDateFormat(date, mode);
        }
        return support.inputType(mode) ? stringDate : localizedDate;
      };
      moduleWithoutCsp('options changed callbacks', moduleConfig);
      QUnit.test('several editors for same value', function(assert) {
        var value = new Date(2012, 10, 26, 16, 40, 0);
        var newValue = null;
        var vm = {value: ko.observable(value)};
        ko.applyBindings(vm, $('#several').get(0));
        var getEditorTextByValue = function(value, type) {
          this.instance.option({
            type: type,
            value: value
          });
          return this.instance.option('text');
        }.bind(this);
        var $date = $('#dateboxWithDateFormat').find('.dx-texteditor-input');
        var $datetime = $('#dateboxWithDateTimeFormat').find('.dx-texteditor-input');
        var $time = $('#dateboxWithTimeFormat').find('.dx-texteditor-input');
        var dateMode = $('#dateboxWithDateFormat').dxDateBox().dxDateBox('instance').option('mode');
        var dateBoxWithDateTimeFormat = $('#dateboxWithDateTimeFormat').dxDateBox().dxDateBox('instance');
        var datetimeMode = dateBoxWithDateTimeFormat.option('mode');
        var timeMode = $('#dateboxWithTimeFormat').dxDateBox().dxDateBox('instance').option('mode');
        assert.equal($date.val(), getExpectedResult(value, dateMode, toStandardDateFormat(value, dateMode)), '\'date\' format is displayed correctly');
        assert.equal(dateBoxWithDateTimeFormat.option('text'), getExpectedResult(value, datetimeMode, toStandardDateFormat(value, datetimeMode)), '\'datetime\' format is displayed correctly');
        assert.equal($time.val(), getExpectedResult(value, timeMode, toStandardDateFormat(value, timeMode)), '\'time\' format is displayed correctly');
        newValue = new Date(2013, 11, 22, 16, 40, 0);
        var inputValue = isTextEditor($date) ? getEditorTextByValue(newValue, 'date') : toStandardDateFormat(newValue, dateMode);
        $date.val(inputValue).trigger('change');
        assert.equal($date.val(), getExpectedResult(newValue, dateMode, toStandardDateFormat(newValue, dateMode)), '\'date\' format is displayed correctly');
        assert.equal(dateBoxWithDateTimeFormat.option('text'), getExpectedResult(newValue, datetimeMode, toStandardDateFormat(newValue, datetimeMode)), '\'datetime\' format is displayed correctly');
        assert.equal($time.val(), getExpectedResult(newValue, timeMode, toStandardDateFormat(newValue, timeMode)), '\'time\' format is displayed correctly');
        newValue = new Date(2008, 9, 26, 22, 30);
        inputValue = isTextEditor($datetime) ? getEditorTextByValue(newValue, 'datetime') : toStandardDateFormat(newValue, datetimeMode);
        $datetime.val(inputValue).trigger('change');
        assert.equal($date.val(), getExpectedResult(newValue, dateMode, toStandardDateFormat(newValue, dateMode)), '\'date\' format is displayed correctly');
        assert.equal(dateBoxWithDateTimeFormat.option('text'), getExpectedResult(newValue, datetimeMode, toStandardDateFormat(newValue, datetimeMode)), '\'datetime\' format is displayed correctly');
        assert.equal($time.val(), getExpectedResult(newValue, timeMode, toStandardDateFormat(newValue, timeMode)), '\'time\' format is displayed correctly');
        newValue = new Date(2008, 9, 26, 14, 29);
        inputValue = isTextEditor($time) ? getEditorTextByValue(newValue, 'time') : toStandardDateFormat(newValue, timeMode);
        $time.val(inputValue).trigger('change');
        assert.equal($date.val(), getExpectedResult(newValue, dateMode, toStandardDateFormat(newValue, dateMode)), '\'date\' format is displayed correctly');
        assert.equal(dateBoxWithDateTimeFormat.option('text'), getExpectedResult(newValue, datetimeMode, toStandardDateFormat(newValue, datetimeMode)), '\'datetime\' format is displayed correctly');
        assert.equal($time.val(), getExpectedResult(newValue, timeMode, toStandardDateFormat(newValue, timeMode)), '\'time\' format is displayed correctly');
      });
      moduleWithoutCsp('dateView integration', {
        beforeEach: function() {
          fx.off = true;
          this.originalInputType = support.inputType;
          support.inputType = function() {
            return false;
          };
          moduleConfig.beforeEach.apply(this, arguments);
          this.instance.option('pickerType', 'calendar');
          this.popup = $.proxy(function() {
            return this._popup;
          }, this.instance);
          this.popupTitle = function() {
            return this.popup()._$title.find('.dx-toolbar-label').text();
          };
          this.instance.open();
          this.dateView = function() {
            return getInstanceWidget(this.instance);
          };
        },
        afterEach: function() {
          moduleConfig.afterEach.apply(this, arguments);
          support.inputType = this.originalInputType;
          fx.off = false;
        }
      });
      QUnit.test('B250640 - Unable to get property \'show\' of undefined or null reference', function(assert) {
        var $element = $('#B250640');
        ko.applyBindings({}, $element.get(0));
        $element.find('.' + TEXTEDITOR_INPUT_CLASS).trigger('dxclick');
        assert.ok(true, 'no exceptions were fired');
      });
      QUnit.test('Q468727 - dxDateBox - It is impossible to change a value if the initial value is undefined on a IOS device', function(assert) {
        if (!devices.real().ios) {
          assert.expect(0);
          return;
        }
        var vm = {value: ko.observable()};
        var $dateBox = $('#Q468727');
        ko.applyBindings(vm, $dateBox[0]);
        $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS).val('2010-10-10T10:10:10.500').trigger('change');
        assert.ok(vm.value());
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/noIntl.js","jquery","animation/fx","core/utils/support","core/devices","ui/date_box/ui.date_utils","localization/date","knockout","integration/knockout","ui/date_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/noIntl.js"), require("jquery"), require("animation/fx"), require("core/utils/support"), require("core/devices"), require("ui/date_box/ui.date_utils"), require("localization/date"), require("knockout"), require("integration/knockout"), require("ui/date_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=datebox.tests.js.map