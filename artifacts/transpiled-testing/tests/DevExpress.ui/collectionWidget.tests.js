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

(["testing/tests/DevExpress.ui/collectionWidget.tests.js"], ["jquery","core/utils/common","core/utils/type","core/config","core/component_registrator","data/data_source/data_source","data/abstract_store","data/array_store","core/templates/template_engine_registry","core/utils/support","events/hold","ui/collection/ui.collection_widget.edit","ui/list","../../helpers/executeAsyncMock.js","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/ariaAccessibilityTestHelper.js","./collectionWidgetParts/editingTests.js","./collectionWidgetParts/liveUpdateTests.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui/collectionWidget.tests.js", ["jquery", "core/utils/common", "core/utils/type", "core/config", "core/component_registrator", "data/data_source/data_source", "data/abstract_store", "data/array_store", "core/templates/template_engine_registry", "core/utils/support", "events/hold", "ui/collection/ui.collection_widget.edit", "ui/list", "../../helpers/executeAsyncMock.js", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "../../helpers/ariaAccessibilityTestHelper.js", "./collectionWidgetParts/editingTests.js", "./collectionWidgetParts/liveUpdateTests.js"], function($__export) {
  "use strict";
  var $,
      noop,
      isRenderer,
      config,
      registerComponent,
      DataSource,
      Store,
      ArrayStore,
      setTemplateEngine,
      support,
      holdEvent,
      CollectionWidget,
      List,
      executeAsyncMock,
      keyboardMock,
      pointerMock,
      ariaAccessibilityTestHelper,
      ITEM_CLASS,
      ITEM_CONTENT_CLASS,
      DEFAULT_EMPTY_TEXT,
      EMPTY_MESSAGE_CLASS,
      COLLECTION_CLASS,
      FOCUSED_ITEM_CLASS,
      ACTIVE_ITEM_CLASS,
      ITEM_CUSTOM_CLASS,
      module,
      test,
      testInActiveWindow,
      TestComponent,
      TestWidget,
      loadCount,
      TestStore,
      helper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      Store = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      setTemplateEngine = $__m.setTemplateEngine;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      holdEvent = $__m.default;
    }, function($__m) {
      CollectionWidget = $__m.default;
    }, function($__m) {
      List = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__4;
      ITEM_CLASS = 'dx-item';
      ITEM_CONTENT_CLASS = (ITEM_CLASS + "-content");
      DEFAULT_EMPTY_TEXT = 'No data to display';
      EMPTY_MESSAGE_CLASS = 'dx-empty-message';
      COLLECTION_CLASS = 'dx-collection';
      FOCUSED_ITEM_CLASS = 'dx-state-focused';
      ACTIVE_ITEM_CLASS = 'dx-state-active';
      ITEM_CUSTOM_CLASS = 'item';
      (($__4 = QUnit, module = $__4.module, test = $__4.test, testInActiveWindow = $__4.testInActiveWindow, $__4));
      TestComponent = function($__super) {
        function TestComponent(element, options) {
          $traceurRuntime.superConstructor(TestComponent).call(this, element, options);
          this.NAME = 'TestComponent';
          this._activeStateUnit = '.item';
        }
        return ($traceurRuntime.createClass)(TestComponent, {
          _itemClass: function() {
            return ITEM_CUSTOM_CLASS;
          },
          _itemDataKey: function() {
            return '123';
          },
          _itemContainer: function() {
            return this.$element();
          },
          _allowDynamicItemsAppend: function() {
            return true;
          },
          _createActionByOption: function(optionName, config) {
            var $__7;
            this.__actionConfigs = !this.__actionConfigs ? {} : this.__actionConfigs;
            this.__actionConfigs[optionName] = config;
            return ($__7 = $traceurRuntime.superGet(this, TestComponent.prototype, "_createActionByOption")).call.apply($__7, $traceurRuntime.spread([this], arguments));
          }
        }, {}, $__super);
      }(CollectionWidget);
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"cmp\"></div>\n\n        <div id=\"cmp-with-template\">\n            <div data-options=\"dxTemplate : { name: 'testTemplate' } \">\n                First Template\n            </div>\n        </div>\n\n        <div id=\"cmp-with-zero-template\">\n            <div data-options=\"dxTemplate: { name: '0' }\">zero</div>\n        </div>\n\n        <script type=\"text/html\" id=\"externalTemplate\">\n            Test\n        </script>\n\n        <script type=\"text/html\" id=\"externalTemplateNoRootElement\">\n            Outer text <div>Test</div>\n        </script>\n\n        <div id=\"container-with-jq-template\">\n            <div data-options=\"dxTemplate : { name: 'firstTemplate' } \">\n                First Template\n            </div>\n            <div data-options=\"dxTemplate : { name: 'secondTemplate' } \">\n                Second Template\n            </div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      module('render', {
        beforeEach: function() {
          this.element = $('#cmp');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          executeAsyncMock.teardown();
          this.clock.restore();
        }
      }, function() {
        test('markup init', function(assert) {
          var element = this.element;
          new TestComponent(element, {});
          assert.ok(element.hasClass(COLLECTION_CLASS), 'collection widget has dx-collection class');
        });
        test('item content should be wrapped', function(assert) {
          var element = this.element;
          var component = new TestComponent(element, {items: [1]});
          var $item = component.itemElements().eq(0);
          var $itemContent = $item.children();
          assert.ok($item.hasClass(ITEM_CLASS), 'item has correct class');
          assert.ok($item.hasClass('item'), 'item has correct specific class');
          assert.equal($itemContent.length, 1, 'item content only one');
          assert.ok($itemContent.hasClass(ITEM_CONTENT_CLASS), 'item content has correct class');
          assert.ok($itemContent.hasClass('item-content'), 'content has correct specific class');
          assert.equal($itemContent.contents().text(), '1', 'item content placed inside content');
        });
        test('custom render func, returns jquery. Items: [{ prop: 0 }, { prop: 1 }, { prop: 2 }]', function(assert) {
          var element = this.element;
          new TestComponent('#cmp', {
            items: [{testProp: 0}, {testProp: 1}, {testProp: 2}],
            itemTemplate: function(item, index, itemElement) {
              assert.ok($(itemElement).hasClass(ITEM_CONTENT_CLASS), 'content class added');
              return $('<span />').html('Text is: ' + String(item.testProp) + ';');
            }
          });
          assert.equal(element.find('.item').length, 3);
          assert.equal($.trim(element.text()), 'Text is: 0;Text is: 1;Text is: 2;');
        });
        test('custom render func, returns jquery. Items: [{ prop: 3 }, { prop: 4 }, { prop: 5 }]', function(assert) {
          var element = this.element;
          new TestComponent('#cmp', {
            items: [{testProp: 3}, {testProp: 4}, {testProp: 5}],
            itemTemplate: function(item, index, itemElement) {
              assert.equal(isRenderer(itemElement), !!config().useJQuery, 'itemElemenet is correct');
              $(itemElement).append($('<span />').html('Text is: ' + String(item.testProp) + ';'));
            }
          });
          assert.equal(element.find('.item').length, 3);
          assert.equal($.trim(element.text()), 'Text is: 3;Text is: 4;Text is: 5;');
        });
        test('custom render func, returns dom node', function(assert) {
          var element = this.element;
          new TestComponent('#cmp', {
            integrationOptions: {templates: {'item': {render: function(args) {
                    var $element = $('<span>').addClass('dx-template-wrapper').text('Text is: ' + String(args.model.testProp) + ';');
                    return $element.get(0);
                  }}}},
            items: [{testProp: 3}, {testProp: 4}, {testProp: 5}]
          });
          assert.equal(element.find('.item').length, 3);
          assert.equal($.trim(element.text()), 'Text is: 3;Text is: 4;Text is: 5;');
        });
        test('custom render func, returns string', function(assert) {
          var element = this.element;
          new TestComponent('#cmp', {
            items: [{testProp: '0'}, {testProp: '1'}, {testProp: ''}],
            itemTemplate: function(item, index, itemElement) {
              return 'Text is: ' + String(item.testProp) + ';';
            }
          });
          assert.equal(element.find('.item').length, 3);
          assert.equal($.trim(element.text()), 'Text is: 0;Text is: 1;Text is: ;');
        });
        test('custom render func, returns numbers', function(assert) {
          var element = this.element;
          new TestComponent('#cmp', {
            items: [0, 1],
            itemRender: function(item, index, itemElement) {
              return item;
            }
          });
          assert.equal(element.find('.item').length, 2);
          assert.equal($.trim(element.text()), '01');
        });
        test('itemTemplateProperty option', function(assert) {
          var $element = $('#cmp-with-template');
          var instance = new TestComponent($element, {
            itemTemplateProperty: 'itemTemplate',
            items: [{itemTemplate: 'testTemplate'}]
          });
          var $item = instance.itemElements().eq(0);
          assert.equal($.trim($item.text()), 'First Template', 'item has correct template');
        });
        test('useItemTextAsTitle as primitive', function(assert) {
          var $element = $('#cmp-with-template');
          var instance = new TestComponent($element, {
            useItemTextAsTitle: true,
            items: [1]
          });
          var $item = instance.itemElements().eq(0);
          assert.strictEqual($item.attr('title'), '1', 'title is correct');
          instance.option('useItemTextAsTitle', false);
          assert.strictEqual(instance.itemElements().eq(0).attr('title'), undefined, 'title was removed');
        });
        test('useItemTextAsTitle as object', function(assert) {
          var $element = $('#cmp-with-template');
          var instance = new TestComponent($element, {
            useItemTextAsTitle: true,
            items: [{
              name: 'Test',
              id: 1
            }],
            displayExpr: 'name'
          });
          var $item = instance.itemElements().eq(0);
          assert.strictEqual($item.attr('title'), 'Test', 'title is correct');
        });
        test('item takes new template', function(assert) {
          var componentWithTemplate = new TestComponent('#cmp-with-template', {itemTemplate: 'testTemplate'});
          var component = new TestComponent('#cmp', {itemTemplate: componentWithTemplate._getTemplateByOption('itemTemplate')});
          assert.equal(component._getTemplateByOption('itemTemplate'), componentWithTemplate._getTemplateByOption('itemTemplate'));
        });
        test('anonymous item template', function(assert) {
          var $element = $('<div>').append($('<div>').addClass('test'));
          new TestComponent($element, {items: [1, 2]});
          assert.equal($element.find('.test').length, 2);
        });
        test('\'itemTemplate\' as DOM node', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1, 2],
            itemTemplate: $('<div>Test</div>').get(0)
          });
          assert.equal($element.children().length, 2);
          assert.equal($.trim($element.children().eq(0).text()), 'Test');
          assert.equal($.trim($element.children().eq(1).text()), 'Test');
        });
        test('\'itemTemplate\' as jQuery element', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1, 2],
            itemTemplate: $('<div>Test</div>')
          });
          assert.equal($element.children().length, 2);
          assert.equal($.trim($element.children().eq(0).text()), 'Test');
          assert.equal($.trim($element.children().eq(1).text()), 'Test');
        });
        test('\'itemTemplate\' as jQuery element with custom template engine', function(assert) {
          setTemplateEngine({
            compile: noop,
            render: function() {
              return $('<div>custom engine</div>');
            }
          });
          try {
            var $element = $('#cmp');
            new TestComponent($element, {
              items: [1, 2],
              itemTemplate: $('<div>')
            });
            assert.equal($element.children().length, 2);
            assert.equal($.trim($element.children().eq(0).text()), 'custom engine');
            assert.equal($.trim($element.children().eq(1).text()), 'custom engine');
          } finally {
            setTemplateEngine('default');
          }
        });
        test('\'itemTemplate\' as function returning template name', function(assert) {
          var $element = $('#cmp-with-template');
          new TestComponent($element, {
            items: [1, 2],
            itemTemplate: function() {
              return 'testTemplate';
            }
          });
          assert.equal($element.children().length, 2);
          assert.equal($.trim($element.children().eq(0).text()), 'First Template');
          assert.equal($.trim($element.children().eq(1).text()), 'First Template');
        });
        test('\'itemTemplate\' as function returning template name that is not string', function(assert) {
          var $element = $('#cmp-with-zero-template');
          new TestComponent($element, {
            items: [0],
            itemTemplate: function() {
              return 0;
            }
          });
          assert.equal($.trim($element.find('.' + ITEM_CONTENT_CLASS).eq(0).text()), 'zero');
        });
        test('\'itemTemplate\' as function returning string', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [0],
            itemTemplate: function() {
              return '0';
            }
          });
          assert.equal($.trim($element.find('.' + ITEM_CONTENT_CLASS).eq(0).text()), '0');
        });
        test('\'itemTemplate\' as function returning template DOM node', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1, 2],
            itemTemplate: function() {
              return $('<div>Test</div>').get(0);
            }
          });
          assert.equal($element.children().length, 2);
          assert.equal($.trim($element.children().eq(0).text()), 'Test');
          assert.equal($.trim($element.children().eq(1).text()), 'Test');
        });
        test('\'itemTemplate\' as function returning template jQuery element', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1],
            itemTemplate: function() {
              return $('<div>Test</div>');
            }
          });
          assert.equal($.trim($element.find('.' + ITEM_CONTENT_CLASS).children().text()), 'Test');
        });
        test('\'itemTemplate\' as script element', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1],
            itemTemplate: $('#externalTemplate')
          });
          assert.equal($.trim($element.find('.' + ITEM_CONTENT_CLASS).html()), 'Test');
        });
        test('\'itemTemplate\' as script element (no root element)', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1, 2],
            itemTemplate: $('#externalTemplateNoRootElement')
          });
          assert.equal($element.children().length, 2);
          assert.equal($.trim($element.children().eq(0).text()), 'Outer text Test');
          assert.equal($.trim($element.children().eq(1).text()), 'Outer text Test');
        });
        test('\'itemTemplate\' as script element (no root element) with string renderer in template engine (T161432)', function(assert) {
          setTemplateEngine({
            compile: function(element) {
              return element.html();
            },
            render: function(template, data) {
              return template;
            }
          });
          try {
            var $element = $('#cmp');
            new TestComponent($element, {
              items: [1, 2],
              itemTemplate: $('#externalTemplateNoRootElement')
            });
            assert.equal($element.children().length, 2);
            assert.equal($.trim($element.children().eq(0).text()), 'Outer text Test');
            assert.equal($.trim($element.children().eq(1).text()), 'Outer text Test');
          } finally {
            setTemplateEngine('default');
          }
        });
        test('itemTemplate should get correct index for second page', function(assert) {
          var itemTemplateMethod = sinon.spy();
          var $element = $('#cmp');
          var ds = new DataSource({
            store: new ArrayStore({
              key: 'id',
              data: [{
                id: 1,
                text: 'item 1'
              }, {
                id: 2,
                text: 'item 2'
              }]
            }),
            pageSize: 1
          });
          var component = new TestComponent($element, {
            dataSource: ds,
            itemTemplate: itemTemplateMethod
          });
          component._loadNextPage();
          assert.equal(itemTemplateMethod.getCall(1).args[1], 1, 'index is correct');
        });
        test('data item indices should be recalculated after item delete', function(assert) {
          var component = new TestComponent($('#cmp'), {items: ['Item 1', 'Item 2', 'Item 3']});
          component.deleteItem(component.itemElements().eq(0));
          var $itemElements = component.itemElements();
          assert.equal($itemElements.eq(0).data('dxItemIndex'), 0, 'second item became first');
          assert.equal($itemElements.eq(0).data('123'), 'Item 2', 'first item text is correct');
          assert.equal($itemElements.eq(1).data('dxItemIndex'), 1, 'third item became second');
          assert.equal($itemElements.eq(1).data('123'), 'Item 3', 'second item text is correct');
        });
        test('No data text message - no items and source', function(assert) {
          var component = new TestComponent('#cmp', {});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).length, 1);
        });
        test('No data text message - empty items', function(assert) {
          var list = new List(this.element);
          list.option('items', null);
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).length, 1);
          list.option('items', []);
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).length, 1);
          list.option('items', [1]);
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).length, 0);
        });
        test('No data text message - empty dataSource', function(assert) {
          executeAsyncMock.setup();
          new TestComponent('#cmp', {dataSource: {store: new ArrayStore([])}});
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).length, 1);
          this.element.empty().dxList({dataSource: {store: new ArrayStore([1])}});
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).length, 0);
        });
        test('No data text message - value', function(assert) {
          new TestComponent('#cmp');
          assert.equal(this.element.find('.' + EMPTY_MESSAGE_CLASS).text(), DEFAULT_EMPTY_TEXT);
        });
        test('No data text message - custom value', function(assert) {
          var noDataText = 'noDataText';
          var component = new TestComponent('#cmp', {noDataText: noDataText});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).text(), noDataText);
          noDataText = noDataText + '123';
          component.option({noDataText: noDataText});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).text(), noDataText);
        });
        test('No data text message - custom value with link, encodeNoDataText: false', function(assert) {
          var noDataText = '<a href="javascript:alert(1)">link</a>';
          var component = new TestComponent('#cmp', {
            noDataText: noDataText,
            encodeNoDataText: false
          });
          assert.strictEqual(component.$element().find('.' + EMPTY_MESSAGE_CLASS).html(), noDataText);
          noDataText = noDataText + 'no data';
          component.option({noDataText: noDataText});
          assert.strictEqual(component.$element().find('.' + EMPTY_MESSAGE_CLASS).html(), noDataText);
        });
        test('No data text message - custom value with link, encodeNoDataText: true', function(assert) {
          var noDataText = '<a href="javascript:alert(1)">link</a>';
          var encodedNoDataText = '&lt;a href="javascript:alert(1)"&gt;link&lt;/a&gt;';
          var component = new TestComponent('#cmp', {
            noDataText: noDataText,
            encodeNoDataText: true
          });
          assert.strictEqual(component.$element().find('.' + EMPTY_MESSAGE_CLASS).html(), encodedNoDataText);
          noDataText = noDataText + 'no data';
          component.option({noDataText: noDataText});
          assert.strictEqual(component.$element().find('.' + EMPTY_MESSAGE_CLASS).html(), encodedNoDataText + 'no data');
        });
        test('message element is not rendered if no data text is null, \'\', false', function(assert) {
          var component = new TestComponent('#cmp', {noDataText: null});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).length, 0);
          component.option({noDataText: false});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).length, 0);
          component.option({noDataText: ''});
          assert.equal(component.$element().find('.' + EMPTY_MESSAGE_CLASS).length, 0);
        });
        test('No data message may contain HTML markup', function(assert) {
          var component = new TestComponent('#cmp', {noDataText: '<div class="custom">No data custom</div>'});
          var $noDataContainer = component.$element().find('.' + EMPTY_MESSAGE_CLASS);
          assert.equal($noDataContainer.find('.custom').length, 1, 'custom HTML markup is present');
        });
        test('B235442 - \'No data to display\' blinks while items loading ', function(assert) {
          var store = new ArrayStore([0, 1, 3, 4]);
          var source = new DataSource(store);
          var el = this.element;
          new TestComponent(el, {dataSource: source});
          assert.equal(el.find('.' + EMPTY_MESSAGE_CLASS).length, 0);
        });
        test('B235884 - \'No data\' no show ', function(assert) {
          var deferred = $.Deferred();
          var el = this.element;
          var component = new TestComponent(el, {dataSource: {load: function() {
                return deferred.promise();
              }}});
          assert.equal(el.find('.' + EMPTY_MESSAGE_CLASS).length, 0, '\'No data\' absent, loading now');
          assert.ok(component._dataSource.isLoading());
          deferred.resolve([]);
          assert.ok(!component._dataSource.isLoading());
          assert.equal(el.find('.' + EMPTY_MESSAGE_CLASS).length, 1, '\'No data\' shown');
        });
        test('render items with multiple templates, jquery scenario', function(assert) {
          var $element = $('#container-with-jq-template');
          var testSet = ['First Template', 'Second Template', 'eraser', 'abc', 'pencil', 'First Template'];
          new TestComponent($element, {items: [{
              text: 'book',
              template: 'firstTemplate'
            }, {
              text: 'pen',
              template: 'secondTemplate'
            }, {text: 'eraser'}, {
              text: 'note',
              template: 'abc'
            }, {
              text: 'pencil',
              template: null
            }, {
              text: 'liner',
              template: 'firstTemplate'
            }]});
          var $items = $element.find('.item');
          assert.equal($items.length, testSet.length, 'quantity of a test set items and rendered items are equal');
          $items.each(function(index) {
            assert.equal($.trim($(this).text()), testSet[index]);
          });
        });
        test('onContentReady should be fired after if dataSource isn\'t empty', function(assert) {
          var count = 0;
          new TestComponent('#cmp', {
            onContentReady: function() {
              count++;
            },
            dataSource: [1]
          });
          assert.equal(count, 1, 'onContentReady fired after dataSource load');
        });
        test('onContentReady should be fired after if dataSource is empty', function(assert) {
          var count = 0;
          new TestComponent('#cmp', {
            onContentReady: function() {
              count++;
            },
            dataSource: []
          });
          assert.equal(count, 1, 'onContentReady fired after dataSource load');
        });
        test('onContentReady should be fired after if items isn\'t empty', function(assert) {
          var count = 0;
          new TestComponent('#cmp', {
            onContentReady: function() {
              count++;
            },
            items: [1]
          });
          assert.equal(count, 1, 'onContentReady fired');
        });
        test('onContentReady should be fired after if items is empty', function(assert) {
          var count = 0;
          new TestComponent('#cmp', {
            onContentReady: function() {
              count++;
            },
            items: []
          });
          assert.equal(count, 1, 'onContentReady fired');
        });
        test('item.visible property changing should not re-render whole item (T259051)', function(assert) {
          var instance = new TestComponent('#cmp', {items: [{text: '1'}]});
          var $item = instance.$element().find('.item');
          instance.option('items[0].visible', true);
          assert.ok($item.is(instance.$element().find('.item')));
        });
        test('item.disabled property changing should not re-render whole item', function(assert) {
          var instance = new TestComponent('#cmp', {items: [{text: '1'}]});
          var $item = instance.$element().find('.item');
          instance.option('items[0].disabled', true);
          assert.ok($item.is(instance.$element().find('.item')));
        });
        test('_getSummaryItemsWidth function returns right values', function(assert) {
          var instance = new TestComponent('#cmp', {items: [{template: $('<div class="test-width">').css('width', '20px').css('padding-left', '7px')}, {template: $('<div class="test-width">').css('width', '10px').css('margin-left', '5px')}]});
          assert.equal(instance._getSummaryItemsWidth($('#cmp .test-width')), 37, 'done');
          assert.equal(instance._getSummaryItemsWidth($('#cmp .test-width'), true), 42, 'done');
        });
      });
      module('events', {
        beforeEach: function() {
          registerComponent('TestComponent', TestComponent);
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          $.fn['TestComponent'] = null;
          this.clock.restore();
        }
      }, function() {
        test('onItemClick should be fired when item is clicked', function(assert) {
          var actionFired;
          var actionData;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0', '1', '2'],
            onItemClick: function(args) {
              actionFired = true;
              actionData = args;
            }
          });
          var $item = $element.find('.item').eq(1);
          $item.trigger('dxclick');
          assert.ok(actionFired, 'action fired');
          assert.equal(isRenderer(actionData.itemElement), !!config().useJQuery, 'correct element passed');
          assert.strictEqual($(actionData.itemElement)[0], $item[0], 'correct element passed');
          assert.strictEqual(actionData.itemData, '1', 'correct element passed');
          assert.strictEqual(actionData.itemIndex, 1, 'correct element itemIndex passed');
        });
        test('onItemClick should have correct item index when placed near another collection', function(assert) {
          var actionData;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0', '1', '2'],
            onItemClick: function(args) {
              actionData = args;
            }
          });
          var $item = $element.find('.item').eq(1);
          new TestComponent($('<div>').insertBefore($element), {items: ['0', '1', '2']});
          $item.trigger('dxclick');
          assert.strictEqual(actionData.itemIndex, 1, 'correct element itemIndex passed');
        });
        test('item should not have active-state class after click, if it is disabled', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            activeStateEnabled: true,
            items: [{
              text: '0',
              disabled: true
            }, '1', '2']
          });
          var $item = $element.find('.item').eq(0);
          var pointer = pointerMock($item);
          pointer.start().down();
          this.clock.tick(30);
          assert.ok(!$item.hasClass(ACTIVE_ITEM_CLASS), 'active state was not toggled for disabled item');
        });
        test('item should not have focus-state class after focusin, if it is disabled', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [{
              text: '0',
              disabled: true
            }, '1', '2']
          });
          var $item = $element.find('.item').eq(0);
          $item.trigger('dxpointerup');
          this.clock.tick();
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'focus state was not toggled for disabled item');
        });
        test('Action should be fired when item is held', function(assert) {
          var actionFired;
          var actionData;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0'],
            onItemHold: function(args) {
              actionFired = true;
              actionData = args;
            }
          });
          var $item = $element.find('.item');
          $item.trigger(holdEvent.name);
          assert.ok(actionFired, 'action fired');
          assert.strictEqual($item[0], $(actionData.itemElement)[0], 'correct element passed');
          assert.strictEqual(actionData.itemData, '0', 'correct element passed');
        });
        test('onItemHold should be fired when action changed dynamically', function(assert) {
          var actionFired;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {items: ['0']});
          var $item = $element.find('.item');
          instance.option('onItemHold', function(args) {
            actionFired = true;
          });
          $item.trigger(holdEvent.name);
          assert.ok(actionFired, 'action fired');
        });
        test('itemHold event should be fired', function(assert) {
          var actionFired;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {items: ['0']});
          var $item = $element.find('.item');
          instance.on('itemHold', function(args) {
            actionFired = true;
          });
          $item.trigger(holdEvent.name);
          assert.ok(actionFired, 'action fired');
        });
        test('itemHoldTimeout should be passed to hold event', function(assert) {
          var actionFired;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0'],
            itemHoldTimeout: 100,
            onItemHold: function(args) {
              actionFired = true;
            }
          });
          var $item = $element.find('.item');
          var pointer = pointerMock($item);
          pointer.start().down().wait(100);
          this.clock.tick(100);
          pointer.up();
          assert.ok(actionFired, 'action fired');
        });
        test('onItemContextMenu should be fired when item is held or right clicked', function(assert) {
          var actionFired;
          var actionData;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0'],
            onItemContextMenu: function(args) {
              actionFired = true;
              actionData = args;
            }
          });
          var $item = $element.find('.item');
          $item.trigger('dxcontextmenu');
          assert.ok(actionFired, 'action fired');
          assert.strictEqual($item[0], $(actionData.itemElement)[0], 'correct element passed');
          assert.strictEqual(actionData.itemData, '0', 'correct element passed');
        });
        test('itemContextMenu event should be fired when item is held or right clicked', function(assert) {
          var actionFired;
          var actionData;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {items: ['0']});
          instance.on('itemContextMenu', function(args) {
            actionFired = true;
            actionData = args;
          });
          var $item = $element.find('.item');
          $item.trigger('dxcontextmenu');
          assert.ok(actionFired, 'action fired');
          assert.strictEqual($item[0], $(actionData.itemElement)[0], 'correct element passed');
          assert.strictEqual(actionData.itemData, '0', 'correct element passed');
        });
        test('onItemContextMenu should be fired when action changed dynamically', function(assert) {
          var actionFired;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {items: ['0']});
          var $item = $element.find('.item');
          instance.option('onItemContextMenu', function(args) {
            actionFired = true;
          });
          $item.trigger(holdEvent.name);
          if (support.touch) {
            assert.ok(actionFired, 'action fired');
          } else {
            assert.ok(!actionFired, 'action was not fired');
          }
        });
        test('hold should not be handled if onItemHold or onItemContextMenu is not specified', function(assert) {
          var actionFired;
          var $element = $('#cmp');
          new TestComponent($element, {
            items: ['0'],
            onItemClick: function(args) {
              actionFired = true;
            }
          });
          var $item = $element.find('.item');
          var pointer = pointerMock($item);
          pointer.start().down().wait(2000);
          this.clock.tick(2000);
          pointer.up();
          assert.ok(actionFired, 'action fired');
        });
        test('click on selected item does not fire option change if selectionRequired option is true', function(assert) {
          var actionFired = false;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: ['0', '1'],
            selectedIndex: 0,
            selectionRequired: true,
            selectionMode: 'single'
          });
          var $item = $element.find('.item').first();
          instance.option('onOptionChanged', function(args) {
            if (args.name !== 'onOptionChanged') {
              actionFired = true;
            }
          });
          $item.trigger('dxclick');
          assert.ok(!actionFired, 'option does not change');
        });
        test('\'onItemRendered\' event should be fired with correct arguments', function(assert) {
          var items = ['item 0'];
          var eventTriggered;
          var eventData;
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: items,
            onItemRendered: function(e) {
              eventTriggered = true;
              eventData = e;
            }
          });
          var $item = $element.find('.item')[0];
          assert.ok(eventTriggered, 'action fired');
          assert.strictEqual($(eventData.itemElement)[0], $item, 'itemElement is correct');
          assert.strictEqual(eventData.itemData, items[0], 'itemData is correct');
          assert.equal(eventData.itemIndex, 0, 'itemIndex is correct');
          assert.equal(instance.__actionConfigs.onItemRendered.category, 'rendering', 'action category is \'rendering\'');
        });
        test('onClick option in item', function(assert) {
          var itemClicked = 0;
          var item = {
            text: 'test',
            onClick: function(e) {
              itemClicked++;
              args = e;
            }
          };
          var args;
          var $component = $('#cmp');
          var component = new TestComponent($component, {items: [item]});
          var $item = $component.find('.item');
          $item.trigger('dxclick');
          assert.equal(itemClicked, 1, 'click fired');
          assert.equal(args.component, component, 'component provided');
          assert.equal(args.itemData, item, 'item data provided');
          assert.equal(args.itemIndex, 0, 'item index provided');
          assert.ok(args.event, 'jQuery event provided');
          assert.ok(args.itemElement, 'item element provided');
        });
        QUnit.test('dxpointerup event should call changing focused item', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [1, 2]
          });
          var $secondItem = $element.find(("." + ITEM_CUSTOM_CLASS)).eq(1);
          $secondItem.trigger('dxpointerdown');
          this.clock.tick(10);
          assert.strictEqual($secondItem.hasClass(FOCUSED_ITEM_CLASS), false);
          $secondItem.trigger('dxpointerup');
          this.clock.tick(10);
          assert.strictEqual($secondItem.hasClass(FOCUSED_ITEM_CLASS), true);
        });
      });
      module('option change', function() {
        test('changing onItemRendered should not fire refresh', function(assert) {
          var instance = new TestComponent($('#cmp'), {items: [1, 2, 3]});
          var itemsReRendered = false;
          instance.option('onItemRendered', function(assert) {
            itemsReRendered = true;
          });
          assert.ok(!itemsReRendered, 'items does not refreshed');
        });
        test('user defined selectedItem with null value should be more important than default selected index', function(assert) {
          var TestCollection = CollectionWidget.inherit({
            NAME: 'TestCollection',
            _getDefaultOptions: function() {
              return $.extend(this.callBase(), {selectedIndex: 0});
            }
          });
          var instance = new TestCollection($('#cmp'), {
            items: [1, 2, 3],
            selectionMode: 'multiple',
            selectedItem: null
          });
          assert.equal(instance.option('selectedIndex'), -1, 'selectedIndex is correct');
          assert.deepEqual(instance.option('selectedItemKeys'), [], 'selectedItemKeys are correct');
          assert.equal($('#cmp').find('.dx-item-selected').length, 0, 'there is no selected item');
        });
      });
      module('items via markup', {
        beforeEach: function() {
          registerComponent('dxTestComponent', TestComponent);
        },
        afterEach: function() {
          delete $.fn['dxTestComponent'];
        }
      }, function() {
        test('item property changing should not re-render whole widget', function(assert) {
          var contentReadySpy = sinon.spy();
          var component = new TestComponent('#cmp', {
            items: [{visible: false}],
            onContentReady: contentReadySpy
          });
          component.option('items[0].visible', true);
          assert.equal(contentReadySpy.callCount, 1);
        });
        test('dxItem should not be modified', function(assert) {
          var $element = $('#cmp');
          var dxItemString = 'dxItem: {}';
          var $innerItem = $('<div>').attr('data-options', dxItemString).text('test');
          $innerItem.appendTo($element);
          var component = new TestComponent('#cmp', {});
          assert.equal(component.option('items').length, 1, 'item was added');
          assert.equal($innerItem.attr('data-options'), dxItemString, 'item was not changed');
        });
        test('dxItem with custom parser', function(assert) {
          var originalParser = config().optionsParser;
          config({optionsParser: JSON.parse});
          var $element = $('#cmp');
          var dxItemString = '{ "dxItem": {} }';
          var $innerItem = $('<div>').attr('data-options', dxItemString).text('test');
          $innerItem.appendTo($element);
          var component;
          try {
            component = new TestComponent('#cmp', {});
          } finally {
            config({optionsParser: originalParser});
          }
          assert.equal(component.option('items').length, 1, 'item was added');
          assert.equal($innerItem.attr('data-options'), dxItemString, 'item was not changed');
        });
      });
      module('keyboard navigation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        test('loopItemFocus option test', function(assert) {
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            loopItemFocus: true,
            items: [0, 1, 2, 3, 4]
          });
          var $items = $element.find('.item');
          var $lastItem = $items.last();
          var $firstItem = $items.first();
          var keyboard = keyboardMock($element);
          $element.focusin();
          keyboard.keyDown('left');
          assert.ok($lastItem.hasClass(FOCUSED_ITEM_CLASS), 'press left arrow on first item change focused item on last (focus is looping)');
          instance.option('loopItemFocus', false);
          keyboard.keyDown('right');
          assert.ok(!$firstItem.hasClass(FOCUSED_ITEM_CLASS), 'focus is not looping when option loopItemFocus set to false');
        });
        test('onItemClick fires on enter and space', function(assert) {
          assert.expect(2);
          var itemClicked = 0;
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0'],
            onItemClick: function(args) {
              itemClicked++;
            }
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('enter');
          assert.equal(itemClicked, 1, 'press enter on item call item click action');
          keyboard.keyDown('space');
          assert.equal(itemClicked, 2, 'press space on item call item click action');
        }), test('enter press should replace event target and currentTarget properties with item native element', function(assert) {
          var handler = sinon.stub();
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0'],
            onItemClick: handler
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          keyboard.press('enter');
          var event = handler.getCall(0).args[0].event;
          assert.strictEqual(event.target, $item.get(0), 'event target is correct');
          assert.strictEqual(event.currentTarget, $item.get(0), 'event target is correct');
        }), test('default page scroll should be prevented for space key', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0'],
            onItemClick: function(args) {
              assert.ok(args.event.isDefaultPrevented(), 'default scroll is prevented');
            }
          });
          $element.find('.item').eq(0).trigger('dxpointerup');
          this.clock.tick();
          keyboardMock($element).keyDown('space');
        }), test('focused item changed after press right/left arrows', function(assert) {
          assert.expect(3);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4]
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          keyboard.keyDown('right');
          $item = $item.next();
          assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press right arrow on item change focused item on next');
          keyboard.keyDown('left');
          $item = $item.prev();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press left arrow on item change focused item on prev');
        }), test('focused item changed after press right/left arrows for rtl', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            rtlEnabled: true,
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4]
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('left');
          $item = $item.next();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press left arrow on item change focused item on prev');
          keyboard.keyDown('right');
          $item = $item.prev();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press right arrow on item change focused item on next');
        }), test('focused item changed after press up/down arrows', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('down');
          $item = $item.next();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press down arrow on item change focused item on next');
          keyboard.keyDown('up');
          $item = $item.prev();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press up arrow on item change focused item on prev');
        }), test('focused item changed on next not hidden item after press left/right', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            selectedIndex: 3
          });
          var $items = $element.find('.item');
          var $item = $items.eq(3);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          $element.find('.item').eq(3).trigger('dxpointerup');
          this.clock.tick();
          $items.eq(2).toggle(false);
          keyboard.keyDown('left');
          $item = $items.eq(1);
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'next not hidden item has focused class after press left when next item is hidden');
          keyboard.keyDown('right');
          $item = $items.eq(3);
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'next not hidden item has focused class after press right when next item is hidden');
        });
        test('focused item cycle', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2]
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('up');
          $item = $element.find('.item').last();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press up arrow on first item change focused item on last');
          keyboard.keyDown('down');
          $item = $element.find('.item').first();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press down arrow on last item change focused item on first');
        }), test('focused item changed after press pageUp/Down', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          });
          var $item = $element.find('.item').eq(0);
          var keyboard = keyboardMock($element);
          $element.trigger('focusin');
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('pagedown');
          $item = $item.next();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press pageDown on item change focused item on next');
          keyboard.keyDown('pageup');
          $item = $item.prev();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press pageUp on item change focused item on prev');
        }), test('focused item changed after press home/end', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          });
          var $items = $element.find('.item');
          var $item = $items.eq(0);
          var keyboard = keyboardMock($element);
          $element.focusin();
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('end');
          $item = $items.last();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press end on item change focused item on next');
          keyboard.keyDown('home');
          $item = $items.first();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'press home on item change focused item on prev');
        }), test('focused item changed on last but one after press home/end if last is hidden', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          });
          var $items = $element.find('.item');
          var $item = $items.eq(0);
          var keyboard = keyboardMock($element);
          $element.focusin();
          $items.last().toggle(false);
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('end');
          $item = $items.last().prev();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'last by one item has focused class after press end when last item is hidden');
          $items.first().toggle(false);
          keyboard.keyDown('home');
          $item = $items.first().next();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'second item has focused class after press home when first item is hidden');
        });
        test('focus attribute', function(assert) {
          assert.expect(4);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          });
          var $items = $element.find('.item');
          var $item = $items.first();
          var keyboard = keyboardMock($element);
          var focusedItemId = instance.getFocusedItemId();
          $element.focusin();
          assert.strictEqual($element.attr('aria-activedescendant'), String(focusedItemId), 'element has attribute aria-activedescendant, whose value active');
          $item.trigger('dxpointerup');
          this.clock.tick();
          assert.ok($item.attr('id').match(focusedItemId), 'first item has id active');
          keyboard.keyDown('down');
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'first item does not has id active after press down arrow key');
          $item = $items.next();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'second item has id active after press down arrow key');
        });
        test('selectOnFocus test', function(assert) {
          assert.expect(9);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: [0, 1, 2],
            focusStateEnabled: true,
            selectOnFocus: true,
            loopItemFocus: true,
            selectedIndex: 0,
            selectionMode: 'single'
          });
          var $items = $element.find('.item');
          var $item = $items.first();
          var keyboard = keyboardMock($element);
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('right');
          assert.equal(instance.option('selectedIndex'), 1, 'next item has been selected after press right arrow');
          keyboard.keyDown('left');
          assert.equal(instance.option('selectedIndex'), 0, 'prev item has been selected after press left arrow');
          keyboard.keyDown('end');
          assert.equal(instance.option('selectedIndex'), 2, 'last item has been selected after press end');
          keyboard.keyDown('home');
          assert.equal(instance.option('selectedIndex'), 0, 'first item has been selected after press home');
          keyboard.keyDown('pagedown');
          assert.equal(instance.option('selectedIndex'), 1, 'next item has been selected after press pagedown');
          keyboard.keyDown('pageup');
          assert.equal(instance.option('selectedIndex'), 0, 'prev item has been selected after press pageup');
          keyboard.keyDown('down');
          assert.equal(instance.option('selectedIndex'), 1, 'next item has been selected after press down arrow');
          keyboard.keyDown('up');
          assert.equal(instance.option('selectedIndex'), 0, 'prev item has been selected after press up arrow');
          keyboard.keyDown('up');
          assert.equal(instance.option('selectedIndex'), 2, 'loopItemFocus is working');
        });
        test('focused item should be changed asynchronous (T400886)', function(assert) {
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: [0, 1, 2],
            focusStateEnabled: true
          });
          var $items = $element.find('.item');
          var $item = $items.first();
          $item.trigger('dxpointerup');
          assert.equal(instance.option('focusedElement'), null, 'focus isn\'t set');
          this.clock.tick();
          assert.equal($(instance.option('focusedElement')).get(0), $item.get(0), 'focus set after timeout');
        });
        testInActiveWindow('focused item should be changed synchronous with widget focus (T427152)', function(assert) {
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: [0, 1, 2],
            focusStateEnabled: true
          });
          var $items = $element.find('.item');
          var $item = $items.eq(1);
          $item.trigger('dxpointerup');
          instance.focus();
          assert.equal($(instance.option('focusedElement')).get(0), $item.get(0), 'focus isn\'t set');
        });
        test('focused item should not be changed if pointerdown prevented (T400886)', function(assert) {
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: [0, 1, 2],
            focusStateEnabled: true
          });
          var $items = $element.find('.item');
          var $item = $items.first();
          var event = $.Event('dxpointerup');
          $item.trigger(event);
          event.preventDefault();
          this.clock.tick();
          assert.equal(instance.option('focusedElement'), null, 'focus isn\'t set');
        });
        test('selectOnFocus test for widget with disabled items', function(assert) {
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            items: [0, {
              disabled: true,
              text: 1
            }, 2],
            focusStateEnabled: true,
            selectOnFocus: true,
            loopItemFocus: true,
            selectedIndex: 0,
            selectionMode: 'single'
          });
          var $items = $element.find('.item');
          var $item = $items.first();
          var keyboard = keyboardMock($element);
          $element.focusin();
          $item.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('right');
          assert.strictEqual(instance.option('selectedIndex'), 0, 'selectedIndex is correct');
          $item = $($items.get(1));
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'correct item has an focused-state');
        });
        test('Item should not lose focus class when you use arrows with \'selectOnFocus\' option', function(assert) {
          var $element = $('#cmp');
          new TestComponent($element, {
            items: [1, 2, 3, 4],
            focusStateEnabled: true,
            selectOnFocus: true,
            loopItemFocus: false,
            selectionMode: 'single'
          });
          var $items = $element.find('.item');
          var $firstItem = $items.first();
          var $lastItem = $items.last();
          var keyboard = keyboardMock($element);
          $element.focusin();
          $firstItem.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('left');
          assert.ok($firstItem.hasClass(FOCUSED_ITEM_CLASS), 'First item must stay focused when we press \'left\' button on the keyboard');
          $lastItem.trigger('dxpointerup');
          this.clock.tick();
          keyboard.keyDown('right');
          assert.ok($lastItem.hasClass(FOCUSED_ITEM_CLASS), 'Last item must stay focused when we press \'right\' button on the keyboard');
        });
        [false, true].forEach(function(ctrlKey) {
          [false, true].forEach(function(metaKey) {
            ['up', 'down', 'left', 'right', 'pageup', 'pagedown', 'home', 'end'].forEach(function(key) {
              var commandKeyPressed = ctrlKey || metaKey;
              test(("focused item is " + (commandKeyPressed ? 'not' : '') + " changed after pressing " + key + " key with command key (metaKey: " + metaKey + ", ctrlKey: " + ctrlKey + ")"), function(assert) {
                var $element = $('#cmp');
                var isSameItemFocused = commandKeyPressed;
                new TestComponent($element, {
                  focusStateEnabled: true,
                  items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  selectedIndex: 3
                });
                var $items = $element.find('.item');
                var $item = $items.eq(3);
                var keyboard = keyboardMock($element);
                $element.trigger('focusin');
                $element.find('.item').eq(3).trigger('dxpointerup');
                this.clock.tick();
                keyboard.keyDown(key, {
                  ctrlKey: ctrlKey,
                  metaKey: metaKey
                });
                assert.strictEqual($item.hasClass(FOCUSED_ITEM_CLASS), isSameItemFocused, ((isSameItemFocused ? 'same' : 'another') + " item focused"));
                assert.strictEqual(keyboard.event.isDefaultPrevented(), !isSameItemFocused, ("event is " + (isSameItemFocused ? 'not' : '') + " prevented"));
                assert.strictEqual(keyboard.event.isPropagationStopped(), !isSameItemFocused, ("propogation is " + (isSameItemFocused ? 'not' : '') + " stopped"));
              });
            });
          });
        });
      });
      module('focus policy', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        test('dx-state-focused is not set for item when focusStateEnabled is false by dxpoinerdown', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: false,
            items: ['0', '1']
          });
          var $item = $element.find('.item').eq(0);
          $item.trigger('dxpointerup');
          this.clock.tick();
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'focus set to first item');
        });
        test('dx-state-focused is not set for item when it is not closest focused target by dxpoinerdown', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            itemTemplate: function() {
              return $('<input>');
            }
          });
          var $item = $element.find('.item').eq(0);
          $item.trigger($.Event('dxpointerup', {target: $item.find('input').get(0)}));
          this.clock.tick();
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'focus set to first item');
        });
        test('focusedElement is set for item when nested element selected by dxpoinerdown', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            itemTemplate: function() {
              return $('<span>');
            }
          });
          var $item = $element.find('.item').eq(0);
          $item.trigger($.Event('dxpointerup', {target: $item.find('span').get(0)}));
          this.clock.tick();
          assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal($(instance.option('focusedElement')).get(0), $item.get(0), 'focus set to first item');
        });
        test('dx-state-focused is not set for item when it is not closest focused target by focusin', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            itemTemplate: function() {
              return $('<input>');
            }
          });
          var $item = $element.find('.item').eq(0);
          $element.trigger($.Event('focusin', {target: $item.find('input').get(0)}));
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'focus set to first item');
        });
        test('option focusOnSelectedItem: false', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            selectionMode: 'single',
            selectedIndex: 1,
            focusOnSelectedItem: false
          });
          $element.trigger('focusin');
          assert.ok($element.find('.item').eq(0).hasClass(FOCUSED_ITEM_CLASS), 'focus set to first item');
        });
        test('option focusOnSelectedItem: true', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            selectionMode: 'single',
            selectedIndex: 1,
            focusOnSelectedItem: true
          });
          $element.trigger('focusin');
          assert.ok($element.find('.item').eq(1).hasClass(FOCUSED_ITEM_CLASS), 'focus set to selected item');
        });
        test('item is focused after setting focusedElement option', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1']
          });
          var $item = $element.find('.item').eq(1);
          $element.focusin();
          assert.ok(!$item.hasClass(FOCUSED_ITEM_CLASS), 'item is not focused');
          instance.option('focusedElement', $item);
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'item is focused after setting focusedItem option');
        });
        test('first item  should be focused after setting focusedElement option to empty array', function(assert) {
          assert.expect(1);
          var $element = $('#cmp');
          new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1'],
            focusedElement: []
          });
          var $item = $element.find('.item').eq(0);
          $element.focusin();
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'item is focused');
        });
        test('item is focused after focusing on element', function(assert) {
          assert.expect(2);
          var $element = $('#cmp');
          var instance = new TestComponent($element, {
            focusStateEnabled: true,
            items: ['0', '1']
          });
          var $item = $element.find('.item').eq(0);
          $element.focusin();
          assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.ok($item.hasClass(FOCUSED_ITEM_CLASS), 'item is focused');
        });
      });
      module('isReady', function() {
        test('collection widget is ready when dataSource is loaded', function(assert) {
          var isReadyBeforeLoaded;
          var deferred = $.Deferred();
          var $component = $('#cmp');
          var component = new TestComponent($component);
          component.option('dataSource', {load: function() {
              isReadyBeforeLoaded = component.isReady();
              return deferred.promise();
            }});
          deferred.resolve([]);
          assert.strictEqual(isReadyBeforeLoaded, false, 'widget is not ready during dataSource loading');
          assert.equal(component.isReady(), true, 'widget is ready when dataSource is loaded');
        });
      });
      TestWidget = CollectionWidget.inherit({
        NAME: 'TestWidget',
        _renderItem: function() {
          var $__7;
          for (var args = [],
              $__3 = 0; $__3 < arguments.length; $__3++)
            args[$__3] = arguments[$__3];
          ($__7 = this).callBase.apply($__7, $traceurRuntime.spread(args));
        },
        _itemClass: function() {
          return 'div';
        },
        _itemDataKey: function() {
          return '3AE08BA7-F7BC-464B-8B43-53C1F7307920';
        }
      });
      loadCount = 0;
      TestStore = Store.inherit({_loadImpl: function() {
          loadCount++;
          return $.Deferred().resolve([1, 2, 3]);
        }});
      module('Data layer integration', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        test('data widget doesn\'t load already loaded datasource', function(assert) {
          assert.expect(3);
          var store = new TestStore();
          var source = new DataSource(store);
          var itemCount = 0;
          source.load().done(function() {
            assert.equal(loadCount, 1);
            new TestWidget('#cmp', {
              dataSource: source,
              onItemRendered: function() {
                itemCount++;
              }
            });
            assert.equal(loadCount, 1);
            assert.equal(itemCount, 3);
          });
          this.clock.tick(1);
        });
        test('data widget should handle dataSource loading error', function(assert) {
          var deferred = $.Deferred();
          var contentReadyFired = 0;
          new TestWidget('#cmp', {
            dataSource: {load: function() {
                return deferred.promise();
              }},
            onContentReady: function() {
              contentReadyFired++;
            }
          });
          contentReadyFired = 0;
          deferred.reject();
          assert.equal(contentReadyFired, 1, 'onContentReady fired once on loading fail');
        });
        test('collection correctly handle loadResult object', function(assert) {
          var mapStub = sinon.stub();
          var instance = new TestWidget('#cmp', {
            dataSource: {
              load: function($__5) {
                var filter = $__5.filter;
                var items = filter ? [{
                  id: 3,
                  text: 'test3'
                }] : [{
                  id: 1,
                  text: 'test1'
                }, {
                  id: 2,
                  text: 'test2'
                }];
                return $.Deferred().resolve({data: items}).promise();
              },
              key: 'id',
              map: mapStub
            },
            selectionMode: 'single'
          });
          instance.option('selectedItemKeys', [3]);
          var filteredItems = mapStub.lastCall.args[2];
          assert.ok(mapStub.callCount > 1, 'the \'map\' function was called not only during the initial loading');
          assert.ok(Array.isArray(filteredItems), 'receive array');
          assert.deepEqual(filteredItems, [{
            id: 3,
            text: 'test3'
          }], 'correct data');
        });
        test('getDataSource. dataSource is not defined', function(assert) {
          var $element = $('#cmp');
          var instance = new TestWidget($element, {items: []});
          assert.strictEqual(instance.getDataSource(), null);
        });
        test('getDataSource, dataSource is defined', function(assert) {
          var $element = $('#cmp');
          var instance = new TestWidget($element, {dataSource: [{field1: '1'}]});
          assert.ok(instance.getDataSource() instanceof DataSource);
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          this.items = [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}];
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new TestWidget($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        test('Attributes on initialize', function() {
          helper.createWidget({items: []});
          helper.checkAttributes(helper.$widget, {
            tabindex: '0',
            'aria-label': 'No data to display'
          });
          helper.checkItemsAttributes([], {});
        });
        test('Items[] -> Items[\'Item_1\', \'Item_2\', \'Item_3\' ]', function(assert) {
          helper.createWidget({items: []});
          helper.checkAttributes(helper.$widget, {
            tabindex: '0',
            'aria-label': 'No data to display'
          });
          helper.checkItemsAttributes([], {});
          helper.widget.option('items', this.items);
          helper.checkAttributes(helper.$widget, {tabindex: '0'});
          helper.checkItemsAttributes([], {});
        });
        test('Set focusedElement: item[1] -> clean focusedElement', function() {
          helper.createWidget({items: this.items});
          var $focusedItem = helper.$widget.find(("." + ITEM_CLASS)).eq(1);
          helper.widget.option('focusedElement', $focusedItem);
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.widget.getFocusedItemId(),
            tabindex: '0'
          });
          helper.checkItemsAttributes([], {focusedItemIndex: 1});
          helper.widget.option('focusedElement', null);
          helper.checkAttributes(helper.$widget, {tabindex: '0'});
          helper.checkItemsAttributes([], {});
        });
        test('Select item[0] on focus -> focusout', function() {
          helper.createWidget({items: this.items});
          helper.$widget.focusin();
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.widget.getFocusedItemId(),
            tabindex: '0'
          });
          helper.checkItemsAttributes([], {focusedItemIndex: 0});
          helper.$widget.focusout();
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.widget.getFocusedItemId(),
            tabindex: '0'
          });
          helper.checkItemsAttributes([], {focusedItemIndex: 0});
        });
        test('SelectionMode: single, selectedIndex: 1', function() {
          helper.createWidget({
            items: this.items,
            selectedIndex: 1,
            selectionMode: 'single'
          });
          helper.checkAttributes(helper.$widget, {tabindex: '0'});
          helper.checkItemsAttributes([1], {attributes: ['aria-selected']});
        });
        test('Refresh aria-activedescendant when focused item changed', function(assert) {
          var refreshActiveDescendantCallCount = 0;
          helper.createWidget({items: this.items});
          var $item = helper.$widget.find(("." + ITEM_CLASS)).eq(1);
          var spy = helper.widget._refreshActiveDescendant;
          helper.widget._refreshActiveDescendant = function() {
            refreshActiveDescendantCallCount++;
          };
          try {
            helper.widget.option('focusedElement', $item);
            helper.checkAttributes(helper.$widget, {tabindex: '0'});
            helper.checkItemsAttributes([], {focusedItemIndex: 1});
            assert.strictEqual(refreshActiveDescendantCallCount, 1, ("activedescendant was refreshed " + refreshActiveDescendantCallCount + " time"));
          } finally {
            helper.widget._refreshActiveDescendant = spy;
          }
        });
        test('onFocusedItemChanged option on init', function(assert) {
          var focusedItemChangedCallCount = 0;
          helper.createWidget({
            items: this.items,
            selectedIndex: 1,
            useNative: false,
            selectionMode: 'single',
            onFocusedItemChanged: function(e) {
              focusedItemChangedCallCount++;
              assert.ok(e.actionValue, 'onFocusedItemChanged, defined on init, gets id as a parameter');
            }
          });
          var $items = helper.$widget.find('.dx-item');
          helper.widget.option('focusedElement', $items.eq(0));
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.widget.getFocusedItemId(),
            tabindex: '0'
          });
          helper.checkItemsAttributes([1], {
            attributes: ['aria-selected'],
            focusedItemIndex: 0
          });
          assert.strictEqual(focusedItemChangedCallCount, 1, 'onFocusedItemChanged.callCount');
          focusedItemChangedCallCount = 0;
          helper.widget.option('onFocusedItemChanged', function() {
            focusedItemChangedCallCount++;
          });
          helper.widget.option('focusedElement', $items.eq(1));
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.widget.getFocusedItemId(),
            tabindex: '0'
          });
          helper.checkItemsAttributes([1], {
            attributes: ['aria-selected'],
            focusedItemIndex: 1
          });
          assert.strictEqual(focusedItemChangedCallCount, 1, 'onFocusedItemChanged.callCount');
        });
      });
      module('default template', {beforeEach: function() {
          this.prepareItemTest = function(data) {
            var testWidget = new TestWidget($('<div>'), {items: [data]});
            return testWidget.itemElements().eq(0).find('.dx-item-content').contents();
          };
        }}, function() {
        test('template should be rendered correctly with text', function(assert) {
          var $content = this.prepareItemTest('custom');
          assert.equal($content.text(), 'custom');
        });
        test('template should be rendered correctly with boolean', function(assert) {
          var $content = this.prepareItemTest(true);
          assert.equal($.trim($content.text()), 'true');
        });
        test('template should be rendered correctly with number', function(assert) {
          var $content = this.prepareItemTest(1);
          assert.equal($.trim($content.text()), '1');
        });
        test('template should be rendered correctly with object that has the text property', function(assert) {
          var $content = this.prepareItemTest({text: 'custom'});
          assert.equal($.trim($content.text()), 'custom');
        });
        test('template should be rendered correctly with text equals to zero', function(assert) {
          var $content = this.prepareItemTest({text: 0});
          assert.strictEqual($.trim($content.text()), '0');
        });
        test('template should be rendered correctly with html', function(assert) {
          var $content = this.prepareItemTest({html: '<span>test</span>'});
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($span.text(), 'test');
        });
        test('template should be rendered correctly with html equals to an empty string', function(assert) {
          var $content = this.prepareItemTest({
            text: 'test',
            html: ''
          });
          assert.strictEqual($.trim($content.text()), '');
        });
        test('template should be rendered correctly with htmlstring', function(assert) {
          var $content = this.prepareItemTest('<span>test</span>');
          assert.equal($content.text(), '<span>test</span>');
        });
        test('template should be rendered correctly with html & text', function(assert) {
          var $content = this.prepareItemTest({
            text: 'text',
            html: '<span>test</span>'
          });
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($content.text(), 'test');
        });
        test('displayExpr option should work', function(assert) {
          var $element = $('#cmp');
          var instance = new TestWidget($element, {
            dataSource: [{name: 'Item 1'}],
            displayExpr: 'name'
          });
          var $item = $(instance.itemElements()).eq(0);
          assert.strictEqual($item.text(), 'Item 1', 'displayExpr works');
        });
      });
      module('selection', {beforeEach: function() {
          this.createWidget = function(options) {
            options.items = options.items || [1, 2, 3];
            return new TestWidget($('#cmp'), options);
          };
        }}, function() {
        ['single', 'multiple'].forEach(function(selectionMode) {
          test(("selectedItemKeys should be updates properly with the " + selectionMode + " selection mode"), function(assert) {
            var instance = this.createWidget({selectionMode: selectionMode});
            var originalKeys = instance.option('selectedItemKeys');
            instance.selectItem(instance.itemElements().eq(1));
            var newKeys = instance.option('selectedItemKeys');
            assert.deepEqual(originalKeys, [], 'there is no selected items after widget creating');
            assert.deepEqual(newKeys, [2], 'after selection \'selectedItemKeys\' container correct item key');
          });
          test(("selectedItemKeys === null should not throw an error with the " + selectionMode + " selection mode"), function(assert) {
            var isOK = true;
            var selectedItemKeys;
            try {
              var instance = this.createWidget({
                selectedItemKeys: null,
                selectionMode: selectionMode
              });
              instance.selectItem(instance.itemElements().eq(1));
              selectedItemKeys = instance.option('selectedItemKeys');
            } catch (e) {
              isOK = false;
            }
            assert.ok(isOK, 'selectedItemKeys === null handled correctly');
            assert.deepEqual(selectedItemKeys, [2], 'after selection \'selectedItemKeys\' container correct item key');
          });
        });
        test('selection totalCount should return correct value if items are grouped (T1053754)', function(assert) {
          var dataSource = new DataSource({
            store: [{
              group: 1,
              key: 1,
              name: '1'
            }, {
              group: 1,
              key: 2,
              name: '2'
            }, {
              group: 2,
              key: 3,
              name: '3'
            }, {
              group: 2,
              key: 4,
              name: '4'
            }],
            group: 'group',
            key: 'id'
          });
          var instance = this.createWidget({
            dataSource: dataSource,
            grouped: true
          });
          assert.strictEqual(instance._selection.options.totalCount(), 4, 'total count is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/utils/type","core/config","core/component_registrator","data/data_source/data_source","data/abstract_store","data/array_store","core/templates/template_engine_registry","core/utils/support","events/hold","ui/collection/ui.collection_widget.edit","ui/list","../../helpers/executeAsyncMock.js","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/ariaAccessibilityTestHelper.js","./collectionWidgetParts/editingTests.js","./collectionWidgetParts/liveUpdateTests.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/utils/type"), require("core/config"), require("core/component_registrator"), require("data/data_source/data_source"), require("data/abstract_store"), require("data/array_store"), require("core/templates/template_engine_registry"), require("core/utils/support"), require("events/hold"), require("ui/collection/ui.collection_widget.edit"), require("ui/list"), require("../../helpers/executeAsyncMock.js"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("./collectionWidgetParts/editingTests.js"), require("./collectionWidgetParts/liveUpdateTests.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=collectionWidget.tests.js.map