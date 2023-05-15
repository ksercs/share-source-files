var _a;
import errors from '../../../ui/widget/ui.errors';
import { dataControllerModule } from '../../../ui/grid_core/ui.grid_core.data_controller';
import gridCore from './module_core';
import dataSourceAdapterProvider from './module_data_source_adapter';
export var DataController = ((_a = dataControllerModule.controllers) === null || _a === void 0 ? void 0 : _a.data).inherit(function () {
  return {
    _getDataSourceAdapter() {
      return dataSourceAdapterProvider;
    },
    _getSpecificDataSourceOption() {
      var dataSource = this.option('dataSource');
      if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
        errors.log('W1011');
      }
      return this.callBase();
    }
  };
}());
gridCore.registerModule('data', {
  defaultOptions: dataControllerModule.defaultOptions,
  controllers: {
    data: DataController
  }
});