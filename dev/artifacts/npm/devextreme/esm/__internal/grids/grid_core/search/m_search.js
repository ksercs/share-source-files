/**
* DevExtreme (esm/__internal/grids/grid_core/search/m_search.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/method-signature-style */
import domAdapter from '../../../../core/dom_adapter';
import $ from '../../../../core/renderer';
// @ts-expect-error
import { compileGetter, toComparable } from '../../../../core/utils/data';
import { isDefined } from '../../../../core/utils/type';
import dataQuery from '../../../../data/query';
import messageLocalization from '../../../../localization/message';
import gridCoreUtils from '../m_utils';
var SEARCH_PANEL_CLASS = 'search-panel';
var SEARCH_TEXT_CLASS = 'search-text';
var HEADER_PANEL_CLASS = 'header-panel';
var FILTERING_TIMEOUT = 700;
function allowSearch(column) {
  return isDefined(column.allowSearch) ? column.allowSearch : column.allowFiltering;
}
function parseValue(column, text) {
  var {
    lookup
  } = column;
  if (!column.parseValue) {
    return text;
  }
  if (lookup) {
    return column.parseValue.call(lookup, text);
  }
  return column.parseValue(text);
}
export var searchModule = {
  defaultOptions() {
    return {
      searchPanel: {
        visible: false,
        width: 160,
        placeholder: messageLocalization.format('dxDataGrid-searchPanelPlaceholder'),
        highlightSearchText: true,
        highlightCaseSensitive: false,
        text: '',
        searchVisibleColumnsOnly: false
      }
    };
  },
  extenders: {
    controllers: {
      data: function () {
        var calculateSearchFilter = function calculateSearchFilter(that, text) {
          var i;
          var column;
          var columns = that._columnsController.getColumns();
          var searchVisibleColumnsOnly = that.option('searchPanel.searchVisibleColumnsOnly');
          var lookup;
          var filters = [];
          if (!text) return null;
          function onQueryDone(items) {
            var valueGetter = compileGetter(lookup.valueExpr);
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (var _i = 0; _i < items.length; _i++) {
              // @ts-expect-error
              var value = valueGetter(items[_i]);
              filters.push(column.createFilterExpression(value, null, 'search'));
            }
          }
          for (i = 0; i < columns.length; i++) {
            column = columns[i];
            if (searchVisibleColumnsOnly && !column.visible) continue;
            if (allowSearch(column) && column.calculateFilterExpression) {
              lookup = column.lookup;
              var filterValue = parseValue(column, text);
              if (lookup && lookup.items) {
                // @ts-expect-error
                dataQuery(lookup.items).filter(column.createFilterExpression.call({
                  dataField: lookup.displayExpr,
                  dataType: lookup.dataType,
                  calculateFilterExpression: column.calculateFilterExpression
                }, filterValue, null, 'search')).enumerate().done(onQueryDone);
              } else if (filterValue !== undefined) {
                filters.push(column.createFilterExpression(filterValue, null, 'search'));
              }
            }
          }
          if (filters.length === 0) {
            return ['!'];
          }
          return gridCoreUtils.combineFilters(filters, 'or');
        };
        return {
          publicMethods() {
            return this.callBase().concat(['searchByText']);
          },
          _calculateAdditionalFilter() {
            var that = this;
            var filter = that.callBase();
            var searchFilter = calculateSearchFilter(that, that.option('searchPanel.text'));
            return gridCoreUtils.combineFilters([filter, searchFilter]);
          },
          searchByText(text) {
            this.option('searchPanel.text', text);
          },
          optionChanged(args) {
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
          }
        };
      }()
    },
    views: {
      headerPanel: function () {
        var getSearchPanelOptions = function getSearchPanelOptions(that) {
          return that.option('searchPanel');
        };
        return {
          _getToolbarItems() {
            var items = this.callBase();
            return this._prepareSearchItem(items);
          },
          _prepareSearchItem(items) {
            var that = this;
            var dataController = that.getController('data');
            var searchPanelOptions = getSearchPanelOptions(that);
            if (searchPanelOptions && searchPanelOptions.visible) {
              var toolbarItem = {
                template(data, index, container) {
                  var $search = $('<div>').addClass(that.addWidgetPrefix(SEARCH_PANEL_CLASS)).appendTo(container);
                  that.getController('editorFactory').createEditor($search, {
                    width: searchPanelOptions.width,
                    placeholder: searchPanelOptions.placeholder,
                    parentType: 'searchPanel',
                    value: that.option('searchPanel.text'),
                    updateValueTimeout: FILTERING_TIMEOUT,
                    setValue(value) {
                      dataController.searchByText(value);
                    },
                    editorOptions: {
                      inputAttr: {
                        'aria-label': messageLocalization.format("".concat(that.component.NAME, "-ariaSearchInGrid"))
                      }
                    }
                  });
                  that.resize();
                },
                name: 'searchPanel',
                location: 'after',
                locateInMenu: 'never',
                sortIndex: 40
              };
              items.push(toolbarItem);
            }
            return items;
          },
          getSearchTextEditor() {
            var that = this;
            var $element = that.element();
            var $searchPanel = $element.find(".".concat(that.addWidgetPrefix(SEARCH_PANEL_CLASS))).filter(function () {
              return $(this).closest(".".concat(that.addWidgetPrefix(HEADER_PANEL_CLASS))).is($element);
            });
            if ($searchPanel.length) {
              return $searchPanel.dxTextBox('instance');
            }
            return null;
          },
          isVisible() {
            var searchPanelOptions = getSearchPanelOptions(this);
            return this.callBase() || searchPanelOptions && searchPanelOptions.visible;
          },
          optionChanged(args) {
            if (args.name === 'searchPanel') {
              if (args.fullName === 'searchPanel.text') {
                var editor = this.getSearchTextEditor();
                if (editor) {
                  editor.option('value', args.value);
                }
              } else {
                this._invalidate();
              }
              args.handled = true;
            } else {
              this.callBase(args);
            }
          }
        };
      }(),
      rowsView: {
        init() {
          this.callBase.apply(this, arguments);
          this._searchParams = [];
          this._dataController = this.getController('data');
        },
        _getFormattedSearchText(column, searchText) {
          var value = parseValue(column, searchText);
          var formatOptions = gridCoreUtils.getFormatOptionsByColumn(column, 'search');
          return gridCoreUtils.formatValue(value, formatOptions);
        },
        _getStringNormalizer() {
          var _a, _b, _c, _d;
          var isCaseSensitive = this.option('searchPanel.highlightCaseSensitive');
          var dataSource = (_b = (_a = this._dataController) === null || _a === void 0 ? void 0 : _a.getDataSource) === null || _b === void 0 ? void 0 : _b.call(_a);
          var langParams = (_d = (_c = dataSource === null || dataSource === void 0 ? void 0 : dataSource.loadOptions) === null || _c === void 0 ? void 0 : _c.call(dataSource)) === null || _d === void 0 ? void 0 : _d.langParams;
          return str => toComparable(str, isCaseSensitive, langParams);
        },
        _findHighlightingTextNodes(column, cellElement, searchText) {
          var that = this;
          var $parent = cellElement.parent();
          var $items;
          var stringNormalizer = this._getStringNormalizer();
          var normalizedSearchText = stringNormalizer(searchText);
          var resultTextNodes = [];
          if (!$parent.length) {
            $parent = $('<div>').append(cellElement);
          } else if (column) {
            if (column.groupIndex >= 0 && !column.showWhenGrouped) {
              $items = cellElement;
            } else {
              var columnIndex = that._columnsController.getVisibleIndex(column.index);
              $items = $parent.children('td').eq(columnIndex).find('*');
            }
          }
          $items = ($items === null || $items === void 0 ? void 0 : $items.length) ? $items : $parent.find('*');
          $items.each((_, element) => {
            var $contents = $(element).contents();
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
        _highlightSearchTextCore($textNode, searchText) {
          var that = this;
          var $searchTextSpan = $('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS));
          var text = $textNode.text();
          var firstContentElement = $textNode[0];
          var stringNormalizer = this._getStringNormalizer();
          var index = stringNormalizer(text).indexOf(stringNormalizer(searchText));
          if (index >= 0) {
            if (firstContentElement.textContent) {
              firstContentElement.textContent = text.substr(0, index);
            } else {
              firstContentElement.nodeValue = text.substr(0, index);
            }
            $textNode.after($searchTextSpan.text(text.substr(index, searchText.length)));
            // @ts-expect-error
            $textNode = $(domAdapter.createTextNode(text.substr(index + searchText.length))).insertAfter($searchTextSpan);
            return that._highlightSearchTextCore($textNode, searchText);
          }
        },
        _highlightSearchText(cellElement, isEquals, column) {
          var that = this;
          var stringNormalizer = this._getStringNormalizer();
          var searchText = that.option('searchPanel.text');
          if (isEquals && column) {
            searchText = searchText && that._getFormattedSearchText(column, searchText);
          }
          if (searchText && that.option('searchPanel.highlightSearchText')) {
            var textNodes = that._findHighlightingTextNodes(column, cellElement, searchText);
            textNodes.forEach(textNode => {
              if (isEquals) {
                if (stringNormalizer($(textNode).text()) === stringNormalizer(searchText)) {
                  $(textNode).replaceWith($('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS)).text($(textNode).text()));
                }
              } else {
                that._highlightSearchTextCore($(textNode), searchText);
              }
            });
          }
        },
        _renderCore() {
          var deferred = this.callBase.apply(this, arguments);
          // T103538
          if (this.option().rowTemplate || this.option('dataRowTemplate')) {
            if (this.option('templatesRenderAsynchronously')) {
              clearTimeout(this._highlightTimer);
              this._highlightTimer = setTimeout(() => {
                this._highlightSearchText(this.getTableElement());
              });
            } else {
              this._highlightSearchText(this.getTableElement());
            }
          }
          return deferred;
        },
        _updateCell($cell, parameters) {
          var {
            column
          } = parameters;
          var dataType = column.lookup && column.lookup.dataType || column.dataType;
          var isEquals = dataType !== 'string';
          if (allowSearch(column) && !parameters.isOnForm) {
            if (this.option('templatesRenderAsynchronously')) {
              if (!this._searchParams.length) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = setTimeout(() => {
                  this._searchParams.forEach(params => {
                    this._highlightSearchText.apply(this, params);
                  });
                  this._searchParams = [];
                });
              }
              this._searchParams.push([$cell, isEquals, column]);
            } else {
              this._highlightSearchText($cell, isEquals, column);
            }
          }
          this.callBase($cell, parameters);
        },
        dispose() {
          clearTimeout(this._highlightTimer);
          this.callBase();
        }
      }
    }
  }
};
