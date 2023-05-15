!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/exceljs/export.js"], ["../../core/utils/type","./export_format","../../core/utils/extend","../common/export_load_panel","../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/exceljs/export.js", ["../../core/utils/type", "./export_format", "../../core/utils/extend", "../common/export_load_panel", "../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Export = void 0;
  var _type = $__require("../../core/utils/type");
  var _export_format = $__require("./export_format");
  var _extend = $__require("../../core/utils/extend");
  var _export_load_panel = $__require("../common/export_load_panel");
  var _window = $__require("../../core/utils/window");
  // docs.microsoft.com/en-us/office/troubleshoot/excel/determine-column-widths - "Description of how column widths are determined in Excel"
  var MAX_DIGIT_WIDTH_IN_PIXELS = 7; // Calibri font with 11pt size

  // support.office.com/en-us/article/change-the-column-width-and-row-height-72f5e3cc-994d-43e8-ae58-9774a0905f46 - "Column.Max - 255"
  // support.office.com/en-us/article/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3 - "Column width limit - 255 characters"
  var MAX_EXCEL_COLUMN_WIDTH = 255;
  var Export = {
    getFullOptions: function getFullOptions(options) {
      var fullOptions = (0, _extend.extend)({}, options);
      if (!((0, _type.isDefined)(fullOptions.worksheet) && (0, _type.isObject)(fullOptions.worksheet))) {
        throw Error('The "worksheet" field must contain an object.');
      }
      if (!(0, _type.isDefined)(fullOptions.topLeftCell)) {
        fullOptions.topLeftCell = {
          row: 1,
          column: 1
        };
      } else if ((0, _type.isString)(fullOptions.topLeftCell)) {
        var _fullOptions$workshee = fullOptions.worksheet.getCell(fullOptions.topLeftCell),
            row = _fullOptions$workshee.row,
            col = _fullOptions$workshee.col;
        fullOptions.topLeftCell = {
          row: row,
          column: col
        };
      }
      if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
        fullOptions.keepColumnWidths = true;
      }
      if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
        fullOptions.loadPanel = {};
      }
      if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
        fullOptions.loadPanel.enabled = true;
      }
      if (!(0, _type.isDefined)(fullOptions.encodeExecutableContent)) {
        fullOptions.encodeExecutableContent = false;
      }
      return fullOptions;
    },
    convertDateForExcelJS: function convertDateForExcelJS(date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    },
    setNumberFormat: function setNumberFormat(excelCell, numberFormat) {
      excelCell.numFmt = numberFormat;
    },
    getCellStyles: function getCellStyles(dataProvider) {
      var _this = this;
      var styles = dataProvider.getStyles();
      styles.forEach(function (style) {
        var numberFormat = _this.tryConvertToExcelNumberFormat(style.format, style.dataType);
        if ((0, _type.isDefined)(numberFormat)) {
          numberFormat = numberFormat.replace(/&quot;/g, '"');
        }
        style.numberFormat = numberFormat;
      });
      return styles;
    },
    tryConvertToExcelNumberFormat: function tryConvertToExcelNumberFormat(format, dataType) {
      var newFormat = _export_format.ExportFormat.formatObjectConverter(format, dataType);
      var currency = newFormat.currency;
      format = newFormat.format;
      dataType = newFormat.dataType;
      return _export_format.ExportFormat.convertFormat(format, newFormat.precision, dataType, currency);
    },
    setAlignment: function setAlignment(excelCell, wrapText, horizontalAlignment) {
      var _excelCell$alignment;
      excelCell.alignment = (_excelCell$alignment = excelCell.alignment) !== null && _excelCell$alignment !== void 0 ? _excelCell$alignment : {};
      if ((0, _type.isDefined)(wrapText)) {
        excelCell.alignment.wrapText = wrapText;
      }
      if ((0, _type.isDefined)(horizontalAlignment)) {
        excelCell.alignment.horizontal = horizontalAlignment;
      }
      excelCell.alignment.vertical = 'top';
    },
    setColumnsWidth: function setColumnsWidth(worksheet, widths, startColumnIndex) {
      if (!(0, _type.isDefined)(widths)) {
        return;
      }
      for (var i = 0; i < widths.length; i++) {
        var columnWidth = widths[i];
        if (typeof columnWidth === 'number' && isFinite(columnWidth)) {
          worksheet.getColumn(startColumnIndex + i).width = Math.min(MAX_EXCEL_COLUMN_WIDTH, Math.floor(columnWidth / MAX_DIGIT_WIDTH_IN_PIXELS * 100) / 100);
        }
      }
    },
    export: function _export(options, Helpers, getLoadPanelTargetElement, getLoadPanelContainer) {
      var _component$_getIntern,
          _this2 = this;
      var component = options.component,
          worksheet = options.worksheet,
          topLeftCell = options.topLeftCell,
          keepColumnWidths = options.keepColumnWidths,
          selectedRowsOnly = options.selectedRowsOnly,
          loadPanel = options.loadPanel,
          encodeExecutableContent = options.encodeExecutableContent;
      var dataProvider = component.getDataProvider(selectedRowsOnly);
      var internalComponent = ((_component$_getIntern = component._getInternalInstance) === null || _component$_getIntern === void 0 ? void 0 : _component$_getIntern.call(component)) || component;
      var initialLoadPanelEnabledOption = internalComponent.option('loadPanel') && internalComponent.option('loadPanel').enabled;
      if (initialLoadPanelEnabledOption) {
        component.option('loadPanel.enabled', false);
      }
      var exportLoadPanel;
      if (loadPanel.enabled && (0, _window.hasWindow)()) {
        var $targetElement = getLoadPanelTargetElement(component);
        var $container = getLoadPanelContainer(component);
        exportLoadPanel = new _export_load_panel.ExportLoadPanel(component, $targetElement, $container, loadPanel);
        exportLoadPanel.show();
      }
      var wrapText = !!component.option('wordWrapEnabled');
      worksheet.properties.outlineProperties = {
        summaryBelow: false,
        summaryRight: false
      };
      var cellRange = {
        from: {
          row: topLeftCell.row,
          column: topLeftCell.column
        },
        to: {
          row: topLeftCell.row,
          column: topLeftCell.column
        }
      };
      return new Promise(function (resolve) {
        dataProvider.ready().done(function () {
          var columns = dataProvider.getColumns();
          var dataRowsCount = dataProvider.getRowsCount();
          var helpers = new Helpers(component, dataProvider, worksheet, options);
          if (keepColumnWidths) {
            _this2.setColumnsWidth(worksheet, dataProvider.getColumnsWidths(), cellRange.from.column);
          }
          helpers._exportAllFieldHeaders(columns, _this2.setAlignment);
          var fieldHeaderRowsCount = helpers._getFieldHeaderRowsCount();
          cellRange.to.row = cellRange.from.row + fieldHeaderRowsCount;
          var styles = _this2.getCellStyles(dataProvider);
          for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
            var currentRowIndex = cellRange.from.row + fieldHeaderRowsCount + rowIndex;
            var row = worksheet.getRow(currentRowIndex);
            var startColumnIndex = 0;
            if (helpers._isRowFieldHeadersRow(rowIndex)) {
              startColumnIndex = dataProvider.getRowAreaColCount();
              helpers._exportFieldHeaders('row', currentRowIndex, 0, startColumnIndex, _this2.setAlignment);
            }
            helpers._trySetOutlineLevel(row, rowIndex);
            _this2.exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columns.length, wrapText, styles, encodeExecutableContent);
            cellRange.to.row = currentRowIndex;
          }
          helpers.mergedRangesManager.applyMergedRages();
          cellRange.to.column += columns.length > 0 ? columns.length - 1 : 0;
          var worksheetViewSettings = worksheet.views[0] || {};
          if (component.option('rtlEnabled')) {
            worksheetViewSettings.rightToLeft = true;
          }
          if (helpers._isFrozenZone(dataProvider)) {
            if (Object.keys(worksheetViewSettings).indexOf('state') === -1) {
              (0, _extend.extend)(worksheetViewSettings, helpers._getWorksheetFrozenState(cellRange));
            }
            helpers._trySetAutoFilter(cellRange);
          }
          if (Object.keys(worksheetViewSettings).length > 0) {
            worksheet.views = [worksheetViewSettings];
          }
          resolve(cellRange);
        }).always(function () {
          if (initialLoadPanelEnabledOption) {
            component.option('loadPanel.enabled', initialLoadPanelEnabledOption);
          }
          if (loadPanel.enabled && (0, _window.hasWindow)()) {
            exportLoadPanel.dispose();
          }
        });
      });
    },
    exportRow: function exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columnsCount, wrapText, styles, encodeExecutableContent) {
      for (var cellIndex = startColumnIndex; cellIndex < columnsCount; cellIndex++) {
        var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
        var excelCell = row.getCell(helpers._getFirstColumnIndex() + cellIndex);
        helpers.mergedRangesManager.updateMergedRanges(excelCell, rowIndex, cellIndex, helpers);
        var cellInfo = helpers.mergedRangesManager.findMergedCellInfo(rowIndex, cellIndex, helpers._isHeaderCell(rowIndex, cellIndex));
        if ((0, _type.isDefined)(cellInfo) && excelCell !== cellInfo.masterCell) {
          excelCell.style = cellInfo.masterCell.style;
          excelCell.value = cellInfo.masterCell.value;
        } else {
          if ((0, _type.isDate)(cellData.value)) {
            excelCell.value = this.convertDateForExcelJS(cellData.value);
          } else {
            excelCell.value = cellData.value;
          }
          if ((0, _type.isDefined)(excelCell.value)) {
            var _styles$dataProvider$ = styles[dataProvider.getStyleId(rowIndex, cellIndex)],
                bold = _styles$dataProvider$.bold,
                horizontalAlignment = _styles$dataProvider$.alignment,
                numberFormat = _styles$dataProvider$.numberFormat;
            if ((0, _type.isDefined)(numberFormat)) {
              this.setNumberFormat(excelCell, numberFormat);
            } else if ((0, _type.isString)(excelCell.value) && /^[@=+-]/.test(excelCell.value)) {
              this.setNumberFormat(excelCell, '@');
            }
            helpers._trySetFont(excelCell, bold);
            this.setAlignment(excelCell, wrapText, horizontalAlignment);
          }
        }
        helpers._customizeCell(excelCell, cellData.cellSourceData);
        if (encodeExecutableContent) {
          excelCell.value = _export_format.ExportFormat.encode(excelCell.value);
        }
      }
    }
  };

  //#DEBUG
  exports.Export = Export;
  Export.__internals = {
    MAX_EXCEL_COLUMN_WIDTH: MAX_EXCEL_COLUMN_WIDTH,
    MAX_DIGIT_WIDTH_IN_PIXELS: MAX_DIGIT_WIDTH_IN_PIXELS
  };
  //#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","./export_format","../../core/utils/extend","../common/export_load_panel","../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("./export_format"), require("../../core/utils/extend"), require("../common/export_load_panel"), require("../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.js.map