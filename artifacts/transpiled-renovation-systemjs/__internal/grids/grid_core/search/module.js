!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/grid_core/search/module.js"], ["../../../../core/renderer","../../../../core/dom_adapter","../../../../core/utils/type","../../../../core/utils/data","../../../../localization/message","../../../../data/query","../module_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/grid_core/search/module.js", ["../../../../core/renderer", "../../../../core/dom_adapter", "../../../../core/utils/type", "../../../../core/utils/data", "../../../../localization/message", "../../../../data/query", "../module_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.searchModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _type = $__require("../../../../core/utils/type");
  var _data = $__require("../../../../core/utils/data");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _module_utils = _interopRequireDefault($__require("../module_utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /* eslint-disable @typescript-eslint/method-signature-style */

  var SEARCH_PANEL_CLASS = 'search-panel';
  var SEARCH_TEXT_CLASS = 'search-text';
  var HEADER_PANEL_CLASS = 'header-panel';
  var FILTERING_TIMEOUT = 700;
  function allowSearch(column) {
    return (0, _type.isDefined)(column.allowSearch) ? column.allowSearch : column.allowFiltering;
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
  var searchModule = {
    defaultOptions: function defaultOptions() {
      return {
        searchPanel: {
          visible: false,
          width: 160,
          placeholder: _message.default.format('dxDataGrid-searchPanelPlaceholder'),
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
              var valueGetter = (0, _data.compileGetter)(lookup.valueExpr);
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
                  (0, _query.default)(lookup.items).filter(column.createFilterExpression.call({
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
            return _module_utils.default.combineFilters(filters, 'or');
          };
          return {
            publicMethods: function publicMethods() {
              return this.callBase().concat(['searchByText']);
            },
            _calculateAdditionalFilter: function _calculateAdditionalFilter() {
              var that = this;
              var filter = that.callBase();
              var searchFilter = calculateSearchFilter(that, that.option('searchPanel.text'));
              return _module_utils.default.combineFilters([filter, searchFilter]);
            },
            searchByText: function searchByText(text) {
              this.option('searchPanel.text', text);
            },
            optionChanged: function optionChanged(args) {
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
            _getToolbarItems: function _getToolbarItems() {
              var items = this.callBase();
              return this._prepareSearchItem(items);
            },
            _prepareSearchItem: function _prepareSearchItem(items) {
              var that = this;
              var dataController = that.getController('data');
              var searchPanelOptions = getSearchPanelOptions(that);
              if (searchPanelOptions && searchPanelOptions.visible) {
                var toolbarItem = {
                  template: function template(data, index, container) {
                    var $search = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(SEARCH_PANEL_CLASS)).appendTo(container);
                    that.getController('editorFactory').createEditor($search, {
                      width: searchPanelOptions.width,
                      placeholder: searchPanelOptions.placeholder,
                      parentType: 'searchPanel',
                      value: that.option('searchPanel.text'),
                      updateValueTimeout: FILTERING_TIMEOUT,
                      setValue: function setValue(value) {
                        dataController.searchByText(value);
                      },
                      editorOptions: {
                        inputAttr: {
                          'aria-label': _message.default.format("".concat(that.component.NAME, "-ariaSearchInGrid"))
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
            getSearchTextEditor: function getSearchTextEditor() {
              var that = this;
              var $element = that.element();
              var $searchPanel = $element.find(".".concat(that.addWidgetPrefix(SEARCH_PANEL_CLASS))).filter(function () {
                return (0, _renderer.default)(this).closest(".".concat(that.addWidgetPrefix(HEADER_PANEL_CLASS))).is($element);
              });
              if ($searchPanel.length) {
                return $searchPanel.dxTextBox('instance');
              }
              return null;
            },
            isVisible: function isVisible() {
              var searchPanelOptions = getSearchPanelOptions(this);
              return this.callBase() || searchPanelOptions && searchPanelOptions.visible;
            },
            optionChanged: function optionChanged(args) {
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
          init: function init() {
            this.callBase.apply(this, arguments);
            this._searchParams = [];
          },
          _getFormattedSearchText: function _getFormattedSearchText(column, searchText) {
            var value = parseValue(column, searchText);
            var formatOptions = _module_utils.default.getFormatOptionsByColumn(column, 'search');
            return _module_utils.default.formatValue(value, formatOptions);
          },
          _getStringNormalizer: function _getStringNormalizer() {
            var isCaseSensitive = this.option('searchPanel.highlightCaseSensitive');
            return function (str) {
              return isCaseSensitive ? str : str.toLowerCase();
            };
          },
          _findHighlightingTextNodes: function _findHighlightingTextNodes(column, cellElement, searchText) {
            var that = this;
            var $parent = cellElement.parent();
            var $items;
            var stringNormalizer = this._getStringNormalizer();
            var normalizedSearchText = stringNormalizer(searchText);
            var resultTextNodes = [];
            if (!$parent.length) {
              $parent = (0, _renderer.default)('<div>').append(cellElement);
            } else if (column) {
              if (column.groupIndex >= 0 && !column.showWhenGrouped) {
                $items = cellElement;
              } else {
                var columnIndex = that._columnsController.getVisibleIndex(column.index);
                $items = $parent.children('td').eq(columnIndex).find('*');
              }
            }
            $items = ($items === null || $items === void 0 ? void 0 : $items.length) ? $items : $parent.find('*');
            $items.each(function (_, element) {
              var $contents = (0, _renderer.default)(element).contents();
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
          _highlightSearchTextCore: function _highlightSearchTextCore($textNode, searchText) {
            var that = this;
            var $searchTextSpan = (0, _renderer.default)('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS));
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
              $textNode = (0, _renderer.default)(_dom_adapter.default.createTextNode(text.substr(index + searchText.length))).insertAfter($searchTextSpan);
              return that._highlightSearchTextCore($textNode, searchText);
            }
          },
          _highlightSearchText: function _highlightSearchText(cellElement, isEquals, column) {
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
                  if (stringNormalizer((0, _renderer.default)(textNode).text()) === stringNormalizer(searchText)) {
                    (0, _renderer.default)(textNode).replaceWith((0, _renderer.default)('<span>').addClass(that.addWidgetPrefix(SEARCH_TEXT_CLASS)).text((0, _renderer.default)(textNode).text()));
                  }
                } else {
                  that._highlightSearchTextCore((0, _renderer.default)(textNode), searchText);
                }
              });
            }
          },
          _renderCore: function _renderCore() {
            var _this = this;
            var deferred = this.callBase.apply(this, arguments);
            // T103538
            if (this.option().rowTemplate || this.option('dataRowTemplate')) {
              if (this.option('templatesRenderAsynchronously')) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = setTimeout(function () {
                  _this._highlightSearchText(_this.getTableElement());
                });
              } else {
                this._highlightSearchText(this.getTableElement());
              }
            }
            return deferred;
          },
          _updateCell: function _updateCell($cell, parameters) {
            var _this2 = this;
            var column = parameters.column;
            var dataType = column.lookup && column.lookup.dataType || column.dataType;
            var isEquals = dataType !== 'string';
            if (allowSearch(column) && !parameters.isOnForm) {
              if (this.option('templatesRenderAsynchronously')) {
                if (!this._searchParams.length) {
                  clearTimeout(this._highlightTimer);
                  this._highlightTimer = setTimeout(function () {
                    _this2._searchParams.forEach(function (params) {
                      _this2._highlightSearchText.apply(_this2, params);
                    });
                    _this2._searchParams = [];
                  });
                }
                this._searchParams.push([$cell, isEquals, column]);
              } else {
                this._highlightSearchText($cell, isEquals, column);
              }
            }
            this.callBase($cell, parameters);
          },
          dispose: function dispose() {
            clearTimeout(this._highlightTimer);
            this.callBase();
          }
        }
      }
    }
  };
  exports.searchModule = searchModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/dom_adapter","../../../../core/utils/type","../../../../core/utils/data","../../../../localization/message","../../../../data/query","../module_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/dom_adapter"), require("../../../../core/utils/type"), require("../../../../core/utils/data"), require("../../../../localization/message"), require("../../../../data/query"), require("../module_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map