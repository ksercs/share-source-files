"use strict";

var _extend = require("../../../core/utils/extend");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.state_storing");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var origApplyState = _uiGrid_core.stateStoringModule.extenders.controllers.stateStoring.applyState;
_module_core.default.registerModule('stateStoring', (0, _extend.extend)(true, {}, _uiGrid_core.stateStoringModule, {
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