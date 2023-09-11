/**
* DevExtreme (cjs/renovation/ui/common/utils/scroll/getMemoizeScrollTo.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getMemoizeScrollTo = getMemoizeScrollTo;
function getMemoizeScrollTo(getScrollableInstance) {
  var instance = getScrollableInstance();
  var lastParams = {};
  return function (params) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var normalizedParams = {
      top: params.top !== undefined ? Math.ceil(params.top) : undefined,
      left: params.left !== undefined ? Math.ceil(params.left) : undefined
    };
    var isSameParams = normalizedParams.top === lastParams.top && normalizedParams.left === lastParams.left;
    if (!force && isSameParams) {
      return;
    }
    lastParams = normalizedParams;
    instance.scrollTo(params);
  };
}
