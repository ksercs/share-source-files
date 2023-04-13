"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_grid_core_editing_cell_based_1 = __importDefault(require("../../../../ui/grid_core/ui.grid_core.editing_cell_based"));
var module_core_1 = __importDefault(require("../module_core"));
module_core_1.default.registerModule('editingCellBased', ui_grid_core_editing_cell_based_1.default);