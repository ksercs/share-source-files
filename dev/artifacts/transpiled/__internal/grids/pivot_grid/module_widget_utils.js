"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScrollbarWidth = exports.getScrollbarWidth = exports.capitalizeFirstLetter = exports.storeDrillDownMixin = exports.getFiltersByPath = exports.setDefaultFieldValueFormatting = exports.getFieldsDataType = exports.discoverObjectFields = exports.getExpandedLevel = exports.mergeArraysByMaxValue = exports.foreachDataLevel = exports.createPath = exports.getCompareFunction = exports.formatValue = exports.findField = exports.foreachTreeAsync = exports.foreachTree = exports.sendRequest = exports.setFieldProperty = void 0;
var dom_adapter_1 = __importDefault(require("../../../core/dom_adapter"));
var call_once_1 = __importDefault(require("../../../core/utils/call_once"));
var type_1 = require("../../../core/utils/type");
var ajax_1 = __importDefault(require("../../../core/utils/ajax"));
var data_1 = require("../../../core/utils/data");
var iterator_1 = require("../../../core/utils/iterator");
var extend_1 = require("../../../core/utils/extend");
var date_1 = __importDefault(require("../../../localization/date"));
var format_helper_1 = __importDefault(require("../../../format_helper"));
var data_source_1 = require("../../../data/data_source/data_source");
var array_store_1 = __importDefault(require("../../../data/array_store"));
var deferred_1 = require("../../../core/utils/deferred");
var setFieldProperty = function (field, property, value, isInitialization) {
    var initProperties = field._initProperties = field._initProperties || {};
    var initValue = isInitialization ? value : field[property];
    if (!Object.prototype.hasOwnProperty.call(initProperties, property) || isInitialization) {
        initProperties[property] = initValue;
    }
    field[property] = value;
};
exports.setFieldProperty = setFieldProperty;
function sendRequest(options) {
    return ajax_1.default.sendRequest(options);
}
exports.sendRequest = sendRequest;
var foreachTreeAsyncDate = new Date();
function createForeachTreeFunc(isAsync) {
    var foreachTreeFunc = function (items, callback, parentAtFirst, members, index, isChildrenProcessing) {
        members = members || [];
        items = items || [];
        var i;
        var deferred;
        index = index || 0;
        function createForeachTreeAsyncHandler(deferred, i, isChildrenProcessing) {
            deferred_1.when(foreachTreeFunc(items, callback, parentAtFirst, members, i, isChildrenProcessing))
                .done(deferred.resolve);
        }
        for (i = index; i < items.length; i += 1) {
            if (isAsync
                && i > index
                && i % 10000 === 0
                && (new Date() - foreachTreeAsyncDate >= 300)) {
                foreachTreeAsyncDate = new Date();
                // @ts-expect-error
                deferred = new deferred_1.Deferred();
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
                        deferred = new deferred_1.Deferred();
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
    if (fields && type_1.isDefined(id)) {
        for (var i = 0; i < fields.length; i += 1) {
            var field = fields[i];
            if (field.name === id
                || field.caption === id
                || field.dataField === id
                || field.index === id) {
                return i;
            }
        }
    }
    return -1;
}
exports.findField = findField;
function formatValue(value, options) {
    // because isNaN function works incorrectly with strings and undefined (T889965)
    var valueText = value === value && format_helper_1.default.format(value, options.format);
    var formatObject = {
        value: value,
        valueText: valueText || '',
    };
    return options.customizeText
        ? options.customizeText.call(options, formatObject)
        : formatObject.valueText;
}
exports.formatValue = formatValue;
function getCompareFunction(valueSelector) {
    return function (a, b) {
        var result = 0;
        var valueA = valueSelector(a);
        var valueB = valueSelector(b);
        var aIsDefined = type_1.isDefined(valueA);
        var bIsDefined = type_1.isDefined(valueB);
        if (aIsDefined && bIsDefined) {
            if (valueA > valueB) {
                result = 1;
            }
            else if (valueA < valueB) {
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
exports.getCompareFunction = getCompareFunction;
function createPath(items) {
    var result = [];
    for (var i = items.length - 1; i >= 0; i -= 1) {
        result.push(items[i].key || items[i].value);
    }
    return result;
}
exports.createPath = createPath;
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
exports.foreachDataLevel = foreachDataLevel;
function mergeArraysByMaxValue(values1, values2) {
    var result = [];
    for (var i = 0; i < values1.length; i += 1) {
        result.push(Math.max(values1[i] || 0, values2[i] || 0));
    }
    return result;
}
exports.mergeArraysByMaxValue = mergeArraysByMaxValue;
function getExpandedLevel(options, axisName) {
    var dimensions = options[axisName];
    var expandLevel = 0;
    var expandedPaths = (axisName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
    if (options.headerName === axisName) {
        expandLevel = options.path.length;
    }
    else if (options.headerName && options.headerName !== axisName && options.oppositePath) {
        expandLevel = options.oppositePath.length;
    }
    else {
        iterator_1.each(expandedPaths, function (_, path) {
            expandLevel = Math.max(expandLevel, path.length);
        });
    }
    while (dimensions[expandLevel + 1] && dimensions[expandLevel].expanded) {
        expandLevel += 1;
    }
    return expandLevel;
}
exports.getExpandedLevel = getExpandedLevel;
function createGroupFields(item) {
    return iterator_1.map(['year', 'quarter', 'month'], function (value, index) { return extend_1.extend({}, item, { groupInterval: value, groupIndex: index }); });
}
function parseFields(dataSource, fieldsList, path, fieldsDataType) {
    var result = [];
    Object.keys(fieldsList || []).forEach(function (field) {
        if (field && field.startsWith('__'))
            return;
        var dataIndex = 1;
        var currentPath = path.length ? path + "." + field : field;
        var dataType = fieldsDataType[currentPath];
        var getter = data_1.compileGetter(currentPath);
        var value = fieldsList[field];
        var items;
        while (!type_1.isDefined(value) && dataSource[dataIndex]) {
            value = getter(dataSource[dataIndex]);
            dataIndex += 1;
        }
        if (!dataType && type_1.isDefined(value)) {
            dataType = type_1.type(value);
        }
        items = [{
                dataField: currentPath,
                dataType: dataType,
                groupName: dataType === 'date' ? field : undefined,
                groupInterval: undefined,
                displayFolder: path,
            }];
        if (dataType === 'date') {
            items = items.concat(createGroupFields(items[0]));
        }
        else if (dataType === 'object') {
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
exports.discoverObjectFields = discoverObjectFields;
function getFieldsDataType(fields) {
    var result = {};
    iterator_1.each(fields, function (_, field) {
        result[field.dataField] = result[field.dataField] || field.dataType;
    });
    return result;
}
exports.getFieldsDataType = getFieldsDataType;
var DATE_INTERVAL_FORMATS = {
    month: function (value) {
        return date_1.default.getMonthNames()[value - 1];
    },
    quarter: function (value) {
        return date_1.default.format(new Date(2000, value * 3 - 1), 'quarter');
    },
    dayOfWeek: function (value) {
        return date_1.default.getDayNames()[value];
    },
};
function setDefaultFieldValueFormatting(field) {
    if (field.dataType === 'date') {
        if (!field.format) {
            setFieldProperty(field, 'format', DATE_INTERVAL_FORMATS[field.groupInterval]);
        }
    }
    else if (field.dataType === 'number') {
        var groupInterval_1 = type_1.isNumeric(field.groupInterval)
            && field.groupInterval > 0
            && field.groupInterval;
        if (groupInterval_1 && !field.customizeText) {
            setFieldProperty(field, 'customizeText', function (formatObject) {
                var secondValue = formatObject.value + groupInterval_1;
                var secondValueText = format_helper_1.default.format(secondValue, field.format);
                return formatObject.valueText && secondValueText ? formatObject.valueText + " - " + secondValueText : '';
            });
        }
    }
}
exports.setDefaultFieldValueFormatting = setDefaultFieldValueFormatting;
function getFiltersByPath(fields, path) {
    var result = [];
    path = path || [];
    for (var i = 0; i < path.length; i += 1) {
        result.push(extend_1.extend({}, fields[i], {
            groupIndex: null,
            groupName: null,
            filterType: 'include',
            filterValues: [path[i]],
        }));
    }
    return result;
}
exports.getFiltersByPath = getFiltersByPath;
var storeDrillDownMixin = {
    createDrillDownDataSource: function (descriptions, params) {
        var items = this.getDrillDownItems(descriptions, params);
        var arrayStore;
        function createCustomStoreMethod(methodName) {
            return function (options) {
                var d;
                if (arrayStore) {
                    d = arrayStore[methodName](options);
                }
                else {
                    // @ts-expect-error
                    d = new deferred_1.Deferred();
                    deferred_1.when(items).done(function (data) {
                        var arrayStore = new array_store_1.default(data);
                        arrayStore[methodName](options).done(d.resolve).fail(d.reject);
                    }).fail(d.reject);
                }
                return d;
            };
        }
        var dataSource = new data_source_1.DataSource({
            load: createCustomStoreMethod('load'),
            totalCount: createCustomStoreMethod('totalCount'),
            key: this.key(),
        });
        return dataSource;
    },
};
exports.storeDrillDownMixin = storeDrillDownMixin;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
var getScrollbarWidth = function (containerElement) { return containerElement.offsetWidth - containerElement.clientWidth; };
exports.getScrollbarWidth = getScrollbarWidth;
var calculateScrollbarWidth = call_once_1.default(function () {
    var document = dom_adapter_1.default.getDocument();
    document.body.insertAdjacentHTML('beforeend', '<div style=\'position: absolute; overflow: scroll; width: 100px; height: 100px; top: -9999px;\'></div>');
    var scrollbar = document.body.lastElementChild;
    var scrollbarWidth = getScrollbarWidth(scrollbar);
    if (scrollbar) {
        document.body.removeChild(scrollbar);
    }
    return scrollbarWidth;
});
exports.calculateScrollbarWidth = calculateScrollbarWidth;
exports.default = {
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
    calculateScrollbarWidth: calculateScrollbarWidth,
};