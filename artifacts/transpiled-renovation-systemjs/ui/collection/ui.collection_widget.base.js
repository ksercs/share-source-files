!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/collection/ui.collection_widget.base.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/common","../../core/utils/template_manager","../../core/element","../../core/dom_adapter","../../core/utils/type","../../core/utils/deferred","../../core/utils/extend","../../core/utils/iterator","../../core/action","../../core/guid","../widget/ui.widget","../../events/utils/index","../../events/pointer","../../data_helper","./item","../widget/selectors","../../localization/message","../../events/hold","../../core/utils/data","../../events/click","../../events/contextmenu","../../core/templates/bindable_template"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/collection/ui.collection_widget.base.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "../../core/utils/common", "../../core/utils/template_manager", "../../core/element", "../../core/dom_adapter", "../../core/utils/type", "../../core/utils/deferred", "../../core/utils/extend", "../../core/utils/iterator", "../../core/action", "../../core/guid", "../widget/ui.widget", "../../events/utils/index", "../../events/pointer", "../../data_helper", "./item", "../widget/selectors", "../../localization/message", "../../events/hold", "../../core/utils/data", "../../events/click", "../../events/contextmenu", "../../core/templates/bindable_template"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _common = $__require("../../core/utils/common");
  var _template_manager = $__require("../../core/utils/template_manager");
  var _element = $__require("../../core/element");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _type = $__require("../../core/utils/type");
  var _deferred = $__require("../../core/utils/deferred");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _action = _interopRequireDefault($__require("../../core/action"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _index = $__require("../../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _data_helper = _interopRequireDefault($__require("../../data_helper"));
  var _item = _interopRequireDefault($__require("./item"));
  var _selectors = $__require("../widget/selectors");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _hold = _interopRequireDefault($__require("../../events/hold"));
  var _data = $__require("../../core/utils/data");
  var _click = $__require("../../events/click");
  var _contextmenu = $__require("../../events/contextmenu");
  var _bindable_template = $__require("../../core/templates/bindable_template");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var COLLECTION_CLASS = 'dx-collection';
  var ITEM_CLASS = 'dx-item';
  var CONTENT_CLASS_POSTFIX = '-content';
  var ITEM_CONTENT_PLACEHOLDER_CLASS = 'dx-item-content-placeholder';
  var ITEM_DATA_KEY = 'dxItemData';
  var ITEM_INDEX_KEY = 'dxItemIndex';
  var ITEM_TEMPLATE_ID_PREFIX = 'tmpl-';
  var ITEMS_OPTIONS_NAME = 'dxItem';
  var SELECTED_ITEM_CLASS = 'dx-item-selected';
  var ITEM_RESPONSE_WAIT_CLASS = 'dx-item-response-wait';
  var EMPTY_COLLECTION = 'dx-empty-collection';
  var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
  var ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
  var ANONYMOUS_TEMPLATE_NAME = 'item';
  var FOCUS_UP = 'up';
  var FOCUS_DOWN = 'down';
  var FOCUS_LEFT = 'left';
  var FOCUS_RIGHT = 'right';
  var FOCUS_PAGE_UP = 'pageup';
  var FOCUS_PAGE_DOWN = 'pagedown';
  var FOCUS_LAST = 'last';
  var FOCUS_FIRST = 'first';
  var CollectionWidget = _ui.default.inherit({
    _activeStateUnit: '.' + ITEM_CLASS,
    _supportedKeys: function _supportedKeys() {
      var space = function space(e) {
        e.preventDefault();
        this._enterKeyHandler(e);
      };
      var move = function move(location, e) {
        if (!(0, _index.isCommandKeyPressed)(e)) {
          e.preventDefault();
          e.stopPropagation();
          this._moveFocus(location, e);
        }
      };
      return (0, _extend.extend)(this.callBase(), {
        space: space,
        enter: this._enterKeyHandler,
        leftArrow: move.bind(this, FOCUS_LEFT),
        rightArrow: move.bind(this, FOCUS_RIGHT),
        upArrow: move.bind(this, FOCUS_UP),
        downArrow: move.bind(this, FOCUS_DOWN),
        pageUp: move.bind(this, FOCUS_UP),
        pageDown: move.bind(this, FOCUS_DOWN),
        home: move.bind(this, FOCUS_FIRST),
        end: move.bind(this, FOCUS_LAST)
      });
    },
    _enterKeyHandler: function _enterKeyHandler(e) {
      var $itemElement = (0, _renderer.default)(this.option('focusedElement'));
      if (!$itemElement.length) {
        return;
      }
      var itemData = this._getItemData($itemElement);
      if (itemData !== null && itemData !== void 0 && itemData.onClick) {
        this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
          event: e
        });
      }
      this._itemClickHandler((0, _extend.extend)({}, e, {
        target: $itemElement.get(0),
        currentTarget: $itemElement.get(0)
      }));
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
        * @name CollectionWidgetOptions.selectOnFocus
        * @type boolean
        * @hidden
        */
        selectOnFocus: false,
        /**
        * @name CollectionWidgetOptions.loopItemFocus
        * @type boolean
        * @hidden
        */
        loopItemFocus: true,
        items: [],
        itemTemplate: 'item',
        onItemRendered: null,
        onItemClick: null,
        onItemHold: null,
        itemHoldTimeout: 750,
        onItemContextMenu: null,
        onFocusedItemChanged: null,
        noDataText: _message.default.format('dxCollectionWidget-noDataText'),
        encodeNoDataText: false,
        dataSource: null,
        _dataController: null,
        _itemAttributes: {},
        itemTemplateProperty: 'template',
        focusOnSelectedItem: true,
        /**
        * @name CollectionWidgetOptions.focusedElement
        * @type DxElement
        * @default null
        * @hidden
        */
        focusedElement: null,
        displayExpr: undefined,
        disabledExpr: function disabledExpr(data) {
          return data ? data.disabled : undefined;
        },
        visibleExpr: function visibleExpr(data) {
          return data ? data.visible : undefined;
        }
      });
    },
    _init: function _init() {
      this._compileDisplayGetter();
      this._initDataController();
      this.callBase();
      this._cleanRenderedItems();
      this._refreshDataSource();
    },
    _compileDisplayGetter: function _compileDisplayGetter() {
      var displayExpr = this.option('displayExpr');
      this._displayGetter = displayExpr ? (0, _data.compileGetter)(this.option('displayExpr')) : undefined;
    },
    _initTemplates: function _initTemplates() {
      this._initItemsFromMarkup();
      this._initDefaultItemTemplate();
      this.callBase();
    },
    _getAnonymousTemplateName: function _getAnonymousTemplateName() {
      return ANONYMOUS_TEMPLATE_NAME;
    },
    _initDefaultItemTemplate: function _initDefaultItemTemplate() {
      var fieldsMap = this._getFieldsMap();
      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(function ($container, data) {
          if ((0, _type.isPlainObject)(data)) {
            this._prepareDefaultItemTemplate(data, $container);
          } else {
            if (fieldsMap && (0, _type.isFunction)(fieldsMap.text)) {
              data = fieldsMap.text(data);
            }
            $container.text(String((0, _common.ensureDefined)(data, '')));
          }
        }.bind(this), this._getBindableFields(), this.option('integrationOptions.watchMethod'), fieldsMap)
      });
    },
    _getBindableFields: function _getBindableFields() {
      return ['text', 'html'];
    },
    _getFieldsMap: function _getFieldsMap() {
      if (this._displayGetter) {
        return {
          text: this._displayGetter
        };
      }
    },
    _prepareDefaultItemTemplate: function _prepareDefaultItemTemplate(data, $container) {
      if ((0, _type.isDefined)(data.text)) {
        $container.text(data.text);
      }
      if ((0, _type.isDefined)(data.html)) {
        $container.html(data.html);
      }
    },
    _initItemsFromMarkup: function _initItemsFromMarkup() {
      var _this = this;
      var rawItems = (0, _template_manager.findTemplates)(this.$element(), ITEMS_OPTIONS_NAME);
      if (!rawItems.length || this.option('items').length) {
        return;
      }
      var items = rawItems.map(function (_ref) {
        var element = _ref.element,
            options = _ref.options;
        var isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
        if (isTemplateRequired) {
          options.template = _this._prepareItemTemplate(element);
        } else {
          (0, _renderer.default)(element).remove();
        }
        return options;
      });
      this.option('items', items);
    },
    _prepareItemTemplate: function _prepareItemTemplate(item) {
      var templateId = ITEM_TEMPLATE_ID_PREFIX + new _guid.default();
      var $template = (0, _renderer.default)(item).detach().clone().removeAttr('data-options').addClass(TEMPLATE_WRAPPER_CLASS);
      this._saveTemplate(templateId, $template);
      return templateId;
    },
    _dataSourceOptions: function _dataSourceOptions() {
      return {
        paginate: false
      };
    },
    _cleanRenderedItems: function _cleanRenderedItems() {
      this._renderedItemsCount = 0;
    },
    _focusTarget: function _focusTarget() {
      return this.$element();
    },
    _focusInHandler: function _focusInHandler(e) {
      this.callBase.apply(this, arguments);
      if (!this._isFocusTarget(e.target)) {
        return;
      }
      var $focusedElement = (0, _renderer.default)(this.option('focusedElement'));
      if ($focusedElement.length) {
        this._setFocusedItem($focusedElement);
      } else {
        var $activeItem = this._getActiveItem();
        if ($activeItem.length) {
          this.option('focusedElement', (0, _element.getPublicElement)($activeItem));
        }
      }
    },
    _focusOutHandler: function _focusOutHandler() {
      this.callBase.apply(this, arguments);
      var $target = (0, _renderer.default)(this.option('focusedElement'));
      this._updateFocusedItemState($target, false);
    },
    _findActiveTarget: function _findActiveTarget($element) {
      return $element.find(this._activeStateUnit);
    },
    _getActiveItem: function _getActiveItem(last) {
      var $focusedElement = (0, _renderer.default)(this.option('focusedElement'));
      if ($focusedElement.length) {
        return $focusedElement;
      }
      var index = this.option('focusOnSelectedItem') ? this.option('selectedIndex') : 0;
      var activeElements = this._getActiveElement();
      var lastIndex = activeElements.length - 1;
      if (index < 0) {
        index = last ? lastIndex : 0;
      }
      return activeElements.eq(index);
    },
    _moveFocus: function _moveFocus(location) {
      var $items = this._getAvailableItems();
      var $newTarget;
      switch (location) {
        case FOCUS_PAGE_UP:
        case FOCUS_UP:
          $newTarget = this._prevItem($items);
          break;
        case FOCUS_PAGE_DOWN:
        case FOCUS_DOWN:
          $newTarget = this._nextItem($items);
          break;
        case FOCUS_RIGHT:
          $newTarget = this.option('rtlEnabled') ? this._prevItem($items) : this._nextItem($items);
          break;
        case FOCUS_LEFT:
          $newTarget = this.option('rtlEnabled') ? this._nextItem($items) : this._prevItem($items);
          break;
        case FOCUS_FIRST:
          $newTarget = $items.first();
          break;
        case FOCUS_LAST:
          $newTarget = $items.last();
          break;
        default:
          return false;
      }
      if ($newTarget.length !== 0) {
        this.option('focusedElement', (0, _element.getPublicElement)($newTarget));
      }
    },
    _getVisibleItems: function _getVisibleItems($itemElements) {
      $itemElements = $itemElements || this._itemElements();
      return $itemElements.filter(':visible');
    },
    _getAvailableItems: function _getAvailableItems($itemElements) {
      return this._getVisibleItems($itemElements);
    },
    _prevItem: function _prevItem($items) {
      var $target = this._getActiveItem();
      var targetIndex = $items.index($target);
      var $last = $items.last();
      var $item = (0, _renderer.default)($items[targetIndex - 1]);
      var loop = this.option('loopItemFocus');
      if ($item.length === 0 && loop) {
        $item = $last;
      }
      return $item;
    },
    _nextItem: function _nextItem($items) {
      var $target = this._getActiveItem(true);
      var targetIndex = $items.index($target);
      var $first = $items.first();
      var $item = (0, _renderer.default)($items[targetIndex + 1]);
      var loop = this.option('loopItemFocus');
      if ($item.length === 0 && loop) {
        $item = $first;
      }
      return $item;
    },
    _selectFocusedItem: function _selectFocusedItem($target) {
      this.selectItem($target);
    },
    _updateFocusedItemState: function _updateFocusedItemState(target, isFocused, needCleanItemId) {
      var $target = (0, _renderer.default)(target);
      if ($target.length) {
        this._refreshActiveDescendant();
        this._refreshItemId($target, needCleanItemId);
        this._toggleFocusClass(isFocused, $target);
      }
      this._updateParentActiveDescendant();
    },
    _refreshActiveDescendant: function _refreshActiveDescendant($target) {
      this.setAria('activedescendant', (0, _type.isDefined)(this.option('focusedElement')) ? this.getFocusedItemId() : null, $target);
    },
    _refreshItemId: function _refreshItemId($target, needCleanItemId) {
      if (!needCleanItemId && this.option('focusedElement')) {
        this.setAria('id', this.getFocusedItemId(), $target);
      } else {
        this.setAria('id', null, $target);
      }
    },
    _isDisabled: function _isDisabled($element) {
      return $element && (0, _renderer.default)($element).attr('aria-disabled') === 'true';
    },
    _setFocusedItem: function _setFocusedItem($target) {
      if (!$target || !$target.length) {
        return;
      }
      this._updateFocusedItemState($target, true);
      this.onFocusedItemChanged(this.getFocusedItemId());
      var _this$option = this.option(),
          selectOnFocus = _this$option.selectOnFocus;
      var isTargetDisabled = this._isDisabled($target);
      if (selectOnFocus && !isTargetDisabled) {
        this._selectFocusedItem($target);
      }
    },
    _findItemElementByItem: function _findItemElementByItem(item) {
      var result = (0, _renderer.default)();
      var that = this;
      this.itemElements().each(function () {
        var $item = (0, _renderer.default)(this);
        if ($item.data(that._itemDataKey()) === item) {
          result = $item;
          return false;
        }
      });
      return result;
    },
    _getIndexByItem: function _getIndexByItem(item) {
      return this.option('items').indexOf(item);
    },
    _itemOptionChanged: function _itemOptionChanged(item, property, value, oldValue) {
      var $item = this._findItemElementByItem(item);
      if (!$item.length) {
        return;
      }
      if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
        this._refreshItem($item, item);
      }
      var isDisabling = property === 'disabled' && value;
      if (isDisabling) {
        this._resetItemFocus($item);
      }
    },
    _resetItemFocus: function _resetItemFocus($item) {
      if ($item.is(this.option('focusedElement'))) {
        this.option('focusedElement', null);
      }
    },
    _refreshItem: function _refreshItem($item) {
      var itemData = this._getItemData($item);
      var index = $item.data(this._itemIndexKey());
      this._renderItem(this._renderedItemsCount + index, itemData, null, $item);
    },
    _updateParentActiveDescendant: _common.noop,
    _optionChanged: function _optionChanged(args) {
      if (args.name === 'items') {
        var matches = args.fullName.match(ITEM_PATH_REGEX);
        if (matches && matches.length) {
          var property = matches[matches.length - 1];
          var itemPath = args.fullName.replace('.' + property, '');
          var item = this.option(itemPath);
          this._itemOptionChanged(item, property, args.value, args.previousValue);
          return;
        }
      }
      switch (args.name) {
        case 'items':
        case '_itemAttributes':
        case 'itemTemplateProperty':
        case 'useItemTextAsTitle':
          this._cleanRenderedItems();
          this._invalidate();
          break;
        case 'dataSource':
          this._refreshDataSource();
          this._renderEmptyMessage();
          break;
        case 'noDataText':
        case 'encodeNoDataText':
          this._renderEmptyMessage();
          break;
        case 'itemTemplate':
          this._invalidate();
          break;
        case 'onItemRendered':
          this._createItemRenderAction();
          break;
        case 'onItemClick':
          break;
        case 'onItemHold':
        case 'itemHoldTimeout':
          this._attachHoldEvent();
          break;
        case 'onItemContextMenu':
          this._attachContextMenuEvent();
          break;
        case 'onFocusedItemChanged':
          this.onFocusedItemChanged = this._createActionByOption('onFocusedItemChanged');
          break;
        case 'selectOnFocus':
        case 'loopItemFocus':
        case 'focusOnSelectedItem':
          break;
        case 'focusedElement':
          this._updateFocusedItemState(args.previousValue, false, true);
          this._setFocusedItem((0, _renderer.default)(args.value));
          break;
        case 'displayExpr':
          this._compileDisplayGetter();
          this._initDefaultItemTemplate();
          this._invalidate();
          break;
        case 'visibleExpr':
        case 'disabledExpr':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    },
    _invalidate: function _invalidate() {
      this.option('focusedElement', null);
      return this.callBase.apply(this, arguments);
    },
    _loadNextPage: function _loadNextPage() {
      this._expectNextPageLoading();
      return this._dataController.loadNextPage();
    },
    _expectNextPageLoading: function _expectNextPageLoading() {
      this._startIndexForAppendedItems = 0;
    },
    _expectLastItemLoading: function _expectLastItemLoading() {
      this._startIndexForAppendedItems = -1;
    },
    _forgetNextPageLoading: function _forgetNextPageLoading() {
      this._startIndexForAppendedItems = null;
    },
    _dataSourceChangedHandler: function _dataSourceChangedHandler(newItems) {
      var items = this.option('items');
      if (this._initialized && items && this._shouldAppendItems()) {
        this._renderedItemsCount = items.length;
        if (!this._isLastPage() || this._startIndexForAppendedItems !== -1) {
          this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems));
        }
        this._forgetNextPageLoading();
        this._refreshContent();
      } else {
        this.option('items', newItems.slice());
      }
    },
    _refreshContent: function _refreshContent() {
      this._prepareContent();
      this._renderContent();
    },
    _dataSourceLoadErrorHandler: function _dataSourceLoadErrorHandler() {
      this._forgetNextPageLoading();
      this.option('items', this.option('items'));
    },
    _shouldAppendItems: function _shouldAppendItems() {
      return this._startIndexForAppendedItems != null && this._allowDynamicItemsAppend();
    },
    _allowDynamicItemsAppend: function _allowDynamicItemsAppend() {
      return false;
    },
    _clean: function _clean() {
      this._cleanFocusState();
      this._cleanItemContainer();
      this._inkRipple && delete this._inkRipple;
      this._resetActiveState();
    },
    _cleanItemContainer: function _cleanItemContainer() {
      (0, _renderer.default)(this._itemContainer()).empty();
    },
    _dispose: function _dispose() {
      this.callBase();
      clearTimeout(this._itemFocusTimeout);
    },
    _refresh: function _refresh() {
      this._cleanRenderedItems();
      this.callBase.apply(this, arguments);
    },
    _itemContainer: function _itemContainer() {
      return this.$element();
    },
    _itemClass: function _itemClass() {
      return ITEM_CLASS;
    },
    _itemContentClass: function _itemContentClass() {
      return this._itemClass() + CONTENT_CLASS_POSTFIX;
    },
    _selectedItemClass: function _selectedItemClass() {
      return SELECTED_ITEM_CLASS;
    },
    _itemResponseWaitClass: function _itemResponseWaitClass() {
      return ITEM_RESPONSE_WAIT_CLASS;
    },
    _itemSelector: function _itemSelector() {
      return '.' + this._itemClass();
    },
    _itemDataKey: function _itemDataKey() {
      return ITEM_DATA_KEY;
    },
    _itemIndexKey: function _itemIndexKey() {
      return ITEM_INDEX_KEY;
    },
    _itemElements: function _itemElements() {
      return this._itemContainer().find(this._itemSelector());
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this.onFocusedItemChanged = this._createActionByOption('onFocusedItemChanged');
      this.$element().addClass(COLLECTION_CLASS);
      this._prepareContent();
    },
    _prepareContent: (0, _common.deferRenderer)(function () {
      this._renderContentImpl();
    }),
    _renderContent: function _renderContent() {
      this._fireContentReadyAction();
    },
    _render: function _render() {
      this.callBase();
      this._attachClickEvent();
      this._attachHoldEvent();
      this._attachContextMenuEvent();
    },
    _attachClickEvent: function _attachClickEvent() {
      var itemSelector = this._itemSelector();
      var clickEventNamespace = (0, _index.addNamespace)(_click.name, this.NAME);
      var pointerUpEventNamespace = (0, _index.addNamespace)(_pointer.default.up, this.NAME);
      var that = this;
      var pointerUpAction = new _action.default(function (args) {
        var event = args.event;
        that._itemPointerDownHandler(event);
      });
      _events_engine.default.off(this._itemContainer(), clickEventNamespace, itemSelector);
      _events_engine.default.off(this._itemContainer(), pointerUpEventNamespace, itemSelector);
      _events_engine.default.on(this._itemContainer(), clickEventNamespace, itemSelector, function (e) {
        this._itemClickHandler(e);
      }.bind(this));
      _events_engine.default.on(this._itemContainer(), pointerUpEventNamespace, itemSelector, function (e) {
        pointerUpAction.execute({
          element: (0, _renderer.default)(e.target),
          event: e
        });
      });
    },
    _itemClickHandler: function _itemClickHandler(e, args, config) {
      this._itemDXEventHandler(e, 'onItemClick', args, config);
    },
    _itemPointerDownHandler: function _itemPointerDownHandler(e) {
      if (!this.option('focusStateEnabled')) {
        return;
      }
      this._itemFocusHandler = function () {
        clearTimeout(this._itemFocusTimeout);
        this._itemFocusHandler = null;
        if (e.isDefaultPrevented()) {
          return;
        }
        var $target = (0, _renderer.default)(e.target);
        var $closestItem = $target.closest(this._itemElements());
        var $closestFocusable = this._closestFocusable($target);
        if ($closestItem.length && this._isFocusTarget($closestFocusable === null || $closestFocusable === void 0 ? void 0 : $closestFocusable.get(0))) {
          this.option('focusedElement', (0, _element.getPublicElement)($closestItem));
        }
      }.bind(this);
      this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this));
    },
    _closestFocusable: function _closestFocusable($target) {
      if ($target.is(_selectors.focusable)) {
        return $target;
      } else {
        $target = $target.parent();
        while ($target.length && !_dom_adapter.default.isDocument($target.get(0)) && !_dom_adapter.default.isDocumentFragment($target.get(0))) {
          if ($target.is(_selectors.focusable)) {
            return $target;
          }
          $target = $target.parent();
        }
      }
    },
    _forcePointerDownFocus: function _forcePointerDownFocus() {
      this._itemFocusHandler && this._itemFocusHandler();
    },
    _updateFocusState: function _updateFocusState() {
      this.callBase.apply(this, arguments);
      this._forcePointerDownFocus();
    },
    _attachHoldEvent: function _attachHoldEvent() {
      var $itemContainer = this._itemContainer();
      var itemSelector = this._itemSelector();
      var eventName = (0, _index.addNamespace)(_hold.default.name, this.NAME);
      _events_engine.default.off($itemContainer, eventName, itemSelector);
      _events_engine.default.on($itemContainer, eventName, itemSelector, {
        timeout: this._getHoldTimeout()
      }, this._itemHoldHandler.bind(this));
    },
    _getHoldTimeout: function _getHoldTimeout() {
      return this.option('itemHoldTimeout');
    },
    _shouldFireHoldEvent: function _shouldFireHoldEvent() {
      return this.hasActionSubscription('onItemHold');
    },
    _itemHoldHandler: function _itemHoldHandler(e) {
      if (this._shouldFireHoldEvent()) {
        this._itemDXEventHandler(e, 'onItemHold');
      } else {
        e.cancel = true;
      }
    },
    _attachContextMenuEvent: function _attachContextMenuEvent() {
      var $itemContainer = this._itemContainer();
      var itemSelector = this._itemSelector();
      var eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);
      _events_engine.default.off($itemContainer, eventName, itemSelector);
      _events_engine.default.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this));
    },
    _shouldFireContextMenuEvent: function _shouldFireContextMenuEvent() {
      return this.hasActionSubscription('onItemContextMenu');
    },
    _itemContextMenuHandler: function _itemContextMenuHandler(e) {
      if (this._shouldFireContextMenuEvent()) {
        this._itemDXEventHandler(e, 'onItemContextMenu');
      } else {
        e.cancel = true;
      }
    },
    _renderContentImpl: function _renderContentImpl() {
      var items = this.option('items') || [];
      if (this._renderedItemsCount) {
        this._renderItems(items.slice(this._renderedItemsCount));
      } else {
        this._renderItems(items);
      }
    },
    _renderItems: function _renderItems(items) {
      if (items.length) {
        (0, _iterator.each)(items, function (index, itemData) {
          this._renderItem(this._renderedItemsCount + index, itemData);
        }.bind(this));
      }
      this._renderEmptyMessage();
    },
    _renderItem: function _renderItem(index, itemData, $container, $itemToReplace) {
      var _index$item;
      var itemIndex = (_index$item = index === null || index === void 0 ? void 0 : index.item) !== null && _index$item !== void 0 ? _index$item : index;
      $container = $container || this._itemContainer();
      var $itemFrame = this._renderItemFrame(itemIndex, itemData, $container, $itemToReplace);
      this._setElementData($itemFrame, itemData, itemIndex);
      $itemFrame.attr(this.option('_itemAttributes'));
      this._attachItemClickEvent(itemData, $itemFrame);
      var $itemContent = this._getItemContent($itemFrame);
      var renderContentPromise = this._renderItemContent({
        index: itemIndex,
        itemData: itemData,
        container: (0, _element.getPublicElement)($itemContent),
        contentClass: this._itemContentClass(),
        defaultTemplateName: this.option('itemTemplate')
      });
      var that = this;
      (0, _deferred.when)(renderContentPromise).done(function ($itemContent) {
        that._postprocessRenderItem({
          itemElement: $itemFrame,
          itemContent: $itemContent,
          itemData: itemData,
          itemIndex: itemIndex
        });
        that._executeItemRenderAction(index, itemData, (0, _element.getPublicElement)($itemFrame));
      });
      return $itemFrame;
    },
    _getItemContent: function _getItemContent($itemFrame) {
      var $itemContent = $itemFrame.find('.' + ITEM_CONTENT_PLACEHOLDER_CLASS);
      $itemContent.removeClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
      return $itemContent;
    },
    _attachItemClickEvent: function _attachItemClickEvent(itemData, $itemElement) {
      if (!itemData || !itemData.onClick) {
        return;
      }
      _events_engine.default.on($itemElement, _click.name, function (e) {
        this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
          event: e
        });
      }.bind(this));
    },
    _renderItemContent: function _renderItemContent(args) {
      var itemTemplateName = this._getItemTemplateName(args);
      var itemTemplate = this._getTemplate(itemTemplateName);
      this._addItemContentClasses(args);
      var $templateResult = (0, _renderer.default)(this._createItemByTemplate(itemTemplate, args));
      if (!$templateResult.hasClass(TEMPLATE_WRAPPER_CLASS)) {
        return args.container;
      }
      return this._renderItemContentByNode(args, $templateResult);
    },
    _renderItemContentByNode: function _renderItemContentByNode(args, $node) {
      (0, _renderer.default)(args.container).replaceWith($node);
      args.container = (0, _element.getPublicElement)($node);
      this._addItemContentClasses(args);
      return $node;
    },
    _addItemContentClasses: function _addItemContentClasses(args) {
      var classes = [ITEM_CLASS + CONTENT_CLASS_POSTFIX, args.contentClass];
      (0, _renderer.default)(args.container).addClass(classes.join(' '));
    },
    _appendItemToContainer: function _appendItemToContainer($container, $itemFrame, index) {
      $itemFrame.appendTo($container);
    },
    _renderItemFrame: function _renderItemFrame(index, itemData, $container, $itemToReplace) {
      var $itemFrame = (0, _renderer.default)('<div>');
      new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
      if ($itemToReplace && $itemToReplace.length) {
        $itemToReplace.replaceWith($itemFrame);
      } else {
        this._appendItemToContainer.call(this, $container, $itemFrame, index);
      }
      if (this.option('useItemTextAsTitle')) {
        var displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
        $itemFrame.attr('title', displayValue);
      }
      return $itemFrame;
    },
    _itemOptions: function _itemOptions() {
      var that = this;
      return {
        watchMethod: function watchMethod() {
          return that.option('integrationOptions.watchMethod');
        },
        owner: that,
        fieldGetter: function fieldGetter(field) {
          var expr = that.option(field + 'Expr');
          var getter = (0, _data.compileGetter)(expr);
          return getter;
        }
      };
    },
    _postprocessRenderItem: _common.noop,
    _executeItemRenderAction: function _executeItemRenderAction(index, itemData, itemElement) {
      this._getItemRenderAction()({
        itemElement: itemElement,
        itemIndex: index,
        itemData: itemData
      });
    },
    _setElementData: function _setElementData(element, data, index) {
      element.addClass([ITEM_CLASS, this._itemClass()].join(' ')).data(this._itemDataKey(), data).data(this._itemIndexKey(), index);
    },
    _createItemRenderAction: function _createItemRenderAction() {
      return this._itemRenderAction = this._createActionByOption('onItemRendered', {
        element: this.element(),
        excludeValidators: ['disabled', 'readOnly'],
        category: 'rendering'
      });
    },
    _getItemRenderAction: function _getItemRenderAction() {
      return this._itemRenderAction || this._createItemRenderAction();
    },
    _getItemTemplateName: function _getItemTemplateName(args) {
      var data = args.itemData;
      var templateProperty = args.templateProperty || this.option('itemTemplateProperty');
      var template = data && data[templateProperty];
      return template || args.defaultTemplateName;
    },
    _createItemByTemplate: function _createItemByTemplate(itemTemplate, renderArgs) {
      return itemTemplate.render({
        model: renderArgs.itemData,
        container: renderArgs.container,
        index: renderArgs.index,
        onRendered: this._onItemTemplateRendered(itemTemplate, renderArgs)
      });
    },
    _onItemTemplateRendered: function _onItemTemplateRendered() {
      return _common.noop;
    },
    _emptyMessageContainer: function _emptyMessageContainer() {
      return this._itemContainer();
    },
    _renderEmptyMessage: function _renderEmptyMessage(items) {
      items = items || this.option('items');
      var noDataText = this.option('noDataText');
      var hideNoData = !noDataText || items && items.length || this._dataController.isLoading();
      if (hideNoData && this._$noData) {
        this._$noData.remove();
        this._$noData = null;
        this.setAria('label', undefined);
      }
      if (!hideNoData) {
        this._$noData = this._$noData || (0, _renderer.default)('<div>').addClass('dx-empty-message');
        this._$noData.appendTo(this._emptyMessageContainer());
        if (this.option('encodeNoDataText')) {
          this._$noData.text(noDataText);
        } else {
          this._$noData.html(noDataText);
        }
        this.setAria('label', noDataText);
      }
      this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData);
    },
    _itemDXEventHandler: function _itemDXEventHandler(dxEvent, handlerOptionName, actionArgs, actionConfig) {
      this._itemEventHandler(dxEvent.target, handlerOptionName, (0, _extend.extend)(actionArgs, {
        event: dxEvent
      }), actionConfig);
    },
    _itemEventHandler: function _itemEventHandler(initiator, handlerOptionName, actionArgs, actionConfig) {
      var action = this._createActionByOption(handlerOptionName, (0, _extend.extend)({
        validatingTargetName: 'itemElement'
      }, actionConfig));
      return this._itemEventHandlerImpl(initiator, action, actionArgs);
    },
    _itemEventHandlerByHandler: function _itemEventHandlerByHandler(initiator, handler, actionArgs, actionConfig) {
      var action = this._createAction(handler, (0, _extend.extend)({
        validatingTargetName: 'itemElement'
      }, actionConfig));
      return this._itemEventHandlerImpl(initiator, action, actionArgs);
    },
    _itemEventHandlerImpl: function _itemEventHandlerImpl(initiator, action, actionArgs) {
      var $itemElement = this._closestItemElement((0, _renderer.default)(initiator));
      var args = (0, _extend.extend)({}, actionArgs);
      return action((0, _extend.extend)(actionArgs, this._extendActionArgs($itemElement), args));
    },
    _extendActionArgs: function _extendActionArgs($itemElement) {
      return {
        itemElement: (0, _element.getPublicElement)($itemElement),
        itemIndex: this._itemElements().index($itemElement),
        itemData: this._getItemData($itemElement)
      };
    },
    _closestItemElement: function _closestItemElement($element) {
      return (0, _renderer.default)($element).closest(this._itemSelector());
    },
    _getItemData: function _getItemData(itemElement) {
      return (0, _renderer.default)(itemElement).data(this._itemDataKey());
    },
    _getSummaryItemsWidth: function _getSummaryItemsWidth(items, includeMargin) {
      var result = 0;
      if (items) {
        (0, _iterator.each)(items, function (_, item) {
          result += (0, _size.getOuterWidth)(item, includeMargin || false);
        });
      }
      return result;
    },
    /**
    * @name CollectionWidget.getFocusedItemId
    * @publicName getFocusedItemId()
    * @return string
    * @hidden
    */
    getFocusedItemId: function getFocusedItemId() {
      if (!this._focusedItemId) {
        this._focusedItemId = 'dx-' + new _guid.default();
      }
      return this._focusedItemId;
    },
    /**
    * @name CollectionWidget.itemElements
    * @publicName itemElements()
    * @return Array<Element>
    * @hidden
    */
    itemElements: function itemElements() {
      return this._itemElements();
    },
    /**
    * @name CollectionWidget.itemsContainer
    * @publicName itemsContainer()
    * @return Element
    * @hidden
    */
    itemsContainer: function itemsContainer() {
      return this._itemContainer();
    }
  }).include(_data_helper.default);
  CollectionWidget.ItemClass = _item.default;
  var _default = CollectionWidget;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/common","../../core/utils/template_manager","../../core/element","../../core/dom_adapter","../../core/utils/type","../../core/utils/deferred","../../core/utils/extend","../../core/utils/iterator","../../core/action","../../core/guid","../widget/ui.widget","../../events/utils/index","../../events/pointer","../../data_helper","./item","../widget/selectors","../../localization/message","../../events/hold","../../core/utils/data","../../events/click","../../events/contextmenu","../../core/templates/bindable_template"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/utils/common"), require("../../core/utils/template_manager"), require("../../core/element"), require("../../core/dom_adapter"), require("../../core/utils/type"), require("../../core/utils/deferred"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/action"), require("../../core/guid"), require("../widget/ui.widget"), require("../../events/utils/index"), require("../../events/pointer"), require("../../data_helper"), require("./item"), require("../widget/selectors"), require("../../localization/message"), require("../../events/hold"), require("../../core/utils/data"), require("../../events/click"), require("../../events/contextmenu"), require("../../core/templates/bindable_template"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.collection_widget.base.js.map