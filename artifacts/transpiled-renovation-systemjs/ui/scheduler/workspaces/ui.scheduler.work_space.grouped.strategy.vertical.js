!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.vertical.js"], ["../../../core/utils/position","./cache","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.vertical.js", ["../../../core/utils/position", "./cache", "../classes", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _position = $__require("../../../core/utils/position");
  var _cache = $__require("./cache");
  var _classes = $__require("../classes");
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var DATE_HEADER_OFFSET = 10;
  var WORK_SPACE_BORDER = 1;
  var VerticalGroupedStrategy = /*#__PURE__*/function () {
    function VerticalGroupedStrategy(workSpace) {
      this._workSpace = workSpace;
      this.cache = new _cache.Cache();
    }
    var _proto = VerticalGroupedStrategy.prototype;
    _proto.prepareCellIndexes = function prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow) {
      var rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();
      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        rowIndex += groupIndex;
        if (!inAllDayRow) {
          rowIndex += 1;
        }
      }
      return {
        rowIndex: rowIndex,
        columnIndex: cellCoordinates.columnIndex
      };
    };
    _proto.getGroupIndex = function getGroupIndex(rowIndex) {
      return Math.floor(rowIndex / this._workSpace._getRowCount());
    };
    _proto.calculateHeaderCellRepeatCount = function calculateHeaderCellRepeatCount() {
      return 1;
    };
    _proto.insertAllDayRowsIntoDateTable = function insertAllDayRowsIntoDateTable() {
      return this._workSpace.option('showAllDayPanel');
    };
    _proto.getTotalCellCount = function getTotalCellCount() {
      return this._workSpace._getCellCount();
    };
    _proto.getTotalRowCount = function getTotalRowCount() {
      return this._workSpace._getRowCount() * this._workSpace._getGroupCount();
    };
    _proto.calculateTimeCellRepeatCount = function calculateTimeCellRepeatCount() {
      return this._workSpace._getGroupCount() || 1;
    };
    _proto.getWorkSpaceMinWidth = function getWorkSpaceMinWidth() {
      var minWidth = this._workSpace._getWorkSpaceWidth();
      var workspaceContainerWidth = (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER;
      if (minWidth < workspaceContainerWidth) {
        minWidth = workspaceContainerWidth;
      }
      return minWidth;
    };
    _proto.getAllDayOffset = function getAllDayOffset() {
      return 0;
    };
    _proto.getGroupCountClass = function getGroupCountClass(groups) {
      return (0, _base.getVerticalGroupCountClass)(groups);
    };
    _proto.getLeftOffset = function getLeftOffset() {
      return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth();
    };
    _proto.getGroupBoundsOffset = function getGroupBoundsOffset(groupIndex, _ref) {
      var _this = this;
      var _ref2 = _slicedToArray(_ref, 2),
          $firstCell = _ref2[0],
          $lastCell = _ref2[1];
      return this.cache.get("groupBoundsOffset".concat(groupIndex), function () {
        var startDayHour = _this._workSpace.option('startDayHour');
        var endDayHour = _this._workSpace.option('endDayHour');
        var hoursInterval = _this._workSpace.option('hoursInterval');
        var dayHeight = (0, _base.calculateDayDuration)(startDayHour, endDayHour) / hoursInterval * _this._workSpace.getCellHeight();
        var scrollTop = _this.getScrollableScrollTop();
        var topOffset = groupIndex * dayHeight + (0, _position.getBoundingRect)(_this._workSpace._$thead.get(0)).height + _this._workSpace.option('getHeaderHeight')() + DATE_HEADER_OFFSET - scrollTop;
        if (_this._workSpace.option('showAllDayPanel') && _this._workSpace.supportAllDayRow()) {
          topOffset += _this._workSpace.getCellHeight() * (groupIndex + 1);
        }
        var bottomOffset = topOffset + dayHeight;
        var _$firstCell$getBoundi = $firstCell.getBoundingClientRect(),
            left = _$firstCell$getBoundi.left;
        var _$lastCell$getBoundin = $lastCell.getBoundingClientRect(),
            right = _$lastCell$getBoundin.right;
        return _this._groupBoundsOffset = {
          left: left,
          right: right,
          top: topOffset,
          bottom: bottomOffset
        };
      });
    };
    _proto.shiftIndicator = function shiftIndicator($indicator, height, rtlOffset, i) {
      var offset = this._workSpace.getIndicatorOffset(0);
      var tableOffset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
      var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
      var verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;
      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        verticalOffset += this._workSpace.getAllDayHeight() * (i + 1);
      }
      $indicator.css('left', horizontalOffset + tableOffset);
      $indicator.css('top', height + verticalOffset);
    };
    _proto.getShaderOffset = function getShaderOffset(i, width) {
      var offset = this._workSpace.option('crossScrollingEnabled') ? 0 : this._workSpace.getGroupTableWidth();
      return this._workSpace.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset;
    };
    _proto.getShaderTopOffset = function getShaderTopOffset(i) {
      return 0;
    };
    _proto.getShaderHeight = function getShaderHeight() {
      var height = this._workSpace.getIndicationHeight();
      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        height += this._workSpace.getCellHeight();
      }
      return height;
    };
    _proto.getShaderMaxHeight = function getShaderMaxHeight() {
      var height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();
      if (this._workSpace.supportAllDayRow() && this._workSpace.option('showAllDayPanel')) {
        height += this._workSpace.getCellHeight();
      }
      return height;
    };
    _proto.getShaderWidth = function getShaderWidth() {
      return this._workSpace.getIndicationWidth(0);
    };
    _proto.getScrollableScrollTop = function getScrollableScrollTop() {
      return this._workSpace.getScrollable().scrollTop();
    }

    // ------------
    // We do not need these methods in renovation
    // ------------
    ;
    _proto.addAdditionalGroupCellClasses = function addAdditionalGroupCellClasses(cellClass, index, i, j) {
      cellClass = this._addLastGroupCellClass(cellClass, i + 1);
      return this._addFirstGroupCellClass(cellClass, i + 1);
    };
    _proto._addLastGroupCellClass = function _addLastGroupCellClass(cellClass, index) {
      if (index % this._workSpace._getRowCount() === 0) {
        return "".concat(cellClass, " ").concat(_classes.LAST_GROUP_CELL_CLASS);
      }
      return cellClass;
    };
    _proto._addFirstGroupCellClass = function _addFirstGroupCellClass(cellClass, index) {
      if ((index - 1) % this._workSpace._getRowCount() === 0) {
        return "".concat(cellClass, " ").concat(_classes.FIRST_GROUP_CELL_CLASS);
      }
      return cellClass;
    };
    return VerticalGroupedStrategy;
  }();
  var _default = VerticalGroupedStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/position","./cache","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/position"), require("./cache"), require("../classes"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.work_space.grouped.strategy.vertical.js.map