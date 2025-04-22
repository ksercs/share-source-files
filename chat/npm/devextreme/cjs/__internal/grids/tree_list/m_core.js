/**
* DevExtreme (cjs/__internal/grids/tree_list/m_core.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extend = require("../../../core/utils/extend");
var _m_modules = _interopRequireDefault(require("../../grids/grid_core/m_modules"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _extend.extend)({}, _m_modules.default, {
  modules: [],
  foreachNodes(nodes, callBack, ignoreHasChildren) {
    for (let i = 0; i < nodes.length; i++) {
      if (callBack(nodes[i]) !== false && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
        this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren);
      }
    }
  }
});
