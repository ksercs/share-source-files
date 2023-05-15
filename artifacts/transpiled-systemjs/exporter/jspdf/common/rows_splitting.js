!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/jspdf/common/rows_splitting.js"], ["../../../core/utils/type","./pdf_utils","./draw_utils","./rows_spliting_utils/get_multipage_row_pages","./rows_spliting_utils/create_on_split_multipage_row"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/jspdf/common/rows_splitting.js", ["../../../core/utils/type", "./pdf_utils", "./draw_utils", "./rows_spliting_utils/get_multipage_row_pages", "./rows_spliting_utils/create_on_split_multipage_row"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.splitByPages = splitByPages;
  var _type = $__require("../../../core/utils/type");
  var _pdf_utils = $__require("./pdf_utils");
  var _draw_utils = $__require("./draw_utils");
  var _get_multipage_row_pages = $__require("./rows_spliting_utils/get_multipage_row_pages");
  var _create_on_split_multipage_row = $__require("./rows_spliting_utils/create_on_split_multipage_row");
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
  var COORDINATE_EPSILON = 0.001;
  function convertToCellsArray(rows) {
    return [].concat.apply([], rows.map(function (rowInfo) {
      return rowInfo.cells.filter(function (cell) {
        return !(0, _type.isDefined)(cell.pdfCell.isMerged);
      }).map(function (cellInfo) {
        return _extends({}, cellInfo.pdfCell._rect, {
          sourceCellInfo: _extends({}, cellInfo.pdfCell, {
            gridCell: cellInfo.gridCell
          })
        });
      });
    }));
  }
  function splitByPages(doc, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically) {
    if (rowsInfo.length === 0) {
      // Empty Table
      return [[]];
    }
    var maxBottomRight = {
      x: (0, _pdf_utils.getPageWidth)(doc) - options.margin.right,
      y: (0, _pdf_utils.getPageHeight)(doc) - options.margin.bottom
    };
    var headerRows = rowsInfo.filter(function (r) {
      return r.rowType === 'header';
    });
    var headerHeight = headerRows.reduce(function (accumulator, row) {
      return accumulator + row.height;
    }, 0);
    var verticallyPages = splitRectsByPages(convertToCellsArray(rowsInfo), options.margin.top, 'y', 'h', function (isFirstPage, currentCoordinate) {
      var additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : 0;
      return (0, _draw_utils.roundToThreeDecimals)(currentCoordinate + additionalHeight) <= (0, _draw_utils.roundToThreeDecimals)(maxBottomRight.y);
    }, function (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) {
      var args = {
        sourceRect: rect,
        topRect: {
          x: rect.x,
          y: rect.y,
          w: rect.w,
          h: currentPageMaxRectCoordinate - rect.y
        },
        bottomRect: {
          x: rect.x,
          y: currentPageMaxRectCoordinate,
          w: rect.w,
          h: rect.h - (currentPageMaxRectCoordinate - rect.y)
        }
      };
      onSeparateRectVertically(args);
      currentPageRects.push(args.topRect);
      rectsToSplit.push(args.bottomRect);
    }, (0, _create_on_split_multipage_row.createOnSplitMultiPageRow)(doc, options, headerHeight, maxBottomRight));
    if (options.repeatHeaders) {
      for (var i = 1; i < verticallyPages.length; i++) {
        verticallyPages[i].forEach(function (rect) {
          return rect.y += headerHeight;
        });
        // create deep copy of headers for each page
        var headerCells = convertToCellsArray(headerRows);
        headerCells.forEach(function (cell) {
          cell.y -= options.topLeft.y;
          // cell.x -= options.topLeft.x; don't forget to uncomment this line after fixing topleft.x issue
        });

        verticallyPages[i] = [].concat(_toConsumableArray(headerCells), _toConsumableArray(verticallyPages[i]));
      }
    }
    var pageIndex = 0;
    while (pageIndex < verticallyPages.length) {
      var horizontallyPages = splitRectsByPages(verticallyPages[pageIndex], options.margin.left, 'x', 'w', function (pagesLength, currentCoordinate) {
        return (0, _draw_utils.roundToThreeDecimals)(currentCoordinate) <= (0, _draw_utils.roundToThreeDecimals)(maxBottomRight.x);
      }, function (rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit) {
        var args = {
          sourceRect: rect,
          leftRect: {
            x: rect.x,
            y: rect.y,
            w: currentPageMaxRectCoordinate - rect.x,
            h: rect.h
          },
          rightRect: {
            x: currentPageMaxRectCoordinate,
            y: rect.y,
            w: rect.w - (currentPageMaxRectCoordinate - rect.x),
            h: rect.h
          }
        };
        onSeparateRectHorizontally(args);
        currentPageRects.push(args.leftRect);
        rectsToSplit.push(args.rightRect);
      });
      if (horizontallyPages.length > 1) {
        verticallyPages.splice.apply(verticallyPages, [pageIndex, 1].concat(_toConsumableArray(horizontallyPages)));
        pageIndex += horizontallyPages.length;
      } else {
        pageIndex += 1;
      }
    }
    return verticallyPages.map(function (rects) {
      return rects.map(function (rect) {
        return _extends({}, rect.sourceCellInfo, {
          _rect: rect
        });
      });
    });
  }
  function splitRectsByPages(rects, marginValue, coordinate, dimension, isFitToPage, onSeparateCallback, onSplitMultiPageRow) {
    var pages = [];
    var rectsToSplit = _toConsumableArray(rects);
    var isFitToPageForMultiPageRow = function isFitToPageForMultiPageRow(isFirstPage, rectHeight) {
      return isFitToPage(isFirstPage, rectHeight + marginValue);
    };
    var _loop = function _loop() {
      var currentPageMaxRectCoordinate = 0;
      var currentPageRects = rectsToSplit.filter(function (rect) {
        var currentRectCoordinate = rect[coordinate] + rect[dimension];
        if (isFitToPage(pages.length === 0, currentRectCoordinate)) {
          if (currentPageMaxRectCoordinate <= currentRectCoordinate) {
            currentPageMaxRectCoordinate = currentRectCoordinate;
          }
          return true;
        } else {
          return false;
        }
      });
      var isCurrentPageContainsOnlyHeader = (0, _get_multipage_row_pages.checkPageContainsOnlyHeader)(currentPageRects, pages.length === 0);
      var multiPageRowPages = (0, _get_multipage_row_pages.getMultiPageRowPages)(currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, onSplitMultiPageRow, isFitToPageForMultiPageRow);
      var rectsToSeparate = rectsToSplit.filter(function (rect) {
        // Check cells that have 'coordinate' less than 'currentPageMaxRectCoordinate'
        var currentRectLeft = rect[coordinate];
        var currentRectRight = rect[coordinate] + rect[dimension];
        return currentPageMaxRectCoordinate - currentRectLeft > COORDINATE_EPSILON && currentRectRight - currentPageMaxRectCoordinate > COORDINATE_EPSILON;
      });
      rectsToSeparate.forEach(function (rect) {
        onSeparateCallback(rect, currentPageMaxRectCoordinate, currentPageRects, rectsToSplit);
        var index = rectsToSplit.indexOf(rect);
        if (index !== -1) {
          rectsToSplit.splice(index, 1);
        }
      });
      currentPageRects.forEach(function (rect) {
        var index = rectsToSplit.indexOf(rect);
        if (index !== -1) {
          rectsToSplit.splice(index, 1);
        }
      });
      rectsToSplit.forEach(function (rect) {
        rect[coordinate] = (0, _type.isDefined)(currentPageMaxRectCoordinate) ? rect[coordinate] - currentPageMaxRectCoordinate + marginValue : rect[coordinate];
      });
      var firstPageContainsHeaderAndMultiPageRow = isCurrentPageContainsOnlyHeader && multiPageRowPages.length > 0;
      if (firstPageContainsHeaderAndMultiPageRow) {
        var _multiPageRowPages = _toArray(multiPageRowPages),
            firstPage = _multiPageRowPages[0],
            restOfPages = _multiPageRowPages.slice(1);
        pages.push([].concat(_toConsumableArray(currentPageRects), _toConsumableArray(firstPage)));
        pages.push.apply(pages, _toConsumableArray(restOfPages));
      } else if (currentPageRects.length > 0) {
        pages.push(currentPageRects);
        pages.push.apply(pages, _toConsumableArray(multiPageRowPages));
      } else if (multiPageRowPages.length > 0) {
        pages.push.apply(pages, _toConsumableArray(multiPageRowPages));
        pages.push(rectsToSplit);
      } else {
        pages.push(rectsToSplit);
        return "break";
      }
    };
    while (rectsToSplit.length > 0) {
      var _ret = _loop();
      if (_ret === "break") break;
    }
    return pages;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","./pdf_utils","./draw_utils","./rows_spliting_utils/get_multipage_row_pages","./rows_spliting_utils/create_on_split_multipage_row"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("./pdf_utils"), require("./draw_utils"), require("./rows_spliting_utils/get_multipage_row_pages"), require("./rows_spliting_utils/create_on_split_multipage_row"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rows_splitting.js.map