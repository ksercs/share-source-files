import DataSourceAdapter from '../../grids/grid_core/data_source_adapter/m_data_source_adapter';
let DataSourceAdapterType = DataSourceAdapter;
export default {
  extend(extender) {
    DataSourceAdapterType = extender(DataSourceAdapterType);
  },
  create(component) {
    return new DataSourceAdapterType(component);
  }
};