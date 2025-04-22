/**
* DevExtreme (esm/__internal/ui/m_validation_summary.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../common/core/events/core/events_engine';
import registerComponent from '../../core/component_registrator';
// @ts-expect-error ts-error
import { grep } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { each, map } from '../../core/utils/iterator';
import CollectionWidget from '../ui/collection/m_collection_widget.edit';
import ValidationEngine from './m_validation_engine';
const VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
const ITEM_CLASS = `${VALIDATION_SUMMARY_CLASS}-item`;
const ITEM_DATA_KEY = `${VALIDATION_SUMMARY_CLASS}-item-data`;
class ValidationSummary extends CollectionWidget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      focusStateEnabled: false,
      // @ts-expect-error ts-error
      noDataText: null
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationGroup: true
    });
  }
  _init() {
    super._init();
    this._initGroupRegistration();
  }
  _initGroupRegistration() {
    const $element = this.$element();
    const {
      validationGroup
    } = this.option();
    const group = validationGroup
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    || ValidationEngine.findGroup($element, this._modelByElement($element));
    const groupConfig = ValidationEngine.addGroup(group, true);
    this._unsubscribeGroup();
    this._groupWasInit = true;
    this._validationGroup = group;
    this.groupSubscription = this._groupValidationHandler.bind(this);
    groupConfig.on('validated', this.groupSubscription);
  }
  _unsubscribeGroup() {
    const groupConfig = ValidationEngine.getGroupConfig(this._validationGroup);
    groupConfig === null || groupConfig === void 0 || groupConfig.off('validated', this.groupSubscription);
  }
  _getOrderedItems(validators, items) {
    let orderedItems = [];
    each(validators, (_, validator) => {
      // @ts-expect-error ts-error
      const foundItems = grep(items, item => {
        if (item.validator === validator) {
          return true;
        }
      });
      if (foundItems.length) {
        orderedItems = orderedItems.concat(foundItems);
      }
    });
    return orderedItems;
  }
  _groupValidationHandler(params) {
    const items = this._getOrderedItems(params.validators, map(params.brokenRules, rule => ({
      text: rule.message,
      validator: rule.validator,
      index: rule.index
    })));
    this.validators = params.validators;
    each(this.validators, (_, validator) => {
      if (validator._validationSummary !== this) {
        let handler = this._itemValidationHandler.bind(this);
        const disposingHandler = function () {
          validator.off('validated', handler);
          validator._validationSummary = null;
          // @ts-expect-error ts-error
          handler = null;
        };
        validator.on('validated', handler);
        validator.on('disposing', disposingHandler);
        validator._validationSummary = this;
      }
    });
    this.option('items', items);
  }
  _itemValidationHandler(_ref) {
    let {
      isValid,
      validator,
      brokenRules
    } = _ref;
    let {
      items
    } = this.option();
    let itemsChanged = false;
    let itemIndex = 0;
    // @ts-expect-error ts-error
    while (itemIndex < items.length) {
      // @ts-expect-error ts-error
      const item = items[itemIndex];
      if (item.validator === validator) {
        const foundRule = grep(brokenRules || [], rule => rule.index === item.index)[0];
        if (isValid || !foundRule) {
          // @ts-expect-error ts-error
          items.splice(itemIndex, 1);
          itemsChanged = true;
          continue;
        }
        if (foundRule.message !== item.text) {
          item.text = foundRule.message;
          itemsChanged = true;
        }
      }
      itemIndex++;
    }
    each(brokenRules, (_, rule) => {
      const foundItem = grep(items, item => item.validator === validator && item.index === rule.index)[0];
      if (!foundItem) {
        // @ts-expect-error ts-error
        items.push({
          text: rule.message,
          validator,
          index: rule.index
        });
        itemsChanged = true;
      }
    });
    if (itemsChanged) {
      items = this._getOrderedItems(this.validators, items);
      this.option('items', items);
    }
  }
  _initMarkup() {
    this.$element().addClass(VALIDATION_SUMMARY_CLASS);
    super._initMarkup();
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'validationGroup':
        this._initGroupRegistration();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemDataKey() {
    return ITEM_DATA_KEY;
  }
  _postprocessRenderItem(params) {
    eventsEngine.on(params.itemElement, 'click', () => {
      var _params$itemData$vali, _params$itemData$vali2;
      (_params$itemData$vali = params.itemData.validator) === null || _params$itemData$vali === void 0 || (_params$itemData$vali2 = _params$itemData$vali.focus) === null || _params$itemData$vali2 === void 0 || _params$itemData$vali2.call(_params$itemData$vali);
    });
  }
  _dispose() {
    super._dispose();
    this._unsubscribeGroup();
  }
  refreshValidationGroup() {
    this._initGroupRegistration();
  }
}
registerComponent('dxValidationSummary', ValidationSummary);
export default ValidationSummary;
