/**
* DevExtreme (bundles/__internal/grids/pivot_grid/field_chooser/dom.js)
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
exports.dragAndDropItemRender = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var size_1 = require("../../../../core/utils/size");
var const_1 = require("./const");
// === Drag-N-Drop item render ===
function getTreeViewItem($sourceItem) {
    return $sourceItem
        .clone()
        .addClass(const_1.CLASSES.area.box)
        .css('width', parseFloat(size_1.getOuterWidth($sourceItem)));
}
function getAreaBoxItemArray($sourceItem, target) {
    var $itemArray = $sourceItem.clone();
    if (target === const_1.SORTABLE_CONST.targets.drag) {
        $sourceItem.each(function (idx, sourceItem) {
            var width = parseFloat(size_1.getOuterWidth(sourceItem));
            $itemArray.eq(idx).css('width', width);
            return true;
        });
    }
    return $itemArray;
}
function getDefaultItem($sourceItem) {
    return renderer_1.default('<div>')
        .addClass(const_1.CLASSES.area.field)
        .addClass(const_1.CLASSES.area.box)
        .text($sourceItem.text());
}
function getItemArray($sourceItem, target) {
    var isAreaBox = $sourceItem.hasClass(const_1.CLASSES.area.box);
    var isTreeList = $sourceItem.attr(const_1.ATTRIBUTES.treeViewItem);
    if (isAreaBox) {
        return getAreaBoxItemArray($sourceItem, target);
    }
    if (isTreeList) {
        return getTreeViewItem($sourceItem);
    }
    return getDefaultItem($sourceItem);
}
function wrapItemsInFieldsContainer($itemArray) {
    var $wrappedTmpContainer = renderer_1.default('<div>');
    $itemArray.each(function (_, item) {
        var $wrappedItem = renderer_1.default('<div>')
            .addClass(const_1.CLASSES.pivotGrid.fieldsContainer)
            .addClass(const_1.CLASSES.widget)
            .append(renderer_1.default(item));
        $wrappedTmpContainer.append($wrappedItem);
        return true;
    });
    return $wrappedTmpContainer.children();
}
function dragAndDropItemRender($sourceItem, target) {
    var $itemArray = getItemArray($sourceItem, target);
    if (target === const_1.SORTABLE_CONST.targets.drag) {
        return wrapItemsInFieldsContainer($itemArray);
    }
    return $itemArray;
}
exports.dragAndDropItemRender = dragAndDropItemRender;
