/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.items_list.thumbnails.list_box.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _hold = _interopRequireDefault(require("../../events/hold"));
var _index = require("../../events/utils/index");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _bindable_template = require("../../core/templates/bindable_template");
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.edit"));
var _selection = _interopRequireDefault(require("../selection/selection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS = 'dx-filemanager-thumbnails-view-port';
var FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS = 'dx-filemanager-thumbnails-container';
var FILE_MANAGER_THUMBNAILS_ITEM_CLASS = 'dx-filemanager-thumbnails-item';
var FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS = 'dx-filemanager-thumbnails-item-name';
var FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS = 'dx-filemanager-thumbnails-item-spacer';
var FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY = 'dxFileManagerItemData';
var FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE = 'dxFileManagerThumbnailsListBox';
var FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME = (0, _index.addNamespace)(_hold.default.name, FILE_MANAGER_THUMBNAILS_LIST_BOX_NAMESPACE);
var FileManagerThumbnailListBox = /*#__PURE__*/function (_CollectionWidget) {
  _inheritsLoose(FileManagerThumbnailListBox, _CollectionWidget);
  function FileManagerThumbnailListBox() {
    return _CollectionWidget.apply(this, arguments) || this;
  }
  var _proto = FileManagerThumbnailListBox.prototype;
  _proto._initMarkup = function _initMarkup() {
    this._initActions();
    this._lockFocusedItemProcessing = false;
    this.$element().addClass(FILE_MANAGER_THUMBNAILS_VIEW_PORT_CLASS);
    this._renderScrollView();
    this._renderItemsContainer();
    this._createScrollViewControl();
    _CollectionWidget.prototype._initMarkup.call(this);
    this.onFocusedItemChanged = this._onFocusedItemChanged.bind(this);
    this._layoutUtils = new ListBoxLayoutUtils(this._scrollView, this.$element(), this._$itemContainer, this.itemElements().first());
    this._syncFocusedItemKey();
  };
  _proto._initActions = function _initActions() {
    this._actions = {
      onItemEnterKeyPressed: this._createActionByOption('onItemEnterKeyPressed'),
      onFocusedItemChanged: this._createActionByOption('onFocusedItemChanged')
    };
  };
  _proto._initTemplates = function _initTemplates() {
    _CollectionWidget.prototype._initTemplates.call(this);
    this._itemThumbnailTemplate = this.option('itemThumbnailTemplate');
    this._getTooltipText = this.option('getTooltipText');
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(function ($container, data, itemModel) {
        var $itemElement = this._getDefaultItemTemplate(itemModel, $container);
        $container.append($itemElement);
      }.bind(this), ['fileItem'], this.option('integrationOptions.watchMethod'))
    });
  };
  _proto._createScrollViewControl = function _createScrollViewControl() {
    if (!this._scrollView) {
      this._scrollView = this._createComponent(this._$scrollView, _scroll_view.default, {
        scrollByContent: true,
        scrollByThumb: true,
        useKeyboard: false,
        showScrollbar: 'onHover'
      });
    }
  };
  _proto._renderScrollView = function _renderScrollView() {
    if (!this._$scrollView) {
      this._$scrollView = (0, _renderer.default)('<div>').appendTo(this.$element());
    }
  };
  _proto.getScrollable = function getScrollable() {
    return this._scrollView;
  };
  _proto._renderItemsContainer = function _renderItemsContainer() {
    if (!this._$itemContainer) {
      this._$itemContainer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_LIST_CONTAINER_CLASS).appendTo(this._$scrollView);
    }
  };
  _proto._render = function _render() {
    _CollectionWidget.prototype._render.call(this);
    this._detachEventHandlers();
    this._attachEventHandlers();
  };
  _proto._clean = function _clean() {
    this._detachEventHandlers();
    _CollectionWidget.prototype._clean.call(this);
  };
  _proto._supportedKeys = function _supportedKeys() {
    return (0, _extend.extend)(_CollectionWidget.prototype._supportedKeys.call(this), {
      upArrow(e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(-1, false, e);
      },
      downArrow(e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(1, false, e);
      },
      home(e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(0, true, e);
      },
      end(e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(this._getItemsLength() - 1, true, e);
      },
      pageUp(e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(true, e);
      },
      pageDown(e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(false, e);
      },
      enter(e) {
        this._beforeKeyProcessing(e);
        this._actions.onItemEnterKeyPressed(this._getFocusedItem());
      },
      A(e) {
        this._beforeKeyProcessing(e);
        if ((0, _index.isCommandKeyPressed)(e)) {
          this.selectAll();
        }
      }
    });
  };
  _proto._beforeKeyProcessing = function _beforeKeyProcessing(e) {
    e.preventDefault();
    this._layoutUtils.reset();
  };
  _proto._processArrowKeys = function _processArrowKeys(offset, horizontal, eventArgs) {
    var item = this._getFocusedItem();
    if (item) {
      if (!horizontal) {
        var layout = this._layoutUtils.getLayoutModel();
        if (!layout) {
          return;
        }
        offset *= layout.itemPerRowCount;
      }
      var newItemIndex = this._getIndexByItem(item) + offset;
      this._focusItemByIndex(newItemIndex, true, eventArgs);
    }
  };
  _proto._processHomeEndKeys = function _processHomeEndKeys(index, scrollToItem, eventArgs) {
    this._focusItemByIndex(index, scrollToItem, eventArgs);
  };
  _proto._processPageChange = function _processPageChange(pageUp, eventArgs) {
    var item = this._getFocusedItem();
    if (!item) {
      return;
    }
    var layout = this._layoutUtils.getLayoutModel();
    if (!layout) {
      return;
    }
    var itemLayout = this._layoutUtils.createItemLayoutModel(this._getIndexByItem(item));
    var rowOffset = pageUp ? layout.rowPerPageRate : -layout.rowPerPageRate;
    var newRowRate = itemLayout.itemRowIndex - rowOffset;
    var roundFunc = pageUp ? Math.ceil : Math.floor;
    var newRowIndex = roundFunc(newRowRate);
    var newItemIndex = newRowIndex * layout.itemPerRowCount + itemLayout.itemColumnIndex;
    if (newItemIndex < 0) {
      newItemIndex = 0;
    } else if (newItemIndex >= this._getItemsLength()) {
      newItemIndex = this._getItemsLength() - 1;
    }
    this._focusItemByIndex(newItemIndex, true, eventArgs);
  };
  _proto._processLongTap = function _processLongTap(e) {
    var $targetItem = this._closestItemElement((0, _renderer.default)(e.target));
    var itemIndex = this._getIndexByItemElement($targetItem);
    this._selection.changeItemSelection(itemIndex, {
      control: true
    });
  };
  _proto._attachEventHandlers = function _attachEventHandlers() {
    var _this = this;
    if (this.option('selectionMode') === 'multiple') {
      _events_engine.default.on(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME, ".".concat(this._itemContentClass()), function (e) {
        _this._processLongTap(e);
        e.stopPropagation();
      });
    }
    _events_engine.default.on(this._itemContainer(), 'mousedown selectstart', function (e) {
      if (e.shiftKey) {
        e.preventDefault();
      }
    });
  };
  _proto._detachEventHandlers = function _detachEventHandlers() {
    _events_engine.default.off(this._itemContainer(), FILE_MANAGER_THUMBNAILS_LIST_BOX_HOLD_EVENT_NAME);
    _events_engine.default.off(this._itemContainer(), 'mousedown selectstart');
  };
  _proto._itemContainer = function _itemContainer() {
    return this._$itemContainer;
  };
  _proto._itemClass = function _itemClass() {
    return FILE_MANAGER_THUMBNAILS_ITEM_CLASS;
  };
  _proto._itemDataKey = function _itemDataKey() {
    return FILE_MANAGER_THUMBNAILS_ITEM_DATA_KEY;
  };
  _proto._getDefaultItemTemplate = function _getDefaultItemTemplate(fileItemInfo, $itemElement) {
    $itemElement.attr('title', this._getTooltipText(fileItemInfo));
    var $itemThumbnail = this._itemThumbnailTemplate(fileItemInfo);
    var $itemSpacer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_SPACER_CLASS);
    var $itemName = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_THUMBNAILS_ITEM_NAME_CLASS).text(fileItemInfo.fileItem.name);
    $itemElement.append($itemThumbnail, $itemSpacer, $itemName);
  };
  _proto._itemSelectHandler = function _itemSelectHandler(e) {
    var options = {};
    if (this.option('selectionMode') === 'multiple') {
      if (!this._isPreserveSelectionMode) {
        this._isPreserveSelectionMode = (0, _index.isCommandKeyPressed)(e) || e.shiftKey;
      }
      options = {
        control: this._isPreserveSelectionMode,
        shift: e.shiftKey
      };
    }
    var index = this._getIndexByItemElement(e.currentTarget);
    this._selection.changeItemSelection(index, options);
  };
  _proto._initSelectionModule = function _initSelectionModule() {
    var _this2 = this;
    _CollectionWidget.prototype._initSelectionModule.call(this);
    var options = (0, _extend.extend)(this._selection.options, {
      selectedKeys: this.option('selectedItemKeys'),
      onSelectionChanged: function onSelectionChanged(args) {
        _this2.option('selectedItems', _this2._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
        _this2._updateSelectedItems(args);
      }
    });
    this._selection = new _selection.default(options);
  };
  _proto._updateSelectedItems = function _updateSelectedItems(args) {
    var _this3 = this;
    var addedItemKeys = args.addedItemKeys;
    var removedItemKeys = args.removedItemKeys;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      var selectionChangePromise = this._selectionChangePromise;
      if (!this._rendering) {
        var addedSelection = [];
        var normalizedIndex;
        var removedSelection = [];
        this._editStrategy.beginCache();
        for (var i = 0; i < removedItemKeys.length; i++) {
          normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        for (var _i = 0; _i < addedItemKeys.length; _i++) {
          normalizedIndex = this._getIndexByKey(addedItemKeys[_i]);
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      (0, _deferred.when)(selectionChangePromise).done(function () {
        return _this3._fireSelectionChangeEvent(args);
      });
    }
  };
  _proto._fireSelectionChangeEvent = function _fireSelectionChangeEvent(args) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })(args);
  };
  _proto._updateSelection = function _updateSelection(addedSelection, removedSelection) {
    var selectedItemsCount = this.getSelectedItems().length;
    if (selectedItemsCount === 0) {
      this._isPreserveSelectionMode = false;
    }
  };
  _proto._normalizeSelectedItems = function _normalizeSelectedItems() {
    var newKeys = this._getKeysByItems(this.option('selectedItems'));
    var oldKeys = this._selection.getSelectedItemKeys();
    if (!this._compareKeys(oldKeys, newKeys)) {
      this._selection.setSelection(newKeys);
    }
    return new _deferred.Deferred().resolve().promise();
  };
  _proto._focusOutHandler = function _focusOutHandler() {};
  _proto._getItems = function _getItems() {
    return this.option('items') || [];
  };
  _proto._getItemsLength = function _getItemsLength() {
    return this._getItems().length;
  };
  _proto._getIndexByItemElement = function _getIndexByItemElement(itemElement) {
    return this._editStrategy.getNormalizedIndex(itemElement);
  };
  _proto._getItemByIndex = function _getItemByIndex(index) {
    return this._getItems()[index];
  };
  _proto._getFocusedItem = function _getFocusedItem() {
    return this.getItemByItemElement(this.option('focusedElement'));
  };
  _proto._focusItem = function _focusItem(item, scrollToItem) {
    this.option('focusedElement', this.getItemElementByItem(item));
    if (scrollToItem) {
      this._layoutUtils.scrollToItem(this._getIndexByItem(item));
    }
  };
  _proto._focusItemByIndex = function _focusItemByIndex(index, scrollToItem, eventArgs) {
    if (index >= 0 && index < this._getItemsLength()) {
      var item = this._getItemByIndex(index);
      this._focusItem(item, scrollToItem, eventArgs);
    }
  };
  _proto._syncFocusedItemKey = function _syncFocusedItemKey() {
    var _this4 = this;
    if (!this._syncFocusedItemKeyDeferred) {
      this._syncFocusedItemKeyDeferred = new _deferred.Deferred();
    }
    var deferred = this._syncFocusedItemKeyDeferred;
    if (this._dataSource && this._dataSource.isLoading()) {
      return deferred.promise();
    }
    var focusedItemKey = this.option('focusedItemKey');
    if ((0, _type.isDefined)(focusedItemKey)) {
      var items = this.option('items');
      var focusedItem = items.find(function (item) {
        return _this4.keyOf(item) === focusedItemKey;
      });
      if (focusedItem) {
        this._focusItem(focusedItem, true);
        deferred.resolve();
      } else {
        this.option('focusedItemKey', undefined);
        deferred.reject();
      }
    } else {
      deferred.resolve();
    }
    this._syncFocusedItemKeyDeferred = null;
    return deferred.promise();
  };
  _proto._onFocusedItemChanged = function _onFocusedItemChanged() {
    var focusedItem = this._getFocusedItem();
    var newFocusedItemKey = this.keyOf(focusedItem);
    var oldFocusedItemKey = this.option('focusedItemKey');
    if (newFocusedItemKey !== oldFocusedItemKey) {
      this._lockFocusedItemProcessing = true;
      this.option('focusedItemKey', newFocusedItemKey);
      this._lockFocusedItemProcessing = false;
      this._raiseFocusedItemChanged(focusedItem);
    }
  };
  _proto._raiseFocusedItemChanged = function _raiseFocusedItemChanged(focusedItem) {
    var args = {
      item: focusedItem,
      itemElement: this.option('focusedElement')
    };
    this._actions.onFocusedItemChanged(args);
  };
  _proto._changeItemSelection = function _changeItemSelection(item, select) {
    if (this.isItemSelected(item) === select) {
      return;
    }
    var itemElement = this.getItemElementByItem(item);
    var index = this._getIndexByItemElement(itemElement);
    this._selection.changeItemSelection(index, {
      control: this._isPreserveSelectionMode
    });
  };
  _proto._chooseSelectOption = function _chooseSelectOption() {
    return 'selectedItemKeys';
  };
  _proto.getSelectedItems = function getSelectedItems() {
    return this._selection.getSelectedItems();
  };
  _proto.getItemElementByItem = function getItemElementByItem(item) {
    return this._editStrategy.getItemElement(item);
  };
  _proto.getItemByItemElement = function getItemByItemElement(itemElement) {
    return this._getItemByIndex(this._getIndexByItemElement(itemElement));
  };
  _proto.selectAll = function selectAll() {
    if (this.option('selectionMode') !== 'multiple') return;
    this._selection.selectAll();
    this._isPreserveSelectionMode = true;
  };
  _proto.selectItem = function selectItem(item) {
    this._changeItemSelection(item, true);
  };
  _proto.deselectItem = function deselectItem(item) {
    this._changeItemSelection(item, false);
  };
  _proto.clearSelection = function clearSelection() {
    this._selection.deselectAll();
  };
  _proto._optionChanged = function _optionChanged(args) {
    var _this5 = this;
    switch (args.name) {
      case 'items':
        if (this._layoutUtils) {
          this._layoutUtils.updateItems(this.itemElements().first());
        }
        _CollectionWidget.prototype._optionChanged.call(this, args);
        break;
      case 'focusedItemKey':
        if (this._lockFocusedItemProcessing) {
          break;
        }
        if ((0, _type.isDefined)(args.value)) {
          this._syncFocusedItemKey().done(function () {
            var focusedItem = _this5._getFocusedItem();
            _this5._raiseFocusedItemChanged(focusedItem);
          });
        } else {
          this.option('focusedElement', null);
          this._raiseFocusedItemChanged(null);
        }
        break;
      case 'onItemEnterKeyPressed':
      case 'onFocusedItemChanged':
        this._actions[args.name] = this._createActionByOption(args.name);
        break;
      default:
        _CollectionWidget.prototype._optionChanged.call(this, args);
    }
  };
  return FileManagerThumbnailListBox;
}(_uiCollection_widget.default);
var ListBoxLayoutUtils = /*#__PURE__*/function () {
  function ListBoxLayoutUtils(scrollView, $viewPort, $itemContainer, $item) {
    this._layoutModel = null;
    this._scrollView = scrollView;
    this._$viewPort = $viewPort;
    this._$itemContainer = $itemContainer;
    this._$item = $item;
  }
  var _proto2 = ListBoxLayoutUtils.prototype;
  _proto2.updateItems = function updateItems($item) {
    this._$item = $item;
  };
  _proto2.reset = function reset() {
    this._layoutModel = null;
  };
  _proto2.getLayoutModel = function getLayoutModel() {
    if (!this._layoutModel) {
      this._layoutModel = this._createLayoutModel();
    }
    return this._layoutModel;
  };
  _proto2._createLayoutModel = function _createLayoutModel() {
    if (!this._$item) {
      return null;
    }
    var itemWidth = (0, _size.getOuterWidth)(this._$item, true);
    if (itemWidth === 0) {
      return null;
    }
    var itemHeight = (0, _size.getOuterHeight)(this._$item, true);
    var viewPortWidth = (0, _size.getInnerWidth)(this._$itemContainer);
    var viewPortHeight = (0, _size.getInnerHeight)(this._$viewPort);
    var viewPortScrollTop = this._scrollView.scrollTop();
    var viewPortScrollBottom = viewPortScrollTop + viewPortHeight;
    var itemPerRowCount = Math.floor(viewPortWidth / itemWidth);
    var rowPerPageRate = viewPortHeight / itemHeight;
    return {
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      viewPortWidth: viewPortWidth,
      viewPortHeight: viewPortHeight,
      viewPortScrollTop: viewPortScrollTop,
      viewPortScrollBottom: viewPortScrollBottom,
      itemPerRowCount: itemPerRowCount,
      rowPerPageRate: rowPerPageRate
    };
  };
  _proto2.createItemLayoutModel = function createItemLayoutModel(index) {
    var layout = this.getLayoutModel();
    if (!layout) {
      return null;
    }
    var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
    var itemColumnIndex = index % layout.itemPerRowCount;
    var itemTop = itemRowIndex * layout.itemHeight;
    var itemBottom = itemTop + layout.itemHeight;
    return {
      itemRowIndex: itemRowIndex,
      itemColumnIndex: itemColumnIndex,
      itemTop: itemTop,
      itemBottom: itemBottom
    };
  };
  _proto2.scrollToItem = function scrollToItem(index) {
    var layout = this.getLayoutModel();
    if (!layout) {
      return;
    }
    var itemRowIndex = Math.floor(index / layout.itemPerRowCount);
    var itemTop = itemRowIndex * layout.itemHeight;
    var itemBottom = itemTop + layout.itemHeight;
    var newScrollTop = layout.viewPortScrollTop;
    if (itemTop < layout.viewPortScrollTop) {
      newScrollTop = itemTop;
    } else if (itemBottom > layout.viewPortScrollBottom) {
      newScrollTop = itemBottom - layout.viewPortHeight;
    }
    this._scrollView.scrollTo(newScrollTop);
  };
  return ListBoxLayoutUtils;
}();
var _default = FileManagerThumbnailListBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
