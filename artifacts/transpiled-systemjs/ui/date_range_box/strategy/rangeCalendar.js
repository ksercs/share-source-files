!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/date_range_box/strategy/rangeCalendar.js"], ["../../../core/renderer","../../date_box/ui.date_box.strategy.calendar","../../../core/utils/extend","../ui.date_range.utils","../../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/date_range_box/strategy/rangeCalendar.js", ["../../../core/renderer", "../../date_box/ui.date_box.strategy.calendar", "../../../core/utils/extend", "../ui.date_range.utils", "../../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _uiDate_boxStrategy = _interopRequireDefault($__require("../../date_box/ui.date_box.strategy.calendar"));
  var _extend = $__require("../../../core/utils/extend");
  var _uiDate_range = $__require("../ui.date_range.utils");
  var _type = $__require("../../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
  var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
  var RangeCalendarStrategy = /*#__PURE__*/function (_CalendarStrategy) {
    _inheritsLoose(RangeCalendarStrategy, _CalendarStrategy);
    function RangeCalendarStrategy(dateBox) {
      var _this;
      _this = _CalendarStrategy.call(this) || this;
      _this.dateBox = dateBox;
      _this.dateRangeBox = dateBox.option('_dateRangeBoxInstance');
      return _this;
    }
    var _proto = RangeCalendarStrategy.prototype;
    _proto.popupConfig = function popupConfig(_popupConfig) {
      var _this2 = this;
      return (0, _extend.extend)(true, _CalendarStrategy.prototype.popupConfig.call(this, _popupConfig), {
        position: {
          of: this.dateRangeBox.$element()
        },
        onShowing: function onShowing() {
          _this2._widget._restoreViewsMinMaxOptions();
          // this._widget.option('_currentSelection', 'startDate');
        }
      });
    };
    _proto._getPopup = function _getPopup() {
      return _CalendarStrategy.prototype._getPopup.call(this) || this.dateRangeBox.getStartDateBox()._popup;
    };
    _proto.supportedKeys = function supportedKeys() {
      var _this3 = this;
      var supportedKeys = _extends({}, _CalendarStrategy.prototype.supportedKeys.call(this), {
        rightArrow: function rightArrow() {
          if (_this3.dateRangeBox.option('opened')) {
            return true;
          }
        },
        leftArrow: function leftArrow() {
          if (_this3.dateRangeBox.option('opened')) {
            return true;
          }
        },
        enter: function enter(e) {
          if (_this3.dateRangeBox.option('opened')) {
            _this3.dateRangeBox.getStartDateBox()._strategy._widget._enterKeyHandler(e);
            _this3.dateBox._valueChangeEventHandler(e);
            _this3.dateRangeBox.getStartDateBox()._strategy._widget.option('values', _this3.dateRangeBox.option('value'));
            return false;
          }
        }
      });
      return supportedKeys;
    };
    _proto._getWidgetOptions = function _getWidgetOptions() {
      var _this$dateRangeBox$op = this.dateRangeBox.option(),
          disabledDatesValue = _this$dateRangeBox$op.disabledDates,
          value = _this$dateRangeBox$op.value,
          multiView = _this$dateRangeBox$op.multiView;
      var disabledDates = (0, _type.isFunction)(disabledDatesValue) ? this._injectComponent(disabledDatesValue) : disabledDates;
      return (0, _extend.extend)(_CalendarStrategy.prototype._getWidgetOptions.call(this), {
        disabledDates: disabledDates,
        values: value,
        selectionMode: 'range',
        viewsCount: multiView ? 2 : 1,
        width: 260,
        _allowChangeSelectionOrder: true,
        _currentSelection: this.getCurrentSelection()
      });
    };
    _proto._injectComponent = function _injectComponent(func) {
      var _this4 = this;
      return function (params) {
        return func((0, _extend.extend)(params, {
          component: _this4.dateRangeBox
        }));
      };
    };
    _proto.getKeyboardListener = function getKeyboardListener() {
      return this.dateRangeBox.getStartDateBox() ? this.dateRangeBox.getStartDateBox()._strategy._widget : this._widget;
    };
    _proto.getValue = function getValue() {
      return this._widget.option('values');
    };
    _proto._updateValue = function _updateValue() {
      if (!this._widget) {
        return;
      }
      this._widget.option('values', this.dateRangeBox.option('value'));
    };
    _proto._valueChangedHandler = function _valueChangedHandler(_ref) {
      var value = _ref.value,
          previousValue = _ref.previousValue,
          event = _ref.event;
      if ((0, _uiDate_range.isSameDateArrays)(value, previousValue)) {
        return;
      }
      var isInstantlyMode = this.dateRangeBox.option('applyValueMode') === 'instantly';
      if (!isInstantlyMode && !event) {
        this.dateRangeBox.updateValue(value);
        return;
      }
      if (this._widget.option('_currentSelection') === 'startDate') {
        if (isInstantlyMode) {
          this.dateRangeBox.updateValue(value, event);
        }
        this.getDateRangeBox().getEndDateBox().focus();
        // this._widget.option('_currentSelection', 'endDate');
        this._widget._setViewsMinOption(value[0]);

        // if(value[1]) {
        //     this._widget.option('currentDate', value[1]);
        // }
      } else {
        this.setActiveEndDateBox();
        if (isInstantlyMode) {
          this.dateRangeBox.updateValue(value, event);
          this.getDateRangeBox().close();
        } else {
          this.setActiveStartDateBox();
          this.getDateRangeBox().getStartDateBox().focus();
        }
        // this._widget.option('_currentSelection', 'startDate');
        this._widget._setViewsMaxOption(value[1]);
      }
    };
    _proto.getCurrentSelection = function getCurrentSelection() {
      return this.dateRangeBox.option('_currentSelection');
    };
    _proto.isStartDateBoxActive = function isStartDateBoxActive() {
      return this.dateBox.$element().hasClass('dx-start-datebox');
    };
    _proto._closeDropDownByEnter = function _closeDropDownByEnter() {
      if (this._widget.option('_currentSelection') === 'startDate') {
        return false;
      } else {
        return true;
      }
    };
    _proto.dateBoxValue = function dateBoxValue() {
      if (arguments.length) {
        return this.dateBox.dateValue.apply(this.dateBox, arguments);
      } else {
        return this.dateBox.dateOption.apply(this.dateBox, ['value']);
      }
    };
    _proto._cellClickHandler = function _cellClickHandler() {};
    _proto.setActiveStartDateBox = function setActiveStartDateBox() {
      this.dateBox = this.dateRangeBox.getStartDateBox();
    };
    _proto.setActiveEndDateBox = function setActiveEndDateBox() {
      this.dateBox = this.dateRangeBox.getEndDateBox();
    };
    _proto.getDateRangeBox = function getDateRangeBox() {
      return this.dateRangeBox;
    };
    _proto.isStartDateSelected = function isStartDateSelected(_ref2) {
      var currentTarget = _ref2.currentTarget;
      if ((0, _renderer.default)(currentTarget).hasClass(CALENDAR_RANGE_START_DATE_CLASS)) {
        return true;
      }
      return false;
    };
    _proto.isEndDateSelected = function isEndDateSelected(_ref3) {
      var currentTarget = _ref3.currentTarget;
      if ((0, _renderer.default)(currentTarget).hasClass(CALENDAR_RANGE_END_DATE_CLASS)) {
        return true;
      }
      return false;
    };
    return RangeCalendarStrategy;
  }(_uiDate_boxStrategy.default);
  var _default = RangeCalendarStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../date_box/ui.date_box.strategy.calendar","../../../core/utils/extend","../ui.date_range.utils","../../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../date_box/ui.date_box.strategy.calendar"), require("../../../core/utils/extend"), require("../ui.date_range.utils"), require("../../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rangeCalendar.js.map