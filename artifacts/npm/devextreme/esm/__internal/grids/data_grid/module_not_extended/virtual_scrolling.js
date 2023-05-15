/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/virtual_scrolling.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { virtualScrollingModule } from '../../../../ui/grid_core/ui.grid_core.virtual_scrolling';
import gridCore from '../module_core';
import dataSourceAdapter from '../module_data_source_adapter';
gridCore.registerModule('virtualScrolling', virtualScrollingModule);
dataSourceAdapter.extend(virtualScrollingModule.extenders.dataSourceAdapter);
