/**
* DevExtreme (renovation/ui/scroll_view/utils/get_augmented_location.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAugmentedLocation = getAugmentedLocation;
var _type = require("../../../../core/utils/type");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function getAugmentedLocation(location) {
  if ((0, _type.isNumeric)(location)) {
    return {
      left: location,
      top: location
    };
  }
  return _extends({
    top: 0,
    left: 0
  }, location);
}
