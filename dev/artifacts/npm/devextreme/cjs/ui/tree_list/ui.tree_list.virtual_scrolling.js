/**
* DevExtreme (cjs/ui/tree_list/ui.tree_list.virtual_scrolling.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _uiTree_list2 = _interopRequireDefault(require("./ui.tree_list.data_source_adapter"));
var _uiGrid_core = require("../grid_core/ui.grid_core.virtual_scrolling");
var _extend = require("../../core/utils/extend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var oldDefaultOptions = _uiGrid_core.virtualScrollingModule.defaultOptions;
var originalDataControllerExtender = _uiGrid_core.virtualScrollingModule.extenders.controllers.data;
var originalDataSourceAdapterExtender = _uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter;
_uiGrid_core.virtualScrollingModule.extenders.controllers.data = (0, _extend.extend)({}, originalDataControllerExtender, {
  _loadOnOptionChange: function _loadOnOptionChange() {
    var virtualScrollController = this._dataSource && this._dataSource._virtualScrollController;
    virtualScrollController && virtualScrollController.reset();
    this.callBase();
  }
});
_uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter = (0, _extend.extend)({}, originalDataSourceAdapterExtender, {
  changeRowExpand: function changeRowExpand() {
    var _this = this;
    return this.callBase.apply(this, arguments).done(function () {
      var viewportItemIndex = _this.getViewportItemIndex();
      viewportItemIndex >= 0 && _this.setViewportItemIndex(viewportItemIndex);
    });
  }
});
_uiTree_list.default.registerModule('virtualScrolling', (0, _extend.extend)({}, _uiGrid_core.virtualScrollingModule, {
  defaultOptions: function defaultOptions() {
    return (0, _extend.extend)(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
_uiTree_list2.default.extend(_uiGrid_core.virtualScrollingModule.extenders.dataSourceAdapter);
