"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDisplaySummaryMode = exports.createMockSummaryCell = exports.applyRunningTotal = exports.getExpression = exports.summaryDictionary = exports.Cell = void 0;
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var module_widget_utils_1 = __importStar(require("../module_widget_utils"));
var COLUMN = 'column';
var ROW = 'row';
var NULL = null;
var calculatePercentValue = function (value, totalValue) {
    var result = value / totalValue;
    if (!type_1.isDefined(value) || isNaN(result)) {
        result = NULL;
    }
    return result;
};
var percentOfGrandTotal = function (e, dimension) {
    return calculatePercentValue(e.value(), e.grandTotal(dimension).value());
};
var percentOfParent = function (e, dimension) {
    var parent = e.parent(dimension);
    var parentValue = parent ? parent.value() : e.value();
    return calculatePercentValue(e.value(), parentValue);
};
var createAbsoluteVariationExp = function (allowCrossGroup) {
    return function (e) {
        var prevCell = e.prev(COLUMN, allowCrossGroup);
        var prevValue = prevCell && prevCell.value();
        if (type_1.isDefined(prevValue) && type_1.isDefined(e.value())) {
            return e.value() - prevValue;
        }
        return NULL;
    };
};
var createPercentVariationExp = function (allowCrossGroup) {
    var absoluteExp = createAbsoluteVariationExp(allowCrossGroup);
    return function (e) {
        var absVar = absoluteExp(e);
        var prevCell = e.prev(COLUMN, allowCrossGroup);
        var prevValue = prevCell && prevCell.value();
        return absVar !== NULL && prevValue ? absVar / prevValue : NULL;
    };
};
var summaryDictionary = {
    percentOfColumnTotal: function (e) {
        return percentOfParent(e, ROW);
    },
    percentOfRowTotal: function (e) {
        return percentOfParent(e, COLUMN);
    },
    percentOfColumnGrandTotal: function (e) {
        return percentOfGrandTotal(e, ROW);
    },
    percentOfRowGrandTotal: function (e) {
        return percentOfGrandTotal(e, COLUMN);
    },
    percentOfGrandTotal: function (e) {
        return percentOfGrandTotal(e);
    },
};
exports.summaryDictionary = summaryDictionary;
var getPrevCellCrossGroup = function (cell, direction) {
    if (!cell || !cell.parent(direction)) {
        return undefined;
    }
    var prevCell = cell.prev(direction);
    if (!prevCell) {
        prevCell = getPrevCellCrossGroup(cell.parent(direction), direction);
    }
    return prevCell;
};
var createRunningTotalExpr = function (field) {
    if (!field.runningTotal) {
        return undefined;
    }
    var direction = field.runningTotal === COLUMN ? ROW : COLUMN;
    return function (e) {
        var prevCell = field.allowCrossGroupCalculation
            ? getPrevCellCrossGroup(e, direction)
            : e.prev(direction, false);
        var value = e.value(true);
        var prevValue = prevCell && prevCell.value(true);
        if (type_1.isDefined(prevValue) && type_1.isDefined(value)) {
            value = prevValue + value;
        }
        else if (type_1.isDefined(prevValue)) {
            value = prevValue;
        }
        return value;
    };
};
function createCache() {
    return {
        fields: {},
        positions: {},
    };
}
function getFieldPos(descriptions, field, cache) {
    var fieldParams = {
        index: -1,
    };
    if (!type_1.isObject(field)) {
        if (cache.fields[field]) {
            field = cache[field];
        }
        else {
            var allFields = descriptions.columns.concat(descriptions.rows).concat(descriptions.values);
            var fieldIndex = module_widget_utils_1.findField(allFields, field);
            field = cache[field] = allFields[fieldIndex];
        }
    }
    if (field) {
        var area = field.area || 'data';
        fieldParams = cache.positions[field.index] = cache.positions[field.index] || {
            area: area,
            index: descriptions[area === 'data' ? 'values' : area + "s"].indexOf(field),
        };
    }
    return fieldParams;
}
function getPathFieldName(dimension) {
    return dimension === ROW ? '_rowPath' : '_columnPath';
}
var SummaryCell = function (columnPath, rowPath, data, descriptions, fieldIndex, fieldsCache) {
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
    var cell = data.values
        && data.values[rowPath[0].index]
        && data.values[rowPath[0].index][columnPath[0].index];
    if (cell) {
        cell.originalCell = cell.originalCell || cell.slice();
        cell.postProcessedFlags = cell.postProcessedFlags || [];
        // - @ts-expect-error
        this._cell = cell;
    }
};
exports.Cell = SummaryCell;
SummaryCell.prototype = extend_1.extend(SummaryCell.prototype, {
    _getPath: function (dimension) {
        return this[getPathFieldName(dimension)];
    },
    _getDimension: function (dimension) {
        dimension = dimension === ROW ? 'rows' : 'columns';
        return this._descriptions[dimension];
    },
    _createCell: function (config) {
        var that = this;
        return new SummaryCell(config._columnPath || that._columnPath, config._rowPath || that._rowPath, that._data, that._descriptions, that._fieldIndex);
    },
    parent: function (direction) {
        var path = this._getPath(direction).slice();
        var config = {};
        path.shift();
        if (path.length) {
            config[getPathFieldName(direction)] = path;
            return this._createCell(config);
        }
        return NULL;
    },
    children: function (direction) {
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
    grandTotal: function (direction) {
        var config = {};
        var rowPath = this._rowPath;
        var columnPath = this._columnPath;
        var dimensionPath = this._getPath(direction);
        var pathFieldName = getPathFieldName(direction);
        if (!direction) {
            config._rowPath = [rowPath[rowPath.length - 1]];
            config._columnPath = [columnPath[columnPath.length - 1]];
        }
        else {
            config[pathFieldName] = [dimensionPath[dimensionPath.length - 1]];
        }
        return this._createCell(config);
    },
    next: function (direction, allowCrossGroup) {
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
    prev: function (direction, allowCrossGroup) {
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
    cell: function () {
        return this._cell;
    },
    field: function (area) {
        if (area === 'data') {
            return this._descriptions.values[this._fieldIndex];
        }
        var path = this._getPath(area);
        var descriptions = this._getDimension(area);
        var field = descriptions[path.length - 2];
        return field || NULL;
    },
    child: function (direction, fieldValue) {
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
    slice: function (field, value) {
        var that = this;
        var config = {};
        var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
        var area = fieldPos.area;
        var fieldIndex = fieldPos.index;
        var sliceCell = NULL;
        var newPath = [];
        if (area === ROW || area === COLUMN) {
            var path = this._getPath(area).slice();
            var level = fieldIndex !== -1 && (path.length - 2 - fieldIndex);
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
    value: function (arg1, arg2) {
        var cell = this._cell;
        var fieldIndex = this._fieldIndex;
        var fistArgIsBoolean = arg1 === true || arg1 === false;
        var field = !fistArgIsBoolean ? arg1 : NULL;
        var needCalculatedValue = fistArgIsBoolean && arg1 || arg2;
        if (type_1.isDefined(field)) {
            var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
            fieldIndex = fieldPos.index;
            if (fieldPos.area !== 'data') {
                var path = this._getPath(fieldPos.area);
                var level = fieldIndex !== -1 && (path.length - 2 - fieldIndex);
                return path[level] && path[level].value;
            }
        }
        if (cell && cell.originalCell) {
            return needCalculatedValue ? cell[fieldIndex] : cell.originalCell[fieldIndex];
        }
        return NULL;
    },
    isPostProcessed: function (field) {
        var fieldIndex = this._fieldIndex;
        if (type_1.isDefined(field)) {
            var fieldPos = getFieldPos(this._descriptions, field, this._fieldsCache);
            fieldIndex = fieldPos.index;
            if (fieldPos.area !== 'data') {
                return false;
            }
        }
        return !!(this._cell && this._cell.postProcessedFlags[fieldIndex]);
    },
});
function getExpression(field) {
    var summaryDisplayMode = field.summaryDisplayMode;
    var crossGroupCalculation = field.allowCrossGroupCalculation;
    var expression = NULL;
    if (type_1.isFunction(field.calculateSummaryValue)) {
        expression = field.calculateSummaryValue;
    }
    else if (summaryDisplayMode) {
        if (summaryDisplayMode === 'absoluteVariation') {
            expression = createAbsoluteVariationExp(crossGroupCalculation);
        }
        else if (summaryDisplayMode === 'percentVariation') {
            expression = createPercentVariationExp(crossGroupCalculation);
        }
        else {
            expression = summaryDictionary[summaryDisplayMode];
        }
        if (expression && !field.format && summaryDisplayMode.indexOf('percent') !== -1) {
            module_widget_utils_1.default.setFieldProperty(field, 'format', 'percent');
        }
    }
    return expression;
}
exports.getExpression = getExpression;
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
    var columnElements = [{ index: data.grandTotalColumnIndex, children: data.columns }];
    var rowElements = [{ index: data.grandTotalRowIndex, children: data.rows }];
    var valueFields = descriptions.values;
    var fieldsCache = createCache();
    data.values = data.values || [];
    module_widget_utils_1.foreachTree(columnElements, function (columnPath) {
        columnPath[0].isEmpty = [];
    }, false);
    module_widget_utils_1.foreachTree(rowElements, function (rowPath) {
        var rowItem = rowPath[0];
        rowItem.isEmpty = [];
        data.values[rowItem.index] = data.values[rowItem.index] || [];
        module_widget_utils_1.foreachTree(columnElements, function (columnPath) {
            var columnItem = columnPath[0];
            var isEmptyCell;
            processDataCell(data, rowItem.index, columnItem.index, false);
            for (var i = 0; i < valueFields.length; i += 1) {
                var field = valueFields[i];
                var expression = expressions[i] = expressions[i] === undefined
                    ? getExpression(field)
                    : expressions[i];
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
exports.applyDisplaySummaryMode = applyDisplaySummaryMode;
function applyRunningTotal(descriptions, data) {
    var expressions = [];
    var columnElements = [{ index: data.grandTotalColumnIndex, children: data.columns }];
    var rowElements = [{ index: data.grandTotalRowIndex, children: data.rows }];
    var valueFields = descriptions.values;
    var fieldsCache = createCache();
    data.values = data.values || [];
    module_widget_utils_1.foreachTree(rowElements, function (rowPath) {
        var rowItem = rowPath[0];
        data.values[rowItem.index] = data.values[rowItem.index] || [];
        module_widget_utils_1.foreachTree(columnElements, function (columnPath) {
            var columnItem = columnPath[0];
            processDataCell(data, rowItem.index, columnItem.index, true);
            for (var i = 0; i < valueFields.length; i += 1) {
                var field = valueFields[i];
                var expression = expressions[i] = expressions[i] === undefined
                    ? createRunningTotalExpr(field)
                    : expressions[i];
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
exports.applyRunningTotal = applyRunningTotal;
function createMockSummaryCell(descriptions, fields, indices) {
    var summaryCell = new SummaryCell([], [], {}, descriptions, 0);
    summaryCell.value = function (fieldId) {
        if (type_1.isDefined(fieldId)) {
            var index = module_widget_utils_1.findField(fields, fieldId);
            var field = fields[index];
            if (!indices[index] && field && !type_1.isDefined(field.area)) {
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
exports.createMockSummaryCell = createMockSummaryCell;
exports.default = {
    Cell: SummaryCell,
    summaryDictionary: summaryDictionary,
    getExpression: getExpression,
    applyRunningTotal: applyRunningTotal,
    createMockSummaryCell: createMockSummaryCell,
    applyDisplaySummaryMode: applyDisplaySummaryMode,
};