import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar/ui.toolbar.base';
import { triggerResizeEvent } from '../../../common/core/events/visibility_change';
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import browser from '../../../core/utils/browser';
import { noop } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import { camelize } from '../../../core/utils/inflector';
import { each } from '../../../core/utils/iterator';
import { getBoundingRect } from '../../../core/utils/position';
import { addOffsetToMaxHeight, addOffsetToMinHeight, getHeight, getOuterWidth, getVerticalOffsets, getVisibleHeight, getWidth } from '../../../core/utils/size';
import { isDefined, isObject } from '../../../core/utils/type';
import { compare as compareVersions } from '../../../core/utils/version';
import Button from '../../../ui/button';
import Resizable from '../../../ui/resizable';
import { isFluent, isMaterial, isMaterialBased } from '../../../ui/themes';
import Overlay from '../../ui/overlay/m_overlay';
import * as zIndexPool from '../../ui/overlay/m_z_index';
import windowUtils from '../../core/utils/m_window';
import PopupDrag from './m_popup_drag';
import { createBodyOverflowManager } from './m_popup_overflow_manager';
import { PopupPositionController } from './m_popup_position_controller';
// STYLE popup
const window = windowUtils.getWindow();
const POPUP_CLASS = 'dx-popup';
const POPUP_WRAPPER_CLASS = 'dx-popup-wrapper';
const POPUP_FULL_SCREEN_CLASS = 'dx-popup-fullscreen';
const POPUP_FULL_SCREEN_WIDTH_CLASS = 'dx-popup-fullscreen-width';
const POPUP_NORMAL_CLASS = 'dx-popup-normal';
const POPUP_CONTENT_CLASS = 'dx-popup-content';
export const POPUP_CONTENT_SCROLLABLE_CLASS = 'dx-popup-content-scrollable';
const DISABLED_STATE_CLASS = 'dx-state-disabled';
const POPUP_DRAGGABLE_CLASS = 'dx-popup-draggable';
const POPUP_TITLE_CLASS = 'dx-popup-title';
const POPUP_TITLE_CLOSEBUTTON_CLASS = 'dx-closebutton';
const POPUP_BOTTOM_CLASS = 'dx-popup-bottom';
const POPUP_HAS_CLOSE_BUTTON_CLASS = 'dx-has-close-button';
export const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
const POPUP_CONTENT_FLEX_HEIGHT_CLASS = 'dx-popup-flex-height';
const POPUP_CONTENT_INHERIT_HEIGHT_CLASS = 'dx-popup-inherit-height';
const TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
const ALLOWED_TOOLBAR_ITEM_ALIASES = ['cancel', 'clear', 'done'];
const BUTTON_DEFAULT_TYPE = 'default';
const BUTTON_NORMAL_TYPE = 'normal';
const BUTTON_TEXT_MODE = 'text';
const BUTTON_CONTAINED_MODE = 'contained';
const BUTTON_OUTLINED_MODE = 'outlined';
const IS_OLD_SAFARI = browser.safari && compareVersions(browser.version, [11]) < 0;
const HEIGHT_STRATEGIES = {
  static: '',
  inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
  flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
};
const getButtonPlace = name => {
  const device = devices.current();
  const {
    platform
  } = device;
  let toolbar = 'bottom';
  let location = 'before';
  if (platform === 'ios') {
    // eslint-disable-next-line default-case
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
    // eslint-disable-next-line default-case
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
class Popup extends Overlay {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      upArrow: e => {
        var _this$_drag;
        (_this$_drag = this._drag) === null || _this$_drag === void 0 || _this$_drag.moveUp(e);
      },
      downArrow: e => {
        var _this$_drag2;
        (_this$_drag2 = this._drag) === null || _this$_drag2 === void 0 || _this$_drag2.moveDown(e);
      },
      leftArrow: e => {
        var _this$_drag3;
        (_this$_drag3 = this._drag) === null || _this$_drag3 === void 0 || _this$_drag3.moveLeft(e);
      },
      rightArrow: e => {
        var _this$_drag4;
        (_this$_drag4 = this._drag) === null || _this$_drag4 === void 0 || _this$_drag4.moveRight(e);
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      fullScreen: false,
      title: '',
      showTitle: true,
      titleTemplate: 'title',
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
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
  }
  _defaultOptionsRules() {
    // @ts-expect-error ts-error
    return super._defaultOptionsRules().concat([{
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
      device(device) {
        return devices.real().deviceType === 'desktop' && device.platform === 'generic';
      },
      options: {
        dragEnabled: true
      }
    }, {
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterialBased();
      },
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device() {
        // @ts-expect-error ts-error
        return isMaterial();
      },
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _iosAnimation() {
    return {
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
    };
  }
  _androidAnimation() {
    const fullScreenConfig = {
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
    const defaultConfig = {
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
    // @ts-expect-error ts-error
    return this.option('fullScreen') ? fullScreenConfig : defaultConfig;
  }
  _init() {
    const {
      _wrapperClassExternal: popupWrapperClassExternal
    } = this.option();
    const popupWrapperClasses = popupWrapperClassExternal ? `${POPUP_WRAPPER_CLASS} ${popupWrapperClassExternal}` : POPUP_WRAPPER_CLASS;
    super._init();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass(POPUP_CLASS);
    this.$wrapper().addClass(popupWrapperClasses);
    this._$popupContent = this._$content.wrapInner($('<div>').addClass(POPUP_CONTENT_CLASS)).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr('role', 'dialog');
  }
  _render() {
    const isFullscreen = this.option('fullScreen');
    this._toggleFullScreenClass(isFullscreen);
    super._render();
  }
  _createBodyOverflowManager() {
    this._bodyOverflowManager = createBodyOverflowManager();
  }
  _toggleFullScreenClass(value) {
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new EmptyTemplate(),
      bottom: new EmptyTemplate()
    });
  }
  _getActionsList() {
    return super._getActionsList().concat(['onResizeStart', 'onResize', 'onResizeEnd']);
  }
  _contentResizeHandler(entry) {
    if (!this._shouldSkipContentResize(entry)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  }
  _doesShowAnimationChangeDimensions() {
    const animation = this.option('animation');
    return ['to', 'from'].some(prop => {
      var _animation$show;
      // @ts-expect-error ts-error
      const config = animation === null || animation === void 0 || (_animation$show = animation.show) === null || _animation$show === void 0 ? void 0 : _animation$show[prop];
      return isObject(config) && ('width' in config || 'height' in config);
    });
  }
  _updateResizeCallbackSkipCondition() {
    const doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
    this._shouldSkipContentResize = entry => doesShowAnimationChangeDimensions
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    && this._showAnimationProcessing || this._areContentDimensionsRendered(entry);
  }
  _observeContentResize(shouldObserve) {
    if (!this.option('useResizeObserver')) {
      return;
    }
    const contentElement = this._$content.get(0);
    if (shouldObserve) {
      resizeObserverSingleton.observe(contentElement, entry => {
        this._contentResizeHandler(entry);
      });
    } else {
      resizeObserverSingleton.unobserve(contentElement);
    }
  }
  _areContentDimensionsRendered(entry) {
    var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
    const contentBox = (_entry$contentBoxSize = entry.contentBoxSize) === null || _entry$contentBoxSize === void 0 ? void 0 : _entry$contentBoxSize[0];
    if (contentBox) {
      var _this$_renderedDimens, _this$_renderedDimens2;
      // @ts-expect-error ts-error
      return parseInt(contentBox.inlineSize, 10) === ((_this$_renderedDimens = this._renderedDimensions) === null || _this$_renderedDimens === void 0 ? void 0 : _this$_renderedDimens.width)
      // @ts-expect-error ts-error
      && parseInt(contentBox.blockSize, 10) === ((_this$_renderedDimens2 = this._renderedDimensions) === null || _this$_renderedDimens2 === void 0 ? void 0 : _this$_renderedDimens2.height);
    }
    const {
      contentRect
    } = entry;
    // @ts-expect-error ts-error
    return parseInt(contentRect.width, 10) === ((_this$_renderedDimens3 = this._renderedDimensions) === null || _this$_renderedDimens3 === void 0 ? void 0 : _this$_renderedDimens3.width)
    // @ts-expect-error ts-error
    && parseInt(contentRect.height, 10) === ((_this$_renderedDimens4 = this._renderedDimensions) === null || _this$_renderedDimens4 === void 0 ? void 0 : _this$_renderedDimens4.height);
  }
  _renderContent() {
    super._renderContent();
    // NOTE: This observe should not be called before async showing is called. See T1130045.
    this._observeContentResize(true);
  }
  // @ts-expect-error ts-error
  _renderContentImpl() {
    this._renderTitle();
    super._renderContentImpl();
    this._renderResize();
    this._renderBottom();
  }
  _renderTitle() {
    const items = this._getToolbarItems('top');
    const {
      title,
      showTitle
    } = this.option();
    if (showTitle && !!title) {
      items.unshift({
        location: devices.current().ios ? 'center' : 'before',
        text: title
      });
    }
    if (showTitle || items.length > 0) {
      if (this._$title) {
        this._$title.remove();
      }
      const $title = $('<div>').addClass(POPUP_TITLE_CLASS).insertBefore(this.$content());
      this._$title = this._renderTemplateByType('titleTemplate', items, $title).addClass(POPUP_TITLE_CLASS);
      this._renderDrag();
      this._executeTitleRenderAction(this._$title);
      this._$title.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton());
    } else if (this._$title) {
      this._$title.detach();
    }
    this._toggleAriaLabel();
  }
  _toggleAriaLabel() {
    var _this$_$title;
    const {
      title,
      showTitle
    } = this.option();
    const shouldSetAriaLabel = showTitle && !!title;
    const titleId = shouldSetAriaLabel ? new Guid() : null;
    // @ts-expect-error ts-error
    (_this$_$title = this._$title) === null || _this$_$title === void 0 || _this$_$title.find(`.${TOOLBAR_LABEL_CLASS}`).eq(0).attr('id', titleId);
    // @ts-expect-error ts-error
    this.$overlayContent().attr('aria-labelledby', titleId);
  }
  _renderTemplateByType(optionName, data, $container, additionalToolbarOptions) {
    const {
      rtlEnabled,
      useDefaultToolbarButtons,
      useFlatToolbarButtons,
      disabled
    } = this.option();
    const template = this._getTemplateByOption(optionName);
    const toolbarTemplate = template instanceof EmptyTemplate;
    if (toolbarTemplate) {
      const integrationOptions = extend({}, this.option('integrationOptions'), {
        skipTemplates: ['content', 'title']
      });
      const toolbarOptions = extend(additionalToolbarOptions, {
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
      const $toolbar = $container.children('div');
      $container.replaceWith($toolbar);
      return $toolbar;
    }
    const $result = $(template.render({
      container: getPublicElement($container)
    }));
    if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
      $container.replaceWith($result);
      $container = $result;
    }
    return $container;
  }
  // eslint-disable-next-line class-methods-use-this
  _getToolbarName() {
    return 'dxToolbarBase';
  }
  _renderVisibilityAnimate(visible) {
    return super._renderVisibilityAnimate(visible);
  }
  _hide() {
    this._observeContentResize(false);
    return super._hide();
  }
  _executeTitleRenderAction($titleElement) {
    this._getTitleRenderAction()({
      titleElement: getPublicElement($titleElement)
    });
  }
  _getTitleRenderAction() {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return this._titleRenderAction || this._createTitleRenderAction();
  }
  _createTitleRenderAction() {
    // eslint-disable-next-line no-return-assign
    return this._titleRenderAction = this._createActionByOption('onTitleRendered', {
      element: this.element(),
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _getCloseButton() {
    return {
      toolbar: 'top',
      location: 'after',
      template: this._getCloseButtonRenderer()
    };
  }
  _getCloseButtonRenderer() {
    return (_, __, container) => {
      const $button = $('<div>').addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
      this._createComponent($button, Button, {
        icon: 'close',
        onClick: this._createToolbarItemAction(undefined),
        stylingMode: 'text',
        integrationOptions: {}
      });
      $(container).append($button);
    };
  }
  _getToolbarItems(toolbar) {
    const toolbarItems = this.option('toolbarItems');
    const toolbarsItems = [];
    this._toolbarItemClasses = [];
    const currentPlatform = devices.current().platform;
    let index = 0;
    each(toolbarItems, (_, data) => {
      const isShortcut = isDefined(data.shortcut);
      const item = isShortcut ? getButtonPlace(data.shortcut) : data;
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
        const isLTROrder = currentPlatform === 'generic';
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
  }
  _hasCloseButton() {
    const {
      showCloseButton,
      showTitle
    } = this.option();
    return showCloseButton && showTitle;
  }
  _getLocalizationKey(itemType) {
    return itemType.toLowerCase() === 'done' ? 'OK' : camelize(itemType, true);
  }
  _getToolbarButtonStylingMode(shortcut) {
    // @ts-expect-error
    if (isFluent()) {
      return shortcut === 'done' ? BUTTON_CONTAINED_MODE : BUTTON_OUTLINED_MODE;
    }
    return this.option('useFlatToolbarButtons') ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE;
  }
  _getToolbarButtonType(shortcut) {
    // @ts-expect-error
    if (isFluent() && shortcut === 'done' || this.option('useDefaultToolbarButtons')) {
      return BUTTON_DEFAULT_TYPE;
    }
    return BUTTON_NORMAL_TYPE;
  }
  _getToolbarItemByAlias(data) {
    const that = this;
    const itemType = data.shortcut;
    if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
      return false;
    }
    const itemConfig = extend({
      text: messageLocalization.format(this._getLocalizationKey(itemType)),
      onClick: this._createToolbarItemAction(data.onClick),
      integrationOptions: {},
      type: this._getToolbarButtonType(itemType),
      stylingMode: this._getToolbarButtonStylingMode(itemType)
    }, data.options || {});
    const itemClass = `${POPUP_CLASS}-${itemType}`;
    this._toolbarItemClasses.push(itemClass);
    return {
      template(_, __, container) {
        const $toolbarItem = $('<div>').addClass(itemClass).appendTo(container);
        that._createComponent($toolbarItem, Button, itemConfig);
      }
    };
  }
  _createToolbarItemAction(clickAction) {
    return this._createAction(clickAction, {
      afterExecute(e) {
        // @ts-expect-error ts-error
        e.component.hide();
      }
    });
  }
  _renderBottom() {
    const items = this._getToolbarItems('bottom');
    if (items.length) {
      var _this$_$bottom;
      (_this$_$bottom = this._$bottom) === null || _this$_$bottom === void 0 || _this$_$bottom.remove();
      const $bottom = $('<div>').addClass(POPUP_BOTTOM_CLASS).insertAfter(this.$content());
      this._$bottom = this._renderTemplateByType('bottomTemplate', items, $bottom, {
        compactMode: true
      }).addClass(POPUP_BOTTOM_CLASS);
      this._toggleClasses();
    } else {
      var _this$_$bottom2;
      (_this$_$bottom2 = this._$bottom) === null || _this$_$bottom2 === void 0 || _this$_$bottom2.detach();
    }
  }
  _toggleDisabledState(value) {
    // @ts-expect-error ts-error
    super._toggleDisabledState(...arguments);
    this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value));
  }
  _toggleClasses() {
    const aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
    each(aliases, (_, alias) => {
      const className = `${POPUP_CLASS}-${alias}`;
      if (this._toolbarItemClasses.includes(className)) {
        var _this$_$bottom3;
        this.$wrapper().addClass(`${className}-visible`);
        (_this$_$bottom3 = this._$bottom) === null || _this$_$bottom3 === void 0 || _this$_$bottom3.addClass(className);
      } else {
        var _this$_$bottom4;
        this.$wrapper().removeClass(`${className}-visible`);
        (_this$_$bottom4 = this._$bottom) === null || _this$_$bottom4 === void 0 || _this$_$bottom4.removeClass(className);
      }
    });
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, $element);
    if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
      const zIndex = zIndexPool.create(this._zIndexInitValue());
      zIndexPool.remove(this._zIndex);
      this._zIndex = zIndex;
      this._$wrapper.css('zIndex', zIndex);
      this._$content.css('zIndex', zIndex);
    }
  }
  _toggleContentScrollClass() {
    const isNativeScrollingEnabled = !this.option('preventScrollEvents');
    this.$content().toggleClass(POPUP_CONTENT_SCROLLABLE_CLASS, isNativeScrollingEnabled);
  }
  _getPositionControllerConfig() {
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = this.option();
    return _extends({}, super._getPositionControllerConfig(), {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
  }
  _initPositionController() {
    this._positionController = new PopupPositionController(this._getPositionControllerConfig());
  }
  _getDragTarget() {
    return this.topToolbar();
  }
  _renderGeometry(options) {
    const {
      visible,
      useResizeObserver
    } = this.option();
    if (visible && windowUtils.hasWindow()) {
      const isAnimated = this._showAnimationProcessing;
      const shouldRepeatAnimation = isAnimated && !(options !== null && options !== void 0 && options.forceStopAnimation) && useResizeObserver;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
  }
  _cacheDimensions() {
    if (!this.option('useResizeObserver')) {
      return;
    }
    this._renderedDimensions = {
      width: parseInt(getWidth(this._$content), 10),
      height: parseInt(getHeight(this._$content), 10)
    };
  }
  _renderGeometryImpl() {
    let isDimensionChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!isDimensionChange) {
      // NOTE: to save content scroll position T1113123
      // NOTE: for correct new position calculation
      this._resetContentHeight();
    }
    super._renderGeometryImpl();
    this._cacheDimensions();
    this._setContentHeight();
  }
  _resetContentHeight() {
    const height = this._getOptionValue('height');
    if (height === 'auto') {
      this.$content().css({
        height: 'auto',
        maxHeight: 'none'
      });
    }
  }
  _renderDrag() {
    const $dragTarget = this._getDragTarget();
    const {
      dragEnabled
    } = this.option();
    if (!$dragTarget) {
      return;
    }
    const config = {
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
  }
  _renderResize() {
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
  }
  _resizeEndHandler(e) {
    const width = this._resizable.option('width');
    const height = this._resizable.option('height');
    width && this._setOptionWithoutOptionChange('width', width);
    height && this._setOptionWithoutOptionChange('height', height);
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    this._actions.onResizeEnd(e);
  }
  _setContentHeight() {
    const {
      forceApplyBindings
    } = this.option();
    (forceApplyBindings || noop)();
    const overlayContent = this.$overlayContent().get(0);
    const currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
    this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
    this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
  }
  _heightStrategyChangeOffset(currentHeightStrategyClass, popupVerticalPaddings) {
    return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
  }
  _chooseHeightStrategy(overlayContent) {
    const isAutoWidth = overlayContent.style.width === 'auto' || overlayContent.style.width === '';
    let currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
    if (this._isAutoHeight() && this.option('autoResizeEnabled')) {
      if (isAutoWidth || IS_OLD_SAFARI) {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
      } else {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
      }
    }
    return currentHeightStrategyClass;
  }
  _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
    let cssStyles = {};
    const contentMaxHeight = this._getOptionValue('maxHeight', overlayContent);
    const contentMinHeight = this._getOptionValue('minHeight', overlayContent);
    const popupHeightParts = this._splitPopupHeight();
    const toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
    if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
      if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
        const overlayHeight = this.option('fullScreen') ? Math.min(getBoundingRect(overlayContent).height, windowUtils.getWindow().innerHeight) : getBoundingRect(overlayContent).height;
        const contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
        cssStyles = {
          height: Math.max(0, contentHeight),
          minHeight: 'auto',
          maxHeight: 'auto'
        };
      }
    } else {
      const container = $(this._positionController.$visualContainer).get(0);
      const maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
      const minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
      cssStyles = {
        height: 'auto',
        minHeight: minHeightValue,
        maxHeight: maxHeightValue
      };
    }
    return cssStyles;
  }
  _setHeightClasses($container, currentClass) {
    let excessClasses = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const name in HEIGHT_STRATEGIES) {
      if (HEIGHT_STRATEGIES[name] !== currentClass) {
        excessClasses += ` ${HEIGHT_STRATEGIES[name]}`;
      }
    }
    $container.removeClass(excessClasses).addClass(currentClass);
  }
  _isAutoHeight() {
    // @ts-expect-error ts-error
    return this.$overlayContent().get(0).style.height === 'auto';
  }
  _splitPopupHeight() {
    const topToolbar = this.topToolbar();
    const bottomToolbar = this.bottomToolbar();
    return {
      header: getVisibleHeight(topToolbar === null || topToolbar === void 0 ? void 0 : topToolbar.get(0)),
      footer: getVisibleHeight(bottomToolbar === null || bottomToolbar === void 0 ? void 0 : bottomToolbar.get(0)),
      contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
      popupVerticalOffsets: getVerticalOffsets(this.$content().get(0), true),
      popupVerticalPaddings: getVerticalOffsets(this.$content().get(0), false)
    };
  }
  _isAllWindowCovered() {
    const {
      fullScreen
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return super._isAllWindowCovered() || fullScreen;
  }
  _renderDimensions() {
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
      super._renderDimensions();
    }
    if (windowUtils.hasWindow()) {
      this._renderFullscreenWidthClass();
    }
  }
  _dimensionChanged() {
    this._renderGeometry({
      isDimensionChange: true
    });
  }
  _clean() {
    super._clean();
    this._observeContentResize(false);
  }
  _dispose() {
    super._dispose();
    this._toggleBodyScroll(true);
  }
  _renderFullscreenWidthClass() {
    const isFullScreen = getOuterWidth(this.$overlayContent()) === getWidth(window);
    this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, isFullScreen);
  }
  _toggleSafariScrolling() {
    if (!this.option('enableBodyScroll')) {
      return;
    }
    super._toggleSafariScrolling();
  }
  _toggleBodyScroll(enabled) {
    if (!this._bodyOverflowManager) {
      return;
    }
    const {
      setOverflow,
      restoreOverflow
    } = this._bodyOverflowManager;
    if (enabled) {
      restoreOverflow();
    } else {
      setOverflow();
    }
  }
  refreshPosition() {
    this._renderPosition();
  }
  _optionChanged(args) {
    var _this$_resizable2;
    const {
      value,
      name
    } = args;
    switch (name) {
      case 'disabled':
        super._optionChanged(args);
        this._renderTitle();
        this._renderBottom();
        break;
      case 'animation':
        this._updateResizeCallbackSkipCondition();
        break;
      case 'enableBodyScroll':
        if (this.option('visible')) {
          // @ts-expect-error ts-error
          this._toggleBodyScroll(value);
        }
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
        super._optionChanged(args);
        if (this.option('resizeEnabled')) {
          var _this$_resizable;
          // @ts-expect-error ts-error
          (_this$_resizable = this._resizable) === null || _this$_resizable === void 0 || _this$_resizable.option('area', this._positionController.$dragResizeContainer);
        }
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        // @ts-expect-error ts-error
        (_this$_resizable2 = this._resizable) === null || _this$_resizable2 === void 0 || _this$_resizable2.option(name, value);
        break;
      case 'onTitleRendered':
        this._createTitleRenderAction();
        break;
      case 'toolbarItems':
      case 'useDefaultToolbarButtons':
      case 'useFlatToolbarButtons':
        {
          // @ts-expect-error ts-error
          // NOTE: Geometry rendering after "toolbarItems" runtime change breaks the popup animation first appereance.
          // But geometry rendering for options connected to the popup position still should be called.
          const shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
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
          // @ts-expect-error ts-error
          this._resizable.option('area', this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case 'dragOutsideBoundary':
        this._positionController.dragOutsideBoundary = value;
        if (this.option('resizeEnabled')) {
          // @ts-expect-error ts-error
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
        super._optionChanged(args);
        this._toggleContentScrollClass();
        break;
      default:
        super._optionChanged(args);
    }
  }
  bottomToolbar() {
    return this._$bottom;
  }
  topToolbar() {
    return this._$title;
  }
  $content() {
    return this._$popupContent;
  }
  content() {
    return getPublicElement(this.$content());
  }
  $overlayContent() {
    return this._$content;
  }
  getFocusableElements() {
    // @ts-expect-error ts-error
    return this.$wrapper().find('[tabindex]').filter((index, item) => item.getAttribute('tabindex') >= 0);
  }
}
registerComponent('dxPopup', Popup);
export default Popup;