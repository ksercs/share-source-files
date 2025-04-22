import dateLocalization from '../../../../common/core/localization/date';
export const formatWeekday = date => dateLocalization.getDayNames('abbreviated')[date.getDay()];
export const formatWeekdayAndDay = date => `${formatWeekday(date)} ${dateLocalization.format(date, 'day')}`;