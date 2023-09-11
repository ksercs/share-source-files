/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/timeZone.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
