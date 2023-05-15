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

(["testing/tests/DevExpress.ui.widgets.editors/datebox.tests.js"], ["../../helpers/noIntl.js","jquery","ui/box","ui/calendar","ui/date_box","core/config","localization/date","core/utils/date_serialization","core/utils/date","core/devices","animation/fx","../../helpers/keyboardMock.js","../../helpers/shadowDom.js","localization/message","localization","localization/messages/ja.json!","../../helpers/pointerMock.js","core/utils/support","core/utils/type","ui/date_box/ui.date_utils","core/utils/common","core/utils/console","events/utils/index","../../helpers/calendarFixtures.js","ui/validator","generic_light.css!","core/utils/size","../DevExpress.ui.widgets/scrollableParts/scrollable.constants.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/datebox.tests.js", ["../../helpers/noIntl.js", "jquery", "ui/box", "ui/calendar", "ui/date_box", "core/config", "localization/date", "core/utils/date_serialization", "core/utils/date", "core/devices", "animation/fx", "../../helpers/keyboardMock.js", "../../helpers/shadowDom.js", "localization/message", "localization", "localization/messages/ja.json!", "../../helpers/pointerMock.js", "core/utils/support", "core/utils/type", "ui/date_box/ui.date_utils", "core/utils/common", "core/utils/console", "events/utils/index", "../../helpers/calendarFixtures.js", "ui/validator", "generic_light.css!", "core/utils/size", "../DevExpress.ui.widgets/scrollableParts/scrollable.constants.js"], function($__export) {
  "use strict";
  var $,
      Box,
      Calendar,
      DateBox,
      config,
      dateLocalization,
      dateSerialization,
      dateUtils,
      devices,
      fx,
      keyboardMock,
      getActiveElement,
      messageLocalization,
      localization,
      ja,
      pointerMock,
      support,
      typeUtils,
      uiDateUtils,
      noop,
      logger,
      normalizeKeyName,
      implementationsMap,
      RESIZE_WAIT_TIMEOUT,
      currentDate,
      firstDayOfWeek,
      BOX_CLASS,
      CALENDAR_CLASS,
      TIMEVIEW_CLASS,
      TIMEVIEW_CLOCK_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      DATEBOX_CLASS,
      DATEBOX_WRAPPER_CLASS,
      DATEBOX_LIST_POPUP_SELECTOR,
      LIST_ITEM_SELECTOR,
      DATEBOX_ADAPTIVITY_MODE_CLASS,
      LIST_ITEM_SELECTED_CLASS,
      STATE_FOCUSED_CLASS,
      BUTTONS_CONTAINER_CLASS,
      GESTURE_COVER_CLASS,
      DROP_DOWN_BUTTON_CLASS,
      DROP_DOWN_BUTTON_VISIBLE_CLASS,
      OVERLAY_CONTENT_CLASS,
      OVERLAY_WRAPPER_CLASS,
      POPUP_CLASS,
      LIST_CLASS,
      CLEAR_BUTTON_AREA_CLASS,
      CALENDAR_CELL_CLASS,
      CALENDAR_TODAY_BUTTON_CLASS,
      DROPDOWNEDITOR_OVERLAY_CLASS,
      NUMBERBOX_CLASS,
      NUMBERBOX_SPIN_DOWN_CLASS,
      SHOW_INVALID_BADGE_CLASS,
      APPLY_BUTTON_SELECTOR,
      CANCEL_BUTTON_SELECTOR,
      TODAY_BUTTON_SELECTOR,
      widgetName,
      testModule,
      test,
      getShortDate,
      getInstanceWidget,
      moduleConfig,
      clearInput,
      getExpectedResult,
      prepareDateString,
      isAndroid;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Box = $__m.default;
    }, function($__m) {
      Calendar = $__m.default;
    }, function($__m) {
      DateBox = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      dateSerialization = $__m.default;
    }, function($__m) {
      dateUtils = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      localization = $__m.default;
    }, function($__m) {
      ja = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      uiDateUtils = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      logger = $__m.logger;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      implementationsMap = $__m.implementationsMap;
    }, function($__m) {
      RESIZE_WAIT_TIMEOUT = $__m.RESIZE_WAIT_TIMEOUT;
    }],
    execute: function() {
      var $__7;
      QUnit.testStart(function() {
        var markup = '<div id="parent-div"></div>\
        <div id="dateBox"></div>\
        <div id="dateBoxWithPicker"></div>\
        <div id="widthRootStyle"></div>\
        <div id="containerWithWidth"><div id="innerDateBox"></div></div';
        $('#qunit-fixture').html(markup);
        $('#containerWithWidth').css('width', '100px');
        $('#widthRootStyle').css('width', '300px');
      });
      currentDate = new Date(2015, 11, 31);
      firstDayOfWeek = 0;
      BOX_CLASS = 'dx-box';
      CALENDAR_CLASS = 'dx-calendar';
      TIMEVIEW_CLASS = 'dx-timeview';
      TIMEVIEW_CLOCK_CLASS = 'dx-timeview-clock';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      DATEBOX_CLASS = 'dx-datebox';
      DATEBOX_WRAPPER_CLASS = 'dx-datebox-wrapper';
      DATEBOX_LIST_POPUP_SELECTOR = '.dx-datebox-wrapper-list .dx-popup-content';
      LIST_ITEM_SELECTOR = '.dx-list-item';
      DATEBOX_ADAPTIVITY_MODE_CLASS = 'dx-datebox-adaptivity-mode';
      LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
      STATE_FOCUSED_CLASS = 'dx-state-focused';
      BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
      GESTURE_COVER_CLASS = 'dx-gesture-cover';
      DROP_DOWN_BUTTON_CLASS = 'dx-dropdowneditor-button';
      DROP_DOWN_BUTTON_VISIBLE_CLASS = 'dx-dropdowneditor-button-visible';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      POPUP_CLASS = 'dx-popup';
      LIST_CLASS = 'dx-list';
      CLEAR_BUTTON_AREA_CLASS = 'dx-clear-button-area';
      CALENDAR_CELL_CLASS = 'dx-calendar-cell';
      CALENDAR_TODAY_BUTTON_CLASS = 'dx-calendar-today-button';
      DROPDOWNEDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
      NUMBERBOX_CLASS = 'dx-numberbox';
      NUMBERBOX_SPIN_DOWN_CLASS = 'dx-numberbox-spin-down';
      SHOW_INVALID_BADGE_CLASS = 'dx-show-invalid-badge';
      APPLY_BUTTON_SELECTOR = '.dx-popup-done.dx-button';
      CANCEL_BUTTON_SELECTOR = '.dx-popup-cancel.dx-button';
      TODAY_BUTTON_SELECTOR = '.dx-button-today.dx-button';
      widgetName = 'dxDateBox';
      (($__7 = QUnit, testModule = $__7.module, test = $__7.test, $__7));
      getShortDate = function(date) {
        return dateSerialization.serializeDate(date, dateUtils.getShortDateFormat());
      };
      getInstanceWidget = function(instance) {
        return instance._strategy._widget;
      };
      moduleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers(new Date().valueOf());
          this.$element = $('#dateBox')[widgetName]({pickerType: 'native'});
          this.instance = this.$element[widgetName]('instance');
          this.$input = $.proxy(this.instance._input, this.instance);
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      clearInput = function($element, keyboard) {
        var textLength = $element.val().length;
        keyboard.caret({
          start: 0,
          end: textLength
        }).press('backspace');
      };
      getExpectedResult = function(date, mode, stringDate) {
        var localizedDate;
        if (uiDateUtils.FORMATS_MAP[mode]) {
          localizedDate = dateLocalization.format(date, uiDateUtils.FORMATS_MAP[mode]);
        } else {
          localizedDate = uiDateUtils.toStandardDateFormat(date, mode);
        }
        return support.inputType(mode) ? stringDate : localizedDate;
      };
      prepareDateString = function(type, year, month, day) {
        return type === 'text' ? (month + "/" + day + "/" + year) : (year + "-" + month + "-" + day);
      };
      isAndroid = function() {
        return devices.real().android;
      };
      QUnit.module('datebox tests', moduleConfig, function() {
        QUnit.test('value is null after reset', function(assert) {
          var date = new Date(2012, 10, 26, 16, 40, 23);
          this.instance.option('value', date);
          this.instance.reset();
          assert.equal(this.instance.option('value'), null, 'value is null after reset');
        });
        QUnit.test('render valueChangeEvent', function(assert) {
          this.instance.option({type: 'date'});
          var $input = $(this.$input());
          var newValue = prepareDateString($input.prop('type'), 2012, 11, 26);
          $input.val(newValue).trigger('change');
          var value = this.instance.option('value');
          assert.equal(this.instance.option('valueChangeEvent'), 'change', 'T173149');
          assert.equal(value.getFullYear(), 2012);
          assert.equal(value.getMonth(), 10);
          assert.equal(value.getDate(), 26);
        });
        QUnit.test('simulated date picker should not be opened if pickerType is \'native\'', function(assert) {
          var originalInputType = support.inputType;
          support.inputType = function() {
            return true;
          };
          var $dateBox = $('#dateBoxWithPicker').dxDateBox({
            pickerType: 'native',
            deferRendering: false
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $($input).trigger('dxclick');
          var $popup = $dateBox.find('.dx-popup');
          assert.equal($popup.dxPopup('option', 'visible'), false, 'simulated datepicker is closed');
          support.inputType = originalInputType;
        });
        QUnit.test('simulated datepicker should not be draggable, T231481', function(assert) {
          var $dateBox = $('#dateBoxWithPicker').dxDateBox({
            pickerType: 'native',
            deferRendering: false,
            opened: true
          });
          var $popup = $dateBox.find('.dx-popup');
          var popup = $popup.dxPopup('instance');
          assert.ok(!popup.option('dragEnabled'), 'popup is not draggable');
        });
        QUnit.test('T204185 - dxDateBox input should be editable when pickerType is \'calendar\'', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({pickerType: 'calendar'});
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          assert.ok(!$input.prop('readOnly'), 'correct readOnly value');
        });
        QUnit.test('readonly property should not be applied to the native picker on real ios', function(assert) {
          var deviceStub = sinon.stub(devices, 'real').returns({
            deviceType: 'mobile',
            version: [],
            platform: 'ios'
          });
          try {
            var $dateBox = $('#dateBox').dxDateBox({
              pickerType: 'native',
              acceptCustomValue: false
            });
            var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
            assert.ok(!$input.prop('readOnly'), 'correct readOnly value');
          } finally {
            deviceStub.restore();
          }
        });
        QUnit.test('dateBox with readOnly option enabled should not raise exception', function(assert) {
          try {
            $('#dateBox').dxDateBox({
              type: 'date',
              readOnly: true,
              showClearButton: true
            });
            assert.ok(true);
          } catch (e) {
            assert.ok(false, 'exception raised: ' + e.message);
          }
        });
        QUnit.test('T204179 - dxDateBox should not render dropDownButton only for generic device when pickerType is \'native\'', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({pickerType: 'native'});
          var $dropDownButton = $dateBox.find(("." + DROP_DOWN_BUTTON_CLASS));
          var expectedButtonsNumber = devices.real().deviceType === 'desktop' ? 0 : 1;
          assert.equal($dropDownButton.length, expectedButtonsNumber, 'correct readOnly value');
        });
        QUnit.test('Datebox should set min and max attributes to the native input (T258860) after option changed', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'native',
            min: new Date(2015, 5, 2),
            max: new Date(2015, 7, 2)
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          dateBox.option({
            min: new Date(2015, 5, 3),
            max: new Date(2015, 7, 3)
          });
          $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.attr('min'), '2015-06-03', 'minimum date changed correctly');
          assert.equal($input.attr('max'), '2015-08-03', 'maximum date changed correctly');
        });
        QUnit.test('T195971 - popup is not showing after click on the \'clear\' button', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'rollers',
            showClearButton: true
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $clearButton = $dateBox.find(("." + CLEAR_BUTTON_AREA_CLASS));
          assert.ok(!dateBox.option('opened'), 'popup is closed');
          $($clearButton).trigger('dxclick');
          assert.ok(!dateBox.option('opened'), 'popup is still closed after click on clear button');
        });
        QUnit.test('invalid value should be cleared after clear button click', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            showClearButton: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var $clearButton = $dateBox.find(("." + CLEAR_BUTTON_AREA_CLASS));
          $($input.val('asd')).trigger('change');
          $($clearButton).trigger('dxclick');
          assert.equal(instance.option('text'), '', 'dateBox \'text\' option is clear');
          assert.equal($input.val(), '', 'dateBox input is empty');
        });
        QUnit.test('out of range value should not be marked as invalid on init', function(assert) {
          var $dateBox = $('#widthRootStyle').dxDateBox({
            value: new Date(2015, 3, 20),
            min: new Date(2014, 3, 20),
            max: new Date(2014, 4, 20)
          });
          var dateBox = $dateBox.dxDateBox('instance');
          assert.ok(dateBox.option('isValid'), 'widget is valid on init');
        });
        QUnit.test('it shouild be impossible to set out of range time to dxDateBox using ui (T394206)', function(assert) {
          var $dateBox = $('#widthRootStyle').dxDateBox({
            opened: true,
            type: 'datetime',
            pickerType: 'calendarWithTime',
            value: new Date(2015, 3, 20, 15, 0, 0),
            min: new Date(2015, 3, 20, 15, 0, 0)
          });
          this.clock.tick(10);
          var dateBox = $dateBox.dxDateBox('instance');
          var $done = $(dateBox.content()).parent().find(APPLY_BUTTON_SELECTOR);
          var $hourDown = $(dateBox.content()).parent().find(("." + NUMBERBOX_SPIN_DOWN_CLASS)).eq(0);
          $hourDown.trigger('dxpointerdown');
          $done.trigger('dxclick');
          assert.notOk(dateBox.option('isValid'), 'widget is invalid');
        });
        QUnit.test('type change should raise validation', function(assert) {
          var now = new Date();
          var $dateBox = $('#widthRootStyle').dxDateBox({
            type: 'date',
            value: now,
            pickerType: 'calendar',
            focusStateEnabled: true
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          keyboard.type('123').press('enter');
          assert.notOk(dateBox.option('isValid'), 'widget is invalid');
          dateBox.option('type', 'datetime');
          assert.ok(dateBox.option('isValid'), 'widget is valid after type change');
          assert.deepEqual(dateBox.option('value'), now, 'value has been reset');
        });
        QUnit.test('T252737 - the \'acceptCustomValue\' option correct behavior', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            acceptCustomValue: false,
            valueChangeEvent: 'change keyup',
            value: null,
            pickerType: 'calendar'
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          keyboardMock($input).type('2015/6/10');
          assert.equal($dateBox.dxDateBox('option', 'value'), null, 'value is not set');
          assert.equal($input.val(), '', 'text is not rendered');
        });
        QUnit.test('After typing while calendar is opened the typed data should be saved', function(assert) {
          var $__3 = this;
          var optionsSet = [];
          [true, false].forEach(function(useMaskBehavior) {
            ['date', 'datetime'].forEach(function(type) {
              optionsSet.push({
                useMaskBehavior: useMaskBehavior,
                type: type,
                pickerType: 'calendar',
                openOnFieldClick: true
              });
            });
          });
          optionsSet.forEach(function(options) {
            var $dateBox = $('#dateBox').dxDateBox(options);
            var instance = $dateBox.dxDateBox('instance');
            var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
            var kb = keyboardMock($input);
            var typedDate = (options.type === 'date' ? '10/6/2010' : '10/6/2010, 12:00 PM');
            var selectedDate = (options.type === 'date' ? '9/7/2010' : '9/7/2010, 12:00 PM');
            $input.val('');
            instance.open();
            $__3.clock.tick(10);
            kb.type(typedDate).press('enter');
            assert.deepEqual(instance.option('text'), typedDate, ("typed value is set when useMaskBehavior:" + options.useMaskBehavior + ", type:" + options.type));
            instance.open();
            $__3.clock.tick(10);
            kb.keyDown('left', {ctrlKey: true}).press('right').press('enter');
            if (options.type === 'datetime') {
              kb.press('enter');
            }
            assert.deepEqual(instance.option('text'), selectedDate, ("value is successfully changed by calendar when useMaskBehavior:" + options.useMaskBehavior + ", type:" + options.type));
            instance.dispose();
          });
        });
        QUnit.test('T378630 - the displayFormat should not be changed if the type option is set', function(assert) {
          var displayFormat = 'Y';
          var instance = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            displayFormat: displayFormat,
            type: 'datetime',
            value: new Date(2016, 4, 13)
          }).dxDateBox('instance');
          assert.equal(instance.option('displayFormat'), displayFormat, 'the displayFormat option is not changed');
        });
        QUnit.test('the \'displayFormat\' option should accept format objects (T378753)', function(assert) {
          var date = new Date(2016, 4, 13, 22, 5);
          var format = {type: 'longDate'};
          var $element = $('#dateBox').dxDateBox({
            value: date,
            pickerType: 'calendar',
            displayFormat: format
          });
          var expectedDisplayValue = dateLocalization.format(date, format);
          assert.equal($element.find('.' + TEXTEDITOR_INPUT_CLASS).val(), expectedDisplayValue, 'correct display value');
        });
        QUnit.test('T437211: Custom dxDateBox value formatter is not called if the same value is typed twice', function(assert) {
          var date = new Date(2016, 4, 13, 22, 5);
          var format = {type: 'longDate'};
          var $dateBox = $('#dateBox').dxDateBox({
            value: date,
            pickerType: 'calendar',
            displayFormat: format
          });
          var instance = $dateBox.dxDateBox('instance');
          var expectedDisplayValue = dateLocalization.format(new Date(2016, 0, 1), format);
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          $input.val('');
          $input.val('1/01/2016');
          $input.change();
          assert.equal(instance.option('text'), expectedDisplayValue, 'input value was formatted');
          $input.val('');
          $input.val('1/01/2016');
          $input.change();
          assert.equal(instance.option('text'), expectedDisplayValue, 'input value was formatted');
        });
        QUnit.test('onPopupInitialized handler calls with the calendar picker type', function(assert) {
          assert.expect(1);
          $('#dateBoxWithPicker').dxDateBox({
            pickerType: 'calendar',
            onPopupInitialized: function(e) {
              assert.equal(e.popup.NAME, 'dxPopup', 'initialized event is fired for popup');
            },
            opened: true
          });
        });
        QUnit.test('onPopupInitialized handler calls with the rollers picker type', function(assert) {
          assert.expect(1);
          $('#dateBoxWithPicker').dxDateBox({
            pickerType: 'rollers',
            onPopupInitialized: function(e) {
              assert.equal(e.popup.NAME, 'dxPopup', 'initialized event is fired for popup');
            },
            opened: true
          });
        });
        QUnit.test('onPopupInitialized handler calls with the list picker type', function(assert) {
          assert.expect(1);
          $('#dateBoxWithPicker').dxDateBox({
            pickerType: 'list',
            onPopupInitialized: function(e) {
              assert.equal(e.popup.NAME, 'dxPopup', 'initialized event is fired for popup');
            },
            opened: true
          });
        });
      });
      QUnit.module('toolbar buttons', {}, function() {
        var types = ['date', 'datetime'];
        var buttons = [{
          optionName: 'todayButtonText',
          name: 'Today',
          newText: 'newTodayText',
          selector: TODAY_BUTTON_SELECTOR,
          localizationMessageKey: 'dxCalendar-todayButtonText'
        }, {
          optionName: 'applyButtonText',
          name: 'Done',
          newText: 'newDoneText',
          selector: APPLY_BUTTON_SELECTOR,
          localizationMessageKey: 'OK'
        }, {
          optionName: 'cancelButtonText',
          name: 'Cancel',
          newText: 'newCancelText',
          selector: CANCEL_BUTTON_SELECTOR,
          localizationMessageKey: 'Cancel'
        }];
        types.forEach(function(type) {
          buttons.forEach(function(button) {
            QUnit.test(("\"" + button.optionName + "\" should customize " + button.name + " button on init when type=\"" + type + "\""), function(assert) {
              var $__4;
              var $dateBox = $('#dateBox').dxDateBox(($__4 = {}, Object.defineProperty($__4, "type", {
                value: type,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "pickerType", {
                value: 'calendar',
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "opened", {
                value: true,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, "applyValueMode", {
                value: 'useButtons',
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__4, button.optionName, {
                value: button.newText,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__4));
              var instance = $dateBox.dxDateBox('instance');
              var $overlayContent = $(instance.content()).parent();
              var buttonText = $overlayContent.find(button.selector).text();
              assert.strictEqual(buttonText, button.newText, (button.name + " text customized correctly"));
            });
            QUnit.test(("\"" + button.optionName + "\" should customize " + button.name + " button after init when type=\"" + type + "\""), function(assert) {
              var $dateBox = $('#dateBox').dxDateBox({
                type: type,
                pickerType: 'calendar',
                opened: true,
                applyValueMode: 'useButtons'
              });
              var instance = $dateBox.dxDateBox('instance');
              instance.option(button.optionName, button.newText);
              var $overlayContent = $(instance.content()).parent();
              var buttonText = $overlayContent.find(button.selector).text();
              assert.strictEqual(buttonText, button.newText, (button.name + " text customized correctly"));
            });
            QUnit.test(("The \"" + button.optionName + "\" value should be localized by default when type=\"" + type + "\""), function(assert) {
              var defaultLocale = localization.locale();
              try {
                localization.loadMessages(ja);
                localization.locale('ja');
                var $dateBox = $('#dateBox').dxDateBox({
                  type: type,
                  pickerType: 'calendar',
                  opened: true,
                  applyValueMode: 'useButtons'
                });
                var instance = $dateBox.dxDateBox('instance');
                var $overlayContent = $(instance.content()).parent();
                var buttonText = $overlayContent.find(button.selector).text();
                assert.strictEqual(buttonText, messageLocalization.format(button.localizationMessageKey), ("the default \"" + button.optionName + "\" value is localized"));
              } finally {
                localization.locale(defaultLocale);
              }
            });
          });
        });
      });
      QUnit.module('hidden input', {}, function() {
        QUnit.test('the value should be passed to the hidden input in the correct format', function(assert) {
          var dateValue = new Date(2016, 6, 15, 14, 30);
          var types = ['datetime', 'date', 'time'];
          var $element = $('#dateBox').dxDateBox({value: dateValue});
          var instance = $element.dxDateBox('instance');
          $.each(types, function(_, type) {
            var stringValue = uiDateUtils.toStandardDateFormat(dateValue, uiDateUtils.SUBMIT_FORMATS_MAP[type]);
            instance.option('type', type);
            assert.equal($element.find('input[type=\'hidden\']').val(), stringValue, 'input value is correct for the \'' + type + '\' format');
          });
        });
        QUnit.test('the value should be passed to the hidden input on widget value change', function(assert) {
          var type = 'date';
          var $element = $('#dateBox').dxDateBox({type: type});
          var instance = $element.dxDateBox('instance');
          var $hiddenInput = $element.find('input[type=\'hidden\']');
          var expectedDateValue = new Date(2016, 6, 15);
          var expectedStringValue = uiDateUtils.toStandardDateFormat(expectedDateValue, type);
          instance.option('value', expectedDateValue);
          assert.equal($hiddenInput.val(), expectedStringValue, 'input value is correct after widget value change');
        });
        QUnit.test(("click on drop-down button should " + (isAndroid() ? '' : 'not') + " call click on input to show native picker, " + devices.real().platform + " device (T824701, T950897)"), function(assert) {
          var clickStub = sinon.stub();
          var isAndroidDevice = isAndroid();
          var expectedCallCount = isAndroidDevice ? 1 : 0;
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'native',
            showDropDownButton: true
          });
          $element.find(("." + TEXTEDITOR_INPUT_CLASS)).on('click', clickStub);
          $element.find(("." + DROP_DOWN_BUTTON_CLASS)).trigger('dxclick');
          assert.strictEqual(clickStub.callCount, expectedCallCount, (devices.real().platform + " device, editor should " + (isAndroidDevice ? '' : 'not') + " trigger click on the input"));
        });
      });
      QUnit.module('focus policy', {}, function() {
        QUnit.test('dateBox should stay focused after value selecting in date strategy', function(assert) {
          assert.expect(1);
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $popupContent = $(instance._popup.$content().parent());
          $($popupContent).on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'datebox does not lose focus on overlay content clicking');
          });
          $($popupContent).trigger('mousedown');
        });
        QUnit.test('dateBox should stay focused after value selecting in time strategy', function(assert) {
          assert.expect(1);
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'time',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $popupContent = $(instance._popup.$content().parent());
          $($popupContent).on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'datebox does not lose focus on popup content clicking');
          });
          $($popupContent).trigger('mousedown');
        });
        QUnit.test('dateBox should stay focused after value selecting in datetime strategy', function(assert) {
          assert.expect(1);
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $popupContent = $(instance._popup.$content().parent());
          $($popupContent).on('mousedown', function(e) {
            assert.ok(e.isDefaultPrevented(), 'datebox does not lose focus on popup content clicking');
          });
          $($popupContent).trigger('mousedown');
        });
        QUnit.test('calendar in datebox should not have tabIndex attribute', function(assert) {
          assert.expect(1);
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $calendar = $(instance._popup.$content().find('.dx-calendar'));
          assert.equal($calendar.attr('tabindex'), null, 'calendar has not tabindex');
        });
        QUnit.testInActiveWindow('set focus on \'tab\' key from editor to overlay and inversely', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.keyDown('tab');
          var $hourBox = $(instance._strategy._timeView._hourBox.$element());
          var $inputHourBox = instance._strategy._timeView._hourBox._input();
          assert.ok($hourBox.hasClass(STATE_FOCUSED_CLASS), 'tab set focus to first input in overlay');
          $($inputHourBox).trigger($.Event('keydown', {
            key: 'Tab',
            shiftKey: true
          }));
          assert.ok($dateBox.hasClass(STATE_FOCUSED_CLASS), 'dateBox on focus reset focus to element');
        });
        QUnit.testInActiveWindow('first input focused on tab should have selected text (T1127632)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            opened: true,
            focusStateEnabled: true
          });
          var instance = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.keyDown('tab');
          var $inputHourBox = instance._strategy._timeView._hourBox._input();
          var caretPosition = {
            start: $inputHourBox[0].selectionStart,
            end: $inputHourBox[0].selectionEnd
          };
          assert.strictEqual(caretPosition.start, 0, 'selectionStart is correct');
          assert.strictEqual(caretPosition.end, 2, 'selectionEnd is correct');
        });
        QUnit.test('mousewheel action should not work if dateBox is not focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            useMaskBehavior: true
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var initText = dateBox.option('text');
          var input = $(("." + TEXTEDITOR_INPUT_CLASS), $dateBox).get(0);
          var mouse = pointerMock(input).start();
          mouse.wheel(10);
          assert.strictEqual(dateBox.option('text'), initText);
          input.focus();
          mouse.wheel(10);
          assert.notStrictEqual(dateBox.option('text'), initText);
        });
      });
      QUnit.module('options changed callbacks', moduleConfig, function() {
        QUnit.test('value', function(assert) {
          var date = new Date(2012, 10, 26);
          var mode = this.instance.option('mode');
          this.instance.option('value', date);
          assert.equal(this.$input().val(), getExpectedResult(date, mode, '2012-11-26'));
          date = new Date(2012, 11, 26);
          this.instance.option('value', date);
          assert.equal(this.$input().val(), getExpectedResult(date, mode, '2012-12-26'));
        });
        QUnit.test('type', function(assert) {
          var date = new Date(2012, 10, 26, 16, 40, 23);
          this.instance.option({
            value: date,
            type: 'date'
          });
          assert.equal(this.$input().val(), getExpectedResult(date, this.instance.option('mode'), '2012-11-26'));
          this.instance.option('type', 'time');
          assert.equal(this.$input().val(), getExpectedResult(date, this.instance.option('mode'), '16:40'));
        });
        QUnit.test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          this.instance.option('onValueChanged', function() {
            assert.ok(true);
          });
          this.instance.option('value', new Date(2015, 6, 14));
        });
        QUnit.test('empty class toggle depending on value', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            pickerType: 'calendar',
            type: 'date'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          assert.ok($dateBox.hasClass('dx-texteditor-empty'), 'empty class attached when value is empty');
          dateBox.option('value', new Date());
          assert.ok(!$dateBox.hasClass('dx-texteditor-empty'), 'empty class removed when value is not empty');
        });
        QUnit.test('T188238 - changing of type leads to strategy changing', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date(),
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.open();
          assert.ok($dateBox.hasClass('dx-datebox-date'), 'strategy is correct');
          assert.equal($('.dx-calendar').length, 1, 'there is calendar in popup when type is \'date\'');
          assert.equal($('.dx-timeview').length, 0, 'there is no timeview in popup when type is \'date\'');
          dateBox.close();
          dateBox.option('type', 'datetime');
          dateBox.open();
          assert.ok($dateBox.hasClass('dx-datebox-datetime'), 'strategy is changed');
          assert.equal($('.dx-calendar').length, 1, 'there is calendar in popup when type is \'datetime\'');
          assert.equal($('.dx-timeview').length, 1, 'there is timeview in popup when type is \'datetime\'');
        });
        QUnit.test('dxDateBox calendar popup should be closed after value is changed if applyValueMode=\'instantly\' (T189022)', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            applyValueMode: 'instantly'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.open();
          $(getInstanceWidget(dateBox).$element().find('.dx-calendar-cell:not(.dx-calendar-selected-date)').eq(0)).trigger('dxclick');
          assert.ok(!dateBox.option('opened'), 'dateBox popup is closed');
          assert.ok(!dateBox._popup.option('visible'), 'popup is not visible');
        });
        QUnit.test('dxDateBox\'s value change doesn\'t lead to strategy\'s widget value change until popup is opened', function(assert) {
          var firstValue = new Date(2015, 0, 20);
          var secondValue = new Date(2014, 4, 15);
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'date',
            value: firstValue
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.open();
          dateBox.close();
          var calendar = getInstanceWidget(dateBox);
          assert.deepEqual(firstValue, calendar.option('value'), 'values in datebox and calendar are the same');
          dateBox.option('value', secondValue);
          assert.deepEqual(firstValue, calendar.option('value'), 'value in calendar isn\'t changed');
          dateBox.open();
          this.clock.tick(10);
          assert.deepEqual(secondValue, calendar.option('value'), 'value in calendar is changed');
        });
        QUnit.test('dxDateBox\'s value change leads to strategy\'s widget value change if popup is opened', function(assert) {
          var firstValue = new Date(2015, 0, 20);
          var secondValue = new Date(2014, 4, 15);
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'date',
            value: firstValue
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.open();
          var calendar = getInstanceWidget(dateBox);
          assert.deepEqual(firstValue, calendar.option('value'), 'values in datebox and calendar are the same');
          dateBox.option('value', secondValue);
          dateBox.open();
          assert.deepEqual(secondValue, calendar.option('value'), 'value in calendar is changed');
        });
        QUnit.test('dxDateBox should hide or show its DDButton on showDropDownButton option change', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            showDropDownButton: true,
            value: new Date(),
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          assert.ok($dateBox.hasClass(DROP_DOWN_BUTTON_VISIBLE_CLASS));
          dateBox.option('showDropDownButton', false);
          assert.notOk($dateBox.hasClass(DROP_DOWN_BUTTON_VISIBLE_CLASS));
          dateBox.option('showDropDownButton', true);
          assert.ok($dateBox.hasClass(DROP_DOWN_BUTTON_VISIBLE_CLASS));
        });
        QUnit.test('buttons are removed after applyValueMode option is changed', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            applyValueMode: 'useButtons',
            pickerType: 'calendar',
            value: new Date()
          }).dxDateBox('instance');
          dateBox.open();
          var $buttons = $('.dx-datebox-wrapper .dx-toolbar .dx-button');
          assert.equal($buttons.length, 3, 'two buttons are rendered');
          dateBox.close();
          dateBox.option('applyValueMode', 'instantly');
          dateBox.open();
          $buttons = $('.dx-datebox-wrapper .dx-toolbar .dx-button');
          assert.equal($buttons.length, 0, 'no buttons are rendered');
        });
      });
      QUnit.module('merging dates', moduleConfig, function() {
        QUnit.test('dates should be merged correctly', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            value: new Date(2014, 10, 1, 11, 22),
            type: 'date',
            pickerType: 'native'
          });
          var instance = $element.dxDateBox('instance');
          var $input = $element.find('.' + TEXTEDITOR_INPUT_CLASS);
          var inputType = $input.prop('type');
          $input.val(prepareDateString(inputType, 2014, 10, 31));
          $input.triggerHandler('change');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 9, 31, 11, 22).valueOf(), 'date merged correctly');
          $input.val(prepareDateString(inputType, 2014, 11, '01'));
          $input.triggerHandler('change');
          assert.equal(instance.option('value').valueOf(), new Date(2014, 10, 1, 11, 22).valueOf(), 'date merged correctly');
        });
        QUnit.test('incorrect work of mergeDates function (B237850)', function(assert) {
          this.instance.option('type', 'date');
          this.instance.option('value', new Date(2000, 6, 31, 1, 1, 1));
          var $input = $(this.$input());
          var inputType = $input.prop('type');
          $input.val(prepareDateString(inputType, 2000, '09', '10')).trigger('change');
          assert.deepEqual(this.instance.option('value'), new Date(2000, 8, 10, 1, 1, 1));
        });
        QUnit.test('incorrect work of mergeDates function if previous value not valid (Q568689)', function(assert) {
          this.instance.option('type', 'time');
          var $input = $(this.$input());
          var inputType = $input.prop('type');
          $input.val('').trigger('change');
          assert.strictEqual(this.instance.option('value'), null);
          $input.val(inputType === 'text' ? '12:30 PM' : '12:30').trigger('change');
          var date = new Date(null);
          date.setHours(12, 30, 0);
          assert.deepEqual(this.instance.option('value'), date);
        });
        QUnit.test('if value isn\'t specified then Unix Epoch is default for an editor with type \'time\'', function(assert) {
          this.instance.option({
            type: 'time',
            pickerType: 'list',
            displayFormat: 'longTime'
          });
          $(this.$input()).val('1:1:16 AM').trigger('change');
          var value = this.instance.option('value');
          var defaultDate = new Date(null);
          assert.equal(value.getFullYear(), defaultDate.getFullYear(), 'correct year');
          assert.equal(value.getMonth(), defaultDate.getMonth(), 'correct month');
          assert.equal(value.getDate(), defaultDate.getDate(), 'correct date');
        });
        QUnit.test('mergeDates must merge seconds when type is \'time\'', function(assert) {
          this.instance.option({
            type: 'time',
            value: new Date(2000, 6, 31, 1, 1, 1),
            pickerType: 'list',
            displayFormat: 'longTime'
          });
          $(this.$input()).val('1:1:16 AM').trigger('change');
          assert.strictEqual(this.instance.option('value').getSeconds(), 16);
        });
        QUnit.test('mergeDates must merge milliseconds when type is \'time\'', function(assert) {
          this.instance.option({
            type: 'time',
            value: new Date(2000, 6, 31, 1, 1, 1),
            pickerType: 'list',
            displayFormat: 'millisecond'
          });
          $(this.$input()).val('16').trigger('change');
          assert.strictEqual(this.instance.option('value').getMilliseconds(), 16);
        });
      });
      QUnit.module('dateView integration', {
        beforeEach: function() {
          for (var args = [],
              $__5 = 0; $__5 < arguments.length; $__5++)
            args[$__5] = arguments[$__5];
          fx.off = true;
          this.originalInputType = support.inputType;
          support.inputType = function() {
            return false;
          };
          moduleConfig.beforeEach.apply(this, args);
          this.instance.option('pickerType', 'rollers');
          this.popup = $.proxy(function() {
            return this._popup;
          }, this.instance);
          this.popupTitle = function() {
            return this.popup()._$title.find('.dx-toolbar-label').text();
          };
          this.instance.open();
          this.dateView = function() {
            return getInstanceWidget(this.instance);
          };
        },
        afterEach: function() {
          for (var args = [],
              $__6 = 0; $__6 < arguments.length; $__6++)
            args[$__6] = arguments[$__6];
          moduleConfig.afterEach.apply(this, args);
          support.inputType = this.originalInputType;
          fx.off = false;
        }
      }, function() {
        QUnit.test('check DateView default config', function(assert) {
          var $__8 = this.dateView().option(),
              value = $__8.value,
              minDate = $__8.minDate,
              maxDate = $__8.maxDate;
          var FIFTY_YEARS = uiDateUtils.ONE_YEAR * 50;
          var defaultDate = new Date();
          defaultDate.setHours(0, 0, 0, 0);
          assert.deepEqual(value, defaultDate, 'default value is the current date');
          assert.deepEqual(minDate, new Date(1900, 0, 1), 'default min date is \'January 1 1900\'');
          this.clock.now += FIFTY_YEARS;
          assert.deepEqual(maxDate, new Date(), 'default max date is current date + 50 years');
        });
        QUnit.test('dateView renders', function(assert) {
          assert.equal(this.popup().$content().find('.dx-dateview').length, 1);
        });
        QUnit.test('dateView popup width should be equal to 100% on mobile ios', function(assert) {
          if (devices.real().deviceType !== 'phone' || devices.real().platform !== 'ios') {
            assert.ok(true, 'is actual only for mobile ios');
            return;
          }
          assert.strictEqual(this.popup().option('width'), '100%', 'popup width is equal to 100%');
        });
        QUnit.test('readOnly input prop should be always true to prevent keyboard open if simulated dateView is using', function(assert) {
          this.instance.option('readOnly', false);
          assert.ok(this.$element.find('.' + TEXTEDITOR_INPUT_CLASS).prop('readOnly'), 'readonly prop specified correctly');
        });
        QUnit.test('dateView shows on field click', function(assert) {
          assert.ok(this.instance.option('openOnFieldClick'));
        });
        QUnit.test('dateView \'minDate\' and \'maxDate\' matches dateBox \'min\' and \'max\' respectively', function(assert) {
          this.instance.option('min', new Date(2000, 1, 1));
          assert.deepEqual(this.dateView().option('minDate'), new Date(2000, 1, 1));
          this.instance.option('max', new Date(2001, 2, 2));
          assert.deepEqual(this.dateView().option('maxDate'), new Date(2001, 2, 2));
        });
        QUnit.test('dateView \'value\' and \'type\' matches dateBox \'value\' and \'type\' respectively', function(assert) {
          this.instance.option('value', new Date(2000, 1, 1));
          this.instance.open();
          assert.deepEqual(this.dateView().option('value'), new Date(2000, 1, 1));
          this.instance.close();
          this.instance.option('value', new Date(2000, 2, 2));
          this.instance.open();
          assert.deepEqual(this.dateView().option('value'), new Date(2000, 2, 2));
        });
        QUnit.test('dateView \'type\' option matches dateBox \'type\' option', function(assert) {
          this.instance.option('type', 'datetime');
          this.instance.open();
          assert.equal(getInstanceWidget(this.instance).option('type'), 'datetime');
          this.instance.option('type', 'time');
          this.instance.open();
          assert.equal(getInstanceWidget(this.instance).option('type'), 'time');
        });
        QUnit.test('dateView should be updated on popup opening and closing (T578764)', function(assert) {
          this.instance.close();
          this.instance.option('value', new Date(2000, 2, 2));
          this.instance.open();
          assert.deepEqual(this.dateView().option('value'), new Date(2000, 2, 2), 'update on opening when value changed via api');
          this.dateView().option('value', new Date(2001, 1, 3));
          this.instance.close();
          assert.deepEqual(this.dateView().option('value'), new Date(2000, 2, 2), 'update on closing when value was not applied');
        });
        QUnit.test('dateView should not update dateBox value after closing using \'close\' method', function(assert) {
          this.instance.option('value', new Date(2000, 1, 1));
          this.instance.open();
          this.dateView().option('value', new Date(2000, 2, 2));
          assert.deepEqual(this.instance.option('value'), new Date(2000, 1, 1));
          this.instance.close();
          assert.deepEqual(this.instance.option('value'), new Date(2000, 1, 1));
        });
        QUnit.test('dateBox should use actual rollers value as a new date if click to the DateBox Apply button without any rollers navigation (T860282)', function(assert) {
          this.instance.option({
            'max': new Date(2000, 1, 1),
            'opened': false
          });
          this.instance.open();
          $(this.popup().$overlayContent()).find(APPLY_BUTTON_SELECTOR).trigger('dxclick');
          assert.deepEqual(this.instance.option('value'), new Date(2000, 1, 1));
        });
        QUnit.test('render simulated dateView title when using option \'placeholder\'', function(assert) {
          this.instance.option({placeholder: 'test'});
          this.dateView().option({cancelButton: false});
          this.instance.open();
          assert.equal(this.popupTitle(), 'test', 'title in simulated dateView rendered correctly, when using option \'placeholder\' in dateBox');
          this.instance.option('placeholder', 'new title');
          assert.equal(this.popupTitle(), 'new title', 'option changed successfully');
        });
        QUnit.test('specify dataPicker title, dependent from \'type\' option, when \'placeholder\' option is not defined', function(assert) {
          this.instance.option({
            type: 'date',
            placeholder: ''
          });
          this.dateView().option({cancelButton: false});
          this.instance.open();
          assert.equal(this.popupTitle(), messageLocalization.format('dxDateBox-simulatedDataPickerTitleDate'), 'title set correctly when \'placeholder\' option is not defined');
          this.instance.option('type', 'time');
          this.instance.open();
          assert.equal(this.popupTitle(), messageLocalization.format('dxDateBox-simulatedDataPickerTitleTime'), 'title changed successfully when type set in \'time\'');
          this.instance.option('type', 'datetime');
          this.instance.open();
          assert.equal(this.popupTitle(), messageLocalization.format('dxDateBox-simulatedDataPickerTitleDate'), 'title changed successfully when type set in \'datetime\'');
          this.instance.option('type', 'date');
          this.instance.open();
          assert.equal(this.popupTitle(), messageLocalization.format('dxDateBox-simulatedDataPickerTitleDate'), 'title changed successfully when type set in \'date\'');
        });
        QUnit.test('cancel & done button action', function(assert) {
          var date = new Date(2012, 9, 10);
          var minDate = new Date(2000, 1);
          this.instance.option({
            min: minDate,
            value: date
          });
          var rollers = this.dateView()._rollers;
          rollers.day.option('selectedIndex', 12);
          rollers.month.option('selectedIndex', 10);
          rollers.year.option('selectedIndex', 2);
          $(this.popup().$overlayContent()).find(APPLY_BUTTON_SELECTOR).trigger('dxclick');
          assert.deepEqual(this.instance.option('value'), new Date(2002, 10, 13));
          this.instance.open();
          rollers = this.dateView()._rollers;
          rollers.day.option('selectedIndex', 10);
          rollers.month.option('selectedIndex', 8);
          rollers.year.option('selectedIndex', 0);
          $(this.popup().$overlayContent()).find('.dx-popup-cancel.dx-button').trigger('dxclick');
          assert.deepEqual(this.instance.option('value'), new Date(2002, 10, 13));
        });
        QUnit.test('specify dataPicker title, independent from \'type\' option, when \'placeholder\' option is defined', function(assert) {
          this.instance.option({
            type: 'date',
            placeholder: 'custom title'
          });
          this.instance.open();
          this.instance.option('type', 'time');
          this.instance.open();
          assert.equal(this.popupTitle(), 'custom title', 'custom title set successfully when type has been changed');
          this.instance.option('placeholder', '');
          this.instance.open();
          assert.equal(this.popupTitle(), messageLocalization.format('dxDateBox-simulatedDataPickerTitleTime'), 'title set successfully when \'placeholder\' option set to \'\'');
        });
        QUnit.test('Native datebox should have specific class', function(assert) {
          var $element = $('#dateBox').dxDateBox({pickerType: 'native'});
          assert.ok($element.hasClass('dx-datebox-native'), 'class is correct');
          assert.equal($element.dxDateBox('instance')._strategy.NAME, 'Native', 'correct strategy is chosen');
        });
        QUnit.test('pickerType should be \'native\' on android >= 4.4 (Q588373, Q588012)', function(assert) {
          support.inputType = function() {
            return true;
          };
          var originalDevice = devices.real();
          var currentDevice = devices.current();
          try {
            devices.real({
              platform: 'android',
              deviceType: 'phone',
              version: [4, 4, 2],
              android: true
            });
            devices.current({platform: 'android'});
            var dateBox = $('#dateBoxWithPicker').dxDateBox().dxDateBox('instance');
            assert.strictEqual(dateBox.option('pickerType'), 'native');
          } finally {
            support.inputType = this.originalInputType;
            devices.real(originalDevice);
            devices.current(currentDevice);
          }
        });
        QUnit.test('B230631 - Can not clear datebox field', function(assert) {
          this.instance.option({
            value: new Date(),
            type: 'datetime'
          });
          this.instance.open();
          var kb = keyboardMock(this.$input());
          clearInput(this.$input(), kb);
          kb.change();
          assert.equal(this.$input().val(), '');
          assert.equal(this.instance.option('value'), undefined);
        });
        QUnit.test('B236537 - onValueChanged event does not fire', function(assert) {
          var valueUpdated = false;
          this.instance.option({onValueChanged: function() {
              valueUpdated = true;
            }});
          assert.ok(!valueUpdated);
          this.instance.option('value', new Date(2012, 10, 26, 16, 40, 23));
          assert.ok(valueUpdated);
        });
        QUnit.test('B251997 - date picker is shown in spite of \'readOnly\' is true', function(assert) {
          var originalSupportInputType = support.inputType;
          support.inputType = function() {
            return false;
          };
          try {
            this.instance.close();
            this.instance.option({
              readOnly: true,
              pickerType: 'rollers'
            });
            var $wrapper = this.$element.find('.dx-dropdowneditor-input-wrapper');
            $wrapper.trigger('dxclick');
            assert.notOk(this.popup().option('visible'), 'popup is hidden');
            this.instance.option({readOnly: false});
            $wrapper.trigger('dxclick');
            assert.ok(this.popup().option('visible'), 'popup is shown');
            assert.ok(this.popup().$content().find('.dx-dateview').is(':visible'), 'picker is shown');
          } finally {
            support.inputType = originalSupportInputType;
          }
        });
        QUnit.test('Q559762 - input does not clear input value Samsung Android 4.1 devices', function(assert) {
          assert.equal(this.$input().attr('autocomplete'), 'off');
        });
        QUnit.test('T170478 - no picker rollers should be chosen after click on \'cancel\' button', function(assert) {
          var $__3 = this;
          this.clock.restore();
          var done = assert.async();
          setTimeout(function() {
            var pointer = pointerMock($('.dx-dateviewroller').eq(0).find('.dx-scrollable-container'));
            assert.equal($('.dx-dateviewroller-current').length, 0, 'no rollers are chosen after widget is opened first time');
            pointer.start().down().move(0, -20).up();
            assert.equal($('.dx-dateviewroller-current').length, 1, 'one roller is chosen after scrolling');
            $('.dx-popup-cancel').trigger('dxclick');
            $__3.instance.open();
            assert.equal($('.dx-dateviewroller-current').length, 0, 'no rollers are chosen after widget is opened second time');
            done();
          }, RESIZE_WAIT_TIMEOUT);
        });
        QUnit.test('T207178 - error should not be thrown if value is null', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            pickerType: 'rollers'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          try {
            dateBox.open();
            assert.ok(true, 'error is not thrown');
          } catch (e) {
            assert.ok(false, 'error is thrown');
          }
        });
        QUnit.test('T319042 - input value should be correct if picker type is \'rollers\' and \'type\' is \'time\'', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date(0, 0, 0, 15, 32),
            pickerType: 'rollers',
            type: 'time'
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          assert.equal($input.val(), '3:32 PM', 'input value is correct');
        });
        QUnit.test('the next value after null should have zero time components when type = \'date\' (T407518)', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            value: null,
            pickerType: 'rollers',
            type: 'date',
            opened: true
          }).dxDateBox('instance');
          $('.' + DATEBOX_WRAPPER_CLASS).find(APPLY_BUTTON_SELECTOR).trigger('dxclick');
          var value = instance.option('value');
          assert.equal(value.getHours(), 0, 'hours component is 0');
          assert.equal(value.getMinutes(), 0, 'minutes component is 0');
          assert.equal(value.getSeconds(), 0, 'seconds component is 0');
          assert.equal(value.getMilliseconds(), 0, 'milliseconds component is 0');
        });
        QUnit.test('Gesture cover should be hidden after wheel event processed by Overlay emitter (T820405)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'gesture cover element is specific for desktop');
            return;
          }
          var pointer = pointerMock($('.dx-dateviewroller').eq(0).find('.dx-scrollable-container'));
          assert.equal($('.dx-dateviewroller-current').length, 0, 'no rollers are chosen after widget is opened first time');
          pointer.start().move(1).wheel(-20);
          var $gestureCover = $(("." + GESTURE_COVER_CLASS));
          var initialPointerEvents = $gestureCover.css('pointerEvents');
          assert.strictEqual($gestureCover.length, 1, 'gesture cover element created');
          assert.strictEqual(initialPointerEvents, 'none', 'correct default state');
          pointer.down().move(1).wheel(-20);
          assert.strictEqual($gestureCover.css('pointerEvents'), initialPointerEvents, 'correct default state');
        });
      });
      QUnit.module('widget sizing render', {}, function() {
        QUnit.test('default', function(assert) {
          var $element = $('#dateBox').dxDateBox();
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('widget shouldn\'t be wider than a container', function(assert) {
          var $element = $('#innerDateBox').dxDateBox();
          var instance = $element.dxDateBox('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.ok($element.outerWidth() <= 100, 'outer width of the element must be less or equal to a container width');
        });
        QUnit.test('validation icon should hide if container size is too small', function(assert) {
          var $element = $('#innerDateBox').dxDateBox({
            'showClearButton': true,
            'pickerType': 'calendar'
          });
          var instance = $element.dxDateBox('instance');
          assert.notOk($element.hasClass(SHOW_INVALID_BADGE_CLASS), 'validation icon\'s hidden');
          $('#containerWithWidth').get(0).style.width = '200px';
          var kb = keyboardMock(instance._input());
          kb.type('a');
          kb.keyDown('enter');
          assert.ok($element.hasClass(SHOW_INVALID_BADGE_CLASS), 'validation icon\'s visible');
        });
        QUnit.test('component should have correct width when it was rendered in a scaled container (T584097)', function(assert) {
          var $parent = $('#parent-div');
          $parent.css('width', 200);
          var $element = $('#dateBox').appendTo($parent);
          var component = $('#dateBox').dxDateBox({width: undefined}).dxDateBox('instance');
          var initialWidth = $element.get(0).getBoundingClientRect().width;
          $parent.css('transform', 'scale(0.5)');
          component.repaint();
          $parent.css('transform', 'scale(1)');
          var actualWidth = component.$element().get(0).getBoundingClientRect().width;
          assert.strictEqual(actualWidth, initialWidth, 'component has correct width');
        });
        QUnit.test('component width calculation should consider buttons containers element', function(assert) {
          var $parent = $('#parent-div');
          $parent.css('display', 'inline-block');
          var $element = $('#dateBox').appendTo($parent);
          var component = $('#dateBox').dxDateBox({
            width: undefined,
            pickerType: 'calendar',
            showDropDownButton: false
          }).dxDateBox('instance');
          var initialWidth = $element.get(0).getBoundingClientRect().width;
          var instance = $element.dxDateBox('instance');
          instance.option('showDropDownButton', true);
          var actualWidth = component.$element().get(0).getBoundingClientRect().width;
          var buttonWidth = $(("." + BUTTONS_CONTAINER_CLASS)).get(0).getBoundingClientRect().width;
          assert.strictEqual(actualWidth, initialWidth + buttonWidth);
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#dateBox').dxDateBox({pickerType: 'rollers'});
          var instance = $element.dxDateBox('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('datebox and calendar integration', function() {
        QUnit.test('default', function(assert) {
          var $element = $('#dateBox').dxDateBox({pickerType: 'calendar'});
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#dateBox').dxDateBox({pickerType: 'calendar'});
          var instance = $element.dxDateBox('instance');
          var customWidth = 258;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
        QUnit.test('change input value should change calendar value', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'date',
            value: new Date(2016, 1, 25)
          });
          $($dateBox.find(("." + DROP_DOWN_BUTTON_CLASS))).trigger('dxclick');
          var dateBox = $dateBox.dxDateBox('instance');
          var calendar = $('.dx-calendar').dxCalendar('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var dateString = $input.val();
          dateString = dateString.slice(0, -1) + String(new Date().getYear() - 1).slice(-1);
          $input.val('');
          keyboardMock($input).type(dateString);
          $($input).trigger('change');
          assert.deepEqual(calendar.option('value'), dateBox.option('value'), 'datebox value and calendar value are equal');
          assert.strictEqual(dateBox.option('isValid'), true, 'Editor should be marked as true');
          assert.strictEqual(dateBox.option('validationError'), null, 'No validation error should be specified for valid input');
        });
        QUnit.test('wrong value in input should mark datebox as invalid', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          keyboardMock($input).type('blabla');
          $($input).trigger('change');
          assert.equal($input.val(), 'blabla', 'input value should not be erased');
          assert.strictEqual(dateBox.option('value'), null, 'Editor\'s value should be reset');
          assert.strictEqual(dateBox.option('isValid'), false, 'Editor should be marked as invalid');
          var validationError = dateBox.option('validationError');
          assert.ok(validationError, 'Validation error should be specified');
          assert.ok(validationError.editorSpecific, 'editorSpecific flag should be added');
        });
        QUnit.test('datebox should not be revalidated when readOnly option changed', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({readOnly: false}).dxValidator({validationRules: [{
              type: 'required',
              message: 'Date of birth is required'
            }]}).dxDateBox('instance');
          dateBox.option('readOnly', true);
          dateBox.option('readOnly', false);
          assert.ok(dateBox.option('isValid'), 'dateBox is valid');
          assert.notOk($('#dateBox').hasClass('dx-invalid'), 'dateBox is not marked as invalid');
        });
        QUnit.test('wrong value in input should mark time datebox as invalid', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            type: 'time',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          keyboardMock($input).type('blabla');
          $($input).trigger('change');
          assert.equal($input.val(), 'blabla', 'input value should not be erased');
          assert.strictEqual(dateBox.option('value'), null, 'Editor\'s value should be reset');
          assert.strictEqual(dateBox.option('isValid'), false, 'Editor should be marked as invalid');
          var validationError = dateBox.option('validationError');
          assert.ok(validationError, 'Validation error should be specified');
          assert.ok(validationError.editorSpecific, 'editorSpecific flag should be added');
        });
        QUnit.test('wrong value in input should mark pre-filled datebox as invalid', function(assert) {
          var value = new Date(2013, 2, 2);
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: new Date(value),
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $input.val('');
          keyboardMock($input).type('blabla');
          $($input).trigger('change');
          assert.equal($input.val(), 'blabla', 'input value should not be erased');
          assert.deepEqual(dateBox.option('value'), value, 'Editor\'s value should not be changed');
          assert.strictEqual(dateBox.option('isValid'), false, 'Editor should be marked as invalid');
          var validationError = dateBox.option('validationError');
          assert.ok(validationError, 'Validation error should be specified');
          assert.ok(validationError.editorSpecific, 'editorSpecific flag should be added');
        });
        QUnit.test('correct value in input should mark datebox as valid but keep text', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          keyboard.type('blabla').change();
          $input.val('');
          keyboard.type('3/2/2014').change();
          assert.equal($input.val(), '3/2/2014', 'input value should not be erased');
          assert.deepEqual(dateBox.option('value'), new Date(2014, 2, 2), 'Editor\'s value should be set');
          assert.strictEqual(dateBox.option('isValid'), true, 'Editor should be marked as valid');
          assert.strictEqual(dateBox.option('validationError'), null, 'No validation error should be specified for valid input');
        });
        QUnit.test('calendar picker should be used on generic device by default and \'type\' is \'date\'', function(assert) {
          var currentDevice = devices.current();
          var realDevice = devices.real();
          devices.real({
            platform: 'generic',
            deviceType: 'desktop',
            phone: false
          });
          devices.current({deviceType: 'desktop'});
          try {
            var $dateBox = $('#dateBox').dxDateBox();
            var instance = $dateBox.dxDateBox('instance');
            assert.equal(instance.option('pickerType'), 'calendar');
            assert.equal(instance._strategy.NAME, 'Calendar');
          } finally {
            devices.current(currentDevice);
            devices.real(realDevice);
          }
        });
        QUnit.test('calendar picker should not be used on generic device by default and \'type\' is not \'date\'', function(assert) {
          var currentDevice = devices.current();
          devices.current({
            platform: 'generic',
            deviceType: 'desktop'
          });
          try {
            var $dateBox = $('#dateBox').dxDateBox({
              pickerType: 'calendar',
              type: 'time'
            });
            assert.ok(!$dateBox.hasClass(DATEBOX_CLASS + '-calendar'));
          } finally {
            devices.current(currentDevice);
          }
        });
        QUnit.test('calendar picker should not be used on mobile device by default', function(assert) {
          var realDevice = devices.real();
          devices.real({platform: 'android'});
          try {
            var $dateBox = $('#dateBox').dxDateBox();
            assert.ok(!$dateBox.hasClass(DATEBOX_CLASS + '-calendar'));
          } finally {
            devices.real(realDevice);
          }
        });
        QUnit.test('correct default value for \'minZoomLevel\' option', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            opened: true
          }).dxDateBox('instance');
          var calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('minZoomLevel'), 'century', '\'minZoomLevel\' option value is correct');
        });
        QUnit.test('correct default value for \'maxZoomLevel\' option', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            opened: true
          }).dxDateBox('instance');
          var calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('maxZoomLevel'), 'month', '\'maxZoomLevel\' option value is correct');
        });
        QUnit.test('DateBox \'minZoomLevel\' option should affect on Calendar \'minZoomLevel\' option', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            calendarOptions: {minZoomLevel: 'year'},
            opened: true
          }).dxDateBox('instance');
          var calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('minZoomLevel'), 'year', 'calendar \'minZoomLevel\' option is correct on init');
          instance.close();
          instance.option('calendarOptions.minZoomLevel', 'month');
          instance.open();
          calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('minZoomLevel'), 'month', 'calendar \'minZoomLevel\' option after dateBox option change');
        });
        QUnit.test('DateBox \'maxZoomLevel\' option should affect on Calendar \'maxZoomLevel\' option', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            calendarOptions: {maxZoomLevel: 'century'},
            opened: true
          }).dxDateBox('instance');
          var calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('maxZoomLevel'), 'century', 'calendar \'maxZoomLevel\' option is correct on init');
          instance.close();
          instance.option('calendarOptions.maxZoomLevel', 'year');
          instance.open();
          calendar = getInstanceWidget(instance);
          assert.equal(calendar.option('maxZoomLevel'), 'year', 'calendar \'maxZoomLevel\' option after dateBox option change');
        });
        QUnit.test('T208534 - calendar value should depend on datebox text option', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            valueChangeEvent: 'keyup'
          }).dxDateBox('instance');
          var kb = keyboardMock(instance._input());
          kb.press('end').press('backspace').type('4');
          instance.open();
          assert.deepEqual(new Date(2014, 4, 12), instance._strategy._widget.option('value'), 'calendar value is correct');
        });
        QUnit.test('calendar value should depend on datebox text option when calendar is opened', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            valueChangeEvent: 'keyup',
            opened: true
          }).dxDateBox('instance');
          var kb = keyboardMock(instance._input());
          var calendar = instance._strategy._widget;
          kb.caret(9).press('backspace').type('4');
          assert.deepEqual(new Date(2014, 4, 12), calendar.option('value'), 'calendar value is correct');
          kb.press('backspace');
          assert.deepEqual(new Date(201, 4, 12), calendar.option('value'), 'calendar value is correct');
          kb.type('3');
          assert.deepEqual(new Date(2013, 4, 12), calendar.option('value'), 'calendar value is correct');
        });
        QUnit.test('changing \'displayFormat\' should update input value', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date('03/10/2015'),
            pickerType: 'calendar',
            type: 'date'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.option('displayFormat', 'shortDateShortTime');
          assert.equal($dateBox.find('.' + TEXTEDITOR_INPUT_CLASS).val(), '3/10/2015, 12:00 AM', 'input value is updated');
        });
        QUnit.test('displayFormat should affect on timeView', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date('03/10/2015'),
            displayFormat: 'shortdateshorttime',
            pickerType: 'calendar',
            opened: true,
            type: 'datetime'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $content = $(dateBox._popup.$content());
          var timeView = $content.find('.' + TIMEVIEW_CLASS).dxTimeView('instance');
          assert.notOk(timeView.option('use24HourFormat'), 'using 12 hour format');
          dateBox.option('displayFormat', 'hour');
          assert.ok(timeView.option('use24HourFormat'), 'using 24 hour format');
        });
        QUnit.test('disabledDates correctly displays', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            disabledDates: [new Date(2015, 4, 13)],
            opened: true
          }).dxDateBox('instance');
          var calendar = getInstanceWidget(instance);
          var $disabledCell = calendar.$element().find('.dx-calendar-empty-cell');
          assert.equal($disabledCell.length, 1, 'There is one disabled cell');
          assert.equal($disabledCell.text(), '13', 'Correct cell is disabled');
        });
        QUnit.test('disabledDates should not be called for the dates out of range[min, max]', function(assert) {
          var callCount = 0;
          $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2019, 11, 10),
            min: new Date(2019, 11, 15),
            max: new Date(2019, 11, 20),
            disabledDates: function() {
              ++callCount;
              return true;
            },
            opened: true
          }).dxDateBox('instance');
          assert.equal(callCount, 12, 'disabledDates has been called 6 times on init, 6 times on [min; max] for focusing');
        });
        QUnit.test('disabledDates correctly displays after optionChanged', function(assert) {
          var instance = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            disabledDates: [new Date(2015, 4, 13)],
            opened: true
          }).dxDateBox('instance');
          instance.option('disabledDates', function(e) {
            if (e.date.getDate() === 14 && e.date.getMonth() === 3) {
              return true;
            }
          });
          var calendar = getInstanceWidget(instance);
          var $disabledCell = calendar.$element().find('.dx-calendar-empty-cell');
          assert.equal($disabledCell.length, 1, 'There is one disabled cell');
          assert.equal($disabledCell.text(), '14', 'Correct cell is disabled');
        });
        QUnit.test('disabledDates argument contains correct component parameter', function(assert) {
          var stub = sinon.stub();
          $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            disabledDates: stub,
            opened: true
          });
          var component = stub.lastCall.args[0].component;
          assert.equal(component.NAME, 'dxDateBox', 'Correct component');
        });
        QUnit.test('datebox with the \'datetime\' type should keep event subscriptions', function(assert) {
          var stub = sinon.stub();
          var dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            adaptivityEnabled: true,
            onInitialized: function(e) {
              e.component.on('optionChanged', stub);
            }
          }).dxDateBox('instance');
          assert.equal(stub.callCount, 1, 'set text on render');
          dateBox.option('opened', true);
          assert.equal(stub.callCount, 2, '\'opened\' optionChanged event has been raised');
        });
        QUnit.test('Today button should be hidden if calendar is hidden', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'datetime',
            calendarOptions: {visible: false},
            opened: true
          });
          var instance = $element.dxDateBox('instance');
          var $todayButton = $(instance.content()).parent().find('.dx-button-today');
          assert.strictEqual($todayButton.length, 0);
        });
        QUnit.test('Today button should be hidden if calendar visibility is changed', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'datetime',
            opened: true
          });
          var instance = $element.dxDateBox('instance');
          instance.option('calendarOptions.visible', false);
          assert.strictEqual($(instance.content()).parent().find('.dx-button-today').length, 0);
          instance.option('calendarOptions.visible', true);
          assert.strictEqual($(instance.content()).parent().find('.dx-button-today').length, 1);
        });
      });
      QUnit.module('datebox w/ calendar', {
        beforeEach: function() {
          var $__3 = this;
          this.clock = sinon.useFakeTimers(new Date().valueOf());
          fx.off = true;
          this.fixture = new DevExpress.ui.testing.DateBoxFixture('#dateBox', {
            value: currentDate,
            calendarOptions: {
              currentDate: currentDate,
              firstDayOfWeek: firstDayOfWeek
            },
            pickerType: 'calendar'
          });
          this.reinitFixture = function(options) {
            $__3.fixture.dispose();
            $__3.fixture = new DevExpress.ui.testing.DateBoxFixture('#dateBox', options);
          };
        },
        afterEach: function() {
          this.fixture.dispose();
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('DateBox is defined', function(assert) {
          assert.ok(this.fixture.dateBox);
        });
        QUnit.test('DateBox can be instantiated', function(assert) {
          assert.ok(this.fixture.dateBox instanceof DateBox);
        });
        QUnit.test('DateBox must render an input', function(assert) {
          assert.ok(this.fixture.input.length);
        });
        QUnit.test('open must set \'opened\' option', function(assert) {
          assert.ok(!this.fixture.dateBox.option('opened'));
          this.fixture.dateBox.open();
          assert.ok(this.fixture.dateBox.option('opened'));
        });
        QUnit.test('calendarOptions must be passed to dxCalendar on initialization', function(assert) {
          this.fixture.dateBox.open();
          currentDate.setDate(1);
          assert.deepEqual(getInstanceWidget(this.fixture.dateBox).option('currentDate'), currentDate);
          assert.deepEqual(getInstanceWidget(this.fixture.dateBox).option('firstDayOfWeek'), firstDayOfWeek);
        });
        QUnit.test('Clicking _calendarContainer must not close dropDown', function(assert) {
          this.fixture.dateBox.open();
          pointerMock(this.fixture.dateBox._calendarContainer).click();
          assert.ok(this.fixture.dateBox.option('opened'));
        });
        QUnit.test('DateBox must update the input value when the value option changes', function(assert) {
          var date = new Date(2011, 11, 11);
          this.fixture.dateBox.option('value', date);
          assert.deepEqual(this.fixture.input.val(), dateLocalization.format(date, this.fixture.format));
        });
        QUnit.test('DateBox must immediately display \'value\' passed via the constructor on rendering', function(assert) {
          var date = new Date(2010, 10, 10);
          this.reinitFixture({
            value: date,
            calendarOptions: {
              currentDate: currentDate,
              firstDayOfWeek: firstDayOfWeek
            },
            pickerType: 'calendar'
          });
          assert.deepEqual(this.fixture.input.val(), dateLocalization.format(date, this.fixture.format));
        });
        QUnit.test('DateBox must pass value to calendar correctly if value is empty string', function(assert) {
          this.reinitFixture({
            value: '',
            pickerType: 'calendar',
            opened: true
          });
          assert.equal(this.fixture.dateBox._strategy._widget.option('value'), null, 'value is correctly');
        });
        QUnit.test('DateBox must show the calendar with a proper date selected', function(assert) {
          var date = new Date(2011, 11, 11);
          this.fixture.dateBox.option('value', date);
          this.fixture.dateBox.open();
          assert.deepEqual(getInstanceWidget(this.fixture.dateBox).option('value'), date);
        });
        QUnit.test('DateBox must update its value when a date is selected in the calendar when applyValueMode=\'instantly\'', function(assert) {
          var date = new Date(2011, 11, 11);
          this.reinitFixture({
            applyValueMode: 'instantly',
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          getInstanceWidget(this.fixture.dateBox).option('value', date);
          assert.strictEqual(this.fixture.dateBox.option('value'), date);
        });
        QUnit.test('DateBox must update the calendar value when the CalendarPicker.option(\'value\') changes', function(assert) {
          this.reinitFixture({
            applyValueMode: 'useButtons',
            pickerType: 'calendar'
          });
          var date = new Date(2011, 11, 11);
          this.fixture.dateBox.open();
          this.fixture.dateBox.option('value', date);
          assert.deepEqual(getInstanceWidget(this.fixture.dateBox).option('value'), date);
        });
        QUnit.test('When typing a correct date, dateBox must not make a redundant _setInputValue call', function(assert) {
          var _setInputValueCallCount = 0;
          var mockSetInputValue = function() {
            ++_setInputValueCallCount;
          };
          this.fixture.dateBox._setInputValue = mockSetInputValue;
          this.fixture.dateBox.open();
          this.fixture.typeIntoInput('11/11/2011', this.fixture.input);
          assert.strictEqual(_setInputValueCallCount, 0);
        });
        QUnit.test('Swiping must not close the calendar', function(assert) {
          $(this.fixture.dateBox._input()).focus();
          this.fixture.dateBox.open();
          pointerMock(this.fixture.dateBox._strategy._calendarContainer).start().swipeStart().swipeEnd(1);
          assert.strictEqual(this.fixture.dateBox._input()[0], getActiveElement());
        });
        QUnit.test('Pressing escape must hide the calendar and clean focus', function(assert) {
          var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
          this.fixture.dateBox.option('focusStateEnabled', true);
          this.fixture.dateBox.open();
          $(this.fixture.dateBox._input()).trigger(escapeKeyDown);
          assert.ok(!this.fixture.dateBox.option('opened'));
          assert.ok(!this.fixture.dateBox._input().is(':focus'));
        });
        QUnit.test('dateBox must show the calendar with proper LTR-RTL mode', function(assert) {
          this.fixture.dateBox.option('rtlEnabled', true);
          this.fixture.dateBox.open();
          assert.ok(getInstanceWidget(this.fixture.dateBox).option('rtlEnabled'));
        });
        QUnit.test('dateBox should not reposition the calendar icon in RTL mode', function(assert) {
          var iconRepositionCount = 0;
          var _repositionCalendarIconMock = function() {
            ++iconRepositionCount;
          };
          this.fixture.dateBox._repositionCalendarIcon = _repositionCalendarIconMock;
          this.fixture.dateBox.option('rtl', true);
          assert.strictEqual(iconRepositionCount, 0);
        });
        QUnit.test('dateBox must apply the wrapper class with appropriate picker type to the drop-down overlay wrapper', function(assert) {
          var dateBox = this.fixture.dateBox;
          dateBox.open();
          assert.ok(this.fixture.dateBox._popup.$wrapper().hasClass(DATEBOX_WRAPPER_CLASS + '-' + dateBox.option('pickerType')));
        });
        QUnit.test('dateBox must correctly reopen the calendar after refreshing when it was not hidden beforehand', function(assert) {
          this.fixture.dateBox.open();
          this.fixture.dateBox._refresh();
          assert.ok(this.fixture.dateBox._$popup.dxPopup('instance').option('visible'));
        });
        QUnit.test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          this.fixture.dateBox.option('onValueChanged', function() {
            assert.ok(true);
          });
          this.fixture.dateBox.option('value', new Date(2015, 6, 14));
        });
        QUnit.test('dateBox\'s \'min\' and \'max\' options equal to undefined (T171537)', function(assert) {
          assert.strictEqual(this.fixture.dateBox.option('min'), undefined);
          assert.strictEqual(this.fixture.dateBox.option('max'), undefined);
        });
        QUnit.test('dateBox must pass min and max to the created calendar', function(assert) {
          var min = new Date(2010, 9, 10);
          var max = new Date(2010, 11, 10);
          this.reinitFixture({
            min: min,
            max: max,
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          assert.ok(dateUtils.dateInRange(getInstanceWidget(this.fixture.dateBox).option('currentDate'), min, max));
        });
        QUnit.test('dateBox should not change value when setting to an earlier date than min; and setting to a later date than max', function(assert) {
          var min = new Date(2010, 10, 5);
          var max = new Date(2010, 10, 25);
          var earlyDate = new Date(min.getFullYear(), min.getMonth(), min.getDate() - 1);
          var lateDate = new Date(max.getFullYear(), max.getMonth(), max.getDate() + 1);
          this.reinitFixture({
            min: min,
            max: max,
            pickerType: 'calendar'
          });
          this.fixture.dateBox.option('value', earlyDate);
          assert.deepEqual(this.fixture.dateBox.option('value'), earlyDate);
          this.fixture.dateBox.option('value', lateDate);
          assert.deepEqual(this.fixture.dateBox.option('value'), lateDate);
        });
        QUnit.test('should execute custom validator while validation state reevaluating', function(assert) {
          this.reinitFixture({opened: true});
          var dateBox = this.fixture.dateBox;
          dateBox.$element().dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: function() {
                return false;
              }
            }]});
          var cell = dateBox._popup.$wrapper().find(("." + CALENDAR_CELL_CLASS));
          assert.ok(dateBox.option('isValid'));
          assert.strictEqual(dateBox.option('text'), '');
          $(cell).trigger('dxclick');
          assert.notOk(dateBox.option('isValid'));
          assert.notStrictEqual(dateBox.option('text'), '');
        });
        QUnit.test('should rise validation event once after value is changed by calendar (T714599)', function(assert) {
          var validationCallbackStub = sinon.stub().returns(false);
          var dateBox = $('#dateBoxWithPicker').dxDateBox({
            type: 'datetime',
            pickerType: 'calendar',
            value: new Date(2015, 5, 9, 15, 54, 13),
            opened: true
          }).dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: validationCallbackStub
            }]}).dxDateBox('instance');
          $(("." + CALENDAR_CELL_CLASS)).eq(0).trigger('dxclick');
          $(APPLY_BUTTON_SELECTOR).trigger('dxclick');
          assert.notOk(dateBox.option('opened'));
          assert.ok(validationCallbackStub.calledOnce);
        });
        QUnit.test('Editor should reevaluate validation state after change text to the current value', function(assert) {
          this.reinitFixture({
            min: new Date(2010, 10, 5),
            value: new Date(2010, 10, 10),
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          $(dateBox._input()).val('11/3/2010').change();
          assert.notOk(dateBox.option('isValid'), 'Editor isn\'t valid');
          assert.equal(dateBox.option('text'), '11/3/2010');
          dateBox.open();
          var $selectedDate = dateBox._popup.$wrapper().find('.dx-calendar-selected-date');
          $($selectedDate).trigger('dxclick');
          assert.ok(dateBox.option('isValid'), 'Editor is valid');
          assert.equal(dateBox.option('text'), '11/10/2010');
        });
        QUnit.test('In dateTime strategy buttons should be placed in popup bottom', function(assert) {
          this.reinitFixture({
            type: 'datetime',
            applyValueMode: 'useButtons',
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          assert.equal($('.dx-popup-bottom .dx-button').length, 3, 'two buttons is in popup bottom');
        });
        QUnit.test('Click on apply button', function(assert) {
          var onValueChangedHandler = sinon.spy(noop);
          var newDate = new Date(2010, 10, 10);
          this.reinitFixture({
            onValueChanged: onValueChangedHandler,
            applyValueMode: 'useButtons',
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          getInstanceWidget(this.fixture.dateBox).option('value', newDate);
          $(APPLY_BUTTON_SELECTOR).eq(0).trigger('dxclick');
          assert.equal(this.fixture.dateBox.option('opened'), false);
          assert.deepEqual(this.fixture.dateBox.option('value'), newDate);
          assert.ok(onValueChangedHandler.calledOnce);
        });
        QUnit.test('Click on cancel button', function(assert) {
          var onValueChangedHandler = sinon.spy(noop);
          var oldDate = new Date(2008, 8, 8);
          var newDate = new Date(2010, 10, 10);
          this.reinitFixture({
            value: oldDate,
            onValueChanged: onValueChangedHandler,
            applyValueMode: 'useButtons',
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          getInstanceWidget(this.fixture.dateBox).option('value', newDate);
          $('.dx-popup-cancel.dx-button').eq(0).trigger('dxclick');
          assert.equal(this.fixture.dateBox.option('opened'), false);
          assert.equal(this.fixture.dateBox.option('value'), oldDate);
          assert.ok(!onValueChangedHandler.calledOnce);
        });
        QUnit.test('calendar does not open on field click (T189394)', function(assert) {
          assert.ok(!this.fixture.dateBox.option('openOnFieldClick'));
        });
        var getLongestCaptionIndex = uiDateUtils.getLongestCaptionIndex;
        var getLongestDate = uiDateUtils.getLongestDate;
        QUnit.test('getLongestDate must consider the possibility of overflowing to the next month from its 28th day and thus losing the longest month name when calculating widths for formats containing day and month names', function(assert) {
          var someLanguageMonthNames = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '22', '1', '1'];
          var someLanguageDayNames = ['1', '1', '1', '1', '22', '1', '1'];
          var longestMonthNameIndex = getLongestCaptionIndex(someLanguageMonthNames);
          var longestDate = getLongestDate('D', someLanguageMonthNames, someLanguageDayNames);
          assert.strictEqual(longestDate.getMonth(), longestMonthNameIndex);
        });
        QUnit.test('Calendar should update it value accordingly \'text\' option if it is valid (T189474)', function(assert) {
          var date = new Date(2014, 5, 10);
          this.reinitFixture({
            value: date,
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          keyboardMock(this.fixture.input).caret(9).press('backspace').type('5');
          this.fixture.input.trigger('change');
          this.fixture.dateBox.open();
          var calendar = getInstanceWidget(this.fixture.dateBox);
          assert.deepEqual(calendar.option('value'), new Date(2015, 5, 10));
        });
        QUnit.test('Calendar should not be closed after datebox value has been changed by input', function(assert) {
          var date = new Date(2014, 5, 10);
          this.reinitFixture({
            value: date,
            applyValueMode: 'useButtons',
            pickerType: 'calendar'
          });
          this.fixture.dateBox.open();
          keyboardMock(this.fixture.input).caret(9).press('backspace').type('5');
          this.fixture.input.trigger('change');
          var calendar = getInstanceWidget(this.fixture.dateBox);
          assert.deepEqual(calendar.option('value'), new Date(2015, 5, 10));
          assert.ok(this.fixture.dateBox.option('opened'));
        });
        QUnit.test('Value should be changed only after click on \'Apply\' button if the \'applyValueMode\' options is changed to \'useButtons\'', function(assert) {
          var value = new Date(2015, 0, 20);
          var newValue = new Date(2015, 0, 30);
          var dateBox = this.fixture.dateBox;
          dateBox.option('value', value);
          dateBox.open();
          dateBox.close();
          dateBox.option('applyValueMode', 'useButtons');
          dateBox.open();
          var calendar = getInstanceWidget(dateBox);
          var $applyButton = dateBox._popup.$wrapper().find(APPLY_BUTTON_SELECTOR).eq(0);
          calendar.option('value', newValue);
          assert.deepEqual(dateBox.option('value'), value, 'value is not changed yet');
          $($applyButton).trigger('dxclick');
          assert.deepEqual(dateBox.option('value'), newValue, 'value is changed after click');
        });
        QUnit.test('Value should be changed if it was entered from keyboard and it is out of range', function(assert) {
          var value = new Date(2015, 0, 15);
          var min = new Date(2015, 0, 10);
          var max = new Date(2015, 0, 20);
          this.reinitFixture({
            value: value,
            min: min,
            max: max,
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          var $input = $(dateBox.$element().find(("." + TEXTEDITOR_INPUT_CLASS)));
          var kb = keyboardMock($input);
          var inputValue = '1/5/2015';
          clearInput($input, kb);
          kb.type(inputValue).change();
          assert.equal($input.val(), inputValue, 'input value is correct');
          assert.deepEqual(dateBox.option('value'), value, 'value has not been changed');
          assert.ok(!dateBox.option('isValid'), 'datebox value is invalid');
          var validationError = dateBox.option('validationError');
          assert.ok(validationError, 'Validation error should be specified');
          assert.ok(validationError.editorSpecific, 'editorSpecific flag should be added');
        });
        QUnit.test('Empty value should not be marked as \'out of range\'', function(assert) {
          var value = new Date(2015, 0, 15);
          var min = new Date(2015, 0, 10);
          var max = new Date(2015, 0, 20);
          this.reinitFixture({
            value: value,
            min: min,
            max: max,
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          var $input = $(dateBox.$element().find(("." + TEXTEDITOR_INPUT_CLASS)));
          var kb = keyboardMock($input);
          clearInput($input, kb);
          kb.change();
          assert.ok(dateBox.option('isValid'), 'isValid flag should be set');
          assert.ok(!dateBox.option('validationError'), 'validationError should not be set');
        });
        QUnit.test('Popup should not be hidden after value change using keyboard', function(assert) {
          var value = new Date(2015, 0, 29);
          this.reinitFixture({
            type: 'date',
            value: value,
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          var $input = $(dateBox.$element().find(("." + TEXTEDITOR_INPUT_CLASS)));
          var kb = keyboardMock($input);
          dateBox.open();
          assert.equal($input.val(), '1/29/2015', 'correct input value');
          kb.caret(9).press('backspace').type('6').change();
          assert.equal($input.val(), '1/29/2016', 'input value is changed');
          assert.ok(dateBox.option('opened'), 'popup is still opened');
        });
        QUnit.test('T196443 - dxDateBox should not hide popup after erase date in input field', function(assert) {
          var value = new Date(2015, 0, 30);
          this.reinitFixture({
            value: value,
            min: null,
            max: null,
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          var $input = dateBox._input();
          var kb = keyboardMock($input);
          dateBox.open();
          kb.press('end');
          for (var i = 0; i < 10; i++) {
            kb.press('backspace');
          }
          assert.deepEqual(dateBox.option('value'), value, 'datebox value is not changed');
          assert.ok(dateBox.option('opened'), 'popup is still opened');
        });
        QUnit.test('T203457 - popup should be closed when selected date is clicked', function(assert) {
          var value = new Date(2015, 1, 1);
          this.reinitFixture({
            value: value,
            min: null,
            max: null,
            type: 'date',
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          dateBox.open();
          var $selectedDate = dateBox._popup.$wrapper().find('.dx-calendar-selected-date');
          $($selectedDate).trigger('dxclick');
          assert.ok(!dateBox.option('opened'), 'popup is closed');
        });
        QUnit.test('T208825 - tapping on the \'enter\' should change value if popup is opened', function(assert) {
          var value = new Date(2015, 2, 13);
          this.reinitFixture({
            value: value,
            focusStateEnabled: true,
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          var $input = dateBox._input();
          var kb = keyboardMock($input);
          dateBox.option('valueChangeEvent', 'keyup');
          dateBox.open();
          kb.caret(9).press('backspace').type('4').press('enter');
          assert.deepEqual(dateBox.option('value'), new Date(2014, 2, 13), 'value is changed');
        });
        QUnit.test('Close popup on the \'enter\' press after input value is changed', function(assert) {
          var value = new Date(2015, 2, 10);
          this.reinitFixture({
            value: value,
            focusStateEnabled: true,
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          dateBox.open();
          keyboardMock(dateBox._input()).press('end').press('backspace').type('4').press('enter');
          assert.equal(dateBox.option('opened'), false, 'popup is still opened');
        });
        QUnit.test('repaint was fired if strategy is fallback', function(assert) {
          this.reinitFixture({
            useNative: false,
            useCalendar: true,
            type: 'datetime',
            pickerType: 'calendarWithTime',
            opened: true
          });
          var dateBox = this.fixture.dateBox;
          var popup = dateBox.$element().find('.dx-popup').dxPopup('instance');
          var repaintSpy = sinon.spy(popup, 'repaint');
          this.clock.tick(10);
          assert.ok(repaintSpy.called, 'repaint was fired on opened');
        });
        QUnit.test('changing type from \'datetime\' to \'date\' should lead to strategy changing', function(assert) {
          this.reinitFixture({
            type: 'datetime',
            pickerType: 'calendar'
          });
          var dateBox = this.fixture.dateBox;
          assert.equal(dateBox._strategy.NAME, 'CalendarWithTime', 'correct strategy for the \'datetime\' type');
          dateBox.option('type', 'date');
          assert.equal(dateBox._strategy.NAME, 'Calendar', 'correct strategy for the \'date\' type');
        });
        QUnit.test('T247493 - value is cleared when text is changed to invalid date and popup is opened', function(assert) {
          var date = new Date(2015, 5, 9);
          this.reinitFixture({
            pickerType: 'calendar',
            value: date
          });
          var dateBox = this.fixture.dateBox;
          var $element = $(dateBox.$element());
          var $input = $element.find(("." + TEXTEDITOR_INPUT_CLASS));
          var kb = keyboardMock($input);
          kb.press('end').press('backspace');
          dateBox.open();
          assert.deepEqual(dateBox.option('value'), date, 'value is correct');
          assert.equal($input.val(), '6/9/201', 'input value is correct');
        });
        QUnit.test('T252170 - date time should be the same with set value after calendar value is changed', function(assert) {
          var date = new Date(2015, 5, 9, 15, 54, 13);
          this.reinitFixture({
            pickerType: 'calendar',
            type: 'date',
            value: date
          });
          var dateBox = this.fixture.dateBox;
          dateBox.open();
          var calendar = dateBox._strategy._widget;
          var $calendar = $(calendar.$element());
          $($calendar.find('.dx-calendar-cell[data-value=\'2015/06/10\']')).trigger('dxclick');
          assert.deepEqual(calendar.option('value'), new Date(2015, 5, 10, 15, 54, 13), 'new calendar value saves set value time');
          assert.deepEqual(dateBox.option('value'), new Date(2015, 5, 10, 15, 54, 13), 'new datebox value saves set value time');
        });
        QUnit.test('calendar views should be positioned correctly', function(assert) {
          $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2015, 4, 12),
            opened: true
          });
          var $calendarViews = $('.dx-popup-wrapper .dx-calendar-views-wrapper .dx-widget');
          var viewWidth = $calendarViews.eq(0).width();
          assert.equal($calendarViews.eq(0).position().left, 0, 'main view is at 0');
          assert.equal($calendarViews.eq(1).position().left, -viewWidth, 'before view is at the left');
          assert.equal($calendarViews.eq(2).position().left, viewWidth, 'after view is at the right');
        });
        QUnit.test('Popup with calendar strategy should be use \'flipfit flip\' strategy', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(),
            deferRendering: true
          });
          $dateBox.dxDateBox('option', 'popupPosition', {my: 'bottom left'});
          $dateBox.dxDateBox('option', 'opened', true);
          var popup = $dateBox.find('.dx-popup').dxPopup('instance');
          assert.equal(popup.option('position').collision, 'flipfit flip', 'collision set correctly');
          assert.equal(popup.option('position').my, 'bottom left', 'position is saved');
        });
        QUnit.test('Popup with calendarWithTime strategy should be use \'flipfit flip\' strategy', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            pickerType: 'calendar',
            value: new Date(),
            opened: true
          });
          assert.equal($dateBox.find('.dx-popup').dxPopup('option', 'position').collision, 'flipfit flip', 'collision set correctly');
        });
        QUnit.test('DateBox should not take current date value at the opening if value is null', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: null,
            pickerType: 'calendar'
          });
          var instance = $dateBox.dxDateBox('instance');
          var $dropDownButton = $dateBox.find(("." + DROP_DOWN_BUTTON_CLASS));
          $($dropDownButton).trigger('dxclick');
          assert.equal(instance.option('value'), null, 'value shouldn\'t be dropped after opening');
        });
        QUnit.test('time component should not be changed if editing value with the help of keyboard (T398429)', function(assert) {
          this.reinitFixture({
            type: 'date',
            pickerType: 'calendar',
            value: new Date(2016, 6, 1, 14, 15),
            focusStateEnabled: true
          });
          keyboardMock(this.fixture.rootElement.find('.' + TEXTEDITOR_INPUT_CLASS)).focus().caret(2).press('del').type('2').change();
          var value = this.fixture.dateBox.option('value');
          assert.equal(value.getHours(), 14, 'the \'hours\' component has not been changed');
          assert.equal(value.getMinutes(), 15, 'the \'minutes\' component has not been changed');
        });
      });
      QUnit.module('datebox with time component', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('date box should contain calendar and time view inside box in large screen', function(assert) {
          var originalWidthFunction = implementationsMap.getWidth;
          try {
            sinon.stub(implementationsMap, 'getWidth').returns(600);
            var $element = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              adaptivityEnabled: true,
              opened: true
            });
            var instance = $element.dxDateBox('instance');
            var $content = $(instance._popup.$content());
            var box = Box.getInstance($content.find('.' + BOX_CLASS));
            var $clock = $content.find('.dx-timeview-clock');
            assert.equal(box.option('direction'), 'row', 'correct box direction specified');
            assert.ok(box.itemElements().eq(0).find('.' + CALENDAR_CLASS).length, 'calendar rendered');
            assert.ok(box.itemElements().eq(1).find('.' + TIMEVIEW_CLASS).length, 'timeview rendered');
            assert.equal($clock.length, 1, 'clock was rendered');
          } finally {
            implementationsMap.getWidth = originalWidthFunction;
          }
        });
        QUnit.test('date box should contain calendar and time view inside box in small screen', function(assert) {
          var originalWidthFunction = implementationsMap.getWidth;
          try {
            sinon.stub(implementationsMap, 'getWidth').returns(300);
            var $element = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              adaptivityEnabled: true,
              opened: true
            });
            var instance = $element.dxDateBox('instance');
            var $content = $(instance._popup.$content());
            var box = Box.getInstance($content.find('.' + BOX_CLASS));
            var $clock = $content.find('.dx-timeview-clock');
            assert.equal(box.option('direction'), 'row', 'correct box direction specified');
            assert.ok(box.itemElements().eq(0).find('.' + CALENDAR_CLASS).length, 'calendar rendered');
            assert.ok(box.itemElements().eq(0).find('.' + TIMEVIEW_CLASS).length, 'timeview rendered');
            assert.equal($clock.length, 0, 'clock was not rendered');
          } finally {
            implementationsMap.getWidth = originalWidthFunction;
          }
        });
        [true, false].forEach(function(adaptivityEnabledValue) {
          QUnit.test(("date box should change behavior if adaptivityEnabled option is changed to " + adaptivityEnabledValue + " at runtime"), function(assert) {
            var widthStub = sinon.stub(implementationsMap, 'getWidth').returns(300);
            try {
              var $element = $('#dateBox').dxDateBox({
                type: 'datetime',
                pickerType: 'calendar',
                adaptivityEnabled: !adaptivityEnabledValue,
                opened: true
              });
              var instance = $element.dxDateBox('instance');
              instance.option('adaptivityEnabled', adaptivityEnabledValue);
              instance.close();
              instance.open();
              var $content = $(instance._popup.$content());
              var box = Box.getInstance($content.find(("." + BOX_CLASS)));
              var $clock = $content.find(("." + TIMEVIEW_CLOCK_CLASS));
              var timeViewExpectedMessage = ("timeview is " + (adaptivityEnabledValue ? '' : 'not') + " rendered");
              var clockExpectedMessage = ("clock is " + (adaptivityEnabledValue ? 'not' : '') + " rendered");
              assert.strictEqual(box.itemElements().eq(0).find(("." + TIMEVIEW_CLASS)).length, (adaptivityEnabledValue ? 1 : 0), timeViewExpectedMessage);
              assert.strictEqual($clock.length, (adaptivityEnabledValue ? 0 : 1), clockExpectedMessage);
            } finally {
              widthStub.restore();
            }
          });
        });
        [true, false].forEach(function(showAnalogClockValue) {
          var timeViewExpectedMessage = ("timeview is " + (showAnalogClockValue ? 'not' : '') + " rendered");
          var clockExpectedMessage = ("clock is " + (showAnalogClockValue ? '' : 'not') + " rendered");
          QUnit.test(("date box should " + (showAnalogClockValue ? 'not' : '') + " have compact view when showAnalogClock option is " + showAnalogClockValue), function(assert) {
            var $element = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              showAnalogClock: showAnalogClockValue
            });
            var instance = $element.dxDateBox('instance');
            instance.open();
            var $content = $(instance._popup.$content());
            var box = Box.getInstance($content.find(("." + BOX_CLASS)));
            var $clock = $content.find('.dx-timeview-clock');
            assert.strictEqual(box.option('direction'), 'row', 'correct box direction specified');
            assert.strictEqual(box.itemElements().eq(0).find(("." + CALENDAR_CLASS)).length, 1, 'calendar rendered');
            assert.strictEqual(box.itemElements().eq(0).find(("." + TIMEVIEW_CLASS)).length, (showAnalogClockValue ? 0 : 1), timeViewExpectedMessage);
            assert.strictEqual($clock.length, (showAnalogClockValue ? 1 : 0), clockExpectedMessage);
          });
          QUnit.test(("date box should change behavior if showAnalogClock option is changed to " + showAnalogClockValue + " at runtime"), function(assert) {
            var $element = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              showAnalogClock: !showAnalogClockValue,
              opened: true
            });
            var instance = $element.dxDateBox('instance');
            instance.option('showAnalogClock', showAnalogClockValue);
            instance.close();
            instance.open();
            var $content = $(instance._popup.$content());
            var box = Box.getInstance($content.find(("." + BOX_CLASS)));
            var $clock = $content.find(("." + TIMEVIEW_CLOCK_CLASS));
            assert.strictEqual(box.itemElements().eq(0).find(("." + TIMEVIEW_CLASS)).length, (showAnalogClockValue ? 0 : 1), timeViewExpectedMessage);
            assert.strictEqual($clock.length, (showAnalogClockValue ? 1 : 0), clockExpectedMessage);
          });
        });
        QUnit.test('date box wrapper adaptivity class depends on the screen size', function(assert) {
          var LARGE_SCREEN_SIZE = 2000;
          var SMALL_SCREEN_SIZE = 300;
          var stub = sinon.stub(implementationsMap, 'getWidth').returns(LARGE_SCREEN_SIZE);
          try {
            var instance = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              adaptivityEnabled: true,
              opened: true
            }).dxDateBox('instance');
            assert.notOk(instance._popup.$wrapper().hasClass(DATEBOX_ADAPTIVITY_MODE_CLASS), 'there is no adaptivity class for the large screen');
            instance.close();
            stub.restore();
            stub = sinon.stub(implementationsMap, 'getWidth').returns(SMALL_SCREEN_SIZE);
            instance.open();
            assert.ok(instance._popup.$wrapper().hasClass(DATEBOX_ADAPTIVITY_MODE_CLASS), 'there is the adaptivity class for the small screen');
          } finally {
            stub.restore();
          }
        });
        QUnit.test('dateBox with datetime strategy should be rendered once on init', function(assert) {
          var contentReadyHandler = sinon.spy();
          $('#dateBox').dxDateBox({
            type: 'datetime',
            pickerType: 'calendar',
            onContentReady: contentReadyHandler
          }).dxDateBox('instance');
          assert.equal(contentReadyHandler.callCount, 1, 'contentReady has been called once');
        });
        QUnit.test('date box popup should have maximum 100% width', function(assert) {
          var currentDevice = sinon.stub(devices, 'current').returns({
            platform: 'generic',
            phone: true
          });
          var clock = sinon.useFakeTimers();
          try {
            var instance = $('#dateBox').dxDateBox({
              type: 'date',
              pickerType: 'rollers',
              opened: true
            }).dxDateBox('instance');
            assert.equal(instance._popup.option('maxWidth'), '100%', 'popup width should be correct on 320px screens');
            assert.equal(instance._popup.option('maxHeight'), '100%', 'popup height should be correct on 320px screens');
          } finally {
            clock.restore();
            currentDevice.restore();
          }
        });
        QUnit.test('buttons are rendered after \'type\' option was changed', function(assert) {
          var $element = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            type: 'datetime',
            applyValueMode: 'useButtons'
          });
          var dateBox = $element.dxDateBox('instance');
          dateBox.open();
          var $buttons = $('.dx-datebox-wrapper .dx-toolbar .dx-button');
          assert.equal($buttons.length, 3, 'buttons are rendered');
          dateBox.option('type', 'date');
          dateBox.open();
          dateBox.option('type', 'datetime');
          dateBox.open();
          $buttons = $('.dx-datebox-wrapper .dx-toolbar .dx-button');
          assert.equal($buttons.length, 3, 'buttons are rendered after option was changed');
        });
        QUnit.test('DateBox should have time part when pickerType is rollers', function(assert) {
          var date = new Date(2015, 1, 1, 12, 13, 14);
          var dateBox = $('#dateBox').dxDateBox({
            pickerType: 'rollers',
            type: 'datetime',
            value: date
          }).dxDateBox('instance');
          var format = uiDateUtils.FORMATS_MAP['datetime'];
          var $input = $(dateBox.$element().find('.' + TEXTEDITOR_INPUT_CLASS));
          assert.equal($input.val(), dateLocalization.format(date, format), 'input value is correct');
        });
        QUnit.test('DateBox with pickerType=rollers should scroll to the neighbor item independent of deltaY when device is desktop (T921228)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'device is not desktop');
            return;
          }
          var done = assert.async();
          var date = new Date(2015, 0, 1);
          $('#dateBox').dxDateBox({
            pickerType: 'rollers',
            value: date,
            opened: true
          });
          setTimeout(function() {
            var $monthRollerView = $('.dx-dateviewroller-month');
            var monthRollerView = $monthRollerView.dxDateViewRoller('instance');
            var deltaY = 100;
            var pointer = pointerMock(monthRollerView.container());
            assert.strictEqual(monthRollerView.option('selectedIndex'), 0, 'selectedItem is correct');
            pointer.start().wheel(deltaY).wait(500);
            assert.strictEqual(monthRollerView.option('selectedIndex'), 0, 'selectedItem is correct');
            pointer.start().wheel(-deltaY).wait(500);
            assert.strictEqual(monthRollerView.option('selectedIndex'), 1, 'selectedItem is correct');
            pointer.start().wheel(-deltaY * 3).wait(500);
            assert.strictEqual(monthRollerView.option('selectedIndex'), 2, 'selectedItem is correct');
            pointer.start().wheel(deltaY * 5).wait(500);
            assert.strictEqual(monthRollerView.option('selectedIndex'), 1, 'selectedItem is correct');
            pointer.start().wheel(-deltaY * 10).wait(500);
            assert.strictEqual(monthRollerView.option('selectedIndex'), 2, 'selectedItem is correct');
            done();
          }, RESIZE_WAIT_TIMEOUT * 2);
        });
        QUnit.test('dateview selectedIndex should not be changed after dateBox reopen (T934663)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'device is not desktop');
            return;
          }
          assert.expect(0);
          var clock = sinon.useFakeTimers();
          try {
            var date = new Date(2015, 3, 3);
            var dateBox = $('#dateBox').dxDateBox({
              pickerType: 'rollers',
              value: date,
              opened: true
            }).dxDateBox('instance');
            var selectedIndexChangedHandler = function(args) {
              assert.ok(false, 'selectedIndex has been changed');
            };
            var monthRollerView = $('.dx-dateviewroller-month').dxDateViewRoller('instance');
            var dayRollerView = $('.dx-dateviewroller-day').dxDateViewRoller('instance');
            var yearRollerView = $('.dx-dateviewroller-year').dxDateViewRoller('instance');
            monthRollerView.option('onSelectedIndexChanged', selectedIndexChangedHandler);
            dayRollerView.option('onSelectedIndexChanged', selectedIndexChangedHandler);
            yearRollerView.option('onSelectedIndexChanged', selectedIndexChangedHandler);
            dateBox.close();
            dateBox.open();
          } finally {
            clock.restore();
          }
        });
        QUnit.test('DateBox with time should be rendered correctly when templatesRenderAsynchronously=true', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var dateBox = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              value: new Date(),
              templatesRenderAsynchronously: true
            }).dxDateBox('instance');
            dateBox.option('opened', true);
            clock.tick(10);
            var $content = $(dateBox._popup.$content());
            var $timeView = $content.find('.dx-timeview-clock');
            assert.ok($timeView.parent().width() > 100, 'Time view was rendered correctly');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('DateBox renders the right stylingMode for editors in time view overlay (default)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            value: new Date('2015/1/25')
          }).dxDateBox('instance');
          dateBox.open();
          var hourEditor = $('.dx-timeview-field .dx-numberbox').eq(0);
          var minuteEditor = $('.dx-timeview-field .dx-numberbox').eq(1);
          var amPmEditor = $('.dx-timeview-field .dx-selectbox').eq(0);
          assert.ok(hourEditor.hasClass('dx-editor-outlined'));
          assert.ok(minuteEditor.hasClass('dx-editor-outlined'));
          assert.ok(amPmEditor.hasClass('dx-editor-outlined'));
        });
        QUnit.test('DateBox renders the right stylingMode for editors in time view overlay (custom)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            value: new Date('2015/1/25'),
            stylingMode: 'underlined'
          }).dxDateBox('instance');
          dateBox.open();
          var hourEditor = $('.dx-timeview-field .dx-numberbox').eq(0);
          var minuteEditor = $('.dx-timeview-field .dx-numberbox').eq(1);
          var amPmEditor = $('.dx-timeview-field .dx-selectbox').eq(0);
          assert.ok(hourEditor.hasClass('dx-editor-underlined'));
          assert.ok(minuteEditor.hasClass('dx-editor-underlined'));
          assert.ok(amPmEditor.hasClass('dx-editor-underlined'));
        });
        QUnit.test('Reset seconds and milliseconds when DateBox has no value for time view', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            pickerType: 'list',
            type: 'time'
          }).dxDateBox('instance');
          dateBox.open();
          $('.dx-list-item').first().trigger('dxclick');
          assert.equal(dateBox.option('value').getSeconds(), 0, 'seconds has zero value');
          assert.equal(dateBox.option('value').getMilliseconds(), 0, 'milliseconds has zero value');
        });
        QUnit.module('value change', {
          beforeEach: function() {
            var $__3 = this;
            this.currentDateTime = new Date(2001, 1, 1, 1, 1, 0, 0);
            this.clock = sinon.useFakeTimers(this.currentDateTime.valueOf());
            this.date = new Date('2015/1/25');
            this.init = function(options) {
              $__3.$dateBox = $('#dateBox').dxDateBox($.extend({}, {
                type: 'datetime',
                value: $__3.date,
                opened: true,
                pickerType: 'calendar'
              }, options));
              $__3.dateBox = $__3.$dateBox.dxDateBox('instance');
              $__3.$input = $__3.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
              $__3.$submitInput = $__3.$dateBox.find('input[type=hidden]');
              $__3.$content = $($__3.dateBox.content());
              $__3.keyboard = keyboardMock($__3.$input);
              $__3.timeView = $__3.$content.find(("." + TIMEVIEW_CLASS)).dxTimeView('instance');
              $__3.calendar = $__3.$content.find(("." + CALENDAR_CLASS)).dxCalendar('instance');
              $__3.$hourBox = $__3.$content.find(("." + NUMBERBOX_CLASS)).eq(0);
              $__3.$hourBoxSpinDown = $__3.$hourBox.find(("." + NUMBERBOX_SPIN_DOWN_CLASS)).eq(0);
              $__3.$minuteBox = $__3.$content.find(("." + NUMBERBOX_CLASS)).eq(1);
              $__3.$minuteBoxSpinDown = $__3.$minuteBox.find(("." + NUMBERBOX_SPIN_DOWN_CLASS)).eq(0);
            };
            this.reinit = function() {
              var options = arguments[0] !== (void 0) ? arguments[0] : {};
              $__3.dateBox.dispose();
              $__3.init(options);
            };
            this.clickApplyButton = function() {
              $(APPLY_BUTTON_SELECTOR).first().trigger('dxclick');
            };
            this.clickCalendarCell = function() {
              $(("." + CALENDAR_CELL_CLASS)).first().trigger('dxclick');
            };
            this.init({});
          },
          afterEach: function() {
            this.clock.restore();
          }
        }, function() {
          QUnit.test('dateBox should update time on enter pressing (T969012)', function(assert) {
            var expectedDate = new Date(this.date);
            expectedDate.setHours(11, 28);
            this.timeView.option('value', expectedDate);
            this.keyboard.focus().press('enter');
            assert.deepEqual(this.dateBox.option('value'), expectedDate, 'dateBox value was updated');
          });
          QUnit.test('dateBox should update date and time on enter pressing after time value change using arrows', function(assert) {
            var time = new Date(this.date);
            time.setHours(11, 28);
            this.keyboard.press('up');
            this.timeView.option('value', time);
            this.keyboard.focus().press('enter').press('enter');
            var expectedDate = new Date(time);
            expectedDate.setDate(18);
            assert.deepEqual(this.dateBox.option('value'), expectedDate, 'dateBox value was updated');
          });
          QUnit.test('submit value should be updated after apply button click if internal validation is failed', function(assert) {
            var date = new Date(new Date('2015/1/25 13:00:00'));
            this.reinit({
              min: date,
              value: date
            });
            this.$hourBoxSpinDown.trigger('dxpointerdown');
            this.clickApplyButton();
            assert.notOk(this.dateBox.option('isValid'), 'editor is invalid');
            assert.strictEqual(this.$submitInput.val(), '2015-01-25T12:00:00', 'submit element has correct value');
          });
          QUnit.test('submit value should be updated after apply button click if external validation is failed', function(assert) {
            this.date = new Date('2015/1/25 13:00:00');
            this.reinit();
            this.$dateBox.dxValidator({validationRules: [{
                type: 'custom',
                reevaluate: true,
                validationCallback: function(e) {
                  return false;
                }
              }]});
            this.$hourBoxSpinDown.trigger('dxpointerdown');
            this.clickApplyButton();
            assert.notOk(this.dateBox.option('isValid'), 'editor is invalid');
            assert.strictEqual(this.$submitInput.val(), '2015-01-25T12:00:00', 'submit element has correct value');
          });
          QUnit.test('invalid (by internal validation) value should be displayed if it is selected by time numberboxes (T939117)', function(assert) {
            var date = new Date('2015/1/25 14:00:00');
            this.reinit({
              min: date,
              displayFormat: 'HH:mm',
              value: date
            });
            this.$hourBoxSpinDown.trigger('dxpointerdown');
            this.clickApplyButton();
            assert.strictEqual(this.$input.val(), '13:00', 'input displays a correct value');
            assert.strictEqual(this.dateBox.option('text'), '13:00', 'text is invalid');
            assert.notOk(this.dateBox.option('isValid'), 'widget is invalid');
            assert.deepEqual(this.dateBox.option('value'), new Date(date.setHours(13)), 'value does not changed');
          });
          QUnit.test('datebox value is bound to time view value', function(assert) {
            var date = new Date(2014, 2, 1, 14, 33);
            this.dateBox.option('value', date);
            assert.equal(this.timeView.option('value').getTime(), date.getTime(), 'timeView value is set');
            date = new Date(2014, 2, 1, 17, 47);
            this.timeView.option('value', date);
            this.clickApplyButton();
            assert.strictEqual(this.dateBox.option('value').toString(), date.toString(), 'dateBox value is set');
          });
          QUnit.test('time value should be updated after select date', function(assert) {
            this.calendar.option('value', new Date(2014, 2, 1, 11, 15));
            this.timeView.option('value', new Date(2014, 1, 1, 12, 16));
            this.clickApplyButton();
            var expectedValue = (new Date(2014, 2, 1, 12, 16)).toString();
            assert.strictEqual(this.dateBox.option('value').toString(), expectedValue, 'dateBox value is set');
          });
          QUnit.test('Reset seconds and milliseconds when DateBox has no value for datetime view', function(assert) {
            this.reinit({
              min: new Date('2015/1/25'),
              max: new Date('2015/2/10')
            });
            this.clickCalendarCell();
            this.clickApplyButton();
            assert.strictEqual(this.dateBox.option('value').getSeconds(), 0, 'seconds has zero value');
            assert.strictEqual(this.dateBox.option('value').getMilliseconds(), 0, 'milliseconds has zero value');
          });
          QUnit.test('time is reset when calendar value is changed (T208853)', function(assert) {
            this.date = new Date(2015, 1, 16, 11, 20);
            this.reinit();
            this.calendar.option('value', new Date(2014, 1, 16));
            this.clickApplyButton();
            assert.deepEqual(this.dateBox.option('value'), new Date(2014, 1, 16, 11, 20), 'date and time are correct');
          });
          ['instantly', 'useButtons'].forEach(function(applyValueMode) {
            QUnit.module(("the out of range value, applyValueMode: " + applyValueMode), {
              beforeEach: function() {
                this.date = new Date('2015/1/25 14:00:00');
                this.onValueChangedHandler = sinon.stub();
                this.reinit({
                  type: 'datetime',
                  min: this.date,
                  max: this.date,
                  value: this.date,
                  applyValueMode: applyValueMode,
                  useMaskBehavior: true,
                  onValueChanged: this.onValueChangedHandler
                });
              },
              afterEach: function() {
                this.onValueChangedHandler.reset();
              }
            }, function() {
              QUnit.test('valueChangeEvent should be called after change of datebox value', function(assert) {
                this.dateBox.option('value', new Date('2015/1/25 13:00:00'));
                assert.strictEqual(this.onValueChangedHandler.callCount, applyValueMode === 'instantly' ? 3 : 1, 'onValueChangedHandler.callCount');
                assert.strictEqual(this.$input.val(), '1/25/2015, 1:00 PM', 'input displays a correct value');
                var $__8 = this.dateBox.option(),
                    text = $__8.text,
                    isValid = $__8.isValid,
                    value = $__8.value;
                assert.strictEqual(text, '1/25/2015, 1:00 PM', 'text is right');
                assert.strictEqual(isValid, false, 'widget is invalid');
                assert.deepEqual(value, new Date(this.date.setHours(13)), 'value is changed correctly');
              });
              QUnit.test('valueChangeEvent should be called after change of hours by spin click', function(assert) {
                this.$hourBoxSpinDown.trigger('dxpointerdown');
                this.clickApplyButton();
                assert.strictEqual(this.onValueChangedHandler.callCount, 1, 'onValueChangedHandler.callCount');
                assert.strictEqual(this.$input.val(), '1/25/2015, 1:00 PM', 'input displays a correct value');
                var $__8 = this.dateBox.option(),
                    text = $__8.text,
                    isValid = $__8.isValid,
                    value = $__8.value;
                assert.strictEqual(text, '1/25/2015, 1:00 PM', 'text is right');
                assert.strictEqual(isValid, false, 'widget is invalid');
                assert.deepEqual(value, new Date(this.date.setHours(13)), 'value is changed correctly');
              });
              QUnit.test('valueChangeEvent should be called after change of minutes by spin click', function(assert) {
                this.$minuteBoxSpinDown.trigger('dxpointerdown');
                this.clickApplyButton();
                assert.strictEqual(this.onValueChangedHandler.callCount, 1, 'onValueChangedHandler.callCount');
                assert.strictEqual(this.$input.val(), '1/25/2015, 2:59 PM', 'input displays a correct value');
                var $__8 = this.dateBox.option(),
                    text = $__8.text,
                    isValid = $__8.isValid,
                    value = $__8.value;
                assert.strictEqual(text, '1/25/2015, 2:59 PM', 'text is right');
                assert.strictEqual(isValid, false, 'widget is invalid');
                assert.deepEqual(value, new Date(this.date.setMinutes(59)), 'value is changed correctly');
              });
              QUnit.test('valueChangeEvent should be called after input in hours', function(assert) {
                var keyboard = keyboardMock(this.$hourBox.find(("." + TEXTEDITOR_INPUT_CLASS)));
                keyboard.focus().caret(this.$input.val().length - 3).press('backspace').press('backspace').type('13').change();
                if (applyValueMode === 'useButtons') {
                  this.clickApplyButton();
                }
                assert.strictEqual(this.onValueChangedHandler.callCount, 1, 'onValueChangedHandler.callCount');
                assert.strictEqual(this.$input.val(), '1/25/2015, 1:00 PM', 'input displays a correct value');
                var $__8 = this.dateBox.option(),
                    text = $__8.text,
                    isValid = $__8.isValid,
                    value = $__8.value;
                assert.strictEqual(text, '1/25/2015, 1:00 PM', 'text is right');
                assert.strictEqual(isValid, false, 'widget is invalid');
                assert.deepEqual(value, new Date(this.date.setHours(13)), 'value is changed correctly');
              });
              QUnit.test('valueChangeEvent should be called after input in minutes', function(assert) {
                var keyboard = keyboardMock(this.$minuteBox.find(("." + TEXTEDITOR_INPUT_CLASS)));
                keyboard.focus().caret(this.$input.val().length - 3).press('backspace').press('backspace').type('59').change();
                if (applyValueMode === 'useButtons') {
                  this.clickApplyButton();
                }
                assert.strictEqual(this.onValueChangedHandler.callCount, 1, 'onValueChangedHandler.callCount');
                assert.strictEqual(this.$input.val(), '1/25/2015, 2:59 PM', 'input displays a correct value');
                var $__8 = this.dateBox.option(),
                    text = $__8.text,
                    isValid = $__8.isValid,
                    value = $__8.value;
                assert.strictEqual(text, '1/25/2015, 2:59 PM', 'text is right');
                assert.strictEqual(isValid, false, 'widget is invalid');
                assert.deepEqual(value, new Date(this.date.setMinutes(59)), 'value is changed correctly');
              });
            });
          });
          QUnit.module('partial datetime selecting when value=null', {beforeEach: function() {
              this.reinit({value: null});
            }}, function() {
            QUnit.test('updated value time should be equal to current time if only date is selected (T231015)', function(assert) {
              var newDateTime = new Date(2002, 2, 2, 1, 1, 0, 0);
              this.calendar.option('value', new Date(2002, 2, 2, 14, 17, 22, 34));
              this.clickApplyButton();
              assert.strictEqual(this.dateBox.option('value').getTime(), newDateTime.getTime(), 'value is correct if only calendar value is changed');
            });
            QUnit.test('updated value time should be equal to selected time if only time is selected (T231015)', function(assert) {
              var newDateTime = new Date(2001, 1, 1, 2, 2, 0, 0);
              this.timeView.option('value', new Date(2002, 2, 2, 2, 2));
              this.clickApplyButton();
              assert.strictEqual(this.dateBox.option('value').getTime(), newDateTime.getTime(), 'value is correct if only timeView value is changed');
            });
            QUnit.test('updated value should have date and time equal to current date and time after apply button click if value is null (T253298)', function(assert) {
              this.clickApplyButton();
              assert.strictEqual(this.dateBox.option('value').getDate(), this.currentDateTime.getDate(), 'value date is correct');
              assert.strictEqual(this.dateBox.option('value').getTime(), this.currentDateTime.getTime(), 'value time is correct');
            });
            QUnit.test('updated value should have date equal to calendar controured date after apply button click if value is null (T1039021)', function(assert) {
              var minDate = new Date(2050, 10, 10);
              this.reinit({
                value: null,
                min: minDate
              });
              this.clickApplyButton();
              var expectedDateTime = new Date(minDate);
              expectedDateTime.setHours(this.currentDateTime.getHours(), this.currentDateTime.getMinutes());
              assert.strictEqual(this.dateBox.option('value').getDate(), expectedDateTime.getDate(), 'value date is correct');
              assert.strictEqual(this.dateBox.option('value').getTime(), expectedDateTime.getTime(), 'value time is correct');
            });
          });
        });
      });
      QUnit.module('datebox w/ time list', {
        before: function() {
          this.checkForIncorrectKeyWarning = function(assert) {
            var isIncorrectKeyWarning = logger.warn.lastCall.args[0].indexOf('W1002') > -1;
            assert.ok(logger.warn.calledOnce);
            assert.ok(isIncorrectKeyWarning);
          };
        },
        beforeEach: function() {
          fx.off = true;
          this.$dateBox = $('#dateBox');
          this.dateBox = this.$dateBox.dxDateBox({
            pickerType: 'list',
            type: 'time'
          }).dxDateBox('instance');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('rendered markup', function(assert) {
          this.dateBox.option('opened', true);
          assert.ok($(DATEBOX_LIST_POPUP_SELECTOR).length, 'Popup has dx-timebox-popup-wrapper class');
        });
        QUnit.test('rendered popup markup', function(assert) {
          this.dateBox.option('opened', true);
          assert.ok(this.dateBox._popup, 'popup exist');
        });
        QUnit.test('rendered list markup', function(assert) {
          this.dateBox.option('opened', true);
          assert.ok(getInstanceWidget(this.dateBox), 'list exist');
          assert.ok(getInstanceWidget(this.dateBox).$element().hasClass(LIST_CLASS), 'list initialized');
        });
        QUnit.test('list should contain correct values if min/max does not specified', function(assert) {
          this.dateBox.option({
            min: null,
            max: null
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.equal($listItems.first().text(), '12:00 AM', 'min value is right');
          assert.equal($listItems.last().text(), '11:30 PM', 'max value is right');
        });
        QUnit.test('list should contain all correct values when min/max options are defined (T869203)', function(assert) {
          this.dateBox.option({
            min: new Date(2015, 11, 1, 5, 45),
            max: new Date(2015, 11, 1, 6, 15),
            interval: 15
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.strictEqual($listItems.first().text(), '5:45 AM', 'min value is right');
          assert.strictEqual($listItems.last().text(), '6:15 AM', 'max value is right');
          assert.strictEqual($listItems.length, 3, 'list items count is correct');
        });
        QUnit.test('min/max option test', function(assert) {
          this.dateBox.option({
            min: new Date(2008, 7, 8, 4, 0),
            max: new Date(2008, 7, 8, 8, 59)
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.equal($listItems.first().text(), '4:00 AM', 'min value is right');
          assert.equal($listItems.last().text(), '8:30 AM', 'max value is right');
        });
        QUnit.test('min/max overflow test', function(assert) {
          this.dateBox.option({
            min: new Date(2008, 7, 8, 4, 0),
            max: new Date(2008, 7, 9, 9, 0)
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.strictEqual($listItems.first().text(), '4:00 AM', 'min value is right');
          assert.strictEqual($listItems.last().text(), '4:00 AM', 'max value is right');
        });
        QUnit.test('interval option', function(assert) {
          this.dateBox.option({
            min: new Date(2008, 7, 8, 4, 0),
            value: new Date(2008, 7, 8, 5, 0),
            max: new Date(2008, 7, 8, 6, 0),
            interval: 60
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.strictEqual(items.length, 3, 'interval option works');
          this.dateBox.option('interval', 120);
          this.dateBox.option('opened', true);
          $timeList = $(("." + LIST_CLASS));
          items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.strictEqual(items.length, 2, 'interval option works');
        });
        QUnit.test('T240639 - correct list item should be highlighted if appropriate datebox value is set', function(assert) {
          sinon.stub(logger, 'warn');
          try {
            this.dateBox.option({
              type: 'time',
              pickerType: 'list',
              value: new Date(0, 0, 0, 12, 30),
              opened: true
            });
            var list = this.dateBox._strategy._widget;
            assert.deepEqual(list.option('selectedIndex'), 25, 'selectedIndex item is correct');
            assert.deepEqual(list.option('selectedItem'), new Date(0, 0, 0, 12, 30), 'selected list item is correct');
            this.dateBox.option('value', new Date(2016, 1, 1, 12, 20));
            this.checkForIncorrectKeyWarning(assert);
            assert.equal(list.option('selectedIndex'), -1, 'there is no selected list item');
            assert.equal(list.option('selectedItem'), null, 'there is no selected list item');
          } finally {
            logger.warn.restore();
          }
        });
        QUnit.test('T351678 - the date is reset after item click', function(assert) {
          this.dateBox.option({
            type: 'time',
            pickerType: 'list',
            value: new Date(2020, 4, 13, 12, 17),
            opened: true
          });
          var $list = $(this.dateBox._strategy._widget.$element());
          $($list.find('.dx-list-item').eq(3)).trigger('dxclick');
          assert.deepEqual(this.dateBox.option('value'), new Date(2020, 4, 13, 1, 30), 'date is correct');
        });
        QUnit.test('the date should be in range after the selection', function(assert) {
          this.dateBox.option({
            type: 'time',
            pickerType: 'list',
            min: new Date(2016, 10, 5, 12, 0, 0),
            max: new Date(2016, 10, 5, 14, 0, 0),
            opened: true
          });
          var $item = $(this.dateBox.content()).find('.dx-list-item').eq(0);
          $item.trigger('dxclick');
          assert.deepEqual(this.dateBox.option('value'), new Date(2016, 10, 5, 12, 0, 0), 'date is correct');
        });
        QUnit.test('list should have items if the \'min\' option is specified (T395529)', function(assert) {
          this.dateBox.option({
            min: new Date(new Date(null).setHours(15)),
            opened: true
          });
          var list = $(("." + LIST_CLASS)).dxList('instance');
          assert.ok(list.option('items').length > 0, 'list is not empty');
        });
        QUnit.test('selected date should be in 1970 when it was set from the null value', function(assert) {
          this.dateBox.option({
            opened: true,
            value: null
          });
          var $item = $(this.dateBox.content()).find('.dx-list-item').eq(0);
          $item.trigger('dxclick');
          assert.strictEqual(this.dateBox.option('value').getFullYear(), new Date(null).getFullYear(), 'year is correct');
        });
        QUnit.test('selected date should be in value year when value is specified', function(assert) {
          this.dateBox.option({
            opened: true,
            value: new Date(2018, 5, 6, 14, 12)
          });
          var $item = $(this.dateBox.content()).find('.dx-list-item').eq(0);
          $item.trigger('dxclick');
          assert.strictEqual(this.dateBox.option('value').getFullYear(), 2018, 'year is correct');
        });
        QUnit.test('selected date should be in 1970 when it was set from user\'s input', function(assert) {
          this.dateBox.option({
            value: null,
            displayFormat: 'HH:mm'
          });
          keyboardMock(this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS))).focus().type('11:11').change();
          assert.strictEqual(this.dateBox.option('value').getFullYear(), new Date(null).getFullYear(), 'year is correct');
        });
        QUnit.test('the value\'s date part should not be changed if editing input\'s text by keyboard (T395685)', function(assert) {
          this.dateBox.option({
            focusStateEnabled: true,
            value: new Date(2016, 5, 25, 14, 22)
          });
          var $input = this.$dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          keyboardMock($input).focus().caret($input.val().length - 3).press('backspace').press('backspace').type('44').change();
          assert.deepEqual(this.dateBox.option('value'), new Date(2016, 5, 25, 14, 44), 'value is correct');
        });
        QUnit.test('List of items should be refreshed after value is changed', function(assert) {
          this.dateBox.option({
            min: new Date(2016, 1, 1, 10, 0),
            value: new Date(2016, 1, 2, 14, 45),
            interval: 60,
            opened: true
          });
          var $timeList = $(("." + LIST_CLASS));
          var items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.equal(items.length, 24, '24 items should be find');
          this.dateBox.option('value', new Date(2016, 1, 1));
          items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.equal(items.length, 14, '14 items should be find from min to finish of day');
        });
        QUnit.test('All items in list should be present if value and min options are belong to different days', function(assert) {
          var clock = sinon.useFakeTimers();
          sinon.stub(logger, 'warn');
          try {
            this.dateBox.option({
              min: new Date(2016, 1, 1, 13, 45),
              value: new Date(2016, 1, 1, 14, 45),
              interval: 60,
              opened: true
            });
            var $timeList = $(("." + LIST_CLASS));
            var items = $timeList.find(LIST_ITEM_SELECTOR);
            assert.equal(items.length, 11, 'interval option works');
            this.dateBox.option('value', new Date(2016, 1, 2, 13, 45));
            items = $timeList.find(LIST_ITEM_SELECTOR);
            this.checkForIncorrectKeyWarning(assert);
            assert.equal(items.length, 24, 'interval is correct');
            assert.equal(items.eq(0).text(), '12:45 AM', 'start time is correct');
          } finally {
            clock.restore();
            logger.warn.restore();
          }
        });
        QUnit.test('The situation when value and max options are belong to one day', function(assert) {
          this.dateBox.option({
            value: new Date(2016, 1, 1, 13, 45),
            max: new Date(2016, 1, 1, 15, 0),
            interval: 60,
            opened: true
          });
          var $timeList = $(("." + LIST_CLASS));
          var items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.strictEqual(items.length, 16, 'list should be contain right count of items');
        });
        QUnit.test('value and max are belong to one day', function(assert) {
          this.dateBox.option({
            min: new Date(2016, 1, 1, 0, 11),
            value: new Date(2016, 1, 3, 14, 45),
            max: new Date(2016, 1, 3, 18, 22),
            interval: 60,
            opened: true
          });
          var $timeList = $(("." + LIST_CLASS));
          var items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.equal(items.length, 19, 'list should be contain right count of items');
          assert.equal(items.eq(0).text(), '12:11 AM', 'first item in list is correct');
          assert.equal(items.eq(items.length - 1).text(), '6:11 PM', 'last item in list is correct');
        });
        QUnit.test('List items should be started with minimal possible value', function(assert) {
          this.dateBox.option({
            min: new Date(2016, 1, 1, 0, 17),
            value: new Date(2016, 1, 3, 14, 45),
            interval: 15,
            opened: true
          });
          var $timeList = $(("." + LIST_CLASS));
          var items = $timeList.find(LIST_ITEM_SELECTOR);
          assert.equal(items.eq(0).text(), '12:02 AM', 'first item in list is correct');
          assert.equal(items.eq(items.length - 1).text(), '11:47 PM', 'last item in list is correct');
        });
        QUnit.test('dxDateBox with list strategy automatically scrolls to selected item on opening', function(assert) {
          this.dateBox.option({
            value: new Date(2016, 1, 3, 14, 45),
            interval: 15,
            opened: true
          });
          this.dateBox.option('opened', true);
          var $popupContent = $('.dx-popup-content');
          var $selectedItem = $popupContent.find('.' + LIST_ITEM_SELECTED_CLASS);
          assert.ok($popupContent.offset().top + $popupContent.height() > $selectedItem.offset().top, 'selected item is visible');
        });
        QUnit.test('min/max settings should be work if value option is null', function(assert) {
          this.dateBox.option({
            value: null,
            min: new Date(2008, 7, 8, 8, 0),
            max: new Date(2008, 7, 8, 20, 0)
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.strictEqual($listItems.first().text(), '8:00 AM', 'min value is right');
          assert.strictEqual($listItems.last().text(), '8:00 PM', 'max value is right');
        });
        QUnit.test('min/max settings should be work if value option is undefined', function(assert) {
          this.dateBox.option({
            value: undefined,
            min: new Date(2008, 7, 8, 8, 0),
            max: new Date(2008, 7, 8, 20, 0)
          });
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          var $listItems = $timeList.find('.dx-list-item-content');
          assert.strictEqual($listItems.first().text(), '8:00 AM', 'min value is right');
          assert.strictEqual($listItems.last().text(), '8:00 PM', 'max value is right');
        });
        QUnit.test('validator correctly check value with \'time\' format', function(assert) {
          sinon.stub(logger, 'warn');
          try {
            var $dateBox = $('#dateBox').dxDateBox({
              type: 'time',
              pickerType: 'list',
              min: new Date(2015, 1, 1, 6, 0),
              max: new Date(2015, 1, 1, 16, 0),
              value: new Date(2015, 1, 1, 12, 0),
              opened: true
            });
            var dateBox = $dateBox.dxDateBox('instance');
            var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
            $input.val('11:30 AM').change();
            var value = dateBox.option('value');
            this.checkForIncorrectKeyWarning(assert);
            assert.equal($input.val(), '11:30 AM', 'Correct input value');
            assert.equal(value.getHours(), 11, 'Correct hours');
            assert.equal(value.getMinutes(), 30, 'Correct minutes');
            assert.equal(dateBox.option('isValid'), true, 'Editor should be marked as valid');
          } finally {
            logger.warn.restore();
          }
        });
        QUnit.testInActiveWindow('select a new value via the Enter key', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'time',
            value: new Date(2018, 2, 2, 12, 0, 13),
            pickerType: 'list'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          $input.focusin();
          this.dateBox.option('opened', true);
          keyboard.keyDown('down').keyDown('down').keyDown('enter');
          var value = dateBox.option('value');
          assert.equal($input.val(), '1:00 PM', 'Correct input value');
          assert.equal(value.getHours(), 13, 'Correct hours');
          assert.equal(value.getMinutes(), 0, 'Correct minutes');
        });
        QUnit.test('items are rendered when value is \'undefined\' (T805931)', function(assert) {
          this.dateBox.option({value: undefined});
          this.dateBox.option('opened', true);
          var $timeListItems = $('.dx-list .dx-list-item');
          assert.ok($timeListItems.length > 0);
        });
        QUnit.test('should works correctly with serialized dates (T854579)', function(assert) {
          this.dateBox.option({
            opened: true,
            dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssx'
          });
          var $input = $(this.dateBox.element()).find(("." + TEXTEDITOR_INPUT_CLASS));
          var $items = $(this.dateBox.content()).find(LIST_ITEM_SELECTOR);
          $items.eq(1).trigger('dxclick');
          assert.strictEqual($input.val(), $items.eq(1).text(), 'time is applied');
          this.dateBox.open();
          $items.eq(3).trigger('dxclick');
          assert.strictEqual($input.val(), $items.eq(3).text(), 'new time is applied');
        });
        QUnit.module('applyValueMode = useButtons', {beforeEach: function() {
            this.date = new Date(2020, 1, 1);
            this.dateBox.option({
              value: this.date,
              opened: true,
              applyValueMode: 'useButtons'
            });
            this.$items = $(this.dateBox.content()).find(LIST_ITEM_SELECTOR);
            this.$firstItem = this.$items.eq(1);
          }}, function() {
          QUnit.test('should not close popup on list item click', function(assert) {
            this.$firstItem.trigger('dxclick');
            assert.ok(this.dateBox.option('opened'), 'dateBox is still opened');
          });
          QUnit.test('should not instantly select value on list item click (T1005111)', function(assert) {
            this.$firstItem.trigger('dxclick');
            assert.deepEqual(this.dateBox.option('value'), this.date, 'item is not selected');
          });
          QUnit.test('should not raise validation error on "Ok" button click without item selecting (T1005111)', function(assert) {
            $(APPLY_BUTTON_SELECTOR).trigger('dxclick');
            assert.ok(this.dateBox.option('isValid'), 'dateBox is still valid');
          });
          QUnit.test('should update value on "Ok" button click', function(assert) {
            var expectedDate = new Date(this.date);
            expectedDate.setHours(0, 30);
            this.$firstItem.trigger('dxclick');
            $(APPLY_BUTTON_SELECTOR).trigger('dxclick');
            assert.deepEqual(this.dateBox.option('value'), expectedDate, 'value is updated');
          });
          QUnit.test('should not update value on "Cancel" button click', function(assert) {
            this.$firstItem.trigger('dxclick');
            $(CANCEL_BUTTON_SELECTOR).trigger('dxclick');
            assert.deepEqual(this.dateBox.option('value'), this.date, 'value is not updated');
          });
          QUnit.testInActiveWindow('should not close on "tab" press', function(assert) {
            var $input = this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
            var keyboard = keyboardMock($input);
            keyboard.focus().keyDown('tab');
            assert.ok(this.dateBox.option('opened'), 'dateBox is still opened');
          });
        });
      });
      QUnit.module('width of datebox with list', {
        beforeEach: function() {
          fx.off = true;
          this.$dateBox = $('#dateBox');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.module('overlay content real width', function() {
          QUnit.test('should be equal to the editor width when dropDownOptions.width in not defined', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time'
            }).dxDateBox('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), this.$dateBox.outerWidth(), 'popup width is correct');
          });
          QUnit.test('should be equal to the editor width when dropDownOptions.width in not defined after editor width runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time'
            }).dxDateBox('instance');
            dateBox.option('width', 153);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), this.$dateBox.outerWidth(), 'popup width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width if it\'s defined (T897820)', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {width: 500},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), 500, 'overlay content width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width even after editor input width change (T897820)', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {width: 500},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('width', 300);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), 500, 'overlay content width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is set to auto (T897820)', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {width: 'auto'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is set to 100%', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {width: '100%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.width is percent (T897820)', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {width: '50%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor width runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              width: 600,
              dropDownOptions: {width: '50%'},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('width', 700);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be equal to editor input width even when dropDownOptions.container is defined (T938497)', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {container: $('#containerWithWidth')},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), this.$dateBox.outerWidth(), 'width is correct');
          });
        });
        QUnit.test('dropDownOptions.width should be passed to popup', function(assert) {
          this.$dateBox.dxDateBox({
            type: 'time',
            pickerType: 'list',
            dropDownOptions: {width: 500},
            opened: true
          });
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('width'), 500, 'popup width option value is correct');
        });
        QUnit.test('popup should have width equal to dropDownOptions.width even after editor input width change (T897820)', function(assert) {
          var dateBox = this.$dateBox.dxDateBox({
            type: 'time',
            pickerType: 'list',
            dropDownOptions: {width: 500},
            opened: true
          }).dxDateBox('instance');
          dateBox.option('width', 300);
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('width'), 500, 'popup width option value is correct');
        });
      });
      QUnit.module('height of datebox with list', {
        beforeEach: function() {
          fx.off = true;
          this.$dateBox = $('#dateBox');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.module('overlay content height', function() {
          QUnit.test('should be equal to 0.45 * window height when dropDownOptions.height in not defined and list hight is bigger than 0.45 of window height', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time'
            }).dxDateBox('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), 0.45 * $(window).outerHeight(), 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be equal to 0.45 * window height when dropDownOptions.height in set to auto and list hight is bigger than 0.45 of window height', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time',
              dropDownOptions: {height: 'auto'}
            }).dxDateBox('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), 0.45 * $(window).outerHeight(), 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be equal to 0.45 * window height when dropDownOptions.height in not defined after editor height runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time'
            }).dxDateBox('instance');
            dateBox.option('height', 153);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), 0.45 * $(window).outerHeight(), 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be equal to list height when dropDownOptions.height in not defined and content list is smaller than 0.45 of window height', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time',
              min: Date.now(),
              max: Date.now()
            }).dxDateBox('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $list = $(("." + LIST_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), $list.outerHeight(), 'overlay content height is correct');
          });
          QUnit.test('should be equal to list height when dropDownOptions.height in set to auto and content list is smaller than 0.45 of window height', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'list',
              type: 'time',
              min: Date.now(),
              max: Date.now(),
              dropDownOptions: {height: 'auto'}
            }).dxDateBox('instance');
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $list = $(("." + LIST_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), $list.outerHeight(), 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height if it is defined', function(assert) {
            var dropDownOptionsHeight = 200;
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {height: dropDownOptionsHeight},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), dropDownOptionsHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to dropDownOptions.height even after editor input height change', function(assert) {
            var dropDownOptionsHeight = 500;
            var dateBox = this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {height: dropDownOptionsHeight},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('height', 300);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), dropDownOptionsHeight, 'overlay content height is correct');
          });
          QUnit.test('should be equal to wrapper height if dropDownOptions.height is set to 100%', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {height: '100%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight(), 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.height is percent', function(assert) {
            this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              dropDownOptions: {height: '50%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight() / 2, 0.1, 'overlay content height is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor height runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              type: 'time',
              pickerType: 'list',
              height: 600,
              dropDownOptions: {height: '50%'},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('height', 700);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerHeight(), $overlayWrapper.outerHeight() / 2, 0.1, 'overlay content height is correct');
          });
        });
        QUnit.test('dropDownOptions.height should be passed to popup', function(assert) {
          var dropDownOptionsHeight = 500;
          this.$dateBox.dxDateBox({
            type: 'time',
            pickerType: 'list',
            dropDownOptions: {height: dropDownOptionsHeight},
            opened: true
          });
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('height'), dropDownOptionsHeight, 'popup height option value is correct');
        });
        QUnit.test('popup should have height equal to dropDownOptions.height even after editor input height change', function(assert) {
          var dropDownOptionsHeight = 500;
          var dateBox = this.$dateBox.dxDateBox({
            type: 'time',
            pickerType: 'list',
            dropDownOptions: {height: dropDownOptionsHeight},
            opened: true
          }).dxDateBox('instance');
          dateBox.option('height', 300);
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('height'), dropDownOptionsHeight, 'popup height option value is correct');
        });
      });
      QUnit.module('width of datebox with calendar', {
        beforeEach: function() {
          fx.off = true;
          this.$dateBox = $('#dateBox');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.module('overlay content width', function() {
          QUnit.test('should be equal to the calendar width + margins when dropDownOptions.width in not defined', function(assert) {
            this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'calendar'
            }).dxDateBox('instance');
            var $calendar = $(("." + CALENDAR_CLASS));
            var paddingsWidth = parseInt($calendar.css('margin-left')) * 2;
            var calendarWidth = $calendar.outerWidth() + paddingsWidth;
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.width(), calendarWidth, 'popup width is correct');
          });
          QUnit.test('should be equal to the calendar width + margins when dropDownOptions.width in not defined after editor width runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              opened: true,
              pickerType: 'calendar'
            }).dxDateBox('instance');
            var $calendar = $(("." + CALENDAR_CLASS));
            var paddingsWidth = parseInt($calendar.css('margin-left')) * 2;
            var calendarWidth = $calendar.outerWidth() + paddingsWidth;
            dateBox.option('width', 153);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.width(), calendarWidth, 'popup width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width if it\'s defined', function(assert) {
            this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {width: 500},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), 500, 'overlay content width is correct');
          });
          QUnit.test('should be equal to dropDownOptions.width even after editor input width change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {width: 500},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('width', 300);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), 500, 'overlay content width is correct');
          });
          QUnit.test('should be equal to calendar width + margins if dropDownOptions.width is set to auto', function(assert) {
            this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {width: 'auto'},
              opened: true
            });
            var $calendar = $(("." + CALENDAR_CLASS));
            var paddingsWidth = parseInt($calendar.css('margin-left')) * 2;
            var calendarWidth = $calendar.outerWidth() + paddingsWidth;
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            assert.strictEqual($overlayContent.width(), calendarWidth, 'overlay content width is correct');
          });
          QUnit.test('should be equal to wrapper width if dropDownOptions.width is set to 100%', function(assert) {
            this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {width: '100%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.strictEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth(), 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper when dropDownOptions.width is percent', function(assert) {
            this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {width: '50%'},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be calculated relative to wrapper after editor width runtime change', function(assert) {
            var dateBox = this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              width: 600,
              dropDownOptions: {width: '50%'},
              opened: true
            }).dxDateBox('instance');
            dateBox.option('width', 700);
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
            assert.roughEqual($overlayContent.outerWidth(), $overlayWrapper.outerWidth() / 2, 0.1, 'overlay content width is correct');
          });
          QUnit.test('should be equal to calendar width + margins even when dropDownOptions.container is defined', function(assert) {
            this.$dateBox.dxDateBox({
              pickerType: 'calendar',
              dropDownOptions: {container: $('#containerWithWidth')},
              opened: true
            });
            var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
            var $calendar = $(("." + CALENDAR_CLASS));
            var paddingsWidth = parseInt($calendar.css('margin-left')) * 2;
            var calendarWidth = $calendar.outerWidth() + paddingsWidth;
            assert.strictEqual($overlayContent.width(), calendarWidth, 'width is correct');
          });
        });
        QUnit.test('dropDownOptions.width should be passed to popup', function(assert) {
          this.$dateBox.dxDateBox({
            pickerType: 'calendar',
            dropDownOptions: {width: 500},
            opened: true
          });
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('width'), 500, 'popup width option value is correct');
        });
        QUnit.test('popup should have width equal to dropDownOptions.width even after editor input width change (T897820)', function(assert) {
          var dateBox = this.$dateBox.dxDateBox({
            pickerType: 'calendar',
            dropDownOptions: {width: 500},
            opened: true
          }).dxDateBox('instance');
          dateBox.option('width', 300);
          var popup = this.$dateBox.find(("." + POPUP_CLASS)).dxPopup('instance');
          assert.strictEqual(popup.option('width'), 500, 'popup width option value is correct');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
          this.$dateBox = $('#dateBox');
          this.dateBox = this.$dateBox.dxDateBox({
            pickerType: 'calendar',
            type: 'time',
            focusStateEnabled: true,
            min: new Date(2008, 7, 8, 4, 30),
            value: new Date(2008, 7, 8, 5, 0),
            max: new Date(2008, 7, 8, 6, 0)
          }).dxDateBox('instance');
          this.$input = this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          this.keyboard = keyboardMock(this.$input);
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.testInActiveWindow('popup hides on tab', function(assert) {
          this.$input.focusin();
          assert.ok(this.$dateBox.hasClass(STATE_FOCUSED_CLASS), 'element is focused');
          this.dateBox.option('opened', true);
          this.keyboard.keyDown('tab');
          assert.ok(this.$dateBox.hasClass(STATE_FOCUSED_CLASS), 'element is focused');
          assert.equal(this.dateBox.option('opened'), false, 'popup is hidden');
        });
        QUnit.testInActiveWindow('home/end should not be handled', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.$input.focusin();
          this.dateBox.option('opened', true);
          var $timeList = $(("." + LIST_CLASS));
          this.keyboard.keyDown('down');
          this.keyboard.keyDown('end');
          assert.ok(!$timeList.find(LIST_ITEM_SELECTOR).eq(0).hasClass(STATE_FOCUSED_CLASS), 'element is not focused');
          this.keyboard.keyDown('home');
          assert.ok(!$timeList.find(LIST_ITEM_SELECTOR).eq(0).hasClass(STATE_FOCUSED_CLASS), 'element is not focused');
        });
        QUnit.testInActiveWindow('arrow keys control', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.$input.focusin();
          this.dateBox.option('opened', true);
          this.keyboard.keyDown('down');
          var $timeList = $(("." + LIST_CLASS));
          assert.ok($timeList.find(LIST_ITEM_SELECTOR).eq(2).hasClass(STATE_FOCUSED_CLASS), 'correct item is focused');
          this.keyboard.keyDown('down');
          assert.ok($timeList.find(LIST_ITEM_SELECTOR).eq(3).hasClass(STATE_FOCUSED_CLASS), 'correct item is focused');
          this.keyboard.keyDown('down');
          assert.ok($timeList.find(LIST_ITEM_SELECTOR).eq(0).hasClass(STATE_FOCUSED_CLASS), 'correct item is focused');
          this.keyboard.keyDown('up');
          assert.ok($timeList.find(LIST_ITEM_SELECTOR).eq(3).hasClass(STATE_FOCUSED_CLASS), 'correct item is focused');
          this.keyboard.keyDown('enter');
          assert.strictEqual(this.dateBox.option('opened'), false, 'popup is hidden');
          var selectedDate = this.dateBox.option('value');
          assert.strictEqual(selectedDate.getHours(), 6, 'hours is right');
          assert.strictEqual(selectedDate.getMinutes(), 0, 'minutes is right');
        });
        QUnit.test('apply contoured date on enter for date and datetime mode', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.dateBox = this.$dateBox.dxDateBox({
            pickerType: 'calendar',
            type: 'date',
            applyValueMode: 'useButtons',
            focusStateEnabled: true,
            min: new Date(2008, 6, 8, 4, 30),
            value: new Date(2008, 7, 8, 5, 0),
            max: new Date(2008, 9, 8, 6, 0),
            opened: true
          }).dxDateBox('instance');
          var $input = this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          $($input).trigger($.Event('keydown', {key: 'ArrowUp'}));
          $($input).trigger($.Event('keydown', {key: 'ArrowDown'}));
          $($input).trigger($.Event('keydown', {key: 'ArrowUp'}));
          $($input).trigger($.Event('keydown', {key: 'Enter'}));
          assert.equal(this.dateBox.option('opened'), false, 'popup is hidden');
          var selectedDate = this.dateBox.option('value');
          assert.equal(selectedDate.getDate(), 1, 'day is right');
        });
        QUnit.test('Enter key press prevents default when popup in opened', function(assert) {
          assert.expect(1);
          var prevented = 0;
          var $dateBox = $('<div>').appendTo('body').dxDateBox({
            pickerType: 'calendar',
            focusStateEnabled: true,
            value: new Date(2015, 5, 13),
            opened: true
          });
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          try {
            $($dateBox).on('keydown', function(e) {
              if (e.isDefaultPrevented()) {
                prevented++;
              }
            });
            keyboard.keyDown('enter');
            assert.equal(prevented, 1, 'defaults prevented on enter key press');
          } finally {
            $dateBox.remove();
          }
        });
        QUnit.testInActiveWindow('the \'shift+tab\' key press leads to the cancel button focus if the input is focused', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          this.dateBox.option({
            pickerType: 'calendar',
            type: 'datetime',
            opened: true,
            applyValueMode: 'useButtons'
          });
          var $input = this.$dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $input.focus().trigger($.Event('keydown', {
            key: 'Tab',
            shiftKey: true
          }));
          var $cancelButton = this.dateBox._popup.$wrapper().find('.dx-button.dx-popup-cancel');
          assert.ok($cancelButton.hasClass('dx-state-focused'), 'cancel button is focused');
        });
        QUnit.test('Home and end key press prevent default when popup in opened (T587313)', function(assert) {
          assert.expect(1);
          var prevented = 0;
          this.dateBox.option('opened', true);
          this.$dateBox.on('keydown', function(e) {
            if (e.isDefaultPrevented()) {
              prevented++;
            }
          });
          this.keyboard.keyDown('home');
          this.keyboard.keyDown('end');
          assert.equal(prevented, 0, 'defaults prevented on home and end keys');
        });
        QUnit.test('Home and end key press does not prevent default when popup in not opened (T587313)', function(assert) {
          assert.expect(1);
          var prevented = 0;
          this.dateBox.option('opened', false);
          this.$dateBox.on('keydown', function(e) {
            if (e.isDefaultPrevented()) {
              prevented++;
            }
          });
          this.keyboard.keyDown('home');
          this.keyboard.keyDown('end');
          assert.equal(prevented, 0, 'defaults has not prevented on home and end keys');
        });
        QUnit.testInActiveWindow('Unsupported key handlers must be processed correctly', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.dateBox.option({
            pickerType: 'list',
            type: 'time'
          });
          var $input = this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          this.dateBox.focus();
          var isNoError = true;
          try {
            keyboard.press('down').press('up').press('right').press('left');
          } catch (e) {
            isNoError = false;
          }
          assert.ok(isNoError, 'key handlers processed without errors');
        });
        QUnit.test('Pressing escape when focus \'today\' button must hide the popup', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
          this.dateBox.option({
            type: 'date',
            pickerType: 'calendar',
            applyValueMode: 'useButtons'
          });
          this.dateBox.open();
          $(this.dateBox.content()).parent().find('.dx-button-today').trigger(escapeKeyDown);
          assert.ok(!this.dateBox.option('opened'));
        });
        [{
          editorName: 'hour',
          editorIndex: 0
        }, {
          editorName: 'minute',
          editorIndex: 1
        }, {
          editorName: 'period',
          editorIndex: 2
        }].forEach(function($__8) {
          var $__9 = $__8,
              editorName = $__9.editorName,
              editorIndex = $__9.editorIndex;
          QUnit.test(("Pressing escape when focus the " + editorName + " editor must hide the popup"), function(assert) {
            var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
            this.dateBox.option({
              pickerType: 'calendar',
              type: 'datetime'
            });
            this.dateBox.open();
            $(this.dateBox.content()).find(("." + TEXTEDITOR_INPUT_CLASS)).eq(editorIndex).trigger(escapeKeyDown);
            assert.ok(!this.dateBox.option('opened'));
          });
        });
        QUnit.test('DateBox value is applied after the second press of the "Enter" key', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          this.dateBox.option({
            pickerType: 'calendar',
            type: 'datetime',
            applyValueMode: 'useButtons',
            focusStateEnabled: true,
            value: null,
            opened: true
          });
          var instance = this.dateBox;
          var $content = $(instance.content());
          var $input = $(instance.element()).find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          function getValue() {
            return instance.option('value');
          }
          function calendarHasSelectedDate() {
            return $content.find('.dx-calendar-selected-date').length > 0;
          }
          assert.notOk(getValue());
          assert.notOk(calendarHasSelectedDate());
          keyboard.press('enter');
          assert.notOk(getValue(), 'value does not applied to the DateBox after the first press of the "Enter" key');
          assert.ok(calendarHasSelectedDate(), 'but Calendar got selected date');
          keyboard.press('enter');
          assert.ok(getValue(), 'DateBox got selected value after the second press of the "Enter" key');
        });
      });
      QUnit.module('Popup open state', function() {
        ['date', 'time'].forEach(function(type) {
          ['calendar', 'list'].forEach(function(pickerType) {
            QUnit.testInActiveWindow(("Popup should be closed if tab key was pressed when applyValueMode: \"instantly\", type: \"" + type + "\", pickerType: \"" + pickerType + "\""), function(assert) {
              var $dateBox = $('#dateBox').dxDateBox({
                focusStateEnabled: true,
                applyValueMode: 'instantly',
                type: type,
                pickerType: pickerType
              });
              var dateBox = $dateBox.dxDateBox('instance');
              var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
              var keyboard = keyboardMock($input);
              dateBox.open();
              keyboard.keyDown('tab');
              assert.strictEqual(dateBox.option('opened'), false, 'popup is closed');
            });
          });
        });
        ['date', 'time', 'datetime'].forEach(function(type) {
          ['calendar', 'list', 'rollers'].forEach(function(pickerType) {
            QUnit.testInActiveWindow(("Popup should be opened if tab key was pressed when applyValueMode: \"useButtons\", type: \"" + type + "\", pickerType: \"" + pickerType + "\""), function(assert) {
              var $dateBox = $('#dateBox').dxDateBox({
                focusStateEnabled: true,
                applyValueMode: 'useButtons',
                type: type,
                pickerType: pickerType
              });
              var dateBox = $dateBox.dxDateBox('instance');
              var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
              var keyboard = keyboardMock($input);
              dateBox.open();
              keyboard.keyDown('tab');
              assert.strictEqual(dateBox.option('opened'), true, 'popup is still opened');
            });
          });
        });
      });
      QUnit.module('aria accessibility', {}, function() {
        QUnit.test('aria-activedescendant on combobox should point to the active list item (date view)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#dateBox').dxDateBox({
            value: new Date(2008, 7, 8, 5, 0),
            opened: true,
            pickerType: 'calendar'
          });
          var $input = $element.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.keyDown('right');
          var $contouredCell = $('.dx-calendar-contoured-date');
          assert.notEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant exists');
          assert.equal($input.attr('aria-activedescendant'), $contouredCell.attr('id'), 'aria-activedescendant equals contoured cell\'s id');
        });
        QUnit.test('aria-activedescendant on combobox should point to the active list item (time view)', function(assert) {
          var isDesktop = devices.real().deviceType === 'desktop';
          if (isDesktop) {
            var $element = $('#dateBox').dxDateBox({
              type: 'time',
              pickerType: 'list',
              value: new Date(2008, 7, 8, 5, 0),
              opened: true
            });
            var $input = $element.find(("." + TEXTEDITOR_INPUT_CLASS));
            var keyboard = keyboardMock($input);
            keyboard.keyDown('down');
            var $activeItem = $('.dx-state-focused');
            assert.notEqual($input.attr('aria-activedescendant'), undefined, 'aria-activedescendant exists');
            assert.equal($input.attr('aria-activedescendant'), $activeItem.attr('id'), 'aria-activedescendant equals contoured cell\'s id');
          } else {
            assert.ok(true, 'skip test on devices');
          }
        });
      });
      QUnit.module('pickerType', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('T319039 - classes on DateBox should be correct after the \'pickerType\' option changed', function(assert) {
          var pickerTypes = ['rollers', 'calendar', 'native', 'list'];
          var $dateBox = $('#dateBox').dxDateBox();
          var dateBox = $dateBox.dxDateBox('instance');
          var areClassesCorrect = function(currentPickerType) {
            for (var i = 0,
                n = pickerTypes.length; i < n; i++) {
              var pickerType = pickerTypes[i];
              var className = DATEBOX_CLASS + '-' + pickerType;
              if (currentPickerType === pickerType ^ $dateBox.hasClass(className)) {
                return false;
              }
            }
            return true;
          };
          for (var i = 0,
              n = pickerTypes.length; i < n; i++) {
            var pickerType = pickerTypes[i];
            var type = pickerType === 'list' ? 'time' : 'date';
            dateBox.option({
              type: type,
              pickerType: pickerType
            });
            assert.ok(areClassesCorrect(pickerType), 'classes for ' + pickerType + ' are correct');
          }
        });
        [{
          pickerType: 'calendar',
          type: 'datetime'
        }, {
          pickerType: 'rollers',
          type: 'datetime'
        }, {
          pickerType: 'list',
          type: 'time'
        }].forEach(function($__8) {
          var $__9 = $__8,
              type = $__9.type,
              pickerType = $__9.pickerType;
          QUnit.test(("Overlay wrapper should have 'dx-dropdowneditor-overlay' class in DateBox with " + pickerType + " pickerType"), function(assert) {
            $('#dateBox').dxDateBox({
              type: type,
              pickerType: pickerType,
              opened: true
            });
            assert.ok($(("." + DATEBOX_WRAPPER_CLASS)).hasClass(DROPDOWNEDITOR_OVERLAY_CLASS));
          });
        });
        QUnit.test('Calendar pickerType and time type should use time list (T248089)', function(assert) {
          var currentDevice = devices.real();
          devices.real({platform: 'android'});
          try {
            var $element = $('#dateBox').dxDateBox({
              type: 'time',
              pickerType: 'calendar'
            });
            var instance = $element.dxDateBox('instance');
            assert.equal(instance._strategy.NAME, 'List', 'strategy is correct');
          } finally {
            devices.real(currentDevice);
          }
        });
      });
      QUnit.module('datebox validation', {}, function() {
        QUnit.test('validation should be correct when max value is chosen (T266206)', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 10),
            max: new Date(2015, 6, 14),
            value: new Date(2015, 6, 14, 15, 30)
          });
          var dateBox = $dateBox.dxDateBox('instance');
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
        });
        QUnit.test('datebox should create validation error if user set isValid = false', function(assert) {
          var dateBox = $('#widthRootStyle').dxDateBox({
            type: 'datetime',
            isValid: false,
            value: null
          }).dxDateBox('instance');
          assert.notOk(dateBox.option('isValid'), 'isValid = false does not change on widget init by value validation');
          dateBox.option('value', new Date(2018, 1, 1));
          assert.ok(dateBox.option('isValid'), 'valid after valid value is setted');
          dateBox.option('isValid', false);
          assert.notOk(dateBox.option('isValid'), 'set isValid = false by API');
        });
        QUnit.test('datebox should be invalid after out of range value was setted', function(assert) {
          var dateBox = $('#widthRootStyle').dxDateBox({
            type: 'datetime',
            min: new Date(2019, 1, 1),
            value: null
          }).dxDateBox('instance');
          assert.ok(dateBox.option('isValid'), 'widget is valid');
          dateBox.option('value', new Date(2018, 0, 1));
          assert.notOk(dateBox.option('isValid'), 'widget is invalid');
          dateBox.option('value', new Date(2019, 1, 2));
          assert.ok(dateBox.option('isValid'), 'widget is valid');
        });
        QUnit.test('datebox should change validation state if value was changed by keyboard', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: null,
            pickerType: 'calendar'
          }).dxValidator({validationRules: [{type: 'required'}]});
          var dateBox = $dateBox.dxDateBox('instance');
          var keyboard = keyboardMock($dateBox.find(("." + TEXTEDITOR_INPUT_CLASS)));
          keyboard.type('10/10/2014').change();
          assert.ok(dateBox.option('isValid'), 'widget is valid');
        });
        QUnit.test('required validator should not block valuechange in datetime strategy', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var $dateBox = $('#dateBox').dxDateBox({
              type: 'datetime',
              pickerType: 'calendar',
              opened: true,
              value: null
            }).dxValidator({validationRules: [{type: 'required'}]});
            clock.tick(10);
            var dateBox = $dateBox.dxDateBox('instance');
            var $done = $(dateBox.content()).parent().find(APPLY_BUTTON_SELECTOR);
            $done.trigger('dxclick');
            assert.ok(dateBox.option('isValid'), 'widget is valid');
            assert.ok(dateBox.option('value'), 'value is not empty');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('widget is still valid after drop down is opened', function(assert) {
          var startDate = new Date(2015, 1, 1, 8, 12);
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: startDate,
            pickerType: 'calendar',
            applyValueMode: 'instantly'
          }).dxValidator({validationRules: [{type: 'required'}, {
              type: 'range',
              min: new Date(2016, 0, 1)
            }]});
          var dateBox = $dateBox.dxDateBox('instance');
          assert.equal(dateBox.option('value'), startDate, 'start value is correct');
          assert.ok(dateBox.option('isValid'), 'value is valid');
          dateBox.option('opened', true);
          assert.ok(dateBox.option('isValid'), 'value is still valid after drop down is opened');
          assert.equal(dateBox.option('value'), startDate, 'start value is correct');
          dateBox.option('value', new Date(2017, 1, 1));
          assert.ok(dateBox.option('isValid'), 'value is valid too');
        });
        QUnit.test('datebox with \'date\' type should ignore time in min/max options', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date(2015, 0, 31, 10),
            focusStateEnabled: true,
            min: new Date(2015, 0, 31, 12)
          });
          assert.ok(!$dateBox.hasClass('dx-invalid'), 'datebox should stay valid');
        });
        QUnit.test('time works correct when value is invalid', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'time',
            pickerType: 'list',
            valueChangeEvent: 'change'
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var $button = $dateBox.find(("." + DROP_DOWN_BUTTON_CLASS));
          $input.val('');
          $($input).trigger('change');
          $($button).trigger('dxclick');
          var popup = $dateBox.find('.dx-popup').dxPopup('instance');
          assert.ok(popup.option('visible'), 'popup is opened');
        });
        QUnit.test('invalidDateMessage', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.expect(0);
            return;
          }
          var $dateBox = $('#dateBox').dxDateBox({invalidDateMessage: 'A lorem ipsum...'});
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $input.val('ips');
          $($input).trigger('change');
          var validationError = $dateBox.dxDateBox('instance').option('validationError').message;
          assert.equal(validationError, 'A lorem ipsum...', 'validation message is correct');
        });
        QUnit.test('change invalidDateMessage at runtime', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            invalidDateMessage: 'test message'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          $input.val('ips');
          $($input).trigger('change');
          dateBox.option('invalidDateMessage', 'another test message');
          $($input).trigger('change');
          var validationError = $dateBox.dxDateBox('instance').option('validationError').message;
          assert.equal(validationError, 'another test message', 'validation message is correct');
        });
        QUnit.test('dateOutOfRangeMessage', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            dateOutOfRangeMessage: 'A lorem ipsum...',
            min: new Date(2015, 5, 5),
            max: new Date(2016, 5, 5),
            value: new Date(2017, 5, 5)
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $($input).trigger('change');
          var validationError = $dateBox.dxDateBox('instance').option('validationError').message;
          assert.equal(validationError, 'A lorem ipsum...', 'validation message is correct');
        });
        QUnit.test('change dateOutOfRangeMessage at runtime', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            dateOutOfRangeMessage: 'test message',
            min: new Date(2015, 5, 5),
            max: new Date(2016, 5, 5),
            value: new Date(2017, 5, 5)
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          $($input).trigger('change');
          dateBox.option('dateOutOfRangeMessage', 'another test message');
          $($input).trigger('change');
          var validationError = dateBox.option('validationError.message');
          assert.equal(validationError, 'another test message', 'validation message is correct');
        });
        QUnit.test('year is too big', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            displayFormat: 'd/M/y',
            valueChangeEvent: 'change',
            mode: 'text'
          });
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $input.val('01/01/999999999');
          $($input).trigger('change');
          assert.equal($dateBox.dxDateBox('option', 'isValid'), false, 'datebox has invalid state');
          assert.equal($input.val(), '01/01/999999999', 'value is not changed');
        });
        QUnit.test('datebox should not ignore the time component in validation when it is changed by timeview (T394206)', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'datetime',
            pickerType: 'calendar',
            value: new Date(2016, 6, 8, 8, 34),
            max: new Date(2016, 6, 8, 9, 15),
            opened: true
          });
          var $dateBoxWrapper = $('.' + DATEBOX_WRAPPER_CLASS);
          var $hoursInput = $dateBoxWrapper.find('.dx-numberbox').eq(0).find('.' + TEXTEDITOR_INPUT_CLASS);
          $hoursInput.val(9).trigger('change');
          $dateBoxWrapper.find('.dx-button.dx-popup-done').trigger('dxclick');
          assert.ok($dateBox.hasClass('dx-invalid'), 'datebox should be marked as invalid');
        });
        QUnit.test('datebox should be valid if value was changed in the onValueChanged handle(T413553)', function(assert) {
          var date = new Date();
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date(2016, 1, 1),
            onValueChanged: function(e) {
              if (!e.value) {
                e.component.option('value', date);
              }
            }
          });
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          $input.val('');
          $($input).trigger('change');
          assert.equal(date, $dateBox.dxDateBox('instance').option('value'), 'value set correctly');
          assert.ok(!$dateBox.hasClass('dx-invalid'), 'datebox should be marked as valid');
        });
        QUnit.test('custom validation should be more important than internal', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({value: new Date(2016, 1, 1)}).dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: function(options) {
                return false;
              }
            }]});
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.option('value', new Date());
          assert.notOk(dateBox.option('isValid'), 'dateBox is invalid');
          assert.ok($dateBox.hasClass('dx-invalid'), 'datebox should be marked as invalid');
        });
        QUnit.test('Internal validation should be valid when null value was set to null', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({value: new Date(2016, 1, 1)});
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.option('value', null);
          assert.ok(!$dateBox.hasClass('dx-invalid'), 'datebox should not be marked as invalid');
        });
        QUnit.test('Internal validation shouldn\'t be reset value if localization return null for invalid value', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            value: new Date(2016, 1, 1)
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.type('abc').change();
          assert.equal($dateBox.hasClass('dx-invalid'), 1, 'datebox should be marked as invalid');
          assert.equal(dateBox.option('text'), 'abc2/1/2016', 'text option shouldn\'t be reset');
        });
        QUnit.test('Validation should be correct when year of the value less than 100', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 10),
            max: new Date(2015, 6, 14),
            value: new Date(2015, 6, 12),
            valueChangeEvent: 'change',
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          $input.val('1/1/99');
          $input.change();
          assert.notOk(dateBox.option('isValid'), 'datebox is invalid');
          var validationError = dateBox.option('validationError').message;
          assert.equal(validationError, 'Value is out of range', 'validation message is correct');
        });
        QUnit.test('dxDateBox should validate value after change \'max\' option', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            max: new Date(2015, 6, 14),
            value: new Date(2015, 6, 12),
            pickerType: 'calendar'
          }).dxDateBox('instance');
          dateBox.option('value', new Date(2015, 6, 20));
          dateBox.option('max', new Date(2015, 6, 25));
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
        });
        QUnit.test('dxDateBox should validate value after change \'min\' option', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 14),
            value: new Date(2015, 6, 18),
            pickerType: 'calendar'
          }).dxDateBox('instance');
          dateBox.option('value', new Date(2015, 6, 10));
          dateBox.option('min', new Date(2015, 6, 5));
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
        });
        QUnit.test('dxDateBox should become invalid if min/max options changed', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 14),
            value: new Date(2015, 6, 18),
            max: new Date(2015, 6, 20),
            pickerType: 'calendar'
          }).dxDateBox('instance');
          dateBox.option('min', new Date(2015, 6, 19));
          assert.notOk(dateBox.option('isValid'), 'datebox is invalid');
          dateBox.option('min', new Date(2015, 6, 14));
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
          dateBox.option('max', new Date(2015, 6, 17));
          assert.notOk(dateBox.option('isValid'), 'datebox is invalid');
          dateBox.option('max', new Date(2015, 6, 20));
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
        });
        QUnit.test('required validator should not be triggered when another validation rule has been changed', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 14),
            value: null,
            max: new Date(2015, 6, 20),
            pickerType: 'calendar'
          }).dxValidator({validationRules: [{
              type: 'required',
              message: 'Date is required'
            }]}).dxDateBox('instance');
          dateBox.option({
            min: new Date(2015, 6, 13),
            max: new Date(2015, 6, 21)
          });
          assert.ok(dateBox.option('isValid'), 'datebox is valid');
        });
        QUnit.test('required validator should be triggered when another validation rule has been changed for widget in invalid state (T838294)', function(assert) {
          var dateBox = $('#dateBox').dxDateBox({
            min: new Date(2015, 6, 14),
            value: new Date(2015, 6, 15),
            max: new Date(2015, 6, 20),
            pickerType: 'calendar'
          }).dxValidator({validationRules: [{
              type: 'required',
              message: 'Date is required'
            }]}).dxDateBox('instance');
          dateBox.option('value', null);
          dateBox.option({
            min: new Date(2015, 6, 13),
            max: new Date(2015, 6, 21)
          });
          assert.notOk(dateBox.option('isValid'), 'datebox is invalid');
        });
        QUnit.test('Validation callback should be called only once when value changes (T879881)', function(assert) {
          var validationCallbackSpy = sinon.spy();
          var dateBox = $('#dateBox').dxDateBox({value: '2020-01-15'}).dxValidator({validationRules: [{
              type: 'custom',
              reevaluate: true,
              validationCallback: validationCallbackSpy
            }]}).dxDateBox('instance');
          var date = new Date(2020, 0, 1);
          dateBox.option('value', date);
          var args = validationCallbackSpy.getCall(0).args[0];
          assert.ok(validationCallbackSpy.calledOnce, 'validation callback is called only once');
          assert.strictEqual(args.value, date, 'value is correct');
          assert.ok(args.validator, 'validator is passed');
          assert.ok(args.rule, 'rule is passed');
        });
        QUnit.test('Validation callback should be called only once when value changes by keyboard typing (T879881)', function(assert) {
          var validationCallbackSpy = sinon.spy();
          var dateBox = $('#dateBox').dxDateBox({
            value: '2020-01-15',
            pickerType: 'calendar'
          }).dxValidator({validationRules: [{
              type: 'custom',
              reevaluate: true,
              validationCallback: validationCallbackSpy
            }]}).dxDateBox('instance');
          var $input = $(dateBox.$element().find(("." + TEXTEDITOR_INPUT_CLASS)));
          var keyboard = keyboardMock($input);
          keyboard.caret({
            start: 0,
            end: 9
          }).type('1/1/2020').press('enter');
          var args = validationCallbackSpy.getCall(0).args[0];
          assert.ok(validationCallbackSpy.calledOnce, 'validation callback is called only once');
          assert.strictEqual(args.value, '2020-01-01', 'value is correct');
          assert.ok(args.validator, 'validator is passed');
          assert.ok(args.rule, 'rule is passed');
        });
        QUnit.testInActiveWindow('DateBox should validate value after remove an invalid characters', function(assert) {
          var $element = $('#dateBox');
          var dateBox = $element.dxDateBox({
            value: new Date(2015, 6, 18),
            pickerType: 'calendar'
          }).dxDateBox('instance');
          var $input = $element.find(("." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.caret(dateBox.option('text').length - 1).type('d').press('enter');
          assert.notOk(dateBox.option('isValid'));
          keyboard.press('backspace').press('enter');
          assert.ok(dateBox.option('isValid'));
        });
        QUnit.test('datebox should pass Date value to the validationCallback by default', function(assert) {
          var validationCallback = sinon.stub().returns(true);
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: null,
            pickerType: 'calendar'
          }).dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: validationCallback
            }]});
          var keyboard = keyboardMock($dateBox.find(("." + TEXTEDITOR_INPUT_CLASS)));
          keyboard.type('10/10/2020').change();
          var value = validationCallback.lastCall.args[0].value;
          assert.ok(validationCallback.calledOnce, 'validationCallback called once');
          assert.ok(typeUtils.isDate(value), 'value type is Date');
        });
        QUnit.test('datebox should pass string value to the validationCallback when "dateSerializationFormat" defined', function(assert) {
          var validationCallback = sinon.stub().returns(true);
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: null,
            pickerType: 'calendar',
            dateSerializationFormat: 'yyyy-MM-dd'
          }).dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: validationCallback
            }]});
          var keyboard = keyboardMock($dateBox.find(("." + TEXTEDITOR_INPUT_CLASS)));
          keyboard.type('10/10/2020').change();
          var value = validationCallback.lastCall.args[0].value;
          assert.ok(validationCallback.calledOnce, 'validationCallback called once');
          assert.strictEqual(value, '2020-10-10', 'String value passed');
        });
      });
      QUnit.module('DateBox number and string value support', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('string value should be supported', function(assert) {
          assert.expect(1);
          $('#dateBox').dxDateBox({
            value: '2015/08/09',
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('number value should be supported', function(assert) {
          assert.expect(1);
          var date = new Date(2015, 7, 7);
          $('#dateBox').dxDateBox({
            value: date.valueOf(),
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('date should be displayed correctly', function(assert) {
          var date = new Date(2015, 7, 14);
          var $dateBox = $('#dateBox').dxDateBox({
            type: 'date',
            value: new Date(date)
          });
          var instance = $dateBox.dxDateBox('instance');
          var $input = $dateBox.find('.' + TEXTEDITOR_INPUT_CLASS);
          var expectedText = $input.text();
          instance.option('value', date.valueOf());
          assert.equal($input.text(), expectedText, 'date is displayed correctly when specified by number');
          instance.option('value', dateLocalization.format(date, instance.option('displayFormat')));
          assert.equal($input.text(), expectedText, 'date is displayed correctly when specified by string');
        });
        QUnit.test('value should save its type after picker was used (type = \'date\')', function(assert) {
          var date = new Date(2015, 7, 9);
          var dateString = '2015/08/09';
          var newDate = new Date(2015, 7, 21);
          var newDateString = '2015/08/21';
          var $dateBox = $('#dateBox').dxDateBox({
            value: dateString,
            type: 'date',
            pickerType: 'calendar',
            applyValueMode: 'instantly',
            opened: true
          });
          var instance = $dateBox.dxDateBox('instance');
          $('td[data-value=\'' + getShortDate(newDate) + '\']').trigger('dxclick');
          assert.equal($traceurRuntime.typeof(instance.option('value')), 'string', 'value type is saved');
          assert.equal(instance.option('value'), newDateString, 'value is correct');
          instance.option('value', date.valueOf());
          instance.open();
          $('td[data-value=\'' + getShortDate(newDate) + '\']').trigger('dxclick');
          assert.equal($traceurRuntime.typeof(instance.option('value')), 'number', 'value type is saved');
          assert.equal(instance.option('value'), newDate.valueOf(), 'value is correct');
        });
        QUnit.test('value should remain correct after picker was used (type = \'datetime\')', function(assert) {
          var dateString = '2015/08/09 18:33:00';
          var newDate = new Date(2015, 7, 21, 18, 33);
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            applyValueMode: 'instantly',
            type: 'datetime',
            value: dateString,
            opened: true
          });
          var instance = $dateBox.dxDateBox('instance');
          $('td[data-value=\'' + getShortDate(newDate) + '\']').trigger('dxclick');
          assert.deepEqual(new Date(instance.option('value')), newDate, 'value is correct');
        });
        QUnit.test('value should remain correct after picker was used (type = \'time\')', function(assert) {
          var $dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            applyValueMode: 'instantly',
            type: 'time',
            value: dateLocalization.format(new Date(2015, 7, 9, 18, 33), 'yyyy/MM/dd HH:mm:ss'),
            opened: true
          });
          var instance = $dateBox.dxDateBox('instance');
          $('.dx-list-item').eq(37).trigger('dxclick');
          var time = dateLocalization.format(new Date(instance.option('value')), 'longtime');
          var expectedTime = dateLocalization.format(new Date(2015, 7, 9, 18, 30), 'longtime');
          assert.equal(time, expectedTime, 'value is correct');
        });
        QUnit.test('string value for the \'min\' option should be supported', function(assert) {
          assert.expect(1);
          $('#dateBox').dxDateBox({
            value: '2015/08/09',
            min: '2015/05/09',
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('number value for the \'min\' option should be supported', function(assert) {
          assert.expect(1);
          $('#dateBox').dxDateBox({
            value: new Date(2015, 7, 7).valueOf(),
            min: new Date(2015, 4, 7).valueOf(),
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('string value for the \'max\' option should be supported', function(assert) {
          assert.expect(1);
          $('#dateBox').dxDateBox({
            value: '2015/08/09',
            max: '2015/10/09',
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('number value for the \'max\' option should be supported', function(assert) {
          assert.expect(1);
          $('#dateBox').dxDateBox({
            value: new Date(2015, 7, 7).valueOf(),
            max: new Date(2015, 9, 7).valueOf(),
            onContentReady: function() {
              assert.ok(true, 'widget is rendered without errors');
            }
          });
        });
        QUnit.test('ISO strings support', function(assert) {
          var defaultForceIsoDateParsing = config().forceIsoDateParsing;
          config().forceIsoDateParsing = true;
          try {
            $('#dateBox').dxDateBox({
              value: '2016-01-11T12:00:00',
              min: '2016-01-10T17:29:00',
              max: '2016-01-13T17:29:00',
              mode: 'text'
            });
            var $input = $('#dateBox').find(("." + TEXTEDITOR_INPUT_CLASS));
            assert.equal($input.val(), '1/11/2016', 'text is correct');
            $($input.val('1/12/2016')).trigger('change');
            assert.equal($('#dateBox').dxDateBox('option', 'value'), '2016-01-12T12:00:00', 'value is correct');
          } finally {
            config().forceIsoDateParsing = defaultForceIsoDateParsing;
          }
        });
        QUnit.test('ISO strings support dateSerializationFormat', function(assert) {
          var defaultForceIsoDateParsing = config().forceIsoDateParsing;
          config().forceIsoDateParsing = true;
          try {
            $('#dateBox').dxDateBox({
              value: '2016-01-11T00:00:00Z',
              dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ssZ',
              mode: 'text'
            });
            var serializeUTCDate = function(year, month, day) {
              return dateSerialization.serializeDate(new Date(Date.UTC(year, month, day)), 'M/d/y');
            };
            var $input = $('#dateBox').find(("." + TEXTEDITOR_INPUT_CLASS));
            assert.equal($input.val(), serializeUTCDate(2016, 0, 11), 'text is correct');
            $($input.val(serializeUTCDate(2016, 0, 12))).trigger('change');
            assert.equal($('#dateBox').dxDateBox('option', 'value'), '2016-01-12T00:00:00Z', 'value is correct');
          } finally {
            config().forceIsoDateParsing = defaultForceIsoDateParsing;
          }
        });
        QUnit.test('enter value with big year if dateSerializationFormat is defined', function(assert) {
          var defaultForceIsoDateParsing = config().forceIsoDateParsing;
          config().forceIsoDateParsing = true;
          try {
            $('#dateBox').dxDateBox({
              dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
              mode: 'text'
            });
            var $input = $('#dateBox').find(("." + TEXTEDITOR_INPUT_CLASS));
            $($input.val('1/12/21016')).trigger('change');
            assert.equal($('#dateBox').dxDateBox('option', 'value'), '21016-01-12T00:00:00', 'value is correct');
          } finally {
            config().forceIsoDateParsing = defaultForceIsoDateParsing;
          }
        });
        QUnit.test('enter value with big year if dateSerializationFormat is defined and forceIsoDateParsing is disabled', function(assert) {
          var defaultForceIsoDateParsing = config().forceIsoDateParsing;
          config().forceIsoDateParsing = false;
          try {
            $('#dateBox').dxDateBox({
              dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
              mode: 'text'
            });
            var $input = $('#dateBox').find(("." + TEXTEDITOR_INPUT_CLASS));
            $($input.val('1/12/21016')).trigger('change');
            assert.deepEqual($('#dateBox').dxDateBox('option', 'value'), new Date(21016, 0, 12), 'value is correct and it is not serialized');
          } finally {
            config().forceIsoDateParsing = defaultForceIsoDateParsing;
          }
        });
        QUnit.test('First century year value should works correctly(T905007)', function(assert) {
          try {
            var dateBox = $('#dateBox').dxDateBox({
              value: '3/16/1964',
              min: new Date(-50, 1, 1),
              displayFormat: 'shortdate',
              pickerType: 'calendar'
            }).dxDateBox('instance');
            var $input = $('#dateBox').find(("." + TEXTEDITOR_INPUT_CLASS));
            $($input.val('1/1/15')).trigger('change');
            dateBox.option('opened', true);
            assert.deepEqual($('#dateBox').dxDateBox('option', 'text'), '1/1/15');
          } catch (e) {
            assert.ok(false, 'exception raised: ' + e.message);
          }
        });
        QUnit.test('onValueChanged should not be fired when on popup opening', function(assert) {
          var isValueChangedCalled = false;
          var dateBox = $('#dateBox').dxDateBox({
            value: undefined,
            mode: 'text',
            onValueChanged: function() {
              isValueChangedCalled = true;
            }
          }).dxDateBox('instance');
          dateBox.option('opened', true);
          assert.ok(!isValueChangedCalled, 'onValueChanged is not called');
        });
        QUnit.test('value should be changed on cell click in calendar with defined dateSerializationFormat via defaultOptions', function(assert) {
          Calendar.defaultOptions({options: {dateSerializationFormat: 'yyyy-MM-dd'}});
          var $dateBox = $('#dateBox').dxDateBox({
            value: new Date(2017, 11, 25),
            pickerType: 'calendar'
          });
          var dateBox = $dateBox.dxDateBox('instance');
          dateBox.open();
          $(("." + CALENDAR_CELL_CLASS)).eq(0).trigger('dxclick');
          assert.deepEqual(dateBox.option('value'), new Date(2017, 10, 26), 'value is changed');
          Calendar.defaultOptions({options: {dateSerializationFormat: null}});
        });
      });
      testModule('native picker', function() {
        [{
          editorType: 'date',
          checkDate: true,
          checkTime: false
        }, {
          editorType: 'time',
          checkDate: false,
          checkTime: true
        }, {
          editorType: 'datetime',
          checkDate: true,
          checkTime: true
        }].forEach(function($__8) {
          var $__9 = $__8,
              editorType = $__9.editorType,
              checkDate = $__9.checkDate,
              checkTime = $__9.checkTime;
          test(("set new value for editor with " + editorType + " type"), function(assert) {
            var $editor = $('#dateBox').dxDateBox({
              pickerType: 'native',
              type: editorType,
              value: new Date(2020, 10, 11, 13, 0, 0)
            });
            var instance = $editor.dxDateBox('instance');
            var newEditorInstance = $('<div>').appendTo('#qunit-fixture').dxDateBox({
              pickerType: 'native',
              type: editorType,
              value: new Date(2020, 10, 12, 13, 1, 0)
            }).dxDateBox('instance');
            var newValue = newEditorInstance.option('text');
            $editor.find(("." + TEXTEDITOR_INPUT_CLASS)).val(newValue).trigger('change');
            assert.ok(instance.option('isValid'), 'New value is valid');
            var currentDate = instance.option('value');
            if (checkDate) {
              assert.strictEqual(currentDate.getFullYear(), 2020);
              assert.strictEqual(currentDate.getMonth(), 10);
              assert.strictEqual(currentDate.getDate(), 12);
            }
            if (checkTime) {
              assert.strictEqual(currentDate.getHours(), 13);
              assert.strictEqual(currentDate.getMinutes(), 1);
            }
          });
        });
      });
      QUnit.module('valueChanged handler should receive correct event', {
        beforeEach: function() {
          var $__3 = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.valueChangedHandler = sinon.stub();
          var initialOptions = {
            opened: true,
            onValueChanged: this.valueChangedHandler,
            pickerType: 'calendar',
            type: 'date'
          };
          this.init = function(options) {
            $__3.$element = $('#dateBox').dxDateBox(options);
            $__3.instance = $__3.$element.dxDateBox('instance');
            $__3.$input = $__3.$element.find(("." + TEXTEDITOR_INPUT_CLASS));
            $__3.keyboard = keyboardMock($__3.$input);
          };
          this.testProgramChange = function(assert) {
            $__3.instance.option('value', new Date(1991, 5, 5));
            var callCount = $__3.valueChangedHandler.callCount;
            var event = $__3.valueChangedHandler.getCall(callCount - 1).args[0].event;
            assert.strictEqual(event, undefined, 'event is undefined');
          };
          this.reinit = function(options) {
            $__3.instance.dispose();
            $__3.init($.extend({}, initialOptions, options));
          };
          this.checkEvent = function(assert, type, target, key) {
            var event = $__3.valueChangedHandler.getCall(0).args[0].event;
            assert.strictEqual(event.type, type, 'event type is correct');
            assert.strictEqual(event.target, target.get(0), 'event target is correct');
            if (type === 'keydown') {
              assert.strictEqual(normalizeKeyName(event), normalizeKeyName({key: key}), 'event key is correct');
            }
          };
          this.init(initialOptions);
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        test('on runtime change', function(assert) {
          this.testProgramChange(assert);
        });
        [false, true].forEach(function(useMaskBehavior) {
          test(("on change when useMaskBehavior=" + useMaskBehavior), function(assert) {
            this.reinit({useMaskBehavior: useMaskBehavior});
            this.keyboard.type('10/10/2020').change();
            this.checkEvent(assert, 'change', this.$input);
            this.testProgramChange(assert);
          });
          test(("on enter press after typing when useMaskBehavior=" + useMaskBehavior), function(assert) {
            this.reinit({useMaskBehavior: useMaskBehavior});
            this.keyboard.type('10/10/2020').press('enter');
            this.checkEvent(assert, 'keydown', this.$input, 'enter');
            this.testProgramChange(assert);
          });
          test(("on enter press after clearing when useMaskBehavior=" + useMaskBehavior), function(assert) {
            this.reinit({
              useMaskBehavior: useMaskBehavior,
              value: new Date()
            });
            this.$input.val('');
            this.instance.option('text', '');
            this.$input.trigger($.Event('keydown', {key: 'Enter'}));
            this.checkEvent(assert, 'keydown', this.$input, 'enter');
            this.testProgramChange(assert);
          });
          QUnit.skip(("on calendar cell selecting using enter when useMaskBehavior=" + useMaskBehavior), function(assert) {
            this.reinit({useMaskBehavior: useMaskBehavior});
            var $calendarCell = $('.dx-calendar-today');
            this.keyboard.press('enter');
            this.checkEvent(assert, 'keydown', $calendarCell, 'enter');
            this.testProgramChange(assert);
          });
        });
        ['calendar', 'rollers'].forEach(function(pickerType) {
          ['date', 'datetime', 'time'].forEach(function(type) {
            QUnit.test(("on click on apply button if pickerType=" + pickerType + " and type=" + type), function(assert) {
              this.reinit({
                applyValueMode: 'useButtons',
                pickerType: pickerType,
                type: type
              });
              var $applyButton = $(this.instance.content()).parent().find(APPLY_BUTTON_SELECTOR);
              if (pickerType === 'calendar' && /date/.test(type)) {
                $(("." + CALENDAR_CELL_CLASS)).eq(0).trigger('dxclick');
              } else if (pickerType === 'calendar' && type === 'time') {
                $(this.instance.content()).find(LIST_ITEM_SELECTOR).eq(1).trigger('dxclick');
              }
              $applyButton.trigger('dxclick');
              this.checkEvent(assert, 'dxclick', $applyButton);
              this.testProgramChange(assert);
            });
          });
        });
        QUnit.test('on click on clear button', function(assert) {
          this.reinit({
            showClearButton: true,
            value: new Date()
          });
          var $clearButton = this.$element.find(("." + CLEAR_BUTTON_AREA_CLASS));
          $clearButton.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', $clearButton);
          this.testProgramChange(assert);
        });
        QUnit.module('list integration', {beforeEach: function() {
            this.reinit({
              pickerType: 'list',
              type: 'time'
            });
            this.$listItem = $(this.instance.content()).find(LIST_ITEM_SELECTOR).eq(0);
          }}, function() {
          QUnit.test('on list item click', function(assert) {
            this.$listItem.trigger('dxclick');
            this.checkEvent(assert, 'dxclick', this.$listItem);
            this.testProgramChange(assert);
          });
          QUnit.test('on list item selecting using enter', function(assert) {
            this.keyboard.press('down').press('enter');
            this.checkEvent(assert, 'keydown', this.$listItem, 'enter');
            this.testProgramChange(assert);
          });
        });
        QUnit.test('on calendar cell click', function(assert) {
          var $calendarCell = $(("." + CALENDAR_CELL_CLASS)).eq(0);
          $calendarCell.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', $calendarCell);
          this.testProgramChange(assert);
        });
        QUnit.test('on click on today button', function(assert) {
          this.reinit({calendarOptions: {showTodayButton: true}});
          var $todayButton = $(this.instance.content()).parent().find(("." + CALENDAR_TODAY_BUTTON_CLASS));
          $todayButton.trigger('dxclick');
          this.checkEvent(assert, 'dxclick', $todayButton);
          this.testProgramChange(assert);
        });
      });
      QUnit.module('validation', {beforeEach: function() {
          this.$dateBox = $('#dateBox').dxDateBox({
            pickerType: 'calendar',
            showClearButton: true
          });
          this.dateBox = this.$dateBox.dxDateBox('instance');
          this.$input = this.$dateBox.find(("." + TEXTEDITOR_INPUT_CLASS));
          this.keyboard = keyboardMock(this.$input);
          this.$clearButton = this.$dateBox.find(("." + CLEAR_BUTTON_AREA_CLASS));
        }}, function() {
        [null, new Date(2020, 1, 1)].forEach(function(value) {
          QUnit.test(("click on clear button should raise custom validation when value is " + (value ? 'custom' : 'default') + " (T993296)"), function(assert) {
            this.$dateBox.dxValidator({validationRules: [{
                type: 'required',
                message: 'required'
              }]});
            this.dateBox.option({value: value});
            this.keyboard.type('123').press('enter');
            this.$clearButton.trigger('dxclick');
            assert.notOk(this.dateBox.option('isValid'), 'dateBox is invalid');
            assert.strictEqual(this.dateBox.option('validationError').message, 'required', 'validation callback is failed');
          });
          QUnit.test(("clear button click should raise inner validation when value is " + (value ? 'custom' : 'default')), function(assert) {
            this.dateBox.option({value: value});
            this.keyboard.type('123').press('enter');
            this.$clearButton.trigger('dxclick');
            assert.ok(this.dateBox.option('isValid'), 'datebox is valid after clear button click');
          });
          QUnit.test(("reset method call should raise inner validation when value is " + (value ? 'custom' : 'default')), function(assert) {
            this.dateBox.option({value: value});
            this.keyboard.type('123').press('enter');
            this.dateBox.reset();
            assert.ok(this.dateBox.option('isValid'), 'datebox is valid after clear button click');
          });
        });
        ['change', 'input', 'keydown', 'keyup', 'focusout', 'blur'].forEach(function(valueChangeEvent) {
          QUnit.test(("enter handler should raise custom validation when valueChangeEvent=" + valueChangeEvent + "(T999607)"), function(assert) {
            this.dateBox.option({valueChangeEvent: valueChangeEvent});
            this.$dateBox.dxValidator({validationRules: [{
                type: 'custom',
                message: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]});
            this.keyboard.type('1/1/2021').press('enter').change();
            assert.notOk(this.dateBox.option('isValid'), 'dateBox is invalid');
            assert.strictEqual(this.dateBox.option('validationError').message, 'custom', 'validation callback is failed');
          });
          QUnit.test(("enter handler should raise custom validation after invalid character remove when valueChangeEvent=" + valueChangeEvent), function(assert) {
            this.dateBox.option({valueChangeEvent: valueChangeEvent});
            this.$dateBox.dxValidator({validationRules: [{
                type: 'custom',
                message: 'custom',
                validationCallback: function() {
                  return false;
                }
              }]});
            this.keyboard.type('1/1/2021').press('enter').change().type('d').change().press('backspace').press('enter').change();
            assert.notOk(this.dateBox.option('isValid'), 'dateBox is invalid');
            assert.strictEqual(this.dateBox.option('validationError').message, 'custom', 'validation callback is failed');
          });
          QUnit.test(("custom validation should be raised only once after enter press when valueChangeEvent=" + valueChangeEvent), function(assert) {
            this.dateBox.option({valueChangeEvent: valueChangeEvent});
            var validationCallbackStub = sinon.stub();
            this.keyboard.type('1/1/2021');
            this.$dateBox.dxValidator({validationRules: [{
                reevaluate: true,
                type: 'custom',
                message: 'custom',
                validationCallback: validationCallbackStub
              }]});
            this.keyboard.press('enter').change();
            assert.ok(validationCallbackStub.calledOnce, 'custom validation was called only once');
          });
        });
        QUnit.test('custom validation should get actual value as parameter if value was not changed (T1024043)', function(assert) {
          var value = '2021-08-24';
          this.dateBox.option({value: value});
          var validationCallbackStub = sinon.stub();
          this.$dateBox.dxValidator({validationRules: [{
              type: 'custom',
              validationCallback: validationCallbackStub
            }]});
          this.keyboard.press('enter');
          assert.strictEqual(validationCallbackStub.getCall(0).args[0].value, value, 'validation callback value parameter is correct');
        });
        QUnit.test('validation icon should not be shown if _showValidationIcon=false', function(assert) {
          this.dateBox.option({
            _showValidationIcon: false,
            isValid: false
          });
          assert.strictEqual(this.$dateBox.hasClass(SHOW_INVALID_BADGE_CLASS), false, 'validation icon is be hidden');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/noIntl.js","jquery","ui/box","ui/calendar","ui/date_box","core/config","localization/date","core/utils/date_serialization","core/utils/date","core/devices","animation/fx","../../helpers/keyboardMock.js","../../helpers/shadowDom.js","localization/message","localization","localization/messages/ja.json!","../../helpers/pointerMock.js","core/utils/support","core/utils/type","ui/date_box/ui.date_utils","core/utils/common","core/utils/console","events/utils","../../helpers/calendarFixtures.js","ui/validator","generic_light.css!","core/utils/size","../DevExpress.ui.widgets/scrollableParts/scrollable.constants.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/noIntl.js"), require("jquery"), require("ui/box"), require("ui/calendar"), require("ui/date_box"), require("core/config"), require("localization/date"), require("core/utils/date_serialization"), require("core/utils/date"), require("core/devices"), require("animation/fx"), require("../../helpers/keyboardMock.js"), require("../../helpers/shadowDom.js"), require("localization/message"), require("localization"), require("localization/messages/ja.json!"), require("../../helpers/pointerMock.js"), require("core/utils/support"), require("core/utils/type"), require("ui/date_box/ui.date_utils"), require("core/utils/common"), require("core/utils/console"), require("events/utils"), require("../../helpers/calendarFixtures.js"), require("ui/validator"), require("generic_light.css!"), require("core/utils/size"), require("../DevExpress.ui.widgets/scrollableParts/scrollable.constants.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=datebox.tests.js.map