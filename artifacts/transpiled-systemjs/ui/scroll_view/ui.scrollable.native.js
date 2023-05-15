!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scroll_view/ui.scrollable.native.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../events/utils/index","../../core/utils/common","../../core/utils/iterator","../../core/devices","../../core/class","./ui.scrollbar"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scroll_view/ui.scrollable.native.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "../../events/utils/index", "../../core/utils/common", "../../core/utils/iterator", "../../core/devices", "../../core/class", "./ui.scrollbar"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _common = $__require("../../core/utils/common");
  var _iterator = $__require("../../core/utils/iterator");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _ui = _interopRequireDefault($__require("./ui.scrollbar"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SCROLLABLE_NATIVE = 'dxNativeScrollable';
  var SCROLLABLE_NATIVE_CLASS = 'dx-scrollable-native';
  var SCROLLABLE_SCROLLBAR_SIMULATED = 'dx-scrollable-scrollbar-simulated';
  var SCROLLABLE_SCROLLBARS_HIDDEN = 'dx-scrollable-scrollbars-hidden';
  var VERTICAL = 'vertical';
  var HORIZONTAL = 'horizontal';
  var HIDE_SCROLLBAR_TIMEOUT = 500;
  var NativeStrategy = _class.default.inherit({
    ctor: function ctor(scrollable) {
      this._init(scrollable);
    },
    _init: function _init(scrollable) {
      this._component = scrollable;
      this._$element = scrollable.$element();
      this._$container = (0, _renderer.default)(scrollable.container());
      this._$content = scrollable.$content();
      this._direction = scrollable.option('direction');
      this._useSimulatedScrollbar = scrollable.option('useSimulatedScrollbar');
      this.option = scrollable.option.bind(scrollable);
      this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
      this._isLocked = scrollable._isLocked.bind(scrollable);
      this._isDirection = scrollable._isDirection.bind(scrollable);
      this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
      this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
      this._isRtlNativeStrategy = scrollable._isRtlNativeStrategy.bind(scrollable);
    },
    render: function render() {
      var device = _devices.default.real();
      var deviceType = device.platform;
      this._$element.addClass(SCROLLABLE_NATIVE_CLASS).addClass(SCROLLABLE_NATIVE_CLASS + '-' + deviceType).toggleClass(SCROLLABLE_SCROLLBARS_HIDDEN, !this._isScrollbarVisible());
      if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
        this._renderScrollbars();
      }
    },
    updateRtlPosition: function updateRtlPosition(isFirstRender) {
      if (isFirstRender && this.option('rtlEnabled')) {
        if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
          this._moveScrollbars();
        }
      }
    },
    _renderScrollbars: function _renderScrollbars() {
      this._scrollbars = {};
      this._hideScrollbarTimeout = 0;
      this._$element.addClass(SCROLLABLE_SCROLLBAR_SIMULATED);
      this._renderScrollbar(VERTICAL);
      this._renderScrollbar(HORIZONTAL);
    },
    _renderScrollbar: function _renderScrollbar(direction) {
      if (!this._isDirection(direction)) {
        return;
      }
      this._scrollbars[direction] = new _ui.default((0, _renderer.default)('<div>').appendTo(this._$element), {
        direction: direction,
        expandable: this._component.option('scrollByThumb')
      });
    },
    handleInit: _common.noop,
    handleStart: _common.noop,
    handleMove: function handleMove(e) {
      if (this._isLocked()) {
        e.cancel = true;
        return;
      }
      if (this._allowedDirection()) {
        e.originalEvent.isScrollingEvent = true;
      }
    },
    handleEnd: _common.noop,
    handleCancel: _common.noop,
    handleStop: _common.noop,
    _eachScrollbar: function _eachScrollbar(callback) {
      callback = callback.bind(this);
      (0, _iterator.each)(this._scrollbars || {}, function (direction, scrollbar) {
        callback(scrollbar, direction);
      });
    },
    createActions: function createActions() {
      this._scrollAction = this._createActionByOption('onScroll');
      this._updateAction = this._createActionByOption('onUpdated');
    },
    _createActionArgs: function _createActionArgs() {
      var _this$location = this.location(),
          left = _this$location.left,
          top = _this$location.top;
      return {
        event: this._eventForUserAction,
        scrollOffset: this._getScrollOffset(),
        reachedLeft: this._isRtlNativeStrategy() ? this._isReachedRight(-left) : this._isReachedLeft(left),
        reachedRight: this._isRtlNativeStrategy() ? this._isReachedLeft(-Math.abs(left)) : this._isReachedRight(left),
        reachedTop: this._isDirection(VERTICAL) ? Math.round(top) >= 0 : undefined,
        reachedBottom: this._isDirection(VERTICAL) ? Math.round(Math.abs(top) - this._getMaxOffset().top) >= 0 : undefined
      };
    },
    _getScrollOffset: function _getScrollOffset() {
      var _this$location2 = this.location(),
          top = _this$location2.top,
          left = _this$location2.left;
      return {
        top: -top,
        left: this._normalizeOffsetLeft(-left)
      };
    },
    _normalizeOffsetLeft: function _normalizeOffsetLeft(scrollLeft) {
      if (this._isRtlNativeStrategy()) {
        return this._getMaxOffset().left + scrollLeft;
      }
      return scrollLeft;
    },
    _isReachedLeft: function _isReachedLeft(left) {
      return this._isDirection(HORIZONTAL) ? Math.round(left) >= 0 : undefined;
    },
    _isReachedRight: function _isReachedRight(left) {
      return this._isDirection(HORIZONTAL) ? Math.round(Math.abs(left) - this._getMaxOffset().left) >= 0 : undefined;
    },
    _isScrollbarVisible: function _isScrollbarVisible() {
      var _this$option = this.option(),
          showScrollbar = _this$option.showScrollbar;
      return showScrollbar !== 'never' && showScrollbar !== false;
    },
    handleScroll: function handleScroll(e) {
      this._eventForUserAction = e;
      this._moveScrollbars();
      this._scrollAction(this._createActionArgs());
    },
    _moveScrollbars: function _moveScrollbars() {
      var _this$_getScrollOffse = this._getScrollOffset(),
          top = _this$_getScrollOffse.top,
          left = _this$_getScrollOffse.left;
      this._eachScrollbar(function (scrollbar) {
        scrollbar.moveTo({
          top: -top,
          left: -left
        });
        scrollbar.option('visible', true);
      });
      this._hideScrollbars();
    },
    _hideScrollbars: function _hideScrollbars() {
      clearTimeout(this._hideScrollbarTimeout);
      this._hideScrollbarTimeout = setTimeout(function () {
        this._eachScrollbar(function (scrollbar) {
          scrollbar.option('visible', false);
        });
      }.bind(this), HIDE_SCROLLBAR_TIMEOUT);
    },
    location: function location() {
      return {
        left: -this._$container.scrollLeft(),
        top: -this._$container.scrollTop()
      };
    },
    disabledChanged: _common.noop,
    update: function update() {
      this._update();
      this._updateAction(this._createActionArgs());
    },
    _update: function _update() {
      this._updateDimensions();
      this._updateScrollbars();
    },
    _updateDimensions: function _updateDimensions() {
      this._containerSize = {
        height: (0, _size.getHeight)(this._$container),
        width: (0, _size.getWidth)(this._$container)
      };
      this._componentContentSize = {
        height: (0, _size.getHeight)(this._component.$content()),
        width: (0, _size.getWidth)(this._component.$content())
      };
      this._contentSize = {
        height: (0, _size.getHeight)(this._$content),
        width: (0, _size.getWidth)(this._$content)
      };
    },
    _updateScrollbars: function _updateScrollbars() {
      this._eachScrollbar(function (scrollbar, direction) {
        var dimension = direction === VERTICAL ? 'height' : 'width';
        scrollbar.option({
          containerSize: this._containerSize[dimension],
          contentSize: this._componentContentSize[dimension]
        });
        scrollbar.update();
      });
    },
    _allowedDirections: function _allowedDirections() {
      return {
        vertical: this._isDirection(VERTICAL) && this._contentSize.height > this._containerSize.height,
        horizontal: this._isDirection(HORIZONTAL) && this._contentSize.width > this._containerSize.width
      };
    },
    dispose: function dispose() {
      var className = this._$element.get(0).className;
      var scrollableNativeRegexp = new RegExp(SCROLLABLE_NATIVE_CLASS + '\\S*', 'g');
      if (scrollableNativeRegexp.test(className)) {
        this._$element.removeClass(className.match(scrollableNativeRegexp).join(' '));
      }
      _events_engine.default.off(this._$element, '.' + SCROLLABLE_NATIVE);
      _events_engine.default.off(this._$container, '.' + SCROLLABLE_NATIVE);
      this._removeScrollbars();
      clearTimeout(this._hideScrollbarTimeout);
    },
    _removeScrollbars: function _removeScrollbars() {
      this._eachScrollbar(function (scrollbar) {
        scrollbar.$element().remove();
      });
    },
    scrollBy: function scrollBy(distance) {
      var location = this.location();
      this._$container.scrollTop(Math.round(-location.top - distance.top));
      this._$container.scrollLeft(Math.round(-location.left - distance.left));
    },
    validate: function validate(e) {
      if (this.option('disabled')) {
        return false;
      }
      if ((0, _index.isDxMouseWheelEvent)(e) && this._isScrolledInMaxDirection(e)) {
        return false;
      }
      return !!this._allowedDirection();
    },
    // TODO: rtl
    // TODO: horizontal scroll when shift is pressed
    _isScrolledInMaxDirection: function _isScrolledInMaxDirection(e) {
      var container = this._$container.get(0);
      var result;
      if (e.delta > 0) {
        result = e.shiftKey ? !container.scrollLeft : !container.scrollTop;
      } else {
        if (e.shiftKey) {
          result = container.scrollLeft >= this._getMaxOffset().left;
        } else {
          result = container.scrollTop >= this._getMaxOffset().top;
        }
      }
      return result;
    },
    getDirection: function getDirection() {
      return this._allowedDirection();
    }
  });
  var _default = NativeStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../events/utils/index","../../core/utils/common","../../core/utils/iterator","../../core/devices","../../core/class","./ui.scrollbar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../core/utils/common"), require("../../core/utils/iterator"), require("../../core/devices"), require("../../core/class"), require("./ui.scrollbar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scrollable.native.js.map