!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/box.js"], ["../core/renderer","../core/component_registrator","../core/utils/extend","../core/utils/window","../core/utils/inflector","../core/utils/type","../core/utils/style","../core/utils/iterator","./collection/item","./collection/ui.collection_widget.edit"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/box.js", ["../core/renderer", "../core/component_registrator", "../core/utils/extend", "../core/utils/window", "../core/utils/inflector", "../core/utils/type", "../core/utils/style", "../core/utils/iterator", "./collection/item", "./collection/ui.collection_widget.edit"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _window = $__require("../core/utils/window");
  var _inflector = $__require("../core/utils/inflector");
  var _type = $__require("../core/utils/type");
  var _style = $__require("../core/utils/style");
  var _iterator = $__require("../core/utils/iterator");
  var _item = _interopRequireDefault($__require("./collection/item"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
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
  // STYLE box

  var BOX_CLASS = 'dx-box';
  var BOX_FLEX_CLASS = 'dx-box-flex';
  var BOX_ITEM_CLASS = 'dx-box-item';
  var BOX_ITEM_DATA_KEY = 'dxBoxItemData';
  var SHRINK = 1;
  var MINSIZE_MAP = {
    'row': 'minWidth',
    'col': 'minHeight'
  };
  var MAXSIZE_MAP = {
    'row': 'maxWidth',
    'col': 'maxHeight'
  };
  var FLEX_JUSTIFY_CONTENT_MAP = {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around'
  };
  var FLEX_ALIGN_ITEMS_MAP = {
    'start': 'flex-start',
    'end': 'flex-end',
    'center': 'center',
    'stretch': 'stretch'
  };
  var FLEX_DIRECTION_MAP = {
    'row': 'row',
    'col': 'column'
  };
  var setFlexProp = function setFlexProp(element, prop, value) {
    // NOTE: workaround for jQuery version < 1.11.1 (T181692)
    value = (0, _style.normalizeStyleProp)(prop, value);
    element.style[(0, _style.styleProp)(prop)] = value;

    // NOTE: workaround for Domino issue https://github.com/fgnass/domino/issues/119
    if (!(0, _window.hasWindow)()) {
      if (value === '' || !(0, _type.isDefined)(value)) {
        return;
      }
      var cssName = (0, _inflector.dasherize)(prop);
      var styleExpr = cssName + ': ' + value + ';';
      if (!element.attributes.style) {
        element.setAttribute('style', styleExpr);
      } else if (element.attributes.style.value.indexOf(styleExpr) < 0) {
        element.attributes.style.value += ' ' + styleExpr;
      }
    }
  };
  var BoxItem = /*#__PURE__*/function (_CollectionWidgetItem) {
    _inheritsLoose(BoxItem, _CollectionWidgetItem);
    function BoxItem() {
      return _CollectionWidgetItem.apply(this, arguments) || this;
    }
    var _proto = BoxItem.prototype;
    _proto._renderVisible = function _renderVisible(value, oldValue) {
      _CollectionWidgetItem.prototype._renderVisible.call(this, value);
      if ((0, _type.isDefined)(oldValue)) {
        this._options.fireItemStateChangedAction({
          name: 'visible',
          state: value,
          oldState: oldValue
        });
      }
    };
    return BoxItem;
  }(_item.default);
  var LayoutStrategy = /*#__PURE__*/function () {
    function LayoutStrategy($element, option) {
      this._$element = $element;
      this._option = option;
    }
    var _proto2 = LayoutStrategy.prototype;
    _proto2.renderBox = function renderBox() {
      this._$element.css({
        display: (0, _style.stylePropPrefix)('flexDirection') + 'flex'
      });
      setFlexProp(this._$element.get(0), 'flexDirection', FLEX_DIRECTION_MAP[this._option('direction')]);
    };
    _proto2.renderAlign = function renderAlign() {
      this._$element.css({
        justifyContent: this._normalizedAlign()
      });
    };
    _proto2._normalizedAlign = function _normalizedAlign() {
      var align = this._option('align');
      return align in FLEX_JUSTIFY_CONTENT_MAP ? FLEX_JUSTIFY_CONTENT_MAP[align] : align;
    };
    _proto2.renderCrossAlign = function renderCrossAlign() {
      this._$element.css({
        alignItems: this._normalizedCrossAlign()
      });
    };
    _proto2._normalizedCrossAlign = function _normalizedCrossAlign() {
      var crossAlign = this._option('crossAlign');
      return crossAlign in FLEX_ALIGN_ITEMS_MAP ? FLEX_ALIGN_ITEMS_MAP[crossAlign] : crossAlign;
    };
    _proto2.renderItems = function renderItems($items) {
      var flexPropPrefix = (0, _style.stylePropPrefix)('flexDirection');
      var direction = this._option('direction');
      (0, _iterator.each)($items, function () {
        var $item = (0, _renderer.default)(this);
        var item = $item.data(BOX_ITEM_DATA_KEY);
        $item.css({
          display: flexPropPrefix + 'flex'
        }).css(MAXSIZE_MAP[direction], item.maxSize || 'none').css(MINSIZE_MAP[direction], item.minSize || '0');
        setFlexProp($item.get(0), 'flexBasis', item.baseSize || 0);
        setFlexProp($item.get(0), 'flexGrow', item.ratio);
        setFlexProp($item.get(0), 'flexShrink', (0, _type.isDefined)(item.shrink) ? item.shrink : SHRINK);
        $item.children().each(function (_, itemContent) {
          (0, _renderer.default)(itemContent).css({
            width: 'auto',
            height: 'auto',
            display: (0, _style.stylePropPrefix)('flexDirection') + 'flex',
            flexBasis: 0
          });
          setFlexProp(itemContent, 'flexGrow', 1);
          setFlexProp(itemContent, 'flexDirection', (0, _renderer.default)(itemContent)[0].style.flexDirection || 'column');
        });
      });
    };
    return LayoutStrategy;
  }();
  var Box = /*#__PURE__*/function (_CollectionWidget) {
    _inheritsLoose(Box, _CollectionWidget);
    function Box() {
      return _CollectionWidget.apply(this, arguments) || this;
    }
    var _proto3 = Box.prototype;
    _proto3._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_CollectionWidget.prototype._getDefaultOptions.call(this), {
        direction: 'row',
        align: 'start',
        crossAlign: 'stretch',
        /**
        * @name dxBoxOptions.activeStateEnabled
        * @hidden
        */
        activeStateEnabled: false,
        /**
        * @name dxBoxOptions.focusStateEnabled
        * @hidden
        */
        focusStateEnabled: false,
        onItemStateChanged: undefined,
        _queue: undefined

        /**
        * @name dxBoxOptions.hint
        * @hidden
        */
        /**
        * @name dxBoxOptions.noDataText
        * @hidden
        */
        /**
        * @name dxBoxOptions.onSelectionChanged
        * @action
        * @hidden
        */
        /**
        * @name dxBoxOptions.selectedIndex
        * @hidden
        */
        /**
        * @name dxBoxOptions.selectedItem
        * @hidden
        */
        /**
        * @name dxBoxOptions.selectedItems
        * @hidden
        */
        /**
        * @name dxBoxOptions.selectedItemKeys
        * @hidden
        */
        /**
        * @name dxBoxOptions.keyExpr
        * @hidden
        */
        /**
        * @name dxBoxOptions.tabIndex
        * @hidden
        */
        /**
        * @name dxBoxOptions.accessKey
        * @hidden
        */
      });
    };
    _proto3._itemClass = function _itemClass() {
      return BOX_ITEM_CLASS;
    };
    _proto3._itemDataKey = function _itemDataKey() {
      return BOX_ITEM_DATA_KEY;
    };
    _proto3._itemElements = function _itemElements() {
      return this._itemContainer().children(this._itemSelector());
    };
    _proto3._init = function _init() {
      _CollectionWidget.prototype._init.call(this);
      this.$element().addClass(BOX_FLEX_CLASS);
      this._initLayout();
      this._initBoxQueue();
    };
    _proto3._initLayout = function _initLayout() {
      this._layout = new LayoutStrategy(this.$element(), this.option.bind(this));
    };
    _proto3._initBoxQueue = function _initBoxQueue() {
      this._queue = this.option('_queue') || [];
    };
    _proto3._queueIsNotEmpty = function _queueIsNotEmpty() {
      return this.option('_queue') ? false : !!this._queue.length;
    };
    _proto3._pushItemToQueue = function _pushItemToQueue($item, config) {
      this._queue.push({
        $item: $item,
        config: config
      });
    };
    _proto3._shiftItemFromQueue = function _shiftItemFromQueue() {
      return this._queue.shift();
    };
    _proto3._initMarkup = function _initMarkup() {
      this.$element().addClass(BOX_CLASS);
      this._layout.renderBox();
      _CollectionWidget.prototype._initMarkup.call(this);
      this._renderAlign();
      this._renderActions();
    };
    _proto3._renderActions = function _renderActions() {
      this._onItemStateChanged = this._createActionByOption('onItemStateChanged');
    };
    _proto3._renderAlign = function _renderAlign() {
      this._layout.renderAlign();
      this._layout.renderCrossAlign();
    };
    _proto3._renderItems = function _renderItems(items) {
      _CollectionWidget.prototype._renderItems.call(this, items);
      while (this._queueIsNotEmpty()) {
        var item = this._shiftItemFromQueue();
        this._createComponent(item.$item, Box, (0, _extend.extend)({
          itemTemplate: this.option('itemTemplate'),
          itemHoldTimeout: this.option('itemHoldTimeout'),
          onItemHold: this.option('onItemHold'),
          onItemClick: this.option('onItemClick'),
          onItemContextMenu: this.option('onItemContextMenu'),
          onItemRendered: this.option('onItemRendered'),
          _queue: this._queue
        }, item.config));
      }
      this._layout.renderItems(this._itemElements());
    };
    _proto3._renderItemContent = function _renderItemContent(args) {
      var $itemNode = args.itemData && args.itemData.node;
      if ($itemNode) {
        return this._renderItemContentByNode(args, $itemNode);
      }
      return _CollectionWidget.prototype._renderItemContent.call(this, args);
    };
    _proto3._postprocessRenderItem = function _postprocessRenderItem(args) {
      var boxConfig = args.itemData.box;
      if (!boxConfig) {
        return;
      }
      this._pushItemToQueue(args.itemContent, boxConfig);
    };
    _proto3._createItemByTemplate = function _createItemByTemplate(itemTemplate, args) {
      if (args.itemData.box) {
        return itemTemplate.source ? itemTemplate.source() : (0, _renderer.default)();
      }
      return _CollectionWidget.prototype._createItemByTemplate.call(this, itemTemplate, args);
    };
    _proto3._itemOptionChanged = function _itemOptionChanged(item, property, value, oldValue) {
      if (property === 'visible') {
        this._onItemStateChanged({
          name: property,
          state: value,
          oldState: oldValue !== false
        });
      }
      _CollectionWidget.prototype._itemOptionChanged.call(this, item, property, value);
    };
    _proto3._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case '_queue':
        case 'direction':
          this._invalidate();
          break;
        case 'align':
          this._layout.renderAlign();
          break;
        case 'crossAlign':
          this._layout.renderCrossAlign();
          break;
        default:
          _CollectionWidget.prototype._optionChanged.call(this, args);
      }
    };
    _proto3._itemOptions = function _itemOptions() {
      var _this = this;
      var options = _CollectionWidget.prototype._itemOptions.call(this);
      options.fireItemStateChangedAction = function (e) {
        _this._onItemStateChanged(e);
      };
      return options;
    }

    /**
    * @name dxBox.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxBox.focus
    * @publicName focus()
    * @hidden
    */;
    return Box;
  }(_uiCollection_widget.default);
  Box.ItemClass = BoxItem;
  (0, _component_registrator.default)('dxBox', Box);
  var _default = Box;
  /**
   * @name dxBoxItem
   * @inherits CollectionWidgetItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../core/component_registrator","../core/utils/extend","../core/utils/window","../core/utils/inflector","../core/utils/type","../core/utils/style","../core/utils/iterator","./collection/item","./collection/ui.collection_widget.edit"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../core/component_registrator"), require("../core/utils/extend"), require("../core/utils/window"), require("../core/utils/inflector"), require("../core/utils/type"), require("../core/utils/style"), require("../core/utils/iterator"), require("./collection/item"), require("./collection/ui.collection_widget.edit"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=box.js.map