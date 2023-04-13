"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_grid_core_data_source_adapter_1 = __importDefault(require("../../../ui/grid_core/ui.grid_core.data_source_adapter"));
var dataSourceAdapterType = ui_grid_core_data_source_adapter_1.default;
exports.default = {
    extend: function (extender) {
        dataSourceAdapterType = dataSourceAdapterType.inherit(extender);
    },
    create: function (component) {
        // eslint-disable-next-line new-cap
        return new dataSourceAdapterType(component);
    },
};