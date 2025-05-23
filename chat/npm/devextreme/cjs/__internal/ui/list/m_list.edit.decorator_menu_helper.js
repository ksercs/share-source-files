/**
* DevExtreme (cjs/__internal/ui/list/m_list.edit.decorator_menu_helper.js)
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
const EditDecoratorMenuHelperMixin = {
  _menuEnabled() {
    return !!this._menuItems().length;
  },
  _menuItems() {
    return this._list.option('menuItems');
  },
  _deleteEnabled() {
    return this._list.option('allowItemDeleting');
  },
  _fireMenuAction($itemElement, action) {
    this._list._itemEventHandlerByHandler($itemElement, action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
};
var _default = exports.default = EditDecoratorMenuHelperMixin;
