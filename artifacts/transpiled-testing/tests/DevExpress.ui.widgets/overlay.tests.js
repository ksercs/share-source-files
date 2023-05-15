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

(["testing/tests/DevExpress.ui.widgets/overlay.tests.js"], ["core/utils/size","animation/fx","animation/position","animation/translator","generic_light.css!","core/config","core/devices","core/templates/template","core/utils/resize_callbacks","core/utils/type","core/utils/view_port","events/core/events_engine","events/visibility_change","jquery","mobile/hide_callback","core/errors","ui/widget/ui.errors","ui/overlay/ui.overlay","ui/overlay/z_index","ui/scroll_view/ui.scrollable","ui/widget/selectors","ui/widget/swatch_container","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js","../../helpers/shadowDom.js","core/utils/browser"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/overlay.tests.js", ["core/utils/size", "animation/fx", "animation/position", "animation/translator", "generic_light.css!", "core/config", "core/devices", "core/templates/template", "core/utils/resize_callbacks", "core/utils/type", "core/utils/view_port", "events/core/events_engine", "events/visibility_change", "jquery", "mobile/hide_callback", "core/errors", "ui/widget/ui.errors", "ui/overlay/ui.overlay", "ui/overlay/z_index", "ui/scroll_view/ui.scrollable", "ui/widget/selectors", "ui/widget/swatch_container", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "../../helpers/nativePointerMock.js", "../../helpers/shadowDom.js", "core/utils/browser"], function($__export) {
  "use strict";
  var getWidth,
      getHeight,
      getOuterWidth,
      fx,
      positionUtils,
      locate,
      config,
      devices,
      Template,
      resizeCallbacks,
      isRenderer,
      viewPort,
      eventsEngine,
      visibilityChange,
      triggerHidingEvent,
      triggerShownEvent,
      $,
      hideTopOverlayCallback,
      errors,
      uiErrors,
      Overlay,
      zIndex,
      selectors,
      swatch,
      keyboardMock,
      pointerMock,
      nativePointerMock,
      getActiveElement,
      browser,
      OVERLAY_CLASS,
      OVERLAY_WRAPPER_CLASS,
      OVERLAY_CONTENT_CLASS,
      OVERLAY_SHADER_CLASS,
      INNER_OVERLAY_CLASS,
      HOVER_STATE_CLASS,
      IS_SAFARI,
      VIEWPORT_CLASS,
      PREVENT_SAFARI_SCROLLING_CLASS,
      viewport,
      toSelector,
      moduleConfig,
      test,
      testModule;
  return {
    setters: [function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
      getOuterWidth = $__m.getOuterWidth;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      positionUtils = $__m.default;
    }, function($__m) {
      locate = $__m.locate;
    }, function($__m) {}, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      viewPort = $__m.value;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      visibilityChange = $__m.default;
      triggerHidingEvent = $__m.triggerHidingEvent;
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      hideTopOverlayCallback = $__m.hideCallback;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      uiErrors = $__m.default;
    }, function($__m) {
      Overlay = $__m.default;
    }, function($__m) {
      zIndex = $__m;
    }, function($__m) {}, function($__m) {
      selectors = $__m.default;
    }, function($__m) {
      swatch = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      nativePointerMock = $__m.default;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }, function($__m) {
      browser = $__m.default;
    }],
    execute: function() {
      var $__5;
      QUnit.testStart(function() {
        viewPort($('#qunit-fixture').addClass(VIEWPORT_CLASS));
        var markup = '<style>\
            html, body {\
                height: 100%;\
                margin: 0;\
            }\
            \
            #qunit-fixture {\
                width: 100%;\
                height: 100%;\
            }\
        </style>\
        \
        <div id="overlayInTargetContainer"></div>\
        \
        <div id="customTargetContainer">\
            <div id="parentContainer">\
                <input id="overlayInputTarget" type="text" />\
                <div id="overlay"></div>\
                <div id="overlay2">\
                    <div id="test"></div>\
                </div>\
            </div>\
        </div>\
        \
        <div id="container"></div>\
        \
        <div id="overlayWithClass" class="something another"></div>\
        \
        <div id="overlayWithAnonymousTmpl">\
            <div id="content"></div>\
        </div>\
        \
        <div id="B237292">\
            <div id="B237292_container" style="width: 100px; height: 100px"></div>\
        \
            <div id="B237292_overlay">\
                Overlay content\
            </div>\
        </div>\
        \
        <div id="Q518355">\
            <div id="Q518355_overlay_1"></div>\
            <div id="Q518355_overlay_2"></div>\
        </div>\
        \
        <div id="overlayWithContentTemplate">\
            <div data-options="dxTemplate: { name: \'custom\' }">\
                TestContent\
            </div>\
        </div>\
        \
        <div id="overlayWithWrongTemplateName">\
            <div data-options="dxTemplate: { name: \'wrongName\' }">testContent</div>\
        </div>\
        <div id="widget"></div>\
        \
        <script type="text/html" id="focusableTemplate">\
            <a>something</a>\
            <input class="firstTabbable" />\
            <div tabindex=\'0\'></div>\
            <textarea></textarea>\
            <div tabindex=\'-1\'></div>\
            <a href="#" class="lastTabbable">something</a>\
        </script>\
        <input class="outsideTabbable" />\
        \
        <div>\
            <div class="dx-swatch-my-color_scheme1 some-class some-class2">\
                <div>\
                    <div id="swatchOverlay1"></div>\
                </div>\
            </div>\
            <div class="some-class some-class2 dx-swatch-my-color_scheme2 some-class3">\
                <div>\
                    <div id="swatchOverlay2"></div>\
                    <div id="swatchOverlay3"></div>\
                </div>\
            </div>\
        <div>';
        $('#qunit-fixture').html(markup);
      });
      OVERLAY_CLASS = 'dx-overlay';
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      OVERLAY_CONTENT_CLASS = 'dx-overlay-content';
      OVERLAY_SHADER_CLASS = 'dx-overlay-shader';
      INNER_OVERLAY_CLASS = 'dx-inner-overlay';
      HOVER_STATE_CLASS = 'dx-state-hover';
      IS_SAFARI = !!browser.safari;
      VIEWPORT_CLASS = 'dx-viewport';
      PREVENT_SAFARI_SCROLLING_CLASS = 'dx-prevent-safari-scrolling';
      viewport = function() {
        return $(toSelector(VIEWPORT_CLASS));
      };
      toSelector = function(cssClass) {
        return ("." + cssClass);
      };
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          zIndex.clearStack();
          Overlay.baseZIndex(1500);
          fx.off = false;
        }
      };
      (($__5 = QUnit, test = $__5.test, testModule = $__5.module, $__5));
      testModule('render', moduleConfig, function() {
        test('overlay class should be added to overlay', function(assert) {
          var $element = $('#overlay').dxOverlay();
          assert.ok($element.hasClass(OVERLAY_CLASS));
        });
        test('inner overlay class should depend on innerOverlay option', function(assert) {
          var overlay = $('#overlay').dxOverlay({innerOverlay: true}).dxOverlay('instance');
          var $content = overlay.$content();
          assert.ok($content.hasClass(INNER_OVERLAY_CLASS));
          overlay.option('innerOverlay', false);
          assert.notOk($content.hasClass(INNER_OVERLAY_CLASS));
        });
        test('content should be present when widget instance exists', function(assert) {
          var $element = $('#overlay').dxOverlay();
          var instance = $element.dxOverlay('instance');
          assert.ok($(toSelector(OVERLAY_CONTENT_CLASS)).length);
          instance.dispose();
          assert.ok(!$(toSelector(OVERLAY_CONTENT_CLASS)).length);
        });
        test('overlay should use default template when element with data-options has not dxTemplate params (B253554)', function(assert) {
          assert.expect(0);
          $('#overlay').append('<div data-options="dxTest : { } ">123</div></div>').appendTo('#qunit-fixture').dxOverlay({visible: true});
        });
        test('overlay should not crash on window resize (B253397)', function(assert) {
          assert.expect(0);
          $('<div />').dxOverlay({
            visible: true,
            width: 500,
            height: 500,
            onContentReady: function() {
              resizeCallbacks.fire();
              getWidth($(toSelector(OVERLAY_CONTENT_CLASS)));
              resizeCallbacks.fire();
            }
          }).remove();
        });
        test('overlay created with templatesRenderAsynchronously option should be shown with delay', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var onShowingSpy = sinon.spy();
            $('#overlay').dxOverlay({
              templatesRenderAsynchronously: true,
              visible: true,
              onShowing: onShowingSpy
            });
            assert.strictEqual(onShowingSpy.called, false);
            clock.tick(10);
            assert.strictEqual(onShowingSpy.called, true);
          } finally {
            clock.restore();
          }
        });
        test('overlay should be positioned correctly after async template is rendered (T1114344)', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var overlay = $('#overlay').dxOverlay({
              templatesRenderAsynchronously: true,
              visible: true,
              width: 'auto',
              container: 'body',
              integrationOptions: {templates: {'content': {render: function(args) {
                      setTimeout(function() {
                        args.container.append($('<div>').width(500));
                        args.onRendered();
                      }, 100);
                    }}}}
            }).dxOverlay('instance');
            clock.tick(100);
            var contentRect = overlay.$content().get(0).getBoundingClientRect();
            var contentCenterX = (contentRect.left + contentRect.right) / 2;
            var windowCenterX = window.innerWidth / 2;
            assert.roughEqual(contentCenterX, windowCenterX, 1, 'content is centered');
          } finally {
            clock.restore();
          }
        });
        test('overlay created with templatesRenderAsynchronously option should not be shown after delay if it was hidden before', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var overlay = new Overlay($('#overlay'), {
              templatesRenderAsynchronously: true,
              visible: true
            });
            overlay.hide();
            clock.tick(10);
            assert.strictEqual(overlay.$content().is(':visible'), false);
          } finally {
            clock.restore();
          }
        });
        test('overlay should have hover class on content', function(assert) {
          var element = $('#overlay').dxOverlay({
            hoverStateEnabled: true,
            visible: true
          });
          var instance = element.dxOverlay('instance');
          var $content = instance.$content();
          $($content).trigger('dxhoverstart');
          assert.ok($content.hasClass(HOVER_STATE_CLASS));
        });
        test('default', function(assert) {
          var instance = $('#overlay').dxOverlay().dxOverlay('instance');
          var $content = instance.$content();
          assert.ok(!$content.is(':visible'));
          assert.ok(!viewport().children(toSelector(OVERLAY_SHADER_CLASS)).is(':visible'));
          assert.ok(getWidth($content) < getWidth($(window)));
          assert.ok(getHeight($content) < getHeight($(window)));
        });
        test('RTL markup - rtlEnabled by default', function(assert) {
          var overlay = $('#overlay').dxOverlay({rtlEnabled: true}).dxOverlay('instance');
          overlay.show();
          var $content = overlay.$content();
          assert.ok($content.hasClass('dx-rtl'));
        });
        test('Color swatches - overlay should be rendered on viewport by default', function(assert) {
          var overlay = $('#overlay').dxOverlay().dxOverlay('instance');
          overlay.show();
          var $wrapper = overlay.$wrapper();
          assert.ok($wrapper.parent().hasClass(VIEWPORT_CLASS));
        });
        test('Color swatches - overlay should be rendered on the child of viewport with special class', function(assert) {
          var containers = [];
          for (var i = 1; i <= 3; i++) {
            var overlay = $('#swatchOverlay' + i).dxOverlay().dxOverlay('instance');
            overlay.show();
            containers[i] = overlay.$wrapper().parent();
          }
          assert.ok(containers[1].hasClass('dx-swatch-my-color_scheme1'), 'overlay\'s container has right class');
          assert.ok(containers[1].parent().hasClass(VIEWPORT_CLASS), 'overlay\'s container is the viewport\'s child');
          assert.ok(containers[2].hasClass('dx-swatch-my-color_scheme2'), 'overlay\'s container has right class');
          assert.ok(containers[2].parent().hasClass(VIEWPORT_CLASS), 'overlay\'s container is the viewport\'s child');
          assert.ok(containers[3].hasClass('dx-swatch-my-color_scheme2'), 'overlay\'s container has right class');
          assert.ok(containers[3].parent().hasClass(VIEWPORT_CLASS), 'overlay\'s container is the viewport\'s child');
          assert.strictEqual($(("." + VIEWPORT_CLASS + " > .dx-swatch-my-color_scheme2")).length, 1, 'one container for different overlays from the same swatch');
        });
        test('Color swatches - overlay should be rendered on the child of viewport with special class if its element attached after creation', function(assert) {
          var detachedContainer = $('<div>');
          var overlay = detachedContainer.dxOverlay().dxOverlay('instance');
          detachedContainer.appendTo('.dx-swatch-my-color_scheme1 > div');
          overlay.show();
          var overlayContainer = overlay.$wrapper().parent();
          assert.ok(overlayContainer.hasClass('dx-swatch-my-color_scheme1'), 'overlay\'s container has right class');
          assert.ok(overlayContainer.parent().hasClass(VIEWPORT_CLASS), 'overlay\'s container is the viewport\'s child');
        });
        test('Overlay does not fail if swatch is undefined (render before documentReady, T713615, T1143527)', function(assert) {
          var stub = sinon.stub(swatch, 'getSwatchContainer', function() {
            return undefined;
          });
          try {
            $('#container').dxOverlay({visible: true});
            assert.expect(0);
          } finally {
            stub.restore();
          }
        });
        QUnit.module('Breaking change t1123711 - warning W1021', function() {
          test('should be logged if container is invalid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#overlay').dxOverlay({
                container: 'invalid',
                visible: true
              });
              assert.ok(uiErrors.log.calledOnce, 'only one warning is logged');
              assert.deepEqual(uiErrors.log.lastCall.args, ['W1021', 'dxOverlay'], 'args of the log method');
            } finally {
              uiErrors.log.restore();
            }
          });
          test('should not not be logged if container is valid', function(assert) {
            sinon.spy(uiErrors, 'log');
            try {
              $('#overlay').dxOverlay({
                container: 'body',
                visible: true
              });
              assert.ok(uiErrors.log.notCalled, 'no warning is logged');
            } finally {
              uiErrors.log.restore();
            }
          });
        });
      });
      testModule('option', moduleConfig, function() {
        test('RTL markup - rtlEnabled by option', function(assert) {
          var overlay = $('#overlay').dxOverlay({deferRendering: false}).dxOverlay('instance');
          var $content = $(overlay.$content());
          var contentRenderSpy = sinon.spy(overlay, '_renderContentImpl');
          overlay.option('rtlEnabled', true);
          assert.ok($content.hasClass('dx-rtl'));
          overlay.option('rtlEnabled', false);
          assert.ok(!$content.hasClass('dx-rtl'));
          assert.strictEqual(contentRenderSpy.callCount, 2, 'must invalidate content when RTL changed');
        });
        QUnit.test('overlay should not change visibility after rtlEnabled option change', function(assert) {
          var overlay = $('#overlay').dxOverlay({visible: true}).dxOverlay('instance');
          overlay.option('rtlEnabled', true);
          assert.ok(overlay.option('visible'), 'overlay is visible after rtlEnabled option change');
        });
        test('there is no errors when overlay has a subscription on \'onHiding\' even when the widget is disposed', function(assert) {
          var instance = $('#overlay').dxOverlay({
            visible: true,
            onHiding: function(e) {
              e.component.dispose();
            }
          }).dxOverlay('instance');
          try {
            instance.hide();
          } catch (e) {
            assert.ok(false, ("error: " + e.message));
          }
          assert.ok(true, 'no errors');
        });
        test('visibility callbacks', function(assert) {
          assert.expect(16);
          var beforeShowFired = 0;
          var afterShowFired = 0;
          var beforeHideFired = 0;
          var afterHideFired = 0;
          var positionedFired = 0;
          var instance = $('#overlay').dxOverlay({
            onShowing: function() {
              assert.strictEqual(this.$content().css('display'), 'block');
              assert.strictEqual(afterShowFired, 0, 'afterShowFired');
              beforeShowFired++;
            },
            onPositioned: function($__6) {
              var position = $__6.position;
              assert.strictEqual(beforeShowFired, 1, 'beforeShowFired');
              assert.strictEqual(this.$content().css('display'), 'block');
              assert.ok(position);
              positionedFired++;
            },
            onShown: function() {
              assert.strictEqual(positionedFired, 1, 'positionedFired');
              assert.strictEqual(this.$content().css('display'), 'block');
              afterShowFired++;
            },
            onHiding: function() {
              assert.strictEqual(this.$content().css('display'), 'block');
              assert.strictEqual(afterHideFired, 0, 'afterHideFired');
              beforeHideFired++;
            },
            onHidden: function() {
              assert.strictEqual(beforeHideFired, 1, 'beforeHideFired');
              assert.strictEqual(this.$content().css('display'), 'none');
              afterHideFired++;
            }
          }).dxOverlay('instance');
          instance.show().done(function() {
            assert.strictEqual(beforeShowFired, 1, 'beforeShowFired');
            assert.strictEqual(positionedFired, 1, 'positionedFired');
            assert.strictEqual(afterShowFired, 1, 'afterShowFired');
            instance.hide().done(function() {
              assert.strictEqual(beforeHideFired, 1), 'beforeHideFired';
              assert.strictEqual(afterHideFired, 1, 'afterHideFired');
            });
          });
        });
        testModule('wrapperAttr option', {beforeEach: function() {
            this.overlay = $('#overlay').dxOverlay({
              wrapperAttr: {class: 'someClass'},
              visible: true
            }).dxOverlay('instance');
            this.$content = this.overlay.$content();
            this.$wrapper = this.overlay.$wrapper();
          }}, function() {
          test('adds attribute on wrapper on init', function(assert) {
            assert.ok(this.$wrapper.hasClass('someClass'));
          });
          test('adds attribute on wrapper on runtime', function(assert) {
            this.overlay.option('wrapperAttr', {someAttr: 'someValue'});
            assert.strictEqual(this.$wrapper.attr('someAttr'), 'someValue');
          });
          test('does not override default clases', function(assert) {
            this.overlay.option('wrapperAttr', {class: 'newClass'});
            assert.ok(this.$wrapper.hasClass(OVERLAY_WRAPPER_CLASS));
          });
          test('overrides custom clases', function(assert) {
            this.overlay.option('wrapperAttr', {class: 'newClass'});
            assert.ok(this.$wrapper.hasClass('newClass'));
            assert.notOk(this.$wrapper.hasClass('someClass'));
          });
          test('with null/undefined value deletes old classes from wrapperAttr', function(assert) {
            this.overlay.option('wrapperAttr', undefined);
            assert.notOk(this.$wrapper.hasClass('someClass'));
            this.overlay.option('wrapperAttr', {class: 'newClass'});
            this.overlay.option('wrapperAttr', null);
            assert.notOk(this.$wrapper.hasClass('newClass'));
          });
        });
        [{
          name: 'elementAttr',
          value: {class: '123'}
        }, {
          name: 'copyRootClassesToWrapper',
          value: true
        }].forEach(function($__6) {
          var $__7 = $__6,
              name = $__7.name,
              value = $__7.value;
          test(("should show warning if deprecated \"" + name + "\" option is used"), function(assert) {
            sinon.spy(errors, 'log');
            var options = {};
            options[name] = value;
            try {
              $('#overlay').dxOverlay(options);
              assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxOverlay', ("" + name), '21.2', 'Use the "wrapperAttr" option instead'], 'args of the log method');
            } finally {
              errors.log.restore();
            }
          });
        });
        test('should not show "copyRootClassesToWrapper" deprecation warning if "_ignoreCopyRootClassesToWrapperDeprecation" option enabled', function(assert) {
          sinon.spy(errors, 'log');
          try {
            $('#overlay').dxOverlay({
              copyRootClassesToWrapper: {class: '123'},
              _ignoreCopyRootClassesToWrapperDeprecation: true
            });
            assert.ok(errors.log.notCalled, 'no warnings were logged');
          } finally {
            errors.log.restore();
          }
        });
        test('should not show "elementAttr" deprecation warning if "_ignoreElementAttrDeprecation" option enabled (used in ASP.NET wrappers, refer to issues T678658, T1084114, T1097600)', function(assert) {
          sinon.spy(errors, 'log');
          try {
            $('#overlay').dxOverlay({
              elementAttr: {id: 'nested-id'},
              _ignoreElementAttrDeprecation: true
            });
            assert.ok(errors.log.notCalled, 'no warnings were logged');
          } finally {
            errors.log.restore();
          }
        });
      });
      testModule('visibility', moduleConfig, function() {
        test('overlay should be shown when option visible set to true', function(assert) {
          var $overlay = $('#overlay').dxOverlay({visible: true});
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          var $wrapper = overlay.$wrapper();
          assert.ok($wrapper.is(':visible'));
          assert.ok($content.is(':visible'));
          assert.ok($overlay.is(':visible'));
          overlay.option('visible', false);
          assert.ok($wrapper.is(':hidden'));
          assert.ok($content.is(':hidden'));
          assert.ok($overlay.is(':hidden'));
        });
        test('new shown overlay should be displayed with greater z-index (Q518355)', function(assert) {
          var $overlay1 = $('#Q518355_overlay_1').dxOverlay();
          var $overlay2 = $('#Q518355_overlay_2').dxOverlay();
          var overlay1 = $overlay1.dxOverlay('instance');
          var overlay2 = $overlay2.dxOverlay('instance');
          overlay1.show();
          var $content1 = overlay1.$content();
          var contentZIndex = parseInt($content1.css('zIndex'), 10);
          var wrapperZIndex = parseInt(overlay1.$wrapper().css('zIndex'), 10);
          overlay2.show();
          var $content2 = overlay2.$content();
          assert.strictEqual(parseInt($content2.css('zIndex'), 10), contentZIndex + 1);
          assert.strictEqual(parseInt(overlay2.$wrapper().css('zIndex'), 10), wrapperZIndex + 1);
        });
        test('Cancel visibility change in hiding', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: true,
            onHiding: function(e) {
              e.cancel = true;
            }
          });
          var overlay = $overlay.dxOverlay('instance');
          overlay.option('visible', false);
          assert.ok(overlay.option('visible'), 'overlay still visible after option changed');
          overlay.hide();
          assert.ok(overlay.option('visible'), 'overlay still visible after call \'hide\'');
          overlay.option('onHiding', null);
          overlay.hide();
          assert.ok(!overlay.option('visible'), 'overlay has not visible after clear hiding and call \'hide\'');
        });
        test('overlay should fire dxshown and dxhiding events on show/hide', function(assert) {
          var $overlay = $('#overlay');
          $('<div id=\'target\' class=\'dx-visibility-change-handler\'>').appendTo($overlay);
          var overlay = $overlay.dxOverlay({
            visible: false,
            deferRendering: false
          }).dxOverlay('instance');
          var shownStub = sinon.stub();
          var hidingStub = sinon.stub();
          $(overlay.$content().find('#target')).on({
            'dxshown': shownStub,
            'dxhiding': hidingStub
          });
          overlay.option('visible', true);
          assert.strictEqual(shownStub.callCount, 1, 'dxshown fired once after showing');
          assert.strictEqual(hidingStub.callCount, 0, 'dxhiding was not fired after showing');
          overlay.option('visible', false);
          assert.strictEqual(shownStub.callCount, 1, 'dxshown was not fired on hiding');
          assert.strictEqual(hidingStub.callCount, 1, 'dxhiding fired once on hiding');
        });
        test('overlay should fire dxshown if visible at initialization', function(assert) {
          assert.expect(1);
          $('#overlay').dxOverlay({
            visible: true,
            deferRendering: false,
            onContentReady: function(e) {
              $('<div id=\'target\' class=\'dx-visibility-change-handler\'>').on('dxshown', function() {
                assert.ok(true, 'dxshown was fired');
              }).appendTo(e.component.$content().get(0));
            }
          });
        });
        test('overlay is not shown when parent is hidden', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: false,
            deferRendering: false
          });
          var overlay = $overlay.dxOverlay('instance');
          $overlay.parent().hide();
          overlay.option('visible', true);
          assert.ok(overlay.option('visible'), 'option was set');
          assert.ok(overlay.$content().is(':hidden'), 'overlay was not visible');
        });
        test('overlay content is shown on \'dxshown\' after hidden parent becomes visible', function(assert) {
          var $overlay = $('#overlay').append('<div class=\'content-inner\'>');
          $overlay.parent().hide();
          var overlay = $overlay.dxOverlay({
            visible: true,
            deferRendering: true
          }).dxOverlay('instance');
          assert.ok(overlay.$content().is(':hidden'), 'overlay hidden');
          $overlay.parent().show();
          $($overlay).trigger('dxshown');
          assert.ok(overlay.$content().find('.content-inner').is(':visible'), 'overlay shown');
        });
        test('overlay content is shown on \'dxshown\' after hidden parent becomes visible second time', function(assert) {
          var $overlay = $('#overlay').append('<div class=\'content-inner\'>');
          var innerOverlay;
          var overlay = $overlay.dxOverlay({
            visible: false,
            contentTemplate: function(container) {
              var element = $('<div>').appendTo(container);
              innerOverlay = element.dxOverlay({visible: true}).dxOverlay('instance');
              return element;
            }
          }).dxOverlay('instance');
          overlay.option('visible', true);
          assert.ok(innerOverlay.$content().is(':visible'), 'overlay shown');
          innerOverlay.option('visible', false);
          overlay.option('visible', false);
          innerOverlay.option('visible', true);
          assert.ok(innerOverlay.$content().is(':hidden'), 'overlay hidden');
          overlay.option('visible', true);
          assert.ok(innerOverlay.$content().is(':visible'), 'overlay shown second time');
        });
        test('overlay is hidden when dxhiding event is fired', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: true,
            deferRendering: false
          });
          var overlay = $overlay.dxOverlay('instance');
          $($overlay).trigger('dxhiding').hide();
          assert.ok(overlay.$content().is(':hidden'), 'overlay was disappeared');
          assert.ok(overlay.option('visible'), 'overlay option visible is true');
        });
        test('overlay is shown when dxshown event is fired', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: true,
            deferRendering: false
          });
          var overlay = $overlay.dxOverlay('instance');
          $($overlay).trigger('dxhiding').hide();
          $($overlay.show()).trigger('dxshown');
          assert.ok(overlay.$content().is(':visible'), 'overlay shown');
        });
        test('overlay is not shown when dxshown event was fired and option \'visible\' is false', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: false,
            deferRendering: false
          });
          var overlay = $overlay.dxOverlay('instance');
          $overlay.trigger('dxhiding').trigger('dxshown');
          assert.ok(overlay.$content().is(':hidden'), 'overlay does not shown');
        });
        test('overlay should be shown when visibility is true and dxshown event was fired', function(assert) {
          var $overlay = $('#overlay');
          var $overlayWrapper = $overlay.wrap('<div>').parent().hide();
          var overlay = $overlay.dxOverlay({
            visible: true,
            deferRendering: false
          }).dxOverlay('instance');
          var $overlayContent = overlay.$content();
          assert.ok($overlayContent.is(':hidden'), 'overlayContent is hidden when parent is hidden');
          $overlayWrapper.show();
          $($overlay).trigger('dxshown');
          assert.ok($overlayContent.is(':visible'), 'overlayContent is visible after dxshown event fired');
        });
        test('visibility actions not fired when visibility is not changed', function(assert) {
          var onShownCounter = sinon.stub();
          var onHiddenCounter = sinon.stub();
          var $overlay = $('#overlay').dxOverlay({
            onHidden: onHiddenCounter,
            visible: false
          });
          var overlay = $overlay.dxOverlay('instance');
          triggerHidingEvent($overlay);
          assert.strictEqual(onHiddenCounter.callCount, 0, 'onHidden action not fired');
          $overlay.dxOverlay('show');
          overlay.option('onShown', onShownCounter);
          triggerShownEvent($overlay);
          assert.strictEqual(onShownCounter.callCount, 0, 'onShown action not fired');
        });
        test('onHiding should be fired once after close and visibility change event', function(assert) {
          fx.off = false;
          var onHidingCounter = sinon.stub();
          var $overlay = $('#overlay').dxOverlay({
            onHiding: onHidingCounter,
            visible: true
          });
          $overlay.dxOverlay('hide');
          triggerHidingEvent($overlay);
          assert.strictEqual(onHidingCounter.callCount, 1, 'onHiding action fired once');
        });
        test('dxresize event should be fired only once when container shows first time (T306921)', function(assert) {
          assert.expect(2);
          var triggerFunction = visibilityChange.triggerResizeEvent;
          try {
            visibilityChange.triggerResizeEvent = function() {
              assert.ok(true, 'event triggered');
            };
            var $overlay = $('#overlay').dxOverlay({visible: true});
            var overlay = $overlay.dxOverlay('instance');
            overlay.hide();
            overlay.show();
          } finally {
            visibilityChange.triggerResizeEvent = triggerFunction;
          }
        });
        test('overlay should not close after click on content element in shadow dom (T1146455)', function(assert) {
          var content = $('<div>').get(0);
          var overlay = $('#overlay').dxOverlay({
            hideOnOutsideClick: true,
            contentTemplate: function() {
              return content;
            },
            visible: true
          }).dxOverlay('instance');
          overlay.show();
          content.attachShadow({mode: 'open'});
          content.shadowRoot.innerHTML = '<p>Inner Text</p>';
          var textElement = content.shadowRoot.querySelector('p');
          $(overlay.$content()).trigger($.Event('dxpointerdown', {target: textElement}));
          assert.strictEqual(overlay.option('visible'), true, 'Overlay should stay visible');
        });
        testModule('e.cancel', {beforeEach: function(assert) {
            var $__2 = this;
            this.onShown = sinon.stub();
            this.onHidden = sinon.stub();
            this.$overlay = $('#overlay').dxOverlay({
              onShown: this.onShown,
              onHidden: this.onHidden
            });
            this.overlay = this.$overlay.dxOverlay('instance');
            this.checkIsNotShown = function() {
              assert.notOk($__2.onShown.called, 'onShown should not be called');
            };
            this.checkIsShown = function() {
              assert.notOk($__2.$overlay.is(':hidden')), 'overlay is not hidden';
              assert.ok($__2.onShown.called, 'onShown should be called');
            };
            this.checkIsNotHidden = function() {
              assert.notOk($__2.$overlay.is(':hidden')), 'overlay is not hidden';
              assert.notOk($__2.onHidden.called, 'onHidden should not be called');
            };
            this.checkIsHidden = function() {
              assert.ok($__2.$overlay.is(':hidden')), 'overlay is hidden';
              assert.ok($__2.onHidden.called, 'onHidden should be called');
            };
          }}, function() {
          test('overlay should not be shown if e.cancel == true in the onShowing event handler (T825865)', function(assert) {
            this.overlay.option({onShowing: function(e) {
                return e.cancel = true;
              }});
            this.overlay.show();
            assert.ok(this.$overlay.is(':hidden'), 'overlay is hidden');
            this.checkIsNotShown();
          });
          test('overlay should not be hidden if e.cancel == true in the onHiding event handler', function(assert) {
            this.overlay.option({
              visible: true,
              onHiding: function(e) {
                return e.cancel = true;
              }
            });
            this.overlay.hide();
            this.checkIsNotHidden();
          });
          test('overlay should be shown after timeout if e.cancel == promise resolving false after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({onShowing: function(e) {
                e.cancel = new Promise(function(resolve) {
                  setTimeout(function() {
                    return resolve(false);
                  }, 0);
                });
              }});
            this.overlay.show();
            this.checkIsNotShown();
            setTimeout(function() {
              done();
              $__2.checkIsShown();
            }, 0);
          });
          test('overlay should be hidden after timeout if e.cancel == promise resolving false after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({
              visible: true,
              onHiding: function(e) {
                e.cancel = new Promise(function(resolve) {
                  setTimeout(function() {
                    return resolve(false);
                  }, 0);
                });
              }
            });
            this.overlay.hide();
            this.checkIsNotHidden();
            setTimeout(function() {
              done();
              $__2.checkIsHidden();
            }, 0);
          });
          test('overlay should not be shown after timeout if e.cancel == promise resolving true after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({onShowing: function(e) {
                e.cancel = new Promise(function(resolve) {
                  setTimeout(function() {
                    return resolve(true);
                  }, 0);
                });
              }});
            this.overlay.show();
            setTimeout(function() {
              done();
              $__2.checkIsNotShown();
            }, 0);
          });
          test('overlay should not be hidden after timeout if e.cancel == promise resolving true after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({
              visible: true,
              onHiding: function(e) {
                e.cancel = new Promise(function(resolve) {
                  setTimeout(function() {
                    return resolve(true);
                  }, 0);
                });
              }
            });
            this.overlay.hide();
            setTimeout(function() {
              done();
              $__2.checkIsNotHidden();
            }, 0);
          });
          test('overlay should be shown after timeout if e.cancel == promise rejecting after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({onShowing: function(e) {
                e.cancel = new Promise(function(_, reject) {
                  setTimeout(function() {
                    return reject();
                  }, 0);
                });
              }});
            this.overlay.show();
            this.checkIsNotShown();
            setTimeout(function() {
              done();
              $__2.checkIsShown();
            }, 0);
          });
          test('overlay should be hidden after timeout if e.cancel == promise rejecting after timeout', function(assert) {
            var $__2 = this;
            var done = assert.async();
            this.overlay.option({
              visible: true,
              onHiding: function(e) {
                e.cancel = new Promise(function(_, reject) {
                  setTimeout(function() {
                    return reject();
                  }, 0);
                });
              }
            });
            this.overlay.hide();
            this.checkIsNotHidden();
            setTimeout(function() {
              done();
              $__2.checkIsHidden();
            }, 0);
          });
          test('overlays content should be hidden on onShowig event (T1107193)', function(assert) {
            var $__2 = this;
            assert.expect(1);
            this.overlay.option({onShowing: function() {
                var isContentHidden = $($__2.overlay.content()).css('visibility') === 'hidden';
                assert.ok(isContentHidden, 'content is hidden');
              }});
            this.overlay.show();
          });
          test('overlay closing should not be cancelled if previous showing was cancelled (T1120608)', function(assert) {
            var shouldCancelOpening = true;
            var $overlay = $('#overlay').dxOverlay({onShowing: function(e) {
                e.cancel = shouldCancelOpening;
              }});
            var overlay = $overlay.dxOverlay('instance');
            var isVisible = function() {
              return !$overlay.is(':hidden');
            };
            overlay.show();
            assert.strictEqual(isVisible(), false, 'showing is cancelled');
            shouldCancelOpening = false;
            overlay.show();
            assert.strictEqual(isVisible(), true, 'showing is not cancelled');
            overlay.hide();
            assert.strictEqual(isVisible(), false, 'hiding is not cancelled');
          });
          test('overlay showing should not be cancelled if previous hiding was cancelled', function(assert) {
            var shouldCancelHiding = true;
            var $overlay = $('#overlay').dxOverlay({
              onHiding: function(e) {
                e.cancel = shouldCancelHiding;
              },
              visible: true
            });
            var overlay = $overlay.dxOverlay('instance');
            var isVisible = function() {
              return !$overlay.is(':hidden');
            };
            overlay.hide();
            assert.strictEqual(isVisible(), true, 'hiding is cancelled');
            shouldCancelHiding = false;
            overlay.hide();
            assert.strictEqual(isVisible(), false, 'hiding is not cancelled');
            overlay.show();
            assert.strictEqual(isVisible(), true, 'showing is not cancelled');
          });
          test('showing promise should be rejected if showing is cancelled', function(assert) {
            var done = assert.async();
            var overlay = $('#overlay').dxOverlay({onShowing: function(e) {
                e.cancel = true;
              }}).dxOverlay('instance');
            overlay.show().then(function() {
              assert.notOk(true, 'showing promise is resolved');
              done();
            }).catch(function() {
              assert.ok(true, 'showing promise is rejected');
              done();
            });
          });
          test('hiding promise should be rejected if hiding is cancelled', function(assert) {
            var done = assert.async();
            var overlay = $('#overlay').dxOverlay({
              onHiding: function(e) {
                e.cancel = true;
              },
              visible: true
            }).dxOverlay('instance');
            overlay.hide().then(function() {
              assert.notOk(true, 'hiding promise is resolved');
              done();
            }).catch(function() {
              assert.ok(true, 'hiding promise is rejected');
              done();
            });
          });
        });
      });
      testModule('position', moduleConfig, function() {
        test('position change should not show the content if the overlay is hidden', function(assert) {
          var instance = $('#overlay').dxOverlay().dxOverlay('instance');
          instance.option('position', {
            my: 'top left',
            at: 'top left',
            of: document
          });
          assert.ok(instance.$content().is(':hidden'));
        });
        test('position in string format should be parsed correctly', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            visible: true,
            position: 'top'
          });
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          assert.strictEqual($content.position().top, 0, 'overlay positioned correctly');
        });
        test('position should be correct on second showing (B238662, B232822)', function(assert) {
          var $overlay = $('#overlay').html('123').dxOverlay();
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          overlay.show();
          var firstPosition = $content.position();
          overlay.hide();
          overlay.show();
          var secondPosition = $content.position();
          assert.deepEqual(secondPosition, firstPosition);
        });
        test('position should be set up on first show', function(assert) {
          var $overlay = $('#overlay');
          $overlay.dxOverlay({
            visible: true,
            position: {
              my: 'left top',
              at: 'center',
              of: viewport()
            }
          });
          var position = viewport().find(toSelector(OVERLAY_CONTENT_CLASS)).position();
          assert.notEqual(position.left, 0);
          assert.notEqual(position.top, 0);
        });
        test('position of overlay is absolute when visualContainer is not window', function(assert) {
          $('#overlay').dxOverlay({
            visible: true,
            visualContainer: viewPort()
          });
          var $overlayWrapper = viewport().find(toSelector(OVERLAY_WRAPPER_CLASS));
          assert.strictEqual($overlayWrapper.css('position'), 'absolute');
        });
        test('wrapper should have 100% width and height when shading is disabled', function(assert) {
          $('#overlay').dxOverlay({
            visible: true,
            shading: false
          });
          var $overlayWrapper = viewport().find(toSelector(OVERLAY_WRAPPER_CLASS));
          var wrapperStyle = getComputedStyle($overlayWrapper.get(0));
          assert.strictEqual(parseInt(wrapperStyle.width), getWidth($(window)), 'width is 100%');
          assert.strictEqual(parseInt(wrapperStyle.height), getHeight($(window)), 'height is 100%');
        });
        test('overlay should be correctly animated with custom \'animation.show.to\'', function(assert) {
          var $container = $('<div>').css({
            height: '500px',
            position: 'relative'
          }).appendTo('#qunit-fixture');
          var $content = $('<div>').css({
            height: '100px',
            position: 'absolute',
            top: '100px'
          }).appendTo($container);
          var widgetPosition = {
            my: 'bottom',
            at: 'bottom',
            of: $content
          };
          var $overlay = $('#overlay').dxOverlay({
            container: $container,
            position: widgetPosition,
            animation: {show: {to: {opacity: 0}}}
          });
          var overlay = $overlay.dxOverlay('instance');
          var $overlayContent = overlay.$content();
          overlay.show();
          var expectedPosition = positionUtils.calculate($overlayContent, widgetPosition);
          assert.deepEqual(positionUtils.setup($overlayContent), {
            top: expectedPosition.v.location,
            left: expectedPosition.h.location
          }, 'overlay positioned correctly');
        });
        test('position as function', function(assert) {
          sinon.spy(errors, 'log');
          try {
            var overlay = $('#overlay').dxOverlay({
              visible: true,
              position: function() {
                return {
                  my: 'left',
                  at: 'left',
                  of: 'body',
                  offset: '7 0'
                };
              }
            }).dxOverlay('instance');
            var $content = overlay.$content();
            assert.strictEqual($content.position().left, $('body').position().left + 7, 'overlay positioned correctly');
            assert.strictEqual(errors.log.callCount, 1);
            assert.deepEqual(errors.log.lastCall.args, ['W0018']);
          } finally {
            errors.log.restore();
          }
        });
        test('overlay wrapper should have correct dimensions even when there is "target" property in window', function(assert) {
          $('<div>').css({
            width: 100,
            height: 100
          }).attr('id', 'target').appendTo('#qunit-fixture');
          $('#overlay').dxOverlay({visible: true});
          var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
          assert.roughEqual(getWidth($overlayWrapper), getWidth($(window)), 1.01, 'overlay wrapper width is correct');
          assert.roughEqual(getHeight($overlayWrapper), getHeight($(window)), 1.01, 'overlay wrapper height is correct');
        });
        test('position.of as an event', function(assert) {
          var event = $.Event('click', {target: $('#overlayInputTarget')});
          var overlay = $('#overlay').dxOverlay({
            visible: true,
            position: {
              my: 'top',
              at: 'top',
              of: event
            }
          }).dxOverlay('instance');
          var $content = overlay.$content();
          assert.strictEqual($content.position().top, event.target.position().top, 'overlay is positioned correctly');
        });
        test('overlay content should have correct position when position.boundary changes to window', function(assert) {
          var $boundary = $('<div>').css({
            width: 20,
            height: 30
          }).appendTo('#qunit-fixture');
          var contentWidth = 25;
          var contentHeight = 35;
          var overlay = $('#overlay').dxOverlay({
            visible: true,
            width: contentWidth,
            height: contentHeight,
            animation: null,
            position: {
              collision: 'fit',
              boundary: $boundary
            }
          }).dxOverlay('instance');
          var $overlayContent = overlay.$content();
          var contentOffset = $overlayContent.offset();
          var boundaryOffset = $boundary.offset();
          assert.roughEqual(contentOffset.top, boundaryOffset.top, 1.01, 'top border of the content is correct');
          assert.roughEqual(contentOffset.left, boundaryOffset.left, 1.01, 'left border of the content is correct');
          overlay.option('position.boundary', window);
          contentOffset = $overlayContent.offset();
          var contentCenterY = contentOffset.top + contentHeight / 2;
          var windowCenterY = window.innerHeight / 2;
          var contentCenterX = contentOffset.left + contentWidth / 2;
          var windowCenterX = window.innerWidth / 2;
          assert.roughEqual(contentCenterY, windowCenterY, 1.01, 'content is in the center of window vertically');
          assert.roughEqual(contentCenterX, windowCenterX, 1.01, 'content is in the center of window horizontally');
        });
      });
      testModule('shading', moduleConfig, function() {
        [true, false].forEach(function(value) {
          test('render shading', function(assert) {
            var overlay = $('#overlay').dxOverlay({
              shading: value,
              visible: true
            }).dxOverlay('instance');
            var $wrapper = overlay.$wrapper();
            assert.strictEqual($wrapper.hasClass(OVERLAY_SHADER_CLASS), value, 'shader class is correct');
            assert.strictEqual(getComputedStyle($wrapper.get(0)).pointerEvents, value ? 'auto' : 'none', 'shading wrapper have correct pointer-events');
            overlay.option('shading', !value);
            assert.strictEqual($wrapper.hasClass(OVERLAY_SHADER_CLASS), !value, 'shader class is correct');
            assert.strictEqual(getComputedStyle($wrapper.get(0)).pointerEvents, !value ? 'auto' : 'none', 'shading wrapper have correct pointer-events');
          });
        });
        test('shading height should change after container resize (B237292)', function(assert) {
          var $container = $('#B237292_container');
          var overlay = $('#B237292_overlay').dxOverlay({
            visible: true,
            container: $container,
            position: {of: $container}
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          $container.width(200).height(300).offset({
            left: 100,
            top: 200
          });
          overlay.repaint();
          assert.strictEqual(getWidth($wrapper), 200);
          assert.strictEqual(getHeight($wrapper), 300);
          assert.strictEqual(locate($wrapper).left, 0);
          assert.strictEqual(locate($wrapper).top, 0);
        });
        test('shading color should be customized by option', function(assert) {
          var overlay = $('#overlay').dxOverlay({
            shading: true,
            shadingColor: 'rgb(255, 0, 0)',
            visible: true
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          assert.ok(/rgb\(255,\s?0,\s?0\)/.test($wrapper.css('backgroundColor')));
          overlay.option('shading', false);
          assert.ok(!/rgb\(255,\s?0,\s?0\)/.test($wrapper.css('backgroundColor')));
        });
      });
      testModule('dimensions', moduleConfig, function() {
        test('dimensions should be set correctly as number', function(assert) {
          var $content = $('#overlay').dxOverlay({
            visible: true,
            width: 20,
            height: 15
          }).dxOverlay('instance').$content();
          assert.strictEqual(getWidth($content), 20);
          assert.strictEqual(getHeight($content), 15);
          resizeCallbacks.fire();
          assert.strictEqual(getWidth($content), 20);
          assert.strictEqual(getHeight($content), 15);
        });
        test('dimensions should be set correctly as function', function(assert) {
          var $content = $('#overlay').dxOverlay({
            visible: true,
            width: function() {
              return getWidth($(window));
            },
            height: function() {
              return getHeight($(window));
            }
          }).dxOverlay('instance').$content();
          assert.strictEqual(getWidth($content), getWidth($(window)));
          assert.strictEqual(getHeight($content), getHeight($(window)));
          resizeCallbacks.fire();
          assert.strictEqual(getWidth($content), getWidth($(window)));
          assert.strictEqual(getHeight($content), getHeight($(window)));
        });
        test('dimensions should be shrunk correctly with max sizes specified', function(assert) {
          var $content = $('#overlay').dxOverlay({
            visible: true,
            width: 'auto',
            height: 'auto',
            maxWidth: 200,
            maxHeight: 200,
            contentTemplate: function() {
              return $('<div>').width(1000).height(1000);
            }
          }).dxOverlay('instance').$content();
          assert.strictEqual(getWidth($content), 200);
          assert.strictEqual(getHeight($content), 200);
        });
        test('dimensions should be shrunk correctly with max sizes changes dynamically', function(assert) {
          var instance = $('#overlay').dxOverlay({
            visible: true,
            width: 'auto',
            height: 'auto',
            contentTemplate: function() {
              return $('<div>').width(1000).height(1000);
            }
          }).dxOverlay('instance');
          var $content = instance.$content();
          instance.option('maxWidth', 200);
          assert.strictEqual(getWidth($content), 200);
          instance.option('maxHeight', 200);
          assert.strictEqual(getHeight($content), 200);
        });
        test('dimensions should be expanded correctly with min sizes specified', function(assert) {
          var $content = $('#overlay').dxOverlay({
            visible: true,
            width: 'auto',
            height: 'auto',
            minWidth: 200,
            minHeight: 200
          }).dxOverlay('instance').$content();
          assert.strictEqual(getWidth($content), 200);
          assert.strictEqual(getHeight($content), 200);
        });
        test('dimensions should be shrunk correctly with min sizes changes dynamically', function(assert) {
          var instance = $('#overlay').dxOverlay({
            visible: true,
            width: 'auto',
            height: 'auto'
          }).dxOverlay('instance');
          var $content = instance.$content();
          instance.option('minWidth', 200);
          assert.strictEqual(getWidth($content), 200);
          instance.option('minHeight', 200);
          assert.strictEqual(getHeight($content), 200);
        });
        test('overlay wrapper dimensions should be equal to document client dimensions when container is window', function(assert) {
          var overlay = $('#overlay').dxOverlay({visible: true}).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          var documentElement = document.documentElement;
          assert.roughEqual(getHeight($wrapper), window.innerHeight, 1.01, 'wrapper height is equal to document client height');
          assert.roughEqual(getWidth($wrapper), documentElement.clientWidth, 1.01, 'wrapper width is equal to document client width');
        });
        test('overlay wrapper should cover all window without scrollbar when container is window', function(assert) {
          $('#qunit-fixture').prepend($('<div>').css({height: 2000}));
          var overlay = $('#overlay').dxOverlay({visible: true}).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          var documentElement = document.documentElement;
          assert.roughEqual(getHeight($wrapper), documentElement.clientHeight, 1.01, 'wrapper height is equal to document client height');
          assert.roughEqual(getWidth($wrapper), documentElement.clientWidth, 1.01, 'wrapper width is equal to document client width');
        });
      });
      testModule('animation', moduleConfig, function() {
        test('correct animation should be present', function(assert) {
          var originAnimate = fx.animate;
          try {
            fx.animate = function($element, config) {
              if (instance.$content().get(0) === $element.get(0)) {
                lastConfig = config;
              }
            };
            var showConfig = {
              type: 'pop',
              duration: 200
            };
            var hideConfig = {
              type: 'slide',
              duration: 100
            };
            var lastConfig;
            var instance = $('#overlay').dxOverlay({animation: {
                show: showConfig,
                hide: hideConfig
              }}).dxOverlay('instance');
            instance.show();
            assert.strictEqual(lastConfig.duration, showConfig.duration, 'animate on show: correct type');
            assert.strictEqual(lastConfig.type, showConfig.type, 'animate on show: correct duration');
            instance.hide();
            assert.strictEqual(lastConfig.type, hideConfig.type, 'animate on hide: correct type');
            assert.strictEqual(lastConfig.duration, hideConfig.duration, 'animate on hide: correct duration');
          } finally {
            fx.animate = originAnimate;
          }
        });
        test('animation complete callback arguments should be correct', function(assert) {
          var originAnimate = fx.animate;
          fx.animate = function($element, config) {
            config.complete($element, config);
          };
          try {
            var showArgs;
            var hideArgs;
            var showConfig = {
              type: 'pop',
              complete: function() {
                showArgs = arguments;
              }
            };
            var hideConfig = {
              type: 'pop',
              complete: function() {
                hideArgs = arguments;
              }
            };
            var instance = $('#overlay').dxOverlay({animation: {
                show: showConfig,
                hide: hideConfig
              }}).dxOverlay('instance');
            instance.show();
            assert.strictEqual(showArgs.length, 2, 'animate on show: correct type');
            instance.hide();
            assert.strictEqual(hideArgs.length, 2, 'animate on hide: correct type');
          } finally {
            fx.animate = originAnimate;
          }
        });
        test('no merging for animation option should be present', function(assert) {
          var overlay = $('#overlay').dxOverlay({animation: {
              type: 'pop',
              show: {
                from: {opacity: 0},
                to: {opacity: 1}
              },
              hide: {
                from: {opacity: 1},
                to: {opacity: 0}
              }
            }}).dxOverlay('instance');
          overlay.option('animation', {
            type: 'slide',
            show: {
              from: {left: 0},
              to: {left: 100}
            },
            hide: {
              from: {left: 100},
              to: {left: 0}
            }
          });
          var animation = overlay.option('animation');
          assert.strictEqual(animation.show.from.opacity, undefined, 'opacity not merged');
          assert.strictEqual(animation.show.to.opacity, undefined, 'opacity not merged');
          assert.strictEqual(animation.hide.from.opacity, undefined, 'opacity not merged');
          assert.strictEqual(animation.hide.to.opacity, undefined, 'opacity not merged');
        });
        test('dispose should stop animation before complete show', function(assert) {
          var done = assert.async();
          var $overlay = $('#overlay').dxOverlay({animation: {show: {
                type: 'pop',
                duration: 500
              }}});
          var overlay = $overlay.dxOverlay('instance');
          overlay.show();
          overlay.on('disposing', function() {
            assert.ok(!fx.isAnimating($overlay));
            done();
          });
          $overlay.remove();
        });
        test('dispose should stop animation before complete hide', function(assert) {
          var done = assert.async();
          var $overlay = $('#overlay').dxOverlay({animation: {hide: {
                type: 'pop',
                duration: 500
              }}});
          var overlay = $overlay.dxOverlay('instance');
          overlay.show().done(function() {
            overlay.hide();
            overlay.on('disposing', function() {
              assert.ok(!fx.isAnimating($overlay));
              done();
            });
            $overlay.remove();
          });
        });
        test('\'animation.show.to.position\' should be configured according to widget option \'position\'', function(assert) {
          var origFX = fx.animate;
          try {
            var widgetPosition = {
              my: 'top',
              at: 'top',
              of: window,
              boundaryOffset: {
                h: 0,
                v: 0
              }
            };
            var animationShowToPosition = {
              my: 'bottom',
              at: 'bottom',
              of: window
            };
            var $overlay = $('#overlay').dxOverlay({
              position: widgetPosition,
              animation: {show: {to: {position: animationShowToPosition}}}
            });
            var overlay = $overlay.dxOverlay('instance');
            fx.animate = function(_, config) {
              assert.strictEqual(config.type, 'slide', 'slide animation set');
              assert.deepEqual(config.to.position, widgetPosition, 'to position animation set');
            };
            overlay.show();
          } finally {
            fx.animate = origFX;
          }
        });
        test('\'animation.hide.from.position\' should be configured according to widget option \'position\'', function(assert) {
          var origFX = fx.animate;
          try {
            var widgetPosition = {
              my: 'top',
              at: 'top',
              of: window,
              boundaryOffset: {
                h: 0,
                v: 0
              }
            };
            var animationShowToPosition = {
              my: 'bottom',
              at: 'bottom',
              of: window
            };
            var $overlay = $('#overlay').dxOverlay({
              position: widgetPosition,
              animation: {hide: {from: {position: animationShowToPosition}}},
              visible: true
            });
            var overlay = $overlay.dxOverlay('instance');
            fx.animate = function(_, config) {
              assert.strictEqual(config.type, 'slide', 'slide animation set');
              assert.deepEqual(config.from.position, widgetPosition, 'from position animation set');
            };
            overlay.hide();
          } finally {
            fx.animate = origFX;
          }
        });
        test('pointer events should be disabled during hide animation', function(assert) {
          assert.expect(2);
          if (!$('body').css('pointerEvents')) {
            assert.expect(0);
            return;
          }
          var animationConfig = {
            duration: 0,
            start: function() {
              assert.strictEqual(instance.$content().css('pointerEvents'), 'none', 'start of the hiding animation has correct pointer-events');
            },
            complete: function() {
              assert.strictEqual(instance.$content().css('pointerEvents'), originalPointerEvents, 'complete of the hiding animation has correct pointer-events');
            }
          };
          var $element = $('#overlay').dxOverlay({
            visible: true,
            animation: {hide: animationConfig}
          });
          var instance = $element.dxOverlay('instance');
          var originalPointerEvents = instance.$content().css('pointerEvents');
          instance.hide();
        });
        test('overlay should be able to get animation function', function(assert) {
          assert.expect(1);
          var origFX = fx.animate;
          try {
            fx.animate = function(_, config) {
              assert.strictEqual(config.type, 'fade', 'slide animation should be executed');
            };
            var $element = $('#overlay').dxOverlay({
              animation: function() {
                return {hide: {type: 'fade'}};
              },
              visible: true
            });
            var instance = $element.dxOverlay('instance');
            instance.hide();
          } finally {
            fx.animate = origFX;
          }
        });
        test('animation should be stopped on geometry rerendering (T1104748)', function(assert) {
          fx.off = false;
          try {
            var overlay = $('#overlay').dxOverlay({animation: {show: {
                  type: 'fade',
                  duration: 1000,
                  from: {opacity: 0},
                  to: {opacity: 1}
                }}}).dxOverlay('instance');
            var $content = overlay.$content();
            overlay.show();
            overlay.option('position', {of: 'body'});
            assert.notOk(fx.isAnimating($content), 'animation is stopped after position option change');
          } finally {
            fx.off = true;
          }
        });
      });
      testModule('content', moduleConfig, function() {
        test('content ready action should be fired if was set at initialization', function(assert) {
          var contentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({onContentReady: contentReadyStub}).dxOverlay('instance');
          instance.show();
          instance.hide();
          instance.show();
          assert.strictEqual(contentReadyStub.callCount, 1);
        });
        test('content ready action should be fired if was set thought option', function(assert) {
          var contentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({onContentReady: contentReadyStub}).dxOverlay('instance');
          var newContentReadyStub = sinon.stub();
          instance.option('onContentReady', newContentReadyStub);
          instance.show();
          instance.hide();
          instance.show();
          assert.ok(contentReadyStub.notCalled);
          assert.ok(newContentReadyStub.calledOnce);
        });
        test('content ready action should be fired if was set thought method', function(assert) {
          var contentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({onContentReady: contentReadyStub}).dxOverlay('instance');
          var newContentReadyStub = sinon.stub();
          instance.on('contentReady', newContentReadyStub);
          instance.show();
          instance.hide();
          instance.show();
          assert.ok(contentReadyStub.calledOnce);
          assert.ok(newContentReadyStub.calledOnce);
        });
        test('content should be rendered only once after repaint', function(assert) {
          var contentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({
            visible: true,
            onContentReady: contentReadyStub
          }).dxOverlay('instance');
          instance.repaint();
          assert.ok(contentReadyStub.calledOnce);
        });
        test('"repaint" should trigger content rendering in case it was not created', function(assert) {
          var contentReadyStub = sinon.stub();
          var $container = $('<div>').appendTo('#qunit-fixture').hide();
          var $widget = $('<div>').appendTo($container);
          var instance = $widget.dxOverlay({
            visible: true,
            onContentReady: contentReadyStub
          }).dxOverlay('instance');
          $container.show();
          instance.repaint();
          assert.ok(contentReadyStub.calledOnce);
        });
        test('content shouldn`t clean when component is renovated', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            isRenovated: true,
            contentTemplate: 'template',
            visible: true
          });
          var instance = $overlay.dxOverlay('instance');
          var $content = instance.$content();
          var contentRenderSpy = sinon.spy($content, 'empty');
          instance.option({
            visible: false,
            contentTemplate: 'template1'
          });
          assert.equal(contentRenderSpy.callCount, 0);
        });
        test('content should be rendered only once after resize', function(assert) {
          var contentReadyStub = sinon.stub();
          $('#overlay').dxOverlay({
            visible: true,
            animation: null,
            onContentReady: contentReadyStub
          });
          resizeCallbacks.fire();
          assert.ok(contentReadyStub.calledOnce);
        });
        test('content should be rendered only once after container change', function(assert) {
          var contentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({
            visible: true,
            animation: null,
            onContentReady: contentReadyStub,
            container: '#overlayInTargetContainer'
          }).dxOverlay('instance');
          instance.option('container', null);
          assert.ok(contentReadyStub.calledOnce);
        });
        test('contentTemplate should use correct contentElement', function(assert) {
          $('#overlay').dxOverlay({
            visible: true,
            contentTemplate: function(contentElement) {
              assert.strictEqual(isRenderer(contentElement), !!config().useJQuery, 'contentElement is correct');
            }
          });
        });
        test('anonymous content template rendering', function(assert) {
          var $contentElement = $('#overlayWithAnonymousTmpl #content');
          var $overlay = $('#overlayWithAnonymousTmpl').dxOverlay({visible: true});
          var $content = $overlay.dxOverlay('$content');
          assert.strictEqual($content.children()[0], $contentElement[0], 'content element preserved');
        });
        test('custom content template', function(assert) {
          var $overlay = $('#overlayWithContentTemplate').dxOverlay({
            contentTemplate: 'custom',
            visible: true
          });
          var $content = $($overlay.dxOverlay('instance').$content());
          assert.strictEqual($content.children().length, 1, 'Overlay content has only one child');
          assert.strictEqual($.trim($content.text()), 'TestContent', 'Overlay content text is correct');
        });
        test('wrong content template name is specified', function(assert) {
          var $overlay = $('#overlayWithWrongTemplateName').dxOverlay({
            contentTemplate: 'custom',
            visible: true
          });
          var $content = $overlay.dxOverlay('instance').$content();
          assert.strictEqual($.trim($content.text()), 'custom', 'content has no text');
        });
        test('contentTemplate option accepts template instance', function(assert) {
          var $template = $('<div>').text('test');
          var $overlay = $('#overlay').dxOverlay({
            contentTemplate: new Template($template),
            visible: true
          });
          var $content = $overlay.dxOverlay('instance').$content();
          assert.strictEqual($.trim($content.text()), 'test', 'template rendered');
        });
        test('contentTemplate option support dynamic change', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            contentTemplate: 'template1',
            visible: true
          });
          $overlay.dxOverlay('option', 'contentTemplate', 'template2');
          assert.strictEqual($.trim($overlay.dxOverlay('$content').text()), 'template2', 'template rerendered');
        });
        test('contentTemplate option support dynamic change in a set of options', function(assert) {
          var overlay = $('#overlay').dxOverlay({
            contentTemplate: 'template1',
            visible: true
          }).dxOverlay('instance');
          overlay.hide();
          overlay.option({
            contentTemplate: 'template2',
            visible: true
          });
          assert.strictEqual(overlay.$content().text(), 'template2', 'template rerendered correctly');
        });
      });
      testModule('defer rendering', moduleConfig, function() {
        test('behavior if option set to true', function(assert) {
          var onContentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({onContentReady: onContentReadyStub}).dxOverlay('instance');
          assert.ok(onContentReadyStub.notCalled, 'after widget render content still not render');
          instance.show();
          assert.ok(onContentReadyStub.calledOnce, 'after overlay show, content is rendered');
        });
        test('behavior if option set to false', function(assert) {
          var onContentReadyStub = sinon.stub();
          var instance = $('#overlay').dxOverlay({
            deferRendering: false,
            onContentReady: onContentReadyStub
          }).dxOverlay('instance');
          assert.ok(onContentReadyStub.calledOnce, 'after overlay render, content is render too');
          instance.show();
          assert.ok(onContentReadyStub.calledOnce, 'after show overlay content do not render');
        });
        test('content ready should be fired correctly when async template is used', function(assert) {
          var clock = sinon.useFakeTimers();
          var contentIsRendered = false;
          $('#overlay').dxOverlay({
            templatesRenderAsynchronously: true,
            deferRendering: false,
            onContentReady: function() {
              assert.ok(contentIsRendered, 'Content is rendered before content ready firing');
            },
            integrationOptions: {templates: {'content': {render: function(args) {
                    setTimeout(function() {
                      contentIsRendered = true;
                      args.onRendered();
                    }, 100);
                  }}}}
          });
          clock.tick(100);
          clock.restore();
        });
      });
      testModule('close on outside click', moduleConfig, function() {
        ['closeOnOutsideClick', 'hideOnOutsideClick'].forEach(function(closeOnOutsideClickOptionName) {
          test('overlay should be hidden after click outside was present', function(assert) {
            var $__3;
            var overlay = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            var $content = overlay.$content();
            $($content).trigger('dxpointerdown');
            assert.strictEqual(overlay.option('visible'), true, 'overlay is not hidden');
            $(document).trigger('dxpointerdown');
            assert.strictEqual(overlay.option('visible'), false, 'overlay is hidden');
          });
          test('overlay should be hidden after click outside was present if a function is passed to the property', function(assert) {
            var $__3;
            var overlay = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: function() {
                return true;
              },
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            var $content = overlay.$content();
            $($content).trigger('dxpointerdown');
            assert.strictEqual(overlay.option('visible'), true, 'overlay is not hidden');
            $(document).trigger('dxpointerdown');
            assert.strictEqual(overlay.option('visible'), false, 'overlay is hidden');
          });
          test('overlay should not be hidden after click inside was present', function(assert) {
            var $__3;
            var $overlay = $('#overlay');
            $('<div id=\'innerContent\'>').appendTo($overlay);
            var overlay = $overlay.dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            pointerMock($('#innerContent', $overlay)).start().wait(600).click();
            assert.strictEqual(overlay.option('visible'), true, 'overlay is not hidden');
          });
          test('click in the inner overlay should not be an outside click', function(assert) {
            var $__3,
                $__4;
            var overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            var overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "innerOverlay", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "propagateOutsideClick", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4)).dxOverlay('instance');
            $(overlay2.$content()).trigger('dxpointerdown');
            assert.equal(overlay1.option('visible'), true, 'Bottom overlay should not get outside click when inner overlay clicked');
          });
          test('overlay should not be hidden after click in detached element', function(assert) {
            var $__3;
            var overlay = $('#overlayWithAnonymousTmpl').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            $('#content').on('dxpointerdown', function(e) {
              $('#content').replaceWith($('<div>').attr('id', 'content'));
            });
            $('#content').trigger('dxpointerdown');
            assert.strictEqual(overlay.option('visible'), true, 'overlay is not hidden');
          });
          test('overlay should not propagate events after click outside was present', function(assert) {
            var $__3;
            $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "shading", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var downEvent = $.Event('dxpointerdown', {pointerType: 'mouse'});
            $(document).trigger(downEvent);
            assert.ok(downEvent.isDefaultPrevented(), 'default prevented');
          });
          test('overlay should propagate events when shading is false (T181002)', function(assert) {
            var $__3;
            $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "shading", {
              value: false,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var downEvent = $.Event('dxpointerdown', {pointerType: 'mouse'});
            $(document).trigger(downEvent);
            assert.ok(!downEvent.isDefaultPrevented(), 'default is not prevented');
          });
          test('outside click should close several overlays if propagateOutsideClick option of top overlay is true', function(assert) {
            var $__3,
                $__4;
            var overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            var overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: false,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "propagateOutsideClick", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4)).dxOverlay('instance');
            $('body').trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), false, 'First overlay is hidden');
            assert.strictEqual(overlay2.option('visible'), true, 'Second overlay is visible');
          });
          test('customer should control closing of other overlays when some overlay content clicked', function(assert) {
            var $__3,
                $__4;
            var overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3)).dxOverlay('instance');
            var overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "propagateOutsideClick", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4)).dxOverlay('instance');
            $(overlay2.$content()).trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), false, 'Bottom overlay should get outside click when other overlay clicked');
            assert.strictEqual(overlay2.option('visible'), true, 'Second overlay is visible');
            overlay1.show();
            overlay2.option(closeOnOutsideClickOptionName, function(e) {
              return !e.target.closest(toSelector(OVERLAY_CONTENT_CLASS));
            });
            $(overlay1.$content()).trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), true, 'First overlay is visible');
            assert.strictEqual(overlay2.option('visible'), true, 'Closing should be prevented by a user-defined function');
          });
          test('overlays\' priority', function(assert) {
            var $__3,
                $__4;
            var $overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var overlay1 = $overlay1.dxOverlay('instance');
            var $overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var overlay2 = $overlay2.dxOverlay('instance');
            $(overlay2.$content()).trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), true, 'First overlay is NOT hidden, because it\'s NOT active');
            assert.strictEqual(overlay2.option('visible'), true, 'Second overlay is visible');
            $('body').trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), true, 'First overlay is NOT hidden, because it\'s NOT active');
            assert.strictEqual(overlay2.option('visible'), false, 'Second overlay is hidden, because it is active');
            $('body').trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), false, 'First overlay is now hidden, because it has become active');
          });
          test('closeOnOutsideClick works after first overlay hiding', function(assert) {
            var $__3,
                $__4;
            var $overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var overlay1 = $overlay1.dxOverlay('instance');
            var $overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var overlay2 = $overlay2.dxOverlay('instance');
            overlay1.hide();
            $('body').trigger('dxpointerdown');
            assert.strictEqual(overlay1.option('visible'), false, 'First overlay is hidden, because of calling hide');
            assert.strictEqual(overlay2.option('visible'), false, 'Second overlay is hidden, because of outsideclick');
          });
          test('document events should be unsubscribed at each overlay hiding', function(assert) {
            var $__3,
                $__4;
            var $overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var instance1 = $overlay1.dxOverlay('instance');
            var $overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var instance2 = $overlay2.dxOverlay('instance');
            assert.ok(instance1.option('visible'), 'overlay1 is shown');
            assert.ok(instance2.option('visible'), 'overlay2 is shown');
            $('body').trigger('dxpointerdown');
            assert.ok(instance1.option('visible'), 'overlay1 is shown');
            assert.ok(!instance2.option('visible'), 'overlay2 is hidden');
            $('body').trigger('dxpointerdown');
            assert.ok(!instance1.option('visible'), 'overlay1 is hidden');
            assert.ok(!instance2.option('visible'), 'overlay2 is hidden');
          });
          test((closeOnOutsideClickOptionName + " does not close back widget while front widget is still animated"), function(assert) {
            var $__3,
                $__4;
            var $overlay1 = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__3, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var instance1 = $overlay1.dxOverlay('instance');
            var $overlay2 = $('#overlay2').dxOverlay(($__4 = {}, Object.defineProperty($__4, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__4, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__4));
            var instance2 = $overlay2.dxOverlay('instance');
            try {
              fx.off = false;
              $('body').trigger('dxpointerdown');
              $(instance2.$content()).trigger('dxpointerdown');
              assert.ok(!instance2.option('visible'), 'second overlay is hidden');
              assert.ok(instance1.option('visible'), 'first overlay is not hidden');
            } finally {
              fx.off = true;
            }
          });
          test('click on overlay during the start animation should end the animation (T273294)', function(assert) {
            var $__3;
            var $overlay = $('#overlay').dxOverlay(($__3 = {}, Object.defineProperty($__3, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            var overlay = $overlay.dxOverlay('instance');
            try {
              fx.off = false;
              overlay.show();
              $(overlay.$content()).trigger('dxpointerdown');
              assert.ok(overlay.option('visible'), 'overlay is stay visible');
            } finally {
              fx.off = true;
            }
          });
        });
        test('closeOnOutsideClick option using should raise a warning about deprecation', function(assert) {
          sinon.spy(errors, 'log');
          try {
            $('#overlay').dxOverlay({closeOnOutsideClick: true});
            assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxOverlay', 'closeOnOutsideClick', '22.1', 'Use the \'hideOnOutsideClick\' option instead'], 'warning is raised with correct parameters');
          } finally {
            errors.log.restore();
          }
        });
      });
      testModule('reset focus', moduleConfig, function() {
        QUnit.testInActiveWindow('inputs inside should loose focus when overlay is hidden with animation disabled', function(assert) {
          var focusOutStub = sinon.stub();
          var $input = $('<input id=\'alter-box\' />').on('focusout', focusOutStub);
          var overlay = $('#overlay').dxOverlay({
            animation: false,
            shading: false,
            visible: true,
            contentTemplate: function(contentElement) {
              return $(contentElement).append($input);
            }
          }).dxOverlay('instance');
          $input.focus();
          overlay.hide();
          assert.strictEqual(focusOutStub.called, true, 'input lost focus');
        });
        QUnit.testInActiveWindow('there is no errors when overlay try reset active element', function(assert) {
          var $input = $('<input>');
          var overlay = $('#overlay').dxOverlay({
            animation: false,
            shading: false,
            visible: true,
            contentTemplate: function(contentElement) {
              $(contentElement).append($input);
            }
          }).dxOverlay('instance');
          var isOK = true;
          $input.focus();
          $input[0].blur = null;
          try {
            overlay.hide();
          } catch (e) {
            isOK = false;
          }
          assert.ok(isOK, 'overlay reset active element without error');
        });
      });
      testModule('close on target scroll', moduleConfig, function() {
        test('overlay should be hidden if any of target\'s parents were scrolled', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            hideOnParentScroll: true,
            container: $('#test'),
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $('#overlayInputTarget')
            },
            visible: true
          });
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($content.is(':visible'), false, 'overlay should be hidden after scroll event on any parent');
        });
        test('overlay should not be hidden on parents scroll if show animation is not completed', function(assert) {
          fx.off = false;
          var overlay = $('#overlay').dxOverlay({
            hideOnParentScroll: true,
            container: $('#test'),
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $('#overlayInputTarget')
            },
            visible: false,
            animation: {show: {duration: 100}}
          }).dxOverlay('instance');
          overlay.show();
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual(overlay.option('visible'), true, 'overlay should not be hidden if show animation is not completed');
        });
        test('overlay should be hidden if any of jQuery Event target\'s parents were scrolled', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            hideOnParentScroll: true,
            container: $('#test'),
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $.Event('dxpointerdown', {
                pointerType: 'mouse',
                pageX: 50,
                pageY: 50,
                target: $('#overlayInputTarget').get(0)
              })
            },
            visible: true
          });
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($content.is(':visible'), false, 'Overlay should be hidden after scroll event on any parent');
        });
        test('overlay should not be hidden on any target\'s parents scroll events if option set to false', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            hideOnParentScroll: false,
            container: $('#test'),
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $('#overlayInputTarget')
            },
            visible: true
          });
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($content.is(':visible'), true, 'Overlay should not be hidden as this ability is disabled');
        });
        test('overlay should be hidden on window scroll event on desktop', function(assert) {
          var originalDevice = {
            platform: devices.real().platform,
            deviceType: devices.real().deviceType
          };
          try {
            devices.real({
              platform: 'generic',
              deviceType: 'desktop'
            });
            var $overlay = $('#overlay').dxOverlay({hideOnParentScroll: true});
            var overlay = $overlay.dxOverlay('instance');
            var $content = overlay.$content();
            overlay.show();
            $(window).triggerHandler('scroll');
            assert.strictEqual($content.is(':visible'), false, 'Overlay should be hidden after scroll event on window');
          } finally {
            devices.real(originalDevice);
          }
        });
        test('overlay should not be hidden on window scroll event on mobile devices', function(assert) {
          var originalDevice = {
            platform: devices.real().platform,
            deviceType: devices.real().deviceType
          };
          try {
            devices.real({
              platform: 'ios',
              deviceType: 'phone'
            });
            var $overlay = $('#overlay').dxOverlay({hideOnParentScroll: true});
            var overlay = $overlay.dxOverlay('instance');
            var $content = overlay.$content();
            overlay.show();
            $(window).triggerHandler('scroll');
            assert.strictEqual($content.is(':visible'), true, 'Overlay should not be hidden after scroll event on window');
          } finally {
            devices.real(originalDevice);
          }
        });
        test('hiding & hidden should be fired if closing by scroll event when overlay initially visible', function(assert) {
          assert.expect(2);
          var $overlay = $('#overlay').dxOverlay({
            visible: true,
            hideOnParentScroll: true,
            container: $('#test'),
            position: {
              my: 'left top',
              at: 'left bottom',
              of: '#overlayInputTarget'
            },
            onHiding: function() {
              assert.ok(true, 'hiding action fired');
            },
            onHidden: function() {
              assert.ok(true, 'hidden action fired');
            }
          });
          var overlay = $overlay.dxOverlay('instance');
          overlay.show();
          $('#parentContainer').triggerHandler('scroll');
        });
        test('scroll subscriptions should be unsubscribed from subscribed elements', function(assert) {
          var $target = $('#overlayInputTarget');
          var $container = $('#test');
          var $overlay = $('#overlay').dxOverlay({
            hideOnParentScroll: true,
            container: $container,
            position: {
              my: 'left top',
              at: 'left bottom',
              of: $target
            },
            visible: true
          });
          var overlay = $overlay.dxOverlay('instance');
          var containerParent = $container.parent().get(0);
          $target.detach();
          overlay.hide();
          var parentEvents = $._data(containerParent).events || {};
          assert.strictEqual('scroll' in parentEvents, false, 'scroll unsubscribed');
        });
        test('all opened overlays should be closed on scroll', function(assert) {
          var container = $('#overlayInputTarget');
          var $overlay1 = $('#overlay').dxOverlay({
            hideOnParentScroll: true,
            visible: true,
            container: container
          });
          var $overlay2 = $('#overlay2').dxOverlay({
            hideOnParentScroll: true,
            visible: true,
            container: container
          });
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($overlay1.dxOverlay('option', 'visible'), false, 'overlay1 closed');
          assert.strictEqual($overlay2.dxOverlay('option', 'visible'), false, 'overlay2 closed');
        });
        test('target scroll subscriptions should be unsubscribed for current overlay', function(assert) {
          var $target = $('#overlayInputTarget');
          var $overlay1 = $('#overlay').dxOverlay({
            hideOnParentScroll: function() {
              return $overlay2.dxOverlay('option', 'visible');
            },
            container: $('#test'),
            position: {of: $target},
            visible: true
          });
          var $overlay2 = $('#overlay2').dxOverlay({
            hideOnParentScroll: true,
            container: $('#overlay'),
            position: {of: $target},
            visible: true
          });
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($overlay1.dxOverlay('option', 'visible'), true, 'overlay1 opened');
          $('#parentContainer').triggerHandler('scroll');
          assert.strictEqual($overlay1.dxOverlay('option', 'visible'), false, 'overlay1 closed');
        });
      });
      testModule('container', moduleConfig, function() {
        test('wrapper should have width and height css attributes equal to container width and height', function(assert) {
          var $container = $('#customTargetContainer');
          $container.css({
            width: 100,
            height: 100
          });
          var overlay = $('#overlay').dxOverlay({
            container: $container,
            visible: true
          }).dxOverlay('instance');
          var wrapperElement = overlay.$wrapper().get(0);
          assert.strictEqual(wrapperElement.style.width, '100px', 'width is correct');
          assert.strictEqual(wrapperElement.style.height, '100px', 'height is correct');
        });
        test('wrapper width and height should be restored after container option value changed to window (T937118)', function(assert) {
          var $container = $('#customTargetContainer');
          $container.css({
            width: 100,
            height: 100
          });
          var overlay = $('#overlay').dxOverlay({
            container: $container,
            visible: true
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          overlay.option('container', null);
          assert.strictEqual(getWidth($wrapper), getWidth($(window)), 'width is restored after container option value changed to window');
          assert.strictEqual(getHeight($wrapper), getHeight($(window)), 'height is restored after container option value changed to window');
        });
        QUnit.module('content markup move', {beforeEach: function() {
            var $__2 = this;
            this.$container = $('#customTargetContainer');
            this.isContentInContainer = function() {
              return $__2.$container.children(toSelector(OVERLAY_WRAPPER_CLASS)).length === 1;
            };
          }}, function() {
          test('content should be moved to container', function(assert) {
            var overlay = $('#overlay').dxOverlay({container: this.$container}).dxOverlay('instance');
            overlay.show();
            assert.ok(this.isContentInContainer(), 'content is in container');
          });
          test('content should be moved to container before content ready action', function(assert) {
            var $__2 = this;
            assert.expect(1);
            var overlay = $('#overlay').dxOverlay({
              container: this.$container,
              onContentReady: function() {
                assert.ok($__2.isContentInContainer(), 'content is in container');
              }
            }).dxOverlay('instance');
            overlay.show();
          });
          test('content should not be moved to container before content ready action if it is not visible', function(assert) {
            var $__2 = this;
            assert.expect(1);
            $('#overlay').dxOverlay({
              container: this.$container,
              onContentReady: function() {
                assert.notOk($__2.isContentInContainer(), 'content is not in container');
              },
              deferRendering: false
            });
          });
        });
        test('css classes from overlay should be duplicated to wrapper if "copyRootClassesToWrapper" is true', function(assert) {
          var instance = $('#overlayWithClass').dxOverlay({
            visible: true,
            copyRootClassesToWrapper: true
          }).dxOverlay('instance');
          var $wrapper = instance.$wrapper();
          assert.ok($wrapper.hasClass('something'), 'class added to wrapper');
          assert.ok($wrapper.hasClass('another'), 'another class added to wrapper');
          assert.ok($wrapper.hasClass(OVERLAY_WRAPPER_CLASS), 'classes does not removed from wrapper');
          assert.notOk($wrapper.hasClass(OVERLAY_CLASS), 'only user-defined classes added to wrapper');
        });
        test('css classes from overlay should not be duplicated to wrapper if "copyClassesToWrapper" is not specified', function(assert) {
          var instance = $('#overlayWithClass').dxOverlay({visible: true}).dxOverlay('instance');
          var $wrapper = instance.$wrapper();
          assert.notOk($wrapper.hasClass('something'), 'class was not added to wrapper');
          assert.notOk($wrapper.hasClass('another'), 'another class was not added to wrapper');
        });
        test('defaultTargetContainer should be .dx-viewport by default', function(assert) {
          var overlay = $('#overlay').dxOverlay().dxOverlay('instance');
          overlay.show();
          assert.strictEqual($(toSelector(VIEWPORT_CLASS)).children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 1);
          assert.strictEqual($('#parentContainer').children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 0);
        });
        test('content should be moved back to overlay element on hide (B253278)', function(assert) {
          var $overlay = $('#overlay').dxOverlay();
          var overlay = $overlay.dxOverlay('instance');
          overlay.show();
          overlay.hide();
          assert.ok($overlay.find(overlay.$content()).length, 'content moved back');
        });
        test('content should be moved to container on show (B253278)', function(assert) {
          var $overlay = $('#overlay').dxOverlay();
          var overlay = $overlay.dxOverlay('instance');
          overlay.show();
          overlay.hide();
          overlay.show();
          assert.ok(!$overlay.find(overlay.$content()).length, 'content moved back');
        });
        test('shader should be positioned relatively to container', function(assert) {
          var $container = $('<div>').css({
            height: '500px',
            position: 'relative'
          }).appendTo('#qunit-fixture');
          var $content = $('<div>').css({
            height: '100px',
            position: 'absolute',
            top: '100px'
          }).appendTo($container);
          var $overlay = $('#overlay').dxOverlay({
            container: $container,
            shading: true,
            position: {
              my: 'center center',
              at: 'center center',
              of: $content
            }
          });
          $overlay.dxOverlay('show');
          var $shader = $container.find(toSelector(OVERLAY_SHADER_CLASS));
          assert.ok(Math.abs(Math.round($shader.offset().top) - Math.round($container.offset().top)) <= 1, 'shader top position is correct');
          assert.strictEqual(getWidth($shader), getWidth($container), 'shader width is correct');
          assert.strictEqual(getHeight($shader), getHeight($container), 'shader height is correct');
        });
        [true, false].forEach(function(shading) {
          test(("wrapper should cover the container when target is container, shading=" + shading + "(T821559, T835358)"), function(assert) {
            var $targetContainer = $('#container');
            $targetContainer.css({
              height: 300,
              width: 200
            });
            $('#overlay').dxOverlay({
              shading: shading,
              container: $targetContainer,
              visible: true,
              position: {
                my: 'top right',
                at: 'top right',
                of: $targetContainer
              }
            });
            var $overlayWrapper = viewport().find(toSelector(OVERLAY_WRAPPER_CLASS));
            var wrapperRect = $overlayWrapper.get(0).getBoundingClientRect();
            var targetRect = $targetContainer.get(0).getBoundingClientRect();
            assert.roughEqual(wrapperRect.left, targetRect.left, 0.51, 'left coordinates are equal');
            assert.roughEqual(wrapperRect.top, targetRect.top, 0.51, 'top coordinates are equal');
            assert.strictEqual(wrapperRect.width, targetRect.width, 'width coordinates are equal');
            assert.strictEqual(wrapperRect.height, targetRect.height, 'height coordinates are equal');
            assert.strictEqual(wrapperRect.height, 300, 'wrapper height is ok');
            assert.strictEqual(wrapperRect.width, 200, 'wrapper width is ok');
          });
        });
        test('overlay should render inside of container when target is container(T821559)', function(assert) {
          var $container = $('#container');
          $container.css({
            height: 300,
            width: 200
          });
          var $overlay = $('#overlay').dxOverlay({
            container: $container,
            shading: false,
            position: {of: $container},
            width: '50%',
            height: '50%'
          });
          $overlay.dxOverlay('show');
          var $content = $container.find(toSelector(OVERLAY_CONTENT_CLASS));
          assert.strictEqual(getHeight($content), getHeight($container) * 0.5, 'overlay height is correct');
          assert.strictEqual(getWidth($content), getWidth($container) * 0.5, 'overlay width is correct');
        });
        test('widget should react on viewport change', function(assert) {
          var origViewport = viewPort();
          try {
            $('#overlay').dxOverlay({
              container: undefined,
              visible: true
            });
            var $viewport = $('<div>');
            viewPort($viewport);
            assert.strictEqual($viewport.children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 1, 'overlay moved to new viewport');
          } finally {
            viewPort(origViewport);
          }
        });
        test('widget should correctly react on viewport change if parent container hidden', function(assert) {
          var $origViewport = viewPort();
          try {
            var overlay = $('#overlay').dxOverlay({
              container: undefined,
              visible: true,
              animation: null
            }).dxOverlay('instance');
            overlay.$element().parent().hide();
            viewPort($origViewport);
            assert.strictEqual($origViewport.children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 0, 'overlay not rendered because parent is hidden');
          } finally {
            viewPort($origViewport);
          }
        });
        test('widget should not react on viewport change with correct container', function(assert) {
          var origViewport = viewPort();
          try {
            $('#overlay').dxOverlay({
              container: $('#container'),
              visible: true
            });
            var $viewport = $('<div>');
            viewPort($viewport);
            assert.strictEqual($viewport.children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 0, 'overlay not moved to new viewport');
          } finally {
            viewPort(origViewport);
          }
        });
        test('T811495 - content should be inside container if it is provided by defaultOptions', function(assert) {
          var TestOverlay = function($__super) {
            function TestOverlay() {
              $traceurRuntime.superConstructor(TestOverlay).apply(this, arguments);
            }
            return ($traceurRuntime.createClass)(TestOverlay, {}, {}, $__super);
          }(Overlay);
          TestOverlay.defaultOptions({options: {container: $('#customTargetContainer')}});
          var overlay = new TestOverlay($('#overlay'));
          overlay.show();
          assert.strictEqual($('#customTargetContainer').children(toSelector(OVERLAY_WRAPPER_CLASS)).length, 1);
        });
      });
      testModule('hide overlay by callback', moduleConfig, function() {
        test('callback should not be added if hideTopOverlayHandler option equals \'null\' (B251263, B251262)', function(assert) {
          var instance = $('#overlay').dxOverlay({hideTopOverlayHandler: null}).dxOverlay('instance');
          assert.ok(!hideTopOverlayCallback.hasCallback());
          instance.show();
          assert.ok(!hideTopOverlayCallback.hasCallback());
        });
        test('custom callback should be added via hideTopOverlayHandler', function(assert) {
          var customCallback = sinon.stub();
          var instance = $('#overlay').dxOverlay({hideTopOverlayHandler: customCallback}).dxOverlay('instance');
          assert.ok(customCallback.notCalled);
          instance.show();
          hideTopOverlayCallback.fire();
          assert.ok(customCallback.calledOnce);
        });
        test('custom callback should be correctly changed by another one', function(assert) {
          var initialCallback = sinon.stub();
          var newCallback = sinon.stub();
          var instance = $('#overlay').dxOverlay({
            hideTopOverlayHandler: initialCallback,
            visible: true
          }).dxOverlay('instance');
          instance.option('hideTopOverlayHandler', newCallback);
          assert.ok(initialCallback.notCalled);
          assert.ok(newCallback.notCalled);
          hideTopOverlayCallback.fire();
          assert.ok(initialCallback.notCalled);
          assert.ok(newCallback.calledOnce);
        });
        test('hideTopOverlayCallback callback should be unsubscribing before hide animation start', function(assert) {
          var instance = $('#overlay').dxOverlay({
            visible: true,
            animation: {hide: {start: function() {
                  assert.ok(!hideTopOverlayCallback.hasCallback());
                }}}
          }).dxOverlay('instance');
          instance.hide();
        });
        test('overlay should be hidden after callback fired', function(assert) {
          var instance = $('#overlay').dxOverlay().dxOverlay('instance');
          instance.show();
          hideTopOverlayCallback.fire();
          assert.strictEqual(instance.option('visible'), false, 'hidden after back button event');
        });
        test('overlay should be hidden after callback fired if overlay showed by setting option \'visible\'', function(assert) {
          var instance = $('#overlay').dxOverlay().dxOverlay('instance');
          instance.option('visible', true);
          hideTopOverlayCallback.fire();
          assert.strictEqual(instance.option('visible'), false, 'hidden after back button event');
        });
      });
      testModule('API', moduleConfig, function() {
        test('toggle without args', function(assert) {
          var $overlay = $('#overlay').dxOverlay({visible: false});
          var overlay = $overlay.dxOverlay('instance');
          overlay.toggle();
          assert.strictEqual(overlay.option('visible'), true);
          overlay.toggle();
          assert.strictEqual(overlay.option('visible'), false);
        });
        test('toggle should be resolved with visibility state', function(assert) {
          var done = assert.async();
          var $overlay = $('#overlay').dxOverlay({visible: false});
          var overlay = $overlay.dxOverlay('instance');
          overlay.toggle().done(function(isVisible) {
            assert.strictEqual(isVisible, true, 'visibility is true');
            overlay.toggle().done(function(isVisible) {
              assert.strictEqual(isVisible, false, 'visibility is false');
              done();
            });
          });
        });
        [false, true].forEach(function(visible) {
          test(("toggle(" + visible + ") should be rejected if showing/hiding is canceled"), function(assert) {
            var done = assert.async();
            assert.expect(1);
            var overlay = $('#overlay').dxOverlay({visible: !visible}).dxOverlay('instance');
            overlay.option({
              onShowing: function(e) {
                return e.cancel = true;
              },
              onHiding: function(e) {
                return e.cancel = true;
              }
            });
            overlay.toggle(visible).fail(function() {
              assert.ok(true);
              done();
            });
          });
        });
        test('toggle with args', function(assert) {
          var $overlay = $('#overlay').dxOverlay({visible: false});
          var overlay = $overlay.dxOverlay('instance');
          overlay.toggle(true);
          assert.strictEqual(overlay.option('visible'), true);
          overlay.toggle(true);
          assert.strictEqual(overlay.option('visible'), true);
          overlay.toggle(false);
          assert.strictEqual(overlay.option('visible'), false);
          overlay.toggle(false);
          assert.strictEqual(overlay.option('visible'), false);
        });
        test('show/hide', function(assert) {
          var $overlay = $('#overlay').dxOverlay({visible: false});
          var overlay = $overlay.dxOverlay('instance');
          overlay.show();
          assert.strictEqual(overlay.option('visible'), true);
          overlay.show();
          assert.strictEqual(overlay.option('visible'), true);
          overlay.hide();
          assert.strictEqual(overlay.option('visible'), false);
          overlay.hide();
          assert.strictEqual(overlay.option('visible'), false);
        });
        test('show/hide deferreds without animation', function(assert) {
          assert.expect(4);
          var done = assert.async();
          fx.off = true;
          var overlay = $('#overlay').dxOverlay().dxOverlay('instance');
          overlay.show().done(function() {
            assert.ok(true);
            assert.strictEqual(this, overlay);
            overlay.hide().done(function() {
              assert.ok(true);
              assert.strictEqual(this, overlay);
              done();
            });
          });
        });
        test('show/hide deferreds with animation', function(assert) {
          assert.expect(4);
          var done = assert.async();
          fx.off = false;
          var overlay = $('#overlay').dxOverlay({animation: {
              show: {duration: 10},
              hide: {duration: 10}
            }}).dxOverlay('instance');
          overlay.show().done(function() {
            assert.ok(true);
            assert.strictEqual(this, overlay);
            overlay.hide().done(function() {
              assert.ok(true);
              assert.strictEqual(this, overlay);
              done();
            });
          });
        });
        test('content()', function(assert) {
          var $element = $('#overlay');
          var instance = $element.dxOverlay().dxOverlay('instance');
          assert.ok(instance.$content().hasClass(OVERLAY_CONTENT_CLASS), 'API method content() returns correct jQuery object');
        });
        test('\'repaint\' method should trigger \'dxresize\' event to notify content that its dimensions could changes', function(assert) {
          var $element = $('#overlay');
          var instance = $element.dxOverlay({visible: true}).dxOverlay('instance');
          var resizeStub = sinon.stub(visibilityChange, 'triggerResizeEvent');
          instance.repaint();
          assert.strictEqual(resizeStub.callCount, 1, '\'dxresize\' event handler was called');
          resizeStub.restore();
        });
      });
      testModule('integration tests', moduleConfig, function() {
        test('wrong gallery render on start in overlay widget (B232427)', function(assert) {
          var overlay = $('#overlayWithAnonymousTmpl').dxOverlay().dxOverlay('instance');
          var $content = overlay.$content();
          assert.strictEqual($content.children().length, 0, 'Overlay has no children');
          overlay.show();
          assert.strictEqual($content.children().length, 1, 'Overlay content has one children');
          overlay.hide();
          assert.strictEqual($content.children().length, 1, 'Overlay content has one children');
        });
      });
      testModule('widget sizing render', moduleConfig, function() {
        test('outerWidth', function(assert) {
          var $element = $('#widget').dxOverlay();
          var instance = $element.dxOverlay('instance');
          instance.show();
          assert.ok(getOuterWidth($element) > 0, 'outer width of the element must be more than zero');
        });
        test('constructor', function(assert) {
          var $element = $('#widget').dxOverlay({width: 400});
          var instance = $element.dxOverlay('instance');
          instance.show();
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual(getOuterWidth(instance.$content()), 400, 'outer width of the element must be equal to custom width');
        });
        test('change width', function(assert) {
          var $element = $('#widget').dxOverlay();
          var instance = $element.dxOverlay('instance');
          var customWidth = 400;
          instance.option('width', customWidth);
          instance.show();
          assert.strictEqual(getOuterWidth(instance.$content()), customWidth, 'outer width of the element must be equal to custom width');
        });
      });
      testModule('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
          viewPort($('#qunit-fixture').addClass(VIEWPORT_CLASS));
          this.$overlay = $('#overlay').dxOverlay({
            focusStateEnabled: true,
            visible: true,
            width: 1,
            height: 1,
            position: {of: viewPort()}
          });
          this.overlay = this.$overlay.dxOverlay('instance');
          this.$overlayContent = this.overlay.$content();
          this.position = this.$overlayContent.position();
          this.keyboard = keyboardMock(this.$overlayContent);
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        test('esc handling', function(assert) {
          assert.strictEqual(this.$overlayContent.attr('tabindex'), '0', 'overlay content has tabindex 0');
          this.keyboard.keyDown('esc');
          assert.strictEqual(this.overlay.option('visible'), false, 'overlay is closed after pressing esc ');
        });
        test('overlay have focus on show click', function(assert) {
          var $overlayContent = this.$overlayContent;
          this.overlay.option('animation', {show: {
              start: function() {
                assert.ok(!$overlayContent.is(getActiveElement()), 'focus is on overlay');
              },
              complete: function() {
                assert.ok($overlayContent.is(getActiveElement()), 'focus isn\'t on overlay');
              }
            }});
          this.overlay.option('visible', false);
          this.overlay.option('visible', true);
        });
        test('overlay doesn\'t handle keyboard propagated events', function(assert) {
          var $overlayContent = this.$overlayContent;
          var $input = $('<input>');
          $overlayContent.append($input);
          var keyboard = keyboardMock($input);
          keyboard.keyDown('esc');
          assert.strictEqual(this.overlay.option('visible'), true, 'overlay doesn\'t handle keyboard propagated events');
        });
      });
      testModule('focus policy', {
        beforeEach: function() {
          this.tabEvent = $.Event('keydown', {key: 'Tab'});
          this.shiftTabEvent = $.Event('keydown', {
            key: 'Tab',
            shiftKey: true
          });
          moduleConfig.beforeEach.apply(this);
        },
        afterEach: function() {
          moduleConfig.afterEach.apply(this);
        }
      }, function() {
        test('elements under overlay with shader have not to get focus by tab', function(assert) {
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var $content = $(overlay.$content());
          var $firstTabbable = $content.find('.firstTabbable');
          var $lastTabbable = $content.find('.lastTabbable').focus();
          var $outsideTabbable = $content.find('.outsideTabbable');
          $(document).trigger(this.tabEvent);
          assert.strictEqual(getActiveElement(), $firstTabbable.get(0), 'first item focused on press tab on last item (does not go under overlay)');
          $(document).trigger(this.shiftTabEvent);
          assert.strictEqual(getActiveElement(), $lastTabbable.get(0), 'last item focused on press tab+shift on first item (does not go under overlay)');
          $outsideTabbable.focus();
          $(document).trigger(this.tabEvent);
          assert.strictEqual(getActiveElement(), $firstTabbable.get(0), 'first item focused on press tab on last item (does not go under overlay)');
        });
        test('elements under overlay with shader have not to get focus by tab when top overlay has no tabbable elements', function(assert) {
          var overlay1 = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var overlay2 = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            shading: false,
            contentTemplate: function() {
              return 'test';
            }
          });
          var $content = $(overlay1.$content());
          overlay1.show();
          overlay2.show();
          var $firstTabbable = $content.find('.firstTabbable');
          $content.find('.lastTabbable').focus();
          $(document).trigger(this.tabEvent);
          assert.strictEqual(getActiveElement(), $firstTabbable.get(0), 'first item focused on press tab on last item (does not go under overlay)');
        });
        test('elements under overlay with shader have not to get focus by tab after another overlay is hide', function(assert) {
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var $content = $(overlay.$content());
          new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true
          }).hide();
          var $firstTabbable = $content.find('.firstTabbable');
          $(document).trigger(this.tabEvent);
          assert.strictEqual(getActiveElement(), $firstTabbable.get(0), 'first item focused on press tab on last item (does not go under overlay)');
        });
        test('elements on the page have to change focus by tab after overlay dispose', function(assert) {
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true
          });
          overlay.$element().remove();
          $(document).trigger(this.tabEvent);
          assert.strictEqual(this.tabEvent.isDefaultPrevented(), false, 'default tab behavior should not be prevented after dispose overlay');
        });
        test('elements under top overlay with shader have not to get focus by tab', function(assert) {
          new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true
          });
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var $content = $(overlay.$content());
          var $firstTabbable = $content.find('.firstTabbable');
          $firstTabbable.focus();
          $($firstTabbable).trigger(this.tabEvent);
          assert.strictEqual(this.tabEvent.isDefaultPrevented(), false, 'default action is not prevented');
        });
        test('tabbable selectors should check only bounds', function(assert) {
          var tabbableSpy = sinon.spy(selectors, 'tabbable');
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var $content = $(overlay.$content());
          $content.find('.firstTabbable').focus().trigger(this.tabEvent);
          var $elements = $content.find('*');
          var middleElement = $elements.get(Math.floor($elements.length / 2));
          assert.ok(tabbableSpy.withArgs(0, $elements.get(0)).called, 'first element has been checked');
          assert.ok(tabbableSpy.withArgs(0, $elements.last().get(0)).called, 'last element has been checked');
          assert.notOk(tabbableSpy.withArgs(0, middleElement).called, 'middle element hasn\'t been checked');
        });
        QUnit.testInActiveWindow('tab target inside of wrapper but outside of content should not be outside', function(assert) {
          var overlay = new Overlay($('<div>').appendTo('#qunit-fixture'), {
            visible: true,
            shading: true,
            contentTemplate: $('#focusableTemplate')
          });
          var $content = overlay.$content();
          var $wrapper = $content.closest(toSelector(OVERLAY_WRAPPER_CLASS));
          var contentFocusHandler = sinon.spy();
          var $tabbableDiv = $('<div>').attr('tabindex', 0).html('Tabbable div').prependTo($wrapper);
          eventsEngine.on($tabbableDiv, 'focusin', contentFocusHandler);
          keyboardMock($tabbableDiv).press('tab');
          assert.strictEqual(contentFocusHandler.callCount, 1, 'focus has been triggered once from keyboardMock');
        });
      });
      testModule('preventScrollEvents', function() {
        test('wrapper scroll subscription after change preventScrollEvents option', function(assert) {
          if (QUnit.urlParams['nojquery']) {
            assert.ok(true);
            return;
          }
          var overlay = $('#overlay').dxOverlay({visible: true}).dxOverlay('instance');
          var $wrapper = $(overlay.content()).parent();
          var getWrapperEventListeners = function() {
            return $._data($wrapper.get(0)).events || {};
          };
          assert.strictEqual('dxdrag' in getWrapperEventListeners(), true, 'scroll subscribed');
          overlay.option('preventScrollEvents', false);
          assert.strictEqual('dxdrag' in getWrapperEventListeners(), false, 'scroll unsubscribed');
          overlay.option('preventScrollEvents', true);
          assert.strictEqual('dxdrag' in getWrapperEventListeners(), true, 'scroll subscribed');
        });
        [true, false].forEach(function(shading) {
          test(("dxmousewheel event should not be prevented on overlay shader if shading is " + shading), function(assert) {
            assert.expect(1);
            var overlay = $('#overlay').dxOverlay({
              shading: shading,
              visible: true,
              preventScrollEvents: false
            }).dxOverlay('instance');
            var $wrapper = $(overlay.content()).parent();
            $($wrapper.parent()).on('dxmousewheel', function(e) {
              assert.strictEqual(e.isDefaultPrevented(), false, 'event is not prevented');
            });
            pointerMock($wrapper).start().wheel(10);
            $($wrapper.parent()).off('dxmousewheel');
          });
          test(("dxmousewheel event should not be prevented on overlay content if shading is " + shading), function(assert) {
            assert.expect(1);
            var overlay = $('#overlay').dxOverlay({
              shading: shading,
              visible: true,
              preventScrollEvents: false
            }).dxOverlay('instance');
            var $content = $(overlay.content());
            var $wrapper = $(overlay.content()).parent();
            $($wrapper).on('dxmousewheel', function(e) {
              assert.strictEqual(e.isDefaultPrevented(), false, 'event is not prevented');
            });
            pointerMock($content).start().wheel(10);
            $($wrapper).off('dxmousewheel');
          });
        });
        [true, false].forEach(function(preventScrollEvents) {
          QUnit.test('should be logged if preventScrollEvents is used on initialization', function(assert) {
            assert.expect(2);
            var stub = sinon.stub(errors, 'log', function() {
              assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxOverlay', 'preventScrollEvents', '23.1', 'If you enable this option, end-users may experience scrolling issues.'], 'args of the log method');
            });
            $('#overlay').dxOverlay({
              visible: true,
              preventScrollEvents: preventScrollEvents
            });
            assert.strictEqual(stub.callCount, 1, 'error.log.callCount');
            stub.restore();
          });
          QUnit.test('should not be logged if preventScrollEvents is not used on initialization', function(assert) {
            assert.expect(1);
            var stub = sinon.stub(errors, 'log', function() {
              assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxOverlay', 'preventScrollEvents', '23.1', 'If you enable this option, end-users may experience scrolling issues.'], 'args of the log method');
            });
            $('#overlay').dxOverlay({visible: true});
            assert.strictEqual(stub.callCount, 0, 'error.log.callCount');
            stub.restore();
          });
          QUnit.test('should be logged if preventScrollEvents is changed in runtime', function(assert) {
            assert.expect(2);
            var overlay = $('#overlay').dxOverlay({
              visible: true,
              preventScrollEvents: preventScrollEvents
            }).dxOverlay('instance');
            var stub = sinon.stub(errors, 'log', function() {
              assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxOverlay', 'preventScrollEvents', '23.1', 'If you enable this option, end-users may experience scrolling issues.'], 'args of the log method');
            });
            overlay.option('preventScrollEvents', !preventScrollEvents);
            assert.strictEqual(stub.callCount, 1, 'error.log.callCount');
            stub.restore();
          });
        });
      });
      testModule('scrollable interaction', {
        beforeEach: function() {
          this._originalViewport = viewPort();
          viewPort($('#customTargetContainer'));
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          viewPort(this._originalViewport);
          moduleConfig.afterEach.apply(this, arguments);
        }
      }, function() {
        test('scroll event prevented on overlay shader 1', function(assert) {
          assert.expect(0);
          var $overlay = $('#overlay').dxOverlay({shading: true});
          $overlay.dxOverlay('option', 'visible', true);
          var $content = $overlay.dxOverlay('$content');
          var $shader = $content.closest(toSelector(OVERLAY_SHADER_CLASS));
          $($shader.parent()).on('dxdrag.TEST', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function() {
            assert.ok(false, 'scroll should not be fired');
          });
          pointerMock($shader).start().wheel(10);
          $($shader.parent()).off('.TEST');
        });
        test('scroll event should not be prevented if originalEvent is mousemove', function(assert) {
          var $overlay = $('#overlay').dxOverlay({
            shading: true,
            visible: true
          });
          var $content = $overlay.dxOverlay('$content');
          var $shader = $content.closest(toSelector(OVERLAY_SHADER_CLASS));
          $($shader).on('dxdrag', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function(e) {
            if (e.originalEvent.originalEvent.type === 'mousemove') {
              assert.strictEqual(e.isDefaultPrevented(), false, 'mousemove is not prevented');
              return;
            }
            assert.strictEqual(e.isDefaultPrevented(), true, 'touchmove is prevented');
          });
          var event = $.Event('dxdrag', {originalEvent: $.Event('dxpointermove', {originalEvent: $.Event('mousemove')})});
          $($shader).trigger(event);
          event = $.Event('dxdrag', {originalEvent: $.Event('dxpointermove', {originalEvent: $.Event('touchmove')})});
          $($shader).trigger(event);
        });
        test('scroll event prevented on overlay shader', function(assert) {
          try {
            var $overlay = $($('#overlay').dxOverlay({
              shading: true,
              visible: true
            }));
            var $content = $($overlay.dxOverlay('$content'));
            $(document).on('dxpointermove.TEST', function(e) {
              assert.ok(e.isScrollingEvent, 'scrolling event set');
            });
            $content.trigger({
              type: 'dxpointerdown',
              pointers: [null]
            }).trigger({
              type: 'dxpointermove',
              isScrollingEvent: true,
              pointers: [null]
            });
          } finally {
            $(document).off('.TEST');
          }
        });
        test('scroll event prevented on overlay', function(assert) {
          assert.expect(1);
          var $overlay = $($('#overlay').dxOverlay());
          var $scrollable = $('<div>');
          $overlay.dxOverlay('option', 'visible', true);
          var $content = $($overlay.dxOverlay('$content')).append($scrollable);
          $scrollable.dxScrollable({
            useNative: false,
            bounceEnabled: false,
            direction: 'vertical',
            inertiaEnabled: false
          });
          var $overlayWrapper = $content.closest(toSelector(OVERLAY_WRAPPER_CLASS));
          $($overlayWrapper).on('dxdrag.TEST', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function(e) {
            assert.ok(e.isDefaultPrevented(), 'scroll event prevented');
          });
          $($overlayWrapper.parent()).on('dxdrag.TEST', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function() {
            assert.ok(false, 'scroll should not be fired');
          });
          pointerMock($scrollable.find('.dx-scrollable-container')).start().wheel(10);
          $overlayWrapper.off('.TEST').parent().off('.TEST');
        });
        test('Scroll event should not prevented on overlay that avoid the [Intervation] error when event is not cancelable', function(assert) {
          assert.expect(1);
          var $overlay = $($('#overlay').dxOverlay());
          var $scrollable = $('<div>');
          $overlay.dxOverlay('instance').option('visible', true);
          var $content = $($overlay.dxOverlay('$content')).append($scrollable);
          $scrollable.dxScrollable({
            useNative: true,
            bounceEnabled: false,
            direction: 'vertical',
            inertiaEnabled: false
          });
          var $overlayWrapper = $content.closest(toSelector(OVERLAY_WRAPPER_CLASS));
          $($overlayWrapper).on('dxdrag', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function(e) {
            assert.strictEqual(e.isDefaultPrevented(), false, 'not cancelable event should not be prevented');
          });
          $($overlayWrapper.parent()).on('dxdrag', {
            getDirection: function() {
              return 'both';
            },
            validate: function() {
              return true;
            }
          }, function() {
            assert.ok(false, 'event should not be fired');
          });
          var event = $.Event('dxdrag', {
            cancelable: false,
            originalEvent: $.Event('dxpointermove', {originalEvent: $.Event('touchmove')})
          });
          $($overlayWrapper).trigger(event);
        });
        test('scroll event does not prevent gestures', function(assert) {
          var $gestureCover = $('.dx-gesture-cover');
          var originalPointerEvents = $gestureCover.css('pointerEvents');
          var $overlay = $('#overlay').dxOverlay({
            shading: true,
            visible: true
          });
          var $content = $overlay.dxOverlay('$content');
          var $shader = $content.closest(toSelector(OVERLAY_SHADER_CLASS));
          $($shader).on({
            'dxdragstart': function() {
              assert.strictEqual($gestureCover.css('pointerEvents'), originalPointerEvents, 'selection is enabled');
            },
            'dxdragend': function() {
              assert.strictEqual($gestureCover.css('pointerEvents'), originalPointerEvents, 'selection is enabled');
            }
          });
          pointerMock($shader).start().wheel(10);
        });
        test('scroll event should not prevent text selection in content', function(assert) {
          assert.expect(1);
          var $overlay = $('#overlay').dxOverlay({
            shading: true,
            visible: true
          });
          var $content = $overlay.dxOverlay('$content');
          var $shader = $content.closest(toSelector(OVERLAY_SHADER_CLASS));
          var e = pointerMock($shader).start().dragStart().drag(10, 0).lastEvent();
          assert.ok(e._cancelPreventDefault, 'overlay should set special flag for prevent default cancelling');
        });
        ['ctrlKey', 'metaKey'].forEach(function(commandKey) {
          test(("scroll event should not prevent zooming (" + commandKey + " pressed)"), function(assert) {
            var $__3;
            assert.expect(1);
            var $overlay = $('#overlay').dxOverlay({
              shading: true,
              visible: true
            });
            var handler = function() {
              assert.ok(true, 'event popped up');
            };
            $('#qunit-fixture').on('wheel', handler);
            var $content = $overlay.dxOverlay('$content');
            var $shader = $content.closest(toSelector(OVERLAY_SHADER_CLASS));
            nativePointerMock($shader).start().wheel(10, ($__3 = {}, Object.defineProperty($__3, commandKey, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__3));
            $('#qunit-fixture').off('wheel', handler);
          });
        });
      });
      testModule('specifying base z-index', moduleConfig, function() {
        test('overlay should render with correct z-index by default', function(assert) {
          var $overlay = $('#overlay').dxOverlay({visible: true});
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          var $wrapper = overlay.$wrapper();
          assert.strictEqual($content.css('zIndex'), '1501', 'z-index for content is correct');
          assert.strictEqual($wrapper.css('zIndex'), '1501', 'z-index for wrapper is correct');
        });
        test('base z-index should be changed using the static method', function(assert) {
          Overlay.baseZIndex(10000);
          var $overlay = $('#overlay').dxOverlay({visible: true});
          var overlay = $overlay.dxOverlay('instance');
          var $content = overlay.$content();
          var $wrapper = overlay.$wrapper();
          assert.strictEqual($content.css('zIndex'), '10001', 'z-index for content is correct');
          assert.strictEqual($wrapper.css('zIndex'), '10001', 'z-index for wrapper is correct');
        });
      });
      testModule('overlay utils', moduleConfig, function() {
        test('Overlay Base Zindex should return default ZIndex', function(assert) {
          assert.strictEqual(Overlay.baseZIndex(), 1500, 'base zindex is correct');
          Overlay.baseZIndex(2000);
          assert.strictEqual(Overlay.baseZIndex(), 2000, 'base zindex is correct');
        });
        test('base zIndex can be defined as zero', function(assert) {
          Overlay.baseZIndex(0);
          assert.strictEqual(zIndex.create(), 1);
        });
        test('create method should return the redefined base zindex when no opened overlays exists', function(assert) {
          Overlay.baseZIndex(2000);
          assert.strictEqual(zIndex.create(), 2001);
        });
        test('new created zindex should be greater than last one', function(assert) {
          assert.strictEqual(zIndex.create(), 1501);
          assert.strictEqual(zIndex.create(), 1502);
          assert.strictEqual(zIndex.create(), 1503);
        });
        test('it should be possible to remove zindex from the stack', function(assert) {
          zIndex.create();
          zIndex.create();
          zIndex.remove(1502);
          assert.strictEqual(zIndex.create(), 1502, 'zindex has been restored');
        });
        test('it should be possible to remove all created zindices', function(assert) {
          zIndex.create();
          zIndex.create();
          zIndex.clearStack();
          assert.strictEqual(zIndex.create(), 1501);
        });
        test('a new overlay should create a new zindex on first showing', function(assert) {
          new Overlay($('#overlay'), {visible: true});
          assert.strictEqual(zIndex.create(), 1502, 'new zindex is larger than overlay\'s');
        });
        test('overlay should remove its zindex from the stack on dispose if overlay is visible', function(assert) {
          var instance = new Overlay($('#overlay'), {visible: true});
          instance.dispose();
          assert.strictEqual(zIndex.create(), 1501, 'zindex has been removed');
        });
        test('overlay should not try to remove its zindex from the stack on dispose if overlay is not visible (T1070941)', function(assert) {
          var instance = new Overlay($('#overlay'));
          instance.show();
          instance.hide();
          var rememberedZIndex = 1501;
          zIndex.create();
          instance.dispose();
          assert.strictEqual(zIndex.create(), rememberedZIndex + 1, 'remembered zIndex was not removed on dispose');
        });
        test('overlay should create new zindex only at first showing', function(assert) {
          var overlay = new Overlay($('#overlay'), {visible: true});
          overlay.option('visible', false);
          overlay.option('visible', true);
          overlay.option('visible', false);
          overlay.option('visible', true);
          assert.strictEqual(zIndex.create(), 1502, 'new zindex is larger than overlay\'s');
        });
        test('overlay should get next z-index if the first one has been created before', function(assert) {
          zIndex.create();
          var overlay = new Overlay($('#overlay'), {visible: true});
          var content = overlay.$content();
          assert.strictEqual(String(getComputedStyle(content[0]).zIndex), '1502');
          assert.strictEqual(zIndex.create(), 1503, 'new zindex is larger than overlay\'s');
        });
        test('it should not be possible to remove unexisting zIndex', function(assert) {
          var index = zIndex.create();
          zIndex.remove(9999);
          assert.strictEqual(zIndex.create(), index + 1, 'the next index has been created');
        });
      });
      testModule('renderGeometry', {
        beforeEach: function() {
          var $__2 = this;
          fx.off = true;
          this.timeToWaitResize = 50;
          this.overlayInstance = $('#overlay').dxOverlay({deferRendering: false}).dxOverlay('instance');
          this.renderGeometrySpy = sinon.spy(this.overlayInstance, '_renderGeometry');
          this.checkNoExcessResizeHandle = function(assert) {
            var done = assert.async();
            var renderGeometryInitialCallCount = $__2.renderGeometrySpy.callCount;
            setTimeout(function() {
              assert.strictEqual($__2.renderGeometrySpy.callCount, renderGeometryInitialCallCount, 'no resize observer callback was raised');
              done();
            }, $__2.timeToWaitResize);
          };
        },
        afterEach: function() {
          zIndex.clearStack();
          Overlay.baseZIndex(1500);
          fx.off = false;
        }
      }, function() {
        QUnit.testInActiveWindow('visibility change', function(assert) {
          var $__2 = this;
          assert.ok(this.renderGeometrySpy.notCalled, 'render geometry isn\'t called yet');
          var showingResizeHandled = assert.async();
          this.overlayInstance.show();
          setTimeout(function() {
            assert.ok($__2.renderGeometrySpy.calledOnce, 'render geometry called once');
            $__2.checkNoExcessResizeHandle(assert);
            showingResizeHandled();
          }, this.timeToWaitResize);
        });
        QUnit.testInActiveWindow('window resize', function(assert) {
          var $__2 = this;
          var showingResizeHandled = assert.async();
          this.overlayInstance.show();
          setTimeout(function() {
            resizeCallbacks.fire();
            assert.strictEqual($__2.renderGeometrySpy.callCount, 2);
            showingResizeHandled();
          }, this.timeToWaitResize);
        });
        QUnit.testInActiveWindow('repaint', function(assert) {
          var $__2 = this;
          var showingResizeHandled = assert.async();
          this.overlayInstance.show();
          setTimeout(function() {
            $__2.overlayInstance.repaint();
            assert.strictEqual($__2.renderGeometrySpy.callCount, 2);
            showingResizeHandled();
          }, this.timeToWaitResize);
        });
        QUnit.module('option change', {beforeEach: function() {
            this.overlayInstance.show();
          }}, function() {
          var newOptions = {
            width: 500,
            height: 500,
            minWidth: 2000,
            maxWidth: 10,
            minHeight: 2000,
            maxHeight: 10,
            position: {of: 'body'}
          };
          var $__8 = function(optionName) {
            QUnit.testInActiveWindow(optionName, function(assert) {
              var $__2 = this;
              var showingResizeHandled = assert.async();
              setTimeout(function() {
                $__2.overlayInstance.option(optionName, newOptions[optionName]);
                assert.strictEqual($__2.renderGeometrySpy.callCount, 2, 'renderGeomentry called 2 times');
                $__2.checkNoExcessResizeHandle(assert);
                showingResizeHandled();
              }, this.timeToWaitResize);
            });
          };
          for (var optionName in newOptions) {
            $__8(optionName);
          }
        });
      });
      QUnit.module('prevent safari scrolling on ios devices', {
        beforeEach: function() {
          fx.off = true;
          this.originalDevice = {
            platform: devices.real().platform,
            deviceType: devices.real().deviceType
          };
          this.instance = $('#overlay').dxOverlay().dxOverlay('instance');
          devices.real({
            platform: 'ios',
            deviceType: 'phone'
          });
          this.$body = $('body');
          this.$additionalElement = $('<div>').height(2000).appendTo(this.$body);
        },
        afterEach: function() {
          this.instance.dispose();
          devices.real(this.originalDevice);
          window.scrollTo(0, 0);
          this.$additionalElement.remove();
          fx.off = false;
        }
      }, function() {
        QUnit.test('body should have PREVENT_SAFARI_SCROLLING_CLASS if container is window and shading is enabled on overlay init', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          this.instance.dispose();
          $('#overlay').dxOverlay({visible: true});
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS));
        });
        QUnit.test('window should not be scrolled when PREVENT_SAFARI_SCROLLING_CLASS is added to the body on popup init', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          window.scrollTo(0, 200);
          this.instance.dispose();
          $('#overlay').dxOverlay({visible: true});
          assert.strictEqual(window.pageYOffset, 0, 'window is not scrolled');
        });
        QUnit.test('window should not be scrolled when PREVENT_SAFARI_SCROLLING_CLASS is added to the body', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          window.scrollTo(0, 200);
          this.instance.show();
          assert.strictEqual(window.pageYOffset, 0, 'window is not scrolled');
        });
        QUnit.test('window should be scrolled to initial position when PREVENT_SAFARI_SCROLLING_CLASS is removed from the body', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          var pageYOffset = 200;
          window.scrollTo(0, pageYOffset);
          this.instance.show();
          this.instance.hide();
          assert.strictEqual(window.pageYOffset, pageYOffset, 'window is scrolled to initial position');
        });
        QUnit.test('body should have PREVENT_SAFARI_SCROLLING_CLASS only when overlay is visible', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'no class because overlay is not visible');
          this.instance.show();
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is added after overlay show');
          this.instance.hide();
          assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed after overlay hide');
        });
        QUnit.test('body should have PREVENT_SAFARI_SCROLLING_CLASS if container is window and shading is enabled', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          this.instance.show();
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS));
        });
        [true, false].forEach(function(visible) {
          QUnit.test(("PREVENT_SAFARI_SCROLLING_CLASS should be removed on dispose if visible=" + visible), function(assert) {
            if (!IS_SAFARI) {
              assert.expect(0);
              return;
            }
            this.instance.show();
            this.instance.dispose();
            assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class was removed on dispose');
          });
        });
        QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be toggled on "shading" option change', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          this.instance.show();
          this.instance.option('shading', false);
          assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed when "shading" is disabled');
          this.instance.option('shading', true);
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is added when "shading" is enabled');
        });
        QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be toggled on "visualContainer" option change', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          this.instance.show();
          this.instance.option('visualContainer', 'body');
          assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed when "container" is not window');
          this.instance.option('visualContainer', window);
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is added when "container" is window');
        });
        QUnit.test('PREVENT_SAFARI_SCROLLING_CLASS should be toggled on "container" option change', function(assert) {
          if (!IS_SAFARI) {
            assert.expect(0);
            return;
          }
          this.instance.show();
          this.instance.option('container', 'body');
          assert.notOk(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is removed when "container" is not window');
          this.instance.option('container', undefined);
          assert.ok(this.$body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS), 'class is added when "container" is window');
        });
      });
      QUnit.module('wrapper covered element choice', {}, function() {
        QUnit.test('wrapper covers container element if visualPosition is not specified', function(assert) {
          var $container = $('#container');
          var overlay = $('#overlay').dxOverlay({
            container: $container,
            visible: true
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          assert.strictEqual(getWidth($wrapper), getWidth($container), 'wrapper has container width');
          assert.strictEqual(getHeight($wrapper), getHeight($container), 'wrapper has container height');
          var wrapperLocation = $wrapper.position();
          var containerLocation = $container.position();
          assert.roughEqual(wrapperLocation.left, containerLocation.left, 0.51, 'wrapper is left positioned by container');
          assert.roughEqual(wrapperLocation.top, containerLocation.top, 0.51, 'wrapper is top positioned by container');
        });
        QUnit.test('wrapper covers visualContainer element if it is specified', function(assert) {
          var $container = $('#container');
          var overlay = $('#overlay').dxOverlay({
            visualContainer: $container,
            container: viewport(),
            visible: true
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          assert.strictEqual(getWidth($wrapper), getWidth($container), 'wrapper has visual container width');
          assert.strictEqual(getHeight($wrapper), getHeight($container), 'wrapper has visual container height');
          var wrapperLocation = $wrapper.position();
          var containerLocation = $container.position();
          assert.roughEqual(wrapperLocation.left, containerLocation.left, 0.51, 'wrapper is left positioned by visual container');
          assert.roughEqual(wrapperLocation.top, containerLocation.top, 0.51, 'wrapper is top positioned by visual container');
        });
        QUnit.test('wrapper position and dimensions should be updated after visualContainer change', function(assert) {
          var $container = $('#container');
          var overlay = $('#overlay').dxOverlay({
            container: viewport(),
            visible: true
          }).dxOverlay('instance');
          overlay.option('visualContainer', $('#container'));
          var $wrapper = overlay.$wrapper();
          assert.strictEqual(getWidth($wrapper), getWidth($container), 'wrapper has visual container width');
          assert.strictEqual(getHeight($wrapper), getHeight($container), 'wrapper has visual container height');
          var wrapperLocation = $wrapper.position();
          var containerLocation = $container.position();
          assert.roughEqual(wrapperLocation.left, containerLocation.left, 0.51, 'wrapper is left positioned by visual container');
          assert.roughEqual(wrapperLocation.top, containerLocation.top, 0.51, 'wrapper is top positioned by visual container');
        });
        QUnit.test('wrapper covers element specified in position.of if container and visualContainer are not specified', function(assert) {
          var $positionOf = $('#container');
          var overlay = $('#overlay').dxOverlay({
            position: {of: $positionOf},
            visible: true
          }).dxOverlay('instance');
          var $wrapper = overlay.$wrapper();
          assert.strictEqual(getWidth($wrapper), getWidth($positionOf), 'wrapper has width equal to position.of width');
          assert.strictEqual(getHeight($wrapper), getHeight($positionOf), 'wrapper has height equal to position.of height');
          var wrapperLocation = $wrapper.position();
          var containerLocation = $positionOf.position();
          assert.roughEqual(wrapperLocation.left, containerLocation.left, 0.51, 'wrapper is left positioned by position.of');
          assert.roughEqual(wrapperLocation.top, containerLocation.top, 0.51, 'wrapper is top positioned by position.of');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","animation/fx","animation/position","animation/translator","generic_light.css!","core/config","core/devices","core/templates/template","core/utils/resize_callbacks","core/utils/type","core/utils/view_port","events/core/events_engine","events/visibility_change","jquery","mobile/hide_callback","core/errors","ui/widget/ui.errors","ui/overlay/ui.overlay","ui/overlay/z_index","ui/scroll_view/ui.scrollable","ui/widget/selectors","ui/widget/swatch_container","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js","../../helpers/shadowDom.js","core/utils/browser"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("animation/fx"), require("animation/position"), require("animation/translator"), require("generic_light.css!"), require("core/config"), require("core/devices"), require("core/templates/template"), require("core/utils/resize_callbacks"), require("core/utils/type"), require("core/utils/view_port"), require("events/core/events_engine"), require("events/visibility_change"), require("jquery"), require("mobile/hide_callback"), require("core/errors"), require("ui/widget/ui.errors"), require("ui/overlay/ui.overlay"), require("ui/overlay/z_index"), require("ui/scroll_view/ui.scrollable"), require("ui/widget/selectors"), require("ui/widget/swatch_container"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/nativePointerMock.js"), require("../../helpers/shadowDom.js"), require("core/utils/browser"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=overlay.tests.js.map