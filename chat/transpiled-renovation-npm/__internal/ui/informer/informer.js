"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_icon = require("../../core/utils/m_icon");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INFORMER_CLASS = 'dx-informer';
const INFORMER_ALIGNMENT_START_CLASS = 'dx-informer-alignment-start';
const INFORMER_ALIGNMENT_CENTER_CLASS = 'dx-informer-alignment-center';
const INFORMER_ALIGNMENT_END_CLASS = 'dx-informer-alignment-end';
const INFORMER_BG_CLASS = 'dx-informer-bg';
const INFORMER_TEXT_CLASS = 'dx-informer-text';
const INFORMER_ICON_CLASS = 'dx-informer-icon';
class Informer extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      contentAlignment: 'center',
      icon: '',
      showBackground: true,
      text: ''
    });
  }
  _initMarkup() {
    const {
      showBackground
    } = this.option();
    this.$element().addClass(INFORMER_CLASS);
    this.$element().toggleClass(INFORMER_BG_CLASS, showBackground);
    this._setAlignmentClass();
    super._initMarkup();
    this._renderIcon();
    this._renderText();
  }
  _setAlignmentClass() {
    this.$element().removeClass(INFORMER_ALIGNMENT_START_CLASS).removeClass(INFORMER_ALIGNMENT_CENTER_CLASS).removeClass(INFORMER_ALIGNMENT_END_CLASS);
    const {
      contentAlignment
    } = this.option();
    switch (contentAlignment) {
      case 'start':
        this.$element().addClass(INFORMER_ALIGNMENT_START_CLASS);
        break;
      case 'end':
        this.$element().addClass(INFORMER_ALIGNMENT_END_CLASS);
        break;
      case 'center':
      default:
        this.$element().addClass(INFORMER_ALIGNMENT_CENTER_CLASS);
        break;
    }
  }
  _renderIcon() {
    var _this$_$icon;
    (_this$_$icon = this._$icon) === null || _this$_$icon === void 0 || _this$_$icon.remove();
    const {
      icon
    } = this.option();
    const $icon = (0, _m_icon.getImageContainer)(icon);
    if (!$icon) {
      return;
    }
    this._$icon = (0, _renderer.default)('<div>').addClass(INFORMER_ICON_CLASS).prependTo(this.$element()).append($icon);
  }
  _renderText() {
    const {
      text = ''
    } = this.option();
    this._$text = (0, _renderer.default)('<div>').addClass(INFORMER_TEXT_CLASS).appendTo(this.$element()).text(text);
  }
  _updateText() {
    const {
      text = ''
    } = this.option();
    this._$text.text(text);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'icon':
        this._renderIcon();
        break;
      case 'contentAlignment':
        this._setAlignmentClass();
        break;
      case 'showBackground':
        this.$element().toggleClass(INFORMER_BG_CLASS, value);
        break;
      case 'text':
        this._updateText();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxInformer', Informer);
var _default = exports.default = Informer;