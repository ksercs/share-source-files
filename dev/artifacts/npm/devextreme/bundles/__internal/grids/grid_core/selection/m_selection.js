/**
* DevExtreme (bundles/__internal/grids/grid_core/selection/m_selection.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionModule = exports.SelectionController = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _support = require("../../../../core/utils/support");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _hold = _interopRequireDefault(require("../../../../events/hold"));
var _index = require("../../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _selection = _interopRequireDefault(require("../../../../ui/selection/selection"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
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
var SelectionController = /*#__PURE__*/function (_modules$Controller) {
  _inheritsLoose(SelectionController, _modules$Controller);
  function SelectionController() {
    return _modules$Controller.apply(this, arguments) || this;
  }
  var _proto = SelectionController.prototype;
  _proto.init = function init() {
    var _a;
    // @ts-expect-error
    var _ref = (_a = this.option('selection')) !== null && _a !== void 0 ? _a : {},
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
    if (!this._dataPushedHandler) {
      this._dataPushedHandler = this._handleDataPushed.bind(this);
      this._dataController.pushed.add(this._dataPushedHandler);
    }
  };
  _proto._handleDataPushed = function _handleDataPushed(changes) {
    this._deselectRemovedOnPush(changes);
    this._updateSelectedOnPush(changes);
  };
  _proto._deselectRemovedOnPush = function _deselectRemovedOnPush(changes) {
    var isDeferredSelection = this.option('selection.deferred');
    var removedKeys = changes.filter(function (change) {
      return change.type === 'remove';
    }).map(function (change) {
      return change.key;
    });
    if (isDeferredSelection) {
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
  };
  _proto._updateSelectedOnPush = function _updateSelectedOnPush(changes) {
    var isDeferredSelection = this.option('selection.deferred');
    if (isDeferredSelection) {
      return;
    }
    var updateChanges = changes.filter(function (change) {
      return change.type === 'update';
    });
    var data = this.getSelectedRowsData();
    (0, _array_utils.applyBatch)({
      keyInfo: this._selection.options,
      data,
      changes: updateChanges
    });
  };
  _proto._getSelectionConfig = function _getSelectionConfig() {
    var _a;
    var dataController = this._dataController;
    var columnsController = this.getController('columns');
    var selectionOptions = (_a = this.option('selection')) !== null && _a !== void 0 ? _a : {};
    // @ts-expect-error
    var deferred = selectionOptions.deferred;
    var scrollingMode = this.option('scrolling.mode');
    var virtualPaging = scrollingMode === 'virtual' || scrollingMode === 'infinite';
    var allowSelectAll = this.option('selection.allowSelectAll');
    var legacyScrollingMode = this.option('scrolling.legacyMode');
    return {
      selectedKeys: this.option('selectedRowKeys'),
      mode: this._selectionMode,
      deferred,
      maxFilterLengthInRequest: selectionOptions.maxFilterLengthInRequest,
      selectionFilter: this.option('selectionFilter'),
      ignoreDisabledItems: true,
      allowLoadByRange() {
        var hasGroupColumns = columnsController.getGroupColumns().length > 0;
        return virtualPaging && !legacyScrollingMode && !hasGroupColumns && allowSelectAll && !deferred;
      },
      key() {
        return dataController === null || dataController === void 0 ? void 0 : dataController.key();
      },
      keyOf(item) {
        return dataController === null || dataController === void 0 ? void 0 : dataController.keyOf(item);
      },
      dataFields() {
        var _a;
        return (_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.select();
      },
      load(options) {
        var _a;
        // @ts-expect-error
        return ((_a = dataController.dataSource()) === null || _a === void 0 ? void 0 : _a.load(options)) || new _deferred.Deferred().resolve([]);
      },
      plainItems() {
        return dataController.items(true);
      },
      isItemSelected(item) {
        return item.selected;
      },
      isSelectableItem(item) {
        return (item === null || item === void 0 ? void 0 : item.rowType) === 'data' && !item.isNewRow;
      },
      getItemData(item) {
        return (0, _type.isDefined)(item === null || item === void 0 ? void 0 : item.rowType) ? (item === null || item === void 0 ? void 0 : item.oldData) || (item === null || item === void 0 ? void 0 : item.data) : item;
      },
      filter() {
        return dataController.getCombinedFilter(deferred);
      },
      totalCount: function totalCount() {
        return dataController.totalCount();
      },
      getLoadOptions(loadItemIndex, focusedItemIndex, shiftItemIndex) {
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
          take,
          filter,
          sort
        };
      },
      onSelectionChanged: this._updateSelectedItems.bind(this)
    };
  };
  _proto._updateSelectColumn = function _updateSelectColumn() {
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
  };
  _proto._createSelection = function _createSelection() {
    var options = this._getSelectionConfig();
    return new _selection.default(options);
  };
  _proto._fireSelectionChanged = function _fireSelectionChanged(options) {
    var argument = this.option('selection.deferred') ? {
      selectionFilter: this.option('selectionFilter')
    } : {
      selectedRowKeys: this.option('selectedRowKeys')
    };
    this.selectionChanged.fire(argument);
    if (options) {
      this.executeAction('onSelectionChanged', options);
    }
  };
  _proto._updateCheckboxesState = function _updateCheckboxesState(options) {
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
  };
  _proto._updateSelectedItems = function _updateSelectedItems(args) {
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
      selectionFilter,
      isDeferredMode
    });
    if (changedItemIndexes.length || isSelectionWithCheckboxes !== that.isSelectionWithCheckboxes()) {
      dataController.updateItems({
        changeType: 'updateSelection',
        itemIndexes: visibleChangedItemIndexes
      });
    }
    if (isDeferredMode) {
      // @ts-expect-error
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
  };
  _proto.getChangedItemIndexes = function getChangedItemIndexes(items) {
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
  };
  _proto.callbackNames = function callbackNames() {
    return ['selectionChanged'];
  };
  _proto.optionChanged = function optionChanged(args) {
    var _this = this;
    _modules$Controller.prototype.optionChanged.call(this, args);
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
  };
  _proto.publicMethods = function publicMethods() {
    return ['selectRows', 'deselectRows', 'selectRowsByIndexes', 'getSelectedRowKeys', 'getSelectedRowsData', 'clearSelection', 'selectAll', 'deselectAll', 'startSelectionWithCheckboxes', 'stopSelectionWithCheckboxes', 'isRowSelected'];
  };
  _proto.isRowSelected = function isRowSelected(arg) {
    return this._selection.isItemSelected(arg);
  };
  _proto.isSelectColumnVisible = function isSelectColumnVisible() {
    return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this.option(SHOW_CHECKBOXES_MODE) === 'onClick' || this._isSelectionWithCheckboxes);
  };
  _proto._isOnePageSelectAll = function _isOnePageSelectAll() {
    return this.option('selection.selectAllMode') === 'page';
  };
  _proto.isSelectAll = function isSelectAll() {
    return this._selection.getSelectAllState(this._isOnePageSelectAll());
  };
  _proto.selectAll = function selectAll() {
    if (this.option(SHOW_CHECKBOXES_MODE) === 'onClick') {
      this.startSelectionWithCheckboxes();
    }
    return this._selection.selectAll(this._isOnePageSelectAll());
  };
  _proto.deselectAll = function deselectAll() {
    return this._selection.deselectAll(this._isOnePageSelectAll());
  };
  _proto.clearSelection = function clearSelection() {
    return this.selectedItemKeys([]);
  };
  _proto.refresh = function refresh() {
    var _a;
    var selectedRowKeys = (_a = this.option('selectedRowKeys')) !== null && _a !== void 0 ? _a : [];
    if (!this.option('selection.deferred') && selectedRowKeys.length) {
      return this.selectedItemKeys(selectedRowKeys);
    }
    // @ts-expect-error
    return new _deferred.Deferred().resolve().promise();
  };
  _proto.selectedItemKeys = function selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
    return this._selection.selectedItemKeys(value, preserve, isDeselect, isSelectAll);
  };
  _proto.getSelectedRowKeys = function getSelectedRowKeys() {
    return this._selection.getSelectedItemKeys();
  };
  _proto.selectRows = function selectRows(keys, preserve) {
    return this.selectedItemKeys(keys, preserve);
  };
  _proto.deselectRows = function deselectRows(keys) {
    return this.selectedItemKeys(keys, true, true);
  };
  _proto.selectRowsByIndexes = function selectRowsByIndexes(indexes) {
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
  };
  _proto.getSelectedRowsData = function getSelectedRowsData() {
    return this._selection.getSelectedItems();
  };
  _proto.loadSelectedItemsWithFilter = function loadSelectedItemsWithFilter() {
    return this._selection.loadSelectedItemsWithFilter();
  };
  _proto.changeItemSelection = function changeItemSelection(visibleItemIndex, keys, setFocusOnly) {
    keys = keys || {};
    if (this.isSelectionWithCheckboxes()) {
      keys.control = true;
    }
    var loadedItemIndex = visibleItemIndex + this._dataController.getRowIndexOffset() - this._dataController.getRowIndexOffset(true);
    return this._selection.changeItemSelection(loadedItemIndex, keys, setFocusOnly);
  };
  _proto.focusedItemIndex = function focusedItemIndex(itemIndex) {
    var that = this;
    if ((0, _type.isDefined)(itemIndex)) {
      that._selection._focusedItemIndex = itemIndex;
    } else {
      return that._selection._focusedItemIndex;
    }
    return undefined;
  };
  _proto.isSelectionWithCheckboxes = function isSelectionWithCheckboxes() {
    return this.option(SELECTION_MODE) === 'multiple' && (this.option(SHOW_CHECKBOXES_MODE) === 'always' || this._isSelectionWithCheckboxes);
  };
  _proto.startSelectionWithCheckboxes = function startSelectionWithCheckboxes() {
    var that = this;
    if (that.option(SELECTION_MODE) === 'multiple' && !that.isSelectionWithCheckboxes()) {
      that._isSelectionWithCheckboxes = true;
      that._updateSelectColumn();
      return true;
    }
    return false;
  };
  _proto.stopSelectionWithCheckboxes = function stopSelectionWithCheckboxes() {
    var that = this;
    if (that._isSelectionWithCheckboxes) {
      that._isSelectionWithCheckboxes = false;
      that._updateSelectColumn();
      return true;
    }
    return false;
  };
  return SelectionController;
}(_m_modules.default.Controller);
exports.SelectionController = SelectionController;
var selectionModule = {
  defaultOptions() {
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
        init() {
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
        _loadDataSource() {
          var that = this;
          return that.callBase().always(function () {
            that.getController('selection').refresh();
          });
        },
        _processDataItem(item, options) {
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
        refresh(options) {
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
        _handleDataChanged(e) {
          this.callBase.apply(this, arguments);
          if ((!e || e.changeType === 'refresh') && !this._repaintChangesOnly) {
            this.getController('selection').focusedItemIndex(-1);
          }
        },
        _applyChange(change) {
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
        _endUpdateCore() {
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
              itemIndexes
            }];
          }
          this.callBase.apply(this, arguments);
        }
      },
      contextMenu: {
        _contextMenuPrepared(options) {
          var dxEvent = options.event;
          if (dxEvent.originalEvent && dxEvent.originalEvent.type !== 'dxhold' || options.items && options.items.length > 0) return;
          processLongTap(this, dxEvent);
        }
      }
    },
    views: {
      columnHeadersView: {
        init() {
          var that = this;
          that.callBase();
          that.getController('selection').selectionChanged.add(that._updateSelectAllValue.bind(that));
        },
        _updateSelectAllValue() {
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
        _handleDataChanged(e) {
          var _this3 = this;
          this.callBase(e);
          if (!e || e.changeType === 'refresh' || e.repaintChangesOnly && e.changeType === 'update') {
            this.waitAsyncTemplates().done(function () {
              _this3._updateSelectAllValue();
            });
          }
        },
        _renderSelectAllCheckBox($container, column) {
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
            setValue(value, e) {
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
        _attachSelectAllCheckBoxClickEvent($element) {
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
        renderSelectCheckBoxContainer($container, options) {
          if (options.rowType === 'data' && !options.row.isNewRow) {
            $container.addClass(EDITOR_CELL_CLASS);
            this._attachCheckBoxClickEvent($container);
            this._renderSelectCheckBox($container, options);
          } else {
            _m_utils.default.setEmptyText($container);
          }
        },
        _renderSelectCheckBox(container, options) {
          var groupElement = (0, _renderer.default)('<div>').addClass(SELECT_CHECKBOX_CLASS).appendTo(container);
          this.setAria('label', _message.default.format('dxDataGrid-ariaSelectRow'), groupElement);
          this.getController('editorFactory').createEditor(groupElement, (0, _extend.extend)({}, options.column, {
            parentType: 'dataRow',
            dataType: 'boolean',
            lookup: null,
            value: options.value,
            setValue(value, e) {
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
        _attachCheckBoxClickEvent($element) {
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
        _update(change) {
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
        _createTable() {
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
        _createRow(row) {
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
        _rowClick(e) {
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
        isClickableElement($target) {
          var isCommandSelect = $target.closest(".".concat(COMMAND_SELECT_CLASS)).length;
          return !!isCommandSelect;
        },
        _renderCore(change) {
          var deferred = this.callBase(change);
          this._updateCheckboxesClass();
          return deferred;
        },
        _updateCheckboxesClass() {
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
