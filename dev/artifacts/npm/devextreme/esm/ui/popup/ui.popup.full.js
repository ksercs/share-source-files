/**
* DevExtreme (esm/ui/popup/ui.popup.full.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../toolbar';
import Popup from '../popup/ui.popup';
import registerComponent from '../../core/component_registrator';
import { extend } from '../../core/utils/extend';
export default class PopupFull extends Popup {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      preventScrollEvents: false
    });
  }
  _getToolbarName() {
    return 'dxToolbar';
  }
}
PopupFull.defaultOptions = function (rule) {
  Popup.defaultOptions(rule);
};
registerComponent('dxPopup', PopupFull);
