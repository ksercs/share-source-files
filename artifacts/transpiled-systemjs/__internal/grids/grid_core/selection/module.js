!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/selection/module.js"], ["../../../../core/renderer","../../../../events/core/events_engine","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../core/utils/support","../../../../events/click","../../../../localization/message","../../../../events/utils/index","../../../../events/hold","../../../../ui/selection/selection","../../../../core/utils/deferred","../../../../ui/widget/ui.errors","../../../../core/utils/common","../module_utils","../modules"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/selection/module.js", ["../../../../core/renderer", "../../../../events/core/events_engine", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../core/utils/extend", "../../../../core/utils/support", "../../../../events/click", "../../../../localization/message", "../../../../events/utils/index", "../../../../events/hold", "../../../../ui/selection/selection", "../../../../core/utils/deferred", "../../../../ui/widget/ui.errors", "../../../../core/utils/common", "../module_utils", "../modules"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectionModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _extend = $__require("../../../../core/utils/extend");
  var _support = $__require("../../../../core/utils/support");
  var _click = $__require("../../../../events/click");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _index = $__require("../../../../events/utils/index");
  var _hold = _interopRequireDefault($__require("../../../../events/hold"));
  var _selection = _interopRequireDefault($__require("../../../../ui/selection/selection"));
  var _deferred = $__require("../../../../core/utils/deferred");
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.errors"));
  var _common = $__require("../../../../core/utils/common");
  var _module_utils = _interopRequireDefault($__require("../module_utils"));
  var _modules = _interopRequireDefault($__require("../modules"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var EDITOR_CELL_CLASS = 'dx-editor-cell';
  var ROW_CLASS = 'dx-row';
  var ROW_SELECTION_CLASS = 'dx-selection';
  var SELECT_CHECKBOX_CLASS = 'dx-select-checkbox';
  var CHECKBOXES_HIDDEN_CLASS = 'dx-select-checkboxes-hidden';
  var COMMAND_SELECT_CLASS = 'dx-command-select';
  var SELECTION_DISABLED_CLASS = 'dx-selection-disabled';
  var DATA_ROW_CLASS = 'dx-data-row';
  var SHOW_CHECKBOXES_MODE = 'selection.showCheckBoxesMode';
  var SELECTION_MODE = 'selection.mode';
  var processLongTap = function processLongTap(that, dxEvent) {
    var selectionController = that.getController('selection');
    var rowsView = that.getView('rowsView');
    var $row = (0, _renderer.default)(dxEvent.target).closest(".".concat(DATA_ROW_CLASS));
    var rowIndex = rowsView.getRowIndex($row);
    if (rowIndex < 0) return;
    if (that.option(SHOW_CHECKBOXES_MODE) === 'onLongTap') {
      if (selectionController.isSelectionWithCheckboxes()) {
        selectionController.stopSelectionWithCheckboxes();
      } else {
        selectionController.startSelectionWithCheckboxes();
      }
    } else {
      if (that.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
        selectionController.startSelectionWithCheckboxes();
      }
      if (that.option(SHOW_CHECKBOXES_MODE) !== 'always') {
        selectionController.changeItemSelection(rowIndex, {
          control: true
        });
      }
    }
  };
  var SelectionController = _modules.default.Controller.inherit(function () {
    var isSeveralRowsSelected = function isSeveralRowsSelected(that, selectionFilter) {
      var keyIndex = 0;
      var store = that._dataController.store();
      var key = store && store.key();
      var isComplexKey = Array.isArray(key);
      if (!selectionFilter.length) {
        return false;
      }
      if (isComplexKey && Array.isArray(selectionFilter[0]) && selectionFilter[1] === 'and') {
        for (var i = 0; i < selectionFilter.length; i++) {
          if (Array.isArray(selectionFilter[i])) {
            if (selectionFilter[i][0] !== key[keyIndex] || selectionFilter[i][1] !== '=') {
              return true;
            }
            keyIndex++;
          }
        }
        return false;
      }
      return key !== selectionFilter[0];
    };
    var selectionCellTemplate = function selectionCellTemplate(container, options) {
      var component = options.component;
      var rowsView = component.getView('rowsView');
      if (component.option('renderAsync') && !component.option('selection.deferred')) {
        options.value = component.isRowSelected(options.row.key);
      }
      rowsView.renderSelectCheckBoxContainer((0, _renderer.default)(container), options);
    };
    var selectionHeaderTemplate = function selectionHeaderTemplate(container, options) {
      var column = options.column;
      var $cellElement = (0, _renderer.default)(container);
      var columnHeadersView = options.component.getView('columnHeadersView');
      $cellElement.addClass(EDITOR_CELL_CLASS);
      columnHeadersView._renderSelectAllCheckBox($cellElement, column);
      columnHeadersView._attachSelectAllCheckBoxClickEvent($cellElement);
    };
    return {
      init: function init() {
        var _ref = this.option('selection') || {},
            deferred = _ref.deferred,
            selectAllMode = _ref.selectAllMode,
            mode = _ref.mode;
        if (this.option('scrolling.mode') === 'infinite' && !deferred && mode === 'multiple' && selectAllMode === 'allPages') {
          _ui.default.log('W1018');
        }
        this._dataController = this.getController('data');
        this._selectionMode = mode;
        this._isSelectionWithCheckboxes = false;
        this._selection = this._createSelection();
        this._updateSelectColumn();
        this.createAction('onSelectionChanged', {
          excludeValidators: ['disabled', 'readOnly']
        });
        this._dataController && this._dataController.pushed.add(this._handleDataPushed.bind(this));
      },
      _handleDataPushed: function _handleDataPushed(changes) {
        var removedKeys = changes.filter(function (change) {
          return change.type === 'remove';
        }).map(function (change) {
          return change.key;
        });
        if (this.option('selection.deferred')) {
          var selectedKeys = this._dataController.items().filter(function (item) {
            return item.isSelected;
          }).map(function (item) {
            return item.key;
          });
          removedKeys = removedKeys.filter(function (key) {
            return selectedKeys.find(function (selectedKey) {
              return (0, _common.equalByValue)(selectedKey, key);
            });
          });
        }
        removedKeys.length && this.deselectRows(removedKeys);
      },
      _getSelectionConfig: function _getSelectionConfig() {
        var dataController = this._dataController;
        var columnsController = this.getController('columns');
        var selectionOptions = this.option('selection') || {};
        var deferred = selectionOptions.deferred;
        var scrollingMode = this.option('scrolling.mode');
        var virtualPaging = scrollingMode === 'virtual' || scrollingMode === 'infinite';
        var allowSelectAll = this.option('selection.allowSelectAll');
        var legacyScrollingMode = this.option('scrolling.legacyMode');
        return {
          selectedKeys: this.option('selectedRowKeys'),
          mode: this._selectionMode,
          deferred: deferred,
          maxFilterLengthInRequest: selectionOptions.maxFilterLengthInRequest,
          selectionFilter: this.option('selectionFilter'),
          ignoreDisabledItems: true,
          allowLoadByRange: function allowLoadByRange() {
            var hasGroupColumns = columnsController.getGroupColumns().length > 0;
            return virtualPaging && !legacyScrollingMode && !hasGroupColumns && allowSelectAll && !deferred;
          },
          key: function key() {
            return dataController === null || dataController === void 0 ? void 0 : dataController.key();
          },
          keyOf: function keyOf(item) {
            return dataController === null || dataController === void 0 ? void 0 : dataController.keyOf(item);
          },
          dataFields: function dataFields() {
            var _a;
            return (_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.select();
          },
          load: function load(options) {
            var _a;
            // @ts-expect-error
            return ((_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.load(options)) || new _deferred.Deferred().resolve([]);
          },
          plainItems: function plainItems() {
            return dataController.items(true);
          },
          isItemSelected: function isItemSelected(item) {
            return item.selected;
          },
          isSelectableItem: function isSelectableItem(item) {
            return (item === null || item === void 0 ? void 0 : item.rowType) === 'data' && !item.isNewRow;
          },
          getItemData: function getItemData(item) {
            return (0, _type.isDefined)(item === null || item === void 0 ? void 0 : item.rowType) ? (item === null || item === void 0 ? void 0 : item.oldData) || (item === null || item === void 0 ? void 0 : item.data) : item;
          },
          filter: function filter() {
            return dataController.getCombinedFilter(deferred);
          },
          totalCount: function totalCount() {
            return dataController.totalCount();
          },
          getLoadOptions: function getLoadOptions(loadItemIndex, focusedItemIndex, shiftItemIndex) {
            var _a, _b;
            var _ref2 = (_b = (_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.lastLoadOptions()) !== null && _b !== void 0 ? _b : {},
                sort = _ref2.sort,
                filter = _ref2.filter;
            var minIndex = Math.min(loadItemIndex, focusedItemIndex);
            var maxIndex = Math.max(loadItemIndex, focusedItemIndex);
            if ((0, _type.isDefined)(shiftItemIndex)) {
              minIndex = Math.min(shiftItemIndex, minIndex);
              maxIndex = Math.max(shiftItemIndex, maxIndex);
            }
            var take = maxIndex - minIndex + 1;
            return {
              skip: minIndex,
              take: take,
              filter: filter,
              sort: sort
            };
          },
          onSelectionChanged: this._updateSelectedItems.bind(this)
        };
      },
      _updateSelectColumn: function _updateSelectColumn() {
        var columnsController = this.getController('columns');
        var isSelectColumnVisible = this.isSelectColumnVisible();
        columnsController.addCommandColumn({
          type: 'selection',
          command: 'select',
          visible: isSelectColumnVisible,
          visibleIndex: -1,
          dataType: 'boolean',
          alignment: 'center',
          cssClass: COMMAND_SELECT_CLASS,
          width: 'auto',
          cellTemplate: selectionCellTemplate,
          headerCellTemplate: selectionHeaderTemplate
        });
        columnsController.columnOption('command:select', 'visible', isSelectColumnVisible);
      },
      _createSelection: function _createSelection() {
        var options = this._getSelectionConfig();
        return new _selection.default(options);
      },
      _fireSelectionChanged: function _fireSelectionChanged(options) {
        var argument = this.option('selection.deferred') ? {
          selectionFilter: this.option('selectionFilter')
        } : {
          selectedRowKeys: this.option('selectedRowKeys')
        };
        this.selectionChanged.fire(argument);
        if (options) {
          this.executeAction('onSelectionChanged', options);
        }
      },
      _updateCheckboxesState: function _updateCheckboxesState(options) {
        var isDeferredMode = options.isDeferredMode;
        var selectionFilter = options.selectionFilter;
        var selectedItemKeys = options.selectedItemKeys;
        var removedItemKeys = options.removedItemKeys;
        if (this.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
          if (isDeferredMode ? selectionFilter && isSeveralRowsSelected(this, selectionFilter) : selectedItemKeys.length > 1) {
            this.startSelectionWithCheckboxes();
          } else if (isDeferredMode ? selectionFilter && !selectionFilter.length : selectedItemKeys.length === 0 && removedItemKeys.length) {
            this.stopSelectionWithCheckboxes();
          }
        }
      },
      _updateSelectedItems: function _updateSelectedItems(args) {
        var that = this;
        var selectionChangedOptions;
        var isDeferredMode = that.option('selection.deferred');
        var selectionFilter = that._selection.selectionFilter();
        var dataController = that._dataController;
        var items = dataController.items(true);
        var visibleItems = dataController.items();
        if (!items) {
          return;
        }
        var isSelectionWithCheckboxes = that.isSelectionWithCheckboxes();
        var changedItemIndexes = that.getChangedItemIndexes(items);
        var visibleChangedItemIndexes = that.getChangedItemIndexes(visibleItems);
        that._updateCheckboxesState({
          selectedItemKeys: args.selectedItemKeys,
          removedItemKeys: args.removedItemKeys,
          selectionFilter: selectionFilter,
          isDeferredMode: isDeferredMode
        });
        if (changedItemIndexes.length || isSelectionWithCheckboxes !== that.isSelectionWithCheckboxes()) {
          dataController.updateItems({
            changeType: 'updateSelection',
            itemIndexes: visibleChangedItemIndexes
          });
        }
        if (isDeferredMode) {
          that.option('selectionFilter', selectionFilter);
          selectionChangedOptions = {};
        } else if (args.addedItemKeys.length || args.removedItemKeys.length) {
          that._selectedItemsInternalChange = true;
          that.option('selectedRowKeys', args.selectedItemKeys.slice(0));
          that._selectedItemsInternalChange = false;
          selectionChangedOptions = {
            selectedRowsData: args.selectedItems.slice(0),
            selectedRowKeys: args.selectedItemKeys.slice(0),
            currentSelectedRowKeys: args.addedItemKeys.slice(0),
            currentDeselectedRowKeys: args.removedItemKeys.slice(0)
          };
        }
        that._fireSelectionChanged(selectionChangedOptions);
      },
      getChangedItemIndexes: function getChangedItemIndexes(items) {
        var that = this;
        var itemIndexes = [];
        var isDeferredSelection = this.option('selection.deferred');
        for (var i = 0, length = items.length; i < length; i++) {
          var row = items[i];
          var isItemSelected = that.isRowSelected(isDeferredSelection ? row.data : row.key);
          if (that._selection.isDataItem(row) && row.isSelected !== isItemSelected) {
            itemIndexes.push(i);
          }
        }
        return itemIndexes;
      },
      callbackNames: function callbackNames() {
        return ['selectionChanged'];
      },
      optionChanged: function optionChanged(args) {
        var _this = this;
        this.callBase(args);
        // eslint-disable-next-line default-case
        switch (args.name) {
          case 'selection':
            {
              var oldSelectionMode = this._selectionMode;
              this.init();
              if (args.fullName !== 'selection.showCheckBoxesMode') {
                var selectionMode = this._selectionMode;
                var selectedRowKeys = this.option('selectedRowKeys');
                if (oldSelectionMode !== selectionMode) {
                  if (selectionMode === 'single') {
                    if (selectedRowKeys.length > 1) {
                      selectedRowKeys = [selectedRowKeys[0]];
                    }
                  } else if (selectionMode !== 'multiple') {
                    selectedRowKeys = [];
                  }
                }
                this.selectRows(selectedRowKeys).always(function () {
                  _this._fireSelectionChanged();
                });
              }
              this.getController('columns').updateColumns();
              args.handled = true;
              break;
            }
          case 'selectionFilter':
            this._selection.selectionFilter(args.value);
            args.handled = true;
            break;
          case 'selectedRowKeys':
            {
              var value = args.value || [];
              if (Array.isArray(value) && !this._selectedItemsInternalChange && (this.component.getDataSource() || !value.length)) {
                this.selectRows(value);
              }
              args.handled = true;
              break;
            }
        }
      },
      publicMethods: function publicMethods() {
        return ['selectRows', 'deselectRows', 'selectRowsByIndexes', 'getSelectedRowKeys', 'getSelectedRowsData', 'clearSelection', 'selectAll', 'deselectAll', 'startSelectionWithCheckboxes', 'stopSelectionWithCheckboxes', 'isRowSelected'];
      },
      isRowSelected: function isRowSelected(arg) {
        return this._selection.isItemSelected(arg);
      },
      isSelectColumnVisible: function isSelectColumnVisible() {
        return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this.option(SHOW_CHECKBOXES_MODE) === 'onClick' || this._isSelectionWithCheckboxes);
      },
      _isOnePageSelectAll: function _isOnePageSelectAll() {
        return this.option('selection.selectAllMode') === 'page';
      },
      isSelectAll: function isSelectAll() {
        return this._selection.getSelectAllState(this._isOnePageSelectAll());
      },
      selectAll: function selectAll() {
        if (this.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
          this.startSelectionWithCheckboxes();
        }
        return this._selection.selectAll(this._isOnePageSelectAll());
      },
      deselectAll: function deselectAll() {
        return this._selection.deselectAll(this._isOnePageSelectAll());
      },
      clearSelection: function clearSelection() {
        return this.selectedItemKeys([]);
      },
      refresh: function refresh() {
        var selectedRowKeys = this.option('selectedRowKeys') || [];
        if (!this.option('selection.deferred') && selectedRowKeys.length) {
          return this.selectedItemKeys(selectedRowKeys);
        }
        // @ts-expect-error
        return new _deferred.Deferred().resolve().promise();
      },
      selectedItemKeys: function selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
        return this._selection.selectedItemKeys(value, preserve, isDeselect, isSelectAll);
      },
      getSelectedRowKeys: function getSelectedRowKeys() {
        return this._selection.getSelectedItemKeys();
      },
      selectRows: function selectRows(keys, preserve) {
        return this.selectedItemKeys(keys, preserve);
      },
      deselectRows: function deselectRows(keys) {
        return this.selectedItemKeys(keys, true, true);
      },
      selectRowsByIndexes: function selectRowsByIndexes(indexes) {
        var items = this._dataController.items();
        var keys = [];
        if (!Array.isArray(indexes)) {
          indexes = Array.prototype.slice.call(arguments, 0);
        }
        (0, _iterator.each)(indexes, function () {
          var item = items[this];
          if (item && item.rowType === 'data') {
            keys.push(item.key);
          }
        });
        return this.selectRows(keys);
      },
      getSelectedRowsData: function getSelectedRowsData() {
        return this._selection.getSelectedItems();
      },
      changeItemSelection: function changeItemSelection(visibleItemIndex, keys, setFocusOnly) {
        keys = keys || {};
        if (this.isSelectionWithCheckboxes()) {
          keys.control = true;
        }
        var loadedItemIndex = visibleItemIndex + this._dataController.getRowIndexOffset() - this._dataController.getRowIndexOffset(true);
        return this._selection.changeItemSelection(loadedItemIndex, keys, setFocusOnly);
      },
      focusedItemIndex: function focusedItemIndex(itemIndex) {
        var that = this;
        if ((0, _type.isDefined)(itemIndex)) {
          that._selection._focusedItemIndex = itemIndex;
        } else {
          return that._selection._focusedItemIndex;
        }
      },
      isSelectionWithCheckboxes: function isSelectionWithCheckboxes() {
        return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this._isSelectionWithCheckboxes);
      },
      startSelectionWithCheckboxes: function startSelectionWithCheckboxes() {
        var that = this;
        if (that.option(SELECTION_MODE) === 'multiple' && !that.isSelectionWithCheckboxes()) {
          that._isSelectionWithCheckboxes = true;
          that._updateSelectColumn();
          return true;
        }
        return false;
      },
      stopSelectionWithCheckboxes: function stopSelectionWithCheckboxes() {
        var that = this;
        if (that._isSelectionWithCheckboxes) {
          that._isSelectionWithCheckboxes = false;
          that._updateSelectColumn();
          return true;
        }
        return false;
      }
    };
  }());
  var selectionModule = {
    defaultOptions: function defaultOptions() {
      return {
        selection: {
          mode: 'none',
          showCheckBoxesMode: 'onClick',
          allowSelectAll: true,
          selectAllMode: 'allPages',
          maxFilterLengthInRequest: 1500,
          deferred: false
        },
        selectionFilter: [],
        selectedRowKeys: []
      };
    },
    controllers: {
      selection: SelectionController
    },
    extenders: {
      controllers: {
        data: {
          init: function init() {
            var selectionController = this.getController('selection');
            var isDeferredMode = this.option('selection.deferred');
            this.callBase.apply(this, arguments);
            if (isDeferredMode) {
              selectionController._updateCheckboxesState({
                isDeferredMode: true,
                selectionFilter: this.option('selectionFilter')
              });
            }
          },
          _loadDataSource: function _loadDataSource() {
            var that = this;
            return that.callBase().always(function () {
              that.getController('selection').refresh();
            });
          },
          _processDataItem: function _processDataItem(item, options) {
            var that = this;
            var selectionController = that.getController('selection');
            var hasSelectColumn = selectionController.isSelectColumnVisible();
            var isDeferredSelection = options.isDeferredSelection = options.isDeferredSelection === undefined ? this.option('selection.deferred') : options.isDeferredSelection;
            var dataItem = this.callBase.apply(this, arguments);
            dataItem.isSelected = selectionController.isRowSelected(isDeferredSelection ? dataItem.data : dataItem.key);
            if (hasSelectColumn && dataItem.values) {
              for (var i = 0; i < options.visibleColumns.length; i++) {
                if (options.visibleColumns[i].command === 'select') {
                  dataItem.values[i] = dataItem.isSelected;
                  break;
                }
              }
            }
            return dataItem;
          },
          refresh: function refresh(options) {
            var that = this;
            // @ts-expect-error
            var d = new _deferred.Deferred();
            this.callBase.apply(this, arguments).done(function () {
              if (!options || options.selection) {
                that.getController('selection').refresh().done(d.resolve).fail(d.reject);
              } else {
                d.resolve();
              }
            }).fail(d.reject);
            return d.promise();
          },
          _handleDataChanged: function _handleDataChanged(e) {
            this.callBase.apply(this, arguments);
            if ((!e || e.changeType === 'refresh') && !this._repaintChangesOnly) {
              this.getController('selection').focusedItemIndex(-1);
            }
          },
          _applyChange: function _applyChange(change) {
            var _this2 = this;
            if (change && change.changeType === 'updateSelection') {
              change.items.forEach(function (item, index) {
                var currentItem = _this2._items[index];
                if (currentItem) {
                  currentItem.isSelected = item.isSelected;
                  currentItem.values = item.values;
                }
              });
              return;
            }
            return this.callBase.apply(this, arguments);
          },
          _endUpdateCore: function _endUpdateCore() {
            var changes = this._changes;
            var isUpdateSelection = changes.length > 1 && changes.every(function (change) {
              return change.changeType === 'updateSelection';
            });
            if (isUpdateSelection) {
              var itemIndexes = changes.map(function (change) {
                return change.itemIndexes || [];
              }).reduce(function (a, b) {
                return a.concat(b);
              });
              this._changes = [{
                changeType: 'updateSelection',
                itemIndexes: itemIndexes
              }];
            }
            this.callBase.apply(this, arguments);
          }
        },
        contextMenu: {
          _contextMenuPrepared: function _contextMenuPrepared(options) {
            var dxEvent = options.event;
            if (dxEvent.originalEvent && dxEvent.originalEvent.type !== 'dxhold' || options.items && options.items.length > 0) return;
            processLongTap(this, dxEvent);
          }
        }
      },
      views: {
        columnHeadersView: {
          init: function init() {
            var that = this;
            that.callBase();
            that.getController('selection').selectionChanged.add(that._updateSelectAllValue.bind(that));
          },
          _updateSelectAllValue: function _updateSelectAllValue() {
            var that = this;
            var $element = that.element();
            var $editor = $element && $element.find(".".concat(SELECT_CHECKBOX_CLASS));
            if ($element && $editor.length && that.option('selection.mode') === 'multiple') {
              var selectAllValue = that.getController('selection').isSelectAll();
              var hasSelection = selectAllValue !== false;
              var isVisible = that.option('selection.allowSelectAll') ? !that.getController('data').isEmpty() : hasSelection;
              $editor.dxCheckBox('instance').option({
                visible: isVisible,
                value: selectAllValue
              });
            }
          },
          _handleDataChanged: function _handleDataChanged(e) {
            var _this3 = this;
            this.callBase(e);
            if (!e || e.changeType === 'refresh' || e.repaintChangesOnly && e.changeType === 'update') {
              this.waitAsyncTemplates().done(function () {
                _this3._updateSelectAllValue();
              });
            }
          },
          _renderSelectAllCheckBox: function _renderSelectAllCheckBox($container, column) {
            var that = this;
            var selectionController = that.getController('selection');
            var isEmptyData = that.getController('data').isEmpty();
            var groupElement = (0, _renderer.default)('<div>').appendTo($container).addClass(SELECT_CHECKBOX_CLASS);
            that.setAria('label', _message.default.format('dxDataGrid-ariaSelectAll'), groupElement);
            that.getController('editorFactory').createEditor(groupElement, (0, _extend.extend)({}, column, {
              parentType: 'headerRow',
              dataType: 'boolean',
              value: selectionController.isSelectAll(),
              editorOptions: {
                visible: !isEmptyData && (that.option('selection.allowSelectAll') || selectionController.isSelectAll() !== false)
              },
              tabIndex: that.option('useLegacyKeyboardNavigation') ? -1 : that.option('tabIndex') || 0,
              setValue: function setValue(value, e) {
                var allowSelectAll = that.option('selection.allowSelectAll');
                e.component.option('visible', allowSelectAll || e.component.option('value') !== false);
                if (!e.event || selectionController.isSelectAll() === value) {
                  return;
                }
                if (e.value && !allowSelectAll) {
                  e.component.option('value', false);
                } else {
                  e.value ? selectionController.selectAll() : selectionController.deselectAll();
                }
                e.event.preventDefault();
              }
            }));
            return groupElement;
          },
          _attachSelectAllCheckBoxClickEvent: function _attachSelectAllCheckBoxClickEvent($element) {
            _events_engine.default.on($element, _click.name, this.createAction(function (e) {
              var event = e.event;
              if (!(0, _renderer.default)(event.target).closest(".".concat(SELECT_CHECKBOX_CLASS)).length) {
                // @ts-expect-error
                _events_engine.default.trigger((0, _renderer.default)(event.currentTarget).children(".".concat(SELECT_CHECKBOX_CLASS)), _click.name);
              }
              event.preventDefault();
            }));
          }
        },
        rowsView: {
          renderSelectCheckBoxContainer: function renderSelectCheckBoxContainer($container, options) {
            if (options.rowType === 'data' && !options.row.isNewRow) {
              $container.addClass(EDITOR_CELL_CLASS);
              this._attachCheckBoxClickEvent($container);
              this._renderSelectCheckBox($container, options);
            } else {
              _module_utils.default.setEmptyText($container);
            }
          },
          _renderSelectCheckBox: function _renderSelectCheckBox(container, options) {
            var groupElement = (0, _renderer.default)('<div>').addClass(SELECT_CHECKBOX_CLASS).appendTo(container);
            this.setAria('label', _message.default.format('dxDataGrid-ariaSelectRow'), groupElement);
            this.getController('editorFactory').createEditor(groupElement, (0, _extend.extend)({}, options.column, {
              parentType: 'dataRow',
              dataType: 'boolean',
              lookup: null,
              value: options.value,
              setValue: function setValue(value, e) {
                var _a;
                if (((_a = e === null || e === void 0 ? void 0 : e.event) === null || _a === void 0 ? void 0 : _a.type) === 'keydown') {
                  // @ts-expect-error
                  _events_engine.default.trigger(e.element, _click.name, e);
                }
              },
              row: options.row
            }));
            return groupElement;
          },
          _attachCheckBoxClickEvent: function _attachCheckBoxClickEvent($element) {
            _events_engine.default.on($element, _click.name, this.createAction(function (e) {
              var selectionController = this.getController('selection');
              var event = e.event;
              var rowIndex = this.getRowIndex((0, _renderer.default)(event.currentTarget).closest(".".concat(ROW_CLASS)));
              if (rowIndex >= 0) {
                selectionController.startSelectionWithCheckboxes();
                selectionController.changeItemSelection(rowIndex, {
                  shift: event.shiftKey
                });
                if ((0, _renderer.default)(event.target).closest(".".concat(SELECT_CHECKBOX_CLASS)).length) {
                  this.getController('data').updateItems({
                    changeType: 'updateSelection',
                    itemIndexes: [rowIndex]
                  });
                }
              }
            }));
          },
          _update: function _update(change) {
            var that = this;
            var tableElements = that.getTableElements();
            if (change.changeType === 'updateSelection') {
              if (tableElements.length > 0) {
                (0, _iterator.each)(tableElements, function (_, tableElement) {
                  (0, _iterator.each)(change.itemIndexes || [], function (_, index) {
                    var $row;
                    // T108078
                    if (change.items[index]) {
                      $row = that._getRowElements((0, _renderer.default)(tableElement)).eq(index);
                      if ($row.length) {
                        var isSelected = change.items[index].isSelected;
                        $row.toggleClass(ROW_SELECTION_CLASS, isSelected === undefined ? false : isSelected).find(".".concat(SELECT_CHECKBOX_CLASS)).dxCheckBox('option', 'value', isSelected);
                        that.setAria('selected', isSelected, $row);
                      }
                    }
                  });
                });
                that._updateCheckboxesClass();
              }
            } else {
              that.callBase(change);
            }
          },
          _createTable: function _createTable() {
            var that = this;
            var selectionMode = that.option('selection.mode');
            var $table = that.callBase.apply(that, arguments);
            if (selectionMode !== 'none') {
              if (that.option(SHOW_CHECKBOXES_MODE) === 'onLongTap' || !_support.touch) {
                // TODO Not working timeout by hold when it is larger than other timeouts by hold
                _events_engine.default.on($table, (0, _index.addNamespace)(_hold.default.name, 'dxDataGridRowsView'), ".".concat(DATA_ROW_CLASS), that.createAction(function (e) {
                  processLongTap(that.component, e.event);
                  e.event.stopPropagation();
                }));
              }
              _events_engine.default.on($table, 'mousedown selectstart', that.createAction(function (e) {
                var event = e.event;
                if (event.shiftKey) {
                  event.preventDefault();
                }
              }));
            }
            return $table;
          },
          _createRow: function _createRow(row) {
            var $row = this.callBase.apply(this, arguments);
            if (row) {
              var isSelected = row.isSelected;
              if (isSelected) {
                $row.addClass(ROW_SELECTION_CLASS);
              }
              var selectionMode = this.option(SELECTION_MODE);
              if (selectionMode !== 'none') {
                this.setAria('selected', isSelected, $row);
              }
            }
            return $row;
          },
          _rowClick: function _rowClick(e) {
            var that = this;
            var dxEvent = e.event;
            var isSelectionDisabled = (0, _renderer.default)(dxEvent.target).closest(".".concat(SELECTION_DISABLED_CLASS)).length;
            if (!that.isClickableElement((0, _renderer.default)(dxEvent.target))) {
              if (!isSelectionDisabled && (that.option(SELECTION_MODE) !== 'multiple' || that.option(SHOW_CHECKBOXES_MODE) !== 'always')) {
                if (that.getController('selection').changeItemSelection(e.rowIndex, {
                  control: (0, _index.isCommandKeyPressed)(dxEvent),
                  shift: dxEvent.shiftKey
                })) {
                  dxEvent.preventDefault();
                  e.handled = true;
                }
              }
              that.callBase(e);
            }
          },
          isClickableElement: function isClickableElement($target) {
            var isCommandSelect = $target.closest(".".concat(COMMAND_SELECT_CLASS)).length;
            return !!isCommandSelect;
          },
          _renderCore: function _renderCore(change) {
            var deferred = this.callBase(change);
            this._updateCheckboxesClass();
            return deferred;
          },
          _updateCheckboxesClass: function _updateCheckboxesClass() {
            var tableElements = this.getTableElements();
            var selectionController = this.getController('selection');
            var isCheckBoxesHidden = selectionController.isSelectColumnVisible() && !selectionController.isSelectionWithCheckboxes();
            (0, _iterator.each)(tableElements, function (_, tableElement) {
              (0, _renderer.default)(tableElement).toggleClass(CHECKBOXES_HIDDEN_CLASS, isCheckBoxesHidden);
            });
          }
        }
      }
    }
  };
  exports.selectionModule = selectionModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../events/core/events_engine","../../../../core/utils/type","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../core/utils/support","../../../../events/click","../../../../localization/message","../../../../events/utils/index","../../../../events/hold","../../../../ui/selection/selection","../../../../core/utils/deferred","../../../../ui/widget/ui.errors","../../../../core/utils/common","../module_utils","../modules"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../events/core/events_engine"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../core/utils/extend"), require("../../../../core/utils/support"), require("../../../../events/click"), require("../../../../localization/message"), require("../../../../events/utils/index"), require("../../../../events/hold"), require("../../../../ui/selection/selection"), require("../../../../core/utils/deferred"), require("../../../../ui/widget/ui.errors"), require("../../../../core/utils/common"), require("../module_utils"), require("../modules"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map