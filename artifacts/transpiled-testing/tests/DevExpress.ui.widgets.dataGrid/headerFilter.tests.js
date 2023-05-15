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

(["testing/tests/DevExpress.ui.widgets.dataGrid/headerFilter.tests.js"], ["generic_light.css!","ui/data_grid","ui/grid_core/ui.grid_core.utils","jquery","data/array_store","core/utils/common","data/odata/store","core/devices","data/data_source/data_source","ui/grid_core/ui.grid_core.header_filter","events/drag","../../helpers/dataGridMocks.js","core/utils/view_port","animation/fx","localization/message","core/utils/date_serialization","../../helpers/wrappers/searchBoxWrappers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/headerFilter.tests.js", ["generic_light.css!", "ui/data_grid", "ui/grid_core/ui.grid_core.utils", "jquery", "data/array_store", "core/utils/common", "data/odata/store", "core/devices", "data/data_source/data_source", "ui/grid_core/ui.grid_core.header_filter", "events/drag", "../../helpers/dataGridMocks.js", "core/utils/view_port", "animation/fx", "localization/message", "core/utils/date_serialization", "../../helpers/wrappers/searchBoxWrappers.js"], function($__export) {
  "use strict";
  var gridCoreUtils,
      $,
      ArrayStore,
      noop,
      ODataStore,
      devices,
      DataSource,
      invertFilterExpression,
      dragEvents,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      viewPortUtils,
      fx,
      messageLocalization,
      dateSerialization,
      ListSearchBoxWrapper;
  function getListOrTreeView() {
    var $popupContent = this.headerFilterView.getPopupContainer().$content();
    var list = $popupContent.find('.dx-list');
    var treeView = $popupContent.find('.dx-treeview');
    return list.length ? list.dxList('instance') : treeView.dxTreeView('instance');
  }
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      gridCoreUtils = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      ODataStore = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      invertFilterExpression = $__m.invertFilterExpression;
    }, function($__m) {
      dragEvents = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
    }, function($__m) {
      viewPortUtils = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      dateSerialization = $__m.default;
    }, function($__m) {
      ListSearchBoxWrapper = $__m.ListSearchBoxWrapper;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div>\n            <div id=\"container\"  class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Header Filter dataController', {
        beforeEach: function() {
          this.setupDataGrid = function(options) {
            this.options = options;
            setupDataGridModules(this, ['columns', 'data', 'headerFilter'], {initViews: false});
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose && this.dispose();
        }
      }, function() {
        QUnit.test('filterValues with one value', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [1]
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), ['Test', '=', 1], 'combined filter');
        });
        QUnit.test('filterValues with several values', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [1, 2]
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), [['Test', '=', 1], 'or', ['Test', '=', 2]], 'combined filter');
        });
        QUnit.test('filterValues with several values with filterType \'exclude\'', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [1, 2],
              filterType: 'exclude'
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), ['!', [['Test', '=', 1], 'or', ['Test', '=', 2]]], 'combined filter');
        });
        QUnit.test('filterValues with one filter expression', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [['Test', '>', 5]]
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), ['Test', '>', 5], 'combined filter');
        });
        QUnit.test('filterValues with several filter expressions', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [['Test', '>', 5], ['Test', '<', 2]]
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), [['Test', '>', 5], 'or', ['Test', '<', 2]], 'combined filter');
        });
        QUnit.test('filterValues with one filter expressions and with filterType \'exclude\'', function(assert) {
          var that = this;
          that.setupDataGrid({
            columns: [{
              dataField: 'Test',
              filterValues: [[['Test', '>', 2], 'and', ['Test', '<', 5]]],
              filterType: 'exclude'
            }],
            remoteOperations: true,
            dataSource: []
          });
          assert.deepEqual(that.getCombinedFilter(), ['!', [['Test', '>', 2], 'and', ['Test', '<', 5]]], 'combined filter');
        });
        QUnit.test('invertFilterExpression', function(assert) {
          assert.deepEqual(invertFilterExpression(['Test', '=', 1]), ['!', ['Test', '=', 1]], 'invert = operation');
        });
        QUnit.test('Header filter with custom dataSource - postProcess should not be ignored', function(assert) {
          var items;
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              headerFilter: {dataSource: {
                  store: [{field: 1}],
                  postProcess: function(items) {
                    return items.map(function(item) {
                      return {
                        text: 'test' + item.field,
                        value: item.field
                      };
                    });
                  }
                }}
            }]
          });
          var dataSource = new DataSource(this.headerFilterController.getDataSource(this.getVisibleColumns()[0]));
          dataSource.load().done(function(data) {
            items = data;
          });
          this.clock.tick(10);
          assert.deepEqual(items, [{
            text: 'test1',
            value: 1
          }]);
        });
        QUnit.test('Header filter with dataSource as function - postProcess should not be ignored (for a lookup column)', function(assert) {
          var items;
          this.setupDataGrid({
            dataSource: [],
            headerFilter: {texts: {emptyValue: 'blank'}},
            columns: [{
              dataField: 'Test',
              lookup: {
                dataSource: [{field: 1}],
                valueExpr: 'field',
                displayExpr: 'field'
              },
              headerFilter: {dataSource: function(options) {
                  options.dataSource.postProcess = function(items) {
                    return items.forEach(function(item) {
                      if (item.value) {
                        item.text = 'test' + item.text;
                      }
                    });
                  };
                }}
            }]
          });
          var dataSource = new DataSource(this.headerFilterController.getDataSource(this.getVisibleColumns()[0]));
          dataSource.load().done(function(data) {
            items = data;
          });
          this.clock.tick(10);
          assert.deepEqual(items, [{
            text: 'blank',
            value: null
          }, {
            field: 1,
            text: 'test1',
            value: 1
          }]);
        });
        QUnit.test('Header filter with custom dataSource if column with lookup', function(assert) {
          var items;
          this.setupDataGrid({
            dataSource: [],
            headerFilter: {texts: {emptyValue: 'blank'}},
            columns: [{
              dataField: 'Test',
              lookup: {
                dataSource: [{field: 1}],
                valueExpr: 'field',
                displayExpr: 'field'
              },
              headerFilter: {dataSource: [{
                  text: 'test1',
                  value: 1
                }, {
                  text: 'test2',
                  value: 2
                }]}
            }]
          });
          var dataSource = new DataSource(this.headerFilterController.getDataSource(this.getVisibleColumns()[0]));
          dataSource.load().done(function(data) {
            items = data;
          });
          this.clock.tick(10);
          assert.deepEqual(items, [{
            text: 'test1',
            value: 1
          }, {
            text: 'test2',
            value: 2
          }]);
        });
        QUnit.test('Filter should be correct when first column with caption = "!" and second column with filterType = "exclude"', function(assert) {
          this.setupDataGrid({
            columns: [{
              dataField: 'field1',
              caption: '!'
            }, {
              dataField: 'field2',
              filterType: 'exclude',
              filterValues: ['test']
            }],
            dataSource: []
          });
          assert.deepEqual(this.getCombinedFilter(), ['!', [this.columnOption('field2').selector, '=', 'test']], 'combined filter');
        });
      });
      QUnit.module('Header Filter', {
        beforeEach: function() {
          this.items = [];
          this.columns = [{
            dataField: 'Test1',
            allowHeaderFiltering: true,
            calculateCellValue: function(data) {
              return data.Test1;
            }
          }, {
            dataField: 'Test2',
            allowHeaderFiltering: true,
            calculateCellValue: function(data) {
              return data.Test2;
            }
          }];
          this.options = {
            headerFilter: {
              allowSelectAll: true,
              visible: true,
              width: 250,
              height: 300,
              search: {
                enabled: false,
                timeout: 500,
                mode: 'contains',
                editorOptions: {}
              },
              texts: {
                ok: 'Ok',
                cancel: 'Cancel',
                emptyValue: '(Blanks)'
              }
            },
            showColumnHeaders: true
          };
          this.setupDataGrid = function() {
            setupDataGridModules(this, ['columns', 'data', 'columnHeaders', 'headerFilter', 'headerPanel', 'grouping'], {
              initViews: true,
              controllers: {
                columns: new MockColumnsController(this.columns),
                data: new MockDataController({items: this.items})
              }
            });
          };
          this.generateItems = function(count, duplicateCount) {
            duplicateCount = duplicateCount || 1;
            this.items = [];
            for (var i = 1; i <= count; i++) {
              for (var j = 0; j < duplicateCount; j++) {
                this.items.push({Test1: 'test' + (i < 10 ? '0' : '') + i});
              }
            }
          };
          this.getListOrTreeView = getListOrTreeView.bind(this);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.headerFilterController && this.headerFilterController.hideHeaderFilterMenu();
          this.dispose && this.dispose();
        }
      }, function() {
        QUnit.test('Draw header filter indicator', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter').length, 2, 'has header filter indicators');
        });
        QUnit.test('header filter indicator should have role, label, haspopup attributes', function(assert) {
          var that = this;
          var testElement = $('#container');
          var columnsCaptions = ['col 1', 'col 2'];
          this.columns = [{
            dataField: 'Test1',
            allowFiltering: true,
            caption: columnsCaptions[0]
          }, {
            dataField: 'Test2',
            allowFiltering: true,
            caption: columnsCaptions[1]
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          var filterIndicator = testElement.find('.dx-header-filter');
          assert.expect(6);
          filterIndicator.each(function(ind, element) {
            var ariaLabelValue = messageLocalization.format('dxDataGrid-headerFilterIndicatorLabel', columnsCaptions[ind]);
            assert.strictEqual(element.getAttribute('role'), 'button', ("filter indicator " + ind + " has role attr"));
            assert.strictEqual(element.getAttribute('aria-haspopup'), 'dialog', ("filter indicator " + ind + " has aria-haspopup attr"));
            assert.strictEqual(element.getAttribute('aria-label'), ariaLabelValue, ("filter indicator " + ind + " has aria-label attr"));
          });
        });
        QUnit.test('Draw header filter indicator with allowFiltering true', function(assert) {
          var that = this;
          var testElement = $('#container');
          this.columns = [{
            dataField: 'Test1',
            allowFiltering: true,
            calculateCellValue: function(data) {
              return data.Test1;
            }
          }, {
            dataField: 'Test2',
            allowFiltering: true,
            calculateCellValue: function(data) {
              return data.Test2;
            }
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter').length, 2, 'has header filter indicators');
        });
        QUnit.test('Draw header filter indicator with allowFiltering false and allowHeaderFiltering true', function(assert) {
          var that = this;
          var testElement = $('#container');
          this.columns = [{
            dataField: 'Test1',
            allowFiltering: false,
            allowHeaderFiltering: true,
            calculateCellValue: function(data) {
              return data.Test1;
            }
          }, {
            dataField: 'Test2',
            allowFiltering: false,
            allowHeaderFiltering: true,
            calculateCellValue: function(data) {
              return data.Test2;
            }
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter').length, 2, 'has header filter indicators');
        });
        QUnit.test('Not draw header filter indicator with allowFiltering true and allowHeaderFiltering false', function(assert) {
          var that = this;
          var testElement = $('#container');
          this.columns = [{
            dataField: 'Test1',
            allowFiltering: true,
            allowHeaderFiltering: false,
            calculateCellValue: function(data) {
              return data.Test1;
            }
          }, {
            dataField: 'Test2',
            allowFiltering: true,
            allowHeaderFiltering: false,
            calculateCellValue: function(data) {
              return data.Test2;
            }
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter').length, 0, 'not has header filter indicators');
        });
        QUnit.test('Show header filter', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.ok($popupContent.find('.dx-empty-message').length, 'no data');
          assert.strictEqual(that.headerFilterView.getPopupContainer().option('hideOnParentScroll'), false, 'hideOnParentScroll should be false');
        });
        QUnit.test('Header filter popup should have aria-label and role attributes', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var popupContainer = that.headerFilterView.getPopupContainer();
          var $popupContent = popupContainer.$content().parent();
          assert.strictEqual($popupContent.attr('aria-label'), messageLocalization.format('dxDataGrid-headerFilterLabel'), 'has aria-label attribute');
          assert.strictEqual($popupContent.attr('role'), 'dialog', 'has role="dialog" attribute');
        });
        QUnit.test('Show header filter when no dataSource', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.dataController.dataSource = noop;
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.ok($popupContent.find('.dx-empty-message').length, 'no data');
        });
        QUnit.test('Show header filter animation in ios', function(assert) {
          var that = this;
          var testElement = $('#container');
          devices._currentDevice = {platform: 'ios'};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var popup = that.headerFilterView.getPopupContainer().option('animation');
          assert.equal(popup.show.type, 'pop', 'animation show type');
          devices._currentDevice = null;
        });
        [{
          showColumnLines: false,
          alignment: 'left',
          position: 'left'
        }, {
          showColumnLines: false,
          alignment: 'center',
          position: 'left'
        }, {
          showColumnLines: false,
          alignment: 'right',
          position: 'right'
        }, {
          showColumnLines: true,
          alignment: 'left',
          position: 'right'
        }, {
          showColumnLines: true,
          alignment: 'center',
          position: 'right'
        }, {
          showColumnLines: true,
          alignment: 'right',
          position: 'left'
        }].forEach(function($__4) {
          var $__5 = $__4,
              showColumnLines = $__5.showColumnLines,
              alignment = $__5.alignment,
              position = $__5.position;
          QUnit.test(("Header filter position (column.alignment=" + alignment + ", showColumnLines=" + showColumnLines + ") (T1033810)"), function(assert) {
            var that = this;
            var testElement = $('#container');
            that.options.showColumnLines = showColumnLines;
            that.columns[0].alignment = alignment;
            that.setupDataGrid();
            that.columnHeadersView.render(testElement);
            that.headerFilterView.render(testElement);
            that.headerFilterController.showHeaderFilterMenu(0);
            assert.strictEqual(that.headerFilterView.getPopupContainer().option('position.my'), (position + " top"), 'my position');
            assert.strictEqual(that.headerFilterView.getPopupContainer().option('position.at'), (position + " bottom"), 'at position');
          });
        });
        QUnit.test('Show header filter when column with dataType date', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-treeview').length, 'has list in header filter menu');
          assert.ok($popupContent.find('.dx-empty-message').length, 'no data');
        });
        QUnit.test('Show header filter when column with encodeHtml is false', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            Test1: '<b>test1</b>',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.columns[0].encodeHtml = false;
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          assert.equal($testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          var $listItemElements = $popupContent.find('.dx-list-item-content');
          assert.equal($listItemElements.length, 2, 'count list item');
          assert.strictEqual($listItemElements.first().html(), '<b>test1</b>', 'html of the first list item');
          assert.strictEqual($listItemElements.first().text(), 'test1', 'text of the first list item');
          assert.strictEqual($listItemElements.last().html(), 'test3', 'html of the second list item');
        });
        QUnit.test('Show header filter when column with encodeHtml is true', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            Test1: '<b>test1</b>',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.columns[0].encodeHtml = true;
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          assert.equal($testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          var $listItemElements = $popupContent.find('.dx-list-item-content');
          assert.equal($listItemElements.length, 2, 'count list item');
          assert.notStrictEqual($listItemElements.first().html(), '<b>test1</b>', 'html of the first list item');
          assert.strictEqual($listItemElements.first().text(), '<b>test1</b>', 'text of the first list item');
          assert.strictEqual($listItemElements.last().html(), 'test3', 'html of the second list item');
        });
        QUnit.test('Hide header filter', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.ok($popupContent.find('.dx-empty-message').length, 'no data');
          that.headerFilterController.hideHeaderFilterMenu();
          that.clock.tick(500);
          assert.ok(!$('body').children('.dx-header-filter-menu').length, 'not has wrapper header filter menu');
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
        });
        QUnit.test('Header filter with items', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-select-all').length, 1, 'has list select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 3, 'count checkboxes');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count list items');
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), 'test1', 'text first item');
          assert.strictEqual($popupContent.find('.dx-list-item').last().text(), 'test3', 'text second item');
        });
        QUnit.test('Header filter with items where many duplicate values', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30, 5);
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-select-all').length, 1, 'has list select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 21, 'count checkboxes');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'count list items');
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), 'test01', 'text first item');
          assert.strictEqual($popupContent.find('.dx-list-item').last().text(), 'test20', 'text second item');
        });
        QUnit.test('Header filter with items when column with dataType date', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.items = [{
            Test1: new Date(1986, 0, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 0, 4),
            Test2: 'test4'
          }, {
            Test1: null,
            Test2: 'test6'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-treeview').length, 'has treeview in header filter menu');
          assert.equal($popupContent.find('.dx-treeview-select-all-item').length, 1, 'has treeview select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 3, 'count checkboxes');
          assert.equal($popupContent.find('.dx-treeview-item').length, 2, 'count treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').eq(0).text(), '(Blanks)', 'empty text treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').eq(1).text(), '1986', 'text treeview item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-node-container-opened').length, 1, 'treeview node container opened');
          assert.equal($popupContent.find('.dx-treeview-item').length, 3, 'has treeview items');
          assert.strictEqual($popupContent.find('.dx-treeview-item').last().text(), 'January', 'text the nested treeview item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').last()).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-node-container-opened').length, 2, 'treeview node container opened');
          assert.equal($popupContent.find('.dx-treeview-item').length, 5, 'has treeview items');
          assert.strictEqual($popupContent.find('.dx-treeview-item').eq(3).text(), '1', 'text the nested treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').eq(4).text(), '4', 'text the nested treeview item');
        });
        QUnit.test('Header filter with items when column lookup with simple types', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].lookup = {dataSource: ['test1', 'test2', 'test3']};
          that.columns[0].filterValues = ['test3'];
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-select-all').length, 1, 'has list select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 5, 'count checkboxes');
          assert.equal($popupContent.find('.dx-list-item').length, 4, 'count list items');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), '(Blanks)', 'text item 0');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'test1', 'text item 1');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(2).text(), 'test2', 'text item 2');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(3).text(), 'test3', 'text item 3');
          assert.ok(!$popupContent.find('.dx-list-item').eq(2).hasClass('dx-list-item-selected'), 'text item 2 is not selected');
          assert.ok($popupContent.find('.dx-list-item').eq(3).hasClass('dx-list-item-selected'), 'text item 3 is selected');
        });
        QUnit.test('Header filter with items when column lookup with object types', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].lookup = {
            valueExpr: 'id',
            displayExpr: 'value',
            dataSource: [{
              id: 1,
              value: 'test1'
            }, {
              id: 2,
              value: 'test2'
            }, {
              id: 3,
              value: 'test3'
            }]
          };
          that.columns[0].filterValues = [3];
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-select-all').length, 1, 'has list select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 5, 'count checkboxes');
          assert.equal($popupContent.find('.dx-list-item').length, 4, 'count list items');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), '(Blanks)', 'text item 0');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'test1', 'text item 1');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(2).text(), 'test2', 'text item 2');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(3).text(), 'test3', 'text item 3');
          assert.ok(!$popupContent.find('.dx-list-item').eq(2).hasClass('dx-list-item-selected'), 'text item 2 is not selected');
          assert.ok($popupContent.find('.dx-list-item').eq(3).hasClass('dx-list-item-selected'), 'text item 3 is selected');
        });
        QUnit.test('Header filter with items when lookup dataSource as function', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].lookup = {dataSource: function() {
              return ['test1', 'test2', 'test3'];
            }};
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-select-all').length, 1, 'has list select all');
          assert.equal($popupContent.find('.dx-checkbox').length, 5, 'count checkboxes');
          assert.equal($popupContent.find('.dx-list-item').length, 4, 'count list items');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), '(Blanks)', 'text item 0');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'test1', 'text item 1');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(2).text(), 'test2', 'text item 2');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(3).text(), 'test3', 'text item 3');
        });
        QUnit.test('Header filter with items when column with dataType date and filterValues', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.columns[0].filterValues = ['1986/1/4'];
          that.items = [{
            Test1: new Date(1986, 0, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 0, 4),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-treeview').length, 'has treeview in header filter menu');
          assert.equal($popupContent.find('.dx-treeview-item').length, 1, 'count treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').text(), '1986', 'text treeview item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-item').length, 2, 'count treeview items');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').last()).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-item').length, 4, 'count treeview items');
          assert.ok($popupContent.find('.dx-treeview-node').last().children('.dx-checkbox').hasClass('dx-checkbox-checked'), 'checked checkbox in last item');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'count checked checkboxes');
        });
        QUnit.test('Save state when selecting', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count list items');
          $popupContent.children().dxList('instance').selectItem(1);
          assert.ok($popupContent.find('.dx-list-item').last().hasClass('dx-list-item-selected'), 'selected second item');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['test3'],
            filterType: undefined
          }, 'column options');
          that.headerFilterController.showHeaderFilterMenu(0);
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count list items');
          assert.ok($popupContent.find('.dx-list-item').last().hasClass('dx-list-item-selected'), 'selected second item');
        });
        QUnit.test('Update selecting for first page when filterValues for second page is defined', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test25'];
          that.columns[0].filterType = 'exclude';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'count list items');
          $($popupContent.find('.dx-list-item .dx-checkbox').eq(0)).trigger('dxclick');
          assert.ok(!$popupContent.find('.dx-list-item').eq(0).hasClass('dx-list-item-selected'), 'first item is unselected');
          assert.ok($popupContent.find('.dx-list-item').eq(1).hasClass('dx-list-item-selected'), 'second item is selected');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['test25', 'test01'],
            filterType: 'exclude'
          }, 'column options');
        });
        QUnit.test('Restore selecting state for second page when all items on first page selected', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test25'];
          that.columns[0].filterType = 'exclude';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 20, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
          $popupContent.find('.dx-scrollview').dxScrollView('option', 'onReachBottom')();
          assert.equal($popupContent.find('.dx-list-item').length, 30, 'count list items after load second page');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 29, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
        });
        QUnit.test('Restore selecting state for second page when not all items on first page selected', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test05', 'test25'];
          that.columns[0].filterType = 'exclude';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 19, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
          $popupContent.find('.dx-scrollview').dxScrollView('option', 'onReachBottom')();
          assert.equal($popupContent.find('.dx-list-item').length, 30, 'count list items after load second page');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 28, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
        });
        QUnit.test('Restore selecting state for second page when no selected items on first page', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test25'];
          that.columns[0].filterType = 'include';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 0, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
          $popupContent.find('.dx-scrollview').dxScrollView('option', 'onReachBottom')();
          assert.equal($popupContent.find('.dx-list-item').length, 30, 'count list items after load second page');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 1, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value in intermediate state');
        });
        QUnit.test('Second page selection after select all', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test25'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 0, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value is unchecked');
          $($popupContent.find('.dx-list-select-all-checkbox')).trigger('dxclick');
          $popupContent.find('.dx-scrollview').dxScrollView('option', 'onReachBottom')();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 30, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 30, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), true, 'select all checkbox value is checked');
          assert.deepEqual(that.columns[0].filterValues, ['test25'], 'original filterValues is not changed');
        });
        QUnit.test('Second page selection after unselect all', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.generateItems(30);
          that.columns[0].filterValues = ['test25'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 20, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 0, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), undefined, 'select all checkbox value is unchecked');
          $($popupContent.find('.dx-list-select-all-checkbox')).trigger('dxclick');
          $($popupContent.find('.dx-list-select-all-checkbox')).trigger('dxclick');
          $popupContent.find('.dx-scrollview').dxScrollView('option', 'onReachBottom')();
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 30, 'items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 0, 'selected items count');
          assert.strictEqual($popupContent.find('.dx-list-select-all-checkbox').dxCheckBox('option', 'value'), false, 'select all checkbox value is checked');
          assert.deepEqual(that.columns[0].filterValues, ['test25'], 'original filterValues is not changed');
        });
        QUnit.test('Save state when selecting for column with dataType date', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.items = [{
            Test1: new Date(1986, 0, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 4),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-treeview').length, 'has treeview in header filter menu');
          assert.equal($popupContent.find('.dx-treeview-item').length, 1, 'count treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').text(), '1986', 'text treeview item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-item').length, 3, 'count treeview items');
          $($popupContent.find('.dx-treeview-node').last().children('.dx-checkbox')).trigger('dxclick');
          assert.ok($popupContent.find('.dx-treeview-node').last().children('.dx-checkbox').hasClass('dx-checkbox-checked'), 'selected last item');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['1986/4'],
            filterType: undefined
          }, 'option name');
          that.headerFilterController.showHeaderFilterMenu(0);
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.equal($popupContent.find('.dx-checkbox-indeterminate').length, 2, 'count an indeterminate checkboxes');
          $($popupContent.find('.dx-treeview-toggle-item-visibility')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-treeview-item').length, 3, 'count treeview items');
          assert.ok($popupContent.find('.dx-treeview-node').last().children('.dx-checkbox').hasClass('dx-checkbox-checked'), 'checked checkbox in last item');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'count checked checkboxes');
        });
        QUnit.test('Save state when selecting for column with dataType date. filterType is \'exclude\'', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.columns[0].filterType = 'exclude';
          that.items = [{
            Test1: new Date(1986, 0, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 4),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          that.clock.tick(500);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.find('.dx-treeview').length, 'has treeview in header filter menu');
          assert.equal($popupContent.find('.dx-treeview-item').length, 1, 'count treeview item');
          assert.strictEqual($popupContent.find('.dx-treeview-item').text(), '1986', 'text treeview item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility')).trigger('dxclick');
          that.clock.tick(500);
          assert.equal($popupContent.find('.dx-treeview-item').length, 3, 'count treeview items');
          $($popupContent.find('.dx-treeview-node').last().children('.dx-checkbox')).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.find('.dx-treeview-node').last().children('.dx-checkbox').hasClass('dx-checkbox-checked'), 'unchecked last item');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['1986/1'],
            filterType: 'include'
          }, 'option name');
          that.headerFilterController.showHeaderFilterMenu(0);
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.deepEqual(that.columnsController.updateOptions[1].optionName, {
            filterValues: ['1986/1'],
            filterType: 'include'
          }, 'option name');
        });
        QUnit.test('Update when select all items', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.columns[0].filterValues = ['test1'];
          that.columns[0].filterType = 'exclude';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count list items');
          $($popupContent.find('.dx-list-select-all-checkbox')).trigger('dxclick');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: null,
            filterType: 'exclude'
          }, 'column options');
        });
        QUnit.test('Update when select all items with dataType date', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.items = [{
            Test1: new Date(1986, 0, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 4),
            Test2: 'test4'
          }, {
            Test1: new Date(1987, 3, 4),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $($popupContent.find('.dx-treeview-select-all-item')).trigger('dxclick');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: undefined,
            filterType: 'exclude'
          }, 'column options');
        });
        QUnit.test('Update when selected all items and column with filterValues', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].filterValues = ['test3'];
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count list items');
          $($popupContent.find('.dx-checkbox').eq(0)).trigger('dxclick');
          assert.ok($popupContent.find('.dx-checkbox').eq(0).hasClass('dx-checkbox-checked'), 'select all items');
          $($popupContent.find('.dx-checkbox').eq(2)).trigger('dxclick');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['test3'],
            filterType: 'exclude'
          }, 'option name');
          that.headerFilterController.showHeaderFilterMenu(0);
          $(that.headerFilterView.getPopupContainer().$content().parent().find('.dx-button').eq(0)).trigger('dxclick');
          assert.equal(that.columnsController.updateOptions[0].columnIndex, 0, 'column index');
          assert.deepEqual(that.columnsController.updateOptions[0].optionName, {
            filterValues: ['test3'],
            filterType: 'exclude'
          }, 'option name');
        });
        QUnit.test('Indicator state when there is filterValues in column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].filterValues = ['test3'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          var $headerFilter = that.columnHeadersView.element().find('td').first().find('.dx-header-filter');
          assert.equal($headerFilter.length, 1, 'have header filter');
          assert.ok(!$headerFilter.hasClass('dx-header-filter-empty'), 'has no class dx-header-filter-empty');
        });
        QUnit.test('Indicator state when there is no filterValues in column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          var $headerFilter = that.columnHeadersView.element().find('td').first().find('.dx-header-filter');
          assert.equal($headerFilter.length, 1, 'have header filter');
          assert.ok($headerFilter.hasClass('dx-header-filter-empty'), 'has no class dx-header-filter-empty');
        });
        QUnit.test('Indicator state when there is filterValues in the grouped column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.columns[0].filterValues = ['test3'];
          that.options.groupPanel = {visible: true};
          that.setupDataGrid();
          that.headerPanel.render(testElement);
          var $headerFilter = that.headerPanel.element().find('.dx-group-panel-item').first().find('.dx-header-filter');
          assert.equal($headerFilter.length, 1, 'have header filter');
          assert.ok(!$headerFilter.hasClass('dx-header-filter-empty'), 'has no class dx-header-filter-empty');
          assert.strictEqual($headerFilter.css('color'), $headerFilter.parent().css('color'), 'color of the header should be as parent color');
        });
        QUnit.test('Header filter popup should be shown on header filter icon click in groupPanel', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.columns[0].groupIndex = 0;
          that.columns[0].filterValues = ['test3'];
          that.options.groupPanel = {visible: true};
          that.setupDataGrid();
          that.headerPanel.render(testElement);
          that.headerFilterView.render(testElement);
          var $headerFilter = that.headerPanel.element().find('.dx-group-panel-item').first().find('.dx-header-filter');
          $($headerFilter).trigger('dxclick');
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'list items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 1, 'one selected list item');
        });
        QUnit.test('Header filter indicator should be shown for grouped column with showWhenGrouped', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.columns[0].showWhenGrouped = true;
          that.columns[0].filterValues = ['test3'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          var $headerFilter = that.columnHeadersView.element().find('td').first().find('.dx-header-filter');
          assert.equal($headerFilter.length, 1, 'header filter is shown');
          assert.ok(!$headerFilter.hasClass('dx-header-filter-empty'), 'has no class dx-header-filter-empty');
        });
        QUnit.test('Header filter popup should be shown on header filter icon click for column with showWhenGrouped', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }];
          that.columns[0].groupIndex = 0;
          that.columns[0].showWhenGrouped = true;
          that.columns[0].filterValues = ['test3'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          var $headerFilter = that.columnHeadersView.element().find('td').first().find('.dx-header-filter');
          $($headerFilter).trigger('dxclick');
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'list items count');
          assert.equal($popupContent.find('.dx-list-item-selected').length, 1, 'one selected list item');
        });
        QUnit.test('Indicator state when there is no filterValues in the grouped column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.options.groupPanel = {visible: true};
          that.setupDataGrid();
          that.headerPanel.render(testElement);
          var $headerFilter = that.headerPanel.element().find('.dx-group-panel-item').first().find('.dx-header-filter');
          assert.equal($headerFilter.length, 1, 'have header filter');
          assert.ok($headerFilter.hasClass('dx-header-filter-empty'), 'has no class dx-header-filter-empty');
          assert.notStrictEqual($headerFilter.css('color'), $headerFilter.parent().css('color'), 'color of the header filter should hava alpha');
        });
        QUnit.test('Show header filter with set a custom width and height by column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].headerFilter = {
            width: 400,
            height: 500
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContainer = that.headerFilterView.getPopupContainer().$overlayContent();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContainer.is(':visible'), 'visible popup');
          assert.equal($popupContainer[0].offsetWidth, 400, 'width popup');
          assert.equal($popupContainer[0].offsetHeight, 500, 'height popup');
        });
        QUnit.test('Save size of the header filter after resize', function(assert) {
          var that = this;
          var $popupContainer;
          var testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          that.clock.tick(500);
          $popupContainer = that.headerFilterView.getPopupContainer().$overlayContent();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContainer.is(':visible'), 'visible popup');
          assert.equal($popupContainer[0].offsetWidth, 250, 'width popup');
          assert.equal($popupContainer[0].offsetHeight, 300, 'height popup');
          that.headerFilterView.getPopupContainer().option({
            width: 400,
            height: 500
          });
          $($popupContainer.find('.dx-resizable-handle-corner-bottom-right')).trigger(dragEvents.end);
          that.headerFilterController.hideHeaderFilterMenu();
          that.clock.tick(500);
          assert.ok(!$('body').children('.dx-header-filter-menu').length, 'not has wrapper header filter menu');
          assert.ok(!$popupContainer.is(':visible'), 'not visible popup');
          assert.deepEqual(that.columnsController.updateOptions[1].optionValue, {
            width: 400,
            height: 500
          }, 'header filter by column');
          that.headerFilterController.showHeaderFilterMenu(0);
          $popupContainer = that.headerFilterView.getPopupContainer().$overlayContent();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContainer.is(':visible'), 'visible popup');
          assert.equal($popupContainer[0].offsetWidth, 400, 'width popup');
          assert.equal($popupContainer[0].offsetHeight, 500, 'height popup');
        });
        QUnit.test('Invalidate instead of render for headerFilter options', function(assert) {
          var renderCounter = 0;
          var testElement = $('#container');
          this.setupDataGrid();
          this.columnHeadersView.render(testElement);
          this.columnHeadersView.renderCompleted.add(function() {
            renderCounter++;
          });
          this.columnHeadersView.component.isReady = function() {
            return true;
          };
          this.columnHeadersView.beginUpdate();
          this.columnHeadersView.optionChanged({name: 'headerFilter'});
          this.columnHeadersView.optionChanged({name: 'headerFilter'});
          this.columnHeadersView.optionChanged({name: 'headerFilter'});
          this.columnHeadersView.endUpdate();
          assert.equal(renderCounter, 1, 'count of rendering');
        });
        QUnit.test('Checking filterValues of the column after deselect item of a loaded page when there is selected item of an unloaded page', function(assert) {
          var $testElement = $('#container');
          this.generateItems(30);
          this.columns[0].filterValues = ['test01', 'test30'];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = this.headerFilterView.getPopupContainer().$content();
          $($popupContent.find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-select-all-checkbox').hasClass('dx-checkbox-indeterminate'), 'checkbox in an indeterminate state');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          this.clock.tick(500);
          assert.deepEqual(this.columns[0].filterValues, ['test30'], 'filterValues');
        });
        QUnit.test('Show header filter with search bar', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.options.headerFilter.search.timeout = 300;
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          assert.ok(list.option('searchEnabled'), 'list with search bar');
          assert.ok($.isFunction(list.option('searchExpr')), 'expr is correct');
          assert.equal(list.option('searchTimeout'), 300, 'search timeout is assigned');
          assert.equal(list.option('searchMode'), 'contains', 'search mode is default');
        });
        QUnit.test('Test aria-label in search-box input (T829760)', function(assert) {
          var searchBoxWrapper = new ListSearchBoxWrapper('.dx-header-filter-menu');
          var testElement = $('#container');
          this.options.headerFilter.search.enabled = true;
          this.setupDataGrid();
          this.columnHeadersView.render(testElement);
          this.headerFilterView.render(testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          assert.strictEqual(searchBoxWrapper.getEditorInput().attr('aria-label'), messageLocalization.format('Search'), 'Search box input aria-label attribute');
        });
        QUnit.test('Show header filter with search bar with search.mode equals', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.options.headerFilter.search.timeout = 300;
          that.columns[0].headerFilter = {search: {mode: 'equals'}};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          assert.ok(list.option('searchEnabled'), 'list with search bar');
          assert.ok($.isFunction(list.option('searchExpr')), 'expr is correct');
          assert.equal(list.option('searchTimeout'), 300, 'search timeout is assigned');
          assert.equal(list.option('searchMode'), 'equals', 'search mode is assigned');
        });
        QUnit.test('Show header filter when column with dataType date with search bar', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.options.headerFilter.search.timeout = 300;
          that.columns[0].dataType = 'date';
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var treeView = that.getListOrTreeView();
          assert.ok(treeView.option('searchEnabled'), 'treeView with search bar');
          assert.equal(treeView.option('searchTimeout'), 300, 'search timeout is assigned');
          assert.equal(treeView.option('searchMode'), 'contains', 'search mode is default');
        });
        QUnit.test('HeaderFilter should be without search bar when column search.enabled is disabled', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.columns[0].headerFilter = {search: {enabled: false}};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          assert.notOk(list.option('searchEnabled'), 'list without search bar');
        });
        [true, false, undefined].forEach(function(hideSelectAllOnSearch) {
          QUnit.test(("Check select all state after search if hideSelectAllOnSearch is " + hideSelectAllOnSearch), function(assert) {
            var that = this;
            var testElement = $('#container');
            that.options.headerFilter.search.enabled = true;
            that.options.headerFilter.hideSelectAllOnSearch = hideSelectAllOnSearch;
            that.items = [{
              Test1: 'test1',
              Test2: 'test2'
            }, {
              Test1: 'test3',
              Test2: 'test4'
            }];
            that.setupDataGrid();
            that.columnHeadersView.render(testElement);
            that.headerFilterView.render(testElement);
            that.headerFilterController.showHeaderFilterMenu(0);
            var list = that.getListOrTreeView();
            var $popupContent = that.headerFilterView.getPopupContainer().$content();
            assert.ok(list.$element().find('.dx-list-select-all-checkbox').is(':visible'), 'selectAll is visible');
            list.option('searchValue', '3');
            if (hideSelectAllOnSearch !== false) {
              assert.notOk(list.$element().find('.dx-list-select-all-checkbox').is(':visible'), 'selectAll is hidden visible');
            } else {
              assert.ok(list.$element().find('.dx-list-select-all-checkbox').is(':visible'), 'selectAll is visible');
              var $selectAll = list.$element().find('.dx-list-select-all-checkbox');
              $($selectAll).trigger('dxclick');
              $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
              var selectAll = $selectAll.dxCheckBox('instance');
              var column = that.columnsController.getVisibleColumns()[0];
              assert.equal(selectAll.option('value'), true, 'select all has correct state');
              assert.deepEqual(column.filterValues, ['test3'], 'filterValue is correct');
              assert.notEqual(column.filterType, 'exclude', 'filterType is correct');
            }
          });
          QUnit.test(("Check select all state after search if column dataType is date if hideSelectAllOnSearch is " + hideSelectAllOnSearch), function(assert) {
            var that = this;
            var testElement = $('#container');
            that.options.headerFilter.search.enabled = true;
            that.options.headerFilter.hideSelectAllOnSearch = hideSelectAllOnSearch;
            that.columns[0].dataType = 'date';
            that.items = [{
              Test1: new Date(1986, 0, 1),
              Test2: 'test2'
            }, {
              Test1: new Date(1986, 0, 4),
              Test2: 'test4'
            }, {
              Test1: null,
              Test2: 'test6'
            }];
            that.setupDataGrid();
            that.columnHeadersView.render(testElement);
            that.headerFilterView.render(testElement);
            that.headerFilterController.showHeaderFilterMenu(0);
            var treeView = that.getListOrTreeView();
            var $popupContent = that.headerFilterView.getPopupContainer().$content();
            assert.ok(treeView.$element().find('.dx-treeview-select-all-item').is(':visible'), 'select all is visible');
            treeView.option('searchValue', '4');
            if (hideSelectAllOnSearch !== false) {
              assert.notOk(treeView.$element().find('.dx-treeview-select-all-item').is(':visible'), 'select all is not visible');
            } else {
              assert.ok(treeView.$element().find('.dx-treeview-select-all-item').is(':visible'), 'select all is visible');
              var $selectAll = treeView.$element().find('.dx-treeview-select-all-item');
              $($selectAll).trigger('dxclick');
              $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
              var selectAll = $selectAll.dxCheckBox('instance');
              var column = that.columnsController.getVisibleColumns()[0];
              assert.equal(selectAll.option('value'), undefined, 'select all has correct state');
              assert.deepEqual(column.filterValues, ['1986/1/4'], 'filterValue is correct');
              assert.notEqual(column.filterType, 'exclude', 'filterType is correct');
            }
          });
        });
        QUnit.test('Check select all state after search and select if column dataType is date and search is by month', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.columns[0].dataType = 'date';
          that.items = [{
            Test1: new Date(1986, 2, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 1),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var treeView = that.getListOrTreeView();
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          treeView.option('searchValue', 'March');
          $(treeView.$element()).find('.dx-treeview-node').eq(0).children('.dx-checkbox').trigger('dxclick');
          assert.notOk(treeView.$element().find('.dx-treeview-select-all-item').is(':visible'), 'selectAll is not visible');
          treeView.option('searchValue', '');
          var $selectAll = treeView.$element().find('.dx-treeview-select-all-item');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          var column = that.columnsController.getVisibleColumns()[0];
          assert.ok(treeView.$element().find('.dx-treeview-select-all-item').is(':visible'), 'selectAll is visible');
          assert.equal($selectAll.dxCheckBox('instance').option('value'), undefined, 'select all has correct state');
          assert.deepEqual(column.filterValues, ['1986/3'], 'filterValue is correct');
          assert.notEqual(column.filterType, 'exclude', 'filterType is correct');
        });
        QUnit.test('Filtering by year should be applied after select all -> deselect all', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.options.headerFilter.search.enabled = true;
          that.items = [{
            Test1: new Date(1986, 2, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1987, 3, 1),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var treeView = that.getListOrTreeView();
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $selectAll = treeView.$element().find('.dx-treeview-select-all-item');
          $($selectAll).trigger('dxclick');
          $($selectAll).trigger('dxclick');
          treeView.option('searchValue', '1987');
          var $itemElements = $($popupContent.find('.dx-treeview-node'));
          assert.strictEqual($itemElements.length, 1, 'item count');
          $itemElements.first().children('.dx-checkbox').trigger('dxclick');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          var column = that.columnsController.getVisibleColumns()[0];
          assert.deepEqual(column.filterValues, [1987], 'filterValues is correct');
          assert.notEqual(column.filterType, 'include', 'filterType is correct');
        });
        QUnit.test('Filtering by month should be applied when there is a selected day in the month', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns[0].dataType = 'date';
          that.columns[0].filterValues = ['1986/4/1'];
          that.options.headerFilter.search.enabled = true;
          that.items = [{
            Test1: new Date(1986, 3, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 2),
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var treeView = that.getListOrTreeView();
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          treeView.option('searchValue', 'April');
          var $itemElements = $($popupContent.find('.dx-treeview-node'));
          assert.strictEqual($itemElements.length, 2, 'item count');
          $itemElements.eq(1).children('.dx-checkbox').trigger('dxclick');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          var column = that.columnsController.getVisibleColumns()[0];
          assert.deepEqual(column.filterValues, ['1986/4'], 'filterValues is correct');
          assert.notEqual(column.filterType, 'include', 'filterType is correct');
        });
        QUnit.test('Check search in column lookup with simple types', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].lookup = {dataSource: ['test1', 'test2', 'test3']};
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          assert.equal(list.option('selectionMode'), 'all', 'selectAll item is visible');
          list.option('searchValue', 't2');
          var listItems = list.$element().find('.dx-list-item');
          assert.equal(list.option('searchExpr'), 'this', 'searchExpr is correct');
          assert.equal(list.option('selectionMode'), 'multiple', 'selectAll item is hidden');
          assert.equal(listItems.length, 1, 'list item\'s count');
          assert.equal(listItems.text(), 'test2', 'correct item\'s text');
        });
        QUnit.test('Check filtering in column lookup with object types', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].lookup = {
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: [{
              value: 1,
              text: 'test1'
            }, {
              value: 2,
              text: 'test2'
            }, {
              value: 3,
              text: 'test3'
            }]
          };
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          list.option('searchValue', 't2');
          var listItems = list.$element().find('.dx-list-item');
          assert.equal(list.option('searchExpr'), 'text', 'searchExpr is correct');
          assert.equal(listItems.length, 1, 'list item\'s count');
          assert.equal(listItems.text(), 'test2', 'correct item\'s text');
        });
        QUnit.test('Search when custom dataSource to headerFilter is specified', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.columns[0].headerFilter = {dataSource: [{
              text: 'Test1',
              value: 1
            }, {
              text: 'Test2',
              value: 2
            }]};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          list.option('searchValue', 't2');
          var listItems = list.$element().find('.dx-list-item');
          assert.strictEqual(listItems.length, 1, 'list item\'s count');
          assert.strictEqual(listItems.text(), 'Test2', 'correct item\'s text');
        });
        QUnit.test('Search by custom column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.columns[0] = {
            selector: function(data) {
              return data.Test2;
            },
            calculateCellValue: function(data) {
              return data.Test2;
            }
          };
          that.items = [{
            Test1: 1,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          list.option('searchValue', 't2');
          var listItems = list.$element().find('.dx-list-item');
          assert.strictEqual(listItems.length, 1, 'list item\'s count');
          assert.strictEqual(listItems.text(), 'test2', 'correct item\'s text');
        });
        QUnit.test('Search by value from calculateCellValue', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.columns = [{
            dataField: 'Test1',
            selector: function(data) {
              return data.Test1;
            },
            calculateCellValue: function(data) {
              return data.Test2 + data.Test1;
            }
          }];
          that.items = [{
            Test1: 111,
            Test2: 'test2'
          }, {
            Test1: 2,
            Test2: 'test4'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          list.option('searchValue', 'test2111');
          var listItems = list.$element().find('.dx-list-item');
          assert.strictEqual(listItems.length, 1, 'list item\'s count');
          assert.strictEqual(listItems.text(), 'test2111', 'correct item\'s text');
        });
        QUnit.test('No exceptions on an attempt to filter a lookup column when valueExpr is not specified', function(assert) {
          try {
            var that = this;
            var $testElement = $('#container');
            var headerFilterDataSource = [{
              value: 1,
              text: 'test1'
            }, {
              value: 2,
              text: 'test2'
            }];
            that.columns[0].lookup = {
              displayExpr: 'text',
              dataSource: headerFilterDataSource
            };
            that.items = [{
              Test1: 1,
              Test2: 'test2'
            }, {
              Test1: 2,
              Test2: 'test4'
            }];
            that.setupDataGrid();
            that.columnHeadersView.render($testElement);
            that.headerFilterView.render($testElement);
            that.headerFilterController.showHeaderFilterMenu(0);
            assert.deepEqual(that.headerFilterView.getListComponent().option('items'), [{
              'text': '(Blanks)',
              'value': null
            }, {
              'text': 'test1',
              'value': headerFilterDataSource[0]
            }, {
              'text': 'test2',
              'value': headerFilterDataSource[1]
            }], 'list items');
            var $popupContent = that.headerFilterView.getPopupContainer().$content();
            $($popupContent.find('.dx-list-item').last()).trigger('dxclick');
            assert.ok($popupContent.find('.dx-list-item').last().find('.dx-checkbox-checked').length, 'checkbox checked');
          } catch (e) {
            assert.ok(false, 'the error is thrown');
          }
        });
        QUnit.testInActiveWindow('No scroll on opening the header filter when the popup is cropped', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'focus is disabled for not desktop devices');
            return;
          }
          var that = this;
          var $popupContent;
          var viewPort = viewPortUtils.value();
          var $testElement = $('#container').wrap($('<div/>').css({
            position: 'absolute',
            width: '100%',
            height: '300px',
            overflowY: 'scroll',
            top: 10000,
            left: 10000
          }));
          fx.off = true;
          viewPortUtils.value($testElement.parent());
          try {
            that.items = [{
              Test1: 'test1',
              Test2: 'test2'
            }, {
              Test1: 'test3',
              Test2: 'test4'
            }];
            that.setupDataGrid();
            that.columnHeadersView.render($testElement);
            that.headerFilterView.render($testElement);
            assert.equal($testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
            that.headerFilterController.showHeaderFilterMenu(0);
            that.clock.tick(10);
            $popupContent = that.headerFilterView.getPopupContainer().$content();
            assert.strictEqual($testElement.parent().scrollTop(), 0, 'scrollTop');
            assert.ok($popupContent.is(':visible'), 'visible popup');
            assert.ok($popupContent.find('.dx-list-select-all').first().hasClass('dx-state-focused'));
          } finally {
            fx.off = false;
            viewPortUtils.value(viewPort);
          }
        });
        QUnit.test('Checks whether the SelectAll checkbox is deselected when all filter items are deselected (T875471)', function(assert) {
          var $testElement = $('#container');
          this.generateItems(3);
          this.columns[0].filterValues = [];
          this.columns[0].filterType = 'exclude';
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = this.headerFilterView.getPopupContainer().$content();
          var $selectAll = $popupContent.find('.dx-list-select-all-checkbox');
          var $items = $popupContent.find('.dx-list-item');
          assert.ok($selectAll.hasClass('dx-checkbox-checked'), 'selectAll is checked');
          assert.equal($items.length, 3);
          $($items.eq(0)).trigger('dxclick');
          assert.ok($selectAll.hasClass('dx-checkbox-indeterminate'), 'selectAll is in the indeterminate state');
          $($items.eq(1)).trigger('dxclick');
          $($items.eq(2)).trigger('dxclick');
          assert.notOk($selectAll.hasClass('dx-checkbox-indeterminate'), 'selectAll is not in the indeterminate state');
          assert.notOk($selectAll.hasClass('dx-checkbox-checked'), 'selectAll is not checked');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          this.clock.tick(500);
          assert.notOk(this.columns[0].filterValues, 'filterValues not defined');
        });
        QUnit.test('allowSelectAll option should work', function(assert) {
          var $__3 = this;
          var $testElement = $('#container');
          this.columns[0].dataType = 'date';
          this.columns[0].filterValues = ['1986/4/1', '2004/5/30'];
          this.items = [{
            Test1: new Date(1986, 3, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(1986, 3, 2),
            Test2: 'test4'
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          var isAllowSelectAllShown = function(columnIndex) {
            $__3.headerFilterController.showHeaderFilterMenu(columnIndex);
            var $popupContent = $__3.headerFilterView.getPopupContainer().$content();
            var $selectAll = $popupContent.find('.dx-list-select-all-checkbox, .dx-treeview-select-all-item');
            return !!$selectAll.length;
          };
          this.option('headerFilter.allowSelectAll', false);
          assert.notOk(isAllowSelectAllShown(0), 'select all checkbox should not be shown at column 0');
          assert.notOk(isAllowSelectAllShown(1), 'select all checkbox should not be shown at column 1');
          this.option('headerFilter.allowSelectAll', true);
          assert.ok(isAllowSelectAllShown(0), 'select all checkbox should be shown at column 0');
          assert.ok(isAllowSelectAllShown(1), 'select all checkbox should be shown at column 1');
        });
        QUnit.test('headerFilter.search.editorOptions option should work', function(assert) {
          var $testElement = $('#container');
          this.columns[0].dataType = 'date';
          this.columns[0].filterValues = ['1986/4/1', '2004/5/30'];
          this.columns[0].headerFilter = this.columns[1].headerFilter = {search: {
              enabled: true,
              editorOptions: {placeholder: 'column.headerFilter.placeholder'}
            }};
          this.options.headerFilter.search.enabled = true;
          this.options.headerFilter.search.editorOptions = {
            placeholder: 'headerFilter.placeholder',
            name: 'headerFilter.name'
          };
          this.items = [{
            Test1: new Date(1986, 3, 1),
            Test2: 'test2'
          }, {
            Test1: new Date(2004, 5, 30),
            Test2: 'test4'
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          var getTextBoxOptions = function() {
            return $('.dx-textbox').dxTextBox('instance').option();
          };
          this.headerFilterController.showHeaderFilterMenu(0);
          assert.strictEqual(getTextBoxOptions().name, 'headerFilter.name', 'value should be from generic headerFilter');
          assert.strictEqual(getTextBoxOptions().placeholder, 'column.headerFilter.placeholder', 'value should be from column headerFilter');
          this.headerFilterController.showHeaderFilterMenu(1);
          assert.strictEqual(getTextBoxOptions().name, 'headerFilter.name', 'value should be from generic headerFilter');
          assert.strictEqual(getTextBoxOptions().placeholder, 'column.headerFilter.placeholder', 'value should be from column headerFilter');
        });
      });
      QUnit.module('Header Filter with real columnsController', {
        beforeEach: function() {
          this.items = [{
            Test1: 'value1',
            Test2: 'value2'
          }, {
            Test1: 'value3',
            Test2: 'value4'
          }];
          this.options = {
            columns: [{
              dataField: 'Test1',
              allowHeaderFiltering: true
            }, {
              dataField: 'Test2',
              allowHeaderFiltering: true
            }],
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            headerFilter: {
              allowSelectAll: true,
              visible: true,
              width: 250,
              height: 300,
              search: {
                enabled: false,
                timeout: 500,
                mode: 'contains',
                editorOptions: {}
              },
              texts: {
                ok: 'Ok',
                cancel: 'Cancel',
                emptyValue: '(Blanks)'
              }
            },
            showColumnHeaders: true
          };
          this.setupDataGrid = function(options) {
            setupDataGridModules(this, ['columns', 'data', 'columnHeaders', 'filterRow', 'headerFilter', 'editorFactory', 'summary'], {
              initViews: true,
              controllers: options && options.controllers || {}
            });
          };
          this.getListOrTreeView = getListOrTreeView.bind(this);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.headerFilterController.hideHeaderFilterMenu();
          this.dispose();
        }
      }, function() {
        QUnit.test('Load data', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.setupDataGrid({controllers: {data: new MockDataController({items: that.items})}});
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($('body').children('.dx-header-filter-menu').length, 1, 'has wrapper header filter menu');
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'has list item in header filter menu');
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), 'value1', 'text list item');
        });
        QUnit.test('combined filter when filterValues defined', function(assert) {
          var that = this;
          that.options.columns = [{
            dataField: 'column1',
            filterValues: [1, 2, 3],
            allowHeaderFiltering: true
          }, {
            dataField: 'column2',
            filterValues: [1, 2, 3],
            filterType: 'exclude',
            allowHeaderFiltering: true
          }];
          that.options.dataSource = {
            load: function() {
              return [];
            },
            totalCount: function() {
              return 0;
            }
          };
          that.setupDataGrid();
          assert.deepEqual(that.getCombinedFilter(), [[['column1', '=', 1], 'or', ['column1', '=', 2], 'or', ['column1', '=', 3]], 'and', ['!', [['column2', '=', 1], 'or', ['column2', '=', 2], 'or', ['column2', '=', 3]]]]);
        });
        QUnit.test('Apply header filter after refresh grid', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.options.columns = [{
            dataField: 'column1',
            filterValues: [2],
            allowFiltering: true
          }];
          that.options.dataSource = {
            load: function() {
              return [{column1: 1}, {column1: 2}, {column1: 3}, {column1: 4}, {column1: 5}];
            },
            totalCount: function() {
              return 5;
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          assert.deepEqual(that.getCombinedFilter(), ['column1', '=', 2], 'combined filter');
          that.headerFilterController.showHeaderFilterMenu(0);
          that.headerFilterController.hideHeaderFilterMenu();
          that.refresh();
          assert.deepEqual(that.getCombinedFilter(), ['column1', '=', 2], 'combined filter after refresh grid');
        });
        QUnit.test('Header filter with items when column with filterValues', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns[0].filterValues = ['test3'];
          that.options.columns[1].filterValues = ['test2', 'test4'];
          that.options.dataSource = [{
            Test1: 'test1',
            Test2: 'test2'
          }, {
            Test1: 'test3',
            Test2: 'test4'
          }, {
            Test1: 'test5',
            Test2: 'test6'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listElements = $popupContent.find('.dx-list-item');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($listElements.length, 2, 'count list items');
          assert.strictEqual($listElements.first().text(), 'test1', 'text of the first item');
          assert.strictEqual($listElements.last().text(), 'test3', 'text of the second item');
          assert.ok($listElements.last().hasClass('dx-list-item-selected'), 'selected second item');
          assert.ok($listElements.last().find('.dx-checkbox-checked').length, 'checked checkbox in second item');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'count checked checkboxes');
        });
        QUnit.test('Header filter with filter row and apply filter button', function(assert) {
          var that = this;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.filterRow = {
            visible: true,
            applyFilter: 'onClick'
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $($popupContent.find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
        });
        QUnit.test('Header filter when set format by column', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 12,
            Test2: 'value1'
          }, {
            Test1: 6,
            Test2: 'value2'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            format: 'currency'
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), '$6', 'item text');
          assert.strictEqual($popupContent.find('.dx-list-item').last().text(), '$12', 'item text');
        });
        QUnit.test('Filtering by empty null value', function(assert) {
          var that = this;
          var items;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: null,
            Test2: 'value1'
          }, {
            Test1: 6,
            Test2: 'value2'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            dataType: 'number',
            allowHeaderFiltering: true
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          items = that.dataController.items();
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          assert.equal(items.length, 2, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: null,
            Test2: 'value1'
          }, 'data of the first item');
          assert.deepEqual(items[1].data, {
            Test1: 6,
            Test2: 'value2'
          }, 'data of the second item');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), '(Blanks)', 'empty text item');
          $($popupContent.parent().find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          items = that.dataController.items();
          assert.equal(items.length, 1, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: null,
            Test2: 'value1'
          }, 'data of the first item');
        });
        QUnit.test('Filtering by empty undefined value', function(assert) {
          var that = this;
          var items;
          var testElement = $('#container');
          that.options.dataSource = [{Test2: 'value1'}, {
            Test1: 6,
            Test2: 'value2'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            dataType: 'number',
            allowHeaderFiltering: true
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          items = that.dataController.items();
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          assert.equal(items.length, 2, 'count items');
          assert.deepEqual(items[0].data, {Test2: 'value1'}, 'data of the first item');
          assert.deepEqual(items[1].data, {
            Test1: 6,
            Test2: 'value2'
          }, 'data of the second item');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), '(Blanks)', 'empty text item');
          $($popupContent.parent().find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          items = that.dataController.items();
          assert.equal(items.length, 1, 'count items');
          assert.deepEqual(items[0].data, {Test2: 'value1'}, 'data of the first item');
        });
        QUnit.test('Filtering by empty string', function(assert) {
          var that = this;
          var items;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: '',
            Test2: 'value1'
          }, {
            Test1: null,
            Test2: 'value2'
          }, {
            Test1: 'value3',
            Test2: 'value4'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          items = that.dataController.items();
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          assert.equal(items.length, 3, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: '',
            Test2: 'value1'
          }, 'data of the first item');
          assert.deepEqual(items[1].data, {
            Test1: null,
            Test2: 'value2'
          }, 'data of the second item');
          assert.deepEqual(items[2].data, {
            Test1: 'value3',
            Test2: 'value4'
          }, 'data of the third item');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count item');
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), '(Blanks)', 'empty text item');
          $($popupContent.parent().find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          items = that.dataController.items();
          assert.equal(items.length, 2, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: '',
            Test2: 'value1'
          }, 'data of the first item');
          assert.deepEqual(items[1].data, {
            Test1: null,
            Test2: 'value2'
          }, 'data of the second item');
        });
        QUnit.test('Filtering by empty string with filterType is exclude', function(assert) {
          var that = this;
          var items;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: '',
            Test2: 'value1'
          }, {
            Test1: null,
            Test2: 'value2'
          }, {
            Test1: 'value3',
            Test2: 'value4'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            filterType: 'exclude'
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          items = that.dataController.items();
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          assert.equal(items.length, 3, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: '',
            Test2: 'value1'
          }, 'data of the first item');
          assert.deepEqual(items[1].data, {
            Test1: null,
            Test2: 'value2'
          }, 'data of the second item');
          assert.deepEqual(items[2].data, {
            Test1: 'value3',
            Test2: 'value4'
          }, 'data of the third item');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.equal($popupContent.find('.dx-list-item').length, 2, 'count item');
          assert.strictEqual($popupContent.find('.dx-list-item').first().text(), '(Blanks)', 'empty text item');
          $($popupContent.parent().find('.dx-list-item').first()).trigger('dxclick');
          assert.ok(!$popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          items = that.dataController.items();
          assert.equal(items.length, 1, 'count items');
          assert.deepEqual(items[0].data, {
            Test1: 'value3',
            Test2: 'value4'
          }, 'data of the first item');
        });
        QUnit.test('Header Filter when grid with CustomStore', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          that.options.dataSource = {
            filter: ['Test1', '<>', 'value14'],
            load: function(options) {
              loadArgs.push(options);
              return $.Deferred().resolve([{
                Test1: 'value11',
                Test2: 'value21'
              }, {
                Test1: 'value13',
                Test2: 'value22'
              }, {
                Test1: 'value13',
                Test2: 'value23'
              }], {totalCount: 3});
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').length, 2, 'header items count');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), 'value11', 'item 1 text');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'value13', 'item 2 text');
          assert.strictEqual(loadArgs.length, 2, 'load count');
          assert.deepEqual(loadArgs[1].filter, ['Test1', '<>', 'value14'], 'header filter load filter');
          assert.deepEqual(loadArgs[1].group, undefined, 'header filter load group');
        });
        QUnit.test('Header Filter when grid with CustomStore when remoteOperations false', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          that.options.remoteOperations = false;
          that.options.dataSource = {
            filter: ['Test1', '<>', 'value14'],
            load: function(options) {
              loadArgs.push(options);
              return $.Deferred().resolve([{
                Test1: 'value11',
                Test2: 'value21'
              }, {
                Test1: 'value13',
                Test2: 'value22'
              }, {
                Test1: 'value13',
                Test2: 'value23'
              }, {
                Test1: 'value14',
                Test2: 'value24'
              }]);
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').length, 2, 'header items count. value14 is filtered locally');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), 'value11', 'item 1 text');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'value13', 'item 2 text');
          assert.strictEqual(loadArgs.length, 1, 'load count');
        });
        QUnit.test('Header filter with search bar if remote filtering and local grouping', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.headerFilter.search.enabled = true;
          that.options.remoteOperations = {
            sorting: true,
            filtering: true,
            paging: true
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var list = that.getListOrTreeView();
          assert.ok(list.option('searchEnabled'), 'list with search bar');
          assert.equal(list.option('searchExpr'), 'Test1', 'searchExpr is correct');
        });
        QUnit.test('Header Filter when grid with CustomStore when remote grouping and remote summary', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          that.options.remoteOperations = true;
          that.options.summary = {
            groupItems: [{summaryType: 'count'}],
            totalItems: [{summaryType: 'count'}]
          };
          that.options.dataSource = {
            filter: ['Test1', '<>', 'value14'],
            load: function(options) {
              loadArgs.push(options);
              if (options.group) {
                return $.Deferred().resolve([{
                  key: 'value11',
                  items: null
                }, {
                  key: 'value13',
                  items: null
                }]);
              } else {
                return $.Deferred().resolve([{
                  Test1: 'value11',
                  Test2: 'value21'
                }, {
                  Test1: 'value13',
                  Test2: 'value22'
                }, {
                  Test1: 'value13',
                  Test2: 'value23'
                }], {totalCount: 3});
              }
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').length, 2, 'header items count. value14 is filtered locally');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), 'value11', 'item 1 text');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'value13', 'item 2 text');
          assert.strictEqual(loadArgs.length, 2, 'load count');
          assert.deepEqual(loadArgs[1].filter, ['Test1', '<>', 'value14'], 'header filter load filter');
          assert.deepEqual(loadArgs[1].filter, ['Test1', '<>', 'value14'], 'header filter load filter');
          assert.deepEqual(loadArgs[1].group, [{
            selector: 'Test1',
            isExpanded: false
          }], 'header filter load group');
          assert.deepEqual(loadArgs[1].skip, 0, 'header filter load skip');
          assert.deepEqual(loadArgs[1].take, 20, 'header filter load take');
          assert.deepEqual(loadArgs[0].groupSummary, undefined, 'initial load groupSummary');
          assert.deepEqual(loadArgs[0].totalSummary, [{
            selector: undefined,
            summaryType: 'count'
          }], 'initial load totalSummary');
          assert.deepEqual(loadArgs[1].groupSummary, undefined, 'header filter  load groupSummary');
          assert.deepEqual(loadArgs[1].totalSummary, undefined, 'header filter  load totalSummary');
        });
        QUnit.test('Header Filter when grid with CustomStore when remote grouping and groupInterval defined', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          that.options.remoteOperations = true;
          that.options.columns[0].headerFilter = {groupInterval: 10};
          that.options.dataSource = {load: function(options) {
              loadArgs.push(options);
              if (options.group) {
                return $.Deferred().resolve([{
                  key: 0,
                  items: null
                }]);
              } else {
                return $.Deferred().resolve([{
                  Test1: 0,
                  Test2: 'value21'
                }, {
                  Test1: 1,
                  Test2: 'value22'
                }, {
                  Test1: 2,
                  Test2: 'value23'
                }], {totalCount: 3});
              }
            }};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').length, 1, 'header items count');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), '0 - 10', 'item 1 text');
          assert.strictEqual(loadArgs.length, 2, 'load count');
          assert.deepEqual(loadArgs[1].group, [{
            selector: 'Test1',
            groupInterval: 10,
            isExpanded: false
          }], 'header filter load group');
          assert.deepEqual(loadArgs[1].skip, 0, 'header filter load skip');
          assert.deepEqual(loadArgs[1].take, 20, 'header filter load take');
        });
        QUnit.test('Header Filter when grid with CustomStore when remote grouping and groupInterval defined as array', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          that.options.remoteOperations = true;
          that.options.columns[0].headerFilter = {groupInterval: [100, 10]};
          that.options.dataSource = {load: function(options) {
              loadArgs.push(options);
              if (options.group) {
                return $.Deferred().resolve([{
                  key: 0,
                  items: {
                    key: 0,
                    items: null
                  }
                }]);
              } else {
                return $.Deferred().resolve([{
                  Test1: 0,
                  Test2: 'value21'
                }, {
                  Test1: 1,
                  Test2: 'value22'
                }, {
                  Test1: 2,
                  Test2: 'value23'
                }], {totalCount: 3});
              }
            }};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-treeview-item').length, 1, 'header items count');
          assert.strictEqual($popupContent.find('.dx-treeview-item').eq(0).text(), '0 - 100', 'item 1 text');
          assert.strictEqual(loadArgs.length, 2, 'load count');
          assert.deepEqual(loadArgs[1].group, [{
            selector: 'Test1',
            groupInterval: 100,
            isExpanded: true
          }, {
            selector: 'Test1',
            groupInterval: 10,
            isExpanded: false
          }], 'header filter load group');
          assert.deepEqual(loadArgs[1].skip, undefined, 'header filter load skip');
          assert.deepEqual(loadArgs[1].take, undefined, 'header filter load take');
        });
        QUnit.test('Header Filter when grid with ODataStore with expand', function(assert) {
          var that = this;
          var loadArgs = [];
          var testElement = $('#container');
          var store = new ODataStore({});
          store._loadImpl = function(options) {
            loadArgs.push(options);
            return $.Deferred().resolve([{
              Test1: 'value11',
              Test2: 'value21'
            }, {
              Test1: 'value13',
              Test2: 'value22'
            }, {
              Test1: 'value13',
              Test2: 'value23'
            }], {totalCount: 3});
          };
          that.options.dataSource = {
            filter: ['Test1', '<>', 'value14'],
            expand: 'expandTest',
            store: store
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.strictEqual($popupContent.find('.dx-list-item').length, 2, 'header items count');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(0).text(), 'value11', 'item 1 text');
          assert.strictEqual($popupContent.find('.dx-list-item').eq(1).text(), 'value13', 'item 2 text');
          assert.strictEqual(loadArgs.length, 2, 'load count');
          assert.deepEqual(loadArgs[1].filter, ['Test1', '<>', 'value14'], 'header filter load filter');
          assert.deepEqual(loadArgs[1].group, undefined, 'header filter load group');
          assert.deepEqual(loadArgs[1].expand, 'expandTest', 'expand option');
          assert.deepEqual(loadArgs[1].dataField, 'Test1', 'dataField option');
        });
        QUnit.test('Not update indicator state for column with allowHeaderFiltering is false', function(assert) {
          var that = this;
          var $cells;
          var testElement = $('#container');
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: false
          };
          that.setupDataGrid({controllers: {data: new MockDataController({items: that.items})}});
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          $cells = that.columnHeadersView.element().find('td');
          assert.equal($cells.length, 2, 'count columns');
          assert.ok(!$cells.first().find('.dx-header-filter').length, 'not has header filter in first column');
          assert.ok($cells.last().find('.dx-header-filter').length, 'has header filter in second column');
          assert.ok($cells.last().find('.dx-header-filter-empty').length, 'header filter is empty in second column');
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.columnsController.columnOption(1, {
            filterValues: ['value2'],
            filterType: 'include'
          });
          $cells = that.columnHeadersView.element().find('td');
          var columns = that.columnsController.getVisibleColumns();
          assert.deepEqual(columns[1].filterValues, ['value2'], 'filter values in second column');
          assert.ok(!$cells.first().find('.dx-header-filter').length, 'not has header filter in first column');
          assert.ok($cells.last().find('.dx-header-filter').length, 'has header filter in second column');
          assert.ok(!$cells.last().find('.dx-header-filter-empty').length, 'header filter is not empty in second column');
        });
        QUnit.test('Not show indicator when set filterValues for column and with headerFilter.visible is false', function(assert) {
          var that = this;
          var $cells;
          var testElement = $('#container');
          that.options.headerFilter.visible = false;
          that.setupDataGrid({controllers: {data: new MockDataController({items: that.items})}});
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          $cells = that.columnHeadersView.element().find('td');
          assert.equal($cells.length, 2, 'count columns');
          assert.ok(!$cells.first().find('.dx-header-filter').length, 'not has header filter in first column');
          assert.ok(!$cells.last().find('.dx-header-filter').length, 'not has header filter in second column');
          that.columnsController.columnOption(1, {
            filterValues: ['value2'],
            filterType: 'include'
          });
          $cells = that.columnHeadersView.element().find('td');
          var columns = that.columnsController.getVisibleColumns();
          assert.deepEqual(columns[1].filterValues, ['value2'], 'filter values in second column');
          assert.ok(!$cells.first().find('.dx-header-filter').length, 'not has header filter in first column');
          assert.ok(!$cells.last().find('.dx-header-filter').length, 'not has header filter in second column');
        });
        QUnit.test('Header Filter with CustomStore', function(assert) {
          var that = this;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: [{
                value: 'value1',
                text: 'Value1'
              }, {
                value: 'value2',
                text: 'Value2'
              }]}
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.first().text(), 'Value1', 'text of the first item');
          assert.strictEqual($listItems.last().text(), 'Value2', 'text of the second item');
          $($listItems.last()).trigger('dxclick');
          assert.ok($listItems.last().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['value2'], 'filter values of the first column');
        });
        QUnit.test('Header Filter - customStore value with filter data options', function(assert) {
          var that = this;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: [{
                value: ['Test1', '=', 'value1'],
                text: 'Value1'
              }, {
                value: 'value2',
                text: 'Value2'
              }]}
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.first().text(), 'Value1', 'text of the first item');
          assert.strictEqual($listItems.last().text(), 'Value2', 'text of the second item');
          $($listItems.first()).trigger('dxclick');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, [['Test1', '=', 'value1']], 'filter values of the first column');
          assert.deepEqual(that.getCombinedFilter(), ['Test1', '=', 'value1'], 'filter of the grid');
        });
        QUnit.test('Header Filter - saving state when customStore value with filter data options', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: [{
                value: ['Test1', '=', 'value1'],
                text: 'Value1'
              }, {
                value: 'value2',
                text: 'Value2'
              }]},
            filterValues: [['Test1', '=', 'value1']]
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.first().text(), 'Value1', 'text of the first item');
          assert.strictEqual($listItems.last().text(), 'Value2', 'text of the second item');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
        });
        QUnit.test('Header Filter - customization dataSource via event', function(assert) {
          var that = this;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: function(options) {
                options.dataSource.postProcess = function(items) {
                  items.unshift({
                    value: 'test1',
                    text: 'Test1'
                  });
                  return items;
                };
              }}
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 3, 'count item');
          assert.strictEqual($listItems.eq(0).text(), 'Test1', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), 'value1', 'text of the second item');
          assert.strictEqual($listItems.eq(2).text(), 'value3', 'text of the third item');
          $($listItems.first()).trigger('dxclick');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['test1'], 'filter values of the first column');
        });
        QUnit.test('Header Filter (List) - saving state with changed dataSource via event', function(assert) {
          var that = this;
          var $listItems;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: function(options) {
                options.dataSource.postProcess = function(items) {
                  items.unshift({
                    value: 'test1',
                    text: 'Test1'
                  });
                  return items;
                };
              }}
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 3, 'count item');
          assert.strictEqual($listItems.eq(0).text(), 'Test1', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), 'value1', 'text of the second item');
          assert.strictEqual($listItems.eq(2).text(), 'value3', 'text of the third item');
          $($listItems.first()).trigger('dxclick');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['test1'], 'filter values of the first column');
          that.headerFilterController.showHeaderFilterMenu(0);
          $listItems = $popupContent.find('.dx-list-item');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
        });
        QUnit.test('Header Filter (TreeView) - saving state with changed dataSource via event', function(assert) {
          var that = this;
          var $treeViewItems;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: new Date(1993, 7, 6),
            Test2: 'value1'
          }, {
            Test1: new Date(1994, 2, 6),
            Test2: 'value2'
          }];
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: function(options) {
                options.dataSource.postProcess = function(items) {
                  items.unshift({
                    value: '1992',
                    text: '1992',
                    items: [{
                      value: '1992/8',
                      text: 'August',
                      items: [{
                        value: '1992/8/6',
                        text: 6
                      }, {
                        value: '1992/8/28',
                        text: 28
                      }]
                    }]
                  });
                  return items;
                };
              }}
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $treeViewItems = $popupContent.find('.dx-treeview-item');
          assert.equal($treeViewItems.length, 3, 'count item');
          assert.strictEqual($treeViewItems.eq(0).text(), '1992', 'text of the first item');
          assert.strictEqual($treeViewItems.eq(1).text(), '1993', 'text of the second item');
          assert.strictEqual($treeViewItems.eq(2).text(), '1994', 'text of the third item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').first()).trigger('dxclick');
          $treeViewItems = $popupContent.find('.dx-treeview-item');
          assert.equal($treeViewItems.length, 4, 'count item');
          assert.strictEqual($treeViewItems.eq(1).text(), 'August', 'text of the second item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').eq(1)).trigger('dxclick');
          $treeViewItems = $popupContent.find('.dx-treeview-item');
          assert.equal($treeViewItems.length, 6, 'count item');
          assert.strictEqual($treeViewItems.eq(2).text(), '6', 'text of the third item');
          assert.strictEqual($treeViewItems.eq(3).text(), '28', 'text of the fourth item');
          $($treeViewItems.eq(3).parent().find('.dx-checkbox')).trigger('dxclick');
          assert.ok($treeViewItems.eq(3).parent().find('.dx-checkbox').hasClass('dx-checkbox-checked'), 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['1992/8/28'], 'filter values of the first column');
          that.headerFilterController.showHeaderFilterMenu(0);
          $($popupContent.find('.dx-treeview-toggle-item-visibility').first()).trigger('dxclick');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').eq(1)).trigger('dxclick');
          $treeViewItems = $popupContent.find('.dx-treeview-item');
          assert.equal($treeViewItems.length, 6, 'count item');
          assert.ok($treeViewItems.eq(3).parent().find('.dx-checkbox').hasClass('dx-checkbox-checked'), 'checkbox checked');
        });
        QUnit.test('Header Filter with customize text', function(assert) {
          var that = this;
          var i = 1;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0].customizeText = function(options) {
            if (options.target === 'headerFilter') {
              options.valueText = 'Custom Text ' + i;
              i++;
            }
            return options.valueText;
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.eq(0).text(), 'Custom Text 1', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), 'Custom Text 2', 'text of the second item');
          $($listItems.first()).trigger('dxclick');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['value1'], 'filter values of the first column');
        });
        QUnit.test('Header Filter with customize text for column with dataType the date', function(assert) {
          var that = this;
          var i = 1;
          var $listItems;
          var applyFilterCallCount = 0;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: new Date(1992, 7, 6),
            Test2: 'value1'
          }, {
            Test1: new Date(1992, 2, 6),
            Test2: 'value2'
          }];
          that.options.columns[0].customizeText = function(options) {
            if (options.target === 'headerFilter' && options.groupInterval === 'month') {
              options.valueText = 'Custom Text ' + i;
              i++;
            }
            return options.valueText;
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.dataController._applyFilter = function() {
            applyFilterCallCount++;
          };
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($listItems.length, 1, 'count treeview item');
          assert.strictEqual($listItems.eq(0).text(), '1992', 'text of the first item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').first()).trigger('dxclick');
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($popupContent.find('.dx-treeview-node-container-opened').length, 1, 'treeview node container opened');
          assert.equal($listItems.length, 3, 'has treeview items');
          assert.strictEqual($listItems.eq(1).text(), 'Custom Text 1', 'text the nested treeview item');
          assert.strictEqual($listItems.eq(2).text(), 'Custom Text 2', 'text the nested treeview item');
          $($listItems.eq(1).parent().find('.dx-checkbox')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(applyFilterCallCount, 1, 'call applyFilter');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['1992/3'], 'filter values of the first column');
        });
        QUnit.test('Header Filter with calculateFilterExpression', function(assert) {
          var that = this;
          var i = 0;
          var testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0].calculateFilterExpression = function(filterValue, selectedFilterOperation, target) {
            if (target === 'headerFilter') {
              i++;
              return this.defaultCalculateFilterExpression('customFilterValue' + i, selectedFilterOperation, target);
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.eq(0).text(), 'value1', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), 'value3', 'text of the second item');
          $($listItems.last()).trigger('dxclick');
          assert.ok($listItems.last().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          var filter = that.getCombinedFilter();
          assert.strictEqual(filter[2], 'customFilterValue2', 'filter values of the first column');
        });
        QUnit.test('Apply header filter', function(assert) {
          var that = this;
          var countCallColumnsChanged = 0;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 'value1',
            Test2: 'value2'
          }, {
            Test1: 'value3',
            Test2: 'value4'
          }, {
            Test1: 'value5',
            Test2: 'value6'
          }];
          that.options.columns[0].filterValues = ['value1'];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          that.columnsController.columnsChanged.add(function() {
            countCallColumnsChanged++;
          });
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 3, 'count item');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          $($listItems.eq(1)).trigger('dxclick');
          assert.ok($listItems.eq(1).find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          assert.equal(countCallColumnsChanged, 1, 'count call columnsChanged');
        });
        QUnit.test('Header filter with group interval \'year\' for column with dataType \'date\'', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: new Date(1992, 7, 6),
            Test2: 'value1'
          }, {
            Test1: new Date(1997, 2, 6),
            Test2: 'value2'
          }];
          that.options.columns[0].headerFilter = {groupInterval: 'year'};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var listInstance = that.headerFilterView.getListComponent();
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal(listInstance.NAME, 'dxList', 'dxList');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.first().text(), '1992', 'text of the first item');
          assert.strictEqual($listItems.last().text(), '1997', 'text of the second item');
          $($listItems.eq(1)).trigger('dxclick');
          assert.ok($listItems.eq(1).find('.dx-checkbox-checked').length, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          var filter = that.getCombinedFilter();
          assert.equal(filter.length, 3, 'has filter');
          assert.deepEqual(filter[0][2], new Date(1997, 0, 1), 'first filter value');
          assert.deepEqual(filter[2][2], new Date(1998, 0, 1), 'second filter value');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, [1997], 'filter values of the first column');
        });
        QUnit.test('Header filter with group interval \'quarter\' for column with dataType \'date\'', function(assert) {
          var that = this;
          var $listItems;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: new Date(1992, 9, 6),
            Test2: 'value1'
          }, {
            Test1: new Date(1992, 4, 6),
            Test2: 'value2'
          }, {
            Test1: new Date(1992, 1, 6),
            Test2: 'value3'
          }, {
            Test1: new Date(1992, 2, 6),
            Test2: 'value4'
          }];
          that.options.columns[0].headerFilter = {groupInterval: 'quarter'};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($listItems.length, 1, 'count treeview item');
          assert.strictEqual($listItems.eq(0).text(), '1992', 'text of the first item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').first()).trigger('dxclick');
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($popupContent.find('.dx-treeview-node-container-opened').length, 1, 'treeview node container opened');
          assert.equal($listItems.length, 4, 'has treeview items');
          assert.strictEqual($listItems.eq(1).text(), 'Q1', 'text of the nested treeview item');
          assert.strictEqual($listItems.eq(2).text(), 'Q2', 'text of the nested treeview item');
          assert.strictEqual($listItems.eq(3).text(), 'Q4', 'text of the nested treeview item');
          $($listItems.eq(3).parent().find('.dx-checkbox')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          var filter = that.getCombinedFilter();
          assert.equal(filter.length, 3, 'has filter');
          assert.deepEqual(filter[0][2], new Date(1992, 9, 1), 'first filter value');
          assert.deepEqual(filter[2][2], new Date(1993, 0, 1), 'second filter value');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['1992/4'], 'filter values of the first column');
        });
        QUnit.test('Header filter with custom data source and group interval null for column with dataType \'date\'', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: new Date(1992, 7, 6),
            Test2: 'value1'
          }];
          that.options.columns[0].headerFilter = {
            groupInterval: null,
            dataSource: [{
              text: '2018-01',
              value: new Date(2018, 0, 1)
            }, {
              text: '2018-02',
              value: new Date(2018, 1, 1)
            }]
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var listInstance = that.headerFilterView.getListComponent();
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal(listInstance.NAME, 'dxList', 'dxList');
          assert.equal($listItems.length, 2, 'count item');
          assert.strictEqual($listItems.first().text(), '2018-01', 'text of the first item');
          assert.strictEqual($listItems.last().text(), '2018-02', 'text of the second item');
        });
        QUnit.test('Header filter with group interval for column with dataType \'number\'', function(assert) {
          var that = this;
          var $listItems;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 19,
            Test2: 'value1'
          }, {
            Test1: 200,
            Test2: 'value2'
          }, {
            Test1: 9,
            Test2: 'value3'
          }];
          that.options.columns[0].headerFilter = {groupInterval: [100, 10]};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($listItems.length, 2, 'count treeview item');
          assert.strictEqual($listItems.eq(0).text(), '0 - 100', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), '200 - 300', 'text of the first item');
          $($popupContent.find('.dx-treeview-toggle-item-visibility').first()).trigger('dxclick');
          $listItems = $popupContent.find('.dx-treeview-item');
          assert.equal($popupContent.find('.dx-treeview-node-container-opened').length, 1, 'treeview node container opened');
          assert.equal($listItems.length, 4, 'has treeview items');
          assert.strictEqual($listItems.eq(1).text(), '0 - 10', 'text of the nested treeview item');
          assert.strictEqual($listItems.eq(2).text(), '10 - 20', 'text of the nested treeview item');
          $($listItems.eq(2).parent().find('.dx-checkbox')).trigger('dxclick');
          assert.equal($popupContent.find('.dx-checkbox-checked').length, 1, 'checkbox checked');
          $($popupContent.parent().find('.dx-button').first()).trigger('dxclick');
          var filter = that.getCombinedFilter();
          assert.equal(filter.length, 3, 'has filter');
          assert.equal(filter[0][2], 10, 'first filter value');
          assert.equal(filter[2][2], 20, 'second filter value');
          assert.deepEqual(that.columnsController.getVisibleColumns()[0].filterValues, ['0/10'], 'filter values of the first column');
        });
        QUnit.test('Header filter with group interval for column with dataType \'number\' and format is \'currency\'', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 19,
            Test2: 'value1'
          }, {
            Test1: 200,
            Test2: 'value2'
          }, {
            Test1: 9,
            Test2: 'value3'
          }];
          that.options.columns[0].format = 'currency';
          that.options.columns[0].headerFilter = {groupInterval: 100};
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count treeview item');
          assert.strictEqual($listItems.eq(0).text(), '$0 - $100', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), '$200 - $300', 'text of the second item');
        });
        QUnit.test('HeaderFilter - customizeText with group interval for column with dataType \'number\' and format is \'currency\'', function(assert) {
          var that = this;
          var countCallCustomizeText = 0;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 19,
            Test2: 'value1'
          }, {
            Test1: 200,
            Test2: 'value2'
          }, {
            Test1: 9,
            Test2: 'value3'
          }];
          that.options.columns[0].format = 'currency';
          that.options.columns[0].headerFilter = {groupInterval: 100};
          that.options.columns[0].customizeText = function(options) {
            var result;
            if (options.target === 'headerFilter') {
              if (countCallCustomizeText === 0) {
                assert.equal(options.groupInterval, 100, 'groupInterval');
                assert.equal(options.value, 0, 'value of the first item');
                assert.strictEqual(options.valueText, '$0 - $100', 'value text of the first item');
                result = 'from $0 to $100';
              } else {
                assert.equal(options.groupInterval, 100, 'groupInterval');
                assert.equal(options.value, 200, 'value of the second item');
                assert.strictEqual(options.valueText, '$200 - $300', 'value text of the second item');
                result = 'from $200 to $300';
              }
            }
            countCallCustomizeText++;
            return result;
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 2, 'count treeview item');
          assert.equal(countCallCustomizeText, 2, 'count call customizeText');
          assert.strictEqual($listItems.eq(0).text(), 'from $0 to $100', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), 'from $200 to $300', 'text of the second item');
        });
        QUnit.test('Header filter should ignore calculateGroupValue column option', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.dataSource = [{
            Test1: 19,
            Test2: 'value1'
          }, {
            Test1: 200,
            Test2: 'value2'
          }, {
            Test1: 9,
            Test2: 'value3'
          }];
          that.options.columns[0].calculateGroupValue = function(data) {
            return data.Test2;
          };
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.headerFilterView.render(testElement);
          assert.equal(testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          var $listItems = $popupContent.find('.dx-list-item');
          assert.equal($listItems.length, 3, 'count treeview item');
          assert.strictEqual($listItems.eq(0).text(), '9', 'text of the first item');
          assert.strictEqual($listItems.eq(1).text(), '19', 'text of the second item');
          assert.strictEqual($listItems.eq(2).text(), '200', 'text of the third item');
        });
        QUnit.test('Proxy customQueryParams load parameter during headerFilter operation', function(assert) {
          var that = this;
          var loadOptions;
          that.options.dataSource = {
            store: {type: 'odata'},
            customQueryParams: {param: 'test'}
          };
          that.setupDataGrid();
          var column = that.columnsController.getVisibleColumns()[0];
          that.dataController.store().on('loading', function(options) {
            loadOptions = options;
          });
          that.headerFilterController.getDataSource(column).load({userData: {}});
          that.clock.tick(10);
          assert.deepEqual(loadOptions.customQueryParams, {param: 'test'}, 'custom query param');
        });
        QUnit.test('dataSource group parameter should contains compare option if column has sortingMethod callback', function(assert) {
          var that = this;
          var context;
          that.options.columns[0].sortingMethod = function(x, y) {
            context = this;
            return x - y;
          };
          that.options.dataSource = [];
          that.setupDataGrid();
          var column = that.columnsController.getVisibleColumns()[0];
          var dataSource = that.headerFilterController.getDataSource(column);
          that.clock.tick(10);
          assert.equal(dataSource.group.length, 1, 'one group parameter');
          assert.equal(dataSource.group[0].selector({Test1: 5}), 5, 'group selector');
          assert.equal(dataSource.group[0].compare(10, 1), 9, 'group compare');
          assert.equal(context.dataField, 'Test1', 'compare context');
        });
        QUnit.test('Not apply filter when selected all items', function(assert) {
          var that = this;
          var callApplyFilter;
          var $testElement = $('#container');
          that.options.dataSource = [{
            Test1: 'test1',
            Test2: 'test2'
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          that.dataController._applyFilter = function() {
            callApplyFilter = true;
          };
          that.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = that.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          assert.ok($popupContent.find('.dx-list').length, 'has list in header filter menu');
          assert.equal($popupContent.find('.dx-list-item').length, 1, 'count list items');
          $($popupContent.find('.dx-list-item').first()).trigger('dxclick');
          assert.ok($popupContent.find('.dx-list-item').first().find('.dx-checkbox-checked').length, 'checked checkbox in first item');
          $($popupContent.parent().find('.dx-button').eq(0)).trigger('dxclick');
          that.clock.tick(500);
          var column = that.columnsController.getVisibleColumns()[0];
          assert.ok(!$popupContent.is(':visible'), 'not visible popup');
          assert.ok(!callApplyFilter, 'not apply filter');
          assert.strictEqual(column.filterValues, null, 'filterValues of the first column');
          assert.strictEqual(column.filterType, 'exclude', 'filterType of the first column');
        });
        QUnit.test('Draw header filter indicator for band columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.options.dataSource = [{
            Column1: 12,
            Column2: 'value1',
            Column3: 'value2',
            Column4: 'value3',
            Column5: 'value4'
          }, {
            Column1: 6,
            Column2: 'value5',
            Column3: 'value6',
            Column4: 'value7',
            Column5: 'value8'
          }];
          that.options.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          var $cells = $testElement.find('td');
          assert.equal($cells.length, 7, 'count cell');
          assert.ok(!$cells.eq(0).find('.dx-header-filter').length, 'not has header filter indicator');
          assert.ok($cells.eq(1).find('.dx-header-filter').length, 'has header filter indicator');
          assert.ok(!$cells.eq(2).find('.dx-header-filter').length, 'not has header filter indicator');
          assert.ok($cells.eq(3).find('.dx-header-filter').length, 'has header filter indicator');
          assert.ok($cells.eq(4).find('.dx-header-filter').length, 'has header filter indicator');
          assert.ok($cells.eq(5).find('.dx-header-filter').length, 'has header filter indicator');
          assert.ok($cells.eq(6).find('.dx-header-filter').length, 'has header filter indicator');
        });
        QUnit.test('Load data for column with dataType is \'datetime\'', function(assert) {
          var items;
          var getTreeText = function(items) {
            var result = [];
            var item = items[0];
            while (item) {
              result.push(item.text);
              item = item.items && item.items[0];
            }
            return result;
          };
          this.options.dataSource = [{birthday: new Date(1992, 8, 6, 12, 13, 14)}];
          this.options.columns = [{
            dataField: 'birthday',
            dataType: 'datetime'
          }];
          this.setupDataGrid();
          var column = this.columnsController.getVisibleColumns()[0];
          var dataSourceOptions = this.headerFilterController.getDataSource(column);
          dataSourceOptions.load({group: dataSourceOptions.group}).done(function(data) {
            items = data;
          });
          this.clock.tick(10);
          assert.deepEqual(getTreeText(items), ['1992', 'September', '6', '12', '13'], 'loaded data');
        });
        [null, 'yyyy-MM-ddTHH:mm:ssZ', 'yyyy-MM-ddTHH:mm:ss\'Z\'', 'yyyy-MM-dd HH:mm:ss'].forEach(function(dateSerializationFormat) {
          [false, true].forEach(function(remoteOperations) {
            QUnit.test(("Load data for column with dataType is 'datetime' if remoteOperations is enabled and dates are formatted in UTC (dateSerializationFormat=" + dateSerializationFormat + ", remoteOperations=" + remoteOperations + ") (T1029128, T1051815)"), function(assert) {
              var items;
              var getTreeText = function(items) {
                var result = [];
                var item = items[0];
                while (item) {
                  result.push(item.text);
                  item = item.items && item.items[0];
                }
                return result;
              };
              var loadArgs = [];
              var date = new Date(2021, 3, 26, 16, 30);
              this.options.columns = [{
                dataField: 'birthday',
                dataType: 'datetime'
              }];
              this.options.remoteOperations = remoteOperations;
              this.options.dateSerializationFormat = dateSerializationFormat;
              var isUTCFormat = dateSerializationFormat && dateSerializationFormat.indexOf('Z') >= 0;
              this.options.dataSource = {load: function(options) {
                  loadArgs.push(options);
                  if (!remoteOperations) {
                    var birthday = dateSerialization.serializeDate(date, dateSerializationFormat);
                    return $.Deferred().resolve([{birthday: birthday}]);
                  }
                  return $.Deferred().resolve([{
                    key: 2021,
                    items: [{
                      key: date.getMonth() + 1,
                      items: [{
                        key: isUTCFormat ? date.getUTCDate() : date.getDate(),
                        items: [{
                          key: isUTCFormat ? date.getUTCHours() : date.getHours(),
                          items: [{
                            key: isUTCFormat ? date.getUTCMinutes() : date.getMinutes(),
                            items: null
                          }]
                        }]
                      }]
                    }]
                  }], {totalCount: 1});
                }};
              this.setupDataGrid();
              var column = this.columnsController.getVisibleColumns()[0];
              var dataSourceOptions = this.headerFilterController.getDataSource(column);
              var group = gridCoreUtils.getHeaderFilterGroupParameters(column, remoteOperations);
              dataSourceOptions.load({group: group}).done(function(data) {
                items = data;
              });
              this.clock.tick(10);
              assert.deepEqual(getTreeText(items), ['2021', 'April', date.getDate().toString(), date.getHours().toString(), date.getMinutes().toString()], 'loaded data');
            });
          });
        });
        QUnit.test('Load null data for column with dataType is \'datetime\' if remoteOperations is enabled and dates are formatted in UTC (T1029128)', function(assert) {
          var items;
          var getTreeText = function(items) {
            var result = [];
            var item = items[0];
            while (item) {
              result.push(item.text);
              item = item.items && item.items[0];
            }
            return result;
          };
          var loadArgs = [];
          this.options.columns = [{
            dataField: 'birthday',
            dataType: 'datetime'
          }];
          this.options.remoteOperations = true;
          this.options.dateSerializationFormat = 'yyyy-MM-ddTHH:mm:ssZ';
          this.options.dataSource = {load: function(options) {
              loadArgs.push(options);
              return $.Deferred().resolve([{
                key: null,
                items: [{
                  key: null,
                  items: [{
                    key: null,
                    items: [{
                      key: null,
                      items: [{
                        key: null,
                        items: null
                      }]
                    }]
                  }]
                }]
              }], {totalCount: 1});
            }};
          this.setupDataGrid();
          var column = this.columnsController.getVisibleColumns()[0];
          var dataSourceOptions = this.headerFilterController.getDataSource(column);
          dataSourceOptions.load({}).done(function(data) {
            items = data;
          });
          this.clock.tick(10);
          assert.deepEqual(getTreeText(items), ['(Blanks)'], 'loaded data');
        });
        QUnit.test('Header filter should consider the \'trueText\' and \'falseText\' column options', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.options.columns = [{
            dataField: 'field',
            dataType: 'boolean',
            trueText: 'Yes',
            falseText: 'No'
          }];
          that.setupDataGrid({controllers: {data: new MockDataController({items: [{field: undefined}, {field: true}, {field: false}]})}});
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          var $itemElements = that.headerFilterView.getPopupContainer().$content().find('.dx-list-item');
          assert.equal($itemElements.length, 3, 'count item');
          assert.strictEqual($itemElements.eq(0).text(), '(Blanks)', 'text of the first item');
          assert.strictEqual($itemElements.eq(1).text(), 'No', 'text of the second item');
          assert.strictEqual($itemElements.eq(2).text(), 'Yes', 'text of the third item');
        });
        QUnit.test('Updating selection state should be correct when headerFilter.dataSource as ArrayStore', function(assert) {
          var that = this;
          var $listItems;
          var $popupContent;
          var $testElement = $('#container');
          that.options.dataSource = that.items;
          that.options.columns[0] = {
            dataField: 'Test1',
            allowHeaderFiltering: true,
            headerFilter: {dataSource: new ArrayStore([{
                value: 'value1',
                text: 'Value1'
              }, {
                value: 'value2',
                text: 'Value2'
              }])}
          };
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.headerFilterView.render($testElement);
          that.headerFilterController.showHeaderFilterMenu(0);
          $popupContent = $(that.headerFilterView.getPopupContainer().$content());
          $listItems = $popupContent.find('.dx-list-item');
          $listItems.first().trigger('dxclick');
          assert.ok($listItems.first().find('.dx-checkbox-checked').length, 'checkbox checked');
          var $cancelButton = $popupContent.parent().find('.dx-button').last();
          $cancelButton.trigger('dxclick');
          that.headerFilterController.showHeaderFilterMenu(0);
          $popupContent = that.headerFilterView.getPopupContainer().$content();
          $listItems = $popupContent.find('.dx-list-item');
          assert.notOk($listItems.first().find('.dx-checkbox-checked').length, 'checkbox unchecked');
        });
        QUnit.test('Checking filter in loadOptions when value in headerFilter.dataSource is specified as filter expression for a date column', function(assert) {
          var spy = sinon.spy(function(loadOptions) {
            return [{date: '2018/01/01'}, {date: '2018/01/02'}, {date: '2018/01/03'}];
          });
          this.options.remoteOperations = {filtering: true};
          this.options.columns = [{
            dataField: 'date',
            dataType: 'date',
            headerFilter: {dataSource: [{
                text: '2018/01/01',
                value: ['date', '=', '2018/01/01']
              }]}
          }];
          this.options.dataSource = {load: spy};
          this.setupDataGrid();
          spy.reset();
          this.columnOption('date', 'filterValues', [['date', '=', '2018/01/01']]);
          assert.deepEqual(spy.getCall(0).args[0].filter, ['date', '=', '2018/01/01']);
        });
        [true, false].forEach(function(hasLookupOptimization) {
          QUnit.test(("Header filter should show only relevant values with syncLookupFilterValues = true, lookupOptimization = " + hasLookupOptimization), function(assert) {
            this.options.columns = [{
              dataField: 'column1',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }],
                valueExpr: 'id',
                displayExpr: 'value'
              },
              calculateDisplayValue: hasLookupOptimization ? 'text' : undefined,
              filterValues: [1]
            }, {
              dataField: 'column2',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }],
                valueExpr: 'id',
                displayExpr: 'value'
              },
              calculateDisplayValue: hasLookupOptimization ? 'text' : undefined
            }];
            this.options.dataSource = [{
              column1: 1,
              column2: 1,
              text: 'value1'
            }, {
              column1: 2,
              column2: 2,
              text: 'value2'
            }];
            this.options.syncLookupFilterValues = true;
            var $testElement = $('#container');
            this.setupDataGrid();
            this.columnHeadersView.render($testElement);
            this.headerFilterView.render($testElement);
            this.headerFilterController.showHeaderFilterMenu(1);
            var $popupContent = this.headerFilterView.getPopupContainer().$content();
            var $listItemElements = $popupContent.find('.dx-list-item-content');
            assert.equal($listItemElements.length, 2, 'count list item');
            assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
            assert.strictEqual($listItemElements.eq(1).text(), 'value1');
          });
          QUnit.test(("Header filter search should work with syncLookupFilterValues = true, lookupOptimization = " + hasLookupOptimization), function(assert) {
            this.options.columns = [{
              dataField: 'column1',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }],
                valueExpr: 'id',
                displayExpr: 'value'
              },
              calculateDisplayValue: hasLookupOptimization ? 'text' : undefined
            }];
            this.options.dataSource = [{
              column1: 1,
              column2: 1,
              text: 'value1'
            }, {
              column1: 2,
              column2: 2,
              text: 'value2'
            }];
            this.options.syncLookupFilterValues = true;
            var $testElement = $('#container');
            this.setupDataGrid();
            this.columnHeadersView.render($testElement);
            this.headerFilterView.render($testElement);
            this.headerFilterController.showHeaderFilterMenu(0);
            var $popupContent = this.headerFilterView.getPopupContainer().$content();
            var $listItemElements = $popupContent.find('.dx-list-item-content');
            assert.equal($listItemElements.length, 3, 'count list item');
            assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
            assert.strictEqual($listItemElements.eq(1).text(), 'value1');
            assert.strictEqual($listItemElements.eq(2).text(), 'value2');
            var list = this.getListOrTreeView();
            list.option('searchValue', 'value1');
            $listItemElements = $popupContent.find('.dx-list-item-content');
            assert.equal($listItemElements.length, 1, 'count list item');
            assert.strictEqual($listItemElements.eq(0).text(), 'value1');
          });
          QUnit.test(("Lookup header filter should pass correct load options (skip, take, filter) for lookup dataSource, lookupOptimization = " + hasLookupOptimization), function(assert) {
            this.options.columns = [{
              dataField: 'column1',
              allowFiltering: true,
              lookup: {
                dataSource: $traceurRuntime.spread(new Array(100).keys()).map(function(i) {
                  return ({
                    id: i,
                    value: ("value" + i)
                  });
                }),
                valueExpr: 'id',
                displayExpr: 'value'
              },
              calculateDisplayValue: hasLookupOptimization ? 'text' : undefined
            }];
            this.options.dataSource = $traceurRuntime.spread(new Array(100).keys()).map(function(i) {
              return ({
                column1: i,
                text: ("value" + i)
              });
            });
            this.options.syncLookupFilterValues = true;
            var $testElement = $('#container');
            this.setupDataGrid();
            this.columnHeadersView.render($testElement);
            this.headerFilterView.render($testElement);
            this.headerFilterController.showHeaderFilterMenu(0);
            var $popupContent = this.headerFilterView.getPopupContainer().$content();
            var $listItemElements = $popupContent.find('.dx-list-item-content');
            assert.equal($listItemElements.length, 21, 'count list item');
            assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
            assert.strictEqual($listItemElements.eq(1).text(), 'value0');
            assert.strictEqual($listItemElements.eq(-1).text(), 'value19');
            var list = this.getListOrTreeView();
            list.scrollBy(100);
            this.clock.tick(10);
            $listItemElements = $popupContent.find('.dx-list-item-content');
            assert.equal($listItemElements.length, 41, 'count list item');
            assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
            assert.strictEqual($listItemElements.eq(1).text(), 'value0');
            assert.strictEqual($listItemElements.eq(-1).text(), 'value39');
          });
          [true, false].forEach(function(syncLookupFilterValues) {
            [true, false].forEach(function(lookupDataSourceHasNullItem) {
              QUnit.test(("Header filter should not contain two blank items if dataSource has item with nullish lookup value,\n                        syncLookupFilterValues = " + syncLookupFilterValues + "\n                        lookupOptimization = " + hasLookupOptimization + "\n                        lookupDataSourceHasNullItem = " + lookupDataSourceHasNullItem), function(assert) {
                var lookupDataSource = [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }];
                if (lookupDataSourceHasNullItem) {
                  lookupDataSource.unshift({
                    id: null,
                    value: null
                  });
                }
                this.options.columns = [{
                  dataField: 'column1',
                  allowFiltering: true,
                  lookup: {
                    dataSource: lookupDataSource,
                    valueExpr: 'id',
                    displayExpr: 'value'
                  },
                  calculateDisplayValue: hasLookupOptimization ? 'text' : undefined
                }];
                this.options.dataSource = [{
                  column1: 1,
                  text: 'value1'
                }, {
                  column1: 2,
                  text: 'value2'
                }, {
                  column1: null,
                  text: null
                }];
                this.options.syncLookupFilterValues = syncLookupFilterValues;
                var $testElement = $('#container');
                this.setupDataGrid();
                this.headerFilterView.render($testElement);
                this.headerFilterController.showHeaderFilterMenu(0);
                var $popupContent = this.headerFilterView.getPopupContainer().$content();
                var $listItemElements = $popupContent.find('.dx-list-item-content');
                assert.equal($listItemElements.length, 3, 'count list item');
                assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
                assert.strictEqual($listItemElements.eq(1).text(), 'value1');
                assert.strictEqual($listItemElements.eq(2).text(), 'value2');
              });
            });
          });
        });
        QUnit.test('There is no additional request to grid datasource after searching in filter row editor with groupPaging: true', function(assert) {
          var loadSpy = sinon.spy(function(loadOptions) {
            var d = $.Deferred();
            new ArrayStore([{column1: 1}, {column1: 2}]).load(loadOptions).done(function(items) {
              return d.resolve({
                data: items,
                totalCount: 2
              });
            });
            return d;
          });
          this.options.columns = [{
            dataField: 'column1',
            allowFiltering: true,
            lookup: {
              dataSource: [{
                id: 1,
                value: 'value1'
              }, {
                id: 2,
                value: 'value2'
              }],
              valueExpr: 'id',
              displayExpr: 'value'
            }
          }];
          this.options.dataSource = {load: loadSpy};
          this.options.syncLookupFilterValues = true;
          this.options.remoteOperations = {groupPaging: true};
          this.options.headerFilter.search.enabled = true;
          var $testElement = $('#container');
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          assert.strictEqual(loadSpy.callCount, 1);
          loadSpy.reset();
          this.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = this.headerFilterView.getPopupContainer().$content();
          var $listItemElements = $popupContent.find('.dx-list-item-content');
          assert.equal($listItemElements.length, 3, 'count list item');
          assert.strictEqual($listItemElements.eq(0).text(), '(Blanks)');
          assert.strictEqual($listItemElements.eq(1).text(), 'value1');
          assert.strictEqual($listItemElements.eq(2).text(), 'value2');
          assert.strictEqual(loadSpy.callCount, 1);
          loadSpy.reset();
          var list = this.getListOrTreeView();
          list.option('searchValue', 'value1');
          $listItemElements = $popupContent.find('.dx-list-item-content');
          assert.equal($listItemElements.length, 1, 'count list item');
          assert.strictEqual($listItemElements.eq(0).text(), 'value1');
          assert.strictEqual(loadSpy.callCount, 0);
          loadSpy.reset();
        });
        QUnit.test('The selection should work correctly after searching when calculateDisplayValue is used and when a lookup\'s key is specified', function(assert) {
          var $testElement = $('#container');
          this.options = {
            dataSource: [{'Test': '123'}, {'Test': '132'}],
            headerFilter: {
              visible: true,
              search: {
                enabled: true,
                timeout: 500,
                mode: 'contains',
                editorOptions: {}
              },
              texts: {
                ok: 'Ok',
                cancel: 'Cancel',
                emptyValue: '(Blanks)'
              }
            },
            showColumnHeaders: true,
            columns: [{
              dataField: 'Test',
              allowHeaderFiltering: true,
              lookup: {
                dataSource: function() {
                  var store = new ArrayStore({
                    key: 'id',
                    data: [{
                      'id': '123',
                      'name': '123'
                    }, {
                      'id': '132',
                      'name': '132'
                    }]
                  });
                  return {
                    sort: 'name',
                    searchOperation: 'startswith',
                    store: store
                  };
                },
                valueExpr: 'id',
                displayExpr: 'name',
                searchEnabled: true
              },
              calculateDisplayValue: 'Test'
            }]
          };
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          assert.equal($testElement.find('.dx-header-filter-menu').length, 1, 'has header filter menu');
          this.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = this.headerFilterView.getPopupContainer().$content();
          assert.ok($popupContent.is(':visible'), 'visible popup');
          var list = this.getListOrTreeView();
          list.option('searchValue', '1');
          assert.strictEqual(list.option('selectedItems').length, 0, 'no selected items');
        });
        QUnit.test('searchExpr option should work', function(assert) {
          var $testElement = $('#container');
          this.options.columns = [{
            dataField: 'city',
            dataType: 'string',
            headerFilter: {search: {
                enabled: true,
                searchExpr: ['city', 'country']
              }}
          }];
          this.options.dataSource = [{
            city: 'New York',
            country: 'USA'
          }, {
            city: 'Munich',
            country: 'Germany'
          }, {
            city: 'Berlin',
            country: 'Germany'
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var list = this.getListOrTreeView();
          list.option('searchValue', 'Germany');
          assert.strictEqual(list.option('items').length, 2);
        });
        QUnit.test('searchExpr option should work with custom headerFilter.dataSource', function(assert) {
          var $testElement = $('#container');
          this.options.columns = [{
            dataField: 'city',
            dataType: 'string',
            headerFilter: {
              dataSource: [{
                text: 'New York',
                value: 'new_york',
                country: 'USA'
              }, {
                text: 'Munich',
                value: 'munich',
                country: 'Germany'
              }, {
                text: 'Berlin',
                value: 'berlin',
                country: 'Germany'
              }],
              search: {
                enabled: true,
                searchExpr: ['city', 'country']
              }
            }
          }];
          this.options.dataSource = [{city: 'New York'}, {city: 'Munich'}, {city: 'Berlin'}];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var list = this.getListOrTreeView();
          list.option('searchValue', 'Germany');
          assert.strictEqual(list.option('items').length, 2);
        });
        QUnit.test('searchExpr option should work with lookup-column', function(assert) {
          var $testElement = $('#container');
          this.options.columns = [{
            dataField: 'LookupColumn',
            headerFilter: {search: {
                enabled: true,
                searchExpr: ['displayText', 'country']
              }},
            lookup: {
              dataSource: [{
                displayText: 'New York',
                valueExpr: 'new_york',
                country: 'USA'
              }, {
                displayText: 'Munich',
                valueExpr: 'munich',
                country: 'Germany'
              }, {
                displayText: 'Berlin',
                valueExpr: 'berlin',
                country: 'Germany'
              }],
              displayExpr: 'displayText',
              valueExpr: 'lookupValue'
            }
          }];
          this.options.dataSource = [{LookupColumn: 'new_york'}, {LookupColumn: 'munich'}, {LookupColumn: 'berlin'}];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var list = this.getListOrTreeView();
          list.option('searchValue', 'Germany');
          assert.strictEqual(list.option('items').length, 2);
        });
        QUnit.test('Filter should apply if allowSelectAll is false and first item was checked', function(assert) {
          var $testElement = $('#container');
          this.options.columns = [{
            dataField: 'field1',
            headerFilter: {allowSelectAll: false}
          }];
          this.options.dataSource = [{field1: 'aaa'}, {field1: 'bbb'}, {field1: 'ccc'}];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.headerFilterView.render($testElement);
          this.headerFilterController.showHeaderFilterMenu(0);
          var $popupContent = $(this.headerFilterView.getPopupContainer().$overlayContent());
          var checkbox = $popupContent.find('.dx-checkbox').first().dxCheckBox('instance');
          var applyButton = $popupContent.find('.dx-button').first();
          checkbox.option('value', true);
          applyButton.trigger('dxclick');
          this.clock.tick(500);
          var column = this.columnsController.getVisibleColumns()[0];
          assert.strictEqual(column.filterValues.length, 1, 'filterValues length of the first column');
          assert.strictEqual(column.filterValues[0], 'aaa', 'filterValues of the first column');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","ui/grid_core/ui.grid_core.utils","jquery","data/array_store","core/utils/common","data/odata/store","core/devices","data/data_source/data_source","ui/grid_core/ui.grid_core.header_filter","events/drag","../../helpers/dataGridMocks.js","core/utils/view_port","animation/fx","localization/message","core/utils/date_serialization","../../helpers/wrappers/searchBoxWrappers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("ui/grid_core/ui.grid_core.utils"), require("jquery"), require("data/array_store"), require("core/utils/common"), require("data/odata/store"), require("core/devices"), require("data/data_source/data_source"), require("ui/grid_core/ui.grid_core.header_filter"), require("events/drag"), require("../../helpers/dataGridMocks.js"), require("core/utils/view_port"), require("animation/fx"), require("localization/message"), require("core/utils/date_serialization"), require("../../helpers/wrappers/searchBoxWrappers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=headerFilter.tests.js.map