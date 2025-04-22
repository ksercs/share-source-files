/**
* DevExtreme (cjs/__internal/ui/m_validation_summary.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../common/core/events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _m_collection_widget = _interopRequireDefault(require("../ui/collection/m_collection_widget.edit"));
var _m_validation_engine = _interopRequireDefault(require("./m_validation_engine"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error ts-error
const VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
const ITEM_CLASS = `${VALIDATION_SUMMARY_CLASS}-item`;
const ITEM_DATA_KEY = `${VALIDATION_SUMMARY_CLASS}-item-data`;
class ValidationSummary extends _m_collection_widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      focusStateEnabled: false,
      // @ts-expect-error ts-error
      noDataText: null
    });
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    (0, _extend.extend)(this._optionsByReference, {
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
    || _m_validation_engine.default.findGroup($element, this._modelByElement($element));
    const groupConfig = _m_validation_engine.default.addGroup(group, true);
    this._unsubscribeGroup();
    this._groupWasInit = true;
    this._validationGroup = group;
    this.groupSubscription = this._groupValidationHandler.bind(this);
    groupConfig.on('validated', this.groupSubscription);
  }
  _unsubscribeGroup() {
    const groupConfig = _m_validation_engine.default.getGroupConfig(this._validationGroup);
    groupConfig === null || groupConfig === void 0 || groupConfig.off('validated', this.groupSubscription);
  }
  _getOrderedItems(validators, items) {
    let orderedItems = [];
    (0, _iterator.each)(validators, (_, validator) => {
      // @ts-expect-error ts-error
      const foundItems = (0, _common.grep)(items, item => {
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
    const items = this._getOrderedItems(params.validators, (0, _iterator.map)(params.brokenRules, rule => ({
      text: rule.message,
      validator: rule.validator,
      index: rule.index
    })));
    this.validators = params.validators;
    (0, _iterator.each)(this.validators, (_, validator) => {
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
        const foundRule = (0, _common.grep)(brokenRules || [], rule => rule.index === item.index)[0];
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
    (0, _iterator.each)(brokenRules, (_, rule) => {
      const foundItem = (0, _common.grep)(items, item => item.validator === validator && item.index === rule.index)[0];
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
    _events_engine.default.on(params.itemElement, 'click', () => {
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
(0, _component_registrator.default)('dxValidationSummary', ValidationSummary);
var _default = exports.default = ValidationSummary;
