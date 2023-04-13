/**
* DevExtreme (esm/ui/popup/ui.popup.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { EmptyTemplate } from '../../core/templates/empty_template';
import browser from '../../core/utils/browser';
import { noop } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { camelize } from '../../core/utils/inflector';
import { each } from '../../core/utils/iterator';
import { getVisibleHeight, addOffsetToMaxHeight, addOffsetToMinHeight, getVerticalOffsets, getOuterWidth, getWidth, getHeight } from '../../core/utils/size';
import { getBoundingRect } from '../../core/utils/position';
import { isDefined, isObject } from '../../core/utils/type';
import { compare as compareVersions } from '../../core/utils/version';
import { getWindow, hasWindow } from '../../core/utils/window';
import { triggerResizeEvent } from '../../events/visibility_change';
import messageLocalization from '../../localization/message';
import PopupDrag from './popup_drag';
import Resizable from '../resizable';
import Button from '../button';
import Overlay from '../overlay/ui.overlay';
import { isMaterial, current as currentTheme } from '../themes';
import '../toolbar/ui.toolbar.base';
import resizeObserverSingleton from '../../core/resize_observer';
import * as zIndexPool from '../overlay/z_index';
import { PopupPositionController } from './popup_position_controller';
import { createBodyOverflowManager } from './popup_overflow_manager';
var window = getWindow();

// STYLE popup

var POPUP_CLASS = 'dx-popup';
var POPUP_WRAPPER_CLASS = 'dx-popup-wrapper';
var POPUP_FULL_SCREEN_CLASS = 'dx-popup-fullscreen';
var POPUP_FULL_SCREEN_WIDTH_CLASS = 'dx-popup-fullscreen-width';
var POPUP_NORMAL_CLASS = 'dx-popup-normal';
var POPUP_CONTENT_CLASS = 'dx-popup-content';
var POPUP_CONTENT_SCROLLABLE_CLASS = 'dx-popup-content-scrollable';
var DISABLED_STATE_CLASS = 'dx-state-disabled';
var POPUP_DRAGGABLE_CLASS = 'dx-popup-draggable';
var POPUP_TITLE_CLASS = 'dx-popup-title';
var POPUP_TITLE_CLOSEBUTTON_CLASS = 'dx-closebutton';
var POPUP_BOTTOM_CLASS = 'dx-popup-bottom';
var POPUP_HAS_CLOSE_BUTTON_CLASS = 'dx-has-close-button';
var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
var POPUP_CONTENT_FLEX_HEIGHT_CLASS = 'dx-popup-flex-height';
var POPUP_CONTENT_INHERIT_HEIGHT_CLASS = 'dx-popup-inherit-height';
var ALLOWED_TOOLBAR_ITEM_ALIASES = ['cancel', 'clear', 'done'];
var BUTTON_DEFAULT_TYPE = 'default';
var BUTTON_NORMAL_TYPE = 'normal';
var BUTTON_TEXT_MODE = 'text';
var BUTTON_CONTAINED_MODE = 'contained';
var IS_OLD_SAFARI = browser.safari && compareVersions(browser.version, [11]) < 0;
var HEIGHT_STRATEGIES = {
  static: '',
  inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
  flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
};
var getButtonPlace = name => {
  var device = devices.current();
  var platform = device.platform;
  var toolbar = 'bottom';
  var location = 'before';
  if (platform === 'ios') {
    switch (name) {
      case 'cancel':
        toolbar = 'top';
        break;
      case 'clear':
        toolbar = 'top';
        location = 'after';
        break;
      case 'done':
        location = 'after';
        break;
    }
  } else if (platform === 'android') {
    switch (name) {
      case 'cancel':
        location = 'after';
        break;
      case 'done':
        location = 'after';
        break;
    }
  }
  return {
    toolbar,
    location
  };
};
var Popup = Overlay.inherit({
  _supportedKeys: function _supportedKeys() {
    return extend(this.callBase(), {
      upArrow: e => {
        var _this$_drag;
        (_this$_drag = this._drag) === null || _this$_drag === void 0 ? void 0 : _this$_drag.moveUp(e);
      },
      downArrow: e => {
        var _this$_drag2;
        (_this$_drag2 = this._drag) === null || _this$_drag2 === void 0 ? void 0 : _this$_drag2.moveDown(e);
      },
      leftArrow: e => {
        var _this$_drag3;
        (_this$_drag3 = this._drag) === null || _this$_drag3 === void 0 ? void 0 : _this$_drag3.moveLeft(e);
      },
      rightArrow: e => {
        var _this$_drag4;
        (_this$_drag4 = this._drag) === null || _this$_drag4 === void 0 ? void 0 : _this$_drag4.moveRight(e);
      }
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      fullScreen: false,
      title: '',
      showTitle: true,
      titleTemplate: 'title',
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
      dragAndResizeArea: undefined,
      enableBodyScroll: true,
      outsideDragFactor: 0,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      resizeEnabled: false,
      toolbarItems: [],
      showCloseButton: false,
      bottomTemplate: 'bottom',
      useDefaultToolbarButtons: false,
      useFlatToolbarButtons: false,
      autoResizeEnabled: true
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    var themeName = currentTheme();
    return this.callBase().concat([{
      device: {
        platform: 'ios'
      },
      options: {
        animation: this._iosAnimation
      }
    }, {
      device: {
        platform: 'android'
      },
      options: {
        animation: this._androidAnimation
      }
    }, {
      device: {
        platform: 'generic'
      },
      options: {
        showCloseButton: true
      }
    }, {
      device: function device(_device) {
        return devices.real().deviceType === 'desktop' && _device.platform === 'generic';
      },
      options: {
        dragEnabled: true
      }
    }, {
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function device() {
        return isMaterial(themeName);
      },
      options: {
        useDefaultToolbarButtons: true,
        useFlatToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  },
  _iosAnimation: {
    show: {
      type: 'slide',
      duration: 400,
      from: {
        position: {
          my: 'top',
          at: 'bottom'
        }
      },
      to: {
        position: {
          my: 'center',
          at: 'center'
        }
      }
    },
    hide: {
      type: 'slide',
      duration: 400,
      from: {
        opacity: 1,
        position: {
          my: 'center',
          at: 'center'
        }
      },
      to: {
        opacity: 1,
        position: {
          my: 'top',
          at: 'bottom'
        }
      }
    }
  },
  _androidAnimation: function _androidAnimation() {
    var fullScreenConfig = {
      show: {
        type: 'slide',
        duration: 300,
        from: {
          top: '30%',
          opacity: 0
        },
        to: {
          top: 0,
          opacity: 1
        }
      },
      hide: {
        type: 'slide',
        duration: 300,
        from: {
          top: 0,
          opacity: 1
        },
        to: {
          top: '30%',
          opacity: 0
        }
      }
    };
    var defaultConfig = {
      show: {
        type: 'fade',
        duration: 400,
        from: 0,
        to: 1
      },
      hide: {
        type: 'fade',
        duration: 400,
        from: 1,
        to: 0
      }
    };
    return this.option('fullScreen') ? fullScreenConfig : defaultConfig;
  },
  _init: function _init() {
    var popupWrapperClassExternal = this.option('_wrapperClassExternal');
    var popupWrapperClasses = popupWrapperClassExternal ? "".concat(POPUP_WRAPPER_CLASS, " ").concat(popupWrapperClassExternal) : POPUP_WRAPPER_CLASS;
    this.callBase();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass(POPUP_CLASS);
    this.$wrapper().addClass(popupWrapperClasses);
    this._$popupContent = this._$content.wrapInner($('<div>').addClass(POPUP_CONTENT_CLASS)).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr('role', 'dialog');
  },
  _render: function _render() {
    var isFullscreen = this.option('fullScreen');
    this._toggleFullScreenClass(isFullscreen);
    this.callBase();
  },
  _createBodyOverflowManager: function _createBodyOverflowManager() {
    this._bodyOverflowManager = createBodyOverflowManager();
  },
  _toggleFullScreenClass: function _toggleFullScreenClass(value) {
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value);
  },
  _initTemplates: function _initTemplates() {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      title: new EmptyTemplate(),
      bottom: new EmptyTemplate()
    });
  },
  _getActionsList: function _getActionsList() {
    return this.callBase().concat(['onResizeStart', 'onResize', 'onResizeEnd']);
  },
  _contentResizeHandler: function _contentResizeHandler(entry) {
    if (!this._shouldSkipContentResize(entry)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  },
  _doesShowAnimationChangeDimensions: function _doesShowAnimationChangeDimensions() {
    var animation = this.option('animation');
    return ['to', 'from'].some(prop => {
      var _animation$show;
      var config = animation === null || animation === void 0 ? void 0 : (_animation$show = animation.show) === null || _animation$show === void 0 ? void 0 : _animation$show[prop];
      return isObject(config) && ('width' in config || 'height' in config);
    });
  },
  _updateResizeCallbackSkipCondition() {
    var doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
    this._shouldSkipContentResize = entry => {
      return doesShowAnimationChangeDimensions && this._showAnimationProcessing || this._areContentDimensionsRendered(entry);
    };
  },
  _observeContentResize: function _observeContentResize(shouldObserve) {
    if (!this.option('useResizeObserver')) {
      return;
    }
    var contentElement = this._$content.get(0);
    if (shouldObserve) {
      resizeObserverSingleton.observe(contentElement, entry => {
        this._contentResizeHandler(entry);
      });
    } else {
      resizeObserverSingleton.unobserve(contentElement);
    }
  },
  _areContentDimensionsRendered: function _areContentDimensionsRendered(entry) {
    var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
    var contentBox = (_entry$contentBoxSize = entry.contentBoxSize) === null || _entry$contentBoxSize === void 0 ? void 0 : _entry$contentBoxSize[0];
    if (contentBox) {
      var _this$_renderedDimens, _this$_renderedDimens2;
      return parseInt(contentBox.inlineSize, 10) === ((_this$_renderedDimens = this._renderedDimensions) === null || _this$_renderedDimens === void 0 ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === ((_this$_renderedDimens2 = this._renderedDimensions) === null || _this$_renderedDimens2 === void 0 ? void 0 : _this$_renderedDimens2.height);
    }
    var contentRect = entry.contentRect;
    return parseInt(contentRect.width, 10) === ((_this$_renderedDimens3 = this._renderedDimensions) === null || _this$_renderedDimens3 === void 0 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === ((_this$_renderedDimens4 = this._renderedDimensions) === null || _this$_renderedDimens4 === void 0 ? void 0 : _this$_renderedDimens4.height);
  },
  _renderContent() {
    this.callBase();
    // NOTE: This observe should not be called before async showing is called. See T1130045.
    this._observeContentResize(true);
  },
  _renderContentImpl: function _renderContentImpl() {
    this._renderTitle();
    this.callBase();
    this._renderResize();
    this._renderBottom();
  },
  _renderTitle: function _renderTitle() {
    var items = this._getToolbarItems('top');
    var titleText = this.option('title');
    var showTitle = this.option('showTitle');
    if (showTitle && !!titleText) {
      items.unshift({
        location: devices.current().ios ? 'center' : 'before',
        text: titleText
      });
    }
    if (showTitle || items.length > 0) {
      this._$title && this._$title.remove();
      var $title = $('<div>').addClass(POPUP_TITLE_CLASS).insertBefore(this.$content());
      this._$title = this._renderTemplateByType('titleTemplate', items, $title).addClass(POPUP_TITLE_CLASS);
      this._renderDrag();
      this._executeTitleRenderAction(this._$title);
      this._$title.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton());
    } else if (this._$title) {
      this._$title.detach();
    }
  },
  _renderTemplateByType: function _renderTemplateByType(optionName, data, $container, additionalToolbarOptions) {
    var {
      rtlEnabled,
      useDefaultToolbarButtons,
      useFlatToolbarButtons,
      disabled
    } = this.option();
    var template = this._getTemplateByOption(optionName);
    var toolbarTemplate = template instanceof EmptyTemplate;
    if (toolbarTemplate) {
      var integrationOptions = extend({}, this.option('integrationOptions'), {
        skipTemplates: ['content', 'title']
      });
      var toolbarOptions = extend(additionalToolbarOptions, {
        items: data,
        rtlEnabled,
        useDefaultButtons: useDefaultToolbarButtons,
        useFlatButtons: useFlatToolbarButtons,
        disabled,
        integrationOptions
      });
      this._getTemplate('dx-polymorph-widget').render({
        container: $container,
        model: {
          widget: this._getToolbarName(),
          options: toolbarOptions
        }
      });
      var $toolbar = $container.children('div');
      $container.replaceWith($toolbar);
      return $toolbar;
    } else {
      var $result = $(template.render({
        container: getPublicElement($container)
      }));
      if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
        $container.replaceWith($result);
        $container = $result;
      }
      return $container;
    }
  },
  _getToolbarName: function _getToolbarName() {
    return 'dxToolbarBase';
  },
  _renderVisibilityAnimate: function _renderVisibilityAnimate(visible) {
    return this.callBase(visible);
  },
  _hide() {
    this._observeContentResize(false);
    return this.callBase();
  },
  _executeTitleRenderAction: function _executeTitleRenderAction($titleElement) {
    this._getTitleRenderAction()({
      titleElement: getPublicElement($titleElement)
    });
  },
  _getTitleRenderAction: function _getTitleRenderAction() {
    return this._titleRenderAction || this._createTitleRenderAction();
  },
  _createTitleRenderAction: function _createTitleRenderAction() {
    return this._titleRenderAction = this._createActionByOption('onTitleRendered', {
      element: this.element(),
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  _getCloseButton: function _getCloseButton() {
    return {
      toolbar: 'top',
      location: 'after',
      template: this._getCloseButtonRenderer()
    };
  },
  _getCloseButtonRenderer: function _getCloseButtonRenderer() {
    return (_, __, container) => {
      var $button = $('<div>').addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
      this._createComponent($button, Button, {
        icon: 'close',
        onClick: this._createToolbarItemAction(undefined),
        stylingMode: 'text',
        integrationOptions: {}
      });
      $(container).append($button);
    };
  },
  _getToolbarItems: function _getToolbarItems(toolbar) {
    var toolbarItems = this.option('toolbarItems');
    var toolbarsItems = [];
    this._toolbarItemClasses = [];
    var currentPlatform = devices.current().platform;
    var index = 0;
    each(toolbarItems, (_, data) => {
      var isShortcut = isDefined(data.shortcut);
      var item = isShortcut ? getButtonPlace(data.shortcut) : data;
      if (isShortcut && currentPlatform === 'ios' && index < 2) {
        item.toolbar = 'top';
        index++;
      }
      item.toolbar = data.toolbar || item.toolbar || 'top';
      if (item && item.toolbar === toolbar) {
        if (isShortcut) {
          extend(item, {
            location: data.location
          }, this._getToolbarItemByAlias(data));
        }
        var isLTROrder = currentPlatform === 'generic';
        if (data.shortcut === 'done' && isLTROrder || data.shortcut === 'cancel' && !isLTROrder) {
          toolbarsItems.unshift(item);
        } else {
          toolbarsItems.push(item);
        }
      }
    });
    if (toolbar === 'top' && this._hasCloseButton()) {
      toolbarsItems.push(this._getCloseButton());
    }
    return toolbarsItems;
  },
  _hasCloseButton() {
    return this.option('showCloseButton') && this.option('showTitle');
  },
  _getLocalizationKey(itemType) {
    return itemType.toLowerCase() === 'done' ? 'OK' : camelize(itemType, true);
  },
  _getToolbarItemByAlias: function _getToolbarItemByAlias(data) {
    var that = this;
    var itemType = data.shortcut;
    if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
      return false;
    }
    var itemConfig = extend({
      text: messageLocalization.format(this._getLocalizationKey(itemType)),
      onClick: this._createToolbarItemAction(data.onClick),
      integrationOptions: {},
      type: that.option('useDefaultToolbarButtons') ? BUTTON_DEFAULT_TYPE : BUTTON_NORMAL_TYPE,
      stylingMode: that.option('useFlatToolbarButtons') ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE
    }, data.options || {});
    var itemClass = POPUP_CLASS + '-' + itemType;
    this._toolbarItemClasses.push(itemClass);
    return {
      template: function template(_, __, container) {
        var $toolbarItem = $('<div>').addClass(itemClass).appendTo(container);
        that._createComponent($toolbarItem, Button, itemConfig);
      }
    };
  },
  _createToolbarItemAction: function _createToolbarItemAction(clickAction) {
    return this._createAction(clickAction, {
      afterExecute: function afterExecute(e) {
        e.component.hide();
      }
    });
  },
  _renderBottom: function _renderBottom() {
    var items = this._getToolbarItems('bottom');
    if (items.length) {
      this._$bottom && this._$bottom.remove();
      var $bottom = $('<div>').addClass(POPUP_BOTTOM_CLASS).insertAfter(this.$content());
      this._$bottom = this._renderTemplateByType('bottomTemplate', items, $bottom, {
        compactMode: true
      }).addClass(POPUP_BOTTOM_CLASS);
      this._toggleClasses();
    } else {
      this._$bottom && this._$bottom.detach();
    }
  },
  _toggleDisabledState: function _toggleDisabledState(value) {
    this.callBase(...arguments);
    this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value));
  },
  _toggleClasses: function _toggleClasses() {
    var aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
    each(aliases, (_, alias) => {
      var className = POPUP_CLASS + '-' + alias;
      if (this._toolbarItemClasses.includes(className)) {
        this.$wrapper().addClass(className + '-visible');
        this._$bottom.addClass(className);
      } else {
        this.$wrapper().removeClass(className + '-visible');
        this._$bottom.removeClass(className);
      }
    });
  },
  _toggleFocusClass(isFocused, $element) {
    this.callBase(isFocused, $element);
    if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
      var zIndex = zIndexPool.create(this._zIndexInitValue());
      zIndexPool.remove(this._zIndex);
      this._zIndex = zIndex;
      this._$wrapper.css('zIndex', zIndex);
      this._$content.css('zIndex', zIndex);
    }
  },
  _toggleContentScrollClass() {
    var isNativeScrollingEnabled = !this.option('preventScrollEvents');
    this.$content().toggleClass(POPUP_CONTENT_SCROLLABLE_CLASS, isNativeScrollingEnabled);
  },
  _getPositionControllerConfig() {
    var {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = this.option();
    return extend({}, this.callBase(), {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
  },
  _initPositionController() {
    this._positionController = new PopupPositionController(this._getPositionControllerConfig());
  },
  _getDragTarget: function _getDragTarget() {
    return this.topToolbar();
  },
  _renderGeometry: function _renderGeometry(options) {
    var {
      visible,
      useResizeObserver
    } = this.option();
    if (visible && hasWindow()) {
      var isAnimated = this._showAnimationProcessing;
      var shouldRepeatAnimation = isAnimated && !(options !== null && options !== void 0 && options.forceStopAnimation) && useResizeObserver;
      this._isAnimationPaused = shouldRepeatAnimation || undefined;
      this._stopAnimation();
      if (options !== null && options !== void 0 && options.shouldOnlyReposition) {
        this._renderPosition(false);
      } else {
        this._renderGeometryImpl(options === null || options === void 0 ? void 0 : options.isDimensionChange);
      }
      if (shouldRepeatAnimation) {
        this._animateShowing();
        this._isAnimationPaused = undefined;
      }
    }
  },
  _cacheDimensions: function _cacheDimensions() {
    if (!this.option('useResizeObserver')) {
      return;
    }
    this._renderedDimensions = {
      width: parseInt(getWidth(this._$content), 10),
      height: parseInt(getHeight(this._$content), 10)
    };
  },
  _renderGeometryImpl: function _renderGeometryImpl() {
    var isDimensionChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!isDimensionChange) {
      // NOTE: to save content scroll position T1113123
      // NOTE: for correct new position calculation
      this._resetContentHeight();
    }
    this.callBase();
    this._cacheDimensions();
    this._setContentHeight();
  },
  _resetContentHeight: function _resetContentHeight() {
    var height = this._getOptionValue('height');
    if (height === 'auto') {
      this.$content().css({
        height: 'auto',
        maxHeight: 'none'
      });
    }
  },
  _renderDrag: function _renderDrag() {
    var $dragTarget = this._getDragTarget();
    var dragEnabled = this.option('dragEnabled');
    if (!$dragTarget) {
      return;
    }
    var config = {
      dragEnabled,
      handle: $dragTarget.get(0),
      draggableElement: this._$content.get(0),
      positionController: this._positionController
    };
    if (this._drag) {
      this._drag.init(config);
    } else {
      this._drag = new PopupDrag(config);
    }
    this.$overlayContent().toggleClass(POPUP_DRAGGABLE_CLASS, dragEnabled);
  },
  _renderResize: function _renderResize() {
    this._resizable = this._createComponent(this._$content, Resizable, {
      handles: this.option('resizeEnabled') ? 'all' : 'none',
      onResizeEnd: e => {
        this._resizeEndHandler(e);
        this._observeContentResize(true);
      },
      onResize: e => {
        this._setContentHeight();
        this._actions.onResize(e);
      },
      onResizeStart: e => {
        this._observeContentResize(false);
        this._actions.onResizeStart(e);
      },
      minHeight: 100,
      minWidth: 100,
      area: this._positionController.$dragResizeContainer,
      keepAspectRatio: false
    });
  },
  _resizeEndHandler: function _resizeEndHandler(e) {
    var width = this._resizable.option('width');
    var height = this._resizable.option('height');
    width && this._setOptionWithoutOptionChange('width', width);
    height && this._setOptionWithoutOptionChange('height', height);
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    this._actions.onResizeEnd(e);
  },
  _setContentHeight: function _setContentHeight() {
    (this.option('forceApplyBindings') || noop)();
    var overlayContent = this.$overlayContent().get(0);
    var currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
    this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
    this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
  },
  _heightStrategyChangeOffset: function _heightStrategyChangeOffset(currentHeightStrategyClass, popupVerticalPaddings) {
    return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
  },
  _chooseHeightStrategy: function _chooseHeightStrategy(overlayContent) {
    var isAutoWidth = overlayContent.style.width === 'auto' || overlayContent.style.width === '';
    var currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
    if (this._isAutoHeight() && this.option('autoResizeEnabled')) {
      if (isAutoWidth || IS_OLD_SAFARI) {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
      } else {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
      }
    }
    return currentHeightStrategyClass;
  },
  _getHeightCssStyles: function _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
    var cssStyles = {};
    var contentMaxHeight = this._getOptionValue('maxHeight', overlayContent);
    var contentMinHeight = this._getOptionValue('minHeight', overlayContent);
    var popupHeightParts = this._splitPopupHeight();
    var toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
    if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
      if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
        var overlayHeight = this.option('fullScreen') ? Math.min(getBoundingRect(overlayContent).height, getWindow().innerHeight) : getBoundingRect(overlayContent).height;
        var contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
        cssStyles = {
          height: Math.max(0, contentHeight),
          minHeight: 'auto',
          maxHeight: 'auto'
        };
      }
    } else {
      var container = $(this._positionController.$visualContainer).get(0);
      var maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
      var minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
      cssStyles = {
        height: 'auto',
        minHeight: minHeightValue,
        maxHeight: maxHeightValue
      };
    }
    return cssStyles;
  },
  _setHeightClasses: function _setHeightClasses($container, currentClass) {
    var excessClasses = '';
    for (var name in HEIGHT_STRATEGIES) {
      if (HEIGHT_STRATEGIES[name] !== currentClass) {
        excessClasses += ' ' + HEIGHT_STRATEGIES[name];
      }
    }
    $container.removeClass(excessClasses).addClass(currentClass);
  },
  _isAutoHeight: function _isAutoHeight() {
    return this.$overlayContent().get(0).style.height === 'auto';
  },
  _splitPopupHeight: function _splitPopupHeight() {
    var topToolbar = this.topToolbar();
    var bottomToolbar = this.bottomToolbar();
    return {
      header: getVisibleHeight(topToolbar && topToolbar.get(0)),
      footer: getVisibleHeight(bottomToolbar && bottomToolbar.get(0)),
      contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
      popupVerticalOffsets: getVerticalOffsets(this.$content().get(0), true),
      popupVerticalPaddings: getVerticalOffsets(this.$content().get(0), false)
    };
  },
  _isAllWindowCovered: function _isAllWindowCovered() {
    return this.callBase() || this.option('fullScreen');
  },
  _renderDimensions: function _renderDimensions() {
    if (this.option('fullScreen')) {
      this.$overlayContent().css({
        width: '100%',
        height: '100%',
        minWidth: '',
        maxWidth: '',
        minHeight: '',
        maxHeight: ''
      });
    } else {
      this.callBase();
    }
    if (hasWindow()) {
      this._renderFullscreenWidthClass();
    }
  },
  _dimensionChanged: function _dimensionChanged() {
    this._renderGeometry({
      isDimensionChange: true
    });
  },
  _clean: function _clean() {
    this.callBase();
    this._observeContentResize(false);
  },
  _dispose: function _dispose() {
    this.callBase();
    this._toggleBodyScroll(true);
  },
  _renderFullscreenWidthClass: function _renderFullscreenWidthClass() {
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, getOuterWidth(this.$overlayContent()) === getWidth(window));
  },
  _toggleSafariScrolling() {
    if (!this.option('enableBodyScroll')) {
      return;
    }
    this.callBase();
  },
  _toggleBodyScroll: function _toggleBodyScroll(enabled) {
    if (!this._bodyOverflowManager) {
      return;
    }
    var {
      setOverflow,
      restoreOverflow
    } = this._bodyOverflowManager;
    if (enabled) {
      restoreOverflow();
    } else {
      setOverflow();
    }
  },
  refreshPosition: function refreshPosition() {
    this._renderPosition();
  },
  _optionChanged: function _optionChanged(args) {
    var _this$_resizable2;
    var {
      value,
      name
    } = args;
    switch (name) {
      case 'disabled':
        this.callBase(args);
        this._renderTitle();
        this._renderBottom();
        break;
      case 'animation':
        this._updateResizeCallbackSkipCondition();
        break;
      case 'enableBodyScroll':
        this._toggleBodyScroll(value);
        break;
      case 'showTitle':
      case 'title':
      case 'titleTemplate':
        this._renderTitle();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'bottomTemplate':
        this._renderBottom();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'container':
        this.callBase(args);
        if (this.option('resizeEnabled')) {
          var _this$_resizable;
          (_this$_resizable = this._resizable) === null || _this$_resizable === void 0 ? void 0 : _this$_resizable.option('area', this._positionController.$dragResizeContainer);
        }
        break;
      case 'width':
      case 'height':
        this.callBase(args);
        (_this$_resizable2 = this._resizable) === null || _this$_resizable2 === void 0 ? void 0 : _this$_resizable2.option(name, value);
        break;
      case 'onTitleRendered':
        this._createTitleRenderAction(value);
        break;
      case 'toolbarItems':
      case 'useDefaultToolbarButtons':
      case 'useFlatToolbarButtons':
        {
          // NOTE: Geometry rendering after "toolbarItems" runtime change breaks the popup animation first appereance.
          // But geometry rendering for options connected to the popup position still should be called.
          var shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
          this._renderTitle();
          this._renderBottom();
          if (shouldRenderGeometry) {
            this._renderGeometry();
            triggerResizeEvent(this.$overlayContent());
          }
          break;
        }
      case 'dragEnabled':
        this._renderDrag();
        break;
      case 'dragAndResizeArea':
        this._positionController.dragAndResizeArea = value;
        if (this.option('resizeEnabled')) {
          this._resizable.option('area', this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case 'dragOutsideBoundary':
        this._positionController.dragOutsideBoundary = value;
        if (this.option('resizeEnabled')) {
          this._resizable.option('area', this._positionController.$dragResizeContainer);
        }
        break;
      case 'outsideDragFactor':
        this._positionController.outsideDragFactor = value;
        break;
      case 'resizeEnabled':
        this._renderResize();
        this._renderGeometry();
        break;
      case 'autoResizeEnabled':
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'fullScreen':
        this._positionController.fullScreen = value;
        this._toggleFullScreenClass(value);
        this._toggleSafariScrolling();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case 'showCloseButton':
        this._renderTitle();
        break;
      case 'preventScrollEvents':
        this.callBase(args);
        this._toggleContentScrollClass();
        break;
      default:
        this.callBase(args);
    }
  },
  bottomToolbar: function bottomToolbar() {
    return this._$bottom;
  },
  topToolbar: function topToolbar() {
    return this._$title;
  },
  $content: function $content() {
    return this._$popupContent;
  },
  content: function content() {
    return getPublicElement(this.$content());
  },
  $overlayContent: function $overlayContent() {
    return this._$content;
  }
});
registerComponent('dxPopup', Popup);
export default Popup;
