"use strict";

exports.start = exports.move = exports.leave = exports.enter = exports.end = exports.drop = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _element_data = require("../core/element_data");
var _array = require("../core/utils/array");
var iteratorUtils = _interopRequireWildcard(require("../core/utils/iterator"));
var _dom = require("../core/utils/dom");
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _index = require("./utils/index");
var _emitter = _interopRequireDefault(require("./gesture/emitter.gesture"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DRAG_START_EVENT = 'dxdragstart';
exports.start = DRAG_START_EVENT;
var DRAG_EVENT = 'dxdrag';
exports.move = DRAG_EVENT;
var DRAG_END_EVENT = 'dxdragend';
exports.end = DRAG_END_EVENT;
var DRAG_ENTER_EVENT = 'dxdragenter';
exports.enter = DRAG_ENTER_EVENT;
var DRAG_LEAVE_EVENT = 'dxdragleave';
exports.leave = DRAG_LEAVE_EVENT;
var DROP_EVENT = 'dxdrop';
exports.drop = DROP_EVENT;
var DX_DRAG_EVENTS_COUNT_KEY = 'dxDragEventsCount';
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
  setup: function setup(element, data) {
    var knownDropTarget = knownDropTargets.includes(element);
    if (!knownDropTarget) {
      knownDropTargets.push(element);
      knownDropTargetSelectors.push([]);
      knownDropTargetConfigs.push(data || {});
    }
  },
  add: function add(element, handleObj) {
    var index = knownDropTargets.indexOf(element);
    this.updateEventsCounter(element, handleObj.type, 1);
    var selector = handleObj.selector;
    if (!knownDropTargetSelectors[index].includes(selector)) {
      knownDropTargetSelectors[index].push(selector);
    }
  },
  updateEventsCounter: function updateEventsCounter(element, event, value) {
    if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].indexOf(event) > -1) {
      var eventsCount = (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY) || 0;
      (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY, Math.max(0, eventsCount + value));
    }
  },
  remove: function remove(element, handleObj) {
    this.updateEventsCounter(element, handleObj.type, -1);
  },
  teardown: function teardown(element) {
    var handlersCount = (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY);
    if (!handlersCount) {
      var index = knownDropTargets.indexOf(element);
      knownDropTargets.splice(index, 1);
      knownDropTargetSelectors.splice(index, 1);
      knownDropTargetConfigs.splice(index, 1);
      (0, _element_data.removeData)(element, DX_DRAG_EVENTS_COUNT_KEY);
    }
  }
};

/**
* @name UI Events.dxdragenter
* @type eventType
* @type_function_param1 event:event
* @type_function_param1_field1 draggingElement:Element
* @module events/drag
*/
/**
* @name UI Events.dxdrop
* @type eventType
* @type_function_param1 event:event
* @type_function_param1_field1 draggingElement:Element
* @module events/drag
*/
/**
* @name UI Events.dxdragleave
* @type eventType
* @type_function_param1 event:event
* @type_function_param1_field1 draggingElement:Element
* @module events/drag
*/

