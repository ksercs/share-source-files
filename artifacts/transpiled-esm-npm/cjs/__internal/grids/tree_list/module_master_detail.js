"use strict";

var _extend = require("../../../core/utils/extend");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.master_detail");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_module_core.default.registerModule('masterDetail', (0, _extend.extend)(true, {}, _uiGrid_core.masterDetailModule, {
  extenders: {
    controllers: {
      data: {
        isRowExpanded: function isRowExpanded() {
          return this.callBase.apply(this, arguments);
        },
        _processItems: function _processItems() {
          return this.callBase.apply(this, arguments);
        },
        _processDataItem: function _processDataItem() {
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));