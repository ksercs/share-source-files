!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/class.js"], ["./errors","./utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/class.js", ["./errors", "./utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _errors = _interopRequireDefault($__require("./errors"));
  var _type = $__require("./utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var wrapOverridden = function wrapOverridden(baseProto, methodName, method) {
    return function () {
      var prevCallBase = this.callBase;
      this.callBase = baseProto[methodName];
      try {
        return method.apply(this, arguments);
      } finally {
        this.callBase = prevCallBase;
      }
    };
  };
  var clonePrototype = function clonePrototype(obj) {
    var func = function func() {};
    func.prototype = obj.prototype;
    return new func();
  };
  var redefine = function redefine(members) {
    var that = this;
    var overridden;
    var memberName;
    var member;
    if (!members) {
      return that;
    }
    for (memberName in members) {
      member = members[memberName];
      overridden = typeof that.prototype[memberName] === 'function' && typeof member === 'function';
      that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member;
    }
    return that;
  };
  var include = function include() {
    var classObj = this;
    var argument;
    var name;
    var i;

    // NOTE: For ES6 classes. They don't have _includedCtors/_includedPostCtors
    // properties and get them from the ancestor class.
    var hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
    var isES6Class = !hasClassObjOwnProperty('_includedCtors') && !hasClassObjOwnProperty('_includedPostCtors');
    if (isES6Class) {
      classObj._includedCtors = classObj._includedCtors.slice(0);
      classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
    }
    for (i = 0; i < arguments.length; i++) {
      argument = arguments[i];
      if (argument.ctor) {
        classObj._includedCtors.push(argument.ctor);
      }
      if (argument.postCtor) {
        classObj._includedPostCtors.push(argument.postCtor);
      }
      for (name in argument) {
        if (name === 'ctor' || name === 'postCtor' || name === 'default') {
          continue;
        }
        ///#DEBUG
        if (name in classObj.prototype) {
          throw _errors.default.Error('E0002', name);
        }
        ///#ENDDEBUG
        classObj.prototype[name] = argument[name];
      }
    }
    return classObj;
  };
  var subclassOf = function subclassOf(parentClass) {
    var hasParentProperty = Object.prototype.hasOwnProperty.bind(this)('parent');
    var isES6Class = !hasParentProperty && this.parent;
    if (isES6Class) {
      var baseClass = Object.getPrototypeOf(this);
      return baseClass === parentClass || baseClass.subclassOf(parentClass);
    } else {
      if (this.parent === parentClass) {
        return true;
      }
      if (!this.parent || !this.parent.subclassOf) {
        return false;
      }
      return this.parent.subclassOf(parentClass);
    }
  };
  var abstract = function abstract() {
    throw _errors.default.Error('E0001');
  };
  var copyStatic = function () {
    var hasOwn = Object.prototype.hasOwnProperty;
    return function (source, destination) {
      for (var key in source) {
        if (!hasOwn.call(source, key)) {
          return;
        }
        destination[key] = source[key];
      }
    };
  }();
  var classImpl = function classImpl() {};
  classImpl.inherit = function (members) {
    var inheritor = function inheritor() {
      if (!this || (0, _type.isWindow)(this) || typeof this.constructor !== 'function') {
        throw _errors.default.Error('E0003');
      }
      var instance = this;
      var ctor = instance.ctor;
      var includedCtors = instance.constructor._includedCtors;
      var includedPostCtors = instance.constructor._includedPostCtors;
      var i;
      for (i = 0; i < includedCtors.length; i++) {
        includedCtors[i].call(instance);
      }
      if (ctor) {
        ctor.apply(instance, arguments);
      }
      for (i = 0; i < includedPostCtors.length; i++) {
        includedPostCtors[i].call(instance);
      }
    };
    inheritor.prototype = clonePrototype(this);
    copyStatic(this, inheritor);
    inheritor.inherit = this.inherit;
    inheritor.abstract = abstract;
    inheritor.redefine = redefine;
    inheritor.include = include;
    inheritor.subclassOf = subclassOf;
    inheritor.parent = this;
    inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
    inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
    inheritor.prototype.constructor = inheritor;
    inheritor.redefine(members);
    return inheritor;
  };
  classImpl.abstract = abstract;
  var _default = classImpl;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./errors","./utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./errors"), require("./utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=class.js.map