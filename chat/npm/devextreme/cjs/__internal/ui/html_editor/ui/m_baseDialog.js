/**
* DevExtreme (cjs/__internal/ui/html_editor/ui/m_baseDialog.js)
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
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _window = require("../../../../core/utils/window");
var _popup = _interopRequireDefault(require("../../../../ui/popup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
const isSmallScreen = () => {
  const screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)() : null;
  return _devices.default.real().deviceType === 'phone' || screenFactor === 'xs';
};
class BaseDialog {
  constructor($container, popupConfig) {
    this._$container = $container;
    this._popupUserConfig = popupConfig;
    this._renderPopup();
  }
  _renderPopup() {
    const $popupContainer = (0, _renderer.default)('<div>').addClass(this._getPopupClass()).appendTo(this._$container);
    this._popup = new _popup.default($popupContainer.get(0), this._getPopupConfig());
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
        this._renderContent((0, _renderer.default)(contentElem));
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
    this.deferred = (0, _deferred.Deferred)();
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
var _default = exports.default = BaseDialog;
