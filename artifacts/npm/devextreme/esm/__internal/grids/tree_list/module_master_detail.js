/**
* DevExtreme (esm/__internal/grids/tree_list/module_master_detail.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import { masterDetailModule } from '../../../ui/grid_core/ui.grid_core.master_detail';
import treeListCore from './module_core';
treeListCore.registerModule('masterDetail', extend(true, {}, masterDetailModule, {
  extenders: {
    controllers: {
      data: {
        isRowExpanded() {
          return this.callBase.apply(this, arguments);
        },
        _processItems() {
          return this.callBase.apply(this, arguments);
        },
        _processDataItem() {
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));
