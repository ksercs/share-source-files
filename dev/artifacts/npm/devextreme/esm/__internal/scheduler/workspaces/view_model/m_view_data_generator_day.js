/**
* DevExtreme (esm/__internal/scheduler/workspaces/view_model/m_view_data_generator_day.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { calculateStartViewDate } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/day';
import { ViewDataGenerator } from './m_view_data_generator';
export class ViewDataGeneratorDay extends ViewDataGenerator {
  _calculateStartViewDate(options) {
    return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount));
  }
}
