/**
* DevExtreme (esm/ui/map/provider.dynamic.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../core/utils/extend';
import { each, map } from '../../core/utils/iterator';
import Provider from './provider';
var abstract = Provider.abstract;
var DynamicProvider = Provider.inherit({
  _geocodeLocation: function _geocodeLocation(location) {
    return new Promise(function (resolve) {
      var cache = this._geocodedLocations;
      var cachedLocation = cache[location];
      if (cachedLocation) {
        resolve(cachedLocation);
      } else {
        this._geocodeLocationImpl(location).then(function (geocodedLocation) {
          cache[location] = geocodedLocation;
          resolve(geocodedLocation);
        });
      }
    }.bind(this));
  },
  _renderImpl: function _renderImpl() {
    return this._load().then(function () {
      return this._init();
    }.bind(this)).then(function () {
      return Promise.all([this.updateMapType(), this._areBoundsSet() ? this.updateBounds() : this.updateCenter()]);
    }.bind(this)).then(function () {
      this._attachHandlers();

      // NOTE: setTimeout is needed by providers to correctly initialize bounds
      return new Promise(function (resolve) {
        var timeout = setTimeout(function () {
          clearTimeout(timeout);
          resolve();
        });
      });
    }.bind(this));
  },
  _load: function _load() {
    if (!this._mapsLoader) {
      this._mapsLoader = this._loadImpl();
    }
    this._markers = [];
    this._routes = [];
    return this._mapsLoader;
  },
  _loadImpl: abstract,
  _init: abstract,
  _attachHandlers: abstract,
  addMarkers: function addMarkers(options) {
    return Promise.all(map(options, function (options) {
      return this._addMarker(options);
    }.bind(this))).then(function (markerObjects) {
      this._fitBounds();
      return [false, map(markerObjects, function (markerObject) {
        return markerObject.marker;
      })];
    }.bind(this));
  },
  _addMarker: function _addMarker(options) {
    return this._renderMarker(options).then(function (markerObject) {
      this._markers.push(extend({
        options: options
      }, markerObject));
      this._fireMarkerAddedAction({
        options: options,
        originalMarker: markerObject.marker
      });
      return markerObject;
    }.bind(this));
  },
  _renderMarker: abstract,
  removeMarkers: function removeMarkers(markersOptionsToRemove) {
    var that = this;
    each(markersOptionsToRemove, function (_, markerOptionToRemove) {
      that._removeMarker(markerOptionToRemove);
    });
    return Promise.resolve();
  },
  _removeMarker: function _removeMarker(markersOptionToRemove) {
    var that = this;
    each(this._markers, function (markerIndex, markerObject) {
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
  },
  _destroyMarker: abstract,
  _clearMarkers: function _clearMarkers() {
    while (this._markers.length > 0) {
      this._removeMarker(this._markers[0].options);
    }
  },
  addRoutes: function addRoutes(options) {
    return Promise.all(map(options, function (options) {
      return this._addRoute(options);
    }.bind(this))).then(function (routeObjects) {
      this._fitBounds();
      return [false, map(routeObjects, function (routeObject) {
        return routeObject.instance;
      })];
    }.bind(this));
  },
  _addRoute: function _addRoute(options) {
    return this._renderRoute(options).then(function (routeObject) {
      this._routes.push(extend({
        options: options
      }, routeObject));
      this._fireRouteAddedAction({
        options: options,
        originalRoute: routeObject.instance
      });
      return routeObject;
    }.bind(this));
  },
  _renderRoute: abstract,
  removeRoutes: function removeRoutes(options) {
    var that = this;
    each(options, function (routeIndex, options) {
      that._removeRoute(options);
    });
    return Promise.resolve();
  },
  _removeRoute: function _removeRoute(options) {
    var that = this;
    each(this._routes, function (routeIndex, routeObject) {
      if (routeObject.options !== options) {
        return true;
      }
      that._destroyRoute(routeObject);
      that._routes.splice(routeIndex, 1);
      that._fireRouteRemovedAction({
        options: options
      });
      return false;
    });
  },
  _destroyRoute: abstract,
  _clearRoutes: function _clearRoutes() {
    while (this._routes.length > 0) {
      this._removeRoute(this._routes[0].options);
    }
  },
  adjustViewport: function adjustViewport() {
    return this._fitBounds();
  },
  isEventsCanceled: function isEventsCanceled() {
    return true;
  },
  _fitBounds: abstract,
  _updateBounds: function _updateBounds() {
    var that = this;
    this._clearBounds();
    if (!this._option('autoAdjust')) {
      return;
    }
    each(this._markers, function (_, markerObject) {
      that._extendBounds(markerObject.location);
    });
    each(this._routes, function (_, routeObject) {
      routeObject.northEast && that._extendBounds(routeObject.northEast);
      routeObject.southWest && that._extendBounds(routeObject.southWest);
    });
  },
  _clearBounds: function _clearBounds() {
    this._bounds = null;
  },
  _extendBounds: abstract
});
export default DynamicProvider;
