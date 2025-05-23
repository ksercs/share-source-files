/**
* DevExtreme (esm/__internal/scheduler/m_expression_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
export var ExpressionUtils = {
  getField: (dataAccessors, field, obj) => {
    if (!isDefined(dataAccessors.getter[field])) {
      return;
    }
    return dataAccessors.getter[field](obj);
  },
  setField: (dataAccessors, field, obj, value) => {
    if (!isDefined(dataAccessors.setter[field])) {
      return;
    }
    dataAccessors.setter[field](obj, value);
    return obj;
  }
};
