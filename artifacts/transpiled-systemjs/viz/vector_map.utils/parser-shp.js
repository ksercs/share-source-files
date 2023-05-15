!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/vector_map.utils/parser-shp.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('artifacts/transpiled/viz/vector_map.utils/parser-shp.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    "use strict";

    /* eslint-disable no-undef, no-unused-vars, no-var, one-var*/

    $__global['parseShapeRecord'] = parseShapeRecord;
    $__global['merge_XYZM'] = merge_XYZM;
    $__global['merge_XYM'] = merge_XYM;
    $__global['readPointArray'] = readPointArray;
    $__global['readPair'] = readPair;
    $__global['readBBox'] = readBBox;
    $__global['readDoubleArray'] = readDoubleArray;
    $__global['readIntegerArray'] = readIntegerArray;
    $__global['readInteger'] = readInteger;
    $__global['parseShapeHeader'] = parseShapeHeader;
    $__global['readMultiPatchShape'] = readMultiPatchShape;
    $__global['readPolyLineZShape'] = readPolyLineZShape;
    $__global['readMultiPointZShape'] = readMultiPointZShape;
    $__global['readPointZShape'] = readPointZShape;
    $__global['readPolyLineMShape'] = readPolyLineMShape;
    $__global['readMultiPointMShape'] = readMultiPointMShape;
    $__global['readPointMShape'] = readPointMShape;
    $__global['readMultiPointShape'] = readMultiPointShape;
    $__global['readPolyLineShape'] = readPolyLineShape;
    $__global['readPointShape'] = readPointShape;
    $__global['parseShape'] = parseShape;
    var SHP_TYPES = $__global['SHP_TYPES'],
        SHP_RECORD_PARSERS = $__global['SHP_RECORD_PARSERS'],
        SHP_TYPE_TO_GEOJSON_TYPE_MAP = $__global['SHP_TYPE_TO_GEOJSON_TYPE_MAP'];
    function parseShape(stream, errors) {
      var timeStart;
      var timeEnd;
      var header;
      var records = [];
      var record;
      try {
        timeStart = new Date();
        header = parseShapeHeader(stream);
      } catch (e) {
        errors.push('shp: header parsing error: ' + e.message + ' / ' + e.description);
        return;
      }
      if (header.fileCode !== 9994) {
        errors.push('shp: file code: ' + header.fileCode + ' / expected: 9994');
      }
      if (header.version !== 1000) {
        errors.push('shp: file version: ' + header.version + ' / expected: 1000');
      }
      try {
        while (stream.pos() < header.fileLength) {
          record = parseShapeRecord(stream, header.type, errors);
          if (record) {
            records.push(record);
          } else {
            break;
          }
        }
        if (stream.pos() !== header.fileLength) {
          errors.push('shp: file length: ' + header.fileLength + ' / actual: ' + stream.pos());
        }
        timeEnd = new Date();
      } catch (e) {
        errors.push('shp: records parsing error: ' + e.message + ' / ' + e.description);
      }
      return {
        bBox: header.bBox_XY,
        type: header.shapeType,
        shapes: records,
        errors: errors,
        time: timeEnd - timeStart
      };
    }
    function readPointShape(stream, record) {
      record.coordinates = readPointArray(stream, 1)[0];
    }
    function readPolyLineShape(stream, record) {
      var bBox = readBBox(stream);
      var numParts = readInteger(stream);
      var numPoints = readInteger(stream);
      var parts = readIntegerArray(stream, numParts);
      var points = readPointArray(stream, numPoints);
      var rings = [];
      var i;
      rings.length = numParts;
      for (i = 0; i < numParts; ++i) {
        rings[i] = points.slice(parts[i], parts[i + 1] || numPoints);
      }
      record.bBox = bBox;
      record.coordinates = rings;
    }
    function readMultiPointShape(stream, record) {
      record.bBox = readBBox(stream);
      record.coordinates = readPointArray(stream, readInteger(stream));
    }
    function readPointMShape(stream, record) {
      record.coordinates = readPointArray(stream, 1)[0];
      record.coordinates.push(readDoubleArray(stream, 1)[0]);
    }
    function readMultiPointMShape(stream, record) {
      var bBox = readBBox(stream);
      var numPoints = readInteger(stream);
      var points = readPointArray(stream, numPoints);
      var mBox = readPair(stream);
      var mValues = readDoubleArray(stream, numPoints);
      record.bBox = bBox;
      record.mBox = mBox;
      record.coordinates = merge_XYM(points, mValues, numPoints);
    }
    function readPolyLineMShape(stream, record) {
      var bBox = readBBox(stream);
      var numParts = readInteger(stream);
      var numPoints = readInteger(stream);
      var parts = readIntegerArray(stream, numParts);
      var points = readPointArray(stream, numPoints);
      var mBox = readPair(stream);
      var mValues = readDoubleArray(stream, numPoints);
      var rings = [];
      var i;
      var from;
      var to;
      rings.length = numParts;
      for (i = 0; i < numParts; ++i) {
        from = parts[i];
        to = parts[i + 1] || numPoints;
        rings[i] = merge_XYM(points.slice(from, to), mValues.slice(from, to), to - from);
      }
      record.bBox = bBox;
      record.mBox = mBox;
      record.coordinates = rings;
    }
    function readPointZShape(stream, record) {
      record.coordinates = readPointArray(stream, 1)[0];
      record.push(readDoubleArray(stream, 1)[0], readDoubleArray(stream, 1)[0]);
    }
    function readMultiPointZShape(stream, record) {
      var bBox = readBBox(stream);
      var numPoints = readInteger(stream);
      var points = readPointArray(stream, numPoints);
      var zBox = readPair(stream);
      var zValues = readDoubleArray(stream, numPoints);
      var mBox = readPair(stream);
      var mValue = readDoubleArray(stream, numPoints);
      record.bBox = bBox;
      record.zBox = zBox;
      record.mBox = mBox;
      record.coordinates = merge_XYZM(points, zValues, mValue, numPoints);
    }
    function readPolyLineZShape(stream, record) {
      var bBox = readBBox(stream);
      var numParts = readInteger(stream);
      var numPoints = readInteger(stream);
      var parts = readIntegerArray(stream, numParts);
      var points = readPointArray(stream, numPoints);
      var zBox = readPair(stream);
      var zValues = readDoubleArray(stream, numPoints);
      var mBox = readPair(stream);
      var mValues = readDoubleArray(stream, numPoints);
      var rings = [];
      var i;
      var from;
      var to;
      rings.length = numParts;
      for (i = 0; i < numParts; ++i) {
        from = parts[i];
        to = parts[i + 1] || numPoints;
        rings[i] = merge_XYZM(points.slice(from, to), zValues.slice(from, to), mValues.slice(from, to), to - from);
      }
      record.bBox = bBox;
      record.zBox = zBox;
      record.mBox = mBox;
      record.coordinates = rings;
    }
    function readMultiPatchShape(stream, record) {
      var bBox = readBBox(stream);
      var numParts = readInteger(stream);
      var numPoints = readInteger(stream);
      var parts = readIntegerArray(stream, numParts);
      var partTypes = readIntegerArray(stream, numParts);
      var points = readPointArray(stream, numPoints);
      var zBox = readPair(stream);
      var zValues = readDoubleArray(stream, numPoints);
      var mBox = readPair(stream);
      var rings = [];
      var i;
      var from;
      var to;
      rings.length = numParts;
      for (i = 0; i < numParts; ++i) {
        from = parts[i];
        to = parts[i + 1] || numPoints;
        rings[i] = merge_XYZM(points.slice(from, to), zValues.slice(from, to), mValues.slice(from, to), to - from);
      }
      record.bBox = bBox;
      record.zBox = zBox;
      record.mBox = mBox;
      record.types = partTypes;
      record.coordinates = rings;
    }
    var SHP_TYPES = {
      0: 'Null',
      1: 'Point',
      3: 'PolyLine',
      5: 'Polygon',
      8: 'MultiPoint',
      11: 'PointZ',
      13: 'PolyLineZ',
      15: 'PolygonZ',
      18: 'MultiPointZ',
      21: 'PointM',
      23: 'PolyLineM',
      25: 'PolygonM',
      28: 'MultiPointM',
      31: 'MultiPatch'
    };
    var SHP_RECORD_PARSERS = {
      0: noop,
      1: readPointShape,
      3: readPolyLineShape,
      5: readPolyLineShape,
      8: readMultiPointShape,
      11: readPointZShape,
      13: readPolyLineZShape,
      15: readPolyLineZShape,
      18: readMultiPointZShape,
      21: readPointMShape,
      23: readPolyLineMShape,
      25: readPolyLineMShape,
      28: readMultiPointMShape,
      31: readMultiPatchShape
    };
    var SHP_TYPE_TO_GEOJSON_TYPE_MAP = {
      'Null': 'Null',
      'Point': 'Point',
      'PolyLine': 'MultiLineString',
      'Polygon': 'Polygon',
      'MultiPoint': 'MultiPoint',
      'PointZ': 'Point',
      'PolyLineZ': 'MultiLineString',
      'PolygonZ': 'Polygon',
      'MultiPointZ': 'MultiPoint',
      'PointM': 'Point',
      'PolyLineM': 'MultiLineString',
      'PolygonM': 'Polygon',
      'MultiPointM': 'MultiPoint',
      'MultiPatch': 'MultiPatch'
    };
    function parseShapeHeader(stream) {
      var header = {};
      header.fileCode = stream.ui32BE();
      stream.skip(20);
      header.fileLength = stream.ui32BE() << 1;
      header.version = stream.ui32LE();
      header.type_number = stream.ui32LE();
      header.type = SHP_TYPES[header.type_number];
      header.bBox_XY = readBBox(stream);
      header.bBox_ZM = readPointArray(stream, 2);
      return header;
    }
    function readInteger(stream) {
      return stream.ui32LE();
    }
    function readIntegerArray(stream, length) {
      var array = [];
      var i;
      array.length = length;
      for (i = 0; i < length; ++i) {
        array[i] = readInteger(stream);
      }
      return array;
    }
    function readDoubleArray(stream, length) {
      var array = [];
      var i;
      array.length = length;
      for (i = 0; i < length; ++i) {
        array[i] = stream.f64LE();
      }
      return array;
    }
    function readBBox(stream) {
      return readDoubleArray(stream, 4);
    }
    function readPair(stream) {
      return [stream.f64LE(), stream.f64LE()];
    }
    function readPointArray(stream, count) {
      var points = [];
      var i;
      points.length = count;
      for (i = 0; i < count; ++i) {
        points[i] = readPair(stream);
      }
      return points;
    }
    function merge_XYM(xy, m, length) {
      var array = [];
      var i;
      array.length = length;
      for (i = 0; i < length; ++i) {
        array[i] = [xy[i][0], xy[i][1], m[i]];
      }
      return array;
    }
    function merge_XYZM(xy, z, m, length) {
      var array = [];
      var i;
      array.length = length;
      for (i = 0; i < length; ++i) {
        array[i] = [xy[i][0], xy[i][1], z[i], m[i]];
      }
      return array;
    }
    function parseShapeRecord(stream, generalType, errors) {
      var record = {
        number: stream.ui32BE()
      };
      var length = stream.ui32BE() << 1;
      var pos = stream.pos();
      var type = stream.ui32LE();
      record.type_number = type;
      record.type = SHP_TYPES[type];
      record.geoJSON_type = SHP_TYPE_TO_GEOJSON_TYPE_MAP[record.type];
      if (record.type) {
        if (record.type !== generalType) {
          errors.push('shp: shape #' + record.number + ' type: ' + record.type + ' / expected: ' + generalType);
        }
        SHP_RECORD_PARSERS[type](stream, record);
        pos = stream.pos() - pos;
        if (pos !== length) {
          errors.push('shp: shape #' + record.number + ' length: ' + length + ' / actual: ' + pos);
        }
      } else {
        errors.push('shp: shape #' + record.number + ' type: ' + type + ' / unknown');
        record = null;
      }
      return record;
    }
    $__global['SHP_TYPES'] = SHP_TYPES;
    $__global['SHP_RECORD_PARSERS'] = SHP_RECORD_PARSERS;
    $__global['SHP_TYPE_TO_GEOJSON_TYPE_MAP'] = SHP_TYPE_TO_GEOJSON_TYPE_MAP;
  })(this);

  return _retrieveGlobal();
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
//# sourceMappingURL=parser-shp.js.map