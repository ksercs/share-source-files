/**
* DevExtreme (bundles/__internal/grids/data_grid/m_editing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

require("./module_not_extended/editor_factory");
var _extend = require("../../../core/utils/extend");
var _m_editing = require("../../grids/grid_core/editing/m_editing");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_m_core.default.registerModule('editing', (0, _extend.extend)(true, {}, _m_editing.editingModule, {
  extenders: {
    controllers: {
      data: {
        _changeRowExpandCore(key) {
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
