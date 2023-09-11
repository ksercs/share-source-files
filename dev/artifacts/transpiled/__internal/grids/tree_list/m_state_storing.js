"use strict";

var _extend = require("../../../core/utils/extend");
var _m_state_storing = require("../../grids/grid_core/state_storing/m_state_storing");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var origApplyState = _m_state_storing.stateStoringModule.extenders.controllers.stateStoring.applyState;
_m_core.default.registerModule('stateStoring', (0, _extend.extend)(true, {}, _m_state_storing.stateStoringModule, {
  extenders: {
    controllers: {
      stateStoring: {
        applyState(state) {
          origApplyState.apply(this, arguments);
          this.option('expandedRowKeys', state.expandedRowKeys ? state.expandedRowKeys.slice() : []);
        }
      },
      data: {
        getUserState() {
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