/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
import dateLocalization from '../../../../localization/date';
export var getFirstDayOfWeek = firstDayOfWeek => isDefined(firstDayOfWeek) ? firstDayOfWeek : dateLocalization.firstDayOfWeekIndex();
