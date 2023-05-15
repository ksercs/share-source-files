!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/vector_map.utils/parser-dbf.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic('artifacts/transpiled/viz/vector_map.utils/parser-dbf.js', [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    "use strict";

    /* eslint-disable no-unused-vars, no-var, one-var*/

    $__global['parseDataBaseFileRecords'] = parseDataBaseFileRecords;
    $__global['prepareDataBaseFileRecordParseData'] = prepareDataBaseFileRecordParseData;
    $__global['DBF_FIELD_PARSER_DEFAULT'] = DBF_FIELD_PARSER_DEFAULT;
    $__global['parseFieldDescriptor'] = parseFieldDescriptor;
    $__global['getAsciiString'] = getAsciiString;
    $__global['parseDataBaseFileHeader'] = parseDataBaseFileHeader;
    $__global['parseDBF'] = parseDBF;
    var _fromCharCode = $__global['_fromCharCode'],
        DBF_FIELD_PARSERS = $__global['DBF_FIELD_PARSERS'];
    function parseDBF(stream, errors) {
      var timeStart;
      var timeEnd;
      var header;
      var parseData;
      var records;
      try {
        timeStart = new Date();
        header = parseDataBaseFileHeader(stream, errors);
        parseData = prepareDataBaseFileRecordParseData(header, errors);
        records = parseDataBaseFileRecords(stream, header.numberOfRecords, header.recordLength, parseData, errors);
        timeEnd = new Date();
      } catch (e) {
        errors.push('dbf: parsing error: ' + e.message + ' / ' + e.description);
      }
      return {
        records: records,
        errors: errors,
        time: timeEnd - timeStart
      };
    }
    function parseDataBaseFileHeader(stream, errors) {
      var i;
      var header = {
        versionNumber: stream.ui8(),
        lastUpdate: new Date(1900 + stream.ui8(), stream.ui8() - 1, stream.ui8()),
        numberOfRecords: stream.ui32LE(),
        headerLength: stream.ui16LE(),
        recordLength: stream.ui16LE(),
        fields: []
      };
      var term;
      stream.skip(20);
      for (i = (header.headerLength - stream.pos() - 1) / 32; i > 0; --i) {
        header.fields.push(parseFieldDescriptor(stream));
      }
      term = stream.ui8();
      if (term !== 13) {
        errors.push('dbf: header terminator: ' + term + ' / expected: 13');
      }
      return header;
    }
    var _fromCharCode = String.fromCharCode;
    function getAsciiString(stream, length) {
      return _fromCharCode.apply(null, stream.ui8arr(length));
    }
    function parseFieldDescriptor(stream) {
      var desc = {
        name: getAsciiString(stream, 11).replace(/\0*$/gi, ''),
        type: _fromCharCode(stream.ui8()),
        length: stream.skip(4).ui8(),
        count: stream.ui8()
      };
      stream.skip(14);
      return desc;
    }
    var DBF_FIELD_PARSERS = {
      'C': function C(stream, length) {
        var str = getAsciiString(stream, length);
        try {
          str = decodeURIComponent(escape(str)); // T522922
        } catch (e) {}
        return str.trim();
      },
      'N': function N(stream, length) {
        var str = getAsciiString(stream, length);
        return parseFloat(str);
      },
      'D': function D(stream, length) {
        var str = getAsciiString(stream, length);
        return new Date(str.substring(0, 4), str.substring(4, 6) - 1, str.substring(6, 8));
      }
    };
    function DBF_FIELD_PARSER_DEFAULT(stream, length) {
      stream.skip(length);
      return null;
    }
    function prepareDataBaseFileRecordParseData(header, errors) {
      var list = [];
      var i = 0;
      var ii = header.fields.length;
      var item;
      var field;
      var totalLength = 0;
      for (i = 0; i < ii; ++i) {
        field = header.fields[i];
        item = {
          name: field.name,
          parser: DBF_FIELD_PARSERS[field.type],
          length: field.length
        };
        if (!item.parser) {
          item.parser = DBF_FIELD_PARSER_DEFAULT;
          errors.push('dbf: field ' + field.name + ' type: ' + field.type + ' / unknown');
        }
        totalLength += field.length;
        list.push(item);
      }
      if (totalLength + 1 !== header.recordLength) {
        errors.push('dbf: record length: ' + header.recordLength + ' / actual: ' + (totalLength + 1));
      }
      return list;
    }
    function parseDataBaseFileRecords(stream, recordCount, recordLength, parseData, errors) {
      var i;
      var j;
      var jj = parseData.length;
      var pos;
      var records = [];
      var record;
      var pd;
      for (i = 0; i < recordCount; ++i) {
        record = {};
        pos = stream.pos();
        stream.skip(1);
        for (j = 0; j < jj; ++j) {
          pd = parseData[j];
          record[pd.name] = pd.parser(stream, pd.length);
        }
        pos = stream.pos() - pos;
        if (pos !== recordLength) {
          errors.push('dbf: record #' + (i + 1) + ' length: ' + recordLength + ' / actual: ' + pos);
        }
        records.push(record);
      }
      return records;
    }
    $__global['_fromCharCode'] = _fromCharCode;
    $__global['DBF_FIELD_PARSERS'] = DBF_FIELD_PARSERS;
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
//# sourceMappingURL=parser-dbf.js.map