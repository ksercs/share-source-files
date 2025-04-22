"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../ui/text_box");
require("../../../ui/number_box");
require("../../../ui/check_box");
require("../../../ui/date_box");
require("../../../ui/button");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _remove = require("../../../common/core/events/remove");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array = require("../../../core/utils/array");
var _data = require("../../../core/utils/data");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../core/utils/variable_wrapper"));
var _window = require("../../../core/utils/window");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _m_responsive_box = _interopRequireDefault(require("../../ui/m_responsive_box"));
var _m_button_item = require("./components/m_button_item");
var _m_empty_item = require("./components/m_empty_item");
var _m_field_item = require("./components/m_field_item");
var _constants = require("./constants");
var _m_form = _interopRequireDefault(require("./m_form.items_runtime_info"));
var _m_formLayout_manager = require("./m_form.layout_manager.utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
// eslint-disable-next-line import/no-named-default
const FORM_EDITOR_BY_DEFAULT = 'dxTextBox';
const LAYOUT_MANAGER_FIRST_ROW_CLASS = 'dx-first-row';
const LAYOUT_MANAGER_LAST_ROW_CLASS = 'dx-last-row';
const LAYOUT_MANAGER_FIRST_COL_CLASS = 'dx-first-col';
const LAYOUT_MANAGER_LAST_COL_CLASS = 'dx-last-col';
class LayoutManager extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      layoutData: {},
      readOnly: false,
      colCount: 1,
      labelLocation: 'left',
      // @ts-expect-error ts-error
      onFieldDataChanged: null,
      // @ts-expect-error ts-error
      onEditorEnterKey: null,
      // @ts-expect-error ts-error
      customizeItem: null,
      alignItemLabels: true,
      minColWidth: 200,
      showRequiredMark: true,
      // @ts-expect-error ts-error
      screenByWidth: null,
      showOptionalMark: false,
      requiredMark: '*',
      labelMode: 'outside',
      optionalMark: _message.default.format('dxForm-optionalMark'),
      // @ts-expect-error ts-error
      requiredMessage: _message.default.getFormatter('dxForm-requiredMessage')
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
      layoutData: true,
      validationGroup: true
    });
  }
  _init() {
    const layoutData = this.option('layoutData');
    super._init();
    this._itemWatchers = [];
    this._itemsRunTimeInfo = new _m_form.default();
    this._updateReferencedOptions(layoutData);
    this._initDataAndItems(layoutData);
  }
  _dispose() {
    super._dispose();
    this._cleanItemWatchers();
  }
  _initDataAndItems(initialData) {
    this._syncDataWithItems();
    this._updateItems(initialData);
  }
  _syncDataWithItems() {
    const layoutData = this.option('layoutData');
    const userItems = this.option('items');
    if ((0, _type.isDefined)(userItems)) {
      // @ts-expect-error ts-error
      userItems.forEach(item => {
        if (item.dataField && this._getDataByField(item.dataField) === undefined) {
          let value;
          if (item.editorOptions) {
            value = item.editorOptions.value;
          }
          if ((0, _type.isDefined)(value) || item.dataField in layoutData) {
            this._updateFieldValue(item.dataField, value);
          }
        }
      });
    }
  }
  _getDataByField(dataField) {
    return dataField ? this.option(`layoutData.${dataField}`) : null;
  }
  _isCheckboxUndefinedStateEnabled(_ref) {
    let {
      allowIndeterminateState,
      editorType,
      dataField
    } = _ref;
    if (allowIndeterminateState === true && editorType === 'dxCheckBox') {
      const nameParts = ['layoutData', ...dataField.split('.')];
      const propertyName = nameParts.pop();
      const layoutData = this.option(nameParts.join('.'));
      return layoutData && propertyName in layoutData;
    }
    return false;
  }
  _updateFieldValue(dataField, value) {
    const layoutData = this.option('layoutData');
    let newValue = value;
    if (!_variable_wrapper.default.isWrapped(layoutData[dataField]) && (0, _type.isDefined)(dataField)) {
      this.option(`layoutData.${dataField}`, newValue);
    } else if (_variable_wrapper.default.isWritableWrapped(layoutData[dataField])) {
      newValue = (0, _type.isFunction)(newValue) ? newValue() : newValue;
      layoutData[dataField](newValue);
    }
    this._triggerOnFieldDataChanged({
      dataField,
      value: newValue
    });
  }
  _triggerOnFieldDataChanged(args) {
    this._createActionByOption('onFieldDataChanged')(args);
  }
  _updateItems(layoutData) {
    const that = this;
    const userItems = this.option('items');
    const isUserItemsExist = (0, _type.isDefined)(userItems);
    const {
      customizeItem
    } = this.option();
    const items = isUserItemsExist ? userItems : this._generateItemsByData(layoutData);
    if ((0, _type.isDefined)(items)) {
      const processedItems = [];
      (0, _iterator.each)(items, (index, item) => {
        if (that._isAcceptableItem(item)) {
          item = that._processItem(item);
          customizeItem && customizeItem(item);
          // @ts-expect-error
          if ((0, _type.isObject)(item) && _variable_wrapper.default.unwrap(item.visible) !== false) {
            processedItems.push(item);
          }
        }
      });
      if (!that._itemWatchers.length || !isUserItemsExist) {
        that._updateItemWatchers(items);
      }
      this._setItems(processedItems);
      this._sortItems();
    }
  }
  _cleanItemWatchers() {
    this._itemWatchers.forEach(dispose => {
      // @ts-expect-error ts-error
      dispose();
    });
    this._itemWatchers = [];
  }
  _updateItemWatchers(items) {
    const that = this;
    const watch = that._getWatch();
    items.forEach(item => {
      // @ts-expect-error
      if ((0, _type.isObject)(item) && (0, _type.isDefined)(item.visible) && (0, _type.isFunction)(watch)) {
        that._itemWatchers.push(watch(
        // @ts-expect-error
        () => _variable_wrapper.default.unwrap(item.visible), () => {
          that._updateItems(that.option('layoutData'));
          that.repaint();
        }, {
          skipImmediate: true
        }));
      }
    });
  }
  _generateItemsByData(layoutData) {
    const result = [];
    if ((0, _type.isDefined)(layoutData)) {
      (0, _iterator.each)(layoutData, dataField => {
        // @ts-expect-error
        result.push({
          dataField
        });
      });
    }
    return result;
  }
  _isAcceptableItem(item) {
    const itemField = item.dataField || item;
    const itemData = this._getDataByField(itemField);
    return !((0, _type.isFunction)(itemData) && !_variable_wrapper.default.isWrapped(itemData));
  }
  _processItem(item) {
    if (typeof item === 'string') {
      item = {
        dataField: item
      };
    }
    if (typeof item === 'object' && !item.itemType) {
      item.itemType = _constants.SIMPLE_ITEM_TYPE;
    }
    if (!(0, _type.isDefined)(item.editorType) && (0, _type.isDefined)(item.dataField)) {
      const value = this._getDataByField(item.dataField);
      item.editorType = (0, _type.isDefined)(value) ? this._getEditorTypeByDataType((0, _type.type)(value)) : FORM_EDITOR_BY_DEFAULT;
    }
    if (item.editorType === 'dxCheckBox') {
      item.allowIndeterminateState = item.allowIndeterminateState ?? true;
    }
    return item;
  }
  _getEditorTypeByDataType(dataType) {
    switch (dataType) {
      case 'number':
        return 'dxNumberBox';
      case 'date':
        return 'dxDateBox';
      case 'boolean':
        return 'dxCheckBox';
      default:
        return 'dxTextBox';
    }
  }
  _sortItems() {
    (0, _array.normalizeIndexes)(this._items, 'visibleIndex');
    this._sortIndexes();
  }
  _sortIndexes() {
    this._items.sort((itemA, itemB) => {
      const indexA = itemA.visibleIndex;
      const indexB = itemB.visibleIndex;
      let result;
      if (indexA > indexB) {
        result = 1;
      } else if (indexA < indexB) {
        result = -1;
      } else {
        result = 0;
      }
      return result;
    });
  }
  _initMarkup() {
    this._itemsRunTimeInfo.clear();
    this.$element().addClass(_constants.FORM_LAYOUT_MANAGER_CLASS);
    super._initMarkup();
    this._renderResponsiveBox();
  }
  _renderResponsiveBox() {
    const that = this;
    const templatesInfo = [];
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (that._items && that._items.length) {
      const colCount = that._getColCount();
      const $container = (0, _renderer.default)('<div>').appendTo(that.$element());
      that._prepareItemsWithMerging(colCount);
      const layoutItems = that._generateLayoutItems();
      // @ts-expect-error ts-error
      that._responsiveBox = that._createComponent($container, _m_responsive_box.default, that._getResponsiveBoxConfig(layoutItems, colCount, templatesInfo));
      if (!(0, _window.hasWindow)()) {
        that._renderTemplates(templatesInfo);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _itemStateChangedHandler(e) {
    this._refresh();
  }
  _renderTemplates(templatesInfo) {
    const that = this;
    let itemsWithLabelTemplateCount = 0;
    templatesInfo.forEach(_ref2 => {
      var _item$label;
      let {
        item
      } = _ref2;
      if (item !== null && item !== void 0 && (_item$label = item.label) !== null && _item$label !== void 0 && _item$label.template) {
        itemsWithLabelTemplateCount++;
      }
    });
    (0, _iterator.each)(templatesInfo, (index, info) => {
      switch (info.itemType) {
        case 'empty':
          (0, _m_empty_item.renderEmptyItem)(info);
          break;
        case 'button':
          that._renderButtonItem(info);
          break;
        default:
          {
            that._renderFieldItem(info, itemsWithLabelTemplateCount);
          }
      }
    });
  }
  _getResponsiveBoxConfig(layoutItems, colCount, templatesInfo) {
    const that = this;
    const colCountByScreen = that.option('colCountByScreen');
    // @ts-expect-error ts-error
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    const xsColCount = colCountByScreen && colCountByScreen.xs;
    return {
      onItemStateChanged: this._itemStateChangedHandler.bind(this),
      onLayoutChanged() {
        const {
          onLayoutChanged
        } = that.option();
        const isSingleColumnMode = that.isSingleColumnMode();
        if (onLayoutChanged) {
          that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, isSingleColumnMode);
          onLayoutChanged(isSingleColumnMode);
        }
      },
      onContentReady(e) {
        if ((0, _window.hasWindow)()) {
          that._renderTemplates(templatesInfo);
        }
        if (that.option('onLayoutChanged')) {
          that.$element().toggleClass(_constants.LAYOUT_MANAGER_ONE_COLUMN, that.isSingleColumnMode(e.component));
        }
      },
      itemTemplate(e, itemData, itemElement) {
        if (!e.location) {
          return;
        }
        const $itemElement = (0, _renderer.default)(itemElement);
        const itemRenderedCountInPreviousRows = e.location.row * colCount;
        const item = that._items[e.location.col + itemRenderedCountInPreviousRows];
        if (!item) {
          return;
        }
        const itemCssClassList = [item.cssClass];
        $itemElement.toggleClass(_constants.SINGLE_COLUMN_ITEM_CONTENT, that.isSingleColumnMode(this));
        if (e.location.row === 0) {
          itemCssClassList.push(LAYOUT_MANAGER_FIRST_ROW_CLASS);
        }
        if (e.location.col === 0) {
          itemCssClassList.push(LAYOUT_MANAGER_FIRST_COL_CLASS);
        }
        if (item.itemType === _constants.SIMPLE_ITEM_TYPE && that.option('isRoot')) {
          $itemElement.addClass(_constants.ROOT_SIMPLE_ITEM_CLASS);
        }
        const isLastColumn = e.location.col === colCount - 1 || e.location.col + e.location.colspan === colCount;
        const rowsCount = that._getRowsCount();
        const isLastRow = e.location.row === rowsCount - 1;
        if (isLastColumn) {
          itemCssClassList.push(LAYOUT_MANAGER_LAST_COL_CLASS);
        }
        if (isLastRow) {
          itemCssClassList.push(LAYOUT_MANAGER_LAST_ROW_CLASS);
        }
        if (item.itemType !== 'empty') {
          itemCssClassList.push(_constants.FIELD_ITEM_CLASS);
          itemCssClassList.push(that.option('cssItemClass'));
          if ((0, _type.isDefined)(item.col)) {
            itemCssClassList.push(`dx-col-${item.col}`);
          }
        }
        templatesInfo.push({
          itemType: item.itemType,
          item,
          $parent: $itemElement,
          rootElementCssClassList: itemCssClassList
        });
      },
      cols: that._generateRatio(colCount),
      rows: that._generateRatio(that._getRowsCount(), true),
      dataSource: layoutItems,
      screenByWidth: that.option('screenByWidth'),
      singleColumnScreen: xsColCount ? false : 'xs'
    };
  }
  _getColCount() {
    let {
      colCount
    } = this.option();
    const colCountByScreen = this.option('colCountByScreen');
    if (colCountByScreen) {
      const {
        form
      } = this.option();
      let screenFactor = form === null || form === void 0 ? void 0 : form.getTargetScreenFactor();
      if (!screenFactor) {
        screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option('screenByWidth')) : 'lg';
      }
      // @ts-expect-error ts-error
      colCount = colCountByScreen[screenFactor] || colCount;
    }
    if (colCount === 'auto') {
      if (this._cashedColCount) {
        return this._cashedColCount;
      }
      this._cashedColCount = colCount = this._getMaxColCount();
    }
    // @ts-expect-error ts-error
    return colCount < 1 ? 1 : colCount;
  }
  _getMaxColCount() {
    if (!(0, _window.hasWindow)()) {
      return 1;
    }
    const minColWidth = this.option('minColWidth');
    const width = (0, _size.getWidth)(this.$element());
    const itemsCount = this._items.length;
    // @ts-expect-error ts-error
    const maxColCount = Math.floor(width / minColWidth) || 1;
    return itemsCount < maxColCount ? itemsCount : maxColCount;
  }
  isCachedColCountObsolete() {
    return this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
  }
  _prepareItemsWithMerging(colCount) {
    const items = this._items.slice(0);
    let item;
    let itemsMergedByCol;
    let result = [];
    let j;
    let i;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      // @ts-expect-error ts-error
      result.push(item);
      if (this.option('alignItemLabels') || item.alignItemLabels || item.colSpan) {
        item.col = this._getColByIndex(result.length - 1, colCount);
      }
      if (item.colSpan > 1 && item.col + item.colSpan <= colCount) {
        itemsMergedByCol = [];
        for (j = 0; j < item.colSpan - 1; j++) {
          itemsMergedByCol.push({
            merged: true
          });
        }
        result = result.concat(itemsMergedByCol);
      } else {
        delete item.colSpan;
      }
    }
    this._setItems(result);
  }
  _getColByIndex(index, colCount) {
    return index % colCount;
  }
  _setItems(items) {
    this._items = items;
    // @ts-expect-error ts-error
    this._cashedColCount = null; // T923489
  }
  _generateLayoutItems() {
    const items = this._items;
    const colCount = this._getColCount();
    const result = [];
    let item;
    let i;
    for (i = 0; i < items.length; i++) {
      item = items[i];
      if (!item.merged) {
        const generatedItem = {
          location: {
            // @ts-expect-error
            // eslint-disable-next-line radix
            row: parseInt(i / colCount),
            col: this._getColByIndex(i, colCount)
          }
        };
        if ((0, _type.isDefined)(item.disabled)) {
          generatedItem.disabled = item.disabled;
        }
        if ((0, _type.isDefined)(item.visible)) {
          generatedItem.visible = item.visible;
        }
        if ((0, _type.isDefined)(item.colSpan)) {
          generatedItem.location.colspan = item.colSpan;
        }
        if ((0, _type.isDefined)(item.rowSpan)) {
          generatedItem.location.rowspan = item.rowSpan;
        }
        result.push(generatedItem);
      }
    }
    return result;
  }
  _renderEmptyItem($container) {
    // @ts-expect-error
    (0, _m_empty_item.renderEmptyItem)({
      $container
    });
  }
  _renderButtonItem(_ref3) {
    let {
      item,
      $parent,
      rootElementCssClassList
    } = _ref3;
    const {
      $rootElement,
      buttonInstance
    } = (0, _m_button_item.renderButtonItem)({
      item,
      $parent,
      rootElementCssClassList,
      validationGroup: this.option('validationGroup'),
      createComponentCallback: this._createComponent.bind(this)
    });
    // TODO: try to remove '_itemsRunTimeInfo' from 'render' function
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance: buttonInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _renderFieldItem(_ref4, itemsWithLabelTemplateCount) {
    var _item$label2;
    let {
      item,
      $parent,
      rootElementCssClassList
    } = _ref4;
    const editorValue = this._getDataByField(item.dataField);
    let canAssignUndefinedValueToEditor = false;
    if (editorValue === undefined) {
      const {
        allowIndeterminateState,
        editorType,
        dataField
      } = item;
      canAssignUndefinedValueToEditor = this._isCheckboxUndefinedStateEnabled({
        allowIndeterminateState,
        editorType,
        dataField
      });
    }
    const name = item.dataField || item.name;
    const formOrLayoutManager = this._getFormOrThis();
    const onLabelTemplateRendered = () => {
      this._incTemplateRenderedCallCount();
      if (this._shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, itemsWithLabelTemplateCount)) {
        // @ts-expect-error ts-error
        formOrLayoutManager._alignLabels(this, this.isSingleColumnMode(formOrLayoutManager));
      }
    };
    const {
      form
    } = this.option();
    const {
      $fieldEditorContainer,
      widgetInstance,
      $rootElement
    } = (0, _m_field_item.renderFieldItem)((0, _m_formLayout_manager.convertToRenderFieldItemOptions)({
      $parent,
      rootElementCssClassList,
      item,
      name,
      editorValue,
      canAssignUndefinedValueToEditor,
      formOrLayoutManager: this._getFormOrThis(),
      createComponentCallback: this._createComponent.bind(this),
      formLabelLocation: this.option('labelLocation'),
      requiredMessageTemplate: this.option('requiredMessage'),
      validationGroup: this.option('validationGroup'),
      editorValidationBoundary: this.option('validationBoundary'),
      editorStylingMode: form === null || form === void 0 ? void 0 : form.option('stylingMode'),
      showColonAfterLabel: this.option('showColonAfterLabel'),
      managerLabelLocation: this.option('labelLocation'),
      template: item.template ? this._getTemplate(item.template) : null,
      labelTemplate: (_item$label2 = item.label) !== null && _item$label2 !== void 0 && _item$label2.template ? this._getTemplate(item.label.template) : null,
      itemId: form === null || form === void 0 ? void 0 : form.getItemID(name),
      managerMarkOptions: this._getMarkOptions(),
      labelMode: this.option('labelMode'),
      onLabelTemplateRendered
    }));
    const {
      onFieldItemRendered
    } = this.option();
    onFieldItemRendered === null || onFieldItemRendered === void 0 || onFieldItemRendered();
    if (widgetInstance && item.dataField) {
      // TODO: move to renderFieldItem ?
      this._bindDataField(widgetInstance, item.dataField, item.editorType, $fieldEditorContainer);
    }
    this._itemsRunTimeInfo.add({
      item,
      widgetInstance,
      guid: item.guid,
      $itemContainer: $rootElement
    });
  }
  _incTemplateRenderedCallCount() {
    this._labelTemplateRenderedCallCount = (this._labelTemplateRenderedCallCount ?? 0) + 1;
  }
  _shouldAlignLabelsOnTemplateRendered(formOrLayoutManager, totalItemsWithLabelTemplate) {
    return formOrLayoutManager.option('templatesRenderAsynchronously') && this._labelTemplateRenderedCallCount === totalItemsWithLabelTemplate;
  }
  _getMarkOptions() {
    return {
      showRequiredMark: this.option('showRequiredMark'),
      requiredMark: this.option('requiredMark'),
      showOptionalMark: this.option('showOptionalMark'),
      optionalMark: this.option('optionalMark')
    };
  }
  _getFormOrThis() {
    const {
      form
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return form || this;
  }
  _bindDataField(editorInstance, dataField, editorType, $container) {
    const formOrThis = this._getFormOrThis();
    editorInstance.on('enterKey', args => {
      formOrThis._createActionByOption('onEditorEnterKey')((0, _extend.extend)(args, {
        dataField
      }));
    });
    this._createWatcher(editorInstance, $container, dataField);
    this.linkEditorToDataField(editorInstance, dataField);
  }
  _createWatcher(editorInstance, $container, dataField) {
    function compareArrays(array1, array2) {
      if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
        return false;
      }
      for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
      return true;
    }
    const that = this;
    const watch = that._getWatch();
    if (!(0, _type.isFunction)(watch)) {
      return;
    }
    const dispose = watch(() => that._getDataByField(dataField), () => {
      const fieldValue = that._getDataByField(dataField);
      if (editorInstance.NAME === 'dxTagBox') {
        const editorValue = editorInstance.option('value');
        if (fieldValue !== editorValue && compareArrays(fieldValue, editorValue)) {
          // handle array only, it can be wrapped into Proxy (T1020953)
          return;
        }
      }
      editorInstance.option('value', fieldValue);
    }, {
      deep: true,
      skipImmediate: true
    },
    /// #DEBUG
    {
      createWatcherDataField: dataField
    });
    _events_engine.default.on($container, _remove.removeEvent, dispose);
  }
  _getWatch() {
    if (!(0, _type.isDefined)(this._watch)) {
      const {
        form: formInstance
      } = this.option();
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      this._watch = formInstance && formInstance.option('integrationOptions.watchMethod');
    }
    return this._watch;
  }
  // @ts-expect-error ts-error
  _createComponent($editor, type, editorOptions) {
    const readOnlyState = this.option('readOnly');
    // @ts-expect-error ts-error
    let hasEditorReadOnly = Object.hasOwn(editorOptions, 'readOnly');
    const instance = super._createComponent($editor, type, _extends({}, editorOptions, {
      readOnly: !hasEditorReadOnly ? readOnlyState : editorOptions.readOnly
    }));
    let isChangeByForm = false;
    // @ts-expect-error ts-error
    instance.on('optionChanged', args => {
      if (args.name === 'readOnly' && !isChangeByForm) {
        hasEditorReadOnly = true;
      }
    });
    this.on('optionChanged', args => {
      if (args.name === 'readOnly' && !hasEditorReadOnly) {
        isChangeByForm = true;
        // @ts-expect-error ts-error
        instance.option(args.name, args.value);
        isChangeByForm = false;
      }
    });
    return instance;
  }
  _generateRatio(count, isAutoSize) {
    const result = [];
    let ratio;
    let i;
    for (i = 0; i < count; i++) {
      ratio = {
        ratio: 1
      };
      if (isAutoSize) {
        ratio.baseSize = 'auto';
      }
      result.push(ratio);
    }
    return result;
  }
  _getRowsCount() {
    // @ts-expect-error ts-error
    return Math.ceil(this._items.length / this._getColCount());
  }
  _updateReferencedOptions(newLayoutData) {
    const layoutData = this.option('layoutData');
    if ((0, _type.isObject)(layoutData)) {
      Object.getOwnPropertyNames(layoutData)
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      .forEach(property => delete this._optionsByReference[`layoutData.${property}`]);
    }
    if ((0, _type.isObject)(newLayoutData)) {
      Object.getOwnPropertyNames(newLayoutData)
      // eslint-disable-next-line no-return-assign
      .forEach(property => this._optionsByReference[`layoutData.${property}`] = true);
    }
  }
  _clearWidget(instance) {
    this._disableEditorValueChangedHandler = true;
    instance.clear();
    this._disableEditorValueChangedHandler = false;
    instance.option('isValid', true);
  }
  _optionChanged(args) {
    if (args.fullName.search('layoutData.') === 0) {
      return;
    }
    switch (args.name) {
      case 'showRequiredMark':
      case 'showOptionalMark':
      case 'requiredMark':
      case 'optionalMark':
        this._invalidate();
        break;
      case 'layoutData':
        this._updateReferencedOptions(args.value);
        if (this.option('items')) {
          if (!(0, _type.isEmptyObject)(args.value)) {
            this._itemsRunTimeInfo.each((_, itemRunTimeInfo) => {
              if ((0, _type.isDefined)(itemRunTimeInfo.item)) {
                const {
                  dataField
                } = itemRunTimeInfo.item;
                if (dataField && (0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
                  const valueGetter = (0, _data.compileGetter)(dataField);
                  // @ts-expect-error ts-error
                  const dataValue = valueGetter(args.value);
                  const {
                    allowIndeterminateState,
                    editorType
                  } = itemRunTimeInfo.item;
                  if (dataValue !== undefined || this._isCheckboxUndefinedStateEnabled({
                    allowIndeterminateState,
                    editorType,
                    dataField
                  })) {
                    itemRunTimeInfo.widgetInstance.option('value', dataValue);
                  } else {
                    this._clearWidget(itemRunTimeInfo.widgetInstance);
                  }
                }
              }
            });
          }
        } else {
          this._initDataAndItems(args.value);
          this._invalidate();
        }
        break;
      case 'items':
        this._cleanItemWatchers();
        this._initDataAndItems(args.value);
        this._invalidate();
        break;
      case 'alignItemLabels':
      case 'labelLocation':
      case 'labelMode':
      case 'requiredMessage':
        this._invalidate();
        break;
      case 'customizeItem':
        this._updateItems(this.option('layoutData'));
        this._invalidate();
        break;
      case 'colCount':
      case 'colCountByScreen':
        this._resetColCount();
        break;
      case 'minColWidth':
        {
          const {
            colCount
          } = this.option();
          if (colCount === 'auto') {
            this._resetColCount();
          }
          break;
        }
      case 'readOnly':
        break;
      case 'width':
        {
          super._optionChanged(args);
          const {
            colCount
          } = this.option();
          if (colCount === 'auto') {
            this._resetColCount();
          }
          break;
        }
      case 'onFieldDataChanged':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetColCount() {
    // @ts-expect-error ts-error
    this._cashedColCount = null;
    this._invalidate();
  }
  linkEditorToDataField(editorInstance, dataField) {
    this.on('optionChanged', args => {
      if (args.fullName === `layoutData.${dataField}`) {
        editorInstance._setOptionWithoutOptionChange('value', args.value);
      }
    });
    editorInstance.on('valueChanged', args => {
      // TODO: This need only for the KO integration
      const isValueReferenceType = (0, _type.isObject)(args.value) || Array.isArray(args.value);
      if (!this._disableEditorValueChangedHandler && !(isValueReferenceType && args.value === args.previousValue)) {
        this._updateFieldValue(dataField, args.value);
      }
    });
  }
  _dimensionChanged() {
    const {
      colCount
    } = this.option();
    if (colCount === 'auto' && this.isCachedColCountObsolete()) {
      this._eventsStrategy.fireEvent('autoColCountChanged');
    }
  }
  updateData(data, value) {
    const that = this;
    if ((0, _type.isObject)(data)) {
      (0, _iterator.each)(data, (dataField, fieldValue) => {
        that._updateFieldValue(dataField, fieldValue);
      });
    } else if (typeof data === 'string') {
      that._updateFieldValue(data, value);
    }
  }
  getEditor(field) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(field) || this._itemsRunTimeInfo.findWidgetInstanceByName(field);
  }
  // @ts-expect-error ts-error
  isSingleColumnMode(component) {
    const responsiveBox = this._responsiveBox || component;
    if (responsiveBox) {
      return responsiveBox.option('currentScreenFactor') === responsiveBox.option('singleColumnScreen');
    }
  }
  getItemsRunTimeInfo() {
    return this._itemsRunTimeInfo;
  }
}
(0, _component_registrator.default)('dxLayoutManager', LayoutManager);
var _default = exports.default = LayoutManager;