import { getHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
import eventsEngine from '../../events/core/events_engine';
import messageLocalization from '../../localization/message';
import { name as clickEventName } from '../../events/click';
import { asyncNoop, noop } from '../../core/utils/common';
import { hasWindow } from '../../core/utils/window';
import { isDefined, isPrimitive, isFunction, isString } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { getPublicElement } from '../../core/element';
import CheckBox from '../check_box';
import HierarchicalCollectionWidget from '../hierarchical_collection/ui.hierarchical_collection_widget';
import { addNamespace } from '../../events/utils/index';
import pointerEvents from '../../events/pointer';
import { name as dblclickEvent } from '../../events/double_click';
import fx from '../../animation/fx';
import Scrollable from '../scroll_view/ui.scrollable';
import LoadIndicator from '../load_indicator';
import { fromPromise, Deferred, when } from '../../core/utils/deferred';
import { nativeScrolling } from '../../core/utils/support';
import { getRelativeOffset } from '../../renovation/ui/scroll_view/utils/get_relative_offset';
import { SCROLLABLE_CONTENT_CLASS, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from '../../renovation/ui/scroll_view/common/consts';
import { getImageContainer } from '../../core/utils/icon';
var WIDGET_CLASS = 'dx-treeview';
var NODE_CLASS = "".concat(WIDGET_CLASS, "-node");
var NODE_CONTAINER_CLASS = "".concat(NODE_CLASS, "-container");
var NODE_LOAD_INDICATOR_CLASS = "".concat(NODE_CLASS, "-loadindicator");
var OPENED_NODE_CONTAINER_CLASS = "".concat(NODE_CLASS, "-container-opened");
var IS_LEAF = "".concat(NODE_CLASS, "-is-leaf");
var ITEM_CLASS = "".concat(WIDGET_CLASS, "-item");
var ITEM_WITH_CHECKBOX_CLASS = "".concat(ITEM_CLASS, "-with-checkbox");
var ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS = "".concat(ITEM_CLASS, "-with-custom-expander-icon");
var CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS = "".concat(WIDGET_CLASS, "-custom-expander-icon-item-container");
var ITEM_WITHOUT_CHECKBOX_CLASS = "".concat(ITEM_CLASS, "-without-checkbox");
var ITEM_DATA_KEY = "".concat(ITEM_CLASS, "-data");
var TOGGLE_ITEM_VISIBILITY_CLASS = "".concat(WIDGET_CLASS, "-toggle-item-visibility");
var CUSTOM_COLLAPSE_ICON_CLASS = "".concat(WIDGET_CLASS, "-custom-collapse-icon");
var CUSTOM_EXPAND_ICON_CLASS = "".concat(WIDGET_CLASS, "-custom-expand-icon");
var LOAD_INDICATOR_CLASS = "".concat(WIDGET_CLASS, "-loadindicator");
var LOAD_INDICATOR_WRAPPER_CLASS = "".concat(WIDGET_CLASS, "-loadindicator-wrapper");
var TOGGLE_ITEM_VISIBILITY_OPENED_CLASS = "".concat(WIDGET_CLASS, "-toggle-item-visibility-opened");
var SELECT_ALL_ITEM_CLASS = "".concat(WIDGET_CLASS, "-select-all-item");
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var DISABLED_STATE_CLASS = 'dx-state-disabled';
var SELECTED_ITEM_CLASS = 'dx-state-selected';
var EXPAND_EVENT_NAMESPACE = 'dxTreeView_expand';
var DATA_ITEM_ID = 'data-item-id';
var ITEM_URL_CLASS = 'dx-item-url';
var TreeViewBase = HierarchicalCollectionWidget.inherit({
  _supportedKeys: function _supportedKeys(e) {
    var click = e => {
      var $itemElement = $(this.option('focusedElement'));
      if (!$itemElement.length) {
        return;
      }
      e.target = $itemElement;
      e.currentTarget = $itemElement;
      this._itemClickHandler(e, $itemElement.children('.' + ITEM_CLASS));
      var expandEventName = this._getEventNameByOption(this.option('expandEvent'));
      var expandByClick = expandEventName === addNamespace(clickEventName, EXPAND_EVENT_NAMESPACE);
      if (expandByClick) {
        this._expandEventHandler(e);
      }
    };
    var select = e => {
      e.preventDefault();
      var $focusedElement = $(this.option('focusedElement'));
      var checkboxInstance = this._getCheckBoxInstance($focusedElement);
      if (!checkboxInstance.option('disabled')) {
        var currentState = checkboxInstance.option('value');
        this._updateItemSelection(!currentState, $focusedElement.find('.' + ITEM_CLASS).get(0), true);
      }
    };
    var toggleExpandedNestedItems = function toggleExpandedNestedItems(state, e) {
      if (!this.option('expandAllEnabled')) {
        return;
      }
      e.preventDefault();
      var $rootElement = $(this.option('focusedElement'));
      if (!$rootElement.length) {
        return;
      }
      var rootItem = this._getItemData($rootElement.find(".".concat(ITEM_CLASS)));
      this._toggleExpandedNestedItems([rootItem], state);
    };
    return extend(this.callBase(), {
      enter: this._showCheckboxes() ? select : click,
      space: this._showCheckboxes() ? select : click,
      asterisk: toggleExpandedNestedItems.bind(this, true),
      minus: toggleExpandedNestedItems.bind(this, false)
    });
  },
  _toggleExpandedNestedItems: function _toggleExpandedNestedItems(items, state) {
    if (!items) {
      return;
    }
    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var node = this._dataAdapter.getNodeByItem(item);
      this._toggleExpandedState(node, state);
      this._toggleExpandedNestedItems(item.items, state);
    }
  },
  _getNodeElement: function _getNodeElement(node, cache) {
    var key = this._encodeString(node.internalFields.key);
    if (cache) {
      if (!cache.$nodeByKey) {
        cache.$nodeByKey = {};
        this.$element().find(".".concat(NODE_CLASS)).each(function () {
          var $node = $(this);
          var key = $node.attr(DATA_ITEM_ID);
          cache.$nodeByKey[key] = $node;
        });
      }
      return cache.$nodeByKey[key] || $();
    }
    var element = this.$element().get(0).querySelector("[".concat(DATA_ITEM_ID, "=\"").concat(key, "\"]"));
    return $(element);
  },
  _activeStateUnit: '.' + ITEM_CLASS,
  _widgetClass: function _widgetClass() {
    return WIDGET_CLASS;
  },
  _getDefaultOptions: function _getDefaultOptions() {
    var defaultOptions = extend(this.callBase(), {
      animationEnabled: true,
      dataStructure: 'tree',
      deferRendering: true,
      expandAllEnabled: false,
      hasItemsExpr: 'hasItems',
      selectNodesRecursive: true,
      expandNodesRecursive: true,
      showCheckBoxesMode: 'none',
      expandIcon: null,
      collapseIcon: null,
      selectAllText: messageLocalization.format('dxList-selectAll'),
      onItemSelectionChanged: null,
      onItemExpanded: null,
      onItemCollapsed: null,
      scrollDirection: 'vertical',
      useNativeScrolling: true,
      virtualModeEnabled: false,
      rootValue: 0,
      focusStateEnabled: false,
      selectionMode: 'multiple',
      expandEvent: 'dblclick',
      selectByClick: false,
      createChildren: null,
      onSelectAllValueChanged: null

      /**
      * @name dxTreeViewOptions.selectedItem
      * @hidden
      */
      /**
      * @name dxTreeViewOptions.selectedItems
      * @hidden
      */
      /**
      * @name dxTreeViewOptions.selectedItemKeys
      * @hidden
      */
      /**
      * @name dxTreeViewOptions.selectedIndex
      * @hidden
      */
    });

    return extend(true, defaultOptions, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return !nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }]);
  },
  // TODO: implement these functions
  _initSelectedItems: noop,
  _syncSelectionOptions: asyncNoop,
  _fireSelectionChanged: function _fireSelectionChanged() {
    var selectionChangePromise = this._selectionChangePromise;
    when(selectionChangePromise).done(function () {
      this._createActionByOption('onSelectionChanged', {
        excludeValidators: ['disabled', 'readOnly']
      })();
    }.bind(this));
  },
  _createSelectAllValueChangedAction: function _createSelectAllValueChangedAction() {
    this._selectAllValueChangedAction = this._createActionByOption('onSelectAllValueChanged', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  _fireSelectAllValueChanged: function _fireSelectAllValueChanged(value) {
    this._selectAllValueChangedAction({
      value: value
    });
  },
  _checkBoxModeChange: function _checkBoxModeChange(value, previousValue) {
    if (previousValue === 'none' || value === 'none') {
      return;
    }
    var selectAllExists = this._$selectAllItem && this._$selectAllItem.length;
    switch (value) {
      case 'selectAll':
        if (!selectAllExists) {
          this._createSelectAllValueChangedAction();
          this._renderSelectAllItem();
        }
        break;
      case 'normal':
        if (selectAllExists) {
          this._$selectAllItem.remove();
          delete this._$selectAllItem;
        }
        break;
    }
  },
  _removeSelection: function _removeSelection() {
    var that = this;
    each(this._dataAdapter.getFullData(), function (_, node) {
      if (!that._hasChildren(node)) {
        return;
      }
      that._dataAdapter.toggleSelection(node.internalFields.key, false, true);
    });
  },
  _optionChanged: function _optionChanged(args) {
    var {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'selectAllText':
        if (this._$selectAllItem) {
          this._$selectAllItem.dxCheckBox('instance').option('text', value);
        }
        break;
      case 'showCheckBoxesMode':
        this._checkBoxModeChange(value, previousValue);
        this._invalidate();
        break;
      case 'scrollDirection':
        this.getScrollable().option('direction', value);
        break;
      case 'useNativeScrolling':
        this.getScrollable().option('useNative', value);
        break;
      case 'items':
        delete this._$selectAllItem;
        this.callBase(args);
        break;
      case 'dataSource':
        this.callBase(args);
        this._initDataAdapter();
        this._filter = {};
        break;
      case 'hasItemsExpr':
        this._initAccessors();
        this.repaint();
        break;
      case 'expandEvent':
        this._initExpandEvent();
        break;
      case 'deferRendering':
      case 'dataStructure':
      case 'rootValue':
      case 'createChildren':
      case 'expandNodesRecursive':
      case 'onItemSelectionChanged':
      case 'onItemExpanded':
      case 'onItemCollapsed':
      case 'expandAllEnabled':
      case 'animationEnabled':
      case 'virtualModeEnabled':
      case 'selectByClick':
        break;
      case 'selectionMode':
        this._initDataAdapter();
        this.callBase(args);
        break;
      case 'onSelectAllValueChanged':
        this._createSelectAllValueChangedAction();
        break;
      case 'selectNodesRecursive':
        this._dataAdapter.setOption('recursiveSelection', args.value);
        this.repaint();
        break;
      case 'expandIcon':
      case 'collapseIcon':
        this.repaint();
        break;
      default:
        this.callBase(args);
    }
  },
  _initDataSource: function _initDataSource() {
    if (this._useCustomChildrenLoader()) {
      this._loadChildrenByCustomLoader(null).done(function (newItems) {
        if (newItems && newItems.length) {
          this.option('items', newItems);
        }
      }.bind(this));
    } else {
      this.callBase();
      this._isVirtualMode() && this._initVirtualMode();
    }
  },
  _initVirtualMode: function _initVirtualMode() {
    var filter = this._filter;
    if (!filter.custom) {
      filter.custom = this._dataSource.filter();
    }
    if (!filter.internal) {
      filter.internal = [this.option('parentIdExpr'), this.option('rootValue')];
    }
  },
  _useCustomChildrenLoader: function _useCustomChildrenLoader() {
    return isFunction(this.option('createChildren')) && this._isDataStructurePlain();
  },
  _loadChildrenByCustomLoader: function _loadChildrenByCustomLoader(parentNode) {
    var invocationResult = this.option('createChildren').call(this, parentNode);
    if (Array.isArray(invocationResult)) {
      return new Deferred().resolve(invocationResult).promise();
    }
    if (invocationResult && isFunction(invocationResult.then)) {
      return fromPromise(invocationResult);
    }
    return new Deferred().resolve([]).promise();
  },
  _combineFilter: function _combineFilter() {
    if (!this._filter.custom || !this._filter.custom.length) {
      return this._filter.internal;
    }
    return [this._filter.custom, this._filter.internal];
  },
  _dataSourceLoadErrorHandler: function _dataSourceLoadErrorHandler() {
    this._renderEmptyMessage();
  },
  _init: function _init() {
    this._filter = {};
    this.callBase();
    this._initStoreChangeHandlers();
  },
  _dataSourceChangedHandler: function _dataSourceChangedHandler(newItems) {
    var items = this.option('items');
    if (this._initialized && this._isVirtualMode() && items.length) {
      return;
    }
    this.option('items', newItems);
  },
  _removeTreeViewLoadIndicator: function _removeTreeViewLoadIndicator() {
    if (!this._treeViewLoadIndicator) return;
    this._treeViewLoadIndicator.remove();
    this._treeViewLoadIndicator = null;
  },
  _createTreeViewLoadIndicator: function _createTreeViewLoadIndicator() {
    this._treeViewLoadIndicator = $('<div>').addClass(LOAD_INDICATOR_CLASS);
    this._createComponent(this._treeViewLoadIndicator, LoadIndicator, {});
    return this._treeViewLoadIndicator;
  },
  _dataSourceLoadingChangedHandler: function _dataSourceLoadingChangedHandler(isLoading) {
    var resultFilter;
    if (this._isVirtualMode()) {
      resultFilter = this._combineFilter();
      this._dataSource.filter(resultFilter);
    }
    if (isLoading && !this._dataSource.isLoaded()) {
      this.option('items', []);
      var $wrapper = $('<div>').addClass(LOAD_INDICATOR_WRAPPER_CLASS);
      this._createTreeViewLoadIndicator().appendTo($wrapper);
      this.itemsContainer().append($wrapper);
      if (this._isVirtualMode() && this._dataSource.filter() !== resultFilter) {
        this._dataSource.filter([]);
      }
    } else {
      this._removeTreeViewLoadIndicator();
    }
  },
  _initStoreChangeHandlers: function _initStoreChangeHandlers() {
    if (this.option('dataStructure') !== 'plain') {
      return;
    }
    this._dataSource && this._dataSource.store().on('inserted', newItem => {
      this.option().items = this.option('items').concat(newItem);
      this._dataAdapter.addItem(newItem);
      if (!this._dataAdapter.isFiltered(newItem)) {
        return;
      }
      this._updateLevel(this._parentIdGetter(newItem));
    }).on('removed', removedKey => {
      var node = this._dataAdapter.getNodeByKey(removedKey);
      if (isDefined(node)) {
        this.option('items')[this._dataAdapter.getIndexByKey(node.internalFields.key)] = 0;
        this._markChildrenItemsToRemove(node);
        this._removeItems();
        this._dataAdapter.removeItem(removedKey);
        this._updateLevel(this._parentIdGetter(node));
      }
    });
  },
  _markChildrenItemsToRemove: function _markChildrenItemsToRemove(node) {
    var keys = node.internalFields.childrenKeys;
    each(keys, (_, key) => {
      this.option('items')[this._dataAdapter.getIndexByKey(key)] = 0;
      this._markChildrenItemsToRemove(this._dataAdapter.getNodeByKey(key));
    });
  },
  _removeItems: function _removeItems() {
    var items = extend(true, [], this.option('items'));
    var counter = 0;
    each(items, (index, item) => {
      if (!item) {
        this.option('items').splice(index - counter, 1);
        counter++;
      }
    });
  },
  _updateLevel: function _updateLevel(parentId) {
    var $container = this._getContainerByParentKey(parentId);
    this._renderItems($container, this._dataAdapter.getChildrenNodes(parentId));
  },
  _getOldContainer: function _getOldContainer($itemElement) {
    if ($itemElement.length) {
      return $itemElement.children(".".concat(NODE_CONTAINER_CLASS));
    }
    var scrollable = this.getScrollable();
    if (scrollable) {
      return $(scrollable.content()).children();
    }
    return $();
  },
  _getContainerByParentKey: function _getContainerByParentKey(parentId) {
    var node = this._dataAdapter.getNodeByKey(parentId);
    var $itemElement = node ? this._getNodeElement(node) : [];
    this._getOldContainer($itemElement).remove();
    var $container = this._renderNodeContainer($itemElement);
    if (this._isRootLevel(parentId)) {
      var scrollable = this.getScrollable();
      if (!scrollable) {
        this._renderScrollableContainer();
      }
      $(scrollable.content()).append($container);
    }
    return $container;
  },
  _isRootLevel: function _isRootLevel(parentId) {
    return parentId === this.option('rootValue');
  },
  _getAccessors: function _getAccessors() {
    var accessors = this.callBase();
    accessors.push('hasItems');
    return accessors;
  },
  _getDataAdapterOptions: function _getDataAdapterOptions() {
    var _this$_dataSource, _this$_dataSource$loa, _this$_dataSource$loa2;
    return {
      rootValue: this.option('rootValue'),
      multipleSelection: !this._isSingleSelection(),
      recursiveSelection: this._isRecursiveSelection(),
      recursiveExpansion: this.option('expandNodesRecursive'),
      selectionRequired: this.option('selectionRequired'),
      dataType: this.option('dataStructure'),
      sort: this._dataSource && this._dataSource.sort(),
      langParams: (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : (_this$_dataSource$loa = _this$_dataSource.loadOptions) === null || _this$_dataSource$loa === void 0 ? void 0 : (_this$_dataSource$loa2 = _this$_dataSource$loa.call(_this$_dataSource)) === null || _this$_dataSource$loa2 === void 0 ? void 0 : _this$_dataSource$loa2.langParams
    };
  },
  _initMarkup: function _initMarkup() {
    this._renderScrollableContainer();
    this._renderEmptyMessage(this._dataAdapter.getRootNodes());
    this.callBase();
    this.setAria('role', 'tree');
  },
  _renderContentImpl: function _renderContentImpl() {
    var $nodeContainer = this._renderNodeContainer();
    $(this.getScrollable().content()).append($nodeContainer);
    if (!this.option('items') || !this.option('items').length) {
      return;
    }
    this._renderItems($nodeContainer, this._dataAdapter.getRootNodes());
    this._initExpandEvent();
    if (this._selectAllEnabled()) {
      this._createSelectAllValueChangedAction();
      this._renderSelectAllItem($nodeContainer);
    }
  },
  _isVirtualMode: function _isVirtualMode() {
    return this.option('virtualModeEnabled') && this._isDataStructurePlain() && !!this.option('dataSource');
  },
  _isDataStructurePlain: function _isDataStructurePlain() {
    return this.option('dataStructure') === 'plain';
  },
  _fireContentReadyAction: function _fireContentReadyAction() {
    var dataSource = this.getDataSource();
    var skipContentReadyAction = dataSource && !dataSource.isLoaded() || this._skipContentReadyAndItemExpanded;
    var scrollable = this.getScrollable();
    if (scrollable && hasWindow()) {
      scrollable.update();
    }
    if (!skipContentReadyAction) {
      this.callBase();
    }
    if (scrollable && hasWindow()) {
      scrollable.update();
    }
  },
  _renderScrollableContainer: function _renderScrollableContainer() {
    this._scrollable = this._createComponent($('<div>').appendTo(this.$element()), Scrollable, {
      useNative: this.option('useNativeScrolling'),
      direction: this.option('scrollDirection'),
      useKeyboard: false
    });
  },
  _renderNodeContainer: function _renderNodeContainer($parent) {
    var $container = $('<ul>').addClass(NODE_CONTAINER_CLASS);
    this.setAria('role', 'group', $container);
    if ($parent && $parent.length) {
      var itemData = this._getItemData($parent.children('.' + ITEM_CLASS));
      if (this._expandedGetter(itemData)) {
        $container.addClass(OPENED_NODE_CONTAINER_CLASS);
      }
      $container.appendTo($parent);
    }
    return $container;
  },
  _createDOMElement: function _createDOMElement($nodeContainer, node) {
    var _node$internalFields, _node$internalFields$;
    var $node = $('<li>').addClass(NODE_CLASS).attr(DATA_ITEM_ID, this._encodeString(node.internalFields.key)).prependTo($nodeContainer);
    var attrs = {
      'role': 'treeitem',
      'label': this._displayGetter(node.internalFields.item) || '',
      'level': this._getLevel($nodeContainer)
    };
    var hasChildNodes = !!(node !== null && node !== void 0 && (_node$internalFields = node.internalFields) !== null && _node$internalFields !== void 0 && (_node$internalFields$ = _node$internalFields.childrenKeys) !== null && _node$internalFields$ !== void 0 && _node$internalFields$.length);
    if (hasChildNodes) {
      attrs.expanded = node.internalFields.expanded || false;
    }
    this.setAria(attrs, $node);
    return $node;
  },
  _getLevel: function _getLevel($nodeContainer) {
    var parent = $nodeContainer.parent();
    return parent.hasClass('dx-scrollable-content') ? 1 : parseInt(parent.attr('aria-level')) + 1;
  },
  _showCheckboxes: function _showCheckboxes() {
    return this.option('showCheckBoxesMode') !== 'none';
  },
  _hasCustomExpanderIcons: function _hasCustomExpanderIcons() {
    return this.option('expandIcon') || this.option('collapseIcon');
  },
  _selectAllEnabled: function _selectAllEnabled() {
    return this.option('showCheckBoxesMode') === 'selectAll' && !this._isSingleSelection();
  },
  _renderItems: function _renderItems($nodeContainer, nodes) {
    var length = nodes.length - 1;
    for (var i = length; i >= 0; i--) {
      this._renderItem(i, nodes[i], $nodeContainer);
    }
    this._renderedItemsCount += nodes.length;
  },
  _renderItem: function _renderItem(nodeIndex, node, $nodeContainer) {
    var $node = this._createDOMElement($nodeContainer, node);
    var nodeData = node.internalFields;
    var showCheckBox = this._showCheckboxes();
    $node.addClass(showCheckBox ? ITEM_WITH_CHECKBOX_CLASS : ITEM_WITHOUT_CHECKBOX_CLASS);
    $node.toggleClass(INVISIBLE_STATE_CLASS, nodeData.item.visible === false);
    if (this._hasCustomExpanderIcons()) {
      $node.addClass(ITEM_WITH_CUSTOM_EXPANDER_ICON_CLASS);
      $nodeContainer.addClass(CUSTOM_EXPANDER_ICON_ITEM_CONTAINER_CLASS);
    }
    showCheckBox && this._renderCheckBox($node, node);
    this.setAria('selected', nodeData.selected, $node);
    this._toggleSelectedClass($node, nodeData.selected);
    if (nodeData.disabled) {
      this.setAria('disabled', nodeData.disabled, $node);
    }
    this.callBase(this._renderedItemsCount + nodeIndex, nodeData.item, $node);
    if (nodeData.item.visible !== false) {
      this._renderChildren($node, node);
    }
  },
  _setAriaSelectionAttribute: noop,
  _renderChildren: function _renderChildren($node, node) {
    if (!this._hasChildren(node)) {
      this._addLeafClass($node);
      return;
    }
    if (this._hasCustomExpanderIcons()) {
      this._renderCustomExpanderIcons($node, node);
    } else {
      this._renderDefaultExpanderIcons($node, node);
    }
    if (this.option('deferRendering') && !node.internalFields.expanded) {
      return;
    }
    this._loadSublevel(node).done(childNodes => {
      this._renderSublevel($node, this._getActualNode(node), childNodes);
    });
  },
  _getActualNode: function _getActualNode(cachedNode) {
    return this._dataAdapter.getNodeByKey(cachedNode.internalFields.key);
  },
  _hasChildren: function _hasChildren(node) {
    if (this._isVirtualMode() || this._useCustomChildrenLoader()) {
      return this._hasItemsGetter(node.internalFields.item) !== false;
    }
    return this.callBase(node);
  },
  _loadSublevel: function _loadSublevel(node) {
    var deferred = new Deferred();
    var childrenNodes = this._getChildNodes(node);
    if (childrenNodes.length) {
      deferred.resolve(childrenNodes);
    } else {
      this._loadNestedItems(node).done(items => {
        deferred.resolve(this._dataAdapter.getNodesByItems(items));
      });
    }
    return deferred.promise();
  },
  _getItemExtraPropNames() {
    return ['url', 'linkAttr'];
  },
  _addContent: function _addContent($container, itemData) {
    var {
      html,
      url
    } = itemData;
    if (url) {
      $container.html(html);
      var link = this._getLinkContainer(this._getIconContainer(itemData), this._getTextContainer(itemData), itemData);
      $container.append(link);
    } else {
      this.callBase($container, itemData);
    }
  },
  _renderSublevel: function _renderSublevel($node, node, childNodes) {
    var $nestedNodeContainer = this._renderNodeContainer($node, node);
    var childNodesByChildrenKeys = childNodes.filter(childNode => {
      return node.internalFields.childrenKeys.indexOf(childNode.internalFields.key) !== -1;
    });
    this._renderItems($nestedNodeContainer, childNodesByChildrenKeys);
    if (childNodesByChildrenKeys.length && !node.internalFields.selected) {
      var firstChild = childNodesByChildrenKeys[0];
      this._updateParentsState(firstChild, this._getNodeElement(firstChild));
    }
    this._normalizeIconState($node, childNodesByChildrenKeys.length);
    if (node.internalFields.expanded) {
      $nestedNodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    }
  },
  _executeItemRenderAction: function _executeItemRenderAction(itemIndex, itemData, itemElement) {
    var node = this._getNode(itemElement);
    this._getItemRenderAction()({
      itemElement: itemElement,
      itemIndex: itemIndex,
      itemData: itemData,
      node: this._dataAdapter.getPublicNode(node)
    });
  },
  _addLeafClass: function _addLeafClass($node) {
    $node.addClass(IS_LEAF);
  },
  _expandEventHandler: function _expandEventHandler(e) {
    var $nodeElement = $(e.currentTarget.parentNode);
    if (!$nodeElement.hasClass(IS_LEAF)) {
      this._toggleExpandedState(e.currentTarget, undefined, e);
    }
  },
  _initExpandEvent: function _initExpandEvent() {
    var expandedEventName = this._getEventNameByOption(this.option('expandEvent'));
    var $itemsContainer = this._itemContainer();
    var itemSelector = this._itemSelector();
    eventsEngine.off($itemsContainer, '.' + EXPAND_EVENT_NAMESPACE, itemSelector);
    eventsEngine.on($itemsContainer, expandedEventName, itemSelector, this._expandEventHandler.bind(this));
  },
  _getEventNameByOption: function _getEventNameByOption(name) {
    var event = name === 'click' ? clickEventName : dblclickEvent;
    return addNamespace(event, EXPAND_EVENT_NAMESPACE);
  },
  _getNode: function _getNode(identifier) {
    if (!isDefined(identifier)) {
      return null;
    }
    if (identifier.internalFields) {
      return identifier;
    }
    if (isPrimitive(identifier)) {
      return this._dataAdapter.getNodeByKey(identifier);
    }
    var itemElement = $(identifier).get(0);
    if (!itemElement) {
      return null;
    }
    if (domAdapter.isElementNode(itemElement)) {
      return this._getNodeByElement(itemElement);
    }
    return this._dataAdapter.getNodeByItem(itemElement);
  },
  _getNodeByElement: function _getNodeByElement(itemElement) {
    var $node = $(itemElement).closest('.' + NODE_CLASS);
    var key = this._decodeString($node.attr(DATA_ITEM_ID));
    return this._dataAdapter.getNodeByKey(key);
  },
  _toggleExpandedState: function _toggleExpandedState(itemElement, state, e) {
    var node = this._getNode(itemElement);
    if (!node) {
      return new Deferred().reject().promise();
    }
    if (node.internalFields.disabled) {
      return new Deferred().reject().promise();
    }
    var currentState = node.internalFields.expanded;
    if (currentState === state) {
      return new Deferred().resolve().promise();
    }
    if (this._hasChildren(node)) {
      var $node = this._getNodeElement(node);
      if ($node.find(".".concat(NODE_LOAD_INDICATOR_CLASS, ":not(.").concat(INVISIBLE_STATE_CLASS, ")")).length) {
        return new Deferred().reject().promise();
      }
      if (!currentState && !this._nodeHasRenderedChildren($node)) {
        this._createLoadIndicator($node);
      }
    }
    if (!isDefined(state)) {
      state = !currentState;
    }
    this._dataAdapter.toggleExpansion(node.internalFields.key, state);
    return this._updateExpandedItemsUI(node, state, e);
  },
  _nodeHasRenderedChildren($node) {
    var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
    return $nodeContainer.not(':empty').length;
  },
  _createLoadIndicator: function _createLoadIndicator($node) {
    this._createComponent($('<div>').addClass(NODE_LOAD_INDICATOR_CLASS), LoadIndicator, {}).$element().appendTo($node);
    var $icon = $node.children(".".concat(TOGGLE_ITEM_VISIBILITY_CLASS, ",.").concat(CUSTOM_EXPAND_ICON_CLASS));
    $icon.hide();
  },
  _renderExpanderIcon: function _renderExpanderIcon($node, node, $icon, iconClass) {
    $icon.appendTo($node);
    $icon.addClass(iconClass);
    if (node.internalFields.disabled) {
      $icon.addClass(DISABLED_STATE_CLASS);
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  },
  _renderDefaultExpanderIcons: function _renderDefaultExpanderIcons($node, node) {
    var $icon = $('<div>').addClass(TOGGLE_ITEM_VISIBILITY_CLASS).appendTo($node);
    if (node.internalFields.expanded) {
      $icon.addClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS);
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    if (node.internalFields.disabled) {
      $icon.addClass(DISABLED_STATE_CLASS);
    }
    this._renderToggleItemVisibilityIconClick($icon, node);
  },
  _renderCustomExpanderIcons: function _renderCustomExpanderIcons($node, node) {
    var {
      expandIcon,
      collapseIcon
    } = this.option();
    var $expandIcon = getImageContainer(expandIcon !== null && expandIcon !== void 0 ? expandIcon : collapseIcon);
    var $collapseIcon = getImageContainer(collapseIcon !== null && collapseIcon !== void 0 ? collapseIcon : expandIcon);
    this._renderExpanderIcon($node, node, $expandIcon, CUSTOM_EXPAND_ICON_CLASS);
    this._renderExpanderIcon($node, node, $collapseIcon, CUSTOM_COLLAPSE_ICON_CLASS);
    var isNodeExpanded = node.internalFields.expanded;
    if (isNodeExpanded) {
      $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS);
    }
    this._toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded);
  },
  _renderToggleItemVisibilityIconClick: function _renderToggleItemVisibilityIconClick($icon, node) {
    var eventName = addNamespace(clickEventName, this.NAME);
    eventsEngine.off($icon, eventName);
    eventsEngine.on($icon, eventName, e => {
      this._toggleExpandedState(node.internalFields.key, undefined, e);
    });
  },
  _toggleCustomExpanderIcons: function _toggleCustomExpanderIcons($expandIcon, $collapseIcon, isNodeExpanded) {
    $collapseIcon.toggle(isNodeExpanded);
    $expandIcon.toggle(!isNodeExpanded);
  },
  _updateExpandedItemsUI: function _updateExpandedItemsUI(node, state, e) {
    var $node = this._getNodeElement(node);
    var isHiddenNode = !$node.length || state && $node.is(':hidden');
    if (this.option('expandNodesRecursive') && isHiddenNode) {
      var parentNode = this._getNode(node.internalFields.parentKey);
      if (parentNode) {
        this._updateExpandedItemsUI(parentNode, state, e);
      }
    }
    if (!this._hasCustomExpanderIcons()) {
      var $icon = $node.children(".".concat(TOGGLE_ITEM_VISIBILITY_CLASS));
      $icon.toggleClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS, state);
    } else if (this._nodeHasRenderedChildren($node)) {
      var $childExpandIcons = $node.children(".".concat(CUSTOM_EXPAND_ICON_CLASS));
      var $childCollapseIcons = $node.children(".".concat(CUSTOM_COLLAPSE_ICON_CLASS));
      this._toggleCustomExpanderIcons($childExpandIcons, $childCollapseIcons, state);
    }
    var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
    var nodeContainerExists = $nodeContainer.length > 0;
    var completionCallback = new Deferred();
    if (!state || nodeContainerExists && !$nodeContainer.is(':empty')) {
      this._animateNodeContainer(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    if (node.internalFields.childrenKeys.length === 0 && (this._isVirtualMode() || this._useCustomChildrenLoader())) {
      this._loadNestedItemsWithUpdate(node, state, e, completionCallback);
      return completionCallback.promise();
    }
    this._renderSublevel($node, node, this._getChildNodes(node));
    this._fireContentReadyAction();
    this._animateNodeContainer(node, state, e, completionCallback);
    return completionCallback.promise();
  },
  _loadNestedItemsWithUpdate: function _loadNestedItemsWithUpdate(node, state, e, completionCallback) {
    var $node = this._getNodeElement(node);
    this._loadNestedItems(node).done(items => {
      var actualNodeData = this._getActualNode(node);
      this._renderSublevel($node, actualNodeData, this._dataAdapter.getNodesByItems(items));
      if (!items || !items.length) {
        completionCallback.resolve();
        return;
      }
      this._fireContentReadyAction();
      this._animateNodeContainer(actualNodeData, state, e, completionCallback);
    });
  },
  _loadNestedItems: function _loadNestedItems(node) {
    if (this._useCustomChildrenLoader()) {
      var publicNode = this._dataAdapter.getPublicNode(node);
      return this._loadChildrenByCustomLoader(publicNode).done(newItems => {
        if (!this._areNodesExists(newItems)) {
          this._appendItems(newItems);
        }
      });
    }
    if (!this._isVirtualMode()) {
      return new Deferred().resolve([]).promise();
    }
    this._filter.internal = [this.option('parentIdExpr'), node.internalFields.key];
    this._dataSource.filter(this._combineFilter());
    return this._dataSource.load().done(newItems => {
      if (!this._areNodesExists(newItems)) {
        this._appendItems(newItems);
      }
    });
  },
  _areNodesExists: function _areNodesExists(newItems, items) {
    var keyOfRootItem = this.keyOf(newItems[0]);
    var fullData = this._dataAdapter.getFullData();
    return !!this._dataAdapter.getNodeByKey(keyOfRootItem, fullData);
  },
  _appendItems: function _appendItems(newItems) {
    this.option().items = this.option('items').concat(newItems);
    this._initDataAdapter();
  },
  _animateNodeContainer: function _animateNodeContainer(node, state, e, completionCallback) {
    var $node = this._getNodeElement(node);
    var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
    if (node && completionCallback && $nodeContainer.length === 0) {
      completionCallback.resolve();
    }

    // NOTE: The height of node container is should be used when the container is shown (T606878)
    $nodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
    var nodeHeight = getHeight($nodeContainer);
    fx.stop($nodeContainer, true);
    fx.animate($nodeContainer, {
      type: 'custom',
      duration: this.option('animationEnabled') ? 400 : 0,
      from: {
        'maxHeight': state ? 0 : nodeHeight
      },
      to: {
        'maxHeight': state ? nodeHeight : 0
      },
      complete: function () {
        $nodeContainer.css('maxHeight', 'none');
        $nodeContainer.toggleClass(OPENED_NODE_CONTAINER_CLASS, state);
        this.setAria('expanded', state, $node);
        this.getScrollable().update();
        this._fireExpandedStateUpdatedEvent(state, node, e);
        if (completionCallback) {
          completionCallback.resolve();
        }
      }.bind(this)
    });
  },
  _fireExpandedStateUpdatedEvent: function _fireExpandedStateUpdatedEvent(isExpanded, node, e) {
    if (!this._hasChildren(node) || this._skipContentReadyAndItemExpanded) {
      return;
    }
    var optionName = isExpanded ? 'onItemExpanded' : 'onItemCollapsed';
    if (isDefined(e)) {
      this._itemDXEventHandler(e, optionName, {
        node: this._dataAdapter.getPublicNode(node)
      });
    } else {
      var target = this._getNodeElement(node);
      this._itemEventHandler(target, optionName, {
        event: e,
        node: this._dataAdapter.getPublicNode(node)
      });
    }
  },
  _normalizeIconState: function _normalizeIconState($node, hasNewItems) {
    var $loadIndicator = $node.find(".".concat(NODE_LOAD_INDICATOR_CLASS));
    if ($loadIndicator.length) {
      var _LoadIndicator$getIns;
      (_LoadIndicator$getIns = LoadIndicator.getInstance($loadIndicator)) === null || _LoadIndicator$getIns === void 0 ? void 0 : _LoadIndicator$getIns.option('visible', false);
    }
    var $toggleItem = $node.children(".".concat(CUSTOM_COLLAPSE_ICON_CLASS, ",.").concat(TOGGLE_ITEM_VISIBILITY_CLASS));
    if (hasNewItems) {
      $toggleItem.show();
      return;
    }
    $toggleItem.removeClass(TOGGLE_ITEM_VISIBILITY_CLASS);
    $node.addClass(IS_LEAF);
  },
  _emptyMessageContainer: function _emptyMessageContainer() {
    var scrollable = this.getScrollable();
    return scrollable ? $(scrollable.content()) : this.callBase();
  },
  _renderContent: function _renderContent() {
    var items = this.option('items');
    if (items && items.length) {
      this._contentAlreadyRendered = true;
    }
    this.callBase();
  },
  _renderSelectAllItem: function _renderSelectAllItem($container) {
    $container = $container || this.$element().find(".".concat(NODE_CONTAINER_CLASS)).first();
    this._$selectAllItem = $('<div>').addClass(SELECT_ALL_ITEM_CLASS);
    var value = this._dataAdapter.isAllSelected();
    this._createComponent(this._$selectAllItem, CheckBox, {
      value: value,
      elementAttr: {
        'aria-label': 'Select All'
      },
      text: this.option('selectAllText'),
      onValueChanged: this._onSelectAllCheckboxValueChanged.bind(this)
    });
    this._toggleSelectedClass(this._$selectAllItem, value);
    $container.before(this._$selectAllItem);
  },
  _onSelectAllCheckboxValueChanged: function _onSelectAllCheckboxValueChanged(args) {
    this._toggleSelectAll(args);
    this._fireSelectAllValueChanged(args.value);
  },
  _toggleSelectAll: function _toggleSelectAll(args) {
    this._dataAdapter.toggleSelectAll(args.value);
    this._updateItemsUI();
    this._fireSelectionChanged();
  },
  _renderCheckBox: function _renderCheckBox($node, node) {
    var $checkbox = $('<div>').appendTo($node);
    this._createComponent($checkbox, CheckBox, {
      value: node.internalFields.selected,
      onValueChanged: this._changeCheckboxValue.bind(this),
      focusStateEnabled: false,
      elementAttr: {
        'aria-label': 'Check State'
      },
      disabled: this._disabledGetter(node)
    });
  },
  _toggleSelectedClass: function _toggleSelectedClass($node, value) {
    $node.toggleClass(SELECTED_ITEM_CLASS, !!value);
  },
  _toggleNodeDisabledState: function _toggleNodeDisabledState(node, state) {
    var $node = this._getNodeElement(node);
    var $item = $node.find('.' + ITEM_CLASS).eq(0);
    this._dataAdapter.toggleNodeDisabledState(node.internalFields.key, state);
    $item.toggleClass(DISABLED_STATE_CLASS, !!state);
    if (this._showCheckboxes()) {
      var checkbox = this._getCheckBoxInstance($node);
      checkbox.option('disabled', !!state);
    }
  },
  _itemOptionChanged: function _itemOptionChanged(item, property, value) {
    var node = this._dataAdapter.getNodeByItem(item);
    if (property === this.option('disabledExpr')) {
      this._toggleNodeDisabledState(node, value);
    }
  },
  _changeCheckboxValue: function _changeCheckboxValue(e) {
    var $node = $(e.element).parent('.' + NODE_CLASS);
    var $item = $node.children('.' + ITEM_CLASS);
    var item = this._getItemData($item);
    var node = this._getNodeByElement($item);
    var value = e.value;
    if (node && node.internalFields.selected === value) {
      return;
    }
    this._updateItemSelection(value, item, e.event);
  },
  _isSingleSelection: function _isSingleSelection() {
    return this.option('selectionMode') === 'single';
  },
  _isRecursiveSelection: function _isRecursiveSelection() {
    return this.option('selectNodesRecursive') && this.option('selectionMode') !== 'single';
  },
  _isLastSelectedBranch: function _isLastSelectedBranch(publicNode, selectedNodesKeys, deep) {
    var keyIndex = selectedNodesKeys.indexOf(publicNode.key);
    if (keyIndex >= 0) {
      selectedNodesKeys.splice(keyIndex, 1);
    }
    if (deep) {
      each(publicNode.children, function (_, childNode) {
        this._isLastSelectedBranch(childNode, selectedNodesKeys, true);
      }.bind(this));
    }
    if (publicNode.parent) {
      this._isLastSelectedBranch(publicNode.parent, selectedNodesKeys);
    }
    return selectedNodesKeys.length === 0;
  },
  _isLastRequired: function _isLastRequired(node) {
    var selectionRequired = this.option('selectionRequired');
    var isSingleMode = this._isSingleSelection();
    var selectedNodesKeys = this.getSelectedNodeKeys();
    if (!selectionRequired) {
      return;
    }
    if (isSingleMode) {
      return selectedNodesKeys.length === 1;
    } else {
      return this._isLastSelectedBranch(node.internalFields.publicNode, selectedNodesKeys.slice(), true);
    }
  },
  _updateItemSelection: function _updateItemSelection(value, itemElement, dxEvent) {
    var node = this._getNode(itemElement);
    if (!node || node.visible === false) {
      return false;
    }
    if (node.internalFields.selected === value) {
      return true;
    }
    if (!value && this._isLastRequired(node)) {
      if (this._showCheckboxes()) {
        var $node = this._getNodeElement(node);
        this._getCheckBoxInstance($node).option('value', true);
      }
      return false;
    }
    if (value && this._isSingleSelection()) {
      var selectedKeys = this.getSelectedNodeKeys();
      each(selectedKeys, (index, key) => {
        this._dataAdapter.toggleSelection(key, false);
        this._updateItemsUI();
        this._fireItemSelectionChanged(this._getNode(key));
      });
    }
    this._dataAdapter.toggleSelection(node.internalFields.key, value);
    var isAllSelected = this._dataAdapter.isAllSelected();
    var needFireSelectAllChanged = this._selectAllEnabled() && this._$selectAllItem.dxCheckBox('instance').option('value') !== isAllSelected;
    this._updateItemsUI();
    this._fireItemSelectionChanged(node, dxEvent);
    this._fireSelectionChanged();
    if (needFireSelectAllChanged) {
      this._fireSelectAllValueChanged(isAllSelected);
    }
    return true;
  },
  _fireItemSelectionChanged: function _fireItemSelectionChanged(node, dxEvent) {
    var initiator = dxEvent || this._findItemElementByItem(node.internalFields.item);
    var handler = dxEvent ? this._itemDXEventHandler : this._itemEventHandler;
    handler.call(this, initiator, 'onItemSelectionChanged', {
      node: this._dataAdapter.getPublicNode(node),
      itemData: node.internalFields.item
    });
  },
  _getCheckBoxInstance: function _getCheckBoxInstance($node) {
    return $node.children('.dx-checkbox').dxCheckBox('instance');
  },
  _updateItemsUI: function _updateItemsUI() {
    var cache = {};
    each(this._dataAdapter.getData(), (_, node) => {
      var $node = this._getNodeElement(node, cache);
      var nodeSelection = node.internalFields.selected;
      if (!$node.length) {
        return;
      }
      this._toggleSelectedClass($node, nodeSelection);
      this.setAria('selected', nodeSelection, $node);
      if (this._showCheckboxes()) {
        this._getCheckBoxInstance($node).option('value', nodeSelection);
      }
    });
    if (this._selectAllEnabled()) {
      var selectAllCheckbox = this._$selectAllItem.dxCheckBox('instance');
      selectAllCheckbox.option('onValueChanged', undefined);
      selectAllCheckbox.option('value', this._dataAdapter.isAllSelected());
      selectAllCheckbox.option('onValueChanged', this._onSelectAllCheckboxValueChanged.bind(this));
    }
  },
  _updateParentsState: function _updateParentsState(node, $node) {
    if (!$node) {
      return;
    }
    var parentNode = this._dataAdapter.getNodeByKey(node.internalFields.parentKey);
    var $parentNode = $($node.parents('.' + NODE_CLASS)[0]);
    if (this._showCheckboxes()) {
      var parentValue = parentNode.internalFields.selected;
      this._getCheckBoxInstance($parentNode).option('value', parentValue);
      this._toggleSelectedClass($parentNode, parentValue);
    }
    if (parentNode.internalFields.parentKey !== this.option('rootValue')) {
      this._updateParentsState(parentNode, $parentNode);
    }
  },
  _itemEventHandlerImpl: function _itemEventHandlerImpl(initiator, action, actionArgs) {
    var $itemElement = $(initiator).closest('.' + NODE_CLASS).children('.' + ITEM_CLASS);
    return action(extend(this._extendActionArgs($itemElement), actionArgs));
  },
  _itemContextMenuHandler: function _itemContextMenuHandler(e) {
    this._createEventHandler('onItemContextMenu', e);
  },
  _itemHoldHandler: function _itemHoldHandler(e) {
    this._createEventHandler('onItemHold', e);
  },
  _createEventHandler: function _createEventHandler(eventName, e) {
    var node = this._getNodeByElement(e.currentTarget);
    this._itemDXEventHandler(e, eventName, {
      node: this._dataAdapter.getPublicNode(node)
    });
  },
  _itemClass: function _itemClass() {
    return ITEM_CLASS;
  },
  _itemDataKey: function _itemDataKey() {
    return ITEM_DATA_KEY;
  },
  _attachClickEvent: function _attachClickEvent() {
    var clickSelector = '.' + this._itemClass();
    var pointerDownSelector = '.' + NODE_CLASS + ', .' + SELECT_ALL_ITEM_CLASS;
    var eventName = addNamespace(clickEventName, this.NAME);
    var pointerDownEvent = addNamespace(pointerEvents.down, this.NAME);
    var $itemContainer = this._itemContainer();
    var that = this;
    eventsEngine.off($itemContainer, eventName, clickSelector);
    eventsEngine.off($itemContainer, pointerDownEvent, pointerDownSelector);
    eventsEngine.on($itemContainer, eventName, clickSelector, function (e) {
      that._itemClickHandler(e, $(this));
    });
    eventsEngine.on($itemContainer, pointerDownEvent, pointerDownSelector, function (e) {
      that._itemPointerDownHandler(e);
    });
  },
  _itemClick: function _itemClick(actionArgs) {
    var args = actionArgs.args[0];
    var target = args.event.target[0] || args.event.target;
    var link = target.getElementsByClassName(ITEM_URL_CLASS)[0];
    if (args.itemData.url && link) {
      link.click();
    }
  },
  _itemClickHandler: function _itemClickHandler(e, $item) {
    var itemData = this._getItemData($item);
    var node = this._getNodeByElement($item);
    this._itemDXEventHandler(e, 'onItemClick', {
      node: this._dataAdapter.getPublicNode(node)
    }, {
      beforeExecute: this._itemClick
    });
    if (this.option('selectByClick') && !e.isDefaultPrevented()) {
      this._updateItemSelection(!node.internalFields.selected, itemData, e);
    }
  },
  _updateSelectionToFirstItem: function _updateSelectionToFirstItem($items, startIndex) {
    var itemIndex = startIndex;
    while (itemIndex >= 0) {
      var $item = $($items[itemIndex]);
      this._updateItemSelection(true, $item.find('.' + ITEM_CLASS).get(0));
      itemIndex--;
    }
  },
  _updateSelectionToLastItem: function _updateSelectionToLastItem($items, startIndex) {
    var length = $items.length;
    var itemIndex = startIndex;
    while (itemIndex < length) {
      var $item = $($items[itemIndex]);
      this._updateItemSelection(true, $item.find('.' + ITEM_CLASS).get(0));
      itemIndex++;
    }
  },
  focus: function focus() {
    if (this._selectAllEnabled()) {
      eventsEngine.trigger(this._$selectAllItem, 'focus');
      return;
    }
    this.callBase();
  },
  _focusInHandler: function _focusInHandler(e) {
    this._updateFocusState(e, true);
    var isSelectAllItem = $(e.target).hasClass(SELECT_ALL_ITEM_CLASS);
    if (isSelectAllItem || this.option('focusedElement')) {
      clearTimeout(this._setFocusedItemTimeout);
      this._setFocusedItemTimeout = setTimeout(() => {
        var element = isSelectAllItem ? getPublicElement(this._$selectAllItem) : $(this.option('focusedElement'));
        this._setFocusedItem(element);
      });
      return;
    }
    var $activeItem = this._getActiveItem();
    this.option('focusedElement', getPublicElement($activeItem.closest('.' + NODE_CLASS)));
  },
  _itemPointerDownHandler: function _itemPointerDownHandler(e) {
    if (!this.option('focusStateEnabled')) {
      return;
    }
    var $target = $(e.target).closest('.' + NODE_CLASS + ', .' + SELECT_ALL_ITEM_CLASS);
    if (!$target.length) {
      return;
    }
    var itemElement = $target.hasClass(DISABLED_STATE_CLASS) ? null : $target;
    this.option('focusedElement', getPublicElement(itemElement));
  },
  _findNonDisabledNodes: function _findNonDisabledNodes($nodes) {
    return $nodes.not(function () {
      return $(this).children('.' + ITEM_CLASS).hasClass(DISABLED_STATE_CLASS);
    });
  },
  _moveFocus: function _moveFocus(location, e) {
    var FOCUS_UP = 'up';
    var FOCUS_DOWN = 'down';
    var FOCUS_FIRST = 'first';
    var FOCUS_LAST = 'last';
    var FOCUS_LEFT = this.option('rtlEnabled') ? 'right' : 'left';
    var FOCUS_RIGHT = this.option('rtlEnabled') ? 'left' : 'right';
    this.$element().find(".".concat(NODE_CONTAINER_CLASS)).each(function () {
      fx.stop(this, true);
    });
    var $items = this._nodeElements();
    if (!$items || !$items.length) {
      return;
    }
    switch (location) {
      case FOCUS_UP:
        {
          var $prevItem = this._prevItem($items);
          this.option('focusedElement', getPublicElement($prevItem));
          var prevItemElement = this._getNodeItemElement($prevItem);
          this.getScrollable().scrollToElement(prevItemElement);
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, prevItemElement);
          }
          break;
        }
      case FOCUS_DOWN:
        {
          var $nextItem = this._nextItem($items);
          this.option('focusedElement', getPublicElement($nextItem));
          var nextItemElement = this._getNodeItemElement($nextItem);
          this.getScrollable().scrollToElement(nextItemElement);
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, nextItemElement);
          }
          break;
        }
      case FOCUS_FIRST:
        {
          var $firstItem = $items.first();
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToFirstItem($items, $items.index(this._prevItem($items)));
          }
          this.option('focusedElement', getPublicElement($firstItem));
          this.getScrollable().scrollToElement(this._getNodeItemElement($firstItem));
          break;
        }
      case FOCUS_LAST:
        {
          var $lastItem = $items.last();
          if (e.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToLastItem($items, $items.index(this._nextItem($items)));
          }
          this.option('focusedElement', getPublicElement($lastItem));
          this.getScrollable().scrollToElement(this._getNodeItemElement($lastItem));
          break;
        }
      case FOCUS_RIGHT:
        {
          this._expandFocusedContainer();
          break;
        }
      case FOCUS_LEFT:
        {
          this._collapseFocusedContainer();
          break;
        }
      default:
        this.callBase.apply(this, arguments);
        return;
    }
  },
  _getNodeItemElement: function _getNodeItemElement($node) {
    return $node.find('.' + ITEM_CLASS).get(0);
  },
  _nodeElements: function _nodeElements() {
    return this.$element().find('.' + NODE_CLASS).not(':hidden');
  },
  _expandFocusedContainer: function _expandFocusedContainer() {
    var $focusedNode = $(this.option('focusedElement'));
    if (!$focusedNode.length || $focusedNode.hasClass(IS_LEAF)) {
      return;
    }
    var $node = $focusedNode.find(".".concat(NODE_CONTAINER_CLASS)).eq(0);
    if ($node.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      var $nextItem = this._nextItem(this._findNonDisabledNodes(this._nodeElements()));
      this.option('focusedElement', getPublicElement($nextItem));
      this.getScrollable().scrollToElement(this._getNodeItemElement($nextItem));
      return;
    }
    var node = this._getNodeByElement($focusedNode.children('.' + ITEM_CLASS));
    this._toggleExpandedState(node, true);
  },
  _getClosestNonDisabledNode: function _getClosestNonDisabledNode($node) {
    do {
      $node = $node.parent().closest('.' + NODE_CLASS);
    } while ($node.children('.dx-treeview-item.dx-state-disabled').length);
    return $node;
  },
  _collapseFocusedContainer: function _collapseFocusedContainer() {
    var $focusedNode = $(this.option('focusedElement'));
    if (!$focusedNode.length) {
      return;
    }
    var nodeElement = $focusedNode.find(".".concat(NODE_CONTAINER_CLASS)).eq(0);
    if (!$focusedNode.hasClass(IS_LEAF) && nodeElement.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
      var node = this._getNodeByElement($focusedNode.children('.' + ITEM_CLASS));
      this._toggleExpandedState(node, false);
    } else {
      var collapsedNode = this._getClosestNonDisabledNode($focusedNode);
      collapsedNode.length && this.option('focusedElement', getPublicElement(collapsedNode));
      this.getScrollable().scrollToElement(this._getNodeItemElement(collapsedNode));
    }
  },
  _encodeString: function _encodeString(value) {
    return isString(value) ? encodeURI(value) : value;
  },
  _decodeString: function _decodeString(value) {
    return isString(value) ? decodeURI(value) : value;
  },
  getScrollable: function getScrollable() {
    return this._scrollable;
  },
  updateDimensions: function updateDimensions() {
    var deferred = new Deferred();
    var scrollable = this.getScrollable();
    if (scrollable) {
      scrollable.update().done(() => {
        deferred.resolveWith(this);
      });
    } else {
      deferred.resolveWith(this);
    }
    return deferred.promise();
  },
  selectItem: function selectItem(itemElement) {
    return this._updateItemSelection(true, itemElement);
  },
  unselectItem: function unselectItem(itemElement) {
    return this._updateItemSelection(false, itemElement);
  },
  expandItem: function expandItem(itemElement) {
    return this._toggleExpandedState(itemElement, true);
  },
  collapseItem: function collapseItem(itemElement) {
    return this._toggleExpandedState(itemElement, false);
  },
  getNodes: function getNodes() {
    return this._dataAdapter.getTreeNodes();
  },
  getSelectedNodes: function getSelectedNodes() {
    return this.getSelectedNodeKeys().map(key => {
      var node = this._dataAdapter.getNodeByKey(key);
      return this._dataAdapter.getPublicNode(node);
    });
  },
  getSelectedNodeKeys: function getSelectedNodeKeys() {
    return this._dataAdapter.getSelectedNodesKeys();
  },
  selectAll: function selectAll() {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox('instance').option('value', true);
    } else {
      this._toggleSelectAll({
        value: true
      });
    }
  },
  unselectAll: function unselectAll() {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox('instance').option('value', false);
    } else {
      this._toggleSelectAll({
        value: false
      });
    }
  },
  _allItemsExpandedHandler: function _allItemsExpandedHandler() {
    this._skipContentReadyAndItemExpanded = false;
    this._fireContentReadyAction();
  },
  expandAll: function expandAll() {
    var nodes = this._dataAdapter.getData();
    var expandingPromises = [];
    this._skipContentReadyAndItemExpanded = true;

    // NOTE: This is needed to support animation on expandAll, but stop triggering multiple contentReady/itemExpanded events.
    nodes.forEach(node => expandingPromises.push(this._toggleExpandedState(node.internalFields.key, true)));
    Promise.allSettled(expandingPromises).then(() => {
      var _this$_allItemsExpand;
      return (_this$_allItemsExpand = this._allItemsExpanded) === null || _this$_allItemsExpand === void 0 ? void 0 : _this$_allItemsExpand.call(this);
    });
  },
  collapseAll: function collapseAll() {
    each(this._dataAdapter.getExpandedNodesKeys(), function (_, key) {
      this._toggleExpandedState(key, false);
    }.bind(this));
  },
  scrollToItem: function scrollToItem(keyOrItemOrElement) {
    var node = this._getNode(keyOrItemOrElement);
    if (!node) {
      return new Deferred().reject().promise();
    }
    var nodeKeysToExpand = [];
    var parentNode = node.internalFields.publicNode.parent;
    while (parentNode != null) {
      if (!parentNode.expanded) {
        nodeKeysToExpand.push(parentNode.key);
      }
      parentNode = parentNode.parent;
    }
    var scrollCallback = new Deferred();
    this._expandNodes(nodeKeysToExpand.reverse()).always(() => {
      var $element = this._getNodeElement(node);
      if ($element && $element.length) {
        this.scrollToElementTopLeft($element.get(0));
        scrollCallback.resolve();
      } else {
        scrollCallback.reject();
      }
    });
    return scrollCallback.promise();
  },
  scrollToElementTopLeft: function scrollToElementTopLeft(targetElement) {
    var scrollable = this.getScrollable();
    var {
      scrollDirection,
      rtlEnabled
    } = this.option();
    var targetLocation = {
      top: 0,
      left: 0
    };
    var relativeOffset = getRelativeOffset(SCROLLABLE_CONTENT_CLASS, targetElement);
    if (scrollDirection !== DIRECTION_VERTICAL) {
      var containerElement = $(scrollable.container()).get(0);
      targetLocation.left = rtlEnabled ? relativeOffset.left + targetElement.offsetWidth - containerElement.clientWidth : relativeOffset.left;
    }
    if (scrollDirection !== DIRECTION_HORIZONTAL) {
      targetLocation.top = relativeOffset.top;
    }
    scrollable.scrollTo(targetLocation);
  },
  _expandNodes: function _expandNodes(keysToExpand) {
    if (!keysToExpand || keysToExpand.length === 0) {
      return new Deferred().resolve().promise();
    }
    var resultCallback = new Deferred();
    var callbacksByNodes = keysToExpand.map(key => this.expandItem(key));
    when.apply($, callbacksByNodes).done(() => resultCallback.resolve()).fail(() => resultCallback.reject());
    return resultCallback.promise();
  },
  _dispose: function _dispose() {
    this.callBase();
    clearTimeout(this._setFocusedItemTimeout);
    this._allItemsExpandedHandler = null;
  }
});
export default TreeViewBase;