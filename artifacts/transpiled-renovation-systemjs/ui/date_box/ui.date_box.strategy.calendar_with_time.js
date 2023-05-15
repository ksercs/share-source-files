!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.calendar_with_time.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/window","./ui.date_box.strategy.calendar","./ui.time_view","../../localization/date","../../core/utils/extend","../../core/utils/date","../box","./ui.date_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_box.strategy.calendar_with_time.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/window", "./ui.date_box.strategy.calendar", "./ui.time_view", "../../localization/date", "../../core/utils/extend", "../../core/utils/date", "../box", "./ui.date_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _uiDate_boxStrategy = _interopRequireDefault($__require("./ui.date_box.strategy.calendar"));
  var _ui = _interopRequireDefault($__require("./ui.time_view"));
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _extend = $__require("../../core/utils/extend");
  var _date2 = _interopRequireDefault($__require("../../core/utils/date"));
  var _box = _interopRequireDefault($__require("../box"));
  var _ui2 = _interopRequireDefault($__require("./ui.date_utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var SHRINK_VIEW_SCREEN_WIDTH = 573;
  var DATEBOX_ADAPTIVITY_MODE_CLASS = 'dx-datebox-adaptivity-mode';
  var DATEBOX_TIMEVIEW_SIDE_CLASS = 'dx-datebox-datetime-time-side';
  var CalendarWithTimeStrategy = _uiDate_boxStrategy.default.inherit({
    NAME: 'CalendarWithTime',
    getDefaultOptions: function getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        applyValueMode: 'useButtons',
        buttonsLocation: 'bottom after',
        'dropDownOptions.showTitle': false
      });
    },
    _closeDropDownByEnter: function _closeDropDownByEnter() {
      return _date2.default.sameDate(this._getContouredValue(), this.widgetOption('value'));
    },
    getDisplayFormat: function getDisplayFormat(displayFormat) {
      return displayFormat || 'shortdateshorttime';
    },
    _is24HourFormat: function _is24HourFormat() {
      return _date.default.is24HourFormat(this.getDisplayFormat(this.dateBox.option('displayFormat')));
    },
    _getContouredValue: function _getContouredValue() {
      var viewDate = this.callBase();
      return this._updateDateTime(viewDate);
    },
    _renderWidget: function _renderWidget() {
      this.callBase();
      this._timeView = this.dateBox._createComponent((0, _renderer.default)('<div>'), _ui.default, {
        value: this.dateBoxValue(),
        _showClock: !this._isShrinkView(),
        use24HourFormat: this._is24HourFormat(),
        onValueChanged: this._valueChangedHandler.bind(this),
        stylingMode: this.dateBox.option('stylingMode')
      });
      this._timeView.registerKeyHandler('escape', this._escapeHandler.bind(this));
    },
    renderOpenedState: function renderOpenedState() {
      this.callBase();
      var popup = this._getPopup();
      if (popup) {
        popup.$wrapper().toggleClass(DATEBOX_ADAPTIVITY_MODE_CLASS, this._isSmallScreen());
      }
      clearTimeout(this._repaintTimer);
      this._repaintTimer = setTimeout(function () {
        this._getPopup() && this._getPopup().repaint();
      }.bind(this), 0);
    },
    isAdaptivityChanged: function isAdaptivityChanged() {
      var isAdaptiveMode = this._isShrinkView();
      var currentAdaptiveMode = this._currentAdaptiveMode;
      if (isAdaptiveMode !== currentAdaptiveMode) {
        this._currentAdaptiveMode = isAdaptiveMode;
        return currentAdaptiveMode !== undefined;
      }
      return this.callBase();
    },
    _updateValue: function _updateValue(preventDefaultValue) {
      var date = this.dateBoxValue();
      if (!date && !preventDefaultValue) {
        date = new Date();
        _ui2.default.normalizeTime(date);
      }
      this.callBase();
      if (this._timeView) {
        date && this._timeView.option('value', date);
        this._timeView.option('use24HourFormat', this._is24HourFormat());
      }
    },
    _isSmallScreen: function _isSmallScreen() {
      return (0, _size.getWidth)(window) <= SHRINK_VIEW_SCREEN_WIDTH;
    },
    _isShrinkView: function _isShrinkView() {
      return !this.dateBox.option('showAnalogClock') || this.dateBox.option('adaptivityEnabled') && this._isSmallScreen();
    },
    _getBoxItems: function _getBoxItems() {
      var items = [{
        ratio: 0,
        shrink: 0,
        baseSize: 'auto',
        name: 'calendar'
      }];
      if (!this._isShrinkView()) {
        items.push({
          ratio: 0,
          shrink: 0,
          baseSize: 'auto',
          name: 'time'
        });
      }
      return items;
    },
    renderPopupContent: function renderPopupContent() {
      this.callBase();
      this._currentAdaptiveMode = this._isShrinkView();
      var $popupContent = this._getPopup().$content();
      this._box = this.dateBox._createComponent((0, _renderer.default)('<div>').appendTo($popupContent), _box.default, {
        direction: 'row',
        crossAlign: 'stretch',
        items: this._getBoxItems(),
        itemTemplate: function (data, i, element) {
          var $container = (0, _renderer.default)('<div>');
          switch (data.name) {
            case 'calendar':
              $container.append(this._widget.$element());
              if (this._isShrinkView()) {
                this._timeView.$element().addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
                $container.append(this._timeView.$element());
              }
              break;
            case 'time':
              $container.append(this._timeView.$element());
              (0, _renderer.default)(element).addClass(DATEBOX_TIMEVIEW_SIDE_CLASS);
              break;
          }
          return $container;
        }.bind(this)
      });
      this._attachTabHandler();
    },
    popupConfig: function popupConfig(_popupConfig) {
      var calendarPopupConfig = this.callBase(_popupConfig);
      return (0, _extend.extend)(calendarPopupConfig, {
        width: 'auto'
      });
    },
    getFirstPopupElement: function getFirstPopupElement() {
      return this._timeView._hourBox.$element().find('input');
    },
    _attachTabHandler: function _attachTabHandler() {
      var dateBox = this.dateBox;
      var handler = function handler(e) {
        if (e.shiftKey) {
          e.preventDefault();
          dateBox.focus();
        }
      };
      this._timeView._hourBox.registerKeyHandler('tab', handler);
    },
    _preventFocusOnPopup: function _preventFocusOnPopup(e) {
      if (!(0, _renderer.default)(e.target).hasClass('dx-texteditor-input')) {
        this.callBase.apply(this, arguments);
        if (!this.dateBox._hasFocusClass()) {
          this.dateBox.focus();
        }
      }
    },
    _updateDateTime: function _updateDateTime(date) {
      var time = this._timeView.option('value');
      date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      return date;
    },
    getValue: function getValue() {
      var _this$_widget$option;
      var date = (_this$_widget$option = this._widget.option('value')) !== null && _this$_widget$option !== void 0 ? _this$_widget$option : this._widget.getContouredDate();
      date = date ? new Date(date) : new Date();
      return this._updateDateTime(date);
    },
    dispose: function dispose() {
      clearTimeout(this._removeMinWidthTimer);
      clearTimeout(this._repaintTimer);
      this.callBase();
    }
  });
  var _default = CalendarWithTimeStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/window","./ui.date_box.strategy.calendar","./ui.time_view","../../localization/date","../../core/utils/extend","../../core/utils/date","../box","./ui.date_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/window"), require("./ui.date_box.strategy.calendar"), require("./ui.time_view"), require("../../localization/date"), require("../../core/utils/extend"), require("../../core/utils/date"), require("../box"), require("./ui.date_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.strategy.calendar_with_time.js.map