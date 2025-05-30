/**
* DevExtreme (esm/ui/map/provider.dynamic.bing.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth, getHeight } from '../../core/utils/size';
import { noop } from '../../core/utils/common';
import { getWindow } from '../../core/utils/window';
var window = getWindow();
import { extend } from '../../core/utils/extend';
import errors from '../widget/ui.errors';
import { map, each } from '../../core/utils/iterator';
import DynamicProvider from './provider.dynamic';
import Color from '../../color';
import ajax from '../../core/utils/ajax';
import { isDefined } from '../../core/utils/type';

/* global Microsoft */
var BING_MAP_READY = '_bingScriptReady';
var BING_URL_V8 = 'https://www.bing.com/api/maps/mapcontrol?callback=' + BING_MAP_READY;
var INFOBOX_V_OFFSET_V8 = 13;
var MIN_LOCATION_RECT_LENGTH = 0.0000000000000001;
var msMapsLoaded = function msMapsLoaded() {
  return window.Microsoft && window.Microsoft.Maps;
};
var msMapsLoader;
var BingProvider = DynamicProvider.inherit({
  _mapType: function _mapType(type) {
    var mapTypes = {
      roadmap: Microsoft.Maps.MapTypeId.road,
      hybrid: Microsoft.Maps.MapTypeId.aerial,
      satellite: Microsoft.Maps.MapTypeId.aerial
    };
    return mapTypes[type] || mapTypes.road;
  },
  _movementMode: function _movementMode(type) {
    var movementTypes = {
      driving: Microsoft.Maps.Directions.RouteMode.driving,
      walking: Microsoft.Maps.Directions.RouteMode.walking
    };
    return movementTypes[type] || movementTypes.driving;
  },
  _resolveLocation: function _resolveLocation(location) {
    return new Promise(function (resolve) {
      var latLng = this._getLatLng(location);
      if (latLng) {
        resolve(new Microsoft.Maps.Location(latLng.lat, latLng.lng));
      } else {
        this._geocodeLocation(location).then(function (geocodedLocation) {
          resolve(geocodedLocation);
        });
      }
    }.bind(this));
  },
  _geocodedLocations: {},
  _geocodeLocationImpl: function _geocodeLocationImpl(location) {
    return new Promise(function (resolve) {
      if (!isDefined(location)) {
        resolve(new Microsoft.Maps.Location(0, 0));
        return;
      }
      var searchManager = new Microsoft.Maps.Search.SearchManager(this._map);
      var searchRequest = {
        where: location,
        count: 1,
        callback: function callback(searchResponse) {
          var result = searchResponse.results[0];
          if (result) {
            var boundsBox = searchResponse.results[0].location;
            resolve(new Microsoft.Maps.Location(boundsBox.latitude, boundsBox.longitude));
          } else {
            resolve(new Microsoft.Maps.Location(0, 0));
          }
        }
      };
      searchManager.geocode(searchRequest);
    }.bind(this));
  },
  _normalizeLocation: function _normalizeLocation(location) {
    return {
      lat: location.latitude,
      lng: location.longitude
    };
  },
  _normalizeLocationRect: function _normalizeLocationRect(locationRect) {
    var northWest = this._normalizeLocation(locationRect.getNorthwest());
    var southEast = this._normalizeLocation(locationRect.getSoutheast());
    return {
      northEast: {
        lat: northWest.lat,
        lng: southEast.lng
      },
      southWest: {
        lat: southEast.lat,
        lng: northWest.lng
      }
    };
  },
  _loadImpl: function _loadImpl() {
    return new Promise(function (resolve) {
      if (msMapsLoaded()) {
        resolve();
      } else {
        if (!msMapsLoader) {
          msMapsLoader = this._loadMapScript();
        }
        msMapsLoader.then(function () {
          if (msMapsLoaded()) {
            resolve();
            return;
          }
          this._loadMapScript().then(resolve);
        }.bind(this));
      }
    }.bind(this)).then(function () {
      return Promise.all([new Promise(function (resolve) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', {
          callback: resolve
        });
      }), new Promise(function (resolve) {
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', {
          callback: resolve
        });
      })]);
    });
  },
  _loadMapScript: function _loadMapScript() {
    return new Promise(function (resolve) {
      window[BING_MAP_READY] = resolve;
      ajax.sendRequest({
        url: BING_URL_V8,
        dataType: 'script'
      });
    }).then(function () {
      try {
        delete window[BING_MAP_READY];
      } catch (e) {
        window[BING_MAP_READY] = undefined;
      }
    });
  },
  _init: function _init() {
    this._createMap();
    return Promise.resolve();
  },
  _createMap: function _createMap() {
    var controls = this._option('controls');
    this._map = new Microsoft.Maps.Map(this._$container[0], {
      credentials: this._keyOption('bing'),
      zoom: this._option('zoom'),
      showDashboard: controls,
      showMapTypeSelector: controls,
      showScalebar: controls
    });
  },
  _attachHandlers: function _attachHandlers() {
    this._providerViewChangeHandler = Microsoft.Maps.Events.addHandler(this._map, 'viewchange', this._viewChangeHandler.bind(this));
    this._providerClickHandler = Microsoft.Maps.Events.addHandler(this._map, 'click', this._clickActionHandler.bind(this));
  },
  _viewChangeHandler: function _viewChangeHandler() {
    var bounds = this._map.getBounds();
    this._option('bounds', this._normalizeLocationRect(bounds));
    var center = this._map.getCenter();
    this._option('center', this._normalizeLocation(center));
    if (!this._preventZoomChangeEvent) {
      this._option('zoom', this._map.getZoom());
    }
  },
  _clickActionHandler: function _clickActionHandler(e) {
    if (e.targetType === 'map') {
      this._fireClickAction({
        location: this._normalizeLocation(e.location)
      });
    }
  },
  updateDimensions: function updateDimensions() {
    var $container = this._$container;
    this._map.setOptions({
      width: getWidth($container),
      height: getHeight($container)
    });
    return Promise.resolve();
  },
  updateMapType: function updateMapType() {
    var type = this._option('type');
    var labelOverlay = Microsoft.Maps.LabelOverlay;
    this._map.setView({
      animate: false,
      mapTypeId: this._mapType(type),
      labelOverlay: type === 'satellite' ? labelOverlay.hidden : labelOverlay.visible
    });
    return Promise.resolve();
  },
  updateBounds: function updateBounds() {
    return Promise.all([this._resolveLocation(this._option('bounds.northEast')), this._resolveLocation(this._option('bounds.southWest'))]).then(function (result) {
      var bounds = new Microsoft.Maps.LocationRect.fromLocations(result[0], result[1]);
      this._map.setView({
        animate: false,
        bounds: bounds
      });
    }.bind(this));
  },
  updateCenter: function updateCenter() {
    return this._resolveLocation(this._option('center')).then(function (center) {
      this._map.setView({
        animate: false,
        center: center
      });
    }.bind(this));
  },
  updateZoom: function updateZoom() {
    this._map.setView({
      animate: false,
      zoom: this._option('zoom')
    });
    return Promise.resolve();
  },
  updateControls: function updateControls() {
    this.clean();
    return this.render.apply(this, arguments);
  },
  _renderMarker: function _renderMarker(options) {
    return this._resolveLocation(options.location).then(function (location) {
      var pushpinOptions = {
        icon: options.iconSrc || this._option('markerIconSrc')
      };
      if (options.html) {
        extend(pushpinOptions, {
          htmlContent: options.html,
          width: null,
          height: null
        });
        var htmlOffset = options.htmlOffset;
        if (htmlOffset) {
          pushpinOptions.anchor = new Microsoft.Maps.Point(-htmlOffset.left, -htmlOffset.top);
        }
      }
      var pushpin = new Microsoft.Maps.Pushpin(location, pushpinOptions);
      this._map.entities.push(pushpin);
      var infobox = this._renderTooltip(location, options.tooltip);
      var handler;
      if (options.onClick || options.tooltip) {
        var markerClickAction = this._mapWidget._createAction(options.onClick || noop);
        var markerNormalizedLocation = this._normalizeLocation(location);
        handler = Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
          markerClickAction({
            location: markerNormalizedLocation
          });
          if (infobox) {
            infobox.setOptions({
              visible: true
            });
          }
        });
      }
      return {
        location: location,
        marker: pushpin,
        infobox: infobox,
        handler: handler
      };
    }.bind(this));
  },
  _renderTooltip: function _renderTooltip(location, options) {
    if (!options) {
      return;
    }
    options = this._parseTooltipOptions(options);
    var infobox = new Microsoft.Maps.Infobox(location, {
      description: options.text,
      offset: new Microsoft.Maps.Point(0, INFOBOX_V_OFFSET_V8),
      visible: options.visible
    });
    infobox.setMap(this._map);
    return infobox;
  },
  _destroyMarker: function _destroyMarker(marker) {
    this._map.entities.remove(marker.marker);
    if (marker.infobox) {
      marker.infobox.setMap(null);
    }
    if (marker.handler) {
      Microsoft.Maps.Events.removeHandler(marker.handler);
    }
  },
  _renderRoute: function _renderRoute(options) {
    return Promise.all(map(options.locations, function (point) {
      return this._resolveLocation(point);
    }.bind(this))).then(function (locations) {
      return new Promise(function (resolve) {
        var direction = new Microsoft.Maps.Directions.DirectionsManager(this._map);
        var color = new Color(options.color || this._defaultRouteColor()).toHex();
        var routeColor = new Microsoft.Maps.Color.fromHex(color);
        routeColor.a = (options.opacity || this._defaultRouteOpacity()) * 255;
        direction.setRenderOptions({
          autoUpdateMapView: false,
          displayRouteSelector: false,
          waypointPushpinOptions: {
            visible: false
          },
          drivingPolylineOptions: {
            strokeColor: routeColor,
            strokeThickness: options.weight || this._defaultRouteWeight()
          },
          walkingPolylineOptions: {
            strokeColor: routeColor,
            strokeThickness: options.weight || this._defaultRouteWeight()
          }
        });
        direction.setRequestOptions({
          routeMode: this._movementMode(options.mode),
          routeDraggable: false
        });
        each(locations, function (_, location) {
          var waypoint = new Microsoft.Maps.Directions.Waypoint({
            location: location
          });
          direction.addWaypoint(waypoint);
        });
        var directionHandlers = [];
        directionHandlers.push(Microsoft.Maps.Events.addHandler(direction, 'directionsUpdated', function (args) {
          while (directionHandlers.length) {
            Microsoft.Maps.Events.removeHandler(directionHandlers.pop());
          }
          var routeSummary = args.routeSummary[0];
          resolve({
            instance: direction,
            northEast: routeSummary.northEast,
            southWest: routeSummary.southWest
          });
        }));
        directionHandlers.push(Microsoft.Maps.Events.addHandler(direction, 'directionsError', function (args) {
          while (directionHandlers.length) {
            Microsoft.Maps.Events.removeHandler(directionHandlers.pop());
          }
          var status = 'RouteResponseCode: ' + args.responseCode + ' - ' + args.message;
          errors.log('W1006', status);
          resolve({
            instance: direction
          });
        }));
        direction.calculateDirections();
      }.bind(this));
    }.bind(this));
  },
  _destroyRoute: function _destroyRoute(routeObject) {
    routeObject.instance.dispose();
  },
  _fitBounds: function _fitBounds() {
    this._updateBounds();
    if (this._bounds && this._option('autoAdjust')) {
      var zoomBeforeFitting = this._map.getZoom();
      this._preventZoomChangeEvent = true;
      var bounds = this._bounds.clone();
      bounds.height = bounds.height * 1.1;
      bounds.width = bounds.width * 1.1;
      this._map.setView({
        animate: false,
        bounds: bounds,
        zoom: zoomBeforeFitting
      });
      var zoomAfterFitting = this._map.getZoom();
      if (zoomBeforeFitting < zoomAfterFitting) {
        this._map.setView({
          animate: false,
          zoom: zoomBeforeFitting
        });
      } else {
        this._option('zoom', zoomAfterFitting);
      }
      delete this._preventZoomChangeEvent;
    }
    return Promise.resolve();
  },
  _extendBounds: function _extendBounds(location) {
    if (this._bounds) {
      this._bounds = new Microsoft.Maps.LocationRect.fromLocations(this._bounds.getNorthwest(), this._bounds.getSoutheast(), location);
    } else {
      this._bounds = new Microsoft.Maps.LocationRect(location, MIN_LOCATION_RECT_LENGTH, MIN_LOCATION_RECT_LENGTH);
    }
  },
  clean: function clean() {
    if (this._map) {
      Microsoft.Maps.Events.removeHandler(this._providerViewChangeHandler);
      Microsoft.Maps.Events.removeHandler(this._providerClickHandler);
      this._clearMarkers();
      this._clearRoutes();
      this._map.dispose();
    }
    return Promise.resolve();
  }
});
export default BingProvider;
