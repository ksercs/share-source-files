/**
* DevExtreme (esm/__internal/ui/collection/collection_widget.base.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { name as clickEventName } from '../../../common/core/events/click';
import { name as contextMenuEventName } from '../../../common/core/events/contextmenu';
import eventsEngine from '../../../common/core/events/core/events_engine';
import holdEvent from '../../../common/core/events/hold';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace, isCommandKeyPressed } from '../../../common/core/events/utils/index';
import messageLocalization from '../../../common/core/localization/message';
import Action from '../../../core/action';
import domAdapter from '../../../core/dom_adapter';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import { BindableTemplate } from '../../../core/templates/bindable_template';
import {
// @ts-expect-error ts-error
deferRenderer, ensureDefined } from '../../../core/utils/common';
import { compileGetter } from '../../../core/utils/data';
import { when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getOuterHeight, getOuterWidth } from '../../../core/utils/size';
import { findTemplates } from '../../../core/utils/template_manager';
import { isDefined, isFunction, isPlainObject } from '../../../core/utils/type';
import DataHelperMixin from '../../../data_helper';
import { focusable } from '../../../ui/widget/selectors';
import { getPublicElement } from '../../core/m_element';
import Widget from '../../core/widget/widget';
import CollectionWidgetItem from '../../ui/collection/item';
const COLLECTION_CLASS = 'dx-collection';
const ITEM_CLASS = 'dx-item';
const CONTENT_CLASS_POSTFIX = '-content';
const ITEM_CONTENT_PLACEHOLDER_CLASS = 'dx-item-content-placeholder';
const ITEM_DATA_KEY = 'dxItemData';
const ITEM_INDEX_KEY = 'dxItemIndex';
const ITEM_TEMPLATE_ID_PREFIX = 'tmpl-';
const ITEMS_OPTIONS_NAME = 'dxItem';
const ITEM_RESPONSE_WAIT_CLASS = 'dx-item-response-wait';
const EMPTY_COLLECTION = 'dx-empty-collection';
const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
const ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
const ANONYMOUS_TEMPLATE_NAME = 'item';
const FOCUS_UP = 'up';
const FOCUS_DOWN = 'down';
const FOCUS_LEFT = 'left';
const FOCUS_RIGHT = 'right';
const FOCUS_PAGE_UP = 'pageup';
const FOCUS_PAGE_DOWN = 'pagedown';
const FOCUS_LAST = 'last';
const FOCUS_FIRST = 'first';
class CollectionWidget extends Widget {
  _supportedKeys() {
    const space = e => {
      e.preventDefault();
      this._enterKeyHandler(e);
    };
    const move = (location, e) => {
      if (!isCommandKeyPressed(e)) {
        e.preventDefault();
        e.stopPropagation();
        this._moveFocus(location, e);
      }
    };
    return _extends({}, super._supportedKeys(), {
      space,
      enter: this._enterKeyHandler,
      leftArrow: move.bind(this, FOCUS_LEFT),
      rightArrow: move.bind(this, FOCUS_RIGHT),
      upArrow: move.bind(this, FOCUS_UP),
      downArrow: move.bind(this, FOCUS_DOWN),
      pageUp: move.bind(this, FOCUS_UP),
      pageDown: move.bind(this, FOCUS_DOWN),
      home: move.bind(this, FOCUS_FIRST),
      end: move.bind(this, FOCUS_LAST)
    });
  }
  _getHandlerExtendedParams(e, $target) {
    const params = extend({}, e, {
      target: $target.get(0),
      currentTarget: $target.get(0)
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return params;
  }
  _enterKeyHandler(e) {
    const {
      focusedElement
    } = this.option();
    const $itemElement = $(focusedElement);
    if (!$itemElement.length) {
      return;
    }
    const itemData = this._getItemData($itemElement);
    // @ts-expect-error ts-error
    if (itemData !== null && itemData !== void 0 && itemData.onClick) {
      // @ts-expect-error ts-error
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
        event: e
      });
    }
    // @ts-expect-error ts-error
    this._itemClickHandler(this._getHandlerExtendedParams(e, $itemElement));
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      selectOnFocus: false,
      loopItemFocus: true,
      items: [],
      itemTemplate: 'item',
      onItemRendered: null,
      onItemClick: null,
      onItemHold: null,
      itemHoldTimeout: 750,
      onItemContextMenu: null,
      onFocusedItemChanged: null,
      noDataText: messageLocalization.format('dxCollectionWidget-noDataText'),
      encodeNoDataText: false,
      dataSource: null,
      _dataController: null,
      _itemAttributes: {},
      itemTemplateProperty: 'template',
      focusedElement: null,
      displayExpr: undefined,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      disabledExpr(data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data ? data.disabled : undefined;
      },
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      visibleExpr(data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data ? data.visible : undefined;
      }
    });
  }
  _init() {
    this._compileDisplayGetter();
    // @ts-expect-error ts-error
    this._initDataController();
    super._init();
    this._activeStateUnit = `.${ITEM_CLASS}`;
    this._cleanRenderedItems();
    // @ts-expect-error ts-error
    this._refreshDataSource();
  }
  _compileDisplayGetter() {
    // @ts-expect-error ts-error
    const {
      displayExpr
    } = this.option();
    this._displayGetter = displayExpr ? compileGetter(displayExpr) : undefined;
  }
  _initTemplates() {
    this._initItemsFromMarkup();
    this._initDefaultItemTemplate();
    super._initTemplates();
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initDefaultItemTemplate() {
    const fieldsMap = this._getFieldsMap();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data) => {
        if (isPlainObject(data)) {
          this._prepareDefaultItemTemplate(data, $container);
        } else {
          if (fieldsMap && isFunction(fieldsMap.text)) {
            // eslint-disable-next-line no-param-reassign
            data = fieldsMap.text(data);
          }
          $container.text(String(ensureDefined(data, '')));
        }
      }, this._getBindableFields(), this.option('integrationOptions.watchMethod'), fieldsMap)
    });
  }
  _getBindableFields() {
    return ['text', 'html'];
  }
  _getFieldsMap() {
    if (this._displayGetter) {
      return {
        text: this._displayGetter
      };
    }
    return undefined;
  }
  _prepareDefaultItemTemplate(data, $container) {
    const {
      text,
      html
    } = data;
    if (isDefined(text)) {
      $container.text(text);
    }
    if (isDefined(html)) {
      $container.html(html);
    }
  }
  _initItemsFromMarkup() {
    const rawItems = findTemplates(this.$element(), ITEMS_OPTIONS_NAME);
    // @ts-expect-error ts-error
    if (!rawItems.length || this.option('items').length) {
      return;
    }
    const items = rawItems.map(_ref => {
      let {
        element,
        options
      } = _ref;
      // @ts-expect-error ts-error
      const isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
      if (isTemplateRequired) {
        options.template = this._prepareItemTemplate(element);
      } else {
        $(element).remove();
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return options;
    });
    this.option('items', items);
  }
  _prepareItemTemplate(item) {
    const templateId = `${ITEM_TEMPLATE_ID_PREFIX}${new Guid()}`;
    const $template = $(item).detach().clone().removeAttr('data-options').addClass(TEMPLATE_WRAPPER_CLASS);
    this._saveTemplate(templateId, $template);
    return templateId;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _cleanRenderedItems() {
    this._renderedItemsCount = 0;
  }
  _focusTarget() {
    return this.$element();
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
    if (!this._isFocusTarget(e.target)) {
      return;
    }
    // @ts-expect-error ts-error
    const $focusedElement = $(this.option('focusedElement'));
    if ($focusedElement.length) {
      // NOTE: If focusedElement is set, selection was already processed on its focusing.
      this._shouldSkipSelectOnFocus = true;
      this._setFocusedItem($focusedElement);
      this._shouldSkipSelectOnFocus = false;
    } else {
      const $activeItem = this._getActiveItem();
      if ($activeItem.length) {
        this.option('focusedElement', getPublicElement($activeItem));
      }
    }
  }
  _focusOutHandler(e) {
    super._focusOutHandler(e);
    const {
      focusedElement
    } = this.option();
    const $target = $(focusedElement);
    this._updateFocusedItemState($target, false);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit);
  }
  _getActiveItem(last) {
    const {
      focusedElement
    } = this.option();
    const $focusedElement = $(focusedElement);
    if ($focusedElement.length) {
      return $focusedElement;
    }
    return this._determineFocusedElement(last);
  }
  _determineFocusedElement(last) {
    let index = this._getFocusedElementIndex();
    const activeElements = this._getActiveElement();
    const lastIndex = activeElements.length - 1;
    if (index < 0) {
      index = last ? lastIndex : 0;
    }
    return activeElements.eq(index);
  }
  _getFocusedElementIndex() {
    return 0;
  }
  // eslint-disable-next-line consistent-return
  _moveFocus(location,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  e) {
    const $items = this._getAvailableItems();
    let $newTarget = $();
    switch (location) {
      case FOCUS_PAGE_UP:
      case FOCUS_UP:
        $newTarget = this._prevItem($items);
        break;
      case FOCUS_PAGE_DOWN:
      case FOCUS_DOWN:
        $newTarget = this._nextItem($items);
        break;
      case FOCUS_RIGHT:
        $newTarget = this.option('rtlEnabled') ? this._prevItem($items) : this._nextItem($items);
        break;
      case FOCUS_LEFT:
        $newTarget = this.option('rtlEnabled') ? this._nextItem($items) : this._prevItem($items);
        break;
      case FOCUS_FIRST:
        $newTarget = $items.first();
        break;
      case FOCUS_LAST:
        $newTarget = $items.last();
        break;
      default:
        return false;
    }
    if ($newTarget.length !== 0) {
      this.option('focusedElement', getPublicElement($newTarget));
    }
  }
  _getVisibleItems($itemElements) {
    const $items = $itemElements ?? this._itemElements();
    return $items.filter(':visible');
  }
  _getAvailableItems($itemElements) {
    return this._getVisibleItems($itemElements);
  }
  _prevItem($items) {
    const $target = this._getActiveItem();
    const targetIndex = $items.index($target);
    const $last = $items.last();
    let $item = $($items[targetIndex - 1]);
    const loop = this.option('loopItemFocus');
    if ($item.length === 0 && loop) {
      $item = $last;
    }
    return $item;
  }
  _nextItem($items) {
    const $target = this._getActiveItem(true);
    const targetIndex = $items.index($target);
    const $first = $items.first();
    let $item = $($items[targetIndex + 1]);
    const loop = this.option('loopItemFocus');
    if ($item.length === 0 && loop) {
      $item = $first;
    }
    return $item;
  }
  _selectFocusedItem($target) {
    // @ts-expect-error ts-error
    this.selectItem($target);
  }
  _updateFocusedItemState(target, isFocused, needCleanItemId) {
    const $target = $(target);
    if ($target.length) {
      this._refreshActiveDescendant();
      this._refreshItemId($target, needCleanItemId);
      this._toggleFocusClass(isFocused, $target);
    }
    this._updateParentActiveDescendant();
  }
  _getElementClassToSkipRefreshId() {
    return '';
  }
  _shouldSkipRefreshId(target) {
    const elementClass = this._getElementClassToSkipRefreshId();
    const shouldSkipRefreshId = $(target).hasClass(elementClass);
    return shouldSkipRefreshId;
  }
  _refreshActiveDescendant($target) {
    const {
      focusedElement
    } = this.option();
    if (isDefined(focusedElement)) {
      const shouldSetExistingId = this._shouldSkipRefreshId(focusedElement);
      const id = shouldSetExistingId ? $(focusedElement).attr('id') : this.getFocusedItemId();
      this.setAria('activedescendant', id, $target);
      return;
    }
    this.setAria('activedescendant', null, $target);
  }
  _refreshItemId($target, needCleanItemId) {
    const {
      focusedElement
    } = this.option();
    const shouldSkipRefreshId = this._shouldSkipRefreshId($target);
    if (shouldSkipRefreshId) {
      return;
    }
    if (!needCleanItemId && focusedElement) {
      this.setAria('id', this.getFocusedItemId(), $target);
    } else {
      this.setAria('id', null, $target);
    }
  }
  _isDisabled($element) {
    return $element && $($element).attr('aria-disabled') === 'true';
  }
  _setFocusedItem($target) {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!$target || !$target.length) {
      return;
    }
    this._updateFocusedItemState($target, true);
    // @ts-expect-error ts-error
    this.onFocusedItemChanged(this.getFocusedItemId());
    const {
      selectOnFocus
    } = this.option();
    const isTargetDisabled = this._isDisabled($target);
    if (selectOnFocus && !isTargetDisabled && !this._shouldSkipSelectOnFocus) {
      this._selectFocusedItem($target);
    }
  }
  _findItemElementByItem(item) {
    let result = $();
    const itemDataKey = this._itemDataKey();
    this.itemElements().each((index, itemElement) => {
      const $item = $(itemElement);
      if ($item.data(itemDataKey) === item) {
        result = $item;
        return false;
      }
      return true;
    });
    return result;
  }
  _getIndexByItem(item) {
    const {
      items
    } = this.option();
    // @ts-expect-error ts-error
    return items.indexOf(item);
  }
  _itemOptionChanged(item, property, value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prevValue) {
    const $item = this._findItemElementByItem(item);
    if (!$item.length) {
      return;
    }
    // @ts-expect-error ts-error
    if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
      this._refreshItem($item, item);
    }
    const isDisabling = property === 'disabled' && value;
    if (isDisabling) {
      this._resetItemFocus($item);
    }
  }
  _resetItemFocus($item) {
    // @ts-expect-error ts-error
    if ($item.is(this.option('focusedElement'))) {
      this._resetFocusedElement();
    }
  }
  _resetFocusedElement() {
    this.option('focusedElement', null);
  }
  _refreshItem($item,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  item) {
    const itemData = this._getItemData($item);
    const index = $item.data(this._itemIndexKey());
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this._renderItem(this._renderedItemsCount + index, itemData, null, $item);
  }
  _updateParentActiveDescendant() {}
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue,
      fullName
    } = args;
    if (name === 'items') {
      // @ts-expect-error ts-error
      const matches = fullName.match(ITEM_PATH_REGEX);
      if (matches !== null && matches !== void 0 && matches.length) {
        const property = matches[matches.length - 1];
        // @ts-expect-error ts-error
        const itemPath = fullName.replace(`.${property}`, '');
        const item = this.option(itemPath);
        // @ts-expect-error ts-error
        this._itemOptionChanged(item, property, value, previousValue);
        return;
      }
    }
    switch (name) {
      case 'items':
      case '_itemAttributes':
      case 'itemTemplateProperty':
      case 'useItemTextAsTitle':
        this._cleanRenderedItems();
        this._invalidate();
        break;
      case 'dataSource':
        // @ts-expect-error ts-error
        this._refreshDataSource();
        this._renderEmptyMessage();
        break;
      case 'noDataText':
      case 'encodeNoDataText':
        this._renderEmptyMessage();
        break;
      case 'itemTemplate':
        this._invalidate();
        break;
      case 'onItemRendered':
        this._createItemRenderAction();
        break;
      case 'onItemClick':
        break;
      case 'onItemHold':
      case 'itemHoldTimeout':
        this._attachHoldEvent();
        break;
      case 'onItemContextMenu':
        this._attachContextMenuEvent();
        break;
      case 'onFocusedItemChanged':
        // @ts-expect-error ts-error
        this.onFocusedItemChanged = this._createActionByOption('onFocusedItemChanged');
        break;
      case 'selectOnFocus':
      case 'loopItemFocus':
        break;
      case 'focusedElement':
        this._updateFocusedItemState(previousValue, false, true);
        this._setFocusedItem($(value));
        break;
      case 'displayExpr':
        this._compileDisplayGetter();
        this._initDefaultItemTemplate();
        this._invalidate();
        break;
      case 'visibleExpr':
      case 'disabledExpr':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _invalidate() {
    this._resetFocusedElement();
    super._invalidate();
  }
  _loadNextPage() {
    this._expectNextPageLoading();
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._dataController.loadNextPage();
  }
  _expectNextPageLoading() {
    this._startIndexForAppendedItems = 0;
  }
  _expectLastItemLoading() {
    this._startIndexForAppendedItems = -1;
  }
  _forgetNextPageLoading() {
    this._startIndexForAppendedItems = null;
  }
  _dataSourceChangedHandler(newItems,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  e) {
    const items = this.option('items');
    if (this._initialized && items && this._shouldAppendItems()) {
      // @ts-expect-error ts-error
      this._renderedItemsCount = items.length;
      // @ts-expect-error ts-error
      if (!this._isLastPage() || this._startIndexForAppendedItems !== -1) {
        // @ts-expect-error ts-error
        this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems));
      }
      this._forgetNextPageLoading();
      this._refreshContent();
    } else {
      this.option('items', newItems.slice());
    }
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    this.option('items', this.option('items'));
  }
  _shouldAppendItems() {
    return this._startIndexForAppendedItems != null && this._allowDynamicItemsAppend();
  }
  _allowDynamicItemsAppend() {
    return false;
  }
  _clean() {
    this._cleanFocusState();
    this._cleanItemContainer();
    if (this._inkRipple) {
      delete this._inkRipple;
    }
    this._resetActiveState();
  }
  _cleanItemContainer() {
    $(this._itemContainer()).empty();
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._itemFocusTimeout);
  }
  _refresh() {
    this._cleanRenderedItems();
    super._refresh();
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
  _itemContainer(searchEnabled, previousSelectAllEnabled) {
    return this.$element();
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemContentClass() {
    return `${this._itemClass()}${CONTENT_CLASS_POSTFIX}`;
  }
  _itemResponseWaitClass() {
    return ITEM_RESPONSE_WAIT_CLASS;
  }
  _itemSelector() {
    return `.${this._itemClass()}`;
  }
  _itemDataKey() {
    return ITEM_DATA_KEY;
  }
  _itemIndexKey() {
    return ITEM_INDEX_KEY;
  }
  _itemElements() {
    return this._itemContainer().find(this._itemSelector());
  }
  _initMarkup() {
    super._initMarkup();
    // @ts-expect-error ts-error
    this.onFocusedItemChanged = this._createActionByOption('onFocusedItemChanged');
    this.$element().addClass(COLLECTION_CLASS);
    this._prepareContent();
  }
  _prepareContent() {
    deferRenderer(() => {
      this._renderContentImpl();
    })();
  }
  _renderContent() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._fireContentReadyAction();
  }
  _render() {
    super._render();
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
  }
  _getPointerEvent() {
    return pointerEvents.down;
  }
  _attachClickEvent() {
    const itemSelector = this._itemSelector();
    const pointerEvent = this._getPointerEvent();
    // @ts-expect-error ts-error
    const clickEventNamespace = addNamespace(clickEventName, this.NAME);
    // @ts-expect-error ts-error
    const pointerEventNamespace = addNamespace(pointerEvent, this.NAME);
    const pointerAction = new Action(args => {
      const {
        event
      } = args;
      this._itemPointerDownHandler(event);
    });
    const clickEventCallback = e => this._itemClickHandler(e);
    const pointerEventCallback = e => {
      pointerAction.execute({
        element: $(e.target),
        event: e
      });
    };
    eventsEngine.off(this._itemContainer(), clickEventNamespace, itemSelector);
    eventsEngine.off(this._itemContainer(), pointerEventNamespace, itemSelector);
    eventsEngine.on(this._itemContainer(), clickEventNamespace, itemSelector, clickEventCallback);
    eventsEngine.on(this._itemContainer(), pointerEventNamespace, itemSelector, pointerEventCallback);
  }
  _itemClickHandler(e, args, config) {
    this._itemDXEventHandler(e, 'onItemClick', args, config);
  }
  _itemPointerDownHandler(e) {
    if (!this.option('focusStateEnabled')) {
      return;
    }
    this._itemFocusHandler = () => {
      clearTimeout(this._itemFocusTimeout);
      this._itemFocusHandler = undefined;
      if (e.isDefaultPrevented()) {
        return;
      }
      const $target = $(e.target);
      const $closestItem = $target.closest(this._itemElements());
      const $closestFocusable = this._closestFocusable($target);
      if ($closestItem.length && this._isFocusTarget($closestFocusable === null || $closestFocusable === void 0 ? void 0 : $closestFocusable.get(0))) {
        // NOTE: Selection here is already processed in click handler.
        this._shouldSkipSelectOnFocus = true;
        this.option('focusedElement', getPublicElement($closestItem));
        this._shouldSkipSelectOnFocus = false;
      }
    };
    // eslint-disable-next-line no-restricted-globals
    this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this));
  }
  _closestFocusable($target) {
    // @ts-expect-error ts-error
    if ($target.is(focusable)) {
      return $target;
    }
    let $nextTarget = $target.parent();
    while ($nextTarget.length && !domAdapter.isDocument($nextTarget.get(0)) && !domAdapter.isDocumentFragment($nextTarget.get(0))) {
      // @ts-expect-error ts-error
      if ($nextTarget.is(focusable)) {
        return $nextTarget;
      }
      $nextTarget = $nextTarget.parent();
    }
    return undefined;
  }
  _forcePointerDownFocus() {
    if (this._itemFocusHandler) {
      this._itemFocusHandler();
    }
  }
  _updateFocusState(e, isFocused) {
    super._updateFocusState(e, isFocused);
    this._forcePointerDownFocus();
  }
  _attachHoldEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    // @ts-expect-error ts-error
    const eventName = addNamespace(holdEvent.name, this.NAME);
    eventsEngine.off($itemContainer, eventName, itemSelector);
    eventsEngine.on($itemContainer, eventName, itemSelector, {
      timeout: this._getHoldTimeout()
    },
    // @ts-expect-error ts-error
    this._itemHoldHandler.bind(this));
  }
  _getHoldTimeout() {
    const {
      itemHoldTimeout
    } = this.option();
    return itemHoldTimeout;
  }
  _shouldFireHoldEvent() {
    return this.hasActionSubscription('onItemHold');
  }
  _itemHoldHandler(e) {
    if (this._shouldFireHoldEvent()) {
      this._itemDXEventHandler(e, 'onItemHold');
    } else {
      e.cancel = true;
    }
  }
  _attachContextMenuEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    // @ts-expect-error ts-error
    const eventName = addNamespace(contextMenuEventName, this.NAME);
    eventsEngine.off($itemContainer, eventName, itemSelector);
    eventsEngine.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this));
  }
  _shouldFireContextMenuEvent() {
    return this.hasActionSubscription('onItemContextMenu');
  }
  _itemContextMenuHandler(e) {
    if (this._shouldFireContextMenuEvent()) {
      this._itemDXEventHandler(e, 'onItemContextMenu');
    } else {
      e.cancel = true;
    }
  }
  _renderContentImpl() {
    const {
      items
    } = this.option();
    const itemsToRender = items ?? [];
    if (this._renderedItemsCount) {
      this._renderItems(itemsToRender.slice(this._renderedItemsCount));
    } else {
      this._renderItems(itemsToRender);
    }
  }
  _renderItems(items) {
    if (items.length) {
      each(items, (index, itemData) => {
        this._renderItem(this._renderedItemsCount + index, itemData);
      });
    }
    this._renderEmptyMessage();
  }
  _getItemsContainer() {
    return this._itemContainer();
  }
  _setAttributes($element) {
    const attributes = _extends({}, this.option('_itemAttributes'));
    // @ts-expect-error ts-error
    const {
      class: customClassValue
    } = attributes;
    if (customClassValue) {
      const currentClassValue = $element.get(0).className;
      // @ts-expect-error ts-error
      attributes.class = [currentClassValue, customClassValue].join(' ');
    }
    // @ts-expect-error ts-error
    $element.attr(attributes);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    // @ts-expect-error ts-error
    const itemIndex = (index === null || index === void 0 ? void 0 : index.item) ?? index;
    const $containerToRender = $container ?? this._getItemsContainer();
    const $itemFrame = this._renderItemFrame(itemIndex, itemData, $containerToRender, $itemToReplace);
    this._setElementData($itemFrame, itemData, itemIndex);
    this._setAttributes($itemFrame);
    this._attachItemClickEvent(itemData, $itemFrame);
    const $itemContent = this._getItemContent($itemFrame);
    const {
      itemTemplate
    } = this.option();
    const renderContentPromise = this._renderItemContent({
      index: itemIndex,
      itemData,
      container: getPublicElement($itemContent),
      contentClass: this._itemContentClass(),
      defaultTemplateName: itemTemplate
    });
    when(renderContentPromise).done($content => {
      this._postprocessRenderItem({
        itemElement: $itemFrame,
        itemContent: $content,
        itemData,
        itemIndex
      });
      // @ts-expect-error ts-error
      this._executeItemRenderAction(index, itemData, getPublicElement($itemFrame));
    });
    return $itemFrame;
  }
  _getItemContent($itemFrame) {
    const $itemContent = $itemFrame.find(`.${ITEM_CONTENT_PLACEHOLDER_CLASS}`);
    $itemContent.removeClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
    return $itemContent;
  }
  _attachItemClickEvent(itemData, $itemElement) {
    // @ts-expect-error ts-error
    if (!itemData || !itemData.onClick) {
      return;
    }
    eventsEngine.on($itemElement, clickEventName, e => {
      // @ts-expect-error ts-error
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
        event: e
      });
    });
  }
  _renderItemContent(args) {
    const itemTemplateName = this._getItemTemplateName(args);
    const itemTemplate = this._getTemplate(itemTemplateName);
    this._addItemContentClasses(args);
    const $templateResult = $(this._createItemByTemplate(itemTemplate, args));
    if (!$templateResult.hasClass(TEMPLATE_WRAPPER_CLASS)) {
      return args.container;
    }
    return this._renderItemContentByNode(args, $templateResult);
  }
  _renderItemContentByNode(args, $node) {
    $(args.container).replaceWith($node);
    args.container = getPublicElement($node);
    this._addItemContentClasses(args);
    return $node;
  }
  _addItemContentClasses(args) {
    const classes = [ITEM_CLASS + CONTENT_CLASS_POSTFIX, args.contentClass];
    $(args.container).addClass(classes.join(' '));
  }
  _appendItemToContainer($container, $itemFrame,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index) {
    $itemFrame.appendTo($container);
  }
  _renderItemFrame(index, itemData, $container, $itemToReplace) {
    const $itemFrame = $('<div>');
    // @ts-expect-error ts-error
    // eslint-disable-next-line no-new
    new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
    if ($itemToReplace !== null && $itemToReplace !== void 0 && $itemToReplace.length) {
      $itemToReplace.replaceWith($itemFrame);
    } else {
      this._appendItemToContainer.call(this, $container, $itemFrame, index);
    }
    if (this.option('useItemTextAsTitle')) {
      // @ts-expect-error ts-error
      const displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
      $itemFrame.attr('title', displayValue);
    }
    return $itemFrame;
  }
  _itemOptions() {
    return {
      watchMethod: () => this.option('integrationOptions.watchMethod'),
      owner: this,
      fieldGetter: field => {
        const expr = this.option(`${field}Expr`);
        // @ts-expect-error ts-error
        const getter = compileGetter(expr);
        return getter;
      }
    };
  }
  _postprocessRenderItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  args) {}
  _executeItemRenderAction(index, itemData, itemElement) {
    this._getItemRenderAction()({
      itemElement,
      itemIndex: index,
      itemData
    });
  }
  _setElementData(element, data, index) {
    element.addClass([ITEM_CLASS, this._itemClass()].join(' ')).data(this._itemDataKey(), data).data(this._itemIndexKey(), index);
  }
  _createItemRenderAction() {
    this._itemRenderAction = this._createActionByOption('onItemRendered', {
      element: this.element(),
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    return this._itemRenderAction;
  }
  _getItemRenderAction() {
    return this._itemRenderAction ?? this._createItemRenderAction();
  }
  _getItemTemplateName(args) {
    const data = args.itemData;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const templateProperty = args.templateProperty || this.option('itemTemplateProperty');
    // @ts-expect-error ts-error
    const template = data && data[templateProperty];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return template || args.defaultTemplateName;
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _createItemByTemplate(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  itemTemplate, renderArgs) {
    const {
      itemData,
      container,
      index
    } = renderArgs;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return itemTemplate.render({
      model: itemData,
      container,
      index,
      onRendered: this._onItemTemplateRendered(itemTemplate, renderArgs)
    });
  }
  _onItemTemplateRendered(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  itemTemplate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderArgs) {
    return () => {};
  }
  _emptyMessageContainer() {
    return this._itemContainer();
  }
  _renderEmptyMessage(rootNodes) {
    const items = rootNodes ?? this.option('items');
    const noDataText = this.option('noDataText');
    // @ts-expect-error ts-error
    const hideNoData = !noDataText || items && items.length || this._dataController.isLoading();
    if (hideNoData && this._$noData) {
      this._$noData.remove();
      // @ts-expect-error ts-error
      this._$noData = null;
      this.setAria('label', undefined);
    }
    if (!hideNoData) {
      this._$noData = this._$noData ?? $('<div>').addClass('dx-empty-message');
      this._$noData.appendTo(this._emptyMessageContainer());
      if (this.option('encodeNoDataText')) {
        // @ts-expect-error ts-error
        this._$noData.text(noDataText);
      } else {
        // @ts-expect-error ts-error
        this._$noData.html(noDataText);
      }
    }
    this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData);
  }
  _itemDXEventHandler(dxEvent, handlerOptionName, actionArgs, actionConfig) {
    this._itemEventHandler(dxEvent.target, handlerOptionName, extend(actionArgs, {
      event: dxEvent
    }), actionConfig);
  }
  _itemEventHandler(initiator, handlerOptionName, actionArgs, actionConfig) {
    const action = this._createActionByOption(handlerOptionName, extend({
      validatingTargetName: 'itemElement'
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerByHandler(initiator, handler, actionArgs, actionConfig) {
    const action = this._createAction(handler, extend({
      validatingTargetName: 'itemElement'
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerImpl(initiator, action, actionArgs) {
    const $itemElement = this._closestItemElement($(initiator));
    const args = extend({}, actionArgs);
    return action(extend(actionArgs, this._extendActionArgs($itemElement), args));
  }
  _extendActionArgs($itemElement) {
    return {
      itemElement: getPublicElement($itemElement),
      itemIndex: this._itemElements().index($itemElement),
      itemData: this._getItemData($itemElement)
    };
  }
  _closestItemElement($element) {
    return $($element).closest(this._itemSelector());
  }
  _getItemData(itemElement) {
    // @ts-expect-error ts-error
    return $(itemElement).data(this._itemDataKey());
  }
  _getSummaryItemsSize(dimension, items, includeMargin) {
    let result = 0;
    if (items) {
      each(items, (_, item) => {
        if (dimension === 'width') {
          result += getOuterWidth(item, includeMargin ?? false);
        } else if (dimension === 'height') {
          result += getOuterHeight(item, includeMargin ?? false);
        }
      });
    }
    return result;
  }
  getFocusedItemId() {
    if (!this._focusedItemId) {
      this._focusedItemId = `dx-${new Guid()}`;
    }
    return this._focusedItemId;
  }
  itemElements() {
    return this._itemElements();
  }
  itemsContainer() {
    return this._itemContainer();
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
CollectionWidget.include(DataHelperMixin);
// @ts-expect-error ts-error
CollectionWidget.ItemClass = CollectionWidgetItem;
export default CollectionWidget;
