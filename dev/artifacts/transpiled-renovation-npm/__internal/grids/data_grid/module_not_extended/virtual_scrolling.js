"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_grid_core_virtual_scrolling_1 = require("../../../../ui/grid_core/ui.grid_core.virtual_scrolling");
var module_core_1 = __importDefault(require("../module_core"));
var module_data_source_adapter_1 = __importDefault(require("../module_data_source_adapter"));
module_core_1.default.registerModule('virtualScrolling', ui_grid_core_virtual_scrolling_1.virtualScrollingModule);
module_data_source_adapter_1.default.extend(ui_grid_core_virtual_scrolling_1.virtualScrollingModule.extenders.dataSourceAdapter);