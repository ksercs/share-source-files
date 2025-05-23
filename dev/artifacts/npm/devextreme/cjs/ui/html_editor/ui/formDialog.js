/**
* DevExtreme (cjs/ui/html_editor/ui/formDialog.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _popup = _interopRequireDefault(require("../../popup"));
var _form = _interopRequireDefault(require("../../form"));
var _deferred = require("../../../core/utils/deferred");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _window = require("../../../core/utils/window");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _themes = require("../../themes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DIALOG_CLASS = 'dx-formdialog';
var FORM_CLASS = 'dx-formdialog-form';
var FormDialog = /*#__PURE__*/function () {
  function FormDialog(editorInstance, popupConfig) {
    this._editorInstance = editorInstance;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
    this._attachOptionChangedHandler();
  }
  var _proto = FormDialog.prototype;
  _proto._renderPopup = function _renderPopup() {
    var editorInstance = this._editorInstance;
    var $container = (0, _renderer.default)('<div>').addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
    var popupConfig = this._getPopupConfig();
    return editorInstance._createComponent($container, _popup.default, popupConfig);
  };
  _proto._attachOptionChangedHandler = function _attachOptionChangedHandler() {
    var _this$_popup,
      _this = this;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.on('optionChanged', function (_ref) {
      var name = _ref.name,
        value = _ref.value;
      if (name === 'title') {
        _this._updateFormLabel(value);
      }
    });
  };
  _proto._escKeyHandler = function _escKeyHandler() {
    this._popup.hide();
  };
  _proto._addEscapeHandler = function _addEscapeHandler(e) {
    e.component.registerKeyHandler('escape', this._escKeyHandler.bind(this));
  };
  _proto._isSmallScreen = function _isSmallScreen() {
    var screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)() : null;
    return _devices.default.real().deviceType === 'phone' || screenFactor === 'xs';
  };
  _proto._getPopupConfig = function _getPopupConfig() {
    var _this2 = this;
    return (0, _extend.extend)({
      onInitialized: function onInitialized(e) {
        _this2._popup = e.component;
        _this2._popup.on('hiding', function () {
          return _this2.onHiding();
        });
        _this2._popup.on('shown', function () {
          _this2._form.focus();
        });
      },
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      fullScreen: this._isSmallScreen(),
      contentTemplate: function contentTemplate(contentElem) {
        var $formContainer = (0, _renderer.default)('<div>').appendTo(contentElem);
        _this2._renderForm($formContainer, {
          onEditorEnterKey: function onEditorEnterKey(e) {
            return _this2.callAddButtonAction(e.event);
          },
          customizeItem: function customizeItem(item) {
            if (item.itemType === 'simple') {
              item.editorOptions = (0, _extend.extend)(true, {}, item.editorOptions, {
                onInitialized: _this2._addEscapeHandler.bind(_this2)
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
          text: _message.default.format('OK'),
          onClick: function onClick(e) {
            return _this2.callAddButtonAction(e.event);
          }
        }
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          onInitialized: this._addEscapeHandler.bind(this),
          text: _message.default.format('Cancel'),
          onClick: function onClick() {
            _this2._popup.hide();
          }
        }
      }],
      _wrapperClassExternal: DIALOG_CLASS
    }, this._popupUserConfig);
  };
  _proto.onHiding = function onHiding() {
    this.beforeAddButtonAction = undefined;
    this.deferred.reject();
  };
  _proto.callAddButtonAction = function callAddButtonAction(event) {
    if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
      return;
    }
    this.hide(this._form.option('formData'), event);
  };
  _proto._renderForm = function _renderForm($container, options) {
    $container.addClass(FORM_CLASS);
    this._form = this._editorInstance._createComponent($container, _form.default, options);
    this._updateFormLabel();
  };
  _proto._updateFormLabel = function _updateFormLabel(text) {
    var _this$_form;
    var label = text !== null && text !== void 0 ? text : this.popupOption('title');
    (_this$_form = this._form) === null || _this$_form === void 0 ? void 0 : _this$_form.$element().attr('aria-label', label);
  };
  _proto._getDefaultFormOptions = function _getDefaultFormOptions() {
    return {
      colCount: 1,
      width: 'auto',
      labelLocation: (0, _themes.isMaterial)() ? 'top' : 'left'
    };
  };
  _proto.formOption = function formOption(optionName, optionValue) {
    return this._form.option.apply(this._form, arguments);
  };
  _proto.show = function show(formUserConfig) {
    if (this._popup.option('visible')) {
      return;
    }
    this.deferred = new _deferred.Deferred();
    var formConfig = (0, _extend.extend)(this._getDefaultFormOptions(), formUserConfig);
    this._form.option(formConfig);
    this._popup.show();
    return this.deferred.promise();
  };
  _proto.hide = function hide(formData, event) {
    this.deferred.resolve(formData, event);
    this._popup.hide();
  };
  _proto.popupOption = function popupOption(optionName, optionValue) {
    return this._popup.option.apply(this._popup, arguments);
  };
  return FormDialog;
}();
var _default = FormDialog;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
