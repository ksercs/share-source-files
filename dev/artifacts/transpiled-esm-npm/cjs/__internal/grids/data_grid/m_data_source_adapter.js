"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _m_data_source_adapter = _interopRequireDefault(require("../../grids/grid_core/data_source_adapter/m_data_source_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var dataSourceAdapterType = _m_data_source_adapter.default;
var _default = {
  extend(extender) {
    dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
  },
  create(component) {
    // eslint-disable-next-line new-cap
    return new dataSourceAdapterType(component);
  }
};
exports.default = _default;