"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridViewModule = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var accessibility = _interopRequireWildcard(require("../../../../ui/shared/accessibility"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var BORDERS_CLASS = 'borders';
var TABLE_FIXED_CLASS = 'table-fixed';
var IMPORTANT_MARGIN_CLASS = 'important-margin';
var GRIDBASE_CONTAINER_CLASS = 'dx-gridbase-container';
var GROUP_ROW_SELECTOR = 'tr.dx-group-row';
var HIDDEN_COLUMNS_WIDTH = 'adaptiveHidden';
var VIEW_NAMES = ['columnsSeparatorView', 'blockSeparatorView', 'trackerView', 'headerPanel', 'columnHeadersView', 'rowsView', 'footerView', 'columnChooserView', 'filterPanelView', 'pagerView', 'draggingHeaderView', 'contextMenuView', 'errorView', 'headerFilterView', 'filterBuilderView'];
var isPercentWidth = function isPercentWidth(width) {
  return (0, _type.isString)(width) && width.endsWith('%');
};
var isPixelWidth = function isPixelWidth(width) {
  return (0, _type.isString)(width) && width.endsWith('px');
};
var calculateFreeWidth = function calculateFreeWidth(that, widths) {
  var contentWidth = that._rowsView.contentWidth();
  var totalWidth = that._getTotalWidth(widths, contentWidth);
  return contentWidth - totalWidth;
};
var calculateFreeWidthWithCurrentMinWidth = function calculateFreeWidthWithCurrentMinWidth(that, columnIndex, currentMinWidth, widths) {
  return calculateFreeWidth(that, widths.map(function (width, index) {
    return index === columnIndex ? currentMinWidth : width;
  }));
};
var restoreFocus = function restoreFocus(focusedElement, selectionRange) {
  accessibility.hiddenFocus(focusedElement, true);
  _m_utils.default.setSelectionRange(focusedElement, selectionRange);
};
var resizingControllerMembers = {
  _initPostRenderHandlers() {
    var _this = this;
    var dataController = this._dataController;
    if (!this._refreshSizesHandler) {
      this._refreshSizesHandler = function (e) {
        dataController.changed.remove(_this._refreshSizesHandler);
        if (_this._checkSize()) {
          _this._refreshSizes(e);
        }
      };
      // TODO remove resubscribing
      dataController.changed.add(function () {
        dataController.changed.add(_this._refreshSizesHandler);
      });
    }
  },
  _refreshSizes(e) {
    var _a;
    var resizeDeferred;
    var that = this;
    var changeType = e && e.changeType;
    var isDelayed = e && e.isDelayed;
    var items = that._dataController.items();
    if (!e || changeType === 'refresh' || changeType === 'prepend' || changeType === 'append') {
      if (!isDelayed) {
        resizeDeferred = that.resize();
      }
    } else if (changeType === 'update') {
      if (((_a = e.changeTypes) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        return;
      }
      if ((items.length > 1 || e.changeTypes[0] !== 'insert') && !(items.length === 0 && e.changeTypes[0] === 'remove') && !e.needUpdateDimensions) {
        // @ts-expect-error
        resizeDeferred = new _deferred.Deferred();
        this._waitAsyncTemplates().done(function () {
          (0, _common.deferUpdate)(function () {
            return (0, _common.deferRender)(function () {
              return (0, _common.deferUpdate)(function () {
                that._setScrollerSpacing();
                that._rowsView.resize();
                resizeDeferred.resolve();
              });
            });
          });
        }).fail(resizeDeferred.reject);
      } else {
        resizeDeferred = that.resize();
      }
    }
    if (changeType && changeType !== 'updateSelection' && changeType !== 'updateFocusedRow' && changeType !== 'pageIndex' && !isDelayed) {
      (0, _deferred.when)(resizeDeferred).done(function () {
        that._setAriaLabel();
        that.fireContentReadyAction();
      });
    }
  },
  fireContentReadyAction() {
    this.component._fireContentReadyAction();
  },
  _getWidgetAriaLabel() {
    return 'dxDataGrid-ariaDataGrid';
  },
  _setAriaLabel() {
    var totalItemsCount = Math.max(0, this._dataController.totalItemsCount());
    this.component.setAria('label', _message.default.format(this._getWidgetAriaLabel(),
    // @ts-expect-error
    totalItemsCount, this.component.columnCount()), this.component.$element().children(".".concat(GRIDBASE_CONTAINER_CLASS)));
  },
  _getBestFitWidths() {
    var _a;
    var rowsView = this._rowsView;
    var columnHeadersView = this._columnHeadersView;
    var widths = rowsView.getColumnWidths();
    if (!(widths === null || widths === void 0 ? void 0 : widths.length)) {
      var headersTableElement = columnHeadersView.getTableElement();
      columnHeadersView.setTableElement((_a = rowsView.getTableElement()) === null || _a === void 0 ? void 0 : _a.children('.dx-header'));
      widths = columnHeadersView.getColumnWidths();
      columnHeadersView.setTableElement(headersTableElement);
    }
    return widths;
  },
  _setVisibleWidths(visibleColumns, widths) {
    var columnsController = this._columnsController;
    columnsController.beginUpdate();
    (0, _iterator.each)(visibleColumns, function (index, column) {
      var columnId = columnsController.getColumnId(column);
      columnsController.columnOption(columnId, 'visibleWidth', widths[index]);
    });
    columnsController.endUpdate();
  },
  _toggleBestFitModeForView(view, className, isBestFit) {
    var _this2 = this;
    if (!view || !view.isVisible()) return;
    var $rowsTables = this._rowsView.getTableElements();
    var $viewTables = view.getTableElements();
    (0, _iterator.each)($rowsTables, function (index, tableElement) {
      var $tableBody;
      var $rowsTable = (0, _renderer.default)(tableElement);
      var $viewTable = $viewTables.eq(index);
      if ($viewTable && $viewTable.length) {
        if (isBestFit) {
          $tableBody = $viewTable.children('tbody').appendTo($rowsTable);
        } else {
          $tableBody = $rowsTable.children(".".concat(className)).appendTo($viewTable);
        }
        $tableBody.toggleClass(className, isBestFit);
        $tableBody.toggleClass(_this2.addWidgetPrefix('best-fit'), isBestFit);
      }
    });
  },
  _toggleBestFitMode(isBestFit) {
    var $rowsTable = this._rowsView.getTableElement();
    var $rowsFixedTable = this._rowsView.getTableElements().eq(1);
    if (!$rowsTable) return;
    $rowsTable.css('tableLayout', isBestFit ? 'auto' : 'fixed');
    $rowsTable.children('colgroup').css('display', isBestFit ? 'none' : '');
    // NOTE T1156153: Hide group row column to get correct fixed column widths.
    (0, _iterator.each)($rowsFixedTable.find(GROUP_ROW_SELECTOR), function (idx, item) {
      (0, _renderer.default)(item).css('display', isBestFit ? 'none' : '');
    });
    $rowsFixedTable.toggleClass(this.addWidgetPrefix(TABLE_FIXED_CLASS), !isBestFit);
    this._toggleBestFitModeForView(this._columnHeadersView, 'dx-header', isBestFit);
    this._toggleBestFitModeForView(this._footerView, 'dx-footer', isBestFit);
    if (this._needStretch()) {
      $rowsTable.get(0).style.width = isBestFit ? 'auto' : '';
    }
  },
  _toggleContentMinHeight(value) {
    var scrollable = this._rowsView.getScrollable();
    var $contentElement = this._rowsView._findContentElement();
    if ((scrollable === null || scrollable === void 0 ? void 0 : scrollable.option('useNative')) === false) {
      $contentElement.css({
        minHeight: value ? _m_utils.default.getContentHeightLimit(_browser.default) : ''
      });
    }
  },
  _synchronizeColumns() {
    var _this3 = this;
    var columnsController = this._columnsController;
    var visibleColumns = columnsController.getVisibleColumns();
    var columnAutoWidth = this.option('columnAutoWidth');
    var wordWrapEnabled = this.option('wordWrapEnabled');
    var hasUndefinedColumnWidth = visibleColumns.some(function (column) {
      return !(0, _type.isDefined)(column.width);
    });
    var needBestFit = this._needBestFit();
    var hasMinWidth = false;
    var resetBestFitMode;
    var isColumnWidthsCorrected = false;
    var resultWidths = [];
    var focusedElement;
    var selectionRange;
    var normalizeWidthsByExpandColumns = function normalizeWidthsByExpandColumns() {
      var expandColumnWidth;
      (0, _iterator.each)(visibleColumns, function (index, column) {
        if (column.type === 'groupExpand') {
          expandColumnWidth = resultWidths[index];
        }
      });
      (0, _iterator.each)(visibleColumns, function (index, column) {
        if (column.type === 'groupExpand' && expandColumnWidth) {
          resultWidths[index] = expandColumnWidth;
        }
      });
    };
    !needBestFit && (0, _iterator.each)(visibleColumns, function (index, column) {
      if (column.width === 'auto') {
        needBestFit = true;
        return false;
      }
      return undefined;
    });
    (0, _iterator.each)(visibleColumns, function (index, column) {
      if (column.minWidth) {
        hasMinWidth = true;
        return false;
      }
      return undefined;
    });
    this._setVisibleWidths(visibleColumns, []);
    var $element = this.component.$element();
    if (needBestFit) {
      focusedElement = _dom_adapter.default.getActiveElement($element.get(0));
      selectionRange = _m_utils.default.getSelectionRange(focusedElement);
      this._toggleBestFitMode(true);
      resetBestFitMode = true;
    }
    this._toggleContentMinHeight(wordWrapEnabled); // T1047239
    if ($element && $element.get(0) && this._maxWidth) {
      delete this._maxWidth;
      $element[0].style.maxWidth = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferUpdate)(function () {
      if (needBestFit) {
        resultWidths = _this3._getBestFitWidths();
        (0, _iterator.each)(visibleColumns, function (index, column) {
          var columnId = columnsController.getColumnId(column);
          columnsController.columnOption(columnId, 'bestFitWidth', resultWidths[index], true);
        });
      } else if (hasMinWidth) {
        resultWidths = _this3._getBestFitWidths();
      }
      (0, _iterator.each)(visibleColumns, function (index) {
        var width = this.width;
        if (width !== 'auto') {
          if ((0, _type.isDefined)(width)) {
            resultWidths[index] = (0, _type.isNumeric)(width) || isPixelWidth(width) ? parseFloat(width) : width;
          } else if (!columnAutoWidth) {
            resultWidths[index] = undefined;
          }
        }
      });
      if (resetBestFitMode) {
        _this3._toggleBestFitMode(false);
        resetBestFitMode = false;
        if (focusedElement && focusedElement !== _dom_adapter.default.getActiveElement()) {
          var isFocusOutsideWindow = (0, _position.getBoundingRect)(focusedElement).bottom < 0;
          if (!isFocusOutsideWindow) {
            restoreFocus(focusedElement, selectionRange);
          }
        }
      }
      isColumnWidthsCorrected = _this3._correctColumnWidths(resultWidths, visibleColumns);
      if (columnAutoWidth) {
        normalizeWidthsByExpandColumns();
        if (_this3._needStretch()) {
          _this3._processStretch(resultWidths, visibleColumns);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (0, _common.deferRender)(function () {
        if (needBestFit || isColumnWidthsCorrected || hasUndefinedColumnWidth) {
          _this3._setVisibleWidths(visibleColumns, resultWidths);
        }
        if (wordWrapEnabled) {
          _this3._toggleContentMinHeight(false);
        }
      });
    });
  },
  _needBestFit() {
    return this.option('columnAutoWidth');
  },
  _needStretch() {
    return this._columnsController.getVisibleColumns().some(function (c) {
      return c.width === 'auto' && !c.command;
    });
  },
  _getAverageColumnsWidth(resultWidths) {
    var freeWidth = calculateFreeWidth(this, resultWidths);
    var columnCountWithoutWidth = resultWidths.filter(function (width) {
      return width === undefined;
    }).length;
    return freeWidth / columnCountWithoutWidth;
  },
  _correctColumnWidths(resultWidths, visibleColumns) {
    var that = this;
    var i;
    var hasPercentWidth = false;
    var hasAutoWidth = false;
    var isColumnWidthsCorrected = false;
    var $element = that.component.$element();
    var hasWidth = that._hasWidth;
    var _loop = function _loop() {
      var index = i;
      var column = visibleColumns[index];
      var isHiddenColumn = resultWidths[index] === HIDDEN_COLUMNS_WIDTH;
      var width = resultWidths[index];
      var minWidth = column.minWidth;
      if (minWidth) {
        if (width === undefined) {
          var averageColumnsWidth = that._getAverageColumnsWidth(resultWidths);
          width = averageColumnsWidth;
        } else if (isPercentWidth(width)) {
          var freeWidth = calculateFreeWidthWithCurrentMinWidth(that, index, minWidth, resultWidths);
          if (freeWidth < 0) {
            width = -1;
          }
        }
      }
      var realColumnWidth = that._getRealColumnWidth(index, resultWidths.map(function (columnWidth, columnIndex) {
        return index === columnIndex ? width : columnWidth;
      }));
      if (minWidth && !isHiddenColumn && realColumnWidth < minWidth) {
        resultWidths[index] = minWidth;
        isColumnWidthsCorrected = true;
        i = -1;
      }
      if (!(0, _type.isDefined)(column.width)) {
        hasAutoWidth = true;
      }
      if (isPercentWidth(column.width)) {
        hasPercentWidth = true;
      }
    };
    for (i = 0; i < visibleColumns.length; i++) {
      _loop();
    }
    if (!hasAutoWidth && resultWidths.length) {
      var $rowsViewElement = that._rowsView.element();
      var contentWidth = that._rowsView.contentWidth();
      var scrollbarWidth = that._rowsView.getScrollbarWidth();
      var totalWidth = that._getTotalWidth(resultWidths, contentWidth);
      if (totalWidth < contentWidth) {
        var lastColumnIndex = _m_utils.default.getLastResizableColumnIndex(visibleColumns, resultWidths);
        if (lastColumnIndex >= 0) {
          resultWidths[lastColumnIndex] = 'auto';
          isColumnWidthsCorrected = true;
          if (hasWidth === false && !hasPercentWidth) {
            var borderWidth = that.option('showBorders') ? Math.ceil((0, _size.getOuterWidth)($rowsViewElement) - (0, _size.getInnerWidth)($rowsViewElement)) : 0;
            that._maxWidth = totalWidth + scrollbarWidth + borderWidth;
            $element.css('maxWidth', that._maxWidth);
          }
        }
      }
    }
    return isColumnWidthsCorrected;
  },
  _processStretch(resultSizes, visibleColumns) {
    var groupSize = this._rowsView.contentWidth();
    var tableSize = this._getTotalWidth(resultSizes, groupSize);
    var unusedIndexes = {
      length: 0
    };
    if (!resultSizes.length) return;
    (0, _iterator.each)(visibleColumns, function (index) {
      if (this.width || resultSizes[index] === HIDDEN_COLUMNS_WIDTH) {
        unusedIndexes[index] = true;
        unusedIndexes.length++;
      }
    });
    var diff = groupSize - tableSize;
    var diffElement = Math.floor(diff / (resultSizes.length - unusedIndexes.length));
    var onePixelElementsCount = diff - diffElement * (resultSizes.length - unusedIndexes.length);
    if (diff >= 0) {
      for (var i = 0; i < resultSizes.length; i++) {
        if (unusedIndexes[i]) {
          continue;
        }
        resultSizes[i] += diffElement;
        if (onePixelElementsCount > 0) {
          if (onePixelElementsCount < 1) {
            resultSizes[i] += onePixelElementsCount;
            onePixelElementsCount = 0;
          } else {
            resultSizes[i]++;
            onePixelElementsCount--;
          }
        }
      }
    }
  },
  _getRealColumnWidth(columnIndex, columnWidths, groupWidth) {
    var ratio = 1;
    var width = columnWidths[columnIndex];
    if (!isPercentWidth(width)) {
      return parseFloat(width);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var percentTotalWidth = columnWidths.reduce(function (sum, width, index) {
      if (!isPercentWidth(width)) {
        return sum;
      }
      return sum + parseFloat(width);
    }, 0);
    var pixelTotalWidth = columnWidths.reduce(function (sum, width) {
      if (!width || width === HIDDEN_COLUMNS_WIDTH || isPercentWidth(width)) {
        return sum;
      }
      return sum + parseFloat(width);
    }, 0);
    groupWidth = groupWidth || this._rowsView.contentWidth();
    var freeSpace = groupWidth - pixelTotalWidth;
    var percentTotalWidthInPixel = percentTotalWidth * groupWidth / 100;
    if (pixelTotalWidth > 0 && percentTotalWidthInPixel + pixelTotalWidth >= groupWidth) {
      ratio = percentTotalWidthInPixel > freeSpace ? freeSpace / percentTotalWidthInPixel : 1;
    }
    return parseFloat(width) * groupWidth * ratio / 100;
  },
  _getTotalWidth(widths, groupWidth) {
    var result = 0;
    for (var i = 0; i < widths.length; i++) {
      var width = widths[i];
      if (width && width !== HIDDEN_COLUMNS_WIDTH) {
        result += this._getRealColumnWidth(i, widths, groupWidth);
      }
    }
    return Math.ceil(result);
  },
  _getGroupElement() {
    return this.component.$element().children().get(0);
  },
  updateSize(rootElement) {
    var that = this;
    var $rootElement = (0, _renderer.default)(rootElement);
    var importantMarginClass = that.addWidgetPrefix(IMPORTANT_MARGIN_CLASS);
    if (that._hasHeight === undefined && $rootElement && $rootElement.is(':visible') && (0, _size.getWidth)($rootElement)) {
      var $groupElement = $rootElement.children(".".concat(that.getWidgetContainerClass()));
      if ($groupElement.length) {
        $groupElement.detach();
      }
      that._hasHeight = !!(0, _size.getHeight)($rootElement);
      var width = (0, _size.getWidth)($rootElement);
      $rootElement.addClass(importantMarginClass);
      that._hasWidth = (0, _size.getWidth)($rootElement) === width;
      $rootElement.removeClass(importantMarginClass);
      if ($groupElement.length) {
        $groupElement.appendTo($rootElement);
      }
    }
  },
  publicMethods() {
    return ['resize', 'updateDimensions'];
  },
  _waitAsyncTemplates() {
    var _a, _b, _c;
    return (0, _deferred.when)((_a = this._columnHeadersView) === null || _a === void 0 ? void 0 : _a.waitAsyncTemplates(true), (_b = this._rowsView) === null || _b === void 0 ? void 0 : _b.waitAsyncTemplates(true), (_c = this._footerView) === null || _c === void 0 ? void 0 : _c.waitAsyncTemplates(true));
  },
  resize() {
    var _this4 = this;
    if (this.component._requireResize) {
      return;
    }
    // @ts-expect-error
    var d = new _deferred.Deferred();
    this._waitAsyncTemplates().done(function () {
      (0, _deferred.when)(_this4.updateDimensions()).done(d.resolve).fail(d.reject);
    }).fail(d.reject);
    return d.promise();
  },
  updateDimensions(checkSize) {
    var that = this;
    that._initPostRenderHandlers();
    // T335767
    if (!that._checkSize(checkSize)) {
      return;
    }
    var prevResult = that._resizeDeferred;
    // @ts-expect-error
    var result = that._resizeDeferred = new _deferred.Deferred();
    (0, _deferred.when)(prevResult).always(function () {
      (0, _common.deferRender)(function () {
        if (that._dataController.isLoaded()) {
          that._synchronizeColumns();
        }
        // IE11
        that._resetGroupElementHeight();
        (0, _common.deferUpdate)(function () {
          (0, _common.deferRender)(function () {
            (0, _common.deferUpdate)(function () {
              that._updateDimensionsCore();
            });
          });
        });
        // @ts-expect-error
      }).done(result.resolve).fail(result.reject);
    });
    return result.promise();
  },
  _resetGroupElementHeight() {
    var groupElement = this._getGroupElement();
    var scrollable = this._rowsView.getScrollable();
    if (groupElement && groupElement.style.height && (!scrollable || !scrollable.scrollTop())) {
      groupElement.style.height = '';
    }
  },
  _checkSize(checkSize) {
    var $rootElement = this.component.$element();
    var isWidgetVisible = $rootElement.is(':visible');
    var isGridSizeChanged = this._lastWidth !== (0, _size.getWidth)($rootElement) || this._lastHeight !== (0, _size.getHeight)($rootElement) || this._devicePixelRatio !== (0, _window.getWindow)().devicePixelRatio;
    return isWidgetVisible && (!checkSize || isGridSizeChanged);
  },
  _setScrollerSpacingCore() {
    var that = this;
    var vScrollbarWidth = that._rowsView.getScrollbarWidth();
    var hScrollbarWidth = that._rowsView.getScrollbarWidth(true);
    (0, _common.deferRender)(function () {
      that._columnHeadersView && that._columnHeadersView.setScrollerSpacing(vScrollbarWidth);
      that._footerView && that._footerView.setScrollerSpacing(vScrollbarWidth);
      that._rowsView.setScrollerSpacing(vScrollbarWidth, hScrollbarWidth);
    });
  },
  _setScrollerSpacing() {
    var _this5 = this;
    var scrollable = this._rowsView.getScrollable();
    // T722415, T758955
    var isNativeScrolling = this.option('scrolling.useNative') === true;
    if (!scrollable || isNativeScrolling) {
      (0, _common.deferRender)(function () {
        (0, _common.deferUpdate)(function () {
          _this5._setScrollerSpacingCore();
        });
      });
    } else {
      this._setScrollerSpacingCore();
    }
  },
  _setAriaOwns() {
    var _a, _b, _c;
    var headerTable = (_a = this._columnHeadersView) === null || _a === void 0 ? void 0 : _a.getTableElement();
    var footerTable = (_b = this._footerView) === null || _b === void 0 ? void 0 : _b.getTableElement();
    (_c = this._rowsView) === null || _c === void 0 ? void 0 : _c.setAriaOwns(headerTable === null || headerTable === void 0 ? void 0 : headerTable.attr('id'), footerTable === null || footerTable === void 0 ? void 0 : footerTable.attr('id'));
  },
  _updateDimensionsCore() {
    var _this6 = this;
    var that = this;
    var dataController = that._dataController;
    var editorFactory = that.getController('editorFactory');
    var rowsView = that._rowsView;
    var $rootElement = that.component.$element();
    var groupElement = this._getGroupElement();
    var rootElementHeight = (0, _size.getHeight)($rootElement);
    var height = that.option('height') || $rootElement.get(0).style.height;
    var isHeightSpecified = !!height && height !== 'auto';
    // eslint-disable-next-line radix
    var maxHeight = parseInt($rootElement.css('maxHeight'));
    var maxHeightHappened = maxHeight && rootElementHeight >= maxHeight;
    var isMaxHeightApplied = groupElement && groupElement.scrollHeight === groupElement.offsetHeight;
    that.updateSize($rootElement);
    (0, _common.deferRender)(function () {
      var hasHeight = that._hasHeight || !!maxHeight || isHeightSpecified;
      rowsView.hasHeight(hasHeight);
      _this6._setAriaOwns();
      // IE11
      if (maxHeightHappened && !isMaxHeightApplied) {
        (0, _renderer.default)(groupElement).css('height', maxHeight);
      }
      if (!dataController.isLoaded()) {
        rowsView.setLoading(dataController.isLoading());
        return;
      }
      (0, _common.deferUpdate)(function () {
        that._updateLastSizes($rootElement);
        that._setScrollerSpacing();
        (0, _iterator.each)(VIEW_NAMES, function (index, viewName) {
          var view = that.getView(viewName);
          if (view) {
            view.resize();
          }
        });
        editorFactory && editorFactory.resize();
      });
    });
  },
  _updateLastSizes($rootElement) {
    this._lastWidth = (0, _size.getWidth)($rootElement);
    this._lastHeight = (0, _size.getHeight)($rootElement);
    this._devicePixelRatio = (0, _window.getWindow)().devicePixelRatio;
  },
  optionChanged(args) {
    switch (args.name) {
      case 'width':
      case 'height':
        this.component._renderDimensions();
        this.resize();
      /* falls through */
      case 'renderAsync':
        args.handled = true;
        return;
      default:
        this.callBase(args);
    }
  },
  init() {
    var that = this;
    that._dataController = that.getController('data');
    that._columnsController = that.getController('columns');
    that._columnHeadersView = that.getView('columnHeadersView');
    that._footerView = that.getView('footerView');
    that._rowsView = that.getView('rowsView');
  }
};
var ResizingController = _m_modules.default.ViewController.inherit(resizingControllerMembers);
var SynchronizeScrollingController = _m_modules.default.ViewController.inherit({
  _scrollChangedHandler(views, pos, viewName) {
    for (var j = 0; j < views.length; j++) {
      if (views[j] && views[j].name !== viewName) {
        views[j].scrollTo({
          left: pos.left,
          top: pos.top
        });
      }
    }
  },
  init() {
    var views = [this.getView('columnHeadersView'), this.getView('footerView'), this.getView('rowsView')];
    for (var i = 0; i < views.length; i++) {
      var view = views[i];
      if (view) {
        view.scrollChanged.add(this._scrollChangedHandler.bind(this, views));
      }
    }
  }
});
var GridView = _m_modules.default.View.inherit({
  _endUpdateCore() {
    if (this.component._requireResize) {
      this.component._requireResize = false;
      this._resizingController.resize();
    }
  },
  init() {
    var that = this;
    that._resizingController = that.getController('resizing');
    that._dataController = that.getController('data');
  },
  getView(name) {
    return this.component._views[name];
  },
  element() {
    return this._groupElement;
  },
  optionChanged(args) {
    var that = this;
    if ((0, _type.isDefined)(that._groupElement) && args.name === 'showBorders') {
      that._groupElement.toggleClass(that.addWidgetPrefix(BORDERS_CLASS), !!args.value);
      args.handled = true;
    } else {
      that.callBase(args);
    }
  },
  _renderViews($groupElement) {
    var that = this;
    (0, _iterator.each)(VIEW_NAMES, function (index, viewName) {
      var view = that.getView(viewName);
      if (view) {
        view.render($groupElement);
      }
    });
  },
  _getTableRoleName() {
    return 'group';
  },
  render($rootElement) {
    var isFirstRender = !this._groupElement;
    var $groupElement = this._groupElement || (0, _renderer.default)('<div>').addClass(this.getWidgetContainerClass());
    $groupElement.addClass(GRIDBASE_CONTAINER_CLASS);
    $groupElement.toggleClass(this.addWidgetPrefix(BORDERS_CLASS), !!this.option('showBorders'));
    this.setAria('role', 'presentation', $rootElement);
    this.component.setAria('role', this._getTableRoleName(), $groupElement);
    this._rootElement = $rootElement || this._rootElement;
    if (isFirstRender) {
      this._groupElement = $groupElement;
      (0, _window.hasWindow)() && this.getController('resizing').updateSize($rootElement);
      $groupElement.appendTo($rootElement);
    }
    this._renderViews($groupElement);
  },
  update() {
    var that = this;
    var $rootElement = that._rootElement;
    var $groupElement = that._groupElement;
    var resizingController = that.getController('resizing');
    if ($rootElement && $groupElement) {
      resizingController.resize();
      if (that._dataController.isLoaded()) {
        that._resizingController.fireContentReadyAction();
      }
    }
  }
});
var gridViewModule = {
  defaultOptions() {
    return {
      showBorders: false,
      renderAsync: false
    };
  },
  controllers: {
    resizing: ResizingController,
    synchronizeScrolling: SynchronizeScrollingController
  },
  views: {
    gridView: GridView
  },
  VIEW_NAMES
};
exports.gridViewModule = gridViewModule;