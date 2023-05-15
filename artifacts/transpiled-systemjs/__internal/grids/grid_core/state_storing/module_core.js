!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/state_storing/module_core.js"], ["../../../../events/core/events_engine","../../../../core/utils/window","../../../../ui/widget/ui.errors","../../../../core/utils/storage","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/utils/type","../../../../core/utils/deferred","../modules"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/state_storing/module_core.js", ["../../../../events/core/events_engine", "../../../../core/utils/window", "../../../../ui/widget/ui.errors", "../../../../core/utils/storage", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../core/utils/type", "../../../../core/utils/deferred", "../modules"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _window = $__require("../../../../core/utils/window");
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.errors"));
  var _storage = $__require("../../../../core/utils/storage");
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _type = $__require("../../../../core/utils/type");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _modules = _interopRequireDefault($__require("../modules"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  var parseDates = function parseDates(state) {
    if (!state) return;
    (0, _iterator.each)(state, function (key, value) {
      if ((0, _type.isPlainObject)(value) || Array.isArray(value)) {
        parseDates(value);
      } else if (typeof value === 'string') {
        var date = DATE_REGEX.exec(value);
        if (date) {
          state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]));
        }
      }
    });
  };
  var StateStoringController = _modules.default.ViewController.inherit(function () {
    var getStorage = function getStorage(options) {
      var storage = options.type === 'sessionStorage' ? (0, _storage.sessionStorage)() : (0, _window.getWindow)().localStorage;
      if (!storage) {
        throw new Error('E1007');
      }
      return storage;
    };
    var getUniqueStorageKey = function getUniqueStorageKey(options) {
      return (0, _type.isDefined)(options.storageKey) ? options.storageKey : 'storage';
    };
    return {
      _loadState: function _loadState() {
        var options = this.option('stateStoring');
        if (options.type === 'custom') {
          return options.customLoad && options.customLoad();
        }
        try {
          // @ts-expect-error
          return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)));
        } catch (e) {
          _ui.default.log(e.message);
        }
      },
      _saveState: function _saveState(state) {
        var options = this.option('stateStoring');
        if (options.type === 'custom') {
          options.customSave && options.customSave(state);
          return;
        }
        try {
          getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state));
        } catch (e) {
          _ui.default.log(e.message);
        }
      },
      publicMethods: function publicMethods() {
        return ['state'];
      },
      isEnabled: function isEnabled() {
        return this.option('stateStoring.enabled');
      },
      init: function init() {
        var that = this;
        that._state = {};
        that._isLoaded = false;
        that._isLoading = false;
        that._windowUnloadHandler = function () {
          if (that._savingTimeoutID !== undefined) {
            that._saveState(that.state());
          }
        };
        _events_engine.default.on((0, _window.getWindow)(), 'unload', that._windowUnloadHandler);
        return that;
      },
      isLoaded: function isLoaded() {
        return this._isLoaded;
      },
      isLoading: function isLoading() {
        return this._isLoading;
      },
      load: function load() {
        var _this = this;
        this._isLoading = true;
        var loadResult = (0, _deferred.fromPromise)(this._loadState());
        loadResult.always(function () {
          _this._isLoaded = true;
          _this._isLoading = false;
        }).done(function (state) {
          if (state !== null && !(0, _type.isEmptyObject)(state)) {
            _this.state(state);
          }
        });
        return loadResult;
      },
      state: function state(_state) {
        var that = this;
        if (!arguments.length) {
          return (0, _extend.extend)(true, {}, that._state);
        }
        that._state = (0, _extend.extend)({}, _state);
        parseDates(that._state);
      },
      save: function save() {
        var that = this;
        clearTimeout(that._savingTimeoutID);
        that._savingTimeoutID = setTimeout(function () {
          that._saveState(that.state());
          that._savingTimeoutID = undefined;
        }, that.option('stateStoring.savingTimeout'));
      },
      optionChanged: function optionChanged(args) {
        var that = this;
        switch (args.name) {
          case 'stateStoring':
            if (that.isEnabled() && !that.isLoading()) {
              that.load();
            }
            args.handled = true;
            break;
          default:
            that.callBase(args);
        }
      },
      dispose: function dispose() {
        clearTimeout(this._savingTimeoutID);
        _events_engine.default.off((0, _window.getWindow)(), 'unload', this._windowUnloadHandler);
      }
    };
  }());
  var _default = {
    StateStoringController: StateStoringController
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../events/core/events_engine","../../../../core/utils/window","../../../../ui/widget/ui.errors","../../../../core/utils/storage","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/utils/type","../../../../core/utils/deferred","../modules"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../events/core/events_engine"), require("../../../../core/utils/window"), require("../../../../ui/widget/ui.errors"), require("../../../../core/utils/storage"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../core/utils/type"), require("../../../../core/utils/deferred"), require("../modules"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_core.js.map