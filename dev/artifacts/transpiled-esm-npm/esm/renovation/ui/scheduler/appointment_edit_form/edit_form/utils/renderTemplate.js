import { renderTemplate } from '@devextreme/runtime/inferno';
export var getRenderEditorTemplate = editorTemplate => (item, container) => {
  renderTemplate(() => editorTemplate, {
    item,
    container
  }, null);
};