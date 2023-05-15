!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/map/provider.dynamic.js"], ["../../core/utils/extend","../../core/utils/iterator","./provider"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/map/provider.dynamic.js", ["../../core/utils/extend", "../../core/utils/iterator", "./provider"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _provider = _interopRequireDefault($__require("./provider"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var abstract = _provider.default.abstract;
  var DynamicProvider = _provider.default.inherit({
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
      return Promise.all((0, _iterator.map)(options, function (options) {
        return this._addMarker(options);
      }.bind(this))).then(function (markerObjects) {
        this._fitBounds();
        return [false, (0, _iterator.map)(markerObjects, function (markerObject) {
          return markerObject.marker;
        })];
      }.bind(this));
    },
    _addMarker: function _addMarker(options) {
      return this._renderMarker(options).then(function (markerObject) {
        this._markers.push((0, _extend.extend)({
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
      (0, _iterator.each)(markersOptionsToRemove, function (_, markerOptionToRemove) {
        that._removeMarker(markerOptionToRemove);
      });
      return Promise.resolve();
    },
    _removeMarker: function _removeMarker(markersOptionToRemove) {
      var that = this;
      (0, _iterator.each)(this._markers, function (markerIndex, markerObject) {
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
      return Promise.all((0, _iterator.map)(options, function (options) {
        return this._addRoute(options);
      }.bind(this))).then(function (routeObjects) {
        this._fitBounds();
        return [false, (0, _iterator.map)(routeObjects, function (routeObject) {
          return routeObject.instance;
        })];
      }.bind(this));
    },
    _addRoute: function _addRoute(options) {
      return this._renderRoute(options).then(function (routeObject) {
        this._routes.push((0, _extend.extend)({
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
      (0, _iterator.each)(options, function (routeIndex, options) {
        that._removeRoute(options);
      });
      return Promise.resolve();
    },
    _removeRoute: function _removeRoute(options) {
      var that = this;
      (0, _iterator.each)(this._routes, function (routeIndex, routeObject) {
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
      (0, _iterator.each)(this._markers, function (_, markerObject) {
        that._extendBounds(markerObject.location);
      });
      (0, _iterator.each)(this._routes, function (_, routeObject) {
        routeObject.northEast && that._extendBounds(routeObject.northEast);
        routeObject.southWest && that._extendBounds(routeObject.southWest);
      });
    },
    _clearBounds: function _clearBounds() {
      this._bounds = null;
    },
    _extendBounds: abstract
  });
  var _default = DynamicProvider;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/iterator","./provider"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/iterator"), require("./provider"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=provider.dynamic.js.map