/**
* DevExtreme (cjs/viz/tree_map/tooltip.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _helpers = require("../core/helpers");
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
require("./api");
var _tooltip = require("../core/tooltip");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var proto = _tree_map.default.prototype;
(0, _helpers.expand)(proto, '_extendProxyType', function (proto) {
  var that = this;
  proto.showTooltip = function (coords) {
    that._showTooltip(this._id, coords);
  };
});
(0, _helpers.expand)(proto, '_onNodesCreated', function () {
  if (this._tooltipIndex >= 0) {
    this._tooltip.hide();
  }
  this._tooltipIndex = -1;
});
(0, _helpers.expand)(proto, '_onTilingPerformed', function () {
  if (this._tooltipIndex >= 0) {
    this._moveTooltip(this._nodes[this._tooltipIndex]);
  }
});
function getCoords(coords, rect, renderer) {
  var offset = renderer.getRootOffset();
  return coords || rect && [(rect[0] + rect[2]) / 2 + offset.left, (rect[1] + rect[3]) / 2 + offset.top] || [-1000, -1000];
}
proto._showTooltip = function (index, coords) {
  var that = this;
  var tooltip = that._tooltip;
  var node = that._nodes[index];
  if (that._tooltipIndex === index) {
    that._moveTooltip(node, coords);
    return;
  }
  var callback = function callback(result) {
    if (result === undefined) {
      return;
    }
    if (!result) {
      tooltip.hide();
    }
    that._tooltipIndex = result ? index : -1;
  };
  var xy = getCoords(coords, node.rect, this._renderer);
  callback(tooltip.show({
    value: node.value,
    valueText: tooltip.formatValue(node.value),
    node: node.proxy
  }, {
    x: xy[0],
    y: xy[1],
    offset: 0
  }, {
    node: node.proxy
  }, undefined, callback));
};
proto._moveTooltip = function (node, coords) {
  var xy = getCoords(coords, node.rect, this._renderer);
  this._tooltip.move(xy[0], xy[1], 0);
};
proto.hideTooltip = function () {
  if (this._tooltipIndex >= 0) {
    this._tooltipIndex = -1;
    this._tooltip.hide();
  }
};

// PLUGINS_SECTION\

_tree_map.default.addPlugin(_tooltip.plugin);