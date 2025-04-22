/**
* DevExtreme (cjs/data/data_source/data_source.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _data_source = require("../../common/data/data_source/data_source");
Object.keys(_data_source).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _data_source[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _data_source[key];
    }
  });
});
