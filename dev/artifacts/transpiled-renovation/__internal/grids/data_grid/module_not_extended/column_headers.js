"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnHeadersView = void 0;
// @ts-expect-error
var ui_grid_core_column_headers_1 = require("../../../../ui/grid_core/ui.grid_core.column_headers");
var module_core_1 = __importDefault(require("../module_core"));
exports.ColumnHeadersView = ui_grid_core_column_headers_1.columnHeadersModule.views.columnHeadersView;
module_core_1.default.registerModule('columnHeaders', ui_grid_core_column_headers_1.columnHeadersModule);