"use strict";

var _m_state_storing = require("../../grids/grid_core/state_storing/m_state_storing");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // eslint-disable-next-line max-classes-per-file
const stateStoring = Base => class TreeListStateStoringExtender extends _m_state_storing.stateStoringModule.extenders.controllers.stateStoring(Base) {
  applyState(state) {
    super.applyState(state);
    this.option('expandedRowKeys', state.expandedRowKeys ? state.expandedRowKeys.slice() : []);
  }
};
const data = Base => class TreeListStateStoringDataExtender extends _m_state_storing.stateStoringModule.extenders.controllers.data(Base) {
  getUserState() {
    const state = super.getUserState();
    if (!this.option('autoExpandAll')) {
      state.expandedRowKeys = this.option('expandedRowKeys');
    }
    return state;
  }
};
_m_core.default.registerModule('stateStoring', _extends({}, _m_state_storing.stateStoringModule, {
  extenders: _extends({}, _m_state_storing.stateStoringModule.extenders, {
    controllers: _extends({}, _m_state_storing.stateStoringModule.extenders.controllers, {
      stateStoring,
      data
    })
  })
}));