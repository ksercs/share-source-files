/**
* DevExtreme (esm/__internal/scheduler/resources/m_utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { DataSource } from '../../../common/data/data_source/data_source';
import { normalizeDataSourceOptions } from '../../../common/data/data_source/utils';
import { wrapToArray } from '../../../core/utils/array';
import { equalByValue } from '../../../core/utils/common';
import { compileGetter, compileSetter } from '../../../core/utils/data';
import { Deferred, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { deepExtendArraySafe } from '../../../core/utils/object';
import { isDefined } from '../../../core/utils/type';
import { current, isFluent } from '../../../ui/themes';
import { getGroupCount, hasResourceValue } from '../../scheduler/r1/utils/index';
export const getIdExpr = resource => resource.valueExpr || 'id';
export const getTextExpr = resource => resource.displayExpr || 'text';
export const getFieldExpr = resource => resource.fieldExpr || resource.field;
export const getWrappedDataSource = dataSource => {
  if (dataSource instanceof DataSource) {
    return dataSource;
  }
  const result = _extends({}, normalizeDataSourceOptions(dataSource), {
    pageSize: 0
  });
  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }
  return new DataSource(result);
};
export const createResourcesTree = groups => {
  let leafIndex = 0;
  const make = (group, groupIndex, result, parent) => {
    result = result || [];
    for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
      var _group$data;
      const currentGroupItem = group.items[itemIndex];
      const resultItem = {
        name: group.name,
        value: currentGroupItem.id,
        title: currentGroupItem.text,
        data: (_group$data = group.data) === null || _group$data === void 0 ? void 0 : _group$data[itemIndex],
        children: [],
        parent: parent || null
      };
      const nextGroupIndex = groupIndex + 1;
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
export const getPathToLeaf = (leafIndex, groups) => {
  const tree = createResourcesTree(groups);
  const findLeafByIndex = (data, index) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].leafIndex === index) {
        return data[i];
      }
      const leaf = findLeafByIndex(data[i].children, index);
      if (leaf) {
        return leaf;
      }
    }
  };
  const makeBranch = (leaf, result) => {
    result = result || [];
    result.push(leaf.value);
    if (leaf.parent) {
      makeBranch(leaf.parent, result);
    }
    return result;
  };
  const leaf = findLeafByIndex(tree, leafIndex);
  return makeBranch(leaf).reverse();
};
export const getCellGroups = (groupIndex, groups) => {
  const result = [];
  if (getGroupCount(groups)) {
    if (groupIndex < 0) {
      return;
    }
    const path = getPathToLeaf(groupIndex, groups);
    for (let i = 0; i < groups.length; i++) {
      result.push({
        name: groups[i].name,
        id: path[i]
      });
    }
  }
  return result;
};
export const getGroupsObjectFromGroupsArray = groupsArray => groupsArray.reduce((currentGroups, _ref) => {
  let {
    name,
    id
  } = _ref;
  return _extends({}, currentGroups, {
    [name]: id
  });
}, {});
export const getAllGroups = groups => {
  const groupCount = getGroupCount(groups);
  return [...new Array(groupCount)].map((_, groupIndex) => {
    const groupsArray = getCellGroups(groupIndex, groups);
    return getGroupsObjectFromGroupsArray(groupsArray);
  });
};
export const getResourceByField = (fieldName, loadedResources) => {
  for (let i = 0; i < loadedResources.length; i++) {
    const resource = loadedResources[i];
    if (resource.name === fieldName) {
      return resource.data;
    }
  }
  return [];
};
export const createResourceEditorModel = (resources, loadedResources) => resources.map(resource => {
  const dataField = getFieldExpr(resource);
  const dataSource = getResourceByField(dataField, loadedResources);
  return {
    editorOptions: {
      dataSource: dataSource.length ? dataSource : getWrappedDataSource(resource.dataSource),
      displayExpr: getTextExpr(resource),
      valueExpr: getIdExpr(resource),
      stylingMode: isFluent(current()) ? 'filled' : 'outlined'
    },
    dataField,
    editorType: resource.allowMultiple ? 'dxTagBox' : 'dxSelectBox',
    label: {
      text: resource.label || dataField
    }
  };
});
export const isResourceMultiple = (resources, resourceField) => {
  const resource = resources.find(resource => {
    const field = getFieldExpr(resource);
    return field === resourceField;
  });
  return !!(resource !== null && resource !== void 0 && resource.allowMultiple);
};
export const filterResources = (resources, fields) => resources.filter(resource => {
  const field = getFieldExpr(resource);
  return fields.indexOf(field) > -1;
});
export const getPaintedResources = (resources, groups) => {
  const newGroups = groups || [];
  const result = resources.find(resource => resource.useColorAsDefault);
  if (result) {
    return result;
  }
  const newResources = newGroups.length ? filterResources(resources, newGroups) : resources;
  return newResources[newResources.length - 1];
};
export const getOrLoadResourceItem = (resources, resourceLoaderMap, field, value) => {
  // @ts-expect-error
  const result = new Deferred();
  resources.filter(resource => getFieldExpr(resource) === field && isDefined(resource.dataSource)).forEach(resource => {
    const wrappedDataSource = getWrappedDataSource(resource.dataSource);
    const valueExpr = getIdExpr(resource);
    if (!resourceLoaderMap.has(field)) {
      resourceLoaderMap.set(field, wrappedDataSource.load());
    }
    resourceLoaderMap.get(field).done(data => {
      const getter = compileGetter(valueExpr);
      const filteredData = data.filter(resource => equalByValue(getter(resource), value));
      result.resolve(filteredData[0]);
    }).fail(() => {
      resourceLoaderMap.delete(field);
      result.reject();
    });
  });
  return result.promise();
};
export const getDataAccessors = (dataAccessors, fieldName, type) => {
  const actions = dataAccessors[type];
  return actions[fieldName];
};
export const groupAppointmentsByResources = function (config, appointments) {
  let groups = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  let result = {
    0: appointments
  };
  if (groups.length && config.loadedResources.length) {
    result = groupAppointmentsByResourcesCore(config, appointments, config.loadedResources);
  }
  let totalResourceCount = 0;
  config.loadedResources.forEach((resource, index) => {
    if (!index) {
      totalResourceCount = resource.items.length;
    } else {
      totalResourceCount *= resource.items.length;
    }
  });
  for (let index = 0; index < totalResourceCount; index++) {
    const key = index.toString();
    if (result[key]) {
      continue;
    }
    result[key] = [];
  }
  return result;
};
export const groupAppointmentsByResourcesCore = (config, appointments, resources) => {
  const tree = createResourcesTree(resources);
  const result = {};
  appointments.forEach(appointment => {
    const treeLeaves = getResourceTreeLeaves((field, action) => getDataAccessors(config.dataAccessors, field, action), tree, appointment);
    for (let i = 0; i < treeLeaves.length; i++) {
      if (!result[treeLeaves[i]]) {
        result[treeLeaves[i]] = [];
      }
      // NOTE: check appointment before pushing
      result[treeLeaves[i]].push(deepExtendArraySafe({}, appointment, true));
    }
  });
  return result;
};
export const getResourceTreeLeaves = (getDataAccessors, tree, rawAppointment, result) => {
  result = result || [];
  for (let i = 0; i < tree.length; i++) {
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
const hasGroupItem = (getDataAccessors, rawAppointment, groupName, itemValue) => {
  const resourceValue = getDataAccessors(groupName, 'getter')(rawAppointment);
  return hasResourceValue(wrapToArray(resourceValue), itemValue);
};
export const createReducedResourcesTree = (loadedResources, getDataAccessors, appointments) => {
  const tree = createResourcesTree(loadedResources);
  return reduceResourcesTree(getDataAccessors, tree, appointments);
};
export const reduceResourcesTree = (getDataAccessors, tree, existingAppointments, _result) => {
  _result = _result ? _result.children : [];
  tree.forEach((node, index) => {
    var _node$children;
    let ok = false;
    const resourceName = node.name;
    const resourceValue = node.value;
    const resourceTitle = node.title;
    const resourceData = node.data;
    const resourceGetter = getDataAccessors(resourceName, 'getter');
    existingAppointments.forEach(appointment => {
      if (!ok) {
        const resourceFromAppointment = resourceGetter(appointment);
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
    if (ok && (_node$children = node.children) !== null && _node$children !== void 0 && _node$children.length) {
      reduceResourcesTree(getDataAccessors, node.children, existingAppointments, _result[index]);
    }
  });
  return _result;
};
export const getResourcesDataByGroups = (loadedResources, resources, groups) => {
  if (!(groups !== null && groups !== void 0 && groups.length)) {
    return loadedResources;
  }
  const fieldNames = {};
  const currentResourcesData = [];
  groups.forEach(group => {
    each(group, (name, value) => {
      fieldNames[name] = value;
    });
  });
  const resourceData = loadedResources.filter(_ref2 => {
    let {
      name
    } = _ref2;
    return isDefined(fieldNames[name]);
  });
  resourceData.forEach(data => currentResourcesData.push(extend({}, data)));
  currentResourcesData.forEach(currentResource => {
    const {
      items,
      data,
      name: resourceName
    } = currentResource;
    const resource = filterResources(resources, [resourceName])[0] || {};
    const valueExpr = getIdExpr(resource);
    const filteredItems = [];
    const filteredData = [];
    groups.filter(group => isDefined(group[resourceName])).forEach(group => {
      each(group, (name, value) => {
        if (!filteredItems.filter(item => item.id === value && item[valueExpr] === name).length) {
          const currentItems = items.filter(item => item.id === value);
          const currentData = data.filter(item => item[valueExpr] === value);
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
export const setResourceToAppointment = (resources, dataAccessors, appointment, groups) => {
  const resourcesSetter = dataAccessors.setter;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const name in groups) {
    const resourceData = groups[name];
    const value = isResourceMultiple(resources, name) ? wrapToArray(resourceData) : resourceData;
    resourcesSetter[name](appointment, value);
  }
};
export const getResourceColor = (resources, resourceLoaderMap, field, value) => {
  // @ts-expect-error
  const result = new Deferred();
  const resource = filterResources(resources, [field])[0] || {};
  const colorExpr = resource.colorExpr || 'color';
  const colorGetter = compileGetter(colorExpr);
  getOrLoadResourceItem(resources, resourceLoaderMap, field, value).done(resource => result.resolve(colorGetter(resource))).fail(() => result.reject());
  return result.promise();
};
export const getAppointmentColor = (resourceConfig, appointmentConfig) => {
  const {
    resources,
    dataAccessors,
    loadedResources,
    resourceLoaderMap
  } = resourceConfig;
  const {
    groupIndex,
    groups,
    itemData
  } = appointmentConfig;
  const paintedResources = getPaintedResources(resources || [], groups);
  if (paintedResources) {
    const field = getFieldExpr(paintedResources);
    const cellGroups = getCellGroups(groupIndex, loadedResources);
    const resourcesDataAccessors = getDataAccessors(dataAccessors, field, 'getter');
    const resourceValues = wrapToArray(resourcesDataAccessors(itemData));
    let groupId = resourceValues[0];
    for (let i = 0; i < cellGroups.length; i++) {
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
export const createExpressions = function () {
  let resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const result = {
    getter: {},
    setter: {}
  };
  resources.forEach(resource => {
    const field = getFieldExpr(resource);
    result.getter[field] = compileGetter(field);
    result.setter[field] = compileSetter(field);
  });
  return result;
};
const getTransformedResourceData = (resource, data) => {
  const valueGetter = compileGetter(getIdExpr(resource));
  const displayGetter = compileGetter(getTextExpr(resource));
  return data.map(item => {
    const result = {
      id: valueGetter(item),
      text: displayGetter(item)
    };
    if (item.color) {
      // for tests
      result.color = item.color;
    }
    return result;
  });
};
export const loadResources = (groups, resources, resourceLoaderMap) => {
  // @ts-expect-error
  const result = new Deferred();
  const deferreds = [];
  const newGroups = groups || [];
  const newResources = resources || [];
  let loadedResources = [];
  filterResources(newResources, newGroups).forEach(resource => {
    // @ts-expect-error
    const deferred = new Deferred();
    const name = getFieldExpr(resource);
    deferreds.push(deferred);
    const dataSourcePromise = getWrappedDataSource(resource.dataSource).load();
    resourceLoaderMap.set(name, dataSourcePromise);
    dataSourcePromise.done(data => {
      const items = getTransformedResourceData(resource, data);
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
    const hasEmpty = resources.some(r => r.items.length === 0);
    loadedResources = hasEmpty ? [] : resources;
    result.resolve(loadedResources);
  }).fail(() => result.reject());
  return result.promise();
};
export const getNormalizedResources = (rawAppointment, dataAccessors, resources) => {
  const result = {};
  each(dataAccessors.resources.getter, fieldName => {
    const value = dataAccessors.resources.getter[fieldName](rawAppointment);
    if (isDefined(value)) {
      const isMultiple = isResourceMultiple(resources, fieldName);
      const resourceValue = isMultiple ? wrapToArray(value) : value;
      result[fieldName] = resourceValue;
    }
  });
  return result;
};
