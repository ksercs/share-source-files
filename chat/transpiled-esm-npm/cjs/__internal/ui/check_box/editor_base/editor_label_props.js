"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEditorLabelProps = void 0;
var _themes = require("../../../../ui/themes");
const defaultEditorLabelProps = exports.defaultEditorLabelProps = {
  label: '',
  labelMode: (0, _themes.isMaterial)((0, _themes.current)()) ? 'floating' : 'static'
};