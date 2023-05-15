/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/dateBox.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getRenderEditorTemplate } from '../utils/renderTemplate';
export var getDateBoxLayoutItemConfig = (editorTemplate, dataField, colSpan, labelText) => ({
  dataField,
  colSpan,
  label: {
    text: labelText
  },
  validationRules: [{
    type: 'required'
  }],
  template: getRenderEditorTemplate(editorTemplate)
});
