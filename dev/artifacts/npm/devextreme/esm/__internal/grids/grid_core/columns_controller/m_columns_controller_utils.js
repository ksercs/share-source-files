/**
* DevExtreme (esm/__internal/grids/grid_core/columns_controller/m_columns_controller_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable prefer-destructuring */
import { normalizeIndexes } from '../../../../core/utils/array';
import { equalByValue } from '../../../../core/utils/common';
import { compileGetter, compileSetter } from '../../../../core/utils/data';
import dateSerialization from '../../../../core/utils/date_serialization';
import { extend } from '../../../../core/utils/extend';
import { each, map } from '../../../../core/utils/iterator';
import { deepExtendArraySafe } from '../../../../core/utils/object';
import { getDefaultAlignment } from '../../../../core/utils/position';
import { isDefined, isFunction, isNumeric, isObject, isString, type } from '../../../../core/utils/type';
import variableWrapper from '../../../../core/utils/variable_wrapper';
import numberLocalization from '../../../../localization/number';
import gridCoreUtils from '../m_utils';
import { COLUMN_CHOOSER_LOCATION, COLUMN_INDEX_OPTIONS, DEFAULT_COLUMN_OPTIONS, GROUP_COMMAND_COLUMN_NAME, GROUP_LOCATION, IGNORE_COLUMN_OPTION_NAMES, USER_STATE_FIELD_NAMES, USER_STATE_FIELD_NAMES_15_1 } from './const';
export var setFilterOperationsAsDefaultValues = function setFilterOperationsAsDefaultValues(column) {
  column.filterOperations = column.defaultFilterOperations;
};
var globalColumnId = 1;
export var createColumn = function createColumn(that, columnOptions, userStateColumnOptions, bandColumn) {
  var commonColumnOptions = {};
  if (columnOptions) {
    if (isString(columnOptions)) {
      columnOptions = {
        dataField: columnOptions
      };
    }
    that.setName(columnOptions);
    var result = {};
    if (columnOptions.command) {
      result = deepExtendArraySafe(commonColumnOptions, columnOptions);
    } else {
      commonColumnOptions = that.getCommonSettings(columnOptions);
      if (userStateColumnOptions && userStateColumnOptions.name && userStateColumnOptions.dataField) {
        columnOptions = extend({}, columnOptions, {
          dataField: userStateColumnOptions.dataField
        });
      }
      var calculatedColumnOptions = that._createCalculatedColumnOptions(columnOptions, bandColumn);
      if (!columnOptions.type) {
        result = {
          headerId: "dx-col-".concat(globalColumnId++)
        };
      }
      result = deepExtendArraySafe(result, DEFAULT_COLUMN_OPTIONS);
      deepExtendArraySafe(result, commonColumnOptions);
      deepExtendArraySafe(result, calculatedColumnOptions);
      deepExtendArraySafe(result, columnOptions);
      deepExtendArraySafe(result, {
        selector: null
      });
    }
    if (columnOptions.filterOperations === columnOptions.defaultFilterOperations) {
      setFilterOperationsAsDefaultValues(result);
    }
    return result;
  }
};
export var createColumnsFromOptions = function createColumnsFromOptions(that, columnsOptions, bandColumn) {
  var result = [];
  if (columnsOptions) {
    each(columnsOptions, (index, columnOptions) => {
      var userStateColumnOptions = that._columnsUserState && checkUserStateColumn(columnOptions, that._columnsUserState[index]) && that._columnsUserState[index];
      var column = createColumn(that, columnOptions, userStateColumnOptions, bandColumn);
      if (column) {
        if (bandColumn) {
          column.ownerBand = bandColumn;
        }
        result.push(column);
        if (column.columns) {
          result = result.concat(createColumnsFromOptions(that, column.columns, column));
          delete column.columns;
          column.hasColumns = true;
        }
      }
    });
  }
  return result;
};
export var getParentBandColumns = function getParentBandColumns(columnIndex, columnParentByIndex) {
  var result = [];
  var parent = columnParentByIndex[columnIndex];
  while (parent) {
    result.unshift(parent);
    columnIndex = parent.index;
    parent = columnParentByIndex[columnIndex];
  }
  return result;
};
export var getChildrenByBandColumn = function getChildrenByBandColumn(columnIndex, columnChildrenByIndex, recursive) {
  var result = [];
  var children = columnChildrenByIndex[columnIndex];
  if (children) {
    for (var i = 0; i < children.length; i++) {
      var column = children[i];
      if (!isDefined(column.groupIndex) || column.showWhenGrouped) {
        result.push(column);
        if (recursive && column.isBand) {
          result = result.concat(getChildrenByBandColumn(column.index, columnChildrenByIndex, recursive));
        }
      }
    }
  }
  return result;
};
export var getColumnByIndexes = function getColumnByIndexes(that, columnIndexes) {
  var result;
  var columns;
  var bandColumnsCache = that.getBandColumnsCache();
  var callbackFilter = function callbackFilter(column) {
    var ownerBand = result ? result.index : undefined;
    return column.ownerBand === ownerBand;
  };
  if (bandColumnsCache.isPlain) {
    result = that._columns[columnIndexes[0]];
  } else {
    columns = that._columns.filter(callbackFilter);
    for (var i = 0; i < columnIndexes.length; i++) {
      result = columns[columnIndexes[i]];
      if (result) {
        columns = that._columns.filter(callbackFilter);
      }
    }
  }
  return result;
};
export var getColumnFullPath = function getColumnFullPath(that, column) {
  var result = [];
  var columns;
  var bandColumnsCache = that.getBandColumnsCache();
  var callbackFilter = function callbackFilter(item) {
    return item.ownerBand === column.ownerBand;
  };
  if (bandColumnsCache.isPlain) {
    var columnIndex = that._columns.indexOf(column);
    if (columnIndex >= 0) {
      result = ["columns[".concat(columnIndex, "]")];
    }
  } else {
    columns = that._columns.filter(callbackFilter);
    while (columns.length && columns.indexOf(column) !== -1) {
      result.unshift("columns[".concat(columns.indexOf(column), "]"));
      column = bandColumnsCache.columnParentByIndex[column.index];
      columns = column ? that._columns.filter(callbackFilter) : [];
    }
  }
  return result.join('.');
};
export var calculateColspan = function calculateColspan(that, columnID) {
  var colspan = 0;
  var columns = that.getChildrenByBandColumn(columnID, true);
  each(columns, (_, column) => {
    if (column.isBand) {
      column.colspan = column.colspan || calculateColspan(that, column.index);
      colspan += column.colspan || 1;
    } else {
      colspan += 1;
    }
  });
  return colspan;
};
export var processBandColumns = function processBandColumns(that, columns, bandColumnsCache) {
  var rowspan;
  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    if (column.visible || column.command) {
      if (column.isBand) {
        column.colspan = column.colspan || calculateColspan(that, column.index);
      }
      if (!column.isBand || !column.colspan) {
        rowspan = that.getRowCount();
        if (!column.command && (!isDefined(column.groupIndex) || column.showWhenGrouped)) {
          rowspan -= getParentBandColumns(column.index, bandColumnsCache.columnParentByIndex).length;
        }
        if (rowspan > 1) {
          column.rowspan = rowspan;
        }
      }
    }
  }
};
export var getValueDataType = function getValueDataType(value) {
  var dataType = type(value);
  if (dataType !== 'string' && dataType !== 'boolean' && dataType !== 'number' && dataType !== 'date' && dataType !== 'object') {
    dataType = undefined;
  }
  return dataType;
};
export var getSerializationFormat = function getSerializationFormat(dataType, value) {
  // eslint-disable-next-line default-case
  switch (dataType) {
    case 'date':
    case 'datetime':
      return dateSerialization.getDateSerializationFormat(value);
    case 'number':
      if (isString(value)) {
        return 'string';
      }
      if (isNumeric(value)) {
        return null;
      }
  }
};
export var updateSerializers = function updateSerializers(options, dataType) {
  if (!options.deserializeValue) {
    if (gridCoreUtils.isDateType(dataType)) {
      options.deserializeValue = function (value) {
        return dateSerialization.deserializeDate(value);
      };
      options.serializeValue = function (value) {
        return isString(value) ? value : dateSerialization.serializeDate(value, this.serializationFormat);
      };
    }
    if (dataType === 'number') {
      options.deserializeValue = function (value) {
        var parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? value : parsedValue;
      };
      options.serializeValue = function (value, target) {
        if (target === 'filter') return value;
        return isDefined(value) && this.serializationFormat === 'string' ? value.toString() : value;
      };
    }
  }
};
export var getAlignmentByDataType = function getAlignmentByDataType(dataType, isRTL) {
  switch (dataType) {
    case 'number':
      return 'right';
    case 'boolean':
      return 'center';
    default:
      return getDefaultAlignment(isRTL);
  }
};
export var customizeTextForBooleanDataType = function customizeTextForBooleanDataType(e) {
  if (e.value === true) {
    return this.trueText || 'true';
  }
  if (e.value === false) {
    return this.falseText || 'false';
  }
  return e.valueText || '';
};
export var getCustomizeTextByDataType = function getCustomizeTextByDataType(dataType) {
  if (dataType === 'boolean') {
    return customizeTextForBooleanDataType;
  }
};
export var createColumnsFromDataSource = function createColumnsFromDataSource(that, dataSource) {
  var firstItems = that._getFirstItems(dataSource);
  var fieldName;
  var processedFields = {};
  var result = [];
  for (var i = 0; i < firstItems.length; i++) {
    if (firstItems[i]) {
      // eslint-disable-next-line no-restricted-syntax
      for (fieldName in firstItems[i]) {
        if (!isFunction(firstItems[i][fieldName]) || variableWrapper.isWrapped(firstItems[i][fieldName])) {
          processedFields[fieldName] = true;
        }
      }
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (fieldName in processedFields) {
    if (fieldName.indexOf('__') !== 0) {
      var column = createColumn(that, fieldName);
      result.push(column);
    }
  }
  return result;
};
export var updateColumnIndexes = function updateColumnIndexes(that) {
  each(that._columns, (index, column) => {
    column.index = index;
  });
  each(that._columns, (index, column) => {
    if (isObject(column.ownerBand)) {
      column.ownerBand = column.ownerBand.index;
    }
  });
  each(that._commandColumns, (index, column) => {
    column.index = -(index + 1);
  });
};
export var updateColumnGroupIndexes = function updateColumnGroupIndexes(that, currentColumn) {
  normalizeIndexes(that._columns, 'groupIndex', currentColumn, column => {
    var {
      grouped
    } = column;
    delete column.grouped;
    return grouped;
  });
};
export var updateColumnSortIndexes = function updateColumnSortIndexes(that, currentColumn) {
  each(that._columns, (index, column) => {
    if (isDefined(column.sortIndex) && !isSortOrderValid(column.sortOrder)) {
      delete column.sortIndex;
    }
  });
  normalizeIndexes(that._columns, 'sortIndex', currentColumn, column => !isDefined(column.groupIndex) && isSortOrderValid(column.sortOrder));
};
export var updateColumnVisibleIndexes = function updateColumnVisibleIndexes(that, currentColumn) {
  var column;
  var result = [];
  var bandColumnsCache = that.getBandColumnsCache();
  var bandedColumns = [];
  var columns = that._columns.filter(column => !column.command);
  for (var i = 0; i < columns.length; i++) {
    column = columns[i];
    var parentBandColumns = getParentBandColumns(i, bandColumnsCache.columnParentByIndex);
    if (parentBandColumns.length) {
      bandedColumns.push(column);
    } else {
      result.push(column);
    }
  }
  normalizeIndexes(bandedColumns, 'visibleIndex', currentColumn);
  normalizeIndexes(result, 'visibleIndex', currentColumn);
};
export var getColumnIndexByVisibleIndex = function getColumnIndexByVisibleIndex(that, visibleIndex, location) {
  // @ts-expect-error
  var rowIndex = isObject(visibleIndex) ? visibleIndex.rowIndex : null;
  var columns = location === GROUP_LOCATION ? that.getGroupColumns() : location === COLUMN_CHOOSER_LOCATION ? that.getChooserColumns() : that.getVisibleColumns(rowIndex);
  var column;
  // @ts-expect-error
  visibleIndex = isObject(visibleIndex) ? visibleIndex.columnIndex : visibleIndex;
  column = columns[visibleIndex];
  if (column && column.type === GROUP_COMMAND_COLUMN_NAME) {
    column = that._columns.filter(col => column.type === col.type)[0] || column;
  }
  return column && isDefined(column.index) ? column.index : -1;
};
export var moveColumnToGroup = function moveColumnToGroup(that, column, groupIndex) {
  var groupColumns = that.getGroupColumns();
  var i;
  if (groupIndex >= 0) {
    for (i = 0; i < groupColumns.length; i++) {
      if (groupColumns[i].groupIndex >= groupIndex) {
        groupColumns[i].groupIndex++;
      }
    }
  } else {
    groupIndex = 0;
    for (i = 0; i < groupColumns.length; i++) {
      groupIndex = Math.max(groupIndex, groupColumns[i].groupIndex + 1);
    }
  }
  return groupIndex;
};
function checkUserStateColumn(column, userStateColumn) {
  return column && userStateColumn && userStateColumn.name === (column.name || column.dataField) && (userStateColumn.dataField === column.dataField || column.name);
}
export var applyUserState = function applyUserState(that) {
  var columnsUserState = that._columnsUserState;
  var ignoreColumnOptionNames = that._ignoreColumnOptionNames || [];
  var columns = that._columns;
  var columnCountById = {};
  var resultColumns = [];
  var allColumnsHaveState = true;
  var userStateColumnIndexes = [];
  var column;
  var userStateColumnIndex;
  var i;
  function applyFieldsState(column, userStateColumn) {
    if (!userStateColumn) return;
    for (var index = 0; index < USER_STATE_FIELD_NAMES.length; index++) {
      var fieldName = USER_STATE_FIELD_NAMES[index];
      if (ignoreColumnOptionNames.includes(fieldName)) continue;
      if (fieldName === 'dataType') {
        column[fieldName] = column[fieldName] || userStateColumn[fieldName];
      } else if (USER_STATE_FIELD_NAMES_15_1.includes(fieldName)) {
        if (fieldName in userStateColumn) {
          column[fieldName] = userStateColumn[fieldName];
        }
      } else {
        if (fieldName === 'selectedFilterOperation' && userStateColumn[fieldName]) {
          column.defaultSelectedFilterOperation = column[fieldName] || null;
        }
        column[fieldName] = userStateColumn[fieldName];
      }
    }
  }
  function findUserStateColumn(columnsUserState, column) {
    var id = column.name || column.dataField;
    var count = columnCountById[id] || 0;
    for (var j = 0; j < columnsUserState.length; j++) {
      if (checkUserStateColumn(column, columnsUserState[j])) {
        if (count) {
          count--;
        } else {
          columnCountById[id] = columnCountById[id] || 0;
          columnCountById[id]++;
          return j;
        }
      }
    }
    return -1;
  }
  if (columnsUserState) {
    for (i = 0; i < columns.length; i++) {
      userStateColumnIndex = findUserStateColumn(columnsUserState, columns[i]);
      allColumnsHaveState = allColumnsHaveState && userStateColumnIndex >= 0;
      userStateColumnIndexes.push(userStateColumnIndex);
    }
    for (i = 0; i < columns.length; i++) {
      column = columns[i];
      userStateColumnIndex = userStateColumnIndexes[i];
      if (that._hasUserState || allColumnsHaveState) {
        applyFieldsState(column, columnsUserState[userStateColumnIndex]);
      }
      if (userStateColumnIndex >= 0 && isDefined(columnsUserState[userStateColumnIndex].initialIndex)) {
        resultColumns[userStateColumnIndex] = column;
      } else {
        resultColumns.push(column);
      }
    }
    var hasAddedBands = false;
    for (i = 0; i < columnsUserState.length; i++) {
      var columnUserState = columnsUserState[i];
      if (columnUserState.added && findUserStateColumn(columns, columnUserState) < 0) {
        column = createColumn(that, columnUserState.added);
        applyFieldsState(column, columnUserState);
        resultColumns.push(column);
        if (columnUserState.added.columns) {
          hasAddedBands = true;
        }
      }
    }
    if (hasAddedBands) {
      updateColumnIndexes(that);
      resultColumns = createColumnsFromOptions(that, resultColumns);
    }
    assignColumns(that, resultColumns);
  }
};
export var updateIndexes = function updateIndexes(that, column) {
  updateColumnIndexes(that);
  updateColumnGroupIndexes(that, column);
  updateColumnSortIndexes(that, column);
  resetBandColumnsCache(that);
  updateColumnVisibleIndexes(that, column);
};
export var resetColumnsCache = function resetColumnsCache(that) {
  that.resetColumnsCache();
};
export function assignColumns(that, columns) {
  that._previousColumns = that._columns;
  that._columns = columns;
  resetColumnsCache(that);
  that.updateColumnDataTypes();
}
export var updateColumnChanges = function updateColumnChanges(that, changeType, optionName, columnIndex) {
  var _a;
  var columnChanges = that._columnChanges || {
    optionNames: {
      length: 0
    },
    changeTypes: {
      length: 0
    },
    columnIndex // TODO replace columnIndex -> columnIndices
  };

  optionName = optionName || 'all';
  optionName = optionName.split('.')[0];
  var {
    changeTypes
  } = columnChanges;
  if (changeType && !changeTypes[changeType]) {
    changeTypes[changeType] = true;
    changeTypes.length++;
  }
  var {
    optionNames
  } = columnChanges;
  if (optionName && !optionNames[optionName]) {
    optionNames[optionName] = true;
    optionNames.length++;
  }
  if (columnIndex === undefined || columnIndex !== columnChanges.columnIndex) {
    if (isDefined(columnIndex)) {
      (_a = columnChanges.columnIndices) !== null && _a !== void 0 ? _a : columnChanges.columnIndices = [];
      if (isDefined(columnChanges.columnIndex)) {
        columnChanges.columnIndices.push(columnChanges.columnIndex);
      }
      columnChanges.columnIndices.push(columnIndex);
    }
    delete columnChanges.columnIndex;
  }
  that._columnChanges = columnChanges;
  resetColumnsCache(that);
};
export var fireColumnsChanged = function fireColumnsChanged(that) {
  var onColumnsChanging = that.option('onColumnsChanging');
  var columnChanges = that._columnChanges;
  var reinitOptionNames = ['dataField', 'lookup', 'dataType', 'columns'];
  var needReinit = options => options && reinitOptionNames.some(name => options[name]);
  if (that.isInitialized() && !that._updateLockCount && columnChanges) {
    if (onColumnsChanging) {
      that._updateLockCount++;
      onColumnsChanging(extend({
        component: that.component
      }, columnChanges));
      that._updateLockCount--;
    }
    that._columnChanges = undefined;
    if (needReinit(columnChanges.optionNames)) {
      that._reinitAfterLookupChanges = columnChanges === null || columnChanges === void 0 ? void 0 : columnChanges.optionNames.lookup;
      that.reinit();
      that._reinitAfterLookupChanges = undefined;
    } else {
      that.columnsChanged.fire(columnChanges);
    }
  }
};
export var updateSortOrderWhenGrouping = function updateSortOrderWhenGrouping(that, column, groupIndex, prevGroupIndex) {
  var columnWasGrouped = prevGroupIndex >= 0;
  if (groupIndex >= 0) {
    if (!columnWasGrouped) {
      column.lastSortOrder = column.sortOrder;
    }
  } else {
    var sortMode = that.option('sorting.mode');
    var sortOrder = column.lastSortOrder;
    if (sortMode === 'single') {
      var sortedByAnotherColumn = that._columns.some(col => col !== column && isDefined(col.sortIndex));
      if (sortedByAnotherColumn) {
        sortOrder = undefined;
      }
    }
    column.sortOrder = sortOrder;
  }
};
export var fireOptionChanged = function fireOptionChanged(that, options) {
  var {
    value
  } = options;
  var {
    optionName
  } = options;
  var {
    prevValue
  } = options;
  var {
    fullOptionName
  } = options;
  var fullOptionPath = "".concat(fullOptionName, ".").concat(optionName);
  if (!IGNORE_COLUMN_OPTION_NAMES[optionName] && that._skipProcessingColumnsChange !== fullOptionPath) {
    that._skipProcessingColumnsChange = fullOptionPath;
    that.component._notifyOptionChanged(fullOptionPath, value, prevValue);
    that._skipProcessingColumnsChange = false;
  }
};
export var columnOptionCore = function columnOptionCore(that, column, optionName, value, notFireEvent) {
  var optionGetter = compileGetter(optionName);
  var columnIndex = column.index;
  var columns;
  var changeType;
  var initialColumn;
  if (arguments.length === 3) {
    // @ts-expect-error
    return optionGetter(column, {
      functionsAsIs: true
    });
  }
  // @ts-expect-error
  var prevValue = optionGetter(column, {
    functionsAsIs: true
  });
  if (!equalByValue(prevValue, value, {
    maxDepth: 5
  })) {
    if (optionName === 'groupIndex' || optionName === 'calculateGroupValue') {
      changeType = 'grouping';
      updateSortOrderWhenGrouping(that, column, value, prevValue);
    } else if (optionName === 'sortIndex' || optionName === 'sortOrder' || optionName === 'calculateSortValue') {
      changeType = 'sorting';
    } else {
      changeType = 'columns';
    }
    var optionSetter = compileSetter(optionName);
    // @ts-expect-error
    optionSetter(column, value, {
      functionsAsIs: true
    });
    var fullOptionName = getColumnFullPath(that, column);
    if (COLUMN_INDEX_OPTIONS[optionName]) {
      updateIndexes(that, column);
      // @ts-expect-error
      value = optionGetter(column);
    }
    if (optionName === 'name' || optionName === 'allowEditing') {
      that._checkColumns();
    }
    if (!isDefined(prevValue) && !isDefined(value) && optionName.indexOf('buffer') !== 0) {
      notFireEvent = true;
    }
    if (!notFireEvent) {
      // T346972
      if (!USER_STATE_FIELD_NAMES.includes(optionName) && optionName !== 'visibleWidth') {
        columns = that.option('columns');
        initialColumn = that.getColumnByPath(fullOptionName, columns);
        if (isString(initialColumn)) {
          initialColumn = columns[columnIndex] = {
            dataField: initialColumn
          };
        }
        if (initialColumn && checkUserStateColumn(initialColumn, column)) {
          // @ts-expect-error
          optionSetter(initialColumn, value, {
            functionsAsIs: true
          });
        }
      }
      updateColumnChanges(that, changeType, optionName, columnIndex);
    } else {
      resetColumnsCache(that);
    }
    fullOptionName && fireOptionChanged(that, {
      fullOptionName,
      optionName,
      value,
      prevValue
    });
  }
};
export function isSortOrderValid(sortOrder) {
  return sortOrder === 'asc' || sortOrder === 'desc';
}
export var addExpandColumn = function addExpandColumn(that) {
  var options = that._getExpandColumnOptions();
  that.addCommandColumn(options);
};
export var defaultSetCellValue = function defaultSetCellValue(data, value) {
  if (!this.dataField) {
    return;
  }
  var path = this.dataField.split('.');
  var dotCount = path.length - 1;
  if (this.serializeValue) {
    value = this.serializeValue(value);
  }
  for (var i = 0; i < dotCount; i++) {
    var name = path[i];
    data = data[name] = data[name] || {};
  }
  data[path[dotCount]] = value;
};
export var getDataColumns = function getDataColumns(columns, rowIndex, bandColumnID) {
  var result = [];
  rowIndex = rowIndex || 0;
  columns[rowIndex] && each(columns[rowIndex], (_, column) => {
    if (column.ownerBand === bandColumnID || column.type === GROUP_COMMAND_COLUMN_NAME) {
      if (!column.isBand || !column.colspan) {
        if (!column.command || rowIndex < 1) {
          result.push(column);
        }
      } else {
        result.push.apply(result, getDataColumns(columns, rowIndex + 1, column.index));
      }
    }
  });
  return result;
};
export var getRowCount = function getRowCount(that) {
  var rowCount = 1;
  var bandColumnsCache = that.getBandColumnsCache();
  var {
    columnParentByIndex
  } = bandColumnsCache;
  that._columns.forEach(column => {
    var parents = getParentBandColumns(column.index, columnParentByIndex);
    var invisibleParents = parents.filter(column => !column.visible);
    if (column.visible && !invisibleParents.length) {
      rowCount = Math.max(rowCount, parents.length + 1);
    }
  });
  return rowCount;
};
export var isCustomCommandColumn = (that, commandColumn) => {
  var customCommandColumns = that._columns.filter(column => column.type === commandColumn.type);
  return !!customCommandColumns.length;
};
export var getFixedPosition = function getFixedPosition(that, column) {
  var rtlEnabled = that.option('rtlEnabled');
  if (column.command && !isCustomCommandColumn(that, column) || !column.fixedPosition) {
    return rtlEnabled ? 'right' : 'left';
  }
  return column.fixedPosition;
};
export var processExpandColumns = function processExpandColumns(columns, expandColumns, type, columnIndex) {
  var customColumnIndex;
  var rowCount = this.getRowCount();
  var rowspan = columns[columnIndex] && columns[columnIndex].rowspan;
  var expandColumnsByType = expandColumns.filter(column => column.type === type);
  columns.forEach((column, index) => {
    if (column.type === type) {
      customColumnIndex = index;
      rowspan = columns[index + 1] ? columns[index + 1].rowspan : rowCount;
    }
  });
  if (rowspan > 1) {
    expandColumnsByType = map(expandColumnsByType, expandColumn => extend({}, expandColumn, {
      rowspan
    }));
  }
  expandColumnsByType.unshift.apply(expandColumnsByType, isDefined(customColumnIndex) ? [customColumnIndex, 1] : [columnIndex, 0]);
  columns.splice.apply(columns, expandColumnsByType);
  return rowspan || 1;
};
export var digitsCount = function digitsCount(number) {
  var i;
  for (i = 0; number > 1; i++) {
    number /= 10;
  }
  return i;
};
export var numberToString = function numberToString(number, digitsCount) {
  var str = number ? number.toString() : '0';
  while (str.length < digitsCount) {
    str = "0".concat(str);
  }
  return str;
};
export var mergeColumns = (that, columns, commandColumns, needToExtend) => {
  var column;
  var commandColumnIndex;
  var result = columns.slice().map(column => extend({}, column));
  var isColumnFixing = that._isColumnFixing();
  var defaultCommandColumns = commandColumns.slice().map(column => extend({
    fixed: isColumnFixing
  }, column));
  var getCommandColumnIndex = column => commandColumns.reduce((result, commandColumn, index) => {
    var columnType = needToExtend && column.type === GROUP_COMMAND_COLUMN_NAME ? 'expand' : column.type;
    return commandColumn.type === columnType || commandColumn.command === column.command ? index : result;
  }, -1);
  var callbackFilter = commandColumn => commandColumn.command !== commandColumns[commandColumnIndex].command;
  for (var i = 0; i < columns.length; i++) {
    column = columns[i];
    commandColumnIndex = column && (column.type || column.command) ? getCommandColumnIndex(column) : -1;
    if (commandColumnIndex >= 0) {
      if (needToExtend) {
        result[i] = extend({
          fixed: isColumnFixing
        }, commandColumns[commandColumnIndex], column);
        if (column.type !== GROUP_COMMAND_COLUMN_NAME) {
          defaultCommandColumns = defaultCommandColumns.filter(callbackFilter);
        }
      } else {
        var columnOptions = {
          visibleIndex: column.visibleIndex,
          index: column.index,
          headerId: column.headerId,
          allowFixing: column.groupIndex === 0,
          allowReordering: column.groupIndex === 0,
          groupIndex: column.groupIndex
        };
        result[i] = extend({}, column, commandColumns[commandColumnIndex], column.type === GROUP_COMMAND_COLUMN_NAME && columnOptions);
      }
    }
  }
  if (columns.length && needToExtend && defaultCommandColumns.length) {
    result = result.concat(defaultCommandColumns);
  }
  return result;
};
export var isColumnFixed = (that, column) => isDefined(column.fixed) || !column.type ? column.fixed : that._isColumnFixing();
export var convertOwnerBandToColumnReference = columns => {
  columns.forEach(column => {
    if (isDefined(column.ownerBand)) {
      column.ownerBand = columns[column.ownerBand];
    }
  });
};
export var resetBandColumnsCache = that => {
  that._bandColumnsCache = undefined;
};
export var findColumn = (columns, identifier) => {
  var identifierOptionName = isString(identifier) && identifier.substr(0, identifier.indexOf(':'));
  var column;
  if (identifier === undefined) return;
  if (identifierOptionName) {
    identifier = identifier.substr(identifierOptionName.length + 1);
  }
  if (identifierOptionName) {
    column = columns.filter(column => "".concat(column[identifierOptionName]) === identifier)[0];
  } else {
    ['index', 'name', 'dataField', 'caption'].some(optionName => {
      column = columns.filter(column => column[optionName] === identifier)[0];
      return !!column;
    });
  }
  return column;
};
export var sortColumns = (columns, sortOrder) => {
  if (sortOrder !== 'asc' && sortOrder !== 'desc') {
    return columns;
  }
  var sign = sortOrder === 'asc' ? 1 : -1;
  columns.sort((column1, column2) => {
    var caption1 = column1.caption || '';
    var caption2 = column2.caption || '';
    return sign * caption1.localeCompare(caption2);
  });
  return columns;
};
export var strictParseNumber = function strictParseNumber(text, format) {
  var parsedValue = numberLocalization.parse(text);
  if (isNumeric(parsedValue)) {
    var formattedValue = numberLocalization.format(parsedValue, format);
    var formattedValueWithDefaultFormat = numberLocalization.format(parsedValue, 'decimal');
    if (formattedValue === text || formattedValueWithDefaultFormat === text) {
      return parsedValue;
    }
  }
};
