/**
* DevExtreme (esm/__internal/grids/grid_core/m_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
// @ts-check
import $ from '../../../core/renderer';
import { equalByValue } from '../../../core/utils/common';
// @ts-expect-error
import { toComparable } from '../../../core/utils/data';
import { Deferred, when } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getBoundingRect } from '../../../core/utils/position';
import { getHeight } from '../../../core/utils/size';
import { format } from '../../../core/utils/string';
import { isDefined, isFunction, isString } from '../../../core/utils/type';
import variableWrapper from '../../../core/utils/variable_wrapper';
import { getWindow } from '../../../core/utils/window';
import { DataSource } from '../../../data/data_source/data_source';
import { normalizeDataSourceOptions } from '../../../data/data_source/utils';
// @ts-expect-error
import { normalizeSortingInfo as normalizeSortingInfoUtility } from '../../../data/utils';
import eventsEngine from '../../../events/core/events_engine';
import formatHelper from '../../../format_helper';
import LoadPanel from '../../../ui/load_panel';
import sharedFiltering from '../../../ui/shared/filtering';
var DATAGRID_SELECTION_DISABLED_CLASS = 'dx-selection-disabled';
var DATAGRID_GROUP_OPENED_CLASS = 'dx-datagrid-group-opened';
var DATAGRID_GROUP_CLOSED_CLASS = 'dx-datagrid-group-closed';
var DATAGRID_EXPAND_CLASS = 'dx-datagrid-expand';
var NO_DATA_CLASS = 'nodata';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
var SCROLLING_MODE_OPTION = 'scrolling.mode';
var ROW_RENDERING_MODE_OPTION = 'scrolling.rowRenderingMode';
var DATE_INTERVAL_SELECTORS = {
  year(value) {
    return value && value.getFullYear();
  },
  month(value) {
    return value && value.getMonth() + 1;
  },
  day(value) {
    return value && value.getDate();
  },
  quarter(value) {
    return value && Math.floor(value.getMonth() / 3) + 1;
  },
  hour(value) {
    return value && value.getHours();
  },
  minute(value) {
    return value && value.getMinutes();
  },
  second(value) {
    return value && value.getSeconds();
  }
};
var getIntervalSelector = function getIntervalSelector() {
  var data = arguments[1];
  var value = this.calculateCellValue(data);
  if (!isDefined(value)) {
    return null;
  }
  if (isDateType(this.dataType)) {
    var nameIntervalSelector = arguments[0];
    return DATE_INTERVAL_SELECTORS[nameIntervalSelector](value);
  }
  if (this.dataType === 'number') {
    var groupInterval = arguments[0];
    return Math.floor(Number(value) / groupInterval) * groupInterval;
  }
};
var equalSelectors = function equalSelectors(selector1, selector2) {
  if (isFunction(selector1) && isFunction(selector2)) {
    if (selector1.originalCallback && selector2.originalCallback) {
      return selector1.originalCallback === selector2.originalCallback && selector1.columnIndex === selector2.columnIndex;
    }
  }
  return selector1 === selector2;
};
function isDateType(dataType) {
  return dataType === 'date' || dataType === 'datetime';
}
var setEmptyText = function setEmptyText($container) {
  $container.get(0).textContent = '\u00A0';
};
var normalizeSortingInfo = function normalizeSortingInfo(sort) {
  sort = sort || [];
  var result = normalizeSortingInfoUtility(sort);
  for (var i = 0; i < sort.length; i++) {
    if (sort && sort[i] && sort[i].isExpanded !== undefined) {
      result[i].isExpanded = sort[i].isExpanded;
    }
    if (sort && sort[i] && sort[i].groupInterval !== undefined) {
      result[i].groupInterval = sort[i].groupInterval;
    }
  }
  return result;
};
var formatValue = function formatValue(value, options) {
  var valueText = formatHelper.format(value, options.format) || value && value.toString() || '';
  var formatObject = {
    value,
    valueText: options.getDisplayFormat ? options.getDisplayFormat(valueText) : valueText,
    target: options.target || 'row',
    groupInterval: options.groupInterval
  };
  return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText;
};
var getSummaryText = function getSummaryText(summaryItem, summaryTexts) {
  var displayFormat = summaryItem.displayFormat || summaryItem.columnCaption && summaryTexts["".concat(summaryItem.summaryType, "OtherColumn")] || summaryTexts[summaryItem.summaryType];
  return formatValue(summaryItem.value, {
    format: summaryItem.valueFormat,
    getDisplayFormat(valueText) {
      return displayFormat ? format(displayFormat, valueText, summaryItem.columnCaption) : valueText;
    },
    customizeText: summaryItem.customizeText
  });
};
var getWidgetInstance = function getWidgetInstance($element) {
  var editorData = $element.data && $element.data();
  var dxComponents = editorData && editorData.dxComponents;
  var widgetName = dxComponents && dxComponents[0];
  return widgetName && editorData[widgetName];
};
var equalFilterParameters = function equalFilterParameters(filter1, filter2) {
  if (Array.isArray(filter1) && Array.isArray(filter2)) {
    if (filter1.length !== filter2.length) {
      return false;
    }
    for (var i = 0; i < filter1.length; i++) {
      if (!equalFilterParameters(filter1[i], filter2[i])) {
        return false;
      }
    }
    return true;
  }
  if (isFunction(filter1) && filter1.columnIndex >= 0 && isFunction(filter2) && filter2.columnIndex >= 0) {
    return filter1.columnIndex === filter2.columnIndex && toComparable(filter1.filterValue) === toComparable(filter2.filterValue) && toComparable(filter1.selectedFilterOperation) === toComparable(filter2.selectedFilterOperation);
  }
  return toComparable(filter1) == toComparable(filter2); // eslint-disable-line eqeqeq
};

function normalizeGroupingLoadOptions(group) {
  if (!Array.isArray(group)) {
    group = [group];
  }
  return group.map((item, i) => {
    if (isString(item)) {
      return {
        selector: item,
        isExpanded: i < group.length - 1
      };
    }
    return item;
  });
}
export default {
  renderNoDataText($element) {
    var that = this;
    $element = $element || this.element();
    if (!$element) {
      return;
    }
    var noDataClass = that.addWidgetPrefix(NO_DATA_CLASS);
    var noDataElement = $element.find(".".concat(noDataClass)).last();
    var isVisible = this._dataController.isEmpty();
    var isLoading = this._dataController.isLoading();
    if (!noDataElement.length) {
      noDataElement = $('<span>').addClass(noDataClass);
    }
    if (!noDataElement.parent().is($element)) {
      noDataElement.appendTo($element);
    }
    if (isVisible && !isLoading) {
      noDataElement.removeClass('dx-hidden').text(that._getNoDataText());
    } else {
      noDataElement.addClass('dx-hidden');
    }
  },
  renderLoadPanel($element, $container, isLocalStore) {
    var that = this;
    var loadPanelOptions;
    that._loadPanel && that._loadPanel.$element().remove();
    loadPanelOptions = that.option('loadPanel');
    if (loadPanelOptions && (loadPanelOptions.enabled === 'auto' ? !isLocalStore : loadPanelOptions.enabled)) {
      loadPanelOptions = extend({
        shading: false,
        message: loadPanelOptions.text,
        container: $container
      }, loadPanelOptions);
      that._loadPanel = that._createComponent($('<div>').appendTo($container), LoadPanel, loadPanelOptions);
    } else {
      that._loadPanel = null;
    }
  },
  calculateLoadPanelPosition($element) {
    // @ts-expect-error
    var $window = $(getWindow());
    if (getHeight($element) > getHeight($window)) {
      return {
        of: $window,
        boundary: $element,
        collision: 'fit'
      };
    }
    return {
      of: $element
    };
  },
  getIndexByKey(key, items, keyName) {
    var index = -1;
    if (key !== undefined && Array.isArray(items)) {
      keyName = arguments.length <= 2 ? 'key' : keyName;
      for (var i = 0; i < items.length; i++) {
        var item = isDefined(keyName) ? items[i][keyName] : items[i];
        if (equalByValue(key, item)) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  combineFilters(filters, operation) {
    var _a;
    var resultFilter = [];
    operation = operation || 'and';
    for (var i = 0; i < filters.length; i++) {
      if (!filters[i]) {
        continue;
      }
      if (((_a = filters[i]) === null || _a === void 0 ? void 0 : _a.length) === 1 && filters[i][0] === '!') {
        if (operation === 'and') {
          return ['!'];
        }
        if (operation === 'or') {
          continue;
        }
      }
      if (resultFilter.length) {
        resultFilter.push(operation);
      }
      resultFilter.push(filters[i]);
    }
    if (resultFilter.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      resultFilter = resultFilter[0];
    }
    if (resultFilter.length) {
      return resultFilter;
    }
    return undefined;
  },
  checkChanges(changes, changeNames) {
    var changesWithChangeNamesCount = 0;
    for (var i = 0; i < changeNames.length; i++) {
      if (changes[changeNames[i]]) {
        changesWithChangeNamesCount++;
      }
    }
    return changes.length && changes.length === changesWithChangeNamesCount;
  },
  equalFilterParameters,
  proxyMethod(instance, methodName, defaultResult) {
    if (!instance[methodName]) {
      instance[methodName] = function () {
        var dataSource = this._dataSource;
        return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
      };
    }
  },
  formatValue,
  getFormatOptionsByColumn(column, target) {
    return {
      format: column.format,
      getDisplayFormat: column.getDisplayFormat,
      customizeText: column.customizeText,
      target,
      trueText: column.trueText,
      falseText: column.falseText
    };
  },
  getDisplayValue(column, value, data, rowType) {
    if (column.displayValueMap && column.displayValueMap[value] !== undefined) {
      return column.displayValueMap[value];
    }
    if (column.calculateDisplayValue && data && rowType !== 'group') {
      return column.calculateDisplayValue(data);
    }
    if (column.lookup && !(rowType === 'group' && (column.calculateGroupValue || column.calculateDisplayValue))) {
      return column.lookup.calculateCellValue(value);
    }
    return value;
  },
  getGroupRowSummaryText(summaryItems, summaryTexts) {
    var result = '(';
    for (var i = 0; i < summaryItems.length; i++) {
      var summaryItem = summaryItems[i];
      result += (i > 0 ? ', ' : '') + getSummaryText(summaryItem, summaryTexts);
    }
    // eslint-disable-next-line no-return-assign
    return result += ')';
  },
  getSummaryText,
  normalizeSortingInfo,
  getFormatByDataType(dataType) {
    // eslint-disable-next-line default-case
    switch (dataType) {
      case 'date':
        return 'shortDate';
      case 'datetime':
        return 'shortDateShortTime';
      default:
        return undefined;
    }
  },
  getHeaderFilterGroupParameters(column, remoteGrouping) {
    var result = [];
    var dataField = column.dataField || column.name;
    var groupInterval = sharedFiltering.getGroupInterval(column);
    if (groupInterval) {
      each(groupInterval, (index, interval) => {
        result.push(remoteGrouping ? {
          selector: dataField,
          groupInterval: interval,
          isExpanded: index < groupInterval.length - 1
        } : getIntervalSelector.bind(column, interval));
      });
      return result;
    }
    if (remoteGrouping) {
      result = [{
        selector: dataField,
        isExpanded: false
      }];
    } else {
      result = function result(data) {
        var result = column.calculateCellValue(data);
        if (result === undefined || result === '') {
          result = null;
        }
        return result;
      };
      if (column.sortingMethod) {
        result = [{
          selector: result,
          compare: column.sortingMethod.bind(column)
        }];
      }
    }
    return result;
  },
  equalSortParameters(sortParameters1, sortParameters2, ignoreIsExpanded) {
    sortParameters1 = normalizeSortingInfo(sortParameters1);
    sortParameters2 = normalizeSortingInfo(sortParameters2);
    if (Array.isArray(sortParameters1) && Array.isArray(sortParameters2)) {
      if (sortParameters1.length !== sortParameters2.length) {
        return false;
      }
      for (var i = 0; i < sortParameters1.length; i++) {
        if (!equalSelectors(sortParameters1[i].selector, sortParameters2[i].selector) || sortParameters1[i].desc !== sortParameters2[i].desc || sortParameters1[i].groupInterval !== sortParameters2[i].groupInterval || !ignoreIsExpanded && Boolean(sortParameters1[i].isExpanded) !== Boolean(sortParameters2[i].isExpanded)) {
          return false;
        }
      }
      return true;
    }
    return (!sortParameters1 || !sortParameters1.length) === (!sortParameters2 || !sortParameters2.length);
  },
  getPointsByColumns(items, pointCreated, isVertical, startColumnIndex) {
    var cellsLength = items.length;
    var notCreatePoint = false;
    var item;
    var offset;
    var columnIndex = startColumnIndex || 0;
    var result = [];
    var rtlEnabled;
    for (var i = 0; i <= cellsLength; i++) {
      if (i < cellsLength) {
        item = items.eq(i);
        offset = item.offset();
        rtlEnabled = item.css('direction') === 'rtl';
      }
      var point = {
        index: columnIndex,
        // @ts-expect-error
        x: offset ? offset.left + (!isVertical && rtlEnabled ^ i === cellsLength ? getBoundingRect(item[0]).width : 0) : 0,
        y: offset ? offset.top + (isVertical && i === cellsLength ? getBoundingRect(item[0]).height : 0) : 0,
        columnIndex
      };
      if (!isVertical && i > 0) {
        var prevItemOffset = items.eq(i - 1).offset();
        if (prevItemOffset.top < point.y) {
          point.y = prevItemOffset.top;
        }
      }
      if (pointCreated) {
        notCreatePoint = pointCreated(point);
      }
      if (!notCreatePoint) {
        result.push(point);
      }
      columnIndex++;
    }
    return result;
  },
  getExpandCellTemplate() {
    return {
      allowRenderToDetachedContainer: true,
      render(container, options) {
        var $container = $(container);
        if (isDefined(options.value) && !(options.data && options.data.isContinuation) && !options.row.isNewRow) {
          var rowsView = options.component.getView('rowsView');
          $container.addClass(DATAGRID_EXPAND_CLASS).addClass(DATAGRID_SELECTION_DISABLED_CLASS);
          $('<div>').addClass(options.value ? DATAGRID_GROUP_OPENED_CLASS : DATAGRID_GROUP_CLOSED_CLASS).appendTo($container);
          rowsView.setAria('label', options.value ? rowsView.localize('dxDataGrid-ariaCollapse') : rowsView.localize('dxDataGrid-ariaExpand'), $container);
        } else {
          setEmptyText($container);
        }
      }
    };
  },
  setEmptyText,
  isDateType,
  getSelectionRange(focusedElement) {
    try {
      if (focusedElement) {
        return {
          selectionStart: focusedElement.selectionStart,
          selectionEnd: focusedElement.selectionEnd
        };
      }
    } catch (e) {/* empty */}
    return {};
  },
  setSelectionRange(focusedElement, selectionRange) {
    try {
      if (focusedElement && focusedElement.setSelectionRange) {
        focusedElement.setSelectionRange(selectionRange.selectionStart, selectionRange.selectionEnd);
      }
    } catch (e) {/* empty */}
  },
  focusAndSelectElement(component, $element) {
    var isFocused = $element.is(':focus');
    // @ts-expect-error
    eventsEngine.trigger($element, 'focus');
    var isSelectTextOnEditingStart = component.option('editing.selectTextOnEditStart');
    var element = $element.get(0);
    if (!isFocused && isSelectTextOnEditingStart && $element.is('.dx-texteditor-input') && !$element.is('[readonly]')) {
      var editor = getWidgetInstance($element.closest('.dx-texteditor'));
      when(editor && editor._loadItemDeferred).done(() => {
        element.select();
      });
    }
  },
  getWidgetInstance,
  getLastResizableColumnIndex(columns, resultWidths) {
    var hasResizableColumns = columns.some(column => column && !column.command && !column.fixed && column.allowResizing !== false);
    var lastColumnIndex;
    for (lastColumnIndex = columns.length - 1; columns[lastColumnIndex]; lastColumnIndex--) {
      var column = columns[lastColumnIndex];
      var width = resultWidths && resultWidths[lastColumnIndex];
      var allowResizing = !hasResizableColumns || column.allowResizing !== false;
      if (!column.command && !column.fixed && width !== 'adaptiveHidden' && allowResizing) {
        break;
      }
    }
    return lastColumnIndex;
  },
  isElementInCurrentGrid(controller, $element) {
    if ($element && $element.length) {
      var $grid = $element.closest(".".concat(controller.getWidgetContainerClass())).parent();
      return $grid.is(controller.component.$element());
    }
    return false;
  },
  isVirtualRowRendering(that) {
    var rowRenderingMode = that.option(ROW_RENDERING_MODE_OPTION);
    var isVirtualMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_VIRTUAL;
    var isAppendMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_INFINITE;
    if (that.option(LEGACY_SCROLLING_MODE) === false && (isVirtualMode || isAppendMode)) {
      return true;
    }
    return rowRenderingMode === SCROLLING_MODE_VIRTUAL;
  },
  getPixelRatio(window) {
    return window.devicePixelRatio || 1;
  },
  getContentHeightLimit(browser) {
    if (browser.mozilla) {
      return 8000000;
    }
    return 15000000 / this.getPixelRatio(getWindow());
  },
  normalizeLookupDataSource(lookup) {
    var lookupDataSourceOptions;
    if (lookup.items) {
      lookupDataSourceOptions = lookup.items;
    } else {
      lookupDataSourceOptions = lookup.dataSource;
      if (isFunction(lookupDataSourceOptions) && !variableWrapper.isWrapped(lookupDataSourceOptions)) {
        lookupDataSourceOptions = lookupDataSourceOptions({});
      }
    }
    return normalizeDataSourceOptions(lookupDataSourceOptions);
  },
  getWrappedLookupDataSource(column, dataSource, filter) {
    if (!dataSource) {
      return [];
    }
    var lookupDataSourceOptions = this.normalizeLookupDataSource(column.lookup);
    if (column.calculateCellValue !== column.defaultCalculateCellValue) {
      return lookupDataSourceOptions;
    }
    var hasGroupPaging = dataSource.remoteOperations().groupPaging;
    var hasLookupOptimization = column.displayField && isString(column.displayField);
    var cachedUniqueRelevantItems;
    var previousTake;
    var previousSkip;
    var sliceItems = (items, loadOptions) => {
      var _a;
      var start = (_a = loadOptions.skip) !== null && _a !== void 0 ? _a : 0;
      var end = loadOptions.take ? start + loadOptions.take : items.length;
      return items.slice(start, end);
    };
    var loadUniqueRelevantItems = loadOptions => {
      var group = normalizeGroupingLoadOptions(hasLookupOptimization ? [column.dataField, column.displayField] : column.dataField);
      // @ts-expect-error
      var d = new Deferred();
      var canUseCache = cachedUniqueRelevantItems && (!hasGroupPaging || loadOptions.skip === previousSkip && loadOptions.take === previousTake);
      if (canUseCache) {
        d.resolve(sliceItems(cachedUniqueRelevantItems, loadOptions));
      } else {
        previousSkip = loadOptions.skip;
        previousTake = loadOptions.take;
        dataSource.load({
          filter,
          group,
          take: hasGroupPaging ? loadOptions.take : undefined,
          skip: hasGroupPaging ? loadOptions.skip : undefined
        }).done(items => {
          cachedUniqueRelevantItems = items;
          d.resolve(hasGroupPaging ? items : sliceItems(items, loadOptions));
        }).fail(d.fail);
      }
      return d;
    };
    var lookupDataSource = _extends(_extends({}, lookupDataSourceOptions), {
      __dataGridSourceFilter: filter,
      load: loadOptions => {
        // @ts-expect-error
        var d = new Deferred();
        loadUniqueRelevantItems(loadOptions).done(items => {
          if (items.length === 0) {
            d.resolve([]);
            return;
          }
          var filter = this.combineFilters(items.flatMap(data => data.key).map(key => [column.lookup.valueExpr, key]), 'or');
          var newDataSource = new DataSource(_extends(_extends(_extends({}, lookupDataSourceOptions), loadOptions), {
            filter: this.combineFilters([filter, loadOptions.filter], 'and'),
            paginate: false
          }));
          newDataSource
          // @ts-expect-error
          .load().done(d.resolve).fail(d.fail);
        }).fail(d.fail);
        return d;
      },
      key: column.lookup.valueExpr,
      byKey(key) {
        var d = Deferred();
        this.load({
          filter: [column.lookup.valueExpr, '=', key]
        }).done(arr => {
          d.resolve(arr[0]);
        });
        return d.promise();
      }
    });
    return lookupDataSource;
  },
  logHeaderFilterDeprecatedWarningIfNeed(component) {
    var since = '23.1';
    var logWarning = component._logDeprecatedOptionWarning.bind(component);
    if (isDefined(component.option('headerFilter.allowSearch'))) {
      logWarning('headerFilter.allowSearch', {
        since,
        alias: 'headerFilter.search.enabled'
      });
    }
    if (isDefined(component.option('headerFilter.searchTimeout'))) {
      logWarning('headerFilter.searchTimeout', {
        since,
        alias: 'headerFilter.search.timeout'
      });
    }
    var specificName = component.NAME === 'dxPivotGrid' ? 'dataSource.fields' : 'columns';
    var columns = component.option(specificName);
    if (!Array.isArray(columns)) {
      return;
    }
    var logSpecificDeprecatedWarningIfNeed = columns => {
      columns.forEach(column => {
        var _a;
        var headerFilter = column.headerFilter || {};
        if (isDefined(headerFilter.allowSearch)) {
          logWarning("".concat(specificName, "[].headerFilter.allowSearch"), {
            since,
            alias: "".concat(specificName, "[].headerFilter.search.enabled")
          });
        }
        if (isDefined(headerFilter.searchMode)) {
          logWarning("".concat(specificName, "[].headerFilter.searchMode"), {
            since,
            alias: "".concat(specificName, "[].headerFilter.search.mode")
          });
        }
        if ((_a = column.columns) === null || _a === void 0 ? void 0 : _a.length) {
          logSpecificDeprecatedWarningIfNeed(column.columns);
        }
      });
    };
    logSpecificDeprecatedWarningIfNeed(columns);
  }
};
