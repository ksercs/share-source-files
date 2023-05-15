!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/resources/utils.js"], ["../../../data/data_source/utils","../../../data/data_source/data_source","../../../core/utils/deferred","../../../core/utils/data","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/type","../../../core/utils/array","../../../core/utils/object","../../../core/utils/common","../../../renovation/ui/scheduler/resources/hasResourceValue"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/resources/utils.js", ["../../../data/data_source/utils", "../../../data/data_source/data_source", "../../../core/utils/deferred", "../../../core/utils/data", "../../../core/utils/iterator", "../../../core/utils/extend", "../../../core/utils/type", "../../../core/utils/array", "../../../core/utils/object", "../../../core/utils/common", "../../../renovation/ui/scheduler/resources/hasResourceValue"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.setResourceToAppointment = exports.reduceResourcesTree = exports.loadResources = exports.isResourceMultiple = exports.groupAppointmentsByResourcesCore = exports.groupAppointmentsByResources = exports.getWrappedDataSource = exports.getValueExpr = exports.getResourcesDataByGroups = exports.getResourceTreeLeaves = exports.getResourceColor = exports.getResourceByField = exports.getPathToLeaf = exports.getPaintedResources = exports.getOrLoadResourceItem = exports.getNormalizedResources = exports.getGroupsObjectFromGroupsArray = exports.getGroupCount = exports.getFieldExpr = exports.getDisplayExpr = exports.getDataAccessors = exports.getCellGroups = exports.getAppointmentColor = exports.getAllGroups = exports.filterResources = exports.createResourcesTree = exports.createResourceEditorModel = exports.createReducedResourcesTree = exports.createExpressions = void 0;
  var _utils = $__require("../../../data/data_source/utils");
  var _data_source = $__require("../../../data/data_source/data_source");
  var _deferred = $__require("../../../core/utils/deferred");
  var _data = $__require("../../../core/utils/data");
  var _iterator = $__require("../../../core/utils/iterator");
  var _extend = $__require("../../../core/utils/extend");
  var _type = $__require("../../../core/utils/type");
  var _array = $__require("../../../core/utils/array");
  var _object = $__require("../../../core/utils/object");
  var _common = $__require("../../../core/utils/common");
  var _hasResourceValue = $__require("../../../renovation/ui/scheduler/resources/hasResourceValue");
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
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
    var result = _extends({}, (0, _utils.normalizeDataSourceOptions)(dataSource), {
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
      result = result || [];
      for (var itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
        var _group$data;
        var currentGroupItem = group.items[itemIndex];
        var resultItem = {
          name: group.name,
          value: currentGroupItem.id,
          title: currentGroupItem.text,
          data: (_group$data = group.data) === null || _group$data === void 0 ? void 0 : _group$data[itemIndex],
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
        } else {
          var _leaf = findLeafByIndex(data[i].children, index);
          if (_leaf) {
            return _leaf;
          }
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
      return _extends({}, currentGroups, _defineProperty({}, name, id));
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
        dataField: dataField,
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
    return !!(resource !== null && resource !== void 0 && resource.allowMultiple);
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
      '0': appointments
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
            if (resourceFromAppointment.indexOf(resourceValue) > -1) {
              _result.push({
                name: resourceName,
                value: resourceValue,
                title: resourceTitle,
                data: resourceData,
                children: []
              });
              ok = true;
            }
          } else {
            if (resourceFromAppointment === resourceValue) {
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
        return fieldNames[name] = value;
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
    for (var name in groups) {
      var resourceData = groups[name];
      var value = isResourceMultiple(resources, name) ? (0, _array.wrapToArray)(resourceData) : resourceData;
      resourcesSetter[name](appointment, value);
    }
  };
  exports.setResourceToAppointment = setResourceToAppointment;
  var getResourceColor = function getResourceColor(resources, resourceLoaderMap, field, value) {
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
    var result = new _deferred.Deferred();
    var deferreds = [];
    var newGroups = groups || [];
    var newResources = resources || [];
    var loadedResources = [];
    filterResources(newResources, newGroups).forEach(function (resource) {
      var deferred = new _deferred.Deferred();
      var name = getFieldExpr(resource);
      deferreds.push(deferred);
      var dataSourcePromise = getWrappedDataSource(resource.dataSource).load();
      resourceLoaderMap.set(name, dataSourcePromise);
      dataSourcePromise.done(function (data) {
        var items = getTransformedResourceData(resource, data);
        deferred.resolve({
          name: name,
          items: items,
          data: data
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../data/data_source/utils","../../../data/data_source/data_source","../../../core/utils/deferred","../../../core/utils/data","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/type","../../../core/utils/array","../../../core/utils/object","../../../core/utils/common","../../../renovation/ui/scheduler/resources/hasResourceValue"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../data/data_source/utils"), require("../../../data/data_source/data_source"), require("../../../core/utils/deferred"), require("../../../core/utils/data"), require("../../../core/utils/iterator"), require("../../../core/utils/extend"), require("../../../core/utils/type"), require("../../../core/utils/array"), require("../../../core/utils/object"), require("../../../core/utils/common"), require("../../../renovation/ui/scheduler/resources/hasResourceValue"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map