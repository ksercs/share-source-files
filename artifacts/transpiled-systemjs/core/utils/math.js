!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/utils/math.js"], ["./type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/utils/math.js", ["./type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.adjust = adjust;
  exports.fitIntoRange = void 0;
  exports.getExponent = getExponent;
  exports.getExponentLength = getExponentLength;
  exports.getPrecision = getPrecision;
  exports.getRemainderByDivision = getRemainderByDivision;
  exports.getRoot = getRoot;
  exports.inRange = void 0;
  exports.multiplyInExponentialForm = multiplyInExponentialForm;
  exports.roundFloatPart = roundFloatPart;
  exports.sign = void 0;
  exports.solveCubicEquation = solveCubicEquation;
  exports.trunc = trunc;
  var _type = $__require("./type");
  var sign = function sign(value) {
    if (value === 0) {
      return 0;
    }
    return value / Math.abs(value);
  };
  exports.sign = sign;
  var fitIntoRange = function fitIntoRange(value, minValue, maxValue) {
    var isMinValueUndefined = !minValue && minValue !== 0;
    var isMaxValueUndefined = !maxValue && maxValue !== 0;
    isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value, maxValue) : value);
    isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value, minValue) : value);
    return Math.min(Math.max(value, minValue), maxValue);
  };
  exports.fitIntoRange = fitIntoRange;
  var inRange = function inRange(value, minValue, maxValue) {
    return value >= minValue && value <= maxValue;
  };
  exports.inRange = inRange;
  function getExponent(value) {
    return Math.abs(parseInt(value.toExponential().split('e')[1]));
  }
  function getExponentialNotation(value) {
    var parts = value.toExponential().split('e');
    var mantissa = parseFloat(parts[0]);
    var exponent = parseInt(parts[1]);
    return {
      exponent: exponent,
      mantissa: mantissa
    };
  }
  function multiplyInExponentialForm(value, exponentShift) {
    var exponentialNotation = getExponentialNotation(value);
    return parseFloat("".concat(exponentialNotation.mantissa, "e").concat(exponentialNotation.exponent + exponentShift));
  }

  // T570217
  function _isEdgeBug() {
    var value = 0.0003;
    var correctValue = '0.000300';
    var precisionValue = 3;
    return correctValue !== value.toPrecision(precisionValue);
  }
  function adjust(value, interval) {
    var precision = getPrecision(interval || 0) + 2;
    var separatedValue = value.toString().split('.');
    var sourceValue = value;
    var absValue = Math.abs(value);
    var separatedAdjustedValue;
    var isExponentValue = (0, _type.isExponential)(value);
    var integerPart = absValue > 1 ? 10 : 0;
    if (separatedValue.length === 1) {
      return value;
    }
    if (!isExponentValue) {
      if ((0, _type.isExponential)(interval)) {
        precision = separatedValue[0].length + getExponent(interval);
      }
      value = absValue;
      value = value - Math.floor(value) + integerPart;
    }
    precision = _isEdgeBug() && getExponent(value) > 6 || precision > 7 ? 15 : 7; // fix toPrecision() bug in Edge (T570217)

    if (!isExponentValue) {
      separatedAdjustedValue = parseFloat(value.toPrecision(precision)).toString().split('.');
      if (separatedAdjustedValue[0] === integerPart.toString()) {
        return parseFloat(separatedValue[0] + '.' + separatedAdjustedValue[1]);
      }
    }
    return parseFloat(sourceValue.toPrecision(precision));
  }
  function getPrecision(value) {
    var str = value.toString();
    if (str.indexOf('.') < 0) {
      return 0;
    }
    var mantissa = str.split('.');
    var positionOfDelimiter = mantissa[1].indexOf('e');
    return positionOfDelimiter >= 0 ? positionOfDelimiter : mantissa[1].length;
  }
  function getRoot(x, n) {
    if (x < 0 && n % 2 !== 1) {
      return NaN;
    }
    var y = Math.pow(Math.abs(x), 1 / n);
    return n % 2 === 1 && x < 0 ? -y : y;
  }
  function solveCubicEquation(a, b, c, d) {
    var min = 1e-8;
    if (Math.abs(a) < min) {
      a = b;
      b = c;
      c = d;
      if (Math.abs(a) < min) {
        a = b;
        b = c;
        if (Math.abs(a) < min) {
          return [];
        }
        return [-b / a];
      }
      var D2 = b * b - 4 * a * c;
      if (Math.abs(D2) < min) {
        return [-b / (2 * a)];
      } else if (D2 > 0) {
        return [(-b + Math.sqrt(D2)) / (2 * a), (-b - Math.sqrt(D2)) / (2 * a)];
      }
      return [];
    }
    var p = (3 * a * c - b * b) / (3 * a * a);
    var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    var roots;
    var u;
    if (Math.abs(p) < min) {
      roots = [getRoot(-q, 3)];
    } else if (Math.abs(q) < min) {
      roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
      var D3 = q * q / 4 + p * p * p / 27;
      if (Math.abs(D3) < min) {
        roots = [-1.5 * q / p, 3 * q / p];
      } else if (D3 > 0) {
        u = getRoot(-q / 2 - Math.sqrt(D3), 3);
        roots = [u - p / (3 * u)];
      } else {
        u = 2 * Math.sqrt(-p / 3);
        var t = Math.acos(3 * q / p / u) / 3;
        var k = 2 * Math.PI / 3;
        roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
      }
    }
    for (var i = 0; i < roots.length; i++) {
      roots[i] -= b / (3 * a);
    }
    return roots;
  }
  function trunc(value) {
    return Math.trunc ? Math.trunc(value) : value > 0 ? Math.floor(value) : Math.ceil(value);
  }
  function getRemainderByDivision(dividend, divider, digitsCount) {
    if (divider === parseInt(divider)) {
      return dividend % divider;
    }
    var quotient = roundFloatPart(dividend / divider, digitsCount);
    return (quotient - parseInt(quotient)) * divider;
  }
  function getExponentLength(value) {
    var _valueString$split$;
    var valueString = value.toString();
    return ((_valueString$split$ = valueString.split('.')[1]) === null || _valueString$split$ === void 0 ? void 0 : _valueString$split$.length) || parseInt(valueString.split('e-')[1]) || 0;
  }
  function roundFloatPart(value) {
    var digitsCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return parseFloat(value.toFixed(digitsCount));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=math.js.map