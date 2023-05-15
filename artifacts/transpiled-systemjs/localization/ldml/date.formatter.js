!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/ldml/date.formatter.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled/localization/ldml/date.formatter.js', [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getFormatter = void 0;
  function leftPad(text, length) {
    while (text.length < length) {
      text = '0' + text;
    }
    return text;
  }
  var FORMAT_TYPES = {
    '3': 'abbreviated',
    '4': 'wide',
    '5': 'narrow'
  };
  var LDML_FORMATTERS = {
    y: function y(date, count, useUtc) {
      var year = date[useUtc ? 'getUTCFullYear' : 'getFullYear']();
      if (count === 2) {
        year = year % 100;
      }
      return leftPad(year.toString(), count);
    },
    M: function M(date, count, useUtc, dateParts) {
      var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
      var formatType = FORMAT_TYPES[count];
      if (formatType) {
        return dateParts.getMonthNames(formatType, 'format')[month];
      }
      return leftPad((month + 1).toString(), Math.min(count, 2));
    },
    L: function L(date, count, useUtc, dateParts) {
      var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
      var formatType = FORMAT_TYPES[count];
      if (formatType) {
        return dateParts.getMonthNames(formatType, 'standalone')[month];
      }
      return leftPad((month + 1).toString(), Math.min(count, 2));
    },
    Q: function Q(date, count, useUtc, dateParts) {
      var month = date[useUtc ? 'getUTCMonth' : 'getMonth']();
      var quarter = Math.floor(month / 3);
      var formatType = FORMAT_TYPES[count];
      if (formatType) {
        return dateParts.getQuarterNames(formatType)[quarter];
      }
      return leftPad((quarter + 1).toString(), Math.min(count, 2));
    },
    E: function E(date, count, useUtc, dateParts) {
      var day = date[useUtc ? 'getUTCDay' : 'getDay']();
      var formatType = FORMAT_TYPES[count < 3 ? 3 : count];
      return dateParts.getDayNames(formatType)[day];
    },
    a: function a(date, count, useUtc, dateParts) {
      var hours = date[useUtc ? 'getUTCHours' : 'getHours']();
      var period = hours < 12 ? 0 : 1;
      var formatType = FORMAT_TYPES[count];
      return dateParts.getPeriodNames(formatType)[period];
    },
    d: function d(date, count, useUtc) {
      return leftPad(date[useUtc ? 'getUTCDate' : 'getDate']().toString(), Math.min(count, 2));
    },
    H: function H(date, count, useUtc) {
      return leftPad(date[useUtc ? 'getUTCHours' : 'getHours']().toString(), Math.min(count, 2));
    },
    h: function h(date, count, useUtc) {
      var hours = date[useUtc ? 'getUTCHours' : 'getHours']();
      return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
    },
    m: function m(date, count, useUtc) {
      return leftPad(date[useUtc ? 'getUTCMinutes' : 'getMinutes']().toString(), Math.min(count, 2));
    },
    s: function s(date, count, useUtc) {
      return leftPad(date[useUtc ? 'getUTCSeconds' : 'getSeconds']().toString(), Math.min(count, 2));
    },
    S: function S(date, count, useUtc) {
      return leftPad(date[useUtc ? 'getUTCMilliseconds' : 'getMilliseconds']().toString(), 3).substr(0, count);
    },
    x: function x(date, count, useUtc) {
      var timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
      var signPart = timezoneOffset > 0 ? '-' : '+';
      var timezoneOffsetAbs = Math.abs(timezoneOffset);
      var hours = Math.floor(timezoneOffsetAbs / 60);
      var minutes = timezoneOffsetAbs % 60;
      var hoursPart = leftPad(hours.toString(), 2);
      var minutesPart = leftPad(minutes.toString(), 2);
      return signPart + hoursPart + (count >= 3 ? ':' : '') + (count > 1 || minutes ? minutesPart : '');
    },
    X: function X(date, count, useUtc) {
      if (useUtc || !date.getTimezoneOffset()) {
        return 'Z';
      }
      return LDML_FORMATTERS.x(date, count, useUtc);
    },
    Z: function Z(date, count, useUtc) {
      return LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc);
    }
  };
  var getFormatter = function getFormatter(format, dateParts) {
    return function (date) {
      var charIndex;
      var formatter;
      var char;
      var charCount = 0;
      var separator = '\'';
      var isEscaping = false;
      var isCurrentCharEqualsNext;
      var result = '';
      if (!date) return null;
      if (!format) return date;
      var useUtc = format[format.length - 1] === 'Z' || format.slice(-3) === '\'Z\'';
      for (charIndex = 0; charIndex < format.length; charIndex++) {
        char = format[charIndex];
        formatter = LDML_FORMATTERS[char];
        isCurrentCharEqualsNext = char === format[charIndex + 1];
        charCount++;
        if (!isCurrentCharEqualsNext) {
          if (formatter && !isEscaping) {
            result += formatter(date, charCount, useUtc, dateParts);
          }
          charCount = 0;
        }
        if (char === separator && !isCurrentCharEqualsNext) {
          isEscaping = !isEscaping;
        } else if (isEscaping || !formatter) {
          result += char;
        }
        if (char === separator && isCurrentCharEqualsNext) {
          charIndex++;
        }
      }
      return result;
    };
  };
  exports.getFormatter = getFormatter;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=date.formatter.js.map