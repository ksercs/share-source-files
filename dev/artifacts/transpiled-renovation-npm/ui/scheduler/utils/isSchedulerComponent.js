"use strict";

exports.isSchedulerComponent = isSchedulerComponent;
var schedulerComponentName = 'dxScheduler';
function isSchedulerComponent(component) {
  return component.NAME === schedulerComponentName;
}