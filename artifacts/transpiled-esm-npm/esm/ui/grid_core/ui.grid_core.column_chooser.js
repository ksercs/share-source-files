import { getOuterWidth, getOuterHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
import { deferUpdate, noop } from '../../core/utils/common';
import modules from './ui.grid_core.modules';
import { ColumnsView } from './ui.grid_core.columns_view';
import messageLocalization from '../../localization/message';
// @ts-expect-error
import { isMaterial as isMaterialTheme, isGeneric, current } from '../themes';
import TreeView from '../tree_view';
import devices from '../../core/devices';
import Popup from '../popup/ui.popup';
import Button from '../button';
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
var COLUMN_CHOOSER_CLASS = 'column-chooser';
var COLUMN_CHOOSER_BUTTON_CLASS = 'column-chooser-button';
var NOTOUCH_ACTION_CLASS = 'notouch-action';
var COLUMN_CHOOSER_LIST_CLASS = 'column-chooser-list';
var COLUMN_CHOOSER_PLAIN_CLASS = 'column-chooser-plain';
var COLUMN_CHOOSER_DRAG_CLASS = 'column-chooser-mode-drag';
var COLUMN_CHOOSER_SELECT_CLASS = 'column-chooser-mode-select';
var COLUMN_CHOOSER_ICON_NAME = 'column-chooser';
var COLUMN_CHOOSER_ITEM_CLASS = 'dx-column-chooser-item';
var CLICK_TIMEOUT = 300;
var processItems = function processItems(that, chooserColumns) {
  var items = [];
  var isSelectMode = that.isSelectMode();
  var isRecursive = that.option('columnChooser.selection.recursive');
  if (chooserColumns.length) {
    each(chooserColumns, function (index, column) {
      var item = {
        text: column.caption,
        cssClass: column.cssClass,
        allowHiding: column.allowHiding,
        expanded: true,
        id: column.index,
        disabled: column.allowHiding === false,
        parentId: isDefined(column.ownerBand) ? column.ownerBand : null
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
  renderShowColumnChooserButton: function renderShowColumnChooserButton($element) {
    var that = this;
    var columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
    var columnChooserEnabled = that.option('columnChooser.enabled');
    var $showColumnChooserButton = $element.find('.' + columnChooserButtonClass);
    var $columnChooserButton;
    if (columnChooserEnabled) {
      if (!$showColumnChooserButton.length) {
        $columnChooserButton = $('<div>').addClass(columnChooserButtonClass).appendTo($element);
        that._createComponent($columnChooserButton, Button, {
          icon: COLUMN_CHOOSER_ICON_NAME,
          onClick: function onClick() {
            that.getView('columnChooserView').showColumnChooser();
          },
          hint: that.option('columnChooser.title'),
          // @ts-expect-error
          integrationOptions: {}
        });
      } else {
        $showColumnChooserButton.show();
      }
    } else {
      $showColumnChooserButton.hide();
    }
  },
  getPosition: function getPosition() {
    var rowsView = this.getView('rowsView');
    var position = this.option('columnChooser.position');
    return isDefined(position) ? position : {
      my: 'right bottom',
      at: 'right bottom',
      of: rowsView && rowsView.element(),
      collision: 'fit',
      offset: '-2 -2',
      boundaryOffset: '2 2'
    };
  }
};
var ColumnChooserController = modules.ViewController.inherit(columnChooserControllerMembers);

/**
 * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserView>}
 */
var columnChooserMembers = {
  _resizeCore: noop,
  _isWinDevice: function _isWinDevice() {
    // @ts-expect-error
    return !!devices.real().win;
  },
  _initializePopupContainer: function _initializePopupContainer() {
    var that = this;
    var columnChooserClass = that.addWidgetPrefix(COLUMN_CHOOSER_CLASS);
    var $element = that.element().addClass(columnChooserClass);
    var columnChooserOptions = that.option('columnChooser');
    var themeName = current();
    var isGenericTheme = isGeneric(themeName);
    var isMaterial = isMaterialTheme(themeName);
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
      onHidden: function onHidden() {
        if (that._isWinDevice()) {
          $('body').removeClass(that.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
        }
      },
      // @ts-expect-error
      container: columnChooserOptions.container
    };
    if (isGenericTheme || isMaterial) {
      extend(dxPopupOptions, {
        showCloseButton: true
      });
    } else {
      // @ts-expect-error
      dxPopupOptions.toolbarItems[dxPopupOptions.toolbarItems.length] = {
        shortcut: 'cancel'
      };
    }
    if (!isDefined(this._popupContainer)) {
      that._popupContainer = that._createComponent($element, Popup, dxPopupOptions);
      that._popupContainer.on('optionChanged', function (args) {
        if (args.name === 'visible') {
          // @ts-expect-error
          that.renderCompleted.fire();
        }
      });
    } else {
      this._popupContainer.option(dxPopupOptions);
    }
    this.setPopupAttributes();
  },
  setPopupAttributes: function setPopupAttributes() {
    var isSelectMode = this.isSelectMode();
    var isBandColumnsUsed = this._columnsController.isBandColumnsUsed();
    this._popupContainer.setAria({
      role: 'dialog',
      label: messageLocalization.format('dxDataGrid-columnChooserTitle')
    });
    this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
    this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_LIST_CLASS));
    if (isSelectMode && !isBandColumnsUsed) {
      this._popupContainer.$content().addClass(this.addWidgetPrefix(COLUMN_CHOOSER_PLAIN_CLASS));
    }
  },
  _renderCore: function _renderCore(change) {
    if (this._popupContainer) {
      var isDragMode = !this.isSelectMode();
      if (!this._columnChooserList || change === 'full') {
        this._renderTreeView();
      } else if (isDragMode) {
        this._updateItems();
      }
    }
  },
  _renderTreeView: function _renderTreeView() {
    var _columnChooser$search, _columnChooser$search2, _columnChooser$search3;
    var that = this;
    var $container = this._popupContainer.$content();
    var columnChooser = this.option('columnChooser');
    var isSelectMode = this.isSelectMode();
    var searchEnabled = isDefined(columnChooser.allowSearch) ? columnChooser.allowSearch : (_columnChooser$search = columnChooser.search) === null || _columnChooser$search === void 0 ? void 0 : _columnChooser$search.enabled;
    var searchTimeout = isDefined(columnChooser.searchTimeout) ? columnChooser.searchTimeout : (_columnChooser$search2 = columnChooser.search) === null || _columnChooser$search2 === void 0 ? void 0 : _columnChooser$search2.timeout;

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
      searchEnabled: searchEnabled,
      searchTimeout: searchTimeout,
      searchEditorOptions: (_columnChooser$search3 = columnChooser.search) === null || _columnChooser$search3 === void 0 ? void 0 : _columnChooser$search3.editorOptions
    };
    if (this._isWinDevice()) {
      treeViewConfig.useNativeScrolling = false;
    }
    extend(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
    if (this._columnChooserList) {
      if (!treeViewConfig.searchEnabled) {
        treeViewConfig.searchValue = '';
      }
      this._columnChooserList.option(treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
    } else {
      this._columnChooserList = this._createComponent($container, TreeView, treeViewConfig);
      // we need to set items after setting selectNodesRecursive, so they will be processed correctly inside TreeView
      this._updateItems();
      var scrollTop = 0;
      this._columnChooserList.on('optionChanged', e => {
        var scrollable = e.component.getScrollable();
        scrollTop = scrollable.scrollTop();
      });
      this._columnChooserList.on('contentReady', e => {
        deferUpdate(function () {
          var scrollable = e.component.getScrollable();
          scrollable.scrollTo({
            y: scrollTop
          });

          // @ts-expect-error
          that.renderCompleted.fire();
        });
      });
    }
  },
  _prepareDragModeConfig: function _prepareDragModeConfig() {
    var columnChooserOptions = this.option('columnChooser');
    return {
      noDataText: columnChooserOptions.emptyPanelText,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      itemTemplate: function itemTemplate(data, index, item) {
        $(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS);
      }
    };
  },
  _prepareSelectModeConfig: function _prepareSelectModeConfig() {
    var that = this;
    var selectionOptions = this.option('columnChooser.selection') || {};
    var getFlatNodes = nodes => {
      var addNodesToArray = (nodes, flatNodesArray) => {
        return nodes.reduce((result, node) => {
          result.push(node);
          if (node.children.length) {
            addNodesToArray(node.children, result);
          }
          return result;
        }, flatNodesArray);
      };
      return addNodesToArray(nodes, []);
    };
    var updateSelection = (e, nodes) => {
      nodes.filter(node => node.itemData.allowHiding === false).forEach(node => e.component.selectItem(node.key));
    };
    var updateColumnVisibility = nodes => {
      nodes.forEach(node => {
        var columnIndex = node.itemData.id;
        var isVisible = node.selected !== false;
        that._columnsController.columnOption(columnIndex, 'visible', isVisible);
      });
    };
    var updateColumnVisibilityTimeout;
    var isUpdatingSelection = false;
    var selectionChangedHandler = e => {
      if (isUpdatingSelection) {
        return;
      }
      var nodes = getFlatNodes(e.component.getNodes());
      e.component.beginUpdate();
      isUpdatingSelection = true;
      updateSelection(e, nodes);
      e.component.endUpdate();
      isUpdatingSelection = false;
      clearTimeout(updateColumnVisibilityTimeout);
      updateColumnVisibilityTimeout = setTimeout(() => {
        that.component.beginUpdate();
        this._isUpdatingColumnVisibility = true;
        updateColumnVisibility(nodes);
        that.component.endUpdate();
        this._isUpdatingColumnVisibility = false;
      }, CLICK_TIMEOUT);
    };
    return {
      selectByClick: selectionOptions.selectByClick,
      selectNodesRecursive: selectionOptions.recursive,
      showCheckBoxesMode: selectionOptions.allowSelectAll ? 'selectAll' : 'normal',
      onSelectionChanged: selectionChangedHandler
    };
  },
  _updateItems: function _updateItems() {
    var isSelectMode = this.isSelectMode();
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    var items = processItems(this, chooserColumns);
    this._columnChooserList.option('items', items);
  },
  _updateItemSelection: function _updateItemSelection(columnIndex) {
    var isRecursive = this.option('columnChooser.selection.recursive');
    var column = this._columnsController.columnOption(columnIndex);
    var isRecursiveWithColumns = isRecursive && column.hasColumns;
    if (!isRecursiveWithColumns) {
      column.visible ? this._columnChooserList.selectItem(columnIndex) : this._columnChooserList.unselectItem(columnIndex);
    }
  },
  _columnOptionChanged: function _columnOptionChanged(e) {
    this.callBase(e);
    var changeTypes = e.changeTypes;
    var optionNames = e.optionNames;
    var isSelectMode = this.isSelectMode();
    if (isSelectMode && this._columnChooserList && this._isUpdatingColumnVisibility !== true) {
      var onlyOneColumnChanged = e.columnIndex !== undefined;
      var onlyVisibleChanged = optionNames.visible && optionNames.length === 1;
      var isDraggedFromGroupPanel = optionNames.visible && optionNames.groupIndex && optionNames.length === 2;
      var optionsUsedInItems = ['showInColumnChooser', 'caption', 'allowHiding', 'visible', 'cssClass', 'ownerBand'];
      var needFullRender = optionsUsedInItems.some(optionName => optionNames[optionName]) || changeTypes.columns && optionNames.all;
      if (onlyOneColumnChanged && (onlyVisibleChanged || isDraggedFromGroupPanel)) {
        this._updateItemSelection(e.columnIndex);
      } else if (needFullRender) {
        this._updateItems();
      }
    }
  },
  optionChanged: function optionChanged(args) {
    switch (args.name) {
      case 'columnChooser':
        this._initializePopupContainer();
        this.render(null, 'full');
        break;
      default:
        this.callBase(args);
    }
  },
  getColumnElements: function getColumnElements() {
    var result = [];
    var isSelectMode = this.isSelectMode();
    var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
    var $content = this._popupContainer && this._popupContainer.$content();
    var $nodes = $content && $content.find('.dx-treeview-node');
    if ($nodes) {
      chooserColumns.forEach(function (column) {
        var $node = $nodes.filter('[data-item-id = \'' + column.index + '\']');
        var item = $node.length ? $node.children('.' + COLUMN_CHOOSER_ITEM_CLASS).get(0) : null;
        result.push(item);
      });
    }

    // @ts-expect-error
    return $(result);
  },
  getName: function getName() {
    return 'columnChooser';
  },
  getColumns: function getColumns() {
    return this._columnsController.getChooserColumns();
  },
  allowDragging: function allowDragging(column) {
    var isParentColumnVisible = this._columnsController.isParentColumnVisible(column.index);
    var isColumnHidden = !column.visible && column.allowHiding;
    return this.isColumnChooserVisible() && isParentColumnVisible && isColumnHidden;
  },
  allowColumnHeaderDragging: function allowColumnHeaderDragging(column) {
    var isDragMode = !this.isSelectMode();
    return isDragMode && this.isColumnChooserVisible() && column.allowHiding;
  },
  getBoundingRect: function getBoundingRect() {
    var that = this;
    var container = that._popupContainer && that._popupContainer.$overlayContent();
    if (container && container.is(':visible')) {
      var offset = container.offset();
      return {
        left: offset.left,
        top: offset.top,
        right: offset.left + getOuterWidth(container),
        bottom: offset.top + getOuterHeight(container)
      };
    }
    return null;
  },
  showColumnChooser: function showColumnChooser() {
    if (!this._popupContainer) {
      this._initializePopupContainer();
      this.render();
    }
    this._popupContainer.show();
    if (this._isWinDevice()) {
      $('body').addClass(this.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
    }
  },
  hideColumnChooser: function hideColumnChooser() {
    if (this._popupContainer) {
      this._popupContainer.hide();
    }
  },
  isColumnChooserVisible: function isColumnChooserVisible() {
    var popupContainer = this._popupContainer;
    return popupContainer && popupContainer.option('visible');
  },
  isSelectMode: function isSelectMode() {
    return this.option('columnChooser.mode') === 'select';
  },
  hasHiddenColumns: function hasHiddenColumns() {
    var isEnabled = this.option('columnChooser.enabled');
    var hiddenColumns = this.getColumns().filter(column => !column.visible);
    return isEnabled && hiddenColumns.length;
  },
  publicMethods: function publicMethods() {
    return ['showColumnChooser', 'hideColumnChooser'];
  }
};
var ColumnChooserView = ColumnsView.inherit(columnChooserMembers);

/**
 * @type {import('./ui.grid_core.modules').Module}
 */
export var columnChooserModule = {
  defaultOptions: function defaultOptions() {
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
        title: messageLocalization.format('dxDataGrid-columnChooserTitle'),
        emptyPanelText: messageLocalization.format('dxDataGrid-columnChooserEmptyText'),
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
        _getToolbarItems: function _getToolbarItems() {
          var items = this.callBase();
          return this._appendColumnChooserItem(items);
        },
        _appendColumnChooserItem: function _appendColumnChooserItem(items) {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          if (columnChooserEnabled) {
            var onClickHandler = function onClickHandler() {
              that.component.getView('columnChooserView').showColumnChooser();
            };
            var onInitialized = function onInitialized(e) {
              $(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS)));
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
                onInitialized: onInitialized,
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
        optionChanged: function optionChanged(args) {
          switch (args.name) {
            case 'columnChooser':
              this._invalidate();
              args.handled = true;
              break;
            default:
              this.callBase(args);
          }
        },
        isVisible: function isVisible() {
          var that = this;
          var columnChooserEnabled = that.option('columnChooser.enabled');
          return that.callBase() || columnChooserEnabled;
        }
      },
      columnHeadersView: {
        allowDragging: function allowDragging(column) {
          var columnChooserView = this.component.getView('columnChooserView');
          var isDragMode = !columnChooserView.isSelectMode();
          var isColumnChooserVisible = columnChooserView.isColumnChooserVisible();
          return isDragMode && isColumnChooserVisible && column.allowHiding || this.callBase(column);
        }
      }
    },
    controllers: {
      columns: {
        allowMoveColumn: function allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
          var isSelectMode = this.option('columnChooser.mode') === 'select';
          var isMoveColumnDisallowed = isSelectMode && targetLocation === 'columnChooser';
          return isMoveColumnDisallowed ? false : this.callBase(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation);
        }
      }
    }
  }
};