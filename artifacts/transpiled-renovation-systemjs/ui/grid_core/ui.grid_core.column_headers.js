!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.column_headers.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","./ui.grid_core.columns_view","../../localization/message","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","./ui.grid_core.accessibility","../../core/dom_adapter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.column_headers.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "./ui.grid_core.columns_view", "../../localization/message", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/extend", "./ui.grid_core.accessibility", "../../core/dom_adapter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.columnHeadersModule = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _uiGrid_core = $__require("./ui.grid_core.columns_view");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _uiGrid_core2 = $__require("./ui.grid_core.accessibility");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var CELL_CONTENT_CLASS = 'text-content';
  var HEADERS_CLASS = 'headers';
  var NOWRAP_CLASS = 'nowrap';
  var ROW_CLASS_SELECTOR = '.dx-row';
  var HEADER_ROW_CLASS = 'dx-header-row';
  var COLUMN_LINES_CLASS = 'dx-column-lines';
  var CONTEXT_MENU_SORT_ASC_ICON = 'context-menu-sort-asc';
  var CONTEXT_MENU_SORT_DESC_ICON = 'context-menu-sort-desc';
  var CONTEXT_MENU_SORT_NONE_ICON = 'context-menu-sort-none';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var VISIBILITY_HIDDEN_CLASS = 'dx-visibility-hidden';
  var TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX = 'dx-text-content-alignment-';
  var SORT_INDICATOR_CLASS = 'dx-sort-indicator';
  var SORT_INDEX_INDICATOR_CLASS = 'dx-sort-index-indicator';
  var HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
  var HEADER_FILTER_INDICATOR_CLASS = 'dx-header-filter-indicator';
  var MULTI_ROW_HEADER_CLASS = 'dx-header-multi-row';
  var LINK = 'dx-link';
  var columnHeadersModule = {
    defaultOptions: function defaultOptions() {
      return {
        showColumnHeaders: true,
        cellHintEnabled: true
      };
    },
    views: {
      columnHeadersView: _uiGrid_core.ColumnsView.inherit(function () {
        var createCellContent = function createCellContent(that, $cell, options) {
          var $cellContent = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(CELL_CONTENT_CLASS));
          that.setAria('role', 'presentation', $cellContent);
          addCssClassesToCellContent(that, $cell, options.column, $cellContent);
          var showColumnLines = that.option('showColumnLines');
          var contentAlignment = that.getController('columns').getHeaderContentAlignment(options.column.alignment);
          return $cellContent[showColumnLines || contentAlignment === 'right' ? 'appendTo' : 'prependTo']($cell);
        };
        function addCssClassesToCellContent(that, $cell, column, $cellContent) {
          var $indicatorElements = that._getIndicatorElements($cell, true);
          var $visibleIndicatorElements = that._getIndicatorElements($cell);
          var indicatorCount = $indicatorElements && $indicatorElements.length;
          var columnAlignment = that._getColumnAlignment(column.alignment);
          var sortIndicatorClassName = ".".concat(that._getIndicatorClassName('sort'));
          var sortIndexIndicatorClassName = ".".concat(that._getIndicatorClassName('sortIndex'));
          var $sortIndicator = $visibleIndicatorElements.filter(sortIndicatorClassName);
          var $sortIndexIndicator = $visibleIndicatorElements.children().filter(sortIndexIndicatorClassName);
          $cellContent = $cellContent || $cell.children('.' + that.addWidgetPrefix(CELL_CONTENT_CLASS));
          $cellContent.toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + columnAlignment, indicatorCount > 0).toggleClass(TEXT_CONTENT_ALIGNMENT_CLASS_PREFIX + (columnAlignment === 'left' ? 'right' : 'left'), indicatorCount > 0 && column.alignment === 'center').toggleClass(SORT_INDICATOR_CLASS, !!$sortIndicator.length).toggleClass(SORT_INDEX_INDICATOR_CLASS, !!$sortIndexIndicator.length).toggleClass(HEADER_FILTER_INDICATOR_CLASS, !!$visibleIndicatorElements.filter('.' + that._getIndicatorClassName('headerFilter')).length);
        }

        /**
         * @type {Partial<import('./ui.grid_core.column_headers').ColumnHeadersView>}
         */
        var members = {
          _createTable: function _createTable() {
            var $table = this.callBase.apply(this, arguments);
            _events_engine.default.on($table, 'mousedown selectstart', this.createAction(function (e) {
              var event = e.event;
              if (event.shiftKey) {
                event.preventDefault();
              }
            }));
            return $table;
          },
          _isLegacyKeyboardNavigation: function _isLegacyKeyboardNavigation() {
            return this.option('useLegacyKeyboardNavigation');
          },
          _getDefaultTemplate: function _getDefaultTemplate(column) {
            var that = this;
            return function ($container, options) {
              var caption = column.caption;
              var needCellContent = !column.command || caption && column.command !== 'expand';
              if (column.command === 'empty') {
                that._renderEmptyMessage($container, options);
              } else if (needCellContent) {
                var $content = createCellContent(that, $container, options);
                $content.text(caption);
              } else if (column.command) {
                $container.html('&nbsp;');
              }
            };
          },
          _renderEmptyMessage: function _renderEmptyMessage($container, options) {
            var textEmpty = this._getEmptyHeaderText();
            if (!textEmpty) {
              $container.html('&nbsp;');
              return;
            }
            var $cellContent = createCellContent(this, $container, options);
            var needSplit = textEmpty.includes('{0}');
            if (needSplit) {
              var _textEmpty$split = textEmpty.split('{0}'),
                  _textEmpty$split2 = _slicedToArray(_textEmpty$split, 2),
                  leftPart = _textEmpty$split2[0],
                  rightPart = _textEmpty$split2[1];
              var columnChooserTitle = _message.default.format('dxDataGrid-emptyHeaderColumnChooserText');
              var columnChooserView = this.component.getView('columnChooserView');
              var $link = (0, _renderer.default)('<a>').text(columnChooserTitle).addClass(LINK);
              _events_engine.default.on($link, 'click', this.createAction(function () {
                return columnChooserView.showColumnChooser();
              }));
              $cellContent.append(_dom_adapter.default.createTextNode(leftPart)).append($link).append(_dom_adapter.default.createTextNode(rightPart));
            } else {
              $cellContent.text(textEmpty);
            }
          },
          _getEmptyHeaderText: function _getEmptyHeaderText() {
            var hasHiddenColumns = !!this.component.getView('columnChooserView').hasHiddenColumns();
            var hasGroupedColumns = !!this.component.getView('headerPanel').hasGroupedColumns();
            switch (true) {
              case hasHiddenColumns && hasGroupedColumns:
                return _message.default.format('dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText');
              case hasGroupedColumns:
                return _message.default.format('dxDataGrid-emptyHeaderWithGroupPanelText');
              case hasHiddenColumns:
                return _message.default.format('dxDataGrid-emptyHeaderWithColumnChooserText');
              default:
                return '';
            }
          },
          _getHeaderTemplate: function _getHeaderTemplate(column) {
            return column.headerCellTemplate || {
              allowRenderToDetachedContainer: true,
              render: this._getDefaultTemplate(column)
            };
          },
          _processTemplate: function _processTemplate(template, options) {
            var that = this;
            var resultTemplate;
            var column = options.column;
            var renderingTemplate = that.callBase(template);
            if (options.rowType === 'header' && renderingTemplate && column.headerCellTemplate && !column.command) {
              resultTemplate = {
                render: function render(options) {
                  var $content = createCellContent(that, options.container, options.model);
                  renderingTemplate.render((0, _extend.extend)({}, options, {
                    container: $content
                  }));
                }
              };
            } else {
              resultTemplate = renderingTemplate;
            }
            return resultTemplate;
          },
          _handleDataChanged: function _handleDataChanged(e) {
            if (e.changeType !== 'refresh') return;
            if (this._isGroupingChanged || this._requireReady) {
              this._isGroupingChanged = false;
              this.render();
            }
          },
          _renderCell: function _renderCell($row, options) {
            var $cell = this.callBase($row, options);
            if (options.row.rowType === 'header') {
              $cell.addClass(CELL_FOCUS_DISABLED_CLASS);
              if (!this._isLegacyKeyboardNavigation()) {
                if (options.column && !options.column.type) {
                  $cell.attr('tabindex', this.option('tabindex') || 0);
                }
              }
            }
            return $cell;
          },
          _setCellAriaAttributes: function _setCellAriaAttributes($cell, cellOptions) {
            this.callBase($cell, cellOptions);
            if (cellOptions.rowType === 'header') {
              this.setAria('role', 'columnheader', $cell);
              if (cellOptions.column && !cellOptions.column.command && !cellOptions.column.isBand) {
                $cell.attr('id', cellOptions.column.headerId);
                this.setAria('label', _message.default.format('dxDataGrid-ariaColumn') + ' ' + cellOptions.column.caption, $cell);
              }
            }
          },
          _createRow: function _createRow(row) {
            var $row = this.callBase.apply(this, arguments);
            $row.toggleClass(COLUMN_LINES_CLASS, this.option('showColumnLines'));
            if (row.rowType === 'header') {
              $row.addClass(HEADER_ROW_CLASS);
              if (!this._isLegacyKeyboardNavigation()) {
                (0, _uiGrid_core2.registerKeyboardAction)('columnHeaders', this, $row, 'td', this._handleActionKeyDown.bind(this));
              }
            }
            return $row;
          },
          _handleActionKeyDown: function _handleActionKeyDown(args) {
            var event = args.event;
            var $target = (0, _renderer.default)(event.target);
            this._lastActionElement = event.target;
            if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
              /**
               * @type {any}
               */
              // @ts-expect-error
              var headerFilterController = this.getController('headerFilter');
              var $column = $target.closest('td');
              var columnIndex = this.getColumnIndexByElement($column);
              if (columnIndex >= 0) {
                headerFilterController.showHeaderFilterMenu(columnIndex, false);
              }
            } else {
              var $row = $target.closest(ROW_CLASS_SELECTOR);
              this._processHeaderAction(event, $row);
            }
            event.preventDefault();
          },
          _renderCore: function _renderCore() {
            var that = this;
            var $container = that.element();
            var change = {};
            if (that._tableElement && !that._dataController.isLoaded() && !that._hasRowElements) {
              return;
            }
            $container.addClass(that.addWidgetPrefix(HEADERS_CLASS)).toggleClass(that.addWidgetPrefix(NOWRAP_CLASS), !that.option('wordWrapEnabled')).empty();
            that.setAria('role', 'presentation', $container);
            var deferred = that._updateContent(that._renderTable({
              change: change
            }), change);
            if (that.getRowCount() > 1) {
              $container.addClass(MULTI_ROW_HEADER_CLASS);
            }
            that.callBase.apply(that, arguments);
            return deferred;
          },
          _renderRows: function _renderRows() {
            var that = this;
            if (that._dataController.isLoaded() || that._hasRowElements) {
              that.callBase.apply(that, arguments);
              that._hasRowElements = true;
            }
          },
          _renderRow: function _renderRow($table, options) {
            var rowIndex = this.getRowCount() === 1 ? null : options.row.rowIndex;
            options.columns = this.getColumns(rowIndex);
            this.callBase($table, options);
          },
          _createCell: function _createCell(options) {
            var column = options.column;
            var $cellElement = this.callBase.apply(this, arguments);
            column.rowspan > 1 && options.rowType === 'header' && $cellElement.attr('rowSpan', column.rowspan);
            return $cellElement;
          },
          _getRows: function _getRows() {
            var result = [];
            var rowCount = this.getRowCount();
            if (this.option('showColumnHeaders')) {
              for (var i = 0; i < rowCount; i++) {
                result.push({
                  rowType: 'header',
                  rowIndex: i
                });
              }
            }
            return result;
          },
          _getCellTemplate: function _getCellTemplate(options) {
            if (options.rowType === 'header') {
              return this._getHeaderTemplate(options.column);
            }
          },
          _columnOptionChanged: function _columnOptionChanged(e) {
            var changeTypes = e.changeTypes;
            var optionNames = e.optionNames;
            if (changeTypes.grouping || changeTypes.groupExpanding) {
              if (changeTypes.grouping) {
                this._isGroupingChanged = true;
              }
              return;
            }
            this.callBase(e);
            if (optionNames.width || optionNames.visible) {
              this.resizeCompleted.fire();
            }
          },
          _isElementVisible: function _isElementVisible(elementOptions) {
            return elementOptions && elementOptions.visible;
          },
          _alignCaptionByCenter: function _alignCaptionByCenter($cell) {
            var $indicatorsContainer = this._getIndicatorContainer($cell, true);
            if ($indicatorsContainer && $indicatorsContainer.length) {
              $indicatorsContainer.filter('.' + VISIBILITY_HIDDEN_CLASS).remove();
              $indicatorsContainer = this._getIndicatorContainer($cell);
              $indicatorsContainer.clone().addClass(VISIBILITY_HIDDEN_CLASS).css('float', '').insertBefore($cell.children('.' + this.addWidgetPrefix(CELL_CONTENT_CLASS)));
            }
          },
          _updateCell: function _updateCell($cell, options) {
            if (options.rowType === 'header' && options.column.alignment === 'center') {
              this._alignCaptionByCenter($cell);
            }
            this.callBase.apply(this, arguments);
          },
          _updateIndicator: function _updateIndicator($cell, column, indicatorName) {
            var $indicatorElement = this.callBase.apply(this, arguments);
            if (column.alignment === 'center') {
              this._alignCaptionByCenter($cell);
            }
            addCssClassesToCellContent(this, $cell, column);
            return $indicatorElement;
          },
          _getIndicatorContainer: function _getIndicatorContainer($cell, returnAll) {
            var $indicatorsContainer = this.callBase($cell);
            return returnAll ? $indicatorsContainer : $indicatorsContainer.filter(':not(.' + VISIBILITY_HIDDEN_CLASS + ')');
          },
          _isSortableElement: function _isSortableElement() {
            return true;
          },
          getHeadersRowHeight: function getHeadersRowHeight() {
            var $tableElement = this.getTableElement();
            var $headerRows = $tableElement && $tableElement.find('.' + HEADER_ROW_CLASS);
            return $headerRows && $headerRows.toArray().reduce(function (sum, headerRow) {
              return sum + (0, _size.getHeight)(headerRow);
            }, 0) || 0;
          },
          getHeaderElement: function getHeaderElement(index) {
            var columnElements = this.getColumnElements();
            return columnElements && columnElements.eq(index);
          },
          getColumnElements: function getColumnElements(index, bandColumnIndex) {
            var that = this;
            var $cellElement;
            var columnsController = that._columnsController;
            var rowCount = that.getRowCount();
            if (that.option('showColumnHeaders')) {
              if (rowCount > 1 && (!(0, _type.isDefined)(index) || (0, _type.isDefined)(bandColumnIndex))) {
                var result = [];
                var visibleColumns = (0, _type.isDefined)(bandColumnIndex) ? columnsController.getChildrenByBandColumn(bandColumnIndex, true) : columnsController.getVisibleColumns();
                (0, _iterator.each)(visibleColumns, function (_, column) {
                  var rowIndex = (0, _type.isDefined)(index) ? index : columnsController.getRowIndex(column.index);
                  $cellElement = that._getCellElement(rowIndex, columnsController.getVisibleIndex(column.index, rowIndex));
                  $cellElement && result.push($cellElement.get(0));
                });

                // @ts-expect-error
                return (0, _renderer.default)(result);
              } else if (!index || index < rowCount) {
                return that.getCellElements(index || 0);
              }
            }
          },
          getColumnIndexByElement: function getColumnIndexByElement($cell) {
            var cellIndex = this.getCellIndex($cell);
            var $row = $cell.closest('.dx-row');
            var rowIndex = $row[0].rowIndex;
            var column = this.getColumns(rowIndex)[cellIndex];
            return column ? column.index : -1;
          },
          getVisibleColumnIndex: function getVisibleColumnIndex(columnIndex, rowIndex) {
            var column = this.getColumns()[columnIndex];
            return column ? this._columnsController.getVisibleIndex(column.index, rowIndex) : -1;
          },
          getColumnWidths: function getColumnWidths() {
            var $columnElements = this.getColumnElements();
            if ($columnElements && $columnElements.length) {
              return this._getWidths($columnElements);
            }
            return this.callBase.apply(this, arguments);
          },
          allowDragging: function allowDragging(column) {
            var rowIndex = column && this._columnsController.getRowIndex(column.index);
            var columns = this.getColumns(rowIndex);
            var isReorderingEnabled = this.option('allowColumnReordering') || this._columnsController.isColumnOptionUsed('allowReordering');
            return isReorderingEnabled && column.allowReordering && columns.length > 1;
          },
          getBoundingRect: function getBoundingRect() {
            var that = this;
            var $columnElements = that.getColumnElements();
            if ($columnElements && $columnElements.length) {
              var offset = that.getTableElement().offset();
              return {
                top: offset.top
              };
            }
            return null;
          },
          getName: function getName() {
            return 'headers';
          },
          getColumnCount: function getColumnCount() {
            var $columnElements = this.getColumnElements();
            return $columnElements ? $columnElements.length : 0;
          },
          isVisible: function isVisible() {
            return this.option('showColumnHeaders');
          },
          optionChanged: function optionChanged(args) {
            var that = this;
            switch (args.name) {
              case 'showColumnHeaders':
              case 'wordWrapEnabled':
              case 'showColumnLines':
                that._invalidate(true, true);
                args.handled = true;
                break;
              default:
                that.callBase(args);
            }
          },
          getHeight: function getHeight() {
            return this.getElementHeight();
          },
          getContextMenuItems: function getContextMenuItems(options) {
            var that = this;
            var column = options.column;
            if (options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
              var sortingOptions = that.option('sorting');
              if (sortingOptions && sortingOptions.mode !== 'none' && column && column.allowSorting) {
                var onItemClick = function onItemClick(params) {
                  setTimeout(function () {
                    that._columnsController.changeSortOrder(column.index, params.itemData.value);
                  });
                };
                return [{
                  text: sortingOptions.ascendingText,
                  value: 'asc',
                  disabled: column.sortOrder === 'asc',
                  icon: CONTEXT_MENU_SORT_ASC_ICON,
                  onItemClick: onItemClick
                }, {
                  text: sortingOptions.descendingText,
                  value: 'desc',
                  disabled: column.sortOrder === 'desc',
                  icon: CONTEXT_MENU_SORT_DESC_ICON,
                  onItemClick: onItemClick
                }, {
                  text: sortingOptions.clearText,
                  value: 'none',
                  disabled: !column.sortOrder,
                  icon: CONTEXT_MENU_SORT_NONE_ICON,
                  onItemClick: onItemClick
                }];
              }
            }
          },
          getRowCount: function getRowCount() {
            return this._columnsController && this._columnsController.getRowCount();
          },
          setRowsOpacity: function setRowsOpacity(columnIndex, value, rowIndex) {
            var that = this;
            var i;
            var columnElements;
            var rowCount = that.getRowCount();
            var columns = that._columnsController.getColumns();
            var column = columns && columns[columnIndex];
            var columnID = column && column.isBand && column.index;
            var setColumnOpacity = function setColumnOpacity(index, column) {
              if (column.ownerBand === columnID) {
                columnElements.eq(index).css({
                  opacity: value
                });
                if (column.isBand) {
                  that.setRowsOpacity(column.index, value, i + 1);
                }
              }
            };
            if ((0, _type.isDefined)(columnID)) {
              rowIndex = rowIndex || 0;
              for (i = rowIndex; i < rowCount; i++) {
                columnElements = that.getCellElements(i);
                (0, _iterator.each)(that.getColumns(i), setColumnOpacity);
              }
            }
          }
        };
        return members;
      }())
    }
  };
  exports.columnHeadersModule = columnHeadersModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","./ui.grid_core.columns_view","../../localization/message","../../core/utils/type","../../core/utils/iterator","../../core/utils/extend","./ui.grid_core.accessibility","../../core/dom_adapter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("./ui.grid_core.columns_view"), require("../../localization/message"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("./ui.grid_core.accessibility"), require("../../core/dom_adapter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.column_headers.js.map