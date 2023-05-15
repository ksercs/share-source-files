!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/ldml/date.format.js"], ["../number"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/ldml/date.format.js", ["../number"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getFormat = void 0;
  var _number = _interopRequireDefault($__require("../number"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ARABIC_COMMA = "\u060C";
  var FORMAT_SEPARATORS = ' .,:;/\\<>()-[]' + ARABIC_COMMA;
  var AM_PM_PATTERN = '. m.';
  var checkDigit = function checkDigit(char) {
    var code = char && _number.default.convertDigits(char, false).charCodeAt(0);
    var zeroCode = _number.default.convertDigits('0', false).charCodeAt(0);
    return zeroCode <= code && code < zeroCode + 10;
  };
  var checkPatternContinue = function checkPatternContinue(text, patterns, index, isDigit) {
    var char = text[index];
    var nextChar = text[index + 1];
    if (!isDigit) {
      if (char === '.' || char === ' ' && text.slice(index - 1, index + 3) === AM_PM_PATTERN) {
        return true;
      }
      if (char === '-' && !checkDigit(nextChar)) {
        return true;
      }
    }
    var isDigitChanged = isDigit && patterns.some(function (pattern) {
      return text[index] !== pattern[index];
    });
    return FORMAT_SEPARATORS.indexOf(char) < 0 && isDigit === checkDigit(char) && (!isDigit || isDigitChanged);
  };
  var getPatternStartIndex = function getPatternStartIndex(defaultPattern, index) {
    if (!checkDigit(defaultPattern[index])) {
      while (index > 0 && !checkDigit(defaultPattern[index - 1]) && (defaultPattern[index - 1] === '.' || FORMAT_SEPARATORS.indexOf(defaultPattern[index - 1]) < 0)) {
        index--;
      }
    }
    return index;
  };
  var getDifference = function getDifference(defaultPattern, patterns, processedIndexes, isDigit) {
    var i = 0;
    var result = [];
    var patternsFilter = function patternsFilter(pattern) {
      return defaultPattern[i] !== pattern[i] && (isDigit === undefined || checkDigit(defaultPattern[i]) === isDigit);
    };
    if (!Array.isArray(patterns)) {
      patterns = [patterns];
    }
    for (i = 0; i < defaultPattern.length; i++) {
      if (processedIndexes.indexOf(i) < 0 && patterns.filter(patternsFilter).length) {
        i = getPatternStartIndex(defaultPattern, i);
        do {
          isDigit = checkDigit(defaultPattern[i]);
          if (!result.length && !isDigit && checkDigit(patterns[0][i])) {
            break;
          }
          result.push(i);
          processedIndexes.unshift(i);
          i++;
        } while (defaultPattern[i] && checkPatternContinue(defaultPattern, patterns, i, isDigit));
        break;
      }
    }
    if (result.length === 1 && (defaultPattern[processedIndexes[0] - 1] === '0' || defaultPattern[processedIndexes[0] - 1] === '٠')) {
      processedIndexes.unshift(processedIndexes[0] - 1);
    }
    return result;
  };
  var replaceCharsCore = function replaceCharsCore(pattern, indexes, char, patternPositions) {
    var baseCharIndex = indexes[0];
    var patternIndex = baseCharIndex < patternPositions.length ? patternPositions[baseCharIndex] : baseCharIndex;
    indexes.forEach(function (_, index) {
      pattern = pattern.substr(0, patternIndex + index) + (char.length > 1 ? char[index] : char) + pattern.substr(patternIndex + index + 1);
    });
    if (indexes.length === 1) {
      pattern = pattern.replace('0' + char, char + char);
      pattern = pattern.replace('٠' + char, char + char);
    }
    return pattern;
  };
  var replaceChars = function replaceChars(pattern, indexes, char, patternPositions) {
    var i;
    var index;
    var patternIndex;
    if (!checkDigit(pattern[indexes[0]] || '0')) {
      var letterCount = Math.max(indexes.length <= 3 ? 3 : 4, char.length);
      while (indexes.length > letterCount) {
        index = indexes.pop();
        patternIndex = patternPositions[index];
        patternPositions[index] = -1;
        for (i = index + 1; i < patternPositions.length; i++) {
          patternPositions[i]--;
        }
        pattern = pattern.substr(0, patternIndex) + pattern.substr(patternIndex + 1);
      }
      index = indexes[indexes.length - 1] + 1, patternIndex = index < patternPositions.length ? patternPositions[index] : index;
      while (indexes.length < letterCount) {
        indexes.push(indexes[indexes.length - 1] + 1);
        for (i = index; i < patternPositions.length; i++) {
          patternPositions[i]++;
        }
        pattern = pattern.substr(0, patternIndex) + ' ' + pattern.substr(patternIndex);
      }
    }
    pattern = replaceCharsCore(pattern, indexes, char, patternPositions);
    return pattern;
  };
  var formatValue = function formatValue(value, formatter) {
    if (Array.isArray(value)) {
      return value.map(function (value) {
        return (formatter(value) || '').toString();
      });
    }
    return (formatter(value) || '').toString();
  };
  var ESCAPE_CHARS_REGEXP = /[a-zA-Z]/g;
  var escapeChars = function escapeChars(pattern, defaultPattern, processedIndexes, patternPositions) {
    var escapeIndexes = defaultPattern.split('').map(function (char, index) {
      if (processedIndexes.indexOf(index) < 0 && (char.match(ESCAPE_CHARS_REGEXP) || char === '\'')) {
        return patternPositions[index];
      }
      return -1;
    });
    pattern = pattern.split('').map(function (char, index) {
      var result = char;
      var isCurrentCharEscaped = escapeIndexes.indexOf(index) >= 0;
      var isPrevCharEscaped = index > 0 && escapeIndexes.indexOf(index - 1) >= 0;
      var isNextCharEscaped = escapeIndexes.indexOf(index + 1) >= 0;
      if (isCurrentCharEscaped) {
        if (!isPrevCharEscaped) {
          result = '\'' + result;
        }
        if (!isNextCharEscaped) {
          result = result + '\'';
        }
      }
      return result;
    }).join('');
    return pattern;
  };
  var getFormat = function getFormat(formatter) {
    var processedIndexes = [];
    var defaultPattern = formatValue(new Date(2009, 8, 8, 6, 5, 4), formatter);
    var patternPositions = defaultPattern.split('').map(function (_, index) {
      return index;
    });
    var result = defaultPattern;
    var replacedPatterns = {};
    var datePatterns = [{
      date: new Date(2009, 8, 8, 6, 5, 4, 111),
      pattern: 'S'
    }, {
      date: new Date(2009, 8, 8, 6, 5, 2),
      pattern: 's'
    }, {
      date: new Date(2009, 8, 8, 6, 2, 4),
      pattern: 'm'
    }, {
      date: new Date(2009, 8, 8, 18, 5, 4),
      pattern: 'H',
      isDigit: true
    }, {
      date: new Date(2009, 8, 8, 2, 5, 4),
      pattern: 'h',
      isDigit: true
    }, {
      date: new Date(2009, 8, 8, 18, 5, 4),
      pattern: 'a',
      isDigit: false
    }, {
      date: new Date(2009, 8, 1, 6, 5, 4),
      pattern: 'd'
    }, {
      date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
      pattern: 'E'
    }, {
      date: new Date(2009, 9, 6, 6, 5, 4),
      pattern: 'M'
    }, {
      date: new Date(1998, 8, 8, 6, 5, 4),
      pattern: 'y'
    }];
    if (!result) return;
    datePatterns.forEach(function (test) {
      var diff = getDifference(defaultPattern, formatValue(test.date, formatter), processedIndexes, test.isDigit);
      var pattern = test.pattern === 'M' && !replacedPatterns['d'] ? 'L' : test.pattern;
      result = replaceChars(result, diff, pattern, patternPositions);
      replacedPatterns[pattern] = diff.length;
    });
    result = escapeChars(result, defaultPattern, processedIndexes, patternPositions);
    if (processedIndexes.length) {
      return result;
    }
  };
  exports.getFormat = getFormat;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../number"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../number"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.format.js.map