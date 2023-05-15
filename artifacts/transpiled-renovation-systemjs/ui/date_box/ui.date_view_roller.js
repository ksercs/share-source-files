!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_view_roller.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/component_registrator","../../core/utils/extend","../../core/utils/iterator","../../events/utils/index","../../events/click","../scroll_view/ui.scrollable.old","../../core/devices","../../animation/fx","../../animation/translator","../../renovation/ui/scroll_view/utils/convert_location"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_view_roller.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "../../core/component_registrator", "../../core/utils/extend", "../../core/utils/iterator", "../../events/utils/index", "../../events/click", "../scroll_view/ui.scrollable.old", "../../core/devices", "../../animation/fx", "../../animation/translator", "../../renovation/ui/scroll_view/utils/convert_location"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _index = $__require("../../events/utils/index");
  var _click = $__require("../../events/click");
  var _uiScrollable = _interopRequireDefault($__require("../scroll_view/ui.scrollable.old"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _fx = _interopRequireDefault($__require("../../animation/fx"));
  var _translator = $__require("../../animation/translator");
  var _convert_location = $__require("../../renovation/ui/scroll_view/utils/convert_location");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DATEVIEW_ROLLER_CLASS = 'dx-dateviewroller';
  var DATEVIEW_ROLLER_ACTIVE_CLASS = 'dx-state-active';
  var DATEVIEW_ROLLER_CURRENT_CLASS = 'dx-dateviewroller-current';
  var DATEVIEW_ROLLER_ITEM_CLASS = 'dx-dateview-item';
  var DATEVIEW_ROLLER_ITEM_SELECTED_CLASS = 'dx-dateview-item-selected';
  var DATEVIEW_ROLLER_ITEM_SELECTED_FRAME_CLASS = 'dx-dateview-item-selected-frame';
  var DATEVIEW_ROLLER_ITEM_SELECTED_BORDER_CLASS = 'dx-dateview-item-selected-border';
  var DateViewRoller = /*#__PURE__*/function (_Scrollable) {
    _inheritsLoose(DateViewRoller, _Scrollable);
    function DateViewRoller() {
      return _Scrollable.apply(this, arguments) || this;
    }
    var _proto = DateViewRoller.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Scrollable.prototype._getDefaultOptions.call(this), {
        showScrollbar: 'never',
        useNative: false,
        selectedIndex: 0,
        bounceEnabled: false,
        items: [],
        showOnClick: false,
        onClick: null,
        onSelectedIndexChanged: null,
        scrollByContent: true
      });
    };
    _proto._init = function _init() {
      _Scrollable.prototype._init.call(this);
      this.option('onVisibilityChange', this._visibilityChangedHandler.bind(this));
      this.option('onEnd', this._endActionHandler.bind(this));
    };
    _proto._render = function _render() {
      _Scrollable.prototype._render.call(this);
      this._renderSelectedItemFrame();
      this.$element().addClass(DATEVIEW_ROLLER_CLASS);
      this._renderContainerClick();
      this._renderItems();
      this._renderSelectedValue();
      this._renderItemsClick();
      this._renderWheelEvent();
      this._renderSelectedIndexChanged();
    };
    _proto._renderSelectedIndexChanged = function _renderSelectedIndexChanged() {
      this._selectedIndexChanged = this._createActionByOption('onSelectedIndexChanged');
    };
    _proto._renderWheelEvent = function _renderWheelEvent() {
      var _this = this;
      _events_engine.default.on((0, _renderer.default)(this.container()), 'dxmousewheel', function (e) {
        _this._isWheelScrolled = true;
      });
    };
    _proto._renderContainerClick = function _renderContainerClick() {
      if (!this.option('showOnClick')) {
        return;
      }
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var clickAction = this._createActionByOption('onClick');
      _events_engine.default.off((0, _renderer.default)(this.container()), eventName);
      _events_engine.default.on((0, _renderer.default)(this.container()), eventName, function (e) {
        clickAction({
          event: e
        });
      });
    };
    _proto._renderItems = function _renderItems() {
      var items = this.option('items') || [];
      var $items = (0, _renderer.default)();
      (0, _renderer.default)(this.content()).empty();
      // NOTE: rendering ~166+30+12+24+60 <div>s >> 50mc
      items.forEach(function (item) {
        $items = $items.add((0, _renderer.default)('<div>').addClass(DATEVIEW_ROLLER_ITEM_CLASS).append(item));
      });
      (0, _renderer.default)(this.content()).append($items);
      this._$items = $items;
      this.update();
    };
    _proto._renderSelectedItemFrame = function _renderSelectedItemFrame() {
      (0, _renderer.default)('<div>').addClass(DATEVIEW_ROLLER_ITEM_SELECTED_FRAME_CLASS).append((0, _renderer.default)('<div>').addClass(DATEVIEW_ROLLER_ITEM_SELECTED_BORDER_CLASS)).appendTo((0, _renderer.default)(this.container()));
    };
    _proto._renderSelectedValue = function _renderSelectedValue(selectedIndex) {
      var index = this._fitIndex(selectedIndex !== null && selectedIndex !== void 0 ? selectedIndex : this.option('selectedIndex'));
      this._moveTo({
        top: this._getItemPosition(index)
      });
      this._renderActiveStateItem();
    };
    _proto._fitIndex = function _fitIndex(index) {
      var items = this.option('items') || [];
      var itemCount = items.length;
      if (index >= itemCount) {
        return itemCount - 1;
      }
      if (index < 0) {
        return 0;
      }
      return index;
    };
    _proto._getItemPosition = function _getItemPosition(index) {
      return Math.round(this._itemHeight() * index);
    };
    _proto._renderItemsClick = function _renderItemsClick() {
      var itemSelector = this._getItemSelector();
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      _events_engine.default.off(this.$element(), eventName, itemSelector);
      _events_engine.default.on(this.$element(), eventName, itemSelector, this._itemClickHandler.bind(this));
    };
    _proto._getItemSelector = function _getItemSelector() {
      return '.' + DATEVIEW_ROLLER_ITEM_CLASS;
    };
    _proto._itemClickHandler = function _itemClickHandler(e) {
      this.option('selectedIndex', this._itemElementIndex(e.currentTarget));
    };
    _proto._itemElementIndex = function _itemElementIndex(itemElement) {
      return this._itemElements().index(itemElement);
    };
    _proto._itemElements = function _itemElements() {
      return this.$element().find(this._getItemSelector());
    };
    _proto._renderActiveStateItem = function _renderActiveStateItem() {
      var selectedIndex = this.option('selectedIndex');
      (0, _iterator.each)(this._$items, function (index) {
        (0, _renderer.default)(this).toggleClass(DATEVIEW_ROLLER_ITEM_SELECTED_CLASS, selectedIndex === index);
      });
    };
    _proto._shouldScrollToNeighborItem = function _shouldScrollToNeighborItem() {
      return _devices.default.real().deviceType === 'desktop' && this._isWheelScrolled;
    };
    _proto._moveTo = function _moveTo(targetLocation) {
      var _convertToLocation = (0, _convert_location.convertToLocation)(targetLocation),
          top = _convertToLocation.top,
          left = _convertToLocation.left;
      var location = this.scrollOffset();
      var delta = {
        x: location.left - left,
        y: location.top - top
      };
      if (this._isVisible() && (delta.x || delta.y)) {
        this._prepareDirections(true);
        if (this._animation && !this._shouldScrollToNeighborItem()) {
          var that = this;
          _fx.default.stop((0, _renderer.default)(this.content()));
          _fx.default.animate((0, _renderer.default)(this.content()), {
            duration: 200,
            type: 'slide',
            to: {
              top: Math.floor(delta.y)
            },
            complete: function complete() {
              (0, _translator.resetPosition)((0, _renderer.default)(that.content()));
              that.handleMove({
                delta: delta
              });
            }
          });
          delete this._animation;
        } else {
          this.handleMove({
            delta: delta
          });
        }
      }
    };
    _proto._validate = function _validate(e) {
      return this._moveIsAllowed(e);
    };
    _proto._fitSelectedIndexInRange = function _fitSelectedIndexInRange(index) {
      var itemsCount = this.option('items').length;
      return Math.max(Math.min(index, itemsCount - 1), 0);
    };
    _proto._isInNullNeighborhood = function _isInNullNeighborhood(x) {
      var EPS = 0.1;
      return -EPS <= x && x <= EPS;
    };
    _proto._getSelectedIndexAfterScroll = function _getSelectedIndexAfterScroll(currentSelectedIndex) {
      var locationTop = this.scrollOffset().top;
      var currentSelectedIndexPosition = currentSelectedIndex * this._itemHeight();
      var dy = locationTop - currentSelectedIndexPosition;
      if (this._isInNullNeighborhood(dy)) {
        return currentSelectedIndex;
      }
      var direction = dy > 0 ? 1 : -1;
      var newSelectedIndex = this._fitSelectedIndexInRange(currentSelectedIndex + direction);
      return newSelectedIndex;
    };
    _proto._getNewSelectedIndex = function _getNewSelectedIndex(currentSelectedIndex) {
      if (this._shouldScrollToNeighborItem()) {
        return this._getSelectedIndexAfterScroll(currentSelectedIndex);
      }
      this._animation = true;
      var ratio = this.scrollOffset().top / this._itemHeight();
      return Math.round(ratio);
    };
    _proto._endActionHandler = function _endActionHandler() {
      var currentSelectedIndex = this.option('selectedIndex');
      var newSelectedIndex = this._getNewSelectedIndex(currentSelectedIndex);
      if (newSelectedIndex === currentSelectedIndex) {
        this._renderSelectedValue(newSelectedIndex);
      } else {
        this.option('selectedIndex', newSelectedIndex);
      }
      this._isWheelScrolled = false;
    };
    _proto._itemHeight = function _itemHeight() {
      var $item = this._$items.first();
      return (0, _size.getHeight)($item);
    };
    _proto._toggleActive = function _toggleActive(state) {
      this.$element().toggleClass(DATEVIEW_ROLLER_ACTIVE_CLASS, state);
    };
    _proto._isVisible = function _isVisible() {
      return (0, _renderer.default)(this.container()).is(':visible');
    };
    _proto._fireSelectedIndexChanged = function _fireSelectedIndexChanged(value, previousValue) {
      this._selectedIndexChanged({
        value: value,
        previousValue: previousValue,
        event: undefined
      });
    };
    _proto._visibilityChanged = function _visibilityChanged(visible) {
      _Scrollable.prototype._visibilityChanged.call(this, visible);
      this._visibilityChangedHandler(visible);
    };
    _proto._visibilityChangedHandler = function _visibilityChangedHandler(visible) {
      var _this2 = this;
      if (visible) {
        // uses for purposes of renovated scrollable widget
        this._visibilityTimer = setTimeout(function () {
          _this2._renderSelectedValue(_this2.option('selectedIndex'));
        });
      }
      this.toggleActiveState(false);
    };
    _proto.toggleActiveState = function toggleActiveState(state) {
      this.$element().toggleClass(DATEVIEW_ROLLER_CURRENT_CLASS, state);
    };
    _proto._refreshSelectedIndex = function _refreshSelectedIndex() {
      var selectedIndex = this.option('selectedIndex');
      var fitIndex = this._fitIndex(selectedIndex);
      if (fitIndex === selectedIndex) {
        this._renderActiveStateItem();
      } else {
        this.option('selectedIndex', fitIndex);
      }
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'selectedIndex':
          this._fireSelectedIndexChanged(args.value, args.previousValue);
          this._renderSelectedValue(args.value);
          break;
        case 'items':
          this._renderItems();
          this._refreshSelectedIndex();
          break;
        case 'onClick':
        case 'showOnClick':
          this._renderContainerClick();
          break;
        case 'onSelectedIndexChanged':
          this._renderSelectedIndexChanged();
          break;
        default:
          _Scrollable.prototype._optionChanged.call(this, args);
      }
    };
    _proto._dispose = function _dispose() {
      clearTimeout(this._visibilityTimer);
      _Scrollable.prototype._dispose.call(this);
    };
    return DateViewRoller;
  }(_uiScrollable.default);
  (0, _component_registrator.default)('dxDateViewRoller', DateViewRoller);
  var _default = DateViewRoller;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/component_registrator","../../core/utils/extend","../../core/utils/iterator","../../events/utils/index","../../events/click","../scroll_view/ui.scrollable.old","../../core/devices","../../animation/fx","../../animation/translator","../../renovation/ui/scroll_view/utils/convert_location"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/component_registrator"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../events/utils/index"), require("../../events/click"), require("../scroll_view/ui.scrollable.old"), require("../../core/devices"), require("../../animation/fx"), require("../../animation/translator"), require("../../renovation/ui/scroll_view/utils/convert_location"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_view_roller.js.map