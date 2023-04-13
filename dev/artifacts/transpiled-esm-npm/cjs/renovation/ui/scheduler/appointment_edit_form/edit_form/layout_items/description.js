"use strict";

exports.getDescriptionLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getDescriptionLayoutItemConfig = function getDescriptionLayoutItemConfig(editorTemplate, dataField, label) {
  return {
    dataField: dataField,
    colSpan: 2,
    label: {
      text: label
    },
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getDescriptionLayoutItemConfig = getDescriptionLayoutItemConfig;