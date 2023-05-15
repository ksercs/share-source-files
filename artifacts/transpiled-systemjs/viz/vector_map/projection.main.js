!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/vector_map/projection.main.js"], ["../../core/utils/extend","./event_emitter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/vector_map/projection.main.js", ["../../core/utils/extend", "./event_emitter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.projection = exports._TESTS_Engine = exports.Projection = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _event_emitter = $__require("./event_emitter");
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var _Number = Number;
  var _min = Math.min;
  var _max = Math.max;
  var _abs = Math.abs;
  var _round = Math.round;
  var _ln = Math.log;
  var _pow = Math.pow;
  var TWO_TO_LN2 = 2 / Math.LN2;

  // T224204
  // The value is selected so that bounds range of 1 angular second can be defined
  // 1 angular second is (1 / 3600) degrees or (1 / 3600 / 180) after projection
  // The value 10 times less than projected 1 angular second is chosen
  var MIN_BOUNDS_RANGE = 1 / 3600 / 180 / 10;
  var DEFAULT_MIN_ZOOM = 1;
  var DEFAULT_MAX_ZOOM = 1 << 8;
  var DEFAULT_CENTER = [NaN, NaN];
  var DEFAULT_ENGINE_NAME = 'mercator';
  function floatsEqual(f1, f2) {
    return _abs(f1 - f2) < 1E-8;
  }
  function arraysEqual(a1, a2) {
    return floatsEqual(a1[0], a2[0]) && floatsEqual(a1[1], a2[1]);
  }
  function parseAndClamp(value, minValue, maxValue, defaultValue) {
    var val = _Number(value);
    return isFinite(val) ? _min(_max(val, minValue), maxValue) : defaultValue;
  }
  function parseAndClampArray(value, minValue, maxValue, defaultValue) {
    return [parseAndClamp(value[0], minValue[0], maxValue[0], defaultValue[0]), parseAndClamp(value[1], minValue[1], maxValue[1], defaultValue[1])];
  }
  function getEngine(engine) {
    return engine instanceof Engine && engine || projection.get(engine) || projection(engine) || projection.get(DEFAULT_ENGINE_NAME);
  }
  var Projection = function Projection(parameters) {
    var that = this;
    that._initEvents();
    that._params = parameters;
    that._engine = getEngine();
    that._center = that._engine.center();
    that._adjustCenter();
  };
  exports.Projection = Projection;
  Projection.prototype = {
    constructor: Projection,
    _minZoom: DEFAULT_MIN_ZOOM,
    _maxZoom: DEFAULT_MAX_ZOOM,
    _zoom: DEFAULT_MIN_ZOOM,
    _center: DEFAULT_CENTER,
    _canvas: {},
    _scale: [],
    dispose: function dispose() {
      this._disposeEvents();
    },
    setEngine: function setEngine(value) {
      var that = this;
      var engine = getEngine(value);
      if (that._engine !== engine) {
        that._engine = engine;
        that._fire('engine');
        if (that._changeCenter(engine.center())) {
          that._triggerCenterChanged();
        }
        if (that._changeZoom(that._minZoom)) {
          that._triggerZoomChanged();
        }
        that._adjustCenter();
        that._setupScreen();
      }
    },
    setBounds: function setBounds(bounds) {
      if (bounds !== undefined) {
        this.setEngine(this._engine.original().bounds(bounds));
      }
    },
    _setupScreen: function _setupScreen() {
      var that = this;
      var canvas = that._canvas;
      var width = canvas.width;
      var height = canvas.height;
      var engine = that._engine;
      var aspectRatio = engine.ar();
      that._x0 = canvas.left + width / 2;
      that._y0 = canvas.top + height / 2;
      var min = [that.project([engine.min()[0], 0])[0], that.project([0, engine.min()[1]])[1]];
      var max = [that.project([engine.max()[0], 0])[0], that.project([0, engine.max()[1]])[1]];
      var screenAR = width / height;
      var boundsAR = _abs(max[0] - min[0]) / _abs(max[1] - min[1]);
      var correction;
      if (isNaN(boundsAR) || boundsAR === 0 || _min(screenAR, aspectRatio) <= aspectRatio * boundsAR && aspectRatio * boundsAR <= _max(screenAR, aspectRatio)) {
        correction = 1;
      } else {
        correction = boundsAR > 1 ? boundsAR : 1 / boundsAR;
      }
      if (aspectRatio * boundsAR >= screenAR) {
        that._xRadius = width / 2 / correction;
        that._yRadius = width / 2 / (aspectRatio * correction);
      } else {
        that._xRadius = height / 2 * (aspectRatio / correction);
        that._yRadius = height / 2 / correction;
      }
      that._fire('screen');
    },
    setSize: function setSize(canvas) {
      this._canvas = canvas;
      this._setupScreen();
    },
    getCanvas: function getCanvas() {
      return this._canvas;
    },
    _toScreen: function _toScreen(coordinates) {
      return [this._x0 + this._xRadius * coordinates[0], this._y0 + this._yRadius * coordinates[1]];
    },
    _fromScreen: function _fromScreen(coordinates) {
      return [(coordinates[0] - this._x0) / this._xRadius, (coordinates[1] - this._y0) / this._yRadius];
    },
    _toTransformed: function _toTransformed(coordinates) {
      return [coordinates[0] * this._zoom + this._xCenter, coordinates[1] * this._zoom + this._yCenter];
    },
    _toTransformedFast: function _toTransformedFast(coordinates) {
      return [coordinates[0] * this._zoom, coordinates[1] * this._zoom];
    },
    _fromTransformed: function _fromTransformed(coordinates) {
      return [(coordinates[0] - this._xCenter) / this._zoom, (coordinates[1] - this._yCenter) / this._zoom];
    },
    _adjustCenter: function _adjustCenter() {
      var that = this;
      var center = that._engine.project(that._center);
      that._xCenter = -center[0] * that._zoom || 0;
      that._yCenter = -center[1] * that._zoom || 0;
    },
    project: function project(coordinates) {
      return this._engine.project(coordinates);
    },
    transform: function transform(coordinates) {
      return this._toScreen(this._toTransformedFast(coordinates));
    },
    isInvertible: function isInvertible() {
      return this._engine.isInvertible();
    },
    getSquareSize: function getSquareSize(size) {
      return [size[0] * this._zoom * this._xRadius, size[1] * this._zoom * this._yRadius];
    },
    getZoom: function getZoom() {
      return this._zoom;
    },
    _changeZoom: function _changeZoom(value) {
      var that = this;
      var oldZoom = that._zoom;
      var newZoom = that._zoom = parseAndClamp(value, that._minZoom, that._maxZoom, that._minZoom);
      var isChanged = !floatsEqual(oldZoom, newZoom);
      if (isChanged) {
        that._adjustCenter();
        that._fire('zoom');
      }
      return isChanged;
    },
    setZoom: function setZoom(value) {
      if (this._engine.isInvertible() && this._changeZoom(value)) {
        this._triggerZoomChanged();
      }
    },
    getScaledZoom: function getScaledZoom() {
      return _round((this._scale.length - 1) * _ln(this._zoom) / _ln(this._maxZoom));
    },
    setScaledZoom: function setScaledZoom(scaledZoom) {
      this.setZoom(this._scale[_round(scaledZoom)]);
    },
    changeScaledZoom: function changeScaledZoom(deltaZoom) {
      this.setZoom(this._scale[_max(_min(_round(this.getScaledZoom() + deltaZoom), this._scale.length - 1), 0)]);
    },
    getZoomScalePartition: function getZoomScalePartition() {
      return this._scale.length - 1;
    },
    _setupScaling: function _setupScaling() {
      var that = this;
      var k = _max(_round(TWO_TO_LN2 * _ln(that._maxZoom)), 4);
      var step = _pow(that._maxZoom, 1 / k);
      var zoom = that._minZoom;
      that._scale = [zoom];
      for (var i = 1; i <= k; ++i) {
        that._scale.push(zoom *= step);
      }
    },
    setMaxZoom: function setMaxZoom(maxZoom) {
      var that = this;
      that._minZoom = DEFAULT_MIN_ZOOM;
      that._maxZoom = parseAndClamp(maxZoom, that._minZoom, _Number.MAX_VALUE, DEFAULT_MAX_ZOOM);
      that._setupScaling();
      if (that._zoom > that._maxZoom) {
        that.setZoom(that._maxZoom);
      }
      that._fire('max-zoom');
    },
    getCenter: function getCenter() {
      return this._center.slice();
    },
    setCenter: function setCenter(value) {
      if (this._engine.isInvertible() && this._changeCenter(value || [])) {
        this._triggerCenterChanged();
      }
    },
    _changeCenter: function _changeCenter(value) {
      var that = this;
      var engine = that._engine;
      var oldCenter = that._center;
      var newCenter = that._center = parseAndClampArray(value, engine.min(), engine.max(), engine.center());
      var isChanged = !arraysEqual(oldCenter, newCenter);
      if (isChanged) {
        that._adjustCenter();
        that._fire('center');
      }
      return isChanged;
    },
    _triggerCenterChanged: function _triggerCenterChanged() {
      this._params.centerChanged(this.getCenter());
    },
    _triggerZoomChanged: function _triggerZoomChanged() {
      this._params.zoomChanged(this.getZoom());
    },
    setCenterByPoint: function setCenterByPoint(coordinates, screenPosition) {
      var that = this;
      var p = that._engine.project(coordinates);
      var q = that._fromScreen(screenPosition);
      that.setCenter(that._engine.unproject([-q[0] / that._zoom + p[0], -q[1] / that._zoom + p[1]]));
    },
    beginMoveCenter: function beginMoveCenter() {
      if (this._engine.isInvertible()) {
        this._moveCenter = this._center;
      }
    },
    endMoveCenter: function endMoveCenter() {
      var that = this;
      if (that._moveCenter) {
        if (!arraysEqual(that._moveCenter, that._center)) {
          that._triggerCenterChanged();
        }
        that._moveCenter = null;
      }
    },
    moveCenter: function moveCenter(shift) {
      var that = this;
      if (that._moveCenter) {
        var current = that.toScreenPoint(that._center);
        that._changeCenter(that.fromScreenPoint([current[0] + shift[0], current[1] + shift[1]]));
      }
    },
    getViewport: function getViewport() {
      var that = this;
      var unproject = that._engine.unproject;
      var lt = unproject(that._fromTransformed([-1, -1]));
      var lb = unproject(that._fromTransformed([-1, +1]));
      var rt = unproject(that._fromTransformed([+1, -1]));
      var rb = unproject(that._fromTransformed([+1, +1]));
      var minMax = findMinMax([selectFarthestPoint(lt[0], lb[0], rt[0], rb[0]), selectFarthestPoint(lt[1], rt[1], lb[1], rb[1])], [selectFarthestPoint(rt[0], rb[0], lt[0], lb[0]), selectFarthestPoint(lb[1], rb[1], lt[1], rt[1])]);
      return [].concat(minMax.min, minMax.max);
    },
    // T254127
    // There should be no expectation that if viewport is got with `getViewport` and set with `setViewport`
    // then center and zoom will be retained - in general case they will be not.
    // Such retaining requires invertibility of projection which is generally not available
    // Invertibility means that `project(unproject([x, y])) === [x, y]` and `unproject(project([x, y])) === [x, y]` for any reasonable `(x, y)`
    // For example:
    // the "mercator" is non invertible - longitude is invertible, latitude is not (because of tan and log)
    // the "equirectangular" is invertible (it uses simple linear transformations)
    setViewport: function setViewport(viewport) {
      var engine = this._engine;
      var data = viewport ? getZoomAndCenterFromViewport(engine.project, engine.unproject, viewport) : [this._minZoom, engine.center()];
      this.setZoom(data[0]);
      this.setCenter(data[1]);
    },
    getTransform: function getTransform() {
      return {
        translateX: this._xCenter * this._xRadius,
        translateY: this._yCenter * this._yRadius
      };
    },
    fromScreenPoint: function fromScreenPoint(coordinates) {
      return this._engine.unproject(this._fromTransformed(this._fromScreen(coordinates)));
    },
    toScreenPoint: function toScreenPoint(coordinates) {
      return this._toScreen(this._toTransformed(this._engine.project(coordinates)));
    },
    _eventNames: ['engine', 'screen', 'center', 'zoom', 'max-zoom']
  };
  (0, _event_emitter.makeEventEmitter)(Projection);
  function selectFarthestPoint(point1, point2, basePoint1, basePoint2) {
    var basePoint = (basePoint1 + basePoint2) / 2;
    return _abs(point1 - basePoint) > _abs(point2 - basePoint) ? point1 : point2;
  }
  function selectClosestPoint(point1, point2, basePoint1, basePoint2) {
    var basePoint = (basePoint1 + basePoint2) / 2;
    return _abs(point1 - basePoint) < _abs(point2 - basePoint) ? point1 : point2;
  }
  function getZoomAndCenterFromViewport(project, unproject, viewport) {
    var lt = project([viewport[0], viewport[3]]);
    var lb = project([viewport[0], viewport[1]]);
    var rt = project([viewport[2], viewport[3]]);
    var rb = project([viewport[2], viewport[1]]);
    var l = selectClosestPoint(lt[0], lb[0], rt[0], rb[0]);
    var r = selectClosestPoint(rt[0], rb[0], lt[0], lb[0]);
    var t = selectClosestPoint(lt[1], rt[1], lb[1], rb[1]);
    var b = selectClosestPoint(lb[1], rb[1], lt[1], rt[1]);
    return [2 / _max(_abs(l - r), _abs(t - b)), unproject([(l + r) / 2, (t + b) / 2])];
  }
  function setMinMax(engine, p1, p2) {
    var _findMinMax = findMinMax(p1, p2),
        min = _findMinMax.min,
        max = _findMinMax.max;
    engine.min = returnArray(min);
    engine.max = returnArray(max);
  }
  var Engine = /*#__PURE__*/function () {
    function Engine(parameters) {
      var that = this;
      var project = createProjectMethod(parameters.to);
      var unproject = parameters.from ? createUnprojectMethod(parameters.from) : returnValue(DEFAULT_CENTER);
      that.project = project;
      that.unproject = unproject;
      that.original = returnValue(that);
      that.source = function () {
        return (0, _extend.extend)({}, parameters);
      };
      that.isInvertible = returnValue(!!parameters.from);
      that.ar = returnValue(parameters.aspectRatio > 0 ? _Number(parameters.aspectRatio) : 1);
      that.center = returnArray(unproject([0, 0]));
      setMinMax(that, [unproject([-1, 0])[0], unproject([0, +1])[1]], [unproject([+1, 0])[0], unproject([0, -1])[1]]);
    }
    var _proto = Engine.prototype;
    _proto.aspectRatio = function aspectRatio(_aspectRatio) {
      var engine = new Engine((0, _extend.extend)(this.source(), {
        aspectRatio: _aspectRatio
      }));
      engine.original = this.original;
      engine.min = this.min;
      engine.max = this.max;
      return engine;
    };
    _proto.bounds = function bounds(_bounds) {
      _bounds = _bounds || [];
      var parameters = this.source();
      var min = this.min();
      var max = this.max();
      var b1 = parseAndClampArray([_bounds[0], _bounds[1]], min, max, min);
      var b2 = parseAndClampArray([_bounds[2], _bounds[3]], min, max, max);
      var p1 = parameters.to(b1);
      var p2 = parameters.to(b2);
      var delta = _min(_abs(p2[0] - p1[0]) > MIN_BOUNDS_RANGE ? _abs(p2[0] - p1[0]) : 2, _abs(p2[1] - p1[1]) > MIN_BOUNDS_RANGE ? _abs(p2[1] - p1[1]) : 2);
      if (delta < 2) {
        (0, _extend.extend)(parameters, createProjectUnprojectMethods(parameters.to, parameters.from, p1, p2, delta));
      }
      var engine = new Engine(parameters);
      engine.original = this.original;
      setMinMax(engine, b1, b2);
      return engine;
    };
    return Engine;
  }();
  exports._TESTS_Engine = Engine;
  function invertVerticalAxis(pair) {
    return [pair[0], -pair[1]];
  }
  function createProjectMethod(method) {
    return function (arg) {
      return invertVerticalAxis(method(arg));
    };
  }
  function createUnprojectMethod(method) {
    return function (arg) {
      return method(invertVerticalAxis(arg));
    };
  }
  function returnValue(value) {
    return function () {
      return value;
    };
  }
  function returnArray(value) {
    return function () {
      return value.slice();
    };
  }
  function findMinMax(p1, p2) {
    return {
      min: [_min(p1[0], p2[0]), _min(p1[1], p2[1])],
      max: [_max(p1[0], p2[0]), _max(p1[1], p2[1])]
    };
  }
  var projection = function projection(parameters) {
    return parameters && parameters.to ? new Engine(parameters) : null;
  };
  exports.projection = projection;
  var projectionsCache = {};
  projection.get = function (name) {
    return projectionsCache[name] || null;
  };
  projection.add = function (name, engine) {
    engine = engine instanceof Engine && engine || projection(engine);
    if (!projectionsCache[name] && engine) {
      projectionsCache[name] = engine;
    }
    return projection; // For chaining
  };

  function createProjectUnprojectMethods(project, unproject, p1, p2, delta) {
    var x0 = (p1[0] + p2[0]) / 2 - delta / 2;
    var y0 = (p1[1] + p2[1]) / 2 - delta / 2;
    var k = 2 / delta;
    return {
      to: function to(coordinates) {
        var _project = project(coordinates),
            _project2 = _slicedToArray(_project, 2),
            p0 = _project2[0],
            p1 = _project2[1];
        return [-1 + (p0 - x0) * k, -1 + (p1 - y0) * k];
      },
      from: function from(coordinates) {
        return unproject([x0 + (coordinates[0] + 1) / k, y0 + (coordinates[1] + 1) / k]);
      }
    };
  }

  ///#DEBUG

  ///#ENDDEBUG
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","./event_emitter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("./event_emitter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=projection.main.js.map