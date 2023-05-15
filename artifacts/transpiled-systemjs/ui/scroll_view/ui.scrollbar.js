!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scroll_view/ui.scrollbar.js"], ["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/ready_callbacks","../../animation/translator","../widget/ui.widget","../../events/utils/index","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../events/pointer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scroll_view/ui.scrollbar.js", ["../../core/renderer", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/utils/ready_callbacks", "../../animation/translator", "../widget/ui.widget", "../../events/utils/index", "../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "../../events/pointer"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _translator = $__require("../../animation/translator");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _index = $__require("../../events/utils/index");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SCROLLBAR = 'dxScrollbar';
  var SCROLLABLE_SCROLLBAR_CLASS = 'dx-scrollable-scrollbar';
  var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = "".concat(SCROLLABLE_SCROLLBAR_CLASS, "-active");
  var SCROLLABLE_SCROLL_CLASS = 'dx-scrollable-scroll';
  var SCROLLABLE_SCROLL_CONTENT_CLASS = 'dx-scrollable-scroll-content';
  var HOVER_ENABLED_STATE = 'dx-scrollbar-hoverable';
  var HORIZONTAL = 'horizontal';
  var THUMB_MIN_SIZE = 15;
  var SCROLLBAR_VISIBLE = {
    onScroll: 'onScroll',
    onHover: 'onHover',
    always: 'always',
    never: 'never'
  };
  var activeScrollbar = null;
  var Scrollbar = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        direction: null,
        visible: false,
        activeStateEnabled: false,
        visibilityMode: SCROLLBAR_VISIBLE.onScroll,
        containerSize: 0,
        contentSize: 0,
        expandable: true,
        scaleRatio: 1
      });
    },
    _init: function _init() {
      this.callBase();
      this._isHovered = false;
    },
    _initMarkup: function _initMarkup() {
      this._renderThumb();
      this.callBase();
    },
    _render: function _render() {
      this.callBase();
      this._renderDirection();
      this._update();
      this._attachPointerDownHandler();
      this.option('hoverStateEnabled', this._isHoverMode());
      this.$element().toggleClass(HOVER_ENABLED_STATE, this.option('hoverStateEnabled'));
    },
    _renderThumb: function _renderThumb() {
      this._$thumb = (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CLASS);
      (0, _renderer.default)('<div>').addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
      this.$element().addClass(SCROLLABLE_SCROLLBAR_CLASS).append(this._$thumb);
    },
    isThumb: function isThumb($element) {
      return !!this.$element().find($element).length;
    },
    _isHoverMode: function _isHoverMode() {
      var visibilityMode = this.option('visibilityMode');
      return (visibilityMode === SCROLLBAR_VISIBLE.onHover || visibilityMode === SCROLLBAR_VISIBLE.always) && this.option('expandable');
    },
    _renderDirection: function _renderDirection() {
      var direction = this.option('direction');
      this.$element().addClass('dx-scrollbar-' + direction);
      this._dimension = direction === HORIZONTAL ? 'width' : 'height';
      this._prop = direction === HORIZONTAL ? 'left' : 'top';
    },
    _attachPointerDownHandler: function _attachPointerDownHandler() {
      _events_engine.default.on(this._$thumb, (0, _index.addNamespace)(_pointer.default.down, SCROLLBAR), this.feedbackOn.bind(this));
    },
    feedbackOn: function feedbackOn() {
      this.$element().addClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
      activeScrollbar = this;
    },
    feedbackOff: function feedbackOff() {
      this.$element().removeClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
      activeScrollbar = null;
    },
    cursorEnter: function cursorEnter() {
      this._isHovered = true;
      if (this._needScrollbar()) {
        this.option('visible', true);
      }
    },
    cursorLeave: function cursorLeave() {
      this._isHovered = false;
      this.option('visible', false);
    },
    _renderDimensions: function _renderDimensions() {
      this._$thumb.css({
        width: this.option('width'),
        height: this.option('height')
      });
    },
    _toggleVisibility: function _toggleVisibility(visible) {
      if (this.option('visibilityMode') === SCROLLBAR_VISIBLE.onScroll) {
        // NOTE: need to relayout thumb and show it instantly
        this._$thumb.css('opacity');
      }
      visible = this._adjustVisibility(visible);
      this.option().visible = visible;
      this._$thumb.toggleClass('dx-state-invisible', !visible);
    },
    _adjustVisibility: function _adjustVisibility(visible) {
      if (this._baseContainerToContentRatio && !this._needScrollbar()) {
        return false;
      }
      switch (this.option('visibilityMode')) {
        case SCROLLBAR_VISIBLE.onScroll:
          break;
        case SCROLLBAR_VISIBLE.onHover:
          visible = visible || !!this._isHovered;
          break;
        case SCROLLBAR_VISIBLE.never:
          visible = false;
          break;
        case SCROLLBAR_VISIBLE.always:
          visible = true;
          break;
      }
      return visible;
    },
    moveTo: function moveTo(location) {
      if (this._isHidden()) {
        return;
      }
      if ((0, _type.isPlainObject)(location)) {
        location = location[this._prop] || 0;
      }
      var scrollBarLocation = {};
      scrollBarLocation[this._prop] = this._calculateScrollBarPosition(location);
      (0, _translator.move)(this._$thumb, scrollBarLocation);
    },
    _calculateScrollBarPosition: function _calculateScrollBarPosition(location) {
      return -location * this._thumbRatio;
    },
    _update: function _update() {
      var containerSize = Math.round(this.option('containerSize'));
      var contentSize = Math.round(this.option('contentSize'));
      var baseContainerSize = Math.round(this.option('baseContainerSize'));
      var baseContentSize = Math.round(this.option('baseContentSize'));

      // NOTE: if current scrollbar's using outside of scrollable
      if (isNaN(baseContainerSize)) {
        baseContainerSize = containerSize;
        baseContentSize = contentSize;
      }
      this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
      this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
      var thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), THUMB_MIN_SIZE));
      this._thumbRatio = (containerSize - thumbSize) / (this.option('scaleRatio') * (contentSize - containerSize));
      this.option(this._dimension, thumbSize / this.option('scaleRatio'));
      this.$element().css('display', this._needScrollbar() ? '' : 'none');
    },
    _isHidden: function _isHidden() {
      return this.option('visibilityMode') === SCROLLBAR_VISIBLE.never;
    },
    _needScrollbar: function _needScrollbar() {
      return !this._isHidden() && this._baseContainerToContentRatio < 1;
    },
    containerToContentRatio: function containerToContentRatio() {
      return this._realContainerToContentRatio;
    },
    _normalizeSize: function _normalizeSize(size) {
      return (0, _type.isPlainObject)(size) ? size[this._dimension] || 0 : size;
    },
    _clean: function _clean() {
      this.callBase();
      if (this === activeScrollbar) {
        activeScrollbar = null;
      }
      _events_engine.default.off(this._$thumb, '.' + SCROLLBAR);
    },
    _optionChanged: function _optionChanged(args) {
      if (this._isHidden()) {
        return;
      }
      switch (args.name) {
        case 'containerSize':
        case 'contentSize':
          this.option()[args.name] = this._normalizeSize(args.value);
          this._update();
          break;
        case 'baseContentSize':
        case 'baseContainerSize':
          this._update();
          break;
        case 'visibilityMode':
        case 'direction':
          this._invalidate();
          break;
        case 'scaleRatio':
          this._update();
          break;
        default:
          this.callBase.apply(this, arguments);
      }
    },
    update: (0, _common.deferRenderer)(function () {
      this._adjustVisibility() && this.option('visible', true);
    })
  });
  _ready_callbacks.default.add(function () {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.up, SCROLLBAR), function () {
      if (activeScrollbar) {
        activeScrollbar.feedbackOff();
      }
    });
  });
  var _default = Scrollbar;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/ready_callbacks","../../animation/translator","../widget/ui.widget","../../events/utils/index","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../events/pointer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/utils/ready_callbacks"), require("../../animation/translator"), require("../widget/ui.widget"), require("../../events/utils/index"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../events/pointer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scrollbar.js.map