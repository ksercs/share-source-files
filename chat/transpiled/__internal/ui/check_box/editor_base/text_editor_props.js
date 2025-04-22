"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTextEditorProps = void 0;
var _themes = require("../../../../ui/themes");
const defaultTextEditorProps = exports.defaultTextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  stylingMode: (0, _themes.isMaterial)((0, _themes.current)()) ? 'filled' : 'outlined',
  defaultValue: ''
};