/**
* DevExtreme (esm/__internal/grids/grid_core/virtual_columns/m_virtual_columns.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import browser from '../../../../core/utils/browser';
import { getHeight, getOuterWidth, getWidth } from '../../../../core/utils/size';
import { isDefined } from '../../../../core/utils/type';
import { hasWindow } from '../../../../core/utils/window';
import gridCoreUtils from '../m_utils';
import { createColumnsInfo } from './m_virtual_columns_core';
const DEFAULT_COLUMN_WIDTH = 50;
const baseView = Base => class BaseViewVirtualColumnsExtender extends Base {
  _needToSetCellWidths() {
    let result = super._needToSetCellWidths();
    if (!result && this._columnsController.isVirtualMode()) {
      const columns = this._columnsController.getColumns();
      result = columns.some(column => column.width === 'auto');
    }
    return result;
  }
};
const rowsView = Base => class VirtualColumnsRowsViewExtender extends baseView(Base) {
  _resizeCore() {
    // @ts-expect-error
    super._resizeCore.apply(this, arguments);
    // @ts-expect-error
    this._columnsController.resize();
  }
  _handleScroll(e) {
    const that = this;
    const scrollable = this.getScrollable();
    let {
      left
    } = e.scrollOffset;
    // @ts-expect-error
    super._handleScroll.apply(that, arguments);
    if (that.option('rtlEnabled') && scrollable) {
      left = getWidth(scrollable.$content()) - getWidth(scrollable.$element()) - left;
    }
    // @ts-expect-error
    that._columnsController.setScrollPosition(left, e.event);
  }
  _renderCore(e) {
    if (e !== null && e !== void 0 && e.virtualColumnsScrolling) {
      var _this$_columnsControl, _this$_scrollable;
      const $contentElement = this._findContentElement();
      const fixedColumns = (_this$_columnsControl = this._columnsController) === null || _this$_columnsControl === void 0 ? void 0 : _this$_columnsControl.getFixedColumns();
      const useNativeScrolling = (_this$_scrollable = this._scrollable) === null || _this$_scrollable === void 0 ? void 0 : _this$_scrollable.option('useNative');
      const legacyMode = this.option('columnFixing.legacyMode');
      if (fixedColumns !== null && fixedColumns !== void 0 && fixedColumns.length) {
        // TODO: remove the condition when legacyMode is removed
        if (legacyMode && !useNativeScrolling) {
          $contentElement.css({
            minHeight: gridCoreUtils.getContentHeightLimit(browser)
          });
        } else {
          $contentElement.css({
            minHeight: getHeight($contentElement)
          });
        }
        const resizeCompletedHandler = () => {
          this.resizeCompleted.remove(resizeCompletedHandler);
          $contentElement.css({
            minHeight: ''
          });
        };
        this.resizeCompleted.add(resizeCompletedHandler);
      }
    }
    // @ts-expect-error
    return super._renderCore.apply(this, arguments);
  }
};
const columnHeadersView = Base => class VirtualColumnsColumnHeaderViewExtender extends baseView(Base) {
  _renderCore() {
    // @ts-expect-error
    const deferred = super._renderCore.apply(this, arguments);
    if (this._columnsController.isVirtualMode()) {
      this._updateScrollLeftPosition();
    }
    return deferred;
  }
};
const getWidths = function (columns) {
  return columns.map(column => column.visibleWidth || parseFloat(column.width) || DEFAULT_COLUMN_WIDTH);
};
const columns = Base => class VirtualColumnsControllerExtender extends Base {
  init() {
    const that = this;
    // @ts-expect-error
    super.init.apply(this, arguments);
    this._resizingController = this.getController('resizing');
    that._beginPageIndex = null;
    that._endPageIndex = null;
    that._position ?? (that._position = 0);
    that._virtualVisibleColumns = {};
  }
  dispose() {
    clearTimeout(this._changedTimeout);
    // @ts-expect-error
    super.dispose.apply(this, arguments);
  }
  resetColumnsCache() {
    super.resetColumnsCache();
    this._virtualVisibleColumns = {};
  }
  getBeginPageIndex(position) {
    const visibleColumns = this.getVisibleColumns(undefined, true);
    const widths = getWidths(visibleColumns);
    let currentPosition = 0;
    for (let index = 0; index < widths.length; index++) {
      if (currentPosition >= position) {
        return Math.floor(index / this.getColumnPageSize());
      }
      currentPosition += widths[index];
    }
    return 0;
  }
  getTotalWidth() {
    const width = this.option('width');
    if (typeof width === 'number') {
      return width;
    }
    return this._resizingController._lastWidth || getOuterWidth(this.component.$element());
  }
  getEndPageIndex(position) {
    const visibleColumns = this.getVisibleColumns(undefined, true);
    const widths = getWidths(visibleColumns);
    let currentPosition = 0;
    position += this.getTotalWidth();
    for (let index = 0; index < widths.length; index++) {
      if (currentPosition >= position) {
        return Math.ceil(index / this.getColumnPageSize());
      }
      currentPosition += widths[index];
    }
    return Math.ceil(widths.length / this.getColumnPageSize());
  }
  getColumnPageSize() {
    return this.option('scrolling.columnPageSize');
  }
  _fireColumnsChanged(event) {
    const date = new Date();
    this.columnsChanged.fire({
      optionNames: {
        all: true,
        length: 1
      },
      changeTypes: {
        columns: true,
        virtualColumnsScrolling: true,
        length: 2,
        event
      }
    });
    this._renderTime = new Date() - date;
  }
  getScrollingTimeout() {
    const renderingThreshold = this.option('scrolling.columnRenderingThreshold');
    const renderAsync = this.option('scrolling.renderAsync');
    let scrollingTimeout = 0;
    if (!isDefined(renderAsync) && this._renderTime > renderingThreshold || renderAsync) {
      scrollingTimeout = this.option('scrolling.timeout');
    }
    return scrollingTimeout;
  }
  setScrollPosition(position, event) {
    const scrollingTimeout = this.getScrollingTimeout();
    if (scrollingTimeout > 0) {
      clearTimeout(this._changedTimeout);
      this._changedTimeout = setTimeout(() => {
        this._setScrollPositionCore(position, event);
      }, scrollingTimeout);
    } else {
      this._setScrollPositionCore(position, event);
    }
  }
  resize() {
    this._setScrollPositionCore(this._position);
  }
  _setScrollPositionCore(position, event) {
    const that = this;
    if (that.isVirtualMode()) {
      const beginPageIndex = that.getBeginPageIndex(position);
      const endPageIndex = that.getEndPageIndex(position);
      const needColumnsChanged = position < that._position ? that._beginPageIndex > beginPageIndex : that._endPageIndex < endPageIndex;
      that._position = position;
      if (needColumnsChanged) {
        that._beginPageIndex = beginPageIndex;
        that._endPageIndex = endPageIndex;
        that._fireColumnsChanged(event);
      }
    }
  }
  getFixedColumns(rowIndex, isBase) {
    const fixedColumns = super.getFixedColumns(rowIndex);
    if (this.isVirtualMode() && !isBase && fixedColumns.length) {
      const transparentColumnIndex = fixedColumns.map(c => c.command).indexOf('transparent');
      fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - super.getFixedColumns().length + 1;
      return fixedColumns;
    }
    return fixedColumns;
  }
  _compileVisibleColumns(rowIndex, isBase) {
    var _this$_columns;
    if (isBase || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
      return super._compileVisibleColumns(rowIndex);
    }
    if ((_this$_columns = this._columns) !== null && _this$_columns !== void 0 && _this$_columns.length && !isDefined(this._beginPageIndex) && !isDefined(this._endPageIndex)) {
      this._beginPageIndex = this.getBeginPageIndex(this._position);
      this._endPageIndex = this.getEndPageIndex(this._position);
    }
    const beginPageIndex = this._beginPageIndex;
    const endPageIndex = this._endPageIndex;
    const visibleColumnsHash = `${rowIndex}-${beginPageIndex}-${endPageIndex}`;
    if (this._virtualVisibleColumns[visibleColumnsHash]) {
      return this._virtualVisibleColumns[visibleColumnsHash];
    }
    let visibleColumns = super._compileVisibleColumns();
    const rowCount = this.getRowCount();
    const pageSize = this.getColumnPageSize();
    let startIndex = beginPageIndex * pageSize;
    let endIndex = endPageIndex * pageSize;
    const fixedColumns = this.getFixedColumns(undefined, true);
    const transparentColumnIndex = fixedColumns.map(c => c.command).indexOf('transparent');
    const beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
    let beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
    const beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
    const beginWidth = getWidths(beginColumns).reduce((a, b) => a + b, 0);
    if (!beginWidth) {
      startIndex = 0;
    }
    const endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
    let endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
    const endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
    const endWidth = getWidths(endColumns).reduce((a, b) => a + b, 0);
    if (!endWidth) {
      endIndex = visibleColumns.length;
    }
    if (rowCount > 1 && typeof rowIndex === 'number') {
      const columnsInfo = [];
      for (let i = 0; i <= rowCount; i++) {
        columnsInfo.push(super._compileVisibleColumns(i));
      }
      beginFixedColumns = createColumnsInfo(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
      endFixedColumns = createColumnsInfo(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
      visibleColumns = createColumnsInfo(columnsInfo, startIndex, endIndex)[rowIndex] || [];
    } else {
      visibleColumns = visibleColumns.slice(startIndex, endIndex);
    }
    if (beginWidth) {
      visibleColumns.unshift({
        command: 'virtual',
        type: 'virtual',
        width: beginWidth
      });
      visibleColumns = beginFixedColumns.concat(visibleColumns);
    }
    if (endWidth) {
      visibleColumns.push({
        command: 'virtual',
        type: 'virtual',
        width: endWidth
      });
      visibleColumns = visibleColumns.concat(endFixedColumns);
    }
    this._virtualVisibleColumns[visibleColumnsHash] = visibleColumns;
    return visibleColumns;
  }
  getColumnIndexOffset() {
    let offset = 0;
    if (this._beginPageIndex > 0) {
      const fixedColumns = this.getFixedColumns();
      const transparentColumnIndex = fixedColumns.map(c => c.command).indexOf('transparent');
      const leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
      offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1;
    }
    return offset > 0 ? offset : 0;
  }
  isVirtualMode() {
    return hasWindow() && this.option('scrolling.columnRenderingMode') === 'virtual';
  }
};
export const virtualColumnsModule = {
  defaultOptions() {
    return {
      scrolling: {
        columnRenderingMode: 'standard',
        columnPageSize: 5,
        columnRenderingThreshold: 300
      }
    };
  },
  extenders: {
    controllers: {
      columns
    },
    views: {
      columnHeadersView,
      rowsView
    }
  }
};
