/**
* DevExtreme (bundles/__internal/grids/grid_core/column_chooser/m_column_chooser.js)
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
exports.columnChooserModule = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _button = _interopRequireDefault(require("../../../../ui/button"));
var _ui = _interopRequireDefault(require("../../../../ui/popup/ui.popup"));
var _themes = require("../../../../ui/themes");
var _tree_view = _interopRequireDefault(require("../../../../ui/tree_view"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_columns_view = require("../views/m_columns_view");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

var COLUMN_CHOOSER_CLASS = 'column-chooser';
var COLUMN_CHOOSER_BUTTON_CLASS = 'column-chooser-button';
var NOTOUCH_ACTION_CLASS = 'notouch-action';
var COLUMN_CHOOSER_LIST_CLASS = 'column-chooser-list';
var COLUMN_CHOOSER_PLAIN_CLASS = 'column-chooser-plain';
var COLUMN_CHOOSER_DRAG_CLASS = 'column-chooser-mode-drag';
var COLUMN_CHOOSER_SELECT_CLASS = 'column-chooser-mode-select';
var COLUMN_CHOOSER_ICON_NAME = 'column-chooser';
var COLUMN_CHOOSER_ITEM_CLASS = 'dx-column-chooser-item';
var COLUMN_OPTIONS_USED_IN_ITEMS = ['showInColumnChooser', 'caption', 'allowHiding', 'visible', 'cssClass', 'ownerBand'];
var processItems = function processItems(that, chooserColumns) {
  var items = [];
  var isSelectMode = that.isSelectMode();
  var isRecursive = that.option('columnChooser.selection.recursive');
  if (chooserColumns.length) {
    (0, _iterator.each)(chooserColumns, function (index, column) {
      var item = {
        text: column.caption,
        cssClass: column.cssClass,
        allowHiding: column.allowHiding,
        expanded: true,
        id: column.index,
        disabled: column.allowHiding === false,
        parentId: (0, _type.isDefined)(column.ownerBand) ? column.ownerBand : null
      };
      var isRecursiveWithColumns = isRecursive && column.hasColumns;
      if (isSelectMode && !isRecursiveWithColumns) {
        item.selected = column.visible;
      }
      items.push(item);
    });
  }
  return items;
};
/**
 * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserController>}
 */
var columnChooserControllerMembers = {
  renderShowColumnChooserButton($element) {
    var that = this;
    var columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
    var columnChooserEnabled = that.option('columnChooser.enabled');
    var $showColumnChooserButton = $element.find(".".concat(columnChooserButtonClass));
    var $columnChooserButton;
    if (columnChooserEnabled) {
      if (!$showColumnChooserButton.length) {
        $columnChooserButton = (0, _renderer.default)('<div>').addClass(columnChooserButtonClass).appendTo($element);
        that._createComponent($columnChooserButton, _button.default, {
          icon: COLUMN_CHOOSER_ICON_NAME,
          onClick() {
            that.getView('columnChooserView').showColumnChooser();
          },
          hint: that.option('columnChooser.title'),
          integrationOptions: {}
        });
      } else {
        $showColumnChooserButton.show();
      }
    } else {
      $showColumnChooserButton.hide();
    }
  },
  getPosition() {
    var rowsView = this.getView('rowsView');
    var position = this.option('columnChooser.position');
    return (0, _type.isDefined)(position) ? position : {
      my: 'right bottom',
      at: 'right bottom',
      of: rowsView && rowsView.element(),
      collision: 'fit',
      offset: '-2 -2',
      boundaryOffset: '2 2'
    };
  }
};
var ColumnChooserController = _m_modules.default.ViewController.inherit(columnChooserControllerMembers);
/**
 * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserView>}
 */
