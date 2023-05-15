!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/devices.js"], ["./utils/size","../core/renderer","./utils/window","./utils/extend","./utils/type","./utils/iterator","./errors","./utils/callbacks","./utils/ready_callbacks","./utils/resize_callbacks","./events_strategy","./utils/storage","./utils/view_port","./config"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/devices.js", ["./utils/size", "../core/renderer", "./utils/window", "./utils/extend", "./utils/type", "./utils/iterator", "./errors", "./utils/callbacks", "./utils/ready_callbacks", "./utils/resize_callbacks", "./events_strategy", "./utils/storage", "./utils/view_port", "./config"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("./utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _window = $__require("./utils/window");
  var _extend = $__require("./utils/extend");
  var _type = $__require("./utils/type");
  var _iterator = $__require("./utils/iterator");
  var _errors = _interopRequireDefault($__require("./errors"));
  var _callbacks = _interopRequireDefault($__require("./utils/callbacks"));
  var _ready_callbacks = _interopRequireDefault($__require("./utils/ready_callbacks"));
  var _resize_callbacks = _interopRequireDefault($__require("./utils/resize_callbacks"));
  var _events_strategy = $__require("./events_strategy");
  var _storage = $__require("./utils/storage");
  var _view_port = $__require("./utils/view_port");
  var _config = _interopRequireDefault($__require("./config"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var navigator = (0, _window.getNavigator)();
  var window = (0, _window.getWindow)();
  var KNOWN_UA_TABLE = {
    'iPhone': 'iPhone',
    'iPhone5': 'iPhone',
    'iPhone6': 'iPhone',
    'iPhone6plus': 'iPhone',
    'iPad': 'iPad',
    'iPadMini': 'iPad Mini',
    'androidPhone': 'Android Mobile',
    'androidTablet': 'Android',
    'msSurface': 'Windows ARM Tablet PC',
    'desktop': 'desktop'
  };
  var DEFAULT_DEVICE = {
    deviceType: 'desktop',
    platform: 'generic',
    version: [],
    phone: false,
    tablet: false,
    android: false,
    ios: false,
    generic: true,
    grade: 'A',
    // TODO: For internal use (draft, do not document these options!)
    mac: false
  };
  var uaParsers = {
    generic: function generic(userAgent) {
      var isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
      var isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
      var isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
      var isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
      if (!(isPhone || isTablet || isDesktop || isMac)) {
        return;
      }
      return {
        deviceType: isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop',
        platform: 'generic',
        version: [],
        grade: 'A',
        mac: isMac
      };
    },
    ios: function ios(userAgent) {
      if (!/ip(hone|od|ad)/i.test(userAgent)) {
        return;
      }
      var isPhone = /ip(hone|od)/i.test(userAgent);
      var matches = userAgent.match(/os (\d+)_(\d+)_?(\d+)?/i);
      var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
      var isIPhone4 = window.screen.height === 960 / 2;
      var grade = isIPhone4 ? 'B' : 'A';
      return {
        deviceType: isPhone ? 'phone' : 'tablet',
        platform: 'ios',
        version: version,
        grade: grade
      };
    },
    android: function android(userAgent) {
      if (!/android|htc_|silk/i.test(userAgent)) {
        return;
      }
      var isPhone = /mobile/i.test(userAgent);
      var matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
      var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
      var worseThan4_4 = version.length > 1 && (version[0] < 4 || version[0] === 4 && version[1] < 4);
      var grade = worseThan4_4 ? 'B' : 'A';
      return {
        deviceType: isPhone ? 'phone' : 'tablet',
        platform: 'android',
        version: version,
        grade: grade
      };
    }
  };
  var Devices = /*#__PURE__*/function () {
    /**
    * @name DevicesObject.ctor
    * @publicName ctor(options)
    * @param1 options:object
    * @param1_field1 window:Window
    * @hidden
    */
    function Devices(options) {
      this._window = (options === null || options === void 0 ? void 0 : options.window) || window;
      this._realDevice = this._getDevice();
      this._currentDevice = undefined;
      this._currentOrientation = undefined;
      this._eventsStrategy = new _events_strategy.EventsStrategy(this);
      this.changed = (0, _callbacks.default)();
      if ((0, _window.hasWindow)()) {
        _ready_callbacks.default.add(this._recalculateOrientation.bind(this));
        _resize_callbacks.default.add(this._recalculateOrientation.bind(this));
      }
    }
    var _proto = Devices.prototype;
    _proto.current = function current(deviceOrName) {
      if (deviceOrName) {
        this._currentDevice = this._getDevice(deviceOrName);
        this._forced = true;
        this.changed.fire();
        return;
      }
      if (!this._currentDevice) {
        deviceOrName = undefined;
        try {
          deviceOrName = this._getDeviceOrNameFromWindowScope();
        } catch (e) {
          deviceOrName = this._getDeviceNameFromSessionStorage();
        } finally {
          if (!deviceOrName) {
            deviceOrName = this._getDeviceNameFromSessionStorage();
          }
          if (deviceOrName) {
            this._forced = true;
          }
        }
        this._currentDevice = this._getDevice(deviceOrName);
      }
      return this._currentDevice;
    };
    _proto.real = function real(forceDevice) {
      ///#DEBUG
      if ((0, _type.isPlainObject)(forceDevice)) {
        (0, _extend.extend)(this._realDevice, forceDevice);
        return;
      }
      ///#ENDDEBUG
      return (0, _extend.extend)({}, this._realDevice);
    };
    _proto.orientation = function orientation() {
      return this._currentOrientation;
    };
    _proto.isForced = function isForced() {
      return this._forced;
    };
    _proto.isRippleEmulator = function isRippleEmulator() {
      return !!this._window.tinyHippos;
    };
    _proto._getCssClasses = function _getCssClasses(device) {
      var result = [];
      var realDevice = this._realDevice;
      device = device || this.current();

      // TODO: use real device here?
      if (device.deviceType) {
        result.push("dx-device-".concat(device.deviceType));
        if (device.deviceType !== 'desktop') {
          result.push('dx-device-mobile');
        }
      }
      result.push("dx-device-".concat(realDevice.platform));
      if (realDevice.version && realDevice.version.length) {
        result.push("dx-device-".concat(realDevice.platform, "-").concat(realDevice.version[0]));
      }
      if (this.isSimulator()) {
        result.push('dx-simulator');
      }
      if ((0, _config.default)().rtlEnabled) {
        result.push('dx-rtl');
      }
      return result;
    };
    _proto.attachCssClasses = function attachCssClasses(element, device) {
      this._deviceClasses = this._getCssClasses(device).join(' ');
      (0, _renderer.default)(element).addClass(this._deviceClasses);
    };
    _proto.detachCssClasses = function detachCssClasses(element) {
      (0, _renderer.default)(element).removeClass(this._deviceClasses);
    };
    _proto.isSimulator = function isSimulator() {
      // NOTE: error may happen due to same-origin policy
      try {
        return this._isSimulator || (0, _window.hasWindow)() && this._window.top !== this._window.self && this._window.top['dx-force-device'] || this.isRippleEmulator();
      } catch (e) {
        return false;
      }
    };
    _proto.forceSimulator = function forceSimulator() {
      this._isSimulator = true;
    };
    _proto._getDevice = function _getDevice(deviceName) {
      if (deviceName === 'genericPhone') {
        deviceName = {
          deviceType: 'phone',
          platform: 'generic',
          generic: true
        };
      }
      if ((0, _type.isPlainObject)(deviceName)) {
        return this._fromConfig(deviceName);
      } else {
        var ua;
        if (deviceName) {
          ua = KNOWN_UA_TABLE[deviceName];
          if (!ua) {
            throw _errors.default.Error('E0005');
          }
        } else {
          ua = navigator.userAgent;
        }
        return this._fromUA(ua);
      }
    };
    _proto._getDeviceOrNameFromWindowScope = function _getDeviceOrNameFromWindowScope() {
      var result;
      if ((0, _window.hasWindow)() && (this._window.top['dx-force-device-object'] || this._window.top['dx-force-device'])) {
        result = this._window.top['dx-force-device-object'] || this._window.top['dx-force-device'];
      }
      return result;
    };
    _proto._getDeviceNameFromSessionStorage = function _getDeviceNameFromSessionStorage() {
      var sessionStorage = (0, _storage.sessionStorage)();
      if (!sessionStorage) {
        return;
      }
      var deviceOrName = sessionStorage.getItem('dx-force-device');
      try {
        return JSON.parse(deviceOrName);
      } catch (ex) {
        return deviceOrName;
      }
    };
    _proto._fromConfig = function _fromConfig(config) {
      var result = (0, _extend.extend)({}, DEFAULT_DEVICE, this._currentDevice, config);
      var shortcuts = {
        phone: result.deviceType === 'phone',
        tablet: result.deviceType === 'tablet',
        android: result.platform === 'android',
        ios: result.platform === 'ios',
        generic: result.platform === 'generic'
      };
      return (0, _extend.extend)(result, shortcuts);
    };
    _proto._fromUA = function _fromUA(ua) {
      var config;
      (0, _iterator.each)(uaParsers, function (platform, parser) {
        config = parser(ua);
        return !config;
      });
      if (config) {
        return this._fromConfig(config);
      }
      return DEFAULT_DEVICE;
    };
    _proto._changeOrientation = function _changeOrientation() {
      var $window = (0, _renderer.default)(this._window);
      var orientation = (0, _size.getHeight)($window) > (0, _size.getWidth)($window) ? 'portrait' : 'landscape';
      if (this._currentOrientation === orientation) {
        return;
      }
      this._currentOrientation = orientation;
      this._eventsStrategy.fireEvent('orientationChanged', [{
        orientation: orientation
      }]);
    };
    _proto._recalculateOrientation = function _recalculateOrientation() {
      var windowWidth = (0, _size.getWidth)(this._window);
      if (this._currentWidth === windowWidth) {
        return;
      }
      this._currentWidth = windowWidth;
      this._changeOrientation();
    };
    _proto.on = function on(eventName, eventHandler) {
      this._eventsStrategy.on(eventName, eventHandler);
      return this;
    };
    _proto.off = function off(eventName, eventHandler) {
      this._eventsStrategy.off(eventName, eventHandler);
      return this;
    };
    return Devices;
  }();
  var devices = new Devices();
  var viewPortElement = (0, _view_port.value)();
  if (viewPortElement) {
    devices.attachCssClasses(viewPortElement);
  }
  _view_port.changeCallback.add(function (viewPort, prevViewport) {
    devices.detachCssClasses(prevViewport);
    devices.attachCssClasses(viewPort);
  });

  ///#DEBUG
  devices.Devices = Devices;
  ///#ENDDEBUG
  var _default = devices;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./utils/size","../core/renderer","./utils/window","./utils/extend","./utils/type","./utils/iterator","./errors","./utils/callbacks","./utils/ready_callbacks","./utils/resize_callbacks","./events_strategy","./utils/storage","./utils/view_port","./config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./utils/size"), require("../core/renderer"), require("./utils/window"), require("./utils/extend"), require("./utils/type"), require("./utils/iterator"), require("./errors"), require("./utils/callbacks"), require("./utils/ready_callbacks"), require("./utils/resize_callbacks"), require("./events_strategy"), require("./utils/storage"), require("./utils/view_port"), require("./config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=devices.js.map