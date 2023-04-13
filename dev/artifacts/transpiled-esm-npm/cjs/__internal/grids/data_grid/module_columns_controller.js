"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
var ui_grid_core_columns_controller_1 = require("../../../ui/grid_core/ui.grid_core.columns_controller");
var extend_1 = require("../../../core/utils/extend");
var module_core_1 = __importDefault(require("./module_core"));
module_core_1.default.registerModule('columns', {
    defaultOptions: function () {
        return extend_1.extend(true, {}, ui_grid_core_columns_controller_1.columnsControllerModule.defaultOptions(), {
            commonColumnSettings: {
                allowExporting: true,
            },
        });
    },
    controllers: ui_grid_core_columns_controller_1.columnsControllerModule.controllers,
});