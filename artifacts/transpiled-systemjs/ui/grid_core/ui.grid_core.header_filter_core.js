!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.header_filter_core.js"], ["../../core/renderer","./ui.grid_core.modules","./ui.grid_core.utils","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../popup/ui.popup","../tree_view","../list_light","../list/modules/search","../list/modules/selection","../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.header_filter_core.js", ["../../core/renderer", "./ui.grid_core.modules", "./ui.grid_core.utils", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/extend", "../popup/ui.popup", "../tree_view", "../list_light", "../list/modules/search", "../list/modules/selection", "../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.headerFilterMixin = exports.allowHeaderFiltering = exports.HeaderFilterView = void 0;
  exports.updateHeaderFilterItemSelectionState = updateHeaderFilterItemSelectionState;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../popup/ui.popup"));
  var _tree_view = _interopRequireDefault($__require("../tree_view"));
  var _list_light = _interopRequireDefault($__require("../list_light"));
  $__require("../list/modules/search");
  $__require("../list/modules/selection");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var HEADER_FILTER_CLASS = 'dx-header-filter';
  var HEADER_FILTER_MENU_CLASS = 'dx-header-filter-menu';
  var DEFAULT_SEARCH_EXPRESSION = 'text';
  function resetChildrenItemSelection(items) {
    items = items || [];
    for (var i = 0; i < items.length; i++) {
      items[i].selected = false;
      resetChildrenItemSelection(items[i].items);
    }
  }
  function getSelectAllCheckBox(listComponent) {
    var selector = listComponent.NAME === 'dxTreeView' ? '.dx-treeview-select-all-item' : '.dx-list-select-all-checkbox';
    return listComponent.$element().find(selector).dxCheckBox('instance');
  }
  function updateListSelectAllState(e, filterValues) {
    if (e.component.option('searchValue')) {
      return;
    }
    var selectAllCheckBox = getSelectAllCheckBox(e.component);
    if (selectAllCheckBox && filterValues && filterValues.length) {
      selectAllCheckBox.option('value', undefined);
    }
  }
  function updateHeaderFilterItemSelectionState(item, filterValuesMatch, isExcludeFilter) {
    if (filterValuesMatch ^ isExcludeFilter) {
      item.selected = true;
      if (isExcludeFilter && item.items) {
        for (var j = 0; j < item.items.length; j++) {
          if (!item.items[j].selected) {
            item.selected = undefined;
            break;
          }
        }
      }
    } else if (isExcludeFilter || item.selected) {
      item.selected = false;
      resetChildrenItemSelection(item.items);
    }
  }
  var HeaderFilterView = _uiGrid_core.default.View.inherit({
    getPopupContainer: function getPopupContainer() {
      return this._popupContainer;
    },
    getListComponent: function getListComponent() {
      return this._listComponent;
    },
    applyHeaderFilter: function applyHeaderFilter(options) {
      var that = this;
      var list = that.getListComponent();
      var searchValue = list.option('searchValue');
      var selectAllCheckBox = getSelectAllCheckBox(list);
      var isAllSelected = !searchValue && !options.isFilterBuilder && (selectAllCheckBox === null || selectAllCheckBox === void 0 ? void 0 : selectAllCheckBox.option('value'));
      var filterValues = [];
      var fillSelectedItemKeys = function fillSelectedItemKeys(filterValues, items, isExclude) {
        (0, _iterator.each)(items, function (_, item) {
          if (item.selected !== undefined && !!item.selected ^ isExclude) {
            var node = list._getNode(item);
            var hasChildren = list._hasChildren(node);
            var hasChildrenWithSelection = hasChildren && item.items && item.items.some(function (item) {
              return item.selected;
            });
            if (!searchValue || !hasChildrenWithSelection) {
              filterValues.push(item.value);
              return;
            }
          }
          if (item.items && item.items.length) {
            fillSelectedItemKeys(filterValues, item.items, isExclude);
          }
        });
      };
      if (!isAllSelected) {
        if (options.type === 'tree') {
          if (options.filterType) {
            options.filterType = 'include';
          }
          fillSelectedItemKeys(filterValues, list.option('items'), false);
          options.filterValues = filterValues;
        }
      } else {
        if (options.type === 'tree') {
          options.filterType = 'exclude';
        }
        if (Array.isArray(options.filterValues)) {
          options.filterValues = [];
        }
      }
      if (options.filterValues && !options.filterValues.length) {
        options.filterValues = null; // T500956
      }

      options.apply();
      that.hideHeaderFilterMenu();
    },
    showHeaderFilterMenu: function showHeaderFilterMenu($columnElement, options) {
      var that = this;
      if (options) {
        that._initializePopupContainer(options);
        var popupContainer = that.getPopupContainer();
        that.hideHeaderFilterMenu();
        that.updatePopup($columnElement, options);
        popupContainer.show();
      }
    },
    hideHeaderFilterMenu: function hideHeaderFilterMenu() {
      var headerFilterMenu = this.getPopupContainer();
      headerFilterMenu && headerFilterMenu.hide();
    },
    updatePopup: function updatePopup($element, options) {
      var that = this;
      var showColumnLines = this.option('showColumnLines');
      var alignment = options.alignment === 'right' ^ !showColumnLines ? 'left' : 'right';
      that._popupContainer.setAria({
        role: 'dialog',
        label: _message.default.format('dxDataGrid-headerFilterLabel')
      });
      if (that._popupContainer) {
        that._cleanPopupContent();
        that._popupContainer.option('position', {
          my: alignment + ' top',
          at: alignment + ' bottom',
          of: $element,
          collision: 'fit fit' // T1156848
        });
      }
    },

    _getSearchExpr: function _getSearchExpr(options, headerFilterOptions) {
      var lookup = options.lookup;
      var useDefaultSearchExpr = options.useDefaultSearchExpr;
      var headerFilterDataSource = headerFilterOptions.dataSource;
      var filterSearchExpr = headerFilterOptions.search.searchExpr;
      if (filterSearchExpr) {
        return filterSearchExpr;
      }
      if (useDefaultSearchExpr || (0, _type.isDefined)(headerFilterDataSource) && !(0, _type.isFunction)(headerFilterDataSource)) {
        return DEFAULT_SEARCH_EXPRESSION;
      }
      if (lookup) {
        return lookup.displayExpr || 'this';
      }
      if (options.dataSource) {
        var group = options.dataSource.group;
        if (Array.isArray(group) && group.length > 0) {
          return group[0].selector;
        } else if ((0, _type.isFunction)(group) && !options.remoteFiltering) {
          return group;
        }
      }
      return options.dataField || options.selector;
    },
    _cleanPopupContent: function _cleanPopupContent() {
      this._popupContainer && this._popupContainer.$content().empty();
    },
    _initializePopupContainer: function _initializePopupContainer(options) {
      var that = this;
      var $element = that.element();
      var headerFilterOptions = this._normalizeHeaderFilterOptions(options);
      var height = headerFilterOptions.height,
          width = headerFilterOptions.width;
      var dxPopupOptions = {
        width: width,
        height: height,
        visible: false,
        shading: false,
        showTitle: false,
        showCloseButton: false,
        hideOnParentScroll: false,
        // T756320
        dragEnabled: false,
        hideOnOutsideClick: true,
        wrapperAttr: {
          class: HEADER_FILTER_MENU_CLASS
        },
        focusStateEnabled: false,
        toolbarItems: [{
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            text: headerFilterOptions.texts.ok,
            onClick: function onClick() {
              that.applyHeaderFilter(options);
            }
          }
        }, {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            text: headerFilterOptions.texts.cancel,
            onClick: function onClick() {
              that.hideHeaderFilterMenu();
            }
          }
        }],
        resizeEnabled: true,
        onShowing: function onShowing(e) {
          e.component.$content().parent().addClass('dx-dropdowneditor-overlay');
          that._initializeListContainer(options, headerFilterOptions);
          options.onShowing && options.onShowing(e);
        },
        onShown: function onShown() {
          that.getListComponent().focus();
        },
        onHidden: options.onHidden,
        onInitialized: function onInitialized(e) {
          var component = e.component;
          // T321243
          component.option('animation', component._getDefaultOptions().animation);
        }
      };
      if (!(0, _type.isDefined)(that._popupContainer)) {
        that._popupContainer = that._createComponent($element, _ui.default, dxPopupOptions);
      } else {
        that._popupContainer.option(dxPopupOptions);
      }
    },
    _initializeListContainer: function _initializeListContainer(options, headerFilterOptions) {
      var that = this;
      var $content = that._popupContainer.$content();
      var needShowSelectAllCheckbox = !options.isFilterBuilder && headerFilterOptions.allowSelectAll;
      var widgetOptions = {
        searchEnabled: headerFilterOptions.search.enabled,
        searchTimeout: headerFilterOptions.search.timeout,
        searchEditorOptions: headerFilterOptions.search.editorOptions,
        searchMode: headerFilterOptions.search.mode || '',
        dataSource: options.dataSource,
        onContentReady: function onContentReady() {
          that.renderCompleted.fire();
        },
        itemTemplate: function itemTemplate(data, _, element) {
          var $element = (0, _renderer.default)(element);
          if (options.encodeHtml) {
            return $element.text(data.text);
          }
          return $element.html(data.text);
        }
      };
      function onOptionChanged(e) {
        // T835492, T833015
        if (e.fullName === 'searchValue' && needShowSelectAllCheckbox && that.option('headerFilter.hideSelectAllOnSearch') !== false) {
          if (options.type === 'tree') {
            e.component.option('showCheckBoxesMode', e.value ? 'normal' : 'selectAll');
          } else {
            e.component.option('selectionMode', e.value ? 'multiple' : 'all');
          }
        }
      }
      if (options.type === 'tree') {
        that._listComponent = that._createComponent((0, _renderer.default)('<div>').appendTo($content), _tree_view.default, (0, _extend.extend)(widgetOptions, {
          showCheckBoxesMode: needShowSelectAllCheckbox ? 'selectAll' : 'normal',
          onOptionChanged: onOptionChanged,
          keyExpr: 'id'
        }));
      } else {
        that._listComponent = that._createComponent((0, _renderer.default)('<div>').appendTo($content), _list_light.default, (0, _extend.extend)(widgetOptions, {
          searchExpr: that._getSearchExpr(options, headerFilterOptions),
          pageLoadMode: 'scrollBottom',
          showSelectionControls: true,
          selectionMode: needShowSelectAllCheckbox ? 'all' : 'multiple',
          onOptionChanged: onOptionChanged,
          onSelectionChanged: function onSelectionChanged(e) {
            var items = e.component.option('items');
            var selectedItems = e.component.option('selectedItems');
            if (!e.component._selectedItemsUpdating && !e.component.option('searchValue') && !options.isFilterBuilder) {
              var filterValues = options.filterValues || [];
              var isExclude = options.filterType === 'exclude';
              if (selectedItems.length === 0 && items.length && (filterValues.length <= 1 || isExclude && filterValues.length === items.length - 1)) {
                options.filterType = 'include';
                options.filterValues = [];
              } else if (selectedItems.length === items.length) {
                options.filterType = 'exclude';
                options.filterValues = [];
              }
            }
            (0, _iterator.each)(items, function (index, item) {
              var selected = _uiGrid_core2.default.getIndexByKey(item, selectedItems, null) >= 0;
              var oldSelected = !!item.selected;
              if (oldSelected !== selected) {
                item.selected = selected;
                options.filterValues = options.filterValues || [];
                var filterValueIndex = _uiGrid_core2.default.getIndexByKey(item.value, options.filterValues, null);
                if (filterValueIndex >= 0) {
                  options.filterValues.splice(filterValueIndex, 1);
                }
                if (selected ^ options.filterType === 'exclude') {
                  options.filterValues.push(item.value);
                }
              }
            });
            updateListSelectAllState(e, options.filterValues);
          },
          onContentReady: function onContentReady(e) {
            var component = e.component;
            var items = component.option('items');
            var selectedItems = [];
            (0, _iterator.each)(items, function () {
              if (this.selected) {
                selectedItems.push(this);
              }
            });
            component._selectedItemsUpdating = true;
            component.option('selectedItems', selectedItems);
            component._selectedItemsUpdating = false;
            updateListSelectAllState(e, options.filterValues);
          }
        }));
      }
    },
    _normalizeHeaderFilterOptions: function _normalizeHeaderFilterOptions(options) {
      var generalHeaderFilter = this.option('headerFilter') || {};
      var specificHeaderFilter = options.headerFilter || {};
      var generalDeprecated = {
        search: {
          enabled: generalHeaderFilter.allowSearch,
          timeout: generalHeaderFilter.searchTimeout
        }
      };
      var specificDeprecated = {
        search: {
          enabled: specificHeaderFilter.allowSearch,
          mode: specificHeaderFilter.searchMode,
          timeout: specificHeaderFilter.searchTimeout
        }
      };
      return (0, _extend.extend)(true, {}, generalHeaderFilter, generalDeprecated, specificHeaderFilter, specificDeprecated);
    },
    _renderCore: function _renderCore() {
      this.element().addClass(HEADER_FILTER_MENU_CLASS);
    }
  });
  exports.HeaderFilterView = HeaderFilterView;
  var allowHeaderFiltering = function allowHeaderFiltering(column) {
    return (0, _type.isDefined)(column.allowHeaderFiltering) ? column.allowHeaderFiltering : column.allowFiltering;
  };
  exports.allowHeaderFiltering = allowHeaderFiltering;
  var headerFilterMixin = {
    _applyColumnState: function _applyColumnState(options) {
      var $headerFilterIndicator;
      var rootElement = options.rootElement;
      var column = options.column;
      if (options.name === 'headerFilter') {
        rootElement.find('.' + HEADER_FILTER_CLASS).remove();
        if (allowHeaderFiltering(column)) {
          $headerFilterIndicator = this.callBase(options).toggleClass('dx-header-filter-empty', this._isHeaderFilterEmpty(column));
          if (!this.option('useLegacyKeyboardNavigation')) {
            $headerFilterIndicator.attr('tabindex', this.option('tabindex') || 0);
          }
          var indicatorLabel = _message.default.format('dxDataGrid-headerFilterIndicatorLabel', column.caption);
          $headerFilterIndicator.attr('aria-label', indicatorLabel);
          $headerFilterIndicator.attr('aria-haspopup', 'dialog');
          $headerFilterIndicator.attr('role', 'button');
        }
        return $headerFilterIndicator;
      }
      return this.callBase(options);
    },
    _isHeaderFilterEmpty: function _isHeaderFilterEmpty(column) {
      return !column.filterValues || !column.filterValues.length;
    },
    _getIndicatorClassName: function _getIndicatorClassName(name) {
      if (name === 'headerFilter') {
        return HEADER_FILTER_CLASS;
      }
      return this.callBase(name);
    },
    _renderIndicator: function _renderIndicator(options) {
      var $container = options.container;
      var $indicator = options.indicator;
      if (options.name === 'headerFilter') {
        var rtlEnabled = this.option('rtlEnabled');
        if ($container.children().length && (!rtlEnabled && options.columnAlignment === 'right' || rtlEnabled && options.columnAlignment === 'left')) {
          $container.prepend($indicator);
          return;
        }
      }
      this.callBase(options);
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'headerFilter') {
        var requireReady = this.name === 'columnHeadersView';
        this._invalidate(requireReady, requireReady);
        args.handled = true;
      } else {
        this.callBase(args);
      }
    }
  };
  exports.headerFilterMixin = headerFilterMixin;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./ui.grid_core.modules","./ui.grid_core.utils","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","../popup/ui.popup","../tree_view","../list_light","../list/modules/search","../list/modules/selection","../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./ui.grid_core.modules"), require("./ui.grid_core.utils"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../popup/ui.popup"), require("../tree_view"), require("../list_light"), require("../list/modules/search"), require("../list/modules/selection"), require("../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.header_filter_core.js.map