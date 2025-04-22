/**
* DevExtreme (esm/__internal/ui/stepper/stepper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { isDefined } from '../../../core/utils/type';
import { BindableTemplate } from '../../core/templates/m_bindable_template';
import { getImageContainer } from '../../core/utils/m_icon';
import CollectionWidgetAsync from '../../ui/collection/m_collection_widget.async';
import Connector from '../../ui/stepper/connector';
import StepperItem, { STEP_COMPLETED_CLASS, STEP_INVALID_ICON, STEP_VALID_ICON } from '../../ui/stepper/stepper_item';
export const STEPPER_CLASS = 'dx-stepper';
export const STEP_LIST_CLASS = 'dx-step-list';
export const STEP_CLASS = 'dx-step';
export const STEP_SELECTED_CLASS = 'dx-step-selected';
export const STEPPER_HORIZONTAL_ORIENTATION_CLASS = 'dx-stepper-horizontal';
export const STEPPER_VERTICAL_ORIENTATION_CLASS = 'dx-stepper-vertical';
export const STEP_INDICATOR_CLASS = 'dx-step-indicator';
export const STEP_TEXT_CLASS = 'dx-step-text';
export const STEP_CAPTION_CLASS = 'dx-step-caption';
export const STEP_LABEL_CLASS = 'dx-step-label';
export const STEP_OPTIONAL_MARK_CLASS = 'dx-step-optional-mark';
export const STEPPER_ITEM_DATA_KEY = 'dxStepperItemData';
export const ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};
class Stepper extends CollectionWidgetAsync {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      linear: true,
      selectionMode: 'single',
      selectOnFocus: true,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      focusStateEnabled: true,
      loopItemFocus: false,
      selectionRequired: true,
      hintExpr(data) {
        return data ? data.hint : undefined;
      },
      _itemAttributes: {
        role: 'tab'
      }
    });
  }
  _supportedKeys() {
    const defaultHandlers = super._supportedKeys();
    const {
      linear,
      selectOnFocus
    } = this.option();
    return _extends({}, defaultHandlers, {
      home: linear && selectOnFocus ? defaultHandlers.leftArrow : defaultHandlers.home,
      end: linear && selectOnFocus ? defaultHandlers.rightArrow : defaultHandlers.end
    });
  }
  _getStepIcon(data) {
    const {
      isValid,
      icon
    } = data;
    if (isValid === false) {
      return STEP_INVALID_ICON;
    }
    if (isValid === true) {
      return STEP_VALID_ICON;
    }
    return icon;
  }
  _getStepIndicator(data) {
    const {
      text
    } = data;
    const $indicatorElement = $('<div>').addClass(STEP_INDICATOR_CLASS);
    const iconName = this._getStepIcon(data);
    const $indicatorContent = getImageContainer(iconName) ?? $('<div>').addClass(STEP_TEXT_CLASS).text(text ?? '');
    $indicatorElement.append($indicatorContent);
    return $indicatorElement;
  }
  _getStepLabel(data) {
    const {
      label
    } = data;
    if (isDefined(label)) {
      return $('<div>').addClass(STEP_LABEL_CLASS).text(label);
    }
    return $();
  }
  _getStepOptionalMark(data) {
    const {
      optional
    } = data;
    if (optional) {
      const optionalMarkText = messageLocalization.format('dxStepper-optionalMark');
      return $('<div>').addClass(STEP_OPTIONAL_MARK_CLASS).text(optionalMarkText);
    }
    return $();
  }
  _getStepCaption(data) {
    const $stepLabel = this._getStepLabel(data);
    const $stepOptionalMark = this._getStepOptionalMark(data);
    if ($stepLabel.length || $stepOptionalMark.length) {
      const $stepCaption = $('<div>').addClass(STEP_CAPTION_CLASS);
      $stepCaption.append($stepLabel).append($stepOptionalMark);
      return $stepCaption;
    }
    return $();
  }
  _prepareDefaultItemTemplate(data, $container) {
    const $stepIndicator = this._getStepIndicator(data);
    const $stepLabel = this._getStepCaption(data);
    $container.append($stepIndicator).append($stepLabel);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data) => {
        this._prepareDefaultItemTemplate(data, $container);
      }, ['text', 'icon', 'label', 'isValid', 'optional'], this.option('integrationOptions.watchMethod'))
    });
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      index
    } = renderArgs;
    return super._createItemByTemplate(itemTemplate, _extends({}, renderArgs, {
      itemData: _extends({
        text: `${index + 1}`
      }, itemData)
    }));
  }
  _getItemInstance($item) {
    return StepperItem.getInstance($item);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const $itemFrame = super._renderItem(index, itemData, $container, $itemToReplace);
    this._getItemInstance($itemFrame).updateInvalidClass(itemData.isValid);
    return $itemFrame;
  }
  _postprocessRenderItem(args) {
    super._postprocessRenderItem(args);
    const {
      selectedIndex = 0
    } = this.option();
    const itemInstance = this._getItemInstance(args.itemElement);
    itemInstance.changeCompleted(args.itemIndex < selectedIndex);
  }
  _itemClass() {
    return STEP_CLASS;
  }
  _itemContainer() {
    return this._$stepsContainer;
  }
  _selectedItemClass() {
    return STEP_SELECTED_CLASS;
  }
  _itemDataKey() {
    return STEPPER_ITEM_DATA_KEY;
  }
  _init() {
    super._init();
    this.setAria('role', 'tablist');
    this._appendStepsContainer();
  }
  _initMarkup() {
    $(this.element()).addClass(STEPPER_CLASS);
    this._renderConnector();
    this._toggleOrientationClass();
    this._setAriaOrientation();
    super._initMarkup();
  }
  _renderConnector() {
    if (this._connector) {
      return;
    }
    const {
      orientation
    } = this.option();
    this._connector = this._createComponent($('<div>'), Connector, {
      orientation,
      size: this._getConnectorSize(),
      value: this._getConnectorValue()
    });
    $(this.element()).prepend(this._connector.$element());
  }
  _getConnectorSize() {
    const {
      items = []
    } = this.option();
    const itemRatio = 100 / (items.length || 1);
    return 100 - itemRatio;
  }
  _getConnectorValue() {
    const {
      items = [],
      selectedIndex = 0
    } = this.option();
    const segmentsCount = items.length - 1;
    const itemRatio = 100 / Math.max(segmentsCount, 1);
    return selectedIndex * itemRatio;
  }
  _appendStepsContainer() {
    this._$stepsContainer = $('<div>').addClass(STEP_LIST_CLASS);
    $(this.element()).append(this._$stepsContainer);
  }
  _setAriaOrientation() {
    const {
      orientation
    } = this.option();
    this.setAria('orientation', orientation);
  }
  _toggleOrientationClass() {
    $(this.element()).toggleClass(STEPPER_HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation()).toggleClass(STEPPER_VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _isHorizontalOrientation() {
    const {
      orientation
    } = this.option();
    return orientation === ORIENTATION.horizontal;
  }
  _shouldPreventItemEvent(itemElement) {
    const itemIndex = this._editStrategy.getIndex(itemElement);
    const {
      linear,
      selectedIndex = 0
    } = this.option();
    return !!linear && Math.abs(selectedIndex - itemIndex) > 1;
  }
  _itemClickHandler(e, args, config) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemClickHandler(e, args, config);
    }
  }
  _itemPointerDownHandler(e) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemPointerDownHandler(e);
    }
  }
  _itemSelectHandler(e) {
    if (!this._shouldPreventItemEvent(e.currentTarget)) {
      super._itemSelectHandler(e);
    }
  }
  _hover($el, $previous) {
    const $hoverTarget = this._findHoverTarget($el);
    if ($hoverTarget && this._shouldPreventItemEvent($hoverTarget)) {
      return;
    }
    super._hover($el, $previous);
  }
  _focusOutHandler(e) {
    this._clearFocusedItem();
    super._focusOutHandler(e);
  }
  _clearFocusedItem() {
    this.option('focusedElement', null);
  }
  _processChangeCompletedItems() {
    const itemElements = this._itemElements();
    if (!itemElements.length) {
      return;
    }
    const $lastCompletedElement = itemElements.filter(`.${STEP_COMPLETED_CLASS}`).last();
    const lastCompletedIndex = this._editStrategy.getIndex($lastCompletedElement);
    const {
      selectedIndex = 0
    } = this.option();
    const startIndex = Math.min(lastCompletedIndex + 1, selectedIndex);
    const endIndex = Math.max(lastCompletedIndex + 1, selectedIndex);
    const isCompleted = lastCompletedIndex < selectedIndex;
    for (let i = startIndex; i < endIndex; i += 1) {
      const itemInstance = this._getItemInstance($(itemElements[i]));
      itemInstance.changeCompleted(isCompleted);
    }
  }
  _postProcessSyncSelection() {
    this._connector.option('value', this._getConnectorValue());
    this._processChangeCompletedItems();
  }
  _syncSelectionOptions(byOption) {
    super._syncSelectionOptions(byOption).done(() => {
      this._postProcessSyncSelection();
    });
    return Deferred().resolve().promise();
  }
  _itemOptionChanged(item, property, value, prevValue) {
    switch (property) {
      case 'isValid':
        {
          const itemIndex = this._getIndexByItem(item);
          const $item = $(this._itemElements()[itemIndex]);
          const itemInstance = this._getItemInstance($item);
          itemInstance.updateInvalidClass(value);
          super._itemOptionChanged(item, property, value, prevValue);
          break;
        }
      default:
        super._itemOptionChanged(item, property, value, prevValue);
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'orientation':
        this._toggleOrientationClass();
        this._setAriaOrientation();
        this._connector.option(name, value);
        break;
      case 'linear':
        break;
      case 'hintExpr':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
Stepper.ItemClass = StepperItem;
registerComponent('dxStepper', Stepper);
export default Stepper;
