"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translator = require("../../common/core/animation/translator");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _utils = require("../../core/options/utils");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _child_default_template = require("../../core/templates/child_default_template");
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../../ui/popover/ui.popover"));
var _themes = require("../../ui/themes");
var _m_support = _interopRequireDefault(require("../core/utils/m_support"));
var _m_drop_down_list = _interopRequireDefault(require("../ui/drop_down_editor/m_drop_down_list"));
var _m_utils = require("../ui/drop_down_editor/m_utils");
var _m_text_box = _interopRequireDefault(require("../ui/text_box/m_text_box"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const window = (0, _window.getWindow)();
const LOOKUP_CLASS = 'dx-lookup';
const LOOKUP_SEARCH_CLASS = 'dx-lookup-search';
const LOOKUP_SEARCH_WRAPPER_CLASS = 'dx-lookup-search-wrapper';
const LOOKUP_FIELD_CLASS = 'dx-lookup-field';
const LOOKUP_ARROW_CLASS = 'dx-lookup-arrow';
const LOOKUP_FIELD_WRAPPER_CLASS = 'dx-lookup-field-wrapper';
const LOOKUP_POPUP_CLASS = 'dx-lookup-popup';
const LOOKUP_POPUP_WRAPPER_CLASS = 'dx-lookup-popup-wrapper';
const LOOKUP_POPUP_SEARCH_CLASS = 'dx-lookup-popup-search';
const LOOKUP_POPOVER_MODE = 'dx-lookup-popover-mode';
const LOOKUP_EMPTY_CLASS = 'dx-lookup-empty';
const LOOKUP_POPOVER_FLIP_VERTICAL_CLASS = 'dx-popover-flipped-vertical';
const TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
const TEXTEDITOR_EMPTY_CLASS = 'dx-texteditor-empty';
const LIST_ITEM_CLASS = 'dx-list-item';
const LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
const GROUP_LIST_HEADER_CLASS = 'dx-list-group-header';
const MATERIAL_LOOKUP_LIST_ITEMS_COUNT = 5;
const MATERIAL_LOOKUP_LIST_PADDING = 8;
const WINDOW_RATIO = 0.8;
class Lookup extends _m_drop_down_list.default {
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      space(e) {
        e.preventDefault();
        this._validatedOpening();
      },
      enter() {
        this._validatedOpening();
      }
    });
  }
  _getDefaultOptions() {
    const getSize = side => {
      let size;
      if (_devices.default.real().deviceType === 'phone' && window.visualViewport) {
        size = window.visualViewport[side];
      } else {
        size = side === 'width' ? (0, _size.getWidth)(window) : (0, _size.getHeight)(window);
      }
      return size * WINDOW_RATIO;
    };
    return _extends({}, super._getDefaultOptions(), {
      placeholder: _message.default.format('Select'),
      searchPlaceholder: _message.default.format('Search'),
      searchEnabled: true,
      searchStartEvent: 'input change keyup',
      cleanSearchOnOpening: true,
      showCancelButton: true,
      showClearButton: false,
      clearButtonText: _message.default.format('Clear'),
      applyButtonText: _message.default.format('OK'),
      pullRefreshEnabled: false,
      useNativeScrolling: true,
      pullingDownText: _message.default.format('dxList-pullingDownText'),
      pulledDownText: _message.default.format('dxList-pulledDownText'),
      refreshingText: _message.default.format('dxList-refreshingText'),
      pageLoadingText: _message.default.format('dxList-pageLoadingText'),
      // @ts-expect-error ts-error
      onScroll: null,
      // @ts-expect-error ts-error
      onPullRefresh: null,
      // @ts-expect-error ts-error
      onPageLoading: null,
      pageLoadMode: 'scrollBottom',
      nextButtonText: _message.default.format('dxList-nextButtonText'),
      grouped: false,
      groupTemplate: 'group',
      usePopover: false,
      openOnFieldClick: true,
      showDropDownButton: false,
      focusStateEnabled: false,
      dropDownOptions: {
        showTitle: true,
        width() {
          return getSize('width');
        },
        height() {
          return getSize('height');
        },
        shading: true,
        hideOnOutsideClick: true,
        animation: {},
        title: '',
        titleTemplate: 'title',
        // @ts-expect-error ts-error
        onTitleRendered: null,
        fullScreen: false
      },
      dropDownCentered: false,
      _scrollToSelectedItemEnabled: false,
      useHiddenSubmitElement: true
    });
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    (0, _extend.extend)(this._deprecatedOptions, {
      valueChangeEvent: {
        since: '22.1',
        alias: 'searchStartEvent'
      }
    });
  }
  _defaultOptionsRules() {
    const themeName = (0, _themes.current)();
    return super._defaultOptionsRules().concat([{
      device() {
        return !_m_support.default.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }, {
      device(device) {
        return !_devices.default.isSimulator() && _devices.default.real().deviceType === 'desktop' && device.platform === 'generic';
      },
      options: {
        usePopover: true,
        dropDownOptions: {
          height: 'auto'
        }
      }
    }, {
      device: {
        platform: 'ios',
        phone: true
      },
      options: {
        dropDownOptions: {
          fullScreen: true
        }
      }
    }, {
      device: {
        platform: 'ios',
        tablet: true
      },
      options: {
        dropDownOptions: {
          width() {
            return Math.min((0, _size.getWidth)(window), (0, _size.getHeight)(window)) * 0.4;
          },
          height: 'auto'
        },
        usePopover: true
      }
    }, {
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device() {
        return (0, _themes.isMaterial)(themeName);
      },
      options: {
        usePopover: false,
        searchEnabled: false,
        showCancelButton: false,
        dropDownCentered: true,
        _scrollToSelectedItemEnabled: true,
        dropDownOptions: {
          // @ts-expect-error ts-error
          _ignoreFunctionValueDeprecation: true,
          width: () => (0, _m_utils.getElementWidth)(this.$element()),
          height: function () {
            return this._getPopupHeight();
          }.bind(this),
          showTitle: false,
          shading: false
        }
      }
    }]);
  }
  _init() {
    super._init();
    this._initActions();
  }
  _initActions() {
    super._initActions();
    this._initScrollAction();
    this._initPageLoadingAction();
    this._initPullRefreshAction();
  }
  _initPageLoadingAction() {
    this._pageLoadingAction = this._createActionByOption('onPageLoading');
  }
  _initPullRefreshAction() {
    this._pullRefreshAction = this._createActionByOption('onPullRefresh');
  }
  _initScrollAction() {
    this._scrollAction = this._createActionByOption('onScroll');
  }
  _scrollHandler(e) {
    var _this$_scrollAction;
    (_this$_scrollAction = this._scrollAction) === null || _this$_scrollAction === void 0 || _this$_scrollAction.call(this, e);
  }
  _pullRefreshHandler(e) {
    var _this$_pullRefreshAct;
    (_this$_pullRefreshAct = this._pullRefreshAction) === null || _this$_pullRefreshAct === void 0 || _this$_pullRefreshAct.call(this, e);
  }
  _pageLoadingHandler(e) {
    var _this$_pageLoadingAct;
    (_this$_pageLoadingAct = this._pageLoadingAction) === null || _this$_pageLoadingAct === void 0 || _this$_pageLoadingAct.call(this, e);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      group: new _child_default_template.ChildDefaultTemplate('group'),
      title: new _child_default_template.ChildDefaultTemplate('title')
    });
  }
  _initMarkup() {
    const {
      usePopover
    } = this.option();
    this.$element().addClass(LOOKUP_CLASS).toggleClass(LOOKUP_POPOVER_MODE, usePopover);
    super._initMarkup();
  }
  _inputWrapper() {
    return this.$element().find(`.${LOOKUP_FIELD_WRAPPER_CLASS}`);
  }
  _dataSourceOptions() {
    return (0, _extend.extend)(super._dataSourceOptions(), {
      paginate: true
    });
  }
  _fireContentReadyAction() {}
  _popupWrapperClass() {
    return '';
  }
  _renderInput() {
    this._$field = (0, _renderer.default)('<div>').addClass(LOOKUP_FIELD_CLASS);
    this._applyInputAttributes(this.option('inputAttr'));
    const $arrow = (0, _renderer.default)('<div>').addClass(LOOKUP_ARROW_CLASS);
    this._$fieldWrapper = (0, _renderer.default)('<div>').addClass(LOOKUP_FIELD_WRAPPER_CLASS).append(this._$field).append($arrow).appendTo(this.$element());
  }
  _applyInputAttributes(attributes) {
    this._$field.attr(attributes);
  }
  _getInputContainer() {
    return this._$fieldWrapper;
  }
  _renderField() {
    const fieldTemplate = this._getTemplateByOption('fieldTemplate');
    if (fieldTemplate && this.option('fieldTemplate')) {
      this._renderFieldTemplate(fieldTemplate);
      return;
    }
    const displayValue = this.option('displayValue');
    this._updateField(displayValue);
    const isFieldEmpty = !this.option('selectedItem');
    this.$element().toggleClass(LOOKUP_EMPTY_CLASS, isFieldEmpty).toggleClass(TEXTEDITOR_EMPTY_CLASS, isFieldEmpty);
  }
  _getLabelContainer() {
    return this._$field;
  }
  _renderDisplayText(text) {
    if (this._input().length) {
      super._renderDisplayText(text);
    } else {
      this._updateField(text);
    }
  }
  _updateField(text) {
    text = (0, _type.isDefined)(text) && String(text);
    this._$field.empty();
    if (text) {
      this._$field.text(text);
    } else {
      const $placeholder = (0, _renderer.default)('<div>')
      // @ts-expect-error ts-error
      .attr({
        'data-dx_placeholder': this.option('placeholder')
      });
      this._$field.append($placeholder);
      $placeholder.addClass('dx-placeholder');
    }
  }
  _renderButtonContainers() {}
  _renderFieldTemplate(template) {
    this._$field.empty();
    const data = this._fieldRenderData();
    template.render({
      model: data,
      container: (0, _element.getPublicElement)(this._$field)
    });
  }
  _fieldRenderData() {
    return this.option('selectedItem');
  }
  _popupShowingHandler() {
    // @ts-expect-error ts-error
    super._popupShowingHandler.apply(this, arguments);
    if (this.option('cleanSearchOnOpening')) {
      var _this$_searchBox, _this$_list;
      if (this.option('searchEnabled') && (_this$_searchBox = this._searchBox) !== null && _this$_searchBox !== void 0 && _this$_searchBox.option('value')) {
        this._searchBox.option('value', '');
        this._searchCanceled();
      }
      (_this$_list = this._list) === null || _this$_list === void 0 || _this$_list.option('focusedElement', null);
    }
    if (this.option('dropDownOptions.fullScreen') && this.option('_scrollToSelectedItemEnabled')) {
      // @ts-expect-error ts-error
      this._popup.option('position').of = (0, _renderer.default)(window);
    }
  }
  _popupShownHandler() {
    const scrollToSelectedItemEnabled = this.option('_scrollToSelectedItemEnabled');
    const fullScreen = this.option('dropDownOptions.fullScreen');
    if (!fullScreen && scrollToSelectedItemEnabled) {
      this._setPopupPosition();
    }
    super._popupShownHandler();
  }
  _scrollToSelectedItem() {
    var _this$_list2, _this$_list3;
    const selectedIndex = (_this$_list2 = this._list) === null || _this$_list2 === void 0 ? void 0 : _this$_list2.option('selectedIndex');
    const listItems = (_this$_list3 = this._list) === null || _this$_list3 === void 0 ? void 0 : _this$_list3.option('items');
    // @ts-expect-error ts-error
    const itemsCount = listItems.length;
    if (itemsCount !== 0) {
      var _this$_list4, _this$_list7;
      if ((_this$_list4 = this._list) !== null && _this$_list4 !== void 0 && _this$_list4.option('grouped')) {
        var _this$_list5;
        // @ts-expect-error ts-error
        (_this$_list5 = this._list) === null || _this$_list5 === void 0 || _this$_list5.scrollToItem({
          group: itemsCount - 1,
          item: listItems[itemsCount - 1].items.length - 1
        });
      } else {
        var _this$_list6;
        (_this$_list6 = this._list) === null || _this$_list6 === void 0 || _this$_list6.scrollToItem(itemsCount - 1);
      }
      (_this$_list7 = this._list) === null || _this$_list7 === void 0 || _this$_list7.scrollToItem(selectedIndex);
    }
  }
  _getDifferenceOffsets(selectedListItem) {
    // @ts-expect-error ts-error
    return selectedListItem.offset().top - (0, _renderer.default)(this.element()).offset().top;
  }
  _isCenteringEnabled(index, count) {
    return index > 1 && index < count - 2;
  }
  _getPopupOffset() {
    const listItemsCount = this._listItemElements().length;
    if (listItemsCount === 0) return;
    // @ts-expect-error ts-error
    const selectedListItem = (0, _renderer.default)(this._list.element()).find(`.${LIST_ITEM_SELECTED_CLASS}`);
    const selectedIndex = this._listItemElements().index(selectedListItem);
    const differenceOfHeights = ((0, _size.getHeight)(selectedListItem) - (0, _size.getHeight)(this.element())) / 2;
    // @ts-expect-error
    const lookupOffset = (0, _renderer.default)(this._list.element()).offset().top;
    const dropDownHeightOption = this.option('dropDownOptions.height');
    // @ts-expect-error ts-error
    const popupHeight = typeof dropDownHeightOption === 'function' ? dropDownHeightOption() : dropDownHeightOption;
    const windowHeight = (0, _size.getHeight)(window);
    let offsetTop = 0;
    if (selectedIndex !== -1) {
      if (this._isCenteringEnabled(selectedIndex, listItemsCount)) {
        this._scrollToSelectedItem();
        const scrollOffsetTop = (popupHeight - (0, _size.getHeight)(selectedListItem)) / 2 - this._getDifferenceOffsets(selectedListItem);
        // @ts-expect-error ts-error
        this._list.scrollTo(this._list.scrollTop() + MATERIAL_LOOKUP_LIST_PADDING / 2 - scrollOffsetTop);
        offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem);
        if (lookupOffset < offsetTop && selectedIndex !== listItemsCount - 3) {
          // @ts-expect-error ts-error
          this._list.scrollTo(this._list.scrollTop() + this._getDifferenceOffsets(selectedListItem) / 2);
          offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem);
        }
      } else if (selectedIndex <= 1) {
        // @ts-expect-error ts-error
        this._list.scrollTo(0);
        offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem);
      } else if (selectedIndex >= listItemsCount - 2) {
        this._scrollToSelectedItem();
        offsetTop = differenceOfHeights + this._getDifferenceOffsets(selectedListItem);
      }
      if (lookupOffset < offsetTop) {
        this._scrollToSelectedItem();
        offsetTop = differenceOfHeights + MATERIAL_LOOKUP_LIST_PADDING;
      }
    }
    const offsetBottom = popupHeight - offsetTop - (0, _size.getHeight)(this.element());
    if (windowHeight - lookupOffset < offsetBottom) {
      // @ts-expect-error ts-error
      this._list.scrollTo(this._list.scrollTop() + differenceOfHeights - offsetBottom);
      offsetTop = popupHeight - (0, _size.getHeight)(this.element()) - MATERIAL_LOOKUP_LIST_PADDING;
    }
    return offsetTop;
  }
  _setPopupPosition() {
    if (!this.option('dropDownCentered')) return;
    // @ts-expect-error ts-error
    const flipped = this._popup.$wrapper().hasClass(LOOKUP_POPOVER_FLIP_VERTICAL_CLASS);
    if (flipped) return;
    // @ts-expect-error ts-error
    const popupContentParent = (0, _renderer.default)(this._popup.$content()).parent();
    const popupOffset = this._getPopupOffset();
    const position = (0, _translator.locate)(popupContentParent);
    (0, _translator.move)(popupContentParent, {
      // @ts-expect-error ts-error
      top: position.top - popupOffset
    });
  }
  _listItemGroupedElements() {
    // @ts-expect-error ts-error
    const groups = this._list._getItemsContainer().children();
    const items = [];
    groups.each((_, group) => {
      items.push((0, _renderer.default)(group).find(`.${GROUP_LIST_HEADER_CLASS}`)[0]);
      const groupedItems = (0, _renderer.default)(group).find(`.${LIST_ITEM_CLASS}`);
      // @ts-expect-error
      groupedItems.each((_, item) => {
        items.push(item);
      });
    });
    // @ts-expect-error
    return (0, _renderer.default)(items);
  }
  _calculateListHeight(grouped) {
    const listItems = grouped ? this._listItemGroupedElements() : this._listItemElements();
    const selectedListItem = (0, _renderer.default)(`.${LIST_ITEM_SELECTED_CLASS}`);
    const selectedIndex = listItems.index(selectedListItem);
    let listHeight = 0;
    let requireListItems = [];
    if (listItems.length === 0) {
      listHeight += MATERIAL_LOOKUP_LIST_PADDING;
    } else if (listItems.length < MATERIAL_LOOKUP_LIST_ITEMS_COUNT) {
      // @ts-expect-error ts-error
      listItems.each((_, item) => {
        listHeight += (0, _size.getOuterHeight)(item);
      });
    } else {
      if (selectedIndex <= 1) {
        // @ts-expect-error ts-error
        requireListItems = listItems.slice(0, MATERIAL_LOOKUP_LIST_ITEMS_COUNT);
      } else if (this._isCenteringEnabled(selectedIndex, listItems.length)) {
        // @ts-expect-error ts-error
        requireListItems = listItems.slice(selectedIndex - 2, selectedIndex + 3);
      } else {
        // @ts-expect-error ts-error
        requireListItems = listItems.slice(listItems.length - MATERIAL_LOOKUP_LIST_ITEMS_COUNT, listItems.length);
      }
      // @ts-expect-error
      requireListItems.each((_, item) => {
        listHeight += (0, _size.getOuterHeight)(item);
      });
    }
    return listHeight + (grouped ? MATERIAL_LOOKUP_LIST_PADDING : MATERIAL_LOOKUP_LIST_PADDING * 2);
  }
  _getPopupHeight() {
    var _this$_list8;
    // @ts-expect-error ts-error
    if ((_this$_list8 = this._list) !== null && _this$_list8 !== void 0 && _this$_list8.itemElements().length) {
      return this._calculateListHeight(this.option('grouped')) + (this._$searchWrapper ? (0, _size.getOuterHeight)(this._$searchWrapper) : 0)
      // @ts-expect-error ts-error
      + (this._popup._$bottom ? (0, _size.getOuterHeight)(this._popup._$bottom) : 0)
      // @ts-expect-error ts-error
      + (this._popup._$title ? (0, _size.getOuterHeight)(this._popup._$title) : 0);
    }
    return 'auto';
  }
  _allowSelectItemByTab() {
    return false;
  }
  _popupTabHandler(e) {
    const shouldLoopFocusInsidePopup = this._shouldLoopFocusInsidePopup();
    if (!shouldLoopFocusInsidePopup) {
      super._popupTabHandler(e);
    }
  }
  _renderPopup() {
    if (this.option('usePopover') && !this.option('dropDownOptions.fullScreen')) {
      if (this.option('_scrollToSelectedItemEnabled')) {
        super._renderPopup();
      } else {
        this._renderPopover();
        this._attachPopupKeyHandler();
      }
    } else {
      super._renderPopup();
    }
    this._$popup.addClass(LOOKUP_POPUP_CLASS);
    this._popup.$wrapper().addClass(LOOKUP_POPUP_WRAPPER_CLASS);
  }
  _renderPopover() {
    const popupConfig = this._popupConfig();
    const options = (0, _extend.extend)(popupConfig, this._options.cache('dropDownOptions'), {
      showEvent: null,
      hideEvent: null,
      target: this.$element(),
      fullScreen: false,
      shading: false,
      hideOnParentScroll: true,
      _fixWrapperPosition: false,
      width: this._isInitialOptionValue('dropDownOptions.width') ? () => (0, _size.getOuterWidth)(this.$element()) : popupConfig.width
    });
    // @ts-expect-error ts-error
    this._popup = this._createComponent(this._$popup, _ui.default, options);
    this._popup.$overlayContent().attr('role', 'dialog');
    this._popup.on({
      showing: this._popupShowingHandler.bind(this),
      shown: this._popupShownHandler.bind(this),
      hiding: this._popupHidingHandler.bind(this),
      hidden: this._popupHiddenHandler.bind(this),
      contentReady: this._contentReadyHandler.bind(this)
    });
    if (this.option('_scrollToSelectedItemEnabled')) {
      this._popup._$arrow.remove();
    }
    this._setPopupContentId(this._popup.$content());
    this._contentReadyHandler();
  }
  _popupHidingHandler() {
    super._popupHidingHandler();
    this.option('focusStateEnabled') && this.focus();
  }
  _popupHiddenHandler() {
    super._popupHiddenHandler();
    if (this.option('_scrollToSelectedItemEnabled')) {
      var _this$_popup;
      (0, _translator.resetPosition)((0, _renderer.default)((_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.content()).parent());
    }
  }
  _preventFocusOnPopup() {}
  _shouldLoopFocusInsidePopup() {
    const {
      usePopover,
      dropDownCentered,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _scrollToSelectedItemEnabled
    } = this.option();
    // @ts-expect-error ts-error
    const result = _scrollToSelectedItemEnabled ? dropDownCentered : !usePopover;
    return result;
  }
  _popupConfig() {
    const {
      dropDownOptions
    } = this.option();
    const shouldLoopFocusInsidePopup = this._shouldLoopFocusInsidePopup();
    const result = (0, _extend.extend)(super._popupConfig(), {
      toolbarItems: this._getPopupToolbarItems(),
      hideOnParentScroll: false,
      onPositioned: null,
      maxHeight: '100vh',
      // @ts-expect-error ts-error
      showTitle: dropDownOptions.showTitle,
      // @ts-expect-error ts-error
      title: dropDownOptions.title,
      titleTemplate: this._getTemplateByOption('dropDownOptions.titleTemplate'),
      // @ts-expect-error ts-error
      onTitleRendered: dropDownOptions.onTitleRendered,
      // @ts-expect-error ts-error
      fullScreen: dropDownOptions.fullScreen,
      // @ts-expect-error ts-error
      shading: dropDownOptions.shading,
      // @ts-expect-error ts-error
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      hideOnOutsideClick: dropDownOptions.hideOnOutsideClick || dropDownOptions.closeOnOutsideClick,
      _loopFocus: shouldLoopFocusInsidePopup
    });
    delete result.animation;
    delete result.position;
    if (this.option('_scrollToSelectedItemEnabled')) {
      result.position = this.option('dropDownCentered') ? {
        my: 'left top',
        at: 'left top',
        of: this.element()
      } : {
        my: 'left top',
        at: 'left bottom',
        of: this.element()
      };
      result.hideOnParentScroll = true;
    }
    (0, _iterator.each)(['position', 'animation', 'width', 'height'], (_, optionName) => {
      // @ts-expect-error ts-error
      const popupOptionValue = dropDownOptions[optionName];
      if (popupOptionValue !== undefined) {
        result[optionName] = popupOptionValue;
      }
    });
    return result;
  }
  _getPopupToolbarItems() {
    const {
      applyValueMode
    } = this.option();
    const buttonsConfig = applyValueMode === 'useButtons' ? this._popupToolbarItemsConfig() : [];
    const cancelButton = this._getCancelButtonConfig();
    if (cancelButton) {
      // @ts-expect-error ts-error
      buttonsConfig.push(cancelButton);
    }
    const clearButton = this._getClearButtonConfig();
    if (clearButton) {
      // @ts-expect-error ts-error
      buttonsConfig.push(clearButton);
    }
    return this._applyButtonsLocation(buttonsConfig);
  }
  _popupToolbarItemsConfig() {
    return [{
      shortcut: 'done',
      options: {
        onClick: this._applyButtonHandler.bind(this),
        text: this.option('applyButtonText')
      }
    }];
  }
  _getCancelButtonConfig() {
    return this.option('showCancelButton') ? {
      shortcut: 'cancel',
      onClick: this._cancelButtonHandler.bind(this),
      options: {
        text: this.option('cancelButtonText')
      }
    } : null;
  }
  _getClearButtonConfig() {
    return this.option('showClearButton') ? {
      shortcut: 'clear',
      onClick: this._resetValue.bind(this),
      options: {
        text: this.option('clearButtonText')
      }
    } : null;
  }
  _applyButtonHandler(args) {
    if (args) {
      this._saveValueChangeEvent(args.event);
    }
    // @ts-expect-error ts-error
    this.option('value', this._valueGetter(this._currentSelectedItem()));
    super._applyButtonHandler();
  }
  _cancelButtonHandler() {
    this._refreshSelected();
    super._cancelButtonHandler();
  }
  _refreshPopupVisibility() {
    if (this.option('opened')) {
      this._updateListDimensions();
    }
  }
  _dimensionChanged() {
    if (this.option('usePopover') && !this.option('dropDownOptions.width')) {
      this.option('dropDownOptions.width', (0, _size.getWidth)(this.$element()));
    }
    this._updateListDimensions();
  }
  _input() {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return this._$searchBox || super._input();
  }
  _renderPopupContent() {
    super._renderPopupContent();
    this._renderSearch();
  }
  _renderValueChangeEvent() {}
  _renderSearch() {
    const isSearchEnabled = this.option('searchEnabled');
    this._toggleSearchClass(isSearchEnabled);
    if (isSearchEnabled) {
      const $searchWrapper = this._$searchWrapper = (0, _renderer.default)('<div>').addClass(LOOKUP_SEARCH_WRAPPER_CLASS);
      const $searchBox = this._$searchBox = (0, _renderer.default)('<div>').addClass(LOOKUP_SEARCH_CLASS).appendTo($searchWrapper);
      const currentDevice = _devices.default.current();
      const searchMode = currentDevice.android ? 'text' : 'search';
      let isKeyboardListeningEnabled = false;
      const {
        searchStartEvent
      } = this.option();
      const textBoxOptions = {
        mode: searchMode,
        showClearButton: true,
        valueChangeEvent: searchStartEvent,
        inputAttr: {
          'aria-label': 'Search'
        },
        // eslint-disable-next-line no-return-assign
        onDisposing: () => isKeyboardListeningEnabled = false,
        // eslint-disable-next-line no-return-assign
        onFocusIn: () => isKeyboardListeningEnabled = true,
        // eslint-disable-next-line no-return-assign
        onFocusOut: () => isKeyboardListeningEnabled = false,
        // @ts-expect-error ts-error
        onKeyboardHandled: opts => isKeyboardListeningEnabled && this._list._keyboardHandler(opts),
        onValueChanged: e => this._searchHandler(e)
      };
      this._searchBox = this._createComponent($searchBox, _m_text_box.default, textBoxOptions);
      this._registerSearchKeyHandlers();
      // @ts-expect-error ts-error
      $searchWrapper.insertBefore(this._$list);
      this._setSearchPlaceholder();
    }
  }
  _filterDataSource() {
    // @ts-expect-error ts-error
    if (this._list && !this._list._dataSource && this._isMinSearchLengthExceeded()) {
      var _this$_list9;
      // @ts-expect-error ts-error
      (_this$_list9 = this._list) === null || _this$_list9 === void 0 || _this$_list9._scrollView.startLoading();
    }
    // @ts-expect-error ts-error
    super._filterDataSource(...arguments);
  }
  _dataSourceFiltered() {
    var _this$_list10;
    super._dataSourceFiltered(...arguments);
    // @ts-expect-error ts-error
    (_this$_list10 = this._list) === null || _this$_list10 === void 0 || _this$_list10._scrollView.finishLoading();
  }
  _updateActiveDescendant() {
    super._updateActiveDescendant();
    if (!this._$searchBox) {
      return;
    }
    const $input = this._$searchBox.find('input');
    super._updateActiveDescendant($input);
  }
  _removeSearch() {
    var _this$_$searchWrapper, _this$_$searchBox;
    (_this$_$searchWrapper = this._$searchWrapper) === null || _this$_$searchWrapper === void 0 || _this$_$searchWrapper.remove();
    delete this._$searchWrapper;
    (_this$_$searchBox = this._$searchBox) === null || _this$_$searchBox === void 0 || _this$_$searchBox.remove();
    delete this._$searchBox;
    delete this._searchBox;
  }
  _selectListItemHandler(e) {
    // @ts-expect-error ts-error
    const {
      focusedElement
    } = this._list.option();
    const $itemElement = (0, _renderer.default)(focusedElement);
    if (!$itemElement.length) {
      return;
    }
    e.preventDefault();
    e.target = $itemElement.get(0);
    this._saveValueChangeEvent(e);
    this._selectListItem(e.itemData, $itemElement);
  }
  _registerSearchKeyHandlers() {
    var _this$_searchBox2, _this$_searchBox3, _this$_searchBox4, _this$_searchBox5;
    (_this$_searchBox2 = this._searchBox) === null || _this$_searchBox2 === void 0 || _this$_searchBox2.registerKeyHandler('enter', this._selectListItemHandler.bind(this));
    (_this$_searchBox3 = this._searchBox) === null || _this$_searchBox3 === void 0 || _this$_searchBox3.registerKeyHandler('space', this._selectListItemHandler.bind(this));
    (_this$_searchBox4 = this._searchBox) === null || _this$_searchBox4 === void 0 || _this$_searchBox4.registerKeyHandler('end', _common.noop);
    (_this$_searchBox5 = this._searchBox) === null || _this$_searchBox5 === void 0 || _this$_searchBox5.registerKeyHandler('home', _common.noop);
  }
  _toggleSearchClass(isSearchEnabled) {
    if (this._popup) {
      this._popup.$wrapper().toggleClass(LOOKUP_POPUP_SEARCH_CLASS, isSearchEnabled);
    }
  }
  _setSearchPlaceholder() {
    var _this$_searchBox6;
    if (!this._$searchBox) {
      return;
    }
    const minSearchLength = this.option('minSearchLength');
    let placeholder = this.option('searchPlaceholder');
    if (minSearchLength && placeholder === _message.default.format('Search')) {
      // @ts-expect-error ts-error
      placeholder = _message.default.getFormatter('dxLookup-searchPlaceholder')(minSearchLength);
    }
    (_this$_searchBox6 = this._searchBox) === null || _this$_searchBox6 === void 0 || _this$_searchBox6.option('placeholder', placeholder);
  }
  _setAriaTargetForList() {}
  _listConfig() {
    return (0, _extend.extend)(super._listConfig(), {
      tabIndex: 0,
      grouped: this.option('grouped'),
      groupTemplate: this._getTemplateByOption('groupTemplate'),
      pullRefreshEnabled: this.option('pullRefreshEnabled'),
      useNativeScrolling: this.option('useNativeScrolling'),
      pullingDownText: this.option('pullingDownText'),
      pulledDownText: this.option('pulledDownText'),
      refreshingText: this.option('refreshingText'),
      pageLoadingText: this.option('pageLoadingText'),
      onScroll: this._scrollHandler.bind(this),
      onPullRefresh: this._pullRefreshHandler.bind(this),
      onPageLoading: this._pageLoadingHandler.bind(this),
      pageLoadMode: this.option('pageLoadMode'),
      nextButtonText: this.option('nextButtonText'),
      indicateLoading: this.option('searchEnabled')
    });
  }
  _listContentReadyHandler() {
    // @ts-expect-error ts-error
    super._listContentReadyHandler(...arguments);
    this._refreshSelected();
  }
  _runWithoutCloseOnScroll(callback) {
    var _this$_popup2;
    // NOTE: Focus can trigger "scroll" event
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      _scrollToSelectedItemEnabled
    } = this.option();
    const hideOnParentScroll = (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 ? void 0 : _this$_popup2.option('hideOnParentScroll');
    if (!_scrollToSelectedItemEnabled) {
      callback();
    } else {
      var _this$_popup3;
      (_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 || _this$_popup3.option('hideOnParentScroll', false);
      callback();
      this._hideOnParentScrollTimer = setTimeout(() => {
        var _this$_popup4;
        (_this$_popup4 = this._popup) === null || _this$_popup4 === void 0 || _this$_popup4.option('hideOnParentScroll', hideOnParentScroll);
      });
    }
  }
  _setFocusPolicy() {
    if (!this.option('focusStateEnabled')) {
      return;
    }
    this._runWithoutCloseOnScroll(() => {
      if (this.option('searchEnabled')) {
        var _this$_searchBox7;
        (_this$_searchBox7 = this._searchBox) === null || _this$_searchBox7 === void 0 || _this$_searchBox7.focus();
      } else {
        var _this$_list11;
        (_this$_list11 = this._list) === null || _this$_list11 === void 0 || _this$_list11.focus();
      }
    });
  }
  _focusTarget() {
    return this._$field;
  }
  _keyboardEventBindingTarget() {
    return this._$field;
  }
  _listItemClickHandler(e) {
    this._saveValueChangeEvent(e.event);
    this._selectListItem(e.itemData, e.event.currentTarget);
  }
  _selectListItem(itemData, target) {
    var _this$_list12;
    (_this$_list12 = this._list) === null || _this$_list12 === void 0 || _this$_list12.selectItem(target);
    const {
      applyValueMode
    } = this.option();
    if (applyValueMode === 'instantly') {
      this._applyButtonHandler();
    }
  }
  _currentSelectedItem() {
    var _this$_list13;
    return this.option('grouped')
    // @ts-expect-error ts-error
    ? this._list.option('selectedItems[0]').items[0] : (_this$_list13 = this._list) === null || _this$_list13 === void 0 ? void 0 : _this$_list13.option('selectedItems[0]');
  }
  _resetValue(e) {
    this._saveValueChangeEvent(e.event);
    this.option('value', null);
    this.option('opened', false);
  }
  // @ts-expect-error ts-error
  _searchValue() {
    return this.option('searchEnabled') && this._searchBox ? this._searchBox.option('value') : '';
  }
  _renderInputValue() {
    return super._renderInputValue(...arguments).always(() => {
      this._refreshSelected();
    });
  }
  _renderPlaceholder() {
    if (this.$element().find(`.${TEXTEDITOR_INPUT_CLASS}`).length === 0) {
      return;
    }
    super._renderPlaceholder();
  }
  _clean() {
    this._$fieldWrapper.remove();
    clearTimeout(this._hideOnParentScrollTimer);
    // @ts-expect-error ts-error
    this._hideOnParentScrollTimer = null;
    this._$searchBox = null;
    super._clean();
  }
  _optionChanged(args) {
    var _this$_searchBox8;
    const {
      name,
      fullName,
      value
    } = args;
    switch (name) {
      case 'dataSource':
        // @ts-expect-error ts-error
        super._optionChanged(...arguments);
        this._renderField();
        break;
      case 'searchEnabled':
        if (this._popup) {
          this._removeSearch();
          this._renderSearch();
        }
        break;
      case 'searchPlaceholder':
        this._setSearchPlaceholder();
        break;
      case 'minSearchLength':
        this._setSearchPlaceholder();
        // @ts-expect-error ts-error
        super._optionChanged(...arguments);
        break;
      case 'inputAttr':
        this._applyInputAttributes(value);
        break;
      case 'usePopover':
      case 'placeholder':
        this._invalidate();
        break;
      case 'clearButtonText':
      case 'showClearButton':
      case 'showCancelButton':
        this._setPopupOption('toolbarItems', this._getPopupToolbarItems());
        break;
      case 'applyValueMode':
        // @ts-expect-error ts-error
        super._optionChanged(...arguments);
        break;
      case 'onPageLoading':
        this._initPageLoadingAction();
        break;
      case 'onPullRefresh':
        this._initPullRefreshAction();
        break;
      case 'pullRefreshEnabled':
      case 'useNativeScrolling':
      case 'pullingDownText':
      case 'pulledDownText':
      case 'refreshingText':
      case 'pageLoadingText':
      case 'nextButtonText':
      case 'grouped':
      case 'groupTemplate':
        this._setListOption(name);
        break;
      case 'searchStartEvent':
        (_this$_searchBox8 = this._searchBox) === null || _this$_searchBox8 === void 0 || _this$_searchBox8.option('valueChangeEvent', value);
        break;
      case 'onScroll':
        this._initScrollAction();
        break;
      case 'pageLoadMode':
        this._setListOption('pageLoadMode', this.option('pageLoadMode'));
        break;
      case 'cleanSearchOnOpening':
      case '_scrollToSelectedItemEnabled':
        break;
      case 'dropDownOptions':
        switch (fullName) {
          case 'dropDownOptions.width':
          case 'dropDownOptions.height':
            {
              this._popupOptionChanged({
                name,
                fullName,
                value: value === 'auto' ? this.initialOption('dropDownOptions')[(0, _utils.getFieldName)(fullName)] : value
              });
              const {
                dropDownOptions
              } = this.option();
              // @ts-expect-error ts-error
              this._options.cache('dropDownOptions', dropDownOptions);
              break;
            }
          default:
            // @ts-expect-error ts-error
            super._optionChanged(...arguments);
        }
        break;
      case 'dropDownCentered':
        if (this.option('_scrollToSelectedItemEnabled')) {
          this.option('dropDownOptions.position', undefined);
          this._renderPopup();
        }
        break;
      default:
        // @ts-expect-error ts-error
        super._optionChanged(...arguments);
    }
  }
  focus() {
    // @ts-expect-error
    this.option('opened') ? this._setFocusPolicy() : _events_engine.default.trigger(this._focusTarget(), 'focus');
  }
  // @ts-expect-error ts-error
  field() {
    return this._$field;
  }
}
(0, _component_registrator.default)('dxLookup', Lookup);
var _default = exports.default = Lookup;