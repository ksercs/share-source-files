import _extends from "@babel/runtime/helpers/esm/extends";
import localizationMessage from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import Form from '../../../../ui/form';
import { isFluent, isMaterialBased } from '../../../../ui/themes';
import BaseDialog from './m_baseDialog';
const FORM_CLASS = 'dx-formdialog-form';
const FORM_DIALOG_CLASS = 'dx-formdialog';
const getApplyButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'contained',
      type: 'default'
    };
  }
  return {};
};
const getCancelButtonConfig = () => {
  // @ts-expect-error
  if (isFluent()) {
    return {
      stylingMode: 'outlined',
      type: 'normal'
    };
  }
  return {};
};
export default class FormDialog extends BaseDialog {
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
    return extend(true, {}, baseConfig, _extends({
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
          text: localizationMessage.format('OK'),
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
          text: localizationMessage.format('Cancel'),
          onClick: () => {
            this._popup.hide();
          }
        }, getCancelButtonConfig())
      }]
    }, this._popupUserConfig));
  }
  _renderContent($contentElem) {
    const $formContainer = $('<div>').appendTo($contentElem);
    this._renderForm($formContainer, {
      onEditorEnterKey: e => this.callAddButtonAction(e.event),
      customizeItem: item => {
        if (item.itemType === 'simple') {
          item.editorOptions = extend(true, {}, item.editorOptions, {
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
    this._form = new Form($container.get(0), options);
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
      labelLocation: isMaterialBased() ? 'top' : 'left'
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
    const formConfig = extend(this._getDefaultFormOptions(), formUserConfig);
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