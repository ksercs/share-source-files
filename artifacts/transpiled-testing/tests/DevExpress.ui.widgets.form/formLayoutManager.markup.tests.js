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

(["testing/tests/DevExpress.ui.widgets.form/formLayoutManager.markup.tests.js"], ["jquery","core/utils/console","../../helpers/responsiveBoxScreenMock.js","ui/form/constants","ui/form/components/field_item","ui/form/components/label","ui/form/components/empty_item","core/config","core/utils/type","core/utils/window","ui/switch","ui/autocomplete","ui/color_box","ui/drop_down_box","ui/select_box","ui/tag_box","ui/lookup","ui/text_area","ui/radio_group","ui/range_slider","ui/slider","ui/html_editor","../../helpers/ignoreQuillTimers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.form/formLayoutManager.markup.tests.js", ["jquery", "core/utils/console", "../../helpers/responsiveBoxScreenMock.js", "ui/form/constants", "ui/form/components/field_item", "ui/form/components/label", "ui/form/components/empty_item", "core/config", "core/utils/type", "core/utils/window", "ui/switch", "ui/autocomplete", "ui/color_box", "ui/drop_down_box", "ui/select_box", "ui/tag_box", "ui/lookup", "ui/text_area", "ui/radio_group", "ui/range_slider", "ui/slider", "ui/html_editor", "../../helpers/ignoreQuillTimers.js"], function($__export) {
  "use strict";
  var $,
      consoleUtils,
      responsiveBoxScreenMock,
      FORM_LAYOUT_MANAGER_CLASS,
      FIELD_ITEM_CLASS,
      FIELD_ITEM_LABEL_CLASS,
      FIELD_ITEM_CONTENT_CLASS,
      LAYOUT_MANAGER_ONE_COLUMN,
      FIELD_ITEM_HELP_TEXT_CLASS,
      FIELD_ITEM_OPTIONAL_CLASS,
      FIELD_ITEM_REQUIRED_CLASS,
      FIELD_ITEM_CONTENT_WRAPPER_CLASS,
      FIELD_ITEM_CONTENT_LOCATION_CLASS,
      FIELD_ITEM_LABEL_ALIGN_CLASS,
      LABEL_VERTICAL_ALIGNMENT_CLASS,
      LABEL_HORIZONTAL_ALIGNMENT_CLASS,
      FIELD_ITEM_OPTIONAL_MARK_CLASS,
      FIELD_ITEM_LABEL_LOCATION_CLASS,
      FIELD_ITEM_REQUIRED_MARK_CLASS,
      FIELD_EMPTY_ITEM_CLASS,
      config,
      isFunction,
      isDefined,
      isRenderer,
      windowUtils,
      READONLY_STATE_CLASS,
      test,
      supportedEditors,
      createTestObject;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      consoleUtils = $__m.default;
    }, function($__m) {
      responsiveBoxScreenMock = $__m.default;
    }, function($__m) {
      FORM_LAYOUT_MANAGER_CLASS = $__m.FORM_LAYOUT_MANAGER_CLASS;
      FIELD_ITEM_CLASS = $__m.FIELD_ITEM_CLASS;
      FIELD_ITEM_LABEL_CLASS = $__m.FIELD_ITEM_LABEL_CLASS;
      FIELD_ITEM_CONTENT_CLASS = $__m.FIELD_ITEM_CONTENT_CLASS;
      LAYOUT_MANAGER_ONE_COLUMN = $__m.LAYOUT_MANAGER_ONE_COLUMN;
    }, function($__m) {
      FIELD_ITEM_HELP_TEXT_CLASS = $__m.FIELD_ITEM_HELP_TEXT_CLASS;
      FIELD_ITEM_OPTIONAL_CLASS = $__m.FIELD_ITEM_OPTIONAL_CLASS;
      FIELD_ITEM_REQUIRED_CLASS = $__m.FIELD_ITEM_REQUIRED_CLASS;
      FIELD_ITEM_CONTENT_WRAPPER_CLASS = $__m.FIELD_ITEM_CONTENT_WRAPPER_CLASS;
      FIELD_ITEM_CONTENT_LOCATION_CLASS = $__m.FIELD_ITEM_CONTENT_LOCATION_CLASS;
      FIELD_ITEM_LABEL_ALIGN_CLASS = $__m.FIELD_ITEM_LABEL_ALIGN_CLASS;
      LABEL_VERTICAL_ALIGNMENT_CLASS = $__m.LABEL_VERTICAL_ALIGNMENT_CLASS;
      LABEL_HORIZONTAL_ALIGNMENT_CLASS = $__m.LABEL_HORIZONTAL_ALIGNMENT_CLASS;
    }, function($__m) {
      FIELD_ITEM_OPTIONAL_MARK_CLASS = $__m.FIELD_ITEM_OPTIONAL_MARK_CLASS;
      FIELD_ITEM_LABEL_LOCATION_CLASS = $__m.FIELD_ITEM_LABEL_LOCATION_CLASS;
      FIELD_ITEM_REQUIRED_MARK_CLASS = $__m.FIELD_ITEM_REQUIRED_MARK_CLASS;
    }, function($__m) {
      FIELD_EMPTY_ITEM_CLASS = $__m.FIELD_EMPTY_ITEM_CLASS;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      isFunction = $__m.isFunction;
      isDefined = $__m.isDefined;
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__3;
      READONLY_STATE_CLASS = 'dx-state-readonly';
      (($__3 = QUnit, test = $__3.test, $__3));
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
      });
      supportedEditors = ['dxAutocomplete', 'dxCalendar', 'dxCheckBox', 'dxColorBox', 'dxDateBox', 'dxDropDownBox', 'dxLookup', 'dxNumberBox', 'dxRadioGroup', 'dxRangeSlider', 'dxSelectBox', 'dxSlider', 'dxSwitch', 'dxTagBox', 'dxTextArea', 'dxTextBox', 'dxHtmlEditor'];
      createTestObject = function() {
        return ({
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
        });
      };
      QUnit.module('Layout manager', function() {
        test('Default render', function(assert) {
          var contentReadyStub = sinon.stub();
          var $testContainer = $('#container').dxLayoutManager({
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }],
            onContentReady: contentReadyStub
          });
          assert.ok($testContainer.hasClass(FORM_LAYOUT_MANAGER_CLASS), 'layout manager is rendered');
          assert.equal($testContainer.find('.dx-responsivebox').length, 1, 'responsive box is rendered');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS).length, 1, 'field items is rendered');
          assert.ok($testContainer.find('.' + FIELD_ITEM_CLASS).hasClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS), 'field item has default label-align class');
          assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).length, 1, 'label is rendered');
          assert.ok($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).hasClass(FIELD_ITEM_LABEL_LOCATION_CLASS + 'left'), 'label\'s location is left by default');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + ' .dx-texteditor').length, 1, 'editor is rendered');
          assert.ok(!$testContainer.find('.' + FIELD_ITEM_CLASS + ' .dx-texteditor').hasClass(READONLY_STATE_CLASS), 'editor is not read only');
          assert.ok($testContainer.find('.' + FIELD_ITEM_CLASS + '> .' + FIELD_ITEM_CONTENT_CLASS).hasClass(FIELD_ITEM_CONTENT_LOCATION_CLASS + 'right'), 'Field item content has a right css class');
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + '> .' + FIELD_ITEM_CONTENT_CLASS + '> .dx-texteditor').length, 1, 'editor has field-item-content class');
          assert.equal(contentReadyStub.callCount, windowUtils.hasWindow() ? 1 : 0, 'contentReady event');
        });
        test('Default render with editorOptions.inputAttr', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            layoutData: {name: 'John'},
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              editorOptions: {inputAttr: {alt: 'test'}}
            }]
          });
          assert.equal($testContainer.find('.' + FIELD_ITEM_CLASS + ' .dx-texteditor-input').attr('alt'), 'test', 'attr merge successfully');
        });
        test('Default render with template', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            layoutData: {
              firstName: 'Alex',
              address: 'Winnipeg'
            },
            items: [{
              dataField: 'FirstName',
              itemType: 'simple',
              isRequired: true,
              template: function(data, element) {
                $('<div>').appendTo(element).dxButton({icon: 'find'});
                $('<div>').appendTo(element).dxTextBox(data.editorOptions).dxValidator({
                  validationGroup: data.component,
                  validationRules: [{
                    type: 'required',
                    message: 'Hire date is required'
                  }]
                });
              }
            }, {
              dataField: 'address',
              editorType: 'dxTextBox'
            }]
          });
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($items.length, 2, 'field items is rendered');
        });
        test('Default render with label template', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            layoutData: {
              firstName: 'Alex',
              address: 'Winnipeg'
            },
            items: [{
              dataField: 'FirstName',
              itemType: 'simple',
              isRequired: true,
              label: {template: function(data, element) {
                  $('<div>').appendTo(element).dxButton({
                    icon: 'find',
                    text: 'find'
                  });
                }}
            }]
          });
          var $button = $testContainer.find(("." + 'dx-button'));
          assert.equal($button.length, 1, 'field item label with button is rendered');
        });
        test('Default render with marks', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              isRequired: true
            }, {
              dataField: 'address',
              editorType: 'dxTextBox'
            }]});
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($items.length, 2, 'field items is rendered');
          var $requiredItem = $items.eq(0);
          var $optionalItem = $items.eq(1);
          assert.ok($requiredItem.hasClass(FIELD_ITEM_REQUIRED_CLASS), 'field item has required class');
          assert.ok(!$requiredItem.hasClass(FIELD_ITEM_OPTIONAL_CLASS), 'field item hasn\'t optional class');
          assert.ok($requiredItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 'field item has required mark');
          assert.ok(!$requiredItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).length, 'field item hasn\'t optional mark');
          assert.ok(!$optionalItem.hasClass(FIELD_ITEM_REQUIRED_CLASS), 'field item hasn\'t required class');
          assert.ok($optionalItem.hasClass(FIELD_ITEM_OPTIONAL_CLASS), 'field item has optional class');
          assert.ok(!$optionalItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 'field item hasn\'t required mark');
          assert.ok(!$optionalItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).length, 'field item hasn\'t optional mark');
        });
        test('Show optional marks', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            items: [{
              dataField: 'address',
              editorType: 'dxTextBox'
            }],
            showOptionalMark: true
          });
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($items.length, 1, 'field items is rendered');
          var $optionalItem = $items.eq(0);
          assert.ok(!$optionalItem.hasClass(FIELD_ITEM_REQUIRED_CLASS), 'field item hasn\'t required class');
          assert.ok($optionalItem.hasClass(FIELD_ITEM_OPTIONAL_CLASS), 'field item has optional class');
          assert.ok(!$optionalItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 'field item hasn\'t required mark');
          assert.ok($optionalItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).length, 'field item hasn optional mark');
        });
        test('Render custom marks', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            showOptionalMark: true,
            optionalMark: '-',
            requiredMark: '+',
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              isRequired: true
            }, {
              dataField: 'address',
              editorType: 'dxTextBox'
            }]
          });
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          var $requiredItem = $items.eq(0);
          var $optionalItem = $items.eq(1);
          assert.equal($.trim($requiredItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).text()), '+', 'custom required mark');
          assert.equal($.trim($optionalItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).text()), '-', 'custom optional mark');
        });
        test('Change marks', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            showOptionalMark: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              isRequired: true
            }, {
              dataField: 'address',
              editorType: 'dxTextBox'
            }]
          });
          var instance = $testContainer.dxLayoutManager('instance');
          instance.option('optionalMark', '-');
          instance.option('requiredMark', '+');
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          var $requiredItem = $items.eq(0);
          var $optionalItem = $items.eq(1);
          assert.equal($.trim($requiredItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).text()), '+', 'custom required mark');
          assert.equal($.trim($optionalItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).text()), '-', 'custom optional mark');
        });
        test('Change marks visibility', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              dataField: 'name',
              editorType: 'dxTextBox',
              isRequired: true
            }, {
              dataField: 'address',
              editorType: 'dxTextBox'
            }]});
          var instance = $testContainer.dxLayoutManager('instance');
          var $items = $testContainer.find('.' + FIELD_ITEM_CLASS);
          instance.option('showOptionalMark', true);
          instance.option('showRequiredMark', false);
          var $requiredItem = $items.eq(0);
          var $optionalItem = $items.eq(1);
          assert.ok($requiredItem.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 'Item has no required mark');
          assert.ok(!$optionalItem.find('.' + FIELD_ITEM_OPTIONAL_MARK_CLASS).length, 'Item has optional mark');
        });
        test('Render read only layoutManager', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          assert.ok($testContainer.find('.' + FIELD_ITEM_CLASS + ' .dx-texteditor').hasClass(READONLY_STATE_CLASS), 'editor is read only');
        });
        test('Render label by default', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            form: {
              option: function() {},
              getItemID: function() {
                return 'dx_FormID_name';
              }
            },
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var $label = $testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).first();
          assert.equal($label.length, 1, 'label is rendered');
          assert.ok($label.hasClass(FIELD_ITEM_LABEL_LOCATION_CLASS + 'left'), 'label\'s location is left by default');
          assert.equal($label.text(), 'Name', 'text of label');
          assert.equal($label.attr('for'), 'dx_FormID_name', 'text of label');
          assert.ok($label.parent().hasClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS), 'field item contains label has horizontal align class');
        });
        test('Baseline align of label for large editors is applied when browser is supported flex', function(assert) {
          var largeEditors = ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'];
          var customItems = ['item', 'itemWithHelpText'];
          var items = $traceurRuntime.spread(customItems, largeEditors).map(function(item) {
            return ({
              dataField: item,
              editorType: customItems.indexOf(item) > -1 ? 'dxTextBox' : item,
              helpText: item === 'itemWithHelpText' ? 'Test help text' : null
            });
          });
          var $testContainer = $('#container').dxLayoutManager();
          var layoutManager = $testContainer.dxLayoutManager('instance');
          layoutManager.option('items', items);
          var $items = $testContainer.find(("." + FIELD_ITEM_CLASS));
          $items.toArray().forEach(function(item, index) {
            var hasBaseLine = index > 1;
            assert.equal($(item).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), hasBaseLine, ("item " + (!hasBaseLine ? 'doesn\'t' : '') + " have baseline alignment class"));
          });
        });
        test('Baseline align of label for large editors is not applied when label location is top', function(assert) {
          var largeEditors = ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'];
          var customItems = ['item', 'itemWithHelpText'];
          var $testContainer = $('#container').dxLayoutManager({
            labelLocation: 'top',
            items: $traceurRuntime.spread(customItems, largeEditors).map(function(item) {
              return ({
                dataField: item,
                editorType: customItems.indexOf(item) > -1 ? 'dxTextBox' : item,
                helpText: item === 'itemWithHelpText' ? 'Test help text' : null
              });
            })
          });
          var $items = $testContainer.find(("." + FIELD_ITEM_CLASS));
          $items.toArray().forEach(function(item) {
            assert.notOk($(item).hasClass(FIELD_ITEM_LABEL_ALIGN_CLASS), 'item doesn\'t have baseline alignment class');
          });
        });
        test('Render label for item without name or dateField', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            form: {
              option: function() {},
              getItemID: function() {
                return 'dx_FormID_name';
              }
            },
            items: [{editorType: 'dxTextBox'}]
          });
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          var $input = $testContainer.find('input');
          assert.ok($input.attr('id'), 'input has ID');
          assert.equal($label.attr('for'), $input.attr('input'), 'input ID equal to label\'s \'for\' attribute');
        });
        test('Render label with position top render before widget', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {location: 'top'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $fieldItemChildren = $testContainer.find('.' + FIELD_ITEM_CLASS).children();
          assert.ok($fieldItemChildren.first().hasClass(FIELD_ITEM_LABEL_LOCATION_CLASS + 'top'), 'check location class');
          assert.ok($fieldItemChildren.first().is('label'), 'Label is the first child');
        });
        test('Render label with position bottom render after widget', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {location: 'bottom'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $fieldItemChildren = $testContainer.find('.' + FIELD_ITEM_CLASS).children();
          assert.ok($fieldItemChildren.last().hasClass(FIELD_ITEM_LABEL_LOCATION_CLASS + 'bottom'), 'check location class');
          assert.ok($fieldItemChildren.last().is('label'), 'Label is the last child');
        });
        test('Render label with position top and alignment left', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {
                location: 'top',
                alignment: 'left'
              },
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.ok($label.parent().hasClass(LABEL_VERTICAL_ALIGNMENT_CLASS), 'Field item contains label that has vertical align');
          assert.equal($label.css('textAlign'), 'left', 'Label has text-align left');
        });
        test('Render label with position top and alignment center', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {
                location: 'top',
                alignment: 'center'
              },
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.ok($label.parent().hasClass(LABEL_VERTICAL_ALIGNMENT_CLASS), 'Field item contains label that has vertical align');
          assert.equal($label.css('textAlign'), 'center', 'Label has text-align center');
        });
        test('Render label with position top and alignment right', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {
                location: 'top',
                alignment: 'right'
              },
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.ok($label.parent().hasClass(LABEL_VERTICAL_ALIGNMENT_CLASS), 'Field item contains label that has vertical align');
          assert.equal($label.css('textAlign'), 'right', 'Label has text-align right');
        });
        test('Render label with horizontal alignment (left) ', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {location: 'left'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $fieldItem = $testContainer.find('.' + FIELD_ITEM_CLASS).first();
          assert.ok($fieldItem.hasClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS), 'Field item contains label that has horizontal align');
        });
        test('Render label with default position and alignment left', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {alignment: 'left'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.equal($label.css('textAlign'), 'left', 'Label has text-align left');
        });
        test('Render label with default position and alignment center', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {alignment: 'center'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.equal($label.css('textAlign'), 'center', 'Label has text-align center');
        });
        test('Render label with showColonAfterLabel', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            showColonAfterLabel: true,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var $label = $testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).first();
          assert.equal($label.text(), 'Name:', 'text of label');
        });
        test('Label is not rendered when name is defined', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              name: 'name',
              editorType: 'dxTextBox'
            }]});
          assert.ok(!$testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).length);
        });
        test('Label is not rendered when labelMode option is not "default"', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            labelMode: 'static',
            items: [{
              label: {text: 'Label text'},
              editorType: 'dxTextBox'
            }]
          });
          assert.notOk($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).length);
        });
        test('If item is not visible we will not render them', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{dataField: 'firstName'}, {
              dataField: 'LastName',
              visible: false
            }, {dataField: 'Phone'}]});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 2, 'We have only two visible items');
          assert.equal($fieldItems.first().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'First Name', 'Correct first item rendered');
          assert.equal($fieldItems.last().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Phone', 'Correct second item rendered');
        });
        test('Item should be removed from DOM if it\'s visibility changed', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{dataField: 'firstName'}, {dataField: 'LastName'}, {dataField: 'Phone'}]});
          var instance = $testContainer.dxLayoutManager('instance');
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 3, 'We have 3 visible items');
          instance.option('items[1].visible', false);
          $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 2, 'We have 2 visible items');
          assert.equal($fieldItems.first().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'First Name', 'Correct first item rendered');
          assert.equal($fieldItems.last().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Phone', 'Correct second item rendered');
        });
        test('Render items as array of strings', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: ['FirstName', 'LastName']});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 2, 'We have two items');
          assert.equal($fieldItems.first().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'First Name', 'Correct first item rendered');
          assert.equal($fieldItems.last().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Last Name', 'Correct second item rendered');
        });
        test('Render mixed set of items(2 as strings, 1 as object)', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: ['FirstName', {dataField: 'Nickname'}, 'LastName']});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 3, 'We have three items');
          assert.equal($fieldItems.first().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'First Name', 'Correct first item rendered');
          assert.equal($fieldItems.eq(1).find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Nickname', 'Correct second item rendered');
          assert.equal($fieldItems.last().find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Last Name', 'Correct third item rendered');
        });
        test('If label is not visible we will not render them', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              dataField: 'firstName',
              label: {visible: false}
            }]});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 1, 'We have only one item');
          assert.equal($fieldItems.find('.' + FIELD_ITEM_LABEL_CLASS).length, 0, 'We have\'t labels');
          assert.equal($fieldItems.find('.' + FIELD_ITEM_CONTENT_CLASS).length, 1, 'We have widget in field');
        });
        test('Render label with horizontal alignment (right) ', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {location: 'right'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $fieldItem = $testContainer.find('.' + FIELD_ITEM_CLASS).first();
          assert.ok($fieldItem.find('.' + FIELD_ITEM_LABEL_CLASS).hasClass(FIELD_ITEM_LABEL_LOCATION_CLASS + 'right'), 'check location class');
          assert.ok($fieldItem.hasClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS), 'Field item contains label that has horizontal align');
        });
        test('Default render with label', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            showColonAfterLabel: true,
            items: [{
              label: {text: 'New label'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.equal($label.text(), 'New label:', 'text of label');
        });
        test('Colon symbol is not added to label when showColon is disabled for label', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            showColonAfterLabel: true,
            items: [{
              label: {
                text: 'New label',
                showColon: false
              },
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var $label = $testContainer.find('.' + FIELD_ITEM_CLASS + ' label').first();
          assert.equal($label.text(), 'New label', 'text of label');
        });
        test('Render editor with id attribute', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            form: {
              option: function() {},
              getItemID: function() {
                return 'dx_FormID_name';
              }
            },
            items: [{
              label: {text: 'New label'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]
          });
          var $input = $testContainer.find('.' + FIELD_ITEM_CLASS + ' .dx-texteditor input').first();
          assert.equal($input.attr('id'), 'dx_FormID_name', 'id attr of input');
        });
        test('Render editor by default is data is unknown', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({layoutData: {Name: null}});
          var $editor = $testContainer.find('.dx-texteditor');
          assert.equal($editor.length, 1, 'render 1 editor');
          assert.ok($editor.hasClass('dx-textbox'), 'It is dxTextBox by default');
        });
        test('Generate several items in layout', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {text: 'label1'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }, {
              label: {text: 'label2'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }, {
              label: {text: 'label3'},
              dataField: 'name',
              editorType: 'dxTextBox'
            }]});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.length, 3, 'Render 3 items');
          for (var i = 0; i < 3; i++) {
            var labelCount = i + 1;
            assert.equal($fieldItems.eq(i).find('label').text(), 'label' + labelCount, 'Label' + labelCount);
          }
        });
        test('Generate items from layoutData', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date()
            }}).dxLayoutManager('instance');
          assert.deepEqual(layoutManager._items, [{
            dataField: 'name',
            editorType: 'dxTextBox',
            itemType: 'simple',
            visibleIndex: 0,
            col: 0
          }, {
            dataField: 'active',
            editorType: 'dxCheckBox',
            allowIndeterminateState: true,
            itemType: 'simple',
            visibleIndex: 1,
            col: 0
          }, {
            dataField: 'price',
            editorType: 'dxNumberBox',
            itemType: 'simple',
            visibleIndex: 2,
            col: 0
          }, {
            dataField: 'birthDate',
            editorType: 'dxDateBox',
            itemType: 'simple',
            visibleIndex: 3,
            col: 0
          }]);
        });
        test('Generate items from layoutData with unacceptable data', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({layoutData: {
              name: 'John',
              wrongField: function() {}
            }}).dxLayoutManager('instance');
          assert.deepEqual(layoutManager._items, [{
            dataField: 'name',
            editorType: 'dxTextBox',
            itemType: 'simple',
            visibleIndex: 0,
            col: 0
          }]);
        });
        test('Generate items from layoutData and items', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('01/01/2000')
            },
            items: [{
              dataField: 'active',
              editorType: 'dxSwitch'
            }, {
              dataField: 'secondName',
              editorType: 'dxTextArea'
            }]
          }).dxLayoutManager('instance');
          assert.deepEqual(layoutManager._items, [{
            dataField: 'active',
            editorType: 'dxSwitch',
            itemType: 'simple',
            visibleIndex: 0,
            col: 0
          }, {
            dataField: 'secondName',
            editorType: 'dxTextArea',
            itemType: 'simple',
            visibleIndex: 1,
            col: 0
          }]);
          assert.deepEqual(layoutManager.option('layoutData'), {
            name: 'Patti',
            active: true,
            price: 1200,
            birthDate: new Date('01/01/2000')
          }, 'Correct Data');
        });
        test('Check data when generate items from layoutData and items with initial value', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('01/01/2000')
            },
            items: [{
              dataField: 'active',
              editorType: 'dxSwitch'
            }, {
              dataField: 'secondName',
              editorType: 'dxTextArea',
              editorOptions: {value: 'Test'}
            }]
          }).dxLayoutManager('instance');
          assert.deepEqual(layoutManager.option('layoutData'), {
            name: 'Patti',
            active: true,
            price: 1200,
            birthDate: new Date('01/01/2000'),
            secondName: 'Test'
          }, 'Correct Data');
        });
        test('Rerender items after change \'items\' option', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: [{
              label: {text: 'label1'},
              dataField: 'field1',
              editorType: 'dxTextBox'
            }]});
          var layoutManager = $testContainer.dxLayoutManager('instance');
          layoutManager.option('items', [{
            label: {text: 'label1'},
            dataField: 'field2',
            editorType: 'dxNumberBox'
          }, {
            label: {text: 'label2'},
            dataField: 'field3',
            editorType: 'dxDateBox'
          }]);
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.ok($fieldItems.eq(0).find('.dx-numberbox').length, 'First item is dxNumberBox');
          assert.ok($fieldItems.eq(1).find('.dx-datebox').length, 'Second item is dxDateBox');
        });
        test('Generate items after change \'layoutData\' option', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date()
            }}).dxLayoutManager('instance');
          layoutManager.option('layoutData', {
            title: 'Test',
            room: 1001,
            startDate: new Date()
          });
          assert.deepEqual(layoutManager._items, [{
            dataField: 'title',
            editorType: 'dxTextBox',
            itemType: 'simple',
            visibleIndex: 0,
            col: 0
          }, {
            dataField: 'room',
            editorType: 'dxNumberBox',
            itemType: 'simple',
            visibleIndex: 1,
            col: 0
          }, {
            dataField: 'startDate',
            editorType: 'dxDateBox',
            itemType: 'simple',
            visibleIndex: 2,
            col: 0
          }]);
        });
        test('Set values from layoutData', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('10/10/2010')
            }});
          var $editors = $testContainer.find('.dx-texteditor, .dx-checkbox');
          assert.equal($editors.eq(0).dxTextBox('instance').option('value'), 'Patti', '1 editor');
          assert.equal($editors.eq(1).dxCheckBox('instance').option('value'), true, '2 editor');
          assert.equal($editors.eq(2).dxNumberBox('instance').option('value'), 1200, '3 editor');
          assert.deepEqual($editors.eq(3).dxDateBox('instance').option('value'), new Date('10/10/2010'), '4 editor');
        });
        test('Value from layoutData shouldn\'t pass to the editor in case when the \'dataField\' options isn\'t specified', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {firstName: 'Alex'},
            items: [{
              name: 'firstName',
              editorType: 'dxTextBox'
            }]
          });
          var editor = $testContainer.find('.dx-texteditor').dxTextBox('instance');
          assert.equal(editor.option('value'), null, 'Editor hasn\'t a value');
        });
        test('layoutData isn\'t updating on editor value change if the \'dataField\' option isn\'t specified', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {firstName: 'Alex'},
            items: [{
              name: 'firstName',
              editorType: 'dxTextBox'
            }]
          });
          $testContainer.find('.dx-texteditor').dxTextBox('option', 'value', 'John');
          var layoutManager = $testContainer.dxLayoutManager('instance');
          assert.deepEqual(layoutManager.option('layoutData'), {firstName: 'Alex'}, 'layoutData keeps the same data');
        });
        test('Set value via editor options', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('10/10/2010')
            },
            customizeItem: function(item) {
              if (item.dataField === 'price') {
                item.editorOptions = {value: 34};
              }
            }
          });
          var $editors = $testContainer.find('.dx-texteditor, .dx-checkbox');
          assert.equal($editors.eq(2).dxNumberBox('instance').option('value'), 34);
        });
        test('Change item.visible on customizeItem works correct', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {
              name: 'Michael',
              age: 20
            },
            customizeItem: function(item) {
              if (item.dataField === 'name') {
                item.visible = false;
              }
            }
          });
          var $editors = $testContainer.find('.dx-texteditor');
          assert.equal($editors.length, 1, 'There is only one editor');
          assert.equal($testContainer.find('.' + FIELD_ITEM_LABEL_CLASS).text(), 'Age', 'Correct field rendered');
        });
        test('CustomizeItem work well after option change', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {
              name: 'Patti',
              gender: true,
              price: 1200,
              birthDate: new Date('10/10/2010')
            }});
          $testContainer.dxLayoutManager('instance').option('customizeItem', function(item) {
            if (item.dataField === 'price') {
              item.editorOptions = {value: 34};
            }
          });
          var $editors = $testContainer.find('.dx-texteditor, .dx-checkbox');
          assert.equal($editors.eq(2).dxNumberBox('instance').option('value'), 34);
        });
        test('Get value from editor', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }, {
              dataField: 'active',
              editorType: 'dxCheckBox'
            }, {
              dataField: 'price',
              editorType: 'dxNumberBox'
            }, {
              dataField: 'birthDate',
              editorType: 'dxDateBox'
            }]}).dxLayoutManager('instance');
          var $editors = $testContainer.find('.dx-texteditor, .dx-checkbox');
          $editors.eq(0).dxTextBox('instance').option('value', 'Fillip');
          $editors.eq(1).dxCheckBox('instance').option('value', true);
          $editors.eq(2).dxNumberBox('instance').option('value', 7);
          $editors.eq(3).dxDateBox('instance').option('value', '10/10/2001');
          assert.deepEqual(layoutManager.option('layoutData'), {
            name: 'Fillip',
            active: true,
            price: 7,
            birthDate: '10/10/2001'
          });
        });
        test('Editors with object value correctly work with values from data', function(assert) {
          var $testContainer = $('#container');
          var items = [{
            myText: 'test1',
            number: 1
          }, {
            myText: 'test2',
            number: 2
          }, {
            myText: 'test3',
            number: 3
          }];
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {testItem: items[1]},
            items: [{
              dataField: 'testItem',
              editorType: 'dxLookup',
              editorOptions: {
                items: items,
                displayExpr: 'myText'
              }
            }]
          }).dxLayoutManager('instance');
          var lookupCurrentItemText = layoutManager.$element().find('.dx-lookup-field').text();
          assert.equal(lookupCurrentItemText, 'test2', 'lookup has correct current item');
        });
        test('A layoutData object change at changing widget from items option', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('10/10/2010')
            },
            items: [{
              dataField: 'subscribe',
              editorType: 'dxCheckBox'
            }]
          }).dxLayoutManager('instance');
          $testContainer.find('.dx-checkbox').dxCheckBox('instance').option('value', true);
          assert.deepEqual(layoutManager.option('layoutData'), {
            name: 'Patti',
            active: true,
            price: 1200,
            birthDate: new Date('10/10/2010'),
            subscribe: true
          }, 'Custom field data updated');
        });
        test('A layoutData is not changed when dataField is undefined_T310737', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({items: [{editorType: 'dxTextBox'}, {editorType: 'dxTextBox'}, {editorType: 'dxTextBox'}]}).dxLayoutManager('instance');
          var $textBoxes = $testContainer.find('.dx-textbox');
          var textBoxes = [];
          textBoxes[0] = $textBoxes.eq(0).dxTextBox('instance');
          textBoxes[1] = $textBoxes.eq(1).dxTextBox('instance');
          textBoxes[2] = $textBoxes.eq(2).dxTextBox('instance');
          textBoxes[0].option('value', 'test1');
          textBoxes[1].option('value', 'test2');
          textBoxes[2].option('value', 'test3');
          assert.deepEqual(layoutManager.option('layoutData'), {}, 'layout data');
          assert.equal(textBoxes[0].option('value'), 'test1', 'editor 1');
          assert.equal(textBoxes[1].option('value'), 'test2', 'editor 2');
          assert.equal(textBoxes[2].option('value'), 'test3', 'editor 3');
        });
        test('Set \'disabled\' option to layoutManager and check internal element state', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {
              name: 'Patti',
              active: true,
              price: 1200,
              birthDate: new Date('10/10/2010')
            }});
          $testContainer.dxLayoutManager('instance').option('disabled', true);
          var $editors = $testContainer.find('.dx-texteditor, .dx-checkbox');
          assert.equal($editors.eq(0).dxTextBox('instance').option('disabled'), true);
          assert.equal($editors.eq(1).dxCheckBox('instance').option('disabled'), true);
          assert.equal($editors.eq(2).dxNumberBox('instance').option('disabled'), true);
          assert.equal($editors.eq(3).dxDateBox('instance').option('disabled'), true);
        });
        test('Label creates when item has no name but has \'label.text\' option', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{
              editorType: 'dxTextBox',
              label: {text: 'NewLabel'}
            }]});
          var $label = $testContainer.find('label');
          assert.ok($label.length, 'Editor has label');
          assert.equal($label.text(), 'NewLabel', 'Correct label\'s text');
        });
        test('Render field items from fieldData and items', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {name: 'Patti'},
            items: [{editorType: 'dxButton'}]
          }).dxLayoutManager('instance');
          assert.equal(layoutManager._items.length, 1, 'LayoutManager has 2 fields');
          assert.ok($testContainer.find('.dx-button').length, 'Form has button');
        });
        test('Render field items from fieldData and items when fieldData is a complex object', function(assert) {
          var $testContainer = $('#container');
          var complexObject = {
            CTO: {
              name: 'Alex',
              age: 40
            },
            CEO: {
              name: 'George',
              age: 34
            }
          };
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: complexObject,
            items: [{
              dataField: 'CTO.name',
              editorType: 'dxTextBox'
            }, {
              dataField: 'CEO.name',
              editorType: 'dxTextBox'
            }]
          }).dxLayoutManager('instance');
          var $labels = $testContainer.find('label');
          var $inputs = $testContainer.find('input');
          assert.equal(layoutManager._items.length, 2, 'LayoutManager has 2 fields');
          assert.equal($labels.length, 2, 'Form has 2 labels');
          assert.equal($labels.eq(0).text(), 'CTO name', 'First label text');
          assert.equal($labels.eq(1).text(), 'CEO name', 'Second label text');
          assert.equal($inputs.length, 2, 'Form has 2 inputs');
          assert.equal($inputs.eq(0).val(), 'Alex', 'First input value');
          assert.equal($inputs.eq(1).val(), 'George', 'Second input value');
        });
        test('Render field items from fieldData and items when fieldData is a complex object and custom label text', function(assert) {
          var $testContainer = $('#container');
          var complexObject = {
            CTO: {
              name: 'Alex',
              age: 40
            },
            CEO: {
              name: 'George',
              age: 34
            }
          };
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: complexObject,
            items: [{
              dataField: 'CTO.name',
              label: {text: 'The smartest CTO'}
            }, {
              dataField: 'CEO.name',
              label: {text: 'The best CEO'},
              editorType: 'dxTextBox'
            }]
          }).dxLayoutManager('instance');
          var $labels = $testContainer.find('label');
          var $inputs = $testContainer.find('input');
          assert.equal(layoutManager._items.length, 2, 'LayoutManager has 2 fields');
          assert.equal($labels.length, 2, 'Form has 2 labels');
          assert.equal($labels.eq(0).text(), 'The smartest CTO', 'First label text');
          assert.equal($labels.eq(1).text(), 'The best CEO', 'Second label text');
          assert.equal($inputs.length, 2, 'Form has 2 inputs');
          assert.equal($inputs.eq(0).val(), 'Alex', 'First input value');
          assert.equal($inputs.eq(1).val(), 'George', 'Second input value');
        });
        test('Render help text', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{
              dataField: 'field1',
              helpText: 'field1 help text'
            }, {
              dataField: 'field1',
              helpText: null
            }, {
              dataField: 'field1',
              helpText: undefined
            }, 'field3', {dataField: 'field2'}, {
              itemType: 'empty',
              helpText: 'should be rendered for simple only'
            }, {
              itemType: 'group',
              helpText: 'should be rendered for simple only'
            }, {
              itemType: 'tabbed',
              helpText: 'should be rendered for simple only'
            }, {
              itemType: 'button',
              helpText: 'should be rendered for simple only'
            }]});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($testContainer.find('.' + FIELD_ITEM_CONTENT_WRAPPER_CLASS).length, 1, 'FIELD_ITEM_CONTENT_WRAPPER_CLASS.length');
          assert.equal($testContainer.find('.' + FIELD_ITEM_HELP_TEXT_CLASS).length, 1, 'FIELD_ITEM_HELP_TEXT_CLASS.length');
          var $fieldHelpText = $fieldItems.eq(0).find('>.' + FIELD_ITEM_CONTENT_WRAPPER_CLASS + '>.' + FIELD_ITEM_HELP_TEXT_CLASS + ':last-child');
          assert.equal($fieldHelpText.length, 1, '$field1HelpText.length');
          assert.equal($fieldHelpText.text(), 'field1 help text');
        });
        test('Change the order of items', function(assert) {
          var $testContainer = $('#container');
          var data = {
            name: 'Alex',
            age: 40,
            gender: 'male'
          };
          $testContainer.dxLayoutManager({
            layoutData: data,
            items: [{
              visibleIndex: 1,
              dataField: 'name',
              editorType: 'dxTextBox'
            }, {
              visibleIndex: 2,
              dataField: 'age',
              editorType: 'dxTextBox'
            }, {
              visibleIndex: 0,
              dataField: 'gender',
              editorType: 'dxTextBox'
            }]
          });
          var $labels = $testContainer.find('label');
          var $inputs = $testContainer.find('input');
          assert.equal($labels.length, 3, 'Form has 3 labels');
          assert.equal($labels.eq(0).text(), 'Gender', 'First label text');
          assert.equal($labels.eq(1).text(), 'Name', 'Second label text');
          assert.equal($labels.eq(2).text(), 'Age', 'Second label text');
          assert.equal($inputs.length, 3, 'Form has 3 inputs');
          assert.equal($inputs.eq(0).val(), 'male', 'First input value');
          assert.equal($inputs.eq(1).val(), 'Alex', 'Second input value');
          assert.equal($inputs.eq(2).val(), '40', 'First input value');
        });
        test('Change the order of items with items without visibleIndex', function(assert) {
          var $testContainer = $('#container');
          var data = {
            name: 'Alex',
            age: 40,
            gender: 'male',
            hasAuto: 'Yes'
          };
          $testContainer.dxLayoutManager({
            layoutData: data,
            items: [{
              dataField: 'name',
              editorType: 'dxTextBox'
            }, {
              visibleIndex: 0,
              dataField: 'age',
              editorType: 'dxTextBox'
            }, {
              dataField: 'gender',
              editorType: 'dxTextBox'
            }, {
              visibleIndex: 1,
              dataField: 'hasAuto',
              editorType: 'dxTextBox'
            }]
          });
          var $labels = $testContainer.find('label');
          var $inputs = $testContainer.find('input');
          assert.equal($labels.length, 4, 'Form has 4 labels');
          assert.equal($labels.eq(0).text(), 'Age', 'First label text');
          assert.equal($labels.eq(1).text(), 'Has Auto', 'Second label text');
          assert.equal($labels.eq(2).text(), 'Name', 'Third label text');
          assert.equal($labels.eq(3).text(), 'Gender', 'Fourth label text');
          assert.equal($inputs.eq(0).val(), '40', 'First input value');
          assert.equal($inputs.eq(1).val(), 'Yes', 'Second input value');
          assert.equal($inputs.eq(2).val(), 'Alex', 'Second input value');
          assert.equal($inputs.eq(3).val(), 'male', 'Second input value');
        });
        test('Update editor with nested dataField when layoutData changed', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {personalInfo: {firstName: 'John'}},
            items: ['personalInfo.firstName']
          }).dxLayoutManager('instance');
          layoutManager.option('layoutData', {personalInfo: {firstName: 'Jane'}});
          assert.equal(layoutManager.getEditor('personalInfo.firstName').option('value'), 'Jane', 'Editor is up to date');
        });
        test('Render empty item', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            formData: {
              name: 'Test Name',
              profession: 'Test profession'
            },
            items: ['name', {itemType: 'empty'}, 'profession']
          });
          assert.equal($testContainer.find('.' + FIELD_EMPTY_ITEM_CLASS).length, 1);
        });
        test('layoutData with \'null\' fields shouldn\'t reset editor\'s \'isValid\' option', function(assert) {
          var instance = $('#container').dxLayoutManager({
            layoutData: {
              test1: 'test1',
              test2: 'test2'
            },
            items: [{
              dataField: 'test1',
              editorOptions: {isValid: false}
            }, {
              dataField: 'test2',
              editorOptions: {isValid: false}
            }]
          }).dxLayoutManager('instance');
          instance.option('layoutData', {
            test1: '',
            test2: null
          });
          var textBox = instance.getEditor('test1');
          var dateBox = instance.getEditor('test2');
          assert.notOk(textBox.option('isValid'), '\'isValid\' is false');
          assert.equal(textBox.option('value'), '', 'Value is empty string');
          assert.notOk(dateBox.option('isValid'), '\'isValid\' is false');
          assert.equal(dateBox.option('value'), null, 'Value is null');
        });
        test('Render with empty items', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            formData: {name: 'Test Name'},
            items: []
          }).dxLayoutManager('instance');
          assert.equal(layoutManager.$element().children().length, 0, 'layout manager content is empty');
          assert.notOk(layoutManager.getEditor('name'), 'editor is not created');
        });
      });
      QUnit.module('Render multiple columns', function() {
        test('Render layoutManager with 2 columns', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 2,
            height: 800
          }).dxLayoutManager('instance');
          var responsiveBox = $('#container').find('.dx-responsivebox').dxResponsiveBox('instance');
          var boxItems = responsiveBox.option('items');
          assert.equal(layoutManager._items.length, $('#container .dx-texteditor').length, 'generated items');
          assert.deepEqual(boxItems[0].location, {
            col: 0,
            row: 0
          }, 'col 0 row 0');
          assert.deepEqual(boxItems[1].location, {
            col: 1,
            row: 0
          }, 'col 1 row 0');
          assert.deepEqual(boxItems[2].location, {
            col: 0,
            row: 1
          }, 'col 0 row 1');
          assert.deepEqual(boxItems[3].location, {
            col: 1,
            row: 1
          }, 'col 1 row 1');
          assert.deepEqual(boxItems[4].location, {
            col: 0,
            row: 2
          }, 'col 0 row 2');
          assert.deepEqual(boxItems[5].location, {
            col: 1,
            row: 2
          }, 'col 1 row 2');
          assert.deepEqual(boxItems[6].location, {
            col: 0,
            row: 3
          }, 'col 0 row 3');
          assert.deepEqual(boxItems[7].location, {
            col: 1,
            row: 3
          }, 'col 1 row 3');
          assert.deepEqual(boxItems[8].location, {
            col: 0,
            row: 4
          }, 'col 0 row 4');
          assert.deepEqual(boxItems[9].location, {
            col: 1,
            row: 4
          }, 'col 1 row 4');
          assert.deepEqual(boxItems[10].location, {
            col: 0,
            row: 5
          }, 'col 0 row 5');
        });
        test('Render layout items in order', function(assert) {
          $('#container').dxLayoutManager({
            layoutData: {
              name: 'Patti',
              address: 'Test town',
              room: 101,
              gender: 'male',
              id: 'test id'
            },
            colCount: 2,
            height: 800
          });
          var $labels = $('#container .dx-responsivebox label');
          var $editors = $('#container .dx-responsivebox .dx-texteditor-input');
          assert.equal($labels.eq(0).text(), 'Name', '0 label');
          assert.equal($labels.eq(1).text(), 'Address', '1 label');
          assert.equal($labels.eq(2).text(), 'Room', '2 label');
          assert.equal($labels.eq(3).text(), 'Gender', '3 label');
          assert.equal($labels.eq(4).text(), 'Id', '4 label');
          assert.equal($editors.eq(0).val(), 'Patti', '0 input');
          assert.equal($editors.eq(1).val(), 'Test town', '1 input');
          assert.equal($editors.eq(2).val(), '101', '2 input');
          assert.equal($editors.eq(3).val(), 'male', '3 input');
          assert.equal($editors.eq(4).val(), 'test id', '4 input');
        });
        test('Check that layoutManager create correct rows count', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 2,
            height: 800
          }).dxLayoutManager('instance');
          assert.equal(layoutManager._getRowsCount(), 6, '11 items / 2 columns = 6 rows');
        });
        test('Check rows and cols in responsiveBox', function(assert) {
          $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 2,
            height: 800
          });
          var responsiveBox = $('#container').find('.dx-responsivebox').dxResponsiveBox('instance');
          assert.equal(responsiveBox.option('cols').length, 2, 'cols count');
          assert.equal(responsiveBox.option('rows').length, 6, 'rows count');
        });
        test('Prepare items for col span', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 4,
            height: 800,
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
          }).dxLayoutManager('instance');
          var items = layoutManager._items;
          assert.equal(items.length, 15, 'items count');
          assert.deepEqual(items[0], {
            dataField: 'ID',
            editorType: 'dxNumberBox',
            visibleIndex: 0,
            col: 0,
            itemType: 'simple'
          }, '0 item');
          assert.deepEqual(items[1], {
            dataField: 'FirstName',
            colSpan: 2,
            editorType: 'dxTextBox',
            visibleIndex: 1,
            col: 1,
            itemType: 'simple'
          }, '1 item');
          assert.deepEqual(items[2], {merged: true}, '2 item, merged');
          assert.deepEqual(items[3], {
            dataField: 'LastName',
            editorType: 'dxTextBox',
            visibleIndex: 2,
            col: 3,
            itemType: 'simple'
          }, '3 item');
          assert.deepEqual(items[4], {
            dataField: 'Prefix',
            colSpan: 4,
            editorType: 'dxTextBox',
            visibleIndex: 3,
            col: 0,
            itemType: 'simple'
          }, '5 item');
          assert.deepEqual(items[5], {merged: true}, '6 item, merged');
          assert.deepEqual(items[6], {merged: true}, '7 item, merged');
          assert.deepEqual(items[7], {merged: true}, '8 item, merged');
          assert.deepEqual(items[8], {
            dataField: 'Position',
            editorType: 'dxTextBox',
            visibleIndex: 4,
            col: 0,
            itemType: 'simple'
          }, '9 item');
          assert.deepEqual(items[9], {
            dataField: 'Picture',
            editorType: 'dxTextBox',
            visibleIndex: 5,
            col: 1,
            itemType: 'simple'
          }, '10 item');
          assert.deepEqual(items[10], {
            dataField: 'BirthDate',
            editorType: 'dxTextBox',
            visibleIndex: 6,
            col: 2,
            itemType: 'simple'
          }, '11 item');
          assert.deepEqual(items[11], {
            dataField: 'HireDate',
            editorType: 'dxTextBox',
            visibleIndex: 7,
            col: 3,
            itemType: 'simple'
          }, '12 item');
          assert.deepEqual(items[12], {
            dataField: 'Notes',
            editorType: 'dxTextBox',
            visibleIndex: 8,
            col: 0,
            itemType: 'simple'
          }, '13 item');
          assert.deepEqual(items[13], {
            dataField: 'Address',
            editorType: 'dxTextBox',
            visibleIndex: 9,
            col: 1,
            itemType: 'simple'
          }, '14 item');
          assert.deepEqual(items[14], {
            dataField: 'StateID',
            editorType: 'dxNumberBox',
            visibleIndex: 10,
            col: 2,
            itemType: 'simple'
          }, '15 item');
        });
        test('Generate layout items for col span', function(assert) {
          $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 4,
            height: 800,
            customizeItem: function(item) {
              switch (item.dataField) {
                case 'LastName':
                case 'FirstName':
                  item.colSpan = 2;
                  break;
                case 'Prefix':
                  item.colSpan = 4;
                  break;
                case 'StateID':
                  item.colSpan = 3;
                  break;
              }
            }
          }).dxLayoutManager('instance');
          var responsiveBox = $('.dx-responsivebox').dxResponsiveBox('instance');
          var items = responsiveBox.option('items');
          assert.equal(items.length, 11, 'responsiveBox items count');
          assert.equal(items[0].location.colspan, undefined, 'ID has no colSpan');
          assert.equal(items[1].location.colspan, 2, 'FirstName has colSpan');
          assert.equal(items[2].location.colspan, undefined, 'LastName has no colSpan');
          assert.equal(items[3].location.colspan, 4, 'Prefix has colSpan');
          assert.equal(items[4].location.colspan, undefined, 'Position has no colSpan');
          assert.equal(items[5].location.colspan, undefined, 'Picture has no colSpan');
          assert.equal(items[6].location.colspan, undefined, 'BirthDate has no colSpan');
          assert.equal(items[7].location.colspan, undefined, 'HireDate has no colSpan');
          assert.equal(items[8].location.colspan, undefined, 'Notes has no colSpan');
          assert.equal(items[9].location.colspan, undefined, 'Address has no colSpan');
          assert.equal(items[10].location.colspan, undefined, 'StateID has no colSpan');
        });
        test('Prepare items for col span when labelLocation is \'top\' (T307223)', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 4,
            labelLocation: 'top',
            height: 800,
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
          }).dxLayoutManager('instance');
          var items = layoutManager._items;
          assert.equal(items.length, 15, 'items count');
          assert.deepEqual(items[0], {
            dataField: 'ID',
            editorType: 'dxNumberBox',
            visibleIndex: 0,
            col: 0,
            itemType: 'simple'
          }, '0 item');
          assert.deepEqual(items[1], {
            dataField: 'FirstName',
            colSpan: 2,
            editorType: 'dxTextBox',
            visibleIndex: 1,
            col: 1,
            itemType: 'simple'
          }, '1 item');
          assert.deepEqual(items[2], {merged: true}, '2 item, merged');
          assert.deepEqual(items[3], {
            dataField: 'LastName',
            editorType: 'dxTextBox',
            visibleIndex: 2,
            col: 3,
            itemType: 'simple'
          }, '3 item');
          assert.deepEqual(items[4], {
            dataField: 'Prefix',
            colSpan: 4,
            editorType: 'dxTextBox',
            visibleIndex: 3,
            col: 0,
            itemType: 'simple'
          }, '5 item');
          assert.deepEqual(items[5], {merged: true}, '6 item, merged');
          assert.deepEqual(items[6], {merged: true}, '7 item, merged');
          assert.deepEqual(items[7], {merged: true}, '8 item, merged');
          assert.deepEqual(items[8], {
            dataField: 'Position',
            editorType: 'dxTextBox',
            visibleIndex: 4,
            col: 0,
            itemType: 'simple'
          }, '9 item');
          assert.deepEqual(items[9], {
            dataField: 'Picture',
            editorType: 'dxTextBox',
            visibleIndex: 5,
            col: 1,
            itemType: 'simple'
          }, '10 item');
          assert.deepEqual(items[10], {
            dataField: 'BirthDate',
            editorType: 'dxTextBox',
            visibleIndex: 6,
            col: 2,
            itemType: 'simple'
          }, '11 item');
          assert.deepEqual(items[11], {
            dataField: 'HireDate',
            editorType: 'dxTextBox',
            visibleIndex: 7,
            col: 3,
            itemType: 'simple'
          }, '12 item');
          assert.deepEqual(items[12], {
            dataField: 'Notes',
            editorType: 'dxTextBox',
            visibleIndex: 8,
            col: 0,
            itemType: 'simple'
          }, '13 item');
          assert.deepEqual(items[13], {
            dataField: 'Address',
            editorType: 'dxTextBox',
            visibleIndex: 9,
            col: 1,
            itemType: 'simple'
          }, '14 item');
          assert.deepEqual(items[14], {
            dataField: 'StateID',
            editorType: 'dxNumberBox',
            visibleIndex: 10,
            col: 2,
            itemType: 'simple'
          }, '15 item');
        });
        test('Generate rows ratio for col span', function(assert) {
          $('#container').dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 4,
            height: 800,
            customizeItem: function(item) {
              switch (item.dataField) {
                case 'LastName':
                case 'FirstName':
                  item.colSpan = 2;
                  break;
                case 'Prefix':
                  item.colSpan = 4;
                  break;
                case 'StateID':
                  item.colSpan = 3;
                  break;
              }
            }
          }).dxLayoutManager('instance');
          var responsiveBox = $('.dx-responsivebox').dxResponsiveBox('instance');
          var rows = responsiveBox.option('rows');
          assert.equal(rows.length, 4);
        });
        test('Change of editor\'s value changing \'layoutData\' option', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {FamousPirate: 'John Morgan'}});
          $testContainer.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
          assert.deepEqual($testContainer.dxLayoutManager('instance').option('layoutData'), {FamousPirate: 'Cpt. Jack Sparrow'}, 'Correct layoutData');
        });
        test('Change of editor\'s value changing \'items.editorOptions.value\' option', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{
              dataField: 'FamousPirate',
              editorType: 'dxTextBox',
              editorOptions: {value: 'John Morgan'}
            }]});
          $testContainer.find('.dx-textbox').dxTextBox('instance').option('value', 'Cpt. Jack Sparrow');
          assert.deepEqual($testContainer.dxLayoutManager('instance').option('layoutData'), {'FamousPirate': 'Cpt. Jack Sparrow'}, 'Correct layoutData');
        });
        test('Render when \'colCount\' is \'auto\' and have 1 item', function(assert) {
          var $testContainer = $('#container').width(450);
          $testContainer.dxLayoutManager({
            layoutData: {test: 'abc'},
            colCount: 'auto',
            minColWidth: 200
          });
          var instance = $testContainer.dxLayoutManager('instance');
          var colCount = instance._getColCount();
          assert.equal(colCount, 1, 'We have only 1 column, because have only one item');
        });
        test('Correct colCount when width is less that minColWidth and colCount is auto', function(assert) {
          var $testContainer = $('#container').width(450);
          $testContainer.dxLayoutManager({
            layoutData: {test: 'abc'},
            colCount: 'auto',
            minColWidth: 200,
            width: 100
          });
          var instance = $testContainer.dxLayoutManager('instance');
          var colCount = instance._getColCount();
          assert.equal(colCount, 1, 'Correct colCount');
        });
        test('Render when \'colCount\' is \'auto\' and have 3 items', function(assert) {
          var $testContainer = $('#container').width(450);
          $testContainer.dxLayoutManager({
            layoutData: {
              test1: 'abc',
              test2: 'qwe',
              test3: 'xyz'
            },
            colCount: 'auto',
            minColWidth: 200
          });
          var instance = $testContainer.dxLayoutManager('instance');
          var colCount = instance._getColCount();
          var expectedColCount = windowUtils.hasWindow() ? 2 : 1;
          assert.equal(colCount, expectedColCount, 'We have only 2 columns');
        });
        test('Change minColWidth when colCount is auto', function(assert) {
          var $testContainer = $('#container').width(450);
          $testContainer.dxLayoutManager({
            layoutData: {
              test1: 'abc',
              test2: 'qwe',
              test3: 'xyz'
            },
            colCount: 1,
            minColWidth: 200
          });
          var instance = $testContainer.dxLayoutManager('instance');
          var invalidateStub = sinon.stub(instance, '_invalidate');
          instance.option('minColWidth', 100);
          assert.equal(invalidateStub.callCount, 0, 'Invalidate is not fired, because colCount is not auto');
          instance.option('colCount', 'auto');
          instance.option('minColWidth', 300);
          assert.equal(instance._getColCount(), 1, 'We have only 1 column');
          assert.equal(invalidateStub.callCount, 2, 'Invalidate fire 2 times, change colCount and change minColWidth');
          invalidateStub.restore();
        });
        test('Clear item watchers after disposing', function(assert) {
          var $testContainer = $('#container').width(450);
          $testContainer.dxLayoutManager({layoutData: {
              test1: 'abc',
              test2: 'qwe',
              test3: 'xyz'
            }});
          var instance = $testContainer.dxLayoutManager('instance');
          var cleanWatcherStub = sinon.stub(instance, '_cleanItemWatchers');
          instance.$element().remove();
          assert.equal(cleanWatcherStub.callCount, 1, '_cleanItemWatchers is fired');
          cleanWatcherStub.restore();
        });
        test('Render validate', function(assert) {
          var $container = $('#container');
          $container.dxLayoutManager({
            layoutData: createTestObject(),
            colCount: 4,
            height: 800,
            form: {
              option: function() {},
              getItemID: function(name) {
                return 'dx_FormID_' + name;
              }
            },
            customizeItem: function(item) {
              switch (item.dataField) {
                case 'LastName':
                case 'FirstName':
                  item.editorOptions = {value: ''};
                  item.validationRules = [{type: 'required'}];
                  break;
              }
            }
          });
          assert.equal($container.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 2, '2 validation marks rendered');
          assert.equal($container.find('.dx-validator [id=\'dx_FormID_LastName\']').length, 1, 'validator for lastName');
          assert.equal($container.find('.dx-validator [id=\'dx_FormID_FirstName\']').length, 1, 'validator for lastName');
        });
        test('Validation rules and required marks render', function(assert) {
          var $container = $('#container');
          $container.dxLayoutManager({
            layoutData: {
              field1: 3,
              field2: 4,
              field3: 6,
              field4: 6
            },
            colCount: 4,
            height: 800,
            items: [{
              dataField: 'field1',
              validationRules: [{type: 'numeric'}]
            }, {
              dataField: 'field2',
              validationRules: [{type: 'numeric'}, {type: 'required'}]
            }, {
              dataField: 'field3',
              validationRules: [{type: 'required'}, {type: 'numeric'}]
            }, {
              dataField: 'field4',
              validationRules: [{type: 'required'}]
            }]
          });
          assert.equal($container.find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 3, '3 required marks rendered');
          assert.equal($container.find('.' + FIELD_ITEM_CLASS).first().find('.' + FIELD_ITEM_REQUIRED_MARK_CLASS).length, 0, 'First item does not have required mark');
        });
      });
      QUnit.module('Templates', function() {
        test('Render template', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {test: 'abc'},
            items: [{
              dataField: 'test',
              template: function(data, container) {
                assert.deepEqual(isRenderer(container), !!config().useJQuery, 'container is correct');
                $(container).append($('<span>').text('Template'));
                data.editorOptions.onValueChanged = function(args) {
                  data.component.option('layoutData.' + data.dataField, args.value);
                };
                $('<div>').dxTextArea(data.editorOptions).appendTo(container);
              }
            }]
          });
          var $fieldItemWidget = $testContainer.find('.' + FIELD_ITEM_CONTENT_CLASS);
          var spanText = $fieldItemWidget.find('span').text();
          var textArea = $fieldItemWidget.find('.dx-textarea').dxTextArea('instance');
          var layoutManager = $testContainer.dxLayoutManager('instance');
          assert.equal(spanText, 'Template');
          assert.equal(textArea.option('value'), layoutManager.option('layoutData.test'), 'Widget\'s value equal to bound datafield');
        });
        test('Render label template', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {test: 'abc'},
            items: [{
              dataField: 'test',
              template: function(data, container) {
                assert.deepEqual(isRenderer(container), !!config().useJQuery, 'container is correct');
                $(container).append($('<span>').text('Template'));
                data.editorOptions.onValueChanged = function(args) {
                  data.component.option('layoutData.' + data.dataField, args.value);
                };
                $('<div>').dxTextArea(data.editorOptions).appendTo(container);
              }
            }]
          });
          var $fieldItemWidget = $testContainer.find('.' + FIELD_ITEM_CONTENT_CLASS);
          var spanText = $fieldItemWidget.find('span').text();
          var textArea = $fieldItemWidget.find('.dx-textarea').dxTextArea('instance');
          var layoutManager = $testContainer.dxLayoutManager('instance');
          assert.equal(spanText, 'Template');
          assert.equal(textArea.option('value'), layoutManager.option('layoutData.test'), 'Widget\'s value equal to bound datafield');
        });
        test('Check arguments of the label template', function(assert) {
          var labelTemplateStub = sinon.stub();
          var layoutManager = $('#container').dxLayoutManager({items: [{
              name: 'TestName',
              dataField: 'TestDataField',
              editorType: 'dxColorBox',
              editorOptions: {text: 'TestText'},
              label: {
                showColon: true,
                template: labelTemplateStub
              }
            }]}).dxLayoutManager('instance');
          var args = labelTemplateStub.firstCall.args[0];
          assert.strictEqual(args.name, 'TestName', 'name argument');
          assert.strictEqual(args.text, 'Test Data Field:', 'text argument');
          assert.strictEqual(args.dataField, 'TestDataField', 'dataField argument');
          assert.strictEqual(args.editorType, 'dxColorBox', 'editorType argument');
          assert.deepEqual(args.editorOptions.inputAttr, {}, 'editorOptions.inputAttr argument');
          assert.strictEqual(args.editorOptions.name, 'TestDataField', 'editorOptions.name argument');
          assert.strictEqual(args.editorOptions.text, 'TestText', 'editorOptions.text argument');
          assert.equal(args.component, layoutManager, 'component argument');
        });
        test('Label template should not be called for group items', function(assert) {
          var labelTemplateStub = sinon.stub();
          $('#container').dxLayoutManager({items: [{
              itemType: 'group',
              caption: 'Personal info',
              label: {template: labelTemplateStub}
            }]});
          assert.strictEqual(labelTemplateStub.callCount, 0, 'label template call count');
        });
        test('Check template bound to data', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {test: 'abc'},
            items: [{
              dataField: 'test',
              template: function(data, container) {
                var $container = $(container);
                $container.append($('<span>').text('Template'));
                data.editorOptions.onValueChanged = function(args) {
                  data.component.option('layoutData.' + data.dataField, args.value);
                };
                $('<div>').dxTextArea(data.editorOptions).appendTo($container);
              }
            }]
          });
          var $fieldItemWidget = $testContainer.find('.' + FIELD_ITEM_CONTENT_CLASS);
          var textArea = $fieldItemWidget.find('.dx-textarea').dxTextArea('instance');
          var layoutManager = $testContainer.dxLayoutManager('instance');
          textArea.option('value', 'qwerty');
          assert.equal(layoutManager.option('layoutData.test'), 'qwerty', 'Correct data');
        });
      });
      QUnit.module('Public methods', function() {
        test('UpdateData, simple case', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {
              test1: 'abc',
              test2: 'xyz'
            }});
          var layoutManager = $testContainer.dxLayoutManager('instance');
          layoutManager.updateData('test2', 'qwerty');
          assert.equal(layoutManager.option('layoutData.test2'), 'qwerty', 'Correct data');
        });
        test('UpdateData, update with object', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({layoutData: {
              test1: 'abc',
              test2: 'xyz'
            }});
          var layoutManager = $testContainer.dxLayoutManager('instance');
          layoutManager.updateData({
            test1: 'xyz',
            test2: 'qwerty'
          });
          assert.deepEqual(layoutManager.option('layoutData'), {
            test1: 'xyz',
            test2: 'qwerty'
          }, 'Correct data');
        });
        test('Get editor instance', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {
              test1: 'abc',
              test2: 'xyz'
            },
            items: ['test1', {
              name: 'test3',
              editorType: 'dxNumberBox'
            }]
          });
          var layoutManager = $testContainer.dxLayoutManager('instance');
          assert.ok(!isDefined(layoutManager.getEditor('test2')), 'We has\'t instance for \'test2\' field');
          assert.ok(isDefined(layoutManager.getEditor('test1')), 'We have instance for \'test1\' field');
          assert.ok(isDefined(layoutManager.getEditor('test3')), 'We have instance for \'test3\' field');
          assert.equal(layoutManager.getEditor('test1').NAME, 'dxTextBox', 'It\'s textbox');
          assert.equal(layoutManager.getEditor('test3').NAME, 'dxNumberBox', 'It\'s numberBox');
        });
      });
      QUnit.module('Accessibility', function() {
        test('Check required state', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: ['test1', {
              dataField: 'test2',
              isRequired: true
            }]});
          var $fieldItems = $testContainer.find('.' + FIELD_ITEM_CLASS);
          assert.equal($fieldItems.first().find('input').attr('aria-required'), 'false', 'First item isn\'t required');
          assert.equal($fieldItems.last().find('input').attr('aria-required'), 'true', 'Second item is required');
        });
        test('Check help text', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{
              dataField: 'test1',
              helpText: 'help text'
            }]});
          var $fieldItem = $testContainer.find('.' + FIELD_ITEM_CLASS);
          var itemDescribedBy = $fieldItem.find('input').attr('aria-describedby');
          var helpTextID = $fieldItem.find('.' + FIELD_ITEM_HELP_TEXT_CLASS).attr('id');
          assert.equal(itemDescribedBy, helpTextID, 'Help text id and input\'s describedby attributes are equal');
        });
        test('Check aria-labelledby attribute for ariaTarget and id attr for label (T813296)', function(assert) {
          var items = supportedEditors.map(function(editorType, index) {
            return ({
              dataField: ("test" + index),
              editorType: editorType
            });
          });
          var layoutManager = $('#container').dxLayoutManager({items: items}).dxLayoutManager('instance');
          var editorClassesRequiringIdForLabel = ['dx-radiogroup', 'dx-checkbox', 'dx-lookup', 'dx-slider', 'dx-rangeslider', 'dx-switch', 'dx-htmleditor'];
          items.forEach(function($__4) {
            var $__5 = $__4,
                dataField = $__5.dataField,
                editorType = $__5.editorType;
            var editor = layoutManager.getEditor(dataField);
            var $ariaTarget = isFunction(editor._getAriaTarget) ? editor._getAriaTarget() : editor.$element();
            var $label = editor.$element().closest(("." + FIELD_ITEM_CLASS)).children().first();
            var editorClassName = ("dx-" + editorType.toLowerCase().substr(2));
            if (editorClassesRequiringIdForLabel.includes(editorClassName)) {
              if (!(!windowUtils.hasWindow() && editorType === 'dxHtmlEditor')) {
                assert.ok($ariaTarget.attr('aria-labelledby'), ("aria-labeledby attribute " + editorClassName));
                assert.ok($label.attr('id'), ("label id attribute for " + editorClassName));
                assert.strictEqual($ariaTarget.attr('aria-labelledby'), $label.attr('id'), 'attributes aria-labelledby and labelID are equal');
              }
            } else {
              assert.equal($ariaTarget.eq(0).attr('aria-labelledby'), null, ("aria-labeledby attribute " + editorClassName));
              assert.equal($label.attr('id'), null, ("label id attribute for " + editorClassName));
            }
          });
        });
      });
      QUnit.module('Layout manager responsibility', {
        beforeEach: function() {
          responsiveBoxScreenMock.setup.call(this);
        },
        afterEach: function() {
          responsiveBoxScreenMock.teardown.call(this);
        }
      }, function() {
        test('Middle screen size', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            items: [{dataField: 'test1'}, {dataField: 'test2'}],
            colCount: 2,
            onLayoutChanged: function() {}
          });
          assert.ok(!$testContainer.hasClass(LAYOUT_MANAGER_ONE_COLUMN), 'Layout manager hasn\'t one column mode');
        });
        test('Small screen size', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            items: [{dataField: 'test1'}, {dataField: 'test2'}],
            colCount: 2,
            onLayoutChanged: function() {}
          });
          this.updateScreenSize(600);
          assert.ok($testContainer.hasClass(LAYOUT_MANAGER_ONE_COLUMN), 'Layout manager has one column mode');
        });
      });
      QUnit.module('Button item', function() {
        test('Base rendering', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{itemType: 'button'}, {
              itemType: 'button',
              buttonOptions: {text: 'Test'}
            }]});
          var $buttonItems = $testContainer.find('.dx-field-button-item');
          var secondButtonText = $buttonItems.last().text();
          assert.equal($buttonItems.length, 2, 'There are 2 button items');
          assert.ok($buttonItems.first().hasClass('dx-field-item'), 'Item has a field-item class');
          assert.ok($buttonItems.first().hasClass('dx-field-button-item'), 'Item has a field-button-item class');
          assert.equal(secondButtonText, 'Test', 'Button gets the correct config');
        });
        test('cssClass', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{
              itemType: 'button',
              cssClass: 'privateClass'
            }]});
          var $buttonItem = $testContainer.find('.dx-field-button-item');
          assert.ok($buttonItem.hasClass('privateClass'), 'Item has a custom class');
        });
        test('column class', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            colCount: 2,
            items: [{itemType: 'button'}, {itemType: 'button'}]
          });
          var $buttonItems = $testContainer.find('.dx-field-button-item');
          assert.ok($buttonItems.first().hasClass('dx-col-0'), 'Correct column index');
          assert.ok($buttonItems.first().hasClass('dx-first-col'), 'Correct column index');
          assert.ok($buttonItems.last().hasClass('dx-col-1'), 'Correct column index');
          assert.ok($buttonItems.last().hasClass('dx-last-col'), 'Correct column index');
        });
        test('Horizontal alignment', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{itemType: 'button'}, {
              itemType: 'button',
              horizontalAlignment: 'left'
            }, {
              itemType: 'button',
              horizontalAlignment: 'center'
            }]});
          var $buttonItems = $testContainer.find('.dx-field-button-item');
          assert.equal($buttonItems.first().css('textAlign'), 'right', 'By default buttons align by the right');
          assert.equal($buttonItems.eq(1).css('textAlign'), 'left', 'Left alignment accepted');
          assert.equal($buttonItems.last().css('textAlign'), 'center', 'Center alignment accepted');
        });
        test('Vertical alignment', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({items: [{itemType: 'button'}, {
              itemType: 'button',
              verticalAlignment: 'center'
            }, {
              itemType: 'button',
              verticalAlignment: 'bottom'
            }]});
          var $buttonItems = $testContainer.find('.dx-field-button-item');
          assert.equal($buttonItems.first().parent().css('justifyContent'), 'flex-start', 'By default buttons align by the center');
          assert.equal($buttonItems.eq(1).parent().css('justifyContent'), 'center', 'Top alignment accepted');
          assert.equal($buttonItems.last().parent().css('justifyContent'), 'flex-end', 'Bottom alignment accepted');
        });
      });
      QUnit.module('Supported editors', function() {
        var createFormWithSupportedEditors = function(commonEditorOptions) {
          return $('#container').dxLayoutManager({items: supportedEditors.map(function(supportedEditor) {
              return ({
                name: supportedEditor,
                editorType: supportedEditor,
                editorOptions: commonEditorOptions
              });
            })}).dxLayoutManager('instance');
        };
        var getEditorClassName = function(editorName) {
          return ("dx-" + editorName.substr(2, editorName.length - 1).toLowerCase());
        };
        var checkSupportedEditors = function(callBack) {
          return supportedEditors.forEach(function(supportedEditor) {
            return callBack(supportedEditor, getEditorClassName(supportedEditor));
          });
        };
        test('Render supported editors with default options', function(assert) {
          var layoutManager = createFormWithSupportedEditors();
          checkSupportedEditors(function(supportedEditor, className) {
            var editorInstance = layoutManager.getEditor(supportedEditor);
            assert.equal(editorInstance.NAME, supportedEditor, ("editor's name of the " + supportedEditor));
            assert.ok(editorInstance.$element().hasClass(className), ("editor's css class of " + supportedEditor));
          });
        });
        test('Editor type for items where this option is not defined', function(assert) {
          var consoleErrorStub = sinon.stub(consoleUtils.logger, 'error');
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {name: 'Patti'},
            items: [{dataField: 'name'}, {name: 'Test Name'}]
          }).dxLayoutManager('instance');
          assert.equal(layoutManager._items.length, 2, 'items count');
          assert.equal(layoutManager._items[0].editorType, 'dxTextBox', '1 item');
          assert.equal(layoutManager._items[1].editorType, undefined, '2 item has no dataField');
          var errorMessage = consoleErrorStub.getCall(0).args[0];
          assert.equal(consoleErrorStub.callCount, 1, 'error was raised for item without dataField and editorType');
          assert.equal(errorMessage.indexOf('E1035 - The editor cannot be created'), 0);
          assert.ok(errorMessage.indexOf('See:\nhttp://js.devexpress.com/error/') > 0);
          consoleErrorStub.restore();
        });
        test('Render RangeSlider', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {range: [1, 5]},
            items: [{
              dataField: 'range',
              editorType: 'dxRangeSlider'
            }, {
              dataField: 'noRange',
              editorType: 'dxRangeSlider'
            }]
          }).dxLayoutManager('instance');
          assert.deepEqual(layoutManager.getEditor('range').option('value'), [1, 5], 'Editor\'s value correct');
          layoutManager.getEditor('noRange').option('value', [2, 6]);
          assert.deepEqual(layoutManager.option('layoutData.noRange'), [2, 6], 'data updated');
        });
        test('Form with dxRadioGroup that items are defined via \'dataSource\' option renders without error', function(assert) {
          var $testContainer = $('#container');
          var errorMessage;
          var _error = consoleUtils.logger.log;
          try {
            consoleUtils.logger.error = function(message) {
              errorMessage = message;
            };
            $testContainer.dxLayoutManager({items: [{
                dataField: 'test1',
                editorType: 'dxRadioGroup',
                editorOptions: {dataSource: [1, 2, 3]}
              }]});
            assert.ok(!errorMessage, 'There is no error');
          } finally {
            consoleUtils.logger.error = _error;
          }
        });
        test('Set value to the dxSelectBox editor from data option', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: 'SuperLCD 70'},
            customizeItem: function(item) {
              item.editorType = 'dxSelectBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          });
          var selectBox = $testContainer.find('.dx-selectbox').first().dxSelectBox('instance');
          assert.deepEqual(selectBox.option('value'), 'SuperLCD 70');
        });
        test('Set default value to the dxSelectBox editor when dataField is not contained in a formData', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {name: 'Test'},
            items: ['Test', {
              dataField: 'simpleProducts',
              editorType: 'dxSelectBox',
              editorOptions: {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']}
            }]
          });
          var selectBox = $testContainer.find('.dx-selectbox').first().dxSelectBox('instance');
          assert.deepEqual(selectBox.option('value'), null);
        });
        test('Update value in dxSelectBox editor when data option is changed', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: 'SuperLCD 70'},
            customizeItem: function(item) {
              item.editorType = 'dxSelectBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          }).dxLayoutManager('instance');
          layoutManager.updateData('simpleProducts', 'SuperLED 50');
          var selectBox = $testContainer.find('.dx-selectbox').first().dxSelectBox('instance');
          assert.deepEqual(selectBox.option('value'), 'SuperLED 50');
          assert.ok(!layoutManager._isFieldValueChanged);
        });
        test('Set value to the dxTagBox editor from data option', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: ['HD Video Player', 'SuperLCD 70']},
            customizeItem: function(item) {
              item.editorType = 'dxTagBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          });
          var tagBox = $testContainer.find('.dx-tagbox').first().dxTagBox('instance');
          assert.deepEqual(tagBox.option('value'), ['HD Video Player', 'SuperLCD 70']);
        });
        test('Set default value to the dxTagBox editor when dataField is not contained in a formData', function(assert) {
          var $testContainer = $('#container');
          $testContainer.dxLayoutManager({
            layoutData: {name: 'Test'},
            items: ['Test', {
              dataField: 'simpleProducts',
              editorType: 'dxTagBox',
              editorOptions: {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']}
            }]
          });
          var tagBox = $testContainer.find('.dx-tagbox').first().dxTagBox('instance');
          assert.deepEqual(tagBox.option('value'), []);
        });
        test('Update value in dxTagBox editor when data option is changed', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: ['HD Video Player', 'SuperLCD 70']},
            customizeItem: function(item) {
              item.editorType = 'dxTagBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          }).dxLayoutManager('instance');
          layoutManager.updateData('simpleProducts', ['SuperLED 50', 'SuperLCD 70', 'SuperLCD 55']);
          var tagBox = $testContainer.find('.dx-tagbox').first().dxTagBox('instance');
          assert.deepEqual(tagBox.option('value'), ['SuperLED 50', 'SuperLCD 70', 'SuperLCD 55']);
          assert.ok(!layoutManager._isFieldValueChanged);
        });
        test('Update data option of layout manager when value is changed in the dxSelectBox editor', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: 'SuperLCD 70'},
            customizeItem: function(item) {
              item.editorType = 'dxSelectBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          }).dxLayoutManager('instance');
          var selectBox = $testContainer.find('.dx-selectbox').first().dxSelectBox('instance');
          selectBox.option('value', 'SuperPlasma 50');
          assert.deepEqual(layoutManager.option('layoutData.simpleProducts'), 'SuperPlasma 50');
          assert.ok(!layoutManager._isValueChangedCalled);
        });
        test('Update data option of layout manager when value is changed in the dxTagBox editor', function(assert) {
          var $testContainer = $('#container');
          var layoutManager = $testContainer.dxLayoutManager({
            layoutData: {simpleProducts: ['HD Video Player', 'SuperLCD 70']},
            customizeItem: function(item) {
              item.editorType = 'dxTagBox';
              item.editorOptions = {dataSource: ['HD Video Player', 'SuperHD Video Player', 'SuperPlasma 50', 'SuperLED 50', 'SuperLED 42', 'SuperLCD 55', 'SuperLCD 42', 'SuperPlasma 65', 'SuperLCD 70']};
            }
          }).dxLayoutManager('instance');
          var tagBox = $testContainer.find('.dx-tagbox').first().dxTagBox('instance');
          tagBox.option('value', ['SuperLCD 42', 'SuperPlasma 50']);
          assert.deepEqual(layoutManager.option('layoutData.simpleProducts'), ['SuperLCD 42', 'SuperPlasma 50']);
          assert.ok(!layoutManager._isValueChangedCalled);
        });
        test('Check the Html Editor with a value and toolbar items', function(assert) {
          var expectedText = 'This <b>text</b> for testing the <i>Html Editor</i>';
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {description: expectedText},
            items: [{
              dataField: 'description',
              editorType: 'dxHtmlEditor',
              editorOptions: {toolbar: {items: ['undo', 'redo']}}
            }]
          }).dxLayoutManager('instance');
          assert.equal(layoutManager.getEditor('description').option('value'), expectedText, 'value of editor');
          if (windowUtils.hasWindow()) {
            assert.equal($('.dx-htmleditor-content').html(), '<p>This <strong>text</strong> for testing the <em>Html Editor</em></p>', 'HtmlEditor content');
            assert.equal($('.dx-undo-format.dx-button').length, 1, 'the undo button of toolbar is rendered');
            assert.equal($('.dx-redo-format.dx-button').length, 1, 'the redo button of toolbar is rendered');
          }
        });
        test('Check updating the layoutData when the value of the HtmlEditor is changed', function(assert) {
          var layoutManager = $('#container').dxLayoutManager({
            layoutData: {description: 'This <b>text</b> for testing the <i>Html Editor</i>'},
            items: [{
              dataField: 'description',
              editorType: 'dxHtmlEditor',
              editorOptions: {toolbar: {items: ['undo', 'redo']}}
            }]
          }).dxLayoutManager('instance');
          var editor = layoutManager.getEditor('description');
          editor.option('value', 'new <b>value</b>');
          if (windowUtils.hasWindow()) {
            assert.equal($('.dx-htmleditor-content').html(), '<p>new <strong>value</strong></p>', 'HtmlEditor content');
            assert.deepEqual(layoutManager.option('layoutData'), {description: '<p>new <strong>value</strong></p>'}, 'layoutData');
          } else {
            assert.deepEqual(layoutManager.option('layoutData'), {description: 'new <b>value</b>'}, 'layoutData');
          }
        });
      });
      QUnit.module('ReadOnly option', function() {
        var getEditorClassName = function(editorName) {
          return (("dx-" + editorName.substr(2, editorName.length - 1).toLowerCase()));
        };
        var checkSupportedEditors = function(callBack) {
          return (supportedEditors.forEach(function(supportedEditor) {
            return (callBack(supportedEditor, getEditorClassName(supportedEditor)));
          }));
        };
        var isEditorReadOnly = function($container, editorClassName) {
          return ($container.find(("." + FIELD_ITEM_CLASS + " ." + editorClassName)).hasClass(READONLY_STATE_CLASS));
        };
        test('editors should be read only when readOnly option is enabled in the editorOptions', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({items: supportedEditors.map(function(supportedEditor) {
              return ({
                name: supportedEditor,
                editorType: supportedEditor,
                editorOptions: {readOnly: true}
              });
            })});
          checkSupportedEditors(function(editor, className) {
            assert.ok(isEditorReadOnly($testContainer, className), (editor + ": editor is read only"));
          });
        });
        test('editors should not be read only when readOnly option is enabled in form, but in the editorOptions it is set to false', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                name: supportedEditor,
                editorType: supportedEditor,
                editorOptions: {readOnly: false}
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.notOk(isEditorReadOnly($testContainer, className), (editor + ": editor is not read only"));
          });
        });
        test('editors should be read only when readOnly option is enabled in form and in the editorOptions is not set', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                name: supportedEditor,
                editorType: supportedEditor
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.ok(isEditorReadOnly($testContainer, className), (editor + ": editor is read only"));
          });
        });
        test('editors should change their readonly state after change readOnly option in form if editorOptions.readOnly is not specified', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                dataField: supportedEditor,
                editorType: supportedEditor
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.ok(isEditorReadOnly($testContainer, className), (editor + ": editor is read only"));
          });
          $testContainer.dxLayoutManager('instance').option('readOnly', false);
          checkSupportedEditors(function(editor, className) {
            assert.notOk(isEditorReadOnly($testContainer, className), (editor + ": editor is not read only"));
          });
        });
        test('editors should not change their readonly state after change readOnly option in form if readOnly option is also set in editors options', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: false,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                dataField: supportedEditor,
                editorType: supportedEditor,
                editorOptions: {readOnly: false}
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.notOk(isEditorReadOnly($testContainer, className), (editor + ": editor is not read only"));
          });
          $testContainer.dxLayoutManager('instance').option('readOnly', true);
          checkSupportedEditors(function(editor, className) {
            assert.notOk(isEditorReadOnly($testContainer, className), (editor + ": editor is not read only"));
          });
        });
        test('editors should not has readonly state if editorOptions.readOnly is null', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                dataField: supportedEditor,
                editorType: supportedEditor,
                editorOptions: {readOnly: null}
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.notOk(isEditorReadOnly($testContainer, className), (editor + ": editor is not read only"));
          });
        });
        test('editors should has readonly state if editorOptions.readOnly is undefined and form readOnly is true', function(assert) {
          var $testContainer = $('#container').dxLayoutManager({
            readOnly: true,
            items: supportedEditors.map(function(supportedEditor) {
              return ({
                dataField: supportedEditor,
                editorType: supportedEditor,
                editorOptions: {readOnly: undefined}
              });
            })
          });
          checkSupportedEditors(function(editor, className) {
            assert.ok(isEditorReadOnly($testContainer, className), (editor + ": editor is read only"));
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/console","../../helpers/responsiveBoxScreenMock.js","ui/form/constants","ui/form/components/field_item","ui/form/components/label","ui/form/components/empty_item","core/config","core/utils/type","core/utils/window","ui/switch","ui/autocomplete","ui/color_box","ui/drop_down_box","ui/select_box","ui/tag_box","ui/lookup","ui/text_area","ui/radio_group","ui/range_slider","ui/slider","ui/html_editor","../../helpers/ignoreQuillTimers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/console"), require("../../helpers/responsiveBoxScreenMock.js"), require("ui/form/constants"), require("ui/form/components/field_item"), require("ui/form/components/label"), require("ui/form/components/empty_item"), require("core/config"), require("core/utils/type"), require("core/utils/window"), require("ui/switch"), require("ui/autocomplete"), require("ui/color_box"), require("ui/drop_down_box"), require("ui/select_box"), require("ui/tag_box"), require("ui/lookup"), require("ui/text_area"), require("ui/radio_group"), require("ui/range_slider"), require("ui/slider"), require("ui/html_editor"), require("../../helpers/ignoreQuillTimers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=formLayoutManager.markup.tests.js.map