!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/vector_map/vector_map.js"], ["../core/utils","./projection.main","./control_bar/control_bar","./gesture_handler","./tracker","./data_exchanger","./legend","./layout","./map_layer","./tooltip_viewer","./vector_map.utils","./projection","../core/base_widget","../../core/component_registrator","../core/export","../core/title","../core/tooltip","../core/loading_indicator","../core/annotations"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/vector_map/vector_map.js", ["../core/utils", "./projection.main", "./control_bar/control_bar", "./gesture_handler", "./tracker", "./data_exchanger", "./legend", "./layout", "./map_layer", "./tooltip_viewer", "./vector_map.utils", "./projection", "../core/base_widget", "../../core/component_registrator", "../core/export", "../core/title", "../core/tooltip", "../core/loading_indicator", "../core/annotations"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _utils = $__require("../core/utils");
  var _projection = $__require("./projection.main");
  var _control_bar = $__require("./control_bar/control_bar");
  var _gesture_handler = $__require("./gesture_handler");
  var _tracker = $__require("./tracker");
  var _data_exchanger = $__require("./data_exchanger");
  var _legend = $__require("./legend");
  var _layout = $__require("./layout");
  var _map_layer = $__require("./map_layer");
  var _tooltip_viewer = $__require("./tooltip_viewer");
  var _vector_map = $__require("./vector_map.utils");
  $__require("./projection");
  var _base_widget = _interopRequireDefault($__require("../core/base_widget"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _export = $__require("../core/export");
  var _title = $__require("../core/title");
  var _tooltip = $__require("../core/tooltip");
  var _loading_indicator = $__require("../core/loading_indicator");
  var _annotations = $__require("../core/annotations");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DEFAULT_WIDTH = 800;
  var DEFAULT_HEIGHT = 400;
  var RE_STARTS_LAYERS = /^layers/;
  var RE_ENDS_DATA_SOURCE = /\.dataSource$/;
  function mergeBounds(sumBounds, dataBounds) {
    return dataBounds ? [Math.min(dataBounds[0], dataBounds[2], sumBounds[0]), Math.min(dataBounds[1], dataBounds[3], sumBounds[3]), Math.max(dataBounds[0], dataBounds[2], sumBounds[2]), Math.max(dataBounds[1], dataBounds[3], sumBounds[1])] : sumBounds;
  }
  var dxVectorMap = _base_widget.default.inherit({
    _eventsMap: {
      'onClick': {
        name: 'click'
      },
      'onCenterChanged': {
        name: 'centerChanged'
      },
      'onZoomFactorChanged': {
        name: 'zoomFactorChanged'
      },
      'onHoverChanged': {
        name: 'hoverChanged'
      },
      'onSelectionChanged': {
        name: 'selectionChanged'
      }
    },
    _rootClassPrefix: 'dxm',
    _rootClass: 'dxm-vector-map',
    _themeSection: 'map',
    _fontFields: ['layer:area.label.font', 'layer:marker:dot.label.font', 'layer:marker:bubble.label.font', 'layer:marker:pie.label.font', 'layer:marker:image.label.font', 'legend.font', 'legend.title.font', 'legend.title.subtitle.font'],
    _initLayerCollection: function _initLayerCollection(dataKey) {
      var that = this;
      that._layerCollection = new _map_layer.MapLayerCollection({
        renderer: that._renderer,
        projection: that._projection,
        themeManager: that._themeManager,
        tracker: that._tracker,
        dataKey: dataKey,
        eventTrigger: that._eventTrigger,
        dataExchanger: that._dataExchanger,
        tooltip: that._tooltip,
        notifyDirty: that._notifyDirty,
        notifyReady: that._notifyReady,
        dataReady: function dataReady() {
          var bounds;
          if (that.option('getBoundsFromData') && !that.option('bounds')) {
            that._preventProjectionEvents();
            bounds = that._getBoundsFromData();
            that._projection.setBounds(bounds);
            that._allowProjectionEvents();
          }
          if (!that.option('projection')) {
            bounds = bounds || that._getBoundsFromData();
            if (Math.ceil(bounds[0]) < -180 || Math.ceil(bounds[3]) < -90 || Math.floor(bounds[2]) > 180 || Math.floor(bounds[1]) > 90) {
              var longitudeLength = bounds[2] - bounds[0];
              var latitudeLength = bounds[1] - bounds[3];
              that._projection.setEngine({
                to: function to(coordinates) {
                  return [(coordinates[0] - bounds[0]) * 2 / longitudeLength - 1, (coordinates[1] - bounds[3]) * 2 / latitudeLength - 1];
                },
                from: function from(coordinates) {
                  return [(coordinates[0] + 1) * longitudeLength / 2 + bounds[0], (coordinates[1] + 1) * latitudeLength / 2 + bounds[3]];
                }
              });
            }
          }
        }
      });
    },
    _getBoundsFromData: function _getBoundsFromData() {
      var bounds = this._getBoundingBoxFromDataSource();
      if (!bounds) {
        var boundsByData = (0, _map_layer.getMaxBound)(this.getLayers().map(function (l) {
          return l.getBounds();
        }));
        if (boundsByData) {
          bounds = boundsByData;
        }
      }
      bounds = bounds || [];
      bounds = [bounds[0], bounds[3], bounds[2], bounds[1]];
      return bounds;
    },
    _initLegendsControl: function _initLegendsControl() {
      var that = this;
      that._legendsControl = new _legend.LegendsControl({
        renderer: that._renderer,
        container: that._root,
        widget: that,
        layoutControl: that._layoutControl,
        themeManager: that._themeManager,
        dataExchanger: that._dataExchanger,
        notifyDirty: that._notifyDirty,
        notifyReady: that._notifyReady
      });
    },
    _initControlBar: function _initControlBar(dataKey) {
      var that = this;
      that._controlBar = new _control_bar.ControlBar({
        renderer: that._renderer,
        container: that._root,
        layoutControl: that._layoutControl,
        projection: that._projection,
        tracker: that._tracker,
        dataKey: dataKey
      });
    },
    _initElements: function _initElements() {
      var that = this;
      var dataKey = (0, _vector_map.generateDataKey)();
      var notifyCounter = 0;
      var preventProjectionEvents;
      that._preventProjectionEvents = function () {
        preventProjectionEvents = true;
      };
      that._allowProjectionEvents = function () {
        preventProjectionEvents = false;
      };
      that._notifyDirty = function () {
        that._resetIsReady();
        ++notifyCounter;
      };
      that._notifyReady = function () {
        that._allowProjectionEvents();
        if (--notifyCounter === 0) {
          that._drawn();
        }
      };
      that._preventProjectionEvents();
      that._dataExchanger = new _data_exchanger.DataExchanger();

      // The `{ eventTrigger: that._eventTrigger }` object cannot be passed to the Projection because later backward option updating is going to be added.
      that._projection = new _projection.Projection({
        centerChanged: function centerChanged(value) {
          if (!preventProjectionEvents) {
            that._eventTrigger('centerChanged', {
              center: value
            });
          }
        },
        zoomChanged: function zoomChanged(value) {
          if (!preventProjectionEvents) {
            that._eventTrigger('zoomFactorChanged', {
              zoomFactor: value
            });
          }
        }
      });
      that._tracker = new _tracker.Tracker({
        root: that._root,
        projection: that._projection,
        dataKey: dataKey
      });
      that._gestureHandler = new _gesture_handler.GestureHandler({
        projection: that._projection,
        renderer: that._renderer,
        tracker: that._tracker
      });
      that._layoutControl = new _layout.LayoutControl(that);
      that._layoutControl.suspend();
      that._initLayerCollection(dataKey);
      that._createHtmlStructure();
      that._initControlBar(dataKey);
      that._initLegendsControl();
      that._prepareExtraElements();
      that._tooltipViewer = new _tooltip_viewer.TooltipViewer({
        tracker: that._tracker,
        tooltip: that._tooltip,
        layerCollection: that._layerCollection
      });
    },
    _change_RESUME_LAYOUT: function _change_RESUME_LAYOUT() {
      this._layoutControl.resume();
    },
    _initialChanges: ['PROJECTION', 'RESUME_LAYOUT', 'LAYOUT_INIT', 'BOUNDS', 'MAX_ZOOM_FACTOR', 'ZOOM_FACTOR', 'CENTER'],
    _layoutChangesOrder: ['RESUME_LAYOUT', 'LAYERS'],
    _customChangesOrder: ['EXTRA_ELEMENTS'],
    _initCore: function _initCore() {
      this._root = this._renderer.root.attr({
        align: 'center',
        cursor: 'default'
      });
      this._initElements();
    },
    _disposeCore: function _disposeCore() {
      var that = this;
      that._controlBar.dispose();
      that._gestureHandler.dispose();
      that._tracker.dispose();
      that._legendsControl.dispose();
      that._layerCollection.dispose();
      that._layoutControl.dispose();
      that._tooltipViewer.dispose();
      that._dataExchanger.dispose();
      that._projection.dispose();
      that._dataExchanger = that._gestureHandler = that._projection = that._tracker = that._layoutControl = that._root = that._layerCollection = that._controlBar = that._legendsControl = null;
    },
    _setupInteraction: function _setupInteraction() {
      var options = {
        centeringEnabled: !!(0, _utils.parseScalar)(this._getOption('panningEnabled', true), true),
        zoomingEnabled: !!(0, _utils.parseScalar)(this._getOption('zoomingEnabled', true), true)
      };
      this._gestureHandler.setInteraction(options);
      this._controlBar.setInteraction(options);
    },
    _getDefaultSize: function _getDefaultSize() {
      return {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
      };
    },
    _applySize: function _applySize(rect) {
      var layout = {
        left: rect[0],
        top: rect[1],
        width: rect[2] - rect[0],
        height: rect[3] - rect[1],
        right: 0,
        bottom: 0
      };
      this._projection.setSize(layout);
      this._layoutControl.setSize(layout);
      this._layerCollection.setRect([layout.left, layout.top, layout.width, layout.height]);
      this._requestChange(['EXTRA_ELEMENTS']);
    },
    // The "layers_data", "mapData", "markers" options must never be merged (because of their meaning)
    // For "layers_data" there are special cases: "layers", "layers.data", "layers[i]", "layers[i].data"
    // Because of the cases (1) and (3) "option by reference" mechanism cannot be used -
    // so separate (for dxVectorMap only by now) mechanism is introduced - it handles all cases (including "option by reference")
    // T318992
    // Previously mechanism used the "_optionValuesEqual" method but after T318992 usage of "_optionValuesEqual" was stopped
    // and new (more meaningful) method was added - "_optionChanging"
    _optionChanging: function _optionChanging(name, currentValue, nextValue) {
      if (currentValue && nextValue) {
        if (RE_STARTS_LAYERS.test(name)) {
          if (currentValue.dataSource && nextValue.dataSource && currentValue !== nextValue) {
            currentValue.dataSource = null;
          } else if (RE_ENDS_DATA_SOURCE.test(name)) {
            this.option(name, null);
          }
        }
      }
    },
    _applyChanges: function _applyChanges() {
      this._notifyDirty();
      this.callBase.apply(this, arguments);
      this._notifyReady();
    },
    _optionChangesMap: {
      background: 'BACKGROUND',
      layers: 'LAYERS',
      extraElements: 'EXTRA_ELEMENTS',
      controlBar: 'CONTROL_BAR',
      legends: 'LEGENDS',
      touchEnabled: 'TRACKER',
      wheelEnabled: 'TRACKER',
      panningEnabled: 'INTERACTION',
      zoomingEnabled: 'INTERACTION',
      projection: 'PROJECTION',
      bounds: 'BOUNDS',
      maxZoomFactor: 'MAX_ZOOM_FACTOR',
      zoomFactor: 'ZOOM_FACTOR',
      center: 'CENTER'
    },
    _optionChangesOrder: ['PROJECTION', 'BOUNDS', 'MAX_ZOOM_FACTOR', 'ZOOM_FACTOR', 'CENTER', 'BACKGROUND', 'CONTROL_BAR', 'LEGENDS', 'TRACKER', 'INTERACTION'],
    _change_PROJECTION: function _change_PROJECTION() {
      this._setProjection();
    },
    _change_BOUNDS: function _change_BOUNDS() {
      this._setBounds();
    },
    _change_MAX_ZOOM_FACTOR: function _change_MAX_ZOOM_FACTOR() {
      this._setMaxZoom();
    },
    _change_ZOOM_FACTOR: function _change_ZOOM_FACTOR() {
      this._setZoom();
    },
    _change_CENTER: function _change_CENTER() {
      this._setCenter();
    },
    _change_BACKGROUND: function _change_BACKGROUND() {
      this._setBackgroundOptions();
    },
    _change_LAYERS: function _change_LAYERS() {
      this._setLayerCollectionOptions();
    },
    _change_CONTROL_BAR: function _change_CONTROL_BAR() {
      this._setControlBarOptions();
    },
    _change_EXTRA_ELEMENTS: function _change_EXTRA_ELEMENTS() {
      this._renderExtraElements();
    },
    _change_LEGENDS: function _change_LEGENDS() {
      this._setLegendsOptions();
    },
    _change_TRACKER: function _change_TRACKER() {
      this._setTrackerOptions();
    },
    _change_INTERACTION: function _change_INTERACTION() {
      this._setupInteraction();
    },
    _themeDependentChanges: ['BACKGROUND', 'LAYERS', 'CONTROL_BAR', 'LEGENDS', 'TRACKER', 'INTERACTION'],
    _setProjection: function _setProjection() {
      this._projection.setEngine(this.option('projection'));
    },
    _setBounds: function _setBounds() {
      this._projection.setBounds(this.option('bounds'));
    },
    _setMaxZoom: function _setMaxZoom() {
      this._projection.setMaxZoom(this.option('maxZoomFactor'));
    },
    _setZoom: function _setZoom() {
      this._projection.setZoom(this.option('zoomFactor'));
    },
    _setCenter: function _setCenter() {
      this._projection.setCenter(this.option('center'));
    },
    _setBackgroundOptions: function _setBackgroundOptions() {
      this._layerCollection.setBackgroundOptions(this._getOption('background'));
    },
    _setLayerCollectionOptions: function _setLayerCollectionOptions() {
      this._layerCollection.setOptions(this.option('layers'));
    },
    _getBoundingBoxFromDataSource: function _getBoundingBoxFromDataSource() {
      var that = this;
      var layers = that._layerCollection.items();
      var infinityBounds = [Infinity, -Infinity, -Infinity, Infinity];
      var resultBBox = layers && layers.length ? layers.reduce(function (sumBBox, l) {
        var layerData = l.getData();
        var itemCount = layerData.count();
        if (itemCount > 0) {
          var rootBBox = layerData.getBBox();
          if (rootBBox) {
            sumBBox = mergeBounds(sumBBox, rootBBox);
          } else {
            for (var i = 0; i < itemCount; i++) {
              sumBBox = mergeBounds(sumBBox, layerData.getBBox(i));
            }
          }
        }
        return sumBBox;
      }, infinityBounds) : undefined;
      return resultBBox === infinityBounds ? undefined : resultBBox;
    },
    _setControlBarOptions: function _setControlBarOptions() {
      this._controlBar.setOptions(this._getOption('controlBar'));
    },
    _setLegendsOptions: function _setLegendsOptions() {
      this._legendsControl.setOptions(this.option('legends'));
    },
    _setTrackerOptions: function _setTrackerOptions() {
      this._tracker.setOptions({
        touchEnabled: this._getOption('touchEnabled', true),
        wheelEnabled: this._getOption('wheelEnabled', true)
      });
    },
    getLayers: function getLayers() {
      return this._layerCollection.items().map(function (l) {
        return l.proxy;
      });
    },
    getLayerByIndex: function getLayerByIndex(index) {
      var layer = this._layerCollection.byIndex(index);
      return layer ? layer.proxy : null;
    },
    getLayerByName: function getLayerByName(name) {
      var layer = this._layerCollection.byName(name);
      return layer ? layer.proxy : null;
    },
    clearSelection: function clearSelection(_noEvent) {
      var layers = this._layerCollection.items();
      var i;
      var ii = layers.length;
      for (i = 0; i < ii; ++i) {
        layers[i].clearSelection(_noEvent);
      }
      return this;
    },
    center: function center(value) {
      var that = this;
      if (value === undefined) {
        return that._projection.getCenter();
      } else {
        that._projection.setCenter(value);
        return that;
      }
    },
    zoomFactor: function zoomFactor(value) {
      var that = this;
      if (value === undefined) {
        return that._projection.getZoom();
      } else {
        that._projection.setZoom(value);
        return that;
      }
    },
    viewport: function viewport(value) {
      var that = this;
      if (value === undefined) {
        return that._projection.getViewport();
      } else {
        that._projection.setViewport(value);
        return that;
      }
    },
    convertCoordinates: function convertCoordinates(coordinates) {
      coordinates = coordinates && coordinates.length ? coordinates : [arguments[0], arguments[1]];
      return this.convertToGeo(coordinates[0], coordinates[1]);
    },
    convertToGeo: function convertToGeo(x, y) {
      return this._projection.fromScreenPoint([x, y]);
    },
    convertToXY: function convertToXY(longitude, latitude) {
      return this._projection.toScreenPoint([longitude, latitude]);
    }
  });
  (0, _component_registrator.default)('dxVectorMap', dxVectorMap);
  var _default = dxVectorMap; // PLUGINS_SECTION
  exports.default = _default;
  dxVectorMap.addPlugin(_export.plugin);
  dxVectorMap.addPlugin(_title.plugin);
  dxVectorMap.addPlugin(_tooltip.plugin);
  dxVectorMap.addPlugin(_loading_indicator.plugin);
  dxVectorMap.addPlugin(_annotations.plugins.core);
  dxVectorMap.addPlugin(_annotations.plugins.vectorMap);
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils","./projection.main","./control_bar/control_bar","./gesture_handler","./tracker","./data_exchanger","./legend","./layout","./map_layer","./tooltip_viewer","./vector_map.utils","./projection","../core/base_widget","../../core/component_registrator","../core/export","../core/title","../core/tooltip","../core/loading_indicator","../core/annotations"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils"), require("./projection.main"), require("./control_bar/control_bar"), require("./gesture_handler"), require("./tracker"), require("./data_exchanger"), require("./legend"), require("./layout"), require("./map_layer"), require("./tooltip_viewer"), require("./vector_map.utils"), require("./projection"), require("../core/base_widget"), require("../../core/component_registrator"), require("../core/export"), require("../core/title"), require("../core/tooltip"), require("../core/loading_indicator"), require("../core/annotations"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=vector_map.js.map