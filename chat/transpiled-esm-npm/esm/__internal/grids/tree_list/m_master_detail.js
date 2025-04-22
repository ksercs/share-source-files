import { extend } from '../../../core/utils/extend';
import { dataMasterDetailExtenderMixin, masterDetailModule } from '../../grids/grid_core/master_detail/m_master_detail';
import treeListCore from './m_core';
const data = Base => class DataMasterDetailTreeListExtender extends dataMasterDetailExtenderMixin(Base) {
  isRowExpanded() {
    // @ts-expect-error
    return this.isRowExpandedHack.apply(this, arguments);
  }
  _processItems() {
    // @ts-expect-error
    return this._processItemsHack.apply(this, arguments);
  }
  _processDataItem() {
    // @ts-expect-error
    return this._processDataItemHack.apply(this, arguments);
  }
};
treeListCore.registerModule('masterDetail', extend(true, {}, masterDetailModule, {
  extenders: {
    controllers: {
      data
    }
  }
}));