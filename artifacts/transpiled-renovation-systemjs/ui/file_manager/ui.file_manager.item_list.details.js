!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.item_list.details.js"], ["../../core/renderer","../../core/utils/extend","./ui.file_manager.common","../../core/utils/type","../../localization/message","../data_grid/ui.data_grid","./ui.file_manager.item_list","./ui.file_manager.file_actions_button","../../core/utils/deferred","./file_items_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.item_list.details.js", ["../../core/renderer", "../../core/utils/extend", "./ui.file_manager.common", "../../core/utils/type", "../../localization/message", "../data_grid/ui.data_grid", "./ui.file_manager.item_list", "./ui.file_manager.file_actions_button", "../../core/utils/deferred", "./file_items_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _uiFile_manager = $__require("./ui.file_manager.common");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../data_grid/ui.data_grid"));
  var _uiFile_manager2 = _interopRequireDefault($__require("./ui.file_manager.item_list"));
  var _uiFile_manager3 = _interopRequireDefault($__require("./ui.file_manager.file_actions_button"));
  var _deferred = $__require("../../core/utils/deferred");
  var _file_items_controller = $__require("./file_items_controller");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
        onOptionChanged: this._onFilesViewOptionChanged.bind(this)
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
        selectedItems: selectedItems,
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
          selectedItems: selectedItems,
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
      }
      this._filesView.option(actualOptions);
      this._refreshDeferred = new _deferred.Deferred();
      return this._refreshDeferred.promise();
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","./ui.file_manager.common","../../core/utils/type","../../localization/message","../data_grid/ui.data_grid","./ui.file_manager.item_list","./ui.file_manager.file_actions_button","../../core/utils/deferred","./file_items_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("./ui.file_manager.common"), require("../../core/utils/type"), require("../../localization/message"), require("../data_grid/ui.data_grid"), require("./ui.file_manager.item_list"), require("./ui.file_manager.file_actions_button"), require("../../core/utils/deferred"), require("./file_items_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.item_list.details.js.map