/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_tooltip/utils/get_current_appointment.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export default (appointmentItem => {
  var _ref, _settings$targetedApp;
  var {
    currentData,
    data,
    settings
  } = appointmentItem;
  return (_ref = (_settings$targetedApp = settings === null || settings === void 0 ? void 0 : settings.targetedAppointmentData) !== null && _settings$targetedApp !== void 0 ? _settings$targetedApp : currentData) !== null && _ref !== void 0 ? _ref : data;
});
