"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
var ui_grid_core_grid_view_1 = require("../../../../ui/grid_core/ui.grid_core.grid_view");
var module_core_1 = __importDefault(require("../module_core"));
module_core_1.default.registerModule('gridView', ui_grid_core_grid_view_1.gridViewModule);