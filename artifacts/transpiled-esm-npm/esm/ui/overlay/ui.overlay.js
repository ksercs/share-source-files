import { getOuterWidth, getOuterHeight } from '../../core/utils/size';
import fx from '../../animation/fx';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import domAdapter from '../../core/dom_adapter';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
import { EmptyTemplate } from '../../core/templates/empty_template';
import { noop } from '../../core/utils/common';
import { Deferred } from '../../core/utils/deferred';
import { contains, resetActiveElement } from '../../core/utils/dom';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import readyCallbacks from '../../core/utils/ready_callbacks';
import { isFunction, isObject, isPromise, isWindow } from '../../core/utils/type';
import { changeCallback } from '../../core/utils/view_port';
import { getWindow, hasWindow } from '../../core/utils/window';
import errors from '../../core/errors';
import uiErrors from '../widget/ui.errors';
import eventsEngine from '../../events/core/events_engine';
import { move as dragEventMove } from '../../events/drag';
import pointerEvents from '../../events/pointer';
import { keyboard } from '../../events/short';
import { addNamespace, isCommandKeyPressed, normalizeKeyName } from '../../events/utils/index';
import { triggerHidingEvent, triggerResizeEvent, triggerShownEvent } from '../../events/visibility_change';
import { hideCallback as hideTopOverlayCallback } from '../../mobile/hide_callback';
import { tabbable } from '../widget/selectors';
import Widget from '../widget/ui.widget';
import browser from '../../core/utils/browser';
import * as zIndexPool from './z_index';
import { OverlayPositionController, OVERLAY_POSITION_ALIASES } from './overlay_position_controller';
var ready = readyCallbacks.add;
var window = getWindow();
var viewPortChanged = changeCallback;
var OVERLAY_CLASS = 'dx-overlay';
var OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
var OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
var OVERLAY_SHADER_CLASS = 'dx-overlay-shader';
var INNER_OVERLAY_CLASS = 'dx-inner-overlay';
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var ANONYMOUS_TEMPLATE_NAME = 'content';
var RTL_DIRECTION_CLASS = 'dx-rtl';
var OVERLAY_STACK = [];
var PREVENT_SAFARI_SCROLLING_CLASS = 'dx-prevent-safari-scrolling';
var TAB_KEY = 'tab';
ready(() => {
  eventsEngine.subscribeGlobal(domAdapter.getDocument(), pointerEvents.down, e => {
    for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
      if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var Overlay = Widget.inherit({
  _supportedKeys: function _supportedKeys() {
    return extend(this.callBase(), {
      escape: function escape() {
        this.hide();
      }
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      /**
      * @name dxOverlayOptions.activeStateEnabled
      * @hidden
      */
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: '',
      wrapperAttr: {},
      position: extend({}, OVERLAY_POSITION_ALIASES.center),
      width: '80vw',
      minWidth: null,
      maxWidth: null,
      height: '80vh',
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: 'pop',
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: 'pop',
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      closeOnOutsideClick: false,
      hideOnOutsideClick: false,
      copyRootClassesToWrapper: false,
      _ignoreCopyRootClassesToWrapperDeprecation: false,
      _ignoreElementAttrDeprecation: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: 'content',
      innerOverlay: false,
      restorePosition: true,
      container: undefined,
      visualContainer: undefined,
      // NOTE: private options
      hideTopOverlayHandler: () => {
        this.hide();
      },
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _fixWrapperPosition: false
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return !hasWindow();
      },
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }]);
  },
  _setOptionsByReference: function _setOptionsByReference() {
    this.callBase();
    extend(this._optionsByReference, {
      animation: true
    });
  },
  $wrapper: function $wrapper() {
    return this._$wrapper;
  },
  _eventBindingTarget: function _eventBindingTarget() {
    return this._$content;
  },
  _setDeprecatedOptions() {
    this.callBase();
    extend(this._deprecatedOptions, {
      'closeOnOutsideClick': {
        since: '22.1',
        alias: 'hideOnOutsideClick'
      }
    });
  },
  ctor: function ctor(element, options) {
    this.callBase(element, options);
    function createWrapperAttrDeprecationInfo() {
      return {
        since: '21.2',
        message: 'Use the "wrapperAttr" option instead'
      };
    }
    if (options) {
      if (options.copyRootClassesToWrapper && !options._ignoreCopyRootClassesToWrapperDeprecation) {
        this._logDeprecatedOptionWarning('copyRootClassesToWrapper', createWrapperAttrDeprecationInfo());
      }
      if (options.elementAttr && !options._ignoreElementAttrDeprecation) {
        this._logDeprecatedOptionWarning('elementAttr', createWrapperAttrDeprecationInfo());
      }
      if ('preventScrollEvents' in options) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  },
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning('preventScrollEvents', {
      since: '23.1',
      message: 'If you enable this option, end-users may experience scrolling issues.'
    });
  },
  _init: function _init() {
    this.callBase();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = $('<div>').addClass(OVERLAY_WRAPPER_CLASS);
    this._$content = $('<div>').addClass(OVERLAY_CONTENT_CLASS);
    this._initInnerOverlayClass();
    var $element = this.$element();
    if (this.option('copyRootClassesToWrapper')) {
      this._$wrapper.addClass($element.attr('class'));
    }
    $element.addClass(OVERLAY_CLASS);
    this._$wrapper.attr('data-bind', 'dxControlsDescendantBindings: true');
    this._toggleViewPortSubscription(true);
    this._initHideTopOverlayHandler(this.option('hideTopOverlayHandler'));
    this._parentsScrollSubscriptionInfo = {
      handler: e => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  },
  warnPositionAsFunction() {
    if (isFunction(this.option('position'))) {
      // position as function deprecated in 21.2
      errors.log('W0018');
    }
  },
  _initInnerOverlayClass: function _initInnerOverlayClass() {
    this._$content.toggleClass(INNER_OVERLAY_CLASS, this.option('innerOverlay'));
  },
  _initHideTopOverlayHandler: function _initHideTopOverlayHandler(handler) {
    this._hideTopOverlayHandler = handler;
  },
  _getActionsList: function _getActionsList() {
    return ['onShowing', 'onShown', 'onHiding', 'onHidden', 'onPositioned', 'onVisualPositionChanged'];
  },
  _initActions: function _initActions() {
    this._actions = {};
    var actions = this._getActionsList();
    each(actions, (_, action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ['disabled', 'readOnly']
      }) || noop;
    });
  },
  _initHideOnOutsideClickHandler: function _initHideOnOutsideClickHandler() {
    var _this = this;
    this._proxiedDocumentDownHandler = function () {
      return _this._documentDownHandler(...arguments);
    };
  },
  _initMarkup() {
    this.callBase();
    this._renderWrapperAttributes();
    this._initPositionController();
  },
  _documentDownHandler: function _documentDownHandler(e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    var isAttachedTarget = $(window.document).is(e.target) || contains(window.document, e.target);
    var isInnerOverlay = $(e.target).closest(".".concat(INNER_OVERLAY_CLASS)).length;
    var outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || contains(this._$content.get(0), e.target));
    if (outsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    return this.option('propagateOutsideClick');
  },
  _shouldHideOnOutsideClick: function _shouldHideOnOutsideClick(e) {
    var {
      hideOnOutsideClick
    } = this.option();
    if (isFunction(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  },
  _outsideClickHandler(e) {
    if (this.option('shading')) {
      e.preventDefault();
    }
    this.hide();
  },
  _getAnonymousTemplateName: function _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  },
  _initTemplates: function _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new EmptyTemplate()
    });
    this.callBase();
  },
  _isTopOverlay: function _isTopOverlay() {
    var overlayStack = this._overlayStack();
    for (var i = overlayStack.length - 1; i >= 0; i--) {
      var tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.first || tabbableElements.last) {
        return overlayStack[i] === this;
      }
    }
    return false;
  },
  _overlayStack: function _overlayStack() {
    return OVERLAY_STACK;
  },
  _zIndexInitValue: function _zIndexInitValue() {
    return Overlay.baseZIndex();
  },
  _toggleViewPortSubscription: function _toggleViewPortSubscription(toggle) {
    var _this2 = this;
    viewPortChanged.remove(this._viewPortChangeHandle);
    if (toggle) {
      this._viewPortChangeHandle = function () {
        _this2._viewPortChangeHandler(...arguments);
      };
      viewPortChanged.add(this._viewPortChangeHandle);
    }
  },
  _viewPortChangeHandler: function _viewPortChangeHandler() {
    this._positionController.updateContainer(this.option('container'));
    this._refresh();
  },
  _renderWrapperAttributes() {
    var {
      wrapperAttr
    } = this.option();
    var attributes = extend({}, wrapperAttr);
    var classNames = attributes.class;
    delete attributes.class;
    this.$wrapper().attr(attributes).removeClass(this._customWrapperClass).addClass(classNames);
    this._customWrapperClass = classNames;
  },
  _renderVisibilityAnimate: function _renderVisibilityAnimate(visible) {
    this._stopAnimation();
    return visible ? this._show() : this._hide();
  },
  _getAnimationConfig: function _getAnimationConfig() {
    return this._getOptionValue('animation', this);
  },
  _toggleBodyScroll: noop,
  _animateShowing: function _animateShowing() {
    var _this$_getAnimationCo,
      _showAnimation$start,
      _showAnimation$comple,
      _this3 = this;
    var animation = (_this$_getAnimationCo = this._getAnimationConfig()) !== null && _this$_getAnimationCo !== void 0 ? _this$_getAnimationCo : {};
    var showAnimation = this._normalizeAnimation(animation.show, 'to');
    var startShowAnimation = (_showAnimation$start = showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.start) !== null && _showAnimation$start !== void 0 ? _showAnimation$start : noop;
    var completeShowAnimation = (_showAnimation$comple = showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.complete) !== null && _showAnimation$comple !== void 0 ? _showAnimation$comple : noop;
    this._animate(showAnimation, function () {
      if (_this3._isAnimationPaused) {
        return;
      }
      if (_this3.option('focusStateEnabled')) {
        eventsEngine.trigger(_this3._focusTarget(), 'focus');
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      completeShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = false;
      _this3._isHidden = false;
      _this3._actions.onShown();
      _this3._toggleSafariScrolling();
      _this3._showingDeferred.resolve();
    }, function () {
      if (_this3._isAnimationPaused) {
        return;
      }
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      startShowAnimation.call(_this3, ...args);
      _this3._showAnimationProcessing = true;
    });
  },
  _processShowingHidingCancel: function _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if (isPromise(cancelArg)) {
      cancelArg.then(shouldCancel => {
        if (shouldCancel) {
          cancelFunction();
        } else {
          applyFunction();
        }
      }).catch(() => applyFunction());
    } else {
      cancelArg ? cancelFunction() : applyFunction();
    }
  },
  _show: function _show() {
    this._showingDeferred = new Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return new Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      var show = () => {
        this._toggleBodyScroll(this.option('enableBodyScroll'));
        this._stopAnimation();
        this._toggleVisibility(true);
        this._$content.css('visibility', 'hidden');
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        var showingArgs = {
          cancel: false
        };
        this._actions.onShowing(showingArgs);
        var cancelShow = () => {
          this._toggleVisibility(false);
          this._$content.css('visibility', '');
          this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this.option('visible', false);
          this._showingDeferred.resolve();
        };
        var applyShow = () => {
          this._$content.css('visibility', '');
          this._renderVisibility(true);
          this._animateShowing();
        };
        this._processShowingHidingCancel(showingArgs.cancel, applyShow, cancelShow);
      };
      if (this.option('templatesRenderAsynchronously')) {
        this._stopShowTimer();
        // NOTE: T390360, T386038
        this._asyncShowTimeout = setTimeout(show);
      } else {
        show();
      }
    }
    return this._showingDeferred.promise();
  },
  _normalizeAnimation: function _normalizeAnimation(showHideConfig, direction) {
    if (showHideConfig) {
      showHideConfig = extend({
        type: 'slide',
        skipElementInitialStyles: true // NOTE: for fadeIn animation
      }, showHideConfig);
      if (isObject(showHideConfig[direction])) {
        extend(showHideConfig[direction], {
          position: this._positionController.position
        });
      }
    }
    return showHideConfig;
  },
  _animateHiding: function _animateHiding() {
    var _this$_getAnimationCo2,
      _hideAnimation$start,
      _hideAnimation$comple,
      _this4 = this;
    var animation = (_this$_getAnimationCo2 = this._getAnimationConfig()) !== null && _this$_getAnimationCo2 !== void 0 ? _this$_getAnimationCo2 : {};
    var hideAnimation = this._normalizeAnimation(animation.hide, 'from');
    var startHideAnimation = (_hideAnimation$start = hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.start) !== null && _hideAnimation$start !== void 0 ? _hideAnimation$start : noop;
    var completeHideAnimation = (_hideAnimation$comple = hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.complete) !== null && _hideAnimation$comple !== void 0 ? _hideAnimation$comple : noop;
    this._animate(hideAnimation, function () {
      var _this4$_actions;
      _this4._$content.css('pointerEvents', '');
      _this4._renderVisibility(false);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      completeHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = false;
      (_this4$_actions = _this4._actions) === null || _this4$_actions === void 0 ? void 0 : _this4$_actions.onHidden();
      _this4._hidingDeferred.resolve();
    }, function () {
      _this4._$content.css('pointerEvents', 'none');
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      startHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = true;
    });
  },
  _hide: function _hide() {
    if (!this._currentVisible) {
      return new Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = new Deferred();
    var hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      this._actions.onHiding(hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      var cancelHide = () => {
        this._isHidingActionCanceled = true;
        this.option('visible', true);
        this._hidingDeferred.resolve();
      };
      var applyHide = () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._stopShowTimer();
        this._animateHiding();
      };
      this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
    }
    return this._hidingDeferred.promise();
  },
  _forceFocusLost: function _forceFocusLost() {
    var activeElement = domAdapter.getActiveElement();
    var shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      resetActiveElement();
    }
  },
  _animate: function _animate(animation, completeCallback, startCallback) {
    if (animation) {
      startCallback = startCallback || animation.start || noop;
      fx.animate(this._$content, extend({}, animation, {
        start: startCallback,
        complete: completeCallback
      }));
    } else {
      completeCallback();
    }
  },
  _stopAnimation: function _stopAnimation() {
    fx.stop(this._$content, true);
  },
  _renderVisibility: function _renderVisibility(visible) {
    if (visible && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible;
    this._stopAnimation();
    if (!visible) {
      triggerHidingEvent(this._$content);
    }
    if (visible) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      triggerShownEvent(this._$content);
      triggerResizeEvent(this._$content);
    } else {
      this._toggleVisibility(visible);
      this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
      this._updateZIndexStackPosition(visible);
      this._moveFromContainer();
    }
    this._toggleShading(visible);
    this._toggleSubscriptions(visible);
  },
  _updateZIndexStackPosition: function _updateZIndexStackPosition(pushToStack) {
    var overlayStack = this._overlayStack();
    var index = overlayStack.indexOf(this);
    if (pushToStack) {
      if (index === -1) {
        this._zIndex = zIndexPool.create(this._zIndexInitValue());
        overlayStack.push(this);
      }
      this._$wrapper.css('zIndex', this._zIndex);
      this._$content.css('zIndex', this._zIndex);
    } else if (index !== -1) {
      overlayStack.splice(index, 1);
      zIndexPool.remove(this._zIndex);
    }
  },
  _toggleShading: function _toggleShading(visible) {
    this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && this.option('shading'));
    this._$wrapper.css('backgroundColor', this.option('shading') ? this.option('shadingColor') : '');
    this._toggleTabTerminator(visible && this.option('shading'));
  },
  _initTabTerminatorHandler: function _initTabTerminatorHandler() {
    var _this5 = this;
    this._proxiedTabTerminatorHandler = function () {
      _this5._tabKeyHandler(...arguments);
    };
  },
  _toggleTabTerminator: function _toggleTabTerminator(enabled) {
    var eventName = addNamespace('keydown', this.NAME);
    if (enabled) {
      eventsEngine.on(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      eventsEngine.off(domAdapter.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    }
  },
  _findTabbableBounds: function _findTabbableBounds() {
    var $elements = this._$wrapper.find('*');
    var elementsCount = $elements.length - 1;
    var result = {
      first: null,
      last: null
    };
    for (var i = 0; i <= elementsCount; i++) {
      if (!result.first && $elements.eq(i).is(tabbable)) {
        result.first = $elements.eq(i);
      }
      if (!result.last && $elements.eq(elementsCount - i).is(tabbable)) {
        result.last = $elements.eq(elementsCount - i);
      }
      if (result.first && result.last) {
        break;
      }
    }
    return result;
  },
  _tabKeyHandler: function _tabKeyHandler(e) {
    if (normalizeKeyName(e) !== TAB_KEY || !this._isTopOverlay()) {
      return;
    }
    var tabbableElements = this._findTabbableBounds();
    var $firstTabbable = tabbableElements.first;
    var $lastTabbable = tabbableElements.last;
    var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
    var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
    var isEmptyTabList = tabbableElements.length === 0;
    var isOutsideTarget = !contains(this._$wrapper.get(0), e.target);
    if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
      e.preventDefault();
      var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      eventsEngine.trigger($focusElement, 'focusin');
      eventsEngine.trigger($focusElement, 'focus');
    }
  },
  _toggleSubscriptions: function _toggleSubscriptions(enabled) {
    if (hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  },
  _toggleHideTopOverlayCallback: function _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      hideTopOverlayCallback.add(this._hideTopOverlayHandler);
    } else {
      hideTopOverlayCallback.remove(this._hideTopOverlayHandler);
    }
  },
  _toggleHideOnParentsScrollSubscription: function _toggleHideOnParentsScrollSubscription(needSubscribe) {
    var _this$_parentsScrollS;
    var scrollEvent = addNamespace('scroll', this.NAME);
    var {
      prevTargets,
      handler
    } = (_this$_parentsScrollS = this._parentsScrollSubscriptionInfo) !== null && _this$_parentsScrollS !== void 0 ? _this$_parentsScrollS : {};
    eventsEngine.off(prevTargets, scrollEvent, handler);
    var closeOnScroll = this.option('hideOnParentScroll');
    if (needSubscribe && closeOnScroll) {
      var $parents = this._hideOnParentScrollTarget().parents();
      if (devices.real().deviceType === 'desktop') {
        $parents = $parents.add(window);
      }
      eventsEngine.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo.prevTargets = $parents;
    }
  },
  _hideOnParentsScrollHandler: function _hideOnParentsScrollHandler(e) {
    var closeHandled = false;
    var closeOnScroll = this.option('hideOnParentScroll');
    if (isFunction(closeOnScroll)) {
      closeHandled = closeOnScroll(e);
    }
    if (!closeHandled && !this._showAnimationProcessing) {
      this.hide();
    }
  },
  _hideOnParentScrollTarget: function _hideOnParentScrollTarget() {
    return this._$wrapper;
  },
  _render: function _render() {
    this.callBase();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this.option('visible'));
  },
  _appendContentToElement: function _appendContentToElement() {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  },
  _renderContent: function _renderContent() {
    var shouldDeferRendering = !this._currentVisible && this.option('deferRendering');
    var isParentHidden = this.option('visible') && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    this.callBase();
  },
  _isParentHidden: function _isParentHidden() {
    if (!this.option('_checkParentVisibility')) {
      return false;
    }
    if (this._parentHidden !== undefined) {
      return this._parentHidden;
    }
    var $parent = this.$element().parent();
    if ($parent.is(':visible')) {
      return false;
    }
    var isHidden = false;
    $parent.add($parent.parents()).each(function () {
      var $element = $(this);
      if ($element.css('display') === 'none') {
        isHidden = true;
        return false;
      }
    });
    return isHidden || !domAdapter.getBody().contains($parent.get(0));
  },
  _renderContentImpl: function _renderContentImpl() {
    var whenContentRendered = new Deferred();
    var contentTemplateOption = this.option('contentTemplate');
    var contentTemplate = this._getTemplate(contentTemplateOption);
    var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    contentTemplate && contentTemplate.render({
      container: getPublicElement(this.$content()),
      noModel: true,
      transclude,
      onRendered: () => {
        whenContentRendered.resolve();

        // NOTE: T1114344
        if (this.option('templatesRenderAsynchronously')) {
          this._dimensionChanged();
        }
      }
    });
    this._toggleWrapperScrollEventsSubscription(this.option('preventScrollEvents'));
    whenContentRendered.done(() => {
      if (this.option('visible')) {
        this._moveToContainer();
      }
    });
    return whenContentRendered.promise();
  },
  _getPositionControllerConfig() {
    var {
      container,
      visualContainer,
      _fixWrapperPosition,
      restorePosition
    } = this.option();
    // NOTE: position is passed to controller in renderGeometry to prevent window field using in server side mode

    return {
      container,
      visualContainer,
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper,
      onPositioned: this._actions.onPositioned,
      onVisualPositionChanged: this._actions.onVisualPositionChanged,
      restorePosition,
      _fixWrapperPosition
    };
  },
  _initPositionController() {
    this._positionController = new OverlayPositionController(this._getPositionControllerConfig());
  },
  _toggleWrapperScrollEventsSubscription: function _toggleWrapperScrollEventsSubscription(enabled) {
    var eventName = addNamespace(dragEventMove, this.NAME);
    eventsEngine.off(this._$wrapper, eventName);
    if (enabled) {
      eventsEngine.on(this._$wrapper, eventName, {
        validate: function validate() {
          return true;
        },
        getDirection: function getDirection() {
          return 'both';
        },
        _toggleGestureCover: function _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: noop,
        isNative: true
      }, e => {
        var originalEvent = e.originalEvent.originalEvent;
        var {
          type
        } = originalEvent || {};
        var isWheel = type === 'wheel';
        var isMouseMove = type === 'mousemove';
        var isScrollByWheel = isWheel && !isCommandKeyPressed(e);
        e._cancelPreventDefault = true;
        if (originalEvent && e.cancelable !== false && (!isMouseMove && !isWheel || isScrollByWheel)) {
          e.preventDefault();
        }
      });
    }
  },
  _moveFromContainer: function _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  },
  _checkContainerExists() {
    var $wrapperContainer = this._positionController.$container;

    // NOTE: The container is undefined when DOM is not ready yet. See T1143527
    if ($wrapperContainer === undefined) {
      return;
    }
    var containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      uiErrors.log('W1021', this.NAME);
    }
  },
  _moveToContainer: function _moveToContainer() {
    var $wrapperContainer = this._positionController.$container;
    this._$wrapper.appendTo($wrapperContainer);
    this._$content.appendTo(this._$wrapper);
  },
  _renderGeometry: function _renderGeometry(options) {
    var {
      visible
    } = this.option();
    if (visible && hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  },
  _renderGeometryImpl: function _renderGeometryImpl() {
    // NOTE: position can be specified as a function which needs to be called strict on render start
    this._positionController.updatePosition(this._getOptionValue('position'));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  },
  _renderPosition() {
    this._positionController.positionContent();
  },
  _isAllWindowCovered: function _isAllWindowCovered() {
    return isWindow(this._positionController.$visualContainer.get(0)) && this.option('shading');
  },
  _toggleSafariScrolling: function _toggleSafariScrolling() {
    var visible = this.option('visible');
    var $body = $(domAdapter.getBody());
    var isIosSafari = devices.real().platform === 'ios' && browser.safari;
    var isAllWindowCovered = this._isAllWindowCovered();
    var isScrollingPrevented = $body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS);
    var shouldPreventScrolling = !isScrollingPrevented && visible && isAllWindowCovered;
    var shouldEnableScrolling = isScrollingPrevented && (!visible || !isAllWindowCovered || this._disposed);
    if (isIosSafari) {
      if (shouldEnableScrolling) {
        $body.removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
        window.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = undefined;
      } else if (shouldPreventScrolling) {
        this._cachedBodyScrollTop = window.pageYOffset;
        $body.addClass(PREVENT_SAFARI_SCROLLING_CLASS);
      }
    }
  },
  _renderWrapper: function _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  },
  _renderWrapperDimensions: function _renderWrapperDimensions() {
    var $visualContainer = this._positionController.$visualContainer;
    var documentElement = domAdapter.getDocumentElement();
    var isVisualContainerWindow = isWindow($visualContainer.get(0));
    var wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : getOuterWidth($visualContainer);
    var wrapperHeight = isVisualContainerWindow ? window.innerHeight : getOuterHeight($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  },
  _renderDimensions: function _renderDimensions() {
    var content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue('minWidth', content),
      maxWidth: this._getOptionValue('maxWidth', content),
      minHeight: this._getOptionValue('minHeight', content),
      maxHeight: this._getOptionValue('maxHeight', content),
      width: this._getOptionValue('width', content),
      height: this._getOptionValue('height', content)
    });
  },
  _focusTarget: function _focusTarget() {
    return this._$content;
  },
  _attachKeyboardEvents: function _attachKeyboardEvents() {
    this._keyboardListenerId = keyboard.on(this._$content, null, opts => this._keyboardHandler(opts));
  },
  _keyboardHandler: function _keyboardHandler(options) {
    var e = options.originalEvent;
    var $target = $(e.target);
    if ($target.is(this._$content) || !this.option('ignoreChildEvents')) {
      this.callBase(...arguments);
    }
  },
  _isVisible: function _isVisible() {
    return this.option('visible');
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      if (this.option('visible')) {
        this._renderVisibilityAnimate(visible);
      }
    } else {
      this._renderVisibilityAnimate(visible);
    }
  },
  _dimensionChanged: function _dimensionChanged() {
    this._renderGeometry();
  },
  _clean: function _clean() {
    var options = this.option();
    if (!this._contentAlreadyRendered && !options.isRenovated) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._stopShowTimer();
    this._cleanFocusState();
  },
  _stopShowTimer() {
    if (this._asyncShowTimeout) {
      clearTimeout(this._asyncShowTimeout);
    }
    this._asyncShowTimeout = null;
  },
  _dispose: function _dispose() {
    fx.stop(this._$content, false);
    clearTimeout(this._deferShowTimer);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._toggleTabTerminator(false);
    this._actions = null;
    this._parentsScrollSubscriptionInfo = null;
    this.callBase();
    this._toggleSafariScrolling();
    this.option('visible') && zIndexPool.remove(this._zIndex);
    this._$wrapper.remove();
    this._$content.remove();
  },
  _toggleRTLDirection: function _toggleRTLDirection(rtl) {
    this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl);
  },
  _optionChanged: function _optionChanged(args) {
    var {
      value,
      name
    } = args;
    if (this._getActionsList().includes(name)) {
      this._initActions();
      return;
    }
    switch (name) {
      case 'animation':
        break;
      case 'shading':
        this._toggleShading(this.option('visible'));
        this._toggleSafariScrolling();
        break;
      case 'shadingColor':
        this._toggleShading(this.option('visible'));
        break;
      case 'width':
      case 'height':
        this._renderGeometry();
        break;
      case 'minWidth':
      case 'maxWidth':
      case 'minHeight':
      case 'maxHeight':
        this._renderGeometry();
        break;
      case 'position':
        this._positionController.updatePosition(this.option('position'));
        this._positionController.restorePositionOnNextRender(true);
        this._renderGeometry();
        this._toggleSafariScrolling();
        break;
      case 'visible':
        this._renderVisibilityAnimate(value).done(() => {
          var _this$_animateDeferre;
          return (_this$_animateDeferre = this._animateDeferred) === null || _this$_animateDeferre === void 0 ? void 0 : _this$_animateDeferre.resolveWith(this);
        }).fail(() => {
          var _this$_animateDeferre2;
          return (_this$_animateDeferre2 = this._animateDeferred) === null || _this$_animateDeferre2 === void 0 ? void 0 : _this$_animateDeferre2.reject();
        });
        break;
      case 'container':
        this._positionController.updateContainer(value);
        this._invalidate();
        this._toggleSafariScrolling();
        break;
      case 'visualContainer':
        this._positionController.updateVisualContainer(value);
        this._renderWrapper();
        this._toggleSafariScrolling();
        break;
      case 'innerOverlay':
        this._initInnerOverlayClass();
        break;
      case 'deferRendering':
      case 'contentTemplate':
        this._contentAlreadyRendered = false;
        this._clean();
        this._invalidate();
        break;
      case 'hideTopOverlayHandler':
        this._toggleHideTopOverlayCallback(false);
        this._initHideTopOverlayHandler(value);
        this._toggleHideTopOverlayCallback(this.option('visible'));
        break;
      case 'hideOnParentScroll':
        this._toggleHideOnParentsScrollSubscription(this.option('visible'));
        break;
      case 'closeOnOutsideClick':
      case 'hideOnOutsideClick':
      case 'propagateOutsideClick':
        break;
      case 'rtlEnabled':
        this._contentAlreadyRendered = false;
        this.callBase(args);
        break;
      case '_fixWrapperPosition':
        this._positionController.fixWrapperPosition = value;
        break;
      case 'wrapperAttr':
        this._renderWrapperAttributes();
        break;
      case 'restorePosition':
        this._positionController.restorePosition = value;
        break;
      case 'preventScrollEvents':
        this._logDeprecatedPreventScrollEventsInfo();
        this._toggleWrapperScrollEventsSubscription(value);
        break;
      default:
        this.callBase(args);
    }
  },
  toggle: function toggle(showing) {
    showing = showing === undefined ? !this.option('visible') : showing;
    var result = new Deferred();
    if (showing === this.option('visible')) {
      return result.resolveWith(this, [showing]).promise();
    }
    var animateDeferred = new Deferred();
    this._animateDeferred = animateDeferred;
    this.option('visible', showing);
    animateDeferred.promise().done(() => {
      delete this._animateDeferred;
      result.resolveWith(this, [this.option('visible')]);
    }).fail(() => {
      delete this._animateDeferred;
      result.reject();
    });
    return result.promise();
  },
  $content: function $content() {
    return this._$content;
  },
  show: function show() {
    return this.toggle(true);
  },
  hide: function hide() {
    return this.toggle(false);
  },
  content: function content() {
    return getPublicElement(this._$content);
  },
  repaint: function repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      triggerResizeEvent(this._$content);
    } else {
      this.callBase();
    }
  }
});

/**
* @name ui.dxOverlay
* @section utils
*/
Overlay.baseZIndex = zIndex => {
  return zIndexPool.base(zIndex);
};
registerComponent('dxOverlay', Overlay);
export default Overlay;