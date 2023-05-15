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

(["testing/tests/DevExpress.ui.widgets.editors/lookup.tests.js"], ["jquery","animation/fx","core/devices","core/element_data","core/config","core/utils/browser","core/errors","core/utils/type","core/utils/shadow_dom","events/utils/index","data/array_store","data/custom_store","data/query","data/data_source/data_source","ui/themes","ui/lookup","ui/popup/ui.popup","ui/popup/ui.popup.full","ui/list","ui/popover/ui.popover","ui/popover/ui.popover.full","core/utils/size","../../helpers/executeAsyncMock.js","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","ui/text_box/ui.text_editor.label.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/lookup.tests.js", ["jquery", "animation/fx", "core/devices", "core/element_data", "core/config", "core/utils/browser", "core/errors", "core/utils/type", "core/utils/shadow_dom", "events/utils/index", "data/array_store", "data/custom_store", "data/query", "data/data_source/data_source", "ui/themes", "ui/lookup", "ui/popup/ui.popup", "ui/popup/ui.popup.full", "ui/list", "ui/popover/ui.popover", "ui/popover/ui.popover.full", "core/utils/size", "../../helpers/executeAsyncMock.js", "../../helpers/pointerMock.js", "../../helpers/keyboardMock.js", "../../helpers/ariaAccessibilityTestHelper.js", "ui/text_box/ui.text_editor.label.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      devices,
      dataUtils,
      config,
      browser,
      errors,
      isRenderer,
      addShadowDomStyles,
      normalizeKeyName,
      ArrayStore,
      CustomStore,
      Query,
      DataSource,
      themes,
      Lookup,
      Popup,
      PopupFull,
      List,
      Popover,
      PopoverFull,
      getWidth,
      getOuterWidth,
      getOuterHeight,
      executeAsyncMock,
      pointerMock,
      keyboardMock,
      ariaAccessibilityTestHelper,
      TextEditorLabel,
      OVERLAY_SHADER_CLASS,
      OVERLAY_WRAPPER_CLASS,
      OVERLAY_CONTENT_CLASS,
      POPUP_CLASS,
      POPUP_TITLE_CLASS,
      POPUP_CONTENT_CLASS,
      LIST_CLASS,
      LIST_ITEM_CLASS,
      LIST_ITEM_SELECTED_CLASS,
      LIST_GROUP_HEADER_CLASS,
      LOOKUP_SEARCH_CLASS,
      LOOKUP_FIELD_CLASS,
      CLEAR_BUTTON_CLASS,
      APPLY_BUTTON_CLASS,
      TEXTEDITOR_INPUT_CLASS,
      SCROLL_VIEW_LOAD_PANEL_CLASS,
      SCROLL_VIEW_CONTENT_CLASS,
      FOCUSED_CLASS,
      toSelector,
      openPopupWithList,
      getList,
      getSearchBox,
      getSearchWrapper,
      helper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      normalizeKeyName = $__m.normalizeKeyName;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      Query = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      Lookup = $__m.default;
    }, function($__m) {
      Popup = $__m.default;
    }, function($__m) {
      PopupFull = $__m.default;
    }, function($__m) {
      List = $__m.default;
    }, function($__m) {
      Popover = $__m.default;
    }, function($__m) {
      PopoverFull = $__m.default;
    }, function($__m) {
      getWidth = $__m.getWidth;
      getOuterWidth = $__m.getOuterWidth;
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {
      TextEditorLabel = $__m.TextEditorLabel;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="lookup"></div>\
        <div id="secondLookup"></div>\
        <div id="thirdLookup"></div>\
        <div id="fourthLookup">\
            <div data-options="dxTemplate: { name: \'test\' }">\
                <span data-bind="text: $data.id"></span>- <span data-bind="text: $data.caption"></span>\
            </div>\
        </div>\
        <div id="widget"></div>\
        <div id="widthRootStyle"></div>\
        <div id="lookupOptions">\
            <div data-options="dxTemplate: { name: \'customTitle\' }">testTitle</div>\
            <div data-options="dxTemplate: { name: \'testGroupTemplate\' }">testGroupTemplate</div>\
        </div>\
        \
        <div id="lookupFieldTemplate">\
            <div data-options="dxTemplate: { name: \'field\' }">\
                <span>test</span>\
            </div>\
        </div>\
        \
        <div id="lookupWithFieldTemplate">\
            <div data-options="dxTemplate: {name: \'field\'}">\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
        addShadowDomStyles($('#qunit-fixture'));
      });
      OVERLAY_SHADER_CLASS = 'dx-overlay-shader';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      POPUP_CLASS = 'dx-popup';
      POPUP_TITLE_CLASS = 'dx-popup-title';
      POPUP_CONTENT_CLASS = 'dx-popup-content';
      LIST_CLASS = 'dx-list';
      LIST_ITEM_CLASS = 'dx-list-item';
      LIST_ITEM_SELECTED_CLASS = 'dx-list-item-selected';
      LIST_GROUP_HEADER_CLASS = 'dx-list-group-header';
      LOOKUP_SEARCH_CLASS = 'dx-lookup-search';
      LOOKUP_FIELD_CLASS = 'dx-lookup-field';
      CLEAR_BUTTON_CLASS = 'dx-popup-clear';
      APPLY_BUTTON_CLASS = 'dx-popup-done';
      TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
      SCROLL_VIEW_LOAD_PANEL_CLASS = 'dx-scrollview-loadpanel';
      SCROLL_VIEW_CONTENT_CLASS = 'dx-scrollview-content';
      FOCUSED_CLASS = 'dx-state-focused';
      toSelector = function(val) {
        return '.' + val;
      };
      openPopupWithList = function(lookup) {
        $(lookup._$field).trigger('dxclick');
      };
      getList = function() {
        return $('.dx-list').dxList('instance');
      };
      getSearchBox = function(lookup) {
        return lookup._$searchBox;
      };
      getSearchWrapper = function(lookup) {
        return $(lookup.content()).find('.dx-lookup-search-wrapper');
      };
      QUnit.module('Lookup', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
          this.element = $('#lookup');
          this.instance = this.element.dxLookup({'dropDownOptions.fullScreen': false}).dxLookup('instance');
          this.$field = $(this.instance._$field);
          this.togglePopup = function() {
            $(this.instance._$field).trigger('dxclick');
            this.$popup = $('.dx-lookup-popup');
            this.popup = dataUtils.data(this.$popup[0], 'dxPopup') || dataUtils.data(this.$popup[0], 'dxPopover');
            this.$list = $('.dx-list');
            this.list = this.$list.dxList('instance');
            this.$search = getSearchBox(this.instance);
            this.search = this.instance._searchBox;
          };
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('attaching dxLookup', function(assert) {
          assert.ok(this.instance instanceof Lookup);
          assert.ok(this.element.hasClass('dx-lookup'), 'widget has class dx-lookup');
          assert.ok($('.' + LOOKUP_FIELD_CLASS, this.element).length, 'widget contents field');
          assert.ok($('.dx-lookup-arrow', this.element).length, 'widget contents arrow');
          this.togglePopup();
          assert.ok(this.popup instanceof Popup, 'popup is dxPopup');
          assert.ok(this.popup.$wrapper().hasClass('dx-lookup-popup-wrapper'));
          assert.ok(this.list instanceof List, 'dxList in popup');
        });
        QUnit.test('List and search editor get correct \'rtlEnabled\' option', function(assert) {
          this.togglePopup();
          assert.ok(!this.instance.option('rtlEnabled'), 'rtlEnabled == false');
          assert.equal(this.list.option('rtlEnabled'), this.instance.option('rtlEnabled'), 'list get correct option value');
          assert.equal(this.search.option('rtlEnabled'), this.instance.option('rtlEnabled'), 'search get correct option value');
          this.instance.option('rtlEnabled', true);
          this.togglePopup();
          assert.ok(this.instance.option('rtlEnabled'), 'rtlEnabled == true');
          assert.equal(this.list.option('rtlEnabled'), this.instance.option('rtlEnabled'), 'list get correct option value');
          assert.equal(this.search.option('rtlEnabled'), this.instance.option('rtlEnabled'), 'search get correct option value');
        });
        QUnit.test('show popup on click', function(assert) {
          var instance = this.instance;
          instance.option({
            dataSource: [1, 2, 3],
            value: 1,
            showCancelButton: true
          });
          this.togglePopup();
          var popup = this.popup;
          var $field = this.$field;
          assert.ok(popup.option('visible'), 'popup shows on click');
          $('.dx-list-item', this.$list).eq(1).trigger('dxclick');
          this.clock.tick(201);
          assert.ok(!popup.option('visible'), 'popup hides on click');
          assert.equal(instance.option('value'), 2, 'selected value sets as clicked item index');
          assert.equal(instance.option('displayValue'), 2, '\'displayValue\' option is clicked item value');
          assert.equal($field.text(), 2, 'field text is clicked item value');
          $($field).trigger('dxclick');
          assert.ok(popup.option('visible'));
          $(popup.$wrapper()).find('.dx-button').eq(0).trigger('dxclick');
          assert.equal(popup.option('visible'), false);
        });
        QUnit.test('hide popup on click on editor', function(assert) {
          var instance = this.instance;
          instance.option({dataSource: [1, 2, 3]});
          this.togglePopup();
          var popup = this.popup;
          var $field = this.$field;
          $field.trigger('dxclick');
          assert.ok(!popup.option('visible'), 'popup hides on click');
        });
        QUnit.test('selecting item on click', function(assert) {
          this.instance.option({dataSource: [1, 2, 3]});
          assert.equal(this.instance.option('value'), undefined, 'no selected value on start');
          assert.equal(this.instance.option('displayValue'), null, 'no selected value on start');
          assert.equal(this.$field.text(), this.instance.option('placeholder'), 'no field text if no selected value');
          this.togglePopup();
          var $firstItem = $(this.$list.find('.dx-list-item')[0]);
          var $secondItem = $(this.$list.find('.dx-list-item')[1]);
          $firstItem = $(this.$list.find('.dx-list-item')[0]);
          $($firstItem).trigger('dxclick');
          assert.equal(this.instance.option('value'), 1, 'first value selected');
          assert.equal(this.instance.option('displayValue'), 1, 'first value selected as displayValue');
          assert.equal(this.$field.text(), '1', 'field text sets correctly');
          $secondItem = $(this.$list.find('.dx-list-item')[1]);
          $($secondItem).trigger('dxclick');
          assert.equal(this.instance.option('value'), 2, 'second value selected');
          assert.equal(this.instance.option('displayValue'), 2, 'second value selected as displayValue');
          assert.equal(this.$field.text(), '2', 'field text sets correctly');
        });
        QUnit.test('List is empty until popup is open', function(assert) {
          this.element.dxLookup({dataSource: [1, 2, 3]}).dxLookup('instance');
          assert.strictEqual(getList(), undefined, 'List dataSource');
        });
        QUnit.test('search value should be cleared after popup close for better UX (T253304)', function(assert) {
          var searchTimeout = 300;
          var instance = $('#thirdLookup').dxLookup({
            dataSource: [1, 2, 3],
            deferRendering: false,
            searchTimeout: searchTimeout,
            'dropDownOptions.animation': null,
            cleanSearchOnOpening: true,
            opened: true
          }).dxLookup('instance');
          instance._searchBox.option('value', '2');
          this.clock.tick(searchTimeout);
          instance.close();
          instance.open();
          assert.equal(getList().option('items').length, 3, 'filter reset immediately');
        });
        QUnit.test('search value should be cleared without excess dataSource filtering ', function(assert) {
          var searchTimeout = 300;
          var loadCalledCount = 0;
          var instance = $('#thirdLookup').dxLookup({
            dataSource: new DataSource({load: function(options) {
                loadCalledCount++;
              }}),
            searchTimeout: searchTimeout,
            'dropDownOptions.animation': null,
            cleanSearchOnOpening: true,
            opened: true
          }).dxLookup('instance');
          assert.equal(loadCalledCount, 1, 'DataSource was loaded on init');
          instance._searchBox.option('value', '2');
          this.clock.tick(searchTimeout);
          assert.equal(loadCalledCount, 2, 'DataSource was loaded after searching');
          instance.close();
          instance.open();
          assert.equal(loadCalledCount, 3, 'Loading dataSource count is OK');
        });
        QUnit.test('onContentReady fire with lookup\'s option \'minSearchLength\' at first show (Q575560)', function(assert) {
          var count = 0;
          this.element.dxLookup({
            items: [111, 222, 333],
            searchTimeout: 0,
            'dropDownOptions.animation': {},
            minSearchLength: 2,
            onContentReady: function() {
              count++;
            }
          }).dxLookup('instance');
          this.togglePopup();
          assert.equal(count, 1, 'onContentReady fired after rendering with option \'minSearchLength\'');
        });
        QUnit.test('onOpened and onClosed actions', function(assert) {
          var openFired = false;
          var closeFired = false;
          var items = [1, 2, 3];
          var instance = $('#thirdLookup').dxLookup({
            onOpened: function() {
              openFired = true;
            },
            onClosed: function() {
              closeFired = true;
            },
            items: items
          }).dxLookup('instance');
          instance.open();
          instance._popup.hide();
          assert.ok(openFired, 'open fired');
          assert.ok(closeFired, 'close fired');
        });
        QUnit.test('class selected', function(assert) {
          var items = [1, 2];
          var lookup = this.element.dxLookup({
            dataSource: items,
            value: items[1]
          }).dxLookup('instance');
          this.togglePopup();
          var $firstItem = $(getList().$element().find('.dx-list-item')[0]);
          var $secondItem = $(getList().$element().find('.dx-list-item')[1]);
          assert.ok($secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
          lookup.option('value', items[0]);
          assert.ok(!$secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was deleted');
          assert.ok($firstItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
        });
        QUnit.test('complex items', function(assert) {
          var items = [{
            value: 1,
            text: 'one'
          }, {
            value: 2,
            text: 'two'
          }];
          var lookup = this.element.dxLookup({
            dataSource: items,
            displayExpr: 'text',
            valueExpr: 'value'
          }).dxLookup('instance');
          assert.equal(this.$field.text(), lookup.option('placeholder'), 'no field text if no selected value');
          this.togglePopup();
          var $firstItem = $(getList().$element().find('.dx-list-item')[0]);
          assert.equal($firstItem.text(), 'one', 'displayExpr work in list items');
          lookup.option('value', 1);
          assert.equal(this.$field.text(), 'one', 'display field work in text');
          assert.equal(lookup.option('displayValue'), 'one', 'option \'displayValue\' work in text');
          this.togglePopup();
          var $secondItem = $(getList().$element().find('.dx-list-item')[1]);
          $($secondItem).trigger('dxclick');
          assert.equal(lookup.option('value'), 2);
          assert.equal(this.$field.text(), 'two', 'display field work in text');
          assert.equal(lookup.option('displayValue'), 'two', 'option \'displayValue\' work in text');
        });
        QUnit.test('selection should works with composite keys', function(assert) {
          var store = new ArrayStore({
            key: ['ID1', 'ID2'],
            data: [{
              ID1: 1,
              ID2: 21
            }, {
              ID1: 2,
              ID2: 22
            }]
          });
          this.element.dxLookup({
            dataSource: store,
            valueExpr: 'ID1'
          });
          var instance = this.element.dxLookup('instance');
          instance.open();
          assert.strictEqual(instance.option('selectedItem'), null, 'selectedItem is null');
        });
        QUnit.test('selectedItem should be changed correctly with composite keys and valueExpr', function(assert) {
          var data = [{
            ID1: 1,
            ID2: 21
          }, {
            ID1: 2,
            ID2: 22
          }];
          var store = new ArrayStore({
            key: ['ID1', 'ID2'],
            data: data
          });
          this.element.dxLookup({
            dataSource: store,
            valueExpr: 'ID1'
          });
          var instance = this.element.dxLookup('instance');
          instance.open();
          var $popup = $('.dx-popup-wrapper');
          var $listItems = $popup.find('.dx-list-item');
          $($listItems.eq(1)).trigger('dxclick');
          assert.strictEqual(instance.option('selectedItem'), data[1], 'selectedItem is changed correctly');
        });
        QUnit.test('valueExpr calculating', function(assert) {
          var store = new ArrayStore({
            key: 'k',
            data: [{
              k: 1,
              v: 'a'
            }, {
              k: 2,
              v: 'b'
            }]
          });
          var dataSource = new DataSource({
            store: store,
            paginate: false
          });
          var lookup = this.element.dxLookup({
            dataSource: [1, 2],
            value: 1
          }).dxLookup('instance');
          assert.equal(this.$field.text(), 1, 'if option valueExpr and store key are not defined, use \'this\' as valueExpr');
          lookup.option({
            dataSource: dataSource,
            value: 1,
            displayExpr: 'v'
          });
          assert.equal(this.$field.text(), 'a', 'if option valueExpr is not defined, but store has defined key, use it');
          lookup.option({
            valueExpr: 'v',
            value: 'b'
          });
          assert.equal(this.$field.text(), 'b', 'if option valueExpr is defined, use it');
        });
        QUnit.test('change value expr refresh selected item', function(assert) {
          var $lookup = this.element.dxLookup({
            dataSource: [{
              param1: true,
              display: 'item1'
            }, {
              param2: true,
              display: 'item2'
            }],
            valueExpr: 'param1',
            displayExpr: 'display',
            value: true
          });
          this.togglePopup();
          var $selectedItem = $(this.popup.$content().find('.' + LIST_ITEM_SELECTED_CLASS));
          assert.equal($selectedItem.text(), 'item1');
          assert.equal(this.$field.text(), 'item1');
          $lookup.dxLookup('option', 'valueExpr', 'param2');
          $selectedItem = $(this.popup.$content().find('.' + LIST_ITEM_SELECTED_CLASS));
          assert.equal($selectedItem.text(), 'item2');
          assert.equal(this.$field.text(), 'item2');
        });
        QUnit.test('external dataSource filter applied during search value', function(assert) {
          var arrayStore = [{
            key: 1,
            value: 'one'
          }, {
            key: 2,
            value: 'two'
          }, {
            key: 3,
            value: 'three'
          }, {
            key: 4,
            value: 'four'
          }];
          var dataSource = new DataSource({
            store: arrayStore,
            filter: ['key', '>', 2]
          });
          var $lookup = $('#lookup').dxLookup({
            dataSource: dataSource,
            displayExpr: 'value',
            valueExpr: 'key',
            value: 1,
            placeholder: 'test'
          });
          assert.equal($lookup.text(), 'test', 'display value is not defined');
        });
        QUnit.test('option value returns object when valueExpr is \'this\'', function(assert) {
          var dataArray = [{
            id: '1',
            value: 'one'
          }, {
            id: '2',
            value: 'two'
          }, {
            id: '3',
            value: 'three'
          }, {
            id: '4',
            value: 'four'
          }, {
            id: '5',
            value: 'five'
          }];
          var store = new CustomStore({
            key: 'id',
            load: function(option) {
              return dataArray;
            },
            byKey: function(key) {
              $.each(dataArray, function() {
                if (this.id === key) {
                  return false;
                }
              });
            }
          });
          this.instance.option({
            dataSource: store,
            displayExpr: 'value',
            valueExpr: 'this',
            value: dataArray[0]
          });
          assert.equal(this.instance.option('value'), dataArray[0], 'option value return object');
          $(this.$field).trigger('dxclick');
          $('.dx-list-item', this.$list).eq(3).trigger('dxclick');
          assert.equal(this.instance.option('value'), dataArray[3], 'option value return object');
        });
        QUnit.test('highlight item when dataSource is mapped', function(assert) {
          var dataArray = [{id: 1}, {id: 2}];
          var store = new ArrayStore({
            data: dataArray,
            key: 'id'
          });
          var value = dataArray[0];
          var dataSource = new DataSource({
            store: store,
            map: function(data) {
              return {id: data.id};
            }
          });
          var $lookup = $('#lookup').dxLookup({
            dataSource: dataSource,
            value: value
          });
          $($lookup.find('.' + LOOKUP_FIELD_CLASS)).trigger('dxclick');
          var $popup = $('.dx-popup-wrapper');
          var $listItems = $popup.find('.dx-list-item');
          assert.ok($listItems.eq(0).hasClass(LIST_ITEM_SELECTED_CLASS), 'selected class was attached byKey');
        });
        QUnit.test('highlight item when dataSource is mapped and valueExpr was set', function(assert) {
          var dataArray = [{id: 1}, {id: 2}];
          var store = new ArrayStore({
            data: dataArray,
            key: 'id'
          });
          var value = dataArray[0];
          var dataSource = new DataSource({
            store: store,
            map: function(data) {
              return {id: data.id};
            }
          });
          var $lookup = $('#lookup').dxLookup({
            dataSource: dataSource,
            value: value,
            valueExpr: 'id'
          });
          $($lookup.find('.' + LOOKUP_FIELD_CLASS)).trigger('dxclick');
          var $popup = $('.dx-popup-wrapper');
          var $listItems = $popup.find('.dx-list-item');
          assert.ok($listItems.eq(0).hasClass(LIST_ITEM_SELECTED_CLASS), 'selected class was attached byKey');
        });
        QUnit.test('search with dataSource', function(assert) {
          var dataSource = new DataSource({
            store: [{value: 1}, {value: 2}, {value: 3}],
            searchExpr: 'value'
          });
          this.instance.option({
            dataSource: dataSource,
            displayExpr: 'value',
            valueExpr: 'value',
            value: 3,
            searchTimeout: 0
          });
          this.togglePopup();
          this.search.option('value', '3');
          var listItems = this.$list.find('.dx-list-item');
          assert.equal(listItems.length, 1, 'Items count');
          assert.equal(listItems.eq(0).text(), '3', 'List item text');
        });
        QUnit.test('multiple field search with dataSource (Q521604)', function(assert) {
          var items = [{
            id: 1,
            name: 'red_toy',
            desc: 'A giant toy replicating real vehicle'
          }, {
            id: 2,
            name: 'green_bike',
            desc: 'Stuff for a young dabbler'
          }, {
            id: 3,
            name: 'yellow_monster',
            desc: 'A bike of premium quality'
          }];
          this.instance.option({
            dataSource: items,
            searchExpr: ['name', 'desc'],
            displayExpr: 'name',
            valueExpr: 'id',
            searchTimeout: 0
          });
          this.togglePopup();
          this.search.option('value', 'bike');
          var filteredListItems = this.$list.find('.dx-list-item');
          assert.equal(filteredListItems.length, 2, 'Items count is right');
          var firstItemIsFound = filteredListItems.text().indexOf(items[1].name) !== -1;
          var secondItemIsFound = filteredListItems.text().indexOf(items[2].name) !== -1;
          assert.ok(firstItemIsFound && secondItemIsFound, 'Items\' filtering is right');
        });
        QUnit.test('Empty dataSource searchExpr (B253811)', function(assert) {
          var items = [{
            id: 1,
            name: 'red_toy',
            desc: 'A giant toy replicating real vehicle'
          }, {
            id: 2,
            name: 'green_bike',
            desc: 'Stuff for a young dabbler'
          }, {
            id: 3,
            name: 'yellow_monster',
            desc: 'A bike of premium quality'
          }];
          var dataSource = new DataSource({store: items});
          this.instance.option({
            dataSource: dataSource,
            displayExpr: 'name',
            valueExpr: 'id',
            searchTimeout: 0
          });
          this.togglePopup();
          this.search.option('value', 'bike');
          var filteredListItems = this.$list.find('.dx-list-item');
          var rightItemIsFound = filteredListItems.text().indexOf(items[1].name) !== -1;
          assert.ok(filteredListItems.length === 1 && rightItemIsFound, 'Lookup\'s displayExpr is used if dataSource\'s searchExpr is undefined');
        });
        QUnit.test('userDataSource: byKey', function(assert) {
          var initialLoadCalled = false;
          var searchLoadCalled = false;
          var searchString = null;
          var lookupKeys = [];
          var items = [{
            value: 1,
            name: 'one'
          }, {
            value: 2,
            name: 'two'
          }, {
            value: 3,
            name: 'three'
          }];
          var userDataSource = {
            load: function(loadOptions) {
              initialLoadCalled = true;
              if (loadOptions.searchValue) {
                searchLoadCalled = true;
                searchString = loadOptions.searchValue;
              }
              return items;
            },
            byKey: function(key) {
              lookupKeys.push(key);
              return items[0];
            }
          };
          this.instance.option({
            dataSource: userDataSource,
            displayExpr: 'name',
            valueExpr: 'id',
            value: 1,
            searchTimeout: 0
          });
          this.togglePopup();
          var search = this.search;
          search.option('value', 'thr');
          assert.ok(initialLoadCalled, 'initial load');
          assert.ok(searchLoadCalled, 'load should be called with search params');
          assert.equal(searchString, 'thr', 'Correct search string should be passed');
          assert.equal(lookupKeys[0], 1, 'Lookup callback should be called with right key');
        });
        QUnit.test('userDataSource: lookup with not defined value', function(assert) {
          var lookupKeys = [];
          var userDataSource = {
            load: function(loadOptions) {
              return [];
            },
            lookup: function(key) {
              lookupKeys.push(key);
              return null;
            }
          };
          this.instance.option({
            dataSource: userDataSource,
            displayExpr: 'name',
            valueExpr: 'id',
            searchTimeout: 0
          });
          this.togglePopup();
          assert.equal(lookupKeys.length, 0, 'Lookup callback should never be called');
        });
        QUnit.test('searchTimeout does not work (Q569033)', function(assert) {
          var loadTriggered = 0;
          this.instance.option({
            dataSource: {
              load: function(loadOptions) {
                loadTriggered++;
                return [];
              },
              lookup: function() {}
            },
            displayExpr: 'name',
            valueExpr: 'id',
            searchTimeout: 500
          });
          this.togglePopup();
          var loadTriggeredAtStart = loadTriggered;
          var search = this.search;
          search.option('value', 't');
          this.clock.tick(300);
          search.option('value', 'th');
          this.clock.tick(300);
          search.option('value', 'thr');
          this.clock.tick(600);
          assert.equal(loadTriggered, loadTriggeredAtStart + 1, 'load triggered once when last search timeout expired');
        });
        QUnit.test('allow dataSource with map function', function(assert) {
          var dataSource = new DataSource({
            store: [1, 2, 3],
            map: function(item) {
              return {text: item};
            }
          });
          this.instance.option({dataSource: dataSource});
          this.togglePopup();
          assert.ok(true, 'dataSource with map works correctly');
        });
        QUnit.test('UserDateSource with map, minSearchLength > 0', function(assert) {
          var items = [{
            id: 1,
            name: 'Tom',
            lastName: 'Smith'
          }, {
            id: 2,
            name: 'James',
            lastName: 'Adams'
          }, {
            id: 3,
            name: 'Joe',
            lastName: 'Doe'
          }];
          var dataSource = new DataSource({
            store: items,
            map: function(item) {
              return {
                value: item.id,
                text: item.name + ' ' + item.lastName
              };
            }
          });
          dataSource.load();
          var store = new ArrayStore(dataSource.items());
          var lookupDataSource = new DataSource({
            load: function(loadOptions) {
              return store.load(loadOptions.searchValue ? {filter: ['text', 'contains', loadOptions.searchValue]} : null);
            },
            lookup: $.proxy(dataSource.lookup, dataSource)
          });
          this.instance.option({
            dataSource: lookupDataSource,
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 0,
            minSearchLength: 3
          });
          this.togglePopup();
          var search = this.search;
          search.option('value', 'smi');
          var listItems = this.$list.find('.dx-list-item');
          assert.equal(listItems.length, 1);
          assert.notEqual(listItems.eq(0).css('display'), 'none');
        });
        QUnit.test('value onValueChanged callback', function(assert) {
          var items = [{
            id: 1,
            name: 'Tom'
          }, {
            id: 2,
            name: 'James'
          }];
          var lookup = this.element.dxLookup({
            dataSource: items,
            valueExpr: 'id',
            displayExpr: 'name',
            value: 1
          }).dxLookup('instance');
          var value = items[0];
          lookup.option('onValueChanged', function(args) {
            value = args.value;
          });
          lookup.option('value', 2);
          assert.equal(value, items[1].id);
        });
        QUnit.test('use template, option itemTemplate', function(assert) {
          var dataSource = [{
            id: 1,
            caption: 'red'
          }, {
            id: 2,
            caption: 'green'
          }, {
            id: 3,
            caption: 'blue'
          }];
          var fourthLookup = $('#fourthLookup').dxLookup({
            dataSource: dataSource,
            itemTemplate: 'test',
            valueExpr: 'id',
            displayExpr: 'caption'
          }).dxLookup('instance');
          assert.ok(fourthLookup._getTemplateByOption('itemTemplate'), 'test template present in lookup');
          openPopupWithList(fourthLookup);
          assert.strictEqual(fourthLookup._getTemplateByOption('itemTemplate'), getList()._getTemplateByOption('itemTemplate'), 'test template present in list');
        });
        QUnit.test('itemTemplate returning string', function(assert) {
          var lookup = this.element.dxLookup({
            items: ['a', 'b'],
            itemTemplate: function(item, index) {
              return index + ': ' + item;
            }
          }).dxLookup('instance');
          openPopupWithList(lookup);
          var items = $('.dx-list-item', getList().$element());
          assert.equal(items.eq(0).text(), '0: a');
          assert.equal(items.eq(1).text(), '1: b');
          lookup.option('itemTemplate', function(item, index) {
            return item + ': ' + index;
          });
          items = $('.dx-list-item', getList().$element());
          assert.equal(items.eq(0).text(), 'a: 0');
          assert.equal(items.eq(1).text(), 'b: 1');
        });
        QUnit.test('itemTemplate returning jquery', function(assert) {
          var lookup = this.element.dxLookup({
            items: ['a'],
            itemTemplate: function(item, index) {
              return $('<span class=\'test\' />');
            }
          }).dxLookup('instance');
          openPopupWithList(lookup);
          var item = $('.dx-list-item', getList().$element()).eq(0);
          assert.ok(item.find('span.test').length);
        });
        QUnit.test('lookup with Done does not closed after item click', function(assert) {
          var lookup = this.element.dxLookup({
            dataSource: [1, 2, 3],
            value: 1,
            showClearButton: false,
            applyValueMode: 'useButtons',
            showCancelButton: false,
            opened: true
          }).dxLookup('instance');
          var $list = lookup._$list;
          $($list.find('.dx-list-item').eq(1)).trigger('dxclick');
          assert.ok(lookup.option('opened'), 'popup dont hide after click');
          assert.ok($list.find('.dx-list-item').eq(1).hasClass(LIST_ITEM_SELECTED_CLASS), 'second item selected');
          assert.equal(lookup.option('value'), 1, 'value dont changed without Done click');
          $(lookup._popup.$wrapper()).find(("." + APPLY_BUTTON_CLASS + ".dx-button")).eq(0).trigger('dxclick');
          assert.ok(!lookup.option('opened'), 'popup hide after click by Done');
          assert.equal(lookup.option('value'), 2, 'value changed after Done click');
        });
        QUnit.test('regression: can not select value after loading more items (B233390)', function(assert) {
          var lookup = this.element.dxLookup({items: ['1', '2', '3']}).dxLookup('instance');
          openPopupWithList(lookup);
          var $firstListItem = $(getList().$element().find('.dx-list-item').eq(0));
          var mouse = pointerMock($firstListItem).start();
          mouse.down().move(0, 10).up();
          this.clock.tick(500);
          mouse.click();
          assert.equal(lookup.option('value'), '1');
        });
        QUnit.test('regression: B236007 (check that selection item in one lookup do not effect to another)', function(assert) {
          var $firstLookup = $('#lookup').dxLookup({
            items: ['1', '2', '3'],
            value: '1'
          });
          var firstLookup = $firstLookup.dxLookup('instance');
          var $secondLookup = $('#secondLookup').dxLookup({
            items: ['1', '2', '3'],
            value: '2'
          });
          var secondLookup = $secondLookup.dxLookup('instance');
          openPopupWithList(firstLookup);
          assert.equal($(("." + LIST_ITEM_SELECTED_CLASS)).length, 1);
          var $firstListItem = $(getList().$element().find('.dx-list-item').eq(0));
          var mouse = pointerMock($firstListItem);
          mouse.start().down().move(0, 10).up();
          openPopupWithList(secondLookup);
          assert.equal($(("." + LIST_ITEM_SELECTED_CLASS)).length, 2);
          mouse.start().down().move(0, 10).up();
          openPopupWithList(firstLookup);
          if (QUnit.isInShadowDomMode()) {
            assert.strictEqual(document.querySelectorAll(("." + LIST_ITEM_SELECTED_CLASS)).length, 1);
            assert.strictEqual($('#qunit-fixture').get(0).querySelectorAll(("." + LIST_ITEM_SELECTED_CLASS)).length, 1);
          } else {
            assert.strictEqual($(("." + LIST_ITEM_SELECTED_CLASS)).length, 2);
          }
        });
        QUnit.test('regression: dxLookup - incorrect search behavior when \'minSearchLength\' greater than zero', function(assert) {
          var lookup = this.element.dxLookup({
            items: ['1', '2', '3'],
            minSearchLength: 2
          }).dxLookup('instance');
          openPopupWithList(lookup);
          assert.equal(lookup._searchBox.option('placeholder'), 'Minimum character number: 2');
          lookup.option('minSearchLength', 3);
          assert.equal(lookup._searchBox.option('placeholder'), 'Minimum character number: 3');
        });
        QUnit.test('Q517035 - Setting an observable variable to null and then to a value causes a display text problem', function(assert) {
          executeAsyncMock.teardown();
          var lookup = this.element.dxLookup({
            dataSource: [{
              id: 0,
              text: '0'
            }, {
              id: 1,
              text: '1'
            }],
            displayExpr: 'text',
            valueExpr: 'id'
          }).dxLookup('instance');
          lookup.option('value', null);
          lookup.option('value', 1);
          assert.strictEqual(lookup._$field.text(), '1');
          lookup.option('value', null);
          lookup.option('value', 1);
          assert.strictEqual(lookup._$field.text(), '1');
        });
        QUnit.test('B236077: dxLookup shouldn\'t render popup window with inner widgets until it\'s going to be shown', function(assert) {
          this.instance.option({
            dataSource: [1, 2, 3],
            value: 1
          });
          assert.ok(!this.instance._popup, 'B236077: popup is not added before showing');
          assert.ok(!$('.dx-lookup-popup', this.instance.$element()).length, 'B236077: popups markup is not rendered to lookup');
          this.togglePopup();
          assert.ok(this.$popup, 'B236077: popup is added after click');
        });
        QUnit.test('usePopover', function(assert) {
          this.instance.option({usePopover: true});
          this.togglePopup();
          assert.ok(this.popup instanceof Popover, 'popover was created');
          assert.ok(this.element.hasClass('dx-lookup-popover-mode'), 'popover has class popover mode');
        });
        QUnit.test('usePopover option target', function(assert) {
          this.instance.option({usePopover: true});
          this.togglePopup();
          var $target = this.popup.option('target');
          assert.equal($target.get(0), this.element.get(0), 'popover target is lookup element');
        });
        QUnit.test('popupHeight when usePopover is true', function(assert) {
          var popupHeight = 500;
          this.instance.option({
            usePopover: true,
            'dropDownOptions.height': popupHeight
          });
          this.togglePopup();
          assert.equal(this.popup.option('height'), popupHeight, 'popupHeight applied to popover');
        });
        [true, false].forEach(function(usePopover) {
          QUnit.test(("overlay should contain role=\"dialog\" when usePopover: " + usePopover), function(assert) {
            var instance = $('#lookup').dxLookup({usePopover: usePopover}).dxLookup('instance');
            this.togglePopup();
            var $overlayContent = $(instance.content()).parent();
            assert.strictEqual($overlayContent.attr('role'), 'dialog');
          });
        });
        [true, false].forEach(function(usePopover) {
          QUnit.test(("user should be able to set custom role for overlay when usePopover: " + usePopover), function(assert) {
            var instance = $('#lookup').dxLookup({
              usePopover: usePopover,
              dropDownOptions: {onShowing: function(e) {
                  var $overlayContent = e.component.$content().parent();
                  $overlayContent.attr('role', 'custom-role');
                }}
            }).dxLookup('instance');
            this.togglePopup();
            var $overlayContent = $(instance.content()).parent();
            assert.strictEqual($overlayContent.attr('role'), 'custom-role');
          });
        });
        QUnit.test('showEvent/hideEvent is null when usePopover is true', function(assert) {
          this.instance.option({usePopover: true});
          this.togglePopup();
          assert.strictEqual(this.popup.option('showEvent'), null, 'showEvent is null');
          assert.strictEqual(this.popup.option('hideEvent'), null, 'hideEvent is null');
        });
        QUnit.test('Popup with Done Button hide after one click on item', function(assert) {
          var lookup = this.element.dxLookup({
            dataSource: [1, 2, 3],
            value: 1,
            showClearButton: false,
            applyValueMode: 'useButtons',
            showCancelButton: true
          }).dxLookup('instance');
          this.togglePopup();
          $($('.dx-list-item', getList().$element()).eq(1)).trigger('dxclick');
          $('.dx-popup-cancel.dx-button', $(lookup._popup.$wrapper())).eq(0).trigger('dxclick');
          $(lookup._$field).trigger('dxclick');
          $($('.dx-list-item', getList().$element()).eq(1)).trigger('dxclick');
          this.clock.tick(250);
          assert.ok(lookup._popup.option('visible'), 'popup hide after click by no selected item after hide->show events');
        });
        QUnit.test('B238773 - dxLookup does not work properly if the valueExpr option is set to this', function(assert) {
          executeAsyncMock.teardown();
          var dataSource = [{
            id: 0,
            text: 'item 0'
          }, {
            id: 1,
            text: 'item 1'
          }];
          var lookup = this.element.dxLookup({
            placeholder: 'Select...',
            valueExpr: 'this',
            displayExpr: 'text',
            dataSource: dataSource
          }).dxLookup('instance');
          openPopupWithList(lookup);
          assert.ok(lookup._popup.option('visible'));
          this.clock.tick(200);
          $(lookup._popup.$wrapper()).find('.dx-list-item').eq(0).trigger('dxclick');
          assert.equal(lookup.option('value').id, dataSource[0].id);
          assert.equal(lookup._$field.text(), 'item 0');
        });
        QUnit.test('dataSource loading calls once after opening when value is specified', function(assert) {
          var loadingFired = 0;
          this.element.dxLookup({
            value: 1,
            dataSource: {
              load: function() {
                loadingFired++;
              },
              byKey: function(key) {
                return key;
              }
            }
          });
          this.togglePopup();
          assert.equal(loadingFired, 1, 'loading called once');
        });
        QUnit.test('dataSource loading calls once when change search string (Q558510)', function(assert) {
          var loadingFired = 0;
          this.element.dxLookup({
            minSearchLength: 2,
            searchTimeout: 0,
            dataSource: {load: function(searchOptions) {
                loadingFired++;
              }}
          });
          this.togglePopup();
          this.$search.dxTextBox('option', 'value', '123');
          assert.equal(loadingFired, 1, 'loading called once');
        });
        QUnit.test('lookup empty class is attached when no item is selected', function(assert) {
          var $lookup = this.element.dxLookup({
            dataSource: [1, 2, 3],
            showClearButton: true,
            placeholder: 'placeholder'
          });
          var lookup = $lookup.dxLookup('instance');
          var LOOKUP_EMPTY_CLASS = 'dx-lookup-empty';
          assert.ok($lookup.hasClass(LOOKUP_EMPTY_CLASS), 'Lookup without preselected value has empty class');
          lookup.option('value', 1);
          assert.ok(!$lookup.hasClass(LOOKUP_EMPTY_CLASS), 'Lookup with selected item has not empty class');
          openPopupWithList(lookup);
          $(lookup._popup.$wrapper()).find('.dx-button.dx-popup-clear').trigger('dxclick');
          var $lookupField = $lookup.find('.dx-lookup-field');
          assert.ok($lookup.hasClass(LOOKUP_EMPTY_CLASS), 'Lookup has empty class after clearance');
          assert.equal($.trim($lookupField.text()), 'placeholder', 'placeholder is shown');
          assert.strictEqual(lookup.option('value'), null, 'value reset');
        });
        QUnit.test('show/hide popup window programmatically', function(assert) {
          var $lookup = this.element.dxLookup({dataSource: [1, 2, 3]});
          var lookup = $lookup.dxLookup('instance');
          var $popup = $('.' + POPUP_CLASS);
          assert.equal($popup.length, 0, 'no rendered popup or popover');
          lookup.open();
          $popup = $('.' + POPUP_CLASS);
          assert.ok($popup.is(':visible'));
          lookup.close();
          assert.ok($popup.is(':hidden'));
        });
        QUnit.test('list display items when same as \'minSearchLength\' characters are entered (T126606)', function(assert) {
          this.element.dxLookup({
            minSearchLength: 2,
            searchTimeout: 0,
            dataSource: new DataSource({load: function(loadOptions) {
                var d = new $.Deferred();
                loadOptions.searchString;
                setTimeout(function() {
                  var query = Query([{name: 'asdfg'}, {name: 'qwert'}, {name: 'zxcvb'}]);
                  var data = [];
                  if (loadOptions.searchValue) {
                    data = query.filter('name', 'contains', loadOptions.searchValue).toArray();
                  } else {
                    data = query.toArray();
                  }
                  d.resolve(data);
                }, 0);
                return d.promise();
              }})
          });
          this.togglePopup();
          this.$search.dxTextBox('option', 'value', 'df');
          this.clock.tick(10);
          assert.equal(this.$list.find('.dx-list-item').length, 1);
        });
        QUnit.test('list display items when \'minSearchLength\' is not exceeded and \'showDataBeforeSearch\' set to true', function(assert) {
          this.element.dxLookup({
            minSearchLength: 2,
            searchTimeout: 0,
            showDataBeforeSearch: true,
            dataSource: new DataSource({load: function(loadOptions) {
                var d = new $.Deferred();
                loadOptions.searchString;
                setTimeout(function() {
                  var query = Query([{name: 'asdfg'}, {name: 'qwert'}, {name: 'zxcvb'}]);
                  var data = [];
                  if (loadOptions.searchValue) {
                    data = query.filter('name', 'contains', loadOptions.searchValue).toArray();
                  } else {
                    data = query.toArray();
                  }
                  d.resolve(data);
                }, 0);
                return d.promise();
              }})
          });
          this.togglePopup();
          this.$search.dxTextBox('option', 'value');
          this.clock.tick(10);
          assert.equal(this.$list.find('.dx-list-item').length, 3);
        });
        QUnit.test('dxLookup should accept undefined value (T141821)', function(assert) {
          assert.expect(0);
          this.element.dxLookup({
            dataSource: new DataSource({store: new ArrayStore({
                data: [{
                  CategoryID: 1,
                  CategoryName: 'Beverages'
                }],
                key: 'CategoryID'
              })}),
            displayExpr: 'CategoryName',
            valueExpr: 'CategoryID'
          });
          this.togglePopup();
          this.clock.tick(10);
          $(this.$list.find('.dx-list-item').eq(0)).trigger('dxclick');
        });
        QUnit.test('The search field should be insert before list', function(assert) {
          var $lookup = $('#lookup').dxLookup({
            dataSource: [1, 2, 3],
            value: 2,
            searchEnabled: false,
            opened: true
          });
          var instance = $lookup.dxLookup('instance');
          instance.option('searchEnabled', true);
          var $popupContent = $('.dx-popup-content');
          var searchIndex = $popupContent.find('.dx-lookup-search-wrapper').index();
          var listIndex = $popupContent.find('.dx-list').index();
          assert.ok(listIndex > searchIndex, 'list placed after search field');
        });
        QUnit.test('Check popup position for Material theme when fullScreen option is true ', function(assert) {
          var isMaterialStub = sinon.stub(themes, 'isMaterial');
          var $lookup = $('#lookup');
          isMaterialStub.returns(true);
          $lookup.dxLookup('instance').dispose();
          try {
            var lookup = $lookup.dxLookup({
              dataSource: ['blue', 'orange', 'lime', 'purple'],
              value: 'orange',
              'dropDownOptions.fullScreen': true
            }).dxLookup('instance');
            $(lookup.field()).trigger('dxclick');
            assert.equal($(lookup._popup.option('position').of)[0], window, 'popup position of the window');
            assert.equal($(lookup.content()).parent().position().top, 0, 'popup doesn\'t have offset top');
            assert.equal($(lookup.content()).parent().position().left, 0, 'popup doesn\'t have offset left');
          } finally {
            $lookup.dxLookup('instance').dispose();
            isMaterialStub.restore();
          }
        });
        QUnit.test('Lookup should catch delayed data', function(assert) {
          var items = [{
            'ID': 1,
            'Name': 'John'
          }, {
            'ID': 2,
            'Name': 'Olivia'
          }];
          this.element.dxLookup({
            dataSource: [],
            displayExpr: 'Name',
            valueExpr: 'ID',
            value: 1,
            'dropDownOptions.title': 'Select employee'
          });
          setTimeout(function() {
            $('#lookup').dxLookup('instance').option('dataSource', items);
          }, 100);
          this.clock.tick(100);
          assert.equal(this.$field.text(), 'John', 'display field work in text');
        });
      });
      QUnit.module('label integration', function() {
        QUnit.test('lookup should pass containerWidth equal to field width', function(assert) {
          var $__3 = this;
          this.TextEditorLabelMock = function(args) {
            $__3.labelArgs = args;
            return new TextEditorLabel(args);
          };
          Lookup.mockTextEditorLabel(this.TextEditorLabelMock);
          try {
            $('#lookup').dxLookup({label: 'some'});
            var borderWidth = 2;
            var fieldWidth = getWidth($(("." + LOOKUP_FIELD_CLASS)));
            assert.strictEqual(this.labelArgs.containerWidth + borderWidth, fieldWidth);
          } finally {
            Lookup.restoreTextEditorLabel();
          }
        });
      });
      QUnit.module('hidden input', function() {
        QUnit.test('the hidden input should get correct value on widget value change', function(assert) {
          var $element = $('#lookup').dxLookup({
            items: [1, 2, 3],
            value: 2
          });
          var instance = $element.dxLookup('instance');
          var $input = $element.find('input[type=\'hidden\']');
          instance.option('value', 1);
          assert.equal($input.val(), '1', 'input value is correct');
        });
      });
      QUnit.module('the \'name\' option', function() {
        QUnit.test('hidden input should get correct \'name\' attribute after the \'name\' option is changed', function(assert) {
          var expectedName = 'lookup';
          var $element = $('#lookup').dxLookup({name: 'initialName'});
          var instance = $element.dxLookup('instance');
          var $input = $element.find('input[type=\'hidden\']');
          instance.option('name', expectedName);
          assert.equal($input.attr('name'), expectedName, 'input has correct \'name\' attribute');
        });
      });
      QUnit.module('options', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('popupWidth', function(assert) {
          var instance = $('#lookup').dxLookup({
            'dropDownOptions.width': 100,
            usePopover: false
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.equal(instance._popup.option('width'), 100, 'Option initialized correctly');
          instance.option('dropDownOptions.width', 200);
          assert.equal(instance._popup.option('width'), 200, 'Option set correctly');
        });
        QUnit.test('popupWidth option test for usePopover mode', function(assert) {
          var instance = $('#lookup').dxLookup({
            'dropDownOptions.width': 100,
            usePopover: true
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.equal(instance._popup.option('width'), 100, 'Option initialized correctly');
          instance.option('dropDownOptions.width', 200);
          assert.equal(instance._popup.option('width'), 200, 'Option set correctly');
        });
        QUnit.test('popoverWidth', function(assert) {
          var instance = $('#lookup').dxLookup({
            usePopover: true,
            width: 200
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.equal(Math.round(getWidth(instance._$popup)), Math.round(getWidth(instance.$element())), 'Option initialized correctly');
          instance.option('width', 400);
          assert.equal(Math.round(getWidth(instance._$popup)), Math.round(getWidth(instance.$element())), 'Option set correctly');
        });
        QUnit.test('setting popupWidth to auto returns initial value', function(assert) {
          var $lookup = $('#lookup');
          var instance = $lookup.dxLookup({usePopover: false}).dxLookup('instance');
          instance.open();
          var popup = $lookup.find('.' + POPUP_CLASS).dxPopup('instance');
          var initialValue = popup.option('width');
          if ($.isFunction(initialValue)) {
            initialValue = initialValue();
          }
          instance.option('dropDownOptions.width', initialValue + 1);
          instance.option('dropDownOptions.width', 'auto');
          var autoValue = popup.option('width');
          if ($.isFunction(autoValue)) {
            autoValue = autoValue();
          }
          assert.equal(autoValue, initialValue, 'initial value equal auto value');
        });
        QUnit.test('popupHeight', function(assert) {
          var instance = $('#lookup').dxLookup({
            'dropDownOptions.height': 100,
            usePopover: false
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.equal(instance._popup.option('height'), 100, 'Option initialized correctly');
          instance.option('dropDownOptions.height', 200);
          assert.equal(instance._popup.option('height'), 200, 'Option set correctly');
        });
        QUnit.test('setting popupHeight to auto returns initial value', function(assert) {
          var $lookup = $('#lookup');
          var instance = $lookup.dxLookup({usePopover: false}).dxLookup('instance');
          instance.open();
          var popup = $lookup.find('.' + POPUP_CLASS).dxPopup('instance');
          var initialValue = popup.option('height');
          if ($.isFunction(initialValue)) {
            initialValue = initialValue();
          }
          instance.option('dropDownOptions.height', initialValue + 1);
          instance.option('dropDownOptions.height', 'auto');
          var autoValue = popup.option('height');
          if ($.isFunction(autoValue)) {
            autoValue = autoValue();
          }
          assert.equal(autoValue, initialValue, 'initial value equal auto value');
        });
        QUnit.test('searchPlaceholder', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: [1, 2, 3],
            searchPlaceholder: 'searchPlaceHolderTest'
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var search = instance._searchBox;
          assert.equal(search.option('placeholder'), instance.option('searchPlaceholder'));
          instance.option('searchPlaceHolder', 'searchPlaceHolderTest2');
          assert.equal(search.option('placeholder'), instance.option('searchPlaceholder'));
        });
        QUnit.test('searchEnabled', function(assert) {
          var instance = $('#lookup').dxLookup({
            opened: true,
            dataSource: []
          }).dxLookup('instance');
          var popup = instance._popup;
          var $search = getSearchBox(instance);
          assert.ok($(popup.$wrapper()).hasClass('dx-lookup-popup-search'));
          assert.ok($search.is(':visible'), 'default value');
          instance.option('searchEnabled', false);
          assert.ok(!$(popup.$wrapper()).hasClass('dx-lookup-popup-search'));
          assert.ok($search.is(':hidden'), 'hidden');
        });
        QUnit.test('excess main input placeholder should not be rendered when deferRendering=false (T1054252)', function(assert) {
          var lookup = $('#lookup').dxLookup({deferRendering: false}).dxLookup('instance');
          var $searchWrapper = getSearchWrapper(lookup);
          var $placeholders = $searchWrapper.find('.dx-placeholder');
          assert.strictEqual($placeholders.length, 1, 'search wrapper contains the single placeholder');
          assert.strictEqual($placeholders.eq(0).attr('data-dx_placeholder'), 'Search', 'it is search placeholder');
        });
        QUnit.test('cleanSearchOnOpening', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var instance = $('#lookup').dxLookup({
            items: [1, 11, 111],
            deferRendering: false,
            opened: true,
            cleanSearchOnOpening: true
          }).dxLookup('instance');
          var searchBox = instance._searchBox;
          var $list = instance._$list;
          var $listItems = $list.find('.dx-list-item');
          searchBox.option('value', 1);
          $($listItems.eq(2)).trigger('dxpointerdown');
          instance.option('opened', false);
          instance.option('opened', true);
          assert.equal(searchBox.option('value'), '', 'search value has been cleared');
          $list.dxList('focus');
          assert.equal($list.find(("." + LIST_ITEM_CLASS + "." + FOCUSED_CLASS)).eq(0).text(), $listItems.eq(0).text(), 'list focused item has been refreshed');
        });
        QUnit.test('click on readOnly lookup doesn\'t toggle popup visibility', function(assert) {
          var instance = $('#lookup').dxLookup({
            items: [0, 1, 2],
            readOnly: true
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.ok(!instance.option('opened'), 'when we click on field - list is still hidden');
          instance.option('readOnly', false);
          $(instance._$field).trigger('dxclick');
          assert.ok(instance.option('opened'), 'when we click on field - list is visible after option changed');
        });
        QUnit.test('noDataText (B253876)', function(assert) {
          assert.expect(2);
          var instance = $('#lookup').dxLookup({noDataText: 'nope'}).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var listInstance = getList();
          assert.equal(listInstance.option('noDataText'), 'nope', 'correct initialization');
          instance.option('noDataText', 'nope, again');
          assert.equal(listInstance.option('noDataText'), 'nope, again', 'correct option change');
        });
        QUnit.test('popup buttons text rerender (B253876 - notes)', function(assert) {
          assert.expect(6);
          var instance = $('#lookup').dxLookup({
            cancelButtonText: 'nope',
            clearButtonText: 'fuu',
            applyButtonText: 'yep',
            showCancelButton: true,
            showClearButton: true,
            applyValueMode: 'useButtons'
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find('.dx-button.dx-popup-cancel').text(), 'nope', 'correct initialization');
          assert.equal($popupWrapper.find('.dx-button.dx-popup-clear').text(), 'fuu', 'correct initialization');
          assert.equal($popupWrapper.find((".dx-button." + APPLY_BUTTON_CLASS)).text(), 'yep', 'correct initialization');
          instance.option('cancelButtonText', 'nopenope');
          instance.option('clearButtonText', 'fuufuu');
          instance.option('applyButtonText', 'yepyep');
          $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find('.dx-button.dx-popup-cancel').text(), 'nopenope', 'correct option change');
          assert.equal($popupWrapper.find('.dx-button.dx-popup-clear').text(), 'fuufuu', 'correct option change');
          assert.equal($popupWrapper.find((".dx-button." + APPLY_BUTTON_CLASS)).text(), 'yepyep', 'correct option change');
        });
        QUnit.test('displayExpr, valueExpr', function(assert) {
          var items = [{
            number: 1,
            caption: 'one'
          }, {
            number: 2,
            caption: 'two'
          }];
          var instance = $('#lookup').dxLookup({
            dataSource: items,
            valueExpr: 'number',
            displayExpr: 'caption'
          }).dxLookup('instance');
          var $firstItem;
          var $field = $(instance._$field);
          assert.equal($field.text(), instance.option('placeholder'), 'no field text if no selected value');
          $(instance._$field).trigger('dxclick');
          $firstItem = $(getList().$element().find('.dx-list-item')[0]);
          assert.equal($firstItem.text(), 'one', 'displayExpr work in list items');
          instance.option('value', 1);
          assert.equal($field.text(), 'one', 'display field work in text');
          assert.equal(instance.option('displayValue'), 'one', 'display field work for \'displayValue\' option');
          instance.option('displayExpr', 'number');
          $firstItem = $(getList().$element().find('.dx-list-item')[0]);
          assert.equal($firstItem.text(), '1', 'displayExpr changing rerenders list items');
          assert.equal(instance.option('displayValue'), '1', 'displayExpr changing work for \'displayValue\' option');
        });
        QUnit.test('value', function(assert) {
          var items = [1, 2, 3];
          var instance = $('#lookup').dxLookup({dataSource: items}).dxLookup('instance');
          var $field = $(instance._$field);
          assert.equal($field.text(), instance.option('placeholder'), 'no field text if no selected value');
          instance.option('value', 1);
          assert.equal($field.text(), 1, 'field text is selected item value');
          assert.equal(instance.option('displayValue'), 1, 'displayValue is selected item value');
          $(instance._$field).trigger('dxclick');
          var $selectedItem = $('.' + LIST_ITEM_SELECTED_CLASS, getList().$element());
          assert.equal($selectedItem.text(), '1', 'select right item after render list');
        });
        QUnit.test('value in field should be selected', function(assert) {
          var date = new Date();
          var items = [date];
          var instance = $('#lookup').dxLookup({
            dataSource: items,
            value: date
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var $selectedItem = $(getList().$element().find('.' + LIST_ITEM_SELECTED_CLASS));
          assert.ok($selectedItem.length, 'select item after render list');
        });
        QUnit.test('value with dataSource', function(assert) {
          var dataSource = new DataSource({
            store: [1, 2],
            pageSize: 1,
            paginate: false
          });
          var instance = $('#lookup').dxLookup({
            dataSource: dataSource,
            value: 2
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var $firstItem = $(getList()._itemElements()[0]);
          var $secondItem = $(getList()._itemElements()[1]);
          var $field = $(instance._$field);
          assert.ok($secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
          assert.ok(!$firstItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was not added to unselected item');
          assert.equal($field.text(), 2, 'field text is selected item value');
          instance.option('value', 1);
          assert.ok(!$secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was deleted');
          assert.ok($firstItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
          assert.equal($field.text(), 1, 'field text is selected item value');
        });
        QUnit.test('value with dataSource and complex items', function(assert) {
          var dataSource = new DataSource({
            store: [{value: 1}, {value: 2}],
            pageSize: 1,
            paginate: false
          });
          var instance = $('#lookup').dxLookup({
            dataSource: dataSource,
            displayExpr: 'value',
            valueExpr: 'value',
            value: 2
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var $firstItem = $(getList().$element().find('.dx-list-item')[0]);
          var $secondItem = $(getList().$element().find('.dx-list-item')[1]);
          var $field = $(instance._$field);
          assert.ok(!$firstItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was not added to unselected item');
          assert.ok($secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
          assert.equal($field.text(), 2, 'field text is selected item value');
          instance.option('value', 1);
          assert.ok($firstItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was added');
          assert.ok(!$secondItem.hasClass(LIST_ITEM_SELECTED_CLASS), 'class selected was deleted');
          assert.equal($field.text(), 1, 'field text is selected item value');
          assert.equal(instance.option('displayValue'), 1, 'options \'displayValue\' is selected item value');
        });
        QUnit.test('dataSource', function(assert) {
          var dataSource1 = [1, 2, 3];
          var dataSource2 = [4, 5];
          var instance = $('#lookup').dxLookup({dataSource: dataSource1}).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var list = getList();
          assert.strictEqual(instance._dataSource, list._dataSource);
          assert.deepEqual(instance._dataSource._items, dataSource1);
          instance.option('dataSource', dataSource2);
          assert.strictEqual(instance._dataSource, list._dataSource);
          assert.deepEqual(instance._dataSource._items, dataSource2);
        });
        QUnit.test('items', function(assert) {
          var items1 = [1, 2, 3];
          var items2 = [4, 5];
          var instance = $('#lookup').dxLookup({items: items1}).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var list = getList();
          assert.deepEqual(list._dataSource._items, items1);
          instance.option('items', items2);
          assert.deepEqual(list._dataSource._items, items2);
        });
        QUnit.test('items after null data source', function(assert) {
          var items2 = [4, 5];
          var instance = $('#lookup').dxLookup({}).dxLookup('instance');
          instance.option('items', items2);
          $(instance._$field).trigger('dxclick');
          assert.deepEqual(getList()._dataSource._items, items2);
        });
        QUnit.test('title', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: [],
            'dropDownOptions.title': 'title'
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          assert.equal(instance._popup.option('title'), 'title', 'title sets to popup correctly on init');
          instance.option('dropDownOptions.title', 'title2');
          assert.equal(instance._popup.option('title'), 'title2', 'title sets to popup correctly on change');
        });
        QUnit.test('fullScreen', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: [],
            'dropDownOptions.fullScreen': true,
            usePopover: false
          }).dxLookup('instance');
          var popup;
          $(instance._$field).trigger('dxclick');
          popup = instance._popup;
          assert.equal(popup.option('fullScreen'), true, 'fullScreen sets to popup correctly on init');
          instance.option('dropDownOptions.fullScreen', false);
          $(instance._$field).trigger('dxclick');
          popup = instance._popup;
          assert.equal(popup.option('fullScreen'), false, 'fullScreen sets to popup correctly on change');
        });
        QUnit.test('placeholder', function(assert) {
          var instance = $('#lookup').dxLookup({dataSource: []}).dxLookup('instance');
          assert.equal($(instance._$field).text(), 'Select...', 'default value');
          instance.option('placeholder', 'placeholder');
          assert.equal($(instance._$field).text(), 'placeholder', 'set as option');
        });
        QUnit.test('minSearchLength', function(assert) {
          var placeholder = 'placeholder';
          var instance = $('#lookup').dxLookup({
            dataSource: ['abc', 'def'],
            minSearchLength: 3,
            searchTimeout: 0,
            placeholder: placeholder
          }).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var search = instance._searchBox;
          var $field = $(instance._$field);
          var $list = $(getList().$element());
          assert.equal($list.find('.dx-list-item').filter(':visible').length, 0, 'No items are expected to be shown');
          assert.equal($field.text(), placeholder);
          instance.option('minSearchLength', 0);
          assert.equal($list.find('.dx-list-item').filter(':visible').length, 2);
          assert.equal($field.text(), placeholder);
          instance.option('minSearchLength', 3);
          assert.equal($list.find('.dx-list-item').filter(':visible').length, 0);
          assert.equal($field.text(), placeholder);
          var selectedValueText = 'def';
          instance.option('value', selectedValueText);
          assert.equal($(instance._$field).text(), selectedValueText);
          search.option('value', 'abc');
          assert.strictEqual($list.find('.dx-list-item').filter(':visible').length, 1);
          assert.equal($(instance._$field).text(), selectedValueText);
          search.option('value', 'ab');
          assert.strictEqual($list.find('.dx-list-item').filter(':visible').length, 0);
          assert.equal($(instance._$field).text(), selectedValueText);
        });
        QUnit.test('applyValueMode affects on Apply button rendering', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: ['abc', 'def'],
            applyValueMode: 'instantly'
          }).dxLookup('instance');
          instance.open();
          var $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find((".dx-button." + APPLY_BUTTON_CLASS)).length, 0, 'Apply button is not rendered');
          assert.ok(!instance.option('showDoneButton'), '\'showDoneButton\' option is false');
          instance.close();
          instance.option('applyValueMode', 'useButtons');
          instance.open();
          $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find((".dx-button." + APPLY_BUTTON_CLASS)).length, 1, 'Apply button is rendered');
        });
        QUnit.test('\'showCancelButton\' option should affect on Cancel button rendering', function(assert) {
          var instance = $('#lookup').dxLookup({
            dataSource: ['abc', 'def'],
            showCancelButton: true
          }).dxLookup('instance');
          instance.open();
          var $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find('.dx-popup-cancel.dx-button').length, 1, 'Apply button is not rendered');
          instance.close();
          instance.option('showCancelButton', false);
          instance.open();
          $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find('.dx-popup-cancel.dx-button').length, 0, 'Apply button is not rendered');
        });
        QUnit.test('search wrapper should not be rendered if the \'searchEnabled\' option is false', function(assert) {
          var instance = $('#lookup').dxLookup({
            searchEnabled: false,
            opened: true
          }).dxLookup('instance');
          assert.equal(getSearchWrapper(instance).length, 0, 'search wrapper is not rendered');
        });
        QUnit.test('search wrapper should be rendered if the \'searchEnabled\' option is true', function(assert) {
          var instance = $('#lookup').dxLookup({
            searchEnabled: true,
            opened: true
          }).dxLookup('instance');
          assert.equal(getSearchWrapper(instance).length, 1, 'search wrapper is rendered');
        });
        QUnit.test('clear button option runtime change', function(assert) {
          var getClearButton = function(instance) {
            return $(instance.content()).parent().find(toSelector(CLEAR_BUTTON_CLASS)).get(0);
          };
          var lookup = $('#lookup').dxLookup({
            deferRendering: false,
            showClearButton: true
          }).dxLookup('instance');
          var $clearButton = getClearButton(lookup);
          assert.ok($clearButton, 'clearButton is rendered');
          lookup.option('showClearButton', false);
          $clearButton = getClearButton(lookup);
          assert.notOk($clearButton, 'clearButton is not rendered after option runtime change');
        });
        QUnit.test('user inputAttr should set attributes to lookup', function(assert) {
          var lookup = $('#lookup').dxLookup({inputAttr: {custom: true}}).dxLookup('instance');
          var $field = lookup.$element().find(("." + LOOKUP_FIELD_CLASS));
          assert.strictEqual($field.attr('custom'), 'true', 'custom attribute is set correctly');
          lookup.option({inputAttr: {custom: null}});
          assert.strictEqual($field.attr('custom'), undefined, 'custom attribute is set correctly');
        });
      });
      QUnit.module('popup options', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('toolbarItems should be passed to the popover (T896951)', function(assert) {
          var buttonConfig = {
            location: 'after',
            toolbar: 'bottom',
            widget: 'dxButton',
            options: {text: 'test'}
          };
          var lookup = $('#lookup').dxLookup({
            opened: true,
            dropDownOptions: {toolbarItems: [buttonConfig]}
          }).dxLookup('instance');
          var $button = $(lookup.content()).parent().find('.dx-button-text');
          assert.deepEqual(lookup._popup.option('toolbarItems'), [buttonConfig], 'toolbarItems are passed correctly');
          assert.strictEqual($button.text(), 'test', 'button is added successfully');
        });
        QUnit.test('shading should present', function(assert) {
          var $lookup = $('#lookupOptions');
          var instance = $lookup.dxLookup({
            'dropDownOptions.shading': true,
            visible: true,
            usePopover: false
          }).dxLookup('instance');
          openPopupWithList(instance);
          var $wrapper = $(toSelector(OVERLAY_WRAPPER_CLASS));
          assert.ok($wrapper.hasClass(OVERLAY_SHADER_CLASS));
          instance.option('dropDownOptions.shading', false);
          assert.ok(!$wrapper.hasClass(OVERLAY_SHADER_CLASS));
        });
        QUnit.test('popup should not be hidden after outsideClick', function(assert) {
          var $lookup = $('#lookupOptions');
          var instance = $lookup.dxLookup({dataSource: [1, 2, 3]}).dxLookup('instance');
          openPopupWithList(instance);
          var $overlay = $(toSelector(OVERLAY_CONTENT_CLASS)).eq(0);
          $(document).trigger('dxpointerdown');
          assert.equal($overlay.is(':visible'), true, 'overlay is not hidden');
        });
        QUnit.test('lookup popup should be hidden after click outside was present', function(assert) {
          var $lookup = $('#lookupOptions');
          var instance = $lookup.dxLookup({
            'dropDownOptions.hideOnOutsideClick': true,
            visible: true,
            usePopover: false
          }).dxLookup('instance');
          openPopupWithList(instance);
          var $overlay = $(toSelector(OVERLAY_CONTENT_CLASS)).eq(0);
          $($overlay).trigger('dxpointerdown');
          assert.equal($overlay.is(':visible'), true, 'overlay is not hidden');
          $(document).trigger('dxpointerdown');
          assert.equal($overlay.is(':visible'), false, 'overlay is hidden');
        });
        QUnit.test('custom titleTemplate option', function(assert) {
          var $lookup = $('#lookupOptions').dxLookup({
            'dropDownOptions.titleTemplate': 'customTitle',
            visible: true,
            showCancelButton: false
          });
          openPopupWithList($lookup.dxLookup('instance'));
          var $title = $(toSelector(POPUP_TITLE_CLASS));
          assert.equal($.trim($title.text()), 'testTitle', 'title text is correct');
        });
        QUnit.test('custom titleTemplate option is set correctly on init', function(assert) {
          var $lookup = $('#lookupOptions').dxLookup({'dropDownOptions.titleTemplate': function(titleElement) {
              assert.equal(isRenderer(titleElement), !!config().useJQuery, 'titleElement is correct');
              var result = '<div class=\'test-title-renderer\'>';
              result += '<h1>Title</h1>';
              result += '</div>';
              return result;
            }});
          var instance = $lookup.dxLookup('instance');
          openPopupWithList(instance);
          var $title = $(toSelector(POPUP_TITLE_CLASS));
          assert.ok($title.find(toSelector('test-title-renderer')).length, 'option \'titleTemplate\' was set successfully');
        });
        QUnit.test('custom titleTemplate and onTitleRendered option is set correctly by options', function(assert) {
          assert.expect(2);
          var $lookup = $('#lookupOptions').dxLookup();
          var instance = $lookup.dxLookup('instance');
          instance.option('dropDownOptions.onTitleRendered', function(e) {
            assert.ok(true, 'option \'onTitleRendered\' successfully passed to the popup widget raised on titleTemplate');
          });
          instance.option('dropDownOptions.titleTemplate', function(titleElement) {
            var result = '<div class=\'changed-test-title-renderer\'>';
            result += '<h1>Title</h1>';
            result += '</div>';
            return result;
          });
          openPopupWithList(instance);
          var $title = $(toSelector(POPUP_TITLE_CLASS));
          assert.ok($title.find(toSelector('changed-test-title-renderer')).length, 'option \'titleTemplate\' successfully passed to the popup widget');
        });
        QUnit.test('popup does not close when filtering datasource has item equal selected item', function(assert) {
          var $lookup = $('#lookup').dxLookup({
            dataSource: ['red', 'yellow'],
            value: 'yellow',
            searchTimeout: 0
          });
          $lookup.dxLookup('option', 'opened', true);
          var $popupContent = $(toSelector(POPUP_CONTENT_CLASS));
          keyboardMock($popupContent.find('.' + TEXTEDITOR_INPUT_CLASS)).type('y');
          assert.ok($lookup.dxLookup('option', 'opened'), 'lookup stays opened');
        });
        QUnit.test('popup should have correct width when lookup rendered in invisible area', function(assert) {
          var originalCurrentDevice = devices.current();
          devices.current({platform: 'generic'});
          try {
            var $lookup = $('#lookup');
            var $lookupWrapper = $lookup.wrap('<div>').parent().hide();
            var lookup = $lookup.dxLookup({
              items: [1, 2, 3],
              deferRendering: false,
              usePopover: true,
              width: 200
            }).dxLookup('instance');
            $lookupWrapper.show();
            $lookup.css('border', '1px solid black');
            lookup.option('opened', true);
            var $overlayContent = $('.dx-overlay-content');
            assert.equal($overlayContent.outerWidth(), $lookup.outerWidth(), 'width equal to lookup width');
          } finally {
            devices.current(originalCurrentDevice);
          }
        });
        QUnit.test('popup height should be saved after configuration', function(assert) {
          $('#lookup').dxLookup({
            dataSource: [1, 2, 3, 4, 5],
            opened: true,
            dropDownOptions: {
              fullScreen: false,
              height: $(window).height() * 0.8
            },
            usePopover: false
          });
          assert.roughEqual($('.dx-overlay-content').outerHeight(), Math.round($(window).height() * 0.8), 1, 'height equal to lookup height');
        });
        QUnit.test('popup height should be stretch when data items are loaded asynchronously', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          $('#lookup').dxLookup({
            dataSource: new CustomStore({
              load: function(loadOptions) {
                var deferred = $.Deferred();
                var employeesList = ['John Heart', 'Samantha Bright', 'Arthur Miller', 'Robert Reagan', 'Greta Sims', 'Brett Wade', 'Sandra Johnson', 'Ed Holmes', 'James Anderson', 'Antony Remmen', 'Olivia Peyton', 'Taylor Riley', 'Amelia Harper', 'Wally Hobbs', 'Brad Jameson'];
                window.setTimeout(function() {
                  deferred.resolve(employeesList);
                }, 0);
                return deferred.promise();
              },
              byKey: function(key) {
                return key;
              },
              update: function(values) {}
            }),
            dropDownOptions: {showTitle: false},
            usePopover: false,
            opened: true
          });
          var defaultHeight = $('.dx-overlay-content').outerHeight();
          this.clock.tick(10);
          assert.ok($('.dx-overlay-content').outerHeight() > defaultHeight, 'popup height is changed when data is loaded');
        });
        QUnit.test('popover height should be recalculated after async datasource load(T655040)', function(assert) {
          if (browser.mozilla && parseFloat(browser.version) < 71 || devices.real().deviceType !== 'desktop') {
            assert.expect(0);
            return;
          }
          var $rootLookup = $('<div>').appendTo('body');
          try {
            var items = ['item 1', 'item 2', 'item 3', 'item 4'];
            var instance = $rootLookup.dxLookup({
              dataSource: new CustomStore({
                load: function() {
                  var deferred = $.Deferred();
                  setTimeout(function() {
                    deferred.resolve(items);
                  }, 500);
                  return deferred.promise();
                },
                byKey: function(key) {
                  var deferred = new $.Deferred();
                  setTimeout(function() {
                    deferred.resolve(items[0]);
                  }, 500);
                  return deferred.promise();
                }
              }),
              width: 300,
              searchEnabled: false,
              dropDownOptions: {
                position: 'center',
                container: $('body')
              },
              target: $('body'),
              usePopover: true,
              opened: true
            }).dxLookup('instance');
            this.clock.tick(1000);
            assert.ok($(instance.content()).height() >= $(instance.content()).find('.dx-scrollable-content').height(), $(instance.content()).height() + ' >= ' + $(instance.content()).find('.dx-scrollable-content').height());
          } finally {
            $rootLookup.remove();
          }
        });
        ['onTitleRendered', 'hideOnOutsideClick'].forEach(function(option) {
          QUnit.test((option + " should be passed to the popup"), function(assert) {
            var $__4;
            var stub = sinon.stub();
            var fullOptionName = ("dropDownOptions." + option);
            var instance = $('#lookup').dxLookup(($__4 = {}, Object.defineProperty($__4, fullOptionName, {
              value: stub,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "deferRendering", {
              value: false,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4)).dxLookup('instance');
            var popup = instance._popup;
            assert.strictEqual(popup.option(option), stub, (option + " is passed to the popup on init"));
            instance.option(fullOptionName, null);
            assert.strictEqual(popup.option(option), null, (option + " is passed to the popup after runtime change"));
          });
        });
        QUnit.test('animation option should be passed to the popup', function(assert) {
          var animationStub = {show: {
              type: 'slide',
              duration: 400
            }};
          var instance = $('#lookup').dxLookup({
            'dropDownOptions.animation': animationStub,
            deferRendering: false
          }).dxLookup('instance');
          var popup = instance._popup;
          assert.deepEqual(popup.option('animation'), animationStub, 'animation option is passed to the popup on init');
          instance.option('dropDownOptions.animation', null);
          assert.strictEqual(popup.option('animation'), null, 'animation option is passed to the popup after runtime change');
        });
        QUnit.test('Check hideOnParentScroll option in Material theme', function(assert) {
          var isMaterialStub = sinon.stub(themes, 'isMaterial');
          isMaterialStub.returns(true);
          try {
            var lookup = $('#lookup').dxLookup({deferRendering: false}).dxLookup('instance');
            assert.ok(lookup.option('dropDownOptions.hideOnParentScroll'), 'is true by default');
            lookup.open();
            this.clock.tick(10);
            assert.ok(lookup.option('dropDownOptions.hideOnParentScroll'), 'still true after opening');
          } finally {
            isMaterialStub.restore();
          }
        });
        QUnit.test('popup dimensions should be calculated relative to dropDownOptions.position.of if _scrollToSelectedItemEnabled=true', function(assert) {
          $('#lookup').dxLookup({
            dropDownOptions: {
              position: {of: window},
              width: '50%',
              height: '50%'
            },
            usePopover: false,
            _scrollToSelectedItemEnabled: true,
            opened: true
          });
          var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
          assert.roughEqual(getOuterWidth($overlayContent), getOuterWidth(window) / 2, 0.1, 'popup width is correct');
          assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight(window) / 2, 0.1, 'popup height is correct');
        });
        QUnit.test('popup dimensions should be calculated relative to dropDownOptions.container if _scrollToSelectedItemEnabled=true', function(assert) {
          var $container = $('<div>').css({height: 150}).appendTo('#qunit-fixture');
          $('#lookup').dxLookup({
            dropDownOptions: {
              position: {of: window},
              container: $container,
              width: '50%',
              height: '50%'
            },
            usePopover: false,
            _scrollToSelectedItemEnabled: true,
            opened: true
          });
          var $overlayContent = $(("." + OVERLAY_CONTENT_CLASS));
          assert.roughEqual(getOuterWidth($overlayContent), getOuterWidth($container) / 2, 0.1, 'popup width is correct');
          assert.roughEqual(getOuterHeight($overlayContent), getOuterHeight($container) / 2, 0.1, 'popup height is correct');
        });
        [{
          component: PopupFull,
          componentName: 'PopupFull',
          usePopover: false
        }, {
          component: PopoverFull,
          componentName: 'PopoverFull',
          usePopover: true
        }].forEach(function($__5) {
          var $__6 = $__5,
              component = $__6.component,
              componentName = $__6.componentName,
              usePopover = $__6.usePopover;
          QUnit.test((componentName + " defaultOptions should affect dropDownEditor popup(T1133910)"), function(assert) {
            var defaultHandlerCalled = false;
            component.defaultOptions({options: {onShowing: function() {
                  defaultHandlerCalled = true;
                }}});
            try {
              $('#lookup').dxLookup({
                usePopover: usePopover,
                opened: true
              });
              assert.strictEqual(defaultHandlerCalled, true);
            } finally {
              component.defaultOptions({options: {onShowing: function() {}}});
            }
          });
        });
      });
      QUnit.module('list options', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('list option bouncing', function(assert) {
          var dataSource = new DataSource({
            store: [1, 2, 3],
            paginate: false
          });
          var $lookup = $('#lookupOptions').dxLookup({
            dataSource: dataSource,
            pageLoadMode: 'scrollBottom',
            nextButtonText: 'test',
            pullRefreshEnabled: true,
            pullingDownText: 'testPulling',
            pulledDownText: 'testPulled',
            refreshingText: 'testRefresh',
            pageLoadingText: 'testLoading'
          });
          var instance = $lookup.dxLookup('instance');
          openPopupWithList(instance);
          var $list = $(toSelector(LIST_CLASS));
          var list = $list.dxList('instance');
          assert.equal(list.option('pageLoadMode'), 'scrollBottom', 'pageLoadMode was bounced');
          instance.option('pageLoadMode', 'nextButton');
          assert.equal(list.option('pageLoadMode'), 'nextButton', 'pageLoadMode was changed');
          assert.equal(list.option('nextButtonText'), 'test', 'nextButtonText was bounced');
          instance.option('nextButtonText', 'testchange');
          assert.equal(list.option('nextButtonText'), 'testchange', 'nextButtonText was changed');
          assert.equal(list.option('pullRefreshEnabled'), true, 'pullRefreshEnabled was bounced');
          instance.option('pullRefreshEnabled', false);
          assert.equal(list.option('pullRefreshEnabled'), false, 'pullRefreshEnabled was changed');
          assert.equal(list.option('pullingDownText'), 'testPulling', 'pullingDownText was bounced');
          instance.option('pullingDownText', 'testPullingChange');
          assert.equal(list.option('pullingDownText'), 'testPullingChange', 'pullingDownText was changed');
          assert.equal(list.option('pulledDownText'), 'testPulled', 'pulledDownText was bounced');
          instance.option('pulledDownText', 'testPulledChange');
          assert.equal(list.option('pulledDownText'), 'testPulledChange', 'pulledDownText was changed');
          assert.equal(list.option('refreshingText'), 'testRefresh', 'refreshingText was bounced');
          instance.option('refreshingText', 'testRefreshChange');
          assert.equal(list.option('refreshingText'), 'testRefreshChange', 'refreshingText was changed');
          assert.equal(list.option('pageLoadingText'), 'testLoading', 'pageLoadingText was bounced');
          instance.option('pageLoadingText', 'testLoadingChange');
          assert.equal(list.option('pageLoadingText'), 'testLoadingChange', 'pageLoadingText was changed');
        });
        QUnit.test('group options bouncing', function(assert) {
          var dataSource = [{
            key: 'header1',
            items: ['1', '2']
          }, {
            key: 'header2',
            items: ['1', '2']
          }];
          var $lookup = $('#lookupOptions').dxLookup({
            dataSource: dataSource,
            grouped: true,
            groupTemplate: 'testGroupTemplate'
          });
          var instance = $lookup.dxLookup('instance');
          openPopupWithList(instance);
          var $list = $(toSelector(LIST_CLASS));
          var list = $list.dxList('instance');
          assert.equal(list.option('grouped'), true, 'grouped was bounced');
          var $title = $(toSelector(LIST_GROUP_HEADER_CLASS));
          assert.equal($title.length, 2, 'there are 2 group titles');
          $title = $title.eq(0);
          assert.equal($.trim($title.text()), 'testGroupTemplate', 'title text is correct');
          instance.option('groupTemplate', function(itemData, itemIndex, itemElement) {
            assert.equal(isRenderer(itemElement), !!config().useJQuery, 'itemElement is correct');
            return 'test';
          });
          $title = $(toSelector(LIST_GROUP_HEADER_CLASS)).eq(0);
          assert.equal($.trim($title.text()), 'test', 'title text is correct');
        });
      });
      QUnit.module('Native scrolling', function() {
        QUnit.test('After load new page scrollTop should not be changed', function(assert) {
          var data = [];
          var done = assert.async();
          for (var i = 100; i >= 0; i--) {
            data.push(i);
          }
          var $lookup = $('#lookup').wrap($('<div>').css('position', 'static')).dxLookup({
            searchEnabled: true,
            dataSource: {
              store: new ArrayStore(data),
              paginate: true,
              pageSize: 40
            },
            dropDownOptions: {
              fullScreen: false,
              height: '50%'
            },
            searchTimeout: 0,
            width: 200,
            usePopover: false
          });
          $lookup.dxLookup('instance').open();
          var listInstance = $('.dx-list').dxList('instance');
          listInstance.option('pageLoadMode', 'scrollBottom');
          listInstance.option('useNativeScrolling', 'true');
          listInstance.scrollTo(1000);
          var scrollTop = listInstance.scrollTop();
          setTimeout(function() {
            assert.roughEqual(listInstance.scrollTop(), scrollTop, 2, 'scrollTop is correctly after new page load');
            done();
          });
        });
        QUnit.test('Popup height should be decrease after a loading of new page and searching', function(assert) {
          var data = [];
          for (var i = 100; i >= 0; i--) {
            data.push(i);
          }
          data.push('a');
          var $lookup = $('#lookup').wrap($('<div>').css('position', 'static')).dxLookup({
            searchEnabled: true,
            dataSource: {
              store: new ArrayStore(data),
              paginate: true,
              pageSize: 20
            },
            searchTimeout: 0,
            width: 200,
            usePopover: false,
            dropDownOptions: {
              fullScreen: false,
              height: 'auto'
            }
          });
          $lookup.dxLookup('instance').open();
          var $list = $('.dx-list');
          var listInstance = $('.dx-list').dxList('instance');
          listInstance.option('pageLoadMode', 'scrollBottom');
          listInstance.option('useNativeScrolling', 'true');
          listInstance._loadNextPage();
          var listHeight = $list.outerHeight();
          var $input = $('.' + LOOKUP_SEARCH_CLASS).find('.' + TEXTEDITOR_INPUT_CLASS);
          var keyboard = keyboardMock($input);
          keyboard.type('a');
          var currentListHeight = $list.outerHeight();
          assert.notEqual(listHeight, currentListHeight, 'popup should be collapsed after search');
        });
      });
      QUnit.module('widget sizing render', function() {
        QUnit.test('default', function(assert) {
          var $element = $('#widget').dxLookup();
          assert.ok($element.outerWidth() > 0, 'outer width of the element must be more than zero');
        });
        QUnit.test('change width', function(assert) {
          var $element = $('#widget').dxLookup();
          var instance = $element.dxLookup('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          assert.strictEqual($element.outerWidth(), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('focus policy', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.testInActiveWindow('T338144 - focused element should not be reset after popup is reopened if the \'searchEnabled\' is false', function(assert) {
          var isDesktop = devices.real().deviceType === 'desktop';
          if (!isDesktop) {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var instance = $('#widget').dxLookup({
            items: [1, 2, 3],
            opened: true,
            searchEnabled: false
          }).dxLookup('instance');
          var $list = $($(instance.content()).find('.dx-list'));
          var $listItems = $list.find('.dx-item');
          var list = $list.dxList('instance');
          $($listItems.eq(1)).trigger('dxclick');
          instance.open();
          list.focus();
          assert.equal($(list.option('focusedElement')).text(), $listItems.eq(1).text(), 'clicked item is focused after popup is reopened');
        });
        QUnit.test('field method returning overlay content', function(assert) {
          var $element = $('#widget').dxLookup({
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          var $field = instance.field();
          assert.ok($field.hasClass(LOOKUP_FIELD_CLASS), 'field has class dx-texteditor-input');
        });
        QUnit.testInActiveWindow('lookup search get focus on opening', function(assert) {
          var $element = $('#widget').dxLookup({
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          instance.focus();
          assert.ok($element.hasClass(FOCUSED_CLASS), '\'focus\' method focus field with closed overlay');
          instance.option('opened', true);
          var $searchBox = getSearchBox(instance);
          assert.ok($searchBox.hasClass(FOCUSED_CLASS), '\'focus\' method focus searchBox with opened overlay');
        });
        QUnit.testInActiveWindow('lookup field should get focus when popup was closed', function(assert) {
          var $element = $('#widget').dxLookup({
            focusStateEnabled: true,
            opened: true
          });
          var instance = $element.dxLookup('instance');
          instance.close();
          assert.ok($element.hasClass(FOCUSED_CLASS), 'lookup field gets focus after popup closing');
        });
        QUnit.test('lookup should not lose focus when clicking inside popup', function(assert) {
          assert.expect(1);
          var $element = $('#widget').dxLookup({
            focusStateEnabled: true,
            opened: true
          });
          var instance = $element.dxLookup('instance');
          var $content = $(instance._popup.$content());
          $($content).on('dxpointerdown', function(e) {
            assert.ok(!e.isDefaultPrevented(), 'elements inside popup get focus');
          });
          $($content).trigger('dxpointerdown');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('lookup popup open by enter key press', function(assert) {
          assert.expect(2);
          var $element = $('#widget').dxLookup({focusStateEnabled: true});
          var instance = $element.dxLookup('instance');
          var $field = $(instance._$field).focusin();
          var keyboard = keyboardMock($field);
          assert.ok(!instance.option('opened'));
          keyboard.keyDown('enter');
          assert.ok(instance.option('opened'), 'enter key on field open popup');
        });
        QUnit.test('lookup popup open by space key press', function(assert) {
          assert.expect(2);
          var $element = $('#widget').dxLookup({focusStateEnabled: true});
          var instance = $element.dxLookup('instance');
          var $field = $(instance._$field).focusin();
          var keyboard = keyboardMock($field);
          assert.ok(!instance.option('opened'));
          keyboard.keyDown('space');
          assert.ok(instance.option('opened'), 'space key on field open popup');
        });
        QUnit.testInActiveWindow('lookup search field focused after open popup', function(assert) {
          var $element = $('#widget').dxLookup({
            opened: true,
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          assert.ok(instance.option('opened'));
          assert.ok(getSearchBox(instance).hasClass(FOCUSED_CLASS), 'searchBox has focus after open popup');
        });
        QUnit.testInActiveWindow('lookup-list should be focused after \'down\' key pressing', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#widget').dxLookup({
            opened: true,
            items: [1, 2, 3],
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          var keyboard = keyboardMock(getSearchBox(instance).find('.dx-texteditor-input'));
          keyboard.keyDown('down');
          assert.ok(instance._$list.find('.dx-list-item').first().hasClass(FOCUSED_CLASS), 'list-item is focused after down key pressing');
        });
        QUnit.testInActiveWindow('lookup-list keyboard navigation should work after focusing on list', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#widget').dxLookup({
            opened: true,
            items: [1, 2, 3],
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          instance._$list.dxList('focus');
          assert.ok(instance._$list.find('.dx-list-item').eq(0).hasClass(FOCUSED_CLASS), 'list-item is focused after focusing on list');
          var $listItemContainer = instance._$list.find(("." + LIST_ITEM_CLASS)).parent();
          var keyboard = keyboardMock($listItemContainer);
          keyboard.keyDown('down');
          assert.ok(instance._$list.find('.dx-list-item').eq(1).hasClass(FOCUSED_CLASS), 'second list-item is focused after down key pressing');
        });
        QUnit.testInActiveWindow('lookup item should be selected after \'enter\' key pressing', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#widget').dxLookup({
            opened: true,
            items: [1, 2, 3],
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          var keyboard = keyboardMock(getSearchBox(instance).find('.dx-texteditor-input'));
          keyboard.keyDown('down');
          keyboard.keyDown('down');
          keyboard.keyDown('enter');
          assert.equal(instance.option('value'), 2, 'value is correct');
        });
        QUnit.testInActiveWindow('lookup item should be selected after \'space\' key pressing', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#widget').dxLookup({
            opened: true,
            items: [1, 2, 3],
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          var keyboard = keyboardMock(getSearchBox(instance).find('.dx-texteditor-input'));
          keyboard.keyDown('down');
          keyboard.keyDown('down');
          keyboard.keyDown('space');
          assert.equal(instance.option('value'), 2, 'value is correct');
        });
        QUnit.testInActiveWindow('keyboard for lookup-list should work correctly after \'searchEnabled\' option changed', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var $element = $('#widget').dxLookup({
            opened: true,
            items: [1, 2, 3],
            focusStateEnabled: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          instance.option('searchEnabled', false);
          var $listItemContainer = instance._$list.find(("." + LIST_ITEM_CLASS)).parent();
          var keyboard = keyboardMock($listItemContainer);
          keyboard.keyDown('down');
          assert.ok(instance._$list.find(("." + LIST_ITEM_CLASS)).first().hasClass(FOCUSED_CLASS), 'list-item is focused after down key pressing');
        });
        QUnit.test('space key press on readOnly lookup doesn\'t toggle popup visibility', function(assert) {
          var instance = $('#lookup').dxLookup({
            items: [0, 1, 2],
            readOnly: true,
            focusStateEnabled: true
          }).dxLookup('instance');
          var $field = $(instance._$field).focusin();
          var keyboard = keyboardMock($field);
          keyboard.keyDown('space');
          assert.ok(!instance.option('opened'), 'when we press space key - popup is still hidden');
          instance.option('readOnly', false);
          keyboard.keyDown('space');
          assert.ok(instance.option('opened'), 'when we press space key - popup is visible after option changed');
        });
        QUnit.test('enter key press on readOnly lookup doesn\'t toggle popup visibility', function(assert) {
          var instance = $('#lookup').dxLookup({
            items: [0, 1, 2],
            readOnly: true,
            focusStateEnabled: true
          }).dxLookup('instance');
          var $field = $(instance._$field).focusin();
          var keyboard = keyboardMock($field);
          keyboard.keyDown('enter');
          assert.ok(!instance.option('opened'), 'when we press enter key - popup is still hidden');
          instance.option('readOnly', false);
          keyboard.keyDown('enter');
          assert.ok(instance.option('opened'), 'when we press enter key - popup is visible after option changed');
        });
        QUnit.test('escape key press close overlay with search enabled', function(assert) {
          var instance = $('#lookup').dxLookup({
            items: [0, 1, 2],
            opened: true,
            focusStateEnabled: true,
            searchEnabled: true
          }).dxLookup('instance');
          var keyboard = keyboardMock(getSearchBox(instance).find('.dx-texteditor-input'));
          assert.ok(instance.option('opened'), 'overlay opened');
          keyboard.keyDown('esc');
          assert.ok(!instance.option('opened'), 'overlay close on escape');
        });
        QUnit.test('escape key press close overlay without search enabled', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var instance = $('#lookup').dxLookup({
            items: [0, 1, 2],
            opened: true,
            focusStateEnabled: true,
            searchEnabled: false
          }).dxLookup('instance');
          var $listItemContainer = instance._$list.find(("." + LIST_ITEM_CLASS)).parent();
          var keyboard = keyboardMock($listItemContainer);
          assert.ok(instance.option('opened'), 'overlay opened');
          keyboard.keyDown('esc');
          assert.ok(!instance.option('opened'), 'overlay close on escape');
        });
        QUnit.test('T320459 - the \'space\' key press should prevent default behavior while navigating list', function(assert) {
          var lookup = $('#lookup').dxLookup({
            items: [1, 2, 3],
            opened: true,
            focusStateEnabled: true
          }).dxLookup('instance');
          var $popupInput = $($(lookup.content()).find('.' + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($popupInput);
          var event;
          getList().option('focusStateEnabled', true);
          $($popupInput).on('keydown', function(e) {
            if (e.key === ' ') {
              event = e;
            }
          });
          $popupInput.focus();
          keyboard.press('down').press('space');
          assert.ok(event.isDefaultPrevented(), 'default is prevented');
        });
        QUnit.test('T320459 - the \'space\' key press on editor should prevent default behavior', function(assert) {
          var lookup = $('#lookup').dxLookup({
            items: [1, 2, 3],
            focusStateEnabled: true
          }).dxLookup('instance');
          var $input = $(lookup.field());
          var keyboard = keyboardMock($input);
          var event;
          $($input).on('keydown', function(e) {
            if (e.key === ' ') {
              event = e;
            }
          });
          $input.focus();
          keyboard.press('space');
          assert.ok(event.isDefaultPrevented(), 'default is prevented');
        });
        QUnit.test('\'Home\', \'End\' keys does not changed default behaviour in searchField', function(assert) {
          var lookup = $('#lookup').dxLookup({
            items: [1, 2, 3],
            focusStateEnabled: true,
            opened: true
          }).dxLookup('instance');
          var $input = $('.' + LOOKUP_SEARCH_CLASS + ' input');
          var keyboard = keyboardMock($input);
          keyboard.keyDown('home');
          keyboard.keyDown('enter');
          assert.equal(lookup.option('value'), undefined, 'home key works correctly');
        });
        QUnit.test('Pressing escape when focus \'cancel\' button must hide the popup', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
          }
          var escapeKeyDown = $.Event('keydown', {key: 'Escape'});
          var $element = $('#widget').dxLookup({
            opened: true,
            focusStateEnabled: true,
            showCancelButton: true,
            searchEnabled: true
          });
          var instance = $element.dxLookup('instance');
          $(instance.content()).parent().find('.dx-button.dx-popup-cancel').trigger(escapeKeyDown);
          assert.ok(!instance.option('opened'));
        });
      });
      QUnit.module('dataSource integration', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
          this.$element = $('#lookup');
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('search should be execute after paste', function(assert) {
          this.$element.dxLookup({
            dataSource: ['one', 'two', 'three'],
            opened: true,
            searchEnabled: true,
            searchTimeout: 0,
            searchMode: 'contains'
          });
          var $input = $(toSelector(POPUP_CONTENT_CLASS) + ' ' + toSelector(TEXTEDITOR_INPUT_CLASS));
          $($input.val('o')).trigger('input');
          this.clock.tick(10);
          assert.equal($('.dx-list-item').length, 2, 'filters execute on input event');
        });
        [{
          loadDelay: 200,
          indicateLoading: false
        }, {
          loadDelay: 1000,
          indicateLoading: true
        }].forEach(function($__5) {
          var $__6 = $__5,
              loadDelay = $__6.loadDelay,
              indicateLoading = $__6.indicateLoading;
          QUnit.test(("search with loading delay = " + loadDelay + " should " + (indicateLoading ? '' : 'not') + " lead to the load panel being displayed"), function(assert) {
            var instance = this.$element.dxLookup({
              dataSource: {load: function() {
                  var d = new $.Deferred();
                  setTimeout(function() {
                    d.resolve([1, 2, 3]);
                  }, loadDelay);
                  return d;
                }},
              opened: true,
              searchEnabled: true,
              searchTimeout: 0,
              searchMode: 'contains',
              useNativeScrolling: false
            }).dxLookup('instance');
            this.clock.tick(loadDelay);
            var $content = $(instance.content());
            var $input = $content.find(("." + LOOKUP_SEARCH_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
            var $loadPanel = $content.find(("." + SCROLL_VIEW_LOAD_PANEL_CLASS));
            var keyboard = keyboardMock($input);
            keyboard.type('2');
            this.clock.tick(loadDelay / 2);
            assert.strictEqual($loadPanel.is(':visible'), indicateLoading, ("load panel is " + (indicateLoading ? '' : 'not') + " visible (" + loadDelay / 2 + "ms after the loading started)"));
            this.clock.tick(loadDelay / 2);
            assert.ok($loadPanel.is(':hidden'), 'load panel is not visible when loading has been finished');
          });
        });
        QUnit.test('dataSouce loading with delay = 1000 should not lead to the load panel being displayed when search is disabled', function(assert) {
          var loadDelay = 1000;
          var instance = this.$element.dxLookup({
            dataSource: {load: function() {
                var d = new $.Deferred();
                setTimeout(function() {
                  d.resolve([1, 2, 3]);
                }, loadDelay);
                return d;
              }},
            searchEnabled: false,
            useNativeScrolling: false,
            opened: true
          }).dxLookup('instance');
          this.clock.tick(loadDelay);
          var $content = $(instance.content());
          var $loadPanel = $content.find(("." + SCROLL_VIEW_LOAD_PANEL_CLASS));
          instance.getDataSource().load();
          this.clock.tick(loadDelay / 2);
          assert.ok($loadPanel.is(':hidden'), ("load panel is not visible (" + loadDelay / 2 + "ms after the loading started)"));
          this.clock.tick(loadDelay / 2);
          assert.ok($loadPanel.is(':hidden'), 'load panel is not visible when loading has been finished');
        });
        QUnit.test('load panel should be displayed if old search result has no items and now search value was modified (T985917)', function(assert) {
          var loadDelay = 1000;
          var instance = this.$element.dxLookup({
            dataSource: {load: function() {
                var d = new $.Deferred();
                setTimeout(function() {
                  d.resolve([]);
                }, loadDelay);
                return d;
              }},
            searchEnabled: true,
            searchTimeout: loadDelay / 10,
            useNativeScrolling: false,
            opened: true
          }).dxLookup('instance');
          this.clock.tick(loadDelay);
          var $content = $(instance.content());
          var $input = $content.find(("." + LOOKUP_SEARCH_CLASS + " ." + TEXTEDITOR_INPUT_CLASS));
          var keyboard = keyboardMock($input);
          keyboard.type('1');
          this.clock.tick(loadDelay * 2);
          keyboard.type('2');
          this.clock.tick(loadDelay / 2 + 10);
          var $loadPanel = $content.find(("." + SCROLL_VIEW_LOAD_PANEL_CLASS));
          assert.ok($loadPanel.is(':visible'), 'load panel is visible');
        });
      });
      QUnit.module('Validation', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Validation message', function(assert) {
          var $element = $('#widget').dxLookup();
          var instance = $element.dxLookup('instance');
          instance.option({
            isValid: false,
            validationError: {message: 'Some error happened'}
          });
          assert.ok(instance);
        });
        QUnit.test('widget should render with \'validationError === null\'', function(assert) {
          var $element = $('#widget').dxLookup();
          var instance = $element.dxLookup('instance');
          instance.option({
            isValid: true,
            validationError: null
          });
          assert.ok(instance);
        });
        QUnit.test('Pending indicator is rendered', function(assert) {
          var $element = $('#widget').dxLookup();
          var instance = $element.dxLookup('instance');
          instance.option('validationStatus', 'pending');
          assert.ok($element.find('.dx-pending-indicator').dxLoadIndicator('instance').option('visible'));
        });
        QUnit.test('Lookup should select an item in the grouped list', function(assert) {
          var data = [{
            'ID': 1,
            'Assigned': 'Mr. John Heart',
            'Subject': 'Choose between PPO and HMO Health Plan'
          }, {
            'ID': 2,
            'Assigned': 'Mr. John Heart',
            'Subject': 'Google AdWords Strategy'
          }, {
            'ID': 3,
            'Assigned': 'Mr. YBob',
            'Subject': 'New Brochures'
          }];
          var $element = $('#widget').dxLookup({
            dataSource: new DataSource({
              store: data,
              key: 'ID',
              group: 'Assigned'
            }),
            grouped: true,
            displayExpr: 'Subject',
            opened: true
          });
          var instance = $element.dxLookup('instance');
          $('.dx-list-item .dx-list-item-content').eq(2).trigger('dxclick');
          assert.deepEqual(instance.option('value'), {
            'ID': 3,
            'Assigned': 'Mr. YBob',
            'Subject': 'New Brochures'
          }, 'option \'value\' is correct');
          assert.deepEqual(instance.option('text'), 'New Brochures', 'option \'text\' is correct');
          assert.equal($element.find('.dx-lookup-field').text(), 'New Brochures', 'text field is correct');
        });
      });
      QUnit.module('device and theme specific tests', {
        beforeEach: function() {
          this._originalDevice = devices.current();
        },
        afterEach: function() {
          devices.current(this._originalDevice);
        }
      }, function() {
        QUnit.test('search button on iOS', function(assert) {
          devices.current('iPad');
          var lookup = $('#secondLookup').dxLookup({
            displayExpr: 'value',
            valueExpr: 'value',
            value: 3,
            searchTimeout: 0
          }).dxLookup('instance');
          openPopupWithList(lookup);
          var $popupWrapper = $('.dx-popup-wrapper');
          assert.equal($popupWrapper.find('.dx-popup-title').find('.dx-button').length, 1, 'button is present in popup title');
          assert.equal($popupWrapper.find('.dx-list').length, 1, 'list is present in popup');
        });
        QUnit.test('popup title collapse if empty title option (B232073)', function(assert) {
          var instance = $('#lookup').dxLookup({}).dxLookup('instance');
          $(instance._$field).trigger('dxclick');
          var popup = instance._popup;
          var $popupTitle = $(popup.$wrapper()).find('.dx-popup-title');
          assert.ok($popupTitle.height() > 0);
        });
      });
      if (devices.real().deviceType === 'desktop') {
        [true, false].forEach(function(searchEnabled) {
          QUnit.module(("Aria accessibility, searchEnabled: " + searchEnabled), {
            beforeEach: function() {
              this.isMac = devices.real().mac;
              helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
                  return new Lookup($element, $.extend({searchEnabled: searchEnabled}, options));
                }});
            },
            afterEach: function() {
              helper.$widget.remove();
            }
          }, function() {
            QUnit.test(("opened: true, searchEnabled: " + searchEnabled), function() {
              helper.createWidget({opened: true});
              var $field = helper.$widget.find(("." + LOOKUP_FIELD_CLASS));
              var $list = $(("." + LIST_CLASS));
              var $input = helper.widget._popup.$content().find(("." + TEXTEDITOR_INPUT_CLASS));
              var listAttributes = {
                id: helper.widget._listId,
                role: 'group',
                'aria-roledescription': 'list'
              };
              var listItemContainerAttributes = {
                'aria-label': 'No data to display',
                tabindex: '0',
                role: 'listbox'
              };
              var fieldAttributes = {
                role: 'combobox',
                tabindex: '0',
                'aria-owns': helper.widget._popupContentId,
                'aria-expanded': 'true',
                'aria-controls': helper.widget._listId
              };
              var widgetAttributes = {'aria-owns': helper.widget._popupContentId};
              var popupContentAttributes = {id: helper.widget._popupContentId};
              helper.checkAttributes($list, listAttributes, 'list');
              helper.checkAttributes($list.find(("." + SCROLL_VIEW_CONTENT_CLASS)), listItemContainerAttributes, 'scrollview content');
              helper.checkAttributes($field, fieldAttributes, 'field');
              helper.checkAttributes(helper.$widget, widgetAttributes, 'widget');
              helper.checkAttributes(helper.widget._popup.$content(), popupContentAttributes, 'popupContent');
              if ($input.length) {
                var expectedAttributes = {
                  autocomplete: 'off',
                  type: 'text',
                  spellcheck: 'false',
                  tabindex: '0',
                  role: 'textbox',
                  'aria-label': 'Search'
                };
                if (this.isMac) {
                  expectedAttributes.placeholder = ' ';
                }
                helper.checkAttributes($input, expectedAttributes, 'input');
              }
              helper.widget.option('searchEnabled', !searchEnabled);
              listAttributes.id = helper.widget._listId;
              fieldAttributes = {
                role: 'combobox',
                tabindex: '0',
                'aria-owns': helper.widget._popupContentId,
                'aria-expanded': 'true',
                'aria-controls': helper.widget._listId
              };
              widgetAttributes = {'aria-owns': helper.widget._popupContentId};
              popupContentAttributes = {id: helper.widget._popupContentId};
              helper.checkAttributes($list, listAttributes, 'list');
              helper.checkAttributes($list.find(("." + SCROLL_VIEW_CONTENT_CLASS)), listItemContainerAttributes, 'scrollview content');
              helper.checkAttributes($field, fieldAttributes, 'field');
              helper.checkAttributes(helper.$widget, widgetAttributes, 'widget');
              helper.checkAttributes(helper.widget._popup.$content(), popupContentAttributes, 'popupContent');
              if ($input.length) {
                var expectedAttributes$__7 = {
                  autocomplete: 'off',
                  type: 'text',
                  spellcheck: 'false',
                  role: 'textbox',
                  'aria-label': 'Search'
                };
                if (this.isMac) {
                  expectedAttributes$__7.placeholder = ' ';
                }
                helper.checkAttributes($input, expectedAttributes$__7, 'input');
              }
            });
            QUnit.test(("Opened: false, searchEnabled: " + searchEnabled), function() {
              helper.createWidget({opened: false});
              var $field = helper.$widget.find(("." + LOOKUP_FIELD_CLASS));
              helper.checkAttributes(helper.$widget, {}, 'widget');
              helper.checkAttributes($field, {
                role: 'combobox',
                'aria-expanded': 'false',
                tabindex: '0'
              }, 'field');
              helper.widget.option('searchEnabled', !searchEnabled);
              helper.checkAttributes(helper.$widget, {}, 'widget');
              helper.checkAttributes($field, {
                role: 'combobox',
                'aria-expanded': 'false',
                tabindex: '0'
              }, 'field');
            });
          });
        });
      }
      QUnit.module('default options', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Check default popupWidth, popupHeight, position.of for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('#qunit-fixture');
          try {
            var lookup = $lookup.dxLookup({dataSource: ['blue', 'orange', 'lime', 'purple']}).dxLookup('instance');
            assert.equal(lookup.option('dropDownOptions.width')(), $lookup.outerWidth(), 'popup width match with lookup field width');
            $(lookup.field()).trigger('dxclick');
            assert.equal(lookup.option('dropDownOptions.height')(), $('.dx-list-item').height() * 4 + 16, 'if 4 items popup height 4 items and 2 paddings (8px)');
            lookup.close();
            lookup.option('dataSource', ['blue', 'orange', 'lime', 'purple', 'red', 'green']);
            $(lookup.field()).trigger('dxclick');
            assert.equal(lookup.option('dropDownOptions.height')(), $('.dx-list-item').height() * 5 + 16, 'if items more 4 popup height is 5 items and 2 paddings (8px)');
            lookup.close();
            lookup.option('searchEnabled', true);
            lookup.option('showCancelButton', true);
            $(lookup.field()).trigger('dxclick');
            assert.equal(lookup.option('dropDownOptions.height')(), $('.dx-lookup-search-wrapper').outerHeight() + $('.dx-list-item').height() * 5 + $('.dx-toolbar').outerHeight() + 16, 'popup height contains 4 list items when there are search and cancel button');
            lookup.close();
            lookup.option('dropDownOptions.width', 200);
            lookup.option('dropDownOptions.height', 300);
            $(lookup.field()).trigger('dxclick');
            assert.equal(lookup.option('dropDownOptions.height'), 300, 'popup height changed if change popupHeight option value');
            assert.equal(lookup.option('dropDownOptions.width'), 200, 'popup width changed if change popupWidth option value');
            lookup.close();
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check popup position if there are invisible items in dataSource for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var materialLookupPadding = 8;
          var $lookup = $('<div>').prependTo('body');
          try {
            var lookup = $lookup.dxLookup({
              dataSource: [{
                'ID': 1,
                'Color': 'black',
                'visible': false
              }, {
                'ID': 2,
                'Color': 'grey',
                'visible': true
              }, {
                'ID': 3,
                'Color': 'green',
                'visible': true
              }, {
                'ID': 4,
                'Color': 'white',
                'visible': true
              }, {
                'ID': 5,
                'Color': 'yellow',
                'visible': true
              }],
              valueExpr: 'ID',
              displayExpr: 'Color'
            }).dxLookup('instance');
            $lookup.css('margin-top', 0);
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, 0, 2, 'popup position if nothing is selected');
            assert.equal(lookup.option('dropDownOptions.height')(), $('.dx-list-item').not('.dx-state-invisible').height() * 4 + materialLookupPadding * 2, 'popup height equal 4 items and 2 paddings (8px)');
            lookup.close();
            $lookup.css('margin-top', 200);
            lookup.option('value', 3);
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').not('.dx-state-invisible').height(), 3, 'popup position if second visible item is selected');
            lookup.close();
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check default popupHeight, position.of for Material theme if there are grouped items', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('body');
          try {
            var lookup = $lookup.dxLookup({
              dataSource: new DataSource({
                store: [{
                  'ID': 1,
                  'Group': 'dark',
                  'Color': 'black'
                }, {
                  'ID': 2,
                  'Group': 'dark',
                  'Color': 'grey'
                }, {
                  'ID': 3,
                  'Group': 'dark',
                  'Color': 'green'
                }, {
                  'ID': 4,
                  'Group': 'light',
                  'Color': 'white'
                }, {
                  'ID': 5,
                  'Group': 'light',
                  'Color': 'yellow'
                }, {
                  'ID': 6,
                  'Group': 'light',
                  'Color': 'rose'
                }, {
                  'ID': 7,
                  'Group': 'light',
                  'Color': 'blue'
                }],
                key: 'ID',
                group: 'Group'
              }),
              grouped: true,
              valueExpr: 'Color',
              displayExpr: 'Color',
              value: 'grey'
            }).dxLookup('instance');
            $lookup.css('margin-top', 200);
            $(lookup.field()).trigger('dxclick');
            assert.roughEqual(lookup.option('dropDownOptions.height')(), $('.dx-list-item').outerHeight() * 3 + $('.dx-list-group-header').outerHeight() * 2 + 8, 2, 'if items more 5 popup height is 5 items and padding 8px');
            lookup.close();
            lookup.option('value', 'white');
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -($popup.find('.dx-overlay-content').height() - $('.dx-list-item').height()) / 2, 2, 'offset of the lookup if fourth item is selected');
            lookup.close();
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check popup position offset for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('body');
          var materialLookupPadding = 8;
          try {
            var lookup = $lookup.dxLookup({
              dataSource: ['blue', 'orange', 'lime', 'purple', 'red', 'green', 'yellow'],
              value: 'blue'
            }).dxLookup('instance');
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -3.5, 1, 'offset of the lookup if first item is selected');
            getList().scrollTo(100);
            lookup.close();
            $(lookup.field()).trigger('dxclick');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -3.5, 1, 'offset of the lookup after scrolling and without item selecting');
            lookup.close();
            $(lookup.field()).trigger('dxclick');
            getList().scrollTo(58);
            $('.dx-list-item').eq(1).trigger('dxclick');
            $(lookup.field()).trigger('dxclick');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - materialLookupPadding, 1, 'offset of the lookup after scrolling and cut-off item selecting');
            assert.roughEqual($('.dx-list-item').eq(1).position().top, getList().scrollTop(), 2, 'position of the selected item after scrolling and cut-off item selecting');
            lookup.close();
            lookup.option('value', 'purple');
            $(lookup.field()).trigger('dxclick');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - materialLookupPadding, 1, 'offset of the lookup if last item is selected');
            lookup.close();
            lookup.option('dataSource', []);
            $(lookup.field()).trigger('dxclick');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, 0, 1, 'offset of the lookup if not selected item');
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check popup height with no found data option for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('body');
          try {
            var lookup = $lookup.dxLookup({
              dataSource: [],
              searchEnabled: true
            }).dxLookup('instance');
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-content');
            assert.roughEqual($popup.height(), 112, 1, 'popup height if DataSource without items and `searchEnabled: true`');
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check when dropDownCentered option for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('body');
          var materialLookupPadding = 8;
          try {
            var lookup = $lookup.dxLookup({
              dataSource: ['blue', 'orange', 'lime', 'purple', 'green', 'red'],
              value: 'orange'
            }).dxLookup('instance');
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - materialLookupPadding, 1, 'popup position if second item is selected and there is not top place');
            lookup.close();
            $lookup.css('margin-top', 100);
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').height(), 2, 'popup position if second item is selected and there is top place');
            lookup.close();
            $lookup.css('margin-top', 200);
            lookup.option('value', 'lime');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').height() * 2, 3, 'third item is centered');
            lookup.close();
            lookup.option('value', 'purple');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').height() * 2 - materialLookupPadding * 2, 3, 'fourth item is centered');
            lookup.close();
            lookup.option('value', 'red');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').height() * 4 - materialLookupPadding * 2, 2, 'popup position if last item is selected and there is place');
            lookup.close();
            $lookup.css('margin-top', 60);
            lookup.option('value', 'lime');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - $('.dx-list-item').height() - materialLookupPadding * 2, 3, 'popup position if there is not place for two items');
            lookup.close();
            lookup.option('value', 'red');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, -2.5 - materialLookupPadding, 1, 'popup position if last item is selected and there is not place');
            lookup.close();
            lookup.option('dropDownCentered', false);
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, $(lookup.field()).outerHeight(), 3, 'popup position if dropDownCentered option is false');
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check when dropDownCentered option is false and change options for Material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          var $lookup = $('<div>').prependTo('body');
          var popupWidth = $(window).width() * 0.8;
          var popupHeight = $(window).height() * 0.8;
          try {
            var lookup = $lookup.dxLookup({
              dataSource: ['blue', 'orange', 'lime', 'purple', 'green'],
              value: 'blue',
              dropDownCentered: false,
              dropDownOptions: {
                position: {
                  at: 'center',
                  my: 'center',
                  of: $(window)
                },
                visualContainer: window,
                width: popupWidth,
                height: popupHeight
              }
            }).dxLookup('instance');
            $lookup.css('margin-top', 0);
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').outerWidth(), popupWidth, 3, 'popup width like generic');
            assert.roughEqual($popup.find('.dx-overlay-content').outerHeight(), popupHeight, 3, 'popup height like generic');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, ($(window).height() - $popup.find('.dx-overlay-content').outerHeight()) / 2, 1, 'popup position of window');
            lookup.close();
            lookup.option('usePopover', true);
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').outerWidth(), popupWidth, 3, 'popup width does not change when usePopover true');
            assert.roughEqual($popup.find('.dx-overlay-content').outerHeight(), popupHeight, 3, 'popup height does not change when usePopover true');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, ($(window).height() - $popup.find('.dx-overlay-content').outerHeight()) / 2, 1, 'popup position does not change when usePopover true');
            lookup.close();
            lookup.option('dropDownOptions.position', 'top');
            $(lookup.field()).trigger('dxclick');
            $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, 0, 1, 'popup position of window after change position more');
            lookup.close();
          } finally {
            $lookup.remove();
            themes.isMaterial = origIsMaterial;
          }
        });
        QUnit.test('Check dropDownCentered option for Generic theme', function(assert) {
          var $lookup = $('<div>').prependTo('body');
          try {
            var lookup = $lookup.dxLookup({
              dataSource: ['blue', 'orange', 'lime', 'purple', 'green'],
              value: 'blue'
            }).dxLookup('instance');
            lookup.option('usePopover', true);
            lookup.option('dropDownCentered', true);
            $(lookup.field()).trigger('dxclick');
            var $popover = $('.dx-popover-wrapper');
            assert.roughEqual($popover.find('.dx-overlay-content').eq(0).position().top, $(lookup.field()).outerHeight() + 8 + 10, 2, 'popover position of lookup field with body padding 8px');
            lookup.close();
            lookup.option('usePopover', false);
            $(lookup.field()).trigger('dxclick');
            var $popup = $('.dx-popup-wrapper');
            assert.roughEqual($popup.find('.dx-overlay-content').position().top, ($(window).height() - $popup.find('.dx-overlay-content').outerHeight()) / 2, 1, 'default popup position of window');
            lookup.close();
          } finally {
            $lookup.remove();
          }
        });
        QUnit.test('changing popupWidth in default options should change popover width', function(assert) {
          var defaultWidth = 100;
          Lookup.defaultOptions({options: {
              usePopover: true,
              dropDownOptions: {
                fullScreen: false,
                width: defaultWidth
              }
            }});
          var $lookup = $('<div>').prependTo('body');
          try {
            $lookup.dxLookup({opened: true});
            var $popoverContent = $('.dx-overlay-content:visible');
            assert.ok(Math.abs(defaultWidth - $popoverContent.width()) <= 2);
          } finally {
            $lookup.remove();
            Lookup.defaultOptions([]);
          }
        });
      });
      QUnit.module('Events', {
        before: function() {
          this.items = $traceurRuntime.spread(new Array(50)).map(function(item, index) {
            return index + 1;
          });
        },
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.element = $('#lookup');
          this.options = {items: this.items};
          this.createLookup = function() {
            this.instance = this.element.dxLookup(this.options).dxLookup('instance');
          };
          this.togglePopup = function() {
            this.instance.open();
            this.$list = $('.dx-list');
            this.list = this.$list.dxList('instance');
          };
          this.triggerScrollEvent = function() {
            this.$list.find('.dx-scrollable-container').trigger('scroll');
          };
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('onScroll, handler attached via option', function(assert) {
          var scrollStub = sinon.stub();
          this.options.onScroll = scrollStub;
          this.createLookup();
          this.togglePopup();
          this.triggerScrollEvent();
          assert.ok(scrollStub.calledOnce, 'onScroll event handled');
        });
        QUnit.test('onScroll, handler attached via "on" method', function(assert) {
          var scrollStub = sinon.stub();
          this.createLookup();
          this.instance.on('scroll', scrollStub);
          this.togglePopup();
          this.triggerScrollEvent();
          assert.ok(scrollStub.calledOnce, 'onScroll event handled');
        });
        QUnit.test('detach "onScroll" event handler', function(assert) {
          var scrollStub = sinon.stub();
          this.createLookup();
          this.instance.on('scroll', scrollStub);
          this.togglePopup();
          this.instance.off('scroll', scrollStub);
          this.triggerScrollEvent();
          assert.ok(scrollStub.notCalled, 'onScroll event handler detached');
        });
        QUnit.test('onPageLoading handler should be passed to the list', function(assert) {
          assert.expect(1);
          var data = [1, 2, 3];
          $('#lookup').dxLookup({
            deferRendering: false,
            dataSource: {
              store: data,
              paginate: true,
              pageSize: 40
            },
            onPageLoading: function(e) {
              assert.ok(true, 'onPageLoading is fired');
            }
          });
          getList().option('onPageLoading')();
        });
        QUnit.test('onPageLoading handler should be passed to the list - subscription by "on" method', function(assert) {
          assert.expect(1);
          var data = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            deferRendering: false,
            dataSource: {
              store: data,
              paginate: true,
              pageSize: 40
            }
          }).dxLookup('instance');
          instance.on('pageLoading', function(e) {
            assert.ok(true, 'onPageLoading is fired');
          });
          getList().option('onPageLoading')();
        });
        QUnit.test('onPullRefresh handler should be passed to the list', function(assert) {
          assert.expect(1);
          var data = [1, 2, 3];
          $('#lookup').dxLookup({
            deferRendering: false,
            dataSource: {
              store: data,
              paginate: true,
              pageSize: 1
            },
            onPullRefresh: function(e) {
              assert.ok(true, 'onPullRefresh is fired');
            }
          });
          getList().option('onPullRefresh')();
        });
        QUnit.test('onPullRefresh handler should be passed to the list - subscription by "on" method', function(assert) {
          assert.expect(1);
          var data = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            deferRendering: false,
            dataSource: {
              store: data,
              paginate: true,
              pageSize: 1
            },
            pullRefreshEnabled: true
          }).dxLookup('instance');
          instance.on('pullRefresh', function(e) {
            assert.ok(true, 'onPullRefresh is fired');
          });
          getList().option('onPullRefresh')();
        });
        QUnit.test('change "onScroll" handler runtime', function(assert) {
          var initialScrollStub = sinon.stub();
          var newScrollStub = sinon.stub();
          this.options.onScroll = initialScrollStub;
          this.createLookup();
          this.togglePopup();
          this.instance.option('onScroll', newScrollStub);
          this.triggerScrollEvent();
          assert.ok(initialScrollStub.notCalled, 'initial handled does not invoked');
          assert.ok(newScrollStub.calledOnce, 'onScroll event handled');
        });
      });
      QUnit.module('onContentReady', {
        beforeEach: function() {
          fx.off = true;
          executeAsyncMock.setup();
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('Basic contentReady usage - subscription by "on" method', function(assert) {
          var contentReadyHandler = sinon.spy();
          var load = $.Deferred();
          var items = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            dataSource: {load: function() {
                return load.promise();
              }},
            deferRendering: true,
            searchTimeout: 0,
            'dropDownOptions.animation': {},
            cleanSearchOnOpening: false
          }).dxLookup('instance');
          instance.on('contentReady', contentReadyHandler);
          instance.open();
          assert.ok(contentReadyHandler.calledOnce, 'onContentReady is fired after list rendering');
          load.resolve(items);
          assert.strictEqual(contentReadyHandler.callCount, 2, 'onContentReady is fired after dataSource load');
          instance.close();
          instance.open();
          assert.strictEqual(contentReadyHandler.callCount, 2, 'onContentReady is not fired after second popup showing');
          instance._searchBox.option('value', '2');
          assert.strictEqual(contentReadyHandler.callCount, 3, 'onContentReady is fired after search');
          instance.close();
          assert.strictEqual(contentReadyHandler.callCount, 3, 'onContentReady is not fired after popup with search results hiding');
          instance.open();
          assert.strictEqual(contentReadyHandler.callCount, 3, 'onContentReady is not fired after popup with search results showing');
        });
        QUnit.skip('onContentReady should be fired after input rendering when deferRendering=true', function(assert) {
          assert.expect(2);
          $('#lookup').dxLookup({
            onContentReady: function(e) {
              assert.ok(true, 'contentReady is fired after input rendering');
              assert.strictEqual(e.component._$field.get(0), $('.dx-lookup-field').get(0), 'input is rendered');
            },
            deferRendering: true
          });
        });
        QUnit.test('onContentReady should be fired after list rendering when deferRendering=true', function(assert) {
          assert.expect(2);
          var instance = $('#lookup').dxLookup({deferRendering: true}).dxLookup('instance');
          instance.option('onContentReady', function() {
            assert.ok(true, 'contentReady is fired after list rendering');
            assert.strictEqual(instance._list.NAME, 'dxList', 'list is rendered');
          });
          instance.open();
        });
        QUnit.test('onContentReady should be fired after input and list rendering when deferRendering=false', function(assert) {
          assert.expect(3);
          $('#lookup').dxLookup({
            onContentReady: function(e) {
              assert.ok(true, 'contentReady is fired');
              assert.strictEqual(e.component._$field.get(0), $('.dx-lookup-field').get(0), 'input is rendered');
              assert.ok(e.component._$list, 'list is rendered');
            },
            deferRendering: false
          });
        });
        QUnit.test('onContentReady should be fired after new items loading', function(assert) {
          assert.expect(2);
          var load = $.Deferred();
          var items = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            dataSource: {load: function() {
                return load.promise();
              }},
            deferRendering: false
          }).dxLookup('instance');
          instance.option('onContentReady', function(e) {
            assert.ok(true, 'contentReady is fired');
            assert.strictEqual(instance._list.option('items').length, 3, 'items is loaded');
          });
          load.resolve(items);
        });
        QUnit.test('onContentReady should be fired after items filtering', function(assert) {
          assert.expect(2);
          var items = [1, 2, 3];
          var instance = $('#lookup').dxLookup({
            dataSource: items,
            deferRendering: false,
            searchTimeout: 0,
            'dropDownOptions.animation': {},
            cleanSearchOnOpening: false
          }).dxLookup('instance');
          instance.option('onContentReady', function(e) {
            assert.ok(true, 'contentReady is fired');
            var items = instance._list.$element().find('.dx-list-item');
            assert.strictEqual(items.length, 1, 'items are filtered');
          });
          instance._searchBox.option('value', '2');
        });
      });
      QUnit.module('valueChanged handler should receive correct event', {
        beforeEach: function() {
          var $__3 = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          this.valueChangedHandler = sinon.stub();
          var initialOptions = {
            items: [1, 2, 3],
            opened: true,
            onValueChanged: this.valueChangedHandler,
            searchTimeout: 0,
            focusStateEnabled: true
          };
          this.init = function(options) {
            $__3.$element = $('#lookup').dxLookup(options);
            $__3.instance = $__3.$element.dxLookup('instance');
            $__3.$input = $($__3.instance.content()).find(("." + TEXTEDITOR_INPUT_CLASS));
            $__3.keyboard = keyboardMock($__3.$input);
            $__3.$listItems = $($__3.instance.content()).find(("." + LIST_ITEM_CLASS));
            $__3.$firstItem = $__3.$listItems.eq(0);
          };
          this.testProgramChange = function(assert) {
            $__3.instance.option('value', 3);
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
        [true, false].forEach(function(usePopover) {
          QUnit.module(("when usePopover=" + usePopover), {beforeEach: function() {
              this.reinit({usePopover: usePopover});
            }}, function() {
            QUnit.test('on runtime change', function(assert) {
              this.testProgramChange(assert);
            });
            QUnit.test('on click on item', function(assert) {
              this.$firstItem.trigger('dxclick');
              this.checkEvent(assert, 'dxclick', this.$firstItem);
              this.testProgramChange(assert);
            });
            ['enter', 'space'].forEach(function(key) {
              QUnit.testInActiveWindow(("on item selecting using " + key), function(assert) {
                this.$input.trigger('focusin');
                this.keyboard.press('down').press(key);
                this.checkEvent(assert, 'keydown', this.$firstItem, key);
                this.testProgramChange(assert);
              });
            });
            QUnit.test('on click on clear button', function(assert) {
              this.reinit({
                showClearButton: true,
                value: 1
              });
              var $clearButton = $(this.instance.content()).parent().find((".dx-button." + CLEAR_BUTTON_CLASS));
              $clearButton.trigger('dxclick');
              this.checkEvent(assert, 'dxclick', $clearButton);
              this.testProgramChange(assert);
            });
            QUnit.test('on click on apply button if applyValueMode=useButtons', function(assert) {
              this.reinit({applyValueMode: 'useButtons'});
              var $applyButton = $(this.instance.content()).parent().find((".dx-button." + APPLY_BUTTON_CLASS));
              this.$firstItem.trigger('dxclick');
              $applyButton.trigger('dxclick');
              this.checkEvent(assert, 'dxclick', $applyButton);
              this.testProgramChange(assert);
            });
          });
        });
      });
      QUnit.module('searchStartEvent', {beforeEach: function() {
          var $__3 = this;
          this.$lookup = $('#lookup');
          var defaultOptions = {
            items: ['1', '11', '111'],
            opened: true,
            searchTimeout: 0
          };
          var init = function() {
            var options = arguments[0] !== (void 0) ? arguments[0] : {};
            $__3.lookup = $__3.$lookup.dxLookup($.extend({}, defaultOptions, options)).dxLookup('instance');
            $__3.getItemsCount = function() {
              return getList().option('items').length;
            };
            var $input = $($__3.lookup.content()).find(("." + TEXTEDITOR_INPUT_CLASS));
            $__3.keyboard = keyboardMock($input);
          };
          this.reinit = function(options) {
            $__3.lookup.dispose();
            init(options);
          };
          init();
        }}, function() {
        ['valueChangeEvent', 'searchStartEvent'].forEach(function(propName) {
          QUnit.test((propName + " specifies event to start search"), function(assert) {
            var $__4;
            this.reinit(($__4 = {}, Object.defineProperty($__4, propName, {
              value: 'change',
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            this.keyboard.type('11');
            assert.strictEqual(this.getItemsCount(), 3, 'items are not filtered');
            this.keyboard.change();
            assert.strictEqual(this.getItemsCount(), 2, 'items are filtered after search start event is fired');
          });
          QUnit.test((propName + " specifies event to start search (runtime change)"), function(assert) {
            this.lookup.option(propName, 'change');
            this.keyboard.type('11');
            assert.strictEqual(this.getItemsCount(), 3, 'items are not filtered');
            this.keyboard.change();
            assert.strictEqual(this.getItemsCount(), 2, 'items are filtered after search start event is fired');
          });
        });
        QUnit.test('valueChangeEvent prop using should raise a warning about deprecation', function(assert) {
          sinon.spy(errors, 'log');
          try {
            this.lookup.option('valueChangeEvent', 'change');
            assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxLookup', 'valueChangeEvent', '22.1', 'Use the \'searchStartEvent\' option instead'], 'warning is raised with correct parameters');
          } finally {
            errors.log.restore();
          }
        });
        QUnit.test('no warning should be logged on pure init', function(assert) {
          sinon.spy(errors, 'log');
          try {
            this.reinit();
            assert.deepEqual(errors.log.callCount, 0, 'no warning is logged');
          } finally {
            errors.log.restore();
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","core/devices","core/element_data","core/config","core/utils/browser","core/errors","core/utils/type","core/utils/shadow_dom","events/utils","data/array_store","data/custom_store","data/query","data/data_source/data_source","ui/themes","ui/lookup","ui/popup/ui.popup","ui/popup/ui.popup.full","ui/list","ui/popover/ui.popover","ui/popover/ui.popover.full","core/utils/size","../../helpers/executeAsyncMock.js","../../helpers/pointerMock.js","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","ui/text_box/ui.text_editor.label.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("core/devices"), require("core/element_data"), require("core/config"), require("core/utils/browser"), require("core/errors"), require("core/utils/type"), require("core/utils/shadow_dom"), require("events/utils"), require("data/array_store"), require("data/custom_store"), require("data/query"), require("data/data_source/data_source"), require("ui/themes"), require("ui/lookup"), require("ui/popup/ui.popup"), require("ui/popup/ui.popup.full"), require("ui/list"), require("ui/popover/ui.popover"), require("ui/popover/ui.popover.full"), require("core/utils/size"), require("../../helpers/executeAsyncMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/keyboardMock.js"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("ui/text_box/ui.text_editor.label.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=lookup.tests.js.map