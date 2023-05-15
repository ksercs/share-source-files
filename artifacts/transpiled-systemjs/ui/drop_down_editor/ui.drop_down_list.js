!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/drop_down_editor/ui.drop_down_list.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/window","../../events/core/events_engine","../../core/guid","../../core/component_registrator","../../core/utils/common","../../core/utils/type","../../core/utils/extend","./ui.drop_down_editor","../list_light","../widget/ui.errors","../../events/utils/index","../../core/devices","../../data/query","../../core/utils/iterator","../editor/ui.data_expression","../../localization/message","../../core/templates/child_default_template","../../core/utils/deferred","../shared/grouped_data_converter_mixin"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/drop_down_editor/ui.drop_down_list.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/window", "../../events/core/events_engine", "../../core/guid", "../../core/component_registrator", "../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "./ui.drop_down_editor", "../list_light", "../widget/ui.errors", "../../events/utils/index", "../../core/devices", "../../data/query", "../../core/utils/iterator", "../editor/ui.data_expression", "../../localization/message", "../../core/templates/child_default_template", "../../core/utils/deferred", "../shared/grouped_data_converter_mixin"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("./ui.drop_down_editor"));
  var _list_light = _interopRequireDefault($__require("../list_light"));
  var _ui2 = _interopRequireDefault($__require("../widget/ui.errors"));
  var _index = $__require("../../events/utils/index");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _iterator = $__require("../../core/utils/iterator");
  var _ui3 = _interopRequireDefault($__require("../editor/ui.data_expression"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _child_default_template = $__require("../../core/templates/child_default_template");
  var _deferred = $__require("../../core/utils/deferred");
  var _grouped_data_converter_mixin = _interopRequireDefault($__require("../shared/grouped_data_converter_mixin"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  var window = (0, _window.getWindow)();
  var LIST_ITEM_SELECTOR = '.dx-list-item';
  var LIST_ITEM_DATA_KEY = 'dxListItemData';
  var DROPDOWNLIST_POPUP_WRAPPER_CLASS = 'dx-dropdownlist-popup-wrapper';
  var SEARCH_EVENT = 'input';
  var SEARCH_MODES = ['startswith', 'contains', 'endwith', 'notcontains'];
  var useCompositionEvents = _devices.default.real().platform !== 'android';
  var DropDownList = _ui.default.inherit({
    _supportedKeys: function _supportedKeys() {
      var parent = this.callBase();
      return (0, _extend.extend)({}, parent, {
        tab: function tab(e) {
          if (this._allowSelectItemByTab()) {
            this._saveValueChangeEvent(e);
            var $focusedItem = (0, _renderer.default)(this._list.option('focusedElement'));
            $focusedItem.length && this._setSelectedElement($focusedItem);
          }
          parent.tab.apply(this, arguments);
        },
        space: _common.noop,
        home: _common.noop,
        end: _common.noop
      });
    },
    _allowSelectItemByTab: function _allowSelectItemByTab() {
      return this.option('opened') && this.option('applyValueMode') === 'instantly';
    },
    _setSelectedElement: function _setSelectedElement($element) {
      var value = this._valueGetter(this._list._getItemData($element));
      this._setValue(value);
    },
    _setValue: function _setValue(value) {
      this.option('value', value);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), (0, _extend.extend)(_ui3.default._dataExpressionDefaultOptions(), {
        displayValue: undefined,
        searchEnabled: false,
        searchMode: 'contains',
        searchTimeout: 500,
        minSearchLength: 0,
        searchExpr: null,
        valueChangeEvent: 'input change keyup',
        selectedItem: null,
        noDataText: _message.default.format('dxCollectionWidget-noDataText'),
        encodeNoDataText: false,
        onSelectionChanged: null,
        onItemClick: _common.noop,
        showDataBeforeSearch: false,
        grouped: false,
        groupTemplate: 'group',
        popupPosition: {
          my: 'left top',
          at: 'left bottom',
          offset: {
            h: 0,
            v: 0
          },
          collision: 'flip'
        },
        wrapItemText: false,
        useItemTextAsTitle: false

        /**
        * @name dxDropDownListOptions.fieldTemplate
        * @hidden
        */
        /**
        * @name dxDropDownListOptions.fieldRender
        * @hidden
        */
        /**
        * @name dxDropDownListOptions.contentRender
        * @hidden
        */
        /**
        * @name dxDropDownListOptions.applyValueMode
        * @hidden
        */
      }));
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: {
          platform: 'ios'
        },
        options: {
          popupPosition: {
            offset: {
              v: -1
            }
          }
        }
      }, {
        device: {
          platform: 'generic'
        },
        options: {
          buttonsLocation: 'bottom center'
        }
      }]);
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        value: true,
        selectedItem: true,
        displayValue: true
      });
    },
    _init: function _init() {
      this.callBase();
      this._initDataExpressions();
      this._initActions();
      this._setListDataSource();
      this._validateSearchMode();
      this._clearSelectedItem();
      this._initItems();
    },
    _setListFocusedElementOptionChange: function _setListFocusedElementOptionChange() {
      this._list._updateParentActiveDescendant = this._updateActiveDescendant.bind(this);
    },
    _initItems: function _initItems() {
      var items = this.option().items;
      if (items && !items.length && this._dataSource) {
        this.option().items = this._dataSource.items();
      }
    },
    _initActions: function _initActions() {
      this._initContentReadyAction();
      this._initSelectionChangedAction();
      this._initItemClickAction();
    },
    _initContentReadyAction: function _initContentReadyAction() {
      this._contentReadyAction = this._createActionByOption('onContentReady', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _initSelectionChangedAction: function _initSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption('onSelectionChanged', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _initItemClickAction: function _initItemClickAction() {
      this._itemClickAction = this._createActionByOption('onItemClick');
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      this._templateManager.addDefaultTemplates({
        item: new _child_default_template.ChildDefaultTemplate('item')
      });
    },
    _isEditable: function _isEditable() {
      return this.callBase() || this.option('searchEnabled');
    },
    _saveFocusOnWidget: function _saveFocusOnWidget(e) {
      if (this._list && this._list.initialOption('focusStateEnabled')) {
        this._focusInput();
      }
    },
    _fitIntoRange: function _fitIntoRange(value, start, end) {
      if (value > end) {
        return start;
      }
      if (value < start) {
        return end;
      }
      return value;
    },
    _items: function _items() {
      var items = this._getPlainItems(!this._list && this._dataSource.items());
      var availableItems = new _query.default(items).filter('disabled', '<>', true).toArray();
      return availableItems;
    },
    _calcNextItem: function _calcNextItem(step) {
      var items = this._items();
      var nextIndex = this._fitIntoRange(this._getSelectedIndex() + step, 0, items.length - 1);
      return items[nextIndex];
    },
    _getSelectedIndex: function _getSelectedIndex() {
      var items = this._items();
      var selectedItem = this.option('selectedItem');
      var result = -1;
      (0, _iterator.each)(items, function (index, item) {
        if (this._isValueEquals(item, selectedItem)) {
          result = index;
          return false;
        }
      }.bind(this));
      return result;
    },
    _createPopup: function _createPopup() {
      this.callBase();
      this._updateCustomBoundaryContainer();
      this._popup.$wrapper().addClass(this._popupWrapperClass());
      var $popupContent = this._popup.$content();
      _events_engine.default.off($popupContent, 'mouseup');
      _events_engine.default.on($popupContent, 'mouseup', this._saveFocusOnWidget.bind(this));
    },
    _updateCustomBoundaryContainer: function _updateCustomBoundaryContainer() {
      var customContainer = this.option('dropDownOptions.container');
      var $container = customContainer && (0, _renderer.default)(customContainer);
      if ($container && $container.length && !(0, _type.isWindow)($container.get(0))) {
        var $containerWithParents = [].slice.call($container.parents());
        $containerWithParents.unshift($container.get(0));
        (0, _iterator.each)($containerWithParents, function (i, parent) {
          if (parent === (0, _renderer.default)('body').get(0)) {
            return false;
          } else if (window.getComputedStyle(parent).overflowY === 'hidden') {
            this._$customBoundaryContainer = (0, _renderer.default)(parent);
            return false;
          }
        }.bind(this));
      }
    },
    _popupWrapperClass: function _popupWrapperClass() {
      return DROPDOWNLIST_POPUP_WRAPPER_CLASS;
    },
    _renderInputValue: function _renderInputValue() {
      var value = this._getCurrentValue();
      this._rejectValueLoading();
      return this._loadInputValue(value, this._setSelectedItem.bind(this)).always(this.callBase.bind(this, value));
    },
    _loadInputValue: function _loadInputValue(value, callback) {
      return this._loadItem(value).always(callback);
    },
    _getItemFromPlain: function _getItemFromPlain(value, cache) {
      var plainItems;
      var selectedItem;
      if (cache && _typeof(value) !== 'object') {
        if (!cache.itemByValue) {
          cache.itemByValue = {};
          plainItems = this._getPlainItems();
          plainItems.forEach(function (item) {
            cache.itemByValue[this._valueGetter(item)] = item;
          }, this);
        }
        selectedItem = cache.itemByValue[value];
      }
      if (!selectedItem) {
        plainItems = this._getPlainItems();
        selectedItem = (0, _common.grep)(plainItems, function (item) {
          return this._isValueEquals(this._valueGetter(item), value);
        }.bind(this))[0];
      }
      return selectedItem;
    },
    _loadItem: function _loadItem(value, cache) {
      var selectedItem = this._getItemFromPlain(value, cache);
      return selectedItem !== undefined ? new _deferred.Deferred().resolve(selectedItem).promise() : this._loadValue(value);
    },
    _getPlainItems: function _getPlainItems(items) {
      var plainItems = [];
      items = items || this.option('items') || this._dataSource.items() || [];
      for (var i = 0; i < items.length; i++) {
        if (items[i] && items[i].items) {
          plainItems = plainItems.concat(items[i].items);
        } else {
          plainItems.push(items[i]);
        }
      }
      return plainItems;
    },
    _updateActiveDescendant: function _updateActiveDescendant() {
      var _this$_list;
      var opened = this.option('opened');
      var listFocusedItemId = (_this$_list = this._list) === null || _this$_list === void 0 ? void 0 : _this$_list.getFocusedItemId();
      var isElementOnDom = (0, _renderer.default)("#".concat(listFocusedItemId)).length > 0;
      var activedescendant = opened && isElementOnDom && listFocusedItemId;
      this.setAria({
        'activedescendant': activedescendant || null
      });
    },
    _setSelectedItem: function _setSelectedItem(item) {
      var displayValue = this._displayValue(item);
      this.option('selectedItem', (0, _common.ensureDefined)(item, null));
      this.option('displayValue', displayValue);
    },
    _displayValue: function _displayValue(item) {
      return this._displayGetter(item);
    },
    _refreshSelected: function _refreshSelected() {
      var cache = {};
      this._listItemElements().each(function (_, itemElement) {
        var $itemElement = (0, _renderer.default)(itemElement);
        var itemValue = this._valueGetter($itemElement.data(LIST_ITEM_DATA_KEY));
        var isItemSelected = this._isSelectedValue(itemValue, cache);
        if (isItemSelected) {
          this._list.selectItem($itemElement);
        } else {
          this._list.unselectItem($itemElement);
        }
      }.bind(this));
    },
    _popupShownHandler: function _popupShownHandler() {
      this.callBase();
      this._setFocusPolicy();
    },
    _setFocusPolicy: function _setFocusPolicy() {
      if (!this.option('focusStateEnabled') || !this._list) {
        return;
      }
      this._list.option('focusedElement', null);
    },
    _isSelectedValue: function _isSelectedValue(value) {
      return this._isValueEquals(value, this.option('value'));
    },
    _validateSearchMode: function _validateSearchMode() {
      var searchMode = this.option('searchMode');
      var normalizedSearchMode = searchMode.toLowerCase();
      if (!SEARCH_MODES.includes(normalizedSearchMode)) {
        throw _ui2.default.Error('E1019', searchMode);
      }
    },
    _clearSelectedItem: function _clearSelectedItem() {
      this.option('selectedItem', null);
    },
    _processDataSourceChanging: function _processDataSourceChanging() {
      this._initDataController();
      this._setListOption('_dataController', this._dataController);
      this._setListDataSource();
      this._renderInputValue().fail(function () {
        if (this._isCustomValueAllowed()) {
          return;
        }
        this._clearSelectedItem();
      }.bind(this));
    },
    _isCustomValueAllowed: function _isCustomValueAllowed() {
      return this.option('displayCustomValue');
    },
    reset: function reset() {
      this.callBase();
      this._clearFilter();
      this._clearSelectedItem();
    },
    _listItemElements: function _listItemElements() {
      return this._$list ? this._$list.find(LIST_ITEM_SELECTOR) : (0, _renderer.default)();
    },
    _popupConfig: function _popupConfig() {
      return (0, _extend.extend)(this.callBase(), {
        templatesRenderAsynchronously: false,
        autoResizeEnabled: false,
        maxHeight: this._getMaxHeight.bind(this)
      });
    },
    _renderPopupContent: function _renderPopupContent() {
      this.callBase();
      this._renderList();
    },
    _getKeyboardListeners: function _getKeyboardListeners() {
      var canListHaveFocus = this._canListHaveFocus();
      return this.callBase().concat([!canListHaveFocus && this._list]);
    },
    _renderList: function _renderList() {
      this._listId = 'dx-' + new _guid.default()._value;
      var $list = (0, _renderer.default)('<div>').attr('id', this._listId).appendTo(this._popup.$content());
      this._$list = $list;
      this._list = this._createComponent($list, _list_light.default, this._listConfig());
      this._refreshList();
      this._renderPreventBlurOnListClick();
      this._setListFocusedElementOptionChange();
    },
    _renderPreventBlurOnListClick: function _renderPreventBlurOnListClick() {
      var eventName = (0, _index.addNamespace)('mousedown', 'dxDropDownList');
      _events_engine.default.off(this._$list, eventName);
      _events_engine.default.on(this._$list, eventName, function (e) {
        return e.preventDefault();
      });
    },
    _getControlsAria: function _getControlsAria() {
      return this._list && this._listId;
    },
    _renderOpenedState: function _renderOpenedState() {
      this.callBase();
      this._list && this._updateActiveDescendant();
      this.setAria('owns', this._popup && this._popupContentId);
    },
    _setDefaultAria: function _setDefaultAria() {
      this.setAria({
        'haspopup': 'listbox',
        'autocomplete': 'list'
      });
    },
    _refreshList: function _refreshList() {
      if (this._list && this._shouldRefreshDataSource()) {
        this._setListDataSource();
      }
    },
    _shouldRefreshDataSource: function _shouldRefreshDataSource() {
      var dataSourceProvided = !!this._list.option('dataSource');
      return dataSourceProvided !== this._needPassDataSourceToList();
    },
    _isDesktopDevice: function _isDesktopDevice() {
      return _devices.default.real().deviceType === 'desktop';
    },
    _listConfig: function _listConfig() {
      var options = {
        selectionMode: 'single',
        _templates: this.option('_templates'),
        templateProvider: this.option('templateProvider'),
        noDataText: this.option('noDataText'),
        encodeNoDataText: this.option('encodeNoDataText'),
        grouped: this.option('grouped'),
        wrapItemText: this.option('wrapItemText'),
        useItemTextAsTitle: this.option('useItemTextAsTitle'),
        onContentReady: this._listContentReadyHandler.bind(this),
        itemTemplate: this.option('itemTemplate'),
        indicateLoading: false,
        keyExpr: this._getCollectionKeyExpr(),
        displayExpr: this._displayGetterExpr(),
        groupTemplate: this.option('groupTemplate'),
        onItemClick: this._listItemClickAction.bind(this),
        dataSource: this._getDataSource(),
        _dataController: this._dataController,
        hoverStateEnabled: this._isDesktopDevice() ? this.option('hoverStateEnabled') : false,
        focusStateEnabled: this._isDesktopDevice() ? this.option('focusStateEnabled') : false
      };
      if (!this._canListHaveFocus()) {
        options.tabIndex = null;
      }
      return options;
    },
    _canListHaveFocus: function _canListHaveFocus() {
      return false;
    },
    _getDataSource: function _getDataSource() {
      return this._needPassDataSourceToList() ? this._dataSource : null;
    },
    _dataSourceOptions: function _dataSourceOptions() {
      return {
        paginate: false
      };
    },
    _getGroupedOption: function _getGroupedOption() {
      return this.option('grouped');
    },
    _dataSourceFromUrlLoadMode: function _dataSourceFromUrlLoadMode() {
      return 'raw';
    },
    _listContentReadyHandler: function _listContentReadyHandler() {
      this._list = this._list || this._$list.dxList('instance');
      if (!this.option('deferRendering')) {
        this._refreshSelected();
      }
      this._updatePopupWidth();
      this._updateListDimensions();
      this._contentReadyAction();
    },
    _setListOption: function _setListOption(optionName, value) {
      this._setWidgetOption('_list', arguments);
    },
    _listItemClickAction: function _listItemClickAction(e) {
      this._listItemClickHandler(e);
      this._itemClickAction(e);
    },
    _listItemClickHandler: _common.noop,
    _setListDataSource: function _setListDataSource() {
      if (!this._list) {
        return;
      }
      this._setListOption('dataSource', this._getDataSource());
      if (!this._needPassDataSourceToList()) {
        this._setListOption('items', []);
      }
    },
    _needPassDataSourceToList: function _needPassDataSourceToList() {
      return this.option('showDataBeforeSearch') || this._isMinSearchLengthExceeded();
    },
    _isMinSearchLengthExceeded: function _isMinSearchLengthExceeded() {
      return this._searchValue().toString().length >= this.option('minSearchLength');
    },
    _needClearFilter: function _needClearFilter() {
      return this._canKeepDataSource() ? false : this._needPassDataSourceToList();
    },
    _canKeepDataSource: function _canKeepDataSource() {
      var isMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
      return this._dataController.isLoaded() && this.option('showDataBeforeSearch') && this.option('minSearchLength') && !isMinSearchLengthExceeded && !this._isLastMinSearchLengthExceeded;
    },
    _searchValue: function _searchValue() {
      return this._input().val() || '';
    },
    _getSearchEvent: function _getSearchEvent() {
      return (0, _index.addNamespace)(SEARCH_EVENT, this.NAME + 'Search');
    },
    _getCompositionStartEvent: function _getCompositionStartEvent() {
      return (0, _index.addNamespace)('compositionstart', this.NAME + 'CompositionStart');
    },
    _getCompositionEndEvent: function _getCompositionEndEvent() {
      return (0, _index.addNamespace)('compositionend', this.NAME + 'CompositionEnd');
    },
    _getSetFocusPolicyEvent: function _getSetFocusPolicyEvent() {
      return (0, _index.addNamespace)('input', this.NAME + 'FocusPolicy');
    },
    _renderEvents: function _renderEvents() {
      var _this = this;
      this.callBase();
      _events_engine.default.on(this._input(), this._getSetFocusPolicyEvent(), function () {
        _this._setFocusPolicy();
      });
      if (this._shouldRenderSearchEvent()) {
        _events_engine.default.on(this._input(), this._getSearchEvent(), function (e) {
          _this._searchHandler(e);
        });
        if (useCompositionEvents) {
          _events_engine.default.on(this._input(), this._getCompositionStartEvent(), function () {
            _this._isTextCompositionInProgress(true);
          });
          _events_engine.default.on(this._input(), this._getCompositionEndEvent(), function (e) {
            _this._isTextCompositionInProgress(undefined);
            _this._searchHandler(e, _this._searchValue());
          });
        }
      }
    },
    _shouldRenderSearchEvent: function _shouldRenderSearchEvent() {
      return this.option('searchEnabled');
    },
    _refreshEvents: function _refreshEvents() {
      _events_engine.default.off(this._input(), this._getSearchEvent());
      _events_engine.default.off(this._input(), this._getSetFocusPolicyEvent());
      if (useCompositionEvents) {
        _events_engine.default.off(this._input(), this._getCompositionStartEvent());
        _events_engine.default.off(this._input(), this._getCompositionEndEvent());
      }
      this.callBase();
    },
    _isTextCompositionInProgress: function _isTextCompositionInProgress(value) {
      if (arguments.length) {
        this._isTextComposition = value;
      } else {
        return this._isTextComposition;
      }
    },
    _searchHandler: function _searchHandler(e, searchValue) {
      var _this2 = this;
      if (this._isTextCompositionInProgress()) {
        return;
      }
      if (!this._isMinSearchLengthExceeded()) {
        this._searchCanceled();
        return;
      }
      var searchTimeout = this.option('searchTimeout');
      if (searchTimeout) {
        this._clearSearchTimer();
        this._searchTimer = setTimeout(function () {
          _this2._searchDataSource(searchValue);
        }, searchTimeout);
      } else {
        this._searchDataSource(searchValue);
      }
    },
    _searchCanceled: function _searchCanceled() {
      this._clearSearchTimer();
      if (this._needClearFilter()) {
        this._filterDataSource(null);
      }
      this._refreshList();
    },
    _searchDataSource: function _searchDataSource() {
      var searchValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._searchValue();
      this._filterDataSource(searchValue);
    },
    _filterDataSource: function _filterDataSource(searchValue) {
      this._clearSearchTimer();
      var dataController = this._dataController;
      dataController.searchExpr(this.option('searchExpr') || this._displayGetterExpr());
      dataController.searchOperation(this.option('searchMode'));
      dataController.searchValue(searchValue);
      dataController.load().done(this._dataSourceFiltered.bind(this, searchValue));
    },
    _clearFilter: function _clearFilter() {
      var dataController = this._dataController;
      dataController.searchValue() && dataController.searchValue(null);
    },
    _dataSourceFiltered: function _dataSourceFiltered() {
      this._isLastMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
      this._refreshList();
      this._refreshPopupVisibility();
    },
    _shouldOpenPopup: function _shouldOpenPopup() {
      return this._hasItemsToShow();
    },
    _refreshPopupVisibility: function _refreshPopupVisibility() {
      if (this.option('readOnly') || !this._searchValue()) {
        return;
      }
      var shouldOpenPopup = this._shouldOpenPopup();
      if (shouldOpenPopup && !this._isFocused()) {
        return;
      }
      this.option('opened', shouldOpenPopup);
      if (shouldOpenPopup) {
        this._updatePopupWidth();
        this._updateListDimensions();
      }
    },
    _dataSourceChangedHandler: function _dataSourceChangedHandler(newItems) {
      if (this._dataController.pageIndex() === 0) {
        this.option().items = newItems;
      } else {
        this.option().items = this.option().items.concat(newItems);
      }
    },
    _hasItemsToShow: function _hasItemsToShow() {
      var dataController = this._dataController;
      var resultItems = dataController.items() || [];
      var resultAmount = resultItems.length;
      var isMinSearchLengthExceeded = this._needPassDataSourceToList();
      return !!(isMinSearchLengthExceeded && resultAmount);
    },
    _clearSearchTimer: function _clearSearchTimer() {
      clearTimeout(this._searchTimer);
      delete this._searchTimer;
    },
    _popupShowingHandler: function _popupShowingHandler() {
      this._updatePopupWidth();
      this._updateListDimensions();
    },
    _dimensionChanged: function _dimensionChanged() {
      this.callBase();
      this._updateListDimensions();
    },
    _needPopupRepaint: function _needPopupRepaint() {
      var dataController = this._dataController;
      var currentPageIndex = dataController.pageIndex();
      var needRepaint = (0, _type.isDefined)(this._pageIndex) && currentPageIndex <= this._pageIndex || dataController.isLastPage() && !this._list._scrollViewIsFull();
      this._pageIndex = currentPageIndex;
      return needRepaint;
    },
    _updateListDimensions: function _updateListDimensions() {
      if (!this._popup) {
        return;
      }
      if (this._needPopupRepaint()) {
        this._popup.repaint();
      }
      this._list && this._list.updateDimensions();
    },
    _getMaxHeight: function _getMaxHeight() {
      var $element = this.$element();
      var $customBoundaryContainer = this._$customBoundaryContainer;
      var offsetTop = $element.offset().top - ($customBoundaryContainer ? $customBoundaryContainer.offset().top : 0);
      var windowHeight = (0, _size.getOuterHeight)(window);
      var containerHeight = $customBoundaryContainer ? Math.min((0, _size.getOuterHeight)($customBoundaryContainer), windowHeight) : windowHeight;
      var maxHeight = Math.max(offsetTop, containerHeight - offsetTop - (0, _size.getOuterHeight)($element));
      return Math.min(containerHeight * 0.5, maxHeight);
    },
    _clean: function _clean() {
      if (this._list) {
        delete this._list;
      }
      delete this._isLastMinSearchLengthExceeded;
      this.callBase();
    },
    _dispose: function _dispose() {
      this._clearSearchTimer();
      this.callBase();
    },
    _setCollectionWidgetOption: function _setCollectionWidgetOption() {
      this._setListOption.apply(this, arguments);
    },
    _setSubmitValue: function _setSubmitValue() {
      var value = this.option('value');
      var submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
      this._getSubmitElement().val(submitValue);
    },
    _shouldUseDisplayValue: function _shouldUseDisplayValue(value) {
      return this.option('valueExpr') === 'this' && (0, _type.isObject)(value);
    },
    _optionChanged: function _optionChanged(args) {
      this._dataExpressionOptionChanged(args);
      switch (args.name) {
        case 'hoverStateEnabled':
        case 'focusStateEnabled':
          this._isDesktopDevice() && this._setListOption(args.name, args.value);
          this.callBase(args);
          break;
        case 'items':
          if (!this.option('dataSource')) {
            this._processDataSourceChanging();
          }
          break;
        case 'dataSource':
          this._processDataSourceChanging();
          break;
        case 'valueExpr':
          this._renderValue();
          this._setListOption('keyExpr', this._getCollectionKeyExpr());
          break;
        case 'displayExpr':
          this._renderValue();
          this._setListOption('displayExpr', this._displayGetterExpr());
          break;
        case 'searchMode':
          this._validateSearchMode();
          break;
        case 'minSearchLength':
          this._refreshList();
          break;
        case 'searchEnabled':
        case 'showDataBeforeSearch':
        case 'searchExpr':
          this._invalidate();
          break;
        case 'onContentReady':
          this._initContentReadyAction();
          break;
        case 'onSelectionChanged':
          this._initSelectionChangedAction();
          break;
        case 'onItemClick':
          this._initItemClickAction();
          break;
        case 'grouped':
        case 'groupTemplate':
        case 'wrapItemText':
        case 'noDataText':
        case 'encodeNoDataText':
        case 'useItemTextAsTitle':
          this._setListOption(args.name);
          break;
        case 'displayValue':
          this.option('text', args.value);
          break;
        case 'itemTemplate':
        case 'searchTimeout':
          break;
        case 'selectedItem':
          if (args.previousValue !== args.value) {
            this._selectionChangedAction({
              selectedItem: args.value
            });
          }
          break;
        default:
          this.callBase(args);
      }
    }
  }).include(_ui3.default, _grouped_data_converter_mixin.default);
  (0, _component_registrator.default)('dxDropDownList', DropDownList);
  var _default = DropDownList;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/window","../../events/core/events_engine","../../core/guid","../../core/component_registrator","../../core/utils/common","../../core/utils/type","../../core/utils/extend","./ui.drop_down_editor","../list_light","../widget/ui.errors","../../events/utils/index","../../core/devices","../../data/query","../../core/utils/iterator","../editor/ui.data_expression","../../localization/message","../../core/templates/child_default_template","../../core/utils/deferred","../shared/grouped_data_converter_mixin"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/window"), require("../../events/core/events_engine"), require("../../core/guid"), require("../../core/component_registrator"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("./ui.drop_down_editor"), require("../list_light"), require("../widget/ui.errors"), require("../../events/utils/index"), require("../../core/devices"), require("../../data/query"), require("../../core/utils/iterator"), require("../editor/ui.data_expression"), require("../../localization/message"), require("../../core/templates/child_default_template"), require("../../core/utils/deferred"), require("../shared/grouped_data_converter_mixin"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.drop_down_list.js.map