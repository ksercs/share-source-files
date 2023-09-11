import _extends from "@babel/runtime/helpers/esm/extends";
import { getAppointmentColor as getDeferredAppointmentColor } from '../../../../__internal/scheduler/resources/m_utils';
export var getAppointmentColor = (resourceConfig, appointmentConfig) => getDeferredAppointmentColor(_extends({}, resourceConfig, {
  dataAccessors: resourceConfig.resourcesDataAccessors
}), appointmentConfig);