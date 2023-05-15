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

(["testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.tests.js"], ["ui/data_grid","jquery","core/class","core/utils/console","core/utils/type","core/utils/common","core/utils/shadow_dom","core/devices","core/version","core/errors","ui/data_grid/ui.data_grid.core","data/data_source/data_source","data/array_store","localization/message","core/templates/template_engine_registry","animation/fx","core/config","../../helpers/ajaxMock.js","../../helpers/wrappers/dataGridWrappers.js","../../helpers/stylesHelper.js","../../helpers/checkDxFontIconHelper.js","../../helpers/dataGridHelper.js","core/utils/size","../../helpers/dataGridMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.tests.js", ["ui/data_grid", "jquery", "core/class", "core/utils/console", "core/utils/type", "core/utils/common", "core/utils/shadow_dom", "core/devices", "core/version", "core/errors", "ui/data_grid/ui.data_grid.core", "data/data_source/data_source", "data/array_store", "localization/message", "core/templates/template_engine_registry", "animation/fx", "core/config", "../../helpers/ajaxMock.js", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/stylesHelper.js", "../../helpers/checkDxFontIconHelper.js", "../../helpers/dataGridHelper.js", "core/utils/size", "../../helpers/dataGridMocks.js"], function($__export) {
  "use strict";
  var DataGrid,
      $,
      Class,
      logger,
      typeUtils,
      deferUpdate,
      addShadowDomStyles,
      devices,
      version,
      errors,
      gridCore,
      DataSource,
      ArrayStore,
      messageLocalization,
      setTemplateEngine,
      fx,
      config,
      ajaxMock,
      DataGridWrapper,
      getEmulatorStyles,
      checkDxFontIcon,
      DX_ICON_XLSX_FILE_CONTENT_CODE,
      DX_ICON_EXPORT_SELECTED_CONTENT_CODE,
      createDataGrid,
      baseModuleConfig,
      findShadowHostOrDocument,
      getOuterWidth,
      generateItems,
      DX_STATE_HOVER_CLASS,
      CELL_UPDATED_CLASS,
      ROW_INSERTED_CLASS,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      DataGrid = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Class = $__m.default;
    }, function($__m) {
      logger = $__m.logger;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      version = $__m.version;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      gridCore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      setTemplateEngine = $__m.setTemplateEngine;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      getEmulatorStyles = $__m.getEmulatorStyles;
    }, function($__m) {
      checkDxFontIcon = $__m.checkDxFontIcon;
      DX_ICON_XLSX_FILE_CONTENT_CODE = $__m.DX_ICON_XLSX_FILE_CONTENT_CODE;
      DX_ICON_EXPORT_SELECTED_CONTENT_CODE = $__m.DX_ICON_EXPORT_SELECTED_CONTENT_CODE;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
      findShadowHostOrDocument = $__m.findShadowHostOrDocument;
    }, function($__m) {
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      generateItems = $__m.generateItems;
    }],
    execute: function() {
      DX_STATE_HOVER_CLASS = 'dx-state-hover';
      CELL_UPDATED_CLASS = 'dx-datagrid-cell-updated-animation';
      ROW_INSERTED_CLASS = 'dx-datagrid-row-inserted-animation';
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      fx.off = true;
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\">\n                <div data-options=\"dxTemplate: { name: 'test' }\">Template Content</div>\n                <div data-options=\"dxTemplate: { name: 'test2' }\">Template Content2</div>\n                <table data-options=\"dxTemplate: { name: 'testRow' }\"><tr class=\"dx-row dx-data-row test\"><td colspan=\"2\">Row Content</td></tr></table>\n            </div>\n        </div>\n    ";
        var markup = ("\n        <style nonce=\"qunit-test\">\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n\n            .myClass .dx-editor-cell .dx-texteditor .dx-texteditor-input {\n                height: 60px;\n            }\n            " + getEmulatorStyles() + "\n        </style>\n\n        <!--qunit-fixture-->\n\n        " + gridMarkup + "\n\n        <script id=\"scriptTestTemplate1\" type=\"text/html\">\n            <span id=\"template1\">Template1</span>\n        </script>\n        <script id=\"scriptTestTemplate2\" type=\"text/html\">\n            <span>Template2</span>\n        </script>\n    ");
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.testDone(function() {
        ajaxMock.clear();
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Empty options', function(assert) {
          var dataGrid = createDataGrid({});
          assert.ok(dataGrid);
        });
        QUnit.test('No options', function(assert) {
          var dataGrid = createDataGrid();
          assert.ok(dataGrid);
          assert.strictEqual(dataGrid.getDataSource(), null);
        });
        QUnit.test('get data source', function(assert) {
          var dataGrid = createDataGrid({dataSource: [{field1: 1}]});
          assert.ok(dataGrid.getDataSource() instanceof DataSource);
        });
        QUnit.test('columns option is not changed after initialization when columnAutoWidth is enabled', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnAutoWidth: true,
            columns: ['field1', {dataField: 'field2'}],
            dataSource: [{
              field1: 1,
              field2: 2
            }]
          });
          assert.ok(dataGrid, 'dataGrid is created');
          assert.deepEqual(dataGrid.option('columns'), ['field1', {
            dataField: 'field2',
            name: 'field2'
          }], 'columns option is not changed');
        });
        QUnit.test('commonColumnOptions', function(assert) {
          var dataGrid = createDataGrid({});
          assert.deepEqual(dataGrid.option('commonColumnSettings'), {
            allowFiltering: true,
            allowHiding: true,
            allowSorting: true,
            allowEditing: true,
            allowExporting: true,
            encodeHtml: true,
            trueText: 'true',
            falseText: 'false'
          });
        });
        QUnit.test('Grid accessibility structure (T640539, T831996)', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var filterPanelWrapper = dataGridWrapper.filterPanel;
          var filterRowWrapper = dataGridWrapper.filterRow;
          var pagerWrapper = dataGridWrapper.pager;
          createDataGrid({
            dataSource: [{
              field1: '1',
              field2: '2',
              g0: 0
            }],
            filterPanel: {visible: true},
            filterRow: {visible: true},
            filterValue: ['field1', '=', '1'],
            pager: {
              visible: true,
              allowedPageSizes: [1, 2, 3, 4, 5],
              showPageSizeSelector: true,
              showNavigationButtons: true
            },
            masterDetail: {enabled: true},
            paging: {pageSize: 2},
            columns: [{type: 'selection'}, 'field1', 'field2', {
              dataField: 'g0',
              groupIndex: 0,
              showWhenGrouped: true
            }]
          });
          this.clock.tick(10);
          assert.equal($('.dx-widget').attr('role'), 'presentation', 'Widget role');
          assert.equal(filterRowWrapper.getEditorCell(0).attr('aria-label'), messageLocalization.format('dxDataGrid-ariaFilterCell'));
          assert.equal(filterRowWrapper.getEditorCell(1).attr('aria-label'), messageLocalization.format('dxDataGrid-ariaFilterCell'));
          assert.equal(filterRowWrapper.getEditorCell(0).attr('aria-describedby'), headersWrapper.getHeaderItem(0, 3).attr('id'));
          assert.equal(filterRowWrapper.getEditorCell(1).attr('aria-describedby'), headersWrapper.getHeaderItem(0, 4).attr('id'));
          assert.equal(filterRowWrapper.getTextEditorInput(0).attr('aria-label'), messageLocalization.format('dxDataGrid-ariaFilterCell'));
          assert.equal(filterRowWrapper.getTextEditorInput(1).attr('aria-label'), messageLocalization.format('dxDataGrid-ariaFilterCell'));
          assert.equal(filterRowWrapper.getTextEditorInput(0).attr('aria-describedby'), headersWrapper.getHeaderItem(0, 3).attr('id'));
          assert.equal(filterRowWrapper.getTextEditorInput(1).attr('aria-describedby'), headersWrapper.getHeaderItem(0, 4).attr('id'));
          assert.equal(dataGridWrapper.getElement().find('.dx-datagrid').attr('role'), 'grid', 'Grid role');
          assert.equal(headersWrapper.getElement().attr('role'), 'presentation', 'Headers role');
          assert.equal(headersWrapper.getColumnsIndicators().attr('role'), 'presentation', 'Headers columns indicators role');
          assert.equal($('.dx-datagrid-scroll-container').attr('role'), 'presentation', 'Scroll container role');
          assert.equal($('.dx-context-menu').attr('role'), 'presentation', 'Context menu role');
          assert.notOk(headersWrapper.getHeaderItem(0, 0).attr('id'), 'Group header indent has no ID attribute');
          assert.notOk(headersWrapper.getHeaderItem(0, 1).attr('id'), 'MasterDetail header indent has no ID attribute');
          assert.notOk(headersWrapper.getHeaderItem(0, 2).attr('id'), 'SelectAll header cell has no ID attribute');
          assert.notOk(rowsViewWrapper.getCellElement(0, 0).attr('aria-describedby'), 'Group cell[0, 0] has no aria-describedby');
          assert.notOk(rowsViewWrapper.getCellElement(0, 1).attr('aria-describedby'), 'Group cell[0, 1] has no aria-describedby');
          assert.notOk(rowsViewWrapper.getCellElement(1, 0).attr('aria-describedby'), 'Group indent cell[1, 0] has no aria-describedby');
          assert.notOk(rowsViewWrapper.getCellElement(1, 1).attr('aria-describedby'), 'MasterDetail expand cell[1, 1] has no aria-describedby');
          assert.notOk(rowsViewWrapper.getCellElement(1, 2).attr('aria-describedby'), 'Select cell[1, 2] has no aria-describedby');
          var headerId = headersWrapper.getHeaderItem(0, 3).attr('id');
          assert.ok(headerId.match(/dx-col-\d+/), 'HeaderCell[0, 3] ID is valid');
          assert.equal(rowsViewWrapper.getCellElement(1, 3).attr('aria-describedby'), headerId, 'Data cell[1, 3] aria-describedby is valid');
          headerId = headersWrapper.getHeaderItem(0, 4).attr('id');
          assert.ok(headerId.match(/dx-col-\d+/), 'HeaderCell[0, 4] ID is valid');
          assert.equal(rowsViewWrapper.getCellElement(1, 4).attr('aria-describedby'), headerId, 'Cell[1, 4] aria-describedby is valid');
          headerId = headersWrapper.getHeaderItem(0, 5).attr('id');
          assert.ok(headerId.match(/dx-col-\d+/), 'HeaderCell[0, 5] ID is valid (ShowWhenGrouped)');
          assert.equal(rowsViewWrapper.getCellElement(1, 5).attr('aria-describedby'), headerId, 'Cell[1, 5] aria-describedby is valid');
          assert.equal(headersWrapper.getTable().attr('role'), 'presentation', 'Headers table role');
          assert.equal(rowsViewWrapper.getTable().attr('role'), 'presentation', 'RowsView table role');
          var $freeSpaceRow = rowsViewWrapper.getFreeSpaceRow().getElement();
          assert.equal($freeSpaceRow.attr('role'), 'presentation');
          assert.equal(filterPanelWrapper.getIconFilter().attr('tabindex'), 0, 'Filter panel icon tabindex');
          assert.equal(filterPanelWrapper.getPanelText().attr('tabindex'), 0, 'Filter panel text tabindex');
          assert.equal(filterPanelWrapper.getClearFilterButton().attr('tabindex'), 0, 'Filter panel clear button tabindex');
          var $pageSizes = pagerWrapper.getPagerPageSizeElements();
          assert.equal($pageSizes.length, 5, 'pageSize count');
          $pageSizes.each(function(index, pageSize) {
            return assert.equal($(pageSize).attr('tabindex'), 0, ("pagesize " + index + " tabindex"));
          });
          var $pages = pagerWrapper.getPagerPagesElements();
          assert.equal($pages.length, 1, 'pages count');
          assert.equal($pages.attr('tabindex'), 0, 'page tabindex');
          var $buttons = pagerWrapper.getPagerButtonsElements();
          assert.equal($buttons.length, 2, 'buttons count');
          $buttons.each(function(index, button) {
            return assert.equal($(button).attr('tabindex'), -1, ("button " + index + " tabindex"));
          });
        });
        QUnit.test('cells should have aria-describedby attribute if column is without dataField', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          var rowsViewWrapper = dataGridWrapper.rowsView;
          createDataGrid({
            dataSource: [{}],
            columns: [{type: 'selection'}, {caption: 'test'}]
          });
          this.clock.tick(10);
          var $secondCell = rowsViewWrapper.getCellElement(0, 1);
          var $secondHeaderItem = headersWrapper.getHeaderItem(0, 1);
          assert.notOk(rowsViewWrapper.getCellElement(0, 0).attr('aria-describedby'), 'no aria-describedby on first cell');
          assert.equal($secondCell.attr('aria-describedby'), $secondHeaderItem.attr('id'), 'second cell\'s aria-describedby');
        });
        QUnit.test('DataGrid elements shouldn\'t have aria-describedby attributes if showColumnHeaders is false', function(assert) {
          createDataGrid({
            dataSource: [{
              field1: '1',
              field2: '2',
              g0: 0
            }],
            filterPanel: {visible: true},
            filterRow: {visible: true},
            filterValue: ['field1', '=', '1'],
            showColumnHeaders: false,
            pager: {
              visible: true,
              allowedPageSizes: [1, 2, 3, 4, 5],
              showPageSizeSelector: true,
              showNavigationButtons: true
            },
            masterDetail: {enabled: true},
            paging: {pageSize: 2},
            columns: [{type: 'selection'}, 'field1', 'field2', {
              dataField: 'g0',
              groupIndex: 0,
              showWhenGrouped: true
            }]
          });
          this.clock.tick(10);
          assert.equal($('[aria-describedby]').length, 0, 'No elements with aria-describedby attribute');
        });
        QUnit.test('Customize text called for column only (T653374)', function(assert) {
          createDataGrid({
            columns: ['field1', {
              dataField: 'field2',
              customizeText: function(cellInfo) {
                assert.equal(cellInfo.target, 'row');
                return cellInfo.valueText;
              }
            }],
            dataSource: {store: [{
                field1: '1123123',
                field2: 123
              }]}
          });
          this.clock.tick(10);
        });
        QUnit.test('noDataText option', function(assert) {
          var noDataText = 'Custom no data';
          var dataGrid = $('#dataGrid').dxDataGrid({noDataText: noDataText}).dxDataGrid('instance');
          assert.strictEqual(dataGrid.getView('rowsView').option('noDataText'), noDataText, 'valid noDataText in rowsView options');
        });
        QUnit.test('DataSource should be reset after changing remoteOperations', function(assert) {
          var storeLoadOptions;
          var dataSource = new DataSource({load: function(loadOptions) {
              storeLoadOptions = loadOptions;
              return $.Deferred().resolve([{
                name: 'Alex',
                age: 19
              }, {
                name: 'Dan',
                age: 25
              }], {totalCount: 2});
            }});
          var dataGrid = $('#dataGrid').dxDataGrid({}).dxDataGrid('instance');
          var options = {
            dataSource: dataSource,
            loadingTimeout: null,
            paging: {pageSize: 2},
            remoteOperations: true
          };
          dataGrid.option(options);
          assert.deepEqual(storeLoadOptions, {
            filter: undefined,
            group: null,
            requireTotalCount: true,
            searchExpr: undefined,
            searchOperation: 'contains',
            searchValue: null,
            skip: 0,
            sort: null,
            take: 2,
            userData: {}
          }, 'loadOptions');
        });
        QUnit.test('cellClick/cellHoverChanged handler should be executed when define via \'on\' method', function(assert) {
          var cellClickCount = 0;
          var cellHoverChangedCount = 0;
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            dataSource: [{
              field1: '1',
              field2: '2'
            }, {
              field1: '3',
              field2: '4'
            }]
          }).dxDataGrid('instance');
          dataGrid.on('cellClick', function(e) {
            cellClickCount++;
            assert.equal($(e.cellElement).get(0).tagName, 'TD', 'correct cell element tag');
            assert.equal($(e.cellElement).text(), '1', 'correct cell content');
          });
          dataGrid.on('cellHoverChanged', function(e) {
            cellHoverChangedCount++;
            assert.equal($(e.cellElement).get(0).tagName, 'TD', 'correct cell element tag');
            assert.equal($(e.cellElement).text(), '1', 'correct cell content');
          });
          $(dataGrid.$element()).find('.dx-datagrid-rowsview tr > td').eq(0).trigger('dxclick').trigger('mouseover').trigger('mouseout');
          assert.equal(cellClickCount, 1, 'Cell click is called once');
          assert.equal(cellHoverChangedCount, 2, 'Cell hover state changes 2 times');
        });
        QUnit.test('Context menu item\'s color and text should have the same color', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2', 'field3'],
            loadingTimeout: null,
            dataSource: {store: [{field1: '1'}]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-header-row td').eq(0).trigger('dxcontextmenu');
          var $menuItems = $('.dx-datagrid .dx-menu-item');
          assert.ok($menuItems.length, 'menu items');
          var $currentItem;
          for (var i = 0; i < $menuItems.length; i++) {
            $currentItem = $menuItems.eq(i);
            assert.equal($currentItem.find('.dx-icon').css('color'), $currentItem.find('.dx-menu-item-text').css('color'), 'colors are equal');
          }
        });
        QUnit.test('dataGrid first data rendering', function(assert) {
          $('#dataGrid').height(400);
          var templatesRenderedCount = 0;
          $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'field1',
              cellTemplate: function(cellElement) {
                assert.equal(typeUtils.isRenderer(cellElement), !!config().useJQuery, 'cellElement is correct');
                templatesRenderedCount++;
              }
            }],
            loadingTimeout: null,
            dataSource: {
              store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }],
              pageSize: 20
            }
          });
          assert.equal(templatesRenderedCount, 2, 'templates rendered once');
        });
        QUnit.test('headerCellTemplate when no dataSource', function(assert) {
          var templatesRenderedCount = 0;
          var $element = $('#dataGrid').dxDataGrid({columns: [{
              dataField: 'field1',
              headerCellTemplate: function(container) {
                assert.equal(typeUtils.isRenderer(container), !!config().useJQuery, 'headerCellElement is correct');
                $(container).addClass('field1-header');
                templatesRenderedCount++;
              }
            }]});
          assert.equal(templatesRenderedCount, 1, 'headerCellTemplate rendered once');
          assert.equal($element.find('.field1-header').length, 1, 'headerCellTemplate attached to grid');
        });
        QUnit.test('export.enabled: true, allowExportSelectedData: true -> check export menu icons (T757579)', function(assert) {
          $('#dataGrid').dxDataGrid({export: {
              enabled: true,
              allowExportSelectedData: true
            }});
          $('.dx-datagrid-export-button .dx-button').trigger('dxclick');
          checkDxFontIcon(assert, '.dx-icon-xlsxfile', DX_ICON_XLSX_FILE_CONTENT_CODE);
          checkDxFontIcon(assert, '.dx-icon-exportselected', DX_ICON_EXPORT_SELECTED_CONTENT_CODE);
        });
        QUnit.test('export.enabled: true, allowExportSelectedData: false -> check export menu icons (T827793)', function(assert) {
          $('#dataGrid').dxDataGrid({export: {
              enabled: true,
              allowExportSelectedData: false
            }});
          checkDxFontIcon(assert, '.dx-datagrid-export-button .dx-icon', DX_ICON_XLSX_FILE_CONTENT_CODE);
        });
        QUnit.test('Indexes after option change should be normalized before onOptionChanged callback', function(assert) {
          var onOptionChangedCallCount = 0;
          var grid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            allowColumnReordering: true,
            dataSource: [{}],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}],
            onOptionChanged: function(e) {
              onOptionChangedCallCount++;
              assert.equal(grid.columnOption(0, 'visibleIndex'), 1, 'first column visible index');
              assert.equal(grid.columnOption(1, 'visibleIndex'), 2, 'second column visible index');
              assert.equal(grid.columnOption(2, 'visibleIndex'), 0, 'third column visible index');
            }
          }).dxDataGrid('instance');
          grid.columnOption(2, 'visibleIndex', 0);
          assert.equal(grid.columnOption(0, 'visibleIndex'), 1, 'first column visible index');
          assert.equal(grid.columnOption(1, 'visibleIndex'), 2, 'second column visible index');
          assert.equal(grid.columnOption(2, 'visibleIndex'), 0, 'third column visible index');
          assert.equal(onOptionChangedCallCount, 1, 'onOptionChanged call count');
        });
        QUnit.test('Disable rows hover', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'birthDay'}],
            hoverStateEnabled: false
          });
          var $firstRow = $dataGrid.find('.dx-row').first();
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok(!$firstRow.hasClass(DX_STATE_HOVER_CLASS), 'row hasn\'t hover class');
        });
        QUnit.test('Enable rows hover', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'hover is disabled for not desktop devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'birthDay'}],
            hoverStateEnabled: true
          });
          var $firstRow = $dataGrid.find('.dx-row').first();
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($firstRow.hasClass(DX_STATE_HOVER_CLASS), 'row has hover class');
        });
        QUnit.test('Enable rows hover and row position', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'hover is disabled for not desktop devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'birthDay'}],
            hoverStateEnabled: true,
            focusedRowIndex: 0,
            focusedColumnIndex: 0
          });
          var $firstRow = $dataGrid.find('.dx-row').first();
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($firstRow.hasClass(DX_STATE_HOVER_CLASS), 'row has hover class');
        });
        QUnit.test('Test navigateToRow method if paging', function(assert) {
          var data = [{
            team: 'internal',
            name: 'Alex',
            age: 30
          }, {
            team: 'internal',
            name: 'Bob',
            age: 29
          }, {
            team: 'internal0',
            name: 'Ben',
            age: 24
          }, {
            team: 'internal0',
            name: 'Dan',
            age: 23
          }, {
            team: 'public',
            name: 'Alice',
            age: 19
          }, {
            team: 'public',
            name: 'Zeb',
            age: 18
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 80,
            dataSource: data,
            keyExpr: 'name',
            paging: {pageSize: 2},
            pager: {visible: false}
          }).dxDataGrid('instance');
          var keyboardController = dataGrid.getController('keyboardNavigation');
          dataGrid.navigateToRow('Zeb');
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 2, 'Page index');
          assert.equal(keyboardController.getVisibleRowIndex(), -1, 'Visible row index');
          assert.ok(dataGridWrapper.rowsView.isRowVisible(1, 1), 'Navigation row is visible');
        });
        QUnit.test('Enable rows hover via option method', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'hover is disabled for not desktop devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'birthDay'}]
          });
          var instance = $dataGrid.dxDataGrid('instance');
          var $firstRow = $dataGrid.find('.dx-row').first();
          instance.option('hoverStateEnabled', true);
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($firstRow.hasClass(DX_STATE_HOVER_CLASS), 'row has hover class');
        });
        QUnit.test('aria-rowindex aria-colindex if default pager mode', function(assert) {
          var array = [];
          var rows;
          var i;
          var rowIndex;
          for (i = 0; i < 10; i++) {
            array.push({
              author: 'J. D. Salinger',
              title: 'The Catcher in the Rye',
              year: 1951
            });
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            dataSource: array,
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var rowsView = dataGrid.getView('rowsView');
          rows = rowsView.element().find('.dx-row').filter(function(index, element) {
            return !$(element).hasClass('dx-freespace-row');
          });
          for (i = 0; i < rows.length; ++i) {
            rowIndex = i + 1;
            assert.equal($(rows[i]).attr('aria-rowindex'), rowIndex, 'aria-index = ' + rowIndex);
          }
          dataGrid.pageIndex(4);
          this.clock.tick(10);
          rows = rowsView.element().find('.dx-row').filter(function(index, element) {
            return !$(element).hasClass('dx-freespace-row');
          });
          for (i = 0; i < rows.length; ++i) {
            rowIndex = 8 + i + 1;
            assert.equal($(rows[i]).attr('aria-rowindex'), rowIndex, 'aria-index = ' + rowIndex);
          }
        });
        QUnit.test('DataGrid should apply columns that are dynamically added to a band (T815945)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              name: 'Alex',
              age: 22
            }, {
              name: 'Sahra',
              age: 22
            }],
            columns: [{caption: 'Band'}]
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.option('columns[0].columns', [{
            dataField: 'name',
            ownerBand: 0
          }]);
          this.clock.tick(10);
          assert.equal(dataGridWrapper.headers.getHeaderItemTextContent(1, 0), 'Name', 'name is applied');
          dataGrid.columnOption('Band', 'columns', [{
            dataField: 'name',
            ownerBand: 0
          }, {
            dataField: 'age',
            ownerBand: 0
          }]);
          this.clock.tick(10);
          assert.equal(dataGridWrapper.headers.getHeaderItemTextContent(1, 0), 'Name', 'name is applied');
          assert.equal(dataGridWrapper.headers.getHeaderItemTextContent(1, 1), 'Age', 'age is applied');
        });
        QUnit.test('Load count on start', function(assert) {
          var loadCallCount = 0;
          createDataGrid({
            remoteOperations: false,
            loadingTimeout: null,
            dataSource: {load: function() {
                loadCallCount++;
                return [];
              }}
          });
          assert.equal(loadCallCount, 1, 'one load count on start');
        });
        QUnit.skip('load from remote rest store when remoteOperations false', function(assert) {
          this.clock.restore();
          var done = assert.async();
          var errorMessage;
          logger.error = function(message) {
            errorMessage = message;
          };
          ajaxMock.setup({
            url: '/mock-rest-store',
            responseText: [{'a': 1}, {'a': 3}, {'a': 2}]
          });
          createDataGrid({
            dataSource: '/mock-rest-store',
            remoteOperations: false,
            onContentReady: function(e) {
              assert.ok(!errorMessage, 'no error messages');
              assert.equal(e.component.pageCount(), 1, 'pageCount');
              assert.equal(e.component.totalCount(), 3, 'totalCount');
              assert.equal(e.component.getController('data').items().length, 3, 'items length');
              done();
            }
          });
        });
        QUnit.test('keyOf should not be called too often after push with row updates', function(assert) {
          var arrayStore = new ArrayStore({
            data: [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}],
            key: 'id'
          });
          createDataGrid({dataSource: arrayStore});
          var keyOfSpy = sinon.spy(arrayStore, 'keyOf');
          this.clock.tick(10);
          assert.equal(keyOfSpy.callCount, 5, 'keyOf call count');
          for (var i = 0; i < 5; i++) {
            arrayStore.push([{
              type: 'update',
              key: i,
              data: {id: i}
            }]);
          }
          this.clock.tick(10);
          assert.equal(keyOfSpy.callCount, 55, 'keyOf call count');
        });
        QUnit.test('isReady when loading', function(assert) {
          var d = $.Deferred();
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {load: function() {
                return d;
              }}
          });
          assert.ok(!dataGrid.isReady(), 'dataGrid is not ready');
          d.resolve([], {totalCount: 0});
          assert.ok(dataGrid.isReady(), 'dataGrid is ready');
        });
        QUnit.test('Error on loading', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1', 'field2'],
            dataSource: {load: function() {
                return $.Deferred().reject('Test Error');
              }}
          });
          this.clock.tick(10);
          assert.ok(dataGrid.isReady(), 'dataGrid is ready');
          assert.ok(!dataGrid.getController('data').isLoaded(), 'data is not loaded');
          var $errorRow = $($(dataGrid.$element()).find('.dx-error-row'));
          assert.equal($errorRow.length, 1, 'error row is shown');
          assert.equal($errorRow.children().attr('colspan'), '2', 'error row colspan');
          assert.equal($errorRow.find('.dx-error-message').text(), 'Test Error', 'error row text');
        });
        QUnit.test('Raise error if key field is missed', function(assert) {
          var errorUrl = 'http://js.devexpress.com/error/' + version.split('.').slice(0, 2).join('_') + '/E1046';
          var dataGrid = createDataGrid({
            columns: ['field1'],
            keyExpr: 'ID',
            dataSource: [{
              ID: 1,
              field1: 'John'
            }, {field1: 'Olivia'}]
          });
          this.clock.tick(10);
          var $errorRow = $($(dataGrid.$element()).find('.dx-error-row'));
          assert.equal($errorRow.length, 1, 'error row is shown');
          assert.equal($errorRow.find('.dx-error-message').text().slice(0, 5), 'E1046', 'error number');
          assert.equal($errorRow.find('.dx-error-message > a').attr('href'), errorUrl, 'Url error code');
        });
        QUnit.test('Raise error if key field is missed and one of columns is named \'key\'', function(assert) {
          var errorUrl = 'http://js.devexpress.com/error/' + version.split('.').slice(0, 2).join('_') + '/E1046';
          var dataGrid = createDataGrid({
            columns: ['key'],
            keyExpr: 'ID',
            dataSource: [{
              ID: 1,
              key: 'John'
            }, {key: 'Olivia'}]
          });
          this.clock.tick(10);
          var $errorRow = $($(dataGrid.$element()).find('.dx-error-row'));
          assert.equal($errorRow.length, 1, 'error row is shown');
          assert.equal($errorRow.find('.dx-error-message').text().slice(0, 5), 'E1046', 'error number');
          assert.equal($errorRow.find('.dx-error-message > a').attr('href'), errorUrl, 'Url error code');
        });
        QUnit.test('Not raise error if key field is null', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1'],
            keyExpr: 'ID',
            dataSource: [{
              ID: 1,
              field1: 'John'
            }, {
              ID: null,
              field1: 'Olivia'
            }]
          });
          this.clock.tick(10);
          var $errorRow = $($(dataGrid.$element()).find('.dx-error-row'));
          assert.equal($errorRow.length, 0, 'error row is not shown');
        });
        QUnit.test('columnHeaders visibility after change some options', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1', 'field2'],
            dataSource: []
          });
          this.clock.tick(10);
          dataGrid.option({
            dataSource: [],
            columns: ['field1', 'field2'],
            sorting: {mode: 'multiple'}
          });
          assert.ok(!dataGrid.isReady(), 'dataGrid is not ready');
          assert.ok(!dataGrid.getController('data').isLoaded(), 'data is not loaded');
          assert.equal($(dataGrid.$element()).find('.dx-header-row').length, 1, 'header row is rendered');
          assert.ok($(dataGrid.$element()).find('.dx-header-row').is(':visible'), 'header row is visible');
        });
        QUnit.test('Load panel visibility during first loading', function(assert) {
          var loadResult = $.Deferred();
          var dataGrid = createDataGrid({
            remoteOperations: false,
            dataSource: {load: function() {
                return loadResult;
              }}
          });
          this.clock.tick(500);
          var $loadPanel = $($(dataGrid.$element()).find('.dx-loadpanel'));
          assert.ok($loadPanel.is(':visible'), 'load panel is visible');
          loadResult.resolve([]);
          this.clock.tick(500);
          assert.ok(!$loadPanel.is(':visible'), 'load panel is not visible');
        });
        QUnit.test('Load panel is not rendered for ArrayStore', function(assert) {
          var dataGrid = createDataGrid({dataSource: []});
          this.clock.tick(500);
          var $loadPanel = $($(dataGrid.$element()).find('.dx-loadpanel'));
          assert.ok(!$loadPanel.length, 'load panel is visible');
        });
        QUnit.test('Load panel should not be visible after load error and resize', function(assert) {
          var loadResult = $.Deferred();
          var dataGrid = createDataGrid({dataSource: {load: function() {
                return loadResult;
              }}});
          this.clock.tick(500);
          var $loadPanel = $($(dataGrid.$element()).find('.dx-loadpanel'));
          assert.ok($loadPanel.is(':visible'), 'load panel is visible');
          loadResult.reject('load error');
          this.clock.tick(500);
          dataGrid.updateDimensions();
          assert.ok(!$loadPanel.is(':visible'), 'load panel is not visible');
        });
        QUnit.test('Toolbar templates should be called when toolbar is attached to dom', function(assert) {
          var toolbarPreparingCallCount = 0;
          var toolbarTemplateCallCount = 0;
          createDataGrid({
            onToolbarPreparing: function(e) {
              toolbarPreparingCallCount++;
              e.toolbarOptions.items.push({template: function(data, index, container) {
                  toolbarTemplateCallCount++;
                  assert.ok($(container).closest(e.element).length, 'toolbar item container is attached to grid element');
                }});
            },
            dataSource: []
          });
          this.clock.tick(10);
          assert.equal(toolbarPreparingCallCount, 1, 'onToolbarPreparing is called once');
          assert.equal(toolbarTemplateCallCount, 1, 'toolbar template is called once');
        });
        QUnit.test('Custom toolbar item should be aligned', function(assert) {
          var dataGrid = createDataGrid({
            editing: {allowAdding: true},
            searchPanel: {visible: true},
            onToolbarPreparing: function(e) {
              e.toolbarOptions.items.push({
                location: 'after',
                widget: 'dxDateBox'
              });
            }
          });
          var toolbarItemOffset = $(dataGrid.$element()).find('.dx-toolbar .dx-button').offset().top;
          assert.equal(toolbarItemOffset, $(dataGrid.$element()).find('.dx-datagrid-search-panel').offset().top, 'toolbar search panel is aligned');
          assert.roughEqual(toolbarItemOffset, $(dataGrid.$element()).find('.dx-toolbar .dx-datebox').offset().top, 0.51, 'toolbar custom item is aligned');
        });
        QUnit.test('Column caption should have correct width when sorting is disabled (T1009923)', function(assert) {
          var dataGrid = createDataGrid({
            sorting: {mode: 'none'},
            columns: [{
              caption: 'my field',
              dataField: 'field1',
              width: 50
            }]
          });
          var $cellElements = $(dataGrid.element()).find('.dx-datagrid-headers .dx-header-row').children();
          var $cellContent = $cellElements.eq(0).find('.dx-datagrid-text-content');
          assert.roughEqual($cellContent.width(), 35.5, 1, 'correct width');
        });
        QUnit.test('Column caption should have correct width when column is sorted (T1009923)', function(assert) {
          var dataGrid = createDataGrid({columns: [{
              caption: 'my field',
              dataField: 'field1',
              width: 50,
              sortIndex: 0,
              sortOrder: 'asc'
            }]});
          var $cellElements = $(dataGrid.element()).find('.dx-datagrid-headers .dx-header-row').children();
          var $cellContent = $cellElements.eq(0).find('.dx-datagrid-text-content');
          assert.ok($cellContent.hasClass('dx-sort-indicator'), 'sorted');
          assert.roughEqual($cellContent.width(), 18.5, 1, 'correct width');
        });
        QUnit.test('Column caption should have correct width when header filter is visible (T1009923)', function(assert) {
          var dataGrid = createDataGrid({
            headerFilter: {visible: true},
            columns: [{
              caption: 'my field',
              dataField: 'field1',
              width: 50
            }]
          });
          var $cellElements = $(dataGrid.element()).find('.dx-datagrid-headers .dx-header-row').children();
          var $cellContent = $cellElements.eq(0).find('.dx-datagrid-text-content');
          assert.ok($cellContent.hasClass('dx-header-filter-indicator'), 'header filter');
          assert.roughEqual($cellContent.width(), 18.5, 1, 'correct width');
        });
        QUnit.test('Column caption should have correct width when header filter and sorting are enabled (T1009923)', function(assert) {
          var dataGrid = createDataGrid({
            headerFilter: {visible: true},
            columns: [{
              caption: 'my field',
              dataField: 'field1',
              width: 50,
              sortIndex: 0,
              sortOrder: 'asc'
            }]
          });
          var $cellElements = $(dataGrid.element()).find('.dx-datagrid-headers .dx-header-row').children();
          var $cellContent = $cellElements.eq(0).find('.dx-datagrid-text-content');
          assert.ok($cellContent.hasClass('dx-header-filter-indicator'), 'header filter');
          assert.ok($cellContent.hasClass('dx-sort-indicator'), 'sorted');
          assert.roughEqual($cellContent.width(), 4.5, 1, 'correct width');
        });
        ['Row', 'Cell', 'Batch'].forEach(function(editMode) {
          QUnit.test((editMode + " - rowIndex should be correct in cellClick event handler (T1027155)"), function(assert) {
            var rowIndices = [];
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field: 'test1'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true
              },
              onCellClick: function(e) {
                rowIndices.push(e.rowIndex);
              }
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            rowIndices = [];
            for (var i = 0; i < 2; i++) {
              $(dataGrid.getCellElement(i, 0)).trigger('dxclick');
            }
            assert.deepEqual(rowIndices, [0, 1], 'cellClick row indices');
          });
          QUnit.test((editMode + " - rowIndex should be correct in rowClick event handler (T1027155)"), function(assert) {
            var rowIndex = null;
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field: 'test1'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true
              },
              onRowClick: function(e) {
                rowIndex = e.rowIndex;
              }
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            $(dataGrid.getCellElement(1, 0)).trigger('dxclick');
            assert.deepEqual(rowIndex, 1, 'rowClick row index');
          });
          QUnit.test((editMode + " - rowIndex should be correct in cellDblClick event handler (T1027155)"), function(assert) {
            var rowIndices = [];
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field: 'test1'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true
              },
              onCellDblClick: function(e) {
                rowIndices.push(e.rowIndex);
              }
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            rowIndices = [];
            for (var i = 0; i < 2; i++) {
              $(dataGrid.getCellElement(i, 0)).trigger('dxdblclick');
            }
            assert.deepEqual(rowIndices, [0, 1], 'cellDblClick row indices');
          });
          QUnit.test((editMode + " - rowIndex should be correct in rowDblClick event handler (T1027155)"), function(assert) {
            var rowIndex = null;
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field: 'test1'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true
              },
              onRowDblClick: function(e) {
                rowIndex = e.rowIndex;
              }
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            $(dataGrid.getCellElement(1, 0)).trigger('dxdblclick');
            assert.deepEqual(rowIndex, 1, 'rowDblClick row index');
          });
        });
      });
      QUnit.module('Rendered on server', baseModuleConfig, function() {
        QUnit.test('Loading should be synchronously', function(assert) {
          var dataSource = [{
            id: 1,
            name: 'test 1'
          }, {
            id: 2,
            name: 'test 2'
          }];
          var dataGrid = createDataGrid({
            dataSource: dataSource,
            integrationOptions: {renderedOnServer: true}
          });
          assert.equal(dataGrid.getVisibleRows().length, 2, 'visible rows are exists');
          assert.equal(dataGrid.$element().find('.dx-data-row').length, 2, 'two data rows are rendered');
          dataGrid.columnOption('id', 'filterValue', '2');
        });
        QUnit.test('dataSource changing should be synchronously', function(assert) {
          var dataSource = [{
            id: 1,
            name: 'test 1'
          }, {
            id: 2,
            name: 'test 2'
          }];
          var dataGrid = createDataGrid({
            dataSource: [],
            integrationOptions: {renderedOnServer: true}
          });
          dataGrid.option('dataSource', dataSource);
          assert.equal(dataGrid.getVisibleRows().length, 2, 'visible rows are exists');
          assert.equal(dataGrid.$element().find('.dx-data-row').length, 2, 'two data rows are rendered');
        });
        QUnit.test('Runtime operation should be asynchronously', function(assert) {
          var dataSource = [{
            id: 1,
            name: 'test 1'
          }, {
            id: 2,
            name: 'test 2'
          }];
          var dataGrid = createDataGrid({
            dataSource: dataSource,
            integrationOptions: {renderedOnServer: true}
          });
          dataGrid.columnOption('id', 'filterValue', '2');
          assert.equal(dataGrid.getVisibleRows().length, 2, 'visible rows are exists');
          assert.equal(dataGrid.$element().find('.dx-data-row').length, 2, 'two data rows are rendered');
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleRows().length, 1, 'visible rows are filtered');
          assert.equal(dataGrid.$element().find('.dx-data-row').length, 1, 'filtered data rows are rendered');
        });
      });
      QUnit.module('Async render', baseModuleConfig, function() {
        QUnit.test('Template in columns.buttons should render asynchronously if column renderAsync is true (T876950)', function(assert) {
          var buttonTemplateCallCount = 0;
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}],
            loadingTimeout: null,
            columns: [{
              type: 'buttons',
              width: 100,
              renderAsync: true,
              buttons: [{template: function() {
                  buttonTemplateCallCount++;
                  return $('<a>').text('Test');
                }}]
            }]
          });
          assert.equal(buttonTemplateCallCount, 0, 'template is not rendered');
          this.clock.tick(10);
          assert.equal(buttonTemplateCallCount, 1, 'template is rendered asynchronously');
          assert.equal($(dataGrid.getCellElement(0, 0)).text(), 'Test\u00A0', 'template is applied');
        });
        QUnit.test('Column auto width should be calculated after cell is rendered in react', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}],
            columnAutoWidth: true,
            width: 500,
            templatesRenderAsynchronously: true,
            columns: ['column1', {
              dataField: 'id',
              renderAsync: true,
              cellTemplate: function(container) {
                $('<div>').css('width', '300px').text('text').appendTo(container);
              }
            }, 'column2', 'column3']
          });
          this.clock.tick(100);
          assert.ok($(dataGrid.getVisibleRows()[0].cells[1].cellElement).outerWidth() >= 300, 'cell content fits');
        });
        QUnit.test('showEditorAlways column should render synchronously if renderAsync is true and column renderAsync is false', function(assert) {
          var cellPreparedCells = [];
          createDataGrid({
            dataSource: [{boolean: true}],
            loadingTimeout: null,
            renderAsync: true,
            columns: [{
              dataField: 'boolean',
              renderAsync: false
            }],
            onCellPrepared: function(e) {
              cellPreparedCells.push(e.rowType + '-' + (e.column.command || e.column.dataField));
            }
          });
          assert.deepEqual(cellPreparedCells, ['header-boolean', 'data-boolean'], 'header and data is synchronous');
        });
        QUnit.test('cellTemplate should be rendered, asynchronously if column renderAsync is true', function(assert) {
          var cellPreparedCells = [];
          var cellTemplateArgs = [];
          createDataGrid({
            dataSource: [{
              id: 1,
              template: 'Test'
            }],
            loadingTimeout: null,
            filterRow: {visible: true},
            columns: ['id', {
              dataField: 'template',
              renderAsync: true,
              cellTemplate: function(container, options) {
                cellTemplateArgs.push(options);
              }
            }],
            onCellPrepared: function(e) {
              cellPreparedCells.push(e.rowType + '-' + (e.column.command || e.column.dataField));
            }
          });
          assert.deepEqual(cellTemplateArgs, [], 'cell template are not called');
          cellPreparedCells = [];
          this.clock.tick(10);
          assert.deepEqual(cellPreparedCells, ['data-template'], 'asynchronous cellPrepared calls');
          assert.equal(cellTemplateArgs.length, 1, 'cell template is called');
          assert.equal(cellTemplateArgs[0].rowType, 'data', 'cell template rowType');
          assert.equal(cellTemplateArgs[0].column.dataField, 'template', 'cell template column');
        });
        QUnit.test('component should resize on first render without async if renderAsync = true', function(assert) {
          var grid = createDataGrid({
            dataSource: [{id: 1}],
            filterRow: {visible: true},
            renderAsync: true,
            columns: ['id'],
            selection: {mode: 'multiple'}
          });
          var resizingController = grid.getController('resizing');
          var refreshSizes = sinon.spy(resizingController, '_refreshSizes');
          var originalHandler = resizingController._refreshSizesHandler;
          resizingController._refreshSizesHandler = function() {
            originalHandler.apply(this, arguments);
            assert.deepEqual(refreshSizes.callCount, 1, 'resize is called immediately');
            1;
          };
          this.clock.tick(10);
        });
      });
      QUnit.module('Assign options', baseModuleConfig, function() {
        QUnit.test('dataSource change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.option('dataSource', [{
            id: 1,
            value: 'value 1'
          }]);
          var columns = dataGrid.getController('columns').getColumns();
          assert.equal(columns.length, 2);
          assert.equal(columns[0].dataField, 'id');
          assert.equal(columns[0].dataType, 'number');
        });
        QUnit.test('dataSource change to equal instance', function(assert) {
          var dataSource = [{id: 1}];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource
          });
          var dataSourceInstance = dataGrid.getController('data')._dataSource;
          dataSource.push({id: 2});
          dataGrid.option('dataSource', dataSource);
          assert.strictEqual(dataSourceInstance, dataGrid.getController('data')._dataSource, 'dataSource is not recreated');
          assert.strictEqual(dataGrid.getController('data').items().length, 2, 'data is updated');
        });
        QUnit.test('dataSource object change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{id: 1}]
              }}
          });
          dataGrid.option('dataSource', {store: {
              type: 'array',
              key: 'id',
              data: [{id: 1}, {id: 2}]
            }});
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 2);
        });
        QUnit.test('dataSource change to null', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          var contentReadyCount = 0;
          dataGrid.on('contentReady', function() {
            contentReadyCount++;
          });
          dataGrid.option('dataSource', null);
          assert.ok(dataGrid.getController('data').isEmpty(), 'no data');
          assert.ok(!dataGrid.getController('data').dataSource(), 'no dataSource');
          assert.strictEqual(dataGrid.getController('data')._cachedProcessedItems, null, 'cached processed items are cleared');
          assert.strictEqual(dataGrid.getController('columns')._dataSource, null, 'no dataSource inside columnsController');
          assert.equal(dataGrid.getController('data').items().length, 0, 'items count');
          assert.equal(contentReadyCount, 1, 'contentReady call count');
          assert.equal($(dataGrid.$element()).find('.dx-data-row').length, 0, 'data row count');
        });
        QUnit.test('dataSource changing reset columns order when dataSource structure is changed', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field3: 3
            }]
          });
          dataGrid.option('dataSource', [{
            field1: 1,
            field2: 2,
            field3: 3
          }]);
          var columns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(columns.length, 3);
          assert.equal(columns[0].dataField, 'field1');
          assert.equal(columns[1].dataField, 'field2');
          assert.equal(columns[2].dataField, 'field3');
        });
        QUnit.test('dataSource changing not reset columns order when dataSource structure is not changed', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }]
          });
          dataGrid.columnOption('field2', 'visibleIndex', 0);
          dataGrid.option('dataSource', [{
            field1: 3,
            field2: 4
          }]);
          var columns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(columns.length, 2);
          assert.equal(columns[0].dataField, 'field2');
          assert.equal(columns[1].dataField, 'field1');
          assert.deepEqual(dataGrid.getController('data').items()[0].data, {
            field1: 3,
            field2: 4
          });
        });
        QUnit.test('dataSource change should render content once if scrolling mode is virtual', function(assert) {
          var dataChangedSpy = sinon.spy();
          var dataGrid = createDataGrid({
            height: 200,
            dataSource: [],
            keyExpr: 'id',
            columns: ['id'],
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(1000);
          dataGrid.getController('data').changed.add(dataChangedSpy);
          dataGrid.option('dataSource', [{id: 1}]);
          this.clock.tick(1000);
          assert.equal(dataChangedSpy.callCount, 1, 'content is rendered once');
        });
        QUnit.test('noData should be hidden after assign dataSource and height', function(assert) {
          var dataGrid = createDataGrid({columns: ['id']});
          this.clock.tick(10);
          dataGrid.option('dataSource', [{id: 1}]);
          dataGrid.option('height', 300);
          this.clock.tick(10);
          var $noData = $($(dataGrid.$element()).find('.dx-datagrid-nodata'));
          assert.equal($noData.length, 1, 'nodata is rendered once');
          assert.notOk($noData.is(':visible'), 'nodata is hidden');
        });
        QUnit.test('rtlEnabled change', function(assert) {
          var dataGrid = createDataGrid({});
          dataGrid.option('rtlEnabled', true);
          assert.ok($(dataGrid.$element()).hasClass('dx-rtl'), 'dx-rtl class added');
        });
        QUnit.test('disabled change', function(assert) {
          var dataGrid = createDataGrid({});
          dataGrid.option('disabled', true);
          assert.ok($(dataGrid.$element()).hasClass('dx-state-disabled'), 'dx-state-disabled class added');
        });
        QUnit.test('dataSource pageSize change', function(assert) {
          var dataGrid = createDataGrid({dataSource: {store: [{id: 1111}]}});
          assert.equal(dataGrid.getController('data')._dataSource.pageSize(), 20);
          dataGrid.option('dataSource', {
            store: [{
              id: 1,
              value: 'value 1'
            }],
            pageSize: 50
          });
          assert.equal(dataGrid.getController('data')._dataSource.pageSize(), 50);
        });
        QUnit.test('columns change', function(assert) {
          var loadingCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                onLoading: function() {
                  loadingCount++;
                },
                data: [{
                  a: 1111,
                  b: 222
                }]
              }}
          });
          dataGrid.option('columns', ['a']);
          var columns = dataGrid.getController('columns').getColumns();
          assert.equal(columns.length, 1);
          assert.equal(columns[0].dataField, 'a');
          var tableElement = dataGrid.getView('rowsView')._tableElement;
          assert.equal(tableElement.find('col').length, 1);
          assert.equal(tableElement.find('tbody > tr').length, 2);
          assert.equal(tableElement.find('td').length, 2);
          assert.equal(loadingCount, 1, 'one load only');
        });
        QUnit.test('columns change to empty array', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              a: 1111,
              b: 222
            }]
          });
          dataGrid.option('columns', []);
          assert.equal(dataGrid.getController('columns').getColumns().length, 0);
          assert.equal(dataGrid.getController('columns').getVisibleColumns().length, 0);
          var tableElement = $(dataGrid.$element()).find('.dx-datagrid-rowsview table');
          assert.equal(tableElement.find('col').length, 0, 'col count');
          assert.equal(tableElement.find('tbody > tr').length, 2, 'row count');
          assert.equal(tableElement.find('td').length, 0, 'cell count');
        });
        QUnit.test('change columns at the time refresh the grid', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: 100,
            dataSource: [{
              column1: 1,
              column2: 2
            }, {
              column1: 3,
              column2: 4
            }],
            columns: ['column1', 'column2']
          });
          this.clock.tick(100);
          assert.equal(dataGrid.getController('columns').getColumns().length, 2, 'count column');
          assert.equal($(dataGrid.$element()).find('.dx-datagrid-rowsview table').find('tbody > tr.dx-data-row').length, 2, 'row count');
          dataGrid.refresh();
          dataGrid.option('columns', ['column3']);
          this.clock.tick(100);
          var visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          var $headerElements = $($(dataGrid.$element()).find('.dx-header-row').children());
          assert.equal(dataGrid.getController('columns').getColumns().length, 1, 'count column');
          assert.equal(visibleColumns.length, 1, 'count visible column');
          assert.strictEqual(visibleColumns[0].dataField, 'column3', 'dataField of the first column');
          assert.equal($headerElements.length, 1, 'count header');
          assert.strictEqual($headerElements.first().text(), 'Column 3', 'text of the first header');
        });
        QUnit.test('columns change when changed dataSource parameters', function(assert) {
          var loadingCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            dataSource: {store: {
                type: 'array',
                onLoading: function(options) {
                  loadingCount++;
                },
                data: [{
                  a: 1,
                  b: 2
                }, {
                  a: 2,
                  b: 1
                }]
              }}
          });
          dataGrid.option('columns', ['a', {
            dataField: 'b',
            sortOrder: 'asc'
          }]);
          assert.equal(loadingCount, 2, 'second load for apply sorting');
          assert.equal(dataGrid.getController('data').items()[0].data.b, 1);
        });
        QUnit.test('Column changes are applied while dataSource is loading (T895552)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'a',
                data: [{
                  a: 1,
                  b: 2
                }]
              }},
            columns: ['a', 'b']
          });
          this.clock.tick(10);
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          dataGrid.option('columns', ['a', {
            dataField: 'b',
            groupIndex: 0
          }]);
          this.clock.tick(10);
          var $filterPanelViewElement = $(dataGrid.getView('filterPanelView').element());
          assert.ok($filterPanelViewElement.is(':visible'), 'filterPanel is visible');
          assert.equal(dataGrid.getVisibleRows()[0].rowType, 'group', 'first row type is group');
          assert.equal(dataGrid.columnOption('b', 'groupIndex'), 0, 'column b is grouped');
        });
        QUnit.test('Toolbar update it\'s items only when corresponding options are change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            dataSource: {store: {
                type: 'array',
                data: [{
                  a: 1,
                  b: 2
                }, {
                  a: 2,
                  b: 1
                }]
              }}
          });
          var headerPanel = dataGrid.getView('headerPanel');
          sinon.spy(headerPanel, '_getToolbarOptions');
          dataGrid.option('columns', ['a', {
            dataField: 'b',
            sortOrder: 'asc'
          }]);
          assert.equal(headerPanel._getToolbarOptions.callCount, 0, 'Toolbar items aren\'t update on change sort order');
          dataGrid.option('editing', {mode: 'batch'});
          assert.equal(headerPanel._getToolbarOptions.callCount, 1, 'Toolbar items are updated after editing options change');
          dataGrid.option('filterRow', {applyFilterText: 'test'});
          assert.equal(headerPanel._getToolbarOptions.callCount, 2, 'Toolbar items are updated after filterRow options change');
          dataGrid.option('columnChooser', {mode: 'select'});
          assert.equal(headerPanel._getToolbarOptions.callCount, 3, 'Toolbar items are updated after columnChooser options change');
          dataGrid.option('export', {allowExportSelectedData: true});
          assert.equal(headerPanel._getToolbarOptions.callCount, 4, 'Toolbar items are updated after export options change');
          dataGrid.option('groupPanel', {emptyPanelText: 'test'});
          assert.equal(headerPanel._getToolbarOptions.callCount, 5, 'Toolbar items are updated after groupPanel options change');
          dataGrid.option('searchPanel', {placeholder: 'test'});
          assert.equal(headerPanel._getToolbarOptions.callCount, 6, 'Toolbar items are updated after searchPanel options change');
        });
        QUnit.test('customizeColumns change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              a: 1111,
              b: 222
            }],
            columns: ['a'],
            customizeColumns: function() {}
          });
          dataGrid.option('customizeColumns', function(columns) {
            columns.unshift({
              dataField: 'b',
              visibleIndex: 0
            });
          });
          var columns = dataGrid.getController('columns').getColumns();
          assert.equal(columns.length, 2);
          assert.equal(columns[0].dataField, 'b');
          assert.equal(columns[1].dataField, 'a');
          var visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 2);
          assert.equal(visibleColumns[0].dataField, 'b');
          assert.equal(visibleColumns[1].dataField, 'a');
          var tableElement = dataGrid.getView('rowsView')._tableElement;
          assert.equal(tableElement.find('col').length, 2);
          assert.equal(tableElement.find('td').first().text(), '222');
        });
        QUnit.test('several options change', function(assert) {
          var dataGrid = createDataGrid({
            commonColumnSettings: {allowSorting: false},
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.option({
            commonColumnSettings: {allowSorting: true},
            dataSource: [{
              id: 1,
              value: 'value 1'
            }],
            loadingTimeout: null
          });
          var columns = dataGrid.getController('columns').getColumns();
          assert.equal(columns.length, 2);
          assert.equal(columns[0].dataField, 'id');
          assert.equal(columns[0].dataType, 'number');
          assert.ok(columns[0].allowSorting);
          assert.ok(columns[1].allowSorting);
        });
        QUnit.test('paging.enabled change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              store: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}],
              pageSize: 3
            },
            selection: {mode: 'single'}
          });
          dataGrid.selectRows({
            a: 1111,
            b: 222
          });
          assert.deepEqual(dataGrid.getController('data').pageCount(), 2, 'pages count');
          assert.deepEqual(dataGrid.getController('data').items().length, 3, 'items count');
          assert.ok(dataGrid.getView('pagerView').isVisible(), 'pager visibility');
          dataGrid.option('paging.enabled', false);
          assert.deepEqual(dataGrid.getController('data').pageCount(), 1, 'pages count when paging disabled');
          assert.deepEqual(dataGrid.getController('data').items().length, 5, 'items count when paging disabled');
          assert.ok(!dataGrid.getView('pagerView').isVisible(), 'pager visibility when paging disabled');
        });
        QUnit.test('paging change', function(assert) {
          var dataGrid = createDataGrid({dataSource: {
              store: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}],
              pageSize: 3
            }});
          this.clock.tick(10);
          var changedSpy = sinon.spy();
          var loadingSpy = sinon.spy();
          dataGrid.getDataSource().on('changed', changedSpy);
          dataGrid.getDataSource().store().on('loading', loadingSpy);
          dataGrid.option('paging', {
            pageIndex: 1,
            pageSize: 2
          });
          this.clock.tick(10);
          assert.strictEqual(changedSpy.callCount, 1, 'changed is called');
          assert.strictEqual(loadingSpy.callCount, 0, 'loading is not called');
          assert.deepEqual(dataGrid.getVisibleRows().length, 2, 'row count');
          assert.deepEqual(dataGrid.getVisibleRows()[0].data, {value: 3}, 'first row data');
        });
        QUnit.test('paging change if nested options are not changed', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              store: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}],
              pageSize: 3
            }
          });
          var changedSpy = sinon.spy();
          var loadingSpy = sinon.spy();
          dataGrid.getDataSource().on('changed', changedSpy);
          dataGrid.getDataSource().store().on('loading', loadingSpy);
          dataGrid.option('paging', {
            enabled: true,
            pageIndex: 0,
            pageSize: 3
          });
          assert.strictEqual(changedSpy.callCount, 0, 'changed is called');
          assert.strictEqual(loadingSpy.callCount, 0, 'loading is not called');
        });
        QUnit.test('pager.allowedPageSizes change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              store: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}],
              pageSize: 3
            },
            pager: {showPageSizeSelector: true}
          });
          assert.equal($('#dataGrid').find('.dx-page-size').length, 3);
          dataGrid.option('pager.allowedPageSizes', [2, 3, 5, 10]);
          assert.equal($('#dataGrid').find('.dx-page-size').length, 4);
        });
        QUnit.test('pager.visible change', function(assert) {
          var dataGrid = createDataGrid({
            height: 100,
            loadingTimeout: null,
            dataSource: {
              store: [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}],
              pageSize: 4
            }
          });
          var rowsViewHeight = $('#dataGrid').find('.dx-datagrid-rowsview').height();
          assert.ok($('#dataGrid').find('.dx-pager').is(':visible'), 'pager shown');
          dataGrid.option('pager.visible', false);
          assert.ok(!$('#dataGrid').find('.dx-pager').is(':visible'), 'pager hidden');
          assert.ok($('#dataGrid').find('.dx-datagrid-rowsview').height() > rowsViewHeight, 'rowsView height updated');
        });
        QUnit.test('showRowLines/showColumnLines change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              a: 1111,
              b: 222
            }]
          });
          var resizeCalledCount = 0;
          var resizingController = dataGrid.getController('resizing');
          resizingController.updateDimensions = function() {
            resizeCalledCount++;
          };
          dataGrid.beginUpdate();
          dataGrid.option('showColumnLines', !dataGrid.option('showColumnLines'));
          dataGrid.endUpdate();
          assert.equal(resizeCalledCount, 1, 'resize called');
          dataGrid.beginUpdate();
          dataGrid.option('showRowLines', !dataGrid.option('showRowLines'));
          dataGrid.endUpdate();
          assert.equal(resizeCalledCount, 2, 'resize called');
        });
        QUnit.test('dataSource instance of DataSource', function(assert) {
          var errorMessage;
          logger.error = function(message) {
            errorMessage = message;
          };
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: new DataSource({
              _preferSync: true,
              store: [{id: 1111}]
            })
          });
          var dataSource = dataGrid.getController('data').dataSource();
          assert.ok(!errorMessage, 'No error messages');
          assert.ok(dataSource, 'dataSource assigned');
          assert.ok(dataSource.requireTotalCount(), 'requireTotalCount assigned');
          assert.strictEqual(dataGrid.totalCount(), 1, 'totalCount');
        });
        QUnit.test('using dataSource instance after disposing DataGrid', function(assert) {
          var dataSource = new DataSource({store: [{id: 1111}]});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource
          });
          assert.ok(dataSource.isLoaded(), 'dataSource is loaded');
          $('#dataGrid').remove();
          dataSource.load();
          assert.ok(!dataGrid.getDataSource(), 'no dataSource');
          assert.ok(!dataSource._disposed, 'dataSource is not disposed');
        });
        QUnit.test('updateDimensions after disposing DataGrid (T847853)', function(assert) {
          var dataGrid = createDataGrid({
            columnAutoWidth: true,
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          dataGrid.resetOption('scrolling');
          dataGrid.dispose();
          dataGrid.updateDimensions();
          assert.ok(dataGrid._disposed, 'DataGrid is disposed');
        });
        QUnit.test('Set the same options after reset (T1010114)', function(assert) {
          var editing = {
            mode: 'row',
            useIcons: true
          };
          var dataGrid = createDataGrid({
            editing: editing,
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          dataGrid.resetOption('editing');
          dataGrid.option('editing', editing);
          assert.ok(dataGrid.option('editing').changes, 'Custom and default options are merged');
        });
        QUnit.test('onContentReady after hide column', function(assert) {
          var contentReadyCallCount = 0;
          var countCallColumnsChanged = 0;
          var dataGrid = createDataGrid({
            columnAutoWidth: true,
            dataSource: [{
              test1: 1111,
              test2: 'test',
              test3: 2222
            }],
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          assert.equal(contentReadyCallCount, 0, 'onContentReady call count');
          this.clock.tick(10);
          assert.equal(contentReadyCallCount, 1, 'onContentReady call count');
          contentReadyCallCount = 0;
          dataGrid.getController('columns').columnsChanged.add(function() {
            countCallColumnsChanged++;
            assert.ok(!contentReadyCallCount, 'columnsChanged called before onContentReady');
          });
          dataGrid.columnOption(0, 'visible', false);
          this.clock.tick(10);
          assert.equal(contentReadyCallCount, 1, 'onContentReady call count');
          assert.equal(countCallColumnsChanged, 3, 'columnsChanged call count');
        });
        QUnit.test('onContentReady when loadingTimeout', function(assert) {
          var contentReadyCallCount = 0;
          var resizeCallCount = 0;
          var dataGrid = createDataGrid({
            dataSource: [{id: 1111}],
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          dataGrid.getController('resizing').resize = function() {
            assert.ok(!contentReadyCallCount, 'resize called before onContentReady');
            resizeCallCount++;
          };
          assert.equal($('#dataGrid').find('.dx-data-row').length, 0);
          assert.equal(contentReadyCallCount, 0);
          this.clock.tick(10);
          assert.equal($('#dataGrid').find('.dx-data-row').length, 1);
          assert.equal($('#dataGrid').find('.dx-data-row').text(), '1111');
          assert.equal(contentReadyCallCount, 1, 'onContentReady call count');
          assert.equal(resizeCallCount, 1, 'resize call count');
        });
        QUnit.test('onContentReady when no loadingTimeout', function(assert) {
          var contentReadyCallCount = 0;
          createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}],
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          assert.equal($('#dataGrid').find('.dx-data-row').text(), '1111');
          assert.equal(contentReadyCallCount, 1);
        });
        QUnit.test('onContentReady after change page', function(assert) {
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              pageSize: 3,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            },
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          assert.equal($('#dataGrid').find('.dx-data-row').length, 3);
          assert.equal(contentReadyCallCount, 1);
          dataGrid.pageIndex(1);
          assert.equal($('#dataGrid').find('.dx-data-row').length, 1);
          assert.equal(contentReadyCallCount, 2);
        });
        QUnit.test('pageIndex return deferred when change page', function(assert) {
          var doneCalled = false;
          var dataGrid = createDataGrid({dataSource: {
              pageSize: 2,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }});
          this.clock.tick(10);
          dataGrid.pageIndex(1).done(function() {
            doneCalled = true;
          });
          this.clock.tick(10);
          assert.equal(doneCalled, true);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2);
          assert.equal(visibleRows[0].data.id, 3);
        });
        QUnit.test('pageIndex return deferred when set same pageIndex', function(assert) {
          var doneCalled = false;
          var dataGrid = createDataGrid({dataSource: {
              pageSize: 2,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }});
          this.clock.tick(10);
          dataGrid.pageIndex(0).done(function() {
            doneCalled = true;
          });
          assert.equal(doneCalled, true);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2);
          assert.equal(visibleRows[0].data.id, 1);
        });
        QUnit.test('onContentReady after render', function(assert) {
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              pageSize: 3,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            },
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          assert.equal($('#dataGrid').find('.dx-data-row').length, 3);
          assert.equal(contentReadyCallCount, 1);
          dataGrid.repaint();
          assert.equal($('#dataGrid').find('.dx-data-row').length, 3);
          assert.equal(contentReadyCallCount, 2);
        });
        QUnit.test('Updating after changing the option', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }, {
                field1: '5',
                field2: '6'
              }]}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          assert.equal(dataGrid.getView('columnHeadersView').element().find('td').length, 2, 'count columns');
          dataGrid.option('groupPanel.visible', true);
          this.clock.tick(10);
          assert.equal(dataGrid.getView('headerPanel').element().find('.dx-datagrid-group-panel').length, 1, 'has group panel');
          assert.ok(dataGrid.getView('headerPanel').element().find('.dx-datagrid-group-panel').is(':visible'), 'visible group panel');
          dataGrid.columnOption(0, {visible: false});
          this.clock.tick(10);
          assert.equal(dataGrid.getView('columnHeadersView').element().find('td').length, 1, 'count columns');
        });
        QUnit.test('Height rows view = height content', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            columns: ['field1', 'field2'],
            dataSource: {
              store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }, {
                field1: '5',
                field2: '6'
              }],
              pageSize: 2
            }
          });
          this.clock.tick(10);
          var rowsViewElement = $dataGrid.find('.dx-datagrid-rowsview');
          assert.equal(rowsViewElement.find('.dx-datagrid-content').length, 1, 'has content');
          var heightDiff = Math.round(rowsViewElement.height()) - rowsViewElement.find('tbody')[0].offsetHeight;
          assert.ok(heightDiff === 0 || heightDiff === 1, 'height rows view = height content');
        });
        QUnit.test('Height rows view auto when no height option', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            dataSource: {
              store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }, {
                field1: '5',
                field2: '6'
              }],
              pageSize: 2
            }
          });
          this.clock.tick(10);
          var rowsViewElement = $dataGrid.find('.dx-datagrid-rowsview');
          assert.equal(rowsViewElement[0].style.height, '', 'rowsview height is auto');
        });
        QUnit.test('Assign column options', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({dataSource: [{
              field1: '1',
              field2: '2'
            }]});
          this.clock.tick(10);
          $dataGrid.dxDataGrid('instance').columnOption('field1', 'visible', false);
          var headerCells = $dataGrid.find('.dx-header-row').find('td');
          assert.strictEqual(headerCells.length, 1, 'header cells count after hide first column');
        });
        QUnit.test('Assign column options with beginUpdate/endUpdate', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3'
            }]});
          var columnsChangedArgs = [];
          var dataGrid = $dataGrid.dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.getController('columns').columnsChanged.add(function(e) {
            columnsChangedArgs.push(e);
          });
          dataGrid.beginUpdate();
          dataGrid.columnOption('field1', 'visible', false);
          dataGrid.columnOption('field2', 'visible', false);
          dataGrid.endUpdate();
          assert.deepEqual(columnsChangedArgs, [{
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visible: true,
              length: 1
            }
          }]);
          var headerCells = $dataGrid.find('.dx-header-row').find('td');
          assert.strictEqual(headerCells.length, 1, 'header cells count after hide two columns');
        });
        QUnit.test('Assign grid option and refresh in beginUpdate/endUpdate', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            selection: {mode: 'multiple'},
            dataSource: [{
              field1: '1',
              field2: '2'
            }]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          this.clock.tick(10);
          assert.strictEqual($dataGrid.find('.dx-header-row').children().length, 3, 'header cells count');
          assert.strictEqual($dataGrid.find('.dx-data-row').children().length, 3, 'data cells count');
          dataGrid.beginUpdate();
          dataGrid.option('selection.mode', 'single');
          dataGrid.refresh();
          dataGrid.endUpdate();
          this.clock.tick(10);
          assert.strictEqual($dataGrid.find('.dx-header-row').children().length, 2, 'header cells count');
          assert.strictEqual($dataGrid.find('.dx-data-row').children().length, 2, 'data cells count');
        });
        QUnit.test('The onOptionChanged event should be called once when changing column option', function(assert) {
          var onOptionChanged = sinon.spy();
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            onOptionChanged: onOptionChanged
          });
          dataGrid.option('columns[1].caption', 'test');
          assert.strictEqual(onOptionChanged.callCount, 1, 'onOptionChanged is called once');
        });
        QUnit.test('Change toolbar.items[i].prop at runtime', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnChooser: {
              enabled: true,
              title: 'Column chooser'
            },
            editing: {allowAdding: true},
            toolbar: {items: [{
                name: 'columnChooserButton',
                location: 'before'
              }, {
                name: 'addRowButton',
                location: 'before'
              }]}
          });
          var $buttonsBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          assert.equal($buttonsBefore.length, 2, 'count button');
          assert.ok($buttonsBefore.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonsBefore.eq(1).hasClass('dx-datagrid-addrow-button'), 'has add button');
          dataGrid.option('toolbar.items[1].location', 'after');
          var $buttonBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          var $buttonAfter = dataGrid.$element().find('.dx-toolbar-after .dx-item .dx-button');
          assert.equal($buttonBefore.length, 1, 'count button');
          assert.equal($buttonAfter.length, 1, 'count button');
          assert.ok($buttonBefore.hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonAfter.hasClass('dx-datagrid-addrow-button'), 'has add button');
        });
        QUnit.test('Change toolbar.items[i] at runtime', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnChooser: {
              enabled: true,
              title: 'Column chooser'
            },
            editing: {allowAdding: true},
            toolbar: {items: [{
                name: 'columnChooserButton',
                location: 'before'
              }, {
                name: 'addRowButton',
                location: 'before'
              }]}
          });
          var $buttonsBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          assert.equal($buttonsBefore.length, 2, 'count button');
          assert.ok($buttonsBefore.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonsBefore.eq(1).hasClass('dx-datagrid-addrow-button'), 'has add button');
          dataGrid.option('toolbar.items[1]', {
            name: 'addRowButton',
            location: 'after'
          });
          var $buttonBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          var $buttonAfter = dataGrid.$element().find('.dx-toolbar-after .dx-item .dx-button');
          assert.equal($buttonBefore.length, 1, 'count button');
          assert.equal($buttonAfter.length, 1, 'count button');
          assert.ok($buttonBefore.hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonAfter.hasClass('dx-datagrid-addrow-button'), 'has add button');
        });
        QUnit.test('Change toolbar.items at runtime', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnChooser: {
              enabled: true,
              title: 'Column chooser'
            },
            editing: {allowAdding: true},
            toolbar: {items: [{
                name: 'columnChooserButton',
                location: 'before'
              }, {
                name: 'addRowButton',
                location: 'before'
              }]}
          });
          var $buttonsBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          assert.equal($buttonsBefore.length, 2, 'count button');
          assert.ok($buttonsBefore.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonsBefore.eq(1).hasClass('dx-datagrid-addrow-button'), 'has add button');
          dataGrid.option('toolbar.items', [{
            name: 'columnChooserButton',
            location: 'before'
          }, {
            name: 'addRowButton',
            location: 'after'
          }]);
          var $buttonBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          var $buttonAfter = dataGrid.$element().find('.dx-toolbar-after .dx-item .dx-button');
          assert.equal($buttonBefore.length, 1, 'count button');
          assert.equal($buttonAfter.length, 1, 'count button');
          assert.ok($buttonBefore.hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonAfter.hasClass('dx-datagrid-addrow-button'), 'has add button');
        });
        QUnit.test('Change toolbar at runtime', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnChooser: {
              enabled: true,
              title: 'Column chooser'
            },
            editing: {allowAdding: true},
            toolbar: {items: [{
                name: 'columnChooserButton',
                location: 'before'
              }, {
                name: 'addRowButton',
                location: 'before'
              }]}
          });
          var $buttonsBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          assert.equal($buttonsBefore.length, 2, 'count button');
          assert.ok($buttonsBefore.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonsBefore.eq(1).hasClass('dx-datagrid-addrow-button'), 'has add button');
          dataGrid.option('toolbar', {items: [{
              name: 'columnChooserButton',
              location: 'before'
            }, {
              name: 'addRowButton',
              location: 'after'
            }]});
          var $buttonBefore = dataGrid.$element().find('.dx-toolbar-before .dx-item .dx-button');
          var $buttonAfter = dataGrid.$element().find('.dx-toolbar-after .dx-item .dx-button');
          assert.equal($buttonBefore.length, 1, 'count button');
          assert.equal($buttonAfter.length, 1, 'count button');
          assert.ok($buttonBefore.hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonAfter.hasClass('dx-datagrid-addrow-button'), 'has add button');
        });
        QUnit.test('Changing toolbar.items[i].prop saves the state of button', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            toolbar: {items: [{
                location: 'before',
                widget: 'dxSelectBox',
                cssClass: 'my-test-button',
                options: {
                  items: ['item1', 'item2'],
                  value: 'item1'
                }
              }]}
          });
          var $selectBox = dataGrid.$element().find('.my-test-button .dx-selectbox');
          var selectBox = $selectBox.dxSelectBox('instance');
          selectBox.option('value', 'item2');
          assert.equal(selectBox.option('value'), 'item2', 'selectbox state is right');
          dataGrid.option('toolbar.items[0].disabled', true);
          var $selectBoxDisabledContainer = dataGrid.$element().find('.my-test-button');
          assert.ok($selectBoxDisabledContainer.hasClass('dx-state-disabled'), 'button option changed');
          var $selectBoxDisabled = $selectBoxDisabledContainer.find('.dx-selectbox');
          var selectBoxDisabled = $selectBoxDisabled.dxSelectBox('instance');
          assert.equal(selectBoxDisabled.option('value'), 'item2', 'selectbox state saved');
        });
        QUnit.test('Change toolbar.visible and toolbar.disabled options', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnChooser: {enabled: true},
            toolbar: {visible: true}
          });
          var $toolbar = dataGrid.$element().find('.dx-toolbar');
          assert.notOk($toolbar.hasClass('dx-state-invisible'), 'toolbar is shown');
          assert.notOk($toolbar.hasClass('dx-state-disabled'), 'toolbar is not disabled');
          dataGrid.option('toolbar.visible', false);
          assert.ok($toolbar.hasClass('dx-state-invisible'), 'toolbar is hidden');
          dataGrid.option('toolbar.disabled', true);
          assert.ok($toolbar.hasClass('dx-state-disabled'), 'toolbar is disabled');
        });
        QUnit.test('The grid should not freeze after changing a dataSource and columns options together when there are band columns', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3',
              field4: 'test4'
            }],
            columns: ['field1', {
              caption: 'Band column 1',
              isBand: true
            }, {
              dataField: 'field2',
              ownerBand: 1
            }, {
              dataField: 'field3',
              ownerBand: 1
            }, 'field4']
          });
          this.clock.tick(100);
          dataGrid.option({
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3',
              field4: 'test4'
            }],
            columns: ['field1', {
              caption: 'Band column 1',
              isBand: true
            }, {
              dataField: 'field2',
              ownerBand: 1
            }, {dataField: 'field3'}, 'field4']
          });
          this.clock.tick(100);
          var columns = dataGrid.getVisibleColumns(0);
          assert.strictEqual(columns[0].dataField, 'field1', 'dataField of the first column of the first level');
          assert.strictEqual(columns[0].index, 0, 'index of the first column of the first level');
          assert.strictEqual(columns[0].isBand, undefined, 'isBand of the first column of the first level');
          assert.strictEqual(columns[0].ownerBand, undefined, 'ownerBand of the first column of the first level');
          assert.strictEqual(columns[1].caption, 'Band column 1', 'caption of the second column of the first level');
          assert.strictEqual(columns[1].index, 1, 'index of the second column of the first level');
          assert.strictEqual(columns[1].isBand, true, 'isBand of the second column of the first level');
          assert.strictEqual(columns[1].ownerBand, undefined, 'ownerBand of the second column of the first level');
          assert.strictEqual(columns[2].dataField, 'field3', 'dataField of the third column of the first level');
          assert.strictEqual(columns[2].index, 3, 'index of the third column of the first level');
          assert.strictEqual(columns[2].isBand, undefined, 'isBand of the third column of the first level');
          assert.strictEqual(columns[2].ownerBand, undefined, 'ownerBand of the third column of the first level');
          assert.strictEqual(columns[3].dataField, 'field4', 'dataField of the fourth column of the first level');
          assert.strictEqual(columns[3].index, 4, 'index of the fourth column of the first level');
          assert.strictEqual(columns[3].isBand, undefined, 'isBand of the fourth column of the first level');
          assert.strictEqual(columns[3].ownerBand, undefined, 'ownerBand of the fourth column of the first level');
          columns = dataGrid.getVisibleColumns(1);
          assert.strictEqual(columns[0].dataField, 'field2', 'dataField of the first column of the second level');
          assert.strictEqual(columns[0].index, 2, 'index of the first column of the second level');
          assert.strictEqual(columns[0].isBand, undefined, 'isBand of the first column of the second level');
          assert.strictEqual(columns[0].ownerBand, 1, 'ownerBand of the first column of the second level');
        });
      });
      QUnit.module('API methods', baseModuleConfig, function() {
        QUnit.test('get methods for grid without options', function(assert) {
          var dataGrid = createDataGrid({});
          assert.deepEqual(dataGrid.getSelectedRowKeys(), []);
          assert.deepEqual(dataGrid.getSelectedRowsData(), []);
          assert.strictEqual(dataGrid.isScrollbarVisible(), false);
          assert.strictEqual(dataGrid.getTopVisibleRowData(), undefined);
        });
        QUnit.test('begin custom loading', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.beginCustomLoading('Test');
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Test');
          dataGrid.endCustomLoading();
          this.clock.tick(200);
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Loading...');
        });
        QUnit.test('begin custom loading and refresh', function(assert) {
          var dataGrid = createDataGrid({dataSource: [{id: 1111}]});
          dataGrid.beginCustomLoading('Test');
          dataGrid.refresh().done(function() {
            dataGrid.endCustomLoading();
          });
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Test');
          this.clock.tick(10);
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Test');
          this.clock.tick(200);
          assert.strictEqual(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Loading...');
          assert.strictEqual(dataGrid.getView('rowsView')._loadPanel.option('visible'), false);
        });
        QUnit.test('begin custom loading without message', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.beginCustomLoading();
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Loading...');
          dataGrid.endCustomLoading();
          this.clock.tick(200);
          assert.equal(dataGrid.getView('rowsView')._loadPanel.option('message'), 'Loading...');
        });
        QUnit.test('add column', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.addColumn('testColumn');
          assert.equal($('#dataGrid').find('td').eq(1).find('.dx-datagrid-text-content').first().text(), 'Test Column');
        });
        QUnit.test('expandAll', function(assert) {
          var expandAllGroupIndex;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              group: 1,
              id: 1111
            }]
          });
          dataGrid.getController('data').expandAll = function(groupIndex) {
            expandAllGroupIndex = groupIndex;
          };
          dataGrid.expandAll(1);
          assert.equal(expandAllGroupIndex, 1);
        });
        QUnit.test('collapseAll', function(assert) {
          var collapseAllGroupIndex;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              group: 1,
              id: 1111
            }]
          });
          dataGrid.getController('data').collapseAll = function(groupIndex) {
            collapseAllGroupIndex = groupIndex;
          };
          dataGrid.collapseAll(1);
          assert.equal(collapseAllGroupIndex, 1);
        });
        QUnit.test('component refresh', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{testField: 'TestValue'}]
          });
          dataGrid._refresh();
          assert.equal($('#dataGrid').find('td').eq(0).find('.dx-datagrid-text-content').first().text(), 'Test Field');
          assert.equal($('#dataGrid').find('tbody > tr').eq(1).find('td').eq(0).text(), 'TestValue');
        });
        QUnit.test('refresh', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: []
          });
          var reloadResolved = false;
          var d = dataGrid.refresh();
          assert.ok($.isFunction(d.promise), 'type object is the Deferred');
          d.done(function() {
            reloadResolved = true;
          });
          assert.ok(reloadResolved);
        });
        QUnit.test('Toolbar should be updated immediately after option change', function(assert) {
          var titleText = 'Custom Title';
          var dataGridOptions = {
            columns: ['field1'],
            headerFilter: {visible: false},
            grouping: {autoExpandAll: false},
            dataSource: [],
            onToolbarPreparing: function(e) {
              e.toolbarOptions.items.unshift({
                location: 'after',
                template: function() {
                  return $('<div/>').attr('id', 'testElement');
                }
              });
            }
          };
          function load() {
            createDataGrid(dataGridOptions);
            $('#testElement').text(titleText);
          }
          load();
          this.clock.tick(10);
          assert.equal($('#testElement').text(), titleText, 'title text');
          load();
          this.clock.tick(10);
          assert.equal($('#testElement').text(), titleText, 'title text after refresh');
        });
        QUnit.test('refresh $.Callbacks memory leaks', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: []
          });
          var addCallCount = 0;
          var removeCallCount = 0;
          $.each($.extend({}, dataGrid._controllers, dataGrid._views), function(controllerName, controller) {
            $.each(controller.callbackNames() || [], function(index, callbackName) {
              var callback = controller[callbackName];
              var add = callback.add;
              var remove = callback.remove;
              callback.add = function() {
                add.apply(callback, arguments);
                addCallCount++;
              };
              callback.remove = function() {
                remove.apply(callback, arguments);
                removeCallCount++;
              };
            });
          });
          dataGrid.refresh();
          assert.equal(addCallCount, removeCallCount, 'added call count equals removed call count');
        });
        QUnit.test('getSelectedRowsData when storeSelectedItems enabled', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{testField: 'TestValue'}],
            storeSelectedItems: true
          });
          var rows = dataGrid.getSelectedRowsData();
          assert.deepEqual(rows, [], 'empty rows');
        });
        QUnit.test('pageCount', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              pageSize: 3,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }
          });
          var pageCount = dataGrid.pageCount();
          assert.equal(pageCount, 2, 'Page Count');
        });
        QUnit.test('columnCount', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }]
          });
          var columnCount = dataGrid.columnCount();
          assert.equal(columnCount, 3, 'Column Count');
        });
        QUnit.test('getRowElement', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', 'field2', 'field3'],
            dataSource: {store: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 4,
                field2: 5,
                field3: 6
              }]}
          });
          var $rowElement = $(dataGrid.getRowElement(1));
          assert.equal(typeUtils.isRenderer(dataGrid.getRowElement(1)), !!config().useJQuery, 'rowElement is correct');
          assert.equal($rowElement.length, 1, 'count row');
          assert.deepEqual($rowElement[0], $('#dataGrid').find('.dx-datagrid-rowsview').find('tbody > tr')[1], 'correct row element');
        });
        QUnit.test('There is no console errors when call getCellElement at command column\'s cell', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{dataField: 'field1'}],
            dataSource: {store: [{field1: 1}, {field1: 2}]},
            masterDetail: {
              enabled: true,
              template: function(container, info) {
                $('<div />').dxDataGrid({
                  dataSource: {store: [{
                      id: 1,
                      col1: 2
                    }, {
                      id: 2,
                      col1: 3
                    }]},
                  columns: [{dataField: 'id'}, {dataField: 'col1'}]
                }).appendTo(container);
              }
            }
          });
          var errorMessage;
          logger.error = function(message) {
            errorMessage = message;
          };
          dataGrid.focus($(dataGrid.getCellElement(0, 0)));
          this.clock.tick(10);
          assert.ok(!errorMessage, 'There is no errors');
        });
        QUnit.test('Should update grid after error row rendered (T755293)', function(assert) {
          var eventArray = [];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              fixed: true
            }, {dataField: 'field2'}],
            dataSource: {load: function() {
                return $.Deferred().reject('Load error');
              }},
            onDataErrorOccurred: function() {
              return eventArray.push('onDataErrorOccurred');
            },
            onContentReady: function() {
              return eventArray.push('onContentReady');
            }
          });
          this.clock.tick(10);
          assert.equal(eventArray[0], 'onDataErrorOccurred', 'onDataErrorOccurred event fired first');
          assert.equal(eventArray[1], 'onContentReady', 'onContentReady event fired second');
          var errorCloseButton = $(dataGrid._$element.find('.dx-closebutton').eq(0));
          errorCloseButton.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(eventArray[2], 'onContentReady', 'onContentReady event fired after closing error row');
        });
        QUnit.test('change pageIndex when all columns have width', function(assert) {
          var dataGrid = createDataGrid({
            paging: {pageSize: 3},
            loadPanel: false,
            columns: [{
              dataField: 'field1',
              width: 100,
              groupIndex: 0
            }, {
              dataField: 'field2',
              width: 100,
              groupIndex: 1
            }, {
              dataField: 'field3',
              width: 100
            }],
            loadingTimeout: null,
            dataSource: [{
              field1: 'test',
              field2: 2,
              field3: 3
            }, {
              field1: 'test test test test test test test test test test test',
              field2: 3,
              field3: 4
            }]
          });
          assert.ok($(dataGrid.$element()).width() < $('#qunit-fixture').width(), 'total width');
          dataGrid.pageIndex(1);
          assert.ok($(dataGrid.$element()).width() < $('#qunit-fixture').width(), 'total width after change pageIndex');
        });
        QUnit.test('beginCustomLoading in onInitialized', function(assert) {
          var initialized;
          var dataGrid = createDataGrid({
            onInitialized: function(e) {
              e.component.beginCustomLoading();
              e.component.endCustomLoading();
              initialized = true;
            },
            dataSource: [{id: 1111}]
          });
          this.clock.tick(10);
          assert.ok(initialized, 'onInitialized called');
          assert.ok(!dataGrid.getController('data').isLoading(), 'is not loading');
        });
        QUnit.test('getSelectedRowKeys in onInitialized', function(assert) {
          var initializedComponent;
          var dataGrid = createDataGrid({
            onInitialized: function(e) {
              assert.deepEqual(e.component.getSelectedRowKeys(), [], 'selectedRowKeys');
              initializedComponent = e.component;
            },
            dataSource: [{id: 1111}]
          });
          this.clock.tick(10);
          assert.equal(initializedComponent, dataGrid, 'component in onInitialized callback is correct');
        });
        QUnit.test('columnOption in onInitialized', function(assert) {
          var initialized;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            onInitialized: function(e) {
              e.component.columnOption('command:edit', 'visibleIndex', -1);
              initialized = true;
            },
            dataSource: [{id: 1111}],
            editing: {allowUpdating: true}
          });
          assert.ok(initialized, 'onInitialized called');
          var $commandColumnCells = $($(dataGrid.$element()).find('.dx-command-edit'));
          assert.equal($commandColumnCells.length, 3, 'three command cells');
          assert.equal($commandColumnCells.eq(0).index(), 0, 'command cell 1 in first td');
          assert.equal($commandColumnCells.eq(1).index(), 0, 'command cell 2 in first td');
          assert.equal($commandColumnCells.eq(2).index(), 0, 'command cell 3 in first td');
        });
        QUnit.test('onColumnsChanging should be fired if change column option', function(assert) {
          var onColumnsChanging = sinon.spy();
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            onColumnsChanging: onColumnsChanging,
            dataSource: [],
            columns: ['id', 'name']
          });
          onColumnsChanging.reset();
          dataGrid.columnOption('name', 'visible', false);
          assert.ok(onColumnsChanging.calledOnce, 'onColumnsChanging is called once');
        });
        QUnit.test('Repaint row', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['field1']
          });
          dataSource.store().update(1, {field1: 'test3'});
          var $rowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($rowElements.length, 2, 'count row');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test1', 'first row - value of the first cell');
          dataGrid.repaintRows(0);
          var $updatedRowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($updatedRowElements.length, 2, 'count row');
          assert.ok(!$updatedRowElements.eq(0).is($rowElements.eq(0)), 'first row is updated');
          assert.ok($updatedRowElements.eq(1).is($rowElements.eq(1)), 'second row isn\'t updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test3', 'first row - value of the first cell');
        });
        QUnit.test('Repaint rows', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['field1']
          });
          dataSource.store().update(1, {field1: 'test5'});
          dataSource.store().update(3, {field1: 'test6'});
          var $rowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($rowElements.length, 4, 'count row');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test1', 'first row - value of the first cell');
          assert.strictEqual($(dataGrid.getCellElement(2, 0)).text(), 'test3', 'third row - value of the first cell');
          dataGrid.repaintRows([0, 2]);
          var $updatedRowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($updatedRowElements.length, 4, 'count row');
          assert.ok(!$updatedRowElements.eq(0).is($rowElements.eq(0)), 'first row is updated');
          assert.ok($updatedRowElements.eq(1).is($rowElements.eq(1)), 'second row isn\'t updated');
          assert.ok(!$updatedRowElements.eq(2).is($rowElements.eq(2)), 'third row is updated');
          assert.ok($updatedRowElements.eq(3).is($rowElements.eq(3)), 'fourth row isn\'t updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test5', 'first row - value of the first cell');
          assert.strictEqual($(dataGrid.getCellElement(2, 0)).text(), 'test6', 'third row - value of the first cell');
        });
        QUnit.test('Repaint rows with repaintChangesOnly', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            repaintChangesOnly: true,
            dataSource: dataSource,
            columns: ['field1']
          });
          dataSource.store().update(1, {field1: 'test5'});
          dataSource.store().update(3, {field1: 'test6'});
          var $rowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($rowElements.length, 4, 'count row');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test1', 'first row - value of the first cell');
          assert.strictEqual($(dataGrid.getCellElement(2, 0)).text(), 'test3', 'third row - value of the first cell');
          dataGrid.repaintRows([0, 2]);
          var $updatedRowElements = $($(dataGrid.$element()).find('.dx-data-row'));
          assert.equal($updatedRowElements.length, 4, 'count row');
          assert.ok(!$updatedRowElements.eq(0).is($rowElements.eq(0)), 'first row is updated');
          assert.ok($updatedRowElements.eq(1).is($rowElements.eq(1)), 'second row isn\'t updated');
          assert.ok(!$updatedRowElements.eq(2).is($rowElements.eq(2)), 'third row is updated');
          assert.ok($updatedRowElements.eq(3).is($rowElements.eq(3)), 'fourth row isn\'t updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), 'test5', 'first row - value of the first cell');
          assert.strictEqual($(dataGrid.getCellElement(2, 0)).text(), 'test6', 'third row - value of the first cell');
        });
        QUnit.test('Refresh with changesOnly', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['id', 'field1']
          });
          dataSource.store().update(1, {field1: 'test5'});
          var $cellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          assert.equal($cellElements.length, 2, 'count cell');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'test1', 'first row - value of the second cell');
          dataGrid.refresh(true);
          var $updatedCellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          assert.equal($updatedCellElements.length, 2, 'count cell');
          assert.ok($updatedCellElements.eq(0).is($cellElements.eq(0)), 'first cell isn\'t updated');
          assert.notOk($updatedCellElements.eq(1).is($cellElements.eq(1)), 'second cell is updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'test5', 'cell value is updated');
        });
        QUnit.test('Refresh with changesOnly and summary in group row', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                fieldGroup: 'testGroup',
                field1: 'test1',
                field2: 2,
                field3: 'test3',
                field4: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['id', 'field1', 'field2', 'field3', 'field4', {
              dataField: 'fieldGroup',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                column: 'field2',
                alignByColumn: true,
                summaryType: 'sum'
              }, {
                column: 'field4',
                alignByColumn: true,
                summaryType: 'sum'
              }]}
          });
          dataSource.store().update(1, {field2: 3});
          dataGrid.refresh(true);
          assert.strictEqual(dataGrid.getVisibleRows()[0].cells.length, 5);
        });
        QUnit.test('Refresh with highlighting and check oldValue', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['id', {
              dataField: 'field1',
              name: 'field1'
            }, {
              dataField: 'field1',
              name: 'field1WithTemplate',
              cellTemplate: function(container, options) {
                $(container).text(options.text + (options.oldValue ? ' old:' + options.oldValue : ''));
              }
            }]
          });
          var store = dataSource.store();
          this.clock.tick(10);
          store.update(1, {field1: 'test11'});
          store.insert({
            id: 5,
            field1: 'test5'
          });
          assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass(CELL_UPDATED_CLASS));
          assert.notOk($(dataGrid.getCellElement(0, 2)).hasClass(CELL_UPDATED_CLASS));
          dataGrid.refresh(true);
          this.clock.tick(10);
          assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass(CELL_UPDATED_CLASS));
          assert.notOk($(dataGrid.getCellElement(0, 2)).hasClass(CELL_UPDATED_CLASS));
          assert.notOk($(dataGrid.getRowElement(4)).hasClass(ROW_INSERTED_CLASS));
          assert.strictEqual($(dataGrid.getCellElement(0, 2)).text(), 'test11 old:test1', 'cell value is updated');
          dataGrid.option('highlightChanges', true);
          store.update(1, {field1: 'test111'});
          store.insert({
            id: 6,
            field1: 'test6'
          });
          dataGrid.refresh(true);
          this.clock.tick(10);
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass(CELL_UPDATED_CLASS));
          assert.ok($(dataGrid.getCellElement(0, 2)).hasClass(CELL_UPDATED_CLASS));
          assert.ok($(dataGrid.getRowElement(5)).hasClass(ROW_INSERTED_CLASS));
          assert.strictEqual($(dataGrid.getCellElement(0, 2)).text(), 'test111 old:test11', 'cell value is updated');
        });
        QUnit.test('highlighting works, if twoWayBinding is enabled and watchMethod is set', function(assert) {
          var callbacks = [];
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            highlightChanges: true,
            repaintChangesOnly: true,
            integrationOptions: {watchMethod: function(fn, callback, options) {
                callbacks.push(callback);
                return function() {};
              }},
            columns: ['id', {
              dataField: 'field1',
              name: 'field1'
            }, {
              dataField: 'field1',
              name: 'field1WithTemplate',
              cellTemplate: function(container, options) {
                $(container).text(options.text);
              }
            }]
          });
          var store = dataSource.store();
          this.clock.tick(10);
          store.update(1, {field1: 'test111'});
          callbacks.forEach(function(c) {
            c();
          });
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass(CELL_UPDATED_CLASS));
          assert.ok($(dataGrid.getCellElement(0, 2)).hasClass(CELL_UPDATED_CLASS));
        });
        QUnit.test('Refresh with changesOnly and cellTemplate', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['id', {
              dataField: 'field1',
              cellTemplate: function(container, options) {
                setTimeout(function() {
                  $(container).text(options.text);
                });
              }
            }]
          });
          this.clock.tick(10);
          dataSource.store().update(1, {field1: 'test5'});
          var $cellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          assert.equal($cellElements.length, 2, 'count cell');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'test1', 'first row - value of the second cell');
          dataGrid.refresh(true);
          this.clock.tick(10);
          var $updatedCellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          assert.equal($updatedCellElements.length, 2, 'count cell');
          assert.ok($updatedCellElements.eq(0).is($cellElements.eq(0)), 'first cell isn\'t updated');
          assert.ok(!$updatedCellElements.eq(1).is($cellElements.eq(1)), 'second cell is updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'test5', 'cell value is updated');
        });
        QUnit.test('Refresh with changesOnly and cellPrepared/rowPrepared', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            onCellPrepared: function(e) {
              if (e.rowType === 'data' && e.data.field1 === 'test5') {
                $(e.cellElement).addClass('cell-test5');
              }
            },
            onRowPrepared: function(e) {
              if (e.rowType === 'data' && e.data.field1 === 'test5') {
                $(e.rowElement).addClass('row-test5');
              }
            },
            columns: ['id', 'field1']
          });
          this.clock.tick(10);
          var $cellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          dataSource.store().update(1, {field1: 'test5'});
          dataGrid.refresh(true);
          var $updatedCellElements = $(dataGrid.$element()).find('.dx-data-row').first().children();
          assert.notOk($updatedCellElements.eq(1).is($cellElements.eq(1)), 'second cell is changed');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'test5', 'cell value is updated');
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('cell-test5'), 'cell class is added');
          assert.ok($(dataGrid.getRowElement(0)).hasClass('row-test5'), 'row class is added');
        });
        QUnit.test('Row alt classes and row indexes should be updated after refresh with changesOnly', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            rowAlternationEnabled: true,
            repaintChangesOnly: true,
            dataSource: dataSource
          });
          this.clock.tick(10);
          dataSource.store().remove(2);
          dataGrid.refresh(true);
          for (var i = 0; i < 3; i++) {
            assert.strictEqual($(dataGrid.getRowElement(i)).attr('aria-rowindex'), (i + 1).toString(), 'area row index for row ' + i);
            assert.strictEqual($(dataGrid.getRowElement(i)).hasClass('dx-row-alt'), Boolean(i % 2), 'area row alt for row ' + i);
          }
        });
        QUnit.test('Change dataSource to new with new item instances if repaintChangesOnly is true', function(assert) {
          var cellPreparedArgs = [];
          var rowPreparedArgs = [];
          var watchUpdateArgs = [];
          var dataGrid = createDataGrid({
            keyExpr: 'id',
            loadingTimeout: null,
            repaintChangesOnly: true,
            dataSource: [{
              id: 1,
              field1: 'test1',
              detail: 'detail1'
            }, {
              id: 2,
              field1: 'test2',
              detail: 'detail2'
            }],
            onCellPrepared: function(e) {
              if (e.rowType !== 'data')
                return;
              cellPreparedArgs.push(e);
            },
            onRowPrepared: function(e) {
              if (e.rowType !== 'data')
                return;
              rowPreparedArgs.push(e);
              e.watch(function(data) {
                return data.detail;
              }, function(value) {
                watchUpdateArgs.push(value);
              });
            },
            columns: ['id', 'field1']
          });
          this.clock.tick(10);
          assert.strictEqual(cellPreparedArgs.length, 4, 'cellPrepared call count');
          assert.strictEqual(rowPreparedArgs.length, 2, 'rowPreparedArgs call count');
          var newItems = [{
            id: 1,
            field1: 'test1',
            detail: 'detail1'
          }, {
            id: 2,
            field1: 'test2',
            detail: 'updated'
          }];
          dataGrid.option('dataSource', newItems);
          assert.strictEqual(rowPreparedArgs.length, 2, 'rowPreparedArgs is not called');
          assert.strictEqual(cellPreparedArgs.length, 4, 'cellPrepared is not called');
          assert.strictEqual(dataGrid.getVisibleRows()[0].data, newItems[0], 'row 0 data is updated');
          assert.strictEqual(dataGrid.getVisibleRows()[1].data, newItems[1], 'row 1 data is updated');
          assert.strictEqual(rowPreparedArgs[0].data, newItems[0], 'rowPrepared 0 data is updated');
          assert.strictEqual(rowPreparedArgs[1].data, newItems[1], 'rowPrepared 1 data is updated');
          assert.strictEqual(cellPreparedArgs[0].data, newItems[0], 'cellPrepared 0 data is updated');
          assert.strictEqual(cellPreparedArgs[2].data, newItems[1], 'cellPrepared 2 data is updated');
        });
        QUnit.test('watch in cellPrepared should works after push', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: {
              store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  field1: 'test1'
                }, {
                  id: 2,
                  field1: 'test2'
                }]
              },
              pushAggregationTimeout: 0
            },
            loadingTimeout: null,
            repaintChangesOnly: true,
            editing: {mode: 'cell'},
            onCellPrepared: function(e) {
              if (e.rowType === 'data') {
                e.watch(function() {
                  return e.key === activeRowKey;
                }, function(isActive) {
                  $(e.cellElement).toggleClass('active', isActive);
                });
              }
            },
            columns: ['id', 'field1']
          });
          this.clock.tick(10);
          dataGrid.getDataSource().store().push([{
            type: 'update',
            key: 1,
            data: {field1: 'updated'}
          }]);
          this.clock.tick(10);
          var activeRowKey = 1;
          dataGrid.refresh(true);
          assert.ok($(dataGrid.getCellElement(0, 0)).hasClass('active'), 'active class is added to first cell');
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('active'), 'active class is added to second cell');
          assert.equal($(dataGrid.getCellElement(0, 1)).text(), 'updated', 'second cell text is updated');
          assert.notOk($(dataGrid.getCellElement(1, 0)).hasClass('active'), 'active class is not added to second row');
        });
        QUnit.test('oldValue argument should exists in cellPrepared after push', function(assert) {
          var cellPreparedArgs = [];
          var dataGrid = createDataGrid({
            dataSource: {
              store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  field1: 'test1'
                }, {
                  id: 2,
                  field1: 'test2'
                }]
              },
              pushAggregationTimeout: 0
            },
            loadingTimeout: null,
            repaintChangesOnly: true,
            onCellPrepared: function(e) {
              cellPreparedArgs.push(e);
            },
            columns: ['id', 'field1']
          });
          this.clock.tick(10);
          cellPreparedArgs = [];
          dataGrid.getDataSource().store().push([{
            type: 'update',
            key: 1,
            data: {field1: 'updated'}
          }]);
          assert.equal(cellPreparedArgs.length, 1, 'cell prepared are called for modified cell only');
          assert.equal(cellPreparedArgs[0].key, 1, 'cell prepared key');
          assert.equal(cellPreparedArgs[0].columnIndex, 1, 'cell prepared columnIndex');
          assert.equal(cellPreparedArgs[0].value, 'updated', 'cell prepared value');
          assert.equal(cellPreparedArgs[0].oldValue, 'test1', 'cell prepared oldValue');
        });
        QUnit.test('Refresh with changesOnly and summary', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                value: 100
              }, {
                id: 2,
                value: 100
              }, {
                id: 3,
                value: 100
              }, {
                id: 4,
                value: 100
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            summary: {totalItems: [{
                column: 'value',
                summaryType: 'sum'
              }]},
            columns: ['id', 'value']
          });
          dataSource.store().update(1, {value: 200});
          var $cellElements = $(dataGrid.$element()).find('.dx-datagrid-total-footer .dx-row').first().children();
          dataGrid.refresh(true);
          var $updatedCellElements = $(dataGrid.$element()).find('.dx-datagrid-total-footer .dx-row').first().children();
          assert.equal($updatedCellElements.length, 2, 'count cell');
          assert.ok($updatedCellElements.eq(0).is($cellElements.eq(0)), 'first cell isn\'t changed');
          assert.notOk($updatedCellElements.eq(1).is($cellElements.eq(1)), 'second cell is changed');
          assert.strictEqual($updatedCellElements.eq(1).text(), 'Sum: 500', 'cell value is updated');
        });
        QUnit.test('Band columns should be displayed correctly after adding columns and changing the summary', function(assert) {
          var visibleColumns;
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 4,
              field2: 5,
              field3: 6
            }],
            columns: [{
              caption: '1',
              columns: ['field1', 'field2']
            }]
          });
          dataGrid.addColumn({
            caption: '2',
            columns: ['field3']
          });
          dataGrid.option('summary', {totalItems: [{
              column: 'field1',
              summaryType: 'count'
            }]});
          visibleColumns = dataGrid.getVisibleColumns(0);
          assert.strictEqual(visibleColumns.length, 2, 'number of columns in the first row');
          assert.strictEqual(visibleColumns[0].caption, '1', 'caption of the first column in the first row');
          assert.strictEqual(visibleColumns[1].caption, '2', 'caption of the second column in the first row');
          visibleColumns = dataGrid.getVisibleColumns(1);
          assert.strictEqual(visibleColumns.length, 3, 'number of columns in the second row');
          assert.strictEqual(visibleColumns[0].dataField, 'field1', 'dataField of the first column in the second row');
          assert.strictEqual(visibleColumns[1].dataField, 'field2', 'dataField of the second column in the second row');
          assert.strictEqual(visibleColumns[2].dataField, 'field3', 'dataField of the third column in the second row');
        });
        QUnit.test('navigateToRow should return promise', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{'id': 0}, {'id': 1}, {'id': 2}, {'id': 3}],
            keyExpr: 'id',
            paging: {pageSize: 2}
          });
          var d = dataGrid.navigateToRow(3);
          assert.ok(typeUtils.isFunction(d.promise), 'type object is the Deferred');
          assert.strictEqual(d.state(), 'resolved', 'row is navigated');
        });
        QUnit.test('navigateToRow should return promise: remoteOperations is true', function(assert) {
          var items = [];
          var deferred;
          var dataStore = new ArrayStore([{'id': 0}, {'id': 1}, {'id': 2}, {'id': 3}]);
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            remoteOperations: true,
            dataSource: {
              key: 'id',
              load: function(loadOptions) {
                deferred = $.Deferred();
                dataStore.load(loadOptions).done(function(data) {
                  items = data;
                });
                return deferred.promise();
              }
            },
            paging: {pageSize: 2}
          });
          deferred.resolve(items, {totalCount: 4});
          assert.strictEqual(dataGrid.getVisibleRows().length, 2, 'visible row count is correct');
          var d = dataGrid.navigateToRow(3);
          assert.ok(typeUtils.isFunction(d.promise), 'type object is the Deferred');
          assert.strictEqual(d.state(), 'pending', 'page isn\'t resolved yet');
          deferred.resolve(items);
          deferred.resolve(items, {totalCount: 3});
          deferred.resolve(items, {totalCount: 4});
          assert.strictEqual(d.state(), 'resolved', 'page is resolved');
        });
        QUnit.test('navigateToRow should return promise: one large page', function(assert) {
          var data = [];
          for (var i = 0; i < 20; i++) {
            data.push({id: i});
          }
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: data,
            keyExpr: 'id',
            paging: {pageSize: 20},
            scrolling: {useNative: true},
            height: 100
          });
          var d = dataGrid.navigateToRow(15);
          assert.ok(typeUtils.isFunction(d.promise), 'type object is the Deferred');
          assert.strictEqual(d.state(), 'pending', 'row is not navigated');
          $(dataGrid.getScrollable().container()).trigger('scroll');
          assert.strictEqual(d.state(), 'resolved', 'row is navigated');
        });
        QUnit.test('navigateToRow should return promise: virtual scrolling', function(assert) {
          var data = [];
          for (var i = 0; i < 20; i++) {
            data.push({id: i});
          }
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: data,
            keyExpr: 'id',
            paging: {pageSize: 20},
            scrolling: {
              useNative: true,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            },
            height: 100
          });
          var d = dataGrid.navigateToRow(18);
          assert.ok(typeUtils.isFunction(d.promise), 'type object is the Deferred');
          assert.strictEqual(d.state(), 'pending', 'row is not navigated');
          $(dataGrid.getScrollable().container()).trigger('scroll');
          this.clock.tick(500);
          assert.strictEqual(d.state(), 'resolved', 'row is navigated');
        });
        QUnit.test('The repaint method of the grid should repaint the pager', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: 30,
            pager: {
              visible: true,
              showInfo: true
            },
            dataSource: {
              pageSize: 2,
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
            }
          });
          $(dataGrid.element()).find('.dx-datagrid-pager').removeClass('dx-pager');
          this.clock.tick(100);
          var pageIndexes = $(dataGrid.element()).find('.dx-datagrid-pager .dx-pages .dx-info').get(0);
          $(dataGrid.element()).find('.dx-datagrid-pager').addClass('dx-pager');
          dataGrid.repaint();
          assert.notStrictEqual($(dataGrid.element()).find('.dx-datagrid-pager .dx-pages .dx-info').get(0), pageIndexes, 'pager has repainted');
        });
      });
      QUnit.module('templates', baseModuleConfig, function() {
        QUnit.test('template no found - create text node', function(assert) {
          var dataGrid = createDataGrid({});
          var container = $('<div />').appendTo('#qunit-fixture');
          dataGrid._getTemplate('unknown').render({
            container: container,
            model: {}
          });
          assert.equal(container.text(), 'unknown');
          container.remove();
        });
        QUnit.test('test template in dataGrid container', function(assert) {
          var dataGrid = createDataGrid({});
          var container = $('<div />').appendTo('#qunit-fixture');
          dataGrid._getTemplate('test').render({
            container: container,
            model: {}
          });
          assert.equal(container.text(), 'Template Content');
          container.remove();
        });
        QUnit.test('test template in script outside container', function(assert) {
          setTemplateEngine({
            compile: function(element) {
              element = $(element);
              return element.html();
            },
            render: function(template) {
              return template;
            }
          });
          var dataGrid = createDataGrid({});
          var container = $('<div />');
          dataGrid._getTemplate($('#scriptTestTemplate1')).render({container: container});
          assert.equal(container.html().trim().toLowerCase(), '<span id="template1">Template1</span>'.toLowerCase());
          setTemplateEngine('default');
        });
        QUnit.test('test template in script outside container (get by selector)', function(assert) {
          setTemplateEngine({
            compile: function(element) {
              element = $(element);
              return element.html();
            },
            render: function(template) {
              return template;
            }
          });
          var dataGrid = createDataGrid({});
          var container = $('<div />');
          (DataGrid.IS_RENOVATED_WIDGET ? dataGrid.getComponentInstance() : dataGrid)._getTemplate($('#scriptTestTemplate2')).render({container: container});
          assert.equal(container.html().trim().toLowerCase(), '<span>Template2</span>'.toLowerCase());
          setTemplateEngine('default');
        });
        QUnit.test('getTemplate in gridView', function(assert) {
          var dataGrid = createDataGrid({});
          var container = $('<div />').appendTo('#qunit-fixture');
          dataGrid.getView('gridView').getTemplate('test').render({
            container: container,
            model: {}
          });
          assert.equal(container.text(), 'Template Content');
          container.remove();
        });
        QUnit.test('Setting cellTemplate via DOM node with id attribute', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{
              dataField: 'column1',
              cellTemplate: $('#scriptTestTemplate1').get(0)
            }, {
              dataField: 'column2',
              cellTemplate: $('#scriptTestTemplate2').get(0)
            }]
          });
          this.clock.tick(10);
          var $cells = $($(dataGrid.$element()).find('.dx-datagrid-rowsview').find('table > tbody').find('td'));
          assert.strictEqual($cells.eq(0).html().toLowerCase(), '<span id="template1">template1</span>', 'template of the first column');
          assert.strictEqual($cells.eq(1).html().toLowerCase(), '<span>template2</span>', 'template of the second column');
        });
        QUnit.test('Setting cellTemplate via DOM node without id attribute', function(assert) {
          var $template1 = $('#scriptTestTemplate1').removeAttr('id');
          var $template2 = $('#scriptTestTemplate2').removeAttr('id');
          var dataGrid = createDataGrid({
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{
              dataField: 'column1',
              cellTemplate: $template1
            }, {
              dataField: 'column2',
              cellTemplate: $template2
            }]
          });
          this.clock.tick(10);
          var $cells = $($(dataGrid.$element()).find('.dx-datagrid-rowsview').find('table > tbody').find('td'));
          assert.strictEqual($cells.eq(0).html().toLowerCase(), '<span id="template1">template1</span>', 'template of the first column');
          assert.strictEqual($cells.eq(1).html().toLowerCase(), '<span>template2</span>', 'template of the second column');
          $template1.attr('id', 'scriptTestTemplate1');
          $template2.attr('id', 'scriptTestTemplate2');
        });
        QUnit.test('Setting cellTemplate via dxTemplate', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{
              dataField: 'column1',
              cellTemplate: 'test'
            }, {
              dataField: 'column2',
              cellTemplate: 'test2'
            }]
          });
          this.clock.tick(10);
          var $cells = $($(dataGrid.$element()).find('.dx-datagrid-rowsview').find('table > tbody').find('td'));
          assert.strictEqual($cells.eq(0).text(), 'Template Content', 'template of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Template Content2', 'template of the second column');
        });
        QUnit.test('Setting rowTemplate via dxTemplate', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            rowTemplate: 'testRow',
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{dataField: 'column1'}, {dataField: 'column2'}]
          });
          var $rowElements = $($(dataGrid.$element()).find('.dx-datagrid-rowsview').find('table > tbody').find('tr.test'));
          assert.strictEqual($rowElements.length, 1, 'row element count');
          assert.strictEqual($rowElements.eq(0).text(), 'Row Content', 'row element content');
          assert.strictEqual($(dataGrid.$element()).find('table').length, 2, 'table count');
          assert.strictEqual($(dataGrid.$element()).find('[data-options]').length, 0, 'no elements with data-options attribute');
        });
        QUnit.test('Setting dataRowTemplate via dxTemplate', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataRowTemplate: 'testRow',
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{dataField: 'column1'}, {dataField: 'column2'}]
          });
          var $rowElements = $($(dataGrid.$element()).find('.dx-datagrid-rowsview').find('table > tbody').find('tr.test'));
          assert.strictEqual($rowElements.length, 1, 'row element count');
          assert.strictEqual($rowElements.eq(0).text(), 'Row Content', 'row element content');
          assert.strictEqual($(dataGrid.$element()).find('table').length, 2, 'table count');
          assert.strictEqual($(dataGrid.$element()).find('[data-options]').length, 0, 'no elements with data-options attribute');
        });
        QUnit.test('Add row when DataGrid is empty and rowTemplate is used', function(assert) {
          var dataGrid = createDataGrid({
            width: 1000,
            dataSource: [],
            loadingTimeout: null,
            columns: ['field1', {
              dataField: 'field2',
              width: 100
            }],
            rowTemplate: function(container, options) {
              $(container).append("<tbody class='dx-row'>\n                        <tr>\n                            <td>new</td>\n                            <td>new</td>\n                        </tr>\n                    </tbody>");
            }
          });
          dataGrid.addRow();
          var $row = $(dataGrid.getRowElement(0));
          var $cells = $row.find('td');
          assert.equal(getOuterWidth($cells.eq(0)), 900, 'first cell width');
          assert.equal(getOuterWidth($cells.eq(1)), 100, 'second cell width');
          assert.equal(getOuterWidth(dataGrid.$element()), 1000, 'dataGrid width');
        });
        QUnit.test('Add row when DataGrid is empty and dataRowTemplate is used', function(assert) {
          var dataGrid = createDataGrid({
            width: 1000,
            dataSource: [],
            loadingTimeout: null,
            columns: ['field1', {
              dataField: 'field2',
              width: 100
            }],
            dataRowTemplate: function(container, options) {
              $(container).append("<tr>\n                        <td>new</td>\n                        <td>new</td>\n                    </tr>");
            }
          });
          dataGrid.addRow();
          var $row = $(dataGrid.getRowElement(0));
          var $cells = $row.find('td');
          assert.equal(getOuterWidth($cells.eq(0)), 900, 'first cell width');
          assert.equal(getOuterWidth($cells.eq(1)), 100, 'second cell width');
          assert.equal(getOuterWidth(dataGrid.$element()), 1000, 'dataGrid width');
        });
        QUnit.test('Add row when DataGrid is empty and rowTemplate is used (with columnAutoWidth and editing)', function(assert) {
          var dataGrid = createDataGrid({
            width: 1000,
            dataSource: [],
            loadingTimeout: null,
            rowTemplate: function(container, options) {
              $(container).append("<tbody class='dx-row'>\n                        <tr>\n                            <td>new</td>\n                            <td>new</td>\n                        </tr>\n                    </tbody>");
            },
            editing: {allowAdding: true},
            columns: ['field1', {
              dataField: 'field2',
              width: 100
            }, {
              type: 'buttons',
              visible: false
            }],
            columnAutoWidth: true
          });
          try {
            dataGrid.addRow();
          } catch (err) {
            assert.notOk(true, 'error should not be thrown');
            return;
          }
          var $row = $(dataGrid.getRowElement(0));
          var $cells = $row.find('td');
          assert.equal(getOuterWidth($cells.eq(0)), 900, 'first cell width');
          assert.equal(getOuterWidth($cells.eq(1)), 100, 'second cell width');
          assert.equal(getOuterWidth(dataGrid.$element()), 1000, 'dataGrid width');
        });
        QUnit.test('rowElement argument of rowTemplate option is correct', function(assert) {
          assert.expect(2);
          $('#dataGrid').dxDataGrid({
            rowTemplate: function(rowElement) {
              assert.equal(typeUtils.isRenderer(rowElement), !!config().useJQuery, 'rowElement is correct');
              assert.ok($(rowElement).closest(findShadowHostOrDocument(rowElement)).length, 'rowElement is attached to DOM');
            },
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{dataField: 'column1'}, {dataField: 'column2'}]
          });
          this.clock.tick(10);
        });
        QUnit.test('rowElement argument of dataRowTemplate option is correct', function(assert) {
          assert.expect(3);
          $('#dataGrid').dxDataGrid({
            dataRowTemplate: function(rowElement) {
              assert.equal(typeUtils.isRenderer(rowElement), !!config().useJQuery, 'rowElement is correct');
              assert.equal($(rowElement)[0].tagName.toLowerCase(), 'tbody', 'rowElement tagName is tbody');
              assert.ok($(rowElement).closest(findShadowHostOrDocument(rowElement)).length, 'rowElement is attached to DOM');
            },
            dataSource: [{
              column1: 'test1',
              column2: 'test2'
            }],
            columns: [{dataField: 'column1'}, {dataField: 'column2'}]
          });
          this.clock.tick(10);
        });
        QUnit.test('deprecate warnings should not be fired for dataRowTemplate', function(assert) {
          var log = sinon.spy(errors, 'log');
          createDataGrid({
            dataRowTemplate: function(rowElement) {
              rowElement.append('<tr>');
            },
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          assert.strictEqual(log.callCount, 0, 'error.log is not called');
          log.restore();
        });
        QUnit.test('deprecate warnings should be fired for rowTemplate', function(assert) {
          var log = sinon.spy(errors, 'log');
          createDataGrid({
            rowTemplate: function(rowElement) {
              rowElement.append('<tr>');
            },
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          assert.strictEqual(log.callCount, 1, 'error.log is called once');
          assert.deepEqual(log.getCall(0).args, ['W0001', 'dxDataGrid', 'rowTemplate', '21.2', 'Use the "dataRowTemplate" option instead'], 'error.log args');
          log.restore();
        });
        ['deferUpdate', 'setTimeout'].forEach(function(asyncMethod) {
          QUnit.test(("freespace row should be rendered correctly on last page if async dataRowTemplate is defined with " + asyncMethod + " in react (T1031218)"), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                text: 'text 1'
              }, {
                id: 2,
                text: 'text 2'
              }, {
                id: 3,
                text: 'text 3'
              }],
              paging: {pageSize: 2},
              columns: ['text'],
              dataRowTemplate: 'rowTemplate',
              templatesRenderAsynchronously: true,
              integrationOptions: {templates: {rowTemplate: {render: function($__2) {
                      var $__3 = $__2,
                          container = $__3.container,
                          model = $__3.model,
                          onRendered = $__3.onRendered;
                      var data = model.data;
                      var markup = '<tr class="my-row">' + '<td>' + data.text + '</td>' + '</tr>';
                      (asyncMethod === 'deferUpdate' ? deferUpdate : setTimeout)(function() {
                        container.append(markup);
                        onRendered();
                      });
                      return container;
                    }}}}
            });
            this.clock.tick(10);
            dataGrid.pageIndex(1);
            this.clock.tick(10);
            var $rows = $(dataGrid.element()).find('.dx-row');
            assert.equal($rows.length, 4, 'row count');
            assert.ok($rows.eq(0).hasClass('dx-header-row'), 'first row is header');
            assert.ok($rows.eq(1).hasClass('dx-data-row'), 'second row is data');
            assert.ok($rows.eq(1).find('.my-row').length, 'second row is rendered from template');
            assert.ok($rows.eq(2).hasClass('dx-freespace-row'), 'third row is freespace');
            assert.ok($rows.eq(2).height() > 10, 'freespace row has height');
          });
        });
        QUnit.test('row should be updated on using push API if repaintChangesOnly is enabled and dataRowTemplate is defined in react (T859033)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              text: 'text 1'
            }, {
              id: 2,
              text: 'text 2'
            }],
            keyExpr: 'id',
            repaintChangesOnly: true,
            dataRowTemplate: 'rowTemplate',
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {rowTemplate: {render: function($__2) {
                    var $__3 = $__2,
                        container = $__3.container,
                        model = $__3.model,
                        onRendered = $__3.onRendered;
                    var data = model.data;
                    var markup = '<tr>' + '<td class="my-cell">' + data.text + '</td>' + '</tr>';
                    deferUpdate(function() {
                      container.append(markup);
                      onRendered();
                    });
                    return container;
                  }}}}
          });
          this.clock.tick(10);
          dataGrid.getDataSource().store().push([{
            type: 'update',
            key: 1,
            data: {text: 'updated'}
          }]);
          this.clock.tick(10);
          var $firstRow = $(dataGrid.getRowElement(0));
          assert.equal($firstRow.find('.my-cell').text(), 'updated', 'cell is updated');
        });
        QUnit.test('totalCount', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {
              store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
              pageSize: 3
            }
          });
          var totalCount = dataGrid.totalCount();
          assert.equal(totalCount, 5, 'totalCount');
        });
        QUnit.test('The freespace row should be as a tbody tag when dataRowTemplate is specified', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              text: 'text 1'
            }, {
              id: 2,
              text: 'text 2'
            }],
            height: 600,
            columns: ['text'],
            dataRowTemplate: function(_, item) {
              var data = item.data;
              var markup = '<tr>' + ("<td>" + data.id + "</td>") + ("<td>" + data.text + "</td>") + '</tr>';
              return markup;
            }
          });
          this.clock.tick(10);
          var $rowElements = $(dataGrid.element()).find('.dx-datagrid-rowsview table > .dx-row');
          var $freeSpaceRow = $rowElements.last();
          assert.strictEqual($rowElements.length, 3, 'row count');
          assert.strictEqual($rowElements.filter('.dx-freespace-row').length, 1, 'freespace row count');
          assert.ok($freeSpaceRow.hasClass('dx-freespace-row'), 'freespace row is last');
          assert.ok($freeSpaceRow.is('tbody'), 'freespace row as tbody tag');
        });
        QUnit.test('Grid should not flicker on paging when cellTemplate is set and templatesRenderAsynchronously = true', function(assert) {
          assert.expect(4);
          var dataGrid = createDataGrid({
            templatesRenderAsynchronously: true,
            dataSource: generateItems(100),
            height: 600,
            columns: [{
              dataField: 'field1',
              cellTemplate: '#testTemplate'
            }],
            paging: {pageSize: 20}
          });
          this.clock.tick(100);
          dataGrid.getView('rowsView')._templatesCache = {};
          sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
            assert.strictEqual(selector, '#testTemplate', 'template name');
            return {render: function(options) {
                setTimeout(function() {
                  options.deferred && options.deferred.resolve();
                }, 100);
              }};
          });
          var tableElement = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0);
          dataGrid.pageIndex(1);
          this.clock.tick(50);
          assert.deepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is not re-render');
          this.clock.tick(100);
          assert.notDeepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is re-render');
        });
        QUnit.test('Grid should not flicker on sorting when cellTemplate is set and templatesRenderAsynchronously = true', function(assert) {
          assert.expect(4);
          var dataGrid = createDataGrid({
            templatesRenderAsynchronously: true,
            dataSource: generateItems(100),
            height: 600,
            columns: [{
              dataField: 'field1',
              cellTemplate: '#testTemplate'
            }],
            paging: {pageSize: 20}
          });
          this.clock.tick(100);
          dataGrid.getView('rowsView')._templatesCache = {};
          sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
            assert.strictEqual(selector, '#testTemplate', 'template name');
            return {render: function(options) {
                setTimeout(function() {
                  options.deferred && options.deferred.resolve();
                }, 100);
              }};
          });
          var tableElement = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0);
          dataGrid.columnOption('field1', 'sortOrder', 'desc');
          this.clock.tick(50);
          assert.deepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is not re-render');
          this.clock.tick(100);
          assert.notDeepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is re-render');
        });
        QUnit.test('Grid should not flicker on filtering when cellTemplate is set and templatesRenderAsynchronously = true', function(assert) {
          assert.expect(4);
          var dataGrid = createDataGrid({
            templatesRenderAsynchronously: true,
            dataSource: generateItems(100),
            height: 600,
            columns: [{
              dataField: 'field1',
              cellTemplate: '#testTemplate'
            }],
            paging: {pageSize: 20}
          });
          this.clock.tick(100);
          dataGrid.getView('rowsView')._templatesCache = {};
          sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
            assert.strictEqual(selector, '#testTemplate', 'template name');
            return {render: function(options) {
                setTimeout(function() {
                  options.deferred && options.deferred.resolve();
                }, 100);
              }};
          });
          var tableElement = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0);
          dataGrid.columnOption('field1', 'filterValue', 1);
          this.clock.tick(50);
          assert.deepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is not re-render');
          this.clock.tick(100);
          assert.notDeepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-datagrid-table').get(0), tableElement, 'table is re-render');
        });
        QUnit.test('The cell should be focused when switching to edit state when editing.mode=\'batch\' and editCellTemplate is set', function(assert) {
          assert.expect(7);
          var dataGrid = createDataGrid({
            dataSource: generateItems(10),
            height: 600,
            columns: [{
              dataField: 'field1',
              editCellTemplate: '#testTemplate'
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            }
          });
          this.clock.tick(100);
          dataGrid.getView('rowsView')._templatesCache = {};
          sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
            assert.strictEqual(selector, '#testTemplate', 'template name');
            return {render: function(options) {
                setTimeout(function() {
                  $(options.container).append('<input type=\'text\'/>');
                  options.deferred && options.deferred.resolve();
                }, 100);
              }};
          });
          $(dataGrid.getCellElement(0, 0)).trigger('dxclick');
          this.clock.tick(200);
          var $focusOverlay = $(dataGrid.element()).find('.dx-datagrid-focus-overlay');
          var offsetFocusOverlay = $focusOverlay.get(0).getBoundingClientRect();
          var cellOffset = $(dataGrid.getCellElement(0, 0)).get(0).getBoundingClientRect();
          assert.ok($focusOverlay.is(':visible'), 'focus overlay is visible');
          assert.roughEqual(offsetFocusOverlay.left, cellOffset.left, 1.01, 'focus overlay - left position');
          assert.roughEqual(offsetFocusOverlay.top, cellOffset.top, 1.01, 'focus overlay - top position');
          assert.roughEqual(offsetFocusOverlay.width, cellOffset.width, 1.01, 'focus overlay - width');
          assert.roughEqual(offsetFocusOverlay.height, cellOffset.height, 1.01, 'focus overlay - height');
        });
        QUnit.test('Cells should display without delay when using cellTemplate, virtual scrolling mode and templatesRenderAsynchronously = true', function(assert) {
          assert.expect(4);
          var dataGrid = createDataGrid({
            templatesRenderAsynchronously: true,
            dataSource: generateItems(100),
            height: 600,
            columns: [{
              dataField: 'field1',
              cellTemplate: '#testTemplate'
            }, 'field2'],
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(100);
          dataGrid.getView('rowsView')._templatesCache = {};
          sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
            assert.strictEqual(selector, '#testTemplate', 'template name');
            return {render: function(options) {
                setTimeout(function() {
                  options.deferred && options.deferred.resolve();
                }, 100);
              }};
          });
          var lastRowElement = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-data-row').get(-1);
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 3000});
          $(scrollable.content()).trigger('scroll');
          this.clock.tick(50);
          assert.deepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-data-row').get(-1), lastRowElement, 'rows are not re-render');
          this.clock.tick(100);
          assert.notDeepEqual($(dataGrid.element()).find('.dx-datagrid-rowsview .dx-data-row').get(-1), lastRowElement, 'rows are re-render');
        });
        QUnit.test('No exceptions on initial loading and rendering data when there are async templates and virtual scrolling is enabled', function(assert) {
          var getTemplateStub;
          try {
            getTemplateStub = sinon.stub(DataGrid.prototype, '_getTemplate', function(selector) {
              return {render: function(options) {
                  setTimeout(function() {
                    options.deferred && options.deferred.resolve();
                  }, 100);
                }};
            });
            var dataGrid = createDataGrid({
              renderAsync: false,
              templatesRenderAsynchronously: true,
              dataSource: generateItems(100),
              height: 700,
              scrolling: {mode: 'virtual'},
              columns: ['field1', {
                dataField: 'field2',
                renderAsync: true,
                cellTemplate: '#testTemplate'
              }]
            });
            this.clock.tick(50);
            dataGrid.dispose();
            this.clock.tick(200);
            assert.ok(true, 'no exceptions');
          } catch (e) {
            assert.ok(false, 'exception');
          } finally {
            getTemplateStub.restore();
          }
        });
        [true, false].forEach(function(renderAsync) {
          QUnit.test(("Headers should display correctly when there are a fixed command column, headerCellTemplate is set and renderAsync = " + renderAsync + " (react)"), function(assert) {
            assert.expect(3);
            $('#dataGrid').addClass('myClass');
            var dataGrid = createDataGrid({
              renderAsync: renderAsync,
              templatesRenderAsynchronously: true,
              dataSource: generateItems(100),
              height: 600,
              selection: {mode: 'multiple'},
              filterRow: {visible: true},
              columnFixing: {enabled: true},
              columns: [{
                dataField: 'field1',
                headerCellTemplate: '#testTemplate'
              }]
            });
            this.clock.tick(100);
            dataGrid.getView('columnHeadersView')._templatesCache = {};
            sinon.stub(dataGrid, '_getTemplate').callsFake(function(selector) {
              assert.strictEqual(selector, '#testTemplate', 'template name');
              return {render: function(options) {
                  setTimeout(function() {
                    $(options.container).append($('<div/>').height(60));
                    options.deferred && options.deferred.resolve();
                  }, 100);
                }};
            });
            dataGrid.repaint();
            this.clock.tick(100);
            var $tableElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-datagrid-content:not(.dx-datagrid-content-fixed) .dx-datagrid-table');
            var $fixedTableElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-datagrid-content-fixed .dx-datagrid-table');
            assert.strictEqual($tableElement.height(), $fixedTableElement.height(), 'table height is equal to fixed table height');
          });
        });
      });
      QUnit.module('Modules', {afterEach: function() {
          gridCore.unregisterModule('test');
        }}, function() {
        QUnit.test('register module', function(assert) {
          var modulesCount = gridCore.modules.length;
          gridCore.registerModule('test', {});
          assert.equal(gridCore.modules.length - modulesCount, 1);
          assert.equal(gridCore.modules[modulesCount].name, 'test');
        });
        QUnit.test('register module in dxDataGrid Class', function(assert) {
          var modulesCount = gridCore.modules.length;
          DataGrid.registerModule('test', {id: 'test'});
          assert.equal(gridCore.modules.length - modulesCount, 1);
          assert.equal(gridCore.modules[modulesCount].name, 'test');
          assert.equal(gridCore.modules[modulesCount].id, 'test');
        });
        QUnit.test('register module with existing name', function(assert) {
          var modulesCount = gridCore.modules.length;
          gridCore.registerModule('test', {id: 1});
          gridCore.registerModule('test', {id: 2});
          assert.equal(gridCore.modules.length - modulesCount, 1);
          assert.equal(gridCore.modules[modulesCount].name, 'test');
          assert.equal(gridCore.modules[modulesCount].id, 1);
        });
        QUnit.test('register defaultOptions', function(assert) {
          gridCore.registerModule('test', {defaultOptions: function() {
              return {test: {enabled: true}};
            }});
          var dataGrid = createDataGrid({});
          assert.ok((DataGrid.IS_RENOVATED_WIDGET ? dataGrid.getComponentInstance() : dataGrid).option('test.enabled'), 'registered default option');
        });
        QUnit.test('register defaultOptions with localizable value', function(assert) {
          gridCore.registerModule('test', {defaultOptions: function() {
              return {test: {text: messageLocalization.format('dxDataGrid-testText')}};
            }});
          messageLocalization.load({'en': {'dxDataGrid-testText': 'LOCALIZED'}});
          var dataGrid = createDataGrid({});
          assert.ok((DataGrid.IS_RENOVATED_WIDGET ? dataGrid.getComponentInstance() : dataGrid).option('test.text'), 'LOCALIZED');
        });
        QUnit.test('register controller', function(assert) {
          gridCore.registerModule('test', {controllers: {test: gridCore.Controller.inherit({test: function() {
                  return 'test';
                }})}});
          var dataGrid = createDataGrid({});
          assert.ok(dataGrid.getController('test'), 'test controller created');
          assert.equal(dataGrid.getController('test').test(), 'test');
        });
        QUnit.test('register controller with incorrect base class', function(assert) {
          gridCore.registerModule('test', {controllers: {test: Class.inherit({})}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Module \'test\'. Controller \'test\' does not inherit from DevExpress.ui.dxDataGrid.Controller') > -1);
          }
        });
        QUnit.test('register controller with registered name', function(assert) {
          gridCore.registerModule('test', {controllers: {data: gridCore.Controller.inherit({})}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Module \'test\'. Controller \'data\' is already registered') > -1);
          }
        });
        QUnit.test('extend controller', function(assert) {
          gridCore.registerModule('test', {extenders: {controllers: {data: {test: function() {
                    return 'test';
                  }}}}});
          var dataGrid = createDataGrid({});
          assert.equal(dataGrid.getController('data').test(), 'test');
        });
        QUnit.test('register view', function(assert) {
          gridCore.registerModule('test', {views: {test: gridCore.View.inherit({test: function() {
                  return 'test';
                }})}});
          var dataGrid = createDataGrid({});
          assert.ok(dataGrid.getView('test'), 'test view created');
          assert.equal(dataGrid.getView('test').test(), 'test');
        });
        QUnit.test('register view with incorrect base class', function(assert) {
          gridCore.registerModule('test', {views: {test: Class.inherit({})}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Module \'test\'. View \'test\' does not inherit from DevExpress.ui.dxDataGrid.View') > -1);
          }
        });
        QUnit.test('register view with registered name', function(assert) {
          gridCore.registerModule('test', {views: {rowsView: gridCore.View.inherit({})}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Module \'test\'. View \'rowsView\' is already registered') > -1);
          }
        });
        QUnit.test('extend view', function(assert) {
          gridCore.registerModule('test', {extenders: {views: {rowsView: {test: function() {
                    return 'test';
                  }}}}});
          var dataGrid = createDataGrid({});
          assert.equal(dataGrid.getView('rowsView').test(), 'test');
        });
        QUnit.test('Render view after invalidate', function(assert) {
          var testView = new gridCore.View({isReady: function() {
              return true;
            }});
          var renderCounter = 0;
          testView.render($('#container'));
          testView._renderCore = function() {
            renderCounter++;
          };
          testView.beginUpdate();
          assert.equal(renderCounter, 0, 'view is not rendered on beginUpdate');
          testView._invalidate();
          assert.equal(renderCounter, 0, 'view is not rendered on invalidate');
          testView.endUpdate();
          testView.endUpdate();
          testView.endUpdate();
          assert.equal(renderCounter, 1, 'view is rendered on endUpdate');
        });
        QUnit.test('Controller public methods', function(assert) {
          gridCore.registerModule('test', {controllers: {test: gridCore.Controller.inherit({
                publicMethods: function() {
                  return ['testMethod'];
                },
                testMethod: function() {
                  return 'test';
                }
              })}});
          var dataGrid = createDataGrid({});
          assert.equal((DataGrid.IS_RENOVATED_WIDGET ? dataGrid.getComponentInstance() : dataGrid).testMethod(), 'test');
        });
        QUnit.test('controller public methods does not exist', function(assert) {
          gridCore.registerModule('test', {controllers: {test: gridCore.Controller.inherit({publicMethods: function() {
                  return ['testMethod'];
                }})}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Public method \'test.testMethod\' does not exist') > -1);
          }
        });
        QUnit.test('controller public methods already registered', function(assert) {
          gridCore.registerModule('test', {controllers: {test: gridCore.Controller.inherit({
                publicMethods: function() {
                  return ['refresh'];
                },
                refresh: function() {
                  return 'testRefresh';
                }
              })}});
          try {
            createDataGrid({});
          } catch (e) {
            assert.ok(e.message.indexOf('Public method \'refresh\' is already registered') > -1);
          }
        });
        QUnit.test('view public methods', function(assert) {
          gridCore.registerModule('test', {views: {test: gridCore.View.inherit({
                publicMethods: function() {
                  return ['testMethod'];
                },
                testMethod: function() {
                  return 'test';
                }
              })}});
          var dataGrid = createDataGrid({});
          assert.equal((DataGrid.IS_RENOVATED_WIDGET ? dataGrid.getComponentInstance() : dataGrid).testMethod(), 'test');
        });
        QUnit.test('callbacks registration', function(assert) {
          gridCore.registerModule('test', {controllers: {test: gridCore.Controller.inherit({callbackNames: function() {
                  return ['callback1', 'callback2'];
                }})}});
          var dataGrid = createDataGrid({});
          assert.ok(dataGrid.getController('test').callback1);
          assert.equal($traceurRuntime.typeof(dataGrid.getController('test').callback1.add), 'function');
          assert.ok(dataGrid.getController('test').callback2);
          assert.equal($traceurRuntime.typeof(dataGrid.getController('test').callback2.add), 'function');
        });
        QUnit.test('Begin and end update', function(assert) {
          var moduleItem = new gridCore.Controller();
          var endUpdateCounter = 0;
          moduleItem._endUpdateCore = function() {
            endUpdateCounter++;
          };
          moduleItem.beginUpdate();
          moduleItem.beginUpdate();
          moduleItem.beginUpdate();
          moduleItem.beginUpdate();
          moduleItem.endUpdate();
          moduleItem.endUpdate();
          moduleItem.endUpdate();
          moduleItem.endUpdate();
          assert.equal(endUpdateCounter, 1);
        });
      });
      QUnit.module('Formatting', baseModuleConfig, function() {
        QUnit.test('Empty value for dateTime formatting', function(assert) {
          assert.equal(gridCore.formatValue(null, {
            dataType: 'date',
            format: 'shortDate'
          }), '');
          assert.equal(gridCore.formatValue(undefined, {
            dataType: 'date',
            format: 'shortDate'
          }), '');
        });
        QUnit.test('Number formatting', function(assert) {
          assert.equal(gridCore.formatValue(215.66, {format: {
              type: 'fixedPoint',
              precision: 1
            }}), '215.7');
          assert.equal(gridCore.formatValue(150.26, {}), '150.26');
        });
        QUnit.test('Date formatting', function(assert) {
          assert.equal(gridCore.formatValue(new Date(2012, 10, 5), {format: 'shortDate'}), '11/5/2012');
        });
        QUnit.test('CustomizeText formatting', function(assert) {
          assert.equal(gridCore.formatValue(215.66, {
            format: {
              type: 'fixedPoint',
              precision: 1
            },
            customizeText: function(options) {
              return options.valueText + ' rub';
            }
          }), '215.7 rub');
          assert.equal(gridCore.formatValue(215.66, {
            format: {
              type: 'fixedPoint',
              precision: 1
            },
            customizeText: function(options) {
              return Math.round(options.value) + ' rub';
            }
          }), '216 rub');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/data_grid","jquery","core/class","core/utils/console","core/utils/type","core/utils/common","core/utils/shadow_dom","core/devices","core/version","core/errors","ui/data_grid/ui.data_grid.core","data/data_source/data_source","data/array_store","localization/message","core/templates/template_engine_registry","animation/fx","core/config","../../helpers/ajaxMock.js","../../helpers/wrappers/dataGridWrappers.js","../../helpers/stylesHelper.js","../../helpers/checkDxFontIconHelper.js","../../helpers/dataGridHelper.js","core/utils/size","../../helpers/dataGridMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/data_grid"), require("jquery"), require("core/class"), require("core/utils/console"), require("core/utils/type"), require("core/utils/common"), require("core/utils/shadow_dom"), require("core/devices"), require("core/version"), require("core/errors"), require("ui/data_grid/ui.data_grid.core"), require("data/data_source/data_source"), require("data/array_store"), require("localization/message"), require("core/templates/template_engine_registry"), require("animation/fx"), require("core/config"), require("../../helpers/ajaxMock.js"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/stylesHelper.js"), require("../../helpers/checkDxFontIconHelper.js"), require("../../helpers/dataGridHelper.js"), require("core/utils/size"), require("../../helpers/dataGridMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataGrid.tests.js.map