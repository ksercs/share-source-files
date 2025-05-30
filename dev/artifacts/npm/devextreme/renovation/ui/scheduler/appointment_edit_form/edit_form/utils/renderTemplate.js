/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/utils/renderTemplate.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
