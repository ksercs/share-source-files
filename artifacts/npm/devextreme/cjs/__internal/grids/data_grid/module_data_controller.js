/**
* DevExtreme (cjs/__internal/grids/data_grid/module_data_controller.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
var ui_errors_1 = __importDefault(require("../../../ui/widget/ui.errors"));
// @ts-expect-error
var ui_grid_core_data_controller_1 = require("../../../ui/grid_core/ui.grid_core.data_controller");
var module_core_1 = __importDefault(require("./module_core"));
var module_data_source_adapter_1 = __importDefault(require("./module_data_source_adapter"));
exports.DataController = ui_grid_core_data_controller_1.dataControllerModule.controllers.data.inherit((function () {
    return {
        _getDataSourceAdapter: function () {
            return module_data_source_adapter_1.default;
        },
        _getSpecificDataSourceOption: function () {
            var dataSource = this.option('dataSource');
            if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
                ui_errors_1.default.log('W1011');
            }
            return this.callBase();
        },
    };
})());
module_core_1.default.registerModule('data', {
    defaultOptions: ui_grid_core_data_controller_1.dataControllerModule.defaultOptions,
    controllers: {
        data: exports.DataController,
    },
});
