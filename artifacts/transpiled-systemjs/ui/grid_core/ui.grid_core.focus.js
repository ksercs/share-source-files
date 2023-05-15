!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.focus.js"], ["../../core/renderer","./ui.grid_core.modules","../../core/utils/iterator","./ui.grid_core.utils","../../core/utils/common","../../core/utils/type","../../core/utils/deferred","./ui.grid_core.focus.utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.focus.js", ["../../core/renderer", "./ui.grid_core.modules", "../../core/utils/iterator", "./ui.grid_core.utils", "../../core/utils/common", "../../core/utils/type", "../../core/utils/deferred", "./ui.grid_core.focus.utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.focusModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _iterator = $__require("../../core/utils/iterator");
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _deferred = $__require("../../core/utils/deferred");
  var _uiGrid_coreFocus = $__require("./ui.grid_core.focus.utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ROW_FOCUSED_CLASS = 'dx-row-focused';
  var FOCUSED_ROW_SELECTOR = '.dx-row' + '.' + ROW_FOCUSED_CLASS;
  var TABLE_POSTFIX_CLASS = 'table';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var FocusController = _uiGrid_core.default.ViewController.inherit(function () {
    /**
     * @type {Partial<import('./ui.grid_core.focus').FocusController>}
     */
    var members = {
      init: function init() {
        this._dataController = this.getController('data');
        this._keyboardController = this.getController('keyboardNavigation');
        this.component._optionsByReference.focusedRowKey = true;
      },
      optionChanged: function optionChanged(args) {
        if (args.name === 'focusedRowIndex') {
          var focusedRowKey = this.option('focusedRowKey');
          this._focusRowByIndex(args.value);
          this._triggerFocusedRowChangedIfNeed(focusedRowKey, args.value);
          args.handled = true;
        } else if (args.name === 'focusedRowKey') {
          args.handled = true;
          if (Array.isArray(args.value) && JSON.stringify(args.value) === JSON.stringify(args.previousValue)) {
            return;
          }
          var focusedRowIndex = this.option('focusedRowIndex');
          this._focusRowByKey(args.value);
          this._triggerFocusedRowChangedIfNeed(args.value, focusedRowIndex);
        } else if (args.name === 'focusedColumnIndex') {
          args.handled = true;
        } else if (args.name === 'focusedRowEnabled') {
          args.handled = true;
        } else if (args.name === 'autoNavigateToFocusedRow') {
          args.handled = true;
        } else {
          this.callBase(args);
        }
      },
      _triggerFocusedRowChangedIfNeed: function _triggerFocusedRowChangedIfNeed(focusedRowKey, focusedRowIndex) {
        var focusedRowIndexByKey = this.getFocusedRowIndexByKey(focusedRowKey);
        if (focusedRowIndex === focusedRowIndexByKey) {
          var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
          if (rowIndex >= 0) {
            var $rowElement = (0, _renderer.default)(this.getView('rowsView').getRowElement(rowIndex));
            // @ts-expect-error
            this.getController('keyboardNavigation')._fireFocusedRowChanged($rowElement, focusedRowIndex);
          }
        }
      },
      isAutoNavigateToFocusedRow: function isAutoNavigateToFocusedRow() {
        return this.option('scrolling.mode') !== 'infinite' && this.option('autoNavigateToFocusedRow');
      },
      _focusRowByIndex: function _focusRowByIndex(index, operationTypes) {
        if (!this.option('focusedRowEnabled')) {
          return;
        }
        index = index !== undefined ? index : this.option('focusedRowIndex');
        if (index < 0) {
          if (this.isAutoNavigateToFocusedRow()) {
            this._resetFocusedRow();
          }
        } else {
          this._focusRowByIndexCore(index, operationTypes);
        }
      },
      _focusRowByIndexCore: function _focusRowByIndexCore(index, operationTypes) {
        var _this = this;
        var dataController = this.getController('data');
        var pageSize = dataController.pageSize();
        var setKeyByIndex = function setKeyByIndex() {
          if (_this._isValidFocusedRowIndex(index)) {
            var rowIndex = index - dataController.getRowIndexOffset(true);
            if (!operationTypes || operationTypes.paging && !operationTypes.filtering) {
              // @ts-expect-error
              var lastItemIndex = dataController._getLastItemIndex();
              rowIndex = Math.min(rowIndex, lastItemIndex);
            }
            var focusedRowKey = dataController.getKeyByRowIndex(rowIndex, true);
            if ((0, _type.isDefined)(focusedRowKey) && !_this.isRowFocused(focusedRowKey)) {
              _this.option('focusedRowKey', focusedRowKey);
            }
          }
        };
        if (pageSize >= 0) {
          if (!this._isLocalRowIndex(index)) {
            var pageIndex = Math.floor(index / dataController.pageSize());
            (0, _deferred.when)(dataController.pageIndex(pageIndex), dataController.waitReady()).done(function () {
              setKeyByIndex();
            });
          } else {
            setKeyByIndex();
          }
        }
      },
      _isLocalRowIndex: function _isLocalRowIndex(index) {
        var dataController = this.getController('data');
        // @ts-expect-error
        var isVirtualScrolling = this.getController('keyboardNavigation')._isVirtualScrolling();
        if (isVirtualScrolling) {
          var pageIndex = Math.floor(index / dataController.pageSize());
          var virtualItems = dataController.virtualItemsCount();
          var virtualItemsBegin = virtualItems ? virtualItems.begin : -1;
          var visibleRowsCount = dataController.getVisibleRows().length + dataController.getRowIndexOffset();
          var visiblePagesCount = Math.ceil(visibleRowsCount / dataController.pageSize());
          return virtualItemsBegin <= index && visiblePagesCount > pageIndex;
        }
        return true;
      },
      _setFocusedRowKeyByIndex: function _setFocusedRowKeyByIndex(index) {
        var dataController = this.getController('data');
        if (this._isValidFocusedRowIndex(index)) {
          var rowIndex = Math.min(index - dataController.getRowIndexOffset(), dataController.items().length - 1);
          var focusedRowKey = dataController.getKeyByRowIndex(rowIndex);
          if ((0, _type.isDefined)(focusedRowKey) && !this.isRowFocused(focusedRowKey)) {
            this.option('focusedRowKey', focusedRowKey);
          }
        }
      },
      _focusRowByKey: function _focusRowByKey(key) {
        if (!(0, _type.isDefined)(key)) {
          this._resetFocusedRow();
        } else {
          this._navigateToRow(key, true);
        }
      },
      _resetFocusedRow: function _resetFocusedRow() {
        var focusedRowKey = this.option('focusedRowKey');
        var isFocusedRowKeyDefined = (0, _type.isDefined)(focusedRowKey);
        if (!isFocusedRowKeyDefined && this.option('focusedRowIndex') < 0) {
          return;
        }
        var keyboardController = this.getController('keyboardNavigation');
        if (isFocusedRowKeyDefined) {
          this.option('focusedRowKey', null);
        }
        keyboardController.setFocusedRowIndex(-1);
        this.option('focusedRowIndex', -1);
        this.getController('data').updateItems({
          changeType: 'updateFocusedRow',
          focusedRowKey: null
        });

        // @ts-expect-error
        keyboardController._fireFocusedRowChanged(undefined, -1);
      },
      _isValidFocusedRowIndex: function _isValidFocusedRowIndex(rowIndex) {
        var dataController = this.getController('data');
        var row = dataController.getVisibleRows()[rowIndex];
        return !row || row.rowType === 'data' || row.rowType === 'group';
      },
      publicMethods: function publicMethods() {
        return ['navigateToRow', 'isRowFocused'];
      },
      navigateToRow: function navigateToRow(key) {
        if (!this.isAutoNavigateToFocusedRow()) {
          this.option('focusedRowIndex', -1);
        }
        return this._navigateToRow(key);
      },
      _navigateToRow: function _navigateToRow(key, needFocusRow) {
        var that = this;
        var dataController = that.getController('data');
        var isAutoNavigate = that.isAutoNavigateToFocusedRow();
        // @ts-expect-error
        var d = new _deferred.Deferred();
        if (key === undefined || !dataController.dataSource()) {
          return d.reject().promise();
        }
        var rowIndexByKey = that.getFocusedRowIndexByKey(key);
        if (!isAutoNavigate && needFocusRow || rowIndexByKey >= 0) {
          that._navigateTo(key, d, needFocusRow);
        } else {
          dataController.getPageIndexByKey(key).done(function (pageIndex) {
            if (pageIndex < 0) {
              d.resolve(-1);
              return;
            }
            if (pageIndex === dataController.pageIndex()) {
              dataController.reload().done(function () {
                if (that.isRowFocused(key) && dataController.getRowIndexByKey(key) >= 0) {
                  d.resolve(that.getFocusedRowIndexByKey(key));
                } else {
                  that._navigateTo(key, d, needFocusRow);
                }
              }).fail(d.reject);
            } else {
              dataController.pageIndex(pageIndex).done(function () {
                that._navigateTo(key, d, needFocusRow);
              }).fail(d.reject);
            }
          }).fail(d.reject);
        }
        return d.promise();
      },
      _navigateTo: function _navigateTo(key, deferred, needFocusRow) {
        var visibleRowIndex = this.getController('data').getRowIndexByKey(key);
        var isVirtualRowRenderingMode = _uiGrid_core2.default.isVirtualRowRendering(this);
        var isAutoNavigate = this.isAutoNavigateToFocusedRow();
        if (isAutoNavigate && isVirtualRowRenderingMode && visibleRowIndex < 0) {
          this._navigateToVirtualRow(key, deferred, needFocusRow);
        } else {
          this._navigateToVisibleRow(key, deferred, needFocusRow);
        }
      },
      _navigateToVisibleRow: function _navigateToVisibleRow(key, deferred, needFocusRow) {
        if (needFocusRow) {
          this._triggerUpdateFocusedRow(key, deferred);
        } else {
          var focusedRowIndex = this.getFocusedRowIndexByKey(key);
          this.getView('rowsView').scrollToRowElement(key, deferred).done(function () {
            deferred.resolve(focusedRowIndex);
          });
        }
      },
      _navigateToVirtualRow: function _navigateToVirtualRow(key, deferred, needFocusRow) {
        var _this2 = this;
        var dataController = this.getController('data');
        // @ts-expect-error
        var rowsScrollController = dataController._rowsScrollController;
        var rowIndex = _uiGrid_core2.default.getIndexByKey(key, dataController.items(true));
        var scrollable = this.getView('rowsView').getScrollable();
        if (rowsScrollController && scrollable && rowIndex >= 0) {
          var focusedRowIndex = rowIndex + dataController.getRowIndexOffset(true);
          var offset = rowsScrollController.getItemOffset(focusedRowIndex);
          var triggerUpdateFocusedRow = function triggerUpdateFocusedRow() {
            if (dataController.totalCount() && !dataController.items().length) {
              return;
            }
            _this2.component.off('contentReady', triggerUpdateFocusedRow);
            if (needFocusRow) {
              _this2._triggerUpdateFocusedRow(key, deferred);
            } else {
              deferred.resolve(focusedRowIndex);
            }
          };
          this.component.on('contentReady', triggerUpdateFocusedRow);
          this.getView('rowsView').scrollTopPosition(offset);
        } else {
          deferred.resolve(-1);
        }
      },
      _triggerUpdateFocusedRow: function _triggerUpdateFocusedRow(key, deferred) {
        var _this3 = this;
        var dataController = this.getController('data');
        var focusedRowIndex = this.getFocusedRowIndexByKey(key);
        if (this._isValidFocusedRowIndex(focusedRowIndex)) {
          var d;
          if (this.option('focusedRowEnabled')) {
            dataController.updateItems({
              changeType: 'updateFocusedRow',
              focusedRowKey: key
            });
          } else {
            d = this.getView('rowsView').scrollToRowElement(key);
          }
          (0, _deferred.when)(d).done(function () {
            _this3.getController('keyboardNavigation').setFocusedRowIndex(focusedRowIndex);
            deferred && deferred.resolve(focusedRowIndex);
          });
        } else {
          deferred && deferred.resolve(-1);
        }
      },
      getFocusedRowIndexByKey: function getFocusedRowIndexByKey(key) {
        var dataController = this.getController('data');
        var loadedRowIndex = dataController.getRowIndexByKey(key, true);
        return loadedRowIndex >= 0 ? loadedRowIndex + dataController.getRowIndexOffset(true) : -1;
      },
      _focusRowByKeyOrIndex: function _focusRowByKeyOrIndex() {
        var _this4 = this;
        var focusedRowKey = this.option('focusedRowKey');
        var currentFocusedRowIndex = this.option('focusedRowIndex');
        var keyboardController = this.getController('keyboardNavigation');
        var dataController = this.getController('data');
        if ((0, _type.isDefined)(focusedRowKey)) {
          var visibleRowIndex = dataController.getRowIndexByKey(focusedRowKey);
          if (visibleRowIndex >= 0) {
            // @ts-expect-error
            if (keyboardController._isVirtualScrolling()) {
              currentFocusedRowIndex = visibleRowIndex + dataController.getRowIndexOffset();
            }
            keyboardController.setFocusedRowIndex(currentFocusedRowIndex);
            this._triggerUpdateFocusedRow(focusedRowKey);
          } else {
            this._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
              if (currentFocusedRowIndex >= 0 && focusedRowIndex < 0) {
                _this4._focusRowByIndex();
              } else if (currentFocusedRowIndex < 0 && focusedRowIndex >= 0) {
                keyboardController.setFocusedRowIndex(focusedRowIndex);
              }
            });
          }
        } else if (currentFocusedRowIndex >= 0) {
          // @ts-expect-error
          this.getController('focus')._focusRowByIndex(currentFocusedRowIndex);
        }
      },
      isRowFocused: function isRowFocused(key) {
        var focusedRowKey = this.option('focusedRowKey');
        if ((0, _type.isDefined)(focusedRowKey)) {
          return (0, _common.equalByValue)(key, this.option('focusedRowKey'));
        }
      },
      updateFocusedRow: function updateFocusedRow(change) {
        var that = this;
        var focusedRowIndex = that._dataController.getRowIndexByKey(change.focusedRowKey);
        var rowsView = that.getView('rowsView');
        var $tableElement;
        var $mainRow;
        (0, _iterator.each)(rowsView.getTableElements(), function (index, element) {
          var isMainTable = index === 0;
          $tableElement = (0, _renderer.default)(element);
          that._clearPreviousFocusedRow($tableElement, focusedRowIndex);
          var $row = that._prepareFocusedRow({
            changedItem: that._dataController.getVisibleRows()[focusedRowIndex],
            $tableElement: $tableElement,
            focusedRowIndex: focusedRowIndex
          });
          if (isMainTable) {
            $mainRow = $row;
          }
        });
        $mainRow && rowsView.scrollToElementVertically($mainRow);
      },
      _clearPreviousFocusedRow: function _clearPreviousFocusedRow($tableElement, focusedRowIndex) {
        var _this5 = this;
        var isNotMasterDetailFocusedRow = function isNotMasterDetailFocusedRow(_, focusedRow) {
          var $focusedRowTable = (0, _renderer.default)(focusedRow).closest(".".concat(_this5.addWidgetPrefix(TABLE_POSTFIX_CLASS)));
          return $tableElement.is($focusedRowTable);
        };
        var $prevRowFocusedElement = $tableElement.find(FOCUSED_ROW_SELECTOR).filter(isNotMasterDetailFocusedRow);
        $prevRowFocusedElement.removeClass(ROW_FOCUSED_CLASS).removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabindex');
        $prevRowFocusedElement.children('td').removeAttr('tabindex');
        if (focusedRowIndex !== 0) {
          var $firstRow = (0, _renderer.default)(this.getView('rowsView').getRowElement(0));
          $firstRow.removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabIndex');
        }
      },
      _prepareFocusedRow: function _prepareFocusedRow(options) {
        var $row;
        var changedItem = options.changedItem;
        if (changedItem && (changedItem.rowType === 'data' || changedItem.rowType === 'group')) {
          var focusedRowIndex = options.focusedRowIndex;
          var $tableElement = options.$tableElement;
          var tabIndex = this.option('tabindex') || 0;
          var rowsView = this.getView('rowsView');

          // @ts-expect-error
          $row = (0, _renderer.default)(rowsView._getRowElements($tableElement).eq(focusedRowIndex));
          $row.addClass(ROW_FOCUSED_CLASS).attr('tabindex', tabIndex);
        }
        return $row;
      }
    };
    return members;
  }());

  /**
   * @type {import('./ui.grid_core.modules').Module}
   */
  var focusModule = {
    defaultOptions: function defaultOptions() {
      return {
        focusedRowEnabled: false,
        autoNavigateToFocusedRow: true,
        focusedRowKey: null,
        focusedRowIndex: -1,
        focusedColumnIndex: -1
      };
    },
    controllers: {
      focus: FocusController
    },
    extenders: {
      controllers: {
        keyboardNavigation: {
          init: function init() {
            var rowIndex = this.option('focusedRowIndex');
            var columnIndex = this.option('focusedColumnIndex');
            this.createAction('onFocusedRowChanging', {
              excludeValidators: ['disabled', 'readOnly']
            });
            this.createAction('onFocusedRowChanged', {
              excludeValidators: ['disabled', 'readOnly']
            });
            this.createAction('onFocusedCellChanging', {
              excludeValidators: ['disabled', 'readOnly']
            });
            this.createAction('onFocusedCellChanged', {
              excludeValidators: ['disabled', 'readOnly']
            });
            this.callBase();
            this.setRowFocusType();
            this._focusedCellPosition = {};
            if ((0, _type.isDefined)(rowIndex) && rowIndex >= 0) {
              this._focusedCellPosition.rowIndex = rowIndex;
            }
            if ((0, _type.isDefined)(columnIndex) && columnIndex >= 0) {
              this._focusedCellPosition.columnIndex = columnIndex;
            }
          },
          setFocusedRowIndex: function setFocusedRowIndex(rowIndex) {
            var dataController = this.getController('data');
            this.callBase(rowIndex);
            var visibleRowIndex = rowIndex - dataController.getRowIndexOffset();
            var visibleRow = dataController.getVisibleRows()[visibleRowIndex];
            if (!visibleRow || !visibleRow.isNewRow) {
              this.option('focusedRowIndex', rowIndex);
            }
          },
          setFocusedColumnIndex: function setFocusedColumnIndex(columnIndex) {
            this.callBase(columnIndex);
            this.option('focusedColumnIndex', columnIndex);
          },
          _escapeKeyHandler: function _escapeKeyHandler(eventArgs, isEditing) {
            if (isEditing || !this.option('focusedRowEnabled')) {
              this.callBase(eventArgs, isEditing);
              return;
            }
            if (this.isCellFocusType()) {
              this.setRowFocusType();
              this._focus(this._getCellElementFromTarget(eventArgs.originalEvent.target), true);
            }
          },
          _updateFocusedCellPosition: function _updateFocusedCellPosition($cell, direction) {
            var prevRowIndex = this.option('focusedRowIndex');
            var prevColumnIndex = this.option('focusedColumnIndex');
            var position = this.callBase($cell, direction);
            if (position && position.columnIndex >= 0) {
              this._fireFocusedCellChanged($cell, prevColumnIndex, prevRowIndex);
            }
          }
        },
        editorFactory: {
          renderFocusOverlay: function renderFocusOverlay($element, isHideBorder) {
            var keyboardController = this.getController('keyboardNavigation');
            var focusedRowEnabled = this.option('focusedRowEnabled');
            var editingController = this.getController('editing');
            var $cell;
            if (!focusedRowEnabled || !(keyboardController !== null && keyboardController !== void 0 && keyboardController.isRowFocusType()) || editingController.isEditing()) {
              this.callBase($element, isHideBorder);
            } else if (focusedRowEnabled) {
              // @ts-expect-error
              var isRowElement = keyboardController._getElementType($element) === 'row';
              if (isRowElement && !$element.hasClass(ROW_FOCUSED_CLASS)) {
                $cell = keyboardController.getFirstValidCellInRow($element);
                keyboardController.focus($cell);
              }
            }
          }
        },
        columns: {
          getSortDataSourceParameters: function getSortDataSourceParameters(_, sortByKey) {
            var _this6 = this;
            var result = this.callBase.apply(this, arguments);
            var dataController = this.getController('data');
            // @ts-expect-error
            var dataSource = dataController._dataSource;
            var store = dataController.store();
            var key = store && store.key();
            var remoteOperations = dataSource && dataSource.remoteOperations() || {};
            var isLocalOperations = Object.keys(remoteOperations).every(function (operationName) {
              return !remoteOperations[operationName];
            });
            if (key && (this.option('focusedRowEnabled') && this.getController('focus').isAutoNavigateToFocusedRow() !== false || sortByKey)) {
              key = Array.isArray(key) ? key : [key];
              var notSortedKeys = key.filter(function (key) {
                return !_this6.columnOption(key, 'sortOrder');
              });
              if (notSortedKeys.length) {
                result = result || [];
                if (isLocalOperations) {
                  result.push({
                    selector: dataSource.getDataIndexGetter(),
                    desc: false
                  });
                } else {
                  notSortedKeys.forEach(function (notSortedKey) {
                    return result.push({
                      selector: notSortedKey,
                      desc: false
                    });
                  });
                }
              }
            }
            return result;
          }
        },
        data: {
          _applyChange: function _applyChange(change) {
            if (change && change.changeType === 'updateFocusedRow') return;
            return this.callBase.apply(this, arguments);
          },
          _fireChanged: function _fireChanged(e) {
            this.callBase(e);
            if (this.option('focusedRowEnabled') && this._dataSource) {
              var isPartialUpdate = e.changeType === 'update' && e.repaintChangesOnly;
              var isPartialUpdateWithDeleting = isPartialUpdate && e.changeTypes && e.changeTypes.indexOf('remove') >= 0;
              if (e.changeType === 'refresh' && e.items.length || isPartialUpdateWithDeleting) {
                this._updatePageIndexes();
                this._updateFocusedRow(e);
              } else if (e.changeType === 'append' || e.changeType === 'prepend') {
                this._updatePageIndexes();
              } else if (e.changeType === 'update' && e.repaintChangesOnly) {
                this._updateFocusedRow(e);
              }
            }
          },
          _updatePageIndexes: function _updatePageIndexes() {
            var prevRenderingPageIndex = this._lastRenderingPageIndex || 0;
            var renderingPageIndex = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0;
            this._lastRenderingPageIndex = renderingPageIndex;
            this._isPagingByRendering = renderingPageIndex !== prevRenderingPageIndex;
          },
          isPagingByRendering: function isPagingByRendering() {
            return this._isPagingByRendering;
          },
          _updateFocusedRow: function _updateFocusedRow(e) {
            var operationTypes = e.operationTypes || {};
            var focusController = this.getController('focus');
            var reload = operationTypes.reload,
                fullReload = operationTypes.fullReload,
                pageIndex = operationTypes.pageIndex,
                paging = operationTypes.paging;
            var keyboardController = this.getController('keyboardNavigation');
            // @ts-expect-error
            var isVirtualScrolling = keyboardController._isVirtualScrolling();
            var pagingWithoutVirtualScrolling = paging && !isVirtualScrolling;
            var focusedRowKey = this.option('focusedRowKey');
            var isAutoNavigate = focusController.isAutoNavigateToFocusedRow();
            var isReload = reload && pageIndex === false;
            if (isReload && !fullReload && (0, _type.isDefined)(focusedRowKey)) {
              // @ts-expect-error
              focusController._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
                if (focusedRowIndex < 0) {
                  // @ts-expect-error
                  focusController._focusRowByIndex(undefined, operationTypes);
                }
              });
            } else if (pagingWithoutVirtualScrolling && isAutoNavigate) {
              var rowIndexByKey = this.getRowIndexByKey(focusedRowKey);
              var focusedRowIndex = this.option('focusedRowIndex');
              var isValidRowIndexByKey = rowIndexByKey >= 0;
              var isValidFocusedRowIndex = focusedRowIndex >= 0;
              var isSameRowIndex = focusedRowIndex === rowIndexByKey;
              if (isValidFocusedRowIndex && (isSameRowIndex || !isValidRowIndexByKey)) {
                // @ts-expect-error
                focusController._focusRowByIndex(focusedRowIndex, operationTypes);
              }
            } else if (pagingWithoutVirtualScrolling && !isAutoNavigate && this.getRowIndexByKey(focusedRowKey) < 0) {
              this.option('focusedRowIndex', -1);
            } else if (operationTypes.fullReload) {
              // @ts-expect-error
              focusController._focusRowByKeyOrIndex();
            }
          },
          getPageIndexByKey: function getPageIndexByKey(key) {
            var that = this;
            // @ts-expect-error
            var d = new _deferred.Deferred();
            that.getGlobalRowIndexByKey(key).done(function (globalIndex) {
              d.resolve(globalIndex >= 0 ? Math.floor(globalIndex / that.pageSize()) : -1);
            }).fail(d.reject);
            return d.promise();
          },
          getGlobalRowIndexByKey: function getGlobalRowIndexByKey(key) {
            if (this._dataSource.group()) {
              return this._calculateGlobalRowIndexByGroupedData(key);
            }
            return this._calculateGlobalRowIndexByFlatData(key);
          },
          _calculateGlobalRowIndexByFlatData: function _calculateGlobalRowIndexByFlatData(key, groupFilter, useGroup) {
            var that = this;
            // @ts-expect-error
            var deferred = new _deferred.Deferred();
            var dataSource = that._dataSource;
            if (Array.isArray(key)) {
              return deferred.resolve(-1).promise();
            }
            var filter = that._generateFilterByKey(key);
            dataSource.load({
              filter: that._concatWithCombinedFilter(filter),
              skip: 0,
              take: 1
            }).done(function (data) {
              if (data.length > 0) {
                filter = that._generateOperationFilterByKey(key, data[0], useGroup);
                dataSource.load({
                  filter: that._concatWithCombinedFilter(filter, groupFilter),
                  skip: 0,
                  take: 1,
                  requireTotalCount: true
                }).done(function (_, extra) {
                  deferred.resolve(extra.totalCount);
                });
              } else {
                deferred.resolve(-1);
              }
            });
            return deferred.promise();
          },
          _concatWithCombinedFilter: function _concatWithCombinedFilter(filter, groupFilter) {
            var combinedFilter = this.getCombinedFilter();
            return _uiGrid_core2.default.combineFilters([filter, combinedFilter, groupFilter]);
          },
          _generateBooleanFilter: function _generateBooleanFilter(selector, value, sortInfo) {
            var desc = sortInfo.desc;
            switch (true) {
              case value === false && desc:
                return [selector, '=', true];
              case value === false && !desc:
                return [selector, '=', null];
              case value === true && !desc:
              case !(0, _type.isBoolean)(value) && desc:
                return [selector, '<>', value];
              default:
                return undefined;
            }
          },
          // TODO Vinogradov: Move this method implementation to the UiGridCoreFocusUtils
          // and cover with unit tests.
          _generateOperationFilterByKey: function _generateOperationFilterByKey(key, rowData, useGroup) {
            var that = this;
            var dateSerializationFormat = that.option('dateSerializationFormat');
            var isRemoteFiltering = that._dataSource.remoteOperations().filtering;
            var filter = that._generateFilterByKey(key, '<');
            var sort = that._columnsController.getSortDataSourceParameters(!isRemoteFiltering, true);
            if (useGroup) {
              var group = that._columnsController.getGroupDataSourceParameters(!isRemoteFiltering);
              if (group) {
                sort = sort ? group.concat(sort) : group;
              }
            }
            if (sort) {
              sort.slice().reverse().forEach(function (sortInfo) {
                var selector = sortInfo.selector,
                    desc = sortInfo.desc,
                    compare = sortInfo.compare;
                var _UiGridCoreFocusUtils = _uiGrid_coreFocus.UiGridCoreFocusUtils.getSortFilterValue(sortInfo, rowData, {
                  isRemoteFiltering: isRemoteFiltering,
                  dateSerializationFormat: dateSerializationFormat,
                  getSelector: function getSelector(selector) {
                    return that._columnsController.columnOption(selector, 'selector');
                  }
                }),
                    getter = _UiGridCoreFocusUtils.getter,
                    rawValue = _UiGridCoreFocusUtils.rawValue,
                    safeValue = _UiGridCoreFocusUtils.safeValue;
                filter = [[selector, '=', safeValue], 'and', filter];
                if (rawValue === null || (0, _type.isBoolean)(rawValue)) {
                  var booleanFilter = that._generateBooleanFilter(selector, safeValue, desc);
                  if (booleanFilter) {
                    filter = [booleanFilter, 'or', filter];
                  }
                } else {
                  var filterOperation = desc ? '>' : '<';
                  var sortFilter;
                  if (compare) {
                    sortFilter = function sortFilter(data) {
                      if (filterOperation === '<') {
                        return compare(rawValue, getter(data)) >= 1;
                      } else {
                        return compare(rawValue, getter(data)) <= -1;
                      }
                    };
                  } else {
                    sortFilter = [selector, filterOperation, safeValue];
                    if (!desc) {
                      sortFilter = [sortFilter, 'or', [selector, '=', null]];
                    }
                  }
                  filter = [sortFilter, 'or', filter];
                }
              });
            }
            return filter;
          },
          _generateFilterByKey: function _generateFilterByKey(key, operation) {
            var dataSourceKey = this._dataSource.key();
            var filter = [];
            if (!operation) {
              operation = '=';
            }
            if (Array.isArray(dataSourceKey)) {
              for (var i = 0; i < dataSourceKey.length; ++i) {
                var keyPart = key[dataSourceKey[i]];
                if (keyPart) {
                  if (filter.length > 0) {
                    filter.push('and');
                  }
                  filter.push([dataSourceKey[i], operation, keyPart]);
                }
              }
            } else {
              filter = [dataSourceKey, operation, key];
            }
            return filter;
          },
          _getLastItemIndex: function _getLastItemIndex() {
            return this.items(true).length - 1;
          }
        },
        editing: {
          _deleteRowCore: function _deleteRowCore(rowIndex) {
            var _this7 = this;
            var deferred = this.callBase.apply(this, arguments);
            var dataController = this.getController('data');
            var rowKey = dataController.getKeyByRowIndex(rowIndex);
            deferred.done(function () {
              var rowIndex = dataController.getRowIndexByKey(rowKey);
              var visibleRows = dataController.getVisibleRows();
              if (rowIndex === -1 && !visibleRows.length) {
                // @ts-expect-error
                _this7.getController('focus')._resetFocusedRow();
              }
            });
          }
        }
      },
      views: {
        rowsView: {
          _createRow: function _createRow(row) {
            var $row = this.callBase.apply(this, arguments);
            if (this.option('focusedRowEnabled') && row) {
              if (this.getController('focus').isRowFocused(row.key)) {
                $row.addClass(ROW_FOCUSED_CLASS);
              }
            }
            return $row;
          },
          _checkRowKeys: function _checkRowKeys(options) {
            this.callBase.apply(this, arguments);
            if (this.option('focusedRowEnabled') && this.option('dataSource')) {
              var store = this._dataController.store();
              if (store && !store.key()) {
                this._dataController.fireError('E1042', 'Row focusing');
              }
            }
          },
          _update: function _update(change) {
            if (change.changeType === 'updateFocusedRow') {
              if (this.option('focusedRowEnabled')) {
                this.getController('focus').updateFocusedRow(change);
              }
            } else {
              this.callBase(change);
            }
          },
          updateFocusElementTabIndex: function updateFocusElementTabIndex($cellElements, preventScroll) {
            var rowIndex = this.getController('keyboardNavigation').getVisibleRowIndex();
            var row = this._dataController.getVisibleRows()[rowIndex];
            if (this.option('focusedRowEnabled') && !(row !== null && row !== void 0 && row.isNewRow)) {
              this._setFocusedRowElementTabIndex(preventScroll);
            } else {
              this.callBase($cellElements);
            }
          },
          _setFocusedRowElementTabIndex: function _setFocusedRowElementTabIndex(preventScroll) {
            var _this8 = this;
            var focusedRowKey = this.option('focusedRowKey');
            var tabIndex = this.option('tabIndex') || 0;
            var dataController = this._dataController;
            var columnsController = this._columnsController;
            var rowIndex = dataController.getRowIndexByKey(focusedRowKey);
            var columnIndex = this.option('focusedColumnIndex');
            var $row = this._findRowElementForTabIndex();
            if (!(0, _type.isDefined)(this._scrollToFocusOnResize)) {
              this._scrollToFocusOnResize = function () {
                _this8.scrollToElementVertically(_this8._findRowElementForTabIndex());
                _this8.resizeCompleted.remove(_this8._scrollToFocusOnResize);
              };
            }
            $row.attr('tabIndex', tabIndex);
            if (rowIndex >= 0 && !preventScroll) {
              if (columnIndex < 0) {
                columnIndex = 0;
              }
              rowIndex += dataController.getRowIndexOffset();
              columnIndex += columnsController.getColumnIndexOffset();
              this.getController('keyboardNavigation').setFocusedCellPosition(rowIndex, columnIndex);
              if (this.getController('focus').isAutoNavigateToFocusedRow()) {
                var dataSource = dataController.dataSource();
                var operationTypes = dataSource && dataSource.operationTypes();
                if (operationTypes && !operationTypes.paging && !dataController.isPagingByRendering()) {
                  this.resizeCompleted.remove(this._scrollToFocusOnResize);
                  this.resizeCompleted.add(this._scrollToFocusOnResize);
                }
              }
            }
          },
          _findRowElementForTabIndex: function _findRowElementForTabIndex() {
            var focusedRowKey = this.option('focusedRowKey');
            var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
            return (0, _renderer.default)(this.getRowElement(rowIndex >= 0 ? rowIndex : 0));
          },
          scrollToRowElement: function scrollToRowElement(key) {
            var rowIndex = this.getController('data').getRowIndexByKey(key);
            var $row = (0, _renderer.default)(this.getRow(rowIndex));
            return this.scrollToElementVertically($row);
          },
          scrollToElementVertically: function scrollToElementVertically($row) {
            var scrollable = this.getScrollable();
            if (scrollable && $row.length) {
              var position = scrollable.getScrollElementPosition($row, 'vertical');
              return this.scrollTopPosition(position);
            }

            // @ts-expect-error
            return new _deferred.Deferred().resolve();
          },
          scrollTopPosition: function scrollTopPosition(scrollTop) {
            // @ts-expect-error
            var d = new _deferred.Deferred();
            var scrollable = this.getScrollable();
            if (scrollable) {
              var currentScrollTop = scrollable.scrollTop();
              var scrollHandler = function scrollHandler() {
                scrollable.off('scroll', scrollHandler);
                d.resolve();
              };
              if (scrollTop !== currentScrollTop) {
                scrollable.on('scroll', scrollHandler);
                this._dataController.resetFilterApplying();
                scrollable.scrollTo({
                  top: scrollTop
                });
                return d.promise();
              }
            }
            return d.resolve();
          }
        }
      }
    }
  };
  exports.focusModule = focusModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./ui.grid_core.modules","../../core/utils/iterator","./ui.grid_core.utils","../../core/utils/common","../../core/utils/type","../../core/utils/deferred","./ui.grid_core.focus.utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./ui.grid_core.modules"), require("../../core/utils/iterator"), require("./ui.grid_core.utils"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/deferred"), require("./ui.grid_core.focus.utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.focus.js.map