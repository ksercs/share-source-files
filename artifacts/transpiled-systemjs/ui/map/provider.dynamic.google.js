!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/map/provider.dynamic.google.js"], ["../../core/renderer","../../core/utils/window","../../core/utils/common","../../core/devices","../../core/utils/extend","../../core/utils/iterator","./provider.dynamic","../widget/ui.errors","../../color","../../core/utils/ajax","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/map/provider.dynamic.google.js", ["../../core/renderer", "../../core/utils/window", "../../core/utils/common", "../../core/devices", "../../core/utils/extend", "../../core/utils/iterator", "./provider.dynamic", "../widget/ui.errors", "../../color", "../../core/utils/ajax", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _common = $__require("../../core/utils/common");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _provider = _interopRequireDefault($__require("./provider.dynamic"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _color = _interopRequireDefault($__require("../../color"));
  var _ajax = _interopRequireDefault($__require("../../core/utils/ajax"));
  var _type = $__require("../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /* global google */

  var window = (0, _window.getWindow)();
  var GOOGLE_MAP_READY = '_googleScriptReady';
  var GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?callback=' + GOOGLE_MAP_READY;
  var INFO_WINDOW_CLASS = 'gm-style-iw';
  var CustomMarker;
  var initCustomMarkerClass = function initCustomMarkerClass() {
    CustomMarker = function CustomMarker(options) {
      this._position = options.position;
      this._offset = options.offset;
      this._$overlayContainer = (0, _renderer.default)('<div>').css({
        position: 'absolute',
        display: 'none',
        cursor: 'pointer'
      }).append(options.html);
      this.setMap(options.map);
    };
    CustomMarker.prototype = new google.maps.OverlayView();
    CustomMarker.prototype.onAdd = function () {
      var $pane = (0, _renderer.default)(this.getPanes().overlayMouseTarget);
      $pane.append(this._$overlayContainer);
      this._clickListener = google.maps.event.addDomListener(this._$overlayContainer.get(0), 'click', function (e) {
        google.maps.event.trigger(this, 'click');
        e.preventDefault();
      }.bind(this));
      this.draw();
    };
    CustomMarker.prototype.onRemove = function () {
      google.maps.event.removeListener(this._clickListener);
      this._$overlayContainer.remove();
    };
    CustomMarker.prototype.draw = function () {
      var position = this.getProjection().fromLatLngToDivPixel(this._position);
      this._$overlayContainer.css({
        left: position.x + this._offset.left,
        top: position.y + this._offset.top,
        display: 'block'
      });
    };
  };
  var googleMapsLoaded = function googleMapsLoaded() {
    return window.google && window.google.maps;
  };
  var googleMapsLoader;
  var GoogleProvider = _provider.default.inherit({
    _mapType: function _mapType(type) {
      var mapTypes = {
        hybrid: google.maps.MapTypeId.HYBRID,
        roadmap: google.maps.MapTypeId.ROADMAP,
        satellite: google.maps.MapTypeId.SATELLITE
      };
      return mapTypes[type] || mapTypes.hybrid;
    },
    _movementMode: function _movementMode(type) {
      var movementTypes = {
        driving: google.maps.TravelMode.DRIVING,
        walking: google.maps.TravelMode.WALKING
      };
      return movementTypes[type] || movementTypes.driving;
    },
    _resolveLocation: function _resolveLocation(location) {
      return new Promise(function (resolve) {
        var latLng = this._getLatLng(location);
        if (latLng) {
          resolve(new google.maps.LatLng(latLng.lat, latLng.lng));
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
          resolve(new google.maps.LatLng(0, 0));
          return;
        }
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': location
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results[0].geometry.location);
          } else {
            _ui.default.log('W1006', status);
            resolve(new google.maps.LatLng(0, 0));
          }
        });
      });
    },
    _normalizeLocation: function _normalizeLocation(location) {
      return {
        lat: location.lat(),
        lng: location.lng()
      };
    },
    _normalizeLocationRect: function _normalizeLocationRect(locationRect) {
      return {
        northEast: this._normalizeLocation(locationRect.getNorthEast()),
        southWest: this._normalizeLocation(locationRect.getSouthWest())
      };
    },
    _loadImpl: function _loadImpl() {
      return new Promise(function (resolve) {
        if (googleMapsLoaded()) {
          resolve();
        } else {
          if (!googleMapsLoader) {
            googleMapsLoader = this._loadMapScript();
          }
          googleMapsLoader.then(function () {
            if (googleMapsLoaded()) {
              resolve();
              return;
            }
            this._loadMapScript().then(resolve);
          }.bind(this));
        }
      }.bind(this)).then(function () {
        initCustomMarkerClass();
      });
    },
    _loadMapScript: function _loadMapScript() {
      return new Promise(function (resolve) {
        var key = this._keyOption('google');
        window[GOOGLE_MAP_READY] = resolve;
        _ajax.default.sendRequest({
          url: GOOGLE_URL + (key ? '&key=' + key : ''),
          dataType: 'script'
        });
      }.bind(this)).then(function () {
        try {
          delete window[GOOGLE_MAP_READY];
        } catch (e) {
          window[GOOGLE_MAP_READY] = undefined;
        }
      });
    },
    _init: function _init() {
      return new Promise(function (resolve) {
        this._resolveLocation(this._option('center')).then(function (center) {
          var showDefaultUI = this._option('controls');
          this._map = new google.maps.Map(this._$container[0], {
            zoom: this._option('zoom'),
            center: center,
            disableDefaultUI: !showDefaultUI
          });
          var listener = google.maps.event.addListener(this._map, 'idle', function () {
            resolve(listener);
          });
        }.bind(this));
      }.bind(this)).then(function (listener) {
        google.maps.event.removeListener(listener);
      });
    },
    _attachHandlers: function _attachHandlers() {
      this._boundsChangeListener = google.maps.event.addListener(this._map, 'bounds_changed', this._boundsChangeHandler.bind(this));
      this._clickListener = google.maps.event.addListener(this._map, 'click', this._clickActionHandler.bind(this));
    },
    _boundsChangeHandler: function _boundsChangeHandler() {
      var bounds = this._map.getBounds();
      this._option('bounds', this._normalizeLocationRect(bounds));
      var center = this._map.getCenter();
      this._option('center', this._normalizeLocation(center));
      if (!this._preventZoomChangeEvent) {
        this._option('zoom', this._map.getZoom());
      }
    },
    _clickActionHandler: function _clickActionHandler(e) {
      this._fireClickAction({
        location: this._normalizeLocation(e.latLng)
      });
    },
    updateDimensions: function updateDimensions() {
      var center = this._option('center');
      google.maps.event.trigger(this._map, 'resize');
      this._option('center', center);
      return this.updateCenter();
    },
    updateMapType: function updateMapType() {
      this._map.setMapTypeId(this._mapType(this._option('type')));
      return Promise.resolve();
    },
    updateBounds: function updateBounds() {
      return Promise.all([this._resolveLocation(this._option('bounds.northEast')), this._resolveLocation(this._option('bounds.southWest'))]).then(function (result) {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(result[0]);
        bounds.extend(result[1]);
        this._map.fitBounds(bounds);
      }.bind(this));
    },
    updateCenter: function updateCenter() {
      return this._resolveLocation(this._option('center')).then(function (center) {
        this._map.setCenter(center);
        this._option('center', this._normalizeLocation(center));
      }.bind(this));
    },
    updateZoom: function updateZoom() {
      this._map.setZoom(this._option('zoom'));
      return Promise.resolve();
    },
    updateControls: function updateControls() {
      var showDefaultUI = this._option('controls');
      this._map.setOptions({
        disableDefaultUI: !showDefaultUI
      });
      return Promise.resolve();
    },
    isEventsCanceled: function isEventsCanceled(e) {
      var gestureHandling = this._map && this._map.get('gestureHandling');
      var isInfoWindowContent = (0, _renderer.default)(e.target).closest(".".concat(INFO_WINDOW_CLASS)).length > 0;
      if (isInfoWindowContent || _devices.default.real().deviceType !== 'desktop' && gestureHandling === 'cooperative') {
        return false;
      }
      return this.callBase();
    },
    _renderMarker: function _renderMarker(options) {
      return this._resolveLocation(options.location).then(function (location) {
        var marker;
        if (options.html) {
          marker = new CustomMarker({
            map: this._map,
            position: location,
            html: options.html,
            offset: (0, _extend.extend)({
              top: 0,
              left: 0
            }, options.htmlOffset)
          });
        } else {
          marker = new google.maps.Marker({
            position: location,
            map: this._map,
            icon: options.iconSrc || this._option('markerIconSrc')
          });
        }
        var infoWindow = this._renderTooltip(marker, options.tooltip);
        var listener;
        if (options.onClick || options.tooltip) {
          var markerClickAction = this._mapWidget._createAction(options.onClick || _common.noop);
          var markerNormalizedLocation = this._normalizeLocation(location);
          listener = google.maps.event.addListener(marker, 'click', function () {
            markerClickAction({
              location: markerNormalizedLocation
            });
            if (infoWindow) {
              infoWindow.open(this._map, marker);
            }
          }.bind(this));
        }
        return {
          location: location,
          marker: marker,
          listener: listener
        };
      }.bind(this));
    },
    _renderTooltip: function _renderTooltip(marker, options) {
      if (!options) {
        return;
      }
      options = this._parseTooltipOptions(options);
      var infoWindow = new google.maps.InfoWindow({
        content: options.text
      });
      if (options.visible) {
        infoWindow.open(this._map, marker);
      }
      return infoWindow;
    },
    _destroyMarker: function _destroyMarker(marker) {
      marker.marker.setMap(null);
      if (marker.listener) {
        google.maps.event.removeListener(marker.listener);
      }
    },
    _renderRoute: function _renderRoute(options) {
      return Promise.all((0, _iterator.map)(options.locations, function (point) {
        return this._resolveLocation(point);
      }.bind(this))).then(function (locations) {
        return new Promise(function (resolve) {
          var origin = locations.shift();
          var destination = locations.pop();
          var waypoints = (0, _iterator.map)(locations, function (location) {
            return {
              location: location,
              stopover: true
            };
          });
          var request = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: this._movementMode(options.mode)
          };
          new google.maps.DirectionsService().route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              var color = new _color.default(options.color || this._defaultRouteColor()).toHex();
              var directionOptions = {
                directions: response,
                map: this._map,
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeWeight: options.weight || this._defaultRouteWeight(),
                  strokeOpacity: options.opacity || this._defaultRouteOpacity(),
                  strokeColor: color
                }
              };
              var route = new google.maps.DirectionsRenderer(directionOptions);
              var bounds = response.routes[0].bounds;
              resolve({
                instance: route,
                northEast: bounds.getNorthEast(),
                southWest: bounds.getSouthWest()
              });
            } else {
              _ui.default.log('W1006', status);
              resolve({
                instance: new google.maps.DirectionsRenderer({})
              });
            }
          }.bind(this));
        }.bind(this));
      }.bind(this));
    },
    _destroyRoute: function _destroyRoute(routeObject) {
      routeObject.instance.setMap(null);
    },
    _fitBounds: function _fitBounds() {
      this._updateBounds();
      if (this._bounds && this._option('autoAdjust')) {
        var zoomBeforeFitting = this._map.getZoom();
        this._preventZoomChangeEvent = true;
        this._map.fitBounds(this._bounds);
        this._boundsChangeHandler();
        var zoomAfterFitting = this._map.getZoom();
        if (zoomBeforeFitting < zoomAfterFitting) {
          this._map.setZoom(zoomBeforeFitting);
        } else {
          this._option('zoom', zoomAfterFitting);
        }
        delete this._preventZoomChangeEvent;
      }
      return Promise.resolve();
    },
    _extendBounds: function _extendBounds(location) {
      if (this._bounds) {
        this._bounds.extend(location);
      } else {
        this._bounds = new google.maps.LatLngBounds();
        this._bounds.extend(location);
      }
    },
    clean: function clean() {
      if (this._map) {
        google.maps.event.removeListener(this._boundsChangeListener);
        google.maps.event.removeListener(this._clickListener);
        this._clearMarkers();
        this._clearRoutes();
        delete this._map;
        this._$container.empty();
      }
      return Promise.resolve();
    }
  });

  ///#DEBUG
  GoogleProvider.remapConstant = function (newValue) {
    GOOGLE_URL = newValue;
  };

  ///#ENDDEBUG
  var _default = GoogleProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/window","../../core/utils/common","../../core/devices","../../core/utils/extend","../../core/utils/iterator","./provider.dynamic","../widget/ui.errors","../../color","../../core/utils/ajax","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/window"), require("../../core/utils/common"), require("../../core/devices"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("./provider.dynamic"), require("../widget/ui.errors"), require("../../color"), require("../../core/utils/ajax"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=provider.dynamic.google.js.map