import { getRenderEditorTemplate } from '../utils/renderTemplate';
var AppointmentFormClass = 'dx-appointment-form-switch';
export var getSwitchLayoutItemConfig = (editorTemplate, dataField, label) => ({
  dataField,
  cssClass: AppointmentFormClass,
  label: {
    text: label,
    location: 'right'
  },
  template: getRenderEditorTemplate(editorTemplate)
});