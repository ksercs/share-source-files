/**
* DevExtreme (cjs/__internal/grids/grid_core/columns_controller/const.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_STATE_FIELD_NAMES_15_1 = exports.USER_STATE_FIELD_NAMES = exports.MAX_SAFE_INTEGER = exports.IGNORE_COLUMN_OPTION_NAMES = exports.GROUP_LOCATION = exports.GROUP_COMMAND_COLUMN_NAME = exports.DETAIL_COMMAND_COLUMN_NAME = exports.DEFAULT_COLUMN_OPTIONS = exports.DATATYPE_OPERATIONS = exports.COMMAND_EXPAND_CLASS = exports.COLUMN_OPTION_REGEXP = exports.COLUMN_INDEX_OPTIONS = exports.COLUMN_CHOOSER_LOCATION = void 0;
var USER_STATE_FIELD_NAMES_15_1 = ['filterValues', 'filterType', 'fixed', 'fixedPosition'];
exports.USER_STATE_FIELD_NAMES_15_1 = USER_STATE_FIELD_NAMES_15_1;
var USER_STATE_FIELD_NAMES = ['visibleIndex', 'dataField', 'name', 'dataType', 'width', 'visible', 'sortOrder', 'lastSortOrder', 'sortIndex', 'groupIndex', 'filterValue', 'bufferedFilterValue', 'selectedFilterOperation', 'bufferedSelectedFilterOperation', 'added'].concat(USER_STATE_FIELD_NAMES_15_1);
// eslint-disable-next-line max-len
exports.USER_STATE_FIELD_NAMES = USER_STATE_FIELD_NAMES;
var IGNORE_COLUMN_OPTION_NAMES = {
  visibleWidth: true,
  bestFitWidth: true,
  bufferedFilterValue: true
};
exports.IGNORE_COLUMN_OPTION_NAMES = IGNORE_COLUMN_OPTION_NAMES;
var COMMAND_EXPAND_CLASS = 'dx-command-expand';
exports.COMMAND_EXPAND_CLASS = COMMAND_EXPAND_CLASS;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991 /* IE11 */;
exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
var GROUP_COMMAND_COLUMN_NAME = 'groupExpand';
exports.GROUP_COMMAND_COLUMN_NAME = GROUP_COMMAND_COLUMN_NAME;
var DETAIL_COMMAND_COLUMN_NAME = 'detailExpand';
exports.DETAIL_COMMAND_COLUMN_NAME = DETAIL_COMMAND_COLUMN_NAME;
var COLUMN_OPTION_REGEXP = /columns\[(\d+)\]\.?/gi;
exports.COLUMN_OPTION_REGEXP = COLUMN_OPTION_REGEXP;
var DEFAULT_COLUMN_OPTIONS = {
  visible: true,
  showInColumnChooser: true
};
exports.DEFAULT_COLUMN_OPTIONS = DEFAULT_COLUMN_OPTIONS;
var DATATYPE_OPERATIONS = {
  number: ['=', '<>', '<', '>', '<=', '>=', 'between'],
  string: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>'],
  date: ['=', '<>', '<', '>', '<=', '>=', 'between'],
  datetime: ['=', '<>', '<', '>', '<=', '>=', 'between']
};
exports.DATATYPE_OPERATIONS = DATATYPE_OPERATIONS;
var COLUMN_INDEX_OPTIONS = {
  visibleIndex: true,
  groupIndex: true,
  grouped: true,
  sortIndex: true,
  sortOrder: true
};
exports.COLUMN_INDEX_OPTIONS = COLUMN_INDEX_OPTIONS;
var GROUP_LOCATION = 'group';
exports.GROUP_LOCATION = GROUP_LOCATION;
var COLUMN_CHOOSER_LOCATION = 'columnChooser';
exports.COLUMN_CHOOSER_LOCATION = COLUMN_CHOOSER_LOCATION;
