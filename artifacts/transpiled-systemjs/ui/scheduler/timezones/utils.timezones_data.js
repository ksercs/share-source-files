!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/timezones/utils.timezones_data.js"], ["../../../data/query","../../../core/errors","./timezones_data","../../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/timezones/utils.timezones_data.js", ["../../../data/query", "../../../core/errors", "./timezones_data", "../../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _query = _interopRequireDefault($__require("../../../data/query"));
  var _errors = _interopRequireDefault($__require("../../../core/errors"));
  var _timezones_data = _interopRequireDefault($__require("./timezones_data"));
  var _math = $__require("../../../core/utils/math");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var getConvertedUntils = function getConvertedUntils(value) {
    return value.split('|').map(function (until) {
      if (until === 'Infinity') {
        return null;
      }
      return parseInt(until, 36) * 1000;
    });
  };
  var parseTimezone = function parseTimezone(timeZoneConfig) {
    var offsets = timeZoneConfig.offsets;
    var offsetIndices = timeZoneConfig.offsetIndices;
    var untils = timeZoneConfig.untils;
    var offsetList = offsets.split('|').map(function (value) {
      return parseInt(value);
    });
    var offsetIndexList = offsetIndices.split('').map(function (value) {
      return parseInt(value);
    });
    var dateList = getConvertedUntils(untils).map(function (accumulator) {
      return function (value) {
        return accumulator += value;
      };
    }(0));
    return {
      offsetList: offsetList,
      offsetIndexList: offsetIndexList,
      dateList: dateList
    };
  };
  var TimeZoneCache = /*#__PURE__*/function () {
    function TimeZoneCache() {
      this.map = new Map();
    }
    var _proto = TimeZoneCache.prototype;
    _proto.tryGet = function tryGet(id) {
      if (!this.map.get(id)) {
        var config = timeZoneDataUtils.getTimezoneById(id);
        if (!config) {
          return false;
        }
        var timeZoneInfo = parseTimezone(config);
        this.map.set(id, timeZoneInfo);
      }
      return this.map.get(id);
    };
    return TimeZoneCache;
  }();
  var tzCache = new TimeZoneCache();
  var timeZoneDataUtils = {
    _tzCache: tzCache,
    _timeZones: _timezones_data.default.zones,
    getDisplayedTimeZones: function getDisplayedTimeZones(timestamp) {
      var _this = this;
      var timeZones = this._timeZones.map(function (timezone) {
        var timeZoneInfo = parseTimezone(timezone);
        var offset = _this.getUtcOffset(timeZoneInfo, timestamp);
        var title = "(GMT ".concat(_this.formatOffset(offset), ") ").concat(_this.formatId(timezone.id));
        return {
          offset: offset,
          title: title,
          id: timezone.id
        };
      });
      return (0, _query.default)(timeZones).sortBy('offset').toArray();
    },
    formatOffset: function formatOffset(offset) {
      var hours = Math.floor(offset);
      var minutesInDecimal = offset - hours;
      var signString = (0, _math.sign)(offset) >= 0 ? '+' : '-';
      var hoursString = "0".concat(Math.abs(hours)).slice(-2);
      var minutesString = minutesInDecimal > 0 ? ":".concat(minutesInDecimal * 60) : ':00';
      return signString + hoursString + minutesString;
    },
    formatId: function formatId(id) {
      return id.split('/').join(' - ').split('_').join(' ');
    },
    getTimezoneById: function getTimezoneById(id) {
      if (!id) {
        return;
      }
      var tzList = this._timeZones;
      for (var i = 0; i < tzList.length; i++) {
        var currentId = tzList[i]['id'];
        if (currentId === id) {
          return tzList[i];
        }
      }
      _errors.default.log('W0009', id);
      return;
    },
    getTimeZoneOffsetById: function getTimeZoneOffsetById(id, timestamp) {
      var timeZoneInfo = tzCache.tryGet(id);
      return timeZoneInfo ? this.getUtcOffset(timeZoneInfo, timestamp) : undefined;
    },
    getTimeZoneDeclarationTuple: function getTimeZoneDeclarationTuple(id, year) {
      var timeZoneInfo = tzCache.tryGet(id);
      return timeZoneInfo ? this.getTimeZoneDeclarationTupleCore(timeZoneInfo, year) : [];
    },
    getTimeZoneDeclarationTupleCore: function getTimeZoneDeclarationTupleCore(timeZoneInfo, year) {
      var offsetList = timeZoneInfo.offsetList;
      var offsetIndexList = timeZoneInfo.offsetIndexList;
      var dateList = timeZoneInfo.dateList;
      var tupleResult = [];
      for (var i = 0; i < dateList.length; i++) {
        var currentDate = dateList[i];
        var currentYear = new Date(currentDate).getFullYear();
        if (currentYear === year) {
          var offset = offsetList[offsetIndexList[i + 1]];
          tupleResult.push({
            date: currentDate,
            offset: -offset / 60
          });
        }
        if (currentYear > year) {
          break;
        }
      }
      return tupleResult;
    },
    getUtcOffset: function getUtcOffset(timeZoneInfo, dateTimeStamp) {
      var offsetList = timeZoneInfo.offsetList;
      var offsetIndexList = timeZoneInfo.offsetIndexList;
      var dateList = timeZoneInfo.dateList;
      var infinityUntilCorrection = 1;
      var lastIntervalStartIndex = dateList.length - 1 - infinityUntilCorrection;
      var index = lastIntervalStartIndex;
      while (index >= 0 && dateTimeStamp < dateList[index]) {
        index--;
      }
      var offset = offsetList[offsetIndexList[index + 1]];
      return -offset / 60 || offset;
    }
  };
  var _default = timeZoneDataUtils;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../data/query","../../../core/errors","./timezones_data","../../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../data/query"), require("../../../core/errors"), require("./timezones_data"), require("../../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.timezones_data.js.map