import { extend } from '../../../core/utils/extend';
import { masterDetailModule } from '../../grids/grid_core/master_detail/m_master_detail';
import treeListCore from './m_core';
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