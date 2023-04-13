/**
* DevExtreme (esm/ui/tree_list/ui.tree_list.master_detail.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import treeListCore from './ui.tree_list.core';
import { masterDetailModule } from '../grid_core/ui.grid_core.master_detail';
import { extend } from '../../core/utils/extend';
treeListCore.registerModule('masterDetail', extend(true, {}, masterDetailModule, {
  extenders: {
    controllers: {
      data: {
        isRowExpanded: function isRowExpanded() {
          return this.callBase.apply(this, arguments);
        },
        _processItems: function _processItems() {
          return this.callBase.apply(this, arguments);
        },
        _processDataItem: function _processDataItem() {
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));
