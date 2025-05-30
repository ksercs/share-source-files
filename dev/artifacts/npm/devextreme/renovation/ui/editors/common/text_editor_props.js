/**
* DevExtreme (renovation/ui/editors/common/text_editor_props.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TextEditorProps = void 0;
var _themes = require("../../../../ui/themes");
var TextEditorProps = Object.defineProperties({
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  defaultValue: ''
}, {
  stylingMode: {
    get: function get() {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? 'filled' : 'outlined';
    },
    configurable: true,
    enumerable: true
  }
});
exports.TextEditorProps = TextEditorProps;
