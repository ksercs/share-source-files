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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlaStore = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var window_1 = require("../../../../core/utils/window");
var class_1 = __importDefault(require("../../../../core/class"));
var string_1 = require("../../../../core/utils/string");
// @ts-expect-error
var errors_1 = require("../../../../data/errors");
var common_1 = require("../../../../core/utils/common");
var extend_1 = require("../../../../core/utils/extend");
var type_1 = require("../../../../core/utils/type");
var iterator_1 = require("../../../../core/utils/iterator");
var deferred_1 = require("../../../../core/utils/deferred");
var language_codes_1 = require("../../../../localization/language_codes");
var module_widget_utils_1 = __importStar(require("../module_widget_utils"));
var window = window_1.getWindow();
var XmlaStore = class_1.default.inherit((function () {
    var discover = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><Discover xmlns="urn:schemas-microsoft-com:xml-analysis"><RequestType>{2}</RequestType><Restrictions><RestrictionList><CATALOG_NAME>{0}</CATALOG_NAME><CUBE_NAME>{1}</CUBE_NAME></RestrictionList></Restrictions><Properties><PropertyList><Catalog>{0}</Catalog>{3}</PropertyList></Properties></Discover></Body></Envelope>';
    var execute = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>{0}</Statement></Command><Properties><PropertyList><Catalog>{1}</Catalog><ShowHiddenCubes>True</ShowHiddenCubes><SspropInitAppName>Microsoft SQL Server Management Studio</SspropInitAppName><Timeout>3600</Timeout>{2}</PropertyList></Properties></Execute></Body></Envelope>';
    var mdx = 'SELECT {2} FROM {0} {1} CELL PROPERTIES VALUE, FORMAT_STRING, LANGUAGE, BACK_COLOR, FORE_COLOR, FONT_FLAGS';
    var mdxFilterSelect = '(SELECT {0} FROM {1})';
    var mdxSubset = 'Subset({0}, {1}, {2})';
    var mdxOrder = 'Order({0}, {1}, {2})';
    var mdxWith = '{0} {1} as {2}';
    var mdxSlice = 'WHERE ({0})';
    var mdxNonEmpty = 'NonEmpty({0}, {1})';
    var mdxAxis = '{0} DIMENSION PROPERTIES PARENT_UNIQUE_NAME,HIERARCHY_UNIQUE_NAME, MEMBER_VALUE ON {1}';
    var mdxCrossJoin = 'CrossJoin({0})';
    var mdxSet = '{{0}}';
    var MEASURE_DEMENSION_KEY = 'DX_MEASURES';
    var MD_DIMTYPE_MEASURE = '2';
    function execXMLA(requestOptions, data) {
        // @ts-expect-error
        var deferred = new deferred_1.Deferred();
        var beforeSend = requestOptions.beforeSend;
        var ajaxSettings = {
            url: requestOptions.url,
            dataType: 'text',
            data: data,
            headers: {
                'Content-Type': 'text/xml',
            },
            xhrFields: {},
            method: 'POST',
        };
        if (type_1.isFunction(beforeSend)) {
            beforeSend(ajaxSettings);
        }
        module_widget_utils_1.default.sendRequest(ajaxSettings).fail(function () {
            deferred.reject(arguments);
        }).done(function (text) {
            var parser = new window.DOMParser();
            var xml;
            try {
                try { // For IE
                    xml = parser.parseFromString(text, 'text/xml');
                }
                catch (e) {
                    xml = undefined;
                }
                if (!xml || xml.getElementsByTagName('parsererror').length || xml.childNodes.length === 0) {
                    throw new errors_1.errors.Error('E4023', text);
                }
            }
            catch (e) {
                deferred.reject({
                    statusText: e.message,
                    stack: e.stack,
                    responseText: text,
                });
            }
            deferred.resolve(xml);
        });
        return deferred;
    }
    function getLocaleIdProperty() {
        var languageId = language_codes_1.getLanguageId();
        if (languageId !== undefined) {
            return string_1.format('<LocaleIdentifier>{0}</LocaleIdentifier>', languageId);
        }
        return '';
    }
    function mdxDescendants(level, levelMember, nextLevel) {
        var memberExpression = levelMember || level;
        return "Descendants({" + memberExpression + "}, " + nextLevel + ", SELF_AND_BEFORE)";
    }
    function getAllMember(dimension) {
        return (dimension.hierarchyName || dimension.dataField) + ".[All]";
    }
    function getAllMembers(field) {
        var result = field.dataField + ".allMembers";
        var searchValue = field.searchValue;
        if (searchValue) {
            searchValue = searchValue.replace(/'/g, '\'\'');
            result = "Filter(" + result + ", instr(" + field.dataField + ".currentmember.member_caption,'" + searchValue + "') > 0)";
        }
        return result;
    }
    function crossJoinElements(elements) {
        var elementsString = elements.join(',');
        return elements.length > 1 ? string_1.format(mdxCrossJoin, elementsString) : elementsString;
    }
    function union(elements) {
        var elementsString = elements.join(',');
        return elements.length > 1 ? "Union(" + elementsString + ")" : elementsString;
    }
    function generateCrossJoin(path, expandLevel, expandAllCount, expandIndex, slicePath, options, axisName, take) {
        var crossJoinArgs = [];
        var dimensions = options[axisName];
        var fields = [];
        var arg;
        var prevDimension;
        var member;
        for (var i = expandIndex; i <= expandLevel; i += 1) {
            var field = dimensions[i];
            var dataField = field.dataField;
            var prevHierarchyName = dimensions[i - 1] && dimensions[i - 1].hierarchyName;
            var hierarchyName = field.hierarchyName;
            var isLastDimensionInGroup = !hierarchyName
                || !dimensions[i + 1]
                || dimensions[i + 1].hierarchyName !== hierarchyName;
            var expandAllIndex = path.length + expandAllCount + expandIndex;
            arg = null;
            fields.push(field);
            if (i < path.length) {
                if (isLastDimensionInGroup) {
                    arg = "(" + dataField + "." + preparePathValue(path[i], dataField) + ")";
                }
            }
            else if (i <= expandAllIndex) {
                if (i === 0 && expandAllCount === 0) {
                    var allMember = getAllMember(dimensions[expandIndex]);
                    if (!hierarchyName) {
                        arg = getAllMembers(dimensions[expandIndex]);
                    }
                    else {
                        arg = allMember + "," + dimensions[expandIndex].dataField;
                    }
                }
                else if (hierarchyName) {
                    member = preparePathValue(slicePath[slicePath.length - 1]);
                    if (isLastDimensionInGroup || i === expandAllIndex) {
                        if (prevHierarchyName === hierarchyName) {
                            if (slicePath.length) {
                                prevDimension = dimensions[slicePath.length - 1];
                            }
                            if (!prevDimension || prevDimension.hierarchyName !== hierarchyName) {
                                prevDimension = dimensions[i - 1];
                                member = '';
                            }
                            arg = mdxDescendants(prevDimension.dataField, member, dataField);
                        }
                        else {
                            arg = getAllMembers(field);
                        }
                    }
                }
                else {
                    arg = getAllMembers(field);
                }
            }
            else {
                var isFirstDimensionInGroup = !hierarchyName || prevHierarchyName !== hierarchyName;
                if (isFirstDimensionInGroup) {
                    arg = "(" + getAllMember(field) + ")";
                }
            }
            if (arg) {
                arg = string_1.format(mdxSet, arg);
                if (take) {
                    var sortBy = (field.hierarchyName || field.dataField) + (field.sortBy === 'displayText' ? '.MEMBER_CAPTION' : '.MEMBER_VALUE');
                    arg = string_1.format(mdxOrder, arg, sortBy, field.sortOrder === 'desc' ? 'DESC' : 'ASC');
                }
                crossJoinArgs.push(arg);
            }
        }
        return crossJoinElements(crossJoinArgs);
    }
    function fillCrossJoins(crossJoins, path, expandLevel, expandIndex, slicePath, options, axisName, cellsString, take, totalsOnly) {
        var expandAllCount = -1;
        var dimensions = options[axisName];
        var dimensionIndex;
        do {
            expandAllCount += 1;
            dimensionIndex = path.length + expandAllCount + expandIndex;
            var crossJoin = generateCrossJoin(path, expandLevel, expandAllCount, expandIndex, slicePath, options, axisName, take);
            if (!take && !totalsOnly) {
                crossJoin = string_1.format(mdxNonEmpty, crossJoin, cellsString);
            }
            crossJoins.push(crossJoin);
        } while (dimensions[dimensionIndex]
            && dimensions[dimensionIndex + 1]
            && dimensions[dimensionIndex].expanded);
    }
    function declare(expression, withArray, name, type) {
        name = name || "[DX_Set_" + withArray.length + "]";
        type = type || 'set';
        withArray.push(string_1.format(mdxWith, type, name, expression));
        return name;
    }
    function generateAxisMdx(options, axisName, cells, withArray, parseOptions) {
        var dimensions = options[axisName];
        var crossJoins = [];
        var path = [];
        var expandedPaths = [];
        var expandIndex = 0;
        var expandLevel = 0;
        var result = [];
        var cellsString = string_1.format(mdxSet, cells.join(','));
        if (dimensions && dimensions.length) {
            if (options.headerName === axisName) {
                path = options.path;
                expandIndex = path.length;
            }
            else if (options.headerName && options.oppositePath) {
                path = options.oppositePath;
                expandIndex = path.length;
            }
            else {
                expandedPaths = (axisName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || expandedPaths;
            }
            expandLevel = module_widget_utils_1.getExpandedLevel(options, axisName);
            fillCrossJoins(crossJoins, [], expandLevel, expandIndex, path, options, axisName, cellsString, axisName === 'rows' ? options.rowTake : options.columnTake, options.totalsOnly);
            iterator_1.each(expandedPaths, function (_, expandedPath) {
                fillCrossJoins(crossJoins, expandedPath, expandLevel, expandIndex, expandedPath, options, axisName, cellsString);
            });
            for (var i = expandLevel; i >= path.length; i -= 1) {
                if (dimensions[i].hierarchyName) {
                    parseOptions.visibleLevels[dimensions[i].hierarchyName] = parseOptions.visibleLevels[dimensions[i].hierarchyName] || [];
                    parseOptions.visibleLevels[dimensions[i].hierarchyName]
                        .push(dimensions[i].dataField);
                }
            }
        }
        if (crossJoins.length) {
            var expression = union(crossJoins);
            if (axisName === 'rows' && options.rowTake) {
                expression = string_1.format(mdxSubset, expression, options.rowSkip > 0
                    ? options.rowSkip + 1
                    : 0, options.rowSkip > 0
                    ? options.rowTake
                    : options.rowTake + 1);
            }
            if (axisName === 'columns' && options.columnTake) {
                expression = string_1.format(mdxSubset, expression, options.columnSkip > 0
                    ? options.columnSkip + 1
                    : 0, options.columnSkip > 0
                    ? options.columnTake
                    : options.columnTake + 1);
            }
            var axisSet = "[DX_" + axisName + "]";
            result.push(declare(expression, withArray, axisSet));
            if (options.totalsOnly) {
                result.push(declare("COUNT(" + axisSet + ")", withArray, "[DX_" + axisName + "_count]", 'member'));
            }
        }
        if (axisName === 'columns' && cells.length && !options.skipValues) {
            result.push(cellsString);
        }
        return string_1.format(mdxAxis, crossJoinElements(result), axisName);
    }
    function generateAxisFieldsFilter(fields) {
        var filterMembers = [];
        iterator_1.each(fields, function (_, field) {
            var dataField = field.dataField;
            var filterExpression = [];
            var filterValues = field.filterValues || [];
            var filterStringExpression;
            if (field.hierarchyName && type_1.isNumeric(field.groupIndex)) {
                return;
            }
            iterator_1.each(filterValues, function (_, filterValue) {
                var filterMdx = dataField + "." + preparePathValue(Array.isArray(filterValue) ? filterValue[filterValue.length - 1] : filterValue, dataField);
                if (field.filterType === 'exclude') {
                    filterExpression.push(filterMdx + ".parent");
                    filterMdx = "Descendants(" + filterMdx + ")";
                }
                filterExpression.push(filterMdx);
            });
            if (filterValues.length) {
                filterStringExpression = string_1.format(mdxSet, filterExpression.join(','));
                if (field.filterType === 'exclude') {
                    filterStringExpression = "Except(" + getAllMembers(field) + "," + filterStringExpression + ")";
                }
                filterMembers.push(filterStringExpression);
            }
        });
        return filterMembers.length ? crossJoinElements(filterMembers) : '';
    }
    function generateFrom(columnsFilter, rowsFilter, filter, cubeName) {
        var from = "[" + cubeName + "]";
        iterator_1.each([columnsFilter, rowsFilter, filter], function (_, filter) {
            if (filter) {
                from = string_1.format(mdxFilterSelect, filter + "on 0", from);
            }
        });
        return from;
    }
    function generateMdxCore(axisStrings, withArray, columns, rows, filters, slice, cubeName, options) {
        if (options === void 0) { options = {}; }
        var mdxString = '';
        var withString = (withArray.length ? "with " + withArray.join(' ') : '') + " ";
        if (axisStrings.length) {
            var select = void 0;
            if (options.totalsOnly) {
                var countMembers = [];
                if (rows.length) {
                    countMembers.push('[DX_rows_count]');
                }
                if (columns.length) {
                    countMembers.push('[DX_columns_count]');
                }
                select = "{" + countMembers.join(',') + "} on columns";
            }
            else {
                select = axisStrings.join(',');
            }
            mdxString = withString + string_1.format(mdx, generateFrom(generateAxisFieldsFilter(columns), generateAxisFieldsFilter(rows), generateAxisFieldsFilter(filters || []), cubeName), slice.length ? string_1.format(mdxSlice, slice.join(',')) : '', select);
        }
        return mdxString;
    }
    function prepareDataFields(withArray, valueFields) {
        return iterator_1.map(valueFields, function (cell) {
            if (type_1.isString(cell.expression)) {
                declare(cell.expression, withArray, cell.dataField, 'member');
            }
            return cell.dataField;
        });
    }
    function addSlices(slices, options, headerName, path) {
        iterator_1.each(path, function (index, value) {
            var dimension = options[headerName][index];
            if (!dimension.hierarchyName
                || dimension.hierarchyName !== options[headerName][index + 1]
                    .hierarchyName) {
                slices.push(dimension.dataField + "." + preparePathValue(value, dimension.dataField));
            }
        });
    }
    function generateMDX(options, cubeName, parseOptions) {
        var columns = options.columns || [];
        var rows = options.rows || [];
        var values = options.values && options.values.length ? options.values : [{ dataField: '[Measures]' }];
        var slice = [];
        var withArray = [];
        var axisStrings = [];
        var dataFields = prepareDataFields(withArray, values);
        parseOptions.measureCount = options.skipValues ? 1 : values.length;
        parseOptions.visibleLevels = {};
        if (options.headerName && options.path) {
            addSlices(slice, options, options.headerName, options.path);
        }
        if (options.headerName && options.oppositePath) {
            addSlices(slice, options, options.headerName === 'rows' ? 'columns' : 'rows', options.oppositePath);
        }
        if (columns.length || dataFields.length) {
            axisStrings.push(generateAxisMdx(options, 'columns', dataFields, withArray, parseOptions));
        }
        if (rows.length) {
            axisStrings.push(generateAxisMdx(options, 'rows', dataFields, withArray, parseOptions));
        }
        return generateMdxCore(axisStrings, withArray, columns, rows, options.filters, slice, cubeName, options);
    }
    function createDrillDownAxisSlice(slice, fields, path) {
        iterator_1.each(path, function (index, value) {
            var field = fields[index];
            if (field.hierarchyName && (fields[index + 1] || {}).hierarchyName === field.hierarchyName) {
                return;
            }
            slice.push(field.dataField + "." + preparePathValue(value, field.dataField));
        });
    }
    function generateDrillDownMDX(options, cubeName, params) {
        var columns = options.columns || [];
        var rows = options.rows || [];
        var values = options.values && options.values.length ? options.values : [{ dataField: '[Measures]' }];
        var slice = [];
        var withArray = [];
        var axisStrings = [];
        var dataFields = prepareDataFields(withArray, values);
        var maxRowCount = params.maxRowCount;
        var customColumns = params.customColumns || [];
        var customColumnsString = customColumns.length > 0 ? " return " + customColumns.join(',') : '';
        createDrillDownAxisSlice(slice, columns, params.columnPath || []);
        createDrillDownAxisSlice(slice, rows, params.rowPath || []);
        if (columns.length || dataFields.length) {
            axisStrings.push([(dataFields[params.dataIndex] || dataFields[0]) + " on 0"]);
        }
        var coreMDX = generateMdxCore(axisStrings, withArray, columns, rows, options.filters, slice, cubeName);
        return coreMDX ? "drillthrough" + (maxRowCount > 0 ? " maxrows " + maxRowCount : '') + coreMDX + customColumnsString : coreMDX;
    }
    function getNumber(str) {
        return parseInt(str, 10);
    }
    function parseValue(valueText) {
        // @ts-expect-error
        return type_1.isNumeric(valueText) ? parseFloat(valueText) : valueText;
    }
    function getFirstChild(node, tagName) {
        return (node.getElementsByTagName(tagName) || [])[0];
    }
    function getFirstChildText(node, childTagName) {
        return getNodeText(getFirstChild(node, childTagName));
    }
    function parseAxes(xml, skipValues) {
        var axes = [];
        iterator_1.each(xml.getElementsByTagName('Axis'), function (_, axisElement) {
            var name = axisElement.getAttribute('name');
            var axis = [];
            var index = 0;
            if (name.indexOf('Axis') === 0 && type_1.isNumeric(getNumber(name.substr(4)))) {
                axes.push(axis);
                iterator_1.each(axisElement.getElementsByTagName('Tuple'), function (_, tupleElement) {
                    var tupleMembers = tupleElement.childNodes;
                    var levelSum = 0;
                    var members = [];
                    var membersCount = skipValues ? tupleMembers.length : tupleMembers.length - 1;
                    var isAxisWithMeasure = axes.length === 1;
                    if (isAxisWithMeasure) {
                        membersCount -= 1;
                    }
                    axis.push(members);
                    for (var i = membersCount; i >= 0; i -= 1) {
                        var tuple = tupleMembers[i];
                        var level = getNumber(getFirstChildText(tuple, 'LNum'));
                        members[i] = {
                            caption: getFirstChildText(tuple, 'Caption'),
                            value: parseValue(getFirstChildText(tuple, 'MEMBER_VALUE')),
                            level: level,
                            // eslint-disable-next-line no-plusplus
                            index: index++,
                            hasValue: !levelSum && (!!level || i === 0),
                            name: getFirstChildText(tuple, 'UName'),
                            hierarchyName: tupleMembers[i].getAttribute('Hierarchy'),
                            parentName: getFirstChildText(tuple, 'PARENT_UNIQUE_NAME'),
                            levelName: getFirstChildText(tuple, 'LName'),
                        };
                        levelSum += level;
                    }
                });
            }
        });
        while (axes.length < 2) {
            axes.push([[{
                        level: 0,
                    }]]);
        }
        return axes;
    }
    function getNodeText(node) {
        return node && (node.textContent || node.text || node.innerHTML) || '';
    }
    function parseCells(xml, axes, measureCount) {
        var cells = [];
        var cell = [];
        var index = 0;
        var cellsOriginal = [];
        var cellElements = xml.getElementsByTagName('Cell');
        var errorDictionary = {};
        for (var i = 0; i < cellElements.length; i += 1) {
            var xmlCell = cellElements[i];
            var valueElement = xmlCell.getElementsByTagName('Value')[0];
            var errorElements = valueElement && valueElement.getElementsByTagName('Error') || [];
            var text = errorElements.length === 0 ? getNodeText(valueElement) : '#N/A';
            var value = parseFloat(text);
            var isNumeric_1 = (text - value + 1) > 0;
            var cellOrdinal = getNumber(xmlCell.getAttribute('CellOrdinal'));
            if (errorElements.length) {
                errorDictionary[getNodeText(errorElements[0].getElementsByTagName('ErrorCode')[0])] = getNodeText(errorElements[0].getElementsByTagName('Description')[0]);
            }
            cellsOriginal[cellOrdinal] = {
                value: isNumeric_1 ? value : text || null,
            };
        }
        iterator_1.each(axes[1], function () {
            var row = [];
            cells.push(row);
            iterator_1.each(axes[0], function () {
                var measureIndex = index % measureCount;
                if (measureIndex === 0) {
                    cell = [];
                    row.push(cell);
                }
                cell.push(cellsOriginal[index] ? cellsOriginal[index].value : null);
                index += 1;
            });
        });
        Object.keys(errorDictionary).forEach(function (key) {
            errors_1.errors.log('W4002', errorDictionary[key]);
        });
        return cells;
    }
    function preparePathValue(pathValue, dataField) {
        if (pathValue) {
            pathValue = type_1.isString(pathValue) && pathValue.includes('&') ? pathValue : "[" + pathValue + "]";
            if (dataField && pathValue.indexOf(dataField + ".") === 0) {
                pathValue = pathValue.slice(dataField.length + 1, pathValue.length);
            }
        }
        return pathValue;
    }
    function getItem(hash, name, member, index) {
        var item = hash[name];
        if (!item) {
            item = {};
            hash[name] = item;
        }
        if (!type_1.isDefined(item.value) && member) {
            item.text = member.caption;
            item.value = member.value;
            item.key = name || '';
            item.levelName = member.levelName;
            item.hierarchyName = member.hierarchyName;
            item.parentName = member.parentName;
            item.index = index;
            item.level = member.level;
        }
        return item;
    }
    function getVisibleChildren(item, visibleLevels) {
        var result = [];
        var children = item.children
            && (item.children.length
                ? item.children
                : Object.keys(item.children.grandTotalHash || {})
                    .reduce(function (result, name) { return result
                    .concat(item.children.grandTotalHash[name].children); }, []));
        var firstChild = children && children[0];
        if (firstChild && (visibleLevels[firstChild.hierarchyName]
            && visibleLevels[firstChild.hierarchyName]
                .includes(firstChild.levelName)
            || !visibleLevels[firstChild.hierarchyName]
            || firstChild.level === 0)) {
            var newChildren = children
                .filter(function (child) { return child.hierarchyName === firstChild.hierarchyName; });
            newChildren.grandTotalHash = children.grandTotalHash;
            return newChildren;
        }
        if (firstChild) {
            for (var i = 0; i < children.length; i += 1) {
                if (children[i].hierarchyName === firstChild.hierarchyName) {
                    result.push.apply(result, getVisibleChildren(children[i], visibleLevels));
                }
            }
        }
        return result;
    }
    function processMember(dataIndex, member, parentItem) {
        var children = parentItem.children = parentItem.children || [];
        var hash = children.hash = children.hash || {};
        var grandTotalHash = children.grandTotalHash = children.grandTotalHash || {};
        if (member.parentName) {
            parentItem = getItem(hash, member.parentName);
            children = parentItem.children = parentItem.children || [];
        }
        var currentItem = getItem(hash, member.name, member, dataIndex);
        if (member.hasValue && !currentItem.added) {
            currentItem.index = dataIndex;
            currentItem.added = true;
            children.push(currentItem);
        }
        if ((!parentItem.value || !parentItem.parentName) && member.parentName) {
            grandTotalHash[member.parentName] = parentItem;
        }
        else if (grandTotalHash[parentItem.name]) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete grandTotalHash[member.parentName];
        }
        return currentItem;
    }
    function getGrandTotalIndex(parentItem, visibleLevels) {
        var grandTotalIndex;
        if (parentItem.children.length === 1 && parentItem.children[0].parentName === '') {
            grandTotalIndex = parentItem.children[0].index;
            // TODO - refactoring
            var grandTotalHash = parentItem.children.grandTotalHash;
            parentItem.children = parentItem.children[0].children || [];
            parentItem.children.grandTotalHash = grandTotalHash;
            parentItem.children = getVisibleChildren(parentItem, visibleLevels);
        }
        else if (parentItem.children.length === 0) {
            grandTotalIndex = 0;
        }
        return grandTotalIndex;
    }
    function fillDataSourceAxes(dataSourceAxis, axisTuples, measureCount, visibleLevels) {
        var result = [];
        iterator_1.each(axisTuples, function (tupleIndex, members) {
            var parentItem = {
                children: result,
            };
            var dataIndex = type_1.isDefined(measureCount)
                ? Math.floor(tupleIndex / measureCount)
                : tupleIndex;
            iterator_1.each(members, function (_, member) {
                parentItem = processMember(dataIndex, member, parentItem);
            });
        });
        var parentItem = {
            children: result,
        };
        parentItem.children = getVisibleChildren(parentItem, visibleLevels);
        var grandTotalIndex = getGrandTotalIndex(parentItem, visibleLevels);
        module_widget_utils_1.foreachTree(parentItem.children, function (items) {
            var item = items[0];
            var children = getVisibleChildren(item, visibleLevels);
            if (children.length) {
                item.children = children;
            }
            else {
                delete item.children;
            }
            delete item.levelName;
            delete item.hierarchyName;
            delete item.added;
            delete item.parentName;
            delete item.level;
        }, true);
        iterator_1.each(parentItem.children || [], function (_, e) {
            dataSourceAxis.push(e);
        });
        return grandTotalIndex;
    }
    function checkError(xml) {
        var faultElementNS = xml.getElementsByTagName('soap:Fault');
        var faultElement = xml.getElementsByTagName('Fault');
        var errorElement = renderer_1.default([].slice.call(faultElement.length ? faultElement : faultElementNS)).find('Error');
        if (errorElement.length) {
            var description = errorElement.attr('Description');
            var error = new errors_1.errors.Error('E4000', description);
            errors_1.errors.log('E4000', description);
            return error;
        }
        return null;
    }
    function parseResult(xml, parseOptions) {
        var dataSource = {
            columns: [],
            rows: [],
        };
        var measureCount = parseOptions.measureCount;
        var axes = parseAxes(xml, parseOptions.skipValues);
        dataSource.grandTotalColumnIndex = fillDataSourceAxes(dataSource.columns, axes[0], measureCount, parseOptions.visibleLevels);
        dataSource.grandTotalRowIndex = fillDataSourceAxes(dataSource.rows, axes[1], undefined, parseOptions.visibleLevels);
        dataSource.values = parseCells(xml, axes, measureCount);
        return dataSource;
    }
    function parseDiscoverRowSet(xml, schema, dimensions, translatedDisplayFolders) {
        var result = [];
        var isMeasure = schema === 'MEASURE';
        var displayFolderField = isMeasure ? 'MEASUREGROUP_NAME' : schema + "_DISPLAY_FOLDER";
        iterator_1.each(xml.getElementsByTagName('row'), function (_, row) {
            var hierarchyName = schema === 'LEVEL' ? getFirstChildText(row, 'HIERARCHY_UNIQUE_NAME') : undefined;
            var levelNumber = getFirstChildText(row, 'LEVEL_NUMBER');
            var displayFolder = getFirstChildText(row, displayFolderField);
            if (isMeasure) {
                displayFolder = translatedDisplayFolders[displayFolder] || displayFolder;
            }
            if ((levelNumber !== '0' || getFirstChildText(row, schema + "_IS_VISIBLE") !== 'true') && (getFirstChildText(row, 'DIMENSION_TYPE') !== MD_DIMTYPE_MEASURE)) {
                var dimension = isMeasure ? MEASURE_DEMENSION_KEY : getFirstChildText(row, 'DIMENSION_UNIQUE_NAME');
                var dataField = getFirstChildText(row, schema + "_UNIQUE_NAME");
                result.push({
                    dimension: dimensions.names[dimension] || dimension,
                    groupIndex: levelNumber ? getNumber(levelNumber) - 1 : undefined,
                    dataField: dataField,
                    caption: getFirstChildText(row, schema + "_CAPTION"),
                    hierarchyName: hierarchyName,
                    groupName: hierarchyName,
                    displayFolder: displayFolder,
                    isMeasure: isMeasure,
                    isDefault: !!dimensions.defaultHierarchies[dataField],
                });
            }
        });
        return result;
    }
    function parseMeasureGroupDiscoverRowSet(xml) {
        var measureGroups = {};
        iterator_1.each(xml.getElementsByTagName('row'), function (_, row) {
            measureGroups[getFirstChildText(row, 'MEASUREGROUP_NAME')] = getFirstChildText(row, 'MEASUREGROUP_CAPTION');
        });
        return measureGroups;
    }
    function parseDimensionsDiscoverRowSet(xml) {
        var result = {
            names: {},
            defaultHierarchies: {},
        };
        iterator_1.each(renderer_1.default(xml).find('row'), function () {
            var $row = renderer_1.default(this);
            var type = $row.children('DIMENSION_TYPE').text();
            var dimensionName = type === MD_DIMTYPE_MEASURE ? MEASURE_DEMENSION_KEY : $row.children('DIMENSION_UNIQUE_NAME').text();
            result.names[dimensionName] = $row.children('DIMENSION_CAPTION').text();
            result.defaultHierarchies[$row.children('DEFAULT_HIERARCHY').text()] = true;
        });
        return result;
    }
    function parseStringWithUnicodeSymbols(str) {
        str = str.replace(/_x(....)_/g, function (_, group1) { return String.fromCharCode(parseInt(group1, 16)); });
        var stringArray = str.match(/\[.+?\]/gi);
        if (stringArray && stringArray.length) {
            str = stringArray[stringArray.length - 1];
        }
        return str
            .replace(/\[/gi, '')
            .replace(/\]/gi, '')
            .replace(/\$/gi, '')
            .replace(/\./gi, ' ');
    }
    function parseDrillDownRowSet(xml) {
        var rows = xml.getElementsByTagName('row');
        var result = [];
        var columnNames = {};
        for (var i = 0; i < rows.length; i += 1) {
            var children = rows[i].childNodes;
            var item = {};
            for (var j = 0; j < children.length; j += 1) {
                var tagName = children[j].tagName;
                var name = columnNames[tagName] = columnNames[tagName]
                    || parseStringWithUnicodeSymbols(tagName);
                item[name] = getNodeText(children[j]);
            }
            result.push(item);
        }
        return result;
    }
    function sendQuery(storeOptions, mdxString) {
        mdxString = renderer_1.default('<div>').text(mdxString).html();
        return execXMLA(storeOptions, string_1.format(execute, mdxString, storeOptions.catalog, getLocaleIdProperty()));
    }
    function processTotalCount(data, options, totalCountXml) {
        var axes = [];
        var columnOptions = options.columns || [];
        var rowOptions = options.rows || [];
        if (columnOptions.length) {
            axes.push({});
        }
        if (rowOptions.length) {
            axes.push({});
        }
        var cells = parseCells(totalCountXml, [[{}], [{}, {}]], 1);
        if (!columnOptions.length && rowOptions.length) {
            data.rowCount = Math.max(cells[0][0][0] - 1, 0);
        }
        if (!rowOptions.length && columnOptions.length) {
            data.columnCount = Math.max(cells[0][0][0] - 1, 0);
        }
        if (rowOptions.length && columnOptions.length) {
            data.rowCount = Math.max(cells[0][0][0] - 1, 0);
            data.columnCount = Math.max(cells[1][0][0] - 1, 0);
        }
        if (data.rowCount !== undefined && options.rowTake) {
            data.rows = __spreadArray([], Array(options.rowSkip)).concat(data.rows);
            data.rows.length = data.rowCount;
            for (var i = 0; i < data.rows.length; i += 1) {
                data.rows[i] = data.rows[i] || {};
            }
        }
        if (data.columnCount !== undefined && options.columnTake) {
            data.columns = __spreadArray([], Array(options.columnSkip)).concat(data.columns);
            data.columns.length = data.columnCount;
            for (var i = 0; i < data.columns.length; i += 1) {
                data.columns[i] = data.columns[i] || {};
            }
        }
    }
    return {
        ctor: function (options) {
            this._options = options;
        },
        getFields: function () {
            var options = this._options;
            var catalog = options.catalog;
            var cube = options.cube;
            var localeIdProperty = getLocaleIdProperty();
            var dimensionsRequest = execXMLA(options, string_1.format(discover, catalog, cube, 'MDSCHEMA_DIMENSIONS', localeIdProperty));
            var measuresRequest = execXMLA(options, string_1.format(discover, catalog, cube, 'MDSCHEMA_MEASURES', localeIdProperty));
            var hierarchiesRequest = execXMLA(options, string_1.format(discover, catalog, cube, 'MDSCHEMA_HIERARCHIES', localeIdProperty));
            var levelsRequest = execXMLA(options, string_1.format(discover, catalog, cube, 'MDSCHEMA_LEVELS', localeIdProperty));
            // @ts-expect-error
            var result = new deferred_1.Deferred();
            deferred_1.when(dimensionsRequest, measuresRequest, hierarchiesRequest, levelsRequest)
                .then(function (dimensionsResponse, measuresResponse, hierarchiesResponse, levelsResponse) {
                execXMLA(options, string_1.format(discover, catalog, cube, 'MDSCHEMA_MEASUREGROUPS', localeIdProperty))
                    .done(function (measureGroupsResponse) {
                    var dimensions = parseDimensionsDiscoverRowSet(dimensionsResponse);
                    var hierarchies = parseDiscoverRowSet(hierarchiesResponse, 'HIERARCHY', dimensions);
                    var levels = parseDiscoverRowSet(levelsResponse, 'LEVEL', dimensions);
                    var measureGroups = parseMeasureGroupDiscoverRowSet(measureGroupsResponse);
                    var fields = parseDiscoverRowSet(measuresResponse, 'MEASURE', dimensions, measureGroups)
                        .concat(hierarchies);
                    var levelsByHierarchy = {};
                    iterator_1.each(levels, function (_, level) {
                        levelsByHierarchy[level.hierarchyName] = levelsByHierarchy[level.hierarchyName]
                            || [];
                        levelsByHierarchy[level.hierarchyName].push(level);
                    });
                    iterator_1.each(hierarchies, function (_, hierarchy) {
                        if (levelsByHierarchy[hierarchy.dataField]
                            && levelsByHierarchy[hierarchy.dataField].length > 1) {
                            hierarchy.groupName = hierarchy.hierarchyName = hierarchy.dataField;
                            fields.push.apply(fields, levelsByHierarchy[hierarchy.hierarchyName]);
                        }
                    });
                    result.resolve(fields);
                }).fail(result.reject);
            }).fail(result.reject);
            return result;
        },
        load: function (options) {
            // @ts-expect-error
            var result = new deferred_1.Deferred();
            var storeOptions = this._options;
            var parseOptions = {
                skipValues: options.skipValues,
            };
            var mdxString = generateMDX(options, storeOptions.cube, parseOptions);
            var rowCountMdx;
            if (options.rowSkip || options.rowTake || options.columnTake || options.columnSkip) {
                rowCountMdx = generateMDX(extend_1.extend({}, options, {
                    totalsOnly: true,
                    rowSkip: null,
                    rowTake: null,
                    columnSkip: null,
                    columnTake: null,
                }), storeOptions.cube, {});
            }
            var load = function () {
                if (mdxString) {
                    deferred_1.when(sendQuery(storeOptions, mdxString), rowCountMdx && sendQuery(storeOptions, rowCountMdx))
                        .done(function (executeXml, rowCountXml) {
                        var error = checkError(executeXml) || rowCountXml && checkError(rowCountXml);
                        if (!error) {
                            var response = parseResult(executeXml, parseOptions);
                            if (rowCountXml) {
                                processTotalCount(response, options, rowCountXml);
                            }
                            result.resolve(response);
                        }
                        else {
                            result.reject(error);
                        }
                    }).fail(result.reject);
                }
                else {
                    result.resolve({
                        columns: [],
                        rows: [],
                        values: [],
                        grandTotalColumnIndex: 0,
                        grandTotalRowIndex: 0,
                    });
                }
            };
            if (options.delay) {
                setTimeout(load, options.delay);
            }
            else {
                load();
            }
            return result;
        },
        supportPaging: function () {
            return true;
        },
        getDrillDownItems: function (options, params) {
            // @ts-expect-error
            var result = new deferred_1.Deferred();
            var storeOptions = this._options;
            var mdxString = generateDrillDownMDX(options, storeOptions.cube, params);
            if (mdxString) {
                deferred_1.when(sendQuery(storeOptions, mdxString)).done(function (executeXml) {
                    var error = checkError(executeXml);
                    if (!error) {
                        result.resolve(parseDrillDownRowSet(executeXml));
                    }
                    else {
                        result.reject(error);
                    }
                }).fail(result.reject);
            }
            else {
                result.resolve([]);
            }
            return result;
        },
        key: common_1.noop,
        filter: common_1.noop,
    };
})()).include(module_widget_utils_1.storeDrillDownMixin);
exports.XmlaStore = XmlaStore;
// NOTE: Exports default object for mocks in QUnit only.
exports.default = { XmlaStore: XmlaStore };