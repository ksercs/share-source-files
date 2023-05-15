!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/sortable/module.js"], ["../../../../core/utils/size","../../../../core/renderer","../../../../events/core/events_engine","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../events/utils/index","../../../../core/component_registrator","../../../../core/dom_component","../../../../core/dom_adapter","../../../../events/drag","../../../../ui/widget/swatch_container"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/sortable/module.js", ["../../../../core/utils/size", "../../../../core/renderer", "../../../../events/core/events_engine", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../events/utils/index", "../../../../core/component_registrator", "../../../../core/dom_component", "../../../../core/dom_adapter", "../../../../events/drag", "../../../../ui/widget/swatch_container"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Sortable = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _index = $__require("../../../../events/utils/index");
  var _component_registrator = _interopRequireDefault($__require("../../../../core/component_registrator"));
  var _dom_component = _interopRequireDefault($__require("../../../../core/dom_component"));
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _drag = $__require("../../../../events/drag");
  var _swatch_container = _interopRequireDefault($__require("../../../../ui/widget/swatch_container"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var getSwatchContainer = _swatch_container.default.getSwatchContainer;
  var SORTABLE_NAMESPACE = 'dxSortable';
  var SORTABLE_CLASS = 'dx-sortable-old';
  var SCROLL_STEP = 2;
  var START_SCROLL_OFFSET = 20;
  var SCROLL_TIMEOUT = 10;
  function elementHasPoint(element, x, y) {
    var $item = (0, _renderer.default)(element);
    var offset = $item.offset();
    if (x >= offset.left && x <= offset.left + (0, _size.getOuterWidth)($item, true)) {
      if (y >= offset.top && y <= offset.top + (0, _size.getOuterHeight)($item, true)) {
        return true;
      }
    }
    return undefined;
  }
  function checkHorizontalPosition(position, itemOffset, rtl) {
    if ((0, _type.isDefined)(itemOffset.posHorizontal)) {
      return rtl ? position > itemOffset.posHorizontal : position < itemOffset.posHorizontal;
    }
    return true;
  }
  function getIndex($items, $item) {
    var index = -1;
    var itemElement = $item.get(0);
    (0, _iterator.each)($items, function (elementIndex, element) {
      var $element = (0, _renderer.default)(element);
      if (!($element.attr('item-group') && $element.attr('item-group') === $items.eq(elementIndex - 1).attr('item-group'))) {
        index += 1;
      }
      if (element === itemElement) {
        return false;
      }
      return undefined;
    });
    return index === $items.length ? -1 : index;
  }
  function getTargetGroup(e, $groups) {
    var result;
    (0, _iterator.each)($groups, function () {
      if (elementHasPoint(this, e.pageX, e.pageY)) {
        result = (0, _renderer.default)(this);
      }
    });
    return result;
  }
  function getItemsOffset($elements, isVertical, $itemsContainer) {
    var result = [];
    var $item = [];
    for (var i = 0; i < $elements.length; i += $item.length) {
      $item = $elements.eq(i);
      if ($item.attr('item-group')) {
        $item = $itemsContainer.find("[item-group='".concat($item.attr('item-group'), "']"));
      }
      if ($item.is(':visible')) {
        var offset = {
          item: $item,
          index: result.length,
          posVertical: isVertical ? ($item.last().offset().top + $item.offset().top + (0, _size.getOuterHeight)($item.last(), true)) / 2 : (0, _size.getOuterHeight)($item.last(), true) + $item.last().offset().top,
          posHorizontal: isVertical ? undefined : ((0, _size.getOuterWidth)($item.last(), true) + $item.last().offset().left + $item.offset().left) / 2
        };
        result.push(offset);
      }
    }
    return result;
  }
  function getScrollWrapper(scrollable) {
    var timeout;
    var scrollTop = scrollable.scrollTop();
    var $element = scrollable.$element();
    var _$element$offset = $element.offset(),
        top = _$element$offset.top;
    var height = (0, _size.getHeight)($element);
    var delta = 0;
    function onScroll(e) {
      scrollTop = e.scrollOffset.top;
    }
    scrollable.on('scroll', onScroll);
    function move() {
      stop();
      scrollable.scrollTo(scrollTop += delta);
      timeout = setTimeout(move, SCROLL_TIMEOUT);
    }
    function stop() {
      clearTimeout(timeout);
    }
    function moveIfNeed(event) {
      if (event.pageY <= top + START_SCROLL_OFFSET) {
        delta = -SCROLL_STEP;
      } else if (event.pageY >= top + height - START_SCROLL_OFFSET) {
        delta = SCROLL_STEP;
      } else {
        delta = 0;
        stop();
        return;
      }
      move();
    }
    return {
      moveIfNeed: moveIfNeed,
      element: function element() {
        return $element;
      },
      dispose: function dispose() {
        stop();
        scrollable.off('scroll', onScroll);
      }
    };
  }
  var Sortable = _dom_component.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        onChanged: null,
        onDragging: null,
        itemRender: null,
        groupSelector: null,
        itemSelector: '.dx-sort-item',
        itemContainerSelector: '.dx-sortable-old',
        sourceClass: 'dx-drag-source',
        dragClass: 'dx-drag',
        targetClass: 'dx-drag-target',
        direction: 'vertical',
        allowDragging: true,
        groupFilter: null,
        useIndicator: false
      });
    },
    _renderItem: function _renderItem($sourceItem, target) {
      var itemRender = this.option('itemRender');
      var $item;
      if (itemRender) {
        $item = itemRender($sourceItem, target);
      } else {
        $item = $sourceItem.clone();
        $item.css({
          width: (0, _size.getWidth)($sourceItem),
          height: (0, _size.getHeight)($sourceItem)
        });
      }
      return $item;
    },
    _renderIndicator: function _renderIndicator($item, isVertical, $targetGroup, isLast) {
      var height = (0, _size.getOuterHeight)($item, true);
      var width = (0, _size.getOuterWidth)($item, true);
      var top = $item.offset().top - $targetGroup.offset().top;
      var left = $item.offset().left - $targetGroup.offset().left;
      this._indicator.css({
        position: 'absolute',
        top: isLast && isVertical ? top + height : top,
        left: isLast && !isVertical ? left + width : left
      }).toggleClass('dx-position-indicator-horizontal', !isVertical).toggleClass('dx-position-indicator-vertical', !!isVertical).toggleClass('dx-position-indicator-last', !!isLast).appendTo($targetGroup);
      (0, _size.setHeight)(this._indicator, '');
      (0, _size.setWidth)(this._indicator, '');
      if (isVertical) {
        (0, _size.setWidth)(this._indicator, width);
      } else {
        (0, _size.setHeight)(this._indicator, height);
      }
    },
    _renderDraggable: function _renderDraggable($sourceItem) {
      this._$draggable && this._$draggable.remove();
      this._$draggable = this._renderItem($sourceItem, 'drag').addClass(this.option('dragClass')).appendTo(getSwatchContainer($sourceItem)).css({
        zIndex: 1000000,
        position: 'absolute'
      });
    },
    _detachEventHandlers: function _detachEventHandlers() {
      var dragEventsString = [_drag.move, _drag.start, _drag.end, _drag.enter, _drag.leave, _drag.drop].join(' ');
      _events_engine.default.off(this._getEventListener(), (0, _index.addNamespace)(dragEventsString, SORTABLE_NAMESPACE), undefined);
    },
    _getItemOffset: function _getItemOffset(isVertical, itemsOffset, e) {
      for (var i = 0; i < itemsOffset.length; i += 1) {
        var shouldInsert = void 0;
        var sameLine = e.pageY < itemsOffset[i].posVertical;
        if (isVertical) {
          shouldInsert = sameLine;
        } else if (sameLine) {
          shouldInsert = checkHorizontalPosition(e.pageX, itemsOffset[i], this.option('rtlEnabled'));
          if (!shouldInsert && itemsOffset[i + 1] && itemsOffset[i + 1].posVertical > itemsOffset[i].posVertical) {
            shouldInsert = true;
          }
        }
        if (shouldInsert) {
          return itemsOffset[i];
        }
      }
      return undefined;
    },
    _getEventListener: function _getEventListener() {
      var groupSelector = this.option('groupSelector');
      var element = this.$element();
      return groupSelector ? element.find(groupSelector) : element;
    },
    _attachEventHandlers: function _attachEventHandlers() {
      var that = this;
      var itemSelector = that.option('itemSelector');
      var itemContainerSelector = that.option('itemContainerSelector');
      var groupSelector = that.option('groupSelector');
      var sourceClass = that.option('sourceClass');
      var targetClass = that.option('targetClass');
      var onDragging = that.option('onDragging');
      var groupFilter = that.option('groupFilter');
      var $sourceItem;
      var sourceIndex;
      var $targetItem;
      var $targetGroup;
      var startPositions;
      var sourceGroup;
      var element = that.$element();
      var $groups;
      var scrollWrapper = null;
      var targetIndex = -1;
      var setStartPositions = function setStartPositions() {
        startPositions = [];
        (0, _iterator.each)($sourceItem, function (_, item) {
          startPositions.push((0, _renderer.default)(item).offset());
        });
      };
      var createGroups = function createGroups() {
        var root = _dom_adapter.default.getRootNode(that.$element().get(0));
        if (!groupSelector) {
          return element;
        }
        return groupFilter ? (0, _renderer.default)(root).find(groupSelector).filter(groupFilter) : element.find(groupSelector);
      };
      var disposeScrollWrapper = function disposeScrollWrapper() {
        scrollWrapper === null || scrollWrapper === void 0 ? void 0 : scrollWrapper.dispose();
        scrollWrapper = null;
      };
      var invokeOnDraggingEvent = function invokeOnDraggingEvent() {
        var draggingArgs = {
          sourceGroup: sourceGroup,
          sourceIndex: sourceIndex,
          sourceElement: $sourceItem,
          targetGroup: $targetGroup.attr('group'),
          targetIndex: $targetGroup.find(itemSelector).index($targetItem)
        };
        onDragging && onDragging(draggingArgs);
        if (draggingArgs.cancel) {
          $targetGroup = undefined;
        }
      };
      that._detachEventHandlers();
      if (that.option('allowDragging')) {
        var $eventListener = that._getEventListener();
        _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.start, SORTABLE_NAMESPACE), itemSelector, function (e) {
          $sourceItem = (0, _renderer.default)(e.currentTarget);
          var $sourceGroup = $sourceItem.closest(groupSelector);
          sourceGroup = $sourceGroup.attr('group');
          sourceIndex = getIndex((groupSelector ? $sourceGroup : element).find(itemSelector), $sourceItem);
          if ($sourceItem.attr('item-group')) {
            $sourceItem = $sourceGroup.find("[item-group='".concat($sourceItem.attr('item-group'), "']"));
          }
          that._renderDraggable($sourceItem);
          $targetItem = that._renderItem($sourceItem, 'target').addClass(targetClass);
          $sourceItem.addClass(sourceClass);
          setStartPositions();
          $groups = createGroups();
          that._indicator = (0, _renderer.default)('<div>').addClass('dx-position-indicator');
        });
        _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.move, SORTABLE_NAMESPACE), function (e) {
          var $item;
          var $lastItem;
          var $prevItem;
          if (!$sourceItem) {
            return;
          }
          targetIndex = -1;
          that._indicator.detach();
          (0, _iterator.each)(that._$draggable, function (index, draggableElement) {
            (0, _renderer.default)(draggableElement).css({
              top: startPositions[index].top + e.offset.y,
              left: startPositions[index].left + e.offset.x
            });
          });
          $targetGroup && $targetGroup.removeClass(targetClass);
          $targetGroup = getTargetGroup(e, $groups);
          $targetGroup && invokeOnDraggingEvent();
          if ($targetGroup && scrollWrapper && $targetGroup.get(0) !== scrollWrapper.element().get(0)) {
            disposeScrollWrapper();
          }
          scrollWrapper && scrollWrapper.moveIfNeed(e);
          if (!$targetGroup) {
            $targetItem.detach();
            return;
          }
          if (!scrollWrapper && $targetGroup.attr('allow-scrolling')) {
            scrollWrapper = getScrollWrapper($targetGroup.dxScrollable('instance'));
          }
          $targetGroup.addClass(targetClass);
          var $itemContainer = $targetGroup.find(itemContainerSelector);
          var $items = $itemContainer.find(itemSelector);
          var targetSortable = $targetGroup.closest(".".concat(SORTABLE_CLASS)).data('dxSortableOld');
          var useIndicator = targetSortable.option('useIndicator');
          var isVertical = (targetSortable || that).option('direction') === 'vertical';
          var itemsOffset = getItemsOffset($items, isVertical, $itemContainer);
          var itemOffset = that._getItemOffset(isVertical, itemsOffset, e);
          if (itemOffset) {
            $item = itemOffset.item;
            $prevItem = itemsOffset[itemOffset.index - 1] && itemsOffset[itemOffset.index - 1].item;
            if ($item.hasClass(sourceClass) || $prevItem && $prevItem.hasClass(sourceClass) && $prevItem.is(':visible')) {
              $targetItem.detach();
              return;
            }
            targetIndex = itemOffset.index;
            if (!useIndicator) {
              $targetItem.insertBefore($item);
              return;
            }
            var isAnotherGroup = $targetGroup.attr('group') !== sourceGroup;
            var isSameIndex = targetIndex === sourceIndex;
            var isNextIndex = targetIndex === sourceIndex + 1;
            if (isAnotherGroup) {
              that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);
              return;
            }
            if (!isSameIndex && !isNextIndex) {
              that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);
            }
          } else {
            $lastItem = $items.last();
            if ($lastItem.is(':visible') && $lastItem.hasClass(sourceClass)) {
              return;
            }
            if ($itemContainer.length) {
              targetIndex = itemsOffset.length ? itemsOffset[itemsOffset.length - 1].index + 1 : 0;
            }
            if (useIndicator) {
              $items.length && that._renderIndicator($lastItem, isVertical, $targetGroup, !that.option('rtlEnabled') || isVertical);
            } else {
              $targetItem.appendTo($itemContainer);
            }
          }
        });
        _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.end, SORTABLE_NAMESPACE), function () {
          disposeScrollWrapper();
          if (!$sourceItem) {
            return;
          }
          var onChanged = that.option('onChanged');
          var changedArgs = {
            sourceIndex: sourceIndex,
            sourceElement: $sourceItem,
            sourceGroup: sourceGroup,
            targetIndex: targetIndex,
            removeSourceElement: true,
            removeTargetElement: false,
            removeSourceClass: true
          };
          if ($targetGroup) {
            $targetGroup.removeClass(targetClass);
            changedArgs.targetGroup = $targetGroup.attr('group');
            if (sourceGroup !== changedArgs.targetGroup || targetIndex > -1) {
              onChanged && onChanged(changedArgs);
              changedArgs.removeSourceElement && $sourceItem.remove();
            }
          }
          that._indicator.detach();
          changedArgs.removeSourceClass && $sourceItem.removeClass(sourceClass);
          $sourceItem = null;
          that._$draggable.remove();
          that._$draggable = null;
          changedArgs.removeTargetElement && $targetItem.remove();
          $targetItem.removeClass(targetClass);
          $targetItem = null;
        });
      }
    },
    _init: function _init() {
      this.callBase();
      this._attachEventHandlers();
    },
    _render: function _render() {
      this.callBase();
      this.$element().addClass(SORTABLE_CLASS);
    },
    _dispose: function _dispose() {
      var that = this;
      that.callBase.apply(that, arguments);
      that._$draggable && that._$draggable.detach();
      that._indicator && that._indicator.detach();
    },
    _optionChanged: function _optionChanged(args) {
      var that = this;
      switch (args.name) {
        case 'onDragging':
        case 'onChanged':
        case 'itemRender':
        case 'groupSelector':
        case 'itemSelector':
        case 'itemContainerSelector':
        case 'sourceClass':
        case 'targetClass':
        case 'dragClass':
        case 'allowDragging':
        case 'groupFilter':
        case 'useIndicator':
          that._attachEventHandlers();
          break;
        case 'direction':
          break;
        default:
          that.callBase(args);
      }
    },
    _useTemplates: function _useTemplates() {
      return false;
    }
  });
  /// #DEBUG
  exports.Sortable = Sortable;
  Sortable.prototype.__SCROLL_STEP = SCROLL_STEP;
  /// #ENDDEBUG
  // TODO remove dxSortableOld component
  (0, _component_registrator.default)('dxSortableOld', Sortable);
  var _default = {
    Sortable: Sortable
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/renderer","../../../../events/core/events_engine","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../events/utils/index","../../../../core/component_registrator","../../../../core/dom_component","../../../../core/dom_adapter","../../../../events/drag","../../../../ui/widget/swatch_container"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/renderer"), require("../../../../events/core/events_engine"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../events/utils/index"), require("../../../../core/component_registrator"), require("../../../../core/dom_component"), require("../../../../core/dom_adapter"), require("../../../../events/drag"), require("../../../../ui/widget/swatch_container"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map