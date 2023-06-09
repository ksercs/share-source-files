"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupFilter = void 0;
var ui_grid_core_utils_1 = __importDefault(require("../../../ui/grid_core/ui.grid_core.utils"));
// @ts-expect-error
var utils_1 = require("../../../data/utils");
function createGroupFilter(path, storeLoadOptions) {
    var groups = utils_1.normalizeSortingInfo(storeLoadOptions.group);
    var filter = [];
    for (var i = 0; i < path.length; i++) {
        filter.push([groups[i].selector, '=', path[i]]);
    }
    if (storeLoadOptions.filter) {
        filter.push(storeLoadOptions.filter);
    }
    return ui_grid_core_utils_1.default.combineFilters(filter);
}
exports.createGroupFilter = createGroupFilter;