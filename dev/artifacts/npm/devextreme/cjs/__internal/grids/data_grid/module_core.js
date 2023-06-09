/**
* DevExtreme (cjs/__internal/grids/data_grid/module_core.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_grid_core_utils_1 = __importDefault(require("../../../ui/grid_core/ui.grid_core.utils"));
var ui_grid_core_modules_1 = __importDefault(require("../../../ui/grid_core/ui.grid_core.modules"));
exports.default = __assign(__assign(__assign({}, ui_grid_core_modules_1.default), ui_grid_core_utils_1.default), { modules: [] });
