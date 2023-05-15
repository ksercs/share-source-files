"use strict";

require("./module_not_extended/editor_factory");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.editing");
var _extend = require("../../../core/utils/extend");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_module_core.default.registerModule('editing', (0, _extend.extend)(true, {}, _uiGrid_core.editingModule, {
  extenders: {
    controllers: {
      data: {
        _changeRowExpandCore: function _changeRowExpandCore(key) {
          var editingController = this._editingController;
          if (Array.isArray(key)) {
            editingController && editingController.refresh();
          }
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));