/**
* DevExtreme (esm/__internal/grids/tree_list/m_virtual_scrolling.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import { virtualScrollingModule } from '../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import dataSourceAdapter from './data_source_adapter/m_data_source_adapter';
import gridCore from './m_core';
var oldDefaultOptions = virtualScrollingModule.defaultOptions;
var originalDataControllerExtender = virtualScrollingModule.extenders.controllers.data;
var originalDataSourceAdapterExtender = virtualScrollingModule.extenders.dataSourceAdapter;
virtualScrollingModule.extenders.controllers.data = extend({}, originalDataControllerExtender, {
  _loadOnOptionChange() {
    var virtualScrollController = this._dataSource && this._dataSource._virtualScrollController;
    virtualScrollController && virtualScrollController.reset();
    this.callBase();
  }
});
virtualScrollingModule.extenders.dataSourceAdapter = extend({}, originalDataSourceAdapterExtender, {
  changeRowExpand() {
    return this.callBase.apply(this, arguments).done(() => {
      var viewportItemIndex = this.getViewportItemIndex();
      viewportItemIndex >= 0 && this.setViewportItemIndex(viewportItemIndex);
    });
  }
});
gridCore.registerModule('virtualScrolling', extend({}, virtualScrollingModule, {
  defaultOptions() {
    return extend(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
dataSourceAdapter.extend(virtualScrollingModule.extenders.dataSourceAdapter);
