!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/header/header.js"], ["../../../core/renderer","../../../core/utils/extend","../../../core/component_registrator","../../../core/errors","../../../core/devices","../../widget/ui.widget","../../toolbar","./calendar","../../../core/utils/date","./viewSwitcher","./dateNavigator","../../../ui/button_group","../../../ui/drop_down_button","./utils","../../../renovation/ui/scheduler/model/views"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/header/header.js", ["../../../core/renderer", "../../../core/utils/extend", "../../../core/component_registrator", "../../../core/errors", "../../../core/devices", "../../widget/ui.widget", "../../toolbar", "./calendar", "../../../core/utils/date", "./viewSwitcher", "./dateNavigator", "../../../ui/button_group", "../../../ui/drop_down_button", "./utils", "../../../renovation/ui/scheduler/model/views"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.SchedulerHeader = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _extend = $__require("../../../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _errors = _interopRequireDefault($__require("../../../core/errors"));
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _ui = _interopRequireDefault($__require("../../widget/ui.widget"));
  var _toolbar = _interopRequireDefault($__require("../../toolbar"));
  var _calendar = _interopRequireDefault($__require("./calendar"));
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _viewSwitcher = $__require("./viewSwitcher");
  var _dateNavigator = $__require("./dateNavigator");
  $__require("../../../ui/button_group");
  $__require("../../../ui/drop_down_button");
  var _utils = $__require("./utils");
  var _views = $__require("../../../renovation/ui/scheduler/model/views");
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
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DEFAULT_ELEMENT = 'defaultElement';
  var VIEW_SWITCHER = 'viewSwitcher';
  var DATE_NAVIGATOR = 'dateNavigator';
  var COMPONENT_CLASS = 'dx-scheduler-header';
  var SchedulerHeader = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(SchedulerHeader, _Widget);
    function SchedulerHeader() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = SchedulerHeader.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        _useShortDateFormat: !_devices.default.real().generic || _devices.default.isSimulator()
      });
    };
    _proto._createEventMap = function _createEventMap() {
      var _this = this;
      this.eventMap = new Map([['currentView', [function (view) {
        _this.currentView = (0, _views.getCurrentView)((0, _utils.getViewName)(view), _this.option('views'));
      }]], ['items', [this.repaint.bind(this)]], ['views', [_utils.validateViews]], ['currentDate', [this._getCalendarOptionUpdater('date')]], ['min', [this._getCalendarOptionUpdater('min')]], ['max', [this._getCalendarOptionUpdater('max')]], ['tabIndex', [this.repaint.bind(this)]], ['focusStateEnabled', [this.repaint.bind(this)]], ['useDropDownViewSwitcher', [this.repaint.bind(this)]]]);
    };
    _proto._addEvent = function _addEvent(name, event) {
      if (!this.eventMap.has(name)) {
        this.eventMap.set(name, []);
      }
      var events = this.eventMap.get(name);
      this.eventMap.set(name, [].concat(_toConsumableArray(events), [event]));
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name,
          value = args.value;
      if (this.eventMap.has(name)) {
        var events = this.eventMap.get(name);
        events.forEach(function (event) {
          event(value);
        });
      }
    };
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this._createEventMap();
      this.$element().addClass(COMPONENT_CLASS);
      this.currentView = (0, _views.getCurrentView)((0, _utils.getViewName)(this.option('currentView')), this.option('views'));
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      this._createEventMap();
      this._renderToolbar();
    };
    _proto._renderToolbar = function _renderToolbar() {
      var config = this._createToolbarConfig();
      var toolbarElement = (0, _renderer.default)('<div>');
      toolbarElement.appendTo(this.$element());
      this._toolbar = this._createComponent(toolbarElement, _toolbar.default, config);
    };
    _proto._createToolbarConfig = function _createToolbarConfig() {
      var _this2 = this;
      var items = this.option('items');
      var parsedItems = items.map(function (element) {
        return _this2._parseItem(element);
      });
      return {
        items: parsedItems
      };
    };
    _proto._parseItem = function _parseItem(item) {
      var isDefaultElement = this._isDefaultItem(item);
      if (isDefaultElement) {
        var defaultElementType = item[DEFAULT_ELEMENT];
        switch (defaultElementType) {
          case VIEW_SWITCHER:
            if (this.option('useDropDownViewSwitcher')) {
              return (0, _viewSwitcher.getDropDownViewSwitcher)(this, item);
            }
            return (0, _viewSwitcher.getViewSwitcher)(this, item);
          case DATE_NAVIGATOR:
            this._renderCalendar();
            return (0, _dateNavigator.getDateNavigator)(this, item);
          default:
            _errors.default.log("Unknown default element type: ".concat(defaultElementType));
            break;
        }
      }
      return item;
    };
    _proto._callEvent = function _callEvent(event, arg) {
      if (this.eventMap.has(event)) {
        var events = this.eventMap.get(event);
        events.forEach(function (event) {
          return event(arg);
        });
      }
    };
    _proto._updateCurrentView = function _updateCurrentView(view) {
      var onCurrentViewChange = this.option('onCurrentViewChange');
      onCurrentViewChange(view.name);
      this._callEvent('currentView', view);
    };
    _proto._updateCurrentDate = function _updateCurrentDate(date) {
      var onCurrentDateChange = this.option('onCurrentDateChange');
      onCurrentDateChange(date);
      this._callEvent('currentDate', date);
    };
    _proto._renderCalendar = function _renderCalendar() {
      var _this3 = this;
      this._calendar = this._createComponent('<div>', _calendar.default, {
        date: this.option('currentDate'),
        min: this.option('min'),
        max: this.option('max'),
        firstDayOfWeek: this.option('firstDayOfWeek'),
        focusStateEnabled: this.option('focusStateEnabled'),
        tabIndex: this.option('tabIndex'),
        onValueChanged: function onValueChanged(e) {
          var date = e.value;
          _this3._updateCurrentDate(date);
          _this3._calendar.hide();
        }
      });
      this._calendar.$element().appendTo(this.$element());
    };
    _proto._getCalendarOptionUpdater = function _getCalendarOptionUpdater(name) {
      var _this4 = this;
      return function (value) {
        if (_this4._calendar) {
          _this4._calendar.option(name, value);
        }
      };
    };
    _proto._getNextDate = function _getNextDate(direction) {
      var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var date = initialDate || this.option('currentDate');
      var options = _extends({}, this.intervalOptions, {
        date: date
      });
      return (0, _utils.getNextIntervalDate)(options, direction);
    };
    _proto._isMonth = function _isMonth() {
      var currentView = this.currentView;
      return (0, _utils.getViewType)(currentView) === 'month';
    };
    _proto._getDisplayedDate = function _getDisplayedDate() {
      var startViewDate = this.option('startViewDate');
      if (this._isMonth()) {
        return (0, _utils.nextWeek)(startViewDate);
      }
      return new Date(startViewDate);
    };
    _proto._getCaption = function _getCaption() {
      var date = this.option('currentDate');
      if (this.option('startViewDate')) {
        date = this._getDisplayedDate();
      }
      date = _date.default.trimTime(date);
      var options = _extends({}, this.intervalOptions, {
        date: date
      });
      var customizationFunction = this.option('customizeDateNavigatorText');
      var useShortDateFormat = this.option('_useShortDateFormat');
      return (0, _utils.getCaption)(options, useShortDateFormat, customizationFunction);
    };
    _proto._updateDateByDirection = function _updateDateByDirection(direction) {
      var date = this._getNextDate(direction);
      this._updateCurrentDate(date);
    };
    _proto._showCalendar = function _showCalendar(e) {
      this._calendar.show(e.element);
    };
    _proto._hideCalendar = function _hideCalendar() {
      this._calendar.hide();
    };
    _proto._isDefaultItem = function _isDefaultItem(item) {
      return Object.prototype.hasOwnProperty.call(item, DEFAULT_ELEMENT);
    };
    _createClass(SchedulerHeader, [{
      key: "views",
      get: function get() {
        return this.option('views');
      }
    }, {
      key: "captionText",
      get: function get() {
        return this._getCaption().text;
      }
    }, {
      key: "intervalOptions",
      get: function get() {
        var step = (0, _utils.getStep)(this.currentView);
        var intervalCount = this.option('intervalCount');
        var firstDayOfWeek = this.option('firstDayOfWeek');
        var agendaDuration = this.option('agendaDuration');
        return {
          step: step,
          intervalCount: intervalCount,
          firstDayOfWeek: firstDayOfWeek,
          agendaDuration: agendaDuration
        };
      }
    }]);
    return SchedulerHeader;
  }(_ui.default);
  exports.SchedulerHeader = SchedulerHeader;
  (0, _component_registrator.default)('dxSchedulerHeader', SchedulerHeader);
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../core/utils/extend","../../../core/component_registrator","../../../core/errors","../../../core/devices","../../widget/ui.widget","../../toolbar","./calendar","../../../core/utils/date","./viewSwitcher","./dateNavigator","../../../ui/button_group","../../../ui/drop_down_button","./utils","../../../renovation/ui/scheduler/model/views"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../core/utils/extend"), require("../../../core/component_registrator"), require("../../../core/errors"), require("../../../core/devices"), require("../../widget/ui.widget"), require("../../toolbar"), require("./calendar"), require("../../../core/utils/date"), require("./viewSwitcher"), require("./dateNavigator"), require("../../../ui/button_group"), require("../../../ui/drop_down_button"), require("./utils"), require("../../../renovation/ui/scheduler/model/views"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=header.js.map