!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.horizontal.js"], ["../../../core/utils/position","../classes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.horizontal.js", ["../../../core/utils/position", "../classes"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _position = $__require("../../../core/utils/position");
  var _classes = $__require("../classes");
  var HorizontalGroupedStrategy = /*#__PURE__*/function () {
    function HorizontalGroupedStrategy(workSpace) {
      this._workSpace = workSpace;
    }
    var _proto = HorizontalGroupedStrategy.prototype;
    _proto.prepareCellIndexes = function prepareCellIndexes(cellCoordinates, groupIndex, inAllDay) {
      var groupByDay = this._workSpace.isGroupedByDate();
      if (!groupByDay) {
        return {
          rowIndex: cellCoordinates.rowIndex,
          columnIndex: cellCoordinates.columnIndex + groupIndex * this._workSpace._getCellCount()
        };
      } else {
        return {
          rowIndex: cellCoordinates.rowIndex,
          columnIndex: cellCoordinates.columnIndex * this._workSpace._getGroupCount() + groupIndex
        };
      }
    };
    _proto.getGroupIndex = function getGroupIndex(rowIndex, columnIndex) {
      var groupByDay = this._workSpace.isGroupedByDate();
      var groupCount = this._workSpace._getGroupCount();
      if (groupByDay) {
        return columnIndex % groupCount;
      } else {
        return Math.floor(columnIndex / this._workSpace._getCellCount());
      }
    };
    _proto.calculateHeaderCellRepeatCount = function calculateHeaderCellRepeatCount() {
      return this._workSpace._getGroupCount() || 1;
    };
    _proto.insertAllDayRowsIntoDateTable = function insertAllDayRowsIntoDateTable() {
      return false;
    };
    _proto.getTotalCellCount = function getTotalCellCount(groupCount) {
      groupCount = groupCount || 1;
      return this._workSpace._getCellCount() * groupCount;
    };
    _proto.getTotalRowCount = function getTotalRowCount() {
      return this._workSpace._getRowCount();
    };
    _proto.calculateTimeCellRepeatCount = function calculateTimeCellRepeatCount() {
      return 1;
    };
    _proto.getWorkSpaceMinWidth = function getWorkSpaceMinWidth() {
      return (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth();
    };
    _proto.getAllDayOffset = function getAllDayOffset() {
      return this._workSpace.getAllDayHeight();
    };
    _proto.getGroupCountClass = function getGroupCountClass(groups) {
      return undefined;
    };
    _proto.getLeftOffset = function getLeftOffset() {
      return this._workSpace.getTimePanelWidth();
    };
    _proto._createGroupBoundOffset = function _createGroupBoundOffset(startCell, endCell, cellWidth) {
      var extraOffset = cellWidth / 2;
      var startOffset = startCell ? startCell.offset().left - extraOffset : 0;
      var endOffset = endCell ? endCell.offset().left + cellWidth + extraOffset : 0;
      return {
        left: startOffset,
        right: endOffset,
        top: 0,
        bottom: 0
      };
    };
    _proto._getGroupedByDateBoundOffset = function _getGroupedByDateBoundOffset($cells, cellWidth) {
      var firstCellIndex = 0;
      var lastCellIndex = $cells.length - 1;
      var startCell = $cells.eq(firstCellIndex);
      var endCell = $cells.eq(lastCellIndex);
      return this._createGroupBoundOffset(startCell, endCell, cellWidth);
    };
    _proto.getGroupBoundsOffset = function getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates, groupedDataMap) {
      if (this._workSpace.isGroupedByDate()) {
        return this._getGroupedByDateBoundOffset($cells, cellWidth);
      }
      var startCell;
      var endCell;
      var cellIndex = this._workSpace.getCellIndexByCoordinates(coordinates);
      var groupIndex = coordinates.groupIndex || Math.floor(cellIndex / cellCount);
      var currentCellGroup = groupedDataMap.dateTableGroupedMap[groupIndex];
      if (currentCellGroup) {
        var groupRowLength = currentCellGroup[0].length;
        var groupStartPosition = currentCellGroup[0][0].position;
        var groupEndPosition = currentCellGroup[0][groupRowLength - 1].position;
        startCell = $cells.eq(groupStartPosition.columnIndex);
        endCell = $cells.eq(groupEndPosition.columnIndex);
      }
      return this._createGroupBoundOffset(startCell, endCell, cellWidth);
    };
    _proto.shiftIndicator = function shiftIndicator($indicator, height, rtlOffset, groupIndex) {
      var offset = this._getIndicatorOffset(groupIndex);
      var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
      $indicator.css('left', horizontalOffset);
      $indicator.css('top', height);
    };
    _proto._getIndicatorOffset = function _getIndicatorOffset(groupIndex) {
      var groupByDay = this._workSpace.isGroupedByDate();
      return groupByDay ? this._calculateGroupByDateOffset(groupIndex) : this._calculateOffset(groupIndex);
    };
    _proto._calculateOffset = function _calculateOffset(groupIndex) {
      return this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex + this._workSpace.getIndicatorOffset(groupIndex) + groupIndex;
    };
    _proto._calculateGroupByDateOffset = function _calculateGroupByDateOffset(groupIndex) {
      return this._workSpace.getIndicatorOffset(0) * this._workSpace._getGroupCount() + this._workSpace.getRoundedCellWidth(groupIndex - 1, 0) * groupIndex;
    };
    _proto.getShaderOffset = function getShaderOffset(i, width) {
      var offset = this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(i - 1) * i;
      return this._workSpace.option('rtlEnabled') ? (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).width - offset - this._workSpace.getTimePanelWidth() - width : offset;
    };
    _proto.getShaderTopOffset = function getShaderTopOffset(i) {
      return -this.getShaderMaxHeight() * (i > 0 ? 1 : 0);
    };
    _proto.getShaderHeight = function getShaderHeight() {
      var height = this._workSpace.getIndicationHeight();
      return height;
    };
    _proto.getShaderMaxHeight = function getShaderMaxHeight() {
      return (0, _position.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).height;
    };
    _proto.getShaderWidth = function getShaderWidth(i) {
      return this._workSpace.getIndicationWidth(i);
    };
    _proto.getScrollableScrollTop = function getScrollableScrollTop(allDay) {
      return !allDay ? this._workSpace.getScrollable().scrollTop() : 0;
    }

    // ---------------
    // We do not need these nethods in renovation
    // ---------------
    ;
    _proto.addAdditionalGroupCellClasses = function addAdditionalGroupCellClasses(cellClass, index, i, j) {
      var applyUnconditionally = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      cellClass = this._addLastGroupCellClass(cellClass, index, applyUnconditionally);
      return this._addFirstGroupCellClass(cellClass, index, applyUnconditionally);
    };
    _proto._addLastGroupCellClass = function _addLastGroupCellClass(cellClass, index, applyUnconditionally) {
      if (applyUnconditionally) {
        return "".concat(cellClass, " ").concat(_classes.LAST_GROUP_CELL_CLASS);
      }
      var groupByDate = this._workSpace.isGroupedByDate();
      if (groupByDate) {
        if (index % this._workSpace._getGroupCount() === 0) {
          return "".concat(cellClass, " ").concat(_classes.LAST_GROUP_CELL_CLASS);
        }
      } else {
        if (index % this._workSpace._getCellCount() === 0) {
          return "".concat(cellClass, " ").concat(_classes.LAST_GROUP_CELL_CLASS);
        }
      }
      return cellClass;
    };
    _proto._addFirstGroupCellClass = function _addFirstGroupCellClass(cellClass, index, applyUnconditionally) {
      if (applyUnconditionally) {
        return "".concat(cellClass, " ").concat(_classes.FIRST_GROUP_CELL_CLASS);
      }
      var groupByDate = this._workSpace.isGroupedByDate();
      if (groupByDate) {
        if ((index - 1) % this._workSpace._getGroupCount() === 0) {
          return "".concat(cellClass, " ").concat(_classes.FIRST_GROUP_CELL_CLASS);
        }
      } else {
        if ((index - 1) % this._workSpace._getCellCount() === 0) {
          return "".concat(cellClass, " ").concat(_classes.FIRST_GROUP_CELL_CLASS);
        }
      }
      return cellClass;
    };
    return HorizontalGroupedStrategy;
  }();
  var _default = HorizontalGroupedStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/position","../classes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/position"), require("../classes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.work_space.grouped.strategy.horizontal.js.map