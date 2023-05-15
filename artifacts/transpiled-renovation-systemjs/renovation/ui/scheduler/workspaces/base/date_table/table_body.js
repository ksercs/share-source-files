!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scheduler/workspaces/base/date_table/table_body.js"], ["inferno","@devextreme/runtime/inferno","../row","./all_day_panel/table_body","../layout_props","./cell","../../../../../utils/combine_classes","../../const"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/scheduler/workspaces/base/date_table/table_body.js", ["inferno", "@devextreme/runtime/inferno", "../row", "./all_day_panel/table_body", "../layout_props", "./cell", "../../../../../utils/combine_classes", "../../const"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.DateTableBodyProps = exports.DateTableBody = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _row = $__require("../row");
  var _table_body = $__require("./all_day_panel/table_body");
  var _layout_props = $__require("../layout_props");
  var _cell = $__require("./cell");
  var _combine_classes = $__require("../../../../../utils/combine_classes");
  var _const = $__require("../../const");
  var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData", "width"];
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
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
    var _ref$props = _ref.props,
        Cell = _ref$props.cellTemplate,
        dataCellTemplate = _ref$props.dataCellTemplate,
        viewData = _ref$props.viewData,
        rowClasses = _ref.rowClasses;
    return (0, _inferno.createFragment)(viewData.groupedData.map(function (_ref2) {
      var allDayPanel = _ref2.allDayPanel,
          dateTable = _ref2.dateTable,
          isGroupedAllDayPanel = _ref2.isGroupedAllDayPanel,
          fragmentKey = _ref2.key;
      return (0, _inferno.createFragment)([isGroupedAllDayPanel && (0, _inferno.createComponentVNode)(2, _table_body.AllDayPanelTableBody, {
        "viewData": allDayPanel,
        "dataCellTemplate": dataCellTemplate,
        "isVerticalGroupOrientation": true,
        "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
        "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
        "leftVirtualCellCount": viewData.leftVirtualCellCount,
        "rightVirtualCellCount": viewData.rightVirtualCellCount
      }), dateTable.map(function (_ref3) {
        var cells = _ref3.cells,
            rowKey = _ref3.key;
        return (0, _inferno.createComponentVNode)(2, _row.Row, {
          "className": rowClasses,
          "leftVirtualCellWidth": viewData.leftVirtualCellWidth,
          "rightVirtualCellWidth": viewData.rightVirtualCellWidth,
          "leftVirtualCellCount": viewData.leftVirtualCellCount,
          "rightVirtualCellCount": viewData.rightVirtualCellCount,
          children: cells.map(function (_ref4) {
            var endDate = _ref4.endDate,
                firstDayOfMonth = _ref4.firstDayOfMonth,
                cellGroupIndex = _ref4.groupIndex,
                groups = _ref4.groups,
                cellIndex = _ref4.index,
                isFirstGroupCell = _ref4.isFirstGroupCell,
                isFocused = _ref4.isFocused,
                isLastGroupCell = _ref4.isLastGroupCell,
                isSelected = _ref4.isSelected,
                key = _ref4.key,
                otherMonth = _ref4.otherMonth,
                startDate = _ref4.startDate,
                text = _ref4.text,
                today = _ref4.today;
            return Cell({
              isFirstGroupCell: isFirstGroupCell,
              isLastGroupCell: isLastGroupCell,
              startDate: startDate,
              endDate: endDate,
              groups: groups,
              groupIndex: cellGroupIndex,
              index: cellIndex,
              dataCellTemplate: dataCellTemplate,
              key: key,
              text: text,
              today: today,
              otherMonth: otherMonth,
              firstDayOfMonth: firstDayOfMonth,
              isSelected: isSelected,
              isFocused: isFocused
            });
          })
        }, rowKey);
      })], 0, fragmentKey);
    }), 0);
  };
  exports.viewFunction = viewFunction;
  var DateTableBodyProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_layout_props.LayoutProps), Object.getOwnPropertyDescriptors({
    cellTemplate: _cell.DateTableCellBase
  })));
  exports.DateTableBodyProps = DateTableBodyProps;
  var getTemplate = function getTemplate(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function (props) {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
    } : TemplateProp);
  };
  var DateTableBody = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(DateTableBody, _BaseInfernoComponent);
    function DateTableBody(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.state = {};
      return _this;
    }
    var _proto = DateTableBody.prototype;
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          cellTemplate: getTemplate(props.cellTemplate),
          dataCellTemplate: getTemplate(props.dataCellTemplate)
        }),
        rowClasses: this.rowClasses,
        restAttributes: this.restAttributes
      });
    };
    _createClass(DateTableBody, [{
      key: "rowClasses",
      get: function get() {
        var _combineClasses;
        var addVerticalSizesClassToRows = this.props.addVerticalSizesClassToRows;
        return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, _const.DATE_TABLE_ROW_CLASS, true), _defineProperty(_combineClasses, 'dx-scheduler-cell-sizes-vertical', addVerticalSizesClassToRows), _combineClasses));
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            addDateTableClass = _this$props.addDateTableClass,
            addVerticalSizesClassToRows = _this$props.addVerticalSizesClassToRows,
            bottomVirtualRowHeight = _this$props.bottomVirtualRowHeight,
            cellTemplate = _this$props.cellTemplate,
            dataCellTemplate = _this$props.dataCellTemplate,
            groupOrientation = _this$props.groupOrientation,
            leftVirtualCellWidth = _this$props.leftVirtualCellWidth,
            rightVirtualCellWidth = _this$props.rightVirtualCellWidth,
            topVirtualRowHeight = _this$props.topVirtualRowHeight,
            viewData = _this$props.viewData,
            width = _this$props.width,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return DateTableBody;
  }(_inferno2.BaseInfernoComponent);
  exports.DateTableBody = DateTableBody;
  DateTableBody.defaultProps = DateTableBodyProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../row","./all_day_panel/table_body","../layout_props","./cell","../../../../../utils/combine_classes","../../const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../row"), require("./all_day_panel/table_body"), require("../layout_props"), require("./cell"), require("../../../../../utils/combine_classes"), require("../../const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=table_body.js.map