import { getRenderEditorTemplate } from '../utils/renderTemplate';
export var getDescriptionLayoutItemConfig = (editorTemplate, dataField, label) => ({
  dataField,
  colSpan: 2,
  label: {
    text: label
  },
  template: getRenderEditorTemplate(editorTemplate)
});