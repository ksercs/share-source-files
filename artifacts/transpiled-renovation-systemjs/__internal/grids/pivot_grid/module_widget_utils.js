!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/module_widget_utils.js"], ["../../../core/dom_adapter","../../../core/utils/call_once","../../../core/utils/type","../../../core/utils/ajax","../../../core/utils/data","../../../core/utils/iterator","../../../core/utils/extend","../../../localization/date","../../../format_helper","../../../data/data_source/data_source","../../../data/array_store","../../../core/utils/deferred","./const"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/module_widget_utils.js", ["../../../core/dom_adapter", "../../../core/utils/call_once", "../../../core/utils/type", "../../../core/utils/ajax", "../../../core/utils/data", "../../../core/utils/iterator", "../../../core/utils/extend", "../../../localization/date", "../../../format_helper", "../../../data/data_source/data_source", "../../../data/array_store", "../../../core/utils/deferred", "./const"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.calculateScrollbarWidth = void 0;
  exports.capitalizeFirstLetter = capitalizeFirstLetter;
  exports.createPath = createPath;
  exports.default = void 0;
  exports.discoverObjectFields = discoverObjectFields;
  exports.findField = findField;
  exports.foreachDataLevel = foreachDataLevel;
  exports.foreachTreeAsync = exports.foreachTree = void 0;
  exports.formatValue = formatValue;
  exports.getCompareFunction = getCompareFunction;
  exports.getExpandedLevel = getExpandedLevel;
  exports.getFieldsDataType = getFieldsDataType;
  exports.getFiltersByPath = getFiltersByPath;
  exports.getScrollbarWidth = void 0;
  exports.mergeArraysByMaxValue = mergeArraysByMaxValue;
  exports.sendRequest = sendRequest;
  exports.setDefaultFieldValueFormatting = setDefaultFieldValueFormatting;
  exports.storeDrillDownMixin = exports.setFieldProperty = void 0;
  var _dom_adapter = _interopRequireDefault($__require("../../../core/dom_adapter"));
  var _call_once = _interopRequireDefault($__require("../../../core/utils/call_once"));
  var _type = $__require("../../../core/utils/type");
  var _ajax = _interopRequireDefault($__require("../../../core/utils/ajax"));
  var _data = $__require("../../../core/utils/data");
  var _iterator = $__require("../../../core/utils/iterator");
  var _extend = $__require("../../../core/utils/extend");
  var _date = _interopRequireDefault($__require("../../../localization/date"));
  var _format_helper = _interopRequireDefault($__require("../../../format_helper"));
  var _data_source = $__require("../../../data/data_source/data_source");
  var _array_store = _interopRequireDefault($__require("../../../data/array_store"));
  var _deferred = $__require("../../../core/utils/deferred");
  var _const = $__require("./const");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var setFieldProperty = function setFieldProperty(field, property, value, isInitialization) {
    var initProperties = field._initProperties = field._initProperties || {};
    var initValue = isInitialization ? value : field[property];
    if (!Object.prototype.hasOwnProperty.call(initProperties, property) || isInitialization) {
      initProperties[property] = initValue;
    }
    field[property] = value;
  };
  exports.setFieldProperty = setFieldProperty;
  function sendRequest(options) {
    return _ajax.default.sendRequest(options);
  }
  var foreachTreeAsyncDate = new Date();
  function createForeachTreeFunc(isAsync) {
    var foreachTreeFunc = function foreachTreeFunc(items, callback, parentAtFirst, members, index, isChildrenProcessing) {
      members = members || [];
      items = items || [];
      var i;
      var deferred;
      index = index || 0;
      function createForeachTreeAsyncHandler(deferred, i, isChildrenProcessing) {
        (0, _deferred.when)(foreachTreeFunc(items, callback, parentAtFirst, members, i, isChildrenProcessing)).done(deferred.resolve);
      }
      for (i = index; i < items.length; i += 1) {
        if (isAsync && i > index && i % 10000 === 0 && new Date() - foreachTreeAsyncDate >= 300) {
          foreachTreeAsyncDate = new Date();
          // @ts-expect-error
          deferred = new _deferred.Deferred();
          createForeachTreeAsyncHandler(deferred, i, false);
          return deferred;
        }
        var item = items[i];
        if (!isChildrenProcessing) {
          members.unshift(item);
          if (parentAtFirst && callback(members, i) === false) {
            return undefined;
          }
          if (item.children) {
            var childrenDeferred = foreachTreeFunc(item.children, callback, parentAtFirst, members);
            if (isAsync && childrenDeferred) {
              // @ts-expect-error
              deferred = new _deferred.Deferred();
              childrenDeferred.done(createForeachTreeAsyncHandler(deferred, i, true));
              return deferred;
            }
          }
        }
        isChildrenProcessing = false;
        if (!parentAtFirst && callback(members, i) === false) {
          return undefined;
        }
        members.shift();
        if (items[i] !== item) {
          i -= 1;
        }
      }
      return undefined;
    };
    return foreachTreeFunc;
  }
  var foreachTree = createForeachTreeFunc(false);
  exports.foreachTree = foreachTree;
  var foreachTreeAsync = createForeachTreeFunc(true);
  exports.foreachTreeAsync = foreachTreeAsync;
  function findField(fields, id) {
    if (fields && (0, _type.isDefined)(id)) {
      for (var i = 0; i < fields.length; i += 1) {
        var field = fields[i];
        if (field.name === id || field.caption === id || field.dataField === id || field.index === id) {
          return i;
        }
      }
    }
    return -1;
  }
  function formatValue(value, options) {
    // because isNaN function works incorrectly with strings and undefined (T889965)
    var valueText = value === value && _format_helper.default.format(value, options.format);
    var formatObject = {
      value: value,
      valueText: valueText || ''
    };
    return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText;
  }
  function getCompareFunction(valueSelector) {
    return function (a, b) {
      var result = 0;
      var valueA = valueSelector(a);
      var valueB = valueSelector(b);
      var aIsDefined = (0, _type.isDefined)(valueA);
      var bIsDefined = (0, _type.isDefined)(valueB);
      if (aIsDefined && bIsDefined) {
        if (valueA > valueB) {
          result = 1;
        } else if (valueA < valueB) {
          result = -1;
        }
      }
      if (aIsDefined && !bIsDefined) {
        result = 1;
      }
      if (!aIsDefined && bIsDefined) {
        result = -1;
      }
      return result;
    };
  }
  function createPath(items) {
    var result = [];
    for (var i = items.length - 1; i >= 0; i -= 1) {
      result.push(items[i].key || items[i].value);
    }
    return result;
  }
  function foreachDataLevel(data, callback, index, childrenField) {
    index = index || 0;
    childrenField = childrenField || 'children';
    if (data.length) {
      callback(data, index);
    }
    for (var i = 0; i < data.length; i += 1) {
      var item = data[i];
      if (item[childrenField] && item[childrenField].length) {
        foreachDataLevel(item[childrenField], callback, index + 1, childrenField);
      }
    }
  }
  function mergeArraysByMaxValue(values1, values2) {
    var result = [];
    for (var i = 0; i < values1.length; i += 1) {
      result.push(Math.max(values1[i] || 0, values2[i] || 0));
    }
    return result;
  }
  function getExpandedLevel(options, axisName) {
    var dimensions = options[axisName];
    var expandLevel = 0;
    var expandedPaths = (axisName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
    if (options.headerName === axisName) {
      expandLevel = options.path.length;
    } else if (options.headerName && options.headerName !== axisName && options.oppositePath) {
      expandLevel = options.oppositePath.length;
    } else {
      (0, _iterator.each)(expandedPaths, function (_, path) {
        expandLevel = Math.max(expandLevel, path.length);
      });
    }
    while (dimensions[expandLevel + 1] && dimensions[expandLevel].expanded) {
      expandLevel += 1;
    }
    return expandLevel;
  }
  function createGroupFields(item) {
    return (0, _iterator.map)(['year', 'quarter', 'month'], function (value, index) {
      return (0, _extend.extend)({}, item, {
        groupInterval: value,
        groupIndex: index
      });
    });
  }
  function parseFields(dataSource, fieldsList, path, fieldsDataType) {
    var result = [];
    Object.keys(fieldsList || []).forEach(function (field) {
      if (field && field.startsWith('__')) return;
      var dataIndex = 1;
      var currentPath = path.length ? "".concat(path, ".").concat(field) : field;
      var dataType = fieldsDataType[currentPath];
      var getter = (0, _data.compileGetter)(currentPath);
      var value = fieldsList[field];
      var items;
      while (!(0, _type.isDefined)(value) && dataSource[dataIndex]) {
        value = getter(dataSource[dataIndex]);
        dataIndex += 1;
      }
      if (!dataType && (0, _type.isDefined)(value)) {
        dataType = (0, _type.type)(value);
      }
      items = [{
        dataField: currentPath,
        dataType: dataType,
        groupName: dataType === 'date' ? field : undefined,
        groupInterval: undefined,
        displayFolder: path
      }];
      if (dataType === 'date') {
        items = items.concat(createGroupFields(items[0]));
      } else if (dataType === 'object') {
        items = parseFields(dataSource, value, currentPath, fieldsDataType);
      }
      result.push.apply(result, items);
    });
    return result;
  }
  function discoverObjectFields(items, fields) {
    var fieldsDataType = getFieldsDataType(fields);
    return parseFields(items, items[0], '', fieldsDataType);
  }
  function getFieldsDataType(fields) {
    var result = {};
    (0, _iterator.each)(fields, function (_, field) {
      result[field.dataField] = result[field.dataField] || field.dataType;
    });
    return result;
  }
  var DATE_INTERVAL_FORMATS = {
    month: function month(value) {
      return _date.default.getMonthNames()[value - 1];
    },
    quarter: function quarter(value) {
      return _date.default.format(new Date(2000, value * 3 - 1), 'quarter');
    },
    dayOfWeek: function dayOfWeek(value) {
      return _date.default.getDayNames()[value];
    }
  };
  function setDefaultFieldValueFormatting(field) {
    if (field.dataType === 'date') {
      if (!field.format) {
        setFieldProperty(field, 'format', DATE_INTERVAL_FORMATS[field.groupInterval]);
      }
    } else if (field.dataType === 'number') {
      var groupInterval = (0, _type.isNumeric)(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
      if (groupInterval && !field.customizeText) {
        setFieldProperty(field, 'customizeText', function (formatObject) {
          var secondValue = formatObject.value + groupInterval;
          var secondValueText = _format_helper.default.format(secondValue, field.format);
          return formatObject.valueText && secondValueText ? "".concat(formatObject.valueText, " - ").concat(secondValueText) : '';
        });
      }
    }
  }
  function getFiltersByPath(fields, path) {
    var result = [];
    path = path || [];
    for (var i = 0; i < path.length; i += 1) {
      result.push((0, _extend.extend)({}, fields[i], {
        groupIndex: null,
        groupName: null,
        filterType: 'include',
        filterValues: [path[i]]
      }));
    }
    return result;
  }
  var storeDrillDownMixin = {
    createDrillDownDataSource: function createDrillDownDataSource(descriptions, params) {
      var items = this.getDrillDownItems(descriptions, params);
      var arrayStore;
      function createCustomStoreMethod(methodName) {
        return function (options) {
          var d;
          if (arrayStore) {
            d = arrayStore[methodName](options);
          } else {
            // @ts-expect-error
            d = new _deferred.Deferred();
            (0, _deferred.when)(items).done(function (data) {
              var arrayStore = new _array_store.default(data);
              arrayStore[methodName](options).done(d.resolve).fail(d.reject);
            }).fail(d.reject);
          }
          return d;
        };
      }
      var dataSource = new _data_source.DataSource({
        load: createCustomStoreMethod('load'),
        totalCount: createCustomStoreMethod('totalCount'),
        key: this.key()
      });
      return dataSource;
    }
  };
  exports.storeDrillDownMixin = storeDrillDownMixin;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var getScrollbarWidth = function getScrollbarWidth(containerElement) {
    return containerElement.offsetWidth - containerElement.clientWidth;
  };
  exports.getScrollbarWidth = getScrollbarWidth;
  var calculateScrollbarWidth = (0, _call_once.default)(function () {
    var document = _dom_adapter.default.getDocument();
    document.body.insertAdjacentHTML('beforeend', "<div class=\"".concat(_const.CLASSES.scrollBarMeasureElement, "\"></div>"));
    var scrollbar = document.body.lastElementChild;
    var scrollbarWidth = getScrollbarWidth(scrollbar);
    if (scrollbar) {
      document.body.removeChild(scrollbar);
    }
    return scrollbarWidth;
  });
  exports.calculateScrollbarWidth = calculateScrollbarWidth;
  var _default = {
    setFieldProperty: setFieldProperty,
    sendRequest: sendRequest,
    foreachTree: foreachTree,
    foreachTreeAsync: foreachTreeAsync,
    findField: findField,
    formatValue: formatValue,
    getCompareFunction: getCompareFunction,
    createPath: createPath,
    foreachDataLevel: foreachDataLevel,
    mergeArraysByMaxValue: mergeArraysByMaxValue,
    getExpandedLevel: getExpandedLevel,
    discoverObjectFields: discoverObjectFields,
    getFieldsDataType: getFieldsDataType,
    setDefaultFieldValueFormatting: setDefaultFieldValueFormatting,
    getFiltersByPath: getFiltersByPath,
    storeDrillDownMixin: storeDrillDownMixin,
    capitalizeFirstLetter: capitalizeFirstLetter,
    getScrollbarWidth: getScrollbarWidth,
    calculateScrollbarWidth: calculateScrollbarWidth
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/dom_adapter","../../../core/utils/call_once","../../../core/utils/type","../../../core/utils/ajax","../../../core/utils/data","../../../core/utils/iterator","../../../core/utils/extend","../../../localization/date","../../../format_helper","../../../data/data_source/data_source","../../../data/array_store","../../../core/utils/deferred","./const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/dom_adapter"), require("../../../core/utils/call_once"), require("../../../core/utils/type"), require("../../../core/utils/ajax"), require("../../../core/utils/data"), require("../../../core/utils/iterator"), require("../../../core/utils/extend"), require("../../../localization/date"), require("../../../format_helper"), require("../../../data/data_source/data_source"), require("../../../data/array_store"), require("../../../core/utils/deferred"), require("./const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_widget_utils.js.map