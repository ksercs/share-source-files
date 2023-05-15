!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/helpers/positionHelper.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/helpers/positionHelper.js", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getMaxAllowedPosition = exports.getGroupWidth = exports.getCellWidth = exports.getCellHeight = exports.getAllDayHeight = exports.PositionHelper = void 0;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  var getCellSize = function getCellSize(DOMMetaData) {
    var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
    var length = dateTableCellsMeta === null || dateTableCellsMeta === void 0 ? void 0 : dateTableCellsMeta.length;
    if (!length) {
      return {
        width: 0,
        height: 0
      };
    }
    var cellIndex = length > 1 ? 1 : 0;
    var cellSize = dateTableCellsMeta[cellIndex][0];
    return {
      width: cellSize.width,
      height: cellSize.height
    };
  };
  var getMaxAllowedHorizontalPosition = function getMaxAllowedHorizontalPosition(groupIndex, viewDataProvider, rtlEnabled, DOMMetaData) {
    var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
    var firstRow = dateTableCellsMeta[0];
    if (!firstRow) return 0;
    var _viewDataProvider$get = viewDataProvider.getLastGroupCellPosition(groupIndex),
        columnIndex = _viewDataProvider$get.columnIndex;
    var cellPosition = firstRow[columnIndex];
    if (!cellPosition) return 0;
    return !rtlEnabled ? cellPosition.left + cellPosition.width : cellPosition.left;
  };
  var getCellHeight = function getCellHeight(DOMMetaData) {
    return getCellSize(DOMMetaData).height;
  };
  exports.getCellHeight = getCellHeight;
  var getCellWidth = function getCellWidth(DOMMetaData) {
    return getCellSize(DOMMetaData).width;
  };
  exports.getCellWidth = getCellWidth;
  var getAllDayHeight = function getAllDayHeight(showAllDayPanel, isVerticalGrouping, DOMMetaData) {
    if (!showAllDayPanel) {
      return 0;
    }
    if (isVerticalGrouping) {
      var dateTableCellsMeta = DOMMetaData.dateTableCellsMeta;
      var length = dateTableCellsMeta === null || dateTableCellsMeta === void 0 ? void 0 : dateTableCellsMeta.length;
      return length ? dateTableCellsMeta[0][0].height : 0;
    }
    var allDayPanelCellsMeta = DOMMetaData.allDayPanelCellsMeta;
    return allDayPanelCellsMeta !== null && allDayPanelCellsMeta !== void 0 && allDayPanelCellsMeta.length ? allDayPanelCellsMeta[0].height : 0;
  };
  exports.getAllDayHeight = getAllDayHeight;
  var getMaxAllowedPosition = function getMaxAllowedPosition(groupIndex, viewDataProvider, rtlEnabled, DOMMetaData) {
    var validGroupIndex = groupIndex || 0;
    return getMaxAllowedHorizontalPosition(validGroupIndex, viewDataProvider, rtlEnabled, DOMMetaData);
  };
  exports.getMaxAllowedPosition = getMaxAllowedPosition;
  var getGroupWidth = function getGroupWidth(groupIndex, viewDataProvider, options) {
    var isVirtualScrolling = options.isVirtualScrolling,
        rtlEnabled = options.rtlEnabled,
        DOMMetaData = options.DOMMetaData;
    var cellWidth = getCellWidth(DOMMetaData);
    var result = viewDataProvider.getCellCount(options) * cellWidth;
    // TODO: refactor after deleting old render
    if (isVirtualScrolling) {
      var groupedData = viewDataProvider.groupedDataMap.dateTableGroupedMap;
      var groupLength = groupedData[groupIndex][0].length;
      result = groupLength * cellWidth;
    }
    var position = getMaxAllowedPosition(groupIndex, viewDataProvider, rtlEnabled, DOMMetaData);
    var currentPosition = position[groupIndex];
    if (currentPosition) {
      if (rtlEnabled) {
        result = currentPosition - position[groupIndex + 1];
      } else {
        if (groupIndex === 0) {
          result = currentPosition;
        } else {
          result = currentPosition - position[groupIndex - 1];
        }
      }
    }
    return result;
  };
  exports.getGroupWidth = getGroupWidth;
  var PositionHelper = /*#__PURE__*/function () {
    function PositionHelper(options) {
      this.options = options;
      this.groupStrategy = this.options.isVerticalGrouping ? new GroupStrategyBase(this.options) : new GroupStrategyHorizontal(this.options);
    }
    var _proto = PositionHelper.prototype;
    _proto.getHorizontalMax = function getHorizontalMax(groupIndex) {
      var _this = this;
      var getMaxPosition = function getMaxPosition(groupIndex) {
        return getMaxAllowedPosition(groupIndex, _this.viewDataProvider, _this.rtlEnabled, _this.DOMMetaData);
      };
      if (this.isGroupedByDate) {
        var viewPortGroupCount = this.viewDataProvider.getViewPortGroupCount();
        return Math.max(getMaxPosition(groupIndex), getMaxPosition(viewPortGroupCount - 1));
      }
      return getMaxPosition(groupIndex);
    };
    _proto.getResizableStep = function getResizableStep() {
      var cellWidth = getCellWidth(this.DOMMetaData);
      if (this.isGroupedByDate) {
        return this.groupCount * cellWidth;
      }
      return cellWidth;
    };
    _proto.getVerticalMax = function getVerticalMax(options) {
      return this.groupStrategy.getVerticalMax(options);
    };
    _proto.getOffsetByAllDayPanel = function getOffsetByAllDayPanel(options) {
      return this.groupStrategy.getOffsetByAllDayPanel(options);
    };
    _proto.getGroupTop = function getGroupTop(options) {
      return this.groupStrategy.getGroupTop(options);
    };
    _createClass(PositionHelper, [{
      key: "viewDataProvider",
      get: function get() {
        return this.options.viewDataProvider;
      }
    }, {
      key: "rtlEnabled",
      get: function get() {
        return this.options.rtlEnabled;
      }
    }, {
      key: "isGroupedByDate",
      get: function get() {
        return this.options.isGroupedByDate;
      }
    }, {
      key: "groupCount",
      get: function get() {
        return this.options.groupCount;
      }
    }, {
      key: "DOMMetaData",
      get: function get() {
        return this.options.getDOMMetaDataCallback();
      }
    }]);
    return PositionHelper;
  }();
  exports.PositionHelper = PositionHelper;
  var GroupStrategyBase = /*#__PURE__*/function () {
    function GroupStrategyBase(options) {
      this.options = options;
    }
    var _proto2 = GroupStrategyBase.prototype;
    _proto2.getOffsetByAllDayPanel = function getOffsetByAllDayPanel(_ref) {
      var groupIndex = _ref.groupIndex,
          supportAllDayRow = _ref.supportAllDayRow,
          showAllDayPanel = _ref.showAllDayPanel;
      var result = 0;
      if (supportAllDayRow && showAllDayPanel) {
        var allDayPanelHeight = getAllDayHeight(showAllDayPanel, true, this.DOMMetaData);
        result = allDayPanelHeight * (groupIndex + 1);
      }
      return result;
    };
    _proto2.getVerticalMax = function getVerticalMax(options) {
      var maxAllowedPosition = this._getMaxAllowedVerticalPosition(_extends({}, options, {
        viewDataProvider: this.viewDataProvider,
        rtlEnabled: this.rtlEnabled,
        DOMMetaData: this.DOMMetaData
      }));
      maxAllowedPosition += this.getOffsetByAllDayPanel(options);
      return maxAllowedPosition;
    };
    _proto2.getGroupTop = function getGroupTop(_ref2) {
      var groupIndex = _ref2.groupIndex,
          showAllDayPanel = _ref2.showAllDayPanel,
          isGroupedAllDayPanel = _ref2.isGroupedAllDayPanel;
      var rowCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
      var maxVerticalPosition = this._getMaxAllowedVerticalPosition({
        groupIndex: groupIndex,
        viewDataProvider: this.viewDataProvider,
        showAllDayPanel: showAllDayPanel,
        isGroupedAllDayPanel: isGroupedAllDayPanel,
        isVerticalGrouping: true,
        DOMMetaData: this.DOMMetaData
      });
      return maxVerticalPosition - getCellHeight(this.DOMMetaData) * rowCount;
    };
    _proto2._getAllDayHeight = function _getAllDayHeight(showAllDayPanel) {
      return getAllDayHeight(showAllDayPanel, true, this.DOMMetaData);
    };
    _proto2._getMaxAllowedVerticalPosition = function _getMaxAllowedVerticalPosition(_ref3) {
      var groupIndex = _ref3.groupIndex,
          showAllDayPanel = _ref3.showAllDayPanel,
          isGroupedAllDayPanel = _ref3.isGroupedAllDayPanel;
      var _this$viewDataProvide = this.viewDataProvider.getLastGroupCellPosition(groupIndex),
          rowIndex = _this$viewDataProvide.rowIndex;
      var dateTableCellsMeta = this.DOMMetaData.dateTableCellsMeta;
      var lastGroupRow = dateTableCellsMeta[rowIndex];
      if (!lastGroupRow) return 0;
      var result = lastGroupRow[0].top + lastGroupRow[0].height;

      // TODO remove while refactoring dual calculcations.
      // Should decrease allDayPanel amount due to the dual calculation corrections.
      if (isGroupedAllDayPanel) {
        result -= (groupIndex + 1) * this._getAllDayHeight(showAllDayPanel);
      }
      return result;
    };
    _createClass(GroupStrategyBase, [{
      key: "viewDataProvider",
      get: function get() {
        return this.options.viewDataProvider;
      }
    }, {
      key: "isGroupedByDate",
      get: function get() {
        return this.options.isGroupedByDate;
      }
    }, {
      key: "rtlEnabled",
      get: function get() {
        return this.options.rtlEnabled;
      }
    }, {
      key: "groupCount",
      get: function get() {
        return this.options.groupCount;
      }
    }, {
      key: "DOMMetaData",
      get: function get() {
        return this.options.getDOMMetaDataCallback();
      }
    }]);
    return GroupStrategyBase;
  }();
  var GroupStrategyHorizontal = /*#__PURE__*/function (_GroupStrategyBase) {
    _inheritsLoose(GroupStrategyHorizontal, _GroupStrategyBase);
    function GroupStrategyHorizontal() {
      return _GroupStrategyBase.apply(this, arguments) || this;
    }
    var _proto3 = GroupStrategyHorizontal.prototype;
    _proto3.getOffsetByAllDayPanel = function getOffsetByAllDayPanel(options) {
      return 0;
    };
    _proto3.getVerticalMax = function getVerticalMax(options) {
      var isVirtualScrolling = options.isVirtualScrolling,
          groupIndex = options.groupIndex;
      var correctedGroupIndex = isVirtualScrolling ? groupIndex : 0;
      return this._getMaxAllowedVerticalPosition(_extends({}, options, {
        groupIndex: correctedGroupIndex
      }));
    };
    _proto3.getGroupTop = function getGroupTop(options) {
      return 0;
    };
    _proto3._getAllDayHeight = function _getAllDayHeight(showAllDayPanel) {
      return getAllDayHeight(showAllDayPanel, false, this.DOMMetaData);
    };
    return GroupStrategyHorizontal;
  }(GroupStrategyBase);
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=positionHelper.js.map