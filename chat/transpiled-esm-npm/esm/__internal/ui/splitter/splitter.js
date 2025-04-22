import _extends from "@babel/runtime/helpers/esm/extends";
import { lock } from '../../../common/core/events/core/emitter.feedback';
import registerComponent from '../../../core/component_registrator';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { Deferred } from '../../../core/utils/deferred';
import { contains } from '../../../core/utils/dom';
import { extend } from '../../../core/utils/extend';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { isDefined, isObject } from '../../../core/utils/type';
import { hasWindow } from '../../../core/utils/window';
import CollectionWidgetLiveUpdate from '../../ui/collection/m_collection_widget.live_update';
import { RESIZE_HANDLE_CLASS } from './resize_handle';
import SplitterItem from './splitter_item';
import { getComponentInstance } from './utils/component';
import { getActionNameByEventName, ITEM_COLLAPSED_EVENT, ITEM_EXPANDED_EVENT, RESIZE_EVENT } from './utils/event';
import { calculateDelta, convertSizeToRatio, findIndexOfNextVisibleItem, findLastIndexOfNonCollapsedItem, findLastIndexOfVisibleItem, getElementSize, getNextLayout, isElementVisible, setFlexProp } from './utils/layout';
import { getDefaultLayout } from './utils/layout_default';
import { compareNumbersWithPrecision } from './utils/number_comparison';
import { CollapseExpandDirection } from './utils/types';
const SPLITTER_CLASS = 'dx-splitter';
const SPLITTER_ITEM_CLASS = 'dx-splitter-item';
const SPLITTER_ITEM_HIDDEN_CONTENT_CLASS = 'dx-splitter-item-hidden-content';
const SPLITTER_ITEM_DATA_KEY = 'dxSplitterItemData';
const HORIZONTAL_ORIENTATION_CLASS = 'dx-splitter-horizontal';
const VERTICAL_ORIENTATION_CLASS = 'dx-splitter-vertical';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const DEFAULT_RESIZE_HANDLE_SIZE = 8;
const FLEX_PROPERTY = {
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexBasis: 'flexBasis'
};
const DEFAULT_FLEX_SHRINK_PROP = 0;
const DEFAULT_FLEX_BASIS_PROP = 0;
const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
class Splitter extends CollectionWidgetLiveUpdate {
  constructor() {
    super(...arguments);
    this._renderQueue = [];
    this._panesCacheSize = [];
    this._panesCacheSizeVisible = [];
    this._itemRestrictions = [];
  }
  _getDefaultOptions() {
    const defaultOptions = super._getDefaultOptions();
    return _extends({}, defaultOptions, {
      orientation: ORIENTATION.horizontal,
      onItemCollapsed: undefined,
      onItemExpanded: undefined,
      onResize: undefined,
      onResizeEnd: undefined,
      onResizeStart: undefined,
      allowKeyboardNavigation: true,
      separatorSize: DEFAULT_RESIZE_HANDLE_SIZE,
      _itemAttributes: _extends({}, defaultOptions._itemAttributes, {
        role: 'group'
      }),
      _renderQueue: undefined
    });
  }
  _itemClass() {
    return SPLITTER_ITEM_CLASS;
  }
  _itemDataKey() {
    return SPLITTER_ITEM_DATA_KEY;
  }
  _init() {
    super._init();
    this._initializeRenderQueue();
  }
  _initializeRenderQueue() {
    // @ts-expect-error
    this._renderQueue = this.option('_renderQueue') ?? [];
  }
  _isRenderQueueEmpty() {
    return this._renderQueue.length <= 0;
  }
  _pushItemToRenderQueue(itemContent, splitterConfig) {
    this._renderQueue.push({
      itemContent,
      splitterConfig
    });
  }
  _shiftItemFromQueue() {
    return this._renderQueue.shift();
  }
  _initMarkup() {
    $(this.element()).addClass(SPLITTER_CLASS);
    this._toggleOrientationClass();
    super._initMarkup();
    this._panesCacheSize = [];
    this._panesCacheSizeVisible = [];
    this._attachResizeObserverSubscription();
  }
  _getItemDimension(element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._isHorizontalOrientation() ? getOuterWidth(element) : getOuterHeight(element);
  }
  _attachResizeObserverSubscription() {
    if (hasWindow()) {
      const element = $(this.element()).get(0);
      resizeObserverSingleton.unobserve(element);
      resizeObserverSingleton.observe(element, () => {
        this._resizeHandler();
      });
    }
  }
  _attachHoldEvent() {}
  _isAttached() {
    return !!contains(domAdapter.getBody(), $(this.element()).get(0));
  }
  _isVisible() {
    return isElementVisible($(this.element())[0]);
  }
  _resizeHandler() {
    if (this._shouldRecalculateLayout && this._isAttached() && this._isVisible()) {
      this._layout = this._getDefaultLayoutBasedOnSize();
      this._applyStylesFromLayout(this._layout);
      this._updateItemSizes();
      this._shouldRecalculateLayout = false;
    }
  }
  _renderItems(items) {
    super._renderItems(items);
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    if (this._isVisible()) {
      this._layout = this._getDefaultLayoutBasedOnSize();
      this._applyStylesFromLayout(this._layout);
      this._updateItemSizes();
    } else {
      this._shouldRecalculateLayout = true;
    }
    this._processRenderQueue();
  }
  _processRenderQueue() {
    if (this._isRenderQueueEmpty()) {
      return;
    }
    const item = this._shiftItemFromQueue();
    if (!item) {
      return;
    }
    this._createComponent($(item.itemContent), Splitter, extend({
      itemTemplate: this.option('itemTemplate'),
      onResize: this.option('onResize'),
      onResizeStart: this.option('onResizeStart'),
      onResizeEnd: this.option('onResizeEnd'),
      onItemClick: this.option('onItemClick'),
      onItemContextMenu: this.option('onItemContextMenu'),
      onItemRendered: this.option('onItemRendered'),
      onItemExpanded: this.option('onItemExpanded'),
      onItemCollapsed: this.option('onItemCollapsed'),
      separatorSize: this.option('separatorSize'),
      allowKeyboardNavigation: this.option('allowKeyboardNavigation'),
      rtlEnabled: this.option('rtlEnabled'),
      _renderQueue: this._renderQueue
    }, item.splitterConfig));
    this._processRenderQueue();
  }
  _itemElements() {
    return $(this._itemContainer()).children(this._itemSelector());
  }
  _isLastVisibleItem(index) {
    const {
      items = []
    } = this.option();
    return index === findLastIndexOfVisibleItem(items);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    const itemElement = $itemFrame.get(0);
    setFlexProp(itemElement, FLEX_PROPERTY.flexShrink, DEFAULT_FLEX_SHRINK_PROP);
    setFlexProp(itemElement, FLEX_PROPERTY.flexBasis, DEFAULT_FLEX_BASIS_PROP);
    this._getItemInstance($itemFrame)._renderResizeHandle();
    return $itemFrame;
  }
  _getItemInstance($item) {
    return SplitterItem.getInstance($item);
  }
  _updateResizeHandlesResizableState() {
    this._getResizeHandles().forEach(resizeHandle => {
      this._updateResizeHandleResizableState(resizeHandle);
    });
  }
  _updateResizeHandleResizableState(resizeHandle) {
    const $resizeHandle = resizeHandle.$element();
    const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
    const $rightItem = this._getResizeHandleRightItem($resizeHandle);
    const leftItemData = this._getItemData($leftItem);
    const rightItemData = this._getItemData($rightItem);
    const resizable = leftItemData.resizable !== false && rightItemData.resizable !== false && leftItemData.collapsed !== true && rightItemData.collapsed !== true;
    resizeHandle.option('resizable', resizable);
    resizeHandle.option('disabled', resizeHandle.isInactive());
  }
  _updateResizeHandlesCollapsibleState() {
    this._getResizeHandles().forEach(resizeHandle => {
      this._updateResizeHandleCollapsibleState(resizeHandle);
    });
  }
  _updateResizeHandleCollapsibleState(resizeHandle) {
    const $resizeHandle = $(resizeHandle.element());
    const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
    const $rightItem = this._getResizeHandleRightItem($resizeHandle);
    const leftItemData = this._getItemData($leftItem);
    const rightItemData = this._getItemData($rightItem);
    const showCollapsePrev = rightItemData.collapsed === true ? rightItemData.collapsible === true && leftItemData.collapsed !== true : leftItemData.collapsible === true && leftItemData.collapsed !== true;
    const showCollapseNext = leftItemData.collapsed === true ? leftItemData.collapsible === true : rightItemData.collapsible === true && rightItemData.collapsed !== true;
    resizeHandle.option({
      showCollapsePrev,
      showCollapseNext
    });
    resizeHandle.option('disabled', resizeHandle.isInactive());
  }
  _updateNestedSplitterOption(optionName, optionValue) {
    const {
      items = []
    } = this.option();
    items.forEach(item => {
      if (item !== null && item !== void 0 && item.splitter) {
        const $nestedSplitter = this._findItemElementByItem(item).find(`.${SPLITTER_CLASS}`).eq(0);
        if ($nestedSplitter.length) {
          getComponentInstance($nestedSplitter).option(optionName, optionValue);
        }
      }
    });
  }
  _updateResizeHandlesOption(optionName, optionValue) {
    this._getResizeHandles().forEach(resizeHandle => {
      resizeHandle.option(optionName, optionValue);
    });
  }
  _getNextVisibleItemData(index) {
    const {
      items = []
    } = this.option();
    return this._getItemDataByIndex(findIndexOfNextVisibleItem(items, index));
  }
  _getItemDataByIndex(index) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._editStrategy.getItemDataByIndex(index);
  }
  _createEventAction(eventName) {
    const actionName = getActionNameByEventName(eventName);
    this[actionName] = this._createActionByOption(eventName, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _getAction(eventName) {
    const actionName = getActionNameByEventName(eventName);
    if (!this[actionName]) {
      this._createEventAction(eventName);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this[actionName];
  }
  _getResizeHandleConfig(paneId) {
    const {
      orientation,
      rtlEnabled,
      allowKeyboardNavigation,
      separatorSize
    } = this.option();
    return {
      direction: orientation,
      focusStateEnabled: allowKeyboardNavigation,
      hoverStateEnabled: true,
      separatorSize,
      elementAttr: {
        'aria-controls': paneId
      },
      onCollapsePrev: e => {
        var _e$event;
        (_e$event = e.event) === null || _e$event === void 0 || _e$event.stopPropagation();
        this._savedCollapsingEvent = e.event;
        this.handleCollapseEvent(this._getResizeHandleLeftItem($(e.element)), CollapseExpandDirection.Previous);
      },
      onCollapseNext: e => {
        var _e$event2;
        (_e$event2 = e.event) === null || _e$event2 === void 0 || _e$event2.stopPropagation();
        this._savedCollapsingEvent = e.event;
        this.handleCollapseEvent(this._getResizeHandleLeftItem($(e.element)), CollapseExpandDirection.Next);
      },
      onResizeStart: e => {
        const {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        const $resizeHandle = $(element);
        const eventArgs = {
          event,
          handleElement: getPublicElement($resizeHandle)
        };
        this._getAction(RESIZE_EVENT.onResizeStart)(eventArgs);
        if (eventArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        this._feedbackDeferred = Deferred();
        lock(this._feedbackDeferred);
        this._toggleActiveState($resizeHandle, true);
        const $leftItem = this._getResizeHandleLeftItem($resizeHandle);
        const leftItemData = this._getItemData($leftItem);
        const leftItemIndex = this._getIndexByItem(leftItemData);
        this._activeResizeHandleIndex = leftItemIndex;
        this._currentOnePxRatio = convertSizeToRatio(1, getElementSize($(this.element()), orientation), this._getResizeHandlesSize());
        this._currentLayout = this.getLayout();
        this._updateItemsRestrictions();
      },
      onResize: e => {
        const {
          element,
          event
        } = e;
        if (!event) {
          return;
        }
        const eventArgs = {
          event,
          handleElement: getPublicElement($(element))
        };
        this._getAction(RESIZE_EVENT.onResize)(eventArgs);
        if (eventArgs.cancel) {
          // @ts-expect-error ts-error
          event.cancel = true;
          return;
        }
        const {
          orientation: currentOrientation
        } = this.option();
        const newLayout = getNextLayout(this._currentLayout ?? [], calculateDelta(
        // @ts-expect-error ts-error
        event.offset, currentOrientation, rtlEnabled, this._currentOnePxRatio), this._activeResizeHandleIndex, this._itemRestrictions);
        this._applyStylesFromLayout(newLayout);
        this._layout = newLayout;
      },
      onResizeEnd: e => {
        var _this$_feedbackDeferr;
        const {
          element,
          event
        } = e;
        this._activeResizeHandleIndex = undefined;
        if (!event) {
          return;
        }
        const $resizeHandle = $(element);
        const eventArgs = {
          event,
          handleElement: getPublicElement($resizeHandle)
        };
        (_this$_feedbackDeferr = this._feedbackDeferred) === null || _this$_feedbackDeferr === void 0 || _this$_feedbackDeferr.resolve();
        this._toggleActiveState($resizeHandle, false);
        this._updateItemSizes();
        this._getAction(RESIZE_EVENT.onResizeEnd)(eventArgs);
      }
    };
  }
  handleCollapseEvent($resizeHandle, direction, isItemCollapsed) {
    const $leftItem = $resizeHandle;
    const leftItemData = this._getItemData($leftItem);
    const leftItemIndex = this._getIndexByItem(leftItemData);
    const $rightItem = this._getResizeHandleRightItem($leftItem);
    const rightItemData = this._getItemData($rightItem);
    const rightItemIndex = this._getIndexByItem(rightItemData);
    this._activeResizeHandleIndex = leftItemIndex;
    this._collapseDirection = direction;
    const isCollapsed = isItemCollapsed ?? (direction === CollapseExpandDirection.Previous ? rightItemData.collapsed : leftItemData.collapsed);
    let index = 0;
    if (direction === CollapseExpandDirection.Previous) {
      index = isCollapsed ? rightItemIndex : leftItemIndex;
    } else {
      index = isCollapsed ? leftItemIndex : rightItemIndex;
    }
    this._updateItemData('collapsed', index, !isCollapsed, false);
  }
  _getResizeHandleLeftItem($element) {
    let $leftItem = $element.prev();
    while ($leftItem.hasClass(INVISIBLE_STATE_CLASS) || $leftItem.hasClass(RESIZE_HANDLE_CLASS)) {
      $leftItem = $leftItem.prev();
    }
    return $leftItem;
  }
  _getResizeHandleRightItem($element) {
    let $rightItem = $element.next();
    while ($rightItem.hasClass(INVISIBLE_STATE_CLASS) || $rightItem.hasClass(RESIZE_HANDLE_CLASS)) {
      $rightItem = $rightItem.next();
    }
    return $rightItem;
  }
  _getResizeHandlesSize() {
    return this._getResizeHandles().reduce((size, resizeHandle) => size + resizeHandle.getSize(), 0);
  }
  _createItemByTemplate(itemTemplate, args) {
    const {
      itemData
    } = args;
    if (itemData.splitter) {
      this._onItemTemplateRendered(itemTemplate, args)();
      return itemTemplate.source ? itemTemplate.source()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      : $();
    }
    return super._createItemByTemplate(itemTemplate, args);
  }
  _postprocessRenderItem(args) {
    const splitterConfig = args.itemData.splitter;
    if (!splitterConfig) {
      return;
    }
    this._pushItemToRenderQueue(args.itemContent, splitterConfig);
  }
  _isHorizontalOrientation() {
    const {
      orientation
    } = this.option();
    return orientation === ORIENTATION.horizontal;
  }
  _toggleOrientationClass() {
    $(this.element()).toggleClass(HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation()).toggleClass(VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _itemOptionChanged(item, property, value, prevValue) {
    switch (property) {
      case 'size':
      case 'maxSize':
      case 'minSize':
      case 'collapsedSize':
        this._layout = this._getDefaultLayoutBasedOnSize();
        this._applyStylesFromLayout(this.getLayout());
        this._updateItemSizes();
        break;
      case 'collapsed':
        {
          this._itemCollapsedOptionChanged(item, value, prevValue);
          break;
        }
      case 'resizable':
        this._updateResizeHandlesResizableState();
        break;
      case 'collapsible':
        this._updateResizeHandlesCollapsibleState();
        break;
      case 'visible':
        {
          super._itemOptionChanged(item, property, value, prevValue);
          this._itemVisibleOptionChanged(item, value, prevValue);
          break;
        }
      case 'template':
        super._itemOptionChanged(item, property, value, prevValue);
        this._applyStylesFromLayout(this.getLayout());
        this._updateResizeHandles();
        break;
      default:
        super._itemOptionChanged(item, property, value, prevValue);
    }
  }
  _itemVisibleOptionChanged(item) {
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let prevValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (Boolean(prevValue) === Boolean(value)) {
      return;
    }
    const {
      direction,
      paneIndex
    } = this._getDistributionData(item, value);
    this._updateResizeHandles();
    if (paneIndex && paneIndex < 0) {
      return;
    }
    this._updateItemsRestrictions();
    const collapsedDelta = this._getCollapseDelta(item, !value, this._panesCacheSizeVisible, direction);
    this._itemRestrictions.forEach(pane => {
      pane.maxSize = undefined;
      pane.resizable = undefined;
    });
    this._layout = getNextLayout(this.getLayout(), collapsedDelta, paneIndex, this._itemRestrictions);
    this._applyStylesFromLayout(this.getLayout());
    this._updateItemSizes();
  }
  _getDistributionData(item, value) {
    const itemIndex = this._getIndexByItem(item);
    const $item = $(this._itemElements()[itemIndex]);
    const {
      items = []
    } = this.option();
    const isLastVisible = itemIndex >= findLastIndexOfVisibleItem(items);
    const direction = isLastVisible === (value === false) ? CollapseExpandDirection.Next : CollapseExpandDirection.Previous;
    const paneIndex = this._getPaneIndexByElement(isLastVisible ? this._getResizeHandleLeftItem($item) : $item);
    return {
      direction,
      paneIndex
    };
  }
  _updateResizeHandles() {
    this._iterateItems((_, itemElement) => {
      const item = this._getItemInstance($(itemElement));
      item.updateResizeHandle();
      const resizeHandle = item.getResizeHandle();
      if (resizeHandle) {
        this._updateResizeHandleResizableState(resizeHandle);
        this._updateResizeHandleCollapsibleState(resizeHandle);
      }
    });
  }
  _getPaneIndexByElement($element) {
    const itemData = this._getItemData($element);
    return this._getIndexByItem(itemData);
  }
  _itemCollapsedOptionChanged(item, value, prevValue) {
    if (Boolean(value) === Boolean(prevValue)) {
      return;
    }
    const itemIndex = this._getIndexByItem(item);
    const $item = $(this._itemElements()[itemIndex]);
    const {
      items = []
    } = this.option();
    if (!isDefined(this._activeResizeHandleIndex)) {
      if (value) {
        const isLastNonCollapsedItem = itemIndex > findLastIndexOfNonCollapsedItem(items);
        if (this._isLastVisibleItem(itemIndex) || isLastNonCollapsedItem) {
          this.handleCollapseEvent(this._getResizeHandleLeftItem($item), CollapseExpandDirection.Next, !!prevValue);
        } else {
          this.handleCollapseEvent($item, CollapseExpandDirection.Previous, !!prevValue);
        }
      } else {
        var _this$_panesCacheSize;
        const isLastNonCollapsedItem = itemIndex >= findLastIndexOfNonCollapsedItem(items);
        if (this._isLastVisibleItem(itemIndex) || isLastNonCollapsedItem) {
          this.handleCollapseEvent(this._getResizeHandleLeftItem($item), CollapseExpandDirection.Previous, !!prevValue);
        } else if (((_this$_panesCacheSize = this._panesCacheSize[itemIndex]) === null || _this$_panesCacheSize === void 0 ? void 0 : _this$_panesCacheSize.direction) === CollapseExpandDirection.Previous) {
          this.handleCollapseEvent(this._getResizeHandleLeftItem($item), CollapseExpandDirection.Previous, !!prevValue);
        } else {
          this.handleCollapseEvent($item, CollapseExpandDirection.Next, !!prevValue);
        }
      }
    }
    this._updateItemsRestrictions();
    const collapsedDelta = this._getCollapseDelta(item, value, this._panesCacheSize, this._collapseDirection);
    this._itemRestrictions.forEach(pane => {
      pane.maxSize = undefined;
      pane.resizable = undefined;
    });
    this._layout = getNextLayout(this.getLayout(), collapsedDelta, this._activeResizeHandleIndex, this._itemRestrictions);
    this._applyStylesFromLayout(this.getLayout());
    this._updateItemSizes();
    this._updateResizeHandlesResizableState();
    this._updateResizeHandlesCollapsibleState();
    this._fireCollapsedStateChanged(!value, $item, this._savedCollapsingEvent);
    this._savedCollapsingEvent = undefined;
    this._collapseDirection = undefined;
    this._activeResizeHandleIndex = undefined;
  }
  _calculateExpandToLeftSize(leftItemIndex) {
    const {
      items = []
    } = this.option();
    for (let i = leftItemIndex; i >= 0; i -= 1) {
      const {
        collapsed,
        visible
      } = items[i];
      if (collapsed !== true && visible !== false) {
        return this.getLayout()[i] / 2;
      }
    }
    return 0;
  }
  _calculateExpandToRightSize(rightItemIndex) {
    const {
      items = []
    } = this.option();
    for (let i = rightItemIndex; i <= items.length - 1; i += 1) {
      const {
        collapsed,
        visible
      } = items[i];
      if (collapsed !== true && visible !== false) {
        return this.getLayout()[i] / 2;
      }
    }
    return 0;
  }
  _getCollapseDelta(item, newCollapsedState, panesCacheSize, direction) {
    const itemIndex = this._getIndexByItem(item);
    const {
      collapsedSize = 0,
      minSize = 0,
      maxSize = 100
    } = this._itemRestrictions[itemIndex];
    const currentPaneSize = this.getLayout()[itemIndex];
    if (newCollapsedState) {
      const targetPaneSize = collapsedSize;
      if (currentPaneSize > targetPaneSize) {
        panesCacheSize[itemIndex] = {
          size: currentPaneSize,
          direction: direction === CollapseExpandDirection.Next ? CollapseExpandDirection.Previous : CollapseExpandDirection.Next
        };
      }
      const delta = direction === CollapseExpandDirection.Previous ? targetPaneSize - currentPaneSize : currentPaneSize - targetPaneSize;
      return delta;
    }
    const paneCache = panesCacheSize[itemIndex];
    panesCacheSize[itemIndex] = undefined;
    let targetPaneSize = 0;
    if (paneCache && paneCache.direction === direction) {
      targetPaneSize = paneCache.size - collapsedSize;
    } else {
      targetPaneSize = direction === CollapseExpandDirection.Previous ? this._calculateExpandToLeftSize(itemIndex - 1) : this._calculateExpandToRightSize(itemIndex + 1);
    }
    let adjustedSize = compareNumbersWithPrecision(targetPaneSize, minSize) < 0 ? minSize : targetPaneSize;
    adjustedSize = Math.min(maxSize, adjustedSize);
    const deltaSign = direction === CollapseExpandDirection.Previous ? -1 : 1;
    const delta = adjustedSize * deltaSign;
    return delta;
  }
  _fireCollapsedStateChanged(isExpanded, $item, e) {
    const eventName = isExpanded ? ITEM_EXPANDED_EVENT : ITEM_COLLAPSED_EVENT;
    this._itemEventHandler($item, eventName, {
      event: e
    });
  }
  _getDefaultLayoutBasedOnSize() {
    this._updateItemsRestrictions();
    return getDefaultLayout(this._itemRestrictions);
  }
  _updateItemsRestrictions() {
    const {
      orientation,
      items = []
    } = this.option();
    const handlesSizeSum = this._getResizeHandlesSize();
    const elementSize = getElementSize($(this.element()), orientation);
    this._itemRestrictions = [];
    items.forEach(item => {
      this._itemRestrictions.push({
        resizable: item.resizable !== false,
        visible: item.visible !== false,
        collapsed: item.collapsed === true,
        collapsedSize: convertSizeToRatio(item.collapsedSize, elementSize, handlesSizeSum),
        size: convertSizeToRatio(item.size, elementSize, handlesSizeSum),
        maxSize: convertSizeToRatio(item.maxSize, elementSize, handlesSizeSum),
        minSize: convertSizeToRatio(item.minSize, elementSize, handlesSizeSum)
      });
    });
  }
  _applyStylesFromLayout(layout) {
    this._iterateItems((index, itemElement) => {
      setFlexProp($(itemElement)[0], FLEX_PROPERTY.flexGrow, layout[index]);
      const itemData = this._getItemData(itemElement);
      const shouldHideContent = layout[index] === 0 && itemData.visible !== false;
      $(itemElement).toggleClass(SPLITTER_ITEM_HIDDEN_CONTENT_CLASS, shouldHideContent);
    });
  }
  _updateItemSizes() {
    this._iterateItems((index, itemElement) => {
      this._updateItemData('size', index, this._getItemDimension(itemElement));
    });
  }
  _updateItemData(prop, itemIndex, value) {
    let silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    const itemPath = `items[${itemIndex}]`;
    const itemData = this.option(itemPath);
    if (isObject(itemData)) {
      this._updateItemOption(`${itemPath}.${prop}`, value, silent);
    } else {
      this._updateItemOption(itemPath, {
        text: itemData,
        [prop]: value
      }, silent);
    }
  }
  _updateItemOption(path, value) {
    let silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (silent) {
      this._options.silent(path, value);
    } else {
      this.option(path, value);
    }
  }
  _iterateItems(callback) {
    this._itemElements().each((index, itemElement) => {
      callback(index, itemElement);
      return true;
    });
  }
  _getResizeHandles() {
    const handles = [];
    this._iterateItems((_, itemElement) => {
      const instance = this._getItemInstance($(itemElement));
      const resizeHandle = instance.getResizeHandle();
      if (resizeHandle) {
        handles.push(resizeHandle);
      }
    });
    return handles;
  }
  _getResizeHandleItems() {
    return $(this.element()).children(`.${RESIZE_HANDLE_CLASS}`);
  }
  _iterateResizeHandles(callback) {
    this._getResizeHandleItems().each((index, element) => {
      callback(getComponentInstance($(element)));
      return true;
    });
  }
  _dimensionChanged() {
    this._updateItemSizes();
    this._layout = this._getDefaultLayoutBasedOnSize();
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'allowKeyboardNavigation':
        this._iterateResizeHandles(instance => {
          instance.option('focusStateEnabled', !!value);
        });
        this._updateNestedSplitterOption(name, value);
        break;
      case 'orientation':
        this._toggleOrientationClass();
        this._updateResizeHandlesOption('direction', value);
        break;
      case 'onResizeStart':
      case 'onResizeEnd':
      case 'onResize':
      case 'onItemCollapsed':
      case 'onItemExpanded':
        this._createEventAction(name);
        this._updateNestedSplitterOption(name, value);
        break;
      case 'separatorSize':
        this._updateResizeHandlesOption(name, value);
        this._updateNestedSplitterOption(name, value);
        break;
      case '_renderQueue':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  registerKeyHandler(key, handler) {
    $(this.element()).find(`.${RESIZE_HANDLE_CLASS}`).each((index, element) => {
      getComponentInstance($(element)).registerKeyHandler(key, handler);
      return true;
    });
  }
  getLayout() {
    return this._layout ?? [];
  }
}
Splitter.ItemClass = SplitterItem;
registerComponent('dxSplitter', Splitter);
export default Splitter;