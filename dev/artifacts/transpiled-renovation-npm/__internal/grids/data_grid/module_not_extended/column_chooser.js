"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnChooserView = exports.ColumnChooserController = void 0;
// @ts-expect-error
var ui_grid_core_column_chooser_1 = require("../../../../ui/grid_core/ui.grid_core.column_chooser");
var module_core_1 = __importDefault(require("../module_core"));
exports.ColumnChooserController = ui_grid_core_column_chooser_1.columnChooserModule.controllers.columnChooser;
exports.ColumnChooserView = ui_grid_core_column_chooser_1.columnChooserModule.views.columnChooserView;
module_core_1.default.registerModule('columnChooser', ui_grid_core_column_chooser_1.columnChooserModule);