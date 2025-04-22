"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _click = require("../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _index = require("../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../common/core/localization/message"));
var _utils = require("../../common/data/data_source/utils");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _element_data = require("../../core/element_data");
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _array = require("../../core/utils/array");
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _selection_filter = require("../../core/utils/selection_filter");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _m_select_box = _interopRequireDefault(require("../ui/m_select_box"));
var _m_utils = _interopRequireDefault(require("../ui/text_box/m_utils.caret"));
var _m_utils2 = require("../ui/text_box/m_utils.scroll");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
function xor(a, b) {
  return (a || b) && !(a && b);
}
const TAGBOX_TAG_DATA_KEY = 'dxTagData';
const TAGBOX_TAG_DISPLAY_VALUE = 'dxTagDisplayValue';
const TAGBOX_CLASS = 'dx-tagbox';
const TAGBOX_TAG_CONTAINER_CLASS = 'dx-tag-container';
const TAGBOX_TAG_CLASS = 'dx-tag';
const TAGBOX_MULTI_TAG_CLASS = 'dx-tagbox-multi-tag';
const TAGBOX_TAG_REMOVE_BUTTON_CLASS = 'dx-tag-remove-button';
const TAGBOX_ONLY_SELECT_CLASS = 'dx-tagbox-only-select';
const TAGBOX_SINGLE_LINE_CLASS = 'dx-tagbox-single-line';
const TAGBOX_POPUP_WRAPPER_CLASS = 'dx-tagbox-popup-wrapper';
const TAGBOX_TAG_CONTENT_CLASS = 'dx-tag-content';
const TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS = 'dx-tagbox-default-template';
const TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS = 'dx-tagbox-custom-template';
const TEXTEDITOR_INPUT_CONTAINER_CLASS = 'dx-texteditor-input-container';
const TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER = -0.3;
class TagBox extends _m_select_box.default {
  _supportedKeys() {
    const parent = super._supportedKeys();
    // @ts-expect-error ts-error
    const sendToList = options => this._list._keyboardHandler(options);
    const rtlEnabled = this.option('rtlEnabled');
    return _extends({}, parent, {
      backspace(e) {
        if (!this._isCaretAtTheStart()) {
          return;
        }
        this._processKeyboardEvent(e);
        this._isTagRemoved = true;
        const $tagToDelete = this._$focusedTag || this._tagElements().last();
        if (this._$focusedTag) {
          this._moveTagFocus('prev', true);
        }
        if ($tagToDelete.length === 0) {
          return;
        }
        this._preserveFocusedTag = true;
        this._removeTagElement($tagToDelete);
        delete this._preserveFocusedTag;
      },
      upArrow: (e, opts) => e.altKey || !this._list ? parent.upArrow.call(this, e) : sendToList(opts),
      downArrow: (e, opts) => e.altKey || !this._list ? parent.downArrow.call(this, e) : sendToList(opts),
      del(e) {
        if (!this._$focusedTag || !this._isCaretAtTheStart()) {
          return;
        }
        this._processKeyboardEvent(e);
        this._isTagRemoved = true;
        const $tagToDelete = this._$focusedTag;
        this._moveTagFocus('next', true);
        this._preserveFocusedTag = true;
        this._removeTagElement($tagToDelete);
        delete this._preserveFocusedTag;
      },
      enter(e, options) {
        var _this$_list;
        const isListItemFocused = ((_this$_list = this._list) === null || _this$_list === void 0 ? void 0 : _this$_list.option('focusedElement')) !== null && this.option('opened') === true;
        const isCustomItem = this.option('acceptCustomValue') && !isListItemFocused;
        if (isCustomItem) {
          e.preventDefault();
          this._searchValue() !== '' && this._customItemAddedHandler(e);
          return;
        }
        if (this.option('opened')) {
          this._saveValueChangeEvent(e);
          sendToList(options);
          e.preventDefault();
        }
      },
      space(e, options) {
        const isOpened = this.option('opened');
        const isInputActive = this._shouldRenderSearchEvent();
        if (isOpened && !isInputActive) {
          this._saveValueChangeEvent(e);
          sendToList(options);
          e.preventDefault();
        }
      },
      leftArrow(e) {
        if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && rtlEnabled && !this._$focusedTag) {
          return;
        }
        e.preventDefault();
        const direction = rtlEnabled ? 'next' : 'prev';
        this._moveTagFocus(direction);
        if (!this.option('multiline')) {
          this._scrollContainer(direction);
        }
      },
      rightArrow(e) {
        if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && !rtlEnabled && !this._$focusedTag) {
          return;
        }
        e.preventDefault();
        const direction = rtlEnabled ? 'prev' : 'next';
        this._moveTagFocus(direction);
        !this.option('multiline') && this._scrollContainer(direction);
      }
    });
  }
  _processKeyboardEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
  }
  _isEmpty() {
    return this._getValue().length === 0;
  }
  _updateTagsContainer($element) {
    this._$tagsContainer = $element.addClass(TAGBOX_TAG_CONTAINER_CLASS);
  }
  // eslint-disable-next-line class-methods-use-this
  _allowSelectItemByTab() {
    return false;
  }
  _isCaretAtTheStart() {
    const position = (0, _m_utils.default)(this._input());
    return (position === null || position === void 0 ? void 0 : position.start) === 0 && position.end === 0;
  }
  _updateInputAriaActiveDescendant(id) {
    this.setAria('activedescendant', id, this._input());
  }
  _moveTagFocus(direction, clearOnBoundary) {
    if (!this._$focusedTag) {
      const tagElements = this._tagElements();
      this._$focusedTag = direction === 'next' ? tagElements.first() : tagElements.last();
      this._toggleFocusClass(true, this._$focusedTag);
      this._updateInputAriaActiveDescendant(this._$focusedTag.attr('id'));
      return;
    }
    const $nextFocusedTag = this._$focusedTag[direction](`.${TAGBOX_TAG_CLASS}`);
    if ($nextFocusedTag.length > 0) {
      this._replaceFocusedTag($nextFocusedTag);
      this._updateInputAriaActiveDescendant($nextFocusedTag.attr('id'));
    } else if (clearOnBoundary || direction === 'next' && this._isEditable()) {
      this._clearTagFocus();
      this._updateInputAriaActiveDescendant();
    }
  }
  _replaceFocusedTag($nextFocusedTag) {
    this._toggleFocusClass(false, this._$focusedTag);
    this._$focusedTag = $nextFocusedTag;
    this._toggleFocusClass(true, this._$focusedTag);
  }
  _clearTagFocus() {
    if (!this._$focusedTag) {
      return;
    }
    this._toggleFocusClass(false, this._$focusedTag);
    this._updateInputAriaActiveDescendant();
    delete this._$focusedTag;
  }
  _focusClassTarget($element) {
    if ($element && $element.length && $element[0] !== this._focusTarget()[0]) {
      return $element;
    }
    return super._focusClassTarget();
  }
  _getLabelContainer() {
    return this._$tagsContainer;
  }
  _getFieldElement() {
    return this._input();
  }
  _scrollContainer(direction) {
    if (this.option('multiline') || !(0, _window.hasWindow)()) {
      return;
    }
    if (!this._$tagsContainer) {
      return;
    }
    const scrollPosition = this._getScrollPosition(direction);
    // @ts-expect-error ts-error
    this._$tagsContainer.scrollLeft(scrollPosition);
  }
  _getScrollPosition(direction) {
    if (direction === 'start' || direction === 'end') {
      return this._getBorderPosition(direction);
    }
    return this._$focusedTag ? this._getFocusedTagPosition(direction) : this._getBorderPosition('end');
  }
  _getBorderPosition(direction) {
    const {
      rtlEnabled
    } = this.option();
    // @ts-expect-error ts-error
    const isScrollLeft = xor(direction === 'end', rtlEnabled);
    const scrollSign = rtlEnabled ? -1 : 1;
    return xor(isScrollLeft, !rtlEnabled) ? 0 : scrollSign * (this._$tagsContainer.get(0).scrollWidth - (0, _size.getOuterWidth)(this._$tagsContainer));
  }
  _getFocusedTagPosition(direction) {
    const rtlEnabled = this.option('rtlEnabled');
    // @ts-expect-error ts-error
    const isScrollLeft = xor(direction === 'next', rtlEnabled);
    // @ts-expect-error ts-error
    let {
      left: scrollOffset
    } = this._$focusedTag.position();
    let scrollLeft = this._$tagsContainer.scrollLeft();
    if (isScrollLeft) {
      scrollOffset += (0, _size.getOuterWidth)(this._$focusedTag, true) - (0, _size.getOuterWidth)(this._$tagsContainer);
    }
    if (xor(isScrollLeft, scrollOffset < 0)) {
      scrollLeft += scrollOffset;
    }
    return scrollLeft;
  }
  // eslint-disable-next-line class-methods-use-this
  _setNextValue() {}
  _getDefaultOptions() {
    return (0, _extend.extend)(super._getDefaultOptions(), {
      value: [],
      showDropDownButton: false,
      maxFilterQueryLength: 1500,
      tagTemplate: 'tag',
      selectAllText: _message.default.format('dxList-selectAll'),
      hideSelectedItems: false,
      selectedItems: [],
      selectAllMode: 'page',
      onSelectAllValueChanged: null,
      maxDisplayedTags: undefined,
      showMultiTagOnly: true,
      onMultiTagPreparing: null,
      multiline: true,
      useSubmitBehavior: true
    });
  }
  _init() {
    super._init();
    this._selectedItems = [];
    this._initSelectAllValueChangedAction();
  }
  _initActions() {
    super._initActions();
    this._initMultiTagPreparingAction();
  }
  _initMultiTagPreparingAction() {
    this._multiTagPreparingAction = this._createActionByOption('onMultiTagPreparing', {
      beforeExecute: e => {
        // @ts-expect-error ts-error
        this._multiTagPreparingHandler(e.args[0]);
      },
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _multiTagPreparingHandler(args) {
    const {
      length: selectedCount
    } = this._getValue();
    if (!this.option('showMultiTagOnly')) {
      // @ts-expect-error ts-error
      args.text = _message.default.getFormatter('dxTagBox-moreSelected')(selectedCount - this.option('maxDisplayedTags') + 1);
    } else {
      // @ts-expect-error ts-error
      args.text = _message.default.getFormatter('dxTagBox-selected')(selectedCount);
    }
  }
  _initDynamicTemplates() {
    // @ts-expect-error ts-error
    super._initDynamicTemplates();
    this._templateManager.addDefaultTemplates({
      tag: new _bindable_template.BindableTemplate(($container, data) => {
        const $tagContent = (0, _renderer.default)('<div>').addClass(TAGBOX_TAG_CONTENT_CLASS);
        (0, _renderer.default)('<span>').text(data.text ?? data).appendTo($tagContent);
        (0, _renderer.default)('<div>').addClass(TAGBOX_TAG_REMOVE_BUTTON_CLASS).appendTo($tagContent);
        $container.append($tagContent);
      }, ['text'], this.option('integrationOptions.watchMethod'), {
        // @ts-expect-error ts-error
        text: this._displayGetter
      })
    });
  }
  _toggleSubmitElement(enabled) {
    if (enabled) {
      this._renderSubmitElement();
      this._setSubmitValue();
    } else {
      if (this._$submitElement) {
        this._$submitElement.remove();
      }
      delete this._$submitElement;
    }
  }
  _renderSubmitElement() {
    if (!this.option('useSubmitBehavior')) {
      return;
    }
    const attributes = {
      multiple: 'multiple',
      'aria-label': 'Selected items'
    };
    this._$submitElement = (0, _renderer.default)('<select>')
    // @ts-expect-error ts-error
    .attr(attributes).css('display', 'none').appendTo(this.$element());
  }
  _setSubmitValue() {
    if (!this.option('useSubmitBehavior')) {
      return;
    }
    const value = this._getValue();
    const $options = [];
    for (let i = 0, n = value.length; i < n; i++) {
      const useDisplayText = this._shouldUseDisplayValue(value[i]);
      $options.push((0, _renderer.default)('<option>')
      // @ts-expect-error ts-error
      .val(useDisplayText ? this._displayGetter(value[i]) : value[i]).attr('selected', 'selected'));
    }
    this._getSubmitElement().empty()
    // @ts-expect-error ts-error
    .append($options);
  }
  _initMarkup() {
    this._tagElementsCache = (0, _renderer.default)();
    const isSingleLineMode = !this.option('multiline');
    this.$element().addClass(TAGBOX_CLASS).toggleClass(TAGBOX_ONLY_SELECT_CLASS, !(this.option('searchEnabled') || this.option('acceptCustomValue'))).toggleClass(TAGBOX_SINGLE_LINE_CLASS, isSingleLineMode);
    const elementAria = {
      role: 'application',
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: _message.default.format('dxTagBox-ariaRoleDescription')
    };
    this.setAria(elementAria, this.$element());
    this._initTagTemplate();
    super._initMarkup();
  }
  _getNewLabelId(actualId, newId, shouldRemove) {
    if (!actualId) {
      return newId;
    }
    if (shouldRemove) {
      if (actualId === newId) {
        return undefined;
      }
      return actualId.split(' ').filter(id => id !== newId).join(' ');
    }
    return `${actualId} ${newId}`;
  }
  _updateElementAria(id, shouldRemove) {
    const shouldClearLabel = !id;
    if (shouldClearLabel) {
      this.setAria('labelledby', undefined, this.$element());
      return;
    }
    const labelId = this.$element().attr('aria-labelledby');
    const newLabelId = this._getNewLabelId(labelId, id, shouldRemove);
    this.setAria('labelledby', newLabelId, this.$element());
  }
  _render() {
    super._render();
    this._renderTagRemoveAction();
    this._renderSingleLineScroll();
    this._scrollContainer('start');
  }
  _initTagTemplate() {
    this._tagTemplate = this._getTemplateByOption('tagTemplate');
  }
  _renderField() {
    const isDefaultFieldTemplate = !(0, _type.isDefined)(this.option('fieldTemplate'));
    this.$element().toggleClass(TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS, isDefaultFieldTemplate).toggleClass(TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS, !isDefaultFieldTemplate);
    super._renderField();
  }
  _renderTagRemoveAction() {
    const tagRemoveAction = this._createAction(this._removeTagHandler.bind(this));
    const eventName = (0, _index.addNamespace)(_click.name, 'dxTagBoxTagRemove');
    _events_engine.default.off(this._$tagsContainer, eventName);
    _events_engine.default.on(this._$tagsContainer, eventName, `.${TAGBOX_TAG_REMOVE_BUTTON_CLASS}`, event => {
      tagRemoveAction({
        event
      });
    });
  }
  _renderSingleLineScroll() {
    // @ts-expect-error ts-error
    const mouseWheelEvent = (0, _index.addNamespace)('dxmousewheel', this.NAME);
    const $element = this.$element();
    const isMultiline = this.option('multiline');
    _events_engine.default.off($element, mouseWheelEvent);
    if (_devices.default.real().deviceType !== 'desktop') {
      if (this._$tagsContainer) {
        this._$tagsContainer.css('overflowX', isMultiline ? '' : 'auto');
      }
      return;
    }
    if (isMultiline) {
      return;
    }
    _events_engine.default.on($element, mouseWheelEvent, this._tagContainerMouseWheelHandler.bind(this));
  }
  _tagContainerMouseWheelHandler(e) {
    const scrollLeft = this._$tagsContainer.scrollLeft();
    const delta = e.delta * TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER;
    if (!(0, _index.isCommandKeyPressed)(e) && (0, _m_utils2.allowScroll)(this._$tagsContainer, delta, true)) {
      // @ts-expect-error ts-error
      this._$tagsContainer.scrollLeft(scrollLeft + delta);
      return false;
    }
    return undefined;
  }
  _renderEvents() {
    super._renderEvents();
    const input = this._input();
    // @ts-expect-error ts-error
    const namespace = (0, _index.addNamespace)('keydown', this.NAME);
    _events_engine.default.on(input, namespace, e => {
      const keyName = (0, _index.normalizeKeyName)(e);
      // @ts-expect-error ts-error
      if (!this._isControlKey(keyName) && this._isEditable()) {
        this._clearTagFocus();
      }
    });
  }
  _popupWrapperClass() {
    return `${super._popupWrapperClass()} ${TAGBOX_POPUP_WRAPPER_CLASS}`;
  }
  _renderInput() {
    super._renderInput();
    this._renderPreventBlurOnInputClick();
  }
  _renderPreventBlurOnInputClick() {
    const eventName = (0, _index.addNamespace)('mousedown', 'dxTagBox');
    _events_engine.default.off(this._inputWrapper(), eventName);
    _events_engine.default.on(this._inputWrapper(), eventName, e => {
      if (e.target !== this._input()[0] && this._isFocused()) {
        e.preventDefault();
      }
    });
  }
  _renderInputValueImpl() {
    return this._renderMultiSelect();
  }
  _loadInputValue() {
    return (0, _deferred.when)();
  }
  _clearTextValue() {
    this._input().val('');
    this._toggleEmptinessEventHandler();
    this.option('text', '');
  }
  _focusInHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._scrollContainer('end');
    }
    super._focusInHandler(e);
  }
  _renderInputValue() {
    this.option('displayValue', this._searchValue());
    return super._renderInputValue(...arguments);
  }
  _restoreInputText(saveEditingValue) {
    if (!saveEditingValue) {
      this._clearTextValue();
    }
  }
  _focusOutHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._clearTagFocus();
      this._scrollContainer('start');
    }
    super._focusOutHandler(e);
  }
  _initSelectAllValueChangedAction() {
    this._selectAllValueChangeAction = this._createActionByOption('onSelectAllValueChanged');
  }
  _renderList() {
    super._renderList();
    this._setListDataSourceFilter();
  }
  _canListHaveFocus() {
    const {
      applyValueMode
    } = this.option();
    return applyValueMode === 'useButtons';
  }
  _listConfig() {
    const selectionMode = this.option('showSelectionControls') ? 'all' : 'multiple';
    return (0, _extend.extend)(super._listConfig(), {
      maxFilterLengthInRequest: this.option('maxFilterQueryLength'),
      selectionMode,
      selectAllText: this.option('selectAllText'),
      onSelectAllValueChanged: _ref => {
        let {
          value
        } = _ref;
        // @ts-expect-error ts-error
        this._selectAllValueChangeAction({
          value
        });
      },
      selectAllMode: this.option('selectAllMode'),
      selectedItems: this._selectedItems,
      onFocusedItemChanged: null
    });
  }
  _renderMultiSelect() {
    const d = (0, _deferred.Deferred)();
    this._updateTagsContainer(this._$textEditorInputContainer);
    this._renderInputSize();
    this._renderTags()
    // @ts-expect-error ts-error
    .done(d.resolve).fail(d.reject);
    // @ts-expect-error ts-error
    return d.promise();
  }
  _listItemClickHandler(e) {
    !this.option('showSelectionControls') && this._clearTextValue();
    const {
      applyValueMode
    } = this.option();
    if (applyValueMode === 'useButtons') {
      return;
    }
    super._listItemClickHandler(e);
    this._saveValueChangeEvent(undefined);
  }
  _shouldClearFilter() {
    const shouldClearFilter = super._shouldClearFilter();
    const showSelectionControls = this.option('showSelectionControls');
    return !showSelectionControls && shouldClearFilter;
  }
  _renderInputSize() {
    const $input = this._input();
    const value = $input.val();
    const isEmptyInput = (0, _type.isString)(value) && value;
    const cursorWidth = 5;
    let width = '';
    let size;
    const canTypeText = this.option('searchEnabled') || this.option('acceptCustomValue');
    if (isEmptyInput && canTypeText) {
      const $calculationElement = (0, _dom.createTextElementHiddenCopy)($input, value, {
        includePaddings: true
      });
      $calculationElement.insertAfter($input);
      width = (0, _size.getOuterWidth)($calculationElement) + cursorWidth;
      $calculationElement.remove();
    } else if (!value) {
      size = 1;
    }
    $input.css('width', width);
    $input.attr('size', size ?? '');
  }
  _renderInputSubstitution() {
    super._renderInputSubstitution();
    this._updateWidgetHeight();
  }
  _getValue() {
    const {
      value
    } = this.option();
    return value || [];
  }
  _multiTagRequired() {
    const values = this._getValue();
    const maxDisplayedTags = this.option('maxDisplayedTags');
    return (0, _type.isDefined)(maxDisplayedTags) && values.length > maxDisplayedTags;
  }
  _renderMultiTag($input) {
    const tagId = `dx-${new _guid.default()}`;
    const $tag = (0, _renderer.default)('<div>').attr('id', tagId).addClass(TAGBOX_TAG_CLASS).addClass(TAGBOX_MULTI_TAG_CLASS);
    const args = {
      multiTagElement: (0, _element.getPublicElement)($tag),
      selectedItems: this.option('selectedItems')
    };
    // @ts-expect-error ts-error
    this._multiTagPreparingAction(args);
    // @ts-expect-error
    if (args.cancel) {
      return false;
    }
    // @ts-expect-error
    $tag.data(TAGBOX_TAG_DATA_KEY, args.text);
    $tag.insertBefore($input);
    this._tagTemplate.render({
      // @ts-expect-error
      model: args.text,
      container: (0, _element.getPublicElement)($tag)
    });
    // @ts-expect-error
    const tagText = args.text;
    this._setTagAria($tag, tagText);
    this._updateElementAria(tagId);
    return $tag;
  }
  _getFilter(creator) {
    const dataSourceFilter = this._dataController.filter();
    const filterExpr = creator.getCombinedFilter(this.option('valueExpr'), dataSourceFilter);
    const filterQueryLength = encodeURI(JSON.stringify(filterExpr)).length;
    const maxFilterQueryLength = this.option('maxFilterQueryLength');
    // @ts-expect-error ts-error
    if (filterQueryLength <= maxFilterQueryLength) {
      return filterExpr;
    }
    _ui.default.log('W1019', maxFilterQueryLength);
  }
  _getFilteredItems(values) {
    var _this$_loadFilteredIt, _this$_list2;
    (_this$_loadFilteredIt = this._loadFilteredItemsPromise) === null || _this$_loadFilteredIt === void 0 || _this$_loadFilteredIt.reject();
    const creator = new _selection_filter.SelectionFilterCreator(values);
    const listSelectedItems = (_this$_list2 = this._list) === null || _this$_list2 === void 0 ? void 0 : _this$_list2.option('selectedItems');
    // @ts-expect-error ts-error
    const isListItemsLoaded = !!listSelectedItems && this._list._dataController.isLoaded();
    const selectedItems = listSelectedItems || this.option('selectedItems');
    // @ts-expect-error ts-error
    const clientFilterFunction = creator.getLocalFilter(this._valueGetter);
    // @ts-expect-error ts-error
    const filteredItems = selectedItems.filter(clientFilterFunction);
    const selectedItemsAlreadyLoaded = filteredItems.length === values.length;
    const d = (0, _deferred.Deferred)();
    const dataController = this._dataController;
    if (!this._dataSource) {
      return d.resolve([]).promise();
    }
    if ((!this._isDataSourceChanged || isListItemsLoaded) && selectedItemsAlreadyLoaded && !this._isDataSourceOptionChanged) {
      return d.resolve(filteredItems).promise();
    }
    const {
      customQueryParams,
      expand,
      select
    } = dataController.loadOptions();
    const filter = this._getFilter(creator);
    dataController.loadFromStore({
      filter,
      customQueryParams,
      expand,
      select
    }).done((data, extra) => {
      this._isDataSourceChanged = false;
      this._isDataSourceOptionChanged = false;
      if (this._disposed) {
        d.reject();
        return;
      }
      const {
        data: items
      } = (0, _utils.normalizeLoadResult)(data, extra);
      const mappedItems = dataController.applyMapFunction(items);
      d.resolve(mappedItems.filter(clientFilterFunction));
    }).fail(d.reject);
    this._loadFilteredItemsPromise = d;
    return d.promise();
  }
  _createTagsData(values, filteredItems) {
    const items = [];
    const cache = {};
    // @ts-expect-error ts-error
    const isValueExprSpecified = this._valueGetterExpr() === 'this';
    const {
      acceptCustomValue
    } = this.option();
    const filteredValues = {};
    filteredItems.forEach(filteredItem => {
      // @ts-expect-error
      const filteredItemValue = isValueExprSpecified ? JSON.stringify(filteredItem) : this._valueGetter(filteredItem);
      filteredValues[filteredItemValue] = filteredItem;
    });
    const loadItemPromises = [];
    values.forEach((value, index) => {
      const currentItem = filteredValues[isValueExprSpecified ? JSON.stringify(value) : value];
      if (isValueExprSpecified && !(0, _type.isDefined)(currentItem)) {
        if (!this._dataSource) {
          return;
        }
        loadItemPromises.push(
        // @ts-expect-error ts-error
        this._loadItem(value, cache).done(item => {
          const newItem = this._createTagData(item, value);
          // @ts-expect-error ts-error
          items.splice(index, 0, newItem);
        }).fail(() => {
          if (acceptCustomValue) {
            const newItem = this._createTagData(undefined, value);
            // @ts-expect-error ts-error
            items.splice(index, 0, newItem);
          }
        }));
      } else {
        const newItem = this._createTagData(currentItem, value);
        // @ts-expect-error ts-error
        items.splice(index, 0, newItem);
      }
    });
    const d = (0, _deferred.Deferred)();
    _deferred.when.apply(this, loadItemPromises).always(() => {
      d.resolve(items);
    });
    return d.promise();
  }
  _createTagData(item, value) {
    if ((0, _type.isDefined)(item)) {
      // @ts-expect-error ts-error
      this._selectedItems.push(item);
      return item;
    }
    const selectedItem = this.option('selectedItem');
    // @ts-expect-error
    const customItem = this._valueGetter(selectedItem) === value ? selectedItem : value;
    return customItem;
  }
  _isGroupedData() {
    return this.option('grouped') && !this._dataController.group();
  }
  _getItemsByValues(values) {
    const resultItems = [];
    values.forEach(value => {
      const item = this._getItemFromPlain(value);
      if ((0, _type.isDefined)(item)) {
        // @ts-expect-error ts-error
        resultItems.push(item);
      }
    });
    return resultItems;
  }
  _getFilteredGroupedItems(values) {
    const selectedItems = (0, _deferred.Deferred)();
    if (this._filteredGroupedItemsLoadPromise) {
      // @ts-expect-error ts-error
      this._dataController.cancel(this._filteredGroupedItemsLoadPromise.operationId);
    }
    if (!this._dataController.items().length) {
      this._filteredGroupedItemsLoadPromise = this._dataController.load().done(() => {
        selectedItems.resolve(this._getItemsByValues(values));
      }).fail(() => {
        selectedItems.resolve([]);
      }).always(() => {
        this._filteredGroupedItemsLoadPromise = undefined;
      });
    } else {
      selectedItems.resolve(this._getItemsByValues(values));
    }
    return selectedItems.promise();
  }
  _loadTagsData() {
    const values = this._getValue();
    const tagData = (0, _deferred.Deferred)();
    this._selectedItems = [];
    const filteredItemsPromise = this._isGroupedData() ? this._getFilteredGroupedItems(values) : this._getFilteredItems(values);
    filteredItemsPromise
    // @ts-expect-error ts-error
    .done(filteredItems => {
      const items = this._createTagsData(values, filteredItems);
      // @ts-expect-error ts-error
      items.always(data => {
        tagData.resolve(data);
      });
    }).fail(tagData.reject.bind(this));
    return tagData.promise();
  }
  _renderTags() {
    const d = (0, _deferred.Deferred)();
    let isPlainDataUsed = false;
    if (this._shouldGetItemsFromPlain(this._valuesToUpdate)) {
      this._selectedItems = this._getItemsFromPlain(this._valuesToUpdate);
      if (this._selectedItems.length === this._valuesToUpdate.length) {
        this._tagsToRender = this._selectedItems;
        this._renderTagsImpl();
        isPlainDataUsed = true;
        d.resolve();
      }
    }
    if (!isPlainDataUsed) {
      this._loadTagsData()
      // @ts-expect-error ts-error
      .done(items => {
        if (this._disposed) {
          d.reject();
          return;
        }
        this._tagsToRender = items;
        this._renderTagsImpl();
        d.resolve();
      }).fail(d.reject);
    }
    return d.promise();
  }
  _renderTagsImpl() {
    this._renderField();
    if (this._shouldUpdateSelectedItems()) {
      // @ts-expect-error ts-error
      this.option('selectedItems', this._selectedItems.slice());
    }
    this._cleanTags();
    const fieldTemplate = this._getFieldTemplate();
    if (!fieldTemplate) {
      this._renderTagsCore();
    }
  }
  _shouldGetItemsFromPlain(values) {
    return values && this._dataController.isLoaded() && values.length <= this._getPlainItems().length;
  }
  _getItemsFromPlain(values) {
    let selectedItems = this._getSelectedItemsFromList(values);
    const needFilterPlainItems = selectedItems.length === 0 && values.length > 0 || selectedItems.length < values.length;
    if (needFilterPlainItems) {
      const plainItems = this._getPlainItems();
      selectedItems = this._filterSelectedItems(plainItems, values);
    }
    return selectedItems;
  }
  _getSelectedItemsFromList(values) {
    var _this$_list3;
    const listSelectedItems = (_this$_list3 = this._list) === null || _this$_list3 === void 0 ? void 0 : _this$_list3.option('selectedItems');
    let selectedItems = [];
    if (values.length === (listSelectedItems === null || listSelectedItems === void 0 ? void 0 : listSelectedItems.length)) {
      selectedItems = this._filterSelectedItems(listSelectedItems, values);
    }
    return selectedItems;
  }
  _filterSelectedItems(plainItems, values) {
    const selectedItems = plainItems.filter(dataItem => {
      let currentValue;
      for (let i = 0; i < values.length; i++) {
        currentValue = values[i];
        if ((0, _type.isObject)(currentValue)) {
          // @ts-expect-error ts-error
          if (this._isValueEquals(dataItem, currentValue)) {
            return true;
          }
          // @ts-expect-error ts-error
        } else if (this._isValueEquals(this._valueGetter(dataItem), currentValue)) {
          return true;
        }
      }
      return false;
    }, this);
    return selectedItems;
  }
  _processDataSourceChanging() {
    this._isDataSourceOptionChanged = true;
    super._processDataSourceChanging();
  }
  _integrateInput() {
    super._integrateInput();
    const tagsContainer = this.$element().find(`.${TEXTEDITOR_INPUT_CONTAINER_CLASS}`);
    this._updateTagsContainer(tagsContainer);
    this._renderTagRemoveAction();
    this._renderTagsCore();
  }
  _renderTagsCore() {
    var _this$_popup;
    this._renderTagsElements(this._tagsToRender);
    this._renderEmptyState();
    if (!this._preserveFocusedTag) {
      this._clearTagFocus();
    }
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.refreshPosition();
  }
  _shouldUpdateSelectedItems() {
    var _this$_selectedItems, _this$_selectedItems2;
    const {
      selectedItems
    } = this.option();
    if ((0, _type.isDefined)(selectedItems) && selectedItems.length !== ((_this$_selectedItems = this._selectedItems) === null || _this$_selectedItems === void 0 ? void 0 : _this$_selectedItems.length)) {
      return true;
    }
    const intersection = (0, _array.getIntersection)(selectedItems, this._selectedItems);
    if (intersection.length !== ((_this$_selectedItems2 = this._selectedItems) === null || _this$_selectedItems2 === void 0 ? void 0 : _this$_selectedItems2.length)) {
      return true;
    }
    return false;
  }
  _renderTagsElements(items) {
    const $multiTag = this._multiTagRequired() && this._renderMultiTag(this._input());
    const showMultiTagOnly = this.option('showMultiTagOnly');
    const maxDisplayedTags = this.option('maxDisplayedTags');
    items.forEach((item, index) => {
      // @ts-expect-error ts-error
      if ($multiTag && showMultiTagOnly || $multiTag && !showMultiTagOnly && index - maxDisplayedTags >= -1) {
        return false;
      }
      this._renderTag(item, $multiTag || this._input());
      return undefined;
    });
    if (this._isFocused()) {
      this._scrollContainer('end');
    }
    this._refreshTagElements();
  }
  _cleanTags() {
    if (this._multiTagRequired()) {
      this._tagElements().remove();
    } else {
      const $tags = this._tagElements();
      const selectedItems = this.option('selectedItems') ?? [];
      // @ts-expect-error ts-error
      const values = selectedItems.map(item => this._valueGetter(item));
      (0, _iterator.each)($tags, (_, tag) => {
        const $tag = (0, _renderer.default)(tag);
        const tagData = $tag.data(TAGBOX_TAG_DATA_KEY);
        if (!values.includes(tagData)) {
          $tag.remove();
        }
      });
    }
    this._updateElementAria();
  }
  _renderEmptyState() {
    const isEmpty = !(this._getValue().length
    // @ts-expect-error ts-error
    || this._selectedItems.length || this._searchValue());
    this._toggleEmptiness(isEmpty);
    this._renderDisplayText();
  }
  _renderDisplayText() {
    this._renderInputSize();
  }
  _refreshTagElements() {
    this._tagElementsCache = this.$element().find(`.${TAGBOX_TAG_CLASS}`);
  }
  _tagElements() {
    // @ts-expect-error ts-error
    return this._tagElementsCache;
  }
  _applyTagTemplate(item, $tag) {
    this._tagTemplate.render({
      model: item,
      container: (0, _element.getPublicElement)($tag)
    });
  }
  _renderTag(item, $input) {
    // @ts-expect-error ts-error
    const value = this._valueGetter(item);
    if (!(0, _type.isDefined)(value)) {
      return;
    }
    let $tag = this._getTag(value);
    // @ts-expect-error ts-error
    const displayValue = this._displayGetter(item);
    const itemModel = this._getItemModel(item, displayValue);
    if ($tag) {
      const tagDisplayValue = $tag.data(TAGBOX_TAG_DISPLAY_VALUE);
      if ((0, _type.isDefined)(displayValue) && !(0, _common.equalByValue)(tagDisplayValue, displayValue)) {
        $tag.empty();
        this._applyTagTemplate(itemModel, $tag);
      }
      this._updateElementAria($tag.attr('id'));
    } else {
      const tagId = `dx-${new _guid.default()}`;
      $tag = this._createTag(value, $input, tagId, displayValue);
      this._setTagAria($tag, (0, _type.isDefined)(displayValue) ? displayValue : value);
      if ((0, _type.isDefined)(item)) {
        this._applyTagTemplate(itemModel, $tag);
      } else {
        this._applyTagTemplate(value, $tag);
      }
      this._updateElementAria(tagId);
    }
  }
  _setTagAria($tag, tagText) {
    const aria = {
      role: 'button',
      label: tagText,
      // eslint-disable-next-line spellcheck/spell-checker
      roledescription: _message.default.format('dxTagBox-tagRoleDescription')
    };
    this.setAria(aria, $tag);
  }
  _getItemModel(item, displayValue) {
    if ((0, _type.isObject)(item) && (0, _type.isDefined)(displayValue)) {
      return item;
    }
    return (0, _common.ensureDefined)(displayValue, '');
  }
  _getTag(value) {
    const $tags = this._tagElements();
    const tagsLength = $tags.length;
    let result = false;
    for (let i = 0; i < tagsLength; i++) {
      const $tag = $tags[i];
      const tagData = (0, _element_data.data)($tag, TAGBOX_TAG_DATA_KEY);
      if (value === tagData || (0, _common.equalByValue)(value, tagData)) {
        result = (0, _renderer.default)($tag);
        break;
      }
    }
    return result;
  }
  _createTag(value, $input, tagId, displayValue) {
    return (0, _renderer.default)('<div>').attr('id', tagId).addClass(TAGBOX_TAG_CLASS).data(TAGBOX_TAG_DATA_KEY, value).data(TAGBOX_TAG_DISPLAY_VALUE, displayValue).insertBefore($input);
  }
  _toggleEmptinessEventHandler() {
    this._toggleEmptiness(!this._getValue().length && !this._searchValue().length);
  }
  _customItemAddedHandler(e) {
    super._customItemAddedHandler(e);
    this._clearTextValue();
  }
  _removeTagHandler(args) {
    const e = args.event;
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    const $tag = (0, _renderer.default)(e.target).closest(`.${TAGBOX_TAG_CLASS}`);
    this._removeTagElement($tag);
  }
  _removeTagElement($tag) {
    if ($tag.hasClass(TAGBOX_MULTI_TAG_CLASS)) {
      if (!this.option('showMultiTagOnly')) {
        const {
          maxDisplayedTags
        } = this.option();
        this.option('value', this._getValue().slice(0, maxDisplayedTags));
      } else {
        this.clear();
      }
      return;
    }
    const itemValue = $tag.data(TAGBOX_TAG_DATA_KEY);
    const itemId = $tag.attr('id');
    this._removeTagWithUpdate(itemValue);
    this._updateElementAria(itemId, true);
    this._refreshTagElements();
  }
  // eslint-disable-next-line class-methods-use-this
  _updateField() {}
  _removeTagWithUpdate(itemValue) {
    const value = this._getValue().slice();
    this._removeTag(value, itemValue);
    this.option('value', value);
    this.option('selectedItem', null);
    if (value.length === 0) {
      this._clearTagFocus();
    }
  }
  _getCurrentValue() {
    return this._lastValue();
  }
  _selectionChangeHandler(e) {
    const {
      applyValueMode
    } = this.option();
    if (applyValueMode === 'useButtons') {
      return;
    }
    const value = this._getValue().slice();
    (0, _iterator.each)(e.removedItems || [], (_, removedItem) => {
      // @ts-expect-error ts-error
      this._removeTag(value, this._valueGetter(removedItem));
    });
    (0, _iterator.each)(e.addedItems || [], (_, addedItem) => {
      // @ts-expect-error ts-error
      this._addTag(value, this._valueGetter(addedItem));
    });
    this._updateWidgetHeight();
    // @ts-expect-error ts-error
    if (!(0, _common.equalByValue)(this._list.option('selectedItemKeys'), this.option('value'))) {
      // @ts-expect-error ts-error
      const listSelectionChangeEvent = this._list._getSelectionChangeEvent();
      listSelectionChangeEvent && this._saveValueChangeEvent(listSelectionChangeEvent);
      this.option('value', value);
    }
    // @ts-expect-error ts-error
    this._list._saveSelectionChangeEvent(undefined);
  }
  _removeTag(value, item) {
    const index = this._valueIndex(item, value);
    if (index >= 0) {
      value.splice(index, 1);
    }
  }
  _addTag(value, item) {
    const index = this._valueIndex(item);
    if (index < 0) {
      value.push(item);
    }
  }
  _fieldRenderData() {
    // @ts-expect-error ts-error
    return this._selectedItems.slice();
  }
  _completeSelection(value) {
    if (!this.option('showSelectionControls')) {
      this._setValue(value);
    }
  }
  _setValue(value) {
    var _this$_list4;
    if (value === null) {
      return;
    }
    const {
      applyValueMode
    } = this.option();
    const useButtons = applyValueMode === 'useButtons';
    const valueIndex = this._valueIndex(value);
    const values = (useButtons ? ((_this$_list4 = this._list) === null || _this$_list4 === void 0 ? void 0 : _this$_list4.option('selectedItemKeys')) || [] : this._getValue()).slice();
    if (valueIndex >= 0) {
      values.splice(valueIndex, 1);
    } else {
      values.push(value);
    }
    if (useButtons) {
      var _this$_list5;
      (_this$_list5 = this._list) === null || _this$_list5 === void 0 || _this$_list5.option('selectedItemKeys', values);
    } else {
      this.option('value', values);
    }
  }
  _isSelectedValue(value, cache) {
    return this._valueIndex(value, null, cache) > -1;
  }
  _valueIndex(value, values, cache) {
    let result = -1;
    if (cache && typeof value !== 'object') {
      if (!cache.indexByValues) {
        cache.indexByValues = {};
        values = values || this._getValue();
        values.forEach((value, index) => {
          cache.indexByValues[value] = index;
        });
      }
      if (value in cache.indexByValues) {
        return cache.indexByValues[value];
      }
    }
    values = values || this._getValue();
    (0, _iterator.each)(values, (index, selectedValue) => {
      // @ts-expect-error ts-error
      if (this._isValueEquals(value, selectedValue)) {
        result = index;
        return false;
      }
      return undefined;
    });
    return result;
  }
  _lastValue() {
    const values = this._getValue();
    const lastValue = values[values.length - 1];
    return lastValue ?? null;
  }
  _shouldRenderSearchEvent() {
    const {
      searchEnabled,
      acceptCustomValue
    } = this.option();
    return searchEnabled || acceptCustomValue;
  }
  _searchHandler(e) {
    if (this.option('searchEnabled') && !!e && !this._isTagRemoved) {
      super._searchHandler(arguments);
      this._setListDataSourceFilter();
    }
    this._updateWidgetHeight();
    delete this._isTagRemoved;
  }
  _updateWidgetHeight() {
    const element = this.$element();
    const originalHeight = (0, _size.getHeight)(element);
    this._renderInputSize();
    const currentHeight = (0, _size.getHeight)(element);
    if (this._popup && this.option('opened') && this._isEditable() && currentHeight !== originalHeight) {
      this._popup.repaint();
    }
  }
  _refreshSelected() {
    var _this$_list6;
    ((_this$_list6 = this._list) === null || _this$_list6 === void 0 ? void 0 : _this$_list6.getDataSource()) && this._list.option('selectedItems', this._selectedItems);
  }
  _resetListDataSourceFilter() {
    const dataController = this._dataController;
    delete this._userFilter;
    dataController.filter(null);
    dataController.reload();
  }
  _setListDataSourceFilter() {
    if (!this.option('hideSelectedItems') || !this._list) {
      return;
    }
    const dataController = this._dataController;
    // @ts-expect-error ts-error
    const valueGetterExpr = this._valueGetterExpr();
    if ((0, _type.isString)(valueGetterExpr) && valueGetterExpr !== 'this') {
      const filter = this._dataSourceFilterExpr();
      if (this._userFilter === undefined) {
        this._userFilter = dataController.filter() || null;
      }
      // @ts-expect-error ts-error
      this._userFilter && filter.push(this._userFilter);
      filter.length ? dataController.filter(filter) : dataController.filter(null);
    } else {
      dataController.filter(this._dataSourceFilterFunction.bind(this));
    }
    dataController.load();
  }
  _dataSourceFilterExpr() {
    const filter = [];
    // @ts-expect-error
    this._getValue().forEach(value => filter.push(['!', [this._valueGetterExpr(), value]]));
    return filter;
  }
  _dataSourceFilterFunction(itemData) {
    // @ts-expect-error ts-error
    const itemValue = this._valueGetter(itemData);
    let result = true;
    (0, _iterator.each)(this._getValue(), (index, value) => {
      // @ts-expect-error ts-error
      if (this._isValueEquals(value, itemValue)) {
        result = false;
        return false;
      }
      return undefined;
    });
    return result;
  }
  _dataSourceChangedHandler() {
    this._isDataSourceChanged = true;
    // @ts-expect-error ts-error
    super._dataSourceChangedHandler.apply(this, arguments);
  }
  _applyButtonHandler(args) {
    this._saveValueChangeEvent(args.event);
    this.option('value', this._getSortedListValues());
    this._clearTextValue();
    super._applyButtonHandler();
    this._cancelSearchIfNeed();
  }
  _getSortedListValues() {
    const listValues = this._getListValues();
    const {
      value
    } = this.option();
    const currentValue = value || [];
    const existedItems = listValues.length ? (0, _array.getIntersection)(currentValue, listValues) : [];
    const newItems = existedItems.length ? (0, _array.removeDuplicates)(listValues, currentValue) : listValues;
    return existedItems.concat(newItems);
  }
  _getListValues() {
    if (!this._list) {
      return [];
    }
    return this._getPlainItems(this._list.option('selectedItems'))
    // @ts-expect-error
    .map(item => this._valueGetter(item));
  }
  _setListDataSource() {
    const currentValue = this._getValue();
    super._setListDataSource();
    const {
      value
    } = this.option();
    if (currentValue !== value) {
      this.option('value', currentValue);
    }
    this._refreshSelected();
  }
  _renderOpenedState() {
    super._renderOpenedState();
    const {
      applyValueMode
    } = this.option();
    if (applyValueMode === 'useButtons' && !this.option('opened')) {
      this._refreshSelected();
    }
  }
  clear() {
    this._restoreInputText();
    const defaultValue = this._getDefaultOptions().value;
    const {
      value: currentValue
    } = this.option();
    if (defaultValue && defaultValue.length === 0 && currentValue && defaultValue.length === currentValue.length) {
      return;
    }
    super.clear();
  }
  _clean() {
    super._clean();
    delete this._valuesToUpdate;
    delete this._tagTemplate;
    delete this._tagsToRender;
  }
  _getSelectedItemsDifference(newItems, previousItems) {
    if (!newItems.length) {
      return {
        addedItems: [],
        removedItems: previousItems.slice()
      };
    }
    if (!previousItems.length) {
      return {
        addedItems: newItems.slice(),
        removedItems: []
      };
    }
    const previousItemsValuesMap = previousItems.reduce((map, item) => {
      // @ts-expect-error ts-error
      const value = this._valueGetter(item);
      map[value] = item;
      return map;
    }, {});
    const addedItems = [];
    newItems.forEach(item => {
      // @ts-expect-error ts-error
      const value = this._valueGetter(item);
      if (!previousItemsValuesMap[value]) {
        addedItems.push(item);
      }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete previousItemsValuesMap[value];
    });
    return {
      addedItems,
      removedItems: Object.values(previousItemsValuesMap)
    };
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'onSelectAllValueChanged':
        this._initSelectAllValueChangedAction();
        break;
      case 'onMultiTagPreparing':
        this._initMultiTagPreparingAction();
        this._renderTags();
        break;
      case 'hideSelectedItems':
        if (value) {
          this._setListDataSourceFilter();
        } else {
          this._resetListDataSourceFilter();
        }
        break;
      case 'useSubmitBehavior':
        this._toggleSubmitElement(value);
        break;
      case 'displayExpr':
        super._optionChanged(args);
        this._initTemplates();
        this._invalidate();
        break;
      case 'tagTemplate':
        this._initTagTemplate();
        this._invalidate();
        break;
      case 'selectAllText':
        this._setListOption('selectAllText', this.option('selectAllText'));
        break;
      case 'readOnly':
      case 'disabled':
        super._optionChanged(args);
        !value && this._refreshEvents();
        break;
      case 'value':
        this._valuesToUpdate = value;
        super._optionChanged(args);
        this._valuesToUpdate = undefined;
        this._setListDataSourceFilter();
        break;
      case 'maxDisplayedTags':
      case 'showMultiTagOnly':
        this._renderTags();
        break;
      case 'selectAllMode':
        this._setListOption(name, value);
        break;
      case 'selectedItem':
        break;
      case 'selectedItems':
        this._selectionChangedAction(this._getSelectedItemsDifference(value, previousValue));
        break;
      case 'multiline':
        this.$element().toggleClass(TAGBOX_SINGLE_LINE_CLASS, !value);
        this._renderSingleLineScroll();
        break;
      case 'maxFilterQueryLength':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _getActualSearchValue() {
    return super._getActualSearchValue() || this._searchValue();
  }
  _popupHidingHandler() {
    super._popupHidingHandler();
    this._clearFilter();
  }
}
(0, _component_registrator.default)('dxTagBox', TagBox);
var _default = exports.default = TagBox;