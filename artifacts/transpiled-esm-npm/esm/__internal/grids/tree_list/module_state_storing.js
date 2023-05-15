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