!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scheduler/workspaces/base/ordinary_layout.js"], ["inferno","@devextreme/runtime/inferno","../../../common/widget","../../../scroll_view/scrollable","./group_panel/group_panel","./date_table/all_day_panel/layout","./header_panel_empty_cell","./main_layout_props","./time_panel/layout","../month/date_table/layout","./date_table/layout","../timeline/header_panel/layout","./header_panel/layout","../../appointment/layout"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/scheduler/workspaces/base/ordinary_layout.js", ["inferno", "@devextreme/runtime/inferno", "../../../common/widget", "../../../scroll_view/scrollable", "./group_panel/group_panel", "./date_table/all_day_panel/layout", "./header_panel_empty_cell", "./main_layout_props", "./time_panel/layout", "../month/date_table/layout", "./date_table/layout", "../timeline/header_panel/layout", "./header_panel/layout", "../../appointment/layout"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.OrdinaryLayout = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _widget = $__require("../../../common/widget");
  var _scrollable = $__require("../../../scroll_view/scrollable");
  var _group_panel = $__require("./group_panel/group_panel");
  var _layout = $__require("./date_table/all_day_panel/layout");
  var _header_panel_empty_cell = $__require("./header_panel_empty_cell");
  var _main_layout_props = $__require("./main_layout_props");
  var _layout2 = $__require("./time_panel/layout");
  var _layout3 = $__require("../month/date_table/layout");
  var _layout4 = $__require("./date_table/layout");
  var _layout5 = $__require("../timeline/header_panel/layout");
  var _layout6 = $__require("./header_panel/layout");
  var _layout7 = $__require("../../appointment/layout");
  var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "allDayAppointments", "allDayPanelRef", "appointments", "bottomVirtualRowHeight", "className", "dataCellTemplate", "dateCellTemplate", "dateHeaderData", "dateTableRef", "dateTableTemplate", "groupByDate", "groupOrientation", "groupPanelClassName", "groupPanelData", "groupPanelHeight", "groupPanelRef", "groups", "headerEmptyCellWidth", "headerPanelTemplate", "intervalCount", "isAllDayPanelCollapsed", "isAllDayPanelVisible", "isRenderDateHeader", "isRenderGroupPanel", "isRenderHeaderEmptyCell", "isRenderTimePanel", "isStandaloneAllDayPanel", "isUseMonthDateTable", "isUseTimelineHeader", "isWorkSpaceWithOddCells", "leftVirtualCellWidth", "onScroll", "resourceCellTemplate", "rightVirtualCellWidth", "scrollingDirection", "tablesWidth", "timeCellTemplate", "timePanelData", "timePanelRef", "topVirtualRowHeight", "viewData", "widgetElementRef", "width"];
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
  var viewFunction = function viewFunction(_ref) {
    var dateTableScrollableRef = _ref.dateTableScrollableRef,
        _ref$props = _ref.props,
        allDayPanelRef = _ref$props.allDayPanelRef,
        className = _ref$props.className,
        dataCellTemplate = _ref$props.dataCellTemplate,
        dateCellTemplate = _ref$props.dateCellTemplate,
        dateHeaderData = _ref$props.dateHeaderData,
        dateTableRef = _ref$props.dateTableRef,
        groupByDate = _ref$props.groupByDate,
        groupOrientation = _ref$props.groupOrientation,
        groupPanelClassName = _ref$props.groupPanelClassName,
        groupPanelData = _ref$props.groupPanelData,
        groupPanelHeight = _ref$props.groupPanelHeight,
        groupPanelRef = _ref$props.groupPanelRef,
        groups = _ref$props.groups,
        headerEmptyCellWidth = _ref$props.headerEmptyCellWidth,
        isRenderDateHeader = _ref$props.isRenderDateHeader,
        isRenderGroupPanel = _ref$props.isRenderGroupPanel,
        isRenderHeaderEmptyCell = _ref$props.isRenderHeaderEmptyCell,
        isRenderTimePanel = _ref$props.isRenderTimePanel,
        isStandaloneAllDayPanel = _ref$props.isStandaloneAllDayPanel,
        isUseMonthDateTable = _ref$props.isUseMonthDateTable,
        isUseTimelineHeader = _ref$props.isUseTimelineHeader,
        resourceCellTemplate = _ref$props.resourceCellTemplate,
        scrollingDirection = _ref$props.scrollingDirection,
        timeCellTemplate = _ref$props.timeCellTemplate,
        timePanelData = _ref$props.timePanelData,
        timePanelRef = _ref$props.timePanelRef,
        viewData = _ref$props.viewData,
        widgetElementRef = _ref$props.widgetElementRef;
    var DateTable = isUseMonthDateTable ? _layout3.MonthDateTableLayout : _layout4.DateTableLayoutBase;
    var HeaderPanel = isUseTimelineHeader ? _layout5.TimelineHeaderPanelLayout : _layout6.HeaderPanelLayout;
    return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
      "className": className,
      "rootElementRef": widgetElementRef,
      children: [(0, _inferno.createVNode)(1, "div", "dx-scheduler-header-panel-container", [isRenderHeaderEmptyCell && (0, _inferno.createComponentVNode)(2, _header_panel_empty_cell.HeaderPanelEmptyCell, {
        "width": headerEmptyCellWidth,
        "isRenderAllDayTitle": isStandaloneAllDayPanel
      }), (0, _inferno.createVNode)(1, "div", "dx-scheduler-header-tables-container", [(0, _inferno.createVNode)(1, "table", "dx-scheduler-header-panel", (0, _inferno.createComponentVNode)(2, HeaderPanel, {
        "dateHeaderData": dateHeaderData,
        "groupPanelData": groupPanelData,
        "timeCellTemplate": timeCellTemplate,
        "dateCellTemplate": dateCellTemplate,
        "isRenderDateHeader": isRenderDateHeader,
        "groupOrientation": groupOrientation,
        "groupByDate": groupByDate,
        "groups": groups,
        "resourceCellTemplate": resourceCellTemplate
      }), 2), isStandaloneAllDayPanel && (0, _inferno.createComponentVNode)(2, _layout.AllDayPanelLayout, {
        "viewData": viewData,
        "dataCellTemplate": dataCellTemplate,
        "tableRef": allDayPanelRef
      })], 0)], 0), (0, _inferno.createComponentVNode)(2, _scrollable.Scrollable, {
        "useKeyboard": false,
        "bounceEnabled": false,
        "direction": scrollingDirection,
        "className": "dx-scheduler-date-table-scrollable",
        children: (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-scrollable-content", [isRenderGroupPanel && (0, _inferno.createComponentVNode)(2, _group_panel.GroupPanel, {
          "groupPanelData": groupPanelData,
          "className": groupPanelClassName,
          "groupOrientation": groupOrientation,
          "groupByDate": groupByDate,
          "groups": groups,
          "resourceCellTemplate": resourceCellTemplate,
          "height": groupPanelHeight,
          "elementRef": groupPanelRef
        }), isRenderTimePanel && (0, _inferno.createComponentVNode)(2, _layout2.TimePanelTableLayout, {
          "timePanelData": timePanelData,
          "timeCellTemplate": timeCellTemplate,
          "groupOrientation": groupOrientation,
          "tableRef": timePanelRef
        }), (0, _inferno.createVNode)(1, "div", "dx-scheduler-date-table-container", [(0, _inferno.createComponentVNode)(2, DateTable, {
          "tableRef": dateTableRef,
          "viewData": viewData,
          "groupOrientation": groupOrientation,
          "dataCellTemplate": dataCellTemplate
        }), (0, _inferno.createComponentVNode)(2, _layout7.AppointmentLayout)], 4)], 0)
      }, null, dateTableScrollableRef)]
    });
  };
  exports.viewFunction = viewFunction;
  var getTemplate = function getTemplate(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function (props) {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
    } : TemplateProp);
  };
  var OrdinaryLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(OrdinaryLayout, _BaseInfernoComponent);
    function OrdinaryLayout(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.state = {};
      _this.dateTableScrollableRef = (0, _inferno.createRef)();
      _this.getScrollableWidth = _this.getScrollableWidth.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = OrdinaryLayout.prototype;
    _proto.getScrollableWidth = function getScrollableWidth() {
      return this.dateTableScrollableRef.current.container().getBoundingClientRect().width;
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          headerPanelTemplate: getTemplate(props.headerPanelTemplate),
          dateTableTemplate: getTemplate(props.dateTableTemplate),
          resourceCellTemplate: getTemplate(props.resourceCellTemplate),
          timeCellTemplate: getTemplate(props.timeCellTemplate),
          dateCellTemplate: getTemplate(props.dateCellTemplate),
          dataCellTemplate: getTemplate(props.dataCellTemplate)
        }),
        dateTableScrollableRef: this.dateTableScrollableRef,
        restAttributes: this.restAttributes
      });
    };
    _createClass(OrdinaryLayout, [{
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            addDateTableClass = _this$props.addDateTableClass,
            addVerticalSizesClassToRows = _this$props.addVerticalSizesClassToRows,
            allDayAppointments = _this$props.allDayAppointments,
            allDayPanelRef = _this$props.allDayPanelRef,
            appointments = _this$props.appointments,
            bottomVirtualRowHeight = _this$props.bottomVirtualRowHeight,
            className = _this$props.className,
            dataCellTemplate = _this$props.dataCellTemplate,
            dateCellTemplate = _this$props.dateCellTemplate,
            dateHeaderData = _this$props.dateHeaderData,
            dateTableRef = _this$props.dateTableRef,
            dateTableTemplate = _this$props.dateTableTemplate,
            groupByDate = _this$props.groupByDate,
            groupOrientation = _this$props.groupOrientation,
            groupPanelClassName = _this$props.groupPanelClassName,
            groupPanelData = _this$props.groupPanelData,
            groupPanelHeight = _this$props.groupPanelHeight,
            groupPanelRef = _this$props.groupPanelRef,
            groups = _this$props.groups,
            headerEmptyCellWidth = _this$props.headerEmptyCellWidth,
            headerPanelTemplate = _this$props.headerPanelTemplate,
            intervalCount = _this$props.intervalCount,
            isAllDayPanelCollapsed = _this$props.isAllDayPanelCollapsed,
            isAllDayPanelVisible = _this$props.isAllDayPanelVisible,
            isRenderDateHeader = _this$props.isRenderDateHeader,
            isRenderGroupPanel = _this$props.isRenderGroupPanel,
            isRenderHeaderEmptyCell = _this$props.isRenderHeaderEmptyCell,
            isRenderTimePanel = _this$props.isRenderTimePanel,
            isStandaloneAllDayPanel = _this$props.isStandaloneAllDayPanel,
            isUseMonthDateTable = _this$props.isUseMonthDateTable,
            isUseTimelineHeader = _this$props.isUseTimelineHeader,
            isWorkSpaceWithOddCells = _this$props.isWorkSpaceWithOddCells,
            leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
            onScroll = _this$props.onScroll,
            resourceCellTemplate = _this$props.resourceCellTemplate,
            rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
            scrollingDirection = _this$props.scrollingDirection,
            tablesWidth = _this$props.tablesWidth,
            timeCellTemplate = _this$props.timeCellTemplate,
            timePanelData = _this$props.timePanelData,
            timePanelRef = _this$props.timePanelRef,
            topVirtualRowHeight = _this$props.topVirtualRowHeight,
            viewData = _this$props.viewData,
            widgetElementRef = _this$props.widgetElementRef,
            width = _this$props.width,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return OrdinaryLayout;
  }(_inferno2.BaseInfernoComponent);
  exports.OrdinaryLayout = OrdinaryLayout;
  OrdinaryLayout.defaultProps = _main_layout_props.MainLayoutProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../common/widget","../../../scroll_view/scrollable","./group_panel/group_panel","./date_table/all_day_panel/layout","./header_panel_empty_cell","./main_layout_props","./time_panel/layout","../month/date_table/layout","./date_table/layout","../timeline/header_panel/layout","./header_panel/layout","../../appointment/layout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../common/widget"), require("../../../scroll_view/scrollable"), require("./group_panel/group_panel"), require("./date_table/all_day_panel/layout"), require("./header_panel_empty_cell"), require("./main_layout_props"), require("./time_panel/layout"), require("../month/date_table/layout"), require("./date_table/layout"), require("../timeline/header_panel/layout"), require("./header_panel/layout"), require("../../appointment/layout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ordinary_layout.js.map