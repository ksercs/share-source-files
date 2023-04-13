/**
* DevExtreme (bundles/__internal/grids/grid_core/row_dragging/dom.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridCoreRowDraggingDom = void 0;
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var renderer_1 = __importDefault(require("../../../../core/renderer"));
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
var module_utils_1 = __importDefault(require("../module_utils"));
var const_1 = require("./const");
var createHandleTemplateFunc = function (addWidgetPrefix) { return function (container, options) {
    var $container = renderer_1.default(container);
    $container.attr(const_1.ATTRIBUTES.dragCell, '');
    if (options.rowType === 'data') {
        $container.addClass(const_1.CLASSES.cellFocusDisabled);
        return renderer_1.default('<span>').addClass(addWidgetPrefix(const_1.CLASSES.handleIcon));
    }
    module_utils_1.default.setEmptyText($container);
    return undefined;
}; };
exports.GridCoreRowDraggingDom = {
    createHandleTemplateFunc: createHandleTemplateFunc,
};
