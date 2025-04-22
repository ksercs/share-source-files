/**
* DevExtreme (esm/__internal/scheduler/header/today.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import messageLocalization from '../../../common/core/localization/message';
import { extend } from '../../core/utils/m_extend';
export const getTodayButtonOptions = (header, item) => extend(true, {}, {
  location: 'before',
  locateInMenu: 'auto',
  widget: 'dxButton',
  cssClass: 'dx-scheduler-today',
  options: {
    text: messageLocalization.format('dxScheduler-navigationToday'),
    icon: 'today',
    stylingMode: 'outlined',
    type: 'normal',
    onClick() {
      header._updateCurrentDate(header.option('indicatorTime') ?? new Date());
    }
  }
}, item);
