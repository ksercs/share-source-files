!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/date_box/ui.date_box.mask.parts.js"], ["../../localization/ldml/date.parser","../../core/utils/extend","../../core/utils/math","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/date_box/ui.date_box.mask.parts.js", ["../../localization/ldml/date.parser", "../../core/utils/extend", "../../core/utils/math", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.renderDateParts = exports.getDatePartIndexByPosition = void 0;
  var _date = $__require("../../localization/ldml/date.parser");
  var _extend = $__require("../../core/utils/extend");
  var _math = $__require("../../core/utils/math");
  var _common = $__require("../../core/utils/common");
  var monthGetter = function monthGetter(date) {
    return date.getMonth() + 1;
  };
  var monthSetter = function monthSetter(date, value) {
    var day = date.getDate();
    var monthLimits = getLimits('M', date);
    var newValue = (0, _math.fitIntoRange)(parseInt(value), monthLimits.min, monthLimits.max);
    date.setMonth(newValue - 1, 1);
    var _getLimits = getLimits('dM', date),
        min = _getLimits.min,
        max = _getLimits.max;
    var newDay = (0, _math.fitIntoRange)(day, min, max);
    date.setDate(newDay);
  };
  var PATTERN_GETTERS = {
    a: function a(date) {
      return date.getHours() < 12 ? 0 : 1;
    },
    E: 'getDay',
    y: 'getFullYear',
    M: monthGetter,
    L: monthGetter,
    d: 'getDate',
    H: 'getHours',
    h: 'getHours',
    m: 'getMinutes',
    s: 'getSeconds',
    S: 'getMilliseconds'
  };
  var PATTERN_SETTERS = (0, _extend.extend)({}, (0, _date.getPatternSetters)(), {
    a: function a(date, value) {
      var hours = date.getHours();
      var current = hours >= 12;
      if (current === !!parseInt(value)) {
        return;
      }
      date.setHours((hours + 12) % 24);
    },
    d: function d(date, value) {
      var lastDayInMonth = getLimits('dM', date).max;
      if (value > lastDayInMonth) {
        date.setMonth(date.getMonth() + 1);
      }
      date.setDate(value);
    },
    h: function h(date, value) {
      var isPM = date.getHours() >= 12;
      date.setHours(+value % 12 + (isPM ? 12 : 0));
    },
    M: monthSetter,
    L: monthSetter,
    E: function E(date, value) {
      if (value < 0) {
        return;
      }
      date.setDate(date.getDate() - date.getDay() + parseInt(value));
    },
    y: function y(date, value) {
      var currentYear = date.getFullYear();
      var valueLength = String(value).length;
      var maxLimitLength = String(getLimits('y', date).max).length;
      var newValue = parseInt(String(currentYear).substr(0, maxLimitLength - valueLength) + value);
      date.setFullYear(newValue);
    }
  });
  var getPatternGetter = function getPatternGetter(patternChar) {
    var unsupportedCharGetter = function unsupportedCharGetter() {
      return patternChar;
    };
    return PATTERN_GETTERS[patternChar] || unsupportedCharGetter;
  };
  var renderDateParts = function renderDateParts(text, regExpInfo) {
    var result = regExpInfo.regexp.exec(text);
    var start = 0;
    var end = 0;
    var sections = [];
    var _loop = function _loop() {
      start = end;
      end = start + result[i].length;
      var pattern = regExpInfo.patterns[i - 1].replace(/^'|'$/g, '');
      var getter = getPatternGetter(pattern[0]);
      sections.push({
        index: i - 1,
        isStub: pattern === result[i],
        caret: {
          start: start,
          end: end
        },
        pattern: pattern,
        text: result[i],
        limits: function limits() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return getLimits.apply(void 0, [pattern[0]].concat(args));
        },
        setter: PATTERN_SETTERS[pattern[0]] || _common.noop,
        getter: getter
      });
    };
    for (var i = 1; i < result.length; i++) {
      _loop();
    }
    return sections;
  };
  exports.renderDateParts = renderDateParts;
  var getLimits = function getLimits(pattern, date, forcedPattern) {
    var limits = {
      y: {
        min: 0,
        max: 9999
      },
      M: {
        min: 1,
        max: 12
      },
      L: {
        min: 1,
        max: 12
      },
      d: {
        min: 1,
        max: 31
      },
      dM: {
        min: 1,
        max: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
      },
      E: {
        min: 0,
        max: 6
      },
      H: {
        min: 0,
        max: 23
      },
      h: {
        min: 0,
        max: 12
      },
      m: {
        min: 0,
        max: 59
      },
      s: {
        min: 0,
        max: 59
      },
      S: {
        min: 0,
        max: 999
      },
      a: {
        min: 0,
        max: 1
      }
    };
    return limits[forcedPattern || pattern] || limits['getAmPm'];
  };
  var getDatePartIndexByPosition = function getDatePartIndexByPosition(dateParts, position) {
    for (var i = 0; i < dateParts.length; i++) {
      var caretInGroup = dateParts[i].caret.end >= position;
      if (!dateParts[i].isStub && caretInGroup) {
        return i;
      }
    }
    return null;
  };
  exports.getDatePartIndexByPosition = getDatePartIndexByPosition;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../localization/ldml/date.parser","../../core/utils/extend","../../core/utils/math","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../localization/ldml/date.parser"), require("../../core/utils/extend"), require("../../core/utils/math"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_box.mask.parts.js.map