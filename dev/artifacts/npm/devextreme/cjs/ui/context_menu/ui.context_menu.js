/**
* DevExtreme (cjs/ui/context_menu/ui.context_menu.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _dom = require("../../core/utils/dom");
var _element = require("../../core/element");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _position = _interopRequireDefault(require("../../animation/position"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _index = require("../../events/utils/index");
var _ui = _interopRequireDefault(require("../overlay/ui.overlay"));
var _ui2 = _interopRequireDefault(require("./ui.menu_base"));
var _deferred = require("../../core/utils/deferred");
var _contextmenu = require("../../events/contextmenu");
var _hold = _interopRequireDefault(require("../../events/hold"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// STYLE contextMenu

var DX_MENU_CLASS = 'dx-menu';
var DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
var DX_MENU_ITEM_EXPANDED_CLASS = DX_MENU_ITEM_CLASS + '-expanded';
var DX_MENU_PHONE_CLASS = 'dx-menu-phone-overlay';
var DX_MENU_ITEMS_CONTAINER_CLASS = DX_MENU_CLASS + '-items-container';
var DX_MENU_ITEM_WRAPPER_CLASS = DX_MENU_ITEM_CLASS + '-wrapper';
var DX_SUBMENU_CLASS = 'dx-submenu';
var DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
var DX_HAS_CONTEXT_MENU_CLASS = 'dx-has-context-menu';
var DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
var DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
var DX_STATE_HOVER_CLASS = 'dx-state-hover';
var OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
var FOCUS_UP = 'up';
var FOCUS_DOWN = 'down';
var FOCUS_LEFT = 'left';
var FOCUS_RIGHT = 'right';
var FOCUS_FIRST = 'first';
var FOCUS_LAST = 'last';
var ACTIONS = ['onShowing', 'onShown', 'onSubmenuCreated', 'onHiding', 'onHidden', 'onPositioning', 'onLeftFirstItem', 'onLeftLastItem', 'onCloseRootSubmenu', 'onExpandLastSubmenu'];
var LOCAL_SUBMENU_DIRECTIONS = [FOCUS_UP, FOCUS_DOWN, FOCUS_FIRST, FOCUS_LAST];
var DEFAULT_SHOW_EVENT = 'dxcontextmenu';
var window = (0, _window.getWindow)();
var ContextMenu = /*#__PURE__*/function (_MenuBase) {
  _inheritsLoose(ContextMenu, _MenuBase);
  function ContextMenu() {
    return _MenuBase.apply(this, arguments) || this;
  }
  var _proto = ContextMenu.prototype;
  _proto.getShowEvent = function getShowEvent(showEventOption) {
    var result = null;
    if ((0, _type.isObject)(showEventOption)) {
      if (showEventOption.name !== null) {
        result = showEventOption.name || DEFAULT_SHOW_EVENT;
      }
    } else {
      result = showEventOption;
    }
    return result;
  };
  _proto.getShowDelay = function getShowDelay(showEventOption) {
    return (0, _type.isObject)(showEventOption) && showEventOption.delay;
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_MenuBase.prototype._getDefaultOptions.call(this), {
      showEvent: DEFAULT_SHOW_EVENT,
      hideOnOutsideClick: true,
      position: {
        at: 'top left',
        my: 'top left'
      },
      onShowing: null,
      onShown: null,
      onSubmenuCreated: null,
      onHiding: null,
      onHidden: null,
      onPositioning: null,
      submenuDirection: 'auto',
      visible: false,
      target: undefined,
      /**
       * @name dxContextMenuOptions.itemHoldAction
       * @hidden
       */

      /**
      * @name dxContextMenuOptions.onItemReordered
      * @hidden
      */

      /**
      * @name dxContextMenuOptions.selectedItems
      * @hidden
      */

      onLeftFirstItem: null,
      onLeftLastItem: null,
      onCloseRootSubmenu: null,
      onExpandLastSubmenu: null
    });
  };
  _proto._defaultOptionsRules = function _defaultOptionsRules() {
    return _MenuBase.prototype._defaultOptionsRules.call(this).concat([{
      device: function device() {
        return !(0, _window.hasWindow)();
      },
      options: {
        animation: null
      }
    }]);
  };
  _proto._setDeprecatedOptions = function _setDeprecatedOptions() {
    _MenuBase.prototype._setDeprecatedOptions.call(this);
    (0, _extend.extend)(this._deprecatedOptions, {
      'closeOnOutsideClick': {
        since: '22.2',
        alias: 'hideOnOutsideClick'
      }
    });
  };
  _proto._initActions = function _initActions() {
    var _this = this;
    this._actions = {};
    (0, _iterator.each)(ACTIONS, function (index, action) {
      _this._actions[action] = _this._createActionByOption(action) || _common.noop;
    });
  };
  _proto._setOptionsByReference = function _setOptionsByReference() {
    _MenuBase.prototype._setOptionsByReference.call(this);
    (0, _extend.extend)(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  };
  _proto._focusInHandler = function _focusInHandler() {};
  _proto._itemContainer = function _itemContainer() {
    return this._overlay ? this._overlay.$content() : (0, _renderer.default)();
  };
  _proto._eventBindingTarget = function _eventBindingTarget() {
    return this._itemContainer();
  };
  _proto.itemsContainer = function itemsContainer() {
    return this._overlay ? this._overlay.$content() : undefined;
  };
  _proto._supportedKeys = function _supportedKeys() {
    var _this2 = this;
    var selectItem = function selectItem() {
      var $item = (0, _renderer.default)(_this2.option('focusedElement'));
      _this2.hide();
      if (!$item.length || !_this2._isSelectionEnabled()) {
        return;
      }
      _this2.selectItem($item[0]);
    };
    return (0, _extend.extend)(_MenuBase.prototype._supportedKeys.call(this), {
      space: selectItem,
      escape: this.hide
    });
  };
  _proto._getActiveItem = function _getActiveItem() {
    var $availableItems = this._getAvailableItems();
    var $focusedItem = $availableItems.filter(".".concat(DX_STATE_FOCUSED_CLASS));
    var $hoveredItem = $availableItems.filter(".".concat(DX_STATE_HOVER_CLASS));
    var $hoveredItemContainer = $hoveredItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
    if ($hoveredItemContainer.find(".".concat(DX_MENU_ITEM_CLASS)).index($focusedItem) >= 0) {
      return $focusedItem;
    }
    if ($hoveredItem.length) {
      return $hoveredItem;
    }
    return _MenuBase.prototype._getActiveItem.call(this);
  };
  _proto._moveFocus = function _moveFocus(location) {
    var $items = this._getItemsByLocation(location);
    var $oldTarget = this._getActiveItem(true);
    var $hoveredItem = this.itemsContainer().find(".".concat(DX_STATE_HOVER_CLASS));
    var $focusedItem = (0, _renderer.default)(this.option('focusedElement'));
    var $activeItemHighlighted = !!($focusedItem.length || $hoveredItem.length);
    var $newTarget;
    switch (location) {
      case FOCUS_UP:
        $newTarget = $activeItemHighlighted ? this._prevItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.first())) {
          this._actions.onLeftFirstItem($oldTarget);
        }
        break;
      case FOCUS_DOWN:
        $newTarget = $activeItemHighlighted ? this._nextItem($items) : $oldTarget;
        this._setFocusedElement($newTarget);
        if ($oldTarget.is($items.last())) {
          this._actions.onLeftLastItem($oldTarget);
        }
        break;
      case FOCUS_RIGHT:
        $newTarget = this.option('rtlEnabled') ? this._hideSubmenuHandler() : this._expandSubmenuHandler($items, location);
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LEFT:
        $newTarget = this.option('rtlEnabled') ? this._expandSubmenuHandler($items, location) : this._hideSubmenuHandler();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_FIRST:
        $newTarget = $items.first();
        this._setFocusedElement($newTarget);
        break;
      case FOCUS_LAST:
        $newTarget = $items.last();
        this._setFocusedElement($newTarget);
        break;
      default:
        return _MenuBase.prototype._moveFocus.call(this, location);
    }
  };
  _proto._setFocusedElement = function _setFocusedElement($element) {
    if ($element && $element.length !== 0) {
      this.option('focusedElement', (0, _element.getPublicElement)($element));
    }
  };
  _proto._getItemsByLocation = function _getItemsByLocation(location) {
    var $activeItem = this._getActiveItem(true);
    var $items;
    if (LOCAL_SUBMENU_DIRECTIONS.includes(location)) {
      $items = $activeItem.closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS)).children().children();
    }
    $items = this._getAvailableItems($items);
    return $items;
  };
  _proto._getAriaTarget = function _getAriaTarget() {
    return this.$element();
  };
  _proto._refreshActiveDescendant = function _refreshActiveDescendant() {
    if ((0, _type.isDefined)(this._overlay)) {
      var $target = this._overlay.$content();
      _MenuBase.prototype._refreshActiveDescendant.call(this, $target);
    }
  };
  _proto._hideSubmenuHandler = function _hideSubmenuHandler() {
    var $curItem = this._getActiveItem(true);
    var $parentItem = $curItem.parents(".".concat(DX_MENU_ITEM_EXPANDED_CLASS)).first();
    if ($parentItem.length) {
      this._hideSubmenusOnSameLevel($parentItem);
      this._hideSubmenu($curItem.closest(".".concat(DX_SUBMENU_CLASS)));
      return $parentItem;
    }
    this._actions.onCloseRootSubmenu($curItem);
    return $curItem;
  };
  _proto._expandSubmenuHandler = function _expandSubmenuHandler($items, location) {
    var $curItem = this._getActiveItem(true);
    var itemData = this._getItemData($curItem);
    var node = this._dataAdapter.getNodeByItem(itemData);
    var isItemHasSubmenu = this._hasSubmenu(node);
    var $submenu = $curItem.children(".".concat(DX_SUBMENU_CLASS));
    if (isItemHasSubmenu && !$curItem.hasClass(DX_STATE_DISABLED_CLASS)) {
      if (!$submenu.length || $submenu.css('visibility') === 'hidden') {
        this._showSubmenu($curItem);
      }
      return this._nextItem(this._getItemsByLocation(location));
    }
    this._actions.onExpandLastSubmenu($curItem);
    return undefined;
  };
  _proto._clean = function _clean() {
    if (this._overlay) {
      this._overlay.$element().remove();
      this._overlay = null;
    }
    this._detachShowContextMenuEvents(this._getTarget());
    _MenuBase.prototype._clean.call(this);
  };
  _proto._initMarkup = function _initMarkup() {
    this.$element().addClass(DX_HAS_CONTEXT_MENU_CLASS);
    _MenuBase.prototype._initMarkup.call(this);
  };
  _proto._render = function _render() {
    _MenuBase.prototype._render.call(this);
    this._renderVisibility(this.option('visible'));
    this._addWidgetClass();
  };
  _proto._renderContentImpl = function _renderContentImpl() {
    this._detachShowContextMenuEvents(this._getTarget());
    this._attachShowContextMenuEvents();
  };
  _proto._attachKeyboardEvents = function _attachKeyboardEvents() {
    !this._keyboardListenerId && this._focusTarget().length && _MenuBase.prototype._attachKeyboardEvents.call(this);
  };
  _proto._renderContextMenuOverlay = function _renderContextMenuOverlay() {
    if (this._overlay) {
      return;
    }
    var overlayOptions = this._getOverlayOptions();
    this._overlay = this._createComponent((0, _renderer.default)('<div>').appendTo(this._$element), _ui.default, overlayOptions);
    var $overlayContent = this._overlay.$content();
    $overlayContent.addClass(DX_CONTEXT_MENU_CLASS);
    this._addCustomCssClass($overlayContent);
    this._addPlatformDependentClass($overlayContent);
    this._attachContextMenuEvent();
  };
  _proto.preventShowingDefaultContextMenuAboveOverlay = function preventShowingDefaultContextMenuAboveOverlay() {
    var $itemContainer = this._itemContainer();
    var eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);
    _events_engine.default.off($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS));
    _events_engine.default.on($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS), function (e) {
      e.stopPropagation();
      e.preventDefault();
      _events_engine.default.off($itemContainer, eventName, ".".concat(DX_SUBMENU_CLASS));
    }.bind(this));
  };
  _proto._itemContextMenuHandler = function _itemContextMenuHandler(e) {
    _MenuBase.prototype._itemContextMenuHandler.call(this, e);
    e.stopPropagation();
  };
  _proto._addPlatformDependentClass = function _addPlatformDependentClass($element) {
    if (_devices.default.current().phone) {
      $element.addClass(DX_MENU_PHONE_CLASS);
    }
  };
  _proto._detachShowContextMenuEvents = function _detachShowContextMenuEvents(target) {
    var showEvent = this.getShowEvent(this.option('showEvent'));
    if (!showEvent) {
      return;
    }
    var eventName = (0, _index.addNamespace)(showEvent, this.NAME);
    if (this._showContextMenuEventHandler) {
      _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, target, this._showContextMenuEventHandler);
    } else {
      _events_engine.default.off((0, _renderer.default)(target), eventName);
    }
  };
  _proto._attachShowContextMenuEvents = function _attachShowContextMenuEvents() {
    var _this3 = this;
    var target = this._getTarget();
    var showEvent = this.getShowEvent(this.option('showEvent'));
    if (!showEvent) {
      return;
    }
    var eventName = (0, _index.addNamespace)(showEvent, this.NAME);
    var contextMenuAction = this._createAction(function (e) {
      var delay = _this3.getShowDelay(_this3.option('showEvent'));
      if (delay) {
        setTimeout(function () {
          return _this3._show(e.event);
        }, delay);
      } else {
        _this3._show(e.event);
      }
    }, {
      validatingTargetName: 'target'
    });
    var handler = function handler(e) {
      return contextMenuAction({
        event: e,
        target: (0, _renderer.default)(e.currentTarget)
      });
    };
    contextMenuAction = this._createAction(contextMenuAction);
    if ((0, _type.isRenderer)(target) || target.nodeType || (0, _type.isWindow)(target)) {
      this._showContextMenuEventHandler = undefined;
      _events_engine.default.on(target, eventName, handler);
    } else {
      this._showContextMenuEventHandler = handler;
      _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, target, this._showContextMenuEventHandler);
    }
  };
  _proto._hoverEndHandler = function _hoverEndHandler(e) {
    _MenuBase.prototype._hoverEndHandler.call(this, e);
    e.stopPropagation();
  };
  _proto._renderDimensions = function _renderDimensions() {};
  _proto._renderContainer = function _renderContainer($wrapper, submenuContainer) {
    var $holder = submenuContainer || this._itemContainer();
    $wrapper = (0, _renderer.default)('<div>');
    $wrapper.appendTo($holder).addClass(DX_SUBMENU_CLASS).css('visibility', submenuContainer ? 'hidden' : 'visible');
    if (!$wrapper.parent().hasClass(OVERLAY_CONTENT_CLASS)) {
      this._addCustomCssClass($wrapper);
    }
    var $itemsContainer = _MenuBase.prototype._renderContainer.call(this, $wrapper);
    if (submenuContainer) {
      return $itemsContainer;
    }
    if (this.option('width')) {
      return $itemsContainer.css('minWidth', this.option('width'));
    }
    if (this.option('height')) {
      return $itemsContainer.css('minHeight', this.option('height'));
    }
    return $itemsContainer;
  };
  _proto._renderSubmenuItems = function _renderSubmenuItems(node, $itemFrame) {
    this._renderItems(this._getChildNodes(node), $itemFrame);
    this._actions.onSubmenuCreated({
      itemElement: (0, _element.getPublicElement)($itemFrame),
      itemData: node.internalFields.item,
      submenuElement: (0, _element.getPublicElement)($itemFrame.children(".".concat(DX_SUBMENU_CLASS)))
    });
  };
  _proto._getOverlayOptions = function _getOverlayOptions() {
    var _this4 = this;
    var position = this.option('position');
    var overlayOptions = {
      focusStateEnabled: this.option('focusStateEnabled'),
      animation: this.option('animation'),
      innerOverlay: true,
      hideOnOutsideClick: function hideOnOutsideClick(e) {
        return _this4._hideOnOutsideClickHandler(e);
      },
      propagateOutsideClick: true,
      hideOnParentScroll: true,
      deferRendering: false,
      position: {
        at: position.at,
        my: position.my,
        of: this._getTarget(),
        collision: 'flipfit'
      },
      shading: false,
      showTitle: false,
      height: 'auto',
      width: 'auto',
      onShown: this._overlayShownActionHandler.bind(this),
      onHiding: this._overlayHidingActionHandler.bind(this),
      onHidden: this._overlayHiddenActionHandler.bind(this),
      visualContainer: window
    };
    return overlayOptions;
  };
  _proto._overlayShownActionHandler = function _overlayShownActionHandler(arg) {
    this._actions.onShown(arg);
  };
  _proto._overlayHidingActionHandler = function _overlayHidingActionHandler(arg) {
    this._actions.onHiding(arg);
    if (!arg.cancel) {
      this._hideAllShownSubmenus();
      this._setOptionWithoutOptionChange('visible', false);
    }
  };
  _proto._overlayHiddenActionHandler = function _overlayHiddenActionHandler(arg) {
    this._actions.onHidden(arg);
  };
  _proto._shouldHideOnOutsideClick = function _shouldHideOnOutsideClick(e) {
    var _this$option = this.option(),
      closeOnOutsideClick = _this$option.closeOnOutsideClick,
      hideOnOutsideClick = _this$option.hideOnOutsideClick;
    if ((0, _type.isFunction)(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    } else if ((0, _type.isFunction)(closeOnOutsideClick)) {
      return closeOnOutsideClick(e);
    } else {
      return hideOnOutsideClick || closeOnOutsideClick;
    }
  };
  _proto._hideOnOutsideClickHandler = function _hideOnOutsideClickHandler(e) {
    if (!this._shouldHideOnOutsideClick(e)) {
      return false;
    }
    if (_dom_adapter.default.isDocument(e.target)) {
      return true;
    }
    var $activeItemContainer = this._getActiveItemsContainer(e.target);
    var $itemContainers = this._getItemsContainers();
    var $clickedItem = this._searchActiveItem(e.target);
    var $rootItem = this.$element().parents(".".concat(DX_MENU_ITEM_CLASS));
    var isRootItemClicked = $clickedItem[0] === $rootItem[0] && $clickedItem.length && $rootItem.length;
    var isInnerOverlayClicked = this._isIncludeOverlay($activeItemContainer, $itemContainers) && $clickedItem.length;
    if (isInnerOverlayClicked || isRootItemClicked) {
      if (this._getShowSubmenuMode() === 'onClick') {
        this._hideAllShownChildSubmenus($clickedItem);
      }
      return false;
    }
    return true;
  };
  _proto._getActiveItemsContainer = function _getActiveItemsContainer(target) {
    return (0, _renderer.default)(target).closest(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
  };
  _proto._getItemsContainers = function _getItemsContainers() {
    return this._overlay.$content().find(".".concat(DX_MENU_ITEMS_CONTAINER_CLASS));
  };
  _proto._searchActiveItem = function _searchActiveItem(target) {
    return (0, _renderer.default)(target).closest(".".concat(DX_MENU_ITEM_CLASS)).eq(0);
  };
  _proto._isIncludeOverlay = function _isIncludeOverlay($activeOverlay, $allOverlays) {
    var isSame = false;
    (0, _iterator.each)($allOverlays, function (index, $overlay) {
      if ($activeOverlay.is($overlay) && !isSame) {
        isSame = true;
      }
    });
    return isSame;
  };
  _proto._hideAllShownChildSubmenus = function _hideAllShownChildSubmenus($clickedItem) {
    var _this5 = this;
    var $submenuElements = $clickedItem.find(".".concat(DX_SUBMENU_CLASS));
    var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);
    if ($submenuElements.length > 0) {
      (0, _iterator.each)(shownSubmenus, function (index, $submenu) {
        var $context = _this5._searchActiveItem($submenu.context).parent();
        if ($context.parent().is($clickedItem.parent().parent()) && !$context.is($clickedItem.parent())) {
          _this5._hideSubmenu($submenu);
        }
      });
    }
  };
  _proto._showSubmenu = function _showSubmenu($item) {
    var node = this._dataAdapter.getNodeByItem(this._getItemData($item));
    this._hideSubmenusOnSameLevel($item);
    if (!this._hasSubmenu(node)) return;
    var $submenu = $item.children(".".concat(DX_SUBMENU_CLASS));
    var isSubmenuRendered = $submenu.length;
    _MenuBase.prototype._showSubmenu.call(this, $item);
    if (!isSubmenuRendered) {
      this._renderSubmenuItems(node, $item);
    }
    if (!this._isSubmenuVisible($submenu)) {
      this._drawSubmenu($item);
    }
  };
  _proto._hideSubmenusOnSameLevel = function _hideSubmenusOnSameLevel($item) {
    var $expandedItems = $item.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS)).siblings().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));
    if ($expandedItems.length) {
      $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
      this._hideSubmenu($expandedItems.find(".".concat(DX_SUBMENU_CLASS)));
    }
  };
  _proto._hideSubmenuGroup = function _hideSubmenuGroup($submenu) {
    if (this._isSubmenuVisible($submenu)) {
      this._hideSubmenuCore($submenu);
    }
  };
  _proto._isSubmenuVisible = function _isSubmenuVisible($submenu) {
    return $submenu.css('visibility') === 'visible';
  };
  _proto._drawSubmenu = function _drawSubmenu($itemElement) {
    var animation = this.option('animation') ? this.option('animation').show : {};
    var $submenu = $itemElement.children(".".concat(DX_SUBMENU_CLASS));
    var submenuPosition = this._getSubmenuPosition($itemElement);
    if (this._overlay && this._overlay.option('visible')) {
      if (!(0, _type.isDefined)(this._shownSubmenus)) {
        this._shownSubmenus = [];
      }
      if (!this._shownSubmenus.includes($submenu)) {
        this._shownSubmenus.push($submenu);
      }
      if (animation) {
        _fx.default.stop($submenu);
      }
      _position.default.setup($submenu, submenuPosition);
      if (animation) {
        if ((0, _type.isPlainObject)(animation.to)) {
          animation.to.position = submenuPosition;
        }
        this._animate($submenu, animation);
      }
      $submenu.css('visibility', 'visible');
    }
  };
  _proto._animate = function _animate($container, options) {
    _fx.default.animate($container, options);
  };
  _proto._getSubmenuPosition = function _getSubmenuPosition($rootItem) {
    var submenuDirection = this.option('submenuDirection').toLowerCase();
    var $rootItemWrapper = $rootItem.parent(".".concat(DX_MENU_ITEM_WRAPPER_CLASS));
    var position = {
      collision: 'flip',
      of: $rootItemWrapper,
      offset: {
        h: 0,
        v: -1
      }
    };
    switch (submenuDirection) {
      case 'left':
        position.at = 'left top';
        position.my = 'right top';
        break;
      case 'right':
        position.at = 'right top';
        position.my = 'left top';
        break;
      default:
        if (this.option('rtlEnabled')) {
          position.at = 'left top';
          position.my = 'right top';
        } else {
          position.at = 'right top';
          position.my = 'left top';
        }
        break;
    }
    return position;
  }

  // TODO: try to simplify it
  ;
  _proto._updateSubmenuVisibilityOnClick = function _updateSubmenuVisibilityOnClick(actionArgs) {
    if (!actionArgs.args.length) return;
    var itemData = actionArgs.args[0].itemData;
    var node = this._dataAdapter.getNodeByItem(itemData);
    if (!node) return;
    var $itemElement = (0, _renderer.default)(actionArgs.args[0].itemElement);
    var $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
    var shouldRenderSubmenu = this._hasSubmenu(node) && !$submenu.length;
    if (shouldRenderSubmenu) {
      this._renderSubmenuItems(node, $itemElement);
      $submenu = $itemElement.find(".".concat(DX_SUBMENU_CLASS));
    }
    if ($itemElement.context === $submenu.context && $submenu.css('visibility') === 'visible') {
      return;
    }
    this._updateSelectedItemOnClick(actionArgs);

    // T238943. Give the workaround with e.cancel and remove this hack
    var notCloseMenuOnItemClick = itemData && itemData.closeMenuOnClick === false;
    if (!itemData || itemData.disabled || notCloseMenuOnItemClick) {
      return;
    }
    if ($submenu.length === 0) {
      var $prevSubmenu = (0, _renderer.default)($itemElement.parents(".".concat(DX_SUBMENU_CLASS))[0]);
      this._hideSubmenu($prevSubmenu);
      if (!actionArgs.canceled && this._overlay && this._overlay.option('visible')) {
        this.option('visible', false);
      }
    } else {
      if (this._shownSubmenus && this._shownSubmenus.length > 0) {
        if (this._shownSubmenus[0].is($submenu)) {
          this._hideSubmenu($submenu); // close to parent?
        }
      }

      this._showSubmenu($itemElement);
    }
  };
  _proto._hideSubmenu = function _hideSubmenu($curSubmenu) {
    var _this6 = this;
    var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);
    (0, _iterator.each)(shownSubmenus, function (index, $submenu) {
      if ($curSubmenu.is($submenu) || (0, _dom.contains)($curSubmenu[0], $submenu[0])) {
        $submenu.parent().removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
        _this6._hideSubmenuCore($submenu);
      }
    });
  };
  _proto._hideSubmenuCore = function _hideSubmenuCore($submenu) {
    var index = this._shownSubmenus.indexOf($submenu);
    var animation = this.option('animation') ? this.option('animation').hide : null;
    if (index >= 0) {
      this._shownSubmenus.splice(index, 1);
    }
    this._stopAnimate($submenu);
    animation && this._animate($submenu, animation);
    $submenu.css('visibility', 'hidden');
  };
  _proto._stopAnimate = function _stopAnimate($container) {
    _fx.default.stop($container, true);
  };
  _proto._hideAllShownSubmenus = function _hideAllShownSubmenus() {
    var _this7 = this;
    var shownSubmenus = (0, _extend.extend)([], this._shownSubmenus);
    var $expandedItems = this._overlay.$content().find(".".concat(DX_MENU_ITEM_EXPANDED_CLASS));
    $expandedItems.removeClass(DX_MENU_ITEM_EXPANDED_CLASS);
    (0, _iterator.each)(shownSubmenus, function (_, $submenu) {
      _this7._hideSubmenu($submenu);
    });
  };
  _proto._visibilityChanged = function _visibilityChanged(visible) {
    if (visible) {
      this._renderContentImpl();
    }
  };
  _proto._optionChanged = function _optionChanged(args) {
    if (ACTIONS.includes(args.name)) {
      this._initActions();
      return;
    }
    switch (args.name) {
      case 'visible':
        this._renderVisibility(args.value);
        break;
      case 'showEvent':
      case 'position':
      case 'submenuDirection':
        this._invalidate();
        break;
      case 'target':
        args.previousValue && this._detachShowContextMenuEvents(args.previousValue);
        this._invalidate();
        break;
      case 'closeOnOutsideClick':
      case 'hideOnOutsideClick':
        break;
      default:
        _MenuBase.prototype._optionChanged.call(this, args);
    }
  };
  _proto._renderVisibility = function _renderVisibility(showing) {
    return showing ? this._show() : this._hide();
  };
  _proto._toggleVisibility = function _toggleVisibility() {};
  _proto._show = function _show(event) {
    var args = {
      jQEvent: event
    };
    var promise = new _deferred.Deferred().reject().promise();
    this._actions.onShowing(args);
    if (args.cancel) {
      return promise;
    }
    var position = this._positionContextMenu(event);
    if (position) {
      var _event$originalEvent;
      if (!this._overlay) {
        this._renderContextMenuOverlay();
        this._overlay.$content().addClass(this._widgetClass());
        this._renderFocusState();
        this._attachHoverEvents();
        this._attachClickEvent();
        this._renderItems(this._dataAdapter.getRootNodes());
      }
      this._setOptionWithoutOptionChange('visible', true);
      this._overlay.option('position', position);
      promise = this._overlay.show();
      event && event.stopPropagation();
      this._setAriaAttributes();

      // T983617. Prevent the browser's context menu appears on desktop touch screens.
      if ((event === null || event === void 0 ? void 0 : (_event$originalEvent = event.originalEvent) === null || _event$originalEvent === void 0 ? void 0 : _event$originalEvent.type) === _hold.default.name) {
        this.preventShowingDefaultContextMenuAboveOverlay();
      }
    }
    return promise;
  };
  _proto._setAriaAttributes = function _setAriaAttributes() {
    this._overlayContentId = "dx-".concat(new _guid.default());
    this.setAria('owns', this._overlayContentId);
    this.setAria({
      'id': this._overlayContentId,
      'role': 'menu'
    }, this._overlay.$content());
  };
  _proto._cleanAriaAttributes = function _cleanAriaAttributes() {
    this._overlay && this.setAria('id', null, this._overlay.$content());
    this.setAria('owns', undefined);
  };
  _proto._getTarget = function _getTarget() {
    return this.option('target') || this.option('position').of || (0, _renderer.default)(_dom_adapter.default.getDocument());
  };
  _proto._getContextMenuPosition = function _getContextMenuPosition() {
    return (0, _extend.extend)({}, this.option('position'), {
      of: this._getTarget()
    });
  };
  _proto._positionContextMenu = function _positionContextMenu(jQEvent) {
    var position = this._getContextMenuPosition();
    var isInitialPosition = this._isInitialOptionValue('position');
    var positioningAction = this._createActionByOption('onPositioning');
    if (jQEvent && jQEvent.preventDefault && isInitialPosition) {
      position.of = jQEvent;
    }
    var actionArgs = {
      position: position,
      event: jQEvent
    };
    positioningAction(actionArgs);
    if (actionArgs.cancel) {
      position = null;
    } else {
      if (actionArgs.event) {
        actionArgs.event.cancel = true;
        jQEvent.preventDefault();
      }
    }
    return position;
  };
  _proto._refresh = function _refresh() {
    if (!(0, _window.hasWindow)()) {
      _MenuBase.prototype._refresh.call(this);
    } else {
      if (this._overlay) {
        var lastPosition = this._overlay.option('position');
        _MenuBase.prototype._refresh.call(this);
        this._overlay && this._overlay.option('position', lastPosition);
      } else {
        _MenuBase.prototype._refresh.call(this);
      }
    }
  };
  _proto._hide = function _hide() {
    var promise;
    if (this._overlay) {
      promise = this._overlay.hide();
      this._setOptionWithoutOptionChange('visible', false);
    }
    this._cleanAriaAttributes();
    this.option('focusedElement', null);
    return promise || new _deferred.Deferred().reject().promise();
  };
  _proto.toggle = function toggle(showing) {
    var visible = this.option('visible');
    showing = showing === undefined ? !visible : showing;
    return this._renderVisibility(showing);
  };
  _proto.show = function show() {
    return this.toggle(true);
  };
  _proto.hide = function hide() {
    return this.toggle(false);
  };
  return ContextMenu;
}(_ui2.default);
(0, _component_registrator.default)('dxContextMenu', ContextMenu);
var _default = ContextMenu;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
