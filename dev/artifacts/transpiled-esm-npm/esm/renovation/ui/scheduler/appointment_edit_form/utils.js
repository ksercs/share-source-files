import { isDefined } from '../../../../core/utils/type';
import dateLocalization from '../../../../localization/date';
export var getFirstDayOfWeek = firstDayOfWeek => isDefined(firstDayOfWeek) ? firstDayOfWeek : dateLocalization.firstDayOfWeekIndex();