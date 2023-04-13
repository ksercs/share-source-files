"use strict";

exports.getTimeZoneLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getTimeZoneLayoutItemConfig = function getTimeZoneLayoutItemConfig(editorTemplate, dataField, colSpan, visibleIndex, visible) {
  return {
    dataField: dataField,
    visibleIndex: visibleIndex,
    colSpan: colSpan,
    label: {
      text: ' '
    },
    visible: visible,
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getTimeZoneLayoutItemConfig = getTimeZoneLayoutItemConfig;