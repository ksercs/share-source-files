!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/components/data_validator.js"], ["../../core/utils/type","../../core/utils/extend","../core/utils","./parse_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/components/data_validator.js", ["../../core/utils/type", "../../core/utils/extend", "../core/utils", "./parse_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.validateData = validateData;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _utils = $__require("../core/utils");
  var _parse_utils = $__require("./parse_utils");
  var STRING = 'string';
  var NUMERIC = 'numeric';
  var DATETIME = 'datetime';
  var DISCRETE = 'discrete';
  var SEMIDISCRETE = 'semidiscrete';
  var CONTINUOUS = 'continuous';
  var LOGARITHMIC = 'logarithmic';
  var VALUE_TYPE = 'valueType';
  var ARGUMENT_TYPE = 'argumentType';
  var axisTypeParser = (0, _utils.enumParser)([STRING, NUMERIC, DATETIME]);
  var _isArray = Array.isArray;
  function groupingValues(data, others, valueField, index) {
    if (index >= 0) {
      data.slice(index).forEach(function (cell) {
        if ((0, _type.isDefined)(cell[valueField])) {
          others[valueField] += cell[valueField];
          cell[valueField] = undefined;
        }
      });
    }
  }
  function processGroups(groups) {
    groups.forEach(function (group) {
      group.valueType = group.valueAxisType = null;
      group.series.forEach(function (series) {
        series.updateDataType({});
      });
      group.valueAxis && group.valueAxis.resetTypes(VALUE_TYPE);
    });
  }
  function sortValues(data, asc, selector) {
    var func = asc ? function (a, b) {
      return a - b;
    } : function (a, b) {
      return b - a;
    };
    data.sort(function (a, b) {
      var valA = selector(a);
      var valB = selector(b);
      var aa = (0, _type.isDefined)(valA) ? 1 : 0;
      var bb = (0, _type.isDefined)(valB) ? 1 : 0;
      return aa && bb ? func(valA, valB) : func(aa, bb);
    });
    return data;
  }
  function resetArgumentAxes(axes) {
    axes && axes.forEach(function (axis) {
      axis.resetTypes(ARGUMENT_TYPE);
    });
  }
  function parseCategories(categories, parser) {
    var newArray = [];
    categories.forEach(function (category) {
      var parsedCategory = parser(category);
      parsedCategory !== undefined && newArray.push(parsedCategory);
    });
    return newArray;
  }
  function parseAxisCategories(groupsData, parsers) {
    var argumentCategories = groupsData.argumentOptions && groupsData.argumentOptions.categories;
    groupsData.groups.forEach(function (valueGroup, i) {
      var categories = valueGroup.valueOptions && valueGroup.valueOptions.categories;
      if (categories) {
        valueGroup.valueOptions.categories = parseCategories(categories, parsers[i + 1]);
      }
    });
    if (argumentCategories) {
      groupsData.argumentOptions.categories = parseCategories(argumentCategories, parsers[0]);
    }
  }
  function eigen(x) {
    return x;
  }
  function getType(unit, type) {
    var result = type;
    if (type === STRING || (0, _type.isString)(unit)) {
      result = STRING;
    } else if (type === DATETIME || (0, _type.isDate)(unit)) {
      result = DATETIME;
    } else if ((0, _type.isNumeric)(unit)) {
      result = NUMERIC;
    }
    return result;
  }
  function correctAxisType(type, axisType, hasCategories, incidentOccurred) {
    if (type === STRING && (axisType === CONTINUOUS || axisType === LOGARITHMIC || axisType === SEMIDISCRETE)) {
      incidentOccurred('E2002');
    }
    return axisType === LOGARITHMIC ? LOGARITHMIC : hasCategories || axisType === DISCRETE || type === STRING ? DISCRETE : axisType === SEMIDISCRETE ? SEMIDISCRETE : CONTINUOUS;
  }

  // Do we really need this one if all it is only for logarithmic case?
  function validUnit(unit, field, incidentOccurred) {
    if (unit) {
      incidentOccurred(!(0, _type.isNumeric)(unit) && !(0, _type.isDate)(unit) && !(0, _type.isString)(unit) ? 'E2003' : 'E2004', [field]);
    }
  }
  function createParserUnit(type, axisType, incidentOccurred) {
    var parser = type ? (0, _parse_utils.getParser)(type) : eigen;
    var filterInfinity = axisType !== DISCRETE ? function (x) {
      return isFinite(x) || x === undefined ? x : null;
    } : eigen;
    return function (unit, field) {
      var parseUnit = filterInfinity(parser(unit));
      if (parseUnit === undefined) {
        validUnit(unit, field, incidentOccurred);
      }
      return parseUnit;
    };
  }
  function prepareParsers(groupsData, incidentOccurred) {
    var argumentParser = createParserUnit(groupsData.argumentType, groupsData.argumentAxisType, incidentOccurred);
    var sizeParser;
    var valueParser;
    var categoryParsers = [argumentParser];
    var cache = {};
    var list = [];
    groupsData.groups.forEach(function (group, groupIndex) {
      group.series.forEach(function (series) {
        valueParser = createParserUnit(group.valueType, group.valueAxisType, incidentOccurred);
        sizeParser = createParserUnit(NUMERIC, CONTINUOUS, incidentOccurred);
        cache[series.getArgumentField()] = argumentParser;
        series.getValueFields().forEach(function (field) {
          categoryParsers[groupIndex + 1] = valueParser;
          cache[field] = valueParser;
        });
        if (series.getSizeField()) {
          cache[series.getSizeField()] = sizeParser;
        }
      });
    });
    for (var field in cache) {
      list.push([field, cache[field]]);
    }
    list.length && parseAxisCategories(groupsData, categoryParsers);
    return list;
  }
  function getParsedCell(cell, parsers) {
    var i;
    var ii = parsers.length;
    var obj = (0, _extend.extend)({}, cell);
    var field;
    var value;
    for (i = 0; i < ii; ++i) {
      field = parsers[i][0];
      value = cell[field];
      obj[field] = parsers[i][1](value, field);
    }
    return obj;
  }
  function parse(data, parsers) {
    var parsedData = [];
    var i;
    var ii = data.length;
    parsedData.length = ii;
    for (i = 0; i < ii; ++i) {
      parsedData[i] = getParsedCell(data[i], parsers);
    }
    return parsedData;
  }
  function findIndexByThreshold(data, valueField, threshold) {
    var i;
    var ii = data.length;
    var value;
    for (i = 0; i < ii; ++i) {
      value = data[i][valueField];
      if ((0, _type.isDefined)(value) && threshold > value) {
        break;
      }
    }
    return i;
  }
  function groupMinSlices(originalData, argumentField, valueField, smallValuesGrouping) {
    smallValuesGrouping = smallValuesGrouping || {};
    var mode = smallValuesGrouping.mode;
    var others = {};
    if (!mode || mode === 'none') {
      return;
    }
    others[argumentField] = String(smallValuesGrouping.groupName || 'others');
    others[valueField] = 0;
    var data = sortValues(originalData.slice(), false, function (a) {
      return a[valueField];
    });
    groupingValues(data, others, valueField, mode === 'smallValueThreshold' ? findIndexByThreshold(data, valueField, smallValuesGrouping.threshold) : smallValuesGrouping.topCount);
    others[valueField] && originalData.push(others);
  }
  function groupPieData(data, groupsData) {
    var firstSeries = groupsData.groups[0] && groupsData.groups[0].series[0];
    var isPie = firstSeries && (firstSeries.type === 'pie' || firstSeries.type === 'doughnut' || firstSeries.type === 'donut');
    if (!isPie) {
      return;
    }
    groupsData.groups.forEach(function (group) {
      group.series.forEach(function (series) {
        groupMinSlices(data, series.getArgumentField(), series.getValueFields()[0], series.getOptions().smallValuesGrouping);
      });
    });
  }
  function addUniqueItemToCollection(item, collection, itemsHash) {
    if (!itemsHash[item]) {
      collection.push(item);
      itemsHash[item] = true;
    }
  }
  function getUniqueArgumentFields(groupsData) {
    var uniqueArgumentFields = [];
    var hash = {};
    groupsData.groups.forEach(function (group) {
      group.series.forEach(function (series) {
        addUniqueItemToCollection(series.getArgumentField(), uniqueArgumentFields, hash);
      });
    });
    return uniqueArgumentFields;
  }
  function sort(a, b) {
    var result = a - b;
    if (isNaN(result)) {
      if (!(0, _type.isDefined)(a)) {
        return 1;
      }
      if (!(0, _type.isDefined)(b)) {
        return -1;
      }
      return 0;
    }
    return result;
  }
  function sortByArgument(data, argumentField) {
    return data.slice().sort(function (a, b) {
      return sort(a[argumentField], b[argumentField]);
    });
  }
  function sortByCallback(data, callback) {
    return data.slice().sort(callback);
  }
  function checkValueTypeOfGroup(group, cell) {
    group.series.forEach(function (series) {
      series.getValueFields().forEach(function (field) {
        group.valueType = getType(cell[field], group.valueType);
      });
    });
    return group.valueType;
  }
  function getSortByCategories(categories) {
    var hash = {};
    categories.forEach(function (value, i) {
      hash[value] = i;
    });
    return function (data, argumentField) {
      return sortValues(data.slice(), true, function (a) {
        return hash[a[argumentField]];
      });
    };
  }
  function sortData(data, groupsData, options, uniqueArgumentFields) {
    var dataByArguments = {};
    var isDiscrete = groupsData.argumentAxisType === DISCRETE;
    var userCategories = isDiscrete && groupsData.argumentOptions && groupsData.argumentOptions.categories;
    var sortFunction = function sortFunction(data) {
      return data;
    };
    var sortingMethodOption = options.sortingMethod;
    var reSortCategories;
    if (!userCategories && (0, _type.isFunction)(sortingMethodOption)) {
      data = sortByCallback(data, sortingMethodOption);
    }
    if (isDiscrete) {
      groupsData.categories = getCategories(data, uniqueArgumentFields, userCategories);
    }
    if (userCategories || !(0, _type.isFunction)(sortingMethodOption) && groupsData.argumentType === STRING && !options._skipArgumentSorting) {
      sortFunction = getSortByCategories(groupsData.categories);
    } else if (sortingMethodOption === true && groupsData.argumentType !== STRING) {
      sortFunction = sortByArgument;
      reSortCategories = isDiscrete;
    }
    uniqueArgumentFields.forEach(function (field) {
      dataByArguments[field] = sortFunction(data, field);
    });
    if (reSortCategories) {
      groupsData.categories = groupsData.categories.sort(sort);
    }
    return dataByArguments;
  }
  function checkItemExistence(collection, item) {
    return collection.map(function (collectionItem) {
      return collectionItem.valueOf();
    }).indexOf(item.valueOf()) === -1;
  }
  function getCategories(data, uniqueArgumentFields, userCategories) {
    var categories = userCategories ? userCategories.slice() : [];
    uniqueArgumentFields.forEach(function (field) {
      data.forEach(function (item) {
        var dataItem = item[field];
        (0, _type.isDefined)(dataItem) && checkItemExistence(categories, dataItem) && categories.push(dataItem);
      });
    });
    return categories;
  }
  function checkArgumentTypeOfGroup(series, cell, groupsData) {
    series.forEach(function (currentSeries) {
      groupsData.argumentType = getType(cell[currentSeries.getArgumentField()], groupsData.argumentType);
    });
    return groupsData.argumentType;
  }
  function checkType(data, groupsData, checkTypeForAllData) {
    var groupsWithUndefinedValueType = [];
    var groupsWithUndefinedArgumentType = [];
    var argumentTypeGroup = groupsData.argumentOptions && axisTypeParser(groupsData.argumentOptions.argumentType);
    var groupsIndexes;
    groupsData.groups.forEach(function (group) {
      if (!group.series.length) {
        return;
      }
      var valueTypeGroup = group.valueOptions && axisTypeParser(group.valueOptions.valueType);
      group.valueType = valueTypeGroup;
      groupsData.argumentType = argumentTypeGroup;
      !valueTypeGroup && groupsWithUndefinedValueType.push(group);
      !argumentTypeGroup && groupsWithUndefinedArgumentType.push(group);
    });
    if (groupsWithUndefinedValueType.length || groupsWithUndefinedArgumentType.length) {
      groupsIndexes = groupsWithUndefinedValueType.map(function (_, index) {
        return index;
      });
      data.some(function (cell) {
        var defineArg;
        groupsWithUndefinedValueType.forEach(function (group, groupIndex) {
          if (checkValueTypeOfGroup(group, cell) && groupsIndexes.indexOf(groupIndex) >= 0) {
            groupsIndexes.splice(groupIndex, 1);
          }
        });
        if (!defineArg) {
          groupsWithUndefinedArgumentType.forEach(function (group) {
            defineArg = checkArgumentTypeOfGroup(group.series, cell, groupsData);
          });
        }
        if (!checkTypeForAllData && defineArg && groupsIndexes.length === 0) {
          return true;
        }
      });
    }
  }
  function checkAxisType(groupsData, incidentOccurred) {
    var argumentOptions = groupsData.argumentOptions || {};
    var userArgumentCategories = argumentOptions && argumentOptions.categories || [];
    var argumentAxisType = correctAxisType(groupsData.argumentType, argumentOptions.type, !!userArgumentCategories.length, incidentOccurred);
    groupsData.groups.forEach(function (group) {
      var valueOptions = group.valueOptions || {};
      var valueCategories = valueOptions.categories || [];
      var valueAxisType = correctAxisType(group.valueType, valueOptions.type, !!valueCategories.length, incidentOccurred);
      group.series.forEach(function (series) {
        var optionsSeries = {};
        optionsSeries.argumentAxisType = argumentAxisType;
        optionsSeries.valueAxisType = valueAxisType;
        groupsData.argumentAxisType = groupsData.argumentAxisType || optionsSeries.argumentAxisType;
        group.valueAxisType = group.valueAxisType || optionsSeries.valueAxisType;
        optionsSeries.argumentType = groupsData.argumentType;
        optionsSeries.valueType = group.valueType;
        optionsSeries.showZero = valueOptions.showZero;
        series.updateDataType(optionsSeries);
      });
      group.valueAxisType = group.valueAxisType || valueAxisType;
      if (group.valueAxis) {
        group.valueAxis.setTypes(group.valueAxisType, group.valueType, VALUE_TYPE);
        group.valueAxis.validate();
      }
    });
    groupsData.argumentAxisType = groupsData.argumentAxisType || argumentAxisType;
    if (groupsData.argumentAxes) {
      groupsData.argumentAxes.forEach(function (axis) {
        axis.setTypes(groupsData.argumentAxisType, groupsData.argumentType, ARGUMENT_TYPE);
        axis.validate();
      });
    }
  }
  function verifyData(source, incidentOccurred) {
    var data = [];
    var sourceIsDefined = (0, _type.isDefined)(source);
    var hasError = sourceIsDefined && !_isArray(source);
    var i;
    var ii;
    var k;
    var item;
    if (sourceIsDefined && !hasError) {
      for (i = 0, ii = source.length, k = 0; i < ii; ++i) {
        item = source[i];
        if ((0, _type.isObject)(item)) {
          data[k++] = item;
        } else if (item) {
          // TODO: And what about `null`, `undefined` and `0`?
          hasError = true;
        }
      }
    }
    if (hasError) {
      incidentOccurred('E2001');
    }
    return data;
  }
  function validateData(data, groupsData, incidentOccurred, options) {
    data = verifyData(data, incidentOccurred);
    groupsData.argumentType = groupsData.argumentAxisType = null;
    processGroups(groupsData.groups);
    resetArgumentAxes(groupsData.argumentAxes);
    checkType(data, groupsData, options.checkTypeForAllData);
    checkAxisType(groupsData, incidentOccurred);
    if (options.convertToAxisDataType) {
      data = parse(data, prepareParsers(groupsData, incidentOccurred));
    }
    groupPieData(data, groupsData);
    var dataByArgumentFields = sortData(data, groupsData, options, getUniqueArgumentFields(groupsData));
    return dataByArgumentFields;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend","../core/utils","./parse_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"), require("../core/utils"), require("./parse_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=data_validator.js.map