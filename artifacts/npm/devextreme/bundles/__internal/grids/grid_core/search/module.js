/**
* DevExtreme (bundles/__internal/grids/grid_core/search/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchModule = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var dom_adapter_1 = __importDefault(require("../../../../core/dom_adapter"));
var type_1 = require("../../../../core/utils/type");
var data_1 = require("../../../../core/utils/data");
var message_1 = __importDefault(require("../../../../localization/message"));
var query_1 = __importDefault(require("../../../../data/query"));
var module_utils_1 = __importDefault(require("../module_utils"));
var SEARCH_PANEL_CLASS = 'search-panel';
var SEARCH_TEXT_CLASS = 'search-text';
var HEADER_PANEL_CLASS = 'header-panel';
var FILTERING_TIMEOUT = 700;
function allowSearch(column) {
    return type_1.isDefined(column.allowSearch) ? column.allowSearch : column.allowFiltering;
}
function parseValue(column, text) {
    var lookup = column.lookup;
    if (!column.parseValue) {
        return text;
    }
    if (lookup) {
        return column.parseValue.call(lookup, text);
    }
    return column.parseValue(text);
}
exports.searchModule = {
    defaultOptions: function () {
        return {
            searchPanel: {
                visible: false,
                width: 160,
                placeholder: message_1.default.format('dxDataGrid-searchPanelPlaceholder'),
                highlightSearchText: true,
                highlightCaseSensitive: false,
                text: '',
                searchVisibleColumnsOnly: false,
            },
        };
    },
    extenders: {
        controllers: {
            data: (function () {
                var calculateSearchFilter = function (that, text) {
                    var i;
                    var column;
                    var columns = that._columnsController.getColumns();
                    var searchVisibleColumnsOnly = that.option('searchPanel.searchVisibleColumnsOnly');
                    var lookup;
                    var filters = [];
                    if (!text)
                        return null;
                    function onQueryDone(items) {
                        var valueGetter = data_1.compileGetter(lookup.valueExpr);
                        // eslint-disable-next-line @typescript-eslint/prefer-for-of
                        for (var i_1 = 0; i_1 < items.length; i_1++) {
                            // @ts-expect-error
                            var value = valueGetter(items[i_1]);
                            filters.push(column.createFilterExpression(value, null, 'search'));
                        }
                    }
                    for (i = 0; i < columns.length; i++) {
                        column = columns[i];
                        if (searchVisibleColumnsOnly && !column.visible)
                            continue;
                        if (allowSearch(column) && column.calculateFilterExpression) {
                            lookup = column.lookup;
                            var filterValue = parseValue(column, text);
                            if (lookup && lookup.items) {
                                // @ts-expect-error
                                query_1.default(lookup.items).filter(column.createFilterExpression.call({ dataField: lookup.displayExpr, dataType: lookup.dataType, calculateFilterExpression: column.calculateFilterExpression }, filterValue, null, 'search')).enumerate().done(onQueryDone);
                            }
                            else if (filterValue !== undefined) {
                                filters.push(column.createFilterExpression(filterValue, null, 'search'));
                            }
                        }
                    }
                    if (filters.length === 0) {
                        return ['!'];
                    }
                    return module_utils_1.default.combineFilters(filters, 'or');
                };
                return {
                    publicMethods: function () {
                        return this.callBase().concat(['searchByText']);
                    },
                    _calculateAdditionalFilter: function () {
                        var that = this;
                        var filter = that.callBase();
                        var searchFilter = calculateSearchFilter(that, that.option('searchPanel.text'));
                        // @ts-expect-error
                        return module_utils_1.default.combineFilters([filter, searchFilter]);
                    },
                    searchByText: function (text) {
                        this.option('searchPanel.text', text);
                    },
                    optionChanged: function (args) {
                        var that = this;
                        switch (args.fullName) {
                            case 'searchPanel.text':
                            case 'searchPanel':
                                that._applyFilter();
                                args.handled = true;
                                break;
                            default:
                                that.callBase(args);
                        }
                    },
                };
            }()),
        },
        views: {
            headerPanel: (function () {
                var getSearchPanelOptions = function (that) {
                    return that.option('searchPanel');
                };
                return {
                    _getToolbarItems: function () {
                        var items = this.callBase();
                        return this._prepareSearchItem(items);
                    },
                    _prepareSearchItem: function (items) {
                        var that = this;
                        var dataController = that.getController('data');
                        var searchPanelOptions = getSearchPanelOptions(that);
                        if (searchPanelOptions && searchPanelOptions.visible) {
                            var toolbarItem = {
                                template: function (data, index, container) {
                                    var $search = renderer_1.default('<div>')
                                        .addClass(that.addWidgetPrefix(SEARCH_PANEL_CLASS))
                                        .appendTo(container);
                                    that.getController('editorFactory').createEditor($search, {
                                        width: searchPanelOptions.width,
                                        placeholder: searchPanelOptions.placeholder,
                                        parentType: 'searchPanel',
                                        value: that.option('searchPanel.text'),
                                        updateValueTimeout: FILTERING_TIMEOUT,
                                        setValue: function (value) {
                                            dataController.searchByText(value);
                                        },
                                        editorOptions: {
                                            inputAttr: {
                                                'aria-label': message_1.default.format(that.component.NAME + "-ariaSearchInGrid"),
                                            },
                                        },
                                    });
                                    that.resize();
                                },
                                name: 'searchPanel',
                                location: 'after',
                                locateInMenu: 'never',
                                sortIndex: 40,
                            };
                            items.push(toolbarItem);
                        }
                        return items;
                    },
                    getSearchTextEditor: function () {
                        var that = this;
                        var $element = that.element();
                        var $searchPanel = $element.find("." + that.addWidgetPrefix(SEARCH_PANEL_CLASS)).filter(function () {
                            return renderer_1.default(this).closest("." + that.addWidgetPrefix(HEADER_PANEL_CLASS)).is($element);
                        });
                        if ($searchPanel.length) {
                            return $searchPanel.dxTextBox('instance');
                        }
                        return null;
                    },
                    isVisible: function () {
                        var searchPanelOptions = getSearchPanelOptions(this);
                        return this.callBase() || (searchPanelOptions && searchPanelOptions.visible);
                    },
                    optionChanged: function (args) {
                        if (args.name === 'searchPanel') {
                            if (args.fullName === 'searchPanel.text') {
                                var editor = this.getSearchTextEditor();
                                if (editor) {
                                    editor.option('value', args.value);
                                }
                            }
                            else {
                                this._invalidate();
                            }
                            args.handled = true;
                        }
                        else {
                            this.callBase(args);
                        }
                    },
                };
            }()),
            rowsView: {
                init: function () {
                    this.callBase.apply(this, arguments);
                    this._searchParams = [];
                },
                _getFormattedSearchText: function (column, searchText) {
                    var value = parseValue(column, searchText);
                    var formatOptions = module_utils_1.default.getFormatOptionsByColumn(column, 'search');
                    return module_utils_1.default.formatValue(value, formatOptions);
                },
                _getStringNormalizer: function () {
                    var isCaseSensitive = this.option('searchPanel.highlightCaseSensitive');
                    return function (str) {
                        return isCaseSensitive ? str : str.toLowerCase();
                    };
                },
                _findHighlightingTextNodes: function (column, cellElement, searchText) {
                    var that = this;
                    var $parent = cellElement.parent();
                    var $items;
                    var stringNormalizer = this._getStringNormalizer();
                    var normalizedSearchText = stringNormalizer(searchText);
                    var resultTextNodes = [];
                    if (!$parent.length) {
                        $parent = renderer_1.default('<div>').append(cellElement);
                    }
                    else if (column) {
                        if (column.groupIndex >= 0 && !column.showWhenGrouped) {
                            $items = cellElement;
                        }
                        else {
                            var columnIndex = that._columnsController.getVisibleIndex(column.index);
                            $items = $parent.children('td').eq(columnIndex).find('*');
                        }
                    }
                    $items = ($items === null || $items === void 0 ? void 0 : $items.length) ? $items : $parent.find('*');
                    $items.each(function (_, element) {
                        var $contents = renderer_1.default(element).contents();
                        for (var i = 0; i < $contents.length; i++) {
                            var node = $contents.get(i);
                            if (node.nodeType === 3) {
                                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                                var normalizedText = stringNormalizer(node.textContent || node.nodeValue);
                                if (normalizedText.indexOf(normalizedSearchText) > -1) {
                                    resultTextNodes.push(node);
                                }
                            }
                        }
                    });
                    return resultTextNodes;
                },
                _highlightSearchTextCore: function ($textNode, searchText) {
                    var that = this;
                    var $searchTextSpan = renderer_1.default('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS));
                    var text = $textNode.text();
                    var firstContentElement = $textNode[0];
                    var stringNormalizer = this._getStringNormalizer();
                    var index = stringNormalizer(text).indexOf(stringNormalizer(searchText));
                    if (index >= 0) {
                        if (firstContentElement.textContent) {
                            firstContentElement.textContent = text.substr(0, index);
                        }
                        else {
                            firstContentElement.nodeValue = text.substr(0, index);
                        }
                        $textNode.after($searchTextSpan.text(text.substr(index, searchText.length)));
                        // @ts-expect-error
                        $textNode = renderer_1.default(dom_adapter_1.default.createTextNode(text.substr(index + searchText.length))).insertAfter($searchTextSpan);
                        return that._highlightSearchTextCore($textNode, searchText);
                    }
                },
                _highlightSearchText: function (cellElement, isEquals, column) {
                    var that = this;
                    var stringNormalizer = this._getStringNormalizer();
                    var searchText = that.option('searchPanel.text');
                    if (isEquals && column) {
                        searchText = searchText && that._getFormattedSearchText(column, searchText);
                    }
                    if (searchText && that.option('searchPanel.highlightSearchText')) {
                        var textNodes = that._findHighlightingTextNodes(column, cellElement, searchText);
                        textNodes.forEach(function (textNode) {
                            if (isEquals) {
                                if (stringNormalizer(renderer_1.default(textNode).text()) === stringNormalizer(searchText)) {
                                    renderer_1.default(textNode).replaceWith(renderer_1.default('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS)).text(renderer_1.default(textNode).text()));
                                }
                            }
                            else {
                                that._highlightSearchTextCore(renderer_1.default(textNode), searchText);
                            }
                        });
                    }
                },
                _renderCore: function () {
                    var _this = this;
                    var deferred = this.callBase.apply(this, arguments);
                    // T103538
                    if (this.option().rowTemplate || this.option('dataRowTemplate')) {
                        if (this.option('templatesRenderAsynchronously')) {
                            clearTimeout(this._highlightTimer);
                            this._highlightTimer = setTimeout(function () {
                                _this._highlightSearchText(_this.getTableElement());
                            });
                        }
                        else {
                            this._highlightSearchText(this.getTableElement());
                        }
                    }
                    return deferred;
                },
                _updateCell: function ($cell, parameters) {
                    var _this = this;
                    var column = parameters.column;
                    var dataType = column.lookup && column.lookup.dataType || column.dataType;
                    var isEquals = dataType !== 'string';
                    if (allowSearch(column) && !parameters.isOnForm) {
                        if (this.option('templatesRenderAsynchronously')) {
                            if (!this._searchParams.length) {
                                clearTimeout(this._highlightTimer);
                                this._highlightTimer = setTimeout(function () {
                                    _this._searchParams.forEach(function (params) {
                                        _this._highlightSearchText.apply(_this, params);
                                    });
                                    _this._searchParams = [];
                                });
                            }
                            this._searchParams.push([$cell, isEquals, column]);
                        }
                        else {
                            this._highlightSearchText($cell, isEquals, column);
                        }
                    }
                    this.callBase($cell, parameters);
                },
                dispose: function () {
                    clearTimeout(this._highlightTimer);
                    this.callBase();
                },
            },
        },
    },
};
