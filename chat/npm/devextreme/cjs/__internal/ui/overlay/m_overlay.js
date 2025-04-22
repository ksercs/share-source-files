/**
* DevExtreme (cjs/__internal/ui/overlay/m_overlay.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _animation = require("../../../common/core/animation");
var _hide_callback = require("../../../common/core/environment/hide_callback");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _drag = require("../../../common/core/events/drag");
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _short = require("../../../common/core/events/short");
var _index = require("../../../common/core/events/utils/index");
var _visibility_change = require("../../../common/core/events/visibility_change");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _empty_template = require("../../../core/templates/empty_template");
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));
var _common = require("../../../core/utils/common");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../../../core/utils/ready_callbacks"));
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _view_port = require("../../../core/utils/view_port");
var _selectors = require("../../../ui/widget/selectors");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_dom = _interopRequireDefault(require("../../core/utils/m_dom"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _m_window = _interopRequireDefault(require("../../core/utils/m_window"));
var _m_overlay_position_controller = require("./m_overlay_position_controller");
var zIndexPool = _interopRequireWildcard(require("./m_z_index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ready = _ready_callbacks.default.add;
const window = _m_window.default.getWindow();
const viewPortChanged = _view_port.changeCallback;
const OVERLAY_CLASS = 'dx-overlay';
const OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
const OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
const OVERLAY_SHADER_CLASS = 'dx-overlay-shader';
const INNER_OVERLAY_CLASS = 'dx-inner-overlay';
const INVISIBLE_STATE_CLASS = 'dx-state-invisible';
const ANONYMOUS_TEMPLATE_NAME = 'content';
const RTL_DIRECTION_CLASS = 'dx-rtl';
const OVERLAY_STACK = [];
const PREVENT_SAFARI_SCROLLING_CLASS = 'dx-prevent-safari-scrolling';
const TAB_KEY = 'tab';
ready(() => {
  // @ts-expect-error
  _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, e => {
    for (let i = OVERLAY_STACK.length - 1; i >= 0; i--) {
      // @ts-expect-error
      if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
class Overlay extends _widget.default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      escape() {
        this.hide();
      }
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: '',
      wrapperAttr: {},
      position: (0, _extend.extend)({}, _m_overlay_position_controller.OVERLAY_POSITION_ALIASES.center),
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
      _ignorePreventScrollEventsDeprecation: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: 'content',
      innerOverlay: false,
      restorePosition: true,
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
      _fixWrapperPosition: false,
      _loopFocus: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return !_m_window.default.hasWindow();
      },
      // @ts-expect-error ts-error
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }]);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
      animation: true
    });
  }
  $wrapper() {
    return this._$wrapper;
  }
  _eventBindingTarget() {
    return this._$content;
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    (0, _extend.extend)(this._deprecatedOptions, {
      closeOnOutsideClick: {
        since: '22.1',
        alias: 'hideOnOutsideClick'
      }
    });
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ('preventScrollEvents' in options && !options._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  }
  _logDeprecatedPreventScrollEventsInfo() {
    this._logDeprecatedOptionWarning('preventScrollEvents', {
      since: '23.1',
      message: 'If you enable this option, end-users may experience scrolling issues.'
    });
  }
  _init() {
    super._init();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = (0, _renderer.default)('<div>').addClass(OVERLAY_WRAPPER_CLASS);
    this._$content = (0, _renderer.default)('<div>').addClass(OVERLAY_CONTENT_CLASS);
    this._initInnerOverlayClass();
    const $element = this.$element();
    $element.addClass(OVERLAY_CLASS);
    this._$wrapper.attr('data-bind', 'dxControlsDescendantBindings: true');
    this._toggleViewPortSubscription(true);
    const {
      hideTopOverlayHandler
    } = this.option();
    // @ts-expect-error ts-error
    this._initHideTopOverlayHandler(hideTopOverlayHandler);
    this._parentsScrollSubscriptionInfo = {
      handler: e => {
        this._hideOnParentsScrollHandler(e);
      }
    };
    this.warnPositionAsFunction();
  }
  warnPositionAsFunction() {
    if ((0, _type.isFunction)(this.option('position'))) {
      // position as function deprecated in 21.2
      _errors.default.log('W0018');
    }
  }
  _initInnerOverlayClass() {
    const {
      innerOverlay
    } = this.option();
    this._$content.toggleClass(INNER_OVERLAY_CLASS, innerOverlay);
  }
  _initHideTopOverlayHandler(handler) {
    this._hideTopOverlayHandler = handler;
  }
  // eslint-disable-next-line class-methods-use-this
  _getActionsList() {
    return ['onShowing', 'onShown', 'onHiding', 'onHidden', 'onPositioned', 'onVisualPositionChanged'];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    (0, _iterator.each)(actions, (_, action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ['disabled', 'readOnly']
      }) || _common.noop;
    });
  }
  _initHideOnOutsideClickHandler() {
    var _this = this;
    // @ts-expect-error ts-error
    this._proxiedDocumentDownHandler = function () {
      return _this._documentDownHandler(...arguments);
    };
  }
  _initMarkup() {
    super._initMarkup();
    this._renderWrapperAttributes();
    this._initPositionController();
  }
  _documentDownHandler(e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    const isAttachedTarget = (0, _renderer.default)(window.document).is(e.target) || _m_dom.default.contains(window.document, e.target);
    const isInnerOverlay = (0, _renderer.default)(e.target).closest(`.${INNER_OVERLAY_CLASS}`).length;
    const outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || _m_dom.default.contains(this._$content.get(0), e.target));
    if (outsideClick && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    const {
      propagateOutsideClick
    } = this.option();
    return propagateOutsideClick;
  }
  _shouldHideOnOutsideClick(e) {
    const {
      hideOnOutsideClick
    } = this.option();
    if ((0, _type.isFunction)(hideOnOutsideClick)) {
      return hideOnOutsideClick(e);
    }
    return hideOnOutsideClick;
  }
  _outsideClickHandler(e) {
    if (this.option('shading')) {
      e.preventDefault();
    }
    this.hide();
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new _empty_template.EmptyTemplate()
    });
    super._initTemplates();
  }
  _isTopOverlay() {
    const overlayStack = this._overlayStack();
    for (let i = overlayStack.length - 1; i >= 0; i--) {
      const tabbableElements = overlayStack[i]._findTabbableBounds();
      if (tabbableElements.first || tabbableElements.last) {
        // @ts-ignore
        return overlayStack[i] === this;
      }
    }
    return false;
  }
  // eslint-disable-next-line class-methods-use-this
  _overlayStack() {
    return OVERLAY_STACK;
  }
  // eslint-disable-next-line class-methods-use-this
  _zIndexInitValue() {
    // @ts-expect-error ts-error
    return Overlay.baseZIndex();
  }
  _toggleViewPortSubscription(toggle) {
    var _this2 = this;
    viewPortChanged.remove(this._viewPortChangeHandle);
    if (toggle) {
      this._viewPortChangeHandle = function () {
        // @ts-expect-error ts-error
        _this2._viewPortChangeHandler(...arguments);
      };
      viewPortChanged.add(this._viewPortChangeHandle);
    }
  }
  _viewPortChangeHandler() {
    this._positionController.updateContainer(this.option('container'));
    this._refresh();
  }
  _renderWrapperAttributes() {
    const {
      wrapperAttr
    } = this.option();
    const attributes = (0, _extend.extend)({}, wrapperAttr);
    const classNames = attributes.class;
    delete attributes.class;
    // @ts-expect-error ts-error
    this.$wrapper().attr(attributes)
    // @ts-expect-error ts-error
    .removeClass(this._customWrapperClass).addClass(classNames);
    this._customWrapperClass = classNames;
  }
  _renderVisibilityAnimate(visible) {
    this._stopAnimation();
    return visible ? this._show() : this._hide();
  }
  _getAnimationConfig() {
    return this._getOptionValue('animation', this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  _toggleBodyScroll(enabled) {}
  _animateShowing() {
    var _this3 = this;
    const animation = this._getAnimationConfig() ?? {};
    const showAnimation = this._normalizeAnimation(animation.show, 'to');
    const startShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.start) ?? _common.noop;
    const completeShowAnimation = (showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.complete) ?? _common.noop;
    this._animate(showAnimation, function () {
      if (_this3._isAnimationPaused) {
        return;
      }
      if (_this3.option('focusStateEnabled')) {
        // @ts-expect-error
        _events_engine.default.trigger(_this3._focusTarget(), 'focus');
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
  }
  _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
    if ((0, _type.isPromise)(cancelArg)) {
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
  }
  _show() {
    this._showingDeferred = (0, _deferred.Deferred)();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(() => {
      delete this._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      const show = () => {
        this._stopAnimation();
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this._toggleVisibility(true);
        this._$content.css('visibility', 'hidden');
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, false);
        this._updateZIndexStackPosition(true);
        this._positionController.openingHandled();
        this._renderContent();
        const showingArgs = {
          cancel: false
        };
        this._actions.onShowing(showingArgs);
        const cancelShow = () => {
          this._toggleVisibility(false);
          this._$content.css('visibility', '');
          this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
          this._isShowingActionCanceled = true;
          this._moveFromContainer();
          this._toggleBodyScroll(true);
          this.option('visible', false);
          this._showingDeferred.resolve();
        };
        const applyShow = () => {
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
  }
  _normalizeAnimation(showHideConfig, direction) {
    if (showHideConfig) {
      showHideConfig = (0, _extend.extend)({
        type: 'slide',
        skipElementInitialStyles: true // NOTE: for fadeIn animation
      }, showHideConfig);
      if ((0, _type.isObject)(showHideConfig[direction])) {
        (0, _extend.extend)(showHideConfig[direction], {
          position: this._positionController.position
        });
      }
    }
    return showHideConfig;
  }
  _animateHiding() {
    var _this4 = this;
    const animation = this._getAnimationConfig() ?? {};
    const hideAnimation = this._normalizeAnimation(animation.hide, 'from');
    const startHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.start) ?? _common.noop;
    const completeHideAnimation = (hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.complete) ?? _common.noop;
    this._animate(hideAnimation, function () {
      var _this4$_actions;
      _this4._$content.css('pointerEvents', '');
      _this4._renderVisibility(false);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      completeHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = false;
      (_this4$_actions = _this4._actions) === null || _this4$_actions === void 0 || _this4$_actions.onHidden();
      _this4._hidingDeferred.resolve();
    }, function () {
      _this4._$content.css('pointerEvents', 'none');
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      startHideAnimation.call(_this4, ...args);
      _this4._hideAnimationProcessing = true;
    });
  }
  _hide() {
    if (!this._currentVisible) {
      return (0, _deferred.Deferred)().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = (0, _deferred.Deferred)();
    const hidingArgs = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      this._actions.onHiding(hidingArgs);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      const cancelHide = () => {
        this._isHidingActionCanceled = true;
        const {
          enableBodyScroll
        } = this.option();
        this._toggleBodyScroll(enableBodyScroll);
        this.option('visible', true);
        this._hidingDeferred.resolve();
      };
      const applyHide = () => {
        this._forceFocusLost();
        this._toggleShading(false);
        this._toggleSubscriptions(false);
        this._stopShowTimer();
        this._animateHiding();
      };
      this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
    }
    return this._hidingDeferred.promise();
  }
  _forceFocusLost() {
    const activeElement = _dom_adapter.default.getActiveElement();
    const shouldResetActiveElement = !!this._$content.find(activeElement).length;
    if (shouldResetActiveElement) {
      _m_dom.default.resetActiveElement();
    }
  }
  _animate(animation, completeCallback, startCallback) {
    if (animation) {
      startCallback = startCallback || animation.start || _common.noop;
      // @ts-expect-error ts-error
      _animation.fx.animate(this._$content, (0, _extend.extend)({}, animation, {
        start: startCallback,
        complete: completeCallback
      }));
    } else {
      completeCallback();
    }
  }
  _stopAnimation() {
    // @ts-expect-error ts-error
    _animation.fx.stop(this._$content, true);
  }
  _renderVisibility(visible) {
    if (visible && this._isParentHidden()) {
      return;
    }
    this._currentVisible = visible;
    this._stopAnimation();
    if (!visible) {
      (0, _visibility_change.triggerHidingEvent)(this._$content);
    }
    if (visible) {
      this._checkContainerExists();
      this._moveToContainer();
      this._renderGeometry();
      (0, _visibility_change.triggerShownEvent)(this._$content);
      (0, _visibility_change.triggerResizeEvent)(this._$content);
    } else {
      this._toggleVisibility(visible);
      this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
      this._updateZIndexStackPosition(visible);
      this._moveFromContainer();
    }
    this._toggleShading(visible);
    this._toggleSubscriptions(visible);
  }
  _updateZIndexStackPosition(pushToStack) {
    const overlayStack = this._overlayStack();
    // @ts-expect-error ts-error
    const index = overlayStack.indexOf(this);
    if (pushToStack) {
      if (index === -1) {
        this._zIndex = zIndexPool.create(this._zIndexInitValue());
        // @ts-expect-error ts-error
        overlayStack.push(this);
      }
      this._$wrapper.css('zIndex', this._zIndex);
      this._$content.css('zIndex', this._zIndex);
    } else if (index !== -1) {
      overlayStack.splice(index, 1);
      zIndexPool.remove(this._zIndex);
    }
  }
  _toggleShading(visible) {
    const {
      shading,
      shadingColor
    } = this.option();
    this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && shading);
    // @ts-expect-error ts-error
    this._$wrapper.css('backgroundColor', shading ? shadingColor : '');
    // @ts-expect-error ts-error
    this._toggleTabTerminator(visible && shading);
  }
  _initTabTerminatorHandler() {
    var _this5 = this;
    this._proxiedTabTerminatorHandler = function () {
      // @ts-expect-error ts-error
      _this5._tabKeyHandler(...arguments);
    };
  }
  _toggleTabTerminator(enabled) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _loopFocus
    } = this.option();
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)('keydown', this.NAME);
    if (_loopFocus || enabled) {
      _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    } else {
      _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
    }
  }
  _findTabbableBounds() {
    const $elements = this._$wrapper.find('*');
    const elementsCount = $elements.length - 1;
    let first = null;
    let last = null;
    for (let i = 0; i <= elementsCount; i += 1) {
      // @ts-expect-error ts-error
      if (!first && $elements.eq(i).is(_selectors.tabbable)) {
        // @ts-expect-error ts-error
        first = $elements.eq(i);
      }
      // @ts-expect-error ts-error
      if (!last && $elements.eq(elementsCount - i).is(_selectors.tabbable)) {
        // @ts-expect-error ts-error
        last = $elements.eq(elementsCount - i);
      }
      if (first && last) {
        break;
      }
    }
    return {
      first,
      last
    };
  }
  _tabKeyHandler(e) {
    if ((0, _index.normalizeKeyName)(e) !== TAB_KEY || !this._isTopOverlay()) {
      return;
    }
    const wrapper = this._$wrapper.get(0);
    const activeElement = _dom_adapter.default.getActiveElement(wrapper);
    const {
      first: $firstTabbable,
      last: $lastTabbable
    } = this._findTabbableBounds();
    const isTabOnLast = !e.shiftKey && activeElement === ($lastTabbable === null || $lastTabbable === void 0 ? void 0 : $lastTabbable.get(0));
    const isShiftTabOnFirst = e.shiftKey && activeElement === ($firstTabbable === null || $firstTabbable === void 0 ? void 0 : $firstTabbable.get(0));
    const isOutsideTarget = !_m_dom.default.contains(wrapper, activeElement);
    const shouldPreventDefault = isTabOnLast || isShiftTabOnFirst || isOutsideTarget;
    if (shouldPreventDefault) {
      e.preventDefault();
      const $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
      // @ts-expect-error ts-error
      _events_engine.default.trigger($focusElement, 'focusin');
      // @ts-expect-error ts-error
      _events_engine.default.trigger($focusElement, 'focus');
    }
  }
  _toggleSubscriptions(enabled) {
    if (_m_window.default.hasWindow()) {
      this._toggleHideTopOverlayCallback(enabled);
      this._toggleHideOnParentsScrollSubscription(enabled);
    }
  }
  _toggleHideTopOverlayCallback(subscribe) {
    if (!this._hideTopOverlayHandler) {
      return;
    }
    if (subscribe) {
      _hide_callback.hideCallback.add(this._hideTopOverlayHandler);
    } else {
      _hide_callback.hideCallback.remove(this._hideTopOverlayHandler);
    }
  }
  _toggleHideOnParentsScrollSubscription(needSubscribe) {
    // @ts-expect-error ts-error
    const scrollEvent = (0, _index.addNamespace)('scroll', this.NAME);
    const {
      prevTargets,
      handler
    } = this._parentsScrollSubscriptionInfo ?? {};
    _events_engine.default.off(prevTargets, scrollEvent, handler);
    const hideOnScroll = this.option('hideOnParentScroll');
    if (needSubscribe && hideOnScroll) {
      let $parents = this._getHideOnParentScrollTarget().parents();
      if (_devices.default.real().deviceType === 'desktop') {
        $parents = $parents.add(window);
      }
      _events_engine.default.on($parents, scrollEvent, handler);
      this._parentsScrollSubscriptionInfo.prevTargets = $parents;
    }
  }
  _hideOnParentsScrollHandler(e) {
    let hideHandled = false;
    const hideOnScroll = this.option('hideOnParentScroll');
    if ((0, _type.isFunction)(hideOnScroll)) {
      hideHandled = hideOnScroll(e);
    }
    if (!hideHandled && !this._showAnimationProcessing) {
      this.hide();
    }
  }
  _getHideOnParentScrollTarget() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _hideOnParentScrollTarget
    } = this.option();
    // @ts-expect-error ts-error
    const $hideOnParentScrollTarget = (0, _renderer.default)(_hideOnParentScrollTarget);
    if ($hideOnParentScrollTarget.length) {
      return $hideOnParentScrollTarget;
    }
    return this._$wrapper;
  }
  _render() {
    super._render();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this.option('visible'));
  }
  _appendContentToElement() {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  }
  _renderContent() {
    const shouldDeferRendering = !this._currentVisible && this.option('deferRendering');
    const isParentHidden = this.option('visible') && this._isParentHidden();
    if (isParentHidden) {
      this._isHidden = true;
      return;
    }
    if (this._contentAlreadyRendered || shouldDeferRendering) {
      return;
    }
    this._contentAlreadyRendered = true;
    this._appendContentToElement();
    super._renderContent();
  }
  _isParentHidden() {
    if (!this.option('_checkParentVisibility')) {
      return false;
    }
    if (this._parentHidden !== undefined) {
      return this._parentHidden;
    }
    const $parent = this.$element().parent();
    if ($parent.is(':visible')) {
      return false;
    }
    let isHidden = false;
    // @ts-expect-error ts-error
    $parent.add($parent.parents()).each((index, element) => {
      const $element = (0, _renderer.default)(element);
      // @ts-expect-error ts-error
      if ($element.css('display') === 'none') {
        isHidden = true;
        return false;
      }
    });
    return isHidden || !_dom_adapter.default.getBody().contains($parent.get(0));
  }
  _renderContentImpl() {
    const whenContentRendered = (0, _deferred.Deferred)();
    const contentTemplateOption = this.option('contentTemplate');
    const contentTemplate = this._getTemplate(contentTemplateOption);
    const transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
    contentTemplate === null || contentTemplate === void 0 || contentTemplate.render({
      container: (0, _element.getPublicElement)(this.$content()),
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
    const {
      preventScrollEvents
    } = this.option();
    this._toggleWrapperScrollEventsSubscription(preventScrollEvents);
    whenContentRendered.done(() => {
      if (this.option('visible')) {
        this._moveToContainer();
      }
    });
    // @ts-expect-error ts-error
    return whenContentRendered.promise();
  }
  _getPositionControllerConfig() {
    const {
      container,
      visualContainer,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _fixWrapperPosition,
      restorePosition,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _skipContentPositioning
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
      _fixWrapperPosition,
      _skipContentPositioning
    };
  }
  _initPositionController() {
    this._positionController = new _m_overlay_position_controller.OverlayPositionController(
    // @ts-expect-error ts-error
    this._getPositionControllerConfig());
  }
  _toggleWrapperScrollEventsSubscription(enabled) {
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)(_drag.move, this.NAME);
    _events_engine.default.off(this._$wrapper, eventName);
    if (enabled) {
      _events_engine.default.on(this._$wrapper, eventName, {
        validate() {
          return true;
        },
        getDirection() {
          return 'both';
        },
        _toggleGestureCover(toggle) {
          if (!toggle) {
            this._toggleGestureCoverImpl(toggle);
          }
        },
        _clearSelection: _common.noop,
        isNative: true
      }, e => {
        const {
          originalEvent
        } = e.originalEvent;
        const {
          type
        } = originalEvent || {};
        const isWheel = type === 'wheel';
        const isMouseMove = type === 'mousemove';
        const isScrollByWheel = isWheel && !(0, _index.isCommandKeyPressed)(e);
        e._cancelPreventDefault = true;
        if (originalEvent && e.cancelable !== false && (!isMouseMove && !isWheel || isScrollByWheel)) {
          e.preventDefault();
        }
      });
    }
  }
  _moveFromContainer() {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  }
  _checkContainerExists() {
    const $wrapperContainer = this._positionController.$container;
    // NOTE: The container is undefined when DOM is not ready yet. See T1143527
    if ($wrapperContainer === undefined) {
      return;
    }
    const containerExists = $wrapperContainer.length > 0;
    if (!containerExists) {
      _ui.default.log('W1021', this.NAME);
    }
  }
  _moveToContainer() {
    const $wrapperContainer = this._positionController.$container;
    this._$wrapper.appendTo($wrapperContainer);
    this._$content.appendTo(this._$wrapper);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderGeometry(options) {
    const {
      visible
    } = this.option();
    if (visible && _m_window.default.hasWindow()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  }
  _renderGeometryImpl() {
    // NOTE: position can be specified as a function which needs to be called strict on render start
    this._positionController.updatePosition(this._getOptionValue('position'));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderPosition(state) {
    this._positionController.positionContent();
  }
  _isAllWindowCovered() {
    const {
      shading
    } = this.option();
    return (0, _type.isWindow)(this._positionController.$visualContainer.get(0)) && shading;
  }
  _toggleSafariScrolling() {
    const visible = this.option('visible');
    const $body = (0, _renderer.default)(_dom_adapter.default.getBody());
    const isIosSafari = _devices.default.real().platform === 'ios' && _browser.default.safari;
    const isAllWindowCovered = this._isAllWindowCovered();
    const isScrollingPrevented = $body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS);
    const shouldPreventScrolling = !isScrollingPrevented && visible && isAllWindowCovered;
    const shouldEnableScrolling = isScrollingPrevented && (!visible || !isAllWindowCovered || this._disposed);
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
  }
  _renderWrapper() {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  }
  _renderWrapperDimensions() {
    const {
      $visualContainer
    } = this._positionController;
    const documentElement = _dom_adapter.default.getDocumentElement();
    const isVisualContainerWindow = (0, _type.isWindow)($visualContainer.get(0));
    const wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : (0, _size.getOuterWidth)($visualContainer);
    const wrapperHeight = isVisualContainerWindow ? window.innerHeight : (0, _size.getOuterHeight)($visualContainer);
    this._$wrapper.css({
      width: wrapperWidth,
      height: wrapperHeight
    });
  }
  _renderDimensions() {
    const content = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue('minWidth', content),
      maxWidth: this._getOptionValue('maxWidth', content),
      minHeight: this._getOptionValue('minHeight', content),
      maxHeight: this._getOptionValue('maxHeight', content),
      width: this._getOptionValue('width', content),
      height: this._getOptionValue('height', content)
    });
  }
  _focusTarget() {
    return this._$content;
  }
  _attachKeyboardEvents() {
    this._keyboardListenerId = _short.keyboard.on(this._$content, null, opts => this._keyboardHandler(opts));
  }
  // @ts-expect-error ts-error
  _keyboardHandler(options) {
    const e = options.originalEvent;
    const $target = (0, _renderer.default)(e.target);
    if ($target.is(this._$content) || !this.option('ignoreChildEvents')) {
      // @ts-expect-error ts-error
      super._keyboardHandler(...arguments);
    }
  }
  _isVisible() {
    const {
      visible
    } = this.option();
    // @ts-expect-error ts-error
    return visible;
  }
  _visibilityChanged(visible) {
    if (visible) {
      if (this.option('visible')) {
        this._renderVisibilityAnimate(visible);
      }
    } else {
      this._renderVisibilityAnimate(visible);
    }
  }
  _dimensionChanged() {
    this._renderGeometry();
  }
  _clean() {
    const {
      isRenovated
    } = this.option();
    if (!this._contentAlreadyRendered && !isRenovated) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._stopShowTimer();
    this._cleanFocusState();
  }
  _stopShowTimer() {
    if (this._asyncShowTimeout) {
      clearTimeout(this._asyncShowTimeout);
    }
    this._asyncShowTimeout = null;
  }
  _dispose() {
    // @ts-expect-error
    _animation.fx.stop(this._$content, false);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._toggleTabTerminator(false);
    this._actions = null;
    this._parentsScrollSubscriptionInfo = null;
    super._dispose();
    this._toggleSafariScrolling();
    this.option('visible') && zIndexPool.remove(this._zIndex);
    this._$wrapper.remove();
    this._$content.remove();
  }
  _toggleRTLDirection(rtl) {
    this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl);
  }
  _optionChanged(args) {
    const {
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
      case '_loopFocus':
      case 'shading':
        {
          const {
            visible
          } = this.option();
          this._toggleShading(visible);
          this._toggleSafariScrolling();
          break;
        }
      case 'shadingColor':
        {
          const {
            visible
          } = this.option();
          this._toggleShading(visible);
          break;
        }
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
        this._renderVisibilityAnimate(value)
        // @ts-expect-error ts-error
        .done(() => {
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
        // @ts-expect-error ts-error
        this._initHideTopOverlayHandler(value);
        this._toggleHideTopOverlayCallback(this.option('visible'));
        break;
      case 'hideOnParentScroll':
      case '_hideOnParentScrollTarget':
        {
          const {
            visible
          } = this.option();
          this._toggleHideOnParentsScrollSubscription(visible);
          break;
        }
      case 'closeOnOutsideClick':
      case 'hideOnOutsideClick':
      case 'propagateOutsideClick':
        break;
      case 'rtlEnabled':
        this._contentAlreadyRendered = false;
        super._optionChanged(args);
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
        // @ts-expect-error ts-error
        this._toggleWrapperScrollEventsSubscription(value);
        break;
      default:
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    showing = showing === undefined ? !this.option('visible') : showing;
    const result = (0, _deferred.Deferred)();
    if (showing === this.option('visible')) {
      // @ts-expect-error ts-error
      return result.resolveWith(this, [showing]).promise();
    }
    const animateDeferred = (0, _deferred.Deferred)();
    this._animateDeferred = animateDeferred;
    this.option('visible', showing);
    animateDeferred.promise()
    // @ts-expect-error ts-error
    .done(() => {
      delete this._animateDeferred;
      // @ts-expect-error ts-error
      result.resolveWith(this, [this.option('visible')]);
    }).fail(() => {
      delete this._animateDeferred;
      result.reject();
    });
    return result.promise();
  }
  $content() {
    return this._$content;
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
  content() {
    return (0, _element.getPublicElement)(this._$content);
  }
  repaint() {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      (0, _visibility_change.triggerResizeEvent)(this._$content);
    } else {
      super.repaint();
    }
  }
}
// @ts-expect-error
Overlay.baseZIndex = zIndex => zIndexPool.base(zIndex);
(0, _component_registrator.default)('dxOverlay', Overlay);
var _default = exports.default = Overlay;
