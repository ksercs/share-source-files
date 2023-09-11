/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/utils/renderTemplate.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { renderTemplate } from '@devextreme/runtime/inferno';
export var getRenderEditorTemplate = editorTemplate => (item, container) => {
  renderTemplate(() => editorTemplate, {
    item,
    container
  }, null);
};
