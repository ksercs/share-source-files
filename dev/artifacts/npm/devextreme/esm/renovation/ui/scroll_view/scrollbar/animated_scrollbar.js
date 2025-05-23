/**
* DevExtreme (esm/renovation/ui/scroll_view/scrollbar/animated_scrollbar.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["bottomPocketSize", "bounceEnabled", "containerHasSizes", "containerSize", "contentPaddingBottom", "contentSize", "direction", "forceGeneratePockets", "inertiaEnabled", "maxOffset", "minOffset", "onBounce", "onEnd", "onLock", "onPullDown", "onReachBottom", "onScroll", "onUnlock", "pulledDown", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "showScrollbar", "visible"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { Scrollbar } from './scrollbar';
import { requestAnimationFrame, cancelAnimationFrame } from '../../../../animation/frame';
import { ScrollableSimulatedProps } from '../common/simulated_strategy_props';
import { inRange } from '../../../../core/utils/math';
import { clampIntoRange } from '../utils/clamp_into_range';
import { AnimatedScrollbarProps } from '../common/animated_scrollbar_props';
import { isDxMouseWheelEvent } from '../../../../events/utils/index';
import { DIRECTION_HORIZONTAL } from '../common/consts';
import { ConfigContext } from '../../../common/config_context';
export var OUT_BOUNDS_ACCELERATION = 0.5;
export var ACCELERATION = 0.92;
export var MIN_VELOCITY_LIMIT = 1;
export var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
var FRAME_DURATION = 17;
var BOUNCE_DURATION = 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
export var BOUNCE_ACCELERATION_SUM = (1 - ACCELERATION ** BOUNCE_FRAMES) / (1 - ACCELERATION);
export var viewFunction = viewModel => {
  var {
    newScrollLocation,
    props: {
      bounceEnabled,
      containerHasSizes,
      containerSize,
      contentSize,
      direction,
      maxOffset,
      minOffset,
      scrollByThumb,
      showScrollbar,
      visible
    },
    scrollbarRef
  } = viewModel;
  return createComponentVNode(2, Scrollbar, {
    "direction": direction,
    "contentSize": contentSize,
    "containerSize": containerSize,
    "visible": visible,
    "minOffset": minOffset,
    "maxOffset": maxOffset,
    "scrollLocation": newScrollLocation,
    "scrollByThumb": scrollByThumb,
    "bounceEnabled": bounceEnabled,
    "showScrollbar": showScrollbar,
    "containerHasSizes": containerHasSizes
  }, null, scrollbarRef);
};
var AnimatedScrollbarPropsType = {
  get pulledDown() {
    return AnimatedScrollbarProps.pulledDown;
  },
  get bottomPocketSize() {
    return AnimatedScrollbarProps.bottomPocketSize;
  },
  get contentPaddingBottom() {
    return AnimatedScrollbarProps.contentPaddingBottom;
  },
  get direction() {
    return AnimatedScrollbarProps.direction;
  },
  get containerSize() {
    return AnimatedScrollbarProps.containerSize;
  },
  get contentSize() {
    return AnimatedScrollbarProps.contentSize;
  },
  get visible() {
    return AnimatedScrollbarProps.visible;
  },
  get containerHasSizes() {
    return AnimatedScrollbarProps.containerHasSizes;
  },
  get scrollLocation() {
    return AnimatedScrollbarProps.scrollLocation;
  },
  get minOffset() {
    return AnimatedScrollbarProps.minOffset;
  },
  get maxOffset() {
    return AnimatedScrollbarProps.maxOffset;
  },
  get inertiaEnabled() {
    return ScrollableSimulatedProps.inertiaEnabled;
  },
  get showScrollbar() {
    return ScrollableSimulatedProps.showScrollbar;
  },
  get scrollByThumb() {
    return ScrollableSimulatedProps.scrollByThumb;
  },
  get bounceEnabled() {
    return ScrollableSimulatedProps.bounceEnabled;
  },
  get reachBottomEnabled() {
    return ScrollableSimulatedProps.reachBottomEnabled;
  },
  get forceGeneratePockets() {
    return ScrollableSimulatedProps.forceGeneratePockets;
  }
};
import { createRef as infernoCreateRef } from 'inferno';
export class AnimatedScrollbar extends InfernoComponent {
  constructor(props) {
    super(props);
    this.scrollbarRef = infernoCreateRef();
    this.rightScrollLocation = 0;
    this.prevScrollLocation = 0;
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
    this.stepAnimationFrame = 0;
    this.velocity = 0;
    this.refreshing = false;
    this.loading = false;
    this.state = {
      canceled: false,
      newScrollLocation: 0,
      forceAnimationToBottomBound: false,
      pendingRefreshing: false,
      pendingLoading: false,
      pendingBounceAnimator: false,
      pendingInertiaAnimator: false,
      needRiseEnd: false,
      wasRelease: false
    };
    this.isThumb = this.isThumb.bind(this);
    this.isScrollbar = this.isScrollbar.bind(this);
    this.reachedMin = this.reachedMin.bind(this);
    this.reachedMax = this.reachedMax.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
    this.disposeAnimationFrame = this.disposeAnimationFrame.bind(this);
    this.risePullDown = this.risePullDown.bind(this);
    this.riseEnd = this.riseEnd.bind(this);
    this.riseReachBottom = this.riseReachBottom.bind(this);
    this.startAnimator = this.startAnimator.bind(this);
    this.updateScrollLocationInRTL = this.updateScrollLocationInRTL.bind(this);
    this.performAnimation = this.performAnimation.bind(this);
    this.updateLockedState = this.updateLockedState.bind(this);
    this.suppressVelocityBeforeBoundary = this.suppressVelocityBeforeBoundary.bind(this);
    this.scrollToNextStep = this.scrollToNextStep.bind(this);
    this.setActiveState = this.setActiveState.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.moveToMouseLocation = this.moveToMouseLocation.bind(this);
    this.resetThumbScrolling = this.resetThumbScrolling.bind(this);
    this.stop = this.stop.bind(this);
    this.cancel = this.cancel.bind(this);
    this.calcThumbScrolling = this.calcThumbScrolling.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.disposeAnimationFrame, []), new InfernoEffect(this.risePullDown, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.pulledDown, this.props.onPullDown]), new InfernoEffect(this.riseEnd, [this.props.scrollLocation, this.props.maxOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.forceGeneratePockets, this.props.pulledDown, this.props.reachBottomEnabled, this.state.wasRelease, this.props.onEnd, this.props.direction]), new InfernoEffect(this.riseReachBottom, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.onReachBottom]), new InfernoEffect(this.startAnimator, [this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.bounceEnabled, this.props.onBounce, this.props.inertiaEnabled]), new InfernoEffect(this.updateScrollLocationInRTL, [this.props.containerHasSizes, this.props.direction, this.props.rtlEnabled, this.props.maxOffset, this.props.scrollLocation, this.props.scrollLocationChange, this.props.onScroll]), new InfernoEffect(this.performAnimation, [this.state.pendingInertiaAnimator, this.state.canceled, this.state.pendingBounceAnimator, this.props.bounceEnabled, this.props.minOffset, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.scrollLocationChange, this.props.direction, this.props.onScroll]), new InfernoEffect(this.updateLockedState, [this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock, this.props.onUnlock])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.pulledDown, this.props.onPullDown]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.scrollLocation, this.props.maxOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.forceGeneratePockets, this.props.pulledDown, this.props.reachBottomEnabled, this.state.wasRelease, this.props.onEnd, this.props.direction]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.onReachBottom]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.bounceEnabled, this.props.onBounce, this.props.inertiaEnabled]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.containerHasSizes, this.props.direction, this.props.rtlEnabled, this.props.maxOffset, this.props.scrollLocation, this.props.scrollLocationChange, this.props.onScroll]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.state.pendingInertiaAnimator, this.state.canceled, this.state.pendingBounceAnimator, this.props.bounceEnabled, this.props.minOffset, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.scrollLocationChange, this.props.direction, this.props.onScroll]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock, this.props.onUnlock]);
  }
  disposeAnimationFrame() {
    return () => {
      this.cancel();
    };
  }
  risePullDown() {
    if (this.props.forceGeneratePockets && this.isReadyToStart && this.inRange && this.props.pulledDown && !this.refreshing) {
      var _this$props$onPullDow, _this$props;
      this.refreshing = true;
      this.setState(__state_argument => ({
        pendingRefreshing: true
      }));
      (_this$props$onPullDow = (_this$props = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props);
    }
  }
  riseEnd() {
    var isInsideBounds = inRange(this.props.scrollLocation, this.props.maxOffset, 0);
    if (isInsideBounds && this.isReadyToStart && this.finished && !this.pendingRelease) {
      var _this$props$onEnd, _this$props2;
      this.setState(__state_argument => ({
        needRiseEnd: false
      }));
      this.setState(__state_argument => ({
        wasRelease: false
      }));
      this.setState(__state_argument => ({
        forceAnimationToBottomBound: false
      }));
      (_this$props$onEnd = (_this$props2 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props2, this.props.direction);
    }
  }
  riseReachBottom() {
    if (this.props.forceGeneratePockets && this.isReadyToStart && this.inRange && this.isReachBottom && !this.loading && this.finished) {
      var _this$props$onReachBo, _this$props3;
      this.loading = true;
      this.setState(__state_argument => ({
        pendingLoading: true
      }));
      (_this$props$onReachBo = (_this$props3 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props3);
    }
  }
  startAnimator() {
    if (this.isReadyToStart) {
      this.setState(__state_argument => ({
        canceled: false
      }));
      if (!this.inRange && this.props.bounceEnabled && !this.state.pendingBounceAnimator) {
        var _this$props$onBounce, _this$props4;
        var distanceToBound = clampIntoRange(this.props.scrollLocation, this.props.minOffset, this.maxOffset) - this.props.scrollLocation;
        this.velocity = distanceToBound / BOUNCE_ACCELERATION_SUM;
        (_this$props$onBounce = (_this$props4 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props4);
        this.setState(__state_argument => ({
          pendingBounceAnimator: true
        }));
      }
      if (this.inRange && this.props.inertiaEnabled && !this.finished && !this.state.pendingInertiaAnimator) {
        if (this.thumbScrolling || !this.thumbScrolling && this.crossThumbScrolling) {
          this.velocity = 0;
        }
        this.setState(__state_argument => ({
          pendingInertiaAnimator: true
        }));
      }
    }
  }
  updateScrollLocationInRTL() {
    if (this.props.containerHasSizes && this.isHorizontal && this.props.rtlEnabled) {
      if (this.props.maxOffset === 0 && this.props.scrollLocation) {
        this.rightScrollLocation = 0;
      }
      this.moveTo(this.props.maxOffset - this.rightScrollLocation);
    }
  }
  performAnimation() {
    if (this.state.pendingInertiaAnimator) {
      if (this.state.canceled) {
        this.setState(__state_argument => ({
          needRiseEnd: false
        }));
        this.stop();
        return;
      }
      if (this.finished || !this.props.bounceEnabled && this.distanceToNearestBoundary === 0) {
        this.stop();
        return;
      }
      if (!this.props.bounceEnabled) {
        this.suppressVelocityBeforeBoundary();
      }
      this.scrollToNextStep();
    }
    if (this.state.pendingBounceAnimator) {
      if (this.distanceToNearestBoundary === 0) {
        this.stop();
        return;
      }
      this.suppressVelocityBeforeBoundary();
      this.scrollToNextStep();
    }
  }
  updateLockedState() {
    if (this.state.pendingBounceAnimator || this.state.pendingRefreshing || this.state.pendingLoading) {
      var _this$props$onLock, _this$props5;
      (_this$props$onLock = (_this$props5 = this.props).onLock) === null || _this$props$onLock === void 0 ? void 0 : _this$props$onLock.call(_this$props5);
    } else {
      var _this$props$onUnlock, _this$props6;
      (_this$props$onUnlock = (_this$props6 = this.props).onUnlock) === null || _this$props$onUnlock === void 0 ? void 0 : _this$props$onUnlock.call(_this$props6);
    }
  }
  get isReadyToStart() {
    return this.state.needRiseEnd && !this.inProgress && !(this.state.pendingRefreshing || this.state.pendingLoading);
  }
  get distanceToNearestBoundary() {
    return Math.min(Math.abs(this.distanceToMin), Math.abs(this.distanceToMax));
  }
  suppressVelocityBeforeBoundary() {
    if (Math.abs(this.distanceToMin) - Math.abs(this.velocity) <= 0) {
      this.velocity = this.distanceToMin;
    }
    if (Math.abs(this.distanceToMax) - Math.abs(this.velocity) <= 0) {
      this.velocity = this.distanceToMax;
    }
  }
  scrollToNextStep() {
    cancelAnimationFrame(this.stepAnimationFrame);
    this.stepAnimationFrame = requestAnimationFrame(() => {
      var prevVelocity = this.velocity;
      this.velocity *= this.acceleration;
      this.moveTo(this.props.scrollLocation + prevVelocity);
    });
  }
  setActiveState() {
    this.scrollbarRef.current.setActiveState();
  }
  moveTo(value) {
    var _this$props$scrollLoc, _this$props7;
    this.rightScrollLocation = this.props.maxOffset - value;
    this.setState(__state_argument => ({
      newScrollLocation: value
    }));
    var scrollDelta = Math.abs(this.prevScrollLocation - value);
    this.prevScrollLocation = value;
    (_this$props$scrollLoc = (_this$props7 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props7, {
      fullScrollProp: this.fullScrollProp,
      location: -value
    });
    if (scrollDelta > 0) {
      var _this$props$onScroll, _this$props8;
      (_this$props$onScroll = (_this$props8 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props8);
    }
  }
  moveToMouseLocation(event, offset) {
    var mouseLocation = event["page".concat(this.axis.toUpperCase())] - offset;
    var containerToContentRatio = this.props.containerSize / this.props.contentSize;
    var delta = mouseLocation / containerToContentRatio - this.props.containerSize / 2;
    this.moveTo(Math.round(-delta));
  }
  resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  }
  stop() {
    this.velocity = 0;
    this.setState(__state_argument => ({
      pendingBounceAnimator: false
    }));
    this.setState(__state_argument => ({
      pendingInertiaAnimator: false
    }));
  }
  cancel() {
    this.setState(__state_argument => ({
      canceled: true
    }));
    this.stop();
    cancelAnimationFrame(this.stepAnimationFrame);
  }
  calcThumbScrolling(event, currentCrossThumbScrolling, isScrollbarClicked) {
    var {
      target
    } = event.originalEvent;
    this.thumbScrolling = isScrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
    this.crossThumbScrolling = !this.thumbScrolling && currentCrossThumbScrolling;
  }
  get distanceToMin() {
    return this.props.minOffset - this.props.scrollLocation;
  }
  get distanceToMax() {
    return this.maxOffset - this.props.scrollLocation;
  }
  get pendingRelease() {
    return this.props.forceGeneratePockets && (this.props.pulledDown || this.isReachBottom) && !this.state.wasRelease;
  }
  get inProgress() {
    return this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator;
  }
  get inRange() {
    return inRange(this.props.scrollLocation, this.maxOffset, this.props.minOffset);
  }
  get isReachBottom() {
    return this.props.reachBottomEnabled && this.props.maxOffset < 0 && Math.round(-Math.ceil(-this.props.scrollLocation) - this.props.maxOffset) <= 1;
  }
  get finished() {
    if (this.state.pendingBounceAnimator) {
      return Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
    }
    return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
  }
  get acceleration() {
    return this.state.pendingBounceAnimator || this.inRange ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
  }
  get maxOffset() {
    if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && !this.state.forceAnimationToBottomBound) {
      return this.props.maxOffset - this.props.bottomPocketSize - this.props.contentPaddingBottom;
    }
    return this.props.maxOffset;
  }
  get isHorizontal() {
    return this.props.direction === DIRECTION_HORIZONTAL;
  }
  get axis() {
    return this.isHorizontal ? 'x' : 'y';
  }
  get fullScrollProp() {
    return this.isHorizontal ? 'scrollLeft' : 'scrollTop';
  }
  get restAttributes() {
    var _this$props9 = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props9, _excluded);
    return restProps;
  }
  isThumb(element) {
    return this.scrollbarRef.current.isThumb(element);
  }
  isScrollbar(element) {
    return this.scrollbarRef.current.isScrollbar(element);
  }
  reachedMin() {
    return this.props.scrollLocation <= this.maxOffset;
  }
  reachedMax() {
    return this.props.scrollLocation >= this.props.minOffset;
  }
  initHandler(event, crossThumbScrolling, offset) {
    this.cancel();
    this.refreshing = false;
    this.loading = false;
    if (!isDxMouseWheelEvent(event.originalEvent)) {
      var {
        target
      } = event.originalEvent;
      var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);
      this.calcThumbScrolling(event, crossThumbScrolling, scrollbarClicked);
      if (scrollbarClicked) {
        this.moveToMouseLocation(event, offset);
      }
      if (this.thumbScrolling) {
        this.setActiveState();
      }
    }
  }
  moveHandler(delta, isDxMouseWheel) {
    if (this.crossThumbScrolling) {
      return;
    }
    var resultDelta = delta;
    if (this.thumbScrolling) {
      resultDelta = -Math.round(delta / (this.props.containerSize / this.props.contentSize));
    }
    var isOutBounds = !inRange(this.props.scrollLocation, this.maxOffset, this.props.minOffset);
    if (isOutBounds) {
      resultDelta *= OUT_BOUNDS_ACCELERATION;
    }
    var scrollValue = this.props.scrollLocation + resultDelta;
    this.moveTo(this.props.bounceEnabled && !isDxMouseWheel ? scrollValue : clampIntoRange(scrollValue, this.props.minOffset, this.maxOffset));
  }
  endHandler(receivedVelocity, needRiseEnd) {
    this.velocity = this.props.inertiaEnabled && !this.thumbScrolling ? receivedVelocity : 0;
    this.setState(__state_argument => ({
      needRiseEnd: needRiseEnd
    }));
    this.resetThumbScrolling();
  }
  stopHandler() {
    if (this.thumbScrolling) {
      this.setState(__state_argument => ({
        needRiseEnd: true
      }));
    }
    this.resetThumbScrolling();
  }
  scrollTo(value, needRiseEnd) {
    this.loading = false;
    this.refreshing = false;
    this.moveTo(-clampIntoRange(value, -this.maxOffset, 0));
    this.setState(__state_argument => ({
      needRiseEnd: needRiseEnd
    }));
  }
  releaseHandler() {
    if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && inRange(this.props.scrollLocation, this.maxOffset, this.props.maxOffset)) {
      this.setState(__state_argument => ({
        forceAnimationToBottomBound: true
      }));
    }
    this.setState(__state_argument => ({
      wasRelease: true
    }));
    this.setState(__state_argument => ({
      needRiseEnd: true
    }));
    this.resetThumbScrolling();
    this.setState(__state_argument => ({
      pendingRefreshing: false
    }));
    this.setState(__state_argument => ({
      pendingLoading: false
    }));
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      canceled: this.state.canceled,
      newScrollLocation: this.state.newScrollLocation,
      forceAnimationToBottomBound: this.state.forceAnimationToBottomBound,
      pendingRefreshing: this.state.pendingRefreshing,
      pendingLoading: this.state.pendingLoading,
      pendingBounceAnimator: this.state.pendingBounceAnimator,
      pendingInertiaAnimator: this.state.pendingInertiaAnimator,
      needRiseEnd: this.state.needRiseEnd,
      wasRelease: this.state.wasRelease,
      scrollbarRef: this.scrollbarRef,
      config: this.config,
      isReadyToStart: this.isReadyToStart,
      distanceToNearestBoundary: this.distanceToNearestBoundary,
      suppressVelocityBeforeBoundary: this.suppressVelocityBeforeBoundary,
      scrollToNextStep: this.scrollToNextStep,
      setActiveState: this.setActiveState,
      moveTo: this.moveTo,
      moveToMouseLocation: this.moveToMouseLocation,
      resetThumbScrolling: this.resetThumbScrolling,
      stop: this.stop,
      cancel: this.cancel,
      calcThumbScrolling: this.calcThumbScrolling,
      distanceToMin: this.distanceToMin,
      distanceToMax: this.distanceToMax,
      pendingRelease: this.pendingRelease,
      inProgress: this.inProgress,
      inRange: this.inRange,
      isReachBottom: this.isReachBottom,
      finished: this.finished,
      acceleration: this.acceleration,
      maxOffset: this.maxOffset,
      isHorizontal: this.isHorizontal,
      axis: this.axis,
      fullScrollProp: this.fullScrollProp,
      restAttributes: this.restAttributes
    });
  }
}
AnimatedScrollbar.defaultProps = AnimatedScrollbarPropsType;
