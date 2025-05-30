/**
* DevExtreme (esm/renovation/ui/scroll_view/strategy/simulated.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addWidgetClass", "aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "loadPanelTemplate", "needRenderScrollbars", "needScrollViewContentWrapper", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshStrategy", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import '../../../../events/gesture/emitter.gesture.scroll';
import { subscribeToScrollEvent, subscribeToScrollInitEvent, subscribeToDXScrollStartEvent, subscribeToDXScrollMoveEvent, subscribeToDXScrollEndEvent, subscribeToDXScrollStopEvent, subscribeToDXScrollCancelEvent, subscribeToMouseEnterEvent, subscribeToMouseLeaveEvent, subscribeToDXPointerDownEvent, subscribeToDXPointerUpEvent } from '../../../utils/subscribe_to_event';
import { AnimatedScrollbar } from '../scrollbar/animated_scrollbar';
import { Widget } from '../../common/widget';
import { combineClasses } from '../../../utils/combine_classes';
import { getOffsetDistance } from '../utils/get_offset_distance';
import { getBoundaryProps } from '../utils/get_boundary_props';
import { permissibleWheelDirection } from '../utils/get_permissible_wheel_direction';
import { isDxMouseWheelEvent, normalizeKeyName, isCommandKeyPressed } from '../../../../events/utils/index';
import { isDefined } from '../../../../core/utils/type';
import { ScrollableSimulatedProps } from '../common/simulated_strategy_props';
import eventsEngine from '../../../../events/core/events_engine';
import { inRange } from '../../../../core/utils/math';
import { ScrollDirection } from '../utils/scroll_direction';
import { DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, SCROLLABLE_SIMULATED_CLASS, SCROLLABLE_CONTAINER_CLASS, SCROLLABLE_CONTENT_CLASS, SCROLLABLE_WRAPPER_CLASS, SCROLLVIEW_CONTENT_CLASS, SCROLLABLE_DISABLED_CLASS, SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, SCROLL_LINE_HEIGHT, SCROLLABLE_SCROLLBAR_CLASS, KEY_CODES, VALIDATE_WHEEL_TIMEOUT, TopPocketState, DIRECTION_BOTH } from '../common/consts';
import { getElementOffset } from '../../../utils/get_element_offset';
import { getElementPadding, getElementOverflowX, getElementOverflowY } from '../utils/get_element_style';
import { TopPocket } from '../internal/pocket/top';
import { BottomPocket } from '../internal/pocket/bottom';
import { getDevicePixelRatio } from '../utils/get_device_pixel_ratio';
import { isElementVisible } from '../utils/is_element_visible';
import { allowedDirection } from '../utils/get_allowed_direction';
import { subscribeToResize } from '../utils/subscribe_to_resize';
import domAdapter from '../../../../core/dom_adapter';
import { getScrollLeftMax } from '../utils/get_scroll_left_max';
export var viewFunction = viewModel => {
  var {
    active,
    bottomPocketHeight,
    bottomPocketRef,
    containerClientHeight,
    containerClientWidth,
    containerHasSizes,
    containerRef,
    containerStyles,
    contentHeight,
    contentPaddingBottom,
    contentRef,
    contentStyles,
    contentWidth,
    cssClasses,
    direction,
    hScrollLocation,
    hScrollOffsetMax,
    hScrollbarRef,
    handleKeyDown,
    hovered,
    isLoadPanelVisible,
    lock,
    onBounce,
    onEnd,
    onPullDown,
    onReachBottom,
    onScroll,
    onVisibilityChangeHandler,
    props: {
      aria,
      bounceEnabled,
      children,
      forceGeneratePockets,
      height,
      inertiaEnabled,
      loadPanelTemplate: LoadPanelTemplate,
      needRenderScrollbars,
      needScrollViewContentWrapper,
      pullDownEnabled,
      pulledDownText,
      pullingDownText,
      reachBottomEnabled,
      reachBottomText,
      refreshStrategy,
      refreshingText,
      rtlEnabled,
      scrollByThumb,
      showScrollbar,
      useKeyboard,
      visible,
      width
    },
    pulledDown,
    restAttributes,
    scrollLocationChange,
    scrollViewContentRef,
    scrollableRef,
    scrolling,
    topPocketRef,
    topPocketState,
    unlock,
    vScrollLocation,
    vScrollOffsetMax,
    vScrollOffsetMin,
    vScrollbarRef,
    wrapperRef
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": scrollableRef,
    "focusStateEnabled": useKeyboard,
    "aria": aria,
    "addWidgetClass": false,
    "classes": cssClasses,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onVisibilityChange": onVisibilityChangeHandler
  }, restAttributes, {
    "onKeyDown": handleKeyDown,
    children: [createVNode(1, "div", SCROLLABLE_WRAPPER_CLASS, createVNode(1, "div", SCROLLABLE_CONTAINER_CLASS, [createVNode(1, "div", SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && createComponentVNode(2, TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": refreshStrategy,
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? createVNode(1, "div", SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : children, forceGeneratePockets && createComponentVNode(2, BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": normalizeStyles(contentStyles)
    }, null, contentRef), needRenderScrollbars && direction.isHorizontal && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "horizontal",
      "contentSize": contentWidth,
      "containerSize": containerClientWidth,
      "visible": hovered || scrolling || active,
      "minOffset": 0,
      "maxOffset": hScrollOffsetMax,
      "scrollLocation": hScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onScroll": onScroll,
      "onEnd": onEnd,
      "containerHasSizes": containerHasSizes,
      "rtlEnabled": rtlEnabled,
      "onLock": lock,
      "onUnlock": unlock
    }, null, hScrollbarRef), needRenderScrollbars && direction.isVertical && createComponentVNode(2, AnimatedScrollbar, {
      "direction": "vertical",
      "contentSize": contentHeight,
      "containerSize": containerClientHeight,
      "visible": hovered || scrolling || active,
      "minOffset": vScrollOffsetMin,
      "maxOffset": vScrollOffsetMax,
      "scrollLocation": vScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onScroll": onScroll,
      "onEnd": onEnd,
      "containerHasSizes": containerHasSizes,
      "forceGeneratePockets": forceGeneratePockets,
      "bottomPocketSize": bottomPocketHeight,
      "contentPaddingBottom": contentPaddingBottom,
      "pulledDown": pulledDown,
      "onPullDown": onPullDown,
      "onReachBottom": onReachBottom,
      "reachBottomEnabled": reachBottomEnabled,
      "onLock": lock,
      "onUnlock": unlock
    }, null, vScrollbarRef)], 0, {
      "style": normalizeStyles(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), viewModel.props.loadPanelTemplate && LoadPanelTemplate({
      targetElement: scrollableRef,
      refreshingText: refreshingText,
      visible: isLoadPanelVisible
    })]
  })));
};
import { createRef as infernoCreateRef } from 'inferno';
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class ScrollableSimulated extends InfernoComponent {
  constructor(props) {
    super(props);
    this.scrollableRef = infernoCreateRef();
    this.topPocketRef = infernoCreateRef();
    this.bottomPocketRef = infernoCreateRef();
    this.wrapperRef = infernoCreateRef();
    this.contentRef = infernoCreateRef();
    this.scrollViewContentRef = infernoCreateRef();
    this.containerRef = infernoCreateRef();
    this.vScrollbarRef = infernoCreateRef();
    this.hScrollbarRef = infernoCreateRef();
    this.prevDirection = 'initial';
    this.locked = false;
    this.loadingIndicatorEnabled = true;
    this.validDirections = {};
    this.endActionDirections = {
      horizontal: false,
      vertical: false
    };
    this.savedScrollOffset = {
      scrollTop: 0,
      scrollLeft: 0
    };
    this.__getterCache = {};
    this.state = {
      active: false,
      hovered: false,
      scrolling: false,
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentScrollWidth: 0,
      contentScrollHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      contentPaddingBottom: 0,
      topPocketHeight: 0,
      bottomPocketHeight: 0,
      topPocketState: TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      vScrollLocation: 0,
      hScrollLocation: 0,
      pendingScrollEvent: false
    };
    this.content = this.content.bind(this);
    this.container = this.container.bind(this);
    this.refresh = this.refresh.bind(this);
    this.release = this.release.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
    this.disposeWheelTimer = this.disposeWheelTimer.bind(this);
    this.scrollEffect = this.scrollEffect.bind(this);
    this.startEffect = this.startEffect.bind(this);
    this.initEffect = this.initEffect.bind(this);
    this.moveEffect = this.moveEffect.bind(this);
    this.endEffect = this.endEffect.bind(this);
    this.stopEffect = this.stopEffect.bind(this);
    this.cancelEffect = this.cancelEffect.bind(this);
    this.pointerDownEffect = this.pointerDownEffect.bind(this);
    this.pointerUpEffect = this.pointerUpEffect.bind(this);
    this.mouseEnterEffect = this.mouseEnterEffect.bind(this);
    this.mouseLeaveEffect = this.mouseLeaveEffect.bind(this);
    this.validate = this.validate.bind(this);
    this.moveIsAllowed = this.moveIsAllowed.bind(this);
    this.effectDisabledState = this.effectDisabledState.bind(this);
    this.updatePocketState = this.updatePocketState.bind(this);
    this.subscribeTopPocketToResize = this.subscribeTopPocketToResize.bind(this);
    this.subscribeBottomPocketToResize = this.subscribeBottomPocketToResize.bind(this);
    this.subscribeContainerToResize = this.subscribeContainerToResize.bind(this);
    this.subscribeToResizeContent = this.subscribeToResizeContent.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.triggerScrollEvent = this.triggerScrollEvent.bind(this);
    this.resetInactiveOffsetToInitial = this.resetInactiveOffsetToInitial.bind(this);
    this.scrollByLocation = this.scrollByLocation.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.syncScrollbarsWithContent = this.syncScrollbarsWithContent.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
    this.getEventArgs = this.getEventArgs.bind(this);
    this.getInitEventData = this.getInitEventData.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.restoreEndActionDirections = this.restoreEndActionDirections.bind(this);
    this.onUpdated = this.onUpdated.bind(this);
    this.onBounce = this.onBounce.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.scrollLocationChange = this.scrollLocationChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isCrossThumbScrolling = this.isCrossThumbScrolling.bind(this);
    this.adjustDistance = this.adjustDistance.bind(this);
    this.suppressDirections = this.suppressDirections.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.prepareDirections = this.prepareDirections.bind(this);
    this.isContent = this.isContent.bind(this);
    this.tryGetAllowedDirection = this.tryGetAllowedDirection.bind(this);
    this.isLocked = this.isLocked.bind(this);
    this.validateWheel = this.validateWheel.bind(this);
    this.clearWheelValidationTimer = this.clearWheelValidationTimer.bind(this);
    this.validateMove = this.validateMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.scrollByLine = this.scrollByLine.bind(this);
    this.scrollByPage = this.scrollByPage.bind(this);
    this.scrollByKey = this.scrollByKey.bind(this);
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
    this.onVisibilityChangeHandler = this.onVisibilityChangeHandler.bind(this);
    this.updateElementDimensions = this.updateElementDimensions.bind(this);
    this.setTopPocketDimensions = this.setTopPocketDimensions.bind(this);
    this.setBottomPocketDimensions = this.setBottomPocketDimensions.bind(this);
    this.setContentHeight = this.setContentHeight.bind(this);
    this.setContentWidth = this.setContentWidth.bind(this);
    this.setContainerDimensions = this.setContainerDimensions.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.disposeWheelTimer, []), new InfernoEffect(this.scrollEffect, [this.state.scrolling, this.props.rtlEnabled, this.props.onScroll, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.direction, this.state.topPocketHeight]), new InfernoEffect(this.startEffect, [this.props.onStart, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.direction, this.state.topPocketHeight]), new InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.disabled]), new InfernoEffect(this.moveEffect, []), new InfernoEffect(this.endEffect, []), new InfernoEffect(this.stopEffect, []), new InfernoEffect(this.cancelEffect, []), new InfernoEffect(this.pointerDownEffect, []), new InfernoEffect(this.pointerUpEffect, []), new InfernoEffect(this.mouseEnterEffect, [this.props.disabled, this.props.showScrollbar]), new InfernoEffect(this.mouseLeaveEffect, [this.props.disabled, this.props.showScrollbar]), new InfernoEffect(this.effectDisabledState, [this.props.disabled]), new InfernoEffect(this.updatePocketState, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]), new InfernoEffect(this.subscribeTopPocketToResize, []), new InfernoEffect(this.subscribeBottomPocketToResize, []), new InfernoEffect(this.subscribeContainerToResize, []), new InfernoEffect(this.subscribeToResizeContent, []), new InfernoEffect(this.updateDimensions, []), new InfernoEffect(this.triggerScrollEvent, [this.state.pendingScrollEvent]), new InfernoEffect(this.resetInactiveOffsetToInitial, [this.props.direction, this.props.rtlEnabled])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11, _this$_effects$12, _this$_effects$13;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.scrolling, this.props.rtlEnabled, this.props.onScroll, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.direction, this.state.topPocketHeight]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.onStart, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.direction, this.state.topPocketHeight]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.direction, this.props.scrollByThumb, this.props.scrollByContent, this.props.bounceEnabled, this.state.contentClientHeight, this.state.contentScrollHeight, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentScrollWidth, this.state.containerClientWidth, this.props.disabled]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([]);
    (_this$_effects$8 = this._effects[10]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$9 = this._effects[11]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.disabled, this.props.showScrollbar]);
    (_this$_effects$10 = this._effects[12]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.disabled]);
    (_this$_effects$11 = this._effects[13]) === null || _this$_effects$11 === void 0 ? void 0 : _this$_effects$11.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.state.topPocketHeight, this.state.vScrollLocation]);
    (_this$_effects$12 = this._effects[19]) === null || _this$_effects$12 === void 0 ? void 0 : _this$_effects$12.update([this.state.pendingScrollEvent]);
    (_this$_effects$13 = this._effects[20]) === null || _this$_effects$13 === void 0 ? void 0 : _this$_effects$13.update([this.props.direction, this.props.rtlEnabled]);
  }
  disposeWheelTimer() {
    return () => this.clearWheelValidationTimer();
  }
  scrollEffect() {
    return subscribeToScrollEvent(this.containerRef.current, () => {
      this.handleScroll();
    });
  }
  startEffect() {
    return subscribeToDXScrollStartEvent(this.wrapperRef.current, event => {
      this.handleStart(event);
    });
  }
  initEffect() {
    return subscribeToScrollInitEvent(this.wrapperRef.current, event => {
      this.handleInit(event);
    }, this.getInitEventData());
  }
  moveEffect() {
    return subscribeToDXScrollMoveEvent(this.wrapperRef.current, event => {
      this.handleMove(event);
    });
  }
  endEffect() {
    return subscribeToDXScrollEndEvent(this.wrapperRef.current, event => {
      this.handleEnd(event);
    });
  }
  stopEffect() {
    return subscribeToDXScrollStopEvent(this.wrapperRef.current, () => {
      this.handleStop();
    });
  }
  cancelEffect() {
    return subscribeToDXScrollCancelEvent(this.wrapperRef.current, event => {
      this.handleCancel(event);
    });
  }
  pointerDownEffect() {
    return subscribeToDXPointerDownEvent(this.wrapperRef.current, () => {
      this.setState(__state_argument => ({
        active: true
      }));
    });
  }
  pointerUpEffect() {
    return subscribeToDXPointerUpEvent(domAdapter.getDocument(), () => {
      this.setState(__state_argument => ({
        active: false
      }));
    });
  }
  mouseEnterEffect() {
    if (this.isHoverable) {
      return subscribeToMouseEnterEvent(this.scrollableRef.current, () => {
        this.setState(__state_argument => ({
          hovered: true
        }));
      });
    }
    return undefined;
  }
  mouseLeaveEffect() {
    if (this.isHoverable) {
      return subscribeToMouseLeaveEvent(this.scrollableRef.current, () => {
        this.setState(__state_argument => ({
          hovered: false
        }));
      });
    }
    return undefined;
  }
  effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  }
  updatePocketState() {
    if (this.props.forceGeneratePockets) {
      this.setState(__state_argument => ({
        topPocketState: this.pulledDown ? TopPocketState.STATE_READY : TopPocketState.STATE_RELEASED
      }));
    }
  }
  subscribeTopPocketToResize() {
    var _this$topPocketRef;
    return subscribeToResize((_this$topPocketRef = this.topPocketRef) === null || _this$topPocketRef === void 0 ? void 0 : _this$topPocketRef.current, element => {
      this.setTopPocketDimensions(element);
    });
  }
  subscribeBottomPocketToResize() {
    var _this$bottomPocketRef;
    return subscribeToResize((_this$bottomPocketRef = this.bottomPocketRef) === null || _this$bottomPocketRef === void 0 ? void 0 : _this$bottomPocketRef.current, element => {
      this.setBottomPocketDimensions(element);
    });
  }
  subscribeContainerToResize() {
    return subscribeToResize(this.containerRef.current, element => {
      this.setContainerDimensions(element);
    });
  }
  subscribeToResizeContent() {
    if (this.props.needScrollViewContentWrapper) {
      var unsubscribeHeightResize = subscribeToResize(this.content(), element => {
        this.setContentHeight(element);
      });
      var unsubscribeWidthResize = subscribeToResize(this.contentRef.current, element => {
        this.setContentWidth(element);
      });
      return () => {
        unsubscribeHeightResize === null || unsubscribeHeightResize === void 0 ? void 0 : unsubscribeHeightResize();
        unsubscribeWidthResize === null || unsubscribeWidthResize === void 0 ? void 0 : unsubscribeWidthResize();
      };
    }
    return subscribeToResize(this.contentRef.current, element => {
      this.setContentHeight(element);
      this.setContentWidth(element);
    });
  }
  updateDimensions() {
    this.updateElementDimensions();
  }
  triggerScrollEvent() {
    if (this.state.pendingScrollEvent) {
      this.setState(__state_argument => ({
        pendingScrollEvent: false
      }));
      eventsEngine.triggerHandler(this.containerRef.current, {
        type: 'scroll'
      });
    }
  }
  resetInactiveOffsetToInitial() {
    if (this.direction.isBoth) {
      this.prevDirection = this.props.direction;
      return;
    }
    var maxScrollOffset = getScrollLeftMax(this.containerRef.current);
    var needResetInactiveOffset = this.prevDirection !== this.props.direction && maxScrollOffset;
    if (!needResetInactiveOffset) {
      return;
    }
    this.prevDirection = this.props.direction;
    var inactiveScrollProp = !this.direction.isVertical ? 'scrollTop' : 'scrollLeft';
    var location = this.props.rtlEnabled && inactiveScrollProp === 'scrollLeft' ? maxScrollOffset : 0;
    this.scrollLocationChange({
      fullScrollProp: inactiveScrollProp,
      location
    });
  }
  get pulledDown() {
    return this.props.pullDownEnabled && this.props.bounceEnabled && this.state.topPocketHeight > 0 && this.state.vScrollLocation - this.state.topPocketHeight >= 0;
  }
  handleScroll() {
    var _this$props$onScroll, _this$props;
    if (!this.state.scrolling) {
      this.syncScrollbarsWithContent();
    }
    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  }
  syncScrollbarsWithContent() {
    var _this$vScrollbarRef$c;
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    (_this$vScrollbarRef$c = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c === void 0 ? void 0 : _this$vScrollbarRef$c.scrollTo(scrollTop, false);
    if (!this.props.rtlEnabled) {
      var _this$hScrollbarRef$c;
      (_this$hScrollbarRef$c = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c === void 0 ? void 0 : _this$hScrollbarRef$c.scrollTo(scrollLeft, false);
    }
  }
  startLoading() {
    if (this.loadingIndicatorEnabled && isElementVisible(this.containerRef.current)) {
      this.setState(__state_argument => ({
        isLoadPanelVisible: true
      }));
    }
    this.lock();
  }
  finishLoading() {
    this.setState(__state_argument => ({
      isLoadPanelVisible: false
    }));
    this.unlock();
  }
  getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset
    }, getBoundaryProps(this.props.direction, scrollOffset, this.containerRef.current, this.state.topPocketHeight));
  }
  getInitEventData() {
    return {
      getDirection: event => this.tryGetAllowedDirection(event),
      validate: event => this.validate(event),
      isNative: false,
      scrollTarget: this.containerRef.current
    };
  }
  onStart() {
    var _this$props$onStart, _this$props2;
    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  }
  onEnd(direction) {
    if (this.direction.isBoth) {
      this.endActionDirections[direction] = true;
      var {
        horizontal,
        vertical
      } = this.endActionDirections;
      if (horizontal && vertical) {
        var _this$props$onEnd, _this$props3;
        this.restoreEndActionDirections();
        this.setState(__state_argument => ({
          scrolling: false
        }));
        (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.getEventArgs());
      }
    } else {
      var _this$props$onEnd2, _this$props4;
      this.setState(__state_argument => ({
        scrolling: false
      }));
      (_this$props$onEnd2 = (_this$props4 = this.props).onEnd) === null || _this$props$onEnd2 === void 0 ? void 0 : _this$props$onEnd2.call(_this$props4, this.getEventArgs());
    }
  }
  restoreEndActionDirections() {
    this.endActionDirections[DIRECTION_HORIZONTAL] = false;
    this.endActionDirections[DIRECTION_VERTICAL] = false;
  }
  onUpdated() {
    var _this$props$onUpdated, _this$props5;
    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  }
  onBounce() {
    var _this$props$onBounce, _this$props6;
    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  }
  onPullDown() {
    var _this$props$onPullDow, _this$props7;
    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_REFRESHING
    }));
    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  }
  onRelease() {
    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_RELEASED
    }));
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.updateElementDimensions();
  }
  onReachBottom() {
    var _this$props$onReachBo, _this$props8;
    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  }
  scrollLocationChange(eventData) {
    if (!isElementVisible(this.containerRef.current)) {
      return;
    }
    var {
      fullScrollProp,
      location
    } = eventData;
    this.containerRef.current[fullScrollProp] = location;
    if (fullScrollProp === 'scrollLeft') {
      this.setState(__state_argument => ({
        hScrollLocation: -location
      }));
    } else {
      this.setState(__state_argument => ({
        vScrollLocation: -location
      }));
    }
    this.savedScrollOffset[fullScrollProp] = location;
  }
  get hScrollOffsetMax() {
    return -Math.max(this.contentWidth - this.state.containerClientWidth, 0);
  }
  get vScrollOffsetMax() {
    return -Math.max(this.contentHeight - this.state.containerClientHeight, 0);
  }
  get vScrollOffsetMin() {
    return this.pulledDown && this.state.topPocketState !== TopPocketState.STATE_RELEASED ? this.state.topPocketHeight : 0;
  }
  onScroll() {
    this.setState(__state_argument => ({
      pendingScrollEvent: true
    }));
  }
  handleInit(event) {
    var _this$hScrollbarRef$c2, _this$vScrollbarRef$c2;
    this.suppressDirections(event);
    this.restoreEndActionDirections();
    this.eventForUserAction = event;
    var crossThumbScrolling = this.isCrossThumbScrolling(event);
    var {
      left,
      top
    } = getElementOffset(this.scrollableRef.current);
    (_this$hScrollbarRef$c2 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c2 === void 0 ? void 0 : _this$hScrollbarRef$c2.initHandler(event, crossThumbScrolling, left);
    (_this$vScrollbarRef$c2 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c2 === void 0 ? void 0 : _this$vScrollbarRef$c2.initHandler(event, crossThumbScrolling, top);
  }
  handleStart(event) {
    this.setState(__state_argument => ({
      scrolling: true
    }));
    this.eventForUserAction = event;
    this.onStart();
  }
  handleMove(e) {
    var _e$preventDefault, _this$hScrollbarRef$c3, _this$vScrollbarRef$c3;
    if (this.isLocked()) {
      e.cancel = true;
      return;
    }
    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    this.adjustDistance(e, 'delta');
    this.eventForUserAction = e;
    var isDxMouseWheel = isDxMouseWheelEvent(e.originalEvent);
    (_this$hScrollbarRef$c3 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c3 === void 0 ? void 0 : _this$hScrollbarRef$c3.moveHandler(e.delta.x, isDxMouseWheel);
    (_this$vScrollbarRef$c3 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c3 === void 0 ? void 0 : _this$vScrollbarRef$c3.moveHandler(e.delta.y, isDxMouseWheel);
  }
  handleEnd(event) {
    var _this$hScrollbarRef$c4, _this$vScrollbarRef$c4;
    this.adjustDistance(event, 'velocity');
    this.eventForUserAction = event;
    (_this$hScrollbarRef$c4 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c4 === void 0 ? void 0 : _this$hScrollbarRef$c4.endHandler(event.velocity.x, true);
    (_this$vScrollbarRef$c4 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c4 === void 0 ? void 0 : _this$vScrollbarRef$c4.endHandler(event.velocity.y, true);
  }
  handleStop() {
    var _this$hScrollbarRef$c5, _this$vScrollbarRef$c5;
    (_this$hScrollbarRef$c5 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c5 === void 0 ? void 0 : _this$hScrollbarRef$c5.stopHandler();
    (_this$vScrollbarRef$c5 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c5 === void 0 ? void 0 : _this$vScrollbarRef$c5.stopHandler();
  }
  handleCancel(event) {
    var _this$hScrollbarRef$c6, _this$vScrollbarRef$c6;
    this.eventForUserAction = event;
    (_this$hScrollbarRef$c6 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c6 === void 0 ? void 0 : _this$hScrollbarRef$c6.endHandler(0, false);
    (_this$vScrollbarRef$c6 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c6 === void 0 ? void 0 : _this$vScrollbarRef$c6.endHandler(0, false);
  }
  isCrossThumbScrolling(event) {
    var {
      target
    } = event.originalEvent;
    var verticalScrolling = false;
    var horizontalScrolling = false;
    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }
    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }
    return verticalScrolling || horizontalScrolling;
  }
  adjustDistance(event, property) {
    var distance = event[property];
    distance.x *= this.validDirections[DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[DIRECTION_VERTICAL] ? 1 : 0;
    if (isDxMouseWheelEvent(event.originalEvent)) {
      var devicePixelRatio = getDevicePixelRatio();
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }
  suppressDirections(event) {
    if (isDxMouseWheelEvent(event.originalEvent)) {
      this.prepareDirections(true);
      return;
    }
    this.prepareDirections(false);
    var {
      target
    } = event.originalEvent;
    if (this.direction.isVertical) {
      var scrollbar = this.vScrollbarRef.current;
      this.validDirections[DIRECTION_VERTICAL] = this.validateEvent(this.isContent(target), scrollbar.isScrollbar(target), scrollbar.isThumb(target));
    }
    if (this.direction.isHorizontal) {
      var _scrollbar = this.hScrollbarRef.current;
      this.validDirections[DIRECTION_HORIZONTAL] = this.validateEvent(this.isContent(target), _scrollbar.isScrollbar(target), _scrollbar.isThumb(target));
    }
  }
  validateEvent(isContent, isScrollbar, isThumb) {
    return this.props.scrollByThumb && (isScrollbar || isThumb) || this.props.scrollByContent && isContent;
  }
  prepareDirections(value) {
    this.validDirections[DIRECTION_HORIZONTAL] = value;
    this.validDirections[DIRECTION_VERTICAL] = value;
  }
  isContent(element) {
    var closest = element.closest(".".concat(SCROLLABLE_SIMULATED_CLASS));
    if (isDefined(closest)) {
      return closest === this.scrollableRef.current;
    }
    return false;
  }
  tryGetAllowedDirection(event) {
    return isDxMouseWheelEvent(event) ? permissibleWheelDirection(this.props.direction, event.shiftKey) : this.permissibleDirection;
  }
  isLocked() {
    return this.locked;
  }
  validateWheel(event) {
    var scrollbar = permissibleWheelDirection(this.props.direction, event.shiftKey) === DIRECTION_HORIZONTAL ? this.hScrollbarRef.current : this.vScrollbarRef.current;
    var reachedMin = scrollbar.reachedMin();
    var reachedMax = scrollbar.reachedMax();
    var contentGreaterThanContainer = !reachedMin || !reachedMax;
    var locatedNotAtBound = !reachedMin && !reachedMax;
    var scrollFromMin = reachedMin && event.delta > 0;
    var scrollFromMax = reachedMax && event.delta < 0;
    var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this.validateWheelTimer !== undefined;
    if (validated) {
      this.clearWheelValidationTimer();
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, VALIDATE_WHEEL_TIMEOUT);
    }
    return validated;
  }
  clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  }
  validateMove(event) {
    if (!this.props.scrollByContent && !isDefined(event.target.closest(".".concat(SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }
    return isDefined(this.permissibleDirection);
  }
  handleKeyDown(event) {
    if (this.state.scrolling) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
      return;
    }
    var isKeySupported = Object.values(KEY_CODES).includes(normalizeKeyName(event));
    if (isKeySupported) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
    }
    switch (normalizeKeyName(event)) {
      case KEY_CODES.DOWN:
        this.scrollByLine({
          top: 1,
          left: 0
        });
        break;
      case KEY_CODES.UP:
        this.scrollByLine({
          top: -1,
          left: 0
        });
        break;
      case KEY_CODES.RIGHT:
        this.scrollByLine({
          top: 0,
          left: 1
        });
        break;
      case KEY_CODES.LEFT:
        this.scrollByLine({
          top: 0,
          left: -1
        });
        break;
      case KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;
      case KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;
      case KEY_CODES.HOME:
        this.scrollByKey(KEY_CODES.HOME);
        break;
      case KEY_CODES.END:
        this.scrollByKey(KEY_CODES.END);
        break;
      default:
        break;
    }
  }
  scrollByLine(lines) {
    var scrollOffset = Math.abs(SCROLL_LINE_HEIGHT / getDevicePixelRatio() * 100) / 100;
    this.scrollByLocation({
      top: lines.top * scrollOffset,
      left: lines.left * scrollOffset
    });
  }
  scrollByPage(page) {
    var distance = {
      left: 0,
      top: 0
    };
    var {
      clientHeight,
      clientWidth
    } = this.containerRef.current;
    if (permissibleWheelDirection(this.props.direction, false) === DIRECTION_VERTICAL) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }
    this.scrollByLocation(distance);
  }
  scrollByKey(key) {
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    var vOffsetMin = 0;
    var hOffsetMin = 0;
    var vOffsetMax = -this.vScrollOffsetMax + this.state.bottomPocketHeight + this.state.contentPaddingBottom;
    var hOffsetMax = -this.hScrollOffsetMax;
    var offset = getOffsetDistance(key === KEY_CODES.HOME ? {
      top: vOffsetMin,
      left: this.props.rtlEnabled ? hOffsetMax : hOffsetMin
    } : {
      top: vOffsetMax,
      left: this.props.rtlEnabled ? hOffsetMin : hOffsetMax
    }, {
      top: scrollTop,
      left: scrollLeft
    });
    var direction = permissibleWheelDirection(this.props.direction, false);
    this.scrollByLocation(direction === DIRECTION_VERTICAL ? {
      top: offset.top,
      left: 0
    } : {
      top: 0,
      left: offset.left
    });
  }
  lock() {
    this.locked = true;
  }
  unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  }
  onVisibilityChangeHandler(visible) {
    var _this$props$onVisibil, _this$props9;
    if (visible) {
      var _this$vScrollbarRef$c7, _this$hScrollbarRef$c7;
      var {
        scrollLeft,
        scrollTop
      } = this.savedScrollOffset;
      (_this$vScrollbarRef$c7 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c7 === void 0 ? void 0 : _this$vScrollbarRef$c7.scrollTo(scrollTop, false);
      (_this$hScrollbarRef$c7 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c7 === void 0 ? void 0 : _this$hScrollbarRef$c7.scrollTo(scrollLeft, false);
    }
    (_this$props$onVisibil = (_this$props9 = this.props).onVisibilityChange) === null || _this$props$onVisibil === void 0 ? void 0 : _this$props$onVisibil.call(_this$props9, visible);
  }
  updateElementDimensions() {
    if (this.props.forceGeneratePockets) {
      this.setTopPocketDimensions(this.topPocketRef.current);
      this.setBottomPocketDimensions(this.bottomPocketRef.current);
    }
    this.setContentWidth(this.contentRef.current);
    this.setContentHeight(this.content());
    this.setContainerDimensions(this.containerRef.current);
  }
  setTopPocketDimensions(topPocketEl) {
    this.setState(__state_argument => ({
      topPocketHeight: this.props.forceGeneratePockets && this.props.pullDownEnabled ? topPocketEl.clientHeight : 0
    }));
  }
  setBottomPocketDimensions(bottomPocketEl) {
    this.setState(__state_argument => ({
      bottomPocketHeight: this.props.forceGeneratePockets && this.props.reachBottomEnabled ? bottomPocketEl.clientHeight : 0
    }));
  }
  setContentHeight(contentEl) {
    if (isElementVisible(contentEl)) {
      this.setState(__state_argument => ({
        contentClientHeight: contentEl.clientHeight
      }));
      this.setState(__state_argument => ({
        contentScrollHeight: contentEl.scrollHeight
      }));
      this.setState(__state_argument => ({
        contentPaddingBottom: getElementPadding(this.contentRef.current, 'bottom')
      }));
    }
  }
  setContentWidth(contentEl) {
    if (isElementVisible(contentEl)) {
      this.setState(__state_argument => ({
        contentClientWidth: contentEl.clientWidth
      }));
      this.setState(__state_argument => ({
        contentScrollWidth: contentEl.scrollWidth
      }));
    }
  }
  setContainerDimensions(containerEl) {
    if (isElementVisible(containerEl)) {
      this.setState(__state_argument => ({
        containerClientHeight: containerEl.clientHeight
      }));
      this.setState(__state_argument => ({
        containerClientWidth: containerEl.clientWidth
      }));
    }
  }
  get contentHeight() {
    var _this$contentRef;
    return getElementOverflowY((_this$contentRef = this.contentRef) === null || _this$contentRef === void 0 ? void 0 : _this$contentRef.current) === 'hidden' ? this.state.contentClientHeight : Math.max(this.state.contentScrollHeight, this.state.contentClientHeight);
  }
  get contentWidth() {
    var _this$contentRef2;
    return getElementOverflowX((_this$contentRef2 = this.contentRef) === null || _this$contentRef2 === void 0 ? void 0 : _this$contentRef2.current) === 'hidden' ? this.state.contentClientWidth : Math.max(this.state.contentScrollWidth, this.state.contentClientWidth);
  }
  get containerHasSizes() {
    return this.state.containerClientHeight > 0 && this.state.containerClientWidth > 0;
  }
  get contentStyles() {
    if (this.__getterCache['contentStyles'] !== undefined) {
      return this.__getterCache['contentStyles'];
    }
    return this.__getterCache['contentStyles'] = (() => {
      return {
        transform: "translate(".concat(this.contentTranslateX, "px, ").concat(this.contentTranslateY, "px)")
      };
    })();
  }
  get contentTranslateY() {
    var location = this.state.vScrollLocation;
    var transformValue = location % 1;
    var maxOffset = this.vScrollOffsetMax - this.state.bottomPocketHeight - this.state.contentPaddingBottom;
    if (maxOffset >= 0) {
      return 0;
    }
    if (!this.props.bounceEnabled || inRange(this.state.vScrollLocation, maxOffset, 0)) {
      return -this.state.topPocketHeight;
    }
    if (location > 0) {
      transformValue = location;
    }
    if (location < maxOffset) {
      transformValue = location - maxOffset;
    }
    return transformValue - this.state.topPocketHeight;
  }
  get contentTranslateX() {
    var location = this.state.hScrollLocation;
    var transformValue = location % 1;
    if (!this.props.bounceEnabled || this.hScrollOffsetMax === 0 || inRange(this.state.hScrollLocation, this.hScrollOffsetMax, 0)) {
      return 0;
    }
    if (location > 0) {
      transformValue = location;
    }
    if (location < this.hScrollOffsetMax) {
      transformValue = location - this.hScrollOffsetMax;
    }
    return transformValue;
  }
  get containerStyles() {
    if (this.__getterCache['containerStyles'] !== undefined) {
      return this.__getterCache['containerStyles'];
    }
    return this.__getterCache['containerStyles'] = (() => {
      var direction = this.permissibleDirection;
      var vDirectionAllowed = direction === DIRECTION_VERTICAL || direction === DIRECTION_BOTH;
      var hDirectionAllowed = direction === DIRECTION_HORIZONTAL || direction === DIRECTION_BOTH;
      var touchDirection = vDirectionAllowed ? 'pan-x' : '';
      touchDirection = hDirectionAllowed ? 'pan-y' : touchDirection;
      touchDirection = vDirectionAllowed && hDirectionAllowed ? 'none' : touchDirection;
      return {
        touchAction: touchDirection
      };
    })();
  }
  get cssClasses() {
    var {
      classes,
      direction,
      disabled,
      showScrollbar
    } = this.props;
    var classesMap = {
      'dx-scrollable': true,
      [SCROLLABLE_SIMULATED_CLASS]: true,
      ["dx-scrollable-".concat(direction)]: true,
      [SCROLLABLE_DISABLED_CLASS]: !!disabled,
      [SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE]: showScrollbar === 'always',
      [String(classes)]: !!classes
    };
    return combineClasses(classesMap);
  }
  get direction() {
    if (this.__getterCache['direction'] !== undefined) {
      return this.__getterCache['direction'];
    }
    return this.__getterCache['direction'] = (() => {
      return new ScrollDirection(this.props.direction);
    })();
  }
  get permissibleDirection() {
    var {
      bounceEnabled
    } = this.props;
    return allowedDirection(this.props.direction, -this.vScrollOffsetMax, -this.hScrollOffsetMax, bounceEnabled);
  }
  get isHoverable() {
    return !this.props.disabled && this.props.showScrollbar === 'onHover';
  }
  get restAttributes() {
    var _this$props10 = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props10, _excluded);
    return restProps;
  }
  content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }
    return this.contentRef.current;
  }
  container() {
    return this.containerRef.current;
  }
  refresh() {
    var _this$props$onPullDow2, _this$props11;
    this.setState(__state_argument => ({
      topPocketState: TopPocketState.STATE_READY
    }));
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props11 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props11, {});
  }
  release() {
    var _this$hScrollbarRef$c8, _this$vScrollbarRef$c8;
    this.onRelease();
    (_this$hScrollbarRef$c8 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c8 === void 0 ? void 0 : _this$hScrollbarRef$c8.releaseHandler();
    (_this$vScrollbarRef$c8 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c8 === void 0 ? void 0 : _this$vScrollbarRef$c8.releaseHandler();
  }
  updateHandler() {
    this.updateElementDimensions();
    this.onUpdated();
  }
  scrollHeight() {
    return this.content().offsetHeight;
  }
  scrollWidth() {
    return this.content().offsetWidth;
  }
  scrollOffset() {
    var {
      scrollLeft,
      scrollTop
    } = this.savedScrollOffset;
    return {
      top: this.vScrollOffsetMax === 0 ? 0 : scrollTop,
      left: this.hScrollOffsetMax === 0 ? 0 : scrollLeft
    };
  }
  scrollTop() {
    return this.scrollOffset().top;
  }
  scrollLeft() {
    return this.scrollOffset().left;
  }
  clientHeight() {
    return this.containerRef.current.clientHeight;
  }
  clientWidth() {
    return this.containerRef.current.clientWidth;
  }
  validate(event) {
    if (this.isLocked()) {
      return false;
    }
    return this.moveIsAllowed(event);
  }
  moveIsAllowed(event) {
    if (this.props.disabled || isDxMouseWheelEvent(event) && isCommandKeyPressed({
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })) {
      return false;
    }
    if (this.props.bounceEnabled) {
      return true;
    }
    return isDxMouseWheelEvent(event) ? this.validateWheel(event) : this.validateMove(event);
  }
  scrollByLocation(location) {
    var _this$hScrollbarRef$c9, _this$vScrollbarRef$c9;
    this.updateHandler();
    this.setState(__state_argument => ({
      scrolling: true
    }));
    this.prepareDirections(true);
    this.onStart();
    var {
      scrollLeft,
      scrollTop
    } = this.containerRef.current;
    var {
      left,
      top
    } = location;
    (_this$hScrollbarRef$c9 = this.hScrollbarRef.current) === null || _this$hScrollbarRef$c9 === void 0 ? void 0 : _this$hScrollbarRef$c9.scrollTo(scrollLeft + left, true);
    (_this$vScrollbarRef$c9 = this.vScrollbarRef.current) === null || _this$vScrollbarRef$c9 === void 0 ? void 0 : _this$vScrollbarRef$c9.scrollTo(scrollTop + top, true);
    this.setState(__state_argument => ({
      scrolling: false
    }));
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.state['hScrollLocation'] !== nextState['hScrollLocation'] || this.props['bounceEnabled'] !== nextProps['bounceEnabled'] || this.state['contentClientWidth'] !== nextState['contentClientWidth'] || this.state['contentScrollWidth'] !== nextState['contentScrollWidth'] || this.state['containerClientWidth'] !== nextState['containerClientWidth'] || this.state['vScrollLocation'] !== nextState['vScrollLocation'] || this.state['contentClientHeight'] !== nextState['contentClientHeight'] || this.state['contentScrollHeight'] !== nextState['contentScrollHeight'] || this.state['containerClientHeight'] !== nextState['containerClientHeight'] || this.state['bottomPocketHeight'] !== nextState['bottomPocketHeight'] || this.state['contentPaddingBottom'] !== nextState['contentPaddingBottom'] || this.state['topPocketHeight'] !== nextState['topPocketHeight']) {
      this.__getterCache['contentStyles'] = undefined;
    }
    if (this.props['bounceEnabled'] !== nextProps['bounceEnabled'] || this.props['direction'] !== nextProps['direction'] || this.state['contentClientHeight'] !== nextState['contentClientHeight'] || this.state['contentScrollHeight'] !== nextState['contentScrollHeight'] || this.state['containerClientHeight'] !== nextState['containerClientHeight'] || this.state['contentClientWidth'] !== nextState['contentClientWidth'] || this.state['contentScrollWidth'] !== nextState['contentScrollWidth'] || this.state['containerClientWidth'] !== nextState['containerClientWidth']) {
      this.__getterCache['containerStyles'] = undefined;
    }
    if (this.props['direction'] !== nextProps['direction']) {
      this.__getterCache['direction'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        loadPanelTemplate: getTemplate(props.loadPanelTemplate)
      }),
      active: this.state.active,
      hovered: this.state.hovered,
      scrolling: this.state.scrolling,
      containerClientWidth: this.state.containerClientWidth,
      containerClientHeight: this.state.containerClientHeight,
      contentScrollWidth: this.state.contentScrollWidth,
      contentScrollHeight: this.state.contentScrollHeight,
      contentClientWidth: this.state.contentClientWidth,
      contentClientHeight: this.state.contentClientHeight,
      contentPaddingBottom: this.state.contentPaddingBottom,
      topPocketHeight: this.state.topPocketHeight,
      bottomPocketHeight: this.state.bottomPocketHeight,
      topPocketState: this.state.topPocketState,
      isLoadPanelVisible: this.state.isLoadPanelVisible,
      vScrollLocation: this.state.vScrollLocation,
      hScrollLocation: this.state.hScrollLocation,
      pendingScrollEvent: this.state.pendingScrollEvent,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      scrollableRef: this.scrollableRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      pulledDown: this.pulledDown,
      handleScroll: this.handleScroll,
      syncScrollbarsWithContent: this.syncScrollbarsWithContent,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      getEventArgs: this.getEventArgs,
      getInitEventData: this.getInitEventData,
      onStart: this.onStart,
      onEnd: this.onEnd,
      restoreEndActionDirections: this.restoreEndActionDirections,
      onUpdated: this.onUpdated,
      onBounce: this.onBounce,
      onPullDown: this.onPullDown,
      onRelease: this.onRelease,
      onReachBottom: this.onReachBottom,
      scrollLocationChange: this.scrollLocationChange,
      hScrollOffsetMax: this.hScrollOffsetMax,
      vScrollOffsetMax: this.vScrollOffsetMax,
      vScrollOffsetMin: this.vScrollOffsetMin,
      onScroll: this.onScroll,
      handleInit: this.handleInit,
      handleStart: this.handleStart,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      handleCancel: this.handleCancel,
      isCrossThumbScrolling: this.isCrossThumbScrolling,
      adjustDistance: this.adjustDistance,
      suppressDirections: this.suppressDirections,
      validateEvent: this.validateEvent,
      prepareDirections: this.prepareDirections,
      isContent: this.isContent,
      tryGetAllowedDirection: this.tryGetAllowedDirection,
      isLocked: this.isLocked,
      validateWheel: this.validateWheel,
      clearWheelValidationTimer: this.clearWheelValidationTimer,
      validateMove: this.validateMove,
      handleKeyDown: this.handleKeyDown,
      scrollByLine: this.scrollByLine,
      scrollByPage: this.scrollByPage,
      scrollByKey: this.scrollByKey,
      lock: this.lock,
      unlock: this.unlock,
      onVisibilityChangeHandler: this.onVisibilityChangeHandler,
      updateElementDimensions: this.updateElementDimensions,
      setTopPocketDimensions: this.setTopPocketDimensions,
      setBottomPocketDimensions: this.setBottomPocketDimensions,
      setContentHeight: this.setContentHeight,
      setContentWidth: this.setContentWidth,
      setContainerDimensions: this.setContainerDimensions,
      contentHeight: this.contentHeight,
      contentWidth: this.contentWidth,
      containerHasSizes: this.containerHasSizes,
      contentStyles: this.contentStyles,
      contentTranslateY: this.contentTranslateY,
      contentTranslateX: this.contentTranslateX,
      containerStyles: this.containerStyles,
      cssClasses: this.cssClasses,
      direction: this.direction,
      permissibleDirection: this.permissibleDirection,
      isHoverable: this.isHoverable,
      restAttributes: this.restAttributes
    });
  }
}
ScrollableSimulated.defaultProps = ScrollableSimulatedProps;
