/**
* DevExtreme (esm/__internal/grids/data_grid/m_data_controller.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var _a, _b;
import errors from '../../../ui/widget/ui.errors';
import { dataControllerModule } from '../../grids/grid_core/data_controller/m_data_controller';
import gridCore from './m_core';
import dataSourceAdapterProvider from './m_data_source_adapter';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export var DataController = (_b = (_a = dataControllerModule.controllers) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.inherit(function () {
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
