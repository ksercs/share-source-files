/**
* DevExtreme (esm/__internal/ui/m_drop_down_box.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../common/core/events/core/events_engine';
import { normalizeKeyName } from '../../common/core/events/utils/index';
import registerComponent from '../../core/component_registrator';
import devices from '../../core/devices';
import domAdapter from '../../core/dom_adapter';
import { getPublicElement } from '../../core/element';
import $ from '../../core/renderer';
// @ts-expect-error ts-error
import { grep } from '../../core/utils/common';
import { Deferred, when } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import { map } from '../../core/utils/iterator';
import { isDefined, isObject } from '../../core/utils/type';
import DataExpressionMixin from '../../ui/editor/ui.data_expression';
import { tabbable } from '../../ui/widget/selectors';
import DropDownEditor from '../ui/drop_down_editor/m_drop_down_editor';
import { getElementMaxHeightByWindow } from '../ui/overlay/m_utils';
const {
  getActiveElement
} = domAdapter;
const DROP_DOWN_BOX_CLASS = 'dx-dropdownbox';
const ANONYMOUS_TEMPLATE_NAME = 'content';
class DropDownBox extends DropDownEditor {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _supportedKeys() {
    return _extends({}, super._supportedKeys(), {
      tab(e) {
        if (!this.option('opened')) {
          return;
        }
        const $tabbableElements = this._getTabbableElements();
        const $focusableElement = e.shiftKey ? $tabbableElements.last() : $tabbableElements.first();
        if ($focusableElement) {
          // @ts-expect-error ts-error
          eventsEngine.trigger($focusableElement, 'focus');
        }
        e.preventDefault();
      }
    });
  }
  _getTabbableElements() {
    // @ts-expect-error ts-error
    return this._getElements().filter(tabbable);
  }
  _getElements() {
    // @ts-expect-error ts-error
    return $(this.content()).find('*');
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      acceptCustomValue: false,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      openOnFieldClick: true,
      displayValueFormatter(value) {
        return Array.isArray(value) ? value.join(', ') : value;
      },
      useHiddenSubmitElement: true
    });
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    super._initTemplates();
  }
  _initMarkup() {
    // @ts-expect-error ts-error
    this._initDataExpressions();
    this.$element().addClass(DROP_DOWN_BOX_CLASS);
    super._initMarkup();
  }
  _setSubmitValue() {
    const value = this.option('value');
    const submitValue = this._shouldUseDisplayValue(value)
    // @ts-expect-error ts-error
    ? this._displayGetter(value) : value;
    this._getSubmitElement().val(submitValue);
  }
  _shouldUseDisplayValue(value) {
    // @ts-expect-error ts-error
    return this.option('valueExpr') === 'this' && isObject(value);
  }
  _sortValuesByKeysOrder(orderedKeys, values) {
    const sortedValues = values.sort((a, b) => orderedKeys.indexOf(a.itemKey) - orderedKeys.indexOf(b.itemKey));
    return sortedValues.map(x => x.itemDisplayValue);
  }
  _renderInputValue() {
    let {
      renderOnly
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // @ts-expect-error ts-error
    this._rejectValueLoading();
    const values = [];
    // @ts-expect-error ts-error
    if (!this._dataSource) {
      super._renderInputValue({
        renderOnly,
        value: values
      });
      return Deferred().resolve();
    }
    // @ts-expect-error ts-error
    const currentValue = this._getCurrentValue();
    let keys = currentValue ?? [];
    keys = Array.isArray(keys) ? keys : [keys];
    const itemLoadDeferreds = map(keys, key => {
      const deferred = Deferred();
      this._loadItem(key).always(item => {
        // @ts-expect-error ts-error
        const displayValue = this._displayGetter(item);
        if (isDefined(displayValue)) {
          values.push({
            itemKey: key,
            itemDisplayValue: displayValue
          });
        } else if (this.option('acceptCustomValue')) {
          values.push({
            itemKey: key,
            itemDisplayValue: key
          });
        }
        deferred.resolve();
      });
      return deferred;
    });
    const callBase = super._renderInputValue.bind(this);
    return when.apply(this, itemLoadDeferreds).always(() => {
      const orderedValues = this._sortValuesByKeysOrder(keys, values);
      this.option('displayValue', orderedValues);
      callBase({
        renderOnly,
        value: values.length && orderedValues
      });
    });
  }
  _loadItem(value) {
    const deferred = Deferred();
    const that = this;
    // @ts-expect-error ts-error
    const selectedItem = grep(this.option('items') || [], item => this._isValueEquals(this._valueGetter(item), value))[0];
    if (selectedItem !== undefined) {
      deferred.resolve(selectedItem);
    } else {
      // @ts-expect-error ts-error
      this._loadValue(value).done(item => {
        deferred.resolve(item);
      }).fail(args => {
        if (args !== null && args !== void 0 && args.shouldSkipCallback) {
          return;
        }
        if (that.option('acceptCustomValue')) {
          deferred.resolve(value);
        } else {
          deferred.reject();
        }
      });
    }
    // @ts-expect-error
    return deferred.promise();
  }
  _popupTabHandler(e) {
    if (normalizeKeyName(e) !== 'tab') return;
    const $firstTabbable = this._getTabbableElements().first().get(0);
    const $lastTabbable = this._getTabbableElements().last().get(0);
    const $target = e.target;
    const moveBackward = !!($target === $firstTabbable && e.shiftKey);
    const moveForward = !!($target === $lastTabbable && !e.shiftKey);
    if (moveBackward || moveForward) {
      this.close();
      // @ts-expect-error ts-error
      eventsEngine.trigger(this._input(), 'focus');
      if (moveBackward) {
        e.preventDefault();
      }
    }
  }
  _renderPopupContent() {
    // @ts-expect-error ts-error
    if (this.option('contentTemplate') === ANONYMOUS_TEMPLATE_NAME) {
      return;
    }
    const contentTemplate = this._getTemplateByOption('contentTemplate');
    if (!(contentTemplate && this.option('contentTemplate'))) {
      return;
    }
    // @ts-expect-error ts-error
    const $popupContent = this._popup.$content();
    const templateData = {
      value: this._fieldRenderData(),
      component: this
    };
    $popupContent.empty();
    contentTemplate.render({
      container: getPublicElement($popupContent),
      model: templateData
    });
  }
  _canShowVirtualKeyboard() {
    // @ts-expect-error ts-error
    return devices.real().mac; // T845484
  }
  _isNestedElementActive() {
    const activeElement = getActiveElement();
    // @ts-expect-error ts-error
    return activeElement && this._popup.$content().get(0).contains(activeElement);
  }
  _shouldHideOnParentScroll() {
    return devices.real().deviceType === 'desktop' && this._canShowVirtualKeyboard() && this._isNestedElementActive();
  }
  _popupHiddenHandler() {
    super._popupHiddenHandler();
    this._popupPosition = undefined;
  }
  _popupPositionedHandler(e) {
    super._popupPositionedHandler(e);
    this._popupPosition = e.position;
  }
  _getDefaultPopupPosition(isRtlEnabled) {
    const {
      my,
      at
    } = super._getDefaultPopupPosition(isRtlEnabled);
    return {
      my,
      at,
      // @ts-expect-error ts-error
      offset: {
        v: -1
      },
      collision: 'flipfit'
    };
  }
  _popupConfig() {
    const {
      focusStateEnabled
    } = this.option();
    return _extends({}, super._popupConfig(), {
      tabIndex: -1,
      dragEnabled: false,
      focusStateEnabled,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      // @ts-expect-error ts-error
      hideOnParentScroll: this._shouldHideOnParentScroll.bind(this),
      position: extend(this.option('popupPosition'), {
        of: this.$element()
      }),
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        var _this$_popupPosition;
        const popupLocation = (_this$_popupPosition = this._popupPosition) === null || _this$_popupPosition === void 0 ? void 0 : _this$_popupPosition.v.location;
        return getElementMaxHeightByWindow(this.$element(), popupLocation);
      }.bind(this)
    });
  }
  _popupShownHandler() {
    super._popupShownHandler();
    const $firstElement = this._getTabbableElements().first();
    // @ts-expect-error ts-error
    eventsEngine.trigger($firstElement, 'focus');
  }
  // eslint-disable-next-line class-methods-use-this
  _setCollectionWidgetOption() {}
  _optionChanged(args) {
    // @ts-expect-error ts-error
    this._dataExpressionOptionChanged(args);
    switch (args.name) {
      case 'dataSource':
        this._renderInputValue();
        break;
      case 'displayValue':
        this.option('text', args.value);
        break;
      case 'displayExpr':
        this._renderValue();
        break;
      case 'contentTemplate':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
// @ts-expect-error ts-error
DropDownBox.include(DataExpressionMixin);
registerComponent('dxDropDownBox', DropDownBox);
export default DropDownBox;
