/**
* DevExtreme (esm/ui/grid_core/ui.grid_core.header_filter_core.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import modules from './ui.grid_core.modules';
import gridCoreUtils from './ui.grid_core.utils';
import { isDefined, isFunction } from '../../core/utils/type';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import Popup from '../popup/ui.popup';
import TreeView from '../tree_view';
import List from '../list_light';
import '../list/modules/search';
import '../list/modules/selection';
import messageLocalization from '../../localization/message';
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
function updateSelectAllState(e, filterValues) {
  if (e.component.option('searchValue')) {
    return;
  }
  var selectAllCheckBox = $(e.element).find('.dx-list-select-all-checkbox').data('dxCheckBox');
  if (selectAllCheckBox && filterValues && filterValues.length) {
    selectAllCheckBox.option('value', undefined);
  }
}
function isSearchEnabled(that, options) {
  var headerFilter = options.headerFilter;
  if (headerFilter && isDefined(headerFilter.allowSearch)) {
    return headerFilter.allowSearch;
  }
  return that.option('headerFilter.allowSearch');
}
export function updateHeaderFilterItemSelectionState(item, filterValuesMatch, isExcludeFilter) {
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
export var HeaderFilterView = modules.View.inherit({
  getPopupContainer: function getPopupContainer() {
    return this._popupContainer;
  },
  getListContainer: function getListContainer() {
    return this._listContainer;
  },
  applyHeaderFilter: function applyHeaderFilter(options) {
    var that = this;
    var list = that.getListContainer();
    var searchValue = list.option('searchValue');
    var isSelectAll = !searchValue && !options.isFilterBuilder && list.$element().find('.dx-checkbox').eq(0).hasClass('dx-checkbox-checked');
    var filterValues = [];
    var fillSelectedItemKeys = function fillSelectedItemKeys(filterValues, items, isExclude) {
      each(items, function (_, item) {
        if (item.selected !== undefined && !!item.selected ^ isExclude) {
          var node = list._getNode(item);
          var hasChildren = list._hasChildren(node);
          var hasChildrenWithSelection = hasChildren && item.items && item.items.some(item => item.selected);
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
    if (!isSelectAll) {
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
      label: messageLocalization.format('dxDataGrid-headerFilterLabel')
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

  _getSearchExpr: function _getSearchExpr(options) {
    var lookup = options.lookup;
    var useDefaultSearchExpr = options.useDefaultSearchExpr;
    var headerFilterDataSource = options.headerFilter && options.headerFilter.dataSource;
    if (useDefaultSearchExpr || isDefined(headerFilterDataSource) && !isFunction(headerFilterDataSource)) {
      return DEFAULT_SEARCH_EXPRESSION;
    }
    if (lookup) {
      return lookup.displayExpr || 'this';
    }
    if (options.dataSource) {
      var group = options.dataSource.group;
      if (Array.isArray(group) && group.length > 0) {
        return group[0].selector;
      } else if (isFunction(group) && !options.remoteFiltering) {
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
    var headerFilterOptions = that.option('headerFilter');
    var width = options.headerFilter && options.headerFilter.width || headerFilterOptions && headerFilterOptions.width;
    var height = options.headerFilter && options.headerFilter.height || headerFilterOptions && headerFilterOptions.height;
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
      focusStateEnabled: false,
      copyRootClassesToWrapper: true,
      _ignoreCopyRootClassesToWrapperDeprecation: true,
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
        that._initializeListContainer(options);
        options.onShowing && options.onShowing(e);
      },
      onShown: function onShown() {
        that.getListContainer().focus();
      },
      onHidden: options.onHidden,
      onInitialized: function onInitialized(e) {
        var component = e.component;
        // T321243
        component.option('animation', component._getDefaultOptions().animation);
      }
    };
    if (!isDefined(that._popupContainer)) {
      that._popupContainer = that._createComponent($element, Popup, dxPopupOptions);
    } else {
      that._popupContainer.option(dxPopupOptions);
    }
  },
  _initializeListContainer: function _initializeListContainer(options) {
    var that = this;
    var $content = that._popupContainer.$content();
    var widgetOptions = {
      searchEnabled: isSearchEnabled(that, options),
      searchTimeout: that.option('headerFilter.searchTimeout'),
      searchMode: options.headerFilter && options.headerFilter.searchMode || '',
      dataSource: options.dataSource,
      onContentReady: function onContentReady() {
        that.renderCompleted.fire();
      },
      itemTemplate: function itemTemplate(data, _, element) {
        var $element = $(element);
        if (options.encodeHtml) {
          return $element.text(data.text);
        }
        return $element.html(data.text);
      }
    };
    function onOptionChanged(e) {
      // T835492, T833015
      if (e.fullName === 'searchValue' && !options.isFilterBuilder && that.option('headerFilter.hideSelectAllOnSearch') !== false) {
        if (options.type === 'tree') {
          e.component.option('showCheckBoxesMode', e.value ? 'normal' : 'selectAll');
        } else {
          e.component.option('selectionMode', e.value ? 'multiple' : 'all');
        }
      }
    }
    if (options.type === 'tree') {
      that._listContainer = that._createComponent($('<div>').appendTo($content), TreeView, extend(widgetOptions, {
        showCheckBoxesMode: options.isFilterBuilder ? 'normal' : 'selectAll',
        onOptionChanged: onOptionChanged,
        keyExpr: 'id'
      }));
    } else {
      that._listContainer = that._createComponent($('<div>').appendTo($content), List, extend(widgetOptions, {
        searchExpr: that._getSearchExpr(options),
        pageLoadMode: 'scrollBottom',
        showSelectionControls: true,
        selectionMode: options.isFilterBuilder ? 'multiple' : 'all',
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
          each(items, function (index, item) {
            var selected = gridCoreUtils.getIndexByKey(item, selectedItems, null) >= 0;
            var oldSelected = !!item.selected;
            if (oldSelected !== selected) {
              item.selected = selected;
              options.filterValues = options.filterValues || [];
              var filterValueIndex = gridCoreUtils.getIndexByKey(item.value, options.filterValues, null);
              if (filterValueIndex >= 0) {
                options.filterValues.splice(filterValueIndex, 1);
              }
              if (selected ^ options.filterType === 'exclude') {
                options.filterValues.push(item.value);
              }
            }
          });
          updateSelectAllState(e, options.filterValues);
        },
        onContentReady: function onContentReady(e) {
          var component = e.component;
          var items = component.option('items');
          var selectedItems = [];
          each(items, function () {
            if (this.selected) {
              selectedItems.push(this);
            }
          });
          component._selectedItemsUpdating = true;
          component.option('selectedItems', selectedItems);
          component._selectedItemsUpdating = false;
          updateSelectAllState(e, options.filterValues);
        }
      }));
    }
  },
  _renderCore: function _renderCore() {
    this.element().addClass(HEADER_FILTER_MENU_CLASS);
  }
});
export var allowHeaderFiltering = function allowHeaderFiltering(column) {
  return isDefined(column.allowHeaderFiltering) ? column.allowHeaderFiltering : column.allowFiltering;
};
export var headerFilterMixin = {
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
        var indicatorLabel = messageLocalization.format('dxDataGrid-headerFilterIndicatorLabel', column.caption);
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
