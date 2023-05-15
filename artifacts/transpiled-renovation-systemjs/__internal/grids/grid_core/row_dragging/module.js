!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/grid_core/row_dragging/module.js"], ["../../../../core/utils/size","../../../../core/../core/renderer","../../../../core/../core/utils/extend","../../../../ui/sortable","../../../../core/utils/common","../module_utils","./dom","./const"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/grid_core/row_dragging/module.js", ["../../../../core/utils/size", "../../../../core/../core/renderer", "../../../../core/../core/utils/extend", "../../../../ui/sortable", "../../../../core/utils/common", "../module_utils", "./dom", "./const"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.rowDraggingModule = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/../core/renderer"));
  var _extend = $__require("../../../../core/../core/utils/extend");
  var _sortable = _interopRequireDefault($__require("../../../../ui/sortable"));
  var _common = $__require("../../../../core/utils/common");
  var _module_utils = _interopRequireDefault($__require("../module_utils"));
  var _dom = $__require("./dom");
  var _const = $__require("./const");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var RowDraggingExtender = {
    init: function init() {
      this.callBase.apply(this, arguments);
      this._updateHandleColumn();
    },
    _allowReordering: function _allowReordering() {
      var rowDragging = this.option('rowDragging');
      return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group));
    },
    _updateHandleColumn: function _updateHandleColumn() {
      var rowDragging = this.option('rowDragging');
      var allowReordering = this._allowReordering();
      var columnsController = this._columnsController;
      var isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
      columnsController && columnsController.addCommandColumn({
        type: 'drag',
        command: 'drag',
        visibleIndex: -2,
        alignment: 'center',
        cssClass: _const.CLASSES.commandDrag,
        width: 'auto',
        cellTemplate: this._getHandleTemplate(),
        visible: isHandleColumnVisible
      });
      columnsController.columnOption('type:drag', 'visible', isHandleColumnVisible);
    },
    _renderContent: function _renderContent() {
      var _this = this;
      var rowDragging = this.option('rowDragging');
      var allowReordering = this._allowReordering();
      var $content = this.callBase.apply(this, arguments);
      var isFixedTableRendering = this._isFixedTableRendering;
      var sortableName = '_sortable';
      var sortableFixedName = '_sortableFixed';
      var currentSortableName = isFixedTableRendering ? sortableFixedName : sortableName;
      var anotherSortableName = isFixedTableRendering ? sortableName : sortableFixedName;
      var togglePointerEventsStyle = function togglePointerEventsStyle(toggle) {
        var _a;
        // T929503
        (_a = _this[sortableFixedName]) === null || _a === void 0 ? void 0 : _a.$element().css('pointerEvents', toggle ? 'auto' : '');
      };
      var rowSelector = '.dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)';
      var filter = this.option('dataRowTemplate') ? "> table > tbody".concat(rowSelector) : "> table > tbody > ".concat(rowSelector);
      if ((allowReordering || this[currentSortableName]) && $content.length) {
        this[currentSortableName] = this._createComponent($content, _sortable.default, (0, _extend.extend)({
          component: this.component,
          contentTemplate: null,
          filter: filter,
          cursorOffset: function cursorOffset(options) {
            var event = options.event;
            var rowsViewOffset = (0, _renderer.default)(_this.element()).offset();
            return {
              // @ts-expect-error
              x: event.pageX - rowsViewOffset.left
            };
          },
          onDraggableElementShown: function onDraggableElementShown(e) {
            if (rowDragging.dragTemplate) {
              return;
            }
            var $dragElement = (0, _renderer.default)(e.dragElement);
            var gridInstance = $dragElement.children('.dx-widget').data(_this.component.NAME);
            _this._synchronizeScrollLeftPosition(gridInstance);
          },
          dragTemplate: this._getDraggableRowTemplate(),
          handle: rowDragging.showDragIcons && ".".concat(_const.CLASSES.commandDrag),
          dropFeedbackMode: 'indicate'
        }, rowDragging, {
          onDragStart: function onDragStart(e) {
            var _a, _b;
            (_a = _this.getController('keyboardNavigation')) === null || _a === void 0 ? void 0 : _a._resetFocusedCell();
            var row = e.component.getVisibleRows()[e.fromIndex];
            e.itemData = row && row.data;
            var isDataRow = row && row.rowType === 'data';
            e.cancel = !allowReordering || !isDataRow;
            (_b = rowDragging.onDragStart) === null || _b === void 0 ? void 0 : _b.call(rowDragging, e);
          },
          onDragEnter: function onDragEnter() {
            togglePointerEventsStyle(true);
          },
          onDragLeave: function onDragLeave() {
            togglePointerEventsStyle(false);
          },
          onDragEnd: function onDragEnd(e) {
            var _a;
            togglePointerEventsStyle(false);
            (_a = rowDragging.onDragEnd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
          },
          onAdd: function onAdd(e) {
            var _a;
            togglePointerEventsStyle(false);
            (_a = rowDragging.onAdd) === null || _a === void 0 ? void 0 : _a.call(rowDragging, e);
          },
          dropFeedbackMode: rowDragging.dropFeedbackMode,
          onOptionChanged: function onOptionChanged(e) {
            var hasFixedSortable = _this[sortableFixedName];
            if (hasFixedSortable) {
              if (e.name === 'fromIndex' || e.name === 'toIndex') {
                _this[anotherSortableName].option(e.name, e.value);
              }
            }
          }
        }));
        $content.toggleClass('dx-scrollable-container', isFixedTableRendering);
        $content.toggleClass(_const.CLASSES.sortableWithoutHandle, allowReordering && !rowDragging.showDragIcons);
      }
      return $content;
    },
    _renderCore: function _renderCore(e) {
      var _this2 = this;
      this.callBase.apply(this, arguments);
      if (e && e.changeType === 'update' && e.repaintChangesOnly && _module_utils.default.isVirtualRowRendering(this)) {
        (0, _common.deferUpdate)(function () {
          _this2._updateSortable();
        });
      }
    },
    _updateSortable: function _updateSortable() {
      var offset = this._dataController.getRowIndexOffset();
      [this._sortable, this._sortableFixed].forEach(function (sortable) {
        sortable === null || sortable === void 0 ? void 0 : sortable.option('offset', offset);
        sortable === null || sortable === void 0 ? void 0 : sortable.update();
      });
    },
    _resizeCore: function _resizeCore() {
      this.callBase.apply(this, arguments);
      this._updateSortable();
    },
    _getDraggableGridOptions: function _getDraggableGridOptions(options) {
      var gridOptions = this.option();
      var columns = this.getColumns();
      var $rowElement = (0, _renderer.default)(this.getRowElement(options.rowIndex));
      return {
        dataSource: [{
          id: 1,
          parentId: 0
        }],
        showBorders: true,
        showColumnHeaders: false,
        scrolling: {
          useNative: false,
          showScrollbar: 'never'
        },
        pager: {
          visible: false
        },
        loadingTimeout: null,
        columnFixing: gridOptions.columnFixing,
        columnAutoWidth: gridOptions.columnAutoWidth,
        showColumnLines: gridOptions.showColumnLines,
        columns: columns.map(function (column) {
          return {
            width: column.width || column.visibleWidth,
            fixed: column.fixed,
            fixedPosition: column.fixedPosition
          };
        }),
        onRowPrepared: function onRowPrepared(e) {
          var rowsView = e.component.getView('rowsView');
          (0, _renderer.default)(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone());
        }
      };
    },
    _synchronizeScrollLeftPosition: function _synchronizeScrollLeftPosition(gridInstance) {
      var scrollable = gridInstance === null || gridInstance === void 0 ? void 0 : gridInstance.getScrollable();
      scrollable === null || scrollable === void 0 ? void 0 : scrollable.scrollTo({
        x: this._scrollLeft
      });
    },
    _getDraggableRowTemplate: function _getDraggableRowTemplate() {
      var _this3 = this;
      return function (options) {
        var $rootElement = _this3.component.$element();
        var $dataGridContainer = (0, _renderer.default)('<div>');
        (0, _size.setWidth)($dataGridContainer, (0, _size.getWidth)($rootElement));
        var items = _this3._dataController.items();
        var row = items && items[options.fromIndex];
        var gridOptions = _this3._getDraggableGridOptions(row);
        _this3._createComponent($dataGridContainer, _this3.component.NAME, gridOptions);
        $dataGridContainer.find('.dx-gridbase-container').children(":not(.".concat(_this3.addWidgetPrefix(_const.CLASSES.rowsView), ")")).hide();
        return $dataGridContainer;
      };
    },
    _getHandleTemplate: function _getHandleTemplate() {
      var _this4 = this;
      return _dom.GridCoreRowDraggingDom.createHandleTemplateFunc(function (string) {
        return _this4.addWidgetPrefix(string);
      });
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'rowDragging') {
        this._updateHandleColumn();
        this._invalidate(true, true);
        args.handled = true;
      }
      this.callBase.apply(this, arguments);
    }
  };
  var rowDraggingModule = {
    defaultOptions: function defaultOptions() {
      return {
        rowDragging: {
          showDragIcons: true,
          dropFeedbackMode: 'indicate',
          allowReordering: false,
          allowDropInsideItem: false
        }
      };
    },
    extenders: {
      views: {
        rowsView: RowDraggingExtender
      }
    }
  };
  exports.rowDraggingModule = rowDraggingModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/../core/renderer","../../../../core/../core/utils/extend","../../../../ui/sortable","../../../../core/utils/common","../module_utils","./dom","./const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/../core/renderer"), require("../../../../core/../core/utils/extend"), require("../../../../ui/sortable"), require("../../../../core/utils/common"), require("../module_utils"), require("./dom"), require("./const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map