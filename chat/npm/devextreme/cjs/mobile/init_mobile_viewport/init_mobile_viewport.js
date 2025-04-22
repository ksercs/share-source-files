/**
* DevExtreme (cjs/mobile/init_mobile_viewport/init_mobile_viewport.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _init_mobile_viewport = require("../../common/core/environment/init_mobile_viewport/init_mobile_viewport");
Object.keys(_init_mobile_viewport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _init_mobile_viewport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _init_mobile_viewport[key];
    }
  });
});
