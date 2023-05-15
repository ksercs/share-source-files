!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/map/provider.dynamic.bing.js"], ["../../core/utils/size","../../core/utils/common","../../core/utils/window","../../core/utils/extend","../widget/ui.errors","../../core/utils/iterator","./provider.dynamic","../../color","../../core/utils/ajax","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/map/provider.dynamic.bing.js", ["../../core/utils/size", "../../core/utils/common", "../../core/utils/window", "../../core/utils/extend", "../widget/ui.errors", "../../core/utils/iterator", "./provider.dynamic", "../../color", "../../core/utils/ajax", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _common = $__require("../../core/utils/common");
  var _window = $__require("../../core/utils/window");
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _iterator = $__require("../../core/utils/iterator");
  var _provider = _interopRequireDefault($__require("./provider.dynamic"));
  var _color = _interopRequireDefault($__require("../../color"));
  var _ajax = _interopRequireDefault($__require("../../core/utils/ajax"));
  var _type = $__require("../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  /* global Microsoft */
  var BING_MAP_READY = '_bingScriptReady';
  var BING_URL_V8 = 'https://www.bing.com/api/maps/mapcontrol?callback=' + BING_MAP_READY;
  var INFOBOX_V_OFFSET_V8 = 13;
  var MIN_LOCATION_RECT_LENGTH = 0.0000000000000001;
  var msMapsLoaded = function msMapsLoaded() {
    return window.Microsoft && window.Microsoft.Maps;
  };
  var msMapsLoader;
  var BingProvider = _provider.default.inherit({
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
        if (!(0, _type.isDefined)(location)) {
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
        _ajax.default.sendRequest({
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
        width: (0, _size.getWidth)($container),
        height: (0, _size.getHeight)($container)
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
          (0, _extend.extend)(pushpinOptions, {
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
          var markerClickAction = this._mapWidget._createAction(options.onClick || _common.noop);
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
      return Promise.all((0, _iterator.map)(options.locations, function (point) {
        return this._resolveLocation(point);
      }.bind(this))).then(function (locations) {
        return new Promise(function (resolve) {
          var direction = new Microsoft.Maps.Directions.DirectionsManager(this._map);
          var color = new _color.default(options.color || this._defaultRouteColor()).toHex();
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
          (0, _iterator.each)(locations, function (_, location) {
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
            _ui.default.log('W1006', status);
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

  ///#DEBUG
  BingProvider.remapConstant = function (newValue) {
    BING_URL_V8 = newValue;
  };

  ///#ENDDEBUG
  var _default = BingProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/utils/common","../../core/utils/window","../../core/utils/extend","../widget/ui.errors","../../core/utils/iterator","./provider.dynamic","../../color","../../core/utils/ajax","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/utils/common"), require("../../core/utils/window"), require("../../core/utils/extend"), require("../widget/ui.errors"), require("../../core/utils/iterator"), require("./provider.dynamic"), require("../../color"), require("../../core/utils/ajax"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=provider.dynamic.bing.js.map