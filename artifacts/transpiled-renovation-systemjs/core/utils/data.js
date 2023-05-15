!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/data.js"], ["../errors","../class","./object","./type","./iterator","./variable_wrapper"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/data.js", ["../errors", "../class", "./object", "./type", "./iterator", "./variable_wrapper"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.toComparable = exports.getPathParts = exports.compileSetter = exports.compileGetter = void 0;
  var _errors = _interopRequireDefault($__require("../errors"));
  var _class = _interopRequireDefault($__require("../class"));
  var _object = $__require("./object");
  var _type = $__require("./type");
  var _iterator = $__require("./iterator");
  var _variable_wrapper = _interopRequireDefault($__require("./variable_wrapper"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var unwrapVariable = _variable_wrapper.default.unwrap;
  var isWrapped = _variable_wrapper.default.isWrapped;
  var assign = _variable_wrapper.default.assign;
  var bracketsToDots = function bracketsToDots(expr) {
    return expr.replace(/\[/g, '.').replace(/\]/g, '');
  };
  var getPathParts = function getPathParts(name) {
    return bracketsToDots(name).split('.');
  };
  exports.getPathParts = getPathParts;
  var readPropValue = function readPropValue(obj, propName, options) {
    options = options || {};
    if (propName === 'this') {
      return unwrap(obj, options);
    }
    return unwrap(obj[propName], options);
  };
  var assignPropValue = function assignPropValue(obj, propName, value, options) {
    if (propName === 'this') {
      throw new _errors.default.Error('E4016');
    }
    var propValue = obj[propName];
    if (options.unwrapObservables && isWrapped(propValue)) {
      assign(propValue, value);
    } else {
      obj[propName] = value;
    }
  };
  var prepareOptions = function prepareOptions(options) {
    options = options || {};
    options.unwrapObservables = options.unwrapObservables !== undefined ? options.unwrapObservables : true;
    return options;
  };
  function unwrap(value, options) {
    return options.unwrapObservables ? unwrapVariable(value) : value;
  }
  var compileGetter = function compileGetter(expr) {
    if (arguments.length > 1) {
      expr = [].slice.call(arguments);
    }
    if (!expr || expr === 'this') {
      return function (obj) {
        return obj;
      };
    }
    if (typeof expr === 'string') {
      var path = getPathParts(expr);
      return function (obj, options) {
        options = prepareOptions(options);
        var functionAsIs = options.functionsAsIs;
        var hasDefaultValue = 'defaultValue' in options;
        var current = unwrap(obj, options);
        for (var i = 0; i < path.length; i++) {
          if (!current) {
            if (current == null && hasDefaultValue) {
              return options.defaultValue;
            }
            break;
          }
          var pathPart = path[i];
          if (hasDefaultValue && (0, _type.isObject)(current) && !(pathPart in current)) {
            return options.defaultValue;
          }
          var next = unwrap(current[pathPart], options);
          if (!functionAsIs && (0, _type.isFunction)(next)) {
            next = next.call(current);
          }
          current = next;
        }
        return current;
      };
    }
    if (Array.isArray(expr)) {
      return combineGetters(expr);
    }
    if ((0, _type.isFunction)(expr)) {
      return expr;
    }
  };
  exports.compileGetter = compileGetter;
  function combineGetters(getters) {
    var compiledGetters = {};
    for (var i = 0, l = getters.length; i < l; i++) {
      var getter = getters[i];
      compiledGetters[getter] = compileGetter(getter);
    }
    return function (obj, options) {
      var result;
      (0, _iterator.each)(compiledGetters, function (name) {
        var value = this(obj, options);
        if (value === undefined) {
          return;
        }
        var current = result || (result = {});
        var path = name.split('.');
        var last = path.length - 1;
        for (var _i = 0; _i < last; _i++) {
          var pathItem = path[_i];
          if (!(pathItem in current)) {
            current[pathItem] = {};
          }
          current = current[pathItem];
        }
        current[path[last]] = value;
      });
      return result;
    };
  }
  var ensurePropValueDefined = function ensurePropValueDefined(obj, propName, value, options) {
    if ((0, _type.isDefined)(value)) {
      return value;
    }
    var newValue = {};
    assignPropValue(obj, propName, newValue, options);
    return newValue;
  };
  var compileSetter = function compileSetter(expr) {
    expr = getPathParts(expr || 'this');
    var lastLevelIndex = expr.length - 1;
    return function (obj, value, options) {
      options = prepareOptions(options);
      var currentValue = unwrap(obj, options);
      expr.forEach(function (propertyName, levelIndex) {
        var propertyValue = readPropValue(currentValue, propertyName, options);
        var isPropertyFunc = !options.functionsAsIs && (0, _type.isFunction)(propertyValue) && !isWrapped(propertyValue);
        if (levelIndex === lastLevelIndex) {
          if (options.merge && (0, _type.isPlainObject)(value) && (!(0, _type.isDefined)(propertyValue) || (0, _type.isPlainObject)(propertyValue))) {
            propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
            (0, _object.deepExtendArraySafe)(propertyValue, value, false, true);
          } else if (isPropertyFunc) {
            currentValue[propertyName](value);
          } else {
            assignPropValue(currentValue, propertyName, value, options);
          }
        } else {
          propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
          if (isPropertyFunc) {
            propertyValue = propertyValue.call(currentValue);
          }
          currentValue = propertyValue;
        }
      });
    };
  };
  exports.compileSetter = compileSetter;
  var toComparable = function toComparable(value, caseSensitive) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (value instanceof Date) {
      return value.getTime();
    }
    if (value && value instanceof _class.default && value.valueOf) {
      return value.valueOf();
    }
    if (!caseSensitive && typeof value === 'string') {
      var _options$collatorOpti;
      if ((options === null || options === void 0 ? void 0 : (_options$collatorOpti = options.collatorOptions) === null || _options$collatorOpti === void 0 ? void 0 : _options$collatorOpti.sensitivity) === 'base') {
        var REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
        value = value.normalize('NFD').replace(REMOVE_DIACRITICAL_MARKS_REGEXP, '');
      }
      return options !== null && options !== void 0 && options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();
    }
    return value;
  };
  exports.toComparable = toComparable;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../errors","../class","./object","./type","./iterator","./variable_wrapper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../errors"), require("../class"), require("./object"), require("./type"), require("./iterator"), require("./variable_wrapper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=data.js.map