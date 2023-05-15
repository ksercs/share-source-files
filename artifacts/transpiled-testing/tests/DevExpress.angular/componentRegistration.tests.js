(function(){ var curSystem = typeof System != 'undefined' ? System : undefined;
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  function setupGlobals(global) {
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
  }
  setupGlobals(global);
  var typeOf = function(x) {
    return typeof x;
  };
  global.$traceurRuntime = {
    options: {},
    setupGlobals: setupGlobals,
    typeof: typeOf
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__3 = $traceurRuntime,
      canonicalizeUrl = $__3.canonicalizeUrl,
      resolveUrl = $__3.resolveUrl,
      isAbsolute = $__3.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  }
  function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  }
  ModuleEvaluationError.prototype = Object.create(Error.prototype);
  ModuleEvaluationError.prototype.constructor = ModuleEvaluationError;
  ModuleEvaluationError.prototype.stripError = function(message) {
    return message.replace(/.*Error:/, this.constructor.name + ':');
  };
  ModuleEvaluationError.prototype.stripCause = function(cause) {
    if (!cause)
      return '';
    if (!cause.message)
      return cause + '';
    return this.stripError(cause.message);
  };
  ModuleEvaluationError.prototype.loadedBy = function(moduleName) {
    this.stack += '\n loaded by ' + moduleName;
  };
  ModuleEvaluationError.prototype.stripStack = function(causeStack) {
    var stack = [];
    causeStack.split('\n').some(function(frame) {
      if (/UncoatedModuleInstantiator/.test(frame))
        return true;
      stack.push(frame);
    });
    stack[0] = this.stripError(stack[0]);
    return stack.join('\n');
  };
  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }
  function UncoatedModuleInstantiator(url, func) {
    UncoatedModuleEntry.call(this, url, null);
    this.func = func;
  }
  UncoatedModuleInstantiator.prototype = Object.create(UncoatedModuleEntry.prototype);
  UncoatedModuleInstantiator.prototype.getUncoatedModule = function() {
    var $__2 = this;
    if (this.value_)
      return this.value_;
    try {
      var relativeRequire;
      if (typeof $traceurRuntime !== undefined && $traceurRuntime.require) {
        relativeRequire = $traceurRuntime.require.bind(null, this.url);
      }
      return this.value_ = this.func.call(global, relativeRequire);
    } catch (ex) {
      if (ex instanceof ModuleEvaluationError) {
        ex.loadedBy(this.url);
        throw ex;
      }
      if (ex.stack) {
        var lines = this.func.toString().split('\n');
        var evaled = [];
        ex.stack.split('\n').some(function(frame, index) {
          if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
            return true;
          var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
          if (m) {
            var line = parseInt(m[2], 10);
            evaled = evaled.concat(beforeLines(lines, line));
            if (index === 1) {
              evaled.push(columnSpacing(m[3]) + '^ ' + $__2.url);
            } else {
              evaled.push(columnSpacing(m[3]) + '^');
            }
            evaled = evaled.concat(afterLines(lines, line));
            evaled.push('= = = = = = = = =');
          } else {
            evaled.push(frame);
          }
        });
        ex.stack = evaled.join('\n');
      }
      throw new ModuleEvaluationError(this.url, ex);
    }
  };
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach(function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    });
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== 'string')
        throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, function() {
        return module;
      });
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, deps, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__2 = arguments;
            var depMap = {};
            deps.forEach(function(dep, index) {
              return depMap[dep] = $__2[index];
            });
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    }
  };
  var moduleStoreModule = new Module({ModuleStore: ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  $traceurRuntime.registerModule = ModuleStore.registerModule.bind(ModuleStore);
  $traceurRuntime.getModule = ModuleStore.get;
  $traceurRuntime.setModule = ModuleStore.set;
  $traceurRuntime.normalizeModuleName = ModuleStore.normalize;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/new-unique-string.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/new-unique-string.js";
  var random = Math.random;
  var counter = Date.now() % 1e9;
  function newUniqueString() {
    return '__$' + (random() * 1e9 >>> 1) + '$' + ++counter + '$__';
  }
  var $__default = newUniqueString;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/has-native-symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/has-native-symbols.js";
  var v = !!Object.getOwnPropertySymbols && typeof Symbol === 'function';
  function hasNativeSymbol() {
    return v;
  }
  var $__default = hasNativeSymbol;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/symbols.js";
  var newUniqueString = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../new-unique-string.js", "traceur-runtime@0.0.105/src/runtime/modules/symbols.js")).default;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/modules/symbols.js")).default;
  var $create = Object.create;
  var $defineProperty = Object.defineProperty;
  var $freeze = Object.freeze;
  var $getOwnPropertyNames = Object.getOwnPropertyNames;
  var $keys = Object.keys;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var SymbolImpl = function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof SymbolImpl))
      return value;
    throw new $TypeError('Symbol cannot be new\'ed');
  };
  $defineProperty(SymbolImpl.prototype, 'constructor', nonEnum(SymbolImpl));
  $defineProperty(SymbolImpl.prototype, 'toString', nonEnum(function() {
    var symbolValue = this[symbolDataProperty];
    return symbolValue[symbolInternalProperty];
  }));
  $defineProperty(SymbolImpl.prototype, 'valueOf', nonEnum(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw $TypeError('Conversion from symbol to string');
    return symbolValue[symbolInternalProperty];
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    $freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(SymbolImpl));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: SymbolImpl.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: SymbolImpl.prototype.valueOf,
    enumerable: false
  });
  $freeze(SymbolValue.prototype);
  function isSymbolString(s) {
    return symbolValues[s];
  }
  function removeSymbolKeys(array) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
      if (!isSymbolString(array[i])) {
        rv.push(array[i]);
      }
    }
    return rv;
  }
  function getOwnPropertyNames(object) {
    return removeSymbolKeys($getOwnPropertyNames(object));
  }
  function keys(object) {
    return removeSymbolKeys($keys(object));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol) {
        rv.push(symbol);
      }
    }
    return rv;
  }
  function polyfillSymbol(global) {
    var Object = global.Object;
    if (!hasNativeSymbol()) {
      global.Symbol = SymbolImpl;
      Object.getOwnPropertyNames = getOwnPropertyNames;
      Object.keys = keys;
      $defineProperty(Object, 'getOwnPropertySymbols', nonEnum(getOwnPropertySymbols));
    }
    if (!global.Symbol.iterator) {
      global.Symbol.iterator = global.Symbol('Symbol.iterator');
    }
    if (!global.Symbol.observer) {
      global.Symbol.observer = global.Symbol('Symbol.observer');
    }
  }
  var g = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
  polyfillSymbol(g);
  var typeOf = hasNativeSymbol() ? function(x) {
    return typeof x;
  } : function(x) {
    return x instanceof SymbolValue ? 'symbol' : typeof x;
  };
  return {get typeof() {
      return typeOf;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/typeof.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/typeof.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_symbols_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./symbols.js", "traceur-runtime@0.0.105/src/runtime/modules/typeof.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_symbols_46_js__.typeof;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/symbols.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/symbols.js";
  var t = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/typeof.js", "traceur-runtime@0.0.105/src/runtime/symbols.js")).default;
  $traceurRuntime.typeof = t;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createClass.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createClass.js";
  var $Object = Object;
  var $TypeError = TypeError;
  var $__1 = Object,
      create = $__1.create,
      defineProperties = $__1.defineProperties,
      defineProperty = $__1.defineProperty,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      getOwnPropertySymbols = $__1.getOwnPropertySymbols;
  function forEachPropertyKey(object, f) {
    getOwnPropertyNames(object).forEach(f);
    if (getOwnPropertySymbols) {
      getOwnPropertySymbols(object).forEach(f);
    }
  }
  function getDescriptors(object) {
    var descriptors = {};
    forEachPropertyKey(object, function(key) {
      descriptors[key] = getOwnPropertyDescriptor(object, key);
      descriptors[key].enumerable = false;
    });
    return descriptors;
  }
  var nonEnum = {enumerable: false};
  function makePropertiesNonEnumerable(object) {
    forEachPropertyKey(object, function(key) {
      defineProperty(object, key, nonEnum);
    });
  }
  function createClass(ctor, object, staticObject, superClass) {
    defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = create(getProtoParent(superClass), getDescriptors(object));
    } else {
      makePropertiesNonEnumerable(object);
      ctor.prototype = object;
    }
    defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return defineProperties(ctor, getDescriptors(staticObject));
  }
  var $__default = createClass;
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superConstructor.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superConstructor.js";
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  var $__default = superConstructor;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superDescriptor.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superDescriptor.js";
  var $__1 = Object,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getPrototypeOf = $__1.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = getPrototypeOf(homeObject);
    do {
      var result = getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  var $__default = superDescriptor;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superGet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superGet.js";
  var superDescriptor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./superDescriptor.js", "traceur-runtime@0.0.105/src/runtime/modules/superGet.js")).default;
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      var value = descriptor.value;
      if (value)
        return value;
      if (!descriptor.get)
        return value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  var $__default = superGet;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/superSet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/superSet.js";
  var superDescriptor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./superDescriptor.js", "traceur-runtime@0.0.105/src/runtime/modules/superSet.js")).default;
  var $TypeError = TypeError;
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  var $__default = superSet;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/classes.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/classes.js";
  var createClass = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createClass.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superConstructor = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superConstructor.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superGet = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superGet.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  var superSet = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/superSet.js", "traceur-runtime@0.0.105/src/runtime/classes.js")).default;
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/exportStar.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/exportStar.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      getOwnPropertyNames = $__1.getOwnPropertyNames;
  function exportStar(object) {
    var $__2 = arguments,
        $__3 = function(i) {
          var mod = $__2[i];
          var names = getOwnPropertyNames(mod);
          var $__5 = function(j) {
            var name = names[j];
            if (name === '__esModule' || name === 'default') {
              return 0;
            }
            defineProperty(object, name, {
              get: function() {
                return mod[name];
              },
              enumerable: true
            });
          },
              $__6;
          $__4: for (var j = 0; j < names.length; j++) {
            $__6 = $__5(j);
            switch ($__6) {
              case 0:
                continue $__4;
            }
          }
        };
    for (var i = 1; i < arguments.length; i++) {
      $__3(i);
    }
    return object;
  }
  var $__default = exportStar;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/exportStar.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/exportStar.js";
  var exportStar = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/exportStar.js", "traceur-runtime@0.0.105/src/runtime/exportStar.js")).default;
  $traceurRuntime.exportStar = exportStar;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private-symbol.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private-symbol.js";
  var newUniqueString = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./new-unique-string.js", "traceur-runtime@0.0.105/src/runtime/private-symbol.js")).default;
  var $Symbol = typeof Symbol === 'function' ? Symbol : undefined;
  var $getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var $create = Object.create;
  var privateNames = $create(null);
  function isPrivateSymbol(s) {
    return privateNames[s];
  }
  ;
  function createPrivateSymbol() {
    var s = ($Symbol || newUniqueString)();
    privateNames[s] = true;
    return s;
  }
  ;
  function hasPrivate(obj, sym) {
    return hasOwnProperty.call(obj, sym);
  }
  ;
  function deletePrivate(obj, sym) {
    if (!hasPrivate(obj, sym)) {
      return false;
    }
    delete obj[sym];
    return true;
  }
  ;
  function setPrivate(obj, sym, val) {
    obj[sym] = val;
  }
  ;
  function getPrivate(obj, sym) {
    var val = obj[sym];
    if (val === undefined)
      return undefined;
    return hasOwnProperty.call(obj, sym) ? val : undefined;
  }
  ;
  function init() {
    if ($getOwnPropertySymbols) {
      Object.getOwnPropertySymbols = function getOwnPropertySymbols(object) {
        var rv = [];
        var symbols = $getOwnPropertySymbols(object);
        for (var i = 0; i < symbols.length; i++) {
          var symbol = symbols[i];
          if (!isPrivateSymbol(symbol)) {
            rv.push(symbol);
          }
        }
        return rv;
      };
    }
  }
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    },
    get init() {
      return init;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private-weak-map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private-weak-map.js";
  var $WeakMap = typeof WeakMap === 'function' ? WeakMap : undefined;
  function isPrivateSymbol(s) {
    return false;
  }
  function createPrivateSymbol() {
    return new $WeakMap();
  }
  function hasPrivate(obj, sym) {
    return sym.has(obj);
  }
  function deletePrivate(obj, sym) {
    return sym.delete(obj);
  }
  function setPrivate(obj, sym, val) {
    sym.set(obj, val);
  }
  function getPrivate(obj, sym) {
    return sym.get(obj);
  }
  function init() {}
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    },
    get init() {
      return init;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/private.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/private.js";
  var sym = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./private-symbol.js", "traceur-runtime@0.0.105/src/runtime/private.js"));
  var weak = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./private-weak-map.js", "traceur-runtime@0.0.105/src/runtime/private.js"));
  var hasWeakMap = typeof WeakMap === 'function';
  var m = hasWeakMap ? weak : sym;
  var isPrivateSymbol = m.isPrivateSymbol;
  var createPrivateSymbol = m.createPrivateSymbol;
  var hasPrivate = m.hasPrivate;
  var deletePrivate = m.deletePrivate;
  var setPrivate = m.setPrivate;
  var getPrivate = m.getPrivate;
  m.init();
  return {
    get isPrivateSymbol() {
      return isPrivateSymbol;
    },
    get createPrivateSymbol() {
      return createPrivateSymbol;
    },
    get hasPrivate() {
      return hasPrivate;
    },
    get deletePrivate() {
      return deletePrivate;
    },
    get setPrivate() {
      return setPrivate;
    },
    get getPrivate() {
      return getPrivate;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/properTailCalls.js")),
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate,
      createPrivateSymbol = $__0.createPrivateSymbol;
  var $apply = Function.prototype.call.bind(Function.prototype.apply);
  var CONTINUATION_TYPE = Object.create(null);
  var isTailRecursiveName = null;
  function createContinuation(operand, thisArg, argsArray) {
    return [CONTINUATION_TYPE, operand, thisArg, argsArray];
  }
  function isContinuation(object) {
    return object && object[0] === CONTINUATION_TYPE;
  }
  function $bind(operand, thisArg, args) {
    var argArray = [thisArg];
    for (var i = 0; i < args.length; i++) {
      argArray[i + 1] = args[i];
    }
    var func = $apply(Function.prototype.bind, operand, argArray);
    return func;
  }
  function $construct(func, argArray) {
    var object = new ($bind(func, null, argArray));
    return object;
  }
  function isTailRecursive(func) {
    return !!getPrivate(func, isTailRecursiveName);
  }
  function tailCall(func, thisArg, argArray) {
    var continuation = argArray[0];
    if (isContinuation(continuation)) {
      continuation = $apply(func, thisArg, continuation[3]);
      return continuation;
    }
    continuation = createContinuation(func, thisArg, argArray);
    while (true) {
      if (isTailRecursive(func)) {
        continuation = $apply(func, continuation[2], [continuation]);
      } else {
        continuation = $apply(func, continuation[2], continuation[3]);
      }
      if (!isContinuation(continuation)) {
        return continuation;
      }
      func = continuation[1];
    }
  }
  function construct() {
    var object;
    if (isTailRecursive(this)) {
      object = $construct(this, [createContinuation(null, null, arguments)]);
    } else {
      object = $construct(this, arguments);
    }
    return object;
  }
  function setupProperTailCalls() {
    isTailRecursiveName = createPrivateSymbol();
    Function.prototype.call = initTailRecursiveFunction(function call(thisArg) {
      var result = tailCall(function(thisArg) {
        var argArray = [];
        for (var i = 1; i < arguments.length; ++i) {
          argArray[i - 1] = arguments[i];
        }
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
    Function.prototype.apply = initTailRecursiveFunction(function apply(thisArg, argArray) {
      var result = tailCall(function(thisArg, argArray) {
        var continuation = createContinuation(this, thisArg, argArray);
        return continuation;
      }, this, arguments);
      return result;
    });
  }
  function initTailRecursiveFunction(func) {
    if (isTailRecursiveName === null) {
      setupProperTailCalls();
    }
    setPrivate(func, isTailRecursiveName, true);
    return func;
  }
  return {
    get construct() {
      return construct;
    },
    get initTailRecursiveFunction() {
      return initTailRecursiveFunction;
    },
    get call() {
      return tailCall;
    },
    get continuation() {
      return createContinuation;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/properTailCalls.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/properTailCalls.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/properTailCalls.js", "traceur-runtime@0.0.105/src/runtime/properTailCalls.js")),
      initTailRecursiveFunction = $__0.initTailRecursiveFunction,
      call = $__0.call,
      continuation = $__0.continuation,
      construct = $__0.construct;
  $traceurRuntime.initTailRecursiveFunction = initTailRecursiveFunction;
  $traceurRuntime.call = call;
  $traceurRuntime.continuation = continuation;
  $traceurRuntime.construct = construct;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/relativeRequire.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/relativeRequire.js";
  var path;
  function relativeRequire(callerPath, requiredPath) {
    path = path || typeof require !== 'undefined' && require('path');
    function isDirectory(path) {
      return path.slice(-1) === '/';
    }
    function isAbsolute(path) {
      return path[0] === '/';
    }
    function isRelative(path) {
      return path[0] === '.';
    }
    if (isDirectory(requiredPath) || isAbsolute(requiredPath))
      return;
    return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
  }
  $traceurRuntime.require = relativeRequire;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/checkObjectCoercible.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/checkObjectCoercible.js";
  var $TypeError = TypeError;
  function checkObjectCoercible(v) {
    if (v === null || v === undefined) {
      throw new $TypeError('Value cannot be converted to an Object');
    }
    return v;
  }
  var $__default = checkObjectCoercible;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/spread.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/spread.js";
  var checkObjectCoercible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../checkObjectCoercible.js", "traceur-runtime@0.0.105/src/runtime/modules/spread.js")).default;
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[Symbol.iterator] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[Symbol.iterator]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  var $__default = spread;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/spread.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/spread.js";
  var spread = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/spread.js", "traceur-runtime@0.0.105/src/runtime/spread.js")).default;
  $traceurRuntime.spread = spread;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/iteratorToArray.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/iteratorToArray.js";
  function iteratorToArray(iter) {
    var rv = [];
    var i = 0;
    var tmp;
    while (!(tmp = iter.next()).done) {
      rv[i++] = tmp.value;
    }
    return rv;
  }
  var $__default = iteratorToArray;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/destructuring.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/destructuring.js";
  var iteratorToArray = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/iteratorToArray.js", "traceur-runtime@0.0.105/src/runtime/destructuring.js")).default;
  $traceurRuntime.iteratorToArray = iteratorToArray;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/async.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/async.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/async.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $__12 = Object,
      create = $__12.create,
      defineProperty = $__12.defineProperty;
  var observeName = createPrivateSymbol();
  function AsyncGeneratorFunction() {}
  function AsyncGeneratorFunctionPrototype() {}
  AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;
  AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
  defineProperty(AsyncGeneratorFunctionPrototype, 'constructor', {enumerable: false});
  var AsyncGeneratorContext = function() {
    function AsyncGeneratorContext(observer) {
      var $__3 = this;
      this.decoratedObserver = createDecoratedGenerator(observer, function() {
        $__3.done = true;
      });
      this.done = false;
      this.inReturn = false;
    }
    return ($traceurRuntime.createClass)(AsyncGeneratorContext, {
      throw: function(error) {
        if (!this.inReturn) {
          throw error;
        }
      },
      yield: function(value) {
        if (this.done) {
          this.inReturn = true;
          throw undefined;
        }
        var result;
        try {
          result = this.decoratedObserver.next(value);
        } catch (e) {
          this.done = true;
          throw e;
        }
        if (result === undefined) {
          return;
        }
        if (result.done) {
          this.done = true;
          this.inReturn = true;
          throw undefined;
        }
        return result.value;
      },
      yieldFor: function(observable) {
        var ctx = this;
        return observeForEach(observable[Symbol.observer].bind(observable), function(value) {
          if (ctx.done) {
            this.return();
            return;
          }
          var result;
          try {
            result = ctx.decoratedObserver.next(value);
          } catch (e) {
            ctx.done = true;
            throw e;
          }
          if (result === undefined) {
            return;
          }
          if (result.done) {
            ctx.done = true;
          }
          return result;
        });
      }
    }, {});
  }();
  AsyncGeneratorFunctionPrototype.prototype[Symbol.observer] = function(observer) {
    var observe = getPrivate(this, observeName);
    var ctx = new AsyncGeneratorContext(observer);
    schedule(function() {
      return observe(ctx);
    }).then(function(value) {
      if (!ctx.done) {
        ctx.decoratedObserver.return(value);
      }
    }).catch(function(error) {
      if (!ctx.done) {
        ctx.decoratedObserver.throw(error);
      }
    });
    return ctx.decoratedObserver;
  };
  defineProperty(AsyncGeneratorFunctionPrototype.prototype, Symbol.observer, {enumerable: false});
  function initAsyncGeneratorFunction(functionObject) {
    functionObject.prototype = create(AsyncGeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = AsyncGeneratorFunctionPrototype;
    return functionObject;
  }
  function createAsyncGeneratorInstance(observe, functionObject) {
    for (var args = [],
        $__11 = 2; $__11 < arguments.length; $__11++)
      args[$__11 - 2] = arguments[$__11];
    var object = create(functionObject.prototype);
    setPrivate(object, observeName, observe);
    return object;
  }
  function observeForEach(observe, next) {
    return new Promise(function(resolve, reject) {
      var generator = observe({
        next: function(value) {
          return next.call(generator, value);
        },
        throw: function(error) {
          reject(error);
        },
        return: function(value) {
          resolve(value);
        }
      });
    });
  }
  function schedule(asyncF) {
    return Promise.resolve().then(asyncF);
  }
  var generator = Symbol();
  var onDone = Symbol();
  var DecoratedGenerator = function() {
    function DecoratedGenerator(_generator, _onDone) {
      this[generator] = _generator;
      this[onDone] = _onDone;
    }
    return ($traceurRuntime.createClass)(DecoratedGenerator, {
      next: function(value) {
        var result = this[generator].next(value);
        if (result !== undefined && result.done) {
          this[onDone].call(this);
        }
        return result;
      },
      throw: function(error) {
        this[onDone].call(this);
        return this[generator].throw(error);
      },
      return: function(value) {
        this[onDone].call(this);
        return this[generator].return(value);
      }
    }, {});
  }();
  function createDecoratedGenerator(generator, onDone) {
    return new DecoratedGenerator(generator, onDone);
  }
  Array.prototype[Symbol.observer] = function(observer) {
    var done = false;
    var decoratedObserver = createDecoratedGenerator(observer, function() {
      return done = true;
    });
    var $__7 = true;
    var $__8 = false;
    var $__9 = undefined;
    try {
      for (var $__5 = void 0,
          $__4 = (this)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
        var value = $__5.value;
        {
          decoratedObserver.next(value);
          if (done) {
            return;
          }
        }
      }
    } catch ($__10) {
      $__8 = true;
      $__9 = $__10;
    } finally {
      try {
        if (!$__7 && $__4.return != null) {
          $__4.return();
        }
      } finally {
        if ($__8) {
          throw $__9;
        }
      }
    }
    decoratedObserver.return();
    return decoratedObserver;
  };
  defineProperty(Array.prototype, Symbol.observer, {enumerable: false});
  return {
    get initAsyncGeneratorFunction() {
      return initAsyncGeneratorFunction;
    },
    get createAsyncGeneratorInstance() {
      return createAsyncGeneratorInstance;
    },
    get observeForEach() {
      return observeForEach;
    },
    get schedule() {
      return schedule;
    },
    get createDecoratedGenerator() {
      return createDecoratedGenerator;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/initAsyncGeneratorFunction.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.initAsyncGeneratorFunction;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/createAsyncGeneratorInstance.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.createAsyncGeneratorInstance;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/observeForEach.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.observeForEach;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/schedule.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/schedule.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/schedule.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.schedule;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/modules/createDecoratedGenerator.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_async_46_js__.createDecoratedGenerator;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/async.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/async.js";
  var initAsyncGeneratorFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/initAsyncGeneratorFunction.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var createAsyncGeneratorInstance = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createAsyncGeneratorInstance.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var observeForEach = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/observeForEach.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var schedule = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/schedule.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  var createDecoratedGenerator = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createDecoratedGenerator.js", "traceur-runtime@0.0.105/src/runtime/async.js")).default;
  $traceurRuntime.initAsyncGeneratorFunction = initAsyncGeneratorFunction;
  $traceurRuntime.createAsyncGeneratorInstance = createAsyncGeneratorInstance;
  $traceurRuntime.observeForEach = observeForEach;
  $traceurRuntime.schedule = schedule;
  $traceurRuntime.createDecoratedGenerator = createDecoratedGenerator;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/generators.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/generators.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/modules/generators.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $TypeError = TypeError;
  var $__2 = Object,
      create = $__2.create,
      defineProperties = $__2.defineProperties,
      defineProperty = $__2.defineProperty;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  var RETURN_SENTINEL = {};
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.oldReturnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    maybeUncatchable: function() {
      if (this.storedException === RETURN_SENTINEL) {
        throw RETURN_SENTINEL;
      }
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    },
    wrapYieldStar: function(iterator) {
      var ctx = this;
      return {
        next: function(v) {
          return iterator.next(v);
        },
        throw: function(e) {
          var result;
          if (e === RETURN_SENTINEL) {
            if (iterator.return) {
              result = iterator.return(ctx.returnValue);
              if (!result.done) {
                ctx.returnValue = ctx.oldReturnValue;
                return result;
              }
              ctx.returnValue = result.value;
            }
            throw e;
          }
          if (iterator.throw) {
            return iterator.throw(e);
          }
          iterator.return && iterator.return();
          throw $TypeError('Inner iterator does not have a throw method');
        }
      };
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        if (x === RETURN_SENTINEL) {
          return {
            value: ctx.returnValue,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          if (x === RETURN_SENTINEL) {
            return {
              value: ctx.returnValue,
              done: true
            };
          }
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value;
        try {
          value = moveNext(ctx);
        } catch (ex) {
          if (ex === RETURN_SENTINEL) {
            value = ctx;
          } else {
            throw ex;
          }
        }
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateSymbol();
  var moveNextName = createPrivateSymbol();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'throw', v);
    },
    return: function(v) {
      var ctx = getPrivate(this, ctxName);
      ctx.oldReturnValue = ctx.returnValue;
      ctx.returnValue = v;
      return nextOrThrow(ctx, getPrivate(this, moveNextName), 'throw', RETURN_SENTINEL);
    }
  };
  defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false},
    return: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = create(functionObject.prototype);
    setPrivate(object, ctxName, ctx);
    setPrivate(object, moveNextName, moveNext);
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  return {
    get createGeneratorInstance() {
      return createGeneratorInstance;
    },
    get initGeneratorFunction() {
      return initGeneratorFunction;
    },
    get asyncWrap() {
      return asyncWrap;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/asyncWrap.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.asyncWrap;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/initGeneratorFunction.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.initGeneratorFunction;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js";
  var $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__ = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/modules/createGeneratorInstance.js"));
  return {get default() {
      return $__traceur_45_runtime_64_0_46_0_46_105_47_src_47_runtime_47_modules_47_generators_46_js__.createGeneratorInstance;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/generators.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/generators.js";
  var asyncWrap = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/asyncWrap.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  var initGeneratorFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/initGeneratorFunction.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  var createGeneratorInstance = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/createGeneratorInstance.js", "traceur-runtime@0.0.105/src/runtime/generators.js")).default;
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/getTemplateObject.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/getTemplateObject.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      freeze = $__1.freeze;
  var slice = Array.prototype.slice;
  var map = Object.create(null);
  function getTemplateObject(raw) {
    var cooked = arguments[1];
    var key = raw.join('${}');
    var templateObject = map[key];
    if (templateObject)
      return templateObject;
    if (!cooked) {
      cooked = slice.call(raw);
    }
    return map[key] = freeze(defineProperty(cooked, 'raw', {value: freeze(raw)}));
  }
  var $__default = getTemplateObject;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/template.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/template.js";
  var getTemplateObject = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/getTemplateObject.js", "traceur-runtime@0.0.105/src/runtime/template.js")).default;
  $traceurRuntime.getTemplateObject = getTemplateObject;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/modules/spreadProperties.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/modules/spreadProperties.js";
  var $__1 = Object,
      defineProperty = $__1.defineProperty,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      getOwnPropertySymbols = $__1.getOwnPropertySymbols,
      propertyIsEnumerable = $__1.propertyIsEnumerable;
  function createDataProperty(o, p, v) {
    defineProperty(o, p, {
      configurable: true,
      enumerable: true,
      value: v,
      writable: true
    });
  }
  function copyDataProperties(target, source) {
    if (source == null) {
      return;
    }
    var copy = function(keys) {
      for (var i = 0; i < keys.length; i++) {
        var nextKey = keys[i];
        if (propertyIsEnumerable.call(source, nextKey)) {
          var propValue = source[nextKey];
          createDataProperty(target, nextKey, propValue);
        }
      }
    };
    copy(getOwnPropertyNames(source));
    copy(getOwnPropertySymbols(source));
  }
  var $__default = function() {
    var target = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      copyDataProperties(target, arguments[i]);
    }
    return target;
  };
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/jsx.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/jsx.js";
  var spreadProperties = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./modules/spreadProperties.js", "traceur-runtime@0.0.105/src/runtime/jsx.js")).default;
  $traceurRuntime.spreadProperties = spreadProperties;
  return {};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/runtime-modules.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/runtime-modules.js";
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./symbols.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./classes.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./exportStar.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./properTailCalls.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./relativeRequire.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./spread.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./destructuring.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./async.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./generators.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./template.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./jsx.js", "traceur-runtime@0.0.105/src/runtime/runtime-modules.js"));
  return {};
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/runtime-modules.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/frozen-data.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/frozen-data.js";
  function findIndex(arr, key) {
    for (var i = 0; i < arr.length; i += 2) {
      if (arr[i] === key) {
        return i;
      }
    }
    return -1;
  }
  function setFrozen(arr, key, val) {
    var i = findIndex(arr, key);
    if (i === -1) {
      arr.push(key, val);
    }
  }
  function getFrozen(arr, key) {
    var i = findIndex(arr, key);
    if (i !== -1) {
      return arr[i + 1];
    }
    return undefined;
  }
  function hasFrozen(arr, key) {
    return findIndex(arr, key) !== -1;
  }
  function deleteFrozen(arr, key) {
    var i = findIndex(arr, key);
    if (i !== -1) {
      arr.splice(i, 2);
      return true;
    }
    return false;
  }
  return {
    get setFrozen() {
      return setFrozen;
    },
    get getFrozen() {
      return getFrozen;
    },
    get hasFrozen() {
      return hasFrozen;
    },
    get deleteFrozen() {
      return deleteFrozen;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/utils.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/utils.js";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var $TypeError = TypeError;
  var $Object = Object;
  function toObject(x) {
    if (x == null) {
      throw $TypeError();
    }
    return $Object(x);
  }
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach(function(f) {
      return f(global);
    });
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      getPrivate = $__0.getPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Map.js")).default;
  var $__13 = Object,
      defineProperty = $__13.defineProperty,
      getOwnPropertyDescriptor = $__13.getOwnPropertyDescriptor,
      hasOwnProperty = $__13.hasOwnProperty,
      isExtensible = $__13.isExtensible;
  var deletedSentinel = {};
  var counter = 1;
  var hashCodeName = createPrivateSymbol();
  function getHashCodeForObject(obj) {
    return getPrivate(obj, hashCodeName);
  }
  function getOrSetHashCodeForObject(obj) {
    var hash = getHashCodeForObject(obj);
    if (!hash) {
      hash = counter++;
      setPrivate(obj, hashCodeName, hash);
    }
    return hash;
  }
  function lookupIndex(map, key) {
    if (typeof key === 'string') {
      return map.stringIndex_[key];
    }
    if (isObject(key)) {
      if (!isExtensible(key)) {
        return getFrozen(map.frozenData_, key);
      }
      var hc = getHashCodeForObject(key);
      if (hc === undefined) {
        return undefined;
      }
      return map.objectIndex_[hc];
    }
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.frozenData_ = [];
    map.deletedCount_ = 0;
  }
  var Map = function() {
    function Map() {
      var $__15,
          $__16;
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Map called on incompatible type');
      if (hasOwnProperty.call(this, 'entries_')) {
        throw new TypeError('Map can not be reentrantly initialised');
      }
      initMap(this);
      if (iterable !== null && iterable !== undefined) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (iterable)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var $__14 = $__7.value,
                key = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value),
                value = ($__16 = $__15.next()).done ? void 0 : $__16.value;
            {
              this.set(key, value);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Map, {
      get size() {
        return this.entries_.length / 2 - this.deletedCount_;
      },
      get: function(key) {
        var index = lookupIndex(this, key);
        if (index !== undefined) {
          return this.entries_[index + 1];
        }
      },
      set: function(key, value) {
        var index = lookupIndex(this, key);
        if (index !== undefined) {
          this.entries_[index + 1] = value;
        } else {
          index = this.entries_.length;
          this.entries_[index] = key;
          this.entries_[index + 1] = value;
          if (isObject(key)) {
            if (!isExtensible(key)) {
              setFrozen(this.frozenData_, key, index);
            } else {
              var hash = getOrSetHashCodeForObject(key);
              this.objectIndex_[hash] = index;
            }
          } else if (typeof key === 'string') {
            this.stringIndex_[key] = index;
          } else {
            this.primitiveIndex_[key] = index;
          }
        }
        return this;
      },
      has: function(key) {
        return lookupIndex(this, key) !== undefined;
      },
      delete: function(key) {
        var index = lookupIndex(this, key);
        if (index === undefined) {
          return false;
        }
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        if (isObject(key)) {
          if (!isExtensible(key)) {
            deleteFrozen(this.frozenData_, key);
          } else {
            var hash = getHashCodeForObject(key);
            delete this.objectIndex_[hash];
          }
        } else if (typeof key === 'string') {
          delete this.stringIndex_[key];
        } else {
          delete this.primitiveIndex_[key];
        }
        return true;
      },
      clear: function() {
        initMap(this);
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        for (var i = 0; i < this.entries_.length; i += 2) {
          var key = this.entries_[i];
          var value = this.entries_[i + 1];
          if (key === deletedSentinel)
            continue;
          callbackFn.call(thisArg, value, key, this);
        }
      },
      entries: $traceurRuntime.initGeneratorFunction(function $__17() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return [key, value];
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__17, this);
      }),
      keys: $traceurRuntime.initGeneratorFunction(function $__18() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return key;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__18, this);
      }),
      values: $traceurRuntime.initGeneratorFunction(function $__19() {
        var i,
            key,
            value;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                i = 0;
                $ctx.state = 12;
                break;
              case 12:
                $ctx.state = (i < this.entries_.length) ? 8 : -2;
                break;
              case 4:
                i += 2;
                $ctx.state = 12;
                break;
              case 8:
                key = this.entries_[i];
                value = this.entries_[i + 1];
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = (key === deletedSentinel) ? 4 : 6;
                break;
              case 6:
                $ctx.state = 2;
                return value;
              case 2:
                $ctx.maybeThrow();
                $ctx.state = 4;
                break;
              default:
                return $ctx.end();
            }
        }, $__19, this);
      })
    }, {});
  }();
  defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function needsPolyfill(global) {
    var $__14 = global,
        Map = $__14.Map,
        Symbol = $__14.Symbol;
    if (!Map || !hasNativeSymbol() || !Map.prototype[Symbol.iterator] || !Map.prototype.entries) {
      return true;
    }
    try {
      return new Map([[]]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillMap(global) {
    if (needsPolyfill(global)) {
      global.Map = Map;
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Map.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Set.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")),
      isObject = $__0.isObject,
      registerPolyfill = $__0.registerPolyfill;
  var Map = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./Map.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")).Map;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Set.js")).default;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var Set = function() {
    function Set() {
      var iterable = arguments[0];
      if (!isObject(this))
        throw new TypeError('Set called on incompatible type');
      if (hasOwnProperty.call(this, 'map_')) {
        throw new TypeError('Set can not be reentrantly initialised');
      }
      this.map_ = new Map();
      if (iterable !== null && iterable !== undefined) {
        var $__9 = true;
        var $__10 = false;
        var $__11 = undefined;
        try {
          for (var $__7 = void 0,
              $__6 = (iterable)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
            var item = $__7.value;
            {
              this.add(item);
            }
          }
        } catch ($__12) {
          $__10 = true;
          $__11 = $__12;
        } finally {
          try {
            if (!$__9 && $__6.return != null) {
              $__6.return();
            }
          } finally {
            if ($__10) {
              throw $__11;
            }
          }
        }
      }
    }
    return ($traceurRuntime.createClass)(Set, {
      get size() {
        return this.map_.size;
      },
      has: function(key) {
        return this.map_.has(key);
      },
      add: function(key) {
        this.map_.set(key, key);
        return this;
      },
      delete: function(key) {
        return this.map_.delete(key);
      },
      clear: function() {
        return this.map_.clear();
      },
      forEach: function(callbackFn) {
        var thisArg = arguments[1];
        var $__5 = this;
        return this.map_.forEach(function(value, key) {
          callbackFn.call(thisArg, key, key, $__5);
        });
      },
      values: $traceurRuntime.initGeneratorFunction(function $__15() {
        var $__16,
            $__17;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__16 = $ctx.wrapYieldStar(this.map_.keys()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__17 = $__16[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__17.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__17.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__17.value;
              default:
                return $ctx.end();
            }
        }, $__15, this);
      }),
      entries: $traceurRuntime.initGeneratorFunction(function $__18() {
        var $__19,
            $__20;
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $__19 = $ctx.wrapYieldStar(this.map_.entries()[Symbol.iterator]());
                $ctx.sent = void 0;
                $ctx.action = 'next';
                $ctx.state = 12;
                break;
              case 12:
                $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
                $ctx.state = 9;
                break;
              case 9:
                $ctx.state = ($__20.done) ? 3 : 2;
                break;
              case 3:
                $ctx.sent = $__20.value;
                $ctx.state = -2;
                break;
              case 2:
                $ctx.state = 12;
                return $__20.value;
              default:
                return $ctx.end();
            }
        }, $__18, this);
      })
    }, {});
  }();
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function needsPolyfill(global) {
    var $__14 = global,
        Set = $__14.Set,
        Symbol = $__14.Symbol;
    if (!Set || !hasNativeSymbol() || !Set.prototype[Symbol.iterator] || !Set.prototype.values) {
      return true;
    }
    try {
      return new Set([1]).size !== 1;
    } catch (e) {
      return false;
    }
  }
  function polyfillSet(global) {
    if (needsPolyfill(global)) {
      global.Set = Set;
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Set.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/node_modules/rsvp/lib/rsvp/asap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/node_modules/rsvp/lib/rsvp/asap.js";
  var len = 0;
  var toString = {}.toString;
  var vertxNext;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserWindow = (typeof window !== 'undefined') ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    var nextTick = process.nextTick;
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function() {
      nextTick(flush);
    };
  }
  function useVertxTimer() {
    return function() {
      vertxNext(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  function attemptVertex() {
    try {
      var r = require;
      var vertx = r('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }
  var scheduleFlush;
  if (isNode) {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush = attemptVertex();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js";
  var async = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../../../node_modules/rsvp/lib/rsvp/asap.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")).default;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")),
      isObject = $__1.isObject,
      registerPolyfill = $__1.registerPolyfill;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js")),
      createPrivateSymbol = $__2.createPrivateSymbol,
      getPrivate = $__2.getPrivate,
      setPrivate = $__2.setPrivate;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: function(x) {
          promiseResolve(promise, x);
        },
        reject: function(r) {
          promiseReject(promise, r);
        }
      };
    } else {
      var result = {};
      result.promise = new C(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      });
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function() {
    function Promise(resolver) {
      if (resolver === promiseRaw)
        return;
      if (typeof resolver !== 'function')
        throw new TypeError;
      var promise = promiseInit(this);
      try {
        resolver(function(x) {
          promiseResolve(promise, x);
        }, function(r) {
          promiseReject(promise, r);
        });
      } catch (e) {
        promiseReject(promise, e);
      }
    }
    return ($traceurRuntime.createClass)(Promise, {
      catch: function(onReject) {
        return this.then(undefined, onReject);
      },
      then: function(onResolve, onReject) {
        if (typeof onResolve !== 'function')
          onResolve = idResolveHandler;
        if (typeof onReject !== 'function')
          onReject = idRejectHandler;
        var that = this;
        var constructor = this.constructor;
        return chain(this, function(x) {
          x = promiseCoerce(constructor, x);
          return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
        }, onReject);
      }
    }, {
      resolve: function(x) {
        if (this === $Promise) {
          if (isPromise(x)) {
            return x;
          }
          return promiseSet(new $Promise(promiseRaw), +1, x);
        } else {
          return new this(function(resolve, reject) {
            resolve(x);
          });
        }
      },
      reject: function(r) {
        if (this === $Promise) {
          return promiseSet(new $Promise(promiseRaw), -1, r);
        } else {
          return new this(function(resolve, reject) {
            reject(r);
          });
        }
      },
      all: function(values) {
        var deferred = getDeferred(this);
        var resolutions = [];
        try {
          var makeCountdownFunction = function(i) {
            return function(x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            };
          };
          var count = 0;
          var i = 0;
          var $__7 = true;
          var $__8 = false;
          var $__9 = undefined;
          try {
            for (var $__5 = void 0,
                $__4 = (values)[Symbol.iterator](); !($__7 = ($__5 = $__4.next()).done); $__7 = true) {
              var value = $__5.value;
              {
                var countdownFunction = makeCountdownFunction(i);
                this.resolve(value).then(countdownFunction, function(r) {
                  deferred.reject(r);
                });
                ++i;
                ++count;
              }
            }
          } catch ($__10) {
            $__8 = true;
            $__9 = $__10;
          } finally {
            try {
              if (!$__7 && $__4.return != null) {
                $__4.return();
              }
            } finally {
              if ($__8) {
                throw $__9;
              }
            }
          }
          if (count === 0) {
            deferred.resolve(resolutions);
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      },
      race: function(values) {
        var deferred = getDeferred(this);
        try {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(x) {
              deferred.resolve(x);
            }, function(r) {
              deferred.reject(r);
            });
          }
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      }
    });
  }();
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async(function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    });
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = createPrivateSymbol();
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        setPrivate(x, thenableSymbol, promise);
        return promise;
      }
      if (typeof then === 'function') {
        var p = getPrivate(x, thenableSymbol);
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          setPrivate(x, thenableSymbol, deferred.promise);
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Promise.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/StringIterator.js")),
      createIteratorResultObject = $__0.createIteratorResultObject,
      isObject = $__0.isObject;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function() {
    var $__3;
    function StringIterator() {}
    return ($traceurRuntime.createClass)(StringIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var o = this;
        if (!isObject(o) || !hasOwnProperty.call(o, iteratedString)) {
          throw new TypeError('this must be a StringIterator object');
        }
        var s = o[iteratedString];
        if (s === undefined) {
          return createIteratorResultObject(undefined, true);
        }
        var position = o[stringIteratorNextIndex];
        var len = s.length;
        if (position >= len) {
          o[iteratedString] = undefined;
          return createIteratorResultObject(undefined, true);
        }
        var first = s.charCodeAt(position);
        var resultString;
        if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
          resultString = String.fromCharCode(first);
        } else {
          var second = s.charCodeAt(position + 1);
          if (second < 0xDC00 || second > 0xDFFF) {
            resultString = String.fromCharCode(first);
          } else {
            resultString = String.fromCharCode(first) + String.fromCharCode(second);
          }
        }
        o[stringIteratorNextIndex] = position + resultString.length;
        return createIteratorResultObject(resultString, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[iteratedString] = s;
    iterator[stringIteratorNextIndex] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/String.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/String.js";
  var checkObjectCoercible = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../checkObjectCoercible.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")).default;
  var createStringIterator = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./StringIterator.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")).createStringIterator;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/String.js")),
      maybeAddFunctions = $__2.maybeAddFunctions,
      maybeAddIterator = $__2.maybeAddIterator,
      registerPolyfill = $__2.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function includes(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    if (search && $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (pos != pos) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    if (searchLength + start > stringLength) {
      return false;
    }
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint(_) {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get includes() {
      return includes;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/String.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/ArrayIterator.js")),
      toObject = $__0.toObject,
      toUint32 = $__0.toUint32,
      createIteratorResultObject = $__0.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function() {
    var $__3;
    function ArrayIterator() {}
    return ($traceurRuntime.createClass)(ArrayIterator, ($__3 = {}, Object.defineProperty($__3, "next", {
      value: function() {
        var iterator = toObject(this);
        var array = iterator.iteratorObject_;
        if (!array) {
          throw new TypeError('Object is not an ArrayIterator');
        }
        var index = iterator.arrayIteratorNextIndex_;
        var itemKind = iterator.arrayIterationKind_;
        var length = toUint32(array.length);
        if (index >= length) {
          iterator.arrayIteratorNextIndex_ = Infinity;
          return createIteratorResultObject(undefined, true);
        }
        iterator.arrayIteratorNextIndex_ = index + 1;
        if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
          return createIteratorResultObject(array[index], false);
        if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
          return createIteratorResultObject([index, array[index]], false);
        return createIteratorResultObject(index, false);
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), Object.defineProperty($__3, Symbol.iterator, {
      value: function() {
        return this;
      },
      configurable: true,
      enumerable: true,
      writable: true
    }), $__3), {});
  }();
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Array.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./ArrayIterator.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js")),
      entries = $__0.entries,
      keys = $__0.keys,
      jsValues = $__0.values;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Array.js")),
      checkIterable = $__1.checkIterable,
      isCallable = $__1.isCallable,
      isConstructor = $__1.isConstructor,
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill,
      toInteger = $__1.toInteger,
      toLength = $__1.toLength,
      toObject = $__1.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      var $__6 = true;
      var $__7 = false;
      var $__8 = undefined;
      try {
        for (var $__4 = void 0,
            $__3 = (items)[Symbol.iterator](); !($__6 = ($__4 = $__3.next()).done); $__6 = true) {
          var item = $__4.value;
          {
            if (mapping) {
              arr[k] = mapFn.call(thisArg, item, k);
            } else {
              arr[k] = item;
            }
            k++;
          }
        }
      } catch ($__9) {
        $__7 = true;
        $__8 = $__9;
      } finally {
        try {
          if (!$__6 && $__3.return != null) {
            $__3.return();
          }
        } finally {
          if ($__7) {
            throw $__8;
          }
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__10 = 0; $__10 < arguments.length; $__10++)
      items[$__10] = arguments[$__10];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__11 = global,
        Array = $__11.Array,
        Object = $__11.Object,
        Symbol = $__11.Symbol;
    var values = jsValues;
    if (Symbol && Symbol.iterator && Array.prototype[Symbol.iterator]) {
      values = Array.prototype[Symbol.iterator];
    }
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Array.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/assign.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/assign.js";
  var keys = Object.keys;
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = source == null ? [] : keys(source);
      var p = void 0,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        target[name] = source[name];
      }
    }
    return target;
  }
  var $__default = assign;
  return {get default() {
      return $__default;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Object.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js")),
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill;
  var assign = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./assign.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Object.js")).default;
  var $__3 = Object,
      defineProperty = $__3.defineProperty,
      getOwnPropertyDescriptor = $__3.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__3.getOwnPropertyNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get assign() {
      return assign;
    },
    get is() {
      return is;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Object.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Number.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Number.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Number.js")),
      isNumber = $__0.isNumber,
      maybeAddConsts = $__0.maybeAddConsts,
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill,
      toInteger = $__0.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Number.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/fround.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/fround.js";
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__1 = Math,
      LN2 = $__1.LN2,
      abs = $__1.abs,
      floor = $__1.floor,
      log = $__1.log,
      min = $__1.min,
      pow = $__1.pow;
  function packIEEE754(v, ebits, fbits) {
    var bias = (1 << (ebits - 1)) - 1,
        s,
        e,
        f,
        ln,
        i,
        bits,
        str,
        bytes;
    function roundToEven(n) {
      var w = floor(n),
          f = n - w;
      if (f < 0.5)
        return w;
      if (f > 0.5)
        return w + 1;
      return w % 2 ? w + 1 : w;
    }
    if (v !== v) {
      e = (1 << ebits) - 1;
      f = pow(2, fbits - 1);
      s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << ebits) - 1;
      f = 0;
      s = (v < 0) ? 1 : 0;
    } else if (v === 0) {
      e = 0;
      f = 0;
      s = (1 / v === -Infinity) ? 1 : 0;
    } else {
      s = v < 0;
      v = abs(v);
      if (v >= pow(2, 1 - bias)) {
        e = min(floor(log(v) / LN2), 1023);
        f = roundToEven(v / pow(2, e) * pow(2, fbits));
        if (f / pow(2, fbits) >= 2) {
          e = e + 1;
          f = 1;
        }
        if (e > bias) {
          e = (1 << ebits) - 1;
          f = 0;
        } else {
          e = e + bias;
          f = f - pow(2, fbits);
        }
      } else {
        e = 0;
        f = roundToEven(v / pow(2, 1 - bias - fbits));
      }
    }
    bits = [];
    for (i = fbits; i; i -= 1) {
      bits.push(f % 2 ? 1 : 0);
      f = floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
      bits.push(e % 2 ? 1 : 0);
      e = floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    str = bits.join('');
    bytes = [];
    while (str.length) {
      bytes.push(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }
  function unpackIEEE754(bytes, ebits, fbits) {
    var bits = [],
        i,
        j,
        b,
        str,
        bias,
        s,
        e,
        f;
    for (i = bytes.length; i; i -= 1) {
      b = bytes[i - 1];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1 : 0);
        b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join('');
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    e = parseInt(str.substring(1, 1 + ebits), 2);
    f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    } else if (e > 0) {
      return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
    } else if (f !== 0) {
      return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
    } else {
      return s < 0 ? -0 : 0;
    }
  }
  function unpackF32(b) {
    return unpackIEEE754(b, 8, 23);
  }
  function packF32(v) {
    return packIEEE754(v, 8, 23);
  }
  function fround(x) {
    if (x === 0 || !$isFinite(x) || $isNaN(x)) {
      return x;
    }
    return unpackF32(packF32(Number(x)));
  }
  return {get fround() {
      return fround;
    }};
});
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/Math.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js";
  var jsFround = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./fround.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js")).fround;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/Math.js")),
      maybeAddFunctions = $__1.maybeAddFunctions,
      registerPolyfill = $__1.registerPolyfill,
      toUint32 = $__1.toUint32;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $__3 = Math,
      abs = $__3.abs,
      ceil = $__3.ceil,
      exp = $__3.exp,
      floor = $__3.floor,
      log = $__3.log,
      pow = $__3.pow,
      sqrt = $__3.sqrt;
  function clz32(x) {
    x = toUint32(+x);
    if (x == 0)
      return 32;
    var result = 0;
    if ((x & 0xFFFF0000) === 0) {
      x <<= 16;
      result += 16;
    }
    ;
    if ((x & 0xFF000000) === 0) {
      x <<= 8;
      result += 8;
    }
    ;
    if ((x & 0xF0000000) === 0) {
      x <<= 4;
      result += 4;
    }
    ;
    if ((x & 0xC0000000) === 0) {
      x <<= 2;
      result += 2;
    }
    ;
    if ((x & 0x80000000) === 0) {
      x <<= 1;
      result += 1;
    }
    ;
    return result;
  }
  function imul(x, y) {
    x = toUint32(+x);
    y = toUint32(+y);
    var xh = (x >>> 16) & 0xffff;
    var xl = x & 0xffff;
    var yh = (y >>> 16) & 0xffff;
    var yl = y & 0xffff;
    return xl * yl + (((xh * yl + xl * yh) << 16) >>> 0) | 0;
  }
  function sign(x) {
    x = +x;
    if (x > 0)
      return 1;
    if (x < 0)
      return -1;
    return x;
  }
  function log10(x) {
    return log(x) * 0.434294481903251828;
  }
  function log2(x) {
    return log(x) * 1.442695040888963407;
  }
  function log1p(x) {
    x = +x;
    if (x < -1 || $isNaN(x)) {
      return NaN;
    }
    if (x === 0 || x === Infinity) {
      return x;
    }
    if (x === -1) {
      return -Infinity;
    }
    var result = 0;
    var n = 50;
    if (x < 0 || x > 1) {
      return log(1 + x);
    }
    for (var i = 1; i < n; i++) {
      if ((i % 2) === 0) {
        result -= pow(x, i) / i;
      } else {
        result += pow(x, i) / i;
      }
    }
    return result;
  }
  function expm1(x) {
    x = +x;
    if (x === -Infinity) {
      return -1;
    }
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return exp(x) - 1;
  }
  function cosh(x) {
    x = +x;
    if (x === 0) {
      return 1;
    }
    if ($isNaN(x)) {
      return NaN;
    }
    if (!$isFinite(x)) {
      return Infinity;
    }
    if (x < 0) {
      x = -x;
    }
    if (x > 21) {
      return exp(x) / 2;
    }
    return (exp(x) + exp(-x)) / 2;
  }
  function sinh(x) {
    x = +x;
    if (!$isFinite(x) || x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  }
  function tanh(x) {
    x = +x;
    if (x === 0)
      return x;
    if (!$isFinite(x))
      return sign(x);
    var exp1 = exp(x);
    var exp2 = exp(-x);
    return (exp1 - exp2) / (exp1 + exp2);
  }
  function acosh(x) {
    x = +x;
    if (x < 1)
      return NaN;
    if (!$isFinite(x))
      return x;
    return log(x + sqrt(x + 1) * sqrt(x - 1));
  }
  function asinh(x) {
    x = +x;
    if (x === 0 || !$isFinite(x))
      return x;
    if (x > 0)
      return log(x + sqrt(x * x + 1));
    return -log(-x + sqrt(x * x + 1));
  }
  function atanh(x) {
    x = +x;
    if (x === -1) {
      return -Infinity;
    }
    if (x === 1) {
      return Infinity;
    }
    if (x === 0) {
      return x;
    }
    if ($isNaN(x) || x < -1 || x > 1) {
      return NaN;
    }
    return 0.5 * log((1 + x) / (1 - x));
  }
  function hypot(x, y) {
    var length = arguments.length;
    var args = new Array(length);
    var max = 0;
    for (var i = 0; i < length; i++) {
      var n = arguments[i];
      n = +n;
      if (n === Infinity || n === -Infinity)
        return Infinity;
      n = abs(n);
      if (n > max)
        max = n;
      args[i] = n;
    }
    if (max === 0)
      max = 1;
    var sum = 0;
    var compensation = 0;
    for (var i = 0; i < length; i++) {
      var n = args[i] / max;
      var summand = n * n - compensation;
      var preliminary = sum + summand;
      compensation = (preliminary - sum) - summand;
      sum = preliminary;
    }
    return sqrt(sum) * max;
  }
  function trunc(x) {
    x = +x;
    if (x > 0)
      return floor(x);
    if (x < 0)
      return ceil(x);
    return x;
  }
  var fround,
      f32;
  if (typeof Float32Array === 'function') {
    f32 = new Float32Array(1);
    fround = function(x) {
      f32[0] = Number(x);
      return f32[0];
    };
  } else {
    fround = jsFround;
  }
  function cbrt(x) {
    x = +x;
    if (x === 0)
      return x;
    var negate = x < 0;
    if (negate)
      x = -x;
    var result = pow(x, 1 / 3);
    return negate ? -result : result;
  }
  function polyfillMath(global) {
    var Math = global.Math;
    maybeAddFunctions(Math, ['acosh', acosh, 'asinh', asinh, 'atanh', atanh, 'cbrt', cbrt, 'clz32', clz32, 'cosh', cosh, 'expm1', expm1, 'fround', fround, 'hypot', hypot, 'imul', imul, 'log10', log10, 'log1p', log1p, 'log2', log2, 'sign', sign, 'sinh', sinh, 'tanh', tanh, 'trunc', trunc]);
  }
  registerPolyfill(polyfillMath);
  return {
    get clz32() {
      return clz32;
    },
    get imul() {
      return imul;
    },
    get sign() {
      return sign;
    },
    get log10() {
      return log10;
    },
    get log2() {
      return log2;
    },
    get log1p() {
      return log1p;
    },
    get expm1() {
      return expm1;
    },
    get cosh() {
      return cosh;
    },
    get sinh() {
      return sinh;
    },
    get tanh() {
      return tanh;
    },
    get acosh() {
      return acosh;
    },
    get asinh() {
      return asinh;
    },
    get atanh() {
      return atanh;
    },
    get hypot() {
      return hypot;
    },
    get trunc() {
      return trunc;
    },
    get fround() {
      return fround;
    },
    get cbrt() {
      return cbrt;
    },
    get polyfillMath() {
      return polyfillMath;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/Math.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      deletePrivate = $__0.deletePrivate,
      getPrivate = $__0.getPrivate,
      hasPrivate = $__0.hasPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      hasFrozen = $__1.hasFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js")).default;
  var $__6 = Object,
      defineProperty = $__6.defineProperty,
      getOwnPropertyDescriptor = $__6.getOwnPropertyDescriptor,
      isExtensible = $__6.isExtensible;
  var $TypeError = TypeError;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var sentinel = {};
  var WeakMap = function() {
    function WeakMap() {
      this.name_ = createPrivateSymbol();
      this.frozenData_ = [];
    }
    return ($traceurRuntime.createClass)(WeakMap, {
      set: function(key, value) {
        if (!isObject(key))
          throw new $TypeError('key must be an object');
        if (!isExtensible(key)) {
          setFrozen(this.frozenData_, key, value);
        } else {
          setPrivate(key, this.name_, value);
        }
        return this;
      },
      get: function(key) {
        if (!isObject(key))
          return undefined;
        if (!isExtensible(key)) {
          return getFrozen(this.frozenData_, key);
        }
        return getPrivate(key, this.name_);
      },
      delete: function(key) {
        if (!isObject(key))
          return false;
        if (!isExtensible(key)) {
          return deleteFrozen(this.frozenData_, key);
        }
        return deletePrivate(key, this.name_);
      },
      has: function(key) {
        if (!isObject(key))
          return false;
        if (!isExtensible(key)) {
          return hasFrozen(this.frozenData_, key);
        }
        return hasPrivate(key, this.name_);
      }
    }, {});
  }();
  function needsPolyfill(global) {
    var $__8 = global,
        WeakMap = $__8.WeakMap,
        Symbol = $__8.Symbol;
    if (!WeakMap || !hasNativeSymbol()) {
      return true;
    }
    try {
      var o = {};
      var wm = new WeakMap([[o, false]]);
      return wm.get(o);
    } catch (e) {
      return false;
    }
  }
  function polyfillWeakMap(global) {
    if (needsPolyfill(global)) {
      global.WeakMap = WeakMap;
    }
  }
  registerPolyfill(polyfillWeakMap);
  return {
    get WeakMap() {
      return WeakMap;
    },
    get polyfillWeakMap() {
      return polyfillWeakMap;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakMap.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js";
  var $__0 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../private.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      createPrivateSymbol = $__0.createPrivateSymbol,
      deletePrivate = $__0.deletePrivate,
      getPrivate = $__0.getPrivate,
      hasPrivate = $__0.hasPrivate,
      setPrivate = $__0.setPrivate;
  var $__1 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../frozen-data.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      deleteFrozen = $__1.deleteFrozen,
      getFrozen = $__1.getFrozen,
      setFrozen = $__1.setFrozen;
  var $__2 = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")),
      isObject = $__2.isObject,
      registerPolyfill = $__2.registerPolyfill;
  var hasNativeSymbol = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("../has-native-symbols.js", "traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js")).default;
  var $__6 = Object,
      defineProperty = $__6.defineProperty,
      isExtensible = $__6.isExtensible;
  var $TypeError = TypeError;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var WeakSet = function() {
    function WeakSet() {
      this.name_ = createPrivateSymbol();
      this.frozenData_ = [];
    }
    return ($traceurRuntime.createClass)(WeakSet, {
      add: function(value) {
        if (!isObject(value))
          throw new $TypeError('value must be an object');
        if (!isExtensible(value)) {
          setFrozen(this.frozenData_, value, value);
        } else {
          setPrivate(value, this.name_, true);
        }
        return this;
      },
      delete: function(value) {
        if (!isObject(value))
          return false;
        if (!isExtensible(value)) {
          return deleteFrozen(this.frozenData_, value);
        }
        return deletePrivate(value, this.name_);
      },
      has: function(value) {
        if (!isObject(value))
          return false;
        if (!isExtensible(value)) {
          return getFrozen(this.frozenData_, value) === value;
        }
        return hasPrivate(value, this.name_);
      }
    }, {});
  }();
  function needsPolyfill(global) {
    var $__8 = global,
        WeakSet = $__8.WeakSet,
        Symbol = $__8.Symbol;
    if (!WeakSet || !hasNativeSymbol()) {
      return true;
    }
    try {
      var o = {};
      var wm = new WeakSet([[o]]);
      return !wm.has(o);
    } catch (e) {
      return false;
    }
  }
  function polyfillWeakSet(global) {
    if (needsPolyfill(global)) {
      global.WeakSet = WeakSet;
    }
  }
  registerPolyfill(polyfillWeakSet);
  return {
    get WeakSet() {
      return WeakSet;
    },
    get polyfillWeakSet() {
      return polyfillWeakSet;
    }
  };
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/WeakSet.js" + '');
$traceurRuntime.registerModule("traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js";
  var polyfillAll = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("./utils.js", "traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js")).polyfillAll;
  polyfillAll(Reflect.global);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
$traceurRuntime.getModule("traceur-runtime@0.0.105/src/runtime/polyfills/polyfills.js" + '');

System = curSystem; })();
!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.angular/componentRegistration.tests.js"], ["jquery","core/config","core/utils/common","events/visibility_change","angular","core/component_registrator","core/dom_component","ui/widget/ui.widget","integration/angular/template","ui/collection/ui.collection_widget.edit","integration/angular","ui/list","ui/button","../../helpers/ignoreAngularTimers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.angular/componentRegistration.tests.js", ["jquery", "core/config", "core/utils/common", "events/visibility_change", "angular", "core/component_registrator", "core/dom_component", "ui/widget/ui.widget", "integration/angular/template", "ui/collection/ui.collection_widget.edit", "integration/angular", "ui/list", "ui/button", "../../helpers/ignoreAngularTimers.js"], function($__export) {
  "use strict";
  var $,
      config,
      commonUtils,
      noop,
      visibilityChange,
      angular,
      registerComponent,
      DOMComponent,
      Widget,
      NgTemplate,
      CollectionWidget,
      FIXTURE_ELEMENT,
      initMarkup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      visibilityChange = $__m.default;
    }, function($__m) {
      angular = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      DOMComponent = $__m.default;
    }, function($__m) {
      Widget = $__m.default;
    }, function($__m) {
      NgTemplate = $__m.NgTemplate;
    }, function($__m) {
      CollectionWidget = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      noop = commonUtils.noop;
      FIXTURE_ELEMENT = function() {
        return $('#qunit-fixture');
      };
      QUnit.module('simple component tests', {beforeEach: function() {
          var componentRendered = $.Callbacks();
          var TestComponent = DOMComponent.inherit({
            _render: function() {
              var $__5;
              for (var args = [],
                  $__4 = 0; $__4 < arguments.length; $__4++)
                args[$__4] = arguments[$__4];
              componentRendered.fire();
              return ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(args));
            },
            _optionChanged: function() {
              this._invalidate();
            },
            _getDefaultOptions: function() {
              return {
                text: '',
                array: [],
                obj: null
              };
            },
            _useTemplates: function() {
              return false;
            }
          });
          this.componentRendered = componentRendered;
          this.testApp = angular.module('testApp', ['dx']);
          this.$container = $('<div/>').appendTo(FIXTURE_ELEMENT());
          this.$controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo(this.$container);
          registerComponent('dxTest', TestComponent);
        }});
      QUnit.test('simple component init', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ text: \'my text\' }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function() {});
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        assert.strictEqual($markup.scope(), scope);
        assert.ok(!scope.$$watchers);
      });
      QUnit.test('component options from scope', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'options').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.options = {text: 'my text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.options.text = 'change1';
        });
        assert.equal(instance.option('text'), 'my text');
        instance.option('text', 'change2');
        assert.equal(scope.options.text, 'change1');
        assert.strictEqual($markup.scope(), scope);
        assert.ok(!scope.$$watchers);
      });
      QUnit.test('component option fields from scope', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ text: vm.text }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'my text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.vm.text = 'change1';
        });
        assert.equal(instance.option('text'), 'my text');
        instance.option('text', 'change2');
        assert.equal(scope.vm.text, 'change1');
        assert.strictEqual($markup.scope(), scope);
        assert.ok(!scope.$$watchers);
      });
      QUnit.test('component with bindingOptions', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { text: \'vm.text\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'my text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.vm.text = 'change1';
        });
        assert.equal(instance.option('text'), 'change1');
        instance.option('text', 'change2');
        assert.equal(scope.vm.text, 'change2');
        assert.strictEqual($markup.scope(), scope);
        assert.equal(scope.$$watchers.length, 1);
        $markup.remove();
        assert.equal(scope.$$watchers.length, 0);
      });
      QUnit.test('component with bindingOptions and computed binding', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { text: \'vm[field]\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'my text'};
          $scope.field = 'text';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.vm.text = 'change1';
        });
        assert.equal(instance.option('text'), 'change1');
        instance.option('text', 'change2');
        assert.equal(scope.vm.text, 'change2');
      });
      QUnit.test('component with bindingOptions for nested option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ obj: { }, bindingOptions: { \'obj.text\': \'vm.caption\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {caption: 'my text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('obj.text'), 'my text');
        scope.$apply(function() {
          scope.vm.caption = 'change1';
        });
        assert.equal(instance.option('obj.text'), 'change1');
        instance.option('obj.text', 'change2');
        assert.equal(scope.vm.caption, 'change2');
      });
      QUnit.test('component with bindingOptions from scope', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: defs }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'my text'};
          $scope.defs = {text: 'vm.text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.vm.text = 'change1';
        });
        assert.equal(instance.option('text'), 'change1');
        instance.option('text', 'change2');
        assert.equal(scope.vm.text, 'change2');
        assert.strictEqual($markup.scope(), scope);
        assert.equal(scope.$$watchers.length, 1);
        $markup.remove();
        assert.equal(scope.$$watchers.length, 0);
      });
      QUnit.test('component with bindingOptions from scope inside sync action (T302197)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ onInitialized: inited, bindingOptions: defs }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'my text'};
          $scope.inited = function() {
            $scope.vm.text = 'new text';
          };
          $scope.defs = {text: 'vm.text'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        assert.equal(instance.option('text'), 'new text');
      });
      QUnit.test('component with bindingOptions from scope when invalid value for widget was set (T403775)', function(assert) {
        var TestComponent = DOMComponent.inherit({
          _optionChanged: function(args) {
            this._invalidate();
            if (args.name === 'width' && args.value < 0) {
              this.option('width', 0);
            }
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxTestWithValidatedOption', TestComponent);
        var $markup = $('<div></div>').attr('dx-test-with-validated-option', '{ bindingOptions: { width: \'width\' }}').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.width = 10;
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTestWithValidatedOption('instance');
        var scope = $markup.scope();
        assert.equal(scope.width, 10);
        assert.equal(instance.option('width'), 10);
        scope.$apply(function() {
          scope.width = -1;
        });
        assert.equal(scope.width, 0);
        assert.equal(instance.option('width'), 0);
      });
      QUnit.test('bindingOptions can be inherited inside options object (T426046)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'config').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          function baseOption() {}
          baseOption.prototype.bindingOptions = {text: 'text'};
          $scope.config = new baseOption();
          $scope.text = 'my text';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        instance.option('text', 'change text');
        assert.equal(scope.text, 'change text');
      });
      QUnit.test('bindingOptions fields can be inherited', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'config').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          function baseOption() {}
          baseOption.prototype.text = 'text';
          $scope.config = {};
          $scope.config.bindingOptions = new baseOption();
          $scope.text = 'my text';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        instance.option('text', 'change text');
        assert.equal(scope.text, 'change text');
      });
      QUnit.test('repeat binding', function(assert) {
        var $markup = $('<div/>').appendTo(this.$controller);
        var scope;
        $markup.append($('<div ng-repeat=\'item in vm.items\'>' + '   <div dx-test="{ bindingOptions: { text: \'item.text\' } }"></div>' + '</div>'));
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.vm = {items: [{text: '0'}, {text: '1'}]};
        });
        angular.bootstrap(this.$container, ['testApp']);
        assert.equal($markup.children().eq(1).children().dxTest('option', 'text'), '1');
        scope.$apply(function() {
          scope.vm.items.push({text: '2'});
        });
        assert.equal($markup.children().eq(2).children().dxTest('option', 'text'), '2');
        scope.$apply(function() {
          scope.vm.items.splice(1, 1);
        });
        assert.equal($markup.children().length, 2);
        var $firstElement = $markup.children().eq(1).children();
        var $secondElement = $markup.children().eq(1).children();
        var firstScope = $firstElement.scope();
        var secondScope = $secondElement.scope();
        scope.$apply(function() {
          $markup.remove();
        });
        assert.equal(firstScope.$$watchers.length, 0);
        assert.equal(secondScope.$$watchers.length, 0);
      });
      QUnit.test('DOMComponent does not control descendant bindings', function(assert) {
        var $markup = $('<div/>').appendTo(this.$controller);
        $markup.append($('<div dx-test>' + '   <ul>' + '       <li ng-repeat=\'item in vm.items\' ng-bind=\'item\'></li>' + '   </ul>' + '</div>'));
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {items: [1, 2, 3]};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var listItems = $markup.find('ul').children();
        assert.equal(listItems.length, 3);
        assert.equal(listItems.text(), '123');
      });
      QUnit.test('changing a field of bound object changes component option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { obj: \'obj\' } }').appendTo(this.$controller);
        var optionChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.obj = {a: 42};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.ok(!optionChanged);
        instance.on('optionChanged', function() {
          optionChanged = true;
        });
        scope.$apply(function() {
          scope.obj.a = 43;
        });
        assert.ok(optionChanged);
      });
      QUnit.test('binding options with deep=true for array option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { items: { deep: true, dataPath: \'dataItems\' } } }').appendTo(this.$controller);
        var optionChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.dataItems = [{value: 1}, {value: 2}, {value: 3}];
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.ok(!optionChanged);
        instance.on('optionChanged', function() {
          optionChanged = true;
        });
        scope.$apply(function() {
          scope.dataItems[0].value = 42;
        });
        assert.ok(optionChanged);
        assert.equal(instance.option('items')[0].value, 42);
      });
      QUnit.test('binding options with deep=false for array option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { items: { deep: false, dataPath: \'dataItems\' } } }').appendTo(this.$controller);
        var optionChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.dataItems = [{value: 1}, {value: 2}, {value: 3}];
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.ok(!optionChanged);
        instance.on('optionChanged', function() {
          optionChanged = true;
        });
        scope.$apply(function() {
          scope.dataItems[0].value = 42;
        });
        assert.ok(!optionChanged);
        assert.equal(instance.option('items')[0].value, 42);
      });
      QUnit.test('binding options with deep=true for not array option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { option: { deep: true, dataPath: \'dataValue\' } } }').appendTo(this.$controller);
        var optionChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.dataValue = {value: 1};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.ok(!optionChanged);
        instance.on('optionChanged', function() {
          optionChanged = true;
        });
        scope.$apply(function() {
          scope.dataValue.value = 42;
        });
        assert.ok(optionChanged);
        assert.equal(instance.option('option').value, 42);
      });
      QUnit.test('binding options with deep=false for not array option', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { text: { deep: false, dataPath: \'dataValue\' } } }').appendTo(this.$controller);
        var optionChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.dataValue = {value: 1};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        instance.on('optionChanged', function() {
          optionChanged = true;
        });
        scope.$apply(function() {
          scope.dataValue.value = 42;
        });
        assert.ok(!optionChanged);
      });
      QUnit.test('binding should fired once when option is a plain object', function(assert) {
        if (angular.version.minor < 3) {
          assert.expect(0);
          return;
        }
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { testOption: \'dataValue\' }, onOptionChanged: optionChangedHandler }').appendTo(this.$controller);
        var spy = sinon.spy();
        this.testApp.controller('my-controller', function($scope) {
          $scope.optionChangedHandler = spy;
          $scope.dataValue = {value: 1};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        spy.reset();
        instance.option('testOption', {value: 2});
        assert.equal(spy.callCount, 1, 'optionChanged action fired once');
      });
      QUnit.test('dependence options changed when option is a plain object', function(assert) {
        if (angular.version.minor < 3) {
          assert.expect(0);
          return;
        }
        var $widget = $('<div>').attr('dx-test', '{testOption: testOption, bindingOptions: {\'testOption.value\': \'testOption.value\', \'testOption.dependenceValue\': \'testOption.dependenceValue\' }}').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.testOption = {
            value: {value: 1},
            dependenceValue: 0
          };
          $scope.$watch('testOption.value', function() {
            $scope.testOption.dependenceValue++;
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        var widget = $widget.dxTest('instance');
        widget.option('testOption.value', {value: 2});
        assert.equal(widget.option('testOption.dependenceValue'), 2, 'dependence option was changed');
      });
      QUnit.test('option changed fired after value was set in the same value(plain object) then value was updated using angular', function(assert) {
        if (angular.version.minor < 3) {
          assert.expect(0);
          return;
        }
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { testOption: \'dataValue\' }, onOptionChanged: optionChangedHandler }').appendTo(this.$controller);
        var spy = sinon.spy();
        var value = {value: 1};
        this.testApp.controller('my-controller', function($scope) {
          $scope.optionChangedHandler = spy;
          $scope.dataValue = value;
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var instance = $markup.dxTest('instance');
        instance.option('testOption', value);
        spy.reset();
        scope.$apply(function() {
          scope.dataValue.value = 3;
        });
        assert.equal(spy.callCount, 1, 'optionChanged action fired once');
      });
      QUnit.test('Variable from scope not re-assign after change the corresponding widget options (T373260)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { option1_widget: \'option1_scope\', option2_widget: \'option2_scope\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          Object.defineProperty($scope, 'option1_scope', {
            get: function() {
              return $scope.option1;
            },
            set: function(value) {
              $scope.option1 = value;
              $scope.option2 = false;
            }
          });
          Object.defineProperty($scope, 'option2_scope', {
            get: function() {
              return $scope.option2;
            },
            set: function(value) {
              assert.ok(false, 'this method should not be called');
            }
          });
          $scope.option1 = 1;
          $scope.option2 = true;
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var instance = $markup.dxTest('instance');
        instance.option('option1_widget', 2);
        assert.equal(scope.option2_scope, false, 'binding worked');
        assert.equal(instance.option('option2_widget'), false, 'binding worked');
      });
      QUnit.test('Lockers works correctly when widget options changed using action (T381596)', function(assert) {
        var MyComponent = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {onClick: function(e) {
                e.component.option('testOption', false);
              }});
          },
          emulateAction: function() {
            this._createActionByOption('onClick')();
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMyComponent', MyComponent);
        var $markup = $('<div></div>').attr('dx-my-component', '{ bindingOptions: { testOption: \'testOption\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.testOption = true;
          $scope.changeScopeValue = function() {
            scope.$apply(function() {
              $scope.testOption = true;
            });
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var instance = $markup.dxMyComponent('instance');
        assert.equal(instance.option('testOption'), true, 'binding worked');
        instance.emulateAction();
        assert.equal(instance.option('testOption'), false, 'binding worked');
        scope.changeScopeValue();
        assert.equal(instance.option('testOption'), true, 'binding worked');
      });
      QUnit.test('The component should not be rendered more times than it needed', function(assert) {
        var rendered = sinon.stub();
        var MyComponent = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {onClick: function(e) {
                e.component.skipInvalidation = true;
                e.component.option('testOption', [3, 2, 1]);
              }});
          },
          _optionChanged: function() {
            var $__5;
            for (var args = [],
                $__4 = 0; $__4 < arguments.length; $__4++)
              args[$__4] = arguments[$__4];
            if (this.skipInvalidation) {
              this.skipInvalidation = false;
            } else {
              rendered();
              return ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(args));
            }
          },
          emulateAction: function() {
            this._createActionByOption('onClick')();
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMyComponent', MyComponent);
        var $markup = $('<div></div>').attr('dx-my-component', '{ bindingOptions: { testOption: \'testOption\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.testOption = [1, 2, 3];
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxMyComponent('instance');
        assert.equal(rendered.callCount, 1);
        instance.emulateAction();
        assert.equal(rendered.callCount, 1);
      });
      QUnit.test('WrappedAction should return function result (T388034)', function(assert) {
        var MyComponent = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {onTestAction: function(value) {
                return value.text;
              }});
          },
          emulateAction: function() {
            var testAction = this._createActionByOption('onTestAction');
            return testAction({text: 'testText'});
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMyComponent', MyComponent);
        var $markup = $('<div></div>').attr('dx-my-component', '{ }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function() {});
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxMyComponent('instance');
        var result = instance.emulateAction();
        assert.equal(result, 'testText', 'action return function result');
      });
      QUnit.test('Empty action doesn\'t call scope.$apply if config.wrapActionsBeforeExecute == true (T514528)', function(assert) {
        var originFlag = config().wrapActionsBeforeExecute;
        config({wrapActionsBeforeExecute: true});
        var TestDOMComponent = DOMComponent.inherit({_useTemplates: function() {
            return false;
          }});
        registerComponent('dxMyComponent', TestDOMComponent);
        var $markup = $('<div></div>').attr('dx-my-component', '{ }').appendTo(this.$controller);
        var applyCount = 0;
        this.testApp.controller('my-controller', function() {});
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var originApply = scope.$apply;
        scope.$apply = function(fn) {
          applyCount++;
          originApply.bind(fn, scope);
        };
        var instance = $markup.dxMyComponent('instance');
        instance._createActionByOption('onTestAction')();
        assert.equal(applyCount, 0);
        config({wrapActionsBeforeExecute: false});
        instance._createActionByOption('onTestAction2')();
        assert.equal(applyCount, 1);
        scope.$apply = originApply;
        config({wrapActionsBeforeExecute: originFlag});
      });
      QUnit.test('The option should be changed if changes occur before scope.$apply calling', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { text: \'text\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.text = 'initial text';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'initial text');
        assert.equal(scope.text, 'initial text');
        scope.text = 'change1';
        scope.$apply();
        assert.equal(instance.option('text'), 'change1');
        assert.equal(scope.text, 'change1');
        instance.option('text', 'change2');
        scope.$apply();
        assert.equal(instance.option('text'), 'change2');
        assert.equal(scope.text, 'change2');
        scope.text = 'change3';
        scope.text = 'change4';
        scope.$apply();
        assert.equal(instance.option('text'), 'change4');
        assert.equal(scope.text, 'change4');
        instance.option('text', 'change5');
        instance.option('text', 'change6');
        scope.$apply();
        assert.equal(instance.option('text'), 'change6');
        assert.equal(scope.text, 'change6');
      });
      QUnit.test('The \'release\' method shouldn\'t be called for an unlocked Lock object (T400093)', function(assert) {
        var MyComponent = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {onTestAction: function(args) {
                args.instance.option('text', 'second');
                args.instance.option('text', 'third');
                args.instance.option('obj.text', 'second');
                args.instance.option('obj.text', 'third');
              }});
          },
          emulateAction: function() {
            var testAction = this._createActionByOption('onTestAction');
            testAction({instance: this});
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMyComponentWithWrappedAction', MyComponent);
        var $markup = $('<div></div>').attr('dx-my-component-with-wrapped-action', '{ bindingOptions: { text: \'text\', obj: \'obj\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.text = 'first';
          $scope.obj = {text: 'first'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxMyComponentWithWrappedAction('instance');
        var scope = $markup.scope();
        try {
          instance.emulateAction();
          assert.ok(true, 'the error is not thrown');
        } catch (e) {
          assert.ok(false, 'the error is thrown (The \'release\' method was called for an unlocked Lock object)');
        }
        assert.equal(instance.option('text'), 'third');
        assert.equal(scope.text, 'third');
        assert.equal(instance.option('obj').text, 'third');
        assert.equal(scope.obj.text, 'third');
      });
      QUnit.test('Lockers works correctly when method _optionChangedCallbacks occur in external apply phase (T386467)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: {text: \'myText\'} }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.myText = '';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        scope.$apply(function() {
          try {
            instance.option('text', 'testText');
            assert.ok(true, 'the error is not thrown');
          } catch (e) {
            assert.ok(false, 'the error is thrown');
          }
        });
      });
      QUnit.test('Lockers works correctly for composite option (T382985)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ testOption: testOption, bindingOptions: { \'testOption.text\': \'testOption.text\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.testOption = {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var instance = $markup.dxTest('instance');
        scope.$apply(function() {
          scope.testOption.text = 'testText';
        });
        assert.equal(instance.option('testOption').text, 'testText', 'binding worked');
        scope.$apply(function() {
          scope.testOption.text = '';
        });
        assert.equal(instance.option('testOption').text, '', 'binding worked');
      });
      QUnit.test('Lockers works correctly for defineProperty (T396622)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', '{ bindingOptions: { text: \'publicText\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.privateText = 'test';
          Object.defineProperty($scope, 'publicText', {
            get: function() {
              return $scope.privateText;
            },
            set: function(value) {
              $scope.privateText = 'calculatedText';
            }
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        var instance = $markup.dxTest('instance');
        assert.equal(instance.option('text'), 'test', 'binding worked');
        assert.equal(scope.publicText, 'test', 'binding worked');
        instance.option('text', 'test2');
        assert.equal(instance.option('text'), 'calculatedText', 'binding worked');
        assert.equal(scope.publicText, 'calculatedText', 'binding worked');
      });
      QUnit.test('Binding works if options config object added to $scope after bootstrap (T314032)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'testSettings').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.myText = 'testText';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.testSettings = {bindingOptions: {text: 'myText'}};
        });
        assert.equal(instance.option('text'), 'testText');
        instance.option('text', 'testText2');
        assert.equal(scope.myText, 'testText2');
      });
      QUnit.test('changing several options causes single render', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'testSettings').appendTo(this.$controller);
        var renderedCount = 0;
        this.testApp.controller('my-controller', function($scope) {
          $scope.myText = 'testText';
          $scope.myObj = {a: 1};
          $scope.testSettings = {bindingOptions: {
              text: 'myText',
              obj: 'myObj'
            }};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        this.componentRendered.add(function() {
          renderedCount++;
        });
        scope.$apply(function() {
          scope.myText = 'testText 2';
          scope.myObj = {b: 2};
        });
        assert.equal(renderedCount, 1);
      });
      QUnit.test('beginUpdate and endUpdate must be called in pairs (T373299)', function(assert) {
        var beginWithoutEnd = 0;
        var endWithoutBegin = 0;
        var myComponent = DOMComponent.inherit({
          beginUpdate: function() {
            beginWithoutEnd++;
            this.callBase();
          },
          endUpdate: function() {
            if (beginWithoutEnd === 0) {
              endWithoutBegin++;
            } else {
              beginWithoutEnd--;
            }
            this.callBase();
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMytest', myComponent);
        var $markup = $('<div dx-mytest=\'settings\'></div>');
        $markup.appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.myText = 'testText';
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.settings = {bindingOptions: {text: 'myText'}};
        });
        assert.equal(beginWithoutEnd, 0, 'endUpdate was not called without beginUpdate');
        assert.equal(endWithoutBegin, 0, 'beginUpdate was not called without endUpdate');
      });
      QUnit.test('beginUpdate and endUpdate shouldn\'t fire only once for each apply', function(assert) {
        var beginUpdate = 0;
        var endUpdate = 0;
        var myComponent = DOMComponent.inherit({
          beginUpdate: function() {
            beginUpdate++;
            this.callBase();
          },
          endUpdate: function() {
            endUpdate++;
            this.callBase();
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxMytest', myComponent);
        var $markup = $('<div ng-repeat=\'item in items\'><div dx-mytest=\'settings\' ></div></div>');
        $markup.appendTo(this.$controller);
        var scope;
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.items = [1];
        });
        angular.bootstrap(this.$container, ['testApp']);
        var expectedUpdate = 2 * beginUpdate + 1;
        scope.$apply(function() {
          scope.items.push(2);
        });
        assert.equal(beginUpdate, expectedUpdate, 'endUpdate was not called without beginUpdate');
        assert.equal(endUpdate, expectedUpdate, 'beginUpdate was not called without endUpdate');
      });
      QUnit.test('Angular component should have \'templatesRenderAsynchronously\' option (T351071)', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'options').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.options = {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        assert.ok(instance.option('templatesRenderAsynchronously'), 'option should exist');
      });
      QUnit.test('Angular component should not fire \'triggerResizeEvent\' on \'contentReady\' event (T351071)', function(assert) {
        this.clock = sinon.useFakeTimers();
        var resizeEventSpy = sinon.spy(visibilityChange, 'triggerResizeEvent');
        var $markup = $('<div></div>').attr('dx-test', 'options').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.options = {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        instance._eventsStrategy.fireEvent('contentReady', {});
        this.clock.tick();
        assert.ok(!resizeEventSpy.called);
        this.clock.restore();
      });
      QUnit.test('options with undefined value should be passed correctly', function(assert) {
        var $markup = $('<div></div>').attr('dx-test', 'options').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.options = {text: undefined};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        assert.equal(instance.option('text'), undefined, 'option is passed correctly');
      });
      QUnit.test('Binding with several nested options with same parent should work correctly', function(assert) {
        var TestComponentWithDeprecated = DOMComponent.inherit({
          _setDeprecatedOptions: function() {
            this.callBase();
            this._deprecatedOptions['root.deprecated'] = {alias: 'root.child1'};
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxTestWithDeprecated', TestComponentWithDeprecated);
        var $markup = $('<div>').attr('dx-test-with-deprecated', '{ root: { }, bindingOptions: { \'root.child1\': \'prop\', \'root.child2\': \'prop\' } }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.prop = true;
        });
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTestWithDeprecated('instance');
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.prop = false;
        });
        assert.equal(instance.option('root.child1'), false);
        assert.equal(instance.option('root.child2'), false);
      });
      QUnit.test('Components should not affect on eachother lock engines', function(assert) {
        var needUpdating;
        var TestComponentWithEndUpdateAction = DOMComponent.inherit({
          endUpdate: function() {
            var $__5;
            for (var args = [],
                $__4 = 0; $__4 < arguments.length; $__4++)
              args[$__4] = arguments[$__4];
            if (needUpdating) {
              needUpdating = false;
              this._createActionByOption('onUpdate')();
            }
            ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(args));
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxTestWithAction', TestComponentWithEndUpdateAction);
        var $testElement = $('<div>').attr('dx-test', '{ bindingOptions: { text: \'prop\' } }');
        var $badNeighbor = $('<div>').attr('dx-test-with-action', '{ onUpdate: onUpdate }');
        this.$controller.append($badNeighbor).append($testElement);
        this.testApp.controller('my-controller', function($scope) {
          $scope.prop = 'value 1';
          $scope.onUpdate = function() {};
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = this.$controller.scope();
        var instance = $testElement.dxTest('instance');
        scope.$apply(function() {
          instance.option('text', 'value 2');
          needUpdating = true;
        });
        instance.option('text', 'value 3');
        assert.equal(scope.prop, 'value 3');
      });
      QUnit.test('Outdated disposing callbacks for rendering timer should be removed (T861258)', function(assert) {
        this.clock = sinon.useFakeTimers();
        var $markup = $('<div></div>').attr('dx-test', '{ text: \'my text\' }').appendTo(this.$controller);
        this.testApp.controller('my-controller', function() {});
        angular.bootstrap(this.$container, ['testApp']);
        var instance = $markup.dxTest('instance');
        var watchMethod = instance.option('integrationOptions.watchMethod');
        var addSpy = sinon.spy(instance._disposingCallbacks, 'add');
        var removeSpy = sinon.spy(instance._disposingCallbacks, 'remove');
        watchMethod(function() {}, function() {});
        this.clock.tick();
        assert.strictEqual(addSpy.callCount, removeSpy.callCount);
        this.clock.restore();
      });
      QUnit.module('nested Widget with templates enabled', {beforeEach: function() {
          var TestContainer = Widget.inherit({
            _getDefaultOptions: function() {
              return $.extend(this.callBase(), {text: ''});
            },
            _render: function() {
              var content = $('<div />').addClass('dx-content').appendTo(this.$element());
              this.option('integrationOptions.templates')['template'].render({container: content});
              var text = this.option('text');
              if (text) {
                content.append($('<span />').addClass('text-by-option').text(text));
              }
            },
            _renderContentImpl: noop,
            _clean: function() {
              this.$element().empty();
            },
            _optionChanged: function() {
              this._invalidate();
            }
          });
          var TestWidget = Widget.inherit({
            _getDefaultOptions: function() {
              return $.extend(this.callBase(), {text: ''});
            },
            _render: function() {
              this.$element().append($('<span />').text(this.option('text')));
            },
            _renderContentImpl: noop,
            _clean: function() {
              this.$element().empty();
            },
            _optionChanged: function() {
              this._invalidate();
            }
          });
          this.testApp = angular.module('testApp', ['dx']);
          this.$container = $('<div/>').appendTo(FIXTURE_ELEMENT());
          this.$controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo(this.$container);
          registerComponent('dxTestContainer', TestContainer);
          registerComponent('dxTestWidget', TestWidget);
        }});
      QUnit.test('two nested containers', function(assert) {
        var $markup = $('<div class=\'outerWidget\' dx-test-container>' + '   <div data-options=\'dxTemplate: { name: "template" }\' class=\'outer-template\'>' + '       <span ng-bind=\'vm.outerText\'></span>' + '       <div class=\'innerWidget\' dx-test-container>' + '           <div data-options=\'dxTemplate: { name: "template" }\' >' + '               <span ng-bind=\'vm.innerText\'></span>' + '           </div>' + '       </div>' + '   </div>' + '</div>').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {
            outerText: 'outer',
            innerText: 'inner'
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        var outerWidget = $markup;
        assert.equal(outerWidget.length, 1);
        var outerContent = outerWidget.children().children().children();
        assert.equal(outerContent.length, 2);
        assert.equal(outerContent.filter('span').text(), 'outer');
        var innerWidget = outerContent.filter('.innerWidget');
        assert.equal(innerWidget.length, 1);
        assert.equal(innerWidget.find('span').text(), 'inner');
      });
      QUnit.test('Dispose nested containers', function(assert) {
        var $markup = $('<div class=\'container\'>' + '<div class=\'outer\' dx-test-container>' + '<div data-options=\'dxTemplate: { name: "template" }\'>' + '<div class=\'inner\' dx-test-container>123</div>' + '</div>' + '</div>' + '</div>').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {});
        angular.bootstrap(this.$container, ['testApp']);
        var outer = $markup.find('.outer').dxTestContainer('instance');
        var inner = $markup.find('.inner').dxTestContainer('instance');
        var outerDisposed = false;
        var innerDisposed = false;
        outer.on('disposing', function() {
          outerDisposed = true;
        });
        inner.on('disposing', function() {
          innerDisposed = true;
        });
        outer.$element().remove();
        assert.ok(outerDisposed);
        assert.ok(innerDisposed);
      });
      QUnit.test('widget inside two nested containers', function(assert) {
        var $markup = $('<div dx-test-container=\'{ bindingOptions: { text: "vm.outerText" } }\'>' + '   <div class=\'middle\' dx-test-container=\'{ bindingOptions: { text: "vm.middleText" } }\'>' + '       <div class=\'inner\' dx-test-widget=\'{ bindingOptions: { text: "vm.innerText" } }\'></div>' + '   </div>' + '</div>').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {
            outerText: 'outerText',
            middleText: 'middleText',
            innerText: 'innerText'
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        scope.$apply(function() {
          scope.vm.outerText = 'new outerText';
          scope.vm.middleText = 'new middleText';
          scope.vm.innerText = 'new innerText';
        });
        var outer = $markup;
        assert.equal($.trim(outer.find('.dx-content:first > span').text()), 'new outerText');
        var middle = $markup.find('.middle');
        assert.equal($.trim(middle.find('.dx-content:first > span').text()), 'new middleText');
        var inner = $markup.find('.inner');
        assert.equal($.trim(inner.find('span').text()), 'new innerText');
      });
      QUnit.test('angular integration don\'t breaks defaultOptions', function(assert) {
        var TestDOMComponent = DOMComponent.inherit({_useTemplates: function() {
            return false;
          }});
        registerComponent('dxTestDOMComponent', TestDOMComponent);
        TestDOMComponent.defaultOptions({options: {test: 'customValue'}});
        assert.equal(new TestDOMComponent($('<div/>')).option('test'), 'customValue', 'default option sets correctly');
      });
      QUnit.test('dynamic templates should be supported by angular', function(assert) {
        var TestContainer = Widget.inherit({_renderContentImpl: function(template) {
            this._getTemplateByOption('template').render({container: this.$element()});
          }});
        registerComponent('dxTestContainerEmpty', TestContainer);
        var $markup = $('<div dx-test-container-empty=\'{ bindingOptions: { template: "vm.template" } }\'></div>').appendTo(this.$controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.text = 'Test';
          $scope.vm = {template: function() {
              return $('<script type="text/html" id="scriptTemplate"><div>{{text}}</div></script>');
            }};
        });
        angular.bootstrap(this.$container, ['testApp']);
        assert.equal($.trim($markup.text()), 'Test');
      });
      QUnit.test('Transclude inside dxComponent template (T318690). Since angularjs 1.3', function(assert) {
        assert.expect(1);
        this.testApp.directive('testDirective', function() {
          return ({
            restrict: 'E',
            transclude: true,
            template: '<div dx-test-container>' + '<div data-options=\'dxTemplate: { name: "template" }\'>' + '<div ng-transclude></div>' + '</div>' + '</div>'
          });
        });
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $markup = $('<test-directive><div class=\'transcluded-content\'></div></test-directive>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
        assert.equal($markup.children('[dx-test-container]').find('.transcluded-content').length, 1);
      });
      QUnit.test('Multi-slot transclusion should work with dx temapltes', function(assert) {
        var TestContainer = Widget.inherit({_renderContentImpl: function(template) {
            template = template || this.option('integrationOptions.templates').template;
            if (template) {
              template.render({container: this.$element()});
            }
          }});
        registerComponent('dxTestTranscluded', TestContainer);
        this.testApp.directive('testMultiTransclude', function() {
          return ({
            restrict: 'E',
            transclude: {'content': '?content'},
            template: "<div dx-test-transcluded=\"{}\">\n                    <div data-options=\"dxTemplate: { name: 'template'}\">\n                        <div ng-transclude=\"content\"></div>\n                    </div>\n                </div>"
          });
        });
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        $("<test-multi-transclude>\n        <content>Test content</content>\n    </test-multi-transclude>").appendTo($container);
        angular.bootstrap($container, ['testApp']);
        assert.equal($container.find('[dx-test-transcluded] content').text(), 'Test content');
      });
      QUnit.module('Widget & CollectionWidget with templates enabled', {beforeEach: function() {
          this.testApp = angular.module('testApp', ['dx']);
        }});
      QUnit.test('default NG template is not retrieved for widgets created with angular', function(assert) {
        var TestContainer = Widget.inherit({_renderContentImpl: function(template) {
            template = template || this.option('integrationOptions.templates').template;
            if (template) {
              template.render({container: this.$element()});
            }
          }});
        registerComponent('dxTestContainerEmpty', TestContainer);
        var $markup;
        var instance;
        var template;
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        $markup = $('<div dx-test-container-empty></div>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
        instance = $markup.dxTestContainerEmpty('instance');
        template = instance._getTemplate('test');
        assert.ok((template instanceof NgTemplate), 'default NG template is not retrieved');
        $markup = $('<div></div>').appendTo($container).dxTestContainerEmpty({});
        instance = $markup.dxTestContainerEmpty('instance');
        template = instance._getTemplate('test');
        assert.ok(!(template instanceof NgTemplate), 'default NG template not retrieved');
      });
      QUnit.test('retrieving default NG template for collection widgets created with angular', function(assert) {
        var TestContainer = CollectionWidget.inherit({_renderContentImpl: function(template) {
            template = template || this.option('integrationOptions.templates').template;
            if (template) {
              template.render({container: this.$element()});
            }
          }});
        registerComponent('dxTestContainerEmpty', TestContainer);
        var $markup;
        var instance;
        var template;
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        $markup = $('<div dx-test-container-empty></div>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
        instance = $markup.dxTestContainerEmpty('instance');
        template = instance._getTemplate('test');
        assert.ok((template instanceof NgTemplate), 'default NG template is not retrieved');
        $markup = $('<div></div>').appendTo($container).dxTestContainerEmpty({});
        instance = $markup.dxTestContainerEmpty('instance');
        template = instance._getTemplate('test');
        assert.ok(!(template instanceof NgTemplate), 'default NG template not retrieved');
      });
      QUnit.test('creates anonymous template from its contents', function(assert) {
        var TestContainer = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {items: null});
          },
          _render: function() {
            this.option('integrationOptions.templates')['template'].render({container: this.$element()});
          },
          _renderContentImpl: noop,
          _clean: function() {
            this.$element().empty();
          }
        });
        registerComponent('dxTestContainerAnonymousTemplate', TestContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var $markup = $('<div dx-test-container-anonymous-template=\'{ bindingOptions: { items: "vm.items" } }\'>' + '   <ul>' + '       <li ng-repeat=\'item in vm.items\' ng-bind=\'item\'></li>' + '   </ul>' + '</div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {items: [1, 2, 3]};
        });
        angular.bootstrap($container, ['testApp']);
        var instance = $markup.dxTestContainerAnonymousTemplate('instance');
        assert.ok(instance.option('integrationOptions.templates'));
        assert.ok(instance.option('integrationOptions.templates')['template']);
        var list = $markup.find('ul');
        assert.equal(list.length, 1);
        var listItems = list.children();
        assert.equal(listItems.length, 3);
        assert.equal(listItems.text(), '123');
      });
      QUnit.test('correct scope as model for template', function(assert) {
        var TestContainer = Widget.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {items: null});
          },
          _render: function() {
            this.option('integrationOptions.templates')['template'].render({container: this.$element()});
          },
          _renderContentImpl: noop,
          _clean: function() {
            this.$element().empty();
          }
        });
        registerComponent('dxTestContainerDataTemplate', TestContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var $markup = $('<div dx-test-container-data-template>' + '   <div>{{vm.text}}</div>' + '</div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {text: 'My text'};
        });
        angular.bootstrap($container, ['testApp']);
        assert.equal($.trim($markup.text()), 'My text');
        var parentScope = $markup.scope();
        var childScope = $markup.children().scope();
        parentScope.$apply(function() {
          parentScope.vm.text = 'New text';
        });
        assert.equal(childScope.vm.text, 'New text');
        assert.equal($.trim($markup.text()), 'New text');
        childScope.$apply(function() {
          childScope.vm.text = 'New text 2';
        });
        assert.equal(parentScope.vm.text, 'New text 2');
      });
      QUnit.test('two-way binding works correct for inner component (T577900)', function(assert) {
        var MyComponent = DOMComponent.inherit({
          emulateAction: function() {
            this._createActionByOption('onClick')();
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxComponentWithInnerComponent', MyComponent);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller as $ctrl').appendTo($container);
        $('<inner-component></inner-component>').appendTo($controller);
        this.testApp.controller('my-controller', function() {});
        angular.module('testApp').component('innerComponent', {
          controller: function() {
            this.widgetSettings = {
              onClick: function(args) {
                var prevText = args.component.option('text');
                args.component.option('text', prevText + '1');
              },
              bindingOptions: {text: '$ctrl.text'}
            };
          },
          template: '<div id=\'test\'>{{$ctrl.text}}</div>' + '<div id=\'widget\' dx-component-with-inner-component=\'$ctrl.widgetSettings\'></div>'
        });
        angular.bootstrap($container, ['testApp']);
        var testField = $('#test');
        var instance = $('#widget').dxComponentWithInnerComponent('instance');
        assert.equal(testField.text(), '');
        assert.equal(instance.option('text'), undefined);
        instance.emulateAction();
        assert.equal(testField.text(), 'undefined1');
        assert.equal(instance.option('text'), 'undefined1');
        instance.emulateAction();
        assert.equal(testField.text(), 'undefined11');
        assert.equal(instance.option('text'), 'undefined11');
      });
      QUnit.test('Directive is in DOM on linking (T306481)', function(assert) {
        assert.expect(1);
        var TestContainer = Widget.inherit({
          _render: function() {
            this.option('integrationOptions.templates')['template'].render({container: this.$element()});
          },
          _renderContentImpl: noop,
          _clean: function() {
            this.$element().empty();
          }
        });
        registerComponent('dxTestContainerWidget', TestContainer);
        this.testApp.directive('customDirective', function() {
          return ({
            restrict: 'E',
            replace: true,
            template: '<div>InnerContent</div>',
            link: function(scope, element) {
              assert.equal($(element).parent().length, 1, 'T306481');
            }
          });
        });
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        $('<div dx-test-container-widget=\'{}\'>' + '   <custom-directive/>' + '</div>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
      });
      QUnit.test('Widget options does not override scope properties', function(assert) {
        var TestContainer = Widget.inherit({_renderContentImpl: function(template) {
            template = template || this.option('integrationOptions.templates').template;
            if (template) {
              template.render({
                model: {text: 'Widget model'},
                container: this.$element()
              });
            }
          }});
        registerComponent('dxTestContainer1', TestContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var $markup = $('<div dx-test-container1=\'{ }\'>' + '   <div>{{text}}</div>' + '</div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          $scope.text = 'Controller model';
        });
        angular.bootstrap($container, ['testApp']);
        assert.equal($.trim($markup.text()), 'Controller model');
      });
      QUnit.module('ui.collectionWidget');
      initMarkup = function($markup, controller) {
        var TestCollectionContainer = CollectionWidget.inherit({
          _itemClass: function() {
            return 'dx-test-item';
          },
          _itemDataKey: function() {
            return 'dxTestItemData';
          }
        });
        var TestWidget = Widget.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {text: ''});
          },
          _render: function() {
            this.$element().append($('<span />').text(this.option('text')));
          },
          _clean: function() {
            this.$element().empty();
          }
        });
        registerComponent('dxTestCollectionContainer', TestCollectionContainer);
        registerComponent('dxTestWidget', TestWidget);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        $('<div/>').attr('ng-controller', 'my-controller').appendTo($container).append($markup);
        angular.module('testApp', ['dx']).controller('my-controller', controller);
        angular.bootstrap($container, ['testApp']);
        return $markup;
      };
      QUnit.test('collection container item value escalates to scope', function(assert) {
        var controller = function($scope) {
          $scope.collection = [{widgetText: 'my text'}];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\' dx-test-widget=\'{ bindingOptions: { text: "item.widgetText" } }\'>' + '   </div>' + '</div>'), controller);
        var scope = $markup.scope();
        var $item = $markup.children().children().eq(0);
        assert.equal($item.dxTestWidget('instance').option('text'), 'my text');
        scope.$apply(function() {
          scope.collection[0].widgetText = 'new text';
        });
        assert.equal($item.dxTestWidget('instance').option('text'), 'new text');
        $item.dxTestWidget('instance').option('text', 'own text');
        assert.equal(scope.collection[0].widgetText, 'own text');
      });
      QUnit.test('collection container primitive item value escalates to scope', function(assert) {
        var controller = function($scope) {
          $scope.collection = ['my text'];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\' dx-test-widget=\'{ bindingOptions: { text: "item" } }\'>' + '   </div>' + '</div>'), controller);
        var scope = $markup.scope();
        var $item = $markup.children().children().eq(0);
        assert.equal($item.dxTestWidget('instance').option('text'), 'my text');
        scope.$apply(function() {
          scope.collection[0] = 'new text';
        });
        $item = $markup.children().children().eq(0);
        assert.equal($item.dxTestWidget('instance').option('text'), 'new text');
        $item.dxTestWidget('instance').option('text', 'own text');
        assert.equal(scope.collection[0], 'own text');
      });
      QUnit.test('collection container item value escalates to scope: complex paths', function(assert) {
        var controller = function($scope) {
          $scope.vm = {collection: [{data: {widgetText: 'my text'}}]};
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'vm.collection\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\' dx-test-widget=\'{ bindingOptions: { text: "item.data.widgetText" } }\'>' + '   </div>' + '</div>'), controller);
        var scope = $markup.scope();
        var $item = $markup.children().children().eq(0);
        assert.equal($item.dxTestWidget('instance').option('text'), 'my text');
        scope.$apply(function() {
          scope.vm.collection[0].data.widgetText = 'new text';
        });
        assert.equal($item.dxTestWidget('instance').option('text'), 'new text');
        $item.dxTestWidget('instance').option('text', 'own text');
        assert.equal(scope.vm.collection[0].data.widgetText, 'own text');
      });
      QUnit.test('Bootstrap should not fail if container component changes element markup on init (Problem after updating Angular to 1.2.16)', function(assert) {
        var controller = function($scope) {
          $scope.vm = {items: [{text: '0'}, {text: '1'}]};
          $scope.listOptions = {
            data: 'vm',
            bindingOptions: {items: 'items'}
          };
        };
        initMarkup($('<div dx-list=\'listOptions\'>' + '<div data-options="dxTemplate: { name: \'item\' } " dx-button="{ bindingOptions: { text: text } }">' + '</div>' + '</div>'), controller);
        assert.ok(true, 'no fails on bootstrap');
      });
      QUnit.test('Global scope properties are accessible from item template', function(assert) {
        this.clock = sinon.useFakeTimers();
        var controller = function($scope) {
          $scope.collection = [{itemText: 'Item text'}];
          $scope.globalText = 'Global text';
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\'>' + '       <div ng-bind=\'item.itemText\' class=\'item-text\'>' + '       </div>' + '       <div ng-bind=\'globalText\' class=\'global-text\'>' + '       </div>' + '   </div>' + '</div>'), controller);
        this.clock.tick();
        assert.equal($('.item-text', $markup).text(), 'Item text');
        assert.equal($('.global-text', $markup).text(), 'Global text');
        this.clock.restore();
      });
      QUnit.test('binding to circular data (T144697)', function(assert) {
        var controller = function($scope) {
          $scope.collection = [];
          $scope.collection.push({
            text: 'Item text',
            parent: $scope.collection
          });
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }"></div>'), controller);
        var scope = $markup.scope();
        assert.equal($.trim($markup.text()), 'Item text');
        scope.$apply(function() {
          scope.collection[0].text = 'New text';
        });
        assert.equal($.trim($markup.text()), 'New text');
      });
      QUnit.test('watcher type changed (T145604)', function(assert) {
        var data = [];
        var controller = function($scope) {
          $scope.collection = undefined;
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }"></div>'), controller);
        var scope = $markup.scope();
        for (var i = 0; i < 100; i++) {
          data.push({text: 'Item text ' + i});
        }
        scope.$apply(function() {
          scope.collection = data;
        });
        var $watchOld = scope['$watch'];
        var watchLog = [];
        scope['$watch'] = function() {
          for (var args = [],
              $__4 = 0; $__4 < arguments.length; $__4++)
            args[$__4] = arguments[$__4];
          watchLog.push(args);
          return $watchOld.apply(args, this);
        };
        scope.$apply(function() {
          scope.collection[0].text = 'New text';
        });
        assert.equal(watchLog.length, 0, '$watch shouldn\'t be used');
      });
      QUnit.test('Defining item data alias by \'itemAlias\' with custom template for all items', function(assert) {
        var controller = function($scope) {
          $scope.collection = [1, 2, 3];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\'>' + '       <div dx-test-widget="{ bindingOptions: { text: \'item\' } }" class="test-widget"></div>' + '   </div>' + '</div>'), controller);
        var scope = $markup.scope();
        var $item = $markup.find('.test-widget').eq(0);
        assert.equal($item.dxTestWidget('option', 'text'), '1');
        scope.$apply(function() {
          scope.collection[0] = 'new text';
        });
        $item = $markup.find('.test-widget').eq(0);
        assert.equal($item.dxTestWidget('option', 'text'), 'new text');
        $item.dxTestWidget('option', 'text', 'widget text');
        assert.equal(scope.collection[0], 'widget text');
      });
      QUnit.test('Defining item data alias by \'itemAlias\' with custom template for some items', function(assert) {
        this.clock = sinon.useFakeTimers();
        var controller = function($scope) {
          $scope.collection = [{
            name: '0',
            template: 'customWidget'
          }, {
            name: '1',
            template: 'custom'
          }, {text: '2'}, '3'];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'collection\' } }" dx-item-alias="user">' + '   <div data-options=\'dxTemplate: { name: "customWidget" }\'>' + '       <div dx-test-widget="{ bindingOptions: { text: \'user.name\' } }" class="test-widget"></div>' + '   </div>' + '   <div data-options=\'dxTemplate: { name: "custom" }\'>' + '       {{user.name}}' + '   </div>' + '</div>'), controller);
        var scope = $markup.scope();
        this.clock.tick();
        var $items = $markup.children();
        assert.equal($items.eq(0).find('.test-widget').dxTestWidget('option', 'text'), '0');
        assert.equal($.trim($items.eq(1).text()), '1');
        assert.equal($.trim($items.eq(2).text()), '2');
        assert.equal($.trim($items.eq(3).text()), '3');
        scope.$apply(function() {
          scope.collection[0].name = 'new text 0';
          scope.collection[1].name = 'new text 1';
          scope.collection[2].text = 'new text 2';
          scope.collection[3] = 'new text 3';
        });
        this.clock.tick();
        $items = $markup.children();
        assert.equal($items.eq(0).find('.test-widget').dxTestWidget('option', 'text'), 'new text 0');
        assert.equal($.trim($items.eq(1).text()), 'new text 1');
        assert.equal($.trim($items.eq(2).text()), 'new text 2');
        assert.equal($.trim($items.eq(3).text()), 'new text 3');
        $items.eq(0).find('.test-widget').dxTestWidget('option', 'text', 'widget text');
        assert.equal(scope.collection[0].name, 'widget text');
        this.clock.restore();
      });
      QUnit.test('$index is available in markup (T542335)', function(assert) {
        var controller = function($scope) {
          $scope.items = [{text: 'text1'}, {text: 'text2'}];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ bindingOptions: { items: \'items\' } }" dx-item-alias="item">' + '   <div data-options=\'dxTemplate: { name: "item" }\'>' + '       <div dx-test-widget="{ bindingOptions: { text: \'$index\' } }" class="test-widget"></div>' + '   </div>' + '</div>'), controller);
        var $items = $markup.find('.test-widget');
        assert.equal($items.eq(0).dxTestWidget('option', 'text'), '0');
        assert.equal($items.eq(1).dxTestWidget('option', 'text'), '1');
      });
      QUnit.test('$id in item model not caused exception', function(assert) {
        var controller = function($scope) {
          $scope.collection = [{
            text: 'my text',
            $id: 1
          }];
        };
        var $markup = initMarkup($('<div dx-test-collection-container="{ items: collection }">' + '</div>'), controller);
        assert.equal($markup.text(), 'my text');
      });
      QUnit.module('misc and regressions', {beforeEach: function() {
          this.testApp = angular.module('testApp', ['dx']);
        }});
      QUnit.test('template.render() - data parameter is Scope', function(assert) {
        var TestContainer = Widget.inherit({
          _getDefaultOptions: function() {
            return $.extend(this.callBase(), {text: 'default'});
          },
          _init: function() {
            var $__5;
            for (var args = [],
                $__4 = 0; $__4 < arguments.length; $__4++)
              args[$__4] = arguments[$__4];
            ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(args));
            var element = this.$element().get(0);
            this.scope = angular.element(element).scope().$new();
            this.scope.text = this.option('text');
          },
          _render: function() {
            var content = $('<div />').addClass('dx-content').appendTo(this.$element());
            this.option('integrationOptions.templates')['template'].render({
              model: this.scope,
              container: content
            });
          },
          _renderContentImpl: noop,
          _optionChanged: function(args) {
            if (args.name === 'text') {
              var that = this;
              that.scope.$apply(function() {
                that.scope.text = args.value;
              });
            } else {
              this.callBase(args);
            }
          }
        });
        registerComponent('dxTestContainerScope', TestContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $markup = $('<div dx-test-container-scope=\'{ text: "my text" }\'>' + '   <div class=\'text\' ng-bind=\'text\'></div>' + '</div>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
        assert.equal($markup.find('.text').text(), 'my text');
        var instance = $markup.dxTestContainerScope('instance');
        instance.option('text', 'new text');
        assert.equal($markup.find('.text').text(), 'new text');
      });
      QUnit.test('binding for item of array option', function(assert) {
        var TestCollectionContainer = CollectionWidget.inherit({
          _itemClass: function() {
            return 'dx-test-item';
          },
          _itemDataKey: function() {
            return 'dxTestItemData';
          }
        });
        registerComponent('dxTestCollectionContainer', TestCollectionContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var $markup = $('<div dx-test-collection-container="{ items: [ { text: \'value 1\'}, { }, { } ], bindingOptions: { \'items[1].text\': \'item2\', \'items[2].text\': \'vm.item3\' } }">' + '</div>').appendTo($controller);
        var scope;
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.item2 = 'value 2';
          $scope.vm = {item3: 'value 3'};
        });
        angular.bootstrap($container, ['testApp']);
        assert.equal($markup.children().eq(1).text(), 'value 2');
        scope.$apply(function() {
          scope.item2 = 'new value 2';
          scope.vm.item3 = 'new value 3';
        });
        assert.equal($markup.children().eq(1).text(), 'new value 2');
        assert.equal($markup.children().eq(2).text(), 'new value 3');
        var instance = $markup.dxTestCollectionContainer('instance');
        instance.option('items', [{text: 'value 4'}, {text: 'value 5'}, {text: 'value 6'}]);
        assert.equal(scope.item2, 'value 5');
        assert.equal(scope.vm.item3, 'value 6');
      });
      QUnit.test('all values should be correct displayed in collection widget (T425426)', function(assert) {
        registerComponent('dxTestCollection', CollectionWidget);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var $markup = $('<div dx-test-collection="{ items: [ 0, 1, null, \'\', undefined, {}, false ] }"></div>').appendTo($controller);
        this.testApp.controller('my-controller', function() {});
        angular.bootstrap($container, ['testApp']);
        assert.equal($markup.children().eq(0).text(), '0');
        assert.equal($markup.children().eq(1).text(), '1');
        assert.equal($markup.children().eq(2).text(), '');
        assert.equal($markup.children().eq(3).text(), '');
        assert.equal($markup.children().eq(4).text(), '');
        assert.equal($markup.children().eq(5).text(), '');
        assert.equal($markup.children().eq(6).text(), 'false');
      });
      QUnit.test('child collection widget should be rendered correctly when template provider is specified', function(assert) {
        var ChildWidget = Widget.inherit({_render: function() {
            this.callBase();
            this.$element().addClass('child-widget');
          }});
        registerComponent('dxChildWidget', ChildWidget);
        var ParentWidget = Widget.inherit({_render: function() {
            this.callBase();
            var $childWidget = $('<div>').appendTo(this.$element());
            this._createComponent($childWidget, 'dxChildWidget');
          }});
        registerComponent('dxParentWidget', ParentWidget);
        var $container = $('<div>').appendTo(FIXTURE_ELEMENT());
        var $markup = $('<div dx-parent-widget=\'{}\'></div>').appendTo($container);
        angular.bootstrap($container, ['testApp']);
        assert.equal($markup.dxParentWidget('option', 'templatesRenderAsynchronously'), FIXTURE_ELEMENT().find('.child-widget').dxChildWidget('option', 'templatesRenderAsynchronously'), 'templatesRenderAsynchronously provided');
      });
      QUnit.test('memory leaks in CollectionWidget', function(assert) {
        var TestCollectionContainer = CollectionWidget.inherit({
          _itemClass: function() {
            return 'dx-test-item';
          },
          _itemDataKey: function() {
            return 'dxTestItemData';
          }
        });
        registerComponent('dxLeakTestCollectionContainer', TestCollectionContainer);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div/>').attr('ng-controller', 'my-controller').appendTo($container);
        var scope;
        $('<div dx-leak-test-collection-container="{ bindingOptions: { items: \'items\' } }" dx-item-alias="item"><span></span></div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.items = [{text: 'my text 1'}, {text: 'my text 2'}];
        });
        angular.bootstrap($container, ['testApp']);
        var calcSiblings = function(sibling) {
          var result = 0;
          while (sibling) {
            result++;
            sibling = sibling.$$nextSibling;
          }
          return result;
        };
        assert.equal(calcSiblings(scope.$$childHead), 2);
        scope.$apply(function() {
          scope.items.pop();
        });
        assert.equal(calcSiblings(scope.$$childHead), 1);
      });
      QUnit.test('binding inside ng-repeat (T137200)', function(assert) {
        var TestComponent = DOMComponent.inherit({
          _getDefaultOptions: function() {
            return {
              text: '',
              array: [],
              obj: null
            };
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxRepeatTest', TestComponent);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo($container);
        var scope;
        $('<div ng-repeat="vm in items">' + '    <div dx-repeat-test="{ bindingOptions: { text: \'vm.text\' } }"></div>' + '</div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.items = [{text: 'my text 1'}, {text: 'my text 2'}, {text: 'my text 3'}];
        });
        angular.bootstrap($container, ['testApp']);
        scope.$apply(function() {
          scope.items[0].text = 'new text';
        });
        var $elements = $('[dx-repeat-test]', $container);
        assert.equal($elements.first().dxRepeatTest('option', 'text'), 'new text');
        assert.equal($elements.last().dxRepeatTest('option', 'text'), 'my text 3');
      });
      QUnit.test('component should notify view model if option changed on ctor after initialization (T219862)', function(assert) {
        var ComponentClass = DOMComponent.inherit({
          _render: function() {
            this.callBase();
            this.option('a', 2);
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('test', ComponentClass);
        var $container = $('<div/>').appendTo(FIXTURE_ELEMENT());
        var $controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo($container);
        var scope;
        $('<div test="{ bindingOptions: { a: \'a\'} }"></div>').appendTo($controller);
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.a = 1;
        });
        angular.bootstrap($container, ['testApp']);
        assert.equal(scope.a, 2);
      });
      QUnit.test('Watchers executed after component initialization (T334273)', function(assert) {
        var exceptionFired = false;
        var app = angular.module('app', ['ng', 'dx']).factory('$exceptionHandler', function() {
          return function(exception, cause) {
            exceptionFired = true;
          };
        });
        var TestComponent = DOMComponent.inherit({_useTemplates: function() {
            return false;
          }});
        registerComponent('dxTest', TestComponent);
        app.directive('customDirective', [function() {
          return ({
            restrict: 'A',
            template: '<div>' + '<div dx-test="{ bindingOptions: { width: \'w\' }, height: \'0\' }"></div>' + '</div>',
            replace: true,
            compile: function(tElem, tAttrs) {
              return {'pre': function(scope, iElem, iAttrs, controller) {
                  scope.w = 0;
                }};
            }
          });
        }]);
        var element = $('<div custom-directive></div>').appendTo(FIXTURE_ELEMENT());
        angular.injector(['app']).invoke(function($rootScope, $compile) {
          $compile(element)($rootScope);
        });
        assert.ok(!exceptionFired, 'There is no any exceptions');
      });
      QUnit.module('component action context', {beforeEach: function() {
          var TestComponent = DOMComponent.inherit({
            _getDefaultOptions: function() {
              return $.extend(this.callBase(), {
                onHandler: noop,
                value: null
              });
            },
            trigger: function(e) {
              this._createAction(this.option('onHandler'))(e);
            },
            triggerByOption: function(e) {
              this._createActionByOption('onHandler')(e);
            },
            triggerByOptionCategoryRendering: function(e) {
              this._createActionByOption('onHandler', {category: 'rendering'})(e);
            },
            _useTemplates: function() {
              return false;
            }
          });
          this.testApp = angular.module('testApp', ['dx']);
          this.$container = $('<div/>').appendTo(FIXTURE_ELEMENT());
          this.$controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo(this.$container);
          registerComponent('dxActionTest', TestComponent);
        }});
      QUnit.test('component action created by option calls scope.$apply', function(assert) {
        var $markup = $('<div dx-action-test=\'{ onHandler: vm.handler }\'></div>').appendTo(this.$controller);
        var valueChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {
            handler: function(e) {
              $scope.vm.value = 'new value';
            },
            value: 'old value'
          };
          $scope.$watch('vm.value', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              valueChanged = true;
            }
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        $markup.dxActionTest('instance').triggerByOption();
        assert.ok(valueChanged);
      });
      QUnit.test('component internal action does not calls scope.$apply', function(assert) {
        var $markup = $('<div dx-action-test=\'{ onHandler: vm.handler }\'></div>').appendTo(this.$controller);
        var valueChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {
            handler: function(e) {
              $scope.vm.value = 'new value';
            },
            value: 'old value'
          };
          $scope.$watch('vm.value', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              valueChanged = true;
            }
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        $markup.dxActionTest('instance').trigger();
        assert.ok(!valueChanged);
      });
      QUnit.test('component created by option with category \'rendering\' does not calls scope.$apply', function(assert) {
        var $markup = $('<div dx-action-test=\'{ onHandler: vm.handler }\'></div>').appendTo(this.$controller);
        var valueChanged = false;
        this.testApp.controller('my-controller', function($scope) {
          $scope.vm = {
            handler: function(e) {
              $scope.vm.value = 'new value';
            },
            value: 'old value'
          };
          $scope.$watch('vm.value', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              valueChanged = true;
            }
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        $markup.dxActionTest('instance').triggerByOptionCategoryRendering();
        assert.ok(!valueChanged);
      });
      QUnit.test('change option in component action handler (phase $apply) ', function(assert) {
        var $markup = $('<div dx-action-test="{ onHandler: vm.handler,  bindingOptions: { value: \'vm.value\' }}"></div>').appendTo(this.$controller);
        var scope;
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.vm = {
            handler: function(e) {
              $markup.dxActionTest('option', 'value', 'new value');
            },
            value: 'old value'
          };
        });
        angular.bootstrap(this.$container, ['testApp']);
        $markup.dxActionTest('instance').triggerByOption();
        assert.equal(scope.vm.value, 'new value');
      });
      QUnit.test('component action context is component', function(assert) {
        var context;
        var handler = function(e) {
          context = this;
        };
        var $markup = $('<div></div>').appendTo(this.$container);
        $markup.dxActionTest({onHandler: handler});
        var component = $markup.dxActionTest('instance');
        component.triggerByOption();
        assert.equal(context, component);
      });
      QUnit.test('Using ng-expressions in dx syntax', function(assert) {
        var $markup = $('<div/>').attr('dx-action-test', '{ onHandler: \'vm.value = "new value"\' }').appendTo(this.$controller);
        var scope;
        this.testApp.controller('my-controller', function($scope) {
          scope = $scope;
          $scope.vm = {value: 'old value'};
        });
        angular.bootstrap(this.$container, ['testApp']);
        $markup.dxActionTest('instance').triggerByOption();
        assert.equal(scope.vm.value, 'new value');
      });
      QUnit.module('dxComponent as a template', {beforeEach: function() {
          var TemplateComponent = Widget.inherit({});
          this.testApp = angular.module('testApp', ['dx']);
          this.$container = $('<div/>').appendTo(FIXTURE_ELEMENT());
          registerComponent('dxTemplateComponent', TemplateComponent);
        }});
      QUnit.test('Parent directive scope value goes to template component option object', function(assert) {
        var initialWatchersCount;
        $('<custom-directive/>').appendTo(this.$container);
        this.testApp.directive('customDirective', function() {
          return ({
            restrict: 'E',
            replace: true,
            template: '<div dx-template-component="config"></div>',
            link: function(scope) {
              initialWatchersCount = scope.$$watchers.length;
              scope.boundOption = 'default value';
              scope.config = {
                text: 'my text',
                bindingOptions: {boundOption: 'boundOption'}
              };
            }
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        var $markup = this.$container.children();
        var instance = $markup.dxTemplateComponent('instance');
        var scope = $markup.scope();
        assert.equal(instance.option('text'), 'my text');
        scope.$apply(function() {
          scope.boundOption = 'new value';
        });
        assert.equal(instance.option('boundOption'), 'new value');
        assert.equal(scope.$$watchers.length, initialWatchersCount);
      });
      QUnit.test('No watchers on disposing', function(assert) {
        $('<custom-directive/>').appendTo(this.$container);
        this.testApp.directive('customDirective', function() {
          return ({
            restrict: 'E',
            replace: true,
            template: '<div dx-template-component="config"></div>',
            link: function(scope) {}
          });
        });
        angular.bootstrap(this.$container, ['testApp']);
        var $markup = this.$container.children();
        var instance = $markup.dxTemplateComponent('instance');
        var scope = $markup.scope();
        $markup.remove();
        assert.equal(scope.$$watchers.length, 1);
        assert.ok(!!instance);
      });
      QUnit.test('Component shouldn\'t watch digest callback after dispose', function(assert) {
        var beginCounter = 0;
        var endCounter = 0;
        var TestComponent = DOMComponent.inherit({
          beginUpdate: function(args) {
            var $__5;
            beginCounter++;
            ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(arguments));
          },
          endUpdate: function() {
            var $__5;
            for (var args = [],
                $__4 = 0; $__4 < arguments.length; $__4++)
              args[$__4] = arguments[$__4];
            endCounter++;
            ($__5 = this).callBase.apply($__5, $traceurRuntime.spread(args));
          },
          _useTemplates: function() {
            return false;
          }
        });
        registerComponent('dxTestWidget', TestComponent);
        var $markup = $('<div></div>').attr('dx-test-widget', '{}').appendTo(this.$container);
        angular.bootstrap(this.$container, ['testApp']);
        var scope = $markup.scope();
        $markup.remove();
        beginCounter = 0;
        endCounter = 0;
        scope.$apply(function() {});
        assert.equal(beginCounter, 0);
        assert.equal(endCounter, 0);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/config","core/utils/common","events/visibility_change","angular","core/component_registrator","core/dom_component","ui/widget/ui.widget","integration/angular/template","ui/collection/ui.collection_widget.edit","integration/angular","ui/list","ui/button","../../helpers/ignoreAngularTimers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/config"), require("core/utils/common"), require("events/visibility_change"), require("angular"), require("core/component_registrator"), require("core/dom_component"), require("ui/widget/ui.widget"), require("integration/angular/template"), require("ui/collection/ui.collection_widget.edit"), require("integration/angular"), require("ui/list"), require("ui/button"), require("../../helpers/ignoreAngularTimers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=componentRegistration.tests.js.map