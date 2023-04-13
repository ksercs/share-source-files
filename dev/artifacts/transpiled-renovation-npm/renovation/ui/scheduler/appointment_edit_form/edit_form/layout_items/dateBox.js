"use strict";

exports.getDateBoxLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getDateBoxLayoutItemConfig = function getDateBoxLayoutItemConfig(editorTemplate, dataField, colSpan, labelText) {
  return {
    dataField: dataField,
    colSpan: colSpan,
    label: {
      text: labelText
    },
    validationRules: [{
      type: 'required'
    }],
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getDateBoxLayoutItemConfig = getDateBoxLayoutItemConfig;