"use strict";

var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _extend = require("../../core/utils/extend");
var _uiGrid_core = require("../grid_core/ui.grid_core.state_storing");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var origApplyState = _uiGrid_core.stateStoringModule.extenders.controllers.stateStoring.applyState;
_uiTree_list.default.registerModule('stateStoring', (0, _extend.extend)(true, {}, _uiGrid_core.stateStoringModule, {
  extenders: {
    controllers: {
      stateStoring: {
        applyState: function applyState(state) {
          origApplyState.apply(this, arguments);
          this.option('expandedRowKeys', state.expandedRowKeys ? state.expandedRowKeys.slice() : []);
        }
      },
      data: {
        getUserState: function getUserState() {
          var state = this.callBase.apply(this, arguments);
          if (!this.option('autoExpandAll')) {
            state.expandedRowKeys = this.option('expandedRowKeys');
          }
          return state;
        }
      }
    }
  }
}));