"use strict";

require("./module_not_extended/editor_factory");
var _m_editing = require("../../grids/grid_core/editing/m_editing");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const data = Base => class DataEditingDataGridExtender extends (0, _m_editing.dataControllerEditingExtenderMixin)(Base) {
  _changeRowExpandCore(key) {
    const editingController = this._editingController;
    if (Array.isArray(key)) {
      editingController && editingController.refresh();
    }
    // @ts-expect-error
    return super._changeRowExpandCore.apply(this, arguments);
  }
};
_m_core.default.registerModule('editing', _extends({}, _m_editing.editingModule, {
  extenders: _extends({}, _m_editing.editingModule.extenders, {
    controllers: _extends({}, _m_editing.editingModule.extenders.controllers, {
      data
    })
  })
}));