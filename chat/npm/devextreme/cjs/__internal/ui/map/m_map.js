/**
* DevExtreme (cjs/__internal/ui/map/m_map.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../common/core/events/pointer"));
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _array = require("../../../core/utils/array");
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _inflector = require("../../../core/utils/inflector");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _m_providerDynamic = _interopRequireDefault(require("./m_provider.dynamic.azure"));
var _m_providerDynamic2 = _interopRequireDefault(require("./m_provider.dynamic.bing"));
var _m_providerDynamic3 = _interopRequireDefault(require("./m_provider.dynamic.google"));
var _m_provider = _interopRequireDefault(require("./m_provider.google_static"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // @ts-expect-error
// NOTE external urls must have protocol explicitly specified (because inside Cordova package the protocol is "file:")
const PROVIDERS = {
  azure: _m_providerDynamic.default,
  googleStatic: _m_provider.default,
  google: _m_providerDynamic3.default,
  bing: _m_providerDynamic2.default
};
const MAP_CLASS = 'dx-map';
const MAP_CONTAINER_CLASS = 'dx-map-container';
const MAP_SHIELD_CLASS = 'dx-map-shield';
class Map extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      bounds: {
        northEast: null,
        southWest: null
      },
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
      // @ts-expect-error ts-error
      markerIconSrc: null,
      // @ts-expect-error ts-error
      onMarkerAdded: null,
      // @ts-expect-error ts-error
      onMarkerRemoved: null,
      routes: [],
      // @ts-expect-error ts-error
      onRouteAdded: null,
      // @ts-expect-error ts-error
      onRouteRemoved: null,
      apiKey: {
        bing: '',
        google: '',
        googleStatic: ''
      },
      providerConfig: {
        mapId: '',
        useAdvancedMarkers: true
      },
      controls: false,
      // @ts-expect-error ts-error
      onReady: null,
      // for internal use only
      // @ts-expect-error ts-error
      onUpdated: null,
      // @ts-expect-error ts-error
      onClick: null
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  ctor(element, options) {
    super.ctor(element, options);
    if (options) {
      if ('provider' in options && options.provider === 'bing') {
        this._logDeprecatedBingProvider();
      }
    }
  }
  _logDeprecatedBingProvider() {
    this._logDeprecatedOptionWarning('provider: bing', {
      since: '24.2',
      message: 'Use other map providers, such as Azure, Google, or GoogleStatic.'
    });
  }
  _setDeprecatedOptions() {
    super._setDeprecatedOptions();
    (0, _extend.extend)(this._deprecatedOptions, {
      'providerConfig.useAdvancedMarkers': {
        since: '24.2',
        message: 'Google deprecated the original map markers. Transition to advanced markers for future compatibility.'
      }
    });
  }
  _renderFocusTarget() {}
  _init() {
    super._init();
    this.$element().addClass(MAP_CLASS);
    this._lastAsyncAction = Promise.resolve();
    this._checkOption('provider');
    this._checkOption('markers');
    this._checkOption('routes');
    this._initContainer();
    this._grabEvents();
    this._rendered = {};
  }
  _useTemplates() {
    return false;
  }
  _checkOption(option) {
    const value = this.option(option);
    if (option === 'markers' && !Array.isArray(value)) {
      throw _ui.default.Error('E1022');
    }
    if (option === 'routes' && !Array.isArray(value)) {
      throw _ui.default.Error('E1023');
    }
  }
  _initContainer() {
    this._$container = (0, _renderer.default)('<div>').addClass(MAP_CONTAINER_CLASS);
    this.$element().append(this._$container);
  }
  _grabEvents() {
    // @ts-expect-error ts-error
    const eventName = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
    _events_engine.default.on(this.$element(), eventName, this._cancelEvent.bind(this));
  }
  _cancelEvent(e) {
    var _this$_provider;
    const cancelByProvider = ((_this$_provider = this._provider) === null || _this$_provider === void 0 ? void 0 : _this$_provider.isEventsCanceled(e)) && !this.option('disabled');
    if (cancelByProvider) {
      e.stopPropagation();
    }
  }
  _saveRendered(option) {
    const value = this.option(option);
    // @ts-expect-error ts-error
    this._rendered[option] = value.slice();
  }
  _render() {
    super._render();
    this._renderShield();
    this._saveRendered('markers');
    this._saveRendered('routes');
    const {
      provider
    } = this.option();
    // @ts-expect-error ts-error
    this._provider = new PROVIDERS[provider](this, this._$container);
    this._queueAsyncAction('render', this._rendered.markers, this._rendered.routes);
  }
  _renderShield() {
    let $shield;
    if (this.option('disabled')) {
      $shield = (0, _renderer.default)('<div>').addClass(MAP_SHIELD_CLASS);
      this.$element().append($shield);
    } else {
      $shield = this.$element().find(`.${MAP_SHIELD_CLASS}`);
      $shield.remove();
    }
  }
  _clean() {
    this._cleanFocusState();
    if (this._provider) {
      this._provider.clean();
    }
    // @ts-expect-error ts-error
    this._provider = null;
    this._lastAsyncAction = Promise.resolve();
    this.setOptionSilent('bounds', {
      northEast: null,
      southWest: null
    });
    delete this._suppressAsyncAction;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    const changeBag = this._optionChangeBag;
    this._optionChangeBag = null;
    switch (name) {
      case 'disabled':
        this._renderShield();
        super._optionChanged(args);
        this._queueAsyncAction('updateDisabled');
        break;
      case 'width':
      case 'height':
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case 'provider':
        this._suppressAsyncAction = true;
        this._invalidate();
        if (value === 'bing') {
          this._logDeprecatedBingProvider();
        }
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
          const prevValue = this._rendered[name];
          this._saveRendered(name);
          this._queueAsyncAction(`update${(0, _inflector.titleize)(name)}`, changeBag ? changeBag.removed : prevValue, changeBag ? changeBag.added : this._rendered[name]).then(result => {
            if (changeBag) {
              // @ts-expect-error ts-error
              changeBag.resolve(result);
            }
          });
          break;
        }
      case 'markerIconSrc':
        this._queueAsyncAction('updateMarkers', this._rendered.markers, this._rendered.markers);
        break;
      case 'providerConfig':
        this._suppressAsyncAction = true;
        this._invalidate();
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
        // @ts-expect-error ts-error
        super._optionChanged.apply(this, arguments);
    }
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  }
  _dimensionChanged() {
    this._queueAsyncAction('updateDimensions');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _queueAsyncAction(name, markers, routers) {
    const options = [].slice.call(arguments).slice(1);
    const isActionSuppressed = this._suppressAsyncAction;
    this._lastAsyncAction = this._lastAsyncAction.then(() => {
      if (!this._provider || isActionSuppressed) {
        return Promise.resolve();
      }
      return this._provider[name].apply(this._provider, options).then(result => {
        result = (0, _array.wrapToArray)(result);
        const mapRefreshed = result[0];
        if (mapRefreshed && !this._disposed) {
          this._triggerReadyAction();
        }
        return result[1];
      });
    });
    return this._lastAsyncAction;
  }
  _triggerReadyAction() {
    this._createActionByOption('onReady')({
      originalMap: this._provider.map()
    });
  }
  _triggerUpdateAction() {
    this._createActionByOption('onUpdated')();
  }
  setOptionSilent(name, value) {
    this._setOptionWithoutOptionChange(name, value);
  }
  addMarker(marker) {
    return this._addFunction('markers', marker);
  }
  removeMarker(marker) {
    return this._removeFunction('markers', marker);
  }
  addRoute(route) {
    return this._addFunction('routes', route);
  }
  removeRoute(route) {
    return this._removeFunction('routes', route);
  }
  _addFunction(optionName, addingValue) {
    const optionValue = this.option(optionName);
    const addingValues = (0, _array.wrapToArray)(addingValue);
    // @ts-expect-error ts-error
    optionValue.push.apply(optionValue, addingValues);
    return this._partialArrayOptionChange(optionName, optionValue, addingValues, []);
  }
  _removeFunction(optionName, removingValue) {
    const optionValue = this.option(optionName);
    const removingValues = (0, _array.wrapToArray)(removingValue);
    (0, _iterator.each)(removingValues, (removingIndex, removingValue) => {
      const index = (0, _type.isNumeric)(removingValue) ? removingValue
      // @ts-expect-error ts-error
      : optionValue === null || optionValue === void 0 ? void 0 : optionValue.indexOf(removingValue);
      if (index !== -1) {
        // @ts-expect-error ts-error
        const removing = optionValue.splice(index, 1)[0];
        removingValues.splice(removingIndex, 1, removing);
      } else {
        throw _ui.default.log('E1021', (0, _inflector.titleize)(optionName.substring(0, optionName.length - 1)), removingValue);
      }
    });
    return this._partialArrayOptionChange(optionName, optionValue, [], removingValues);
  }
  _partialArrayOptionChange(optionName, optionValue, addingValues, removingValues) {
    return (0, _deferred.fromPromise)(new Promise(resolve => {
      this._optionChangeBag = {
        resolve,
        added: addingValues,
        removed: removingValues
      };
      this.option(optionName, optionValue);
      // @ts-expect-error
    }).then(result => result && result.length === 1 ? result[0] : result), this);
  }
}
(0, _component_registrator.default)('dxMap', Map);
var _default = exports.default = Map;
