!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/jspdf/common/row_utils.js"], ["../../../core/utils/type","./pdf_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/jspdf/common/row_utils.js", ["../../../core/utils/type", "./pdf_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.applyBordersConfig = applyBordersConfig;
  exports.applyColSpans = applyColSpans;
  exports.applyRowSpans = applyRowSpans;
  exports.calculateCoordinates = calculateCoordinates;
  exports.calculateHeights = calculateHeights;
  exports.calculateTableSize = calculateTableSize;
  exports.initializeCellsWidth = initializeCellsWidth;
  exports.resizeFirstColumnByIndentLevel = resizeFirstColumnByIndentLevel;
  var _type = $__require("../../../core/utils/type");
  var _pdf_utils = $__require("./pdf_utils");
  var getSum = function getSum(a, b) {
    return a + b;
  };
  function calculateColumnWidths(doc, dataProvider, topLeftX, margin, customerColumnWidths) {
    var DEFAULT_WIDTH = 150;
    var resultWidths = dataProvider.getColumnsWidths().map(function (width) {
      return (0, _pdf_utils.toPdfUnit)(doc, width !== null && width !== void 0 ? width : DEFAULT_WIDTH);
    });
    var totalAutoColumnsWidth = resultWidths.filter(function (width, index) {
      return !(0, _type.isDefined)(customerColumnWidths[index]);
    }).reduce(getSum, 0);
    var totalCustomerColumnsWidth = customerColumnWidths.filter(function (width) {
      return (0, _type.isNumeric)(width);
    }).reduce(getSum, 0);
    var availablePageWidth = getAvailablePageAreaWidth(doc, topLeftX, margin);
    var ratio = totalCustomerColumnsWidth < availablePageWidth ? (availablePageWidth - totalCustomerColumnsWidth) / totalAutoColumnsWidth : 1;
    return resultWidths.map(function (width, index) {
      var _customerColumnWidths;
      return (_customerColumnWidths = customerColumnWidths[index]) !== null && _customerColumnWidths !== void 0 ? _customerColumnWidths : width * ratio;
    });
  }
  function getAvailablePageAreaWidth(doc, topLeftX, margin) {
    return (0, _pdf_utils.getPageWidth)(doc) - topLeftX - margin.left - margin.right;
  }
  function initializeCellsWidth(doc, dataProvider, rows, options) {
    var columnWidths = calculateColumnWidths(doc, dataProvider, options.topLeft.x, options.margin, options.columnWidths);
    rows.forEach(function (row) {
      row.cells.forEach(function (_ref, index) {
        var gridCell = _ref.gridCell,
            pdfCell = _ref.pdfCell;
        pdfCell._rect.w = columnWidths[index];
      });
    });
  }
  function calculateHeights(doc, rows, options) {
    rows.forEach(function (row) {
      var pdfCells = row.cells.map(function (c) {
        return c.pdfCell;
      });
      var customerHeight;
      if (options.onRowExporting) {
        var args = {
          rowCells: pdfCells
        };
        options.onRowExporting(args);
        if ((0, _type.isDefined)(args.rowHeight)) {
          customerHeight = args.rowHeight;
        }
      }
      row.height = (0, _type.isDefined)(customerHeight) ? customerHeight : (0, _pdf_utils.calculateRowHeight)(doc, row.cells, pdfCells.map(function (c) {
        return c._rect.w;
      }));
      pdfCells.forEach(function (cell) {
        cell._rect.h = row.height;
      });
    });
  }
  function applyColSpans(rows) {
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var row = rows[rowIndex];
      for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        var cell = row.cells[cellIndex];
        if ((0, _type.isDefined)(cell.colSpan) && !(0, _type.isDefined)(cell.pdfCell.isMerged)) {
          for (var spanIndex = 1; spanIndex <= cell.colSpan; spanIndex++) {
            var mergedCell = rows[rowIndex].cells[cellIndex + spanIndex];
            cell.pdfCell._rect.w += mergedCell.pdfCell._rect.w;
            mergedCell.pdfCell._rect.w = 0;
            mergedCell.pdfCell.isMerged = true;
          }
        }
      }
    }
  }
  function applyRowSpans(rows) {
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var row = rows[rowIndex];
      for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
        var cell = row.cells[cellIndex];
        if ((0, _type.isDefined)(cell.rowSpan) && !(0, _type.isDefined)(cell.pdfCell.isMerged)) {
          for (var spanIndex = 1; spanIndex <= cell.rowSpan; spanIndex++) {
            var mergedCell = rows[rowIndex + spanIndex].cells[cellIndex];
            cell.pdfCell._rect.h += mergedCell.pdfCell._rect.h;
            mergedCell.pdfCell._rect.h = 0;
            mergedCell.pdfCell.isMerged = true;
          }
        }
      }
    }
  }
  function resizeFirstColumnByIndentLevel(rows, options) {
    rows.forEach(function (row) {
      row.cells[0].pdfCell._rect.w -= row.indentLevel * options.indent;
    });
  }
  function applyBordersConfig(rows) {
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      var cells = rows[rowIndex].cells;
      for (var columnIndex = 0; columnIndex < cells.length; columnIndex++) {
        var pdfCell = cells[columnIndex].pdfCell;
        var leftPdfCell = columnIndex >= 1 ? cells[columnIndex - 1].pdfCell : null;
        var topPdfCell = rowIndex >= 1 ? rows[rowIndex - 1].cells[columnIndex].pdfCell : null;
        if (pdfCell.drawLeftBorder === false && !(0, _type.isDefined)(cells[columnIndex].colSpan)) {
          // TODO: Check this logic after implementing splitting to pages
          if ((0, _type.isDefined)(leftPdfCell)) {
            leftPdfCell.drawRightBorder = false;
          }
        } else if (!(0, _type.isDefined)(pdfCell.drawLeftBorder)) {
          if ((0, _type.isDefined)(leftPdfCell) && leftPdfCell.drawRightBorder === false) {
            pdfCell.drawLeftBorder = false;
          }
        }
        if (pdfCell.drawTopBorder === false) {
          if ((0, _type.isDefined)(topPdfCell)) {
            topPdfCell.drawBottomBorder = false;
          }
        } else if (!(0, _type.isDefined)(pdfCell.drawTopBorder)) {
          if ((0, _type.isDefined)(topPdfCell) && topPdfCell.drawBottomBorder === false) {
            pdfCell.drawTopBorder = false;
          }
        }
      }
    }
  }
  function calculateCoordinates(doc, rows, options) {
    var _topLeft$y;
    var topLeft = options === null || options === void 0 ? void 0 : options.topLeft;
    var margin = options === null || options === void 0 ? void 0 : options.margin;
    var y = ((_topLeft$y = topLeft === null || topLeft === void 0 ? void 0 : topLeft.y) !== null && _topLeft$y !== void 0 ? _topLeft$y : 0) + margin.top;
    rows.forEach(function (row) {
      var _topLeft$x;
      var x = ((_topLeft$x = topLeft === null || topLeft === void 0 ? void 0 : topLeft.x) !== null && _topLeft$x !== void 0 ? _topLeft$x : 0) + margin.left;
      var intend = row.indentLevel * options.indent;
      row.cells.forEach(function (cell) {
        cell.pdfCell._rect.x = x + intend;
        cell.pdfCell._rect.y = y;
        x += cell.pdfCell._rect.w;
      });
      y += row.height;
    });
  }
  function calculateTableSize(doc, cells, options) {
    var _ref2, _leftPos, _options$topLeft, _ref3, _topPos, _options$topLeft2;
    var leftPos;
    var topPos;
    var rightPos;
    var bottomPos;
    cells.forEach(function (cell) {
      if (!(0, _type.isDefined)(leftPos) || leftPos > cell._rect.x) {
        leftPos = cell._rect.x;
      }
      if (!(0, _type.isDefined)(topPos) || topPos > cell._rect.y) {
        topPos = cell._rect.y;
      }
      if (!(0, _type.isDefined)(rightPos) || rightPos < cell._rect.x + cell._rect.w) {
        rightPos = cell._rect.x + cell._rect.w;
      }
      if (!(0, _type.isDefined)(bottomPos) || bottomPos < cell._rect.y + cell._rect.h) {
        bottomPos = cell._rect.y + cell._rect.h;
      }
    });
    var x = (_ref2 = (_leftPos = leftPos) !== null && _leftPos !== void 0 ? _leftPos : options === null || options === void 0 ? void 0 : (_options$topLeft = options.topLeft) === null || _options$topLeft === void 0 ? void 0 : _options$topLeft.x) !== null && _ref2 !== void 0 ? _ref2 : 0;
    var y = (_ref3 = (_topPos = topPos) !== null && _topPos !== void 0 ? _topPos : options === null || options === void 0 ? void 0 : (_options$topLeft2 = options.topLeft) === null || _options$topLeft2 === void 0 ? void 0 : _options$topLeft2.y) !== null && _ref3 !== void 0 ? _ref3 : 0;
    var w = (0, _type.isDefined)(rightPos) ? rightPos - x : 0;
    var h = (0, _type.isDefined)(bottomPos) ? bottomPos - y : 0;
    return {
      x: x,
      y: y,
      w: w,
      h: h
    };
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","./pdf_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("./pdf_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=row_utils.js.map