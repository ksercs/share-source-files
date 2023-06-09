"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sortable = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var index_1 = require("../../../../events/utils/index");
var component_registrator_1 = __importDefault(require("../../../../core/component_registrator"));
var dom_component_1 = __importDefault(require("../../../../core/dom_component"));
var dom_adapter_1 = __importDefault(require("../../../../core/dom_adapter"));
var drag_1 = require("../../../../events/drag");
var swatch_container_1 = __importDefault(require("../../../../ui/widget/swatch_container"));
var getSwatchContainer = swatch_container_1.default.getSwatchContainer;
var SORTABLE_NAMESPACE = 'dxSortable';
var SORTABLE_CLASS = 'dx-sortable-old';
var SCROLL_STEP = 2;
var START_SCROLL_OFFSET = 20;
var SCROLL_TIMEOUT = 10;
function elementHasPoint(element, x, y) {
    var $item = renderer_1.default(element);
    var offset = $item.offset();
    if (x >= offset.left && x <= offset.left + size_1.getOuterWidth($item, true)) {
        if (y >= offset.top && y <= offset.top + size_1.getOuterHeight($item, true)) {
            return true;
        }
    }
    return undefined;
}
function checkHorizontalPosition(position, itemOffset, rtl) {
    if (type_1.isDefined(itemOffset.posHorizontal)) {
        return rtl ? position > itemOffset.posHorizontal : position < itemOffset.posHorizontal;
    }
    return true;
}
function getIndex($items, $item) {
    var index = -1;
    var itemElement = $item.get(0);
    iterator_1.each($items, function (elementIndex, element) {
        var $element = renderer_1.default(element);
        if (!($element.attr('item-group')
            && $element.attr('item-group') === $items.eq(elementIndex - 1).attr('item-group'))) {
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
    iterator_1.each($groups, function () {
        if (elementHasPoint(this, e.pageX, e.pageY)) {
            result = renderer_1.default(this);
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
            $item = $itemsContainer.find("[item-group='" + $item.attr('item-group') + "']");
        }
        if ($item.is(':visible')) {
            var offset = {
                item: $item,
                index: result.length,
                posVertical: isVertical
                    ? ($item.last().offset().top + $item.offset().top + size_1.getOuterHeight($item.last(), true)) / 2
                    : size_1.getOuterHeight($item.last(), true) + $item.last().offset().top,
                posHorizontal: isVertical
                    ? undefined
                    : (size_1.getOuterWidth($item.last(), true) + $item.last().offset().left + $item.offset().left) / 2,
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
    var top = $element.offset().top;
    var height = size_1.getHeight($element);
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
        }
        else if (event.pageY >= top + height - START_SCROLL_OFFSET) {
            delta = SCROLL_STEP;
        }
        else {
            delta = 0;
            stop();
            return;
        }
        move();
    }
    return {
        moveIfNeed: moveIfNeed,
        element: function () {
            return $element;
        },
        dispose: function () {
            stop();
            scrollable.off('scroll', onScroll);
        },
    };
}
var Sortable = dom_component_1.default.inherit({
    _getDefaultOptions: function () {
        return extend_1.extend(this.callBase(), {
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
            useIndicator: false,
        });
    },
    _renderItem: function ($sourceItem, target) {
        var itemRender = this.option('itemRender');
        var $item;
        if (itemRender) {
            $item = itemRender($sourceItem, target);
        }
        else {
            $item = $sourceItem.clone();
            $item.css({
                width: size_1.getWidth($sourceItem),
                height: size_1.getHeight($sourceItem),
            });
        }
        return $item;
    },
    _renderIndicator: function ($item, isVertical, $targetGroup, isLast) {
        var height = size_1.getOuterHeight($item, true);
        var width = size_1.getOuterWidth($item, true);
        var top = $item.offset().top - $targetGroup.offset().top;
        var left = $item.offset().left - $targetGroup.offset().left;
        this._indicator
            .css({
            position: 'absolute',
            top: isLast && isVertical ? top + height : top,
            left: isLast && !isVertical ? left + width : left,
        })
            .toggleClass('dx-position-indicator-horizontal', !isVertical)
            .toggleClass('dx-position-indicator-vertical', !!isVertical)
            .toggleClass('dx-position-indicator-last', !!isLast)
            .appendTo($targetGroup);
        size_1.setHeight(this._indicator, '');
        size_1.setWidth(this._indicator, '');
        if (isVertical) {
            size_1.setWidth(this._indicator, width);
        }
        else {
            size_1.setHeight(this._indicator, height);
        }
    },
    _renderDraggable: function ($sourceItem) {
        this._$draggable && this._$draggable.remove();
        this._$draggable = this._renderItem($sourceItem, 'drag')
            .addClass(this.option('dragClass')).appendTo(getSwatchContainer($sourceItem))
            .css({
            zIndex: 1000000,
            position: 'absolute',
        });
    },
    _detachEventHandlers: function () {
        var dragEventsString = [drag_1.move, drag_1.start, drag_1.end, drag_1.enter, drag_1.leave, drag_1.drop].join(' ');
        events_engine_1.default.off(this._getEventListener(), index_1.addNamespace(dragEventsString, SORTABLE_NAMESPACE), undefined);
    },
    _getItemOffset: function (isVertical, itemsOffset, e) {
        for (var i = 0; i < itemsOffset.length; i += 1) {
            var shouldInsert = void 0;
            var sameLine = e.pageY < itemsOffset[i].posVertical;
            if (isVertical) {
                shouldInsert = sameLine;
            }
            else if (sameLine) {
                shouldInsert = checkHorizontalPosition(e.pageX, itemsOffset[i], this.option('rtlEnabled'));
                if (!shouldInsert && itemsOffset[i + 1]
                    && itemsOffset[i + 1].posVertical > itemsOffset[i].posVertical) {
                    shouldInsert = true;
                }
            }
            if (shouldInsert) {
                return itemsOffset[i];
            }
        }
        return undefined;
    },
    _getEventListener: function () {
        var groupSelector = this.option('groupSelector');
        var element = this.$element();
        return groupSelector ? element.find(groupSelector) : element;
    },
    _attachEventHandlers: function () {
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
        var setStartPositions = function () {
            startPositions = [];
            iterator_1.each($sourceItem, function (_, item) {
                startPositions.push(renderer_1.default(item).offset());
            });
        };
        var createGroups = function () {
            var root = dom_adapter_1.default.getRootNode(that.$element().get(0));
            if (!groupSelector) {
                return element;
            }
            return groupFilter
                ? renderer_1.default(root).find(groupSelector).filter(groupFilter)
                : element.find(groupSelector);
        };
        var disposeScrollWrapper = function () {
            scrollWrapper === null || scrollWrapper === void 0 ? void 0 : scrollWrapper.dispose();
            scrollWrapper = null;
        };
        var invokeOnDraggingEvent = function () {
            var draggingArgs = {
                sourceGroup: sourceGroup,
                sourceIndex: sourceIndex,
                sourceElement: $sourceItem,
                targetGroup: $targetGroup.attr('group'),
                targetIndex: $targetGroup.find(itemSelector).index($targetItem),
            };
            onDragging && onDragging(draggingArgs);
            if (draggingArgs.cancel) {
                $targetGroup = undefined;
            }
        };
        that._detachEventHandlers();
        if (that.option('allowDragging')) {
            var $eventListener = that._getEventListener();
            events_engine_1.default.on($eventListener, index_1.addNamespace(drag_1.start, SORTABLE_NAMESPACE), itemSelector, function (e) {
                $sourceItem = renderer_1.default(e.currentTarget);
                var $sourceGroup = $sourceItem.closest(groupSelector);
                sourceGroup = $sourceGroup.attr('group');
                sourceIndex = getIndex((groupSelector
                    ? $sourceGroup
                    : element)
                    .find(itemSelector), $sourceItem);
                if ($sourceItem.attr('item-group')) {
                    $sourceItem = $sourceGroup.find("[item-group='" + $sourceItem.attr('item-group') + "']");
                }
                that._renderDraggable($sourceItem);
                $targetItem = that._renderItem($sourceItem, 'target').addClass(targetClass);
                $sourceItem.addClass(sourceClass);
                setStartPositions();
                $groups = createGroups();
                that._indicator = renderer_1.default('<div>').addClass('dx-position-indicator');
            });
            events_engine_1.default.on($eventListener, index_1.addNamespace(drag_1.move, SORTABLE_NAMESPACE), function (e) {
                var $item;
                var $lastItem;
                var $prevItem;
                if (!$sourceItem) {
                    return;
                }
                targetIndex = -1;
                that._indicator.detach();
                iterator_1.each(that._$draggable, function (index, draggableElement) {
                    renderer_1.default(draggableElement).css({
                        top: startPositions[index].top + e.offset.y,
                        left: startPositions[index].left + e.offset.x,
                    });
                });
                $targetGroup && $targetGroup.removeClass(targetClass);
                $targetGroup = getTargetGroup(e, $groups);
                $targetGroup && invokeOnDraggingEvent();
                if ($targetGroup
                    && scrollWrapper
                    && $targetGroup.get(0) !== scrollWrapper.element().get(0)) {
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
                var targetSortable = $targetGroup.closest("." + SORTABLE_CLASS).data('dxSortableOld');
                var useIndicator = targetSortable.option('useIndicator');
                var isVertical = (targetSortable || that).option('direction') === 'vertical';
                var itemsOffset = getItemsOffset($items, isVertical, $itemContainer);
                var itemOffset = that._getItemOffset(isVertical, itemsOffset, e);
                if (itemOffset) {
                    $item = itemOffset.item;
                    $prevItem = itemsOffset[itemOffset.index - 1] && itemsOffset[itemOffset.index - 1].item;
                    if ($item.hasClass(sourceClass) || ($prevItem && $prevItem.hasClass(sourceClass) && $prevItem.is(':visible'))) {
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
                    var isNextIndex = targetIndex === (sourceIndex + 1);
                    if (isAnotherGroup) {
                        that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);
                        return;
                    }
                    if (!isSameIndex && !isNextIndex) {
                        that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);
                    }
                }
                else {
                    $lastItem = $items.last();
                    if ($lastItem.is(':visible') && $lastItem.hasClass(sourceClass)) {
                        return;
                    }
                    if ($itemContainer.length) {
                        targetIndex = itemsOffset.length ? itemsOffset[itemsOffset.length - 1].index + 1 : 0;
                    }
                    if (useIndicator) {
                        $items.length && that._renderIndicator($lastItem, isVertical, $targetGroup, !that.option('rtlEnabled') || isVertical);
                    }
                    else {
                        $targetItem.appendTo($itemContainer);
                    }
                }
            });
            events_engine_1.default.on($eventListener, index_1.addNamespace(drag_1.end, SORTABLE_NAMESPACE), function () {
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
                    removeSourceClass: true,
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
    _init: function () {
        this.callBase();
        this._attachEventHandlers();
    },
    _render: function () {
        this.callBase();
        this.$element().addClass(SORTABLE_CLASS);
    },
    _dispose: function () {
        var that = this;
        that.callBase.apply(that, arguments);
        that._$draggable && that._$draggable.detach();
        that._indicator && that._indicator.detach();
    },
    _optionChanged: function (args) {
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
    _useTemplates: function () {
        return false;
    },
});
exports.Sortable = Sortable;
/// #DEBUG
Sortable.prototype.__SCROLL_STEP = SCROLL_STEP;
/// #ENDDEBUG
// TODO remove dxSortableOld component
component_registrator_1.default('dxSortableOld', Sortable);
exports.default = { Sortable: Sortable };