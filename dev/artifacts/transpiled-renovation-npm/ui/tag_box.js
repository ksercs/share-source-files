"use strict";

exports.default = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _element_data = require("../core/element_data");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _common = require("../core/utils/common");
var _selection_filter = require("../core/utils/selection_filter");
var _deferred = require("../core/utils/deferred");
var _dom = require("../core/utils/dom");
var _element = require("../core/element");
var _type = require("../core/utils/type");
var _window = require("../core/utils/window");
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _array = require("../core/utils/array");
var _message = _interopRequireDefault(require("../localization/message"));
var _index = require("../events/utils/index");
var _click = require("../events/click");
var _utils = _interopRequireDefault(require("./text_box/utils.caret"));
var _utils2 = require("../data/data_source/utils");
var _guid = _interopRequireDefault(require("../core/guid"));
var _select_box = _interopRequireDefault(require("./select_box"));
var _bindable_template = require("../core/templates/bindable_template");
var _utils3 = require("./text_box/utils.scroll");
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE tagBox

var TAGBOX_TAG_DATA_KEY = 'dxTagData';
var TAGBOX_CLASS = 'dx-tagbox';
var TAGBOX_TAG_CONTAINER_CLASS = 'dx-tag-container';
var TAGBOX_TAG_CLASS = 'dx-tag';
var TAGBOX_MULTI_TAG_CLASS = 'dx-tagbox-multi-tag';
var TAGBOX_CUSTOM_TAG_CLASS = 'dx-tag-custom';
var TAGBOX_TAG_REMOVE_BUTTON_CLASS = 'dx-tag-remove-button';
var TAGBOX_ONLY_SELECT_CLASS = 'dx-tagbox-only-select';
var TAGBOX_SINGLE_LINE_CLASS = 'dx-tagbox-single-line';
var TAGBOX_POPUP_WRAPPER_CLASS = 'dx-tagbox-popup-wrapper';
var TAGBOX_TAG_CONTENT_CLASS = 'dx-tag-content';
var TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS = 'dx-tagbox-default-template';
var TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS = 'dx-tagbox-custom-template';
var TEXTEDITOR_INPUT_CONTAINER_CLASS = 'dx-texteditor-input-container';
var TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER = -0.3;
var TagBox = _select_box.default.inherit({
  _supportedKeys: function _supportedKeys() {
    var _this = this;
    var parent = this.callBase();
    var sendToList = function sendToList(options) {
      return _this._list._keyboardHandler(options);
    };
    var rtlEnabled = this.option('rtlEnabled');
    return (0, _extend.extend)({}, parent, {
      backspace: function backspace(e) {
        if (!this._isCaretAtTheStart()) {
          return;
        }
        this._processKeyboardEvent(e);
        this._isTagRemoved = true;
        var $tagToDelete = this._$focusedTag || this._tagElements().last();
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
      upArrow: function upArrow(e, opts) {
        return e.altKey || !_this._list ? parent.upArrow.call(_this, e) : sendToList(opts);
      },
      downArrow: function downArrow(e, opts) {
        return e.altKey || !_this._list ? parent.downArrow.call(_this, e) : sendToList(opts);
      },
      del: function del(e) {
        if (!this._$focusedTag || !this._isCaretAtTheStart()) {
          return;
        }
        this._processKeyboardEvent(e);
        this._isTagRemoved = true;
        var $tagToDelete = this._$focusedTag;
        this._moveTagFocus('next', true);
        this._preserveFocusedTag = true;
        this._removeTagElement($tagToDelete);
        delete this._preserveFocusedTag;
      },
      enter: function enter(e, options) {
        var isListItemFocused = this._list && this._list.option('focusedElement') !== null;
        var isCustomItem = this.option('acceptCustomValue') && !isListItemFocused;
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
      space: function space(e, options) {
        var isOpened = this.option('opened');
        var isInputActive = this._shouldRenderSearchEvent();
        if (isOpened && !isInputActive) {
          this._saveValueChangeEvent(e);
          sendToList(options);
          e.preventDefault();
        }
      },
      leftArrow: function leftArrow(e) {
        if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && rtlEnabled && !this._$focusedTag) {
          return;
        }
        e.preventDefault();
        var direction = rtlEnabled ? 'next' : 'prev';
        this._moveTagFocus(direction);
        !this.option('multiline') && this._scrollContainer(direction);
      },
      rightArrow: function rightArrow(e) {
        if (!this._isCaretAtTheStart() || this._isEmpty() || this._isEditable() && !rtlEnabled && !this._$focusedTag) {
          return;
        }
        e.preventDefault();
        var direction = rtlEnabled ? 'prev' : 'next';
        this._moveTagFocus(direction);
        !this.option('multiline') && this._scrollContainer(direction);
      }
    });
  },
  _processKeyboardEvent: function _processKeyboardEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
  },
  _isEmpty: function _isEmpty() {
    return this._getValue().length === 0;
  },
  _updateTagsContainer: function _updateTagsContainer($element) {
    this._$tagsContainer = $element.addClass(TAGBOX_TAG_CONTAINER_CLASS);
  },
  _allowSelectItemByTab: function _allowSelectItemByTab() {
    return false;
  },
  _isCaretAtTheStart: function _isCaretAtTheStart() {
    var position = (0, _utils.default)(this._input());
    return position.start === 0 && position.end === 0;
  },
  _updateInputAriaActiveDescendant(id) {
    this.setAria('activedescendant', id, this._input());
  },
  _moveTagFocus: function _moveTagFocus(direction, clearOnBoundary) {
    if (!this._$focusedTag) {
      var tagElements = this._tagElements();
      this._$focusedTag = direction === 'next' ? tagElements.first() : tagElements.last();
      this._toggleFocusClass(true, this._$focusedTag);
      this._updateInputAriaActiveDescendant(this._$focusedTag.attr('id'));
      return;
    }
    var $nextFocusedTag = this._$focusedTag[direction](".".concat(TAGBOX_TAG_CLASS));
    if ($nextFocusedTag.length > 0) {
      this._replaceFocusedTag($nextFocusedTag);
      this._updateInputAriaActiveDescendant($nextFocusedTag.attr('id'));
    } else if (clearOnBoundary || direction === 'next' && this._isEditable()) {
      this._clearTagFocus();
      this._updateInputAriaActiveDescendant();
    }
  },
  _replaceFocusedTag: function _replaceFocusedTag($nextFocusedTag) {
    this._toggleFocusClass(false, this._$focusedTag);
    this._$focusedTag = $nextFocusedTag;
    this._toggleFocusClass(true, this._$focusedTag);
  },
  _clearTagFocus: function _clearTagFocus() {
    if (!this._$focusedTag) {
      return;
    }
    this._toggleFocusClass(false, this._$focusedTag);
    this._updateInputAriaActiveDescendant();
    delete this._$focusedTag;
  },
  _focusClassTarget: function _focusClassTarget($element) {
    if ($element && $element.length && $element[0] !== this._focusTarget()[0]) {
      return $element;
    }
    return this.callBase();
  },
  _getLabelContainer: function _getLabelContainer() {
    return this._$tagsContainer;
  },
  _getFieldElement() {
    return this._input();
  },
  _scrollContainer: function _scrollContainer(direction) {
    if (this.option('multiline') || !(0, _window.hasWindow)()) {
      return;
    }
    if (!this._$tagsContainer) {
      return;
    }
    var scrollPosition = this._getScrollPosition(direction);
    this._$tagsContainer.scrollLeft(scrollPosition);
  },
  _getScrollPosition: function _getScrollPosition(direction) {
    if (direction === 'start' || direction === 'end') {
      return this._getBorderPosition(direction);
    }
    return this._$focusedTag ? this._getFocusedTagPosition(direction) : this._getBorderPosition('end');
  },
  _getBorderPosition: function _getBorderPosition(direction) {
    var rtlEnabled = this.option('rtlEnabled');
    var isScrollLeft = direction === 'end' ^ rtlEnabled;
    var scrollSign = rtlEnabled ? -1 : 1;
    return isScrollLeft ^ !rtlEnabled ? 0 : scrollSign * (this._$tagsContainer.get(0).scrollWidth - (0, _size.getOuterWidth)(this._$tagsContainer));
  },
  _getFocusedTagPosition: function _getFocusedTagPosition(direction) {
    var rtlEnabled = this.option('rtlEnabled');
    var isScrollLeft = direction === 'next' ^ rtlEnabled;
    var _this$_$focusedTag$po = this._$focusedTag.position(),
      scrollOffset = _this$_$focusedTag$po.left;
    var scrollLeft = this._$tagsContainer.scrollLeft();
    if (isScrollLeft) {
      scrollOffset += (0, _size.getOuterWidth)(this._$focusedTag, true) - (0, _size.getOuterWidth)(this._$tagsContainer);
    }
    if (isScrollLeft ^ scrollOffset < 0) {
      scrollLeft += scrollOffset;
    }
    return scrollLeft;
  },
  _setNextValue: _common.noop,
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
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
      /**
       * @name dxTagBoxOptions.useSubmitBehavior
       * @type boolean
       * @default true
       * @hidden
       */
      useSubmitBehavior: true

      /**
      * @name dxTagBoxOptions.closeAction
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.hiddenAction
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.openAction
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.shownAction
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.onCopy
      * @hidden
      * @action
      */

      /**
      * @name dxTagBoxOptions.onCut
      * @hidden
      * @action
      */

      /**
      * @name dxTagBoxOptions.onPaste
      * @hidden
      * @action
      */

      /**
      * @name dxTagBoxOptions.spellcheck
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.displayValue
      * @hidden
      */

      /**
      * @name dxTagBoxOptions.selectedItem
      * @hidden
      */
    });
  },

  _init: function _init() {
    this.callBase();
    this._selectedItems = [];
    this._initSelectAllValueChangedAction();
  },
  _initActions: function _initActions() {
    this.callBase();
    this._initMultiTagPreparingAction();
  },
  _initMultiTagPreparingAction: function _initMultiTagPreparingAction() {
    this._multiTagPreparingAction = this._createActionByOption('onMultiTagPreparing', {
      beforeExecute: function (e) {
        this._multiTagPreparingHandler(e.args[0]);
      }.bind(this),
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  _multiTagPreparingHandler: function _multiTagPreparingHandler(args) {
    var _this$_getValue = this._getValue(),
      selectedCount = _this$_getValue.length;
    if (!this.option('showMultiTagOnly')) {
      args.text = _message.default.getFormatter('dxTagBox-moreSelected')(selectedCount - this.option('maxDisplayedTags') + 1);
    } else {
      args.text = _message.default.getFormatter('dxTagBox-selected')(selectedCount);
    }
  },
  _initDynamicTemplates: function _initDynamicTemplates() {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      tag: new _bindable_template.BindableTemplate(function ($container, data) {
        var _data$text;
        var $tagContent = (0, _renderer.default)('<div>').addClass(TAGBOX_TAG_CONTENT_CLASS);
        (0, _renderer.default)('<span>').text((_data$text = data.text) !== null && _data$text !== void 0 ? _data$text : data).appendTo($tagContent);
        (0, _renderer.default)('<div>').addClass(TAGBOX_TAG_REMOVE_BUTTON_CLASS).appendTo($tagContent);
        $container.append($tagContent);
      }, ['text'], this.option('integrationOptions.watchMethod'), {
        'text': this._displayGetter
      })
    });
  },
  _toggleSubmitElement: function _toggleSubmitElement(enabled) {
    if (enabled) {
      this._renderSubmitElement();
      this._setSubmitValue();
    } else {
      this._$submitElement && this._$submitElement.remove();
      delete this._$submitElement;
    }
  },
  _renderSubmitElement: function _renderSubmitElement() {
    if (!this.option('useSubmitBehavior')) {
      return;
    }
    var attributes = {
      'multiple': 'multiple',
      'aria-label': 'Selected items'
    };
    this._$submitElement = (0, _renderer.default)('<select>').attr(attributes).css('display', 'none').appendTo(this.$element());
  },
  _setSubmitValue: function _setSubmitValue() {
    if (!this.option('useSubmitBehavior')) {
      return;
    }
    var value = this._getValue();
    var $options = [];
    for (var i = 0, n = value.length; i < n; i++) {
      var useDisplayText = this._shouldUseDisplayValue(value[i]);
      $options.push((0, _renderer.default)('<option>').val(useDisplayText ? this._displayGetter(value[i]) : value[i]).attr('selected', 'selected'));
    }
    this._getSubmitElement().empty().append($options);
  },
  _initMarkup: function _initMarkup() {
    this._tagElementsCache = (0, _renderer.default)();
    var isSingleLineMode = !this.option('multiline');
    this.$element().addClass(TAGBOX_CLASS).toggleClass(TAGBOX_ONLY_SELECT_CLASS, !(this.option('searchEnabled') || this.option('acceptCustomValue'))).toggleClass(TAGBOX_SINGLE_LINE_CLASS, isSingleLineMode);
    var elementAria = {
      'role': 'group',
      'roledescription': 'tagbox'
    };
    this.setAria(elementAria, this.$element());
    this._initTagTemplate();
    this.callBase();
  },
  _getNewLabelId(actualId, newId, shouldRemove) {
    if (!actualId) {
      return newId;
    }
    if (shouldRemove) {
      if (actualId === newId) {
        return undefined;
      }
      return actualId.split(' ').filter(function (id) {
        return id !== newId;
      }).join(' ');
    }
    return "".concat(actualId, " ").concat(newId);
  },
  _updateElementAria(id, shouldRemove) {
    var shouldClearLabel = !id;
    if (shouldClearLabel) {
      this.setAria('labelledby', undefined, this.$element());
      return;
    }
    var labelId = this.$element().attr('aria-labelledby');
    var newLabelId = this._getNewLabelId(labelId, id, shouldRemove);
    this.setAria('labelledby', newLabelId, this.$element());
  },
  _render: function _render() {
    this.callBase();
    this._renderTagRemoveAction();
    this._renderSingleLineScroll();
    this._scrollContainer('start');
  },
  _initTagTemplate: function _initTagTemplate() {
    this._tagTemplate = this._getTemplateByOption('tagTemplate');
  },
  _renderField: function _renderField() {
    var isDefaultFieldTemplate = !(0, _type.isDefined)(this.option('fieldTemplate'));
    this.$element().toggleClass(TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS, isDefaultFieldTemplate).toggleClass(TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS, !isDefaultFieldTemplate);
    this.callBase();
  },
  _renderTagRemoveAction: function _renderTagRemoveAction() {
    var tagRemoveAction = this._createAction(this._removeTagHandler.bind(this));
    var eventName = (0, _index.addNamespace)(_click.name, 'dxTagBoxTagRemove');
    _events_engine.default.off(this._$tagsContainer, eventName);
    _events_engine.default.on(this._$tagsContainer, eventName, ".".concat(TAGBOX_TAG_REMOVE_BUTTON_CLASS), function (event) {
      tagRemoveAction({
        event
      });
    });
  },
  _renderSingleLineScroll: function _renderSingleLineScroll() {
    var mouseWheelEvent = (0, _index.addNamespace)('dxmousewheel', this.NAME);
    var $element = this.$element();
    var isMultiline = this.option('multiline');
    _events_engine.default.off($element, mouseWheelEvent);
    if (_devices.default.real().deviceType !== 'desktop') {
      this._$tagsContainer && this._$tagsContainer.css('overflowX', isMultiline ? '' : 'auto');
      return;
    }
    if (isMultiline) {
      return;
    }
    _events_engine.default.on($element, mouseWheelEvent, this._tagContainerMouseWheelHandler.bind(this));
  },
  _tagContainerMouseWheelHandler: function _tagContainerMouseWheelHandler(e) {
    var scrollLeft = this._$tagsContainer.scrollLeft();
    var delta = e.delta * TAGBOX_MOUSE_WHEEL_DELTA_MULTIPLIER;
    if (!(0, _index.isCommandKeyPressed)(e) && (0, _utils3.allowScroll)(this._$tagsContainer, delta, true)) {
      this._$tagsContainer.scrollLeft(scrollLeft + delta);
      return false;
    }
  },
  _renderEvents: function _renderEvents() {
    var _this2 = this;
    this.callBase();
    var input = this._input();
    var namespace = (0, _index.addNamespace)('keydown', this.NAME);
    _events_engine.default.on(input, namespace, function (e) {
      var keyName = (0, _index.normalizeKeyName)(e);
      if (!_this2._isControlKey(keyName) && _this2._isEditable()) {
        _this2._clearTagFocus();
      }
    });
  },
  _popupWrapperClass: function _popupWrapperClass() {
    return this.callBase() + ' ' + TAGBOX_POPUP_WRAPPER_CLASS;
  },
  _renderInput: function _renderInput() {
    this.callBase();
    this._renderPreventBlurOnInputClick();
  },
  _renderPreventBlurOnInputClick: function _renderPreventBlurOnInputClick() {
    var _this3 = this;
    var eventName = (0, _index.addNamespace)('mousedown', 'dxTagBox');
    _events_engine.default.off(this._inputWrapper(), eventName);
    _events_engine.default.on(this._inputWrapper(), eventName, function (e) {
      if (e.target !== _this3._input()[0] && _this3._isFocused()) {
        e.preventDefault();
      }
    });
  },
  _renderInputValueImpl: function _renderInputValueImpl() {
    return this._renderMultiSelect();
  },
  _loadInputValue: function _loadInputValue() {
    return (0, _deferred.when)();
  },
  _clearTextValue: function _clearTextValue() {
    this._input().val('');
    this._toggleEmptinessEventHandler();
    this.option('text', '');
  },
  _focusInHandler: function _focusInHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._scrollContainer('end');
    }
    this.callBase(e);
  },
  _renderInputValue: function _renderInputValue() {
    this.option('displayValue', this._searchValue());
    return this.callBase();
  },
  _restoreInputText: function _restoreInputText(saveEditingValue) {
    if (!saveEditingValue) {
      this._clearTextValue();
    }
  },
  _focusOutHandler: function _focusOutHandler(e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._clearTagFocus();
      this._scrollContainer('start');
    }
    this.callBase(e);
  },
  _getFirstPopupElement: function _getFirstPopupElement() {
    return this.option('showSelectionControls') ? this._list._focusTarget() : this.callBase();
  },
  _initSelectAllValueChangedAction: function _initSelectAllValueChangedAction() {
    this._selectAllValueChangeAction = this._createActionByOption('onSelectAllValueChanged');
  },
  _renderList: function _renderList() {
    var _this4 = this;
    this.callBase();
    this._setListDataSourceFilter();
    if (this.option('showSelectionControls')) {
      this._list.registerKeyHandler('tab', function (e) {
        return _this4._popupElementTabHandler(e);
      });
      this._list.registerKeyHandler('escape', function (e) {
        return _this4._popupElementEscHandler(e);
      });
    }
  },
  _canListHaveFocus: function _canListHaveFocus() {
    return this.option('applyValueMode') === 'useButtons';
  },
  _listConfig: function _listConfig() {
    var _this5 = this;
    var selectionMode = this.option('showSelectionControls') ? 'all' : 'multiple';
    return (0, _extend.extend)(this.callBase(), {
      selectionMode: selectionMode,
      selectAllText: this.option('selectAllText'),
      onSelectAllValueChanged: function onSelectAllValueChanged(_ref) {
        var value = _ref.value;
        _this5._selectAllValueChangeAction({
          value
        });
      },
      selectAllMode: this.option('selectAllMode'),
      selectedItems: this._selectedItems,
      onFocusedItemChanged: null
    });
  },
  _renderMultiSelect: function _renderMultiSelect() {
    var _this6 = this;
    var d = new _deferred.Deferred();
    this._updateTagsContainer(this._$textEditorInputContainer);
    this._renderInputSize();
    this._renderTags().done(function () {
      _this6._popup && _this6._popup.refreshPosition();
      d.resolve();
    }).fail(d.reject);
    return d.promise();
  },
  _listItemClickHandler: function _listItemClickHandler(e) {
    !this.option('showSelectionControls') && this._clearTextValue();
    if (this.option('applyValueMode') === 'useButtons') {
      return;
    }
    this.callBase(e);
    this._saveValueChangeEvent(undefined);
  },
  _shouldClearFilter: function _shouldClearFilter() {
    var shouldClearFilter = this.callBase();
    var showSelectionControls = this.option('showSelectionControls');
    return !showSelectionControls && shouldClearFilter;
  },
  _renderInputSize: function _renderInputSize() {
    var $input = this._input();
    var value = $input.val();
    var isEmptyInput = (0, _type.isString)(value) && value;
    var cursorWidth = 5;
    var width = '';
    var size = '';
    var canTypeText = this.option('searchEnabled') || this.option('acceptCustomValue');
    if (isEmptyInput && canTypeText) {
      var $calculationElement = (0, _dom.createTextElementHiddenCopy)($input, value, {
        includePaddings: true
      });
      $calculationElement.insertAfter($input);
      width = (0, _size.getOuterWidth)($calculationElement) + cursorWidth;
      $calculationElement.remove();
    } else if (!value) {
      size = 1;
    }
    $input.css('width', width);
    $input.attr('size', size);
  },
  _renderInputSubstitution: function _renderInputSubstitution() {
    this.callBase();
    this._updateWidgetHeight();
  },
  _getValue: function _getValue() {
    return this.option('value') || [];
  },
  _multiTagRequired: function _multiTagRequired() {
    var values = this._getValue();
    var maxDisplayedTags = this.option('maxDisplayedTags');
    return (0, _type.isDefined)(maxDisplayedTags) && values.length > maxDisplayedTags;
  },
  _renderMultiTag: function _renderMultiTag($input) {
    var $tag = (0, _renderer.default)('<div>').addClass(TAGBOX_TAG_CLASS).addClass(TAGBOX_MULTI_TAG_CLASS);
    var args = {
      multiTagElement: (0, _element.getPublicElement)($tag),
      selectedItems: this.option('selectedItems')
    };
    this._multiTagPreparingAction(args);
    if (args.cancel) {
      return false;
    }
    $tag.data(TAGBOX_TAG_DATA_KEY, args.text);
    $tag.insertBefore($input);
    this._tagTemplate.render({
      model: args.text,
      container: (0, _element.getPublicElement)($tag)
    });
    return $tag;
  },
  _getFilter: function _getFilter(creator) {
    var dataSourceFilter = this._dataController.filter();
    var filterExpr = creator.getCombinedFilter(this.option('valueExpr'), dataSourceFilter);
    var filterQueryLength = encodeURI(JSON.stringify(filterExpr)).length;
    var maxFilterQueryLength = this.option('maxFilterQueryLength');
    if (filterQueryLength <= maxFilterQueryLength) {
      return filterExpr;
    }
    _ui.default.log('W1019', maxFilterQueryLength);
  },
  _getFilteredItems: function _getFilteredItems(values) {
    var _this$_loadFilteredIt,
      _this$_list,
      _this7 = this;
    (_this$_loadFilteredIt = this._loadFilteredItemsPromise) === null || _this$_loadFilteredIt === void 0 ? void 0 : _this$_loadFilteredIt.reject();
    var creator = new _selection_filter.SelectionFilterCreator(values);
    var listSelectedItems = (_this$_list = this._list) === null || _this$_list === void 0 ? void 0 : _this$_list.option('selectedItems');
    var isListItemsLoaded = !!listSelectedItems && this._list._dataController.isLoaded();
    var selectedItems = listSelectedItems || this.option('selectedItems');
    var clientFilterFunction = creator.getLocalFilter(this._valueGetter);
    var filteredItems = selectedItems.filter(clientFilterFunction);
    var selectedItemsAlreadyLoaded = filteredItems.length === values.length;
    var d = new _deferred.Deferred();
    var dataController = this._dataController;
    if ((!this._isDataSourceChanged || isListItemsLoaded) && selectedItemsAlreadyLoaded) {
      return d.resolve(filteredItems).promise();
    } else {
      var _dataController$loadO = dataController.loadOptions(),
        customQueryParams = _dataController$loadO.customQueryParams,
        expand = _dataController$loadO.expand,
        select = _dataController$loadO.select;
      var filter = this._getFilter(creator);
      dataController.loadFromStore({
        filter,
        customQueryParams,
        expand,
        select
      }).done(function (data, extra) {
        _this7._isDataSourceChanged = false;
        if (_this7._disposed) {
          d.reject();
          return;
        }
        var _normalizeLoadResult = (0, _utils2.normalizeLoadResult)(data, extra),
          items = _normalizeLoadResult.data;
        var mappedItems = dataController.applyMapFunction(items);
        d.resolve(mappedItems.filter(clientFilterFunction));
      }).fail(d.reject);
      this._loadFilteredItemsPromise = d;
      return d.promise();
    }
  },
  _createTagsData: function _createTagsData(values, filteredItems) {
    var _this8 = this;
    var items = [];
    var cache = {};
    var isValueExprSpecified = this._valueGetterExpr() === 'this';
    var filteredValues = {};
    filteredItems.forEach(function (filteredItem) {
      var filteredItemValue = isValueExprSpecified ? JSON.stringify(filteredItem) : _this8._valueGetter(filteredItem);
      filteredValues[filteredItemValue] = filteredItem;
    });
    var loadItemPromises = [];
    values.forEach(function (value, index) {
      var currentItem = filteredValues[isValueExprSpecified ? JSON.stringify(value) : value];
      if (isValueExprSpecified && !(0, _type.isDefined)(currentItem)) {
        loadItemPromises.push(_this8._loadItem(value, cache).always(function (item) {
          var newItem = _this8._createTagData(items, item, value, index);
          items.splice(index, 0, newItem);
        }));
      } else {
        var newItem = _this8._createTagData(items, currentItem, value, index);
        items.splice(index, 0, newItem);
      }
    });
    var d = new _deferred.Deferred();
    _deferred.when.apply(this, loadItemPromises).always(function () {
      d.resolve(items);
    });
    return d.promise();
  },
  _createTagData: function _createTagData(items, item, value, valueIndex) {
    if ((0, _type.isDefined)(item)) {
      this._selectedItems.push(item);
      return item;
    } else {
      var selectedItem = this.option('selectedItem');
      var customItem = this._valueGetter(selectedItem) === value ? selectedItem : value;
      return customItem;
    }
  },
  _isGroupedData: function _isGroupedData() {
    return this.option('grouped') && !this._dataController.group();
  },
  _getItemsByValues: function _getItemsByValues(values) {
    var resultItems = [];
    values.forEach(function (value) {
      var item = this._getItemFromPlain(value);
      if ((0, _type.isDefined)(item)) {
        resultItems.push(item);
      }
    }.bind(this));
    return resultItems;
  },
  _getFilteredGroupedItems: function _getFilteredGroupedItems(values) {
    var _this9 = this;
    var selectedItems = new _deferred.Deferred();
    if (this._filteredGroupedItemsLoadPromise) {
      this._dataController.cancel(this._filteredGroupedItemsLoadPromise.operationId);
    }
    if (!this._dataController.items().length) {
      this._filteredGroupedItemsLoadPromise = this._dataController.load().done(function () {
        selectedItems.resolve(_this9._getItemsByValues(values));
      }).fail(function () {
        selectedItems.resolve([]);
      }).always(function () {
        _this9._filteredGroupedItemsLoadPromise = undefined;
      });
    } else {
      selectedItems.resolve(this._getItemsByValues(values));
    }
    return selectedItems.promise();
  },
  _loadTagsData: function _loadTagsData() {
    var _this10 = this;
    var values = this._getValue();
    var tagData = new _deferred.Deferred();
    this._selectedItems = [];
    var filteredItemsPromise = this._isGroupedData() ? this._getFilteredGroupedItems(values) : this._getFilteredItems(values);
    filteredItemsPromise.done(function (filteredItems) {
      var items = _this10._createTagsData(values, filteredItems);
      items.always(function (data) {
        tagData.resolve(data);
      });
    }).fail(tagData.reject.bind(this));
    return tagData.promise();
  },
  _renderTags: function _renderTags() {
    var _this11 = this;
    var d = new _deferred.Deferred();
    var isPlainDataUsed = false;
    if (this._shouldGetItemsFromPlain(this._valuesToUpdate)) {
      this._selectedItems = this._getItemsFromPlain(this._valuesToUpdate);
      if (this._selectedItems.length === this._valuesToUpdate.length) {
        this._renderTagsImpl(this._selectedItems);
        isPlainDataUsed = true;
        d.resolve();
      }
    }
    if (!isPlainDataUsed) {
      this._loadTagsData().done(function (items) {
        if (_this11._disposed) {
          d.reject();
          return;
        }
        _this11._renderTagsImpl(items);
        d.resolve();
      }).fail(d.reject);
    }
    return d.promise();
  },
  _renderTagsImpl: function _renderTagsImpl(items) {
    this._renderTagsCore(items);
    this._renderEmptyState();
    if (!this._preserveFocusedTag) {
      this._clearTagFocus();
    }
  },
  _shouldGetItemsFromPlain: function _shouldGetItemsFromPlain(values) {
    return values && this._dataController.isLoaded() && values.length <= this._getPlainItems().length;
  },
  _getItemsFromPlain: function _getItemsFromPlain(values) {
    var selectedItems = this._getSelectedItemsFromList(values);
    var needFilterPlainItems = selectedItems.length === 0 && values.length > 0 || selectedItems.length < values.length;
    if (needFilterPlainItems) {
      var plainItems = this._getPlainItems();
      selectedItems = this._filterSelectedItems(plainItems, values);
    }
    return selectedItems;
  },
  _getSelectedItemsFromList: function _getSelectedItemsFromList(values) {
    var _this$_list2;
    var listSelectedItems = (_this$_list2 = this._list) === null || _this$_list2 === void 0 ? void 0 : _this$_list2.option('selectedItems');
    var selectedItems = [];
    if (values.length === (listSelectedItems === null || listSelectedItems === void 0 ? void 0 : listSelectedItems.length)) {
      selectedItems = this._filterSelectedItems(listSelectedItems, values);
    }
    return selectedItems;
  },
  _filterSelectedItems: function _filterSelectedItems(plainItems, values) {
    var _this12 = this;
    var selectedItems = plainItems.filter(function (dataItem) {
      var currentValue;
      for (var i = 0; i < values.length; i++) {
        currentValue = values[i];
        if ((0, _type.isObject)(currentValue)) {
          if (_this12._isValueEquals(dataItem, currentValue)) {
            return true;
          }
        } else if (_this12._isValueEquals(_this12._valueGetter(dataItem), currentValue)) {
          return true;
        }
      }
      return false;
    }, this);
    return selectedItems;
  },
  _integrateInput: function _integrateInput() {
    this._isInputReady.resolve();
    this.callBase();
    var tagsContainer = this.$element().find(".".concat(TEXTEDITOR_INPUT_CONTAINER_CLASS));
    this._updateTagsContainer(tagsContainer);
    this._renderTagRemoveAction();
  },
  _renderTagsCore: function _renderTagsCore(items) {
    var _this$_isInputReady,
      _this13 = this;
    (_this$_isInputReady = this._isInputReady) === null || _this$_isInputReady === void 0 ? void 0 : _this$_isInputReady.reject();
    this._isInputReady = new _deferred.Deferred();
    this._renderField();
    this.option('selectedItems', this._selectedItems.slice());
    this._cleanTags();
    if (this._input().length > 0) {
      this._isInputReady.resolve();
    }
    (0, _deferred.when)(this._isInputReady).done(function () {
      _this13._renderTagsElements(items);
    });
  },
  _renderTagsElements(items) {
    var _this14 = this;
    var $multiTag = this._multiTagRequired() && this._renderMultiTag(this._input());
    var showMultiTagOnly = this.option('showMultiTagOnly');
    var maxDisplayedTags = this.option('maxDisplayedTags');
    items.forEach(function (item, index) {
      if ($multiTag && showMultiTagOnly || $multiTag && !showMultiTagOnly && index - maxDisplayedTags >= -1) {
        return false;
      }
      _this14._renderTag(item, $multiTag || _this14._input());
    });
    if (this._isFocused()) {
      this._scrollContainer('end');
    }
    this._refreshTagElements();
  },
  _cleanTags: function _cleanTags() {
    if (this._multiTagRequired()) {
      this._tagElements().remove();
    } else {
      var $tags = this._tagElements();
      var values = this._getValue();
      (0, _iterator.each)($tags, function (_, tag) {
        var $tag = (0, _renderer.default)(tag);
        var tagData = $tag.data(TAGBOX_TAG_DATA_KEY);
        if (!(values !== null && values !== void 0 && values.includes(tagData))) {
          $tag.remove();
        }
      });
    }
    this._updateElementAria();
  },
  _renderEmptyState: function _renderEmptyState() {
    var isEmpty = !(this._getValue().length || this._selectedItems.length || this._searchValue());
    this._toggleEmptiness(isEmpty);
    this._renderDisplayText();
  },
  _renderDisplayText: function _renderDisplayText() {
    this._renderInputSize();
  },
  _refreshTagElements: function _refreshTagElements() {
    this._tagElementsCache = this.$element().find(".".concat(TAGBOX_TAG_CLASS));
  },
  _tagElements: function _tagElements() {
    return this._tagElementsCache;
  },
  _applyTagTemplate: function _applyTagTemplate(item, $tag) {
    this._tagTemplate.render({
      model: item,
      container: (0, _element.getPublicElement)($tag)
    });
  },
  _renderTag: function _renderTag(item, $input) {
    var value = this._valueGetter(item);
    if (!(0, _type.isDefined)(value)) {
      return;
    }
    var $tag = this._getTag(value);
    var displayValue = this._displayGetter(item);
    var itemModel = this._getItemModel(item, displayValue);
    if ($tag) {
      if ((0, _type.isDefined)(displayValue)) {
        $tag.empty();
        this._applyTagTemplate(itemModel, $tag);
      }
      $tag.removeClass(TAGBOX_CUSTOM_TAG_CLASS);
      this._updateElementAria($tag.attr('id'));
    } else {
      var tagId = "dx-".concat(new _guid.default());
      $tag = this._createTag(value, $input, tagId);
      if ((0, _type.isDefined)(item)) {
        this._applyTagTemplate(itemModel, $tag);
      } else {
        $tag.addClass(TAGBOX_CUSTOM_TAG_CLASS);
        this._applyTagTemplate(value, $tag);
      }
      this._updateElementAria(tagId);
    }
  },
  _getItemModel: function _getItemModel(item, displayValue) {
    if ((0, _type.isObject)(item) && (0, _type.isDefined)(displayValue)) {
      return item;
    } else {
      return (0, _common.ensureDefined)(displayValue, '');
    }
  },
  _getTag: function _getTag(value) {
    var $tags = this._tagElements();
    var tagsLength = $tags.length;
    var result = false;
    for (var i = 0; i < tagsLength; i++) {
      var $tag = $tags[i];
      var tagData = (0, _element_data.data)($tag, TAGBOX_TAG_DATA_KEY);
      if (value === tagData || (0, _common.equalByValue)(value, tagData)) {
        result = (0, _renderer.default)($tag);
        break;
      }
    }
    return result;
  },
  _createTag: function _createTag(value, $input, tagId) {
    return (0, _renderer.default)('<div>').attr('id', tagId).addClass(TAGBOX_TAG_CLASS).data(TAGBOX_TAG_DATA_KEY, value).insertBefore($input);
  },
  _toggleEmptinessEventHandler: function _toggleEmptinessEventHandler() {
    this._toggleEmptiness(!this._getValue().length && !this._searchValue().length);
  },
  _customItemAddedHandler: function _customItemAddedHandler(e) {
    this.callBase(e);
    this._clearTextValue();
  },
  _removeTagHandler: function _removeTagHandler(args) {
    var e = args.event;
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    var $tag = (0, _renderer.default)(e.target).closest(".".concat(TAGBOX_TAG_CLASS));
    this._removeTagElement($tag);
  },
  _removeTagElement: function _removeTagElement($tag) {
    if ($tag.hasClass(TAGBOX_MULTI_TAG_CLASS)) {
      if (!this.option('showMultiTagOnly')) {
        this.option('value', this._getValue().slice(0, this.option('maxDisplayedTags')));
      } else {
        this.clear();
      }
      return;
    }
    var itemValue = $tag.data(TAGBOX_TAG_DATA_KEY);
    var itemId = $tag.attr('id');
    this._removeTagWithUpdate(itemValue);
    this._updateElementAria(itemId, true);
    this._refreshTagElements();
  },
  _updateField: _common.noop,
  _removeTagWithUpdate: function _removeTagWithUpdate(itemValue) {
    var value = this._getValue().slice();
    this._removeTag(value, itemValue);
    this.option('value', value);
    if (value.length === 0) {
      this._clearTagFocus();
    }
  },
  _getCurrentValue: function _getCurrentValue() {
    return this._lastValue();
  },
  _selectionChangeHandler: function _selectionChangeHandler(e) {
    var _this15 = this;
    if (this.option('applyValueMode') === 'useButtons') {
      return;
    }
    var value = this._getValue().slice();
    (0, _iterator.each)(e.removedItems || [], function (_, removedItem) {
      _this15._removeTag(value, _this15._valueGetter(removedItem));
    });
    (0, _iterator.each)(e.addedItems || [], function (_, addedItem) {
      _this15._addTag(value, _this15._valueGetter(addedItem));
    });
    this._updateWidgetHeight();
    if (!(0, _common.equalByValue)(this._list.option('selectedItemKeys'), this.option('value'))) {
      var listSelectionChangeEvent = this._list._getSelectionChangeEvent();
      listSelectionChangeEvent && this._saveValueChangeEvent(listSelectionChangeEvent);
      this.option('value', value);
    }
    this._list._saveSelectionChangeEvent(undefined);
  },
  _removeTag: function _removeTag(value, item) {
    var index = this._valueIndex(item, value);
    if (index >= 0) {
      value.splice(index, 1);
    }
  },
  _addTag: function _addTag(value, item) {
    var index = this._valueIndex(item);
    if (index < 0) {
      value.push(item);
    }
  },
  _fieldRenderData: function _fieldRenderData() {
    return this._selectedItems.slice();
  },
  _completeSelection: function _completeSelection(value) {
    if (!this.option('showSelectionControls')) {
      this._setValue(value);
    }
  },
  _setValue: function _setValue(value) {
    if (value === null) {
      return;
    }
    var useButtons = this.option('applyValueMode') === 'useButtons';
    var valueIndex = this._valueIndex(value);
    var values = (useButtons ? this._list.option('selectedItemKeys') : this._getValue()).slice();
    if (valueIndex >= 0) {
      values.splice(valueIndex, 1);
    } else {
      values.push(value);
    }
    if (this.option('applyValueMode') === 'useButtons') {
      this._list.option('selectedItemKeys', values);
    } else {
      this.option('value', values);
    }
  },
  _isSelectedValue: function _isSelectedValue(value, cache) {
    return this._valueIndex(value, null, cache) > -1;
  },
  _valueIndex: function _valueIndex(value, values, cache) {
    var _this16 = this;
    var result = -1;
    if (cache && typeof value !== 'object') {
      if (!cache.indexByValues) {
        cache.indexByValues = {};
        values = values || this._getValue();
        values.forEach(function (value, index) {
          cache.indexByValues[value] = index;
        });
      }
      if (value in cache.indexByValues) {
        return cache.indexByValues[value];
      }
    }
    values = values || this._getValue();
    (0, _iterator.each)(values, function (index, selectedValue) {
      if (_this16._isValueEquals(value, selectedValue)) {
        result = index;
        return false;
      }
    });
    return result;
  },
  _lastValue: function _lastValue() {
    var values = this._getValue();
    var lastValue = values[values.length - 1];
    return lastValue !== null && lastValue !== void 0 ? lastValue : null;
  },
  _shouldRenderSearchEvent: function _shouldRenderSearchEvent() {
    return this.option('searchEnabled') || this.option('acceptCustomValue');
  },
  _searchHandler: function _searchHandler(e) {
    if (this.option('searchEnabled') && !!e && !this._isTagRemoved) {
      this.callBase(arguments);
      this._setListDataSourceFilter();
    }
    this._updateWidgetHeight();
    delete this._isTagRemoved;
  },
  _updateWidgetHeight: function _updateWidgetHeight() {
    var element = this.$element();
    var originalHeight = (0, _size.getHeight)(element);
    this._renderInputSize();
    var currentHeight = (0, _size.getHeight)(element);
    if (this._popup && this.option('opened') && this._isEditable() && currentHeight !== originalHeight) {
      this._popup.repaint();
    }
  },
  _refreshSelected: function _refreshSelected() {
    var _this$_list3;
    ((_this$_list3 = this._list) === null || _this$_list3 === void 0 ? void 0 : _this$_list3.getDataSource()) && this._list.option('selectedItems', this._selectedItems);
  },
  _resetListDataSourceFilter: function _resetListDataSourceFilter() {
    var dataController = this._dataController;
    delete this._userFilter;
    dataController.filter(null);
    dataController.reload();
  },
  _setListDataSourceFilter: function _setListDataSourceFilter() {
    if (!this.option('hideSelectedItems') || !this._list) {
      return;
    }
    var dataController = this._dataController;
    var valueGetterExpr = this._valueGetterExpr();
    if ((0, _type.isString)(valueGetterExpr) && valueGetterExpr !== 'this') {
      var filter = this._dataSourceFilterExpr();
      if (this._userFilter === undefined) {
        this._userFilter = dataController.filter() || null;
      }
      this._userFilter && filter.push(this._userFilter);
      filter.length ? dataController.filter(filter) : dataController.filter(null);
    } else {
      dataController.filter(this._dataSourceFilterFunction.bind(this));
    }
    dataController.load();
  },
  _dataSourceFilterExpr: function _dataSourceFilterExpr() {
    var _this17 = this;
    var filter = [];
    this._getValue().forEach(function (value) {
      return filter.push(['!', [_this17._valueGetterExpr(), value]]);
    });
    return filter;
  },
  _dataSourceFilterFunction: function _dataSourceFilterFunction(itemData) {
    var _this18 = this;
    var itemValue = this._valueGetter(itemData);
    var result = true;
    (0, _iterator.each)(this._getValue(), function (index, value) {
      if (_this18._isValueEquals(value, itemValue)) {
        result = false;
        return false;
      }
    });
    return result;
  },
  _dataSourceChangedHandler: function _dataSourceChangedHandler() {
    this._isDataSourceChanged = true;
    this.callBase.apply(this, arguments);
  },
  _applyButtonHandler: function _applyButtonHandler(args) {
    this._saveValueChangeEvent(args.event);
    this.option('value', this._getSortedListValues());
    this._clearTextValue();
    this.callBase();
    this._cancelSearchIfNeed();
  },
  _getSortedListValues: function _getSortedListValues() {
    var listValues = this._getListValues();
    var currentValue = this.option('value') || [];
    var existedItems = listValues.length ? (0, _array.getIntersection)(currentValue, listValues) : [];
    var newItems = existedItems.length ? (0, _array.removeDuplicates)(listValues, currentValue) : listValues;
    return existedItems.concat(newItems);
  },
  _getListValues: function _getListValues() {
    var _this19 = this;
    if (!this._list) {
      return [];
    }
    return this._getPlainItems(this._list.option('selectedItems')).map(function (item) {
      return _this19._valueGetter(item);
    });
  },
  _setListDataSource: function _setListDataSource() {
    var currentValue = this._getValue();
    this.callBase();
    if (currentValue !== this.option('value')) {
      this.option('value', currentValue);
    }
    this._refreshSelected();
  },
  _renderOpenedState: function _renderOpenedState() {
    this.callBase();
    if (this.option('applyValueMode') === 'useButtons' && !this.option('opened')) {
      this._refreshSelected();
    }
  },
  clear: function clear() {
    this._restoreInputText();
    var defaultValue = this._getDefaultOptions().value;
    var currentValue = this.option('value');
    if (defaultValue && defaultValue.length === 0 && currentValue && defaultValue.length === currentValue.length) {
      return;
    }
    this.callBase();
  },
  _clean: function _clean() {
    this.callBase();
    delete this._defaultTagTemplate;
    delete this._valuesToUpdate;
    delete this._tagTemplate;
  },
  _getSelectedItemsDifference(newItems, previousItems) {
    var _this20 = this;
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
    var previousItemsValuesMap = previousItems.reduce(function (map, item) {
      var value = _this20._valueGetter(item);
      map[value] = item;
      return map;
    }, {});
    var addedItems = [];
    newItems.forEach(function (item) {
      var value = _this20._valueGetter(item);
      if (!previousItemsValuesMap[value]) {
        addedItems.push(item);
      }
      delete previousItemsValuesMap[value];
    });
    return {
      addedItems,
      removedItems: Object.values(previousItemsValuesMap)
    };
  },
  _optionChanged: function _optionChanged(args) {
    var name = args.name,
      value = args.value,
      previousValue = args.previousValue;
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
        this.callBase(args);
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
        this.callBase(args);
        !value && this._refreshEvents();
        break;
      case 'value':
        this._valuesToUpdate = value;
        this.callBase(args);
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
        this.callBase(args);
    }
  },
  _getActualSearchValue: function _getActualSearchValue() {
    return this.callBase() || this._searchValue();
  },
  _popupHidingHandler: function _popupHidingHandler() {
    this.callBase();
    this._clearFilter();
  }
});
(0, _component_registrator.default)('dxTagBox', TagBox);
var _default = TagBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;