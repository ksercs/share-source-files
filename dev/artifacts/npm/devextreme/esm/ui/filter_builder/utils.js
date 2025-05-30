/**
* DevExtreme (esm/ui/filter_builder/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { Deferred, when } from '../../core/utils/deferred';
import { errors as dataErrors } from '../../data/errors';
import { isDefined, isFunction } from '../../core/utils/type';
import { compileGetter } from '../../core/utils/data';
import errors from '../widget/ui.errors';
import filterUtils from '../shared/filtering';
import formatHelper from '../../format_helper';
import { extend } from '../../core/utils/extend';
import { captionize } from '../../core/utils/inflector';
import { getConfig } from './between';
import messageLocalization from '../../localization/message';
import { DataSource } from '../../data/data_source/data_source';
import filterOperationsDictionary from './ui.filter_operations_dictionary';
var DEFAULT_DATA_TYPE = 'string';
var EMPTY_MENU_ICON = 'icon-none';
var AND_GROUP_OPERATION = 'and';
var EQUAL_OPERATION = '=';
var NOT_EQUAL_OPERATION = '<>';
var DATATYPE_OPERATIONS = {
  'number': ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
  'string': ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>', 'isblank', 'isnotblank'],
  'date': ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
  'datetime': ['=', '<>', '<', '>', '<=', '>=', 'isblank', 'isnotblank'],
  'boolean': ['=', '<>', 'isblank', 'isnotblank'],
  'object': ['isblank', 'isnotblank']
};
var DEFAULT_FORMAT = {
  'date': 'shortDate',
  'datetime': 'shortDateShortTime'
};
var LOOKUP_OPERATIONS = ['=', '<>', 'isblank', 'isnotblank'];
var AVAILABLE_FIELD_PROPERTIES = ['caption', 'customizeText', 'dataField', 'dataType', 'editorTemplate', 'falseText', 'editorOptions', 'filterOperations', 'format', 'lookup', 'trueText', 'calculateFilterExpression', 'name'];
var FILTER_BUILDER_CLASS = 'dx-filterbuilder';
var FILTER_BUILDER_ITEM_TEXT_CLASS = FILTER_BUILDER_CLASS + '-text';
var FILTER_BUILDER_ITEM_TEXT_PART_CLASS = FILTER_BUILDER_ITEM_TEXT_CLASS + '-part';
var FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS = FILTER_BUILDER_ITEM_TEXT_CLASS + '-separator';
var FILTER_BUILDER_ITEM_TEXT_SEPARATOR_EMPTY_CLASS = FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS + '-empty';
function getFormattedValueText(field, value) {
  var fieldFormat = field.format || DEFAULT_FORMAT[field.dataType];
  return formatHelper.format(value, fieldFormat);
}
function isNegationGroup(group) {
  return group && group.length > 1 && group[0] === '!' && !isCondition(group);
}
export function getGroupCriteria(group) {
  return isNegationGroup(group) ? group[1] : group;
}
function setGroupCriteria(group, criteria) {
  if (isNegationGroup(group)) {
    group[1] = criteria;
  } else {
    group = criteria;
  }
  return group;
}
function convertGroupToNewStructure(group, value) {
  var isNegationValue = function isNegationValue(value) {
    return value.indexOf('!') !== -1;
  };
  var convertGroupToNegationGroup = function convertGroupToNegationGroup(group) {
    var criteria = group.slice(0);
    group.length = 0;
    group.push('!', criteria);
  };
  var convertNegationGroupToGroup = function convertNegationGroupToGroup(group) {
    var criteria = getGroupCriteria(group);
    group.length = 0;
    [].push.apply(group, criteria);
  };
  if (isNegationValue(value)) {
    if (!isNegationGroup(group)) {
      convertGroupToNegationGroup(group);
    }
  } else if (isNegationGroup(group)) {
    convertNegationGroupToGroup(group);
  }
}
export function setGroupValue(group, value) {
  convertGroupToNewStructure(group, value);
  var criteria = getGroupCriteria(group);
  var i;
  var getNormalizedGroupValue = function getNormalizedGroupValue(value) {
    return value.indexOf('!') === -1 ? value : value.substring(1);
  };
  var changeCriteriaValue = function changeCriteriaValue(criteria, value) {
    for (i = 0; i < criteria.length; i++) {
      if (!Array.isArray(criteria[i])) {
        criteria[i] = value;
      }
    }
  };
  value = getNormalizedGroupValue(value);
  changeCriteriaValue(criteria, value);
  return group;
}
export function getGroupMenuItem(group, availableGroups) {
  var groupValue = getGroupValue(group);
  return availableGroups.filter(function (item) {
    return item.value === groupValue;
  })[0];
}
function getCriteriaOperation(criteria) {
  if (isCondition(criteria)) {
    return AND_GROUP_OPERATION;
  }
  var value = '';
  for (var i = 0; i < criteria.length; i++) {
    var item = criteria[i];
    if (!Array.isArray(item)) {
      if (value && value !== item) {
        throw new dataErrors.Error('E4019');
      }
      if (item !== '!') {
        value = item;
      }
    }
  }
  return value;
}
export function getGroupValue(group) {
  var criteria = getGroupCriteria(group);
  var value = getCriteriaOperation(criteria);
  if (!value) {
    value = AND_GROUP_OPERATION;
  }
  if (criteria !== group) {
    value = '!' + value;
  }
  return value;
}
function getDefaultFilterOperations(field) {
  return field.lookup && LOOKUP_OPERATIONS || DATATYPE_OPERATIONS[field.dataType || DEFAULT_DATA_TYPE];
}
function containItems(entity) {
  return Array.isArray(entity) && entity.length;
}
export function getFilterOperations(field) {
  var result = containItems(field.filterOperations) ? field.filterOperations : getDefaultFilterOperations(field);
  return extend([], result);
}
export function getCaptionByOperation(operation, filterOperationDescriptions) {
  var operationName = filterOperationsDictionary.getNameByFilterOperation(operation);
  return filterOperationDescriptions && filterOperationDescriptions[operationName] ? filterOperationDescriptions[operationName] : operationName;
}
export function getOperationFromAvailable(operation, availableOperations) {
  for (var i = 0; i < availableOperations.length; i++) {
    if (availableOperations[i].value === operation) {
      return availableOperations[i];
    }
  }
  throw new errors.Error('E1048', operation);
}
export function getCustomOperation(customOperations, name) {
  var filteredOperations = customOperations.filter(function (item) {
    return item.name === name;
  });
  return filteredOperations.length ? filteredOperations[0] : null;
}
export function getAvailableOperations(field, filterOperationDescriptions, customOperations) {
  var filterOperations = getFilterOperations(field);
  var isLookupField = !!field.lookup;
  customOperations.forEach(function (customOperation) {
    if (!field.filterOperations && filterOperations.indexOf(customOperation.name) === -1) {
      var dataTypes = customOperation && customOperation.dataTypes;
      var isOperationForbidden = isLookupField ? !!customOperation.notForLookup : false;
      if (!isOperationForbidden && dataTypes && dataTypes.indexOf(field.dataType || DEFAULT_DATA_TYPE) >= 0) {
        filterOperations.push(customOperation.name);
      }
    }
  });
  return filterOperations.map(function (operation) {
    var customOperation = getCustomOperation(customOperations, operation);
    if (customOperation) {
      return {
        icon: customOperation.icon || EMPTY_MENU_ICON,
        text: customOperation.caption || captionize(customOperation.name),
        value: customOperation.name,
        isCustom: true
      };
    } else {
      return {
        icon: filterOperationsDictionary.getIconByFilterOperation(operation) || EMPTY_MENU_ICON,
        text: getCaptionByOperation(operation, filterOperationDescriptions),
        value: operation
      };
    }
  });
}
export function getDefaultOperation(field) {
  return field.defaultFilterOperation || getFilterOperations(field)[0];
}
export function createCondition(field, customOperations) {
  var condition = [field.dataField, '', ''];
  var filterOperation = getDefaultOperation(field);
  updateConditionByOperation(condition, filterOperation, customOperations);
  return condition;
}
export function removeItem(group, item) {
  var criteria = getGroupCriteria(group);
  var index = criteria.indexOf(item);
  criteria.splice(index, 1);
  if (criteria.length !== 1) {
    criteria.splice(index, 1);
  }
  return group;
}
export function createEmptyGroup(value) {
  var isNegation = isNegationGroupOperation(value);
  var groupOperation = isNegation ? getGroupOperationFromNegationOperation(value) : value;
  return isNegation ? ['!', [groupOperation]] : [groupOperation];
}
export function isEmptyGroup(group) {
  var criteria = getGroupCriteria(group);
  if (isCondition(criteria)) {
    return false;
  }
  var hasConditions = criteria.some(function (item) {
    return isCondition(item);
  });
  return !hasConditions;
}
export function addItem(item, group) {
  var criteria = getGroupCriteria(group);
  var groupValue = getGroupValue(criteria);
  criteria.length === 1 ? criteria.unshift(item) : criteria.push(item, groupValue);
  return group;
}
export function getField(dataField, fields) {
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].name === dataField) {
      return fields[i];
    }
    if (fields[i].dataField.toLowerCase() === dataField.toLowerCase()) {
      return fields[i];
    }
  }
  var extendedFields = getItems(fields, true).filter(function (item) {
    return item.dataField.toLowerCase() === dataField.toLowerCase();
  });
  if (extendedFields.length > 0) {
    return extendedFields[0];
  }
  throw new errors.Error('E1047', dataField);
}
export function isGroup(criteria) {
  if (!Array.isArray(criteria)) {
    return false;
  }
  return criteria.length < 2 || Array.isArray(criteria[0]) || Array.isArray(criteria[1]);
}
export function isCondition(criteria) {
  if (!Array.isArray(criteria)) {
    return false;
  }
  return criteria.length > 1 && !Array.isArray(criteria[0]) && !Array.isArray(criteria[1]);
}
function convertToInnerGroup(group, customOperations, defaultGroupOperation) {
  defaultGroupOperation = defaultGroupOperation || AND_GROUP_OPERATION;
  var groupOperation = getCriteriaOperation(group).toLowerCase() || defaultGroupOperation;
  var innerGroup = [];
  for (var i = 0; i < group.length; i++) {
    if (isGroup(group[i])) {
      innerGroup.push(convertToInnerStructure(group[i], customOperations, defaultGroupOperation));
      innerGroup = appendGroupOperationToGroup(innerGroup, groupOperation);
    } else if (isCondition(group[i])) {
      innerGroup.push(convertToInnerCondition(group[i], customOperations));
      innerGroup = appendGroupOperationToGroup(innerGroup, groupOperation);
    }
  }
  if (innerGroup.length === 0) {
    innerGroup = appendGroupOperationToGroup(innerGroup, groupOperation);
  }
  return innerGroup;
}
function conditionHasCustomOperation(condition, customOperations) {
  var customOperation = getCustomOperation(customOperations, condition[1]);
  return customOperation && customOperation.name === condition[1];
}
function convertToInnerCondition(condition, customOperations) {
  if (conditionHasCustomOperation(condition, customOperations)) {
    return condition;
  }
  if (condition.length < 3) {
    condition[2] = condition[1];
    condition[1] = EQUAL_OPERATION;
  }
  return condition;
}
function isNegationGroupOperation(operation) {
  return operation.indexOf('not') !== -1;
}
function getGroupOperationFromNegationOperation(operation) {
  return operation.substring(3).toLowerCase();
}
function appendGroupOperationToCriteria(criteria, groupOperation) {
  var isNegation = isNegationGroupOperation(groupOperation);
  groupOperation = isNegation ? getGroupOperationFromNegationOperation(groupOperation) : groupOperation;
  return isNegation ? ['!', criteria, groupOperation] : [criteria, groupOperation];
}
function appendGroupOperationToGroup(group, groupOperation) {
  var isNegation = isNegationGroupOperation(groupOperation);
  groupOperation = isNegation ? getGroupOperationFromNegationOperation(groupOperation) : groupOperation;
  group.push(groupOperation);
  var result = group;
  if (isNegation) {
    result = ['!', result];
  }
  return result;
}
export function convertToInnerStructure(value, customOperations, defaultGroupOperation) {
  defaultGroupOperation = defaultGroupOperation || AND_GROUP_OPERATION;
  if (!value) {
    return createEmptyGroup(defaultGroupOperation);
  }
  value = extend(true, [], value);
  if (isCondition(value)) {
    return appendGroupOperationToCriteria(convertToInnerCondition(value, customOperations), defaultGroupOperation);
  }
  if (isNegationGroup(value)) {
    return ['!', isCondition(value[1]) ? appendGroupOperationToCriteria(convertToInnerCondition(value[1], customOperations), defaultGroupOperation) : isNegationGroup(value[1]) ? appendGroupOperationToCriteria(convertToInnerStructure(value[1], customOperations), defaultGroupOperation) : convertToInnerGroup(value[1], customOperations, defaultGroupOperation)];
  }
  return convertToInnerGroup(value, customOperations, defaultGroupOperation);
}
export function getNormalizedFields(fields) {
  return fields.reduce(function (result, field) {
    if (isDefined(field.dataField)) {
      var normalizedField = {};
      for (var key in field) {
        if (field[key] && AVAILABLE_FIELD_PROPERTIES.indexOf(key) > -1) {
          normalizedField[key] = field[key];
        }
      }
      normalizedField.defaultCalculateFilterExpression = filterUtils.defaultCalculateFilterExpression;
      if (!isDefined(normalizedField.dataType)) {
        normalizedField.dataType = DEFAULT_DATA_TYPE;
      }
      if (!isDefined(normalizedField.trueText)) {
        normalizedField.trueText = messageLocalization.format('dxDataGrid-trueText');
      }
      if (!isDefined(normalizedField.falseText)) {
        normalizedField.falseText = messageLocalization.format('dxDataGrid-falseText');
      }
      result.push(normalizedField);
    }
    return result;
  }, []);
}
function getConditionFilterExpression(condition, fields, customOperations, target) {
  var field = getField(condition[0], fields);
  var filterExpression = convertToInnerCondition(condition, customOperations);
  var customOperation = customOperations.length && getCustomOperation(customOperations, filterExpression[1]);
  if (customOperation && customOperation.calculateFilterExpression) {
    return customOperation.calculateFilterExpression.apply(customOperation, [filterExpression[2], field, fields]);
  } else if (field.createFilterExpression) {
    return field.createFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target]);
  } else if (field.calculateFilterExpression) {
    return field.calculateFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target]);
  } else {
    return field.defaultCalculateFilterExpression.apply(field, [filterExpression[2], filterExpression[1], target]);
  }
}
export function getFilterExpression(value, fields, customOperations, target) {
  if (!isDefined(value)) {
    return null;
  }
  if (isNegationGroup(value)) {
    var filterExpression = getFilterExpression(value[1], fields, customOperations, target);
    return ['!', filterExpression];
  }
  var criteria = getGroupCriteria(value);
  if (isCondition(criteria)) {
    return getConditionFilterExpression(criteria, fields, customOperations, target) || null;
  } else {
    var result = [];
    var _filterExpression;
    var groupValue = getGroupValue(criteria);
    for (var i = 0; i < criteria.length; i++) {
      if (isGroup(criteria[i])) {
        _filterExpression = getFilterExpression(criteria[i], fields, customOperations, target);
        if (_filterExpression) {
          i && result.push(groupValue);
          result.push(_filterExpression);
        }
      } else if (isCondition(criteria[i])) {
        _filterExpression = getConditionFilterExpression(criteria[i], fields, customOperations, target);
        if (_filterExpression) {
          result.length && result.push(groupValue);
          result.push(_filterExpression);
        }
      }
    }
    if (result.length === 1) {
      result = result[0];
    }
    return result.length ? result : null;
  }
}
export function getNormalizedFilter(group) {
  var criteria = getGroupCriteria(group);
  var i;
  if (criteria.length === 0) {
    return null;
  }
  var itemsForRemove = [];
  for (i = 0; i < criteria.length; i++) {
    if (isGroup(criteria[i])) {
      var normalizedGroupValue = getNormalizedFilter(criteria[i]);
      if (normalizedGroupValue) {
        criteria[i] = normalizedGroupValue;
      } else {
        itemsForRemove.push(criteria[i]);
      }
    } else if (isCondition(criteria[i])) {
      if (!isValidCondition(criteria[i])) {
        itemsForRemove.push(criteria[i]);
      }
    }
  }
  for (i = 0; i < itemsForRemove.length; i++) {
    removeItem(criteria, itemsForRemove[i]);
  }
  if (criteria.length === 1) {
    return null;
  }
  criteria.splice(criteria.length - 1, 1);
  if (criteria.length === 1) {
    group = setGroupCriteria(group, criteria[0]);
  }
  if (group.length === 0) {
    return null;
  }
  return group;
}
export function getCurrentLookupValueText(field, value, handler) {
  if (value === '') {
    handler('');
    return;
  }
  var lookup = field.lookup;
  if (lookup.items) {
    handler(lookup.calculateCellValue(value) || '');
  } else {
    var lookupDataSource = isFunction(lookup.dataSource) ? lookup.dataSource({}) : lookup.dataSource;
    var dataSource = new DataSource(lookupDataSource);
    dataSource.loadSingle(lookup.valueExpr, value).done(function (result) {
      var valueText = '';
      if (result) {
        valueText = lookup.displayExpr ? compileGetter(lookup.displayExpr)(result) : result;
      }
      if (field.customizeText) {
        valueText = field.customizeText({
          value,
          valueText
        });
      }
      handler(valueText);
    }).fail(function () {
      handler('');
    });
  }
}
function getPrimitiveValueText(field, value, customOperation, target, options) {
  var valueText;
  if (value === true) {
    valueText = field.trueText || messageLocalization.format('dxDataGrid-trueText');
  } else if (value === false) {
    valueText = field.falseText || messageLocalization.format('dxDataGrid-falseText');
  } else {
    valueText = getFormattedValueText(field, value);
  }
  if (field.customizeText) {
    valueText = field.customizeText.call(field, {
      value: value,
      valueText: valueText,
      target: target
    });
  }
  if (customOperation && customOperation.customizeText) {
    valueText = customOperation.customizeText.call(customOperation, {
      value: value,
      valueText: valueText,
      field: field,
      target: target
    }, options);
  }
  return valueText;
}
function getArrayValueText(field, value, customOperation, target) {
  var options = {
    values: value
  };
  return value.map(v => getPrimitiveValueText(field, v, customOperation, target, options));
}
function checkDefaultValue(value) {
  return value === '' || value === null;
}
export function getCurrentValueText(field, value, customOperation) {
  var target = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'filterBuilder';
  if (checkDefaultValue(value)) {
    return '';
  }
  if (Array.isArray(value)) {
    var result = new Deferred();
    when.apply(this, getArrayValueText(field, value, customOperation, target)).done(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var text = args.some(item => !checkDefaultValue(item)) ? args.map(item => !checkDefaultValue(item) ? item : '?') : '';
      result.resolve(text);
    });
    return result;
  } else {
    return getPrimitiveValueText(field, value, customOperation, target);
  }
}
function itemExists(plainItems, parentId) {
  return plainItems.some(function (item) {
    return item.dataField === parentId;
  });
}
function pushItemAndCheckParent(originalItems, plainItems, item) {
  var dataField = item.dataField;
  if (hasParent(dataField)) {
    item.parentId = getParentIdFromItemDataField(dataField);
    if (!itemExists(plainItems, item.parentId) && !itemExists(originalItems, item.parentId)) {
      pushItemAndCheckParent(originalItems, plainItems, {
        id: item.parentId,
        dataType: 'object',
        dataField: item.parentId,
        caption: generateCaptionByDataField(item.parentId, true),
        filterOperations: ['isblank', 'isnotblank'],
        defaultCalculateFilterExpression: filterUtils.defaultCalculateFilterExpression
      });
    }
  }
  plainItems.push(item);
}
function generateCaptionByDataField(dataField, allowHierarchicalFields) {
  var caption = '';
  if (allowHierarchicalFields) {
    dataField = dataField.substring(dataField.lastIndexOf('.') + 1);
  } else if (hasParent(dataField)) {
    dataField.split('.').forEach(function (field, index, arr) {
      caption += captionize(field);
      if (index !== arr.length - 1) {
        caption += '.';
      }
    });
    return caption;
  }
  return captionize(dataField);
}
export function getItems(fields, allowHierarchicalFields) {
  var items = [];
  for (var i = 0; i < fields.length; i++) {
    var item = extend(true, {
      caption: generateCaptionByDataField(fields[i].dataField, allowHierarchicalFields)
    }, fields[i]);
    item.id = item.name || item.dataField;
    if (allowHierarchicalFields) {
      pushItemAndCheckParent(fields, items, item);
    } else {
      items.push(item);
    }
  }
  return items;
}
function hasParent(dataField) {
  return dataField.lastIndexOf('.') !== -1;
}
function getParentIdFromItemDataField(dataField) {
  return dataField.substring(0, dataField.lastIndexOf('.'));
}
export function getCaptionWithParents(item, plainItems) {
  if (hasParent(item.dataField)) {
    var parentId = getParentIdFromItemDataField(item.dataField);
    for (var i = 0; i < plainItems.length; i++) {
      if (plainItems[i].dataField === parentId) {
        return getCaptionWithParents(plainItems[i], plainItems) + '.' + item.caption;
      }
    }
  }
  return item.caption;
}
export function updateConditionByOperation(condition, operation, customOperations) {
  var customOperation = getCustomOperation(customOperations, operation);
  if (customOperation) {
    if (customOperation.hasValue === false) {
      condition[1] = operation;
      condition.length = 2;
    } else {
      condition[1] = operation;
      condition[2] = '';
    }
    return condition;
  }
  if (operation === 'isblank') {
    condition[1] = EQUAL_OPERATION;
    condition[2] = null;
  } else if (operation === 'isnotblank') {
    condition[1] = NOT_EQUAL_OPERATION;
    condition[2] = null;
  } else {
    customOperation = getCustomOperation(customOperations, condition[1]);
    if (customOperation || condition.length === 2 || condition[2] === null) {
      condition[2] = '';
    }
    condition[1] = operation;
  }
  return condition;
}
export function getOperationValue(condition) {
  var caption;
  if (condition[2] === null) {
    if (condition[1] === EQUAL_OPERATION) {
      caption = 'isblank';
    } else {
      caption = 'isnotblank';
    }
  } else {
    caption = condition[1];
  }
  return caption;
}
export function isValidCondition(condition) {
  return condition[2] !== '';
}
export function getMergedOperations(customOperations, betweenCaption, context) {
  var result = extend(true, [], customOperations);
  var betweenIndex = -1;
  result.some(function (customOperation, index) {
    if (customOperation.name === 'between') {
      betweenIndex = index;
      return true;
    }
  });
  if (betweenIndex !== -1) {
    result[betweenIndex] = extend(getConfig(betweenCaption, context), result[betweenIndex]);
  } else {
    result.unshift(getConfig(betweenCaption, context));
  }
  return result;
}
function isMatchedCondition(filter, addedFilterDataField) {
  return filter[0] === addedFilterDataField;
}
export function removeFieldConditionsFromFilter(filter, dataField) {
  if (!filter || filter.length === 0) {
    return null;
  }
  if (isCondition(filter)) {
    var hasMatchedCondition = isMatchedCondition(filter, dataField);
    return !hasMatchedCondition ? filter : null;
  } else {
    return syncConditionIntoGroup(filter, [dataField], false);
  }
}
function syncConditionIntoGroup(filter, addedFilter, canPush) {
  var result = [];
  filter.forEach(function (item) {
    if (isCondition(item)) {
      if (isMatchedCondition(item, addedFilter[0])) {
        if (canPush) {
          result.push(addedFilter);
          canPush = false;
        } else {
          result.splice(result.length - 1, 1);
        }
      } else {
        result.push(item);
      }
    } else {
      (result.length || isGroup(item)) && result.push(item);
    }
  });
  if (result.length === 0) {
    return null;
  }
  if (canPush) {
    result.push(AND_GROUP_OPERATION);
    result.push(addedFilter);
  }
  return result.length === 1 ? result[0] : result;
}
export function syncFilters(filter, addedFilter) {
  if (filter === null || filter.length === 0) {
    return addedFilter;
  }
  if (isCondition(filter)) {
    if (isMatchedCondition(filter, addedFilter[0])) {
      return addedFilter;
    } else {
      return [filter, AND_GROUP_OPERATION, addedFilter];
    }
  }
  var groupValue = getGroupValue(filter);
  if (groupValue !== AND_GROUP_OPERATION) {
    return [addedFilter, 'and', filter];
  }
  return syncConditionIntoGroup(filter, addedFilter, true);
}
export function getMatchedConditions(filter, dataField) {
  if (filter === null || filter.length === 0) return [];
  if (isCondition(filter)) {
    if (isMatchedCondition(filter, dataField)) {
      return [filter];
    } else {
      return [];
    }
  }
  var groupValue = getGroupValue(filter);
  if (groupValue !== AND_GROUP_OPERATION) {
    return [];
  }
  var result = filter.filter(function (item) {
    return isCondition(item) && isMatchedCondition(item, dataField);
  });
  return result;
}
export function filterHasField(filter, dataField) {
  if (filter === null || filter.length === 0) return false;
  if (isCondition(filter)) {
    return filter[0] === dataField;
  }
  return filter.some(function (item) {
    return (isCondition(item) || isGroup(item)) && filterHasField(item, dataField);
  });
}
export var renderValueText = function renderValueText($container, value, customOperation) {
  if (Array.isArray(value)) {
    var lastItemIndex = value.length - 1;
    $container.empty();
    value.forEach((t, i) => {
      $('<span>').addClass(FILTER_BUILDER_ITEM_TEXT_PART_CLASS).text(t).appendTo($container);
      if (i !== lastItemIndex) {
        $('<span>').addClass(FILTER_BUILDER_ITEM_TEXT_SEPARATOR_CLASS).text(customOperation && customOperation.valueSeparator ? customOperation.valueSeparator : '|').addClass(FILTER_BUILDER_ITEM_TEXT_SEPARATOR_EMPTY_CLASS).appendTo($container);
      }
    });
  } else if (value) {
    $container.text(value);
  } else {
    $container.text(messageLocalization.format('dxFilterBuilder-enterValueText'));
  }
};
