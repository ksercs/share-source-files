/**
* DevExtreme (esm/viz/vector_map/vector_map.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { parseScalar as _parseScalar } from '../core/utils';
import { Projection } from './projection.main';
import { ControlBar } from './control_bar/control_bar';
import { GestureHandler } from './gesture_handler';
import { Tracker } from './tracker';
import { DataExchanger } from './data_exchanger';
import { LegendsControl } from './legend';
import { LayoutControl } from './layout';
import { MapLayerCollection, getMaxBound } from './map_layer';
import { TooltipViewer } from './tooltip_viewer';
import { generateDataKey } from './vector_map.utils';
var DEFAULT_WIDTH = 800;
var DEFAULT_HEIGHT = 400;
var RE_STARTS_LAYERS = /^layers/;
var RE_ENDS_DATA_SOURCE = /\.dataSource$/;
import './projection';
import BaseWidget from '../../__internal/viz/core/m_base_widget';
function mergeBounds(sumBounds, dataBounds) {
  return dataBounds ? [Math.min(dataBounds[0], dataBounds[2], sumBounds[0]), Math.min(dataBounds[1], dataBounds[3], sumBounds[3]), Math.max(dataBounds[0], dataBounds[2], sumBounds[2]), Math.max(dataBounds[1], dataBounds[3], sumBounds[1])] : sumBounds;
}
var dxVectorMap = BaseWidget.inherit({
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
    that._layerCollection = new MapLayerCollection({
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
      dataReady() {
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
              to(coordinates) {
                return [(coordinates[0] - bounds[0]) * 2 / longitudeLength - 1, (coordinates[1] - bounds[3]) * 2 / latitudeLength - 1];
              },
              from(coordinates) {
                return [(coordinates[0] + 1) * longitudeLength / 2 + bounds[0], (coordinates[1] + 1) * latitudeLength / 2 + bounds[3]];
              }
            });
          }
        }
      }
    });
  },
  _getBoundsFromData() {
    var bounds = this._getBoundingBoxFromDataSource();
    if (!bounds) {
      var boundsByData = getMaxBound(this.getLayers().map(l => l.getBounds()));
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
    that._legendsControl = new LegendsControl({
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
    that._controlBar = new ControlBar({
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
    var dataKey = generateDataKey();
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
    that._dataExchanger = new DataExchanger();

    // The `{ eventTrigger: that._eventTrigger }` object cannot be passed to the Projection because later backward option updating is going to be added.
    that._projection = new Projection({
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
    that._tracker = new Tracker({
      root: that._root,
      projection: that._projection,
      dataKey: dataKey
    });
    that._gestureHandler = new GestureHandler({
      projection: that._projection,
      renderer: that._renderer,
      tracker: that._tracker
    });
    that._layoutControl = new LayoutControl(that);
    that._layoutControl.suspend();
    that._initLayerCollection(dataKey);
    that._createHtmlStructure();
    that._initControlBar(dataKey);
    that._initLegendsControl();
    that._prepareExtraElements();
    that._tooltipViewer = new TooltipViewer({
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
      centeringEnabled: !!_parseScalar(this._getOption('panningEnabled', true), true),
      zoomingEnabled: !!_parseScalar(this._getOption('zoomingEnabled', true), true)
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
  _getBoundingBoxFromDataSource() {
    var that = this;
    var layers = that._layerCollection.items();
    var infinityBounds = [Infinity, -Infinity, -Infinity, Infinity];
    var resultBBox = layers && layers.length ? layers.reduce((sumBBox, l) => {
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
  getLayers() {
    return this._layerCollection.items().map(l => l.proxy);
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
import componentRegistrator from '../../core/component_registrator';
componentRegistrator('dxVectorMap', dxVectorMap);
export default dxVectorMap;

// PLUGINS_SECTION
import { plugin as ExportPlugin } from '../core/export';
import { plugin as TitlePlugin } from '../core/title';
import { plugin as TooltipPlugin } from '../core/tooltip';
import { plugin as LoadingIndicatorPlugin } from '../core/loading_indicator';
import { plugins as annotationsPlugins } from '../core/annotations';
dxVectorMap.addPlugin(ExportPlugin);
dxVectorMap.addPlugin(TitlePlugin);
dxVectorMap.addPlugin(TooltipPlugin);
dxVectorMap.addPlugin(LoadingIndicatorPlugin);
dxVectorMap.addPlugin(annotationsPlugins.core);
dxVectorMap.addPlugin(annotationsPlugins.vectorMap);
