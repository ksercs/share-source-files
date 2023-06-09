/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/dateBox.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
