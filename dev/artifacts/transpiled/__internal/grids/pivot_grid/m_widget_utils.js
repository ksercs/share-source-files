"use strict";

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
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _ajax = _interopRequireDefault(require("../../../core/utils/ajax"));
var _call_once = _interopRequireDefault(require("../../../core/utils/call_once"));
var _data = require("../../../core/utils/data");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _array_store = _interopRequireDefault(require("../../../data/array_store"));
var _data_source = require("../../../data/data_source/data_source");
var _format_helper = _interopRequireDefault(require("../../../format_helper"));
var _date = _interopRequireDefault(require("../../../localization/date"));
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var setFieldProperty = function setFieldProperty(field, property, value, isInitialization) {
  var initProperties = field._initProperties = field._initProperties || {};
  var initValue = isInitialization ? value : field[property];
  var needInitProperty = !Object.prototype.hasOwnProperty.call(initProperties, property) || isInitialization;
  if (needInitProperty && property !== '_initProperties') {
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
    value,
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
      dataType,
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
  month(value) {
    return _date.default.getMonthNames()[value - 1];
  },
  quarter(value) {
    return _date.default.format(new Date(2000, value * 3 - 1), 'quarter');
  },
  dayOfWeek(value) {
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
  createDrillDownDataSource(descriptions, params) {
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
  setFieldProperty,
  sendRequest,
  foreachTree,
  foreachTreeAsync,
  findField,
  formatValue,
  getCompareFunction,
  createPath,
  foreachDataLevel,
  mergeArraysByMaxValue,
  getExpandedLevel,
  discoverObjectFields,
  getFieldsDataType,
  setDefaultFieldValueFormatting,
  getFiltersByPath,
  storeDrillDownMixin,
  capitalizeFirstLetter,
  getScrollbarWidth,
  calculateScrollbarWidth
};
exports.default = _default;