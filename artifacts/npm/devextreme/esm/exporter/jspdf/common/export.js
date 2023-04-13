/**
* DevExtreme (esm/exporter/jspdf/common/export.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDefined } from '../../../core/utils/type';
import { extend } from '../../../core/utils/extend';
import { normalizeRowsInfo, normalizeBoundaryValue } from './normalizeOptions';
import { initializeCellsWidth, applyColSpans, applyRowSpans, applyBordersConfig, calculateHeights, calculateCoordinates, calculateTableSize, resizeFirstColumnByIndentLevel } from './row_utils';
import { updateRowsAndCellsHeights } from './height_updater';
import { generateRowsInfo, getBaseTableStyle } from './rows_generator';
import { splitByPages } from './rows_splitting';
import { drawCellsContent, drawCellsLines, drawGridLines, getDocumentStyles, setDocumentStyles, addNewPage } from './draw_utils';
import { applyRtl, applyWordWrap, toPdfUnit } from './pdf_utils';
import messageLocalization from '../../../localization/message';
import { ExportLoadPanel } from '../../common/export_load_panel';
import { hasWindow } from '../../../core/utils/window';
function _getFullOptions(options) {
  var {
    jsPDFDocument
  } = options;
  var fullOptions = extend({}, options);
  if (!isDefined(fullOptions.topLeft)) {
    fullOptions.topLeft = {
      x: 0,
      y: 0
    };
  }
  if (!isDefined(fullOptions.indent)) {
    fullOptions.indent = 0;
  }
  if (!isDefined(fullOptions.repeatHeaders)) {
    fullOptions.repeatHeaders = true;
  }
  if (!isDefined(fullOptions.margin)) {
    fullOptions.margin = toPdfUnit(jsPDFDocument, 40);
  }
  fullOptions.margin = normalizeBoundaryValue(fullOptions.margin);
  if (!Array.isArray(fullOptions.columnWidths)) {
    fullOptions.columnWidths = [];
  }
  if (!isDefined(fullOptions.loadPanel)) {
    fullOptions.loadPanel = {};
  }
  if (!isDefined(fullOptions.loadPanel.enabled)) {
    fullOptions.loadPanel.enabled = true;
  }
  if (!isDefined(fullOptions.loadPanel.text)) {
    fullOptions.loadPanel.text = messageLocalization.format('dxDataGrid-exporting');
  }
  return fullOptions;
}
function exportDataGrid(options) {
  var _component$_getIntern;
  var {
    jsPDFDocument,
    component,
    selectedRowsOnly,
    loadPanel
  } = options;
  var internalComponent = ((_component$_getIntern = component._getInternalInstance) === null || _component$_getIntern === void 0 ? void 0 : _component$_getIntern.call(component)) || component;
  var initialLoadPanelEnabledOption = internalComponent.option('loadPanel') && internalComponent.option('loadPanel').enabled;
  if (initialLoadPanelEnabledOption) {
    component.option('loadPanel.enabled', false);
  }
  var exportLoadPanel;
  if (loadPanel.enabled && hasWindow()) {
    var rowsView = component.getView('rowsView');
    exportLoadPanel = new ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
    exportLoadPanel.show();
  }
  var dataProvider = component.getDataProvider(selectedRowsOnly);
  return new Promise(resolve => {
    dataProvider.ready().done(() => {
      var _options$rowOptions, _options$rowOptions$h;
      // TODO: pass rowOptions: { headerStyles: { backgroundColor }, groupStyles: {...}, totalStyles: {...} }
      var rowsInfo = generateRowsInfo(jsPDFDocument, dataProvider, component, (_options$rowOptions = options.rowOptions) === null || _options$rowOptions === void 0 ? void 0 : (_options$rowOptions$h = _options$rowOptions.headerStyles) === null || _options$rowOptions$h === void 0 ? void 0 : _options$rowOptions$h.backgroundColor);
      if (options.customizeCell) {
        rowsInfo.forEach(rowInfo => rowInfo.cells.forEach(cellInfo => options.customizeCell(cellInfo)));
      }
      normalizeRowsInfo(rowsInfo);

      // computes withs of the cells depending of the fullOptions
      initializeCellsWidth(jsPDFDocument, dataProvider, rowsInfo, options);

      // apply intends for correctly set width and colSpan for grouped rows
      resizeFirstColumnByIndentLevel(rowsInfo, options);

      // apply colSpans + recalculate cellsWidth
      applyColSpans(rowsInfo);

      // set/update/initCellHeight - autocalculate by text+width+wordWrapEnabled+padding or use value from customizeCell
      calculateHeights(jsPDFDocument, rowsInfo, options);

      // apply rowSpans + recalculate cells height
      applyRowSpans(rowsInfo);

      // when we know all rowSpans we can recalculate rowsHeight
      updateRowsAndCellsHeights(jsPDFDocument, rowsInfo);

      // when we known all sizes we can calculate all coordinates
      calculateCoordinates(jsPDFDocument, rowsInfo, options); // set/init/update 'pdfCell.top/left'

      // recalculate for grouped rows
      // TODO: applyGroupIndents()

      applyBordersConfig(rowsInfo);
      applyWordWrap(jsPDFDocument, rowsInfo);

      // splitting to pages
      // ?? TODO: Does split a cell which have an attribute 'colSpan/rowSpan > 0' into two cells and place the first cell on the first page and second cell on the second page. And show initial 'text' in the both new cells ??
      // TODO: applySplitting()

      var docStyles = getDocumentStyles(jsPDFDocument);
      var rtlEnabled = !!component.option('rtlEnabled');
      var onSeparateRectHorizontally = _ref => {
        var _sourceRect$sourceCel;
        var {
          sourceRect,
          leftRect,
          rightRect
        } = _ref;
        var leftRectTextOptions = {};
        var rightRectTextOptions = {};
        var isTextNotEmpty = ((_sourceRect$sourceCel = sourceRect.sourceCellInfo.text) === null || _sourceRect$sourceCel === void 0 ? void 0 : _sourceRect$sourceCel.length) > 0;
        if (isTextNotEmpty) {
          if (rtlEnabled) {
            var isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
            var isTextRightAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || sourceRect.sourceCellInfo.horizontalAlign === 'right';
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
            var isTextLeftAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || sourceRect.sourceCellInfo.horizontalAlign === 'left';
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
      var onSeparateRectVertically = _ref2 => {
        var _sourceRect$sourceCel11;
        var {
          sourceRect,
          topRect,
          bottomRect
        } = _ref2;
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
      var rectsByPages = splitByPages(jsPDFDocument, rowsInfo, options, onSeparateRectHorizontally, onSeparateRectVertically);
      if (rtlEnabled) {
        applyRtl(jsPDFDocument, rectsByPages, options);
      }
      rectsByPages.forEach((pdfCellsInfo, index) => {
        if (index > 0) {
          addNewPage(jsPDFDocument);
        }
        drawCellsContent(jsPDFDocument, options.customDrawCell, pdfCellsInfo, docStyles);
        drawCellsLines(jsPDFDocument, pdfCellsInfo, docStyles);
        var isEmptyPdfCellsInfoSpecified = isDefined(pdfCellsInfo) && pdfCellsInfo.length === 0;
        if (isEmptyPdfCellsInfoSpecified) {
          var tableRect = calculateTableSize(jsPDFDocument, pdfCellsInfo, options); // TODO: after splitting to pages we need get 'rowsInfo' for selected table in the page
          var baseStyle = getBaseTableStyle();
          drawGridLines(jsPDFDocument, tableRect, baseStyle, docStyles);
        }
      });
      setDocumentStyles(jsPDFDocument, docStyles);
      resolve();
    }).always(() => {
      if (initialLoadPanelEnabledOption) {
        component.option('loadPanel.enabled', initialLoadPanelEnabledOption);
      }
      if (loadPanel.enabled && hasWindow()) {
        exportLoadPanel.dispose();
      }
    });
  });
}
export var Export = {
  getFullOptions: _getFullOptions,
  export: exportDataGrid
};
