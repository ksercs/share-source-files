/**
* DevExtreme (localization/date.d.ts)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { Format as LocalizationFormat } from '../localization';

type Format = 'abbreviated' | 'short' | 'narrow';

interface DateLocalization {
  firstDayOfWeekIndex(): number;
  format(date?: Date, format?: LocalizationFormat): string | Date | undefined;
  getDayNames(format?: Format): string[];
  getMonthNames(format?: Format): string[];
}
declare const dateLocalization: DateLocalization;
export default dateLocalization;
