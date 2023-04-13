import _extends from "@babel/runtime/helpers/esm/extends";
export var createFormData = appointment => _extends({}, appointment, {
  repeat: !!appointment.recurrenceRule
});