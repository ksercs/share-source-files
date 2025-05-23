/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/virtual_scrolling.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { virtualScrollingModule } from '../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import gridCore from '../m_core';
import dataSourceAdapter from '../m_data_source_adapter';
gridCore.registerModule('virtualScrolling', virtualScrollingModule);
dataSourceAdapter.extend(virtualScrollingModule.extenders.dataSourceAdapter);
