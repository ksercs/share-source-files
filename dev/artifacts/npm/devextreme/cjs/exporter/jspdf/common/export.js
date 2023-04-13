/**
* DevExtreme (cjs/exporter/jspdf/common/export.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.Export = void 0;
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _normalizeOptions = require("./normalizeOptions");
var _row_utils = require("./row_utils");
var _height_updater = require("./height_updater");
var _rows_generator = require("./rows_generator");
var _rows_splitting = require("./rows_splitting");
var _draw_utils = require("./draw_utils");
var _pdf_utils = require("./pdf_utils");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _export_load_panel = require("../../common/export_load_panel");
var _window = require("../../../core/utils/window");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
