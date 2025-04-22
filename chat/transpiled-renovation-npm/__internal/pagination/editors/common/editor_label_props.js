"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorLabelDefaultProps = void 0;
var _themes = require("../../../../ui/themes");
const EditorLabelDefaultProps = exports.EditorLabelDefaultProps = {
  label: '',
  labelMode: (0, _themes.isMaterial)((0, _themes.current)()) ? 'floating' : 'static'
};