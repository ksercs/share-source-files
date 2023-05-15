!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/animation/presets/presets.js"], ["../../core/utils/size","../../core/component","../../core/utils/iterator","../../core/utils/extend","../../core/devices","../fx"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/animation/presets/presets.js", ["../../core/utils/size", "../../core/component", "../../core/utils/iterator", "../../core/utils/extend", "../../core/devices", "../fx"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.presets = exports.PresetCollection = void 0;
  var _size = $__require("../../core/utils/size");
  var _component = $__require("../../core/component");
  var _iterator = $__require("../../core/utils/iterator");
  var _extend = $__require("../../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _fx = _interopRequireDefault($__require("../fx"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var directionPostfixes = {
    forward: ' dx-forward',
    backward: ' dx-backward',
    none: ' dx-no-direction',
    undefined: ' dx-no-direction'
  };
  var optionPrefix = 'preset_';
  var AnimationPresetCollection = _component.Component.inherit({
    ctor: function ctor() {
      this.callBase.apply(this, arguments);
      this._registeredPresets = [];
      this.resetToDefaults();
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        defaultAnimationDuration: 400,
        defaultAnimationDelay: 0,
        defaultStaggerAnimationDuration: 300,
        defaultStaggerAnimationDelay: 40,
        defaultStaggerAnimationStartDelay: 500 // hack for better animations on ipad mini
      });
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device(_device) {
          return _device.phone;
        },
        options: {
          defaultStaggerAnimationDuration: 350,
          defaultStaggerAnimationDelay: 50,
          defaultStaggerAnimationStartDelay: 0
        }
      }, {
        // T254756
        device: function device() {
          return _devices.default.current().android || _devices.default.real.android;
        },
        options: {
          defaultAnimationDelay: 100
        }
      }]);
    },
    _getPresetOptionName: function _getPresetOptionName(animationName) {
      return optionPrefix + animationName;
    },
    // T257755
    _createAndroidSlideAnimationConfig: function _createAndroidSlideAnimationConfig(throughOpacity, widthMultiplier) {
      var that = this;
      var createBaseConfig = function createBaseConfig(configModifier) {
        return {
          type: 'slide',
          delay: configModifier.delay === undefined ? that.option('defaultAnimationDelay') : configModifier.delay,
          duration: configModifier.duration === undefined ? that.option('defaultAnimationDuration') : configModifier.duration
        };
      };
      return {
        enter: function enter($element, configModifier) {
          var width = (0, _size.getWidth)($element.parent()) * widthMultiplier;
          var direction = configModifier.direction;
          var config = createBaseConfig(configModifier);
          config.to = {
            left: 0,
            opacity: 1
          };
          if (direction === 'forward') {
            config.from = {
              left: width,
              opacity: throughOpacity
            };
          } else if (direction === 'backward') {
            config.from = {
              left: -width,
              opacity: throughOpacity
            };
          } else {
            config.from = {
              left: 0,
              opacity: 0
            };
          }
          return _fx.default.createAnimation($element, config);
        },
        leave: function leave($element, configModifier) {
          var width = (0, _size.getWidth)($element.parent()) * widthMultiplier;
          var direction = configModifier.direction;
          var config = createBaseConfig(configModifier);
          config.from = {
            left: 0,
            opacity: 1
          };
          if (direction === 'forward') {
            config.to = {
              left: -width,
              opacity: throughOpacity
            };
          } else if (direction === 'backward') {
            config.to = {
              left: width,
              opacity: throughOpacity
            };
          } else {
            config.to = {
              left: 0,
              opacity: 0
            };
          }
          return _fx.default.createAnimation($element, config);
        }
      };
    },
    _createOpenDoorConfig: function _createOpenDoorConfig() {
      var that = this;
      var createBaseConfig = function createBaseConfig(configModifier) {
        return {
          type: 'css',
          extraCssClasses: 'dx-opendoor-animation',
          delay: configModifier.delay === undefined ? that.option('defaultAnimationDelay') : configModifier.delay,
          duration: configModifier.duration === undefined ? that.option('defaultAnimationDuration') : configModifier.duration
        };
      };
      return {
        enter: function enter($element, configModifier) {
          var direction = configModifier.direction;
          var config = createBaseConfig(configModifier);
          config.delay = direction === 'none' ? config.delay : config.duration;
          config.from = 'dx-enter dx-opendoor-animation' + directionPostfixes[direction];
          config.to = 'dx-enter-active';
          return _fx.default.createAnimation($element, config);
        },
        leave: function leave($element, configModifier) {
          var direction = configModifier.direction;
          var config = createBaseConfig(configModifier);
          config.from = 'dx-leave dx-opendoor-animation' + directionPostfixes[direction];
          config.to = 'dx-leave-active';
          return _fx.default.createAnimation($element, config);
        }
      };
    },
    _createWinPopConfig: function _createWinPopConfig() {
      var that = this;
      var baseConfig = {
        type: 'css',
        extraCssClasses: 'dx-win-pop-animation',
        duration: that.option('defaultAnimationDuration')
      };
      return {
        enter: function enter($element, configModifier) {
          var config = baseConfig;
          var direction = configModifier.direction;
          config.delay = direction === 'none' ? that.option('defaultAnimationDelay') : that.option('defaultAnimationDuration') / 2;
          config.from = 'dx-enter dx-win-pop-animation' + directionPostfixes[direction];
          config.to = 'dx-enter-active';
          return _fx.default.createAnimation($element, config);
        },
        leave: function leave($element, configModifier) {
          var config = baseConfig;
          var direction = configModifier.direction;
          config.delay = that.option('defaultAnimationDelay');
          config.from = 'dx-leave dx-win-pop-animation' + directionPostfixes[direction];
          config.to = 'dx-leave-active';
          return _fx.default.createAnimation($element, config);
        }
      };
    },
    resetToDefaults: function resetToDefaults() {
      this.clear();
      this.registerDefaultPresets();
      this.applyChanges();
    },
    clear: function clear(name) {
      var that = this;
      var newRegisteredPresets = [];
      (0, _iterator.each)(this._registeredPresets, function (index, preset) {
        if (!name || name === preset.name) {
          that.option(that._getPresetOptionName(preset.name), undefined);
        } else {
          newRegisteredPresets.push(preset);
        }
      });
      this._registeredPresets = newRegisteredPresets;
      this.applyChanges();
    },
    registerPreset: function registerPreset(name, config) {
      this._registeredPresets.push({
        name: name,
        config: config
      });
    },
    applyChanges: function applyChanges() {
      var that = this;
      var customRules = [];
      (0, _iterator.each)(this._registeredPresets, function (index, preset) {
        var rule = {
          device: preset.config.device,
          options: {}
        };
        rule.options[that._getPresetOptionName(preset.name)] = preset.config.animation;
        customRules.push(rule);
      });
      this._setOptionsByDevice(customRules);
    },
    getPreset: function getPreset(name) {
      var result = name;
      while (typeof result === 'string') {
        result = this.option(this._getPresetOptionName(result));
      }
      return result;
    },
    registerDefaultPresets: function registerDefaultPresets() {
      this.registerPreset('pop', {
        animation: {
          extraCssClasses: 'dx-android-pop-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('openDoor', {
        animation: this._createOpenDoorConfig()
      });
      this.registerPreset('win-pop', {
        animation: this._createWinPopConfig()
      });
      this.registerPreset('fade', {
        animation: {
          extraCssClasses: 'dx-fade-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('slide', {
        device: function device() {
          return _devices.default.current().android || _devices.default.real.android;
        },
        animation: this._createAndroidSlideAnimationConfig(1, 1)
      });
      this.registerPreset('slide', {
        device: function device() {
          return !_devices.default.current().android && !_devices.default.real.android;
        },
        animation: {
          extraCssClasses: 'dx-slide-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('ios7-slide', {
        animation: {
          extraCssClasses: 'dx-ios7-slide-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('overflow', {
        animation: {
          extraCssClasses: 'dx-overflow-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('ios7-toolbar', {
        device: function device() {
          return !_devices.default.current().android && !_devices.default.real.android;
        },
        animation: {
          extraCssClasses: 'dx-ios7-toolbar-animation',
          delay: this.option('defaultAnimationDelay'),
          duration: this.option('defaultAnimationDuration')
        }
      });
      this.registerPreset('ios7-toolbar', {
        device: function device() {
          return _devices.default.current().android || _devices.default.real.android;
        },
        animation: this._createAndroidSlideAnimationConfig(0, 0.4)
      });
      this.registerPreset('stagger-fade', {
        animation: {
          extraCssClasses: 'dx-fade-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-slide', {
        animation: {
          extraCssClasses: 'dx-slide-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-fade-slide', {
        animation: {
          extraCssClasses: 'dx-fade-slide-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-drop', {
        animation: {
          extraCssClasses: 'dx-drop-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-fade-drop', {
        animation: {
          extraCssClasses: 'dx-fade-drop-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-fade-rise', {
        animation: {
          extraCssClasses: 'dx-fade-rise-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-3d-drop', {
        animation: {
          extraCssClasses: 'dx-3d-drop-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
      this.registerPreset('stagger-fade-zoom', {
        animation: {
          extraCssClasses: 'dx-fade-zoom-animation',
          staggerDelay: this.option('defaultStaggerAnimationDelay'),
          duration: this.option('defaultStaggerAnimationDuration'),
          delay: this.option('defaultStaggerAnimationStartDelay')
        }
      });
    }
  });
  exports.PresetCollection = AnimationPresetCollection;
  var animationPresets = new AnimationPresetCollection();
  exports.presets = animationPresets;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/component","../../core/utils/iterator","../../core/utils/extend","../../core/devices","../fx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/component"), require("../../core/utils/iterator"), require("../../core/utils/extend"), require("../../core/devices"), require("../fx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=presets.js.map