/**
* DevExtreme (cjs/__internal/grids/grid_core/row_dragging/dom.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreRowDraggingDom = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-restricted-imports,
// eslint-disable-next-line forbidden-imports/no-restricted-imports
var createHandleTemplateFunc = function createHandleTemplateFunc(addWidgetPrefix) {
  return function (container, options) {
    var $container = (0, _renderer.default)(container);
    if (options.rowType === 'data') {
      $container.addClass(_const.CLASSES.cellFocusDisabled);
      return (0, _renderer.default)('<span>').addClass(addWidgetPrefix(_const.CLASSES.handleIcon));
    }
    _m_utils.default.setEmptyText($container);
    return undefined;
  };
};
var GridCoreRowDraggingDom = {
  createHandleTemplateFunc
};
exports.GridCoreRowDraggingDom = GridCoreRowDraggingDom;
