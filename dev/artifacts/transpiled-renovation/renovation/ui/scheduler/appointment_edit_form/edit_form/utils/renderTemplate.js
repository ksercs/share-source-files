"use strict";

exports.getRenderEditorTemplate = void 0;
var _inferno = require("@devextreme/runtime/inferno");
var getRenderEditorTemplate = function getRenderEditorTemplate(editorTemplate) {
  return function (item, container) {
    (0, _inferno.renderTemplate)(function () {
      return editorTemplate;
    }, {
      item,
      container
    }, null);
  };
};
exports.getRenderEditorTemplate = getRenderEditorTemplate;