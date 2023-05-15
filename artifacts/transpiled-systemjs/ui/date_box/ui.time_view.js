!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/date_box/ui.time_view.js"], ["../../core/renderer","../editor/editor","../number_box","../select_box","../box","../../core/utils/extend","../../core/component_registrator","../../localization/date","./ui.date_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/date_box/ui.time_view.js", ["../../core/renderer", "../editor/editor", "../number_box", "../select_box", "../box", "../../core/utils/extend", "../../core/component_registrator", "../../localization/date", "./ui.date_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _number_box = _interopRequireDefault($__require("../number_box"));
  var _select_box = _interopRequireDefault($__require("../select_box"));
  var _box = _interopRequireDefault($__require("../box"));
  var _extend = $__require("../../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _ui = _interopRequireDefault($__require("./ui.date_utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TIMEVIEW_CLASS = 'dx-timeview';
  var TIMEVIEW_CLOCK_CLASS = 'dx-timeview-clock';
  var TIMEVIEW_FIELD_CLASS = 'dx-timeview-field';
  var TIMEVIEW_HOURARROW_CLASS = 'dx-timeview-hourarrow';
  var TIMEVIEW_TIME_SEPARATOR_CLASS = 'dx-timeview-time-separator';
  var TIMEVIEW_FORMAT12_CLASS = 'dx-timeview-format12';
  var TIMEVIEW_FORMAT12_AM = -1;
  var TIMEVIEW_FORMAT12_PM = 1;
  var TIMEVIEW_MINUTEARROW_CLASS = 'dx-timeview-minutearrow';
  var rotateArrow = function rotateArrow($arrow, angle, offset) {
    cssRotate($arrow, angle, offset);
  };
  var cssRotate = function cssRotate($arrow, angle, offset) {
    $arrow.css('transform', 'rotate(' + angle + 'deg)' + ' translate(0,' + offset + 'px)');
  };
  var TimeView = _editor.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: new Date(Date.now()),
        use24HourFormat: true,
        _showClock: true,
        _arrowOffset: 5,
        stylingMode: undefined
      });
    },
    _getValue: function _getValue() {
      return this.option('value') || new Date();
    },
    _init: function _init() {
      this.callBase();
      this.$element().addClass(TIMEVIEW_CLASS);
    },
    _render: function _render() {
      this.callBase();
      this._renderBox();
      this._updateTime();
    },
    _renderBox: function _renderBox() {
      var $box = (0, _renderer.default)('<div>').appendTo(this.$element());
      var items = [];
      if (this.option('_showClock')) {
        items.push({
          ratio: 1,
          shrink: 0,
          baseSize: 'auto',
          template: this._renderClock.bind(this)
        });
      }
      items.push({
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        template: this._renderField.bind(this)
      });
      this._createComponent($box, _box.default, {
        height: '100%',
        width: '100%',
        direction: 'col',
        items: items
      });
    },
    _renderClock: function _renderClock(_, __, container) {
      this._$hourArrow = (0, _renderer.default)('<div>').addClass(TIMEVIEW_HOURARROW_CLASS);
      this._$minuteArrow = (0, _renderer.default)('<div>').addClass(TIMEVIEW_MINUTEARROW_CLASS);
      var $container = (0, _renderer.default)(container);
      $container.addClass(TIMEVIEW_CLOCK_CLASS).append(this._$hourArrow).append(this._$minuteArrow);
      this.setAria('role', 'presentation', $container);
    },
    _updateClock: function _updateClock() {
      var time = this._getValue();
      var hourArrowAngle = time.getHours() / 12 * 360 + time.getMinutes() / 60 * 30;
      var minuteArrowAngle = time.getMinutes() / 60 * 360;
      rotateArrow(this._$hourArrow, hourArrowAngle, this.option('_arrowOffset'));
      rotateArrow(this._$minuteArrow, minuteArrowAngle, this.option('_arrowOffset'));
    },
    _getBoxItems: function _getBoxItems(is12HourFormat) {
      var _this = this;
      var items = [{
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        template: function template() {
          return _this._hourBox.$element();
        }
      }, {
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        template: (0, _renderer.default)('<div>').addClass(TIMEVIEW_TIME_SEPARATOR_CLASS).text(_date.default.getTimeSeparator())
      }, {
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        template: function template() {
          return _this._minuteBox.$element();
        }
      }];
      if (is12HourFormat) {
        items.push({
          ratio: 0,
          shrink: 0,
          baseSize: 'auto',
          template: function template() {
            return _this._format12.$element();
          }
        });
      }
      return items;
    },
    _renderField: function _renderField() {
      var is12HourFormat = !this.option('use24HourFormat');
      this._createHourBox(is12HourFormat);
      this._createMinuteBox();
      if (is12HourFormat) {
        this._createFormat12Box();
      }
      return this._createComponent((0, _renderer.default)('<div>').addClass(TIMEVIEW_FIELD_CLASS), _box.default, {
        direction: 'row',
        align: 'center',
        crossAlign: 'center',
        items: this._getBoxItems(is12HourFormat)
      }).$element();
    },
    _createHourBox: function _createHourBox(is12HourFormat) {
      var _this2 = this;
      var editor = this._hourBox = this._createComponent((0, _renderer.default)('<div>'), _number_box.default, (0, _extend.extend)({
        min: -1,
        max: is12HourFormat ? 13 : 24,
        value: this._getValue().getHours(),
        onValueChanged: this._onHourBoxValueChanged.bind(this),
        onKeyboardHandled: function onKeyboardHandled(opts) {
          return _this2._keyboardHandler(opts);
        }
      }, this._getNumberBoxConfig()));
      editor.setAria('label', 'hours');
    },
    _isPM: function _isPM() {
      return !this.option('use24HourFormat') && this._format12.option('value') === 1;
    },
    _onHourBoxValueChanged: function _onHourBoxValueChanged(_ref) {
      var value = _ref.value,
          component = _ref.component;
      var currentValue = this._getValue();
      var newValue = new Date(currentValue);
      var newHours = this._convertMaxHourToMin(value);
      component.option('value', newHours);
      if (this._isPM()) {
        newHours += 12;
      }
      newValue.setHours(newHours);
      _ui.default.normalizeTime(newValue);
      this.option('value', newValue);
    },
    _convertMaxHourToMin: function _convertMaxHourToMin(hours) {
      var maxHoursValue = this.option('use24HourFormat') ? 24 : 12;
      return (maxHoursValue + hours) % maxHoursValue;
    },
    _createMinuteBox: function _createMinuteBox() {
      var _this3 = this;
      var editor = this._minuteBox = this._createComponent((0, _renderer.default)('<div>'), _number_box.default, (0, _extend.extend)({
        min: -1,
        max: 60,
        value: this._getValue().getMinutes(),
        onKeyboardHandled: function onKeyboardHandled(opts) {
          return _this3._keyboardHandler(opts);
        },
        onValueChanged: function onValueChanged(_ref2) {
          var value = _ref2.value,
              component = _ref2.component;
          var newMinutes = (60 + value) % 60;
          component.option('value', newMinutes);
          var time = new Date(_this3._getValue());
          time.setMinutes(newMinutes);
          _ui.default.normalizeTime(time);
          _this3.option('value', time);
        }
      }, this._getNumberBoxConfig()));
      editor.setAria('label', 'minutes');
    },
    _createFormat12Box: function _createFormat12Box() {
      var _this4 = this;
      var periodNames = _date.default.getPeriodNames();
      var editor = this._format12 = this._createComponent((0, _renderer.default)('<div>').addClass(TIMEVIEW_FORMAT12_CLASS), _select_box.default, {
        items: [{
          value: TIMEVIEW_FORMAT12_AM,
          text: periodNames[0]
        }, {
          value: TIMEVIEW_FORMAT12_PM,
          text: periodNames[1]
        }],
        valueExpr: 'value',
        displayExpr: 'text',
        onKeyboardHandled: function onKeyboardHandled(opts) {
          return _this4._keyboardHandler(opts);
        },
        onValueChanged: function onValueChanged(_ref3) {
          var value = _ref3.value;
          var hours = _this4._getValue().getHours();
          var time = new Date(_this4._getValue());
          var newHours = (hours + value * 12) % 24;
          time.setHours(newHours);
          _this4.option('value', time);
        },
        value: this._getValue().getHours() >= 12 ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM,
        stylingMode: this.option('stylingMode')
      });
      editor.setAria('label', 'type');
    },
    _refreshFormat12: function _refreshFormat12() {
      if (this.option('use24HourFormat')) return;
      var value = this._getValue();
      var hours = value.getHours();
      var isPM = hours >= 12;
      var newValue = isPM ? TIMEVIEW_FORMAT12_PM : TIMEVIEW_FORMAT12_AM;
      this._silentEditorValueUpdate(this._format12, newValue);
    },
    _silentEditorValueUpdate: function _silentEditorValueUpdate(editor, value) {
      if (editor) {
        editor._suppressValueChangeAction();
        editor.option('value', value);
        editor._resumeValueChangeAction();
      }
    },
    _getNumberBoxConfig: function _getNumberBoxConfig() {
      return {
        showSpinButtons: true,
        displayValueFormatter: function displayValueFormatter(value) {
          return (value < 10 ? '0' : '') + value;
        },
        stylingMode: this.option('stylingMode')
      };
    },
    _normalizeHours: function _normalizeHours(hours) {
      return this.option('use24HourFormat') ? hours : hours % 12 || 12;
    },
    _updateField: function _updateField() {
      var hours = this._normalizeHours(this._getValue().getHours());
      this._silentEditorValueUpdate(this._hourBox, hours);
      this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
      this._refreshFormat12();
    },
    _updateTime: function _updateTime() {
      if (this.option('_showClock')) {
        this._updateClock();
      }
      this._updateField();
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._updateTime();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'value':
          this._updateTime();
          this.callBase(args);
          break;
        case '_arrowOffset':
          break;
        case 'use24HourFormat':
        case '_showClock':
        case 'stylingMode':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxTimeView', TimeView);
  var _default = TimeView;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../editor/editor","../number_box","../select_box","../box","../../core/utils/extend","../../core/component_registrator","../../localization/date","./ui.date_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../editor/editor"), require("../number_box"), require("../select_box"), require("../box"), require("../../core/utils/extend"), require("../../core/component_registrator"), require("../../localization/date"), require("./ui.date_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.time_view.js.map