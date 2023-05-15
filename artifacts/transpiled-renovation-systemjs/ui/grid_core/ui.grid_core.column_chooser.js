!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.column_chooser.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/common","./ui.grid_core.modules","./ui.grid_core.columns_view","../../localization/message","../themes","../tree_view","../../core/devices","../popup/ui.popup","../button","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.column_chooser.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/common", "./ui.grid_core.modules", "./ui.grid_core.columns_view", "../../localization/message", "../themes", "../tree_view", "../../core/devices", "../popup/ui.popup", "../button", "../../core/utils/type", "../../core/utils/extend", "../../core/utils/iterator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.columnChooserModule = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _common = $__require("../../core/utils/common");
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _uiGrid_core2 = $__require("./ui.grid_core.columns_view");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _themes = $__require("../themes");
  var _tree_view = _interopRequireDefault($__require("../tree_view"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _ui = _interopRequireDefault($__require("../popup/ui.popup"));
  var _button = _interopRequireDefault($__require("../button"));
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
  var CLICK_TIMEOUT = 300;
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
    renderShowColumnChooserButton: function renderShowColumnChooserButton($element) {
      var that = this;
      var columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
      var columnChooserEnabled = that.option('columnChooser.enabled');
      var $showColumnChooserButton = $element.find('.' + columnChooserButtonClass);
      var $columnChooserButton;
      if (columnChooserEnabled) {
        if (!$showColumnChooserButton.length) {
          $columnChooserButton = (0, _renderer.default)('<div>').addClass(columnChooserButtonClass).appendTo($element);
          that._createComponent($columnChooserButton, _button.default, {
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
  var ColumnChooserController = _uiGrid_core.default.ViewController.inherit(columnChooserControllerMembers);

  /**
   * @type {Partial<import('./ui.grid_core.column_chooser').ColumnChooserView>}
   */
  var columnChooserMembers = {
    _resizeCore: _common.noop,
    _isWinDevice: function _isWinDevice() {
      // @ts-expect-error
      return !!_devices.default.real().win;
    },
    _initializePopupContainer: function _initializePopupContainer() {
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
        onHidden: function onHidden() {
          if (that._isWinDevice()) {
            (0, _renderer.default)('body').removeClass(that.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
          }
        },
        // @ts-expect-error
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
        label: _message.default.format('dxDataGrid-columnChooserTitle')
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
      var searchEnabled = (0, _type.isDefined)(columnChooser.allowSearch) ? columnChooser.allowSearch : (_columnChooser$search = columnChooser.search) === null || _columnChooser$search === void 0 ? void 0 : _columnChooser$search.enabled;
      var searchTimeout = (0, _type.isDefined)(columnChooser.searchTimeout) ? columnChooser.searchTimeout : (_columnChooser$search2 = columnChooser.search) === null || _columnChooser$search2 === void 0 ? void 0 : _columnChooser$search2.timeout;

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
          (0, _renderer.default)(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS);
        }
      };
    },
    _prepareSelectModeConfig: function _prepareSelectModeConfig() {
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
      var updateColumnVisibilityTimeout;
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
        clearTimeout(updateColumnVisibilityTimeout);
        updateColumnVisibilityTimeout = setTimeout(function () {
          that.component.beginUpdate();
          _this._isUpdatingColumnVisibility = true;
          updateColumnVisibility(nodes);
          that.component.endUpdate();
          _this._isUpdatingColumnVisibility = false;
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
        var needFullRender = optionsUsedInItems.some(function (optionName) {
          return optionNames[optionName];
        }) || changeTypes.columns && optionNames.all;
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
      return (0, _renderer.default)(result);
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
          right: offset.left + (0, _size.getOuterWidth)(container),
          bottom: offset.top + (0, _size.getOuterHeight)(container)
        };
      }
      return null;
    },
    showColumnChooser: function showColumnChooser() {
      ///#DEBUG
      this._isPopupContainerShown = true;
      ///#ENDDEBUG
      if (!this._popupContainer) {
        this._initializePopupContainer();
        this.render();
      }
      this._popupContainer.show();
      if (this._isWinDevice()) {
        (0, _renderer.default)('body').addClass(this.addWidgetPrefix(NOTOUCH_ACTION_CLASS));
      }
    },
    hideColumnChooser: function hideColumnChooser() {
      if (this._popupContainer) {
        this._popupContainer.hide();

        ///#DEBUG
        this._isPopupContainerShown = false;
        ///#ENDDEBUG
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
      var hiddenColumns = this.getColumns().filter(function (column) {
        return !column.visible;
      });
      return isEnabled && hiddenColumns.length;
    },
    publicMethods: function publicMethods() {
      return ['showColumnChooser', 'hideColumnChooser'];
    }
  };
  var ColumnChooserView = _uiGrid_core2.ColumnsView.inherit(columnChooserMembers);

  /**
   * @type {import('./ui.grid_core.modules').Module}
   */
  var columnChooserModule = {
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
  exports.columnChooserModule = columnChooserModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/common","./ui.grid_core.modules","./ui.grid_core.columns_view","../../localization/message","../themes","../tree_view","../../core/devices","../popup/ui.popup","../button","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/common"), require("./ui.grid_core.modules"), require("./ui.grid_core.columns_view"), require("../../localization/message"), require("../themes"), require("../tree_view"), require("../../core/devices"), require("../popup/ui.popup"), require("../button"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/utils/iterator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.column_chooser.js.map