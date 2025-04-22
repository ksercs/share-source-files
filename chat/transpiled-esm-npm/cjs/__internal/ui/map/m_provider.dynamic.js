"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _class = _interopRequireDefault(require("../../../core/class"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _m_provider = _interopRequireDefault(require("./m_provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/no-misused-promises */

const MAP_MARKER_CLASS = 'dx-map-marker';
class DynamicProvider extends _m_provider.default {
  ctor(map, $container) {
    this._geocodedLocations = {};
    super.ctor(map, $container);
  }
  _geocodeLocation(location) {
    return new Promise(resolve => {
      const cache = this._geocodedLocations;
      const cachedLocation = cache[location];
      if (cachedLocation) {
        resolve(cachedLocation);
      } else {
        // @ts-expect-error ts-error
        this._geocodeLocationImpl(location).then(geocodedLocation => {
          cache[location] = geocodedLocation;
          resolve(geocodedLocation);
        });
      }
    });
  }
  _renderImpl() {
    return this._load().then(() => this._init()).then(() => Promise.all([this.updateMapType(), this._areBoundsSet() ? this.updateBounds() : this.updateCenter()])).then(() => {
      this._attachHandlers();
      // NOTE: setTimeout is needed by providers to correctly initialize bounds
      return new Promise(resolve => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          // @ts-expect-error
          resolve();
        });
      });
    });
  }
  _load() {
    if (!this._mapsLoader) {
      this._mapsLoader = this._loadImpl();
    }
    this._markers = [];
    this._routes = [];
    return this._mapsLoader;
  }
  _loadImpl() {
    _class.default.abstract();
  }
  _init() {
    _class.default.abstract();
  }
  _attachHandlers() {
    _class.default.abstract();
  }
  addMarkers(options) {
    return Promise.all((0, _iterator.map)(options, options => this._addMarker(options))).then(markerObjects => {
      this._fitBounds();
      return [false, (0, _iterator.map)(markerObjects, markerObject => markerObject.marker)];
    });
  }
  _addMarker(options) {
    return this._renderMarker(options)
    // @ts-expect-error ts-error
    .then(markerObject => {
      this._markers.push((0, _extend.extend)({
        options
      }, markerObject));
      this._fireMarkerAddedAction({
        options,
        originalMarker: markerObject.marker
      });
      return markerObject;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderMarker(options) {
    _class.default.abstract();
  }
  _createIconTemplate(iconSrc) {
    const $img = (0, _renderer.default)('<img>');
    $img.attr('src', iconSrc);
    $img.attr('alt', 'Marker icon');
    $img.addClass(MAP_MARKER_CLASS);
    return $img[0];
  }
  removeMarkers(markersOptionsToRemove) {
    const that = this;
    (0, _iterator.each)(markersOptionsToRemove, (_, markerOptionToRemove) => {
      that._removeMarker(markerOptionToRemove);
    });
    return Promise.resolve();
  }
  _removeMarker(markersOptionToRemove) {
    const that = this;
    (0, _iterator.each)(this._markers, (markerIndex, markerObject) => {
      if (markerObject.options !== markersOptionToRemove) {
        return true;
      }
      that._destroyMarker(markerObject);
      that._markers.splice(markerIndex, 1);
      that._fireMarkerRemovedAction({
        options: markerObject.options
      });
      return false;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _destroyMarker(marker) {
    _class.default.abstract();
  }
  _clearMarkers() {
    while (this._markers.length > 0) {
      this._removeMarker(this._markers[0].options);
    }
  }
  addRoutes(options) {
    return Promise.all((0, _iterator.map)(options, options => this._addRoute(options))).then(routeObjects => {
      this._fitBounds();
      return [false, (0, _iterator.map)(routeObjects, routeObject => routeObject.instance)];
    });
  }
  _addRoute(options) {
    // @ts-expect-error ts-error
    return this._renderRoute(options).then(routeObject => {
      this._routes.push((0, _extend.extend)({
        options
      }, routeObject));
      this._fireRouteAddedAction({
        options,
        originalRoute: routeObject.instance
      });
      return routeObject;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderRoute(options) {
    _class.default.abstract();
  }
  removeRoutes(options) {
    const that = this;
    (0, _iterator.each)(options, (routeIndex, options) => {
      that._removeRoute(options);
    });
    return Promise.resolve();
  }
  _removeRoute(options) {
    const that = this;
    (0, _iterator.each)(this._routes, (routeIndex, routeObject) => {
      if (routeObject.options !== options) {
        return true;
      }
      that._destroyRoute(routeObject);
      that._routes.splice(routeIndex, 1);
      that._fireRouteRemovedAction({
        options
      });
      return false;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _destroyRoute(routeObject) {
    _class.default.abstract();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _geocodeLocationImpl(location) {
    _class.default.abstract();
  }
  _clearRoutes() {
    while (this._routes.length > 0) {
      this._removeRoute(this._routes[0].options);
    }
  }
  adjustViewport() {
    return this._fitBounds();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEventsCanceled(e) {
    return true;
  }
  _fitBounds() {
    _class.default.abstract();
  }
  _updateBounds() {
    const that = this;
    this._clearBounds();
    if (!this._option('autoAdjust')) {
      return;
    }
    (0, _iterator.each)(this._markers, (_, markerObject) => {
      that._extendBounds(markerObject.location);
    });
    (0, _iterator.each)(this._routes, (_, routeObject) => {
      routeObject.northEast && that._extendBounds(routeObject.northEast);
      routeObject.southWest && that._extendBounds(routeObject.southWest);
    });
  }
  _clearBounds() {
    this._bounds = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _extendBounds(location) {
    _class.default.abstract();
  }
}
var _default = exports.default = DynamicProvider;