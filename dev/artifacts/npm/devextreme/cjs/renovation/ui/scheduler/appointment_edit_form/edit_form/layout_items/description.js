/**
* DevExtreme (cjs/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/description.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getDescriptionLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getDescriptionLayoutItemConfig = function getDescriptionLayoutItemConfig(editorTemplate, dataField, label) {
  return {
    dataField,
    colSpan: 2,
    label: {
      text: label
    },
    template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
  };
};
exports.getDescriptionLayoutItemConfig = getDescriptionLayoutItemConfig;
