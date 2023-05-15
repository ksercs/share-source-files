!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/header/calendar.js"], ["../../../core/renderer","../../../core/devices","../../../core/component_registrator","../../widget/ui.widget","../../popover/ui.popover","../../popup/ui.popup","../../calendar","../../scroll_view/ui.scrollable"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/header/calendar.js", ["../../../core/renderer", "../../../core/devices", "../../../core/component_registrator", "../../widget/ui.widget", "../../popover/ui.popover", "../../popup/ui.popup", "../../calendar", "../../scroll_view/ui.scrollable"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("../../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../../popover/ui.popover"));
  var _ui3 = _interopRequireDefault($__require("../../popup/ui.popup"));
  var _calendar = _interopRequireDefault($__require("../../calendar"));
  var _ui4 = _interopRequireDefault($__require("../../scroll_view/ui.scrollable"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var CALENDAR_CLASS = 'dx-scheduler-navigator-calendar';
  var CALENDAR_POPOVER_CLASS = 'dx-scheduler-navigator-calendar-popover';
  var SchedulerCalendar = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(SchedulerCalendar, _Widget);
    function SchedulerCalendar() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = SchedulerCalendar.prototype;
    _proto.show = function show(target) {
      if (!this._isMobileLayout()) {
        this._overlay.option('target', target);
      }
      this._overlay.show();
    };
    _proto.hide = function hide() {
      this._overlay.hide();
    };
    _proto._keyboardHandler = function _keyboardHandler(opts) {
      var _this$_calendar;
      (_this$_calendar = this._calendar) === null || _this$_calendar === void 0 ? void 0 : _this$_calendar._keyboardHandler(opts);
    };
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this.$element();
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      this._renderOverlay();
    };
    _proto._renderOverlay = function _renderOverlay() {
      var _this = this;
      this.$element().addClass(CALENDAR_POPOVER_CLASS);
      var isMobileLayout = this._isMobileLayout();
      var overlayType = isMobileLayout ? _ui3.default : _ui2.default;
      this._overlay = this._createComponent(this.$element(), overlayType, {
        contentTemplate: function contentTemplate() {
          return _this._createOverlayContent();
        },
        onShown: function onShown() {
          return _this._calendar.focus();
        },
        defaultOptionsRules: [{
          device: function device() {
            return isMobileLayout;
          },
          options: {
            fullScreen: true,
            showCloseButton: false,
            toolbarItems: [{
              shortcut: 'cancel'
            }]
          }
        }]
      });
    };
    _proto._createOverlayContent = function _createOverlayContent() {
      var result = (0, _renderer.default)('<div>').addClass(CALENDAR_CLASS);
      this._calendar = this._createComponent(result, _calendar.default, this._getCalendarOptions());
      if (this._isMobileLayout()) {
        var scrollable = this._createScrollable(result);
        return scrollable.$element();
      }
      return result;
    };
    _proto._createScrollable = function _createScrollable(content) {
      var result = this._createComponent('<div>', _ui4.default, {
        direction: 'vertical'
      });
      result.$content().append(content);
      return result;
    };
    _proto._getCalendarOptions = function _getCalendarOptions() {
      return {
        value: this.option('date'),
        min: this.option('min'),
        max: this.option('max'),
        firstDayOfWeek: this.option('firstDayOfWeek'),
        focusStateEnabled: this.option('focusStateEnabled'),
        onValueChanged: this.option('onValueChanged'),
        skipFocusCheck: true,
        tabIndex: this.option('tabIndex'),
        width: '100%'
      };
    };
    _proto._isMobileLayout = function _isMobileLayout() {
      return !_devices.default.current().generic;
    };
    return SchedulerCalendar;
  }(_ui.default);
  exports.default = SchedulerCalendar;
  (0, _component_registrator.default)('dxSchedulerCalendarPopup', SchedulerCalendar);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../core/devices","../../../core/component_registrator","../../widget/ui.widget","../../popover/ui.popover","../../popup/ui.popup","../../calendar","../../scroll_view/ui.scrollable"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../core/devices"), require("../../../core/component_registrator"), require("../../widget/ui.widget"), require("../../popover/ui.popover"), require("../../popup/ui.popup"), require("../../calendar"), require("../../scroll_view/ui.scrollable"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=calendar.js.map