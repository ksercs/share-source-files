"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _uiFile_manager = require("./ui.file_manager.common");
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../data_grid/ui.data_grid"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));
var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.file_actions_button"));
var _deferred = require("../../core/utils/deferred");
var _file_items_controller = require("./file_items_controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = 'dx-filemanager-details';
var FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = 'dx-filemanager-details-item-thumbnail';
var FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = 'dx-filemanager-details-item-name';
var FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = 'dx-filemanager-details-item-name-wrapper';
var FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = 'dx-filemanager-details-item-is-directory';
var FILE_MANAGER_PARENT_DIRECTORY_ITEM = 'dx-filemanager-parent-directory-item';
var DATA_GRID_DATA_ROW_CLASS = 'dx-data-row';
var DEFAULT_COLUMN_CONFIGS = {
  thumbnail: {
    caption: '',
    calculateSortValue: 'isDirectory',
    width: 36,
    alignment: 'center',
    cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
  },
  name: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionName')
  },
  dateModified: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionDateModified'),
    width: 110,
    hidingPriority: 1
  },
  size: {
    caption: _message.default.format('dxFileManager-listDetailsColumnCaptionFileSize'),
    width: 90,
    alignment: 'right',
    hidingPriority: 0
  },
  isParentFolder: {
    caption: 'isParentFolder',
    visible: false,
    sortIndex: 0,
    sortOrder: 'asc'
  }
};
var FileManagerDetailsItemList = /*#__PURE__*/function (_FileManagerItemListB) {
  _inheritsLoose(FileManagerDetailsItemList, _FileManagerItemListB);
  function FileManagerDetailsItemList() {
    return _FileManagerItemListB.apply(this, arguments) || this;
  }
  var _proto = FileManagerDetailsItemList.prototype;
  _proto._initMarkup = function _initMarkup() {
    var _this = this;
    this._itemCount = 0;
    this._focusedItem = null;
    this._hasParentDirectoryItem = false;
    this._parentDirectoryItemKey = null;
    this._selectAllCheckBox = null;
    this._selectAllCheckBoxUpdating = false;
    this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);
    this._createFilesView();
    this._contextMenu.option('onContextMenuHidden', function () {
      return _this._onContextMenuHidden();
    });
    _FileManagerItemListB.prototype._initMarkup.call(this);
  };
  _proto._createFilesView = function _createFilesView() {
    var $filesView = (0, _renderer.default)('<div>').appendTo(this.$element());
    var selectionMode = this._isMultipleSelectionMode() ? 'multiple' : 'none';
    this._filesView = this._createComponent($filesView, _ui.default, {
      dataSource: this._createDataSource(),
      hoverStateEnabled: true,
      selection: {
        mode: selectionMode,
        showCheckBoxesMode: this._isDesktop() ? 'onClick' : 'none'
      },
      selectedRowKeys: this.option('selectedItemKeys'),
      focusedRowKey: this.option('focusedItemKey'),
      focusedRowEnabled: true,
      allowColumnResizing: true,
      scrolling: {
        mode: 'virtual'
      },
      sorting: {
        mode: 'single',
        showSortIndexes: false
      },
      loadPanel: {
        shading: true
      },
      showColumnLines: false,
      showRowLines: false,
      columnHidingEnabled: false,
      columns: this._createColumns(),
      onEditorPreparing: this._onEditorPreparing.bind(this),
      onRowPrepared: this._onRowPrepared.bind(this),
      onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
      onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
      onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
      onOptionChanged: this._onFilesViewOptionChanged.bind(this),
      onContentReady: this._onContentReady.bind(this)
    });
  };
  _proto._createColumns = function _createColumns() {
    var _this2 = this;
    var columns = this.option('detailColumns');
    columns = columns.slice(0);
    columns = columns.map(function (column) {
      var extendedItem = column;
      if ((0, _type.isString)(column)) {
        extendedItem = {
          dataField: column
        };
      }
      return _this2._getPreparedColumn(extendedItem);
    });
    var customizeDetailColumns = this.option('customizeDetailColumns');
    if ((0, _type.isFunction)(customizeDetailColumns)) {
      columns = customizeDetailColumns(columns);
    }
    columns.push(this._getPreparedColumn({
      dataField: 'isParentFolder'
    }));
    columns.forEach(function (column) {
      return _this2._updateColumnDataField(column);
    });
    return columns;
  };
  _proto._getPreparedColumn = function _getPreparedColumn(columnOptions) {
    var result = {};
    var resultCssClass = '';
    if (this._isDefaultColumn(columnOptions.dataField)) {
      var defaultConfig = (0, _extend.extend)(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
      resultCssClass = defaultConfig.cssClass || '';
      switch (columnOptions.dataField) {
        case 'thumbnail':
          defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
          defaultConfig.calculateSortValue = "fileItem.".concat(defaultConfig.calculateSortValue);
          break;
        case 'name':
          defaultConfig.cellTemplate = this._createNameColumnCell.bind(this);
          defaultConfig.caption = _message.default.format('dxFileManager-listDetailsColumnCaptionName');
          break;
        case 'size':
          defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
          defaultConfig.caption = _message.default.format('dxFileManager-listDetailsColumnCaptionFileSize');
          defaultConfig.calculateSortValue = function (rowData) {
            return rowData.fileItem.isDirectory ? -1 : rowData.fileItem.size;
          };
          break;
        case 'dateModified':
          defaultConfig.caption = _message.default.format('dxFileManager-listDetailsColumnCaptionDateModified');
          break;
        default:
          break;
      }
      (0, _extend.extend)(true, result, defaultConfig);
    }
    (0, _uiFile_manager.extendAttributes)(result, columnOptions, ['alignment', 'caption', 'dataField', 'dataType', 'hidingPriority', 'sortIndex', 'sortOrder', 'visible', 'visibleIndex', 'width']);
    if (columnOptions.cssClass) {
      resultCssClass = "".concat(resultCssClass, " ").concat(columnOptions.cssClass);
    }
    if (resultCssClass) {
      result.cssClass = resultCssClass;
    }
    return result;
  };
  _proto._updateColumnDataField = function _updateColumnDataField(column) {
    var dataItemSuffix = this._isDefaultColumn(column.dataField) ? '' : 'dataItem.';
    column.dataField = 'fileItem.' + dataItemSuffix + column.dataField;
    return column;
  };
  _proto._isDefaultColumn = function _isDefaultColumn(columnDataField) {
    return !!DEFAULT_COLUMN_CONFIGS[columnDataField];
  };
  _proto._onFileItemActionButtonClick = function _onFileItemActionButtonClick(_ref) {
    var component = _ref.component,
      element = _ref.element,
      event = _ref.event;
    event.stopPropagation();
    var $row = component.$element().closest(this._getItemSelector());
    var fileItemInfo = $row.data('item');
    this._selectItem(fileItemInfo);
    var target = {
      itemData: fileItemInfo,
      itemElement: $row,
      isActionButton: true
    };
    var items = this._getFileItemsForContextMenu(fileItemInfo);
    this._showContextMenu(items, element, event, target);
    this._activeFileActionsButton = component;
    this._activeFileActionsButton.setActive(true);
  };
  _proto._onContextMenuHidden = function _onContextMenuHidden() {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  };
  _proto._getItemThumbnailCssClass = function _getItemThumbnailCssClass() {
    return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS;
  };
  _proto._getItemSelector = function _getItemSelector() {
    return ".".concat(DATA_GRID_DATA_ROW_CLASS);
  };
  _proto._onItemDblClick = function _onItemDblClick(e) {
    var $row = (0, _renderer.default)(e.currentTarget);
    var fileItemInfo = $row.data('item');
    this._raiseSelectedItemOpened(fileItemInfo);
  };
  _proto._isAllItemsSelected = function _isAllItemsSelected() {
    var selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
    var selectedRowKeys = this._filesView.option('selectedRowKeys');
    if (!selectedRowKeys.length) {
      return false;
    }
    return selectedRowKeys.length >= selectableItemsCount ? true : undefined;
  };
  _proto._onEditorPreparing = function _onEditorPreparing(_ref2) {
    var _this3 = this;
    var component = _ref2.component,
      command = _ref2.command,
      row = _ref2.row,
      parentType = _ref2.parentType,
      editorOptions = _ref2.editorOptions;
    if (!this._filesView) {
      this._filesView = component;
    }
    if (command === 'select' && row) {
      if (this._isParentDirectoryItem(row.data)) {
        editorOptions.disabled = true;
      }
    } else if (parentType === 'headerRow') {
      editorOptions.onInitialized = function (_ref3) {
        var component = _ref3.component;
        _this3._selectAllCheckBox = component;
      };
      editorOptions.value = this._isAllItemsSelected();
      editorOptions.onValueChanged = function (args) {
        return _this3._onSelectAllCheckBoxValueChanged(args);
      };
    }
  };
  _proto._onSelectAllCheckBoxValueChanged = function _onSelectAllCheckBoxValueChanged(_ref4) {
    var event = _ref4.event,
      previousValue = _ref4.previousValue,
      value = _ref4.value;
    if (!event) {
      if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
        this._selectAllCheckBox.option('value', previousValue);
      }
      return;
    }
    if (this._isAllItemsSelected() === value) {
      return;
    }
    if (value) {
      this._filesView.selectAll();
    } else {
      this._filesView.deselectAll();
    }
    event.preventDefault();
  };
  _proto._onRowPrepared = function _onRowPrepared(_ref5) {
    var rowType = _ref5.rowType,
      rowElement = _ref5.rowElement,
      data = _ref5.data;
    if (rowType === 'data') {
      var $row = (0, _renderer.default)(rowElement);
      $row.data('item', data);
      if (this._isParentDirectoryItem(data)) {
        $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM);
      }
    }
  };
  _proto._onContextMenuPreparing = function _onContextMenuPreparing(e) {
    if (!this._isDesktop()) {
      return;
    }
    var fileItems = null;
    var item = {};
    if (e.row && e.row.rowType === 'data') {
      item = e.row.data;
      this._selectItem(item);
      fileItems = this._getFileItemsForContextMenu(item);
    }
    var eventArgs = (0, _extend.extend)({}, {
      targetElement: e.target === 'content' && (0, _type.isDefined)(e.row) ? this._filesView.getRowElement(e.rowIndex) : undefined,
      itemData: item,
      options: this._contextMenu.option(),
      event: e.event,
      isActionButton: false,
      cancel: false
    });
    this._raiseContextMenuShowing(eventArgs);
    e.items = eventArgs.cancel ? [] : this._contextMenu.createContextMenuItems(fileItems, null, item);
  };
  _proto._onFilesViewSelectionChanged = function _onFilesViewSelectionChanged(_ref6) {
    var component = _ref6.component,
      selectedRowsData = _ref6.selectedRowsData,
      selectedRowKeys = _ref6.selectedRowKeys,
      currentSelectedRowKeys = _ref6.currentSelectedRowKeys,
      currentDeselectedRowKeys = _ref6.currentDeselectedRowKeys;
    this._filesView = this._filesView || component;
    if (this._selectAllCheckBox) {
      this._selectAllCheckBoxUpdating = true;
      this._selectAllCheckBox.option('value', this._isAllItemsSelected());
      this._selectAllCheckBoxUpdating = false;
    }
    var selectedItems = selectedRowsData.map(function (itemInfo) {
      return itemInfo.fileItem;
    });
    this._tryRaiseSelectionChanged({
      selectedItemInfos: selectedRowsData,
      selectedItems,
      selectedItemKeys: selectedRowKeys,
      currentSelectedItemKeys: currentSelectedRowKeys,
      currentDeselectedItemKeys: currentDeselectedRowKeys
    });
  };
  _proto._onFilesViewFocusedRowChanged = function _onFilesViewFocusedRowChanged(e) {
    var _e$row2;
    if (!this._isMultipleSelectionMode()) {
      var _e$row;
      this._selectItemSingleSelection((_e$row = e.row) === null || _e$row === void 0 ? void 0 : _e$row.data);
    }
    var fileSystemItem = ((_e$row2 = e.row) === null || _e$row2 === void 0 ? void 0 : _e$row2.data.fileItem) || null;
    this._onFocusedItemChanged({
      item: fileSystemItem,
      itemKey: fileSystemItem === null || fileSystemItem === void 0 ? void 0 : fileSystemItem.key,
      itemElement: e.rowElement
    });
  };
  _proto._onFilesViewOptionChanged = function _onFilesViewOptionChanged(_ref7) {
    var fullName = _ref7.fullName;
    if (fullName.indexOf('sortOrder') > -1) {
      this._filesView.columnOption('isParentFolder', {
        sortOrder: 'asc',
        sortIndex: 0
      });
    }
  };
  _proto._resetFocus = function _resetFocus() {
    this._setFocusedItemKey(undefined);
  };
  _proto._createThumbnailColumnCell = function _createThumbnailColumnCell(container, cellInfo) {
    this._getItemThumbnailContainer(cellInfo.data).appendTo(container);
  };
  _proto._createNameColumnCell = function _createNameColumnCell(container, cellInfo) {
    var _this4 = this;
    var $button = (0, _renderer.default)('<div>');
    var $name = (0, _renderer.default)('<span>').text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
    var $wrapper = (0, _renderer.default)('<div>').append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
    (0, _renderer.default)(container).append($wrapper);
    this._createComponent($button, _uiFile_manager3.default, {
      onClick: function onClick(e) {
        return _this4._onFileItemActionButtonClick(e);
      }
    });
  };
  _proto._calculateSizeColumnCellValue = function _calculateSizeColumnCellValue(rowData) {
    return rowData.fileItem.isDirectory ? '' : (0, _uiFile_manager.getDisplayFileSize)(rowData.fileItem.size);
  };
  _proto._selectItem = function _selectItem(fileItemInfo) {
    var selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
    selectItemFunc.call(this, fileItemInfo);
  };
  _proto._deselectItem = function _deselectItem(item) {
    this._filesView.deselectRows([item.fileItem.key]);
  };
  _proto._selectItemSingleSelection = function _selectItemSingleSelection(fileItemInfo) {
    if (!this._focusedItem || !fileItemInfo || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
      var oldFocusedItem = this._focusedItem;
      this._focusedItem = fileItemInfo;
      var deselectedKeys = [];
      if (oldFocusedItem) {
        deselectedKeys.push(oldFocusedItem.fileItem.key);
      }
      var selectedItems = [];
      var selectedKeys = [];
      if (fileItemInfo && !this._isParentDirectoryItem(fileItemInfo)) {
        selectedItems.push(fileItemInfo.fileItem);
        selectedKeys.push(fileItemInfo.fileItem.key);
      }
      this._raiseSelectionChanged({
        selectedItems,
        selectedItemKeys: selectedKeys,
        currentSelectedItemKeys: [].concat(selectedKeys),
        currentDeselectedItemKeys: deselectedKeys
      });
    }
  };
  _proto._selectItemMultipleSelection = function _selectItemMultipleSelection(_ref8) {
    var fileItem = _ref8.fileItem;
    if (!this._filesView.isRowSelected(fileItem.key)) {
      var selectionController = this._filesView.getController('selection');
      var preserve = selectionController.isSelectionWithCheckboxes();
      this._filesView.selectRows([fileItem.key], preserve);
    }
  };
  _proto._setSelectedItemKeys = function _setSelectedItemKeys(itemKeys) {
    this._filesView.option('selectedRowKeys', itemKeys);
  };
  _proto._setFocusedItemKey = function _setFocusedItemKey(itemKey) {
    var _this$_filesView;
    (_this$_filesView = this._filesView) === null || _this$_filesView === void 0 ? void 0 : _this$_filesView.option('focusedRowKey', itemKey);
  };
  _proto.clearSelection = function clearSelection() {
    if (this._isMultipleSelectionMode()) {
      this._filesView.clearSelection();
    } else {
      this._filesView.option('focusedRowIndex', -1);
    }
  };
  _proto.refresh = function refresh(options, operation) {
    var actualOptions = {
      dataSource: this._createDataSource()
    };
    if (options && Object.prototype.hasOwnProperty.call(options, 'focusedItemKey')) {
      if ((0, _type.isDefined)(options.focusedItemKey)) {
        actualOptions.focusedRowKey = options.focusedItemKey;
      } else {
        actualOptions.focusedRowIndex = -1;
      }
    }
    var hasNoScrollTarget = !(0, _type.isDefined)(actualOptions.focusedRowKey) && actualOptions.focusedRowIndex === -1;
    if (hasNoScrollTarget && operation === _file_items_controller.OPERATIONS.NAVIGATION) {
      actualOptions.paging = {
        pageIndex: 0
      };
      this._needResetScrollPosition = true;
    }
    this._filesView.option(actualOptions);
    this._refreshDeferred = new _deferred.Deferred();
    return this._refreshDeferred.promise();
  };
  _proto._getScrollable = function _getScrollable() {
    return this._filesView.getScrollable();
  };
  _proto.getSelectedItems = function getSelectedItems() {
    if (this._isMultipleSelectionMode()) {
      return this._filesView.getSelectedRowsData();
    }
    return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : [];
  };
  return FileManagerDetailsItemList;
}(_uiFile_manager2.default);
var _default = FileManagerDetailsItemList;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;