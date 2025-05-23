/**
* DevExtreme (esm/renovation/ui/scheduler/common.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { utils } from '../../../__internal/scheduler/m_utils';
import { createExpressions } from '../../../__internal/scheduler/resources/m_utils';
export var createDataAccessors = function createDataAccessors(dataAccessorsProps) {
  var forceIsoDateParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dataAccessors = utils.dataAccessors.create({
    startDate: dataAccessorsProps.startDateExpr,
    endDate: dataAccessorsProps.endDateExpr,
    startDateTimeZone: dataAccessorsProps.startDateTimeZoneExpr,
    endDateTimeZone: dataAccessorsProps.endDateTimeZoneExpr,
    allDay: dataAccessorsProps.allDayExpr,
    text: dataAccessorsProps.textExpr,
    description: dataAccessorsProps.descriptionExpr,
    recurrenceRule: dataAccessorsProps.recurrenceRuleExpr,
    recurrenceException: dataAccessorsProps.recurrenceExceptionExpr
  }, null, forceIsoDateParsing, dataAccessorsProps.dateSerializationFormat);
  dataAccessors.resources = createExpressions(dataAccessorsProps.resources);
  return dataAccessors;
};
export var isViewDataProviderConfigValid = (viewDataProviderConfig, currentViewOptions) => {
  if (!viewDataProviderConfig) {
    return false;
  }
  var result = true;
  Object.entries(viewDataProviderConfig).forEach(_ref => {
    var [key, value] = _ref;
    if (value !== currentViewOptions[key]) {
      result = false;
    }
  });
  return result;
};
