"use strict";

exports.getSwitchLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var AppointmentFormClass = 'dx-appointment-form-switch';
var getSwitchLayoutItemConfig = function getSwitchLayoutItemConfig(editorTemplate, dataField, label) {
  return {
    dataField: dataField,
    cssClass: AppointmentFormClass,
    label: {
      text: label,
      location: 'right'
    },
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getSwitchLayoutItemConfig = getSwitchLayoutItemConfig;