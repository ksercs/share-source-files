!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/export/module.js"], ["../../../../core/class","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/utils/window","../../../../core/utils/position","../../../../format_helper","../../../../localization/number","../../../../ui/grid_core/ui.grid_core.export","../../../../core/utils/deferred"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/export/module.js", ["../../../../core/class", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../core/utils/window", "../../../../core/utils/position", "../../../../format_helper", "../../../../localization/number", "../../../../ui/grid_core/ui.grid_core.export", "../../../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.PivotGridExport = exports.ExportController = exports.DataProvider = void 0;
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _window = $__require("../../../../core/utils/window");
  var _position = $__require("../../../../core/utils/position");
  var _format_helper = _interopRequireDefault($__require("../../../../format_helper"));
  var _number = _interopRequireDefault($__require("../../../../localization/number"));
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.export");
  var _deferred = $__require("../../../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var DEFAULT_DATA_TYPE = 'string';
  var DEFAUL_COLUMN_WIDTH = 100;
  var ExportController = {
    exportTo: function exportTo() {
      var onExporting = this._createActionByOption('onExporting');
      var eventArgs = {
        rtlEnabled: this.option('rtlEnabled'),
        fileName: 'PivotGrid',
        cancel: false
      };
      (0, _type.isFunction)(onExporting) && onExporting(eventArgs);
    },
    _getLength: function _getLength(items) {
      var i;
      var itemCount = items[0].length;
      var cellCount = 0;
      for (i = 0; i < itemCount; i += 1) {
        cellCount += items[0][i].colspan || 1;
      }
      return cellCount;
    },
    _correctCellsInfoItemLengths: function _correctCellsInfoItemLengths(cellsInfo, expectedLength) {
      for (var i = 0; i < cellsInfo.length; i += 1) {
        while (cellsInfo[i].length < expectedLength) {
          cellsInfo[i].push({});
        }
      }
      return cellsInfo;
    },
    _calculateCellInfoItemLength: function _calculateCellInfoItemLength(columnsRow) {
      var result = 0;
      for (var columnIndex = 0; columnIndex < columnsRow.length; columnIndex += 1) {
        result += (0, _type.isDefined)(columnsRow[columnIndex].colspan) ? columnsRow[columnIndex].colspan : 1;
      }
      return result;
    },
    _getEmptyCell: function _getEmptyCell() {
      return {
        text: '',
        value: undefined,
        colspan: 1,
        rowspan: 1
      };
    },
    _getAllItems: function _getAllItems(columnsInfo, rowsInfoItems, cellsInfo) {
      var cellIndex;
      var rowIndex;
      var correctedCellsInfo = cellsInfo;
      var rowsLength = this._getLength(rowsInfoItems);
      var headerRowsCount = columnsInfo.length;
      if (columnsInfo.length > 0 && columnsInfo[0].length > 0 && cellsInfo.length > 0 && cellsInfo[0].length === 0) {
        var cellInfoItemLength = this._calculateCellInfoItemLength(columnsInfo[0]);
        if (cellInfoItemLength > 0) {
          correctedCellsInfo = this._correctCellsInfoItemLengths(cellsInfo, cellInfoItemLength);
        }
      }
      // NOTE (T1155137): If the data area is empty - fill in empty cells
      // for the correct layout of the export table
      if (correctedCellsInfo.length === 0) {
        var rowsCount = rowsInfoItems.length;
        var collapsedColumnCount = columnsInfo.map(function (headerRowWithColumns) {
          return headerRowWithColumns.filter(function (row) {
            return !row.expanded;
          }).length;
        }).reduce(function (result, collapsedCount) {
          return result + collapsedCount;
        }, 0);
        for (var rowIdx = 0; rowIdx < rowsCount; rowIdx += 1) {
          correctedCellsInfo[rowIdx] = [];
          for (var colIdx = 0; colIdx < collapsedColumnCount; colIdx += 1) {
            correctedCellsInfo[rowIdx][colIdx] = this._getEmptyCell();
          }
        }
      }
      var sourceItems = columnsInfo.concat(correctedCellsInfo);
      for (rowIndex = 0; rowIndex < rowsInfoItems.length; rowIndex += 1) {
        for (cellIndex = rowsInfoItems[rowIndex].length - 1; cellIndex >= 0; cellIndex -= 1) {
          if (!(0, _type.isDefined)(sourceItems[rowIndex + headerRowsCount])) {
            sourceItems[rowIndex + headerRowsCount] = [];
          }
          sourceItems[rowIndex + headerRowsCount].splice(0, 0, (0, _extend.extend)({}, rowsInfoItems[rowIndex][cellIndex]));
        }
      }
      sourceItems[0].splice(0, 0, (0, _extend.extend)({}, this._getEmptyCell(), {
        alignment: (0, _position.getDefaultAlignment)(this._options.rtlEnabled),
        colspan: rowsLength,
        rowspan: headerRowsCount
      }));
      return (0, _uiGrid_core.prepareItems)(sourceItems, this._getEmptyCell());
    },
    getDataProvider: function getDataProvider() {
      return new DataProvider(this);
    }
  };
  exports.ExportController = ExportController;
  var DataProvider = _class.default.inherit({
    ctor: function ctor(exportController) {
      this._exportController = exportController;
    },
    ready: function ready() {
      this._initOptions();
      var options = this._options;
      return (0, _deferred.when)(options.items).done(function (items) {
        var headerSize = items[0][0].rowspan;
        var columns = items[headerSize - 1];
        (0, _iterator.each)(columns, function (_, column) {
          column.width = DEFAUL_COLUMN_WIDTH;
        });
        options.columns = columns;
        options.items = items;
      });
    },
    _initOptions: function _initOptions() {
      var exportController = this._exportController;
      var dataController = exportController._dataController;
      // @ts-expect-error
      var items = new _deferred.Deferred();
      dataController.beginLoading();
      setTimeout(function () {
        var columnsInfo = (0, _extend.extend)(true, [], dataController.getColumnsInfo(true));
        var rowsInfoItems = (0, _extend.extend)(true, [], dataController.getRowsInfo(true));
        var cellsInfo = dataController.getCellsInfo(true);
        items.resolve(exportController._getAllItems(columnsInfo, rowsInfoItems, cellsInfo));
        dataController.endLoading();
      });
      this._options = {
        items: items,
        rtlEnabled: exportController.option('rtlEnabled'),
        dataFields: exportController.getDataSource().getAreaFields('data'),
        rowsArea: exportController._rowsArea,
        columnsArea: exportController._columnsArea
      };
    },
    getColumns: function getColumns() {
      return this._options.columns;
    },
    getColumnsWidths: function getColumnsWidths() {
      var colsArea = this._options.columnsArea;
      var rowsArea = this._options.rowsArea;
      var columns = this._options.columns;
      var useDefaultWidth = !(0, _window.hasWindow)() || colsArea.option('scrolling.mode') === 'virtual' || colsArea.element().is(':hidden');
      return useDefaultWidth ? columns.map(function () {
        return DEFAUL_COLUMN_WIDTH;
      }) : rowsArea.getColumnsWidth().concat(colsArea.getColumnsWidth());
    },
    getRowsCount: function getRowsCount() {
      return this._options.items.length;
    },
    getGroupLevel: function getGroupLevel() {
      return 0;
    },
    getCellMerging: function getCellMerging(rowIndex, cellIndex) {
      var items = this._options.items;
      var item = items[rowIndex] && items[rowIndex][cellIndex];
      return item ? {
        colspan: item.colspan - 1,
        rowspan: item.rowspan - 1
      } : {
        colspan: 0,
        rowspan: 0
      };
    },
    getFrozenArea: function getFrozenArea() {
      return {
        x: this.getRowAreaColCount(),
        y: this.getColumnAreaRowCount()
      };
    },
    getCellType: function getCellType(rowIndex, cellIndex) {
      var style = this.getStyles()[this.getStyleId(rowIndex, cellIndex)];
      return style && style.dataType || 'string';
    },
    getCellData: function getCellData(rowIndex, cellIndex, isExcelJS) {
      var result = {};
      var items = this._options.items;
      var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
      if (isExcelJS) {
        result.cellSourceData = item;
        var areaName = this._tryGetAreaName(item, rowIndex, cellIndex);
        if (areaName) {
          result.cellSourceData.area = areaName;
        }
        result.cellSourceData.rowIndex = rowIndex;
        result.cellSourceData.columnIndex = cellIndex;
      }
      if (this.getCellType(rowIndex, cellIndex) === 'string') {
        result.value = item.text;
      } else {
        result.value = item.value;
      }
      if (result.cellSourceData && result.cellSourceData.isWhiteSpace) {
        result.value = '';
      }
      return result;
    },
    _tryGetAreaName: function _tryGetAreaName(item, rowIndex, cellIndex) {
      if (this.isColumnAreaCell(rowIndex, cellIndex)) {
        return 'column';
      }
      if (this.isRowAreaCell(rowIndex, cellIndex)) {
        return 'row';
      }
      if ((0, _type.isDefined)(item.dataIndex)) {
        return 'data';
      }
      return undefined;
    },
    isRowAreaCell: function isRowAreaCell(rowIndex, cellIndex) {
      return rowIndex >= this.getColumnAreaRowCount() && cellIndex < this.getRowAreaColCount();
    },
    isColumnAreaCell: function isColumnAreaCell(rowIndex, cellIndex) {
      return cellIndex >= this.getRowAreaColCount() && rowIndex < this.getColumnAreaRowCount();
    },
    getColumnAreaRowCount: function getColumnAreaRowCount() {
      return this._options.items[0][0].rowspan;
    },
    getRowAreaColCount: function getRowAreaColCount() {
      return this._options.items[0][0].colspan;
    },
    getHeaderStyles: function getHeaderStyles() {
      return [{
        alignment: 'center',
        dataType: 'string'
      }, {
        alignment: (0, _position.getDefaultAlignment)(this._options.rtlEnabled),
        dataType: 'string'
      }];
    },
    getDataFieldStyles: function getDataFieldStyles() {
      var _this = this;
      var dataFields = this._options.dataFields;
      var dataItemStyle = {
        alignment: this._options.rtlEnabled ? 'left' : 'right'
      };
      var dataFieldStyles = [];
      if (dataFields.length) {
        dataFields.forEach(function (dataField) {
          dataFieldStyles.push(_extends(_extends({}, dataItemStyle), {
            format: dataField.format,
            dataType: _this.getCellDataType(dataField)
          }));
        });
        return dataFieldStyles;
      }
      return [dataItemStyle];
    },
    getStyles: function getStyles() {
      if (this._styles) {
        return this._styles;
      }
      this._styles = [].concat(_toConsumableArray(this.getHeaderStyles()), _toConsumableArray(this.getDataFieldStyles()));
      return this._styles;
    },
    getCellDataType: function getCellDataType(field) {
      if (field && field.customizeText) {
        return 'string';
      }
      if (field.dataType) {
        return field.dataType;
      }
      if (field.format) {
        if (_number.default.parse(_format_helper.default.format(1, field.format)) === 1) {
          return 'number';
        }
        if (_format_helper.default.format(new Date(), field.format)) {
          return 'date';
        }
      }
      return DEFAULT_DATA_TYPE;
    },
    getStyleId: function getStyleId(rowIndex, cellIndex) {
      var items = this._options.items;
      var item = items[rowIndex] && items[rowIndex][cellIndex] || {};
      if (cellIndex === 0 && rowIndex === 0 || this.isColumnAreaCell(rowIndex, cellIndex)) {
        return 0;
      }
      if (this.isRowAreaCell(rowIndex, cellIndex)) {
        return 1;
      }
      return this.getHeaderStyles().length + (item.dataIndex || 0);
    }
  });
  exports.DataProvider = DataProvider;
  var PivotGridExport = {
    DEFAUL_COLUMN_WIDTH: DEFAUL_COLUMN_WIDTH
  };
  exports.PivotGridExport = PivotGridExport;
  var _default = {
    ExportController: ExportController,
    PivotGridExport: PivotGridExport,
    DataProvider: DataProvider
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/class","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/utils/window","../../../../core/utils/position","../../../../format_helper","../../../../localization/number","../../../../ui/grid_core/ui.grid_core.export","../../../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/class"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../core/utils/window"), require("../../../../core/utils/position"), require("../../../../format_helper"), require("../../../../localization/number"), require("../../../../ui/grid_core/ui.grid_core.export"), require("../../../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map