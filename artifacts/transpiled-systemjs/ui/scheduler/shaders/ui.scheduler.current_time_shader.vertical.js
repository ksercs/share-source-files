!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/shaders/ui.scheduler.current_time_shader.vertical.js"], ["../../../core/utils/size","../../../core/renderer","../shaders/ui.scheduler.current_time_shader"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/shaders/ui.scheduler.current_time_shader.vertical.js", ["../../../core/utils/size", "../../../core/renderer", "../shaders/ui.scheduler.current_time_shader"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _uiScheduler = _interopRequireDefault($__require("../shaders/ui.scheduler.current_time_shader"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DATE_TIME_SHADER_ALL_DAY_CLASS = 'dx-scheduler-date-time-shader-all-day';
  var DATE_TIME_SHADER_TOP_CLASS = 'dx-scheduler-date-time-shader-top';
  var DATE_TIME_SHADER_BOTTOM_CLASS = 'dx-scheduler-date-time-shader-bottom';
  var VerticalCurrentTimeShader = /*#__PURE__*/function (_CurrentTimeShader) {
    _inheritsLoose(VerticalCurrentTimeShader, _CurrentTimeShader);
    function VerticalCurrentTimeShader() {
      return _CurrentTimeShader.apply(this, arguments) || this;
    }
    var _proto = VerticalCurrentTimeShader.prototype;
    _proto.renderShader = function renderShader() {
      var shaderHeight = this._getShaderHeight();
      var maxHeight = this._getShaderMaxHeight();
      var isSolidShader = shaderHeight > maxHeight;
      if (shaderHeight > maxHeight) {
        shaderHeight = maxHeight;
      }
      (0, _size.setHeight)(this._$shader, shaderHeight);
      var groupCount = this._workSpace._getGroupCount() || 1;
      if (this._workSpace.isGroupedByDate()) {
        this._renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
      } else {
        this._renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader);
      }
    };
    _proto._renderShaderParts = function _renderShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
      for (var i = 0; i < groupCount; i++) {
        var shaderWidth = this._getShaderWidth(i);
        this._renderTopShader(this._$shader, shaderHeight, shaderWidth, i);
        !isSolidShader && this._renderBottomShader(this._$shader, maxHeight, shaderHeight, shaderWidth, i);
        this._renderAllDayShader(shaderWidth, i);
      }
    };
    _proto._renderGroupedByDateShaderParts = function _renderGroupedByDateShaderParts(groupCount, shaderHeight, maxHeight, isSolidShader) {
      var shaderWidth = this._getShaderWidth(0);
      var bottomShaderWidth = shaderWidth - this._workSpace.getCellWidth();
      if (shaderHeight < 0) {
        shaderHeight = 0;
        bottomShaderWidth = shaderWidth;
      }
      this._renderTopShader(this._$shader, shaderHeight, shaderWidth * groupCount, 0);
      !isSolidShader && this._renderBottomShader(this._$shader, maxHeight, shaderHeight, bottomShaderWidth * groupCount + this._workSpace.getCellWidth(), 0);
      this._renderAllDayShader(shaderWidth * groupCount, 0);
    };
    _proto._renderTopShader = function _renderTopShader($shader, height, width, i) {
      this._$topShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_TOP_CLASS);
      if (width) {
        (0, _size.setWidth)(this._$topShader, width);
      }
      if (height) {
        (0, _size.setHeight)(this._$topShader, height);
      }
      this._$topShader.css('marginTop', this._getShaderTopOffset(i));
      this._$topShader.css('left', this._getShaderOffset(i, width));
      $shader.append(this._$topShader);
    };
    _proto._renderBottomShader = function _renderBottomShader($shader, maxHeight, height, width, i) {
      this._$bottomShader = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_BOTTOM_CLASS);
      var shaderWidth = height < 0 ? width : width - this._workSpace.getCellWidth();
      var shaderHeight = height < 0 ? maxHeight : maxHeight - height;
      (0, _size.setWidth)(this._$bottomShader, shaderWidth);
      (0, _size.setHeight)(this._$bottomShader, shaderHeight);
      this._$bottomShader.css('left', this._getShaderOffset(i, width - this._workSpace.getCellWidth()));
      $shader.append(this._$bottomShader);
    };
    _proto._renderAllDayShader = function _renderAllDayShader(shaderWidth, i) {
      if (this._workSpace.option('showAllDayPanel')) {
        this._$allDayIndicator = (0, _renderer.default)('<div>').addClass(DATE_TIME_SHADER_ALL_DAY_CLASS);
        (0, _size.setHeight)(this._$allDayIndicator, this._workSpace.getAllDayHeight());
        (0, _size.setWidth)(this._$allDayIndicator, shaderWidth);
        this._$allDayIndicator.css('left', this._getShaderOffset(i, shaderWidth));
        this._workSpace._$allDayPanel.prepend(this._$allDayIndicator);
      }
    };
    _proto._getShaderOffset = function _getShaderOffset(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderOffset(i, width);
    };
    _proto._getShaderTopOffset = function _getShaderTopOffset(i) {
      return this._workSpace.getGroupedStrategy().getShaderTopOffset(i);
    };
    _proto._getShaderHeight = function _getShaderHeight(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderHeight();
    };
    _proto._getShaderMaxHeight = function _getShaderMaxHeight(i, width) {
      return this._workSpace.getGroupedStrategy().getShaderMaxHeight();
    };
    _proto._getShaderWidth = function _getShaderWidth(i) {
      return this._workSpace.getGroupedStrategy().getShaderWidth(i);
    };
    _proto.clean = function clean() {
      _CurrentTimeShader.prototype.clean.call(this);
      this._workSpace && this._workSpace._$allDayPanel && this._workSpace._$allDayPanel.find('.' + DATE_TIME_SHADER_ALL_DAY_CLASS).remove();
    };
    return VerticalCurrentTimeShader;
  }(_uiScheduler.default);
  var _default = VerticalCurrentTimeShader;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../shaders/ui.scheduler.current_time_shader"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../shaders/ui.scheduler.current_time_shader"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.current_time_shader.vertical.js.map