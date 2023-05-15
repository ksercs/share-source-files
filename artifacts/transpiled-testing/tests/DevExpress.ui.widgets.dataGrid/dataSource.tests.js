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

(["testing/tests/DevExpress.ui.widgets.dataGrid/dataSource.tests.js"], ["jquery","core/utils/console","data/data_source/data_source","data/array_store","data/custom_store","data/odata/store","data/query","data/store_helper","ui/data_grid/ui.data_grid.core","../../helpers/dataGridMocks.js","ui/data_grid/ui.data_grid.grouping.expanded","ui/data_grid/ui.data_grid.grouping.core","ui/data_grid/ui.data_grid.grouping.collapsed","ui/data_grid"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/dataSource.tests.js", ["jquery", "core/utils/console", "data/data_source/data_source", "data/array_store", "data/custom_store", "data/odata/store", "data/query", "data/store_helper", "ui/data_grid/ui.data_grid.core", "../../helpers/dataGridMocks.js", "ui/data_grid/ui.data_grid.grouping.expanded", "ui/data_grid/ui.data_grid.grouping.core", "ui/data_grid/ui.data_grid.grouping.collapsed", "ui/data_grid"], function($__export) {
  "use strict";
  var $,
      logger,
      DataSource,
      ArrayStore,
      CustomStore,
      ODataStore,
      dataQuery,
      queryByOptions,
      gridCore,
      setupDataGridModules,
      loadTotalCount,
      ExpandedGroupingHelper,
      createOffsetFilter,
      getContinuationGroupCount,
      CollapsedGroupingHelper,
      TEN_NUMBERS,
      createDataSource;
  function createDataSourceWithRemoteGrouping(options, remoteGroupPaging, brokeOptions) {
    if ($.isArray(options.store) || (options.store && options.store.type === 'array') || options.load) {
      var arrayStore = new ArrayStore(options.store || []);
      options.executeAsync = options.executeAsync || function(func) {
        func();
      };
      brokeOptions = brokeOptions || {};
      options.remoteOperations = {
        filtering: true,
        sorting: true,
        grouping: true,
        paging: true,
        summary: true
      };
      if (remoteGroupPaging) {
        options.remoteOperations.groupPaging = true;
      }
      delete options.store;
      options.load = options.load || function(loadOptions) {
        var d = $.Deferred();
        var removeDataItems = function(items, groupCount) {
          if (!groupCount)
            return;
          for (var i = 0; i < items.length; i++) {
            if (groupCount > 1) {
              removeDataItems(items[i].items, groupCount - 1);
            } else {
              items[i].count = items[i].items.length;
              items[i].items = null;
            }
          }
        };
        options.executeAsync(function() {
          if (brokeOptions.errorOnFirstLoad) {
            brokeOptions.errorOnFirstLoad = false;
            d.reject('Error');
            return;
          }
          arrayStore.load(loadOptions).done(function(data) {
            var groupCount = gridCore.normalizeSortingInfo(loadOptions.group).length;
            removeDataItems(data, groupCount);
            arrayStore.totalCount(loadOptions).done(function(totalCount) {
              var extra = {};
              if (loadOptions.requireTotalCount && !brokeOptions.skipTotalCount) {
                extra.totalCount = totalCount;
              }
              if (loadOptions.requireGroupCount && !brokeOptions.skipGroupCount) {
                queryByOptions(arrayStore.createQuery(), {
                  filter: loadOptions.filter,
                  group: loadOptions.group
                }).count().done(function(groupCount) {
                  extra.groupCount = groupCount;
                });
              }
              if (brokeOptions.useNativePromise) {
                d.resolve($.extend({data: data}, extra));
              } else {
                d.resolve(data, extra);
              }
            });
          });
        }, loadOptions);
        return d;
      };
    }
    return createDataSource(options);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      logger = $__m.logger;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      ODataStore = $__m.default;
    }, function($__m) {
      dataQuery = $__m.default;
    }, function($__m) {
      queryByOptions = $__m.queryByOptions;
    }, function($__m) {
      gridCore = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      loadTotalCount = $__m.loadTotalCount;
      ExpandedGroupingHelper = $__m.GroupingHelper;
    }, function($__m) {
      createOffsetFilter = $__m.createOffsetFilter;
    }, function($__m) {
      getContinuationGroupCount = $__m.getContinuationGroupCount;
      CollapsedGroupingHelper = $__m.GroupingHelper;
    }, function($__m) {}],
    execute: function() {
      TEN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      createDataSource = function(options) {
        options._preferSync = true;
        var dataSource = new DataSource(options);
        var dataGridStub = {options: {
            scrolling: options.scrolling,
            cacheEnabled: options.cacheEnabled,
            remoteOperations: options.remoteOperations,
            loadingTimeout: options.loadingTimeout !== undefined ? options.loadingTimeout : (options.asyncLoadEnabled ? 0 : undefined)
          }};
        setupDataGridModules(dataGridStub, ['data', 'columns']);
        var dataSourceAdapter = dataGridStub.dataController._createDataSourceAdapter(dataSource);
        var origItems = dataSourceAdapter.items;
        var processItems = function(items) {
          for (var i = 0; i < items.length; i++) {
            if ($traceurRuntime.typeof(items[i]) === 'object') {
              if ('items' in items[i] && items[i].items !== null) {
                processItems(items[i].items);
              }
              if ('collapsedItems' in items[i]) {
                delete items[i]['collapsedItems'];
              }
              if ('key' in items[i] && 'items' in items[i] && 'count' in items[i]) {
                delete items[i]['count'];
              }
            }
          }
        };
        dataSourceAdapter.items = function() {
          var items = origItems.apply(this, arguments);
          processItems(items);
          return items;
        };
        return dataSourceAdapter;
      };
      QUnit.module('Grid DataSource', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          TEN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          this.clock.restore();
        }
      }, function() {
        QUnit.test('page index parallel change', function(assert) {
          var loadingPages = [];
          var source = createDataSource({
            store: {
              onLoading: function(options) {
                loadingPages.push(source.pageIndex());
              },
              type: 'array',
              data: TEN_NUMBERS
            },
            pageSize: 3,
            asyncLoadEnabled: true,
            requireTotalCount: true,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }
          });
          var changeCallCount = 0;
          source.load().done(function() {
            source.changed.add(function(options) {
              changeCallCount++;
            });
            source.pageIndex(1);
            source.load();
            source.pageIndex(2);
            source.load();
            source.pageIndex(3);
            source.load();
          });
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.equal(source.pageIndex(), 3);
          assert.equal(loadingPages.length, 2, 'one loading occurs');
          assert.deepEqual(loadingPages, [0, 3], 'last loading occurs');
          assert.ok(!source.isLoading(), 'loading completed');
        });
        QUnit.test('get page size if paginate enabled', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3
          });
          var changeCallCount = 0;
          source.load().done(function() {
            changeCallCount++;
          });
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.equal(source.pageSize(), 3);
        });
        QUnit.test('get page size if paginate disabled', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            paginate: false
          });
          var changeCallCount = 0;
          source.load().done(function() {
            changeCallCount++;
          });
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.equal(source.pageSize(), 0);
        });
        QUnit.test('page size change', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3
          });
          var changeCallCount = 0;
          source.load().done(function() {
            assert.equal(source.items().length, 3);
            source.pageSize(5);
            source.load().done(function() {
              changeCallCount++;
            });
          });
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.deepEqual(source.items(), [1, 2, 3, 4, 5]);
        });
        QUnit.test('reload do not reset pageIndex', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3
          });
          source.load();
          source.pageIndex(1);
          source.reload();
          assert.equal(source.pageIndex(), 1);
          assert.equal(source.items().length, 3);
          assert.equal(source.items()[0], 4);
        });
        QUnit.test('reload full reset isLoaded', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            asyncLoadEnabled: true
          });
          var finalized;
          source.load().done(function() {
            assert.ok(source.isLoaded());
            source.reload(true);
            assert.ok(!source.isLoaded());
            finalized = true;
          });
          this.clock.tick(10);
          assert.ok(finalized);
        });
        QUnit.test('reload calls before last load complete', function(assert) {
          var totalCountDeferred = $.Deferred();
          var source = createDataSource({
            store: new CustomStore({
              load: function() {
                return TEN_NUMBERS;
              },
              totalCount: function() {
                return totalCountDeferred;
              }
            }),
            asyncLoadEnabled: true,
            pageSize: 3,
            requireTotalCount: true,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }
          });
          var loaded;
          var reloaded;
          source.load().done(function() {
            loaded = true;
          });
          this.clock.tick(10);
          source.reload().done(function() {
            reloaded = true;
          });
          totalCountDeferred.resolve(10);
          totalCountDeferred = $.Deferred();
          totalCountDeferred.resolve(3);
          this.clock.tick(10);
          assert.ok(!loaded);
          assert.ok(reloaded);
          assert.equal(source.totalCount(), 3);
        });
        QUnit.test('pageIndex in dataSource options', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            pageIndex: 1
          });
          source.load();
          assert.equal(source.pageIndex(), 1);
        });
        QUnit.test('pageIndex greater then pageCount in dataSource options', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            pageIndex: 5,
            requireTotalCount: true
          });
          source.load();
          assert.equal(source.pageIndex(), 3);
        });
        QUnit.test('pageIndex equals pageCount in dataSource options', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            pageIndex: 4,
            requireTotalCount: true
          });
          source.load();
          assert.equal(source.pageIndex(), 3);
        });
        QUnit.test('pageIndex correction before change event', function(assert) {
          var source = createDataSource({
            store: new ArrayStore(TEN_NUMBERS),
            pageSize: 3,
            pageIndex: 5,
            requireTotalCount: true
          });
          var changeCallCount = 0;
          source.changed.add(function() {
            changeCallCount++;
          });
          source.load();
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.equal(source.pageIndex(), 3);
        });
        QUnit.test('change pageIndex to greater then pageSize', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            pageIndex: 1,
            requireTotalCount: true
          });
          source.load();
          source.pageIndex(5);
          source.load();
          assert.equal(source.pageIndex(), 3);
        });
        QUnit.test('itemsCount calculation', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            requireTotalCount: true
          });
          source.load();
          assert.equal(source.itemsCount(), 3);
        });
        QUnit.test('pageCount calculation', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            requireTotalCount: true
          });
          source.load();
          assert.equal(source.pageCount(), 4);
        });
        QUnit.test('pageCount calculation after change pageSize', function(assert) {
          var source = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            requireTotalCount: true
          });
          source.load();
          source.pageSize(5);
          assert.equal(source.pageCount(), 2);
        });
        QUnit.test('isLastPage and hasKnownLastPage for first page', function(assert) {
          var source = createDataSource({
            store: new ArrayStore(TEN_NUMBERS),
            pageSize: 3,
            requireTotalCount: true
          });
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(source.hasKnownLastPage());
        });
        QUnit.test('isLastPage for first page when totalCount = -1', function(assert) {
          var source = createDataSource({
            store: new CustomStore({
              load: function() {
                return TEN_NUMBERS;
              },
              totalCount: function() {
                return -1;
              }
            }),
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            pageSize: 3,
            requireTotalCount: true
          });
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(!source.hasKnownLastPage());
        });
        QUnit.test('isLastPage and hasKnownLastPage for last page', function(assert) {
          var source = createDataSource({
            store: new ArrayStore(TEN_NUMBERS),
            pageSize: 3,
            pageIndex: 3,
            requireTotalCount: true
          });
          source.load();
          assert.ok(source.isLastPage());
          assert.ok(source.hasKnownLastPage());
        });
        QUnit.test('groupingHelper when remoteOperations is auto and ArrayStore', function(assert) {
          var dataSource = createDataSource({
            store: TEN_NUMBERS,
            remoteOperations: 'auto'
          });
          assert.ok(dataSource._grouping instanceof CollapsedGroupingHelper);
        });
        QUnit.test('groupingHelper when remoteOperations is auto and CustomStore', function(assert) {
          var dataSource = createDataSource({
            load: function() {},
            remoteOperations: 'auto'
          });
          assert.ok(dataSource._grouping instanceof CollapsedGroupingHelper);
        });
        QUnit.test('groupingHelper when remoteOperations is auto and ODataStore', function(assert) {
          var dataSource = createDataSource({
            store: {
              type: 'odata',
              url: 'test'
            },
            remoteOperations: 'auto'
          });
          assert.ok(dataSource._grouping instanceof ExpandedGroupingHelper);
        });
        QUnit.test('ODataStore customQueryParams/select when remoteOperations false', function(assert) {
          var store = new ODataStore({url: 'test'});
          var source = createDataSource({
            store: store,
            select: ['field1', 'field2'],
            customQueryParams: {test: true},
            remoteOperations: false,
            pageSize: 3,
            requireTotalCount: true
          });
          store.load = sinon.spy(function(parameters) {
            return $.Deferred().resolve(TEN_NUMBERS);
          });
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(source.hasKnownLastPage());
          assert.equal(store.load.callCount, 1);
          assert.deepEqual(store.load.firstCall.args[0].customQueryParams, {test: true});
          assert.deepEqual(store.load.firstCall.args[0].select, ['field1', 'field2']);
        });
        QUnit.test('ODataStore customQueryParams when remoteOperations true', function(assert) {
          var store = new ODataStore({url: 'test'});
          var source = createDataSource({
            store: store,
            customQueryParams: {test: true},
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            pageSize: 3,
            requireTotalCount: true
          });
          store.load = sinon.spy(function(parameters) {
            return $.Deferred().resolve([0, 1, 2], {totalCount: 3});
          });
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(source.hasKnownLastPage());
          assert.equal(store.load.callCount, 1);
          assert.deepEqual(store.load.firstCall.args[0].customQueryParams, {test: true});
          assert.strictEqual(store.load.firstCall.args[0].skip, 0);
          assert.strictEqual(store.load.firstCall.args[0].take, 3);
        });
        QUnit.test('No error when store returned non-array', function(assert) {
          var source = createDataSource({load: function() {
              return $.Deferred().resolve({});
            }});
          source.load();
          assert.ok(true, 'There are no exceptions');
        });
        QUnit.test('createOffsetFilter should generate filters with =/<> filter operations for boolean values', function(assert) {
          var booleanValues = [null, false, true];
          var descValues = [false, true];
          function checkFilter(filter) {
            if (Array.isArray(filter)) {
              if (Array.isArray(filter[0])) {
                filter.forEach(checkFilter);
              } else {
                if (filter[1] !== '=' && filter[1] !== '<>') {
                  assert.ok(false, 'filter contains incorrect filter operation \'' + filter[1] + '\'');
                }
              }
            }
          }
          descValues.forEach(function(desc) {
            booleanValues.forEach(function(value, index) {
              var filter = createOffsetFilter([value], {group: [{
                  selector: 'this',
                  desc: desc
                }]});
              checkFilter(filter);
              assert.deepEqual(dataQuery(booleanValues).filter(filter).toArray(), desc ? booleanValues.slice(index + 1) : booleanValues.slice(0, index), 'filter for value ' + value + ' and desc ' + false + ' is correct');
            });
          });
        });
        QUnit.test('Custom store with remote paging and with local filtering', function(assert) {
          var loadArgs = [];
          var source = createDataSource({
            remoteOperations: {paging: true},
            load: function(e) {
              loadArgs.push(e);
              return $.Deferred().resolve([{x: 1}, {x: 2}]);
            }
          });
          source.filter(['x', '>', 1]);
          source.load();
          assert.strictEqual(source.items().length, 1, 'items are filtered');
          assert.strictEqual(loadArgs.length, 1);
          assert.strictEqual(loadArgs[0].skip, undefined, 'skip is not exists');
          assert.strictEqual(loadArgs[0].take, undefined, 'take is not exists');
          assert.strictEqual(loadArgs[0].filter, undefined, 'filter is not exists');
          loadArgs = [];
          source.filter(null);
          source.load();
          assert.strictEqual(source.items().length, 2, 'items are not filtered');
          assert.strictEqual(loadArgs.length, 1);
          assert.strictEqual(loadArgs[0].skip, 0, 'skip is not exists');
          assert.strictEqual(loadArgs[0].take, 20, 'take is not exists');
          assert.strictEqual(loadArgs[0].filter, undefined, 'filter is not exists');
        });
        QUnit.test('Custom store with remote paging and with local sorting', function(assert) {
          var loadArgs = [];
          var source = createDataSource({
            remoteOperations: {paging: true},
            pageSize: 2,
            load: function(e) {
              loadArgs.push(e);
              if (e.take === 2) {
                return $.Deferred().resolve([{x: 1}, {x: 2}]);
              } else {
                return $.Deferred().resolve([{x: 1}, {x: 2}, {x: 3}]);
              }
            }
          });
          source.sort([{
            selector: 'x',
            desc: true
          }]);
          source.load();
          assert.strictEqual(source.items().length, 2, 'items are paged');
          assert.strictEqual(source.items()[0].x, 3, 'items are sorted');
          assert.strictEqual(loadArgs.length, 1);
          assert.strictEqual(loadArgs[0].skip, undefined, 'skip is not exists');
          assert.strictEqual(loadArgs[0].take, undefined, 'take is not exists');
          assert.strictEqual(loadArgs[0].sort, undefined, 'sort is not exists');
          loadArgs = [];
          source.sort(null);
          source.load();
          assert.strictEqual(source.items().length, 2, 'items are paged');
          assert.strictEqual(source.items()[0].x, 1, 'items are not sorted');
          assert.strictEqual(loadArgs.length, 1);
          assert.strictEqual(loadArgs[0].skip, 0, 'skip is not exists');
          assert.strictEqual(loadArgs[0].take, 2, 'take is not exists');
          assert.strictEqual(loadArgs[0].sort, undefined, 'sort is not exists');
        });
      });
      QUnit.module('DataSource when not requireTotalCount', {beforeEach: function() {
          this.dataSource = createDataSource({
            store: new ArrayStore(TEN_NUMBERS),
            pageSize: 3,
            requireTotalCount: false
          });
        }}, function() {
        QUnit.test('isLastPage and hasKnownLastPagefor first page', function(assert) {
          var source = this.dataSource;
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(!source.hasKnownLastPage());
        });
        QUnit.test('isLastPage and hasKnownLastPage for last page', function(assert) {
          var source = this.dataSource;
          source.pageIndex(3);
          source.load();
          assert.ok(source.isLastPage());
          assert.ok(source.hasKnownLastPage());
        });
        QUnit.test('isLastPage and hasKnownLastPage for first page after last page', function(assert) {
          var source = this.dataSource;
          source.pageIndex(3);
          source.load();
          source.pageIndex(0);
          source.load();
          assert.ok(!source.isLastPage());
          assert.ok(source.hasKnownLastPage());
        });
        QUnit.test('totalCount for first page', function(assert) {
          var source = this.dataSource;
          source.load();
          assert.equal(source.totalCount(), 3);
        });
        QUnit.test('totalCount for last page', function(assert) {
          var source = this.dataSource;
          source.pageIndex(3);
          source.load();
          assert.equal(source.totalCount(), 10);
        });
        QUnit.test('totalCount for page after last', function(assert) {
          var source = this.dataSource;
          source.pageIndex(5);
          source.load();
          assert.equal(source.totalCount(), 15);
        });
        QUnit.test('pageIndex greater then pages count', function(assert) {
          var source = this.dataSource;
          source.pageIndex(5);
          source.load();
          assert.equal(source.pageIndex(), 4);
        });
        QUnit.test('pageIndex equals pages count when last page has items count equals pageSize', function(assert) {
          var source = this.dataSource;
          source.pageSize(5);
          source.pageIndex(2);
          source.load();
          assert.equal(source.pageIndex(), 1);
          assert.equal(source.items().length, 5);
        });
      });
      QUnit.module('DataSource without cache', {beforeEach: function() {
          this.dataSource = createDataSource({
            store: TEN_NUMBERS,
            pageSize: 3,
            requireTotalCount: true
          });
        }}, function() {
        QUnit.test('first load', function(assert) {
          var loadedCount = 0;
          var source = this.dataSource;
          source.loadingChanged.add(function(isLoading) {
            if (!isLoading) {
              loadedCount++;
            }
          });
          source.load();
          assert.equal(loadedCount, 1);
        });
        QUnit.test('load next page', function(assert) {
          var loadedCount = 0;
          var source = this.dataSource;
          source.loadingChanged.add(function(isLoading) {
            if (!isLoading) {
              loadedCount++;
            }
          });
          source.load();
          source.pageIndex(1);
          source.load();
          assert.strictEqual(source.pageIndex(), 1);
          assert.strictEqual(loadedCount, 2);
        });
        QUnit.test('second load page', function(assert) {
          var loadedCount = 0;
          var source = this.dataSource;
          source.load();
          source.pageIndex(1);
          source.load();
          source.loadingChanged.add(function(isLoading) {
            if (!isLoading) {
              loadedCount++;
            }
          });
          source.pageIndex(0);
          source.load();
          assert.strictEqual(loadedCount, 1);
        });
        QUnit.test('integer pageIndex', function(assert) {
          var source = this.dataSource;
          source.load();
          source.pageIndex(1);
          source.load();
          assert.strictEqual(source.pageIndex(), 1);
          assert.strictEqual(source.items().length, 3);
          assert.deepEqual(source.items(), [4, 5, 6]);
        });
      });
      QUnit.module('Grouping with basic remoteOperations', {
        beforeEach: function() {
          this.array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 2,
            field2: 4,
            field3: 6
          }];
          this.createDataSource = function(options) {
            return createDataSource($.extend({
              store: this.array,
              paginate: true,
              group: 'field1',
              requireTotalCount: true,
              remoteOperations: {
                filtering: true,
                sorting: true,
                paging: true
              }
            }, options || {}));
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('grouping without paginate', function(assert) {
          var source = this.createDataSource({paginate: false});
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('collapse group with undefined value when grouping without paginate', function(assert) {
          var source = this.createDataSource({
            paginate: false,
            group: 'field0'
          });
          source.load();
          var changeRowExpandResult = source.changeRowExpand([undefined]);
          source.load();
          assert.equal(source.totalItemsCount(), 1);
          assert.deepEqual(source.items(), [{
            key: undefined,
            items: null
          }]);
          assert.ok(changeRowExpandResult && changeRowExpandResult.done);
        });
        QUnit.test('collapse group with date value when grouping without paginate', function(assert) {
          var source = this.createDataSource({
            store: [{
              field1: new Date(2012, 1, 5),
              field2: 1
            }, {
              field1: new Date(2012, 1, 5),
              field2: 2
            }, {
              field1: new Date(2012, 2, 5),
              field2: 3
            }],
            paginate: false,
            group: 'field1'
          });
          source.load();
          source.changeRowExpand([new Date(2012, 1, 5)]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: new Date(2012, 1, 5),
            items: null
          }, {
            key: new Date(2012, 2, 5),
            items: [{
              field1: new Date(2012, 2, 5),
              field2: 3
            }]
          }]);
        });
        QUnit.test('keys for items in groups', function(assert) {
          var source = this.createDataSource({
            store: new ArrayStore({
              key: 'field3',
              data: this.array
            }),
            paginate: false
          });
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with pageSize more items count', function(assert) {
          var source = this.createDataSource();
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
          assert.equal(source.itemsCount(), 4);
        });
        QUnit.test('grouping with sorting', function(assert) {
          var source = this.createDataSource({
            sort: 'field3',
            store: [{
              field1: 1,
              field2: 2,
              field3: 1
            }, {
              field1: 1,
              field2: 2,
              field3: 2
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 5
            }, {
              field1: 1,
              field2: 2,
              field3: 6
            }, {
              field1: 1,
              field2: 2,
              field3: 7
            }, {
              field1: 2,
              field2: 3,
              field3: 8
            }, {
              field1: 2,
              field2: 3,
              field3: 9
            }, {
              field1: 2,
              field2: 3,
              field3: 10
            }, {
              field1: 2,
              field2: 3,
              field3: 11
            }]
          });
          source.load();
          assert.equal(source.totalItemsCount(), 11);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 1
            }, {
              field1: 1,
              field2: 2,
              field3: 2
            }, {
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 2,
              field3: 5
            }, {
              field1: 1,
              field2: 2,
              field3: 6
            }, {
              field1: 1,
              field2: 2,
              field3: 7
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 3,
              field3: 8
            }, {
              field1: 2,
              field2: 3,
              field3: 9
            }, {
              field1: 2,
              field2: 3,
              field3: 10
            }, {
              field1: 2,
              field2: 3,
              field3: 11
            }]
          }]);
          assert.equal(source.itemsCount(), 11);
        });
        QUnit.test('grouping with pageSize less items count', function(assert) {
          var source = this.createDataSource({pageSize: 2});
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }]
          }]);
          assert.equal(source.itemsCount(), 2);
        });
        QUnit.test('grouping with pageSize less items count. Continue group parameter', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            pageIndex: 1
          });
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuation: true,
            items: [{
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
          assert.equal(source.itemsCount(), 2, 'items count with continue group');
        });
        QUnit.test('grouping with pageSize less items count. Continue group parameter when virtual scrolling', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            pageIndex: 1,
            scrolling: {
              mode: 'virtual',
              preventPreload: true
            }
          });
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuation: true,
            items: [{
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
          assert.equal(source.itemsCount(), 2, 'items count without continue group');
        });
        QUnit.test('collapse group on first page after loading second page', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            scrolling: {
              mode: 'virtual',
              preventPreload: true
            }
          });
          source.load();
          source.pageIndex(1);
          source.load();
          assert.equal(source.itemsCount(), 2);
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
          assert.equal(source.itemsCount(), 2, 'items count without continue group');
        });
        QUnit.test('changed callback fired after changeRowExpand', function(assert) {
          var source = this.createDataSource({
            pageSize: 3,
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 2,
              field2: 3,
              field3: 5
            }, {
              field1: 3,
              field2: 4,
              field3: 6
            }]
          });
          source.load();
          source.changed.add(function() {
            assert.equal(source.itemsCount(), 3);
            assert.deepEqual(source.items(), [{
              key: 1,
              items: null
            }, {
              key: 2,
              items: [{
                field1: 2,
                field2: 3,
                field3: 5
              }]
            }, {
              key: 3,
              items: [{
                field1: 3,
                field2: 4,
                field3: 6
              }]
            }]);
          });
          source.changeRowExpand([1]);
          source.load();
        });
        QUnit.test('changed callback fired after changeRowExpand when no groups', function(assert) {
          var source = this.createDataSource({
            pageSize: 3,
            group: null,
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 2,
              field2: 3,
              field3: 5
            }, {
              field1: 3,
              field2: 4,
              field3: 6
            }]
          });
          var isChanged = false;
          source.load();
          source.changed.add(function() {
            isChanged = true;
          });
          source.changeRowExpand([1]);
          source.load();
          assert.ok(isChanged, 'changed called');
        });
        QUnit.test('grouping with pageSize less items count. Continue group parameter not set when previous page ends with collapsed group', function(assert) {
          var source = this.createDataSource({
            pageSize: 3,
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 2,
              field2: 3,
              field3: 5
            }, {
              field1: 3,
              field2: 4,
              field3: 6
            }]
          });
          source.load();
          source.changeRowExpand([2]);
          source.pageIndex(1);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 3,
            items: [{
              field1: 3,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with pageSize less items count. Continue group parameter not set', function(assert) {
          var source = this.createDataSource({
            pageSize: 3,
            pageIndex: 1
          });
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with pageSize less items count. Continue on next page group parameter', function(assert) {
          var source = this.createDataSource({pageSize: 2});
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }]
          }]);
        });
        QUnit.test('grouping with pageSize less items count. Continue on next page group parameter when has collapsed item', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }, {
              field1: 2,
              field2: 4,
              field3: 6
            }, {
              field1: 2,
              field2: 4,
              field3: 7
            }]
          });
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 3);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            isContinuationOnNextPage: true,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with mapping. Use an isContinuationOnNextPage flag', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            map: function(item) {
              return item;
            }
          });
          source.load();
          assert.ok(source.items()[0].isContinuationOnNextPage);
        });
        QUnit.test('grouping with mapping. Use an isContinuation flag', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            pageIndex: 1,
            map: function(item) {
              return item;
            }
          });
          source.load();
          assert.ok(source.items()[0].isContinuation);
        });
        QUnit.test('grouping with pageSize less items count. Not Continue on next page group parameter when all items on group on current page', function(assert) {
          var source = this.createDataSource({pageSize: 3});
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }]);
        });
        QUnit.test('grouping without paginate. Collapse group', function(assert) {
          var source = this.createDataSource({paginate: false});
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
          assert.equal(source.itemsCount(), 2);
        });
        QUnit.test('grouping without paginate. Expand group after collapse', function(assert) {
          var source = this.createDataSource({paginate: false});
          source.load();
          source.changeRowExpand([1]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group', function(assert) {
          var source = this.createDataSource({});
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('expand group item if group level is collapsed', function(assert) {
          var source = this.createDataSource({group: [{
              selector: 'field1',
              isExpanded: false
            }]});
          source.load();
          source.changeRowExpand([2]);
          source.load();
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group when remote sorting and local sorting are different', function(assert) {
          var arrayStore = new ArrayStore([{
            field1: 'ES',
            field2: 1
          }, {
            field1: 'ES',
            field2: 2
          }, {
            field1: 'ES',
            field2: 3
          }, {
            field1: 'ES',
            field2: 4
          }, {
            field1: 'ES',
            field2: 5
          }, {
            field1: 'Győr',
            field2: 6
          }, {
            field1: 'Győr',
            field2: 7
          }, {
            field1: 'Győr',
            field2: 8
          }, {
            field1: 'Győr',
            field2: 9
          }, {
            field1: 'Győr',
            field2: 10
          }, {
            field1: 'Göd',
            field2: 11
          }, {
            field1: 'Göd',
            field2: 12
          }, {
            field1: 'Göd',
            field2: 13
          }, {
            field1: 'Göd',
            field2: 14
          }, {
            field1: 'Göd',
            field2: 15
          }]);
          var source = this.createDataSource({
            pageSize: 4,
            store: new CustomStore({load: function(options) {
                var d = $.Deferred();
                if (options.sort) {
                  options.sort[0].selector = function(data) {
                    return $.inArray(data.field1, ['ES', 'Göd', 'Győr']);
                  };
                }
                $.when(arrayStore.load(options), arrayStore.totalCount(options)).done(function(items, totalCount) {
                  d.resolve(items, {totalCount: totalCount});
                });
                return d;
              }})
          });
          source.load();
          source.changeRowExpand(['ES']);
          source.load();
          source.changeRowExpand(['Göd']);
          source.load();
          assert.deepEqual(source.items(), [{
            key: 'ES',
            items: null
          }, {
            key: 'Göd',
            items: null
          }, {
            key: 'Győr',
            isContinuationOnNextPage: true,
            items: [{
              field1: 'Győr',
              field2: 6
            }, {
              field1: 'Győr',
              field2: 7
            }]
          }]);
          source.changeRowExpand(['Győr']);
          source.load();
          assert.deepEqual(source.items(), [{
            key: 'ES',
            items: null
          }, {
            key: 'Göd',
            items: null
          }, {
            key: 'Győr',
            items: null
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group when CustomStore used', function(assert) {
          var arrayStore = new ArrayStore(this.array);
          var source = this.createDataSource({store: new CustomStore({load: function(options) {
                var d = $.Deferred();
                $.when(arrayStore.load(options), arrayStore.totalCount(options)).done(function(items, totalCount) {
                  d.resolve(items, {totalCount: totalCount});
                });
                return d;
              }})});
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group and paging when ODataStore used', function(assert) {
          var arrayStore = new ArrayStore(this.array);
          var source = this.createDataSource({
            pageSize: 2,
            group: 'field2',
            store: new CustomStore({load: function(options) {
                var d = $.Deferred();
                $.when(arrayStore.load(options), arrayStore.totalCount(options)).done(function(items, totalCount) {
                  d.resolve(items, {totalCount: totalCount});
                });
                return d;
              }})
          });
          source.load();
          source.changeRowExpand([2]);
          source.load();
          source.pageIndex(1);
          source.load();
          assert.equal(source.pageIndex(), 1);
          assert.equal(source.totalItemsCount(), 3);
          assert.deepEqual(source.items(), [{
            key: 4,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group when dataSource has filter', function(assert) {
          var source = this.createDataSource({
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }, {
              field1: 2,
              field2: 4,
              field3: 6
            }, {
              field1: 2,
              field2: 4,
              field3: 7
            }],
            filter: ['field3', '>', 4]
          });
          source.load();
          source.changeRowExpand([2]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: null
          }]);
        });
        QUnit.test('grouping with paginate. Collapse group when dataSource has filter 2', function(assert) {
          var source = this.createDataSource({
            store: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }, {
              field1: 2,
              field2: 4,
              field3: 6
            }, {
              field1: 2,
              field2: 4,
              field3: 7
            }],
            filter: ['field3', '>', 4]
          });
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 3);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }, {
              field1: 2,
              field2: 4,
              field3: 7
            }]
          }]);
          assert.equal(source.itemsCount(), 3);
        });
        QUnit.test('grouping with paginate. Expand group after collapse', function(assert) {
          var source = this.createDataSource({});
          source.load();
          source.changeRowExpand([1]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }, {
              field1: 1,
              field2: 3,
              field3: 5
            }]
          }, {
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }]);
        });
        QUnit.test('grouping with paginate. Update group offsets after expand by correct page offset', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 2,
            field2: 4,
            field3: 6
          }, {
            field1: 2,
            field2: 5,
            field3: 7
          }, {
            field1: 3,
            field2: 6,
            field3: 8
          }];
          var source = this.createDataSource({
            store: array,
            pageSize: 3
          });
          source.load();
          source.changeRowExpand([1]);
          source.load();
          source.changeRowExpand([2]);
          source.load();
          source.changeRowExpand([3]);
          source.load();
          source.changeRowExpand([2]);
          source.load();
          source.pageIndex(1);
          source.load();
          source.changeRowExpand([3]);
          source.load();
          assert.deepEqual(source.getGroupsInfo(), [{
            key: 1,
            children: [],
            offset: 0,
            data: {
              count: 3,
              offset: 0,
              path: [1],
              isExpanded: false
            }
          }, {
            key: 2,
            children: [],
            offset: 3,
            data: {
              count: 2,
              offset: 3,
              path: [2],
              isExpanded: true
            }
          }, {
            key: 3,
            children: [],
            offset: 5,
            data: {
              count: 1,
              offset: 5,
              path: [3],
              isExpanded: true
            }
          }]);
          assert.equal(source.items().length, 1);
          assert.deepEqual(source.items(), [{
            key: 3,
            items: [{
              field1: 3,
              field2: 6,
              field3: 8
            }]
          }]);
        });
        QUnit.test('sort group on add groupsInfo', function(assert) {
          var source = this.createDataSource({
            store: [],
            pageSize: 3
          });
          source.load();
          source._grouping.addGroupInfo({
            offset: 3,
            path: '1'
          });
          source._grouping.addGroupInfo({
            offset: 2,
            path: '2'
          });
          source._grouping.addGroupInfo({
            offset: 0,
            path: '3'
          });
          source._grouping.addGroupInfo({
            offset: 7,
            path: '4'
          });
          var offsets = $.map(source.getGroupsInfo(), function(g) {
            return g.offset;
          });
          assert.deepEqual(offsets, [0, 2, 3, 7]);
        });
        QUnit.test('grouping with paginate. Update group offsets after expand by correct page offset 2', function(assert) {
          var array = [{
            field1: 1,
            field2: 1,
            field3: 1
          }, {
            field1: 1,
            field2: 2,
            field3: 2
          }, {
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 2,
            field3: 5
          }, {
            field1: 1,
            field2: 2,
            field3: 6
          }, {
            field1: 1,
            field2: 2,
            field3: 7
          }, {
            field1: 1,
            field2: 2,
            field3: 8
          }, {
            field1: 1,
            field2: 2,
            field3: 9
          }, {
            field1: 1,
            field2: 2,
            field3: 10
          }, {
            field1: 1,
            field2: 2,
            field3: 11
          }, {
            field1: 1,
            field2: 2,
            field3: 12
          }, {
            field1: 1,
            field2: 2,
            field3: 13
          }, {
            field1: 1,
            field2: 2,
            field3: 14
          }, {
            field1: 1,
            field2: 2,
            field3: 15
          }, {
            field1: 1,
            field2: 2,
            field3: 16
          }, {
            field1: 1,
            field2: 2,
            field3: 17
          }, {
            field1: 1,
            field2: 2,
            field3: 18
          }, {
            field1: 1,
            field2: 2,
            field3: 19
          }, {
            field1: 1,
            field2: 2,
            field3: 20
          }, {
            field1: 1,
            field2: 2,
            field3: 21
          }, {
            field1: 1,
            field2: 2,
            field3: 22
          }, {
            field1: 1,
            field2: 2,
            field3: 23
          }, {
            field1: 1,
            field2: 2,
            field3: 24
          }, {
            field1: 1,
            field2: 2,
            field3: 25
          }, {
            field1: 1,
            field2: 2,
            field3: 26
          }, {
            field1: 1,
            field2: 2,
            field3: 27
          }, {
            field1: 1,
            field2: 2,
            field3: 28
          }, {
            field1: 1,
            field2: 2,
            field3: 29
          }, {
            field1: 1,
            field2: 2,
            field3: 30
          }, {
            field1: 1,
            field2: 2,
            field3: 31
          }, {
            field1: 1,
            field2: 2,
            field3: 32
          }, {
            field1: 1,
            field2: 2,
            field3: 33
          }, {
            field1: 1,
            field2: 2,
            field3: 34
          }, {
            field1: 1,
            field2: 2,
            field3: 35
          }, {
            field1: 1,
            field2: 2,
            field3: 36
          }, {
            field1: 1,
            field2: 2,
            field3: 37
          }, {
            field1: 1,
            field2: 2,
            field3: 38
          }, {
            field1: 1,
            field2: 2,
            field3: 39
          }, {
            field1: 1,
            field2: 2,
            field3: 40
          }, {
            field1: 1,
            field2: 2,
            field3: 41
          }, {
            field1: 1,
            field2: 2,
            field3: 42
          }, {
            field1: 1,
            field2: 2,
            field3: 43
          }, {
            field1: 1,
            field2: 2,
            field3: 44
          }, {
            field1: 1,
            field2: 2,
            field3: 45
          }, {
            field1: 1,
            field2: 2,
            field3: 46
          }, {
            field1: 1,
            field2: 2,
            field3: 47
          }, {
            field1: 1,
            field2: 2,
            field3: 48
          }, {
            field1: 1,
            field2: 2,
            field3: 49
          }, {
            field1: 1,
            field2: 2,
            field3: 50
          }, {
            field1: 1,
            field2: 2,
            field3: 51
          }, {
            field1: 1,
            field2: 2,
            field3: 52
          }, {
            field1: 1,
            field2: 2,
            field3: 53
          }, {
            field1: 1,
            field2: 2,
            field3: 54
          }, {
            field1: 1,
            field2: 2,
            field3: 55
          }, {
            field1: 1,
            field2: 2,
            field3: 56
          }, {
            field1: 1,
            field2: 3,
            field3: 57
          }, {
            field1: 1,
            field2: 3,
            field3: 58
          }, {
            field1: 1,
            field2: 3,
            field3: 59
          }, {
            field1: 1,
            field2: 3,
            field3: 60
          }, {
            field1: 1,
            field2: 3,
            field3: 61
          }, {
            field1: 1,
            field2: 3,
            field3: 62
          }, {
            field1: 1,
            field2: 3,
            field3: 63
          }, {
            field1: 1,
            field2: 3,
            field3: 64
          }, {
            field1: 1,
            field2: 3,
            field3: 65
          }, {
            field1: 1,
            field2: 3,
            field3: 66
          }, {
            field1: 1,
            field2: 3,
            field3: 67
          }, {
            field1: 1,
            field2: 3,
            field3: 68
          }, {
            field1: 1,
            field2: 3,
            field3: 69
          }, {
            field1: 1,
            field2: 3,
            field3: 70
          }, {
            field1: 1,
            field2: 3,
            field3: 71
          }, {
            field1: 1,
            field2: 3,
            field3: 72
          }, {
            field1: 1,
            field2: 3,
            field3: 73
          }, {
            field1: 1,
            field2: 3,
            field3: 74
          }, {
            field1: 1,
            field2: 3,
            field3: 75
          }, {
            field1: 1,
            field2: 4,
            field3: 76
          }, {
            field1: 1,
            field2: 4,
            field3: 77
          }, {
            field1: 1,
            field2: 4,
            field3: 78
          }, {
            field1: 1,
            field2: 4,
            field3: 79
          }, {
            field1: 1,
            field2: 4,
            field3: 80
          }, {
            field1: 1,
            field2: 4,
            field3: 81
          }, {
            field1: 1,
            field2: 4,
            field3: 82
          }, {
            field1: 1,
            field2: 4,
            field3: 83
          }, {
            field1: 1,
            field2: 4,
            field3: 84
          }, {
            field1: 1,
            field2: 4,
            field3: 85
          }, {
            field1: 1,
            field2: 4,
            field3: 86
          }, {
            field1: 1,
            field2: 4,
            field3: 87
          }, {
            field1: 1,
            field2: 4,
            field3: 88
          }, {
            field1: 1,
            field2: 4,
            field3: 89
          }, {
            field1: 1,
            field2: 4,
            field3: 90
          }, {
            field1: 1,
            field2: 4,
            field3: 91
          }, {
            field1: 1,
            field2: 4,
            field3: 92
          }, {
            field1: 1,
            field2: 4,
            field3: 93
          }, {
            field1: 1,
            field2: 4,
            field3: 94
          }, {
            field1: 2,
            field2: 1,
            field3: 95
          }, {
            field1: 2,
            field2: 1,
            field3: 96
          }];
          var source = this.createDataSource({
            store: array,
            group: ['field1', 'field2'],
            pageSize: 20,
            scrolling: {
              mode: 'virtual',
              preventPreload: true
            }
          });
          source.load();
          source.pageIndex(1);
          source.load();
          source.pageIndex(2);
          source.load();
          source.pageIndex(3);
          source.load();
          source.changeRowExpand([1, 4]);
          source.load();
          assert.deepEqual(source.getGroupsInfo(), [{
            key: 1,
            offset: 75,
            children: [{
              key: 4,
              children: [],
              offset: 75,
              data: {
                count: 19,
                offset: 75,
                path: [1, 4],
                isExpanded: false
              }
            }],
            data: {
              isExpanded: true,
              offset: 75,
              path: [1]
            }
          }]);
          assert.equal(source.items().length, 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuation: true,
            items: [{
              key: 3,
              isContinuation: true,
              items: array.slice(60, 75)
            }, {
              key: 4,
              items: null
            }]
          }, {
            key: 2,
            items: [{
              key: 1,
              items: array.slice(94, 96)
            }]
          }]);
        });
        QUnit.test('hide collapsed group when after filtering group has no elements', function(assert) {
          var arrayStore = new ArrayStore(this.array);
          var source = this.createDataSource({
            store: new CustomStore({
              load: function(options) {
                var d = $.Deferred();
                setTimeout(function() {
                  arrayStore.load(options).done(d.resolve).fail(d.reject);
                });
                return d;
              },
              totalCount: function(options) {
                var d = $.Deferred();
                setTimeout(function() {
                  arrayStore.totalCount(options).done(d.resolve).fail(d.reject);
                });
                return d;
              }
            }),
            pageSize: 2
          });
          source.load();
          this.clock.tick(10);
          source.changeRowExpand([1]);
          source.load();
          this.clock.tick(10);
          source.filter(['field2', '>', 3]);
          source.reload();
          this.clock.tick(10);
          assert.equal(source.totalItemsCount(), 1, 'total items count');
          assert.deepEqual(source.items(), [{
            key: 2,
            items: [{
              field1: 2,
              field2: 4,
              field3: 6
            }]
          }], 'items');
          assert.equal(source.itemsCount(), 1, 'visible items count');
        });
        QUnit.test('collapseAll when no grouped columns', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            group: null
          });
          source.load();
          source.collapseAll();
          source.load();
          assert.equal(source.pageCount(), 2, 'pageCount');
          assert.deepEqual(source.items(), [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }], 'items');
        });
        QUnit.test('expandAll when no grouped columns', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            group: null
          });
          source.load();
          source.expandAll();
          source.load();
          assert.equal(source.pageCount(), 2, 'pageCount');
          assert.deepEqual(source.items(), [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }], 'items');
        });
        QUnit.test('loadTotalCount for CustomStore when totalCount in extra', function(assert) {
          var lastLoadOptions;
          var store = new CustomStore({load: function(options) {
              lastLoadOptions = options;
              var d = $.Deferred();
              d.resolve([], {totalCount: 10});
              return d;
            }});
          if (store._customLoadOptions) {
            store._customLoadOptions = function() {
              return ['param1'];
            };
          }
          var dataSource = createDataSource({
            store: store,
            paginate: true,
            param1: 1,
            param2: 2,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }
          });
          var totalCount;
          loadTotalCount(dataSource, {filter: ['this', '>=', 5]}).done(function(e) {
            totalCount = e;
          });
          assert.deepEqual(lastLoadOptions, {
            skip: 0,
            take: 1,
            requireTotalCount: true,
            filter: ['this', '>=', 5],
            param1: 1
          });
          assert.strictEqual(totalCount, 10);
        });
        QUnit.test('loadTotalCount for CustomStore when no totalCount in extra', function(assert) {
          var lastLoadOptions;
          var lastTotalCountOptions;
          var store = new CustomStore({
            load: function(options) {
              lastLoadOptions = options;
              return [];
            },
            totalCount: function(options) {
              lastTotalCountOptions = options;
              return 10;
            }
          });
          var dataSource = createDataSource({
            store: store,
            paginate: true,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }
          });
          var totalCount;
          loadTotalCount(dataSource, {filter: ['this', '>=', 5]}).done(function(e) {
            totalCount = e;
          });
          assert.deepEqual(lastLoadOptions, {
            skip: 0,
            take: 1,
            requireTotalCount: true,
            filter: ['this', '>=', 5]
          });
          assert.deepEqual(lastTotalCountOptions, {
            skip: 0,
            take: 1,
            requireTotalCount: true,
            filter: ['this', '>=', 5]
          });
          assert.strictEqual(totalCount, 10);
        });
        QUnit.test('Ungrouping with custom store - there are no exceptions when remote paging', function(assert) {
          var that = this;
          var dataSource = createDataSource({
            load: function() {
              return $.Deferred().resolve({
                data: that.array,
                totalCount: that.array.length
              });
            },
            paginate: true,
            requireTotalCount: true,
            remoteOperations: {paging: true}
          });
          dataSource.group('field1');
          dataSource.load();
          try {
            dataSource.group(null);
            dataSource.load();
            assert.ok(true, 'There are no exceptions');
          } catch (error) {
            assert.ok(false, 'exception was threw:' + error);
          }
        });
      });
      QUnit.module('Grouping with basic remoteOperations. Second level', {
        beforeEach: function() {
          this.array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 1,
            field2: 3,
            field3: 6
          }, {
            field1: 2,
            field2: 4,
            field3: 7
          }];
          this.createDataSource = function(options) {
            return createDataSource($.extend({
              store: this.array,
              paginate: true,
              group: ['field1', 'field2'],
              requireTotalCount: true,
              remoteOperations: {
                filtering: true,
                sorting: true,
                paging: true
              }
            }, options || {}));
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('grouping with paginate', function(assert) {
          var source = this.createDataSource({pageSize: 3});
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              isContinuationOnNextPage: true,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }]
            }]
          }]);
        });
        QUnit.test('grouping with paginate and totalCount from extra', function(assert) {
          var array = this.array;
          var source = this.createDataSource({
            load: function() {
              return $.Deferred().resolve(array, {totalCount: array.length}).promise();
            },
            pageSize: 3
          });
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              isContinuationOnNextPage: true,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }]
            }]
          }]);
        });
        QUnit.test('grouping without paginate', function(assert) {
          var source = this.createDataSource({paginate: false});
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }, {
                field1: 1,
                field2: 3,
                field3: 6
              }]
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('change group order when remote data', function(assert) {
          var arrayStore = new ArrayStore([{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 2,
            field3: 5
          }, {
            field1: 1,
            field2: 2,
            field3: 6
          }, {
            field1: 1,
            field2: 3,
            field3: 7
          }, {
            field1: 1,
            field2: 3,
            field3: 8
          }, {
            field1: 1,
            field2: 3,
            field3: 9
          }, {
            field1: 2,
            field2: 4,
            field3: 10
          }]);
          var source = this.createDataSource({
            pageSize: 3,
            store: new CustomStore({
              load: function(options) {
                var d = $.Deferred();
                setTimeout(function() {
                  arrayStore.load(options).done(function(data) {
                    d.resolve(data);
                  });
                });
                return d;
              },
              totalCount: function(options) {
                var d = $.Deferred();
                setTimeout(function() {
                  arrayStore.totalCount(options).done(function(totalCount) {
                    d.resolve(totalCount);
                  });
                });
                return d;
              }
            })
          });
          source.load();
          this.clock.tick(10);
          source.changeRowExpand([1, 2]);
          this.clock.tick(10);
          source.load();
          this.clock.tick(10);
          source.changeRowExpand([1, 3]);
          this.clock.tick(10);
          source.load();
          this.clock.tick(10);
          source.group(['field1', {
            selector: 'field2',
            desc: true
          }]);
          source.reload();
          this.clock.tick(10);
          assert.equal(source.totalItemsCount(), 3);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 3,
              items: null
            }, {
              key: 2,
              items: null
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 10
              }]
            }]
          }]);
          assert.equal(source.itemsCount(), 3);
        });
        QUnit.test('Continue group parameter for first group level only', function(assert) {
          var source = this.createDataSource({
            pageSize: 2,
            pageIndex: 1
          });
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuation: true,
            items: [{
              key: 3,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }, {
                field1: 1,
                field2: 3,
                field3: 6
              }]
            }]
          }]);
        });
        QUnit.test('Continue group parameter for both group levels', function(assert) {
          var source = this.createDataSource({
            pageSize: 3,
            pageIndex: 1
          });
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuation: true,
            items: [{
              key: 3,
              isContinuation: true,
              items: [{
                field1: 1,
                field2: 3,
                field3: 6
              }]
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('Continue on next page group parameter for first group level only', function(assert) {
          var source = this.createDataSource({pageSize: 2});
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }]
          }]);
        });
        QUnit.test('Continue on next page group parameter for both group levels', function(assert) {
          var source = this.createDataSource({pageSize: 3});
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              isContinuationOnNextPage: true,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }]
            }]
          }]);
        });
        QUnit.test('Collapse second level group', function(assert) {
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 3]);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              items: null
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('Collapse second level group and first level group', function(assert) {
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 3]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('Collapse second level group and first level group when scrolling mode is virtual', function(assert) {
          this.array = [{
            field1: 1,
            field2: 1,
            field3: 1
          }, {
            field1: 1,
            field2: 2,
            field3: 2
          }, {
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 2,
            field3: 5
          }, {
            field1: 1,
            field2: 2,
            field3: 6
          }, {
            field1: 2,
            field2: 1,
            field3: 7
          }];
          var source = this.createDataSource({
            pageSize: 5,
            scrolling: {
              mode: 'virtual',
              preventPreload: true
            }
          });
          source.viewportSize(5);
          source.load();
          source.changeRowExpand([1, 1]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 2);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              key: 1,
              items: [{
                field1: 2,
                field2: 1,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('Collapse several second level groups', function(assert) {
          this.array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 1,
            field2: 3,
            field3: 6
          }, {
            field1: 2,
            field2: 4,
            field3: 7
          }, {
            field1: 2,
            field2: 4,
            field3: 8
          }, {
            field1: 2,
            field2: 5,
            field3: 9
          }, {
            field1: 2,
            field2: 5,
            field3: 10
          }];
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.changeRowExpand([1, 3]);
          source.load();
          source.changeRowExpand([2, 4]);
          source.load();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: null
            }]
          }, {
            key: 2,
            isContinuationOnNextPage: true,
            items: [{
              key: 4,
              items: null
            }, {
              key: 5,
              isContinuationOnNextPage: true,
              items: [this.array[6]]
            }]
          }]);
        });
        QUnit.test('Collapse state of items restore after expand', function(assert) {
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 3]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          source.changeRowExpand([1]);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }]
            }, {
              key: 3,
              items: null
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }]);
        });
        QUnit.test('change sortOrder of group', function(assert) {
          var loadingChangedCount = 0;
          this.array.push({
            field1: 3,
            field2: 5,
            field3: 8
          });
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.group([{
            selector: 'field1',
            desc: true
          }, 'field2']);
          source.loadingChanged.add(function() {
            loadingChangedCount++;
          });
          source.reload();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 3,
            items: [{
              key: 5,
              items: [{
                field1: 3,
                field2: 5,
                field3: 8
              }]
            }]
          }, {
            key: 2,
            items: [{
              key: 4,
              items: [{
                field1: 2,
                field2: 4,
                field3: 7
              }]
            }]
          }, {
            key: 1,
            isContinuationOnNextPage: true,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              isContinuationOnNextPage: true,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }]
            }]
          }]);
          assert.equal(loadingChangedCount, 2, 'first - update collapsed group info, second - load data');
          assert.ok(!source.isLoading(), 'load completed');
        });
        QUnit.test('reset groups info when change group fields', function(assert) {
          this.array.push({
            field1: 3,
            field2: 5,
            field3: 8
          });
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.group(['field3', 'field2']);
          source.reload();
          assert.deepEqual(source.getGroupsInfo(), []);
        });
        QUnit.test('reset groups info when clear group fields', function(assert) {
          this.array.push({
            field1: 3,
            field2: 5,
            field3: 8
          });
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.group(null);
          source.reload();
          assert.deepEqual(source.getGroupsInfo(), []);
        });
        QUnit.test('clear second level groups info when change second level group field', function(assert) {
          this.array.push({
            field1: 3,
            field2: 5,
            field3: 8
          });
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.group(['field1', 'field3']);
          source.reload();
          assert.deepEqual(source.getGroupsInfo(), [{
            children: [],
            key: 1,
            offset: 0,
            data: {
              isExpanded: true,
              offset: 0,
              path: [1]
            }
          }]);
        });
        QUnit.test('clear second level groups info when change change groups count to one', function(assert) {
          this.array.push({
            field1: 3,
            field2: 5,
            field3: 8
          });
          var source = this.createDataSource({pageSize: 4});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.group('field1');
          source.reload();
          assert.deepEqual(source.getGroupsInfo(), [{
            children: [],
            key: 1,
            offset: 0,
            data: {
              isExpanded: true,
              offset: 0,
              path: [1]
            }
          }]);
        });
        QUnit.test('Update group offset for expanded grouped row of the first level when change sortOrder of the first level group field', function(assert) {
          this.array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 2,
            field2: 4,
            field3: 6
          }, {
            field1: 3,
            field2: 5,
            field3: 7
          }, {
            field1: 4,
            field2: 6,
            field3: 8
          }, {
            field1: 4,
            field2: 6,
            field3: 9
          }, {
            field1: 4,
            field2: 6,
            field3: 10
          }, {
            field1: 4,
            field2: 6,
            field3: 11
          }];
          var source = this.createDataSource({pageSize: 5});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          source.changeRowExpand([1, 3]);
          source.load();
          source.changeRowExpand([2]);
          source.load();
          source.changeRowExpand([3]);
          source.load();
          source.changeRowExpand([4]);
          source.load();
          source.group([{
            selector: 'field1',
            desc: true,
            isExpanded: true
          }, {
            selector: 'field2',
            isExpanded: true
          }]);
          source.reload();
          assert.equal(source.totalItemsCount(), 5);
          assert.deepEqual(source.items(), [{
            key: 4,
            items: null
          }, {
            key: 3,
            items: null
          }, {
            key: 2,
            items: null
          }, {
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: null
            }]
          }]);
        });
        QUnit.test('change filter after collapse second level group', function(assert) {
          var source = this.createDataSource({pageSize: 3});
          source.load();
          source.changeRowExpand([1, 2]);
          source.load();
          var loadArgs = [];
          source.store().on('loading', function(e) {
            loadArgs.push(e);
          });
          source.filter(['field1', '>=', 1]);
          source.load();
          assert.equal(source.totalItemsCount(), 4);
          assert.deepEqual(source.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: [{
                field1: 1,
                field2: 3,
                field3: 5
              }, {
                field1: 1,
                field2: 3,
                field3: 6
              }]
            }]
          }]);
          assert.equal(loadArgs.length, 3);
          assert.deepEqual(loadArgs[0].filter, [['field1', '=', 1], 'and', ['field2', '=', 2], 'and', ['field1', '>=', 1]]);
          assert.deepEqual(loadArgs[1].filter, [[[['field1', '<', 1], 'or', ['field1', '=', null]], 'or', [['field1', '=', 1], 'and', [['field2', '<', 2], 'or', ['field2', '=', null]]]], 'and', ['field1', '>=', 1]]);
          assert.deepEqual(loadArgs[2].filter, [[['field1', '<>', 1], 'or', [['field1', '=', 1], 'and', ['field2', '<>', 2]]], 'and', ['field1', '>=', 1]]);
        });
      });
      QUnit.module('Remote group paging', {
        beforeEach: function() {
          this.array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 1,
            field2: 2,
            field3: 4
          }, {
            field1: 1,
            field2: 3,
            field3: 5
          }, {
            field1: 2,
            field2: 4,
            field3: 6
          }, {
            field1: 2,
            field2: 4,
            field3: 7
          }, {
            field1: 1,
            field2: 5,
            field3: 7
          }];
          this.clock = sinon.useFakeTimers();
          var remoteGroupPaging = true;
          this.createDataSource = function(options, brokeOptions) {
            return createDataSourceWithRemoteGrouping($.extend({
              store: this.array,
              paginate: true,
              requireTotalCount: true,
              requireGroupCount: true
            }, options || {}), remoteGroupPaging, brokeOptions);
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Load collapsed group', function(assert) {
          var dataSource = this.createDataSource({
            group: 'field2',
            pageSize: 2
          });
          var loadingChanged = sinon.stub();
          dataSource.store().on('loading', loadingChanged);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          assert.equal(dataSource.totalItemsCount(), 4, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 1);
          assert.strictEqual(loadingChanged.lastCall.args[0].requireTotalCount, true);
          assert.strictEqual(loadingChanged.lastCall.args[0].requireGroupCount, true);
          assert.strictEqual(loadingChanged.lastCall.args[0].skip, 0);
          assert.strictEqual(loadingChanged.lastCall.args[0].take, 2);
        });
        QUnit.test('Load collapsed group and expand first item', function(assert) {
          var dataSource = this.createDataSource({
            group: 'field2',
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.changeRowExpand([2]);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: [{
              'field1': 1,
              'field2': 2,
              'field3': 3
            }, {
              'field1': 1,
              'field2': 2,
              'field3': 4
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 6, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 2, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field2'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, null, 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, ['field2', '=', 2], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count is passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireGroupCount, false, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, undefined, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, 2, 'take for second level');
        });
        QUnit.test('Load collapsed group and expand group item that contain items with white space at the end', function(assert) {
          var loadStub = sinon.stub();
          var dataSource = this.createDataSource({
            load: loadStub,
            group: 'name',
            pageSize: 3
          });
          loadStub.onCall(0).returns($.Deferred().resolve({
            data: [{
              key: 'test1',
              items: null,
              count: 3
            }, {
              key: 'test2',
              items: null,
              count: 3
            }, {
              key: 'test3',
              items: null,
              count: 3
            }],
            totalCount: 9,
            groupCount: 3
          }));
          loadStub.onCall(1).returns($.Deferred().resolve({
            data: [{
              key: 'test1',
              items: null,
              count: 3
            }],
            totalCount: 9,
            groupCount: 3
          }));
          loadStub.onCall(2).returns($.Deferred().resolve({data: [{
              name: 'test1',
              id: 1
            }, {
              name: 'test1 ',
              id: 2
            }]}));
          dataSource.load();
          dataSource.changeRowExpand(['test1']);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 'test1',
            isContinuationOnNextPage: true,
            items: [{
              name: 'test1',
              id: 1
            }, {
              name: 'test1 ',
              id: 2
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 7, 'total items count');
          assert.strictEqual(loadStub.callCount, 3, 'loading count');
          assert.deepEqual(loadStub.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'name'
          }], 'load 0 group');
          assert.deepEqual(loadStub.getCall(1).args[0].group, [{
            'desc': false,
            'selector': 'name'
          }], 'load 1 group');
          assert.deepEqual(loadStub.getCall(2).args[0].group, null, 'load 2 group');
          assert.deepEqual(loadStub.getCall(2).args[0].filter, ['name', '=', 'test1'], 'load 2 filter');
          assert.strictEqual(loadStub.getCall(2).args[0].skip, undefined, 'load 2 skip');
          assert.strictEqual(loadStub.getCall(2).args[0].take, 2, 'load 2 skip');
        });
        QUnit.test('Expand group if group key is object', function(assert) {
          var dataSource = this.createDataSource({
            load: function() {
              return $.Deferred().resolve({
                data: [{
                  key: {
                    groupId: 1,
                    groupName: 'test 1'
                  },
                  items: [{id: 1}]
                }, {
                  key: {
                    groupId: 2,
                    groupName: 'test 2'
                  },
                  items: [{id: 2}]
                }],
                totalCount: 2,
                groupCount: 2
              });
            },
            group: 'group'
          });
          dataSource.load();
          dataSource.changeRowExpand([{
            groupId: 1,
            groupName: 'test 1'
          }]);
          dataSource.load();
          assert.equal(dataSource.totalItemsCount(), 3, 'total items count');
          assert.deepEqual(dataSource.items(), [{
            key: {
              groupId: 1,
              groupName: 'test 1'
            },
            items: [{id: 1}]
          }, {
            key: {
              groupId: 2,
              groupName: 'test 2'
            },
            items: null
          }], 'items');
        });
        QUnit.test('Load collapsed group and expand first item when native promise is used', function(assert) {
          var dataSource = this.createDataSource({
            group: 'field2',
            pageSize: 3
          }, {useNativePromise: true});
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.changeRowExpand([2]);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: [{
              'field1': 1,
              'field2': 2,
              'field3': 3
            }, {
              'field1': 1,
              'field2': 2,
              'field3': 4
            }]
          }], 'items');
        });
        QUnit.test('Send count query on row expand when next level is group', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field2', 'field1'],
            pageSize: 2
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.changeRowExpand([2]);
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          assert.equal(dataSource.totalItemsCount(), 4, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 1, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, false, 'require total count is not passed on loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is not passed on loading');
          assert.deepEqual(loadingChanged.getCall(0).args[0].filter, ['field2', '=', 2], 'filter');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take');
        });
        QUnit.test('Send count query on row expand when next level is group if group by 3 levels', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field2', 'field1', 'field3'],
            pageSize: 2
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.changeRowExpand([2]);
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          assert.equal(dataSource.totalItemsCount(), 4, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 1, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, false, 'require total count is not passed on loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is not passed on loading');
          assert.deepEqual(loadingChanged.getCall(0).args[0].filter, ['field2', '=', 2], 'filter');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take');
        });
        QUnit.test('Send count query on row expand when next level is group if use native promises', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field2', 'field1'],
            pageSize: 2
          }, {useNativePromise: true});
          var loaded = sinon.stub();
          dataSource.load();
          dataSource.store().on('loaded', loaded);
          dataSource.changeRowExpand([2]);
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          assert.equal(dataSource.totalItemsCount(), 4, 'total items count');
          assert.strictEqual(loaded.callCount, 1, 'loading count');
          assert.deepEqual(loaded.getCall(0).args[0], {
            data: [{
              key: 1,
              items: null,
              count: 2
            }],
            groupCount: 1,
            totalCount: undefined
          }, 'loaded data');
          assert.deepEqual(loaded.getCall(0).args[1].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group');
          assert.strictEqual(loaded.getCall(0).args[1].requireTotalCount, false, 'require total count is not passed on loading');
          assert.strictEqual(loaded.getCall(0).args[1].requireGroupCount, true, 'require group count is not passed on loading');
          assert.deepEqual(loaded.getCall(0).args[1].filter, ['field2', '=', 2], 'filter');
          assert.strictEqual(loaded.getCall(0).args[1].skip, 0, 'skip');
          assert.strictEqual(loaded.getCall(0).args[1].take, 1, 'take');
        });
        QUnit.test('Load collapsed groups and expand first item when two groups', function(assert) {
          var dataSource = this.createDataSource({
            executeAsync: function(func, loadOptions) {
              setTimeout(func, 10);
            },
            group: ['field1', 'field2'],
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.summary({
            groupAggregates: [{summaryType: 'count'}],
            totalAggregates: [{summaryType: 'count'}]
          });
          dataSource.load();
          this.clock.tick(10);
          dataSource.changeRowExpand([1]);
          this.clock.tick(10);
          dataSource.store().on('loading', loadingChanged);
          dataSource.load();
          this.clock.tick(10);
          this.clock.tick(10);
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: null
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 6, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 2, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(0).args[0].groupSummary, [{summaryType: 'count'}], 'groupSummary for first loading');
          assert.deepEqual(loadingChanged.getCall(0).args[0].totalSummary, [{summaryType: 'count'}], 'totalSummary for first loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, [{
            'desc': false,
            'selector': 'field2'
          }], 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, ['field1', '=', 1], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireGroupCount, true, 'require group count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, 0, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, 2, 'take for second level');
          assert.deepEqual(loadingChanged.getCall(1).args[0].groupSummary, [{summaryType: 'count'}], 'groupSummary for second loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].totalSummary, undefined, 'no totalSummary for second loading');
        });
        QUnit.test('Load collapsed groups, expand second big item and go to third page when two groups', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 2,
            field2: 3,
            field3: 4
          }, {
            field1: 2,
            field2: 4,
            field3: 5
          }, {
            field1: 2,
            field2: 5,
            field3: 6
          }, {
            field1: 2,
            field2: 6,
            field3: 7
          }, {
            field1: 2,
            field2: 7,
            field3: 8
          }, {
            field1: 2,
            field2: 8,
            field3: 9
          }, {
            field1: 3,
            field2: 9,
            field3: 10
          }];
          var dataSource = this.createDataSource({
            store: array,
            group: ['field1', 'field2'],
            pageSize: 3
          });
          dataSource.load();
          dataSource.changeRowExpand([2]);
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          dataSource.pageIndex(2);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuation: true,
            isContinuationOnNextPage: true,
            key: 2,
            items: [{
              key: 6,
              items: null
            }, {
              key: 7,
              items: null
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 12, 'total items count');
        });
        QUnit.test('Load collapsed groups, expand second level item, expand third level big item and go to third page when two groups', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            field3: 3
          }, {
            field1: 2,
            field2: 3,
            field3: 4
          }, {
            field1: 2,
            field2: 4,
            field3: 5
          }, {
            field1: 2,
            field2: 4,
            field3: 6
          }, {
            field1: 2,
            field2: 4,
            field3: 7
          }, {
            field1: 2,
            field2: 4,
            field3: 8
          }, {
            field1: 2,
            field2: 4,
            field3: 9
          }, {
            field1: 3,
            field2: 5,
            field3: 10
          }];
          var dataSource = this.createDataSource({
            store: array,
            group: ['field1', 'field2'],
            pageSize: 4
          });
          dataSource.load();
          dataSource.changeRowExpand([2]);
          dataSource.load();
          dataSource.changeRowExpand([2, 4]);
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          dataSource.pageIndex(2);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuation: true,
            key: 2,
            items: [{
              key: 4,
              isContinuation: true,
              isContinuationOnNextPage: true,
              items: [array[4], array[5]]
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 16, 'total items count');
        });
        QUnit.test('Change page several times after expand groups if data is grouped by two fields', function(assert) {
          var array = [];
          var j;
          for (var i = 0; i < 4; i++) {
            for (j = 0; j < 6; j++) {
              array.push({
                group1: i,
                group2: 0,
                id: i * 9 + j + 1
              });
            }
            for (j = 0; j < 3; j++) {
              array.push({
                group1: i,
                group2: 1,
                id: i * 9 + j + 7
              });
            }
          }
          var dataSource = this.createDataSource({
            store: array,
            group: ['group1', 'group2'],
            pageSize: 20,
            scrolling: {mode: 'virtual'}
          });
          dataSource.load();
          dataSource.setViewportPosition(1);
          dataSource.changeRowExpand([0]);
          dataSource.load();
          dataSource.changeRowExpand([0, 0]);
          dataSource.load();
          dataSource.changeRowExpand([0, 1]);
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([1, 0]);
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          dataSource.changeRowExpand([1, 1]);
          dataSource.load();
          dataSource.changeRowExpand([2]);
          dataSource.load();
          dataSource.changeRowExpand([2, 0]);
          dataSource.load();
          dataSource.changeRowExpand([2, 1]);
          dataSource.load();
          dataSource.changeRowExpand([3]);
          dataSource.load();
          dataSource.changeRowExpand([3, 0]);
          dataSource.load();
          assert.deepEqual(dataSource.items().length, 4, 'first level group count');
          assert.deepEqual(dataSource.items()[2].key, 3, 'prev last group key');
          assert.deepEqual(dataSource.items()[2].items, [{
            'key': 0,
            'isContinuationOnNextPage': true,
            'items': [{
              'group1': 3,
              'group2': 0,
              'id': 28
            }, {
              'group1': 3,
              'group2': 0,
              'id': 29
            }]
          }], 'prev last group items');
          assert.deepEqual(dataSource.items()[3].key, 3, 'last group key');
          assert.deepEqual(dataSource.items()[3].items, [{
            'key': 0,
            'isContinuation': true,
            'items': [{
              'group1': 3,
              'group2': 0,
              'id': 30
            }, {
              'group1': 3,
              'group2': 0,
              'id': 31
            }, {
              'group1': 3,
              'group2': 0,
              'id': 32
            }, {
              'group1': 3,
              'group2': 0,
              'id': 33
            }]
          }, {
            'key': 1,
            'items': null
          }], 'last group items');
        });
        QUnit.test('Expand third level group', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            field3: 3,
            id: 1
          }, {
            field1: 1,
            field2: 2,
            field3: 3,
            id: 2
          }, {
            field1: 2,
            field2: 2,
            field3: 4,
            id: 3
          }, {
            field1: 3,
            field2: 3,
            field3: 5,
            id: 4
          }, {
            field1: 4,
            field2: 3,
            field3: 5,
            id: 5
          }, {
            field1: 5,
            field2: 3,
            field3: 5,
            id: 6
          }];
          var dataSource = this.createDataSource({
            store: array,
            group: ['field1', 'field2', 'field3'],
            pageSize: 6
          });
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([1, 2]);
          dataSource.load();
          dataSource.changeRowExpand([1, 2, 3]);
          dataSource.load();
          assert.deepEqual(dataSource.items().length, 2, 'group count on first levetl');
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 2,
            items: [{
              key: 3,
              items: [array[0], array[1]]
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 9, 'total items count');
        });
        QUnit.test('Load collapsed groups and expand two items when two groups', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field1', 'field2'],
            pageSize: 5
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([2]);
          dataSource.store().on('loading', loadingChanged);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: null
            }, {
              key: 5,
              items: null
            }]
          }, {
            key: 2,
            isContinuationOnNextPage: true,
            items: []
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 7, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 2, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 2, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, [{
            'desc': false,
            'selector': 'field2'
          }], 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, ['field1', '=', 1], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireGroupCount, true, 'require group count should be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, 0, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, undefined, 'take for second level');
        });
        QUnit.test('Load collapsed group and expand second level item', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field1', 'field2'],
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([1, 2]);
          dataSource.store().on('loading', loadingChanged);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            key: 1,
            items: [{
              key: 2,
              isContinuationOnNextPage: true,
              items: [{
                'field1': 1,
                'field2': 2,
                'field3': 3
              }]
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 10, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 3, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, [{
            'desc': false,
            'selector': 'field2'
          }], 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, ['field1', '=', 1], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count is passed on second loading');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, 0, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, 1, 'take for second level');
          assert.deepEqual(loadingChanged.getCall(2).args[0].group, null, 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(2).args[0].filter, [['field1', '=', 1], 'and', ['field2', '=', 2]], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].requireTotalCount, false, 'require total count is passed on second loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].skip, undefined, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(2).args[0].take, 1, 'take for second level');
        });
        QUnit.test('Reload dataSource when one expanded group and two group levels exist', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field1', 'field2'],
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.reload(true);
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            key: 1,
            items: [{
              key: 2,
              items: null
            }, {
              key: 3,
              items: null
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 6, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 4, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, ['field2'], 'group for group count request');
          assert.deepEqual(loadingChanged.getCall(0).args[0].filter, ['field1', '=', 1], 'filter for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, false, 'require total count is not passed for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, true, 'require group count is passed for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take for group count request');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, ['field1'], 'group for group offset request');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, [['field1', '<', 1], 'or', ['field1', '=', null]], 'filter for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count is not passed for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireGroupCount, true, 'require group count is passed for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, 0, 'skip for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, 1, 'take for group offset request');
          assert.deepEqual(loadingChanged.getCall(2).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].requireGroupCount, true, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(2).args[0].take, 1, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(3).args[0].group, [{
            'desc': false,
            'selector': 'field2'
          }], 'group by for second level loading');
          assert.deepEqual(loadingChanged.getCall(3).args[0].filter, ['field1', '=', 1], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].requireTotalCount, false, 'require total count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].requireGroupCount, true, 'require group count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].skip, 0, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(3).args[0].take, 2, 'take for second level');
        });
        QUnit.test('Reload dataSource when two expanded group and two group levels exist', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field1', 'field2'],
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([2]);
          dataSource.load();
          dataSource.changeRowExpand([2, 4]);
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.reload(true);
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: [{
              isContinuationOnNextPage: true,
              key: 4,
              items: []
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 9, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 6, 'loading count');
        });
        QUnit.test('Error on change grouping when one expanded group and two group levels exist', function(assert) {
          var brokeOptions = {};
          var dataSource = this.createDataSource({
            group: ['field1'],
            pageSize: 3
          }, brokeOptions);
          var changed = sinon.stub();
          var loadError = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changed.add(changed);
          dataSource.loadError.add(loadError);
          brokeOptions.errorOnFirstLoad = true;
          dataSource.group(['field1', 'field2']);
          dataSource.load();
          assert.strictEqual(changed.callCount, 1, 'changed call count');
          assert.strictEqual(loadError.callCount, 1, 'last error call count');
          assert.strictEqual(changed.lastCall.args[0].changeType, 'loadError', 'last change is error');
          assert.strictEqual(loadError.lastCall.args[0].message, 'Error', 'last error message');
        });
        QUnit.test('Remote group paging should work correctly after sorting if grouping by 2 columns', function(assert) {
          var items;
          var subgroups;
          var data = [];
          for (var j = 1; j < 4; j++) {
            for (var k = 1; k < 16; k++) {
              data.push({
                group1: 'group',
                group2: ("subgroup" + j),
                field: k * j
              });
            }
          }
          var pageSize = 7;
          var dataSource = createDataSourceWithRemoteGrouping({
            store: data,
            paginate: true,
            pageSize: pageSize,
            group: [{
              selector: 'group1',
              isExpanded: false
            }, {
              selector: 'group2',
              isExpanded: false
            }]
          }, true);
          dataSource.load();
          items = dataSource.items();
          assert.equal(items.length, 1, 'one first level group');
          assert.notOk(items[0].items, 'group is not expanded');
          dataSource.changeRowExpand(['group']);
          dataSource.load();
          items = dataSource.items();
          assert.equal(items.length, 1, 'one first level group');
          assert.equal(items[0].items.length, 3, 'group is expanded');
          items[0].items.forEach(function(subgroup, index) {
            assert.notOk(subgroup.items, ("subgroup #" + (index + 1) + " is not expanded"));
          });
          dataSource.changeRowExpand(['group', 'subgroup2']);
          dataSource.load();
          items = dataSource.items();
          subgroups = items[0].items;
          assert.equal(items.length, 1, 'one first level group');
          assert.equal(subgroups.length, 2, 'group is expanded');
          assert.notOk(subgroups[0].items, 'subgroup #1 is not expanded');
          assert.equal(subgroups[1].items.length, 4, 'subgroup #2 is expanded and paginated');
          dataSource.sort({
            selector: 'field',
            desc: true
          });
          dataSource.load();
          items = dataSource.items();
          subgroups = items[0].items;
          assert.equal(items.length, 1, 'one first level group');
          assert.equal(subgroups.length, 2, 'group is expanded');
          assert.notOk(subgroups[0].items, 'subgroup #1 is not expanded');
          assert.equal(subgroups[1].items.length, 4, 'subgroup #2 is expanded and paginated');
          assert.deepEqual(subgroups[1].items[0], {
            'field': 30,
            'group1': 'group',
            'group2': 'subgroup2'
          }, 'data is sorted');
        });
        QUnit.test('Reload dataSource when one expanded group and one group level exist', function(assert) {
          var dataSource = this.createDataSource({
            group: ['field1'],
            pageSize: 3
          });
          var loadingChanged = sinon.stub();
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.store().on('loading', loadingChanged);
          dataSource.reload(true);
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            key: 1,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 1,
              field2: 2,
              field3: 4
            }]
          }], 'items');
          assert.equal(dataSource.totalItemsCount(), 7, 'total items count');
          assert.strictEqual(loadingChanged.callCount, 4, 'loading count');
          assert.deepEqual(loadingChanged.getCall(0).args[0].group, null, 'group is empty for group count request');
          assert.deepEqual(loadingChanged.getCall(0).args[0].filter, ['field1', '=', 1], 'filter for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireTotalCount, true, 'require total count is not passed for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].requireGroupCount, false, 'require group count is passed for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].skip, 0, 'skip for group count request');
          assert.strictEqual(loadingChanged.getCall(0).args[0].take, 1, 'take for group count request');
          assert.deepEqual(loadingChanged.getCall(1).args[0].group, ['field1'], 'group for group offset request');
          assert.deepEqual(loadingChanged.getCall(1).args[0].filter, [['field1', '<', 1], 'or', ['field1', '=', null]], 'filter for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireTotalCount, false, 'require total count is not passed for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].requireGroupCount, true, 'require group count is passed for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].skip, 0, 'skip for group offset request');
          assert.strictEqual(loadingChanged.getCall(1).args[0].take, 1, 'take for group offset request');
          assert.deepEqual(loadingChanged.getCall(2).args[0].group, [{
            'desc': false,
            'selector': 'field1'
          }], 'group by for second level loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].requireTotalCount, true, 'require total count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].requireGroupCount, true, 'require group count is passed on first loading');
          assert.strictEqual(loadingChanged.getCall(2).args[0].skip, 0, 'skip for first level');
          assert.strictEqual(loadingChanged.getCall(2).args[0].take, 1, 'take for first level');
          assert.deepEqual(loadingChanged.getCall(3).args[0].group, null, 'group is empty for second level loading');
          assert.deepEqual(loadingChanged.getCall(3).args[0].filter, ['field1', '=', 1], 'filter on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].requireTotalCount, false, 'require total count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].requireGroupCount, false, 'require group count should not be passed on second loading');
          assert.strictEqual(loadingChanged.getCall(3).args[0].skip, undefined, 'skip for second level');
          assert.strictEqual(loadingChanged.getCall(3).args[0].take, 2, 'take for second level');
        });
        QUnit.test('Error when store not returned groupCount', function(assert) {
          assert.expect(1);
          var dataSource = this.createDataSource({group: 'field2'}, {skipGroupCount: true});
          dataSource.load().done(function() {
            assert.ok(false, 'exception should be rised');
          }).fail(function(e) {
            assert.ok(e.message.indexOf('E4022') >= 0, 'name of error');
          });
        });
        QUnit.test('Error when store not returned groupCount during expand not last level group', function(assert) {
          assert.expect(1);
          var brokeOptions = {};
          var dataSource = this.createDataSource({group: ['field1', 'field2']}, brokeOptions);
          dataSource.load();
          brokeOptions.skipGroupCount = true;
          dataSource.changeRowExpand([1]).done(function() {
            assert.ok(false, 'exception should be rised');
          }).fail(function(e) {
            assert.ok(e.message.indexOf('E4022') >= 0, 'name of error');
          });
        });
        QUnit.test('Exception when store not returned totalCount after full reload', function(assert) {
          var brokeOptions = {};
          var dataSource = this.createDataSource({group: ['field1']}, brokeOptions);
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          try {
            brokeOptions.skipTotalCount = true;
            dataSource.reload(true);
            assert.ok(false, 'exception should be rised');
          } catch (e) {
            assert.ok(e.message.indexOf('E4021') >= 0, 'name of error');
          }
        });
        QUnit.test('The collapseAll method should work after expanding group row', function(assert) {
          var dataSource = this.createDataSource({
            group: 'field2',
            pageSize: 2
          });
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          dataSource.changeRowExpand([2]);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            key: 2
          }], 'loaded items');
          dataSource.collapseAll();
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
        });
        QUnit.test('The expandAll method  should work after collapsing group row', function(assert) {
          var dataSource = this.createDataSource({
            group: 'field2',
            pageSize: 2
          });
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'loaded items');
          dataSource.expandAll();
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            key: 2
          }], 'loaded items');
          dataSource.changeRowExpand([2]);
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            key: 2,
            items: null
          }, {
            isContinuationOnNextPage: true,
            items: [],
            key: 3
          }], 'loaded items');
          dataSource.expandAll();
          dataSource.load();
          assert.deepEqual(dataSource.items(), [{
            isContinuationOnNextPage: true,
            items: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            key: 2
          }], 'loaded items');
        });
        QUnit.test('The grouped data should be correct after changing page from 1 to 0', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            id: 1
          }, {
            field1: 1,
            field2: 2,
            id: 2
          }, {
            field1: 1,
            field2: 2,
            id: 3
          }, {
            field1: 1,
            field2: 2,
            id: 4
          }, {
            field1: 1,
            field2: 2,
            id: 5
          }, {
            field1: 1,
            field2: 3,
            id: 6
          }, {
            field1: 1,
            field2: 3,
            id: 7
          }, {
            field1: 1,
            field2: 3,
            id: 8
          }, {
            field1: 1,
            field2: 3,
            id: 9
          }, {
            field1: 1,
            field2: 3,
            id: 10
          }];
          var dataSource = this.createDataSource({
            store: array,
            group: ['field1', 'field2'],
            pageSize: 10
          });
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([1, 2]);
          dataSource.load();
          dataSource.changeRowExpand([1, 3]);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 2,
            items: [array[0], array[1], array[2], array[3], array[4]]
          }, {
            key: 3,
            isContinuationOnNextPage: true,
            items: [array[5], array[6]]
          }], 'items');
          dataSource.pageIndex(1);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 3,
            isContinuation: true,
            items: [array[7], array[8], array[9]]
          }], 'items');
          dataSource.pageIndex(0);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 2,
            items: [array[0], array[1], array[2], array[3], array[4]]
          }, {
            key: 3,
            isContinuationOnNextPage: true,
            items: [array[5], array[6]]
          }], 'items');
        });
        QUnit.test('The grouped data should be correct after changing page from 0 to 1', function(assert) {
          var array = [{
            field1: 1,
            field2: 2,
            id: 1
          }, {
            field1: 1,
            field2: 3,
            id: 2
          }, {
            field1: 1,
            field2: 4,
            id: 3
          }, {
            field1: 1,
            field2: 4,
            id: 4
          }, {
            field1: 1,
            field2: 4,
            id: 5
          }, {
            field1: 1,
            field2: 5,
            id: 6
          }, {
            field1: 1,
            field2: 5,
            id: 7
          }, {
            field1: 1,
            field2: 5,
            id: 8
          }, {
            field1: 1,
            field2: 5,
            id: 9
          }];
          var dataSource = this.createDataSource({
            store: array,
            group: ['field1', 'field2'],
            pageSize: 6
          });
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }, {
            key: 4,
            items: null
          }, {
            key: 5,
            items: null
          }], 'first page - items after expand first group');
          dataSource.changeRowExpand([1, 4]);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }, {
            key: 4,
            isContinuationOnNextPage: true,
            items: [array[2], array[3]]
          }], 'first page - items after expand fourth group');
          dataSource.pageIndex(1);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 4,
            isContinuation: true,
            items: [array[4]]
          }, {
            key: 5,
            items: null
          }], 'second page - items');
          dataSource.changeRowExpand([1, 5]);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 4,
            isContinuation: true,
            items: [array[4]]
          }, {
            key: 5,
            isContinuationOnNextPage: true,
            items: [array[5], array[6]]
          }], 'second page - items after expand fifth group');
          dataSource.pageIndex(2);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 5,
            isContinuation: true,
            items: [array[7], array[8]]
          }], 'third page - items');
          dataSource.pageIndex(1);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0].items, [{
            key: 4,
            isContinuation: true,
            items: [array[4]]
          }, {
            key: 5,
            isContinuationOnNextPage: true,
            items: [array[5], array[6]]
          }], 'second page - items');
        });
        $.each(['Grouping without remoteOperations', 'Grouping with remoteOperations', 'Grouping with remoteOperations and with remote groupPaging'], function(moduleIndex, moduleName) {
          QUnit.module(moduleName, {beforeEach: function() {
              this.array = [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }, {
                field1: 1,
                field2: 3,
                field3: 5
              }, {
                field1: 2,
                field2: 4,
                field3: 6
              }];
              var remoteGroupPaging = moduleIndex === 2;
              this.createDataSource = function(options) {
                return (moduleIndex === 0 ? createDataSource : createDataSourceWithRemoteGrouping)($.extend({
                  store: this.array,
                  paginate: true,
                  group: 'field2',
                  remoteOperations: false,
                  requireTotalCount: true
                }, options || {}), remoteGroupPaging);
              };
              this.processItems = function(items) {
                for (var i = 0; i < items.length; i++) {
                  if ('key' in items[i]) {
                    delete items[i].count;
                    if (items[i].items) {
                      this.processItems(items[i].items);
                    }
                  }
                }
                return items;
              };
            }}, function() {
            if (moduleIndex === 1) {
              QUnit.test('grouping with paginate. Group is collapsed. Async loading', function(assert) {
                var clock = sinon.useFakeTimers();
                var changedCount = 0;
                var source = this.createDataSource({
                  group: [{
                    selector: 'field2',
                    isExpanded: false
                  }],
                  pageSize: 2,
                  executeAsync: function(func) {
                    setTimeout(function() {
                      func();
                    }, 10);
                  },
                  onChanged: function() {
                    changedCount++;
                  }
                });
                source.load();
                clock.tick(10);
                assert.equal(changedCount, 1);
                assert.equal(source.totalItemsCount(), 3);
                assert.deepEqual(this.processItems(source.items()), [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]);
                clock.restore();
              });
              QUnit.test('grouping with paginate. Group is expanded. Async loading', function(assert) {
                var clock = sinon.useFakeTimers();
                var loadArgs = [];
                var changedCount = 0;
                var source = this.createDataSource({
                  group: [{
                    selector: 'field2',
                    isExpanded: true
                  }],
                  select: ['field2', 'field3'],
                  pageSize: 3,
                  executeAsync: function(func, loadOptions) {
                    loadArgs.push(loadOptions);
                    setTimeout(function() {
                      func();
                    }, 10);
                  },
                  onChanged: function() {
                    changedCount++;
                  }
                });
                source.load();
                assert.equal(loadArgs.length, 1);
                clock.tick(10);
                assert.equal(loadArgs.length, 2);
                assert.deepEqual(loadArgs[0].group, [{
                  selector: 'field2',
                  isExpanded: false,
                  desc: false
                }]);
                assert.deepEqual(loadArgs[0].select, ['field2', 'field3']);
                assert.deepEqual(loadArgs[0].filter, undefined);
                assert.strictEqual(loadArgs[0].skip, undefined);
                assert.strictEqual(loadArgs[0].take, undefined);
                assert.deepEqual(loadArgs[1].group, null);
                assert.deepEqual(loadArgs[1].select, ['field2', 'field3']);
                assert.deepEqual(loadArgs[1].filter, ['field2', '=', 2]);
                assert.strictEqual(loadArgs[1].skip, undefined);
                assert.strictEqual(loadArgs[1].take, 2);
                assert.equal(changedCount, 0);
                assert.equal(source.totalItemsCount(), -1);
                assert.deepEqual(this.processItems(source.items()), []);
                clock.tick(10);
                assert.equal(changedCount, 1);
                assert.equal(source.totalItemsCount(), 8);
                assert.deepEqual(this.processItems(source.items()), [{
                  key: 2,
                  items: [{
                    field2: 2,
                    field3: 3
                  }, {
                    field2: 2,
                    field3: 4
                  }]
                }]);
                clock.restore();
              });
              QUnit.test('grouping with paginate. Several groups are expanded. Async loading', function(assert) {
                var clock = sinon.useFakeTimers();
                var loadArgs = [];
                var source = this.createDataSource({
                  group: [{
                    selector: 'field1',
                    isExpanded: true
                  }, {
                    selector: 'field2',
                    isExpanded: true
                  }],
                  pageSize: 3,
                  executeAsync: function(func, loadOptions) {
                    loadArgs.push(loadOptions);
                    setTimeout(function() {
                      func();
                    }, 10);
                  }
                });
                source.load();
                assert.equal(loadArgs.length, 1);
                clock.tick(10);
                assert.equal(loadArgs.length, 2);
                assert.deepEqual(loadArgs[0].group, [{
                  selector: 'field1',
                  isExpanded: true,
                  desc: false
                }, {
                  selector: 'field2',
                  isExpanded: false,
                  desc: false
                }], 'isExpanded is false for last group');
                assert.deepEqual(loadArgs[0].filter, undefined);
                assert.strictEqual(loadArgs[0].skip, undefined);
                assert.strictEqual(loadArgs[0].take, undefined);
                assert.deepEqual(loadArgs[1].group, null);
                assert.deepEqual(loadArgs[1].filter, [['field1', '=', 1], 'and', ['field2', '=', 2]]);
                assert.strictEqual(loadArgs[1].skip, undefined);
                assert.strictEqual(loadArgs[1].take, 1);
                clock.restore();
              });
            }
            QUnit.test('grouping without paginate', function(assert) {
              var source = this.createDataSource({paginate: false});
              source.load();
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('grouping with map function', function(assert) {
              var source = this.createDataSource({map: function(data) {
                  return data;
                }});
              source.load();
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(source.items(), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('grouping with pageSize more items count', function(assert) {
              var source = this.createDataSource();
              source.load();
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('grouping with pageSize less items count', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }]);
              assert.equal(source.itemsCount(), 2);
            });
            QUnit.test('grouping with pageSize less items count. Change pageSize at runtime', function(assert) {
              var source = this.createDataSource({
                group: 'group',
                store: [{
                  group: 1,
                  id: 1
                }, {
                  group: 1,
                  id: 2
                }, {
                  group: 1,
                  id: 3
                }, {
                  group: 1,
                  id: 4
                }, {
                  group: 1,
                  id: 5
                }, {
                  group: 1,
                  id: 6
                }, {
                  group: 2,
                  id: 7
                }],
                pageSize: 3
              });
              source.load();
              source.changeRowExpand([1]);
              source.pageSize(5);
              source.load();
              source.pageSize(3);
              source.pageIndex(2);
              source.load();
              assert.equal(source.totalItemsCount(), 10);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  group: 1,
                  id: 5
                }, {
                  group: 1,
                  id: 6
                }]
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('grouping with pageSize less items count when no requireTotalCount', function(assert) {
              var source = this.createDataSource({
                pageSize: 5,
                group: [{
                  selector: 'field2',
                  isExpanded: true
                }],
                requireTotalCount: false
              });
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.equal(source.itemsCount(), 5);
              assert.ok(!source.isLastPage());
              assert.ok(!source.hasKnownLastPage());
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 7);
              assert.equal(source.itemsCount(), 2);
              assert.ok(source.isLastPage());
              assert.ok(source.hasKnownLastPage());
            });
            QUnit.test('grouping with isExpanded group on previous page and isExpanded current group that continues on the next page', function(assert) {
              var source = this.createDataSource({
                pageSize: 4,
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 3,
                  field3: 5
                }, {
                  field1: 2,
                  field2: 4,
                  field3: 6
                }, {
                  field1: 2,
                  field2: 5,
                  field3: 7
                }, {
                  field1: 2,
                  field2: 5,
                  field3: 8
                }, {
                  field1: 2,
                  field2: 5,
                  field3: 9
                }, {
                  field1: 2,
                  field2: 6,
                  field3: 10
                }, {
                  field1: 2,
                  field2: 6,
                  field3: 11
                }],
                paginate: true,
                group: 'field2',
                remoteOperations: false,
                requireTotalCount: true
              });
              source.load();
              source.changeRowExpand([2]);
              source.load();
              source.pageIndex(1);
              source.load();
              source.changeRowExpand([5]);
              source.load();
              assert.equal(source.totalItemsCount(), 11);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 4,
                items: null
              }, {
                key: 5,
                isContinuationOnNextPage: true,
                items: [{
                  field1: 2,
                  field2: 5,
                  field3: 7
                }, {
                  field1: 2,
                  field2: 5,
                  field3: 8
                }]
              }]);
              assert.equal(source.itemsCount(), 4);
            });
            QUnit.test('grouping on last page when group continued from several pages', function(assert) {
              var source = this.createDataSource({
                pageSize: 3,
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 3,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 4,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 5,
                  field3: 7
                }],
                paginate: true,
                group: 'field1',
                remoteOperations: false,
                requireTotalCount: true
              });
              source.load();
              var changeRowExpandResult = source.changeRowExpand([1]);
              source.load();
              source.pageIndex(2);
              source.load();
              assert.equal(source.totalItemsCount(), 8);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  field1: 1,
                  field2: 5,
                  field3: 7
                }]
              }]);
              assert.equal(source.itemsCount(), 2);
              assert.ok(changeRowExpandResult && changeRowExpandResult.done);
            });
            QUnit.test('grouping with pageSize less items count. Continue group parameter', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              source.changeRowExpand([2]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 6);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 4
                }]
              }]);
              assert.equal(source.itemsCount(), 2);
            });
            QUnit.test('grouping with pageSize less items count. Continue group parameter when sort exists and several groups expanded', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 3,
                  field3: 7
                }, {
                  field1: 2,
                  field2: 4,
                  field3: 8
                }],
                group: 'field2',
                sort: [{
                  selector: 'field3',
                  desc: true
                }],
                pageSize: 4
              });
              source.load();
              source.changeRowExpand([2]);
              source.load();
              source.pageIndex(1);
              source.load();
              source.changeRowExpand([3]);
              source.load();
              assert.equal(source.totalItemsCount(), 9);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }]
              }, {
                key: 3,
                items: [{
                  field1: 1,
                  field2: 3,
                  field3: 7
                }]
              }]);
              assert.equal(source.itemsCount(), 4);
            });
            QUnit.test('grouping with pageSize less items count. Continue group parameter when virtual scrolling', function(assert) {
              var source = this.createDataSource({
                pageSize: 2,
                scrolling: {
                  mode: 'virtual',
                  preventPreload: true
                }
              });
              source.load();
              source.changeRowExpand([2]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 4
                }]
              }, {
                key: 3,
                items: null
              }]);
              assert.equal(source.itemsCount(), 2);
            });
            QUnit.test('grouping with pageSize less items count. Continue on next page group parameter', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              source.changeRowExpand([2]);
              source.load();
              assert.equal(source.totalItemsCount(), 6);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuationOnNextPage: true,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }]
              }]);
              assert.equal(source.itemsCount(), 2);
            });
            QUnit.test('grouping with pageSize less items count. Continue group parameter not set', function(assert) {
              var source = this.createDataSource({
                pageSize: 2,
                pageIndex: 1
              });
              source.load();
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 4,
                items: null
              }]);
            });
            QUnit.test('grouping without paginate. Expand group', function(assert) {
              var source = this.createDataSource({paginate: false});
              source.load();
              source.changeRowExpand([2]);
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }]
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
            });
            QUnit.test('grouping without paginate. Collapse group after expand', function(assert) {
              var source = this.createDataSource({paginate: false});
              source.load();
              source.changeRowExpand([2]);
              source.changeRowExpand([2]);
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
            });
            QUnit.test('grouping with paginate. Expand group', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([2]);
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }]
              }]);
            });
            QUnit.test('grouping with paginate. Expand group if filterValue is defined', function(assert) {
              var source = this.createDataSource({
                group: ['field1', 'field2'],
                pageSize: 5
              });
              var filter = ['field3', '=', 3];
              source.customizeStoreLoadOptions.add(function(options) {
                if (options.isCustomLoading)
                  return;
                var storeLoadOptions = options.storeLoadOptions;
                storeLoadOptions.filter = storeLoadOptions.filter ? [storeLoadOptions.filter, 'and', filter] : filter;
              });
              source.load();
              source.changeRowExpand([1]);
              source.load();
              assert.equal(source.totalItemsCount(), 2);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }]
              }]);
            });
            QUnit.test('grouping with pageSize less items count. Collapse group with undefined key', function(assert) {
              var source = this.createDataSource({
                group: [{
                  selector: 'field1',
                  isExpanded: true,
                  desc: true
                }],
                store: [{
                  field1: false,
                  field2: 1
                }, {
                  field1: undefined,
                  field2: 2
                }, {
                  field1: true,
                  field2: 3
                }],
                pageSize: 3
              });
              source.load();
              source.changeRowExpand([true]);
              source.load();
              source.changeRowExpand([undefined]);
              source.load();
              assert.deepEqual(this.processItems(source.items()), [{
                key: undefined,
                items: null
              }, {
                key: true,
                items: null
              }, {
                key: false,
                isContinuationOnNextPage: true,
                items: []
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('grouping with paginate. Collapse group after expand', function(assert) {
              var source = this.createDataSource({});
              source.load();
              source.changeRowExpand([2]);
              source.changeRowExpand([2]);
              assert.equal(source.totalItemsCount(), 3);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 3,
                items: null
              }, {
                key: 4,
                items: null
              }]);
            });
            if (moduleIndex === 0) {
              QUnit.test('getContinuationGroupCount', function(assert) {
                assert.equal(getContinuationGroupCount(0, 3, 2), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(0, 3, 3), 2, '2 continuation groups');
                assert.equal(getContinuationGroupCount(0, 3, 5), 3, '3 continuation groups');
                assert.equal(getContinuationGroupCount(0, 3, 6), 3, '3 continuation groups');
                assert.equal(getContinuationGroupCount(0, 3, 10), 5, '5 continuation groups');
                assert.equal(getContinuationGroupCount(0, 4, 10), 4, '4 continuation groups');
                assert.equal(getContinuationGroupCount(2, 3, 2), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(2, 3, 3), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(2, 3, 5), 2, '2 continuation groups');
                assert.equal(getContinuationGroupCount(2, 3, 10), 5, '5 continuation groups');
                assert.equal(getContinuationGroupCount(2, 3, 5), 2, '2 continuation groups');
                assert.equal(getContinuationGroupCount(2, 4, 5), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(2, 6, 5), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(2, 7, 5), 0, '0 continuation groups');
                assert.equal(getContinuationGroupCount(4, 3, 2), 0, '0 continuation groups');
                assert.equal(getContinuationGroupCount(4, 3, 3), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(4, 3, 5), 2, '2 continuation groups');
                assert.equal(getContinuationGroupCount(4, 3, 10), 4, '4 continuation groups');
                assert.equal(getContinuationGroupCount(-2, 3, 2), 0, '0 continuation groups');
                assert.equal(getContinuationGroupCount(-2, 3, 3), 1, '1 continuation groups');
                assert.equal(getContinuationGroupCount(-2, 3, 5), 2, '2 continuation groups');
                assert.equal(getContinuationGroupCount(-2, 3, 10), 4, '4 continuation groups');
              });
              QUnit.test('collapseAll when no grouped columns', function(assert) {
                var source = this.createDataSource({
                  pageSize: 2,
                  group: null
                });
                source.load();
                source.collapseAll();
                source.load();
                assert.equal(source.pageCount(), 2, 'pageCount');
                assert.deepEqual(source.items(), [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }], 'items');
              });
              QUnit.test('collapseAll for remote data', function(assert) {
                var source = this.createDataSource({
                  load: function() {
                    return [{
                      group: 'group 1',
                      text: 'text 1'
                    }, {
                      group: 'group 1',
                      text: 'text 2'
                    }, {
                      group: 'group 2',
                      text: 'text 3'
                    }];
                  },
                  totalCount: function() {
                    return -1;
                  },
                  pageSize: 2,
                  group: [{
                    selector: 'group',
                    isExpanded: true
                  }],
                  remoteOperations: {
                    filtering: true,
                    sorting: true,
                    paging: true
                  }
                });
                var messageError;
                source.load();
                logger.error = function(message) {
                  messageError = message;
                };
                assert.ok(source._grouping instanceof ExpandedGroupingHelper, 'expanded grouping helper');
                source.collapseAll();
                source.load();
                assert.ok(source._grouping instanceof CollapsedGroupingHelper, 'collapsed grouping helper');
                assert.ok(!messageError, 'no error');
                assert.deepEqual(this.processItems(source.items()), [{
                  key: 'group 1',
                  items: null
                }, {
                  key: 'group 2',
                  items: null
                }]);
              });
              QUnit.test('expandAll when no grouped columns', function(assert) {
                var source = this.createDataSource({
                  pageSize: 2,
                  group: null
                });
                source.load();
                source.expandAll();
                source.load();
                assert.equal(source.pageCount(), 2, 'pageCount');
                assert.deepEqual(source.items(), [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }], 'items');
              });
              QUnit.test('change grouping and reload with custom store', function(assert) {
                var source = this.createDataSource({
                  load: function() {
                    return [{
                      name: 'Chai',
                      customer: 'John'
                    }, {
                      name: 'Chang',
                      customer: 'John'
                    }, {
                      name: 'Queso Caprale',
                      customer: 'Bob'
                    }];
                  },
                  totalCount: function() {
                    return 3;
                  },
                  group: null
                });
                source.load();
                source.group('name');
                source.reload();
                assert.equal(source.totalItemsCount(), 3);
                assert.deepEqual(source.items(), [{
                  key: 'Chai',
                  items: null
                }, {
                  key: 'Chang',
                  items: null
                }, {
                  key: 'Queso Caprale',
                  items: null
                }]);
                assert.equal(source.itemsCount(), 3);
              });
              QUnit.test('change sortOrder of group', function(assert) {
                var source = this.createDataSource({
                  pageSize: 5,
                  group: [{
                    selector: 'field1',
                    isExpanded: true
                  }]
                });
                source.load();
                source.group([{
                  selector: 'field1',
                  isExpanded: true,
                  desc: true
                }]);
                source.reload();
                assert.equal(source.pageCount(), 2, 'pageCount');
                assert.deepEqual(source.items(), [{
                  items: [{
                    field1: 2,
                    field2: 4,
                    field3: 6
                  }],
                  key: 2
                }, {
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 3
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 4
                  }],
                  key: 1
                }], 'items');
              });
              QUnit.test('change sortOrder of group with many unique values', function(assert) {
                var source = this.createDataSource({
                  store: [{field1: 1}, {field1: 2}, {field1: 3}, {field1: 4}, {field1: 5}],
                  pageSize: 2,
                  group: [{
                    selector: 'field1',
                    isExpanded: true
                  }]
                });
                source.load();
                sinon.spy(source._grouping, '_updateGroupInfoOffsets');
                source.group([{
                  selector: 'field1',
                  isExpanded: true,
                  desc: true
                }]);
                source.reload();
                assert.equal(source.pageCount(), 5, 'pageCount');
                assert.deepEqual(source.items(), [{
                  key: 5,
                  items: [{field1: 5}]
                }], 'items');
                assert.equal(source._grouping._updateGroupInfoOffsets.callCount, 1, '_updateGroupInfoOffsets is called once');
              });
            }
          });
        });
        $.each(['Grouping without remoteOperations. Second level', 'Grouping with remote grouping. Second level', 'Grouping with remote grouping and remote group paging. Second level'], function(moduleIndex, moduleName) {
          QUnit.module(moduleName, {beforeEach: function() {
              this.array = [{
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }, {
                field1: 1,
                field2: 3,
                field3: 5
              }, {
                field1: 1,
                field2: 3,
                field3: 6
              }, {
                field1: 2,
                field2: 4,
                field3: 7
              }];
              this.createDataSource = function(options) {
                var remoteGroupPaging = moduleIndex === 2;
                return (moduleIndex === 0 ? createDataSource : createDataSourceWithRemoteGrouping)($.extend({
                  store: this.array,
                  paginate: true,
                  remoteOperations: false,
                  group: ['field1', 'field2'],
                  requireTotalCount: true
                }, options || {}), remoteGroupPaging);
              };
              this.processItems = function(items) {
                for (var i = 0; i < items.length; i++) {
                  if ('key' in items[i]) {
                    delete items[i].count;
                    if (items[i].items) {
                      this.processItems(items[i].items);
                    }
                  }
                }
                return items;
              };
            }}, function() {
            QUnit.test('grouping with paginate', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              assert.equal(source.totalItemsCount(), 2);
              assert.deepEqual(source.items(), [{
                key: 1,
                items: null
              }, {
                key: 2,
                items: null
              }]);
            });
            QUnit.test('grouping with paginate. Expand first level group', function(assert) {
              var loadCount = 0;
              var source = this.createDataSource({
                pageSize: 3,
                executeAsync: function(func) {
                  loadCount++;
                  func();
                }
              });
              source.load();
              loadCount = 0;
              source.changeRowExpand([1]);
              source.load();
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]
              }]);
              if (moduleIndex === 2) {
                assert.equal(loadCount, 3, 'loading three times when remoteOperations with groupPaging is true');
              } else {
                assert.equal(loadCount, 0, 'loading from cache when remoteOperations.groupPaging is false');
              }
            });
            QUnit.test('grouping with paginate. Expand first level group and second level group', function(assert) {
              var source = this.createDataSource({
                group: [{
                  selector: 'field1',
                  desc: true,
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }],
                pageSize: 5
              });
              source.load();
              source.changeRowExpand([2]);
              source.load();
              source.changeRowExpand([1, 2]);
              source.load();
              assert.equal(source.totalItemsCount(), 8);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: [{
                    field1: 1,
                    field2: 3,
                    field3: 5
                  }],
                  isContinuationOnNextPage: true
                }],
                isContinuationOnNextPage: true
              }]);
            });
            QUnit.test('grouping without paginate', function(assert) {
              var source = this.createDataSource({paginate: false});
              source.load();
              assert.equal(source.totalItemsCount(), 2);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: null
              }, {
                key: 2,
                items: null
              }]);
            });
            QUnit.test('grouping without paginate. Expand first level group', function(assert) {
              var source = this.createDataSource({paginate: false});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]
              }, {
                key: 2,
                items: null
              }]);
            });
            QUnit.test('Continue group parameter for first group level only', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              source.changeRowExpand([1]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  key: 3,
                  items: null
                }]
              }]);
            });
            QUnit.test('Continue group parameter for first group level only when virtual scrolling', function(assert) {
              var source = this.createDataSource({
                pageSize: 2,
                scrolling: {
                  mode: 'virtual',
                  preventPreload: true
                }
              });
              source.load();
              source.changeRowExpand([1]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  key: 3,
                  items: null
                }]
              }, {
                key: 2,
                items: null
              }]);
            });
            QUnit.test('Continue group parameter for first group level only when page ends with group header', function(assert) {
              var source = this.createDataSource({pageSize: 2});
              source.load();
              source.changeRowExpand([2]);
              source.load();
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 4);
              assert.equal(source.itemsCount(), 2);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                items: [{
                  key: 4,
                  items: null
                }]
              }]);
            });
            QUnit.test('Continue group parameter for both group levels', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1, 2]);
              source.load();
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 9);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 4
                  }]
                }]
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('Continue group parameter for both group levels when virtual scrolling', function(assert) {
              var source = this.createDataSource({
                pageSize: 3,
                scrolling: {
                  mode: 'virtual',
                  preventPreload: true
                }
              });
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1, 2]);
              source.load();
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 6);
              assert.deepEqual(this.processItems(source.items()), [{
                isContinuationOnNextPage: true,
                items: [{
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 3
                  }],
                  key: 2
                }],
                key: 1
              }, {
                key: 1,
                isContinuation: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 4
                  }]
                }, {
                  key: 3,
                  items: null
                }]
              }, {
                key: 2,
                items: null
              }]);
              assert.equal(source.itemsCount(), 3);
            });
            QUnit.test('Expand second level group', function(assert) {
              var source = this.createDataSource({pageSize: 5});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1, 3]);
              source.load();
              assert.equal(source.totalItemsCount(), 6);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: [{
                    field1: 1,
                    field2: 3,
                    field3: 5
                  }, {
                    field1: 1,
                    field2: 3,
                    field3: 6
                  }]
                }]
              }]);
              assert.equal(source.itemsCount(), 5);
            });
            if (moduleIndex !== 2) {
              QUnit.test('Expand second level group ends on previous page', function(assert) {
                var source = this.createDataSource({pageSize: 5});
                source.load();
                source.changeRowExpand([1]);
                source.load();
                source.changeRowExpand([1, 3]);
                source.load();
                source.pageIndex(1);
                source.load();
                assert.equal(source.totalItemsCount(), 6);
                assert.deepEqual(this.processItems(source.items()), [{
                  key: 2,
                  items: null
                }]);
              });
              QUnit.test('Expand second level group ends on previous page when virtual scrolling', function(assert) {
                var source = this.createDataSource({
                  pageSize: 5,
                  scrolling: {
                    mode: 'virtual',
                    preventPreload: true
                  }
                });
                source.load();
                source.changeRowExpand([1]);
                source.load();
                source.changeRowExpand([1, 3]);
                source.load();
                source.pageIndex(1);
                source.load();
                assert.equal(source.totalItemsCount(), 6);
                assert.deepEqual(this.processItems(source.items()), [{
                  items: [{
                    items: null,
                    key: 2
                  }, {
                    items: [{
                      field1: 1,
                      field2: 3,
                      field3: 5
                    }, {
                      field1: 1,
                      field2: 3,
                      field3: 6
                    }],
                    key: 3
                  }],
                  key: 1
                }, {
                  key: 2,
                  items: null
                }]);
              });
            }
            QUnit.test('isExpanded state of items restore after collapse/expand', function(assert) {
              var source = this.createDataSource({pageSize: 5});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1, 3]);
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1]);
              source.load();
              assert.equal(source.totalItemsCount(), 6);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: [{
                    field1: 1,
                    field2: 3,
                    field3: 5
                  }, {
                    field1: 1,
                    field2: 3,
                    field3: 6
                  }]
                }]
              }]);
            });
            QUnit.test('isExpanded all group levels', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.expandAll();
              source.load();
              assert.equal(source.totalItemsCount(), 15);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 3
                  }]
                }]
              }]);
            });
            QUnit.test('isExpanded all first group level', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.changeRowExpand([1, 3]);
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.expandAll(0);
              source.load();
              assert.equal(source.totalItemsCount(), 11);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  isContinuationOnNextPage: true,
                  items: []
                }],
                isContinuationOnNextPage: true
              }]);
            });
            QUnit.test('Collapsed all group levels', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.collapseAll();
              source.load();
              assert.equal(source.totalItemsCount(), 2);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: null
              }, {
                key: 2,
                items: null
              }]);
            });
            QUnit.test('Collapse all second group level', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.changeRowExpand([1, 3]);
              source.collapseAll(1);
              source.reload();
              assert.ok(!source.group()[0].isExpanded);
              assert.ok(!source.group()[1].isExpanded);
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]
              }]);
            });
            QUnit.test('Collapse all second group level when all groups isExpanded', function(assert) {
              var source = this.createDataSource({
                pageSize: 3,
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }]
              });
              source.load();
              source.collapseAll(1);
              source.reload();
              assert.ok(source.group()[0].isExpanded);
              assert.ok(!source.group()[1].isExpanded);
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]
              }]);
            });
            QUnit.test('isExpanded group parameter', function(assert) {
              var source = this.createDataSource({
                pageSize: 3,
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, 'field2']
              });
              source.load();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: null
                }, {
                  key: 3,
                  items: null
                }]
              }]);
            });
            QUnit.test('isExpanded group parameters. Apply filter', function(assert) {
              var source = this.createDataSource({
                pageSize: 5,
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }]
              });
              source.load();
              source.filter(['field2', '=', 2]);
              source.reload();
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 3
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 4
                  }]
                }]
              }]);
            });
            QUnit.test('change sortOrder for first group level', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.load();
              source.group([{
                selector: 'field1',
                desc: true
              }, 'field2']);
              source.reload();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                items: null
              }, {
                key: 1,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  items: null
                }]
              }]);
            });
            QUnit.test('change sortOrder for second group level', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.changeRowExpand([1]);
              source.group([{selector: 'field1'}, {
                selector: 'field2',
                desc: true
              }]);
              source.reload();
              assert.equal(source.totalItemsCount(), 4);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 3,
                  items: null
                }, {
                  key: 2,
                  items: null
                }]
              }]);
            });
            QUnit.test('change sortOrder for second group level when all groups expanded', function(assert) {
              var array = [{
                field1: 1,
                field2: 2,
                field3: 1
              }, {
                field1: 1,
                field2: 2,
                field3: 2
              }, {
                field1: 1,
                field2: 2,
                field3: 3
              }, {
                field1: 1,
                field2: 2,
                field3: 4
              }, {
                field1: 2,
                field2: 1,
                field3: 5
              }, {
                field1: 2,
                field2: 1,
                field3: 6
              }, {
                field1: 2,
                field2: 2,
                field3: 7
              }];
              var source = this.createDataSource({
                store: array,
                pageSize: 5,
                group: [{
                  selector: 'field1',
                  desc: false,
                  isExpanded: true
                }, {
                  selector: 'field2',
                  desc: false,
                  isExpanded: true
                }]
              });
              source.load();
              source.group([{
                selector: 'field1',
                desc: false,
                isExpanded: true
              }, {
                selector: 'field2',
                desc: true,
                isExpanded: true
              }]);
              source.reload();
              assert.equal(source.totalItemsCount(), 18);
              assert.equal(source.itemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  isContinuationOnNextPage: true,
                  items: [array[0], array[1], array[2]]
                }],
                isContinuationOnNextPage: true
              }]);
            });
            QUnit.test('change isExpanded for first group level', function(assert) {
              var source = this.createDataSource({pageSize: 3});
              source.load();
              source.group([{
                selector: 'field1',
                isExpanded: true
              }, 'field2']);
              source.reload();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                items: [{
                  items: null,
                  key: 2
                }, {
                  items: null,
                  key: 3
                }],
                key: 1
              }]);
            });
            QUnit.test('change isExpanded for second group level', function(assert) {
              var source = this.createDataSource({
                pageSize: 3,
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }]
              });
              source.load();
              source.group([{
                selector: 'field1',
                isExpanded: true
              }, {
                selector: 'field2',
                isExpanded: false
              }]);
              source.reload();
              assert.equal(source.totalItemsCount(), 5);
              assert.deepEqual(this.processItems(source.items()), [{
                items: [{
                  items: null,
                  key: 2
                }, {
                  items: null,
                  key: 3
                }],
                key: 1
              }]);
            });
            QUnit.test('Second page for big group', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 2
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 7
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 8
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 14);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 4
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 5
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 6
                  }]
                }]
              }]);
            });
            QUnit.test('Last pages for very big group', function(assert) {
              var array = [];
              for (var i = 0; i < 29; i++) {
                array.push({
                  field1: 1,
                  field2: 2,
                  field3: i + 1
                });
              }
              array.push({
                field1: 2,
                field2: 3,
                field3: 30
              });
              var source = this.createDataSource({
                store: array,
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.pageIndex(8);
              source.load();
              assert.equal(source.totalItemsCount(), 53);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 25
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 26
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 27
                  }]
                }]
              }]);
              source.pageIndex(9);
              source.load();
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 28
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 29
                  }]
                }]
              }, {
                key: 2,
                isContinuationOnNextPage: true,
                items: []
              }]);
              source.pageIndex(10);
              source.load();
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                items: [{
                  key: 3,
                  items: [{
                    field1: 2,
                    field2: 3,
                    field3: 30
                  }]
                }]
              }]);
            });
            QUnit.test('Third page for big group', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 2
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 7
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 8
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 9
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 10
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 11
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.pageIndex(2);
              source.load();
              assert.equal(source.totalItemsCount(), 19);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 7
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 8
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 9
                  }]
                }]
              }]);
            });
            QUnit.test('Last page for big first level group', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 2
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 7
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 8
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 9
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.pageIndex(2);
              source.load();
              assert.equal(source.totalItemsCount(), 18);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 7
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 8
                  }]
                }]
              }, {
                key: 2,
                isContinuationOnNextPage: true,
                items: []
              }]);
            });
            QUnit.test('Last page for big second level group', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 2
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 4
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 5
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 6
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 7
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 8
                }, {
                  field1: 1,
                  field2: 3,
                  field3: 9
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.pageIndex(2);
              source.load();
              assert.equal(source.totalItemsCount(), 18);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 2,
                  isContinuation: true,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 7
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 8
                  }]
                }, {
                  key: 3,
                  isContinuationOnNextPage: true,
                  items: []
                }]
              }]);
            });
            QUnit.test('Page ends with 2 group headers', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 2
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 3
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 4
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 5
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 6
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 7
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 8
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.load();
              assert.equal(source.totalItemsCount(), 18);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 1
                  }]
                }]
              }, {
                key: 2,
                isContinuationOnNextPage: true,
                items: [{
                  key: 3,
                  isContinuationOnNextPage: true,
                  items: []
                }]
              }]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 18);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 3,
                  isContinuation: true,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 2,
                    field2: 3,
                    field3: 2
                  }, {
                    field1: 2,
                    field2: 3,
                    field3: 3
                  }, {
                    field1: 2,
                    field2: 3,
                    field3: 4
                  }]
                }]
              }]);
            });
            QUnit.test('Page ends with 1 first group header', function(assert) {
              var source = this.createDataSource({
                store: [{
                  field1: 1,
                  field2: 2,
                  field3: 1
                }, {
                  field1: 1,
                  field2: 2,
                  field3: 2
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 3
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 4
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 5
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 6
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 7
                }, {
                  field1: 2,
                  field2: 3,
                  field3: 8
                }],
                pageSize: 5
              });
              source.load();
              source.expandAll();
              source.load();
              assert.equal(source.totalItemsCount(), 15);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 1,
                items: [{
                  key: 2,
                  items: [{
                    field1: 1,
                    field2: 2,
                    field3: 1
                  }, {
                    field1: 1,
                    field2: 2,
                    field3: 2
                  }]
                }]
              }, {
                key: 2,
                isContinuationOnNextPage: true,
                items: []
              }]);
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 15);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 2,
                isContinuation: true,
                isContinuationOnNextPage: true,
                items: [{
                  key: 3,
                  isContinuationOnNextPage: true,
                  items: [{
                    field1: 2,
                    field2: 3,
                    field3: 3
                  }, {
                    field1: 2,
                    field2: 3,
                    field3: 4
                  }, {
                    field1: 2,
                    field2: 3,
                    field3: 5
                  }]
                }]
              }]);
            });
            QUnit.test('Four groups with paging', function(assert) {
              var array = [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4,
                field5: 5
              }, {
                field1: 2,
                field2: 3,
                field3: 4,
                field4: 5,
                field5: 6
              }, {
                field1: 3,
                field2: 4,
                field3: 5,
                field4: 6,
                field5: 7
              }];
              var source = this.createDataSource({
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }, {
                  selector: 'field3',
                  isExpanded: true
                }, {
                  selector: 'field4',
                  isExpanded: true
                }],
                store: array,
                pageSize: 10
              });
              source.pageIndex(1);
              source.load();
              assert.equal(source.totalItemsCount(), 15);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 3,
                items: [{
                  key: 4,
                  items: [{
                    key: 5,
                    items: [{
                      key: 6,
                      items: [array[2]]
                    }]
                  }]
                }]
              }]);
            });
            QUnit.test('Four groups with paging after collapse group', function(assert) {
              var array = [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4,
                field5: 5
              }, {
                field1: 2,
                field2: 3,
                field3: 4,
                field4: 5,
                field5: 6
              }, {
                field1: 3,
                field2: 4,
                field3: 5,
                field4: 6,
                field5: 7
              }];
              var source = this.createDataSource({
                group: [{
                  selector: 'field1',
                  isExpanded: true
                }, {
                  selector: 'field2',
                  isExpanded: true
                }, {
                  selector: 'field3',
                  isExpanded: true
                }, {
                  selector: 'field4',
                  isExpanded: true
                }],
                store: array,
                pageSize: 10
              });
              source.pageIndex(1);
              source.load();
              source.changeRowExpand([1]);
              source.load();
              assert.equal(source.totalItemsCount(), 15);
              assert.deepEqual(this.processItems(source.items()), [{
                key: 3,
                isContinuation: true,
                items: [{
                  key: 4,
                  isContinuation: true,
                  items: [{
                    key: 5,
                    isContinuation: true,
                    items: [{
                      key: 6,
                      isContinuation: true,
                      items: [array[2]]
                    }]
                  }]
                }]
              }]);
            });
          });
        });
      });
      QUnit.module('Summary', {beforeEach: function() {
          this.createDataSource = function(options) {
            return createDataSource($.extend({
              store: TEN_NUMBERS,
              pageSize: 3,
              paginate: true,
              remoteOperations: 'auto',
              requireTotalCount: true
            }, options));
          };
        }}, function() {
        QUnit.test('Total summary without grouping', function(assert) {
          var dataSource = this.createDataSource({});
          dataSource.summary({totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}]});
          dataSource.load();
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
        QUnit.test('Total summary and group summary', function(assert) {
          var dataSource = this.createDataSource({group: 'this'});
          dataSource.summary({
            totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}],
            groupAggregates: [{aggregator: 'count'}]
          });
          dataSource.load();
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.items()[0], {
            key: 1,
            aggregates: [1],
            items: null
          });
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
        QUnit.test('Total summary and group summary when map defines', function(assert) {
          var dataSource = this.createDataSource({
            group: 'this',
            map: function(data) {
              return data;
            }
          });
          dataSource.summary({
            totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}],
            groupAggregates: [{aggregator: 'count'}]
          });
          dataSource.load();
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.items()[0], {
            key: 1,
            aggregates: [1],
            items: null
          });
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
        QUnit.test('Total summary with CustomStore when remoteOperations filtering and sorting', function(assert) {
          var storeLoadOptions;
          var dataSource = this.createDataSource({
            filter: ['this', '>=', 0],
            sort: 'this',
            store: new CustomStore({load: function(options) {
                storeLoadOptions = options;
                return TEN_NUMBERS;
              }}),
            remoteOperations: {
              filtering: true,
              sorting: true
            }
          });
          dataSource.summary({totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}]});
          dataSource.load();
          assert.ok(storeLoadOptions.filter);
          assert.ok(storeLoadOptions.sort);
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
        QUnit.test('Total summary with CustomStore when remoteOperations false', function(assert) {
          var storeLoadOptions;
          var dataSource = this.createDataSource({
            filter: ['this', '>=', 0],
            sort: 'this',
            store: new CustomStore({load: function(options) {
                storeLoadOptions = options;
                return TEN_NUMBERS;
              }}),
            remoteOperations: false
          });
          dataSource.summary({totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}]});
          dataSource.load();
          assert.ok(!storeLoadOptions.filter);
          assert.ok(!storeLoadOptions.sort);
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
        QUnit.test('Total summary and group summary with CustomStore', function(assert) {
          var dataSource = this.createDataSource({
            group: 'this',
            remoteOperations: false,
            store: new CustomStore({load: function() {
                return TEN_NUMBERS;
              }})
          });
          dataSource.summary({
            totalAggregates: [{aggregator: 'count'}, {aggregator: 'sum'}],
            groupAggregates: [{aggregator: 'count'}]
          });
          dataSource.load();
          assert.strictEqual(dataSource.items().length, 3);
          assert.deepEqual(dataSource.items()[0], {
            key: 1,
            aggregates: [1],
            items: null
          });
          assert.deepEqual(dataSource.totalAggregates(), [10, 55]);
        });
      });
      QUnit.module('Cache', {
        beforeEach: function() {
          this.createDataSource = function(options) {
            var that = this;
            that.loadingCount = 0;
            return createDataSource($.extend({
              store: {
                onLoading: function(e) {
                  that.loadingCount++;
                },
                type: 'array',
                data: TEN_NUMBERS.slice()
              },
              pageSize: 3,
              paginate: true,
              remoteOperations: false,
              requireTotalCount: true
            }, options));
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          TEN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          this.clock.restore();
        }
      }, function() {
        QUnit.test('caching when all remoteOperations', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }});
          dataSource.load();
          dataSource.load();
          dataSource.reload();
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('caching pages when all remoteOperations', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: true});
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          this.loadingCount = 0;
          dataSource.pageIndex(0);
          dataSource.load();
          assert.deepEqual(this.loadingCount, 0, 'no loading');
          assert.deepEqual(dataSource.items(), [1, 2, 3], 'items are correct');
        });
        QUnit.test('not reset pages cache on pageSize change when all remoteOperations', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: true});
          dataSource.load();
          this.loadingCount = 0;
          dataSource.pageSize(2);
          dataSource.load();
          assert.deepEqual(this.loadingCount, 0, 'data is loaded from cache');
          assert.deepEqual(dataSource.items(), [1, 2], 'items are correct');
        });
        QUnit.test('reset pages cache on filtering change when all remoteOperations', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: true});
          dataSource.load();
          this.loadingCount = 0;
          dataSource.filter(['this', '>', '4']);
          dataSource.load();
          assert.deepEqual(this.loadingCount, 1, 'one loading');
          assert.deepEqual(dataSource.items(), [5, 6, 7], 'items are correct');
        });
        QUnit.test('caching totalCount and summary on paging when all remoteOperations', function(assert) {
          var that = this;
          that.loadingArgs = [];
          var dataSource = this.createDataSource({
            load: function(options) {
              that.loadingArgs.push(options);
              var data = TEN_NUMBERS.slice(options.skip, options.skip + options.take);
              return $.Deferred().resolve(data, {
                totalCount: options.requireTotalCount ? TEN_NUMBERS.length : -1,
                summary: options.totalSummary ? [666] : null
              });
            },
            remoteOperations: true
          });
          dataSource.summary({totalAggregates: [{
              selector: 'this',
              aggregator: 'sum'
            }]});
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          assert.deepEqual(this.loadingArgs.length, 2, 'two loading');
          assert.deepEqual(this.loadingArgs[0].requireTotalCount, true, 'requireTotalCount for first page');
          assert.deepEqual(this.loadingArgs[0].totalSummary, [{
            selector: 'this',
            aggregator: 'sum'
          }], 'totalSummary for first page');
          assert.deepEqual(this.loadingArgs[1].requireTotalCount, undefined, 'no requireTotalCount for second page');
          assert.deepEqual(this.loadingArgs[1].totalSummary, undefined, 'no totalSummary for second page');
        });
        [false, true].forEach(function(groupPaging) {
          QUnit.test('caching pages when remote ' + (groupPaging ? 'group paging' : 'grouping'), function(assert) {
            var that = this;
            that.loadingArgs = [];
            var dataSource = createDataSourceWithRemoteGrouping({
              store: {
                onLoading: function(e) {
                  that.loadingArgs.push(e);
                },
                type: 'array',
                data: TEN_NUMBERS
              },
              paginate: true,
              requireTotalCount: true,
              pageSize: 3,
              group: ['this']
            }, groupPaging);
            dataSource.load();
            dataSource.changeRowExpand([1]);
            dataSource.load();
            dataSource.pageIndex(1);
            dataSource.load();
            assert.deepEqual(this.loadingArgs.length, groupPaging ? 4 : 2, 'loading count before cache');
            this.loadingArgs = [];
            dataSource.pageIndex(0);
            dataSource.load();
            assert.deepEqual(this.loadingArgs.length, 0, 'no loading');
            assert.deepEqual(dataSource.items(), [{
              key: 1,
              items: [1]
            }, {
              key: 2,
              items: null
            }], 'items are correct');
            assert.deepEqual(dataSource.totalItemsCount(), 11, 'totalCount');
          });
        });
        QUnit.test('no caching when cacheEnabled false', function(assert) {
          var dataSource = this.createDataSource({cacheEnabled: false});
          dataSource.load();
          dataSource.load();
          dataSource.reload();
          assert.deepEqual(this.loadingCount, 3, 'three loading');
        });
        QUnit.test('second load from cache after change filter/sort', function(assert) {
          var dataSource = this.createDataSource({});
          dataSource.load();
          dataSource.sort({
            selector: 'this',
            desc: true
          });
          dataSource.filter(['this', '>', 5]);
          dataSource.load();
          assert.strictEqual(dataSource.items().length, 3, 'item Count');
          assert.strictEqual(dataSource.items()[0], 10, 'first item');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('full reload reset cache', function(assert) {
          var dataSource = this.createDataSource({});
          dataSource.load();
          dataSource.filter(['this', '>', 5]);
          dataSource.reload(true);
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'two loading');
        });
        QUnit.test('reload from original dataSource reset cache', function(assert) {
          var dataSource = this.createDataSource({});
          dataSource.load();
          dataSource.filter(['this', '>', 5]);
          dataSource._dataSource.reload();
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'two loading');
        });
        QUnit.test('load from cache when remote filtering is not changed and pageIndex is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {filtering: true}});
          dataSource.filter(['this', '<', 5]);
          dataSource.load();
          dataSource.filter(['this', '<', 5]);
          dataSource.pageIndex(1);
          dataSource.load();
          assert.deepEqual(dataSource.items()[0], 4, 'first item on page');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('load from cache when pageSize and pageIndex is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {filtering: true}});
          dataSource.load();
          dataSource.pageSize(4);
          dataSource.pageIndex(1);
          dataSource.reload();
          assert.deepEqual(dataSource.items()[0], 5, 'first item on page');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('load from cache when remote paging but summary exists and pageIndex is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {
              filtering: true,
              paging: true
            }});
          dataSource.summary({totalAggregates: [{
              selector: 'this',
              aggregator: 'count'
            }, {
              selector: 'this',
              aggregator: 'sum'
            }]});
          dataSource.load();
          assert.deepEqual(this.loadingCount, 1, 'one loading');
          dataSource.pageSize(4);
          dataSource.pageIndex(1);
          dataSource.reload();
          assert.deepEqual(dataSource.items()[0], 5, 'first item on page');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
          assert.deepEqual(dataSource.totalAggregates(), [10, 55], 'total aggregates');
        });
        QUnit.test('reset cache when remote filtering is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {filtering: true}});
          dataSource.filter(['this', '>', 5]);
          dataSource.load();
          dataSource.filter(['this', '>', 6]);
          dataSource.reload();
          assert.deepEqual(dataSource.items()[0], 7, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 4, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'one loading');
        });
        QUnit.test('reset cache when remote sorting is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {sorting: true}});
          dataSource.load();
          dataSource.sort({
            selector: 'this',
            desc: true
          });
          dataSource.reload();
          assert.deepEqual(dataSource.items()[0], 10, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'one loading');
        });
        QUnit.test('reset cache when remote sorting is not changed and grouping is changed', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {sorting: true}});
          dataSource.load();
          dataSource.group({
            selector: 'this',
            desc: true
          });
          dataSource.reload();
          assert.deepEqual(dataSource.items()[0], {
            key: 10,
            items: null
          }, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('update cache on push', function(assert) {
          var dataSource = this.createDataSource({reshapeOnPush: true});
          dataSource.load();
          this.clock.tick(10);
          dataSource.store().push([{
            type: 'remove',
            key: 1
          }]);
          this.clock.tick(10);
          assert.deepEqual(dataSource.items()[0], 2, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 9, 'totalCount is refreshed');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('update cache on push without reshapeOnPush', function(assert) {
          var dataSource = this.createDataSource({pushAggregationTimeout: 0});
          dataSource.load();
          this.clock.tick(10);
          dataSource.store().push([{
            type: 'remove',
            key: 1
          }]);
          this.clock.tick(10);
          assert.deepEqual(dataSource.items()[0], 2, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount is not refreshed');
          assert.deepEqual(this.loadingCount, 1, 'one loading');
        });
        QUnit.test('load summary from cache on paging for local array (T1042990)', function(assert) {
          var array = [1, 2, 3, 4];
          var dataSource = this.createDataSource({store: array});
          var stepCount = 0;
          dataSource.summary({totalAggregates: [{aggregator: {
                seed: 0,
                step: function(a, b) {
                  stepCount++;
                  return a + b;
                }
              }}]});
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 4, 'summary is calculated');
          dataSource.pageIndex(1);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 4, 'summary is not recalculated');
          assert.deepEqual(dataSource.items()[0], 4, 'first item on page');
          assert.deepEqual(dataSource.totalCount(), 4, 'totalCount');
          assert.deepEqual(dataSource.totalAggregates(), [10], 'totalAggregates');
        });
        QUnit.test('do not load summary from cache on paging for local array if group summary is defined (T1042990)', function(assert) {
          var array = [1, 2, 3, 4];
          var dataSource = this.createDataSource({
            store: array,
            group: 'this'
          });
          var stepCount = 0;
          dataSource.summary({
            totalAggregates: [{aggregator: {
                seed: 0,
                step: function(a, b) {
                  stepCount++;
                  return a + b;
                }
              }}],
            groupAggregates: [{aggregator: 'count'}]
          });
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 4, 'summary is calculated');
          dataSource.pageIndex(1);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 8, 'summary is recalculated');
          assert.deepEqual(dataSource.items()[0].key, 4, 'first item key on page');
          assert.deepEqual(dataSource.items()[0].aggregates, [1], 'first item aggregates on page');
          assert.deepEqual(dataSource.totalCount(), 4, 'totalCount');
          assert.deepEqual(dataSource.totalAggregates(), [10], 'totalAggregates');
        });
        QUnit.test('calculate summary on load without operations for local array', function(assert) {
          var array = [1, 2, 3, 4];
          var dataSource = this.createDataSource({store: array});
          var stepCount = 0;
          dataSource.summary({totalAggregates: [{aggregator: {
                seed: 0,
                step: function(a, b) {
                  stepCount++;
                  return a + b;
                }
              }}]});
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 4, 'summary is calculated');
          dataSource.load();
          this.clock.tick(10);
          assert.equal(stepCount, 8, 'summary is recalculated');
          assert.deepEqual(dataSource.totalCount(), 4, 'totalCount');
          assert.deepEqual(dataSource.totalAggregates(), [10], 'totalAggregates');
        });
        QUnit.test('New mode. Data should be loaded from the cache with the same load params', function(assert) {
          var dataSource = this.createDataSource({
            remoteOperations: {
              paging: true,
              sorting: true
            },
            scrolling: {
              legacyMode: false,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            }
          });
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 1, 'first load');
          dataSource.pageIndex(1);
          dataSource.loadPageCount(2);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'second load');
          assert.deepEqual(dataSource.items(), [4, 5, 6, 7, 8, 9], 'items on the second load');
          dataSource.pageIndex(2);
          dataSource.loadPageCount(1);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'data is loaded from cache');
          assert.deepEqual(dataSource.items(), [7, 8, 9], 'items on the third load');
          dataSource.pageIndex(1);
          dataSource.loadPageCount(2);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'data is loaded from cache');
          assert.deepEqual(dataSource.items(), [4, 5, 6, 7, 8, 9], 'items from cache');
        });
        QUnit.test('New mode. Data should be loaded from the cache with the same load params if remote groupPaging', function(assert) {
          var remoteGroupPaging = true;
          var array = [{
            group1: 1,
            group2: 1,
            id: 1
          }, {
            group1: 1,
            group2: 1,
            id: 2
          }, {
            group1: 1,
            group2: 1,
            id: 3
          }, {
            group1: 1,
            group2: 1,
            id: 4
          }, {
            group1: 1,
            group2: 2,
            id: 5
          }, {
            group1: 2,
            group2: 1,
            id: 6
          }];
          var dataSource = createDataSourceWithRemoteGrouping({
            store: array,
            paginate: true,
            pageSize: 2,
            requireTotalCount: true,
            requireGroupCount: true,
            group: ['group1', 'group2'],
            scrolling: {
              legacyMode: false,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            }
          }, remoteGroupPaging);
          dataSource.load();
          dataSource.changeRowExpand([1]);
          dataSource.load();
          dataSource.changeRowExpand([1, 1]);
          dataSource.load();
          dataSource.pageIndex(1);
          dataSource.load();
          dataSource.pageIndex(2);
          dataSource.load();
          this.loadingCount = 0;
          dataSource.pageIndex(1);
          dataSource.load();
          assert.equal(this.loadingCount, 0, 'no load during back scroll');
          assert.deepEqual(dataSource.items(), [{
            'isContinuation': true,
            'isContinuationOnNextPage': true,
            'items': [{
              'isContinuation': true,
              'isContinuationOnNextPage': true,
              'items': [array[0], array[1]],
              'key': 1
            }],
            'key': 1
          }], 'items on the second load');
          dataSource.pageIndex(0);
          dataSource.load();
          assert.equal(this.loadingCount, 0, 'no load during back scroll');
          assert.deepEqual(dataSource.items(), [{
            'isContinuationOnNextPage': true,
            'items': [{
              'items': [],
              'key': 1
            }],
            'key': 1
          }], 'items on the second load');
        });
        QUnit.test('New mode. Cache should not be reset when pageSize is changed', function(assert) {
          var dataSource = this.createDataSource({
            remoteOperations: {
              paging: true,
              sorting: true
            },
            scrolling: {
              legacyMode: false,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            }
          });
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 1, 'first load');
          assert.deepEqual(dataSource.items(), [1, 2, 3], 'items on the first load');
          dataSource.pageIndex(1);
          dataSource.loadPageCount(2);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'second load');
          assert.deepEqual(dataSource.items(), [4, 5, 6, 7, 8, 9], 'items on the second load');
          dataSource.pageIndex(0);
          dataSource.pageSize(2);
          dataSource.loadPageCount(1);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'data is loaded from the cache');
          assert.deepEqual(dataSource.items(), [1, 2], 'new loaded items for the first page');
        });
        QUnit.test('New mode. Data should be loaded without the cache', function(assert) {
          var dataSource = this.createDataSource({
            remoteOperations: {
              paging: true,
              sorting: true
            },
            scrolling: {
              legacyMode: false,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            },
            cacheEnabled: false
          });
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 1, 'first load');
          dataSource.pageIndex(1);
          dataSource.loadPageCount(2);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 2, 'second load');
          assert.deepEqual(dataSource.items(), [4, 5, 6, 7, 8, 9], 'items on the second load');
          dataSource.pageIndex(2);
          dataSource.loadPageCount(1);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 3, 'third load');
          assert.deepEqual(dataSource.items(), [7, 8, 9], 'items on the third load');
          dataSource.pageIndex(1);
          dataSource.loadPageCount(2);
          dataSource.load();
          this.clock.tick(10);
          assert.equal(this.loadingCount, 4, 'fourth load');
          assert.deepEqual(dataSource.items(), [4, 5, 6, 7, 8, 9], 'items on the fourth load');
        });
      });
      QUnit.module('Custom Load', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.createDataSource = function(options) {
            var that = this;
            that.loadingCount = 0;
            return (options.remoteOperations === true ? createDataSourceWithRemoteGrouping : createDataSource)($.extend({
              store: {
                onLoading: function(e) {
                  if (e.group && e.group.length === 1 && e.group[0].selector === 'this' && e.group[0].groupInterval) {
                    e.group[0].selector = function(data) {
                      return Math.floor(data / e.group[0].groupInterval);
                    };
                  }
                  that.loadingCount++;
                },
                type: 'array',
                data: TEN_NUMBERS
              },
              pageSize: 3,
              paginate: true,
              remoteOperations: false,
              requireTotalCount: true
            }, options));
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('load when loadingTimeout is defined', function(assert) {
          var dataSource = this.createDataSource({loadingTimeout: 10});
          dataSource.load();
          this.clock.tick(10);
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          dataSource.load({filter: ['this', '>', 8]}).done(function(data) {
            customLoadData = data;
          });
          this.clock.tick(9);
          assert.ok(!customLoadData, 'custom load data is not loaded');
          assert.deepEqual(loadingChangedArgs, [true], 'loadingChanged args when data is not loaded');
          this.clock.tick(1);
          assert.deepEqual(customLoadData, [9, 10], 'custom load data');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
        });
        QUnit.test('load without cache with group/filter/paging options', function(assert) {
          var dataSource = this.createDataSource({
            filter: ['this', '>', '5'],
            remoteOperations: {filtering: true}
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          dataSource.load({
            filter: ['this', '>', '1'],
            group: 'this',
            skip: 2,
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 4,
            items: [4]
          }, {
            key: 5,
            items: [5]
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [6, 7, 8], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'loading count');
        });
        QUnit.test('load from cache with group/filter/paging options', function(assert) {
          var dataSource = this.createDataSource({
            filter: ['this', '>', '5'],
            remoteOperations: {filtering: true}
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          dataSource.load({
            filter: ['this', '>', '5'],
            group: 'this',
            skip: 2,
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 8,
            items: [8]
          }, {
            key: 9,
            items: [9]
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [6, 7, 8], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load from cache with group as function options', function(assert) {
          var dataSource = this.createDataSource({
            group: [{
              selector: 'this',
              desc: false
            }],
            remoteOperations: false
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          dataSource.load({group: function(data) {
              return data % 2;
            }}).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 0,
            items: [2, 4, 6, 8, 10]
          }, {
            key: 1,
            items: [1, 3, 5, 7, 9]
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load when remote grouping and not isLoadingAll', function(assert) {
          var dataSource = this.createDataSource({
            filter: ['this', '>', '5'],
            remoteOperations: true
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.load({
            filter: ['this', '>', '5'],
            group: 'this',
            skip: 2,
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 8,
            items: null,
            count: 1
          }, {
            key: 9,
            items: null,
            count: 1
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [6, 7, 8], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load when remote grouping and first page', function(assert) {
          var dataSource = this.createDataSource({
            group: 'this',
            remoteOperations: true,
            pageSize: 3
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.load({
            group: 'this',
            skip: 0,
            take: 3
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 1,
            items: null,
            count: 1
          }, {
            key: 2,
            items: null,
            count: 1
          }, {
            key: 3,
            items: null,
            count: 1
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 0, 'loading count');
        });
        QUnit.test('load when remote grouping and second page', function(assert) {
          var dataSource = this.createDataSource({
            group: 'this',
            remoteOperations: true
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.load({
            group: 'this',
            skip: 2,
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 3,
            items: null,
            count: 1
          }, {
            key: 4,
            items: null,
            count: 1
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load when remote grouping and groupInterval is defined', function(assert) {
          var dataSource = this.createDataSource({
            group: 'this',
            remoteOperations: true,
            pageSize: 3
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.load({
            group: [{
              selector: 'this',
              groupInterval: 2
            }],
            skip: 0,
            take: 3
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 0,
            items: null,
            count: 1
          }, {
            key: 1,
            items: null,
            count: 2
          }, {
            key: 2,
            items: null,
            count: 2
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [{
            key: 1,
            items: null
          }, {
            key: 2,
            items: null
          }, {
            key: 3,
            items: null
          }], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load when remote summary and summary is not defined', function(assert) {
          var dataSource = this.createDataSource({remoteOperations: {summary: true}});
          dataSource.load();
          var customLoadData = false;
          dataSource.load({
            filter: ['this', '>=', '5'],
            group: 'this',
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 5,
            items: [5]
          }, {
            key: 6,
            items: [6]
          }], 'custom load data');
          assert.deepEqual(dataSource.items(), [1, 2, 3], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
        });
        QUnit.test('load when remote grouping and not isLoadingAll and expand one item', function(assert) {
          var dataSource = this.createDataSource({
            filter: ['this', '>', '5'],
            remoteOperations: true,
            group: 'this'
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          var loadingArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.changeRowExpand([6]);
          dataSource.store().on('loading', function(e) {
            loadingArgs.push(e);
          });
          dataSource.load().done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 6,
            items: [6],
            count: 1
          }, {
            key: 7,
            items: null,
            collapsedItems: null,
            count: 1
          }], 'custom load data');
          assert.equal(changedArgs.length, 1, 'changed is fired');
          assert.deepEqual(loadingChangedArgs, [true, false, true, false], 'loadingChanged args');
          assert.deepEqual(loadingArgs, [{
            group: null,
            requireTotalCount: false,
            requireGroupCount: false,
            searchOperation: 'contains',
            searchValue: null,
            userData: {},
            sort: [{
              selector: 'this',
              desc: false
            }],
            filter: [['this', '>', '5'], 'and', ['this', '=', 6]],
            skip: undefined,
            take: undefined
          }], 'loading args');
          assert.deepEqual(dataSource.items(), [{
            key: 6,
            items: [6]
          }, {
            key: 7,
            items: null
          }], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 1, 'loading count');
        });
        QUnit.test('load when remote grouping and isLoadingAll', function(assert) {
          var dataSource = this.createDataSource({
            filter: ['this', '>', '5'],
            remoteOperations: true
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          this.loadingCount = 0;
          dataSource.load({
            isLoadingAll: true,
            filter: ['this', '>', '5'],
            group: 'this'
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [6, 7, 8, 9, 10].map(function(key) {
            return {
              key: key,
              items: [key],
              count: 1
            };
          }), 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [6, 7, 8], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 5, 'totalCount');
          assert.deepEqual(this.loadingCount, 2, 'loading count');
        });
        QUnit.test('load with group and paging options', function(assert) {
          var loadingCount = 0;
          var dataSource = this.createDataSource({
            store: {
              onLoading: function() {
                loadingCount++;
              },
              type: 'array',
              data: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
            },
            pageSize: 5,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            }
          });
          dataSource.load();
          var changedArgs = [];
          var loadingChangedArgs = [];
          dataSource.changed.add(function(e) {
            changedArgs.push(e);
          });
          dataSource.loadingChanged.add(function(e) {
            loadingChangedArgs.push(e);
          });
          var customLoadData = false;
          dataSource.load({
            group: 'this',
            skip: 2,
            take: 2
          }).done(function(data) {
            customLoadData = data;
          });
          assert.deepEqual(customLoadData, [{
            key: 3,
            items: [3, 3]
          }, {
            key: 4,
            items: [4, 4]
          }], 'custom load data');
          assert.ok(!changedArgs.length, 'changed is not fired');
          assert.deepEqual(loadingChangedArgs, [true, false], 'loadingChanged args');
          assert.deepEqual(dataSource.items(), [1, 1, 2, 2, 3], 'items on page');
          assert.deepEqual(dataSource.totalCount(), 10, 'totalCount');
          assert.deepEqual(loadingCount, 2, 'loading count');
        });
      });
      QUnit.module('New virtual scrolling mode', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.createDataSource = function(options) {
            return createDataSource($.extend({
              store: TEN_NUMBERS,
              paginate: true,
              scrolling: {
                legacyMode: false,
                mode: 'virtual',
                rowRenderingMode: 'virtual'
              },
              remoteOperations: {
                filtering: true,
                sorting: true,
                paging: true
              }
            }, options));
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('loadPageCount affects the skip and take parameter', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var dataLoadingHandler = dataSource._customizeStoreLoadOptionsHandler;
          var takeValues = [];
          var skipValues = [];
          dataSource._customizeStoreLoadOptionsHandler = function(options) {
            dataLoadingHandler.apply(dataSource, arguments);
            skipValues.push(options.storeLoadOptions.skip);
            takeValues.push(options.storeLoadOptions.take);
          };
          dataSource._dataSource.off('customizeStoreLoadOptions', dataLoadingHandler);
          dataSource._dataSource.on('customizeStoreLoadOptions', dataSource._customizeStoreLoadOptionsHandler);
          try {
            dataSource.loadPageCount(2);
            dataSource.load();
            assert.strictEqual(skipValues[0], 0, 'first skip value');
            assert.strictEqual(takeValues[0], 6, 'first take value');
            assert.deepEqual(dataSource.items(), TEN_NUMBERS.slice(0, 6), 'first load items');
            dataSource.loadPageCount(3);
            dataSource.load();
            assert.strictEqual(skipValues[1], 6, 'second skip value');
            assert.strictEqual(takeValues[1], 3, 'second take value');
            assert.deepEqual(dataSource.items(), TEN_NUMBERS.slice(0, 9), 'second load items');
          } finally {
            dataSource._dataSource.off('customizeStoreLoadOptions', dataSource._dataLoadingHandler);
            dataSource._dataSource.on('customizeStoreLoadOptions', dataLoadingHandler);
          }
        });
        QUnit.test('startLoadTime was not initialized when loadingChanged is raised', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var loadingChangeHandler = dataSource._loadingChangedHandler;
          var startLoadTimeValues = [];
          dataSource._loadingChangedHandler = function() {
            loadingChangeHandler.apply(dataSource, arguments);
            startLoadTimeValues.push(dataSource._startLoadTime);
          };
          dataSource._dataSource.off('loadingChanged', loadingChangeHandler);
          dataSource._dataSource.on('loadingChanged', dataSource._loadingChangedHandler);
          try {
            dataSource.load();
            assert.strictEqual(startLoadTimeValues.length, 2, 'change handler call count');
            assert.notOk(startLoadTimeValues[0], 'not initizlized on the first call');
            assert.notOk(startLoadTimeValues[1], 'not initizlized on the second call');
          } finally {
            dataSource._dataSource.off('loadingChanged', dataSource._loadingChangedHandler);
            dataSource._dataSource.on('loadingChanged', loadingChangeHandler);
          }
        });
        QUnit.test('VirtualScrollController.handleDataChanged is not called when data is loaded', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var handleDataChangedSpy = sinon.spy(dataSource._virtualScrollController, 'handleDataChanged');
          try {
            dataSource.load();
            assert.notOk(handleDataChangedSpy.called, 'not called');
          } finally {
            handleDataChangedSpy.restore();
          }
        });
        QUnit.test('VirtualScrollController.load is not called when data is loaded', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var loadSpy = sinon.spy(dataSource._virtualScrollController, 'load');
          try {
            dataSource.load();
            assert.notOk(loadSpy.called, 'not called');
          } finally {
            loadSpy.restore();
          }
        });
        QUnit.test('resetPagesCache is not called when row is expanded', function(assert) {
          var dataSource = this.createDataSource({
            pageSize: 3,
            group: 't'
          });
          var resetPagesCacheSpy = sinon.spy(dataSource, 'resetPagesCache');
          try {
            dataSource.changeRowExpand([1]);
            assert.notOk(resetPagesCacheSpy.called, 'not called');
          } finally {
            resetPagesCacheSpy.restore();
          }
        });
        QUnit.test('VirtualScrollController.getDelayDeferred is not called on reload', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var getDelayDeferredSpy = sinon.spy(dataSource._virtualScrollController, 'getDelayDeferred');
          try {
            dataSource.reload();
            assert.notOk(getDelayDeferredSpy.called, 'not called');
          } finally {
            getDelayDeferredSpy.restore();
          }
        });
        QUnit.test('VirtualScrollController.reset is not called on refresh', function(assert) {
          var dataSource = this.createDataSource({pageSize: 3});
          var resetSpy = sinon.spy(dataSource._virtualScrollController, 'reset');
          try {
            dataSource.refresh({storeLoadOptions: {}}, {reload: true});
            assert.notOk(resetSpy.called, 'not called');
          } finally {
            resetSpy.restore();
          }
        });
        QUnit.test('loadingChanged should not fire when loading is failed', function(assert) {
          var dataSource = createDataSource({
            store: new CustomStore({
              key: 'id',
              load: function() {
                return $.Deferred().reject().promise();
              }
            }),
            scrolling: {
              legacyMode: false,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            }
          });
          var fireSpy = sinon.spy(dataSource.loadingChanged, 'fire');
          try {
            dataSource.load();
            assert.equal(fireSpy.callCount, 2, 'called twice');
          } finally {
            fireSpy.restore();
          }
        });
        QUnit.test('dataSource adapter should have copy of dataSource items', function(assert) {
          var items = [{id: 1}];
          var dataSource = createDataSource({
            store: [{id: 1}],
            scrolling: {legacyMode: false}
          });
          dataSource.load();
          assert.notEqual(dataSource.items(), dataSource._dataSource.items(), 'dataSourceAdapter have copy of items');
          assert.deepEqual(dataSource.items(), items, 'dataSourceAdapter items');
          assert.deepEqual(dataSource._dataSource.items(), items, 'dataSource items');
        });
      });
      QUnit.module('DataSource with diacritical marks', {
        beforeEach: function() {
          this.array = [{
            id: 1,
            city: 'izmir'
          }, {
            id: 2,
            city: 'İzmi̇r'
          }, {
            id: 3,
            city: 'İZMİR'
          }];
          this.langParams = {};
          this.createDataSource = function(options) {
            return createDataSource($.extend({
              store: this.array,
              langParams: this.langParams
            }, options));
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        [true, false].forEach(function(remoteOperations) {
          ['no base', 'base'].forEach(function(sensitivity) {
            QUnit.test(("Filtering with remoteOperations = " + remoteOperations + ", locale = 'en-US' and sensitivity=" + sensitivity), function(assert) {
              this.langParams.collatorOptions = {sensitivity: sensitivity};
              this.langParams.locale = 'en-US';
              var dataSource = this.createDataSource({remoteOperations: remoteOperations});
              dataSource.filter(['city', '=', 'İZMİR']);
              dataSource.load();
              if (sensitivity === 'base') {
                assert.strictEqual(dataSource.items().length, 3, 'item count');
                assert.deepEqual(dataSource.items()[0], {
                  id: 1,
                  city: 'izmir'
                }, 'first item');
                assert.deepEqual(dataSource.items()[1], {
                  id: 2,
                  city: 'İzmi̇r'
                }, 'second item');
                assert.deepEqual(dataSource.items()[2], {
                  id: 3,
                  city: 'İZMİR'
                }, 'third item');
              } else {
                assert.strictEqual(dataSource.items().length, 2, 'item count');
                assert.deepEqual(dataSource.items()[0], {
                  id: 2,
                  city: 'İzmi̇r'
                }, 'first item');
                assert.deepEqual(dataSource.items()[1], {
                  id: 3,
                  city: 'İZMİR'
                }, 'second item');
              }
            });
            QUnit.test(("Filtering with remoteOperations = " + remoteOperations + ", locale = 'tr' and sensitivity=" + sensitivity), function(assert) {
              this.langParams.collatorOptions = {sensitivity: sensitivity};
              this.langParams.locale = 'tr';
              var dataSource = this.createDataSource({remoteOperations: remoteOperations});
              dataSource.filter(['city', '=', 'İZMİR']);
              dataSource.load();
              if (sensitivity === 'base') {
                assert.strictEqual(dataSource.items().length, 1, 'item count');
                assert.deepEqual(dataSource.items()[0], {
                  id: 3,
                  city: 'İZMİR'
                }, 'first item');
              } else {
                assert.strictEqual(dataSource.items().length, 2, 'item count');
                assert.deepEqual(dataSource.items()[0], {
                  id: 1,
                  city: 'izmir'
                }, 'first item');
                assert.deepEqual(dataSource.items()[1], {
                  id: 3,
                  city: 'İZMİR'
                }, 'second item');
              }
            });
          });
          QUnit.test(("Sorting with remoteOperations = " + remoteOperations + " and locale = 'en-US'"), function(assert) {
            this.langParams.locale = 'en-US';
            this.langParams.collatorOptions = {caseFirst: 'upper'};
            var dataSource = this.createDataSource({remoteOperations: remoteOperations});
            dataSource.sort('city');
            dataSource.load();
            assert.deepEqual(dataSource.items()[0], {
              id: 1,
              city: 'izmir'
            }, 'first item');
            assert.deepEqual(dataSource.items()[1], {
              id: 3,
              city: 'İZMİR'
            }, 'second item');
            assert.deepEqual(dataSource.items()[2], {
              id: 2,
              city: 'İzmi̇r'
            }, 'third item');
          });
          QUnit.test(("Sorting with remoteOperations = " + remoteOperations + " and locale = 'tr'"), function(assert) {
            this.langParams.locale = 'tr';
            this.langParams.collatorOptions = {caseFirst: 'upper'};
            var dataSource = this.createDataSource({remoteOperations: remoteOperations});
            dataSource.sort('city');
            dataSource.load();
            assert.deepEqual(dataSource.items()[0], {
              id: 3,
              city: 'İZMİR'
            }, 'first item');
            assert.deepEqual(dataSource.items()[1], {
              id: 1,
              city: 'izmir'
            }, 'second item');
            assert.deepEqual(dataSource.items()[2], {
              id: 2,
              city: 'İzmi̇r'
            }, 'third item');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/console","data/data_source/data_source","data/array_store","data/custom_store","data/odata/store","data/query","data/store_helper","ui/data_grid/ui.data_grid.core","../../helpers/dataGridMocks.js","ui/data_grid/ui.data_grid.grouping.expanded","ui/data_grid/ui.data_grid.grouping.core","ui/data_grid/ui.data_grid.grouping.collapsed","ui/data_grid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/console"), require("data/data_source/data_source"), require("data/array_store"), require("data/custom_store"), require("data/odata/store"), require("data/query"), require("data/store_helper"), require("ui/data_grid/ui.data_grid.core"), require("../../helpers/dataGridMocks.js"), require("ui/data_grid/ui.data_grid.grouping.expanded"), require("ui/data_grid/ui.data_grid.grouping.core"), require("ui/data_grid/ui.data_grid.grouping.collapsed"), require("ui/data_grid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataSource.tests.js.map