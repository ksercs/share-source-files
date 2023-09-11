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