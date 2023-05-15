!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/responsive_box.js"], ["../core/utils/size","../core/renderer","../core/utils/common","../core/utils/type","./widget/ui.errors","../core/utils/window","../core/utils/iterator","../core/utils/extend","../core/component_registrator","./box","./collection/ui.collection_widget.edit"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/responsive_box.js", ["../core/utils/size", "../core/renderer", "../core/utils/common", "../core/utils/type", "./widget/ui.errors", "../core/utils/window", "../core/utils/iterator", "../core/utils/extend", "../core/component_registrator", "./box", "./collection/ui.collection_widget.edit"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _common = $__require("../core/utils/common");
  var _type = $__require("../core/utils/type");
  var _ui = _interopRequireDefault($__require("./widget/ui.errors"));
  var _window = $__require("../core/utils/window");
  var _iterator = $__require("../core/utils/iterator");
  var _extend = $__require("../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _box = _interopRequireDefault($__require("./box"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE responsiveBox

  var RESPONSIVE_BOX_CLASS = 'dx-responsivebox';
  var SCREEN_SIZE_CLASS_PREFIX = RESPONSIVE_BOX_CLASS + '-screen-';
  var BOX_ITEM_CLASS = 'dx-box-item';
  var BOX_ITEM_DATA_KEY = 'dxBoxItemData';
  var HD_SCREEN_WIDTH = 1920;
  var ResponsiveBox = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        rows: [],
        cols: [],
        screenByWidth: null,
        singleColumnScreen: '',
        height: '100%',
        width: '100%',
        /**
        * @name dxResponsiveBoxOptions.activeStateEnabled
        * @hidden
        */
        activeStateEnabled: false,
        /**
        * @name dxResponsiveBoxOptions.focusStateEnabled
        * @hidden
        */
        focusStateEnabled: false,
        onItemStateChanged: undefined,
        /**
        * @name dxResponsiveBoxOptions.accessKey
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.hint
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.noDataText
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.onSelectionChanged
        * @action
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.selectedIndex
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.selectedItem
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.selectedItems
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.selectedItemKeys
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.keyExpr
        * @hidden
        */
        /**
        * @name dxResponsiveBoxOptions.tabIndex
        * @hidden
        */

        onLayoutChanged: null,
        currentScreenFactor: undefined
      });
    },
    _init: function _init() {
      if (!this.option('screenByWidth')) {
        this._options.silent('screenByWidth', _window.defaultScreenFactorFunc);
      }
      this.callBase();
      this._initLayoutChangedAction();
    },
    _initLayoutChangedAction: function _initLayoutChangedAction() {
      this._layoutChangedAction = this._createActionByOption('onLayoutChanged', {
        excludeValidators: ['disabled', 'readonly']
      });
    },
    _itemClass: function _itemClass() {
      return BOX_ITEM_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return BOX_ITEM_DATA_KEY;
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this.$element().addClass(RESPONSIVE_BOX_CLASS);
    },
    _renderItems: function _renderItems() {
      this._setScreenSize();
      this._screenItems = this._itemsByScreen();
      this._prepareGrid();
      this._spreadItems();
      this._layoutItems();
      this._linkNodeToItem();
    },
    _itemOptionChanged: function _itemOptionChanged(item) {
      var $item = this._findItemElementByItem(item);
      if (!$item.length) {
        return;
      }
      this._refreshItem($item, item);
      this._clearItemNodeTemplates();
      this._update(true);
    },
    _setScreenSize: function _setScreenSize() {
      var currentScreen = this._getCurrentScreen();
      this._removeScreenSizeClass();
      this.$element().addClass(SCREEN_SIZE_CLASS_PREFIX + currentScreen);
      this.option('currentScreenFactor', currentScreen);
    },
    _removeScreenSizeClass: function _removeScreenSizeClass() {
      var currentScreenFactor = this.option('currentScreenFactor');
      currentScreenFactor && this.$element().removeClass(SCREEN_SIZE_CLASS_PREFIX + currentScreenFactor);
    },
    _prepareGrid: function _prepareGrid() {
      var grid = this._grid = [];
      this._prepareRowsAndCols();
      (0, _iterator.each)(this._rows, function () {
        var row = [];
        grid.push(row);
        (0, _iterator.each)(this._cols, function () {
          row.push(this._createEmptyCell());
        }.bind(this));
      }.bind(this));
    },
    getSingleColumnRows: function getSingleColumnRows() {
      var rows = this.option('rows');
      var screenItemsLength = this._screenItems.length;
      if (rows.length) {
        var filteredRows = this._filterByScreen(rows);
        var result = [];
        for (var i = 0; i < screenItemsLength; i++) {
          var sizeConfig = this._defaultSizeConfig();
          if (i < filteredRows.length && (0, _type.isDefined)(filteredRows[i].shrink)) {
            sizeConfig.shrink = filteredRows[i].shrink;
          }
          result.push(sizeConfig);
        }
        return result;
      } else {
        return this._defaultSizeConfig(screenItemsLength);
      }
    },
    _prepareRowsAndCols: function _prepareRowsAndCols() {
      if (this._isSingleColumnScreen()) {
        this._prepareSingleColumnScreenItems();
        this._rows = this.getSingleColumnRows();
        this._cols = this._defaultSizeConfig(1);
      } else {
        this._rows = this._sizesByScreen(this.option('rows'));
        this._cols = this._sizesByScreen(this.option('cols'));
      }
    },
    _isSingleColumnScreen: function _isSingleColumnScreen() {
      return this._screenRegExp().test(this.option('singleColumnScreen')) || !this.option('rows').length || !this.option('cols').length;
    },
    _prepareSingleColumnScreenItems: function _prepareSingleColumnScreenItems() {
      this._screenItems.sort(function (item1, item2) {
        return item1.location.row - item2.location.row || item1.location.col - item2.location.col;
      });
      (0, _iterator.each)(this._screenItems, function (index, item) {
        (0, _extend.extend)(item.location, {
          row: index,
          col: 0,
          rowspan: 1,
          colspan: 1
        });
      });
    },
    _sizesByScreen: function _sizesByScreen(sizeConfigs) {
      return (0, _iterator.map)(this._filterByScreen(sizeConfigs), function (sizeConfig) {
        return (0, _extend.extend)(this._defaultSizeConfig(), sizeConfig);
      }.bind(this));
    },
    _createDefaultSizeConfig: function _createDefaultSizeConfig() {
      return {
        ratio: 1,
        baseSize: 0,
        minSize: 0,
        maxSize: 0
      };
    },
    _defaultSizeConfig: function _defaultSizeConfig(size) {
      var defaultSizeConfig = this._createDefaultSizeConfig();
      if (!arguments.length) {
        return defaultSizeConfig;
      }
      var result = [];
      for (var i = 0; i < size; i++) {
        result.push(defaultSizeConfig);
      }
      return result;
    },
    _filterByScreen: function _filterByScreen(items) {
      var screenRegExp = this._screenRegExp();
      return (0, _common.grep)(items, function (item) {
        return !item.screen || screenRegExp.test(item.screen);
      });
    },
    _screenRegExp: function _screenRegExp() {
      var screen = this._getCurrentScreen();
      return new RegExp('(^|\\s)' + screen + '($|\\s)', 'i');
    },
    _getCurrentScreen: function _getCurrentScreen() {
      var width = this._screenWidth();
      return this.option('screenByWidth')(width);
    },
    _screenWidth: function _screenWidth() {
      return (0, _window.hasWindow)() ? (0, _size.getWidth)((0, _window.getWindow)()) : HD_SCREEN_WIDTH;
    },
    _createEmptyCell: function _createEmptyCell() {
      return {
        item: {},
        location: {
          colspan: 1,
          rowspan: 1
        }
      };
    },
    _spreadItems: function _spreadItems() {
      (0, _iterator.each)(this._screenItems, function (_, itemInfo) {
        var location = itemInfo.location || {};
        var itemCol = location.col;
        var itemRow = location.row;
        var row = this._grid[itemRow];
        var itemCell = row && row[itemCol];
        this._occupyCells(itemCell, itemInfo);
      }.bind(this));
    },
    _itemsByScreen: function _itemsByScreen() {
      var _this = this;
      return this.option('items').reduce(function (result, item) {
        var locations = item.location || {};
        locations = (0, _type.isPlainObject)(locations) ? [locations] : locations;
        _this._filterByScreen(locations).forEach(function (location) {
          result.push({
            item: item,
            location: (0, _extend.extend)({
              rowspan: 1,
              colspan: 1
            }, location)
          });
        });
        return result;
      }, []);
    },
    _occupyCells: function _occupyCells(itemCell, itemInfo) {
      if (!itemCell || this._isItemCellOccupied(itemCell, itemInfo)) {
        return;
      }
      (0, _extend.extend)(itemCell, itemInfo);
      this._markSpanningCell(itemCell);
    },
    _isItemCellOccupied: function _isItemCellOccupied(itemCell, itemInfo) {
      if (!(0, _type.isEmptyObject)(itemCell.item)) {
        return true;
      }
      var result = false;
      this._loopOverSpanning(itemInfo.location, function (cell) {
        result = result || !(0, _type.isEmptyObject)(cell.item);
      });
      return result;
    },
    _loopOverSpanning: function _loopOverSpanning(location, callback) {
      var rowEnd = location.row + location.rowspan - 1;
      var colEnd = location.col + location.colspan - 1;
      var boundRowEnd = Math.min(rowEnd, this._rows.length - 1);
      var boundColEnd = Math.min(colEnd, this._cols.length - 1);
      location.rowspan -= rowEnd - boundRowEnd;
      location.colspan -= colEnd - boundColEnd;
      for (var rowIndex = location.row; rowIndex <= boundRowEnd; rowIndex++) {
        for (var colIndex = location.col; colIndex <= boundColEnd; colIndex++) {
          if (rowIndex !== location.row || colIndex !== location.col) {
            callback(this._grid[rowIndex][colIndex]);
          }
        }
      }
    },
    _markSpanningCell: function _markSpanningCell(itemCell) {
      this._loopOverSpanning(itemCell.location, function (cell) {
        (0, _extend.extend)(cell, {
          item: itemCell.item,
          spanningCell: itemCell
        });
      });
    },
    _linkNodeToItem: function _linkNodeToItem() {
      (0, _iterator.each)(this._itemElements(), function (_, itemNode) {
        var $item = (0, _renderer.default)(itemNode);
        var item = $item.data(BOX_ITEM_DATA_KEY);
        if (!item.box) {
          item.node = $item.children();
        }
      });
    },
    _layoutItems: function _layoutItems() {
      var rowsCount = this._grid.length;
      var colsCount = rowsCount && this._grid[0].length;
      if (!rowsCount && !colsCount) {
        return;
      }
      var result = this._layoutBlock({
        direction: 'col',
        row: {
          start: 0,
          end: rowsCount - 1
        },
        col: {
          start: 0,
          end: colsCount - 1
        }
      });
      var rootBox = this._prepareBoxConfig(result.box || {
        direction: 'row',
        items: [(0, _extend.extend)(result, {
          ratio: 1
        })]
      });
      (0, _extend.extend)(rootBox, this._rootBoxConfig(rootBox.items));
      this._$root = (0, _renderer.default)('<div>').appendTo(this._itemContainer());
      this._createComponent(this._$root, _box.default, rootBox);
    },
    _rootBoxConfig: function _rootBoxConfig(items) {
      var rootItems = (0, _iterator.each)(items, function (index, item) {
        this._needApplyAutoBaseSize(item) && (0, _extend.extend)(item, {
          baseSize: 'auto'
        });
      }.bind(this));
      return {
        width: '100%',
        height: '100%',
        items: rootItems,
        itemTemplate: this._getTemplateByOption('itemTemplate'),
        itemHoldTimeout: this.option('itemHoldTimeout'),
        onItemHold: this._createActionByOption('onItemHold'),
        onItemClick: this._createActionByOption('onItemClick'),
        onItemContextMenu: this._createActionByOption('onItemContextMenu'),
        onItemRendered: this._createActionByOption('onItemRendered')
      };
    },
    _needApplyAutoBaseSize: function _needApplyAutoBaseSize(item) {
      return !item.baseSize && (!item.minSize || item.minSize === 'auto') && (!item.maxSize || item.maxSize === 'auto');
    },
    _prepareBoxConfig: function _prepareBoxConfig(config) {
      return (0, _extend.extend)(config || {}, {
        crossAlign: 'stretch',
        onItemStateChanged: this.option('onItemStateChanged')
      });
    },
    _layoutBlock: function _layoutBlock(options) {
      if (this._isSingleItem(options)) {
        return this._itemByCell(options.row.start, options.col.start);
      }
      return this._layoutDirection(options);
    },
    _isSingleItem: function _isSingleItem(options) {
      var firstCellLocation = this._grid[options.row.start][options.col.start].location;
      var isItemRowSpanned = options.row.end - options.row.start === firstCellLocation.rowspan - 1;
      var isItemColSpanned = options.col.end - options.col.start === firstCellLocation.colspan - 1;
      return isItemRowSpanned && isItemColSpanned;
    },
    _itemByCell: function _itemByCell(rowIndex, colIndex) {
      var itemCell = this._grid[rowIndex][colIndex];
      return itemCell.spanningCell ? null : itemCell.item;
    },
    _layoutDirection: function _layoutDirection(options) {
      var items = [];
      var direction = options.direction;
      var crossDirection = this._crossDirection(direction);
      var block;
      while (block = this._nextBlock(options)) {
        if (this._isBlockIndivisible(options.prevBlockOptions, block)) {
          throw _ui.default.Error('E1025');
        }
        var item = this._layoutBlock({
          direction: crossDirection,
          row: block.row,
          col: block.col,
          prevBlockOptions: options
        });
        if (item) {
          (0, _extend.extend)(item, this._blockSize(block, crossDirection));
          items.push(item);
        }
        options[crossDirection].start = block[crossDirection].end + 1;
      }
      return {
        box: this._prepareBoxConfig({
          direction: direction,
          items: items
        })
      };
    },
    _isBlockIndivisible: function _isBlockIndivisible(options, block) {
      return options && options.col.start === block.col.start && options.col.end === block.col.end && options.row.start === block.row.start && options.row.end === block.row.end;
    },
    _crossDirection: function _crossDirection(direction) {
      return direction === 'col' ? 'row' : 'col';
    },
    _nextBlock: function _nextBlock(options) {
      var direction = options.direction;
      var crossDirection = this._crossDirection(direction);
      var startIndex = options[direction].start;
      var endIndex = options[direction].end;
      var crossStartIndex = options[crossDirection].start;
      if (crossStartIndex > options[crossDirection].end) {
        return null;
      }
      var crossSpan = 1;
      for (var crossIndex = crossStartIndex; crossIndex < crossStartIndex + crossSpan; crossIndex++) {
        var lineCrossSpan = 1;
        for (var index = startIndex; index <= endIndex; index++) {
          var cell = this._cellByDirection(direction, index, crossIndex);
          lineCrossSpan = Math.max(lineCrossSpan, cell.location[crossDirection + 'span']);
        }
        var lineCrossEndIndex = crossIndex + lineCrossSpan;
        var crossEndIndex = crossStartIndex + crossSpan;
        if (lineCrossEndIndex > crossEndIndex) {
          crossSpan += lineCrossEndIndex - crossEndIndex;
        }
      }
      var result = {};
      result[direction] = {
        start: startIndex,
        end: endIndex
      };
      result[crossDirection] = {
        start: crossStartIndex,
        end: crossStartIndex + crossSpan - 1
      };
      return result;
    },
    _cellByDirection: function _cellByDirection(direction, index, crossIndex) {
      return direction === 'col' ? this._grid[crossIndex][index] : this._grid[index][crossIndex];
    },
    _blockSize: function _blockSize(block, direction) {
      var defaultMinSize = direction === 'row' ? 'auto' : 0;
      var sizeConfigs = direction === 'row' ? this._rows : this._cols;
      var result = (0, _extend.extend)(this._createDefaultSizeConfig(), {
        ratio: 0
      });
      for (var index = block[direction].start; index <= block[direction].end; index++) {
        var sizeConfig = sizeConfigs[index];
        result.ratio += sizeConfig.ratio;
        result.baseSize += sizeConfig.baseSize;
        result.minSize += sizeConfig.minSize;
        result.maxSize += sizeConfig.maxSize;
        if ((0, _type.isDefined)(sizeConfig.shrink)) {
          result.shrink = sizeConfig.shrink;
        }
      }
      result.minSize = result.minSize ? result.minSize : defaultMinSize;
      result.maxSize = result.maxSize ? result.maxSize : 'auto';
      this._isSingleColumnScreen() && (result.baseSize = 'auto');
      return result;
    },
    _update: function _update(forceRemoveRoot) {
      var $existingRoot = this._$root;
      this._renderItems();
      if ($existingRoot) {
        if (forceRemoveRoot) {
          $existingRoot.remove();
        } else {
          $existingRoot.detach();
          this._saveAssistantRoot($existingRoot);
        }
      }
      this._layoutChangedAction();
    },
    _saveAssistantRoot: function _saveAssistantRoot($root) {
      this._assistantRoots = this._assistantRoots || [];
      this._assistantRoots.push($root);
    },
    _dispose: function _dispose() {
      this._clearItemNodeTemplates();
      this._cleanUnusedRoots();
      this.callBase.apply(this, arguments);
    },
    _cleanUnusedRoots: function _cleanUnusedRoots() {
      if (!this._assistantRoots) {
        return;
      }
      (0, _iterator.each)(this._assistantRoots, function (_, item) {
        (0, _renderer.default)(item).remove();
      });
    },
    _clearItemNodeTemplates: function _clearItemNodeTemplates() {
      (0, _iterator.each)(this.option('items'), function () {
        delete this.node;
      });
    },
    _attachClickEvent: _common.noop,
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'rows':
        case 'cols':
        case 'screenByWidth':
        case 'singleColumnScreen':
          this._clearItemNodeTemplates();
          this._invalidate();
          break;
        case 'width':
        case 'height':
          this.callBase(args);
          this._update();
          break;
        case 'onLayoutChanged':
          this._initLayoutChangedAction();
          break;
        case 'itemTemplate':
          this._clearItemNodeTemplates();
          this.callBase(args);
          break;
        case 'currentScreenFactor':
          break;
        default:
          this.callBase(args);
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      if (this._getCurrentScreen() !== this.option('currentScreenFactor')) {
        this._update();
      }
    },
    repaint: function repaint() {
      this._update();
    }

    /**
    * @name dxResponsiveBox.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */
    /**
    * @name dxResponsiveBox.focus
    * @publicName focus()
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxResponsiveBox', ResponsiveBox);
  var _default = ResponsiveBox;
  /**
   * @name dxResponsiveBoxItem
   * @inherits CollectionWidgetItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/utils/common","../core/utils/type","./widget/ui.errors","../core/utils/window","../core/utils/iterator","../core/utils/extend","../core/component_registrator","./box","./collection/ui.collection_widget.edit"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/utils/common"), require("../core/utils/type"), require("./widget/ui.errors"), require("../core/utils/window"), require("../core/utils/iterator"), require("../core/utils/extend"), require("../core/component_registrator"), require("./box"), require("./collection/ui.collection_widget.edit"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=responsive_box.js.map