/**
* DevExtreme (cjs/__internal/grids/data_grid/module_widget.js)
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
var module_widget_base_1 = __importDefault(require("./module_widget_base"));
require("./module_not_extended/state_storing");
require("./module_not_extended/selection");
require("./module_not_extended/column_chooser");
require("./grouping/module");
require("./module_not_extended/master_detail");
require("./module_editing");
require("./module_not_extended/editing_row_based");
require("./module_not_extended/editing_form_based");
require("./module_not_extended/editing_cell_based");
require("./module_not_extended/validating");
require("./module_not_extended/virtual_scrolling");
require("./module_not_extended/filter_row");
require("./module_not_extended/header_filter");
require("./module_not_extended/filter_sync");
require("./module_not_extended/filter_builder");
require("./module_not_extended/filter_panel");
require("./module_not_extended/search");
require("./module_not_extended/pager");
require("./module_not_extended/columns_resizing_reordering");
require("./module_not_extended/keyboard_navigation");
require("./summary/module");
require("./module_not_extended/column_fixing");
require("./module_not_extended/adaptivity");
require("./module_not_extended/virtual_columns");
require("./export/module");
require("./focus/module");
require("./module_not_extended/row_dragging");
exports.default = module_widget_base_1.default;
