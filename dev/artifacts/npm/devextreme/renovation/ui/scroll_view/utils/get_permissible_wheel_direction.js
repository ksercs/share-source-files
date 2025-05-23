/**
* DevExtreme (renovation/ui/scroll_view/utils/get_permissible_wheel_direction.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.permissibleWheelDirection = permissibleWheelDirection;
var _consts = require("../common/consts");
function permissibleWheelDirection(direction, isShiftKey) {
  switch (direction) {
    case _consts.DIRECTION_HORIZONTAL:
      return _consts.DIRECTION_HORIZONTAL;
    case _consts.DIRECTION_VERTICAL:
      return _consts.DIRECTION_VERTICAL;
    default:
      return isShiftKey ? _consts.DIRECTION_HORIZONTAL : _consts.DIRECTION_VERTICAL;
  }
}
