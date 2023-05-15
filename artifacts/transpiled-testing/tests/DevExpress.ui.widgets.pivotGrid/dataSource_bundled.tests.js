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

(["testing/tests/DevExpress.ui.widgets.pivotGrid/dataSource_bundled.tests.js"], ["jquery","data/array_store","data/custom_store","core/utils/inflector","__internal/grids/pivot_grid/data_source/module","__internal/grids/pivot_grid/summary_display_modes/module","__internal/grids/pivot_grid/xmla_store/module","__internal/grids/pivot_grid/local_store/module","__internal/grids/pivot_grid/remote_store/module","__internal/grids/pivot_grid/module_widget_utils","../../helpers/executeAsyncMock.js","../../content/orders.js","../../helpers/pivotGridTestSettings.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.pivotGrid/dataSource_bundled.tests.js", ["jquery", "data/array_store", "data/custom_store", "core/utils/inflector", "__internal/grids/pivot_grid/data_source/module", "__internal/grids/pivot_grid/summary_display_modes/module", "__internal/grids/pivot_grid/xmla_store/module", "__internal/grids/pivot_grid/local_store/module", "__internal/grids/pivot_grid/remote_store/module", "__internal/grids/pivot_grid/module_widget_utils", "../../helpers/executeAsyncMock.js", "../../content/orders.js", "../../helpers/pivotGridTestSettings.js"], function($__export) {
  "use strict";
  var $,
      ArrayStore,
      CustomStore,
      inflector,
      PivotGridDataSource,
      summaryDisplayModesModule,
      xmlaStoreModule,
      XmlaStore,
      LocalStore,
      RemoteStore,
      pivotGridUtils,
      setFieldProperty,
      executeAsyncMock,
      PivotGridTestSettings,
      defaultEnvironment;
  function createDataSource(options) {
    var dataSource = new PivotGridDataSource(options);
    dataSource.load();
    return dataSource;
  }
  function prepareFields(fields) {
    $.each(fields, function(index, field) {
      delete field.index;
      delete field._initProperties;
    });
    return fields;
  }
  function prepareLoadArgs(args) {
    var data = args[0];
    prepareFields(data.columns);
    prepareFields(data.rows);
    prepareFields(data.filters);
    prepareFields(data.values);
    return args;
  }
  function prepareLoadedData(data) {
    pivotGridUtils.foreachTree(data, function(items) {
      delete items[0].text;
    });
    return data;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      inflector = $__m.default;
    }, function($__m) {
      PivotGridDataSource = $__m.PivotGridDataSource;
    }, function($__m) {
      summaryDisplayModesModule = $__m.default;
    }, function($__m) {
      xmlaStoreModule = $__m.default;
      XmlaStore = $__m.XmlaStore;
    }, function($__m) {
      LocalStore = $__m.LocalStore;
    }, function($__m) {
      RemoteStore = $__m.RemoteStore;
    }, function($__m) {
      pivotGridUtils = $__m.default;
      setFieldProperty = $__m.setFieldProperty;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {}, function($__m) {
      PivotGridTestSettings = $__m.default;
    }],
    execute: function() {
      defaultEnvironment = {
        beforeEach: function() {
          this.testStore = sinon.createStubInstance(XmlaStore);
          this.defaultFields = [{
            dataField: 'Country',
            area: 'column'
          }, {
            dataField: 'City',
            area: 'column'
          }, {
            dataField: 'Year',
            area: 'row'
          }];
          this.storeData = {
            columns: [{
              index: 1,
              value: 'USA',
              children: [{
                index: 2,
                value: 'Boise'
              }, {
                index: 3,
                value: 'Elgin'
              }, {
                index: 4,
                value: 'Butte'
              }]
            }, {
              index: 5,
              value: 'Canada'
            }, {
              index: 6,
              value: 'Brazil',
              children: [{
                index: 7,
                value: 'Campinas'
              }, {
                index: 8,
                value: 'Sao Paulo'
              }]
            }],
            rows: [{
              index: 1,
              value: 1991
            }, {
              index: 2,
              value: 1991
            }, {
              index: 3,
              value: 1985
            }],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          executeAsyncMock.setup();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
        }
      };
      QUnit.module('dxPivotGrid dataSource with Store', {
        beforeEach: function() {
          var that = this;
          defaultEnvironment.beforeEach.apply(that, arguments);
          sinon.stub(inflector, 'titleize');
          inflector.titleize.returns('');
        },
        afterEach: function() {
          inflector.titleize.restore && inflector.titleize.restore();
          defaultEnvironment.afterEach.apply(this, arguments);
        }
      }, function() {
        QUnit.test('Create XmlaStore', function(assert) {
          sinon.spy(xmlaStoreModule, 'XmlaStore');
          var dataSource = createDataSource({store: {
              type: 'xmla',
              url: ''
            }});
          assert.ok(dataSource.store() instanceof XmlaStore);
          assert.ok(xmlaStoreModule.XmlaStore.calledOnce);
          assert.ok(xmlaStoreModule.XmlaStore.calledWithNew);
          assert.deepEqual(xmlaStoreModule.XmlaStore.lastCall.args, [{
            type: 'xmla',
            url: ''
          }]);
          xmlaStoreModule.XmlaStore.restore();
        });
        QUnit.test('Create XmlaStore with paginate', function(assert) {
          sinon.spy(xmlaStoreModule, 'XmlaStore');
          var dataSource = createDataSource({
            paginate: true,
            store: {
              type: 'xmla',
              url: ''
            }
          });
          assert.ok(dataSource.store() instanceof XmlaStore);
          assert.ok(dataSource.paginate());
          xmlaStoreModule.XmlaStore.restore();
        });
        QUnit.test('Create XmlaStore by Instance', function(assert) {
          sinon.spy(xmlaStoreModule, 'XmlaStore');
          var dataSource = createDataSource({store: new xmlaStoreModule.XmlaStore({
              type: 'xmla',
              url: ''
            })});
          assert.ok(dataSource.store() instanceof xmlaStoreModule.XmlaStore);
          assert.ok(xmlaStoreModule.XmlaStore.calledOnce);
          assert.ok(xmlaStoreModule.XmlaStore.calledWithNew);
          assert.deepEqual(xmlaStoreModule.XmlaStore.lastCall.args, [{
            type: 'xmla',
            url: ''
          }]);
          xmlaStoreModule.XmlaStore.restore();
        });
        QUnit.test('Create LocalStore when store with type', function(assert) {
          var dataSource = createDataSource({store: {
              type: 'array',
              data: []
            }});
          assert.ok(dataSource.store() instanceof LocalStore);
        });
        QUnit.test('Create RemoteStore when store with type', function(assert) {
          var dataSource = createDataSource({
            remoteOperations: true,
            store: {
              type: 'array',
              data: []
            }
          });
          assert.ok(dataSource.store() instanceof RemoteStore);
        });
        QUnit.test('Create store with class instance', function(assert) {
          var dataSource = createDataSource({store: this.testStore});
          assert.equal(dataSource.store(), this.testStore);
          assert.ok(this.testStore.load.called);
        });
        QUnit.test('Create store with ArrayStore instance', function(assert) {
          var arrayStore = new ArrayStore([]);
          var dataSource = createDataSource({store: arrayStore});
          assert.ok(dataSource.store() instanceof LocalStore);
          assert.ok(dataSource.store()._dataSource.store() instanceof ArrayStore);
        });
        QUnit.test('Create store with ArrayStore instance and remote operations', function(assert) {
          var arrayStore = new ArrayStore([]);
          var dataSource = createDataSource({
            remoteOperations: true,
            store: arrayStore
          });
          assert.ok(dataSource.store() instanceof RemoteStore);
          assert.ok(dataSource.store()._dataSource.store() instanceof ArrayStore);
        });
        QUnit.test('Create store with load function', function(assert) {
          var dataSource = createDataSource({load: function() {
              return [];
            }});
          assert.ok(dataSource.store() instanceof LocalStore);
          assert.ok(dataSource.store()._dataSource.store() instanceof CustomStore);
        });
        QUnit.test('Create store with load function and remote operations', function(assert) {
          var dataSource = createDataSource({
            remoteOperations: true,
            load: function() {
              return [];
            }
          });
          assert.notOk(dataSource.paginate(), 'no paginate');
          assert.ok(dataSource.store() instanceof RemoteStore);
          assert.ok(dataSource.store()._dataSource.store() instanceof CustomStore);
        });
        QUnit.test('Create store with load function and paginate', function(assert) {
          var dataSource = createDataSource({
            paginate: true,
            load: function() {
              return [];
            }
          });
          assert.notOk(dataSource.paginate(), 'no paginate');
          assert.ok(dataSource.store() instanceof RemoteStore, 'PivotGrid store type is remote');
          assert.ok(dataSource.store()._dataSource.store() instanceof CustomStore, 'inner store type is custom');
        });
        QUnit.test('Create LocalStore with onChanged event', function(assert) {
          var onChangedCallCount = 0;
          var dataSource = createDataSource({
            store: {
              type: 'array',
              data: []
            },
            onChanged: function() {
              assert.equal(arguments.length, 0, 'no changed arguments');
              onChangedCallCount++;
            }
          });
          assert.ok(dataSource.store() instanceof LocalStore);
          assert.equal(onChangedCallCount, 1, 'changed call count');
        });
        QUnit.test('Create simple store by data', function(assert) {
          executeAsyncMock.teardown();
          var dataSource = createDataSource({
            fields: [{area: 'column'}, {
              area: 'data',
              caption: 'Sum',
              format: 'fixedPoint'
            }],
            columns: [{value: 'B'}, {value: 'A'}]
          });
          assert.ok(!dataSource.store(), 'no store instance');
          assert.ok(!dataSource.isLoading(), 'no async loading');
          assert.deepEqual(dataSource.getData().fields.length, 2);
          assert.deepEqual(dataSource.getData().rows.length, 0);
          assert.deepEqual(dataSource.getData().values.length, 0);
          assert.deepEqual(dataSource.getData().columns.length, 2);
          assert.deepEqual(dataSource.getData().columns[0].value, 'B');
          assert.deepEqual(dataSource.getData().columns[1].value, 'A');
          assert.deepEqual(dataSource.getAreaFields('column').length, 1);
          assert.deepEqual(dataSource.getAreaFields('row').length, 0);
          assert.deepEqual(dataSource.getAreaFields('data').length, 1);
        });
        QUnit.test('onChanged event reset data to default loaded data', function(assert) {
          var onChangedCallCount = 0;
          var dataSource = createDataSource({
            fields: [{
              dataField: 'test',
              area: 'data',
              summaryType: 'sum'
            }],
            store: {
              type: 'array',
              data: [{test: 5}]
            },
            onChanged: function() {
              var data = this.getData();
              assert.equal(data.values[0][0][0], 5, 'loaded test value');
              data.values[0][0][0] = data.values[0][0][0] + 1;
              onChangedCallCount++;
            }
          });
          assert.equal(dataSource.getData().values[0][0][0], 6, 'test value after changed handler');
          assert.equal(onChangedCallCount, 1, 'changed call count');
          dataSource.load();
          assert.equal(dataSource.getData().values[0][0][0], 6, 'test value after changed handler');
          assert.equal(onChangedCallCount, 2, 'changed call count');
        });
        QUnit.test('Create LocalStore with filter', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'value',
              area: 'row'
            }],
            filter: ['value', '>', 1],
            store: {
              type: 'array',
              data: [{value: 1}, {value: 2}]
            }
          });
          assert.ok(dataSource.store() instanceof LocalStore);
          assert.equal(dataSource.getData().rows.length, 1, 'row count');
          assert.equal(dataSource.getData().rows[0].value, 2, 'row value');
        });
        QUnit.test('CreateDrillDown dataSource', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'value',
              area: 'row'
            }],
            store: this.testStore
          });
          var drillDownParams = {
            columnPath: [],
            rowPath: []
          };
          var drillDownDataSource = dataSource.createDrillDownDataSource(drillDownParams);
          prepareFields(dataSource.fields());
          assert.ok(this.testStore.createDrillDownDataSource.calledOnce);
          assert.deepEqual(this.testStore.createDrillDownDataSource.lastCall.args[0], {
            columns: [],
            filters: [],
            rows: [{
              area: 'row',
              areaIndex: 0,
              caption: '',
              dataField: 'value'
            }],
            values: []
          });
          assert.strictEqual(this.testStore.createDrillDownDataSource.lastCall.args[1], drillDownParams);
          assert.deepEqual(this.testStore.createDrillDownDataSource.lastCall.returnValue, drillDownDataSource);
        });
        QUnit.test('getAreaFields', function(assert) {
          var fields = [{
            dataField: '[Color]',
            area: 'row',
            areaIndex: 2
          }, {
            dataField: '[Product].[Subcategory]',
            groupName: '[Product]',
            area: 'column',
            groupIndex: 1
          }, {
            dataField: '[Date]',
            groupName: '[Date]',
            area: 'row',
            areaIndex: 0
          }, {
            dataField: '[Date].[Year]',
            groupName: '[Date]',
            area: 'row',
            areaIndex: 0,
            groupIndex: 0
          }, {
            dataField: '[Product].[Category]',
            groupName: '[Product]',
            groupIndex: 0
          }, {
            dataField: '[Product]',
            groupName: '[Product]',
            area: 'column',
            areaIndex: 1
          }, {
            dataField: '[Customer Count]',
            groupName: '[Customer Count]',
            area: 'data'
          }, {
            dataField: '[Customer Count]',
            groupName: '[Customer Count]',
            groupIndex: 0,
            groupInterval: 100
          }, {
            dataField: '[Customer Count]',
            groupName: '[Customer Count]',
            groupIndex: 1,
            groupInterval: 10
          }];
          var dataSource = createDataSource({
            fields: fields,
            store: this.testStore
          });
          assert.deepEqual(dataSource.getAreaFields('column'), [fields[4], fields[1]], 'column area fields');
          assert.deepEqual(dataSource.getAreaFields('column', true), [fields[5]], 'column area group fields');
          assert.deepEqual(dataSource.getAreaFields('row'), [fields[3], fields[0]], 'row area fields');
          assert.deepEqual(dataSource.getAreaFields('row', true), [fields[2], fields[0]], 'row area group fields');
          assert.deepEqual(dataSource.getAreaFields('data'), [fields[6]], 'row area fields');
          assert.deepEqual(dataSource.getAreaFields('data', true), [fields[6]], 'row area group fields');
          assert.deepEqual(dataSource.getAreaFields('filter'), [], 'filter area fields');
        });
        QUnit.test('getAreaFields for many data fields', function(assert) {
          var fields = [{
            area: 'data',
            caption: '1'
          }, {
            area: 'data',
            caption: '2'
          }, {
            area: 'data',
            caption: '3'
          }, {
            area: 'data',
            caption: '4'
          }, {
            area: 'data',
            caption: '5'
          }, {
            area: 'data',
            caption: '6'
          }, {
            area: 'data',
            caption: '7'
          }, {
            area: 'data',
            caption: '8'
          }, {
            area: 'data',
            caption: '9'
          }, {
            area: 'data',
            caption: '10'
          }, {
            area: 'data',
            caption: '11'
          }, {
            area: 'data',
            caption: '12'
          }];
          var dataSource = createDataSource({
            fields: fields,
            store: this.testStore
          });
          var dataFields = dataSource.getAreaFields('data');
          assert.equal(dataFields.length, 12, 'data fields count');
          $.each(dataFields, function(index, dataField) {
            var caption = (index + 1).toString();
            assert.equal(dataField.caption, caption, 'field ' + caption + ' caption');
          });
        });
        QUnit.test('Load Field Values', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var customizeFunction = function(arg) {
            return 'customized' + arg.value;
          };
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'filter',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              customizeText: customizeFunction
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 2001}, {value: 2002}, {value: 2003}],
            rows: [],
            values: [[6, 1, 2, 3]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          this.testStore.load.returns($.Deferred().resolve(loadResult));
          var fieldValues;
          dataSource.getFieldValues(1).done(function(data) {
            fieldValues = data;
          });
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            values: [dataSource.field(2)],
            columns: [{
              dataField: '[Ship Date].[Calendar Year]',
              areaIndex: 0,
              area: 'row',
              expanded: true,
              filterValues: null,
              sortBySummaryField: null,
              sortOrder: 'asc',
              caption: '',
              customizeText: customizeFunction
            }],
            rows: [],
            filters: [],
            skipValues: true
          }], 'load args');
          assert.deepEqual(fieldValues, loadResult.columns);
          assert.strictEqual(fieldValues[0].text, 'customized2001');
          assert.strictEqual(fieldValues[1].text, 'customized2002');
          assert.strictEqual(fieldValues[2].text, 'customized2003');
        });
        QUnit.test('Load Field Values with paginate', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'filter'
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{}, {value: 'cat2'}, {value: 'cat3'}, {}, {}],
            rows: [],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          this.testStore.load.returns($.Deferred().resolve(loadResult));
          var fieldValues;
          dataSource.getFieldValues(0, false, {
            skip: 1,
            take: 2,
            searchValue: 'cat'
          }).done(function(data) {
            fieldValues = data;
          });
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            columnSkip: 1,
            columnTake: 2,
            values: [],
            columns: [{
              dataField: '[Product].[Category]',
              area: 'filter',
              areaIndex: 0,
              expanded: true,
              filterValues: null,
              sortBySummaryField: null,
              sortOrder: 'asc',
              caption: '',
              searchValue: 'cat'
            }],
            rows: [],
            filters: [],
            skipValues: true
          }], 'load args');
          assert.deepEqual(fieldValues, loadResult.columns);
          assert.strictEqual(fieldValues.length, 2);
          assert.strictEqual(fieldValues[0].text, 'cat2');
          assert.strictEqual(fieldValues[1].text, 'cat3');
        });
        QUnit.test('Load Field Values with showRelevantValues', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Ship Date].[Calendar Year]',
              area: 'column',
              areaIndex: 0,
              filterValues: [2001]
            }, {
              dataField: '[Product].[Category]',
              area: 'filter',
              areaIndex: 0,
              filterValues: ['Bikes']
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'row',
              areaIndex: 0,
              filterValues: ['Bike 1']
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 'Bike 1'}, {value: 'Bike 2'}],
            rows: [],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          this.testStore.load.returns($.Deferred().resolve(loadResult));
          var fieldValues;
          var showRelevantValues = true;
          dataSource.getFieldValues(2, showRelevantValues).done(function(data) {
            fieldValues = data;
          });
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            values: [],
            columns: [{
              dataField: '[Product].[Subcategory]',
              area: 'row',
              areaIndex: 0,
              expanded: true,
              filterValues: null,
              sortBySummaryField: null,
              sortOrder: 'asc',
              caption: ''
            }],
            rows: [],
            filters: [{
              area: 'column',
              areaIndex: 0,
              caption: '',
              dataField: '[Ship Date].[Calendar Year]',
              filterValues: [2001]
            }, {
              area: 'filter',
              areaIndex: 0,
              caption: '',
              dataField: '[Product].[Category]',
              filterValues: ['Bikes']
            }],
            skipValues: true
          }], 'load args');
          assert.deepEqual(fieldValues, loadResult.columns);
          assert.strictEqual(fieldValues.length, 2);
          assert.strictEqual(fieldValues[0].text, 'Bike 1');
          assert.strictEqual(fieldValues[1].text, 'Bike 2');
        });
        QUnit.test('Reload data', function(assert) {
          var testStore = this.testStore;
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 2001}, {value: 2002}, {value: 2003}],
            rows: [],
            values: [[6, 1, 2, 3]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          this.testStore.load.returns($.Deferred().resolve(loadResult));
          dataSource.reload().done(function(data) {
            assert.deepEqual(data, loadResult);
            assert.deepEqual(prepareLoadArgs(testStore.load.lastCall.args), [{
              columnExpandedPaths: [],
              columns: [{
                area: 'column',
                areaIndex: 0,
                caption: '',
                dataField: '[Product].[Category]'
              }],
              filters: [],
              reload: true,
              rowExpandedPaths: [],
              rows: [{
                area: 'row',
                areaIndex: 0,
                caption: '',
                dataField: '[Ship Date].[Calendar Year]'
              }],
              values: [{
                area: 'data',
                areaIndex: 0,
                caption: 'Count',
                dataField: '[Measures].[Customer Count]'
              }]
            }]);
          });
        });
        QUnit.test('Filter', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          this.testStore.filter.returns('storeFilterResult');
          var result = dataSource.filter('a', '>', 10);
          assert.ok(this.testStore.filter.calledOnce);
          assert.deepEqual(this.testStore.filter.lastCall.args, ['a', '>', 10]);
          assert.strictEqual(result, 'storeFilterResult');
        });
        QUnit.test('Load Field Values for group', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var customize1 = function(arg) {
            return 'customized1_' + arg.value;
          };
          var customize2 = function(arg) {
            return 'customized2_' + arg.value;
          };
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar]',
              groupName: '[Ship Date].[Calendar]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar].[Year]',
              groupName: '[Ship Date].[Calendar]',
              groupIndex: 0,
              customizeText: customize1
            }, {
              dataField: '[Ship Date].[Calendar].[Month]',
              groupName: '[Ship Date].[Calendar]',
              groupIndex: 1,
              customizeText: customize2
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{
              value: 2001,
              children: [{value: 1}, {value: 2}]
            }, {
              value: 2002,
              children: [{value: 1}, {value: 2}]
            }, {
              value: 2003,
              children: [{value: 1}, {value: 2}]
            }],
            rows: [],
            values: [[6, 1, 2, 3]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          this.testStore.load.returns($.Deferred().resolve(loadResult));
          var fieldValues;
          dataSource.getFieldValues(1).done(function(data) {
            fieldValues = data;
          });
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            values: [dataSource.field(4)],
            columns: [{
              dataField: '[Ship Date].[Calendar].[Year]',
              areaIndex: 0,
              area: 'row',
              expanded: true,
              filterValues: null,
              sortBySummaryField: null,
              sortOrder: 'asc',
              groupName: '[Ship Date].[Calendar]',
              groupIndex: 0,
              caption: '',
              customizeText: customize1
            }, {
              dataField: '[Ship Date].[Calendar].[Month]',
              areaIndex: 0,
              area: 'row',
              expanded: true,
              filterValues: null,
              sortBySummaryField: null,
              sortOrder: 'asc',
              groupName: '[Ship Date].[Calendar]',
              groupIndex: 1,
              caption: '',
              customizeText: customize2
            }],
            skipValues: true,
            rows: [],
            filters: []
          }], 'load args');
          assert.deepEqual(fieldValues, loadResult.columns);
          assert.strictEqual(fieldValues[0].text, 'customized1_2001');
          assert.strictEqual(fieldValues[0].children[0].text, 'customized2_1');
          assert.strictEqual(fieldValues[0].children[1].text, 'customized2_2');
          assert.strictEqual(fieldValues[1].text, 'customized1_2002');
          assert.strictEqual(fieldValues[1].children[0].text, 'customized2_1');
        });
        QUnit.test('Fields visibility', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Month]',
              area: 'row',
              areaIndex: 0,
              visible: false
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              visible: true
            }, {
              dataField: 'Product',
              groupName: 'Product',
              area: 'row'
            }, {
              dataField: 'Product.Color',
              groupName: 'Product',
              groupIndex: 0,
              visible: true
            }, {
              dataField: 'Product.Width',
              groupName: 'Product',
              groupIndex: 1
            }, {
              dataField: 'Product.Height',
              groupName: 'Product',
              groupIndex: 2,
              visible: false
            }, {
              dataField: 'Calendar',
              groupName: 'Calendar',
              area: 'row',
              visible: false
            }, {
              dataField: 'Calendar.Year',
              groupName: 'Calendar',
              groupIndex: 0,
              visible: true
            }, {
              dataField: 'Calendar.Quarter',
              groupName: 'Calendar',
              groupIndex: 1,
              visible: true
            }, {
              dataField: 'Calendar.Month',
              groupName: 'Calendar',
              groupIndex: 2,
              visible: false
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'Field1',
              caption: 'Field1',
              area: 'data',
              visible: false
            }, {
              dataField: 'FilterField1',
              area: 'filter',
              visible: false
            }, {
              dataField: 'FilterField2',
              area: 'filter',
              visible: true
            }],
            store: this.testStore
          });
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].columns), [{
            area: 'column',
            areaIndex: 0,
            dataField: '[Product].[Category]',
            caption: ''
          }], 'column');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].rows), [{
            area: 'row',
            areaIndex: 0,
            dataField: '[Ship Date].[Calendar Year]',
            visible: true,
            caption: ''
          }, {
            dataField: 'Product.Color',
            groupName: 'Product',
            groupIndex: 0,
            visible: true,
            areaIndex: 1,
            area: 'row',
            caption: ''
          }, {
            dataField: 'Product.Width',
            groupName: 'Product',
            groupIndex: 1,
            areaIndex: 1,
            area: 'row',
            caption: ''
          }], 'rows');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].values), [{
            dataField: '[Measures].[Customer Count]',
            caption: 'Count',
            area: 'data',
            areaIndex: 0
          }, {
            dataField: 'Field1',
            caption: 'Field1',
            area: 'data',
            visible: false,
            areaIndex: 1
          }], 'data');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].filters), [{
            caption: '',
            dataField: 'FilterField1',
            area: 'filter',
            visible: false
          }, {
            caption: '',
            dataField: 'FilterField2',
            area: 'filter',
            visible: true,
            areaIndex: 0
          }], 'filter fields in store loadOptions');
          assert.strictEqual(dataSource.getAreaFields('filter').length, 2);
          assert.strictEqual(dataSource.getAreaFields('row', true).length, 2);
          assert.strictEqual(dataSource.getAreaFields('column', true).length, 1);
          assert.strictEqual(dataSource.getAreaFields('data', true).length, 2);
          assert.strictEqual(dataSource.fields().length, 15);
        });
        QUnit.test('Load store', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              allMember: '[All Products]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              allMember: '[All Periods]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'FilterField',
              area: 'filter',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 'column1'}],
            rows: [{value: 'rowValue'}],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              caption: 'Count',
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            columns: [{
              allMember: '[All Products]',
              dataField: '[Product].[Category]',
              areaIndex: 0,
              area: 'column',
              caption: ''
            }],
            rows: [{
              allMember: '[All Periods]',
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }],
            filters: [{
              dataField: 'FilterField',
              area: 'filter',
              areaIndex: 0,
              caption: ''
            }]
          }], 'load args');
        });
        QUnit.test('Handle error on loading', function(assert) {
          var def = $.Deferred();
          var errorHandler = sinon.stub();
          this.testStore.load.returns(def);
          createDataSource({
            fields: [],
            store: this.testStore,
            onLoadError: errorHandler
          });
          def.reject({message: 'my error'});
          assert.ok(errorHandler.calledOnce);
          assert.strictEqual(errorHandler.lastCall.args[0].message, 'my error');
        });
        QUnit.test('retrieve Fields', function(assert) {
          var retrieveFieldsDef = $.Deferred();
          this.testStore.getFields.returns(retrieveFieldsDef);
          var userFields = [{
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 0
          }, {
            dataField: '[Product].[Subcategory]',
            area: 'column',
            areaIndex: 1
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            area: 'row',
            areaIndex: 0
          }, {
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 0
          }, {
            dataField: 'date',
            area: 'row'
          }, {
            dataField: 'date',
            area: 'column',
            groupInterval: 'year'
          }, {
            dataField: 'Measure',
            summaryType: 'sum'
          }, {dataField: 'Measure'}];
          var dataSource = createDataSource({
            fields: userFields,
            store: this.testStore,
            retrieveFields: true
          });
          retrieveFieldsDef.resolve([{
            dataField: '[Product].[Category]',
            allMember: '[All Products]'
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Measures].[Customer Count]',
            caption: 'Count'
          }, {
            dataField: 'date',
            caption: 'date'
          }, {
            dataField: 'date',
            groupInterval: 'year',
            caption: 'date.year'
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }, {
            dataField: 'Measure',
            summaryType: 'avg'
          }]);
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.strictEqual(dataSource.fields().length, 10);
          $.each(dataSource.fields(), function(index, field) {
            assert.strictEqual(field.index, index, 'field index is correct');
          });
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 0,
            allMember: '[All Products]',
            caption: ''
          }, {
            dataField: '[Product].[Subcategory]',
            area: 'column',
            areaIndex: 1,
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            area: 'row',
            areaIndex: 0,
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 0,
            caption: 'Count'
          }, {
            area: 'row',
            areaIndex: 1,
            caption: 'date',
            dataField: 'date'
          }, {
            area: 'column',
            areaIndex: 2,
            caption: 'date.year',
            dataField: 'date',
            groupInterval: 'year'
          }, {
            dataField: 'Measure',
            summaryType: 'sum',
            caption: ' (Sum)'
          }, {
            dataField: 'Measure',
            summaryType: 'avg',
            caption: ' (Avg)'
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }]);
        });
        QUnit.test('retrieve Fields. Pass dataType to getFields method', function(assert) {
          this.testStore.getFields.returns($.Deferred());
          var userFields = [{
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 0
          }, {
            dataField: '[Product].[Subcategory]',
            area: 'column',
            areaIndex: 1
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            area: 'row',
            areaIndex: 0
          }, {
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 0
          }, {
            dataField: 'date',
            area: 'row'
          }, {
            dataField: 'date',
            area: 'column',
            groupInterval: 'year',
            dataType: 'date'
          }, {
            dataField: 'Measure',
            summaryType: 'sum'
          }, {
            dataField: 'Measure',
            dataType: 'number'
          }];
          createDataSource({
            fields: userFields,
            store: this.testStore,
            retrieveFields: true
          });
          assert.ok(this.testStore.getFields.calledOnce);
          assert.deepEqual(this.testStore.getFields.lastCall.args, [userFields]);
        });
        QUnit.test('retrieve Fields by default', function(assert) {
          var retrieveFieldsDef = $.Deferred();
          this.testStore.getFields.returns(retrieveFieldsDef);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'date',
              area: 'row'
            }, {
              dataField: 'date',
              area: 'column',
              groupInterval: 'year'
            }, {
              dataField: 'Measure',
              summaryType: 'sum',
              caption: ''
            }, {dataField: 'Measure'}],
            store: this.testStore
          });
          retrieveFieldsDef.resolve([{
            dataField: '[Product].[Category]',
            allMember: '[All Products]',
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: '[Measures].[Customer Count]',
            caption: 'Count'
          }, {
            dataField: 'date',
            caption: 'date'
          }, {
            dataField: 'date',
            groupInterval: 'year',
            caption: 'date.year'
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }, {
            dataField: 'Measure',
            summaryType: 'avg',
            caption: ''
          }]);
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 0,
            allMember: '[All Products]',
            caption: ''
          }, {
            dataField: '[Product].[Subcategory]',
            area: 'column',
            areaIndex: 1,
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            area: 'row',
            areaIndex: 0,
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 0,
            caption: 'Count'
          }, {
            area: 'row',
            areaIndex: 1,
            caption: 'date',
            dataField: 'date'
          }, {
            area: 'column',
            areaIndex: 2,
            caption: 'date.year',
            dataField: 'date',
            groupInterval: 'year'
          }, {
            dataField: 'Measure',
            summaryType: 'sum',
            caption: ''
          }, {
            dataField: 'Measure',
            summaryType: 'avg',
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }]);
        });
        QUnit.test('Retrieve fields. Create custom Group', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{dataField: 'Field1'}, {dataField: 'Field2'}, {dataField: 'Field3'}]));
          var dataSource = createDataSource({
            fields: [{groupName: 'Group1'}, {
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 0
            }, {
              dataField: 'Field2',
              groupName: 'Group1',
              groupIndex: 1
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 4);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            groupName: 'Group1',
            caption: '',
            levels: [{
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 0,
              caption: ''
            }, {
              dataField: 'Field2',
              groupName: 'Group1',
              groupIndex: 1,
              caption: ''
            }]
          }, {
            dataField: 'Field1',
            groupName: 'Group1',
            groupIndex: 0,
            caption: ''
          }, {
            dataField: 'Field2',
            groupName: 'Group1',
            groupIndex: 1,
            caption: ''
          }, {
            dataField: 'Field3',
            caption: ''
          }]);
        });
        QUnit.test('Retrieve fields. Create custom Group with dataField', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{dataField: 'Field1'}, {dataField: 'Field2'}]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              groupName: 'Group1',
              dataType: 'date'
            }, {
              groupName: 'Group1',
              groupIndex: 0,
              groupInterval: 'interval1'
            }, {
              groupName: 'Group1',
              groupIndex: 1,
              groupInterval: 'interval2'
            }, {
              dataField: 'Field3',
              groupName: 'Group1',
              groupIndex: 2,
              dataType: 'number'
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 5);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: 'Field1',
            groupName: 'Group1',
            caption: '',
            dataType: 'date',
            levels: [{
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 0,
              caption: '',
              groupInterval: 'interval1',
              dataType: 'date'
            }, {
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 1,
              caption: '',
              groupInterval: 'interval2',
              dataType: 'date'
            }, {
              dataField: 'Field3',
              caption: '',
              groupName: 'Group1',
              groupIndex: 2,
              dataType: 'number'
            }]
          }, {
            dataField: 'Field1',
            groupName: 'Group1',
            groupIndex: 0,
            caption: '',
            groupInterval: 'interval1',
            dataType: 'date'
          }, {
            dataField: 'Field1',
            groupName: 'Group1',
            groupIndex: 1,
            caption: '',
            groupInterval: 'interval2',
            dataType: 'date'
          }, {
            dataField: 'Field3',
            caption: '',
            groupName: 'Group1',
            groupIndex: 2,
            dataType: 'number'
          }, {
            dataField: 'Field2',
            caption: ''
          }]);
        });
        QUnit.test('Retrieve fields. Create custom Group. Use one field in some groups', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'Field1',
            dataType: 'number'
          }, {dataField: 'Field2'}, {dataField: 'Field3'}]));
          var dataSource = createDataSource({
            fields: [{groupName: 'Group1'}, {
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 0
            }, {
              dataField: 'Field2',
              groupName: 'Group1',
              groupIndex: 1
            }, {groupName: 'Group2'}, {
              dataField: 'Field3',
              groupName: 'Group2',
              groupIndex: 0
            }, {
              dataField: 'Field1',
              groupName: 'Group2',
              groupIndex: 1
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 6);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            groupName: 'Group1',
            caption: '',
            levels: [{
              dataField: 'Field1',
              groupName: 'Group1',
              groupIndex: 0,
              caption: '',
              dataType: 'number'
            }, {
              dataField: 'Field2',
              groupName: 'Group1',
              groupIndex: 1,
              caption: ''
            }]
          }, {
            dataField: 'Field1',
            groupName: 'Group1',
            groupIndex: 0,
            caption: '',
            dataType: 'number'
          }, {
            dataField: 'Field2',
            groupName: 'Group1',
            groupIndex: 1,
            caption: ''
          }, {
            groupName: 'Group2',
            caption: '',
            levels: [{
              dataField: 'Field3',
              groupName: 'Group2',
              groupIndex: 0,
              caption: ''
            }, {
              dataField: 'Field1',
              groupName: 'Group2',
              groupIndex: 1,
              caption: '',
              dataType: 'number'
            }]
          }, {
            dataField: 'Field3',
            groupName: 'Group2',
            groupIndex: 0,
            caption: ''
          }, {
            dataField: 'Field1',
            groupName: 'Group2',
            groupIndex: 1,
            caption: '',
            dataType: 'number'
          }]);
        });
        QUnit.test('Retrieve fields. Create custom Group. Get field from other store group', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'StoreGroup',
            groupName: 'StoreGroup'
          }, {
            dataField: 'Field1',
            groupName: 'StoreGroup',
            groupIndex: 0
          }, {
            dataField: 'Field2',
            groupName: 'StoreGroup',
            groupIndex: 1
          }, {
            dataField: 'Field3',
            groupName: 'StoreGroup',
            groupIndex: 2
          }]));
          var dataSource = createDataSource({
            fields: [{groupName: 'UserGroup'}, {
              dataField: 'Field2',
              groupName: 'UserGroup',
              groupIndex: 0
            }, {
              dataField: 'Field3',
              groupName: 'UserGroup',
              groupIndex: 1
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 5);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            groupName: 'UserGroup',
            caption: '',
            levels: [{
              dataField: 'Field2',
              groupName: 'UserGroup',
              groupIndex: 0,
              caption: ''
            }, {
              dataField: 'Field3',
              groupName: 'UserGroup',
              groupIndex: 1,
              caption: ''
            }]
          }, {
            dataField: 'Field2',
            groupName: 'UserGroup',
            groupIndex: 0,
            caption: ''
          }, {
            dataField: 'Field3',
            groupName: 'UserGroup',
            groupIndex: 1,
            caption: ''
          }, {
            dataField: 'StoreGroup',
            groupName: 'StoreGroup',
            caption: '',
            levels: [{
              dataField: 'Field1',
              groupName: 'StoreGroup',
              groupIndex: 0,
              caption: ''
            }]
          }, {
            dataField: 'Field1',
            groupName: 'StoreGroup',
            groupIndex: 0,
            caption: ''
          }]);
        });
        QUnit.test('Retrieve fields. Customize store group', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'StoreGroup',
            groupName: 'StoreGroup'
          }, {
            dataField: 'Field1',
            groupName: 'StoreGroup',
            groupIndex: 0
          }, {
            dataField: 'Field2',
            groupName: 'StoreGroup',
            groupIndex: 1
          }, {
            dataField: 'Field3',
            groupName: 'StoreGroup',
            groupIndex: 2
          }]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'StoreGroup',
              groupName: 'StoreGroup',
              userProperty: 'value'
            }, {
              dataField: 'Field2',
              groupName: 'StoreGroup',
              groupIndex: 0
            }, {
              dataField: 'Field3',
              groupName: 'StoreGroup',
              groupIndex: 1
            }, {
              dataField: 'Field1',
              groupName: 'StoreGroup',
              groupIndex: 2,
              visible: false
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 4);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: 'StoreGroup',
            groupName: 'StoreGroup',
            userProperty: 'value',
            caption: '',
            levels: [{
              dataField: 'Field2',
              groupName: 'StoreGroup',
              caption: '',
              groupIndex: 0
            }, {
              dataField: 'Field3',
              groupName: 'StoreGroup',
              caption: '',
              groupIndex: 1
            }]
          }, {
            dataField: 'Field2',
            groupName: 'StoreGroup',
            caption: '',
            groupIndex: 0
          }, {
            dataField: 'Field3',
            groupName: 'StoreGroup',
            caption: '',
            groupIndex: 1
          }, {
            dataField: 'Field1',
            groupName: 'StoreGroup',
            caption: '',
            groupIndex: 2,
            visible: false
          }]);
        });
        QUnit.test('Retrieve fields. Add field without group when group exists', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'OrderDate',
            groupName: 'OrderDate'
          }, {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            groupInterval: 'year',
            groupIndex: 0
          }]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'OrderDate',
              dataType: 'date'
            }, {
              dataField: 'OrderDate',
              groupInterval: 'year'
            }, {
              dataField: 'OrderDate',
              groupInterval: 'month'
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 4);
          var fields = prepareFields(dataSource.fields());
          assert.deepEqual(fields[0], {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            dataType: 'date',
            caption: '',
            levels: [{
              dataField: 'OrderDate',
              groupName: 'OrderDate',
              groupInterval: 'year',
              groupIndex: 0,
              caption: '',
              dataType: 'date'
            }]
          });
          assert.deepEqual(fields[1], {
            dataField: 'OrderDate',
            groupInterval: 'year',
            caption: '',
            dataType: 'date'
          });
          assert.deepEqual(fields[2], {
            dataField: 'OrderDate',
            groupInterval: 'month',
            caption: '',
            dataType: 'date'
          });
          assert.deepEqual(fields[3], {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            groupInterval: 'year',
            groupIndex: 0,
            caption: '',
            dataType: 'date'
          });
        });
        QUnit.test('Retrieve fields. Hide store default group', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'OrderDate',
            groupName: 'OrderDate'
          }, {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            groupInterval: 'year',
            groupIndex: 0
          }, {
            dataField: 'ShipDate',
            groupName: 'ShipDate'
          }, {
            dataField: 'ShipDate',
            groupName: 'ShipDate',
            groupInterval: 'month',
            groupIndex: 0
          }]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'OrderDate',
              visible: false
            }, {
              dataField: 'OrderDate',
              groupInterval: 'month'
            }, {
              groupName: 'ShipDate',
              visible: false
            }],
            store: this.testStore,
            retrieveFields: true
          });
          assert.strictEqual(dataSource.fields().length, 5);
          var fields = prepareFields(dataSource.fields());
          assert.deepEqual(fields[0], {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            caption: '',
            visible: false,
            levels: [{
              dataField: 'OrderDate',
              groupName: 'OrderDate',
              groupInterval: 'year',
              groupIndex: 0,
              caption: '',
              visible: false
            }]
          });
          assert.deepEqual(fields[1], {
            dataField: 'OrderDate',
            groupInterval: 'month',
            caption: ''
          });
          assert.deepEqual(fields[2], {
            dataField: 'ShipDate',
            groupName: 'ShipDate',
            caption: '',
            visible: false,
            levels: [{
              dataField: 'ShipDate',
              groupName: 'ShipDate',
              groupInterval: 'month',
              groupIndex: 0,
              visible: false,
              caption: ''
            }]
          });
          assert.deepEqual(fields[3], {
            dataField: 'OrderDate',
            groupName: 'OrderDate',
            groupInterval: 'year',
            groupIndex: 0,
            caption: '',
            visible: false
          });
          assert.deepEqual(fields[4], {
            dataField: 'ShipDate',
            groupName: 'ShipDate',
            groupInterval: 'month',
            groupIndex: 0,
            visible: false,
            caption: ''
          });
        });
        QUnit.test('Retrieve fields is false - merge fields but no add fields from store', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: '[Product].[Category]',
            allMember: '[All Products]'
          }, {dataField: '[Product].[Subcategory]'}, {
            dataField: '[Ship Date].[Calendar Year]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Measures].[Customer Count]',
            caption: 'Count'
          }, {
            dataField: 'date',
            caption: 'date'
          }, {
            dataField: 'date',
            groupInterval: 'year',
            caption: 'date.year'
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }]));
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'date',
              area: 'row'
            }, {
              dataField: 'date',
              area: 'column',
              groupInterval: 'year'
            }],
            store: this.testStore,
            retrieveFields: false
          });
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 0,
            allMember: '[All Products]',
            caption: ''
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            area: 'row',
            areaIndex: 0,
            allMember: '[All Periods]',
            caption: ''
          }, {
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 0,
            caption: 'Count'
          }, {
            dataField: 'date',
            area: 'row',
            areaIndex: 1,
            caption: 'date'
          }, {
            dataField: 'date',
            area: 'column',
            groupInterval: 'year',
            caption: 'date.year',
            areaIndex: 1
          }], 'dataSource Fields');
        });
        QUnit.test('T447446. Date field without group interval. Retrieve fields is disabled', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'OrderDate',
            dataType: 'date',
            groupName: 'OrderDate'
          }, {
            dataField: 'OrderDate',
            dataType: 'date',
            groupName: 'OrderDate',
            groupInterval: 'year',
            groupIndex: 0
          }]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'OrderDate',
              dataType: 'date'
            }],
            store: this.testStore,
            retrieveFields: false
          });
          var fields = prepareFields(dataSource.fields());
          assert.strictEqual(fields.length, 1, 'fields count');
          assert.deepEqual(fields[0], {
            caption: '',
            dataField: 'OrderDate',
            dataType: 'date'
          }, 'field');
        });
        QUnit.test('retrieve Fields. Fail on load store fields', function(assert) {
          var def = $.Deferred();
          var retrieveFieldsDef = $.Deferred();
          this.testStore.load.returns(def);
          this.testStore.getFields.returns(retrieveFieldsDef);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'date',
              area: 'row'
            }, {
              dataField: 'date',
              area: 'column',
              groupInterval: 'year'
            }],
            store: this.testStore,
            retrieveFields: true
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: []
          };
          def.resolve(loadResult);
          retrieveFieldsDef.reject();
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.equal(this.testStore.load.callCount, 0, 'load count');
        });
        QUnit.test('Retrieve Fields. Create data field with summaryType', function(assert) {
          var retrieveFieldsDef = $.Deferred().resolve([{
            dataField: 'Date',
            dataType: 'date',
            groupInterval: undefined,
            groupName: 'Date'
          }, {
            dataField: 'Date',
            dataType: 'date',
            groupInterval: 'year',
            groupName: 'Date',
            groupIndex: 0
          }, {
            dataField: 'Date',
            dataType: 'date',
            groupInterval: 'month',
            groupName: 'Date',
            groupIndex: 1
          }]);
          this.testStore.getFields.returns(retrieveFieldsDef);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Date',
              area: 'data',
              summaryType: 'min'
            }, {
              dataField: 'Date',
              area: 'column'
            }],
            store: this.testStore
          });
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].columns), [{
            area: 'column',
            areaIndex: 0,
            caption: '',
            dataField: 'Date',
            dataType: 'date',
            groupInterval: 'year',
            groupName: 'Date',
            groupIndex: 0
          }, {
            area: 'column',
            dataField: 'Date',
            dataType: 'date',
            areaIndex: 0,
            caption: '',
            groupInterval: 'month',
            groupName: 'Date',
            groupIndex: 1
          }], 'column fields');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].rows), [], 'row fields');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].values), [{
            'area': 'data',
            'areaIndex': 0,
            'caption': ' (Min)',
            'dataField': 'Date',
            'dataType': 'date',
            'groupName': 'Date',
            'levels': [{
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 0,
              'groupInterval': 'year',
              'groupName': 'Date'
            }, {
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 1,
              'groupInterval': 'month',
              'groupName': 'Date'
            }],
            'summaryType': 'min'
          }], 'value fields');
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            'area': 'data',
            'areaIndex': 0,
            'caption': ' (Min)',
            'dataField': 'Date',
            'dataType': 'date',
            'groupName': 'Date',
            'levels': [{
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 0,
              'groupInterval': 'year',
              'groupName': 'Date'
            }, {
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 1,
              'groupInterval': 'month',
              'groupName': 'Date'
            }],
            'summaryType': 'min'
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': '',
            'dataField': 'Date',
            'dataType': 'date',
            'groupName': 'Date',
            'levels': [{
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 0,
              'groupInterval': 'year',
              'groupName': 'Date'
            }, {
              'area': 'column',
              'areaIndex': 0,
              'caption': '',
              'dataField': 'Date',
              'dataType': 'date',
              'groupIndex': 1,
              'groupInterval': 'month',
              'groupName': 'Date'
            }]
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': '',
            'dataField': 'Date',
            'dataType': 'date',
            'groupIndex': 0,
            'groupInterval': 'year',
            'groupName': 'Date'
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': '',
            'dataField': 'Date',
            'dataType': 'date',
            'groupIndex': 1,
            'groupInterval': 'month',
            'groupName': 'Date'
          }]);
        });
        QUnit.test('Fields order', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ColumnField2',
              area: 'column',
              areaIndex: 2
            }, {
              dataField: 'RowField1',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'ColumnField0',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'RowField0',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'CellField1',
              area: 'data',
              areaIndex: -1
            }, {
              dataField: 'ColumnField01',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'UnknownArea',
              area: 'page',
              areaIndex: 0
            }, {
              dataField: 'CellUndefinedIndex',
              area: 'data'
            }, {
              dataField: 'FilterField2',
              area: 'filter',
              areaIndex: 4
            }, {
              dataField: 'FilterField1',
              area: 'filter',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 'column1'}],
            rows: [{value: 'rowValue'}],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load count');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              dataField: 'CellField1',
              area: 'data',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: 'CellUndefinedIndex',
              area: 'data',
              areaIndex: 1,
              caption: ''
            }],
            columns: [{
              dataField: 'ColumnField0',
              area: 'column',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: 'ColumnField01',
              area: 'column',
              areaIndex: 1,
              caption: ''
            }, {
              dataField: 'ColumnField2',
              area: 'column',
              areaIndex: 2,
              caption: ''
            }],
            rows: [{
              dataField: 'RowField0',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: 'RowField1',
              area: 'row',
              areaIndex: 1,
              caption: ''
            }],
            filters: [{
              dataField: 'FilterField1',
              area: 'filter',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: 'FilterField2',
              area: 'filter',
              areaIndex: 1,
              caption: ''
            }]
          }], 'load args');
        });
        QUnit.test('Expand columns && rows', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              expanded: true,
              area: 'column',
              areaIndex: 1
            }, {
              dataField: 'Color',
              area: 'column',
              areaIndex: 2
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)),
            store: this.testStore
          });
          def.resolve({
            columns: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2,
                children: [{
                  value: 'Red',
                  index: 3
                }]
              }, {
                value: 'subCat2',
                index: 4,
                children: [{
                  value: 'Black',
                  index: 5
                }]
              }]
            }, {
              value: 'Cat2',
              index: 6
            }],
            rows: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 2
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          this.testStore.load.returns($.Deferred().resolve({
            columns: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            rows: [{
              value: 'January',
              index: 1
            }, {
              value: 'February',
              index: 2
            }],
            values: [[[16], [17], [18], [19], [20]], [[21], [22], [23], [24], [25]], [[26], [27], [28], [29], [30]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          dataSource.expandHeaderItem('row', ['2006']);
          assert.equal(this.testStore.load.callCount, 2);
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            expanded: true,
            area: 'row',
            headerName: 'rows',
            needExpandData: true,
            columnExpandedPaths: [['Cat1']],
            rowExpandedPaths: [],
            path: ['2006'],
            values: descriptions.values,
            columns: descriptions.columns,
            rows: descriptions.rows,
            filters: []
          }]);
        });
        QUnit.test('Expand rows && columns', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)),
            store: this.testStore
          });
          def.resolve({
            rows: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            columns: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 2
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          this.testStore.load.returns($.Deferred().resolve({
            rows: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            columns: [{
              value: 'January',
              index: 1
            }, {
              value: 'February',
              index: 2
            }],
            values: [[[16], [17], [18], [19], [20]], [[21], [22], [23], [24], [25]], [[26], [27], [28], [29], [30]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          dataSource.expandHeaderItem('column', ['2006']);
          assert.equal(this.testStore.load.callCount, 2);
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            expanded: true,
            area: 'column',
            headerName: 'columns',
            needExpandData: true,
            rowExpandedPaths: [['Cat1']],
            columnExpandedPaths: [],
            path: ['2006'],
            values: descriptions.values,
            columns: descriptions.columns,
            rows: descriptions.rows,
            filters: []
          }]);
        });
        QUnit.test('Deep expand rows && columns', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'Day',
              area: 'row',
              areaIndex: 1
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)),
            store: this.testStore
          });
          var data = {
            columns: [{
              value: 'Cat1',
              index: 1
            }, {
              value: 'Cat2',
              index: 2
            }],
            rows: [{
              value: '2005',
              index: 1,
              children: [{
                value: 'January',
                index: 2,
                children: [{
                  value: '1',
                  index: 3
                }, {
                  value: '2',
                  index: 4
                }]
              }]
            }, {
              value: '2006',
              index: 5
            }, {
              value: '2007',
              index: 5,
              children: [{
                value: 'January',
                index: 6
              }]
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve($.extend(true, {}, data));
          this.testStore.load.returns($.Deferred().resolve({
            value: 'new Item',
            index: 14
          }));
          dataSource.expandHeaderItem('column', ['Cat1']);
          assert.equal(this.testStore.load.callCount, 2);
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            expanded: true,
            area: 'column',
            headerName: 'columns',
            needExpandData: true,
            rowExpandedPaths: [['2005'], ['2005', 'January'], ['2007']],
            columnExpandedPaths: [],
            path: ['Cat1'],
            values: descriptions.values,
            columns: descriptions.columns,
            rows: descriptions.rows,
            filters: []
          }]);
        });
        QUnit.test('Change field by index', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              allMember: '[All Products]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              allMember: '[All Periods]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          dataSource.field(0, {
            area: 'row',
            areaIndex: 1
          });
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.ok(this.testStore.load.calledTwice, 'load count');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              caption: 'Count',
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            columns: [],
            rows: [{
              allMember: '[All Periods]',
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              allMember: '[All Products]',
              dataField: '[Product].[Category]',
              areaIndex: 1,
              area: 'row',
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Change field by dataField', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          dataSource.field('[Product].[Category]', {
            area: 'row',
            areaIndex: 1
          });
          assert.deepEqual(prepareFields(dataSource.fields())[0], {
            caption: '',
            dataField: '[Product].[Category]',
            area: 'row',
            areaIndex: 1
          });
        });
        QUnit.test('fieldChanged event', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var fieldChangedStub = sinon.stub();
          dataSource.on('fieldChanged', fieldChangedStub);
          dataSource.field('[Product].[Category]', {
            area: 'row',
            areaIndex: 1
          });
          assert.strictEqual(fieldChangedStub.callCount, 1, 'fieldChanged is called once');
          assert.strictEqual(fieldChangedStub.lastCall.args[0], dataSource.field('[Product].[Category]'), 'fieldChanged args');
        });
        QUnit.test('Change field by caption', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Internet Sales Amount]',
              caption: 'Count',
              area: 'data',
              areaIndex: 1
            }],
            store: this.testStore
          });
          dataSource.field('Count', {
            area: 'data',
            areaIndex: 2
          });
          assert.deepEqual(prepareFields(dataSource.fields())[2], {
            caption: 'Count',
            dataField: '[Measures].[Customer Count]',
            area: 'data',
            areaIndex: 1
          });
        });
        QUnit.test('Change field non exist field', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              allMember: '[All Products]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              allMember: '[All Periods]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{value: 'column1'}],
            rows: [{value: 'rowValue'}],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          dataSource.field(10, {
            area: 'row',
            areaIndex: 1
          });
          dataSource.load();
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledTwice, 'load twice');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              caption: 'Count',
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            columns: [{
              allMember: '[All Products]',
              dataField: '[Product].[Category]',
              areaIndex: 0,
              area: 'column',
              caption: ''
            }],
            rows: [{
              allMember: '[All Periods]',
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Change field after expand', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            rows: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            columns: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 2
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          this.testStore.load.returns($.Deferred().resolve({
            rows: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            columns: [{
              value: 'January',
              index: 1
            }, {
              value: 'February',
              index: 2
            }],
            values: [[[16], [17], [18], [19], [20]], [[21], [22], [23], [24], [25]], [[26], [27], [28], [29], [30]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          dataSource.expandHeaderItem('column', ['2006']);
          dataSource.field(0, {
            area: 'row',
            areaIndex: 1
          });
          dataSource.load();
          assert.equal(this.testStore.load.callCount, 3);
          prepareFields(dataSource.fields());
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            values: [{
              area: 'data',
              areaIndex: 0,
              caption: 'Count',
              dataField: '[Measures].[Customer Count]'
            }],
            columns: [{
              area: 'column',
              areaIndex: 0,
              dataField: 'Category',
              caption: ''
            }, {
              area: 'column',
              areaIndex: 1,
              dataField: 'SubCategory',
              caption: ''
            }],
            columnExpandedPaths: [['2006']],
            rowExpandedPaths: [['Cat1']],
            rows: [{
              area: 'row',
              areaIndex: 0,
              dataField: 'Year',
              caption: ''
            }, {
              area: 'row',
              areaIndex: 1,
              dataField: 'Month',
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Reset calculated field\'s properties on changed', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              selector: 'selector',
              format: 'date',
              customizeText: 'customizeText',
              notCalculatedProperty: 'value'
            }],
            store: this.testStore
          });
          var field = dataSource.field(0);
          setFieldProperty(field, 'format', 'percent');
          setFieldProperty(field, 'customizeText', function() {});
          setFieldProperty(field, 'selector', function() {});
          setFieldProperty(field, 'notCalculatedProperty', 'new Value');
          setFieldProperty(field, 'allowSorting', true);
          setFieldProperty(field, 'allowFiltering', true);
          setFieldProperty(field, 'allowExpandAll', true);
          setFieldProperty(field, 'allowSortingBySummary', true);
          dataSource.field(0, {prop: 'myProp'});
          prepareFields(dataSource.fields());
          assert.deepEqual(field, {
            allowExpandAll: true,
            allowFiltering: true,
            allowSorting: true,
            allowSortingBySummary: true,
            caption: '',
            customizeText: 'customizeText',
            dataField: 'Field1',
            format: 'date',
            notCalculatedProperty: 'new Value',
            prop: 'myProp',
            selector: 'selector'
          });
        });
        QUnit.test('Reset calculated field\'s properties on fields changed', function(assert) {
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              selector: 'selector',
              format: 'date',
              customizeText: 'customizeText',
              notCalculatedProperty: 'value'
            }],
            store: this.testStore
          });
          var field = dataSource.field(0);
          setFieldProperty(field, 'format', 'percent');
          setFieldProperty(field, 'customizeText', function() {});
          setFieldProperty(field, 'selector', function() {});
          setFieldProperty(field, 'notCalculatedProperty', 'new Value');
          setFieldProperty(field, 'allowSorting', true);
          setFieldProperty(field, 'allowFiltering', true);
          setFieldProperty(field, 'allowExpandAll', true);
          setFieldProperty(field, 'allowSortingBySummary', true);
          dataSource.fields(dataSource.fields());
          prepareFields(dataSource.fields());
          assert.deepEqual(field, {
            allowExpandAll: undefined,
            allowFiltering: undefined,
            allowSorting: undefined,
            allowSortingBySummary: undefined,
            caption: '',
            customizeText: 'customizeText',
            dataField: 'Field1',
            format: 'date',
            notCalculatedProperty: 'new Value',
            selector: 'selector'
          });
        });
        QUnit.test('Remove fields when expanded items exist', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            columns: [{
              value: 'Cat1',
              index: 1,
              children: [{value: 'subCat1'}, {value: 'subCat2'}]
            }, {value: 'Cat2'}],
            rows: [{
              index: 0,
              value: '2003',
              children: [{value: 'January'}, {value: 'February'}]
            }],
            values: [[[16], [17], [18], [19], [20]], [[21], [22], [23], [24], [25]], [[26], [27], [28], [29], [30]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          this.testStore.load.returns($.Deferred().reject());
          var changedFields = [dataSource.field(0, {
            area: undefined,
            areaIndex: 1
          }), dataSource.field(1, {
            area: undefined,
            areaIndex: 1
          })];
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [['2003']], 'Expanded rows paths');
          assert.deepEqual(this.testStore.load.lastCall.args[0].columnExpandedPaths, [], 'Expanded columns paths');
          assert.deepEqual(changedFields, [{
            area: undefined,
            areaIndex: 1,
            dataField: 'Category',
            caption: ''
          }, {
            area: undefined,
            areaIndex: 1,
            dataField: 'SubCategory',
            caption: ''
          }], 'changed Fields');
        });
        QUnit.test('Remove field when expanded items exist', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            columns: [{
              value: 'Cat1',
              index: 1,
              children: [{
                value: 'subCat1',
                index: 2,
                children: [{
                  index: 8,
                  value: 'Green'
                }]
              }, {
                value: 'subCat2',
                index: 3
              }]
            }, {
              value: 'Cat2',
              index: 4
            }],
            rows: [{
              index: 0,
              value: '2003',
              children: [{
                value: 'January',
                index: 1
              }, {
                value: 'February',
                index: 2
              }]
            }],
            values: [[[16], [17], [18], [19], [20]], [[21], [22], [23], [24], [25]], [[26], [27], [28], [29], [30]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: 'Color',
              area: 'column',
              areaIndex: 2
            }, {
              dataField: 'Year',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          this.testStore.load.returns($.Deferred().reject());
          var changedFields = [dataSource.field(1, {
            area: undefined,
            areaIndex: 1
          })];
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [['2003']], 'Expanded rows paths');
          assert.deepEqual(this.testStore.load.lastCall.args[0].columnExpandedPaths, [['Cat1']], 'Expanded columns paths');
          assert.deepEqual(changedFields, [{
            area: undefined,
            areaIndex: 1,
            dataField: 'SubCategory',
            caption: ''
          }], 'changed Fields');
        });
        QUnit.test('Reorder field when expanded items exist', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            columns: [],
            rows: [{
              index: 1,
              value: 1,
              children: [{
                value: 2,
                index: 2,
                children: [{
                  value: 3,
                  index: 3
                }]
              }]
            }],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          }));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: 'Field2',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'Field3',
              area: 'row',
              areaIndex: 2
            }],
            store: this.testStore
          });
          this.testStore.load.returns($.Deferred().reject());
          dataSource.field(2, {
            area: 'row',
            areaIndex: 1
          });
          dataSource.load();
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [[1]], 'Expanded rows paths');
        });
        QUnit.test('Change field when fields not loaded', function(assert) {
          var def = $.Deferred();
          var retrieveFieldsDef = $.Deferred();
          this.testStore.load.returns(def);
          this.testStore.getFields.returns(retrieveFieldsDef);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }, {
              dataField: 'date',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'date',
              area: 'column',
              groupInterval: 'year',
              areaIndex: 2
            }],
            store: this.testStore,
            retrieveFields: true
          });
          var loadResult = {
            columns: [{value: 'column1'}],
            rows: [{value: 'rowValue'}],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          dataSource.field(0, {area: 'row'});
          dataSource.load();
          retrieveFieldsDef.resolve([{
            dataField: '[Product].[Category]',
            allMember: '[All Products]'
          }, {
            dataField: '[Ship Date].[Calendar Year]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Ship Date].[Calendar Month]',
            allMember: '[All Periods]'
          }, {
            dataField: '[Measures].[Customer Count]',
            caption: 'Count'
          }, {
            dataField: 'date',
            caption: 'date'
          }, {
            dataField: 'date',
            groupInterval: 'year',
            caption: 'date.year'
          }, {
            dataField: 'date',
            groupInterval: 'month',
            caption: 'date.month'
          }]);
          prepareFields(dataSource.fields());
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.strictEqual(this.testStore.load.callCount, 2, 'load callCount');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              caption: 'Count',
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            columns: [{
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: 'date',
              area: 'column',
              groupInterval: 'year',
              caption: 'date.year',
              areaIndex: 1
            }],
            rows: [{
              allMember: '[All Products]',
              dataField: '[Product].[Category]',
              areaIndex: 0,
              area: 'row',
              caption: ''
            }, {
              allMember: '[All Periods]',
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 1,
              caption: ''
            }, {
              dataField: 'date',
              area: 'row',
              caption: 'date',
              areaIndex: 2
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Change areaIndex to begin', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          dataSource.field(1, {areaIndex: 0});
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.ok(this.testStore.load.calledTwice, 'load twice');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [{
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0,
              caption: ''
            }],
            columns: [{
              dataField: '[Product].[Subcategory]',
              areaIndex: 0,
              area: 'column',
              caption: ''
            }, {
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 1,
              caption: ''
            }],
            rows: [{
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Change areaIndex to begin when group', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              area: 'column',
              areaIndex: 0,
              groupName: 'Group1'
            }, {
              groupName: 'Group1',
              groupIndex: 1,
              dataField: 'Field1'
            }, {
              groupName: 'Group1',
              groupIndex: 2,
              dataField: 'Field2'
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }],
            store: this.testStore
          });
          dataSource.field('[Product].[Subcategory]', {areaIndex: 0});
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.ok(this.testStore.load.calledTwice, 'load twice');
          assert.deepEqual(prepareFields(this.testStore.load.lastCall.args[0].columns), [{
            area: 'column',
            areaIndex: 0,
            caption: '',
            dataField: '[Product].[Subcategory]'
          }, {
            area: 'column',
            areaIndex: 1,
            caption: '',
            dataField: 'Field1',
            groupIndex: 1,
            groupName: 'Group1'
          }, {
            area: 'column',
            areaIndex: 1,
            caption: '',
            dataField: 'Field2',
            groupIndex: 2,
            groupName: 'Group1'
          }], 'load args');
          var columnFields = dataSource.getAreaFields('column', true);
          assert.strictEqual(columnFields.length, 2);
          assert.strictEqual(columnFields[0].dataField, '[Product].[Subcategory]');
          assert.strictEqual(columnFields[1].dataField, undefined);
          assert.strictEqual(columnFields[1].groupName, 'Group1');
        });
        QUnit.test('Change areaIndex to end', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Product].[Subcategory]',
              area: 'column',
              areaIndex: 1
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Measures].[Customer Count]',
              area: 'data',
              areaIndex: 0
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          dataSource.field(0, {areaIndex: 2});
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledTwice, 'load twice');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args)[0].columns, [{
            dataField: '[Product].[Subcategory]',
            areaIndex: 0,
            area: 'column',
            caption: ''
          }, {
            dataField: '[Product].[Category]',
            area: 'column',
            areaIndex: 1,
            caption: ''
          }], 'load args');
        });
        QUnit.test('Load with group field', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              area: 'column',
              groupIndex: 1
            }, {
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              area: 'filter',
              groupIndex: 0
            }, {
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'row',
              areaIndex: 1
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              areaIndex: 1,
              area: 'row',
              caption: ''
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              areaIndex: 1,
              area: 'row',
              caption: ''
            }, {
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Sort group fields', function(assert) {
          this.testStore.load.returns($.Deferred());
          var fields = [{
            caption: 'Date Problem',
            displayFolder: 'Project',
            dataField: 'projectCust_datumproblem',
            groupName: 'projectCust_datumproblem',
            dataType: 'date',
            area: 'column'
          }, {
            groupName: 'projectCust_datumproblem',
            groupInterval: 'year',
            groupIndex: 0,
            caption: 'datumProblem Jahr',
            area: 'column'
          }, {
            groupName: 'projectCust_datumproblem',
            groupInterval: 'quarter',
            groupIndex: 1,
            caption: 'datumProblem Quartal',
            area: 'column'
          }, {
            groupName: 'projectCust_datumproblem',
            groupInterval: 'month',
            groupIndex: 2,
            caption: 'datumProblem Monat',
            area: 'column'
          }, {
            caption: 'Allocation Date',
            displayFolder: 'Project',
            dataField: 'allocationDate',
            groupName: 'allocationDate',
            dataType: 'date',
            area: 'column'
          }, {
            groupName: 'allocationDate',
            groupInterval: 'year',
            groupIndex: 0,
            caption: 'Allocation Jahr',
            area: 'column'
          }, {
            groupName: 'allocationDate',
            groupInterval: 'quarter',
            groupIndex: 1,
            caption: 'Allocation Quartal',
            area: 'column'
          }, {
            groupName: 'allocationDate',
            groupInterval: 'month',
            groupIndex: 2,
            caption: 'Allocation Monat',
            area: 'column'
          }, {
            caption: 'Project Finish',
            displayFolder: 'Project',
            dataField: 'projectFinishDate',
            groupName: 'projectFinishDate',
            dataType: 'date',
            area: 'column'
          }, {
            groupName: 'projectFinishDate',
            groupInterval: 'year',
            groupIndex: 0,
            caption: 'Project Finish Jahr',
            area: 'column'
          }, {
            groupName: 'projectFinishDate',
            groupInterval: 'quarter',
            groupIndex: 1,
            caption: 'Project Finish Quartal',
            area: 'column'
          }, {
            groupName: 'projectFinishDate',
            groupInterval: 'month',
            groupIndex: 2,
            caption: 'Project Finish Monat',
            area: 'column'
          }, {
            caption: 'Project Start',
            displayFolder: 'Project',
            dataField: 'projectStartDate',
            groupName: 'projectStartDate',
            dataType: 'date',
            area: 'column'
          }, {
            groupName: 'projectStartDate',
            groupInterval: 'year',
            groupIndex: 0,
            caption: 'Project Start Jahr',
            area: 'column'
          }, {
            groupName: 'projectStartDate',
            groupInterval: 'quarter',
            groupIndex: 1,
            caption: 'Project Start Quartal',
            area: 'column'
          }, {
            groupName: 'projectStartDate',
            groupInterval: 'month',
            groupIndex: 2,
            caption: 'Project Start Monat',
            area: 'column'
          }];
          createDataSource({
            fields: fields,
            store: this.testStore
          });
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(this.testStore.load.lastCall.args[0].columns, [fields[1], fields[2], fields[3], fields[5], fields[6], fields[7], fields[9], fields[10], fields[11], fields[13], fields[14], fields[15]], 'columns order');
        });
        QUnit.test('Load with group field. Pass sorting params', function(assert) {
          createDataSource({
            fields: [{
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              area: 'column',
              groupIndex: 1,
              sortOrder: 'asc',
              sortBySummaryField: '[Measures]',
              sortBy: 'caption',
              sortBySummaryPath: ['Bikes']
            }, {
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              area: 'filter',
              groupIndex: 0
            }, {
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'row',
              areaIndex: 1,
              sortOrder: 'desc',
              sortBySummaryField: '[Measures].[Customer Count]',
              sortBy: 'value',
              sortBySummaryPath: ['Bikes', 'Road Bikes']
            }],
            store: this.testStore
          });
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              areaIndex: 1,
              area: 'row',
              sortOrder: 'desc',
              sortBySummaryField: '[Measures].[Customer Count]',
              sortBy: 'value',
              sortBySummaryPath: ['Bikes', 'Road Bikes'],
              caption: ''
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              areaIndex: 1,
              area: 'row',
              sortOrder: 'asc',
              sortBySummaryField: '[Measures]',
              sortBy: 'caption',
              sortBySummaryPath: ['Bikes'],
              caption: ''
            }, {
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Load with group field. Pass expanded and showTotals params', function(assert) {
          createDataSource({
            fields: [{
              dataField: '[Product]',
              groupName: '[Product]',
              expanded: true,
              area: 'row',
              showTotals: false,
              showGrandTotals: true
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              showTotals: true,
              showGrandTotals: true
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              expanded: false
            }, {
              dataField: '[Product].[Color]',
              groupName: '[Product]',
              groupIndex: 2,
              expanded: true,
              showTotals: false,
              showGrandTotals: false
            }],
            store: this.testStore
          });
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              expanded: true,
              area: 'row',
              areaIndex: 0,
              caption: '',
              showGrandTotals: true,
              showTotals: true
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              expanded: false,
              area: 'row',
              areaIndex: 0,
              caption: '',
              showGrandTotals: true,
              showTotals: false
            }, {
              dataField: '[Product].[Color]',
              groupName: '[Product]',
              groupIndex: 2,
              expanded: true,
              area: 'row',
              areaIndex: 0,
              caption: '',
              showGrandTotals: false,
              showTotals: false
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Load with group field. change group field', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              area: 'column',
              groupIndex: 1,
              sortOrder: 'asc',
              sortBySummaryField: '[Measures]',
              sortBy: 'caption',
              sortBySummaryPath: ['Bikes']
            }, {
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              area: 'filter',
              groupIndex: 0
            }, {
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'row',
              areaIndex: 1,
              sortOrder: 'desc',
              sortBySummaryField: '[Measures].[Customer Count]',
              sortBy: 'value',
              sortBySummaryPath: ['Bikes', 'Road Bikes']
            }],
            store: this.testStore
          });
          dataSource.field('[Product]', {
            sortOrder: 'desc',
            sortBySummaryPath: ['NewPath']
          });
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              areaIndex: 1,
              area: 'row',
              sortOrder: 'desc',
              sortBySummaryField: '[Measures].[Customer Count]',
              sortBy: 'value',
              sortBySummaryPath: ['Bikes', 'Road Bikes'],
              caption: ''
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              areaIndex: 1,
              area: 'row',
              sortOrder: 'desc',
              sortBySummaryField: '[Measures]',
              sortBy: 'caption',
              sortBySummaryPath: ['Bikes'],
              caption: ''
            }, {
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Load several groups on single axis', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product]',
              area: 'row',
              groupName: '[Product]'
            }, {
              dataField: '[Calendar]',
              area: 'row',
              groupName: '[Calendar]',
              dataType: 'date'
            }, {
              dataField: '[Category]',
              groupName: '[Product]',
              groupIndex: 0
            }, {
              dataField: '[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1
            }, {
              dataField: '[Year]',
              groupName: '[Calendar]',
              groupIndex: 0
            }, {
              dataField: '[Month]',
              groupName: '[Calendar]',
              groupIndex: 1
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Year]',
              groupName: '[Calendar]',
              groupIndex: 0,
              area: 'row',
              areaIndex: 1,
              caption: '',
              dataType: 'date'
            }, {
              dataField: '[Month]',
              groupName: '[Calendar]',
              groupIndex: 1,
              area: 'row',
              areaIndex: 1,
              caption: '',
              dataType: 'date'
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Change group item', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Product]',
              area: 'row',
              groupName: '[Product]',
              areaIndex: 0
            }, {
              dataField: '[Calendar]',
              area: 'column',
              groupName: '[Calendar]',
              areaIndex: 0
            }, {
              dataField: '[Category]',
              groupName: '[Product]',
              groupIndex: 0
            }, {
              dataField: '[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1
            }, {
              dataField: '[Year]',
              groupName: '[Calendar]',
              groupIndex: 0
            }, {
              dataField: '[Month]',
              groupName: '[Calendar]',
              groupIndex: 1
            }],
            store: this.testStore
          });
          dataSource.field('[Month]', {sortBy: 'value'});
          dataSource.load();
          prepareFields(dataSource.fields());
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [{
              dataField: '[Year]',
              groupName: '[Calendar]',
              groupIndex: 0,
              area: 'column',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Month]',
              groupName: '[Calendar]',
              groupIndex: 1,
              area: 'column',
              areaIndex: 0,
              caption: '',
              sortBy: 'value'
            }],
            rows: [{
              dataField: '[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              area: 'row',
              areaIndex: 0,
              caption: ''
            }],
            filters: []
          }], 'load args');
        });
        QUnit.test('Load with group fields with filterValues', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              area: 'column',
              groupIndex: 1,
              filterValues: ['Cat1 SubCat2', 'Cat1 SubCat3']
            }, {
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              area: 'filter',
              groupIndex: 0,
              filterValues: ['Cat2']
            }, {
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'row',
              areaIndex: 1,
              filterValues: ['Cat1 SubCat1']
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load once');
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args), [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              groupIndex: 0,
              areaIndex: 1,
              area: 'row',
              filterValues: ['Cat2'],
              caption: ''
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              groupIndex: 1,
              areaIndex: 1,
              area: 'row',
              filterValues: ['Cat1 SubCat2', 'Cat1 SubCat3'],
              caption: ''
            }, {
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2,
              caption: ''
            }],
            filters: [{
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'row',
              areaIndex: 1,
              filterValues: ['Cat1 SubCat1'],
              levels: [{
                dataField: '[Product].[Category]',
                groupName: '[Product]',
                groupIndex: 0,
                areaIndex: 1,
                area: 'row',
                filterValues: ['Cat2'],
                caption: ''
              }, {
                dataField: '[Product].[Subcategory]',
                groupName: '[Product]',
                groupIndex: 1,
                areaIndex: 1,
                area: 'row',
                filterValues: ['Cat1 SubCat2', 'Cat1 SubCat3'],
                caption: ''
              }],
              caption: ''
            }]
          }], 'load args');
          assert.strictEqual(dataSource.getAreaFields('filter', true).length, 0);
        });
        QUnit.test('Load with group fields with filterValues and filter area', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: '[Color]',
              area: 'row',
              areaIndex: 2
            }, {
              dataField: '[Product].[Subcategory]',
              groupName: '[Product]',
              area: 'column',
              groupIndex: 1,
              filterValues: ['Cat1 SubCat2', 'Cat1 SubCat3']
            }, {
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0
            }, {
              dataField: '[Product].[Category]',
              groupName: '[Product]',
              area: 'filter',
              groupIndex: 0,
              filterValues: ['Cat2']
            }, {
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'filter',
              areaIndex: 1,
              filterValues: ['Cat1 SubCat1']
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [],
            rows: [],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          assert.deepEqual(dataSource.getData(), loadResult);
          assert.ok(this.testStore.load.calledOnce, 'load once');
          prepareFields(dataSource.fields());
          assert.deepEqual(this.testStore.load.lastCall.args, [{
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            values: [],
            columns: [],
            rows: [{
              dataField: '[Date]',
              area: 'row',
              areaIndex: 0,
              caption: ''
            }, {
              dataField: '[Color]',
              area: 'row',
              areaIndex: 1,
              caption: ''
            }],
            filters: [{
              dataField: '[Product]',
              groupName: '[Product]',
              area: 'filter',
              areaIndex: 0,
              filterValues: ['Cat1 SubCat1'],
              levels: [{
                dataField: '[Product].[Category]',
                groupName: '[Product]',
                area: 'filter',
                groupIndex: 0,
                filterValues: ['Cat2'],
                areaIndex: 0,
                caption: ''
              }, {
                dataField: '[Product].[Subcategory]',
                groupName: '[Product]',
                area: 'filter',
                groupIndex: 1,
                filterValues: ['Cat1 SubCat2', 'Cat1 SubCat3'],
                areaIndex: 0,
                caption: ''
              }],
              caption: ''
            }]
          }], 'load args');
        });
        QUnit.test('Collapse level', function(assert) {
          assert.expect(10);
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.on('changed', assertFunction);
          dataSource.collapseAll(0);
          assert.equal(this.testStore.load.callCount, 1);
          function assertFunction() {
            var data = this.getData();
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.ok(!data.columns[0].children);
            assert.deepEqual(prepareLoadedData(data.columns[0].collapsedChildren), [{
              index: 7,
              value: 'Campinas'
            }, {
              index: 8,
              value: 'Sao Paulo'
            }]);
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.ok(!data.columns[1].children);
            assert.ok(!data.columns[1].collapsedChildren);
            assert.strictEqual(data.columns[2].value, 'USA');
            assert.ok(!data.columns[2].children);
            assert.deepEqual(prepareLoadedData(data.columns[2].collapsedChildren), [{
              index: 2,
              value: 'Boise'
            }, {
              index: 4,
              value: 'Butte'
            }, {
              index: 3,
              value: 'Elgin'
            }]);
          }
        });
        QUnit.test('Collapse group', function(assert) {
          assert.expect(9);
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var dataSource = createDataSource({
            fields: [{
              group: 'group',
              area: 'column',
              expanded: true
            }, {
              dataField: 'ShipCity',
              area: 'column',
              group: 'group',
              groupIndex: 0
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.on('changed', assertFunction);
          dataSource.collapseAll(0);
          function assertFunction() {
            var data = this.getData();
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.ok(!data.columns[0].children);
            assert.deepEqual(prepareLoadedData(data.columns[0].collapsedChildren), [{
              index: 7,
              value: 'Campinas'
            }, {
              index: 8,
              value: 'Sao Paulo'
            }]);
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.ok(!data.columns[1].children);
            assert.ok(!data.columns[1].collapsedChildren);
            assert.strictEqual(data.columns[2].value, 'USA');
            assert.ok(!data.columns[2].children);
            assert.deepEqual(prepareLoadedData(data.columns[2].collapsedChildren), [{
              index: 2,
              value: 'Boise'
            }, {
              index: 4,
              value: 'Butte'
            }, {
              index: 3,
              value: 'Elgin'
            }]);
          }
        });
        QUnit.test('Collapse level by field id', function(assert) {
          assert.expect(10);
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.on('changed', assertFunction);
          dataSource.collapseAll('ShipCountry');
          assert.equal(this.testStore.load.callCount, 1);
          function assertFunction() {
            var data = this.getData();
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.ok(!data.columns[0].children);
            assert.deepEqual(prepareLoadedData(data.columns[0].collapsedChildren), [{
              index: 7,
              value: 'Campinas'
            }, {
              index: 8,
              value: 'Sao Paulo'
            }]);
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.ok(!data.columns[1].children);
            assert.ok(!data.columns[1].collapsedChildren);
            assert.strictEqual(data.columns[2].value, 'USA');
            assert.ok(!data.columns[2].children);
            assert.deepEqual(prepareLoadedData(data.columns[2].collapsedChildren), [{
              index: 2,
              value: 'Boise'
            }, {
              index: 4,
              value: 'Butte'
            }, {
              index: 3,
              value: 'Elgin'
            }]);
          }
        });
        QUnit.test('Collapse level when group', function(assert) {
          assert.expect(9);
          this.storeData.columns[0].children[0].children = [{value: 'Val1'}, {value: 'Val2'}];
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            groupName: 'group',
            groupIndex: 1,
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field',
              groupName: 'group',
              area: 'column'
            }, {
              groupName: 'group',
              expanded: true,
              groupIndex: 0
            }, expandedField, {
              groupName: 'group',
              groupIndex: 2
            }, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.on('changed', assertFunction);
          dataSource.collapseAll(2);
          assert.equal(this.testStore.load.callCount, 1);
          function assertFunction() {
            var data = this.getData();
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.ok(data.columns[2].children[0]);
            assert.ok(!data.columns[2].children[0].children);
            assert.deepEqual(prepareLoadedData(data.columns[2].children[0].collapsedChildren), [{value: 'Val1'}, {value: 'Val2'}]);
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.ok(!data.columns[1].children);
            assert.ok(!data.columns[1].collapsedChildren);
            assert.strictEqual(data.columns[2].value, 'USA');
          }
        });
        QUnit.test('Collapse level when fieldIndex incorrect', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          var dataSourceChanged = sinon.stub();
          dataSource.on('changed', dataSourceChanged);
          dataSource.collapseAll(21);
          assert.equal(this.testStore.load.callCount, 1);
          assert.ok(!dataSourceChanged.called);
        });
        QUnit.test('Collapse level when there are not expanded items', function(assert) {
          this.storeData.columns[0].children = null;
          this.storeData.columns[2].children = null;
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          var dataSourceChanged = sinon.stub();
          dataSource.on('changed', dataSourceChanged);
          dataSource.collapseAll(0);
          assert.equal(this.testStore.load.callCount, 1);
          assert.ok(!dataSourceChanged.called);
        });
        QUnit.test('Expand level', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: false
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.expandAll(0);
          assert.equal(this.testStore.load.callCount, 2);
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args)[0].columns, [{
            area: 'column',
            areaIndex: 0,
            dataField: 'ShipCountry',
            expanded: true,
            caption: ''
          }, {
            area: 'column',
            areaIndex: 1,
            dataField: 'ShipCity',
            caption: ''
          }]);
        });
        QUnit.test('Expand group', function(assert) {
          this.testStore.load.returns($.Deferred());
          var dataSource = createDataSource({
            fields: [{
              groupName: 'group',
              area: 'column'
            }, {
              dataField: 'ShipCity',
              groupName: 'group',
              groupIndex: 0
            }, {
              dataField: 'ShipVia',
              groupName: 'group',
              groupIndex: 1
            }, {
              dataField: 'NotGroup',
              area: 'column',
              expanded: false
            }],
            store: this.testStore
          });
          dataSource.expandAll(0);
          var expandedValues = this.testStore.load.lastCall.args[0].columns.map(function(f) {
            return f.expanded;
          });
          assert.deepEqual(expandedValues, [true, true, false]);
        });
        QUnit.test('Expand level by fieldId', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: false
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          dataSource.expandAll('ShipCountry');
          assert.equal(this.testStore.load.callCount, 2);
          assert.deepEqual(prepareLoadArgs(this.testStore.load.lastCall.args)[0].columns, [{
            area: 'column',
            areaIndex: 0,
            dataField: 'ShipCountry',
            expanded: true,
            caption: ''
          }, {
            area: 'column',
            areaIndex: 1,
            dataField: 'ShipCity',
            caption: ''
          }]);
        });
        QUnit.test('expand level when fieldIndex incorrect', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var expandedField = {
            dataField: 'ShipCountry',
            area: 'column',
            expanded: true
          };
          var dataSource = createDataSource({
            fields: [expandedField, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          var dataSourceChanged = sinon.stub();
          dataSource.on('changed', dataSourceChanged);
          dataSource.collapseAll(21);
          assert.equal(this.testStore.load.callCount, 1);
          assert.ok(!dataSourceChanged.called);
        });
        QUnit.test('Fields Caption generation', function(assert) {
          inflector.titleize.restore();
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              caption: 'userCaption',
              summaryType: 'sum',
              groupName: 'Group1'
            }, {
              dataField: 'Field2',
              caption: ''
            }, {dataField: 'fieldName_caption'}, {}, {summaryType: 'avg'}, {
              dataField: 'Field3',
              summaryType: 'avg'
            }, {
              dataField: 'date',
              groupInterval: 'year'
            }, {
              dataField: 'number',
              groupInterval: 10
            }, {
              dataField: 'date',
              groupInterval: 'month',
              summaryType: 'count'
            }, {
              dataField: 'Field4',
              summaryType: 'custom'
            }, {dataField: 'Field5'}, {
              dataField: 'Field6',
              groupName: 'Group2'
            }, {groupName: 'Group3'}],
            store: this.testStore
          });
          var fields = dataSource.fields();
          assert.strictEqual(fields[0].caption, 'userCaption');
          assert.strictEqual(fields[1].caption, '');
          assert.strictEqual(fields[2].caption, 'Field Name Caption');
          assert.strictEqual(fields[3].caption, '');
          assert.strictEqual(fields[4].caption, 'Avg');
          assert.strictEqual(fields[5].caption, 'Field3 (Avg)');
          assert.strictEqual(fields[6].caption, 'Date Year');
          assert.strictEqual(fields[7].caption, 'Number');
          assert.strictEqual(fields[8].caption, 'Date Month (Count)');
          assert.strictEqual(fields[9].caption, 'Field4');
          assert.strictEqual(fields[10].caption, 'Field5');
          assert.strictEqual(fields[11].caption, 'Field6');
          assert.strictEqual(fields[12].caption, 'Group3');
        });
        QUnit.test('Fields Caption generation. Change field option', function(assert) {
          inflector.titleize.restore();
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              caption: 'userCaption',
              summaryType: 'sum',
              groupName: 'Group1'
            }, {
              dataField: 'Field2',
              caption: ''
            }, {dataField: 'fieldName_caption'}, {}, {summaryType: 'avg'}, {
              dataField: 'Field3',
              summaryType: 'avg'
            }, {
              dataField: 'date',
              groupInterval: 'year'
            }, {
              dataField: 'number',
              groupInterval: 10
            }, {
              dataField: 'date',
              groupInterval: 'month',
              summaryType: 'count'
            }, {
              dataField: 'Field4',
              summaryType: 'custom'
            }, {dataField: 'Field5'}, {
              dataField: 'Field6',
              groupName: 'Group2'
            }, {groupName: 'Group3'}],
            store: this.testStore
          });
          dataSource.field(1, {summaryType: 'max'});
          dataSource.field(2, {summaryType: 'max'});
          dataSource.field(5, {
            area: 'row',
            summaryType: 'max'
          });
          dataSource.field(6, {groupInterval: 'month'});
          dataSource.field(11, {groupName: 'Group3'});
          dataSource.field(12, {groupName: 'Group2'});
          dataSource.field(10, {
            caption: 'new custom caption',
            summaryType: 'sum'
          });
          var fields = dataSource.fields();
          assert.strictEqual(fields[0].caption, 'userCaption');
          assert.strictEqual(fields[1].caption, '');
          assert.strictEqual(fields[2].caption, 'Field Name Caption (Max)');
          assert.strictEqual(fields[3].caption, '');
          assert.strictEqual(fields[4].caption, 'Avg');
          assert.strictEqual(fields[5].caption, 'Field3 (Max)');
          assert.strictEqual(fields[6].caption, 'Date Month');
          assert.strictEqual(fields[7].caption, 'Number');
          assert.strictEqual(fields[8].caption, 'Date Month (Count)');
          assert.strictEqual(fields[9].caption, 'Field4');
          assert.strictEqual(fields[10].caption, 'new custom caption');
          assert.strictEqual(fields[11].caption, 'Field6');
          assert.strictEqual(fields[12].caption, 'Group2');
        });
        QUnit.test('T411764. Change generated caption on fields prepared', function(assert) {
          inflector.titleize.restore();
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'row'
            }],
            onFieldsPrepared: function(fields) {
              for (var i = 0; i < fields.length; i++) {
                fields[i].caption = fields[i].caption.toUpperCase();
              }
            },
            store: this.testStore
          });
          dataSource.field(0, {area: 'column'});
          assert.strictEqual(dataSource.field(0).caption, 'FIELD1');
        });
        QUnit.test('Change fields at runtime', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'Field1',
            dataType: 'number'
          }, {dataField: 'Field2'}]));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              caption: 'Field1Caption',
              dataType: 'string'
            }, {
              dataField: 'Field2',
              caption: 'Filed2Caption',
              dataType: 'string'
            }],
            store: this.testStore
          });
          var fieldsPrepared = sinon.stub();
          dataSource.on('fieldsPrepared', fieldsPrepared);
          dataSource.fields([{dataField: 'Field1'}, {
            dataField: 'Field2',
            caption: 'newCaption'
          }, {dataField: 'Field3'}]);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: 'Field1',
            dataType: 'number',
            caption: ''
          }, {
            dataField: 'Field2',
            caption: 'newCaption'
          }, {
            dataField: 'Field3',
            caption: ''
          }]);
          assert.ok(fieldsPrepared.calledOnce);
          assert.deepEqual(fieldsPrepared.lastCall.args[0], dataSource.fields());
        });
        QUnit.test('Set fields at runtime', function(assert) {
          this.testStore.getFields.returns($.Deferred().resolve([{
            dataField: 'Field1',
            dataType: 'number'
          }, {dataField: 'Field2'}]));
          var dataSource = createDataSource({store: this.testStore});
          dataSource.fields([{
            dataField: 'Field1',
            caption: 'Field1CustomCaption'
          }, {
            groupName: 'Group',
            caption: 'Group'
          }, {
            dataField: 'Field3',
            caption: 'First Group Item',
            groupName: 'Group',
            groupIndex: 0
          }, {
            dataField: 'Field2',
            caption: 'Second Group Item',
            groupName: 'Group',
            groupIndex: 1
          }]);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: 'Field1',
            dataType: 'number',
            caption: 'Field1CustomCaption'
          }, {
            groupName: 'Group',
            caption: 'Group',
            levels: [{
              dataField: 'Field3',
              caption: 'First Group Item',
              groupName: 'Group',
              groupIndex: 0
            }, {
              dataField: 'Field2',
              caption: 'Second Group Item',
              groupName: 'Group',
              groupIndex: 1
            }]
          }, {
            dataField: 'Field3',
            caption: 'First Group Item',
            groupName: 'Group',
            groupIndex: 0
          }, {
            dataField: 'Field2',
            caption: 'Second Group Item',
            groupName: 'Group',
            groupIndex: 1
          }]);
        });
        QUnit.test('Change fields at runtime when store fields not yet loaded', function(assert) {
          var deferred = $.Deferred();
          this.testStore.getFields.returns(deferred);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              caption: 'Field1Caption',
              dataType: 'string'
            }, {
              dataField: 'Field2',
              caption: 'Filed2Caption',
              dataType: 'string'
            }],
            store: this.testStore
          });
          var fieldsPrepared = sinon.stub();
          dataSource.on('fieldsPrepared', fieldsPrepared);
          dataSource.fields([{dataField: 'Field1'}, {
            dataField: 'Field2',
            caption: 'newCaption'
          }, {dataField: 'Field3'}]);
          deferred.resolve([{
            dataField: 'Field1',
            dataType: 'number'
          }, {dataField: 'Field2'}]);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            dataField: 'Field1',
            dataType: 'number',
            caption: ''
          }, {
            dataField: 'Field2',
            caption: 'newCaption'
          }, {
            dataField: 'Field3',
            caption: ''
          }]);
          assert.ok(fieldsPrepared.calledTwice);
          assert.deepEqual(fieldsPrepared.lastCall.args[0], dataSource.fields());
        });
        QUnit.test('isLoading() in dataSource changed event', function(assert) {
          assert.expect(1);
          var d = $.Deferred();
          this.testStore.load.returns(d);
          var dataSource = createDataSource({
            fields: this.defaultFields,
            store: this.testStore
          });
          dataSource.on('changed', assertFunction);
          d.resolve(this.storeData);
          function assertFunction() {
            assert.ok(!this.isLoading());
          }
        });
        QUnit.test('isLoading() in dataSource changed event when expand header item', function(assert) {
          assert.expect(1);
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var d = $.Deferred();
          var dataSource = createDataSource({
            fields: this.defaultFields,
            store: this.testStore
          });
          this.testStore.load.returns(d);
          dataSource.on('changed', assertFunction);
          dataSource.expandHeaderItem('column', ['Canada']);
          this.storeData.columns = this.storeData.columns[1].children;
          d.resolve(this.storeData);
          function assertFunction() {
            assert.ok(!this.isLoading());
          }
        });
        QUnit.test('data on load done when async loading', function(assert) {
          assert.expect(8);
          this.testStore.load.returns($.Deferred().reject());
          var d = $.Deferred();
          var dataSource = createDataSource({
            fields: this.defaultFields,
            store: this.testStore
          });
          this.testStore.load.returns(d);
          dataSource.on('changed', assertFunction);
          dataSource.load().done(assertFunction);
          d.resolve(this.storeData);
          function assertFunction() {
            assert.ok(!dataSource.isLoading());
            var data = dataSource.getData();
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.strictEqual(data.columns[2].value, 'USA');
          }
        });
        QUnit.test('data on load done when sync loading', function(assert) {
          assert.expect(4);
          this.testStore.load.returns($.Deferred().reject());
          var dataSource = createDataSource({
            fields: this.defaultFields,
            store: this.testStore
          });
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          dataSource.load().done(assertFunction);
          function assertFunction(data) {
            assert.ok(!dataSource.isLoading());
            assert.strictEqual(data.columns[0].value, 'Brazil');
            assert.strictEqual(data.columns[1].value, 'Canada');
            assert.strictEqual(data.columns[2].value, 'USA');
          }
        });
        QUnit.test('headers formatting', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var customizeText = sinon.spy(function() {
            return 'custom Text';
          });
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'column'
            }, {
              dataField: 'Field2',
              area: 'column',
              customizeText: customizeText
            }, {
              dataField: 'Field3',
              area: 'row',
              format: {
                type: 'currency',
                precision: 2
              }
            }],
            store: this.testStore
          });
          var rows = dataSource.getData().rows;
          assert.strictEqual(rows.length, 3);
          assert.strictEqual(rows[0].text, '$1,985.00');
          assert.strictEqual(rows[1].text, '$1,991.00');
          assert.strictEqual(rows[2].text, '$1,991.00');
          var columns = dataSource.getData().columns;
          assert.strictEqual(columns[0].text, 'Brazil');
          assert.strictEqual(columns[0].children[0].text, 'custom Text');
          assert.strictEqual(customizeText.callCount, 5);
          assert.deepEqual(customizeText.firstCall.args[0], {
            value: 'Boise',
            valueText: 'Boise'
          });
        });
        QUnit.test('header formatting when expanding', function(assert) {
          this.testStore.load.returns($.Deferred().resolve(this.storeData));
          var customizeText = sinon.spy(function() {
            return 'custom Text';
          });
          var d = $.Deferred();
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'column'
            }, {
              dataField: 'Field2',
              area: 'column',
              customizeText: customizeText
            }, {
              dataField: 'Field3',
              area: 'row',
              format: {
                type: 'currency',
                precision: 2
              }
            }],
            store: this.testStore
          });
          this.testStore.load.returns(d);
          dataSource.expandHeaderItem('column', ['Canada']);
          this.storeData.columns = [{value: 'Vancouver'}];
          d.resolve(this.storeData);
          var rows = dataSource.getData().rows;
          assert.strictEqual(rows.length, 3);
          assert.strictEqual(rows[0].text, '$1,985.00');
          assert.strictEqual(rows[1].text, '$1,991.00');
          assert.strictEqual(rows[2].text, '$1,991.00');
          var columns = dataSource.getData().columns;
          assert.strictEqual(columns[0].text, 'Brazil');
          assert.strictEqual(columns[1].text, 'Canada');
          assert.strictEqual(columns[0].children[0].text, 'custom Text');
          assert.strictEqual(columns[1].children[0].text, 'custom Text');
          assert.strictEqual(customizeText.callCount, 6);
          assert.deepEqual(customizeText.firstCall.args[0], {
            value: 'Boise',
            valueText: 'Boise'
          });
        });
        if (window.INTRANET) {
          QUnit.test('XMLA store integration', function(assert) {
            var done = assert.async();
            var dataSource = createDataSource({
              descriptions: {
                columns: [{
                  dataField: '[Product].[Category]',
                  allMember: '[All Products]'
                }],
                rows: [{
                  dataField: '[Ship Date].[Calendar Year]',
                  allMember: '[All Periods]'
                }],
                values: [{
                  dataField: '[Measures].[Customer Count]',
                  caption: 'Count'
                }]
              },
              store: {
                type: 'xmla',
                url: PivotGridTestSettings.XMLA_STORE_URL,
                catalog: 'Adventure Works DW Standard Edition',
                cube: 'Adventure Works'
              }
            });
            dataSource.on('changed', function() {
              assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
                key: '[Product].[Category].&[4]',
                value: 'Accessories',
                index: 1
              }, {
                key: '[Product].[Category].&[1]',
                value: 'Bikes',
                index: 2
              }, {
                key: '[Product].[Category].&[3]',
                value: 'Clothing',
                index: 3
              }]);
              assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
                key: '[Ship Date].[Calendar Year].&[2001]',
                value: 2001,
                index: 1
              }, {
                key: '[Ship Date].[Calendar Year].&[2002]',
                value: 2002,
                index: 2
              }, {
                key: '[Ship Date].[Calendar Year].&[2003]',
                value: 2003,
                index: 3
              }, {
                key: '[Ship Date].[Calendar Year].&[2004]',
                value: 2004,
                index: 4
              }]);
              assert.strictEqual(dataSource.getData().grandTotalColumnIndex, 0);
              assert.strictEqual(dataSource.getData().grandTotalRowIndex, 0);
              assert.deepEqual(dataSource.getData().values, [[[18484], [15114], [9132], [6852]], [[962], [null], [962], [null]], [[2665], [null], [2665], [null]], [[9002], [6470], [4756], [2717]], [[11753], [9745], [5646], [4340]]]);
              done();
            });
          });
          QUnit.test('XMLA store. Sorting data', function(assert) {
            var done = assert.async();
            var dataSource = createDataSource({
              descriptions: {
                columns: [{dataField: '[Product].[Category]'}],
                rows: [{dataField: '[Ship Date].[Month Of Year]'}],
                values: [{
                  dataField: '[Measures].[Customer Count]',
                  caption: 'Count'
                }]
              },
              store: {
                type: 'xmla',
                url: PivotGridTestSettings.XMLA_STORE_URL,
                catalog: 'Adventure Works DW Standard Edition',
                cube: 'Adventure Works'
              }
            });
            dataSource.on('changed', function() {
              assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
                key: '[Product].[Category].&[4]',
                value: 'Accessories',
                index: 1
              }, {
                key: '[Product].[Category].&[1]',
                value: 'Bikes',
                index: 2
              }, {
                key: '[Product].[Category].&[3]',
                value: 'Clothing',
                index: 3
              }]);
              assert.deepEqual(dataSource.getData().rows.length, 12, 'month count');
              assert.deepEqual(dataSource.getData().rows[0], {
                index: 1,
                key: '[Ship Date].[Month of Year].&[1]',
                text: 'January',
                value: 1
              }, 'month 1');
              assert.deepEqual(dataSource.getData().rows[11], {
                index: 12,
                key: '[Ship Date].[Month of Year].&[12]',
                text: 'December',
                value: 12
              }, 'month 12');
              assert.strictEqual(dataSource.getData().grandTotalColumnIndex, 0);
              assert.strictEqual(dataSource.getData().grandTotalRowIndex, 0);
              assert.deepEqual(dataSource.getData().values[0], [[18484], [15114], [9132], [6852]]);
              assert.deepEqual(dataSource.getData().values[1], [[2224], [1485], [1220], [649]]);
              done();
            });
          });
        }
        QUnit.test('Do not perform summary calculation if dataSource is empty', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortOrder: 'desc',
              sortingMethod: function(a, b) {
                return b.index - a.index;
              }
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              calculateSummaryValue: function() {}
            }],
            store: this.testStore
          });
          def.resolve({
            rows: [{
              value: '1',
              index: 1
            }],
            columns: [{
              value: '1',
              index: 1
            }],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          assert.ok(dataSource.isEmpty());
        });
        QUnit.test('Do not perform running total calculation if dataSource is empty', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortOrder: 'desc',
              sortingMethod: function(a, b) {
                return b.index - a.index;
              }
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              runningTotal: 'row'
            }],
            store: this.testStore
          });
          def.resolve({
            rows: [{
              value: '1',
              index: 1
            }],
            columns: [{
              value: '1',
              index: 1
            }],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          assert.ok(dataSource.isEmpty());
        });
        QUnit.test('fields with same dataField should not pollute each other', function(assert) {
          var $__6,
              $__7;
          var dataSource = createDataSource({
            fields: [{
              dataField: 'a',
              area: 'data',
              summaryType: 'sum',
              dataType: 'string'
            }, {
              dataField: 'a',
              area: 'row',
              summaryType: 'avg',
              dataType: 'number'
            }],
            store: []
          });
          var $__5 = dataSource.fields(),
              firstField = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
              secondField = ($__7 = $__6.next()).done ? void 0 : $__7.value;
          assert.strictEqual(firstField.area, 'data');
          assert.strictEqual(firstField.summaryType, 'sum');
          assert.strictEqual(firstField.dataType, 'string');
          assert.strictEqual(secondField.area, 'row');
          assert.strictEqual(secondField.summaryType, 'avg');
          assert.strictEqual(secondField.dataType, 'number');
        });
      });
      QUnit.module('Sorting', defaultEnvironment, function() {
        QUnit.test('Sort data', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              sortOrder: 'asc',
              area: 'column'
            }, {
              dataField: 'ShipCity',
              sortOrder: 'desc',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row',
              sortOrder: 'asc'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 6,
            value: 'Brazil',
            children: [{
              index: 8,
              value: 'Sao Paulo'
            }, {
              index: 7,
              value: 'Campinas'
            }]
          }, {
            index: 5,
            value: 'Canada'
          }, {
            index: 1,
            value: 'USA',
            children: [{
              index: 3,
              value: 'Elgin'
            }, {
              index: 4,
              value: 'Butte'
            }, {
              index: 2,
              value: 'Boise'
            }]
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('Local sorting should not work if paginate', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            paginate: true,
            fields: [{
              dataField: 'ShipVia',
              area: 'row',
              sortOrder: 'asc'
            }, {
              dataField: 'ShipCountry',
              area: 'column'
            }, {
              dataField: 'ShipCity',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }, {
            index: 3,
            value: 1985
          }]);
        });
        QUnit.test('Data order by default', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortOrder: 'wrongOrder'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('Data order with sortingMethod', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var sortingMethod = sinon.spy(function(a, b) {
            return b.index - a.index;
          });
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'value',
              sortOrder: 'asc',
              sortingMethod: sortingMethod
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 2,
            value: 'Boise'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.ok(sortingMethod.called);
          assert.strictEqual(sortingMethod.lastCall.thisValue, dataSource.field('ShipCountry'), 'field is context');
        });
        QUnit.test('Data order with sortBy: none', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'none'
            }, {
              dataField: 'ShipVia',
              area: 'row',
              sortBy: 'none'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 4,
            value: 'Butte'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }, {
            index: 3,
            value: 1985
          }], 'rows');
        });
        QUnit.test('Data order with sortBy: none and desc sort order', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'none',
              sortOrder: 'desc'
            }, {
              dataField: 'ShipVia',
              area: 'row',
              sortBy: 'none',
              sortOrder: 'desc'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 2,
            value: 'Boise'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 2,
            value: 1991
          }, {
            index: 1,
            value: 1991
          }], 'rows');
        });
        QUnit.test('Data order with sortingMethod. Desc', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var sortingMethod = sinon.spy(function(a, b) {
            return b.index - a.index;
          });
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'value',
              sortOrder: 'desc',
              sortingMethod: sortingMethod
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 4,
            value: 'Butte'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.ok(sortingMethod.called);
        });
        QUnit.test('Sort data by displayText', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'displayText',
              sortOrder: 'desc'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          this.storeData.columns = $.map(this.storeData.columns, function(item) {
            item.text = item.value;
            item.value = item.index;
            return item;
          });
          def.resolve(this.storeData);
          assert.deepEqual(dataSource.getData().columns, [{
            index: 3,
            text: 'Elgin',
            value: 3
          }, {
            index: 4,
            text: 'Butte',
            value: 4
          }, {
            index: 2,
            text: 'Boise',
            value: 2
          }], 'column');
        });
        QUnit.test('Sort data after expand item', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              sortOrder: 'asc',
              area: 'column'
            }, {
              dataField: 'ShipCity',
              sortOrder: 'desc',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row',
              sort: 'desc'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          var loadResult = {
            columns: [{
              index: 1,
              value: 'USA'
            }, {
              index: 5,
              value: 'Canada'
            }, {
              index: 6,
              value: 'Brazil',
              children: [{
                index: 7,
                value: 'Campinas'
              }, {
                index: 8,
                value: 'Sao Paulo'
              }]
            }],
            rows: [{
              index: 1,
              value: 1991
            }, {
              index: 2,
              value: 1991
            }, {
              index: 3,
              value: 1985
            }],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(loadResult);
          this.testStore.load.returns($.Deferred().resolve({
            columns: [{
              index: 2,
              value: 'Boise'
            }, {
              index: 3,
              value: 'Elgin'
            }, {
              index: 4,
              value: 'Butte'
            }],
            rows: [{
              index: 1,
              value: 1991
            }, {
              index: 2,
              value: 1991
            }, {
              index: 3,
              value: 1985
            }],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: undefined
          }));
          dataSource.expandHeaderItem('column', ['USA']);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 6,
            value: 'Brazil',
            children: [{
              index: 8,
              value: 'Sao Paulo'
            }, {
              index: 7,
              value: 'Campinas'
            }]
          }, {
            index: 5,
            value: 'Canada'
          }, {
            index: 1,
            value: 'USA',
            children: [{
              index: 12,
              value: 'Elgin'
            }, {
              index: 13,
              value: 'Butte'
            }, {
              index: 11,
              value: 'Boise'
            }]
          }], 'column');
          assert.deepEqual(prepareLoadedData(loadResult.rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('Sort by summary with path', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            rows: [{
              index: 1,
              value: 'A'
            }, {
              index: 2,
              value: 'B'
            }, {
              index: 3,
              value: 'C'
            }],
            columns: [{
              index: 1,
              value: 1
            }, {
              index: 2,
              value: 2
            }, {
              index: 3,
              value: 3
            }],
            grandTotalRowIndex: 0,
            grandTotalColumnIndex: 0,
            values: [[[0], [0], [0], [0]], [[0], [0], [0], [0]], [[0], [null], [0], [0]], [[0], [-1], [0], [0]]]
          }));
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Count',
              area: 'row',
              sortBySummaryPath: [1]
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              dataField: 'Count',
              caption: 'Count',
              area: 'data'
            }],
            store: this.testStore
          });
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 3);
          assert.strictEqual(data.rows[0].value, 'B');
          assert.strictEqual(data.rows[1].value, 'C');
          assert.strictEqual(data.rows[2].value, 'A');
        });
        QUnit.test('Sorting with null values', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipVia',
              area: 'row',
              sortOrder: 'asc'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          var storeData = {
            columns: [],
            rows: [{
              value: null,
              index: 1
            }, {
              value: '[1]',
              index: 2
            }, {
              value: '[2]',
              index: 3
            }, {
              value: '[3]',
              index: 4
            }, {
              value: '[4]',
              index: 5
            }, {
              value: '[5]',
              index: 6
            }, {
              value: 'Value',
              index: 7
            }, {
              value: '[11]',
              index: 8
            }, {
              value: '[11]',
              index: 9
            }, {
              value: '[21]',
              index: 10
            }, {
              value: '[22]',
              index: 11
            }, {
              value: '[23]',
              index: 12
            }],
            values: [[1]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          };
          def.resolve(storeData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows)[0].value, null, 'sorted correctly');
        });
      });
      QUnit.module('Sorting by summary', {
        beforeEach: function() {
          var that = this;
          this.XmlaStore = XmlaStore;
          this.testStore = sinon.createStubInstance(that.XmlaStore);
          executeAsyncMock.setup();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
        }
      }, function() {
        QUnit.test('Sort by summary Field with summaryType', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Sum)',
              area: 'row'
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.deepEqual(prepareLoadedData(data.rows), [{
            index: 19,
            value: 'Poland'
          }, {
            index: 20,
            value: 'Norway'
          }, {
            index: 21,
            value: 'Argentina'
          }, {
            index: 16,
            value: 'Portugal'
          }, {
            index: 13,
            value: 'Spain'
          }, {
            index: 12,
            value: 'Italy'
          }, {
            index: 11,
            value: 'Finland'
          }, {
            index: 8,
            value: 'Mexico'
          }, {
            index: 4,
            value: 'Belgium'
          }, {
            index: 5,
            value: 'Switzerland'
          }, {
            index: 18,
            value: 'Denmark'
          }, {
            index: 17,
            value: 'Canada'
          }, {
            index: 6,
            value: 'Venezuela'
          }, {
            index: 15,
            value: 'Ireland'
          }, {
            index: 14,
            value: 'UK'
          }, {
            index: 10,
            value: 'Sweden'
          }, {
            index: 1,
            value: 'France'
          }, {
            index: 3,
            value: 'Brazil'
          }, {
            index: 7,
            value: 'Austria'
          }, {
            index: 2,
            value: 'Germany'
          }, {
            index: 9,
            value: 'USA'
          }]);
        });
        QUnit.test('Sort row by summary Field with summaryType', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Sum)',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.deepEqual(prepareLoadedData(data.columns), [{
            index: 19,
            value: 'Poland'
          }, {
            index: 20,
            value: 'Norway'
          }, {
            index: 21,
            value: 'Argentina'
          }, {
            index: 16,
            value: 'Portugal'
          }, {
            index: 13,
            value: 'Spain'
          }, {
            index: 12,
            value: 'Italy'
          }, {
            index: 11,
            value: 'Finland'
          }, {
            index: 8,
            value: 'Mexico'
          }, {
            index: 4,
            value: 'Belgium'
          }, {
            index: 5,
            value: 'Switzerland'
          }, {
            index: 18,
            value: 'Denmark'
          }, {
            index: 17,
            value: 'Canada'
          }, {
            index: 6,
            value: 'Venezuela'
          }, {
            index: 15,
            value: 'Ireland'
          }, {
            index: 14,
            value: 'UK'
          }, {
            index: 10,
            value: 'Sweden'
          }, {
            index: 1,
            value: 'France'
          }, {
            index: 3,
            value: 'Brazil'
          }, {
            index: 7,
            value: 'Austria'
          }, {
            index: 2,
            value: 'Germany'
          }, {
            index: 9,
            value: 'USA'
          }]);
        });
        QUnit.test('Sort by summary second level', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              expanded: true,
              area: 'row'
            }, {
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Avg)',
              area: 'row'
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 21);
          assert.strictEqual(data.rows[0].value, 'Argentina');
          assert.strictEqual(data.rows[14].value, 'Portugal');
          assert.strictEqual(data.rows[20].value, 'Venezuela');
          assert.deepEqual(prepareLoadedData(data.rows[19].children), [{
            index: 80,
            value: 'Walla Walla'
          }, {
            index: 85,
            value: 'Kirkland'
          }, {
            index: 50,
            value: 'Portland'
          }, {
            index: 70,
            value: 'Elgin'
          }, {
            index: 88,
            value: 'Butte'
          }, {
            index: 86,
            value: 'San Francisco'
          }, {
            index: 31,
            value: 'Lander'
          }, {
            index: 30,
            value: 'Seattle'
          }, {
            index: 49,
            value: 'Anchorage'
          }, {
            index: 83,
            value: 'Eugene'
          }, {
            index: 22,
            value: 'Albuquerque'
          }, {
            index: 54,
            value: 'Boise'
          }]);
        });
        QUnit.test('Sort by summary with path', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Avg)',
              area: 'row',
              sortBySummaryPath: [1]
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }, {
              dataField: 'ShipCountry',
              area: 'filter',
              filterValues: ['USA']
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 12);
          assert.strictEqual(data.rows[0].value, 'Kirkland');
          assert.strictEqual(data.rows[1].value, 'San Francisco');
          assert.strictEqual(data.rows[11].value, 'Boise');
        });
        QUnit.test('Sort by summary Field with empty path', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Sum)',
              area: 'row',
              sortBySummaryPath: []
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.deepEqual(prepareLoadedData(data.rows), [{
            index: 19,
            value: 'Poland'
          }, {
            index: 20,
            value: 'Norway'
          }, {
            index: 21,
            value: 'Argentina'
          }, {
            index: 16,
            value: 'Portugal'
          }, {
            index: 13,
            value: 'Spain'
          }, {
            index: 12,
            value: 'Italy'
          }, {
            index: 11,
            value: 'Finland'
          }, {
            index: 8,
            value: 'Mexico'
          }, {
            index: 4,
            value: 'Belgium'
          }, {
            index: 5,
            value: 'Switzerland'
          }, {
            index: 18,
            value: 'Denmark'
          }, {
            index: 17,
            value: 'Canada'
          }, {
            index: 6,
            value: 'Venezuela'
          }, {
            index: 15,
            value: 'Ireland'
          }, {
            index: 14,
            value: 'UK'
          }, {
            index: 10,
            value: 'Sweden'
          }, {
            index: 1,
            value: 'France'
          }, {
            index: 3,
            value: 'Brazil'
          }, {
            index: 7,
            value: 'Austria'
          }, {
            index: 2,
            value: 'Germany'
          }, {
            index: 9,
            value: 'USA'
          }]);
        });
        QUnit.test('Sort by summary with wrong path', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Avg)',
              area: 'row',
              sortBySummaryPath: [1996, 2]
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }, {
              dataField: 'ShipCountry',
              area: 'filter',
              filterValues: ['USA']
            }],
            store: window.orders
          });
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 12);
          assert.strictEqual(data.rows[0].value, 'Albuquerque');
          assert.strictEqual(data.rows[1].value, 'Anchorage');
          assert.strictEqual(data.rows[5].value, 'Eugene');
          assert.strictEqual(data.rows[11].value, 'Walla Walla');
        });
        QUnit.test('Sort by summary with path expand item', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Avg)',
              area: 'row',
              sortBySummaryPath: [1996, 2]
            }, {
              dataField: 'OrderDate',
              groupInterval: 'year',
              dataType: 'date',
              area: 'column',
              filterValues: [1996],
              filterType: 'include'
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }, {
              dataField: 'ShipCountry',
              area: 'filter',
              filterValues: ['USA']
            }],
            store: window.orders
          });
          dataSource.expandHeaderItem('column', [1996]);
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 7);
          assert.strictEqual(data.rows[0].value, 'Anchorage');
          assert.strictEqual(data.rows[1].value, 'Boise');
          assert.strictEqual(data.rows[5].value, 'Lander');
          assert.strictEqual(data.rows[6].value, 'Albuquerque');
        });
        QUnit.test('Sort by summary with path collapse item', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCity',
              sortOrder: 'asc',
              sortBySummaryField: 'Freight (Avg)',
              area: 'row',
              sortBySummaryPath: [1996, 2]
            }, {
              dataField: 'OrderDate',
              groupInterval: 'year',
              dataType: 'date',
              area: 'column',
              expanded: true,
              filterValues: [1996],
              filterType: 'include'
            }, {
              dataField: 'ShipVia',
              area: 'column'
            }, {
              summaryType: 'count',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'avg',
              area: 'data'
            }, {
              dataField: 'Freight',
              dataType: 'number',
              summaryType: 'sum',
              area: 'data'
            }, {
              dataField: 'ShipCountry',
              area: 'filter',
              filterValues: ['USA']
            }],
            store: window.orders
          });
          dataSource.collapseHeaderItem('column', [1996]);
          var data = dataSource.getData();
          assert.strictEqual(data.rows.length, 7);
          assert.strictEqual(data.rows[0].value, 'Albuquerque');
          assert.strictEqual(data.rows[1].value, 'Anchorage');
          assert.strictEqual(data.rows[5].value, 'Portland');
          assert.strictEqual(data.rows[6].value, 'Seattle');
          assert.strictEqual(dataSource.field('OrderDate').expanded, false);
        });
      });
      QUnit.module('Apply summary mode', {
        beforeEach: function() {
          var that = this;
          defaultEnvironment.beforeEach.apply(this, arguments);
          sinon.stub(summaryDisplayModesModule, 'applyDisplaySummaryMode').callsFake(function(descriptions, data) {
            that.applyDisplaySummaryModePassedData = $.extend(true, {}, data);
          });
          sinon.stub(summaryDisplayModesModule, 'applyRunningTotal').callsFake(function(descriptions, data) {
            that.applyRunningTotalPassedData = $.extend(true, {}, data);
          });
        },
        afterEach: function() {
          defaultEnvironment.afterEach.apply(this, arguments);
          summaryDisplayModesModule.applyDisplaySummaryMode.restore();
          summaryDisplayModesModule.applyRunningTotal.restore();
        }
      }, function() {
        QUnit.test('apply Display Summary Mode when expressions were not used', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.ok(!this.applyDisplaySummaryModePassedData);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('load fields without area if it is used in calculateSummaryValue', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              caption: 'Field1',
              visible: false
            }, {
              dataField: '[Product].[Category]',
              area: 'column',
              areaIndex: 0
            }, {
              dataField: '[Ship Date].[Calendar Month]',
              area: 'row',
              areaIndex: 0,
              visible: false
            }, {
              dataField: '[Ship Date].[Calendar Year]',
              area: 'row',
              areaIndex: 0,
              visible: true
            }, {
              dataField: 'Product',
              groupName: 'Product',
              area: 'row'
            }, {
              dataField: 'Product.Color',
              groupName: 'Product',
              groupIndex: 0,
              visible: true
            }, {
              dataField: 'Product.Width',
              groupName: 'Product',
              groupIndex: 1
            }, {
              dataField: 'Product.Height',
              groupName: 'Product',
              groupIndex: 2,
              visible: false
            }, {
              dataField: 'Calendar',
              groupName: 'Calendar',
              area: 'row',
              visible: false
            }, {
              dataField: 'Calendar.Year',
              groupName: 'Calendar',
              groupIndex: 0,
              visible: true
            }, {
              dataField: 'Calendar.Quarter',
              groupName: 'Calendar',
              groupIndex: 1,
              visible: true
            }, {
              dataField: 'Calendar.Month',
              groupName: 'Calendar',
              groupIndex: 2,
              visible: false
            }, {
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0,
              calculateSummaryValue: function(e) {
                return e.value('Field1') + e.value('Field1');
              }
            }],
            store: this.testStore
          });
          var dataFields = prepareFields(this.testStore.load.lastCall.args[0].values);
          assert.equal(dataFields.length, 2);
          assert.equal(dataFields[0].dataField, '[Measures].[Customer Count]');
          assert.equal(dataFields[1].dataField, 'Field1');
          assert.strictEqual(dataSource.getAreaFields('data', true).length, 1);
        });
        QUnit.test('apply Display Summary Mode when expressions were used', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              calculateSummaryValue: function() {}
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }]);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.ok(summaryDisplayModesModule.applyDisplaySummaryMode.calledOnce);
          var descriptions = this.testStore.load.lastCall.args[0];
          delete descriptions.columnExpandedPaths;
          delete descriptions.rowExpandedPaths;
          assert.deepEqual(summaryDisplayModesModule.applyDisplaySummaryMode.lastCall.args[0], descriptions);
        });
        QUnit.test('apply Display Summary Mode when summaryDisplayType was used', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              summaryDisplayMode: 'PercentOfColumn'
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }]);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('apply Display Summary Mode when runningTotal is used', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              runningTotal: true
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.ok(summaryDisplayModesModule.applyRunningTotal.calledOnce);
          assert.deepEqual(prepareLoadedData(this.applyRunningTotalPassedData.rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.deepEqual(prepareLoadedData(this.applyRunningTotalPassedData.columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }]);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
        QUnit.test('apply Display Summary Mode when expressions were used and data is sorted', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortBy: 'displayText',
              sortOrder: 'desc'
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              calculateSummaryValue: function() {}
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          this.storeData.columns = $.map(this.storeData.columns, function(item) {
            item.text = item.value;
            item.value = item.index;
            return item;
          });
          def.resolve(this.storeData);
          assert.deepEqual(this.applyDisplaySummaryModePassedData.columns, [{
            index: 2,
            text: 'Boise',
            value: 2
          }, {
            index: 3,
            text: 'Elgin',
            value: 3
          }, {
            index: 4,
            text: 'Butte',
            value: 4
          }]);
          assert.deepEqual(dataSource.getData().columns, [{
            index: 3,
            text: 'Elgin',
            value: 3
          }, {
            index: 4,
            text: 'Butte',
            value: 4
          }, {
            index: 2,
            text: 'Boise',
            value: 2
          }], 'column');
        });
        QUnit.test('apply Display Summary Mode when expressions were used when data sorted with sorting method', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var dataSource = createDataSource({
            fields: [{
              dataField: 'ShipCountry',
              area: 'column',
              sortOrder: 'desc',
              sortingMethod: function(a, b) {
                return b.index - a.index;
              }
            }, {
              dataField: 'ShipVia',
              area: 'row'
            }, {
              summaryType: 'count',
              area: 'data',
              calculateSummaryValue: function() {}
            }],
            store: this.testStore
          });
          this.storeData.columns = this.storeData.columns[0].children;
          def.resolve(this.storeData);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
          assert.deepEqual(prepareLoadedData(this.applyDisplaySummaryModePassedData.columns), [{
            index: 4,
            value: 'Butte'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 2,
            value: 'Boise'
          }]);
          assert.deepEqual(prepareLoadedData(dataSource.getData().columns), [{
            index: 2,
            value: 'Boise'
          }, {
            index: 3,
            value: 'Elgin'
          }, {
            index: 4,
            value: 'Butte'
          }], 'column');
          assert.deepEqual(prepareLoadedData(dataSource.getData().rows), [{
            index: 3,
            value: 1985
          }, {
            index: 1,
            value: 1991
          }, {
            index: 2,
            value: 1991
          }]);
        });
      });
      QUnit.module('State storing', defaultEnvironment, function() {
        QUnit.test('Get current State. DataSource is not loaded', function(assert) {
          this.testStore.load.returns($.Deferred());
          this.testStore.getFields.returns($.Deferred());
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0,
              sortOrder: 'desc'
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1,
              expanded: true
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0,
              sortBySummaryPath: ['sortPath'],
              sortBySummaryField: '[Measures].[Customer Count]',
              sortOrder: 'asc'
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'Day',
              area: 'row',
              areaIndex: 1,
              sortBy: 'text'
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)).concat([{
              dataField: 'Field1',
              filterValues: [1, 2, 3, 4],
              filterType: 'exclude'
            }]),
            store: this.testStore
          });
          var state = dataSource.state();
          assert.ok(state);
          assert.ok(state.fields);
          assert.deepEqual(state.rowExpandedPaths, []);
          assert.deepEqual(state.columnExpandedPaths, []);
          assert.deepEqual(state.fields.length, 7);
        });
        QUnit.test('Get current State', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0,
              sortOrder: 'desc',
              name: 'CategoryField'
            }, {
              dataField: 'SubCategory',
              area: 'column',
              areaIndex: 1,
              expanded: true
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0,
              sortBySummaryPath: ['sortPath'],
              sortBySummaryField: '[Measures].[Customer Count]',
              sortOrder: 'asc'
            }, {
              dataField: 'Month',
              area: 'row',
              areaIndex: 1
            }, {
              dataField: 'Day',
              area: 'row',
              areaIndex: 1,
              sortBy: 'text'
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0,
              summaryType: 'sum',
              summaryDisplayMode: 'absoluteVariation'
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)).concat([{
              dataField: 'Field1',
              filterValues: [1, 2, 3, 4],
              filterType: 'exclude'
            }]),
            store: this.testStore
          });
          def.resolve({
            columns: [{
              value: 'Cat1',
              index: 1
            }, {
              value: 'Cat2',
              index: 2,
              children: [{
                index: 3,
                value: 'SubCat1'
              }]
            }],
            rows: [{
              value: '2005',
              index: 1,
              children: [{
                value: 'January',
                index: 2,
                children: [{
                  value: '1',
                  index: 3
                }, {
                  value: '2',
                  index: 4
                }]
              }]
            }, {
              value: '2006',
              index: 5
            }, {
              value: '2007',
              index: 5,
              children: [{
                value: 'January',
                index: 6
              }]
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          var state = dataSource.state();
          assert.ok(state);
          assert.ok(state.fields);
          assert.deepEqual(state.rowExpandedPaths, [['2005'], ['2005', 'January'], ['2007']]);
          assert.deepEqual(state.columnExpandedPaths, [['Cat2']]);
          assert.deepEqual(state.fields, [{
            'area': 'row',
            'areaIndex': 0,
            'expanded': undefined,
            name: undefined,
            'dataField': 'Year',
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': '[Measures].[Customer Count]',
            'sortBySummaryPath': ['sortPath'],
            'sortOrder': 'asc',
            summaryType: undefined,
            summaryDisplayMode: undefined
          }, {
            'area': 'row',
            'dataField': 'Month',
            'areaIndex': 1,
            name: undefined,
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            summaryType: undefined,
            summaryDisplayMode: undefined
          }, {
            'area': 'row',
            'areaIndex': 2,
            name: undefined,
            'expanded': undefined,
            'dataField': 'Day',
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': 'text',
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            summaryType: undefined,
            summaryDisplayMode: undefined
          }, {
            'area': 'data',
            'areaIndex': 0,
            'expanded': undefined,
            name: undefined,
            'dataField': '[Measures].[Customer Count]',
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            summaryType: 'sum',
            summaryDisplayMode: 'absoluteVariation'
          }, {
            'area': 'column',
            'areaIndex': 0,
            'dataField': 'Category',
            name: 'CategoryField',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'desc',
            summaryType: undefined,
            summaryDisplayMode: undefined
          }, {
            'area': 'column',
            'areaIndex': 1,
            'expanded': true,
            name: undefined,
            dataField: 'SubCategory',
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            summaryType: undefined,
            summaryDisplayMode: undefined
          }, {
            'area': undefined,
            'areaIndex': undefined,
            name: undefined,
            'expanded': undefined,
            'dataField': 'Field1',
            'filterType': 'exclude',
            'filterValues': [1, 2, 3, 4],
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            summaryType: undefined,
            summaryDisplayMode: undefined
          }]);
        });
        QUnit.test('Set State', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0,
              sortOrder: 'asc'
            }, {
              dataField: 'Month',
              area: 'column',
              areaIndex: 1
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0,
              sortOrder: 'desc'
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)).concat([{
              dataField: 'Field1',
              filterValues: [1, 2],
              filterType: 'exclude'
            }, {dataField: 'SubCategory'}, {
              dataField: 'Day',
              sortBy: 'value'
            }]),
            store: this.testStore
          });
          def.resolve({
            columns: [{
              value: 'Cat1',
              index: 1
            }, {
              value: 'Cat2',
              index: 2
            }],
            rows: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 5
            }, {
              value: '2007',
              index: 5
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          this.testStore.load.reset();
          dataSource.state({
            rowExpandedPaths: [['2005'], ['2005', 'January'], ['2007']],
            columnExpandedPaths: [['Cat2']],
            fields: [{
              'area': 'row',
              'dataField': 'Year',
              'areaIndex': 0,
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': '[Measures].[Customer Count]',
              'sortBySummaryPath': ['sortPath'],
              'sortOrder': 'asc'
            }, {
              'area': 'row',
              'areaIndex': 1,
              'dataField': '[Measures].[Customer Count]',
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': undefined
            }, {
              'area': 'row',
              'areaIndex': 2,
              'dataField': 'Category',
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': 'text',
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': 'asc'
            }, {
              'area': 'data',
              'areaIndex': 0,
              'expanded': undefined,
              'dataField': 'Month',
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': 'asc',
              summaryType: 'count',
              summaryDisplayMode: 'absoluteVariation'
            }, {
              'area': 'column',
              'areaIndex': 0,
              'dataField': 'Field1',
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': 'desc'
            }, {
              'area': 'column',
              'areaIndex': 1,
              'dataField': 'SubCategory',
              'expanded': true,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': 'asc'
            }, {
              'area': undefined,
              'areaIndex': undefined,
              'expanded': undefined,
              'filterType': 'exclude',
              'dataField': 'Day',
              'filterValues': [1, 2, 3, 4],
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': 'asc'
            }]
          });
          assert.ok(this.testStore.load.calledOnce);
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [['2005'], ['2005', 'January'], ['2007']]);
          assert.deepEqual(this.testStore.load.lastCall.args[0].columnExpandedPaths, [['Cat2']]);
          $.each(dataSource.fields(), function(index, field) {
            assert.strictEqual(field.index, index);
          });
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            'area': 'row',
            'areaIndex': 0,
            'caption': 'Year',
            'dataField': 'Year',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': '[Measures].[Customer Count]',
            'sortBySummaryPath': ['sortPath'],
            'sortOrder': 'asc'
          }, {
            'area': 'row',
            'areaIndex': 1,
            'caption': 'Count',
            'dataField': '[Measures].[Customer Count]',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': 'row',
            'areaIndex': 2,
            'caption': 'Category',
            'dataField': 'Category',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': 'text',
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'asc'
          }, {
            'area': 'data',
            'areaIndex': 0,
            'caption': 'Month (Count)',
            'dataField': 'Month',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'asc',
            summaryType: 'count',
            summaryDisplayMode: 'absoluteVariation'
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': 'Field1',
            'dataField': 'Field1',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'desc'
          }, {
            'area': 'column',
            'areaIndex': 1,
            'caption': 'Sub Category',
            'dataField': 'SubCategory',
            'expanded': true,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'asc'
          }, {
            'area': undefined,
            'areaIndex': undefined,
            'caption': 'Day',
            'dataField': 'Day',
            'expanded': undefined,
            'filterType': 'exclude',
            'filterValues': [1, 2, 3, 4],
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': 'asc'
          }]);
        });
        QUnit.test('T399271: dxPivotGrid - It is impossible to apply the state of a grid saved in v15.2 to a grid in v16.1', function(assert) {
          var dataSource = createDataSource({
            fields: [{
              dataField: 'Field1',
              summaryType: 'sum',
              summaryDisplayMode: 'percentOfGrandTotal',
              area: 'row'
            }, {
              dataField: 'Field2',
              summaryType: 'sum',
              summaryDisplayMode: 'percentOfGrandTotal'
            }, {
              dataField: 'Field3',
              summaryType: 'sum',
              summaryDisplayMode: 'percentOfGrandTotal'
            }],
            store: this.testStore
          });
          dataSource.state({fields: [{
              dataField: 'Field1',
              summaryType: 'avg',
              summaryDisplayMode: 'percentOfRowGrandTotal'
            }, {
              dataField: 'Field2',
              summaryType: undefined,
              summaryDisplayMode: undefined
            }, {
              dataField: 'Field3',
              area: 'row'
            }]});
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            area: undefined,
            areaIndex: undefined,
            caption: 'Field1 (Avg)',
            dataField: 'Field1',
            expanded: undefined,
            filterType: undefined,
            filterValues: undefined,
            sortBy: undefined,
            sortBySummaryField: undefined,
            sortBySummaryPath: undefined,
            sortOrder: undefined,
            summaryDisplayMode: 'percentOfRowGrandTotal',
            summaryType: 'avg'
          }, {
            area: undefined,
            areaIndex: undefined,
            caption: 'Field2 (Sum)',
            dataField: 'Field2',
            expanded: undefined,
            filterType: undefined,
            filterValues: undefined,
            sortBy: undefined,
            sortBySummaryField: undefined,
            sortBySummaryPath: undefined,
            sortOrder: undefined,
            summaryDisplayMode: 'percentOfGrandTotal',
            summaryType: 'sum'
          }, {
            area: 'row',
            areaIndex: 0,
            caption: 'Field3 (Sum)',
            dataField: 'Field3',
            expanded: undefined,
            filterType: undefined,
            filterValues: undefined,
            sortBy: undefined,
            sortBySummaryField: undefined,
            sortBySummaryPath: undefined,
            sortOrder: undefined,
            summaryDisplayMode: 'percentOfGrandTotal',
            summaryType: 'sum'
          }]);
        });
        QUnit.test('Set State. After new field have added. T389504', function(assert) {
          this.testStore.load.returns($.Deferred());
          var fields = [{
            dataField: 'Field1',
            groupName: 'Group1',
            area: 'column',
            name: 'Name1'
          }, {
            groupName: 'Group1',
            groupIndex: 0
          }, {
            groupName: 'Group1',
            dataField: 'Field2',
            groupIndex: 1
          }, {
            dataField: 'Field3',
            area: 'row'
          }, {dataField: 'Field4'}, {
            dataField: 'Field5',
            area: 'data',
            summaryType: 'sum'
          }, {summaryType: 'count'}, {
            dataField: 'Field5',
            area: 'data',
            summaryType: 'avg'
          }];
          var dataSource = createDataSource({
            fields: fields,
            store: this.testStore
          });
          var state = dataSource.state();
          dataSource.fields([{dataField: 'Field6'}].concat(fields));
          this.testStore.load.reset();
          dataSource.state(state);
          assert.ok(this.testStore.load.calledOnce);
          $.each(dataSource.fields(), function(index, field) {
            assert.strictEqual(field.index, index);
          });
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            caption: 'Field6',
            dataField: 'Field6'
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': 'Field1',
            'dataField': 'Field1',
            name: 'Name1',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'groupName': 'Group1',
            'levels': [{
              'area': 'column',
              'areaIndex': 0,
              'caption': 'Field1',
              'dataField': 'Field1',
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'groupIndex': 0,
              'groupName': 'Group1',
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': undefined
            }, {
              'area': 'column',
              'areaIndex': 0,
              'caption': 'Field2',
              'dataField': 'Field2',
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'groupIndex': 1,
              'groupName': 'Group1',
              'sortBy': undefined,
              'sortBySummaryField': undefined,
              'sortBySummaryPath': undefined,
              'sortOrder': undefined
            }],
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': 'Field1',
            'dataField': 'Field1',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'groupIndex': 0,
            'groupName': 'Group1',
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': 'column',
            'areaIndex': 0,
            'caption': 'Field2',
            'dataField': 'Field2',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'groupIndex': 1,
            'groupName': 'Group1',
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': 'row',
            'areaIndex': 0,
            'caption': 'Field3',
            'dataField': 'Field3',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': undefined,
            'areaIndex': undefined,
            'caption': 'Field4',
            'dataField': 'Field4',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined
          }, {
            'area': 'data',
            'areaIndex': 0,
            'caption': 'Field5 (Sum)',
            'dataField': 'Field5',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            'summaryType': 'sum'
          }, {
            'area': undefined,
            'areaIndex': undefined,
            'caption': 'Count',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            'summaryType': 'count'
          }, {
            'area': 'data',
            'areaIndex': 1,
            'caption': 'Field5 (Avg)',
            'dataField': 'Field5',
            'expanded': undefined,
            'filterType': undefined,
            'filterValues': undefined,
            'sortBy': undefined,
            'sortBySummaryField': undefined,
            'sortBySummaryPath': undefined,
            'sortOrder': undefined,
            'summaryType': 'avg'
          }]);
        });
        QUnit.test('groupIndex should be assinged to group field with groupInterval (T892304)', function(assert) {
          this.testStore.load.returns($.Deferred());
          var dataSource = createDataSource({
            fields: [{
              groupName: 'date',
              dataField: 'date',
              area: 'column',
              dataType: 'date'
            }, {
              groupName: 'date',
              groupInterval: 'year',
              groupIndex: 0
            }, {
              groupName: 'date',
              groupInterval: 'month',
              groupIndex: 1
            }, {
              groupName: 'date',
              groupInterval: 'day'
            }],
            store: this.testStore
          });
          var state = dataSource.state();
          dataSource.state(state);
          assert.equal(this.testStore.load.callCount, 2);
          assert.equal(dataSource.fields().length, 4, 'field count');
          assert.deepEqual(dataSource.fields()[0].levels.map(function(l) {
            return l.groupInterval;
          }), ['year', 'month', 'day'], 'group levels');
          assert.equal(dataSource.fields()[3].groupInterval, 'day', 'last field groupInterval');
          assert.equal(dataSource.fields()[3].groupIndex, 2, 'last field groupIndex');
        });
        QUnit.test('groupIndex should be assinged to all group field with groupInterval (T892304)', function(assert) {
          this.testStore.load.returns($.Deferred());
          var dataSource = createDataSource({
            fields: [{
              groupName: 'date',
              dataField: 'date',
              area: 'column',
              dataType: 'date'
            }, {
              groupName: 'date',
              groupInterval: 'year'
            }, {
              groupName: 'date',
              groupInterval: 'month'
            }, {
              groupName: 'date',
              groupInterval: 'day'
            }],
            store: this.testStore
          });
          var state = dataSource.state();
          dataSource.state(state);
          assert.equal(this.testStore.load.callCount, 2);
          assert.equal(dataSource.fields().length, 4, 'field count');
          assert.deepEqual(dataSource.fields()[0].levels.map(function(l) {
            return l.groupInterval;
          }), ['year', 'month', 'day'], 'group levels');
          assert.deepEqual(dataSource.fields().map(function(l) {
            return l.groupIndex;
          }), [undefined, 0, 1, 2], 'assigned groupIndexes');
        });
        QUnit.test('Set state if field with groupInterval and without groupIndex exists (T892304)', function(assert) {
          this.testStore.load.returns($.Deferred());
          var dataSource = createDataSource({
            fields: [{
              groupName: 'date',
              dataField: 'date',
              area: 'column',
              dataType: 'date'
            }, {
              groupName: 'date',
              groupInterval: 'year',
              groupIndex: 0
            }, {
              groupName: 'date',
              groupInterval: 'month',
              groupIndex: 1
            }, {
              groupName: 'date',
              groupInterval: 'day',
              visible: false
            }],
            store: this.testStore
          });
          var state = dataSource.state();
          dataSource.state(state);
          assert.equal(this.testStore.load.callCount, 2);
          assert.equal(dataSource.fields().length, 4, 'field count');
          assert.deepEqual(dataSource.fields()[0].levels.map(function(l) {
            return l.groupInterval;
          }), ['year', 'month'], 'group levels');
          assert.equal(dataSource.fields()[3].groupInterval, 'day', 'last field groupInterval');
          assert.equal(dataSource.fields()[3].groupIndex, 2, 'last field groupIndex');
        });
        QUnit.test('Set State state fields count less fields count', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0,
              sortOrder: 'asc'
            }, {
              dataField: 'Month',
              area: 'column',
              areaIndex: 1
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0,
              sortOrder: 'desc'
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)).concat([{
              dataField: 'Field1',
              filterValues: [1, 2],
              filterType: 'exclude'
            }, {dataField: 'SubCategory'}, {
              dataField: 'Day',
              sortBy: 'value'
            }]),
            store: this.testStore
          });
          def.resolve({
            columns: [{
              value: 'Cat1',
              index: 1
            }, {
              value: 'Cat2',
              index: 2
            }],
            rows: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 5
            }, {
              value: '2007',
              index: 5
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          this.testStore.load.reset();
          dataSource.state({
            rowExpandedPaths: [['2005'], ['2005', 'January'], ['2007']],
            columnExpandedPaths: [['Cat2']],
            fields: [{
              'area': 'row',
              'areaIndex': 0,
              'expanded': undefined,
              'filterType': undefined,
              'filterValues': undefined,
              'sortBy': undefined,
              'sortBySummaryField': '[Measures].[Customer Count]',
              'sortBySummaryPath': ['sortPath'],
              'sortOrder': 'asc'
            }]
          });
          assert.ok(this.testStore.load.calledOnce);
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [['2005'], ['2005', 'January'], ['2007']]);
          assert.deepEqual(this.testStore.load.lastCall.args[0].columnExpandedPaths, [['Cat2']]);
          assert.strictEqual(dataSource.fields().length, 7);
        });
        QUnit.test('Set State without fields', function(assert) {
          var def = $.Deferred();
          this.testStore.load.returns(def);
          var descriptions = {
            columns: [{
              dataField: 'Category',
              area: 'column',
              areaIndex: 0,
              sortOrder: 'asc'
            }, {
              dataField: 'Month',
              area: 'column',
              areaIndex: 1
            }],
            rows: [{
              dataField: 'Year',
              area: 'row',
              areaIndex: 0,
              sortOrder: 'desc'
            }],
            values: [{
              dataField: '[Measures].[Customer Count]',
              caption: 'Count',
              area: 'data',
              areaIndex: 0
            }]
          };
          var dataSource = createDataSource({
            fields: descriptions.rows.concat(descriptions.values.concat(descriptions.columns)).concat([{
              dataField: 'Field1',
              filterValues: [1, 2],
              filterType: 'exclude'
            }, {dataField: 'SubCategory'}, {
              dataField: 'Day',
              sortBy: 'value'
            }]),
            store: this.testStore
          });
          def.resolve({
            columns: [{
              value: 'Cat1',
              index: 1
            }, {
              value: 'Cat2',
              index: 2
            }],
            rows: [{
              value: '2005',
              index: 1
            }, {
              value: '2006',
              index: 5
            }, {
              value: '2007',
              index: 5
            }],
            values: [[[1], [2], [3], [4], [5]], [[6], [7], [8], [9], [10]], [[11], [12], [13], [14], [15]]],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
          this.testStore.load.reset();
          dataSource.state({
            rowExpandedPaths: [['2005'], ['2005', 'January'], ['2007']],
            columnExpandedPaths: [['Cat2']]
          });
          assert.ok(this.testStore.load.calledOnce);
          assert.deepEqual(this.testStore.load.lastCall.args[0].rowExpandedPaths, [['2005'], ['2005', 'January'], ['2007']]);
          assert.deepEqual(this.testStore.load.lastCall.args[0].columnExpandedPaths, [['Cat2']]);
          assert.strictEqual(dataSource.fields().length, 7);
        });
        QUnit.test('set state when store fields not loaded', function(assert) {
          var retrieveFieldsDef = $.Deferred();
          var fieldsPrepared = sinon.stub();
          this.testStore.getFields.returns(retrieveFieldsDef);
          var dataSource = new PivotGridDataSource({
            fields: [],
            store: this.testStore,
            retrieveFields: true
          });
          dataSource.on('fieldsPrepared', fieldsPrepared);
          dataSource.state({
            rowExpandedPaths: [],
            columnExpandedPaths: [],
            fields: [{
              area: 'row',
              dataField: 'Category'
            }, {
              area: 'column',
              dataField: 'Year'
            }]
          });
          assert.ok(dataSource.isLoading(), 'dataSource loads fields');
          retrieveFieldsDef.resolve([{dataField: 'Category'}, {dataField: 'Year'}]);
          assert.ok(fieldsPrepared.calledOnce);
          assert.strictEqual(fieldsPrepared.lastCall.args[0].length, 2);
          assert.ok(this.testStore.load.calledOnce);
          assert.deepEqual(this.testStore.load.lastCall.args[0].columns, [dataSource.field('Year')]);
          assert.deepEqual(this.testStore.load.lastCall.args[0].rows, [dataSource.field('Category')]);
          assert.ok(!dataSource.isLoading());
        });
        QUnit.test('Set default state', function(assert) {
          var dataSource = new PivotGridDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'row'
            }, {
              dataField: 'Field2',
              area: 'column',
              sortOrder: 'asc'
            }],
            store: this.testStore
          });
          dataSource.field('Field1', {
            area: 'column',
            sortOrder: 'desc'
          });
          dataSource.field('Field2', {area: undefined});
          this.testStore.load.reset();
          dataSource.state(null);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            area: 'row',
            areaIndex: 0,
            dataField: 'Field1',
            caption: 'Field1',
            sortOrder: undefined
          }, {
            area: 'column',
            areaIndex: 0,
            dataField: 'Field2',
            caption: 'Field2',
            sortOrder: 'asc'
          }]);
          assert.ok(this.testStore.load.calledOnce);
          var storeLoadArgs = this.testStore.load.lastCall.args[0];
          assert.deepEqual(storeLoadArgs, {
            columns: [dataSource.fields()[1]],
            rows: [dataSource.fields()[0]],
            filters: [],
            values: [],
            rowExpandedPaths: [],
            columnExpandedPaths: []
          });
        });
        QUnit.test('T388396. update auto generated caption if state is reset', function(assert) {
          var dataSource = new PivotGridDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'data',
              summaryType: 'sum'
            }],
            store: this.testStore
          });
          dataSource.field('Field1', {summaryType: 'count'});
          dataSource.state(null);
          assert.deepEqual(prepareFields(dataSource.fields()), [{
            area: 'data',
            areaIndex: 0,
            dataField: 'Field1',
            caption: 'Field1 (Sum)',
            summaryType: 'sum'
          }]);
        });
        QUnit.test('reset expanded paths', function(assert) {
          this.testStore.load.returns($.Deferred().resolve({
            rows: [{
              value: '1',
              children: [{value: '11'}]
            }],
            columns: [{
              value: '2',
              children: [{value: '22'}]
            }],
            values: []
          }));
          var dataSource = new PivotGridDataSource({
            fields: [{
              dataField: 'Field1',
              area: 'row'
            }, {
              dataField: 'Field2',
              area: 'row'
            }, {
              dataField: 'Field1',
              area: 'column'
            }, {
              dataField: 'Field2',
              area: 'column'
            }],
            store: this.testStore
          });
          dataSource.load();
          this.testStore.load.reset();
          dataSource.state(null);
          prepareFields(dataSource.fields());
          assert.ok(this.testStore.load.calledOnce);
          var storeLoadArgs = this.testStore.load.lastCall.args[0];
          assert.deepEqual(storeLoadArgs.rowExpandedPaths, []);
          assert.deepEqual(storeLoadArgs.columnExpandedPaths, []);
        });
      });
      QUnit.module('Stores', function() {
        QUnit.test('All stores implement correct interface', function(assert) {
          var methods = ['load', 'key', 'createDrillDownDataSource', 'getFields', 'filter'];
          $.each([XmlaStore, LocalStore, RemoteStore], function(i, Store) {
            var store = new Store({});
            $.each(methods, function(_, methodName) {
              assert.equal($traceurRuntime.typeof(store[methodName]), 'function', i + ' Store should implement ' + methodName);
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/array_store","data/custom_store","core/utils/inflector","__internal/grids/pivot_grid/data_source/module","__internal/grids/pivot_grid/summary_display_modes/module","__internal/grids/pivot_grid/xmla_store/module","__internal/grids/pivot_grid/local_store/module","__internal/grids/pivot_grid/remote_store/module","__internal/grids/pivot_grid/module_widget_utils","../../helpers/executeAsyncMock.js","../../content/orders.js","../../helpers/pivotGridTestSettings.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/array_store"), require("data/custom_store"), require("core/utils/inflector"), require("__internal/grids/pivot_grid/data_source/module"), require("__internal/grids/pivot_grid/summary_display_modes/module"), require("__internal/grids/pivot_grid/xmla_store/module"), require("__internal/grids/pivot_grid/local_store/module"), require("__internal/grids/pivot_grid/remote_store/module"), require("__internal/grids/pivot_grid/module_widget_utils"), require("../../helpers/executeAsyncMock.js"), require("../../content/orders.js"), require("../../helpers/pivotGridTestSettings.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataSource_bundled.tests.js.map