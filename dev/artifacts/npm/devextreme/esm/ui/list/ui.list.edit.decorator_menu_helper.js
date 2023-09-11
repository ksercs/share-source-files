/**
* DevExtreme (esm/ui/list/ui.list.edit.decorator_menu_helper.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var EditDecoratorMenuHelperMixin = {
  _menuEnabled: function _menuEnabled() {
    return !!this._menuItems().length;
  },
  _menuItems: function _menuItems() {
    return this._list.option('menuItems');
  },
  _deleteEnabled: function _deleteEnabled() {
    return this._list.option('allowItemDeleting');
  },
  _fireMenuAction: function _fireMenuAction($itemElement, action) {
    this._list._itemEventHandlerByHandler($itemElement, action, {}, {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
};
export default EditDecoratorMenuHelperMixin;
