/**
* DevExtreme (renovation/ui/scroll_view/utils/convert_location.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.convertToLocation = convertToLocation;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
var _scroll_direction = require("./scroll_direction");
function convertToLocation(location, direction) {
  if ((0, _type.isPlainObject)(location)) {
    var left = (0, _common.ensureDefined)(location.left, location.x);
    var top = (0, _common.ensureDefined)(location.top, location.y);
    return {
      left: (0, _type.isDefined)(left) ? left : undefined,
      top: (0, _type.isDefined)(top) ? top : undefined
    };
  }
  var _ScrollDirection = new _scroll_direction.ScrollDirection(direction),
    isHorizontal = _ScrollDirection.isHorizontal,
    isVertical = _ScrollDirection.isVertical;
  return {
    left: isHorizontal && (0, _type.isDefined)(location) ? location : undefined,
    top: isVertical && (0, _type.isDefined)(location) ? location : undefined
  };
}
