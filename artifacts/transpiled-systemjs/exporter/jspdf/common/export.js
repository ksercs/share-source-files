!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/jspdf/common/export.js"], ["../../../core/utils/type","../../../core/utils/extend","./normalizeOptions","./row_utils","./height_updater","./rows_generator","./rows_splitting","./draw_utils","./pdf_utils","../../../localization/message","../../common/export_load_panel","../../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/jspdf/common/export.js", ["../../../core/utils/type", "../../../core/utils/extend", "./normalizeOptions", "./row_utils", "./height_updater", "./rows_generator", "./rows_splitting", "./draw_utils", "./pdf_utils", "../../../localization/message", "../../common/export_load_panel", "../../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Export = void 0;
  var _type = $__require("../../../core/utils/type");
  var _extend = $__require("../../../core/utils/extend");
  var _normalizeOptions = $__require("./normalizeOptions");
  var _row_utils = $__require("./row_utils");
  var _height_updater = $__require("./height_updater");
  var _rows_generator = $__require("./rows_generator");
  var _rows_splitting = $__require("./rows_splitting");
  var _draw_utils = $__require("./draw_utils");
  var _pdf_utils = $__require("./pdf_utils");
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _export_load_panel = $__require("../../common/export_load_panel");
  var _window = $__require("../../../core/utils/window");
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
  function _getFullOptions(options) {
    var jsPDFDocument = options.jsPDFDocument;
    var fullOptions = (0, _extend.extend)({}, options);
    if (!(0, _type.isDefined)(fullOptions.topLeft)) {
      fullOptions.topLeft = {
        x: 0,
        y: 0
      };
    }
    if (!(0, _type.isDefined)(fullOptions.indent)) {
      fullOptions.indent = 0;
    }
    if (!(0, _type.isDefined)(fullOptions.repeatHeaders)) {
      fullOptions.repeatHeaders = true;
    }
    if (!(0, _type.isDefined)(fullOptions.margin)) {
      fullOptions.margin = (0, _pdf_utils.toPdfUnit)(jsPDFDocument, 40);
    }
    fullOptions.margin = (0, _normalizeOptions.normalizeBoundaryValue)(fullOptions.margin);
    if (!Array.isArray(fullOptions.columnWidths)) {
      fullOptions.columnWidths = [];
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
  }
  function exportDataGrid(options) {
    var _component$_getIntern;
    var jsPDFDocument = options.jsPDFDocument,
        component = options.component,
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
    return new Promise(function (resolve) {
      dataProvider.ready().done(function () {
        var _options$rowOptions, _options$rowOptions$h;
        // TODO: pass rowOptions: { headerStyles: { backgroundColor }, groupStyles: {...}, totalStyles: {...} }
        var rowsInfo = (0, _rows_generator.generateRowsInfo)(jsPDFDocument, dataProvider, component, (_options$rowOptions = options.rowOptions) === null || _options$rowOptions === void 0 ? void 0 : (_options$rowOptions$h = _options$rowOptions.headerStyles) === null || _options$rowOptions$h === void 0 ? void 0 : _options$rowOptions$h.backgroundColor);
        if (options.customizeCell) {
          rowsInfo.forEach(function (rowInfo) {
            return rowInfo.cells.forEach(function (cellInfo) {
              return options.customizeCell(cellInfo);
            });
          });
        }
        (0, _normalizeOptions.normalizeRowsInfo)(rowsInfo);

        // computes withs of the cells depending of the fullOptions
        (0, _row_utils.initializeCellsWidth)(jsPDFDocument, dataProvider, rowsInfo, options);

        // apply intends for correctly set width and colSpan for grouped rows
        (0, _row_utils.resizeFirstColumnByIndentLevel)(rowsInfo, options);

        // apply colSpans + recalculate cellsWidth
        (0, _row_utils.applyColSpans)(rowsInfo);

        // set/update/initCellHeight - autocalculate by text+width+wordWrapEnabled+padding or use value from customizeCell
        (0, _row_utils.calculateHeights)(jsPDFDocument, rowsInfo, options);

        // apply rowSpans + recalculate cells height
        (0, _row_utils.applyRowSpans)(rowsInfo);

        // when we know all rowSpans we can recalculate rowsHeight
        (0, _height_updater.updateRowsAndCellsHeights)(jsPDFDocument, rowsInfo);

        // when we known all sizes we can calculate all coordinates
        (0, _row_utils.calculateCoordinates)(jsPDFDocument, rowsInfo, options); // set/init/update 'pdfCell.top/left'

        // recalculate for grouped rows
        // TODO: applyGroupIndents()

        (0, _row_utils.applyBordersConfig)(rowsInfo);
        (0, _pdf_utils.applyWordWrap)(jsPDFDocument, rowsInfo);

        // splitting to pages
        // ?? TODO: Does split a cell which have an attribute 'colSpan/rowSpan > 0' into two cells and place the first cell on the first page and second cell on the second page. And show initial 'text' in the both new cells ??
        // TODO: applySplitting()

        var docStyles = (0, _draw_utils.getDocumentStyles)(jsPDFDocument);
        var rtlEnabled = !!component.option('rtlEnabled');
        var onSeparateRectHorizontally = function onSeparateRectHorizontally(_ref) {
          var _sourceRect$sourceCel;
          var sourceRect = _ref.sourceRect,
              leftRect = _ref.leftRect,
              rightRect = _ref.rightRect;
          var leftRectTextOptions = {};
          var rightRectTextOptions = {};
          var isTextNotEmpty = ((_sourceRect$sourceCel = sourceRect.sourceCellInfo.text) === null || _sourceRect$sourceCel === void 0 ? void 0 : _sourceRect$sourceCel.length) > 0;
          if (isTextNotEmpty) {
            if (rtlEnabled) {
              var isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
              var isTextRightAlignment = !(0, _type.isDefined)(sourceRect.sourceCellInfo.horizontalAlign) || sourceRect.sourceCellInfo.horizontalAlign === 'right';
              if (isTextWidthGreaterThanRect || !isTextRightAlignment) {
                var _sourceRect$sourceCel2, _sourceRect$sourceCel4, _sourceRect$sourceCel5;
                var rightRectTextOffset;
                var leftRectTextOffset;
                if (((_sourceRect$sourceCel2 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel2 === void 0 ? void 0 : _sourceRect$sourceCel2.horizontalAlign) === 'right') {
                  var _sourceRect$sourceCel3;
                  rightRectTextOffset = (_sourceRect$sourceCel3 = sourceRect.sourceCellInfo._textLeftOffset) !== null && _sourceRect$sourceCel3 !== void 0 ? _sourceRect$sourceCel3 : 0;
                  leftRectTextOffset = rightRectTextOffset + leftRect.w;
                } else if (((_sourceRect$sourceCel4 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel4 === void 0 ? void 0 : _sourceRect$sourceCel4.horizontalAlign) === 'center') {
                  leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w) + sourceRect.sourceCellInfo._rect.w / 2 - leftRect.w / 2;
                  rightRectTextOffset = leftRectTextOffset - rightRect.w;
                } else if (((_sourceRect$sourceCel5 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel5 === void 0 ? void 0 : _sourceRect$sourceCel5.horizontalAlign) === 'left') {
                  leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w);
                  rightRectTextOffset = leftRectTextOffset - rightRect.w;
                }
                leftRectTextOptions = _extends({}, {
                  _textLeftOffset: rightRectTextOffset
                });
                rightRectTextOptions = _extends({}, {
                  _textLeftOffset: leftRectTextOffset
                });
              } else {
                rightRectTextOptions = _extends({}, {
                  text: ''
                });
              }
            } else {
              var _isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
              var isTextLeftAlignment = !(0, _type.isDefined)(sourceRect.sourceCellInfo.horizontalAlign) || sourceRect.sourceCellInfo.horizontalAlign === 'left';
              if (_isTextWidthGreaterThanRect || !isTextLeftAlignment) {
                var _sourceRect$sourceCel6, _sourceRect$sourceCel8, _sourceRect$sourceCel10;
                var leftTextLeftOffset;
                var rightTextLeftOffset;
                if (((_sourceRect$sourceCel6 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel6 === void 0 ? void 0 : _sourceRect$sourceCel6.horizontalAlign) === 'left') {
                  var _sourceRect$sourceCel7;
                  leftTextLeftOffset = (_sourceRect$sourceCel7 = sourceRect.sourceCellInfo._textLeftOffset) !== null && _sourceRect$sourceCel7 !== void 0 ? _sourceRect$sourceCel7 : 0;
                  rightTextLeftOffset = leftTextLeftOffset - leftRect.w;
                } else if (((_sourceRect$sourceCel8 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel8 === void 0 ? void 0 : _sourceRect$sourceCel8.horizontalAlign) === 'center') {
                  var _sourceRect$sourceCel9;
                  var offset = (_sourceRect$sourceCel9 = sourceRect.sourceCellInfo._textLeftOffset) !== null && _sourceRect$sourceCel9 !== void 0 ? _sourceRect$sourceCel9 : 0;
                  leftTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (leftRect.x + leftRect.w / 2);
                  rightTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (rightRect.x + rightRect.w / 2);
                } else if (((_sourceRect$sourceCel10 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel10 === void 0 ? void 0 : _sourceRect$sourceCel10.horizontalAlign) === 'right') {
                  leftTextLeftOffset = sourceRect.x + sourceRect.w - (leftRect.x + leftRect.w);
                  rightTextLeftOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w);
                }
                leftRectTextOptions = _extends({}, {
                  _textLeftOffset: leftTextLeftOffset
                });
                rightRectTextOptions = _extends({}, {
                  _textLeftOffset: rightTextLeftOffset
                });
              } else {
                rightRectTextOptions = _extends({}, {
                  text: ''
                });
              }
            }
          }
          leftRect.sourceCellInfo = _extends({}, sourceRect.sourceCellInfo, {
            debugSourceCellInfo: sourceRect.sourceCellInfo
          }, leftRectTextOptions);
          rightRect.sourceCellInfo = _extends({}, sourceRect.sourceCellInfo, {
            debugSourceCellInfo: sourceRect.sourceCellInfo
          }, rightRectTextOptions);
        };
        var onSeparateRectVertically = function onSeparateRectVertically(_ref2) {
          var _sourceRect$sourceCel11;
          var sourceRect = _ref2.sourceRect,
              topRect = _ref2.topRect,
              bottomRect = _ref2.bottomRect;
          var topRectTextOptions = {};
          var bottomRectTextOptions = {};
          var isTextNotEmpty = ((_sourceRect$sourceCel11 = sourceRect.sourceCellInfo.text) === null || _sourceRect$sourceCel11 === void 0 ? void 0 : _sourceRect$sourceCel11.length) > 0;
          if (isTextNotEmpty) {
            var _sourceRect$sourceCel12;
            var isTextHeightGreaterThanRect = jsPDFDocument.getTextDimensions(sourceRect.sourceCellInfo.text).h > topRect.h;
            var isTextTopAlignment = ((_sourceRect$sourceCel12 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel12 === void 0 ? void 0 : _sourceRect$sourceCel12.verticalAlign) === 'top';
            if (isTextHeightGreaterThanRect || !isTextTopAlignment) {
              var _sourceRect$sourceCel13, _sourceRect$sourceCel15, _sourceRect$sourceCel17;
              var topTextTopOffset;
              var bottomTextTopOffset;
              if (((_sourceRect$sourceCel13 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel13 === void 0 ? void 0 : _sourceRect$sourceCel13.verticalAlign) === 'top') {
                var _sourceRect$sourceCel14;
                topTextTopOffset = (_sourceRect$sourceCel14 = sourceRect.sourceCellInfo._textTopOffset) !== null && _sourceRect$sourceCel14 !== void 0 ? _sourceRect$sourceCel14 : 0;
                bottomTextTopOffset = topTextTopOffset - topRect.h;
              } else if (((_sourceRect$sourceCel15 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel15 === void 0 ? void 0 : _sourceRect$sourceCel15.verticalAlign) === 'middle') {
                var _sourceRect$sourceCel16;
                var offset = (_sourceRect$sourceCel16 = sourceRect.sourceCellInfo._textTopOffset) !== null && _sourceRect$sourceCel16 !== void 0 ? _sourceRect$sourceCel16 : 0;
                topTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (topRect.y + topRect.h / 2);
                bottomTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (bottomRect.y + bottomRect.h / 2);
              } else if (((_sourceRect$sourceCel17 = sourceRect.sourceCellInfo) === null || _sourceRect$sourceCel17 === void 0 ? void 0 : _sourceRect$sourceCel17.verticalAlign) === 'bottom') {
                topTextTopOffset = sourceRect.y + sourceRect.h - (topRect.y + topRect.h);
                bottomTextTopOffset = sourceRect.y + sourceRect.h - (bottomRect.y + bottomRect.h);
              }
              topRectTextOptions = _extends({}, {
                _textTopOffset: topTextTopOffset
              });
              bottomRectTextOptions = _extends({}, {
                _textTopOffset: bottomTextTopOffset
              });
            } else {
              bottomRectTextOptions = _extends({}, {
                text: ''
              });
            }
          }
          topRect.sourceCellInfo = _extends({}, sourceRect.sourceCellInfo, {
            debugSourceCellInfo: sourceRect.sourceCellInfo
          }, topRectTextOptions);
          bottomRect.sourceCellInfo = _extends({}, sourceRect.sourceCellInfo, {
            debugSourceCellInfo: sourceRect.sourceCellInfo
          }, bottomRectTextOptions);
        };
        var rectsByPages = (0, _rows_splitting.splitByPages)(jsPDFDocument, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically);
        if (rtlEnabled) {
          (0, _pdf_utils.applyRtl)(jsPDFDocument, rectsByPages, options);
        }
        rectsByPages.forEach(function (pdfCellsInfo, index) {
          if (index > 0) {
            (0, _draw_utils.addNewPage)(jsPDFDocument);
          }
          (0, _draw_utils.drawCellsContent)(jsPDFDocument, options.customDrawCell, pdfCellsInfo, docStyles);
          (0, _draw_utils.drawCellsLines)(jsPDFDocument, pdfCellsInfo, docStyles);
          var isEmptyPdfCellsInfoSpecified = (0, _type.isDefined)(pdfCellsInfo) && pdfCellsInfo.length === 0;
          if (isEmptyPdfCellsInfoSpecified) {
            var tableRect = (0, _row_utils.calculateTableSize)(jsPDFDocument, pdfCellsInfo, options); // TODO: after splitting to pages we need get 'rowsInfo' for selected table in the page
            var baseStyle = (0, _rows_generator.getBaseTableStyle)();
            (0, _draw_utils.drawGridLines)(jsPDFDocument, tableRect, baseStyle, docStyles);
          }
        });
        (0, _draw_utils.setDocumentStyles)(jsPDFDocument, docStyles);
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
  }
  var Export = {
    getFullOptions: _getFullOptions,
    export: exportDataGrid
  };
  exports.Export = Export;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","../../../core/utils/extend","./normalizeOptions","./row_utils","./height_updater","./rows_generator","./rows_splitting","./draw_utils","./pdf_utils","../../../localization/message","../../common/export_load_panel","../../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("../../../core/utils/extend"), require("./normalizeOptions"), require("./row_utils"), require("./height_updater"), require("./rows_generator"), require("./rows_splitting"), require("./draw_utils"), require("./pdf_utils"), require("../../../localization/message"), require("../../common/export_load_panel"), require("../../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.js.map