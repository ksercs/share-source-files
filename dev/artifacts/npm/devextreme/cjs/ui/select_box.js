/**
* DevExtreme (cjs/ui/select_box.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _deferred = require("../core/utils/deferred");
var _element = require("../core/element");
var _errors = _interopRequireDefault(require("../core/errors"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _message = _interopRequireDefault(require("../localization/message"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_list"));
require("./list/modules/selection");
var _index = require("../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE selectBox

var DISABLED_STATE_SELECTOR = '.dx-state-disabled';
var SELECTBOX_CLASS = 'dx-selectbox';
var SELECTBOX_POPUP_CLASS = 'dx-selectbox-popup';
var SELECTBOX_CONTAINER_CLASS = 'dx-selectbox-container';
var SELECTBOX_POPUP_WRAPPER_CLASS = 'dx-selectbox-popup-wrapper';
var SelectBox = _ui.default.inherit({
  _supportedKeys: function _supportedKeys() {
    var that = this;
    var parent = this.callBase();
    var clearSelectBox = function clearSelectBox(e) {
      var isEditable = this._isEditable();
      if (!isEditable) {
        if (this.option('showClearButton')) {
          e.preventDefault();
          this.clear();
        }
      } else if (this._valueSubstituted()) {
        this._preventFiltering = true;
      }
      this._savedTextRemoveEvent = e;
      this._preventSubstitution = true;
    };
    var searchIfNeeded = function searchIfNeeded() {
      if (that.option('searchEnabled') && that._valueSubstituted()) {
        that._searchHandler();
      }
    };
    return (0, _extend.extend)({}, parent, {
      tab: function tab() {
        if (this.option('opened') && this.option('applyValueMode') === 'instantly') {
          this._resetCaretPosition(true);
        }
        parent.tab && parent.tab.apply(this, arguments);
        this._cancelSearchIfNeed();
      },
      upArrow: function upArrow(e) {
        if (parent.upArrow.apply(this, arguments)) {
          if (!this.option('opened')) {
            this._setNextValue(e);
          }
          return true;
        }
      },
      downArrow: function downArrow(e) {
        if (parent.downArrow.apply(this, arguments)) {
          if (!this.option('opened')) {
            this._setNextValue(e);
          }
          return true;
        }
      },
      leftArrow: function leftArrow() {
        searchIfNeeded();
        parent.leftArrow && parent.leftArrow.apply(this, arguments);
      },
      rightArrow: function rightArrow() {
        searchIfNeeded();
        parent.rightArrow && parent.rightArrow.apply(this, arguments);
      },
      home: function home() {
        searchIfNeeded();
        parent.home && parent.home.apply(this, arguments);
      },
      end: function end() {
        searchIfNeeded();
        parent.end && parent.end.apply(this, arguments);
      },
      escape: function escape() {
        var result = parent.escape && parent.escape.apply(this, arguments);
        this._cancelEditing();
        return result !== null && result !== void 0 ? result : true;
      },
      enter: function enter(e) {
        var isOpened = this.option('opened');
        var inputText = this._input().val().trim();
        var isCustomText = inputText && this._list && !this._list.option('focusedElement');
        if (!inputText && (0, _type.isDefined)(this.option('value')) && this.option('allowClearing')) {
          this._saveValueChangeEvent(e);
          this.option({
            selectedItem: null,
            value: null
          });
          this.close();
        } else {
          if (this.option('acceptCustomValue')) {
            e.preventDefault();
            if (isCustomText) {
              if (isOpened) this._toggleOpenState();
              this._valueChangeEventHandler(e);
            }
            return isOpened;
          }
          if (parent.enter && parent.enter.apply(this, arguments)) {
            return isOpened;
          }
        }
      },
      space: function space(e) {
        var isOpened = this.option('opened');
        var isSearchEnabled = this.option('searchEnabled');
        var acceptCustomValue = this.option('acceptCustomValue');
        if (!isOpened || isSearchEnabled || acceptCustomValue) {
          return;
        }
        e.preventDefault();
        this._valueChangeEventHandler(e);
        return true;
      },
      backspace: clearSelectBox,
      del: clearSelectBox
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      placeholder: _message.default.format('Select'),
      fieldTemplate: null,
      customItemCreateEvent: 'change',
      valueChangeEvent: 'change',
      acceptCustomValue: false,
      onCustomItemCreating: function onCustomItemCreating(e) {
        if (!(0, _type.isDefined)(e.customItem)) {
          e.customItem = e.text;
        }
      },
      showSelectionControls: false,
      /**
      * @name dxSelectBoxOptions.allowClearing
      * @type boolean
      * @default true
      * @hidden
      */
      allowClearing: true,
      tooltipEnabled: false,
      openOnFieldClick: true,
      showDropDownButton: true,
      displayCustomValue: false,
      useHiddenSubmitElement: true
    });
  },
  _init: function _init() {
    this.callBase();
    this._initCustomItemCreatingAction();
  },
  _initMarkup: function _initMarkup() {
    this.$element().addClass(SELECTBOX_CLASS);
    this._renderTooltip();
    this.callBase();
    this._$container.addClass(SELECTBOX_CONTAINER_CLASS);
  },
  _createPopup: function _createPopup() {
    this.callBase();
    this._popup.$element().addClass(SELECTBOX_POPUP_CLASS);
    this._popup.$overlayContent().attr('tabindex', -1);
  },
  _popupWrapperClass: function _popupWrapperClass() {
    return this.callBase() + ' ' + SELECTBOX_POPUP_WRAPPER_CLASS;
  },
  _setDeprecatedOptions() {
    this.callBase();
    (0, _extend.extend)(this._deprecatedOptions, {
      'valueChangeEvent': {
        since: '22.2',
        alias: 'customItemCreateEvent'
      }
    });
  },
  _cancelEditing: function _cancelEditing() {
    if (!this.option('searchEnabled') && this._list) {
      this._focusListElement(null);
      this._updateField(this.option('selectedItem'));
    }
  },
  _renderOpenedState: function _renderOpenedState() {
    this.callBase();
    if (this.option('opened')) {
      this._scrollToSelectedItem();
      this._focusSelectedElement();
    }
  },
  _focusSelectedElement: function _focusSelectedElement() {
    var _items$indexOf;
    var searchValue = this._searchValue();
    if (!searchValue) {
      this._focusListElement(null);
      return;
    }
    var _this$option = this.option(),
      items = _this$option.items,
      selectedItem = _this$option.selectedItem;
    var $listItems = this._list._itemElements();
    var index = (_items$indexOf = items === null || items === void 0 ? void 0 : items.indexOf(selectedItem)) !== null && _items$indexOf !== void 0 ? _items$indexOf : -1;
    var focusedElement = index !== -1 && !this._isCustomItemSelected() ? $listItems.eq(index) : null;
    this._focusListElement(focusedElement);
  },
  _renderFocusedElement: function _renderFocusedElement() {
    if (!this._list) {
      return;
    }
    var searchValue = this._searchValue();
    if (!searchValue || this.option('acceptCustomValue')) {
      this._focusListElement(null);
      return;
    }
    var $listItems = this._list._itemElements();
    var focusedElement = $listItems.not(DISABLED_STATE_SELECTOR).eq(0);
    this._focusListElement(focusedElement);
  },
  _focusListElement: function _focusListElement(element) {
    this._preventInputValueRender = true;
    this._list.option('focusedElement', (0, _element.getPublicElement)(element));
    delete this._preventInputValueRender;
  },
  _scrollToSelectedItem: function _scrollToSelectedItem() {
    this._list && this._list.scrollToItem(this._list.option('selectedItem'));
  },
  _listContentReadyHandler: function _listContentReadyHandler() {
    this.callBase();
    var isPaginate = this._dataController.paginate();
    if (isPaginate && this._needPopupRepaint()) {
      return;
    }
    this._scrollToSelectedItem();
  },
  _renderValue: function _renderValue() {
    this._renderInputValue();
    this._setSubmitValue();
    return new _deferred.Deferred().resolve();
  },
  _renderInputValue: function _renderInputValue() {
    return this.callBase().always(function () {
      this._renderInputValueAsync();
    }.bind(this));
  },
  _renderInputValueAsync: function _renderInputValueAsync() {
    this._renderTooltip();
    this._renderInputValueImpl().always(function () {
      this._refreshSelected();
    }.bind(this));
  },
  _renderInputValueImpl: function _renderInputValueImpl() {
    this._renderField();
    return new _deferred.Deferred().resolve();
  },
  _setNextItem: function _setNextItem(step) {
    var item = this._calcNextItem(step);
    var value = this._valueGetter(item);
    this._setValue(value);
  },
  _setNextValue: function _setNextValue(e) {
    var dataSourceIsLoaded = this._dataController.isLoaded() ? new _deferred.Deferred().resolve() : this._dataController.load();
    dataSourceIsLoaded.done(function () {
      var selectedIndex = this._getSelectedIndex();
      var hasPages = this._dataController.pageSize();
      var isLastPage = this._dataController.isLastPage();
      var isLastItem = selectedIndex === this._items().length - 1;
      this._saveValueChangeEvent(e);
      var step = (0, _index.normalizeKeyName)(e) === 'downArrow' ? 1 : -1;
      if (hasPages && !isLastPage && isLastItem && step > 0) {
        if (!this._popup) {
          this._createPopup();
        }
        if (!this._dataController.isLoading()) {
          this._list._loadNextPage().done(this._setNextItem.bind(this, step));
        }
      } else {
        this._setNextItem(step);
      }
    }.bind(this));
  },
  _setSelectedItem: function _setSelectedItem(item) {
    var isUnknownItem = !this._isCustomValueAllowed() && item === undefined;
    this.callBase(isUnknownItem ? null : item);
    if (!isUnknownItem && (!this._isEditable() || this._isCustomItemSelected())) {
      this._setListOption('selectedItem', this.option('selectedItem'));
    }
  },
  _isCustomValueAllowed: function _isCustomValueAllowed() {
    return this.option('acceptCustomValue') || this.callBase();
  },
  _displayValue: function _displayValue(item) {
    item = !(0, _type.isDefined)(item) && this._isCustomValueAllowed() ? this.option('value') : item;
    return this.callBase(item);
  },
  _listConfig: function _listConfig() {
    var result = (0, _extend.extend)(this.callBase(), {
      pageLoadMode: 'scrollBottom',
      onSelectionChanged: this._getSelectionChangeHandler(),
      selectedItem: this.option('selectedItem'),
      onFocusedItemChanged: this._listFocusedItemChangeHandler.bind(this)
    });
    if (this.option('showSelectionControls')) {
      (0, _extend.extend)(result, {
        showSelectionControls: true,
        selectByClick: true
      });
    }
    return result;
  },
  _listFocusedItemChangeHandler: function _listFocusedItemChangeHandler(e) {
    if (this._preventInputValueRender) {
      return;
    }
    var list = e.component;
    var focusedElement = (0, _renderer.default)(list.option('focusedElement'));
    var focusedItem = list._getItemData(focusedElement);
    this._updateField(focusedItem);
  },
  _updateField: function _updateField(item) {
    var fieldTemplate = this._getTemplateByOption('fieldTemplate');
    if (!(fieldTemplate && this.option('fieldTemplate'))) {
      var text = this._displayGetter(item);
      this.option('text', text);
      this._renderDisplayText(text);
      return;
    }
    this._renderField();
  },
  _getSelectionChangeHandler: function _getSelectionChangeHandler() {
    return this.option('showSelectionControls') ? this._selectionChangeHandler.bind(this) : _common.noop;
  },
  _selectionChangeHandler: function _selectionChangeHandler(e) {
    (0, _iterator.each)(e.addedItems || [], function (_, addedItem) {
      this._setValue(this._valueGetter(addedItem));
    }.bind(this));
  },
  _getActualSearchValue: function _getActualSearchValue() {
    return this._dataController.searchValue();
  },
  _toggleOpenState: function _toggleOpenState(isVisible) {
    if (this.option('disabled')) {
      return;
    }
    isVisible = arguments.length ? isVisible : !this.option('opened');
    if (!isVisible && !this._shouldClearFilter()) {
      this._restoreInputText(true);
    }
    if (this._wasSearch() && isVisible) {
      this._wasSearch(false);
      var showDataImmediately = this.option('showDataBeforeSearch') || this._isMinSearchLengthExceeded();
      if (showDataImmediately && this._dataController.getDataSource()) {
        if (this._searchTimer) return;
        var searchValue = this._getActualSearchValue();
        searchValue && this._wasSearch(true);
        this._filterDataSource(searchValue || null);
      } else {
        this._setListOption('items', []);
      }
    }
    if (isVisible) {
      this._scrollToSelectedItem();
    }
    this.callBase(isVisible);
  },
  _renderTooltip: function _renderTooltip() {
    if (this.option('tooltipEnabled')) {
      this.$element().attr('title', this.option('displayValue'));
    }
  },
  _renderDimensions: function _renderDimensions() {
    this.callBase();
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _isValueEqualInputText: function _isValueEqualInputText() {
    var initialSelectedItem = this.option('selectedItem');
    if (initialSelectedItem === null) {
      return false;
    }
    var value = this._displayGetter(initialSelectedItem);
    var displayValue = value ? String(value) : '';
    var inputText = this._searchValue();
    return displayValue === inputText;
  },
  _popupHidingHandler: function _popupHidingHandler() {
    if (this._isValueEqualInputText()) {
      this._cancelEditing();
    }
    this.callBase();
  },
  _popupHiddenHandler: function _popupHiddenHandler() {
    this.callBase();
    if (this._shouldCancelSearch()) {
      this._wasSearch(false);
      this._searchCanceled();
      this._shouldCancelSearch(false);
    }
  },
  _restoreInputText: function _restoreInputText(saveEditingValue) {
    if (this.option('readOnly')) {
      return;
    }
    this._loadItemDeferred && this._loadItemDeferred.always(function () {
      var _this$option2 = this.option(),
        acceptCustomValue = _this$option2.acceptCustomValue,
        text = _this$option2.text,
        initialSelectedItem = _this$option2.selectedItem;
      if (acceptCustomValue) {
        if (!saveEditingValue && !this._isValueChanging) {
          this._updateField(initialSelectedItem !== null && initialSelectedItem !== void 0 ? initialSelectedItem : this._createCustomItem(text));
          this._clearFilter();
        }
        return;
      }
      if (this.option('searchEnabled')) {
        if (!this._searchValue() && this.option('allowClearing')) {
          this._clearTextValue();
          return;
        }
      }
      if (this._isValueEqualInputText()) {
        return;
      }
      this._renderInputValue().always(function (selectedItem) {
        var newSelectedItem = (0, _common.ensureDefined)(selectedItem, initialSelectedItem);
        this._setSelectedItem(newSelectedItem);
        this._updateField(newSelectedItem);
        this._clearFilter();
      }.bind(this));
    }.bind(this));
  },
  _valueChangeEventIncludesBlur: function _valueChangeEventIncludesBlur() {
    var valueChangeEvent = this.option(this._getValueChangeEventOptionName());
    return valueChangeEvent.includes('blur');
  },
  _isPreventedFocusOutEvent: function _isPreventedFocusOutEvent(e) {
    return this._preventNestedFocusEvent(e) || this._valueChangeEventIncludesBlur();
  },
  _focusOutHandler: function _focusOutHandler(e) {
    if (!this._isPreventedFocusOutEvent(e)) {
      var isOverlayTarget = this._isOverlayNestedTarget(e.relatedTarget);
      if (!isOverlayTarget) {
        this._restoreInputText();
        this._clearSearchTimer();
      }
      this._cancelSearchIfNeed(e);
    }
    e.target = this._input().get(0);
    this.callBase(e);
  },
  _cancelSearchIfNeed: function _cancelSearchIfNeed(e) {
    var _this$option3 = this.option(),
      searchEnabled = _this$option3.searchEnabled;
    var isOverlayTarget = this._isOverlayNestedTarget(e === null || e === void 0 ? void 0 : e.relatedTarget);
    var shouldCancelSearch = this._wasSearch() && searchEnabled && !isOverlayTarget;
    if (shouldCancelSearch) {
      var _this$_popup;
      var isPopupVisible = (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup._hideAnimationProcessing;
      this._clearSearchTimer();
      if (isPopupVisible) {
        this._shouldCancelSearch(true);
      } else {
        this._wasSearch(false);
        this._searchCanceled();
      }
    }
  },
  _shouldCancelSearch: function _shouldCancelSearch(value) {
    if (!arguments.length) {
      return this._shouldCancelSearchValue;
    }
    this._shouldCancelSearchValue = value;
  },
  _isOverlayNestedTarget: function _isOverlayNestedTarget(target) {
    return !!(0, _renderer.default)(target).closest(".".concat(SELECTBOX_POPUP_WRAPPER_CLASS)).length;
  },
  _clearTextValue: function _clearTextValue() {
    var selectedItem = this.option('selectedItem');
    var selectedItemText = this._displayGetter(selectedItem);
    var shouldRestoreValue = selectedItem && selectedItemText !== '';
    if (shouldRestoreValue) {
      if (this._savedTextRemoveEvent) {
        this._saveValueChangeEvent(this._savedTextRemoveEvent);
      }
      this.option('value', null);
    }
    delete this._savedTextRemoveEvent;
  },
  _shouldOpenPopup: function _shouldOpenPopup() {
    return this._needPassDataSourceToList() && this._wasSearch();
  },
  _isFocused: function _isFocused() {
    var activeElement = _dom_adapter.default.getActiveElement(this.element());
    return this.callBase() && (0, _renderer.default)(activeElement).closest(this._input()).length > 0;
  },
  _getValueChangeEventOptionName: function _getValueChangeEventOptionName() {
    return 'customItemCreateEvent';
  },
  _renderValueChangeEvent: function _renderValueChangeEvent() {
    if (this._isEditable()) {
      this.callBase();
    }
  },
  _fieldRenderData: function _fieldRenderData() {
    var $listFocused = this._list && this.option('opened') && (0, _renderer.default)(this._list.option('focusedElement'));
    if ($listFocused && $listFocused.length) {
      return this._list._getItemData($listFocused);
    }
    return this.option('selectedItem');
  },
  _isSelectedValue: function _isSelectedValue(value) {
    return this._isValueEquals(value, this.option('value'));
  },
  _shouldCloseOnItemClick: function _shouldCloseOnItemClick() {
    return !(this.option('showSelectionControls') && this.option('selectionMode') !== 'single');
  },
  _listItemClickHandler: function _listItemClickHandler(e) {
    var previousValue = this._getCurrentValue();
    this._focusListElement((0, _renderer.default)(e.itemElement));
    this._saveValueChangeEvent(e.event);
    this._completeSelection(this._valueGetter(e.itemData));
    if (this._shouldCloseOnItemClick()) {
      this.option('opened', false);
    }
    if (this.option('searchEnabled') && previousValue === this._valueGetter(e.itemData)) {
      this._updateField(e.itemData);
    }
    if (this._shouldClearFilter()) {
      this._cancelSearchIfNeed();
    }
  },
  _shouldClearFilter: function _shouldClearFilter() {
    return this._wasSearch();
  },
  _completeSelection: function _completeSelection(value) {
    this._setValue(value);
  },
  _loadItem: function _loadItem(value, cache) {
    var that = this;
    var deferred = new _deferred.Deferred();
    this.callBase(value, cache).done(function (item) {
      deferred.resolve(item);
    }.bind(this)).fail(function (args) {
      if (args !== null && args !== void 0 && args.shouldSkipCallback) {
        return;
      }
      var selectedItem = that.option('selectedItem');
      if (that.option('acceptCustomValue') && value === that._valueGetter(selectedItem)) {
        deferred.resolve(selectedItem);
      } else {
        deferred.reject();
      }
    }.bind(this));
    return deferred.promise();
  },
  _loadInputValue: function _loadInputValue(value, callback) {
    this._loadItemDeferred = this._loadItem(value).always(callback);
    return this._loadItemDeferred;
  },
  _isCustomItemSelected: function _isCustomItemSelected() {
    var selectedItem = this.option('selectedItem');
    var searchValue = this._searchValue();
    var selectedItemText = this._displayGetter(selectedItem);
    return !selectedItemText || searchValue !== selectedItemText.toString();
  },
  _valueChangeEventHandler: function _valueChangeEventHandler(e) {
    if (this.option('acceptCustomValue') && this._isCustomItemSelected() && !this._isValueChanging) {
      this._isValueChanging = true;
      this._customItemAddedHandler(e);
    }
  },
  _initCustomItemCreatingAction: function _initCustomItemCreatingAction() {
    this._customItemCreatingAction = this._createActionByOption('onCustomItemCreating');
  },
  _createCustomItem: function _createCustomItem(text) {
    var params = {
      text: text
    };
    var actionResult = this._customItemCreatingAction(params);
    var item = (0, _common.ensureDefined)(actionResult, params.customItem);
    if ((0, _type.isDefined)(actionResult)) {
      _errors.default.log('W0015', 'onCustomItemCreating', 'customItem');
    }
    return item;
  },
  _customItemAddedHandler: function _customItemAddedHandler(e) {
    var searchValue = this._searchValue();
    var item = this._createCustomItem(searchValue);
    this._saveValueChangeEvent(e);
    if (item === undefined) {
      this._renderValue();
      throw _errors.default.Error('E0121');
    }
    if ((0, _type.isPromise)(item)) {
      (0, _deferred.fromPromise)(item).done(this._setCustomItem.bind(this)).fail(this._setCustomItem.bind(this, null));
    } else {
      this._setCustomItem(item);
    }
  },
  _setCustomItem: function _setCustomItem(item) {
    if (this._disposed) {
      return;
    }
    item = item || null;
    this.option('selectedItem', item);
    this._cancelSearchIfNeed();
    this._setValue(this._valueGetter(item));
    this._renderDisplayText(this._displayGetter(item));
    this._isValueChanging = false;
  },
  _clearValueHandler: function _clearValueHandler(e) {
    this._preventFiltering = true;
    this.callBase(e);
    this._searchCanceled();
    return false;
  },
  _wasSearch: function _wasSearch(value) {
    if (!arguments.length) {
      return !!this._wasSearchValue;
    }
    this._wasSearchValue = value;
  },
  _searchHandler: function _searchHandler() {
    if (this._preventFiltering) {
      delete this._preventFiltering;
      return;
    }
    if (this._needPassDataSourceToList()) {
      this._wasSearch(true);
    }
    this.callBase(arguments);
  },
  _dataSourceFiltered: function _dataSourceFiltered(searchValue) {
    this.callBase();
    if (searchValue !== null) {
      this._renderInputSubstitution();
      this._renderFocusedElement();
    }
  },
  _valueSubstituted: function _valueSubstituted() {
    var input = this._input().get(0);
    var currentSearchLength = this._searchValue().length;
    var isAllSelected = input.selectionStart === 0 && input.selectionEnd === currentSearchLength;
    var inputHasSelection = input.selectionStart !== input.selectionEnd;
    var isLastSymbolSelected = currentSearchLength === input.selectionEnd;
    return this._wasSearch() && inputHasSelection && !isAllSelected && isLastSymbolSelected && this._shouldSubstitutionBeRendered();
  },
  _shouldSubstitutionBeRendered: function _shouldSubstitutionBeRendered() {
    return !this._preventSubstitution && this.option('searchEnabled') && !this.option('acceptCustomValue') && this.option('searchMode') === 'startswith';
  },
  _renderInputSubstitution: function _renderInputSubstitution() {
    if (!this._shouldSubstitutionBeRendered()) {
      delete this._preventSubstitution;
      return;
    }
    var item = this._list && this._getPlainItems(this._list.option('items'))[0];
    if (!item) {
      return;
    }
    var $input = this._input();
    var valueLength = $input.val().length;
    if (valueLength === 0) {
      return;
    }
    var inputElement = $input.get(0);
    var displayValue = this._displayGetter(item).toString();
    inputElement.value = displayValue;
    this._caret({
      start: valueLength,
      end: displayValue.length
    });
  },
  _dispose: function _dispose() {
    this._renderInputValueAsync = _common.noop;
    delete this._loadItemDeferred;
    this.callBase();
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'customItemCreateEvent':
        this._refreshValueChangeEvent();
        this._refreshFocusEvent();
        this._refreshEvents();
        break;
      case 'onCustomItemCreating':
        this._initCustomItemCreatingAction();
        break;
      case 'tooltipEnabled':
        this._renderTooltip();
        break;
      case 'displayCustomValue':
      case 'acceptCustomValue':
      case 'showSelectionControls':
        this._invalidate();
        break;
      case 'allowClearing':
        break;
      default:
        this.callBase(args);
    }
  }
});
(0, _component_registrator.default)('dxSelectBox', SelectBox);
var _default = SelectBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
