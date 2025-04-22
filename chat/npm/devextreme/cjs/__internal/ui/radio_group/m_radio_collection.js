/**
* DevExtreme (cjs/__internal/ui/radio_group/m_radio_collection.js)
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
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../../ui/editor/ui.data_expression"));
var _m_collection_widget = _interopRequireDefault(require("../../ui/collection/m_collection_widget.edit"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
const RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
const RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
const RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
const RADIO_VALUE_CONTAINER_CLASS = 'dx-radio-value-container';
const RADIO_BUTTON_CLASS = 'dx-radiobutton';
class RadioCollection extends _m_collection_widget.default {
  _focusTarget() {
    return (0, _renderer.default)(this.element()).parent();
  }
  // eslint-disable-next-line class-methods-use-this
  _nullValueSelectionSupported() {
    return true;
  }
  _getDefaultOptions() {
    const defaultOptions = super._getDefaultOptions();
    // @ts-expect-error
    return (0, _extend.extend)(defaultOptions, _ui.default._dataExpressionDefaultOptions(), {
      _itemAttributes: {
        role: 'radio'
      }
    });
  }
  _initMarkup() {
    super._initMarkup();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (0, _common.deferRender)(() => {
      this._itemElements().addClass(RADIO_BUTTON_CLASS);
    });
  }
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  }
  _postprocessRenderItem(args) {
    const {
      itemData: {
        html
      },
      itemElement
    } = args;
    if (!html) {
      const $radio = (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
      (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo($radio);
      const $radioContainer = (0, _renderer.default)('<div>').append($radio).addClass(RADIO_VALUE_CONTAINER_CLASS);
      (0, _renderer.default)(itemElement).prepend($radioContainer);
    }
    super._postprocessRenderItem(args);
  }
  _processSelectableItem($itemElement, isSelected) {
    super._processSelectableItem($itemElement, isSelected);
    $itemElement.toggleClass(RADIO_BUTTON_CHECKED_CLASS, isSelected).find(`.${RADIO_BUTTON_ICON_CLASS}`).first().toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, isSelected);
    this.setAria('checked', isSelected, $itemElement);
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _supportedKeys() {
    const parent = super._supportedKeys();
    return (0, _extend.extend)({}, parent, {
      enter(e) {
        e.preventDefault();
        // @ts-expect-error
        return parent.enter.apply(this, arguments);
      },
      space(e) {
        e.preventDefault();
        // @ts-expect-error
        return parent.space.apply(this, arguments);
      }
    });
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  // eslint-disable-next-line class-methods-use-this
  _setAriaSelectionAttribute() {}
}
var _default = exports.default = RadioCollection;
