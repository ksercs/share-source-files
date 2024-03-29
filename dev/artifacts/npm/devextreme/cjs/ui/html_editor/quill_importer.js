/**
* DevExtreme (cjs/ui/html_editor/quill_importer.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getQuill = getQuill;
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getQuill() {
  if (!_devextremeQuill.default) {
    throw _ui.default.Error('E1041', 'Quill');
  }
  return _devextremeQuill.default;
}