(0, _event_registrator.default)(DRAG_ENTER_EVENT, dropTargetRegistration);
(0, _event_registrator.default)(DRAG_LEAVE_EVENT, dropTargetRegistration);
(0, _event_registrator.default)(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function getItemDelegatedTargets($element) {
  var dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  var dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter(function (selector) {
    return selector;
  });
  var $delegatedTargets = $element.find(dropTargetSelectors.join(', '));
  if (knownDropTargetSelectors[dropTargetIndex].includes(undefined)) {
    $delegatedTargets = $delegatedTargets.add($element);
  }
  return $delegatedTargets;
};
var getItemConfig = function getItemConfig($element) {
  var dropTargetIndex = knownDropTargets.indexOf($element.get(0));
  return knownDropTargetConfigs[dropTargetIndex];
};
var getItemPosition = function getItemPosition(dropTargetConfig, $element) {
  if (dropTargetConfig.itemPositionFunc) {
    return dropTargetConfig.itemPositionFunc($element);
  } else {
    return $element.offset();
  }
};
var getItemSize = function getItemSize(dropTargetConfig, $element) {
  if (dropTargetConfig.itemSizeFunc) {
    return dropTargetConfig.itemSizeFunc($element);
  }
  return {
    width: $element.get(0).getBoundingClientRect().width,
    height: $element.get(0).getBoundingClientRect().height
  };
};
var DragEmitter = _emitter.default.inherit({
  ctor: function ctor(element) {
    this.callBase(element);
    this.direction = 'both';
  },
  _init: function _init(e) {
    this._initEvent = e;
  },
  _start: function _start(e) {
    e = this._fireEvent(DRAG_START_EVENT, this._initEvent);
    this._maxLeftOffset = e.maxLeftOffset;
    this._maxRightOffset = e.maxRightOffset;
    this._maxTopOffset = e.maxTopOffset;
    this._maxBottomOffset = e.maxBottomOffset;
    if (e.targetElements || e.targetElements === null) {
      var dropTargets = (0, _array.wrapToArray)(e.targetElements || []);
      this._dropTargets = iteratorUtils.map(dropTargets, function (element) {
        return (0, _renderer.default)(element).get(0);
      });
    } else {
      this._dropTargets = knownDropTargets;
    }
  },
  _move: function _move(e) {
    var eventData = (0, _index.eventData)(e);
    var dragOffset = this._calculateOffset(eventData);
    e = this._fireEvent(DRAG_EVENT, e, {
      offset: dragOffset
    });
    this._processDropTargets(e);
    if (!e._cancelPreventDefault) {
      e.preventDefault();
    }
  },
  _calculateOffset: function _calculateOffset(eventData) {
    return {
      x: this._calculateXOffset(eventData),
      y: this._calculateYOffset(eventData)
    };
  },
  _calculateXOffset: function _calculateXOffset(eventData) {
    if (this.direction !== 'vertical') {
      var offset = eventData.x - this._startEventData.x;
      return this._fitOffset(offset, this._maxLeftOffset, this._maxRightOffset);
    }
    return 0;
  },
  _calculateYOffset: function _calculateYOffset(eventData) {
    if (this.direction !== 'horizontal') {
      var offset = eventData.y - this._startEventData.y;
      return this._fitOffset(offset, this._maxTopOffset, this._maxBottomOffset);
    }
    return 0;
  },
  _fitOffset: function _fitOffset(offset, minOffset, maxOffset) {
    if (minOffset != null) {
      offset = Math.max(offset, -minOffset);
    }
    if (maxOffset != null) {
      offset = Math.min(offset, maxOffset);
    }
    return offset;
  },
  _processDropTargets: function _processDropTargets(e) {
    var target = this._findDropTarget(e);
    var sameTarget = target === this._currentDropTarget;
    if (!sameTarget) {
      this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
      this._currentDropTarget = target;
      this._fireDropTargetEvent(e, DRAG_ENTER_EVENT);
    }
  },
  _fireDropTargetEvent: function _fireDropTargetEvent(event, eventName) {
    if (!this._currentDropTarget) {
      return;
    }
    var eventData = {
      type: eventName,
      originalEvent: event,
      draggingElement: this._$element.get(0),
      target: this._currentDropTarget
    };
    (0, _index.fireEvent)(eventData);
  },
  _findDropTarget: function _findDropTarget(e) {
    var that = this;
    var result;
    iteratorUtils.each(knownDropTargets, function (_, target) {
      if (!that._checkDropTargetActive(target)) {
        return;
      }
      var $target = (0, _renderer.default)(target);
      iteratorUtils.each(getItemDelegatedTargets($target), function (_, delegatedTarget) {
        var $delegatedTarget = (0, _renderer.default)(delegatedTarget);
        if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, (0, _renderer.default)(result), e)) {
          result = delegatedTarget;
        }
      });
    });
    return result;
  },
  _checkDropTargetActive: function _checkDropTargetActive(target) {
    var active = false;
    iteratorUtils.each(this._dropTargets, function (_, activeTarget) {
      active = active || activeTarget === target || (0, _dom.contains)(activeTarget, target);
      return !active;
    });
    return active;
  },
  _checkDropTarget: function _checkDropTarget(config, $target, $prevTarget, e) {
    var isDraggingElement = $target.get(0) === (0, _renderer.default)(e.target).get(0);
    if (isDraggingElement) {
      return false;
    }
    var targetPosition = getItemPosition(config, $target);
    if (e.pageX < targetPosition.left) {
      return false;
    }
    if (e.pageY < targetPosition.top) {
      return false;
    }
    var targetSize = getItemSize(config, $target);
    if (e.pageX > targetPosition.left + targetSize.width) {
      return false;
    }
    if (e.pageY > targetPosition.top + targetSize.height) {
      return false;
    }
    if ($prevTarget.length && $prevTarget.closest($target).length) {
      return false;
    }
    if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
      return false;
    }
    return $target;
  },
  _end: function _end(e) {
    var eventData = (0, _index.eventData)(e);
    this._fireEvent(DRAG_END_EVENT, e, {
      offset: this._calculateOffset(eventData)
    });
    this._fireDropTargetEvent(e, DROP_EVENT);
    delete this._currentDropTarget;
  }
});

/**
 * @name UI Events.dxdragstart
 * @type eventType
 * @type_function_param1 event:event
 * @type_function_param1_field1 cancel:boolean
 * @module events/drag
*/
/**
  * @name UI Events.dxdrag
  * @type eventType
  * @type_function_param1 event:event
  * @type_function_param1_field1 offset:number
  * @type_function_param1_field2 cancel:boolean
  * @module events/drag
*/
/**
  * @name UI Events.dxdragend
  * @type eventType
  * @type_function_param1 event:event
  * @type_function_param1_field1 offset:number
  * @type_function_param1_field2 cancel:boolean
  * @module events/drag
*/

(0, _emitter_registrator.default)({
  emitter: DragEmitter,
  events: [DRAG_START_EVENT, DRAG_EVENT, DRAG_END_EVENT]
});