!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/vector_map.utils/node-cmd.js"], ["path"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('artifacts/transpiled/viz/vector_map.utils/node-cmd.js', ['path'], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  /* eslint-disable no-console, no-undef, no-var, one-var, import/no-commonjs*/

  var path = $__require('path');
  function normalizeJsName(value) {
    return value.trim().replace('-', '_').replace(' ', '_');
  }
  function processFile(file, options, callback) {
    var name = path.basename(file, path.extname(file));
    options.info('%s: started', name);
    parse(file, {
      precision: options.precision
    }, function (shapeData, errors) {
      var content;
      options.info('%s: finished', name);
      errors && errors.forEach(function (e) {
        options.error('  ' + e);
      });
      if (shapeData) {
        content = JSON.stringify(options.processData(shapeData), null, options.isDebug && 4);
        if (!options.isJSON) {
          content = options.processFileContent(content, normalizeJsName(name));
        }
        fs.writeFile(path.resolve(options.output || path.dirname(file), options.processFileName(name + (options.isJSON ? '.json' : '.js'))), content, function (e) {
          e && options.error('  ' + e.message);
          callback();
        });
      } else {
        callback();
      }
    });
  }
  function collectFiles(dir, done) {
    var input = path.resolve(dir || '');
    fs.stat(input, function (e, stat) {
      if (e) {
        done(e, []);
      } else if (stat.isFile()) {
        done(null, checkFile(input) ? [path.resolve(path.dirname(input), normalizeFile(input))] : []);
      } else if (stat.isDirectory()) {
        fs.readdir(input, function (e, dirItems) {
          var list = [];
          dirItems.forEach(function (dirItem) {
            if (checkFile(dirItem)) {
              list.push(path.resolve(input, normalizeFile(dirItem)));
            }
          });
          done(null, list);
        });
      } else {
        done(null, []);
      }
    });
    function checkFile(name) {
      return path.extname(name).toLowerCase() === '.shp';
    }
    function normalizeFile(name) {
      return path.basename(name, '.shp');
    }
  }
  function importFile(file) {
    var content;
    try {
      content = $__require(path.resolve(String(file)));
    } catch (_) {}
    return content;
  }
  function pickFunctionOption(value) {
    return isFunction(value) && value || value && importFile(String(value)) || null;
  }
  function processFileContentByDefault(content, name) {
    return name + ' = ' + content + ';';
  }
  function prepareSettings(source, options) {
    options = _extends({}, options);
    if (options.settings) {
      options = _extends(importFile(options.settings) || {}, options);
    }
    return _extends(options, {
      input: source ? String(source) : null,
      output: options.output ? String(options.output) : null,
      precision: options.precision >= 0 ? Math.round(options.precision) : 4,
      processData: pickFunctionOption(options.processData) || eigen,
      processFileName: pickFunctionOption(options.processFileName) || eigen,
      processFileContent: pickFunctionOption(options.processFileContent) || processFileContentByDefault,
      info: options.isQuiet ? noop : console.info.bind(console),
      error: options.isQuiet ? noop : console.error.bind(console)
    });
  }
  function processFiles(source, options, callback) {
    var settings = prepareSettings(source, options && options.trim ? importFile(options) : options);
    settings.info('Started');
    collectFiles(settings.input, function (e, files) {
      e && settings.error(e.message);
      settings.info(files.map(function (file) {
        return '  ' + path.basename(file);
      }).join('\n'));
      when(files.map(function (file) {
        return function (done) {
          processFile(file, settings, done);
        };
      }), function () {
        settings.info('Finished');
        (isFunction(callback) ? callback : noop)();
      });
    });
  }
  exports.processFiles = processFiles;
  var COMMAND_LINE_ARG_KEYS = [{
    key: '--output',
    name: 'output',
    arg: true,
    desc: 'Destination directory'
  }, {
    key: '--process-data',
    name: 'processData',
    arg: true,
    desc: 'Process parsed data'
  }, {
    key: '--process-file-name',
    name: 'processFileName',
    arg: true,
    desc: 'Process output file name'
  }, {
    key: '--process-file-content',
    name: 'processFileContent',
    arg: true,
    desc: 'Process output file content'
  }, {
    key: '--precision',
    name: 'precision',
    arg: true,
    desc: 'Precision of shape coordinates'
  }, {
    key: '--json',
    name: 'isJSON',
    desc: 'Generate as a .json file'
  }, {
    key: '--debug',
    name: 'isDebug',
    desc: 'Generate non minified file'
  }, {
    key: '--quiet',
    name: 'isQuiet',
    desc: 'Suppress console output'
  }, {
    key: '--settings',
    name: 'settings',
    arg: true,
    desc: 'Path to settings file'
  }, {
    key: '--help',
    name: 'isHelp',
    desc: 'Print help'
  }];
  function parseCommandLineArgs() {
    var args = process.argv.slice(2);
    var options = {
      isEmpty: !args.length
    };
    var map = {};
    args.forEach(function (arg, i) {
      map[arg] = args[i + 1] || true;
    });
    COMMAND_LINE_ARG_KEYS.forEach(function (info) {
      var val = map[info.key];
      if (val) {
        options[info.name] = info.arg ? val : true;
      }
    });
    if (options.isHelp || options.isEmpty) {
      options = null;
      printCommandLineHelp();
    }
    return options;
  }
  function printCommandLineHelp() {
    var parts = ['node ', path.basename(process.argv[1]), ' Source '];
    var lines = [];
    var maxLength = Math.max.apply(null, COMMAND_LINE_ARG_KEYS.map(function (info) {
      return info.key.length;
    })) + 2;
    var message;
    COMMAND_LINE_ARG_KEYS.forEach(function (info) {
      var key = info.key;
      parts.push(key, ' ');
      if (info.arg) {
        parts.push('<', key.slice(2), '>', ' ');
      }
      lines.push(['  ', key, Array(maxLength - key.length).join(' '), info.desc].join(''));
    });
    message = ['Generates dxVectorMap-compatible files from shapefiles.', '\n', parts.join('')].concat(lines).join('\n');
    console.log(message);
  }
  function runFromConsole() {
    var args = parseCommandLineArgs();
    if (args) {
      processFiles(process.argv[2] || '', args);
    }
  }
  if ($__require.main === module) {
    runFromConsole();
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["path"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("path"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=node-cmd.js.map