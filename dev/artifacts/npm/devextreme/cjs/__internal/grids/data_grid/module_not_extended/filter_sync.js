/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/filter_sync.js)
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
var ui_grid_core_filter_sync_1 = require("../../../../ui/grid_core/ui.grid_core.filter_sync");
var module_core_1 = __importDefault(require("../module_core"));
module_core_1.default.registerModule('filterSync', ui_grid_core_filter_sync_1.filterSyncModule);
