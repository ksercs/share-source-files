!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/progress_bar.js"], ["../core/renderer","./track_bar","../core/utils/extend","../core/utils/type","../core/component_registrator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/progress_bar.js", ["../core/renderer", "./track_bar", "../core/utils/extend", "../core/utils/type", "../core/component_registrator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _track_bar = _interopRequireDefault($__require("./track_bar"));
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE progressBar

  var PROGRESSBAR_CLASS = 'dx-progressbar';
  var PROGRESSBAR_CONTAINER_CLASS = 'dx-progressbar-container';
  var PROGRESSBAR_RANGE_CONTAINER_CLASS = 'dx-progressbar-range-container';
  var PROGRESSBAR_RANGE_CLASS = 'dx-progressbar-range';
  var PROGRESSBAR_WRAPPER_CLASS = 'dx-progressbar-wrapper';
  var PROGRESSBAR_STATUS_CLASS = 'dx-progressbar-status';
  var PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER = 'dx-progressbar-animating-container';
  var PROGRESSBAR_INDETERMINATE_SEGMENT = 'dx-progressbar-animating-segment';
  var ProgressBar = _track_bar.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: 0,
        statusFormat: function statusFormat(ratio) {
          return 'Progress: ' + Math.round(ratio * 100) + '%';
        },
        showStatus: true,
        onComplete: null,
        /**
        * @name dxProgressBarOptions.activeStateEnabled
        * @hidden
        */
        activeStateEnabled: false,
        statusPosition: 'bottom left',
        _animatingSegmentCount: 0

        /**
        * @name dxProgressBarOptions.focusStateEnabled
        * @hidden
        */

        /**
        * @name dxProgressBarOptions.accessKey
        * @hidden
        */

        /**
        * @name dxProgressBarOptions.tabIndex
        * @hidden
        */
      });
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device(_device) {
          return _device.platform === 'android';
        },
        options: {
          _animatingSegmentCount: 2
        }
      }]);
    },
    _initMarkup: function _initMarkup() {
      this._renderStatus();
      this._createCompleteAction();
      this.callBase();
      this.$element().addClass(PROGRESSBAR_CLASS);
      this._$wrapper.addClass(PROGRESSBAR_WRAPPER_CLASS);
      this._$bar.addClass(PROGRESSBAR_CONTAINER_CLASS);
      this.setAria('role', 'progressbar');
      (0, _renderer.default)('<div>').addClass(PROGRESSBAR_RANGE_CONTAINER_CLASS).appendTo(this._$wrapper).append(this._$bar);
      this._$range.addClass(PROGRESSBAR_RANGE_CLASS);
      this._toggleStatus(this.option('showStatus'));
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _createCompleteAction: function _createCompleteAction() {
      this._completeAction = this._createActionByOption('onComplete');
    },
    _renderStatus: function _renderStatus() {
      this._$status = (0, _renderer.default)('<div>').addClass(PROGRESSBAR_STATUS_CLASS);
    },
    _renderIndeterminateState: function _renderIndeterminateState() {
      this._$segmentContainer = (0, _renderer.default)('<div>').addClass(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER);
      var segments = this.option('_animatingSegmentCount');
      for (var i = 0; i < segments; i++) {
        (0, _renderer.default)('<div>').addClass(PROGRESSBAR_INDETERMINATE_SEGMENT).addClass(PROGRESSBAR_INDETERMINATE_SEGMENT + '-' + (i + 1)).appendTo(this._$segmentContainer);
      }
      this._$segmentContainer.appendTo(this._$wrapper);
    },
    _toggleStatus: function _toggleStatus(value) {
      var splitPosition = this.option('statusPosition').split(' ');
      if (value) {
        if (splitPosition[0] === 'top' || splitPosition[0] === 'left') {
          this._$status.prependTo(this._$wrapper);
        } else {
          this._$status.appendTo(this._$wrapper);
        }
      } else {
        this._$status.detach();
      }
      this._togglePositionClass();
    },
    _togglePositionClass: function _togglePositionClass() {
      var position = this.option('statusPosition');
      var splitPosition = position.split(' ');
      this._$wrapper.removeClass('dx-position-top-left dx-position-top-right dx-position-bottom-left dx-position-bottom-right dx-position-left dx-position-right');
      var positionClass = 'dx-position-' + splitPosition[0];
      if (splitPosition[1]) {
        positionClass += '-' + splitPosition[1];
      }
      this._$wrapper.addClass(positionClass);
    },
    _toggleIndeterminateState: function _toggleIndeterminateState(value) {
      if (value) {
        this._renderIndeterminateState();
        this._$bar.toggle(false);
      } else {
        this._$bar.toggle(true);
        this._$segmentContainer.remove();
        delete this._$segmentContainer;
      }
    },
    _renderValue: function _renderValue() {
      var val = this.option('value');
      var max = this.option('max');
      if (!val && val !== 0) {
        this._toggleIndeterminateState(true);
        return;
      }
      if (this._$segmentContainer) {
        this._toggleIndeterminateState(false);
      }
      if (val === max) {
        this._completeAction();
      }
      this.callBase();
      this._setStatus();
    },
    _setStatus: function _setStatus() {
      var format = this.option('statusFormat');
      if ((0, _type.isFunction)(format)) {
        format = format.bind(this);
      } else {
        format = function format(value) {
          return value;
        };
      }
      var statusText = format(this._currentRatio, this.option('value'));
      this._$status.text(statusText);
    },
    _dispose: function _dispose() {
      this._$status.remove();
      this.callBase();
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'statusFormat':
          this._setStatus();
          break;
        case 'showStatus':
          this._toggleStatus(args.value);
          break;
        case 'statusPosition':
          this._toggleStatus(this.option('showStatus'));
          break;
        case 'onComplete':
          this._createCompleteAction();
          break;
        case '_animatingSegmentCount':
          break;
        default:
          this.callBase(args);
      }
    }

    /**
    * @name dxProgressBar.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxProgressBar.focus
    * @publicName focus()
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxProgressBar', ProgressBar);
  var _default = ProgressBar;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./track_bar","../core/utils/extend","../core/utils/type","../core/component_registrator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./track_bar"), require("../core/utils/extend"), require("../core/utils/type"), require("../core/component_registrator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=progress_bar.js.map