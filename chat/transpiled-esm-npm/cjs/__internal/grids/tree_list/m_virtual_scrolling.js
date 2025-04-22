"use strict";

var _extend = require("../../../core/utils/extend");
var _m_utils = _interopRequireDefault(require("../../grids/grid_core/m_utils"));
var _m_virtual_scrolling = require("../../grids/grid_core/virtual_scrolling/m_virtual_scrolling");
var _m_data_source_adapter = _interopRequireDefault(require("./data_source_adapter/m_data_source_adapter"));
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */
const oldDefaultOptions = _m_virtual_scrolling.virtualScrollingModule.defaultOptions;
_m_virtual_scrolling.virtualScrollingModule.extenders.views.rowsView = Base => class TreeListVirtualScrollingRowsViewExtender extends (0, _m_virtual_scrolling.rowsView)(Base) {
  _handleDataChanged(e) {
    const {
      operationTypes
    } = e;
    if (e !== null && e !== void 0 && e.isDataChanged && _m_utils.default.isVirtualRowRendering(this) && operationTypes) {
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
_m_virtual_scrolling.virtualScrollingModule.extenders.controllers.data = Base => class TreeListVirtualScrollingDataControllerExtender extends (0, _m_virtual_scrolling.data)(Base) {
  _loadOnOptionChange() {
    var _this$_dataSource;
    const virtualScrollController = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource._virtualScrollController;
    virtualScrollController === null || virtualScrollController === void 0 || virtualScrollController.reset();
    // @ts-expect-error
    super._loadOnOptionChange();
  }
};
const dataSourceAdapterExtender = Base => class VirtualScrollingDataSourceAdapterExtender extends (0, _m_virtual_scrolling.dataSourceAdapterExtender)(Base) {
  changeRowExpand() {
    return super.changeRowExpand.apply(this, arguments).done(() => {
      const viewportItemIndex = this.getViewportItemIndex();
      viewportItemIndex >= 0 && this.setViewportItemIndex(viewportItemIndex);
    });
  }
};
_m_core.default.registerModule('virtualScrolling', _extends({}, _m_virtual_scrolling.virtualScrollingModule, {
  defaultOptions() {
    return (0, _extend.extend)(true, oldDefaultOptions(), {
      scrolling: {
        mode: 'virtual'
      }
    });
  }
}));
_m_data_source_adapter.default.extend(dataSourceAdapterExtender);