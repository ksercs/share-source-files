import _extends from "@babel/runtime/helpers/esm/extends";
import { AppointmentViewModelGenerator } from '../../../../../__internal/scheduler/appointments/m_view_model_generator';
export var getAppointmentsViewModel = (model, filteredItems) => {
  var appointmentViewModel = new AppointmentViewModelGenerator();
  return appointmentViewModel.generate(filteredItems, _extends({}, model, {
    isRenovatedAppointments: true
  }));
};