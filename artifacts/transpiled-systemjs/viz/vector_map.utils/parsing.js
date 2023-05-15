!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/vector_map.utils/parsing.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled/viz/vector_map.utils/parsing.js', [], true, function ($__require, exports, module) {
  "use strict";

  /* eslint-disable no-undef, no-var, one-var, import/no-commonjs*/

  var global = this || self,
      GLOBAL = global;
  function noop() {}
  function eigen(x) {
    return x;
  }
  function isFunction(target) {
    return typeof target === 'function';
  }
  function wrapSource(source) {
    var buffer = wrapBuffer(source);
    var position = 0;
    var stream = {
      pos: function pos() {
        return position;
      },
      skip: function skip(count) {
        position += count;
        return stream;
      },
      ui8arr: function ui8arr(length) {
        var i = 0;
        var list = [];
        list.length = length;
        for (; i < length; ++i) {
          list[i] = stream.ui8();
        }
        return list;
      },
      ui8: function (_ui) {
        function ui8() {
          return _ui.apply(this, arguments);
        }
        ui8.toString = function () {
          return _ui.toString();
        };
        return ui8;
      }(function () {
        var val = ui8(buffer, position);
        position += 1;
        return val;
      }),
      ui16LE: function (_ui16LE) {
        function ui16LE() {
          return _ui16LE.apply(this, arguments);
        }
        ui16LE.toString = function () {
          return _ui16LE.toString();
        };
        return ui16LE;
      }(function () {
        var val = ui16LE(buffer, position);
        position += 2;
        return val;
      }),
      ui32LE: function (_ui32LE) {
        function ui32LE() {
          return _ui32LE.apply(this, arguments);
        }
        ui32LE.toString = function () {
          return _ui32LE.toString();
        };
        return ui32LE;
      }(function () {
        var val = ui32LE(buffer, position);
        position += 4;
        return val;
      }),
      ui32BE: function (_ui32BE) {
        function ui32BE() {
          return _ui32BE.apply(this, arguments);
        }
        ui32BE.toString = function () {
          return _ui32BE.toString();
        };
        return ui32BE;
      }(function () {
        var val = ui32BE(buffer, position);
        position += 4;
        return val;
      }),
      f64LE: function (_f64LE) {
        function f64LE() {
          return _f64LE.apply(this, arguments);
        }
        f64LE.toString = function () {
          return _f64LE.toString();
        };
        return f64LE;
      }(function () {
        var val = f64LE(buffer, position);
        position += 8;
        return val;
      })
    };
    return stream;
  }
  function parseCore(source, roundCoordinates, errors) {
    var shapeData = source[0] ? parseShape(wrapSource(source[0]), errors) : {};
    var dataBaseFileData = source[1] ? parseDBF(wrapSource(source[1]), errors) : {};
    var features = buildFeatures(shapeData.shapes || [], dataBaseFileData.records || [], roundCoordinates);
    var result;
    if (features.length) {
      result = {
        type: 'FeatureCollection',
        features: features
      };
      result['bbox'] = shapeData.bBox;
    } else {
      result = null;
    }
    return result;
  }
  function buildFeatures(shapeData, dataBaseFileData, roundCoordinates) {
    var features = [];
    var i;
    var ii = features.length = Math.max(shapeData.length, dataBaseFileData.length);
    var shape;
    for (i = 0; i < ii; ++i) {
      shape = shapeData[i] || {};
      features[i] = {
        type: 'Feature',
        geometry: {
          type: shape.geoJSON_type || null,
          coordinates: shape.coordinates ? roundCoordinates(shape.coordinates) : []
        },
        properties: dataBaseFileData[i] || null
      };
    }
    return features;
  }
  function createCoordinatesRounder(precision) {
    var factor = Number('1E' + precision);
    function round(x) {
      return Math.round(x * factor) / factor;
    }
    function process(values) {
      return values.map(values[0].length ? process : round);
    }
    return process;
  }
  function buildParseArgs(source) {
    source = source || {};
    return ['shp', 'dbf'].map(function (key) {
      return function (done) {
        if (source.substr) {
          key = '.' + key;
          sendRequest(source + (source.substr(-key.length).toLowerCase() === key ? '' : key), function (e, response) {
            done(e, response);
          });
        } else {
          done(null, source[key] || null);
        }
      };
    });
  }
  function parse(source, parameters, callback) {
    var result;
    when(buildParseArgs(source), function (errorArray, dataArray) {
      callback = isFunction(parameters) && parameters || isFunction(callback) && callback || noop;
      parameters = !isFunction(parameters) && parameters || {};
      var errors = [];
      errorArray.forEach(function (e) {
        e && errors.push(e);
      });
      result = parseCore(dataArray, parameters.precision >= 0 ? createCoordinatesRounder(parameters.precision) : eigen, errors);
      // NOTE: The order of the error and the result is reversed because of backward compatibility
      callback(result, errors.length ? errors : null);
    });
    return result;
  }
  exports.parse = parse;
  function when(actions, callback) {
    var errorArray = [];
    var dataArray = [];
    var counter = 1;
    var lock = true;
    actions.forEach(function (action, i) {
      ++counter;
      action(function (e, data) {
        errorArray[i] = e;
        dataArray[i] = data;
        massDone();
      });
    });
    lock = false;
    massDone();
    function massDone() {
      --counter;
      if (counter === 0 && !lock) {
        callback(errorArray, dataArray);
      }
    }
  }
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
//# sourceMappingURL=parsing.js.map