!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/drop_down_button.js"], ["../core/renderer","./widget/ui.widget","../core/templates/function_template","../core/component_registrator","./button_group","./popup/ui.popup","./list_light","../core/utils/data","../core/element","../core/utils/icon","../data_helper","../data/data_source/data_source","../data/array_store","../core/utils/deferred","../core/utils/extend","../core/utils/type","../core/utils/common","../core/guid","./drop_down_editor/utils","../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/drop_down_button.js", ["../core/renderer", "./widget/ui.widget", "../core/templates/function_template", "../core/component_registrator", "./button_group", "./popup/ui.popup", "./list_light", "../core/utils/data", "../core/element", "../core/utils/icon", "../data_helper", "../data/data_source/data_source", "../data/array_store", "../core/utils/deferred", "../core/utils/extend", "../core/utils/type", "../core/utils/common", "../core/guid", "./drop_down_editor/utils", "../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _function_template = $__require("../core/templates/function_template");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _button_group = _interopRequireDefault($__require("./button_group"));
  var _ui2 = _interopRequireDefault($__require("./popup/ui.popup"));
  var _list_light = _interopRequireDefault($__require("./list_light"));
  var _data = $__require("../core/utils/data");
  var _element = $__require("../core/element");
  var _icon = $__require("../core/utils/icon");
  var _data_helper = _interopRequireDefault($__require("../data_helper"));
  var _data_source = $__require("../data/data_source/data_source");
  var _array_store = _interopRequireDefault($__require("../data/array_store"));
  var _deferred = $__require("../core/utils/deferred");
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _common = $__require("../core/utils/common");
  var _guid = _interopRequireDefault($__require("../core/guid"));
  var _utils = $__require("./drop_down_editor/utils");
  var _message = _interopRequireDefault($__require("../localization/message"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  // STYLE dropDownButton

  var DROP_DOWN_BUTTON_CLASS = 'dx-dropdownbutton';
  var DROP_DOWN_BUTTON_CONTENT = 'dx-dropdownbutton-content';
  var DROP_DOWN_BUTTON_ACTION_CLASS = 'dx-dropdownbutton-action';
  var DROP_DOWN_BUTTON_TOGGLE_CLASS = 'dx-dropdownbutton-toggle';
  var DROP_DOWN_BUTTON_HAS_ARROW_CLASS = 'dx-dropdownbutton-has-arrow';
  var DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS = 'dx-dropdownbutton-popup-wrapper';
  var DROP_DOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
  var DX_BUTTON_CLASS = 'dx-button';
  var DX_BUTTON_TEXT_CLASS = 'dx-button-text';
  var DX_ICON_RIGHT_CLASS = 'dx-icon-right';
  var DropDownButton = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
         * @name dxDropDownButtonItem.key
         * @hidden
         */
        /**
         * @name dxDropDownButtonItem.showChevron
         * @hidden
         */

        itemTemplate: 'item',
        keyExpr: 'this',
        displayExpr: undefined,
        selectedItem: null,
        selectedItemKey: null,
        stylingMode: 'outlined',
        deferRendering: true,
        noDataText: _message.default.format('dxCollectionWidget-noDataText'),
        useSelectMode: false,
        splitButton: false,
        showArrowIcon: true,
        text: '',
        icon: undefined,
        onButtonClick: null,
        onSelectionChanged: null,
        onItemClick: null,
        opened: false,
        items: null,
        dataSource: null,
        focusStateEnabled: true,
        hoverStateEnabled: true,
        dropDownOptions: {},
        dropDownContentTemplate: 'content',
        wrapItemText: false,
        useItemTextAsTitle: true,
        grouped: false,
        groupTemplate: 'group',
        buttonGroupOptions: {}
      });
    },
    _setOptionsByReference: function _setOptionsByReference() {
      this.callBase();
      (0, _extend.extend)(this._optionsByReference, {
        selectedItem: true
      });
    },
    _init: function _init() {
      this.callBase();
      this._createItemClickAction();
      this._createActionClickAction();
      this._createSelectionChangedAction();
      this._initDataSource();
      this._compileKeyGetter();
      this._compileDisplayGetter();
      this._itemsToDataSource(this.option('items'));
      this._options.cache('buttonGroupOptions', this.option('buttonGroupOptions'));
      this._options.cache('dropDownOptions', this.option('dropDownOptions'));
    },
    _initTemplates: function _initTemplates() {
      var _this = this;
      this._templateManager.addDefaultTemplates({
        content: new _function_template.FunctionTemplate(function (options) {
          var $popupContent = (0, _renderer.default)(options.container);
          var $listContainer = (0, _renderer.default)('<div>').appendTo($popupContent);
          _this._list = _this._createComponent($listContainer, _list_light.default, _this._listOptions());
          _this._list.registerKeyHandler('escape', _this._escHandler.bind(_this));
          _this._list.registerKeyHandler('tab', _this._escHandler.bind(_this));
          _this._list.registerKeyHandler('leftArrow', _this._escHandler.bind(_this));
          _this._list.registerKeyHandler('rightArrow', _this._escHandler.bind(_this));
        })
      });
      this.callBase();
    },
    _itemsToDataSource: function _itemsToDataSource(value) {
      if (!this._dataSource) {
        this._dataSource = new _data_source.DataSource({
          store: new _array_store.default({
            key: this._getKey(),
            data: value
          }),
          pageSize: 0
        });
      }
    },
    _getKey: function _getKey() {
      var _this$_dataSource;
      var keyExpr = this.option('keyExpr');
      var storeKey = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.key();
      return (0, _type.isDefined)(storeKey) && (!(0, _type.isDefined)(keyExpr) || keyExpr === 'this') ? storeKey : keyExpr;
    },
    _compileKeyGetter: function _compileKeyGetter() {
      this._keyGetter = (0, _data.compileGetter)(this._getKey());
    },
    _compileDisplayGetter: function _compileDisplayGetter() {
      this._displayGetter = (0, _data.compileGetter)(this.option('displayExpr'));
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this.$element().addClass(DROP_DOWN_BUTTON_CLASS);
      this._renderButtonGroup();
      this._updateArrowClass();
      if ((0, _type.isDefined)(this.option('selectedItemKey'))) {
        this._loadSelectedItem().done(this._updateActionButton.bind(this));
      }
    },
    // T977758
    _renderFocusTarget: _common.noop,
    _render: function _render() {
      if (!this.option('deferRendering') || this.option('opened')) {
        this._renderPopup();
      }
      this.callBase();
    },
    _renderContentImpl: function _renderContentImpl() {
      if (this._popup) {
        this._renderPopupContent();
      }
      return this.callBase();
    },
    _loadSelectedItem: function _loadSelectedItem() {
      var _this$_loadSingleDefe;
      (_this$_loadSingleDefe = this._loadSingleDeferred) === null || _this$_loadSingleDefe === void 0 ? void 0 : _this$_loadSingleDefe.reject();
      var d = new _deferred.Deferred();
      if (this._list && this._lastSelectedItemData !== undefined) {
        var cachedResult = this.option('useSelectMode') ? this._list.option('selectedItem') : this._lastSelectedItemData;
        return d.resolve(cachedResult);
      }
      this._lastSelectedItemData = undefined;
      var selectedItemKey = this.option('selectedItemKey');
      this._loadSingle(this._getKey(), selectedItemKey).done(d.resolve).fail(function () {
        d.resolve(null);
      });
      this._loadSingleDeferred = d;
      return d.promise();
    },
    _createActionClickAction: function _createActionClickAction() {
      this._actionClickAction = this._createActionByOption('onButtonClick');
    },
    _createSelectionChangedAction: function _createSelectionChangedAction() {
      this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
    },
    _createItemClickAction: function _createItemClickAction() {
      this._itemClickAction = this._createActionByOption('onItemClick');
    },
    _fireSelectionChangedAction: function _fireSelectionChangedAction(_ref) {
      var previousValue = _ref.previousValue,
          value = _ref.value;
      this._selectionChangedAction({
        item: value,
        previousItem: previousValue
      });
    },
    _fireItemClickAction: function _fireItemClickAction(_ref2) {
      var event = _ref2.event,
          itemElement = _ref2.itemElement,
          itemData = _ref2.itemData;
      return this._itemClickAction({
        event: event,
        itemElement: itemElement,
        itemData: this._actionItem || itemData
      });
    },
    _actionButtonConfig: function _actionButtonConfig() {
      return {
        text: this.option('text'),
        icon: this.option('icon'),
        elementAttr: {
          class: DROP_DOWN_BUTTON_ACTION_CLASS
        }
      };
    },
    _getButtonGroupItems: function _getButtonGroupItems() {
      var items = [];
      items.push(this._actionButtonConfig());
      if (this.option('splitButton')) {
        items.push({
          icon: 'spindown',
          elementAttr: {
            class: DROP_DOWN_BUTTON_TOGGLE_CLASS
          }
        });
      }
      return items;
    },
    _buttonGroupItemClick: function _buttonGroupItemClick(_ref3) {
      var event = _ref3.event,
          itemData = _ref3.itemData;
      var isActionButton = itemData.elementAttr.class === DROP_DOWN_BUTTON_ACTION_CLASS;
      var isToggleButton = itemData.elementAttr.class === DROP_DOWN_BUTTON_TOGGLE_CLASS;
      if (isToggleButton) {
        this.toggle();
      } else if (isActionButton) {
        this._actionClickAction({
          event: event,
          selectedItem: this.option('selectedItem')
        });
        if (!this.option('splitButton')) {
          this.toggle();
        }
      }
    },
    _buttonGroupOptions: function _buttonGroupOptions() {
      var _this2 = this;
      var _this$option = this.option(),
          splitButton = _this$option.splitButton,
          showArrowIcon = _this$option.showArrowIcon,
          focusStateEnabled = _this$option.focusStateEnabled,
          hoverStateEnabled = _this$option.hoverStateEnabled,
          stylingMode = _this$option.stylingMode,
          accessKey = _this$option.accessKey,
          tabIndex = _this$option.tabIndex;
      var buttonTemplate = splitButton || !showArrowIcon ? 'content' : function (_ref4, buttonContent) {
        var text = _ref4.text,
            icon = _ref4.icon;
        var $firstIcon = (0, _icon.getImageContainer)(icon);
        var $textContainer = text ? (0, _renderer.default)('<span>').text(text).addClass(DX_BUTTON_TEXT_CLASS) : undefined;
        var $secondIcon = (0, _icon.getImageContainer)('spindown').addClass(DX_ICON_RIGHT_CLASS);
        (0, _renderer.default)(buttonContent).append($firstIcon, $textContainer, $secondIcon);
      };
      return (0, _extend.extend)({
        items: this._getButtonGroupItems(),
        onItemClick: this._buttonGroupItemClick.bind(this),
        width: '100%',
        height: '100%',
        selectionMode: 'none',
        onKeyboardHandled: function onKeyboardHandled(e) {
          return _this2._keyboardHandler(e);
        },
        buttonTemplate: buttonTemplate,
        focusStateEnabled: focusStateEnabled,
        hoverStateEnabled: hoverStateEnabled,
        stylingMode: stylingMode,
        accessKey: accessKey,
        tabIndex: tabIndex
      }, this._options.cache('buttonGroupOptions'));
    },
    _renderPopupContent: function _renderPopupContent() {
      var $content = this._popup.$content();
      var template = this._getTemplateByOption('dropDownContentTemplate');
      $content.empty();
      this._popupContentId = 'dx-' + new _guid.default();
      this.setAria('id', this._popupContentId, $content);
      return template.render({
        container: (0, _element.getPublicElement)($content),
        model: this.option('items') || this._dataSource
      });
    },
    _popupOptions: function _popupOptions() {
      var _this3 = this;
      var horizontalAlignment = this.option('rtlEnabled') ? 'right' : 'left';
      return (0, _extend.extend)({
        dragEnabled: false,
        focusStateEnabled: false,
        deferRendering: this.option('deferRendering'),
        hideOnOutsideClick: function hideOnOutsideClick(e) {
          var $element = _this3.$element();
          var $buttonClicked = (0, _renderer.default)(e.target).closest(".".concat(DROP_DOWN_BUTTON_CLASS));
          return !$buttonClicked.is($element);
        },
        showTitle: false,
        animation: {
          show: {
            type: 'fade',
            duration: 0,
            from: 0,
            to: 1
          },
          hide: {
            type: 'fade',
            duration: 400,
            from: 1,
            to: 0
          }
        },
        _ignoreFunctionValueDeprecation: true,
        width: function width() {
          return (0, _utils.getElementWidth)(_this3.$element());
        },
        height: 'auto',
        shading: false,
        position: {
          of: this.$element(),
          collision: 'flipfit',
          my: horizontalAlignment + ' top',
          at: horizontalAlignment + ' bottom'
        },
        _wrapperClassExternal: DROP_DOWN_EDITOR_OVERLAY_CLASS
      }, this._options.cache('dropDownOptions'), {
        visible: this.option('opened')
      });
    },
    _listOptions: function _listOptions() {
      var _this4 = this;
      var selectedItemKey = this.option('selectedItemKey');
      var useSelectMode = this.option('useSelectMode');
      return {
        selectionMode: useSelectMode ? 'single' : 'none',
        wrapItemText: this.option('wrapItemText'),
        focusStateEnabled: this.option('focusStateEnabled'),
        hoverStateEnabled: this.option('hoverStateEnabled'),
        useItemTextAsTitle: this.option('useItemTextAsTitle'),
        onContentReady: function onContentReady() {
          return _this4._fireContentReadyAction();
        },
        selectedItemKeys: (0, _type.isDefined)(selectedItemKey) && useSelectMode ? [selectedItemKey] : [],
        grouped: this.option('grouped'),
        groupTemplate: this.option('groupTemplate'),
        keyExpr: this._getKey(),
        noDataText: this.option('noDataText'),
        displayExpr: this.option('displayExpr'),
        itemTemplate: this.option('itemTemplate'),
        items: this.option('items'),
        dataSource: this._dataSource,
        onItemClick: function onItemClick(e) {
          if (!_this4.option('useSelectMode')) {
            _this4._lastSelectedItemData = e.itemData;
          }
          _this4.option('selectedItemKey', _this4._keyGetter(e.itemData));
          var actionResult = _this4._fireItemClickAction(e);
          if (actionResult !== false) {
            _this4.toggle(false);
            _this4._buttonGroup.focus();
          }
        }
      };
    },
    _upDownKeyHandler: function _upDownKeyHandler() {
      if (this._popup && this._popup.option('visible') && this._list) {
        this._list.focus();
      } else {
        this.open();
      }
      return true;
    },
    _escHandler: function _escHandler() {
      this.close();
      this._buttonGroup.focus();
      return true;
    },
    _tabHandler: function _tabHandler() {
      this.close();
      return true;
    },
    _renderPopup: function _renderPopup() {
      var $popup = (0, _renderer.default)('<div>');
      this.$element().append($popup);
      this._popup = this._createComponent($popup, _ui2.default, this._popupOptions());
      this._popup.$content().addClass(DROP_DOWN_BUTTON_CONTENT);
      this._popup.$wrapper().addClass(DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS);
      this._popup.on('hiding', this._popupHidingHandler.bind(this));
      this._popup.on('showing', this._popupShowingHandler.bind(this));
      this._bindInnerWidgetOptions(this._popup, 'dropDownOptions');
    },
    _popupHidingHandler: function _popupHidingHandler() {
      this.option('opened', false);
      this._updateAriaAttributes(false);
    },
    _popupOptionChanged: function _popupOptionChanged(args) {
      var options = _ui.default.getOptionsFromContainer(args);
      this._setPopupOption(options);
      var optionsKeys = Object.keys(options);
      if (optionsKeys.indexOf('width') !== -1 || optionsKeys.indexOf('height') !== -1) {
        this._dimensionChanged();
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      var _this5 = this;
      var popupWidth = (0, _utils.getSizeValue)(this.option('dropDownOptions.width'));
      if (popupWidth === undefined) {
        this._setPopupOption('width', function () {
          return (0, _utils.getElementWidth)(_this5.$element());
        });
      }
    },
    _setPopupOption: function _setPopupOption(optionName, value) {
      this._setWidgetOption('_popup', arguments);
    },
    _popupShowingHandler: function _popupShowingHandler() {
      this.option('opened', true);
      this._updateAriaAttributes(true);
    },
    _setElementAria: function _setElementAria(value) {
      var elementAria = {
        owns: value ? this._popupContentId : undefined
      };
      this.setAria(elementAria, this.$element());
    },
    _setButtonsAria: function _setButtonsAria(value) {
      var _this6 = this;
      var commonButtonAria = {
        expanded: value,
        haspopup: 'listbox'
      };
      var firstButtonAria = {};
      if (!this.option('text')) {
        firstButtonAria.label = 'dropdownbutton';
      }
      this._getButtons().each(function (index, $button) {
        if (index === 0) {
          _this6.setAria(_extends({}, firstButtonAria, commonButtonAria), (0, _renderer.default)($button));
        } else {
          _this6.setAria(commonButtonAria, (0, _renderer.default)($button));
        }
      });
    },
    _updateAriaAttributes: function _updateAriaAttributes(value) {
      this._setElementAria(value);
      this._setButtonsAria(value);
    },
    _getButtons: function _getButtons() {
      return this._buttonGroup.$element().find(".".concat(DX_BUTTON_CLASS));
    },
    _renderButtonGroup: function _renderButtonGroup() {
      var $buttonGroup = this._buttonGroup && this._buttonGroup.$element() || (0, _renderer.default)('<div>');
      if (!this._buttonGroup) {
        this.$element().append($buttonGroup);
      }
      this._buttonGroup = this._createComponent($buttonGroup, _button_group.default, this._buttonGroupOptions());
      this._buttonGroup.registerKeyHandler('downArrow', this._upDownKeyHandler.bind(this));
      this._buttonGroup.registerKeyHandler('tab', this._tabHandler.bind(this));
      this._buttonGroup.registerKeyHandler('upArrow', this._upDownKeyHandler.bind(this));
      this._buttonGroup.registerKeyHandler('escape', this._escHandler.bind(this));
      this._bindInnerWidgetOptions(this._buttonGroup, 'buttonGroupOptions');
      this._updateAriaAttributes(this.option('opened'));
    },
    _updateArrowClass: function _updateArrowClass() {
      var hasArrow = this.option('splitButton') || this.option('showArrowIcon');
      this.$element().toggleClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS, hasArrow);
    },
    toggle: function toggle(visible) {
      if (!this._popup) {
        this._renderPopup();
        this._renderContent();
      }
      return this._popup.toggle(visible);
    },
    open: function open() {
      return this.toggle(true);
    },
    close: function close() {
      return this.toggle(false);
    },
    _setListOption: function _setListOption(name, value) {
      this._list && this._list.option(name, value);
    },
    _getDisplayValue: function _getDisplayValue(item) {
      var isPrimitiveItem = !(0, _type.isPlainObject)(item);
      var displayValue = isPrimitiveItem ? item : this._displayGetter(item);
      return !(0, _type.isPlainObject)(displayValue) ? String((0, _common.ensureDefined)(displayValue, '')) : '';
    },
    _updateActionButton: function _updateActionButton(selectedItem) {
      if (this.option('useSelectMode')) {
        this.option({
          text: this._getDisplayValue(selectedItem),
          icon: (0, _type.isPlainObject)(selectedItem) ? selectedItem.icon : undefined
        });
      }
      this._setOptionWithoutOptionChange('selectedItem', selectedItem);
      this._setOptionWithoutOptionChange('selectedItemKey', this._keyGetter(selectedItem));
    },
    _clean: function _clean() {
      this._list && this._list.$element().remove();
      this._popup && this._popup.$element().remove();
    },
    _selectedItemKeyChanged: function _selectedItemKeyChanged(value) {
      var _this7 = this;
      this._setListOption('selectedItemKeys', this.option('useSelectMode') && (0, _type.isDefined)(value) ? [value] : []);
      var previousItem = this.option('selectedItem');
      this._loadSelectedItem().done(function (selectedItem) {
        _this7._updateActionButton(selectedItem);
        if (_this7._displayGetter(previousItem) !== _this7._displayGetter(selectedItem)) {
          _this7._fireSelectionChangedAction({
            previousValue: previousItem,
            value: selectedItem
          });
        }
      });
    },
    _updateButtonGroup: function _updateButtonGroup(name, value) {
      this._buttonGroup.option(name, value);
      this._updateAriaAttributes(this.option('opened'));
    },
    _actionButtonOptionChanged: function _actionButtonOptionChanged(_ref5) {
      var name = _ref5.name,
          value = _ref5.value;
      var newConfig = {};
      newConfig[name] = value;
      this._updateButtonGroup('items[0]', (0, _extend.extend)({}, this._actionButtonConfig(), newConfig));
      this._popup && this._popup.repaint();
    },
    _selectModeChanged: function _selectModeChanged(value) {
      if (value) {
        this._setListOption('selectionMode', 'single');
        var selectedItemKey = this.option('selectedItemKey');
        this._setListOption('selectedItemKeys', (0, _type.isDefined)(selectedItemKey) ? [selectedItemKey] : []);
        this._selectedItemKeyChanged(this.option('selectedItemKey'));
      } else {
        this._setListOption('selectionMode', 'none');
        this.option({
          'selectedItemKey': undefined,
          'selectedItem': undefined
        });
        this._actionButtonOptionChanged({
          text: this.option('text')
        });
      }
    },
    _updateItemCollection: function _updateItemCollection(optionName) {
      var _this8 = this;
      var selectedItemKey = this.option('selectedItemKey');
      this._setListOption('selectedItem', null);
      this._setWidgetOption('_list', [optionName]);
      if ((0, _type.isDefined)(selectedItemKey)) {
        this._loadSelectedItem().done(function (selectedItem) {
          _this8._setListOption('selectedItemKeys', [selectedItemKey]);
          _this8._setListOption('selectedItem', selectedItem);
        }).fail(function (error) {
          _this8._setListOption('selectedItemKeys', []);
        }).always(this._updateActionButton.bind(this));
      }
    },
    _updateDataSource: function _updateDataSource() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._dataSource.items();
      this._dataSource = undefined;
      this._itemsToDataSource(items);
      this._updateKeyExpr();
    },
    _updateKeyExpr: function _updateKeyExpr() {
      this._compileKeyGetter();
      this._setListOption('keyExpr', this._getKey());
    },
    focus: function focus() {
      this._buttonGroup.focus();
    },
    _optionChanged: function _optionChanged(args) {
      var _this$_popup;
      var name = args.name,
          value = args.value;
      switch (name) {
        case 'useSelectMode':
          this._selectModeChanged(value);
          break;
        case 'splitButton':
          this._updateArrowClass();
          this._renderButtonGroup();
          break;
        case 'displayExpr':
          this._compileDisplayGetter();
          this._setListOption(name, value);
          this._updateActionButton(this.option('selectedItem'));
          break;
        case 'keyExpr':
          this._updateDataSource();
          break;
        case 'buttonGroupOptions':
          this._innerWidgetOptionChanged(this._buttonGroup, args);
          break;
        case 'dropDownOptions':
          if (args.fullName === 'dropDownOptions.visible') {
            break;
          }
          if (args.value.visible !== undefined) {
            delete args.value.visible;
          }
          this._popupOptionChanged(args);
          this._innerWidgetOptionChanged(this._popup, args);
          break;
        case 'opened':
          this.toggle(value);
          break;
        case 'focusStateEnabled':
        case 'hoverStateEnabled':
          this._setListOption(name, value);
          this._updateButtonGroup(name, value);
          this.callBase(args);
          break;
        case 'items':
          this._updateDataSource(this.option('items'));
          this._updateItemCollection(name);
          break;
        case 'dataSource':
          if (Array.isArray(value)) {
            this._updateDataSource(this.option('dataSource'));
          } else {
            this._initDataSource();
            this._updateKeyExpr();
          }
          this._updateItemCollection(name);
          break;
        case 'icon':
        case 'text':
          this._actionButtonOptionChanged(args);
          break;
        case 'showArrowIcon':
          this._updateArrowClass();
          this._renderButtonGroup();
          this._popup && this._popup.repaint();
          break;
        case 'width':
        case 'height':
          this.callBase(args);
          (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.repaint();
          break;
        case 'stylingMode':
          this._updateButtonGroup(name, value);
          break;
        case 'itemTemplate':
        case 'grouped':
        case 'noDataText':
        case 'groupTemplate':
        case 'wrapItemText':
        case 'useItemTextAsTitle':
          this._setListOption(name, value);
          break;
        case 'dropDownContentTemplate':
          this._renderContent();
          break;
        case 'selectedItemKey':
          this._selectedItemKeyChanged(value);
          break;
        case 'selectedItem':
          break;
        case 'onItemClick':
          this._createItemClickAction();
          break;
        case 'onButtonClick':
          this._createActionClickAction();
          break;
        case 'onSelectionChanged':
          this._createSelectionChangedAction();
          break;
        case 'deferRendering':
          this.toggle(this.option('opened'));
          break;
        case 'tabIndex':
          this._updateButtonGroup(name, value);
          break;
        default:
          this.callBase(args);
      }
    }
  }).include(_data_helper.default);
  (0, _component_registrator.default)('dxDropDownButton', DropDownButton);
  var _default = DropDownButton;
  /**
   * @name dxDropDownButtonItem
   * @inherits dxListItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./widget/ui.widget","../core/templates/function_template","../core/component_registrator","./button_group","./popup/ui.popup","./list_light","../core/utils/data","../core/element","../core/utils/icon","../data_helper","../data/data_source/data_source","../data/array_store","../core/utils/deferred","../core/utils/extend","../core/utils/type","../core/utils/common","../core/guid","./drop_down_editor/utils","../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./widget/ui.widget"), require("../core/templates/function_template"), require("../core/component_registrator"), require("./button_group"), require("./popup/ui.popup"), require("./list_light"), require("../core/utils/data"), require("../core/element"), require("../core/utils/icon"), require("../data_helper"), require("../data/data_source/data_source"), require("../data/array_store"), require("../core/utils/deferred"), require("../core/utils/extend"), require("../core/utils/type"), require("../core/utils/common"), require("../core/guid"), require("./drop_down_editor/utils"), require("../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drop_down_button.js.map