/**
* DevExtreme (esm/__internal/grids/data_grid/module_data_source_adapter.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSourceAdapter from '../../../ui/grid_core/ui.grid_core.data_source_adapter';
let dataSourceAdapterType = DataSourceAdapter;
export default {
    extend(extender) {
        dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
    },
    create(component) {
        // eslint-disable-next-line new-cap
        return new dataSourceAdapterType(component);
    },
};
