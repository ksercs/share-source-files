"use strict";

var _extend = require("../../../core/utils/extend");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.validating");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EditingControllerExtender = (0, _extend.extend)({}, _uiGrid_core.validatingModule.extenders.controllers.editing);
delete EditingControllerExtender.processItems;
delete EditingControllerExtender.processDataItem;
_module_core.default.registerModule('validating', {
  defaultOptions: _uiGrid_core.validatingModule.defaultOptions,
  controllers: _uiGrid_core.validatingModule.controllers,
  extenders: {
    controllers: {
      editing: EditingControllerExtender,
      editorFactory: _uiGrid_core.validatingModule.extenders.controllers.editorFactory
    },
    views: _uiGrid_core.validatingModule.extenders.views
  }
});