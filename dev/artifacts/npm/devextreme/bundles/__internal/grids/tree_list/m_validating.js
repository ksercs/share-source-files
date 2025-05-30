/**
* DevExtreme (bundles/__internal/grids/tree_list/m_validating.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_validating = require("../../grids/grid_core/validating/m_validating");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EditingControllerExtender = (0, _extend.extend)({}, _m_validating.validatingModule.extenders.controllers.editing);
delete EditingControllerExtender.processItems;
delete EditingControllerExtender.processDataItem;
_m_core.default.registerModule('validating', {
  defaultOptions: _m_validating.validatingModule.defaultOptions,
  controllers: _m_validating.validatingModule.controllers,
  extenders: {
    controllers: {
      editing: EditingControllerExtender,
      editorFactory: _m_validating.validatingModule.extenders.controllers.editorFactory
    },
    views: _m_validating.validatingModule.extenders.views
  }
});
