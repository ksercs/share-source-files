/**
* DevExtreme (cjs/__internal/filter_builder/m_filter_operations_dictionary.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable spellcheck/spell-checker */
const OPERATION_ICONS = {
  '=': 'equal',
  '<>': 'notequal',
  '<': 'less',
  '<=': 'lessorequal',
  '>': 'greater',
  '>=': 'greaterorequal',
  notcontains: 'doesnotcontain',
  contains: 'contains',
  startswith: 'startswith',
  endswith: 'endswith',
  isblank: 'isblank',
  isnotblank: 'isnotblank'
};
const OPERATION_NAME = {
  '=': 'equal',
  '<>': 'notEqual',
  '<': 'lessThan',
  '<=': 'lessThanOrEqual',
  '>': 'greaterThan',
  '>=': 'greaterThanOrEqual',
  startswith: 'startsWith',
  contains: 'contains',
  notcontains: 'notContains',
  endswith: 'endsWith',
  isblank: 'isBlank',
  isnotblank: 'isNotBlank',
  between: 'between'
};
var _default = exports.default = {
  getIconByFilterOperation(filterOperation) {
    return OPERATION_ICONS[filterOperation];
  },
  getNameByFilterOperation(filterOperation) {
    return OPERATION_NAME[filterOperation];
  }
};
