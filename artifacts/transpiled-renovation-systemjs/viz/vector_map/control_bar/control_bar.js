!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/vector_map/control_bar/control_bar.js"], ["../../core/utils","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/vector_map/control_bar/control_bar.js", ["../../core/utils", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ControlBar = ControlBar;
  exports._TESTS_restoreCommandToTypeMap = _TESTS_restoreCommandToTypeMap;
  exports._TESTS_stubCommandToTypeMap = _TESTS_stubCommandToTypeMap;
  var _utils = $__require("../../core/utils");
  var _utils2 = $__require("./utils");
  var _math = Math;
  var _min = _math.min;
  var _max = _math.max;
  var _round = _math.round;
  var _floor = _math.floor;
  var _sqrt = _math.sqrt;
  var parseHorizontalAlignment = (0, _utils.enumParser)(['left', 'center', 'right']);
  var parseVerticalAlignment = (0, _utils.enumParser)(['top', 'bottom']);
  var COMMAND_RESET = 'command-reset';
  var COMMAND_MOVE_UP = 'command-move-up';
  var COMMAND_MOVE_RIGHT = 'command-move-right';
  var COMMAND_MOVE_DOWN = 'command-move-down';
  var COMMAND_MOVE_LEFT = 'command-move-left';
  var COMMAND_ZOOM_IN = 'command-zoom-in';
  var COMMAND_ZOOM_OUT = 'command-zoom-out';
  var COMMAND_ZOOM_DRAG_LINE = 'command-zoom-drag-line';
  var COMMAND_ZOOM_DRAG = 'command-zoom-drag';
  var EVENT_TARGET_TYPE = 'control-bar';
  var FLAG_CENTERING = 1;
  var FLAG_ZOOMING = 2;

  // TODO: This should be specified in options - seems like everything can be calculated from "buttonSize" and "zoomSliderLength"
  var SIZE_OPTIONS = {
    bigCircleSize: 58,
    smallCircleSize: 28,
    buttonSize: 10,
    arrowButtonOffset: 20,
    incDecButtonSize: 11,
    incButtonOffset: 66,
    decButtonOffset: 227,
    sliderLineStartOffset: 88.5,
    sliderLineEndOffset: 205.5,
    sliderLength: 20,
    sliderWidth: 8,
    trackerGap: 4
  };
  var OFFSET_X = 30.5;
  var OFFSET_Y = 30.5;
  var TOTAL_WIDTH = 61;
  var TOTAL_HEIGHT = 274;
  var COMMAND_TO_TYPE_MAP = {};
  COMMAND_TO_TYPE_MAP[COMMAND_RESET] = ResetCommand;
  COMMAND_TO_TYPE_MAP[COMMAND_MOVE_UP] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_RIGHT] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_DOWN] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_LEFT] = MoveCommand;
  COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_IN] = COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_OUT] = ZoomCommand;
  COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_DRAG] = ZoomDragCommand;
  function ControlBar(parameters) {
    var that = this;
    that._params = parameters;
    that._createElements(parameters.renderer, parameters.container, parameters.dataKey);
    parameters.layoutControl.addItem(that);
    that._subscribeToProjection(parameters.projection);
    that._subscribeToTracker(parameters.tracker);
    that._createCallbacks(parameters.projection);
  }
  ControlBar.prototype = {
    constructor: ControlBar,
    _flags: 0,
    dispose: function dispose() {
      var that = this;
      that._params.layoutControl.removeItem(that);
      that._root.linkRemove().linkOff();
      that._offProjection();
      that._offTracker();
      that._params = that._root = that._offProjection = that._offTracker = that._callbacks = null;
    },
    _subscribeToProjection: function _subscribeToProjection(projection) {
      var that = this;
      that._offProjection = projection.on({
        'engine': function engine() {
          that._update();
        },
        'zoom': updateZoom,
        'max-zoom': function maxZoom() {
          that._zoomPartition = projection.getZoomScalePartition();
          that._sliderUnitLength = that._sliderLineLength / that._zoomPartition;
          updateZoom();
        }
      });
      function updateZoom() {
        that._adjustZoom(projection.getScaledZoom());
      }
    },
    _subscribeToTracker: function _subscribeToTracker(tracker) {
      var that = this;
      var isActive = false;
      that._offTracker = tracker.on({
        'start': function start(arg) {
          isActive = arg.data.name === EVENT_TARGET_TYPE;
          if (isActive) {
            that._processStart(arg.data.index, arg);
          }
        },
        'move': function move(arg) {
          if (isActive) {
            that._processMove(arg.data.index, arg);
          }
        },
        'end': function end() {
          if (isActive) {
            that._processEnd();
            isActive = false;
          }
        }
      });
    },
    _createCallbacks: function _createCallbacks(projection) {
      var that = this;
      that._callbacks = {
        reset: function reset(isCenter, isZoom) {
          if (isCenter) {
            projection.setCenter(null);
          }
          if (isZoom) {
            projection.setZoom(null);
          }
        },
        beginMove: function beginMove() {
          projection.beginMoveCenter();
        },
        endMove: function endMove() {
          projection.endMoveCenter();
        },
        move: function move(shift) {
          projection.moveCenter(shift);
        },
        zoom: function zoom(_zoom) {
          projection.setScaledZoom(_zoom);
        }
      };
    },
    _createElements: function _createElements(renderer, container, dataKey) {
      var that = this;
      that._root = renderer.g().attr({
        'class': 'dxm-control-bar'
      }).linkOn(container, 'control-bar');
      var panControl = that._panControl = (0, _utils2.createVisibilityGroup)(renderer, that._root, 'dxm-pan-control');
      var zoomBar = that._zoomBar = (0, _utils2.createVisibilityGroup)(renderer, that._root, 'dxm-zoom-bar');
      var trackersPan = that._trackersPan = (0, _utils2.createTracker)(renderer, that._root);
      var trackersZoom = that._trackersZoom = (0, _utils2.createTracker)(renderer, that._root);
      that._createTrackersPan(renderer, dataKey, trackersPan);
      that._createTrackersZoom(renderer, dataKey, trackersZoom);
      that._createPanControl(renderer, dataKey, panControl);
      that._createZoomBar(renderer, dataKey, zoomBar);
    },
    _createPanControl: function _createPanControl(renderer, dataKey, group) {
      var options = SIZE_OPTIONS;
      var size = options.buttonSize / 2;
      var offset1 = options.arrowButtonOffset - size;
      var offset2 = options.arrowButtonOffset;
      var directionOptions = {
        'stroke-linecap': 'square',
        fill: 'none'
      };
      var line = 'line';
      renderer.circle(0, 0, options.bigCircleSize / 2).append(group);
      renderer.circle(0, 0, size).attr({
        fill: 'none'
      }).append(group);
      renderer.path([-size, -offset1, 0, -offset2, size, -offset1], line).attr(directionOptions).append(group);
      renderer.path([offset1, -size, offset2, 0, offset1, size], line).attr(directionOptions).append(group);
      renderer.path([size, offset1, 0, offset2, -size, offset1], line).attr(directionOptions).append(group);
      renderer.path([-offset1, size, -offset2, 0, -offset1, -size], line).attr(directionOptions).append(group);
    },
    _createZoomBar: function _createZoomBar(renderer, dataKey, group) {
      var that = this;
      var options = SIZE_OPTIONS;
      var incDecButtonSize = options.incDecButtonSize / 2;
      renderer.circle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
      renderer.path([[-incDecButtonSize, options.incButtonOffset, incDecButtonSize, options.incButtonOffset], [0, options.incButtonOffset - incDecButtonSize, 0, options.incButtonOffset + incDecButtonSize]], 'area').append(group);
      renderer.circle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
      renderer.path([-incDecButtonSize, options.decButtonOffset, incDecButtonSize, options.decButtonOffset], 'area').append(group);
      that._zoomLine = renderer.path([], 'line').append(group);
      that._zoomDrag = renderer.rect(_floor(-options.sliderLength / 2), _floor(options.sliderLineEndOffset - options.sliderWidth / 2), options.sliderLength, options.sliderWidth).append(group);
      that._sliderLineLength = options.sliderLineEndOffset - options.sliderLineStartOffset;
    },
    _createTrackersPan: function _createTrackersPan(renderer, dataKey, group) {
      var options = SIZE_OPTIONS;
      var size = _round((options.arrowButtonOffset - options.trackerGap) / 2);
      var offset1 = options.arrowButtonOffset - size;
      var offset2 = _round(_sqrt(options.bigCircleSize * options.bigCircleSize / 4 - size * size));
      var size2 = offset2 - offset1;
      renderer.rect(-size, -size, size * 2, size * 2).data(dataKey, {
        index: COMMAND_RESET,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.rect(-size, -offset2, size * 2, size2).data(dataKey, {
        index: COMMAND_MOVE_UP,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.rect(offset1, -size, size2, size * 2).data(dataKey, {
        index: COMMAND_MOVE_RIGHT,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.rect(-size, offset1, size * 2, size2).data(dataKey, {
        index: COMMAND_MOVE_DOWN,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.rect(-offset2, -size, size2, size * 2).data(dataKey, {
        index: COMMAND_MOVE_LEFT,
        name: EVENT_TARGET_TYPE
      }).append(group);
    },
    _createTrackersZoom: function _createTrackersZoom(renderer, dataKey, group) {
      var options = SIZE_OPTIONS;
      renderer.circle(0, options.incButtonOffset, options.smallCircleSize / 2).data(dataKey, {
        index: COMMAND_ZOOM_IN,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.circle(0, options.decButtonOffset, options.smallCircleSize / 2).data(dataKey, {
        index: COMMAND_ZOOM_OUT,
        name: EVENT_TARGET_TYPE
      }).append(group);
      renderer.rect(-2, options.sliderLineStartOffset - 2, 4, options.sliderLineEndOffset - options.sliderLineStartOffset + 4).css({
        cursor: 'default'
      }).data(dataKey, {
        index: COMMAND_ZOOM_DRAG_LINE,
        name: EVENT_TARGET_TYPE
      }).append(group);
      this._zoomDragTracker = renderer.rect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).data(dataKey, {
        index: COMMAND_ZOOM_DRAG,
        name: EVENT_TARGET_TYPE
      }).append(group);
    },
    // BEGIN: Implementation of LayoutTarget interface
    resize: function resize(size) {
      if (this._isActive) {
        this._root.attr({
          visibility: size !== null ? null : 'hidden'
        });
      }
    },
    getLayoutOptions: function getLayoutOptions() {
      return this._isActive ? this._layoutOptions : null;
    },
    locate: function locate(x, y) {
      this._root.attr({
        translateX: x + this._margin + OFFSET_X,
        translateY: y + this._margin + OFFSET_Y
      });
    },
    // END: Implementation of LayoutTarget interface

    _update: function _update() {
      var that = this;
      that._isActive = that._isEnabled && that._flags && that._params.projection.isInvertible();
      var groupPan = [that._panControl, that._trackersPan];
      var groupZoom = [that._zoomBar, that._trackersZoom];
      if (that._isActive) {
        that._root.linkAppend();
        (0, _utils2.toggleDisplay)(groupPan, that._isPanVisible);
        (0, _utils2.toggleDisplay)(groupZoom, that._isZoomVisible);
      } else {
        that._root.linkRemove();
      }
      that._processEnd();
      that.updateLayout();
    },
    setInteraction: function setInteraction(interaction) {
      var that = this;
      if ((0, _utils.parseScalar)(interaction.centeringEnabled, true)) {
        that._flags |= FLAG_CENTERING;
      } else {
        that._flags &= ~FLAG_CENTERING;
      }
      if ((0, _utils.parseScalar)(interaction.zoomingEnabled, true)) {
        that._flags |= FLAG_ZOOMING;
      } else {
        that._flags &= ~FLAG_ZOOMING;
      }
      that._update();
    },
    setOptions: function setOptions(options) {
      var that = this;
      var styleSvg = {
        'stroke-width': options.borderWidth,
        stroke: options.borderColor,
        fill: options.color,
        'fill-opacity': options.opacity
      };
      that._isEnabled = !!(0, _utils.parseScalar)(options.enabled, true);
      that._margin = options.margin || 0;
      that._layoutOptions = {
        width: 2 * that._margin + TOTAL_WIDTH,
        height: 2 * that._margin + TOTAL_HEIGHT,
        horizontalAlignment: parseHorizontalAlignment(options.horizontalAlignment, 'left'),
        verticalAlignment: parseVerticalAlignment(options.verticalAlignment, 'top')
      };
      that._isPanVisible = !!(0, _utils.parseScalar)(options.panVisible, true);
      that._isZoomVisible = !!(0, _utils.parseScalar)(options.zoomVisible, true);
      that._panControl.attr(styleSvg);
      that._zoomBar.attr(styleSvg);
      that._update();
    },
    _adjustZoom: function _adjustZoom(zoom) {
      var that = this;
      var start = SIZE_OPTIONS.sliderLineStartOffset;
      var end = SIZE_OPTIONS.sliderLineEndOffset;
      var h = SIZE_OPTIONS.sliderWidth;
      that._zoomFactor = _max(_min(_round(zoom), that._zoomPartition), 0);
      var transform = {
        translateY: -_round(that._zoomFactor * that._sliderUnitLength)
      };
      var y = end - h / 2 + transform.translateY;
      that._zoomLine.attr({
        points: [[0, start, 0, _max(start, y)], [0, _min(end, y + h), 0, end]]
      });
      that._zoomDrag.attr(transform);
      that._zoomDragTracker.attr(transform);
    },
    _applyZoom: function _applyZoom() {
      this._callbacks.zoom(this._zoomFactor);
    },
    _processStart: function _processStart(command, arg) {
      var commandType;
      if (this._isActive) {
        commandType = COMMAND_TO_TYPE_MAP[command];
        this._command = commandType && commandType.flags & this._flags ? new commandType(this, command, arg) : null;
      }
    },
    _processMove: function _processMove(command, arg) {
      this._command && this._command.update(command, arg);
    },
    _processEnd: function _processEnd() {
      this._command && this._command.finish();
      this._command = null;
    }
  };
  function disposeCommand(command) {
    delete command._owner;
    command.update = function () {};
    command.finish = function () {};
  }
  function ResetCommand(owner, command) {
    this._owner = owner;
    this._command = command;
  }
  ResetCommand.flags = FLAG_CENTERING | FLAG_ZOOMING;
  ResetCommand.prototype.update = function (command) {
    command !== this._command && disposeCommand(this);
  };
  ResetCommand.prototype.finish = function () {
    var flags = this._owner._flags;
    this._owner._callbacks.reset(!!(flags & FLAG_CENTERING), !!(flags & FLAG_ZOOMING));
    disposeCommand(this);
  };
  function MoveCommand(owner, command, arg) {
    this._command = command;
    var timeout = null;
    var interval = 100;
    var dx = 0;
    var dy = 0;
    switch (this._command) {
      case COMMAND_MOVE_UP:
        dy = -10;
        break;
      case COMMAND_MOVE_RIGHT:
        dx = 10;
        break;
      case COMMAND_MOVE_DOWN:
        dy = 10;
        break;
      case COMMAND_MOVE_LEFT:
        dx = -10;
        break;
    }
    function callback() {
      owner._callbacks.move([dx, dy]);
      timeout = setTimeout(callback, interval);
    }
    this._stop = function () {
      clearTimeout(timeout);
      owner._callbacks.endMove();
      this._stop = owner = null;
      return this;
    };
    arg = null;
    owner._callbacks.beginMove();
    callback();
  }
  MoveCommand.flags = FLAG_CENTERING;
  MoveCommand.prototype.update = function (command) {
    this._command !== command && this.finish();
  };
  MoveCommand.prototype.finish = function () {
    disposeCommand(this._stop());
  };
  function ZoomCommand(owner, command) {
    this._owner = owner;
    this._command = command;
    var timeout = null;
    var interval = 150;
    var dZoom = this._command === COMMAND_ZOOM_IN ? 1 : -1;
    function callback() {
      owner._adjustZoom(owner._zoomFactor + dZoom);
      timeout = setTimeout(callback, interval);
    }
    this._stop = function () {
      clearTimeout(timeout);
      this._stop = owner = null;
      return this;
    };
    callback();
  }
  ZoomCommand.flags = FLAG_ZOOMING;
  ZoomCommand.prototype.update = function (command) {
    this._command !== command && this.finish();
  };
  ZoomCommand.prototype.finish = function () {
    this._owner._applyZoom();
    disposeCommand(this._stop());
  };
  function ZoomDragCommand(owner, command, arg) {
    this._owner = owner;
    this._zoomFactor = owner._zoomFactor;
    this._pos = arg.y;
  }
  ZoomDragCommand.flags = FLAG_ZOOMING;
  ZoomDragCommand.prototype.update = function (command, arg) {
    var owner = this._owner;
    owner._adjustZoom(this._zoomFactor + owner._zoomPartition * (this._pos - arg.y) / owner._sliderLineLength);
  };
  ZoomDragCommand.prototype.finish = function () {
    this._owner._applyZoom();
    disposeCommand(this);
  };

  ///#DEBUG
  var COMMAND_TO_TYPE_MAP__ORIGINAL = COMMAND_TO_TYPE_MAP;
  function _TESTS_stubCommandToTypeMap(map) {
    COMMAND_TO_TYPE_MAP = map;
  }
  function _TESTS_restoreCommandToTypeMap() {
    COMMAND_TO_TYPE_MAP = COMMAND_TO_TYPE_MAP__ORIGINAL;
  }
  ///#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=control_bar.js.map