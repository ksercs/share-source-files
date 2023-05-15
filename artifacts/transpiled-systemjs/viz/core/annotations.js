!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/annotations.js"], ["../../core/dom_adapter","../../core/utils/type","../core/tooltip","../../core/utils/extend","./utils","./plaque","../../events/pointer","../../events/drag","../../events/utils/index","../../events/core/events_engine"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/annotations.js", ["../../core/dom_adapter", "../../core/utils/type", "../core/tooltip", "../../core/utils/extend", "./utils", "./plaque", "../../events/pointer", "../../events/drag", "../../events/utils/index", "../../events/core/events_engine"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.plugins = exports.createAnnotations = exports.__test_utils = void 0;
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _type = $__require("../../core/utils/type");
  var _tooltip = $__require("../core/tooltip");
  var _extend = $__require("../../core/utils/extend");
  var _utils = $__require("./utils");
  var _plaque = $__require("./plaque");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _drag = $__require("../../events/drag");
  var _index = $__require("../../events/utils/index");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var getDocument = _dom_adapter.default.getDocument;
  var EVENT_NS = 'annotations';
  var DOT_EVENT_NS = '.' + EVENT_NS;
  var POINTER_ACTION = (0, _index.addNamespace)([_pointer.default.down, _pointer.default.move], EVENT_NS);
  var POINTER_UP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, EVENT_NS);
  var DRAG_START_EVENT_NAME = _drag.start + DOT_EVENT_NS;
  var DRAG_EVENT_NAME = _drag.move + DOT_EVENT_NS;
  var DRAG_END_EVENT_NAME = _drag.end + DOT_EVENT_NS;
  function coreAnnotation(options, contentTemplate) {
    return {
      draw: function draw(widget, group) {
        var _this = this;
        var annotationGroup = widget._renderer.g().append(group).css((0, _utils.patchFontOptions)(options.font));
        if (this.plaque) {
          this.plaque.clear();
        }
        this.plaque = new _plaque.Plaque((0, _extend.extend)(true, {}, options, {
          cornerRadius: (options.border || {}).cornerRadius
        }), widget, annotationGroup, contentTemplate, widget._isAnnotationBounded(options));
        this.plaque.draw(widget._getAnnotationCoords(this));
        if (options.allowDragging) {
          annotationGroup.on(DRAG_START_EVENT_NAME, {
            immediate: true
          }, function (e) {
            _this._dragOffsetX = _this.plaque.x - e.pageX;
            _this._dragOffsetY = _this.plaque.y - e.pageY;
          }).on(DRAG_EVENT_NAME, function (e) {
            _this.plaque.move(e.pageX + _this._dragOffsetX, e.pageY + _this._dragOffsetY);
          }).on(DRAG_END_EVENT_NAME, function (e) {
            _this.offsetX = (_this.offsetX || 0) + e.offset.x;
            _this.offsetY = (_this.offsetY || 0) + e.offset.y;
          });
        }
      },
      hitTest: function hitTest(x, y) {
        return this.plaque.hitTest(x, y);
      },
      showTooltip: function showTooltip(tooltip, _ref) {
        var x = _ref.x,
            y = _ref.y;
        var that = this;
        var options = that.options;
        if (tooltip.annotation !== that) {
          tooltip.setTemplate(options.tooltipTemplate);
          var callback = function callback(result) {
            result && (tooltip.annotation = that);
          };
          callback(tooltip.show(options, {
            x: x,
            y: y
          }, {
            target: options
          }, options.customizeTooltip, callback));
        } else {
          if (!tooltip.isCursorOnTooltip(x, y)) {
            tooltip.move(x, y);
          }
        }
      }
    };
  }
  function getTemplateFunction(options, widget) {
    var template;
    if (options.type === 'text') {
      template = function template(item, groupElement) {
        var text = widget._renderer.text(item.text).attr({
          'class': item.cssClass
        }).append({
          element: groupElement
        });
        if (item.width > 0 || item.height > 0) {
          text.setMaxSize(item.width, item.height, {
            wordWrap: item.wordWrap,
            textOverflow: item.textOverflow
          });
        }
      };
    } else if (options.type === 'image') {
      template = function template(item, groupElement) {
        var _ref2 = item.image || {},
            width = _ref2.width,
            height = _ref2.height,
            url = _ref2.url,
            location = _ref2.location;
        var outerWidth = item.width,
            outerHeight = item.height;
        var imageWidth = outerWidth > 0 ? Math.min(width, outerWidth) : width;
        var imageHeight = outerHeight > 0 ? Math.min(height, outerHeight) : height;
        widget._renderer.image(0, 0, imageWidth, imageHeight, url, location || 'center').append({
          element: groupElement
        });
      };
    } else if (options.type === 'custom') {
      template = options.template;
    }
    return template;
  }
  function getImageObject(image) {
    return typeof image === 'string' ? {
      url: image
    } : image;
  }
  var createAnnotations = function createAnnotations(widget, items) {
    var commonAnnotationSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var customizeAnnotation = arguments.length > 3 ? arguments[3] : undefined;
    var pullOptions = arguments.length > 4 ? arguments[4] : undefined;
    var commonImageOptions = getImageObject(commonAnnotationSettings.image);
    return items.reduce(function (arr, item) {
      var currentImageOptions = getImageObject(item.image);
      var customizedItem = (0, _type.isFunction)(customizeAnnotation) ? customizeAnnotation(item) : {};
      if (customizedItem) {
        customizedItem.image = getImageObject(customizedItem.image); // T881143
      }

      var options = (0, _extend.extend)(true, {}, commonAnnotationSettings, item, {
        image: commonImageOptions
      }, {
        image: currentImageOptions
      }, customizedItem);
      var templateFunction = getTemplateFunction(options, widget);
      var annotation = templateFunction && (0, _extend.extend)(true, pullOptions(options), coreAnnotation(options, widget._getTemplate(templateFunction)));
      annotation && arr.push(annotation);
      return arr;
    }, []);
  };

  ///#DEBUG
  exports.createAnnotations = createAnnotations;
  var __test_utils = {
    stub_createAnnotations: function stub_createAnnotations(stub) {
      this.old_createAnnotations = createAnnotations;
      exports.createAnnotations = createAnnotations = stub;
    },
    restore_createAnnotations: function restore_createAnnotations() {
      exports.createAnnotations = createAnnotations = this.old_createAnnotations;
    }
  };
  ///#ENDDEBUG
  exports.__test_utils = __test_utils;
  var chartPlugin = {
    name: 'annotations_chart',
    init: function init() {},
    dispose: function dispose() {},
    members: {
      _getAnnotationCoords: function _getAnnotationCoords(annotation) {
        var _axis, _axis2;
        var coords = {
          offsetX: annotation.offsetX,
          offsetY: annotation.offsetY
        };
        var argCoordName = this._options.silent('rotated') ? 'y' : 'x';
        var valCoordName = this._options.silent('rotated') ? 'x' : 'y';
        var argAxis = this.getArgumentAxis();
        var argument = argAxis.validateUnit(annotation.argument);
        var axis = this.getValueAxis(annotation.axis);
        var series;
        var pane = (_axis = axis) === null || _axis === void 0 ? void 0 : _axis.pane;
        if (annotation.series) {
          var _series;
          series = this.series.filter(function (s) {
            return s.name === annotation.series;
          })[0];
          axis = (_series = series) === null || _series === void 0 ? void 0 : _series.getValueAxis();
          (0, _type.isDefined)(axis) && (pane = axis.pane);
        }
        if ((0, _type.isDefined)(argument)) {
          if (series) {
            var center = series.getPointCenterByArg(argument);
            center && (coords[argCoordName] = center[argCoordName]);
          } else {
            coords[argCoordName] = argAxis.getTranslator().translate(argument);
          }
          !(0, _type.isDefined)(pane) && (pane = argAxis.pane);
        }
        var value = (_axis2 = axis) === null || _axis2 === void 0 ? void 0 : _axis2.validateUnit(annotation.value);
        if ((0, _type.isDefined)(value)) {
          var _axis3;
          coords[valCoordName] = (_axis3 = axis) === null || _axis3 === void 0 ? void 0 : _axis3.getTranslator().translate(value);
          !(0, _type.isDefined)(pane) && (0, _type.isDefined)(axis) && (pane = axis.pane);
        }
        coords.canvas = this._getCanvasForPane(pane);
        if ((0, _type.isDefined)(coords[argCoordName]) && !(0, _type.isDefined)(value)) {
          var _series2;
          if (!(0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
            coords[valCoordName] = argAxis.getAxisPosition();
          } else if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
            coords[valCoordName] = this._argumentAxes.filter(function (a) {
              return a.pane === axis.pane;
            })[0].getAxisPosition();
          } else if ((_series2 = series) !== null && _series2 !== void 0 && _series2.checkSeriesViewportCoord(argAxis, coords[argCoordName])) {
            coords[valCoordName] = series.getSeriesPairCoord(coords[argCoordName], true);
          }
        }
        if (!(0, _type.isDefined)(argument) && (0, _type.isDefined)(coords[valCoordName])) {
          if ((0, _type.isDefined)(axis) && !(0, _type.isDefined)(series)) {
            coords[argCoordName] = axis.getAxisPosition();
          } else if ((0, _type.isDefined)(series)) {
            if (series.checkSeriesViewportCoord(axis, coords[valCoordName])) {
              coords[argCoordName] = series.getSeriesPairCoord(coords[valCoordName], false);
            }
          }
        }
        return coords;
      },
      _annotationsPointerEventHandler: function _annotationsPointerEventHandler(event) {
        if (this._disposed) {
          return;
        }
        var originalEvent = event.originalEvent || {};
        var touch = originalEvent.touches && originalEvent.touches[0] || {};
        var rootOffset = this._renderer.getRootOffset();
        var coords = {
          x: touch.pageX || originalEvent.pageX || event.pageX,
          y: touch.pageY || originalEvent.pageY || event.pageY
        };
        var annotation = this._annotations.items.filter(function (a) {
          return a.hitTest(coords.x - rootOffset.left, coords.y - rootOffset.top);
        })[0];
        if (!annotation || !annotation.options.tooltipEnabled) {
          this._annotations.hideTooltip();
          return;
        }
        this._clear();
        if (annotation.options.allowDragging && event.type === _pointer.default.down) {
          this._annotations._hideToolTipForDrag = true;
        }
        if (!this._annotations._hideToolTipForDrag) {
          annotation.showTooltip(this._annotations.tooltip, coords);
          event.stopPropagation();
        }
      },
      _isAnnotationBounded: function _isAnnotationBounded(options) {
        return (0, _type.isDefined)(options.value) || (0, _type.isDefined)(options.argument);
      },
      _pullOptions: function _pullOptions(options) {
        return {
          type: options.type,
          name: options.name,
          x: options.x,
          y: options.y,
          value: options.value,
          argument: options.argument,
          axis: options.axis,
          series: options.series,
          options: options,
          offsetX: options.offsetX,
          offsetY: options.offsetY
        };
      },
      _forceAnnotationRender: function _forceAnnotationRender() {
        this._change(['FORCE_RENDER']);
      },
      _clear: function _clear() {
        this.hideTooltip();
        this.clearHover();
      }
    }
  };
  var polarChartPlugin = {
    name: 'annotations_polar_chart',
    init: function init() {},
    dispose: function dispose() {},
    members: {
      _getAnnotationCoords: function _getAnnotationCoords(annotation) {
        var coords = {
          offsetX: annotation.offsetX,
          offsetY: annotation.offsetY,
          canvas: this._calcCanvas()
        };
        var argAxis = this.getArgumentAxis();
        var argument = argAxis.validateUnit(annotation.argument);
        var value = this.getValueAxis().validateUnit(annotation.value);
        var radius = annotation.radius;
        var angle = annotation.angle;
        var pointCoords;
        var series;
        if (annotation.series) {
          series = this.series.filter(function (s) {
            return s.name === annotation.series;
          })[0];
        }
        (0, _extend.extend)(true, coords, this.getXYFromPolar(angle, radius, argument, value));
        if ((0, _type.isDefined)(series)) {
          if ((0, _type.isDefined)(coords.angle) && !(0, _type.isDefined)(value) && !(0, _type.isDefined)(radius)) {
            if (!(0, _type.isDefined)(argument)) {
              argument = argAxis.getTranslator().from(isFinite(angle) ? this.getActualAngle(angle) : coords.angle);
            }
            pointCoords = series.getSeriesPairCoord({
              argument: argument,
              angle: -coords.angle
            }, true);
          } else if ((0, _type.isDefined)(coords.radius) && !(0, _type.isDefined)(argument) && !(0, _type.isDefined)(angle)) {
            pointCoords = series.getSeriesPairCoord({
              radius: coords.radius
            }, false);
          }
          if ((0, _type.isDefined)(pointCoords)) {
            coords.x = pointCoords.x;
            coords.y = pointCoords.y;
          }
        }
        if (annotation.series && !(0, _type.isDefined)(pointCoords)) {
          coords.x = coords.y = undefined;
        }
        return coords;
      },
      _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
      _isAnnotationBounded: chartPlugin.members._isAnnotationBounded,
      _pullOptions: function _pullOptions(options) {
        var polarOptions = (0, _extend.extend)({}, {
          radius: options.radius,
          angle: options.angle
        }, chartPlugin.members._pullOptions(options));
        delete polarOptions.axis;
        return polarOptions;
      },
      _forceAnnotationRender: chartPlugin.members._forceAnnotationRender,
      _clear: chartPlugin.members._clear
    }
  };
  var vectorMapPlugin = {
    name: 'annotations_vector_map',
    init: function init() {},
    dispose: function dispose() {
      this._annotations._offTracker();
      this._annotations._offTracker = null;
    },
    members: {
      _getAnnotationCoords: function _getAnnotationCoords(annotation) {
        var coords = {
          offsetX: annotation.offsetX,
          offsetY: annotation.offsetY
        };
        coords.canvas = this._projection.getCanvas();
        if (annotation.coordinates) {
          var data = this._projection.toScreenPoint(annotation.coordinates);
          coords.x = data[0];
          coords.y = data[1];
        }
        return coords;
      },
      _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
      _isAnnotationBounded: function _isAnnotationBounded(options) {
        return (0, _type.isDefined)(options.coordinates);
      },
      _pullOptions: function _pullOptions(options) {
        var vectorMapOptions = (0, _extend.extend)({}, {
          coordinates: options.coordinates
        }, chartPlugin.members._pullOptions(options));
        delete vectorMapOptions.axis;
        delete vectorMapOptions.series;
        delete vectorMapOptions.argument;
        delete vectorMapOptions.value;
        return vectorMapOptions;
      },
      _forceAnnotationRender: function _forceAnnotationRender() {
        this._change(['EXTRA_ELEMENTS']);
      },
      _getAnnotationStyles: function _getAnnotationStyles() {
        return {
          'text-anchor': 'start'
        };
      },
      _clear: function _clear() {}
    },
    extenders: {
      _prepareExtraElements: function _prepareExtraElements() {
        var that = this;
        var renderElements = function renderElements() {
          that._renderExtraElements();
        };
        that._annotations._offTracker = that._tracker.on({
          'move': renderElements,
          'zoom': renderElements,
          'end': renderElements
        });
      }
    }
  };
  var pieChartPlugin = {
    name: 'annotations_pie_chart',
    init: function init() {},
    dispose: function dispose() {},
    members: {
      _getAnnotationCoords: function _getAnnotationCoords(annotation) {
        var series;
        var coords = {
          offsetX: annotation.offsetX,
          offsetY: annotation.offsetY,
          canvas: this._canvas
        };
        if (annotation.argument) {
          if (annotation.series) {
            series = this.getSeriesByName(annotation.series);
          } else {
            series = this.series[0];
          }
          var argument = series.getPointsByArg(annotation.argument)[0];
          var _argument$getAnnotati = argument.getAnnotationCoords(annotation.location),
              x = _argument$getAnnotati.x,
              y = _argument$getAnnotati.y;
          coords.x = x;
          coords.y = y;
        }
        return coords;
      },
      _isAnnotationBounded: function _isAnnotationBounded(options) {
        return options.argument;
      },
      _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
      _pullOptions: function _pullOptions(options) {
        var pieChartOptions = (0, _extend.extend)({}, {
          location: options.location
        }, chartPlugin.members._pullOptions(options));
        delete pieChartOptions.axis;
        return pieChartOptions;
      },
      _clear: chartPlugin.members._clear,
      _forceAnnotationRender: chartPlugin.members._forceAnnotationRender
    }
  };
  var corePlugin = {
    name: 'annotations_core',
    init: function init() {
      this._annotations = {
        items: [],
        _hideToolTipForDrag: false,
        tooltip: new _tooltip.Tooltip({
          cssClass: "".concat(this._rootClassPrefix, "-annotation-tooltip"),
          eventTrigger: this._eventTrigger,
          widgetRoot: this.element(),
          widget: this
        }),
        hideTooltip: function hideTooltip() {
          this.tooltip.annotation = null;
          this.tooltip.hide();
        },
        clearItems: function clearItems() {
          this.items.forEach(function (i) {
            return i.plaque.clear();
          });
          this.items = [];
        }
      };
      this._annotations.tooltip.setRendererOptions(this._getRendererOptions());
    },
    dispose: function dispose() {
      this._annotationsGroup.linkRemove().linkOff();
      _events_engine.default.off(getDocument(), DOT_EVENT_NS);
      this._annotationsGroup.off(DOT_EVENT_NS);
      this._annotations.tooltip && this._annotations.tooltip.dispose();
    },
    extenders: {
      _createHtmlStructure: function _createHtmlStructure() {
        var _this2 = this;
        this._annotationsGroup = this._renderer.g().attr({
          'class': "".concat(this._rootClassPrefix, "-annotations")
        }).css(this._getAnnotationStyles()).linkOn(this._renderer.root, 'annotations').linkAppend();
        _events_engine.default.on(getDocument(), POINTER_ACTION, function (e) {
          if (_this2._disposed) {
            return;
          }
          if (!_this2._annotations.tooltip.isCursorOnTooltip(e.pageX, e.pageY)) {
            _this2._annotations.hideTooltip();
          }
        });
        _events_engine.default.on(getDocument(), POINTER_UP_EVENT_NAME, function (event) {
          _this2._annotations._hideToolTipForDrag = false;
          _this2._annotationsPointerEventHandler(event);
        });
        this._annotationsGroup.on(POINTER_ACTION, this._annotationsPointerEventHandler.bind(this));
      },
      _renderExtraElements: function _renderExtraElements() {
        var _this3 = this;
        this._annotationsGroup.clear();
        this._annotations.items.forEach(function (item) {
          return item.draw(_this3, _this3._annotationsGroup);
        });
      },
      _stopCurrentHandling: function _stopCurrentHandling() {
        this._annotations.hideTooltip();
      }
    },
    members: {
      _buildAnnotations: function _buildAnnotations() {
        this._annotations.clearItems();
        var items = this._getOption('annotations', true);
        if (!(items !== null && items !== void 0 && items.length)) {
          return;
        }
        this._annotations.items = createAnnotations(this, items, this._getOption('commonAnnotationSettings'), this._getOption('customizeAnnotation', true), this._pullOptions);
      },
      _setAnnotationTooltipOptions: function _setAnnotationTooltipOptions() {
        var tooltipOptions = (0, _extend.extend)({}, this._getOption('tooltip'));
        tooltipOptions.contentTemplate = tooltipOptions.customizeTooltip = undefined;
        this._annotations.tooltip.update(tooltipOptions);
      },
      _getAnnotationCoords: function _getAnnotationCoords() {
        return {};
      },
      _pullOptions: function _pullOptions() {
        return {};
      },
      _getAnnotationStyles: function _getAnnotationStyles() {
        return {};
      }
    },
    customize: function customize(constructor) {
      constructor.addChange({
        code: 'ANNOTATIONITEMS',
        handler: function handler() {
          this._requestChange(['ANNOTATIONS']);
        },
        isOptionChange: true,
        option: 'annotations'
      });
      constructor.addChange({
        code: 'ANNOTATIONSSETTINGS',
        handler: function handler() {
          this._requestChange(['ANNOTATIONS']);
        },
        isOptionChange: true,
        option: 'commonAnnotationSettings'
      });
      constructor.addChange({
        code: 'ANNOTATIONS',
        handler: function handler() {
          this._buildAnnotations();
          this._setAnnotationTooltipOptions();
          this._forceAnnotationRender();
        },
        isThemeDependent: true,
        isOptionChange: true
      });
    },
    fontFields: ['commonAnnotationSettings.font']
  };
  var plugins = {
    core: corePlugin,
    chart: chartPlugin,
    polarChart: polarChartPlugin,
    vectorMap: vectorMapPlugin,
    pieChart: pieChartPlugin
  };
  exports.plugins = plugins;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/dom_adapter","../../core/utils/type","../core/tooltip","../../core/utils/extend","./utils","./plaque","../../events/pointer","../../events/drag","../../events/utils/index","../../events/core/events_engine"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/dom_adapter"), require("../../core/utils/type"), require("../core/tooltip"), require("../../core/utils/extend"), require("./utils"), require("./plaque"), require("../../events/pointer"), require("../../events/drag"), require("../../events/utils/index"), require("../../events/core/events_engine"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=annotations.js.map