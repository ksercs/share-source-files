/**
* DevExtreme (esm/__internal/scheduler/resources/m_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { wrapToArray } from '../../../core/utils/array';
import { equalByValue } from '../../../core/utils/common';
import { compileGetter, compileSetter } from '../../../core/utils/data';
import { Deferred, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { deepExtendArraySafe } from '../../../core/utils/object';
import { isDefined } from '../../../core/utils/type';
import { DataSource } from '../../../data/data_source/data_source';
import { normalizeDataSourceOptions } from '../../../data/data_source/utils';
import { hasResourceValue } from '../../../renovation/ui/scheduler/resources/hasResourceValue';
export var getValueExpr = resource => resource.valueExpr || 'id';
export var getDisplayExpr = resource => resource.displayExpr || 'text';
export var getFieldExpr = resource => resource.fieldExpr || resource.field;
export var getWrappedDataSource = dataSource => {
  if (dataSource instanceof DataSource) {
    return dataSource;
  }
  var result = _extends(_extends({}, normalizeDataSourceOptions(dataSource)), {
    pageSize: 0
  });
  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }
  return new DataSource(result);
};
export var createResourcesTree = groups => {
  var leafIndex = 0;
  var make = (group, groupIndex, result, parent) => {
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
export var getPathToLeaf = (leafIndex, groups) => {
  var tree = createResourcesTree(groups);
  var findLeafByIndex = (data, index) => {
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
  var makeBranch = (leaf, result) => {
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
export var getCellGroups = (groupIndex, groups) => {
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
export var getGroupCount = groups => {
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
export var getGroupsObjectFromGroupsArray = groupsArray => groupsArray.reduce((currentGroups, _ref) => {
  var {
    name,
    id
  } = _ref;
  return _extends(_extends({}, currentGroups), {
    [name]: id
  });
}, {});
export var getAllGroups = groups => {
  var groupCount = getGroupCount(groups);
  return [...new Array(groupCount)].map((_, groupIndex) => {
    var groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};
export var getResourceByField = (fieldName, loadedResources) => {
  for (var i = 0; i < loadedResources.length; i++) {
    var resource = loadedResources[i];
    if (resource.name === fieldName) {
      return resource.data;
    }
  }
  return [];
};
export var createResourceEditorModel = (resources, loadedResources) => resources.map(resource => {
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
export var isResourceMultiple = (resources, resourceField) => {
  var resource = resources.find(resource => {
    var field = getFieldExpr(resource);
    return field === resourceField;
  });
  return !!(resource === null || resource === void 0 ? void 0 : resource.allowMultiple);
};
export var filterResources = (resources, fields) => resources.filter(resource => {
  var field = getFieldExpr(resource);
  return fields.indexOf(field) > -1;
});
export var getPaintedResources = (resources, groups) => {
  var newGroups = groups || [];
  var result = resources.find(resource => resource.useColorAsDefault);
  if (result) {
    return result;
  }
  var newResources = newGroups.length ? filterResources(resources, newGroups) : resources;
  return newResources[newResources.length - 1];
};
export var getOrLoadResourceItem = (resources, resourceLoaderMap, field, value) => {
  // @ts-expect-error
  var result = new Deferred();
  resources.filter(resource => getFieldExpr(resource) === field && isDefined(resource.dataSource)).forEach(resource => {
    var wrappedDataSource = getWrappedDataSource(resource.dataSource);
    var valueExpr = getValueExpr(resource);
    if (!resourceLoaderMap.has(field)) {
      resourceLoaderMap.set(field, wrappedDataSource.load());
    }
    resourceLoaderMap.get(field).done(data => {
      var getter = compileGetter(valueExpr);
      var filteredData = data.filter(resource => equalByValue(getter(resource), value));
      result.resolve(filteredData[0]);
    }).fail(() => {
      resourceLoaderMap.delete(field);
      result.reject();
    });
  });
  return result.promise();
};
export var getDataAccessors = (dataAccessors, fieldName, type) => {
  var actions = dataAccessors[type];
  return actions[fieldName];
};
export var groupAppointmentsByResources = function groupAppointmentsByResources(config, appointments) {
  var groups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var result = {
    0: appointments
  };
  if (groups.length && config.loadedResources.length) {
    result = groupAppointmentsByResourcesCore(config, appointments, config.loadedResources);
  }
  var totalResourceCount = 0;
  config.loadedResources.forEach((resource, index) => {
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
export var groupAppointmentsByResourcesCore = (config, appointments, resources) => {
  var tree = createResourcesTree(resources);
  var result = {};
  appointments.forEach(appointment => {
    var treeLeaves = getResourceTreeLeaves((field, action) => getDataAccessors(config.dataAccessors, field, action), tree, appointment);
    for (var i = 0; i < treeLeaves.length; i++) {
      if (!result[treeLeaves[i]]) {
        result[treeLeaves[i]] = [];
      }
      // NOTE: check appointment before pushing
      result[treeLeaves[i]].push(deepExtendArraySafe({}, appointment, true));
    }
  });
  return result;
};
export var getResourceTreeLeaves = (getDataAccessors, tree, rawAppointment, result) => {
  result = result || [];
  for (var i = 0; i < tree.length; i++) {
    if (!hasGroupItem(getDataAccessors, rawAppointment, tree[i].name, tree[i].value)) {
      continue;
    }
    if (isDefined(tree[i].leafIndex)) {
      result.push(tree[i].leafIndex);
    }
    if (tree[i].children) {
      getResourceTreeLeaves(getDataAccessors, tree[i].children, rawAppointment, result);
    }
  }
  return result;
};
var hasGroupItem = (getDataAccessors, rawAppointment, groupName, itemValue) => {
  var resourceValue = getDataAccessors(groupName, 'getter')(rawAppointment);
  return hasResourceValue(wrapToArray(resourceValue), itemValue);
};
export var createReducedResourcesTree = (loadedResources, getDataAccessors, appointments) => {
  var tree = createResourcesTree(loadedResources);
  return reduceResourcesTree(getDataAccessors, tree, appointments);
};
export var reduceResourcesTree = (getDataAccessors, tree, existingAppointments, _result) => {
  _result = _result ? _result.children : [];
  tree.forEach((node, index) => {
    var ok = false;
    var resourceName = node.name;
    var resourceValue = node.value;
    var resourceTitle = node.title;
    var resourceData = node.data;
    var resourceGetter = getDataAccessors(resourceName, 'getter');
    existingAppointments.forEach(appointment => {
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
export var getResourcesDataByGroups = (loadedResources, resources, groups) => {
  if (!groups || !groups.length) {
    return loadedResources;
  }
  var fieldNames = {};
  var currentResourcesData = [];
  groups.forEach(group => {
    each(group, (name, value) => {
      fieldNames[name] = value;
    });
  });
  var resourceData = loadedResources.filter(_ref2 => {
    var {
      name
    } = _ref2;
    return isDefined(fieldNames[name]);
  });
  resourceData.forEach(data => currentResourcesData.push(extend({}, data)));
  currentResourcesData.forEach(currentResource => {
    var {
      items,
      data,
      name: resourceName
    } = currentResource;
    var resource = filterResources(resources, [resourceName])[0] || {};
    var valueExpr = getValueExpr(resource);
    var filteredItems = [];
    var filteredData = [];
    groups.filter(group => isDefined(group[resourceName])).forEach(group => {
      each(group, (name, value) => {
        if (!filteredItems.filter(item => item.id === value && item[valueExpr] === name).length) {
          var currentItems = items.filter(item => item.id === value);
          var currentData = data.filter(item => item[valueExpr] === value);
          filteredItems.push(...currentItems);
          filteredData.push(...currentData);
        }
      });
    });
    currentResource.items = filteredItems;
    currentResource.data = filteredData;
  });
  return currentResourcesData;
};
export var setResourceToAppointment = (resources, dataAccessors, appointment, groups) => {
  var resourcesSetter = dataAccessors.setter;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (var name in groups) {
    var resourceData = groups[name];
    var value = isResourceMultiple(resources, name) ? wrapToArray(resourceData) : resourceData;
    resourcesSetter[name](appointment, value);
  }
};
export var getResourceColor = (resources, resourceLoaderMap, field, value) => {
  // @ts-expect-error
  var result = new Deferred();
  var resource = filterResources(resources, [field])[0] || {};
  var colorExpr = resource.colorExpr || 'color';
  var colorGetter = compileGetter(colorExpr);
  getOrLoadResourceItem(resources, resourceLoaderMap, field, value).done(resource => result.resolve(colorGetter(resource))).fail(() => result.reject());
  return result.promise();
};
export var getAppointmentColor = (resourceConfig, appointmentConfig) => {
  var {
    resources,
    dataAccessors,
    loadedResources,
    resourceLoaderMap
  } = resourceConfig;
  var {
    groupIndex,
    groups,
    itemData
  } = appointmentConfig;
  var paintedResources = getPaintedResources(resources || [], groups);
  if (paintedResources) {
    var field = getFieldExpr(paintedResources);
    var cellGroups = getCellGroups(groupIndex, loadedResources);
    var resourcesDataAccessors = getDataAccessors(dataAccessors, field, 'getter');
    var resourceValues = wrapToArray(resourcesDataAccessors(itemData));
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
  return new Deferred().resolve().promise();
};
export var createExpressions = function createExpressions() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var result = {
    getter: {},
    setter: {}
  };
  resources.forEach(resource => {
    var field = getFieldExpr(resource);
    result.getter[field] = compileGetter(field);
    result.setter[field] = compileSetter(field);
  });
  return result;
};
var getTransformedResourceData = (resource, data) => {
  var valueGetter = compileGetter(getValueExpr(resource));
  var displayGetter = compileGetter(getDisplayExpr(resource));
  return data.map(item => {
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
export var loadResources = (groups, resources, resourceLoaderMap) => {
  // @ts-expect-error
  var result = new Deferred();
  var deferreds = [];
  var newGroups = groups || [];
  var newResources = resources || [];
  var loadedResources = [];
  filterResources(newResources, newGroups).forEach(resource => {
    // @ts-expect-error
    var deferred = new Deferred();
    var name = getFieldExpr(resource);
    deferreds.push(deferred);
    var dataSourcePromise = getWrappedDataSource(resource.dataSource).load();
    resourceLoaderMap.set(name, dataSourcePromise);
    dataSourcePromise.done(data => {
      var items = getTransformedResourceData(resource, data);
      deferred.resolve({
        name,
        items,
        data
      });
    }).fail(() => deferred.reject());
  });
  if (!deferreds.length) {
    return result.resolve(loadedResources);
  }
  when.apply(null, deferreds).done(function () {
    for (var _len = arguments.length, resources = new Array(_len), _key = 0; _key < _len; _key++) {
      resources[_key] = arguments[_key];
    }
    var hasEmpty = resources.some(r => r.items.length === 0);
    loadedResources = hasEmpty ? [] : resources;
    result.resolve(loadedResources);
  }).fail(() => result.reject());
  return result.promise();
};
export var getNormalizedResources = (rawAppointment, dataAccessors, resources) => {
  var result = {};
  each(dataAccessors.resources.getter, fieldName => {
    var value = dataAccessors.resources.getter[fieldName](rawAppointment);
    if (isDefined(value)) {
      var isMultiple = isResourceMultiple(resources, fieldName);
      var resourceValue = isMultiple ? wrapToArray(value) : value;
      result[fieldName] = resourceValue;
    }
  });
  return result;
};
