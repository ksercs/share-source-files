/**
* DevExtreme (esm/ui/tree_list/ui.tree_list.keyboard_navigation.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import core from './ui.tree_list.core';
import { keyboardNavigationModule } from '../grid_core/ui.grid_core.keyboard_navigation';
import { extend } from '../../core/utils/extend';
core.registerModule('keyboardNavigation', extend(true, {}, keyboardNavigationModule, {
  extenders: {
    controllers: {
      keyboardNavigation: {
        _leftRightKeysHandler: function _leftRightKeysHandler(eventArgs, isEditing) {
          var rowIndex = this.getVisibleRowIndex();
          var dataController = this._dataController;
          if (eventArgs.ctrl) {
            var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
            var key = dataController.getKeyByRowIndex(rowIndex);
            if (directionCode === 'nextInRow') {
              dataController.expandRow(key);
            } else {
              dataController.collapseRow(key);
            }
          } else {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
}));
