/**
* DevExtreme (bundles/__internal/grids/tree_list/m_master_detail.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_master_detail = require("../../grids/grid_core/master_detail/m_master_detail");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_m_core.default.registerModule('masterDetail', (0, _extend.extend)(true, {}, _m_master_detail.masterDetailModule, {
  extenders: {
    controllers: {
      data: {
        isRowExpanded() {
          return this.callBase.apply(this, arguments);
        },
        _processItems() {
          return this.callBase.apply(this, arguments);
        },
        _processDataItem() {
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));
