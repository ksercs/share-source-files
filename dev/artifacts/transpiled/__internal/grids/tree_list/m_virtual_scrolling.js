"use strict";

var _extend = require("../../../core/utils/extend");
var _m_virtual_scrolling = require("../../grids/grid_core/virtual_scrolling/m_virtual_scrolling");
var _m_data_source_adapter = _interopRequireDefault(require("./data_source_adapter/m_data_source_adapter"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var oldDefaultOptions = _m_virtual_scrolling.virtualScrollingModule.defaultOptions;
var originalDataControllerExtender = _m_virtual_scrolling.virtualScrollingModule.extenders.controllers.data;
var originalDataSourceAdapterExtender = _m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter;
_m_virtual_scrolling.virtualScrollingModule.extenders.controllers.data = (0, _extend.extend)({}, originalDataControllerExtender, {
  _loadOnOptionChange() {
    var virtualScrollController = this._dataSource && this._dataSource._virtualScrollController;
    virtualScrollController && virtualScrollController.reset();
    this.callBase();
  }
});
_m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter = (0, _extend.extend)({}, originalDataSourceAdapterExtender, {
  changeRowExpand() {
    var _this = this;
    return this.callBase.apply(this, arguments).done(function () {
      var viewportItemIndex = _this.getViewportItemIndex();
      viewportItemIndex >= 0 && _this.setViewportItemIndex(viewportItemIndex);
    });
  }
});
_m_core.default.registerModule('virtualScrolling', (0, _extend.extend)({}, _m_virtual_scrolling.virtualScrollingModule, {
  defaultOptions() {
    return (0, _extend.extend)(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
_m_data_source_adapter.default.extend(_m_virtual_scrolling.virtualScrollingModule.extenders.dataSourceAdapter);