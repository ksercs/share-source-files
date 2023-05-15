!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/exporter/jspdf/common/rows_generator.js"], ["../../../core/utils/type","../../../localization/date","../../../localization/number","./pdf_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/exporter/jspdf/common/rows_generator.js", ["../../../core/utils/type", "../../../localization/date", "../../../localization/number", "./pdf_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.generateRowsInfo = generateRowsInfo;
  exports.getBaseTableStyle = getBaseTableStyle;
  var _type = $__require("../../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../../localization/date"));
  var _number = _interopRequireDefault($__require("../../../localization/number"));
  var _pdf_utils = $__require("./pdf_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var defaultStyles = {
    base: {
      font: {
        size: 10
      },
      borderWidth: 0.5,
      borderColor: '#979797'
    },
    header: {
      textColor: '#979797'
    },
    group: {},
    data: {},
    groupFooter: {},
    totalFooter: {}
  };
  function generateRowsInfo(doc, dataProvider, dataGrid, headerBackgroundColor) {
    var result = [];
    var rowsCount = dataProvider.getRowsCount();
    var wordWrapEnabled = !!dataGrid.option('wordWrapEnabled');
    var rtlEnabled = !!dataGrid.option('rtlEnabled');
    var columns = dataProvider.getColumns();
    var styles = dataProvider.getStyles();
    for (var rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      var rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
      var indentLevel = rowType !== 'header' ? dataProvider.getGroupLevel(rowIndex) : 0;
      var previousRow = result[rowIndex - 1];
      if (rowType === 'groupFooter' && (previousRow === null || previousRow === void 0 ? void 0 : previousRow.rowType) === 'groupFooter') {
        indentLevel = previousRow.indentLevel - 1;
      }
      result.push({
        rowType: rowType,
        indentLevel: indentLevel,
        cells: generateRowCells({
          doc: doc,
          dataProvider: dataProvider,
          rowIndex: rowIndex,
          wordWrapEnabled: wordWrapEnabled,
          columns: columns,
          styles: styles,
          rowType: rowType,
          backgroundColor: rowType === 'header' ? headerBackgroundColor : undefined,
          rtlEnabled: rtlEnabled
        }),
        rowIndex: rowIndex
      });
    }
    return result;
  }
  function generateRowCells(_ref) {
    var doc = _ref.doc,
        dataProvider = _ref.dataProvider,
        rowIndex = _ref.rowIndex,
        wordWrapEnabled = _ref.wordWrapEnabled,
        columns = _ref.columns,
        styles = _ref.styles,
        rowType = _ref.rowType,
        backgroundColor = _ref.backgroundColor,
        rtlEnabled = _ref.rtlEnabled;
    var result = [];
    for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
      var _style$alignment;
      var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
      var cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
      var style = getPdfCellStyle(columns[cellIndex], rowType, cellStyle);
      var defaultAlignment = rtlEnabled ? 'right' : 'left';
      var paddingValue = (0, _pdf_utils.toPdfUnit)(doc, 5);
      var pdfCell = {
        text: getFormattedValue(cellData.value, cellStyle.format),
        verticalAlign: 'middle',
        horizontalAlign: (_style$alignment = style.alignment) !== null && _style$alignment !== void 0 ? _style$alignment : defaultAlignment,
        wordWrapEnabled: wordWrapEnabled,
        backgroundColor: backgroundColor,
        padding: {
          top: paddingValue,
          right: paddingValue,
          bottom: paddingValue,
          left: paddingValue
        },
        _rect: {},
        _internalTextOptions: {}
      };
      if (rtlEnabled) {
        // https://github.com/parallax/jsPDF/issues/2235
        pdfCell._internalTextOptions.isInputVisual = false;
        pdfCell._internalTextOptions.isOutputVisual = true;
        pdfCell._internalTextOptions.isInputRtl = true;
        pdfCell._internalTextOptions.isOutputRtl = false;
      }
      var cellInfo = {
        gridCell: cellData.cellSourceData,
        pdfCell: _extends({}, pdfCell, style)
      };
      if (rowType === 'header') {
        var cellMerging = dataProvider.getCellMerging(rowIndex, cellIndex);
        if (cellMerging && cellMerging.rowspan > 0) {
          cellInfo.rowSpan = cellMerging.rowspan;
        }
        if (cellMerging && cellMerging.colspan > 0) {
          cellInfo.colSpan = cellMerging.colspan;
        }
      } else if (rowType === 'group') {
        var drawLeftBorderField = rtlEnabled ? 'drawRightBorder' : 'drawLeftBorder';
        var drawRightBorderField = rtlEnabled ? 'drawLeftBorder' : 'drawRightBorder';
        cellInfo.pdfCell[drawLeftBorderField] = cellIndex === 0;
        cellInfo.pdfCell[drawRightBorderField] = cellIndex === columns.length - 1;
        if (cellIndex > 0) {
          var isEmptyCellsExceptFirst = result.slice(1).reduce(function (accumulate, cellInfo) {
            return accumulate && !(0, _type.isDefined)(cellInfo.pdfCell.text);
          }, true);
          if (!(0, _type.isDefined)(cellInfo.pdfCell.text) && isEmptyCellsExceptFirst) {
            result[0].pdfCell[drawRightBorderField] = true;
            for (var i = 0; i < result.length; i++) {
              result[i].colSpan = result.length;
            }
            cellInfo.colSpan = result.length;
          }
        }
      }
      result.push(cellInfo);
    }
    return result;
  }
  function getBaseTableStyle() {
    return defaultStyles['base'];
  }
  function getPdfCellStyle(column, rowType, cellStyle) {
    var styles = _extends({}, defaultStyles['base'], defaultStyles[rowType]);
    var alignment = rowType === 'header' ? column.alignment : cellStyle.alignment;
    if (alignment) {
      styles.alignment = alignment;
    }
    if (cellStyle.bold && rowType !== 'header') {
      styles.font = _extends({}, styles.font, {
        style: 'bold'
      });
    }
    return styles;
  }
  function getFormattedValue(value, format) {
    if ((0, _type.isDefined)(format)) {
      if ((0, _type.isDate)(value)) {
        return _date.default.format(value, format);
      }
      if ((0, _type.isNumeric)(value)) {
        return _number.default.format(value, format);
      }
    }
    return value === null || value === void 0 ? void 0 : value.toString();
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","../../../localization/date","../../../localization/number","./pdf_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("../../../localization/date"), require("../../../localization/number"), require("./pdf_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rows_generator.js.map