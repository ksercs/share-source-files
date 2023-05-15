!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/summary_display_modes/module.js"], ["../../../../core/utils/type","../../../../core/utils/extend","../module_widget_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/summary_display_modes/module.js", ["../../../../core/utils/type", "../../../../core/utils/extend", "../module_widget_utils"], true, function ($__require, exports, module) {
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
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cell = void 0;
  exports.applyDisplaySummaryMode = applyDisplaySummaryMode;
  exports.applyRunningTotal = applyRunningTotal;
  exports.createMockSummaryCell = createMockSummaryCell;
  exports.default = void 0;
  exports.getExpression = getExpression;
  exports.summaryDictionary = void 0;
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _module_widget_utils = _interopRequireWildcard($__require("../module_widget_utils"));
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  var COLUMN = 'column';
  var ROW = 'row';
  var NULL = null;
  var calculatePercentValue = function calculatePercentValue(value, totalValue) {
    var result = value / totalValue;
    if (!(0, _type.isDefined)(value) || isNaN(result)) {
      result = NULL;
    }
    return result;
  };
  var _percentOfGrandTotal = function percentOfGrandTotal(e, dimension) {
    return calculatePercentValue(e.value(), e.grandTotal(dimension).value());
  };
  var percentOfParent = function percentOfParent(e, dimension) {
    var parent = e.parent(dimension);
    var parentValue = parent ? parent.value() : e.value();
    return calculatePercentValue(e.value(), parentValue);
  };
  var createAbsoluteVariationExp = function createAbsoluteVariationExp(allowCrossGroup) {
    return function (e) {
      var prevCell = e.prev(COLUMN, allowCrossGroup);
      var prevValue = prevCell && prevCell.value();
      if ((0, _type.isDefined)(prevValue) && (0, _type.isDefined)(e.value())) {
        return e.value() - prevValue;
      }
      return NULL;
    };
  };
  var createPercentVariationExp = function createPercentVariationExp(allowCrossGroup) {
    var absoluteExp = createAbsoluteVariationExp(allowCrossGroup);
    return function (e) {
      var absVar = absoluteExp(e);
      var prevCell = e.prev(COLUMN, allowCrossGroup);
      var prevValue = prevCell && prevCell.value();
      return absVar !== NULL && prevValue ? absVar / prevValue : NULL;
    };
  };
  var summaryDictionary = {
    percentOfColumnTotal: function percentOfColumnTotal(e) {
      return percentOfParent(e, ROW);
    },
    percentOfRowTotal: function percentOfRowTotal(e) {
      return percentOfParent(e, COLUMN);
    },
    percentOfColumnGrandTotal: function percentOfColumnGrandTotal(e) {
      return _percentOfGrandTotal(e, ROW);
    },
    percentOfRowGrandTotal: function percentOfRowGrandTotal(e) {
      return _percentOfGrandTotal(e, COLUMN);
    },
    percentOfGrandTotal: function percentOfGrandTotal(e) {
      return _percentOfGrandTotal(e);
    }
  };
  exports.summaryDictionary = summaryDictionary;
  var getPrevCellCrossGroup = function getPrevCellCrossGroup(cell, direction) {
    if (!cell || !cell.parent(direction)) {
      return undefined;
    }
    var prevCell = cell.prev(direction);
    if (!prevCell) {
      prevCell = getPrevCellCrossGroup(cell.parent(direction), direction);
    }
    return prevCell;
  };
  var createRunningTotalExpr = function createRunningTotalExpr(field) {
    if (!field.runningTotal) {
      return undefined;
    }
    var direction = field.runningTotal === COLUMN ? ROW : COLUMN;
    return function (e) {
      var prevCell = field.allowCrossGroupCalculation ? getPrevCellCrossGroup(e, direction) : e.prev(direction, false);
      var value = e.value(true);
      var prevValue = prevCell && prevCell.value(true);
      if ((0, _type.isDefined)(prevValue) && (0, _type.isDefined)(value)) {
        value = prevValue + value;
      } else if ((0, _type.isDefined)(prevValue)) {
        value = prevValue;
      }
      return value;
    };
  };
  function createCache() {
    return {
      fields: {},
      positions: {}
    };
  }
  function getFieldPos(descriptions, field, cache) {
    var fieldParams = {
      index: -1
    };
    if (!(0, _type.isObject)(field)) {
      if (cache.fields[field]) {
        field = cache[field];
      } else {
        var allFields = descriptions.columns.concat(descriptions.rows).concat(descriptions.values);
        var fieldIndex = (0, _module_widget_utils.findField)(allFields, field);
        field = cache[field] = allFields[fieldIndex];
      }
    }
    if (field) {
      var area = field.area || 'data';
      fieldParams = cache.positions[field.index] = cache.positions[field.index] || {
        area: area,
        index: descriptions[area === 'data' ? 'values' : "".concat(area, "s")].indexOf(field)
      };
    }
    return fieldParams;
  }
  function getPathFieldName(dimension) {
    return dimension === ROW ? '_rowPath' : '_columnPath';
  }
  var SummaryCell = function SummaryCell(columnPath, rowPath, data, descriptions, fieldIndex, fieldsCache) {
    // - @ts-expect-error
    this._columnPath = columnPath;
    // - @ts-expect-error
    this._rowPath = rowPath;
    // - @ts-expect-error
    this._fieldIndex = fieldIndex;
    // - @ts-expect-error
    this._fieldsCache = fieldsCache || createCache();
    // - @ts-expect-error
    this._data = data;
    // - @ts-expect-error
    this._descriptions = descriptions;
    var cell = data.values && data.values[rowPath[0].index] && data.values[rowPath[0].index][columnPath[0].index];
    if (cell) {
      cell.originalCell = cell.originalCell || cell.slice();
      cell.postProcessedFlags = cell.postProcessedFlags || [];
      // - @ts-expect-error
      this._cell = cell;
    }
  };
  exports.Cell = SummaryCell;
  SummaryCell.prototype = (0, _extend.extend)(SummaryCell.prototype, {
    _getPath: function _getPath(dimension) {
      return this[getPathFieldName(dimension)];
    },
    _getDimension: function _getDimension(dimension) {
      dimension = dimension === ROW ? 'rows' : 'columns';
      return this._descriptions[dimension];
    },
    _createCell: function _createCell(config) {
      var that = this;
      return new SummaryCell(config._columnPath || that._columnPath, config._rowPath || that._rowPath, that._data, that._descriptions, that._fieldIndex);
    },
    parent: function parent(direction) {
      var path = this._getPath(direction).slice();
      var config = {};
      path.shift();
      if (path.length) {
        config[getPathFieldName(direction)] = path;
        return this._createCell(config);
      }
      return NULL;
    },
    children: function children(direction) {
      var path = this._getPath(direction).slice();
      var item = path[0];
      var result = [];
      var cellConfig = {};
      if (item.children) {
        for (var i = 0; i < item.children.length; i += 1) {
          cellConfig[getPathFieldName(direction)] = [item.children[i]].concat(path.slice());
          // @ts-expect-error
          result.push(this._createCell(cellConfig));
        }
      }
      return result;
    },
    grandTotal: function grandTotal(direction) {
      var config = {};
      var rowPath = this._rowPath;
      var columnPath = this._columnPath;
      var dimensionPath = this._getPath(direction);
      var pathFieldName = getPathFieldName(direction);
      if (!direction) {
        config._rowPath = [rowPath[rowPath.length - 1]];
        config._columnPath = [columnPath[columnPath.length - 1]];
      } else {
        config[pathFieldName] = [dimensionPath[dimensionPath.length - 1]];
      }
      return this._createCell(config);
    },
    next: function next(direction, allowCrossGroup) {
      var currentPath = this._getPath(direction);
      var item = currentPath[0];
      var parent = this.parent(direction);
      var siblings;
      if (parent) {
        var index = currentPath[1].children.indexOf(item);
        siblings = parent.children(direction);
        if (siblings[index + 1]) {
          return siblings[index + 1];
        }
      }
      if (allowCrossGroup && parent) {
        do {
          parent = parent.next(direction, allowCrossGroup);
          siblings = parent ? parent.children(direction) : [];
        } while (parent && !siblings.length);
        return siblings[0] || NULL;
      }
      return NULL;
    },
    prev: function prev(direction, allowCrossGroup) {
      var currentPath = this._getPath(direction);
      var item = currentPath[0];
      var parent = this.parent(direction);
      var siblings;
      if (parent) {
        var index = currentPath[1].children.indexOf(item);
        siblings = parent.children(direction);
        if (siblings[index - 1]) {
          return siblings[index - 1];
        }
      }
      if (allowCrossGroup && parent) {
        do {
          parent = parent.prev(direction, allowCrossGroup);
          siblings = parent ? parent.children(direction) : [];
        } while (parent && !siblings.length);
        return siblings[siblings.length - 1] || NULL;
      }
      return NULL;
    },
    cell: function cell() {
      return this._cell;
    },
    field: function field(area) {
      if (area === 'data') {
        return this._descriptions.values[this._fieldIndex];
      }
      var path = this._getPath(area);
      var descriptions = this._getDimension(area);
      var field = descriptions[path.length - 2];
      return field || NULL;
    },
    child: function child(direction, fieldValue) {
      var childLevelField;
      var children = this.children(direction);
      for (var i = 0; i < children.length; i += 1) {
        childLevelField = childLevelField || children[i].field(direction);
        if (children[i].value(childLevelField) === fieldValue) {
          return children[i];
        }
      }
      return NULL;
    },
    slice: function slice(field, value) {
      var that = this;
      var config = {};
      var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
      var area = fieldPos.area;
      var fieldIndex = fieldPos.index;
      var sliceCell = NULL;
      var newPath = [];
      if (area === ROW || area === COLUMN) {
        var path = this._getPath(area).slice();
        var level = fieldIndex !== -1 && path.length - 2 - fieldIndex;
        if (path[level]) {
          newPath[path.length - 1] = path[path.length - 1];
          for (var i = level; i >= 0; i -= 1) {
            if (path[i + 1]) {
              var childItems = path[i + 1].children || [];
              var currentValue = i === level ? value : path[i].value;
              path[i] = undefined;
              for (var childIndex = 0; childIndex < childItems.length; childIndex += 1) {
                if (childItems[childIndex].value === currentValue) {
                  path[i] = childItems[childIndex];
                  break;
                }
              }
            }
            if (path[i] === undefined) {
              return sliceCell;
            }
          }
          config[getPathFieldName(area)] = path;
          sliceCell = that._createCell(config);
        }
      }
      return sliceCell;
    },
    value: function value(arg1, arg2) {
      var cell = this._cell;
      var fieldIndex = this._fieldIndex;
      var fistArgIsBoolean = arg1 === true || arg1 === false;
      var field = !fistArgIsBoolean ? arg1 : NULL;
      var needCalculatedValue = fistArgIsBoolean && arg1 || arg2;
      if ((0, _type.isDefined)(field)) {
        var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
        fieldIndex = fieldPos.index;
        if (fieldPos.area !== 'data') {
          var path = this._getPath(fieldPos.area);
          var level = fieldIndex !== -1 && path.length - 2 - fieldIndex;
          return path[level] && path[level].value;
        }
      }
      if (cell && cell.originalCell) {
        return needCalculatedValue ? cell[fieldIndex] : cell.originalCell[fieldIndex];
      }
      return NULL;
    },
    isPostProcessed: function isPostProcessed(field) {
      var fieldIndex = this._fieldIndex;
      if ((0, _type.isDefined)(field)) {
        var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
        fieldIndex = fieldPos.index;
        if (fieldPos.area !== 'data') {
          return false;
        }
      }
      return !!(this._cell && this._cell.postProcessedFlags[fieldIndex]);
    }
  });
  function getExpression(field) {
    var summaryDisplayMode = field.summaryDisplayMode;
    var crossGroupCalculation = field.allowCrossGroupCalculation;
    var expression = NULL;
    if ((0, _type.isFunction)(field.calculateSummaryValue)) {
      expression = field.calculateSummaryValue;
    } else if (summaryDisplayMode) {
      if (summaryDisplayMode === 'absoluteVariation') {
        expression = createAbsoluteVariationExp(crossGroupCalculation);
      } else if (summaryDisplayMode === 'percentVariation') {
        expression = createPercentVariationExp(crossGroupCalculation);
      } else {
        expression = summaryDictionary[summaryDisplayMode];
      }
      if (expression && !field.format && summaryDisplayMode.indexOf('percent') !== -1) {
        _module_widget_utils.default.setFieldProperty(field, 'format', 'percent');
      }
    }
    return expression;
  }
  function processDataCell(data, rowIndex, columnIndex, isRunningTotalCalculation) {
    var values = data.values[rowIndex][columnIndex] = data.values[rowIndex][columnIndex] || [];
    var originalCell = values.originalCell;
    if (!originalCell) {
      return;
    }
    // T571071
    if (values.allowResetting || !isRunningTotalCalculation) {
      data.values[rowIndex][columnIndex] = originalCell.slice();
    }
    data.values[rowIndex][columnIndex].allowResetting = isRunningTotalCalculation;
  }
  function applyDisplaySummaryMode(descriptions, data) {
    var expressions = [];
    var columnElements = [{
      index: data.grandTotalColumnIndex,
      children: data.columns
    }];
    var rowElements = [{
      index: data.grandTotalRowIndex,
      children: data.rows
    }];
    var valueFields = descriptions.values;
    var fieldsCache = createCache();
    data.values = data.values || [];
    (0, _module_widget_utils.foreachTree)(columnElements, function (columnPath) {
      columnPath[0].isEmpty = [];
    }, false);
    (0, _module_widget_utils.foreachTree)(rowElements, function (rowPath) {
      var rowItem = rowPath[0];
      rowItem.isEmpty = [];
      data.values[rowItem.index] = data.values[rowItem.index] || [];
      (0, _module_widget_utils.foreachTree)(columnElements, function (columnPath) {
        var columnItem = columnPath[0];
        var isEmptyCell;
        processDataCell(data, rowItem.index, columnItem.index, false);
        for (var i = 0; i < valueFields.length; i += 1) {
          var field = valueFields[i];
          var expression = expressions[i] = expressions[i] === undefined ? getExpression(field) : expressions[i];
          isEmptyCell = false;
          if (expression) {
            var expressionArg = new SummaryCell(columnPath, rowPath, data, descriptions, i, fieldsCache);
            var cell = expressionArg.cell();
            var value = cell[i] = expression(expressionArg);
            cell.postProcessedFlags[i] = true;
            isEmptyCell = value === null || value === undefined;
          }
          if (columnItem.isEmpty[i] === undefined) {
            columnItem.isEmpty[i] = true;
          }
          if (rowItem.isEmpty[i] === undefined) {
            rowItem.isEmpty[i] = true;
          }
          if (!isEmptyCell) {
            rowItem.isEmpty[i] = columnItem.isEmpty[i] = false;
          }
        }
      }, false);
    }, false);
    data.isEmptyGrandTotalRow = rowElements[0].isEmpty;
    data.isEmptyGrandTotalColumn = columnElements[0].isEmpty;
  }
  function applyRunningTotal(descriptions, data) {
    var expressions = [];
    var columnElements = [{
      index: data.grandTotalColumnIndex,
      children: data.columns
    }];
    var rowElements = [{
      index: data.grandTotalRowIndex,
      children: data.rows
    }];
    var valueFields = descriptions.values;
    var fieldsCache = createCache();
    data.values = data.values || [];
    (0, _module_widget_utils.foreachTree)(rowElements, function (rowPath) {
      var rowItem = rowPath[0];
      data.values[rowItem.index] = data.values[rowItem.index] || [];
      (0, _module_widget_utils.foreachTree)(columnElements, function (columnPath) {
        var columnItem = columnPath[0];
        processDataCell(data, rowItem.index, columnItem.index, true);
        for (var i = 0; i < valueFields.length; i += 1) {
          var field = valueFields[i];
          var expression = expressions[i] = expressions[i] === undefined ? createRunningTotalExpr(field) : expressions[i];
          if (expression) {
            var expressionArg = new SummaryCell(columnPath, rowPath, data, descriptions, i, fieldsCache);
            var cell = expressionArg.cell();
            cell[i] = expression(expressionArg);
            cell.postProcessedFlags[i] = true;
          }
        }
      }, false);
    }, false);
  }
  function createMockSummaryCell(descriptions, fields, indices) {
    var summaryCell = new SummaryCell([], [], {}, descriptions, 0);
    summaryCell.value = function (fieldId) {
      if ((0, _type.isDefined)(fieldId)) {
        var index = (0, _module_widget_utils.findField)(fields, fieldId);
        var field = fields[index];
        if (!indices[index] && field && !(0, _type.isDefined)(field.area)) {
          descriptions.values.push(field);
          indices[index] = true;
        }
      }
    };
    summaryCell.grandTotal = function () {
      return this;
    };
    summaryCell.children = function () {
      return [];
    };
    return summaryCell;
  }
  var _default = {
    Cell: SummaryCell,
    summaryDictionary: summaryDictionary,
    getExpression: getExpression,
    applyRunningTotal: applyRunningTotal,
    createMockSummaryCell: createMockSummaryCell,
    applyDisplaySummaryMode: applyDisplaySummaryMode
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/type","../../../../core/utils/extend","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map