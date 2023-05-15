!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/map.js"], ["../core/renderer","../events/core/events_engine","../core/utils/deferred","../core/component_registrator","./widget/ui.errors","../core/devices","./widget/ui.widget","../core/utils/inflector","../core/utils/iterator","../core/utils/extend","../core/utils/array","../core/utils/type","../events/utils/index","../events/pointer","./map/provider.google_static","./map/provider.dynamic.google","./map/provider.dynamic.bing"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/map.js", ["../core/renderer", "../events/core/events_engine", "../core/utils/deferred", "../core/component_registrator", "./widget/ui.errors", "../core/devices", "./widget/ui.widget", "../core/utils/inflector", "../core/utils/iterator", "../core/utils/extend", "../core/utils/array", "../core/utils/type", "../events/utils/index", "../events/pointer", "./map/provider.google_static", "./map/provider.dynamic.google", "./map/provider.dynamic.bing"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _deferred = $__require("../core/utils/deferred");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("./widget/ui.errors"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _ui2 = _interopRequireDefault($__require("./widget/ui.widget"));
  var _inflector = $__require("../core/utils/inflector");
  var _iterator = $__require("../core/utils/iterator");
  var _extend = $__require("../core/utils/extend");
  var _array = $__require("../core/utils/array");
  var _type = $__require("../core/utils/type");
  var _index = $__require("../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _provider = _interopRequireDefault($__require("./map/provider.google_static"));
  var _providerDynamic = _interopRequireDefault($__require("./map/provider.dynamic.google"));
  var _providerDynamic2 = _interopRequireDefault($__require("./map/provider.dynamic.bing"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // NOTE external urls must have protocol explicitly specified (because inside Cordova package the protocol is "file:")

  var PROVIDERS = {
    googleStatic: _provider.default,
    google: _providerDynamic.default,
    bing: _providerDynamic2.default
  };

  // STYLE map

  var MAP_CLASS = 'dx-map';
  var MAP_CONTAINER_CLASS = 'dx-map-container';
  var MAP_SHIELD_CLASS = 'dx-map-shield';
  var Map = _ui2.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
        * @name dxMapOptions.bounds
        * @type object
        * @hidden
        */
        bounds: {
          /**
          * @name dxMapOptions.bounds.northEast
          * @type object|string|Array<object>
          * @default null
          * @hidden
          */

          /**
          * @name dxMapOptions.bounds.northEast.lat
          * @type number
          * @hidden
          */

          /**
          * @name dxMapOptions.bounds.northEast.lng
          * @type number
          * @hidden
          */
          northEast: null,
          /**
          * @name dxMapOptions.bounds.southWest
          * @type object|string|Array<object>
          * @default null
          * @hidden
          */

          /**
          * @name dxMapOptions.bounds.southWest.lat
          * @type number
          * @hidden
          */

          /**
          * @name dxMapOptions.bounds.southWest.lng
          * @type number
          * @hidden
          */
          southWest: null
        },
        /**
        * @name MapLocation
        * @hidden
        */
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1,
        width: 300,
        height: 300,
        type: 'roadmap',
        provider: 'google',
        autoAdjust: true,
        markers: [],
        markerIconSrc: null,
        onMarkerAdded: null,
        onMarkerRemoved: null,
        routes: [],
        onRouteAdded: null,
        onRouteRemoved: null,
        apiKey: {
          bing: '',
          google: '',
          googleStatic: ''
        },
        controls: false,
        onReady: null,
        /**
        * @name dxMapOptions.onContentReady
        * @hidden true
        * @action
        */

        // for internal use only
        onUpdated: null,
        onClick: null
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this.$element().addClass(MAP_CLASS);
      this._lastAsyncAction = Promise.resolve();
      this._checkOption('provider');
      this._checkOption('markers');
      this._checkOption('routes');
      this._initContainer();
      this._grabEvents();
      this._rendered = {};
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _checkOption: function _checkOption(option) {
      var value = this.option(option);
      if (option === 'markers' && !Array.isArray(value)) {
        throw _ui.default.Error('E1022');
      }
      if (option === 'routes' && !Array.isArray(value)) {
        throw _ui.default.Error('E1023');
      }
    },
    _initContainer: function _initContainer() {
      this._$container = (0, _renderer.default)('<div>').addClass(MAP_CONTAINER_CLASS);
      this.$element().append(this._$container);
    },
    _grabEvents: function _grabEvents() {
      var eventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
      _events_engine.default.on(this.$element(), eventName, this._cancelEvent.bind(this));
    },
    _cancelEvent: function _cancelEvent(e) {
      var cancelByProvider = this._provider && this._provider.isEventsCanceled(e) && !this.option('disabled');
      if (cancelByProvider) {
        e.stopPropagation();
      }
    },
    _saveRendered: function _saveRendered(option) {
      var value = this.option(option);
      this._rendered[option] = value.slice();
    },
    _render: function _render() {
      this.callBase();
      this._renderShield();
      this._saveRendered('markers');
      this._saveRendered('routes');
      this._provider = new PROVIDERS[this.option('provider')](this, this._$container);
      this._queueAsyncAction('render', this._rendered.markers, this._rendered.routes);
    },
    _renderShield: function _renderShield() {
      var $shield;
      if (this.option('disabled')) {
        $shield = (0, _renderer.default)('<div>').addClass(MAP_SHIELD_CLASS);
        this.$element().append($shield);
      } else {
        $shield = this.$element().find('.' + MAP_SHIELD_CLASS);
        $shield.remove();
      }
    },
    _clean: function _clean() {
      this._cleanFocusState();
      if (this._provider) {
        this._provider.clean();
      }
      this._provider = null;
      this._lastAsyncAction = Promise.resolve();
      this.setOptionSilent('bounds', {
        northEast: null,
        southWest: null
      });
      delete this._suppressAsyncAction;
    },
    _optionChanged: function _optionChanged(args) {
      var name = args.name;
      var changeBag = this._optionChangeBag;
      this._optionChangeBag = null;
      switch (name) {
        case 'disabled':
          this._renderShield();
          this.callBase(args);
          break;
        case 'width':
        case 'height':
          this.callBase(args);
          this._dimensionChanged();
          break;
        case 'provider':
          this._suppressAsyncAction = true;
          this._invalidate();
          break;
        case 'apiKey':
          _ui.default.log('W1001');
          break;
        case 'bounds':
          this._queueAsyncAction('updateBounds');
          break;
        case 'center':
          this._queueAsyncAction('updateCenter');
          break;
        case 'zoom':
          this._queueAsyncAction('updateZoom');
          break;
        case 'type':
          this._queueAsyncAction('updateMapType');
          break;
        case 'controls':
          this._queueAsyncAction('updateControls', this._rendered.markers, this._rendered.routes);
          break;
        case 'autoAdjust':
          this._queueAsyncAction('adjustViewport');
          break;
        case 'markers':
        case 'routes':
          {
            this._checkOption(name);
            var prevValue = this._rendered[name];
            this._saveRendered(name);
            this._queueAsyncAction('update' + (0, _inflector.titleize)(name), changeBag ? changeBag.removed : prevValue, changeBag ? changeBag.added : this._rendered[name]).then(function (result) {
              if (changeBag) {
                changeBag.resolve(result);
              }
            });
            break;
          }
        case 'markerIconSrc':
          this._queueAsyncAction('updateMarkers', this._rendered.markers, this._rendered.markers);
          break;
        case 'onReady':
        case 'onUpdated':
        case 'onMarkerAdded':
        case 'onMarkerRemoved':
        case 'onRouteAdded':
        case 'onRouteRemoved':
        case 'onClick':
          break;
        default:
          this.callBase.apply(this, arguments);
      }
    },
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._dimensionChanged();
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      this._queueAsyncAction('updateDimensions');
    },
    _queueAsyncAction: function _queueAsyncAction(name) {
      var options = [].slice.call(arguments).slice(1);
      var isActionSuppressed = this._suppressAsyncAction;
      this._lastAsyncAction = this._lastAsyncAction.then(function () {
        if (!this._provider || isActionSuppressed) {
          ///#DEBUG
          this._asyncActionSuppressed = true;
          ///#ENDDEBUG
          return Promise.resolve();
        }
        return this._provider[name].apply(this._provider, options).then(function (result) {
          result = (0, _array.wrapToArray)(result);
          var mapRefreshed = result[0];
          if (mapRefreshed && !this._disposed) {
            this._triggerReadyAction();
          }
          ///#DEBUG
          if (!mapRefreshed && name !== 'clean' && !this._disposed) {
            this._triggerUpdateAction();
          }
          ///#ENDDEBUG

          return result[1];
        }.bind(this));
      }.bind(this));
      return this._lastAsyncAction;
    },
    _triggerReadyAction: function _triggerReadyAction() {
      this._createActionByOption('onReady')({
        originalMap: this._provider.map()
      });
    },
    _triggerUpdateAction: function _triggerUpdateAction() {
      this._createActionByOption('onUpdated')();
    },
    setOptionSilent: function setOptionSilent(name, value) {
      this._setOptionWithoutOptionChange(name, value);
    },
    addMarker: function addMarker(marker) {
      return this._addFunction('markers', marker);
    },
    removeMarker: function removeMarker(marker) {
      return this._removeFunction('markers', marker);
    },
    addRoute: function addRoute(route) {
      return this._addFunction('routes', route);
    },
    removeRoute: function removeRoute(route) {
      return this._removeFunction('routes', route);
    },
    _addFunction: function _addFunction(optionName, addingValue) {
      var optionValue = this.option(optionName);
      var addingValues = (0, _array.wrapToArray)(addingValue);
      optionValue.push.apply(optionValue, addingValues);
      return this._partialArrayOptionChange(optionName, optionValue, addingValues, []);
    },
    _removeFunction: function _removeFunction(optionName, removingValue) {
      var optionValue = this.option(optionName);
      var removingValues = (0, _array.wrapToArray)(removingValue);
      (0, _iterator.each)(removingValues, function (removingIndex, removingValue) {
        var index = (0, _type.isNumeric)(removingValue) ? removingValue : optionValue === null || optionValue === void 0 ? void 0 : optionValue.indexOf(removingValue);
        if (index !== -1) {
          var removing = optionValue.splice(index, 1)[0];
          removingValues.splice(removingIndex, 1, removing);
        } else {
          throw _ui.default.log('E1021', (0, _inflector.titleize)(optionName.substring(0, optionName.length - 1)), removingValue);
        }
      });
      return this._partialArrayOptionChange(optionName, optionValue, [], removingValues);
    },
    _partialArrayOptionChange: function _partialArrayOptionChange(optionName, optionValue, addingValues, removingValues) {
      return (0, _deferred.fromPromise)(new Promise(function (resolve) {
        this._optionChangeBag = {
          resolve: resolve,
          added: addingValues,
          removed: removingValues
        };
        this.option(optionName, optionValue);
      }.bind(this)).then(function (result) {
        return result && result.length === 1 ? result[0] : result;
      }), this);
    }
  });
  (0, _component_registrator.default)('dxMap', Map);
  var _default = Map;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../events/core/events_engine","../core/utils/deferred","../core/component_registrator","./widget/ui.errors","../core/devices","./widget/ui.widget","../core/utils/inflector","../core/utils/iterator","../core/utils/extend","../core/utils/array","../core/utils/type","../events/utils/index","../events/pointer","./map/provider.google_static","./map/provider.dynamic.google","./map/provider.dynamic.bing"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../events/core/events_engine"), require("../core/utils/deferred"), require("../core/component_registrator"), require("./widget/ui.errors"), require("../core/devices"), require("./widget/ui.widget"), require("../core/utils/inflector"), require("../core/utils/iterator"), require("../core/utils/extend"), require("../core/utils/array"), require("../core/utils/type"), require("../events/utils/index"), require("../events/pointer"), require("./map/provider.google_static"), require("./map/provider.dynamic.google"), require("./map/provider.dynamic.bing"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=map.js.map