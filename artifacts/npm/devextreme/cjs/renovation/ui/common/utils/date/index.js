/**
* DevExtreme (cjs/renovation/ui/common/utils/date/index.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _toMilliseconds = require("./toMilliseconds");
Object.keys(_toMilliseconds).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _toMilliseconds[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toMilliseconds[key];
    }
  });
});
