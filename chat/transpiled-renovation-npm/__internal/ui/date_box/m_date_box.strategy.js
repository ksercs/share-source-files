"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _date = _interopRequireDefault(require("../../../common/core/localization/date"));
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error dxClass inheritance issue
class DateBoxStrategy extends _class.default.inherit({}) {
  ctor(dateBox) {
    this.dateBox = dateBox;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  widgetOption(option) {
    var _this$_widget;
    return (_this$_widget = this._widget) === null || _this$_widget === void 0 ? void 0 : _this$_widget.option.apply(this._widget, arguments);
  }
  _renderWidget(element) {
    element = element || (0, _renderer.default)('<div>');
    this._widget = this._createWidget(element);
    this._widget.$element().appendTo(this._getWidgetContainer());
  }
  _createWidget(element) {
    const widgetName = this._getWidgetName();
    const widgetOptions = this._getWidgetOptions();
    return this.dateBox._createComponent(element, widgetName, widgetOptions);
  }
  _getWidgetOptions() {
    _class.default.abstract();
  }
  _getWidgetName() {
    _class.default.abstract();
  }
  getDefaultOptions() {
    return {
      mode: 'text'
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDisplayFormat(displayFormat) {
    _class.default.abstract();
  }
  supportedKeys() {}
  getKeyboardListener() {}
  customizeButtons() {}
  getParsedText(text, format) {
    // @ts-expect-error
    const value = _date.default.parse(text, format);
    // @ts-expect-error
    return value || _date.default.parse(text);
  }
  renderInputMinMax() {}
  renderOpenedState() {
    this._updateValue();
  }
  // @ts-expect-error ts-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  popupConfig(popupConfig) {
    _class.default.abstract();
  }
  _dimensionChanged() {
    var _this$_getPopup;
    (_this$_getPopup = this._getPopup()) === null || _this$_getPopup === void 0 || _this$_getPopup.repaint();
  }
  renderPopupContent() {
    const popup = this._getPopup();
    this._renderWidget();
    const $popupContent = popup.$content().parent();
    _events_engine.default.off($popupContent, 'mousedown');
    _events_engine.default.on($popupContent, 'mousedown', this._preventFocusOnPopup.bind(this));
  }
  _preventFocusOnPopup(e) {
    e.preventDefault();
  }
  _getWidgetContainer() {
    return this._getPopup().$content();
  }
  _getPopup() {
    return this.dateBox._popup;
  }
  popupShowingHandler() {}
  popupHiddenHandler() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateValue(preventDefaultValue) {
    var _this$_widget2;
    (_this$_widget2 = this._widget) === null || _this$_widget2 === void 0 || _this$_widget2.option('value', this.dateBoxValue());
  }
  useCurrentDateByDefault() {}
  getDefaultDate() {
    return new Date();
  }
  textChangedHandler() {}
  renderValue() {
    if (this.dateBox.option('opened')) {
      this._updateValue();
    }
  }
  getValue() {
    return this._widget.option('value');
  }
  isAdaptivityChanged() {
    return false;
  }
  dispose() {
    const popup = this._getPopup();
    if (popup) {
      popup.$content().empty();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dateBoxValue(value, event) {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    }
    return this.dateBox.dateOption.apply(this.dateBox, ['value']);
  }
}
var _default = exports.default = DateBoxStrategy;