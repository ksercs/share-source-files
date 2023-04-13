/**
* DevExtreme (esm/__internal/grids/data_grid/module_data_controller.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import errors from '../../../ui/widget/ui.errors';
// @ts-expect-error
import { dataControllerModule } from '../../../ui/grid_core/ui.grid_core.data_controller';
import gridCore from './module_core';
import dataSourceAdapterProvider from './module_data_source_adapter';
export const DataController = dataControllerModule.controllers.data.inherit((function () {
    return {
        _getDataSourceAdapter() {
            return dataSourceAdapterProvider;
        },
        _getSpecificDataSourceOption() {
            const dataSource = this.option('dataSource');
            if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
                errors.log('W1011');
            }
            return this.callBase();
        },
    };
})());
gridCore.registerModule('data', {
    defaultOptions: dataControllerModule.defaultOptions,
    controllers: {
        data: DataController,
    },
});
