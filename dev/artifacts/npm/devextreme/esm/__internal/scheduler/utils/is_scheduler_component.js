/**
* DevExtreme (esm/__internal/scheduler/utils/is_scheduler_component.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var schedulerComponentName = 'dxScheduler';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isSchedulerComponent(component) {
  return component.NAME === schedulerComponentName;
}
