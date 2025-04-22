"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _themes = require("../../../../ui/themes");
var _m_baseDialog = _interopRequireDefault(require("./m_baseDialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FORM_CLASS = 'dx-formdialog-form';
const FORM_DIALOG_CLASS = 'dx-formdialog';
const getApplyButtonConfig = () => {
  // @ts-expect-error
  if ((0, _themes.isFluent)()) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  // @ts-expect-error
  if ((0, _themes.isFluent)()) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
class FormDialog extends _m_baseDialog.default {
  constructor($container, popupConfig) {
    super($container, popupConfig);
    this._attachOptionChangedHandler();
  }
  _attachOptionChangedHandler() {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.on('optionChanged', _ref => {
      let {
        name,
        value
      } = _ref;
      if (name === 'title') {
        this._onTitleChanged(value);
      }
    });
  }
  _escKeyHandler() {
    var _this$_popup2;
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.hide();
  }
  _addEscapeHandler(e) {
    e.component.registerKeyHandler('escape', this._escKeyHandler.bind(this));
  }
  _getPopupConfig() {
    const baseConfig = super._getPopupConfig();
    return (0, _extend.extend)(true, {}, baseConfig, _extends({
      showCloseButton: false,
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
        this._popup.on('shown', () => {
          this._form.focus();
        });
        this._addEscapeHandler.bind(this);
      },
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: _message.default.format('OK'),
          onClick: e => {
            this.callAddButtonAction(e.event);
          }
        }, getApplyButtonConfig())
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: _extends({
          onInitialized: this._addEscapeHandler.bind(this),
          text: _message.default.format('Cancel'),
          onClick: () => {
            this._popup.hide();
          }
        }, getCancelButtonConfig())
      }]
    }, this._popupUserConfig));
  }
  _renderContent($contentElem) {
    const $formContainer = (0, _renderer.default)('<div>').appendTo($contentElem);
    this._renderForm($formContainer, {
      onEditorEnterKey: e => this.callAddButtonAction(e.event),
      customizeItem: item => {
        if (item.itemType === 'simple') {
          item.editorOptions = (0, _extend.extend)(true, {}, item.editorOptions, {
            onInitialized: this._addEscapeHandler.bind(this)
          });
        }
      }
    });
    this._updateFormLabel();
  }
  _getPopupClass() {
    return FORM_DIALOG_CLASS;
  }
  _onTitleChanged(value) {
    this._updateFormLabel(value);
  }
  _renderForm($container, options) {
    $container.addClass(FORM_CLASS);
    this._form = new _form.default($container.get(0), options);
    this._updateFormLabel();
  }
  _updateFormLabel(text) {
    var _this$_form;
    // @ts-expect-error
    const label = text ?? this.popupOption('title');
    (_this$_form = this._form) === null || _this$_form === void 0 || _this$_form.$element().attr('aria-label', label);
  }
  _getDefaultFormOptions() {
    return {
      colCount: 1,
      width: 'auto',
      // @ts-expect-error
      labelLocation: (0, _themes.isMaterialBased)() ? 'top' : 'left'
    };
  }
  callAddButtonAction(event) {
    if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
      return;
    }
    const formData = this._form.option('formData');
    this.hide(formData, event);
  }
  show(formUserConfig) {
    const formConfig = (0, _extend.extend)(this._getDefaultFormOptions(), formUserConfig);
    this._form.option(formConfig);
    return super.show();
  }
  hide(formData, event) {
    var _this$deferred;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.resolve(formData, event);
    this._popup.hide();
  }
  onHiding() {
    this.beforeAddButtonAction = undefined;
    super.onHiding();
  }
  formOption() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error
    return this._form.option.apply(this._form, args);
  }
}
exports.default = FormDialog;