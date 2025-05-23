/**
* DevExtreme (cjs/__internal/grids/pivot_grid/field_chooser/dom.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAndDropItemRender = dragAndDropItemRender;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _size = require("../../../../core/utils/size");
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// === Drag-N-Drop item render ===
function getTreeViewItem($sourceItem) {
  return $sourceItem.clone().addClass(_const.CLASSES.area.box).css('width', parseFloat((0, _size.getOuterWidth)($sourceItem)));
}
function getAreaBoxItemArray($sourceItem, target) {
  var $itemArray = $sourceItem.clone();
  if (target === _const.SORTABLE_CONST.targets.drag) {
    $sourceItem.each(function (idx, sourceItem) {
      var width = parseFloat((0, _size.getOuterWidth)(sourceItem));
      $itemArray.eq(idx).css('width', width);
      return true;
    });
  }
  return $itemArray;
}
function getDefaultItem($sourceItem) {
  return (0, _renderer.default)('<div>').addClass(_const.CLASSES.area.field).addClass(_const.CLASSES.area.box).text($sourceItem.text());
}
function getItemArray($sourceItem, target) {
  var isAreaBox = $sourceItem.hasClass(_const.CLASSES.area.box);
  var isTreeList = $sourceItem.attr(_const.ATTRIBUTES.treeViewItem);
  if (isAreaBox) {
    return getAreaBoxItemArray($sourceItem, target);
  }
  if (isTreeList) {
    return getTreeViewItem($sourceItem);
  }
  return getDefaultItem($sourceItem);
}
function wrapItemsInFieldsContainer($itemArray) {
  var $wrappedTmpContainer = (0, _renderer.default)('<div>');
  $itemArray.each(function (_, item) {
    var $wrappedItem = (0, _renderer.default)('<div>').addClass(_const.CLASSES.pivotGrid.fieldsContainer).addClass(_const.CLASSES.widget).append((0, _renderer.default)(item));
    $wrappedTmpContainer.append($wrappedItem);
    return true;
  });
  return $wrappedTmpContainer.children();
}
function dragAndDropItemRender($sourceItem, target) {
  var $itemArray = getItemArray($sourceItem, target);
  if (target === _const.SORTABLE_CONST.targets.drag) {
    return wrapItemsInFieldsContainer($itemArray);
  }
  return $itemArray;
}
