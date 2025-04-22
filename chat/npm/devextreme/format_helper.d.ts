/**
* DevExtreme (format_helper.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
  Format,
} from './common/core/localization';

export interface FormatHelper {
  format(
    value: number | Date | null | undefined | string,
    format?: Format | Record<string, unknown>): string;
}

declare const formatHelper: FormatHelper;
export default formatHelper;
