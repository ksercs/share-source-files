/**
* DevExtreme (cjs/ui/defer_rendering.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _transition_executor = require("../animation/transition_executor/transition_executor");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _deferred = require("../core/utils/deferred");
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _visibility_change = require("../events/visibility_change");
var _load_indicator = _interopRequireDefault(require("./load_indicator"));
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _position = require("../core/utils/position");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE deferRendering

var window = (0, _window.getWindow)();
var WIDGET_CLASS = 'dx-widget';
var DEFER_RENDERING_CLASS = 'dx-deferrendering';
var PENDING_RENDERING_CLASS = 'dx-pending-rendering';
var PENDING_RENDERING_MANUAL_CLASS = 'dx-pending-rendering-manual';
var PENDING_RENDERING_ACTIVE_CLASS = 'dx-pending-rendering-active';
var VISIBLE_WHILE_PENDING_RENDERING_CLASS = 'dx-visible-while-pending-rendering';
var INVISIBLE_WHILE_PENDING_RENDERING_CLASS = 'dx-invisible-while-pending-rendering';
var LOADINDICATOR_CONTAINER_CLASS = 'dx-loadindicator-container';
var DEFER_RENDERING_LOADINDICATOR_CONTAINER_CLASS = 'dx-deferrendering-loadindicator-container';
var DEFER_DEFER_RENDERING_LOAD_INDICATOR = 'dx-deferrendering-load-indicator';
var ANONYMOUS_TEMPLATE_NAME = 'content';
var ACTIONS = ['onRendered', 'onShown'];
var DeferRendering = _ui.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      showLoadIndicator: false,
      renderWhen: undefined,
      animation: undefined,
      staggerItemSelector: undefined,
      onRendered: null,
      onShown: null
    });
  },
  _getAnonymousTemplateName: function _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  },
  _init: function _init() {
    this.transitionExecutor = new _transition_executor.TransitionExecutor();
    this._initElement();
    this._initRender();
    this._$initialContent = this.$element().clone().contents();
    this._initActions();
    this.callBase();
  },
  _initElement: function _initElement() {
    this.$element().addClass(DEFER_RENDERING_CLASS);
  },
  _initRender: function _initRender() {
    var that = this;
    var $element = this.$element();
    var renderWhen = this.option('renderWhen');
    var doRender = function doRender() {
      return that._renderDeferredContent();
    };
    if ((0, _type.isPromise)(renderWhen)) {
      (0, _deferred.fromPromise)(renderWhen).done(doRender);
    } else {
      $element.data('dx-render-delegate', doRender);
      if (renderWhen === undefined) {
        $element.addClass(PENDING_RENDERING_MANUAL_CLASS);
      }
    }
  },
  _initActions: function _initActions() {
    var _this = this;
    this._actions = {};
    (0, _iterator.each)(ACTIONS, function (_, action) {
      _this._actions[action] = _this._createActionByOption(action) || _common.noop;
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    if (!this._initContent) {
      this._initContent = this._renderContent;
      this._renderContent = function () {};
    }
    this._initContent();
  },
  _renderContentImpl: function _renderContentImpl() {
    this.$element().removeClass(WIDGET_CLASS);
    this.$element().append(this._$initialContent);
    this._setLoadingState();
  },
  _renderDeferredContent: function _renderDeferredContent() {
    var that = this;
    var $element = this.$element();
    var result = new _deferred.Deferred();
    $element.removeClass(PENDING_RENDERING_MANUAL_CLASS);
    $element.addClass(PENDING_RENDERING_ACTIVE_CLASS);
    this._abortRenderTask();
    this._renderTask = (0, _common.executeAsync)(function () {
      that._renderImpl().done(function () {
        var shownArgs = {
          element: $element
        };
        that._actions.onShown([shownArgs]);
        result.resolve(shownArgs);
      }).fail(function () {
        result.rejectWith(result, arguments);
      });
    });
    return result.promise();
  },
  _isElementInViewport: function _isElementInViewport(element) {
    var rect = (0, _position.getBoundingRect)(element);
    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || _dom_adapter.default.getDocumentElement().clientHeight) && rect.left <= (window.innerWidth || _dom_adapter.default.getDocumentElement().clientWidth);
  },
  _animate: function _animate() {
    var that = this;
    var $element = this.$element();
    var animation = (0, _window.hasWindow)() && this.option('animation');
    var staggerItemSelector = this.option('staggerItemSelector');
    var animatePromise;
    that.transitionExecutor.stop();
    if (animation) {
      if (staggerItemSelector) {
        $element.find(staggerItemSelector).each(function () {
          if (that._isElementInViewport(this)) {
            that.transitionExecutor.enter((0, _renderer.default)(this), animation);
          }
        });
      } else {
        that.transitionExecutor.enter($element, animation);
      }
      animatePromise = that.transitionExecutor.start();
    } else {
      animatePromise = new _deferred.Deferred().resolve().promise();
    }
    return animatePromise;
  },
  _renderImpl: function _renderImpl() {
    var $element = this.$element();
    var renderedArgs = {
      element: $element
    };
    var contentTemplate = this._getTemplate(this._templateManager.anonymousTemplateName);
    if (contentTemplate) {
      contentTemplate.render({
        container: $element.empty(),
        noModel: true
      });
    }
    this._setRenderedState($element);
    _events_engine.default.trigger($element, 'dxcontentrendered');
    this._actions.onRendered([renderedArgs]);
    this._isRendered = true;
    return this._animate();
  },
  _setLoadingState: function _setLoadingState() {
    var $element = this.$element();
    var hasCustomLoadIndicator = !!$element.find('.' + VISIBLE_WHILE_PENDING_RENDERING_CLASS).length;
    $element.addClass(PENDING_RENDERING_CLASS);
    if (!hasCustomLoadIndicator) {
      $element.children().addClass(INVISIBLE_WHILE_PENDING_RENDERING_CLASS);
    }
    if (this.option('showLoadIndicator')) {
      this._showLoadIndicator($element);
    }
  },
  _showLoadIndicator: function _showLoadIndicator($container) {
    this._$loadIndicator = new _load_indicator.default((0, _renderer.default)('<div>'), {
      visible: true
    }).$element().addClass(DEFER_DEFER_RENDERING_LOAD_INDICATOR);
    (0, _renderer.default)('<div>').addClass(LOADINDICATOR_CONTAINER_CLASS).addClass(DEFER_RENDERING_LOADINDICATOR_CONTAINER_CLASS).append(this._$loadIndicator).appendTo($container);
  },
  _setRenderedState: function _setRenderedState() {
    var $element = this.$element();
    if (this._$loadIndicator) {
      this._$loadIndicator.remove();
    }
    $element.removeClass(PENDING_RENDERING_CLASS);
    $element.removeClass(PENDING_RENDERING_ACTIVE_CLASS);
    (0, _visibility_change.triggerShownEvent)($element.children());
  },
  _optionChanged: function _optionChanged(args) {
    var value = args.value;
    var previousValue = args.previousValue;
    switch (args.name) {
      case 'renderWhen':
        if (previousValue === false && value === true) {
          this._renderOrAnimate();
        } else if (previousValue === true && value === false) {
          this.transitionExecutor.stop();
          this._setLoadingState();
        }
        break;
      case 'showLoadIndicator':
      case 'onRendered':
      case 'onShown':
        break;
      default:
        this.callBase(args);
    }
  },
  _renderOrAnimate: function _renderOrAnimate() {
    var result;
    if (this._isRendered) {
      this._setRenderedState();
      result = this._animate();
    } else {
      result = this._renderDeferredContent();
    }
    return result;
  },
  renderContent: function renderContent() {
    return this._renderOrAnimate();
  },
  _abortRenderTask: function _abortRenderTask() {
    if (this._renderTask) {
      this._renderTask.abort();
      this._renderTask = undefined;
    }
  },
  _dispose: function _dispose() {
    this.transitionExecutor.stop(true);
    this._abortRenderTask();
    this._actions = undefined;
    this._$initialContent = undefined;
    this.callBase();
  }
});
(0, _component_registrator.default)('dxDeferRendering', DeferRendering);
var _default = DeferRendering;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
