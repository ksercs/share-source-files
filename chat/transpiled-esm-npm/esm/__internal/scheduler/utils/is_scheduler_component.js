const schedulerComponentName = 'dxScheduler';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isSchedulerComponent(component) {
  return component.NAME === schedulerComponentName;
}