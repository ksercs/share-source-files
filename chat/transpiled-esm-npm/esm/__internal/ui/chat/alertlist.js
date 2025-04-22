import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import Widget from '../../core/widget/widget';
import Informer from '../../ui/informer/informer';
const CHAT_ALERTLIST_CLASS = 'dx-chat-alertlist';
const CHAT_ALERTLIST_ERROR_CLASS = 'dx-chat-alertlist-error';
const ICON_ERRORCIRCLE = 'errorcircle';
class AlertList extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: []
    });
  }
  _initMarkup() {
    $(this.element()).addClass(CHAT_ALERTLIST_CLASS);
    super._initMarkup();
    const {
      items
    } = this.option();
    this._renderItems(items);
    this._updateAria();
  }
  _renderItems(items) {
    this._informersInstances = [];
    if (items !== null && items !== void 0 && items.length) {
      items.forEach(itemData => {
        this._renderItem(itemData);
      });
    }
  }
  _renderItem(itemData) {
    const $informer = $('<div>').addClass(CHAT_ALERTLIST_ERROR_CLASS);
    this.$element().append($informer);
    const informer = this._createComponent($informer, Informer, {
      text: (itemData === null || itemData === void 0 ? void 0 : itemData.message) ?? '',
      icon: ICON_ERRORCIRCLE,
      showBackground: false
    });
    this._informersInstances.push(informer);
  }
  _cleanItems() {
    this._informersInstances.forEach(informerInstance => {
      informerInstance.dispose();
    });
  }
  _updateAria() {
    const aria = {
      role: 'log',
      atomic: 'false',
      label: messageLocalization.format('dxChat-alertListAriaLabel'),
      live: 'polite',
      relevant: 'additions'
    };
    this.setAria(aria);
  }
  _clean() {
    this._cleanItems();
    super._clean();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'items':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default AlertList;