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

(["testing/tests/DevExpress.ui.widgets.form/form.tests.js"], ["core/utils/size","core/devices","core/config","core/dom_adapter","core/utils/resize_callbacks","core/utils/type","core/utils/extend","events/visibility_change","ui/form/ui.form.layout_manager.utils","generic_light.css!","jquery","ui/autocomplete","ui/calendar","ui/date_box","ui/drop_down_box","core/utils/window","ui/form/ui.form.js","ui/text_box/ui.text_editor.base.js","ui/form/components/label.js","ui/form/constants","ui/form/components/label","ui/toolbar/constants","ui/html_editor","../../helpers/ignoreQuillTimers.js","ui/lookup","ui/radio_group","ui/tag_box","ui/toolbar","ui/text_area","ui/themes","../../helpers/registerKeyHandlerTestHelper.js","../../helpers/responsiveBoxScreenMock.js","core/utils/type.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/form.tests.js", ["core/utils/size", "core/devices", "core/config", "core/dom_adapter", "core/utils/resize_callbacks", "core/utils/type", "core/utils/extend", "events/visibility_change", "ui/form/ui.form.layout_manager.utils", "generic_light.css!", "jquery", "ui/autocomplete", "ui/calendar", "ui/date_box", "ui/drop_down_box", "core/utils/window", "ui/form/ui.form.js", "ui/text_box/ui.text_editor.base.js", "ui/form/components/label.js", "ui/form/constants", "ui/form/components/label", "ui/toolbar/constants", "ui/html_editor", "../../helpers/ignoreQuillTimers.js", "ui/lookup", "ui/radio_group", "ui/tag_box", "ui/toolbar", "ui/text_area", "ui/themes", "../../helpers/registerKeyHandlerTestHelper.js", "../../helpers/responsiveBoxScreenMock.js", "core/utils/type.js"], function($__export) {
  "use strict";
  var getWidth,
      getHeight,
      device,
      config,
      domAdapter,
      resizeCallbacks,
      typeUtils,
      extend,
      visibilityEventsModule,
      EDITORS_WITHOUT_LABELS,
      $,
      windowModule,
      Form,
      TextEditorBase,
      renderLabel,
      FIELD_ITEM_CLASS,
      FORM_GROUP_CLASS,
      FORM_LAYOUT_MANAGER_CLASS,
      FIELD_ITEM_LABEL_CONTENT_CLASS,
      FORM_FIELD_ITEM_COL_CLASS,
      FIELD_ITEM_CONTENT_CLASS,
      FIELD_ITEM_LABEL_CLASS,
      FORM_GROUP_CAPTION_CLASS,
      FORM_UNDERLINED_CLASS,
      FORM_VALIDATION_SUMMARY,
      GET_LABEL_WIDTH_BY_TEXT_CLASS,
      FIELD_ITEM_OPTIONAL_MARK_CLASS,
      FIELD_ITEM_REQUIRED_MARK_CLASS,
      FIELD_ITEM_LABEL_TEXT_CLASS,
      EDITOR_LABEL_CLASS,
      FIELD_ITEM_HELP_TEXT_CLASS,
      TOOLBAR_CLASS,
      themes,
      registerKeyHandlerTestHelper,
      responsiveBoxScreenMock,
      isDefined,
      INVALID_CLASS,
      FORM_GROUP_CONTENT_CLASS,
      MULTIVIEW_ITEM_CONTENT_CLASS,
      LAST_COL_CLASS,
      formatTestValue;
  function getLabelWidth(container, form, text) {
    var $label = renderLabel({
      text: text,
      location: 'left'
    }).appendTo(container);
    var width = getWidth($label.children().first());
    $label.remove();
    return width;
  }
  function findLabelTextsInColumn($container, columnIndex) {
    return $container.find('.' + FORM_FIELD_ITEM_COL_CLASS + columnIndex + ' .' + FIELD_ITEM_LABEL_CONTENT_CLASS);
  }
  function triggerKeyUp($element, key) {
    var e = $.Event('keyup');
    e.key = key;
    $($element.find('input').first()).trigger(e);
  }
  function getColsCountFromDOM($form) {
    var result = -1;
    var $lastCol = $form.find(("." + LAST_COL_CLASS));
    [1, 2, 3, 4].forEach(function(colCount) {
      $lastCol.each(function(_, $item) {
        if ($($item).hasClass(("dx-col-" + (colCount - 1)))) {
          result = colCount;
        }
      });
    });
    return result;
  }
  return {
    setters: [function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
    }, function($__m) {
      device = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      visibilityEventsModule = $__m.default;
    }, function($__m) {
      EDITORS_WITHOUT_LABELS = $__m.EDITORS_WITHOUT_LABELS;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      windowModule = $__m.default;
    }, function($__m) {
      Form = $__m.default;
    }, function($__m) {
      TextEditorBase = $__m.default;
    }, function($__m) {
      renderLabel = $__m.renderLabel;
    }, function($__m) {
      FIELD_ITEM_CLASS = $__m.FIELD_ITEM_CLASS;
      FORM_GROUP_CLASS = $__m.FORM_GROUP_CLASS;
      FORM_LAYOUT_MANAGER_CLASS = $__m.FORM_LAYOUT_MANAGER_CLASS;
      FIELD_ITEM_LABEL_CONTENT_CLASS = $__m.FIELD_ITEM_LABEL_CONTENT_CLASS;
      FORM_FIELD_ITEM_COL_CLASS = $__m.FORM_FIELD_ITEM_COL_CLASS;
      FIELD_ITEM_CONTENT_CLASS = $__m.FIELD_ITEM_CONTENT_CLASS;
      FIELD_ITEM_LABEL_CLASS = $__m.FIELD_ITEM_LABEL_CLASS;
      FORM_GROUP_CAPTION_CLASS = $__m.FORM_GROUP_CAPTION_CLASS;
      FORM_UNDERLINED_CLASS = $__m.FORM_UNDERLINED_CLASS;
      FORM_VALIDATION_SUMMARY = $__m.FORM_VALIDATION_SUMMARY;
    }, function($__m) {
      GET_LABEL_WIDTH_BY_TEXT_CLASS = $__m.GET_LABEL_WIDTH_BY_TEXT_CLASS;
      FIELD_ITEM_OPTIONAL_MARK_CLASS = $__m.FIELD_ITEM_OPTIONAL_MARK_CLASS;
      FIELD_ITEM_REQUIRED_MARK_CLASS = $__m.FIELD_ITEM_REQUIRED_MARK_CLASS;
      FIELD_ITEM_LABEL_TEXT_CLASS = $__m.FIELD_ITEM_LABEL_TEXT_CLASS;
    }, function($__m) {
      TOOLBAR_CLASS = $__m.TOOLBAR_CLASS;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      registerKeyHandlerTestHelper = $__m.default;
    }, function($__m) {
      responsiveBoxScreenMock = $__m.default;
    }, function($__m) {
      isDefined = $__m.isDefined;
    }],
    execute: function() {
      EDITOR_LABEL_CLASS = 'dx-texteditor-label';
      FIELD_ITEM_HELP_TEXT_CLASS = 'dx-field-item-help-text';
      INVALID_CLASS = 'dx-invalid';
      FORM_GROUP_CONTENT_CLASS = 'dx-form-group-content';
      MULTIVIEW_ITEM_CONTENT_CLASS = 'dx-multiview-item-content';
      LAST_COL_CLASS = 'dx-last-col';
      QUnit.testStart(function() {
        var markup = '<div id="form"></div>\
        <div id="form2"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Form');
      if (device.current().deviceType === 'desktop') {
        var items = [{
          dataField: 'name',
          editorType: 'dxTextBox'
        }, {
          dataField: 'age',
          editorType: 'dxNumberBox'
        }];
        items.forEach(function(item) {
          registerKeyHandlerTestHelper.runTests({
            createWidget: function($element) {
              return $element.dxForm({items: items}).dxForm('instance');
            },
            keyPressTargetElement: function(widget) {
              return widget.getEditor(item.dataField).$element().find('.dx-texteditor-input');
            },
            checkInitialize: false,
            testNamePrefix: ("Form -> " + item.editorType + ":")
          });
        });
      }
      QUnit.testInActiveWindow('Form\'s inputs saves value on refresh', function(assert) {
        var screen = 'md';
        var $formContainer = $('#form').dxForm({
          screenByWidth: function() {
            return screen;
          },
          colCountByScreen: {
            sm: 1,
            md: 2
          },
          items: [{
            dataField: 'name',
            editorType: 'dxTextBox'
          }]
        });
        $('#form input').first().focus().val('test');
        screen = 'sm';
        resizeCallbacks.fire();
        var formData = $formContainer.dxForm('instance').option('formData');
        assert.deepEqual(formData, {name: 'test'}, 'value updates');
      });
      QUnit.test('Check field width on render form with colspan', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          formData: {
            ID: 0,
            FirstName: 'John',
            LastName: 'Dow',
            HireDate: '01/01/1970'
          },
          colCount: 2,
          colCountByScreen: {xs: 2},
          items: [{
            itemType: 'group',
            caption: 'Employee',
            colCount: 2,
            items: [{
              dataField: 'ID',
              colSpan: 2
            }, {
              dataField: 'FirstName',
              visible: true
            }, {
              dataField: 'LastName',
              visible: true
            }, {
              dataField: 'HireDate',
              colSpan: 2,
              visible: true
            }]
          }]
        });
        var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
        var fieldWidths = {
          ID: getWidth($fieldItems.eq(1)),
          FirstName: getWidth($fieldItems.eq(2)),
          LastName: getWidth($fieldItems.eq(3)),
          HireDate: getWidth($fieldItems.eq(4))
        };
        assert.equal($fieldItems.length, 5, '4 simple items + 1 group item');
        assert.equal(fieldWidths.ID, fieldWidths.HireDate, 'fields with colspan 2 have the same width');
        assert.equal(fieldWidths.FirstName, fieldWidths.LastName, 'fields without colspan have the same width');
        assert.ok(fieldWidths.ID > fieldWidths.FirstName, 'field with colspan 2 is wider than field without colspan');
      });
      QUnit.test('Change of the formData field change value of the editor', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({formData: {FamousPirate: 'John Morgan'}});
        var formInstance = $testContainer.dxForm('instance');
        formInstance.option('formData.FamousPirate', 'Cpt. Jack Sparrow');
        assert.equal(formInstance.getEditor('FamousPirate').option('value'), 'Cpt. Jack Sparrow', 'Correct value');
      });
      QUnit.test('Change editor value after formOption is changed and items is defined', function(assert) {
        var $testContainer = $('#form');
        var form = $testContainer.dxForm({
          formData: {
            pirateName: 'Blackbeard',
            type: 'captain',
            isSought: true
          },
          items: ['pirateName', 'type', 'isSought']
        }).dxForm('instance');
        form.option('formData', {
          pirateName: 'John Morgan',
          type: 'captain',
          isSought: true
        });
        form.getEditor('isSought').option('value', false);
        assert.deepEqual(form.option('formData'), {
          pirateName: 'John Morgan',
          type: 'captain',
          isSought: false
        }, 'FormData is up to date');
      });
      QUnit.test('Reset editor value after formData changing only if dataField is defined', function(assert) {
        var $testContainer = $('#form');
        var form = $testContainer.dxForm({
          formData: {
            pirateName: 'Blackbeard',
            type: 'captain',
            isSought: 'Test',
            gender: 'Male'
          },
          items: [{dataField: 'gender'}, {dataField: 'pirateName'}, {dataField: 'type'}, {
            name: 'isSought',
            editorType: 'dxTextBox'
          }]
        }).dxForm('instance');
        form.getEditor('isSought').option('value', 'Changed');
        form.getEditor('gender').option('value', 'Female');
        form.option('formData', {
          pirateName: 'John Morgan',
          type: 'captain'
        });
        assert.equal(form.getEditor('isSought').option('value'), 'Changed', '\'isSought\' editor wasn\'t reseted');
        assert.equal(form.getEditor('gender').option('value'), '', '\'gender\' editor was reseted');
      });
      QUnit.test('Invalid field name when item is defined not as string and not as object', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: 'Batman',
            lastName: 'Klark'
          },
          items: [1, 'lastName']
        }).dxForm('instance');
        assert.equal(form.$element().find('.' + FIELD_ITEM_CLASS).length, 1, 'items count');
        assert.equal(form.getEditor('name'), undefined, 'editor by name field');
        assert.equal(form.getEditor('lastName').option('value'), 'Klark', 'editor by lastName field');
      });
      QUnit.test('Reset editor\'s value when the formData option is empty object', function(assert) {
        var values = [];
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            room: 1
          },
          items: ['name', 'lastName', 'sex', 'room', 'isDeveloper'],
          onFieldDataChanged: function(e) {
            values.push({
              dataField: e.dataField,
              value: e.value
            });
          }
        }).dxForm('instance');
        form.option('formData', {});
        assert.equal(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.equal(form.getEditor('room').option('value'), null, 'editor for the room dataField');
        assert.deepEqual(values[0], {
          dataField: 'name',
          value: ''
        }, 'value of name dataField');
        assert.deepEqual(values[1], {
          dataField: 'room',
          value: null
        }, 'value of room dataField');
        values = [];
        form.option('formData', {});
        assert.equal(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.equal(form.getEditor('room').option('value'), null, 'editor for the room dataField');
        assert.equal(values.length, 0, 'onFieldDataChanged event is not called if the empty object is set to formData a second time');
      });
      QUnit.test('Reset editor\'s value when the formData option is null', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            room: 1
          },
          items: ['name', 'room']
        }).dxForm('instance');
        form.option('formData', null);
        assert.equal(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.equal(form.getEditor('room').option('value'), null, 'editor for the room dataField');
      });
      QUnit.test('Reset editor\'s value when the formData option is undefined', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            room: 1
          },
          items: ['name', 'room']
        }).dxForm('instance');
        form.option('formData', undefined);
        assert.equal(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.equal(form.getEditor('room').option('value'), null, 'editor for the room dataField');
      });
      QUnit.test('Reset editor\'s value with validation', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            lastName: 'John'
          },
          items: ['name', {
            dataField: 'lastName',
            isRequired: true
          }]
        }).dxForm('instance');
        form.option('formData', undefined);
        assert.equal(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.equal(form.getEditor('lastName').option('value'), '', 'editor for the lastName dataField');
        assert.ok(!form.getEditor('lastName').$element().hasClass(INVALID_CLASS), 'not invalid css class');
        assert.ok(form.getEditor('lastName').option('isValid'), 'isValid');
      });
      QUnit.test('The \'dataField\' option of a simple item should affect the editorOptions.name option', function(assert) {
        var form = $('#form').dxForm({
          formData: {firstName: 'Mike'},
          items: [{dataField: 'firstName'}]
        }).dxForm('instance');
        assert.equal(form.getEditor('firstName').option('name'), 'firstName', 'Editor name is OK');
      });
      QUnit.test('The \'dataField\' option of a simple item should not affect existing editorOptions.name option', function(assert) {
        var form = $('#form').dxForm({
          formData: {firstName: 'Mike'},
          items: [{
            dataField: 'firstName',
            editorOptions: {name: 'UserName'}
          }]
        }).dxForm('instance');
        assert.equal(form.getEditor('firstName').option('name'), 'UserName', 'Editor name is OK');
      });
      QUnit.test('Don\'t refresh form when visibility changed to \'true\'', function(assert) {
        var $testContainer = $('#form');
        var expectedRefreshCount = 0;
        var form = $testContainer.dxForm({
          formData: {name: 'TestName'},
          items: [{dataField: 'name'}]
        }).dxForm('instance');
        var refreshStub = sinon.stub(form, '_refresh');
        visibilityEventsModule.triggerHidingEvent($testContainer);
        visibilityEventsModule.triggerShownEvent($testContainer);
        assert.equal(refreshStub.callCount, expectedRefreshCount, 'Don\'t refresh on visibility changed to \'true\'');
        refreshStub.restore();
      });
      QUnit.test('Hide helper text when validation message shows for material theme', function(assert) {
        var origIsMaterial = themes.isMaterial;
        themes.isMaterial = function() {
          return true;
        };
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            lastName: ''
          },
          items: [{
            dataField: 'name',
            helpText: 'First name field'
          }, {
            dataField: 'lastName',
            isRequired: true,
            helpText: 'Last name field'
          }]
        }).dxForm('instance');
        var lastName = form.getEditor('lastName');
        var firstName = form.getEditor('name');
        var isFieldWrapperInvalid = function(editor) {
          return editor.$element().parents('.dx-field-item-content-wrapper').hasClass(INVALID_CLASS);
        };
        lastName.focus();
        form.validate();
        triggerKeyUp(lastName.$element(), 'Enter');
        assert.ok(isFieldWrapperInvalid(lastName), 'invalid css class');
        firstName.focus();
        lastName.focus();
        assert.ok(isFieldWrapperInvalid(lastName), 'invalid css class');
        firstName.focus();
        assert.ok(!isFieldWrapperInvalid(lastName), 'not invalid css class');
        assert.ok(!isFieldWrapperInvalid(firstName), 'not invalid css class');
        themes.isMaterial = origIsMaterial;
      });
      QUnit.test('The formData is updated correctly when formData has \'undefined\' value', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: undefined,
          items: [{dataField: 'City'}]
        });
        var form = $testContainer.dxForm('instance');
        var editor = form.getEditor('City');
        editor.option('value', 'New York');
        var formData = form.option('formData');
        assert.deepEqual(formData, {City: 'New York'}, 'updated formData');
        assert.equal($testContainer.find('.dx-field-item').length, 1, 'form item is rendered');
      });
      QUnit.test('The formData with composite object is updated correctly when formData has \'undefined\' value', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: undefined,
          items: [{dataField: 'Employee.City'}]
        });
        var form = $testContainer.dxForm('instance');
        var editor = form.getEditor('Employee.City');
        editor.option('value', 'New York');
        var formData = form.option('formData');
        assert.deepEqual(formData, {Employee: {City: 'New York'}}, 'formData is updated');
        assert.equal($testContainer.find('.dx-field-item').length, 1, 'form item is rendered');
      });
      QUnit.test('From renders the right types of editors by default', function(assert) {
        var $testContainer = $('#form').dxForm({formData: {
            id: 1,
            name: 'Name'
          }});
        assert.ok($testContainer.find('.dx-field-item .dx-numberbox').hasClass('dx-editor-outlined'), 'right class rendered');
        assert.ok($testContainer.find('.dx-field-item .dx-textbox').hasClass('dx-editor-outlined'), 'right class rendered');
      });
      QUnit.test('From renders the right types of editors according to stylingMode option', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {
            id: 1,
            name: 'Name'
          },
          stylingMode: 'underlined'
        });
        assert.ok($testContainer.find('.dx-field-item .dx-numberbox').hasClass('dx-editor-underlined'), 'right class rendered');
        assert.ok($testContainer.find('.dx-field-item .dx-textbox').hasClass('dx-editor-underlined'), 'right class rendered');
      });
      QUnit.test('From renders editors with the right label, labelMode', function(assert) {
        ['outside', 'hidden', 'static', 'floating'].forEach(function(labelMode) {
          var form = $('#form').dxForm({
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }],
            labelMode: labelMode
          }).dxForm('instance');
          var renderedWidget = $('#form').find('.dx-field-item .dx-textbox').dxTextBox('instance');
          var widgetLabelMode = renderedWidget.option('labelMode');
          var widgetLabelText = renderedWidget.option('label');
          assert.equal(widgetLabelMode, labelMode === 'outside' ? 'hidden' : labelMode);
          assert.equal(widgetLabelText, 'Name');
          form.dispose();
        });
      });
      [true, false].forEach(function(showColon) {
        [undefined, true, false].forEach(function(isLabelVisible) {
          ['outside', 'floating', 'hidden', 'static'].forEach(function(formLabelMode) {
            ['dxAutocomplete', 'dxCalendar', 'dxCheckBox', 'dxColorBox', 'dxDateBox', 'dxDropDownBox', 'dxHtmlEditor', 'dxLookup', 'dxNumberBox', 'dxRadioGroup', 'dxRangeSlider', 'dxSelectBox', 'dxSlider', 'dxSwitch', 'dxTagBox', 'dxTextArea', 'dxTextBox'].forEach(function(editorType) {
              QUnit.test(("label rendering, form.labelMode=" + formLabelMode + ",label.visible=" + isLabelVisible + ",editorType=" + editorType + ",label.showColon=" + showColon), function(assert) {
                var $form = $('#form').dxForm({
                  labelMode: formLabelMode,
                  items: [{
                    dataField: 'item1',
                    editorType: editorType,
                    label: {
                      visible: isLabelVisible,
                      showColon: showColon
                    }
                  }]
                });
                var $label = $form.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
                var needRenderLabel = isLabelVisible;
                if (needRenderLabel === undefined) {
                  if (EDITORS_WITHOUT_LABELS.indexOf(editorType) !== -1 && formLabelMode !== 'hidden') {
                    needRenderLabel = true;
                  } else if (formLabelMode === 'outside') {
                    needRenderLabel = true;
                  }
                }
                assert.equal($label.length, needRenderLabel ? 1 : 0, 'label is rendered correctly');
                assert.equal($label.text(), needRenderLabel ? ("Item 1" + (showColon ? ':' : '')) : '');
              });
            });
          });
        });
      });
      ['outside', 'floating', 'hidden', 'static'].forEach(function(formLabelMode) {
        [undefined, 'floating', 'hidden', 'static'].forEach(function(editorLabelMode) {
          QUnit.test(("check editor labelMode, form.labelMode=" + formLabelMode + ",editorOptions.labelMode=" + editorLabelMode), function(assert) {
            var form = $('#form').dxForm({
              labelMode: formLabelMode,
              items: [{
                dataField: 'item1',
                editorType: 'dxTextBox',
                editorOptions: {labelMode: editorLabelMode}
              }]
            }).dxForm('instance');
            var editor = form.getEditor('item1');
            var expectedEditorLabelMode = editorLabelMode;
            if (expectedEditorLabelMode === undefined) {
              expectedEditorLabelMode = formLabelMode === 'outside' ? 'hidden' : formLabelMode;
            }
            assert.equal(editor.option('labelMode'), expectedEditorLabelMode, 'editor.labelMode is correct');
          });
        });
      });
      [true, false].forEach(function(showOptionalMark) {
        [true, false].forEach(function(isLabelVisible) {
          [true, false].forEach(function(showColon) {
            ['outside', 'floating', 'hidden', 'static'].forEach(function(formLabelMode) {
              [undefined, 'floating', 'hidden', 'static'].forEach(function(editorLabelMode) {
                [undefined, '', 'some help text'].forEach(function(helpText) {
                  [null, function() {
                    return $('<div>').text('Custom text');
                  }].forEach(function(labelTemplate) {
                    QUnit.test(("form renders with right optional mark, config=" + JSON.stringify({
                      showOptionalMark: showOptionalMark,
                      isLabelVisible: isLabelVisible,
                      formLabelMode: formLabelMode,
                      editorLabelMode: editorLabelMode,
                      helpText: helpText,
                      showColon: showColon,
                      labelTemplate: labelTemplate
                    })), function(assert) {
                      var $form = $('#form').dxForm({
                        showOptionalMark: showOptionalMark,
                        labelMode: formLabelMode,
                        items: [{
                          dataField: 'item1',
                          label: {
                            visible: isLabelVisible,
                            showColon: showColon,
                            template: labelTemplate
                          },
                          editorOptions: {labelMode: editorLabelMode},
                          helpText: helpText
                        }]
                      });
                      var $formLabel = $form.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
                      var $editorLabel = $form.find(("." + EDITOR_LABEL_CLASS));
                      var $helpText = $form.find(("." + FIELD_ITEM_HELP_TEXT_CLASS));
                      var optionalMarkIsRenderedAsHelpText = $helpText.text().indexOf('optional') !== -1;
                      var optionalMarkIsRenderedAsFormLabel = $formLabel.text().indexOf('optional') !== -1;
                      var optionalMarkIsRenderedAsEditorLabel = $editorLabel.text().indexOf('optional') !== -1;
                      var labelText = labelTemplate ? 'Custom text' : 'Item 1';
                      var editorLabelText = 'Item 1';
                      var expectedFormLabelText = isLabelVisible ? ("" + labelText + (showColon && !labelTemplate ? ':' : '') + (optionalMarkIsRenderedAsFormLabel ? (String.fromCharCode(160) + "optional") : '')) : '';
                      assert.equal($formLabel.text(), expectedFormLabelText, 'form.labelText');
                      var resultLabelMode = editorLabelMode || formLabelMode;
                      var needRenderEditorLabel = resultLabelMode !== 'outside' && resultLabelMode !== 'hidden';
                      assert.equal($editorLabel.text(), needRenderEditorLabel ? editorLabelText : '', 'editor.labelText');
                      assert.equal(optionalMarkIsRenderedAsEditorLabel, false, 'optional mark in editor is not rendered');
                      if (showOptionalMark === false) {
                        assert.equal(optionalMarkIsRenderedAsHelpText, false, 'optional mark in help text is not rendered');
                        assert.equal(optionalMarkIsRenderedAsFormLabel, false, 'optional mark in form label is not rendered');
                      } else if (isLabelVisible) {
                        assert.equal(optionalMarkIsRenderedAsFormLabel, true, 'optional mark in form label is rendered if label is visible');
                        assert.equal(optionalMarkIsRenderedAsHelpText, false, 'optional mark in help text is not rendered if label is visible');
                      } else {
                        assert.equal(optionalMarkIsRenderedAsFormLabel, false, 'optional mark in form label is not rendered if label is hidden');
                        assert.equal(optionalMarkIsRenderedAsHelpText, !isDefined(helpText) && ['static', 'floating'].indexOf(editorLabelMode || formLabelMode) !== -1, 'optional mark in help text is rendered correctly');
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
      QUnit.test('Check aria-labelledby attribute for editors label', function(assert) {
        var form = $('#form').dxForm({
          items: [{
            dataField: 'name',
            editorType: 'dxTextBox'
          }],
          labelMode: 'floating'
        }).dxForm('instance');
        var $fieldItem = $('#form').find('.' + FIELD_ITEM_CLASS);
        var itemInputAttr = $fieldItem.find('input').attr('aria-labelledby');
        var editorLabelID = $fieldItem.find('.' + EDITOR_LABEL_CLASS).attr('id');
        assert.equal(itemInputAttr, editorLabelID, 'input attr value equal editor label id');
        form.dispose();
      });
      QUnit.test('field1.required -> form.validate() -> form.option("onFieldDataChanged", "newHandler") -> check form is not re-rendered (T1014577)', function(assert) {
        var checkEditorIsInvalid = function(form) {
          return form.$element().find('.dx-textbox').hasClass(INVALID_CLASS);
        };
        var form = $('#form').dxForm({
          formData: {field1: ''},
          items: [{
            dataField: 'field1',
            validationRules: [{type: 'required'}]
          }]
        }).dxForm('instance');
        form.validate();
        assert.equal(checkEditorIsInvalid(form), true, 'editor is invalid after validate');
        form.option('onFieldDataChanged', function() {});
        assert.equal(checkEditorIsInvalid(form), true, 'editor is still invalid after changing the onFieldDataChanged option');
      });
      QUnit.test('form.option("onFieldDataChanged", "newHandler") -> check new handler is called (T1014577)', function(assert) {
        var form = $('#form').dxForm({
          formData: {field1: ''},
          items: [{
            dataField: 'field1',
            validationRules: [{type: 'required'}]
          }]
        }).dxForm('instance');
        var onFieldDataChangedStub = sinon.stub();
        form.option('onFieldDataChanged', onFieldDataChangedStub);
        form.updateData({field1: 'some value 1'});
        assert.equal(onFieldDataChangedStub.callCount, 1, 'new handler is called after formData is updated');
        form.getEditor('field1').option('value', 'some value 2');
        assert.equal(onFieldDataChangedStub.callCount, 2, 'new handler is called after editor value is changed');
      });
      [{editorType: 'dxTextBox'}, {label: {text: 'label text'}}, {editorOptions: {width: 400}}].forEach(function(testConfig) {
        [true, false].forEach(function(useRepaint) {
          var clone = function(item) {
            return JSON.parse(JSON.stringify(item));
          };
          QUnit.test(("Form.itemOption('group.item1', newItem2), testConfig = " + JSON.stringify(testConfig) + ". useRepaint = " + useRepaint + " (T903774)"), function(assert) {
            var item1 = {
              editorType: 'dxDropDownBox',
              dataField: 'item1',
              label: {text: 'item1'},
              editorOptions: {placeholder: 'test_placeHolder'}
            };
            var newItem1 = extend({
              dataField: 'newItem1',
              label: {text: 'new item1'},
              editorOptions: {width: 300}
            }, testConfig);
            var form = $('#form').dxForm({items: [{
                itemType: 'group',
                caption: 'group1',
                items: [clone(item1)]
              }]}).dxForm('instance');
            form.itemOption('group1.item1', clone(newItem1));
            if (useRepaint) {
              form.repaint();
            }
            if ('editorType' in testConfig) {
              assert.deepEqual(form.itemOption('group1.item1'), undefined, 'item1');
              assert.deepEqual(form.itemOption('group1.newItem1'), extend(true, {}, newItem1, {editorType: testConfig.editorType || item1.editorType}), 'newItem1');
            } else {
              assert.deepEqual(form.itemOption('group1.item1'), extend(true, {}, item1, newItem1, {
                editorType: item1.editorType,
                dataField: item1.dataField
              }), 'item1');
              assert.deepEqual(form.itemOption('group1.newItem1'), undefined, 'newItem1');
            }
          });
          QUnit.test(("Form.itemOption('item1', newItem2), testConfig = " + JSON.stringify(testConfig) + ". useRepaint = " + useRepaint + " (T903774)"), function(assert) {
            var item1 = {
              editorType: 'dxDropDownBox',
              dataField: 'item1',
              label: {text: 'item1'},
              editorOptions: {placeholder: 'test_placeHolder'}
            };
            var newItem1 = extend({
              dataField: 'newItem1',
              label: {text: 'new item1'},
              editorOptions: {width: 300}
            }, testConfig);
            var form = $('#form').dxForm({items: [clone(item1)]}).dxForm('instance');
            form.itemOption('item1', clone(newItem1));
            if (useRepaint) {
              form.repaint();
            }
            assert.deepEqual(form.itemOption('item1'), undefined, 'item1');
            assert.deepEqual(form.itemOption('newItem1'), extend(true, {}, newItem1, {editorType: testConfig.editorType || item1.editorType}), 'newItem1');
          });
        });
      });
      QUnit.test('Change options -> check _itemsOptionChangedHandler/_formDataOptionChangedHandler calls', function(assert) {
        var form = $('#form').dxForm({items: [{name: 'id'}]}).dxForm('instance');
        var actualLog = '';
        var _itemsOptionChangedHandler = form._itemsOptionChangedHandler;
        form._itemsOptionChangedHandler = function() {
          actualLog += 'items; ';
          return _itemsOptionChangedHandler.apply(form, arguments);
        };
        var _formDataOptionChangedHandler = form._formDataOptionChangedHandler;
        form._formDataOptionChangedHandler = function() {
          actualLog += 'formData; ';
          return _formDataOptionChangedHandler.apply(form, arguments);
        };
        var _defaultOptionChangedHandler = form._defaultOptionChangedHandler;
        form._defaultOptionChangedHandler = function() {
          actualLog += 'default; ';
          return _defaultOptionChangedHandler.apply(form, arguments);
        };
        function testConfig(optionName, expectedLog) {
          actualLog = '';
          form.option(optionName, {});
          assert.strictEqual(actualLog, expectedLog, ("option(\"" + optionName + "\")"));
        }
        testConfig('.', 'default; ');
        testConfig('.hint', 'default; ');
        testConfig('.items', 'default; ');
        testConfig('.formData', 'default; ');
        testConfig('a', 'default; ');
        testConfig('hint.b', 'default; ');
        testConfig('colCountByScreen.b.', 'default; ');
        testConfig('colCountByScreen.lg.c', 'default; ');
        testConfig('formData', 'default; ');
        testConfig('formData.', 'formData; ');
        testConfig(' formData . ', 'formData; ');
        testConfig('formData.a', 'formData; ');
        testConfig('formData.a.', 'formData; ');
        testConfig('formData.a.b', 'formData; ');
        testConfig('formData.items', 'formData; ');
        testConfig('formData.items[0]', 'formData; ');
        testConfig('formData.formData', 'formData; ');
        testConfig('items', 'default; ');
        testConfig('items.', 'items; default; ');
        testConfig(' items . ', 'items; default; ');
        testConfig('items.a', 'items; default; ');
        testConfig(' items . a ', 'items; default; ');
        testConfig('items.a.b', 'items; default; ');
        testConfig('items.formData', 'items; default; ');
        testConfig('items.formData.b', 'items; default; ');
        testConfig('items.items', 'items; default; ');
        testConfig('items[0]', 'default; ');
        testConfig('items[0].a', 'items; default; ');
        testConfig('items[0].visible', 'items; default; ');
        testConfig('items[0].items', 'items; default; ');
        testConfig('items[0].formData', 'items; default; ');
        testConfig('items[0].items[0]', 'items; default; ');
        testConfig('items[0].tabs', 'items; default; ');
        testConfig('items[0].tabs.a', 'items; default; ');
        testConfig('items[0].tabs.visible', 'items; default; ');
        testConfig('items[0].tabs[0]', 'items; default; ');
        testConfig('items[0].tabs[0].visible', 'items; default; ');
        testConfig('items[0].tabs[0].items', 'items; default; ');
        testConfig('items[0].tabs[0].formData', 'items; default; ');
        testConfig('items[0].tabs[0].items[0]', 'items; default; ');
        testConfig('hint.items', 'default; ');
        testConfig('hint.items.', 'default; ');
        testConfig('hint.items.a', 'default; ');
        testConfig('hint.items[0]', 'default; ');
        testConfig('hint.items[0].visible', 'default; ');
        testConfig('hint.formData', 'default; ');
        testConfig('hint.formData.a', 'default; ');
        testConfig('formData_items', 'default; ');
        testConfig('formData_items.', 'items; default; ');
        testConfig('xxx_formData_xxx', 'default; ');
        testConfig('xxx_formData_xxx.', 'formData; ');
        testConfig('xxx_items_xxx', 'default; ');
        testConfig('xxx_items_xxx.', 'items; default; ');
      });
      QUnit.test('Keep validation summary in an item with Form in its template', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          showValidationSummary: true,
          items: [{template: function() {
              return $('<div></div>').dxForm({
                showValidationSummary: true,
                items: []
              });
            }}]
        });
        assert.strictEqual($testContainer.find('.' + FORM_VALIDATION_SUMMARY).length, 2, 'FORM_VALIDATION_SUMMARY');
      });
      QUnit.module('Tabs', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          responsiveBoxScreenMock.setup.call(this, 1200);
        },
        afterEach: function() {
          this.clock.restore();
          responsiveBoxScreenMock.teardown.call(this);
        }
      });
      QUnit.test('items aren\'t tiny', function(assert) {
        var testContainer = $('#form');
        testContainer.dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            sex: true,
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: [{
            itemType: 'group',
            colCount: 2,
            items: ['firstName', 'lastName']
          }, {
            itemType: 'tabbed',
            tabPanelOptions: {animationEnabled: true},
            tabs: [{
              title: 'Address1',
              items: ['address.city', 'address.street']
            }, {
              title: 'Address2',
              items: ['address.room', 'address.house']
            }]
          }]
        });
        assert.ok(getWidth(testContainer.find('.dx-multiview-item .dx-textbox').first()) / getWidth(testContainer) > 0.5, 'Editors are not tiny');
      });
      QUnit.test('Show scroll buttons in tabpanel', function(assert) {
        var $testContainer = $('#form');
        $testContainer.width(250);
        $testContainer.dxForm({items: [{
            itemType: 'tabbed',
            tabPanelOptions: {showNavButtons: true},
            tabs: [{title: 'tabbed 1111111111111'}, {title: 'tabbed 2222222222222'}]
          }]});
        assert.strictEqual($testContainer.find('.dx-tabs-nav-button').length, 2, 'tabPanelNavButtons.length');
        assert.strictEqual($testContainer.find('.dx-tabs-scrollable').length, 1, 'tabPanelNavButtons.length');
      });
      QUnit.test('Render tabs when formData is changed', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: [{
            itemType: 'tabbed',
            tabs: [{
              title: 'Other1',
              items: [{
                itemType: 'group',
                colCount: 2,
                items: ['firstName', 'lastName']
              }, {
                itemType: 'group',
                items: ['address.city', 'address.street']
              }]
            }, {
              title: 'Other2',
              items: [{
                itemType: 'group',
                colCount: 2,
                items: ['address.room', 'address.house']
              }]
            }]
          }]
        }).dxForm('instance');
        var $groups = testContainer.find('.dx-item-selected ' + '.' + FORM_GROUP_CLASS);
        form.option('formData', {
          firstName: 'Test Name',
          lastName: 'Test Last Name',
          order: 102,
          photo: 'image3.png',
          address: {
            city: 'New City',
            room: 1,
            house: 3,
            street: 'New street'
          }
        });
        this.clock.tick();
        $groups = testContainer.find('.dx-item-selected ' + '.' + FORM_GROUP_CLASS);
        assert.equal($groups.length, 2);
        assert.equal($groups.eq(0).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 1');
        assert.equal($groups.eq(1).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 2');
        testContainer.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
        this.clock.tick();
        $groups = testContainer.find('.dx-item-selected ' + '.' + FORM_GROUP_CLASS);
        assert.equal($groups.length, 1);
        assert.equal($groups.eq(0).find('.' + FIELD_ITEM_CLASS).length, 2, 'group 1');
      });
      QUnit.test('Check align labels', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: ['test order', 'photo personal', {
            itemType: 'tabbed',
            tabs: [{
              title: 'Address1',
              items: [{
                itemType: 'group',
                colCount: 2,
                items: ['address.city', 'address.street', 'address.room', 'address.house']
              }]
            }, {
              title: 'Address2',
              colCount: 2,
              items: ['firstName', 'lastName']
            }]
          }]
        }).dxForm('instance');
        var $labelTexts;
        var labelWidth;
        var $layoutManager;
        var $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        $layoutManager = $layoutManagers.eq(0);
        $labelTexts = findLabelTextsInColumn($layoutManager, 0);
        assert.roughEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)), 1, 'col 1');
        $layoutManager = $layoutManagers.eq(1);
        $labelTexts = findLabelTextsInColumn($layoutManager, 0);
        labelWidth = getLabelWidth($layoutManager, form, 'Address room:');
        assert.roughEqual(getWidth($labelTexts.eq(0)), labelWidth, 1, 'tab 1 col 1');
        $labelTexts = findLabelTextsInColumn($layoutManager, 1);
        labelWidth = getLabelWidth($layoutManager, form, 'Address house:');
        assert.roughEqual(getWidth($labelTexts.eq(1)), labelWidth, 1, 'tab 1 col 2');
        testContainer.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
        this.clock.tick();
        $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        $layoutManager = $layoutManagers.eq(3);
        $labelTexts = findLabelTextsInColumn($layoutManager, 0);
        labelWidth = getLabelWidth($layoutManager, form, 'First Name:');
        assert.roughEqual(getWidth($labelTexts.eq(0)), labelWidth, 1, 'tab 2 col 1');
        $labelTexts = findLabelTextsInColumn($layoutManager, 1);
        labelWidth = getLabelWidth($layoutManager, form, 'Last Name:');
        assert.roughEqual(getWidth($labelTexts.eq(0)), labelWidth, 1, 'tab 2 col 2');
      });
      QUnit.test('Check align labels when layout is changed by default_T306106', function(assert) {
        this.updateScreenSize(500);
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: ['test order', 'photo personal', {
            itemType: 'tabbed',
            tabs: [{
              title: 'Address1',
              items: [{
                itemType: 'group',
                colCount: 2,
                items: ['address.city', 'address.street', 'address.room', 'address.house']
              }]
            }, {
              title: 'Address2',
              colCount: 2,
              items: ['firstName', 'lastName']
            }]
          }]
        }).dxForm('instance');
        var labelWidth;
        var labelContentWidth;
        var $labelsContent;
        var $layoutManager;
        var $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        var i;
        $layoutManager = $layoutManagers.eq(1);
        $labelsContent = $layoutManager.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        labelWidth = getLabelWidth($layoutManager, form, 'Address house:');
        for (i = 0; i < 4; i++) {
          labelContentWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelContentWidth, labelWidth, 1, 'tab 1, item ' + i);
        }
        testContainer.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
        this.clock.tick();
        $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        $layoutManager = $layoutManagers.eq(3);
        $labelsContent = $layoutManager.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        labelWidth = getLabelWidth($layoutManager, form, 'First Name:');
        for (i = 0; i < 2; i++) {
          labelContentWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelContentWidth, labelWidth, 1, 'tab 2, item ' + i);
        }
      });
      QUnit.test('Check align labels when layout is changed_T306106', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: ['test order', 'photo personal', {
            itemType: 'tabbed',
            tabs: [{
              title: 'Address1',
              items: [{
                itemType: 'group',
                colCount: 2,
                items: ['address.city', 'address.street', 'address.room', 'address.house']
              }]
            }, {
              title: 'Address2',
              colCount: 2,
              items: ['firstName', 'lastName']
            }]
          }]
        }).dxForm('instance');
        var labelWidth;
        var labelContentWidth;
        var $labelsContent;
        var $layoutManager;
        var $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        var i;
        this.updateScreenSize(500);
        $layoutManager = $layoutManagers.eq(1);
        $labelsContent = $layoutManager.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        labelWidth = getLabelWidth($layoutManager, form, 'Address house:');
        for (i = 0; i < 4; i++) {
          labelContentWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelContentWidth, labelWidth, 1, 'tab 1, item ' + i);
        }
        testContainer.find('.dx-tabpanel').dxTabPanel('instance').option('selectedIndex', 1);
        this.clock.tick();
        $layoutManagers = testContainer.find('.' + FORM_LAYOUT_MANAGER_CLASS);
        $layoutManager = $layoutManagers.eq(3);
        $labelsContent = $layoutManager.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        labelWidth = getLabelWidth($layoutManager, form, 'First Name:');
        for (i = 0; i < 2; i++) {
          labelContentWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelContentWidth, labelWidth, 1, 'tab 2, item ' + i);
        }
      });
      QUnit.test('Data is updated correctly_T353275', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {firstName: ''},
          items: [{
            itemType: 'tabbed',
            tabs: [{items: ['firstName']}]
          }]
        }).dxForm('instance');
        form.updateData('firstName', 'Test First Name');
        assert.equal(form.getEditor('firstName').option('value'), 'Test First Name', 'value of editor by \'firstName\' field');
      });
      QUnit.test('Update editorOptions of an editor inside the tab', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: {firstName: 'Test name'},
          items: [{
            itemType: 'tabbed',
            tabs: [{items: [{
                dataField: 'firstName',
                editorOptions: {disabled: true}
              }]}]
          }]
        }).dxForm('instance');
        assert.equal(form.getEditor('firstName').option('disabled'), true, 'initial state: editor is disabled');
        form.option('items[0].tabs[0].items[0].editorOptions.disabled', false);
        assert.equal(form.getEditor('firstName').option('disabled'), false, '\'disabled\' option was successfully changed');
      });
      QUnit.test('Update layout inside a tab (T1040296)', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          deferRendering: false,
          items: [{
            itemType: 'tabbed',
            tabPanelOptions: {'deferRendering': false},
            tabs: [{
              title: 'General',
              items: [{
                itemType: 'group',
                items: [{
                  dataField: 'id',
                  visible: false
                }, {
                  itemType: 'group',
                  items: [{dataField: 'minWidth'}]
                }]
              }]
            }]
          }]
        }).dxForm('instance');
        form.option('items[0].tabs[0].items[0].items[0].visible', true);
        form.option('items[0].tabs', [{
          title: 'General',
          items: [{
            itemType: 'group',
            items: [{
              dataField: 'id',
              visible: true
            }, {
              itemType: 'group',
              items: [{dataField: 'minWidth'}]
            }]
          }]
        }, {title: 'Window'}]);
        assert.deepEqual($traceurRuntime.spread(document.querySelectorAll('.dx-tab-text')).map(function(e) {
          return e.textContent;
        }), ['General', 'Window'], 'dx-tab-text elements');
      });
      QUnit.module('Align labels', {
        beforeEach: function() {
          var that = this;
          that.testObject = {
            'ID': 1,
            'FirstName': 'John',
            'LastName': 'Heart',
            'Prefix': 'Mr.',
            'Position': 'CEO',
            'Picture': 'images/employees/01.png',
            'BirthDate': '1964/03/16',
            'HireDate': '1995/01/15',
            'Notes': 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
            'Address': '351 S Hill St.',
            'StateID': 5
          };
          responsiveBoxScreenMock.setup.call(this, 1200);
        },
        afterEach: function() {
          responsiveBoxScreenMock.teardown.call(this);
        }
      });
      QUnit.test('Align labels in column', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: this.testObject,
          colCount: 4,
          customizeItem: function(item) {
            switch (item.dataField) {
              case 'FirstName':
              case 'LastName':
                item.colSpan = 2;
                break;
              case 'Prefix':
                item.colSpan = 4;
                break;
              case 'Notes':
                item.colSpan = 5;
                break;
              case 'StateID':
                item.colSpan = 3;
                break;
              default:
            }
          }
        }).dxForm('instance');
        var $col1 = $('.dx-col-0');
        var $col2 = $('.dx-col-1');
        var $col3 = $('.dx-col-2');
        var $col4 = $('.dx-col-3');
        var $maxLabelWidth = getLabelWidth(testContainer, form, 'Position:');
        var i;
        var labelWidth;
        for (i = 0; i < 4; i++) {
          labelWidth = getWidth($col1.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col0 item ' + i);
        }
        $maxLabelWidth = getLabelWidth(testContainer, form, 'First Name:');
        for (i = 0; i < 3; i++) {
          labelWidth = getWidth($col2.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col1 item ' + i);
        }
        $maxLabelWidth = getLabelWidth(testContainer, form, 'Birth Date:');
        for (i = 0; i < 2; i++) {
          labelWidth = getWidth($col3.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col2 item ' + i);
        }
        $maxLabelWidth = getLabelWidth(testContainer, form, 'Last Name:');
        for (i = 0; i < 2; i++) {
          labelWidth = getWidth($col4.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col3 item ' + i);
        }
        assert.equal($('.' + GET_LABEL_WIDTH_BY_TEXT_CLASS).length, 0, 'hidden labels count');
      });
      QUnit.test('Align labels in column when labels text is identical', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({formData: {
            TestBool: true,
            ShipName: 'Test'
          }}).dxForm('instance');
        var $col1 = $('.dx-col-0');
        var $maxLabelWidth = getLabelWidth(testContainer, form, 'Ship Name:');
        var i;
        for (i = 0; i < 2; i++) {
          var labelWidth = getWidth($col1.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col0 item ' + i);
        }
      });
      QUnit.test('Disable alignItemLabels', function(assert) {
        var testContainer = $('#form');
        testContainer.dxForm({
          formData: {
            TestBool: true,
            ShipName: 'Test'
          },
          alignItemLabels: false
        }).dxForm('instance');
        var $labelTexts = $('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        assert.notEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)));
      });
      QUnit.test('Disable alignItemLabels in group', function(assert) {
        var testContainer = $('#form');
        testContainer.dxForm({
          formData: {
            TestBool: true,
            ShipName: 'Test',
            Name: 'John',
            LastName: 'Smith'
          },
          items: [{
            itemType: 'group',
            alignItemLabels: false,
            items: ['TestBool', 'ShipName']
          }, {
            itemType: 'group',
            items: ['Name', 'LastName']
          }]
        }).dxForm('instance');
        var $groups = $('.' + FORM_GROUP_CLASS);
        var $labelTexts = $groups.eq(0).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        assert.notEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)), 'group 1');
        $labelTexts = $groups.eq(1).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        assert.equal(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)), 'group 2');
      });
      QUnit.test('Align labels in column when alignItemLabelsInAllGroups is enabled', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          colCount: 2,
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            middleName: 'Test Middle Name',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: [{
            itemType: 'group',
            colCount: 3,
            items: ['firstName', 'lastName', 'middleName']
          }, {
            itemType: 'group',
            colCount: 2,
            items: ['photo', 'order']
          }, {
            itemType: 'group',
            colCount: 2,
            items: ['address.city', 'address.street']
          }, {
            itemType: 'group',
            colCount: 2,
            items: ['address.room', 'address.house']
          }]
        }).dxForm('instance');
        var labelWidth;
        var textWidth;
        var $groups;
        var $texts;
        var i;
        $groups = form._getGroupElementsInColumn(testContainer, 0);
        $texts = findLabelTextsInColumn($groups, 0);
        labelWidth = getLabelWidth(testContainer, form, 'Address city:');
        for (i = 0; i < 2; i++) {
          textWidth = getWidth($texts.eq(i));
          assert.roughEqual(textWidth, labelWidth, 1, 'group col 1, col1 item ' + i);
        }
        $texts = findLabelTextsInColumn($groups, 1);
        assert.roughEqual(getWidth($texts.eq(0)), getLabelWidth(testContainer, form, 'Last Name:'), 1, 'group col 1, col2 item 1');
        assert.roughEqual(getWidth($texts.eq(1)), getLabelWidth(testContainer, form, 'Address street:'), 1, 'group col 1, col2 item 2');
        $texts = findLabelTextsInColumn($groups, 2);
        labelWidth = getLabelWidth(testContainer, form, 'Middle Name:');
        assert.roughEqual(getWidth($texts.eq(0)), labelWidth, 1, 'group col 1, col3 item 1');
        $groups = form._getGroupElementsInColumn(testContainer, 1);
        $texts = findLabelTextsInColumn($groups, 0);
        labelWidth = getLabelWidth(testContainer, form, 'Address room:');
        for (i = 0; i < 2; i++) {
          textWidth = getWidth($texts.eq(i));
          assert.roughEqual(textWidth, labelWidth, 1, 'group col 2, col1 item ' + i);
        }
        $texts = findLabelTextsInColumn($groups, 1);
        labelWidth = getLabelWidth(testContainer, form, 'Address house:');
        for (i = 0; i < 2; i++) {
          textWidth = getWidth($texts.eq(i));
          assert.roughEqual(textWidth, labelWidth, 1, 'group col , col2 item ' + i);
        }
      });
      QUnit.test('Align labels in column when alignItemLabelsInAllGroups is disabled', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          colCount: 2,
          alignItemLabelsInAllGroups: false,
          formData: {
            firstName: 'John',
            lastName: 'Smith',
            order: 101,
            photo: 'image.png',
            address: {
              city: 'Test City',
              room: 11,
              house: 7,
              street: 'Test street'
            }
          },
          items: [{
            itemType: 'group',
            colCount: 2,
            items: ['firstName', 'lastName']
          }, {
            itemType: 'group',
            colCount: 1,
            items: ['photo', 'order']
          }, {
            itemType: 'group',
            colCount: 2,
            items: ['address.city', 'address.street']
          }, {
            itemType: 'group',
            colCount: 2,
            items: ['address.room', 'address.house']
          }]
        }).dxForm('instance');
        var $groups;
        $groups = form._getGroupElementsInColumn(testContainer, 0);
        assert.notEqual(getWidth(findLabelTextsInColumn($groups.eq(0), 0).eq(0)), getWidth(findLabelTextsInColumn($groups.eq(1), 0).eq(0)), 'compare group1 with group2');
        $groups = form._getGroupElementsInColumn(testContainer, 1);
        assert.notEqual(getWidth(findLabelTextsInColumn($groups.eq(0), 0).eq(0)), getWidth(findLabelTextsInColumn($groups.eq(1), 0).eq(0)), 'compare group1 with group2');
      });
      QUnit.test('Align labels in columns when there are rows', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: this.testObject,
          colCount: 4,
          items: [{
            name: 'fieldFirstValue',
            colSpan: 2,
            editorType: 'dxTextBox',
            label: {text: 'Field 1'}
          }, {
            name: 'fieldSecondValue',
            colSpan: 2,
            editorType: 'dxTextBox',
            label: {text: 'Field 2'}
          }, {
            name: 'fieldThirdValue',
            colSpan: 2,
            editorType: 'dxTextBox',
            label: {text: 'Field three'}
          }, {
            name: 'fieldFourthValue',
            colSpan: 2,
            editorType: 'dxTextBox',
            label: {text: 'Field four'}
          }]
        }).dxForm('instance');
        var $col1 = $('.dx-col-0');
        var $col2 = $('.dx-col-2');
        var $maxLabelWidth = getLabelWidth(testContainer, form, 'Field three:');
        var i;
        var labelWidth;
        for (i = 0; i < 2; i++) {
          labelWidth = getWidth($col1.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col0 item ' + i);
        }
        $maxLabelWidth = getLabelWidth(testContainer, form, 'Field four:');
        for (i = 0; i < 2; i++) {
          labelWidth = getWidth($col2.eq(i).find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS).first());
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'col2 item ' + i);
        }
      });
      QUnit.test('Change option after group rendered (check for cycling template render)', function(assert) {
        var $formContainer = $('#form').dxForm({
          formData: {
            firstName: 'John',
            lastName: 'Rightman'
          },
          items: [{
            itemType: 'group',
            caption: 'Personal',
            items: [{dataField: 'firstName'}, {dataField: 'lastName'}]
          }]
        });
        $formContainer.dxForm('instance').option('colCount', 4);
        var $fieldItemWidgets = $formContainer.find('.' + FIELD_ITEM_CONTENT_CLASS);
        assert.equal($fieldItemWidgets.length, 3, 'Correct number of a widgets');
      });
      QUnit.test('template should be applied to default field if items[].template option has been changed (T1085831)', function(assert) {
        var $formContainer = $('#form').dxForm({
          formData: {firstName: 'John'},
          items: [{
            itemType: 'group',
            caption: 'Personal',
            items: [{dataField: 'firstName'}]
          }]
        });
        var $customFieldTemplate = $('<div>').text('template').addClass('custom-field-template');
        $formContainer.dxForm('instance').option('items[0].items[0].template', function() {
          return $customFieldTemplate;
        });
        assert.equal($formContainer.find('.custom-field-template').length, 1, 'custom template has been applied');
        assert.equal($formContainer.find('.custom-field-template').text(), 'template', 'template text is correct');
      });
      QUnit.test('Align labels when layout is changed in responsive box_T306106', function(assert) {
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: this.testObject,
          colCount: 4,
          customizeItem: function(item) {
            switch (item.dataField) {
              case 'FirstName':
              case 'LastName':
                item.colSpan = 2;
                break;
              case 'Prefix':
                item.colSpan = 4;
                break;
              case 'Notes':
                item.colSpan = 5;
                break;
              case 'StateID':
                item.colSpan = 3;
                break;
              default:
            }
          }
        }).dxForm('instance');
        var $labelsContent = testContainer.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        var $maxLabelWidth = getLabelWidth(testContainer, form, 'First Name:');
        var i;
        this.updateScreenSize(500);
        for (i = 0; i < 11; i++) {
          var labelWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'item ' + i);
        }
        assert.equal($('.' + GET_LABEL_WIDTH_BY_TEXT_CLASS).length, 0, 'hidden labels count');
      });
      QUnit.test('Align labels when layout is changed when small window size by default_T306106', function(assert) {
        this.updateScreenSize(500);
        var testContainer = $('#form');
        var form = testContainer.dxForm({
          formData: this.testObject,
          colCount: 4,
          customizeItem: function(item) {
            switch (item.dataField) {
              case 'FirstName':
              case 'LastName':
                item.colSpan = 2;
                break;
              case 'Prefix':
                item.colSpan = 4;
                break;
              case 'Notes':
                item.colSpan = 5;
                break;
              case 'StateID':
                item.colSpan = 3;
                break;
              default:
            }
          }
        }).dxForm('instance');
        var $labelsContent = testContainer.find('.' + FIELD_ITEM_LABEL_CONTENT_CLASS);
        var $maxLabelWidth = getLabelWidth(testContainer, form, 'First Name:');
        var i;
        for (i = 0; i < 11; i++) {
          var labelWidth = getWidth($labelsContent.eq(i));
          assert.roughEqual(labelWidth, $maxLabelWidth, 1, 'item ' + i);
        }
        assert.equal($('.' + GET_LABEL_WIDTH_BY_TEXT_CLASS).length, 0, 'hidden labels count');
      });
      QUnit.test('Labels are not aligned when labelLocation is top', function(assert) {
        $('#form').dxForm({
          labelLocation: 'top',
          formData: {
            dataField: 'Data field',
            bigDataField: 'Big Data field'
          }
        }).dxForm('instance');
        var $labelTexts = $(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        assert.notEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)));
      });
      QUnit.test('Labels are not aligned when labelLocation is top with the groups', function(assert) {
        $('#form').dxForm({
          labelLocation: 'top',
          formData: {
            isActive: true,
            ShipName: 'Test',
            Name: 'John',
            LastName: 'Smith'
          },
          items: [{
            itemType: 'group',
            items: ['isActive', 'ShipName']
          }, {
            itemType: 'group',
            items: ['Name', 'LastName']
          }]
        }).dxForm('instance');
        var $groups = $(("." + FORM_GROUP_CLASS));
        var $labelTexts = $groups.eq(0).find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        assert.notEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)), 'group 1');
        $labelTexts = $groups.eq(1).find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        assert.notEqual(getWidth($labelTexts.eq(0)), getWidth($labelTexts.eq(1)), 'group 2');
      });
      QUnit.test('required mark aligned', function(assert) {
        var $testContainer = $('#form').dxForm({
          requiredMark: '!',
          items: [{
            dataField: 'name',
            isRequired: true
          }]
        });
        var $labelsContent = $testContainer.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        var $requiredLabel = $labelsContent.find(("." + FIELD_ITEM_LABEL_TEXT_CLASS));
        var $requiredMark = $labelsContent.find(("." + FIELD_ITEM_REQUIRED_MARK_CLASS));
        $labelsContent.width(200);
        assert.roughEqual($labelsContent.offset().left + getWidth($requiredLabel), $requiredMark.offset().left, 0.5, 'position of requared mark is right');
        assert.ok($requiredLabel.position().left < $requiredMark.position().left, 'required mark should be after of the text');
      });
      QUnit.test('Align with "" required mark, T1031458', function(assert) {
        var $testContainer = $('#form').dxForm({
          width: 200,
          requiredMark: '',
          items: [{
            dataField: 'X',
            isRequired: true
          }]
        });
        var $labelText = $testContainer.find('.dx-field-item-label-text');
        var $textBox = $testContainer.find('.dx-textbox');
        assert.roughEqual(getWidth($labelText), 11, 3, 'labelsContent.width');
        assert.roughEqual($textBox.offset().left, $labelText.offset().left + 25, 3, 'textBox.left');
      });
      QUnit.test('Align with " " required mark, T1031458', function(assert) {
        var $testContainer = $('#form').dxForm({
          width: 200,
          requiredMark: ' ',
          items: [{
            dataField: 'X',
            isRequired: true
          }]
        });
        var $labelText = $testContainer.find('.dx-field-item-label-text');
        var $textBox = $testContainer.find('.dx-textbox');
        assert.roughEqual(getWidth($labelText), 11, 3, 'labelsContent.width');
        assert.roughEqual($textBox.offset().left, $labelText.offset().left + 25, 3, 'textBox.left');
      });
      QUnit.test('Align with "!" required mark, T1031458', function(assert) {
        var $testContainer = $('#form').dxForm({
          width: 200,
          requiredMark: '!',
          items: [{
            dataField: 'X',
            isRequired: true
          }]
        });
        var $labelText = $testContainer.find('.dx-field-item-label-text');
        var $textBox = $testContainer.find('.dx-textbox');
        assert.roughEqual(getWidth($labelText), 11, 3, 'labelsContent.width');
        assert.roughEqual($textBox.offset().left, $labelText.offset().left + 29, 3, 'textBox.left');
      });
      QUnit.test('Align with "×" required mark, T1031458', function(assert) {
        var $testContainer = $('#form').dxForm({
          width: 200,
          requiredMark: '×',
          items: [{
            dataField: 'X',
            isRequired: true
          }]
        });
        var $labelText = $testContainer.find('.dx-field-item-label-text');
        var $textBox = $testContainer.find('.dx-textbox');
        assert.roughEqual(getWidth($labelText), 11, 3, 'labelsContent.width');
        assert.roughEqual($textBox.offset().left, $labelText.offset().left + 35, 3, 'textBox.left');
      });
      QUnit.test('optional mark aligned', function(assert) {
        var $testContainer = $('#form').dxForm({
          optionalMark: 'optMark',
          showOptionalMark: true,
          items: ['position']
        });
        var $labelsContent = $testContainer.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        var $optionalLabel = $labelsContent.find(("." + FIELD_ITEM_LABEL_TEXT_CLASS));
        var $optionalMark = $labelsContent.find(("." + FIELD_ITEM_OPTIONAL_MARK_CLASS));
        $labelsContent.width(200);
        assert.roughEqual($labelsContent.offset().left + getWidth($optionalLabel), $optionalMark.offset().left, 0.5, 'position of optional mark is right');
        assert.ok($optionalLabel.position().left < $optionalMark.position().left, 'optional mark should be after of the text');
      });
      QUnit.module('T986577', function() {
        function getFormConfig() {
          return {
            width: 200,
            screenByWidth: function(_) {
              return 'md';
            },
            colCountByScreen: {md: 1},
            items: [{
              label: {text: 'text'},
              template: function() {
                return $('<div></div>').dxToolbar({
                  multiline: false,
                  items: [{
                    text: 'Item1',
                    locateInMenu: 'auto'
                  }, {
                    text: 'Item2',
                    locateInMenu: 'auto'
                  }, {
                    text: 'Item3',
                    locateInMenu: 'auto'
                  }]
                });
              }
            }, {
              label: {text: 'Very very long text'},
              editorType: 'dxTextBox'
            }]
          };
        }
        QUnit.test('Toolbar is rendered inside form. alignItemLabels = false', function(assert) {
          var resizeEventSpy = sinon.spy(visibilityEventsModule, 'triggerResizeEvent');
          var $form = $('#form').dxForm(extend({alignItemLabels: false}, getFormConfig()));
          var resizeEventArg = resizeEventSpy.getCall(0).args[0];
          assert.equal(resizeEventSpy.called, 1, 'resize is triggered only once');
          assert.deepEqual(resizeEventArg.get(0), $form.find(("." + TOOLBAR_CLASS)).get(0), 'element is toolbar');
          assert.roughEqual(getWidth(resizeEventArg), 164, 5, 'toolbar width is correct');
          assert.roughEqual(getHeight(resizeEventArg), 36, 1, 'toolbar height is correct');
          resizeEventSpy.restore();
        });
        QUnit.test('Toolbar is rendered inside form. alignItemLabels = true', function(assert) {
          var resizeEventSpy = sinon.spy(visibilityEventsModule, 'triggerResizeEvent');
          var $form = $('#form').dxForm(extend({alignItemLabels: true}, getFormConfig()));
          var resizeEventArg = resizeEventSpy.getCall(0).args[0];
          assert.equal(resizeEventSpy.called, 1, 'resize is triggered only once');
          assert.deepEqual(resizeEventArg.get(0), $form.find(("." + TOOLBAR_CLASS)).get(0), 'element is toolbar');
          assert.roughEqual(getWidth(resizeEventArg), 72, 5, 'toolbar width is correct');
          assert.roughEqual(getHeight(resizeEventArg), 36, 1, 'toolbar height is correct');
          resizeEventSpy.restore();
        });
      });
      QUnit.module('Public API', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit.test('UpdateData, simple case', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({formData: {
            test1: 'abc',
            test2: 'xyz'
          }});
        var form = $testContainer.dxForm('instance');
        form.updateData('test2', 'qwerty');
        assert.equal(form.option('formData.test2'), 'qwerty', 'Correct data');
      });
      QUnit.test('UpdateData, update with object', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          items: ['test1', 'test2', {dataField: 'test3.SuperMan'}, {dataField: 'test3.Specialization.good'}],
          formData: {
            test1: 'abc',
            test2: 'xyz',
            test3: {
              SuperMan: 'Kent',
              Specialization: {good: true}
            }
          }
        });
        var form = $testContainer.dxForm('instance');
        form.updateData({
          test1: 'xyz',
          test2: 'qwerty',
          test3: {
            SuperMan: 'KAndrew',
            Specialization: {good: false}
          }
        });
        assert.deepEqual(form.option('formData'), {
          test1: 'xyz',
          test2: 'qwerty',
          test3: {
            SuperMan: 'KAndrew',
            Specialization: {good: false}
          }
        }, 'updated data');
        assert.equal(form.getEditor('test1').option('value'), 'xyz', 'editor\'s value of \'test1\' data field');
        assert.equal(form.getEditor('test2').option('value'), 'qwerty', 'editor\'s value of \'test2\' data field');
        assert.equal(form.getEditor('test3.SuperMan').option('value'), 'KAndrew', 'editor\'s value of \'test3.SuperMan\' data field');
        assert.ok(!form.getEditor('test3.Specialization.good').option('value'), 'editor\'s value of \'test3.Specialization.good\' data field');
      });
      QUnit.test('Get button instance', function(assert) {
        var form = $('#form').dxForm({items: [{
            itemType: 'button',
            name: 'button1',
            buttonOptions: {text: 'button1'}
          }, {
            itemType: 'group',
            items: [{
              itemType: 'button',
              name: 'button2',
              buttonOptions: {text: 'button2'}
            }]
          }, {
            itemType: 'button',
            buttonOptions: {text: 'button3'}
          }]}).dxForm('instance');
        var formInvalidateSpy = sinon.spy(form, '_invalidate');
        assert.strictEqual(form.getButton('button1').option('text'), 'button1');
        assert.strictEqual(form.getButton('button2').option('text'), 'button2');
        assert.strictEqual(form.getButton('button3'), undefined);
        form.option('items[1].items[0].buttonOptions.text', 'changed_button_text');
        assert.strictEqual(form.getButton('button2').option('text'), 'changed_button_text');
        assert.strictEqual(formInvalidateSpy.callCount, 0, 'Invalidate does not called');
      });
      QUnit.testInActiveWindow('Change \'Button.icon\'', function(assert) {
        ['option', 'itemOption', 'editor.option'].forEach(function(setOptionWay) {
          var form = $('#form').dxForm({items: [{
              itemType: 'button',
              name: 'button1',
              buttonOptions: {icon: 'icon1'}
            }]}).dxForm('instance');
          if (device.real().deviceType === 'desktop') {
            $('#form').find('.dx-button').focus();
            assert.ok($('#form').find('.dx-button').is(':focus'), 'initial focus');
          }
          switch (setOptionWay) {
            case 'option':
              form.option('items[0].buttonOptions.icon', 'icon2');
              break;
            case 'itemOption':
              {
                var buttonOptions = form.itemOption('button1').buttonOptions;
                buttonOptions.icon = 'icon2';
                form.itemOption('button1', 'buttonOptions', buttonOptions);
                break;
              }
            case 'editor.option':
              form.getButton('button1').option('icon', 'icon2');
              break;
          }
          assert.strictEqual(form.getButton('button1').option('icon'), 'icon2');
          if (device.real().deviceType === 'desktop') {
            assert.ok($('#form').find('.dx-button').is(':focus'), 'final focus');
          }
        });
      });
      QUnit.test('Get editor instance', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          formData: {
            test1: 'abc',
            test2: 'xyz'
          },
          items: ['test1', {
            name: 'test3',
            editorType: 'dxNumberBox'
          }]
        });
        var form = $testContainer.dxForm('instance');
        assert.ok(!typeUtils.isDefined(form.getEditor('test2')), 'We hasn\'t instance for \'test2\' field');
        assert.ok(typeUtils.isDefined(form.getEditor('test1')), 'We have instance for \'test1\' field');
        assert.ok(typeUtils.isDefined(form.getEditor('test3')), 'We have instance for \'test3\' field');
        assert.equal(form.getEditor('test1').NAME, 'dxTextBox', 'It\'s textbox');
        assert.equal(form.getEditor('test3').NAME, 'dxNumberBox', 'It\'s numberBox');
      });
      QUnit.test('Get editor instance with group config', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          formData: {
            test1: 'abc',
            test2: 'xyz'
          },
          items: ['test1', {
            itemType: 'group',
            items: [{
              dataField: 'test2',
              editorType: 'dxTextArea'
            }, {
              name: 'test3',
              editorType: 'dxTextBox'
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        assert.ok(typeUtils.isDefined(form.getEditor('test1')), 'We have instance for \'test1\' field');
        assert.ok(typeUtils.isDefined(form.getEditor('test2')), 'We have instance for \'test2\' field');
        assert.ok(typeUtils.isDefined(form.getEditor('test3')), 'We have instance for \'test3\' field');
        assert.equal(form.getEditor('test2').NAME, 'dxTextArea', 'It\'s textArea');
        assert.equal(form.getEditor('test3').NAME, 'dxTextBox', 'It\'s textBox');
      });
      QUnit.test('UpdateDimensions', function(assert) {
        var $testContainer = $('#form');
        $testContainer.dxForm({
          height: 200,
          formData: {
            test1: 'abc',
            test2: 'xyz',
            test3: '123'
          },
          items: ['test1', 'test2', 'test3', {template: function() {
              return $('<div/>').attr('id', 'testBlock').css({
                height: 300,
                'backgroundColor': 'red'
              });
            }}]
        });
        var form = $testContainer.dxForm('instance');
        var isSizeUpdated;
        $('#testBlock').hide();
        form.updateDimensions().done(function() {
          isSizeUpdated = true;
        });
        this.clock.tick();
        assert.ok(isSizeUpdated);
      });
      QUnit.test('Check component instance onEditorEnterKey', function(assert) {
        var testArgs;
        var form = $('#form').dxForm({
          formData: {
            name: 'Kyle',
            work: 'MexCo'
          },
          onEditorEnterKey: function(args) {
            testArgs = args;
          }
        }).dxForm('instance');
        var editor = form.getEditor('work');
        triggerKeyUp(editor.$element(), 'Enter');
        assert.notEqual(testArgs.component, undefined, 'component');
        assert.notEqual(testArgs.element, undefined, 'element');
        assert.notEqual(testArgs.event, undefined, 'Event');
        assert.equal(testArgs.dataField, 'work', 'dataField');
        assert.equal(testArgs.component.NAME, 'dxForm', 'correct component');
      });
      QUnit.test('Use \'itemOption\' with no items', function(assert) {
        var $testContainer = $('#form').dxForm({
          height: 200,
          formData: {
            test1: 'abc',
            test2: 'xyz',
            test3: '123'
          }
        });
        var form = $testContainer.dxForm('instance');
        var testItem = form.itemOption('test2');
        form.itemOption('test3', 'label', {text: 'NEWLABEL'});
        assert.deepEqual(testItem, {dataField: 'test2'}, 'corrected item received');
        assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).last().text(), 'NEWLABEL:', 'new label rendered');
      });
      QUnit.test('Use \'itemOption\' do not change the order of an items', function(assert) {
        var contentReadyStub = sinon.stub();
        var $testContainer = $('#form').dxForm({
          height: 200,
          formData: {
            ID: 1,
            FistName: 'Alex',
            LastName: 'Johnson',
            Address: 'Alabama'
          },
          items: ['ID', {dataField: 'FirstName'}, {dataField: 'LastName'}, 'Address']
        });
        var form = $testContainer.dxForm('instance');
        form.on('contentReady', contentReadyStub);
        form.itemOption('FirstName', {
          visible: true,
          label: {text: 'Test Label'},
          editorOptions: {
            value: '',
            useMaskedValue: true,
            placeholder: 'CNPJ',
            mask: '000.000.000-00'
          }
        });
        assert.deepEqual(form.option('items'), [{dataField: 'ID'}, {
          dataField: 'FirstName',
          visible: true,
          label: {text: 'Test Label'},
          editorOptions: {
            value: '',
            useMaskedValue: true,
            placeholder: 'CNPJ',
            mask: '000.000.000-00'
          }
        }, {dataField: 'LastName'}, {dataField: 'Address'}], 'correct items order');
        assert.equal(contentReadyStub.callCount, 1, 'the form renders once');
      });
      QUnit.test('Use \'itemOption\' with groups', function(assert) {
        var $testContainer = $('#form').dxForm({
          height: 200,
          formData: {
            EmployeeID: 1,
            LastName: 'John',
            FirstName: 'Dow',
            BirthData: '01/01/1970',
            HireDate: '12/11/1995'
          },
          items: [{
            itemType: 'group',
            items: [{
              itemType: 'group',
              caption: 'Personal',
              items: [{
                itemType: 'group',
                caption: 'Full Name',
                colCount: 3,
                items: ['EmployeeID', 'LastName', 'FirstName']
              }, {
                itemType: 'group',
                caption: 'Dates',
                items: ['BirthDate', 'HireDate']
              }]
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        var unknownField = form.itemOption('FirstName');
        var firstGroup = form.itemOption('Personal');
        var secondGroup = form.itemOption('Personal.FullName');
        var innerOption = form.itemOption('Personal.FullName.FirstName');
        form.itemOption('Personal.Dates.HireDate', 'label', {text: 'NEWLABEL'});
        assert.equal(unknownField, undefined, 'corrected item received');
        assert.deepEqual({
          itemType: firstGroup.itemType,
          caption: firstGroup.caption
        }, {
          itemType: 'group',
          caption: 'Personal'
        }, 'corrected item received');
        assert.deepEqual({
          itemType: secondGroup.itemType,
          caption: secondGroup.caption
        }, {
          itemType: 'group',
          caption: 'Full Name'
        }, 'corrected item received');
        assert.equal(innerOption.dataField, 'FirstName', 'corrected item received');
        assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).last().text(), 'NEWLABEL:', 'new label rendered');
      });
      QUnit.test('Use \'itemOption\' with groups and one group has empty caption (T359214)', function(assert) {
        var $testContainer = $('#form').dxForm({
          height: 200,
          items: [{
            itemType: 'group',
            caption: '',
            items: [{
              itemType: 'simple',
              dataField: 'Sequence',
              editType: 'dxTextBox'
            }, {
              itemType: 'simple',
              dataField: 'AgentID',
              editorType: 'dxTextBox'
            }]
          }, {
            itemType: 'group',
            caption: 'TestGroup1',
            items: [{
              itemType: 'group',
              caption: 'Tax',
              items: [{
                itemType: 'simple',
                dataField: 'IsResident',
                editorType: 'dxTextBox'
              }, {
                itemType: 'simple',
                dataField: 'Minor',
                editorType: 'dxTextBox'
              }]
            }, {
              itemType: 'group',
              caption: 'TestGroup2',
              items: [{
                itemType: 'simple',
                dataField: 'DIN',
                editorType: 'dxTextBox'
              }]
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        form.itemOption('TestGroup1.TestGroup2', 'caption', 'custom');
        assert.equal($testContainer.find('.' + FORM_GROUP_CAPTION_CLASS).last().text(), 'custom', 'new caption rendered');
      });
      QUnit.test('Use \'itemOption\' with tabs', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {
            EmployeeID: 1,
            LastName: 'John',
            FirstName: 'Dow',
            BirthData: '01/01/1970',
            HireDate: '12/11/1995',
            Country: 'USA',
            City: 'Phoenix',
            Region: 'Arizona',
            Title: 'Ms'
          },
          items: ['EmployeeID', 'FirstName', 'LastName', {
            itemType: 'tabbed',
            tabs: [{
              title: 'Dates',
              items: ['BirthDate', 'HireDate']
            }, {
              title: 'Address',
              colCount: 2,
              items: ['Country', 'City', 'Region']
            }, {
              title: 'Title',
              items: ['Title']
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        var tabItem = form.itemOption('Address');
        var innerTabItem = form.itemOption('Address.Country');
        form.itemOption('Dates.HireDate', 'label', {text: 'NEWLABEL'});
        assert.deepEqual(tabItem, {
          title: 'Address',
          colCount: 2,
          items: [{dataField: 'Country'}, {dataField: 'City'}, {dataField: 'Region'}]
        }, 'Correct tab\'s item');
        assert.equal(innerTabItem.dataField, 'Country', 'corrected item received');
        assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).eq(4).text(), 'NEWLABEL:', 'new label rendered');
      });
      QUnit.test('\'itemOption\' should get an item with several spaces in the caption', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {
            EmployeeID: 1,
            LastName: 'John',
            FirstName: 'Dow'
          },
          items: ['EmployeeID', {
            itemType: 'group',
            caption: 'Test group item',
            items: ['FirstName', 'LastName']
          }]
        });
        var form = $testContainer.dxForm('instance');
        var groupItem = form.itemOption('Testgroupitem');
        var innerGroupItem = form.itemOption('Testgroupitem.FirstName');
        assert.deepEqual(groupItem, {
          itemType: 'group',
          caption: 'Test group item',
          items: [{dataField: 'FirstName'}, {dataField: 'LastName'}]
        }, 'Correct group item');
        form.itemOption('Testgroupitem.LastName', 'label', {text: 'NEWLABEL'});
        assert.equal(innerGroupItem.dataField, 'FirstName', 'corrected item received');
        assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).last().text(), 'NEWLABEL:', 'new label rendered');
      });
      QUnit.test('\'itemOption\' should get an item with several spaces in the caption and long path', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {
            EmployeeID: 1,
            LastName: 'John',
            FirstName: 'Dow'
          },
          items: ['EmployeeID', {
            itemType: 'group',
            caption: 'Test group 1',
            items: [{
              itemType: 'group',
              caption: 'Test group 2',
              items: ['FirstName', 'LastName']
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        var innerGroupItem = form.itemOption('Testgroup1.Testgroup2.FirstName');
        assert.deepEqual(innerGroupItem, {dataField: 'FirstName'}, 'corrected item received');
      });
      QUnit.test('\'itemOption\' should get an group inner item located into tabbed item', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {
            EmployeeID: 1,
            LastName: 'John',
            FirstName: 'Dow'
          },
          items: [{
            itemType: 'tabbed',
            tabs: [{
              title: 'Test Tab 1',
              items: ['EmployeeID']
            }, {
              title: 'Test Tab 2',
              items: [{
                itemType: 'group',
                caption: 'Test Group 1',
                items: ['FirstName', 'LastName']
              }]
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        var innerGroupItem = form.itemOption('TestTab2.TestGroup1.FirstName');
        assert.deepEqual(innerGroupItem, {dataField: 'FirstName'}, 'corrected item received');
      });
      QUnit.test('\'itemOption\' should get item by composite path use the name option', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {LastName: 'Last Name'},
          items: [{
            itemType: 'group',
            caption: 'My Custom Group',
            name: 'testGroup',
            items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'My Custom Tab',
                name: 'tab1',
                items: [{
                  name: 'simpleItem',
                  dataField: 'LastName'
                }]
              }]
            }]
          }]
        });
        var form = $testContainer.dxForm('instance');
        var item = form.itemOption('testGroup.tab1.simpleItem');
        assert.deepEqual(item.dataField, 'LastName', 'data field of item');
      });
      QUnit.test('\'itemOption\' should get a group item by the name option', function(assert) {
        var $testContainer = $('#form').dxForm({
          formData: {LastName: 'Last Name'},
          items: [{
            itemType: 'group',
            name: 'testGroup',
            items: [{
              name: 'simpleItem',
              dataField: 'LastName'
            }]
          }]
        });
        var item = $testContainer.dxForm('instance').itemOption('testGroup');
        assert.ok(!!item, 'get a group item');
        assert.equal(item.itemType, 'group', 'It\'s a group item');
        assert.deepEqual(item.items, [{
          name: 'simpleItem',
          dataField: 'LastName'
        }], 'has correct items');
      });
      QUnit.test('The exception is not thrown when option of an unknown item is changed', function(assert) {
        var form = $('#form').dxForm({formData: {name: 'Name'}}).dxForm('instance');
        form.itemOption('lastName', 'cssClass', 'custom-class');
        assert.equal(form.$element().find('.custom-class').length, 0, 'custom css class is not found');
      });
      QUnit.test('No errors should occur on form reset twice when dxNumberBox is set as item with visible=false (T1146107)', function(assert) {
        var form = $('#form').dxForm({items: [{
            itemType: 'group',
            items: [{
              editorType: 'dxNumberBox',
              dataField: 'TestField'
            }]
          }]}).dxForm('instance');
        form.itemOption('TestField', 'visible', false);
        form.resetValues();
        form.resetValues();
        assert.ok(true, 'There are no exceptions');
      });
      QUnit.test('The exception is not thrown when tabs property in TabbedItem is not defined (T1151539)', function(assert) {
        try {
          $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabPanelOptions: {deferRendering: false}
            }]});
        } catch (e) {
          assert.ok(false, e);
        } finally {
          assert.ok(true, 'the exception is not thrown');
        }
      });
      [false, true].forEach(function(useItemOption) {
        var optionWay = useItemOption ? 'itemOption' : 'option';
        QUnit.test(("Changing an editor/button options without re-render Form when use the " + optionWay + " method (T311892, T681241)"), function(assert) {
          var form = $('#form').dxForm({
            formData: {
              lastName: 'Kyle',
              firstName: 'John'
            },
            items: [{
              dataField: 'firstName',
              editorType: 'dxTextBox',
              editorOption: {
                width: 100,
                height: 20
              }
            }, {
              dataField: 'lastName',
              editorType: 'dxTextBox',
              editorOption: {
                width: 100,
                height: 20
              }
            }, {
              name: 'button',
              itemType: 'button',
              buttonOptions: {
                width: 100,
                height: 20
              }
            }]
          }).dxForm('instance');
          var formInvalidateSpy = sinon.spy(form, '_invalidate');
          var editorOptions = {
            width: 80,
            height: 40
          };
          var buttonOptions = {
            width: 10,
            height: 20
          };
          if (useItemOption) {
            form.itemOption('lastName', 'editorOptions', editorOptions);
            form.itemOption('button', 'buttonOptions', buttonOptions);
          } else {
            form.option('items[1].editorOptions', editorOptions);
            form.option('items[2].buttonOptions', buttonOptions);
          }
          var editor = $('#form .dx-textbox').last().dxTextBox('instance');
          var button = $('#form .dx-button').last().dxButton('instance');
          assert.deepEqual(form.option('items[1].editorOptions'), {
            width: 80,
            height: 40
          }, 'correct editor options');
          assert.deepEqual(form.option('items[2].buttonOptions'), {
            width: 10,
            height: 20
          }, 'correct button options');
          assert.equal(formInvalidateSpy.callCount, 0, 'Invalidate does not called');
          assert.equal(editor.option('width'), 80, 'Correct editor width');
          assert.equal(editor.option('height'), 40, 'Correct editor height');
          assert.equal(button.option('width'), 10, 'Correct button width');
          assert.equal(button.option('height'), 20, 'Correct button height');
        });
        QUnit.test(("Changing the editorOptions of a sub item without re-render Form when use the " + optionWay + " method (T316522)"), function(assert) {
          var form = $('#form').dxForm({
            formData: {
              lastName: 'Kyle',
              firstName: 'John'
            },
            items: [{
              itemType: 'group',
              items: [{
                itemType: 'group',
                items: [{
                  dataField: 'firstName',
                  editorType: 'dxTextBox',
                  editorOptions: {
                    width: 100,
                    height: 20
                  }
                }, {
                  dataField: 'lastName',
                  editorType: 'dxTextBox',
                  editorOptions: {
                    width: 100,
                    height: 20
                  }
                }]
              }]
            }]
          }).dxForm('instance');
          var editorOptions = {
            width: 80,
            height: 40
          };
          if (useItemOption) {
            form.itemOption('lastName', 'editorOptions', editorOptions);
          } else {
            form.option('items[0].items[0].items[1].editorOptions', editorOptions);
          }
          var secondEditor = $('#form .dx-textbox').last().dxTextBox('instance');
          assert.equal(secondEditor.option('width'), 80, 'Correct width');
          assert.equal(secondEditor.option('height'), 40, 'Correct height');
        });
        QUnit.test(("The editorOptions correctly updates in case when only item name is defined and use the " + optionWay + " method"), function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              items: [{
                itemType: 'group',
                items: [{
                  name: 'firstName',
                  editorType: 'dxTextBox',
                  editorOptions: {
                    width: 100,
                    height: 20
                  }
                }, {
                  name: 'lastName',
                  editorType: 'dxTextBox',
                  editorOptions: {
                    width: 100,
                    height: 20
                  }
                }]
              }]
            }]}).dxForm('instance');
          var invalidateSpy = sinon.spy(form, '_invalidate');
          var editorOptions = {
            width: 80,
            height: 40
          };
          if (useItemOption) {
            form.itemOption('lastName', 'editorOptions', editorOptions);
          } else {
            form.option('items[0].items[0].items[1].editorOptions', editorOptions);
          }
          var secondEditor = $('#form .dx-textbox').last().dxTextBox('instance');
          assert.equal(invalidateSpy.callCount, 0, 'dxForm wasn\'t invalidated');
          assert.equal(secondEditor.option('width'), 80, 'Correct width');
          assert.equal(secondEditor.option('height'), 40, 'Correct height');
        });
        QUnit.test('Change editor/button options when item is hidden via api', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'simple',
              editorType: 'dxTextBox',
              name: 'item0'
            }, {
              itemType: 'button',
              name: 'item1'
            }]}).dxForm('instance');
          var setItemOption = function(index, optionName, value) {
            if (useItemOption) {
              form.itemOption(("item" + index), optionName, value);
            } else {
              form.option(("items[" + index + "]." + optionName), value);
            }
          };
          setItemOption(0, 'visible', false);
          setItemOption(0, 'editorOptions', {width: 200});
          setItemOption(1, 'visible', false);
          setItemOption(1, 'buttonOptions', {width: 100});
          assert.equal(form.getEditor('item1'), undefined, 'editor of first item');
          assert.equal(form.getButton('item2'), undefined, 'button of second item');
          assert.deepEqual(form.option('items[0].editorOptions'), {width: 200}, 'editor options of first item');
          assert.deepEqual(form.option('items[1].buttonOptions'), {width: 100}, 'button options of second item');
        });
        QUnit.test(("Set a new validation rules when groups are nested one into another and use the " + optionWay + " method"), function(assert) {
          var form = $('#form').dxForm({
            formData: {
              name: null,
              lastName: null
            },
            showValidationSummary: true,
            items: [{
              itemType: 'group',
              name: 'group1',
              items: [{dataField: 'name'}, {
                itemType: 'group',
                name: 'group2',
                items: [{dataField: 'lastName'}]
              }]
            }]
          }).dxForm('instance');
          form.beginUpdate();
          if (useItemOption) {
            form.itemOption('group1.name', 'validationRules', [{
              type: 'required',
              message: 'Name is required'
            }]);
            form.itemOption('group1.group2.lastName', 'validationRules', [{
              type: 'required',
              message: 'Last Name is required'
            }]);
          } else {
            form.option('items[0].items[0].validationRules', [{
              type: 'required',
              message: 'Name is required'
            }]);
            form.option('items[0].items[1].items[0].validationRules', [{
              type: 'required',
              message: 'Last Name is required'
            }]);
          }
          form.endUpdate();
          form.validate();
          var $summaryItemContents = $('.dx-validationsummary-item-content');
          assert.equal($summaryItemContents.length, 2, 'validation summary items count');
          assert.equal($summaryItemContents.eq(0).text(), 'Name is required', 'text of the first summary item');
          assert.equal($summaryItemContents.eq(1).text(), 'Last Name is required', 'text of the second summary item');
        });
        QUnit.test(("Set a new validation rules when tabs are nested into a group and use the " + optionWay + " method"), function(assert) {
          var form = $('#form').dxForm({
            formData: {
              name: null,
              lastName: null
            },
            showValidationSummary: true,
            items: [{
              itemType: 'group',
              name: 'group1',
              items: [{dataField: 'name'}, {
                itemType: 'tabbed',
                tabs: [{
                  title: 'title1',
                  items: [{dataField: 'lastName'}]
                }]
              }]
            }]
          }).dxForm('instance');
          form.beginUpdate();
          if (useItemOption) {
            form.itemOption('group1.name', 'validationRules', [{
              type: 'required',
              message: 'Name is required'
            }]);
            form.itemOption('group1.title1.lastName', 'validationRules', [{
              type: 'required',
              message: 'Last Name is required'
            }]);
          } else {
            form.option('items[0].items[0].validationRules', [{
              type: 'required',
              message: 'Name is required'
            }]);
            form.option('items[0].items[1].tabs[0].items[0].validationRules', [{
              type: 'required',
              message: 'Last Name is required'
            }]);
          }
          form.endUpdate();
          form.validate();
          var $summaryItemContents = $('.dx-validationsummary-item-content');
          assert.equal($summaryItemContents.length, 2, 'validation summary items count');
          assert.equal($summaryItemContents.eq(0).text(), 'Name is required', 'text of the first summary item');
          assert.equal($summaryItemContents.eq(1).text(), 'Last Name is required', 'text of the second summary item');
        });
      });
      QUnit.test('Changing the item\'s option via the itemOption when these options are set as object without re-render form', function(assert) {
        var form = $('#form').dxForm({
          formData: {name: 'Test Name'},
          items: [{
            dataField: 'name',
            editorOption: {width: 100},
            cssClass: 'test'
          }]
        }).dxForm('instance');
        var formInvalidateSpy = sinon.spy(form, '_invalidate');
        form.itemOption('name', {
          editorOptions: {height: 120},
          cssClass: 'test-class'
        });
        assert.equal(formInvalidateSpy.callCount, 0, 'Invalidate does not called');
        var editor = form.getEditor('name');
        assert.equal(editor.option('height'), 120, 'height of editor options');
        var $form = $('#form');
        assert.strictEqual($form.find('.test-class').length, 1, 'new cssClass of item');
        assert.strictEqual($form.find('.test').length, 0, 'old cssClass of item');
      });
      QUnit.test('Changing the item\'s option via the itemOption when these options are set as object with re-render form', function(assert) {
        var form = $('#form').dxForm({
          formData: {name: 'Test Name'},
          items: [{dataField: 'name'}]
        }).dxForm('instance');
        var formInvalidateSpy = sinon.spy(form, '_invalidate');
        form.itemOption('name', {
          colSpan: 2,
          cssClass: 'test-class'
        });
        assert.equal(formInvalidateSpy.callCount, 1, 'Invalidate does not called');
        assert.equal(form.option('items[0].colSpan'), 2, 'colSpan of item');
        assert.strictEqual($('#form').find('.test-class').length, 1, 'cssClass of item');
      });
      QUnit.module('visible/visibleIndex', function() {
        QUnit.test('item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: true
            }, {
              dataField: 'field2',
              visible: true
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: true,
              visibleIndex: 0
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 1
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: true,
              visibleIndex: 1
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 0
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: true,
              visibleIndex: 2
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 3
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: true,
              visibleIndex: 5
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 2
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('item1.visible:false -> item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: false
            }, {
              dataField: 'field2',
              visible: true
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_1');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('item1.visible:false -> item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: false,
              visibleIndex: 0
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 1
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('item1.visible:false -> item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: false,
              visibleIndex: 1
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 0
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('item1.visible:false -> item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: false,
              visibleIndex: 2
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 5
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('item1.visible:false -> item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              dataField: 'field1',
              visible: false,
              visibleIndex: 5
            }, {
              dataField: 'field2',
              visible: true,
              visibleIndex: 2
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('group.item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              items: [{
                dataField: 'field1',
                visible: true
              }, {
                dataField: 'field2',
                visible: true
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('group.item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              items: [{
                dataField: 'field1',
                visible: true,
                visibleIndex: 0
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 1
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('group.item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              items: [{
                dataField: 'field1',
                visible: true,
                visibleIndex: 1
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 0
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('group.item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              items: [{
                dataField: 'field1',
                visible: true,
                visibleIndex: 2
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 3
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('group.item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              items: [{
                dataField: 'field1',
                visible: true,
                visibleIndex: 5
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 2
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('group.item1.visible:false -> group.item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false
              }, {
                dataField: 'field2',
                visible: true
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('group.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_1');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('group.item1.visible:false -> group.item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false,
                visibleIndex: 0
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 1
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('group.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('group.item1.visible:false -> group.item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false,
                visibleIndex: 1
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 0
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('group.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('group.item1.visible:false -> group.item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false,
                visibleIndex: 2
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 5
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('group.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('group.item1.visible:false -> group.item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              colCount: 1,
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false,
                visibleIndex: 5
              }, {
                dataField: 'field2',
                visible: true,
                visibleIndex: 2
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('group.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('tabbedGroup.item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: true
                }, {
                  dataField: 'field2',
                  visible: true
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('tabbedGroup.item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: true,
                  visibleIndex: 0
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 1
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('tabbedGroup.item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: true,
                  visibleIndex: 1
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 0
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('tabbedGroup.item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: true,
                  visibleIndex: 2
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 3
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field1', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field2', 'inputs');
        });
        QUnit.test('tabbedGroup.item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: true,
                  visibleIndex: 5
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 2
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2', 'inputs');
          assert.equal($inputs.eq(1).attr('name'), 'field1', 'inputs');
        });
        QUnit.test('tabbedGroup.item1.visible:false -> tabbedGroup.item1.visible:true (no visibleIndex)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false
                }, {
                  dataField: 'field2',
                  visible: true
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('tabbed.tab.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_1');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('tabbedGroup.item1.visible:false -> tabbedGroup.item1.visible:true (sequential visibleIndex starting from 0)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false,
                  visibleIndex: 0
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 1
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('tabbed.tab.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('tabbedGroup.item1.visible:false -> tabbedGroup.item1.visible:true (sequantial visibleIndex starting from 0 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false,
                  visibleIndex: 1
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 0
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('tabbed.tab.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('tabbedGroup.item1.visible:false -> tabbedGroup.item1.visible:true (non sequensial visibleIndex starting from 2)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false,
                  visibleIndex: 2
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 5
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('tabbed.tab.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field1', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field2', 'inputs_2');
        });
        QUnit.test('tabbedGroup.item1.visible:false -> tabbedGroup.item1.visible:true (non sequantial visibleIndex starting from 2 does not fit with items order)', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false,
                  visibleIndex: 5
                }, {
                  dataField: 'field2',
                  visible: true,
                  visibleIndex: 2
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.eq(0).attr('name'), 'field2');
          form.itemOption('tabbed.tab.field1', 'visible', true);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.eq(0).attr('name'), 'field2', 'inputs_2');
          assert.equal($inputs_2.eq(1).attr('name'), 'field1', 'inputs_2');
        });
        QUnit.test('group.all.visible:false -> group.item1.visible:true,group.item2.visible:false (no visibleIndex), useUpdate=false', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false
              }, {
                dataField: 'field2',
                visible: false
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.length, 0);
          form.itemOption('group.field1', 'visible', true);
          form.itemOption('group.field2', 'visible', false);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.length, 1);
          assert.equal($inputs_2.eq(0).attr('name'), 'field1');
        });
        QUnit.test('group.all.visible:false -> group.item1.visible:true,group.item2.visible:false (no visibleIndex), useUpdate=true', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'group',
              name: 'group',
              items: [{
                dataField: 'field1',
                visible: false
              }, {
                dataField: 'field2',
                visible: false
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.length, 0);
          form.beginUpdate();
          form.itemOption('group.field1', 'visible', true);
          form.itemOption('group.field2', 'visible', false);
          form.endUpdate();
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.length, 1);
          assert.equal($inputs_2.eq(0).attr('name'), 'field1');
        });
        QUnit.test('tabbedGroup.all.visible:false -> tabbedGroup.item1.visible:true, tabbedGroup.item2.visible:false (no visibleIndex), useUpdate=false', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false
                }, {
                  dataField: 'field2',
                  visible: false
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.length, 0);
          form.itemOption('tabbed.tab.field1', 'visible', true);
          form.itemOption('tabbed.tab.field2', 'visible', false);
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.length, 1);
          assert.equal($inputs_2.eq(0).attr('name'), 'field1');
        });
        QUnit.test('tabbedGroup.all.visible:false -> tabbedGroup.item1.visible:true, tabbedGroup.item2.visible:false (no visibleIndex), useUpdate=true', function(assert) {
          var form = $('#form').dxForm({items: [{
              itemType: 'tabbed',
              name: 'tabbed',
              tabs: [{
                title: 'tab',
                items: [{
                  dataField: 'field1',
                  visible: false
                }, {
                  dataField: 'field2',
                  visible: false
                }]
              }]
            }]}).dxForm('instance');
          var $inputs = form.$element().find('input');
          assert.equal($inputs.length, 0);
          form.beginUpdate();
          form.itemOption('tabbed.tab.field1', 'visible', true);
          form.itemOption('tabbed.tab.field2', 'visible', false);
          form.endUpdate();
          var $inputs_2 = form.$element().find('input');
          assert.equal($inputs_2.length, 1);
          assert.equal($inputs_2.eq(0).attr('name'), 'field1');
        });
      });
      QUnit.test('resetValues - old test', function(assert) {
        var form = $('#form').dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            room: 1,
            isDeveloper: true
          },
          items: ['name', 'lastName', 'room', 'isDeveloper']
        }).dxForm('instance');
        form.resetValues();
        assert.strictEqual(form.getEditor('name').option('value'), '', 'editor for the name dataField');
        assert.strictEqual(form.getEditor('lastName').option('value'), '', 'editor for the lastName dataField');
        assert.strictEqual(form.getEditor('room').option('value'), null, 'editor for the room dataField');
        assert.strictEqual(form.getEditor('isDeveloper').option('value'), false, 'editor for the isDeveloper dataField');
      });
      QUnit.test('resetValues - clear formData and editors', function(assert) {
        var formData = {
          dxAutocomplete: 'a',
          dxCalendar: new Date(2019, 1, 1),
          dxCheckBox: true,
          dxColorBox: 'a',
          dxDateBox: new Date(2019, 1, 1),
          dxDropDownBox: '1',
          dxHtmlEditor: 'a',
          dxLookup: '1',
          dxNumberBox: 1,
          dxRadioGroup: '1',
          dxSelectBox: '1',
          dxTagBox: ['1'],
          dxTextArea: 'a',
          dxTextBox: 'a'
        };
        var formItems = [{
          dataField: 'dxAutocomplete',
          editorType: 'dxAutocomplete'
        }, {
          dataField: 'dxCalendar',
          editorType: 'dxCalendar'
        }, {
          dataField: 'dxCheckBox',
          editorType: 'dxCheckBox'
        }, {
          dataField: 'dxDateBox',
          editorType: 'dxDateBox'
        }, {
          dataField: 'dxDropDownBox',
          editorType: 'dxDropDownBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxHtmlEditor',
          editorType: 'dxHtmlEditor'
        }, {
          dataField: 'dxLookup',
          editorType: 'dxLookup',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxNumberBox',
          editorType: 'dxNumberBox'
        }, {
          dataField: 'dxRadioGroup',
          editorType: 'dxRadioGroup',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxSelectBox',
          editorType: 'dxSelectBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxTagBox',
          editorType: 'dxTagBox',
          editorOptions: {dataSource: ['1']}
        }, {
          dataField: 'dxTextArea',
          editorType: 'dxTextArea'
        }, {
          dataField: 'dxTextBox',
          editorType: 'dxTextBox'
        }];
        var form = $('#form').dxForm({
          formData: formData,
          items: formItems
        }).dxForm('instance');
        form.resetValues();
        var defaultResetValue = null;
        var stringEditorResetValue = '';
        var dxCheckBoxResetValue = false;
        var dxTagBoxResetValue = [];
        assert.strictEqual(formData.dxAutocomplete, defaultResetValue, 'formData.dxAutocomplete');
        assert.strictEqual(formData.dxCalendar, defaultResetValue, 'formData.dxCalendar');
        assert.strictEqual(formData.dxCheckBox, dxCheckBoxResetValue, 'formData.dxCheckBox');
        assert.strictEqual(formData.dxDateBox, defaultResetValue, 'formData.dxDateBox');
        assert.strictEqual(formData.dxDropDownBox, defaultResetValue, 'formData.dxDropDownBox');
        assert.strictEqual(formData.dxHtmlEditor, defaultResetValue, 'formData.dxHtmlEditor');
        assert.strictEqual(formData.dxLookup, defaultResetValue, 'formData.dxLookup');
        assert.strictEqual(formData.dxNumberBox, defaultResetValue, 'formData.dxNumberBox');
        assert.strictEqual(formData.dxRadioGroup, defaultResetValue, 'formData.dxRadioGroup');
        assert.strictEqual(formData.dxSelectBox, defaultResetValue, 'formData.dxSelectBox');
        assert.strictEqual(formData.dxTagBox.length, dxTagBoxResetValue.length, 'formData.dxTagBox.length');
        assert.strictEqual(formData.dxTextArea, stringEditorResetValue, 'formData.dxTextArea');
        assert.strictEqual(formData.dxTextBox, stringEditorResetValue, 'formData.dxTextBox');
        assert.strictEqual(form.getEditor('dxAutocomplete').option('value'), defaultResetValue, 'form.getEditor.dxAutocomplete');
        assert.strictEqual(form.getEditor('dxCalendar').option('value'), defaultResetValue, 'form.getEditor.dxCalendar');
        assert.strictEqual(form.getEditor('dxCheckBox').option('value'), dxCheckBoxResetValue, 'form.getEditor.dxCheckBox');
        assert.strictEqual(form.getEditor('dxDateBox').option('value'), defaultResetValue, 'form.getEditor.dxDateBox');
        assert.strictEqual(form.getEditor('dxDropDownBox').option('value'), defaultResetValue, 'form.getEditor.dxDropDownBox');
        assert.strictEqual(form.getEditor('dxHtmlEditor').option('value'), defaultResetValue, 'form.getEditor.dxHtmlEditor');
        assert.strictEqual(form.getEditor('dxLookup').option('value'), defaultResetValue, 'form.getEditor.dxLookup');
        assert.strictEqual(form.getEditor('dxNumberBox').option('value'), defaultResetValue, 'form.getEditor.dxNumberBox');
        assert.strictEqual(form.getEditor('dxRadioGroup').option('value'), defaultResetValue, 'form.getEditor.dxRadioGroup');
        assert.strictEqual(form.getEditor('dxSelectBox').option('value'), defaultResetValue, 'form.getEditor.dxSelectBox');
        assert.strictEqual(form.getEditor('dxTagBox').option('value').length, dxTagBoxResetValue.length, 'form.getEditor.dxTagBox');
        assert.strictEqual(form.getEditor('dxTextArea').option('value'), stringEditorResetValue, 'form.getEditor.dxTextArea');
        assert.strictEqual(form.getEditor('dxTextBox').option('value'), stringEditorResetValue, 'form.getEditor.dxTextBox');
      });
      formatTestValue = function(value) {
        return Array.isArray(value) ? '[]' : value;
      };
      [undefined, null, []].forEach(function(groupItems) {
        QUnit.test(("Change group items from [1] -> " + formatTestValue(groupItems)), function(assert) {
          var form = $('#form').dxForm({
            formData: {field: 'Test'},
            items: [{
              itemType: 'group',
              name: 'TestGroup',
              items: ['field']
            }]
          }).dxForm('instance');
          form.itemOption('TestGroup', 'items', groupItems);
          var $layoutManager = $(("." + FORM_GROUP_CONTENT_CLASS + " > ." + FORM_LAYOUT_MANAGER_CLASS));
          assert.equal($layoutManager.length, 1, 'layout manager is rendered');
          assert.notOk($layoutManager.children().length, 'layout manager content is empty');
          assert.notOk(form.getEditor('field'), 'editor is not created');
        });
      });
      [undefined, null, []].forEach(function(tabbedItems) {
        QUnit.test(("Change tabbed items from [1] -> " + formatTestValue(tabbedItems)), function(assert) {
          var form = $('#form').dxForm({
            formData: {field: 'Test'},
            items: [{
              itemType: 'tabbed',
              tabs: [{
                name: 'TestTabbedItem',
                items: ['field']
              }]
            }]
          }).dxForm('instance');
          form.itemOption('TestTabbedItem', 'items', tabbedItems);
          var $layoutManager = $(("." + MULTIVIEW_ITEM_CONTENT_CLASS + " > ." + FORM_LAYOUT_MANAGER_CLASS));
          assert.equal($layoutManager.length, 1, 'layout manager is rendered');
          assert.notOk($layoutManager.children().length, 'layout manager content is empty');
          assert.notOk(form.getEditor('field'), 'editor is not created');
        });
      });
      QUnit.module('Adaptivity', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit.test('One column screen should be customizable with screenByWidth option on init', function(assert) {
        var $form = $('#form');
        $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            room: 1,
            isDeveloper: true
          },
          colCount: 2,
          screenByWidth: function() {
            return 'xs';
          },
          items: ['name', 'lastName', 'room', 'isDeveloper']
        });
        assert.equal($form.find('.dx-layout-manager-one-col').length, 1, 'single column screen was changed');
        assert.equal($form.find('.dx-single-column-item-content').length, 4, 'There are 4 items in the column');
      });
      QUnit.test('One column screen should be customizable with screenByWidth option on option change', function(assert) {
        var $form = $('#form');
        var form = $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            room: 1,
            isDeveloper: true
          },
          colCount: 2,
          screenByWidth: function() {
            return 'md';
          },
          items: ['name', 'lastName', 'room', 'isDeveloper']
        }).dxForm('instance');
        assert.equal($form.find('.dx-single-column-item-content').length, 0, 'There are no single column items');
        form.option('screenByWidth', function() {
          return 'xs';
        });
        assert.equal($form.find('.dx-single-column-item-content').length, 4, 'There are 4 items in the column');
        assert.equal($form.find('.dx-layout-manager-one-col').length, 1, 'single column screen was changed');
      });
      QUnit.test('Column count may depend on screen factor', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            room: 1,
            isDeveloper: true
          },
          colCountByScreen: {
            sm: 1,
            md: 2
          },
          screenByWidth: function() {
            return screen;
          },
          items: ['name', 'lastName', 'room', 'isDeveloper']
        });
        assert.equal($form.find('.dx-first-col.dx-last-col').length, 0, 'more than one column exists');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.equal($form.find('.dx-first-col.dx-last-col').length, 4, 'only one column exists');
      });
      QUnit.test('Column count ignores hide/show scroller when rerendering if screen factor changed', function(assert) {
        var originalGetDocumentElement = domAdapter.getDocumentElement;
        try {
          var largeScreenWidth = 1200;
          var mediumScreenWidth = 1199;
          var width = largeScreenWidth;
          var height = 300;
          var scrollerWidth = 17;
          domAdapter.getDocumentElement = function() {
            return {
              clientWidth: width,
              clientHeight: height
            };
          };
          var $form = $('#form');
          $form.dxForm({
            labelLocation: 'left',
            colCountByScreen: {
              lg: 2,
              md: 1
            },
            items: [{
              name: 'f1',
              editorType: 'dxTextBox',
              editorOptions: {onDisposing: function() {
                  width = mediumScreenWidth + scrollerWidth;
                }}
            }, 'f2']
          });
          assert.equal($form.find('.dx-col-0').length, 1, '(.dx-col-0).length initial');
          assert.equal($form.find('.dx-col-1').length, 1, '(.dx-col-1).length initial');
          width = mediumScreenWidth;
          resizeCallbacks.fire();
          assert.equal($form.find('.dx-col-0').length, 2, '(.dx-col-0).length current');
          assert.equal($form.find('.dx-col-1').length, 0, '(.dx-col-1).length current');
        } finally {
          domAdapter.getDocumentElement = originalGetDocumentElement;
        }
      });
      QUnit.test('Form should repaint once when screen factor changed', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        var form = $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            room: 1,
            isDeveloper: true
          },
          colCountByScreen: {
            sm: 1,
            md: 2
          },
          screenByWidth: function() {
            return screen;
          },
          items: ['name', 'lastName', 'sex', 'room', 'isDeveloper']
        }).dxForm('instance');
        var refreshStub = sinon.stub(form, '_refresh');
        screen = 'sm';
        resizeCallbacks.fire();
        resizeCallbacks.fire();
        assert.equal(refreshStub.callCount, 1, 'refresh called once');
      });
      QUnit.test('Form doesn\'t redraw layout when colCount doesn\'t changed', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        var form = $form.dxForm({
          screenByWidth: function() {
            return screen;
          },
          items: [{
            name: 'test',
            editorType: 'dxTextBox',
            editorOptions: {value: 'Test'}
          }]
        }).dxForm('instance');
        form.getEditor('test').option('value', 'Changed');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.equal(form.getEditor('test').option('value'), 'Changed', 'Editor keeps old value');
      });
      QUnit.test('Form doesn\'t redraw layout when colCount doesn\'t changed and colCountByScreen option defined', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        var form = $form.dxForm({
          screenByWidth: function() {
            return screen;
          },
          colCountByScreen: {
            sm: 2,
            md: 2
          },
          items: [{
            name: 'test',
            editorType: 'dxTextBox',
            editorOptions: {value: 'Test'}
          }]
        }).dxForm('instance');
        form.getEditor('test').option('value', 'Changed');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.equal(form.getEditor('test').option('value'), 'Changed', 'Editor keeps old value');
      });
      QUnit.test('Form is not redrawn when colCount doesn\'t change (\'colCount\' and \'colCountByScreen\' options are defined)', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        var initCount = 0;
        $form.dxForm({
          screenByWidth: function() {
            return screen;
          },
          colCount: 1,
          colCountByScreen: {
            sm: 2,
            md: 2
          },
          items: [{
            name: 'test',
            editorType: 'dxTextBox',
            editorOptions: {onInitialized: function() {
                initCount++;
              }}
          }]
        });
        assert.equal(initCount, 1, 'Editor is initialized');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.equal(initCount, 1, 'colCount doesn\'t changed, editor doesn\'t rerender');
        screen = 'lg';
        resizeCallbacks.fire();
        assert.equal(initCount, 2, 'colCount is changed, editor is rerender');
        screen = 'xs';
        resizeCallbacks.fire();
        assert.equal(initCount, 2, 'colCount doesn\'t changed, editor doesn\'t rerender');
      });
      QUnit.test('Column count for group may depend on screen factor', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name',
            gender: 'Male',
            room: 1,
            isDeveloper: true
          },
          screenByWidth: function() {
            return screen;
          },
          items: [{
            itemType: 'group',
            caption: 'Group 1',
            colCount: 1,
            colCountByScreen: {
              sm: 2,
              md: 3
            },
            items: ['name', 'lastName']
          }, {
            itemType: 'group',
            caption: 'Group 2',
            colCount: 2,
            colCountByScreen: {
              sm: 4,
              md: 1
            },
            items: ['sex', 'room', 'isDeveloper']
          }]
        });
        assert.equal($form.find('.dx-group-colcount-3').length, 1, 'first group should have 3 columns');
        assert.equal($form.find('.dx-group-colcount-1').length, 1, 'second group should have 1 column');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.equal($form.find('.dx-group-colcount-2').length, 1, 'first group should have 2 columns');
        assert.equal($form.find('.dx-group-colcount-4').length, 1, 'second group should have 4 columns');
      });
      QUnit.test('Column count for tabs may depend on screen factor', function(assert) {
        var $form = $('#form');
        var screen = 'md';
        $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test',
            gender: 'Male',
            room: 1,
            isDeveloper: true
          },
          screenByWidth: function() {
            return screen;
          },
          items: [{
            itemType: 'tabbed',
            caption: 'Group 1',
            colCount: 1,
            tabs: [{
              colCountByScreen: {
                sm: 2,
                md: 3
              },
              items: ['name', 'lastName', 'gender', 'room', 'isDeveloper']
            }]
          }]
        });
        assert.equal($form.find('.dx-field-item-tab.dx-col-2').length, 1, 'tab has 3 groups on md screen');
        screen = 'sm';
        resizeCallbacks.fire();
        assert.notOk($form.find('.dx-field-item-tab.dx-col-2').length, 'tab has not 3 groups on sm screen');
        assert.ok($form.find('.dx-field-item-tab.dx-col-1').length, 'tab has 2 groups on sm screen');
      });
      QUnit.test('Cached colCount options doesn\'t leak', function(assert) {
        var $form = $('#form');
        var instance = $form.dxForm({
          formData: {
            name: 'User',
            lastName: 'Test Last Name'
          },
          colCount: 2,
          items: [{
            itemType: 'group',
            caption: 'Group 1',
            colCount: 1,
            colCountByScreen: {
              sm: 2,
              md: 3
            },
            items: ['name', 'lastName']
          }]
        }).dxForm('instance');
        assert.equal(instance._cachedColCountOptions.length, 2, 'root + group item colCount options cached');
        instance.option('items', ['name']);
        assert.equal(instance._cachedColCountOptions.length, 1, 'only root colCount options cached');
      });
      QUnit.test('Form refreshes only one time on dimension changed with group layout', function(assert) {
        var $form = $('#form').width(300);
        var screen = 'md';
        var form = $form.dxForm({
          screenByWidth: function() {
            return screen;
          },
          colCount: 'auto',
          minColWidth: 100,
          items: [{
            name: 'test1',
            editorType: 'dxTextBox'
          }, {
            itemType: 'group',
            caption: 'Test group',
            colCount: 'auto',
            minColWidth: 200,
            items: [{
              name: 'test2',
              editorType: 'dxTextBox'
            }, {
              name: 'test3',
              editorType: 'dxTextBox'
            }]
          }]
        }).dxForm('instance');
        var refreshSpy = sinon.spy(form, '_refresh');
        $form.width(100);
        resizeCallbacks.fire();
        this.clock.tick();
        assert.equal(refreshSpy.callCount, 1, 'form has been redraw layout one time');
      });
      QUnit.test('Form redraw layout when colCount is \'auto\' and an calculated colCount changed', function(assert) {
        var $form = $('#form').width(300);
        var screen = 'md';
        var form = $form.dxForm({
          screenByWidth: function() {
            return screen;
          },
          colCount: 'auto',
          minColWidth: 100,
          items: [{
            name: 'test1',
            editorType: 'dxTextBox'
          }, {
            name: 'test2',
            editorType: 'dxTextBox'
          }]
        }).dxForm('instance');
        var refreshSpy = sinon.spy(form, '_refresh');
        $form.width(100);
        resizeCallbacks.fire();
        this.clock.tick();
        assert.equal(refreshSpy.callCount, 1, 'form has been redraw layout');
      });
      QUnit.test('group colCountByScreen property change should update layout', function(assert) {
        var form = $('#form').dxForm({
          screenByWidth: function() {
            return 'md';
          },
          items: [{
            itemType: 'group',
            colCountByScreen: {md: 1},
            items: ['name', 'email']
          }]
        }).dxForm('instance');
        form.option('items[0].colCountByScreen.md', 2);
        assert.strictEqual(getColsCountFromDOM(form.$element()), 2);
      });
      QUnit.test('nested group colCountByScreen property change should update layout', function(assert) {
        var form = $('#form').dxForm({
          screenByWidth: function() {
            return 'md';
          },
          items: [{
            itemType: 'group',
            items: [{
              itemType: 'group',
              colCountByScreen: {md: 2},
              items: ['Phone', 'Email']
            }]
          }]
        }).dxForm('instance');
        form.option('items[0].items[0].colCountByScreen.md', 1);
        assert.strictEqual(getColsCountFromDOM(form.$element()), 1);
      });
      QUnit.test('tab colCountByScreen property change should update layouts', function(assert) {
        var form = $('#form').dxForm({
          screenByWidth: function() {
            return 'md';
          },
          items: [{
            itemType: 'tabbed',
            tabs: [{
              items: ['Phone', 'Email'],
              colCountByScreen: {md: 2}
            }]
          }]
        }).dxForm('instance');
        form.option('items[0].tabs[0].colCountByScreen.md', 1);
        assert.strictEqual(getColsCountFromDOM(form.$element()), 1);
      });
      QUnit.test('colCountByScreen property change with itemOption should update layout', function(assert) {
        var form = $('#form').dxForm({
          screenByWidth: function() {
            return 'md';
          },
          items: [{
            itemType: 'tabbed',
            name: 'groupName',
            tabs: [{
              name: 'tabName',
              items: ['Phone', 'Email'],
              colCountByScreen: {md: 1}
            }]
          }]
        }).dxForm('instance');
        form.itemOption('groupName.tabName', 'colCountByScreen.md', 2);
        assert.strictEqual(getColsCountFromDOM(form.$element()), 2);
      });
      [{
        screenWidth: 1500,
        expectedSize: 'lg'
      }, {
        screenWidth: 1000,
        expectedSize: 'md'
      }, {
        screenWidth: 900,
        expectedSize: 'sm'
      }, {
        screenWidth: 700,
        expectedSize: 'xs'
      }].forEach(function(testConfig) {
        QUnit.test(("Default implementation of screenByWidth. Screen size: " + testConfig.screenWidth), function(assert) {
          var getDocumentElementStub = sinon.stub(domAdapter, 'getDocumentElement').returns({clientWidth: testConfig.screenWidth});
          var config = {
            colCountByScreen: {
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4
            },
            items: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          };
          var $form = $('#form').dxForm(config);
          var colsCount = getColsCountFromDOM($form);
          assert.equal(colsCount, config.colCountByScreen[testConfig.expectedSize], 'form has correct columns count');
          getDocumentElementStub.restore();
        });
      });
      ['globalOption', 'instanceOption'].forEach(function(optionType) {
        QUnit.test(("Setting screen by width. Use " + optionType), function(assert) {
          var defaultCustomRules = Form._classCustomRules;
          var globalOptionStub = sinon.stub().returns('xs');
          var instanceOptionStub = sinon.stub().returns('xs');
          var defaultFunctionStub = sinon.spy(windowModule, 'defaultScreenFactorFunc');
          var config = {
            colCountByScreen: {
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4
            },
            items: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          };
          if (optionType === 'globalOption') {
            Form.defaultOptions({options: {screenByWidth: globalOptionStub}});
          } else if (optionType === 'instanceOption') {
            config['screenByWidth'] = instanceOptionStub;
          }
          var $form = $('#form').dxForm(config);
          assert.equal(globalOptionStub.called, optionType === 'globalOption', 'global function is called');
          assert.equal(instanceOptionStub.called, optionType === 'instanceOption', 'instance function is called');
          assert.equal(defaultFunctionStub.called, 0, 'default function is called');
          var colsCount = getColsCountFromDOM($form);
          assert.equal(colsCount, 1, 'form has correct columns count');
          Form._classCustomRules = defaultCustomRules;
          defaultFunctionStub.restore();
        });
      });
      QUnit.module('Form when rtlEnabled is true');
      QUnit.test('required mark aligned when rtlEnabled option is set to true', function(assert) {
        var $testContainer = $('#form').dxForm({
          requiredMark: '!',
          rtlEnabled: true,
          items: [{
            dataField: 'name',
            isRequired: true
          }]
        });
        var $labelsContent = $testContainer.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        var $requiredLabel = $labelsContent.find(("." + FIELD_ITEM_LABEL_TEXT_CLASS));
        var $requiredMark = $labelsContent.find(("." + FIELD_ITEM_REQUIRED_MARK_CLASS));
        $labelsContent.width(200);
        assert.notEqual($labelsContent.offset().left, $requiredMark.offset().left, 'position of requared mark is right');
        assert.ok($requiredLabel.position().left > $requiredMark.position().left, 'required mark should be before of the text');
      });
      QUnit.test('optional mark aligned when rtlEnabled option is set to true', function(assert) {
        var $testContainer = $('#form').dxForm({
          optionalMark: 'optMark',
          showOptionalMark: true,
          rtlEnabled: true,
          items: ['position']
        });
        var $labelsContent = $testContainer.find(("." + FIELD_ITEM_LABEL_CONTENT_CLASS));
        var $optionalLabel = $labelsContent.find(("." + FIELD_ITEM_LABEL_TEXT_CLASS));
        var $optionalMark = $labelsContent.find(("." + FIELD_ITEM_OPTIONAL_MARK_CLASS));
        $labelsContent.width(200);
        assert.notEqual($labelsContent.offset().left, $optionalMark.offset().left, 'position of optional mark is right');
        assert.ok($optionalLabel.position().left > $optionalMark.position().left, 'optional mark should be before of the text');
      });
      QUnit.module('Events');
      QUnit.test('Should not skip `optionChanged` event handler that has been added on the `onInitialized` event handler', function(assert) {
        var eventCalls = [];
        var form = $('#form').dxForm({
          formData: {firstName: 'John'},
          onOptionChanged: function() {
            eventCalls.push('onOptionChanged');
          },
          onContentReady: function(e) {
            e.component.on('optionChanged', function() {
              eventCalls.push('optionChanged from `onContentReady`');
            });
          },
          onInitialized: function(e) {
            e.component.on('optionChanged', function() {
              eventCalls.push('optionChanged from `onInitialized`');
            });
          }
        }).dxForm('instance');
        form.option('formData', {lastName: 'John'});
        assert.deepEqual(eventCalls, ['optionChanged from `onInitialized`', 'optionChanged from `onContentReady`', 'onOptionChanged']);
      });
      [2, 3, 'auto'].forEach(function(colCount) {
        [1, undefined].forEach(function(colSpan) {
          QUnit.test(("Form.colCount=" + colCount + ", field.colSpan=" + colSpan + " -> resizeWindow() //T923489"), function(assert) {
            $('#form').dxForm({
              colCount: colCount,
              items: [{
                dataField: 'field1',
                colSpan: 2
              }, {
                dataField: 'field2',
                colSpan: colSpan
              }]
            }).dxForm('instance');
            resizeCallbacks.fire();
            assert.equal(1, 1, 'resize of the form does not freeze the page');
          });
        });
      });
      QUnit.test('Form set the right class to the root element for different global editorStylingMode option', function(assert) {
        var stylingModes = ['filled', 'underlined', 'outlined'];
        stylingModes.forEach(function(mode) {
          var shouldSetClass = mode === 'underlined';
          config({editorStylingMode: mode});
          $('#form').dxForm({});
          assert.equal($('#form').hasClass(FORM_UNDERLINED_CLASS), shouldSetClass, (FORM_UNDERLINED_CLASS + " is " + (shouldSetClass ? '' : 'not') + " set"));
          $('#form').dxForm('instance').dispose();
          config({editorStylingMode: null});
        });
      });
      QUnit.test('Form item stylingMode option should rewrite global editorStylingMode option (T1044604)', function(assert) {
        var stylingModes = [null, 'outlined', 'filled', 'underlined'];
        var defaultStylingMode = TextEditorBase.prototype._getDefaultOptions().stylingMode;
        stylingModes.forEach(function(globalStylingMode) {
          stylingModes.forEach(function(editorStylingMode) {
            if (globalStylingMode) {
              config({editorStylingMode: globalStylingMode});
            }
            $('#form').dxForm({
              formData: {
                field1: '',
                field2: ''
              },
              items: [{dataField: 'field1'}, {
                dataField: 'field2',
                editorOptions: {stylingMode: editorStylingMode}
              }]
            });
            function getExpectedClass(mode) {
              return ("dx-editor-" + (mode ? mode : defaultStylingMode));
            }
            var firstEditorExpectedClass = getExpectedClass(globalStylingMode);
            var secondEditorExpectedClass = getExpectedClass(editorStylingMode || globalStylingMode);
            var form = $('#form').dxForm('instance');
            assert.ok($(form.getEditor('field1').element()).hasClass(firstEditorExpectedClass), ("default editor (global=" + globalStylingMode + "), editor not set"));
            assert.ok($(form.getEditor('field2').element()).hasClass(secondEditorExpectedClass), ("custom editor (global=" + globalStylingMode + ", editor=" + editorStylingMode + ")"));
            form.dispose();
            config({editorStylingMode: null});
          });
        });
      });
      QUnit.test('TagBox.SelectionChanged is raised once if formData is wrapped into a recursive Proxy', function(assert) {
        function wrapToRecursiveProxy(target) {
          var handler = {get: function(obj, prop) {
              var propValue = obj[prop];
              return (propValue !== null && (typeof propValue === 'undefined' ? 'undefined' : $traceurRuntime.typeof(propValue)) === 'object') ? new Proxy(propValue, handler) : propValue;
            }};
          return new Proxy(target, handler);
        }
        var $testContainer = $('#form');
        var formData = {arrayField: ['item1', 'item2']};
        var watchCallbacks = [];
        var onSelectionChangedCounter = 0;
        var form = $testContainer.dxForm({
          formData: wrapToRecursiveProxy(formData),
          items: [{
            dataField: 'arrayField',
            editorType: 'dxTagBox',
            editorOptions: {
              dataSource: ['item1', 'item2'],
              onSelectionChanged: function() {
                return onSelectionChangedCounter++;
              }
            }
          }],
          integrationOptions: {watchMethod: function(fn, callback, options, __debug) {
              if (__debug && __debug.createWatcherDataField === 'arrayField') {
                watchCallbacks.push(callback);
              }
              return function() {};
            }}
        }).dxForm('instance');
        onSelectionChangedCounter = 0;
        form.getEditor('arrayField').option('value', ['item1']);
        watchCallbacks.forEach(function(callback) {
          return callback();
        });
        assert.deepEqual(form.getEditor('arrayField').option('value'), ['item1'], 'tagBox.option(value)');
        assert.deepEqual(formData, {arrayField: ['item1']}, 'formData');
        assert.strictEqual(onSelectionChangedCounter, 1, 'onSelectionChangedCounter');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","core/devices","core/config","core/dom_adapter","core/utils/resize_callbacks","core/utils/type","core/utils/extend","events/visibility_change","ui/form/ui.form.layout_manager.utils","generic_light.css!","jquery","ui/autocomplete","ui/calendar","ui/date_box","ui/drop_down_box","core/utils/window","ui/form/ui.form.js","ui/text_box/ui.text_editor.base.js","ui/form/components/label.js","ui/form/constants","ui/form/components/label","ui/toolbar/constants","ui/html_editor","../../helpers/ignoreQuillTimers.js","ui/lookup","ui/radio_group","ui/tag_box","ui/toolbar","ui/text_area","ui/themes","../../helpers/registerKeyHandlerTestHelper.js","../../helpers/responsiveBoxScreenMock.js","core/utils/type.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("core/devices"), require("core/config"), require("core/dom_adapter"), require("core/utils/resize_callbacks"), require("core/utils/type"), require("core/utils/extend"), require("events/visibility_change"), require("ui/form/ui.form.layout_manager.utils"), require("generic_light.css!"), require("jquery"), require("ui/autocomplete"), require("ui/calendar"), require("ui/date_box"), require("ui/drop_down_box"), require("core/utils/window"), require("ui/form/ui.form.js"), require("ui/text_box/ui.text_editor.base.js"), require("ui/form/components/label.js"), require("ui/form/constants"), require("ui/form/components/label"), require("ui/toolbar/constants"), require("ui/html_editor"), require("../../helpers/ignoreQuillTimers.js"), require("ui/lookup"), require("ui/radio_group"), require("ui/tag_box"), require("ui/toolbar"), require("ui/text_area"), require("ui/themes"), require("../../helpers/registerKeyHandlerTestHelper.js"), require("../../helpers/responsiveBoxScreenMock.js"), require("core/utils/type.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=form.tests.js.map