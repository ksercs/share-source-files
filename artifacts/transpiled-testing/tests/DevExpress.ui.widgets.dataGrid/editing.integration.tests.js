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

(["testing/tests/DevExpress.ui.widgets.dataGrid/editing.integration.tests.js"], ["jquery","core/devices","animation/fx","events/pointer","ui/themes","core/utils/type","data/data_source/data_source","ui/select_box","ui/text_area","core/config","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/utils/common","../../helpers/wrappers/dataGridWrappers.js","ui/drop_down_box","../../helpers/grid/keyboardNavigationHelper.js","../../helpers/dataGridHelper.js","../../helpers/dataGridMocks.js","core/utils/size","../../helpers/stylesHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/editing.integration.tests.js", ["jquery", "core/devices", "animation/fx", "events/pointer", "ui/themes", "core/utils/type", "data/data_source/data_source", "ui/select_box", "ui/text_area", "core/config", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "core/utils/common", "../../helpers/wrappers/dataGridWrappers.js", "ui/drop_down_box", "../../helpers/grid/keyboardNavigationHelper.js", "../../helpers/dataGridHelper.js", "../../helpers/dataGridMocks.js", "core/utils/size", "../../helpers/stylesHelper.js"], function($__export) {
  "use strict";
  var $,
      devices,
      fx,
      pointerEvents,
      themes,
      typeUtils,
      DataSource,
      SelectBox,
      config,
      keyboardMock,
      pointerMock,
      commonUtils,
      DataGridWrapper,
      CLICK_EVENT,
      createDataGrid,
      baseModuleConfig,
      generateItems,
      getOuterHeight,
      getEmulatorStyles,
      TEXTEDITOR_INPUT_SELECTOR,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      SelectBox = $__m.default;
    }, function($__m) {}, function($__m) {
      config = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {}, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      generateItems = $__m.generateItems;
    }, function($__m) {
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      getEmulatorStyles = $__m.getEmulatorStyles;
    }],
    execute: function() {
      TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      fx.off = true;
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n            <div id=\"dataGrid2\"></div>\n            <div id=\"form\"></div>\n        </div>\n    ";
        var markup = ("\n        <style nonce=\"qunit-test\">\n            .fixed-height {\n                height: 400px;\n            }\n            .qunit-fixture-auto-height {\n                position: static !important;\n                height: auto !important;\n            }\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n            " + getEmulatorStyles() + "\n        </style>\n\n        <!--qunit-fixture-->\n\n        " + gridMarkup + "\n\n        <script id=\"scriptTestTemplate1\" type=\"text/html\">\n            <span id=\"template1\">Template1</span>\n        </script>\n    ");
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Accessibility columns id should not set for columns editors (T710132)', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1', 'field2'],
            filterRow: {visible: true},
            headerFilter: {visible: true},
            searchPanel: {visible: true},
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            dataSource: [{
              field1: '1',
              field2: '2'
            }]
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          assert.equal($('.dx-texteditor [id]').length, 0, 'editors has no accessibility id');
        });
        QUnit.test('Command column accessibility structure', function(assert) {
          createDataGrid({
            columns: ['field1', 'field2'],
            editing: {
              mode: 'row',
              allowAdding: true
            }
          });
          assert.equal($('.dx-row.dx-header-row').eq(0).attr('role'), 'row');
          assert.equal($('.dx-header-row .dx-command-edit').eq(0).attr('role'), 'columnheader');
          assert.equal($('.dx-header-row .dx-command-edit').eq(0).attr('aria-colindex'), 3);
        });
        QUnit.test('Command buttons should contains aria-label accessibility attribute if rendered as icons (T755185)', function(assert) {
          var columnsWrapper = dataGridWrapper.columns;
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 0,
              c0: 'c0'
            }],
            columns: [{
              type: 'buttons',
              buttons: ['edit', 'delete', 'save', 'cancel']
            }, 'id'],
            editing: {
              allowUpdating: true,
              allowDeleting: true,
              useIcons: true
            }
          });
          this.clock.tick(10);
          columnsWrapper.getCommandButtons().each(function(_, button) {
            var ariaLabel = $(button).attr('aria-label');
            assert.ok(ariaLabel && ariaLabel.length, ("aria-label '" + ariaLabel + "'"));
          });
          dataGrid.editRow(0);
          columnsWrapper.getCommandButtons().each(function(_, button) {
            var ariaLabel = $(button).attr('aria-label');
            assert.ok(ariaLabel && ariaLabel.length, ("aria-label '" + ariaLabel + "'"));
          });
        });
        [false, true].forEach(function(useIcons) {
          QUnit.test(("Command buttons should be rendered with RTL when useIcons=" + useIcons + " (T915926)"), function(assert) {
            var columnsWrapper = dataGridWrapper.columns;
            var dataGrid = createDataGrid({
              rtlEnabled: true,
              dataSource: [{
                id: 0,
                c0: 'c0'
              }],
              editing: {
                allowUpdating: true,
                allowDeleting: true,
                useIcons: useIcons
              }
            });
            this.clock.tick(10);
            var $buttons = columnsWrapper.getCommandButtons();
            var $commandCell = $(dataGrid.getCellElement(0, 0));
            assert.ok($commandCell.length, 'command cell is rendered');
            assert.equal($commandCell.css('white-space'), 'nowrap', 'white-space style');
            assert.equal($buttons.length, 2, 'command buttons are rendered');
            $buttons.each(function(_, button) {
              assert.equal($(button).css('display'), 'inline-block', 'display style');
              assert.equal($(button).css('direction'), 'rtl', 'direction style');
            });
          });
          QUnit.test(("Edit command column should not wrap command buttons when useIcons=" + useIcons), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{}],
              editing: {
                allowUpdating: true,
                allowDeleting: true,
                useIcons: useIcons
              },
              columns: [{type: 'buttons'}]
            });
            this.clock.tick(10);
            var $commandCell = $(dataGrid.getCellElement(0, 0));
            assert.ok($commandCell.length, 'command cell is rendered');
            assert.equal($commandCell.css('white-space'), 'nowrap', 'white-space style');
          });
        });
        QUnit.test('The width of the text command button should not equal the width of the icon command button (T945472)', function(assert) {
          var columnsWrapper = dataGridWrapper.columns;
          createDataGrid({
            dataSource: [{
              id: 0,
              c0: 'c0'
            }],
            editing: {
              mode: 'row',
              allowUpdating: true,
              useIcons: true
            },
            columns: [{
              type: 'buttons',
              buttons: ['edit', {text: 'Custom'}]
            }]
          });
          this.clock.tick(10);
          var $buttons = columnsWrapper.getCommandButtons();
          assert.equal($buttons.length, 2, 'command buttons are rendered');
          assert.notEqual($buttons.eq(0).css('width'), $buttons.eq(1).css('width'), 'button widths are not equal');
        });
        QUnit.test('Undelete command buttons should contains aria-label accessibility attribute if rendered as icon and batch edit mode (T755185)', function(assert) {
          var columnsWrapper = dataGridWrapper.columns;
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 0,
              c0: 'c0'
            }],
            columns: [{
              type: 'buttons',
              buttons: ['undelete']
            }, 'id'],
            editing: {
              mode: 'batch',
              allowUpdating: true,
              allowDeleting: true,
              useIcons: true
            }
          });
          this.clock.tick(10);
          dataGrid.deleteRow(0);
          columnsWrapper.getCommandButtons().each(function(_, button) {
            var ariaLabel = $(button).attr('aria-label');
            assert.ok(ariaLabel && ariaLabel.length, ("aria-label '" + ariaLabel + "'"));
          });
        });
        QUnit.test('Custom button with asynchronious template should have correct position', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}],
            columns: ['id', {
              type: 'buttons',
              cssClass: 'my-buttons',
              buttons: [{
                cssClass: 'my-button1',
                template: 'button1'
              }, {
                text: 'Button2',
                cssClass: 'my-button2'
              }]
            }],
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {button1: {render: function($__4) {
                    var $__5 = $__4,
                        container = $__5.container,
                        model = $__5.model,
                        onRendered = $__5.onRendered;
                    setTimeout(function() {
                      $('<div>').addClass('my-button1').text('Button1').appendTo(container);
                      onRendered();
                    });
                    return container;
                  }}}}
          });
          this.clock.tick(10);
          var $commandCell = $(dataGrid.getCellElement(0, 1));
          assert.equal($commandCell.children('.my-button1').index(), 0, 'my-button1 position');
          assert.equal($commandCell.children('.my-button1').text(), 'Button1', 'my-button1 text');
          assert.equal($commandCell.children('.my-button2').index(), 1, 'my-button2 position');
        });
        QUnit.test('Command column with asynchronious button template should have correct width', function(assert) {
          var buttonWidth = 200;
          var dataGrid = createDataGrid({
            width: 500,
            dataSource: [{id: 1}],
            columns: ['id', {
              type: 'buttons',
              buttons: [{template: 'buttonTemplate'}]
            }],
            templatesRenderAsynchronously: true,
            integrationOptions: {templates: {buttonTemplate: {render: function($__4) {
                    var $__5 = $__4,
                        container = $__5.container,
                        model = $__5.model,
                        onRendered = $__5.onRendered;
                    setTimeout(function() {
                      $('<div>').css('width', buttonWidth).appendTo(container);
                      onRendered();
                    });
                    return container;
                  }}}}
          });
          this.clock.tick(10);
          var $commandCell = $(dataGrid.getCellElement(0, 1));
          assert.roughEqual($commandCell.width(), buttonWidth, 1.1, 'command cell width is correct');
        });
        QUnit.test('Should not cut border of selected cell by \'Add row\' (T748046)', function(assert) {
          var clock = sinon.useFakeTimers();
          var dataGrid = createDataGrid({
            width: 400,
            height: 200,
            showBorders: true,
            editing: {
              mode: 'cell',
              allowAdding: true
            },
            dataSource: $traceurRuntime.spread(new Array(20)).map(function(x, i) {
              return ({name: i});
            })
          });
          clock.tick(10);
          var scrollable = $('.dx-scrollable').dxScrollable('instance');
          scrollable.scrollTo({y: 5});
          clock.tick(10);
          dataGrid.addRow();
          clock.tick(10);
          assert.ok(scrollable.scrollTop() <= 1, 'first row is not overlayed by parent container');
          clock.restore();
        });
        QUnit.test('Added row should be scrolled to the top of the grid (T748046)', function(assert) {
          var clock = sinon.useFakeTimers();
          var dataGrid = createDataGrid({
            width: 400,
            height: 200,
            showBorders: true,
            editing: {
              mode: 'cell',
              allowAdding: true
            },
            dataSource: $traceurRuntime.spread(new Array(20)).map(function(x, i) {
              return ({name: i});
            })
          });
          clock.tick(10);
          var scrollable = $('.dx-scrollable').dxScrollable('instance');
          scrollable.scrollTo({y: 10});
          clock.tick(10);
          dataGrid.addRow();
          clock.tick(10);
          assert.ok(scrollable.scrollTop() <= 1, 'first row is not overlayed by parent container');
          clock.restore();
        });
        QUnit.test('Editing should work with classes as data objects', function(assert) {
          function DataItem(id, text) {
            this.id = id;
            this.text = text;
          }
          Object.defineProperty(DataItem.prototype, 'ID', {
            configurable: true,
            enumerable: false,
            get: function() {
              return this.id;
            },
            set: function(value) {
              this.id = value;
            }
          });
          Object.defineProperty(DataItem.prototype, 'Text', {
            configurable: true,
            enumerable: false,
            get: function() {
              return this.text;
            },
            set: function(value) {
              this.text = value;
            }
          });
          var dataItem0 = new DataItem(0, 'text0');
          var dataItem1 = new DataItem(1, 'text1');
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['ID', 'Text'],
            dataSource: {store: [dataItem0, dataItem1]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(1, 1, 'test');
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 2);
          assert.equal(rows[1].data.ID, 1);
          assert.equal(rows[1].data.Text, 'test');
          assert.deepEqual(rows[1].values, [1, 'test']);
        });
        QUnit.test('Editing should work with classes as data objects contains readonly properties', function(assert) {
          function DataItem(id, text) {
            this.id = id;
            this.text = text;
          }
          Object.defineProperty(DataItem.prototype, 'ID', {
            configurable: true,
            enumerable: true,
            get: function() {
              return this.id;
            }
          });
          Object.defineProperty(DataItem.prototype, 'Text', {
            configurable: true,
            enumerable: false,
            get: function() {
              return this.text;
            },
            set: function(value) {
              this.text = value;
            }
          });
          var dataItem0 = new DataItem(0, 'text0');
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['ID', 'Text'],
            dataSource: {store: [dataItem0]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(0, 1, 'test');
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1);
          assert.equal(rows[0].data.ID, 0);
          assert.equal(rows[0].data.Text, 'test');
          assert.deepEqual(rows[0].values, [0, 'test']);
        });
        QUnit.test('Editing should works with nested readonly property', function(assert) {
          function ItemConfig() {
            this._enable = false;
          }
          Object.defineProperty(ItemConfig.prototype, 'enable', {
            get: function() {
              return this._enable;
            },
            set: function(value) {
              this._enable = value;
            }
          });
          function Item(name) {
            this.name = name;
            this._config = new ItemConfig();
          }
          Object.defineProperty(Item.prototype, 'config', {get: function() {
              return this._config;
            }});
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['config.enable', 'name'],
            dataSource: {store: [new Item('Test')]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(0, 0, true);
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1);
          assert.deepEqual(rows[0].data.config.enable, true, 'nested property is assigned');
          assert.ok(rows[0].data.config instanceof ItemConfig, 'config type');
          assert.deepEqual(rows[0].values, [true, 'Test']);
        });
        QUnit.test('Editing should work for class field that contains circular link (T1053794)', function(assert) {
          function Foo() {
            this.text = 'Hello';
            this.circular = this;
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['id', 'foo.text'],
            dataSource: [{
              id: 1,
              foo: new Foo()
            }],
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(0, 1, 'test');
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1);
          assert.equal(rows[0].data.foo.text, 'test');
          assert.strictEqual(rows[0].data.foo.circular, rows[0].data.foo);
          assert.deepEqual(rows[0].values, [1, 'test']);
        });
        QUnit.test('Editing should work for class field that contains complex circular link (T1053794)', function(assert) {
          function Foo() {
            this.text = 'Hello';
            this.bar = new Bar(this);
          }
          function Bar(foo) {
            this.foo = foo;
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['id', 'foo.bar.foo.text'],
            dataSource: [{
              id: 1,
              foo: new Foo()
            }],
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(0, 1, 'test');
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1);
          assert.equal(rows[0].data.foo.text, 'test');
          assert.strictEqual(rows[0].data.foo.bar.foo, rows[0].data.foo);
          assert.deepEqual(rows[0].values, [1, 'test']);
        });
        QUnit.test('calculateCellValue for edited cell fires twice and at the second time contains full data row as an argument', function(assert) {
          function DataItem(id, text) {
            this.id = id;
            this.text = text;
          }
          Object.defineProperty(DataItem.prototype, 'ID', {
            configurable: true,
            enumerable: true,
            get: function() {
              return this.id;
            }
          });
          Object.defineProperty(DataItem.prototype, 'Text', {
            configurable: true,
            enumerable: false,
            get: function() {
              return this.text;
            },
            set: function(value) {
              this.text = value;
            }
          });
          var dataItem0 = new DataItem(0, 'text0');
          var counter = 0;
          var modifiedData;
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columns: ['ID', {
              dataField: 'Text',
              calculateCellValue: function(data) {
                if (data.Text === 'test') {
                  ++counter;
                  modifiedData = data;
                }
              }
            }],
            dataSource: {store: [dataItem0]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          dataGrid.cellValue(0, 1, 'test');
          dataGrid.closeEditCell();
          this.clock.tick(10);
          assert.equal(counter, 2);
          assert.equal(dataItem0.Text, 'text0');
          assert.equal(modifiedData.ID, 0);
          assert.equal(modifiedData.Text, 'test');
          assert.ok(modifiedData instanceof DataItem, 'modifiedData is instance of DataItem');
        });
        QUnit.test('Edit cell by click when grid is created in dxForm', function(assert) {
          var dataGrid;
          $('#form').dxForm({items: [{template: function(options, container) {
                dataGrid = $('<div>').appendTo(container).dxDataGrid({
                  loadingTimeout: null,
                  dataSource: [{
                    firstName: 1,
                    lastName: 2
                  }],
                  editing: {
                    allowUpdating: true,
                    mode: 'cell'
                  }
                }).dxDataGrid('instance');
              }}]});
          $(dataGrid.$element().find('.dx-data-row > td').eq(0)).trigger('dxclick');
          this.clock.tick(10);
          assert.equal($(dataGrid.$element()).find(TEXTEDITOR_INPUT_SELECTOR).length, 1, 'one editor is shown');
        });
        QUnit.test('Edit cell by click if repaintChangesOnly is enabled', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              firstName: 1,
              lastName: 2
            }],
            loadingTimeout: null,
            repaintChangesOnly: true,
            editing: {
              allowUpdating: true,
              mode: 'cell'
            }
          });
          var $cell = $dataGrid.find('.dx-data-row > td').eq(0);
          pointerMock($cell).start().down().up();
          assert.equal($dataGrid.find(TEXTEDITOR_INPUT_SELECTOR).length, 1, 'one editor is shown');
        });
        QUnit.test('Add row to empty dataGrid - freeSpaceRow element is hidden', function(assert) {
          var $grid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            editing: {
              allowAdding: true,
              allowUpdating: true,
              allowDeleting: true,
              mode: 'row'
            },
            columns: [{
              dataField: 'firstName',
              width: 100
            }, {
              dataField: 'lastName',
              width: 100
            }, {
              dataField: 'room',
              width: 100
            }, {
              dataField: 'birthDay',
              width: 100
            }]
          });
          var gridInstance = $grid.dxDataGrid('instance');
          gridInstance.addRow();
          this.clock.tick(10);
          var $freeSpaceRow = $grid.find('.dx-freespace-row');
          var $noDataElement = $grid.find('.dx-datagrid-nodata');
          assert.ok(!$freeSpaceRow.is(':visible'), 'Free space row is hidden');
          assert.ok(!$noDataElement.is(':visible'), 'No data element is hidden');
        });
        QUnit.test('freeSpaceRow height should not be changed after editing next cell', function(assert) {
          var $grid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              field1: 'field1'
            }, {
              id: 2,
              field1: 'field1'
            }, {
              id: 3,
              field1: 'field1'
            }],
            paging: {pageSize: 2},
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          });
          var dataGrid = $grid.dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          dataGrid.cellValue(0, 'field1', 'updated');
          this.clock.tick(10);
          dataGrid.saveEditData();
          dataGrid.focus(dataGrid.getCellElement(0, 'field1'));
          assert.ok($grid.find('.dx-freespace-row').is(':visible'), 'Free space row is visible');
          assert.equal(dataGrid.totalCount(), -1, 'totalCount');
          assert.equal(dataGrid.getController('data').isLoading(), true, 'isLoading');
        });
        QUnit.test('row should not dissapear after insert if dataSource was assigned during saving', function(assert) {
          var array = [{id: '1'}];
          var $grid = $('#dataGrid').dxDataGrid({
            dataSource: array,
            editing: {
              mode: 'cell',
              allowAdding: true
            },
            keyExpr: 'id',
            loadingTimeout: 100
          });
          var dataGrid = $grid.dxDataGrid('instance');
          this.clock.tick(100);
          dataGrid.addRow();
          dataGrid.cellValue(0, 0, '2');
          this.clock.tick(10);
          dataGrid.closeEditCell();
          this.clock.tick(10);
          dataGrid.option('dataSource', array);
          this.clock.tick(10);
          assert.equal($(dataGrid.getCellElement(0, 0)).find('.dx-texteditor-input').val(), '2', 'first row doesn\'t dissapear');
          assert.equal($(dataGrid.getCellElement(1, 0)).text(), '1', 'second row cell text');
          this.clock.tick(100);
          assert.equal($(dataGrid.getCellElement(0, 0)).text(), '1', 'first row doesn\'t dissapear');
          assert.equal($(dataGrid.getCellElement(1, 0)).text(), '2', 'second row cell text');
        });
        QUnit.test('Edit row with the jquery template when the editForm mode is enabled', function(assert) {
          var data = [{
            firstName: 'Super',
            lastName: 'Man'
          }, {
            firstName: 'Super',
            lastName: 'Zi'
          }];
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            editing: {
              mode: 'form',
              allowUpdating: true
            },
            columnHidingEnabled: true,
            dataSource: data,
            columns: ['firstName', {
              dataField: 'lastName',
              editCellTemplate: $('#scriptTestTemplate1')
            }]
          });
          var instance = $dataGrid.dxDataGrid('instance');
          instance.editRow(0);
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-form #template1').text(), 'Template1', 'the jquery template is rendered correctly');
        });
        QUnit.test('column headers visibility when hide removing row in batch editing mode', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            dataSource: [{
              col1: '1',
              col2: '2'
            }],
            loadingTimeout: null,
            editing: {
              mode: 'batch',
              allowDeleting: true
            },
            onCellPrepared: function(e) {
              assert.equal(typeUtils.isRenderer(e.cellElement), !!config().useJQuery, 'cellElement is correct');
              if (e.rowType === 'data' && e.column.command === 'edit' && e.row.removed) {
                $(e.cellElement).parent().css({display: 'none'});
              }
            }
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.deleteRow(0);
          assert.strictEqual(dataGrid.getView('rowsView').getScrollbarWidth(), 0, 'vertical scrollbar width');
          assert.strictEqual($dataGrid.find('.dx-datagrid-headers').css('paddingRight'), '0px', 'no headers right padding');
        });
        QUnit.test('numberbox input right and left paddings should be equal if spin buttons are showed', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{field: 30}],
            loadingTimeout: null,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'field',
              dataType: 'number',
              editorOptions: {showSpinButtons: true}
            }]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.editCell(0, 0);
          var $input = $($dataGrid.find('.dx-editor-cell').find('.dx-texteditor-input'));
          assert.equal($input.length, 1, 'input');
          assert.equal($input.css('padding-right'), $input.css('padding-left'), 'paddings are equal');
        });
        QUnit.test('Delete two added rows after selection', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            dataSource: [{id: 1}],
            keyExpr: 'id',
            loadingTimeout: null,
            editing: {
              mode: 'batch',
              allowAdding: true,
              allowDeleting: true
            }
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.addRow();
          dataGrid.addRow();
          dataGrid.selectRows(1);
          $dataGrid.find('.dx-link-delete').first().trigger('click');
          this.clock.tick(10);
          $dataGrid.find('.dx-link-delete').first().trigger('click');
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 1, 'row count');
          assert.strictEqual($dataGrid.find('.dx-data-row').length, 1, 'visible data row count');
        });
        QUnit.test('Command cell should not have dx-hidden-cell class if it is not fixed', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{field: 'data'}],
            columns: [{
              dataField: 'field',
              caption: 'fixed',
              fixed: true
            }, {
              dataField: 'field',
              caption: 'not fixed'
            }, {
              type: 'buttons',
              fixed: false,
              buttons: ['edit']
            }],
            editing: {
              mode: 'row',
              allowUpdating: true,
              useIcons: true
            }
          }).dxDataGrid('instance');
          var rows = dataGrid.getRowElement(0);
          assert.roughEqual(Math.floor($(rows[0]).find('td').eq(0).width()), Math.floor($(rows[1]).find('td').eq(0).width()), 1.01, 'widths are equal');
          assert.notOk($('.dx-command-edit').eq(1).hasClass('dx-hidden-cell'), 'cell does not have class dx-hidden-cell');
        });
        [false, true].forEach(function(grouping) {
          QUnit.test(("loading data on scroll after deleting several rows if scrolling mode is infinite and refreshMode is repaint " + (grouping ? 'and if grouping ' : '') + "(T862268)"), function(assert) {
            var array = [];
            for (var i = 1; i <= 50; i++) {
              array.push({
                id: i,
                group: Math.floor(i / 10)
              });
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              height: 100,
              dataSource: array,
              keyExpr: 'id',
              editing: {
                allowDeleting: true,
                texts: {confirmDeleteMessage: ''},
                refreshMode: 'repaint'
              },
              scrolling: {
                mode: 'infinite',
                useNative: false,
                rowPageSize: 20,
                prerenderedRowChunkSize: 20
              },
              columns: ['id', {
                dataField: 'group',
                groupIndex: grouping ? 0 : undefined
              }],
              loadingTimeout: null
            }).dxDataGrid('instance');
            var firstDataRowIndex = grouping ? 1 : 0;
            dataGrid.deleteRow(firstDataRowIndex);
            dataGrid.deleteRow(firstDataRowIndex);
            dataGrid.getScrollable().scrollTo({y: 10000});
            var rows = dataGrid.getVisibleRows();
            assert.equal(dataGrid.totalCount(), grouping ? 54 : 48, 'totalCount');
            assert.equal(rows.length, 40, 'visible row count');
            assert.equal(rows[firstDataRowIndex].key, 3, 'row 0');
            assert.equal(rows[18].key, grouping ? 19 : 21, 'row 18');
            assert.equal(rows[37].key, grouping ? 36 : 40, 'row 37');
            dataGrid.refresh();
            rows = dataGrid.getVisibleRows();
            assert.equal(dataGrid.totalCount(), grouping ? 54 : 48, 'totalCount');
            assert.equal(rows.length, 40, 'visible row count');
            assert.equal(rows[firstDataRowIndex].key, 3, 'row 0');
          });
        });
        [false, true].forEach(function(legacyMode) {
          QUnit.test(("loading data on scroll after deleting several rows if scrolling mode is infinite, rowRenderingMode is virtual and refreshMode is repaint (legacyMode=" + legacyMode + ") (T862268)"), function(assert) {
            var array = [];
            for (var i = 1; i <= 150; i++) {
              array.push({id: i});
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              height: 100,
              dataSource: array,
              keyExpr: 'id',
              editing: {
                allowDeleting: true,
                texts: {confirmDeleteMessage: ''},
                refreshMode: 'repaint'
              },
              paging: {pageSize: 50},
              scrolling: {
                mode: 'infinite',
                rowRenderingMode: 'virtual',
                useNative: false,
                legacyMode: legacyMode
              },
              columns: ['id'],
              loadingTimeout: null
            }).dxDataGrid('instance');
            dataGrid.getScrollable().scrollTo({y: 10000});
            dataGrid.getScrollable().scrollTo({y: 0});
            dataGrid.deleteRow(0);
            dataGrid.deleteRow(0);
            dataGrid.deleteRow(0);
            dataGrid.getScrollable().scrollTo({y: 10000});
            this.clock.tick(10);
            for (var i$__7 = 0; i$__7 < 25; i$__7++) {
              dataGrid.getScrollable().scrollTo({y: 10000});
            }
            var rows = dataGrid.getVisibleRows();
            assert.equal(dataGrid.totalCount(), 147, 'totalCount');
            assert.equal(rows[rows.length - 1].key, 150, 'last row key');
          });
          QUnit.test(("loading data on scroll after deleting throw push API if scrolling mode is infinite (legacyMode=" + legacyMode + ") (T1053933)"), function(assert) {
            var array = [];
            for (var i = 1; i <= 100; i++) {
              array.push({id: i});
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              height: 500,
              dataSource: array,
              keyExpr: 'id',
              scrolling: {
                mode: 'infinite',
                useNative: false,
                legacyMode: legacyMode
              },
              columns: ['id'],
              loadingTimeout: null
            }).dxDataGrid('instance');
            dataGrid.getDataSource().store().push([{
              type: 'remove',
              key: 1
            }, {
              type: 'remove',
              key: 2
            }, {
              type: 'remove',
              key: 3
            }]);
            this.clock.tick(10);
            for (var i$__8 = 0; i$__8 < 5; i$__8++) {
              dataGrid.getScrollable().scrollTo({y: 10000});
              this.clock.tick(10);
            }
            var rows = dataGrid.getVisibleRows();
            assert.equal(dataGrid.totalCount(), 97, 'totalCount');
            assert.equal(rows[rows.length - 1].key, 100, 'last row key');
          });
        });
        ['repaint', 'reshape'].forEach(function(refreshMode) {
          QUnit.test(("loading data on scroll after adding row if scrolling mode is infinite and refreshMode is " + refreshMode + " (T914296)"), function(assert) {
            var array = [];
            for (var i = 1; i <= 150; i++) {
              array.push({id: i});
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              height: 400,
              dataSource: array,
              keyExpr: 'id',
              editing: {
                mode: 'cell',
                allowAdding: true,
                refreshMode: refreshMode
              },
              paging: {pageSize: 50},
              scrolling: {
                mode: 'infinite',
                useNative: false
              },
              columns: ['id'],
              loadingTimeout: null
            }).dxDataGrid('instance');
            dataGrid.getScrollable().scrollTo({y: 10000});
            dataGrid.getScrollable().scrollTo({y: 0});
            dataGrid.addRow();
            dataGrid.saveEditData();
            for (var i$__9 = 0; i$__9 < 25; i$__9++) {
              dataGrid.getScrollable().scrollTo({y: 10000});
              this.clock.tick(10);
            }
            var rows = dataGrid.getVisibleRows();
            assert.strictEqual(dataGrid.totalCount(), 151, 'totalCount');
            assert.strictEqual(rows[rows.length - 2].key, 150, 'penultimate row key');
          });
          QUnit.test(("loading data on scroll after a push to store if scrolling mode is infinite and refreshMode is " + refreshMode + " (T914296)"), function(assert) {
            var array = [];
            for (var i = 1; i <= 150; i++) {
              array.push({id: i});
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              height: 400,
              dataSource: array,
              keyExpr: 'id',
              editing: {
                mode: 'row',
                allowAdding: true,
                refreshMode: refreshMode
              },
              paging: {pageSize: 50},
              scrolling: {
                mode: 'infinite',
                useNative: false
              },
              columns: ['id'],
              loadingTimeout: null
            }).dxDataGrid('instance');
            dataGrid.getScrollable().scrollTo({y: 10000});
            dataGrid.getScrollable().scrollTo({y: 0});
            dataGrid.getDataSource().store().push([{
              type: 'insert',
              data: {id: 987654321},
              index: 0
            }]);
            this.clock.tick(10);
            for (var i$__10 = 0; i$__10 < 20; i$__10++) {
              dataGrid.getScrollable().scrollTo({y: 10000});
            }
            var rows = dataGrid.getVisibleRows();
            assert.strictEqual(rows[rows.length - 2].key, 150, 'penultimate row key');
            assert.strictEqual(dataGrid.totalCount(), 151, 'totalCount');
          });
        });
        QUnit.test('column widths should be synchronized when scrolling mode is virtual and lookup column and edit column are exist', function(assert) {
          var contentReadyCallCount = 0;
          var $dataGrid = $('#dataGrid').dxDataGrid({
            onContentReady: function(e) {
              contentReadyCallCount++;
            },
            width: 1000,
            height: 200,
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }, {
              field1: 5,
              field2: 6
            }, {
              field1: 7,
              field2: 8
            }],
            scrolling: {mode: 'virtual'},
            paging: {pageSize: 3},
            editing: {allowUpdating: true},
            columns: [{
              dataField: 'field1',
              lookup: {
                displayExpr: 'text',
                valueExpr: 'value',
                dataSource: {load: function() {
                    var d = $.Deferred();
                    setTimeout(function() {
                      d.resolve([{
                        value: 1,
                        text: 'text 1'
                      }, {
                        value: 2,
                        text: 'text 2'
                      }]);
                    });
                    return d;
                  }}
              }
            }, {dataField: 'field2'}]
          });
          this.clock.tick(400);
          var $dataGridTables = $dataGrid.find('.dx-datagrid-table');
          assert.equal(contentReadyCallCount, 2);
          assert.equal($dataGridTables.length, 2);
          assert.equal($dataGridTables.eq(0).find('.dx-row').first().find('td')[0].getBoundingClientRect().width, $dataGridTables.eq(1).find('.dx-row').first().find('td')[0].getBoundingClientRect().width);
          assert.equal($dataGridTables.eq(0).find('.dx-row').first().find('td')[1].getBoundingClientRect().width, $dataGridTables.eq(1).find('.dx-row').first().find('td')[1].getBoundingClientRect().width);
        });
        QUnit.test('Last row should be correct after editing other row\'s cell if scrolling and rendering are virtual', function(assert) {
          var dataSource = [];
          for (var i = 0; i < 40; i++) {
            dataSource.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: dataSource,
            height: 150,
            editing: {
              enabled: true,
              mode: 'cell',
              allowUpdating: true
            },
            scrolling: {
              rowRenderingMode: 'virtual',
              mode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(300);
          dataGrid.getScrollable().scrollTo({y: 1500});
          $(dataGrid.getScrollable().content()).trigger('scroll');
          dataGrid.editCell(dataGrid.getRowIndexByKey(38), 0);
          var visibleRows = dataGrid.getVisibleRows();
          assert.notOk(visibleRows[-1], 'no visible row with index -1');
          assert.equal($(dataGrid.getCellElement(dataGrid.getRowIndexByKey(39), 0)).text(), '39', 'last row is correct');
        });
        QUnit.test('Edit cell after editing another cell and scrolling down should work correctly if scrolling and rendering are virtual', function(assert) {
          var dataSource = [];
          var $editedRow;
          var $input;
          for (var i = 0; i < 100; i++) {
            dataSource.push({field: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            height: 440,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            scrolling: {
              rowRenderingMode: 'virtual',
              mode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          dataGrid.editCell(8, 0);
          dataGrid.getScrollable().scrollTo({y: 1000});
          dataGrid.editCell(5, 0);
          var visibleRows = dataGrid.getVisibleRows();
          var hasNegativeIndexes = Object.keys(visibleRows).some(function(rowIndex) {
            return rowIndex < 0;
          });
          var $rows = dataGrid.$element().find('.dx-data-row');
          assert.notOk(hasNegativeIndexes, 'no visible rows with index < 0');
          var startValue = parseInt($rows.eq(0).text());
          assert.equal(startValue, 29, 'visible row #1 is correct');
          for (var i$__11 = 1; i$__11 < $rows.length; i$__11++) {
            if (i$__11 !== 5) {
              assert.equal(parseInt($rows.eq(i$__11).text()), startValue + i$__11, ("visible row's #" + (i$__11 + 1) + " text"));
            } else {
              $editedRow = $rows.eq(i$__11);
              $input = $editedRow.find('input');
              assert.ok($editedRow.find('.dx-editor-cell').length, 'row has editor');
              assert.equal(parseInt($input.val()), startValue + i$__11, ("visible row's #" + (i$__11 + 1) + " input value"));
            }
          }
        });
        QUnit.test('Click on cell should open editor after scrolling grid down if scrolling and rendering are virtual and repaintChangesOnly is true', function(assert) {
          var dataSource = [];
          for (var i = 0; i < 100; i++) {
            dataSource.push({field: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            height: 150,
            editing: {
              enabled: true,
              mode: 'cell',
              allowUpdating: true
            },
            repaintChangesOnly: true,
            scrolling: {
              rowRenderingMode: 'virtual',
              mode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          dataGrid.getScrollable().scrollTo({y: 3000});
          dataGrid.editCell(1, 0);
          var visibleRows = dataGrid.getVisibleRows();
          var $rows = dataGrid.$element().find('.dx-data-row');
          var $editorCell = $rows.eq(1).find('.dx-editor-cell');
          assert.ok($editorCell.length, 'row has editor');
          assert.equal($editorCell.find('input').val(), '89', 'input value');
          assert.notOk(visibleRows[-1], 'no visible row with index -1');
        });
        QUnit.test('Toolbar should not be rerendered if editing.popup options were changed', function(assert) {
          var onToolbarPreparingSpy = sinon.spy();
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [],
            onToolbarPreparing: onToolbarPreparingSpy,
            editing: {mode: 'popup'}
          });
          dataGrid.option('editing.popup', {});
          assert.equal(onToolbarPreparingSpy.callCount, 1, 'onToolbarPreparing call count');
        });
        QUnit.test('Edit form should be updated if change editing.form option inside setCellValue (T1026215)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              field1: 1,
              field2: 2
            }],
            columns: [{
              dataField: 'field1',
              setCellValue: function(data, value) {
                data.field1 = value;
                dataGrid.option('editing.form.items[1].visible', false);
              }
            }, {dataField: 'field2'}],
            editing: {
              mode: 'form',
              form: {items: [{dataField: 'field1'}, {dataField: 'field2'}]}
            }
          });
          dataGrid.editRow(0);
          dataGrid.cellValue(0, 0, 2);
          assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editing is not canceled');
          assert.equal(dataGrid.$element().find('.dx-texteditor').length, 1, 'one editor is visible, second is hidden');
        });
        QUnit.test('Edit form should be updated if change editing.form option (T1026215)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              field1: 1,
              field2: 2
            }],
            editing: {
              mode: 'form',
              form: {items: [{dataField: 'field1'}, {dataField: 'field2'}]}
            }
          });
          dataGrid.editRow(0);
          dataGrid.option('editing.form.items[1].visible', false);
          assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editing is not canceled');
          assert.equal(dataGrid.$element().find('.dx-texteditor').length, 1, 'one editor is visible, second is hidden');
        });
        QUnit.testInActiveWindow('Height virtual table should be updated to show validation message when there is a single row and virtual scrolling is enabled', function(assert) {
          var $tableElements;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{Test: ''}],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            scrolling: {mode: 'virtual'},
            columns: [{
              dataField: 'Test',
              validationRules: [{type: 'required'}]
            }]
          });
          $tableElements = dataGrid.$element().find('.dx-datagrid-rowsview').find('table');
          assert.roughEqual(getOuterHeight($tableElements.eq(0)), 35, 3, 'height main table');
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          $tableElements = dataGrid.$element().find('.dx-datagrid-rowsview').find('table');
          assert.roughEqual(getOuterHeight($tableElements.eq(0)), 68, 3.01, 'height main table');
          dataGrid.closeEditCell();
          this.clock.tick(10);
          $tableElements = dataGrid.$element().find('.dx-datagrid-rowsview').find('table');
          assert.roughEqual(getOuterHeight($tableElements.eq(0)), 35, 3, 'height main table');
        });
        QUnit.test('Error row is not hidden when rowKey is undefined by mode is cell', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              'ID': 1,
              'FirstName': 'John',
              'LastName': 'Heart',
              'Prefix': 'Mr.',
              'Position': 'CEO',
              'BirthDate': '1964/03/16',
              'HireDate': '1995/01/15',
              'Address': '351 S Hill St.',
              'StateID': 5
            }],
            keyExpr: 'myFakeKey',
            paging: {enabled: false},
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: ['Prefix', 'FirstName']
          });
          this.clock.tick(10);
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          $('input').val('new').change();
          this.clock.tick(10);
          dataGrid.editCell(0, 1);
          this.clock.tick(10);
          assert.equal($('.dx-error-message').length, 1, 'Error message is shown');
        });
        QUnit.test('Editor should be rendered for hidden columns while editing in row mode with repaintChangesOnly', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            repaintChangesOnly: true,
            columnHidingEnabled: true,
            width: 200,
            dataSource: [{
              field1: '1',
              field2: '2'
            }]
          }).dxDataGrid('instance');
          $('.dx-datagrid .dx-datagrid-adaptive-more').eq(0).trigger('dxclick');
          $(dataGrid.getRowElement(0)).find('.dx-command-edit > .dx-link-edit').trigger(pointerEvents.up).click();
          this.clock.tick(10);
          var $firstRowEditors = $(dataGrid.getRowElement(1)).find('.dx-texteditor');
          assert.ok($firstRowEditors.length, 'row has editor');
          assert.notOk($firstRowEditors.eq(0).parent().hasClass('dx-adaptive-item-text'), 'editor\'s parent does not have class');
          $(dataGrid.getRowElement(0)).find('.dx-command-edit > .dx-link-cancel').trigger(pointerEvents.up).click();
          this.clock.tick(10);
          assert.notOk($(dataGrid.getRowElement(1)).find('.dx-texteditor').length, 'row doesn\'t have editor');
        });
        QUnit.test('Row\'s height should be correct after updateDimensions while editing with popup edit mode', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            width: 300,
            columnHidingEnabled: true,
            keyExpr: 'ID',
            wordWrapEnabled: true,
            editing: {
              allowUpdating: true,
              mode: 'popup'
            },
            dataSource: [{
              ID: 1,
              Comment: 'very long text very long text very long text very long text very long text very long text very long text very long text'
            }, {
              ID: 2,
              Comment: 'very long text very long text very long text very long text very long text very long text very long text very long text'
            }]
          }).dxDataGrid('instance');
          var $firstRow = $(dataGrid.getRowElement(0));
          var firstRowHeight = $firstRow.height();
          dataGrid.editRow(0);
          dataGrid.updateDimensions();
          assert.equal($firstRow.height(), firstRowHeight, 'first row\'s height');
          assert.ok($firstRow.find('td').eq(1).hasClass('dx-datagrid-hidden-column'), 'column hiding class');
        });
        QUnit.test('No error after adding row and virtual scrolling', function(assert) {
          var dataGrid = createDataGrid({
            height: 50,
            paging: {pageSize: 2},
            scrolling: {mode: 'virtual'},
            columns: ['id'],
            keyExpr: 'id',
            dataSource: $traceurRuntime.spread(Array(10)).map(function(_, i) {
              return {id: i + 1};
            })
          });
          this.clock.tick(10);
          dataGrid.addRow();
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          dataGrid.pageIndex(2);
          this.clock.tick(10);
          dataGrid.pageIndex(3);
          this.clock.tick(10);
          dataGrid.pageIndex(0);
          this.clock.tick(10);
          assert.strictEqual($($(dataGrid.$element()).find('.dx-error-row')).length, 0, 'no errors');
        });
        QUnit.test('Edit cell content should not overflow a cell (T953436)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              checked: true,
              name: 'name',
              description: 'description'
            }],
            keyExpr: 'id',
            selection: {mode: 'multiple'},
            columns: ['checked', {
              dataField: 'name',
              showEditorAlways: true
            }, 'description']
          });
          this.clock.tick(10);
          var $dataCells = $(dataGrid.getRowElement(0)).find('td');
          assert.equal($dataCells.length, 4, 'cells count');
          $dataCells.each(function(_, cell) {
            assert.strictEqual($(cell).css('overflow'), 'hidden', 'overflow hidden');
          });
        });
        QUnit.test('The validation message should be shown on focus for nested grid', function(assert) {
          var nestedDataGrid;
          var dataGrid = createDataGrid({
            dataSource: [],
            keyExpr: 'ID',
            columns: [{
              dataField: 'CompanyName',
              editCellTemplate: function(e) {
                var $nestedDataGrid = $('<div/>').dxDataGrid({
                  dataSource: [],
                  keyExpr: 'id',
                  height: 400,
                  columns: [{
                    dataField: 'test1',
                    validationRules: [{type: 'required'}]
                  }, {
                    dataField: 'test2',
                    validationRules: [{type: 'required'}]
                  }],
                  editing: {allowAdding: true}
                });
                nestedDataGrid = $nestedDataGrid.dxDataGrid('instance');
                return $nestedDataGrid;
              }
            }],
            editing: {
              mode: 'form',
              allowAdding: true,
              form: {colCount: 1}
            }
          });
          dataGrid.addRow();
          this.clock.tick(10);
          assert.ok(dataGrid.getVisibleRows()[0].isNewRow, 'grid has new row');
          nestedDataGrid.addRow();
          this.clock.tick(10);
          assert.ok(nestedDataGrid.getVisibleRows()[0].isNewRow, 'nested grid has new row');
          nestedDataGrid.saveEditData();
          this.clock.tick(10);
          var $cellElements = $(nestedDataGrid.getRowElement(0)).children();
          assert.strictEqual($cellElements.length, 3, 'new row - cell count');
          assert.strictEqual($cellElements.filter('.dx-datagrid-invalid').length, 2, 'new row - number of invalid cells');
          $cellElements.first().find('.dx-texteditor-input').first().trigger('dxpointerdown').trigger('dxclick');
          this.clock.tick(10);
          var $overlayWrapper = $(dataGrid.element()).find('.dx-overlay-wrapper.dx-datagrid-invalid-message');
          assert.strictEqual($overlayWrapper.length, 1, 'has tooltip');
          assert.strictEqual($overlayWrapper.css('visibility'), 'visible', 'validation message wrapper is visible');
        });
        ['Batch', 'Cell'].forEach(function(editMode) {
          [null, 'left', 'right'].forEach(function(fixedPosition) {
            var fixedPositionText = fixedPosition === null ? 'not specified' : fixedPosition;
            QUnit.testInActiveWindow((editMode + " - Cells should be modified properly when fixedPosition is " + fixedPositionText + " of a grouped column with showWhenGrouped enabled (T980535)"), function(assert) {
              var columns = ['field1', {
                dataField: 'field2',
                showWhenGrouped: true,
                groupIndex: 0
              }, 'field3'];
              if (fixedPosition !== null) {
                columns[1].fixed = true;
                columns[1].fixedPosition = fixedPosition;
              }
              var dataGrid = createDataGrid({
                dataSource: [{
                  id: 1,
                  field1: 'test1',
                  field2: 'test2',
                  field3: 'test3'
                }],
                keyExpr: 'id',
                columns: columns,
                editing: {
                  mode: editMode.toLowerCase(),
                  allowUpdating: true
                },
                columnFixing: {enabled: true}
              });
              this.clock.tick(10);
              for (var i = 1; i <= 3; i++) {
                var $cellElement = $(dataGrid.getCellElement(1, i));
                $cellElement.trigger('dxclick');
                this.clock.tick(10);
                $cellElement = $(dataGrid.getCellElement(1, i));
                assert.ok($cellElement.hasClass('dx-focused'), ("cell " + i + " is focused after click"));
                assert.ok($cellElement.hasClass('dx-editor-cell'), ("cell " + i + " has an editor after click"));
                $cellElement.find('.dx-texteditor-input').val(i).trigger('change');
                dataGrid.closeEditCell();
                this.clock.tick(10);
                assert.strictEqual(dataGrid.cellValue(1, i), ("" + i), ("cell " + i + " has modified value"));
              }
            });
          });
        });
        ['Row', 'Cell', 'Batch'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - cellClick should not be raised when a new row is added (T1027166)"), function(assert) {
            var cellClickSpy = sinon.spy(function() {});
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field: 'test'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true
              },
              onCellClick: cellClickSpy
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(300);
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            assert.ok($firstCell.hasClass('dx-editor-cell'), 'cell has an editor');
            assert.ok($firstCell.hasClass('dx-focused'), 'cell is focused');
            assert.notOk(cellClickSpy.called, 'onCellClick is not raised');
          });
        });
      });
      QUnit.module('Editing', baseModuleConfig, function() {
        QUnit.test('The edited cell should be closed on click inside another dataGrid', function(assert) {
          var dataGrid1 = createDataGrid({
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          });
          var dataGrid2 = createDataGrid({
            dataSource: [{
              field3: 'test3',
              field4: 'test4'
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          }, $('#dataGrid2'));
          this.clock.tick(100);
          $(dataGrid1.getCellElement(0, 0)).trigger(pointerEvents.down);
          $(dataGrid1.getCellElement(0, 0)).trigger(pointerEvents.up);
          $(dataGrid1.getCellElement(0, 0)).trigger('dxclick');
          this.clock.tick(100);
          assert.ok($(dataGrid1.getCellElement(0, 0)).find('input').length > 0, 'has input');
          $(dataGrid2.getCellElement(0, 0)).trigger(pointerEvents.down);
          $(dataGrid2.getCellElement(0, 0)).trigger(pointerEvents.up);
          $(dataGrid2.getCellElement(0, 0)).trigger('dxclick');
          this.clock.tick(100);
          assert.strictEqual($(dataGrid1.getCellElement(0, 0)).find('input').length, 0, 'hasn\'t input');
          assert.notOk($(dataGrid1.getCellElement(0, 0)).hasClass('dx-editor-cell'), 'cell of the first grid isn\'t editable');
          assert.ok($(dataGrid2.getCellElement(0, 0)).find('input').length > 0, 'has input');
        });
        QUnit.test('The cell should not be focused on pointerEvents.down event (T850219)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{field1: 'test1'}],
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.ok($(dataGrid.getCellElement(0, 0)).hasClass('dx-cell-focus-disabled'), 'cell has dx-cell-focus-disabled class');
          assert.equal($(dataGrid.$element()).find('.dx-datagrid-focus-overlay').length, 0, 'focus overlay is not rendered');
        });
        QUnit.test('The cell should not have dx-cell-focus-disabled class on pointerEvents.down event with row editing mode if row in editing state (T850219)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }],
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 1)).trigger(pointerEvents.down);
          this.clock.tick(10);
          assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass('dx-cell-focus-disabled'), 'cell has not dx-cell-focus-disabled class');
        });
        QUnit.test('onFocusedRowChanging, onFocusedRowChanged event if click selection checkBox (T812681)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var focusedRowChangingFiresCount = 0;
          var focusedRowChangedFiresCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 11,
              field2: 12
            }],
            keyExpr: 'field1',
            focusedRowEnabled: true,
            selection: {mode: 'multiple'},
            onFocusedRowChanging: function() {
              return ++focusedRowChangingFiresCount;
            },
            onFocusedRowChanged: function() {
              return ++focusedRowChangedFiresCount;
            }
          });
          var selectCheckBox = rowsViewWrapper.getDataRow(1).getSelectCheckBox();
          selectCheckBox.getElement().trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.equal(focusedRowChangingFiresCount, 1, 'onFocusedRowChanging fires count');
          assert.equal(focusedRowChangedFiresCount, 1, 'onFocusedRowChanged fires count');
          assert.equal(dataGrid.option('focusedRowKey'), 11, 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex');
        });
        QUnit.test('Cancel focused row if click selection checkBox (T812681)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var focusedRowChangingFiresCount = 0;
          var focusedRowChangedFiresCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 11,
              field2: 12
            }],
            keyExpr: 'field1',
            focusedRowEnabled: true,
            selection: {mode: 'multiple'},
            onFocusedRowChanging: function(e) {
              ++focusedRowChangingFiresCount;
              e.cancel = true;
            },
            onFocusedRowChanged: function() {
              return ++focusedRowChangedFiresCount;
            }
          });
          assert.equal(dataGrid.option('focusedRowKey'), undefined, 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          var selectCheckBox = rowsViewWrapper.getDataRow(1).getSelectCheckBox();
          selectCheckBox.getElement().trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.equal(focusedRowChangingFiresCount, 1, 'onFocusedRowChanging fires count');
          assert.equal(focusedRowChangedFiresCount, 0, 'onFocusedRowChanged fires count');
          assert.equal(dataGrid.option('focusedRowKey'), undefined, 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
        });
        ['batch', 'cell'].forEach(function(editMode) {
          QUnit.test(("DataGrid - Focus updating on refresh should be correct for focused row if " + editMode + " edit mode (T830334)"), function(assert) {
            var counter = 0;
            var rowsViewWrapper = dataGridWrapper.rowsView;
            var dataGrid = createDataGrid({
              loadingTimeout: null,
              height: 100,
              dataSource: [{
                name: 'Alex',
                phone: '111111',
                room: 1
              }, {
                name: 'Dan',
                phone: '2222222',
                room: 2
              }, {
                name: 'Ben',
                phone: '333333',
                room: 3
              }, {
                name: 'Sean',
                phone: '4545454',
                room: 4
              }, {
                name: 'Smith',
                phone: '555555',
                room: 5
              }, {
                name: 'Zeb',
                phone: '6666666',
                room: 6
              }],
              editing: {
                mode: editMode,
                allowUpdating: true
              },
              keyExpr: 'name',
              focusedRowEnabled: true
            });
            dataGrid.getView('rowsView').scrollToElementVertically = function($row) {
              ++counter;
              assert.equal($row.find('td').eq(0).text(), 'Zeb', 'Row');
            };
            dataGrid.getScrollable().scrollBy({y: 400});
            $(dataGrid.getCellElement(5, 1)).trigger(CLICK_EVENT).trigger('dxclick');
            var dataRow = rowsViewWrapper.getDataRow(5);
            var editor = dataRow.getCell(1).getEditor();
            assert.ok(editor.getInputElement().length > 0, 'Cell[5, 1] is in editing mode');
            assert.ok(dataRow.isFocusedRow(), 'Row 5 is focused');
            assert.equal(counter, 2, 'scrollToElementVertically called twice');
          });
        });
        QUnit.test('Popup should apply data changes after editorOptions changing (T817880)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              'name': 'Alex',
              'text': '123'
            }],
            editing: {
              mode: 'popup',
              allowUpdating: true,
              popup: {
                width: 700,
                height: 525
              },
              form: {items: ['name', {
                  dataField: 'text',
                  editorOptions: {height: 50}
                }]}
            }
          });
          dataGrid.editRow(0);
          dataGrid.option('editing.form.items[1].editorOptions', {height: 100});
          dataGrid.cellValue(0, 'name', 'new name');
          this.clock.tick(10);
          var $popupEditors = $('.dx-popup-content').find('.dx-texteditor');
          assert.equal($popupEditors.eq(0).find('input').eq(0).val(), 'new name', 'value changed');
          assert.equal($popupEditors.eq(1).get(0).style.height, '100px', 'editorOptions applied');
        });
        QUnit.test('Datagrid should edit only allowed cells by tab press if editing.allowUpdating option set dynamically (T848707)', function(assert) {
          var $__3 = this;
          ['cell', 'batch'].forEach(function(editingMode) {
            var dataGrid = createDataGrid({
              loadingTimeout: null,
              dataSource: [{
                'ID': 1,
                'FirstName': 'John',
                'LastName': 'Heart'
              }, {
                'ID': 2,
                'FirstName': 'Robert',
                'LastName': 'Reagan'
              }],
              showBorders: true,
              keyExpr: 'ID',
              editing: {
                mode: editingMode,
                allowUpdating: function(e) {
                  return e.row.data.FirstName === 'Robert';
                }
              },
              columns: ['FirstName', 'LastName']
            });
            dataGrid.editCell(1, 0);
            $__3.clock.tick(10);
            var navigationController = dataGrid.getController('keyboardNavigation');
            navigationController._keyDownHandler({
              key: 'Tab',
              keyName: 'tab',
              originalEvent: $.Event('keydown', {target: $(dataGrid.getCellElement(0, 0))})
            });
            $__3.clock.tick(10);
            assert.equal($(dataGrid.getCellElement(0, 1)).find('input').length, 0, ("cell is not being edited in '" + editingMode + "' editing mode"));
            assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-focused'), 'cell is focused');
          });
        });
        QUnit.test('Filter builder custom operations should update filterValue immediately (T817973)', function(assert) {
          var data = [{
            id: 0,
            name: 'Alex'
          }, {
            id: 1,
            name: 'Ben'
          }, {
            id: 1,
            name: 'John'
          }];
          var filterBuilder = dataGridWrapper.filterBuilder;
          var headerFilterMenu = filterBuilder.headerFilterMenu;
          createDataGrid({
            dataSource: data,
            filterPanel: {visible: true},
            columns: ['id', 'name'],
            filterValue: ['name', 'anyof', ['Alex']],
            filterBuilderPopup: {
              width: 300,
              height: 300
            }
          });
          this.clock.tick(10);
          dataGridWrapper.filterPanel.getPanelText().trigger('click');
          this.clock.tick(10);
          filterBuilder.getItemValueTextElement(0).trigger('dxclick');
          this.clock.tick(10);
          headerFilterMenu.getDropDownListItem(1).trigger('dxclick');
          this.clock.tick(10);
          headerFilterMenu.getButtonOK().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(filterBuilder.getItemValueTextParts().length, 2, 'IsAnyOf operation applyed');
        });
        QUnit.test('Row height should not be changed after validation', function(assert) {
          var done = assert.async();
          var data = [{
            a: 'a',
            b: 'b',
            c: 'c'
          }];
          var grid = createDataGrid({
            dataSource: {
              asyncLoadEnabled: false,
              store: data
            },
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'a',
              setCellValue: function(newData, value, currentData) {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve('');
                }, 20);
                return d.promise();
              },
              validationRules: [{
                type: 'async',
                validationCallback: function(params) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.reject();
                  }, 10);
                  return d.promise();
                }
              }]
            }, {
              dataField: 'b',
              validationRules: [{
                type: 'async',
                validationCallback: function(params) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    params.value ? d.resolve(true) : d.reject();
                  }, 20);
                  return d.promise();
                }
              }]
            }, {
              dataField: 'c',
              validationRules: [{
                type: 'async',
                validationCallback: function(params) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    params.value ? d.resolve(true) : d.reject();
                  }, 20);
                  return d.promise();
                }
              }]
            }]
          });
          this.clock.tick(10);
          var rowHeight = $(grid.getRowElement(0)).height();
          this.clock.restore();
          grid.cellValue(0, 1, '');
          grid.saveEditData().done(function() {
            assert.strictEqual($(grid.getRowElement(0)).height(), rowHeight, 'row height is not changed');
            done();
          });
        });
        QUnit.testInActiveWindow('Cell mode - Cell validation message and revert button should not be shown after click in added row if startEditAction is dblclick and if isHighlighted (T1041287)', function(assert) {
          var gridConfig = {
            dataSource: [{
              a: 'a',
              b: 'b'
            }],
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowUpdating: true,
              startEditAction: 'dblClick'
            },
            onFocusedCellChanging: function(e) {
              e.isHighlighted = true;
            },
            columns: [{
              dataField: 'a',
              validationRules: [{type: 'required'}]
            }, {
              dataField: 'b',
              validationRules: [{type: 'required'}]
            }]
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          grid.addRow();
          this.clock.tick(10);
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          var $secondCell = $(grid.getCellElement(0, 1));
          $secondCell.trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(1000);
          $secondCell = $(grid.getCellElement(0, 1));
          $secondCell.trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(10);
          $secondCell = $(grid.getCellElement(0, 1));
          assert.equal($(grid.element()).find('.dx-datagrid-revert-tooltip .dx-overlay-content').length, 1, 'one revert button is visible');
          assert.equal($(grid.element()).find('.dx-invalid-message .dx-overlay-content').length, 1, 'one error message is visible');
        });
        QUnit.testInActiveWindow('Cell mode - New row should not be saved after click in another added row cell if startEditAction is dblclick (T1041291)', function(assert) {
          var items = [{
            id: 1,
            a: 'a',
            b: 'b'
          }];
          var gridConfig = {
            dataSource: items,
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowUpdating: true,
              startEditAction: 'dblClick'
            },
            columns: [{dataField: 'a'}, {dataField: 'b'}]
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          grid.addRow();
          this.clock.tick(10);
          var $secondCell = $(grid.getCellElement(0, 1));
          $secondCell.trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(1000);
          var $firstCellInput = $(grid.getCellElement(0, 0)).find('.dx-texteditor-input');
          assert.equal($firstCellInput.length, 1, 'editor is not closed');
          assert.ok($firstCellInput.is(':focus'), 'editor is focused');
          assert.equal(items.length, 1, 'new item is not saved');
        });
        QUnit.testInActiveWindow('Cell mode - Cell validation message should be shown when a user clicks outside the cell (T869854)', function(assert) {
          var rowsView = dataGridWrapper.rowsView;
          var headerPanel = dataGridWrapper.headerPanel;
          var gridConfig = {
            dataSource: {
              asyncLoadEnabled: false,
              store: [{
                a: 'a',
                b: 'b'
              }]
            },
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowUpdating: true
            },
            columns: [{
              dataField: 'a',
              validationRules: [{type: 'required'}]
            }, 'b']
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          var $firstCell = $(grid.getCellElement(0, 0));
          $firstCell.trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-focused'), 'cell is focused');
          var $inputElement = rowsView.getCell(0, 0).getEditor().getInputElement();
          $inputElement.val('');
          $inputElement.trigger('change');
          headerPanel.getElement().trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-focused'), 'cell is focused');
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell is invalid');
          assert.ok($(grid.element()).find('.dx-datagrid-revert-tooltip .dx-overlay-content').is(':visible'), 'revert button is visible');
          assert.ok($(grid.element()).find('.dx-invalid-message .dx-overlay-content').is(':visible'), 'error message is visible');
        });
        QUnit.testInActiveWindow('The validation message should not be visible when a message is empty', function(assert) {
          var rowsView = dataGridWrapper.rowsView;
          var gridConfig = {
            dataSource: [{
              a: 'a',
              b: 'b'
            }],
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowUpdating: true
            },
            columns: [{
              dataField: 'a',
              validationRules: [{
                type: 'required',
                message: ''
              }]
            }, 'b']
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          var $firstCell = $(grid.getCellElement(0, 0));
          $firstCell.trigger(pointerEvents.down).trigger('dxclick');
          var $inputElement = rowsView.getCell(0, 0).getEditor().getInputElement();
          $inputElement.val('');
          $inputElement.trigger('change');
          this.clock.tick(10);
          $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell is invalid');
          assert.ok($(grid.element()).find('.dx-datagrid-revert-tooltip .dx-overlay-content').is(':visible'), 'revert button is visible');
          assert.notOk($(grid.element()).find('.dx-invalid-message .dx-overlay-content').is(':visible'), 'error message is not visible');
        });
        QUnit.testInActiveWindow('Batch mode - Cell should be invalid when a user clicks outside the cell (T869854)', function(assert) {
          var rowsView = dataGridWrapper.rowsView;
          var headerPanel = dataGridWrapper.headerPanel;
          var gridConfig = {
            dataSource: {
              asyncLoadEnabled: false,
              store: [{
                a: 'a',
                b: 'b'
              }]
            },
            editing: {
              mode: 'batch',
              allowAdding: true,
              allowUpdating: true
            },
            columns: [{
              dataField: 'a',
              validationRules: [{type: 'required'}]
            }, 'b']
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          var $firstCell = $(grid.getCellElement(0, 0));
          $firstCell.trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-focused'), 'cell is focused');
          var $inputElement = rowsView.getCell(0, 0).getEditor().getInputElement();
          $inputElement.val('');
          $inputElement.trigger('change');
          headerPanel.getElement().trigger(pointerEvents.down).trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell is invalid');
        });
        ['Cell', 'Batch'].forEach(function(mode) {
          QUnit.testInActiveWindow((mode + " - Edit cell should not be closed when DropDownBox in editCellTemplate is updated if calculateCellValue is used (T896030)"), function(assert) {
            var dataSource = {
              asyncLoadEnabled: false,
              store: {
                type: 'array',
                key: 'name',
                data: [{name: 'a'}, {name: 'b'}]
              }
            };
            var gridConfig = {
              dataSource: {
                asyncLoadEnabled: false,
                store: [{name: 'a'}]
              },
              editing: {
                mode: mode.toLowerCase(),
                allowUpdating: true
              },
              columns: [{
                dataField: 'name',
                calculateCellValue: function(rowData) {
                  return rowData.name;
                },
                editCellTemplate: function(cellElement, cellInfo) {
                  return $('<div>').dxDropDownBox({
                    dataSource: dataSource,
                    acceptCustomValue: true,
                    valueExpr: 'name',
                    displayExpr: 'name',
                    value: cellInfo.value,
                    contentTemplate: function(arg) {
                      return $('<div>').addClass('my-class').dxDataGrid({
                        dataSource: dataSource,
                        selection: {mode: 'single'},
                        selectedRowKeys: [cellInfo.value],
                        onSelectionChanged: function(e) {
                          arg.component.option('value', e.selectedRowKeys[0]);
                          cellInfo.setValue(e.selectedRowKeys[0]);
                          arg.component.close();
                        }
                      });
                    }
                  });
                }
              }]
            };
            var grid = createDataGrid(gridConfig);
            this.clock.tick(10);
            $(grid.getCellElement(0, 0)).trigger('dxclick');
            var $dropDownIcon = $(grid.element()).find('.dx-dropdowneditor-icon');
            assert.equal($dropDownIcon.length, 1, 'drop down icon rendered');
            $dropDownIcon.trigger('dxclick');
            this.clock.tick(10);
            var $dropDownGridElement = $('.dx-overlay-wrapper.dx-dropdowneditor-overlay .my-class');
            assert.equal($dropDownGridElement.length, 1, 'drop-down grid is rendered ');
            var $row1 = $($dropDownGridElement.dxDataGrid('instance').getRowElement(1));
            assert.equal($row1.length, 1, 'second row is found');
            $row1.trigger('dxpointerdown');
            $row1.trigger('dxclick');
            this.clock.tick(10);
            var $dropDownPopupElement = $('.dx-overlay-wrapper.dx-dropdowneditor-overlay');
            var $dropDownBoxElement = $(grid.getCellElement(0, 0)).find('.dx-dropdownbox');
            assert.equal($dropDownPopupElement.length, 0, 'drop-down window is hidden');
            assert.equal($dropDownBoxElement.length, 1, 'editor is found');
          });
        });
        ['Row', 'Cell', 'Batch'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Unmodified cell in a new row should not be validated (T913725)"), function(assert) {
            var gridConfig = {
              dataSource: [],
              keyExpr: 'field2',
              editing: {mode: editMode.toLowerCase()},
              columns: [{
                dataField: 'field1',
                validationRules: [{type: 'required'}]
              }, 'field2']
            };
            var grid = createDataGrid(gridConfig);
            this.clock.tick(10);
            grid.addRow();
            this.clock.tick(10);
            var $firstCell = $(grid.getCellElement(0, 0));
            assert.ok($firstCell.hasClass('dx-focused'), 'cell should be focused');
            assert.notOk($firstCell.hasClass('dx-datagrid-invalid'), 'cell should not be invalid');
          });
        });
        QUnit.testInActiveWindow('Row - Editing cell with undefined value should be validated (T913725)', function(assert) {
          var gridConfig = {
            dataSource: [{
              field1: undefined,
              field2: 1
            }],
            keyExpr: 'field2',
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columns: [{
              dataField: 'field1',
              validationRules: [{type: 'required'}]
            }, 'field2']
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          grid.editRow(0);
          this.clock.tick(10);
          var $firstCell = $(grid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-focused'), 'cell should be focused');
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell should be invalid');
        });
        ['Cell', 'Batch'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Editing cell with undefined value should be validated (T913725)"), function(assert) {
            var gridConfig = {
              dataSource: [{
                field1: undefined,
                field2: 1
              }],
              keyExpr: 'field2',
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true
              },
              columns: [{
                dataField: 'field1',
                validationRules: [{type: 'required'}]
              }, 'field2']
            };
            var grid = createDataGrid(gridConfig);
            this.clock.tick(10);
            grid.editCell(0, 0);
            this.clock.tick(10);
            var $firstCell = $(grid.getCellElement(0, 0));
            assert.ok($firstCell.hasClass('dx-focused'), 'cell should be focused');
            assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell should be invalid');
          });
        });
        QUnit.testInActiveWindow('There should not be errors when a widget is disposed during validation on saving data', function(assert) {
          var gridConfig = {
            dataSource: [{
              field1: 'test',
              field2: 1
            }],
            keyExpr: 'field2',
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            columns: [{
              dataField: 'field1',
              validationRules: [{
                type: 'async',
                validationCallback: function(params) {
                  return $.Deferred().promise();
                }
              }]
            }]
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          grid.editCell(0, 0);
          this.clock.tick(10);
          grid.cellValue(0, 0, 'test1');
          this.clock.tick(10);
          try {
            grid.saveEditData();
            this.clock.tick(10);
            grid.dispose();
            this.clock.tick(10);
            assert.ok(true);
          } catch (error) {
            assert.ok(false, ("the following error is thrown: " + error.message));
          }
        });
        QUnit.testInActiveWindow('Error message should be positioned correctly at the bottom of a data cell', function(assert) {
          var gridConfig = {
            dataSource: [{
              id: 1,
              field1: 'test'
            }],
            keyExpr: 'id',
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columns: [{
              dataField: 'field1',
              validationRules: [{type: 'required'}]
            }]
          };
          var grid = createDataGrid(gridConfig);
          this.clock.tick(10);
          grid.editRow(0);
          this.clock.tick(10);
          grid.cellValue(0, 0, '');
          this.clock.tick(10);
          var $cell = $(grid.getCellElement(0, 0));
          var errorOverlay = $cell.find('.dx-invalid-message.dx-overlay').dxOverlay('instance');
          var bottomCellPosition = $cell.offset().top + $cell.outerHeight();
          var errorMessageTopPosition = $(errorOverlay.content()).offset().top;
          var errorMessageTopOffset = errorMessageTopPosition - bottomCellPosition;
          assert.roughEqual(errorMessageTopOffset, 0, 1.1, 'error message offset');
        });
        ['close edit cell', 'cancel editing'].forEach(function(action) {
          QUnit.testInActiveWindow(("data parameter in validationCallback function should be correct if showEditorAlways and repaintChangesOnly after " + action), function(assert) {
            var validationCallback = sinon.spy(function(e) {
              assert.deepEqual(e.data, {
                field: 1,
                field2: 123,
                id: 1
              }, 'row data');
              return true;
            });
            var grid = createDataGrid({
              dataSource: [{
                field: 1,
                field2: 2,
                id: 1
              }],
              keyExpr: 'id',
              repaintChangesOnly: true,
              editing: {
                mode: 'cell',
                allowUpdating: true
              },
              columns: [{dataField: 'field'}, {
                dataField: 'field2',
                showEditorAlways: true,
                validationRules: [{
                  type: 'custom',
                  reevaluate: true,
                  validationCallback: validationCallback
                }]
              }],
              loadingTimeout: null
            });
            $(grid.$element()).find('input').val(123).trigger('change');
            action === 'close edit cell' ? grid.closeEditCell() : grid.cancelEditData();
            this.clock.tick(10);
            $(grid.getCellElement(0, 1)).trigger('dxclick');
            this.clock.tick(10);
            var callCount = action === 'close edit cell' ? 3 : 4;
            assert.equal(validationCallback.callCount, callCount, 'validation callback call count');
          });
        });
        ['Row', 'Cell', 'Batch'].forEach(function(editMode) {
          [false, true].forEach(function(repaintChangesOnly) {
            QUnit.testInActiveWindow((editMode + " - the data parameter of the validationCallback should not be empty on cell focus (repaintChangesOnly = " + repaintChangesOnly + ") (T950070)"), function(assert) {
              var validationCallback = sinon.spy(function(e) {
                assert.deepEqual(e.data, {
                  id: 1,
                  name: 'test'
                }, 'row data');
                return true;
              });
              var dataGrid = createDataGrid({
                dataSource: [{
                  id: 1,
                  name: 'test'
                }],
                keyExpr: 'id',
                repaintChangesOnly: repaintChangesOnly,
                columns: [{
                  dataField: 'id',
                  validationRules: [{
                    type: 'custom',
                    validationCallback: validationCallback
                  }]
                }, {
                  dataField: 'name',
                  validationRules: [{
                    type: 'custom',
                    validationCallback: validationCallback
                  }]
                }],
                editing: {
                  mode: editMode.toLowerCase(),
                  allowUpdating: true
                },
                loadingTimeout: null
              });
              if (editMode === 'Row') {
                dataGrid.editRow(0);
              } else {
                dataGrid.editCell(0, 0);
              }
              this.clock.tick(10);
              $(dataGrid.getCellElement(0, 0)).find('.dx-texteditor-input').focus();
              this.clock.tick(10);
              if (editMode !== 'Row') {
                dataGrid.editCell(0, 1);
                this.clock.tick(10);
              }
              $(dataGrid.getCellElement(0, 1)).find('.dx-texteditor-input').focus();
              this.clock.tick(10);
              assert.equal(validationCallback.callCount, 2, 'validation callback call count');
            });
          });
        });
        QUnit.test('The onRowValidating event handler should not accept redundant broken rules in Batch (T960813)', function(assert) {
          var validatedRowKeys = [];
          var validatedMessages = [];
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              field1: 'f11',
              field2: 'f21'
            }, {
              id: 2,
              field1: 'f12',
              field2: 'f22'
            }, {
              id: 3,
              field1: 'f13',
              field2: 'f23'
            }, {
              id: 4,
              field1: 'f14',
              field2: 'f24'
            }],
            keyExpr: 'id',
            paging: {
              enabled: true,
              pageSize: 2
            },
            onRowValidating: function(args) {
              var $__6;
              validatedRowKeys.push(args.key);
              var rowBrokenRulesMessages = args.brokenRules.map(function(br) {
                return br.message;
              });
              ($__6 = validatedMessages).push.apply($__6, $traceurRuntime.spread(rowBrokenRulesMessages));
            },
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            columns: ['id', {
              dataField: 'field1',
              validationRules: [{type: 'required'}]
            }, {
              dataField: 'field2',
              validationRules: [{type: 'required'}]
            }],
            loadingTimeout: null
          });
          dataGrid.editCell(0, 1);
          this.clock.tick(10);
          dataGrid.cellValue(0, 1, '');
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          dataGrid.editCell(0, 2);
          this.clock.tick(10);
          dataGrid.cellValue(0, 2, '');
          this.clock.tick(10);
          dataGrid.saveEditData();
          this.clock.tick(10);
          assert.deepEqual(validatedRowKeys, [1, 3], 'validated row keys');
          assert.deepEqual(validatedMessages, ['Field 1 is required', 'Field 2 is required'], 'broken rules messages');
        });
        QUnit.testInActiveWindow('Batch - saveEditData after change cell value from invalid to valid if key is complex (T984377)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              id2: 1,
              field1: 'test12'
            }, {
              id: 1,
              id2: 2,
              field1: 'test22'
            }],
            keyExpr: ['id1', 'id2'],
            columns: [{
              dataField: 'field1',
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            loadingTimeout: null
          });
          dataGrid.editCell(0, 'field1');
          dataGrid.cellValue(0, 'field1', '');
          dataGrid.cellValue(0, 'field1', '123');
          dataGrid.saveEditData();
          assert.notOk(dataGrid.hasEditData(), 'changes are saved');
          assert.equal(dataGrid.cellValue(0, 'field1'), '123', 'cell value is changed');
        });
        ['Cell', 'Batch'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Data row should be removed(marked as removed) when a new row is rendered (T978455)"), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field1: 'test11',
                field2: 'test12'
              }, {
                id: 2,
                field1: 'test21',
                field2: 'test22'
              }],
              keyExpr: 'id',
              columns: ['field1', 'field2'],
              editing: {
                mode: editMode.toLowerCase(),
                allowAdding: true,
                allowDeleting: true,
                confirmDelete: false
              },
              loadingTimeout: null
            });
            $(dataGrid.element()).find('.dx-icon-edit-button-addrow').trigger('dxclick');
            this.clock.tick(10);
            var $firstRow = $(dataGrid.getRowElement(0));
            var $inputElement = $firstRow.find('.dx-texteditor-input').first();
            assert.ok($firstRow.hasClass('dx-row-inserted'), 'inserted row is rendered');
            $inputElement.val('tst').trigger('change');
            this.clock.tick(10);
            $(dataGrid.getRowElement(1)).find('.dx-link-delete').trigger('click');
            this.clock.tick(10);
            var visibleRows = dataGrid.getVisibleRows();
            if (editMode === 'Cell') {
              assert.equal(visibleRows.length, 2, 'visible row count');
              assert.strictEqual(visibleRows[0].data.field1, 'test21', 'field1 cell value of the first row');
              assert.strictEqual(visibleRows[1].data.field1, 'tst', 'field1 cell value of the second row');
              assert.notOk(visibleRows[1].isNewRow, 'the second row is not a new row');
            } else {
              var $secondRow = $(dataGrid.getRowElement(1));
              $firstRow = $(dataGrid.getRowElement(0));
              assert.ok($firstRow.hasClass('dx-row-inserted'), 'inserted row is rendered after delete click');
              assert.ok($secondRow.hasClass('dx-row-removed'), 'removed row is rendered after delete click');
              assert.equal(visibleRows.length, 3, 'visible row count');
              assert.strictEqual(visibleRows[0].data.field1, 'tst', 'field1 cell value of the first row');
              assert.ok(visibleRows[0].isNewRow, 'the first row is an inserted row');
              assert.strictEqual(visibleRows[1].data.field1, 'test11', 'field1 cell value of the second row');
              assert.ok(visibleRows[1].removed, 'the second row is a removed row');
              assert.strictEqual(visibleRows[2].data.field1, 'test21', 'field1 cell value of the second row');
            }
          });
          QUnit.testInActiveWindow((editMode + " - Data row should be removed(marked as removed) when a cell in another row is modified (T978455)"), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field1: 'test11',
                field2: 'test12'
              }, {
                id: 2,
                field1: 'test21',
                field2: 'test22'
              }],
              keyExpr: 'id',
              columns: ['field1', 'field2'],
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: false
              },
              loadingTimeout: null
            });
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            $firstCell.trigger('dxclick');
            this.clock.tick(10);
            $firstCell = $(dataGrid.getCellElement(0, 0));
            assert.ok($firstCell.hasClass('dx-editor-cell'), 'cell is rendered with an editor');
            var $inputElement = $firstCell.find('.dx-texteditor-input').first();
            $inputElement.val('tst').trigger('change');
            this.clock.tick(10);
            $(dataGrid.getRowElement(1)).find('.dx-link-delete').trigger('click');
            this.clock.tick(10);
            var visibleRows = dataGrid.getVisibleRows();
            if (editMode === 'Cell') {
              assert.equal(visibleRows.length, 1, 'visible row count');
              assert.strictEqual(visibleRows[0].data.field1, 'tst', 'field1 cell value of the first row');
              assert.notOk(visibleRows[0].isNewRow, 'the first row is not a new row');
            } else {
              var $secondRow = $(dataGrid.getRowElement(1));
              $firstCell = $(dataGrid.getCellElement(0, 0));
              assert.ok($firstCell.hasClass('dx-cell-modified'), 'first cell is rendered as modified');
              assert.ok($secondRow.hasClass('dx-row-removed'), 'removed row is rendered after delete click');
              assert.equal(visibleRows.length, 2, 'visible row count');
              assert.strictEqual(visibleRows[0].data.field1, 'tst', 'field1 cell value of the first row');
              assert.ok(visibleRows[0].modified, 'the first row is a modified row');
              assert.strictEqual(visibleRows[1].data.field1, 'test21', 'field1 cell value of the second row');
              assert.ok(visibleRows[1].removed, 'the second row is a removed row');
            }
          });
        });
        QUnit.testInActiveWindow('DropDownEditor Overlay should be closed on dropdown button click in ios (T998455)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              field1: 'test1'
            }],
            keyExpr: 'id',
            columns: [{
              dataField: 'field1',
              lookup: {
                valueExpr: 'this',
                displayExpr: 'this',
                dataSource: ['test1', 'test2']
              }
            }],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            loadingTimeout: null
          });
          dataGrid.editRow(0);
          var $dropDownEditor = $(dataGrid.getRowElement(0)).find('.dx-dropdowneditor');
          var $dropDownEditorIcon = $dropDownEditor.find('.dx-dropdowneditor-icon');
          $dropDownEditorIcon.trigger('dxclick');
          var selectBox = SelectBox.getInstance($dropDownEditor);
          assert.ok(selectBox.option('opened'), 'dropdowneditor is opened');
        });
        [true, false].forEach(function(repaintChangesOnly) {
          QUnit.testInActiveWindow(("Cascading lookup editors should be updated properly when repaintChangesOnly is " + repaintChangesOnly + " (T1005100)"), function(assert) {
            var dataGrid = createDataGrid({
              repaintChangesOnly: repaintChangesOnly,
              dataSource: [{
                id: 1,
                field1: 3,
                field2: 6
              }],
              keyExpr: 'id',
              columns: [{
                dataField: 'field1',
                lookup: {
                  valueExpr: 'id',
                  displayExpr: 'name',
                  dataSource: [{
                    id: 1,
                    name: 'name1'
                  }, {
                    id: 2,
                    name: 'name2'
                  }, {
                    id: 3,
                    name: 'name3'
                  }]
                },
                setCellValue: function(rowData, value) {
                  rowData.field1 = value;
                  rowData.field2 = null;
                }
              }, {
                dataField: 'field2',
                lookup: {
                  valueExpr: 'id',
                  displayExpr: 'name',
                  dataSource: function(options) {
                    return {
                      store: [{
                        id: 1,
                        name: 'name1',
                        cat: 1
                      }, {
                        id: 2,
                        name: 'name2',
                        cat: 1
                      }, {
                        id: 3,
                        name: 'name3',
                        cat: 2
                      }, {
                        id: 4,
                        name: 'name4',
                        cat: 2
                      }, {
                        id: 5,
                        name: 'name5',
                        cat: 3
                      }, {
                        id: 6,
                        name: 'name6',
                        cat: 3
                      }],
                      filter: options.data ? ['cat', '=', options.data.field1] : null
                    };
                  }
                }
              }],
              editing: {
                mode: 'row',
                allowUpdating: true
              },
              loadingTimeout: null
            });
            dataGrid.editRow(0);
            this.clock.tick(10);
            dataGrid.cellValue(0, 0, 1);
            this.clock.tick(10);
            var $field2EditorElement = $(dataGrid.getCellElement(0, 1)).find('.dx-dropdowneditor');
            var $field2EditorIcon = $field2EditorElement.find('.dx-dropdowneditor-icon');
            $field2EditorIcon.trigger('dxclick');
            var selectBoxField2 = SelectBox.getInstance($field2EditorElement);
            assert.strictEqual(selectBoxField2.option('value'), null, 'dropdowneditor value 1');
            assert.deepEqual(selectBoxField2.option('items'), [{
              id: 1,
              name: 'name1',
              cat: 1
            }, {
              id: 2,
              name: 'name2',
              cat: 1
            }], 'dropdowneditor items 1');
            $field2EditorIcon.trigger('dxclick');
            dataGrid.cellValue(0, 0, 2);
            this.clock.tick(10);
            $field2EditorElement = $(dataGrid.getCellElement(0, 1)).find('.dx-dropdowneditor');
            $field2EditorIcon = $field2EditorElement.find('.dx-dropdowneditor-icon');
            $field2EditorIcon.trigger('dxclick');
            selectBoxField2 = SelectBox.getInstance($field2EditorElement);
            assert.strictEqual(selectBoxField2.option('value'), null, 'dropdowneditor value 2');
            assert.deepEqual(selectBoxField2.option('items'), [{
              id: 3,
              name: 'name3',
              cat: 2
            }, {
              id: 4,
              name: 'name4',
              cat: 2
            }], 'dropdowneditor items 2');
            $field2EditorIcon.trigger('dxclick');
            dataGrid.cellValue(0, 0, 3);
            this.clock.tick(10);
            $field2EditorElement = $(dataGrid.getCellElement(0, 1)).find('.dx-dropdowneditor');
            $field2EditorIcon = $field2EditorElement.find('.dx-dropdowneditor-icon');
            $field2EditorIcon.trigger('dxclick');
            selectBoxField2 = SelectBox.getInstance($field2EditorElement);
            assert.strictEqual(selectBoxField2.option('value'), null, 'dropdowneditor value 2');
            assert.deepEqual(selectBoxField2.option('items'), [{
              id: 5,
              name: 'name5',
              cat: 3
            }, {
              id: 6,
              name: 'name6',
              cat: 3
            }], 'dropdowneditor items 2');
          });
          QUnit.testInActiveWindow(("Data store should not be updated when a boolean cell value is invalid (cell mode)(repaintChangesOnly=" + repaintChangesOnly + ")(T1010440)"), function(assert) {
            var data = [{
              id: 1,
              field1: 'test',
              field2: true
            }];
            var updateSpy = sinon.spy(function(_, values) {
              data[0].field2 = values.field2;
            });
            var dataGrid = createDataGrid({
              repaintChangesOnly: repaintChangesOnly,
              dataSource: {
                key: 'id',
                load: function() {
                  return data;
                },
                update: updateSpy
              },
              columns: ['field1', {
                dataField: 'field2',
                validationRules: [{
                  type: 'custom',
                  validationCallback: function(params) {
                    return params.value;
                  }
                }]
              }],
              editing: {
                mode: 'cell',
                allowUpdating: true
              }
            });
            this.clock.tick(10);
            $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(dataGrid.cellValue(0, 1), false, 'cell value after the first click');
            assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-datagrid-invalid'), 'cell invalid after the first click');
            assert.notOk(updateSpy.called, 'update is not called after the first click');
            $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(dataGrid.cellValue(0, 1), true, 'cell value after the second click');
            assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass('dx-datagrid-invalid'), 'cell valid after the second click');
            assert.strictEqual(updateSpy.callCount, 1, 'update is called after the first click');
            assert.strictEqual(updateSpy.args[0][1].field2, true, 'update is called with valid value');
            $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(dataGrid.cellValue(0, 1), false, 'cell value after the third click');
            assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-datagrid-invalid'), 'cell invalid after the third click');
            assert.strictEqual(updateSpy.callCount, 1, 'update is not called after the third click');
          });
          QUnit.testInActiveWindow(("Data store should not be inserted when a boolean cell value is invalid (cell mode)(repaintChangesOnly=" + repaintChangesOnly + ")(T1010440)"), function(assert) {
            var data = [{
              id: 1,
              field1: 'test',
              field2: true
            }];
            var insertSpy = sinon.spy(function() {});
            var dataGrid = createDataGrid({
              repaintChangesOnly: repaintChangesOnly,
              dataSource: {
                key: 'id',
                load: function() {
                  return data;
                },
                insert: insertSpy
              },
              columns: ['field1', {
                dataField: 'field2',
                validationRules: [{
                  type: 'custom',
                  validationCallback: function(params) {
                    return params.value;
                  }
                }]
              }],
              editing: {
                mode: 'cell',
                allowAdding: true,
                allowUpdating: true
              }
            });
            this.clock.tick(10);
            $(dataGrid.element()).find('.dx-datagrid-addrow-button').trigger('dxclick');
            this.clock.tick(10);
            assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-row-inserted'), 'first row is inserted');
            $(dataGrid.getRowElement(1)).trigger('dxclick');
            this.clock.tick(10);
            assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-datagrid-invalid'), 'cell is invalid after the first click');
            assert.notOk(insertSpy.called, 'insert is not called after the first click');
            $(dataGrid.getCellElement(0, 1)).trigger('dxclick');
            this.clock.tick(10);
            $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
            this.clock.tick(10);
            $(dataGrid.getRowElement(1)).trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(insertSpy.callCount, 1, 'insert is called after the last click');
            assert.strictEqual(insertSpy.args[0][0].field2, true, 'insert is called with valid value');
          });
        });
        ['Batch', 'Cell'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Cell value should not be reset when a checkbox in a neigboring cell is clicked (T1023809)"), function(assert) {
            if (devices.real().deviceType === 'desktop') {
              assert.ok(true, 'test only for mobile devices');
              return;
            }
            var data = [{
              id: 1,
              field1: 'test',
              field2: true
            }];
            var dataGrid = createDataGrid({
              dataSource: data,
              keyExpr: 'id',
              columns: ['field1', 'field2'],
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true
              }
            });
            this.clock.tick(10);
            dataGrid.editCell(0, 0);
            this.clock.tick(10);
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            var $firstInput = $firstCell.find('input.dx-texteditor-input');
            $firstInput.focus();
            this.clock.tick(10);
            assert.ok($firstCell.hasClass('dx-focused'));
            assert.ok($firstInput.is(':focus'), 'input is focused');
            $firstInput.on('blur', function(e) {
              $(e.target).trigger('change');
            });
            $firstInput.val('123');
            var $secondCell = $(dataGrid.getCellElement(0, 1));
            $secondCell.find('.dx-checkbox').trigger(pointerEvents.down);
            this.clock.tick(10);
            $secondCell = $(dataGrid.getCellElement(0, 1));
            $secondCell.find('.dx-checkbox').trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(dataGrid.cellValue(0, 0), '123', 'first cell value');
            assert.strictEqual(dataGrid.cellValue(0, 1), false, 'second cell value');
          });
        });
        QUnit.test('Cell - Revert button should not rerendered on focus', function(assert) {
          var $__3 = this;
          try {
            var lookupDataSource = [{value: 'first'}, {value: 'second'}, {value: 'third'}, {value: 'fourh'}, {value: 'fifth'}];
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field1: 'test11',
                field2: 'first'
              }],
              keyExpr: 'id',
              editing: {
                mode: 'cell',
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true
              },
              columns: ['field1', {
                dataField: 'field2',
                lookup: {
                  dataSource: lookupDataSource,
                  displayExpr: 'value',
                  valueExpr: 'value'
                }
              }]
            });
            this.clock.tick(10);
            var getLookupCell = function() {
              return dataGrid.getCellElement(0, 1);
            };
            var selectLookupValue = function(lookupValueIndex) {
              $(getLookupCell()).trigger('dxclick');
              $__3.clock.tick(10);
              $(getLookupCell()).find('.dx-dropdowneditor-button').trigger('dxclick');
              $__3.clock.tick(10);
              $('.dx-scrollable-wrapper .dx-scrollview-content .dx-item-content').eq(lookupValueIndex).trigger('dxclick');
              $__3.clock.tick(10);
            };
            selectLookupValue(1);
            var revertButton = $('.dx-revert-button').get(0);
            selectLookupValue(2);
            assert.strictEqual($('.dx-revert-button').get(0), revertButton, 'revert button should not be rerendered');
          } catch (e) {
            assert.ok(false, 'error occured');
          }
        });
        ['Cell', 'Batch'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - cell value should be validated when a value in a neighboring cell is modified (repaintChangesOnly enabled) (T1026857)"), function(assert) {
            var data = [{
              id: 1,
              field1: null,
              field2: 'test'
            }];
            var dataGrid = createDataGrid({
              dataSource: data,
              keyExpr: 'id',
              columns: [{
                dataField: 'field1',
                validationRules: [{type: 'required'}]
              }, 'field2'],
              repaintChangesOnly: true,
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true
              }
            });
            this.clock.tick(10);
            dataGrid.editCell(0, 1);
            this.clock.tick(10);
            var $input = $(dataGrid.getCellElement(0, 1)).find('input.dx-texteditor-input');
            $input.val('123');
            $input.trigger('change');
            dataGrid.saveEditData();
            this.clock.tick(10);
            assert.ok($(dataGrid.getCellElement(0, 0)).hasClass('dx-datagrid-invalid'), 'unmodified cell is invalid');
          });
        });
        QUnit.test('Editing cell editor\'s content should not be selected twice', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true,
              selectTextOnEditStart: true
            }
          });
          var onSelectedSpy = sinon.spy();
          this.clock.tick(100);
          var $cell = $(dataGrid.getCellElement(0, 0)).trigger('dxclick');
          this.clock.tick(100);
          var $editor = $cell.find('.dx-texteditor-input');
          $editor.on('select', onSelectedSpy);
          $editor.val('asd').trigger('change');
          this.clock.tick(100);
          assert.strictEqual(onSelectedSpy.callCount, 0, 'is not selected after change');
        });
        QUnit.testInActiveWindow('key should not be compared many times on paging (T1047506)', function(assert) {
          var idCallCount = 0;
          var items = Array.from({length: 50}).map(function(_, index) {
            return {id: {get value() {
                  idCallCount++;
                  return index;
                }}};
          });
          var dataGrid = createDataGrid({
            height: 500,
            dataSource: items,
            keyExpr: 'id',
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(10);
          idCallCount = 0;
          dataGrid.pageIndex(1);
          assert.equal(idCallCount, 200, 'key call count after paging');
        });
        QUnit.test('Popup should render editor if columns[].renderAsync option is true', function(assert) {
          createDataGrid({
            dataSource: [{
              id: 1,
              field1: 'test11',
              field2: 'test12'
            }],
            columns: [{
              dataField: 'field1',
              renderAsync: true,
              width: 100
            }],
            editing: {
              mode: 'popup',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          $('.dx-link-edit').trigger('click');
          this.clock.tick(10);
          var $textBox = $('.dx-textbox');
          assert.equal($textBox.length, 1);
        });
        [false, true].forEach(function(repaintChangesOnly) {
          QUnit.test(("Popup should rerender cascade editor if columns[].renderAsync option is true and repaintChangesOnly is " + repaintChangesOnly + " (T1073423)"), function(assert) {
            var dataGrid = createDataGrid({
              repaintChangesOnly: repaintChangesOnly,
              dataSource: [{
                id: 1,
                field1: 'test11',
                field2: 'test2'
              }],
              columns: [{
                dataField: 'field1',
                setCellValue: function(newData, value) {
                  newData.field1 = value;
                  newData.field2 = value;
                }
              }, {
                dataField: 'field2',
                renderAsync: true
              }],
              editing: {
                mode: 'popup',
                allowUpdating: true
              }
            });
            this.clock.tick(10);
            dataGrid.editRow(0);
            this.clock.tick(10);
            var editor1 = $(dataGrid.getCellElement(0, 0)).find('.dx-textbox').dxTextBox('instance');
            editor1.option('value', 'test');
            this.clock.tick(10);
            var editor2 = $(dataGrid.getCellElement(0, 1)).find('.dx-textbox').dxTextBox('instance');
            assert.ok(editor2, 'second editor exists');
            assert.equal(editor2.option('value'), 'test', 'second editor is updated');
          });
        });
        ['Row', 'Form'].forEach(function(editMode) {
          QUnit.test((editMode + " - Modified value should not be saved when a new row is added (T1076827)"), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                field1: 'test11',
                field2: 'test2'
              }],
              columns: ['field1', 'field2'],
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true,
                allowAdding: true
              }
            });
            this.clock.tick(10);
            dataGrid.editRow(0);
            this.clock.tick(10);
            assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-edit-row'), 'row is in editing mode');
            if (editMode === 'Form') {
              assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-datagrid-edit-form'), 'edit form in a row');
            }
            $(dataGrid.getRowElement(0)).find('.dx-texteditor-input:eq(0)').val('123').trigger('change');
            assert.strictEqual(dataGrid.cellValue(0, 0), '123', 'cell value is modified');
            dataGrid.addRow();
            this.clock.tick(10);
            assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-row-inserted'), 'first inserted row');
            if (editMode === 'Form') {
              assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-datagrid-edit-form'), 'edit form in the first row');
            }
            assert.notOk($(dataGrid.getRowElement(1)).hasClass('dx-edit-row'), 'second row is not in editing mode');
            assert.equal($(dataGrid.getRowElement(1)).find('.dx-cell-modified').length, 0, 'no modified cells in the second row');
            assert.equal($(dataGrid.getRowElement(1)).find('.dx-texteditor-input').length, 0, 'no inputs in the second row');
            if (editMode === 'Form') {
              assert.notOk($(dataGrid.getRowElement(1)).hasClass('dx-datagrid-edit-form'), 'edit form not in the second row');
            }
            assert.strictEqual(dataGrid.cellValue(1, 0), 'test11', 'cell is not modified');
            assert.equal(dataGrid.option('editing.changes').length, 1, 'one change');
            assert.strictEqual(dataGrid.option('editing.changes')[0].type, 'insert', 'insert type');
          });
        });
        var isNewRowExists = function(dataGrid, editMode) {
          if (editMode === 'popup') {
            return $('.dx-overlay-wrapper.dx-datagrid-edit-popup').is(':visible');
          }
          return !!$(dataGrid.$element()).find('.dx-row-inserted').length;
        };
        ['row', 'form', 'popup', 'cell', 'batch'].forEach(function(editMode) {
          QUnit.test(("The " + editMode + " edit mode - No exceptions on cancel new row addition when a column is fixed and grouped"), function(assert) {
            try {
              var dataGrid = createDataGrid({
                dataSource: [{
                  field1: 'test1',
                  field2: 'test2',
                  field3: 'test3'
                }],
                repaintChangesOnly: true,
                columns: [{
                  dataField: 'field1',
                  fixed: true,
                  groupIndex: 0
                }, 'field2', 'field3'],
                editing: {
                  mode: editMode,
                  allowAdding: true
                }
              });
              this.clock.tick(100);
              dataGrid.addRow();
              this.clock.tick(10);
              assert.ok(isNewRowExists(dataGrid, editMode), 'there is a new row');
              dataGrid.cancelEditData();
              this.clock.tick(10);
              assert.notOk(isNewRowExists(dataGrid, editMode), 'no new row');
            } catch (e) {
              assert.ok(false, 'exception is thrown');
            }
          });
        });
        QUnit.test('editing.changes two-way binding - Form should not be rendered when edit a row', function(assert) {
          try {
            var editMode = 'form';
            var dataGrid = createDataGrid({
              dataSource: [{
                field1: 'test1',
                field2: 'test2',
                field3: 'test3'
              }],
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowEditing: true
              },
              columns: ['field1', 'field2', 'field3']
            });
            this.clock.tick(100);
            var setCellValue = function(rowIndex, columnIndex, value) {
              var $input = $(dataGrid.getCellElement(rowIndex, columnIndex)).find('input');
              $input.val(value);
              $input.trigger('change');
            };
            dataGrid.editRow(0);
            var twoWayBindingChanges = function() {
              dataGrid.option('editing.changes', dataGrid.option('editing.changes'));
            };
            var renderCalled = false;
            var contentReadyHandler = function() {
              renderCalled = true;
            };
            dataGrid.on('contentReady', contentReadyHandler);
            setCellValue(0, 0, 'hey');
            twoWayBindingChanges();
            assert.notOk(renderCalled, 'rerender should not be called');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('editing.changes two-way binding - Form should not be rendered when add a row', function(assert) {
          try {
            var editMode = 'form';
            var dataGrid = createDataGrid({
              dataSource: [{
                field1: 'test1',
                field2: 'test2',
                field3: 'test3'
              }],
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowEditing: true
              },
              columns: [{
                dataField: 'field1',
                visible: false
              }, 'field2', 'field3']
            });
            this.clock.tick(100);
            var setCellValue = function(rowIndex, columnIndex, value) {
              var $input = $(dataGrid.getCellElement(rowIndex, columnIndex)).find('input');
              $input.val(value);
              $input.trigger('change');
            };
            dataGrid.addRow();
            var twoWayBindingChanges = function() {
              dataGrid.option('editing.changes', dataGrid.option('editing.changes'));
            };
            var renderCalled = false;
            var contentReadyHandler = function() {
              renderCalled = true;
            };
            dataGrid.on('contentReady', contentReadyHandler);
            setCellValue(0, 0, 'hey');
            twoWayBindingChanges();
            assert.notOk(renderCalled, 'rerender should not be called');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('editing.changes two-way binding - form must be rerendered after \'editing.changes\' options has been changed by variable', function(assert) {
          try {
            var editMode = 'form';
            var dataGrid = createDataGrid({
              dataSource: [{
                field1: 'test1',
                field2: 'test2',
                field3: 'test3'
              }],
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowEditing: true
              },
              columns: [{
                dataField: 'field1',
                visible: false
              }, 'field2', 'field3']
            });
            this.clock.tick(100);
            var setCellValue = function(rowIndex, columnIndex, value) {
              var $input = $(dataGrid.getCellElement(rowIndex, columnIndex)).find('input');
              $input.val(value);
              $input.trigger('change');
            };
            var twoWayBindingChanges = function(x) {
              dataGrid.option('editing.changes', dataGrid.option('editing.changes'));
            };
            dataGrid.addRow();
            setCellValue(0, 0, 'helllo');
            var renderCounter = 0;
            var contentReadyHandler = function() {
              renderCounter++;
            };
            dataGrid.on('contentReady', contentReadyHandler);
            var insertRowChanges = dataGrid.option('editing.changes');
            insertRowChanges[0].data.field1 = 'test_text';
            dataGrid.option('editing.changes', insertRowChanges);
            twoWayBindingChanges(insertRowChanges);
            var value = dataGrid.cellValue(0, 'field1');
            assert.strictEqual(value, 'test_text', 'value must be changed');
            assert.strictEqual(renderCounter, 1, 'render must be called 1 time');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('The form edit mode - Validation should work if value of a column with custom setCellValue changed', function(assert) {
          try {
            var editMode = 'form';
            var dataGrid = createDataGrid({
              dataSource: [{
                field1: 'test1',
                field2: 'test2',
                field3: 'test3'
              }],
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowAdding: true
              },
              columns: [{
                dataField: 'field1',
                setCellValue: function(newData, value) {
                  this.defaultSetCellValue(newData, value);
                },
                validationRules: [{type: 'required'}]
              }, {
                dataField: 'field2',
                validationRules: [{
                  type: 'custom',
                  validationCallback: function(data) {
                    return data.value !== 'incorrect';
                  }
                }]
              }, {
                dataField: 'field3',
                validationRules: [{type: 'required'}]
              }]
            });
            this.clock.tick(100);
            var isValidCell = function(rowIndex, columnIndex) {
              return !$(dataGrid.getCellElement(rowIndex, columnIndex)).find('.dx-invalid').length;
            };
            var setCellValue = function(rowIndex, columnIndex, value) {
              var $input = $(dataGrid.getCellElement(rowIndex, columnIndex)).find('input');
              $input.val(value);
              $input.trigger('change');
            };
            dataGrid.addRow();
            this.clock.tick(10);
            assert.ok(isNewRowExists(dataGrid, editMode), 'there is a new row');
            setCellValue(0, 0, 'test');
            this.clock.tick(10);
            assert.ok(isValidCell(0, 0), 'first cell is valid');
            assert.ok(isValidCell(0, 1), 'second cell is valid');
            assert.ok(isValidCell(0, 2), 'third cell is valid');
            setCellValue(0, 1, 'incorrect');
            this.clock.tick(10);
            setCellValue(0, 2, 'test');
            this.clock.tick(10);
            setCellValue(0, 2, '');
            this.clock.tick(10);
            assert.notOk(isValidCell(0, 1), 'second cell is not valid');
            assert.notOk(isValidCell(0, 2), 'third cell is not valid');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('The form edit mode - Only one validation message should be shown', function(assert) {
          try {
            var editMode = 'form';
            var dataGrid = createDataGrid({
              dataSource: [{
                field1: 'test1',
                field2: 'test2'
              }],
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowEditing: true
              },
              columns: ['field1', {
                dataField: 'field2',
                validationRules: [{type: 'required'}]
              }]
            });
            var navigationController = dataGrid.getController('keyboardNavigation');
            this.clock.tick(10);
            var emulateEnterKeyPress = function() {
              var event = $.Event('keydown', {target: $('#qunit-fixture').find(':focus').get(0)});
              navigationController._keyDownHandler({
                key: 'Enter',
                keyName: 'enter',
                originalEvent: event
              });
            };
            dataGrid.editRow(0);
            var $input = $(dataGrid.getCellElement(0, 1)).find('input');
            $input.val('');
            $input.trigger('change');
            this.clock.tick(10);
            $input.trigger('focus');
            this.clock.tick(10);
            emulateEnterKeyPress();
            this.clock.tick(10);
            emulateEnterKeyPress();
            this.clock.tick(10);
            var validationMessages = $('.dx-invalid-message.dx-widget');
            assert.strictEqual(validationMessages.length, 1, 'only 1 validation message must be shown');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('The cell edit mode - editCell method should be called only one time if clicking on cell with showEditorAlways = true', function(assert) {
          var $__3 = this;
          try {
            var editMode = 'cell';
            var dataGrid = createDataGrid({
              dataSource: {
                store: [{
                  selected: true,
                  field2: 'test1'
                }, {
                  selected: true,
                  field2: 'test2'
                }],
                filter: ['selected', '=', true]
              },
              repaintChangesOnly: true,
              editing: {
                mode: editMode,
                allowUpdating: true
              },
              columns: ['selected', 'field2']
            });
            this.clock.tick(10);
            var clickWithMouseDownEvent = function(element) {
              $(element).trigger('dxpointerdown');
              $__3.clock.tick(10);
              $(element).trigger('dxclick');
              $__3.clock.tick(10);
            };
            var checkbox2 = $(dataGrid.getCellElement(0, 0)).find('.dx-checkbox');
            var checkbox1 = $(dataGrid.getCellElement(1, 0)).find('.dx-checkbox');
            clickWithMouseDownEvent(checkbox1);
            clickWithMouseDownEvent(checkbox2);
            assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'no items should be in the grid');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        QUnit.test('totalCount should be correct after removing/adding rows when refreshMode is reshape and scrolling.mode is virtual', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            editing: {
              refreshMode: 'reshape',
              confirmDelete: false
            },
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.totalCount(), 2, 'totalCount before update');
          dataGrid.addRow();
          this.clock.tick(10);
          dataGrid.saveEditData();
          this.clock.tick(10);
          assert.strictEqual(dataGrid.totalCount(), 3, 'totalCount after adding row');
          dataGrid.deleteRow(1);
          this.clock.tick(10);
          dataGrid.deleteRow(1);
          this.clock.tick(10);
          assert.strictEqual(dataGrid.totalCount(), 1, 'totalCount after removing rows');
        });
        QUnit.test('Show editing popup if editRowKey is specified in popup edit mode', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              field1: 'test11',
              field2: 'test12'
            }],
            keyExpr: 'id',
            columns: ['field1', 'field2'],
            editing: {
              mode: 'popup',
              allowUpdating: true,
              editRowKey: 1
            }
          });
          this.clock.tick(10);
          var $popupContent = dataGrid.getController('editing').getPopupContent() || [];
          assert.equal($popupContent.length, 1, 'There is editing popup');
        });
        QUnit.test('Editing lookups with lookup optimization in form should work', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              value: 1,
              displayValue: 'text1'
            }],
            columns: [{
              dataField: 'value',
              calculateDisplayValue: 'displayValue',
              lookup: {
                dataSource: [{
                  id: 1,
                  text: 'text1'
                }, {
                  id: 2,
                  text: 'text2'
                }],
                valueExpr: 'id',
                displayExpr: 'text'
              }
            }],
            editing: {
              mode: 'form',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          $(dataGrid.getCellElement(0, 0)).find('.dx-selectbox').dxSelectBox('option', 'value', 2);
          dataGrid.saveEditData();
          this.clock.tick(10);
          var $cell = $(dataGrid.getCellElement(0, 0));
          assert.strictEqual($cell.text(), 'text2', 'new lookup display value');
        });
        QUnit.test('A cell with a TextArea editor should not close when a mouse click is released outside the editor', function(assert) {
          var $firstCell;
          var $textArea;
          var dataGrid = createDataGrid({
            dataSource: [{
              value: 1,
              displayValue: 'text1'
            }],
            showBorders: true,
            columns: [{dataField: 'displayValue'}],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onEditorPreparing: function(e) {
              e.editorName = 'dxTextArea';
            }
          });
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $textArea = $firstCell.find('textarea');
          assert.equal($textArea.length, 1, 'textarea should appear');
          $textArea.trigger($.Event('dxpointerdown'));
          $textArea.trigger($.Event('dxpointerup'));
          $textArea.trigger($.Event('click', {target: $('body').get(0)}));
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $textArea = $firstCell.find('textarea');
          assert.equal($textArea.length, 1, 'textarea should not disappear');
        });
      });
      QUnit.module('Validation with virtual scrolling and rendering', {
        beforeEach: function() {
          var $__3 = this;
          this.addHiddenColumn = function() {
            $__3.columns.push({
              dataField: 'hiddenField',
              dataType: 'number',
              visible: false,
              validationRules: [{type: 'required'}]
            });
          };
          this.data = [];
          for (var i = 0; i < 100; i++) {
            this.data.push({
              field: i,
              hiddenField: i
            });
          }
          this.columns = [{
            dataField: 'field',
            dataType: 'number',
            validationRules: [{type: 'required'}]
          }];
          this.gridOptions = {
            height: 400,
            dataSource: this.data,
            showBorders: true,
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            },
            paging: {pageSize: 50},
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowUpdating: true
            },
            columns: this.columns
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Validation error hightlighting should not disappear after scrolling', function(assert) {
          var $input;
          var $firstCell;
          var dataGrid = createDataGrid(this.gridOptions);
          this.clock.tick(500);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $input.val('');
          $input.trigger('change');
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell is invalid');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          scrollable.scrollTo({y: 0});
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell is invalid');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
        });
        QUnit.test('Validation error hightlighting should not disappear after scrolling if newly added row failed validation', function(assert) {
          var $input;
          var $firstCell;
          var dataGrid = createDataGrid(this.gridOptions);
          this.clock.tick(500);
          dataGrid.addRow();
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.notOk($firstCell.hasClass('dx-datagrid-invalid'), 'cell has not invalid class');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          scrollable.scrollTo({y: 0});
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell has invalid class');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
        });
        QUnit.test('Validation should work after editing row and scrolling if grid has hidden column with validationRules. Cell edit mode', function(assert) {
          var $input;
          var $firstCell;
          this.addHiddenColumn();
          var dataGrid = createDataGrid(this.gridOptions);
          this.clock.tick(500);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $input.val('');
          $input.trigger('change');
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell has not invalid class');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          scrollable.scrollTo({y: 0});
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell has not invalid class');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          assert.equal(this.data[0].field, 0, 'changes were not saved');
        });
        QUnit.test('Validation should work after editing row and scrolling if grid has hidden column with validationRules. Batch edit mode', function(assert) {
          var $input;
          var $firstCell;
          this.gridOptions.editing.mode = 'batch';
          this.addHiddenColumn();
          var dataGrid = createDataGrid(this.gridOptions);
          this.clock.tick(500);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $input.val('');
          $input.trigger('change');
          $firstCell.trigger('dxclick');
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell has invalid class');
          assert.ok($firstCell.hasClass('dx-cell-modified'), 'modified cell');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          var $saveButton = $('.dx-datagrid-save-button');
          $saveButton.trigger('dxclick');
          this.clock.tick(10);
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          assert.notOk($saveButton.hasClass('dx-state-disabled'), 'save button is not disabled');
          scrollable.scrollTo({y: 0});
          this.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          var $errorRow = $(dataGrid.$element().find('.dx-error-message'));
          assert.ok($firstCell.hasClass('dx-datagrid-invalid'), 'cell has invalid class');
          assert.ok($firstCell.hasClass('dx-cell-modified'), 'modified cell');
          assert.ok($input, 'cell has input');
          assert.equal(this.data[0].field, 0, 'changes were not saved');
          assert.ok($errorRow, 'error row');
          assert.equal($errorRow.text(), '', 'error message');
        });
        function rowAddingValidationWithInvalidHiddenColumnTest(that, assert, editMode) {
          var $input;
          var onRowValidatingSpy = sinon.spy();
          var $firstCell;
          that.gridOptions.editing.mode = editMode;
          that.gridOptions.onRowValidating = onRowValidatingSpy;
          that.addHiddenColumn();
          var dataGrid = createDataGrid(that.gridOptions);
          that.clock.tick(500);
          dataGrid.addRow();
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $firstCell.trigger('dxclick');
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.notOk($firstCell.hasClass('dx-datagrid-invalid'), 'cell has not invalid class');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          dataGrid.saveEditData();
          that.clock.tick(10);
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          scrollable.scrollTo({y: 0});
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          var $errorRow = $(dataGrid.$element().find('.dx-error-message'));
          if (editMode === 'cell') {
            assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          } else {
            assert.ok($firstCell.hasClass('dx-cell-modified'), 'modified cell');
          }
          assert.ok($input, 'cell has input');
          assert.ok($errorRow, 'error row');
          assert.equal($errorRow.text(), 'Hidden Field is required', 'error message');
          assert.equal(that.data.length, 100, 'data was not modified');
          assert.equal(onRowValidatingSpy.callCount, 1, 'onRowValidating call count');
          var onRowValidatingArguments = onRowValidatingSpy.args[0][0];
          var brokenRules = onRowValidatingArguments.brokenRules;
          assert.equal(brokenRules.length, 2, 'brokenRules length');
          assert.notOk(brokenRules[0].isValid, 'is not valid');
          assert.equal(brokenRules[0].type, 'required', 'rule type');
          assert.equal(brokenRules[0].columnIndex, 0, 'column index');
          assert.notOk(brokenRules[1].isValid, 'is not valid');
          assert.equal(brokenRules[1].type, 'required', 'rule type');
          assert.equal(brokenRules[1].columnIndex, 1, 'column index');
        }
        QUnit.test('Validation should work after adding new row and scrolling if grid has invalid hidden column with validationRules. Cell edit mode', function(assert) {
          rowAddingValidationWithInvalidHiddenColumnTest(this, assert, 'cell');
        });
        QUnit.test('Validation should work after adding new row and scrolling if grid has invalid hidden column with validationRules. Batch edit mode', function(assert) {
          rowAddingValidationWithInvalidHiddenColumnTest(this, assert, 'batch');
        });
        function rowAddingValidationWithValidHiddenColumnTest(that, assert, editMode) {
          var $input;
          var onRowValidatingSpy = sinon.spy();
          var $firstCell;
          that.addHiddenColumn();
          that.gridOptions.onRowValidating = onRowValidatingSpy;
          that.gridOptions.onInitNewRow = function(e) {
            e.data.hiddenField = 100;
          };
          that.gridOptions.editing.mode = editMode;
          var dataGrid = createDataGrid(that.gridOptions);
          that.clock.tick(500);
          dataGrid.addRow();
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          assert.ok($input, 'cell has input');
          $firstCell.trigger('dxclick');
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          assert.notOk($firstCell.hasClass('dx-datagrid-invalid'), 'cell has not invalid class');
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 1000});
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          dataGrid.saveEditData();
          that.clock.tick(10);
          assert.notOk(dataGrid.$element().find('dx-datagrid-invalid').length, 'no invalid cells');
          scrollable.scrollTo({y: 0});
          that.clock.tick(10);
          $firstCell = $(dataGrid.getCellElement(0, 0));
          $input = $firstCell.find('input');
          var $errorRow = $(dataGrid.$element().find('.dx-error-message'));
          if (editMode === 'cell') {
            assert.ok($firstCell.hasClass('dx-editor-cell'), 'editor cell');
          } else {
            assert.ok($firstCell.hasClass('dx-cell-modified'), 'modified cell');
          }
          assert.ok($input, 'cell has input');
          assert.ok($errorRow, 'error row');
          assert.equal($errorRow.text(), '', 'error message');
          assert.equal(that.data.length, 100, 'data was not modified');
          assert.equal(onRowValidatingSpy.callCount, 1, 'onRowValidating call count');
          var onRowValidatingArguments = onRowValidatingSpy.args[0][0];
          var brokenRules = onRowValidatingArguments.brokenRules;
          assert.equal(brokenRules.length, 1, 'brokenRules length');
          assert.notOk(brokenRules[0].isValid, 'is not valid');
          assert.equal(brokenRules[0].type, 'required', 'rule type');
          assert.equal(brokenRules[0].columnIndex, 0, 'column index');
        }
        QUnit.test('Validation should work after adding new row and scrolling if grid has valid hidden column with validationRules. Cell edit mode', function(assert) {
          rowAddingValidationWithValidHiddenColumnTest(this, assert, 'cell');
        });
        QUnit.test('Validation should work after adding new row and scrolling if grid has valid hidden column with validationRules. Batch edit mode', function(assert) {
          rowAddingValidationWithValidHiddenColumnTest(this, assert, 'batch');
        });
        QUnit.testInActiveWindow('Edit cell on onContentReady', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              firstName: 'Andrey',
              lastName: 'Prohorov'
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onContentReady: function(e) {
              e.component.editCell(0, 1);
            }
          });
          this.clock.tick(10);
          var $cellElement = $(dataGrid.getCellElement(0, 1));
          assert.ok($cellElement.hasClass('dx-editor-cell'), 'cell has editor');
          assert.ok($cellElement.find('.dx-texteditor-input').is(':focus'), 'cell editor is focused');
        });
        QUnit.testInActiveWindow('No exceptions on an attempt to add a change object for an invisible row to the editing.changes option', function(assert) {
          var changes = [];
          var items = generateItems(100);
          var dataGrid = createDataGrid({
            dataSource: items,
            keyExpr: 'id',
            height: 100,
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            scrolling: {rowRenderingMode: 'virtual'},
            paging: {enabled: false}
          });
          this.clock.tick(100);
          items.forEach(function(item, index) {
            changes.push({
              key: item.id,
              type: 'update',
              data: {field1: 'changed' + index}
            });
          });
          try {
            dataGrid.option('editing.changes', changes);
            assert.ok(true, 'There are no exceptions');
          } catch (err) {
            assert.ok(false, 'exception was threw:' + err);
          }
        });
      });
      QUnit.module('Virtual row rendering', baseModuleConfig, function() {
        QUnit.test('editing should starts correctly if scrolling mode is virtual', function(assert) {
          var array = [];
          for (var i = 1; i <= 50; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            onRowPrepared: function(e) {
              $(e.rowElement).css('height', 50);
            },
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({top: 500});
          dataGrid.editRow(1);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2, 'visible row count');
          assert.equal(visibleRows[0].key, 11, 'first visible row key');
          assert.equal($(dataGrid.getRowElement(1, 0)).find('.dx-texteditor').length, 1, 'row has editor');
        });
        QUnit.test('The virtual row should not be rendered after removing data rows via push API', function(assert) {
          var array = [];
          for (var i = 1; i <= 12; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: array,
            keyExpr: 'id',
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var store = dataGrid.getDataSource().store();
          store.push([{
            type: 'remove',
            key: 12
          }]);
          store.push([{
            type: 'remove',
            key: 11
          }]);
          this.clock.tick(10);
          assert.strictEqual($('#dataGrid').find('.dx-datagrid-rowsview').find('.dx-virtual-row').length, 0, 'no virtual rows');
        });
      });
      QUnit.module('Assign options', baseModuleConfig, function() {
        QUnit.test('change editing.allowAdding with onCellPrepared and dataSource options should update add row button', function(assert) {
          var dataGrid = createDataGrid({});
          dataGrid.option({
            editing: {allowAdding: true},
            onCellPrepared: function() {},
            dataSource: []
          });
          this.clock.tick(10);
          var $addRowButton = dataGrid.$element().find('.dx-datagrid-addrow-button');
          assert.strictEqual($addRowButton.length, 1, 'add row button is rendered');
        });
        QUnit.test('change editing.allowUpdating option should update editing column', function(assert) {
          var dataGrid = createDataGrid({dataSource: [{a: 1}, {a: 2}, {a: 3}]});
          var $deleteButton = dataGrid.$element().find('.dx-command-edit .dx-link-edit');
          assert.strictEqual($deleteButton.length, 0, 'edit button is not visible');
          dataGrid.option('editing.allowUpdating', true);
          this.clock.tick(10);
          $deleteButton = dataGrid.$element().find('.dx-command-edit .dx-link-edit');
          assert.strictEqual($deleteButton.length, dataGrid.totalCount(), 'edit button is visible');
          dataGrid.option('editing.allowUpdating', false);
          this.clock.tick(10);
          $deleteButton = dataGrid.$element().find('.dx-command-edit .dx-link-edit');
          assert.strictEqual($deleteButton.length, 0, 'edit button is not visible');
        });
        QUnit.test('Change editing.popup option should not reload data', function(assert) {
          var lookupLoadingSpy = sinon.spy();
          var dataGrid = createDataGrid({
            onInitNewRow: function(e) {
              e.component.option('editing.popup.title', 'New title');
            },
            dataSource: [],
            editing: {
              mode: 'popup',
              allowAdding: true,
              popup: {showTitle: true}
            },
            columns: [{
              dataField: 'Task_Assigned_Employee_ID',
              lookup: {
                dataSource: {load: function() {
                    lookupLoadingSpy();
                    var d = $.Deferred();
                    setTimeout(function() {
                      d.resolve([]);
                    }, 100);
                    return d.promise();
                  }},
                valueExpr: 'Customer_ID',
                displayExpr: 'Customer_Name'
              }
            }]
          });
          this.clock.tick(100);
          dataGrid.addRow();
          this.clock.tick(100);
          assert.equal(lookupLoadingSpy.callCount, 1, 'lookup is loaded once');
          assert.equal(dataGrid.getController('editing')._editPopup.option('title'), 'New title', 'popup title is updated');
        });
        QUnit.test('DataGrid should update editor values in Popup Edit Form if its data was reloaded (T815443)', function(assert) {
          var loadCallCount = 0;
          var changeEditorValue;
          var data = [{
            'name': 'Alex',
            'age': 22,
            'id': 1
          }];
          var dataGrid = createDataGrid({
            dataSource: {
              key: 'id',
              load: function() {
                if (loadCallCount > 0) {
                  data[0]['name'] = 'foo';
                }
                loadCallCount++;
                return data;
              }
            },
            editing: {
              mode: 'popup',
              allowUpdating: true
            },
            onEditorPreparing: function(args) {
              if (args.parentType === 'dataRow' && args.dataField === 'age') {
                changeEditorValue = function() {
                  args.setValue(30);
                  args.component.getDataSource().reload();
                };
              }
            }
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          changeEditorValue();
          this.clock.tick(10);
          var $popupEditorInput = $('.dx-popup-content').find('.dx-texteditor').eq(0).find('input').eq(0);
          assert.equal($popupEditorInput.val(), 'foo', 'value changed');
        });
      });
      QUnit.module('API methods', baseModuleConfig, function() {
        QUnit.test('add row without return key', function(assert) {
          var array = [{
            id: 1,
            name: 'Test 1'
          }];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            editing: {mode: 'batch'},
            dataSource: {
              key: 'id',
              load: function() {
                return array;
              },
              insert: function(values) {
                array.push(values);
              }
            }
          });
          dataGrid.addRow();
          dataGrid.saveEditData();
          assert.strictEqual(dataGrid.getVisibleRows().length, 2, 'visible rows');
          assert.strictEqual(dataGrid.hasEditData(), false, 'no edit data');
        });
        QUnit.test('Disable editing buttons after insert a row', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}],
            editing: {
              mode: 'batch',
              allowAdding: true,
              allowUpdating: true,
              allowDelete: true
            }
          });
          var $editButtons = $('#dataGrid .dx-edit-button');
          assert.ok(!$editButtons.eq(0).hasClass('dx-state-disabled'), 'Insert button isn\'t disabled');
          assert.ok($editButtons.eq(1).hasClass('dx-state-disabled'), 'Save button is disabled');
          assert.ok($editButtons.eq(2).hasClass('dx-state-disabled'), 'Revert button is disabled');
          dataGrid.addRow();
          $editButtons = $('#dataGrid .dx-edit-button');
          assert.ok(!$editButtons.eq(0).hasClass('dx-state-disabled'), 'Insert button isn\'t disabled');
          assert.ok(!$editButtons.eq(1).hasClass('dx-state-disabled'), 'Save button isn\'t disabled');
          assert.ok(!$editButtons.eq(2).hasClass('dx-state-disabled'), 'Revert button isn\'t disabled');
        });
        QUnit.test('add row after scrolling if rowRenderingMode is virtual', function(assert) {
          var array = [];
          for (var i = 1; i <= 20; i++) {
            array.push({
              id: i,
              text: 'text' + i
            });
          }
          var dataGrid = createDataGrid({
            height: 200,
            dataSource: array,
            keyExpr: 'id',
            loadingTimeout: null,
            paging: {pageSize: 10},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            },
            columns: ['id', 'text']
          });
          dataGrid.pageIndex(1);
          dataGrid.addRow();
          assert.ok(dataGrid.getVisibleRows()[0].isNewRow, 'inserted row exists');
          assert.deepEqual(dataGrid.getVisibleRows()[0].values, [undefined, undefined], 'inserted row values');
          assert.strictEqual(dataGrid.getVisibleRows()[1].key, 11, 'first visible row key');
        });
        QUnit.test('add row if dataSource is not defined', function(assert) {
          var dataGrid = createDataGrid({columns: ['id', 'text']});
          dataGrid.addRow();
          assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'no visible rows');
        });
        QUnit.test('insert row', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          dataGrid.addRow();
          assert.equal($('#dataGrid').find(TEXTEDITOR_INPUT_SELECTOR).length, 1);
          assert.equal($('#dataGrid').find('.dx-datagrid-rowsview').find('tbody > tr').length, 3, 'inserting row + data row + freespace row');
        });
        QUnit.test('Second add row should work if dataSource is changed via angular binding and validationRules are defined (T1064325)', function(assert) {
          var items = [{
            id: 1,
            text: 'text 1'
          }];
          var dataGrid = createDataGrid({
            keyExpr: 'id',
            dataSource: items,
            columns: [{
              dataField: 'text',
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'cell',
              allowAdding: true
            }
          });
          this.clock.tick(10);
          dataGrid.addRow();
          dataGrid.cellValue(0, 0, 'new');
          dataGrid.addRow();
          dataGrid.option('dataSource', items);
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRows.length, 3, 'visible rows');
          assert.strictEqual(visibleRows[0].isNewRow, true, 'first row is new');
          assert.deepEqual(visibleRows[0].data, {}, 'first row data is empty');
          assert.deepEqual(visibleRows[2].data.text, 'new', 'previosly added row is saved');
        });
        QUnit.test('The row should be added after the \'addRow\' method was called in the \'onRowInserted\' event (T650889)', function(assert) {
          var $inputElement;
          var needAddRow = true;
          var dataGrid = createDataGrid({
            editing: {
              mode: 'popup',
              allowAdding: true,
              allowUpdating: true
            },
            keyExpr: 'name',
            dataSource: [{name: 'Alex'}],
            onRowInserted: function(e) {
              if (needAddRow) {
                needAddRow = !needAddRow;
                e.component.addRow();
              }
            }
          });
          this.clock.tick(10);
          fx.off = false;
          dataGrid.addRow();
          $inputElement = $('.dx-popup-content').find('input').first();
          $inputElement.val('name1').trigger('change');
          dataGrid.saveEditData();
          this.clock.tick(10);
          $inputElement = $('.dx-popup-content').find('input').first();
          $inputElement.val('name2').trigger('change');
          dataGrid.saveEditData();
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 3, 'rows count');
          assert.equal(visibleRows[1].data.name, 'name1', 'added cell value');
          assert.equal(visibleRows[2].data.name, 'name2', 'added cell value');
          fx.off = true;
        });
        QUnit.test('Revert button should appear in cell mode when editing column with boolean dataField and saving is canceled', function(assert) {
          createDataGrid({
            dataSource: [{
              value: false,
              id: 1
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onRowUpdating: function(e) {
              var d = $.Deferred();
              e.cancel = d.promise();
              setTimeout(function() {
                d.resolve(true);
              });
            },
            columns: ['id', {
              dataField: 'value',
              allowEditing: true
            }]
          });
          this.clock.tick(10);
          this.clock.tick(1000);
          $('.dx-checkbox').eq(0).trigger('dxclick');
          this.clock.tick(10);
          assert.equal($('.dx-checkbox').eq(0).attr('aria-checked'), 'true', 'checkbox is checked');
          assert.equal($('.dx-revert-button').length, 1, 'reverse button exists');
          $('.dx-revert-button').trigger('dxclick');
          assert.equal($('.dx-checkbox').eq(0).attr('aria-checked'), 'false', 'checkbox is unchecked');
        });
        QUnit.test('Click to boolean column should works after editing in another column', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              name: 'name 1',
              value: false,
              id: 1
            }],
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            repaintChangesOnly: true,
            columns: ['name', 'value']
          });
          this.clock.tick(10);
          dataGrid.editCell(0, 0);
          var $input = $('.dx-texteditor-input').eq(0);
          $input.val('test');
          var $checkbox = $('.dx-checkbox').eq(0);
          $input.trigger('change');
          $checkbox.trigger('dxpointerdown');
          this.clock.tick(10);
          $checkbox.trigger('dxclick');
          this.clock.tick(10);
          $checkbox = $('.dx-checkbox').eq(0);
          assert.equal($checkbox.attr('aria-checked'), 'true', 'checkbox is checked');
          assert.ok($checkbox.hasClass('dx-state-focused'), 'checkbox is focused');
          assert.notOk(dataGrid.hasEditData(), 'changes are saved');
        });
        QUnit.testInActiveWindow('Enter key on editor should prevent default behaviour', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var dataGrid = createDataGrid({
            dataSource: [{
              name: 'name 1',
              value: 1
            }, {
              name: 'name 2',
              value: 2
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'name',
              allowEditing: false
            }, {
              dataField: 'value',
              showEditorAlways: true
            }]
          });
          var navigationController = dataGrid.getController('keyboardNavigation');
          this.clock.tick(10);
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          $('#qunit-fixture').find(':focus').on('focusout', function(e) {
            $(e.target).trigger('change');
          });
          $('#qunit-fixture').find(':focus').val('test');
          var event = $.Event('keydown', {target: $('#qunit-fixture').find(':focus').get(0)});
          navigationController._keyDownHandler({
            key: 'Enter',
            keyName: 'enter',
            originalEvent: event
          });
          this.clock.tick(10);
          assert.ok(event.isDefaultPrevented(), 'keydown event is prevented');
          assert.equal(dataGrid.cellValue(0, 0), 'test', 'cell value is changed');
        });
        QUnit.testInActiveWindow('Focus should be correct after change value and click to another row if showEditorAlways is true', function(assert) {
          var dataSource = [{
            id: 1,
            name: 'name 1'
          }, {
            id: 2,
            name: 'name 2'
          }];
          var dataGrid = createDataGrid({
            dataSource: dataSource,
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'name',
              showEditorAlways: true
            }]
          });
          this.clock.tick(10);
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          $('#qunit-fixture').find(':focus').on('focusout', function(e) {
            $(e.target).trigger('change');
          });
          $('#qunit-fixture').find(':focus').val('test');
          var $secondRowEditor = $(dataGrid.getRowElement(1)).find('.dx-texteditor-input');
          $secondRowEditor.trigger('dxpointerdown');
          $secondRowEditor.trigger('focus');
          this.clock.tick(10);
          assert.equal(dataSource[0].name, 'test', 'data is changed');
          assert.equal($(dataGrid.getRowElement(1)).find(':focus').length, 1, 'focus in second row');
        });
        QUnit.testInActiveWindow('Datebox editor\'s enter key handler should be replaced by noop (T819067)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var dataGrid = createDataGrid({
            dataSource: [{dateField: '2000/01/01 12:42'}],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'dateField',
              dataType: 'date'
            }]
          });
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 0)).trigger('dxclick');
          var editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
          var dateBox = editor.getElement().dxDateBox('instance');
          var enterKeyHandler = dateBox._supportedKeys().enter;
          assert.strictEqual(enterKeyHandler(), true, 'dateBox enter key handler is replaced');
        });
        QUnit.testInActiveWindow('Datebox changed value should be saved on enter key if useMaskBehaviour is true (T1070850)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var dataGrid = createDataGrid({
            dataSource: [{
              ID: 1,
              BirthDate: new Date('1964-03-16')
            }],
            keyExpr: 'ID',
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columns: [{
              dataField: 'BirthDate',
              dataType: 'date',
              editorOptions: {useMaskBehavior: true}
            }]
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          var $input = $('.dx-texteditor-input');
          var editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
          var dateBox = editor.getElement().dxDateBox('instance');
          var newValue = new Date('1964-05-16');
          dateBox.blur = function() {
            dateBox.option('value', newValue);
          };
          var event = $.Event('keydown', {key: 'enter'});
          $input.trigger(event);
          this.clock.tick(10);
          assert.deepEqual(dataGrid.cellValue(0, 'BirthDate'), newValue, 'value is changed');
        });
        ['date', 'datetime'].forEach(function(dataType) {
          [true, false].forEach(function(useMaskBehavior) {
            QUnit.testInActiveWindow(("Datebox editor's value should be selected from calendar by keyboard (useMaskBehavior = " + useMaskBehavior + ", dataType = " + dataType + ")"), function(assert) {
              if (devices.real().deviceType !== 'desktop') {
                assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
                return;
              }
              var rowsViewWrapper = dataGridWrapper.rowsView;
              var dataGrid = createDataGrid({
                dataSource: [{dateField: '01/01/2000'}],
                editing: {
                  mode: 'cell',
                  allowUpdating: true
                },
                columns: [{
                  dataField: 'dateField',
                  dataType: dataType,
                  editorOptions: {useMaskBehavior: useMaskBehavior}
                }]
              });
              this.clock.tick(10);
              dataGrid.editCell(0, 0);
              this.clock.tick(10);
              var editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
              var instance = editor.getElement().dxDateBox('instance');
              var keyboard = keyboardMock(editor.getInputElement());
              instance.open();
              keyboard.keyDown('left').press('enter');
              if (dataType === 'datetime') {
                keyboard.press('enter');
              }
              editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
              var expectedValue = dataType === 'date' ? '12/31/1999' : '12/31/1999, 12:00 AM';
              assert.equal(editor.getInputElement().val(), expectedValue, 'dateBox value is changed');
            });
          });
        });
        QUnit.testInActiveWindow('dataGrid resize generates exception if fixed column presents and validation applied in cell edit mode (T629168)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              Test: 'a',
              c1: 'b'
            }, {
              Test: 'c',
              c1: 'd'
            }],
            showColumnHeaders: false,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'Test',
              fixed: true,
              validationRules: [{type: 'required'}]
            }, 'c1']
          });
          var that = this;
          that.clock.tick(10);
          dataGrid.cellValue(0, 0, '');
          that.clock.tick(10);
          $(dataGrid.getCellElement(0, 0)).trigger('dxclick');
          that.clock.tick(10);
          dataGrid.updateDimensions();
          assert.ok(true, 'no exceptions');
        });
        QUnit.test('Update should work after scrolling if scrolling mode is infinite and refresh mode is repaint', function(assert) {
          var dataGrid = createDataGrid({
            height: 100,
            loadingTimeout: null,
            remoteOperations: true,
            dataSource: {
              key: 'id',
              load: function(options) {
                var items = [];
                for (var i = options.skip; i < options.skip + options.take; i++) {
                  var id = i + 1;
                  items.push({
                    id: id,
                    name: 'test ' + id
                  });
                }
                return items;
              },
              update: function() {}
            },
            paging: {pageSize: 5},
            scrolling: {
              mode: 'infinite',
              useNative: false,
              preloadedRowCount: 0,
              prerenderedRowChunkSize: 5
            },
            editing: {
              allowUpdating: true,
              refreshMode: 'repaint'
            }
          });
          dataGrid.cellValue(0, 'name', 'updated');
          dataGrid.saveEditData();
          dataGrid.getScrollable().scrollTo({top: 10000});
          dataGrid.getScrollable().scrollTo({top: 10000});
          dataGrid.cellValue(dataGrid.getRowIndexByKey(10), 'name', 'updated');
          dataGrid.saveEditData();
          assert.equal(dataGrid.getVisibleRows().length, 10, 'visible row count');
          assert.deepEqual(dataGrid.getVisibleRows()[0].data, {
            id: 6,
            name: 'test 6'
          }, 'row 6 is not updated');
          assert.deepEqual(dataGrid.getVisibleRows()[4].data, {
            id: 10,
            name: 'updated'
          }, 'row 10 is updated');
        });
        QUnit.test('contentReady event should be fired after error during update', function(assert) {
          var eventArray = [];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'id',
              fixed: true
            }, {dataField: 'name'}],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            dataSource: {
              load: function() {
                return [{
                  id: 1,
                  name: 'test'
                }];
              },
              update: function() {
                return $.Deferred().reject('Update error');
              }
            },
            onDataErrorOccurred: function() {
              return eventArray.push('onDataErrorOccurred');
            },
            onContentReady: function() {
              return eventArray.push('onContentReady');
            }
          });
          dataGrid.editCell(0, 1);
          dataGrid.cellValue(0, 1, 'updated');
          eventArray = [];
          dataGrid.saveEditData();
          assert.deepEqual(eventArray, ['onDataErrorOccurred', 'onContentReady'], 'onContentReady fired after onDataErrorOccurred');
        });
        QUnit.testInActiveWindow('Scroll positioned correct with fixed columns and editing', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is not actual for not desktop devices');
            return;
          }
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnFixing: {enabled: true},
            columns: [{
              dataField: 'field1',
              width: 200
            }, {
              dataField: 'field2',
              width: 200
            }, {
              dataField: 'field3',
              width: 200
            }, {
              dataField: 'fixedField',
              width: '200px',
              fixed: true,
              fixedPosition: 'right'
            }],
            dataSource: {store: [{
                field1: 1,
                field2: 2,
                field3: 3,
                fixedField: 4
              }, {
                field1: 4,
                field2: 5,
                field3: 3,
                fixedField: 6
              }]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            },
            width: 400
          });
          var triggerTabPress = function($target) {
            dataGrid.getController('keyboardNavigation')._keyDownHandler({
              key: 'Tab',
              keyName: 'tab',
              originalEvent: {
                target: $target,
                preventDefault: commonUtils.noop,
                stopPropagation: commonUtils.noop,
                isDefaultPrevented: function() {
                  return false;
                }
              }
            }, true);
          };
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          triggerTabPress(dataGrid.getCellElement(0, 0));
          this.clock.tick(10);
          triggerTabPress(dataGrid.getCellElement(0, 1));
          this.clock.tick(10);
          assert.equal(dataGrid.getView('rowsView').getScrollable().scrollLeft(), 400, 'Correct offset');
        });
        QUnit.test('Cancel editing should works correctly if editing mode is form and masterDetail row is shown', function(assert) {
          var items = [{
            firstName: 'Alex',
            lastName: 'Black'
          }, {
            firstName: 'John',
            lastName: 'Dow'
          }];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            editing: {
              mode: 'form',
              allowUpdating: true
            },
            dataSource: items,
            columns: ['firstName', 'lastName']
          });
          dataGrid.expandRow(items[0]);
          dataGrid.editRow(0);
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-datagrid-edit-form'), 'row 0 is edit form row');
          assert.ok(dataGrid.getVisibleRows()[0].isEditing, 'row 0 isEditing');
          dataGrid.cancelEditData();
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-data-row'), 'row 0 is data row');
          assert.notOk(dataGrid.getVisibleRows()[0].isEditing, 'row 0 isEditing');
          assert.ok($(dataGrid.getRowElement(1)).hasClass('dx-master-detail-row'), 'row 1 is master detail row');
          assert.notOk($(dataGrid.getRowElement(1)).hasClass('dx-datagrid-edit-form'), 'row 1 is not edit form row');
          assert.notOk(dataGrid.getVisibleRows()[1].isEditing, 'row 1 isEditing');
          assert.ok($(dataGrid.getRowElement(2)).hasClass('dx-data-row'), 'row 2 is data row');
        });
        QUnit.test('Editing should be started without errors if update form items in contentReady', function(assert) {
          var items = [{
            firstName: 'Alex',
            lastName: 'Black'
          }, {
            firstName: 'John',
            lastName: 'Dow'
          }];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            editing: {
              mode: 'form',
              allowUpdating: true,
              form: {items: [{
                  itemType: 'tabbed',
                  tabs: [{
                    title: 'First Name',
                    items: [{dataField: 'firstName'}]
                  }, {
                    title: 'Last Name',
                    items: [{dataField: 'lastName'}]
                  }]
                }]}
            },
            dataSource: items,
            columns: [{
              dataField: 'firstName',
              validationRules: [{type: 'required'}]
            }, {
              dataField: 'lastName',
              validationRules: [{type: 'required'}]
            }],
            onContentReady: function(e) {
              var $tabPanel = $(e.element).find('.dx-tabpanel');
              if ($tabPanel.length) {
                var tabPanel = $tabPanel.dxTabPanel('instance');
                tabPanel.option('items', tabPanel.option('items'));
                tabPanel.option('selectedIndex', 1);
              }
            }
          });
          dataGrid.editRow(0);
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-datagrid-edit-form'), 'row 0 is edit form row');
          assert.ok(dataGrid.getVisibleRows()[0].isEditing, 'row 0 isEditing');
        });
        QUnit.test('Column widths must be kept after cell edit', function(assert) {
          var $grid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              name: 'James Bond',
              code: '007'
            }],
            columnAutoWidth: true,
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          });
          var gridInstance = $grid.dxDataGrid('instance');
          var visibleWidths = [gridInstance.columnOption(0, 'visibleWidth'), gridInstance.columnOption(1, 'visibleWidth')];
          gridInstance.editCell(0, 0);
          var newVisibleWidths = [gridInstance.columnOption(0, 'visibleWidth'), gridInstance.columnOption(1, 'visibleWidth')];
          assert.equal($grid.find('input').length, 1, 'one editor is rendered');
          assert.deepEqual(newVisibleWidths, visibleWidths, 'visibleWidths are not changed');
        });
        QUnit.test('cancelEditData in onRowUpdating event for boolean column if repaintChangesOnly is true', function(assert) {
          var rowUpdatingCallCount = 0;
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              value: true
            }, {
              id: 2,
              value: true
            }],
            keyExpr: 'id',
            loadingTimeout: null,
            repaintChangesOnly: true,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onRowUpdating: function(e) {
              rowUpdatingCallCount++;
              if (e.key === 1) {
                e.cancel = true;
                e.component.cancelEditData();
              }
            }
          });
          var $firstCheckBoxCell = $(dataGrid.getCellElement(0, 1));
          var $secondCheckBoxCell = $(dataGrid.getCellElement(1, 1));
          $firstCheckBoxCell.find('.dx-checkbox').dxCheckBox('instance').option('value', false);
          assert.strictEqual(rowUpdatingCallCount, 1, 'onRowUpdating is called');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').dxCheckBox('instance').option('value'), true, 'first checkbox value is canceled');
          assert.notStrictEqual($(dataGrid.getCellElement(0, 1)).get(0), $firstCheckBoxCell.get(0), 'first checkbox cell is changed');
          assert.strictEqual($(dataGrid.getCellElement(1, 1)).get(0), $secondCheckBoxCell.get(0), 'second checkbox cell is not changed');
        });
        QUnit.test('DataGrid should repaint editors on cancelEditData method if repaintChangesOnly is true (T820847)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            repaintChangesOnly: true,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            loadingTimeout: null
          });
          dataGrid.editCell(0, 0);
          var editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
          assert.ok(editor.getInputElement().length > 0, 'cell has editor');
          dataGrid.cancelEditData();
          editor = rowsViewWrapper.getDataRow(0).getCell(0).getEditor();
          assert.equal(editor.getInputElement().length, 0, 'cell has no editor');
        });
        QUnit.test('Using watch in cellPrepared event for editor if repaintChangesOnly', function(assert) {
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
            columns: ['id', 'field1'],
            editing: {mode: 'cell'},
            repaintChangesOnly: true,
            onCellPrepared: function(e) {
              if (e.isEditing) {
                e.watch(function() {
                  return e.column.calculateCellValue(e.data);
                }, function() {
                  $(e.cellElement).addClass('changed');
                });
              }
            }
          });
          this.clock.tick(10);
          dataGrid.editCell(0, 1);
          dataSource.store().update(1, {field1: 'test5'});
          var $cell = $(dataGrid.getCellElement(0, 1));
          dataGrid.refresh(true);
          this.clock.tick(10);
          assert.ok($(dataGrid.getCellElement(0, 1)).is($cell), 'first cell isn\'t updated');
          assert.ok($cell.hasClass('changed'), 'class changed is added');
          assert.equal($(dataGrid.element()).find('.changed').length, 1, 'class changed is added to one cell only');
        });
        QUnit.test('watch in cellPrepared should works after cell editing', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              field1: 'test1'
            }, {
              id: 2,
              field1: 'test2'
            }],
            keyExpr: 'id',
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
          dataGrid.editCell(0, 1);
          dataGrid.closeEditCell();
          this.clock.tick(10);
          var activeRowKey = 1;
          dataGrid.refresh(true);
          assert.ok($(dataGrid.getCellElement(0, 0)).hasClass('active'), 'active class is added to first cell');
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('active'), 'active class is added to second cell');
          assert.notOk($(dataGrid.getCellElement(1, 0)).hasClass('active'), 'active class is not added to second row');
        });
        QUnit.test('Stop watch in cellPrepared event for editor if repaintChangesOnly', function(assert) {
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
          var watchUpdateCount = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: ['id', 'field1'],
            editing: {mode: 'cell'},
            repaintChangesOnly: true,
            onCellPrepared: function(e) {
              if (e.isEditing) {
                var stopWatch = e.watch(function() {
                  return e.column.calculateCellValue(e.data);
                }, function() {
                  watchUpdateCount++;
                  if (watchUpdateCount === 2) {
                    stopWatch();
                  }
                });
              }
            }
          });
          this.clock.tick(10);
          dataGrid.editCell(0, 1);
          for (var i = 0; i < 5; i++) {
            dataSource.store().update(1, {field1: 'changed' + i});
            dataGrid.refresh(true);
            this.clock.tick(10);
          }
          assert.equal(watchUpdateCount, 2, 'watch is stopped on second update');
        });
        QUnit.test('Using watch in masterDetail template if repaintChangesOnly', function(assert) {
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
            columns: ['id', 'field1'],
            editing: {mode: 'cell'},
            repaintChangesOnly: true,
            masterDetail: {template: function(container, options) {
                var $detail = $('<div>').addClass('detail').appendTo(container);
                $detail.text(options.data.field1);
                options.watch(function(data) {
                  return data.field1;
                }, function(newValue) {
                  $detail.text(newValue);
                });
              }}
          });
          this.clock.tick(10);
          dataGrid.expandRow(1);
          dataSource.store().update(1, {field1: 'changed'});
          var $detail = $(dataGrid.element()).find('.detail');
          dataGrid.refresh(true);
          this.clock.tick(10);
          assert.ok($(dataGrid.element()).find('.detail').is($detail), 'detail element isn\'t updated');
          assert.strictEqual($detail.text(), 'changed', 'detail text is changed');
        });
        QUnit.test('No error after detail collapse and popup editing form closing if repaintChangesOnly is true', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            repaintChangesOnly: true,
            dataSource: [{
              'Id': 1,
              'CompanyName': 'Super Mart of the West'
            }],
            keyExpr: 'Id',
            columns: ['CompanyName'],
            masterDetail: {enabled: true},
            editing: {
              mode: 'popup',
              allowUpdating: true
            }
          });
          dataGrid.expandRow(1);
          dataGrid.collapseRow(1);
          dataGrid.editRow(0);
          dataGrid.cancelEditData();
          assert.notOk($('.dx-datagrid-edit-popup').is(':visible'), 'editor popup is hidden');
        });
        QUnit.test('Remove button click should remove correct row after cancelEditData if repaintChangesOnly is true', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            loadingTimeout: null,
            repaintChangesOnly: true,
            editing: {
              mode: 'batch',
              allowAdding: true,
              allowDeleting: true
            }
          });
          dataGrid.addRow();
          this.clock.tick(10);
          dataGrid.cancelEditData();
          this.clock.tick(10);
          dataGrid.addRow();
          this.clock.tick(10);
          $(dataGrid.getCellElement(2, 1)).find('.dx-link-delete').trigger('dxpointerdown').trigger('click');
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows()[2].removed, true, 'row 2 is marked as removed');
        });
        QUnit.test('Row deleting should works if recalculateWhileEditing is enabled and refreshMode is repaint', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}],
            keyExpr: 'id',
            editing: {
              refreshMode: 'repaint',
              mode: 'batch',
              allowDeleting: true
            },
            summary: {
              recalculateWhileEditing: true,
              totalItems: [{
                column: 'id',
                summaryType: 'count'
              }]
            }
          });
          this.clock.tick(10);
          dataGrid.deleteRow(0);
          this.clock.tick(10);
          dataGrid.saveEditData();
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'row is removed');
          assert.strictEqual(dataGrid.getTotalSummaryValue('id'), 0, 'summary is updated');
        });
        QUnit.test('Cascade lookup dataSource should be updated on editing if repaintChangesOnly and recalculateWhileEditing are true (T1055325)', function(assert) {
          var employees = [{
            ID: 1,
            StateID: 1,
            CityID: 1
          }];
          var states = [{
            ID: 1,
            Name: 'Alabama'
          }, {
            ID: 2,
            Name: 'Alaska'
          }];
          var cities = [{
            ID: 1,
            Name: 'Tuscaloosa',
            StateID: 1
          }, {
            ID: 5,
            Name: 'Anchorage',
            StateID: 2
          }];
          var dataGrid = createDataGrid({
            keyExpr: 'ID',
            dataSource: employees,
            repaintChangesOnly: true,
            editing: {
              allowUpdating: true,
              mode: 'row'
            },
            summary: {
              recalculateWhileEditing: true,
              totalItems: [{
                column: 'ID',
                summaryType: 'count'
              }]
            },
            columns: ['ID', {
              dataField: 'StateID',
              caption: 'State',
              setCellValue: function(rowData, value) {
                rowData.StateID = value;
                rowData.CityID = null;
              },
              lookup: {
                dataSource: states,
                valueExpr: 'ID',
                displayExpr: 'Name'
              }
            }, {
              dataField: 'CityID',
              caption: 'City',
              lookup: {
                dataSource: function(options) {
                  return {
                    store: cities,
                    filter: options.data ? ['StateID', '=', options.data.StateID] : null
                  };
                },
                valueExpr: 'ID',
                displayExpr: 'Name'
              }
            }]
          });
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 'StateID')).find('.dx-selectbox').dxSelectBox('instance').option('value', 2);
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 'StateID')).find('.dx-selectbox').dxSelectBox('instance').option('value', 1);
          this.clock.tick(10);
          var selectBox = $(dataGrid.getCellElement(0, 'CityID')).find('.dx-selectbox').dxSelectBox('instance');
          assert.strictEqual(selectBox.option().value, null, 'lookup value is updated');
          assert.deepEqual(selectBox.option().dataSource.filter, ['StateID', '=', 1], 'lookup dataSource filter is correct');
        });
        QUnit.testInActiveWindow('Validation message should be positioned relative cell in material theme', function(assert) {
          var overlayTarget;
          var origIsMaterial = themes.isMaterial;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{Test: ''}],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            columns: [{
              dataField: 'Test',
              validationRules: [{type: 'required'}]
            }]
          });
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          overlayTarget = dataGrid.$element().find('.dx-invalid-message').data('dxOverlay').option('position.of');
          assert.ok(overlayTarget.hasClass('dx-editor-cell'), 'target in generic theme');
          dataGrid.closeEditCell();
          this.clock.tick(10);
          themes.isMaterial = function() {
            return true;
          };
          dataGrid.editCell(0, 0);
          this.clock.tick(10);
          overlayTarget = dataGrid.$element().find('.dx-invalid-message').data('dxOverlay').option('position.of');
          assert.ok(overlayTarget.hasClass('dx-editor-cell'), 'target in material theme');
          themes.isMaterial = origIsMaterial;
        });
        QUnit.test('insert row when master detail autoExpandAll is active', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1111}],
            masterDetail: {
              enabled: true,
              autoExpandAll: true,
              template: function(container, options) {
                $(container).append($('<div>detail</div>'));
              }
            }
          });
          dataGrid.addRow();
          var rows = $('#dataGrid').find('.dx-datagrid-rowsview').find('tbody > tr');
          assert.ok(rows.eq(0).hasClass('dx-row-inserted'), 'First row is inserted row');
          assert.ok(rows.eq(1).hasClass('dx-row'), 'Second row has dx-row class');
          assert.ok(!rows.eq(1).hasClass('dx-master-detail-row'), 'Second row is not master-detail-row');
          assert.ok(rows.eq(2).hasClass('dx-master-detail-row'), 'Third row is master-detail-row');
        });
        QUnit.test('onRowInserted should be called if dataSource is reassigned in loadingChanged', function(assert) {
          var rowInsertedArgs = [];
          var dataSource = [{id: 1}, {id: 2}];
          var isLoadingOccurs;
          var dataGrid = createDataGrid({
            keyExpr: 'id',
            dataSource: dataSource,
            onRowInserted: function(e) {
              rowInsertedArgs.push(e);
            }
          });
          this.clock.tick(10);
          dataGrid.addRow();
          dataGrid.cellValue(0, 0, 3);
          dataGrid.getDataSource().on('loadingChanged', function(isLoading) {
            if (isLoading && !isLoadingOccurs) {
              dataGrid.option('dataSource', dataGrid.option('dataSource'));
              isLoadingOccurs = true;
            }
          });
          dataGrid.saveEditData();
          this.clock.tick(10);
          assert.equal(isLoadingOccurs, true, 'loadingChanged is occurs');
          assert.equal(rowInsertedArgs.length, 1, 'rowInserted is called');
          assert.deepEqual(rowInsertedArgs[0].data, {id: 3}, 'rowInserted data arg');
        });
        QUnit.test('Create new row when grouping and group summary (T644293)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 0
            }],
            dataSource: {store: [{
                field1: 1,
                field2: 2
              }, {
                field1: 3,
                field2: 4
              }]},
            summary: {groupItems: [{
                column: 'field1',
                summaryType: 'count',
                showInGroupFooter: true
              }]}
          });
          dataGrid.addRow();
          var $insertedRow = dataGrid.getVisibleRows()[0];
          assert.equal($insertedRow.rowType, 'data', 'inserted row has the \'data\' type');
          assert.equal($insertedRow.isNewRow, true, 'inserted row is presents and has 0 index');
        });
        QUnit.test('row should rendered after editing if scrolling mode is virtual', function(assert) {
          var array = [];
          for (var i = 0; i < 4; i++) {
            array.push({
              id: i,
              text: 'text ' + i
            });
          }
          var dataGrid = createDataGrid({
            scrolling: {mode: 'virtual'},
            paging: {pageSize: 2},
            dataSource: array
          });
          this.clock.tick(10);
          dataGrid.cellValue(2, 1, 666);
          dataGrid.saveEditData();
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleRows().length, 4, 'visible row count');
          assert.equal(dataGrid.cellValue(2, 1), 666, 'value is changed');
          assert.equal(dataGrid.hasEditData(), false, 'no unsaved data');
        });
        ['Row', 'Cell', 'Batch'].forEach(function(editMode) {
          QUnit.test((editMode + " - Drop-down editor cell should not have paddings/margins"), function(assert) {
            var dataGrid = createDataGrid({
              dataSource: [{
                id: 1,
                name: 1
              }],
              columns: [{
                dataField: 'name',
                lookup: {
                  dataSource: [{
                    id: 1,
                    text: 'test'
                  }],
                  valueExpr: 'id',
                  displayExpr: 'text'
                }
              }],
              editing: {mode: editMode.toLowerCase()}
            });
            this.clock.tick(10);
            if (editMode === 'Row') {
              dataGrid.editRow(0);
            } else {
              dataGrid.editCell(0, 0);
            }
            this.clock.tick(10);
            var $editor = $(dataGrid.getCellElement(0, 0)).find('.dx-dropdowneditor');
            assert.equal($editor.length, 1, 'cell has an editor');
            ['left', 'right', 'top', 'bottom'].forEach(function(direction) {
              assert.strictEqual($editor.css(("margin-" + direction)), '0px', ("no " + direction + " margin"));
              assert.strictEqual($editor.css(("padding-" + direction)), '0px', ("no " + direction + " padding"));
            });
          });
        });
        QUnit.test('The validation message and revert button should be scrolled with an invalid cell (T973104)', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 20; i++) {
              var item = {id: i + 1};
              for (var j = 0; j < 30; j++) {
                item[("field_" + (j + 1))] = '';
              }
              items.push(item);
            }
            return items;
          };
          var dataGrid = createDataGrid({
            width: 700,
            height: 400,
            dataSource: getData(),
            keyExpr: 'id',
            columnAutoWidth: true,
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            customizeColumns: function(columns) {
              columns.forEach(function(col) {
                col.width = 70;
                col.validationRules = [{type: 'required'}];
              });
            }
          });
          this.clock.tick(10);
          dataGrid.editCell(5, 5);
          this.clock.tick(10);
          var $cellElement = $(dataGrid.getCellElement(5, 5));
          var $revertButton = $(dataGrid.element()).find('.dx-datagrid-revert-tooltip .dx-overlay-content');
          var $validationMessage = $(dataGrid.element()).find('.dx-datagrid-invalid-message .dx-overlay-content');
          assert.ok($revertButton.length, 'revert button is rendered');
          assert.ok($validationMessage.length, 'validation message is rendered');
          var revertButtonDiff = {
            top: $revertButton.offset().top - $cellElement.offset().top,
            left: $revertButton.offset().left - $cellElement.offset().left
          };
          var validationMessageDiff = {
            top: $validationMessage.offset().top - $cellElement.offset().top,
            left: $validationMessage.offset().left - $cellElement.offset().left
          };
          dataGrid.getScrollable().scrollTo({
            top: 100,
            left: 100
          });
          this.clock.tick(10);
          assert.strictEqual($revertButton.offset().top - $cellElement.offset().top, revertButtonDiff.top, 'top revert position relative to the cell is not changed');
          assert.strictEqual($revertButton.offset().left - $cellElement.offset().left, revertButtonDiff.left, 'left revert position relative to the cell is not changed');
          assert.strictEqual($validationMessage.offset().top - $cellElement.offset().top, validationMessageDiff.top, 'top validation message position relative to the cell is not changed');
          assert.strictEqual($validationMessage.offset().left - $cellElement.offset().left, validationMessageDiff.left, 'left validation message position relative to the cell is not changed');
        });
        QUnit.test('validationCallback should accept correct data parameter (T1020702)', function(assert) {
          var validationCallbackSpy = sinon.spy(function() {
            return true;
          });
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              id1: 1,
              name: 'test1'
            }, {
              id: 2,
              id1: 1,
              Name: 'test2'
            }],
            keyExpr: ['id', 'id1'],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columns: [{
              dataField: 'name',
              validationRules: [{
                type: 'custom',
                validationCallback: validationCallbackSpy
              }]
            }]
          });
          this.clock.tick(10);
          for (var i = 0; i < 5; i++) {
            dataGrid.editRow(0);
            this.clock.tick(10);
            dataGrid.saveEditData();
            this.clock.tick(10);
          }
          assert.equal(validationCallbackSpy.callCount, 5, 'call count');
          for (var i$__12 = 0; i$__12 < validationCallbackSpy.callCount; i$__12++) {
            assert.deepEqual(validationCallbackSpy.args[i$__12][0].data, {
              id: 1,
              id1: 1,
              name: 'test1'
            }, ("data parameter for the " + (i$__12 + 1) + " call"));
          }
        });
        ['cell', 'batch', 'row', 'form', 'popup'].forEach(function(editMode) {
          QUnit.test(("The cellValue method should return the correct value of the modified cell in editMode = " + editMode + ")"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{
                id: 1,
                field: 'field'
              }],
              keyExpr: 'id',
              columns: ['field'],
              editing: {
                allowUpdating: true,
                allowAdding: true,
                mode: editMode
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            if (editMode === 'batch' || editMode === 'cell') {
              dataGrid.editCell(0, 0);
            } else {
              dataGrid.editRow(0);
            }
            this.clock.tick(10);
            var $input = $(dataGrid.getCellElement(0, 0)).find('.dx-texteditor-input');
            $input.val('test');
            $input.trigger('change');
            assert.strictEqual(dataGrid.cellValue(0, 0), 'test', 'cell value');
          });
        });
      });
      QUnit.module('Column Resizing', baseModuleConfig, function() {
        QUnit.test('Resize is not called after editCell', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {store: [{
                firstName: 1,
                lastName: 2,
                room: 3,
                birthDay: 4
              }, {
                firstName: 4,
                lastName: 5,
                room: 3,
                birthDay: 6
              }]},
            editing: {
              allowUpdating: true,
              mode: 'batch'
            }
          }).dxDataGrid('instance');
          var resizingController = dataGrid.getController('resizing');
          var rowsView = dataGrid.getView('rowsView');
          sinon.spy(resizingController, 'resize');
          sinon.spy(rowsView, 'synchronizeRows');
          this.clock.tick(10);
          assert.equal(resizingController.resize.callCount, 1, 'resize call count before editCell');
          assert.equal(rowsView.synchronizeRows.callCount, 1, 'synchronizeRows call count before editCell');
          dataGrid.editCell(0, 0);
          assert.ok(dataGrid.getController('editing').isEditing());
          assert.equal(resizingController.resize.callCount, 1, 'resize call count after editCell');
          assert.equal(rowsView.synchronizeRows.callCount, 2, 'synchronizeRows call count after editCell');
        });
      });
      QUnit.module('Editing state', baseModuleConfig, function() {
        QUnit.test('editRowKey in init configuration (editMode = row)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'row',
              editRowKey: 1
            },
            loadingTimeout: null
          }).dxDataGrid('instance');
          assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editRowKey was not overwritten');
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-edit-row'), 'editing row');
          assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
        });
        QUnit.test('editRowKey in init configuration (editMode = form)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'form',
              editRowKey: 1
            },
            loadingTimeout: null
          }).dxDataGrid('instance');
          var $firstRow = $(dataGrid.getRowElement(0));
          assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editRowKey was not overwritten');
          assert.ok($firstRow.hasClass('dx-datagrid-edit-form'), 'edit form');
          assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
        });
        QUnit.skip('editRowKey in init configuration (editMode = popup)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'popup',
              editRowKey: 1
            },
            loadingTimeout: null
          }).dxDataGrid('instance');
          assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editRowKey was not overwritten');
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-edit-row'), 'editing row');
          assert.ok($('.dx-datagrid-edit-popup').length, 'popup is shown');
          assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
        });
        ['cell', 'batch'].forEach(function(editMode) {
          QUnit.test(("editRowKey in init configuration (editMode = " + editMode + ")"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: editMode,
                editRowKey: 1
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editRowKey was not overwritten');
            assert.notOk($firstCell.hasClass('dx-editor-cell'), 'edit cell');
            assert.notOk($firstCell.find('input').length, 'no input');
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
          });
          QUnit.test(("editRowKey in init configuration (editMode = " + editMode + ")"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: editMode,
                editColumnName: 'id'
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            assert.equal(dataGrid.option('editing.editColumnName'), 'id', 'editColumnName was not overwritten');
            assert.notOk($firstCell.hasClass('dx-editor-cell'), 'edit cell');
            assert.notOk($firstCell.find('input').length, 'no input');
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
          });
          QUnit.test(("editColumnName and editRowKey in init configuration (editMode = " + editMode + ")"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: editMode,
                editRowKey: 1,
                editColumnName: 'id'
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            var $firstCell = $(dataGrid.getCellElement(0, 0));
            assert.equal(dataGrid.option('editing.editRowKey'), 1, 'editRowKey was not overwritten');
            assert.ok($firstCell.hasClass('dx-editor-cell'), 'edit cell');
            assert.ok($firstCell.find('input').length, 'has input');
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'no changes');
          });
        });
        ['cell', 'form', 'row', 'popup', 'batch'].forEach(function(editMode) {
          QUnit.test(("change with type = 'remove' in init configuration (editMode = " + editMode + ")"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: editMode,
                changes: [{
                  type: 'remove',
                  key: 1
                }]
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            assert.equal(dataGrid.getVisibleRows().length, 2, 'two rows');
            assert.deepEqual(dataGrid.option('editing.changes')[0], {
              type: 'remove',
              key: 1
            }, 'change was not overwritten');
            if (editMode === 'batch') {
              assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-row-removed'), 'row is highlighted');
            }
            dataGrid.saveEditData();
            assert.equal(dataGrid.getVisibleRows().length, 1, 'one row');
            assert.equal(dataGrid.getVisibleRows()[0].key, 2, 'key of the remaining row');
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
          });
          if (editMode !== 'popup') {
            ['testkey', undefined].forEach(function(key) {
              QUnit.test(("change with type = 'insert' in init configuration (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert'
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  editing: {
                    allowUpdating: true,
                    mode: editMode,
                    changes: changes
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(0));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 3, 'three rows');
                assert.ok(visibleRows[0].isNewRow, 'new row');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 3, 'three rows');
                assert.notOk(visibleRows[0].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
              });
              QUnit.test(("Add row to the custom position of the current page via changes option (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert',
                  insertAfterKey: 1
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  paging: {pageSize: 1},
                  editing: {
                    allowUpdating: true,
                    mode: editMode
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                dataGrid.option('editing.changes', changes);
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(1));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 2, 'two rows');
                assert.ok(visibleRows[1].isNewRow, 'new row');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'three rows');
                assert.notOk(visibleRows[0].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
                assert.equal(dataGrid.pageCount(), 3, '3 pages');
              });
              QUnit.test(("Add row on the next page via changes option (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert',
                  insertAfterKey: 2
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  paging: {pageSize: 1},
                  editing: {
                    allowUpdating: true,
                    mode: editMode
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                dataGrid.option('editing.changes', changes);
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'row is not added on the first page');
                dataGrid.pageIndex(1);
                this.clock.tick(10);
                visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(1));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 2, 'two rows');
                assert.ok(visibleRows[1].isNewRow, 'new row');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'one row on the page');
                assert.notOk(visibleRows[0].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
                assert.equal(dataGrid.pageCount(), 3, '3 pages');
              });
              QUnit.test(("change on the next page with type = 'insert' in init configuration (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert',
                  insertAfterKey: 2
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  paging: {pageSize: 1},
                  editing: {
                    allowUpdating: true,
                    mode: editMode,
                    changes: changes
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'row is not added on the first page');
                dataGrid.pageIndex(1);
                this.clock.tick(10);
                visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(1));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 2, 'two rows');
                assert.ok(visibleRows[1].isNewRow, 'new row');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'one row on the page');
                assert.notOk(visibleRows[0].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
                assert.equal(dataGrid.pageCount(), 3, '3 pages');
              });
              QUnit.test(("Add row at the end of the custom page via changes option if virtual scrolling (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert',
                  insertAfterKey: 1
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  height: 50,
                  paging: {pageSize: 1},
                  editing: {
                    allowUpdating: true,
                    mode: editMode
                  },
                  scrolling: {
                    mode: 'virtual',
                    useNative: false,
                    prerenderedRowChunkSize: 5
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                dataGrid.option('editing.changes', changes);
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 2, 'two rows');
                assert.ok(visibleRows[1].isNewRow, 'new row is added after the first page');
                assert.equal(dataGrid.option('editing.changes')[0].pageIndex, undefined, 'no pageIndex');
                dataGrid.pageIndex(1);
                this.clock.tick(10);
                visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(1));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 3, 'three rows');
                assert.ok(visibleRows[1].isNewRow, 'new row');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.ok(visibleRows.length >= 2, 'two or more rows');
                assert.notOk(visibleRows[1].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
                assert.equal(dataGrid.pageCount(), 3, '3 pages');
              });
              QUnit.test(("Add row at the end of the last page via changes option if virtual scrolling (editMode = " + editMode + ", key = " + key + ")"), function(assert) {
                var changes = [{
                  data: {field: 'test'},
                  key: key,
                  type: 'insert',
                  insertAfterKey: 2
                }];
                var data = [{
                  field: '111',
                  id: 1
                }, {
                  field: '222',
                  id: 2
                }];
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: data,
                  keyExpr: 'id',
                  height: 50,
                  paging: {pageSize: 1},
                  editing: {
                    allowUpdating: true,
                    mode: editMode
                  },
                  scrolling: {
                    mode: 'virtual',
                    useNative: false,
                    prerenderedRowCount: 0
                  }
                }).dxDataGrid('instance');
                this.clock.tick(10);
                dataGrid.option('editing.changes', changes);
                this.clock.tick(10);
                var visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'row is not added on the first page');
                assert.equal(dataGrid.option('editing.changes')[0].pageIndex, undefined, 'no pageIndex');
                dataGrid.pageIndex(1);
                this.clock.tick(10);
                visibleRows = dataGrid.getVisibleRows();
                var $insertedRow = $(dataGrid.getRowElement(1));
                var $cells = $insertedRow.find('td');
                assert.equal(visibleRows.length, 2, 'two rows');
                assert.equal(visibleRows[0].key, 2, 'first row key');
                assert.ok(visibleRows[1].isNewRow, 'new row is in the end');
                assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
                assert.equal(data.length, 2, 'row count in datasource');
                assert.ok($insertedRow.hasClass('dx-row-inserted'), 'inserted row class');
                assert.ok($cells.eq(0).hasClass('dx-cell-modified'), 'first cell is modified');
                assert.equal($cells.eq(0).text(), 'test', 'first cell\'s text');
                dataGrid.saveEditData();
                this.clock.tick(10);
                assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
                visibleRows = dataGrid.getVisibleRows();
                assert.equal(visibleRows.length, 1, 'one row');
                assert.equal(visibleRows[0].key, 2, 'row key');
                assert.notOk(visibleRows[0].isNewRow, 'not new row');
                assert.equal(data.length, 3, 'row count in datasource');
                assert.equal(data[2].field, 'test', 'field value was posted');
                assert.equal(dataGrid.pageCount(), 3, '3 pages');
              });
            });
          }
          QUnit.test(("change with type = 'update' in init configuration (editMode = " + editMode + ")"), function(assert) {
            var data = [{
              id: 1,
              field: '111'
            }, {
              id: 2,
              field: '222'
            }];
            var changes = [{
              key: 1,
              type: 'update',
              data: {field: 'test'}
            }];
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: data,
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: editMode,
                changes: changes
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            assert.equal(data[0].field, '111', 'change was not posted to datasource');
            assert.deepEqual(dataGrid.option('editing.changes'), changes, 'change was not overwritten');
            assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-cell-modified'), 'cell has modified class');
            dataGrid.saveEditData();
            assert.equal(data[0].field, 'test', 'change was posted to datasource');
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
            assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass('dx-cell-modified'), 'cell has not modified class');
          });
          QUnit.test('Reset changes after timeout in onOptionChanged', function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{
                field: 'field',
                field2: 'field2',
                id: 1
              }],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: 'row'
              },
              loadingTimeout: null,
              onOptionChanged: function(e) {
                if (e.fullName === 'editing.changes' && e.value.length) {
                  setTimeout(function() {
                    dataGrid.option('editing.changes', []);
                  });
                }
              }
            }).dxDataGrid('instance');
            dataGrid.editRow(0);
            var $firstRow = $(dataGrid.getRowElement(0));
            $firstRow.find('input').first().val('test').trigger('change');
            this.clock.tick(10);
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'changes are reset');
            assert.equal($firstRow.find('input').first().val(), 'field', 'input value');
            $firstRow.find('input').eq(1).val('test').trigger('change');
            this.clock.tick(10);
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'changes are reset');
            assert.equal($firstRow.find('input').eq(1).val(), 'field2', 'input value');
          });
          QUnit.test('Error should not be thrown after changes reset in onOptionChanged', function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{
                field: 'field',
                field2: 'field2',
                id: 1
              }],
              keyExpr: 'id',
              editing: {
                allowUpdating: true,
                mode: 'row'
              },
              loadingTimeout: null,
              onOptionChanged: function(e) {
                if (e.fullName === 'editing.changes' && e.value.length) {
                  dataGrid.option('editing.changes', []);
                }
              }
            }).dxDataGrid('instance');
            dataGrid.editRow(0);
            var $firstRow = $(dataGrid.getRowElement(0));
            $firstRow.find('input').first().val('test').trigger('change');
            this.clock.tick(10);
            assert.deepEqual(dataGrid.option('editing.changes'), [], 'changes are reset');
          });
          QUnit.test('addRow should create change without pageIndex if scrolling is virtual', function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [],
              editing: {
                allowAdding: true,
                mode: editMode
              },
              loadingTimeout: null,
              scrolling: {mode: 'virtual'}
            }).dxDataGrid('instance');
            dataGrid.addRow();
            assert.equal(dataGrid.option('editing.changes')[0].pageIndex, undefined, 'no pageIndex');
          });
        });
        QUnit.test('dataSource change should reset changes if dataSource is array and keys are changed (T1065721)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              field: '111'
            }],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'cell'
            },
            columns: ['id', 'field'],
            loadingTimeout: null
          }).dxDataGrid('instance');
          dataGrid.editCell(0, 1);
          dataGrid.cellValue(0, 1, 'test');
          dataGrid.option('dataSource', [{
            id: 2,
            field: '222'
          }]);
          assert.deepEqual(dataGrid.option('editing.changes'), [], 'change are empty');
          assert.deepEqual(dataGrid.option('editing.editRowKey'), null, 'editRowKey is empty');
        });
        QUnit.test('dataSource change should not reset insert changes if dataSource is array (T1065721)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              field: '111'
            }],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'cell'
            },
            columns: ['id', 'field'],
            loadingTimeout: null
          }).dxDataGrid('instance');
          dataGrid.addRow();
          dataGrid.option('dataSource', [{
            id: 2,
            field: '222'
          }]);
          assert.deepEqual(dataGrid.option('editing.changes').length, 1, 'changes are not reseted');
          assert.ok(dataGrid.option('editing.editRowKey'), 'editRowKey is not reseted');
        });
        ['Row', 'Form', 'Popup', 'Cell', 'Batch'].forEach(function(editMode) {
          QUnit.test((editMode + " - Changing editing.changes option should update the values of the edited cells"), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: [{
                id: 1,
                field: 'field'
              }],
              keyExpr: 'id',
              columns: ['field'],
              editing: {
                allowUpdating: true,
                mode: editMode.toLowerCase()
              },
              loadingTimeout: null
            }).dxDataGrid('instance');
            if (editMode === 'Batch' || editMode === 'Cell') {
              dataGrid.editCell(0, 0);
            } else {
              dataGrid.editRow(0);
            }
            this.clock.tick(10);
            switch (editMode) {
              case 'Batch':
              case 'Cell':
                assert.ok($(dataGrid.getRowElement(0)).children().first().hasClass('dx-editor-cell'), 'cell is editing');
                break;
              case 'Popup':
                assert.ok($('.dx-datagrid-edit-popup').is(':visible'), 'edit popup is visible');
                break;
              default:
                assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-edit-row'), 'row is editing');
            }
            dataGrid.option('editing.changes', [{
              type: 'update',
              key: 1,
              data: {field: 'test'}
            }]);
            var cellValue = $(dataGrid.getCellElement(0, 0)).find('.dx-texteditor-input').val();
            assert.strictEqual(cellValue, 'test', 'cell value');
          });
          ['changes', 'editRowKey', 'editColumnName'].forEach(function(editingOption) {
            QUnit.test((editMode + " - Changing the editing." + editingOption + " option should not raise the onToolbarPreparing event (T949025)"), function(assert) {
              var onToolbarPreparingSpy = sinon.spy();
              var dataGrid = $('#dataGrid').dxDataGrid({
                dataSource: [{
                  id: 1,
                  field: 'field'
                }],
                keyExpr: 'id',
                editing: {
                  allowUpdating: true,
                  allowAdding: true,
                  mode: editMode.toLowerCase()
                },
                loadingTimeout: null,
                onToolbarPreparing: onToolbarPreparingSpy
              }).dxDataGrid('instance');
              assert.equal(onToolbarPreparingSpy.callCount, 1, 'onToolbarPreparing should be called initially');
              var optionValue;
              switch (editingOption) {
                case 'changes':
                  {
                    optionValue = [{
                      type: 'update',
                      key: 1,
                      data: {field: 'new value'}
                    }];
                    break;
                  }
                case 'editRowKey':
                  {
                    optionValue = 1;
                    break;
                  }
                case 'editColumnName':
                  {
                    optionValue = 'field';
                    break;
                  }
              }
              dataGrid.option(("editing." + editingOption), optionValue);
              this.clock.tick(10);
              assert.equal(onToolbarPreparingSpy.callCount, 1, 'onToolbarPreparing should not be called on option change');
            });
          });
        });
        QUnit.test('Focus should not be reset if field used in summary is changed and summary.recalculateWhileEditing is enabled', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              value: 15,
              field: 'field'
            }],
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'popup'
            },
            repaintChangesOnly: true,
            summary: {
              recalculateWhileEditing: true,
              totalItems: [{
                column: 'value',
                summaryType: 'sum'
              }]
            },
            columns: ['id', 'value', 'field']
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          var popup = $(dataGrid.getController('editing').getPopupContent());
          var valueInput = popup.find('.dx-texteditor-input').eq(1);
          var fieldInput = popup.find('.dx-texteditor-input').eq(2);
          valueInput.trigger('focus').val('35').trigger('change');
          this.clock.tick(10);
          fieldInput.trigger('focus');
          this.clock.tick(10);
          assert.deepEqual(document.activeElement.id, fieldInput.attr('id'), 'focus is not reset after changing the field used for a summary');
        });
        QUnit.test('Pager should not be hidden after delete row using onSaving event handler', function(assert) {
          var items = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
          $('#dataGrid').dxDataGrid({
            keyExpr: 'id',
            dataSource: items,
            paging: {pageSize: 2},
            editing: {
              allowDeleting: true,
              confirmDelete: false
            },
            repaintChangesOnly: true,
            onSaving: function(e) {
              e.cancel = true;
              e.promise = $.Deferred();
              items.splice(0, 1);
              e.component.option('dataSource', e.component.option('dataSource'));
              e.promise.resolve();
            }
          });
          this.clock.tick(10);
          $('#dataGrid .dx-link-delete').eq(0).trigger('dxpointerdown').trigger('click');
          this.clock.tick(10);
          assert.ok($('#dataGrid .dx-datagrid-pager').is(':visible'), 'Pager is visible');
        });
        QUnit.test('onEditCancling/onEditCanceled events should fire on cancel button click (T1030691)', function(assert) {
          var onEditCanceling = sinon.spy();
          var onEditCanceled = sinon.spy();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'id',
            dataSource: [{id: 1}],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            onEditCanceling: onEditCanceling,
            onEditCanceled: onEditCanceled
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.editRow(0);
          this.clock.tick(10);
          $('#dataGrid .dx-link-cancel').eq(0).trigger('dxpointerdown').trigger('click');
          this.clock.tick(10);
          assert.equal(onEditCanceling.callCount, 1, 'onEditCanceling call count');
          assert.equal(onEditCanceled.callCount, 1, 'onEditCanceled call count');
        });
        QUnit.test('Changing the \'editing.changes\' option  on the onOptionChanged event - The edit row should be updated when editing the boolean column', function(assert) {
          var onOptionChangedSpy = sinon.spy(function(e) {
            var changes = e.component.option('editing.changes');
            if (changes && changes.length && changes[0].data.field1 === false) {
              e.component.option('editing.changes', []);
            }
          });
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              field1: false
            }, {
              id: 2,
              field1: false
            }],
            keyExpr: 'id',
            columns: ['id', {
              dataField: 'field1',
              dataType: 'boolean'
            }],
            editing: {
              allowUpdating: true,
              mode: 'batch'
            },
            onOptionChanged: onOptionChangedSpy,
            loadingTimeout: null
          }).dxDataGrid('instance');
          $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
          this.clock.tick(10);
          var $secondCell = $(dataGrid.getCellElement(0, 1));
          assert.deepEqual(dataGrid.option('editing.changes'), [{
            key: 1,
            data: {field1: true},
            type: 'update'
          }], 'editing.changes');
          assert.ok($secondCell.hasClass('dx-cell-modified'), 'second cell is rendered as modified');
          $(dataGrid.getCellElement(0, 1)).find('.dx-checkbox').trigger('dxclick');
          this.clock.tick(10);
          $secondCell = $(dataGrid.getCellElement(0, 1));
          assert.deepEqual(dataGrid.option('editing.changes'), [], 'editing.changes');
          assert.notOk($secondCell.hasClass('dx-cell-modified'), 'second cell is rendered as unmodified');
        });
      });
      QUnit.module('newRowPosition', baseModuleConfig, function() {
        ['first', 'last'].forEach(function(newRowPosition) {
          QUnit.test(("added row should be visible if newRowPosition is " + newRowPosition + " and scrolling.mode is virtual"), function(assert) {
            var isFirstNewRowPosition = newRowPosition === 'first';
            var data = [];
            for (var i = 0; i < 100; i++) {
              data.push({id: i + 1});
            }
            var dataGrid = $('#dataGrid').dxDataGrid({
              showRowLines: false,
              height: 200,
              dataSource: data,
              scrolling: {
                mode: 'virtual',
                useNative: false
              },
              editing: {newRowPosition: newRowPosition},
              paging: {pageIndex: isFirstNewRowPosition ? 2 : 0}
            }).dxDataGrid('instance');
            this.clock.tick(300);
            dataGrid.addRow();
            this.clock.tick(400);
            var visibleRows = dataGrid.getVisibleRows();
            assert.ok(visibleRows[isFirstNewRowPosition ? 0 : visibleRows.length - 1].isNewRow, 'last row is new');
            assert.ok(dataGridWrapper.rowsView.isRowVisible(isFirstNewRowPosition ? 0 : visibleRows.length), 'new row is visible');
            assert.equal(dataGrid.pageIndex(), isFirstNewRowPosition ? 0 : 4, 'pageIndex');
            assert.ok($('#dataGrid').find('.dx-virtual-row').length, 'one virtual row is rendered');
          });
        });
        QUnit.test('Virtual row should not be rendered after the last inserted row with certain height and row count', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 50; i++) {
              items.push({
                id: i + 1,
                name: ("name " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            editing: {
              mode: 'row',
              allowAdding: true,
              newRowPosition: 'last'
            },
            height: 440,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(300);
          dataGrid.addRow();
          var $virtualRowElement = $(dataGrid.element()).find('.dx-virtual-row');
          var visibleRows = dataGrid.getVisibleRows();
          assert.ok(visibleRows[visibleRows.length - 1].isNewRow, 'last new row is rendered');
          assert.strictEqual($virtualRowElement.length, 1, 'only one virtual row is rendered');
        });
        QUnit.test('Virtual row should not be rendered in the viewport when the edit form is inserted in the last position with certain height and row count', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 130; i++) {
              items.push({
                id: i + 1,
                name: ("name " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            editing: {
              mode: 'form',
              allowAdding: true,
              newRowPosition: 'last'
            },
            height: 440,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(300);
          dataGrid.addRow();
          this.clock.tick(300);
          var $virtualRowElement = $(dataGrid.element()).find('.dx-virtual-row');
          var visibleRows = dataGrid.getVisibleRows();
          var lastRowIndex = visibleRows.length - 1;
          var $lastRowElement = $(dataGrid.getRowElement(lastRowIndex));
          assert.strictEqual($virtualRowElement.length, 1, 'only one virtual row is rendered');
          assert.notOk(dataGridWrapper.rowsView.isElementIntersectViewport($virtualRowElement), 'virtual row is rendered outside viewport');
          assert.ok(visibleRows[lastRowIndex].isNewRow, 'last new row is rendered');
          assert.ok($lastRowElement.hasClass('dx-row-inserted'), 'last row is a new row');
          assert.ok(dataGridWrapper.rowsView.isRowVisible($lastRowElement.index()), 'new row is in viewport');
        });
        QUnit.test('Last new rows should be rendered in a viewport when initial scroll position is top', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 102; i++) {
              items.push({
                id: i + 1,
                name: ("name " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            height: 500,
            showBorders: true,
            columnAutoWidth: true,
            editing: {
              mode: 'batch',
              allowAdding: true,
              newRowPosition: 'last'
            },
            remoteOperations: true,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(300);
          for (var i = 0; i < 3; i++) {
            dataGrid.addRow();
            this.clock.tick(300);
            var $virtualRowElement = $(dataGrid.element()).find('.dx-virtual-row');
            var $newRowElements = $(dataGrid.element()).find('.dx-row-inserted');
            var visibleRowCount = dataGrid.getVisibleRows().filter(function(row) {
              return row.isNewRow;
            }).length;
            assert.strictEqual($virtualRowElement.length, 1, 'only one virtual row is rendered');
            assert.notOk(dataGridWrapper.rowsView.isElementIntersectViewport($virtualRowElement), 'virtual row is rendered outside viewport');
            assert.strictEqual($newRowElements.length, i + 1, ((i + 1) + " new rows rendered"));
            assert.strictEqual(visibleRowCount, i + 1, ((i + 1) + " new rows in model"));
            for (var j = 0; j <= i; j++) {
              assert.ok(dataGridWrapper.rowsView.isRowVisible($($newRowElements.get(j)).index()), ((j + 1) + " new row is in viewport"));
            }
          }
        });
        QUnit.test('Last new rows should be rendered in a viewport when initial scroll position is bottom', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 102; i++) {
              items.push({
                id: i + 1,
                name: ("name " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            height: 500,
            showBorders: true,
            columnAutoWidth: true,
            editing: {
              mode: 'batch',
              allowAdding: true,
              newRowPosition: 'last'
            },
            remoteOperations: true,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(300);
          dataGrid.getScrollable().scrollTo(3500);
          this.clock.tick(300);
          var visibleRows = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRows[visibleRows.length - 1].key, 102, 'last visible row key');
          for (var i = 0; i < 2; i++) {
            dataGrid.addRow();
            this.clock.tick(300);
            var $virtualRowElement = $(dataGrid.element()).find('.dx-virtual-row');
            var $newRowElements = $(dataGrid.element()).find('.dx-row-inserted');
            var visibleRowCount = dataGrid.getVisibleRows().filter(function(row) {
              return row.isNewRow;
            }).length;
            assert.strictEqual($virtualRowElement.length, 1, 'only one virtual row is rendered');
            assert.notOk(dataGridWrapper.rowsView.isElementIntersectViewport($virtualRowElement), 'virtual row is rendered outside viewport');
            assert.strictEqual($newRowElements.length, i + 1, ((i + 1) + " new rows rendered"));
            assert.strictEqual(visibleRowCount, i + 1, ((i + 1) + " new rows in model"));
            for (var j = 0; j <= i; j++) {
              assert.ok(dataGridWrapper.rowsView.isRowVisible($($newRowElements.get(j)).index()), ((j + 1) + " new row is in viewport"));
            }
          }
        });
        QUnit.test('Virtual row should not be rendered in the viewport when the edit form is inserted in the first position with certain height and row count', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 130; i++) {
              items.push({
                id: i + 1,
                name: ("name " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            editing: {
              mode: 'form',
              allowAdding: true,
              newRowPosition: 'first'
            },
            height: 440,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          });
          this.clock.tick(300);
          dataGrid.getScrollable().scrollTo({top: 4100});
          var visibleRows = dataGrid.getVisibleRows();
          var lastRowIndex = visibleRows.length - 1;
          assert.strictEqual(visibleRows[lastRowIndex].key, 130, 'last row is rendered');
          dataGrid.addRow();
          var $virtualRowElement = $(dataGrid.element()).find('.dx-virtual-row');
          visibleRows = dataGrid.getVisibleRows();
          var $firstRowElement = $(dataGrid.getRowElement(0));
          assert.strictEqual($virtualRowElement.length, 1, 'only one virtual row is rendered');
          assert.notOk(dataGridWrapper.rowsView.isElementIntersectViewport($virtualRowElement), 'virtual row is rendered outside viewport');
          assert.ok(visibleRows[0].isNewRow, 'first new row is rendered');
          assert.ok($firstRowElement.hasClass('dx-row-inserted'), 'first row is a new row');
          assert.ok(dataGridWrapper.rowsView.isRowVisible($firstRowElement.index()), 'new row is in viewport');
        });
        ['first', 'last', 'pageTop', 'pageBottom', 'viewportTop', 'viewportBottom'].forEach(function(newRowPosition) {
          QUnit.test(("New row should be shown with saved cell value when a row is added repeatedly (newRowPosition is " + newRowPosition + ")"), function(assert) {
            var getData = function() {
              var items = [];
              for (var i = 0; i < 20; i += 1) {
                items.push({
                  id: i + 1,
                  name: ("Name " + (i + 1))
                });
              }
              return items;
            };
            var dataGrid = createDataGrid({
              height: 400,
              dataSource: getData(),
              keyExpr: 'id',
              editing: {newRowPosition: newRowPosition},
              paging: {pageSize: 10},
              scrolling: {useNative: false}
            });
            var newRowVisibleIndex = 0;
            switch (newRowPosition) {
              case 'last':
              case 'pageBottom':
                {
                  newRowVisibleIndex = 10;
                  break;
                }
              case 'viewportTop':
                {
                  newRowVisibleIndex = 1;
                  break;
                }
              case 'viewportBottom':
                {
                  newRowVisibleIndex = 8;
                  break;
                }
            }
            var pageIndexToChange = newRowPosition === 'last' ? 0 : 1;
            var firstRowKeyOnManuallySwitchedPage = newRowPosition === 'last' ? 1 : 11;
            this.clock.tick(300);
            if (newRowPosition === 'viewportTop') {
              dataGrid.getScrollable().scrollTo({top: 80});
              this.clock.tick(300);
              assert.strictEqual(dataGrid.getTopVisibleRowData().id, 2, 'first visible row data after scroll');
            }
            dataGrid.addRow();
            this.clock.tick(300);
            assert.ok(dataGrid.getVisibleRows()[newRowVisibleIndex].isNewRow, 'row was added initially');
            assert.ok(dataGridWrapper.rowsView.isRowVisible(newRowVisibleIndex), 'new row visible after adding');
            if (newRowPosition === 'last') {
              assert.strictEqual(dataGrid.pageIndex(), 1, 'switched to the second page on adding a new row');
            } else {
              assert.strictEqual(dataGrid.pageIndex(), 0, 'page is not switched on adding a new row');
            }
            $(dataGrid.getCellElement(newRowVisibleIndex, 1)).find('.dx-texteditor-input').val('111').trigger('change');
            dataGrid.pageIndex(pageIndexToChange);
            this.clock.tick(10);
            assert.strictEqual(dataGrid.pageIndex(), pageIndexToChange, 'page index is changed manually');
            assert.strictEqual(dataGrid.getVisibleRows()[0].key, firstRowKeyOnManuallySwitchedPage, 'first row is shown on the manually switched page');
            dataGrid.addRow();
            this.clock.tick(10);
            assert.strictEqual(dataGrid.pageIndex(), pageIndexToChange === 0 ? 1 : 0, 'switched to page with a new row');
            assert.ok(dataGrid.getVisibleRows()[newRowVisibleIndex].isNewRow, 'new row is rendered');
            assert.ok(dataGridWrapper.rowsView.isRowVisible(newRowVisibleIndex), 'new row visible after adding repeatedly');
            assert.strictEqual($(dataGrid.getCellElement(newRowVisibleIndex, 1)).find('.dx-texteditor-input').val(), '111', 'cell value in a new row is not changed');
          });
          QUnit.test(("DataGrid should not throw error on adding row when height is not defined and newRowPosition is " + newRowPosition), function(assert) {
            var getData = function() {
              var items = [];
              for (var i = 0; i < 100; i += 1) {
                items.push({
                  id: i + 1,
                  name: ("Name " + (i + 1))
                });
              }
              return items;
            };
            var dataGrid = createDataGrid({
              dataSource: getData(),
              keyExpr: 'id',
              editing: {newRowPosition: newRowPosition},
              paging: {pageSize: 10},
              scrolling: {
                mode: 'virtual',
                useNative: false
              }
            });
            this.clock.tick(300);
            dataGrid.addRow();
            assert.ok(true, 'no errors');
          });
        });
        QUnit.test('Adding row after changing focusedRowKey should work', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            keyExpr: 'id',
            focusedRowEnabled: true
          });
          this.clock.tick(300);
          dataGrid.option('focusedRowKey', 4);
          var dataSource = dataGrid.option('dataSource');
          dataSource.push({id: 4});
          dataGrid.option('dataSource', dataSource);
          this.clock.tick(300);
          assert.strictEqual(dataGrid.getVisibleRows().length, 4);
          assert.ok($(dataGrid.element()).find('.dx-data-row:eq(3)').hasClass('dx-row-focused'));
        });
        ['first', 'last', 'viewportTop', 'viewportBottom'].forEach(function(newRowPosition) {
          QUnit.test(("New row should be shown with saved cell value when a new row is added repeatedly (newRowPosition is " + newRowPosition + " and virtual scrolling)"), function(assert) {
            var getData = function() {
              var items = [];
              for (var i = 0; i < 100; i += 1) {
                items.push({
                  id: i + 1,
                  name: ("Name " + (i + 1))
                });
              }
              return items;
            };
            var dataGrid = createDataGrid({
              height: 400,
              dataSource: getData(),
              keyExpr: 'id',
              editing: {newRowPosition: newRowPosition},
              paging: {pageSize: 10},
              scrolling: {
                mode: 'virtual',
                useNative: false
              }
            });
            var getNewRowInfo = function() {
              var visibleIndex = 0;
              var row = dataGrid.getVisibleRows().filter(function(item, index) {
                if (item.isNewRow) {
                  visibleIndex = index;
                  return true;
                }
                return false;
              })[0];
              return {
                visibleIndex: visibleIndex,
                row: row
              };
            };
            var newRowInfo;
            var checkNeighboringRow = function() {
              if (newRowPosition === 'first') {
                assert.strictEqual(dataGrid.getVisibleRows()[newRowInfo.visibleIndex + 1].key, 1, 'data row after the first new row');
              }
              if (newRowPosition === 'viewportTop') {
                assert.ok(dataGrid.getVisibleRows()[newRowInfo.visibleIndex - 1].key >= 44, 'data row before a new row at the viewport top');
              }
              if (newRowPosition === 'viewportBottom') {
                assert.ok(dataGrid.getVisibleRows()[newRowInfo.visibleIndex - 1].key >= 54, 'data row before a new row at the viewport bottom');
              }
              if (newRowPosition === 'last') {
                assert.strictEqual(dataGrid.getVisibleRows()[newRowInfo.visibleIndex - 1].key, 100, 'data row before the last new row');
              }
            };
            this.clock.tick(400);
            if (newRowPosition === 'viewportTop' || newRowPosition === 'viewportBottom') {
              dataGrid.getScrollable().scrollTo({top: 1500});
              this.clock.tick(400);
              assert.strictEqual(dataGrid.getTopVisibleRowData().id, 45, 'first visible row data after scroll');
            }
            dataGrid.addRow();
            this.clock.tick(400);
            newRowInfo = getNewRowInfo();
            assert.ok(newRowInfo.row.isNewRow, 'new row was added initially');
            assert.ok(dataGridWrapper.rowsView.isRowVisible(newRowInfo.visibleIndex), 'new row visible after adding');
            checkNeighboringRow();
            $(dataGrid.getCellElement(newRowInfo.visibleIndex, 1)).find('.dx-texteditor-input').val('111').trigger('change');
            dataGrid.getScrollable().scrollTo({top: newRowPosition === 'first' ? 3500 : 0});
            this.clock.tick(400);
            assert.ok(dataGrid.getVisibleRows()[0].key >= newRowPosition === 'first' ? 91 : 1, 'top visible row key');
            dataGrid.addRow();
            this.clock.tick(300);
            newRowInfo = getNewRowInfo();
            assert.ok(newRowInfo.row.isNewRow, 'new row was added repeatedly');
            assert.ok(dataGridWrapper.rowsView.isRowVisible(newRowInfo.visibleIndex), 'new row visible after adding repeatedly');
            checkNeighboringRow();
            assert.strictEqual($(dataGrid.getCellElement(newRowInfo.visibleIndex, 1)).find('.dx-texteditor-input').val(), '111', 'cell value in a new row is not changed');
          });
        });
        ['pageBottom', 'pageTop'].forEach(function(newRowPosition) {
          QUnit.test(("Adding a new row should not throw error in popup mode (newRowPosition is " + newRowPosition + " and rowRenderingMode: virtual)"), function(assert) {
            var getData = function() {
              var items = [];
              for (var i = 0; i < 100; i += 1) {
                items.push({
                  id: i + 1,
                  name: ("Name " + (i + 1))
                });
              }
              return items;
            };
            var dataGrid = createDataGrid({
              height: 200,
              dataSource: getData(),
              keyExpr: 'id',
              editing: {newRowPosition: newRowPosition},
              paging: {pageSize: 10},
              scrolling: {
                rowRenderingMode: 'virtual',
                useNative: false
              },
              masterDetail: {
                enabled: true,
                autoExpandAll: true
              }
            });
            this.clock.tick(400);
            dataGrid.addRow();
            this.clock.tick(400);
            assert.ok(true, 'no errors');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","animation/fx","events/pointer","ui/themes","core/utils/type","data/data_source/data_source","ui/select_box","ui/text_area","core/config","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","core/utils/common","../../helpers/wrappers/dataGridWrappers.js","ui/drop_down_box","../../helpers/grid/keyboardNavigationHelper.js","../../helpers/dataGridHelper.js","../../helpers/dataGridMocks.js","core/utils/size","../../helpers/stylesHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("animation/fx"), require("events/pointer"), require("ui/themes"), require("core/utils/type"), require("data/data_source/data_source"), require("ui/select_box"), require("ui/text_area"), require("core/config"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("core/utils/common"), require("../../helpers/wrappers/dataGridWrappers.js"), require("ui/drop_down_box"), require("../../helpers/grid/keyboardNavigationHelper.js"), require("../../helpers/dataGridHelper.js"), require("../../helpers/dataGridMocks.js"), require("core/utils/size"), require("../../helpers/stylesHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editing.integration.tests.js.map