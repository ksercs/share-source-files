"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ui_grid_core_master_detail_1 = require("../../../../ui/grid_core/ui.grid_core.master_detail");
var module_core_1 = __importDefault(require("../module_core"));
module_core_1.default.registerModule('masterDetail', ui_grid_core_master_detail_1.masterDetailModule);