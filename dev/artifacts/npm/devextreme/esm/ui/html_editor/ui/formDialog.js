/**
* DevExtreme (esm/ui/html_editor/ui/formDialog.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { extend } from '../../../core/utils/extend';
import Popup from '../../popup';
import Form from '../../form';
import { Deferred } from '../../../core/utils/deferred';
import localizationMessage from '../../../localization/message';
import { getCurrentScreenFactor, hasWindow } from '../../../core/utils/window';
import devices from '../../../core/devices';
import { isMaterial } from '../../themes';
var DIALOG_CLASS = 'dx-formdialog';
var FORM_CLASS = 'dx-formdialog-form';
class FormDialog {
  constructor(editorInstance, popupConfig) {
    this._editorInstance = editorInstance;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
    this._attachOptionChangedHandler();
  }
  _renderPopup() {
    var editorInstance = this._editorInstance;
    var $container = $('<div>').addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
    var popupConfig = this._getPopupConfig();
    return editorInstance._createComponent($container, Popup, popupConfig);
  }
  _attachOptionChangedHandler() {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.on('optionChanged', _ref => {
      var {
        name,
        value
      } = _ref;
      if (name === 'title') {
        this._updateFormLabel(value);
      }
    });
  }
  _escKeyHandler() {
    this._popup.hide();
  }
  _addEscapeHandler(e) {
    e.component.registerKeyHandler('escape', this._escKeyHandler.bind(this));
  }
  _isSmallScreen() {
    var screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
    return devices.real().deviceType === 'phone' || screenFactor === 'xs';
  }
  _getPopupConfig() {
    return extend({
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
        this._popup.on('shown', () => {
          this._form.focus();
        });
      },
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      fullScreen: this._isSmallScreen(),
      contentTemplate: contentElem => {
        var $formContainer = $('<div>').appendTo(contentElem);
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
      },
      toolbarItems: [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('OK'),
          onClick: e => this.callAddButtonAction(e.event)
        }
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          onInitialized: this._addEscapeHandler.bind(this),
          text: localizationMessage.format('Cancel'),
          onClick: () => {
            this._popup.hide();
          }
        }
      }],
      _wrapperClassExternal: DIALOG_CLASS
    }, this._popupUserConfig);
  }
  onHiding() {
    this.beforeAddButtonAction = undefined;
    this.deferred.reject();
  }
  callAddButtonAction(event) {
    if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
      return;
    }
    this.hide(this._form.option('formData'), event);
  }
  _renderForm($container, options) {
    $container.addClass(FORM_CLASS);
    this._form = this._editorInstance._createComponent($container, Form, options);
    this._updateFormLabel();
  }
  _updateFormLabel(text) {
    var _this$_form;
    var label = text !== null && text !== void 0 ? text : this.popupOption('title');
    (_this$_form = this._form) === null || _this$_form === void 0 ? void 0 : _this$_form.$element().attr('aria-label', label);
  }
  _getDefaultFormOptions() {
    return {
      colCount: 1,
      width: 'auto',
      labelLocation: isMaterial() ? 'top' : 'left'
    };
  }
  formOption(optionName, optionValue) {
    return this._form.option.apply(this._form, arguments);
  }
  show(formUserConfig) {
    if (this._popup.option('visible')) {
      return;
    }
    this.deferred = new Deferred();
    var formConfig = extend(this._getDefaultFormOptions(), formUserConfig);
    this._form.option(formConfig);
    this._popup.show();
    return this.deferred.promise();
  }
  hide(formData, event) {
    this.deferred.resolve(formData, event);
    this._popup.hide();
  }
  popupOption(optionName, optionValue) {
    return this._popup.option.apply(this._popup, arguments);
  }
}
export default FormDialog;
