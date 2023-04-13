import { getRenderEditorTemplate } from '../utils/renderTemplate';
export var getTimeZoneLayoutItemConfig = (editorTemplate, dataField, colSpan, visibleIndex, visible) => ({
  dataField,
  visibleIndex,
  colSpan,
  label: {
    text: ' '
  },
  visible,
  template: getRenderEditorTemplate(editorTemplate)
});