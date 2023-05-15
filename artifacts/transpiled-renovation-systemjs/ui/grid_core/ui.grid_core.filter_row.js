!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_row.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/type","../../core/utils/extend","../../events/utils/index","../../core/utils/iterator","./ui.grid_core.modules","./ui.grid_core.utils","../../localization/message","../editor/editor","../overlay/ui.overlay","../menu","../shared/accessibility","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_row.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "../../core/utils/type", "../../core/utils/extend", "../../events/utils/index", "../../core/utils/iterator", "./ui.grid_core.modules", "./ui.grid_core.utils", "../../localization/message", "../editor/editor", "../overlay/ui.overlay", "../menu", "../shared/accessibility", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.filterRowModule = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _index = $__require("../../events/utils/index");
  var _iterator = $__require("../../core/utils/iterator");
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _ui = _interopRequireDefault($__require("../overlay/ui.overlay"));
  var _menu = _interopRequireDefault($__require("../menu"));
  var _accessibility = $__require("../shared/accessibility");
  var _common = $__require("../../core/utils/common");
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
  var OPERATION_ICONS = {
    '=': 'filter-operation-equals',
    '<>': 'filter-operation-not-equals',
    '<': 'filter-operation-less',
    '<=': 'filter-operation-less-equal',
    '>': 'filter-operation-greater',
    '>=': 'filter-operation-greater-equal',
    'default': 'filter-operation-default',
    'notcontains': 'filter-operation-not-contains',
    'contains': 'filter-operation-contains',
    'startswith': 'filter-operation-starts-with',
    'endswith': 'filter-operation-ends-with',
    'between': 'filter-operation-between'
  };
  var OPERATION_DESCRIPTORS = {
    '=': 'equal',
    '<>': 'notEqual',
    '<': 'lessThan',
    '<=': 'lessThanOrEqual',
    '>': 'greaterThan',
    '>=': 'greaterThanOrEqual',
    'startswith': 'startsWith',
    'contains': 'contains',
    'notcontains': 'notContains',
    'endswith': 'endsWith',
    'between': 'between'
  };
  var FILTERING_TIMEOUT = 700;
  var CORRECT_FILTER_RANGE_OVERLAY_WIDTH = 1;
  var FILTER_ROW_CLASS = 'filter-row';
  var FILTER_RANGE_OVERLAY_CLASS = 'filter-range-overlay';
  var FILTER_RANGE_START_CLASS = 'filter-range-start';
  var FILTER_RANGE_END_CLASS = 'filter-range-end';
  var MENU_CLASS = 'dx-menu';
  var EDITOR_WITH_MENU_CLASS = 'dx-editor-with-menu';
  var EDITOR_CONTAINER_CLASS = 'dx-editor-container';
  var EDITOR_CELL_CLASS = 'dx-editor-cell';
  var FILTER_MENU = 'dx-filter-menu';
  var APPLY_BUTTON_CLASS = 'dx-apply-button';
  var HIGHLIGHT_OUTLINE_CLASS = 'dx-highlight-outline';
  var FOCUSED_CLASS = 'dx-focused';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var FILTER_RANGE_CONTENT_CLASS = 'dx-filter-range-content';
  var FILTER_MODIFIED_CLASS = 'dx-filter-modified';
  var EDITORS_INPUT_SELECTOR = 'input:not([type=\'hidden\'])';
  var BETWEEN_OPERATION_DATA_TYPES = ['date', 'datetime', 'number'];
  var ARIA_SEARCH_BOX = _message.default.format('dxDataGrid-ariaSearchBox');
  function isOnClickApplyFilterMode(that) {
    return that.option('filterRow.applyFilter') === 'onClick';
  }
  var getEditorInstance = function getEditorInstance($editorContainer) {
    var $editor = $editorContainer && $editorContainer.children();
    var componentNames = $editor && $editor.data('dxComponents');
    var editor = componentNames && componentNames.length && $editor.data(componentNames[0]);
    if (editor instanceof _editor.default) {
      return editor;
    }
  };
  var ColumnHeadersViewFilterRowExtender = function () {
    var getRangeTextByFilterValue = function getRangeTextByFilterValue(that, column) {
      var result = '';
      var rangeEnd = '';
      var filterValue = getColumnFilterValue(that, column);
      var formatOptions = _uiGrid_core2.default.getFormatOptionsByColumn(column, 'filterRow');
      if (Array.isArray(filterValue)) {
        result = _uiGrid_core2.default.formatValue(filterValue[0], formatOptions);
        rangeEnd = _uiGrid_core2.default.formatValue(filterValue[1], formatOptions);
        if (rangeEnd !== '') {
          result += ' - ' + rangeEnd;
        }
      } else if ((0, _type.isDefined)(filterValue)) {
        result = _uiGrid_core2.default.formatValue(filterValue, formatOptions);
      }
      return result;
    };
    function getColumnFilterValue(that, column) {
      if (column) {
        return isOnClickApplyFilterMode(that) && column.bufferedFilterValue !== undefined ? column.bufferedFilterValue : column.filterValue;
      }
    }
    var getColumnSelectedFilterOperation = function getColumnSelectedFilterOperation(that, column) {
      if (column) {
        return isOnClickApplyFilterMode(that) && column.bufferedSelectedFilterOperation !== undefined ? column.bufferedSelectedFilterOperation : column.selectedFilterOperation;
      }
    };
    var isValidFilterValue = function isValidFilterValue(filterValue, column) {
      if (column && BETWEEN_OPERATION_DATA_TYPES.indexOf(column.dataType) >= 0 && Array.isArray(filterValue)) {
        return false;
      }
      return filterValue !== undefined;
    };
    var getFilterValue = function getFilterValue(that, columnIndex, $editorContainer) {
      var column = that._columnsController.columnOption(columnIndex);
      var filterValue = getColumnFilterValue(that, column);
      var isFilterRange = $editorContainer.closest('.' + that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS)).length;
      var isRangeStart = $editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS));
      if (filterValue && Array.isArray(filterValue) && getColumnSelectedFilterOperation(that, column) === 'between') {
        if (isRangeStart) {
          return filterValue[0];
        } else {
          return filterValue[1];
        }
      }
      return !isFilterRange && isValidFilterValue(filterValue, column) ? filterValue : null;
    };
    var normalizeFilterValue = function normalizeFilterValue(that, filterValue, column, $editorContainer) {
      if (getColumnSelectedFilterOperation(that, column) === 'between') {
        var columnFilterValue = getColumnFilterValue(that, column);
        if ($editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS))) {
          return [filterValue, Array.isArray(columnFilterValue) ? columnFilterValue[1] : undefined];
        } else {
          return [Array.isArray(columnFilterValue) ? columnFilterValue[0] : columnFilterValue, filterValue];
        }
      }
      return filterValue;
    };
    var updateFilterValue = function updateFilterValue(that, options) {
      var value = options.value === '' ? null : options.value;
      var $editorContainer = options.container;
      var column = that._columnsController.columnOption(options.column.index);
      var filterValue = getFilterValue(that, column.index, $editorContainer);
      if (!(0, _type.isDefined)(filterValue) && !(0, _type.isDefined)(value)) return;
      that._applyFilterViewController.setHighLight($editorContainer, filterValue !== value);
      var columnOptionName = isOnClickApplyFilterMode(that) ? 'bufferedFilterValue' : 'filterValue';
      var normalizedValue = normalizeFilterValue(that, value, column, $editorContainer);
      var isBetween = getColumnSelectedFilterOperation(that, column) === 'between';
      var notFireEvent = options.notFireEvent || isBetween && Array.isArray(normalizedValue) && normalizedValue.indexOf(undefined) >= 0;
      that._columnsController.columnOption(column.index, columnOptionName, normalizedValue, notFireEvent);
    };
    return {
      _updateEditorValue: function _updateEditorValue(column, $editorContainer) {
        var that = this;
        var editor = getEditorInstance($editorContainer);
        editor && editor.option('value', getFilterValue(that, column.index, $editorContainer));
      },
      _columnOptionChanged: function _columnOptionChanged(e) {
        var that = this;
        var optionNames = e.optionNames;
        var $cell;
        var $editorContainer;
        var $editorRangeElements;
        var $menu;
        if (_uiGrid_core2.default.checkChanges(optionNames, ['filterValue', 'bufferedFilterValue', 'selectedFilterOperation', 'bufferedSelectedFilterOperation', 'filterValues', 'filterType']) && e.columnIndex !== undefined) {
          var visibleIndex = that._columnsController.getVisibleIndex(e.columnIndex);
          var column = that._columnsController.columnOption(e.columnIndex);
          $cell = that._getCellElement(that.element().find('.' + that.addWidgetPrefix(FILTER_ROW_CLASS)).index(), visibleIndex) || (0, _renderer.default)();
          $editorContainer = $cell.find('.' + EDITOR_CONTAINER_CLASS).first();
          if (optionNames.filterValue || optionNames.bufferedFilterValue) {
            that._updateEditorValue(column, $editorContainer);
            var overlayInstance = $cell.find('.' + that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS)).data('dxOverlay');
            if (overlayInstance) {
              $editorRangeElements = overlayInstance.$content().find('.' + EDITOR_CONTAINER_CLASS);
              that._updateEditorValue(column, $editorRangeElements.first());
              that._updateEditorValue(column, $editorRangeElements.last());
            }
            if (!overlayInstance || !overlayInstance.option('visible')) {
              that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
            }
          }
          if (optionNames.selectedFilterOperation || optionNames.bufferedSelectedFilterOperation) {
            if (visibleIndex >= 0 && column) {
              $menu = $cell.find('.' + MENU_CLASS);
              if ($menu.length) {
                that._updateFilterOperationChooser($menu, column, $editorContainer);
                if (getColumnSelectedFilterOperation(that, column) === 'between') {
                  that._renderFilterRangeContent($cell, column);
                } else if ($editorContainer.find('.' + FILTER_RANGE_CONTENT_CLASS).length) {
                  that._renderEditor($editorContainer, that._getEditorOptions($editorContainer, column));
                  that._hideFilterRange();
                }
              }
            }
          }
          return;
        }
        that.callBase(e);
      },
      _renderCore: function _renderCore() {
        this._filterRangeOverlayInstance = null;
        return this.callBase.apply(this, arguments);
      },
      _resizeCore: function _resizeCore() {
        this.callBase.apply(this, arguments);
        this._filterRangeOverlayInstance && this._filterRangeOverlayInstance.repaint();
      },
      isFilterRowVisible: function isFilterRowVisible() {
        return this._isElementVisible(this.option('filterRow'));
      },
      isVisible: function isVisible() {
        return this.callBase() || this.isFilterRowVisible();
      },
      init: function init() {
        this.callBase();
        this._applyFilterViewController = this.getController('applyFilter');
      },
      _initFilterRangeOverlay: function _initFilterRangeOverlay($cell, column) {
        var that = this;
        var sharedData = {};
        var $editorContainer = $cell.find('.dx-editor-container');
        var filterRangeOverlayClass = that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS);
        var $overlay = (0, _renderer.default)('<div>').addClass(filterRangeOverlayClass).appendTo($cell);
        return that._createComponent($overlay, _ui.default, {
          height: 'auto',
          shading: false,
          showTitle: false,
          focusStateEnabled: false,
          hideOnOutsideClick: true,
          wrapperAttr: {
            class: filterRangeOverlayClass
          },
          animation: false,
          position: {
            my: 'top',
            at: 'top',
            of: $editorContainer.length && $editorContainer || $cell,
            offset: '0 -1'
          },
          contentTemplate: function contentTemplate(contentElement) {
            var editorOptions;
            var $editor = (0, _renderer.default)('<div>').addClass(EDITOR_CONTAINER_CLASS + ' ' + that.addWidgetPrefix(FILTER_RANGE_START_CLASS)).appendTo(contentElement);
            column = that._columnsController.columnOption(column.index);
            editorOptions = that._getEditorOptions($editor, column);
            editorOptions.sharedData = sharedData;
            that._renderEditor($editor, editorOptions);
            _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), 'keydown', function (e) {
              var $prevElement = $cell.find('[tabindex]').not(e.target).first();
              if ((0, _index.normalizeKeyName)(e) === 'tab' && e.shiftKey) {
                e.preventDefault();
                that._hideFilterRange();
                if (!$prevElement.length) {
                  $prevElement = $cell.prev().find('[tabindex]').last();
                }
                _events_engine.default.trigger($prevElement, 'focus');
              }
            });
            $editor = (0, _renderer.default)('<div>').addClass(EDITOR_CONTAINER_CLASS + ' ' + that.addWidgetPrefix(FILTER_RANGE_END_CLASS)).appendTo(contentElement);
            editorOptions = that._getEditorOptions($editor, column);
            editorOptions.sharedData = sharedData;
            that._renderEditor($editor, editorOptions);
            _events_engine.default.on($editor.find(EDITORS_INPUT_SELECTOR), 'keydown', function (e) {
              if ((0, _index.normalizeKeyName)(e) === 'tab' && !e.shiftKey) {
                e.preventDefault();
                that._hideFilterRange();
                _events_engine.default.trigger($cell.next().find('[tabindex]').first(), 'focus');
              }
            });
            return (0, _renderer.default)(contentElement).addClass(that.getWidgetContainerClass());
          },
          onShown: function onShown(e) {
            var $editor = e.component.$content().find('.' + EDITOR_CONTAINER_CLASS).first();
            _events_engine.default.trigger($editor.find(EDITORS_INPUT_SELECTOR), 'focus');
          },
          onHidden: function onHidden() {
            column = that._columnsController.columnOption(column.index);
            $cell.find('.' + MENU_CLASS).parent().addClass(EDITOR_WITH_MENU_CLASS);
            if (getColumnSelectedFilterOperation(that, column) === 'between') {
              that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
              that.component.updateDimensions();
            }
          }
        });
      },
      _updateFilterRangeOverlay: function _updateFilterRangeOverlay(options) {
        var overlayInstance = this._filterRangeOverlayInstance;
        overlayInstance && overlayInstance.option(options);
      },
      _showFilterRange: function _showFilterRange($cell, column) {
        var that = this;
        var $overlay = $cell.children('.' + that.addWidgetPrefix(FILTER_RANGE_OVERLAY_CLASS));
        var overlayInstance = $overlay.length && $overlay.data('dxOverlay');
        if (!overlayInstance && column) {
          overlayInstance = that._initFilterRangeOverlay($cell, column);
        }
        if (!overlayInstance.option('visible')) {
          that._filterRangeOverlayInstance && that._filterRangeOverlayInstance.hide();
          that._filterRangeOverlayInstance = overlayInstance;
          that._updateFilterRangeOverlay({
            width: (0, _size.getOuterWidth)($cell, true) + CORRECT_FILTER_RANGE_OVERLAY_WIDTH
          });
          that._filterRangeOverlayInstance && that._filterRangeOverlayInstance.show();
        }
      },
      _hideFilterRange: function _hideFilterRange() {
        var overlayInstance = this._filterRangeOverlayInstance;
        overlayInstance && overlayInstance.hide();
      },
      getFilterRangeOverlayInstance: function getFilterRangeOverlayInstance() {
        return this._filterRangeOverlayInstance;
      },
      _createRow: function _createRow(row) {
        var _this = this;
        var $row = this.callBase(row);
        if (row.rowType === 'filter') {
          $row.addClass(this.addWidgetPrefix(FILTER_ROW_CLASS));
          if (!this.option('useLegacyKeyboardNavigation')) {
            _events_engine.default.on($row, 'keydown', function (event) {
              return (0, _accessibility.selectView)('filterRow', _this, event);
            });
          }
        }
        return $row;
      },
      _getRows: function _getRows() {
        var result = this.callBase();
        if (this.isFilterRowVisible()) {
          result.push({
            rowType: 'filter'
          });
        }
        return result;
      },
      _renderFilterCell: function _renderFilterCell(cell, options) {
        var that = this;
        var column = options.column;
        var $cell = (0, _renderer.default)(cell);
        if (that.component.option('showColumnHeaders')) {
          that.setAria('describedby', column.headerId, $cell);
        }
        that.setAria('label', _message.default.format('dxDataGrid-ariaFilterCell'), $cell);
        $cell.addClass(EDITOR_CELL_CLASS);
        var $container = (0, _renderer.default)('<div>').appendTo($cell);
        var $editorContainer = (0, _renderer.default)('<div>').addClass(EDITOR_CONTAINER_CLASS).appendTo($container);
        if (getColumnSelectedFilterOperation(that, column) === 'between') {
          that._renderFilterRangeContent($cell, column);
        } else {
          var editorOptions = that._getEditorOptions($editorContainer, column);
          that._renderEditor($editorContainer, editorOptions);
        }
        var alignment = column.alignment;
        if (alignment && alignment !== 'center') {
          $cell.find(EDITORS_INPUT_SELECTOR).first().css('textAlign', column.alignment);
        }
        if (column.filterOperations && column.filterOperations.length) {
          that._renderFilterOperationChooser($container, column, $editorContainer);
        }
      },
      _renderCellContent: function _renderCellContent($cell, options) {
        // TODO _getCellTemplate
        var that = this;
        var column = options.column;
        if (options.rowType === 'filter') {
          if (column.command) {
            $cell.html('&nbsp;');
          } else if (column.allowFiltering) {
            that.renderTemplate($cell, that._renderFilterCell.bind(that), options).done(function () {
              that._updateCell($cell, options);
            });
            return;
          }
        }
        this.callBase.apply(this, arguments);
      },
      _getEditorOptions: function _getEditorOptions($editorContainer, column) {
        var that = this;
        var accessibilityOptions = {
          editorOptions: {
            inputAttr: that._getFilterInputAccessibilityAttributes(column)
          }
        };
        var result = (0, _extend.extend)(accessibilityOptions, column, {
          value: getFilterValue(that, column.index, $editorContainer),
          parentType: 'filterRow',
          showAllText: that.option('filterRow.showAllText'),
          updateValueTimeout: that.option('filterRow.applyFilter') === 'onClick' ? 0 : FILTERING_TIMEOUT,
          width: null,
          setValue: function setValue(value, notFireEvent) {
            updateFilterValue(that, {
              column: column,
              value: value,
              container: $editorContainer,
              notFireEvent: notFireEvent
            });
          }
        });
        if (getColumnSelectedFilterOperation(that, column) === 'between') {
          if ($editorContainer.hasClass(that.addWidgetPrefix(FILTER_RANGE_START_CLASS))) {
            result.placeholder = that.option('filterRow.betweenStartText');
          } else {
            result.placeholder = that.option('filterRow.betweenEndText');
          }
        }
        return result;
      },
      _getFilterInputAccessibilityAttributes: function _getFilterInputAccessibilityAttributes(column) {
        var columnAriaLabel = _message.default.format('dxDataGrid-ariaFilterCell');
        if (this.component.option('showColumnHeaders')) {
          return {
            'aria-label': columnAriaLabel,
            'aria-describedby': column.headerId
          };
        }
        return {
          'aria-label': columnAriaLabel
        };
      },
      _renderEditor: function _renderEditor($editorContainer, options) {
        $editorContainer.empty();
        var $element = (0, _renderer.default)('<div>').appendTo($editorContainer);
        var editorController = this.getController('editorFactory');
        var dataSource = this.getController('data').dataSource();
        var filterRowController = this.getController('applyFilter');
        if (options.lookup && this.option('syncLookupFilterValues')) {
          filterRowController.setCurrentColumnForFiltering(options);
          var filter = this.getController('data').getCombinedFilter();
          filterRowController.setCurrentColumnForFiltering(null);
          var lookupDataSource = _uiGrid_core2.default.getWrappedLookupDataSource(options, dataSource, filter);
          var lookupOptions = _extends({}, options, {
            lookup: _extends({}, options.lookup, {
              dataSource: lookupDataSource
            })
          });
          return editorController.createEditor($element, lookupOptions);
        } else {
          return editorController.createEditor($element, options);
        }
      },
      _renderFilterRangeContent: function _renderFilterRangeContent($cell, column) {
        var that = this;
        var $editorContainer = $cell.find('.' + EDITOR_CONTAINER_CLASS).first();
        $editorContainer.empty();
        var $filterRangeContent = (0, _renderer.default)('<div>').addClass(FILTER_RANGE_CONTENT_CLASS).attr('tabindex', this.option('tabIndex'));
        _events_engine.default.on($filterRangeContent, 'focusin', function () {
          that._showFilterRange($cell, column);
        });
        $filterRangeContent.appendTo($editorContainer);
        that._updateFilterRangeContent($cell, getRangeTextByFilterValue(that, column));
      },
      _updateFilterRangeContent: function _updateFilterRangeContent($cell, value) {
        var $filterRangeContent = $cell.find('.' + FILTER_RANGE_CONTENT_CLASS);
        if ($filterRangeContent.length) {
          if (value === '') {
            $filterRangeContent.html('&nbsp;');
          } else {
            $filterRangeContent.text(value);
          }
        }
      },
      _updateFilterOperationChooser: function _updateFilterOperationChooser($menu, column, $editorContainer) {
        var that = this;
        var isCellWasFocused;
        var restoreFocus = function restoreFocus() {
          var menu = _menu.default.getInstance($menu);
          menu && menu.option('focusedElement', null);
          isCellWasFocused && that._focusEditor($editorContainer);
        };
        that._createComponent($menu, _menu.default, {
          integrationOptions: {},
          activeStateEnabled: false,
          selectionMode: 'single',
          cssClass: that.getWidgetContainerClass() + ' ' + CELL_FOCUS_DISABLED_CLASS + ' ' + FILTER_MENU,
          showFirstSubmenuMode: 'onHover',
          hideSubmenuOnMouseLeave: true,
          elementAttr: {
            'aria-label': ARIA_SEARCH_BOX
          },
          items: [{
            disabled: column.filterOperations && column.filterOperations.length ? false : true,
            icon: OPERATION_ICONS[getColumnSelectedFilterOperation(that, column) || 'default'],
            selectable: false,
            items: that._getFilterOperationMenuItems(column)
          }],
          onItemClick: function onItemClick(properties) {
            var selectedFilterOperation = properties.itemData.name;
            var columnSelectedFilterOperation = getColumnSelectedFilterOperation(that, column);
            var notFocusEditor = false;
            var isOnClickMode = isOnClickApplyFilterMode(that);
            var options = {};
            if (properties.itemData.items || selectedFilterOperation && selectedFilterOperation === columnSelectedFilterOperation) {
              return;
            }
            if (selectedFilterOperation) {
              options[isOnClickMode ? 'bufferedSelectedFilterOperation' : 'selectedFilterOperation'] = selectedFilterOperation;
              if (selectedFilterOperation === 'between' || columnSelectedFilterOperation === 'between') {
                notFocusEditor = selectedFilterOperation === 'between';
                options[isOnClickMode ? 'bufferedFilterValue' : 'filterValue'] = null;
              }
            } else {
              options[isOnClickMode ? 'bufferedFilterValue' : 'filterValue'] = null;
              options[isOnClickMode ? 'bufferedSelectedFilterOperation' : 'selectedFilterOperation'] = column.defaultSelectedFilterOperation || null;
            }
            that._columnsController.columnOption(column.index, options);
            that._applyFilterViewController.setHighLight($editorContainer, true);
            if (!selectedFilterOperation) {
              var editor = getEditorInstance($editorContainer);
              if (editor && editor.NAME === 'dxDateBox' && !editor.option('isValid')) {
                editor.reset();
                editor.option('isValid', true);
              }
            }
            if (!notFocusEditor) {
              that._focusEditor($editorContainer);
            } else {
              that._showFilterRange($editorContainer.closest('.' + EDITOR_CELL_CLASS), column);
            }
          },
          onSubmenuShowing: function onSubmenuShowing() {
            isCellWasFocused = that._isEditorFocused($editorContainer);
            that.getController('editorFactory').loseFocus();
          },
          onSubmenuHiding: function onSubmenuHiding() {
            _events_engine.default.trigger($menu, 'blur');
            restoreFocus();
          },
          onContentReady: function onContentReady(e) {
            _events_engine.default.on($menu, 'blur', function () {
              var menu = e.component;
              menu._hideSubmenuAfterTimeout();
              restoreFocus();
            });
          },
          rtlEnabled: that.option('rtlEnabled')
        });
      },
      _isEditorFocused: function _isEditorFocused($container) {
        return $container.hasClass(FOCUSED_CLASS) || $container.parents('.' + FOCUSED_CLASS).length;
      },
      _focusEditor: function _focusEditor($container) {
        this.getController('editorFactory').focus($container);
        _events_engine.default.trigger($container.find(EDITORS_INPUT_SELECTOR), 'focus');
      },
      _renderFilterOperationChooser: function _renderFilterOperationChooser($container, column, $editorContainer) {
        var that = this;
        var $menu;
        if (that.option('filterRow.showOperationChooser')) {
          $container.addClass(EDITOR_WITH_MENU_CLASS);
          $menu = (0, _renderer.default)('<div>').prependTo($container);
          that._updateFilterOperationChooser($menu, column, $editorContainer);
        }
      },
      _getFilterOperationMenuItems: function _getFilterOperationMenuItems(column) {
        var that = this;
        var result = [{}];
        var filterRowOptions = that.option('filterRow');
        var operationDescriptions = filterRowOptions && filterRowOptions.operationDescriptions || {};
        if (column.filterOperations && column.filterOperations.length) {
          var availableFilterOperations = column.filterOperations.filter(function (value) {
            return (0, _type.isDefined)(OPERATION_DESCRIPTORS[value]);
          });
          result = (0, _iterator.map)(availableFilterOperations, function (value) {
            var descriptionName = OPERATION_DESCRIPTORS[value];
            return {
              name: value,
              selected: (getColumnSelectedFilterOperation(that, column) || column.defaultFilterOperation) === value,
              text: operationDescriptions[descriptionName],
              icon: OPERATION_ICONS[value]
            };
          });
          result.push({
            name: null,
            text: filterRowOptions && filterRowOptions.resetOperationText,
            icon: OPERATION_ICONS['default']
          });
        }
        return result;
      },
      _handleDataChanged: function _handleDataChanged(e) {
        var _e$operationTypes, _e$operationTypes2;
        this.callBase.apply(this, arguments);
        if ((_e$operationTypes = e.operationTypes) !== null && _e$operationTypes !== void 0 && _e$operationTypes.filtering || (_e$operationTypes2 = e.operationTypes) !== null && _e$operationTypes2 !== void 0 && _e$operationTypes2.fullReload) {
          var _e$operationTypes3;
          this.updateLookupDataSource((_e$operationTypes3 = e.operationTypes) === null || _e$operationTypes3 === void 0 ? void 0 : _e$operationTypes3.filtering);
        }
      },
      updateLookupDataSource: function updateLookupDataSource(filterChanged) {
        var _this2 = this;
        if (!this.option('syncLookupFilterValues')) {
          return;
        }
        if (!this.element()) {
          return;
        }
        var columns = this._columnsController.getVisibleColumns();
        var dataSource = this._dataController.dataSource();
        var applyFilterViewController = this._applyFilterViewController;
        var rowIndex = this.element().find('.' + this.addWidgetPrefix(FILTER_ROW_CLASS)).index();
        if (rowIndex === -1) {
          return;
        }
        columns.forEach(function (column, index) {
          if (!column.lookup || column.calculateCellValue !== column.defaultCalculateCellValue) {
            return;
          }
          var $cell = _this2._getCellElement(rowIndex, index);
          var editor = getEditorInstance($cell === null || $cell === void 0 ? void 0 : $cell.find('.dx-editor-container'));
          if (editor) {
            applyFilterViewController.setCurrentColumnForFiltering(column);
            var filter = _this2._dataController.getCombinedFilter() || null;
            applyFilterViewController.setCurrentColumnForFiltering(null);
            var editorDataSource = editor.option('dataSource');
            var shouldUpdateFilter = !filterChanged || !(0, _common.equalByValue)(editorDataSource.__dataGridSourceFilter, filter);
            if (shouldUpdateFilter) {
              var lookupDataSource = _uiGrid_core2.default.getWrappedLookupDataSource(column, dataSource, filter);
              editor.option('dataSource', lookupDataSource);
            }
          }
        });
      },
      optionChanged: function optionChanged(args) {
        var that = this;
        switch (args.name) {
          case 'filterRow':
          case 'showColumnLines':
            this._invalidate(true, true);
            args.handled = true;
            break;
          case 'syncLookupFilterValues':
            if (args.value) {
              this.updateLookupDataSource();
            } else {
              this.render();
            }
            args.handled = true;
            break;
          default:
            that.callBase(args);
            break;
        }
      }
    };
  }();
  var DataControllerFilterRowExtender = {
    skipCalculateColumnFilters: function skipCalculateColumnFilters() {
      return false;
    },
    _calculateAdditionalFilter: function _calculateAdditionalFilter() {
      if (this.skipCalculateColumnFilters()) {
        return this.callBase();
      }
      var filters = [this.callBase()];
      var columns = this._columnsController.getVisibleColumns(null, true);
      var filterRowController = this.getController('applyFilter');
      (0, _iterator.each)(columns, function () {
        var _filterRowController$;
        var shouldSkip = ((_filterRowController$ = filterRowController.getCurrentColumnForFiltering()) === null || _filterRowController$ === void 0 ? void 0 : _filterRowController$.index) === this.index;
        if (this.allowFiltering && this.calculateFilterExpression && (0, _type.isDefined)(this.filterValue) && !shouldSkip) {
          var filter = this.createFilterExpression(this.filterValue, this.selectedFilterOperation || this.defaultFilterOperation, 'filterRow');
          filters.push(filter);
        }
      });
      return _uiGrid_core2.default.combineFilters(filters);
    }
  };
  var ApplyFilterViewController = _uiGrid_core.default.ViewController.inherit({
    _getHeaderPanel: function _getHeaderPanel() {
      if (!this._headerPanel) {
        this._headerPanel = this.getView('headerPanel');
      }
      return this._headerPanel;
    },
    setHighLight: function setHighLight($element, value) {
      if (isOnClickApplyFilterMode(this)) {
        $element && $element.toggleClass(HIGHLIGHT_OUTLINE_CLASS, value) && $element.closest('.' + EDITOR_CELL_CLASS).toggleClass(FILTER_MODIFIED_CLASS, value);
        this._getHeaderPanel().enableApplyButton(value);
      }
    },
    applyFilter: function applyFilter() {
      var columnsController = this.getController('columns');
      var columns = columnsController.getColumns();
      columnsController.beginUpdate();
      for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        if (column.bufferedFilterValue !== undefined) {
          columnsController.columnOption(i, 'filterValue', column.bufferedFilterValue);
          column.bufferedFilterValue = undefined;
        }
        if (column.bufferedSelectedFilterOperation !== undefined) {
          columnsController.columnOption(i, 'selectedFilterOperation', column.bufferedSelectedFilterOperation);
          column.bufferedSelectedFilterOperation = undefined;
        }
      }
      columnsController.endUpdate();
      this.removeHighLights();
    },
    removeHighLights: function removeHighLights() {
      if (isOnClickApplyFilterMode(this)) {
        var columnHeadersViewElement = this.getView('columnHeadersView').element();
        columnHeadersViewElement.find('.' + this.addWidgetPrefix(FILTER_ROW_CLASS) + ' .' + HIGHLIGHT_OUTLINE_CLASS).removeClass(HIGHLIGHT_OUTLINE_CLASS);
        columnHeadersViewElement.find('.' + this.addWidgetPrefix(FILTER_ROW_CLASS) + ' .' + FILTER_MODIFIED_CLASS).removeClass(FILTER_MODIFIED_CLASS);
        this._getHeaderPanel().enableApplyButton(false);
      }
    },
    setCurrentColumnForFiltering: function setCurrentColumnForFiltering(column) {
      this._currentColumn = column;
    },
    getCurrentColumnForFiltering: function getCurrentColumnForFiltering() {
      return this._currentColumn;
    }
  });
  var filterRowModule = {
    defaultOptions: function defaultOptions() {
      return {
        syncLookupFilterValues: true,
        filterRow: {
          visible: false,
          showOperationChooser: true,
          showAllText: _message.default.format('dxDataGrid-filterRowShowAllText'),
          resetOperationText: _message.default.format('dxDataGrid-filterRowResetOperationText'),
          applyFilter: 'auto',
          applyFilterText: _message.default.format('dxDataGrid-applyFilterText'),
          operationDescriptions: {
            equal: _message.default.format('dxDataGrid-filterRowOperationEquals'),
            notEqual: _message.default.format('dxDataGrid-filterRowOperationNotEquals'),
            lessThan: _message.default.format('dxDataGrid-filterRowOperationLess'),
            lessThanOrEqual: _message.default.format('dxDataGrid-filterRowOperationLessOrEquals'),
            greaterThan: _message.default.format('dxDataGrid-filterRowOperationGreater'),
            greaterThanOrEqual: _message.default.format('dxDataGrid-filterRowOperationGreaterOrEquals'),
            startsWith: _message.default.format('dxDataGrid-filterRowOperationStartsWith'),
            contains: _message.default.format('dxDataGrid-filterRowOperationContains'),
            notContains: _message.default.format('dxDataGrid-filterRowOperationNotContains'),
            endsWith: _message.default.format('dxDataGrid-filterRowOperationEndsWith'),
            between: _message.default.format('dxDataGrid-filterRowOperationBetween'),
            isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
            isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
          },
          betweenStartText: _message.default.format('dxDataGrid-filterRowOperationBetweenStartText'),
          betweenEndText: _message.default.format('dxDataGrid-filterRowOperationBetweenEndText')
        }
      };
    },
    controllers: {
      applyFilter: ApplyFilterViewController
    },
    extenders: {
      controllers: {
        data: DataControllerFilterRowExtender,
        columnsResizer: {
          _startResizing: function _startResizing() {
            var that = this;
            that.callBase.apply(that, arguments);
            if (that.isResizing()) {
              var overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
              if (overlayInstance) {
                var cellIndex = overlayInstance.$element().closest('td').index();
                if (cellIndex === that._targetPoint.columnIndex || cellIndex === that._targetPoint.columnIndex + 1) {
                  overlayInstance.$content().hide();
                }
              }
            }
          },
          _endResizing: function _endResizing() {
            var that = this;
            var $cell;
            if (that.isResizing()) {
              var overlayInstance = that._columnHeadersView.getFilterRangeOverlayInstance();
              if (overlayInstance) {
                $cell = overlayInstance.$element().closest('td');
                that._columnHeadersView._updateFilterRangeOverlay({
                  width: (0, _size.getOuterWidth)($cell, true) + CORRECT_FILTER_RANGE_OVERLAY_WIDTH
                });
                overlayInstance.$content().show();
              }
            }
            that.callBase.apply(that, arguments);
          }
        },
        editing: {
          updateFieldValue: function updateFieldValue(options) {
            if (options.column.lookup) {
              this._needUpdateLookupDataSource = true;
            }
            return this.callBase.apply(this, arguments);
          },
          _afterSaveEditData: function _afterSaveEditData(cancel) {
            if (this._needUpdateLookupDataSource && !cancel) {
              var _this$getView;
              (_this$getView = this.getView('columnHeadersView')) === null || _this$getView === void 0 ? void 0 : _this$getView.updateLookupDataSource();
            }
            this._needUpdateLookupDataSource = false;
            return this.callBase.apply(this, arguments);
          },
          _afterCancelEditData: function _afterCancelEditData() {
            this._needUpdateLookupDataSource = false;
            return this.callBase.apply(this, arguments);
          }
        }
      },
      views: {
        columnHeadersView: ColumnHeadersViewFilterRowExtender,
        headerPanel: {
          _getToolbarItems: function _getToolbarItems() {
            var items = this.callBase();
            var filterItem = this._prepareFilterItem(items);
            return filterItem.concat(items);
          },
          _prepareFilterItem: function _prepareFilterItem() {
            var that = this;
            var filterItem = [];
            if (that._isShowApplyFilterButton()) {
              var hintText = that.option('filterRow.applyFilterText');
              var columns = that._columnsController.getColumns();
              var disabled = !columns.filter(function (column) {
                return column.bufferedFilterValue !== undefined;
              }).length;
              var onInitialized = function onInitialized(e) {
                (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass(APPLY_BUTTON_CLASS));
              };
              var onClickHandler = function onClickHandler() {
                that._applyFilterViewController.applyFilter();
              };
              var toolbarItem = {
                widget: 'dxButton',
                options: {
                  icon: 'apply-filter',
                  disabled: disabled,
                  onClick: onClickHandler,
                  hint: hintText,
                  text: hintText,
                  onInitialized: onInitialized
                },
                showText: 'inMenu',
                name: 'applyFilterButton',
                location: 'after',
                locateInMenu: 'auto',
                sortIndex: 10
              };
              filterItem.push(toolbarItem);
            }
            return filterItem;
          },
          _isShowApplyFilterButton: function _isShowApplyFilterButton() {
            var filterRowOptions = this.option('filterRow');
            return filterRowOptions && filterRowOptions.visible && filterRowOptions.applyFilter === 'onClick';
          },
          init: function init() {
            this.callBase();
            this._dataController = this.getController('data');
            this._applyFilterViewController = this.getController('applyFilter');
          },
          enableApplyButton: function enableApplyButton(value) {
            this.setToolbarItemDisabled('applyFilterButton', !value);
          },
          isVisible: function isVisible() {
            return this.callBase() || this._isShowApplyFilterButton();
          },
          optionChanged: function optionChanged(args) {
            if (args.name === 'filterRow') {
              this._invalidate();
              args.handled = true;
            } else {
              this.callBase(args);
            }
          }
        }
      }
    }
  };
  exports.filterRowModule = filterRowModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/type","../../core/utils/extend","../../events/utils/index","../../core/utils/iterator","./ui.grid_core.modules","./ui.grid_core.utils","../../localization/message","../editor/editor","../overlay/ui.overlay","../menu","../shared/accessibility","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../events/utils/index"), require("../../core/utils/iterator"), require("./ui.grid_core.modules"), require("./ui.grid_core.utils"), require("../../localization/message"), require("../editor/editor"), require("../overlay/ui.overlay"), require("../menu"), require("../shared/accessibility"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.filter_row.js.map