import errors from '../../../ui/widget/ui.errors';
import { OptionsValidatorErrorHandler } from './core/index';
const GLOBAL_ERROR_HANDLER = {
  logError: errorCode => {
    errors.log(errorCode);
  },
  throwError: errorCode => {
    throw errors.Error(errorCode);
  }
};
export class SchedulerOptionsValidatorErrorsHandler extends OptionsValidatorErrorHandler {
  constructor() {
    super({
      startDayHour: 'E1058',
      endDayHour: 'E1058',
      startDayHourAndEndDayHour: 'E1058',
      offset: 'E1061',
      cellDuration: 'E1062',
      cellDurationAndVisibleInterval: 'E1062'
    }, GLOBAL_ERROR_HANDLER);
  }
}