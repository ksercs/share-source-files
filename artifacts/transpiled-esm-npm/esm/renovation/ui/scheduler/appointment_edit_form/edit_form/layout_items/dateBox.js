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