!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/sortable.js"], ["../core/utils/size","../core/renderer","../events/core/events_engine","../core/component_registrator","../core/utils/extend","./draggable","../core/element","../core/utils/window","../core/utils/position","../animation/translator","../animation/fx","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/sortable.js", ["../core/utils/size", "../core/renderer", "../events/core/events_engine", "../core/component_registrator", "../core/utils/extend", "./draggable", "../core/element", "../core/utils/window", "../core/utils/position", "../animation/translator", "../animation/fx", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _draggable = _interopRequireDefault($__require("./draggable"));
  var _element = $__require("../core/element");
  var _window = $__require("../core/utils/window");
  var _position = $__require("../core/utils/position");
  var _translator = $__require("../animation/translator");
  var _fx = _interopRequireDefault($__require("../animation/fx"));
  var _deferred = $__require("../core/utils/deferred");
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var window = (0, _window.getWindow)();

  // STYLE sortable

  var SORTABLE = 'dxSortable';
  var PLACEHOLDER_CLASS = 'placeholder';
  var CLONE_CLASS = 'clone';
  var isElementVisible = function isElementVisible(itemElement) {
    return (0, _renderer.default)(itemElement).is(':visible');
  };
  var animate = function animate(element, config) {
    var _config$to, _config$to2;
    if (!element) return;
    var left = ((_config$to = config.to) === null || _config$to === void 0 ? void 0 : _config$to.left) || 0;
    var top = ((_config$to2 = config.to) === null || _config$to2 === void 0 ? void 0 : _config$to2.top) || 0;
    element.style.transform = "translate(".concat(left, "px,").concat(top, "px)");
    element.style.transition = _fx.default.off ? '' : "transform ".concat(config.duration, "ms ").concat(config.easing);
  };
  var stopAnimation = function stopAnimation(element) {
    if (!element) return;
    element.style.transform = '';
    element.style.transition = '';
  };
  function getScrollableBoundary($scrollable) {
    var offset = $scrollable.offset();
    var style = $scrollable[0].style;
    var paddingLeft = parseFloat(style.paddingLeft) || 0;
    var paddingRight = parseFloat(style.paddingRight) || 0;
    var paddingTop = parseFloat(style.paddingTop) || 0;
    // use clientWidth, because vertical scrollbar reduces content width
    var width = $scrollable[0].clientWidth - (paddingLeft + paddingRight);
    var height = (0, _size.getHeight)($scrollable);
    var left = offset.left + paddingLeft;
    var top = offset.top + paddingTop;
    return {
      left: left,
      right: left + width,
      top: top,
      bottom: top + height
    };
  }
  var Sortable = _draggable.default.inherit({
    _init: function _init() {
      this.callBase();
      this._sourceScrollHandler = this._handleSourceScroll.bind(this);
      this._sourceScrollableInfo = null;
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        clone: true,
        filter: '> *',
        itemOrientation: 'vertical',
        dropFeedbackMode: 'push',
        allowDropInsideItem: false,
        allowReordering: true,
        moveItemOnDrop: false,
        onDragChange: null,
        onAdd: null,
        onRemove: null,
        onReorder: null,
        /**
         * @section Utils
         * @default null
         * @name dxSortableOptions.onPlaceholderPrepared
         * @type function(e)
         * @type_function_param1 e:object
         * @type_function_param1_field1 component:this
         * @type_function_param1_field2 element:DxElement
         * @type_function_param1_field3 model:object
         * @type_function_param1_field4 event:event
         * @type_function_param1_field5 cancel:boolean
         * @type_function_param1_field6 itemData:any
         * @type_function_param1_field7 itemElement:DxElement
         * @type_function_param1_field8 fromIndex:number
         * @type_function_param1_field9 toIndex:number
         * @type_function_param1_field10 fromData:any
         * @type_function_param1_field11 toData:any
         * @type_function_param1_field12 dropInsideItem:boolean
         * @action
         * @hidden
         */
        onPlaceholderPrepared: null,
        animation: {
          type: 'slide',
          duration: 300,
          easing: 'ease'
        },
        fromIndex: null,
        toIndex: null,
        dropInsideItem: false,
        itemPoints: null,
        fromIndexOffset: 0,
        offset: 0,
        autoUpdate: false,
        draggableElementSize: 0
      });
    },
    reset: function reset() {
      this.option({
        dropInsideItem: false,
        toIndex: null,
        fromIndex: null,
        itemPoints: null,
        fromIndexOffset: 0,
        draggableElementSize: 0
      });
      if (this._$placeholderElement) {
        this._$placeholderElement.remove();
      }
      this._$placeholderElement = null;
      if (!this._isIndicateMode() && this._$modifiedItem) {
        this._$modifiedItem.css('marginBottom', this._modifiedItemMargin);
        this._$modifiedItem = null;
      }
    },
    _getPrevVisibleItem: function _getPrevVisibleItem(items, index) {
      return items.slice(0, index).reverse().filter(isElementVisible)[0];
    },
    _dragStartHandler: function _dragStartHandler(e) {
      this.callBase.apply(this, arguments);
      if (e.cancel === true) {
        return;
      }
      var $sourceElement = this._getSourceElement();
      this._updateItemPoints();
      this._subscribeToSourceScroll(e);
      this.option('fromIndex', this._getElementIndex($sourceElement));
      this.option('fromIndexOffset', this.option('offset'));
    },
    _subscribeToSourceScroll: function _subscribeToSourceScroll(e) {
      var $scrollable = this._getScrollable((0, _renderer.default)(e.target));
      if ($scrollable) {
        this._sourceScrollableInfo = {
          element: $scrollable,
          scrollLeft: $scrollable.scrollLeft(),
          scrollTop: $scrollable.scrollTop()
        };
        _events_engine.default.off($scrollable, 'scroll', this._sourceScrollHandler);
        _events_engine.default.on($scrollable, 'scroll', this._sourceScrollHandler);
      }
    },
    _unsubscribeFromSourceScroll: function _unsubscribeFromSourceScroll() {
      if (this._sourceScrollableInfo) {
        _events_engine.default.off(this._sourceScrollableInfo.element, 'scroll', this._sourceScrollHandler);
        this._sourceScrollableInfo = null;
      }
    },
    _handleSourceScroll: function _handleSourceScroll(e) {
      var _this = this;
      var sourceScrollableInfo = this._sourceScrollableInfo;
      if (sourceScrollableInfo) {
        ['scrollLeft', 'scrollTop'].forEach(function (scrollProp) {
          if (e.target[scrollProp] !== sourceScrollableInfo[scrollProp]) {
            var scrollBy = e.target[scrollProp] - sourceScrollableInfo[scrollProp];
            _this._correctItemPoints(scrollBy);
            _this._movePlaceholder();
            sourceScrollableInfo[scrollProp] = e.target[scrollProp];
          }
        });
      }
    },
    _dragEnterHandler: function _dragEnterHandler(e) {
      this.callBase.apply(this, arguments);
      if (this === this._getSourceDraggable()) {
        return;
      }
      this._subscribeToSourceScroll(e);
      this._updateItemPoints();
      this.option('fromIndex', -1);
      if (!this._isIndicateMode()) {
        var itemPoints = this.option('itemPoints');
        var lastItemPoint = itemPoints[itemPoints.length - 1];
        if (lastItemPoint) {
          var $element = this.$element();
          var $sourceElement = this._getSourceElement();
          var isVertical = this._isVerticalOrientation();
          var sourceElementSize = isVertical ? (0, _size.getOuterHeight)($sourceElement, true) : (0, _size.getOuterWidth)($sourceElement, true);
          var scrollSize = $element.get(0)[isVertical ? 'scrollHeight' : 'scrollWidth'];
          var scrollPosition = $element.get(0)[isVertical ? 'scrollTop' : 'scrollLeft'];
          var positionProp = isVertical ? 'top' : 'left';
          var lastPointPosition = lastItemPoint[positionProp];
          var elementPosition = $element.offset()[positionProp];
          var freeSize = elementPosition + scrollSize - scrollPosition - lastPointPosition;
          if (freeSize < sourceElementSize) {
            if (isVertical) {
              var items = this._getItems();
              var $lastItem = (0, _renderer.default)(this._getPrevVisibleItem(items));
              this._$modifiedItem = $lastItem;
              this._modifiedItemMargin = $lastItem.get(0).style.marginBottom;
              $lastItem.css('marginBottom', sourceElementSize - freeSize);
              var $sortable = $lastItem.closest('.dx-sortable');
              var sortable = $sortable.data('dxScrollable') || $sortable.data('dxScrollView');
              sortable && sortable.update();
            }
          }
        }
      }
    },
    _dragLeaveHandler: function _dragLeaveHandler() {
      this.callBase.apply(this, arguments);
      if (this !== this._getSourceDraggable()) {
        this._unsubscribeFromSourceScroll();
      }
    },
    dragEnter: function dragEnter() {
      if (this !== this._getTargetDraggable()) {
        this.option('toIndex', -1);
      }
    },
    dragLeave: function dragLeave() {
      if (this !== this._getTargetDraggable()) {
        this.option('toIndex', this.option('fromIndex'));
      }
    },
    _allowDrop: function _allowDrop(event) {
      var targetDraggable = this._getTargetDraggable();
      var $targetDraggable = targetDraggable.$element();
      var $scrollable = this._getScrollable($targetDraggable);
      if ($scrollable) {
        var _getScrollableBoundar = getScrollableBoundary($scrollable),
            left = _getScrollableBoundar.left,
            right = _getScrollableBoundar.right,
            top = _getScrollableBoundar.top,
            bottom = _getScrollableBoundar.bottom;
        var toIndex = this.option('toIndex');
        var itemPoints = this.option('itemPoints');
        var itemPoint = itemPoints === null || itemPoints === void 0 ? void 0 : itemPoints.filter(function (item) {
          return item.index === toIndex;
        })[0];
        if (itemPoint && itemPoint.top !== undefined) {
          var isVertical = this._isVerticalOrientation();
          if (isVertical) {
            return top <= Math.ceil(itemPoint.top) && Math.floor(itemPoint.top) <= bottom;
          } else {
            return left <= Math.ceil(itemPoint.left) && Math.floor(itemPoint.left) <= right;
          }
        }
      }
      return true;
    },
    dragEnd: function dragEnd(sourceEvent) {
      this._unsubscribeFromSourceScroll();
      var $sourceElement = this._getSourceElement();
      var sourceDraggable = this._getSourceDraggable();
      var isSourceDraggable = sourceDraggable.NAME !== this.NAME;
      var toIndex = this.option('toIndex');
      var event = sourceEvent.event;
      var allowDrop = this._allowDrop(event);
      if (toIndex !== null && toIndex >= 0 && allowDrop) {
        var cancelAdd;
        var cancelRemove;
        if (sourceDraggable !== this) {
          cancelAdd = this._fireAddEvent(event);
          if (!cancelAdd) {
            cancelRemove = this._fireRemoveEvent(event);
          }
        }
        if (isSourceDraggable) {
          (0, _translator.resetPosition)($sourceElement);
        }
        if (this.option('moveItemOnDrop')) {
          !cancelAdd && this._moveItem($sourceElement, toIndex, cancelRemove);
        }
        if (sourceDraggable === this) {
          return this._fireReorderEvent(event);
        }
      }
      return new _deferred.Deferred().resolve();
    },
    dragMove: function dragMove(e) {
      var itemPoints = this.option('itemPoints');
      if (!itemPoints) {
        return;
      }
      var isVertical = this._isVerticalOrientation();
      var axisName = isVertical ? 'top' : 'left';
      var cursorPosition = isVertical ? e.pageY : e.pageX;
      var rtlEnabled = this.option('rtlEnabled');
      var itemPoint;
      for (var i = itemPoints.length - 1; i >= 0; i--) {
        var centerPosition = itemPoints[i + 1] && (itemPoints[i][axisName] + itemPoints[i + 1][axisName]) / 2;
        if ((!isVertical && rtlEnabled ? cursorPosition > centerPosition : centerPosition > cursorPosition) || centerPosition === undefined) {
          itemPoint = itemPoints[i];
        } else {
          break;
        }
      }
      if (itemPoint) {
        this._updatePlaceholderPosition(e, itemPoint);
        if (this._verticalScrollHelper.isScrolling() && this._isIndicateMode()) {
          this._movePlaceholder();
        }
      }
    },
    _isIndicateMode: function _isIndicateMode() {
      return this.option('dropFeedbackMode') === 'indicate' || this.option('allowDropInsideItem');
    },
    _createPlaceholder: function _createPlaceholder() {
      var $placeholderContainer;
      if (this._isIndicateMode()) {
        $placeholderContainer = (0, _renderer.default)('<div>').addClass(this._addWidgetPrefix(PLACEHOLDER_CLASS)).insertBefore(this._getSourceDraggable()._$dragElement);
      }
      this._$placeholderElement = $placeholderContainer;
      return $placeholderContainer;
    },
    _getItems: function _getItems() {
      var itemsSelector = this._getItemsSelector();
      return this._$content().find(itemsSelector).not('.' + this._addWidgetPrefix(PLACEHOLDER_CLASS)).not('.' + this._addWidgetPrefix(CLONE_CLASS)).toArray();
    },
    _allowReordering: function _allowReordering() {
      var sourceDraggable = this._getSourceDraggable();
      var targetDraggable = this._getTargetDraggable();
      return sourceDraggable !== targetDraggable || this.option('allowReordering');
    },
    _isValidPoint: function _isValidPoint(visibleIndex, draggableVisibleIndex, dropInsideItem) {
      var allowDropInsideItem = this.option('allowDropInsideItem');
      var allowReordering = dropInsideItem || this._allowReordering();
      if (!allowReordering && (visibleIndex !== 0 || !allowDropInsideItem)) {
        return false;
      }
      if (!this._isIndicateMode()) {
        return true;
      }
      return draggableVisibleIndex === -1 || visibleIndex !== draggableVisibleIndex && (dropInsideItem || visibleIndex !== draggableVisibleIndex + 1);
    },
    _getItemPoints: function _getItemPoints() {
      var that = this;
      var result = [];
      var $item;
      var offset;
      var itemWidth;
      var rtlEnabled = that.option('rtlEnabled');
      var isVertical = that._isVerticalOrientation();
      var itemElements = that._getItems();
      var visibleItemElements = itemElements.filter(isElementVisible);
      var visibleItemCount = visibleItemElements.length;
      var $draggableItem = this._getDraggableElement();
      var draggableVisibleIndex = visibleItemElements.indexOf($draggableItem.get(0));
      if (visibleItemCount) {
        for (var i = 0; i <= visibleItemCount; i++) {
          var needCorrectLeftPosition = !isVertical && rtlEnabled ^ i === visibleItemCount;
          var needCorrectTopPosition = isVertical && i === visibleItemCount;
          if (i < visibleItemCount) {
            $item = (0, _renderer.default)(visibleItemElements[i]);
            offset = $item.offset();
            itemWidth = (0, _size.getOuterWidth)($item);
          }
          result.push({
            dropInsideItem: false,
            left: offset.left + (needCorrectLeftPosition ? itemWidth : 0),
            top: offset.top + (needCorrectTopPosition ? result[i - 1].height : 0),
            index: i === visibleItemCount ? itemElements.length : itemElements.indexOf($item.get(0)),
            $item: $item,
            width: (0, _size.getOuterWidth)($item),
            height: (0, _size.getOuterHeight)($item),
            isValid: that._isValidPoint(i, draggableVisibleIndex)
          });
        }
        if (this.option('allowDropInsideItem')) {
          var points = result;
          result = [];
          for (var _i = 0; _i < points.length; _i++) {
            result.push(points[_i]);
            if (points[_i + 1]) {
              result.push((0, _extend.extend)({}, points[_i], {
                dropInsideItem: true,
                top: Math.floor((points[_i].top + points[_i + 1].top) / 2),
                left: Math.floor((points[_i].left + points[_i + 1].left) / 2),
                isValid: this._isValidPoint(_i, draggableVisibleIndex, true)
              }));
            }
          }
        }
      } else {
        result.push({
          dropInsideItem: false,
          index: 0,
          isValid: true
        });
      }
      return result;
    },
    _updateItemPoints: function _updateItemPoints(forceUpdate) {
      if (forceUpdate || this.option('autoUpdate') || !this.option('itemPoints')) {
        this.option('itemPoints', this._getItemPoints());
      }
    },
    _correctItemPoints: function _correctItemPoints(scrollBy) {
      var itemPoints = this.option('itemPoints');
      if (scrollBy && itemPoints && !this.option('autoUpdate')) {
        var isVertical = this._isVerticalOrientation();
        var positionPropName = isVertical ? 'top' : 'left';
        itemPoints.forEach(function (itemPoint) {
          itemPoint[positionPropName] -= scrollBy;
        });
      }
    },
    _getElementIndex: function _getElementIndex($itemElement) {
      return this._getItems().indexOf($itemElement.get(0));
    },
    _getDragTemplateArgs: function _getDragTemplateArgs($element) {
      var args = this.callBase.apply(this, arguments);
      args.model.fromIndex = this._getElementIndex($element);
      return args;
    },
    _togglePlaceholder: function _togglePlaceholder(value) {
      this._$placeholderElement && this._$placeholderElement.toggle(value);
    },
    _isVerticalOrientation: function _isVerticalOrientation() {
      return this.option('itemOrientation') === 'vertical';
    },
    _normalizeToIndex: function _normalizeToIndex(toIndex, skipOffsetting) {
      var isAnotherDraggable = this._getSourceDraggable() !== this._getTargetDraggable();
      var fromIndex = this._getActualFromIndex();
      if (toIndex === null) {
        return fromIndex;
      }
      return Math.max(isAnotherDraggable || fromIndex >= toIndex || skipOffsetting ? toIndex : toIndex - 1, 0);
    },
    _updatePlaceholderPosition: function _updatePlaceholderPosition(e, itemPoint) {
      var sourceDraggable = this._getSourceDraggable();
      var toIndex = this._normalizeToIndex(itemPoint.index, itemPoint.dropInsideItem);
      var eventArgs = (0, _extend.extend)(this._getEventArgs(e), {
        toIndex: toIndex,
        dropInsideItem: itemPoint.dropInsideItem
      });
      itemPoint.isValid && this._getAction('onDragChange')(eventArgs);
      if (eventArgs.cancel || !itemPoint.isValid) {
        if (!itemPoint.isValid) {
          this.option({
            dropInsideItem: false,
            toIndex: null
          });
        }
        return;
      }
      this.option({
        dropInsideItem: itemPoint.dropInsideItem,
        toIndex: itemPoint.index
      });
      this._getAction('onPlaceholderPrepared')((0, _extend.extend)(this._getEventArgs(e), {
        placeholderElement: (0, _element.getPublicElement)(this._$placeholderElement),
        dragElement: (0, _element.getPublicElement)(sourceDraggable._$dragElement)
      }));
      this._updateItemPoints();
    },
    _makeWidthCorrection: function _makeWidthCorrection($item, width) {
      this._$scrollable = this._getScrollable($item);
      if (this._$scrollable) {
        var scrollableWidth = (0, _size.getWidth)(this._$scrollable);
        var overflowLeft = this._$scrollable.offset().left - $item.offset().left;
        var overflowRight = (0, _size.getOuterWidth)($item) - overflowLeft - scrollableWidth;
        if (overflowLeft > 0) {
          width -= overflowLeft;
        }
        if (overflowRight > 0) {
          width -= overflowRight;
        }
      }
      return width;
    },
    _updatePlaceholderSizes: function _updatePlaceholderSizes($placeholderElement, itemElement) {
      var that = this;
      var dropInsideItem = that.option('dropInsideItem');
      var $item = (0, _renderer.default)(itemElement);
      var isVertical = that._isVerticalOrientation();
      var width = '';
      var height = '';
      $placeholderElement.toggleClass(that._addWidgetPrefix('placeholder-inside'), dropInsideItem);
      if (isVertical || dropInsideItem) {
        width = (0, _size.getOuterWidth)($item);
      }
      if (!isVertical || dropInsideItem) {
        height = (0, _size.getOuterHeight)($item);
      }
      width = that._makeWidthCorrection($item, width);
      $placeholderElement.css({
        width: width,
        height: height
      });
    },
    _moveItem: function _moveItem($itemElement, index, cancelRemove) {
      var $prevTargetItemElement;
      var $itemElements = this._getItems();
      var $targetItemElement = $itemElements[index];
      var sourceDraggable = this._getSourceDraggable();
      if (cancelRemove) {
        $itemElement = $itemElement.clone();
        sourceDraggable._toggleDragSourceClass(false, $itemElement);
      }
      if (!$targetItemElement) {
        $prevTargetItemElement = $itemElements[index - 1];
      }
      this._moveItemCore($itemElement, $targetItemElement, $prevTargetItemElement);
    },
    _moveItemCore: function _moveItemCore($targetItem, item, prevItem) {
      if (!item && !prevItem) {
        $targetItem.appendTo(this.$element());
      } else if (prevItem) {
        $targetItem.insertAfter((0, _renderer.default)(prevItem));
      } else {
        $targetItem.insertBefore((0, _renderer.default)(item));
      }
    },
    _getDragStartArgs: function _getDragStartArgs(e, $itemElement) {
      return (0, _extend.extend)(this.callBase.apply(this, arguments), {
        fromIndex: this._getElementIndex($itemElement)
      });
    },
    _getEventArgs: function _getEventArgs(e) {
      var sourceDraggable = this._getSourceDraggable();
      var targetDraggable = this._getTargetDraggable();
      var dropInsideItem = targetDraggable.option('dropInsideItem');
      return (0, _extend.extend)(this.callBase.apply(this, arguments), {
        fromIndex: sourceDraggable.option('fromIndex'),
        toIndex: this._normalizeToIndex(targetDraggable.option('toIndex'), dropInsideItem),
        dropInsideItem: dropInsideItem
      });
    },
    _optionChanged: function _optionChanged(args) {
      var _this2 = this;
      var name = args.name;
      switch (name) {
        case 'onDragChange':
        case 'onPlaceholderPrepared':
        case 'onAdd':
        case 'onRemove':
        case 'onReorder':
          this['_' + name + 'Action'] = this._createActionByOption(name);
          break;
        case 'itemOrientation':
        case 'allowDropInsideItem':
        case 'moveItemOnDrop':
        case 'dropFeedbackMode':
        case 'itemPoints':
        case 'animation':
        case 'allowReordering':
        case 'fromIndexOffset':
        case 'offset':
        case 'draggableElementSize':
        case 'autoUpdate':
          break;
        case 'fromIndex':
          [false, true].forEach(function (isDragSource) {
            var fromIndex = isDragSource ? args.value : args.previousValue;
            if (fromIndex !== null) {
              var $fromElement = (0, _renderer.default)(_this2._getItems()[fromIndex]);
              _this2._toggleDragSourceClass(isDragSource, $fromElement);
            }
          });
          break;
        case 'dropInsideItem':
          this._optionChangedDropInsideItem(args);
          break;
        case 'toIndex':
          this._optionChangedToIndex(args);
          break;
        default:
          this.callBase(args);
      }
    },
    _optionChangedDropInsideItem: function _optionChangedDropInsideItem() {
      if (this._isIndicateMode() && this._$placeholderElement) {
        this._movePlaceholder();
      }
    },
    _isPositionVisible: function _isPositionVisible(position) {
      var $element = this.$element();
      var scrollContainer;
      if ($element.css('overflow') !== 'hidden') {
        scrollContainer = $element.get(0);
      } else {
        $element.parents().each(function () {
          if ((0, _renderer.default)(this).css('overflow') !== 'visible') {
            scrollContainer = this;
            return false;
          }
        });
      }
      if (scrollContainer) {
        var clientRect = (0, _position.getBoundingRect)(scrollContainer);
        var isVerticalOrientation = this._isVerticalOrientation();
        var start = isVerticalOrientation ? 'top' : 'left';
        var end = isVerticalOrientation ? 'bottom' : 'right';
        var pageOffset = isVerticalOrientation ? window.pageYOffset : window.pageXOffset;
        if (position[start] < clientRect[start] + pageOffset || position[start] > clientRect[end] + pageOffset) {
          return false;
        }
      }
      return true;
    },
    _optionChangedToIndex: function _optionChangedToIndex(args) {
      var toIndex = args.value;
      if (this._isIndicateMode()) {
        var showPlaceholder = toIndex !== null && toIndex >= 0;
        this._togglePlaceholder(showPlaceholder);
        if (showPlaceholder) {
          this._movePlaceholder();
        }
      } else {
        this._moveItems(args.previousValue, args.value, args.fullUpdate);
      }
    },
    update: function update() {
      if (this.option('fromIndex') === null && this.option('toIndex') === null) {
        return;
      }
      this._updateItemPoints(true);
      this._updateDragSourceClass();
      var toIndex = this.option('toIndex');
      this._optionChangedToIndex({
        value: toIndex,
        fullUpdate: true
      });
    },
    _updateDragSourceClass: function _updateDragSourceClass() {
      var fromIndex = this._getActualFromIndex();
      var $fromElement = (0, _renderer.default)(this._getItems()[fromIndex]);
      if ($fromElement.length) {
        this._$sourceElement = $fromElement;
        this._toggleDragSourceClass(true, $fromElement);
      }
    },
    _makeLeftCorrection: function _makeLeftCorrection(left) {
      var that = this;
      var $scrollable = that._$scrollable;
      if ($scrollable && that._isVerticalOrientation()) {
        var overflowLeft = $scrollable.offset().left - left;
        if (overflowLeft > 0) {
          left += overflowLeft;
        }
      }
      return left;
    },
    _movePlaceholder: function _movePlaceholder() {
      var that = this;
      var $placeholderElement = that._$placeholderElement || that._createPlaceholder();
      if (!$placeholderElement) {
        return;
      }
      var items = that._getItems();
      var toIndex = that.option('toIndex');
      var isVerticalOrientation = that._isVerticalOrientation();
      var rtlEnabled = this.option('rtlEnabled');
      var dropInsideItem = that.option('dropInsideItem');
      var position = null;
      var itemElement = items[toIndex];
      if (itemElement) {
        var $itemElement = (0, _renderer.default)(itemElement);
        position = $itemElement.offset();
        if (!isVerticalOrientation && rtlEnabled && !dropInsideItem) {
          position.left += (0, _size.getOuterWidth)($itemElement, true);
        }
      } else {
        var prevVisibleItemElement = itemElement = this._getPrevVisibleItem(items, toIndex);
        if (prevVisibleItemElement) {
          position = (0, _renderer.default)(prevVisibleItemElement).offset();
          if (isVerticalOrientation) {
            position.top += (0, _size.getOuterHeight)(prevVisibleItemElement, true);
          } else if (!rtlEnabled) {
            position.left += (0, _size.getOuterWidth)(prevVisibleItemElement, true);
          }
        }
      }
      that._updatePlaceholderSizes($placeholderElement, itemElement);
      if (position && !that._isPositionVisible(position)) {
        position = null;
      }
      if (position) {
        var isLastVerticalPosition = isVerticalOrientation && toIndex === items.length;
        var outerPlaceholderHeight = (0, _size.getOuterHeight)($placeholderElement);
        position.left = that._makeLeftCorrection(position.left);
        position.top = isLastVerticalPosition && position.top >= outerPlaceholderHeight ? position.top - outerPlaceholderHeight : position.top;
        that._move(position, $placeholderElement);
      }
      $placeholderElement.toggle(!!position);
    },
    _getPositions: function _getPositions(items, elementSize, fromIndex, toIndex) {
      var positions = [];
      for (var i = 0; i < items.length; i++) {
        var position = 0;
        if (toIndex === null || fromIndex === null) {
          positions.push(position);
          continue;
        }
        if (fromIndex === -1) {
          if (i >= toIndex) {
            position = elementSize;
          }
        } else if (toIndex === -1) {
          if (i > fromIndex) {
            position = -elementSize;
          }
        } else if (fromIndex < toIndex) {
          if (i > fromIndex && i < toIndex) {
            position = -elementSize;
          }
        } else if (fromIndex > toIndex) {
          if (i >= toIndex && i < fromIndex) {
            position = elementSize;
          }
        }
        positions.push(position);
      }
      return positions;
    },
    _getDraggableElementSize: function _getDraggableElementSize(isVerticalOrientation) {
      var $draggableItem = this._getDraggableElement();
      var size = this.option('draggableElementSize');
      if (!size) {
        size = isVerticalOrientation ? ((0, _size.getOuterHeight)($draggableItem) + (0, _size.getOuterHeight)($draggableItem, true)) / 2 : ((0, _size.getOuterWidth)($draggableItem) + (0, _size.getOuterWidth)($draggableItem, true)) / 2;
        if (!this.option('autoUpdate')) {
          this.option('draggableElementSize', size);
        }
      }
      return size;
    },
    _getActualFromIndex: function _getActualFromIndex() {
      var _this$option = this.option(),
          fromIndex = _this$option.fromIndex,
          fromIndexOffset = _this$option.fromIndexOffset,
          offset = _this$option.offset;
      return fromIndex == null ? null : fromIndex + fromIndexOffset - offset;
    },
    _moveItems: function _moveItems(prevToIndex, toIndex, fullUpdate) {
      var fromIndex = this._getActualFromIndex();
      var isVerticalOrientation = this._isVerticalOrientation();
      var positionPropName = isVerticalOrientation ? 'top' : 'left';
      var elementSize = this._getDraggableElementSize(isVerticalOrientation);
      var items = this._getItems();
      var prevPositions = this._getPositions(items, elementSize, fromIndex, prevToIndex);
      var positions = this._getPositions(items, elementSize, fromIndex, toIndex);
      var animationConfig = this.option('animation');
      var rtlEnabled = this.option('rtlEnabled');
      for (var i = 0; i < items.length; i++) {
        var itemElement = items[i];
        var prevPosition = prevPositions[i];
        var position = positions[i];
        if (toIndex === null || fromIndex === null) {
          stopAnimation(itemElement);
        } else if (prevPosition !== position || fullUpdate && position) {
          animate(itemElement, (0, _extend.extend)({}, animationConfig, {
            to: _defineProperty({}, positionPropName, !isVerticalOrientation && rtlEnabled ? -position : position)
          }));
        }
      }
    },
    _toggleDragSourceClass: function _toggleDragSourceClass(value, $element) {
      var $sourceElement = $element || this._$sourceElement;
      this.callBase.apply(this, arguments);
      if (!this._isIndicateMode()) {
        $sourceElement && $sourceElement.toggleClass(this._addWidgetPrefix('source-hidden'), value);
      }
    },
    _dispose: function _dispose() {
      this.reset();
      this.callBase();
    },
    _fireAddEvent: function _fireAddEvent(sourceEvent) {
      var args = this._getEventArgs(sourceEvent);
      this._getAction('onAdd')(args);
      return args.cancel;
    },
    _fireRemoveEvent: function _fireRemoveEvent(sourceEvent) {
      var sourceDraggable = this._getSourceDraggable();
      var args = this._getEventArgs(sourceEvent);
      sourceDraggable._getAction('onRemove')(args);
      return args.cancel;
    },
    _fireReorderEvent: function _fireReorderEvent(sourceEvent) {
      var args = this._getEventArgs(sourceEvent);
      this._getAction('onReorder')(args);
      return args.promise || new _deferred.Deferred().resolve();
    }
  });
  (0, _component_registrator.default)(SORTABLE, Sortable);
  var _default = Sortable;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../events/core/events_engine","../core/component_registrator","../core/utils/extend","./draggable","../core/element","../core/utils/window","../core/utils/position","../animation/translator","../animation/fx","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/component_registrator"), require("../core/utils/extend"), require("./draggable"), require("../core/element"), require("../core/utils/window"), require("../core/utils/position"), require("../animation/translator"), require("../animation/fx"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sortable.js.map