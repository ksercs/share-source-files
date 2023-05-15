!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/utils/date_serialization.js"], ["../config","../../localization/ldml/date.formatter","../../localization/default_date_names","./type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/utils/date_serialization.js", ["../config", "../../localization/ldml/date.formatter", "../../localization/default_date_names", "./type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _config = _interopRequireDefault($__require("../config"));
  var _date = $__require("../../localization/ldml/date.formatter");
  var _default_date_names = _interopRequireDefault($__require("../../localization/default_date_names"));
  var _type = $__require("./type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var NUMBER_SERIALIZATION_FORMAT = 'number';
  var DATE_SERIALIZATION_FORMAT = 'yyyy/MM/dd';
  var DATETIME_SERIALIZATION_FORMAT = 'yyyy/MM/dd HH:mm:ss';
  var ISO8601_PATTERN = /^(\d{4,})(-)?(\d{2})(-)?(\d{2})(?:T(\d{2})(:)?(\d{2})?(:)?(\d{2}(?:\.(\d{1,3})\d*)?)?)?(Z|([+-])(\d{2})(:)?(\d{2})?)?$/;
  var ISO8601_TIME_PATTERN = /^(\d{2}):(\d{2})(:(\d{2}))?$/;
  var ISO8601_PATTERN_PARTS = ['', 'yyyy', '', 'MM', '', 'dd', 'THH', '', 'mm', '', 'ss', '.SSS'];
  var DATE_SERIALIZATION_PATTERN = /^(\d{4})\/(\d{2})\/(\d{2})$/;
  var MILLISECOND_LENGHT = 3;
  var dateParser = function dateParser(text, skipISO8601Parsing) {
    var result;
    if ((0, _type.isString)(text) && !skipISO8601Parsing) {
      result = parseISO8601String(text);
    }
    return result || parseDate(text);
  };
  function getTimePart(part) {
    return +part || 0;
  }
  function parseDate(text) {
    var isDefaultSerializationFormat = getDateSerializationFormat(text) === DATE_SERIALIZATION_FORMAT;
    var parsedValue = !(0, _type.isDate)(text) && Date.parse(text);
    if (!parsedValue && isDefaultSerializationFormat) {
      var parts = text.match(DATE_SERIALIZATION_PATTERN);
      if (parts) {
        var newDate = new Date(getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[3]));
        newDate.setFullYear(getTimePart(parts[1]));
        newDate.setMonth(getTimePart(parts[2]) - 1);
        newDate.setDate(getTimePart(parts[3]));
        return newDate;
      }
    }
    return (0, _type.isNumeric)(parsedValue) ? new Date(parsedValue) : text;
  }
  function parseISO8601String(text) {
    var parts = text.match(ISO8601_PATTERN);
    if (!parts) {
      parts = text.match(ISO8601_TIME_PATTERN);
      if (parts) {
        return new Date(0, 0, 0, getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[4]));
      }
      return;
    }
    var year = getTimePart(parts[1]);
    var month = --parts[3];
    var day = parts[5];
    var timeZoneHour = 0;
    var timeZoneMinute = 0;
    var correctYear = function correctYear(d) {
      year < 100 && d.setFullYear(year);
      return d;
    };
    timeZoneHour = getTimePart(parts[14]);
    timeZoneMinute = getTimePart(parts[16]);
    if (parts[13] === '-') {
      timeZoneHour = -timeZoneHour;
      timeZoneMinute = -timeZoneMinute;
    }
    var hour = getTimePart(parts[6]) - timeZoneHour;
    var minute = getTimePart(parts[8]) - timeZoneMinute;
    var second = getTimePart(parts[10]);
    var parseMilliseconds = function parseMilliseconds(part) {
      part = part || '';
      return getTimePart(part) * Math.pow(10, MILLISECOND_LENGHT - part.length);
    };
    var millisecond = parseMilliseconds(parts[11]);
    if (parts[12]) {
      return correctYear(new Date(Date.UTC(year, month, day, hour, minute, second, millisecond)));
    }
    return correctYear(new Date(year, month, day, hour, minute, second, millisecond));
  }
  var getIso8601Format = function getIso8601Format(text, useUtc) {
    var parts = text.match(ISO8601_PATTERN);
    var result = '';
    if (!parts) {
      parts = text.match(ISO8601_TIME_PATTERN);
      if (parts) {
        return parts[3] ? 'HH:mm:ss' : 'HH:mm';
      }
      return;
    }
    for (var i = 1; i < ISO8601_PATTERN_PARTS.length; i++) {
      if (parts[i]) {
        result += ISO8601_PATTERN_PARTS[i] || parts[i];
      }
    }
    if (parts[12] === 'Z') {
      result += '\'Z\'';
    }
    if (parts[14]) {
      if (parts[15]) {
        result += 'xxx';
      } else if (parts[16]) {
        result += 'xx';
      } else {
        result += 'x';
      }
    }
    return result;
  };
  var deserializeDate = function deserializeDate(value) {
    if (typeof value === 'number') {
      return new Date(value);
    }
    return dateParser(value, !(0, _config.default)().forceIsoDateParsing);
  };
  var serializeDate = function serializeDate(value, serializationFormat) {
    if (!serializationFormat) {
      return value;
    }
    if (!(0, _type.isDate)(value)) {
      return null;
    }
    if (serializationFormat === NUMBER_SERIALIZATION_FORMAT) {
      return value && value.valueOf ? value.valueOf() : null;
    }
    return (0, _date.getFormatter)(serializationFormat, _default_date_names.default)(value);
  };
  var getDateSerializationFormat = function getDateSerializationFormat(value) {
    if (typeof value === 'number') {
      return NUMBER_SERIALIZATION_FORMAT;
    } else if ((0, _type.isString)(value)) {
      var format;
      if ((0, _config.default)().forceIsoDateParsing) {
        format = getIso8601Format(value);
      }
      if (format) {
        return format;
      } else if (value.indexOf(':') >= 0) {
        return DATETIME_SERIALIZATION_FORMAT;
      } else {
        return DATE_SERIALIZATION_FORMAT;
      }
    } else if (value) {
      return null;
    }
  };
  var _default = {
    dateParser: dateParser,
    deserializeDate: deserializeDate,
    serializeDate: serializeDate,
    getDateSerializationFormat: getDateSerializationFormat
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../config","../../localization/ldml/date.formatter","../../localization/default_date_names","./type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../config"), require("../../localization/ldml/date.formatter"), require("../../localization/default_date_names"), require("./type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date_serialization.js.map