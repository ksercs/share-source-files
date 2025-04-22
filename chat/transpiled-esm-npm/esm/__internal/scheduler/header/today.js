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