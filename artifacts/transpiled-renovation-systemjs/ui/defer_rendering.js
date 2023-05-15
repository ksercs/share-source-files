!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/defer_rendering.js"], ["../animation/transition_executor/transition_executor","../core/component_registrator","../core/dom_adapter","../core/renderer","../core/utils/common","../core/utils/deferred","../core/utils/extend","../core/utils/iterator","../core/utils/type","../core/utils/window","../events/core/events_engine","../events/visibility_change","./load_indicator","./widget/ui.widget","../core/utils/position"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/defer_rendering.js", ["../animation/transition_executor/transition_executor", "../core/component_registrator", "../core/dom_adapter", "../core/renderer", "../core/utils/common", "../core/utils/deferred", "../core/utils/extend", "../core/utils/iterator", "../core/utils/type", "../core/utils/window", "../events/core/events_engine", "../events/visibility_change", "./load_indicator", "./widget/ui.widget", "../core/utils/position"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _transition_executor = $__require("../animation/transition_executor/transition_executor");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _common = $__require("../core/utils/common");
  var _deferred = $__require("../core/utils/deferred");
  var _extend = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _type = $__require("../core/utils/type");
  var _window = $__require("../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _visibility_change = $__require("../events/visibility_change");
  var _load_indicator = _interopRequireDefault($__require("./load_indicator"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _position = $__require("../core/utils/position");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../animation/transition_executor/transition_executor","../core/component_registrator","../core/dom_adapter","../core/renderer","../core/utils/common","../core/utils/deferred","../core/utils/extend","../core/utils/iterator","../core/utils/type","../core/utils/window","../events/core/events_engine","../events/visibility_change","./load_indicator","./widget/ui.widget","../core/utils/position"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../animation/transition_executor/transition_executor"), require("../core/component_registrator"), require("../core/dom_adapter"), require("../core/renderer"), require("../core/utils/common"), require("../core/utils/deferred"), require("../core/utils/extend"), require("../core/utils/iterator"), require("../core/utils/type"), require("../core/utils/window"), require("../events/core/events_engine"), require("../events/visibility_change"), require("./load_indicator"), require("./widget/ui.widget"), require("../core/utils/position"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=defer_rendering.js.map