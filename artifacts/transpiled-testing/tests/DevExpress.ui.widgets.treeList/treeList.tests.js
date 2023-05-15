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

(["testing/tests/DevExpress.ui.widgets.treeList/treeList.tests.js"], ["generic_light.css!","jquery","core/utils/common","core/utils/shadow_dom","core/devices","core/utils/size","animation/fx","data/data_source/data_source","../../helpers/wrappers/dataGridWrappers.js","data/array_store","ui/tree_list/ui.tree_list","../../helpers/pointerMock.js","../../helpers/grid/keyboardNavigationHelper.js","events/utils/index"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/treeList.tests.js", ["generic_light.css!", "jquery", "core/utils/common", "core/utils/shadow_dom", "core/devices", "core/utils/size", "animation/fx", "data/data_source/data_source", "../../helpers/wrappers/dataGridWrappers.js", "data/array_store", "ui/tree_list/ui.tree_list", "../../helpers/pointerMock.js", "../../helpers/grid/keyboardNavigationHelper.js", "events/utils/index"], function($__export) {
  "use strict";
  var $,
      noop,
      addShadowDomStyles,
      devices,
      getOuterHeight,
      fx,
      DataSource,
      TreeListWrapper,
      ArrayStore,
      TreeList,
      pointerMock,
      CLICK_EVENT,
      createEvent,
      defaultModuleConfig,
      createTreeList,
      generateData,
      treeListWrapper;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      TreeListWrapper = $__m.TreeListWrapper;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      TreeList = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
    }, function($__m) {
      createEvent = $__m.createEvent;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<!--qunit-fixture-->\
    <div id="container">\
        <div id="treeList">\
        </div>\
    </div>\
';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      fx.off = true;
      defaultModuleConfig = {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      createTreeList = function(options) {
        var treeListElement = $('#treeList').dxTreeList(options);
        QUnit.assert.ok(treeListElement);
        var treeList = treeListElement.dxTreeList('instance');
        return treeList;
      };
      generateData = function(count) {
        var i = 1;
        var result = [];
        while (i < count * 2) {
          result.push({
            id: i,
            parentId: 0
          }, {
            id: i + 1,
            parentId: i
          });
          i += 2;
        }
        return result;
      };
      treeListWrapper = new TreeListWrapper('#container');
      QUnit.module('Initialization', defaultModuleConfig, function() {
        QUnit.test('Empty options', function(assert) {
          var treeList = createTreeList({});
          var $treeListElement = $(treeList.$element());
          var $noDataElement = $treeListElement.find('.dx-treelist-nodata');
          assert.ok(treeList);
          assert.ok($treeListElement.hasClass('dx-treelist'), 'widget class on the root element');
          assert.ok($noDataElement.length, 'widget have a \'no data\' element');
          assert.ok($noDataElement.is(':visible'), '\'No data\' element is visible');
          assert.ok($treeListElement.children().hasClass('dx-treelist-container'), 'container class on the child');
        });
        QUnit.test('Sorting should be applied on header cell click', function(assert) {
          var treeList = createTreeList({
            columns: ['name', 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          var $headerCell = $(treeList.$element().find('.dx-header-row td').first());
          $($headerCell).trigger('dxclick');
          this.clock.tick(10);
          var $dataRows = $(treeList.$element().find('.dx-data-row'));
          assert.equal($dataRows.eq(0).children().eq(0).text(), 'Name 1', 'row 0 is sorted');
          assert.equal($dataRows.eq(1).children().eq(0).text(), 'Name 2', 'row 1 is sorted');
          assert.equal($dataRows.eq(2).children().eq(0).text(), 'Name 3', 'row 2 is sorted');
          assert.equal(treeList.$element().find('.dx-sort-up').length, 1, 'one sort up indicator');
          assert.equal(treeList.$element().find('.dx-header-row td').first().find('.dx-sort-up').length, 1, 'sort indicator is rendered in first cell');
        });
        QUnit.test('Fixed column should be rendered in separate table', function(assert) {
          var treeList = createTreeList({
            columns: [{
              dataField: 'name',
              fixed: true
            }, 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }]
          });
          this.clock.tick(10);
          var $rowElement = $(treeList.getRowElement(0));
          assert.equal($rowElement.length, 2, 'two row elements for one row');
          assert.notEqual($rowElement.eq(0).closest('table').get(0), $rowElement.eq(1).closest('table').get(0), 'row elements are in different tables');
        });
        QUnit.test('Resize columns', function(assert) {
          var treeList = createTreeList({
            width: 400,
            allowColumnResizing: true,
            loadingTimeout: null,
            dataSource: [{
              id: 1,
              firstName: 'Dmitriy',
              lastName: 'Semenov',
              room: 101,
              birthDay: '1992/08/06'
            }],
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
          var resizeController = treeList.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 1};
          resizeController._setupResizingInfo(-9800);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9750,
              preventDefault: noop
            }});
          var headersCols = $('.dx-treelist-headers col');
          var rowsCols = $('.dx-treelist-rowsview col');
          assert.equal($(headersCols[1]).css('width'), '150px', 'width of two column - headers view');
          assert.equal($(headersCols[2]).css('width'), '50px', 'width of three column - headers view');
          assert.equal($(rowsCols[1]).css('width'), '150px', 'width of two column - rows view');
          assert.equal($(rowsCols[2]).css('width'), '50px', 'width of three column - rows view');
        });
        QUnit.test('Reordering column', function(assert) {
          var treeList = createTreeList({
            allowColumnReordering: true,
            loadingTimeout: null,
            dataSource: [{
              id: 1,
              firstName: '1',
              lastName: '2',
              room: '3',
              birthDay: '4'
            }],
            columns: ['firstName', 'lastName', 'room', 'birthDay']
          });
          var columnController = treeList.getController('columns');
          columnController.moveColumn(0, 3);
          var $cellElement = $('#treeList').find('.dx-treelist-rowsview').find('.dx-data-row > td').first();
          var $iconContainer = $('#treeList').find('.dx-treelist-rowsview').find('.dx-treelist-icon-container');
          assert.equal($iconContainer.length, 1, 'count expand icon');
          assert.equal($cellElement.children('.dx-treelist-icon-container').length, 1, 'first cell have expand icon');
          assert.equal($cellElement.text(), '2', 'first cell value');
        });
        QUnit.test('Columns hiding - columnHidingEnabled is true', function(assert) {
          var $cellElement;
          var treeList = createTreeList({
            width: 200,
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              firstName: 'Blablablablablablablablablabla',
              lastName: 'Psy'
            }],
            columns: ['firstName', 'lastName']
          });
          $cellElement = $(treeList.$element().find('.dx-header-row > td'));
          assert.equal($cellElement.length, 3, 'count cell');
          assert.equal($cellElement.eq(0).text(), 'First Name', 'caption of the first cell');
          assert.notOk($cellElement.eq(0).hasClass('dx-treelist-hidden-column'), 'first cell is visible');
          assert.ok($cellElement.eq(1).hasClass('dx-treelist-hidden-column'), 'second cell is hidden');
          assert.notOk($cellElement.eq(2).hasClass('dx-command-adaptive-hidden'), 'adaptive cell is visible');
          this.clock.tick(300);
          treeList.option('width', 800);
          $cellElement = $(treeList.$element().find('.dx-header-row > td'));
          assert.equal($cellElement.length, 3, 'count cell');
          assert.equal($cellElement.eq(0).text(), 'First Name', 'caption of the first cell');
          assert.notOk($cellElement.eq(0).hasClass('dx-treelist-hidden-column'), 'first cell is visible');
          assert.equal($cellElement.eq(1).text(), 'Last Name', 'caption of the second cell');
          assert.notOk($cellElement.eq(1).hasClass('dx-treelist-hidden-column'), 'second cell is visible');
          assert.ok($cellElement.eq(2).hasClass('dx-command-adaptive-hidden'), 'adaptive cell is hidden');
        });
        QUnit.test('Height rows view', function(assert) {
          var treeList = createTreeList({
            height: 200,
            showColumnHeaders: false,
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              name: 'Name 1',
              age: 10
            }, {
              id: 2,
              name: 'Name 2',
              age: 11
            }, {
              id: 3,
              name: 'Name 3',
              age: 12
            }, {
              id: 4,
              name: 'Name 4',
              age: 13
            }, {
              id: 5,
              name: 'Name 5',
              age: 14
            }, {
              id: 6,
              name: 'Name 6',
              age: 15
            }, {
              id: 7,
              name: 'Name 7',
              age: 16
            }]
          });
          assert.equal(getOuterHeight(treeList.$element().find('.dx-treelist-rowsview')), 200, 'height rows view');
        });
        QUnit.test('Virtual scrolling enabled by default and should render two virtual rows', function(assert) {
          var treeList = createTreeList({
            height: 50,
            paging: {
              pageSize: 2,
              pageIndex: 1
            },
            columns: ['name', 'age'],
            scrolling: {
              useNative: false,
              prerenderedRowCount: 0
            },
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 2',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 3',
              age: 18
            }, {
              id: 4,
              parentId: 0,
              name: 'Name 4',
              age: 18
            }, {
              id: 5,
              parentId: 0,
              name: 'Name 5',
              age: 18
            }, {
              id: 6,
              parentId: 0,
              name: 'Name 6',
              age: 18
            }, {
              id: 7,
              parentId: 0,
              name: 'Name 7',
              age: 18
            }, {
              id: 8,
              parentId: 0,
              name: 'Name 8',
              age: 18
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.option('scrolling.mode'), 'virtual', 'scrolling mode is virtual');
          var $rowsViewTables = $(treeList.$element().find('.dx-treelist-rowsview table'));
          assert.equal($rowsViewTables.length, 1, 'one table are rendered');
          assert.equal($rowsViewTables.eq(0).find('.dx-data-row').length, 1, 'data rows in table');
          assert.equal($rowsViewTables.eq(0).find('.dx-virtual-row').length, 2, 'two virtual rows in table');
          assert.equal($rowsViewTables.eq(0).find('.dx-freespace-row').length, 1, 'one freespace row in table');
        });
        QUnit.testInActiveWindow('Ctrl + left/right keys should collapse/expand row', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var treeList = createTreeList({
            columns: ['name', 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 2',
              age: 19
            }, {
              id: 3,
              parentId: 2,
              name: 'Name 3',
              age: 18
            }]
          });
          var navigationController = treeList.getController('keyboardNavigation');
          this.clock.tick(10);
          treeList.focus($(treeList.getCellElement(1, 0)));
          this.clock.tick(10);
          navigationController._keyDownHandler({
            keyName: 'rightArrow',
            key: 'ArrowRight',
            ctrl: true,
            originalEvent: $.Event('keydown', {
              target: treeList.getCellElement(1, 0),
              ctrlKey: true
            })
          });
          this.clock.tick(10);
          assert.ok(treeList.isRowExpanded(2), 'second row is expanded');
          navigationController._keyDownHandler({
            keyName: 'leftArrow',
            key: 'ArrowLeft',
            ctrl: true,
            originalEvent: $.Event('keydown', {
              target: treeList.getCellElement(1, 0),
              ctrlKey: true
            })
          });
          this.clock.tick(10);
          assert.notOk(treeList.isRowExpanded(2), 'second row is collapsed');
        });
        QUnit.testInActiveWindow('Row should be selected via space key press on check box', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var treeList = createTreeList({
            columns: ['name', 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 19
            }],
            selection: {
              mode: 'multiple',
              recursive: true
            },
            expandedRowKeys: [1]
          });
          this.clock.tick(10);
          var $target = $(treeList.getCellElement(1, 0)).find('.dx-select-checkbox');
          treeList.focus($target.get(0));
          this.clock.tick(10);
          $target.trigger(createEvent('keydown', {
            target: $target.get(0),
            key: ' '
          }));
          this.clock.tick(10);
          var $checkBoxes = treeList.$element().find('.dx-select-checkbox');
          for (var i = 0; i < $checkBoxes.length; i++) {
            assert.equal($checkBoxes.eq(i).attr('aria-checked'), 'true', 'checkbox is checked');
          }
          assert.deepEqual(treeList.getSelectedRowKeys(), [2], 'row was selected');
        });
        QUnit.testInActiveWindow('Row should not be selected after click on expand icon', function(assert) {
          var treeList = createTreeList({
            columns: ['name', 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 19
            }],
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          $('.dx-treelist-collapsed').trigger('dxclick');
          this.clock.tick(10);
          var $checkBoxes = treeList.$element().find('.dx-select-checkbox');
          for (var i = 0; i < $checkBoxes.length; i++) {
            assert.equal($checkBoxes.eq(i).attr('aria-checked'), 'false', 'checkbox is checked');
          }
          assert.deepEqual(treeList.getSelectedRowKeys(), [], 'row was not selected');
        });
        QUnit.test('Filter Row', function(assert) {
          var treeList = createTreeList({
            filterRow: {visible: true},
            columns: ['name', {
              dataField: 'age',
              filterValue: 19
            }],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 2, 'two filtered rows are rendered');
          assert.equal(treeList.$element().find('.dx-treelist-filter-row').length, 1, 'filter row is rendered');
        });
        QUnit.test('Filter menu items should have icons', function(assert) {
          var treeList = createTreeList({
            filterRow: {visible: true},
            columns: ['name', {
              dataField: 'age',
              filterValue: 19
            }],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          var $filterMenuElement = $(treeList.$element().find('.dx-treelist-filter-row').find('.dx-menu').first().find('.dx-menu-item'));
          $($filterMenuElement).trigger('dxclick');
          var $menuItemElements = $('.dx-overlay-wrapper').find('.dx-menu-item');
          assert.ok($menuItemElements.length > 0, 'has filter menu items');
          assert.equal($menuItemElements.first().find('.dx-icon').css('fontFamily'), 'DXIcons', 'first item has icon');
        });
        QUnit.test('Header Filter', function(assert) {
          var treeList = createTreeList({
            headerFilter: {visible: true},
            columns: ['name', {
              dataField: 'age',
              filterValues: [19]
            }],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 2, 'two filtered rows are rendered');
          assert.equal(treeList.$element().find('.dx-header-filter').length, 2, 'two header filter icons area rendered');
        });
        QUnit.test('Expanding of all items should work correctly after clearing filter', function(assert) {
          var treeList = createTreeList({
            headerFilter: {visible: true},
            autoExpandAll: true,
            columns: ['name', {
              dataField: 'age',
              filterValues: [19],
              allowFiltering: true
            }, 'gender'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19,
              gender: 'male'
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 1',
              age: 19,
              gender: 'female'
            }, {
              id: 3,
              parentId: 1,
              name: 'Name 2',
              age: 18,
              gender: 'male'
            }, {
              id: 4,
              parentId: 2,
              name: 'Name 4',
              age: 19,
              gender: 'male'
            }, {
              id: 5,
              parentId: 2,
              name: 'Name 5',
              age: 20,
              gender: 'female'
            }, {
              id: 6,
              parentId: 3,
              name: 'Name 6',
              age: 18,
              gender: 'male'
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 3, 'filtered rows are rendered');
          treeList.filter('gender', '=', 'male');
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 3, 'filtered rows are rendered');
          treeList.clearFilter();
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 6, 'six filtered rows are rendered');
        });
        QUnit.test('Items should be collapsed after clearing filter, autoExpandAll = false', function(assert) {
          var treeList = createTreeList({
            headerFilter: {visible: true},
            autoExpandAll: false,
            columns: ['name', {
              dataField: 'age',
              filterValues: [19],
              allowFiltering: true
            }],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 2,
              name: 'Name 2',
              age: 18
            }, {
              id: 4,
              parentId: 0,
              name: 'Name 4',
              age: 19
            }, {
              id: 5,
              parentId: 4,
              name: 'Name 5',
              age: 20
            }, {
              id: 6,
              parentId: 5,
              name: 'Name 6',
              age: 18
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 3, 'filtered rows are rendered');
          treeList.clearFilter();
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-data-row').length, 2, 'two rows are rendered');
        });
        QUnit.test('Search Panel', function(assert) {
          var treeList = createTreeList({
            columns: ['name', 'age'],
            searchPanel: {
              visible: true,
              text: 'Name 1'
            },
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          var $element = treeList.$element();
          var $searchBox = $element.find('.dx-toolbar .dx-searchbox');
          assert.equal($element.find('.dx-data-row').length, 1, 'one filtered row is rendered');
          assert.equal($searchBox.length, 1, 'searchPanel is rendered');
          assert.equal($searchBox.dxTextBox('instance').option('value'), 'Name 1', 'searchPanel text is applied');
          assert.equal($searchBox.find('input').attr('aria-label'), 'Search in the tree list', 'aria-label');
        });
        QUnit.test('Selectable treeList should have right default options', function(assert) {
          var treeList = createTreeList({
            columns: ['name', 'age'],
            selection: {mode: 'multiple'},
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }, {
              id: 2,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 3,
              parentId: 0,
              name: 'Name 2',
              age: 18
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.option('selection.showCheckBoxesMode'), 'always', 'showCheckBoxesMode is always');
        });
        QUnit.test('Click on selectCheckBox shouldn\'t render editor, editing & selection', function(assert) {
          createTreeList({
            columns: ['name', 'age'],
            selection: {mode: 'multiple'},
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }]
          });
          this.clock.tick(10);
          var $selectCheckbox = $('#treeList').find('.dx-treelist-cell-expandable').eq(0).find('.dx-select-checkbox').eq(0);
          $($selectCheckbox).trigger('dxclick');
          this.clock.tick(10);
          assert.notOk($('#treeList').find('.dx-texteditor').length, 'Editing textEditor wasn\'t rendered');
        });
        QUnit.test('Assign new values using the promise parameter in the onInitNewRow', function(assert) {
          var visibleRows;
          var rowData = {room: 42};
          var treeList = createTreeList({
            editing: {
              allowAdding: true,
              mode: 'row'
            },
            dataSource: [],
            columns: ['room'],
            onInitNewRow: function(e) {
              e.promise = $.Deferred();
              setTimeout(function() {
                e.data = rowData;
                e.promise.resolve();
              }, 500);
            }
          });
          treeList.addRow();
          visibleRows = treeList.getVisibleRows();
          assert.equal(visibleRows.length, 0);
          this.clock.tick(500);
          treeList.saveEditData();
          this.clock.tick(10);
          visibleRows = treeList.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'row was added');
          assert.deepEqual(visibleRows[0].data, rowData, 'row data');
        });
        QUnit.test('Selection checkbox should be rendered if first column is lookup', function(assert) {
          var treeList = createTreeList({
            columns: [{
              dataField: 'nameId',
              lookup: {
                dataSource: [{
                  id: 1,
                  name: 'Name 1'
                }],
                valueExpr: 'id',
                displayExpr: 'name'
              }
            }, 'age'],
            selection: {mode: 'multiple'},
            dataSource: [{
              id: 1,
              parentId: 0,
              nameId: 1,
              age: 19
            }]
          });
          this.clock.tick(10);
          var $firstDataCell = $(treeList.getCellElement(0, 0));
          assert.equal($firstDataCell.find('.dx-select-checkbox.dx-checkbox').length, 1, 'first cell contains select checkbox');
          assert.equal($firstDataCell.find('.dx-treelist-text-content').text(), 'Name 1', 'first cell text');
        });
        QUnit.test('Filter row should not contains selection checkboxes', function(assert) {
          createTreeList({
            columns: ['name', 'age'],
            selection: {mode: 'multiple'},
            filterRow: {visible: true},
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 3',
              age: 19
            }]
          });
          this.clock.tick(10);
          assert.equal($('#treeList').find('.dx-treelist-filter-row').length, 1, 'filter row is rendered');
          assert.equal($('#treeList').find('.dx-checkbox').length, 2, 'selection chebkboxes are rendered');
          assert.equal($('#treeList').find('.dx-treelist-filter-row .dx-checkbox').length, 0, 'no selection chebkboxes in filter row');
        });
        QUnit.test('Aria accessibility', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 19
            }, {
              id: 3,
              parentId: 2,
              name: 'Name 3',
              age: 18
            }, {
              id: 4,
              parentId: 0,
              name: 'Name 4',
              age: 18
            }],
            expandedRowKeys: [1]
          });
          this.clock.tick(10);
          var $treeList = $(treeList.$element());
          assert.equal($treeList.find('.dx-gridbase-container').attr('role'), 'treegrid', 'treeList base container - value of \'role\' attribute');
          var $headerTable = $treeList.find('.dx-treelist-headers table').first();
          assert.equal($headerTable.attr('role'), 'presentation', 'header table - value of \'role\' attribute');
          var $dataTable = $treeList.find('.dx-treelist-rowsview table').first();
          assert.equal($dataTable.attr('role'), 'presentation', 'data table - value of \'role\' attribute');
          var $dataRows = $dataTable.find('.dx-data-row');
          assert.equal($dataRows.eq(0).attr('aria-expanded'), 'true', 'first data row - value of \'aria-expanded\' attribute');
          assert.equal($dataRows.eq(0).attr('aria-level'), '1', 'first data row - value of \'aria-level\' attribute');
          assert.equal($dataRows.eq(1).attr('aria-expanded'), 'false', 'second data row - value of \'aria-expanded\' attribute');
          assert.equal($dataRows.eq(1).attr('aria-level'), '2', 'second data row - value of \'aria-level\' attribute');
          assert.equal($dataRows.eq(2).attr('aria-expanded'), undefined, 'third data row hasn\'t the \'aria-expanded\' attribute');
          assert.equal($dataRows.eq(2).attr('aria-level'), '1', 'third data row - value of \'aria-level\' attribute');
        });
        QUnit.test('Command buttons should contains aria-label accessibility attribute if rendered as icons (T755185)', function(assert) {
          var columnsWrapper = treeListWrapper.columns;
          var clock = sinon.useFakeTimers();
          var treeList = createTreeList({
            dataSource: [{
              id: 0,
              parentId: -1,
              c0: 'c0'
            }, {
              id: 1,
              parentId: 0,
              c0: 'c1'
            }],
            columns: [{
              type: 'buttons',
              buttons: ['add', 'edit', 'delete', 'save', 'cancel']
            }, 'id'],
            editing: {
              allowUpdating: true,
              allowDeleting: true,
              useIcons: true
            }
          });
          clock.tick(10);
          columnsWrapper.getCommandButtons().each(function(_, button) {
            var ariaLabel = $(button).attr('aria-label');
            assert.ok(ariaLabel && ariaLabel.length, ("aria-label '" + ariaLabel + "'"));
          });
          treeList.editRow(0);
          columnsWrapper.getCommandButtons().each(function(_, button) {
            var ariaLabel = $(button).attr('aria-label');
            assert.ok(ariaLabel && ariaLabel.length, ("aria-label '" + ariaLabel + "'"));
          });
          clock.restore();
        });
        QUnit.test('Display context menu', function(assert) {
          var contextMenuItems = [{text: 'test'}];
          var treeList = createTreeList({
            dataSource: [{id: 1}],
            onContextMenuPreparing: function($event) {
              $event.items = contextMenuItems;
            }
          });
          this.clock.tick(10);
          var $cellElement = $(treeList.getCellElement(0, 0));
          $cellElement.trigger('contextmenu');
          var contextMenuInstance = treeList.getView('contextMenuView').element().dxContextMenu('instance');
          assert.ok(contextMenuInstance);
          assert.deepEqual(contextMenuInstance.option('items'), contextMenuItems);
        });
        QUnit.test('filterSyncEnabled is working in TreeList', function(assert) {
          var treeList = createTreeList({
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              allowHeaderFiltering: true,
              filterValues: [2]
            }]
          });
          treeList.columnOption('field', {filterValues: [2, 1]});
          assert.deepEqual(treeList.option('filterValue'), ['field', 'anyof', [2, 1]]);
        });
        QUnit.test('filterBulider is working in TreeList', function(assert) {
          var handlerInit = sinon.spy();
          var treeList = createTreeList({
            filterBuilder: {onInitialized: handlerInit},
            columns: [{dataField: 'field'}]
          });
          assert.equal(handlerInit.called, 0);
          treeList.option('filterBuilderPopup.visible', true);
          assert.equal(handlerInit.called, 1);
        });
        QUnit.test('Change filterPanel.visible to false', function(assert) {
          var treeList = createTreeList({
            dataSource: [],
            filterPanel: {visible: true},
            columns: [{dataField: 'field'}]
          });
          this.clock.tick(10);
          assert.ok(treeList.$element().find('.dx-treelist-filter-panel').is(':visible'), 'filter panel is visible');
          treeList.option('filterPanel.visible', false);
          assert.notOk(treeList.$element().find('.dx-treelist-filter-panel').is(':visible'), 'filter panel is hidden');
        });
        QUnit.test('TreeList with paging', function(assert) {
          var treeList = createTreeList({
            autoExpandAll: true,
            dataSource: generateData(5),
            paging: {pageSize: 5},
            pager: {
              visible: true,
              showPageSizeSelector: true,
              allowedPageSizes: [2, 5, 8]
            }
          });
          this.clock.tick(10);
          var $treeListElement = $(treeList.$element());
          assert.strictEqual($treeListElement.find('.dx-treelist-pager').length, 1, 'has pager');
          assert.strictEqual($treeListElement.find('.dx-page').length, 2, 'number of containers for page');
          assert.ok($treeListElement.find('.dx-page').first().hasClass('dx-selection'), 'current page - first');
          assert.strictEqual($treeListElement.find('.dx-page-size').length, 3, 'number of containers for page sizes');
        });
        QUnit.test('HeaderPanel should not have bottom border', function(assert) {
          var treeList = createTreeList({
            dataSource: [],
            columnChooser: {enabled: true},
            showBorders: true,
            columns: ['test']
          });
          this.clock.tick(10);
          var $treeList = $(treeList.$element());
          var $headerPanel = $treeList.find('.dx-treelist-header-panel');
          assert.equal($headerPanel.css('border-bottom-width'), '0px', 'bottom border width');
        });
        QUnit.test('No exceptions when a custom command button\'s template is defined', function(assert) {
          createTreeList({
            dataSource: [{
              id: 0,
              parentId: -1,
              c0: 'c0'
            }, {
              id: 1,
              parentId: 0,
              c0: 'c1'
            }],
            columns: [{
              type: 'buttons',
              buttons: [{template: function() {
                  return $('<span>test</span>');
                }}]
            }, 'id', 'c0']
          });
          this.clock.tick(100);
          assert.ok(true, 'not exception');
        });
      });
      QUnit.module('Option Changed', defaultModuleConfig, function() {
        QUnit.test('Change dataSource, selectedRowKeys and scrolling options together', function(assert) {
          var treeList = createTreeList({});
          this.clock.tick(30);
          treeList.option({
            dataSource: [{id: 1}],
            selectedRowKeys: [1],
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(30);
          assert.strictEqual(treeList.getVisibleRows().length, 1, 'row count');
        });
        QUnit.test('Change options and call selectRows', function(assert) {
          var createOptions = function() {
            return {
              dataSource: [{
                id: 1,
                text: 'Brazil'
              }, {
                id: 2,
                text: 'Spain'
              }, {
                id: 3,
                text: 'USA'
              }],
              selectedRowKeys: [1, 2, 3],
              selection: {
                mode: 'multiple',
                recursive: true
              },
              scrolling: {mode: 'virtual'}
            };
          };
          var treeList = createTreeList(createOptions());
          this.clock.tick(30);
          treeList.option(createOptions());
          treeList.selectRows([1, 2, 3]);
          this.clock.tick(30);
          assert.strictEqual(treeList.getSelectedRowsData().length, 3, 'selected rows');
        });
        QUnit.test('Pages should be correctly loaded after change dataSource and selectedRowKeys options', function(assert) {
          var treeList = createTreeList({
            height: 1500,
            autoExpandAll: true
          });
          this.clock.tick(300);
          treeList.option({
            dataSource: generateData(20),
            selectedRowKeys: [1]
          });
          this.clock.tick(10);
          assert.strictEqual(treeList.getVisibleRows().length, 40, 'row count');
        });
        QUnit.test('Change expandedRowKeys', function(assert) {
          var treeList = createTreeList({dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 16
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 17
            }, {
              id: 3,
              parentId: 2,
              name: 'Name 3',
              age: 18
            }]});
          this.clock.tick(30);
          assert.strictEqual(treeList.getVisibleRows().length, 1, 'row count');
          treeList.option('expandedRowKeys', [1, 2]);
          this.clock.tick(30);
          assert.strictEqual(treeList.getVisibleRows().length, 3, 'row count');
        });
        QUnit.test('TreeList with columnAutoWidth should be rendered', function(assert) {
          var treeList = createTreeList({
            columnAutoWidth: true,
            columns: ['name', 'age'],
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 19
            }]
          });
          this.clock.tick(10);
          assert.equal(treeList.$element().find('.dx-treelist-headers .dx-header-row').length, 1, 'header row is rendered');
          assert.equal(treeList.$element().find('.dx-treelist-rowsview .dx-data-row').length, 1, 'data row is rendered');
        });
        QUnit.test('Virtual columns', function(assert) {
          var columns = [];
          for (var i = 1; i <= 20; i++) {
            columns.push('field' + i);
          }
          var treeList = createTreeList({
            width: 200,
            columnWidth: 50,
            dataSource: [{}],
            columns: columns,
            scrolling: {columnRenderingMode: 'virtual'}
          });
          this.clock.tick(10);
          assert.equal(treeList.getVisibleColumns().length, 6, 'visible column count');
        });
        QUnit.test('Call getSelectedRowKeys with \'leavesOnly\' parameter and wrong selectedKeys after dataSource change', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              id: 1,
              field1: 'test1'
            }, {
              id: 2,
              parentId: 1,
              field1: 'test2'
            }, {
              id: 3,
              field1: 'test3'
            }],
            selection: {
              mode: 'multiple',
              recursive: true
            },
            selectedRowKeys: [1, 3]
          });
          this.clock.tick(30);
          treeList.option({dataSource: [{
              id: 1,
              field1: 'test1'
            }, {
              id: 2,
              parentId: 1,
              field1: 'test2'
            }]});
          assert.deepEqual(treeList.getSelectedRowKeys('leavesOnly'), [], 'dataSource is not loaded yet');
          this.clock.tick(30);
          assert.deepEqual(treeList.getSelectedRowKeys('leavesOnly'), [2], 'dataSource is reloaded');
        });
        QUnit.test('Highlight searchText in expandable column', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 16
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 17
            }, {
              id: 3,
              parentId: 2,
              name: 'Name',
              age: 18
            }],
            searchPanel: {text: '3'}
          });
          var searchTextSelector = '.dx-treelist-search-text';
          this.clock.tick(30);
          assert.equal(treeList.$element().find(searchTextSelector).length, 1);
        });
        QUnit.test('Change searchPanel.text', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              id: 1,
              parentId: 0,
              name: 'Name 1',
              age: 16
            }, {
              id: 2,
              parentId: 1,
              name: 'Name 2',
              age: 17
            }, {
              id: 3,
              parentId: 2,
              name: 'Name',
              age: 18
            }],
            searchPanel: {
              visible: true,
              text: '3'
            }
          });
          var searchPanelSelector = '.dx-treelist-search-panel';
          var $searchInput;
          this.clock.tick(30);
          $searchInput = treeList.$element().find(searchPanelSelector).find('input');
          assert.equal($searchInput.val(), '3', 'search text');
          treeList.option('searchPanel.text', 'new text');
          $searchInput = treeList.$element().find(searchPanelSelector).find('input');
          assert.equal($searchInput.val(), 'new text', 'search text');
        });
        ['standard', 'virual'].forEach(function(rowRenderingMode) {
          QUnit.test(("Modified expand state should be displayed correctly when repaintChangesOnly is true and scrolling.rowRenderingMode is " + rowRenderingMode), function(assert) {
            var data = generateData(2);
            var treeList = createTreeList({
              dataSource: data,
              autoExpandAll: true,
              repaintChangesOnly: true,
              scrolling: {rowRenderingMode: rowRenderingMode},
              columns: ['id']
            });
            this.clock.tick(30);
            data[1].parentId = data[3].id;
            treeList.option('dataSource', $traceurRuntime.spread(data));
            this.clock.tick(30);
            var $rowElements = $(treeList.element()).find('.dx-treelist-rowsview').find('.dx-data-row');
            assert.strictEqual($rowElements.length, 3, 'node count');
            assert.strictEqual($rowElements.eq(0).find('.dx-treelist-empty-space').length, 1, 'first node - first level');
            assert.strictEqual($rowElements.eq(0).children().first().text(), '1', 'first node - first cell text');
            assert.strictEqual($rowElements.eq(1).find('.dx-treelist-empty-space').length, 1, 'second node - first level');
            assert.strictEqual($rowElements.eq(1).children().first().text(), '3', 'second node - first cell text');
            assert.strictEqual($rowElements.eq(2).find('.dx-treelist-empty-space').length, 2, 'third node - second level');
            assert.strictEqual($rowElements.eq(2).children().first().text(), '4', 'third node - first cell text');
            assert.strictEqual($rowElements.eq(2).children().first().find('.dx-treelist-collapsed').length, 1, 'third node has an expand icon');
          });
        });
        QUnit.test('The select checkbox should be displayed after changing expand state when repaintChangesOnly is true', function(assert) {
          var data = generateData(2);
          var treeList = createTreeList({
            dataSource: data,
            autoExpandAll: true,
            repaintChangesOnly: true,
            selection: {mode: 'multiple'},
            columns: ['id']
          });
          this.clock.tick(30);
          data[1].parentId = data[3].id;
          treeList.option('dataSource', $traceurRuntime.spread(data));
          this.clock.tick(30);
          var $rowElements = $(treeList.element()).find('.dx-treelist-rowsview').find('.dx-data-row');
          assert.strictEqual($rowElements.length, 3, 'node count');
          assert.strictEqual($rowElements.eq(0).find('.dx-treelist-empty-space').length, 1, 'first node - first level');
          assert.strictEqual($rowElements.eq(0).children().first().text(), '1', 'first node - first cell text');
          assert.strictEqual($rowElements.eq(1).find('.dx-treelist-empty-space').length, 1, 'second node - first level');
          assert.strictEqual($rowElements.eq(1).children().first().text(), '3', 'second node - first cell text');
          assert.strictEqual($rowElements.eq(2).find('.dx-treelist-empty-space').length, 2, 'third node - second level');
          assert.strictEqual($rowElements.eq(2).children().first().text(), '4', 'third node - first cell text');
          var $expandIcon = $rowElements.eq(2).children().first().find('.dx-treelist-collapsed');
          assert.strictEqual($expandIcon.length, 1, 'third node has an expand icon');
          assert.ok($expandIcon.next().hasClass('dx-select-checkbox'), 'third node has a select checkbox');
        });
        QUnit.test('The child node position should be updated after changing dataSource when rowRenderingMode is "virtual" and repaintChangesOnly is true', function(assert) {
          var array = [{
            id: 1,
            parentId: 0,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }];
          var treeList = createTreeList({
            dataSource: array,
            autoExpandAll: true,
            loadingTimeout: null,
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            rootValue: 0,
            columns: ['field1', 'field2', 'field3'],
            repaintChangesOnly: true,
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            }
          });
          var rows = treeList.getVisibleRows();
          assert.strictEqual(rows[0].level, 0, 'level of the first node');
          assert.strictEqual(rows[1].level, 1, 'level of the second node');
          assert.strictEqual(rows[2].level, 2, 'level of the third node');
          array[2].parentId = 1;
          treeList.option('dataSource', array);
          rows = treeList.getVisibleRows();
          assert.strictEqual(rows[0].level, 0, 'level of the first node');
          assert.strictEqual(rows[1].level, 1, 'level of the second node');
          assert.strictEqual(rows[2].level, 1, 'level of the third node');
        });
      });
      QUnit.module('Expand/Collapse rows', function() {
        QUnit.test('Nodes should not be shifted after expanding node on last page', function(assert) {
          var clock = sinon.useFakeTimers();
          var treeList = createTreeList({
            height: 120,
            loadingTimeout: null,
            paging: {
              enabled: true,
              pageSize: 2
            },
            scrolling: {
              mode: 'virtual',
              prerenderedRowCount: 0
            },
            expandedRowKeys: [1],
            dataSource: [{
              name: 'Category1',
              id: 1
            }, {
              name: 'SubCategory1',
              id: 2,
              parentId: 1
            }, {
              name: 'SubCategory2',
              id: 3,
              parentId: 1
            }, {
              name: 'Category2',
              id: 4
            }, {
              name: 'Category3',
              id: 5
            }, {
              name: 'Category4',
              id: 6
            }, {
              name: 'Category7',
              id: 7
            }, {
              name: 'Category5',
              id: 8
            }, {
              name: 'SubCategory3',
              id: 9,
              parentId: 8
            }, {
              name: 'SubCategory5',
              id: 12,
              parentId: 9
            }, {
              name: 'SubCategory4',
              id: 10,
              parentId: 8
            }, {
              name: 'Category6',
              id: 11
            }]
          });
          var scrollable = treeList.getScrollable();
          var isNativeScrolling = devices.real().deviceType !== 'desktop' || devices.real().mac;
          try {
            scrollable.scrollTo({y: 300});
            isNativeScrolling && $(scrollable.container()).trigger('scroll');
            clock.tick(10);
            var topVisibleRowData = treeList.getTopVisibleRowData();
            assert.strictEqual(treeList.pageIndex(), 3, 'page index');
            assert.strictEqual(treeList.pageCount(), 5, 'page count');
            treeList.expandRow(8);
            treeList.expandRow(9);
            assert.strictEqual(treeList.pageIndex(), 3, 'page index');
            assert.strictEqual(treeList.pageCount(), 6, 'page count');
            assert.deepEqual(treeList.getTopVisibleRowData(), topVisibleRowData, 'top visible row data has not changed');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('Scrollbar position must be kept after expanding node when the treelist container has max-height', function(assert) {
          $('#treeList').css('max-height', 400);
          var done = assert.async();
          var treeList = createTreeList({
            loadingTimeout: null,
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            dataSource: generateData(100)
          });
          treeList.getScrollable().scrollTo({y: 1000});
          setTimeout(function() {
            treeList.expandRow(69);
            setTimeout(function() {
              assert.ok($(treeList.element()).find('.dx-treelist-rowsview .dx-scrollbar-vertical > .dx-scrollable-scroll').position().top > 0, 'scrollbar position top');
              done();
            }, 310);
          });
        });
        QUnit.test('Expand row if repaintChangesOnly is true', function(assert) {
          var treeList = createTreeList({
            height: 120,
            loadingTimeout: null,
            repaintChangesOnly: true,
            dataSource: [{
              id: 1,
              name: 'node_1'
            }, {
              id: 2,
              name: 'node_1_1',
              parentId: 1
            }, {
              id: 3,
              name: 'node_1_2',
              parentId: 1
            }]
          });
          treeList.expandRow(1);
          assert.strictEqual(treeList.getVisibleRows()[0].isExpanded, true, 'first row has corrent isExpanded state');
          assert.strictEqual($(treeList.getRowElement(0)).find('.dx-treelist-expanded').length, 1, 'first row has expanded icon');
        });
        QUnit.test('Expand node after filtering when it has many children and they are selected', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var treeList = createTreeList({
              loadingTimeout: 30,
              height: 200,
              dataSource: {
                store: {
                  type: 'array',
                  data: [{
                    field1: 'test1',
                    items: [{field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}, {field1: 'test2'}]
                  }]
                },
                pageSize: 2
              },
              scrolling: {mode: 'virtual'},
              selection: {mode: 'multiple'},
              itemsExpr: 'items',
              dataStructure: 'tree',
              columns: [{
                dataField: 'field1',
                dataType: 'string',
                filterValues: ['test2']
              }],
              onContentReady: function(e) {
                e.component.selectRows([2, 3, 4, 5, 6, 7, 8, 9]);
              }
            });
            clock.tick(500);
            treeList.collapseRow(1);
            clock.tick(100);
            var items = treeList.getVisibleRows();
            assert.strictEqual(items.length, 1, 'row count');
            assert.notOk(treeList.isRowExpanded(1), 'first node is collapsed');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('The aria-expanded attribute should be changed on row expand when repaintChangesOnly is enabled (T993557)', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var treeList = createTreeList({
              loadingTimeout: 0,
              dataSource: {store: {
                  type: 'array',
                  key: 'id',
                  data: [{
                    id: 1,
                    name: 'test1',
                    parentId: -1
                  }, {
                    id: 2,
                    name: 'test2',
                    parentId: 1
                  }]
                }},
              rootValue: -1,
              repaintChangesOnly: true
            });
            clock.tick(10);
            var $rowElement = $(treeList.getRowElement(treeList.getRowIndexByKey(1)));
            assert.strictEqual($rowElement.attr('aria-expanded'), 'false', 'row is collapsed by default');
            treeList.expandRow(1);
            clock.tick(10);
            $rowElement = $(treeList.getRowElement(treeList.getRowIndexByKey(1)));
            assert.strictEqual($rowElement.attr('aria-expanded'), 'true', 'row is expanded after expandRow');
            treeList.collapseRow(1);
            clock.tick(10);
            $rowElement = $(treeList.getRowElement(treeList.getRowIndexByKey(1)));
            assert.strictEqual($rowElement.attr('aria-expanded'), 'false', 'row is collapsed after collapseRow');
          } finally {
            clock.restore();
          }
        });
      });
      QUnit.module('Focused Row', defaultModuleConfig, function() {
        QUnit.test('TreeList with focusedRowEnabled and focusedRowIndex 0', function(assert) {
          var treeList = createTreeList({
            dataSource: generateData(5),
            focusedRowEnabled: true,
            focusedRowIndex: 0
          });
          this.clock.tick(10);
          assert.ok($(treeList.getRowElement(0)).hasClass('dx-row-focused'), 'first row is focused');
        });
        QUnit.test('TreeList with focusedRowKey', function(assert) {
          var treeList = createTreeList({
            height: 105,
            keyExpr: 'id',
            dataSource: generateData(10),
            paging: {pageSize: 4},
            focusedRowEnabled: true,
            focusedRowKey: 12,
            scrolling: {prerenderedRowCount: 0}
          });
          this.clock.tick(10);
          assert.equal(treeList.pageIndex(), 1, 'page is changed');
          assert.deepEqual(treeList.option('expandedRowKeys'), [11], 'focus parent is expanded');
          assert.ok($(treeList.getRowElement(treeList.getRowIndexByKey(12))).hasClass('dx-row-focused'), 'focused row is visible');
        });
        QUnit.test('TreeList with remoteOperations and focusedRowKey', function(assert) {
          var treeList = createTreeList({
            height: 105,
            keyExpr: 'id',
            dataSource: generateData(10),
            remoteOperations: true,
            paging: {pageSize: 4},
            focusedRowEnabled: true,
            focusedRowKey: 12,
            scrolling: {prerenderedRowCount: 0}
          });
          this.clock.tick(10);
          assert.equal(treeList.pageIndex(), 1, 'page is changed');
          assert.deepEqual(treeList.option('expandedRowKeys'), [11], 'focus parent is expanded');
          assert.ok($(treeList.getRowElement(treeList.getRowIndexByKey(12))).hasClass('dx-row-focused'), 'focused row is visible');
        });
        QUnit.test('TreeList with remoteOperations(filtering, sorting, grouping) and focusedRowKey should not generate repeated node', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              'Task_ID': 1,
              'Task_Parent_ID': 0
            }, {
              'Task_ID': 3,
              'Task_Parent_ID': 1
            }, {
              'Task_ID': 4,
              'Task_Parent_ID': 2
            }, {
              'Task_ID': 5,
              'Task_Parent_ID': 3
            }],
            keyExpr: 'Task_ID',
            parentIdExpr: 'Task_Parent_ID',
            remoteOperations: {
              filtering: true,
              sorting: true,
              grouping: true
            },
            focusedRowEnabled: true,
            focusedRowKey: 5
          });
          this.clock.tick(10);
          var childrenNodes = treeList.getNodeByKey(1).children;
          assert.equal(childrenNodes.length, 1, 'children nodes count');
          assert.equal(childrenNodes[0].key, 3, 'children node key');
        });
        QUnit.testInActiveWindow('TreeList should focus the corresponding group row if group collapsed and inner data row was focused', function(assert) {
          var treeList = createTreeList({
            keyExpr: 'id',
            dataSource: generateData(10),
            focusedRowEnabled: true,
            expandedRowKeys: [3],
            focusedRowKey: 4
          });
          this.clock.tick(10);
          treeList.collapseRow(3);
          this.clock.tick(10);
          assert.equal(treeList.isRowExpanded(3), false, 'parent node collapsed');
          assert.equal(treeList.option('focusedRowKey'), 3, 'parent node focused');
        });
        QUnit.test('TreeList should focus only one focused row (T827201)', function(assert) {
          var rowsViewWrapper = treeListWrapper.rowsView;
          var treeList = createTreeList({
            keyExpr: 'id',
            dataSource: generateData(10),
            focusedRowEnabled: true,
            focusedRowKey: 3
          });
          this.clock.tick(10);
          var rowIndex = treeList.getRowIndexByKey(3);
          assert.ok(rowsViewWrapper.getDataRow(rowIndex).isFocusedRow(), 'Row 3 is a focused row');
          $(treeList.getCellElement(4, 1)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.notOk(rowsViewWrapper.getDataRow(rowIndex).isFocusedRow(), 'Row 3 is not a focused row');
          assert.ok(rowsViewWrapper.getDataRow(4).isFocusedRow(), 'Row 4 is a focused row');
        });
        QUnit.test('TreeList navigateTo', function(assert) {
          var treeList = createTreeList({
            height: 100,
            loadingTimeout: null,
            dataSource: generateData(10),
            paging: {pageSize: 4},
            scrolling: {useNative: false}
          });
          this.clock.tick(300);
          var callback = sinon.spy();
          var d = treeList.navigateToRow(12);
          d.done(callback);
          this.clock.tick(10);
          assert.strictEqual(d.state(), 'resolved', 'promise is resolved');
          assert.strictEqual(callback.getCall(0).args[0], 6, 'promise value is correct');
          assert.deepEqual(treeList.option('expandedRowKeys'), [11], 'parent node is expanded');
          assert.equal(treeList.pageIndex(), 1, 'page is changed');
          assert.ok(treeList.getRowIndexByKey(12) >= 0, 'key is visible');
        });
        QUnit.test('TreeList navigateTo to the same page with expand', function(assert) {
          var treeList = createTreeList({
            loadingTimeout: null,
            dataSource: generateData(10),
            paging: {pageSize: 4}
          });
          var callback = sinon.spy();
          this.clock.tick(10);
          var d = treeList.navigateToRow(2);
          d.done(callback);
          this.clock.tick(10);
          assert.strictEqual(d.state(), 'resolved', 'promise is resolved');
          assert.strictEqual(callback.getCall(0).args[0], 1, 'promise value is correct');
          assert.deepEqual(treeList.option('expandedRowKeys'), [1], 'parent node is expanded');
          assert.equal(treeList.pageIndex(), 0, 'page is not changed');
          assert.ok(treeList.getRowIndexByKey(2) >= 0, 'key is visible');
        });
        QUnit.test('TreeList navigateTo to the collapsed child row when scrolling is standard', function(assert) {
          var treeList = createTreeList({
            loadingTimeout: null,
            height: 100,
            dataSource: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {
              id: 5,
              parent_id: 4
            }],
            scrolling: {mode: 'standard'},
            paging: {enabled: true},
            keyExpr: 'id',
            parentIdExpr: 'parent_id',
            columns: ['id']
          });
          var callback = sinon.spy();
          var d = treeList.navigateToRow(5);
          d.done(callback);
          $(treeList.getScrollable().container()).trigger('scroll');
          this.clock.tick(10);
          assert.strictEqual(d.state(), 'resolved', 'promise is resolved');
          assert.strictEqual(callback.getCall(0).args[0], 4, 'promise value is correct');
          assert.deepEqual(treeList.option('expandedRowKeys'), [4], 'parent node is expanded');
          assert.ok(treeList.getRowIndexByKey(5) >= 0, 'key is visible');
        });
        QUnit.test('dataSource change with columns should force one loading only', function(assert) {
          var loadingSpy = sinon.spy();
          var options = {
            dataSource: new DataSource({load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([{id: 1}, {id: 2}, {id: 3}]);
                });
                return d;
              }}),
            paging: {pageSize: 2},
            columns: ['id']
          };
          var treeList = createTreeList(options);
          this.clock.tick(10);
          options.dataSource.store().on('loading', loadingSpy);
          treeList.option(options);
          this.clock.tick(10);
          assert.equal(loadingSpy.callCount, 1, 'loading called once');
          assert.equal(treeList.getVisibleRows().length, 3, 'visible row count');
        });
        QUnit.test('Should not generate exception when selection mode is multiple and focusedRowKey is set for the nested node (T735585)', function(assert) {
          var options = {
            dataSource: [{
              id: 0,
              parentId: -1,
              c0: 'C0_0',
              c1: 'c1_0'
            }, {
              id: 1,
              parentId: 0,
              c0: 'C0_0',
              c1: 'c1_0'
            }],
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            selection: {mode: 'single'},
            focusedRowEnabled: true,
            focusedRowKey: 1,
            expandedRowKeys: [1],
            onFocusedRowChanged: function(e) {
              if (e.row && e.row.data) {
                e.component.selectRows([e.row.key], true);
              }
            }
          };
          try {
            createTreeList(options);
            this.clock.tick(10);
            options.selection.mode = 'multiple';
            createTreeList(options);
            this.clock.tick(10);
          } catch (e) {
            assert.ok(false, e.message);
          }
          assert.ok(true, 'No exceptions');
        });
        ['virtual', 'standard'].forEach(function(scrollingMode) {
          QUnit.test(("The focused row should not be changed after filtering when scrolling.mode = " + scrollingMode), function(assert) {
            var treeList = createTreeList({
              height: 100,
              keyExpr: 'id',
              dataSource: generateData(6),
              paging: {
                enabled: scrollingMode === 'standard',
                pageSize: 4
              },
              scrolling: {
                mode: scrollingMode,
                prerenderedRowCount: 0,
                useNative: true
              },
              focusedRowEnabled: true,
              focusedRowKey: 12,
              columns: ['id']
            });
            this.clock.tick(300);
            treeList.searchByText('3');
            this.clock.tick(300);
            var visibleRows = treeList.getVisibleRows();
            assert.strictEqual(visibleRows.length, 1, 'count node');
            assert.strictEqual(visibleRows[0].key, 3, 'key node');
            assert.strictEqual(treeList.option('focusedRowKey'), 12, 'focused row key');
            treeList.searchByText('');
            this.clock.tick(300);
            $(treeList.getScrollable().content()).trigger('scroll');
            assert.strictEqual(treeList.pageIndex(), 1, 'page is changed');
            assert.deepEqual(treeList.option('expandedRowKeys'), [11], 'focus parent is expanded');
            assert.ok($(treeList.getRowElement(treeList.getRowIndexByKey(12))).hasClass('dx-row-focused'), 'focused row is visible');
          });
          QUnit.test(("The focused row should be restored after cleaning the filter when scrolling.mode = " + scrollingMode), function(assert) {
            var treeList = createTreeList({
              height: 100,
              keyExpr: 'id',
              dataSource: generateData(10),
              paging: {
                enabled: scrollingMode === 'standard',
                pageSize: 5
              },
              scrolling: {mode: scrollingMode},
              focusedRowEnabled: true,
              focusedRowKey: 2,
              columns: ['id']
            });
            this.clock.tick(200);
            assert.strictEqual(treeList.option('focusedRowKey'), 2, 'focused row key');
            assert.strictEqual(treeList.option('focusedRowIndex'), 1, 'focused row index');
            treeList.searchByText(3);
            this.clock.tick(200);
            var visibleRows = treeList.getVisibleRows();
            assert.strictEqual(visibleRows.length, 1, 'count node');
            assert.strictEqual(visibleRows[0].key, 3, 'key node');
            assert.strictEqual(treeList.option('focusedRowKey'), 2, 'focused row key');
            assert.strictEqual(treeList.option('focusedRowIndex'), 1, 'focused row index');
            treeList.searchByText('');
            this.clock.tick(200);
            assert.strictEqual(treeList.pageIndex(), 0, 'page is changed');
            assert.deepEqual(treeList.option('expandedRowKeys'), [1], 'focus parent is expanded');
            assert.strictEqual(treeList.option('focusedRowKey'), 2, 'focused row key');
            assert.strictEqual(treeList.option('focusedRowIndex'), 1, 'focused row index');
            assert.ok($(treeList.getRowElement(treeList.getRowIndexByKey(2))).hasClass('dx-row-focused'), 'focused row is visible');
          });
        });
        QUnit.test('Editor should be focused after adding row if some cell was focused (T1023022)', function(assert) {
          var treeList = createTreeList({
            height: 100,
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            dataSource: [{
              id: 1,
              parentId: 0
            }],
            loadingTimeout: null,
            editing: {
              mode: 'cell',
              allowAdding: true
            },
            columns: ['id']
          });
          treeList.focus(treeList.getCellElement(0, 0));
          treeList.addRow(1);
          this.clock.tick(10);
          var $firstCellInAddedRow = $(treeList.getCellElement(1, 0));
          assert.ok($firstCellInAddedRow.hasClass('dx-editor-cell'), 'editor is rendered');
          assert.ok($firstCellInAddedRow.hasClass('dx-focused'), 'editor is focused');
        });
        [true, false].forEach(function(withColumns) {
          QUnit.testInActiveWindow(("Row should be focused correctly when dataSource and focusedRowKey are changed simultaneously " + (withColumns ? 'with columns' : 'without columns') + " (T1062545)"), function(assert) {
            var focusedRowIndices = [];
            var config = {
              dataSource: [{
                id: 1,
                name: 'name 1',
                hasChildren: true,
                children: []
              }, {
                id: 3,
                name: 'name 3',
                hasChildren: false,
                children: []
              }],
              keyExpr: 'id',
              dataStructure: 'tree',
              rootValue: null,
              itemsExpr: 'children',
              focusedRowEnabled: true,
              repaintChangesOnly: true,
              hasItemsExpr: 'hasChildren',
              focusedRowKey: 1,
              onFocusedRowChanged: function(e) {
                focusedRowIndices.push(e.rowIndex);
              }
            };
            if (withColumns) {
              config.columns = [{dataField: 'name'}];
            }
            var treeList = createTreeList(config);
            this.clock.tick(300);
            assert.deepEqual(focusedRowIndices, [0], 'initial focused row indices');
            treeList.expandRow(1);
            this.clock.tick(300);
            assert.equal($(treeList.element()).find('.dx-treelist-expanded').length, 1, 'one expanded row');
            treeList.option('dataSource', [{
              id: 1,
              name: 'name 1',
              hasChildren: true,
              children: [{
                id: 2,
                name: 'name 2',
                hasChildren: false,
                children: []
              }]
            }, {
              id: 3,
              name: 'name 3',
              hasChildren: false,
              children: []
            }]);
            treeList.option('focusedRowKey', 2);
            this.clock.tick(300);
            var $focusedRowElement = $(treeList.element()).find('.dx-row-focused');
            assert.deepEqual(focusedRowIndices, [0, 1], 'focused row indices');
            assert.equal($focusedRowElement.length, 1, 'one row is marked as focused');
            assert.strictEqual($focusedRowElement.attr('aria-rowindex'), '2', 'aria-rowindex');
          });
        });
      });
      QUnit.module('Scroll', defaultModuleConfig, function() {
        QUnit.test('TreeList should not hang when scrolling', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              id: 1,
              parentId: 0
            }, {
              id: 2,
              parentId: 0
            }, {
              id: 3,
              parentId: 0
            }, {
              id: 4,
              parentId: 0
            }, {
              id: 5,
              parentId: 0
            }, {
              id: 6,
              parentId: 0
            }, {
              id: 7,
              parentId: 0
            }, {
              id: 8,
              parentId: 0
            }, {
              id: 9,
              parentId: 0
            }, {
              id: 10,
              parentId: 0
            }, {
              id: 11,
              parentId: 0
            }, {
              id: 12,
              parentId: 0
            }, {
              id: 13,
              parentId: 0
            }, {
              id: 14,
              parentId: 0
            }, {
              id: 15,
              parentId: 0
            }],
            paging: {pageSize: 5},
            height: 200,
            columnAutoWidth: true,
            scrolling: {useNative: false}
          });
          var done = assert.async();
          this.clock.tick(100);
          this.clock.restore();
          var scrollable = treeList.getScrollable();
          scrollable.scrollTo({y: 200});
          scrollable.scrollTo({y: 500});
          setTimeout(function() {
            assert.ok(treeList.pageIndex() > 0, 'page index');
            done();
          }, 1000);
        });
        QUnit.test('TreeList should correctly load data when filtering is remote and sorting is applied', function(assert) {
          var loadSpy = sinon.spy();
          var data = [{
            id: 0,
            parentId: '',
            hasItems: true
          }, {
            id: 1,
            parentId: 0,
            hasItems: false
          }];
          var treeList = createTreeList({
            dataSource: {load: function(options) {
                loadSpy(options);
                if (options.filter && options.filter[2] !== '') {
                  return $.Deferred().resolve([data[1]]);
                }
                return $.Deferred().resolve([data[0]]);
              }},
            remoteOperations: {filtering: true},
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            hasItemsExpr: 'hasItems',
            rootValue: '',
            showBorders: true,
            columns: [{
              dataField: 'id',
              sortOrder: 'asc'
            }]
          });
          this.clock.tick(100);
          $('#treeList').find('.dx-treelist-collapsed').trigger('dxclick');
          this.clock.tick(100);
          this.clock.restore();
          assert.equal(loadSpy.callCount, 2, 'load call count');
          assert.deepEqual(loadSpy.args[0][0].filter, ['parentId', '=', ''], 'first load arguments');
          assert.deepEqual(loadSpy.args[1][0].filter, ['parentId', '=', 0], 'second load arguments');
          assert.equal($(treeList.getCellElement(0, 0)).text(), '0', 'first row first cell');
          assert.equal($(treeList.getCellElement(1, 0)).text(), '1', 'second row first cell');
          loadSpy.reset();
        });
        QUnit.test('TreeList should load data once on expand after scrolling', function(assert) {
          var loadSpy = sinon.spy();
          var treeList = createTreeList({
            height: 100,
            dataSource: {load: function(options) {
                loadSpy(options);
                var d = $.Deferred();
                setTimeout(function() {
                  var items = [];
                  if (options.filter[2] === 2) {
                    items.push({
                      id: 201,
                      parentId: 2
                    });
                  } else if (options.filter[2] === -1) {
                    for (var i = 1; i <= 6; i++) {
                      items.push({
                        id: i,
                        parentId: -1
                      });
                    }
                  }
                  d.resolve(items);
                });
                return d;
              }},
            remoteOperations: {filtering: true},
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            rootValue: -1,
            columns: [{dataField: 'id'}],
            paging: {pageSize: 5},
            scrolling: {useNative: false}
          });
          this.clock.tick(100);
          treeList.getScrollable().scrollTo({y: 10});
          this.clock.tick(100);
          treeList.expandRow(2);
          this.clock.tick(100);
          assert.equal(loadSpy.callCount, 2, 'load call count');
          assert.deepEqual(loadSpy.args[0][0].filter, ['parentId', '=', -1], 'first load arguments');
          assert.deepEqual(loadSpy.args[1][0].filter, ['parentId', '=', 2], 'second load arguments');
        });
        QUnit.test('TreeList should correctly switch dx-row-alt class for fixed column after expand if repaintChangesOnly = true', function(assert) {
          var treeList = createTreeList({
            rowAlternationEnabled: true,
            autoExpandAll: false,
            repaintChangesOnly: true,
            columns: [{
              dataField: 'id',
              fixed: true
            }, 'field'],
            dataSource: [{
              id: 1,
              parentId: 0,
              field: 'data'
            }, {
              id: 2,
              parentId: 1,
              field: 'data'
            }, {
              id: 3,
              parentId: 0,
              field: 'data'
            }]
          });
          this.clock.tick(100);
          treeList.expandRow(1);
          this.clock.tick(10);
          var $row = $(treeList.getRowElement(2));
          assert.notOk($row.eq(0).hasClass('dx-row-alt'), 'unfixed table row element');
          assert.notOk($row.eq(1).hasClass('dx-row-alt'), 'fixed table row element');
        });
        QUnit.test('TreeList should reshape data after update dataSource if reshapeOnPush set true (T815367)', function(assert) {
          var treeList = createTreeList({
            dataSource: {
              store: [{
                ID: 1,
                Head_ID: 0,
                Name: 'John'
              }],
              reshapeOnPush: true
            },
            keyExpr: 'ID',
            parentIdExpr: 'Head_ID',
            columns: ['Name'],
            expandedRowKeys: [1]
          });
          this.clock.tick(10);
          treeList.getDataSource().store().push([{
            type: 'insert',
            data: {
              ID: 2,
              Head_ID: 1,
              Name: 'Alex'
            }
          }]);
          this.clock.tick(10);
          var $row = $(treeList.getRowElement(1));
          assert.ok($row && $row.text() === 'Alex', 'pushed item displays');
        });
        QUnit.test('TreeList should not reshape data after expand row (T815367)', function(assert) {
          var onNodesInitializedSpy = sinon.spy();
          var treeList = createTreeList({
            dataSource: {
              store: [{
                ID: 1,
                Head_ID: 0,
                Name: 'John'
              }, {
                ID: 2,
                Head_ID: 1,
                Name: 'Alex'
              }],
              reshapeOnPush: true
            },
            keyExpr: 'ID',
            parentIdExpr: 'Head_ID',
            columns: ['Name'],
            expandedRowKeys: [],
            onNodesInitialized: onNodesInitializedSpy
          });
          this.clock.tick(10);
          treeList.expandRow(1);
          this.clock.tick(10);
          assert.equal(onNodesInitializedSpy.callCount, 1, 'data did not reshape');
        });
        QUnit.test('TreeList should not occur an exception on an attempt to remove the non-existing key from the store (T827142)', function(assert) {
          var store = new ArrayStore({
            data: [{
              id: 1,
              parentId: 0,
              age: 19
            }, {
              id: 2,
              parentId: 1,
              age: 16
            }],
            key: 'id',
            reshapeOnPush: true
          });
          createTreeList({
            dataSource: {store: store},
            keyExpr: 'id',
            parentIdExpr: 'parentId'
          });
          this.clock.tick(10);
          store.push([{
            type: 'remove',
            key: 100
          }]);
          this.clock.tick(10);
          assert.ok(true, 'exception does not occur');
        });
        QUnit.test('TreeList should filter data with unreachable items (T816921)', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              ID: 1,
              Head_ID: 0,
              Name: 'John'
            }, {
              ID: 2,
              Head_ID: 1,
              Name: 'Alex'
            }, {
              ID: 3,
              Head_ID: 100,
              Name: 'Alex'
            }],
            keyExpr: 'ID',
            parentIdExpr: 'Head_ID',
            loadingTimeout: null,
            searchPanel: {
              visible: true,
              text: 'Alex'
            }
          });
          assert.equal(treeList.getVisibleRows().length, 2, 'filtered row count');
        });
      });
      QUnit.module('Virtual scrolling', defaultModuleConfig, function() {
        QUnit.test('New mode. Expand/collapse button should be updated on click', function(assert) {
          var treeList = createTreeList({
            dataSource: [{
              ID: 1,
              Head_ID: 0,
              Name: 'John'
            }, {
              ID: 2,
              Head_ID: 1,
              Name: 'Alex'
            }, {
              ID: 3,
              Head_ID: 100,
              Name: 'Alex'
            }],
            keyExpr: 'ID',
            parentIdExpr: 'Head_ID',
            loadingTimeout: undefined,
            scrolling: {
              mode: 'virtual',
              legacyMode: false
            }
          });
          $(treeList.getCellElement(0, 0)).find('.dx-treelist-collapsed').trigger('dxclick');
          assert.strictEqual($(treeList.getCellElement(0, 0)).find('.dx-treelist-expanded').length, 1, 'row expanded');
          $(treeList.getCellElement(0, 0)).find('.dx-treelist-expanded').trigger('dxclick');
          assert.strictEqual($(treeList.getCellElement(0, 0)).find('.dx-treelist-collapsed').length, 1, 'row collapsed');
        });
      });
      QUnit.module('Row dragging', defaultModuleConfig, function() {
        QUnit.test('The draggable row should have correct markup when defaultOptions is specified', function(assert) {
          TreeList.defaultOptions({options: {
              filterRow: {visible: true},
              groupPanel: {visible: true},
              filterPanel: {visible: true}
            }});
          try {
            var treeList = createTreeList({
              dataSource: [{
                ID: 1,
                Head_ID: 0,
                Name: 'John'
              }, {
                ID: 2,
                Head_ID: 0,
                Name: 'Alex'
              }],
              keyExpr: 'ID',
              parentIdExpr: 'Head_ID',
              rowDragging: {allowReordering: true}
            });
            this.clock.tick(10);
            pointerMock(treeList.getCellElement(0, 0)).start().down().move(100, 100);
            var $draggableRow = $('body').children('.dx-sortable-dragging');
            assert.strictEqual($draggableRow.length, 1, 'has draggable row');
            var $visibleView = $draggableRow.find('.dx-gridbase-container').children(':visible');
            assert.strictEqual($visibleView.length, 1, 'markup of the draggable row is correct');
            assert.ok($visibleView.hasClass('dx-treelist-rowsview'), 'rowsview is visible');
          } finally {
            TreeList.defaultOptions({options: {
                filterRow: {visible: false},
                groupPanel: {visible: false},
                filterPanel: {visible: false}
              }});
          }
        });
      });
      QUnit.module('Selection', defaultModuleConfig, function() {
        [true, false].forEach(function(recursive) {
          QUnit.test(("Select and deselect all rows if filter is applied, filterMode is matchOnly and recursive=" + recursive), function(assert) {
            var selectedRowKeys = recursive ? [1, 2] : [2];
            var treeList = createTreeList({
              dataSource: [{
                id: 1,
                parent_id: 0,
                data: 'some'
              }, {
                id: 2,
                parent_id: 1,
                data: 'some2'
              }],
              columns: ['id', 'data'],
              filterValue: ['data', '=', 'some2'],
              keyExpr: 'id',
              parentIdExpr: 'parent_id',
              filterMode: 'matchOnly',
              selection: {
                recursive: recursive,
                mode: 'multiple'
              }
            });
            this.clock.tick(10);
            var $selectCheckBoxes = $('.dx-select-checkbox');
            $selectCheckBoxes.eq(0).trigger('dxclick');
            assert.equal($selectCheckBoxes.eq(0).attr('aria-checked'), 'true', 'selectAll checkbox is checked');
            assert.equal($selectCheckBoxes.eq(1).attr('aria-checked'), 'true', 'first row\'s checkbox is checked');
            assert.deepEqual(treeList.getSelectedRowKeys(), selectedRowKeys, 'selected row keys');
            assert.deepEqual(treeList.option('selectedRowKeys'), selectedRowKeys, 'selected row keys');
            $selectCheckBoxes.eq(0).trigger('dxclick');
            assert.equal($selectCheckBoxes.eq(0).attr('aria-checked'), 'false', 'selectAll checkbox is not checked');
            assert.equal($selectCheckBoxes.eq(1).attr('aria-checked'), 'false', 'first row\'s checkbox is not checked');
            assert.deepEqual(treeList.getSelectedRowKeys(), [], 'selected row keys');
            assert.deepEqual(treeList.option('selectedRowKeys'), [], 'selected row keys');
          });
        });
        QUnit.test('Rows should be selected correctly with Shift', function(assert) {
          var items = [{
            id: 1,
            parentId: 0,
            name: 'Name 1'
          }, {
            id: 2,
            parentId: 1,
            name: 'Name 2'
          }, {
            id: 3,
            parentId: 1,
            name: 'Name 3'
          }, {
            id: 4,
            parentId: 1,
            name: 'Name 4'
          }, {
            id: 5,
            parentId: 4,
            name: 'Name 5'
          }];
          var treeList = createTreeList({
            dataSource: items,
            selection: {mode: 'multiple'},
            columns: ['name'],
            autoExpandAll: true
          });
          this.clock.tick(300);
          $(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(1)').trigger('dxclick');
          assert.deepEqual(treeList.getSelectedRowKeys(), [2], 'selected key');
          var pointer = pointerMock($(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(4)'));
          pointer.start({shiftKey: true}).down().up();
          this.clock.tick(300);
          assert.deepEqual(treeList.getSelectedRowKeys(), [2, 5, 4, 3], 'selected keys with Shift');
        });
        QUnit.test('Rows should be selected correctly with Shift when recursive selection is enabled (T1072845)', function(assert) {
          var items = [{
            ID: 1,
            Parent_ID: 0,
            Name: 'Test1'
          }, {
            ID: 2,
            Parent_ID: 1,
            Name: 'Test2'
          }, {
            ID: 3,
            Parent_ID: 2,
            Name: 'Test3'
          }, {
            ID: 4,
            Parent_ID: 3,
            Name: 'Test4'
          }, {
            ID: 5,
            Parent_ID: 3,
            Name: 'Test5'
          }, {
            ID: 6,
            Parent_ID: 3,
            Name: 'Test6'
          }, {
            ID: 7,
            Parent_ID: 3,
            Name: 'Test7'
          }, {
            ID: 8,
            Parent_ID: 1,
            Name: 'Test8'
          }, {
            ID: 9,
            Parent_ID: 1,
            Name: 'Test9'
          }];
          var treeList = createTreeList({
            dataSource: items,
            keyExpr: 'ID',
            parentIdExpr: 'Parent_ID',
            showRowLines: true,
            showBorders: true,
            columnAutoWidth: true,
            selection: {
              mode: 'multiple',
              recursive: true
            },
            columns: ['Name'],
            height: 400,
            expandedRowKeys: [1, 2, 3]
          });
          var getSelectedRowIndices = function() {
            var selectedIndices = [];
            $(treeList.element()).find('.dx-data-row.dx-selection').each(function(_, element) {
              return selectedIndices.push($(element).index());
            });
            return selectedIndices;
          };
          this.clock.tick(300);
          $(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(3)').trigger('dxclick');
          assert.deepEqual(treeList.getSelectedRowKeys(), [4], 'selected key');
          assert.deepEqual(getSelectedRowIndices(), [3], 'selected index');
          var pointer = pointerMock($(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(6)'));
          pointer.start({shiftKey: true}).down().up();
          this.clock.tick(300);
          assert.deepEqual(treeList.getSelectedRowKeys(), [4, 7, 6, 5], 'selected keys with Shift');
          assert.deepEqual(getSelectedRowIndices(), [1, 2, 3, 4, 5, 6], 'selected indices with Shift');
          $(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(2)').trigger('dxclick');
          assert.equal(treeList.getSelectedRowKeys().length, 0, 'no selected keys');
          assert.equal(getSelectedRowIndices().length, 0, 'no selected indices');
          $(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(1)').trigger('dxclick');
          assert.deepEqual(treeList.getSelectedRowKeys(), [2], 'selected key after the second row click');
          assert.deepEqual(getSelectedRowIndices(), [1, 2, 3, 4, 5, 6], 'selected indices after the second row click');
          pointer = pointerMock($(treeList.element()).find('.dx-treelist-rowsview .dx-checkbox:eq(8)'));
          pointer.start({shiftKey: true}).down().up();
          this.clock.tick(300);
          assert.deepEqual(treeList.getSelectedRowKeys(), [2, 9, 8, 7, 6, 5, 4, 3], 'selected keys after the last row click with Shift');
          assert.deepEqual(getSelectedRowIndices(), [0, 1, 2, 3, 4, 5, 6, 7, 8], 'selected indices after the last row click with Shift');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","core/utils/common","core/utils/shadow_dom","core/devices","core/utils/size","animation/fx","data/data_source/data_source","../../helpers/wrappers/dataGridWrappers.js","data/array_store","ui/tree_list/ui.tree_list","../../helpers/pointerMock.js","../../helpers/grid/keyboardNavigationHelper.js","events/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("core/utils/common"), require("core/utils/shadow_dom"), require("core/devices"), require("core/utils/size"), require("animation/fx"), require("data/data_source/data_source"), require("../../helpers/wrappers/dataGridWrappers.js"), require("data/array_store"), require("ui/tree_list/ui.tree_list"), require("../../helpers/pointerMock.js"), require("../../helpers/grid/keyboardNavigationHelper.js"), require("events/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=treeList.tests.js.map