/**
* DevExtreme (esm/__internal/grids/pivot_grid/local_store/m_local_store.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Class from '../../../../core/class';
import { noop } from '../../../../core/utils/common';
// @ts-expect-error
import { compileGetter, toComparable } from '../../../../core/utils/data';
import dateSerialization from '../../../../core/utils/date_serialization';
import { Deferred, when } from '../../../../core/utils/deferred';
import { each } from '../../../../core/utils/iterator';
import { isDefined, isNumeric, isString } from '../../../../core/utils/type';
import ArrayStore from '../../../../data/array_store';
import CustomStore from '../../../../data/custom_store';
import { DataSource } from '../../../../data/data_source/data_source';
import dataQuery from '../../../../data/query';
// eslint-disable-next-line import/extensions
// @ts-expect-error
import { aggregators } from '../../../../data/utils';
import { discoverObjectFields, getFiltersByPath, setDefaultFieldValueFormatting, setFieldProperty, storeDrillDownMixin } from '../m_widget_utils';
var PATH_DELIMETER = '/./';
var LocalStore = Class.inherit(function () {
  var DATE_INTERVAL_SELECTORS = {
    year(date) {
      return date && date.getFullYear();
    },
    quarter(date) {
      return date && Math.floor(date.getMonth() / 3) + 1;
    },
    month(date) {
      return date && date.getMonth() + 1;
    },
    day(date) {
      return date && date.getDate();
    },
    dayOfWeek(date) {
      return date && date.getDay();
    }
  };
  function getDataSelector(dataField) {
    return dataField.indexOf('.') !== -1 ? compileGetter(dataField) : function (data) {
      return data[dataField];
    };
  }
  function getDateValue(dataSelector) {
    return function (data) {
      var value = dataSelector(data);
      if (value && !(value instanceof Date)) {
        value = dateSerialization.deserializeDate(value);
      }
      return value;
    };
  }
  function prepareFields(fields) {
    each(fields || [], (_, field) => {
      var fieldSelector;
      var intervalSelector;
      var {
        dataField
      } = field;
      var groupInterval;
      var {
        levels
      } = field;
      var dataSelector;
      if (!field.selector) {
        if (!dataField) {
          dataSelector = function dataSelector(data) {
            return data;
          };
        } else {
          dataSelector = getDataSelector(dataField);
        }
        if (levels) {
          prepareFields(levels);
        }
        if (field.dataType === 'date') {
          intervalSelector = DATE_INTERVAL_SELECTORS[field.groupInterval];
          var valueSelector = getDateValue(dataSelector);
          fieldSelector = function fieldSelector(data) {
            var value = valueSelector(data);
            return intervalSelector ? intervalSelector(value) : value;
          };
        } else if (field.dataType === 'number') {
          groupInterval = isNumeric(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
          fieldSelector = function fieldSelector(data) {
            var value = dataSelector(data);
            if (isString(value)) {
              value = Number(value);
            }
            return groupInterval ? Math.floor(value / groupInterval) * groupInterval : value;
          };
        } else {
          fieldSelector = dataSelector;
        }
        setDefaultFieldValueFormatting(field);
        setFieldProperty(field, 'selector', fieldSelector);
      }
    });
  }
  var addHierarchyItem = function addHierarchyItem(value, hierarchyItems, pathHash, childrenHash) {
    var hierarchyItem = childrenHash[pathHash];
    if (!hierarchyItem) {
      hierarchyItem = {
        value,
        // eslint-disable-next-line no-plusplus
        index: childrenHash.length++
      };
      childrenHash[pathHash] = hierarchyItem;
      hierarchyItems.push(hierarchyItem);
    }
    return hierarchyItem;
  };
  function fillHierarchyItemIndexesCore(indexes, options, children, expandIndex, pathHash) {
    var dimension = options.dimensions[expandIndex];
    var {
      expandedPathsHash
    } = options;
    var dimensionValue;
    var hierarchyItem;
    if (dimension) {
      dimensionValue = dimension.selector(options.data);
      pathHash = pathHash !== undefined ? pathHash + PATH_DELIMETER + dimensionValue : "".concat(dimensionValue);
      hierarchyItem = addHierarchyItem(dimensionValue, children, pathHash, options.childrenHash);
      indexes.push(hierarchyItem.index);
      if (expandedPathsHash && expandedPathsHash[pathHash] || dimension.expanded) {
        if (!hierarchyItem.children) {
          hierarchyItem.children = [];
        }
        fillHierarchyItemIndexesCore(indexes, options, hierarchyItem.children, expandIndex + 1, pathHash);
      }
    }
  }
  function generateHierarchyItems(data, loadOptions, headers, headerName) {
    var result = [0];
    var expandIndex = loadOptions.headerName === headerName ? loadOptions.path.length : 0;
    var expandedPaths = headerName === 'rows' ? loadOptions.rowExpandedPaths : loadOptions.columnExpandedPaths;
    var options = {
      data,
      childrenHash: headers["".concat(headerName, "Hash")],
      dimensions: loadOptions[headerName],
      expandedPathsHash: loadOptions.headerName !== headerName && expandedPaths && expandedPaths.hash
    };
    fillHierarchyItemIndexesCore(result, options, headers[headerName], expandIndex);
    return result;
  }
  function generateAggregationCells(data, cells, headers, options) {
    var cellSet = [];
    var x;
    var y;
    var rowIndex;
    var columnIndex;
    var rowIndexes = generateHierarchyItems(data, options, headers, 'rows');
    var columnIndexes = generateHierarchyItems(data, options, headers, 'columns');
    for (y = 0; y < rowIndexes.length; y += 1) {
      rowIndex = rowIndexes[y];
      cells[rowIndex] = cells[rowIndex] || [];
      for (x = 0; x < columnIndexes.length; x += 1) {
        columnIndex = columnIndexes[x];
        cellSet.push(cells[rowIndex][columnIndex] = cells[rowIndex][columnIndex] || []);
      }
    }
    return cellSet;
  }
  function fillHashExpandedPath(expandedPaths) {
    if (expandedPaths) {
      var hash = expandedPaths.hash = {};
      expandedPaths.forEach(path => {
        var pathValue = path.map(value => "".concat(value)).join(PATH_DELIMETER);
        hash[pathValue] = true;
      });
    }
  }
  function prepareLoadOption(options) {
    options.rows = options.rows || [];
    options.columns = options.columns || [];
    options.filters = options.filters || [];
    fillHashExpandedPath(options.columnExpandedPaths);
    fillHashExpandedPath(options.rowExpandedPaths);
    prepareFields(options.columns);
    prepareFields(options.rows);
    prepareFields(options.values);
    prepareFields(options.filters);
  }
  function getAggregator(field) {
    if (field.summaryType === 'custom') {
      field.calculateCustomSummary = field.calculateCustomSummary || noop;
      return {
        seed() {
          var options = {
            summaryProcess: 'start',
            totalValue: undefined
          };
          field.calculateCustomSummary(options);
          return options;
        },
        step(options, value) {
          options.summaryProcess = 'calculate';
          options.value = value;
          field.calculateCustomSummary(options);
          return options;
        },
        finalize(options) {
          options.summaryProcess = 'finalize';
          delete options.value;
          field.calculateCustomSummary(options);
          return options.totalValue;
        }
      };
    }
    return aggregators[field.summaryType] || aggregators.count;
  }
  function aggregationStep(measures, aggregationCells, data) {
    for (var aggregatorIndex = 0; aggregatorIndex < measures.length; aggregatorIndex += 1) {
      var cellField = measures[aggregatorIndex];
      var cellValue = cellField.selector(data);
      var aggregator = getAggregator(cellField);
      var isAggregatorSeedFunction = typeof aggregator.seed === 'function';
      for (var cellSetIndex = 0; cellSetIndex < aggregationCells.length; cellSetIndex += 1) {
        var cell = aggregationCells[cellSetIndex];
        if (cell.length <= aggregatorIndex) {
          cell[aggregatorIndex] = isAggregatorSeedFunction ? aggregator.seed() : aggregator.seed;
        }
        if (cell[aggregatorIndex] === undefined) {
          cell[aggregatorIndex] = cellValue;
        } else if (isDefined(cellValue)) {
          cell[aggregatorIndex] = aggregator.step(cell[aggregatorIndex], cellValue);
        }
      }
    }
  }
  function aggregationFinalize(measures, cells) {
    each(measures, (aggregatorIndex, cellField) => {
      var aggregator = getAggregator(cellField);
      if (aggregator.finalize) {
        each(cells, (_, row) => {
          each(row, (_, cell) => {
            if (cell && cell[aggregatorIndex] !== undefined) {
              cell[aggregatorIndex] = aggregator.finalize(cell[aggregatorIndex]);
            }
          });
        });
      }
    });
  }
  function areValuesEqual(filterValue, fieldValue) {
    var valueOfFilter = filterValue && filterValue.valueOf();
    var valueOfField = fieldValue && fieldValue.valueOf();
    if (Array.isArray(filterValue)) {
      fieldValue = fieldValue || [];
      for (var i = 0; i < filterValue.length; i += 1) {
        valueOfFilter = filterValue[i] && filterValue[i].valueOf();
        valueOfField = fieldValue[i] && fieldValue[i].valueOf();
        if (valueOfFilter !== valueOfField) {
          return false;
        }
      }
      return true;
    }
    return valueOfFilter === valueOfField;
  }
  function getGroupValue(levels, data) {
    var value = [];
    each(levels, (_, field) => {
      value.push(field.selector(data));
    });
    return value;
  }
  function createDimensionFilters(dimension) {
    var filters = [];
    each(dimension, (_, field) => {
      var filterValues = field.filterValues || [];
      var {
        groupName
      } = field;
      if (groupName && isNumeric(field.groupIndex)) {
        return;
      }
      var filter = function filter(dataItem) {
        var value = field.levels ? getGroupValue(field.levels, dataItem) : field.selector(dataItem);
        var result = false;
        for (var i = 0; i < filterValues.length; i += 1) {
          if (areValuesEqual(filterValues[i], value)) {
            result = true;
            break;
          }
        }
        return field.filterType === 'exclude' ? !result : result;
      };
      filterValues.length && filters.push(filter);
    });
    return filters;
  }
  function createFilter(options) {
    var filters = createDimensionFilters(options.rows).concat(createDimensionFilters(options.columns)).concat(createDimensionFilters(options.filters));
    var expandedDimensions = options[options.headerName];
    var {
      path
    } = options;
    if (expandedDimensions) {
      filters.push(dataItem => {
        var expandValue;
        for (var i = 0; i < path.length; i += 1) {
          expandValue = expandedDimensions[i].selector(dataItem);
          if (toComparable(expandValue, true) !== toComparable(path[i], true)) {
            return false;
          }
        }
        return true;
      });
    }
    return function (dataItem) {
      for (var i = 0; i < filters.length; i += 1) {
        if (!filters[i](dataItem)) {
          return false;
        }
      }
      return true;
    };
  }
  function loadCore(items, options, notifyProgress) {
    var headers = {
      columns: [],
      rows: [],
      columnsHash: {
        length: 1
      },
      rowsHash: {
        length: 1
      }
    };
    var values = [];
    var aggregationCells;
    var data;
    // @ts-expect-error
    var d = new Deferred();
    var i = 0;
    var filter = createFilter(options);
    function processData() {
      var t = new Date();
      var startIndex = i;
      for (; i < items.length; i += 1) {
        if (i > startIndex && i % 10000 === 0) {
          if (new Date() - t >= 300) {
            notifyProgress(i / items.length);
            setTimeout(processData, 0);
            return;
          }
        }
        data = items[i];
        if (filter(data)) {
          aggregationCells = generateAggregationCells(data, values, headers, options);
          aggregationStep(options.values, aggregationCells, data);
        }
      }
      aggregationFinalize(options.values, values);
      notifyProgress(1);
      d.resolve({
        rows: headers.rows,
        columns: headers.columns,
        values,
        grandTotalRowIndex: 0,
        grandTotalColumnIndex: 0
      });
    }
    processData();
    return d;
  }
  function filterDataSource(dataSource, fieldSelectors) {
    var filter = dataSource.filter();
    if (dataSource.store() instanceof CustomStore && filter) {
      filter = processFilter(filter, fieldSelectors);
      return dataQuery(dataSource.items()).filter(filter).toArray();
    }
    return dataSource.items();
  }
  function loadDataSource(dataSource, fieldSelectors, reload) {
    // @ts-expect-error
    var d = new Deferred();
    var customizeStoreLoadOptionsHandler = function customizeStoreLoadOptionsHandler(options) {
      if (dataSource.store() instanceof ArrayStore) {
        options.storeLoadOptions.filter = processFilter(options.storeLoadOptions.filter, fieldSelectors);
      }
    };
    dataSource.on('customizeStoreLoadOptions', customizeStoreLoadOptionsHandler);
    if (!dataSource.isLoaded() || reload) {
      var loadDeferred = reload ? dataSource.load() : dataSource.reload();
      when(loadDeferred).done(() => {
        loadDataSource(dataSource, fieldSelectors).done(() => {
          d.resolve(filterDataSource(dataSource, fieldSelectors));
        }).fail(d.reject);
      }).fail(d.reject);
    } else {
      d.resolve(filterDataSource(dataSource, fieldSelectors));
    }
    return d.always(() => {
      dataSource.off('customizeStoreLoadOptions', customizeStoreLoadOptionsHandler);
    });
  }
  function fillSelectorsByFields(selectors, fields) {
    fields.forEach(field => {
      if (field.dataField && field.dataType === 'date') {
        var valueSelector = getDateValue(getDataSelector(field.dataField));
        selectors[field.dataField] = function (data) {
          return valueSelector(data);
        };
      }
    });
  }
  function getFieldSelectors(options) {
    var selectors = {};
    if (Array.isArray(options)) {
      fillSelectorsByFields(selectors, options);
    } else if (options) {
      ['rows', 'columns', 'filters'].forEach(area => {
        options[area] && fillSelectorsByFields(selectors, options[area]);
      });
    }
    return selectors;
  }
  function processFilter(filter, fieldSelectors) {
    if (!Array.isArray(filter)) {
      return filter;
    }
    filter = filter.slice(0);
    if (isString(filter[0]) && (filter[1] instanceof Date || filter[2] instanceof Date)) {
      filter[0] = fieldSelectors[filter[0]];
    }
    for (var i = 0; i < filter.length; i += 1) {
      filter[i] = processFilter(filter[i], fieldSelectors);
    }
    return filter;
  }
  return {
    ctor(options) {
      this._progressChanged = options.onProgressChanged || noop;
      this._dataSource = new DataSource(options);
      this._dataSource.paginate(false);
    },
    getFields(fields) {
      var that = this;
      var dataSource = that._dataSource;
      // @ts-expect-error
      var d = new Deferred();
      loadDataSource(dataSource, getFieldSelectors(fields)).done(data => {
        d.resolve(discoverObjectFields(data, fields));
      }).fail(d.reject);
      return d;
    },
    key() {
      return this._dataSource.key();
    },
    load(options) {
      var that = this;
      var dataSource = that._dataSource;
      // @ts-expect-error
      var d = new Deferred();
      prepareLoadOption(options);
      loadDataSource(dataSource, getFieldSelectors(options), options.reload).done(data => {
        when(loadCore(data, options, that._progressChanged)).done(d.resolve);
      }).fail(d.reject);
      return d;
    },
    filter() {
      var dataSource = this._dataSource;
      return dataSource.filter.apply(dataSource, arguments);
    },
    supportPaging() {
      return false;
    },
    getDrillDownItems(loadOptions, params) {
      loadOptions = loadOptions || {};
      params = params || {};
      prepareLoadOption(loadOptions);
      var drillDownItems = [];
      var items = this._dataSource.items();
      var item;
      var {
        maxRowCount
      } = params;
      var {
        customColumns
      } = params;
      var filter = createFilter(loadOptions);
      var pathFilter = createFilter({
        rows: getFiltersByPath(loadOptions.rows, params.rowPath),
        columns: getFiltersByPath(loadOptions.columns, params.columnPath),
        filters: []
      });
      for (var i = 0; i < items.length; i += 1) {
        if (pathFilter(items[i]) && filter(items[i])) {
          if (customColumns) {
            item = {};
            for (var j = 0; j < customColumns.length; j += 1) {
              item[customColumns[j]] = items[i][customColumns[j]];
            }
          } else {
            item = items[i];
          }
          drillDownItems.push(item);
        }
        if (maxRowCount > 0 && drillDownItems.length === maxRowCount) {
          break;
        }
      }
      return drillDownItems;
    }
  };
}()).include(storeDrillDownMixin);
export default {
  LocalStore
};
export { LocalStore };
