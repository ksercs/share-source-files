/**
* DevExtreme (esm/__internal/grids/tree_list/module_state_storing.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import { stateStoringModule } from '../../../ui/grid_core/ui.grid_core.state_storing';
import treeListCore from './module_core';
var origApplyState = stateStoringModule.extenders.controllers.stateStoring.applyState;
treeListCore.registerModule('stateStoring', extend(true, {}, stateStoringModule, {
  extenders: {
    controllers: {
      stateStoring: {
        applyState(state) {
          origApplyState.apply(this, arguments);
          this.option('expandedRowKeys', state.expandedRowKeys ? state.expandedRowKeys.slice() : []);
        }
      },
      data: {
        getUserState() {
          var state = this.callBase.apply(this, arguments);
          if (!this.option('autoExpandAll')) {
            state.expandedRowKeys = this.option('expandedRowKeys');
          }
          return state;
        }
      }
    }
  }
}));
