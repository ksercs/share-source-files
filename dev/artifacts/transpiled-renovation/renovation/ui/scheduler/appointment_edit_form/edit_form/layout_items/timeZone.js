"use strict";

exports.getTimeZoneLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getTimeZoneLayoutItemConfig = function getTimeZoneLayoutItemConfig(editorTemplate, dataField, colSpan, visibleIndex, visible) {
  return {
    dataField,
    visibleIndex,
    colSpan,
    label: {
      text: ' '
    },
    visible,
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getTimeZoneLayoutItemConfig = getTimeZoneLayoutItemConfig;