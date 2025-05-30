/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_virtual_scrolling.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import domAdapter from '../../../core/dom_adapter';
import { isDefined } from '../../../core/utils/type';
import { getWindow } from '../../../core/utils/window';
import eventsEngine from '../../../events/core/events_engine';
import { addNamespace } from '../../../events/utils/index';
var DEFAULT_CELL_HEIGHT = 50;
var MIN_CELL_WIDTH = 1;
var MIN_SCROLL_OFFSET = 10;
var VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT = 15;
var DOCUMENT_SCROLL_EVENT_NAMESPACE = addNamespace('scroll', 'dxSchedulerVirtualScrolling');
var scrollingOrientations = {
  vertical: 'vertical',
  horizontal: 'horizontal',
  both: 'both',
  none: 'none'
};
var DefaultScrollingOrientation = scrollingOrientations.both;
export class VirtualScrollingDispatcher {
  constructor(options) {
    this.options = options;
    if (options) {
      this._rowHeight = this.getCellHeight();
      this._cellWidth = this.getCellWidth();
      this._createVirtualScrollingBase();
    }
  }
  get isRTL() {
    return this.options.isRTL();
  }
  get verticalVirtualScrolling() {
    return this._verticalVirtualScrolling;
  }
  set verticalVirtualScrolling(value) {
    this._verticalVirtualScrolling = value;
  }
  get horizontalVirtualScrolling() {
    return this._horizontalVirtualScrolling;
  }
  set horizontalVirtualScrolling(value) {
    this._horizontalVirtualScrolling = value;
  }
  get document() {
    return domAdapter.getDocument();
  }
  get height() {
    return this.options.getSchedulerHeight();
  }
  get width() {
    return this.options.getSchedulerWidth();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(value) {
    this._rowHeight = value;
  }
  get outlineCount() {
    return this.options.getScrolling().outlineCount;
  }
  get cellWidth() {
    return this._cellWidth;
  }
  set cellWidth(value) {
    this._cellWidth = value;
  }
  get viewportWidth() {
    var width = this.width && this.options.getViewWidth();
    return width > 0 ? width : this.options.getWindowWidth();
  }
  get viewportHeight() {
    var height = this.height && this.options.getViewHeight();
    return height > 0 ? height : this.options.getWindowHeight();
  }
  get cellCountInsideTopVirtualRow() {
    var _a;
    return ((_a = this.verticalScrollingState) === null || _a === void 0 ? void 0 : _a.virtualItemCountBefore) || 0;
  }
  get cellCountInsideLeftVirtualCell() {
    var _a;
    return ((_a = this.horizontalScrollingState) === null || _a === void 0 ? void 0 : _a.virtualItemCountBefore) || 0;
  }
  get cellCountInsideRightVirtualCell() {
    var _a;
    return ((_a = this.horizontalScrollingState) === null || _a === void 0 ? void 0 : _a.virtualItemCountAfter) || 0;
  }
  get topVirtualRowsCount() {
    return this.cellCountInsideTopVirtualRow > 0 ? 1 : 0;
  }
  get leftVirtualCellsCount() {
    var virtualItemsCount = !this.isRTL ? this.cellCountInsideLeftVirtualCell : this.cellCountInsideRightVirtualCell;
    return virtualItemsCount > 0 ? 1 : 0;
  }
  get virtualRowOffset() {
    var _a;
    return ((_a = this.verticalScrollingState) === null || _a === void 0 ? void 0 : _a.virtualItemSizeBefore) || 0;
  }
  get virtualCellOffset() {
    var _a;
    return ((_a = this.horizontalScrollingState) === null || _a === void 0 ? void 0 : _a.virtualItemSizeBefore) || 0;
  }
  get scrollingState() {
    var _a, _b;
    return {
      vertical: (_a = this.verticalVirtualScrolling) === null || _a === void 0 ? void 0 : _a.state,
      horizontal: (_b = this.horizontalVirtualScrolling) === null || _b === void 0 ? void 0 : _b.state
    };
  }
  get verticalScrollingState() {
    return this.scrollingState.vertical;
  }
  get horizontalScrollingState() {
    return this.scrollingState.horizontal;
  }
  get scrollingOrientation() {
    var scrolling = this.options.getScrolling();
    if (scrolling.mode === 'standard') {
      return scrollingOrientations.none;
    }
    return scrolling.orientation || DefaultScrollingOrientation;
  }
  get verticalScrollingAllowed() {
    return this.scrollingOrientation === scrollingOrientations.vertical || this.scrollingOrientation === scrollingOrientations.both;
  }
  get horizontalScrollingAllowed() {
    return this.scrollingOrientation === scrollingOrientations.horizontal || this.scrollingOrientation === scrollingOrientations.both;
  }
  setViewOptions(options) {
    this.options = options;
    if (this.verticalVirtualScrolling) {
      this.verticalVirtualScrolling.options = options;
      this.verticalVirtualScrolling.itemSize = this.rowHeight;
      this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
    }
    if (this.horizontalVirtualScrolling) {
      this.horizontalVirtualScrolling.options = options;
      this.verticalVirtualScrolling.itemSize = this.cellWidth;
      this.verticalVirtualScrolling.viewportSize = this.viewportWidth;
    }
  }
  getRenderState() {
    var _a, _b;
    var verticalRenderState = ((_a = this.verticalVirtualScrolling) === null || _a === void 0 ? void 0 : _a.getRenderState()) || {};
    var horizontalRenderState = ((_b = this.horizontalVirtualScrolling) === null || _b === void 0 ? void 0 : _b.getRenderState()) || {};
    return _extends(_extends({}, verticalRenderState), horizontalRenderState);
  }
  getCellHeight() {
    var cellHeight = this.options.getCellHeight();
    var result = cellHeight > 0 ? cellHeight : DEFAULT_CELL_HEIGHT;
    return Math.floor(result);
  }
  getCellWidth() {
    var cellWidth = this.options.getCellWidth();
    var minCellWidth = this.options.getCellMinWidth();
    // TODO: Remove this after CSS refactoring
    if (!cellWidth || cellWidth < minCellWidth) {
      cellWidth = minCellWidth;
    }
    var result = cellWidth > 0 ? cellWidth : MIN_CELL_WIDTH;
    return Math.floor(result);
  }
  calculateCoordinatesByDataAndPosition(cellData, position, date, isCalculateTime, isVerticalDirectionView) {
    var {
      rowIndex,
      columnIndex
    } = position;
    var {
      startDate,
      endDate,
      allDay
    } = cellData;
    var timeToScroll = date.getTime();
    var cellStartTime = startDate.getTime();
    var cellEndTime = endDate.getTime();
    var scrollInCell = allDay || !isCalculateTime ? 0 : (timeToScroll - cellStartTime) / (cellEndTime - cellStartTime);
    var cellWidth = this.getCellWidth();
    var rowHeight = this.getCellHeight();
    var top = isVerticalDirectionView ? (rowIndex + scrollInCell) * rowHeight : rowIndex * rowHeight;
    var left = isVerticalDirectionView ? columnIndex * cellWidth : (columnIndex + scrollInCell) * cellWidth;
    if (this.isRTL) {
      left = this.options.getScrollableOuterWidth() - left;
    }
    return {
      top,
      left
    };
  }
  dispose() {
    if (this._onScrollHandler) {
      eventsEngine.off(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
    }
  }
  createVirtualScrolling() {
    var isVerticalVirtualScrollingCreated = !!this.verticalVirtualScrolling;
    var isHorizontalVirtualScrollingCreated = !!this.horizontalVirtualScrolling;
    if (this.verticalScrollingAllowed !== isVerticalVirtualScrollingCreated || this.horizontalScrollingAllowed !== isHorizontalVirtualScrollingCreated) {
      this._rowHeight = this.getCellHeight();
      this._cellWidth = this.getCellWidth();
      this._createVirtualScrollingBase();
    }
  }
  _createVirtualScrollingBase() {
    if (this.verticalScrollingAllowed) {
      this.verticalVirtualScrolling = new VerticalVirtualScrolling(_extends(_extends({}, this.options), {
        viewportHeight: this.viewportHeight,
        rowHeight: this.rowHeight,
        outlineCount: this.outlineCount
      }));
    }
    if (this.horizontalScrollingAllowed) {
      this.horizontalVirtualScrolling = new HorizontalVirtualScrolling(_extends(_extends({}, this.options), {
        viewportWidth: this.viewportWidth,
        cellWidth: this.cellWidth,
        outlineCount: this.outlineCount
      }));
    }
  }
  isAttachWindowScrollEvent() {
    return (this.horizontalScrollingAllowed || this.verticalScrollingAllowed) && !this.height;
  }
  attachScrollableEvents() {
    if (this.isAttachWindowScrollEvent()) {
      this._attachWindowScroll();
    }
  }
  _attachWindowScroll() {
    var window = getWindow();
    this._onScrollHandler = this.options.createAction(() => {
      var {
        scrollX,
        scrollY
      } = window;
      if (scrollX >= MIN_SCROLL_OFFSET || scrollY >= MIN_SCROLL_OFFSET) {
        this.handleOnScrollEvent({
          left: scrollX,
          top: scrollY
        });
      }
    });
    eventsEngine.on(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
  }
  handleOnScrollEvent(scrollPosition) {
    var _a, _b, _c, _d;
    if (scrollPosition) {
      var {
        left,
        top
      } = scrollPosition;
      var verticalStateChanged = isDefined(top) && ((_a = this.verticalVirtualScrolling) === null || _a === void 0 ? void 0 : _a.updateState(top));
      var horizontalStateChanged = isDefined(left) && ((_b = this.horizontalVirtualScrolling) === null || _b === void 0 ? void 0 : _b.updateState(left));
      if (verticalStateChanged || horizontalStateChanged) {
        (_d = (_c = this.options).updateRender) === null || _d === void 0 ? void 0 : _d.call(_c);
      }
    }
  }
  updateDimensions(isForce) {
    var _a, _b;
    var cellHeight = this.getCellHeight();
    var needUpdateVertical = this.verticalScrollingAllowed && cellHeight !== this.rowHeight;
    if ((needUpdateVertical || isForce) && this.verticalVirtualScrolling) {
      this.rowHeight = cellHeight;
      this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
      this.verticalVirtualScrolling.reinitState(cellHeight, isForce);
    }
    var cellWidth = this.getCellWidth();
    var needUpdateHorizontal = this.horizontalScrollingAllowed && cellWidth !== this.cellWidth;
    if ((needUpdateHorizontal || isForce) && this.horizontalVirtualScrolling) {
      this.cellWidth = cellWidth;
      this.horizontalVirtualScrolling.viewportSize = this.viewportWidth;
      this.horizontalVirtualScrolling.reinitState(cellWidth, isForce);
    }
    if (needUpdateVertical || needUpdateHorizontal) {
      (_b = (_a = this.options).updateGrid) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
  }
}
class VirtualScrollingBase {
  constructor(options) {
    this.options = options;
    this._state = this.defaultState;
    this.viewportSize = this.options.viewportSize;
    this._itemSize = this.options.itemSize;
    this._position = -1;
    this._itemSizeChanged = false;
    this.updateState(0);
  }
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSizeChanged = this._itemSize !== value;
    this._itemSize = value;
  }
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
  get startIndex() {
    return this.state.startIndex;
  }
  get pageSize() {
    return Math.ceil(this.viewportSize / this.itemSize);
  }
  get outlineCount() {
    return isDefined(this.options.outlineCount) ? this.options.outlineCount : Math.floor(this.pageSize / 2);
  }
  get groupCount() {
    return this.options.getGroupCount();
  }
  get isVerticalGrouping() {
    return this.options.isVerticalGrouping();
  }
  get defaultState() {
    return {
      prevPosition: 0,
      startIndex: -1,
      itemCount: 0,
      virtualItemCountBefore: 0,
      virtualItemCountAfter: 0,
      outlineCountBefore: 0,
      outlineCountAfter: 0,
      virtualItemSizeBefore: 0,
      virtualItemSizeAfter: 0,
      outlineSizeBefore: 0,
      outlineSizeAfter: 0
    };
  }
  get maxScrollPosition() {
    return this.getTotalItemCount() * this.itemSize - this.viewportSize;
  }
  get position() {
    return this._position;
  }
  set position(value) {
    this._position = value;
  }
  needUpdateState(position) {
    var {
      prevPosition,
      startIndex
    } = this.state;
    var isFirstInitialization = startIndex < 0;
    if (isFirstInitialization) {
      return true;
    }
    var isStartIndexChanged = false;
    if (this._validateAndSavePosition(position)) {
      if (position === 0 || position === this.maxScrollPosition) {
        return true;
      }
      var currentPosition = prevPosition;
      var currentItemsCount = Math.floor(currentPosition / this.itemSize);
      var itemsCount = Math.floor(position / this.itemSize);
      isStartIndexChanged = Math.abs(currentItemsCount - itemsCount) >= this.outlineCount;
    }
    return isStartIndexChanged;
  }
  _validateAndSavePosition(position) {
    if (!isDefined(position)) {
      return false;
    }
    var result = this.position !== position;
    this.position = position;
    return result;
  }
  _correctPosition(position) {
    return position >= 0 ? Math.min(position, this.maxScrollPosition) : -1;
  }
  updateState(position, isForce) {
    position = this._correctPosition(position);
    if (!this.needUpdateState(position) && !isForce) {
      return false;
    }
    var itemsInfoBefore = this._calcItemInfoBefore(position);
    var itemsDeltaBefore = this._calcItemDeltaBefore(itemsInfoBefore);
    var {
      outlineCountAfter,
      virtualItemCountAfter,
      itemCountWithAfter
    } = this._calcItemInfoAfter(itemsDeltaBefore);
    var {
      virtualItemCountBefore,
      outlineCountBefore
    } = itemsInfoBefore;
    var itemCount = outlineCountBefore + itemCountWithAfter + outlineCountAfter;
    var itemCountBefore = Math.floor(position / this.itemSize);
    this.state.prevPosition = itemCountBefore * this.itemSize;
    this.state.startIndex = itemCountBefore - outlineCountBefore;
    this.state.virtualItemCountBefore = virtualItemCountBefore;
    this.state.outlineCountBefore = outlineCountBefore;
    this.state.itemCount = itemCount;
    this.state.outlineCountAfter = outlineCountAfter;
    this.state.virtualItemCountAfter = virtualItemCountAfter;
    this._updateStateCore();
    return true;
  }
  reinitState(itemSize, isForceUpdate) {
    var {
      position
    } = this;
    this.itemSize = itemSize;
    this.updateState(0, isForceUpdate);
    if (position > 0) {
      this.updateState(position, isForceUpdate);
    }
  }
  _calcItemInfoBefore(position) {
    var virtualItemCountBefore = Math.floor(position / this.itemSize);
    var outlineCountBefore = Math.min(virtualItemCountBefore, this.outlineCount);
    virtualItemCountBefore -= outlineCountBefore;
    return {
      virtualItemCountBefore,
      outlineCountBefore
    };
  }
  _calcItemDeltaBefore(itemInfoBefore) {
    var {
      virtualItemCountBefore,
      outlineCountBefore
    } = itemInfoBefore;
    var totalItemCount = this.getTotalItemCount();
    return totalItemCount - virtualItemCountBefore - outlineCountBefore;
  }
  getTotalItemCount() {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'getTotalItemCount method should be implemented';
  }
  getRenderState() {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'getRenderState method should be implemented';
  }
  _calcItemInfoAfter(itemsDeltaBefore) {
    var itemCountWithAfter = itemsDeltaBefore >= this.pageSize ? this.pageSize : itemsDeltaBefore;
    var virtualItemCountAfter = itemsDeltaBefore - itemCountWithAfter;
    var outlineCountAfter = virtualItemCountAfter > 0 ? Math.min(virtualItemCountAfter, this.outlineCount) : 0;
    if (virtualItemCountAfter > 0) {
      virtualItemCountAfter -= outlineCountAfter;
    }
    return {
      virtualItemCountAfter,
      outlineCountAfter,
      itemCountWithAfter
    };
  }
  _updateStateCore() {
    var {
      state
    } = this;
    var {
      virtualItemCountBefore
    } = state;
    var {
      virtualItemCountAfter
    } = state;
    var {
      outlineCountBefore
    } = state;
    var {
      outlineCountAfter
    } = state;
    var prevVirtualItemSizeBefore = state.virtualItemSizeBefore;
    var prevVirtualItemSizeAfter = state.virtualItemSizeAfter;
    var prevOutlineSizeBefore = state.outlineSizeBefore;
    var prevOutlineSizeAfter = state.outlineSizeAfter;
    var virtualItemSizeBefore = this.itemSize * virtualItemCountBefore;
    var virtualItemSizeAfter = this.itemSize * virtualItemCountAfter;
    var outlineSizeBefore = this.itemSize * outlineCountBefore;
    var outlineSizeAfter = this.itemSize * outlineCountAfter;
    var prevVirtualSizeBefore = prevVirtualItemSizeBefore + prevOutlineSizeBefore;
    var virtualSizeBefore = virtualItemSizeBefore + outlineSizeBefore;
    var prevVirtualSizeAfter = prevVirtualItemSizeAfter + prevOutlineSizeAfter;
    var virtualSizeAfter = virtualItemSizeAfter + outlineSizeAfter;
    var isAppend = prevVirtualSizeBefore < virtualSizeBefore;
    var isPrepend = prevVirtualSizeAfter < virtualSizeAfter;
    var needAddItems = this._itemSizeChanged || isAppend || isPrepend;
    if (needAddItems) {
      this._updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter);
    }
  }
  _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
    var {
      state
    } = this;
    state.virtualItemSizeBefore = virtualItemSizeBefore;
    state.virtualItemSizeAfter = virtualItemSizeAfter;
  }
}
class VerticalVirtualScrolling extends VirtualScrollingBase {
  constructor(options) {
    super(_extends(_extends({}, options), {
      itemSize: options.rowHeight,
      viewportSize: options.viewportHeight
    }));
  }
  get prevTopPosition() {
    return this.state.prevPosition;
  }
  get rowCount() {
    return this.state.itemCount;
  }
  get topVirtualRowCount() {
    return this.state.virtualItemCountBefore;
  }
  get bottomVirtualRowCount() {
    return this.state.virtualItemCountAfter;
  }
  getTotalItemCount() {
    return this.options.getTotalRowCount(this.groupCount, this.isVerticalGrouping);
  }
  getRenderState() {
    return {
      topVirtualRowHeight: this.state.virtualItemSizeBefore,
      bottomVirtualRowHeight: this.state.virtualItemSizeAfter,
      startRowIndex: this.state.startIndex,
      rowCount: this.state.itemCount,
      startIndex: this.state.startIndex
    };
  }
}
class HorizontalVirtualScrolling extends VirtualScrollingBase {
  constructor(options) {
    super(_extends(_extends({}, options), {
      itemSize: options.cellWidth,
      viewportSize: options.viewportWidth
    }));
  }
  get isRTL() {
    return this.options.isRTL();
  }
  getTotalItemCount() {
    return this.options.getTotalCellCount(this.groupCount, this.isVerticalGrouping);
  }
  getRenderState() {
    return {
      leftVirtualCellWidth: this.state.virtualItemSizeBefore,
      rightVirtualCellWidth: this.state.virtualItemSizeAfter,
      startCellIndex: this.state.startIndex,
      cellCount: this.state.itemCount,
      cellWidth: this.itemSize
    };
  }
  _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
    if (!this.isRTL) {
      super._updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter);
    } else {
      var {
        state
      } = this;
      state.virtualItemSizeAfter = virtualItemSizeBefore;
      state.virtualItemSizeBefore = virtualItemSizeAfter;
      state.startIndex = this.getTotalItemCount() - this.startIndex - this.state.itemCount;
    }
  }
}
// We do not need this class in renovation
export class VirtualScrollingRenderer {
  constructor(_workspace) {
    this._workspace = _workspace;
    this._renderAppointmentTimeoutID = null;
  }
  getRenderTimeout() {
    return this._workspace.option('isRenovatedAppointments') ? -1 : VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT;
  }
  get workspace() {
    return this._workspace;
  }
  updateRender() {
    this._renderGrid();
    this._renderAppointments();
  }
  _renderGrid() {
    this.workspace.renderWorkSpace(false);
  }
  _renderAppointments() {
    var renderTimeout = this.getRenderTimeout();
    if (renderTimeout >= 0) {
      clearTimeout(this._renderAppointmentTimeoutID);
      this._renderAppointmentTimeoutID = setTimeout(() => this.workspace.updateAppointments(), renderTimeout);
    } else {
      this.workspace.updateAppointments();
    }
  }
}
