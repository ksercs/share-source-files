/**
* DevExtreme (esm/__internal/grids/tree_list/m_virtual_scrolling.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import { extend } from '../../../core/utils/extend';
import gridCoreUtils from '../../grids/grid_core/m_utils';
import { data as virtualScrollingDataControllerExtender, dataSourceAdapterExtender as virtualScrollingDataSourceAdapterExtender, rowsView as virtualScrollingRowsViewExtender, virtualScrollingModule } from '../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import dataSourceAdapterProvider from './data_source_adapter/m_data_source_adapter';
import gridCore from './m_core';
const oldDefaultOptions = virtualScrollingModule.defaultOptions;
virtualScrollingModule.extenders.views.rowsView = Base => class TreeListVirtualScrollingRowsViewExtender extends virtualScrollingRowsViewExtender(Base) {
  _handleDataChanged(e) {
    const {
      operationTypes
    } = e;
    if (e !== null && e !== void 0 && e.isDataChanged && gridCoreUtils.isVirtualRowRendering(this) && operationTypes) {
      const {
        fullReload,
        pageIndex
      } = operationTypes;
      if (!fullReload && pageIndex) {
        this._updateContentPosition();
      }
    }
    super._handleDataChanged(e);
  }
};
virtualScrollingModule.extenders.controllers.data = Base => class TreeListVirtualScrollingDataControllerExtender extends virtualScrollingDataControllerExtender(Base) {
  _loadOnOptionChange() {
    var _this$_dataSource;
    const virtualScrollController = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource._virtualScrollController;
    virtualScrollController === null || virtualScrollController === void 0 || virtualScrollController.reset();
    // @ts-expect-error
    super._loadOnOptionChange();
  }
};
const dataSourceAdapterExtender = Base => class VirtualScrollingDataSourceAdapterExtender extends virtualScrollingDataSourceAdapterExtender(Base) {
  changeRowExpand() {
    return super.changeRowExpand.apply(this, arguments).done(() => {
      const viewportItemIndex = this.getViewportItemIndex();
      viewportItemIndex >= 0 && this.setViewportItemIndex(viewportItemIndex);
    });
  }
};
gridCore.registerModule('virtualScrolling', _extends({}, virtualScrollingModule, {
  defaultOptions() {
    return extend(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
dataSourceAdapterProvider.extend(dataSourceAdapterExtender);
