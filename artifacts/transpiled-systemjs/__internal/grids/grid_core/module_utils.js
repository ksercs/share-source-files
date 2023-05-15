!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/module_utils.js"], ["../../../core/utils/size","../../../core/renderer","../../../core/utils/type","../../../core/utils/deferred","../../../core/utils/string","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/position","../../../core/utils/data","../../../core/utils/common","../../../data/utils","../../../format_helper","../../../core/utils/window","../../../events/core/events_engine","../../../data/data_source/data_source","../../../data/data_source/utils","../../../core/utils/variable_wrapper","../../../ui/load_panel","../../../ui/shared/filtering"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/module_utils.js", ["../../../core/utils/size", "../../../core/renderer", "../../../core/utils/type", "../../../core/utils/deferred", "../../../core/utils/string", "../../../core/utils/iterator", "../../../core/utils/extend", "../../../core/utils/position", "../../../core/utils/data", "../../../core/utils/common", "../../../data/utils", "../../../format_helper", "../../../core/utils/window", "../../../events/core/events_engine", "../../../data/data_source/data_source", "../../../data/data_source/utils", "../../../core/utils/variable_wrapper", "../../../ui/load_panel", "../../../ui/shared/filtering"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _type = $__require("../../../core/utils/type");
  var _deferred = $__require("../../../core/utils/deferred");
  var _string = $__require("../../../core/utils/string");
  var _iterator = $__require("../../../core/utils/iterator");
  var _extend = $__require("../../../core/utils/extend");
  var _position = $__require("../../../core/utils/position");
  var _data = $__require("../../../core/utils/data");
  var _common = $__require("../../../core/utils/common");
  var _utils = $__require("../../../data/utils");
  var _format_helper = _interopRequireDefault($__require("../../../format_helper"));
  var _window = $__require("../../../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _data_source = $__require("../../../data/data_source/data_source");
  var _utils2 = $__require("../../../data/data_source/utils");
  var _variable_wrapper = _interopRequireDefault($__require("../../../core/utils/variable_wrapper"));
  var _load_panel = _interopRequireDefault($__require("../../../ui/load_panel"));
  var _filtering = _interopRequireDefault($__require("../../../ui/shared/filtering"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
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
    year: function year(value) {
      return value && value.getFullYear();
    },
    month: function month(value) {
      return value && value.getMonth() + 1;
    },
    day: function day(value) {
      return value && value.getDate();
    },
    quarter: function quarter(value) {
      return value && Math.floor(value.getMonth() / 3) + 1;
    },
    hour: function hour(value) {
      return value && value.getHours();
    },
    minute: function minute(value) {
      return value && value.getMinutes();
    },
    second: function second(value) {
      return value && value.getSeconds();
    }
  };
  var getIntervalSelector = function getIntervalSelector() {
    var data = arguments[1];
    var value = this.calculateCellValue(data);
    if (!(0, _type.isDefined)(value)) {
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
    if ((0, _type.isFunction)(selector1) && (0, _type.isFunction)(selector2)) {
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
    $container.get(0).textContent = "\xA0";
  };
  var normalizeSortingInfo = function normalizeSortingInfo(sort) {
    sort = sort || [];
    var result = (0, _utils.normalizeSortingInfo)(sort);
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
    var valueText = _format_helper.default.format(value, options.format) || value && value.toString() || '';
    var formatObject = {
      value: value,
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
      getDisplayFormat: function getDisplayFormat(valueText) {
        return displayFormat ? (0, _string.format)(displayFormat, valueText, summaryItem.columnCaption) : valueText;
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
    if ((0, _type.isFunction)(filter1) && filter1.columnIndex >= 0 && (0, _type.isFunction)(filter2) && filter2.columnIndex >= 0) {
      return filter1.columnIndex === filter2.columnIndex && (0, _data.toComparable)(filter1.filterValue) === (0, _data.toComparable)(filter2.filterValue) && (0, _data.toComparable)(filter1.selectedFilterOperation) === (0, _data.toComparable)(filter2.selectedFilterOperation);
    }
    return (0, _data.toComparable)(filter1) == (0, _data.toComparable)(filter2); // eslint-disable-line eqeqeq
  };

  function normalizeGroupingLoadOptions(group) {
    if (!Array.isArray(group)) {
      group = [group];
    }
    return group.map(function (item, i) {
      if ((0, _type.isString)(item)) {
        return {
          selector: item,
          isExpanded: i < group.length - 1
        };
      }
      return item;
    });
  }
  var _default = {
    renderNoDataText: function renderNoDataText($element) {
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
        noDataElement = (0, _renderer.default)('<span>').addClass(noDataClass).appendTo($element);
      }
      if (isVisible && !isLoading) {
        noDataElement.removeClass('dx-hidden').text(that._getNoDataText());
      } else {
        noDataElement.addClass('dx-hidden');
      }
    },
    renderLoadPanel: function renderLoadPanel($element, $container, isLocalStore) {
      var that = this;
      var loadPanelOptions;
      that._loadPanel && that._loadPanel.$element().remove();
      loadPanelOptions = that.option('loadPanel');
      if (loadPanelOptions && (loadPanelOptions.enabled === 'auto' ? !isLocalStore : loadPanelOptions.enabled)) {
        loadPanelOptions = (0, _extend.extend)({
          shading: false,
          message: loadPanelOptions.text,
          container: $container
        }, loadPanelOptions);
        that._loadPanel = that._createComponent((0, _renderer.default)('<div>').appendTo($container), _load_panel.default, loadPanelOptions);
      } else {
        that._loadPanel = null;
      }
    },
    calculateLoadPanelPosition: function calculateLoadPanelPosition($element) {
      // @ts-expect-error
      var $window = (0, _renderer.default)((0, _window.getWindow)());
      if ((0, _size.getHeight)($element) > (0, _size.getHeight)($window)) {
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
    getIndexByKey: function getIndexByKey(key, items, keyName) {
      var index = -1;
      if (key !== undefined && Array.isArray(items)) {
        keyName = arguments.length <= 2 ? 'key' : keyName;
        for (var i = 0; i < items.length; i++) {
          var item = (0, _type.isDefined)(keyName) ? items[i][keyName] : items[i];
          if ((0, _common.equalByValue)(key, item)) {
            index = i;
            break;
          }
        }
      }
      return index;
    },
    combineFilters: function combineFilters(filters, operation) {
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
    checkChanges: function checkChanges(changes, changeNames) {
      var changesWithChangeNamesCount = 0;
      for (var i = 0; i < changeNames.length; i++) {
        if (changes[changeNames[i]]) {
          changesWithChangeNamesCount++;
        }
      }
      return changes.length && changes.length === changesWithChangeNamesCount;
    },
    equalFilterParameters: equalFilterParameters,
    proxyMethod: function proxyMethod(instance, methodName, defaultResult) {
      if (!instance[methodName]) {
        instance[methodName] = function () {
          var dataSource = this._dataSource;
          return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
        };
      }
    },
    formatValue: formatValue,
    getFormatOptionsByColumn: function getFormatOptionsByColumn(column, target) {
      return {
        format: column.format,
        getDisplayFormat: column.getDisplayFormat,
        customizeText: column.customizeText,
        target: target,
        trueText: column.trueText,
        falseText: column.falseText
      };
    },
    getDisplayValue: function getDisplayValue(column, value, data, rowType) {
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
    getGroupRowSummaryText: function getGroupRowSummaryText(summaryItems, summaryTexts) {
      var result = '(';
      for (var i = 0; i < summaryItems.length; i++) {
        var summaryItem = summaryItems[i];
        result += (i > 0 ? ', ' : '') + getSummaryText(summaryItem, summaryTexts);
      }
      // eslint-disable-next-line no-return-assign
      return result += ')';
    },
    getSummaryText: getSummaryText,
    normalizeSortingInfo: normalizeSortingInfo,
    getFormatByDataType: function getFormatByDataType(dataType) {
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
    getHeaderFilterGroupParameters: function getHeaderFilterGroupParameters(column, remoteGrouping) {
      var result = [];
      var dataField = column.dataField || column.name;
      var groupInterval = _filtering.default.getGroupInterval(column);
      if (groupInterval) {
        (0, _iterator.each)(groupInterval, function (index, interval) {
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
    equalSortParameters: function equalSortParameters(sortParameters1, sortParameters2, ignoreIsExpanded) {
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
    getPointsByColumns: function getPointsByColumns(items, pointCreated, isVertical, startColumnIndex) {
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
          x: offset ? offset.left + (!isVertical && rtlEnabled ^ i === cellsLength ? (0, _position.getBoundingRect)(item[0]).width : 0) : 0,
          y: offset ? offset.top + (isVertical && i === cellsLength ? (0, _position.getBoundingRect)(item[0]).height : 0) : 0,
          columnIndex: columnIndex
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
    getExpandCellTemplate: function getExpandCellTemplate() {
      return {
        allowRenderToDetachedContainer: true,
        render: function render(container, options) {
          var $container = (0, _renderer.default)(container);
          if ((0, _type.isDefined)(options.value) && !(options.data && options.data.isContinuation) && !options.row.isNewRow) {
            var rowsView = options.component.getView('rowsView');
            $container.addClass(DATAGRID_EXPAND_CLASS).addClass(DATAGRID_SELECTION_DISABLED_CLASS);
            (0, _renderer.default)('<div>').addClass(options.value ? DATAGRID_GROUP_OPENED_CLASS : DATAGRID_GROUP_CLOSED_CLASS).appendTo($container);
            rowsView.setAria('label', options.value ? rowsView.localize('dxDataGrid-ariaCollapse') : rowsView.localize('dxDataGrid-ariaExpand'), $container);
          } else {
            setEmptyText($container);
          }
        }
      };
    },
    setEmptyText: setEmptyText,
    isDateType: isDateType,
    getSelectionRange: function getSelectionRange(focusedElement) {
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
    setSelectionRange: function setSelectionRange(focusedElement, selectionRange) {
      try {
        if (focusedElement && focusedElement.setSelectionRange) {
          focusedElement.setSelectionRange(selectionRange.selectionStart, selectionRange.selectionEnd);
        }
      } catch (e) {/* empty */}
    },
    focusAndSelectElement: function focusAndSelectElement(component, $element) {
      var isFocused = $element.is(':focus');
      // @ts-expect-error
      _events_engine.default.trigger($element, 'focus');
      var isSelectTextOnEditingStart = component.option('editing.selectTextOnEditStart');
      var element = $element.get(0);
      if (!isFocused && isSelectTextOnEditingStart && $element.is('.dx-texteditor-input') && !$element.is('[readonly]')) {
        var editor = getWidgetInstance($element.closest('.dx-texteditor'));
        (0, _deferred.when)(editor && editor._loadItemDeferred).done(function () {
          element.select();
        });
      }
    },
    getWidgetInstance: getWidgetInstance,
    getLastResizableColumnIndex: function getLastResizableColumnIndex(columns, resultWidths) {
      var hasResizableColumns = columns.some(function (column) {
        return column && !column.command && !column.fixed && column.allowResizing !== false;
      });
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
    isElementInCurrentGrid: function isElementInCurrentGrid(controller, $element) {
      if ($element && $element.length) {
        var $grid = $element.closest(".".concat(controller.getWidgetContainerClass())).parent();
        return $grid.is(controller.component.$element());
      }
      return false;
    },
    isVirtualRowRendering: function isVirtualRowRendering(that) {
      var rowRenderingMode = that.option(ROW_RENDERING_MODE_OPTION);
      var isVirtualMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_VIRTUAL;
      var isAppendMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_INFINITE;
      if (that.option(LEGACY_SCROLLING_MODE) === false && (isVirtualMode || isAppendMode)) {
        return true;
      }
      return rowRenderingMode === SCROLLING_MODE_VIRTUAL;
    },
    getPixelRatio: function getPixelRatio(window) {
      return window.devicePixelRatio || 1;
    },
    /// #DEBUG
    _setPixelRatioFn: function _setPixelRatioFn(value) {
      this.getPixelRatio = value;
    },
    /// #ENDDEBUG
    getContentHeightLimit: function getContentHeightLimit(browser) {
      if (browser.mozilla) {
        return 8000000;
      }
      return 15000000 / this.getPixelRatio((0, _window.getWindow)());
    },
    normalizeLookupDataSource: function normalizeLookupDataSource(lookup) {
      var lookupDataSourceOptions;
      if (lookup.items) {
        lookupDataSourceOptions = lookup.items;
      } else {
        lookupDataSourceOptions = lookup.dataSource;
        if ((0, _type.isFunction)(lookupDataSourceOptions) && !_variable_wrapper.default.isWrapped(lookupDataSourceOptions)) {
          lookupDataSourceOptions = lookupDataSourceOptions({});
        }
      }
      return (0, _utils2.normalizeDataSourceOptions)(lookupDataSourceOptions);
    },
    getWrappedLookupDataSource: function getWrappedLookupDataSource(column, dataSource, filter) {
      var _this = this;
      if (!dataSource) {
        return [];
      }
      var lookupDataSourceOptions = this.normalizeLookupDataSource(column.lookup);
      if (column.calculateCellValue !== column.defaultCalculateCellValue) {
        return lookupDataSourceOptions;
      }
      var hasGroupPaging = dataSource.remoteOperations().groupPaging;
      var hasLookupOptimization = column.displayField && (0, _type.isString)(column.displayField);
      var cachedUniqueRelevantItems;
      var previousTake;
      var previousSkip;
      var sliceItems = function sliceItems(items, loadOptions) {
        var _a;
        var start = (_a = loadOptions.skip) !== null && _a !== void 0 ? _a : 0;
        var end = loadOptions.take ? start + loadOptions.take : items.length;
        return items.slice(start, end);
      };
      var loadUniqueRelevantItems = function loadUniqueRelevantItems(loadOptions) {
        var group = normalizeGroupingLoadOptions(hasLookupOptimization ? [column.dataField, column.displayField] : column.dataField);
        // @ts-expect-error
        var d = new _deferred.Deferred();
        var canUseCache = cachedUniqueRelevantItems && (!hasGroupPaging || loadOptions.skip === previousSkip && loadOptions.take === previousTake);
        if (canUseCache) {
          d.resolve(sliceItems(cachedUniqueRelevantItems, loadOptions));
        } else {
          previousSkip = loadOptions.skip;
          previousTake = loadOptions.take;
          dataSource.load({
            filter: filter,
            group: group,
            take: hasGroupPaging ? loadOptions.take : undefined,
            skip: hasGroupPaging ? loadOptions.skip : undefined
          }).done(function (items) {
            cachedUniqueRelevantItems = items;
            d.resolve(hasGroupPaging ? items : sliceItems(items, loadOptions));
          }).fail(d.fail);
        }
        return d;
      };
      var lookupDataSource = _extends(_extends({}, lookupDataSourceOptions), {
        __dataGridSourceFilter: filter,
        load: function load(loadOptions) {
          // @ts-expect-error
          var d = new _deferred.Deferred();
          loadUniqueRelevantItems(loadOptions).done(function (items) {
            if (items.length === 0) {
              d.resolve([]);
              return;
            }
            var filter = _this.combineFilters(items.flatMap(function (data) {
              return data.key;
            }).map(function (key) {
              return [column.lookup.valueExpr, key];
            }), 'or');
            var newDataSource = new _data_source.DataSource(_extends(_extends(_extends({}, lookupDataSourceOptions), loadOptions), {
              filter: _this.combineFilters([filter, loadOptions.filter], 'and'),
              paginate: false
            }));
            newDataSource
            // @ts-expect-error
            .load().done(d.resolve).fail(d.fail);
          }).fail(d.fail);
          return d;
        },
        key: column.lookup.valueExpr,
        byKey: function byKey(key) {
          var d = (0, _deferred.Deferred)();
          this.load({
            filter: [column.lookup.valueExpr, '=', key]
          }).done(function (arr) {
            d.resolve(arr[0]);
          });
          return d.promise();
        }
      });
      return lookupDataSource;
    },
    logHeaderFilterDeprecatedWarningIfNeed: function logHeaderFilterDeprecatedWarningIfNeed(component) {
      var since = '23.1';
      var logWarning = component._logDeprecatedOptionWarning.bind(component);
      if ((0, _type.isDefined)(component.option('headerFilter.allowSearch'))) {
        logWarning('headerFilter.allowSearch', {
          since: since,
          alias: 'headerFilter.search.enabled'
        });
      }
      if ((0, _type.isDefined)(component.option('headerFilter.searchTimeout'))) {
        logWarning('headerFilter.searchTimeout', {
          since: since,
          alias: 'headerFilter.search.timeout'
        });
      }
      var specificName = component.NAME === 'dxPivotGrid' ? 'dataSource.fields' : 'columns';
      var columns = component.option(specificName);
      if (!Array.isArray(columns)) {
        return;
      }
      var logSpecificDeprecatedWarningIfNeed = function logSpecificDeprecatedWarningIfNeed(columns) {
        columns.forEach(function (column) {
          var _a;
          var headerFilter = column.headerFilter || {};
          if ((0, _type.isDefined)(headerFilter.allowSearch)) {
            logWarning("".concat(specificName, "[].headerFilter.allowSearch"), {
              since: since,
              alias: "".concat(specificName, "[].headerFilter.search.enabled")
            });
          }
          if ((0, _type.isDefined)(headerFilter.searchMode)) {
            logWarning("".concat(specificName, "[].headerFilter.searchMode"), {
              since: since,
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
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../../../core/utils/type","../../../core/utils/deferred","../../../core/utils/string","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/position","../../../core/utils/data","../../../core/utils/common","../../../data/utils","../../../format_helper","../../../core/utils/window","../../../events/core/events_engine","../../../data/data_source/data_source","../../../data/data_source/utils","../../../core/utils/variable_wrapper","../../../ui/load_panel","../../../ui/shared/filtering"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../../../core/utils/type"), require("../../../core/utils/deferred"), require("../../../core/utils/string"), require("../../../core/utils/iterator"), require("../../../core/utils/extend"), require("../../../core/utils/position"), require("../../../core/utils/data"), require("../../../core/utils/common"), require("../../../data/utils"), require("../../../format_helper"), require("../../../core/utils/window"), require("../../../events/core/events_engine"), require("../../../data/data_source/data_source"), require("../../../data/data_source/utils"), require("../../../core/utils/variable_wrapper"), require("../../../ui/load_panel"), require("../../../ui/shared/filtering"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_utils.js.map