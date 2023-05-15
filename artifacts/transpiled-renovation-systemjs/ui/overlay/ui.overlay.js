!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/overlay/ui.overlay.js"], ["../../core/utils/size","../../animation/fx","../../core/component_registrator","../../core/devices","../../core/dom_adapter","../../core/element","../../core/renderer","../../core/templates/empty_template","../../core/utils/common","../../core/utils/deferred","../../core/utils/dom","../../core/utils/extend","../../core/utils/iterator","../../core/utils/ready_callbacks","../../core/utils/type","../../core/utils/view_port","../../core/utils/window","../../core/errors","../widget/ui.errors","../../events/core/events_engine","../../events/drag","../../events/pointer","../../events/short","../../events/utils/index","../../events/visibility_change","../../mobile/hide_callback","../widget/selectors","../widget/ui.widget","../../core/utils/browser","./z_index","./overlay_position_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/overlay/ui.overlay.js", ["../../core/utils/size", "../../animation/fx", "../../core/component_registrator", "../../core/devices", "../../core/dom_adapter", "../../core/element", "../../core/renderer", "../../core/templates/empty_template", "../../core/utils/common", "../../core/utils/deferred", "../../core/utils/dom", "../../core/utils/extend", "../../core/utils/iterator", "../../core/utils/ready_callbacks", "../../core/utils/type", "../../core/utils/view_port", "../../core/utils/window", "../../core/errors", "../widget/ui.errors", "../../events/core/events_engine", "../../events/drag", "../../events/pointer", "../../events/short", "../../events/utils/index", "../../events/visibility_change", "../../mobile/hide_callback", "../widget/selectors", "../widget/ui.widget", "../../core/utils/browser", "./z_index", "./overlay_position_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _fx = _interopRequireDefault($__require("../../animation/fx"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _element = $__require("../../core/element");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _empty_template = $__require("../../core/templates/empty_template");
  var _common = $__require("../../core/utils/common");
  var _deferred = $__require("../../core/utils/deferred");
  var _dom = $__require("../../core/utils/dom");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _type = $__require("../../core/utils/type");
  var _view_port = $__require("../../core/utils/view_port");
  var _window = $__require("../../core/utils/window");
  var _errors = _interopRequireDefault($__require("../../core/errors"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _drag = $__require("../../events/drag");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _short = $__require("../../events/short");
  var _index = $__require("../../events/utils/index");
  var _visibility_change = $__require("../../events/visibility_change");
  var _hide_callback = $__require("../../mobile/hide_callback");
  var _selectors = $__require("../widget/selectors");
  var _ui2 = _interopRequireDefault($__require("../widget/ui.widget"));
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var zIndexPool = _interopRequireWildcard($__require("./z_index"));
  var _overlay_position_controller = $__require("./overlay_position_controller");
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ready = _ready_callbacks.default.add;
  var window = (0, _window.getWindow)();
  var viewPortChanged = _view_port.changeCallback;
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
  ready(function () {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, function (e) {
      for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
        if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
          return;
        }
      }
    });
  });
  var Overlay = _ui2.default.inherit({
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), {
        escape: function escape() {
          this.hide();
        }
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      var _this = this;
      return (0, _extend.extend)(this.callBase(), {
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
        position: (0, _extend.extend)({}, _overlay_position_controller.OVERLAY_POSITION_ALIASES.center),
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
        hideTopOverlayHandler: function hideTopOverlayHandler() {
          _this.hide();
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
          return !(0, _window.hasWindow)();
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
      (0, _extend.extend)(this._optionsByReference, {
        animation: true
      });
    },
    $wrapper: function $wrapper() {
      return this._$wrapper;
    },
    _eventBindingTarget: function _eventBindingTarget() {
      return this._$content;
    },
    _setDeprecatedOptions: function _setDeprecatedOptions() {
      this.callBase();
      (0, _extend.extend)(this._deprecatedOptions, {
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
    _logDeprecatedPreventScrollEventsInfo: function _logDeprecatedPreventScrollEventsInfo() {
      this._logDeprecatedOptionWarning('preventScrollEvents', {
        since: '23.1',
        message: 'If you enable this option, end-users may experience scrolling issues.'
      });
    },
    _init: function _init() {
      var _this2 = this;
      this.callBase();
      this._initActions();
      this._initHideOnOutsideClickHandler();
      this._initTabTerminatorHandler();
      this._customWrapperClass = null;
      this._$wrapper = (0, _renderer.default)('<div>').addClass(OVERLAY_WRAPPER_CLASS);
      this._$content = (0, _renderer.default)('<div>').addClass(OVERLAY_CONTENT_CLASS);
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
        handler: function handler(e) {
          _this2._hideOnParentsScrollHandler(e);
        }
      };
      this.warnPositionAsFunction();
    },
    warnPositionAsFunction: function warnPositionAsFunction() {
      if ((0, _type.isFunction)(this.option('position'))) {
        // position as function deprecated in 21.2
        _errors.default.log('W0018');
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
      var _this3 = this;
      this._actions = {};
      var actions = this._getActionsList();
      (0, _iterator.each)(actions, function (_, action) {
        _this3._actions[action] = _this3._createActionByOption(action, {
          excludeValidators: ['disabled', 'readOnly']
        }) || _common.noop;
      });
    },
    _initHideOnOutsideClickHandler: function _initHideOnOutsideClickHandler() {
      var _this4 = this;
      this._proxiedDocumentDownHandler = function () {
        return _this4._documentDownHandler.apply(_this4, arguments);
      };
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._renderWrapperAttributes();
      this._initPositionController();
    },
    _documentDownHandler: function _documentDownHandler(e) {
      if (this._showAnimationProcessing) {
        this._stopAnimation();
      }
      var isAttachedTarget = (0, _renderer.default)(window.document).is(e.target) || (0, _dom.contains)(window.document, e.target);
      var isInnerOverlay = (0, _renderer.default)(e.target).closest(".".concat(INNER_OVERLAY_CLASS)).length;
      var outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || (0, _dom.contains)(this._$content.get(0), e.target));
      if (outsideClick && this._shouldHideOnOutsideClick(e)) {
        this._outsideClickHandler(e);
      }
      return this.option('propagateOutsideClick');
    },
    _shouldHideOnOutsideClick: function _shouldHideOnOutsideClick(e) {
      var _this$option = this.option(),
          hideOnOutsideClick = _this$option.hideOnOutsideClick;
      if ((0, _type.isFunction)(hideOnOutsideClick)) {
        return hideOnOutsideClick(e);
      }
      return hideOnOutsideClick;
    },
    _outsideClickHandler: function _outsideClickHandler(e) {
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
        content: new _empty_template.EmptyTemplate()
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
      var _this5 = this;
      viewPortChanged.remove(this._viewPortChangeHandle);
      if (toggle) {
        this._viewPortChangeHandle = function () {
          _this5._viewPortChangeHandler.apply(_this5, arguments);
        };
        viewPortChanged.add(this._viewPortChangeHandle);
      }
    },
    _viewPortChangeHandler: function _viewPortChangeHandler() {
      this._positionController.updateContainer(this.option('container'));
      this._refresh();
    },
    _renderWrapperAttributes: function _renderWrapperAttributes() {
      var _this$option2 = this.option(),
          wrapperAttr = _this$option2.wrapperAttr;
      var attributes = (0, _extend.extend)({}, wrapperAttr);
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
    _toggleBodyScroll: _common.noop,
    _animateShowing: function _animateShowing() {
      var _this$_getAnimationCo,
          _showAnimation$start,
          _showAnimation$comple,
          _this6 = this;
      var animation = (_this$_getAnimationCo = this._getAnimationConfig()) !== null && _this$_getAnimationCo !== void 0 ? _this$_getAnimationCo : {};
      var showAnimation = this._normalizeAnimation(animation.show, 'to');
      var startShowAnimation = (_showAnimation$start = showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.start) !== null && _showAnimation$start !== void 0 ? _showAnimation$start : _common.noop;
      var completeShowAnimation = (_showAnimation$comple = showAnimation === null || showAnimation === void 0 ? void 0 : showAnimation.complete) !== null && _showAnimation$comple !== void 0 ? _showAnimation$comple : _common.noop;
      this._animate(showAnimation, function () {
        if (_this6._isAnimationPaused) {
          return;
        }
        if (_this6.option('focusStateEnabled')) {
          _events_engine.default.trigger(_this6._focusTarget(), 'focus');
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        completeShowAnimation.call.apply(completeShowAnimation, [_this6].concat(args));
        _this6._showAnimationProcessing = false;
        _this6._isHidden = false;
        _this6._actions.onShown();
        _this6._toggleSafariScrolling();
        _this6._showingDeferred.resolve();
      }, function () {
        if (_this6._isAnimationPaused) {
          return;
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        startShowAnimation.call.apply(startShowAnimation, [_this6].concat(args));
        _this6._showAnimationProcessing = true;
      });
    },
    _processShowingHidingCancel: function _processShowingHidingCancel(cancelArg, applyFunction, cancelFunction) {
      if ((0, _type.isPromise)(cancelArg)) {
        cancelArg.then(function (shouldCancel) {
          if (shouldCancel) {
            cancelFunction();
          } else {
            applyFunction();
          }
        }).catch(function () {
          return applyFunction();
        });
      } else {
        cancelArg ? cancelFunction() : applyFunction();
      }
    },
    _show: function _show() {
      var _this7 = this;
      this._showingDeferred = new _deferred.Deferred();
      this._parentHidden = this._isParentHidden();
      this._showingDeferred.done(function () {
        delete _this7._parentHidden;
      });
      if (this._parentHidden) {
        this._isHidden = true;
        return this._showingDeferred.resolve();
      }
      if (this._currentVisible) {
        return new _deferred.Deferred().resolve().promise();
      }
      this._currentVisible = true;
      if (this._isHidingActionCanceled) {
        delete this._isHidingActionCanceled;
        this._showingDeferred.reject();
      } else {
        var show = function show() {
          _this7._toggleBodyScroll(_this7.option('enableBodyScroll'));
          _this7._stopAnimation();
          _this7._toggleVisibility(true);
          _this7._$content.css('visibility', 'hidden');
          _this7._$content.toggleClass(INVISIBLE_STATE_CLASS, false);
          _this7._updateZIndexStackPosition(true);
          _this7._positionController.openingHandled();
          _this7._renderContent();
          var showingArgs = {
            cancel: false
          };
          _this7._actions.onShowing(showingArgs);
          var cancelShow = function cancelShow() {
            _this7._toggleVisibility(false);
            _this7._$content.css('visibility', '');
            _this7._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
            _this7._isShowingActionCanceled = true;
            _this7._moveFromContainer();
            _this7.option('visible', false);
            _this7._showingDeferred.resolve();
          };
          var applyShow = function applyShow() {
            _this7._$content.css('visibility', '');
            _this7._renderVisibility(true);
            _this7._animateShowing();
          };
          _this7._processShowingHidingCancel(showingArgs.cancel, applyShow, cancelShow);
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
    },
    _animateHiding: function _animateHiding() {
      var _this$_getAnimationCo2,
          _hideAnimation$start,
          _hideAnimation$comple,
          _this8 = this;
      var animation = (_this$_getAnimationCo2 = this._getAnimationConfig()) !== null && _this$_getAnimationCo2 !== void 0 ? _this$_getAnimationCo2 : {};
      var hideAnimation = this._normalizeAnimation(animation.hide, 'from');
      var startHideAnimation = (_hideAnimation$start = hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.start) !== null && _hideAnimation$start !== void 0 ? _hideAnimation$start : _common.noop;
      var completeHideAnimation = (_hideAnimation$comple = hideAnimation === null || hideAnimation === void 0 ? void 0 : hideAnimation.complete) !== null && _hideAnimation$comple !== void 0 ? _hideAnimation$comple : _common.noop;
      this._animate(hideAnimation, function () {
        var _this8$_actions;
        _this8._$content.css('pointerEvents', '');
        _this8._renderVisibility(false);
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        completeHideAnimation.call.apply(completeHideAnimation, [_this8].concat(args));
        _this8._hideAnimationProcessing = false;
        (_this8$_actions = _this8._actions) === null || _this8$_actions === void 0 ? void 0 : _this8$_actions.onHidden();
        _this8._hidingDeferred.resolve();
      }, function () {
        _this8._$content.css('pointerEvents', 'none');
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        startHideAnimation.call.apply(startHideAnimation, [_this8].concat(args));
        _this8._hideAnimationProcessing = true;
      });
    },
    _hide: function _hide() {
      var _this9 = this;
      if (!this._currentVisible) {
        return new _deferred.Deferred().resolve().promise();
      }
      this._currentVisible = false;
      this._hidingDeferred = new _deferred.Deferred();
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
        var cancelHide = function cancelHide() {
          _this9._isHidingActionCanceled = true;
          _this9.option('visible', true);
          _this9._hidingDeferred.resolve();
        };
        var applyHide = function applyHide() {
          _this9._forceFocusLost();
          _this9._toggleShading(false);
          _this9._toggleSubscriptions(false);
          _this9._stopShowTimer();
          _this9._animateHiding();
        };
        this._processShowingHidingCancel(hidingArgs.cancel, applyHide, cancelHide);
      }
      return this._hidingDeferred.promise();
    },
    _forceFocusLost: function _forceFocusLost() {
      var activeElement = _dom_adapter.default.getActiveElement();
      var shouldResetActiveElement = !!this._$content.find(activeElement).length;
      if (shouldResetActiveElement) {
        (0, _dom.resetActiveElement)();
      }
    },
    _animate: function _animate(animation, completeCallback, startCallback) {
      if (animation) {
        startCallback = startCallback || animation.start || _common.noop;
        _fx.default.animate(this._$content, (0, _extend.extend)({}, animation, {
          start: startCallback,
          complete: completeCallback
        }));
      } else {
        completeCallback();
      }
    },
    _stopAnimation: function _stopAnimation() {
      _fx.default.stop(this._$content, true);
    },
    _renderVisibility: function _renderVisibility(visible) {
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
      var _this10 = this;
      this._proxiedTabTerminatorHandler = function () {
        _this10._tabKeyHandler.apply(_this10, arguments);
      };
    },
    _toggleTabTerminator: function _toggleTabTerminator(enabled) {
      var eventName = (0, _index.addNamespace)('keydown', this.NAME);
      if (enabled) {
        _events_engine.default.on(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
      } else {
        _events_engine.default.off(_dom_adapter.default.getDocument(), eventName, this._proxiedTabTerminatorHandler);
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
        if (!result.first && $elements.eq(i).is(_selectors.tabbable)) {
          result.first = $elements.eq(i);
        }
        if (!result.last && $elements.eq(elementsCount - i).is(_selectors.tabbable)) {
          result.last = $elements.eq(elementsCount - i);
        }
        if (result.first && result.last) {
          break;
        }
      }
      return result;
    },
    _tabKeyHandler: function _tabKeyHandler(e) {
      if ((0, _index.normalizeKeyName)(e) !== TAB_KEY || !this._isTopOverlay()) {
        return;
      }
      var tabbableElements = this._findTabbableBounds();
      var $firstTabbable = tabbableElements.first;
      var $lastTabbable = tabbableElements.last;
      var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
      var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
      var isEmptyTabList = tabbableElements.length === 0;
      var isOutsideTarget = !(0, _dom.contains)(this._$wrapper.get(0), e.target);
      if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
        e.preventDefault();
        var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
        _events_engine.default.trigger($focusElement, 'focusin');
        _events_engine.default.trigger($focusElement, 'focus');
      }
    },
    _toggleSubscriptions: function _toggleSubscriptions(enabled) {
      if ((0, _window.hasWindow)()) {
        this._toggleHideTopOverlayCallback(enabled);
        this._toggleHideOnParentsScrollSubscription(enabled);
      }
    },
    _toggleHideTopOverlayCallback: function _toggleHideTopOverlayCallback(subscribe) {
      if (!this._hideTopOverlayHandler) {
        return;
      }
      if (subscribe) {
        _hide_callback.hideCallback.add(this._hideTopOverlayHandler);
      } else {
        _hide_callback.hideCallback.remove(this._hideTopOverlayHandler);
      }
    },
    _toggleHideOnParentsScrollSubscription: function _toggleHideOnParentsScrollSubscription(needSubscribe) {
      var _this$_parentsScrollS;
      var scrollEvent = (0, _index.addNamespace)('scroll', this.NAME);
      var _ref = (_this$_parentsScrollS = this._parentsScrollSubscriptionInfo) !== null && _this$_parentsScrollS !== void 0 ? _this$_parentsScrollS : {},
          prevTargets = _ref.prevTargets,
          handler = _ref.handler;
      _events_engine.default.off(prevTargets, scrollEvent, handler);
      var closeOnScroll = this.option('hideOnParentScroll');
      if (needSubscribe && closeOnScroll) {
        var $parents = this._hideOnParentScrollTarget().parents();
        if (_devices.default.real().deviceType === 'desktop') {
          $parents = $parents.add(window);
        }
        _events_engine.default.on($parents, scrollEvent, handler);
        this._parentsScrollSubscriptionInfo.prevTargets = $parents;
      }
    },
    _hideOnParentsScrollHandler: function _hideOnParentsScrollHandler(e) {
      var closeHandled = false;
      var closeOnScroll = this.option('hideOnParentScroll');
      if ((0, _type.isFunction)(closeOnScroll)) {
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
        var $element = (0, _renderer.default)(this);
        if ($element.css('display') === 'none') {
          isHidden = true;
          return false;
        }
      });
      return isHidden || !_dom_adapter.default.getBody().contains($parent.get(0));
    },
    _renderContentImpl: function _renderContentImpl() {
      var _this11 = this;
      var whenContentRendered = new _deferred.Deferred();
      var contentTemplateOption = this.option('contentTemplate');
      var contentTemplate = this._getTemplate(contentTemplateOption);
      var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
      contentTemplate && contentTemplate.render({
        container: (0, _element.getPublicElement)(this.$content()),
        noModel: true,
        transclude: transclude,
        onRendered: function onRendered() {
          whenContentRendered.resolve();

          // NOTE: T1114344
          if (_this11.option('templatesRenderAsynchronously')) {
            _this11._dimensionChanged();
          }
        }
      });
      this._toggleWrapperScrollEventsSubscription(this.option('preventScrollEvents'));
      whenContentRendered.done(function () {
        if (_this11.option('visible')) {
          _this11._moveToContainer();
        }
      });
      return whenContentRendered.promise();
    },
    _getPositionControllerConfig: function _getPositionControllerConfig() {
      var _this$option3 = this.option(),
          container = _this$option3.container,
          visualContainer = _this$option3.visualContainer,
          _fixWrapperPosition = _this$option3._fixWrapperPosition,
          restorePosition = _this$option3.restorePosition;
      // NOTE: position is passed to controller in renderGeometry to prevent window field using in server side mode

      return {
        container: container,
        visualContainer: visualContainer,
        $root: this.$element(),
        $content: this._$content,
        $wrapper: this._$wrapper,
        onPositioned: this._actions.onPositioned,
        onVisualPositionChanged: this._actions.onVisualPositionChanged,
        restorePosition: restorePosition,
        _fixWrapperPosition: _fixWrapperPosition
      };
    },
    _initPositionController: function _initPositionController() {
      this._positionController = new _overlay_position_controller.OverlayPositionController(this._getPositionControllerConfig());
    },
    _toggleWrapperScrollEventsSubscription: function _toggleWrapperScrollEventsSubscription(enabled) {
      var eventName = (0, _index.addNamespace)(_drag.move, this.NAME);
      _events_engine.default.off(this._$wrapper, eventName);
      if (enabled) {
        _events_engine.default.on(this._$wrapper, eventName, {
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
          _clearSelection: _common.noop,
          isNative: true
        }, function (e) {
          var originalEvent = e.originalEvent.originalEvent;
          var _ref2 = originalEvent || {},
              type = _ref2.type;
          var isWheel = type === 'wheel';
          var isMouseMove = type === 'mousemove';
          var isScrollByWheel = isWheel && !(0, _index.isCommandKeyPressed)(e);
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
    _checkContainerExists: function _checkContainerExists() {
      var $wrapperContainer = this._positionController.$container;

      // NOTE: The container is undefined when DOM is not ready yet. See T1143527
      if ($wrapperContainer === undefined) {
        return;
      }
      var containerExists = $wrapperContainer.length > 0;
      if (!containerExists) {
        _ui.default.log('W1021', this.NAME);
      }
    },
    _moveToContainer: function _moveToContainer() {
      var $wrapperContainer = this._positionController.$container;
      this._$wrapper.appendTo($wrapperContainer);
      this._$content.appendTo(this._$wrapper);
    },
    _renderGeometry: function _renderGeometry(options) {
      var _this$option4 = this.option(),
          visible = _this$option4.visible;
      if (visible && (0, _window.hasWindow)()) {
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
    _renderPosition: function _renderPosition() {
      this._positionController.positionContent();
    },
    _isAllWindowCovered: function _isAllWindowCovered() {
      return (0, _type.isWindow)(this._positionController.$visualContainer.get(0)) && this.option('shading');
    },
    _toggleSafariScrolling: function _toggleSafariScrolling() {
      var visible = this.option('visible');
      var $body = (0, _renderer.default)(_dom_adapter.default.getBody());
      var isIosSafari = _devices.default.real().platform === 'ios' && _browser.default.safari;
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
      var documentElement = _dom_adapter.default.getDocumentElement();
      var isVisualContainerWindow = (0, _type.isWindow)($visualContainer.get(0));
      var wrapperWidth = isVisualContainerWindow ? documentElement.clientWidth : (0, _size.getOuterWidth)($visualContainer);
      var wrapperHeight = isVisualContainerWindow ? window.innerHeight : (0, _size.getOuterHeight)($visualContainer);
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
      var _this12 = this;
      this._keyboardListenerId = _short.keyboard.on(this._$content, null, function (opts) {
        return _this12._keyboardHandler(opts);
      });
    },
    _keyboardHandler: function _keyboardHandler(options) {
      var e = options.originalEvent;
      var $target = (0, _renderer.default)(e.target);
      if ($target.is(this._$content) || !this.option('ignoreChildEvents')) {
        this.callBase.apply(this, arguments);
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
    _stopShowTimer: function _stopShowTimer() {
      if (this._asyncShowTimeout) {
        clearTimeout(this._asyncShowTimeout);
      }
      this._asyncShowTimeout = null;
    },
    _dispose: function _dispose() {
      _fx.default.stop(this._$content, false);
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
      var _this13 = this;
      var value = args.value,
          name = args.name;
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
          this._renderVisibilityAnimate(value).done(function () {
            var _this13$_animateDefer;
            return (_this13$_animateDefer = _this13._animateDeferred) === null || _this13$_animateDefer === void 0 ? void 0 : _this13$_animateDefer.resolveWith(_this13);
          }).fail(function () {
            var _this13$_animateDefer2;
            return (_this13$_animateDefer2 = _this13._animateDeferred) === null || _this13$_animateDefer2 === void 0 ? void 0 : _this13$_animateDefer2.reject();
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
      var _this14 = this;
      showing = showing === undefined ? !this.option('visible') : showing;
      var result = new _deferred.Deferred();
      if (showing === this.option('visible')) {
        return result.resolveWith(this, [showing]).promise();
      }
      var animateDeferred = new _deferred.Deferred();
      this._animateDeferred = animateDeferred;
      this.option('visible', showing);
      animateDeferred.promise().done(function () {
        delete _this14._animateDeferred;
        result.resolveWith(_this14, [_this14.option('visible')]);
      }).fail(function () {
        delete _this14._animateDeferred;
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
      return (0, _element.getPublicElement)(this._$content);
    },
    repaint: function repaint() {
      if (this._contentAlreadyRendered) {
        this._positionController.restorePositionOnNextRender(true);
        this._renderGeometry({
          forceStopAnimation: true
        });
        (0, _visibility_change.triggerResizeEvent)(this._$content);
      } else {
        this.callBase();
      }
    }
  });

  /**
  * @name ui.dxOverlay
  * @section utils
  */
  Overlay.baseZIndex = function (zIndex) {
    return zIndexPool.base(zIndex);
  };
  (0, _component_registrator.default)('dxOverlay', Overlay);
  var _default = Overlay;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../animation/fx","../../core/component_registrator","../../core/devices","../../core/dom_adapter","../../core/element","../../core/renderer","../../core/templates/empty_template","../../core/utils/common","../../core/utils/deferred","../../core/utils/dom","../../core/utils/extend","../../core/utils/iterator","../../core/utils/ready_callbacks","../../core/utils/type","../../core/utils/view_port","../../core/utils/window","../../core/errors","../widget/ui.errors","../../events/core/events_engine","../../events/drag","../../events/pointer","../../events/short","../../events/utils/index","../../events/visibility_change","../../mobile/hide_callback","../widget/selectors","../widget/ui.widget","../../core/utils/browser","./z_index","./overlay_position_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../animation/fx"), require("../../core/component_registrator"), require("../../core/devices"), require("../../core/dom_adapter"), require("../../core/element"), require("../../core/renderer"), require("../../core/templates/empty_template"), require("../../core/utils/common"), require("../../core/utils/deferred"), require("../../core/utils/dom"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/utils/ready_callbacks"), require("../../core/utils/type"), require("../../core/utils/view_port"), require("../../core/utils/window"), require("../../core/errors"), require("../widget/ui.errors"), require("../../events/core/events_engine"), require("../../events/drag"), require("../../events/pointer"), require("../../events/short"), require("../../events/utils/index"), require("../../events/visibility_change"), require("../../mobile/hide_callback"), require("../widget/selectors"), require("../widget/ui.widget"), require("../../core/utils/browser"), require("./z_index"), require("./overlay_position_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.overlay.js.map