!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/exporter/exceljs/export_pivot_grid.js"], ["../../core/utils/type","./export","../../core/utils/position","../../core/utils/inflector","./export_merged_ranges_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/exporter/exceljs/export_pivot_grid.js", ["../../core/utils/type", "./export", "../../core/utils/position", "../../core/utils/inflector", "./export_merged_ranges_manager"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.exportPivotGrid = exportPivotGrid;
  var _type = $__require("../../core/utils/type");
  var _export = $__require("./export");
  var _position = $__require("../../core/utils/position");
  var _inflector = $__require("../../core/utils/inflector");
  var _export_merged_ranges_manager = $__require("./export_merged_ranges_manager");
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
  var FIELD_HEADERS_SEPARATOR = ', ';
  var PivotGridHelpers = /*#__PURE__*/function () {
    function PivotGridHelpers(component, dataProvider, worksheet, options) {
      this.component = component;
      this.dataProvider = dataProvider;
      this.worksheet = worksheet;
      this.mergedRangesManager = new _export_merged_ranges_manager.MergedRangesManager(dataProvider, worksheet);
      this.topLeftCell = options.topLeftCell;
      this.customizeCell = options.customizeCell;
      this.mergeColumnFieldValues = options.mergeColumnFieldValues;
      this.mergeRowFieldValues = options.mergeRowFieldValues;
      this.exportFilterFieldHeaders = options.exportFilterFieldHeaders;
      this.exportDataFieldHeaders = options.exportDataFieldHeaders;
      this.exportColumnFieldHeaders = options.exportColumnFieldHeaders;
      this.exportRowFieldHeaders = options.exportRowFieldHeaders;
      this.rtlEnabled = component.option('rtlEnabled');
      this.rowHeaderLayout = component.option('rowHeaderLayout');
      this.wrapText = !!component.option('wordWrapEnabled');
      this.filterFieldHeaders = this._tryGetFieldHeaders('filter');
      this.dataFieldHeaders = this._tryGetFieldHeaders('data');
      this.columnFieldHeaders = this._tryGetFieldHeaders('column');
      this.rowFieldHeaders = this._tryGetFieldHeaders('row');
    }
    var _proto = PivotGridHelpers.prototype;
    _proto._getFirstColumnIndex = function _getFirstColumnIndex() {
      return this.topLeftCell.column;
    };
    _proto._getWorksheetFrozenState = function _getWorksheetFrozenState(cellRange) {
      var _this$dataProvider$ge = this.dataProvider.getFrozenArea(),
          x = _this$dataProvider$ge.x,
          y = _this$dataProvider$ge.y;
      return {
        state: 'frozen',
        xSplit: cellRange.from.column + x - 1,
        ySplit: cellRange.from.row + y + this._getFieldHeaderRowsCount() - 1
      };
    };
    _proto._getFieldHeaderRowsCount = function _getFieldHeaderRowsCount() {
      return 0 + this._allowExportFilterFieldHeaders() + (this._allowExportDataFieldHeaders() || this._allowExportColumnFieldHeaders());
    };
    _proto._isFrozenZone = function _isFrozenZone() {
      return true;
    };
    _proto._isHeaderCell = function _isHeaderCell(rowIndex, cellIndex) {
      return rowIndex < this.dataProvider.getColumnAreaRowCount() || cellIndex < this.dataProvider.getRowAreaColCount();
    };
    _proto._getDefaultFieldHeaderCellsData = function _getDefaultFieldHeaderCellsData(value) {
      return {
        text: value,
        value: value
      };
    };
    _proto._isInfoCell = function _isInfoCell(rowIndex, cellIndex) {
      return rowIndex < this.dataProvider.getColumnAreaRowCount() && cellIndex < this.dataProvider.getRowAreaColCount();
    };
    _proto._allowToMergeRange = function _allowToMergeRange(rowIndex, cellIndex, rowspan, colspan) {
      return !(this.dataProvider.isColumnAreaCell(rowIndex, cellIndex) && !this.mergeColumnFieldValues && !!colspan || this.dataProvider.isRowAreaCell(rowIndex, cellIndex) && !this.mergeRowFieldValues && !!rowspan);
    };
    _proto._trySetAutoFilter = function _trySetAutoFilter() {};
    _proto._trySetFont = function _trySetFont(excelCell, bold) {
      if ((0, _type.isDefined)(bold)) {
        excelCell.font = excelCell.font || {};
        excelCell.font.bold = bold;
      }
    };
    _proto._getFieldHeaderStyles = function _getFieldHeaderStyles() {
      // eslint-disable-next-line spellcheck/spell-checker
      var borderStyle = {
        style: 'thin',
        color: {
          argb: 'FF7E7E7E'
        }
      };
      return {
        alignment: (0, _position.getDefaultAlignment)(this.rtlEnabled),
        bold: true,
        border: {
          bottom: borderStyle,
          left: borderStyle,
          right: borderStyle,
          top: borderStyle
        }
      };
    };
    _proto._trySetOutlineLevel = function _trySetOutlineLevel() {};
    _proto._getAllFieldHeaders = function _getAllFieldHeaders() {
      return this.dataProvider._exportController.getDataSource()._descriptions;
    };
    _proto._tryGetFieldHeaders = function _tryGetFieldHeaders(area) {
      if (!this["export".concat((0, _inflector.camelize)(area, true), "FieldHeaders")]) {
        return [];
      }
      var fields = this._getAllFieldHeaders()[area === 'data' ? 'values' : "".concat(area, "s")].filter(function (fieldHeader) {
        return fieldHeader.area === area;
      });
      if ((0, _position.getDefaultAlignment)(this.rtlEnabled) === 'right') {
        fields.sort(function (a, b) {
          return b.areaIndex - a.areaIndex;
        });
      }
      return fields.map(function (field) {
        return field.caption;
      });
    };
    _proto._customizeCell = function _customizeCell(excelCell, pivotCell, shouldPreventCall) {
      if ((0, _type.isFunction)(this.customizeCell) && !shouldPreventCall) {
        this.customizeCell({
          excelCell: excelCell,
          pivotCell: pivotCell
        });
      }
    };
    _proto._isRowFieldHeadersRow = function _isRowFieldHeadersRow(rowIndex) {
      var isLastInfoRangeCell = this._isInfoCell(rowIndex, 0) && this.dataProvider.getCellData(rowIndex + 1, 0, true).cellSourceData.area === 'row';
      return this._allowExportRowFieldHeaders() && isLastInfoRangeCell;
    };
    _proto._exportAllFieldHeaders = function _exportAllFieldHeaders(columns, setAlignment) {
      var totalCellsCount = columns.length;
      var rowAreaColCount = this.dataProvider.getRowAreaColCount();
      var rowIndex = this.topLeftCell.row;
      if (this._allowExportFilterFieldHeaders()) {
        this._exportFieldHeaders('filter', rowIndex, 0, totalCellsCount, setAlignment);
        rowIndex++;
      }
      if (this._allowExportDataFieldHeaders()) {
        this._exportFieldHeaders('data', rowIndex, 0, rowAreaColCount, setAlignment);
        if (!this._allowExportColumnFieldHeaders()) {
          this._exportFieldHeaders('column', rowIndex, rowAreaColCount, totalCellsCount - rowAreaColCount, setAlignment);
        }
      }
      if (this._allowExportColumnFieldHeaders()) {
        if (!this._allowExportDataFieldHeaders()) {
          this._exportFieldHeaders('data', rowIndex, 0, rowAreaColCount, setAlignment);
        }
        this._exportFieldHeaders('column', rowIndex, rowAreaColCount, totalCellsCount - rowAreaColCount, setAlignment);
      }
    };
    _proto._exportFieldHeaders = function _exportFieldHeaders(area, rowIndex, startColumnIndex, totalColumnsCount, setAlignment) {
      var fieldHeaders = this["".concat(area, "FieldHeaders")];
      var row = this.worksheet.getRow(rowIndex);
      var shouldMergeHeaderField = area !== 'row' || area === 'row' && this.rowHeaderLayout === 'tree';
      if (shouldMergeHeaderField) {
        this.mergedRangesManager.addMergedRange(row.getCell(this.topLeftCell.column + startColumnIndex), 0, totalColumnsCount - 1);
      }
      for (var cellIndex = 0; cellIndex < totalColumnsCount; cellIndex++) {
        var excelCell = row.getCell(this.topLeftCell.column + startColumnIndex + cellIndex);
        var values = fieldHeaders;
        var cellData = [];
        var value = values.length > totalColumnsCount || shouldMergeHeaderField ? values.join(FIELD_HEADERS_SEPARATOR) : values[cellIndex];
        cellData = _extends({}, this._getDefaultFieldHeaderCellsData(value), {
          headerType: area
        });
        excelCell.value = value;
        this._applyHeaderStyles(excelCell, setAlignment);
        this._customizeCell(excelCell, cellData);
      }
    };
    _proto._applyHeaderStyles = function _applyHeaderStyles(excelCell, setAlignment) {
      var _this$_getFieldHeader = this._getFieldHeaderStyles(),
          bold = _this$_getFieldHeader.bold,
          alignment = _this$_getFieldHeader.alignment,
          border = _this$_getFieldHeader.border;
      this._trySetFont(excelCell, bold);
      setAlignment(excelCell, this.wrapText, alignment);
      excelCell.border = border;
    };
    _proto._allowExportRowFieldHeaders = function _allowExportRowFieldHeaders() {
      return this.rowFieldHeaders.length > 0;
    };
    _proto._allowExportFilterFieldHeaders = function _allowExportFilterFieldHeaders() {
      return this.filterFieldHeaders.length > 0;
    };
    _proto._allowExportDataFieldHeaders = function _allowExportDataFieldHeaders() {
      return this.dataFieldHeaders.length > 0;
    };
    _proto._allowExportColumnFieldHeaders = function _allowExportColumnFieldHeaders() {
      return this.columnFieldHeaders.length > 0;
    };
    return PivotGridHelpers;
  }();
  function exportPivotGrid(options) {
    return _export.Export.export(_getFullOptions(options), PivotGridHelpers, _getLoadPanelTargetElement, _getLoadPanelContainer);
  }
  function _getFullOptions(options) {
    if (!((0, _type.isDefined)(options) && (0, _type.isObject)(options))) {
      throw Error('The "exportPivotGrid" method requires a configuration object.');
    }
    if (!((0, _type.isDefined)(options.component) && (0, _type.isObject)(options.component) && options.component.NAME === 'dxPivotGrid')) {
      throw Error('The "component" field must contain a PivotGrid instance.');
    }
    if (!(0, _type.isDefined)(options.mergeRowFieldValues)) {
      options.mergeRowFieldValues = true;
    }
    if (!(0, _type.isDefined)(options.mergeColumnFieldValues)) {
      options.mergeColumnFieldValues = true;
    }
    if (!(0, _type.isDefined)(options.exportDataFieldHeaders)) {
      options.exportDataFieldHeaders = false;
    }
    if (!(0, _type.isDefined)(options.exportRowFieldHeaders)) {
      options.exportRowFieldHeaders = false;
    }
    if (!(0, _type.isDefined)(options.exportColumnFieldHeaders)) {
      options.exportColumnFieldHeaders = false;
    }
    if (!(0, _type.isDefined)(options.exportFilterFieldHeaders)) {
      options.exportFilterFieldHeaders = false;
    }
    return _export.Export.getFullOptions(options);
  }
  function _getLoadPanelTargetElement(component) {
    return component._dataArea.groupElement();
  }
  function _getLoadPanelContainer(component) {
    return component.$element();
  }

  //#DEBUG
  exportPivotGrid.__internals = {
    _getFullOptions: _getFullOptions
  };
  //#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","./export","../../core/utils/position","../../core/utils/inflector","./export_merged_ranges_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("./export"), require("../../core/utils/position"), require("../../core/utils/inflector"), require("./export_merged_ranges_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export_pivot_grid.js.map