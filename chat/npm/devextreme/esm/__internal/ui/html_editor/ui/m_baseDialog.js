/**
* DevExtreme (esm/__internal/ui/html_editor/ui/m_baseDialog.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import devices from '../../../../core/devices';
import $ from '../../../../core/renderer';
import { Deferred } from '../../../../core/utils/deferred';
import {
// @ts-expect-error
getCurrentScreenFactor, hasWindow } from '../../../../core/utils/window';
import Popup from '../../../../ui/popup';
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
const isSmallScreen = () => {
  const screenFactor = hasWindow() ? getCurrentScreenFactor() : null;
  return devices.real().deviceType === 'phone' || screenFactor === 'xs';
};
class BaseDialog {
  constructor($container, popupConfig) {
    this._$container = $container;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
  }
  _renderPopup() {
    const $popupContainer = $('<div>').addClass(this._getPopupClass()).appendTo(this._$container);
    this._popup = new Popup($popupContainer.get(0), this._getPopupConfig());
  }
  _getPopupConfig() {
    return {
      onInitialized: e => {
        this._popup = e.component;
        this._popup.on('hiding', () => this.onHiding());
      },
      deferRendering: false,
      focusStateEnabled: false,
      fullScreen: isSmallScreen(),
      _wrapperClassExternal: `${this._getPopupClass()} ${DROPDOWN_EDITOR_OVERLAY_CLASS}`,
      contentTemplate: contentElem => {
        this._renderContent($(contentElem));
      }
    };
  }
  onHiding() {
    var _this$deferred;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.reject();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  show(options) {
    if (this._popup.option('visible')) {
      return;
    }
    this.deferred = Deferred();
    this._popup.show();
    return this.deferred.promise();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hide(_options, _event) {
    this._popup.hide();
  }
  popupOption() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error
    return this._popup.option.apply(this._popup, args);
  }
}
export default BaseDialog;
