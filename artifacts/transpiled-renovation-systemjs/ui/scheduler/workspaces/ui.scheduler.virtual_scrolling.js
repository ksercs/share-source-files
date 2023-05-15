!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.virtual_scrolling.js"], ["../../../core/dom_adapter","../../../events/core/events_engine","../../../core/utils/window","../../../events/utils/index","../../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/workspaces/ui.scheduler.virtual_scrolling.js", ["../../../core/dom_adapter", "../../../events/core/events_engine", "../../../core/utils/window", "../../../events/utils/index", "../../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.VirtualScrollingRenderer = exports.VirtualScrollingDispatcher = void 0;
  var _dom_adapter = _interopRequireDefault($__require("../../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _window = $__require("../../../core/utils/window");
  var _index = $__require("../../../events/utils/index");
  var _type = $__require("../../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var DEFAULT_CELL_HEIGHT = 50;
  var MIN_CELL_WIDTH = 1;
  var MIN_SCROLL_OFFSET = 10;
  var VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT = 15;
  var DOCUMENT_SCROLL_EVENT_NAMESPACE = (0, _index.addNamespace)('scroll', 'dxSchedulerVirtualScrolling');
  var scrollingOrientations = {
    vertical: 'vertical',
    horizontal: 'horizontal',
    both: 'both',
    none: 'none'
  };
  var DefaultScrollingOrientation = scrollingOrientations.both;
  var VirtualScrollingDispatcher = /*#__PURE__*/function () {
    function VirtualScrollingDispatcher(options) {
      this.options = options;
      if (options) {
        this._rowHeight = this.getCellHeight();
        this._cellWidth = this.getCellWidth();
        this._createVirtualScrollingBase();
      }
    }
    var _proto = VirtualScrollingDispatcher.prototype;
    _proto.setViewOptions = function setViewOptions(options) {
      this.options = options;
      if (this.verticalVirtualScrolling) {
        this.verticalVirtualScrolling.options = options;
        this.verticalVirtualScrolling.itemSize = this.rowHeight;
        this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
      }
      if (this.horizontalVirtualScrolling) {
        this.horizontalVirtualScrolling.options = options;
        this.verticalVirtualScrolling.itemSize = this.cellWidth;
        this.verticalVirtualScrolling.viewportSize = this.viewportWidth;
      }
    };
    _proto.getRenderState = function getRenderState() {
      var _this$verticalVirtual, _this$horizontalVirtu;
      var verticalRenderState = ((_this$verticalVirtual = this.verticalVirtualScrolling) === null || _this$verticalVirtual === void 0 ? void 0 : _this$verticalVirtual.getRenderState()) || {};
      var horizontalRenderState = ((_this$horizontalVirtu = this.horizontalVirtualScrolling) === null || _this$horizontalVirtu === void 0 ? void 0 : _this$horizontalVirtu.getRenderState()) || {};
      return _extends({}, verticalRenderState, horizontalRenderState);
    };
    _proto.getCellHeight = function getCellHeight() {
      var cellHeight = this.options.getCellHeight();
      var result = cellHeight > 0 ? cellHeight : DEFAULT_CELL_HEIGHT;
      return Math.floor(result);
    };
    _proto.getCellWidth = function getCellWidth() {
      var cellWidth = this.options.getCellWidth();
      var minCellWidth = this.options.getCellMinWidth();

      // TODO: Remove this after CSS refactoring
      if (!cellWidth || cellWidth < minCellWidth) {
        cellWidth = minCellWidth;
      }
      var result = cellWidth > 0 ? cellWidth : MIN_CELL_WIDTH;
      return Math.floor(result);
    };
    _proto.calculateCoordinatesByDataAndPosition = function calculateCoordinatesByDataAndPosition(cellData, position, date, isCalculateTime, isVerticalDirectionView) {
      var rowIndex = position.rowIndex,
          columnIndex = position.columnIndex;
      var startDate = cellData.startDate,
          endDate = cellData.endDate,
          allDay = cellData.allDay;
      var timeToScroll = date.getTime();
      var cellStartTime = startDate.getTime();
      var cellEndTime = endDate.getTime();
      var scrollInCell = allDay || !isCalculateTime ? 0 : (timeToScroll - cellStartTime) / (cellEndTime - cellStartTime);
      var cellWidth = this.getCellWidth();
      var rowHeight = this.getCellHeight();
      var top = isVerticalDirectionView ? (rowIndex + scrollInCell) * rowHeight : rowIndex * rowHeight;
      var left = isVerticalDirectionView ? columnIndex * cellWidth : (columnIndex + scrollInCell) * cellWidth;
      if (this.isRTL) {
        left = this.options.getScrollableOuterWidth() - left;
      }
      return {
        top: top,
        left: left
      };
    };
    _proto.dispose = function dispose() {
      if (this._onScrollHandler) {
        _events_engine.default.off(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
      }
    };
    _proto.createVirtualScrolling = function createVirtualScrolling() {
      var isVerticalVirtualScrollingCreated = !!this.verticalVirtualScrolling;
      var isHorizontalVirtualScrollingCreated = !!this.horizontalVirtualScrolling;
      if (this.verticalScrollingAllowed !== isVerticalVirtualScrollingCreated || this.horizontalScrollingAllowed !== isHorizontalVirtualScrollingCreated) {
        this._rowHeight = this.getCellHeight();
        this._cellWidth = this.getCellWidth();
        this._createVirtualScrollingBase();
      }
    };
    _proto._createVirtualScrollingBase = function _createVirtualScrollingBase() {
      if (this.verticalScrollingAllowed) {
        this.verticalVirtualScrolling = new VerticalVirtualScrolling(_extends({}, this.options, {
          viewportHeight: this.viewportHeight,
          rowHeight: this.rowHeight,
          outlineCount: this.outlineCount
        }));
      }
      if (this.horizontalScrollingAllowed) {
        this.horizontalVirtualScrolling = new HorizontalVirtualScrolling(_extends({}, this.options, {
          viewportWidth: this.viewportWidth,
          cellWidth: this.cellWidth,
          outlineCount: this.outlineCount
        }));
      }
    };
    _proto.isAttachWindowScrollEvent = function isAttachWindowScrollEvent() {
      return (this.horizontalScrollingAllowed || this.verticalScrollingAllowed) && !this.height;
    };
    _proto.attachScrollableEvents = function attachScrollableEvents() {
      if (this.isAttachWindowScrollEvent()) {
        this._attachWindowScroll();
      }
    };
    _proto._attachWindowScroll = function _attachWindowScroll() {
      var _this = this;
      var window = (0, _window.getWindow)();
      this._onScrollHandler = this.options.createAction(function () {
        var scrollX = window.scrollX,
            scrollY = window.scrollY;
        if (scrollX >= MIN_SCROLL_OFFSET || scrollY >= MIN_SCROLL_OFFSET) {
          _this.handleOnScrollEvent({
            left: scrollX,
            top: scrollY
          });
        }
      });
      _events_engine.default.on(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler);
    };
    _proto.handleOnScrollEvent = function handleOnScrollEvent(scrollPosition) {
      if (scrollPosition) {
        var _this$verticalVirtual2, _this$horizontalVirtu2;
        var left = scrollPosition.left,
            top = scrollPosition.top;
        var verticalStateChanged = (0, _type.isDefined)(top) && ((_this$verticalVirtual2 = this.verticalVirtualScrolling) === null || _this$verticalVirtual2 === void 0 ? void 0 : _this$verticalVirtual2.updateState(top));
        var horizontalStateChanged = (0, _type.isDefined)(left) && ((_this$horizontalVirtu2 = this.horizontalVirtualScrolling) === null || _this$horizontalVirtu2 === void 0 ? void 0 : _this$horizontalVirtu2.updateState(left));
        if (verticalStateChanged || horizontalStateChanged) {
          var _this$options$updateR, _this$options;
          (_this$options$updateR = (_this$options = this.options).updateRender) === null || _this$options$updateR === void 0 ? void 0 : _this$options$updateR.call(_this$options);
        }
      }
    };
    _proto.updateDimensions = function updateDimensions(isForce) {
      var cellHeight = this.getCellHeight();
      var needUpdateVertical = this.verticalScrollingAllowed && cellHeight !== this.rowHeight;
      if ((needUpdateVertical || isForce) && this.verticalVirtualScrolling) {
        this.rowHeight = cellHeight;
        this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
        this.verticalVirtualScrolling.reinitState(cellHeight, isForce);
      }
      var cellWidth = this.getCellWidth();
      var needUpdateHorizontal = this.horizontalScrollingAllowed && cellWidth !== this.cellWidth;
      if ((needUpdateHorizontal || isForce) && this.horizontalVirtualScrolling) {
        this.cellWidth = cellWidth;
        this.horizontalVirtualScrolling.viewportSize = this.viewportWidth;
        this.horizontalVirtualScrolling.reinitState(cellWidth, isForce);
      }
      if (needUpdateVertical || needUpdateHorizontal) {
        var _this$options$updateG, _this$options2;
        (_this$options$updateG = (_this$options2 = this.options).updateGrid) === null || _this$options$updateG === void 0 ? void 0 : _this$options$updateG.call(_this$options2);
      }
    };
    _createClass(VirtualScrollingDispatcher, [{
      key: "isRTL",
      get: function get() {
        return this.options.isRTL();
      }
    }, {
      key: "verticalVirtualScrolling",
      get: function get() {
        return this._verticalVirtualScrolling;
      },
      set: function set(value) {
        this._verticalVirtualScrolling = value;
      }
    }, {
      key: "horizontalVirtualScrolling",
      get: function get() {
        return this._horizontalVirtualScrolling;
      },
      set: function set(value) {
        this._horizontalVirtualScrolling = value;
      }
    }, {
      key: "document",
      get: function get() {
        return _dom_adapter.default.getDocument();
      }
    }, {
      key: "height",
      get: function get() {
        return this.options.getSchedulerHeight();
      }
    }, {
      key: "width",
      get: function get() {
        return this.options.getSchedulerWidth();
      }
    }, {
      key: "rowHeight",
      get: function get() {
        return this._rowHeight;
      },
      set: function set(value) {
        this._rowHeight = value;
      }
    }, {
      key: "outlineCount",
      get: function get() {
        return this.options.getScrolling().outlineCount;
      }
    }, {
      key: "cellWidth",
      get: function get() {
        return this._cellWidth;
      },
      set: function set(value) {
        this._cellWidth = value;
      }
    }, {
      key: "viewportWidth",
      get: function get() {
        var width = this.width && this.options.getViewWidth();
        return width > 0 ? width : this.options.getWindowWidth();
      }
    }, {
      key: "viewportHeight",
      get: function get() {
        var height = this.height && this.options.getViewHeight();
        return height > 0 ? height : this.options.getWindowHeight();
      }
    }, {
      key: "cellCountInsideTopVirtualRow",
      get: function get() {
        var _this$verticalScrolli;
        return ((_this$verticalScrolli = this.verticalScrollingState) === null || _this$verticalScrolli === void 0 ? void 0 : _this$verticalScrolli.virtualItemCountBefore) || 0;
      }
    }, {
      key: "cellCountInsideLeftVirtualCell",
      get: function get() {
        var _this$horizontalScrol;
        return ((_this$horizontalScrol = this.horizontalScrollingState) === null || _this$horizontalScrol === void 0 ? void 0 : _this$horizontalScrol.virtualItemCountBefore) || 0;
      }
    }, {
      key: "cellCountInsideRightVirtualCell",
      get: function get() {
        var _this$horizontalScrol2;
        return ((_this$horizontalScrol2 = this.horizontalScrollingState) === null || _this$horizontalScrol2 === void 0 ? void 0 : _this$horizontalScrol2.virtualItemCountAfter) || 0;
      }
    }, {
      key: "topVirtualRowsCount",
      get: function get() {
        return this.cellCountInsideTopVirtualRow > 0 ? 1 : 0;
      }
    }, {
      key: "leftVirtualCellsCount",
      get: function get() {
        var virtualItemsCount = !this.isRTL ? this.cellCountInsideLeftVirtualCell : this.cellCountInsideRightVirtualCell;
        return virtualItemsCount > 0 ? 1 : 0;
      }
    }, {
      key: "virtualRowOffset",
      get: function get() {
        var _this$verticalScrolli2;
        return ((_this$verticalScrolli2 = this.verticalScrollingState) === null || _this$verticalScrolli2 === void 0 ? void 0 : _this$verticalScrolli2.virtualItemSizeBefore) || 0;
      }
    }, {
      key: "virtualCellOffset",
      get: function get() {
        var _this$horizontalScrol3;
        return ((_this$horizontalScrol3 = this.horizontalScrollingState) === null || _this$horizontalScrol3 === void 0 ? void 0 : _this$horizontalScrol3.virtualItemSizeBefore) || 0;
      }
    }, {
      key: "scrollingState",
      get: function get() {
        var _this$verticalVirtual3, _this$horizontalVirtu3;
        return {
          vertical: (_this$verticalVirtual3 = this.verticalVirtualScrolling) === null || _this$verticalVirtual3 === void 0 ? void 0 : _this$verticalVirtual3.state,
          horizontal: (_this$horizontalVirtu3 = this.horizontalVirtualScrolling) === null || _this$horizontalVirtu3 === void 0 ? void 0 : _this$horizontalVirtu3.state
        };
      }
    }, {
      key: "verticalScrollingState",
      get: function get() {
        return this.scrollingState.vertical;
      }
    }, {
      key: "horizontalScrollingState",
      get: function get() {
        return this.scrollingState.horizontal;
      }
    }, {
      key: "scrollingOrientation",
      get: function get() {
        var scrolling = this.options.getScrolling();
        if (scrolling.mode === 'standard') {
          return scrollingOrientations.none;
        }
        return scrolling.orientation || DefaultScrollingOrientation;
      }
    }, {
      key: "verticalScrollingAllowed",
      get: function get() {
        return this.scrollingOrientation === scrollingOrientations.vertical || this.scrollingOrientation === scrollingOrientations.both;
      }
    }, {
      key: "horizontalScrollingAllowed",
      get: function get() {
        return this.scrollingOrientation === scrollingOrientations.horizontal || this.scrollingOrientation === scrollingOrientations.both;
      }
    }]);
    return VirtualScrollingDispatcher;
  }();
  exports.VirtualScrollingDispatcher = VirtualScrollingDispatcher;
  var VirtualScrollingBase = /*#__PURE__*/function () {
    function VirtualScrollingBase(options) {
      this.options = options;
      this._state = this.defaultState;
      this.viewportSize = options.viewportSize;
      this._itemSize = options.itemSize;
      this._position = -1;
      this._itemSizeChanged = false;
      this.updateState(0);
    }
    var _proto2 = VirtualScrollingBase.prototype;
    _proto2.needUpdateState = function needUpdateState(position) {
      var _this$state = this.state,
          prevPosition = _this$state.prevPosition,
          startIndex = _this$state.startIndex;
      var isFirstInitialization = startIndex < 0;
      if (isFirstInitialization) {
        return true;
      }
      var isStartIndexChanged = false;
      if (this._validateAndSavePosition(position)) {
        if (position === 0 || position === this.maxScrollPosition) {
          return true;
        }
        var currentPosition = prevPosition;
        var currentItemsCount = Math.floor(currentPosition / this.itemSize);
        var itemsCount = Math.floor(position / this.itemSize);
        isStartIndexChanged = Math.abs(currentItemsCount - itemsCount) >= this.outlineCount;
      }
      return isStartIndexChanged;
    };
    _proto2._validateAndSavePosition = function _validateAndSavePosition(position) {
      if (!(0, _type.isDefined)(position)) {
        return false;
      }
      var result = this.position !== position;
      this.position = position;
      return result;
    };
    _proto2._correctPosition = function _correctPosition(position) {
      return position >= 0 ? Math.min(position, this.maxScrollPosition) : -1;
    };
    _proto2.updateState = function updateState(position, isForce) {
      position = this._correctPosition(position);
      if (!this.needUpdateState(position) && !isForce) {
        return false;
      }
      var itemsInfoBefore = this._calcItemInfoBefore(position);
      var itemsDeltaBefore = this._calcItemDeltaBefore(itemsInfoBefore);
      var _this$_calcItemInfoAf = this._calcItemInfoAfter(itemsDeltaBefore),
          outlineCountAfter = _this$_calcItemInfoAf.outlineCountAfter,
          virtualItemCountAfter = _this$_calcItemInfoAf.virtualItemCountAfter,
          itemCountWithAfter = _this$_calcItemInfoAf.itemCountWithAfter;
      var virtualItemCountBefore = itemsInfoBefore.virtualItemCountBefore,
          outlineCountBefore = itemsInfoBefore.outlineCountBefore;
      var itemCount = outlineCountBefore + itemCountWithAfter + outlineCountAfter;
      var itemCountBefore = Math.floor(position / this.itemSize);
      this.state.prevPosition = itemCountBefore * this.itemSize;
      this.state.startIndex = itemCountBefore - outlineCountBefore;
      this.state.virtualItemCountBefore = virtualItemCountBefore;
      this.state.outlineCountBefore = outlineCountBefore;
      this.state.itemCount = itemCount;
      this.state.outlineCountAfter = outlineCountAfter;
      this.state.virtualItemCountAfter = virtualItemCountAfter;
      this._updateStateCore();
      return true;
    };
    _proto2.reinitState = function reinitState(itemSize, isForceUpdate) {
      var position = this.position;
      this.itemSize = itemSize;
      this.updateState(0, isForceUpdate);
      if (position > 0) {
        this.updateState(position, isForceUpdate);
      }
    };
    _proto2._calcItemInfoBefore = function _calcItemInfoBefore(position) {
      var virtualItemCountBefore = Math.floor(position / this.itemSize);
      var outlineCountBefore = Math.min(virtualItemCountBefore, this.outlineCount);
      virtualItemCountBefore -= outlineCountBefore;
      return {
        virtualItemCountBefore: virtualItemCountBefore,
        outlineCountBefore: outlineCountBefore
      };
    };
    _proto2._calcItemDeltaBefore = function _calcItemDeltaBefore(itemInfoBefore) {
      var virtualItemCountBefore = itemInfoBefore.virtualItemCountBefore,
          outlineCountBefore = itemInfoBefore.outlineCountBefore;
      var totalItemCount = this.getTotalItemCount();
      return totalItemCount - virtualItemCountBefore - outlineCountBefore;
    };
    _proto2.getTotalItemCount = function getTotalItemCount() {
      throw 'getTotalItemCount method should be implemented';
    };
    _proto2.getRenderState = function getRenderState() {
      throw 'getRenderState method should be implemented';
    };
    _proto2._calcItemInfoAfter = function _calcItemInfoAfter(itemsDeltaBefore) {
      var itemCountWithAfter = itemsDeltaBefore >= this.pageSize ? this.pageSize : itemsDeltaBefore;
      var virtualItemCountAfter = itemsDeltaBefore - itemCountWithAfter;
      var outlineCountAfter = virtualItemCountAfter > 0 ? Math.min(virtualItemCountAfter, this.outlineCount) : 0;
      if (virtualItemCountAfter > 0) {
        virtualItemCountAfter -= outlineCountAfter;
      }
      return {
        virtualItemCountAfter: virtualItemCountAfter,
        outlineCountAfter: outlineCountAfter,
        itemCountWithAfter: itemCountWithAfter
      };
    };
    _proto2._updateStateCore = function _updateStateCore() {
      var state = this.state;
      var virtualItemCountBefore = state.virtualItemCountBefore;
      var virtualItemCountAfter = state.virtualItemCountAfter;
      var outlineCountBefore = state.outlineCountBefore;
      var outlineCountAfter = state.outlineCountAfter;
      var prevVirtualItemSizeBefore = state.virtualItemSizeBefore;
      var prevVirtualItemSizeAfter = state.virtualItemSizeAfter;
      var prevOutlineSizeBefore = state.outlineSizeBefore;
      var prevOutlineSizeAfter = state.outlineSizeAfter;
      var virtualItemSizeBefore = this.itemSize * virtualItemCountBefore;
      var virtualItemSizeAfter = this.itemSize * virtualItemCountAfter;
      var outlineSizeBefore = this.itemSize * outlineCountBefore;
      var outlineSizeAfter = this.itemSize * outlineCountAfter;
      var prevVirtualSizeBefore = prevVirtualItemSizeBefore + prevOutlineSizeBefore;
      var virtualSizeBefore = virtualItemSizeBefore + outlineSizeBefore;
      var prevVirtualSizeAfter = prevVirtualItemSizeAfter + prevOutlineSizeAfter;
      var virtualSizeAfter = virtualItemSizeAfter + outlineSizeAfter;
      var isAppend = prevVirtualSizeBefore < virtualSizeBefore;
      var isPrepend = prevVirtualSizeAfter < virtualSizeAfter;
      var needAddItems = this._itemSizeChanged || isAppend || isPrepend;
      if (needAddItems) {
        this._updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter);
      }
    };
    _proto2._updateStateVirtualItems = function _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
      var state = this.state;
      state.virtualItemSizeBefore = virtualItemSizeBefore;
      state.virtualItemSizeAfter = virtualItemSizeAfter;
    };
    _createClass(VirtualScrollingBase, [{
      key: "itemSize",
      get: function get() {
        return this._itemSize;
      },
      set: function set(value) {
        this._itemSizeChanged = this._itemSize !== value;
        this._itemSize = value;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(value) {
        this._state = value;
      }
    }, {
      key: "startIndex",
      get: function get() {
        return this.state.startIndex;
      }
    }, {
      key: "pageSize",
      get: function get() {
        return Math.ceil(this.viewportSize / this.itemSize);
      }
    }, {
      key: "outlineCount",
      get: function get() {
        return (0, _type.isDefined)(this.options.outlineCount) ? this.options.outlineCount : Math.floor(this.pageSize / 2);
      }
    }, {
      key: "groupCount",
      get: function get() {
        return this.options.getGroupCount();
      }
    }, {
      key: "isVerticalGrouping",
      get: function get() {
        return this.options.isVerticalGrouping();
      }
    }, {
      key: "defaultState",
      get: function get() {
        return {
          prevPosition: 0,
          startIndex: -1,
          itemCount: 0,
          virtualItemCountBefore: 0,
          virtualItemCountAfter: 0,
          outlineCountBefore: 0,
          outlineCountAfter: 0,
          virtualItemSizeBefore: 0,
          virtualItemSizeAfter: 0,
          outlineSizeBefore: 0,
          outlineSizeAfter: 0
        };
      }
    }, {
      key: "maxScrollPosition",
      get: function get() {
        return this.getTotalItemCount() * this.itemSize - this.viewportSize;
      }
    }, {
      key: "position",
      get: function get() {
        return this._position;
      },
      set: function set(value) {
        this._position = value;
      }
    }]);
    return VirtualScrollingBase;
  }();
  var VerticalVirtualScrolling = /*#__PURE__*/function (_VirtualScrollingBase) {
    _inheritsLoose(VerticalVirtualScrolling, _VirtualScrollingBase);
    function VerticalVirtualScrolling(options) {
      return _VirtualScrollingBase.call(this, _extends({}, options, {
        itemSize: options.rowHeight,
        viewportSize: options.viewportHeight
      })) || this;
    }
    var _proto3 = VerticalVirtualScrolling.prototype;
    _proto3.getTotalItemCount = function getTotalItemCount() {
      return this.options.getTotalRowCount(this.groupCount, this.isVerticalGrouping);
    };
    _proto3.getRenderState = function getRenderState() {
      return {
        topVirtualRowHeight: this.state.virtualItemSizeBefore,
        bottomVirtualRowHeight: this.state.virtualItemSizeAfter,
        startRowIndex: this.state.startIndex,
        rowCount: this.state.itemCount,
        startIndex: this.state.startIndex
      };
    };
    _createClass(VerticalVirtualScrolling, [{
      key: "prevTopPosition",
      get: function get() {
        return this.state.prevPosition;
      }
    }, {
      key: "rowCount",
      get: function get() {
        return this.state.itemCount;
      }
    }, {
      key: "topVirtualRowCount",
      get: function get() {
        return this.state.virtualItemCountBefore;
      }
    }, {
      key: "bottomVirtualRowCount",
      get: function get() {
        return this.state.virtualItemCountAfter;
      }
    }]);
    return VerticalVirtualScrolling;
  }(VirtualScrollingBase);
  var HorizontalVirtualScrolling = /*#__PURE__*/function (_VirtualScrollingBase2) {
    _inheritsLoose(HorizontalVirtualScrolling, _VirtualScrollingBase2);
    function HorizontalVirtualScrolling(options) {
      return _VirtualScrollingBase2.call(this, _extends({}, options, {
        itemSize: options.cellWidth,
        viewportSize: options.viewportWidth
      })) || this;
    }
    var _proto4 = HorizontalVirtualScrolling.prototype;
    _proto4.getTotalItemCount = function getTotalItemCount() {
      return this.options.getTotalCellCount(this.groupCount, this.isVerticalGrouping);
    };
    _proto4.getRenderState = function getRenderState() {
      return {
        leftVirtualCellWidth: this.state.virtualItemSizeBefore,
        rightVirtualCellWidth: this.state.virtualItemSizeAfter,
        startCellIndex: this.state.startIndex,
        cellCount: this.state.itemCount,
        cellWidth: this.itemSize
      };
    };
    _proto4._updateStateVirtualItems = function _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
      if (!this.isRTL) {
        _VirtualScrollingBase2.prototype._updateStateVirtualItems.call(this, virtualItemSizeBefore, virtualItemSizeAfter);
      } else {
        var state = this.state;
        state.virtualItemSizeAfter = virtualItemSizeBefore;
        state.virtualItemSizeBefore = virtualItemSizeAfter;
        state.startIndex = this.getTotalItemCount() - this.startIndex - this.state.itemCount;
      }
    };
    _createClass(HorizontalVirtualScrolling, [{
      key: "isRTL",
      get: function get() {
        return this.options.isRTL();
      }
    }]);
    return HorizontalVirtualScrolling;
  }(VirtualScrollingBase); // We do not need this class in renovation
  var VirtualScrollingRenderer = /*#__PURE__*/function () {
    function VirtualScrollingRenderer(workspace) {
      this._workspace = workspace;
      this._renderAppointmentTimeoutID = null;
    }
    var _proto5 = VirtualScrollingRenderer.prototype;
    _proto5.getRenderTimeout = function getRenderTimeout() {
      return this._workspace.option('isRenovatedAppointments') ? -1 : VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT;
    };
    _proto5.updateRender = function updateRender() {
      this._renderGrid();
      this._renderAppointments();
    };
    _proto5._renderGrid = function _renderGrid() {
      this.workspace.renderWorkSpace(false);
    };
    _proto5._renderAppointments = function _renderAppointments() {
      var _this2 = this;
      var renderTimeout = this.getRenderTimeout();
      if (renderTimeout >= 0) {
        clearTimeout(this._renderAppointmentTimeoutID);
        this._renderAppointmentTimeoutID = setTimeout(function () {
          return _this2.workspace.updateAppointments();
        }, renderTimeout);
      } else {
        this.workspace.updateAppointments();
      }
    };
    _createClass(VirtualScrollingRenderer, [{
      key: "workspace",
      get: function get() {
        return this._workspace;
      }
    }]);
    return VirtualScrollingRenderer;
  }();
  exports.VirtualScrollingRenderer = VirtualScrollingRenderer;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/dom_adapter","../../../events/core/events_engine","../../../core/utils/window","../../../events/utils/index","../../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/dom_adapter"), require("../../../events/core/events_engine"), require("../../../core/utils/window"), require("../../../events/utils/index"), require("../../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.virtual_scrolling.js.map