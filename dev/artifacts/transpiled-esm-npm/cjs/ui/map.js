"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _deferred = require("../core/utils/deferred");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _ui2 = _interopRequireDefault(require("./widget/ui.widget"));
var _inflector = require("../core/utils/inflector");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _array = require("../core/utils/array");
var _type = require("../core/utils/type");
var _index = require("../events/utils/index");
var _pointer = _interopRequireDefault(require("../events/pointer"));
var _common = require("../core/utils/common");
var _provider = _interopRequireDefault(require("./map/provider.google_static"));
var _providerDynamic = _interopRequireDefault(require("./map/provider.dynamic.google"));
var _providerDynamic2 = _interopRequireDefault(require("./map/provider.dynamic.bing"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  _renderFocusTarget: _common.noop,
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
        return Promise.resolve();
      }
      return this._provider[name].apply(this._provider, options).then(function (result) {
        result = (0, _array.wrapToArray)(result);
        var mapRefreshed = result[0];
        if (mapRefreshed && !this._disposed) {
          this._triggerReadyAction();
        }
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