/**
* DevExtreme (esm/__internal/ui/m_select_box.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../ui/list/modules/m_selection';
import { normalizeKeyName } from '../../common/core/events/utils/index';
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import domAdapter from '../../core/dom_adapter';
import { getPublicElement } from '../../core/element';
import errors from '../../core/errors';
import $ from '../../core/renderer';
import { ensureDefined, noop } from '../../core/utils/common';
import { Deferred,
// @ts-expect-error ts-error
fromPromise } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { isDefined, isPromise } from '../../core/utils/type';
import DropDownList from '../ui/drop_down_editor/m_drop_down_list';
// STYLE selectBox
const DISABLED_STATE_SELECTOR = '.dx-state-disabled';
const SELECTBOX_CLASS = 'dx-selectbox';
const SELECTBOX_POPUP_CLASS = 'dx-selectbox-popup';
const SELECTBOX_CONTAINER_CLASS = 'dx-selectbox-container';
const SELECTBOX_POPUP_WRAPPER_CLASS = 'dx-selectbox-popup-wrapper';
class SelectBox extends DropDownList {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _supportedKeys() {
    const that = this;
    const parent = super._supportedKeys();
    const clearSelectBox = function (e) {
      const isEditable = this._isEditable();
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
    const searchIfNeeded = function () {
      if (that.option('searchEnabled') && that._valueSubstituted()) {
        that._searchHandler();
      }
    };
    return _extends({}, parent, {
      tab() {
        const {
          opened
        } = this.option();
        const popupHasFocusableElements = opened && !!this._popup.getFocusableElements().length;
        if (!popupHasFocusableElements) {
          this._resetCaretPosition(true);
        }
        // @ts-expect-error ts-error
        parent.tab && parent.tab.apply(this, arguments);
        if (!popupHasFocusableElements) {
          this._cancelSearchIfNeed();
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      upArrow(e) {
        // @ts-expect-error ts-error
        if (parent.upArrow.apply(this, arguments)) {
          if (!this.option('opened')) {
            this._setNextValue(e);
          }
          return true;
        }
        return undefined;
      },
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      downArrow(e) {
        // @ts-expect-error ts-error
        if (parent.downArrow.apply(this, arguments)) {
          if (!this.option('opened')) {
            this._setNextValue(e);
          }
          return true;
        }
        return undefined;
      },
      leftArrow() {
        var _parent$leftArrow;
        searchIfNeeded();
        // @ts-expect-error ts-error
        (_parent$leftArrow = parent.leftArrow) === null || _parent$leftArrow === void 0 || _parent$leftArrow.apply(this, arguments);
      },
      rightArrow() {
        var _parent$rightArrow;
        searchIfNeeded();
        // @ts-expect-error ts-error
        (_parent$rightArrow = parent.rightArrow) === null || _parent$rightArrow === void 0 || _parent$rightArrow.apply(this, arguments);
      },
      home() {
        var _parent$home;
        searchIfNeeded();
        // @ts-expect-error ts-error
        (_parent$home = parent.home) === null || _parent$home === void 0 || _parent$home.apply(this, arguments);
      },
      end() {
        var _parent$end;
        searchIfNeeded();
        // @ts-expect-error ts-error
        (_parent$end = parent.end) === null || _parent$end === void 0 || _parent$end.apply(this, arguments);
      },
      escape() {
        var _parent$escape;
        // @ts-expect-error ts-error
        const result = (_parent$escape = parent.escape) === null || _parent$escape === void 0 ? void 0 : _parent$escape.apply(this, arguments);
        this._cancelEditing();
        return result ?? true;
      },
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      enter(e) {
        const isOpened = this.option('opened');
        const inputText = this._input().val().trim();
        const isCustomText = inputText && this._list && !this._list.option('focusedElement');
        if (!inputText && isDefined(this.option('value')) && this.option('allowClearing')) {
          this._saveValueChangeEvent(e);
          this.option({
            selectedItem: null,
            value: null
          });
          this.close();
        } else {
          var _parent$enter;
          if (this.option('acceptCustomValue')) {
            e.preventDefault();
            if (isCustomText) {
              if (isOpened) this._toggleOpenState();
              this._valueChangeEventHandler(e);
            }
            return isOpened;
          }
          // @ts-expect-error ts-error
          if ((_parent$enter = parent.enter) !== null && _parent$enter !== void 0 && _parent$enter.apply(this, arguments)) {
            return isOpened;
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      space(e) {
        const isOpened = this.option('opened');
        const isSearchEnabled = this.option('searchEnabled');
        const acceptCustomValue = this.option('acceptCustomValue');
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
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      placeholder: messageLocalization.format('Select'),
      fieldTemplate: null,
      customItemCreateEvent: 'change',
      valueChangeEvent: 'change',
      acceptCustomValue: false,
      onCustomItemCreating(e) {
        if (!isDefined(e.customItem)) {
          e.customItem = e.text;
        }
      },
      showSelectionControls: false,
      allowClearing: true,
      tooltipEnabled: false,
      openOnFieldClick: true,
      showDropDownButton: true,
      displayCustomValue: false,
      useHiddenSubmitElement: true
    });
  }
  _init() {
    super._init();
    this._initCustomItemCreatingAction();
  }
  _initMarkup() {
    this.$element().addClass(SELECTBOX_CLASS);
    this._renderTooltip();
    super._initMarkup();
    this._$container.addClass(SELECTBOX_CONTAINER_CLASS);
  }
  _createPopup() {
    super._createPopup();
    // @ts-expect-error ts-error
    this._popup.$element().addClass(SELECTBOX_POPUP_CLASS);
    // @ts-expect-error ts-error
    this._popup.$overlayContent().attr('tabindex', -1);
  }
  _popupWrapperClass() {
    return `${super._popupWrapperClass()} ${SELECTBOX_POPUP_WRAPPER_CLASS}`;
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    extend(this._deprecatedOptions, {
      valueChangeEvent: {
        since: '22.2',
        alias: 'customItemCreateEvent'
      }
    });
  }
  _cancelEditing() {
    if (!this.option('searchEnabled') && this._list) {
      this._focusListElement(null);
      this._updateField(this.option('selectedItem'));
    }
  }
  _renderOpenedState() {
    super._renderOpenedState();
    if (this.option('opened')) {
      this._scrollToSelectedItem();
      this._focusSelectedElement();
    }
  }
  _focusSelectedElement() {
    const searchValue = this._searchValue();
    if (!searchValue) {
      this._focusListElement(null);
      return;
    }
    const {
      items,
      selectedItem
    } = this.option();
    // @ts-expect-error ts-error
    const $listItems = this._list._itemElements();
    const index = (items === null || items === void 0 ? void 0 : items.indexOf(selectedItem)) ?? -1;
    const focusedElement = index !== -1 && !this._isCustomItemSelected() ? $listItems.eq(index) : null;
    this._focusListElement(focusedElement);
  }
  _renderFocusedElement() {
    if (!this._list) {
      return;
    }
    const searchValue = this._searchValue();
    if (!searchValue || this.option('acceptCustomValue')) {
      this._focusListElement(null);
      return;
    }
    // @ts-expect-error ts-error
    const $listItems = this._list._itemElements();
    const focusedElement = $listItems.not(DISABLED_STATE_SELECTOR).eq(0);
    this._focusListElement(focusedElement);
  }
  _focusListElement(element) {
    this._preventInputValueRender = true;
    // @ts-expect-error ts-error
    this._list.option('focusedElement', getPublicElement(element));
    delete this._preventInputValueRender;
  }
  _scrollToSelectedItem() {
    var _this$_list;
    (_this$_list = this._list) === null || _this$_list === void 0 || _this$_list.scrollToItem(this._list.option('selectedItem'));
  }
  _listContentReadyHandler() {
    super._listContentReadyHandler();
    const isPaginate = this._dataController.paginate();
    if (isPaginate && this._needPopupRepaint()) {
      return;
    }
    this._scrollToSelectedItem();
  }
  _renderValue() {
    this._renderInputValue();
    this._setSubmitValue();
    return Deferred().resolve();
  }
  _renderInputValue() {
    return super._renderInputValue(...arguments).always(() => {
      this._renderInputValueAsync();
    });
  }
  _renderInputValueAsync() {
    this._renderTooltip();
    this._renderInputValueImpl().always(() => {
      this._refreshSelected();
    });
  }
  _renderInputValueImpl() {
    this._renderField();
    return Deferred().resolve();
  }
  _setNextItem(step) {
    const item = this._calcNextItem(step);
    // @ts-expect-error ts-error
    const value = this._valueGetter(item);
    this._setValue(value);
  }
  _setNextValue(e) {
    const dataSourceIsLoaded = this._dataController.isLoaded() ? Deferred().resolve() : this._dataController.load();
    dataSourceIsLoaded.done(() => {
      const selectedIndex = this._getSelectedIndex();
      const hasPages = this._dataController.pageSize();
      const isLastPage = this._dataController.isLastPage();
      const isLastItem = selectedIndex === this._items().length - 1;
      this._saveValueChangeEvent(e);
      const step = normalizeKeyName(e) === 'downArrow' ? 1 : -1;
      if (hasPages && !isLastPage && isLastItem && step > 0) {
        if (!this._popup) {
          this._createPopup();
        }
        if (!this._dataController.isLoading()) {
          // @ts-expect-error ts-error
          this._list._loadNextPage().done(this._setNextItem.bind(this, step));
        }
      } else {
        this._setNextItem(step);
      }
    });
  }
  _setSelectedItem(item) {
    const isUnknownItem = !this._isCustomValueAllowed() && item === undefined;
    super._setSelectedItem(isUnknownItem ? null : item);
    if (!isUnknownItem && (!this._isEditable() || this._isCustomItemSelected())) {
      this._setListOption('selectedItem', this.option('selectedItem'));
    }
  }
  _isCustomValueAllowed() {
    return this.option('acceptCustomValue') || super._isCustomValueAllowed();
  }
  _displayValue(item) {
    item = !isDefined(item) && this._isCustomValueAllowed() ? this.option('value') : item;
    return super._displayValue(item);
  }
  _listConfig() {
    const result = extend(super._listConfig(), {
      pageLoadMode: 'scrollBottom',
      onSelectionChanged: this._getSelectionChangeHandler(),
      selectedItem: this.option('selectedItem'),
      onFocusedItemChanged: this._listFocusedItemChangeHandler.bind(this),
      _onItemsRendered: () => {
        this._popup.repaint();
        if (this.option('opened')) {
          this._scrollToSelectedItem();
        }
      }
    });
    if (this.option('showSelectionControls')) {
      extend(result, {
        showSelectionControls: true,
        selectByClick: true
      });
    }
    return result;
  }
  _listFocusedItemChangeHandler(e) {
    if (this._preventInputValueRender) {
      return;
    }
    const list = e.component;
    const focusedElement = $(list.option('focusedElement'));
    const focusedItem = list._getItemData(focusedElement);
    this._updateField(focusedItem);
  }
  _updateField(item) {
    const fieldTemplate = this._getTemplateByOption('fieldTemplate');
    if (!(fieldTemplate && this.option('fieldTemplate'))) {
      // @ts-expect-error ts-error
      const text = this._displayGetter(item);
      this.option('text', text);
      this._renderDisplayText(text);
      return;
    }
    this._renderField();
  }
  _getSelectionChangeHandler() {
    return this.option('showSelectionControls') ? this._selectionChangeHandler.bind(this) : noop;
  }
  _selectionChangeHandler(e) {
    each(e.addedItems || [], (_, addedItem) => {
      // @ts-expect-error ts-error
      this._setValue(this._valueGetter(addedItem));
    });
  }
  _getActualSearchValue() {
    return this._dataController.searchValue();
  }
  _isInlineAutocompleteEnabled() {
    const {
      searchEnabled,
      acceptCustomValue,
      searchMode
    } = this.option();
    return searchEnabled && !acceptCustomValue && searchMode === 'startswith';
  }
  _getAriaAutocomplete() {
    const {
      disabled,
      readOnly,
      searchEnabled
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const isInputEditable = !(readOnly || disabled);
    const hasAutocomplete = searchEnabled && isInputEditable;
    if (!hasAutocomplete) {
      return 'none';
    }
    const isInlineAutocompleteEnabled = this._isInlineAutocompleteEnabled();
    const autocompleteAria = isInlineAutocompleteEnabled ? 'both' : 'list';
    return autocompleteAria;
  }
  _toggleOpenState(isVisible) {
    if (this.option('disabled')) {
      return;
    }
    isVisible = arguments.length ? isVisible : !this.option('opened');
    if (!isVisible && !this._shouldClearFilter()) {
      this._restoreInputText(true);
    }
    if (this._wasSearch() && isVisible) {
      this._wasSearch(false);
      const showDataImmediately = this.option('showDataBeforeSearch') || this._isMinSearchLengthExceeded();
      if (showDataImmediately && this._dataController.getDataSource()) {
        if (this._searchTimer) return;
        const searchValue = this._getActualSearchValue();
        searchValue && this._wasSearch(true);
        this._filterDataSource(searchValue || null);
      } else {
        this._setListOption('items', []);
      }
    }
    if (isVisible) {
      this._scrollToSelectedItem();
    }
    super._toggleOpenState(isVisible);
  }
  _renderTooltip() {
    const {
      tooltipEnabled,
      displayValue
    } = this.option();
    if (tooltipEnabled) {
      // @ts-expect-error ts-error
      this.$element().attr('title', displayValue);
    }
  }
  _renderDimensions() {
    super._renderDimensions();
    this._updatePopupWidth();
    this._updateListDimensions();
  }
  _isValueEqualInputText() {
    const initialSelectedItem = this.option('selectedItem');
    if (initialSelectedItem === null) {
      return false;
    }
    // @ts-expect-error ts-error
    const value = this._displayGetter(initialSelectedItem);
    const displayValue = value ? String(value) : '';
    const inputText = this._searchValue();
    // @ts-expect-error ts-error
    return displayValue === inputText;
  }
  _popupHidingHandler() {
    if (this._isValueEqualInputText()) {
      this._cancelEditing();
    }
    super._popupHidingHandler();
  }
  _popupHiddenHandler() {
    super._popupHiddenHandler();
    if (this._shouldCancelSearch()) {
      this._wasSearch(false);
      this._searchCanceled();
      this._shouldCancelSearch(false);
    }
  }
  _restoreInputText(saveEditingValue) {
    var _this$_loadItemDeferr;
    if (this.option('readOnly')) {
      return;
    }
    (_this$_loadItemDeferr = this._loadItemDeferred) === null || _this$_loadItemDeferr === void 0 || _this$_loadItemDeferr.always(() => {
      const {
        acceptCustomValue,
        text,
        selectedItem: initialSelectedItem,
        customItemCreateEvent
      } = this.option();
      if (acceptCustomValue) {
        if (!saveEditingValue && !this._isValueChanging) {
          let initialItem = null;
          if (isDefined(initialSelectedItem)) {
            initialItem = initialSelectedItem;
          } else if (customItemCreateEvent !== '') {
            initialItem = this._createCustomItem(text);
          }
          this._updateField(initialItem);
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
      this._renderInputValue().always(selectedItem => {
        const newSelectedItem = ensureDefined(selectedItem, initialSelectedItem);
        this._setSelectedItem(newSelectedItem);
        this._updateField(newSelectedItem);
        this._clearFilter();
      });
    });
  }
  _valueChangeEventIncludesBlur() {
    const valueChangeEvent = this.option(this._getValueChangeEventOptionName());
    // @ts-expect-error
    return valueChangeEvent.includes('blur');
  }
  _isPreventedFocusOutEvent(e) {
    return this._preventNestedFocusEvent(e) || this._valueChangeEventIncludesBlur();
  }
  _focusOutHandler(e) {
    if (!this._isPreventedFocusOutEvent(e)) {
      const isOverlayTarget = this._isOverlayNestedTarget(e.relatedTarget);
      if (!isOverlayTarget) {
        this._restoreInputText();
        this._clearSearchTimer();
      }
      this._cancelSearchIfNeed(e);
    }
    e.target = this._input().get(0);
    super._focusOutHandler(e);
  }
  _cancelSearchIfNeed(e) {
    const {
      searchEnabled
    } = this.option();
    const isOverlayTarget = this._isOverlayNestedTarget(e === null || e === void 0 ? void 0 : e.relatedTarget);
    const shouldCancelSearch = this._wasSearch() && searchEnabled && !isOverlayTarget;
    if (shouldCancelSearch) {
      var _this$_popup;
      const isPopupVisible = (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup._hideAnimationProcessing;
      this._clearSearchTimer();
      if (isPopupVisible) {
        this._shouldCancelSearch(true);
      } else {
        this._wasSearch(false);
        this._searchCanceled();
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _shouldCancelSearch(value) {
    if (!arguments.length) {
      return this._shouldCancelSearchValue;
    }
    this._shouldCancelSearchValue = value;
  }
  _isOverlayNestedTarget(target) {
    return !!$(target).closest(`.${SELECTBOX_POPUP_WRAPPER_CLASS}`).length;
  }
  _clearTextValue() {
    const selectedItem = this.option('selectedItem');
    // @ts-expect-error ts-error
    const selectedItemText = this._displayGetter(selectedItem);
    const shouldRestoreValue = selectedItem && selectedItemText !== '';
    if (shouldRestoreValue) {
      if (this._savedTextRemoveEvent) {
        this._saveValueChangeEvent(this._savedTextRemoveEvent);
      }
      this.option('value', null);
    }
    delete this._savedTextRemoveEvent;
  }
  _shouldOpenPopup() {
    // @ts-expect-error ts-error
    return this._needPassDataSourceToList() && this._wasSearch();
  }
  _isFocused() {
    const activeElement = domAdapter.getActiveElement(this.element());
    return super._isFocused() && $(activeElement).closest(this._input()).length > 0;
  }
  _getValueChangeEventOptionName() {
    return 'customItemCreateEvent';
  }
  _renderValueChangeEvent() {
    if (this._isEditable()) {
      super._renderValueChangeEvent();
    }
  }
  _fieldRenderData() {
    // @ts-expect-error ts-error
    const {
      focusedElement
    } = this.option();
    const $listFocused = this._list && this.option('opened') && $(focusedElement);
    if ($listFocused !== null && $listFocused !== void 0 && $listFocused.length) {
      // @ts-expect-error ts-error
      return this._list._getItemData($listFocused);
    }
    return this.option('selectedItem');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _isSelectedValue(value, cache) {
    // @ts-expect-error ts-error
    return this._isValueEquals(value, this.option('value'));
  }
  _shouldCloseOnItemClick() {
    const {
      selectionMode
    } = this.option();
    return !(this.option('showSelectionControls') && selectionMode !== 'single');
  }
  _listItemClickHandler(e) {
    // @ts-expect-error ts-error
    const previousValue = this._getCurrentValue();
    this._focusListElement($(e.itemElement));
    this._saveValueChangeEvent(e.event);
    // @ts-expect-error ts-error
    this._completeSelection(this._valueGetter(e.itemData));
    if (this._shouldCloseOnItemClick()) {
      this.option('opened', false);
    }
    // @ts-expect-error ts-error
    if (this.option('searchEnabled') && previousValue === this._valueGetter(e.itemData)) {
      this._updateField(e.itemData);
    }
    if (this._shouldClearFilter()) {
      this._cancelSearchIfNeed();
    }
  }
  _shouldClearFilter() {
    return this._wasSearch();
  }
  _completeSelection(value) {
    this._setValue(value);
  }
  _loadItem(value, cache) {
    const that = this;
    const deferred = Deferred();
    super._loadItem(value, cache).done(item => {
      deferred.resolve(item);
    }).fail(args => {
      if (args !== null && args !== void 0 && args.shouldSkipCallback) {
        return;
      }
      const selectedItem = that.option('selectedItem');
      // @ts-expect-error ts-error
      if (that.option('acceptCustomValue') && value === that._valueGetter(selectedItem)) {
        deferred.resolve(selectedItem);
      } else {
        deferred.reject();
      }
    });
    // @ts-expect-error ts-error
    return deferred.promise();
  }
  _loadInputValue(value, callback) {
    this._loadItemDeferred = this._loadItem(value).always(callback);
    return this._loadItemDeferred;
  }
  _isCustomItemSelected() {
    const selectedItem = this.option('selectedItem');
    const searchValue = this._searchValue();
    // @ts-expect-error ts-error
    const selectedItemText = this._displayGetter(selectedItem);
    return !selectedItemText || searchValue !== selectedItemText.toString();
  }
  _valueChangeEventHandler(e) {
    if (this.option('acceptCustomValue') && this._isCustomItemSelected() && !this._isValueChanging) {
      this._isValueChanging = true;
      this._customItemAddedHandler(e);
    }
  }
  _initCustomItemCreatingAction() {
    this._customItemCreatingAction = this._createActionByOption('onCustomItemCreating');
  }
  _createCustomItem(text) {
    const params = {
      text
    };
    const actionResult = this._customItemCreatingAction(params);
    // @ts-expect-error ts-error
    const item = ensureDefined(actionResult, params.customItem);
    if (isDefined(actionResult)) {
      errors.log('W0015', 'onCustomItemCreating', 'customItem');
    }
    return item;
  }
  _customItemAddedHandler(e) {
    const searchValue = this._searchValue();
    const item = this._createCustomItem(searchValue);
    this._saveValueChangeEvent(e);
    if (item === undefined) {
      this._renderValue();
      throw errors.Error('E0121');
    }
    if (isPromise(item)) {
      fromPromise(item).done(this._setCustomItem.bind(this)).fail(this._setCustomItem.bind(this, null));
    } else {
      this._setCustomItem(item);
    }
  }
  _setCustomItem(item) {
    if (this._disposed) {
      return;
    }
    item = item || null;
    this.option('selectedItem', item);
    this._cancelSearchIfNeed();
    // @ts-expect-error ts-error
    this._setValue(this._valueGetter(item));
    // @ts-expect-error ts-error
    this._renderDisplayText(this._displayGetter(item));
    this._isValueChanging = false;
  }
  _clearValueHandler(e) {
    this._preventFiltering = true;
    super._clearValueHandler(e);
    this._searchCanceled();
    return false;
  }
  _wasSearch(value) {
    if (!arguments.length) {
      return !!this._wasSearchValue;
    }
    this._wasSearchValue = value;
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _searchHandler(e) {
    if (this._preventFiltering) {
      delete this._preventFiltering;
      return;
    }
    if (this._needPassDataSourceToList()) {
      this._wasSearch(true);
    }
    super._searchHandler(arguments);
  }
  _dataSourceFiltered(searchValue) {
    super._dataSourceFiltered();
    if (searchValue !== null) {
      this._renderInputSubstitution();
      this._renderFocusedElement();
    }
  }
  _valueSubstituted() {
    const input = this._input().get(0);
    const currentSearchLength = this._searchValue().length;
    const isAllSelected = input.selectionStart === 0 && input.selectionEnd === currentSearchLength;
    const inputHasSelection = input.selectionStart !== input.selectionEnd;
    const isLastSymbolSelected = currentSearchLength === input.selectionEnd;
    return this._wasSearch() && inputHasSelection && !isAllSelected && isLastSymbolSelected && this._shouldSubstitutionBeRendered();
  }
  _shouldSubstitutionBeRendered() {
    return !this._preventSubstitution && this._isInlineAutocompleteEnabled();
  }
  _renderInputSubstitution() {
    if (!this._shouldSubstitutionBeRendered()) {
      delete this._preventSubstitution;
      return;
    }
    const item = this._list && this._getPlainItems(this._list.option('items'))[0];
    if (!item) {
      return;
    }
    const $input = this._input();
    const valueLength = $input.val().length;
    if (valueLength === 0) {
      return;
    }
    const inputElement = $input.get(0);
    // @ts-expect-error ts-error
    const displayValue = this._displayGetter(item).toString();
    inputElement.value = displayValue;
    this._caret({
      start: valueLength,
      end: displayValue.length
    });
  }
  _dispose() {
    this._renderInputValueAsync = noop;
    delete this._loadItemDeferred;
    super._dispose();
  }
  _optionChanged(args) {
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
      case 'readOnly':
      case 'disabled':
      case 'searchMode':
        super._optionChanged(args);
        this._setDefaultAria();
        break;
      case 'displayCustomValue':
      case 'acceptCustomValue':
      case 'showSelectionControls':
        this._invalidate();
        break;
      case 'allowClearing':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxSelectBox', SelectBox);
export default SelectBox;
