/**
* DevExtreme (esm/renovation/ui/scheduler/resources/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getAppointmentColor as getDeferredAppointmentColor } from '../../../../__internal/scheduler/resources/m_utils';
export var getAppointmentColor = (resourceConfig, appointmentConfig) => getDeferredAppointmentColor(_extends({}, resourceConfig, {
  dataAccessors: resourceConfig.resourcesDataAccessors
}), appointmentConfig);
