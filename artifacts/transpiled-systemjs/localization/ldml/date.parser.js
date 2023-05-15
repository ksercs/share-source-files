!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/ldml/date.parser.js"], ["../../core/utils/common","../../core/utils/console"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/ldml/date.parser.js", ["../../core/utils/common", "../../core/utils/console"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isPossibleForParsingFormat = exports.getRegExpInfo = exports.getPatternSetters = exports.getParser = void 0;
  var _common = $__require("../../core/utils/common");
  var _console = $__require("../../core/utils/console");
  var FORMAT_TYPES = {
    '3': 'abbreviated',
    '4': 'wide',
    '5': 'narrow'
  };
  var monthRegExpGenerator = function monthRegExpGenerator(count, dateParts) {
    if (count > 2) {
      return Object.keys(FORMAT_TYPES).map(function (count) {
        return ['format', 'standalone'].map(function (type) {
          return dateParts.getMonthNames(FORMAT_TYPES[count], type).join('|');
        }).join('|');
      }).join('|');
    }
    return count === 2 ? '1[012]|0?[1-9]' : '0??[1-9]|1[012]';
  };
  var PATTERN_REGEXPS = {
    ':': function _(count, dateParts) {
      var countSuffix = count > 1 ? "{".concat(count, "}") : '';
      var timeSeparator = (0, _common.escapeRegExp)(dateParts.getTimeSeparator());
      timeSeparator !== ':' && (timeSeparator = "".concat(timeSeparator, "|:"));
      return "".concat(timeSeparator).concat(countSuffix);
    },
    y: function y(count) {
      return count === 2 ? "[0-9]{".concat(count, "}") : '[0-9]+?';
    },
    M: monthRegExpGenerator,
    L: monthRegExpGenerator,
    Q: function Q(count, dateParts) {
      if (count > 2) {
        return dateParts.getQuarterNames(FORMAT_TYPES[count], 'format').join('|');
      }
      return '0?[1-4]';
    },
    E: function E(count, dateParts) {
      return '\\D*';
    },
    a: function a(count, dateParts) {
      return dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], 'format').join('|');
    },
    d: function d(count) {
      return count === 2 ? '3[01]|[12][0-9]|0?[1-9]' : '0??[1-9]|[12][0-9]|3[01]';
    },
    H: function H(count) {
      return count === 2 ? '2[0-3]|1[0-9]|0?[0-9]' : '0??[0-9]|1[0-9]|2[0-3]';
    },
    h: function h(count) {
      return count === 2 ? '1[012]|0?[1-9]' : '0??[1-9]|1[012]';
    },
    m: function m(count) {
      return count === 2 ? '[1-5][0-9]|0?[0-9]' : '0??[0-9]|[1-5][0-9]';
    },
    s: function s(count) {
      return count === 2 ? '[1-5][0-9]|0?[0-9]' : '0??[0-9]|[1-5][0-9]';
    },
    S: function S(count) {
      return "[0-9]{1,".concat(count, "}");
    },
    w: function w(count) {
      return count === 2 ? '[1-5][0-9]|0?[0-9]' : '0??[0-9]|[1-5][0-9]';
    }
  };
  var parseNumber = Number;
  var caseInsensitiveIndexOf = function caseInsensitiveIndexOf(array, value) {
    return array.map(function (item) {
      return item.toLowerCase();
    }).indexOf(value.toLowerCase());
  };
  var monthPatternParser = function monthPatternParser(text, count, dateParts) {
    if (count > 2) {
      return ['format', 'standalone'].map(function (type) {
        return Object.keys(FORMAT_TYPES).map(function (count) {
          var monthNames = dateParts.getMonthNames(FORMAT_TYPES[count], type);
          return caseInsensitiveIndexOf(monthNames, text);
        });
      }).reduce(function (a, b) {
        return a.concat(b);
      }).filter(function (index) {
        return index >= 0;
      })[0];
    }
    return parseNumber(text) - 1;
  };
  var PATTERN_PARSERS = {
    y: function y(text, count) {
      var year = parseNumber(text);
      if (count === 2) {
        return year < 30 ? 2000 + year : 1900 + year;
      }
      return year;
    },
    M: monthPatternParser,
    L: monthPatternParser,
    Q: function Q(text, count, dateParts) {
      if (count > 2) {
        return dateParts.getQuarterNames(FORMAT_TYPES[count], 'format').indexOf(text);
      }
      return parseNumber(text) - 1;
    },
    E: function E(text, count, dateParts) {
      var dayNames = dateParts.getDayNames(FORMAT_TYPES[count < 3 ? 3 : count], 'format');
      return caseInsensitiveIndexOf(dayNames, text);
    },
    a: function a(text, count, dateParts) {
      var periodNames = dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], 'format');
      return caseInsensitiveIndexOf(periodNames, text);
    },
    d: parseNumber,
    H: parseNumber,
    h: parseNumber,
    m: parseNumber,
    s: parseNumber,
    S: function S(text, count) {
      count = Math.max(count, 3);
      text = text.slice(0, 3);
      while (count < 3) {
        text = text + '0';
        count++;
      }
      return parseNumber(text);
    }
  };
  var ORDERED_PATTERNS = ['y', 'M', 'd', 'h', 'm', 's', 'S'];
  var PATTERN_SETTERS = {
    y: 'setFullYear',
    M: 'setMonth',
    L: 'setMonth',
    a: function a(date, value, datePartValues) {
      var hours = date.getHours();
      var hourPartValue = datePartValues['h'];
      if (hourPartValue !== undefined && hourPartValue !== hours) {
        hours--;
      }
      if (!value && hours === 12) {
        hours = 0;
      } else if (value && hours !== 12) {
        hours += 12;
      }
      date.setHours(hours);
    },
    d: 'setDate',
    H: 'setHours',
    h: 'setHours',
    m: 'setMinutes',
    s: 'setSeconds',
    S: 'setMilliseconds'
  };
  var getSameCharCount = function getSameCharCount(text, index) {
    var char = text[index];
    if (!char) {
      return 0;
    }
    var count = 0;
    do {
      index++;
      count++;
    } while (text[index] === char);
    return count;
  };
  var createPattern = function createPattern(char, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
      result += char;
    }
    return result;
  };
  var getRegExpInfo = function getRegExpInfo(format, dateParts) {
    var regexpText = '';
    var stubText = '';
    var isEscaping;
    var patterns = [];
    var addPreviousStub = function addPreviousStub() {
      if (stubText) {
        patterns.push("'".concat(stubText, "'"));
        regexpText += "".concat((0, _common.escapeRegExp)(stubText), ")");
        stubText = '';
      }
    };
    for (var i = 0; i < format.length; i++) {
      var char = format[i];
      var isEscapeChar = char === '\'';
      var regexpPart = PATTERN_REGEXPS[char];
      if (isEscapeChar) {
        isEscaping = !isEscaping;
        if (format[i - 1] !== '\'') {
          continue;
        }
      }
      if (regexpPart && !isEscaping) {
        var count = getSameCharCount(format, i);
        var pattern = createPattern(char, count);
        addPreviousStub();
        patterns.push(pattern);
        regexpText += "(".concat(regexpPart(count, dateParts), ")");
        i += count - 1;
      } else {
        if (!stubText) {
          regexpText += '(';
        }
        stubText += char;
      }
    }
    addPreviousStub();
    if (!isPossibleForParsingFormat(patterns)) {
      _console.logger.warn("The following format may be parsed incorrectly: ".concat(format, "."));
    }
    return {
      patterns: patterns,
      regexp: new RegExp("^".concat(regexpText, "$"), 'i')
    };
  };
  exports.getRegExpInfo = getRegExpInfo;
  var digitFieldSymbols = ['d', 'H', 'h', 'm', 's', 'w', 'M', 'L', 'Q'];
  var isPossibleForParsingFormat = function isPossibleForParsingFormat(patterns) {
    var isDigitPattern = function isDigitPattern(pattern) {
      if (!pattern) {
        return false;
      }
      var char = pattern[0];
      return ['y', 'S'].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3;
    };
    var isAmbiguousDigitPattern = function isAmbiguousDigitPattern(pattern) {
      return pattern[0] !== 'S' && pattern.length !== 2;
    };
    var possibleForParsing = true;
    var ambiguousDigitPatternsCount = 0;
    return patterns.every(function (pattern, index, patterns) {
      if (isDigitPattern(pattern)) {
        if (isAmbiguousDigitPattern(pattern)) {
          possibleForParsing = ++ambiguousDigitPatternsCount < 2;
        }
        if (!isDigitPattern(patterns[index + 1])) {
          ambiguousDigitPatternsCount = 0;
        }
      }
      return possibleForParsing;
    });
  };
  exports.isPossibleForParsingFormat = isPossibleForParsingFormat;
  var getPatternSetters = function getPatternSetters() {
    return PATTERN_SETTERS;
  };
  exports.getPatternSetters = getPatternSetters;
  var setPatternPart = function setPatternPart(date, pattern, text, dateParts, datePartValues) {
    var patternChar = pattern[0];
    var partSetter = PATTERN_SETTERS[patternChar];
    var partParser = PATTERN_PARSERS[patternChar];
    if (partSetter && partParser) {
      var value = partParser(text, pattern.length, dateParts);
      datePartValues[pattern] = value;
      if (date[partSetter]) {
        date[partSetter](value);
      } else {
        partSetter(date, value, datePartValues);
      }
    }
  };
  var setPatternPartFromNow = function setPatternPartFromNow(date, pattern, now) {
    var setterName = PATTERN_SETTERS[pattern];
    var getterName = 'g' + setterName.substr(1);
    var value = now[getterName]();
    date[setterName](value);
  };
  var getShortPatterns = function getShortPatterns(fullPatterns) {
    return fullPatterns.map(function (pattern) {
      if (pattern[0] === '\'') {
        return '';
      } else {
        return pattern[0] === 'H' ? 'h' : pattern[0];
      }
    });
  };
  var getMaxOrderedPatternIndex = function getMaxOrderedPatternIndex(patterns) {
    var indexes = patterns.map(function (pattern) {
      return ORDERED_PATTERNS.indexOf(pattern);
    });
    return Math.max.apply(Math, indexes);
  };
  var getOrderedFormatPatterns = function getOrderedFormatPatterns(formatPatterns) {
    var otherPatterns = formatPatterns.filter(function (pattern) {
      return ORDERED_PATTERNS.indexOf(pattern) < 0;
    });
    return ORDERED_PATTERNS.concat(otherPatterns);
  };
  var getParser = function getParser(format, dateParts) {
    var regExpInfo = getRegExpInfo(format, dateParts);
    return function (text) {
      var regExpResult = regExpInfo.regexp.exec(text);
      if (regExpResult) {
        var now = new Date();
        var date = new Date(now.getFullYear(), 0, 1);
        var formatPatterns = getShortPatterns(regExpInfo.patterns);
        var maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
        var orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
        var datePartValues = {};
        orderedFormatPatterns.forEach(function (pattern, index) {
          if (!pattern || index < ORDERED_PATTERNS.length && index > maxPatternIndex) {
            return;
          }
          var patternIndex = formatPatterns.indexOf(pattern);
          if (patternIndex >= 0) {
            var regExpPattern = regExpInfo.patterns[patternIndex];
            var regExpText = regExpResult[patternIndex + 1];
            setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues);
          } else {
            setPatternPartFromNow(date, pattern, now);
          }
        });
        return date;
      }
      return null;
    };
  };
  exports.getParser = getParser;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/console"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/console"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.parser.js.map