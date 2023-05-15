!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.calendar.js"], ["../calendar","./ui.date_box.strategy","../../core/utils/date","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.calendar.js", ["../calendar", "./ui.date_box.strategy", "../../core/utils/date", "../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _calendar = _interopRequireDefault($__require("../calendar"));
  var _uiDate_box = _interopRequireDefault($__require("./ui.date_box.strategy"));
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var CalendarStrategy = _uiDate_box.default.inherit({
    NAME: 'Calendar',
    getDefaultOptions: function getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        todayButtonText: _message.default.format('dxCalendar-todayButtonText')
      });
    },
    supportedKeys: function supportedKeys() {
      var homeEndHandler = function homeEndHandler(e) {
        if (this.option('opened')) {
          e.preventDefault();
          return true;
        }
        return false;
      };
      return {
        rightArrow: function rightArrow() {
          if (this.option('opened')) {
            return true;
          }
        },
        leftArrow: function leftArrow() {
          if (this.option('opened')) {
            return true;
          }
        },
        enter: function (e) {
          if (this.dateBox.option('opened')) {
            e.preventDefault();
            if (this._widget.option('zoomLevel') === this._widget.option('maxZoomLevel')) {
              var viewValue = this._getContouredValue();
              var lastActionElement = this._lastActionElement;
              var shouldCloseDropDown = this._closeDropDownByEnter();
              if (shouldCloseDropDown && viewValue && lastActionElement === 'calendar') {
                this.dateBoxValue(viewValue, e);
              }
              shouldCloseDropDown && this.dateBox.close();
              this.dateBox._valueChangeEventHandler(e);
              return !shouldCloseDropDown;
            } else {
              return true;
            }
          } else {
            this.dateBox._valueChangeEventHandler(e);
          }
        }.bind(this),
        home: homeEndHandler,
        end: homeEndHandler
      };
    },
    getDisplayFormat: function getDisplayFormat(displayFormat) {
      return displayFormat || 'shortdate';
    },
    _closeDropDownByEnter: function _closeDropDownByEnter() {
      return true;
    },
    _getWidgetName: function _getWidgetName() {
      return _calendar.default;
    },
    _getContouredValue: function _getContouredValue() {
      return this._widget._view.option('contouredDate');
    },
    getKeyboardListener: function getKeyboardListener() {
      return this._widget;
    },
    _getWidgetOptions: function _getWidgetOptions() {
      var disabledDates = this.dateBox.option('disabledDates');
      return (0, _extend.extend)(this.dateBox.option('calendarOptions'), {
        value: this.dateBoxValue() || null,
        dateSerializationFormat: null,
        min: this.dateBox.dateOption('min'),
        max: this.dateBox.dateOption('max'),
        onValueChanged: this._valueChangedHandler.bind(this),
        onCellClick: this._cellClickHandler.bind(this),
        tabIndex: null,
        disabledDates: (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
        onContouredChanged: this._refreshActiveDescendant.bind(this),
        skipFocusCheck: true
      });
    },
    _injectComponent: function _injectComponent(func) {
      var that = this;
      return function (params) {
        (0, _extend.extend)(params, {
          component: that.dateBox
        });
        return func(params);
      };
    },
    _refreshActiveDescendant: function _refreshActiveDescendant(e) {
      this._lastActionElement = 'calendar';
      this.dateBox.setAria('activedescendant', e.actionValue);
    },
    _getTodayButtonConfig: function _getTodayButtonConfig() {
      var _this = this;
      var buttonsLocation = this.dateBox.option('buttonsLocation');
      var isButtonsLocationDefault = buttonsLocation === 'default';
      var position = isButtonsLocationDefault ? ['bottom', 'center'] : (0, _common.splitPair)(buttonsLocation);
      return {
        widget: 'dxButton',
        toolbar: position[0],
        location: position[1] === 'after' ? 'before' : position[1],
        options: {
          onInitialized: function (e) {
            e.component.registerKeyHandler('escape', this._escapeHandler.bind(this));
          }.bind(this),
          onClick: function onClick(args) {
            _this._widget._toTodayView(args);
          },
          text: this.dateBox.option('todayButtonText'),
          type: 'today'
        }
      };
    },
    _isCalendarVisible: function _isCalendarVisible() {
      var _this$dateBox$option = this.dateBox.option(),
          calendarOptions = _this$dateBox$option.calendarOptions;
      return (0, _type.isEmptyObject)(calendarOptions) || calendarOptions.visible !== false;
    },
    _getPopupToolbarItems: function _getPopupToolbarItems(toolbarItems) {
      var useButtons = this.dateBox.option('applyValueMode') === 'useButtons';
      var shouldRenderTodayButton = useButtons && this._isCalendarVisible();
      if (shouldRenderTodayButton) {
        var todayButton = this._getTodayButtonConfig();
        return [todayButton].concat(_toConsumableArray(toolbarItems));
      }
      return toolbarItems;
    },
    popupConfig: function popupConfig(_popupConfig) {
      return (0, _extend.extend)(true, _popupConfig, {
        position: {
          collision: 'flipfit flip'
        },
        width: 'auto'
      });
    },
    _escapeHandler: function _escapeHandler() {
      this.dateBox.close();
      this.dateBox.focus();
    },
    _valueChangedHandler: function _valueChangedHandler(e) {
      var value = e.value;
      var prevValue = e.previousValue;
      if (_date.default.sameDate(value, prevValue) && _date.default.sameHoursAndMinutes(value, prevValue)) {
        return;
      }
      if (this.dateBox.option('applyValueMode') === 'instantly') {
        this.dateBoxValue(this.getValue(), e.event);
      }
    },
    _updateValue: function _updateValue() {
      if (!this._widget) {
        return;
      }
      this._widget.option('value', this.dateBoxValue());
    },
    textChangedHandler: function textChangedHandler() {
      this._lastActionElement = 'input';
      if (this.dateBox.option('opened') && this._widget) {
        this._updateValue(true);
      }
    },
    _cellClickHandler: function _cellClickHandler(e) {
      var dateBox = this.dateBox;
      if (dateBox.option('applyValueMode') === 'instantly') {
        dateBox.option('opened', false);
        this.dateBoxValue(this.getValue(), e.event);
      }
    }
  });
  var _default = CalendarStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../calendar","./ui.date_box.strategy","../../core/utils/date","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../calendar"), require("./ui.date_box.strategy"), require("../../core/utils/date"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.strategy.calendar.js.map