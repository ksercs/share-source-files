"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _informer = _interopRequireDefault(require("../../ui/informer/informer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_ALERTLIST_CLASS = 'dx-chat-alertlist';
const CHAT_ALERTLIST_ERROR_CLASS = 'dx-chat-alertlist-error';
const ICON_ERRORCIRCLE = 'errorcircle';
class AlertList extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: []
    });
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(CHAT_ALERTLIST_CLASS);
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
    const $informer = (0, _renderer.default)('<div>').addClass(CHAT_ALERTLIST_ERROR_CLASS);
    this.$element().append($informer);
    const informer = this._createComponent($informer, _informer.default, {
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
      label: _message.default.format('dxChat-alertListAriaLabel'),
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
var _default = exports.default = AlertList;