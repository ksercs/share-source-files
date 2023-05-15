!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scheduler/header/header.js"], ["inferno","@devextreme/runtime/inferno","../../../../core/devices","../../toolbar/toolbar","../../../../ui/button_group","../../../../ui/drop_down_button","../../../../core/utils/date","../../../../ui/scheduler/header/utils","./utils","../props","./calendar","../../../../core/options/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/scheduler/header/header.js", ["inferno", "@devextreme/runtime/inferno", "../../../../core/devices", "../../toolbar/toolbar", "../../../../ui/button_group", "../../../../ui/drop_down_button", "../../../../core/utils/date", "../../../../ui/scheduler/header/utils", "./utils", "../props", "./calendar", "../../../../core/options/utils"], true, function ($__require, exports, module) {
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
  exports.SchedulerToolbarProps = exports.SchedulerToolbarBaseProps = exports.SchedulerToolbar = void 0;
  exports.defaultOptions = defaultOptions;
  exports.viewFunction = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _devices = _interopRequireDefault($__require("../../../../core/devices"));
  var _toolbar = $__require("../../toolbar/toolbar");
  $__require("../../../../ui/button_group");
  $__require("../../../../ui/drop_down_button");
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _utils = $__require("../../../../ui/scheduler/header/utils");
  var _utils2 = $__require("./utils");
  var _props = $__require("../props");
  var _calendar = $__require("./calendar");
  var _utils3 = $__require("../../../../core/options/utils");
  var _excluded = ["agendaDuration", "currentDate", "currentView", "currentViewChange", "customizationFunction", "defaultCurrentView", "firstDayOfWeek", "intervalCount", "items", "max", "min", "onCurrentDateUpdate", "onCurrentViewUpdate", "startViewDate", "useDropDownViewSwitcher", "useShortDateFormat", "viewType", "views"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
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
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var trimTime = _date.default.trimTime;
  var viewFunction = function viewFunction(viewModel) {
    var _viewModel$props = viewModel.props,
        currentDate = _viewModel$props.currentDate,
        firstDayOfWeek = _viewModel$props.firstDayOfWeek,
        max = _viewModel$props.max,
        min = _viewModel$props.min;
    var calendarVisible = viewModel.calendarVisible,
        changeCalendarDate = viewModel.changeCalendarDate,
        changeCalendarVisible = viewModel.changeCalendarVisible,
        items = viewModel.items;
    return (0, _inferno.createVNode)(1, "div", "dx-scheduler-header", [(0, _inferno.createComponentVNode)(2, _calendar.SchedulerCalendar, {
      "currentDate": currentDate,
      "onCurrentDateUpdate": changeCalendarDate,
      "min": min,
      "max": max,
      "firstDayOfWeek": firstDayOfWeek,
      "visible": calendarVisible,
      "onVisibleUpdate": changeCalendarVisible
    }), (0, _inferno.createComponentVNode)(2, _toolbar.Toolbar, {
      "items": items
    })], 4);
  };
  exports.viewFunction = viewFunction;
  var SchedulerToolbarBaseProps = Object.defineProperties({
    intervalCount: 1,
    firstDayOfWeek: 0,
    agendaDuration: 7,
    viewType: 'day'
  }, {
    useShortDateFormat: {
      get: function get() {
        return !_devices.default.real().generic || _devices.default.isSimulator();
      },
      configurable: true,
      enumerable: true
    }
  });
  exports.SchedulerToolbarBaseProps = SchedulerToolbarBaseProps;
  var SchedulerToolbarProps = Object.defineProperties({}, {
    intervalCount: {
      get: function get() {
        return SchedulerToolbarBaseProps.intervalCount;
      },
      configurable: true,
      enumerable: true
    },
    firstDayOfWeek: {
      get: function get() {
        return SchedulerToolbarBaseProps.firstDayOfWeek;
      },
      configurable: true,
      enumerable: true
    },
    agendaDuration: {
      get: function get() {
        return SchedulerToolbarBaseProps.agendaDuration;
      },
      configurable: true,
      enumerable: true
    },
    useShortDateFormat: {
      get: function get() {
        return SchedulerToolbarBaseProps.useShortDateFormat;
      },
      configurable: true,
      enumerable: true
    },
    viewType: {
      get: function get() {
        return SchedulerToolbarBaseProps.viewType;
      },
      configurable: true,
      enumerable: true
    },
    useDropDownViewSwitcher: {
      get: function get() {
        return _props.SchedulerProps.useDropDownViewSwitcher;
      },
      configurable: true,
      enumerable: true
    },
    defaultCurrentView: {
      get: function get() {
        return _props.SchedulerProps.currentView;
      },
      configurable: true,
      enumerable: true
    },
    currentViewChange: {
      get: function get() {
        return function () {};
      },
      configurable: true,
      enumerable: true
    }
  });
  exports.SchedulerToolbarProps = SchedulerToolbarProps;
  var SchedulerToolbar = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(SchedulerToolbar, _BaseInfernoComponent);
    function SchedulerToolbar(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.__getterCache = {};
      _this.state = {
        calendarVisible: false,
        currentView: _this.props.currentView !== undefined ? _this.props.currentView : _this.props.defaultCurrentView
      };
      _this.setCurrentView = _this.setCurrentView.bind(_assertThisInitialized(_this));
      _this.setCurrentDate = _this.setCurrentDate.bind(_assertThisInitialized(_this));
      _this.getNextDate = _this.getNextDate.bind(_assertThisInitialized(_this));
      _this.updateDateByDirection = _this.updateDateByDirection.bind(_assertThisInitialized(_this));
      _this.isPreviousButtonDisabled = _this.isPreviousButtonDisabled.bind(_assertThisInitialized(_this));
      _this.isNextButtonDisabled = _this.isNextButtonDisabled.bind(_assertThisInitialized(_this));
      _this.changeCalendarDate = _this.changeCalendarDate.bind(_assertThisInitialized(_this));
      _this.changeCalendarVisible = _this.changeCalendarVisible.bind(_assertThisInitialized(_this));
      _this.showCalendar = _this.showCalendar.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = SchedulerToolbar.prototype;
    _proto.setCurrentView = function setCurrentView(view) {
      if (view.name !== (this.props.currentView !== undefined ? this.props.currentView : this.state.currentView)) {
        this.props.onCurrentViewUpdate(view.name);
      }
    };
    _proto.setCurrentDate = function setCurrentDate(date) {
      if (date.getTime() !== this.props.currentDate.getTime()) {
        this.props.onCurrentDateUpdate(new Date(date));
      }
    };
    _proto.getNextDate = function getNextDate(direction, initialDate) {
      var date = initialDate !== null && initialDate !== void 0 ? initialDate : this.props.currentDate;
      var options = _extends({}, this.intervalOptions, {
        date: date
      });
      return (0, _utils.getNextIntervalDate)(options, direction);
    };
    _proto.updateDateByDirection = function updateDateByDirection(direction) {
      var date = this.getNextDate(direction);
      this.setCurrentDate(date);
    };
    _proto.isPreviousButtonDisabled = function isPreviousButtonDisabled() {
      if (this.props.min === undefined) {
        return false;
      }
      var min = trimTime(new Date(this.props.min));
      var endDate = this.caption.endDate;
      var previousDate = this.getNextDate(-1, endDate);
      return previousDate < min;
    };
    _proto.isNextButtonDisabled = function isNextButtonDisabled() {
      if (this.props.max === undefined) {
        return false;
      }
      var max = new Date(new Date(this.props.max).setHours(23, 59, 59));
      var startDate = this.caption.startDate;
      var nextDate = this.getNextDate(1, startDate);
      return nextDate > max;
    };
    _proto.changeCalendarDate = function changeCalendarDate(date) {
      this.setState(function (__state_argument) {
        return {
          calendarVisible: false
        };
      });
      this.setCurrentDate(date);
    };
    _proto.changeCalendarVisible = function changeCalendarVisible(visible) {
      this.setState(function (__state_argument) {
        return {
          calendarVisible: visible
        };
      });
    };
    _proto.showCalendar = function showCalendar() {
      this.changeCalendarVisible(true);
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      if (this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['viewType'] !== nextProps['viewType']) {
        this.__getterCache['displayedDate'] = undefined;
      }
      if (this.props['views'] !== nextProps['views']) {
        this.__getterCache['views'] = undefined;
      }
      if (this.props['viewType'] !== nextProps['viewType'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['agendaDuration'] !== nextProps['agendaDuration']) {
        this.__getterCache['intervalOptions'] = undefined;
      }
      if (this.props['useDropDownViewSwitcher'] !== nextProps['useDropDownViewSwitcher'] || this.state['currentView'] !== nextState['currentView'] || this.props['currentView'] !== nextProps['currentView'] || this.props['views'] !== nextProps['views'] || this.props['onCurrentViewUpdate'] !== nextProps['onCurrentViewUpdate'] || this.props['viewType'] !== nextProps['viewType'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['agendaDuration'] !== nextProps['agendaDuration'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['useShortDateFormat'] !== nextProps['useShortDateFormat'] || this.props['customizationFunction'] !== nextProps['customizationFunction'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['onCurrentDateUpdate'] !== nextProps['onCurrentDateUpdate'] || this.props['min'] !== nextProps['min'] || this.props['max'] !== nextProps['max'] || this.props['items'] !== nextProps['items']) {
        this.__getterCache['items'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
        }),
        calendarVisible: this.state.calendarVisible,
        step: this.step,
        displayedDate: this.displayedDate,
        caption: this.caption,
        captionText: this.captionText,
        views: this.views,
        selectedView: this.selectedView,
        setCurrentView: this.setCurrentView,
        setCurrentDate: this.setCurrentDate,
        intervalOptions: this.intervalOptions,
        getNextDate: this.getNextDate,
        updateDateByDirection: this.updateDateByDirection,
        isPreviousButtonDisabled: this.isPreviousButtonDisabled,
        isNextButtonDisabled: this.isNextButtonDisabled,
        changeCalendarDate: this.changeCalendarDate,
        changeCalendarVisible: this.changeCalendarVisible,
        showCalendar: this.showCalendar,
        items: this.items,
        restAttributes: this.restAttributes
      });
    };
    _createClass(SchedulerToolbar, [{
      key: "step",
      get: function get() {
        return (0, _utils.getStep)(this.props.viewType);
      }
    }, {
      key: "displayedDate",
      get: function get() {
        var _this2 = this;
        if (this.__getterCache['displayedDate'] !== undefined) {
          return this.__getterCache['displayedDate'];
        }
        return this.__getterCache['displayedDate'] = function () {
          var startViewDate = new Date(_this2.props.startViewDate);
          if ((0, _utils2.isMonthView)(_this2.props.viewType)) {
            return (0, _utils.nextWeek)(startViewDate);
          }
          return startViewDate;
        }();
      }
    }, {
      key: "caption",
      get: function get() {
        var options = {
          step: this.step,
          intervalCount: this.props.intervalCount,
          firstDayOfWeek: this.props.firstDayOfWeek,
          agendaDuration: this.props.agendaDuration,
          date: trimTime(this.displayedDate)
        };
        return (0, _utils.getCaption)(options, this.props.useShortDateFormat, this.props.customizationFunction);
      }
    }, {
      key: "captionText",
      get: function get() {
        return this.caption.text;
      }
    }, {
      key: "views",
      get: function get() {
        var _this3 = this;
        if (this.__getterCache['views'] !== undefined) {
          return this.__getterCache['views'];
        }
        return this.__getterCache['views'] = function () {
          return (0, _utils2.formatViews)(_this3.props.views);
        }();
      }
    }, {
      key: "selectedView",
      get: function get() {
        return (0, _utils.getViewName)(this.props.currentView !== undefined ? this.props.currentView : this.state.currentView);
      }
    }, {
      key: "intervalOptions",
      get: function get() {
        var _this4 = this;
        if (this.__getterCache['intervalOptions'] !== undefined) {
          return this.__getterCache['intervalOptions'];
        }
        return this.__getterCache['intervalOptions'] = function () {
          return {
            step: _this4.step,
            intervalCount: _this4.props.intervalCount,
            firstDayOfWeek: _this4.props.firstDayOfWeek,
            agendaDuration: _this4.props.agendaDuration
          };
        }();
      }
    }, {
      key: "items",
      get: function get() {
        var _this5 = this;
        if (this.__getterCache['items'] !== undefined) {
          return this.__getterCache['items'];
        }
        return this.__getterCache['items'] = function () {
          var options = {
            useDropDownViewSwitcher: _this5.props.useDropDownViewSwitcher,
            selectedView: _this5.selectedView,
            views: _this5.views,
            setCurrentView: function setCurrentView(view) {
              return _this5.setCurrentView(view);
            },
            showCalendar: function showCalendar() {
              return _this5.showCalendar();
            },
            captionText: _this5.captionText,
            updateDateByDirection: function updateDateByDirection(direction) {
              return _this5.updateDateByDirection(direction);
            },
            isPreviousButtonDisabled: _this5.isPreviousButtonDisabled(),
            isNextButtonDisabled: _this5.isNextButtonDisabled()
          };
          return _this5.props.items.map(function (item) {
            return (0, _utils2.formToolbarItem)(item, options);
          });
        }();
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props$currentVi = _extends({}, this.props, {
          currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
        }),
            agendaDuration = _this$props$currentVi.agendaDuration,
            currentDate = _this$props$currentVi.currentDate,
            currentView = _this$props$currentVi.currentView,
            currentViewChange = _this$props$currentVi.currentViewChange,
            customizationFunction = _this$props$currentVi.customizationFunction,
            defaultCurrentView = _this$props$currentVi.defaultCurrentView,
            firstDayOfWeek = _this$props$currentVi.firstDayOfWeek,
            intervalCount = _this$props$currentVi.intervalCount,
            items = _this$props$currentVi.items,
            max = _this$props$currentVi.max,
            min = _this$props$currentVi.min,
            onCurrentDateUpdate = _this$props$currentVi.onCurrentDateUpdate,
            onCurrentViewUpdate = _this$props$currentVi.onCurrentViewUpdate,
            startViewDate = _this$props$currentVi.startViewDate,
            useDropDownViewSwitcher = _this$props$currentVi.useDropDownViewSwitcher,
            useShortDateFormat = _this$props$currentVi.useShortDateFormat,
            viewType = _this$props$currentVi.viewType,
            views = _this$props$currentVi.views,
            restProps = _objectWithoutProperties(_this$props$currentVi, _excluded);
        return restProps;
      }
    }]);
    return SchedulerToolbar;
  }(_inferno2.BaseInfernoComponent);
  exports.SchedulerToolbar = SchedulerToolbar;
  function __processTwoWayProps(defaultProps) {
    var twoWayProps = ['currentView'];
    return Object.keys(defaultProps).reduce(function (props, propName) {
      var propValue = defaultProps[propName];
      var defaultPropName = twoWayProps.some(function (p) {
        return p === propName;
      }) ? 'default' + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
      props[defaultPropName] = propValue;
      return props;
    }, {});
  }
  SchedulerToolbar.defaultProps = SchedulerToolbarProps;
  var __defaultOptionRules = [];
  function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    SchedulerToolbar.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SchedulerToolbar.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps((0, _utils3.convertRulesToOptions)(__defaultOptionRules)))));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../../core/devices","../../toolbar/toolbar","../../../../ui/button_group","../../../../ui/drop_down_button","../../../../core/utils/date","../../../../ui/scheduler/header/utils","./utils","../props","./calendar","../../../../core/options/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../../core/devices"), require("../../toolbar/toolbar"), require("../../../../ui/button_group"), require("../../../../ui/drop_down_button"), require("../../../../core/utils/date"), require("../../../../ui/scheduler/header/utils"), require("./utils"), require("../props"), require("./calendar"), require("../../../../core/options/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=header.js.map