!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/exporter/jspdf/common/pdf_utils.js"], ["../../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/exporter/jspdf/common/pdf_utils.js", ["../../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.applyRtl = applyRtl;
  exports.applyWordWrap = applyWordWrap;
  exports.calculateRowHeight = calculateRowHeight;
  exports.calculateTargetRectWidth = calculateTargetRectWidth;
  exports.calculateTextHeight = calculateTextHeight;
  exports.getPageHeight = getPageHeight;
  exports.getPageWidth = getPageWidth;
  exports.getTextDimensions = getTextDimensions;
  exports.getTextLines = getTextLines;
  exports.toPdfUnit = toPdfUnit;
  var _type = $__require("../../../core/utils/type");
  var DOTS_TEXT = '...';
  function toPdfUnit(doc, value) {
    var defaultScaleFactor = 1; // https://github.com/parallax/jsPDF/blob/master/src/jspdf.js#L3212
    var coefficient = defaultScaleFactor / doc.internal.scaleFactor;
    return value * coefficient;
  }
  function getPageWidth(doc) {
    return doc.internal.pageSize.getWidth();
  }
  function getPageHeight(doc) {
    return doc.internal.pageSize.getHeight();
  }
  function getTextLines(doc, text, font, _ref) {
    var wordWrapEnabled = _ref.wordWrapEnabled,
        targetRectWidth = _ref.targetRectWidth;
    if (wordWrapEnabled) {
      var usedFont = doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style);
      return doc.splitTextToSize(text, targetRectWidth, {
        fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize(),
        fontName: usedFont.fontName,
        fontStyle: usedFont.fontStyle
      });
    }
    var textWithoutLineBreak = text.split('\n').filter(function (ch) {
      return ch !== '';
    }).join(' ');
    if (getTextDimensions(doc, textWithoutLineBreak, font).w <= targetRectWidth) {
      return [textWithoutLineBreak];
    }
    var textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
    while (textWithoutLineBreak.length > 0 && textWidth > targetRectWidth) {
      var symbolsCountToRemove = 0;
      if (textWidth >= targetRectWidth * 2) {
        symbolsCountToRemove = textWithoutLineBreak.length / 2;
      }
      if (symbolsCountToRemove < 1) {
        symbolsCountToRemove = 1;
      }
      textWithoutLineBreak = textWithoutLineBreak.substring(0, textWithoutLineBreak.length - symbolsCountToRemove);
      textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
    }
    return [textWithoutLineBreak + DOTS_TEXT];
  }
  function calculateTargetRectWidth(columnWidth, padding) {
    var width = columnWidth - (padding.left + padding.right);
    return width >= 0 ? width : 0;
  }
  function getTextDimensions(doc, text, font) {
    return doc.getTextDimensions(text, {
      font: doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style),
      fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
    });
  }
  function calculateTextHeight(doc, text, font, _ref2) {
    var wordWrapEnabled = _ref2.wordWrapEnabled,
        targetRectWidth = _ref2.targetRectWidth;
    var heightOfOneLine = getTextDimensions(doc, text, font).h;
    var linesCount = getTextLines(doc, text, font, {
      wordWrapEnabled: wordWrapEnabled,
      targetRectWidth: targetRectWidth
    }).length;
    return heightOfOneLine * linesCount * doc.getLineHeightFactor();
  }
  function calculateRowHeight(doc, cells, columnWidths) {
    if (cells.length !== columnWidths.length) {
      throw 'the cells count must be equal to the count of the columns';
    }
    var rowHeight = 0;
    for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      if ((0, _type.isDefined)(cells[cellIndex].rowSpan)) {
        // height will be computed at the recalculateHeightForMergedRows step
        continue;
      }
      var cellText = cells[cellIndex].pdfCell.text;
      var cellPadding = cells[cellIndex].pdfCell.padding;
      var font = cells[cellIndex].pdfCell.font;
      var wordWrapEnabled = cells[cellIndex].pdfCell.wordWrapEnabled;
      var columnWidth = columnWidths[cellIndex];
      var targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);
      if ((0, _type.isDefined)(cellText)) {
        var textHeight = cellText !== '' ? calculateTextHeight(doc, cellText, font, {
          wordWrapEnabled: wordWrapEnabled,
          targetRectWidth: targetRectWidth
        }) : 0;
        var cellHeight = textHeight + cellPadding.top + cellPadding.bottom;
        if (rowHeight < cellHeight) {
          rowHeight = cellHeight;
        }
      }
    }
    return rowHeight;
  }
  function applyWordWrap(doc, rowsInfo) {
    rowsInfo.forEach(function (row) {
      row.cells.forEach(function (_ref3) {
        var pdfCell = _ref3.pdfCell;
        if ((0, _type.isDefined)(pdfCell.text)) {
          var lines = getTextLines(doc, pdfCell.text, pdfCell.font, {
            wordWrapEnabled: pdfCell.wordWrapEnabled,
            targetRectWidth: calculateTargetRectWidth(pdfCell._rect.w, pdfCell.padding)
          });
          pdfCell.text = lines.join('\n');
        }
      });
    });
  }
  function applyRtl(doc, rectsByPages, options) {
    rectsByPages.forEach(function (pageRects) {
      pageRects.forEach(function (pdfCell) {
        var mirroredX = getPageWidth(doc) - (pdfCell._rect.x + pdfCell._rect.w);
        var marginDiff = options.margin.left - options.margin.right;
        pdfCell._rect.x = mirroredX + marginDiff;
      });
    });
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pdf_utils.js.map