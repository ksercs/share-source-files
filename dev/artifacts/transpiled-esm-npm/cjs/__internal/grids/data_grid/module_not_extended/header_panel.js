"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderPanel = void 0;
// @ts-expect-error
var ui_grid_core_header_panel_1 = require("../../../../ui/grid_core/ui.grid_core.header_panel");
var module_core_1 = __importDefault(require("../module_core"));
exports.HeaderPanel = ui_grid_core_header_panel_1.headerPanelModule.views.headerPanel;
module_core_1.default.registerModule('headerPanel', ui_grid_core_header_panel_1.headerPanelModule);