var columnChooserMembers = {
  _resizeCore: _common.noop,
  _isWinDevice() {
    // @ts-expect-error
    return !!_devices.default.real().win;
  },
  _initializePopupContainer() {
    var that = this;
    var columnChooserClass = that.addWidgetPrefix(COLUMN_CHOOSER_CLASS);
    var $element = that.element().addClass(columnChooserClass);
    var columnChooserOptions = that.option('columnChooser');
    var themeName = (0, _themes.current)();
    var isGenericTheme = (0, _themes.isGeneric)(themeName);
    var isMaterial = (0, _themes.isMaterial)(themeName);
    var dxPopupOptions = {
      visible: false,
      shading: false,
      showCloseButton: false,
      dragEnabled: true,
      resizeEnabled: true,
      wrapperAttr: {
        class: columnChooserClass
      },
      toolbarItems: [{
        text: columnChooserOptions.title,
        toolbar: 'top',
        location: isGenericTheme || isMaterial ? 'before' : 'center'
      }],
      position: that.getController('columnChooser').getPosition(),
      width: columnChooserOptions.width,
      height: columnChooserOptions.height,
      rtlEnabled: that.option('rtlEnabled'),
      onHidden() {
        if (that._isWinDevice()) {
          (0, _renderer.default)('body').removeClass(that.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
        }
      },
      container: columnChooserOptions.container
    };
    if (isGenericTheme || isMaterial) {
      (0, _extend.extend)(dxPopupOptions, {
        showCloseButton: true
      });
    } else {
      // @ts-expect-error
      dxPopupOptions.toolbarItems[dxPopupOptions.toolbarItems.length] = {
        shortcut: 'cancel'
      };
    }
    if (!(0, _type.isDefined)(this._popupContainer)) {
      that._popupContainer = that._createComponent($element, _ui.default, dxPopupOptions);
      that._popupContainer.on('optionChanged', function (args) {
        if (args.name === 'visible') {
          that.renderCompleted.fire();
        }
      });
    } else {
      this._popupContainer.option(dxPopupOptions);
    }
    this.setPopupAttributes();
  },
  setPopupAttributes() {
    var isSelectMode = this.isSelectMode();
    var isBandColumnsUsed = this._columnsController.isBandColumnsUsed();
    this._popupContainer.setAria({
      role: 'dialog',
      label: _message.default.format('dxDataGrid-columnChooserTitle')
    });
    this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
    this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_LIST_CLASS));
    if (isSelectMode && !isBandColumnsUsed) {
      this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_PLAIN_CLASS));
    }
  },
  _renderCore(change) {
    if (this._popupContainer) {
      var isDragMode = !this.isSelectMode();
      if (!this._columnChooserList || change === 'full') {
        this._renderTreeView();
      } else if (isDragMode) {
        this._updateItems();
      }
    }
  },
  _renderTreeView() {
    var _a, _b, _c;
    var that = this;
    var $container = this._popupContainer.$content();
    var columnChooser = this.option('columnChooser');
    var isSelectMode = this.isSelectMode();
    var searchEnabled = (0, _type.isDefined)(columnChooser.allowSearch) ? columnChooser.allowSearch : (_a = columnChooser.search) === null || _a === void 0 ? void 0 : _a.enabled;
    var searchTimeout = (0, _type.isDefined)(columnChooser.searchTimeout) ? columnChooser.searchTimeout : (_b = columnChooser.search) === null || _b === void 0 ? void 0 : _b.timeout;
    /**
     * @type {import('../tree_view').Options}
     */
    var treeViewConfig = {
      dataStructure: 'plain',
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      itemTemplate: 'item',
      showCheckBoxesMode: 'none',
      rootValue: null,
      searchEnabled,
      searchTimeout,
      searchEditorOptions: (_c = columnChooser.search) === null || _c === void 0 ? void 0 : _c.editorOptions
    };
    if (this._isWinDevice()) {
      treeViewConfig.useNativeScrolling = false;
    }
    (0, _extend.extend)(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
    if (this._columnChooserList) {
      if (!treeViewConfig.searchEnabled) {
        treeViewConfig.searchValue = '';
      }
      this._columnChooserList.option(treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
    } else {
      this._columnChooserList = this._createComponent($container, _tree_view.default, treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
      var scrollTop = 0;
      this._columnChooserList.on('optionChanged', function (e) {
        var scrollable = e.component.getScrollable();
        scrollTop = scrollable.scrollTop();
      });
      this._columnChooserList.on('contentReady', function (e) {
        (0, _common.deferUpdate)(function () {
          var scrollable = e.component.getScrollable();
          scrollable.scrollTo({
            y: scrollTop
          });
          that.renderCompleted.fire();
        });
      });
    }
  },
  _prepareDragModeConfig() {
    var columnChooserOptions = this.option('columnChooser');
    return {
      noDataText: columnChooserOptions.emptyPanelText,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      itemTemplate(data, index, item) {
        (0, _renderer.default)(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS);
      }
    };
  },
  _prepareSelectModeConfig() {
    var _this = this;
    var that = this;
    var selectionOptions = this.option('columnChooser.selection') || {};
    var getFlatNodes = function getFlatNodes(nodes) {
      var addNodesToArray = function addNodesToArray(nodes, flatNodesArray) {
        return nodes.reduce(function (result, node) {
          result.push(node);
          if (node.children.length) {
            addNodesToArray(node.children, result);
          }
          return result;
        }, flatNodesArray);
      };
      return addNodesToArray(nodes, []);
    };
    var updateSelection = function updateSelection(e, nodes) {
      nodes.filter(function (node) {
        return node.itemData.allowHiding === false;
      }).forEach(function (node) {
        return e.component.selectItem(node.key);
      });
    };
    var updateColumnVisibility = function updateColumnVisibility(nodes) {
      nodes.forEach(function (node) {
        var columnIndex = node.itemData.id;
        var isVisible = node.selected !== false;
        that._columnsController.columnOption(columnIndex, 'visible', isVisible);
      });
    };
    var isUpdatingSelection = false;
    var selectionChangedHandler = function selectionChangedHandler(e) {
      if (isUpdatingSelection) {
        return;
      }
      var nodes = getFlatNodes(e.component.getNodes());
      e.component.beginUpdate();
      isUpdatingSelection = true;
      updateSelection(e, nodes);
      e.component.endUpdate();
      isUpdatingSelection = false;
      that.component.beginUpdate();
      _this._isUpdatingColumnVisibility = true;
      updateColumnVisibility(nodes);
      that.component.endUpdate();
      _this._isUpdatingColumnVisibility = false;
    };
    return {
      selectByClick: selectionOptions.selectByClick,
      selectNodesRecursive: selectionOptions.recursive,
      showCheckBoxesMode: selectionOptions.allowSelectAll ? 'selectAll' : 'normal',
      onSelectionChanged: selectionChangedHandler
    };
  },
  _updateItems() {
    var isSelectMode = this.isSelectMode();
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    var items = processItems(this, chooserColumns);
    this._columnChooserList.option('items', items);
  },
  _updateItemsSelection(columnIndices) {
    var _this2 = this;
    var changedColumns = columnIndices === null || columnIndices === void 0 ? void 0 : columnIndices.map(function (columnIndex) {
      return _this2._columnsController.columnOption(columnIndex);
    });
    this._columnChooserList.beginUpdate();
    changedColumns === null || changedColumns === void 0 ? void 0 : changedColumns.forEach(function (_ref) {
      var visible = _ref.visible,
        index = _ref.index;
      if (visible) {
        _this2._columnChooserList.selectItem(index);
      } else {
        _this2._columnChooserList.unselectItem(index);
      }
    });
    this._columnChooserList.endUpdate();
  },
  _columnOptionChanged(e) {
    this.callBase(e);
    var isSelectMode = this.isSelectMode();
    if (isSelectMode && this._columnChooserList && this._isUpdatingColumnVisibility !== true) {
      var optionNames = e.optionNames;
      var onlyVisibleChanged = optionNames.visible && optionNames.length === 1;
      var columnIndices = (0, _type.isDefined)(e.columnIndex) ? [e.columnIndex] : e.columnIndices;
      var needUpdate = COLUMN_OPTIONS_USED_IN_ITEMS.some(function (optionName) {
        return optionNames[optionName];
      }) || e.changeTypes.columns && optionNames.all;
      if (needUpdate) {
        this._updateItemsSelection(columnIndices);
        if (!onlyVisibleChanged) {
          this._updateItems();
        }
      }
    }
  },
  optionChanged(args) {
    switch (args.name) {
      case 'columnChooser':
        this._initializePopupContainer();
        this.render(null, 'full');
        break;
      default:
        this.callBase(args);
    }
  },
  getColumnElements() {
    var result = [];
    var isSelectMode = this.isSelectMode();
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    var $content = this._popupContainer && this._popupContainer.$content();
    var $nodes = $content && $content.find('.dx-treeview-node');
    if ($nodes) {
      chooserColumns.forEach(function (column) {
        var $node = $nodes.filter("[data-item-id = '".concat(column.index, "']"));
        var item = $node.length ? $node.children(".".concat(COLUMN_CHOOSER_ITEM_CLASS)).get(0) : null;
        result.push(item);
      });
    }
    return (0, _renderer.default)(result);
  },
  getName() {
    return 'columnChooser';
  },
  getColumns() {
    return this._columnsController.getChooserColumns();
  },
  allowDragging(column) {
    var isParentColumnVisible = this._columnsController.isParentColumnVisible(column.index);
    var isColumnHidden = !column.visible && column.allowHiding;
    return this.isColumnChooserVisible() && isParentColumnVisible && isColumnHidden;
  },
  allowColumnHeaderDragging(column) {
    var isDragMode = !this.isSelectMode();
    return isDragMode && this.isColumnChooserVisible() && column.allowHiding;
  },
  getBoundingRect() {
    var that = this;
    var container = that._popupContainer && that._popupContainer.$overlayContent();
    if (container && container.is(':visible')) {
      var offset = container.offset();
      return {
        left: offset.left,
        top: offset.top,
        right: offset.left + (0, _size.getOuterWidth)(container),
        bottom: offset.top + (0, _size.getOuterHeight)(container)
      };
    }
    return null;
  },
  showColumnChooser() {
    if (!this._popupContainer) {
      this._initializePopupContainer();
      this.render();
    }
    this._popupContainer.show();
    if (this._isWinDevice()) {
      (0, _renderer.default)('body').addClass(this.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
    }
  },
  hideColumnChooser() {
    if (this._popupContainer) {
      this._popupContainer.hide();
    }
  },
  isColumnChooserVisible() {
    var popupContainer = this._popupContainer;
    return popupContainer && popupContainer.option('visible');
  },
  isSelectMode() {
    return this.option('columnChooser.mode') === 'select';
  },
  hasHiddenColumns() {
    var isEnabled = this.option('columnChooser.enabled');
    var hiddenColumns = this.getColumns().filter(function (column) {
      return !column.visible;
    });
    return isEnabled && hiddenColumns.length;
  },
  publicMethods() {
    return ['showColumnChooser', 'hideColumnChooser'];
  }
};
var ColumnChooserView = _m_columns_view.ColumnsView.inherit(columnChooserMembers);
/**
 * @type {import('./ui.grid_core.modules').Module}
 */
var columnChooserModule = {
  defaultOptions() {
    return {
      columnChooser: {
        enabled: false,
        search: {
          enabled: false,
          timeout: 500,
          editorOptions: {}
        },
        selection: {
          allowSelectAll: false,
          selectByClick: false,
          recursive: false
        },
        position: undefined,
        mode: 'dragAndDrop',
        width: 250,
        height: 260,
        title: _message.default.format('dxDataGrid-columnChooserTitle'),
        emptyPanelText: _message.default.format('dxDataGrid-columnChooserEmptyText'),
        // TODO private option
        container: undefined
      }
    };
  },
  controllers: {
    columnChooser: ColumnChooserController
  },
  views: {
    columnChooserView: ColumnChooserView
  },
  extenders: {
    views: {
      headerPanel: {
        _getToolbarItems() {
          var items = this.callBase();
          return this._appendColumnChooserItem(items);
        },
        _appendColumnChooserItem(items) {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          if (columnChooserEnabled) {
            var onClickHandler = function onClickHandler() {
              that.component.getView('columnChooserView').showColumnChooser();
            };
            var onInitialized = function onInitialized(e) {
              (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS)));
            };
            var hintText = that.option('columnChooser.title');
            /**
                         * @type {any}
                         */
            var toolbarItem = {
              widget: 'dxButton',
              options: {
                icon: COLUMN_CHOOSER_ICON_NAME,
                onClick: onClickHandler,
                hint: hintText,
                text: hintText,
                onInitialized,
                elementAttr: {
                  'aria-haspopup': 'dialog'
                }
              },
              showText: 'inMenu',
              location: 'after',
              name: 'columnChooserButton',
              locateInMenu: 'auto',
              sortIndex: 40
            };
            items.push(toolbarItem);
          }
          return items;
        },
        optionChanged(args) {
          switch (args.name) {
            case 'columnChooser':
              this._invalidate();
              args.handled = true;
              break;
            default:
              this.callBase(args);
          }
        },
        isVisible() {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          return that.callBase() || columnChooserEnabled;
        }
      },
      columnHeadersView: {
        allowDragging(column) {
          var columnChooserView = this.component.getView('columnChooserView');
          var isDragMode = !columnChooserView.isSelectMode();
          var isColumnChooserVisible = columnChooserView.isColumnChooserVisible();
          return isDragMode && isColumnChooserVisible && column.allowHiding || this.callBase(column);
        }
      }
    },
    controllers: {
      columns: {
        allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
          var isSelectMode = this.option('columnChooser.mode') === 'select';
          var isMoveColumnDisallowed = isSelectMode && targetLocation === 'columnChooser';
          return isMoveColumnDisallowed ? false : this.callBase(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation);
        }
      }
    }
  }
};
exports.columnChooserModule = columnChooserModule;
