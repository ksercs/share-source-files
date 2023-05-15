!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/exporter/jspdf/autotable/export.js"], ["../../../core/utils/type","../../../core/utils/extend","../../../localization/date","../../../localization/number","../../../localization/message","../../common/export_load_panel","../../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/exporter/jspdf/autotable/export.js", ["../../../core/utils/type", "../../../core/utils/extend", "../../../localization/date", "../../../localization/number", "../../../localization/message", "../../common/export_load_panel", "../../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Export = void 0;
  var _type = $__require("../../../core/utils/type");
  var _extend = $__require("../../../core/utils/extend");
  var _date = _interopRequireDefault($__require("../../../localization/date"));
  var _number = _interopRequireDefault($__require("../../../localization/number"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _export_load_panel = $__require("../../common/export_load_panel");
  var _window = $__require("../../../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var Export = {
    getFullOptions: function getFullOptions(options) {
      var fullOptions = (0, _extend.extend)({}, options);
      if (!((0, _type.isDefined)(fullOptions.jsPDFDocument) && (0, _type.isObject)(fullOptions.jsPDFDocument))) {
        throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
      }
      if (!((0, _type.isDefined)(fullOptions.jsPDFDocument.autoTable) && (0, _type.isFunction)(fullOptions.jsPDFDocument.autoTable))) {
        throw Error('The "exportDataGrid" method requires a autoTable plugin for jsPDF object.');
      }
      if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
        fullOptions.keepColumnWidths = true;
      }
      if (!(0, _type.isDefined)(fullOptions.autoTableOptions)) {
        fullOptions.autoTableOptions = this._getDefaultAutoTableOptions();
      } else {
        if (!(0, _type.isObject)(fullOptions.autoTableOptions)) {
          throw Error('The "autoTableOptions" option must be of object type.');
        }
        fullOptions.autoTableOptions = (0, _extend.extend)(true, {}, this._getDefaultAutoTableOptions(), fullOptions.autoTableOptions);
      }
      if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
        fullOptions.loadPanel = {};
      }
      if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
        fullOptions.loadPanel.enabled = true;
      }
      if (!(0, _type.isDefined)(fullOptions.loadPanel.text)) {
        fullOptions.loadPanel.text = _message.default.format('dxDataGrid-exporting');
      }
      return fullOptions;
    },
    _getDefaultAutoTableOptions: function _getDefaultAutoTableOptions() {
      return {
        theme: 'plain',
        tableLineColor: 149,
        tableLineWidth: 0.1,
        styles: {
          textColor: 51,
          lineColor: 149,
          lineWidth: 0
        },
        columnStyles: {},
        headStyles: {
          fontStyle: 'normal',
          textColor: 149,
          lineWidth: 0.1
        },
        bodyStyles: {
          lineWidth: 0.1
        },
        head: [],
        body: []
      };
    },
    export: function _export(options) {
      var _component$_getIntern,
          _this = this;
      var jsPDFDocument = options.jsPDFDocument,
          autoTableOptions = options.autoTableOptions,
          component = options.component,
          customizeCell = options.customizeCell,
          keepColumnWidths = options.keepColumnWidths,
          selectedRowsOnly = options.selectedRowsOnly,
          loadPanel = options.loadPanel;
      var internalComponent = ((_component$_getIntern = component._getInternalInstance) === null || _component$_getIntern === void 0 ? void 0 : _component$_getIntern.call(component)) || component;
      var initialLoadPanelEnabledOption = internalComponent.option('loadPanel') && internalComponent.option('loadPanel').enabled;
      if (initialLoadPanelEnabledOption) {
        component.option('loadPanel.enabled', false);
      }
      var exportLoadPanel;
      if (loadPanel.enabled && (0, _window.hasWindow)()) {
        var rowsView = component.getView('rowsView');
        exportLoadPanel = new _export_load_panel.ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
        exportLoadPanel.show();
      }
      var dataProvider = component.getDataProvider(selectedRowsOnly);
      var wrapText = !!component.option('wordWrapEnabled');
      return new Promise(function (resolve) {
        dataProvider.ready().done(function () {
          var columns = dataProvider.getColumns();
          var styles = dataProvider.getStyles();
          var dataRowsCount = dataProvider.getRowsCount();
          var headerRowCount = dataProvider.getHeaderRowCount();
          var mergedCells = [];
          if (keepColumnWidths) {
            var pdfColumnWidths = _this._tryGetPdfColumnWidths(autoTableOptions.tableWidth, dataProvider.getColumnsWidths());
            if ((0, _type.isDefined)(pdfColumnWidths) && (0, _type.isDefined)(autoTableOptions.columnStyles)) {
              _this._setColumnWidths(autoTableOptions.columnStyles, pdfColumnWidths);
            }
          }
          for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
            var row = [];
            for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
              var _dataProvider$getCell = dataProvider.getCellData(rowIndex, cellIndex, true),
                  value = _dataProvider$getCell.value,
                  gridCell = _dataProvider$getCell.cellSourceData;
              var cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
              var pdfCell = {
                content: _this._getFormattedValue(value, cellStyle.format),
                styles: _this._getPDFCellStyles(gridCell.rowType, columns[cellIndex].alignment, cellStyle, wrapText)
              };
              if (gridCell.rowType === 'header') {
                var mergedRange = _this._tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider);
                if (mergedRange && mergedRange.rowSpan > 0) {
                  pdfCell.rowSpan = mergedRange.rowSpan + 1;
                }
                if (mergedRange && mergedRange.colSpan > 0) {
                  pdfCell.colSpan = mergedRange.colSpan + 1;
                }
                var isMergedCell = mergedCells[rowIndex] && mergedCells[rowIndex][cellIndex];
                if (!isMergedCell || pdfCell.rowSpan > 1 || pdfCell.colSpan > 1) {
                  if ((0, _type.isFunction)(customizeCell)) {
                    customizeCell({
                      gridCell: gridCell,
                      pdfCell: pdfCell
                    });
                  }
                  row.push(pdfCell);
                }
              } else if (gridCell.rowType === 'group' && !(0, _type.isDefined)(pdfCell.content) && row.length === 1) {
                var _row$0$colSpan;
                row[0].colSpan = (_row$0$colSpan = row[0].colSpan) !== null && _row$0$colSpan !== void 0 ? _row$0$colSpan : 1;
                row[0].colSpan++;
              } else {
                var _pdfCell$content;
                pdfCell.content = (_pdfCell$content = pdfCell.content) !== null && _pdfCell$content !== void 0 ? _pdfCell$content : '';
                if ((0, _type.isFunction)(customizeCell)) {
                  customizeCell({
                    gridCell: gridCell,
                    pdfCell: pdfCell
                  });
                }
                row.push(pdfCell);
              }
            }
            if (rowIndex < headerRowCount) {
              autoTableOptions.head.push(row);
            } else {
              autoTableOptions.body.push(row);
            }
          }
          jsPDFDocument.autoTable(autoTableOptions);
          ///#DEBUG
          jsPDFDocument.autoTable.__autoTableOptions = autoTableOptions;
          ///#ENDDEBUG

          resolve();
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
    _getFormattedValue: function _getFormattedValue(value, format) {
      if ((0, _type.isDefined)(format)) {
        if ((0, _type.isDate)(value)) {
          return _date.default.format(value, format);
        }
        if ((0, _type.isNumeric)(value)) {
          return _number.default.format(value, format);
        }
      }
      return value;
    },
    _getPDFCellStyles: function _getPDFCellStyles(rowType, columnAlignment, cellStyle, wrapText) {
      var cellAlignment = cellStyle.alignment,
          bold = cellStyle.bold;
      var align = rowType === 'header' ? columnAlignment : cellAlignment;
      var pdfCellStyle = {};
      if (align) {
        pdfCellStyle['halign'] = align;
      }
      if (bold && rowType !== 'header') {
        pdfCellStyle.fontStyle = 'bold';
      }
      if (wrapText) {
        pdfCellStyle.cellWidth = 'wrap';
      }
      return pdfCellStyle;
    },
    _tryGetMergeRange: function _tryGetMergeRange(rowIndex, cellIndex, mergedCells, dataProvider) {
      if (!mergedCells[rowIndex] || !mergedCells[rowIndex][cellIndex]) {
        var _dataProvider$getCell2 = dataProvider.getCellMerging(rowIndex, cellIndex),
            colspan = _dataProvider$getCell2.colspan,
            rowspan = _dataProvider$getCell2.rowspan;
        if (colspan || rowspan) {
          for (var i = rowIndex; i <= rowIndex + rowspan || 0; i++) {
            for (var j = cellIndex; j <= cellIndex + colspan || 0; j++) {
              if (!mergedCells[i]) {
                mergedCells[i] = [];
              }
              mergedCells[i][j] = true;
            }
          }
          return {
            rowSpan: rowspan,
            colSpan: colspan
          };
        }
      }
    },
    _tryGetPdfColumnWidths: function _tryGetPdfColumnWidths(autoTableWidth, columnWidths) {
      if ((0, _type.isNumeric)(autoTableWidth) && (0, _type.isDefined)(columnWidths)) {
        var tableWidth = columnWidths.reduce(function (a, b) {
          return a + b;
        }, 0);
        return columnWidths.map(function (columnWidth) {
          return autoTableWidth * columnWidth / tableWidth;
        });
      }
    },
    _setColumnWidths: function _setColumnWidths(autoTableColumnStyles, pdfColumnWidths) {
      pdfColumnWidths.forEach(function (width, index) {
        autoTableColumnStyles[index] = autoTableColumnStyles[index] || {};
        autoTableColumnStyles[index].cellWidth = width;
      });
    }
  };
  exports.Export = Export;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","../../../core/utils/extend","../../../localization/date","../../../localization/number","../../../localization/message","../../common/export_load_panel","../../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("../../../core/utils/extend"), require("../../../localization/date"), require("../../../localization/number"), require("../../../localization/message"), require("../../common/export_load_panel"), require("../../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.js.map