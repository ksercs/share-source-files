"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowsView = void 0;
// @ts-expect-error
var ui_grid_core_rows_1 = require("../../../../ui/grid_core/ui.grid_core.rows");
var module_core_1 = __importDefault(require("../module_core"));
exports.RowsView = ui_grid_core_rows_1.rowsModule.views.rowsView;
module_core_1.default.registerModule('rows', ui_grid_core_rows_1.rowsModule);