!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/view_model/grouped_data_map_provider.js"], ["../../../../core/utils/date","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/view_model/grouped_data_map_provider.js", ["../../../../core/utils/date", "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GroupedDataMapProvider = void 0;
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _base = $__require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var GroupedDataMapProvider = /*#__PURE__*/function () {
    function GroupedDataMapProvider(viewDataGenerator, viewDataMap, completeViewDataMap, viewOptions) {
      this.groupedDataMap = viewDataGenerator.generateGroupedDataMap(viewDataMap);
      this.completeViewDataMap = completeViewDataMap;
      this._viewOptions = viewOptions;
    }
    var _proto = GroupedDataMapProvider.prototype;
    _proto.getGroupStartDate = function getGroupStartDate(groupIndex) {
      var firstRow = this.getFirstGroupRow(groupIndex);
      if (firstRow) {
        var startDate = firstRow[0].cellData.startDate;
        return startDate;
      }
    };
    _proto.getGroupEndDate = function getGroupEndDate(groupIndex) {
      var lastRow = this.getLastGroupRow(groupIndex);
      if (lastRow) {
        var lastColumnIndex = lastRow.length - 1;
        var cellData = lastRow[lastColumnIndex].cellData;
        var endDate = cellData.endDate;
        return endDate;
      }
    };
    _proto.findGroupCellStartDate = function findGroupCellStartDate(groupIndex, startDate, endDate, isFindByDate) {
      var groupData = this.getGroupFromDateTableGroupMap(groupIndex);
      var checkCellStartDate = function checkCellStartDate(rowIndex, columnIndex) {
        var cellData = groupData[rowIndex][columnIndex].cellData;
        var secondMin = cellData.startDate,
            secondMax = cellData.endDate;
        if (isFindByDate) {
          secondMin = _date.default.trimTime(secondMin);
          secondMax = _date.default.setToDayEnd(secondMin);
        }
        if (_date.default.intervalsOverlap({
          firstMin: startDate,
          firstMax: endDate,
          secondMin: secondMin,
          secondMax: secondMax
        })) {
          return secondMin;
        }
      };
      var searchVertical = function searchVertical() {
        var cellCount = groupData[0].length;
        for (var columnIndex = 0; columnIndex < cellCount; ++columnIndex) {
          for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
            var result = checkCellStartDate(rowIndex, columnIndex);
            if (result) return result;
          }
        }
      };
      var searchHorizontal = function searchHorizontal() {
        for (var rowIndex = 0; rowIndex < groupData.length; ++rowIndex) {
          var row = groupData[rowIndex];
          for (var columnIndex = 0; columnIndex < row.length; ++columnIndex) {
            var result = checkCellStartDate(rowIndex, columnIndex);
            if (result) return result;
          }
        }
      };
      var startDateVerticalSearch = searchVertical();
      var startDateHorizontalSearch = searchHorizontal();
      return startDateVerticalSearch > startDateHorizontalSearch ? startDateHorizontalSearch : startDateVerticalSearch;
    };
    _proto.findAllDayGroupCellStartDate = function findAllDayGroupCellStartDate(groupIndex, startDate) {
      var groupStartDate = this.getGroupStartDate(groupIndex);
      return groupStartDate > startDate ? groupStartDate : startDate;
    };
    _proto.findCellPositionInMap = function findCellPositionInMap(cellInfo) {
      var _this = this;
      var groupIndex = cellInfo.groupIndex,
          startDate = cellInfo.startDate,
          isAllDay = cellInfo.isAllDay,
          index = cellInfo.index;
      var startTime = isAllDay ? _date.default.trimTime(startDate).getTime() : startDate.getTime();
      var isStartDateInCell = function isStartDateInCell(cellData) {
        if (!(0, _base.isDateAndTimeView)(_this._viewOptions.viewType)) {
          return _date.default.sameDate(startDate, cellData.startDate);
        }
        var cellStartTime = cellData.startDate.getTime();
        var cellEndTime = cellData.endDate.getTime();
        return isAllDay ? cellData.allDay && startTime >= cellStartTime && startTime <= cellEndTime : startTime >= cellStartTime && startTime < cellEndTime;
      };
      var _this$groupedDataMap = this.groupedDataMap,
          allDayPanelGroupedMap = _this$groupedDataMap.allDayPanelGroupedMap,
          dateTableGroupedMap = _this$groupedDataMap.dateTableGroupedMap;
      var rows = isAllDay && !this._viewOptions.isVerticalGrouping ? allDayPanelGroupedMap[groupIndex] ? [allDayPanelGroupedMap[groupIndex]] : [] : dateTableGroupedMap[groupIndex] || [];
      for (var rowIndex = 0; rowIndex < rows.length; ++rowIndex) {
        var row = rows[rowIndex];
        for (var columnIndex = 0; columnIndex < row.length; ++columnIndex) {
          var cell = row[columnIndex];
          var cellData = cell.cellData;
          if (this._isSameGroupIndexAndIndex(cellData, groupIndex, index)) {
            if (isStartDateInCell(cellData)) {
              return cell.position;
            }
          }
        }
      }
      return undefined;
    };
    _proto._isSameGroupIndexAndIndex = function _isSameGroupIndexAndIndex(cellData, groupIndex, index) {
      return cellData.groupIndex === groupIndex && (index === undefined || cellData.index === index);
    };
    _proto.getCellsGroup = function getCellsGroup(groupIndex) {
      var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
      var groupData = dateTableGroupedMap[groupIndex];
      if (groupData) {
        var cellData = groupData[0][0].cellData;
        return cellData.groups;
      }
    };
    _proto.getCompletedGroupsInfo = function getCompletedGroupsInfo() {
      var _this2 = this;
      var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
      return dateTableGroupedMap.map(function (groupData) {
        var firstCell = groupData[0][0];
        var _firstCell$cellData = firstCell.cellData,
            allDay = _firstCell$cellData.allDay,
            groupIndex = _firstCell$cellData.groupIndex;
        return {
          allDay: allDay,
          groupIndex: groupIndex,
          startDate: _this2.getGroupStartDate(groupIndex),
          endDate: _this2.getGroupEndDate(groupIndex)
        };
      }).filter(function (_ref) {
        var startDate = _ref.startDate;
        return !!startDate;
      });
    };
    _proto.getGroupIndices = function getGroupIndices() {
      return this.getCompletedGroupsInfo().map(function (_ref2) {
        var groupIndex = _ref2.groupIndex;
        return groupIndex;
      });
    };
    _proto.getGroupFromDateTableGroupMap = function getGroupFromDateTableGroupMap(groupIndex) {
      var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
      return dateTableGroupedMap[groupIndex];
    };
    _proto.getFirstGroupRow = function getFirstGroupRow(groupIndex) {
      var groupedData = this.getGroupFromDateTableGroupMap(groupIndex);
      if (groupedData) {
        var cellData = groupedData[0][0].cellData;
        return !cellData.allDay ? groupedData[0] : groupedData[1];
      }
    };
    _proto.getLastGroupRow = function getLastGroupRow(groupIndex) {
      var dateTableGroupedMap = this.groupedDataMap.dateTableGroupedMap;
      var groupedData = dateTableGroupedMap[groupIndex];
      if (groupedData) {
        var lastRowIndex = groupedData.length - 1;
        return groupedData[lastRowIndex];
      }
    };
    _proto.getLastGroupCellPosition = function getLastGroupCellPosition(groupIndex) {
      var groupRow = this.getLastGroupRow(groupIndex);
      return groupRow === null || groupRow === void 0 ? void 0 : groupRow[(groupRow === null || groupRow === void 0 ? void 0 : groupRow.length) - 1].position;
    };
    _proto.getRowCountInGroup = function getRowCountInGroup(groupIndex) {
      var groupRow = this.getLastGroupRow(groupIndex);
      var cellAmount = groupRow.length;
      var lastCellData = groupRow[cellAmount - 1].cellData;
      var lastCellIndex = lastCellData.index;
      return (lastCellIndex + 1) / groupRow.length;
    };
    return GroupedDataMapProvider;
  }();
  exports.GroupedDataMapProvider = GroupedDataMapProvider;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/date","../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/date"), require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=grouped_data_map_provider.js.map