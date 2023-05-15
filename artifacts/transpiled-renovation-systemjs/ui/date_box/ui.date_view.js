!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_view.js"], ["../../core/renderer","../editor/editor","./ui.date_view_roller","../../core/utils/date","../../core/utils/iterator","../../core/utils/extend","./ui.date_utils","../../core/component_registrator","../../localization/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_view.js", ["../../core/renderer", "../editor/editor", "./ui.date_view_roller", "../../core/utils/date", "../../core/utils/iterator", "../../core/utils/extend", "./ui.date_utils", "../../core/component_registrator", "../../localization/date"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _ui = _interopRequireDefault($__require("./ui.date_view_roller"));
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _ui2 = _interopRequireDefault($__require("./ui.date_utils"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _date2 = _interopRequireDefault($__require("../../localization/date"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DATEVIEW_CLASS = 'dx-dateview';
  var DATEVIEW_COMPACT_CLASS = 'dx-dateview-compact';
  var DATEVIEW_WRAPPER_CLASS = 'dx-dateview-wrapper';
  var DATEVIEW_ROLLER_CONTAINER_CLASS = 'dx-dateview-rollers';
  var DATEVIEW_ROLLER_CLASS = 'dx-dateviewroller';
  var TYPE = {
    date: 'date',
    datetime: 'datetime',
    time: 'time'
  };
  var ROLLER_TYPE = {
    year: 'year',
    month: 'month',
    day: 'day',
    hours: 'hours'
  };
  var DateView = _editor.default.inherit({
    _valueOption: function _valueOption() {
      var value = this.option('value');
      var date = new Date(value);
      return !value || isNaN(date) ? this._getDefaultDate() : date;
    },
    _getDefaultDate: function _getDefaultDate() {
      var date = new Date();
      if (this.option('type') === TYPE.date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
      return date;
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        minDate: _ui2.default.MIN_DATEVIEW_DEFAULT_DATE,
        maxDate: _ui2.default.MAX_DATEVIEW_DEFAULT_DATE,
        type: TYPE.date,
        value: new Date(),
        applyCompactClass: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device(_device) {
          return _device.deviceType !== 'desktop';
        },
        options: {
          applyCompactClass: true
        }
      }]);
    },
    _render: function _render() {
      this.callBase();
      this.$element().addClass(DATEVIEW_CLASS);
      this._toggleFormatClasses(this.option('type'));
      this._toggleCompactClass();
    },
    _toggleFormatClasses: function _toggleFormatClasses(currentFormat, previousFormat) {
      this.$element().addClass(DATEVIEW_CLASS + '-' + currentFormat);
      previousFormat && this.$element().removeClass(DATEVIEW_CLASS + '-' + previousFormat);
    },
    _toggleCompactClass: function _toggleCompactClass() {
      this.$element().toggleClass(DATEVIEW_COMPACT_CLASS, this.option('applyCompactClass'));
    },
    _wrapper: function _wrapper() {
      return this._$wrapper;
    },
    _renderContentImpl: function _renderContentImpl() {
      this._$wrapper = (0, _renderer.default)('<div>').addClass(DATEVIEW_WRAPPER_CLASS);
      this._renderRollers();
      this._$wrapper.appendTo(this.$element());
    },
    _renderRollers: function _renderRollers() {
      if (!this._$rollersContainer) {
        this._$rollersContainer = (0, _renderer.default)('<div>').addClass(DATEVIEW_ROLLER_CONTAINER_CLASS);
      }
      this._$rollersContainer.empty();
      this._createRollerConfigs();
      this._rollers = {};
      var that = this;
      (0, _iterator.each)(that._rollerConfigs, function (name) {
        var $roller = (0, _renderer.default)('<div>').appendTo(that._$rollersContainer).addClass(DATEVIEW_ROLLER_CLASS + '-' + that._rollerConfigs[name].type);
        that._rollers[that._rollerConfigs[name].type] = that._createComponent($roller, _ui.default, {
          items: that._rollerConfigs[name].displayItems,
          selectedIndex: that._rollerConfigs[name].selectedIndex,
          showScrollbar: 'never',
          scrollByContent: true,
          onStart: function onStart(e) {
            var roller = e.component;
            roller._toggleActive(true);
            that._setActiveRoller(that._rollerConfigs[name], roller.option('selectedIndex'));
          },
          onEnd: function onEnd(e) {
            var roller = e.component;
            roller._toggleActive(false);
          },
          onClick: function onClick(e) {
            var roller = e.component;
            roller._toggleActive(true);
            that._setActiveRoller(that._rollerConfigs[name], roller.option('selectedIndex'));
            that._setRollerState(that._rollerConfigs[name], roller.option('selectedIndex'));
            roller._toggleActive(false);
          },
          onSelectedIndexChanged: function onSelectedIndexChanged(e) {
            var roller = e.component;
            that._setRollerState(that._rollerConfigs[name], roller.option('selectedIndex'));
          }
        });
      });
      that._$rollersContainer.appendTo(that._wrapper());
    },
    _createRollerConfigs: function _createRollerConfigs(type) {
      var that = this;
      type = type || that.option('type');
      that._rollerConfigs = {};
      _date2.default.getFormatParts(_ui2.default.FORMATS_MAP[type]).forEach(function (partName) {
        that._createRollerConfig(partName);
      });
    },
    _createRollerConfig: function _createRollerConfig(componentName) {
      var componentInfo = _ui2.default.DATE_COMPONENTS_INFO[componentName];
      var valueRange = this._calculateRollerConfigValueRange(componentName);
      var startValue = valueRange.startValue;
      var endValue = valueRange.endValue;
      var formatter = componentInfo.formatter;
      var curDate = this._getCurrentDate();
      var config = {
        type: componentName,
        setValue: componentInfo.setter,
        valueItems: [],
        displayItems: [],
        getIndex: function getIndex(value) {
          return value[componentInfo.getter]() - startValue;
        }
      };
      for (var i = startValue; i <= endValue; i++) {
        config.valueItems.push(i);
        config.displayItems.push(formatter(i, curDate));
      }
      config.selectedIndex = config.getIndex(curDate);
      this._rollerConfigs[componentName] = config;
    },
    _setActiveRoller: function _setActiveRoller(currentRoller) {
      var activeRoller = currentRoller && this._rollers[currentRoller.type];
      (0, _iterator.each)(this._rollers, function () {
        this.toggleActiveState(this === activeRoller);
      });
    },
    _updateRollersPosition: function _updateRollersPosition() {
      var that = this;
      (0, _iterator.each)(this._rollers, function (type) {
        var correctIndex = that._rollerConfigs[type].getIndex(that._getCurrentDate());
        this.option('selectedIndex', correctIndex);
      });
    },
    _setRollerState: function _setRollerState(roller, selectedIndex) {
      if (selectedIndex !== roller.selectedIndex) {
        var rollerValue = roller.valueItems[selectedIndex];
        var setValue = roller.setValue;
        var currentValue = new Date(this._getCurrentDate());
        var currentDate = currentValue.getDate();
        var minDate = this.option('minDate');
        var maxDate = this.option('maxDate');
        if (roller.type === ROLLER_TYPE.month) {
          currentDate = Math.min(currentDate, _ui2.default.getMaxMonthDay(currentValue.getFullYear(), rollerValue));
        } else if (roller.type === ROLLER_TYPE.year) {
          currentDate = Math.min(currentDate, _ui2.default.getMaxMonthDay(rollerValue, currentValue.getMonth()));
        }
        currentValue.setDate(currentDate);
        currentValue[setValue](rollerValue);
        var normalizedDate = _date.default.normalizeDate(currentValue, minDate, maxDate);
        currentValue = _ui2.default.mergeDates(normalizedDate, currentValue, 'time');
        currentValue = _date.default.normalizeDate(currentValue, minDate, maxDate);
        this.option('value', currentValue);
        roller.selectedIndex = selectedIndex;
      }
      if (roller.type === ROLLER_TYPE.year) {
        this._refreshRollers();
      }
      if (roller.type === ROLLER_TYPE.month) {
        this._refreshRoller(ROLLER_TYPE.day);
        this._refreshRoller(ROLLER_TYPE.hours);
      }
    },
    _refreshRoller: function _refreshRoller(rollerType) {
      var roller = this._rollers[rollerType];
      if (roller) {
        this._createRollerConfig(rollerType);
        var rollerConfig = this._rollerConfigs[rollerType];
        if (rollerType === ROLLER_TYPE.day || rollerConfig.displayItems.toString() !== roller.option('items').toString()) {
          roller.option({
            items: rollerConfig.displayItems,
            selectedIndex: rollerConfig.selectedIndex
          });
        }
      }
    },
    _getCurrentDate: function _getCurrentDate() {
      var curDate = this._valueOption();
      var minDate = this.option('minDate');
      var maxDate = this.option('maxDate');
      return _date.default.normalizeDate(curDate, minDate, maxDate);
    },
    _calculateRollerConfigValueRange: function _calculateRollerConfigValueRange(componentName) {
      var curDate = this._getCurrentDate();
      var minDate = this.option('minDate');
      var maxDate = this.option('maxDate');
      var minYear = _date.default.sameYear(curDate, minDate);
      var minMonth = minYear && curDate.getMonth() === minDate.getMonth();
      var maxYear = _date.default.sameYear(curDate, maxDate);
      var maxMonth = maxYear && curDate.getMonth() === maxDate.getMonth();
      var minHour = minMonth && curDate.getDate() === minDate.getDate();
      var maxHour = maxMonth && curDate.getDate() === maxDate.getDate();
      var componentInfo = _ui2.default.DATE_COMPONENTS_INFO[componentName];
      var startValue = componentInfo.startValue;
      var endValue = componentInfo.endValue;
      if (componentName === ROLLER_TYPE.year) {
        startValue = minDate.getFullYear();
        endValue = maxDate.getFullYear();
      }
      if (componentName === ROLLER_TYPE.month) {
        if (minYear) {
          startValue = minDate.getMonth();
        }
        if (maxYear) {
          endValue = maxDate.getMonth();
        }
      }
      if (componentName === ROLLER_TYPE.day) {
        endValue = _ui2.default.getMaxMonthDay(curDate.getFullYear(), curDate.getMonth());
        if (minYear && minMonth) {
          startValue = minDate.getDate();
        }
        if (maxYear && maxMonth) {
          endValue = maxDate.getDate();
        }
      }
      if (componentName === ROLLER_TYPE.hours) {
        startValue = minHour ? minDate.getHours() : startValue;
        endValue = maxHour ? maxDate.getHours() : endValue;
      }
      return {
        startValue: startValue,
        endValue: endValue
      };
    },
    _refreshRollers: function _refreshRollers() {
      this._refreshRoller(ROLLER_TYPE.month);
      this._refreshRoller(ROLLER_TYPE.day);
      this._refreshRoller(ROLLER_TYPE.hours);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'minDate':
        case 'maxDate':
        case 'type':
          this._renderRollers();
          this._toggleFormatClasses(args.value, args.previousValue);
          break;
        case 'visible':
          this.callBase(args);
          if (args.value) {
            this._renderRollers();
          }
          break;
        case 'value':
          this.option('value', this._valueOption());
          this._refreshRollers();
          this._updateRollersPosition();
          break;
        default:
          this.callBase(args);
      }
    },
    _clean: function _clean() {
      this.callBase();
      delete this._$rollersContainer;
    }
  });
  (0, _component_registrator.default)('dxDateView', DateView);
  var _default = DateView;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../editor/editor","./ui.date_view_roller","../../core/utils/date","../../core/utils/iterator","../../core/utils/extend","./ui.date_utils","../../core/component_registrator","../../localization/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../editor/editor"), require("./ui.date_view_roller"), require("../../core/utils/date"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("./ui.date_utils"), require("../../core/component_registrator"), require("../../localization/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_view.js.map