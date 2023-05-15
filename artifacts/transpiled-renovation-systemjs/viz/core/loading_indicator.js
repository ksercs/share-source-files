!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/loading_indicator.js"], ["./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/loading_indicator.js", ["./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.plugin = exports.LoadingIndicator = exports.DEBUG_set_LoadingIndicator = void 0;
  var _utils = $__require("./utils");
  var STATE_HIDDEN = 0;
  var STATE_SHOWN = 1;
  var ANIMATION_EASING = 'linear';
  var ANIMATION_DURATION = 400;
  var LOADING_INDICATOR_READY = 'loadingIndicatorReady';
  var LoadingIndicator = function LoadingIndicator(parameters) {
    var that = this;
    var renderer = parameters.renderer;
    that._group = renderer.g().attr({
      'class': 'dx-loading-indicator'
    }).linkOn(renderer.root, {
      name: 'loading-indicator',
      after: 'peripheral'
    });
    that._rect = renderer.rect().attr({
      opacity: 0
    }).append(that._group);
    that._text = renderer.text().attr({
      align: 'center'
    }).append(that._group);
    that._createStates(parameters.eventTrigger, that._group, renderer.root, parameters.notify);
  };
  exports.LoadingIndicator = LoadingIndicator;
  LoadingIndicator.prototype = {
    constructor: LoadingIndicator,
    _createStates: function _createStates(eventTrigger, group, root, notify) {
      var that = this;
      that._states = [{
        opacity: 0,
        start: function start() {
          notify(false);
        },
        complete: function complete() {
          group.linkRemove();
          root.css({
            'pointer-events': ''
          });
          eventTrigger(LOADING_INDICATOR_READY);
        }
      }, {
        opacity: 0.85,
        start: function start() {
          group.linkAppend();
          root.css({
            'pointer-events': 'none'
          });
          notify(true);
        },
        complete: function complete() {
          eventTrigger(LOADING_INDICATOR_READY);
        }
      }];
      that._state = STATE_HIDDEN;
    },
    setSize: function setSize(size) {
      var width = size.width;
      var height = size.height;
      this._rect.attr({
        width: width,
        height: height
      });
      this._text.attr({
        x: width / 2,
        y: height / 2
      });
    },
    setOptions: function setOptions(options) {
      this._rect.attr({
        fill: options.backgroundColor
      });
      this._text.css((0, _utils.patchFontOptions)(options.font)).attr({
        text: options.text,
        'class': options.cssClass
      });
      this[options.show ? 'show' : 'hide']();
    },
    dispose: function dispose() {
      var that = this;
      that._group.linkRemove().linkOff();
      that._group = that._rect = that._text = that._states = null;
    },
    _transit: function _transit(stateId) {
      var that = this;
      var state;
      if (that._state !== stateId) {
        that._state = stateId;
        that._isHiding = false;
        state = that._states[stateId];
        that._rect.stopAnimation().animate({
          opacity: state.opacity
        }, {
          complete: state.complete,
          easing: ANIMATION_EASING,
          duration: ANIMATION_DURATION,
          unstoppable: true // T261694
        });

        that._noHiding = true;
        state.start();
        that._noHiding = false;
      }
    },
    show: function show() {
      this._transit(STATE_SHOWN);
    },
    hide: function hide() {
      this._transit(STATE_HIDDEN);
    },
    scheduleHiding: function scheduleHiding() {
      if (!this._noHiding) {
        this._isHiding = true;
      }
    },
    fulfillHiding: function fulfillHiding() {
      if (this._isHiding) {
        this.hide();
      }
    }
  };
  var plugin = {
    name: 'loading_indicator',
    init: function init() {
      var that = this;
      // "exports" is used for testing purposes.
      that._loadingIndicator = new LoadingIndicator({
        eventTrigger: that._eventTrigger,
        renderer: that._renderer,
        notify: notify
      });
      that._scheduleLoadingIndicatorHiding();
      function notify(state) {
        // This flag is used to suppress redundant `_optionChanged` notifications caused by the mechanism that synchronizes the `loadingIndicator.show` option and the loading indicator visibility
        that._skipLoadingIndicatorOptions = true;
        that.option('loadingIndicator', {
          show: state
        });
        that._skipLoadingIndicatorOptions = false;
        if (state) {
          that._stopCurrentHandling();
        }
      }
    },
    dispose: function dispose() {
      this._loadingIndicator.dispose();
      this._loadingIndicator = null;
    },
    members: {
      _scheduleLoadingIndicatorHiding: function _scheduleLoadingIndicatorHiding() {
        this._loadingIndicator.scheduleHiding();
      },
      _fulfillLoadingIndicatorHiding: function _fulfillLoadingIndicatorHiding() {
        this._loadingIndicator.fulfillHiding();
      },
      showLoadingIndicator: function showLoadingIndicator() {
        this._loadingIndicator.show();
      },
      hideLoadingIndicator: function hideLoadingIndicator() {
        this._loadingIndicator.hide();
      },
      _onBeginUpdate: function _onBeginUpdate() {
        if (!this._optionChangedLocker) {
          this._scheduleLoadingIndicatorHiding();
        }
      }
    },
    extenders: {
      _dataSourceLoadingChangedHandler: function _dataSourceLoadingChangedHandler(isLoading) {
        if (isLoading && (this._options.silent('loadingIndicator') || {}).enabled) {
          this._loadingIndicator.show();
        }
      },
      _setContentSize: function _setContentSize() {
        this._loadingIndicator.setSize(this._canvas);
      },
      endUpdate: function endUpdate() {
        if (this._initialized && this._dataIsReady()) {
          this._fulfillLoadingIndicatorHiding();
        }
      }
    },
    customize: function customize(constructor) {
      var proto = constructor.prototype;

      // Of course this looks dirty - but cleaning it is another task. For now it has been just extracted from BaseWidget with minimal changes.
      if (proto._dataSourceChangedHandler) {
        var _dataSourceChangedHandler = proto._dataSourceChangedHandler;
        proto._dataSourceChangedHandler = function () {
          this._scheduleLoadingIndicatorHiding();
          _dataSourceChangedHandler.apply(this, arguments);
        };
      }
      constructor.addChange({
        code: 'LOADING_INDICATOR',
        handler: function handler() {
          if (!this._skipLoadingIndicatorOptions) {
            this._loadingIndicator.setOptions(this._getOption('loadingIndicator'));
          }
          this._scheduleLoadingIndicatorHiding();
        },
        isThemeDependent: true,
        option: 'loadingIndicator',
        isOptionChange: true
      });
      proto._eventsMap.onLoadingIndicatorReady = {
        name: 'loadingIndicatorReady'
      };
      var _drawn = proto._drawn;
      proto._drawn = function () {
        _drawn.apply(this, arguments);
        if (this._dataIsReady()) {
          this._fulfillLoadingIndicatorHiding();
        }
      };
    },
    fontFields: ['loadingIndicator.font']
  };
  ///#DEBUG
  exports.plugin = plugin;
  var DEBUG_set_LoadingIndicator = function DEBUG_set_LoadingIndicator(value) {
    exports.LoadingIndicator = LoadingIndicator = value;
  };
  ///#ENDDEBUG
  exports.DEBUG_set_LoadingIndicator = DEBUG_set_LoadingIndicator;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=loading_indicator.js.map