import $ from '../../../../core/renderer';
import { isDefined } from '../../../../core/utils/type';
import messageLocalization from '../../../../localization/message';
var SORT_CLASS = 'dx-sort';
var SORT_NONE_CLASS = 'dx-sort-none';
var SORTUP_CLASS = 'dx-sort-up';
var SORTDOWN_CLASS = 'dx-sort-down';
var SORT_INDEX_CLASS = 'dx-sort-index';
var SORT_INDEX_ICON_CLASS = 'dx-sort-index-icon';
var HEADERS_ACTION_CLASS = 'action';
export default {
  _applyColumnState(options) {
    var that = this;
    var ariaSortState;
    var $sortIndicator;
    var sortingMode = that.option('sorting.mode');
    var {
      rootElement
    } = options;
    var {
      column
    } = options;
    var $indicatorsContainer = that._getIndicatorContainer(rootElement);
    if (options.name === 'sort') {
      rootElement.find(".".concat(SORT_CLASS)).remove();
      !$indicatorsContainer.children().length && $indicatorsContainer.remove();
      var isSortingAllowed = sortingMode !== 'none' && column.allowSorting;
      var hasSeveralSortIndexes = that.getController && !!that.getController('columns').columnOption('sortIndex:1');
      if (!isDefined(column.groupIndex) && (isSortingAllowed || isDefined(column.sortOrder))) {
        ariaSortState = column.sortOrder === 'asc' ? 'ascending' : 'descending';
        $sortIndicator = that.callBase(options).toggleClass(SORTUP_CLASS, column.sortOrder === 'asc').toggleClass(SORTDOWN_CLASS, column.sortOrder === 'desc');
        if (hasSeveralSortIndexes && that.option('sorting.showSortIndexes') && column.sortIndex >= 0) {
          $('<span>').addClass(SORT_INDEX_ICON_CLASS).text(column.sortIndex + 1).appendTo($sortIndicator);
          $sortIndicator.addClass(SORT_INDEX_CLASS);
        }
        if (isSortingAllowed) {
          options.rootElement.addClass(that.addWidgetPrefix(HEADERS_ACTION_CLASS));
        }
      }
      this._setAriaSortAttribute(column, ariaSortState, rootElement, hasSeveralSortIndexes);
      return $sortIndicator;
    }
    return that.callBase(options);
  },
  _setAriaSortAttribute(column, ariaSortState, $rootElement, hasSeveralSortIndexes) {
    $rootElement.removeAttr('aria-roledescription');
    if (column.isGrouped) {
      var description = this.localize('dxDataGrid-ariaNotSortedColumn');
      if (isDefined(column.sortOrder)) {
        description = column.sortOrder === 'asc' ? this.localize('dxDataGrid-ariaSortedAscendingColumn') : this.localize('dxDataGrid-ariaSortedDescendingColumn');
      }
      this.setAria('roledescription', description, $rootElement);
    } else if (!isDefined(column.sortOrder)) {
      this.setAria('sort', 'none', $rootElement);
    } else {
      this.setAria('sort', ariaSortState, $rootElement);
      if (hasSeveralSortIndexes && column.sortIndex >= 0) {
        var ariaColumnHeader = messageLocalization.format('dxDataGrid-ariaColumnHeader');
        var ariaSortIndex = messageLocalization.format('dxDataGrid-ariaSortIndex',
        // @ts-expect-error
        column.sortIndex + 1);
        var _description = "".concat(ariaColumnHeader, ", ").concat(ariaSortIndex);
        this.setAria('roledescription', _description, $rootElement);
      }
    }
  },
  _getIndicatorClassName(name) {
    if (name === 'sort') {
      return SORT_CLASS;
    }
    if (name === 'sortIndex') {
      return SORT_INDEX_ICON_CLASS;
    }
    return this.callBase(name);
  },
  _renderIndicator(options) {
    var {
      column
    } = options;
    var $container = options.container;
    var $indicator = options.indicator;
    if (options.name === 'sort') {
      var rtlEnabled = this.option('rtlEnabled');
      if (!isDefined(column.sortOrder)) {
        $indicator && $indicator.addClass(SORT_NONE_CLASS);
      }
      if ($container.children().length && (!rtlEnabled && options.columnAlignment === 'left' || rtlEnabled && options.columnAlignment === 'right')) {
        $container.prepend($indicator);
        return;
      }
    }
    this.callBase(options);
  },
  _updateIndicator($cell, column, indicatorName) {
    if (indicatorName === 'sort' && isDefined(column.groupIndex)) {
      return;
    }
    return this.callBase.apply(this, arguments);
  },
  _getIndicatorElements($cell, returnAll) {
    var $indicatorElements = this.callBase($cell);
    return returnAll ? $indicatorElements : $indicatorElements && $indicatorElements.not(".".concat(SORT_NONE_CLASS));
  }
};