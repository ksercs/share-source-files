/**
* DevExtreme (bundles/__internal/scheduler/resources/m_utils.js)
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
exports.setResourceToAppointment = exports.reduceResourcesTree = exports.loadResources = exports.isResourceMultiple = exports.groupAppointmentsByResourcesCore = exports.groupAppointmentsByResources = exports.getWrappedDataSource = exports.getValueExpr = exports.getResourcesDataByGroups = exports.getResourceTreeLeaves = exports.getResourceColor = exports.getResourceByField = exports.getPathToLeaf = exports.getPaintedResources = exports.getOrLoadResourceItem = exports.getNormalizedResources = exports.getGroupsObjectFromGroupsArray = exports.getGroupCount = exports.getFieldExpr = exports.getDisplayExpr = exports.getDataAccessors = exports.getCellGroups = exports.getAppointmentColor = exports.getAllGroups = exports.filterResources = exports.createResourcesTree = exports.createResourceEditorModel = exports.createReducedResourcesTree = exports.createExpressions = void 0;
var _array = require("../../../core/utils/array");
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _object = require("../../../core/utils/object");
var _type = require("../../../core/utils/type");
var _data_source = require("../../../data/data_source/data_source");
var _utils = require("../../../data/data_source/utils");
var _hasResourceValue = require("../../../renovation/ui/scheduler/resources/hasResourceValue");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getValueExpr = function getValueExpr(resource) {
  return resource.valueExpr || 'id';
};
exports.getValueExpr = getValueExpr;
var getDisplayExpr = function getDisplayExpr(resource) {
  return resource.displayExpr || 'text';
};
exports.getDisplayExpr = getDisplayExpr;
var getFieldExpr = function getFieldExpr(resource) {
  return resource.fieldExpr || resource.field;
};
exports.getFieldExpr = getFieldExpr;
var getWrappedDataSource = function getWrappedDataSource(dataSource) {
  if (dataSource instanceof _data_source.DataSource) {
    return dataSource;
  }
  var result = _extends(_extends({}, (0, _utils.normalizeDataSourceOptions)(dataSource)), {
    pageSize: 0
  });
  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }
  return new _data_source.DataSource(result);
};
exports.getWrappedDataSource = getWrappedDataSource;
var createResourcesTree = function createResourcesTree(groups) {
  var leafIndex = 0;
  var make = function make(group, groupIndex, result, parent) {
    var _a;
    result = result || [];
    for (var itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
      var currentGroupItem = group.items[itemIndex];
      var resultItem = {
        name: group.name,
        value: currentGroupItem.id,
        title: currentGroupItem.text,
        data: (_a = group.data) === null || _a === void 0 ? void 0 : _a[itemIndex],
        children: [],
        parent: parent || null
      };
      var nextGroupIndex = groupIndex + 1;
      if (groups[nextGroupIndex]) {
        make(groups[nextGroupIndex], nextGroupIndex, resultItem.children, resultItem);
      }
      if (!resultItem.children.length) {
        resultItem.leafIndex = leafIndex;
        leafIndex++;
      }
      result.push(resultItem);
    }
    return result;
  };
  return make(groups[0], 0);
};
exports.createResourcesTree = createResourcesTree;
var getPathToLeaf = function getPathToLeaf(leafIndex, groups) {
  var tree = createResourcesTree(groups);
  var findLeafByIndex = function findLeafByIndex(data, index) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].leafIndex === index) {
        return data[i];
      }
      var _leaf = findLeafByIndex(data[i].children, index);
      if (_leaf) {
        return _leaf;
      }
    }
  };
  var makeBranch = function makeBranch(leaf, result) {
    result = result || [];
    result.push(leaf.value);
    if (leaf.parent) {
      makeBranch(leaf.parent, result);
    }
    return result;
  };
  var leaf = findLeafByIndex(tree, leafIndex);
  return makeBranch(leaf).reverse();
};
// TODO rework
exports.getPathToLeaf = getPathToLeaf;
var getCellGroups = function getCellGroups(groupIndex, groups) {
  var result = [];
  if (getGroupCount(groups)) {
    if (groupIndex < 0) {
      return;
    }
    var path = getPathToLeaf(groupIndex, groups);
    for (var i = 0; i < groups.length; i++) {
      result.push({
        name: groups[i].name,
        id: path[i]
      });
    }
  }
  return result;
};
exports.getCellGroups = getCellGroups;
var getGroupCount = function getGroupCount(groups) {
  var result = 0;
  for (var i = 0, len = groups.length; i < len; i++) {
    if (!i) {
      result = groups[i].items.length;
    } else {
      result *= groups[i].items.length;
    }
  }
  return result;
};
exports.getGroupCount = getGroupCount;
var getGroupsObjectFromGroupsArray = function getGroupsObjectFromGroupsArray(groupsArray) {
  return groupsArray.reduce(function (currentGroups, _ref) {
    var name = _ref.name,
      id = _ref.id;
    return _extends(_extends({}, currentGroups), {
      [name]: id
    });
  }, {});
};
exports.getGroupsObjectFromGroupsArray = getGroupsObjectFromGroupsArray;
var getAllGroups = function getAllGroups(groups) {
  var groupCount = getGroupCount(groups);
  return _toConsumableArray(new Array(groupCount)).map(function (_, groupIndex) {
    var groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};
exports.getAllGroups = getAllGroups;
var getResourceByField = function getResourceByField(fieldName, loadedResources) {
  for (var i = 0; i < loadedResources.length; i++) {
    var resource = loadedResources[i];
    if (resource.name === fieldName) {
      return resource.data;
    }
  }
  return [];
};
exports.getResourceByField = getResourceByField;
var createResourceEditorModel = function createResourceEditorModel(resources, loadedResources) {
  return resources.map(function (resource) {
    var dataField = getFieldExpr(resource);
    var dataSource = getResourceByField(dataField, loadedResources);
    return {
      editorOptions: {
        dataSource: dataSource.length ? dataSource : getWrappedDataSource(resource.dataSource),
        displayExpr: getDisplayExpr(resource),
        valueExpr: getValueExpr(resource)
      },
      dataField,
      editorType: resource.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
      label: {
        text: resource.label || dataField
      }
    };
  });
};
exports.createResourceEditorModel = createResourceEditorModel;
var isResourceMultiple = function isResourceMultiple(resources, resourceField) {
  var resource = resources.find(function (resource) {
    var field = getFieldExpr(resource);
    return field === resourceField;
  });
  return !!(resource === null || resource === void 0 ? void 0 : resource.allowMultiple);
};
exports.isResourceMultiple = isResourceMultiple;
var filterResources = function filterResources(resources, fields) {
  return resources.filter(function (resource) {
    var field = getFieldExpr(resource);
    return fields.indexOf(field) > -1;
  });
};
exports.filterResources = filterResources;
var getPaintedResources = function getPaintedResources(resources, groups) {
  var newGroups = groups || [];
  var result = resources.find(function (resource) {
    return resource.useColorAsDefault;
  });
  if (result) {
    return result;
  }
  var newResources = newGroups.length ? filterResources(resources, newGroups) : resources;
  return newResources[newResources.length - 1];
};
exports.getPaintedResources = getPaintedResources;
var getOrLoadResourceItem = function getOrLoadResourceItem(resources, resourceLoaderMap, field, value) {
  // @ts-expect-error
  var result = new _deferred.Deferred();
  resources.filter(function (resource) {
    return getFieldExpr(resource) === field && (0, _type.isDefined)(resource.dataSource);
  }).forEach(function (resource) {
    var wrappedDataSource = getWrappedDataSource(resource.dataSource);
    var valueExpr = getValueExpr(resource);
    if (!resourceLoaderMap.has(field)) {
      resourceLoaderMap.set(field, wrappedDataSource.load());
    }
    resourceLoaderMap.get(field).done(function (data) {
      var getter = (0, _data.compileGetter)(valueExpr);
      var filteredData = data.filter(function (resource) {
        return (0, _common.equalByValue)(getter(resource), value);
      });
      result.resolve(filteredData[0]);
    }).fail(function () {
      resourceLoaderMap.delete(field);
      result.reject();
    });
  });
  return result.promise();
};
exports.getOrLoadResourceItem = getOrLoadResourceItem;
var getDataAccessors = function getDataAccessors(dataAccessors, fieldName, type) {
  var actions = dataAccessors[type];
  return actions[fieldName];
};
exports.getDataAccessors = getDataAccessors;
var groupAppointmentsByResources = function groupAppointmentsByResources(config, appointments) {
  var groups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var result = {
    0: appointments
  };
  if (groups.length && config.loadedResources.length) {
    result = groupAppointmentsByResourcesCore(config, appointments, config.loadedResources);
  }
  var totalResourceCount = 0;
  config.loadedResources.forEach(function (resource, index) {
    if (!index) {
      totalResourceCount = resource.items.length;
    } else {
      totalResourceCount *= resource.items.length;
    }
  });
  for (var index = 0; index < totalResourceCount; index++) {
    var key = index.toString();
    if (result[key]) {
      continue;
    }
    result[key] = [];
  }
  return result;
};
exports.groupAppointmentsByResources = groupAppointmentsByResources;
var groupAppointmentsByResourcesCore = function groupAppointmentsByResourcesCore(config, appointments, resources) {
  var tree = createResourcesTree(resources);
  var result = {};
  appointments.forEach(function (appointment) {
    var treeLeaves = getResourceTreeLeaves(function (field, action) {
      return getDataAccessors(config.dataAccessors, field, action);
    }, tree, appointment);
    for (var i = 0; i < treeLeaves.length; i++) {
      if (!result[treeLeaves[i]]) {
        result[treeLeaves[i]] = [];
      }
      // NOTE: check appointment before pushing
      result[treeLeaves[i]].push((0, _object.deepExtendArraySafe)({}, appointment, true));
    }
  });
  return result;
};
exports.groupAppointmentsByResourcesCore = groupAppointmentsByResourcesCore;
var getResourceTreeLeaves = function getResourceTreeLeaves(getDataAccessors, tree, rawAppointment, result) {
  result = result || [];
  for (var i = 0; i < tree.length; i++) {
    if (!hasGroupItem(getDataAccessors, rawAppointment, tree[i].name, tree[i].value)) {
      continue;
    }
    if ((0, _type.isDefined)(tree[i].leafIndex)) {
      result.push(tree[i].leafIndex);
    }
    if (tree[i].children) {
      getResourceTreeLeaves(getDataAccessors, tree[i].children, rawAppointment, result);
    }
  }
  return result;
};
exports.getResourceTreeLeaves = getResourceTreeLeaves;
var hasGroupItem = function hasGroupItem(getDataAccessors, rawAppointment, groupName, itemValue) {
  var resourceValue = getDataAccessors(groupName, 'getter')(rawAppointment);
  return (0, _hasResourceValue.hasResourceValue)((0, _array.wrapToArray)(resourceValue), itemValue);
};
var createReducedResourcesTree = function createReducedResourcesTree(loadedResources, getDataAccessors, appointments) {
  var tree = createResourcesTree(loadedResources);
  return reduceResourcesTree(getDataAccessors, tree, appointments);
};
exports.createReducedResourcesTree = createReducedResourcesTree;
var reduceResourcesTree = function reduceResourcesTree(getDataAccessors, tree, existingAppointments, _result) {
  _result = _result ? _result.children : [];
  tree.forEach(function (node, index) {
    var ok = false;
    var resourceName = node.name;
    var resourceValue = node.value;
    var resourceTitle = node.title;
    var resourceData = node.data;
    var resourceGetter = getDataAccessors(resourceName, 'getter');
    existingAppointments.forEach(function (appointment) {
      if (!ok) {
        var resourceFromAppointment = resourceGetter(appointment);
        if (Array.isArray(resourceFromAppointment)) {
          if (resourceFromAppointment.includes(resourceValue)) {
            _result.push({
              name: resourceName,
              value: resourceValue,
              title: resourceTitle,
              data: resourceData,
              children: []
            });
            ok = true;
          }
        } else if (resourceFromAppointment === resourceValue) {
          _result.push({
            name: resourceName,
            value: resourceValue,
            title: resourceTitle,
            data: resourceData,
            children: []
          });
          ok = true;
        }
      }
    });
    if (ok && node.children && node.children.length) {
      reduceResourcesTree(getDataAccessors, node.children, existingAppointments, _result[index]);
    }
  });
  return _result;
};
exports.reduceResourcesTree = reduceResourcesTree;
var getResourcesDataByGroups = function getResourcesDataByGroups(loadedResources, resources, groups) {
  if (!groups || !groups.length) {
    return loadedResources;
  }
  var fieldNames = {};
  var currentResourcesData = [];
  groups.forEach(function (group) {
    (0, _iterator.each)(group, function (name, value) {
      fieldNames[name] = value;
    });
  });
  var resourceData = loadedResources.filter(function (_ref2) {
    var name = _ref2.name;
    return (0, _type.isDefined)(fieldNames[name]);
  });
  resourceData.forEach(function (data) {
    return currentResourcesData.push((0, _extend.extend)({}, data));
  });
  currentResourcesData.forEach(function (currentResource) {
    var items = currentResource.items,
      data = currentResource.data,
      resourceName = currentResource.name;
    var resource = filterResources(resources, [resourceName])[0] || {};
    var valueExpr = getValueExpr(resource);
    var filteredItems = [];
    var filteredData = [];
    groups.filter(function (group) {
      return (0, _type.isDefined)(group[resourceName]);
    }).forEach(function (group) {
      (0, _iterator.each)(group, function (name, value) {
        if (!filteredItems.filter(function (item) {
          return item.id === value && item[valueExpr] === name;
        }).length) {
          var currentItems = items.filter(function (item) {
            return item.id === value;
          });
          var currentData = data.filter(function (item) {
            return item[valueExpr] === value;
          });
          filteredItems.push.apply(filteredItems, _toConsumableArray(currentItems));
          filteredData.push.apply(filteredData, _toConsumableArray(currentData));
        }
      });
    });
    currentResource.items = filteredItems;
    currentResource.data = filteredData;
  });
  return currentResourcesData;
};
exports.getResourcesDataByGroups = getResourcesDataByGroups;
var setResourceToAppointment = function setResourceToAppointment(resources, dataAccessors, appointment, groups) {
  var resourcesSetter = dataAccessors.setter;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (var name in groups) {
    var resourceData = groups[name];
    var value = isResourceMultiple(resources, name) ? (0, _array.wrapToArray)(resourceData) : resourceData;
    resourcesSetter[name](appointment, value);
  }
};
exports.setResourceToAppointment = setResourceToAppointment;
var getResourceColor = function getResourceColor(resources, resourceLoaderMap, field, value) {
  // @ts-expect-error
  var result = new _deferred.Deferred();
  var resource = filterResources(resources, [field])[0] || {};
  var colorExpr = resource.colorExpr || 'color';
  var colorGetter = (0, _data.compileGetter)(colorExpr);
  getOrLoadResourceItem(resources, resourceLoaderMap, field, value).done(function (resource) {
    return result.resolve(colorGetter(resource));
  }).fail(function () {
    return result.reject();
  });
  return result.promise();
};
exports.getResourceColor = getResourceColor;
var getAppointmentColor = function getAppointmentColor(resourceConfig, appointmentConfig) {
  var resources = resourceConfig.resources,
    dataAccessors = resourceConfig.dataAccessors,
    loadedResources = resourceConfig.loadedResources,
    resourceLoaderMap = resourceConfig.resourceLoaderMap;
  var groupIndex = appointmentConfig.groupIndex,
    groups = appointmentConfig.groups,
    itemData = appointmentConfig.itemData;
  var paintedResources = getPaintedResources(resources || [], groups);
  if (paintedResources) {
    var field = getFieldExpr(paintedResources);
    var cellGroups = getCellGroups(groupIndex, loadedResources);
    var resourcesDataAccessors = getDataAccessors(dataAccessors, field, 'getter');
    var resourceValues = (0, _array.wrapToArray)(resourcesDataAccessors(itemData));
    var groupId = resourceValues[0];
    for (var i = 0; i < cellGroups.length; i++) {
      if (cellGroups[i].name === field) {
        groupId = cellGroups[i].id;
        break;
      }
    }
    return getResourceColor(resources, resourceLoaderMap, field, groupId);
  }
  // @ts-expect-error
  return new _deferred.Deferred().resolve().promise();
};
exports.getAppointmentColor = getAppointmentColor;
var createExpressions = function createExpressions() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = {
    getter: {},
    setter: {}
  };
  resources.forEach(function (resource) {
    var field = getFieldExpr(resource);
    result.getter[field] = (0, _data.compileGetter)(field);
    result.setter[field] = (0, _data.compileSetter)(field);
  });
  return result;
};
exports.createExpressions = createExpressions;
var getTransformedResourceData = function getTransformedResourceData(resource, data) {
  var valueGetter = (0, _data.compileGetter)(getValueExpr(resource));
  var displayGetter = (0, _data.compileGetter)(getDisplayExpr(resource));
  return data.map(function (item) {
    var result = {
      id: valueGetter(item),
      text: displayGetter(item)
    };
    if (item.color) {
      // TODO for passed tests
      result.color = item.color;
    }
    return result;
  });
};
var loadResources = function loadResources(groups, resources, resourceLoaderMap) {
  // @ts-expect-error
  var result = new _deferred.Deferred();
  var deferreds = [];
  var newGroups = groups || [];
  var newResources = resources || [];
  var loadedResources = [];
  filterResources(newResources, newGroups).forEach(function (resource) {
    // @ts-expect-error
    var deferred = new _deferred.Deferred();
    var name = getFieldExpr(resource);
    deferreds.push(deferred);
    var dataSourcePromise = getWrappedDataSource(resource.dataSource).load();
    resourceLoaderMap.set(name, dataSourcePromise);
    dataSourcePromise.done(function (data) {
      var items = getTransformedResourceData(resource, data);
      deferred.resolve({
        name,
        items,
        data
      });
    }).fail(function () {
      return deferred.reject();
    });
  });
  if (!deferreds.length) {
    return result.resolve(loadedResources);
  }
  _deferred.when.apply(null, deferreds).done(function () {
    for (var _len = arguments.length, resources = new Array(_len), _key = 0; _key < _len; _key++) {
      resources[_key] = arguments[_key];
    }
    var hasEmpty = resources.some(function (r) {
      return r.items.length === 0;
    });
    loadedResources = hasEmpty ? [] : resources;
    result.resolve(loadedResources);
  }).fail(function () {
    return result.reject();
  });
  return result.promise();
};
exports.loadResources = loadResources;
var getNormalizedResources = function getNormalizedResources(rawAppointment, dataAccessors, resources) {
  var result = {};
  (0, _iterator.each)(dataAccessors.resources.getter, function (fieldName) {
    var value = dataAccessors.resources.getter[fieldName](rawAppointment);
    if ((0, _type.isDefined)(value)) {
      var isMultiple = isResourceMultiple(resources, fieldName);
      var resourceValue = isMultiple ? (0, _array.wrapToArray)(value) : value;
      result[fieldName] = resourceValue;
    }
  });
  return result;
};
exports.getNormalizedResources = getNormalizedResources;
